# Stage 1
FROM node:11
WORKDIR /app

RUN yarn

# Stage 2 - the production environment
FROM nginx:alpine
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]