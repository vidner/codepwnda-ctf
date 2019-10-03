FROM trafex/alpine-nginx-php7:latest

COPY ./index.php /var/www/html/

COPY ./flag /
COPY ./your_lovely_flag2_is_here /

EXPOSE 8080

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
