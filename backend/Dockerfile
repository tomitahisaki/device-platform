FROM golang:1.22-alpine

WORKDIR /app

RUN apk update && apk add --no-cache git curl bash build-base

RUN go install github.com/cosmtrek/air@v1.40.4

COPY go.mod go.sum ./
RUN go mod download


COPY . .

CMD ["air"]
