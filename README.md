
# Conversão de Moedas com Nestjs, Prisma e Swagger

Este projeto tem como propósito fornecer uma aplicação fácil de usar e eficiente para conversão de moedas em tempo real. Utilizamos a API do apilayer.com para garantir que as taxas de câmbio estão sempre atualizadas e precisas.

As principais tecnologias utilizadas neste projeto foram escolhidas com base em sua robustez, escalabilidade e facilidade de uso para desenvolvimento de aplicações em Node.js. O Nestjs é um framework web moderno que utiliza TypeScript e segue os princípios de arquitetura limpa. O Prisma é um ORM para Node.js que permite uma fácil integração com bancos de dados. Já o Swagger é uma ferramenta de documentação de API que nos permite descrever e documentar nossas APIs de uma forma clara e concisa.

A separação de camadas é um dos principais conceitos por trás deste projeto. Com a arquitetura limpa do Nestjs, podemos separar nossos componentes em diferentes camadas (Controller, Service, Repository) para facilitar a manutenção do código e a implementação de novas funcionalidades. Isso nos permite ter um código mais organizado, fácil de entender e escalável, além de permitir a fácil integração com outras ferramentas e serviços.

# Como inicializar
Para utilizar esta aplicação, basta clonar este repositório e seguir as instruções abaixo:

1 - Instale as dependências do projeto com o comando "npm install"

2 - Crie um arquivo .env na raiz do projeto com as variáveis de ambiente necessárias (veja o arquivo .env.example para um exemplo)

3 - Execute o comando npm run start:dev para iniciar a aplicação em modo de desenvolvimento

4 - Acesse a documentação da API em http://localhost:5000/api

# Como utilizar o projeto

Para utilizar esta aplicação, siga os passos abaixo:

1 - Crie um usuário com uma senha utilizando o endpoint /users e o método HTTP POST. 

```bash
{
 	"username": "testeUser",
	"password": "suasenha123"
}
```

2 - Teremos o seguinte payload:
```bash
{
	"id": 1,
	"username": "testeUser",
	"password": "$2b$10$tDE9YW5I19p1GgKcX2F2tO9HSy6eZN94/oQde0XWw0ERggiy80DIK",
	"Currency": [],
	"_count": {
		"Currency": 0
	}
}
```



2 - Faça login na aplicação utilizando o endpoint /auth/login e o método HTTP POST. Exemplo de payload:

```bash
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInVzZXJuYW1lIjoibWFyY29zIiwiaWF0IjoxNjgwNzI2OTc2LCJleHAiOjE2ODA4MTMzNzZ9.QyhghQFAWHgXLIlGzKERNihmFhBbjmSfvRrxB8zd6a0",
	"user": {
		"id": 1,
		"username": "testeUser",
		"Currency": []
	}
}
```

O endpoint de login irá retornar uma bearer token válida, que você deverá utilizar para acessar os demais endpoints da aplicação.

3 - Utilize a bearer token válida para acessar o endpoint /currency e o método HTTP GET. Esse endpoint irá fazer as conversões que o usuário deseja. Exemplo de header:

```bash
Exemplo de rota:
http://localhost:5000/currency/id/to/from/amount

Como já temos um usuário logado, podemos utilizar a rota:
http://localhost:5000/currency/1/USD/EUR/3570
```

4 - Feito isso, teremos o seguinte payload: 
```bash
{
	"id": 1,
	"username": "testeUser",
	"password": "$2b$10$tDE9YW5I19p1GgKcX2F2tO9HSy6eZN94/oQde0XWw0ERggiy80DIK",
	"Currency": [
		{
			"amount": 3570,
			"baseCurrency": "EUR",
			"conversionRate": 1.090537,
			"finalAmount": 3893.21709,
			"finalCurrency": "USD",
			"createdAtConverted": "2023-04-05",
			"id": 1
		}
	]
}
```

5 - Para listar todos os dados do usuário, inclusive todas as conversões feitas pelo mesmo, acesse a rota com o método HTTP GET:

```bash
{
	Exemplo de rota:
 	http://localhost:5000/users/username

	Como já temos um usuário logado, podemos utilizar a rota:
	http://localhost:5000/users/testeUser
}
```

Dessa forma teremos o seguinte payload: 

```bash
{
	"id": 1,
	"username": "testeUser",
	"password": "$2b$10$tDE9YW5I19p1GgKcX2F2tO9HSy6eZN94/oQde0XWw0ERggiy80DIK",
	"Currency": [
		{
			"amount": 3570,
			"baseCurrency": "EUR",
			"conversionRate": 1.090537,
			"finalAmount": 3893.21709,
			"finalCurrency": "USD",
			"createdAtConverted": "2023-04-05",
			"id": 1
		}
	]
}
```


# Licença
Este projeto está licenciado sob a Licença MIT. Consulte o arquivo LICENSE para mais informações.

## 🔗 Links
Qualquer dúvida estarei diponivel para responder.

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](matheusalves.vercel.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/matheus-alves96/)


