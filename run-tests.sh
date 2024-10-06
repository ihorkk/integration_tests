#!/bin/sh

# Build and run the Docker containers
docker-compose up --build --abort-on-container-exit

# Clean up the Docker containers
docker-compose down