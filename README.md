# SeriesTV

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/venzel/series-tv-frontend/blob/master/LICENSE)

> Projeto em Java com Spring Boot da disciplina Desenvolvimento de Sistemas para Web, ministrada pelo professor orientador
> Danyllo Wagner pelo IPFB 2021.2.<br />

## Sobre

Aplicação fullstack de um sistema de séries de tv.

<hr />

## Autores

-   Edivam Enéas de Almeida Júnior
-   Joab da Silva Maia

<hr />

### Back-end

-   Api REST Full com arquitetura Feature By Packages
-   Java
-   Spring Boot
-   JPA / Hibernate
-   Autenticação Token JWT

👉 [Link para o repositório do back end](https://github.com/venzel/series-tv-backend)

### Front-end

-   Angular 12

### Persistência de dados

-   MySQL

### Bibliotecas auxiliares

-   Angular Material
-   PrimeNG

### Rotas

-   /register -> Cria um usuário (POST)
-   /login -> Autenticação de usuário (POST)
-   /series -> Lista as séries (GET)
-   /series/:id -> Exibe uma série e as temporadas (GET)
-   /seasons/:id -> Exibe uma temporada e os episódios (GET)

<hr />

### Para clonar e rodar o projeto

#### Pré-requisitos

-   Npm/Yarn
-   NodeJs
-   Docker
-   Docker compose

```bash
# Para clonar o repositório
$ git clone https://github.com/venzel/series-tv-frontend

# Para acessar a pasta do projeto assim que clonado o repositório
$ cd series-tv-frontend

# Instala globalmente o angular atraves do yarn
$ yarn global add @angular/cli

# Baixa os pacotes e dependencias
$ yarn install

# Para rodar o projeto na porta 8181
$ make run
```
