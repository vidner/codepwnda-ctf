import base64

flag = open('flag.jpg').read()
pt = base64.b32encode(flag)
ct = ''
for i in pt:
	ct += open('{}.jpg'.format(i)).read()
print ct
