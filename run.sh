#!/usr/bin/env bash

docker run -p3030:3030 -p3001:3001 -p3035:3035 -v$(pwd):/app -it node:10.15.3 npm --prefix /app run servers
