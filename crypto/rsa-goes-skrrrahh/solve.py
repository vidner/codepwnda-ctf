buka = open('enc').read().split('\n')
enc = int(buka[0].split(': ')[1])
n = int(buka[1].split(': ')[1])
hint = int(buka[2].split(': ')[1])

z = ((hint - n) / 0xdeadbeef) - 0xdeadbeef # c = 0xdeadbeef

dist = z // 4
p = z // 2
q = z - p

print "p = {}".format(p)
print "q = {}".format(q)
print "p*q = {}".format(p*q)
print "n   = {}".format(n)
print "="*40

# binary search, mulai dari p = q
while p*q != n:
	if p*q > n:
		p += dist
		q = z - p
	elif p*q < n:
		p -= dist
		q = z - p
	dist = dist // 2

	print "p = {}".format(p)
	print "q = {}".format(q)
	print "p*q = {}".format(p*q)
	print "n   = {}".format(n)
	print "="*40

print "Dapet cuk!!1!1!!".upper()
print "p = {}".format(p)
print "q = {}".format(q)

from libnum import *
from Crypto.Util.number import *
e = 65537
phi = (p-1) * (q-1)
d = inverse(e, phi)
print n2s(pow(enc, d, n))