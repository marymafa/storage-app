# Stage 1
FROM node:11
WORKDIR /app
RUN yarn
RUN yarn build

# Stage 2 - the production environment
FROM nginx:alpine
EXPOSE 80
COPY --from=react-build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]