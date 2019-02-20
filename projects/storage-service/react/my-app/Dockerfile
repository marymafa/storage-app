FROM node:8.10.0-alpine

LABEL maintainer="storage app"

RUN apt-get update 

RUN npm install

WORKDIR /app

COPY . /app

# Make port 80 available to the world outside this container
EXPOSE 3002
# Define environment variable
ENV NAME World

CMD ["npm", "app.js"]









