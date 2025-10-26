# Projeto de Gerenciamento de Usuários e Participantes

## Descrição do Projeto

Este projeto reúne tanto o backend quanto o frontend para um sistema de gerenciamento de usuários, voluntários e apoiadores.  

O backend consiste em uma API RESTful construída com Node.js, Express, MongoDB, bcrypt, jsonwebtoken e dotenv para controle seguro de acesso, autenticação e autorização.  

O frontend está separado em uma pasta distinta dentro do mesmo repositório, desenvolvido com [translate:Vite] para ser simples e eficiente, consumindo a API do backend.

### Modelos de Dados Backend

O modelo de usuário inclui:  
● name (string)  
● email (string)  
● password (string)  
● phone (string)  
● birth (date)  
● sex (string)  
● type (string — admin, voluntário, apoiador, usuário)  
● address (string)  
● createdAt (timestamps do mongoose)  
● updatedAt (timestamps do mongoose)  

O modelo de participante (voluntário/apoiador), quando separado do usuário, possui atributos semelhantes, exceto o campo senha.

O fluxo do sistema impede auto-cadastro: o primeiro admin é inserido manualmente no banco de dados, e apenas usuários com permissão de admin podem registrar novos usuários pela API.

---

## Pré-requisitos

Será necessário criar uma conta gratuita no **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** para hospedar o banco de dados em nuvem, e criar um cluster onde será armazenada a base da aplicação.

Após criar a conta e cluster, configure uma string de conexão (URI MongoDB) no arquivo `.env` do projeto.

---

## Como rodar a aplicação

1. **Clone este repositório**
git clone https://github.com/nethzzz/Certificadora03

cd Certificadora03

cd backend

3. **Instale as dependências**

npm install

3. **Configure o arquivo `.env`**  

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis (exemplo):

MONGODB_URI=""

SECRET=""

**Insira manualmente o primeiro usuário admin no banco de dados**  

Gere a senha criptografada usando o bcrypt no terminal Node:

require('bcrypt').hashSync('suaSenhaAdmin', 12)

Insira o admin manualmente no banco (via MongoDB Atlas, Compass ou CLI):

db.users.insertOne({
name: "Administrador Master",
email: "admin@site.com",
password: "<hash_gerado_acima>",
phone: "11999999999",
birth: ISODate("1990-01-01"),
sex: "Masculino",
address: "Rua Central, 123",
type: "admin"
})

5. **Execute a aplicação**

   npm start

O servidor estará rodando em `http://localhost:3000/`.

---

## Frontend

O frontend para consumir esta API está separado em uma pasta distinta no mesmo repositório, chamada `frontend`.

Para executá-lo:  

- Navegue até o diretório frontend:

cd ../frontend

- Instale as dependências do frontend:

npm install

- Execute a aplicação frontend utilizando **Vite**:

npm run dev

O frontend será iniciado (normalmente em `http://localhost:5173`) e estará pronto para consumir as rotas da API backend.

---

## Documentação

A documentação da API está disponível via Swagger UI, acessível em `http://localhost:3000/api-docs` após iniciar o backend, com todas as rotas organizadas por tags para facilitar a navegação.

---

## Teste das Rotas

Para testar a API, recomenda-se usar a extensão **REST Client** no Visual Studio Code, que permite enviar requisições HTTP a partir de arquivos `.http` que acompanham o projeto.

---

## Segurança e Fluxo de Cadastro

- O cadastro inicial do administrador deve ser feito manualmente na base para garantir controle inicial.  
- O cadastro via API está restrito a usuários administrativos autenticados.  
- Autenticação e autorização são feitas com token JWT que carrega a permissão do usuário para controle de acesso seguro.

---
