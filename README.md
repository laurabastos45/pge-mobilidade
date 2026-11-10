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
│   ├── api-gateway/
│   ├── eureka-server/
│   ├── ride-service/
│   ├── Dockerfile.backend
│   └── docker-compose.yml
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── angular.json
│
└── .gitignore
```

## ⚙️ Pré-requisitos

Para executar o projeto, é necessário ter instalado:

- JDK 21
- Node.js e npm
- Docker Desktop
- Git

Também é necessário disponibilizar as instâncias de PostgreSQL, RabbitMQ e Redis utilizadas pelo backend.

## 🚀 Como executar

### 1. Clonar o repositório

```bash
git clone https://github.com/laurabastos45/pge-mobilidade.git
```

```bash
cd pge-mobilidade
```

### 2. Configurar as variáveis de ambiente

Dentro da pasta `backend`, crie um arquivo chamado `.env`:

```env
SPRING_DATASOURCE_USERNAME=seu_usuario
SPRING_DATASOURCE_PASSWORD=sua_senha

SPRING_RABBITMQ_USERNAME=seu_usuario
SPRING_RABBITMQ_PASSWORD=sua_senha
```

Configure os valores de acordo com suas instâncias locais. Não compartilhe esse arquivo nem envie credenciais para o GitHub.

### 3. Iniciar os serviços

Com as dependências de infraestrutura disponíveis, acesse a pasta do backend:

```bash
cd backend
```

Execute:

```bash
docker compose up --build -d
```

### 4. Acessar a aplicação

Após a inicialização dos serviços:

| Serviço | Endereço
|---|---|
| Aplicação Web | http://localhost:4200 |
| API Gateway | http://localhost:8080 |
| Account Service | http://localhost:8081 |
| Ride Service | http://localhost:8082 |
| Eureka Dashboard | http://localhost:8761 |

## 🧪 Testes

O backend possui testes automatizados com JUnit, permitindo validar funcionalidades e comportamentos dos serviços.

## 📌 Objetivos técnicos

Este projeto permite aplicar conhecimentos em:

- Arquitetura de microsserviços.
- Comunicação entre serviços.
- Service Discovery com Eureka.
- Roteamento com API Gateway.
- Mensageria com RabbitMQ.
- Cache e armazenamento com Redis.
- Comunicação em tempo real com WebSocket.
- Containerização com Docker.
- Desenvolvimento de interfaces com Angular.

## 👩‍💻 Desenvolvedora

**Ana Laura Bastos**

Estudante de Análise e Desenvolvimento de Sistemas, com foco em desenvolvimento backend Java e construção de aplicações utilizando Spring Boot.

- GitHub: [@laurabastos45](https://github.com/laurabastos45)

---

Desenvolvido como projeto prático de arquitetura de software e desenvolvimento de sistemas.
