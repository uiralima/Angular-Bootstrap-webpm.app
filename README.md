
# WebpmApp

Projeto para controlar atividades a serem feitas e gerenciamento de projetos e de time de trabalho, foi feito afim de demonstração de utilização do Angular 9. 

## Simulação de Backend

Para simular o backend estou usando inicialmente o json-server com o arquivo database.json para iniciá-lo basta rodar o comando: 

    json-server --watching database.json

## TODO List:

 001. ~~Criar componente de trabalho principal e tirar o funcionamento do app.component~~.
 002. ~~Autenticar usuários pelo Firebase.~~
 003. ~~Criar formulário de cadastro de projetos.~~
 004. ~~Formatação da barra de navegação.~~
 005. ~~Criação da página de menus para mobile.~~
 006. Criar formulário de gerenciamento de projetos.
 007. Permitir adicionar anotações na atividade.
 008. Possibilitar finalizar a atividade.
 009. Possibilitar anexa link de arquivos à atividade.
 010. Implementar uma interface de dados para ~~persistir projetos~~ e atividades no Firebase, excluindo assim a necessidade do json-server.

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
 - Firebase - [https://firebase.google.com/](https://firebase.google.com/)
