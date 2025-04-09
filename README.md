# 🌱 Frontend - Aplicação de Metas Financeiras

Este é o frontend de uma aplicação de controle de metas financeiras. O projeto permite criar, visualizar, atualizar e excluir objetivos financeiros, além de definir salário mensal e acompanhar quanto falta para atingir cada meta.

---

## 🚀 Funcionalidades

- Login com nome de usuário (cria se não existir)
- Armazenamento do usuário no localStorage
- Visualização do salário e metas financeiras
- Criação, edição e exclusão de metas
- Atualização de salário e nome de usuário
- Comunicação com API REST (http://localhost:5001)
- Execução via npm start ou Docker

---

## ⚙️ Instalação e Configuração

Você pode executar o frontend de duas formas: **via Docker** ou **localmente**.

Primeiro clone o repositório:

```bash
git clone https://github.com/yoko-takano/front-mvp-4.git
cd front-mvp-4
```

### 🔧 Rodando com npm start (recomendado)
Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
npm start
```

Acesse em: http://localhost:3000

Lembre-se de que a API deve estar rodando em http://localhost:5001

### 🐳 Rodando com Docker
 
Com o backend rodando na porta 5001, execute o frontend:

```bash
docker-compose up --build
```

---

## 📌 Principais Endpoints

As rotas abaixo compõem as rotas que são utilizadas pelo Front-End
(utilizando a API Principal, que utiliza a API Secundária):

**`GET` /users/{username}** – Busca dados do usuário  
**`POST` /users** – Cria novo usuário  
**`PUT` /users/{username}/username** – Atualiza o nome de usuário  
**`PUT` /users/{username}/salary** – Atualiza o salário  
**`POST` /users/{username}/goal** – Cria nova meta  
**`PUT` /users/{username}/goal/{goalId}** – Atualiza meta existente  
**`DELETE` /users/{username}/goal/{goalId}** – Exclui meta  
