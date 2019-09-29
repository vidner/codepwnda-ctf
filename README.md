# codepwnda-ctf
sebuah upaya agar per-ctf-an di indonesia kembali ke jalan yang benar

## Format flag
### `^codepwnda{[ -~]+}$` ###

## Distribusi poin
Static scoring

Level      | Score     |
-----------|-----------|
easy       |    1-50   |
medium     |   51-100  |
hard       |  101-200  | 
guess god  |   `inf`   |

## Deploy

challenge name         | category | level | dockerized | port |
-----------------------|----------|-------|------------|------|

## folder structure
```
.
├── [category]
│   ├── [challs-name]
│   │   ├── release/
│   │   │   ├── [binary]
│   │   │   └── [libs]
│   │   ├── [source, soal, ...].{c, py, cc, ...}
│   │   ├── [solve, solusi, ...].{c, py, cc, ...}
│   │   ├── flag.txt
│   │   ├── Makefile
│   └── README.md
.   .
```

## License
```
MIT License

Copyright (c) 2019 Rendi Yuda Perkasa.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
