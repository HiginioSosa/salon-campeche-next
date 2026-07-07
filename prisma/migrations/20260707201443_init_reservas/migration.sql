-- CreateTable
CREATE TABLE "Reserva" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fecha" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "espacio" TEXT,
    "clienteNombre" TEXT NOT NULL,
    "clienteTelefono" TEXT NOT NULL,
    "clienteEmail" TEXT,
    "tipoEvento" TEXT NOT NULL,
    "numInvitados" INTEGER,
    "mensajeCliente" TEXT,
    "notasInternas" TEXT,
    "anticipoMonto" INTEGER,
    "anticipoRecibidoEn" DATETIME,
    "solicitadaEn" DATETIME,
    "autorizadaEn" DATETIME,
    "expiraEn" DATETIME,
    "confirmadaEn" DATETIME,
    "creadaEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadaEn" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "UsuarioAdmin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "creadaEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "Reserva_fecha_idx" ON "Reserva"("fecha");

-- CreateIndex
CREATE INDEX "Reserva_estado_idx" ON "Reserva"("estado");

-- CreateIndex
CREATE UNIQUE INDEX "UsuarioAdmin_email_key" ON "UsuarioAdmin"("email");

-- Impide dos reservas ACTIVAS en la misma fecha (evita doble reserva / condición de carrera)
CREATE UNIQUE INDEX "reserva_fecha_activa_unica"
ON "Reserva" ("fecha")
WHERE "estado" IN ('SOLICITADA', 'EN_ESPERA', 'CONFIRMADA', 'BLOQUEADA');
