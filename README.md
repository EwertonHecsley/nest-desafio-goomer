# Gestão de Produtos e Restaurantes

## Descrição

Este projeto é uma aplicação de gestão de produtos e restaurantes, desenvolvida utilizando o framework NestJS para Node.js. A aplicação segue os princípios do Domain-Driven Design (DDD), utilizando métodos do tipo `Either` nos casos de uso para gerenciar erros de forma clara e eficiente. O Prisma é utilizado como ORM para interação com o banco de dados, facilitando o mapeamento objeto-relacional e a execução de consultas. Este projeto foi inspirado no desafio proposto pela Goomer, que serviu como base para a criação de uma solução robusta e escalável.

## Funcionalidades

### Produto

- **Criação de Produto**: Endpoint `POST /product` para criar novos produtos.
- **Listagem de Produtos**: Endpoint `GET /product` para listar todos os produtos.
- **Consulta de Produto por ID**: Endpoint `GET /product/:id` para consultar um produto específico.
- **Atualização de Produto**: Endpoint `PUT /product/:id` para atualizar um produto existente.
- **Deleção de Produto**: Endpoint `DELETE /product/:id` para deletar um produto.

### Restaurante

- **Criação de Restaurante**: Endpoint `POST /restaurant` para criar novos restaurantes.
- **Listagem de Restaurantes**: Endpoint `GET /restaurant` para listar todos os restaurantes.
- **Consulta de Restaurante por ID**: Endpoint `GET /restaurant/:id` para consultar um restaurante específico.

## Pré-requisitos

- Node.js instalado
- Prisma ORM configurado para o seu banco de dados
- Familiaridade com o framework NestJS

## Instalação

1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Configure o Prisma ORM de acordo com o seu banco de dados.
4. Execute as migrations com `npx prisma migrate dev`.
5. Execute a aplicação com `npm run start`.

## Como usar

Para usar a aplicação, siga os passos acima na seção de instalação. Utilize ferramentas de API REST, como Postman ou Insomnia, para interagir com os endpoints.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto é licenciado sob a licença MIT.

## Autores

- Ewerton Hecsley Martins Nunes

## Contato

- 📧 E-mail: [ewerton.martinscomercial@gmail.com](mailto:ewerton.martinscomercial@gmail.com)
- 🔗 LinkedIn: [Ewerton Hecsley](https://www.linkedin.com/in/ewerton-hecsley-8a613992/)

## Versão

- 1.0.0

