# backend/Dockerfile

# --- Build Stage ---
FROM golang:1.24.4-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o main .

# --- Runtime Stage ---
FROM alpine:latest

RUN apk add --no-cache ca-certificates tzdata git vim

WORKDIR /app
COPY --from=builder /app/main .
COPY .env .env

# timezone configuration
ENV TZ=Asia/Tokyo

EXPOSE 8080
CMD ["./main"]

