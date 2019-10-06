#!/usr/bin/env python
from Crypto.Cipher import AES
import os, sys

class Unbuffered(object):
    def __init__(self, stream):
        self.stream = stream
    def write(self, data):
        self.stream.write(data)
        self.stream.flush()
    def writelines(self, datas):
        self.stream.writelines(datas)
        self.stream.flush()
    def __getattr__(self, attr):
        return getattr(self.stream, attr)

sys.stdout = Unbuffered(sys.stdout)

banner = "Kamu bisa coba: masuk, keluar, bendera\n"

class myAES():

    def enkrip(self, data):
        length = 16 - (len(data) % 16)
        data += chr(length) * length
        cipher = AES.new(self.kunci, AES.MODE_CBC, self.IV)
        ciphertext = cipher.encrypt(data)
        return self.IV + ciphertext

    def dekrip(self, data):
        IV   = data[:16]
        data = data[16:]
        cipher = AES.new(self.kunci, AES.MODE_CBC, IV)
        plaintext = cipher.decrypt(data)
        plaintext = plaintext[:-ord(plaintext[-1])]
        return plaintext

    def cmd_masuk(self):
        if self.sudah_masuk:
            sys.stdout.write("    kamu sudah masuk!\n")
        else:
            sys.stdout.write("    username: ")
            username = raw_input().strip()
            if len(username) < 8:
                sys.stdout.write("    kurang panjang!\n")
            elif not username.isalnum():
                sys.stdout.write("    tidak valid!\n")
            else:
                sign = username + "|" + "user"
                enc  = self.enkrip(sign)
                sys.stdout.write("    signature kamu: " + enc.encode("hex") + "\n")
                self.sudah_masuk = True

    def cmd_bendera(self):
        if not self.sudah_masuk:
            sys.stdout.write("    kamu belum masuk!\n")
        else:
            sys.stdout.write("    signature: ")
            enc = raw_input().strip()
            sign = self.dekrip(enc.decode("hex"))
            try:
                role = sign.split('|')[1]
            except:
                sys.stdout.write("    signature tidak valid!\n")
                self.keluar()
            if role == "admin":
                sys.stdout.write("    berhasil: " + open('flag').read() + "\n")
                self.keluar()
            else:
                sys.stdout.write("    gagal: kamu bukan admin tapi " + role + "\n")

    def shell(self):
        while True:
            sys.stdout.write(">>> ")
            cmd = raw_input().strip()
            if cmd == "" or cmd == "keluar":
                break
            elif cmd == "masuk":
                self.cmd_masuk()
            elif cmd == "bendera":
                self.cmd_bendera()

    def keluar(self):
        sys.exit(1)

    def handle(self):
        self.IV  = os.urandom(16)
        self.kunci = os.urandom(32)
        self.sudah_masuk = False
        sys.stdout.write(banner)
        self.shell()
        self.keluar()

if __name__ == "__main__":
    aes = myAES()
    aes.handle()
