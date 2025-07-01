
# Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Configuração do Ambiente Local](#configuração-do-ambiente-local)
- [Testes unitários com Jest no backend](#testes-unitários-com-jest-no-backend)
- [Containerização com Docker](#containerização-com-docker)
- [CICD com GitHub Actions](#cicd-com-github-actions)


## Visão Geral

A aplicação é um monorepo contendo duas partes principais:

1.  **Backend**: Uma API RESTful construída com **NestJS**, utilizando **Prisma** como ORM para se comunicar com um banco de dados **PostgreSQL**.
2.  **Frontend**: Uma Single-Page Application (SPA) construída com **React** e **Vite**, utilizando **TypeScript** e **CSS Modules** para uma experiência de desenvolvimento moderna e estilização com escopo local.

## Funcionalidades

- ✅ **Criar** novas tarefas.
- ✅ **Listar** todas as tarefas existentes.
- ✅ **Atualizar** o status de uma tarefa (completa/pendente).
- ✅ **Editar** o título de uma tarefa através de um modal.
- ✅ **Excluir** uma tarefa.

## Tecnologias Utilizadas

### Backend
- **Framework**: [NestJS](https://nestjs.com/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Banco de Dados**: [PostgreSQL](https://www.postgresql.org/)
- **Validação**: `class-validator`, `class-transformer`
- **Testes**: [Jest](https://jestjs.io/)

### Frontend
- **Framework/Biblioteca**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Requisições HTTP**: [Axios](https://axios-http.com/)
- **Estilização**: CSS Modules
- **Ícones**: [React Icons](https://react-icons.github.io/react-icons/)

### DevOps
- **Containerização**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)


# Configuração do Ambiente Local

Para rodar este projeto na sua máquina local, você precisará ter o Node.js (v20+), NPM e uma instância do PostgreSQL instalados.

## 1. Backend

### 1. Navegue até a pasta do backend
``` sh
cd backend
```
### 2. Crie um arquivo .env na raiz do projeto com as credenciais análogas ao .env.example
### (Lembre-se de preencher com suas credenciais do PostgreSQL local)

### 3. Instale as dependências
``` sh
npm install
```

### 4. Rode as migrações do Prisma para criar as tabelas no seu banco local
``` sh
npx prisma migrate dev
``` 

### 5. Inicie o servidor de desenvolvimento
``` sh
npm run start
```

### O backend estará rodando em http://localhost:3111

## 2. Frontend

### 1. Em um novo terminal, navegue até a pasta do frontend
``` sh
cd frontend
```

### 2. Crie um arquivo .env na raiz do projeto com as credenciais análogas ao .env.example
### (O valor padrão VITE_API_BASE_URL=http://localhost:3111 já deve funcionar)


### 3. Instale as dependências
``` sh
npm install
```

### 4. Inicie o servidor de desenvolvimento do Vite
``` sh
npm run dev
```

### A aplicação frontend estará acessível em http://localhost:5173 (ou outra porta indicada pelo Vite).

# Testes unitários com Jest no backend

### Para executar os testes unitários do backend, navegue até a pasta backend e rode:

``` sh
npm run test
```

# Containerização com Docker

Este projeto está totalmente configurado para rodar em um ambiente containerizado com Docker-Compose. Esta é a forma recomendada para garantir consistência entre os ambientes.

### Para subir a aplicação completa com um único comando, na raiz do projeto, execute:
``` sh
docker-compose up --build
```

- O frontend estará acessível em http://localhost:3001
- O backend estará acessível em http://localhost:3000

# CICD com GitHub Actions

Este projeto utiliza GitHub Actions para automação da Integração Contínua. O workflow configurado está localizado em `.github/workflows/backend-tests.yml` e é responsável por garantir a qualidade e a saúde do código do backend.

O workflow é acionado automaticamente a cada `push` ou `pull request` para a branch principal (`master`) e executa os seguintes passos:

1.  **Checkout do Código**: Baixa a versão mais recente do código do repositório.
2.  **Setup do Ambiente**: Prepara uma máquina virtual Ubuntu com a versão correta do Node.js (v20).
3.  **Instalação de Dependências**: Executa `npm install` na pasta do backend, utilizando cache para acelerar o processo em execuções futuras.
4.  **Execução dos Testes**: Roda o comando `npm run test` para executar toda a suíte de testes unitários do NestJS.

O status do último build (se os testes passaram ou falharam) é exibido pelo badge no topo desta seção.
