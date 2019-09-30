#!/usr/bin/env python
import subprocess

jsc = raw_input('give me your one liner payload (use something like https://javascriptcompressor.com/): ')

proc = subprocess.Popen(["/home/ctf/qjs", "-e", jsc], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
out, err = proc.communicate()

print(out)
