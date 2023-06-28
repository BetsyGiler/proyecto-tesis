FROM node:lts-alpine3.18

WORKDIR /app/backend/

COPY package*.json ./
COPY . .

# adding Nest.js
RUN npm install -g @nestjs/cli
RUN npm install

EXPOSE 8500
