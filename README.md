# Interface Gráfica Mobile - Blogging - React Native

Desenvolvimento de uma interface gráfica intuitiva e acessível para a aplicação de blogging, utilizando React Native. O projeto visa proporcionar uma experiência fluida e eficiente para docentes e alunos(as), permitindo a interação simplificada com os diversos endpoints REST já implementados no [back-end](https://github.com/andretheodoro/api-post-rest). A aplicação foi projetada com foco na usabilidade, garantindo uma navegação intuitiva e uma interface responsiva para diferentes dispositivos.

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
src/
├── api/                 # Configuração e serviços da API (axios)
│   └── api.ts
├── context/             # Contexto de autenticação em um aplicativo React, permitindo que diferentes componentes acessem e modifiquem o estado de autenticação do usuário (professor)
├── controllers/         # Controllers responsáveis por processa as requisições feitas pelo usuário, interagir com os dados e retornar uma resposta
├── routes/              # Define as rotas e os comportamentos do menu lateral, incluindo uma customização do conteúdo do drawer e a funcionalidade de login/logout
├── screens/             # Define a criação dos componentes que serão exibidos em tela
├── api.ts               # Configuração de Axios e chamadas à API
├── App.tsx              # Arquivo principal do aplicativo
├── package.json         # Dependências e scripts
└── README.md            # Documentação
```

## 📌 Funcionalidades do Aplicativo
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
- Carregar os dados atuais do post para edição.

### 📌 Página de Criação de Professores  
- Formulário para cadastrar novos professores.

### 📌 Página de Edição de Professores  
- Formulário para editar dados de professores existentes. 

### 📌 Página de Listagem de Professores  
- Listagem paginada dos professores com opção de edição e exclusão dos dados.

### 📌 Página de Criação de Estudantes  
- Formulário para cadastrar novos estudantes.

### 📌 Página de Edição de Estudantes  
- Formulário para editar dados de estudantes existentes.

### 📌 Página de Listagem de Estudantes  
- Listagem paginada dos estudantes com opção de edição e exclusão dos dados.

## 🧑‍🎓 Funcionalidades para Estudantes  

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

**3. Execute o projeto - Expo Go**

```bash
npx expo start
```

**4. Abra o aplicativo Expo Go**

**5. Scaneie o Qr Code gerado**

![image](https://github.com/user-attachments/assets/d0128d02-8aa3-4136-b9ee-1aa59402c2a0)

Observação: Para as funcionalidades desse projetos serem executadas corretamente, o projeto de API deve estar executando em paralelo.

## Guia de Uso da Aplicação

**1. Login**

- Acesse a página de login.
  
![image](https://github.com/user-attachments/assets/e89d1af5-9d43-438d-b407-26a7917d0a45)

- Caso seja um professor, insira suas credenciais na aba "Professor".
- Caso credenciais válidas, Professores serão redirecionados para a página de gerenciamento de posts após clique no botão "Entrar".

**2. Página Principal**

## 2.1. Professor

<p align="center">
  <img src="https://github.com/user-attachments/assets/ed91fec0-7272-400c-859c-ca1d483c0b12" alt="Interface do Professor - Posts" width="200" height="350">
</p>

### 📌 Funcionalidades:
- 📋 **Lista de Posts** com título, autor e uma breve descrição.  
- 🔍 **Campo de busca** para filtrar Posts.  
- ✏️ **Opções de Editar e Excluir** um Post diretamente na lista.  
- ➕ **Criar um novo Post** rapidamente.  

**Filtro de Posts:**

- Para filtrar o Post desejado por palavra-chave basta informar na barra de pesquisa conforme indicado na imagem abaixo:

![image](https://github.com/user-attachments/assets/628557a3-5f4f-43b6-b453-784ea688fccc)

**2.2. Aluno:**

![image](https://github.com/user-attachments/assets/38576f80-4f8f-4927-91c5-d75581e40631)

- Lista de Posts com título, autor e uma breve descrição do Post
- Campo de filtro para busca de Posts
- Clique sobre card de Post irá abrir o conteúdo completo do mesmo

**Filtro de Posts:**

- Para filtrar o Post desejado por palavra-chave basta informar na barra de pesquisa conforme indicado na imagem abaixo:

![image](https://github.com/user-attachments/assets/e4a9d08a-0a81-4318-825e-9a84f6d52f37)

**2. Gerenciamento de Posts**

**Criar Post:** Professores podem criar posts preenchendo o formulário na página de criação.


**Editar Post:** Professores podem atualizar informações de um post existente, clicando no ícone de lápis na página de lista de posts.


**Excluir Post:** Professores podem remover posts irrelevantes, clicando no ícone de lixeira na página de lista de posts.

**3. Visualizar Posts**

Alunos podem visualizar posts listados com detalhes, basta clicar sobre o card do post desejado.
