FROM node:11.10.0

WORKDIR /usr/src/app

RUN npm install serve -g

COPY package*.json ./
RUN npm install

COPY . .
RUN  ls -l
RUN npm build

EXPOSE 8080
CMD [ "serve", "-s", "build" ]