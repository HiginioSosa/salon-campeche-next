import { execSync } from 'node:child_process'

// Crea/actualiza el esquema en la BD de pruebas una vez antes de correr los tests.
export default function setup() {
  execSync('npx prisma migrate deploy', {
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: 'file:./prisma/test.db' },
  })
}
