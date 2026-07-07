# Sistema de Reservas (Fase 1) — Plan de Implementación (SQLite)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convertir `/disponibilidad` en un sistema real de reservas con estados que solo el dueño controla (autorizar, en espera, anticipo recibido, confirmar, bloquear), con formulario de solicitud público y aviso por correo.

**Architecture:** Next.js 16 (App Router, servidor Node completo en Dokploy) + **SQLite** vía Prisma (un archivo `.db`, sin servidor de base de datos). La lógica de negocio vive en `src/lib/reservas/` (máquina de estados, validación, servicio) y se prueba de forma aislada. La UI pública (calendario + formulario) y el panel `/admin` (protegido con Auth.js) son capas delgadas sobre el servicio. Las mutaciones usan Server Actions; la autenticación usa Auth.js v5 con proveedor de credenciales (un solo usuario).

**Tech Stack:** Next.js 16, React 19, TypeScript, **SQLite**, Prisma, Auth.js (next-auth v5), bcryptjs, zod, Resend (correo), Vitest (tests).

## Global Constraints

- **NO hacer `git commit` ni `git push` automáticamente** (regla permanente del usuario). Cada tarea termina en una "Verificación" y deja los cambios listos; el usuario commitea cuando quiera.
- **Base de datos: SQLite** (archivo). Prisma **no soporta `enum` con SQLite**: `estado` y `espacio` se guardan como `String` y los tipos unión se definen en TypeScript. La **fecha** se guarda como `String` en formato `'YYYY-MM-DD'` (evita desfases de zona horaria; comparaciones lexicográficas válidas para ISO).
- **Next/React:** Next.js `^16.2.6`, React `^19.2.6`, TypeScript `^6`. No degradar versiones.
- **Idioma:** UI y textos de cara al usuario en español con acentos correctos. Identificadores de código en su forma original.
- **Un evento por fecha** (regla de negocio).
- **Anticipo manual:** no hay pago en línea; el dueño marca "anticipo recibido".
- **Estados activos** (ocupan la fecha): `SOLICITADA`, `EN_ESPERA`, `CONFIRMADA`, `BLOQUEADA`. Estados históricos (liberan la fecha): `RECHAZADA`, `CANCELADA`, `EXPIRADA`.
- **Seguridad:** el endpoint público solo CREA solicitudes; nunca lee datos de otras reservas ni cambia estados. Toda mutación de administración verifica sesión en el servidor.
- **Reutilizar** el sistema de UI existente (`Section`, `Card`, `Button`, `Modal`, clases de `globals.css`).
- **Plazo de apartado por defecto:** `DIAS_APARTADO=5` (variable de entorno).

---

## Mapa de archivos

**Configuración**
- Modify `.env.local` — `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `RESEND_API_KEY`, `CORREO_AVISOS`, `DIAS_APARTADO`, `NEXT_PUBLIC_SITE_URL`.
- Create `.env.example` — plantilla sin secretos.
- Create `.env.test` — `DATABASE_URL="file:./prisma/test.db"`.
- Create `vitest.config.ts`, `vitest.setup.ts`, `vitest.global-setup.ts`.
- Modify `package.json` — dependencias y scripts.

**Base de datos**
- Create `prisma/schema.prisma` — modelos `Reserva`, `UsuarioAdmin` (sin enums).
- Create `prisma/migrations/**` — incluye índice único parcial (SQL manual).
- Create `prisma/seed.ts` — siembra del usuario admin.

**Lógica de negocio (probada en aislamiento)**
- Create `src/lib/db.ts` — cliente Prisma singleton.
- Create `src/lib/reservas/estados.ts` — tipos unión, transiciones, estado público.
- Create `src/lib/reservas/validators.ts` — esquemas zod.
- Create `src/lib/reservas/errors.ts` — errores de dominio.
- Create `src/lib/reservas/service.ts` — crear/leer/transicionar reservas.
- Create `src/lib/email.ts` — envío de avisos.
- Create `src/lib/auth.ts` — configuración Auth.js.

**Rutas / acciones**
- Create `src/app/api/auth/[...nextauth]/route.ts`, `middleware.ts`.
- Create `src/app/api/disponibilidad/route.ts` — lectura pública del mes.
- Create `src/app/api/admin/reservas/route.ts` — lectura admin del mes (protegida).
- Create `src/app/disponibilidad/actions.ts`, `src/app/admin/actions.ts`.

**UI pública**
- Modify `src/app/disponibilidad/page.tsx` — Server Component.
- Create `src/app/disponibilidad/CalendarioDisponibilidad.tsx`, `SolicitudForm.tsx`.

**UI admin**
- Create `src/app/admin/layout.tsx`, `login/page.tsx`, `page.tsx`, `ReservaCard.tsx`, `AgendaMes.tsx`, `NuevaReservaManual.tsx`.

**Pruebas**
- Create `src/lib/reservas/estados.test.ts`, `validators.test.ts`, `service.test.ts`, `email.test.ts`, `src/lib/auth.test.ts`.

---

## Task 1: Variables de entorno (SQLite, sin Docker)

**Files:**
- Modify: `.env.local`
- Create: `.env.example`
- Create: `.env.test`

**Interfaces:**
- Produces: `DATABASE_URL="file:./prisma/dev.db"` disponible para Prisma; `.env.test` apunta a `file:./prisma/test.db`.

- [ ] **Step 1: Añadir a `.env.local`** (valores reales de desarrollo)

```bash
DATABASE_URL="file:./prisma/dev.db"
AUTH_SECRET="<aleatorio; generar con: npx auth secret>"
ADMIN_EMAIL="dueno@saloncampeche.com"
ADMIN_PASSWORD="<contraseña de desarrollo>"
RESEND_API_KEY=""
CORREO_AVISOS="dueno@saloncampeche.com"
DIAS_APARTADO="5"
NEXT_PUBLIC_SITE_URL="https://www.saloncampeche.com"
```

- [ ] **Step 2: Crear `.env.example`** con las mismas claves y valores de ejemplo (sin secretos), como referencia (`.env*` está en `.gitignore`).

- [ ] **Step 3: Crear `.env.test`**

```bash
DATABASE_URL="file:./prisma/test.db"
DIAS_APARTADO="5"
```

- [ ] **Step 4: Verificación** — `cat .env.local` muestra `DATABASE_URL=file:./prisma/dev.db`.

---

## Task 2: Prisma — esquema SQLite e índice único parcial

**Files:**
- Modify: `package.json` (deps `@prisma/client`, dev `prisma`, `tsx`; scripts)
- Create: `prisma/schema.prisma`
- Create: `prisma/migrations/**`

**Interfaces:**
- Produces: tablas `Reserva`, `UsuarioAdmin`; tipo Prisma `Reserva` (con `estado`, `espacio`, `fecha` de tipo `string`); índice único parcial que impide dos reservas activas en la misma fecha.

- [ ] **Step 1: Instalar** — Run: `npm install @prisma/client && npm install -D prisma tsx`

- [ ] **Step 2: Scripts en `package.json`**

```json
{
  "scripts": {
    "db:migrate": "prisma migrate dev",
    "db:deploy": "prisma migrate deploy",
    "db:generate": "prisma generate",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio"
  },
  "prisma": { "seed": "tsx prisma/seed.ts" }
}
```

- [ ] **Step 3: Crear `prisma/schema.prisma`**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Reserva {
  id                 String    @id @default(cuid())
  fecha              String    // 'YYYY-MM-DD'
  estado             String    // ver src/lib/reservas/estados.ts (EstadoReserva)
  espacio            String?   // 'PRIMER_PISO' | 'AMBOS_PISOS'
  clienteNombre      String
  clienteTelefono    String
  clienteEmail       String?
  tipoEvento         String
  numInvitados       Int?
  mensajeCliente     String?
  notasInternas      String?
  anticipoMonto      Int?
  anticipoRecibidoEn DateTime?
  solicitadaEn       DateTime?
  autorizadaEn       DateTime?
  expiraEn           DateTime?
  confirmadaEn       DateTime?
  creadaEn           DateTime  @default(now())
  actualizadaEn      DateTime  @updatedAt

  @@index([fecha])
  @@index([estado])
}

model UsuarioAdmin {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  creadaEn     DateTime @default(now())
}
```

- [ ] **Step 4: Crear la migración sin aplicarla** — Run: `npx prisma migrate dev --name init_reservas --create-only`

- [ ] **Step 5: Añadir el índice único parcial al final del `migration.sql`** (SQLite soporta índices parciales)

```sql
-- Impide dos reservas ACTIVAS en la misma fecha (evita doble reserva)
CREATE UNIQUE INDEX "reserva_fecha_activa_unica"
ON "Reserva" ("fecha")
WHERE "estado" IN ('SOLICITADA', 'EN_ESPERA', 'CONFIRMADA', 'BLOQUEADA');
```

- [ ] **Step 6: Aplicar** — Run: `npx prisma migrate dev` → migración aplicada; cliente generado.

- [ ] **Step 7: Verificación** — Run: `npx prisma migrate status` → "up to date". Existe `prisma/dev.db`.

---

## Task 3: Vitest + cliente Prisma singleton (SQLite de pruebas)

**Files:**
- Modify: `package.json` (deps `vitest`, `dotenv`; script `test`)
- Create: `vitest.config.ts`, `vitest.setup.ts`, `vitest.global-setup.ts`
- Create: `src/lib/db.ts`

**Interfaces:**
- Produces: `prisma` (instancia `PrismaClient`) de `src/lib/db.ts`; los tests corren contra `file:./prisma/test.db` con el esquema migrado.

- [ ] **Step 1: Instalar** — Run: `npm install -D vitest dotenv`

- [ ] **Step 2: Crear `src/lib/db.ts`**

```ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }
export const prisma = globalForPrisma.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

- [ ] **Step 3: Crear `vitest.setup.ts`** (carga variables de test)

```ts
import { config } from 'dotenv'
config({ path: '.env.test' })
```

- [ ] **Step 4: Crear `vitest.global-setup.ts`** (crea el esquema en la BD de test una vez)

```ts
import { execSync } from 'node:child_process'
export default function setup() {
  execSync('npx prisma migrate deploy', {
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: 'file:./prisma/test.db' },
  })
}
```

- [ ] **Step 5: Crear `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./vitest.setup.ts'],
    globalSetup: ['./vitest.global-setup.ts'],
    include: ['src/**/*.test.ts'],
    fileParallelism: false,
  },
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
})
```

- [ ] **Step 6: Script `test`** en `package.json`: `{ "scripts": { "test": "vitest run", "test:watch": "vitest" } }`

- [ ] **Step 7: Verificación** — Run: `npm test` con un único test dummy pasa (o esperar a Task 4). Confirmar que se creó `prisma/test.db` y no hay errores de migración.

---

## Task 4: Máquina de estados (lógica pura)

**Files:**
- Create: `src/lib/reservas/estados.ts`
- Create: `src/lib/reservas/estados.test.ts`

**Interfaces:**
- Produces:
  - `type EstadoReserva = 'SOLICITADA' | 'EN_ESPERA' | 'CONFIRMADA' | 'BLOQUEADA' | 'RECHAZADA' | 'CANCELADA' | 'EXPIRADA'`
  - `type Espacio = 'PRIMER_PISO' | 'AMBOS_PISOS'`
  - `ESTADOS_ACTIVOS: EstadoReserva[]`
  - `puedeTransicionar(desde: EstadoReserva, hacia: EstadoReserva): boolean`
  - `type EstadoPublico = 'disponible' | 'apartada' | 'reservada' | 'no-disponible'`
  - `estadoPublico(estado: string, expiraEn: Date | null, ahora: Date): EstadoPublico`

- [ ] **Step 1: Escribir los tests (fallan primero)** — `src/lib/reservas/estados.test.ts`

```ts
import { describe, it, expect } from 'vitest'
import { puedeTransicionar, estadoPublico, ESTADOS_ACTIVOS } from './estados'

describe('transiciones', () => {
  it('permite SOLICITADA -> EN_ESPERA', () => {
    expect(puedeTransicionar('SOLICITADA', 'EN_ESPERA')).toBe(true)
  })
  it('permite EN_ESPERA -> CONFIRMADA', () => {
    expect(puedeTransicionar('EN_ESPERA', 'CONFIRMADA')).toBe(true)
  })
  it('rechaza CONFIRMADA -> EN_ESPERA', () => {
    expect(puedeTransicionar('CONFIRMADA', 'EN_ESPERA')).toBe(false)
  })
})

describe('estadoPublico', () => {
  const now = new Date('2026-08-01T12:00:00Z')
  it('CONFIRMADA -> reservada', () => {
    expect(estadoPublico('CONFIRMADA', null, now)).toBe('reservada')
  })
  it('EN_ESPERA vigente -> apartada', () => {
    expect(estadoPublico('EN_ESPERA', new Date('2026-08-05'), now)).toBe('apartada')
  })
  it('EN_ESPERA vencida -> disponible (expiración perezosa)', () => {
    expect(estadoPublico('EN_ESPERA', new Date('2026-07-20'), now)).toBe('disponible')
  })
  it('BLOQUEADA -> no-disponible', () => {
    expect(estadoPublico('BLOQUEADA', null, now)).toBe('no-disponible')
  })
  it('activos incluye SOLICITADA', () => {
    expect(ESTADOS_ACTIVOS).toContain('SOLICITADA')
  })
})
```

- [ ] **Step 2: Correr y ver fallar** — Run: `npm test src/lib/reservas/estados.test.ts` → FAIL.

- [ ] **Step 3: Implementar `src/lib/reservas/estados.ts`**

```ts
export const ESTADOS = [
  'SOLICITADA', 'EN_ESPERA', 'CONFIRMADA', 'BLOQUEADA', 'RECHAZADA', 'CANCELADA', 'EXPIRADA',
] as const
export type EstadoReserva = (typeof ESTADOS)[number]

export const ESPACIOS = ['PRIMER_PISO', 'AMBOS_PISOS'] as const
export type Espacio = (typeof ESPACIOS)[number]

export const ESTADOS_ACTIVOS: EstadoReserva[] = ['SOLICITADA', 'EN_ESPERA', 'CONFIRMADA', 'BLOQUEADA']

export const TRANSICIONES: Record<EstadoReserva, EstadoReserva[]> = {
  SOLICITADA: ['EN_ESPERA', 'RECHAZADA', 'CANCELADA'],
  EN_ESPERA: ['CONFIRMADA', 'CANCELADA', 'EXPIRADA'],
  CONFIRMADA: ['CANCELADA'],
  BLOQUEADA: ['CANCELADA'],
  RECHAZADA: [],
  CANCELADA: [],
  EXPIRADA: [],
}

export function puedeTransicionar(desde: EstadoReserva, hacia: EstadoReserva): boolean {
  return TRANSICIONES[desde]?.includes(hacia) ?? false
}

export type EstadoPublico = 'disponible' | 'apartada' | 'reservada' | 'no-disponible'

export function estadoPublico(estado: string, expiraEn: Date | null, ahora: Date): EstadoPublico {
  if (estado === 'EN_ESPERA' && expiraEn && expiraEn.getTime() < ahora.getTime()) return 'disponible'
  switch (estado) {
    case 'SOLICITADA':
    case 'EN_ESPERA':
      return 'apartada'
    case 'CONFIRMADA':
      return 'reservada'
    case 'BLOQUEADA':
      return 'no-disponible'
    default:
      return 'disponible'
  }
}
```

- [ ] **Step 4: Correr y ver pasar** → PASS.
- [ ] **Step 5: Verificación** — `npm test` en verde.

---

## Task 5: Validación de entrada (zod)

**Files:**
- Modify: `package.json` (dep `zod`)
- Create: `src/lib/reservas/validators.ts`, `src/lib/reservas/validators.test.ts`

**Interfaces:**
- Produces: `solicitudSchema`; `type SolicitudInput = z.infer<typeof solicitudSchema>` con `fecha: string` (`'YYYY-MM-DD'`), teléfono normalizado a 10 dígitos.

- [ ] **Step 1: Instalar** — Run: `npm install zod`

- [ ] **Step 2: Tests (fallan primero)** — `src/lib/reservas/validators.test.ts`

```ts
import { describe, it, expect } from 'vitest'
import { solicitudSchema } from './validators'

const base = { fecha: '2026-09-10', clienteNombre: 'Ana López', clienteTelefono: '5512345678', tipoEvento: 'Boda' }

describe('solicitudSchema', () => {
  it('acepta una solicitud válida', () => {
    expect(solicitudSchema.safeParse(base).success).toBe(true)
  })
  it('rechaza teléfono que no tenga 10 dígitos', () => {
    expect(solicitudSchema.safeParse({ ...base, clienteTelefono: '123' }).success).toBe(false)
  })
  it('rechaza fecha con formato inválido', () => {
    expect(solicitudSchema.safeParse({ ...base, fecha: '10/09/2026' }).success).toBe(false)
  })
  it('rechaza nombre vacío', () => {
    expect(solicitudSchema.safeParse({ ...base, clienteNombre: '' }).success).toBe(false)
  })
})
```

- [ ] **Step 3: Ver fallar** → FAIL.

- [ ] **Step 4: Implementar `src/lib/reservas/validators.ts`**

```ts
import { z } from 'zod'

export const solicitudSchema = z.object({
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha inválida'),
  clienteNombre: z.string().trim().min(2, 'Nombre requerido'),
  clienteTelefono: z
    .string()
    .transform((v) => v.replace(/\D/g, ''))
    .refine((v) => v.length === 10, 'Teléfono de 10 dígitos'),
  clienteEmail: z.string().email().optional().or(z.literal('')),
  tipoEvento: z.string().trim().min(1, 'Selecciona el tipo de evento'),
  numInvitados: z.coerce.number().int().positive().max(250).optional(),
  espacio: z.enum(['PRIMER_PISO', 'AMBOS_PISOS']).optional(),
  mensajeCliente: z.string().trim().max(1000).optional(),
})

export type SolicitudInput = z.infer<typeof solicitudSchema>
```

- [ ] **Step 5: Ver pasar** → PASS. **Verificación** — `npm test` en verde.

---

## Task 6: Servicio — crear solicitud (integración con BD)

**Files:**
- Create: `src/lib/reservas/errors.ts`, `src/lib/reservas/service.ts`, `src/lib/reservas/service.test.ts`

**Interfaces:**
- Produces:
  - `class FechaNoDisponibleError extends Error`, `class TransicionInvalidaError extends Error`
  - `crearSolicitud(input: SolicitudInput): Promise<Reserva>`
- Consumes: `prisma` (db.ts), `solicitudSchema` (validators).

- [ ] **Step 1: Crear `src/lib/reservas/errors.ts`**

```ts
export class FechaNoDisponibleError extends Error {
  constructor() { super('La fecha ya no está disponible'); this.name = 'FechaNoDisponibleError' }
}
export class TransicionInvalidaError extends Error {
  constructor(desde: string, hacia: string) {
    super(`Transición inválida: ${desde} → ${hacia}`); this.name = 'TransicionInvalidaError'
  }
}
```

- [ ] **Step 2: Test de integración (falla primero)** — `src/lib/reservas/service.test.ts`

```ts
import { describe, it, expect, beforeEach } from 'vitest'
import { prisma } from '@/lib/db'
import { crearSolicitud } from './service'
import { FechaNoDisponibleError } from './errors'

const input = { fecha: '2026-09-10', clienteNombre: 'Ana López', clienteTelefono: '5512345678', tipoEvento: 'Boda' }

beforeEach(async () => { await prisma.reserva.deleteMany() })

describe('crearSolicitud', () => {
  it('crea una reserva en estado SOLICITADA', async () => {
    const r = await crearSolicitud(input)
    expect(r.estado).toBe('SOLICITADA')
    expect(r.fecha).toBe('2026-09-10')
    expect(r.solicitadaEn).toBeInstanceOf(Date)
  })
  it('rechaza una segunda solicitud para la misma fecha', async () => {
    await crearSolicitud(input)
    await expect(crearSolicitud(input)).rejects.toBeInstanceOf(FechaNoDisponibleError)
  })
})
```

- [ ] **Step 3: Ver fallar** → FAIL.

- [ ] **Step 4: Implementar `src/lib/reservas/service.ts`**

```ts
import { Prisma, type Reserva } from '@prisma/client'
import { prisma } from '@/lib/db'
import { solicitudSchema, type SolicitudInput } from './validators'
import { FechaNoDisponibleError } from './errors'

const DIAS_APARTADO = Number(process.env.DIAS_APARTADO ?? 5)

function esFechaDuplicada(e: unknown): boolean {
  return e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'
}

export async function crearSolicitud(input: SolicitudInput): Promise<Reserva> {
  const d = solicitudSchema.parse(input)
  try {
    return await prisma.reserva.create({
      data: {
        fecha: d.fecha,
        estado: 'SOLICITADA',
        espacio: d.espacio ?? null,
        clienteNombre: d.clienteNombre,
        clienteTelefono: d.clienteTelefono,
        clienteEmail: d.clienteEmail || null,
        tipoEvento: d.tipoEvento,
        numInvitados: d.numInvitados ?? null,
        mensajeCliente: d.mensajeCliente || null,
        solicitadaEn: new Date(),
      },
    })
  } catch (e) {
    if (esFechaDuplicada(e)) throw new FechaNoDisponibleError()
    throw e
  }
}
```

- [ ] **Step 5: Ver pasar** → PASS. Si la segunda inserción no lanza P2002, confirmar que la migración creó `reserva_fecha_activa_unica` (revisar el `migration.sql`).

- [ ] **Step 6: Verificación** — `npm test` en verde.

---

## Task 7: Servicio — transiciones de administración

**Files:** Modify `src/lib/reservas/service.ts`, `src/lib/reservas/service.test.ts`

**Interfaces:**
- Produces:
  - `autorizar(id: string, opts?: { diasApartado?: number }): Promise<Reserva>` (→ EN_ESPERA, fija `autorizadaEn`, `expiraEn`)
  - `rechazar(id): Promise<Reserva>`, `confirmarAnticipo(id, monto?): Promise<Reserva>`, `cancelar(id): Promise<Reserva>`, `desbloquear(id): Promise<Reserva>`
  - `bloquearFecha(fecha: string, notasInternas?: string): Promise<Reserva>`
  - `crearReservaManual(input: SolicitudInput & { estado: 'EN_ESPERA' | 'CONFIRMADA' }): Promise<Reserva>`
- Consumes: `puedeTransicionar`, `EstadoReserva` (estados), `TransicionInvalidaError` (errors).

- [ ] **Step 1: Tests (fallan primero)** — añadir a `service.test.ts`

```ts
import { autorizar, confirmarAnticipo, rechazar, bloquearFecha } from './service'
import { TransicionInvalidaError } from './errors'

describe('transiciones de admin', () => {
  it('autorizar: SOLICITADA -> EN_ESPERA y fija expiraEn', async () => {
    const s = await crearSolicitud(input)
    const r = await autorizar(s.id, { diasApartado: 5 })
    expect(r.estado).toBe('EN_ESPERA')
    expect(r.expiraEn).toBeInstanceOf(Date)
  })
  it('confirmarAnticipo: EN_ESPERA -> CONFIRMADA', async () => {
    const s = await crearSolicitud(input); await autorizar(s.id)
    const r = await confirmarAnticipo(s.id, 12000)
    expect(r.estado).toBe('CONFIRMADA')
    expect(r.anticipoMonto).toBe(12000)
  })
  it('confirmarAnticipo sobre SOLICITADA lanza TransicionInvalidaError', async () => {
    const s = await crearSolicitud(input)
    await expect(confirmarAnticipo(s.id)).rejects.toBeInstanceOf(TransicionInvalidaError)
  })
  it('rechazar libera la fecha', async () => {
    const s = await crearSolicitud(input); await rechazar(s.id)
    await expect(crearSolicitud(input)).resolves.toMatchObject({ estado: 'SOLICITADA' })
  })
  it('bloquearFecha ocupa la fecha', async () => {
    await bloquearFecha('2026-10-01', 'Mantenimiento')
    await expect(crearSolicitud({ ...input, fecha: '2026-10-01' })).rejects.toBeInstanceOf(FechaNoDisponibleError)
  })
})
```

- [ ] **Step 2: Ver fallar** → FAIL.

- [ ] **Step 3: Implementar (añadir a `service.ts`)**

```ts
import { puedeTransicionar, type EstadoReserva } from './estados'
import { TransicionInvalidaError } from './errors'

async function transicionar(id: string, hacia: EstadoReserva, extra: Prisma.ReservaUpdateInput = {}): Promise<Reserva> {
  const actual = await prisma.reserva.findUniqueOrThrow({ where: { id } })
  if (!puedeTransicionar(actual.estado as EstadoReserva, hacia)) {
    throw new TransicionInvalidaError(actual.estado, hacia)
  }
  return prisma.reserva.update({ where: { id }, data: { estado: hacia, ...extra } })
}

export function autorizar(id: string, opts?: { diasApartado?: number }) {
  const dias = opts?.diasApartado ?? DIAS_APARTADO
  const expiraEn = new Date()
  expiraEn.setDate(expiraEn.getDate() + dias)
  expiraEn.setHours(23, 59, 59, 999)
  return transicionar(id, 'EN_ESPERA', { autorizadaEn: new Date(), expiraEn })
}
export function rechazar(id: string) { return transicionar(id, 'RECHAZADA') }
export function confirmarAnticipo(id: string, monto?: number) {
  return transicionar(id, 'CONFIRMADA', {
    anticipoRecibidoEn: new Date(), confirmadaEn: new Date(),
    ...(monto != null ? { anticipoMonto: monto } : {}),
  })
}
export function cancelar(id: string) { return transicionar(id, 'CANCELADA') }
export function desbloquear(id: string) { return transicionar(id, 'CANCELADA') }

export async function bloquearFecha(fecha: string, notasInternas?: string): Promise<Reserva> {
  try {
    return await prisma.reserva.create({
      data: { fecha, estado: 'BLOQUEADA', clienteNombre: '(Bloqueo interno)', clienteTelefono: '', tipoEvento: 'Bloqueo', notasInternas: notasInternas ?? null },
    })
  } catch (e) { if (esFechaDuplicada(e)) throw new FechaNoDisponibleError(); throw e }
}

export async function crearReservaManual(
  input: SolicitudInput & { estado: 'EN_ESPERA' | 'CONFIRMADA' }
): Promise<Reserva> {
  const d = solicitudSchema.parse(input)
  const ahora = new Date()
  const expiraEn = new Date(); expiraEn.setDate(expiraEn.getDate() + DIAS_APARTADO)
  try {
    return await prisma.reserva.create({
      data: {
        fecha: d.fecha, estado: input.estado, espacio: d.espacio ?? null,
        clienteNombre: d.clienteNombre, clienteTelefono: d.clienteTelefono, clienteEmail: d.clienteEmail || null,
        tipoEvento: d.tipoEvento, numInvitados: d.numInvitados ?? null, mensajeCliente: d.mensajeCliente || null,
        solicitadaEn: ahora, autorizadaEn: ahora,
        expiraEn: input.estado === 'EN_ESPERA' ? expiraEn : null,
        confirmadaEn: input.estado === 'CONFIRMADA' ? ahora : null,
        anticipoRecibidoEn: input.estado === 'CONFIRMADA' ? ahora : null,
      },
    })
  } catch (e) { if (esFechaDuplicada(e)) throw new FechaNoDisponibleError(); throw e }
}
```

- [ ] **Step 4: Ver pasar** → PASS. **Verificación** — `npm test` en verde.

---

## Task 8: Servicio — disponibilidad del mes y bandeja

**Files:** Modify `src/lib/reservas/service.ts`, `src/lib/reservas/service.test.ts`

**Interfaces:**
- Produces:
  - `type DisponibilidadDia = { fecha: string; estado: EstadoPublico }`
  - `disponibilidadMes(anio: number, mes: number): Promise<DisponibilidadDia[]>` (mes 1-12; solo días ocupados)
  - `listarSolicitudesPendientes(): Promise<Reserva[]>`
  - `reservasDelMes(anio: number, mes: number): Promise<Reserva[]>`

- [ ] **Step 1: Tests (fallan primero)**

```ts
import { disponibilidadMes, listarSolicitudesPendientes } from './service'

describe('disponibilidadMes', () => {
  it('marca una fecha CONFIRMADA como reservada', async () => {
    const s = await crearSolicitud({ ...input, fecha: '2026-09-10' })
    await autorizar(s.id); await confirmarAnticipo(s.id)
    const dias = await disponibilidadMes(2026, 9)
    expect(dias).toContainEqual({ fecha: '2026-09-10', estado: 'reservada' })
  })
})
describe('listarSolicitudesPendientes', () => {
  it('devuelve solo las SOLICITADA', async () => {
    await crearSolicitud({ ...input, fecha: '2026-09-11' })
    const p = await listarSolicitudesPendientes()
    expect(p).toHaveLength(1)
    expect(p[0].estado).toBe('SOLICITADA')
  })
})
```

- [ ] **Step 2: Ver fallar** → FAIL.

- [ ] **Step 3: Implementar (añadir a `service.ts`)**

```ts
import { estadoPublico, ESTADOS_ACTIVOS, type EstadoPublico } from './estados'

export type DisponibilidadDia = { fecha: string; estado: EstadoPublico }

export async function disponibilidadMes(anio: number, mes: number): Promise<DisponibilidadDia[]> {
  const prefijo = `${anio}-${String(mes).padStart(2, '0')}` // 'YYYY-MM'
  const reservas = await prisma.reserva.findMany({
    where: { estado: { in: ESTADOS_ACTIVOS }, fecha: { startsWith: prefijo } },
  })
  const ahora = new Date()
  return reservas
    .map((r) => ({ fecha: r.fecha, estado: estadoPublico(r.estado, r.expiraEn, ahora) }))
    .filter((d) => d.estado !== 'disponible')
}

export function listarSolicitudesPendientes() {
  return prisma.reserva.findMany({ where: { estado: 'SOLICITADA' }, orderBy: { solicitadaEn: 'asc' } })
}

export function reservasDelMes(anio: number, mes: number) {
  const prefijo = `${anio}-${String(mes).padStart(2, '0')}`
  return prisma.reserva.findMany({ where: { fecha: { startsWith: prefijo } }, orderBy: { fecha: 'asc' } })
}
```

- [ ] **Step 4: Ver pasar** → PASS. **Verificación** — `npm test` en verde.

---

## Task 9: Autenticación (Auth.js) + siembra + login + guardia

**Files:**
- Modify: `package.json` (deps `next-auth@beta`, `bcryptjs`, dev `@types/bcryptjs`)
- Create: `prisma/seed.ts`, `src/lib/auth.ts`, `src/lib/auth.test.ts`
- Create: `src/app/api/auth/[...nextauth]/route.ts`, `middleware.ts`, `src/app/admin/login/page.tsx`

**Interfaces:**
- Produces: `verificarCredenciales(email, password): Promise<UsuarioAdmin | null>`; `auth`, `signIn`, `signOut`, `handlers`.

- [ ] **Step 1: Instalar** — Run: `npm install next-auth@beta bcryptjs && npm install -D @types/bcryptjs`

- [ ] **Step 2: `prisma/seed.ts`**

```ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()
async function main() {
  const email = process.env.ADMIN_EMAIL, password = process.env.ADMIN_PASSWORD
  if (!email || !password) throw new Error('Define ADMIN_EMAIL y ADMIN_PASSWORD')
  const passwordHash = await bcrypt.hash(password, 12)
  await prisma.usuarioAdmin.upsert({ where: { email }, update: { passwordHash }, create: { email, passwordHash } })
  console.log('Admin sembrado:', email)
}
main().finally(() => prisma.$disconnect())
```

- [ ] **Step 3: Test de credenciales (falla primero)** — `src/lib/auth.test.ts`

```ts
import { describe, it, expect, beforeAll } from 'vitest'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { verificarCredenciales } from './auth'

beforeAll(async () => {
  await prisma.usuarioAdmin.deleteMany()
  await prisma.usuarioAdmin.create({ data: { email: 'x@y.com', passwordHash: await bcrypt.hash('secreta123', 12) } })
})
describe('verificarCredenciales', () => {
  it('acepta credenciales correctas', async () => { expect(await verificarCredenciales('x@y.com', 'secreta123')).not.toBeNull() })
  it('rechaza contraseña incorrecta', async () => { expect(await verificarCredenciales('x@y.com', 'mala')).toBeNull() })
})
```

- [ ] **Step 4: Ver fallar** → FAIL.

- [ ] **Step 5: `src/lib/auth.ts`**

```ts
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import type { UsuarioAdmin } from '@prisma/client'

export async function verificarCredenciales(email: string, password: string): Promise<UsuarioAdmin | null> {
  const user = await prisma.usuarioAdmin.findUnique({ where: { email } })
  if (!user) return null
  return (await bcrypt.compare(password, user.passwordHash)) ? user : null
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin/login' },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (c) => {
        const user = await verificarCredenciales(String(c.email), String(c.password))
        return user ? { id: user.id, email: user.email } : null
      },
    }),
  ],
})
```

- [ ] **Step 6: Ver pasar** → PASS.

- [ ] **Step 7: `src/app/api/auth/[...nextauth]/route.ts`**

```ts
import { handlers } from '@/lib/auth'
export const { GET, POST } = handlers
```

- [ ] **Step 8: `middleware.ts`**

```ts
import { auth } from '@/lib/auth'
export default auth((req) => {
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login') && !req.auth) {
    return Response.redirect(new URL('/admin/login', req.nextUrl.origin))
  }
})
export const config = { matcher: ['/admin/:path*'] }
```

- [ ] **Step 9: `src/app/admin/login/page.tsx`** (Client Component; `signIn` de `next-auth/react`)

```tsx
'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Section, Card, CardContent, Button } from '@/components'

export default function LoginPage() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState('')
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await signIn('credentials', { email, password, redirect: false })
    if (res?.error) setError('Credenciales incorrectas'); else window.location.href = '/admin'
  }
  return (
    <Section variant='gradient' size='xl'>
      <div className='max-w-md mx-auto'>
        <Card variant='elevated' padding='lg'><CardContent>
          <h1 className='font-caveat font-bold text-3xl text-foreground mb-6'>Panel · Iniciar sesión</h1>
          <form onSubmit={onSubmit} className='space-y-4'>
            <input className='input-custom w-full' type='email' placeholder='Correo' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className='input-custom w-full' type='password' placeholder='Contraseña' value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <p className='text-red-400 text-sm'>{error}</p>}
            <Button type='submit' className='w-full' size='lg'>Entrar</Button>
          </form>
        </CardContent></Card>
      </div>
    </Section>
  )
}
```

- [ ] **Step 10: Sembrar** — Run: `npm run db:seed` → "Admin sembrado".
- [ ] **Step 11: Verificación** — `npm test` en verde; `npm run build` compila.

---

## Task 10: Correo de aviso

**Files:** Modify `package.json` (dep `resend`); Create `src/lib/email.ts`, `src/lib/email.test.ts`

**Interfaces:**
- Produces: `construirAvisoSolicitud(r): { asunto, texto }`; `enviarAvisoNuevaSolicitud(r): Promise<void>` (Resend si hay `RESEND_API_KEY`; si no, `console.info`, sin fallar).

- [ ] **Step 1: Instalar** — Run: `npm install resend`
- [ ] **Step 2: Test de la parte pura (falla primero)** — `src/lib/email.test.ts`

```ts
import { describe, it, expect } from 'vitest'
import { construirAvisoSolicitud } from './email'
describe('construirAvisoSolicitud', () => {
  it('arma asunto y cuerpo', () => {
    const { asunto, texto } = construirAvisoSolicitud({ clienteNombre: 'Ana', clienteTelefono: '5512345678', tipoEvento: 'Boda', fecha: '2026-09-10' })
    expect(asunto).toContain('solicitud'); expect(texto).toContain('Ana'); expect(texto).toContain('2026-09-10')
  })
})
```

- [ ] **Step 3: Ver fallar** → FAIL.
- [ ] **Step 4: `src/lib/email.ts`**

```ts
import { Resend } from 'resend'
type AvisoInput = { clienteNombre: string; clienteTelefono: string; tipoEvento: string; fecha: string }

export function construirAvisoSolicitud(r: AvisoInput) {
  const asunto = `Nueva solicitud de fecha (${r.fecha})`
  const texto = [
    'Recibiste una nueva solicitud de reserva:',
    `• Fecha: ${r.fecha}`, `• Cliente: ${r.clienteNombre}`, `• Teléfono: ${r.clienteTelefono}`, `• Tipo de evento: ${r.tipoEvento}`,
    '', 'Entra al panel para autorizar o rechazar.',
  ].join('\n')
  return { asunto, texto }
}
export async function enviarAvisoNuevaSolicitud(r: AvisoInput): Promise<void> {
  const { asunto, texto } = construirAvisoSolicitud(r)
  const apiKey = process.env.RESEND_API_KEY, destino = process.env.CORREO_AVISOS
  if (!apiKey || !destino) { console.info('[aviso solicitud]', asunto, texto); return }
  await new Resend(apiKey).emails.send({ from: 'Salón Campeche <onboarding@resend.dev>', to: destino, subject: asunto, text: texto })
}
```

- [ ] **Step 5: Ver pasar** → PASS. **Verificación** — `npm test` en verde.

---

## Task 11: Server Action pública + acciones de administración

**Files:** Create `src/app/disponibilidad/actions.ts`, `src/app/admin/actions.ts`

**Interfaces:**
- Produces: `crearSolicitudAction(input: SolicitudInput, honeypot?: string): Promise<{ ok: true } | { ok: false; error: string }>`; acciones admin `autorizarAction/rechazarAction/confirmarAction/cancelarAction/bloquearAction/crearManualAction`.

- [ ] **Step 1: `src/app/disponibilidad/actions.ts`**

```ts
'use server'
import { crearSolicitud } from '@/lib/reservas/service'
import { enviarAvisoNuevaSolicitud } from '@/lib/email'
import { FechaNoDisponibleError } from '@/lib/reservas/errors'
import type { SolicitudInput } from '@/lib/reservas/validators'

export async function crearSolicitudAction(input: SolicitudInput, honeypot?: string) {
  if (honeypot) return { ok: true as const } // anti-spam: bot rellenó el campo oculto
  try {
    const r = await crearSolicitud(input)
    await enviarAvisoNuevaSolicitud({ clienteNombre: r.clienteNombre, clienteTelefono: r.clienteTelefono, tipoEvento: r.tipoEvento, fecha: r.fecha })
    return { ok: true as const }
  } catch (e) {
    if (e instanceof FechaNoDisponibleError) return { ok: false as const, error: 'Esa fecha ya no está disponible.' }
    return { ok: false as const, error: 'No se pudo enviar la solicitud. Inténtalo de nuevo.' }
  }
}
```

- [ ] **Step 2: `src/app/admin/actions.ts`**

```ts
'use server'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import * as svc from '@/lib/reservas/service'
import type { SolicitudInput } from '@/lib/reservas/validators'

async function requireAdmin() { if (!(await auth())) throw new Error('No autorizado') }

export async function autorizarAction(id: string) { await requireAdmin(); await svc.autorizar(id); revalidatePath('/admin') }
export async function rechazarAction(id: string) { await requireAdmin(); await svc.rechazar(id); revalidatePath('/admin') }
export async function confirmarAction(id: string, monto?: number) { await requireAdmin(); await svc.confirmarAnticipo(id, monto); revalidatePath('/admin') }
export async function cancelarAction(id: string) { await requireAdmin(); await svc.cancelar(id); revalidatePath('/admin') }
export async function bloquearAction(fecha: string, notas?: string) { await requireAdmin(); await svc.bloquearFecha(fecha, notas); revalidatePath('/admin') }
export async function crearManualAction(input: SolicitudInput & { estado: 'EN_ESPERA' | 'CONFIRMADA' }) { await requireAdmin(); await svc.crearReservaManual(input); revalidatePath('/admin') }
```

- [ ] **Step 3: Verificación** — `npm run build` compila.

---

## Task 12: Calendario público leyendo la BD + formulario

**Files:**
- Modify: `src/app/disponibilidad/page.tsx` (Server Component)
- Create: `src/app/disponibilidad/CalendarioDisponibilidad.tsx`, `src/app/disponibilidad/SolicitudForm.tsx`
- Create: `src/app/api/disponibilidad/route.ts`

**Interfaces:** Consumes `disponibilidadMes`, `crearSolicitudAction`, `getTodayLocalISO` (`@/lib/validators`), `Modal` (`@/components`).

- [ ] **Step 1: `src/app/api/disponibilidad/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { disponibilidadMes } from '@/lib/reservas/service'
export async function GET(req: NextRequest) {
  const anio = Number(req.nextUrl.searchParams.get('anio'))
  const mes = Number(req.nextUrl.searchParams.get('mes'))
  if (!anio || !mes || mes < 1 || mes > 12) return NextResponse.json([], { status: 400 })
  return NextResponse.json(await disponibilidadMes(anio, mes))
}
```

- [ ] **Step 2: Reescribir `page.tsx` como Server Component** que obtiene `disponibilidadMes` del mes actual y lo pasa a `CalendarioDisponibilidad`; conservar las secciones informativas existentes (hero, "Información importante", CTAs); eliminar el arreglo mock `unavailableDates`.

- [ ] **Step 3: `CalendarioDisponibilidad.tsx`** (Client) — adaptar el calendario visual actual (el de la versión mock, con navegación de meses): recibe `diasIniciales: DisponibilidadDia[]`; al cambiar de mes hace `fetch('/api/disponibilidad?anio=&mes=')`; pinta cada día según `estado` (`disponible`🟢/`apartada`🟡/`reservada`🔴/`no-disponible`⚫); solo las fechas `disponible` y futuras (usar `getTodayLocalISO`) abren `SolicitudForm`; las demás no son clicables. Reutilizar estilos/estructura del calendario existente y el componente `Modal`.

- [ ] **Step 4: `SolicitudForm.tsx`** (Client, dentro de `Modal`) — campos del `solicitudSchema` + un **campo oculto "honeypot"** (`<input className='hidden' tabIndex={-1} autoComplete='off' aria-hidden='true' />`); al enviar llama `crearSolicitudAction(input, honeypot)`; muestra éxito ("Recibimos tu solicitud, te confirmamos pronto") o el `error` devuelto; incluir botón de WhatsApp como alternativa.

- [ ] **Step 5: Verificación (navegador)** — `npm run build && npm start`. En `/disponibilidad`: fechas confirmadas/bloqueadas se ven ocupadas y no clicables; una fecha libre abre el formulario y al enviar crea la solicitud (verificar en `npm run db:studio` que aparece `SOLICITADA`) y al recargar la fecha pasa a "apartada".

---

## Task 13: Panel admin — layout, bandeja y acciones

**Files:** Create `src/app/admin/layout.tsx`, `src/app/admin/page.tsx`, `src/app/admin/ReservaCard.tsx`

**Interfaces:** Consumes `auth`/`signOut` (auth.ts), `listarSolicitudesPendientes`/`reservasDelMes` (service), acciones de `admin/actions.ts`, `TRANSICIONES` (estados).

- [ ] **Step 1: `src/app/admin/layout.tsx`** (verifica sesión en servidor; encabezado con "Cerrar sesión")

```tsx
import { auth, signOut } from '@/lib/auth'
import { redirect } from 'next/navigation'
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await auth())) redirect('/admin/login')
  return (
    <div className='min-h-screen'>
      <header className='flex items-center justify-between p-4 border-b border-gray-800'>
        <span className='font-caveat font-bold text-2xl text-foreground'>Panel · Salón Campeche</span>
        <form action={async () => { 'use server'; await signOut({ redirectTo: '/admin/login' }) }}>
          <button className='btn-ghost'>Cerrar sesión</button>
        </form>
      </header>
      <main className='container-section py-8'>{children}</main>
    </div>
  )
}
```

- [ ] **Step 2: `ReservaCard.tsx`** (Client) — muestra los datos de una reserva y, según `estado`, los botones válidos (usar `TRANSICIONES` para decidir): SOLICITADA → Autorizar/Rechazar; EN_ESPERA → Marcar anticipo recibido/Cancelar; CONFIRMADA/BLOQUEADA → Cancelar. Cada botón llama la acción correspondiente dentro de `useTransition` (mostrar "Procesando…"). Para "anticipo recibido" pedir el monto (input) opcional.

- [ ] **Step 3: `src/app/admin/page.tsx`** (Server) — `const pendientes = await listarSolicitudesPendientes()`; renderiza la **bandeja** (cada pendiente con `ReservaCard`) y un resumen del mes con `reservasDelMes`. Reutilizar `Card`, `Section`.

- [ ] **Step 4: Verificación (navegador)** — `/admin` sin sesión redirige a login; iniciar sesión; ver la solicitud creada en Task 12; **Autorizar** → "en espera"; **anticipo recibido** → "confirmada"; comprobar en `/disponibilidad` que quedó reservada; **Rechazar** otra libera la fecha.

---

## Task 14: Panel admin — agenda del mes, apartado manual y bloqueo

**Files:** Create `src/app/admin/AgendaMes.tsx`, `src/app/admin/NuevaReservaManual.tsx`, `src/app/api/admin/reservas/route.ts`; Modify `src/app/admin/page.tsx`

**Interfaces:** Consumes `reservasDelMes` (service, vía route protegida), `crearManualAction`/`bloquearAction`.

- [ ] **Step 1: `src/app/api/admin/reservas/route.ts`** (protegida)

```ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { reservasDelMes } from '@/lib/reservas/service'
export async function GET(req: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const anio = Number(req.nextUrl.searchParams.get('anio')), mes = Number(req.nextUrl.searchParams.get('mes'))
  if (!anio || !mes) return NextResponse.json([], { status: 400 })
  return NextResponse.json(await reservasDelMes(anio, mes))
}
```

- [ ] **Step 2: `AgendaMes.tsx`** (Client) — calendario del mes con colores por estado real; clic en un día con reserva abre su detalle (`ReservaCard`); clic en un día libre ofrece **Bloquear** (`bloquearAction`) o **Apartar manual** (`NuevaReservaManual`). Navegación de meses vía `fetch('/api/admin/reservas?anio=&mes=')`.

- [ ] **Step 3: `NuevaReservaManual.tsx`** (Client, dentro de `Modal`) — campos del cliente + selector de estado inicial (En espera / Confirmada); llama `crearManualAction`.

- [ ] **Step 4: Integrar** `AgendaMes` y el botón "Apartar fecha manualmente" en `admin/page.tsx`.

- [ ] **Step 5: Verificación (navegador)** — apartar una fecha manualmente (queda ocupada en `/disponibilidad`); bloquear una fecha (no disponible en público); cancelar/desbloquear la libera.

---

## Verificación final de la Fase 1
- [ ] `npm test` — toda la suite en verde.
- [ ] `npm run build` y `npx eslint .` — sin errores.
- [ ] Recorrido end-to-end: cliente solicita → bandeja + correo/log → dueño autoriza → apartada → anticipo recibido → reservada; bloquear/cancelar liberan; `/admin` exige login.

## Notas de despliegue (Dokploy)
- La app corre como contenedor; el archivo SQLite vive en un **volumen persistente** montado en `prisma/` (o una ruta dedicada vía `DATABASE_URL=file:/data/prod.db`). Respaldo = copiar el archivo `.db`.
- Variables en Dokploy: `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `RESEND_API_KEY`, `CORREO_AVISOS`, `DIAS_APARTADO`, `NEXT_PUBLIC_SITE_URL`.
- En el arranque ejecutar `prisma migrate deploy` y, la primera vez, `npm run db:seed`.
- Añadir `output: 'standalone'` en `next.config.ts` para una imagen Docker más ligera.

## Fuera de alcance (Fases 2-3)
- Expiración automática por cron (Fase 1 usa expiración perezosa en lectura), recordatorios, historial/auditoría, estadísticas.
- Pago del anticipo en línea, WhatsApp Business API, multi-espacio por piso.
