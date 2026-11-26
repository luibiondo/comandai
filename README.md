# Comandaí

Controle de produtos e comandas para restaurantes: portal web para o caixa/dono (`ADMIN`) e app mobile para os garçons (`EMPLOYEE`).

## Stack

| Camada | Tecnologia |
|---|---|
| API | NestJS + TypeScript (Prisma em breve) |
| Web (admin) | Next.js (App Router) + TypeScript |
| Mobile (garçom) | Flutter |
| Banco | PostgreSQL 17 |

## Estrutura

```
apps/
  api/       NestJS (porta 3001)
  web/       Next.js (porta 3000)
  mobile/    Flutter (fora do workspace npm)
packages/    código compartilhado
```

## Rodando localmente

Requisitos: Node 22+ (`nvm use`), npm, Docker.

```bash
npm install          # instala todos os workspaces
cp .env.example .env # ajuste os valores
npm run db:up        # sobe o Postgres 17
npm run dev:api      # http://localhost:3001
npm run dev:web      # http://localhost:3000
```

Outros scripts: `npm run build`, `npm run lint`, `npm test`, `npm run db:down`.

> Gerenciador de pacotes: **npm** (workspaces). Não use pnpm nem yarn.

## Licença

MIT
