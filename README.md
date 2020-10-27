
# WebpmApp

Projeto para controlar atividades a serem feitas e gerenciamento de projetos e de time de trabalho, foi feito afim de demonstração de utilização do Angular 9. 

## Simulação de Backend

Para simular o backend estou usando inicialmente o json-server com o arquivo database.json para iniciá-lo basta rodar o comando: 

    json-server --watching database.json

## TODO List:

 1. Criar componente de trabalho principal e tirar o funcionamento do app.component.
 2. Criar formulário de cadastro de projetos.
 3. Criar formulário de cadastro de atividades.
 4. Permitir adicionar anotações na atividade.
 5. Possibilitar finalizar a atividade.
 6. Possibilitar anexa link de arquivos à atividade.
 7. Implementar uma interface de dados para persistir  no Firebase.

## Iniciar servidor
Para rodar a aplicação basta rodar o comando:

    ng serve

## Deploy
Para fazer o deploy rode o comando:

    ng build --prod
    
## Ferramentas Utilizadas

 - Angular - [https://angular.io/](https://angular.io/)
 - Bootstrap - [https://getbootstrap.com/](https://getbootstrap.com/)
 - NodeJS - [https://nodejs.org/](https://nodejs.org/)
 - Json Server - [https://www.npmjs.com/package/json-server](https://www.npmjs.com/package/json-server)
