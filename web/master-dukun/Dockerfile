FROM python:3.7

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/templates

COPY app.py /usr/src/app
COPY dukun.py /usr/src/app
COPY flag.txt /usr/src/app
COPY key /usr/src/app
COPY templates/index.html /usr/src/app/templates
COPY requirements.txt /usr/src/app

RUN pip install --no-cache-dir -r /usr/src/app/requirements.txt

RUN chown root:root /usr/src/app
RUN chown -R root:root /usr/src/app
RUN chmod -R 755 /usr/src/app

WORKDIR /usr/src/app

EXPOSE 5000

USER nobody

CMD ["python","dukun.py"]

# docker build . -t 'hello-js'
# docker run -p 5000:5000 -itd hello-js
