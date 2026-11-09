# 🚗 PGE Mobilidade

Sistema de mobilidade urbana desenvolvido com arquitetura de microsserviços, permitindo a solicitação e o gerenciamento de corridas.

O projeto foi desenvolvido como parte de um desafio técnico, utilizando tecnologias modernas para construção de aplicações distribuídas.

## 🏗️ Arquitetura

O sistema está organizado em dois módulos principais:

- **Backend:** microsserviços desenvolvidos com Spring Boot.
- **Frontend:** aplicação web desenvolvida com Angular.

### Microsserviços

| Serviço | Responsabilidade | Porta |
|---|---|---|
| Eureka Server | Descoberta e registro dos serviços | 8761 |
| API Gateway | Ponto de entrada da aplicação | 8080 |
| Account Service | Gerenciamento de contas | 8081 |
| Ride Service | Gerenciamento de corridas | 8082 |
| Frontend | Interface web da aplicação | 4200 |

## 🛠️ Tecnologias utilizadas

### Backend
- Java 21
- Spring Boot
- Spring Cloud
- Spring Cloud Netflix Eureka
- Spring Cloud Gateway
- Spring Data JPA
- PostgreSQL
- RabbitMQ
- Redis
- WebSocket
- Maven

### Frontend
- Angular 21
- TypeScript
- HTML
- CSS

### Infraestrutura e ferramentas
- Docker
- Docker Compose
- Git e GitHub

## 📂 Estrutura do projeto

```text
pge-mobilidade/
│
├── backend/
│   ├── account-service/
│   ├── api
