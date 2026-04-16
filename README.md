# BibliotecarioAls

Projeto monorepo para a Biblioteca Corporativa.

## Estrutura

- `apps/backend`: NestJS + SAML authentication + serviços de domínio para `obras`, `exemplares` e `emprestimos`
- `apps/backend/db/schema.sql`: DDL de tabelas para usuários, obras, exemplares e empréstimos
- `apps/frontend`: Next.js + Tailwind + portal do leitor

## Scripts

- `npm run bootstrap` - Instalar dependências
- `npm run dev:backend` - Iniciar servidor backend em desenvolvimento
- `npm run dev:frontend` - Iniciar servidor frontend em desenvolvimento
- `npm run build:backend` - Build do backend
- `npm run build:frontend` - Build do frontend
- `npm test` - Executar todos os testes (backend + frontend)

## Melhorias Implementadas (MVP)

### ✅ 1. DTOs + class-validator
- Validação de entrada em todas as rotas
- Proteção contra dados inválidos
- Transformação automática de tipos

### ✅ 2. Global Exception Filter
- Tratamento consistente de erros
- Respostas com formato padronizado
- Melhor experiência de usuário

### ✅ 3. @nestjs/config com Joi
- Gerenciamento seguro de variáveis de ambiente
- Validação de configurações na inicialização
- `.env.example` sem credenciais expostas

### ✅ 4. Swagger/OpenAPI
- Documentação automática em `/api`
- Interface interativa para testar endpoints
- Schemas de request/response

## Configuração

1. Copiar `.env.example` para `.env` e preencher as variáveis
2. Executar `npm run bootstrap`
3. Iniciar backend: `npm run dev:backend`
4. Iniciar frontend: `npm run dev:frontend`

## Docker

Para desenvolvimento com containerização:

1. Construir e iniciar os serviços:
   ```bash
   docker-compose up --build
   ```

2. Acessar:
   - Frontend: http://localhost:3001
   - Backend: http://localhost:3000
   - API Docs: http://localhost:3000/api

3. Para desenvolvimento, os volumes estão montados para hot-reload.

## API Documentation

Após iniciar o backend, acessar: `http://localhost:3333/api`
