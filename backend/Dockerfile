FROM node:current-alpine3.16

# Create app directory
WORKDIR /backend

# Install app dependencies
COPY package*.json ./

# Bundle app source
COPY . .

RUN yarn
