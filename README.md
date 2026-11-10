# 🚗 PGE Mobilidade

Sistema de mobilidade urbana desenvolvido com **Java 21, Spring Boot, Spring Cloud e Angular**, utilizando arquitetura de microsserviços.

O projeto tem como objetivo disponibilizar uma aplicação web com funcionalidades relacionadas ao gerenciamento de contas e à solicitação de corridas.

## 🌐 Acesso à aplicação

- **Frontend:** https://pge-mobilidade.vercel.app
- **API Gateway:** https://api-gateway-neov.onrender.com

A aplicação está disponível online, sem necessidade de instalação ou configuração local.

## 🏗️ Arquitetura do projeto

O backend foi estruturado utilizando arquitetura de microsserviços, com serviços independentes e responsabilidades específicas.

| Serviço | Responsabilidade |
|---|---|
| Account Service | Gerenciamento de contas de usuários |
| Ride Service | Gerenciamento e solicitação de corridas |
| API Gateway | Recebimento e roteamento das requisições |
| Eureka Server | Registro e descoberta dos microsserviços |

### Fluxo de comunicação

1. O usuário acessa a aplicação pelo frontend Angular.
2. O frontend envia requisições para o API Gateway.
3. O Gateway direciona as requisições ao microsserviço correspondente.
4. Os microsserviços executam as operações solicitadas.
5. Quando necessário, os serviços realizam comunicação entre si utilizando OpenFeign.
6. As respostas são retornadas ao frontend.

## 🛠️ Tecnologias utilizadas

### Backend
- Java 21
- Spring Boot
- Spring Cloud
- Spring Cloud Gateway
- Netflix Eureka
- OpenFeign
- Spring Cloud LoadBalancer
- Maven

### Frontend
- Angular
- TypeScript
- HTML5
- CSS3
- PrimeNG
- Leaflet
- RxJS
- STOMP
- SockJS

### Banco de dados e infraestrutura
- PostgreSQL
- Redis
- RabbitMQ
- Docker
- Docker Compose

### Hospedagem e publicação
- Render — Backend
- Vercel — Frontend
- Git e GitHub — Versionamento de código

## ⚙️ Funcionalidades e recursos

- Gerenciamento de contas de usuários.
- Solicitação e gerenciamento de corridas.
- Integração entre frontend e backend por meio de APIs.
- Comunicação entre microsserviços.
- Descoberta de serviços com Eureka.
- Roteamento de requisições com API Gateway.
- Recursos de comunicação em tempo real configurados com WebSocket.

## 🐳 Ambiente de desenvolvimento

O ambiente local utiliza Docker Compose para organizar a execução dos serviços e suas dependências.

| Componente | Porta local |
|---|---:|
| Frontend | 4200 |
| API Gateway | 8080 |
| Account Service | 8081 |
| Ride Service | 8082 |
| Eureka Server | 8761 |
| PostgreSQL | 5434 |
| Redis | 6379 |
| RabbitMQ | 5672 |
| RabbitMQ Management | 15672 |

## 🧪 Testes

Foram realizados testes automatizados para validar o comportamento das funcionalidades do projeto.

Durante o desenvolvimento, seis testes foram executados com sucesso em uma das etapas de validação.

## 🚀 Publicação

A aplicação foi disponibilizada utilizando serviços de hospedagem em nuvem:

- O frontend Angular está hospedado na Vercel.
- Os serviços do backend estão hospedados no Render.
- A comunicação entre frontend e backend acontece por meio do API Gateway.

## 📚 Aprendizados

O desenvolvimento deste projeto proporcionou experiência prática com:

- Arquitetura de microsserviços.
- Desenvolvimento de APIs REST com Java e Spring Boot.
- Comunicação entre serviços utilizando OpenFeign.
- Descoberta de serviços com Eureka.
- Roteamento com Spring Cloud Gateway.
- Configuração de ambientes com Docker.
- Integração entre Angular e backend.
- Testes automatizados.
- Investigação de erros por meio de logs.
- Deploy e configuração de aplicações em produção.

## 👩‍💻 Projeto

Projeto desenvolvido como experiência prática de desenvolvimento de software, integração de tecnologias e aplicação de conceitos de arquitetura distribuída.
