# Microservices Lab 05

A simple polyglot microservices lab with:
- `item-service` (Node.js + Express)
- `order-service` (Spring Boot)
- `payment-service` (Flask)
- `api-gateway` (Spring Cloud Gateway MVC)

All services are containerized and wired together with Docker Compose.

## Architecture

```text
Client
  |
  v
API Gateway (8080)
  |---- /items*     -> item-service (8081)
  |---- /orders*    -> order-service (8082)
  \---- /payments*  -> payment-service (8083)
```

## Tech Stack

- Java 21 (runtime image), Spring Boot 4, Spring Cloud Gateway MVC
- Node.js (Alpine image), Express
- Python 3.10, Flask
- Docker + Docker Compose

## Repository Structure

```text
.
├── api-gateway
├── item-service
├── order-service
├── payment-service
└── docker-compose.yml
```

## Prerequisites

- Docker Desktop (or Docker Engine + Compose plugin)

For local non-Docker runs:
- Java 17+ and Maven wrapper support
- Node.js 18+
- Python 3.10+

## Quick Start (Docker)

From repository root:

```bash
docker compose up -d --build
```

Check containers:

```bash
docker ps
```

Stop everything:

```bash
docker compose down
```

## Services and Ports

- API Gateway: `http://localhost:8080`
- Item Service: `http://localhost:8081`
- Order Service: `http://localhost:8082`
- Payment Service: `http://localhost:8083`

## API Endpoints

Use the gateway unless you explicitly want to call services directly.

### Gateway Routes

- `GET /items`
- `POST /items`
- `GET /items/{id}`
- `GET /orders`
- `POST /orders`
- `GET /orders/{id}`
- `GET /payments`
- `POST /payments/process`
- `GET /payments/{id}`

### Item Service (`/items`)

- `GET /items`: list item names
- `POST /items`: add an item
- `GET /items/{id}`: get one item by index

Sample:

```bash
curl http://localhost:8080/items
curl -X POST http://localhost:8080/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Headphones"}'
curl http://localhost:8080/items/0
```

### Order Service (`/orders`)

- `GET /orders`: list all orders
- `POST /orders`: create an order
- `GET /orders/{id}`: get order by id

Sample:

```bash
curl http://localhost:8080/orders
curl -X POST http://localhost:8080/orders \
  -H "Content-Type: application/json" \
  -d '{"item":"Laptop","qty":1}'
curl http://localhost:8080/orders/1
```

### Payment Service (`/payments`)

- `GET /payments`: list payments
- `POST /payments/process`: create payment with `SUCCESS` status
- `GET /payments/{id}`: get payment by id

Sample:

```bash
curl http://localhost:8080/payments
curl -X POST http://localhost:8080/payments/process \
  -H "Content-Type: application/json" \
  -d '{"orderId":1,"amount":1200}'
curl http://localhost:8080/payments/1
```

## Run Services Locally (Without Docker)

Open 4 terminals from repo root.

1. Start item service:

```bash
cd item-service
npm install
node index.js
```

2. Start order service:

```bash
cd order-service
./mvnw spring-boot:run
```

3. Start payment service:

```bash
cd payment-service
pip install -r requirements.txt
python app.py
```

4. Start gateway:

```bash
cd api-gateway
./mvnw spring-boot:run
```

Then call the gateway on `http://localhost:8080`.

## Verification Checklist

After startup, these should return HTTP 200:

```bash
curl -i http://localhost:8080/items
curl -i http://localhost:8080/orders
curl -i http://localhost:8080/payments
```

POST endpoints should return HTTP 201:

```bash
curl -i -X POST http://localhost:8080/orders \
  -H "Content-Type: application/json" \
  -d '{"item":"Phone","qty":2}'

curl -i -X POST http://localhost:8080/payments/process \
  -H "Content-Type: application/json" \
  -d '{"orderId":1,"amount":500}'
```

## Notes

- Data is stored in-memory inside each service and resets on restart.
- This lab is intended for learning service communication and API gateway routing, not production use.
