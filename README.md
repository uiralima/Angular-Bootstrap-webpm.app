  

# WebpmApp

  

Projeto para controlar atividades a serem feitas e gerenciamento de projetos e de time de trabalho, foi feito afim de demonstração de utilização do Angular 9.

## URL do projeto

https://webpm-73a86.web.app/

  

## Funcionamento

  

### Cadastro e Autenticação

  

O primeiro passo a ser feito para acessar o sistema é se cadastrar, para isso basta na página inicial clicar em Registrar.

Feito o cadastro o usuário pode se autenticar com os dados cadastrados.

  

### Tela de trabalho

  

Ao acessar o usuário será levado para a tela de trabalho, aonde são listadas todas as atividades atribuídas e ele e que ainda não foram finalizadas, na seção "Atividades Pendentes", para começar trabalhar em uma atividade, basta clicar no botão "Iniciar".

![Tela com a lista de atividades pendentes](https://firebasestorage.googleapis.com/v0/b/webpm-73a86.appspot.com/o/work-2.png?alt=media&token=3ca5ae40-8f79-475c-877c-11f601f59404)

A partir daí a atividade sobe para o campo "Atividade Atual" e o cronometro regressivo é iniciado para decrescer o tempo restante para terminar a atividade.

  ![tela com atividade sendo executada](https://firebasestorage.googleapis.com/v0/b/webpm-73a86.appspot.com/o/work.png?alt=media&token=f9ffafd3-dafa-4bea-bad8-981bd784fe4b)

### Cadastro de projetos

  

Na barra de navegação clicar em Cadastro->Projetos(desktop) ou no menu(mobile) clicar em Projetos, na tela de projetos, basta clicar no botão "+Incluir" para adicionar um novo projeto, irá se abrir um popup para o usuário informar o nome do projeto. Depois basta clicar em cadastrar para cadastrá-lo.

![Tela com o formulário de cadastro de novo projeto](https://firebasestorage.googleapis.com/v0/b/webpm-73a86.appspot.com/o/project-2.png?alt=media&token=2a466ab4-9407-4709-b8b0-828c350ca32b)

Nessa mesma tela é possível clicar no projeto e ser levado para a tela de detalhes do mesmo(TODO: Item 6), ou clicar no botão excluir(caso seja o dono do projeto) para excluí-lo.

![Tela para seleção e exclusão de projetos](https://firebasestorage.googleapis.com/v0/b/webpm-73a86.appspot.com/o/project-1.png?alt=media&token=9164b922-ec8b-4ec8-bfdf-0641644b8272)
  
## Firebase

O aplicativo utiliza uma conta minha do Firebase, caso queira mudar a conta, basta ir no arquivo app.module.ts, achar o bloco abaixo e alterar pelas informações do seu repositório.

    AngularFireModule.initializeApp({
    apiKey:  "AIzaXxxxxxxxxxxxxxxxxxxxxxOA",
    authDomain:  "webpm-XXXXXX.firebaseapp.com",
    databaseURL:  "https://webpm-XXXXXX.firebaseio.com",
    projectId:  "webpm-XXXXXX",
    storageBucket:  "webpm-XXXXXX.appspot.com",
    messagingSenderId:  "1092892865",
    appId:  "1:106514754215:web:8783f974e63d75023fe8e8"
    })

  ## TODO List para Versão inicial:

  
1. ~~Criar componente de trabalho principal e tirar o funcionamento do app.component~~.

2. ~~Autenticar usuários pelo Firebase.~~

3. ~~Criar formulário de cadastro de projetos.~~

4. ~~Formatação da barra de navegação.~~

5. ~~Criação da página de menus para mobile.~~

6. ~~Criar formulário de gerenciamento de projetos.~~

7. ~~Registrar o usuário ao registrar.~~

8. Criar lógica de criação e aceite, recusa de convites.

9. Permitir adicionar anotações na atividade.

10. ~~Possibilitar finalizar a atividade.~~

11. Possibilitar anexa link de arquivos à atividade.

12. ~~Implementar uma interface de dados para ~~persistir projetos~~ e atividades no Firebase, excluindo assim a necessidade do json-server.~~

13. Implementar opção "Lembrar" na tela de autenticação.

14. Implementar verificação de email.

15. Implementar recuperação de senha.

## Melhorias futuras

1. Implementar histórico de alteração nos projetos e atividades.

2. Melhorar a guarda das rotas para projetos/atividades para só liberar o acesso a usuários pertinentes ao projeto.

3. Mostrar mensagens de validação nos formulários relacionados a projetos e atividades

  

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

- Firebase - [https://firebase.google.com/](https://firebase.google.com/)

- Ts-md5 - [https://www.npmjs.com/package/ts-md5](https://www.npmjs.com/package/ts-md5)