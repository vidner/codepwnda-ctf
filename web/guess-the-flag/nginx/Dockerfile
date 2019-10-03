FROM nginx:alpine

COPY ./nginx/chall.conf /etc/nginx/conf.d/chall.conf
COPY ./src/index.php /var/www/html/

COPY ./flag /
COPY ./your_lovely_flag2_is_here /

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 4000