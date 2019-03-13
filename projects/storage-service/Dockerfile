FROM node:10-alpine

WORKDIR /app

RUN npm install

COPY . .


FROM nginx:alpine
COPY . /usr/share/nginx/html