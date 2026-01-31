FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

RUN chmod -R g+r /usr/share/nginx/html && \
    chgrp -R 0 /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]