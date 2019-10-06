# Fungsi hahaha() hanya mengubah nilai variabel v, yang mempengaruhi nilai x pada akhir program.
# Jika ditelaah lebih dalam, fungsi hahaha() mengubah nilai variabel v dengan pola deret biner negatif.
# Berikut contoh biner negatif: [-1, -2, 4, 8, -16, -32, ...]
# >>> (-1-2+4+8-16-32+64+128-256-512+1024+2048-4096-8192+16384+32768-65536-131072+262144) - 170385
# -65528
# Sehingga untuk mencapai nilai x = 170385, kita harus mengurangi nilai x sebesar 65528 agar lolos pada pengecekan terakhir.
# Ingat bahwa -65528 = -65536+8, maka kita susun input yang dimasukkan sedemikian rupa agar tidak dieksekusi kedalam kondisi tersebut.

# Berikut kodenya.

from z3 import *

s = Solver()
a1 = [BitVec(i, 32) for i in range(28)]

for i in range(28):
	s.add(a1[i] >= 0x20)
	s.add(a1[i] <= 0x7f)	

addu = [1052, 787, 201, 666, 956, 1078, 681, 901, 1100]
mulu = [1898, 2228, 681, 634, 337, 356, 273, 246, 2079]
xumu = [69, 29, 126, 61, 9, 24, 64]
rr1 = [5, 3, 3, 5, 3, 3, 5, 2, 3]
rr2 = [2, 2, 2, 3, 2, 5, 2, 3, 5]
rr3 = [3, 5, 5, 2, 5, 2, 3, 5, 2]

for i in range(9):
	if addu[i] == 201:
		# Ketika nilai v = 8, operasi x += v tidak dieksekusi.
		s.add( (rr1[i]*a1[i]) + (rr2[i]*a1[i+9]) + (rr3[i]*a1[i+18]) != addu[i] )
	else:	
		s.add( (rr1[i]*a1[i]) + (rr2[i]*a1[i+9]) + (rr3[i]*a1[i+18]) == addu[i] )

for i in range(9):
	if mulu[i] == 273:
		# Ketika nilai v = -65536, operasi x += v tidak dieksekusi.
		s.add( (rr1[i]+a1[i]) * (rr2[i]+a1[i+9]) * (rr3[i]+a1[i+18]) % 2273 != mulu[i] )
	else:
		s.add( (rr1[i]+a1[i]) * (rr2[i]+a1[i+9]) * (rr3[i]+a1[i+18]) % 2273 == mulu[i] )

# Sehingga nilai v sudah memenuhi kriteria pengecekan terakhir, yaitu 170385.

for i in range(7):
	s.add( (a1[i] ^ a1[i+7] ^ a1[i+14] ^ a1[i+21]) == xumu[i] )

if s.check() == sat:
	model = s.model()
	print ''.join([chr(model[x].as_long()) for x in a1])
