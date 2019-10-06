# babyrsa

- `n = p**2 * q**2` sehingga `phi = (p-1)*p * (q-1)*q`
- flag yang telah diencode diubah dengan base 0x16 (22), bukan 16

Solution
--------
```python
from Crypto.Util.number import *
from libnum import *

e = 0x10001
n = 0x54012066b18843995165c3c0d783aa9e31e796f6928ea4bfe0728b1d1bad6271

"""
N bisa difaktorkan dengan mudah
dengan yafu / tools sejenis lainnya

P20 = 16760491439280901423
P20 = 16760491439280901423
P20 = 11630107594679429833
P20 = 11630107594679429833
"""

p = 16760491439280901423
q = 11630107594679429833
phi = (p-1)*p * (q-1)*q
d = inverse(e, phi)
c = int(open("flag.enc").read().strip())
m = pow(c, d, n)

len_hex = 0
while 0x16 ** len_hex < m: len_hex += 1
len_hex -= 1

c16 = '0123456789abcdef'
flag = ''
while m:
	tmp = m // (0x16 ** len_hex)
	flag += str(c16[tmp])
	m -= tmp * (0x16 ** len_hex)
	len_hex -= 1

print flag.decode("hex")
```