FROM node:18 AS build
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
COPY package-lock.json ./
RUN npm install --verbose
COPY . .
RUN npm run build
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/sites-available/default
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]