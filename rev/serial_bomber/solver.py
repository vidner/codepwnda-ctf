d = [1986342447338, 2643730164071, 3346821626201, 3906726998725, 1956741162221, 1904229999301, 2299358606920, 2398704432105]
a = [bin(i)[2:] if len(bin(i)[2:]) == 42 else '0' + bin(i)[2:] for i in d]
b = [len(i) for i in a]
c = []
for s in a:
	while s:
	    c.append(s[:7])
	    s = s[7:]
	# c.append(o)
e = "".join([chr(int(i,2)) for i in c])
f = []
while e:
    f.append(e[:6])
    e = e[6:]
g = "-".join([i[0]+i[2]+i[4]+i[5]+i[3]+i[1] for i in f])
print (g)