import sys,time
logo = """
\033[1;97m█████████ \033[1;97m█████████ \033[1;97m█████████ \033[1;97m█████████
\033[1;97m█▄█████▄█ \033[1;97m█▄█████▄█ \033[1;97m█▄█████▄█ \033[1;97m█▄█████▄█     
\033[1;97m█\033[1;91m▼▼▼▼▼    \033[1;97m█\033[1;91m▼▼▼▼▼    \033[1;97m█\033[1;91m▼▼▼▼▼    \033[1;97m█\033[1;91m▼▼▼▼▼  
\033[1;97m█ \033[1;97m        \033[1;97m█ \033[1;97m        \033[1;97m█ \033[1;97m        \033[1;97m█ \033[1;97m
\033[1;97m█\033[1;91m▲▲▲▲▲    \033[1;97m█\033[1;91m▲▲▲▲▲    \033[1;97m█\033[1;91m▲▲▲▲▲    \033[1;97m█\033[1;91m▲▲▲▲▲
\033[1;97m█████████ \033[1;97m█████████ \033[1;97m█████████ \033[1;97m█████████ 
\033[1;97m ██ ██    \033[1;97m ██ ██    \033[1;97m ██ ██    \033[1;97m ██ ██
\033[1;97m╔══════════════════════════════════════╗
\033[1;97m║  \033[1;94mWelcome to Serial  \033[1;91mBomber  	       \033[1;97m║
\033[1;97m║  \033[1;93mEnter valid serial to get the flag  \033[1;97m║
\033[1;97m║  \033[1;97mEx: \033[1;91maaaaaa-bbbbbb-aaaaaa-bbbbbb     \033[1;97m║
\033[1;97m║     \033[1;91m-aaaaaa-bbbbbb-aaaaaa-bbbbbb     \033[1;97m║
\033[1;97m╚══════════════════════════════════════╝"""
def tik():
	print("\r\033[1;93m[●] \033[1;92mChecking ur serial \033[1;97m",end="")
	for i in range(3):
		sys.stdout.write(".")
		sys.stdout.flush()
		time.sleep(0.5)
	print()
print(logo)
a = input("ur serial : ")
serial = a
a=a.split("-")
tik()
b = [bin(ord(j))[2:] if len(bin(ord(j))[2:]) >= 7 else '0' + bin(ord(j))[2:] for i in a for j in i]
try :
	c = [int(b[i+0]+b[i+5]+b[i+1]+b[i+4]+b[i+2]+b[i+3],2) for i in range(0,len(b),6)]
except:
	print("\033[1;91mbeli dulu serialnya")
	exit()
d = [1986342447338, 2643730164071, 3346821626201, 3906726998725, 1956741162221, 1904229999301, 2299358606920, 2398704432105]
if c==d :
	print("wow u a serial bomber , this is a gift for you"+"\n\033[1;92mcodepwnda{%s}"%serial)
else :
	print("\033[1;91mbeli dulu serialnya")
	exit()