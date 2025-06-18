lint:
	docker run --rm \
		-v $(PWD):/app \
		-w /app \
    golangci/golangci-lint:v2.1.6 \
		golangci-lint run --timeout 5m

lint-fix:
	docker run --rm \
		-v $(PWD):/app \
		-w /app \
		golangci/golangci-lint:v2.1.6 \
		golangci-lint run --fix --timeout 5m
