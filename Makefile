# --- Lint ---
lint:
	docker run --rm \
		-v $(PWD)/backend:/app \
		-w /app \
		golangci/golangci-lint:v2.1.6 \
		golangci-lint run --timeout 5m

lint-fix:
	docker run --rm \
		-v $(PWD)/backend:/app \
		-w /app \
		golangci/golangci-lint:v2.1.6 \
		golangci-lint run --fix --timeout 5m

# --- Migration ---
MIGRATIONS_DIR=./migrations
DB_URL=postgres://raspi_user:raspi_pass@db:5432/raspi?sslmode=disable

migrate-create:
	docker compose run --rm migrate \
		create -ext sql -dir /migrations -seq $(name)

migrate-up:
	docker compose run --rm migrate \
		-path=/migrations -database "$(DB_URL)" up

migrate-down:
	docker compose run --rm migrate \
		-path=/migrations -database "$(DB_URL)" down 1

migrate-status:
	docker compose run --rm migrate \
		-path=/migrations -database "$(DB_URL)" version

# --- Seeder ---
seed:
	docker compose run --rm seed

# --- frontend ----
frontend-dev:
	npm --prefix frontend run dev

frontend-build:
	npm --prefix frontend install

