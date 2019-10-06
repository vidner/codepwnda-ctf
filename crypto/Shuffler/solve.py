from random import randint
from string import maketrans

def decrypt(msg):
	x = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
	y = 'BXcjk7JCT5goWsq9Lhr2zvVISbKfGteauUHMlRiQ3Nd6A8p14OnmZ0xyYFPEwD'
	z = maketrans(y, x)
	return msg.translate(z)

ct = open('ciphertext.txt').read().strip()
for i in range(43):
	ct = decrypt(ct)
	print ct
