#/bin/bash

docker run --name 192.168.99.100 \
-e POSTGRES_PASSWORD=postgres \
-e POSTGRES_USER=postgres \
-e POSTGRES_DB=api_server_dev \
-p 5432:5432 \
-d postgres