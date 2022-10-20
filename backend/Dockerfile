FROM node:current-alpine3.16

# Create app directory
WORKDIR /backend

# Install app dependencies
COPY package*.json ./

# Bundle app source
COPY . .

RUN npm install
RUN npm install -g nodemon
RUN npm install -g ts-node
