# quickie
Oo~~b~~f. no fast != no furious. Can you pwn this as fast as possible?

```
├── 0001-QuickJS-enable-OOB.patch
├── 0002-hardened-build.patch
├── quickjs-2019-09-18.tar.xz
├── challenge
│   ├── flag
│   └── qjs
└── README.md
```

## build instruction
```sh
tar xvf quickjs-2019-09-18.tar.xz
cd quickjs-2019-09-18
patch < ../0001-QuickJS-enable-OOB.patch
patch < ../0002-debug-helper.patch
patch < ../0003-hardened-build.patch
make qjs
# binary in $PWD/qjs
```