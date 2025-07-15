FROM nginx:1.27.0

MAINTAINER Johnathon

WORKDIR /usr/share/nginx/general

ENV API_SERVER=http://127.0.0.1:9527

ENV SERVER_PORT=80

EXPOSE ${SERVER_PORT}

ADD nginx/general.conf.template /etc/nginx/templates/default.conf.template
ADD dist /usr/share/nginx/general
ADD admin/dist /usr/share/nginx/general/admin
