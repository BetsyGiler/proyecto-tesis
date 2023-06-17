FROM node:lts-alpine3.18

WORKDIR /app/backend/transactional_api

COPY package*.json ./
COPY yarn.lock ./
COPY . .

# adding Nest.js
RUN npm install -g @nestjs/cli
RUN yarn install

EXPOSE 8500
