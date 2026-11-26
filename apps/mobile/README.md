# Comandaí: app mobile (garçom)

App Flutter usado pelos garçons (papel `EMPLOYEE`) para abrir comandas e lançar pedidos.

O projeto Flutter ainda não foi gerado. Quando for (passo 4 do roadmap), rodar a partir desta pasta:

```bash
flutter create --org br.com.comandai --project-name comandai_mobile .
```

Notas:

- Fica **fora** dos workspaces npm. Dependências são gerenciadas pelo `pub` (`flutter pub get`).
- O client HTTP será gerado a partir do contrato OpenAPI da API (`apps/api`).
- A arquitetura deve permitir fila local de pedidos com sincronização posterior (Wi-Fi de restaurante é instável).
