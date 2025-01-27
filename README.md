# **Documentação do Backend**

Bem-vindo à documentação oficial do projeto **Jornada na Educação Financeira Infantil**. 
Este documento detalha os principais aspectos técnicos, endpoints da API, configurações e como executar o ambiente de desenvolvimento.

---

## **1. Visão Geral**
- **Linguagem**: Typescript
- **Framework**: NestJS
- **Banco de Dados**: PostgreSQL (usando o Prisma ORM)
- **Autenticação**: JWT
- **Outras Tecnologias**: 

---

## **2. Estrutura do Projeto**
A estrutura do backend segue boas práticas de modularização e organização:
```
└── 📁backend
	└── 📁.github
		└── pull_request_template.md
	└── 📁prisma
		└── 📁migrations
		└── 📁schema
		└── seed.ts
		└── 📁seeds
	└── 📁src
		└── app.module.ts
		└── 📁config
			└── configuration.ts
		└── 📁database
			└── prisma.module.ts
			└── prisma.service.ts
			└── 📁messages
				└── email.ts
				└── swagger.ts
			└── utils.interface.ts
			└── utils.module.ts
			└── utils.service.ts
		└── 📁enums
		└── 📁global-jwt
		└── 📁guards
		└── 📁interceptors
		└── main.ts
		└── 📁modules
			└── 📁auth
				└── auth.controller.ts
				└── auth.d.ts
				└── auth.module.ts
				└── auth.service.ts
			└── 📁dto
				└── login-auth.dto.ts
				└── validate-auth.dto.ts
			└── 📁child
			└── 📁goal
			└── 📁mail
			└── 📁metrics
			└── 📁product
			└── 📁session
			└── 📁store
			└── 📁task
			└── 📁task-type
			└── 📁user
		└── 📁test
	└── .env
	└── dockerfile
	└── nest-cli.json
	└── package.json
	└── README.md
```

---

## **3. Endpoints da API**

Para ver os enpoints e suas documentações rode o projeto e abra a página [http://localhost:5000/docs](http://localhost:5000/docs)

---

## **4. Configuração do Ambiente**

### **4.1 Pré-requisitos**
- Node.js v18 ou superior
- Banco de dados PostgreSQL (Para entender como rodar o banco, abra a documentação do [Docker](https://github.com/Projeto-Integrador-Univesp-2024/docker))

### **4.2 Variáveis de Ambiente**
Crie um arquivo `.env` na raiz do projeto seguindo o formato do .env.example

### **4.3 Executando o Projeto**
1. Clone o projeto:
	```bash
			git clone https://github.com/Projeto-Integrador-Univesp-2024/backend.git
		```
2. Entre na raiz do projeto:
	```bash
		cd backend
	```
3. Instale as dependências:
	```bash
		npm install
	```
4. Gere os arquivos do Prisma:
	```bash
		npx prisma generate
	```
5. Rode o Seed:
	```bash
		npx prisma db seed
	```
6. Execute o servidor
	```bash
		npm run start:dev
	```
	
---

## **5. Testes**
Para rodar os testes:
```bash
	npm run test
```

---

## **6. Boas Práticas**
- Utilize mensagens de commit padronizadas
- Execute npm run lint antes de criar um pull request.
- Crie o commit com o comando `npm run commit`

---

© 2025 Jornada na Educação Financeira Infantil. Todos os direitos reservados.