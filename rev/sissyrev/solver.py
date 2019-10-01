import sys
from binascii import * 

def substitute(hexBlock):
	#subtitusi digit hex
    substitutedHexBlock = ""
    substitution = [10, 13, 0, 8, 11, 7, 6, 12, 15, 14, 3, 4, 2, 1, 5, 9]
    for hexDigit in hexBlock:
        newDigit = substitution.index(int(hexDigit, 16))
        substitutedHexBlock += hex(newDigit)[2:]
    # print (substitutedHexBlock)
    return substitutedHexBlock

def pad(message):
    numBytes = 4-(len(message)%4)
    return message + numBytes * chr(numBytes)

def hexpad(hexBlock):
    numZeros = 8 - len(hexBlock)
    return numZeros*"0" + hexBlock

def permute(hexBlock):
	#hexblock di int terus bit nya di permute
    permutation = [20, 10, 26, 23, 11, 21, 15, 25, 0, 9, 6, 2, 17, 30, 29, 12, 18, 16, 28, 14, 5, 7, 1, 22, 19, 8, 27, 13, 3, 31, 24, 4]
    block = int(hexBlock, 16)
    permutedBlock = 0
    counter = 0
    for i in permutation:
        bit = (block & (1 << i)) >> i
        permutedBlock |= bit << counter
        counter+=1
    # print (hexpad(hex(permutedBlock)[2:]))
    return hexpad(hex(permutedBlock)[2:])

def round(hexMessage):
    numBlocks = len(hexMessage)//8
    substitutedHexMessage = ""
    for i in range(numBlocks):
        substitutedHexMessage += permute(hexMessage[8*i:8*i+8])
    permutedHexMessage = ""
    for i in range(numBlocks):
        permutedHexMessage += substitute(substitutedHexMessage[8*i:8*i+8])
    # print (permutedHexMessage)
    return permutedHexMessage



if __name__ == "__main__":
    hexMessage = "d43caa9527cdf4f1e0480b55667a3f2b2dc499e82b01a2cb91cc13a16aab71b4f09fc1c6"
    # a = hexMessage
    for i in range(1337):
        hexMessage = round(hexMessage)
    print (unhexlify(hexMessage))
