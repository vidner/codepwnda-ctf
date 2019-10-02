FROM node:slim

RUN mkdir -p /usr/src/app

COPY app.js /usr/src/app
COPY flag.txt /usr/src/app
COPY package.json /usr/src/app


RUN chown root:root /usr/src/app
RUN chown -R root:root /usr/src/app
RUN chmod -R 755 /usr/src/app


WORKDIR /usr/src/app
RUN npm install

EXPOSE 50050

USER nobody

CMD ["node","app.js"]

# docker build . -t 'hello-js'
# docker run -p 50050:50050 -itd hello-js
