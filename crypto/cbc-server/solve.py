username = raw_input('username (harus 8 huruf): ')
out = raw_input('signature user: ')

def xors(a, b):
	r = ''
	for i,j in zip(a,b):
		r += chr(ord(i)^ord(j))
	return r

iv = out[:32]
ct = out[32:]
iv = iv.decode('hex')
ct = ct.decode('hex')
new_iv = xors(username, 'aa|admin')
new_iv = xors(new_iv, iv)
a = new_iv + iv[8:] + ct
a = a.encode('hex')

print 'signature admin: ' + a
