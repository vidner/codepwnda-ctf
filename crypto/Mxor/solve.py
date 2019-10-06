import libnum, string

a = open('flag.enc').read().decode('base64')
b = []
c = a
while c:
	b.append(c[:5])
	c = c[5:]

pos = [[],[],[],[],[]]
for k in string.lowercase:
	for j in range(5):
		if all(chr(ord(k) ^ ord(b[i][j])) in string.digits for i in range(len(b))):
			pos[j].append(k)

print pos # key found: hutan

flag = ''
key = 'hutan'
for i in range(len(a)):
	flag += chr(ord(a[i]) ^ ord(key[i % len(key)]))
print libnum.n2s(int(flag))
