# Interface Gráfica Mobile - Blogging - React Native

Desenvolvimento de uma interface gráfica intuitiva e acessível para a aplicação de blogging, utilizando React Native. O projeto visa proporcionar uma experiência fluida e eficiente para docentes e alunos(as) / estudantes, permitindo a interação simplificada com os diversos endpoints REST já implementados no [back-end](https://github.com/andretheodoro/api-post-rest). A aplicação foi projetada com foco na usabilidade, garantindo uma navegação intuitiva e uma interface responsiva para diferentes dispositivos.

## Repositório Github

Repositório disponível em:
https://github.com/andretheodoro/post-app-mobile

## Descrição

Interface gráfica mobile robusta, intuitiva e eficiente para esta aplicação. Esta atividade focará em desenvolver o front-end mobile utilizando React Native, proporcionando uma experiência de usuário excelente tanto para docentes quanto para estudante

## Objetivo

Desenvolver uma interface gráfica para a aplicação de blogging utilizando React Native. A aplicação deve ser acessível e fácil de usar, permitindo que os docentes e alunos(as) possam interagir com os diversos endpoints REST já implementados no back-end.

## Arquitetura da Aplicação

**1. React Native para desenvolver a interface gráfica**

Para o desenvolvimento da interface do projeto de gerenciamento de posts, foi utilizado o React Native devido à sua capacidade de proporcionar uma experiência eficiente e unificada entre dispositivos Android e iOS. A escolha dessa tecnologia se baseia em sua flexibilidade, desempenho e ampla comunidade de suporte, garantindo um desenvolvimento ágil e escalável.

**Benefícios do React Native**

- Desenvolvimento Multiplataforma: Com React Native, podemos desenvolver uma única base de código para ambas as plataformas (Android e iOS), reduzindo custos e tempo de desenvolvimento.

- Reutilização de Código: Permite a reutilização de componentes, promovendo consistência na interface e facilitando manutenções futuras.

- Alto Desempenho: Utiliza um bridge nativo para interagir com os componentes do dispositivo, garantindo uma performance próxima a aplicativos desenvolvidos nativamente.

- Hot Reload: Possibilita a visualização instantânea das alterações no código sem necessidade de recompilar todo o aplicativo.

- Grande Ecossistema e Comunidade Ativa: Conta com uma ampla comunidade de desenvolvedores, bibliotecas prontas e documentação rica, acelerando o desenvolvimento e solução de problemas.

- Integração Simples com APIs REST: A arquitetura do React Native facilita a comunicação com APIs REST, tornando a conexão com o back-end fluida e eficiente.

**Objetivo da Utilização do React Native**

O principal objetivo de utilizar React Native no projeto é criar uma aplicação moderna, responsiva e de fácil uso, que permita a interação eficiente entre docentes e alunos(as) no gerenciamento de posts. Com essa abordagem, garantimos uma solução escalável, com alto desempenho e compatibilidade entre diferentes dispositivos, tornando o acesso à informação rápido e prático.

Dessa forma, o uso do React Native se apresenta como a melhor escolha para atender aos requisitos do projeto, assegurando um desenvolvimento dinâmico, intuitivo e funcional para todos os usuários.

**2. Utilização de Hooks e Componentes Funcionais**

Os Hooks permitem o gerenciamento eficiente de estados e ciclos de vida em componentes funcionais, que são mais concisos e fáceis de entender em comparação aos componentes de classe. Essa abordagem traz as seguintes vantagens:

- Simplicidade e legibilidade: Os componentes funcionais, combinados com hooks como useState e useEffect, tornam o código mais intuitivo e menos verboso.
- Reutilização de lógica: Hooks personalizados permitem encapsular e reutilizar lógica de estado entre diferentes componentes.
- Modernidade e suporte: Hooks e componentes funcionais são a abordagem recomendada pelas versões mais recentes do React, garantindo compatibilidade e acesso a novos recursos.
A escolha por essa combinação resulta em um código mais limpo, modular e fácil de manter, atendendo às melhores práticas do desenvolvimento frontend.

**3. Comunicação com a API**

A interação com o back-end é centralizada no arquivo api/index.ts, utilizando o Axios para chamadas HTTP. Todas as requisições passam por esse ponto central, simplificando a manutenção e o rastreamento de erros.

**4. Expo Go**

O Expo Go é um aplicativo que permite rodar e testar aplicações desenvolvidas com React Native sem a necessidade de compilar o código nativamente. Ele facilita o desenvolvimento ao permitir testes rápidos em dispositivos físicos e emuladores sem precisar de configurações complexas.

**Motivos para Utilizar o Expo Go**

- Rápida inicialização: Permite iniciar o desenvolvimento rapidamente sem configurar Xcode ou Android Studio.
- Hot Reload: Atualização instantânea das alterações no código sem recompilar a aplicação.
- Facilidade de Testes: Testes podem ser feitos diretamente em dispositivos físicos escaneando um QR Code.
- Ambiente Simplificado: Dispensa a necessidade de configuração manual de SDKs nativos durante o desenvolvimento inicial.

**5. Android Studio / Genymotion**

Se você optar por Android Studio + Genymotion em vez do Expo Go, pode ter mais controle sobre dependências nativas, plugins e desempenho, mas perderá a simplicidade do Expo. Essa abordagem é ideal para projetos que exigem bibliotecas que o Expo Go não suporta nativamente. Nesse projeto todas funcionalidades possuem suporte no Expo Go.Se você optar por Android Studio + Genymotion em vez do Expo Go, terá mais controle sobre dependências nativas, plugins e desempenho, mas perderá a simplicidade do Expo. Essa abordagem é ideal para projetos que exigem bibliotecas que o Expo Go não suporta nativamente.

## Ferramentas/Tecnologias Utilizadas

- React Native: Biblioteca para criação de interfaces de usuário, utilizando hooks e componentes funcionais.
- Axios: Para consumo da API REST.
- ESLint: Ferramentas de linting e formatação.
- Expo Go: Aplicativo que permite rodar e testar aplicações desenvolvidas com React Native sem a necessidade de compilar o código nativamente
- Android Studio (opcional): Ambiente de desenvolvimento oficial para Android, permitindo a criação, teste e depuração de aplicativos nativos
- Genymotion (opcional): Emulador Android leve e rápido, usado como alternativa ao emulador padrão do Android Studio.

## Estrutura Geral do Projeto

```plaintext
components/                # Componentes para criação e estruturação das páginas
├── Cards/                 # Cards para apresentação das listas
│   └── Student            # Cards para Estudantes
│   └── Teacher            # Cards para Professores
├── ModalConfirmDel/       # Confirmação das exclusões
├── Notification/          # Notificações customizadas
├── Pagination/            # Páginação das listas (posts, professores, alunos)
src/
├── api/                 # Configuração e serviços da API (axios)
│   └── api.ts
├── context/             # Contexto de autenticação em um aplicativo React, permitindo que diferentes componentes acessem e modifiquem o estado de autenticação do usuário (professor)
├── model/               # Define as entidades utilizadas no sistema, organizando as regras de negócio e estrutura dos dados
├── routes/              # Define as rotas e os comportamentos do menu lateral, incluindo uma customização do conteúdo do drawer e a funcionalidade de login/logout
├── screens/             # Define as páginas da aplicação
├── .env                 # Arquivo de configuração, definindo URL da API Back-end
├── api.ts               # Configuração de Axios e chamadas à API
├── App.tsx              # Arquivo principal do aplicativo
├── package.json         # Dependências e scripts
└── README.md            # Documentação
```

## 📌 Funcionalidades Gerais e Principais do Aplicativo
O sistema de gerenciamento de posts possui funcionalidades distintas para **professores** e **estudantes**, conforme descrito abaixo:  

## 🎓 Funcionalidades para Professores  

### 📌 Autenticação
- Login com usuário e senha.
- Acesso a funcionalidades exclusivas aos professores.

### 📌 Página Principal - Administrativa (Lista de Posts) 
- Exibir lista de posts com título, autor e descrição breve.  
- Campo de busca para filtrar posts por palavras-chave.
- Exibir lista de todas as postagens com opção de edição e exclusão dos dados.

### 📌 Página de Criação de Postagens  
- Formulário para professores criarem postagens.  
- Campos para título, conteúdo e autor.

### 📌 Página de Edição de Postagens  
- Formulário para professores editarem postagens existentes.  
- Carregar os dados atuais do post selecionado para edição.

### 📌 Página de Listagem de Professores
- Exibir lista de todas os professores com opção de edição e exclusão dos dados.

### 📌 Página de Criação de Professores  
- Formulário para criar professores.  
- Campos para nome, telefone e senha.

### 📌 Página de Edição de Professores  
- Formulário para editar professores existentes.  
- Carregar os dados atuais do professor selecionado para edição.

### 📌 Página de Listagem de Estudantes
- Exibir lista de todas os estudantes com opção de edição e exclusão dos dados.

### 📌 Página de Criação de Alunos  
- Formulário para criar estudantes.  
- Campos para nome e telefone para contato.

### 📌 Página de Edição de Alunos  
- Formulário para editar estudantes existentes.  
- Carregar os dados atuais do estudante selecionado para edição.

## 🧑‍🎓 Funcionalidades para Alunos  

### 📌 Lista de Post  
- Exibir lista de posts com título, autor e descrição breve. 
- Campo de busca para filtrar posts por palavras-chave.

### 📌 Página de Leitura de Posts
- Exibir conteúdo completo de um post.
  
## Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto:

**1. Clone o repositório**

   ```bash
   git clone https://github.com/andretheodoro/post-app-mobile.git
   cd post-app-mobile
   code .
   ```

**2. Instale as dependências**

```bash
npm install
```
**3. Configure o arquivo .ENV**

Crie o arquivo .env e configure-o através da variável de ambiente chamada API_URL, informando a URL base da API utilizada no projeto.

![image](https://github.com/user-attachments/assets/85596ab4-ebc9-4a4a-bcd9-d5da205f7e68)

**4. Execute o projeto - Expo Go**

```bash
npx expo start
```

**5. Abra o aplicativo Expo Go**

**6. Scaneie o Qr Code gerado**

![image](https://github.com/user-attachments/assets/d0128d02-8aa3-4136-b9ee-1aa59402c2a0)

Observação: Para as funcionalidades desse projetos serem executadas corretamente, o projeto de API deve estar executando em paralelo.

## Guia de Uso da Aplicação

## 1. Login

- Ao acessar o aplicativo o usuário será direcionado à página de login.
  
<p align="center">
  <img src="https://github.com/user-attachments/assets/3662d821-f130-481f-9dad-cfe79fc1bc4e" alt="" width="200" height="350">
</p>

- Caso seja um professor, insira suas credenciais na "aba" Professor.
- Se as credenciais forem válidas, os professores serão redirecionados para a página de gerenciamento de posts após clicar no botão 'Entrar', onde poderão acessar funcionalidades exclusivas para seu perfil.
- O Professor ao realizar o primeiro acesso no sistema com a senha padrão TC4*{anoAtual} (ex.: TC4*2025), ao invés do aplicativo direcioná-lo para a lista de posts, este será direcionado para tela de perfil e orientado a realizar a alteração da senha para sua segurança:
  
<p align="center">
  <img src="https://github.com/user-attachments/assets/43dd0bb0-1bfa-4e39-a31d-687ab88717d7" alt="" width="200" height="350">
  <img src="https://github.com/user-attachments/assets/1cc67525-18ec-4a1a-9b50-8cb8d8f13eeb" alt="" width="200" height="350">
</p>

- Caso seja um aluno, basta clicar na aba "Aluno" que será direcionado para a lista geral de Posts.

## 2. Página Principal

## 2.1. Professor

<p align="center">
  <img src="https://github.com/user-attachments/assets/ed91fec0-7272-400c-859c-ca1d483c0b12" alt="" width="200" height="350">
</p>

### 📌 Funcionalidades:
- 📋 **Lista de Posts** com título, autor e uma breve descrição.  
- 🔍 **Campo de busca** para filtrar Posts.  
- ✏️ **Opções de Editar e Excluir** um Post diretamente na lista.  
- ➕ **Criar um novo Post** rapidamente.  

**Filtro de Posts:**

- Para filtrar o Post desejado por palavra-chave basta informar na barra de pesquisa conforme indicado na imagem abaixo:

<p align="center">
  <img src="https://github.com/user-attachments/assets/628557a3-5f4f-43b6-b453-784ea688fccc" alt="" width="200" height="350">
</p>

- Essa funcionalidade aplica-se ao demais formulários de lista de professores e de alunos.
  
## 2.2. Aluno:

<p align="center">
  <img src="https://github.com/user-attachments/assets/38576f80-4f8f-4927-91c5-d75581e40631" alt="" width="200" height="350">
</p>

### 📌 Funcionalidades:
- 📋 **Lista de Posts** com título, autor e uma breve descrição.  
- 🔍 **Campo de busca** para filtrar Posts.  
- 🖱️ **Clique sobre card** de Post irá abrir o conteúdo completo do mesmo

**Filtro de Posts:**

- Para filtrar o Post desejado por palavra-chave basta informar na barra de pesquisa conforme indicado na imagem abaixo:

<p align="center">
  <img src="https://github.com/user-attachments/assets/e4a9d08a-0a81-4318-825e-9a84f6d52f37" alt="" width="200" height="350">
</p>

## 3. Gerenciamento de Posts

- 📝 **Criar Posts:** Para efetuar a criação de um novo Post basta clicar no ícone destacado na imagem abaixo localizado na tela de Lista de Posts e o usuário será redirecionado para o formulário de Cadastro de Posts, posteriormente, basta preencher os dados e clicar em "Gravar" para efetivar e gerar um novo Post.
  
<p align="center">
  <img src="https://github.com/user-attachments/assets/0e289c6e-e085-4df3-9689-0a935e10d4c8" alt="" width="200" height="350">
  <img src="https://github.com/user-attachments/assets/3c0ee794-fc3b-4758-ae2a-ddb7b26c334a" alt="" width="200" height="350">
</p>

- ✏️ **Editar Post:** Os professores podem atualizar as informações de um post existente clicando no ícone de lápis na página de Lista de Posts. Isso abrirá o formulário de Cadastro de Posts com os dados previamente preenchidos, permitindo que o usuário faça as alterações desejadas. Veja nas imagens a seguir:
  
<p align="center">
  <img src="https://github.com/user-attachments/assets/c6cde502-f670-4cb9-9a98-04ecdc8cc80f" alt="" width="200" height="350">
  <img src="https://github.com/user-attachments/assets/02bac087-bb6f-400d-9860-fa15be53a65e" alt="" width="200" height="350">
</p>

- 🗑️ **Excluir Post:** Os professores podem remover posts irrelevantes clicando no ícone de lixeira na página de Lista de Posts. O sistema exibirá uma mensagem de confirmação de exclusão e, para confirmar a remoção, basta clicar em 'Sim'. Veja na imagem abaixo:

<p align="center">
  <img src="https://github.com/user-attachments/assets/dede95d4-8b18-4f0d-a4e7-90433e63fa78" alt="" width="200" height="350">
</p>

## 4. Leitura de Posts - Aluno

- 📖 **Visualização do Post:** Os alunos podem visualizar os posts listados com mais detalhes. Basta clicar no card do post desejado, e o sistema abrirá um modal para a leitura completa do conteúdo.

<p align="center">
  <img src="https://github.com/user-attachments/assets/b368d701-43b4-4d3f-8585-c9def2576818" alt="" width="200" height="350">
  <img src="https://github.com/user-attachments/assets/aeb79741-a0ce-4a73-9285-8dcc4aaed8c9" alt="" width="200" height="350">
</p>

## 5. Gerenciamento de Professores

- 📋 **Lista de Professores:** Ao acessar a opção "Lista de Professores" no menu lateral, usuário será direcionado para a tela de lista de professores cadastrados no sistema, exibindo o nome e contato do mesmo, conforme imagem abaixo:

<p align="center">
  <img src="https://github.com/user-attachments/assets/af7edc61-0b8e-4997-b1bd-8de67c6eab15" alt="" width="200" height="350">
</p>

- 📝 **Criar Professor:** Para efetuar a criação de um novo Professor basta clicar no ícone destacado na imagem abaixo localizado na tela de Lista de Professor e o usuário será redirecionado para o formulário de Cadastro de Professor, posteriormente, basta preencher os dados e clicar em "Gravar" para efetivar e gerar um novo Professor.
  
<p align="center">
  <img src="https://github.com/user-attachments/assets/f85eb9c5-eed5-43c7-9ba3-627dfecc727f" alt="" width="200" height="350">
  <img src="https://github.com/user-attachments/assets/0e18ce61-3d63-42f7-9fb9-2f4b6b91d24b" alt="" width="200" height="350">
</p>

- ✏️ **Editar Professor:** Os professores podem atualizar as informações de um outro Professor já existente clicando no ícone de lápis na página de Lista de Professores. Isso abrirá o formulário de Cadastro de Professores com os dados previamente preenchidos, permitindo que o usuário faça as alterações desejadas. Veja nas imagens a seguir:
  
<p align="center">
  <img src="https://github.com/user-attachments/assets/e581b469-bae6-4d01-bf5b-9e05f8eb4eac" alt="" width="200" height="350">
  <img src="https://github.com/user-attachments/assets/1967f03d-d92c-4b16-ab83-8fc52a4e4553" alt="" width="200" height="350">
</p>

- 🗑️ **Excluir Professor:** Os professores podem remover outros professores clicando no ícone de lixeira na página de Lista de Professores. O sistema exibirá uma mensagem de confirmação de exclusão e, para confirmar a remoção, basta clicar em 'Sim'. Veja na imagem abaixo:

<p align="center">
  <img src="https://github.com/user-attachments/assets/8711b288-06b2-43e5-9be8-60f0f56fd1b7" alt="" width="200" height="350">
  <img src="https://github.com/user-attachments/assets/f8b7dff3-6a26-42d2-82d7-057e7dfc44d7" alt="" width="200" height="350">
</p>

## 6. Gerenciamento de Alunos

- 📋 **Lista de Alunos:** Ao acessar a opção "Lista de Alunos" no menu lateral, usuário será direcionado para a tela de lista de alunos cadastrados no sistema, exibindo o nome e contato do mesmo, conforme imagem abaixo:

<p align="center">
  <img src="https://github.com/user-attachments/assets/c22453f9-8122-416c-8da2-8be295891e2a" alt="" width="200" height="350">
</p>

- 📝 **Criar Aluno:** Para efetuar a criação de um novo Aluno basta clicar no ícone destacado na imagem abaixo localizado na tela de Lista de Alunos e o usuário será redirecionado para o formulário de Cadastro de Alunos, posteriormente, basta preencher os dados e clicar em "Gravar" para efetivar e gerar um novo Aluno.
  
<p align="center">
  <img src="https://github.com/user-attachments/assets/9620da12-b054-445c-a505-0e2973a982c2" alt="" width="200" height="350">
  <img src="https://github.com/user-attachments/assets/ca7438a2-a84e-4394-b86e-33bc42e6ca98" alt="" width="200" height="350">
</p>

- ✏️ **Editar Aluno:** Os professores podem atualizar as informações de um outro Aluno já cadastrado clicando no ícone de lápis na página de Lista de Alunos. Isso abrirá o formulário de Cadastro de Alunos com os dados previamente preenchidos, permitindo que o usuário faça as alterações desejadas. Veja nas imagens a seguir:
  
<p align="center">
  <img src="https://github.com/user-attachments/assets/6451e4a0-03c4-4163-a1fd-867eddbb5a04" alt="" width="200" height="350">
  <img src="https://github.com/user-attachments/assets/b6cef7f4-0ce8-4b78-a243-f054f2f8eb75" alt="" width="200" height="350">
</p>

- 🗑️ **Excluir Aluno:** Os professores podem remover outros alunos clicando no ícone de lixeira na página de Lista de Alunos. O sistema exibirá uma mensagem de confirmação de exclusão e, para confirmar a remoção, basta clicar em 'Sim'. Veja na imagem abaixo:

<p align="center">
  <img src="https://github.com/user-attachments/assets/98c7f4aa-3a08-41d3-87f2-1356fb6832f8" alt="" width="200" height="350">
</p>

## 7. Meu Perfil

Nessa página o professor pode realizar a alteração de senha do seu perfil, basta informar a nova senha desejada, confirmá-la e clicar em "Gravar", veja na imagem abaixo:

<p align="center">
  <img src="https://github.com/user-attachments/assets/5634a85d-f63b-43af-89aa-865cac33369f" alt="" width="200" height="350">
</p>

## 8. Validações e Funções gerais

- **Validação de Campos Obrigatórios:**
<p align="center">
  <img src="https://github.com/user-attachments/assets/b1eacf39-94a0-41fa-b80e-9e7a5bcddeb2" alt="" width="200" height="350">
</p>

- **Validação de quantidade de caracteres informados nos campos:**
<p align="center">
  <img src="https://github.com/user-attachments/assets/21377d2b-bf73-43b0-b388-c5b98191d7a3" alt="" width="200" height="350">
</p>

- **Tratamento de credenciais inválidas do professor:**
<p align="center">
  <img src="https://github.com/user-attachments/assets/55f94a02-239a-4caf-82b7-afcea62dadab" alt="" width="200" height="350">
</p>

- **Páginação de registros:**
- Lista de Posts para Estudantes: Páginação exibida acima de 8 registros.
- Demais Listas: Páginação exibida acima de 5 registros.
  
<p align="center">
  <img src="https://github.com/user-attachments/assets/ece250ca-b2eb-448c-b637-761949fed739" alt="" width="200" height="350">
  <img src="https://github.com/user-attachments/assets/1d4a201b-574e-4e95-9dff-c1d4d904c3d3" alt="" width="200" height="350">
</p>

## 9. Menu Lateral - Professor

Ao realizar o login como Professor e clicar no ícone de menu, localizado no lado superior esquerdo do aplicativo, será aberto um menu lateral contendo as seguintes funcionalidades:

### 📌 Funcionalidades:
- 📋 **Lista de Posts:** Formulário para exibição de todos os Posts cadastrados no sistema.
- 👩‍🎓 **Lista de Alunos:** Formulário para exibição de todos os Alunos cadastrados no sistema. 
- 👨‍🏫 **Lista de Professores:** Formulário para exibição de todos os Professores cadastrados no sistema. 
- 👤 **Meu Perfil:** Formulário de alteração de senha.
- 🚪 **Sair:** Botão para o Professor deslogar do sistema.
  
<p align="center">
  <img src="https://github.com/user-attachments/assets/a46885bf-bace-48fc-8a02-f0b936e90520" alt="" width="200" height="350">
</p>
