FROM trafex/alpine-nginx-php7:latest

ADD ./index.php /var/www/html/

ADD ./flag /
ADD ./your_lovely_flag2_is_here /

EXPOSE 8080

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
