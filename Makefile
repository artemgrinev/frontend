CONTAINER_NAME = bludce

MIGRATIONS_DIR = prisma/migrations

stop:
	@echo "Stopping container $(CONTAINER_NAME)..."
	docker stop $(CONTAINER_NAME)
	@echo "Container $(CONTAINER_NAME) stopped."

remove:
	@echo "Removing container $(CONTAINER_NAME)..."
	docker rm $(CONTAINER_NAME)
	@echo "Container $(CONTAINER_NAME) removed."

build:
	@echo "Building Docker containers..."
	docker-compose -f docker/docker-compose.yaml up --build -d
	@echo "Docker containers built."

clean-migrations:
	@echo "Cleaning migrations directory..."
	rm -rf $(MIGRATIONS_DIR)
	@echo "Migrations directory cleaned."

create-migration:
	@echo "Creating new Prisma migration..."
	npx prisma migrate dev --name new_migration
	@echo "New migration created."

import-products:
	@echo "Importing products..."
	node data/import-products.js
	@echo "Products imported."

add-recipe-category-and-tags:
	@echo "Adding recipe categories and tags..."
	node data/add-recipe-category-and-tags.js
	@echo "Recipe categories and tags added."

all: stop remove build clean-migrations create-migration import-products add-recipe-category-and-tags

