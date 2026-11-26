import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'prisma/config';

// O Prisma 7 não carrega .env sozinho. O .env do projeto fica na raiz do monorepo.
// Variáveis já definidas no ambiente (CI, produção) não são sobrescritas.
const rootEnv = resolve(import.meta.dirname, '../../.env');
if (existsSync(rootEnv)) {
  process.loadEnvFile(rootEnv);
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Sem env() de propósito: `prisma generate` (rodado no postinstall) não precisa de banco.
    url: process.env['DATABASE_URL'],
  },
});
