# Projeto de Gerenciamento de Usuários e Participantes

## Descrição do Projeto

Este projeto consiste no desenvolvimento de uma API RESTful para um sistema de gerenciamento de usuários, voluntários e apoiadores, com foco em controle seguro de acesso. A aplicação utiliza Node.js, Express, MongoDB, bcrypt, jsonwebtoken e dotenv.  

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
cd Certificadora_3_backend

2. **Instale as dependências**

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

O servidor estará rodando em `http://localhost:3000/`.

---

## Documentação

A documentação da API pode ser acessada via Swagger UI no endpoint `/api-docs/` após iniciar o servidor, apresentando todas as rotas e detalhes de uso.

---

## Teste das Rotas

Para testar as rotas, utilize a extensão REST Client no Visual Studio Code:  

- Abra as extensões (Ctrl+Shift+X)  
- Busque e instale “REST Client” de Huachao Mao  
- Abra o arquivo `.http` no projeto  
- Use o botão "Send Request" para cada chamada HTTP

O repositório contém exemplos prontos de arquivos `.http` para facilitar os testes.

---

## Segurança e Fluxo de Cadastro

- O cadastro inicial de administrador deve ser feito manualmente direto no banco.  
- A rota pública de cadastro está desabilitada; apenas admins autenticados podem cadastrar novos usuários via API.  
- A autenticação e autorização são feitas via token JWT, com verificação do campo `type` para diferenciar administradores e outros perfis.  

---
