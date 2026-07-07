# Sistema de disponibilidad y reservas — Salón Campeche

**Fecha:** 2026-07-07
**Estado:** Diseño aprobado (pendiente de plan de implementación)

## 1. Contexto y problema

El sitio actual (`salon-campeche-next`, Next.js 16 App Router) es **estático**, sin backend
ni base de datos. La página `/disponibilidad` es **solo informativa**: lee un arreglo fijo
`unavailableDates` en el código y, para "apartar" una fecha, el cliente abre WhatsApp. El
dueño no puede autorizar fechas ni cambiar estados sin editar el código y volver a publicar.

**Objetivo:** convertir esa página en un **sistema real de reservas con estados**
(disponible → en espera → confirmada) que **solo el dueño controle**, con las fechas
"en espera" hasta que el cliente pague el anticipo.

## 2. Decisiones tomadas (brainstorming)

1. **Cobro del anticipo (50%):** por **transferencia/efectivo**; el dueño marca
   manualmente "anticipo recibido" para confirmar. Sin pasarela de pago ni comisiones.
2. **Administración:** **panel privado a la medida dentro del sitio**, con login (solo el dueño).
3. **Solicitudes del cliente:** **formulario en el sitio** que crea una solicitud en la
   bandeja del panel + aviso al dueño.
4. **Hosting:** **VPS propio con Dokploy** → servidor Node completo y base de datos
   autohospedada. Sin dependencia de SaaS externos.
5. **Regla de negocio:** **un evento por fecha** (la fecha se reserva completa).

## 3. Objetivos y no-objetivos

### Objetivos
- El dueño autoriza, pone "en espera", marca "anticipo recibido", confirma, cancela y
  bloquea fechas desde un panel privado (usable en el celular).
- El calendario público refleja la disponibilidad real en tiempo real.
- Los clientes solicitan fechas desde un formulario; la solicitud llega al panel y avisa al dueño.
- Solo el dueño tiene acceso de administración.
- Las fechas "en espera" **expiran automáticamente** si no se paga el anticipo en X días.

### No-objetivos (por ahora)
- Pago del anticipo **en línea** (Fase 3 opcional).
- Aviso automático **por WhatsApp** al dueño (requiere WhatsApp Business API; Fase 3).
- **Multi-espacio** (dos eventos el mismo día por piso) (Fase 3).
- Gestión de contratos/facturación.

## 4. Stack técnico

Todo autohospedado en el VPS del dueño vía Dokploy:

- **Next.js 16** (App Router) — el sitio actual, desplegado como contenedor (servidor Node completo).
- **SQLite** — base de datos en un archivo (`.db`), sin servidor de BD. *(Actualización posterior al diseño: se eligió SQLite en lugar de PostgreSQL por simplicidad, dado el bajo volumen y un solo escritor. Implica: `estado`/`espacio` como `String` con tipos unión en TS —Prisma no soporta enums en SQLite—, y la `fecha` como `String` `'YYYY-MM-DD'` para evitar desfases de zona horaria. El índice único parcial anti-doble-reserva es compatible con SQLite. En producción el archivo vive en un volumen persistente de Dokploy; el respaldo es copiar el archivo.)*
- **Prisma** — ORM / capa de acceso a datos y migraciones.
- **Auth.js (NextAuth v5)** — autenticación con proveedor de credenciales, **un solo usuario** (el dueño).
- **Correo** — Resend (plan gratuito) o SMTP propio, para avisos al dueño.
- **Cron** — tarea programada de Dokploy (o `pg_cron`) para expirar apartados vencidos.

**Alternativa considerada y descartada:** Supabase autohospedado (empaqueta Auth+DB+UI+realtime),
más pesado en contenedores de lo necesario para un sistema de una sola tabla principal.

## 5. Modelo de datos (esquema de referencia; no final)

```prisma
enum EstadoReserva {
  SOLICITADA    // cliente envió formulario; pendiente de revisión del dueño (apartada temporal)
  EN_ESPERA     // dueño autorizó; esperando el anticipo (apartada)
  CONFIRMADA    // anticipo recibido; reservada en firme
  BLOQUEADA     // dueño bloqueó la fecha manualmente (mantenimiento, uso personal...)
  RECHAZADA     // dueño rechazó la solicitud (histórico; libera la fecha)
  CANCELADA     // dueño canceló (histórico; libera la fecha)
  EXPIRADA      // venció el plazo del anticipo (histórico; libera la fecha)
}

enum Espacio {
  PRIMER_PISO
  AMBOS_PISOS
}

model Reserva {
  id                 String        @id @default(cuid())
  fecha              DateTime      @db.Date
  estado             EstadoReserva
  espacio            Espacio?
  clienteNombre      String
  clienteTelefono    String
  clienteEmail       String?
  tipoEvento         String
  numInvitados       Int?
  mensajeCliente     String?
  notasInternas      String?       // solo visibles para el dueño
  anticipoMonto      Int?
  anticipoRecibidoEn DateTime?
  solicitadaEn       DateTime?
  autorizadaEn       DateTime?
  expiraEn           DateTime?     // fecha límite del apartado (EN_ESPERA)
  confirmadaEn       DateTime?
  creadaEn           DateTime      @default(now())
  actualizadaEn      DateTime      @updatedAt
}

model UsuarioAdmin {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  creadaEn     DateTime @default(now())
}
```

**Restricción de integridad clave:** un **índice único parcial** sobre `fecha` para los estados
"activos" (`SOLICITADA`, `EN_ESPERA`, `CONFIRMADA`, `BLOQUEADA`) garantiza a nivel de base de
datos que **no existan dos reservas activas la misma fecha**, evitando condiciones de carrera
si dos clientes solicitan a la vez. Los estados históricos (`RECHAZADA`, `CANCELADA`,
`EXPIRADA`) no cuentan como activos y se conservan para historial.

- "Disponible" **no es una fila**: es la ausencia de una reserva activa para esa fecha.
- Configuración (p. ej. `DIAS_APARTADO`, por defecto 5) vía variable de entorno.

## 6. Máquina de estados

El dueño controla **todas** las transiciones salvo (a) la solicitud inicial del cliente y
(b) la expiración automática.

| Desde | Evento | Hacia | Quién |
|---|---|---|---|
| Disponible | envía formulario | SOLICITADA | cliente |
| SOLICITADA | autorizar | EN_ESPERA (fija `expiraEn`) | dueño |
| SOLICITADA | rechazar | RECHAZADA → disponible | dueño |
| EN_ESPERA | marcar anticipo recibido | CONFIRMADA | dueño |
| EN_ESPERA | vence el plazo sin anticipo | EXPIRADA → disponible | automático (cron) |
| EN_ESPERA | cancelar | CANCELADA → disponible | dueño |
| CONFIRMADA | cancelar | CANCELADA → disponible | dueño |
| Disponible | bloquear | BLOQUEADA | dueño |
| BLOQUEADA | desbloquear | disponible | dueño |

**Cómo se ve cada estado en el calendario público:**

| Estado | Público ve |
|---|---|
| Disponible (sin fila activa) | 🟢 Disponible (solicitable) |
| SOLICITADA | 🟡 No disponible (apartada temporal) |
| EN_ESPERA | 🟡 No disponible |
| CONFIRMADA | 🔴 Reservada |
| BLOQUEADA | ⚫ No disponible |
| RECHAZADA / CANCELADA / EXPIRADA | 🟢 Disponible (queda en historial) |

## 7. Superficie de la aplicación

### 7.1 Sitio público (cliente)
- **`/disponibilidad`** — calendario que lee la BD y pinta cada fecha 🟢/🟡/🔴 en tiempo real.
  - Fecha disponible → **"Solicitar esta fecha"** → formulario: nombre, teléfono, email
    (opcional), tipo de evento, número de invitados, espacio, mensaje.
  - Al enviar: crea `Reserva` en estado `SOLICITADA` (aparta temporalmente), envía correo
    al dueño, y muestra al cliente "Recibimos tu solicitud, te confirmamos pronto" + botón de WhatsApp.
  - Fechas no disponibles: no solicitables.
- Endpoint público: **solo crear solicitud** (POST validado en el servidor). No expone datos
  de otras reservas ni permite cambiar estados. Anti-spam ligero (rate-limit y/o captcha).

### 7.2 Panel de administración (dueño) — `/admin`
- Protegido por Auth.js; sin sesión válida → redirige al login.
- **Bandeja de solicitudes:** nuevas `SOLICITADA` con datos del cliente y botones **Autorizar** / **Rechazar**.
- **Calendario/agenda:** vista de mes con colores por estado; clic en una fecha para ver/editar la reserva.
- **Acciones por reserva:** Autorizar (→ EN_ESPERA con `expiraEn`), Marcar anticipo recibido
  (→ CONFIRMADA), Cancelar, Rechazar, Bloquear/Desbloquear, editar notas internas y monto de anticipo.
- **Apartado manual:** crear una reserva a mano (para contactos por WhatsApp/teléfono) en el estado deseado.
- **Responsive** (uso desde el celular).
- Todas las escrituras pasan por el servidor con validación y verificación de sesión.

### 7.3 Autenticación
- Auth.js (NextAuth) con proveedor de **credenciales** (email + contraseña hasheada con bcrypt/argon2).
- **Un solo usuario** (el dueño), sembrado por migración/seed o variables de entorno.
- Sesión por cookie firmada; middleware que protege `/admin/**` y las rutas de escritura de administración.

## 8. Avisos y expiración
- **Nueva solicitud →** correo al dueño (Resend o SMTP). Opcional: correo de confirmación al cliente.
- **Expiración automática:** tarea diaria (cron de Dokploy o `pg_cron`) que pasa a `EXPIRADA`
  las `EN_ESPERA` con `expiraEn` vencida (liberando la fecha) y avisa al dueño.
- Opcional (Fase 2): recordatorio al dueño/cliente 1 día antes de expirar.

## 9. Fases de implementación
1. **Núcleo:** Postgres + Prisma + migraciones + siembra del admin; calendario público leyendo
   estados; panel con login; transiciones de estado; formulario de solicitud; correo de aviso.
   *(Ya entrega el control total al dueño.)*
2. **Pulido:** expiración automática (cron) + recordatorios + historial/auditoría de cambios de
   estado + estadísticas (eventos por mes, anticipos).
3. **Futuro opcional:** pago del anticipo en línea, WhatsApp Business API, multi-espacio por piso.

## 10. Criterios de éxito
- El dueño puede, desde el celular y con login, autorizar/rechazar solicitudes, marcar anticipo
  recibido, confirmar, cancelar y bloquear fechas.
- El calendario público refleja el estado real; una fecha ocupada no puede solicitarse.
- Dos clientes no pueden apartar la misma fecha (garantía a nivel de BD).
- Una fecha "en espera" se libera sola si no se paga el anticipo en el plazo configurado.
- Nadie sin la sesión del dueño puede leer datos de clientes ni cambiar estados.

## 11. Supuestos y decisiones pendientes de detalle
- **Un evento por fecha** (confirmado). Multi-espacio queda para Fase 3.
- Plazo de apartado por defecto: **5 días** (configurable).
- El correo del dueño para avisos y el proveedor (Resend vs SMTP propio) se definen en el plan.
- El diseño visual del panel reutiliza el sistema de UI existente (`Section`, `Card`, `Button`, `Modal`).
- Se migra el `unavailableDates` mock actual a datos reales en la BD (o se descarta).
