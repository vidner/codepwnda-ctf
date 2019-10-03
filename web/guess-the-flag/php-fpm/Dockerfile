FROM php:fpm-alpine

COPY ./src/index.php /var/www/html/

COPY ./flag /
COPY ./your_lovely_flag2_is_here /

CMD ["php-fpm"]

EXPOSE 9000
