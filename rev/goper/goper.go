package main

import (
	"os"
	"math/big"
	"fmt"
	"math/rand"	
	"strconv"
	"time"
	"strings"
)

var codes = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-" 

func SsN(s string, chunkSize int) []string {
    var chunks []string
    runes := []rune(s)

    if len(runes) == 0 {
        return []string{s}
    }

    for i := 0; i < len(runes); i += chunkSize {
        nn := i + chunkSize
        if nn > len(runes) {
            nn = len(runes)
        }
        chunks = append(chunks, string(runes[i:nn]))
    }
    return chunks
}

func ElK(val string) string {
	str := make([]byte, 0, 512)
    var id, _ = new(big.Int).SetString(val, 10)
    if val == "0" {
        return "0"
    }
    for id.Cmp(big.NewInt(0))==1 {
    	sf :=int64(64)
    	mod := big.NewInt(sf)
    	mod.Mod(id,mod)
        ch := codes[mod.Uint64()]
        str = append(str, byte(ch))
        id.Div(id,big.NewInt(64))
    }
    return string(str)
}

func main() {
	cmd := os.Args
	if len(cmd)==1 {
 		fmt.Println("./goper <string>")
 	}else{
 		i:=0
		var key string
		for i<1{
			rand.Seed(time.Now().UnixNano())
			key += strconv.Itoa(rand.Intn((2<<0x26)-(2<<0x24))+(2<<0x24))
		i++
		}
		var a, _ = new(big.Int).SetString(key, 10)
		input := cmd[1]
		s := []string{}
		var cipher string
		for _,c := range input {
			d := int64(c)
			f := big.NewInt(d)
			f.Xor(a,f)
			s = SsN(f.String(),4)
			rand.Shuffle(len(s), func(i, j int) { s[i], s[j] = s[j], s[i] })
			cipher += strings.Join(s[:],"")
		}		
		fmt.Println(ElK(cipher))
	}
}