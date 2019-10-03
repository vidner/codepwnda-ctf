FROM php:7.2-cli

COPY source /usr/src/app

RUN chown root:root /usr/src/app
RUN chown -R root:root /usr/src/app
RUN chmod -R 755 /usr/src/app

WORKDIR /usr/src/app

EXPOSE 8000

USER nobody

CMD [ "php", "-S", "0.0.0.0:8000" ]

