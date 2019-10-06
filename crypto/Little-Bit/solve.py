from Crypto.Util.number import long_to_bytes as l2b
import base64

ct = '6U26ZrIPG5j4Kh3eSI856UqONeCp5CzoiEeg9giPMt65DrvIIO+0xg=='
ct = base64.b64decode(ct)
myBits = [ord(x) // 4 for x in ct]
msg = ''
for x in myBits[::-1]:
	msg += bin(x)[2:].rjust(6, '0')

# angka 0 dibelakang adalah hasil padding
pt = int(msg, 2) >> 1  
print l2b(pt)
