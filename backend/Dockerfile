FROM golang:1.24.4-alpine

WORKDIR /app

RUN apk update && apk add --no-cache git curl bash build-base

RUN go install github.com/air-verse/air@latest

COPY go.mod go.sum ./
RUN go mod download


COPY . .

CMD ["air"]
