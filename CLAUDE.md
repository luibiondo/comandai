# Comandaí: contexto do projeto

> Resumo de tudo que foi conversado e decidido até aqui. Leia antes de mexer no código.
> Idioma de trabalho: português do Brasil.

## 1. Visão do produto

**Comandaí** é um sistema para restaurantes com foco em **controle de produtos** e, principalmente, **controle de comandas**.

Duas visões (papéis):

| Papel | Quem usa | Plataforma |
|---|---|---|
| `ADMIN` | caixa / dono | portal web |
| `EMPLOYEE` | garçons | app mobile |

Ideia central: no mesmo ambiente, **anotar pedidos e controlar as comandas**.

**Fora de escopo por enquanto:** integração com o financeiro do restaurante.

## 2. Decisões tomadas

- **Nome:** Comandaí (escolhido entre Comandei, Comandex, Mesaí, Salão, Fechô, Anotô).
  - Pendente: confirmar domínio `.com.br`/`.app`, nome nas lojas (App Store/Play Store) e colisão de marca no INPI.
- **Formato:** monorepo único, `comandai`.
- **Repositório:** https://github.com/luibiondo/comandai (conta pessoal, **privado**, licença **MIT**, branch `main`).
- **Gerenciador de pacotes: npm (npm workspaces). NÃO usar pnpm nem yarn.**

## 3. Stack

| Camada | Tecnologia | Status |
|---|---|---|
| Backend | TypeScript + **NestJS** + **Prisma** | decidido |
| Web (admin) | **Next.js** (App Router) + TypeScript | decidido |
| Mobile (garçom) | **Flutter** | decidido |
| Banco | **PostgreSQL 17** | proposto, não contestado |

Propostas ainda não confirmadas (tratar como sugestão, validar antes de adotar):
- Web: MUI + TanStack Query.
- Mobile: Riverpod + `dio` com client gerado do OpenAPI.
- Tempo real: WebSocket (gateway do Nest) para o caixa ver pedidos entrando ao vivo.
- Contrato da API: Swagger/OpenAPI, gerando clients TS e Dart.
- Auth: JWT com papéis `ADMIN` / `EMPLOYEE`.

## 4. Princípios de arquitetura (propostos)

1. **Multi-tenant desde o dia 1:** toda tabela de negócio com `restaurantId`. Retrofit depois é caro.
2. **Transações** nas operações críticas (fechar comanda, dividir conta, baixa de estoque).
3. **Offline-tolerante no mobile:** Wi-Fi de restaurante é ruim, então prever fila local de pedidos com sincronização posterior. Não precisa estar no MVP, mas a arquitetura deve permitir.
4. Contrato único da API (OpenAPI) em vez de tipos escritos à mão em cada app.

## 5. Estrutura do repositório

```
comandai/
├── apps/
│   ├── api/       # NestJS (porta padrão 3001)
│   ├── web/       # Next.js (porta 3000)
│   └── mobile/    # Flutter (fora do workspace npm; só README por enquanto)
├── packages/      # código compartilhado (vazio por enquanto)
├── docker-compose.yml   # Postgres 17 (user/senha/db: comandai)
├── .env.example         # DATABASE_URL, JWT_SECRET, PORT=3001
├── package.json         # npm workspaces: apps/api, apps/web, packages/*
├── package-lock.json
├── .nvmrc               # Node 22
└── README.md
```

Scripts da raiz: `dev:api`, `dev:web`, `build`, `lint`, `test`, `db:up`, `db:down`.

## 6. Estado atual

Feito:
- Repositório criado no GitHub (privado, MIT) e clonado localmente.
- Estrutura inicial do monorepo commitada e enviada (`chore: estrutura inicial do monorepo`):
  - `apps/api`: NestJS 12 gerado pelo CLI, **ESM** (imports relativos terminam em `.js`), testes com **Vitest**, lint com **oxlint**. Pacote `@comandai/api`, porta 3001.
  - `apps/web`: Next.js 16 (App Router, `src/`, Turbopack, ESLint, **sem Tailwind**, já que a lib de UI ainda não foi decidida). Pacote `@comandai/web`, porta 3000.
  - `apps/mobile`: só README (Flutter ainda não gerado).
  - Cada app tem um `AGENTS.md` gerado pelo framework, com dicas da versão atual. Ler antes de mexer.
  - `build`, `lint`, `test` e `test:e2e` da API passando.

## 7. Próximos passos (em ordem)

1. ~~Primeiro commit e push (`chore: estrutura inicial do monorepo`).~~ Feito.
2. Configurar Prisma em `apps/api` e **modelar o banco**: restaurante, usuário, mesa, comanda, item da comanda, produto (e categoria).
3. Auth (JWT + papéis) e Swagger/OpenAPI.
4. Gerar o projeto Flutter em `apps/mobile`.
5. Definir MVP: fluxo abrir comanda → lançar itens → fechar comanda; CRUD de produtos no admin.

## 8. Convenções

- Responder e comentar em português; identificadores de código em inglês ou no padrão já usado no repo (decidir ao modelar o banco).
- Sempre `npm` (`npm install`, `npm run ... -w apps/api`). Nunca `pnpm`.
- Nunca versionar `.env`; usar `.env.example`.
- Commits curtos, no padrão convencional (`chore:`, `feat:`, `fix:`).
