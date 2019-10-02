import random
import hashlib

def f0(x):
    a = 0
    b = 1
    while(x):
        a = a + b
        b = a - b
        x = x - 1
    return (a+b)%10

def f1(x):
    a = ""
    for i in range(len(x)):
        a += chr((ord(x[i])^f0(i))%256)
    return a

def f2(x):
    q, r, t, k, n, l, y = 1, 0, 1, 1, 3, 3, []
    while (len(y)<len(x)):
        if 4*q+r-t < n*t:
            y.append(n)
            nr = 10*(r-n*t)
            n  = ((10*(3*q+r))//t)-10*n
            q  *= 10
            r  = nr
        else:
            nr = (2*q+r)*l
            nn = (q*(7*k)+2+(r*l))//(t*l)
            q  *= k
            t  *= l
            l  += 2
            k += 1
            n  = nn
            r  = nr
    x=x[::-1]
    z  = [chr(ord(x[i])-y[i]%256) for i in range(0,len(x),2)]
    v  = [chr((ord(x[i])+y[i])%256) for i in range(1,len(x),2)]
    v += z
    return v

def f3(x,z):
    y = []
    while x != 1:
        y.append(x%z)
        if x % 2 == 0:
            x = int(x / 2)
        else:
            x = int(3 * x + 1)
    else:
        y.append(x%z)
        if len(y)&1:
            return y[1:]
        else :
            return y

def f4(x,y):
    a=x[:len(x)/2]
    b=x[len(x)/2:]
    for i in range(len(a)):
        z=y[a[i]]
        y[a[i]]=y[b[i]]
        y[b[i]]=z
    z = [chr(i) for i in y]
    return "".join(z)

def encrypt(x):
    key = random.randint(1337,7331)
    print key
    x = f2(f1(x))
    y = [ord(i) for i in x]
    return f4(f3(key,len(x)),y).encode("hex")

def check(x):
  if hashlib.md5(x).hexdigest() == "b4fdeab83ba1cab8db95127657556a40":
    return "Correct, The Flag is : \ncodepwnda{%s}" % x
  else:
    return "Wrong Flag !"

def ff4(x,y):
    a=x[:len(x)/2]
    b=x[len(x)/2:]
    p=[i for i in range(len(y))]
    for i in range(len(a)):
        z=p[a[i]]
        p[a[i]]=p[b[i]]
        p[b[i]]=z
    q = ""
    for i in range(len(y)):
        for j in range(len(y)):
            if p[j]==i:
                q+=chr(y[j])
    return q

def ff2(x):
    q, r, t, k, n, l, y = 1, 0, 1, 1, 3, 3, []
    while (len(y)<len(x)):
        if 4*q+r-t < n*t:
            y.append(n)
            nr = 10*(r-n*t)
            n  = ((10*(3*q+r))//t)-10*n
            q  *= 10
            r  = nr
        else:
            nr = (2*q+r)*l
            nn = (q*(7*k)+2+(r*l))//(t*l)
            q  *= k
            t  *= l
            l  += 2
            k += 1
            n  = nn
            r  = nr
    v  = x[:len(x)/2]
    z  = x[len(x)/2:]
    p  = []
    for i in range(len(x)):
        if i&1:
            p.append(chr((256+ord(v[i/2])-y[i])%256))
        else:
            p.append(chr(ord(z[i/2])+y[i]))
    return "".join(p[::-1])

# inp = raw_input()
enc = "3f6f706b513c5f65557a6e5a5d736979666663686073677975547a7e516665776a68696a657d6963777572674f7269716f59666f5857605a20566e7b7b5c5a75636c60596b6f68607f76547970717f784d6e6073515a5c686a81756e74755c63667468595d7f76736d5e696e5e607d63"
# print enc

for i in range(1337,7331):
    ciper = enc.decode('hex')
    ciper = [ord(j) for j in ciper]
    x = ff4(f3(i,len(ciper)),ciper)
    x = f1(ff2(x))
    flag = check(x)
    if flag !="Wrong Flag !":
    	print flag
    	break
# print encrypt(raw_input())
# hashlib.md5("reverse_a_function_with_a_bit_of_cryptography_isnt_that_hard_or_is_it_?_but_if_u_got_this_message_u_r_awesome_:*").hexdigest()
# reverse_a_function_with_a_bit_of_cryptography_isnt_that_hard_or_is_it_?_but_if_u_got_this_message_u_r_awesome_:*

