FROM node:20-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:bookworm

RUN rm /etc/nginx/conf.d/default.conf && \
    rm -rf /docker-entrypoint.d/* && \
    mkdir -p /tmp/nginx/{client_temp,proxy_temp,fastcgi_temp,uwsgi_temp,scgi_temp} /var/run/nginx

COPY nginx.conf /etc/nginx/nginx.conf

COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

RUN chmod -R g+r /usr/share/nginx/html && \
    chgrp -R 0 /usr/share/nginx/html && \
    chmod -R 777 /tmp/nginx /var/run/nginx /var/cache/nginx

USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]