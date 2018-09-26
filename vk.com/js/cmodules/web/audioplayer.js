! function(e) {
    var t = {};

    function i(r) {
        if (t[r]) return t[r].exports;
        var n = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(n.exports, n, n.exports, i), n.l = !0, n.exports
    }
    i.m = e, i.c = t, i.d = function(e, t, r) {
        i.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, i.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, i.t = function(e, t) {
        if (1 & t && (e = i(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (i.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var n in e) i.d(r, n, function(t) {
                return e[t]
            }.bind(null, n));
        return r
    }, i.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return i.d(t, "a", t), t
    }, i.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, i.p = "", i(i.s = 69)
}([function(e, t, i) {
    var r = i(56),
        n = i(27),
        o = i(108);
    t.createCipher = t.Cipher = r.createCipher, t.createCipheriv = t.Cipheriv = r.createCipheriv, t.createDecipher = t.Decipher = n.createDecipher, t.createDecipheriv = t.Decipheriv = n.createDecipheriv, t.listCiphers = t.getCiphers = function() {
        return Object.keys(o)
    }
}, function(e, t, i) {
    "use strict";

    function r(e, t) {
        if (!window.Worker || !window.Blob) return setTimeout(e, t);
        var i = new Blob(["\n      var timeout;\n      onmessage = function(e) {\n        clearTimeout(timeout);\n        if (e.data == 'start') {\n          timeout = setTimeout(function() { postMessage({}); }, \" + delay + \");\n        }\n      }\n    "]);
        try {
            var r = new Worker(window.URL.createObjectURL(i));
            return r.onmessage = function() {
                r.terminate(), e()
            }, r.postMessage("start"), r
        } catch (i) {
            return setTimeout(e, t)
        }
    }

    function n(e) {
        if (!e) return !1;
        isNumeric(e) ? clearTimeout(e) : e.terminate()
    }
    i.r(t), i.d(t, "setWorkerTimeout", function() {
        return r
    }), i.d(t, "clearWorkerTimeout", function() {
        return n
    })
}, function(e, t, i) {
    "use strict";
    var r = i(132),
        n = i(137),
        o = i(143),
        a = r.rotr64_hi,
        s = r.rotr64_lo,
        d = r.shr64_hi,
        u = r.shr64_lo,
        f = r.sum64,
        c = r.sum64_hi,
        l = r.sum64_lo,
        h = r.sum64_4_hi,
        p = r.sum64_4_lo,
        _ = r.sum64_5_hi,
        y = r.sum64_5_lo,
        b = n.BlockHash,
        g = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591];

    function v() {
        if (!(this instanceof v)) return new v;
        b.call(this), this.h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209], this.k = g, this.W = new Array(160)
    }

    function m(e, t, i, r, n) {
        var o = e & i ^ ~e & n;
        return o < 0 && (o += 4294967296), o
    }

    function A(e, t, i, r, n, o) {
        var a = t & r ^ ~t & o;
        return a < 0 && (a += 4294967296), a
    }

    function w(e, t, i, r, n) {
        var o = e & i ^ e & n ^ i & n;
        return o < 0 && (o += 4294967296), o
    }

    function E(e, t, i, r, n, o) {
        var a = t & r ^ t & o ^ r & o;
        return a < 0 && (a += 4294967296), a
    }

    function P(e, t) {
        var i = a(e, t, 28) ^ a(t, e, 2) ^ a(t, e, 7);
        return i < 0 && (i += 4294967296), i
    }

    function S(e, t) {
        var i = s(e, t, 28) ^ s(t, e, 2) ^ s(t, e, 7);
        return i < 0 && (i += 4294967296), i
    }

    function I(e, t) {
        var i = a(e, t, 14) ^ a(e, t, 18) ^ a(t, e, 9);
        return i < 0 && (i += 4294967296), i
    }

    function T(e, t) {
        var i = s(e, t, 14) ^ s(e, t, 18) ^ s(t, e, 9);
        return i < 0 && (i += 4294967296), i
    }

    function M(e, t) {
        var i = a(e, t, 1) ^ a(e, t, 8) ^ d(e, t, 7);
        return i < 0 && (i += 4294967296), i
    }

    function L(e, t) {
        var i = s(e, t, 1) ^ s(e, t, 8) ^ u(e, t, 7);
        return i < 0 && (i += 4294967296), i
    }

    function k(e, t) {
        var i = a(e, t, 19) ^ a(t, e, 29) ^ d(e, t, 6);
        return i < 0 && (i += 4294967296), i
    }

    function C(e, t) {
        var i = s(e, t, 19) ^ s(t, e, 29) ^ u(e, t, 6);
        return i < 0 && (i += 4294967296), i
    }
    r.inherits(v, b), e.exports = v, v.blockSize = 1024, v.outSize = 512, v.hmacStrength = 192, v.padLength = 128, v.prototype._prepareBlock = function(e, t) {
        for (var i = this.W, r = 0; r < 32; r++) i[r] = e[t + r];
        for (; r < i.length; r += 2) {
            var n = k(i[r - 4], i[r - 3]),
                o = C(i[r - 4], i[r - 3]),
                a = i[r - 14],
                s = i[r - 13],
                d = M(i[r - 30], i[r - 29]),
                u = L(i[r - 30], i[r - 29]),
                f = i[r - 32],
                c = i[r - 31];
            i[r] = h(n, o, a, s, d, u, f, c), i[r + 1] = p(n, o, a, s, d, u, f, c)
        }
    }, v.prototype._update = function(e, t) {
        this._prepareBlock(e, t);
        var i = this.W,
            r = this.h[0],
            n = this.h[1],
            a = this.h[2],
            s = this.h[3],
            d = this.h[4],
            u = this.h[5],
            h = this.h[6],
            p = this.h[7],
            b = this.h[8],
            g = this.h[9],
            v = this.h[10],
            M = this.h[11],
            L = this.h[12],
            k = this.h[13],
            C = this.h[14],
            D = this.h[15];
        o(this.k.length === i.length);
        for (var U = 0; U < i.length; U += 2) {
            var O = C,
                x = D,
                R = I(b, g),
                B = T(b, g),
                N = m(b, g, v, M, L),
                j = A(b, g, v, M, L, k),
                H = this.k[U],
                F = this.k[U + 1],
                q = i[U],
                V = i[U + 1],
                W = _(O, x, R, B, N, j, H, F, q, V),
                z = y(O, x, R, B, N, j, H, F, q, V);
            O = P(r, n), x = S(r, n), R = w(r, n, a, s, d), B = E(r, n, a, s, d, u);
            var Y = c(O, x, R, B),
                K = l(O, x, R, B);
            C = L, D = k, L = v, k = M, v = b, M = g, b = c(h, p, W, z), g = l(p, p, W, z), h = d, p = u, d = a, u = s, a = r, s = n, r = c(W, z, Y, K), n = l(W, z, Y, K)
        }
        f(this.h, 0, r, n), f(this.h, 2, a, s), f(this.h, 4, d, u), f(this.h, 6, h, p), f(this.h, 8, b, g), f(this.h, 10, v, M), f(this.h, 12, L, k), f(this.h, 14, C, D)
    }, v.prototype._digest = function(e) {
        return "hex" === e ? r.toHex32(this.h, "big") : r.split32(this.h, "big")
    }
}, function(e, t, i) {
    e.exports = i(85).EventEmitter
}, function(e, t, i) {
    "use strict";
    var r = i(39),
        n = i(133).Buffer,
        o = i(49),
        a = n.alloc(128),
        s = 64;

    function d(e, t) {
        o.call(this, "digest"), "string" == typeof t && (t = n.from(t)), this._alg = e, this._key = t, t.length > s ? t = e(t) : t.length < s && (t = n.concat([t, a], s));
        for (var i = this._ipad = n.allocUnsafe(s), r = this._opad = n.allocUnsafe(s), d = 0; d < s; d++) i[d] = 54 ^ t[d], r[d] = 92 ^ t[d];
        this._hash = [i]
    }
    r(d, o), d.prototype._update = function(e) {
        this._hash.push(e)
    }, d.prototype._final = function() {
        var e = this._alg(n.concat(this._hash));
        return this._alg(n.concat([this._opad, e]))
    }, e.exports = d
}, function(e) {
    e.exports = {
        sha224WithRSAEncryption: {
            sign: "rsa",
            hash: "sha224",
            id: "302d300d06096086480165030402040500041c"
        },
        "RSA-SHA224": {
            sign: "ecdsa/rsa",
            hash: "sha224",
            id: "302d300d06096086480165030402040500041c"
        },
        sha256WithRSAEncryption: {
            sign: "rsa",
            hash: "sha256",
            id: "3031300d060960864801650304020105000420"
        },
        "RSA-SHA256": {
            sign: "ecdsa/rsa",
            hash: "sha256",
            id: "3031300d060960864801650304020105000420"
        },
        sha384WithRSAEncryption: {
            sign: "rsa",
            hash: "sha384",
            id: "3041300d060960864801650304020205000430"
        },
        "RSA-SHA384": {
            sign: "ecdsa/rsa",
            hash: "sha384",
            id: "3041300d060960864801650304020205000430"
        },
        sha512WithRSAEncryption: {
            sign: "rsa",
            hash: "sha512",
            id: "3051300d060960864801650304020305000440"
        },
        "RSA-SHA512": {
            sign: "ecdsa/rsa",
            hash: "sha512",
            id: "3051300d060960864801650304020305000440"
        },
        "RSA-SHA1": {
            sign: "rsa",
            hash: "sha1",
            id: "3021300906052b0e03021a05000414"
        },
        "ecdsa-with-SHA1": {
            sign: "ecdsa",
            hash: "sha1",
            id: ""
        },
        sha256: {
            sign: "ecdsa",
            hash: "sha256",
            id: ""
        },
        sha224: {
            sign: "ecdsa",
            hash: "sha224",
            id: ""
        },
        sha384: {
            sign: "ecdsa",
            hash: "sha384",
            id: ""
        },
        sha512: {
            sign: "ecdsa",
            hash: "sha512",
            id: ""
        },
        "DSA-SHA": {
            sign: "dsa",
            hash: "sha1",
            id: ""
        },
        "DSA-SHA1": {
            sign: "dsa",
            hash: "sha1",
            id: ""
        },
        DSA: {
            sign: "dsa",
            hash: "sha1",
            id: ""
        },
        "DSA-WITH-SHA224": {
            sign: "dsa",
            hash: "sha224",
            id: ""
        },
        "DSA-SHA224": {
            sign: "dsa",
            hash: "sha224",
            id: ""
        },
        "DSA-WITH-SHA256": {
            sign: "dsa",
            hash: "sha256",
            id: ""
        },
        "DSA-SHA256": {
            sign: "dsa",
            hash: "sha256",
            id: ""
        },
        "DSA-WITH-SHA384": {
            sign: "dsa",
            hash: "sha384",
            id: ""
        },
        "DSA-SHA384": {
            sign: "dsa",
            hash: "sha384",
            id: ""
        },
        "DSA-WITH-SHA512": {
            sign: "dsa",
            hash: "sha512",
            id: ""
        },
        "DSA-SHA512": {
            sign: "dsa",
            hash: "sha512",
            id: ""
        },
        "DSA-RIPEMD160": {
            sign: "dsa",
            hash: "rmd160",
            id: ""
        },
        ripemd160WithRSA: {
            sign: "rsa",
            hash: "rmd160",
            id: "3021300906052b2403020105000414"
        },
        "RSA-RIPEMD160": {
            sign: "rsa",
            hash: "rmd160",
            id: "3021300906052b2403020105000414"
        },
        md5WithRSAEncryption: {
            sign: "rsa",
            hash: "md5",
            id: "3020300c06082a864886f70d020505000410"
        },
        "RSA-MD5": {
            sign: "rsa",
            hash: "md5",
            id: "3020300c06082a864886f70d020505000410"
        }
    }
}, function(e, t, i) {
    var r = i(24);
    e.exports = g, g.simpleSieve = y, g.fermatTest = b;
    var n = i(105),
        o = new n(24),
        a = new(i(134)),
        s = new n(1),
        d = new n(2),
        u = new n(5),
        f = (new n(16), new n(8), new n(10)),
        c = new n(3),
        l = (new n(7), new n(11)),
        h = new n(4),
        p = (new n(12), null);

    function _() {
        if (null !== p) return p;
        var e = [];
        e[0] = 2;
        for (var t = 1, i = 3; i < 1048576; i += 2) {
            for (var r = Math.ceil(Math.sqrt(i)), n = 0; n < t && e[n] <= r && i % e[n] != 0; n++);
            t !== n && e[n] <= r || (e[t++] = i)
        }
        return p = e, e
    }

    function y(e) {
        for (var t = _(), i = 0; i < t.length; i++)
            if (0 === e.modn(t[i])) return 0 === e.cmpn(t[i]);
        return !0
    }

    function b(e) {
        var t = n.mont(e);
        return 0 === d.toRed(t).redPow(e.subn(1)).fromRed().cmpn(1)
    }

    function g(e, t) {
        if (e < 16) return new n(2 === t || 5 === t ? [140, 123] : [140, 39]);
        var i, p;
        for (t = new n(t);;) {
            for (i = new n(r(Math.ceil(e / 8))); i.bitLength() > e;) i.ishrn(1);
            if (i.isEven() && i.iadd(s), i.testn(1) || i.iadd(d), t.cmp(d)) {
                if (!t.cmp(u))
                    for (; i.mod(f).cmp(c);) i.iadd(h)
            } else
                for (; i.mod(o).cmp(l);) i.iadd(h);
            if (y(p = i.shrn(1)) && y(i) && b(p) && b(i) && a.test(p) && a.test(i)) return i
        }
    }
}, function(e, t, i) {
    e.exports = i(87)
}, function(e, t, i) {
    "use strict";
    t.readUInt32BE = function(e, t) {
        return (e[0 + t] << 24 | e[1 + t] << 16 | e[2 + t] << 8 | e[3 + t]) >>> 0
    }, t.writeUInt32BE = function(e, t, i) {
        e[0 + i] = t >>> 24, e[1 + i] = t >>> 16 & 255, e[2 + i] = t >>> 8 & 255, e[3 + i] = 255 & t
    }, t.ip = function(e, t, i, r) {
        for (var n = 0, o = 0, a = 6; a >= 0; a -= 2) {
            for (var s = 0; s <= 24; s += 8) n <<= 1, n |= t >>> s + a & 1;
            for (s = 0; s <= 24; s += 8) n <<= 1, n |= e >>> s + a & 1
        }
        for (a = 6; a >= 0; a -= 2) {
            for (s = 1; s <= 25; s += 8) o <<= 1, o |= t >>> s + a & 1;
            for (s = 1; s <= 25; s += 8) o <<= 1, o |= e >>> s + a & 1
        }
        i[r + 0] = n >>> 0, i[r + 1] = o >>> 0
    }, t.rip = function(e, t, i, r) {
        for (var n = 0, o = 0, a = 0; a < 4; a++)
            for (var s = 24; s >= 0; s -= 8) n <<= 1, n |= t >>> s + a & 1, n <<= 1, n |= e >>> s + a & 1;
        for (a = 4; a < 8; a++)
            for (s = 24; s >= 0; s -= 8) o <<= 1, o |= t >>> s + a & 1, o <<= 1, o |= e >>> s + a & 1;
        i[r + 0] = n >>> 0, i[r + 1] = o >>> 0
    }, t.pc1 = function(e, t, i, r) {
        for (var n = 0, o = 0, a = 7; a >= 5; a--) {
            for (var s = 0; s <= 24; s += 8) n <<= 1, n |= t >> s + a & 1;
            for (s = 0; s <= 24; s += 8) n <<= 1, n |= e >> s + a & 1
        }
        for (s = 0; s <= 24; s += 8) n <<= 1, n |= t >> s + a & 1;
        for (a = 1; a <= 3; a++) {
            for (s = 0; s <= 24; s += 8) o <<= 1, o |= t >> s + a & 1;
            for (s = 0; s <= 24; s += 8) o <<= 1, o |= e >> s + a & 1
        }
        for (s = 0; s <= 24; s += 8) o <<= 1, o |= e >> s + a & 1;
        i[r + 0] = n >>> 0, i[r + 1] = o >>> 0
    }, t.r28shl = function(e, t) {
        return e << t & 268435455 | e >>> 28 - t
    };
    var r = [14, 11, 17, 4, 27, 23, 25, 0, 13, 22, 7, 18, 5, 9, 16, 24, 2, 20, 12, 21, 1, 8, 15, 26, 15, 4, 25, 19, 9, 1, 26, 16, 5, 11, 23, 8, 12, 7, 17, 0, 22, 3, 10, 14, 6, 20, 27, 24];
    t.pc2 = function(e, t, i, n) {
        for (var o = 0, a = 0, s = r.length >>> 1, d = 0; d < s; d++) o <<= 1, o |= e >>> r[d] & 1;
        for (d = s; d < r.length; d++) a <<= 1, a |= t >>> r[d] & 1;
        i[n + 0] = o >>> 0, i[n + 1] = a >>> 0
    }, t.expand = function(e, t, i) {
        var r = 0,
            n = 0;
        r = (1 & e) << 5 | e >>> 27;
        for (var o = 23; o >= 15; o -= 4) r <<= 6, r |= e >>> o & 63;
        for (o = 11; o >= 3; o -= 4) n |= e >>> o & 63, n <<= 6;
        n |= (31 & e) << 1 | e >>> 31, t[i + 0] = r >>> 0, t[i + 1] = n >>> 0
    };
    var n = [14, 0, 4, 15, 13, 7, 1, 4, 2, 14, 15, 2, 11, 13, 8, 1, 3, 10, 10, 6, 6, 12, 12, 11, 5, 9, 9, 5, 0, 3, 7, 8, 4, 15, 1, 12, 14, 8, 8, 2, 13, 4, 6, 9, 2, 1, 11, 7, 15, 5, 12, 11, 9, 3, 7, 14, 3, 10, 10, 0, 5, 6, 0, 13, 15, 3, 1, 13, 8, 4, 14, 7, 6, 15, 11, 2, 3, 8, 4, 14, 9, 12, 7, 0, 2, 1, 13, 10, 12, 6, 0, 9, 5, 11, 10, 5, 0, 13, 14, 8, 7, 10, 11, 1, 10, 3, 4, 15, 13, 4, 1, 2, 5, 11, 8, 6, 12, 7, 6, 12, 9, 0, 3, 5, 2, 14, 15, 9, 10, 13, 0, 7, 9, 0, 14, 9, 6, 3, 3, 4, 15, 6, 5, 10, 1, 2, 13, 8, 12, 5, 7, 14, 11, 12, 4, 11, 2, 15, 8, 1, 13, 1, 6, 10, 4, 13, 9, 0, 8, 6, 15, 9, 3, 8, 0, 7, 11, 4, 1, 15, 2, 14, 12, 3, 5, 11, 10, 5, 14, 2, 7, 12, 7, 13, 13, 8, 14, 11, 3, 5, 0, 6, 6, 15, 9, 0, 10, 3, 1, 4, 2, 7, 8, 2, 5, 12, 11, 1, 12, 10, 4, 14, 15, 9, 10, 3, 6, 15, 9, 0, 0, 6, 12, 10, 11, 1, 7, 13, 13, 8, 15, 9, 1, 4, 3, 5, 14, 11, 5, 12, 2, 7, 8, 2, 4, 14, 2, 14, 12, 11, 4, 2, 1, 12, 7, 4, 10, 7, 11, 13, 6, 1, 8, 5, 5, 0, 3, 15, 15, 10, 13, 3, 0, 9, 14, 8, 9, 6, 4, 11, 2, 8, 1, 12, 11, 7, 10, 1, 13, 14, 7, 2, 8, 13, 15, 6, 9, 15, 12, 0, 5, 9, 6, 10, 3, 4, 0, 5, 14, 3, 12, 10, 1, 15, 10, 4, 15, 2, 9, 7, 2, 12, 6, 9, 8, 5, 0, 6, 13, 1, 3, 13, 4, 14, 14, 0, 7, 11, 5, 3, 11, 8, 9, 4, 14, 3, 15, 2, 5, 12, 2, 9, 8, 5, 12, 15, 3, 10, 7, 11, 0, 14, 4, 1, 10, 7, 1, 6, 13, 0, 11, 8, 6, 13, 4, 13, 11, 0, 2, 11, 14, 7, 15, 4, 0, 9, 8, 1, 13, 10, 3, 14, 12, 3, 9, 5, 7, 12, 5, 2, 10, 15, 6, 8, 1, 6, 1, 6, 4, 11, 11, 13, 13, 8, 12, 1, 3, 4, 7, 10, 14, 7, 10, 9, 15, 5, 6, 0, 8, 15, 0, 14, 5, 2, 9, 3, 2, 12, 13, 1, 2, 15, 8, 13, 4, 8, 6, 10, 15, 3, 11, 7, 1, 4, 10, 12, 9, 5, 3, 6, 14, 11, 5, 0, 0, 14, 12, 9, 7, 2, 7, 2, 11, 1, 4, 14, 1, 7, 9, 4, 12, 10, 14, 8, 2, 13, 0, 15, 6, 12, 10, 9, 13, 0, 15, 3, 3, 5, 5, 6, 8, 11];
    t.substitute = function(e, t) {
        for (var i = 0, r = 0; r < 4; r++) {
            i <<= 4, i |= n[64 * r + (e >>> 18 - 6 * r & 63)]
        }
        for (r = 0; r < 4; r++) {
            i <<= 4, i |= n[256 + 64 * r + (t >>> 18 - 6 * r & 63)]
        }
        return i >>> 0
    };
    var o = [16, 25, 12, 11, 3, 20, 4, 15, 31, 17, 9, 6, 27, 14, 1, 22, 30, 24, 8, 18, 0, 5, 29, 23, 13, 19, 2, 26, 10, 21, 28, 7];
    t.permute = function(e) {
        for (var t = 0, i = 0; i < o.length; i++) t <<= 1, t |= e >>> o[i] & 1;
        return t >>> 0
    }, t.padSplit = function(e, t, i) {
        for (var r = e.toString(2); r.length < t;) r = "0" + r;
        for (var n = [], o = 0; o < t; o += i) n.push(r.slice(o, o + i));
        return n.join(" ")
    }
}, function(e, t, i) {
    (function(e) {
        function i(e) {
            return Object.prototype.toString.call(e)
        }
        t.isArray = function(e) {
            return Array.isArray ? Array.isArray(e) : "[object Array]" === i(e)
        }, t.isBoolean = function(e) {
            return "boolean" == typeof e
        }, t.isNull = function(e) {
            return null === e
        }, t.isNullOrUndefined = function(e) {
            return null == e
        }, t.isNumber = function(e) {
            return "number" == typeof e
        }, t.isString = function(e) {
            return "string" == typeof e
        }, t.isSymbol = function(e) {
            return "symbol" == typeof e
        }, t.isUndefined = function(e) {
            return void 0 === e
        }, t.isRegExp = function(e) {
            return "[object RegExp]" === i(e)
        }, t.isObject = function(e) {
            return "object" == typeof e && null !== e
        }, t.isDate = function(e) {
            return "[object Date]" === i(e)
        }, t.isError = function(e) {
            return "[object Error]" === i(e) || e instanceof Error
        }, t.isFunction = function(e) {
            return "function" == typeof e
        }, t.isPrimitive = function(e) {
            return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || void 0 === e
        }, t.isBuffer = e.isBuffer
    }).call(this, i(11).Buffer)
}, function(e, t, i) {
    "use strict";
    var r = i(39),
        n = i(70),
        o = i(44),
        a = i(96),
        s = i(49);

    function d(e) {
        s.call(this, "digest"), this._hash = e
    }
    r(d, s), d.prototype._update = function(e) {
        this._hash.update(e)
    }, d.prototype._final = function() {
        return this._hash.digest()
    }, e.exports = function(e) {
        return "md5" === (e = e.toLowerCase()) ? new n : "rmd160" === e || "ripemd160" === e ? new o : new d(a(e))
    }
}, function(e, t, i) {
    "use strict";
    (function(e) {
        var r = i(141),
            n = i(140),
            o = i(150);

        function a() {
            return d.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
        }

        function s(e, t) {
            if (a() < t) throw new RangeError("Invalid typed array length");
            return d.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = d.prototype : (null === e && (e = new d(t)), e.length = t), e
        }

        function d(e, t, i) {
            if (!(d.TYPED_ARRAY_SUPPORT || this instanceof d)) return new d(e, t, i);
            if ("number" == typeof e) {
                if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
                return c(this, e)
            }
            return u(this, e, t, i)
        }

        function u(e, t, i, r) {
            if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
            return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? function(e, t, i, r) {
                if (t.byteLength, i < 0 || t.byteLength < i) throw new RangeError("'offset' is out of bounds");
                if (t.byteLength < i + (r || 0)) throw new RangeError("'length' is out of bounds");
                t = void 0 === i && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, i) : new Uint8Array(t, i, r);
                d.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = d.prototype : e = l(e, t);
                return e
            }(e, t, i, r) : "string" == typeof t ? function(e, t, i) {
                "string" == typeof i && "" !== i || (i = "utf8");
                if (!d.isEncoding(i)) throw new TypeError('"encoding" must be a valid string encoding');
                var r = 0 | p(t, i),
                    n = (e = s(e, r)).write(t, i);
                n !== r && (e = e.slice(0, n));
                return e
            }(e, t, i) : function(e, t) {
                if (d.isBuffer(t)) {
                    var i = 0 | h(t.length);
                    return 0 === (e = s(e, i)).length ? e : (t.copy(e, 0, 0, i), e)
                }
                if (t) {
                    if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || (r = t.length) != r ? s(e, 0) : l(e, t);
                    if ("Buffer" === t.type && o(t.data)) return l(e, t.data)
                }
                var r;
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
            }(e, t)
        }

        function f(e) {
            if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
            if (e < 0) throw new RangeError('"size" argument must not be negative')
        }

        function c(e, t) {
            if (f(t), e = s(e, t < 0 ? 0 : 0 | h(t)), !d.TYPED_ARRAY_SUPPORT)
                for (var i = 0; i < t; ++i) e[i] = 0;
            return e
        }

        function l(e, t) {
            var i = t.length < 0 ? 0 : 0 | h(t.length);
            e = s(e, i);
            for (var r = 0; r < i; r += 1) e[r] = 255 & t[r];
            return e
        }

        function h(e) {
            if (e >= a()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a().toString(16) + " bytes");
            return 0 | e
        }

        function p(e, t) {
            if (d.isBuffer(e)) return e.length;
            if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
            "string" != typeof e && (e = "" + e);
            var i = e.length;
            if (0 === i) return 0;
            for (var r = !1;;) switch (t) {
                case "ascii":
                case "latin1":
                case "binary":
                    return i;
                case "utf8":
                case "utf-8":
                case void 0:
                    return H(e).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * i;
                case "hex":
                    return i >>> 1;
                case "base64":
                    return F(e).length;
                default:
                    if (r) return H(e).length;
                    t = ("" + t).toLowerCase(), r = !0
            }
        }

        function _(e, t, i) {
            var r = e[t];
            e[t] = e[i], e[i] = r
        }

        function y(e, t, i, r, n) {
            if (0 === e.length) return -1;
            if ("string" == typeof i ? (r = i, i = 0) : i > 2147483647 ? i = 2147483647 : i < -2147483648 && (i = -2147483648), i = +i, isNaN(i) && (i = n ? 0 : e.length - 1), i < 0 && (i = e.length + i), i >= e.length) {
                if (n) return -1;
                i = e.length - 1
            } else if (i < 0) {
                if (!n) return -1;
                i = 0
            }
            if ("string" == typeof t && (t = d.from(t, r)), d.isBuffer(t)) return 0 === t.length ? -1 : b(e, t, i, r, n);
            if ("number" == typeof t) return t &= 255, d.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? n ? Uint8Array.prototype.indexOf.call(e, t, i) : Uint8Array.prototype.lastIndexOf.call(e, t, i) : b(e, [t], i, r, n);
            throw new TypeError("val must be string, number or Buffer")
        }

        function b(e, t, i, r, n) {
            var o, a = 1,
                s = e.length,
                d = t.length;
            if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                if (e.length < 2 || t.length < 2) return -1;
                a = 2, s /= 2, d /= 2, i /= 2
            }

            function u(e, t) {
                return 1 === a ? e[t] : e.readUInt16BE(t * a)
            }
            if (n) {
                var f = -1;
                for (o = i; o < s; o++)
                    if (u(e, o) === u(t, -1 === f ? 0 : o - f)) {
                        if (-1 === f && (f = o), o - f + 1 === d) return f * a
                    } else -1 !== f && (o -= o - f), f = -1
            } else
                for (i + d > s && (i = s - d), o = i; o >= 0; o--) {
                    for (var c = !0, l = 0; l < d; l++)
                        if (u(e, o + l) !== u(t, l)) {
                            c = !1;
                            break
                        }
                    if (c) return o
                }
            return -1
        }

        function g(e, t, i, r) {
            i = Number(i) || 0;
            var n = e.length - i;
            r ? (r = Number(r)) > n && (r = n) : r = n;
            var o = t.length;
            if (o % 2 != 0) throw new TypeError("Invalid hex string");
            r > o / 2 && (r = o / 2);
            for (var a = 0; a < r; ++a) {
                var s = parseInt(t.substr(2 * a, 2), 16);
                if (isNaN(s)) return a;
                e[i + a] = s
            }
            return a
        }

        function v(e, t, i, r) {
            return q(H(t, e.length - i), e, i, r)
        }

        function m(e, t, i, r) {
            return q(function(e) {
                for (var t = [], i = 0; i < e.length; ++i) t.push(255 & e.charCodeAt(i));
                return t
            }(t), e, i, r)
        }

        function A(e, t, i, r) {
            return m(e, t, i, r)
        }

        function w(e, t, i, r) {
            return q(F(t), e, i, r)
        }

        function E(e, t, i, r) {
            return q(function(e, t) {
                for (var i, r, n, o = [], a = 0; a < e.length && !((t -= 2) < 0); ++a) i = e.charCodeAt(a), r = i >> 8, n = i % 256, o.push(n), o.push(r);
                return o
            }(t, e.length - i), e, i, r)
        }

        function P(e, t, i) {
            return 0 === t && i === e.length ? r.fromByteArray(e) : r.fromByteArray(e.slice(t, i))
        }

        function S(e, t, i) {
            i = Math.min(e.length, i);
            for (var r = [], n = t; n < i;) {
                var o, a, s, d, u = e[n],
                    f = null,
                    c = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
                if (n + c <= i) switch (c) {
                    case 1:
                        u < 128 && (f = u);
                        break;
                    case 2:
                        128 == (192 & (o = e[n + 1])) && (d = (31 & u) << 6 | 63 & o) > 127 && (f = d);
                        break;
                    case 3:
                        o = e[n + 1], a = e[n + 2], 128 == (192 & o) && 128 == (192 & a) && (d = (15 & u) << 12 | (63 & o) << 6 | 63 & a) > 2047 && (d < 55296 || d > 57343) && (f = d);
                        break;
                    case 4:
                        o = e[n + 1], a = e[n + 2], s = e[n + 3], 128 == (192 & o) && 128 == (192 & a) && 128 == (192 & s) && (d = (15 & u) << 18 | (63 & o) << 12 | (63 & a) << 6 | 63 & s) > 65535 && d < 1114112 && (f = d)
                }
                null === f ? (f = 65533, c = 1) : f > 65535 && (f -= 65536, r.push(f >>> 10 & 1023 | 55296), f = 56320 | 1023 & f), r.push(f), n += c
            }
            return function(e) {
                var t = e.length;
                if (t <= I) return String.fromCharCode.apply(String, e);
                var i = "",
                    r = 0;
                for (; r < t;) i += String.fromCharCode.apply(String, e.slice(r, r += I));
                return i
            }(r)
        }
        t.Buffer = d, t.SlowBuffer = function(e) {
            +e != e && (e = 0);
            return d.alloc(+e)
        }, t.INSPECT_MAX_BYTES = 50, d.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function() {
            try {
                var e = new Uint8Array(1);
                return e.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function() {
                        return 42
                    }
                }, 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
            } catch (e) {
                return !1
            }
        }(), t.kMaxLength = a(), d.poolSize = 8192, d._augment = function(e) {
            return e.__proto__ = d.prototype, e
        }, d.from = function(e, t, i) {
            return u(null, e, t, i)
        }, d.TYPED_ARRAY_SUPPORT && (d.prototype.__proto__ = Uint8Array.prototype, d.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && d[Symbol.species] === d && Object.defineProperty(d, Symbol.species, {
            value: null,
            configurable: !0
        })), d.alloc = function(e, t, i) {
            return function(e, t, i, r) {
                return f(t), t <= 0 ? s(e, t) : void 0 !== i ? "string" == typeof r ? s(e, t).fill(i, r) : s(e, t).fill(i) : s(e, t)
            }(null, e, t, i)
        }, d.allocUnsafe = function(e) {
            return c(null, e)
        }, d.allocUnsafeSlow = function(e) {
            return c(null, e)
        }, d.isBuffer = function(e) {
            return !(null == e || !e._isBuffer)
        }, d.compare = function(e, t) {
            if (!d.isBuffer(e) || !d.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
            if (e === t) return 0;
            for (var i = e.length, r = t.length, n = 0, o = Math.min(i, r); n < o; ++n)
                if (e[n] !== t[n]) {
                    i = e[n], r = t[n];
                    break
                }
            return i < r ? -1 : r < i ? 1 : 0
        }, d.isEncoding = function(e) {
            switch (String(e).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return !0;
                default:
                    return !1
            }
        }, d.concat = function(e, t) {
            if (!o(e)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === e.length) return d.alloc(0);
            var i;
            if (void 0 === t)
                for (t = 0, i = 0; i < e.length; ++i) t += e[i].length;
            var r = d.allocUnsafe(t),
                n = 0;
            for (i = 0; i < e.length; ++i) {
                var a = e[i];
                if (!d.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
                a.copy(r, n), n += a.length
            }
            return r
        }, d.byteLength = p, d.prototype._isBuffer = !0, d.prototype.swap16 = function() {
            var e = this.length;
            if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var t = 0; t < e; t += 2) _(this, t, t + 1);
            return this
        }, d.prototype.swap32 = function() {
            var e = this.length;
            if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var t = 0; t < e; t += 4) _(this, t, t + 3), _(this, t + 1, t + 2);
            return this
        }, d.prototype.swap64 = function() {
            var e = this.length;
            if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var t = 0; t < e; t += 8) _(this, t, t + 7), _(this, t + 1, t + 6), _(this, t + 2, t + 5), _(this, t + 3, t + 4);
            return this
        }, d.prototype.toString = function() {
            var e = 0 | this.length;
            return 0 === e ? "" : 0 === arguments.length ? S(this, 0, e) : function(e, t, i) {
                var r = !1;
                if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
                if ((void 0 === i || i > this.length) && (i = this.length), i <= 0) return "";
                if ((i >>>= 0) <= (t >>>= 0)) return "";
                for (e || (e = "utf8");;) switch (e) {
                    case "hex":
                        return L(this, t, i);
                    case "utf8":
                    case "utf-8":
                        return S(this, t, i);
                    case "ascii":
                        return T(this, t, i);
                    case "latin1":
                    case "binary":
                        return M(this, t, i);
                    case "base64":
                        return P(this, t, i);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return k(this, t, i);
                    default:
                        if (r) throw new TypeError("Unknown encoding: " + e);
                        e = (e + "").toLowerCase(), r = !0
                }
            }.apply(this, arguments)
        }, d.prototype.equals = function(e) {
            if (!d.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
            return this === e || 0 === d.compare(this, e)
        }, d.prototype.inspect = function() {
            var e = "",
                i = t.INSPECT_MAX_BYTES;
            return this.length > 0 && (e = this.toString("hex", 0, i).match(/.{2}/g).join(" "), this.length > i && (e += " ... ")), "<Buffer " + e + ">"
        }, d.prototype.compare = function(e, t, i, r, n) {
            if (!d.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
            if (void 0 === t && (t = 0), void 0 === i && (i = e ? e.length : 0), void 0 === r && (r = 0), void 0 === n && (n = this.length), t < 0 || i > e.length || r < 0 || n > this.length) throw new RangeError("out of range index");
            if (r >= n && t >= i) return 0;
            if (r >= n) return -1;
            if (t >= i) return 1;
            if (t >>>= 0, i >>>= 0, r >>>= 0, n >>>= 0, this === e) return 0;
            for (var o = n - r, a = i - t, s = Math.min(o, a), u = this.slice(r, n), f = e.slice(t, i), c = 0; c < s; ++c)
                if (u[c] !== f[c]) {
                    o = u[c], a = f[c];
                    break
                }
            return o < a ? -1 : a < o ? 1 : 0
        }, d.prototype.includes = function(e, t, i) {
            return -1 !== this.indexOf(e, t, i)
        }, d.prototype.indexOf = function(e, t, i) {
            return y(this, e, t, i, !0)
        }, d.prototype.lastIndexOf = function(e, t, i) {
            return y(this, e, t, i, !1)
        }, d.prototype.write = function(e, t, i, r) {
            if (void 0 === t) r = "utf8", i = this.length, t = 0;
            else if (void 0 === i && "string" == typeof t) r = t, i = this.length, t = 0;
            else {
                if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                t |= 0, isFinite(i) ? (i |= 0, void 0 === r && (r = "utf8")) : (r = i, i = void 0)
            }
            var n = this.length - t;
            if ((void 0 === i || i > n) && (i = n), e.length > 0 && (i < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
            r || (r = "utf8");
            for (var o = !1;;) switch (r) {
                case "hex":
                    return g(this, e, t, i);
                case "utf8":
                case "utf-8":
                    return v(this, e, t, i);
                case "ascii":
                    return m(this, e, t, i);
                case "latin1":
                case "binary":
                    return A(this, e, t, i);
                case "base64":
                    return w(this, e, t, i);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return E(this, e, t, i);
                default:
                    if (o) throw new TypeError("Unknown encoding: " + r);
                    r = ("" + r).toLowerCase(), o = !0
            }
        }, d.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        };
        var I = 4096;

        function T(e, t, i) {
            var r = "";
            i = Math.min(e.length, i);
            for (var n = t; n < i; ++n) r += String.fromCharCode(127 & e[n]);
            return r
        }

        function M(e, t, i) {
            var r = "";
            i = Math.min(e.length, i);
            for (var n = t; n < i; ++n) r += String.fromCharCode(e[n]);
            return r
        }

        function L(e, t, i) {
            var r = e.length;
            (!t || t < 0) && (t = 0), (!i || i < 0 || i > r) && (i = r);
            for (var n = "", o = t; o < i; ++o) n += j(e[o]);
            return n
        }

        function k(e, t, i) {
            for (var r = e.slice(t, i), n = "", o = 0; o < r.length; o += 2) n += String.fromCharCode(r[o] + 256 * r[o + 1]);
            return n
        }

        function C(e, t, i) {
            if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
            if (e + t > i) throw new RangeError("Trying to access beyond buffer length")
        }

        function D(e, t, i, r, n, o) {
            if (!d.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (t > n || t < o) throw new RangeError('"value" argument is out of bounds');
            if (i + r > e.length) throw new RangeError("Index out of range")
        }

        function U(e, t, i, r) {
            t < 0 && (t = 65535 + t + 1);
            for (var n = 0, o = Math.min(e.length - i, 2); n < o; ++n) e[i + n] = (t & 255 << 8 * (r ? n : 1 - n)) >>> 8 * (r ? n : 1 - n)
        }

        function O(e, t, i, r) {
            t < 0 && (t = 4294967295 + t + 1);
            for (var n = 0, o = Math.min(e.length - i, 4); n < o; ++n) e[i + n] = t >>> 8 * (r ? n : 3 - n) & 255
        }

        function x(e, t, i, r, n, o) {
            if (i + r > e.length) throw new RangeError("Index out of range");
            if (i < 0) throw new RangeError("Index out of range")
        }

        function R(e, t, i, r, o) {
            return o || x(e, 0, i, 4), n.write(e, t, i, r, 23, 4), i + 4
        }

        function B(e, t, i, r, o) {
            return o || x(e, 0, i, 8), n.write(e, t, i, r, 52, 8), i + 8
        }
        d.prototype.slice = function(e, t) {
            var i, r = this.length;
            if (e = ~~e, t = void 0 === t ? r : ~~t, e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), t < e && (t = e), d.TYPED_ARRAY_SUPPORT)(i = this.subarray(e, t)).__proto__ = d.prototype;
            else {
                var n = t - e;
                i = new d(n, void 0);
                for (var o = 0; o < n; ++o) i[o] = this[o + e]
            }
            return i
        }, d.prototype.readUIntLE = function(e, t, i) {
            e |= 0, t |= 0, i || C(e, t, this.length);
            for (var r = this[e], n = 1, o = 0; ++o < t && (n *= 256);) r += this[e + o] * n;
            return r
        }, d.prototype.readUIntBE = function(e, t, i) {
            e |= 0, t |= 0, i || C(e, t, this.length);
            for (var r = this[e + --t], n = 1; t > 0 && (n *= 256);) r += this[e + --t] * n;
            return r
        }, d.prototype.readUInt8 = function(e, t) {
            return t || C(e, 1, this.length), this[e]
        }, d.prototype.readUInt16LE = function(e, t) {
            return t || C(e, 2, this.length), this[e] | this[e + 1] << 8
        }, d.prototype.readUInt16BE = function(e, t) {
            return t || C(e, 2, this.length), this[e] << 8 | this[e + 1]
        }, d.prototype.readUInt32LE = function(e, t) {
            return t || C(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
        }, d.prototype.readUInt32BE = function(e, t) {
            return t || C(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
        }, d.prototype.readIntLE = function(e, t, i) {
            e |= 0, t |= 0, i || C(e, t, this.length);
            for (var r = this[e], n = 1, o = 0; ++o < t && (n *= 256);) r += this[e + o] * n;
            return r >= (n *= 128) && (r -= Math.pow(2, 8 * t)), r
        }, d.prototype.readIntBE = function(e, t, i) {
            e |= 0, t |= 0, i || C(e, t, this.length);
            for (var r = t, n = 1, o = this[e + --r]; r > 0 && (n *= 256);) o += this[e + --r] * n;
            return o >= (n *= 128) && (o -= Math.pow(2, 8 * t)), o
        }, d.prototype.readInt8 = function(e, t) {
            return t || C(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
        }, d.prototype.readInt16LE = function(e, t) {
            t || C(e, 2, this.length);
            var i = this[e] | this[e + 1] << 8;
            return 32768 & i ? 4294901760 | i : i
        }, d.prototype.readInt16BE = function(e, t) {
            t || C(e, 2, this.length);
            var i = this[e + 1] | this[e] << 8;
            return 32768 & i ? 4294901760 | i : i
        }, d.prototype.readInt32LE = function(e, t) {
            return t || C(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
        }, d.prototype.readInt32BE = function(e, t) {
            return t || C(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
        }, d.prototype.readFloatLE = function(e, t) {
            return t || C(e, 4, this.length), n.read(this, e, !0, 23, 4)
        }, d.prototype.readFloatBE = function(e, t) {
            return t || C(e, 4, this.length), n.read(this, e, !1, 23, 4)
        }, d.prototype.readDoubleLE = function(e, t) {
            return t || C(e, 8, this.length), n.read(this, e, !0, 52, 8)
        }, d.prototype.readDoubleBE = function(e, t) {
            return t || C(e, 8, this.length), n.read(this, e, !1, 52, 8)
        }, d.prototype.writeUIntLE = function(e, t, i, r) {
            (e = +e, t |= 0, i |= 0, r) || D(this, e, t, i, Math.pow(2, 8 * i) - 1, 0);
            var n = 1,
                o = 0;
            for (this[t] = 255 & e; ++o < i && (n *= 256);) this[t + o] = e / n & 255;
            return t + i
        }, d.prototype.writeUIntBE = function(e, t, i, r) {
            (e = +e, t |= 0, i |= 0, r) || D(this, e, t, i, Math.pow(2, 8 * i) - 1, 0);
            var n = i - 1,
                o = 1;
            for (this[t + n] = 255 & e; --n >= 0 && (o *= 256);) this[t + n] = e / o & 255;
            return t + i
        }, d.prototype.writeUInt8 = function(e, t, i) {
            return e = +e, t |= 0, i || D(this, e, t, 1, 255, 0), d.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1
        }, d.prototype.writeUInt16LE = function(e, t, i) {
            return e = +e, t |= 0, i || D(this, e, t, 2, 65535, 0), d.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : U(this, e, t, !0), t + 2
        }, d.prototype.writeUInt16BE = function(e, t, i) {
            return e = +e, t |= 0, i || D(this, e, t, 2, 65535, 0), d.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : U(this, e, t, !1), t + 2
        }, d.prototype.writeUInt32LE = function(e, t, i) {
            return e = +e, t |= 0, i || D(this, e, t, 4, 4294967295, 0), d.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : O(this, e, t, !0), t + 4
        }, d.prototype.writeUInt32BE = function(e, t, i) {
            return e = +e, t |= 0, i || D(this, e, t, 4, 4294967295, 0), d.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : O(this, e, t, !1), t + 4
        }, d.prototype.writeIntLE = function(e, t, i, r) {
            if (e = +e, t |= 0, !r) {
                var n = Math.pow(2, 8 * i - 1);
                D(this, e, t, i, n - 1, -n)
            }
            var o = 0,
                a = 1,
                s = 0;
            for (this[t] = 255 & e; ++o < i && (a *= 256);) e < 0 && 0 === s && 0 !== this[t + o - 1] && (s = 1), this[t + o] = (e / a >> 0) - s & 255;
            return t + i
        }, d.prototype.writeIntBE = function(e, t, i, r) {
            if (e = +e, t |= 0, !r) {
                var n = Math.pow(2, 8 * i - 1);
                D(this, e, t, i, n - 1, -n)
            }
            var o = i - 1,
                a = 1,
                s = 0;
            for (this[t + o] = 255 & e; --o >= 0 && (a *= 256);) e < 0 && 0 === s && 0 !== this[t + o + 1] && (s = 1), this[t + o] = (e / a >> 0) - s & 255;
            return t + i
        }, d.prototype.writeInt8 = function(e, t, i) {
            return e = +e, t |= 0, i || D(this, e, t, 1, 127, -128), d.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
        }, d.prototype.writeInt16LE = function(e, t, i) {
            return e = +e, t |= 0, i || D(this, e, t, 2, 32767, -32768), d.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : U(this, e, t, !0), t + 2
        }, d.prototype.writeInt16BE = function(e, t, i) {
            return e = +e, t |= 0, i || D(this, e, t, 2, 32767, -32768), d.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : U(this, e, t, !1), t + 2
        }, d.prototype.writeInt32LE = function(e, t, i) {
            return e = +e, t |= 0, i || D(this, e, t, 4, 2147483647, -2147483648), d.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : O(this, e, t, !0), t + 4
        }, d.prototype.writeInt32BE = function(e, t, i) {
            return e = +e, t |= 0, i || D(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), d.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : O(this, e, t, !1), t + 4
        }, d.prototype.writeFloatLE = function(e, t, i) {
            return R(this, e, t, !0, i)
        }, d.prototype.writeFloatBE = function(e, t, i) {
            return R(this, e, t, !1, i)
        }, d.prototype.writeDoubleLE = function(e, t, i) {
            return B(this, e, t, !0, i)
        }, d.prototype.writeDoubleBE = function(e, t, i) {
            return B(this, e, t, !1, i)
        }, d.prototype.copy = function(e, t, i, r) {
            if (i || (i = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), r > 0 && r < i && (r = i), r === i) return 0;
            if (0 === e.length || 0 === this.length) return 0;
            if (t < 0) throw new RangeError("targetStart out of bounds");
            if (i < 0 || i >= this.length) throw new RangeError("sourceStart out of bounds");
            if (r < 0) throw new RangeError("sourceEnd out of bounds");
            r > this.length && (r = this.length), e.length - t < r - i && (r = e.length - t + i);
            var n, o = r - i;
            if (this === e && i < t && t < r)
                for (n = o - 1; n >= 0; --n) e[n + t] = this[n + i];
            else if (o < 1e3 || !d.TYPED_ARRAY_SUPPORT)
                for (n = 0; n < o; ++n) e[n + t] = this[n + i];
            else Uint8Array.prototype.set.call(e, this.subarray(i, i + o), t);
            return o
        }, d.prototype.fill = function(e, t, i, r) {
            if ("string" == typeof e) {
                if ("string" == typeof t ? (r = t, t = 0, i = this.length) : "string" == typeof i && (r = i, i = this.length), 1 === e.length) {
                    var n = e.charCodeAt(0);
                    n < 256 && (e = n)
                }
                if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                if ("string" == typeof r && !d.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
            } else "number" == typeof e && (e &= 255);
            if (t < 0 || this.length < t || this.length < i) throw new RangeError("Out of range index");
            if (i <= t) return this;
            var o;
            if (t >>>= 0, i = void 0 === i ? this.length : i >>> 0, e || (e = 0), "number" == typeof e)
                for (o = t; o < i; ++o) this[o] = e;
            else {
                var a = d.isBuffer(e) ? e : H(new d(e, r).toString()),
                    s = a.length;
                for (o = 0; o < i - t; ++o) this[o + t] = a[o % s]
            }
            return this
        };
        var N = /[^+\/0-9A-Za-z-_]/g;

        function j(e) {
            return e < 16 ? "0" + e.toString(16) : e.toString(16)
        }

        function H(e, t) {
            var i;
            t = t || 1 / 0;
            for (var r = e.length, n = null, o = [], a = 0; a < r; ++a) {
                if ((i = e.charCodeAt(a)) > 55295 && i < 57344) {
                    if (!n) {
                        if (i > 56319) {
                            (t -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        if (a + 1 === r) {
                            (t -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        n = i;
                        continue
                    }
                    if (i < 56320) {
                        (t -= 3) > -1 && o.push(239, 191, 189), n = i;
                        continue
                    }
                    i = 65536 + (n - 55296 << 10 | i - 56320)
                } else n && (t -= 3) > -1 && o.push(239, 191, 189);
                if (n = null, i < 128) {
                    if ((t -= 1) < 0) break;
                    o.push(i)
                } else if (i < 2048) {
                    if ((t -= 2) < 0) break;
                    o.push(i >> 6 | 192, 63 & i | 128)
                } else if (i < 65536) {
                    if ((t -= 3) < 0) break;
                    o.push(i >> 12 | 224, i >> 6 & 63 | 128, 63 & i | 128)
                } else {
                    if (!(i < 1114112)) throw new Error("Invalid code point");
                    if ((t -= 4) < 0) break;
                    o.push(i >> 18 | 240, i >> 12 & 63 | 128, i >> 6 & 63 | 128, 63 & i | 128)
                }
            }
            return o
        }

        function F(e) {
            return r.toByteArray(function(e) {
                if ((e = function(e) {
                        return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
                    }(e).replace(N, "")).length < 2) return "";
                for (; e.length % 4 != 0;) e += "=";
                return e
            }(e))
        }

        function q(e, t, i, r) {
            for (var n = 0; n < r && !(n + i >= t.length || n >= e.length); ++n) t[n + i] = e[n];
            return n
        }
    }).call(this, i(38))
}, function(e, t, i) {
    "use strict";
    t.sha1 = i(147), t.sha224 = i(68), t.sha256 = i(106), t.sha384 = i(31), t.sha512 = i(2)
}, function(e, t, i) {
    var r = t;
    r.utils = i(132), r.common = i(137), r.sha = i(12), r.ripemd = i(45), r.hmac = i(42), r.sha1 = r.sha.sha1, r.sha256 = r.sha.sha256, r.sha224 = r.sha.sha224, r.sha384 = r.sha.sha384, r.sha512 = r.sha.sha512, r.ripemd160 = r.ripemd.ripemd160
}, function(e, t, i) {
    "use strict";
    var r = i(119),
        n = r.define("Time", function() {
            this.choice({
                utcTime: this.utctime(),
                generalTime: this.gentime()
            })
        }),
        o = r.define("AttributeTypeValue", function() {
            this.seq().obj(this.key("type").objid(), this.key("value").any())
        }),
        a = r.define("AlgorithmIdentifier", function() {
            this.seq().obj(this.key("algorithm").objid(), this.key("parameters").optional())
        }),
        s = r.define("SubjectPublicKeyInfo", function() {
            this.seq().obj(this.key("algorithm").use(a), this.key("subjectPublicKey").bitstr())
        }),
        d = r.define("RelativeDistinguishedName", function() {
            this.setof(o)
        }),
        u = r.define("RDNSequence", function() {
            this.seqof(d)
        }),
        f = r.define("Name", function() {
            this.choice({
                rdnSequence: this.use(u)
            })
        }),
        c = r.define("Validity", function() {
            this.seq().obj(this.key("notBefore").use(n), this.key("notAfter").use(n))
        }),
        l = r.define("Extension", function() {
            this.seq().obj(this.key("extnID").objid(), this.key("critical").bool().def(!1), this.key("extnValue").octstr())
        }),
        h = r.define("TBSCertificate", function() {
            this.seq().obj(this.key("version").explicit(0).int(), this.key("serialNumber").int(), this.key("signature").use(a), this.key("issuer").use(f), this.key("validity").use(c), this.key("subject").use(f), this.key("subjectPublicKeyInfo").use(s), this.key("issuerUniqueID").implicit(1).bitstr().optional(), this.key("subjectUniqueID").implicit(2).bitstr().optional(), this.key("extensions").explicit(3).seqof(l).optional())
        }),
        p = r.define("X509Certificate", function() {
            this.seq().obj(this.key("tbsCertificate").use(h), this.key("signatureAlgorithm").use(a), this.key("signatureValue").bitstr())
        });
    e.exports = p
}, function(e, t, i) {
    var r = i(41),
        n = i(44),
        o = i(96),
        a = i(98),
        s = i(62),
        d = i(133).Buffer,
        u = d.alloc(128),
        f = {
            md5: 16,
            sha1: 20,
            sha224: 28,
            sha256: 32,
            sha384: 48,
            sha512: 64,
            rmd160: 20,
            ripemd160: 20
        };

    function c(e, t, i) {
        var a = function(e) {
                return "rmd160" === e || "ripemd160" === e ? n : "md5" === e ? r : function(t) {
                    return o(e).update(t).digest()
                }
            }(e),
            s = "sha512" === e || "sha384" === e ? 128 : 64;
        t.length > s ? t = a(t) : t.length < s && (t = d.concat([t, u], s));
        for (var c = d.allocUnsafe(s + f[e]), l = d.allocUnsafe(s + f[e]), h = 0; h < s; h++) c[h] = 54 ^ t[h], l[h] = 92 ^ t[h];
        var p = d.allocUnsafe(s + i + 4);
        c.copy(p, 0, 0, s), this.ipad1 = p, this.ipad2 = c, this.opad = l, this.alg = e, this.blocksize = s, this.hash = a, this.size = f[e]
    }
    c.prototype.run = function(e, t) {
        return e.copy(t, this.blocksize), this.hash(t).copy(this.opad, this.blocksize), this.hash(this.opad)
    }, e.exports = function(e, t, i, r, n) {
        a(e, t, i, r), d.isBuffer(e) || (e = d.from(e, s)), d.isBuffer(t) || (t = d.from(t, s));
        var o = new c(n = n || "sha1", e, t.length),
            u = d.allocUnsafe(r),
            l = d.allocUnsafe(t.length + 4);
        t.copy(l, 0, 0, t.length);
        for (var h = 0, p = f[n], _ = Math.ceil(r / p), y = 1; y <= _; y++) {
            l.writeUInt32BE(y, t.length);
            for (var b = o.run(l, o.ipad1), g = b, v = 1; v < i; v++) {
                g = o.run(g, o.ipad2);
                for (var m = 0; m < p; m++) b[m] ^= g[m]
            }
            b.copy(u, h), h += p
        }
        return u
    }
}, function(e, t, i) {
    (function(e, t) {
        ! function(e, i) {
            "use strict";
            if (!e.setImmediate) {
                var r, n, o, a, s, d = 1,
                    u = {},
                    f = !1,
                    c = e.document,
                    l = Object.getPrototypeOf && Object.getPrototypeOf(e);
                l = l && l.setTimeout ? l : e, "[object process]" === {}.toString.call(e.process) ? r = function(e) {
                    t.nextTick(function() {
                        p(e)
                    })
                } : ! function() {
                    if (e.postMessage && !e.importScripts) {
                        var t = !0,
                            i = e.onmessage;
                        return e.onmessage = function() {
                            t = !1
                        }, e.postMessage("", "*"), e.onmessage = i, t
                    }
                }() ? e.MessageChannel ? ((o = new MessageChannel).port1.onmessage = function(e) {
                    p(e.data)
                }, r = function(e) {
                    o.port2.postMessage(e)
                }) : c && "onreadystatechange" in c.createElement("script") ? (n = c.documentElement, r = function(e) {
                    var t = c.createElement("script");
                    t.onreadystatechange = function() {
                        p(e), t.onreadystatechange = null, n.removeChild(t), t = null
                    }, n.appendChild(t)
                }) : r = function(e) {
                    setTimeout(p, 0, e)
                } : (a = "setImmediate$" + Math.random() + "$", s = function(t) {
                    t.source === e && "string" == typeof t.data && 0 === t.data.indexOf(a) && p(+t.data.slice(a.length))
                }, e.addEventListener ? e.addEventListener("message", s, !1) : e.attachEvent("onmessage", s), r = function(t) {
                    e.postMessage(a + t, "*")
                }), l.setImmediate = function(e) {
                    "function" != typeof e && (e = new Function("" + e));
                    for (var t = new Array(arguments.length - 1), i = 0; i < t.length; i++) t[i] = arguments[i + 1];
                    var n = {
                        callback: e,
                        args: t
                    };
                    return u[d] = n, r(d), d++
                }, l.clearImmediate = h
            }

            function h(e) {
                delete u[e]
            }

            function p(e) {
                if (f) setTimeout(p, 0, e);
                else {
                    var t = u[e];
                    if (t) {
                        f = !0;
                        try {
                            ! function(e) {
                                var t = e.callback,
                                    r = e.args;
                                switch (r.length) {
                                    case 0:
                                        t();
                                        break;
                                    case 1:
                                        t(r[0]);
                                        break;
                                    case 2:
                                        t(r[0], r[1]);
                                        break;
                                    case 3:
                                        t(r[0], r[1], r[2]);
                                        break;
                                    default:
                                        t.apply(i, r)
                                }
                            }(t)
                        } finally {
                            h(e), f = !1
                        }
                    }
                }
            }
        }("undefined" == typeof self ? void 0 === e ? this : e : self)
    }).call(this, i(38), i(128))
}, function(e, t, i) {
    var r = i(39),
        n = i(35),
        o = i(121),
        a = i(133).Buffer,
        s = new Array(64);

    function d() {
        this.init(), this._w = s, o.call(this, 64, 56)
    }
    r(d, n), d.prototype.init = function() {
        return this._a = 3238371032, this._b = 914150663, this._c = 812702999, this._d = 4144912697, this._e = 4290775857, this._f = 1750603025, this._g = 1694076839, this._h = 3204075428, this
    }, d.prototype._hash = function() {
        var e = a.allocUnsafe(28);
        return e.writeInt32BE(this._a, 0), e.writeInt32BE(this._b, 4), e.writeInt32BE(this._c, 8), e.writeInt32BE(this._d, 12), e.writeInt32BE(this._e, 16), e.writeInt32BE(this._f, 20), e.writeInt32BE(this._g, 24), e
    }, e.exports = d
}, function(e, t, i) {
    var r = t;
    r.der = i(60), r.pem = i(55)
}, function(e, t) {
    e.exports = function(e) {
        for (var t, i = e.length; i--;) {
            if (255 !== (t = e.readUInt8(i))) {
                t++, e.writeUInt8(t, i);
                break
            }
            e.writeUInt8(0, i)
        }
    }
}, function(e, t) {}, function(e, t, i) {
    (function(t) {
        var r = i(10),
            n = i(53),
            o = i(39),
            a = i(65),
            s = i(29),
            d = i(5);

        function u(e) {
            n.Writable.call(this);
            var t = d[e];
            if (!t) throw new Error("Unknown message digest");
            this._hashType = t.hash, this._hash = r(t.hash), this._tag = t.id, this._signType = t.sign
        }

        function f(e) {
            n.Writable.call(this);
            var t = d[e];
            if (!t) throw new Error("Unknown message digest");
            this._hash = r(t.hash), this._tag = t.id, this._signType = t.sign
        }

        function c(e) {
            return new u(e)
        }

        function l(e) {
            return new f(e)
        }
        Object.keys(d).forEach(function(e) {
            d[e].id = new t(d[e].id, "hex"), d[e.toLowerCase()] = d[e]
        }), o(u, n.Writable), u.prototype._write = function(e, t, i) {
            this._hash.update(e), i()
        }, u.prototype.update = function(e, i) {
            return "string" == typeof e && (e = new t(e, i)), this._hash.update(e), this
        }, u.prototype.sign = function(e, t) {
            this.end();
            var i = this._hash.digest(),
                r = a(i, e, this._hashType, this._signType, this._tag);
            return t ? r.toString(t) : r
        }, o(f, n.Writable), f.prototype._write = function(e, t, i) {
            this._hash.update(e), i()
        }, f.prototype.update = function(e, i) {
            return "string" == typeof e && (e = new t(e, i)), this._hash.update(e), this
        }, f.prototype.verify = function(e, i, r) {
            "string" == typeof i && (i = new t(i, r)), this.end();
            var n = this._hash.digest();
            return s(i, n, e, this._signType, this._tag)
        }, e.exports = {
            Sign: c,
            Verify: l,
            createSign: c,
            createVerify: l
        }
    }).call(this, i(11).Buffer)
}, function(e, t, i) {
    "use strict";
    var r = i(143),
        n = i(39),
        o = i(80),
        a = o.Cipher,
        s = o.DES;

    function d(e) {
        a.call(this, e);
        var t = new function(e, t) {
            r.equal(t.length, 24, "Invalid key length");
            var i = t.slice(0, 8),
                n = t.slice(8, 16),
                o = t.slice(16, 24);
            this.ciphers = "encrypt" === e ? [s.create({
                type: "encrypt",
                key: i
            }), s.create({
                type: "decrypt",
                key: n
            }), s.create({
                type: "encrypt",
                key: o
            })] : [s.create({
                type: "decrypt",
                key: o
            }), s.create({
                type: "encrypt",
                key: n
            }), s.create({
                type: "decrypt",
                key: i
            })]
        }(this.type, this.options.key);
        this._edeState = t
    }
    n(d, a), e.exports = d, d.create = function(e) {
        return new d(e)
    }, d.prototype._update = function(e, t, i, r) {
        var n = this._edeState;
        n.ciphers[0]._update(e, t, i, r), n.ciphers[1]._update(i, r, i, r), n.ciphers[2]._update(i, r, i, r)
    }, d.prototype._pad = s.prototype._pad, d.prototype._unpad = s.prototype._unpad
}, function(e, t, i) {
    "use strict";
    var r = i(105),
        n = i(61).utils,
        o = n.getNAF,
        a = n.getJSF,
        s = n.assert;

    function d(e, t) {
        this.type = e, this.p = new r(t.p, 16), this.red = t.prime ? r.red(t.prime) : r.mont(this.p), this.zero = new r(0).toRed(this.red), this.one = new r(1).toRed(this.red), this.two = new r(2).toRed(this.red), this.n = t.n && new r(t.n, 16), this.g = t.g && this.pointFromJSON(t.g, t.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4);
        var i = this.n && this.p.div(this.n);
        !i || i.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red))
    }

    function u(e, t) {
        this.curve = e, this.type = t, this.precomputed = null
    }
    e.exports = d, d.prototype.point = function() {
        throw new Error("Not implemented")
    }, d.prototype.validate = function() {
        throw new Error("Not implemented")
    }, d.prototype._fixedNafMul = function(e, t) {
        s(e.precomputed);
        var i = e._getDoubles(),
            r = o(t, 1),
            n = (1 << i.step + 1) - (i.step % 2 == 0 ? 2 : 1);
        n /= 3;
        for (var a = [], d = 0; d < r.length; d += i.step) {
            var u = 0;
            for (t = d + i.step - 1; t >= d; t--) u = (u << 1) + r[t];
            a.push(u)
        }
        for (var f = this.jpoint(null, null, null), c = this.jpoint(null, null, null), l = n; l > 0; l--) {
            for (d = 0; d < a.length; d++) {
                (u = a[d]) === l ? c = c.mixedAdd(i.points[d]) : u === -l && (c = c.mixedAdd(i.points[d].neg()))
            }
            f = f.add(c)
        }
        return f.toP()
    }, d.prototype._wnafMul = function(e, t) {
        var i = 4,
            r = e._getNAFPoints(i);
        i = r.wnd;
        for (var n = r.points, a = o(t, i), d = this.jpoint(null, null, null), u = a.length - 1; u >= 0; u--) {
            for (t = 0; u >= 0 && 0 === a[u]; u--) t++;
            if (u >= 0 && t++, d = d.dblp(t), u < 0) break;
            var f = a[u];
            s(0 !== f), d = "affine" === e.type ? f > 0 ? d.mixedAdd(n[f - 1 >> 1]) : d.mixedAdd(n[-f - 1 >> 1].neg()) : f > 0 ? d.add(n[f - 1 >> 1]) : d.add(n[-f - 1 >> 1].neg())
        }
        return "affine" === e.type ? d.toP() : d
    }, d.prototype._wnafMulAdd = function(e, t, i, r, n) {
        for (var s = this._wnafT1, d = this._wnafT2, u = this._wnafT3, f = 0, c = 0; c < r; c++) {
            var l = (S = t[c])._getNAFPoints(e);
            s[c] = l.wnd, d[c] = l.points
        }
        for (c = r - 1; c >= 1; c -= 2) {
            var h = c - 1,
                p = c;
            if (1 === s[h] && 1 === s[p]) {
                var _ = [t[h], null, null, t[p]];
                0 === t[h].y.cmp(t[p].y) ? (_[1] = t[h].add(t[p]), _[2] = t[h].toJ().mixedAdd(t[p].neg())) : 0 === t[h].y.cmp(t[p].y.redNeg()) ? (_[1] = t[h].toJ().mixedAdd(t[p]), _[2] = t[h].add(t[p].neg())) : (_[1] = t[h].toJ().mixedAdd(t[p]), _[2] = t[h].toJ().mixedAdd(t[p].neg()));
                var y = [-3, -1, -5, -7, 0, 7, 5, 1, 3],
                    b = a(i[h], i[p]);
                f = Math.max(b[0].length, f), u[h] = new Array(f), u[p] = new Array(f);
                for (var g = 0; g < f; g++) {
                    var v = 0 | b[0][g],
                        m = 0 | b[1][g];
                    u[h][g] = y[3 * (v + 1) + (m + 1)], u[p][g] = 0, d[h] = _
                }
            } else u[h] = o(i[h], s[h]), u[p] = o(i[p], s[p]), f = Math.max(u[h].length, f), f = Math.max(u[p].length, f)
        }
        var A = this.jpoint(null, null, null),
            w = this._wnafT4;
        for (c = f; c >= 0; c--) {
            for (var E = 0; c >= 0;) {
                var P = !0;
                for (g = 0; g < r; g++) w[g] = 0 | u[g][c], 0 !== w[g] && (P = !1);
                if (!P) break;
                E++, c--
            }
            if (c >= 0 && E++, A = A.dblp(E), c < 0) break;
            for (g = 0; g < r; g++) {
                var S, I = w[g];
                0 !== I && (I > 0 ? S = d[g][I - 1 >> 1] : I < 0 && (S = d[g][-I - 1 >> 1].neg()), A = "affine" === S.type ? A.mixedAdd(S) : A.add(S))
            }
        }
        for (c = 0; c < r; c++) d[c] = null;
        return n ? A : A.toP()
    }, d.BasePoint = u, u.prototype.eq = function() {
        throw new Error("Not implemented")
    }, u.prototype.validate = function() {
        return this.curve.validate(this)
    }, d.prototype.decodePoint = function(e, t) {
        e = n.toArray(e, t);
        var i = this.p.byteLength();
        if ((4 === e[0] || 6 === e[0] || 7 === e[0]) && e.length - 1 == 2 * i) return 6 === e[0] ? s(e[e.length - 1] % 2 == 0) : 7 === e[0] && s(e[e.length - 1] % 2 == 1), this.point(e.slice(1, 1 + i), e.slice(1 + i, 1 + 2 * i));
        if ((2 === e[0] || 3 === e[0]) && e.length - 1 === i) return this.pointFromX(e.slice(1, 1 + i), 3 === e[0]);
        throw new Error("Unknown point format")
    }, u.prototype.encodeCompressed = function(e) {
        return this.encode(e, !0)
    }, u.prototype._encode = function(e) {
        var t = this.curve.p.byteLength(),
            i = this.getX().toArray("be", t);
        return e ? [this.getY().isEven() ? 2 : 3].concat(i) : [4].concat(i, this.getY().toArray("be", t))
    }, u.prototype.encode = function(e, t) {
        return n.encode(this._encode(t), e)
    }, u.prototype.precompute = function(e) {
        if (this.precomputed) return this;
        var t = {
            doubles: null,
            naf: null,
            beta: null
        };
        return t.naf = this._getNAFPoints(8), t.doubles = this._getDoubles(4, e), t.beta = this._getBeta(), this.precomputed = t, this
    }, u.prototype._hasDoubles = function(e) {
        if (!this.precomputed) return !1;
        var t = this.precomputed.doubles;
        return !!t && t.points.length >= Math.ceil((e.bitLength() + 1) / t.step)
    }, u.prototype._getDoubles = function(e, t) {
        if (this.precomputed && this.precomputed.doubles) return this.precomputed.doubles;
        for (var i = [this], r = this, n = 0; n < t; n += e) {
            for (var o = 0; o < e; o++) r = r.dbl();
            i.push(r)
        }
        return {
            step: e,
            points: i
        }
    }, u.prototype._getNAFPoints = function(e) {
        if (this.precomputed && this.precomputed.naf) return this.precomputed.naf;
        for (var t = [this], i = (1 << e) - 1, r = 1 === i ? null : this.dbl(), n = 1; n < i; n++) t[n] = t[n - 1].add(r);
        return {
            wnd: e,
            points: t
        }
    }, u.prototype._getBeta = function() {
        return null
    }, u.prototype.dblp = function(e) {
        for (var t = this, i = 0; i < e; i++) t = t.dbl();
        return t
    }
}, function(e, t, i) {
    "use strict";
    (function(t, r) {
        var n = i(133).Buffer,
            o = t.crypto || t.msCrypto;
        o && o.getRandomValues ? e.exports = function(e, i) {
            if (e > 65536) throw new Error("requested too many random bytes");
            var a = new t.Uint8Array(e);
            e > 0 && o.getRandomValues(a);
            var s = n.from(a.buffer);
            if ("function" == typeof i) return r.nextTick(function() {
                i(null, s)
            });
            return s
        } : e.exports = function() {
            throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11")
        }
    }).call(this, i(38), i(128))
}, function(e, t, i) {
    var r = i(39),
        n = i(121),
        o = i(133).Buffer,
        a = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591],
        s = new Array(160);

    function d() {
        this.init(), this._w = s, n.call(this, 128, 112)
    }

    function u(e, t, i) {
        return i ^ e & (t ^ i)
    }

    function f(e, t, i) {
        return e & t | i & (e | t)
    }

    function c(e, t) {
        return (e >>> 28 | t << 4) ^ (t >>> 2 | e << 30) ^ (t >>> 7 | e << 25)
    }

    function l(e, t) {
        return (e >>> 14 | t << 18) ^ (e >>> 18 | t << 14) ^ (t >>> 9 | e << 23)
    }

    function h(e, t) {
        return (e >>> 1 | t << 31) ^ (e >>> 8 | t << 24) ^ e >>> 7
    }

    function p(e, t) {
        return (e >>> 1 | t << 31) ^ (e >>> 8 | t << 24) ^ (e >>> 7 | t << 25)
    }

    function _(e, t) {
        return (e >>> 19 | t << 13) ^ (t >>> 29 | e << 3) ^ e >>> 6
    }

    function y(e, t) {
        return (e >>> 19 | t << 13) ^ (t >>> 29 | e << 3) ^ (e >>> 6 | t << 26)
    }

    function b(e, t) {
        return e >>> 0 < t >>> 0 ? 1 : 0
    }
    r(d, n), d.prototype.init = function() {
        return this._ah = 1779033703, this._bh = 3144134277, this._ch = 1013904242, this._dh = 2773480762, this._eh = 1359893119, this._fh = 2600822924, this._gh = 528734635, this._hh = 1541459225, this._al = 4089235720, this._bl = 2227873595, this._cl = 4271175723, this._dl = 1595750129, this._el = 2917565137, this._fl = 725511199, this._gl = 4215389547, this._hl = 327033209, this
    }, d.prototype._update = function(e) {
        for (var t = this._w, i = 0 | this._ah, r = 0 | this._bh, n = 0 | this._ch, o = 0 | this._dh, s = 0 | this._eh, d = 0 | this._fh, g = 0 | this._gh, v = 0 | this._hh, m = 0 | this._al, A = 0 | this._bl, w = 0 | this._cl, E = 0 | this._dl, P = 0 | this._el, S = 0 | this._fl, I = 0 | this._gl, T = 0 | this._hl, M = 0; M < 32; M += 2) t[M] = e.readInt32BE(4 * M), t[M + 1] = e.readInt32BE(4 * M + 4);
        for (; M < 160; M += 2) {
            var L = t[M - 30],
                k = t[M - 30 + 1],
                C = h(L, k),
                D = p(k, L),
                U = _(L = t[M - 4], k = t[M - 4 + 1]),
                O = y(k, L),
                x = t[M - 14],
                R = t[M - 14 + 1],
                B = t[M - 32],
                N = t[M - 32 + 1],
                j = D + R | 0,
                H = C + x + b(j, D) | 0;
            H = (H = H + U + b(j = j + O | 0, O) | 0) + B + b(j = j + N | 0, N) | 0, t[M] = H, t[M + 1] = j
        }
        for (var F = 0; F < 160; F += 2) {
            H = t[F], j = t[F + 1];
            var q = f(i, r, n),
                V = f(m, A, w),
                W = c(i, m),
                z = c(m, i),
                Y = l(s, P),
                K = l(P, s),
                X = a[F],
                G = a[F + 1],
                J = u(s, d, g),
                Z = u(P, S, I),
                Q = T + K | 0,
                $ = v + Y + b(Q, T) | 0;
            $ = ($ = ($ = $ + J + b(Q = Q + Z | 0, Z) | 0) + X + b(Q = Q + G | 0, G) | 0) + H + b(Q = Q + j | 0, j) | 0;
            var ee = z + V | 0,
                te = W + q + b(ee, z) | 0;
            v = g, T = I, g = d, I = S, d = s, S = P, s = o + $ + b(P = E + Q | 0, E) | 0, o = n, E = w, n = r, w = A, r = i, A = m, i = $ + te + b(m = Q + ee | 0, Q) | 0
        }
        this._al = this._al + m | 0, this._bl = this._bl + A | 0, this._cl = this._cl + w | 0, this._dl = this._dl + E | 0, this._el = this._el + P | 0, this._fl = this._fl + S | 0, this._gl = this._gl + I | 0, this._hl = this._hl + T | 0, this._ah = this._ah + i + b(this._al, m) | 0, this._bh = this._bh + r + b(this._bl, A) | 0, this._ch = this._ch + n + b(this._cl, w) | 0, this._dh = this._dh + o + b(this._dl, E) | 0, this._eh = this._eh + s + b(this._el, P) | 0, this._fh = this._fh + d + b(this._fl, S) | 0, this._gh = this._gh + g + b(this._gl, I) | 0, this._hh = this._hh + v + b(this._hl, T) | 0
    }, d.prototype._hash = function() {
        var e = o.allocUnsafe(64);

        function t(t, i, r) {
            e.writeInt32BE(t, r), e.writeInt32BE(i, r + 4)
        }
        return t(this._ah, this._al, 0), t(this._bh, this._bl, 8), t(this._ch, this._cl, 16), t(this._dh, this._dl, 24), t(this._eh, this._el, 32), t(this._fh, this._fl, 40), t(this._gh, this._gl, 48), t(this._hh, this._hl, 56), e
    }, e.exports = d
}, function(e, t, i) {
    var r = t;
    r.Reporter = i(155).Reporter, r.DecoderBuffer = i(161).DecoderBuffer, r.EncoderBuffer = i(161).EncoderBuffer, r.Node = i(116)
}, function(e, t, i) {
    var r = i(82),
        n = i(133).Buffer,
        o = i(90),
        a = i(48),
        s = i(49),
        d = i(114),
        u = i(111);

    function f(e, t, i) {
        s.call(this), this._cache = new c, this._last = void 0, this._cipher = new d.AES(t), this._prev = n.from(i), this._mode = e, this._autopadding = !0
    }

    function c() {
        this.cache = n.allocUnsafe(0)
    }

    function l(e, t, i) {
        var s = o[e.toLowerCase()];
        if (!s) throw new TypeError("invalid suite type");
        if ("string" == typeof i && (i = n.from(i)), "GCM" !== s.mode && i.length !== s.iv) throw new TypeError("invalid iv length " + i.length);
        if ("string" == typeof t && (t = n.from(t)), t.length !== s.key / 8) throw new TypeError("invalid key length " + t.length);
        return "stream" === s.type ? new a(s.module, t, i, !0) : "auth" === s.type ? new r(s.module, t, i, !0) : new f(s.module, t, i)
    }
    i(39)(f, s), f.prototype._update = function(e) {
        var t, i;
        this._cache.add(e);
        for (var r = []; t = this._cache.get(this._autopadding);) i = this._mode.decrypt(this, t), r.push(i);
        return n.concat(r)
    }, f.prototype._final = function() {
        var e = this._cache.flush();
        if (this._autopadding) return function(e) {
            var t = e[15];
            if (t < 1 || t > 16) throw new Error("unable to decrypt data");
            var i = -1;
            for (; ++i < t;)
                if (e[i + (16 - t)] !== t) throw new Error("unable to decrypt data");
            if (16 === t) return;
            return e.slice(0, 16 - t)
        }(this._mode.decrypt(this, e));
        if (e) throw new Error("data not multiple of block length")
    }, f.prototype.setAutoPadding = function(e) {
        return this._autopadding = !!e, this
    }, c.prototype.add = function(e) {
        this.cache = n.concat([this.cache, e])
    }, c.prototype.get = function(e) {
        var t;
        if (e) {
            if (this.cache.length > 16) return t = this.cache.slice(0, 16), this.cache = this.cache.slice(16), t
        } else if (this.cache.length >= 16) return t = this.cache.slice(0, 16), this.cache = this.cache.slice(16), t;
        return null
    }, c.prototype.flush = function() {
        if (this.cache.length) return this.cache
    }, t.createDecipher = function(e, t) {
        var i = o[e.toLowerCase()];
        if (!i) throw new TypeError("invalid suite type");
        var r = u(t, !1, i.key, i.iv);
        return l(e, r.key, r.iv)
    }, t.createDecipheriv = l
}, function(e, t, i) {
    (function(t) {
        var r = i(84),
            n = i(103),
            o = i(148),
            a = i(0),
            s = i(130);

        function d(e) {
            var i;
            "object" != typeof e || t.isBuffer(e) || (i = e.passphrase, e = e.key), "string" == typeof e && (e = new t(e));
            var d, u, f = o(e, i),
                c = f.tag,
                l = f.data;
            switch (c) {
                case "CERTIFICATE":
                    u = r.certificate.decode(l, "der").tbsCertificate.subjectPublicKeyInfo;
                case "PUBLIC KEY":
                    switch (u || (u = r.PublicKey.decode(l, "der")), d = u.algorithm.algorithm.join(".")) {
                        case "1.2.840.113549.1.1.1":
                            return r.RSAPublicKey.decode(u.subjectPublicKey.data, "der");
                        case "1.2.840.10045.2.1":
                            return u.subjectPrivateKey = u.subjectPublicKey, {
                                type: "ec",
                                data: u
                            };
                        case "1.2.840.10040.4.1":
                            return u.algorithm.params.pub_key = r.DSAparam.decode(u.subjectPublicKey.data, "der"), {
                                type: "dsa",
                                data: u.algorithm.params
                            };
                        default:
                            throw new Error("unknown key id " + d)
                    }
                    throw new Error("unknown key type " + c);
                case "ENCRYPTED PRIVATE KEY":
                    l = function(e, i) {
                        var r = e.algorithm.decrypt.kde.kdeparams.salt,
                            o = parseInt(e.algorithm.decrypt.kde.kdeparams.iters.toString(), 10),
                            d = n[e.algorithm.decrypt.cipher.algo.join(".")],
                            u = e.algorithm.decrypt.cipher.iv,
                            f = e.subjectPrivateKey,
                            c = parseInt(d.split("-")[1], 10) / 8,
                            l = s.pbkdf2Sync(i, r, o, c),
                            h = a.createDecipheriv(d, l, u),
                            p = [];
                        return p.push(h.update(f)), p.push(h.final()), t.concat(p)
                    }(l = r.EncryptedPrivateKey.decode(l, "der"), i);
                case "PRIVATE KEY":
                    switch (d = (u = r.PrivateKey.decode(l, "der")).algorithm.algorithm.join(".")) {
                        case "1.2.840.113549.1.1.1":
                            return r.RSAPrivateKey.decode(u.subjectPrivateKey, "der");
                        case "1.2.840.10045.2.1":
                            return {
                                curve: u.algorithm.curve,
                                privateKey: r.ECPrivateKey.decode(u.subjectPrivateKey, "der").privateKey
                            };
                        case "1.2.840.10040.4.1":
                            return u.algorithm.params.priv_key = r.DSAparam.decode(u.subjectPrivateKey, "der"), {
                                type: "dsa",
                                params: u.algorithm.params
                            };
                        default:
                            throw new Error("unknown key id " + d)
                    }
                    throw new Error("unknown key type " + c);
                case "RSA PUBLIC KEY":
                    return r.RSAPublicKey.decode(l, "der");
                case "RSA PRIVATE KEY":
                    return r.RSAPrivateKey.decode(l, "der");
                case "DSA PRIVATE KEY":
                    return {
                        type: "dsa",
                        params: r.DSAPrivateKey.decode(l, "der")
                    };
                case "EC PRIVATE KEY":
                    return {
                        curve: (l = r.ECPrivateKey.decode(l, "der")).parameters.value,
                        privateKey: l.privateKey
                    };
                default:
                    throw new Error("unknown key type " + c)
            }
        }
        e.exports = d, d.signature = r.signature
    }).call(this, i(11).Buffer)
}, function(e, t, i) {
    (function(t) {
        var r = i(105),
            n = i(61).ec,
            o = i(28),
            a = i(158);

        function s(e, t) {
            if (e.cmpn(0) <= 0) throw new Error("invalid sig");
            if (e.cmp(t) >= t) throw new Error("invalid sig")
        }
        e.exports = function(e, i, d, u, f) {
            var c = o(d);
            if ("ec" === c.type) {
                if ("ecdsa" !== u && "ecdsa/rsa" !== u) throw new Error("wrong public key type");
                return function(e, t, i) {
                    var r = a[i.data.algorithm.curve.join(".")];
                    if (!r) throw new Error("unknown curve " + i.data.algorithm.curve.join("."));
                    var o = new n(r),
                        s = i.data.subjectPrivateKey.data;
                    return o.verify(t, e, s)
                }(e, i, c)
            }
            if ("dsa" === c.type) {
                if ("dsa" !== u) throw new Error("wrong public key type");
                return function(e, t, i) {
                    var n = i.data.p,
                        a = i.data.q,
                        d = i.data.g,
                        u = i.data.pub_key,
                        f = o.signature.decode(e, "der"),
                        c = f.s,
                        l = f.r;
                    s(c, a), s(l, a);
                    var h = r.mont(n),
                        p = c.invm(a);
                    return 0 === d.toRed(h).redPow(new r(t).mul(p).mod(a)).fromRed().mul(u.toRed(h).redPow(l.mul(p).mod(a)).fromRed()).mod(n).mod(a).cmp(l)
                }(e, i, c)
            }
            if ("rsa" !== u && "ecdsa/rsa" !== u) throw new Error("wrong public key type");
            i = t.concat([f, i]);
            for (var l = c.modulus.byteLength(), h = [1], p = 0; i.length + h.length + 2 < l;) h.push(255), p++;
            h.push(0);
            for (var _ = -1; ++_ < i.length;) h.push(i[_]);
            h = new t(h);
            var y = r.mont(c.modulus);
            e = (e = new r(e).toRed(y)).redPow(new r(c.publicExponent)), e = new t(e.fromRed().toArray());
            var b = p < 8 ? 1 : 0;
            for (l = Math.min(e.length, h.length), e.length !== h.length && (b = 1), _ = -1; ++_ < l;) b |= e[_] ^ h[_];
            return 0 === b
        }
    }).call(this, i(11).Buffer)
}, function(e, t, i) {
    "use strict";
    var r = i(105),
        n = i(61).utils,
        o = n.assert,
        a = n.cachedProperty,
        s = n.parseBytes;

    function d(e, t) {
        this.eddsa = e, "object" != typeof t && (t = s(t)), Array.isArray(t) && (t = {
            R: t.slice(0, e.encodingLength),
            S: t.slice(e.encodingLength)
        }), o(t.R && t.S, "Signature without R or S"), e.isPoint(t.R) && (this._R = t.R), t.S instanceof r && (this._S = t.S), this._Rencoded = Array.isArray(t.R) ? t.R : t.Rencoded, this._Sencoded = Array.isArray(t.S) ? t.S : t.Sencoded
    }
    a(d, "S", function() {
        return this.eddsa.decodeInt(this.Sencoded())
    }), a(d, "R", function() {
        return this.eddsa.decodePoint(this.Rencoded())
    }), a(d, "Rencoded", function() {
        return this.eddsa.encodePoint(this.R())
    }), a(d, "Sencoded", function() {
        return this.eddsa.encodeInt(this.S())
    }), d.prototype.toBytes = function() {
        return this.Rencoded().concat(this.Sencoded())
    }, d.prototype.toHex = function() {
        return n.encode(this.toBytes(), "hex").toUpperCase()
    }, e.exports = d
}, function(e, t, i) {
    "use strict";
    var r = i(132),
        n = i(2);

    function o() {
        if (!(this instanceof o)) return new o;
        n.call(this), this.h = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428]
    }
    r.inherits(o, n), e.exports = o, o.blockSize = 1024, o.outSize = 384, o.hmacStrength = 192, o.padLength = 128, o.prototype._digest = function(e) {
        return "hex" === e ? r.toHex32(this.h.slice(0, 12), "big") : r.split32(this.h.slice(0, 12), "big")
    }
}, function(e, t, i) {
    (function(t) {
        var r = i(105),
            n = new(i(134)),
            o = new r(24),
            a = new r(11),
            s = new r(10),
            d = new r(3),
            u = new r(7),
            f = i(6),
            c = i(24);

        function l(e, i) {
            return i = i || "utf8", t.isBuffer(e) || (e = new t(e, i)), this._pub = new r(e), this
        }

        function h(e, i) {
            return i = i || "utf8", t.isBuffer(e) || (e = new t(e, i)), this._priv = new r(e), this
        }
        e.exports = _;
        var p = {};

        function _(e, t, i) {
            this.setGenerator(t), this.__prime = new r(e), this._prime = r.mont(this.__prime), this._primeLen = e.length, this._pub = void 0, this._priv = void 0, this._primeCode = void 0, i ? (this.setPublicKey = l, this.setPrivateKey = h) : this._primeCode = 8
        }

        function y(e, i) {
            var r = new t(e.toArray());
            return i ? r.toString(i) : r
        }
        Object.defineProperty(_.prototype, "verifyError", {
            enumerable: !0,
            get: function() {
                return "number" != typeof this._primeCode && (this._primeCode = function(e, t) {
                    var i = t.toString("hex"),
                        r = [i, e.toString(16)].join("_");
                    if (r in p) return p[r];
                    var c, l = 0;
                    if (e.isEven() || !f.simpleSieve || !f.fermatTest(e) || !n.test(e)) return l += 1, l += "02" === i || "05" === i ? 8 : 4, p[r] = l, l;
                    switch (n.test(e.shrn(1)) || (l += 2), i) {
                        case "02":
                            e.mod(o).cmp(a) && (l += 8);
                            break;
                        case "05":
                            (c = e.mod(s)).cmp(d) && c.cmp(u) && (l += 8);
                            break;
                        default:
                            l += 4
                    }
                    return p[r] = l, l
                }(this.__prime, this.__gen)), this._primeCode
            }
        }), _.prototype.generateKeys = function() {
            return this._priv || (this._priv = new r(c(this._primeLen))), this._pub = this._gen.toRed(this._prime).redPow(this._priv).fromRed(), this.getPublicKey()
        }, _.prototype.computeSecret = function(e) {
            var i = (e = (e = new r(e)).toRed(this._prime)).redPow(this._priv).fromRed(),
                n = new t(i.toArray()),
                o = this.getPrime();
            if (n.length < o.length) {
                var a = new t(o.length - n.length);
                a.fill(0), n = t.concat([a, n])
            }
            return n
        }, _.prototype.getPublicKey = function(e) {
            return y(this._pub, e)
        }, _.prototype.getPrivateKey = function(e) {
            return y(this._priv, e)
        }, _.prototype.getPrime = function(e) {
            return y(this.__prime, e)
        }, _.prototype.getGenerator = function(e) {
            return y(this._gen, e)
        }, _.prototype.setGenerator = function(e, i) {
            return i = i || "utf8", t.isBuffer(e) || (e = new t(e, i)), this.__gen = e, this._gen = new r(e), this
        }
    }).call(this, i(11).Buffer)
}, function(e, t, i) {
    var r = i(39),
        n = i(11).Buffer,
        o = i(92);

    function a(e) {
        o.call(this, e), this.enc = "pem"
    }
    r(a, o), e.exports = a, a.prototype.decode = function(e, t) {
        for (var i = e.toString().split(/[\r\n]+/g), r = t.label.toUpperCase(), a = /^-----(BEGIN|END) ([^-]+)-----$/, s = -1, d = -1, u = 0; u < i.length; u++) {
            var f = i[u].match(a);
            if (null !== f && f[2] === r) {
                if (-1 !== s) {
                    if ("END" !== f[1]) break;
                    d = u;
                    break
                }
                if ("BEGIN" !== f[1]) break;
                s = u
            }
        }
        if (-1 === s || -1 === d) throw new Error("PEM section not found for: " + r);
        var c = i.slice(s + 1, d).join("");
        c.replace(/[^a-z0-9\+\/=]+/gi, "");
        var l = new n(c, "base64");
        return o.prototype.decode.call(this, l, t)
    }
}, function(e, t, i) {
    (function(t) {
        function i(e) {
            try {
                if (!t.localStorage) return !1
            } catch (e) {
                return !1
            }
            var i = t.localStorage[e];
            return null != i && "true" === String(i).toLowerCase()
        }
        e.exports = function(e, t) {
            if (i("noDeprecation")) return e;
            var r = !1;
            return function() {
                if (!r) {
                    if (i("throwDeprecation")) throw new Error(t);
                    i("traceDeprecation") ? console.trace(t) : console.warn(t), r = !0
                }
                return e.apply(this, arguments)
            }
        }
    }).call(this, i(38))
}, function(e, t, i) {
    var r = i(39),
        n = i(121),
        o = i(133).Buffer,
        a = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
        s = new Array(64);

    function d() {
        this.init(), this._w = s, n.call(this, 64, 56)
    }

    function u(e, t, i) {
        return i ^ e & (t ^ i)
    }

    function f(e, t, i) {
        return e & t | i & (e | t)
    }

    function c(e) {
        return (e >>> 2 | e << 30) ^ (e >>> 13 | e << 19) ^ (e >>> 22 | e << 10)
    }

    function l(e) {
        return (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7)
    }

    function h(e) {
        return (e >>> 7 | e << 25) ^ (e >>> 18 | e << 14) ^ e >>> 3
    }
    r(d, n), d.prototype.init = function() {
        return this._a = 1779033703, this._b = 3144134277, this._c = 1013904242, this._d = 2773480762, this._e = 1359893119, this._f = 2600822924, this._g = 528734635, this._h = 1541459225, this
    }, d.prototype._update = function(e) {
        for (var t, i = this._w, r = 0 | this._a, n = 0 | this._b, o = 0 | this._c, s = 0 | this._d, d = 0 | this._e, p = 0 | this._f, _ = 0 | this._g, y = 0 | this._h, b = 0; b < 16; ++b) i[b] = e.readInt32BE(4 * b);
        for (; b < 64; ++b) i[b] = 0 | (((t = i[b - 2]) >>> 17 | t << 15) ^ (t >>> 19 | t << 13) ^ t >>> 10) + i[b - 7] + h(i[b - 15]) + i[b - 16];
        for (var g = 0; g < 64; ++g) {
            var v = y + l(d) + u(d, p, _) + a[g] + i[g] | 0,
                m = c(r) + f(r, n, o) | 0;
            y = _, _ = p, p = d, d = s + v | 0, s = o, o = n, n = r, r = v + m | 0
        }
        this._a = r + this._a | 0, this._b = n + this._b | 0, this._c = o + this._c | 0, this._d = s + this._d | 0, this._e = d + this._e | 0, this._f = p + this._f | 0, this._g = _ + this._g | 0, this._h = y + this._h | 0
    }, d.prototype._hash = function() {
        var e = o.allocUnsafe(32);
        return e.writeInt32BE(this._a, 0), e.writeInt32BE(this._b, 4), e.writeInt32BE(this._c, 8), e.writeInt32BE(this._d, 12), e.writeInt32BE(this._e, 16), e.writeInt32BE(this._f, 20), e.writeInt32BE(this._g, 24), e.writeInt32BE(this._h, 28), e
    }, e.exports = d
}, function(e, t, i) {
    "use strict";
    var r = i(105),
        n = i(94),
        o = i(61),
        a = o.utils.assert,
        s = i(79),
        d = i(149);

    function u(e) {
        if (!(this instanceof u)) return new u(e);
        "string" == typeof e && (a(o.curves.hasOwnProperty(e), "Unknown curve " + e), e = o.curves[e]), e instanceof o.curves.PresetCurve && (e = {
            curve: e
        }), this.curve = e.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = e.curve.g, this.g.precompute(e.curve.n.bitLength() + 1), this.hash = e.hash || e.curve.hash
    }
    e.exports = u, u.prototype.keyPair = function(e) {
        return new s(this, e)
    }, u.prototype.keyFromPrivate = function(e, t) {
        return s.fromPrivate(this, e, t)
    }, u.prototype.keyFromPublic = function(e, t) {
        return s.fromPublic(this, e, t)
    }, u.prototype.genKeyPair = function(e) {
        e || (e = {});
        for (var t = new n({
                hash: this.hash,
                pers: e.pers,
                persEnc: e.persEnc || "utf8",
                entropy: e.entropy || o.rand(this.hash.hmacStrength),
                entropyEnc: e.entropy && e.entropyEnc || "utf8",
                nonce: this.n.toArray()
            }), i = this.n.byteLength(), a = this.n.sub(new r(2));;) {
            var s = new r(t.generate(i));
            if (!(s.cmp(a) > 0)) return s.iaddn(1), this.keyFromPrivate(s)
        }
    }, u.prototype._truncateToN = function(e, t) {
        var i = 8 * e.byteLength() - this.n.bitLength();
        return i > 0 && (e = e.ushrn(i)), !t && e.cmp(this.n) >= 0 ? e.sub(this.n) : e
    }, u.prototype.sign = function(e, t, i, o) {
        "object" == typeof i && (o = i, i = null), o || (o = {}), t = this.keyFromPrivate(t, i), e = this._truncateToN(new r(e, 16));
        for (var a = this.n.byteLength(), s = t.getPrivate().toArray("be", a), u = e.toArray("be", a), f = new n({
                hash: this.hash,
                entropy: s,
                nonce: u,
                pers: o.pers,
                persEnc: o.persEnc || "utf8"
            }), c = this.n.sub(new r(1)), l = 0;; l++) {
            var h = o.k ? o.k(l) : new r(f.generate(this.n.byteLength()));
            if (!((h = this._truncateToN(h, !0)).cmpn(1) <= 0 || h.cmp(c) >= 0)) {
                var p = this.g.mul(h);
                if (!p.isInfinity()) {
                    var _ = p.getX(),
                        y = _.umod(this.n);
                    if (0 !== y.cmpn(0)) {
                        var b = h.invm(this.n).mul(y.mul(t.getPrivate()).iadd(e));
                        if (0 !== (b = b.umod(this.n)).cmpn(0)) {
                            var g = (p.getY().isOdd() ? 1 : 0) | (0 !== _.cmp(y) ? 2 : 0);
                            return o.canonical && b.cmp(this.nh) > 0 && (b = this.n.sub(b), g ^= 1), new d({
                                r: y,
                                s: b,
                                recoveryParam: g
                            })
                        }
                    }
                }
            }
        }
    }, u.prototype.verify = function(e, t, i, n) {
        e = this._truncateToN(new r(e, 16)), i = this.keyFromPublic(i, n);
        var o = (t = new d(t, "hex")).r,
            a = t.s;
        if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0) return !1;
        if (a.cmpn(1) < 0 || a.cmp(this.n) >= 0) return !1;
        var s, u = a.invm(this.n),
            f = u.mul(e).umod(this.n),
            c = u.mul(o).umod(this.n);
        return this.curve._maxwellTrick ? !(s = this.g.jmulAdd(f, i.getPublic(), c)).isInfinity() && s.eqXToP(o) : !(s = this.g.mulAdd(f, i.getPublic(), c)).isInfinity() && 0 === s.getX().umod(this.n).cmp(o)
    }, u.prototype.recoverPubKey = function(e, t, i, n) {
        a((3 & i) === i, "The recovery param is more than two bits"), t = new d(t, n);
        var o = this.n,
            s = new r(e),
            u = t.r,
            f = t.s,
            c = 1 & i,
            l = i >> 1;
        if (u.cmp(this.curve.p.umod(this.curve.n)) >= 0 && l) throw new Error("Unable to find sencond key candinate");
        u = l ? this.curve.pointFromX(u.add(this.curve.n), c) : this.curve.pointFromX(u, c);
        var h = t.r.invm(o),
            p = o.sub(s).mul(h).umod(o),
            _ = f.mul(h).umod(o);
        return this.g.mulAdd(p, u, _)
    }, u.prototype.getKeyRecoveryParam = function(e, t, i, r) {
        if (null !== (t = new d(t, r)).recoveryParam) return t.recoveryParam;
        for (var n = 0; n < 4; n++) {
            var o;
            try {
                o = this.recoverPubKey(e, t, n)
            } catch (e) {
                continue
            }
            if (o.eq(i)) return n
        }
        throw new Error("Unable to find valid recovery factor")
    }
}, function(e, t, i) {
    "use strict";

    function r() {
        window._logTimer = (new Date).getTime()
    }

    function n(e, t) {
        window.Raven && (t && t.length > 350 && (t = t.slice(0, 150) + "..." + t.slice(-150)), e.message += ": " + t, Raven.captureException(e))
    }

    function o(e) {
        try {
            window.debuglogClient && debuglogClient(e);
            var t = "[" + ((new Date).getTime() - window._logTimer) / 1e3 + "] ";
            if (window.console && console.log) {
                var i = Array.prototype.slice.call(arguments);
                i.unshift(t), browser.msie || browser.mobile ? console.log(i.join(" ")) : console.log.apply(console, i)
            }
        } catch (e) {}
    }

    function a(e) {
        if (!e) return !1;
        var t = e.tagName,
            i = e.id,
            r = e.className,
            n = (t || "").toLowerCase();
        return r && (n += "." + e.className.replace(/\s+/g, ".")), i && !/^__vk/.test(i) && (n += "#" + e.id), n || (e.toString() || "[NULL]")
    }
    i.r(t), i.d(t, "initDebugTools", function() {
        return r
    }), i.d(t, "logEvalError", function() {
        return n
    }), i.d(t, "debugLog", function() {
        return o
    }), i.d(t, "debugEl", function() {
        return a
    })
}, function(e, t) {
    var i;
    i = function() {
        return this
    }();
    try {
        i = i || Function("return this")() || (0, eval)("this")
    } catch (e) {
        "object" == typeof window && (i = window)
    }
    e.exports = i
}, function(e, t) {
    "function" == typeof Object.create ? e.exports = function(e, t) {
        e.super_ = t, e.prototype = Object.create(t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        })
    } : e.exports = function(e, t) {
        e.super_ = t;
        var i = function() {};
        i.prototype = t.prototype, e.prototype = new i, e.prototype.constructor = e
    }
}, function(e, t, i) {
    var r = t;
    r.der = i(92), r.pem = i(33)
}, function(e, t, i) {
    var r = i(70);
    e.exports = function(e) {
        return (new r).update(e).digest()
    }
}, function(e, t, i) {
    "use strict";
    var r = i(132),
        n = i(143);

    function o(e, t, i) {
        if (!(this instanceof o)) return new o(e, t, i);
        this.Hash = e, this.blockSize = e.blockSize / 8, this.outSize = e.outSize / 8, this.inner = null, this.outer = null, this._init(r.toArray(t, i))
    }
    e.exports = o, o.prototype._init = function(e) {
        e.length > this.blockSize && (e = (new this.Hash).update(e).digest()), n(e.length <= this.blockSize);
        for (var t = e.length; t < this.blockSize; t++) e.push(0);
        for (t = 0; t < e.length; t++) e[t] ^= 54;
        for (this.inner = (new this.Hash).update(e), t = 0; t < e.length; t++) e[t] ^= 106;
        this.outer = (new this.Hash).update(e)
    }, o.prototype.update = function(e, t) {
        return this.inner.update(e, t), this
    }, o.prototype.digest = function(e) {
        return this.outer.update(this.inner.digest()), this.outer.digest(e)
    }
}, function(e, t, i) {
    e.exports = i(5)
}, function(e, t, i) {
    "use strict";
    var r = i(11).Buffer,
        n = i(39),
        o = i(57),
        a = new Array(16),
        s = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13],
        d = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11],
        u = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6],
        f = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11],
        c = [0, 1518500249, 1859775393, 2400959708, 2840853838],
        l = [1352829926, 1548603684, 1836072691, 2053994217, 0];

    function h() {
        o.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520
    }

    function p(e, t) {
        return e << t | e >>> 32 - t
    }

    function _(e, t, i, r, n, o, a, s) {
        return p(e + (t ^ i ^ r) + o + a | 0, s) + n | 0
    }

    function y(e, t, i, r, n, o, a, s) {
        return p(e + (t & i | ~t & r) + o + a | 0, s) + n | 0
    }

    function b(e, t, i, r, n, o, a, s) {
        return p(e + ((t | ~i) ^ r) + o + a | 0, s) + n | 0
    }

    function g(e, t, i, r, n, o, a, s) {
        return p(e + (t & r | i & ~r) + o + a | 0, s) + n | 0
    }

    function v(e, t, i, r, n, o, a, s) {
        return p(e + (t ^ (i | ~r)) + o + a | 0, s) + n | 0
    }
    n(h, o), h.prototype._update = function() {
        for (var e = a, t = 0; t < 16; ++t) e[t] = this._block.readInt32LE(4 * t);
        for (var i = 0 | this._a, r = 0 | this._b, n = 0 | this._c, o = 0 | this._d, h = 0 | this._e, m = 0 | this._a, A = 0 | this._b, w = 0 | this._c, E = 0 | this._d, P = 0 | this._e, S = 0; S < 80; S += 1) {
            var I, T;
            S < 16 ? (I = _(i, r, n, o, h, e[s[S]], c[0], u[S]), T = v(m, A, w, E, P, e[d[S]], l[0], f[S])) : S < 32 ? (I = y(i, r, n, o, h, e[s[S]], c[1], u[S]), T = g(m, A, w, E, P, e[d[S]], l[1], f[S])) : S < 48 ? (I = b(i, r, n, o, h, e[s[S]], c[2], u[S]), T = b(m, A, w, E, P, e[d[S]], l[2], f[S])) : S < 64 ? (I = g(i, r, n, o, h, e[s[S]], c[3], u[S]), T = y(m, A, w, E, P, e[d[S]], l[3], f[S])) : (I = v(i, r, n, o, h, e[s[S]], c[4], u[S]), T = _(m, A, w, E, P, e[d[S]], l[4], f[S])), i = h, h = o, o = p(n, 10), n = r, r = I, m = P, P = E, E = p(w, 10), w = A, A = T
        }
        var M = this._b + n + E | 0;
        this._b = this._c + o + P | 0, this._c = this._d + h + m | 0, this._d = this._e + i + A | 0, this._e = this._a + r + w | 0, this._a = M
    }, h.prototype._digest = function() {
        this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
        var e = r.alloc ? r.alloc(20) : new r(20);
        return e.writeInt32LE(this._a, 0), e.writeInt32LE(this._b, 4), e.writeInt32LE(this._c, 8), e.writeInt32LE(this._d, 12), e.writeInt32LE(this._e, 16), e
    }, e.exports = h
}, function(e, t, i) {
    "use strict";
    var r = i(132),
        n = i(137),
        o = r.rotl32,
        a = r.sum32,
        s = r.sum32_3,
        d = r.sum32_4,
        u = n.BlockHash;

    function f() {
        if (!(this instanceof f)) return new f;
        u.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little"
    }

    function c(e, t, i, r) {
        return e <= 15 ? t ^ i ^ r : e <= 31 ? t & i | ~t & r : e <= 47 ? (t | ~i) ^ r : e <= 63 ? t & r | i & ~r : t ^ (i | ~r)
    }

    function l(e) {
        return e <= 15 ? 0 : e <= 31 ? 1518500249 : e <= 47 ? 1859775393 : e <= 63 ? 2400959708 : 2840853838
    }

    function h(e) {
        return e <= 15 ? 1352829926 : e <= 31 ? 1548603684 : e <= 47 ? 1836072691 : e <= 63 ? 2053994217 : 0
    }
    r.inherits(f, u), t.ripemd160 = f, f.blockSize = 512, f.outSize = 160, f.hmacStrength = 192, f.padLength = 64, f.prototype._update = function(e, t) {
        for (var i = this.h[0], r = this.h[1], n = this.h[2], u = this.h[3], f = this.h[4], g = i, v = r, m = n, A = u, w = f, E = 0; E < 80; E++) {
            var P = a(o(d(i, c(E, r, n, u), e[p[E] + t], l(E)), y[E]), f);
            i = f, f = u, u = o(n, 10), n = r, r = P, P = a(o(d(g, c(79 - E, v, m, A), e[_[E] + t], h(E)), b[E]), w), g = w, w = A, A = o(m, 10), m = v, v = P
        }
        P = s(this.h[1], n, A), this.h[1] = s(this.h[2], u, w), this.h[2] = s(this.h[3], f, g), this.h[3] = s(this.h[4], i, v), this.h[4] = s(this.h[0], r, m), this.h[0] = P
    }, f.prototype._digest = function(e) {
        return "hex" === e ? r.toHex32(this.h, "little") : r.split32(this.h, "little")
    };
    var p = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13],
        _ = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11],
        y = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6],
        b = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]
}, function(e, t) {}, function(e, t) {
    e.exports = function(e) {
        return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
            enumerable: !0,
            get: function() {
                return e.l
            }
        }), Object.defineProperty(e, "id", {
            enumerable: !0,
            get: function() {
                return e.i
            }
        }), e.webpackPolyfill = 1), e
    }
}, function(e, t, i) {
    var r = i(114),
        n = i(133).Buffer,
        o = i(49);

    function a(e, t, i, a) {
        o.call(this), this._cipher = new r.AES(t), this._prev = n.from(i), this._cache = n.allocUnsafe(0), this._secCache = n.allocUnsafe(0), this._decrypt = a, this._mode = e
    }
    i(39)(a, o), a.prototype._update = function(e) {
        return this._mode.encrypt(this, e, this._decrypt)
    }, a.prototype._final = function() {
        this._cipher.scrub()
    }, e.exports = a
}, function(e, t, i) {
    var r = i(133).Buffer,
        n = i(53).Transform,
        o = i(74).StringDecoder;

    function a(e) {
        n.call(this), this.hashMode = "string" == typeof e, this.hashMode ? this[e] = this._finalOrDigest : this.final = this._finalOrDigest, this._final && (this.__final = this._final, this._final = null), this._decoder = null, this._encoding = null
    }
    i(39)(a, n), a.prototype.update = function(e, t, i) {
        "string" == typeof e && (e = r.from(e, t));
        var n = this._update(e);
        return this.hashMode ? this : (i && (n = this._toString(n, i)), n)
    }, a.prototype.setAutoPadding = function() {}, a.prototype.getAuthTag = function() {
        throw new Error("trying to get auth tag in unsupported state")
    }, a.prototype.setAuthTag = function() {
        throw new Error("trying to set auth tag in unsupported state")
    }, a.prototype.setAAD = function() {
        throw new Error("trying to set aad in unsupported state")
    }, a.prototype._transform = function(e, t, i) {
        var r;
        try {
            this.hashMode ? this._update(e) : this.push(this._update(e))
        } catch (e) {
            r = e
        } finally {
            i(r)
        }
    }, a.prototype._flush = function(e) {
        var t;
        try {
            this.push(this.__final())
        } catch (e) {
            t = e
        }
        e(t)
    }, a.prototype._finalOrDigest = function(e) {
        var t = this.__final() || r.alloc(0);
        return e && (t = this._toString(t, e, !0)), t
    }, a.prototype._toString = function(e, t, i) {
        if (this._decoder || (this._decoder = new o(t), this._encoding = t), this._encoding !== t) throw new Error("can't switch encodings");
        var r = this._decoder.write(e);
        return i && (r += this._decoder.end()), r
    }, e.exports = a
}, function(e, t, i) {
    (function(t) {
        var r = i(105);
        e.exports = function(e, i) {
            return new t(e.toRed(r.mont(i.modulus)).redPow(new r(i.publicExponent)).fromRed().toArray())
        }
    }).call(this, i(11).Buffer)
}, function(e, t, i) {
    var r = i(39),
        n = i(25),
        o = i(121),
        a = i(133).Buffer,
        s = new Array(160);

    function d() {
        this.init(), this._w = s, o.call(this, 128, 112)
    }
    r(d, n), d.prototype.init = function() {
        return this._ah = 3418070365, this._bh = 1654270250, this._ch = 2438529370, this._dh = 355462360, this._eh = 1731405415, this._fh = 2394180231, this._gh = 3675008525, this._hh = 1203062813, this._al = 3238371032, this._bl = 914150663, this._cl = 812702999, this._dl = 4144912697, this._el = 4290775857, this._fl = 1750603025, this._gl = 1694076839, this._hl = 3204075428, this
    }, d.prototype._hash = function() {
        var e = a.allocUnsafe(48);

        function t(t, i, r) {
            e.writeInt32BE(t, r), e.writeInt32BE(i, r + 4)
        }
        return t(this._ah, this._al, 0), t(this._bh, this._bl, 8), t(this._ch, this._cl, 16), t(this._dh, this._dl, 24), t(this._eh, this._el, 32), t(this._fh, this._fl, 40), e
    }, e.exports = d
}, function(e, t, i) {
    "use strict";
    t.randomBytes = t.rng = t.pseudoRandomBytes = t.prng = i(24), t.createHash = t.Hash = i(10), t.createHmac = t.Hmac = i(67);
    var r = i(43),
        n = Object.keys(r),
        o = ["sha1", "sha224", "sha256", "sha384", "sha512", "md5", "rmd160"].concat(n);
    t.getHashes = function() {
        return o
    };
    var a = i(130);
    t.pbkdf2 = a.pbkdf2, t.pbkdf2Sync = a.pbkdf2Sync;
    var s = i(97);
    t.Cipher = s.Cipher, t.createCipher = s.createCipher, t.Cipheriv = s.Cipheriv, t.createCipheriv = s.createCipheriv, t.Decipher = s.Decipher, t.createDecipher = s.createDecipher, t.Decipheriv = s.Decipheriv, t.createDecipheriv = s.createDecipheriv, t.getCiphers = s.getCiphers, t.listCiphers = s.listCiphers;
    var d = i(73);
    t.DiffieHellmanGroup = d.DiffieHellmanGroup, t.createDiffieHellmanGroup = d.createDiffieHellmanGroup, t.getDiffieHellman = d.getDiffieHellman, t.createDiffieHellman = d.createDiffieHellman, t.DiffieHellman = d.DiffieHellman;
    var u = i(21);
    t.createSign = u.createSign, t.Sign = u.Sign, t.createVerify = u.createVerify, t.Verify = u.Verify, t.createECDH = i(86);
    var f = i(109);
    t.publicEncrypt = f.publicEncrypt, t.privateEncrypt = f.privateEncrypt, t.publicDecrypt = f.publicDecrypt, t.privateDecrypt = f.privateDecrypt;
    var c = i(131);
    t.randomFill = c.randomFill, t.randomFillSync = c.randomFillSync, t.createCredentials = function() {
        throw new Error(["sorry, createCredentials is not implemented yet", "we accept pull requests", "https://github.com/crypto-browserify/crypto-browserify"].join("\n"))
    }, t.constants = {
        DH_CHECK_P_NOT_SAFE_PRIME: 2,
        DH_CHECK_P_NOT_PRIME: 1,
        DH_UNABLE_TO_CHECK_GENERATOR: 4,
        DH_NOT_SUITABLE_GENERATOR: 8,
        NPN_ENABLED: 1,
        ALPN_ENABLED: 1,
        RSA_PKCS1_PADDING: 1,
        RSA_SSLV23_PADDING: 2,
        RSA_NO_PADDING: 3,
        RSA_PKCS1_OAEP_PADDING: 4,
        RSA_X931_PADDING: 5,
        RSA_PKCS1_PSS_PADDING: 6,
        POINT_CONVERSION_COMPRESSED: 2,
        POINT_CONVERSION_UNCOMPRESSED: 4,
        POINT_CONVERSION_HYBRID: 6
    }
}, function(e, t, i) {
    e.exports = n;
    var r = i(85).EventEmitter;

    function n() {
        r.call(this)
    }
    i(39)(n, r), n.Readable = i(102), n.Writable = i(7), n.Duplex = i(145), n.Transform = i(126), n.PassThrough = i(83), n.Stream = n, n.prototype.pipe = function(e, t) {
        var i = this;

        function n(t) {
            e.writable && !1 === e.write(t) && i.pause && i.pause()
        }

        function o() {
            i.readable && i.resume && i.resume()
        }
        i.on("data", n), e.on("drain", o), e._isStdio || t && !1 === t.end || (i.on("end", s), i.on("close", d));
        var a = !1;

        function s() {
            a || (a = !0, e.end())
        }

        function d() {
            a || (a = !0, "function" == typeof e.destroy && e.destroy())
        }

        function u(e) {
            if (f(), 0 === r.listenerCount(this, "error")) throw e
        }

        function f() {
            i.removeListener("data", n), e.removeListener("drain", o), i.removeListener("end", s), i.removeListener("close", d), i.removeListener("error", u), e.removeListener("error", u), i.removeListener("end", f), i.removeListener("close", f), e.removeListener("close", f)
        }
        return i.on("error", u), e.on("error", u), i.on("end", f), i.on("close", f), e.on("close", f), e.emit("pipe", i), e
    }
}, function(e, t, i) {
    (function(t) {
        var r = i(28),
            n = i(24),
            o = i(10),
            a = i(118),
            s = i(156),
            d = i(105),
            u = i(50),
            f = i(117);
        e.exports = function(e, i, c) {
            var l;
            l = e.padding ? e.padding : c ? 1 : 4;
            var h, p = r(e);
            if (4 === l) h = function(e, i) {
                var r = e.modulus.byteLength(),
                    u = i.length,
                    f = o("sha1").update(new t("")).digest(),
                    c = f.length,
                    l = 2 * c;
                if (u > r - l - 2) throw new Error("message too long");
                var h = new t(r - u - l - 2);
                h.fill(0);
                var p = r - c - 1,
                    _ = n(c),
                    y = s(t.concat([f, h, new t([1]), i], p), a(_, p)),
                    b = s(_, a(y, c));
                return new d(t.concat([new t([0]), b, y], r))
            }(p, i);
            else if (1 === l) h = function(e, i, r) {
                var o, a = i.length,
                    s = e.modulus.byteLength();
                if (a > s - 11) throw new Error("message too long");
                r ? (o = new t(s - a - 3)).fill(255) : o = function(e, i) {
                    var r, o = new t(e),
                        a = 0,
                        s = n(2 * e),
                        d = 0;
                    for (; a < e;) d === s.length && (s = n(2 * e), d = 0), (r = s[d++]) && (o[a++] = r);
                    return o
                }(s - a - 3);
                return new d(t.concat([new t([0, r ? 1 : 2]), o, new t([0]), i], s))
            }(p, i, c);
            else {
                if (3 !== l) throw new Error("unknown padding");
                if ((h = new d(i)).cmp(p.modulus) >= 0) throw new Error("data too long for modulus")
            }
            return c ? f(h, p) : u(h, p)
        }
    }).call(this, i(11).Buffer)
}, function(e, t, i) {
    var r = i(39),
        n = i(60);

    function o(e) {
        n.call(this, e), this.enc = "pem"
    }
    r(o, n), e.exports = o, o.prototype.encode = function(e, t) {
        for (var i = n.prototype.encode.call(this, e).toString("base64"), r = ["-----BEGIN " + t.label + "-----"], o = 0; o < i.length; o += 64) r.push(i.slice(o, o + 64));
        return r.push("-----END " + t.label + "-----"), r.join("\n")
    }
}, function(e, t, i) {
    var r = i(90),
        n = i(82),
        o = i(133).Buffer,
        a = i(48),
        s = i(49),
        d = i(114),
        u = i(111);

    function f(e, t, i) {
        s.call(this), this._cache = new l, this._cipher = new d.AES(t), this._prev = o.from(i), this._mode = e, this._autopadding = !0
    }
    i(39)(f, s), f.prototype._update = function(e) {
        var t, i;
        this._cache.add(e);
        for (var r = []; t = this._cache.get();) i = this._mode.encrypt(this, t), r.push(i);
        return o.concat(r)
    };
    var c = o.alloc(16, 16);

    function l() {
        this.cache = o.allocUnsafe(0)
    }

    function h(e, t, i) {
        var s = r[e.toLowerCase()];
        if (!s) throw new TypeError("invalid suite type");
        if ("string" == typeof t && (t = o.from(t)), t.length !== s.key / 8) throw new TypeError("invalid key length " + t.length);
        if ("string" == typeof i && (i = o.from(i)), "GCM" !== s.mode && i.length !== s.iv) throw new TypeError("invalid iv length " + i.length);
        return "stream" === s.type ? new a(s.module, t, i) : "auth" === s.type ? new n(s.module, t, i) : new f(s.module, t, i)
    }
    f.prototype._final = function() {
        var e = this._cache.flush();
        if (this._autopadding) return e = this._mode.encrypt(this, e), this._cipher.scrub(), e;
        if (!e.equals(c)) throw this._cipher.scrub(), new Error("data not multiple of block length")
    }, f.prototype.setAutoPadding = function(e) {
        return this._autopadding = !!e, this
    }, l.prototype.add = function(e) {
        this.cache = o.concat([this.cache, e])
    }, l.prototype.get = function() {
        if (this.cache.length > 15) {
            var e = this.cache.slice(0, 16);
            return this.cache = this.cache.slice(16), e
        }
        return null
    }, l.prototype.flush = function() {
        for (var e = 16 - this.cache.length, t = o.allocUnsafe(e), i = -1; ++i < e;) t.writeUInt8(e, i);
        return o.concat([this.cache, t])
    }, t.createCipheriv = h, t.createCipher = function(e, t) {
        var i = r[e.toLowerCase()];
        if (!i) throw new TypeError("invalid suite type");
        var n = u(t, !1, i.key, i.iv);
        return h(e, n.key, n.iv)
    }
}, function(e, t, i) {
    "use strict";
    var r = i(133).Buffer,
        n = i(53).Transform;

    function o(e) {
        n.call(this), this._block = r.allocUnsafe(e), this._blockSize = e, this._blockOffset = 0, this._length = [0, 0, 0, 0], this._finalized = !1
    }
    i(39)(o, n), o.prototype._transform = function(e, t, i) {
        var r = null;
        try {
            this.update(e, t)
        } catch (e) {
            r = e
        }
        i(r)
    }, o.prototype._flush = function(e) {
        var t = null;
        try {
            this.push(this.digest())
        } catch (e) {
            t = e
        }
        e(t)
    }, o.prototype.update = function(e, t) {
        if (function(e, t) {
                if (!r.isBuffer(e) && "string" != typeof e) throw new TypeError(t + " must be a string or a buffer")
            }(e, "Data"), this._finalized) throw new Error("Digest already called");
        r.isBuffer(e) || (e = r.from(e, t));
        for (var i = this._block, n = 0; this._blockOffset + e.length - n >= this._blockSize;) {
            for (var o = this._blockOffset; o < this._blockSize;) i[o++] = e[n++];
            this._update(), this._blockOffset = 0
        }
        for (; n < e.length;) i[this._blockOffset++] = e[n++];
        for (var a = 0, s = 8 * e.length; s > 0; ++a) this._length[a] += s, (s = this._length[a] / 4294967296 | 0) > 0 && (this._length[a] -= 4294967296 * s);
        return this
    }, o.prototype._update = function() {
        throw new Error("_update is not implemented")
    }, o.prototype.digest = function(e) {
        if (this._finalized) throw new Error("Digest already called");
        this._finalized = !0;
        var t = this._digest();
        void 0 !== e && (t = t.toString(e)), this._block.fill(0), this._blockOffset = 0;
        for (var i = 0; i < 4; ++i) this._length[i] = 0;
        return t
    }, o.prototype._digest = function() {
        throw new Error("_digest is not implemented")
    }, e.exports = o
}, function(e, t, i) {
    "use strict";
    e.exports = o;
    var r = i(166),
        n = i(9);

    function o(e) {
        if (!(this instanceof o)) return new o(e);
        r.call(this, e), this._transformState = {
            afterTransform: function(e, t) {
                var i = this._transformState;
                i.transforming = !1;
                var r = i.writecb;
                if (!r) return this.emit("error", new Error("write callback called multiple times"));
                i.writechunk = null, i.writecb = null, null != t && this.push(t), r(e);
                var n = this._readableState;
                n.reading = !1, (n.needReadable || n.length < n.highWaterMark) && this._read(n.highWaterMark)
            }.bind(this),
            needTransform: !1,
            transforming: !1,
            writecb: null,
            writechunk: null,
            writeencoding: null
        }, this._readableState.needReadable = !0, this._readableState.sync = !1, e && ("function" == typeof e.transform && (this._transform = e.transform), "function" == typeof e.flush && (this._flush = e.flush)), this.on("prefinish", a)
    }

    function a() {
        var e = this;
        "function" == typeof this._flush ? this._flush(function(t, i) {
            s(e, t, i)
        }) : s(this, null, null)
    }

    function s(e, t, i) {
        if (t) return e.emit("error", t);
        if (null != i && e.push(i), e._writableState.length) throw new Error("Calling transform done when ws.length != 0");
        if (e._transformState.transforming) throw new Error("Calling transform done when still transforming");
        return e.push(null)
    }
    n.inherits = i(39), n.inherits(o, r), o.prototype.push = function(e, t) {
        return this._transformState.needTransform = !1, r.prototype.push.call(this, e, t)
    }, o.prototype._transform = function(e, t, i) {
        throw new Error("_transform() is not implemented")
    }, o.prototype._write = function(e, t, i) {
        var r = this._transformState;
        if (r.writecb = i, r.writechunk = e, r.writeencoding = t, !r.transforming) {
            var n = this._readableState;
            (r.needTransform || n.needReadable || n.length < n.highWaterMark) && this._read(n.highWaterMark)
        }
    }, o.prototype._read = function(e) {
        var t = this._transformState;
        null !== t.writechunk && t.writecb && !t.transforming ? (t.transforming = !0, this._transform(t.writechunk, t.writeencoding, t.afterTransform)) : t.needTransform = !0
    }, o.prototype._destroy = function(e, t) {
        var i = this;
        r.prototype._destroy.call(this, e, function(e) {
            t(e), i.emit("close")
        })
    }
}, function(e, t, i) {
    "use strict";
    var r = t,
        n = i(105),
        o = i(143),
        a = i(139);
    r.assert = o, r.toArray = a.toArray, r.zero2 = a.zero2, r.toHex = a.toHex, r.encode = a.encode, r.getNAF = function(e, t) {
        for (var i = [], r = 1 << t + 1, n = e.clone(); n.cmpn(1) >= 0;) {
            var o;
            if (n.isOdd()) {
                var a = n.andln(r - 1);
                o = a > (r >> 1) - 1 ? (r >> 1) - a : a, n.isubn(o)
            } else o = 0;
            i.push(o);
            for (var s = 0 !== n.cmpn(0) && 0 === n.andln(r - 1) ? t + 1 : 1, d = 1; d < s; d++) i.push(0);
            n.iushrn(s)
        }
        return i
    }, r.getJSF = function(e, t) {
        var i = [
            [],
            []
        ];
        e = e.clone(), t = t.clone();
        for (var r = 0, n = 0; e.cmpn(-r) > 0 || t.cmpn(-n) > 0;) {
            var o, a, s, d = e.andln(3) + r & 3,
                u = t.andln(3) + n & 3;
            3 === d && (d = -1), 3 === u && (u = -1), o = 0 == (1 & d) ? 0 : 3 != (s = e.andln(7) + r & 7) && 5 !== s || 2 !== u ? d : -d, i[0].push(o), a = 0 == (1 & u) ? 0 : 3 != (s = t.andln(7) + n & 7) && 5 !== s || 2 !== d ? u : -u, i[1].push(a), 2 * r === o + 1 && (r = 1 - r), 2 * n === a + 1 && (n = 1 - n), e.iushrn(1), t.iushrn(1)
        }
        return i
    }, r.cachedProperty = function(e, t, i) {
        var r = "_" + t;
        e.prototype[t] = function() {
            return void 0 !== this[r] ? this[r] : this[r] = i.call(this)
        }
    }, r.parseBytes = function(e) {
        return "string" == typeof e ? r.toArray(e, "hex") : e
    }, r.intFromLE = function(e) {
        return new n(e, "hex", "le")
    }
}, function(e, t, i) {
    var r = i(39),
        n = i(11).Buffer,
        o = i(119),
        a = o.base,
        s = o.constants.der;

    function d(e) {
        this.enc = "der", this.name = e.name, this.entity = e, this.tree = new u, this.tree._init(e.body)
    }

    function u(e) {
        a.Node.call(this, "der", e)
    }

    function f(e) {
        return e < 10 ? "0" + e : e
    }
    e.exports = d, d.prototype.encode = function(e, t) {
        return this.tree._encode(e, t).join()
    }, r(u, a.Node), u.prototype._encodeComposite = function(e, t, i, r) {
        var o, a = function(e, t, i, r) {
            var n;
            "seqof" === e ? e = "seq" : "setof" === e && (e = "set");
            if (s.tagByName.hasOwnProperty(e)) n = s.tagByName[e];
            else {
                if ("number" != typeof e || (0 | e) !== e) return r.error("Unknown tag: " + e);
                n = e
            }
            if (n >= 31) return r.error("Multi-octet tag encoding unsupported");
            t || (n |= 32);
            return n |= s.tagClassByName[i || "universal"] << 6
        }(e, t, i, this.reporter);
        if (r.length < 128) return (o = new n(2))[0] = a, o[1] = r.length, this._createEncoderBuffer([o, r]);
        for (var d = 1, u = r.length; u >= 256; u >>= 8) d++;
        (o = new n(2 + d))[0] = a, o[1] = 128 | d;
        u = 1 + d;
        for (var f = r.length; f > 0; u--, f >>= 8) o[u] = 255 & f;
        return this._createEncoderBuffer([o, r])
    }, u.prototype._encodeStr = function(e, t) {
        if ("bitstr" === t) return this._createEncoderBuffer([0 | e.unused, e.data]);
        if ("bmpstr" === t) {
            for (var i = new n(2 * e.length), r = 0; r < e.length; r++) i.writeUInt16BE(e.charCodeAt(r), 2 * r);
            return this._createEncoderBuffer(i)
        }
        return "numstr" === t ? this._isNumstr(e) ? this._createEncoderBuffer(e) : this.reporter.error("Encoding of string type: numstr supports only digits and space") : "printstr" === t ? this._isPrintstr(e) ? this._createEncoderBuffer(e) : this.reporter.error("Encoding of string type: printstr supports only latin upper and lower case letters, digits, space, apostrophe, left and rigth parenthesis, plus sign, comma, hyphen, dot, slash, colon, equal sign, question mark") : /str$/.test(t) ? this._createEncoderBuffer(e) : "objDesc" === t ? this._createEncoderBuffer(e) : this.reporter.error("Encoding of string type: " + t + " unsupported")
    }, u.prototype._encodeObjid = function(e, t, i) {
        if ("string" == typeof e) {
            if (!t) return this.reporter.error("string objid given, but no values map found");
            if (!t.hasOwnProperty(e)) return this.reporter.error("objid not found in values map");
            e = t[e].split(/[\s\.]+/g);
            for (var r = 0; r < e.length; r++) e[r] |= 0
        } else if (Array.isArray(e)) {
            e = e.slice();
            for (r = 0; r < e.length; r++) e[r] |= 0
        }
        if (!Array.isArray(e)) return this.reporter.error("objid() should be either array or string, got: " + JSON.stringify(e));
        if (!i) {
            if (e[1] >= 40) return this.reporter.error("Second objid identifier OOB");
            e.splice(0, 2, 40 * e[0] + e[1])
        }
        var o = 0;
        for (r = 0; r < e.length; r++) {
            var a = e[r];
            for (o++; a >= 128; a >>= 7) o++
        }
        var s = new n(o),
            d = s.length - 1;
        for (r = e.length - 1; r >= 0; r--) {
            a = e[r];
            for (s[d--] = 127 & a;
                (a >>= 7) > 0;) s[d--] = 128 | 127 & a
        }
        return this._createEncoderBuffer(s)
    }, u.prototype._encodeTime = function(e, t) {
        var i, r = new Date(e);
        return "gentime" === t ? i = [f(r.getFullYear()), f(r.getUTCMonth() + 1), f(r.getUTCDate()), f(r.getUTCHours()), f(r.getUTCMinutes()), f(r.getUTCSeconds()), "Z"].join("") : "utctime" === t ? i = [f(r.getFullYear() % 100), f(r.getUTCMonth() + 1), f(r.getUTCDate()), f(r.getUTCHours()), f(r.getUTCMinutes()), f(r.getUTCSeconds()), "Z"].join("") : this.reporter.error("Encoding " + t + " time is not supported yet"), this._encodeStr(i, "octstr")
    }, u.prototype._encodeNull = function() {
        return this._createEncoderBuffer("")
    }, u.prototype._encodeInt = function(e, t) {
        if ("string" == typeof e) {
            if (!t) return this.reporter.error("String int or enum given, but no values map");
            if (!t.hasOwnProperty(e)) return this.reporter.error("Values map doesn't contain: " + JSON.stringify(e));
            e = t[e]
        }
        if ("number" != typeof e && !n.isBuffer(e)) {
            var i = e.toArray();
            !e.sign && 128 & i[0] && i.unshift(0), e = new n(i)
        }
        if (n.isBuffer(e)) {
            var r = e.length;
            0 === e.length && r++;
            var o = new n(r);
            return e.copy(o), 0 === e.length && (o[0] = 0), this._createEncoderBuffer(o)
        }
        if (e < 128) return this._createEncoderBuffer(e);
        if (e < 256) return this._createEncoderBuffer([0, e]);
        r = 1;
        for (var a = e; a >= 256; a >>= 8) r++;
        for (a = (o = new Array(r)).length - 1; a >= 0; a--) o[a] = 255 & e, e >>= 8;
        return 128 & o[0] && o.unshift(0), this._createEncoderBuffer(new n(o))
    }, u.prototype._encodeBool = function(e) {
        return this._createEncoderBuffer(e ? 255 : 0)
    }, u.prototype._use = function(e, t) {
        return "function" == typeof e && (e = e(t)), e._getEncoder("der").tree
    }, u.prototype._skipDefault = function(e, t, i) {
        var r, n = this._baseState;
        if (null === n.default) return !1;
        var o = e.join();
        if (void 0 === n.defaultBuffer && (n.defaultBuffer = this._encodeValue(n.default, t, i).join()), o.length !== n.defaultBuffer.length) return !1;
        for (r = 0; r < o.length; r++)
            if (o[r] !== n.defaultBuffer[r]) return !1;
        return !0
    }
}, function(e, t, i) {
    "use strict";
    var r = t;
    r.version = i(162).version, r.utils = i(59), r.rand = i(112), r.curve = i(142), r.curves = i(165), r.ec = i(36), r.eddsa = i(146)
}, function(e, t, i) {
    (function(t) {
        var i;
        t.browser ? i = "utf-8" : i = parseInt(t.version.split(".")[0].slice(1), 10) >= 6 ? "utf-8" : "binary";
        e.exports = i
    }).call(this, i(128))
}, function(e, t, i) {
    var r = i(133).Buffer,
        n = r.alloc(16, 0);

    function o(e) {
        var t = r.allocUnsafe(16);
        return t.writeUInt32BE(e[0] >>> 0, 0), t.writeUInt32BE(e[1] >>> 0, 4), t.writeUInt32BE(e[2] >>> 0, 8), t.writeUInt32BE(e[3] >>> 0, 12), t
    }

    function a(e) {
        this.h = e, this.state = r.alloc(16, 0), this.cache = r.allocUnsafe(0)
    }
    a.prototype.ghash = function(e) {
        for (var t = -1; ++t < e.length;) this.state[t] ^= e[t];
        this._multiply()
    }, a.prototype._multiply = function() {
        for (var e, t, i, r = [(e = this.h).readUInt32BE(0), e.readUInt32BE(4), e.readUInt32BE(8), e.readUInt32BE(12)], n = [0, 0, 0, 0], a = -1; ++a < 128;) {
            for (0 != (this.state[~~(a / 8)] & 1 << 7 - a % 8) && (n[0] ^= r[0], n[1] ^= r[1], n[2] ^= r[2], n[3] ^= r[3]), i = 0 != (1 & r[3]), t = 3; t > 0; t--) r[t] = r[t] >>> 1 | (1 & r[t - 1]) << 31;
            r[0] = r[0] >>> 1, i && (r[0] = r[0] ^ 225 << 24)
        }
        this.state = o(n)
    }, a.prototype.update = function(e) {
        var t;
        for (this.cache = r.concat([this.cache, e]); this.cache.length >= 16;) t = this.cache.slice(0, 16), this.cache = this.cache.slice(16), this.ghash(t)
    }, a.prototype.final = function(e, t) {
        return this.cache.length && this.ghash(r.concat([this.cache, n], 16)), this.ghash(o([0, e, 0, t])), this.state
    }, e.exports = a
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    var _lib_debug_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37);

    function _classCallCheck(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    var AudioLayer = function() {
        function AudioLayer() {
            _classCallCheck(this, AudioLayer), this._els = {
                layerPlace: ge("top_audio_layer_place"),
                topPlayBtn: geByClass1("_top_audio_player_play"),
                topNotaBtn: geByClass1("_top_nav_audio_btn"),
                topNotaBtnGroup: ge("top_audio_btn_group")
            }
        }
        return AudioLayer.prepare = function(e) {
            stManager.add(["audio.js", "audioplayer.js", "audio.css", "suggester.js", "auto_list.js", "indexer.js"], function() {
                e && e()
            })
        }, AudioLayer.prototype.toggle = function(e, t) {
            var i = this;
            this._initTooltip();
            var r = this._els.tooltip,
                n = void 0 !== e ? e : !r.isShown();
            n ? (r.show(), cancelStackPush("top_audio", function() {
                i.toggle(!1, !0)
            }, !0)) : (t || cancelStackPop(), r.hide()), toggleClass(this._els.topNotaBtn, "active", n)
        }, AudioLayer.prototype.hide = function() {
            this._els.tooltip.hide()
        }, AudioLayer.prototype.isShown = function() {
            return this._els.tooltip && this._els.tooltip.isShown()
        }, AudioLayer.prototype.updatePosition = function() {
            return this._els.tooltip && this._els.tooltip.updatePosition()
        }, AudioLayer.prototype._layerPosition = function() {
            var e = getXY(this._els.layerPlace),
                t = getXY("ts_wrap")[0] - e[0] - 1,
                i = 0;
            isVisible(this._els.topNotaBtnGroup) ? i = -t + (getXY(this._els.topNotaBtn)[0] - e[0]) + 15 : i = -t + (getXY(this._els.topPlayBtn)[0] - e[0]) + 3;
            return {
                left: t,
                top: 0,
                arrowPosition: i
            }
        }, AudioLayer.prototype.getPageInstance = function() {
            return this._page
        }, AudioLayer.prototype.getTemplate = function() {
            return '\n      <div class="audio_layer_container">\n        <div class="top_audio_loading">\n          ' + rs(vk.pr_tpl, {
                id: "",
                cls: "pr_big"
            }) + "\n        </div>\n      </div>\n    "
        }, AudioLayer.prototype._initTooltip = function _initTooltip() {
            var _this2 = this;
            this._els.tooltip || (this._els.container = se(this.getTemplate()), this._els.tooltip = new ElementTooltip(this._els.layerPlace, {
                id: "audio_layer_tt",
                content: this._els.container,
                width: 660,
                offset: [22, 5],
                autoShow: !1,
                customShow: !0,
                setPos: this._layerPosition.bind(this),
                forceSide: "bottom",
                onHide: function() {
                    _this2._page && _this2._page.onLayerHide()
                },
                onShow: function() {
                    _this2._page && _this2._page.onLayerShow(_this2._initSection)
                }
            }), ajax.post("al_audio.php", {
                act: "layer",
                is_layer: 1,
                is_current_playlist: ap.getCurrentPlaylist() ? 1 : 0
            }, {
                onDone: function onDone(html, data, templatesScript) {
                    try {
                        eval(templatesScript)
                    } catch (e) {
                        Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_0__.logEvalError)(e, templatesScript)
                    }
                    _this2._els.container.innerHTML = html, _this2._page = new AudioPage(geByClass1("_audio_page_layout", _this2._els.container), data), _this2._initSection = "recoms" == data.initSection ? data.initSection : void 0, _this2._page.onLayerShow(_this2._initSection)
                }
            }))
        }, AudioLayer
    }();
    __webpack_exports__.default = AudioLayer
}, function(e, t, i) {
    (function(t) {
        var r = i(67),
            n = i(117),
            o = i(61).ec,
            a = i(105),
            s = i(28),
            d = i(158);

        function u(e, i, n, o) {
            if ((e = new t(e.toArray())).length < i.byteLength()) {
                var a = new t(i.byteLength() - e.length);
                a.fill(0), e = t.concat([a, e])
            }
            var s = n.length,
                d = function(e, i) {
                    e = (e = f(e, i)).mod(i);
                    var r = new t(e.toArray());
                    if (r.length < i.byteLength()) {
                        var n = new t(i.byteLength() - r.length);
                        n.fill(0), r = t.concat([n, r])
                    }
                    return r
                }(n, i),
                u = new t(s);
            u.fill(1);
            var c = new t(s);
            return c.fill(0), c = r(o, c).update(u).update(new t([0])).update(e).update(d).digest(), u = r(o, c).update(u).digest(), {
                k: c = r(o, c).update(u).update(new t([1])).update(e).update(d).digest(),
                v: u = r(o, c).update(u).digest()
            }
        }

        function f(e, t) {
            var i = new a(e),
                r = (e.length << 3) - t.bitLength();
            return r > 0 && i.ishrn(r), i
        }

        function c(e, i, n) {
            var o, a;
            do {
                for (o = new t(0); 8 * o.length < e.bitLength();) i.v = r(n, i.k).update(i.v).digest(), o = t.concat([o, i.v]);
                a = f(o, e), i.k = r(n, i.k).update(i.v).update(new t([0])).digest(), i.v = r(n, i.k).update(i.v).digest()
            } while (-1 !== a.cmp(e));
            return a
        }

        function l(e, t, i, r) {
            return e.toRed(a.mont(i)).redPow(t).fromRed().mod(r)
        }
        e.exports = function(e, i, r, h, p) {
            var _ = s(i);
            if (_.curve) {
                if ("ecdsa" !== h && "ecdsa/rsa" !== h) throw new Error("wrong private key type");
                return function(e, i) {
                    var r = d[i.curve.join(".")];
                    if (!r) throw new Error("unknown curve " + i.curve.join("."));
                    var n = new o(r).keyFromPrivate(i.privateKey).sign(e);
                    return new t(n.toDER())
                }(e, _)
            }
            if ("dsa" === _.type) {
                if ("dsa" !== h) throw new Error("wrong private key type");
                return function(e, i, r) {
                    for (var n, o = i.params.priv_key, s = i.params.p, d = i.params.q, h = i.params.g, p = new a(0), _ = f(e, d).mod(d), y = !1, b = u(o, d, e, r); !1 === y;) n = c(d, b, r), p = l(h, n, s, d), 0 === (y = n.invm(d).imul(_.add(o.mul(p))).mod(d)).cmpn(0) && (y = !1, p = new a(0));
                    return function(e, i) {
                        e = e.toArray(), i = i.toArray(), 128 & e[0] && (e = [0].concat(e)), 128 & i[0] && (i = [0].concat(i));
                        var r = [48, e.length + i.length + 4, 2, e.length];
                        return r = r.concat(e, [2, i.length], i), new t(r)
                    }(p, y)
                }(e, _, r)
            }
            if ("rsa" !== h && "ecdsa/rsa" !== h) throw new Error("wrong private key type");
            e = t.concat([p, e]);
            for (var y = _.modulus.byteLength(), b = [0, 1]; e.length + b.length + 1 < y;) b.push(255);
            b.push(0);
            for (var g = -1; ++g < e.length;) b.push(e[g]);
            return n(b, _)
        }, e.exports.getKey = u, e.exports.makeKey = c
    }).call(this, i(11).Buffer)
}, function(e, t, i) {
    (function(r) {
        var n;
        ! function(o) {
            "use strict";
            var a, s, d, u;
            o ? function() {
                var e = o.crypto || o.msCrypto;
                if (!a && e && e.getRandomValues) try {
                    var t = new Uint8Array(16);
                    u = a = function() {
                        return e.getRandomValues(t), t
                    }, a()
                } catch (e) {}
                if (!a) {
                    var i = new Array(16);
                    s = a = function() {
                        for (var e, t = 0; t < 16; t++) 0 == (3 & t) && (e = 4294967296 * Math.random()), i[t] = e >>> ((3 & t) << 3) & 255;
                        return i
                    }, "undefined" != typeof console && console.warn && console.warn("[SECURITY] node-uuid: crypto not usable, falling back to insecure Math.random()")
                }
            }() : function() {
                try {
                    var e = i(52).randomBytes;
                    d = a = e && function() {
                        return e(16)
                    }, a()
                } catch (e) {}
            }();
            for (var f = "function" == typeof r ? r : Array, c = [], l = {}, h = 0; h < 256; h++) c[h] = (h + 256).toString(16).substr(1), l[c[h]] = h;

            function p(e, t) {
                var i = t || 0,
                    r = c;
                return r[e[i++]] + r[e[i++]] + r[e[i++]] + r[e[i++]] + "-" + r[e[i++]] + r[e[i++]] + "-" + r[e[i++]] + r[e[i++]] + "-" + r[e[i++]] + r[e[i++]] + "-" + r[e[i++]] + r[e[i++]] + r[e[i++]] + r[e[i++]] + r[e[i++]] + r[e[i++]]
            }
            var _ = a(),
                y = [1 | _[0], _[1], _[2], _[3], _[4], _[5]],
                b = 16383 & (_[6] << 8 | _[7]),
                g = 0,
                v = 0;

            function m(e, t, i) {
                var r = t && i || 0;
                "string" == typeof e && (t = "binary" === e ? new f(16) : null, e = null);
                var n = (e = e || {}).random || (e.rng || a)();
                if (n[6] = 15 & n[6] | 64, n[8] = 63 & n[8] | 128, t)
                    for (var o = 0; o < 16; o++) t[r + o] = n[o];
                return t || p(n)
            }
            var A = m;
            A.v1 = function(e, t, i) {
                var r = t && i || 0,
                    n = t || [],
                    o = null != (e = e || {}).clockseq ? e.clockseq : b,
                    a = null != e.msecs ? e.msecs : (new Date).getTime(),
                    s = null != e.nsecs ? e.nsecs : v + 1,
                    d = a - g + (s - v) / 1e4;
                if (d < 0 && null == e.clockseq && (o = o + 1 & 16383), (d < 0 || a > g) && null == e.nsecs && (s = 0), s >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
                g = a, v = s, b = o;
                var u = (1e4 * (268435455 & (a += 122192928e5)) + s) % 4294967296;
                n[r++] = u >>> 24 & 255, n[r++] = u >>> 16 & 255, n[r++] = u >>> 8 & 255, n[r++] = 255 & u;
                var f = a / 4294967296 * 1e4 & 268435455;
                n[r++] = f >>> 8 & 255, n[r++] = 255 & f, n[r++] = f >>> 24 & 15 | 16, n[r++] = f >>> 16 & 255, n[r++] = o >>> 8 | 128, n[r++] = 255 & o;
                for (var c = e.node || y, l = 0; l < 6; l++) n[r + l] = c[l];
                return t || p(n)
            }, A.v4 = m, A.parse = function(e, t, i) {
                var r = t && i || 0,
                    n = 0;
                for (t = t || [], e.toLowerCase().replace(/[0-9a-f]{2}/g, function(e) {
                        n < 16 && (t[r + n++] = l[e])
                    }); n < 16;) t[r + n++] = 0;
                return t
            }, A.unparse = p, A.BufferClass = f, A._rng = a, A._mathRNG = s, A._nodeRNG = d, A._whatwgRNG = u, void 0 !== e && e.exports ? e.exports = A : void 0 === (n = function() {
                return A
            }.call(t, i, t, e)) || (e.exports = n)
        }("undefined" != typeof window ? window : null)
    }).call(this, i(11).Buffer)
}, function(e, t, i) {
    "use strict";
    var r = i(39),
        n = i(4),
        o = i(49),
        a = i(133).Buffer,
        s = i(41),
        d = i(44),
        u = i(96),
        f = a.alloc(128);

    function c(e, t) {
        o.call(this, "digest"), "string" == typeof t && (t = a.from(t));
        var i = "sha512" === e || "sha384" === e ? 128 : 64;
        (this._alg = e, this._key = t, t.length > i) ? t = ("rmd160" === e ? new d : u(e)).update(t).digest(): t.length < i && (t = a.concat([t, f], i));
        for (var r = this._ipad = a.allocUnsafe(i), n = this._opad = a.allocUnsafe(i), s = 0; s < i; s++) r[s] = 54 ^ t[s], n[s] = 92 ^ t[s];
        this._hash = "rmd160" === e ? new d : u(e), this._hash.update(r)
    }
    r(c, o), c.prototype._update = function(e) {
        this._hash.update(e)
    }, c.prototype._final = function() {
        var e = this._hash.digest();
        return ("rmd160" === this._alg ? new d : u(this._alg)).update(this._opad).update(e).digest()
    }, e.exports = function(e, t) {
        return "rmd160" === (e = e.toLowerCase()) || "ripemd160" === e ? new c("rmd160", t) : "md5" === e ? new n(s, t) : new c(e, t)
    }
}, function(e, t, i) {
    "use strict";
    var r = i(132),
        n = i(106);

    function o() {
        if (!(this instanceof o)) return new o;
        n.call(this), this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]
    }
    r.inherits(o, n), e.exports = o, o.blockSize = 512, o.outSize = 224, o.hmacStrength = 192, o.padLength = 64, o.prototype._digest = function(e) {
        return "hex" === e ? r.toHex32(this.h.slice(0, 7), "big") : r.split32(this.h.slice(0, 7), "big")
    }
}, function(e, t, i) {
    e.exports = i(144)
}, function(e, t, i) {
    "use strict";
    (function(t) {
        var r = i(39),
            n = i(57),
            o = new Array(16);

        function a() {
            n.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878
        }

        function s(e, t) {
            return e << t | e >>> 32 - t
        }

        function d(e, t, i, r, n, o, a) {
            return s(e + (t & i | ~t & r) + n + o | 0, a) + t | 0
        }

        function u(e, t, i, r, n, o, a) {
            return s(e + (t & r | i & ~r) + n + o | 0, a) + t | 0
        }

        function f(e, t, i, r, n, o, a) {
            return s(e + (t ^ i ^ r) + n + o | 0, a) + t | 0
        }

        function c(e, t, i, r, n, o, a) {
            return s(e + (i ^ (t | ~r)) + n + o | 0, a) + t | 0
        }
        r(a, n), a.prototype._update = function() {
            for (var e = o, t = 0; t < 16; ++t) e[t] = this._block.readInt32LE(4 * t);
            var i = this._a,
                r = this._b,
                n = this._c,
                a = this._d;
            r = c(r = c(r = c(r = c(r = f(r = f(r = f(r = f(r = u(r = u(r = u(r = u(r = d(r = d(r = d(r = d(r, n = d(n, a = d(a, i = d(i, r, n, a, e[0], 3614090360, 7), r, n, e[1], 3905402710, 12), i, r, e[2], 606105819, 17), a, i, e[3], 3250441966, 22), n = d(n, a = d(a, i = d(i, r, n, a, e[4], 4118548399, 7), r, n, e[5], 1200080426, 12), i, r, e[6], 2821735955, 17), a, i, e[7], 4249261313, 22), n = d(n, a = d(a, i = d(i, r, n, a, e[8], 1770035416, 7), r, n, e[9], 2336552879, 12), i, r, e[10], 4294925233, 17), a, i, e[11], 2304563134, 22), n = d(n, a = d(a, i = d(i, r, n, a, e[12], 1804603682, 7), r, n, e[13], 4254626195, 12), i, r, e[14], 2792965006, 17), a, i, e[15], 1236535329, 22), n = u(n, a = u(a, i = u(i, r, n, a, e[1], 4129170786, 5), r, n, e[6], 3225465664, 9), i, r, e[11], 643717713, 14), a, i, e[0], 3921069994, 20), n = u(n, a = u(a, i = u(i, r, n, a, e[5], 3593408605, 5), r, n, e[10], 38016083, 9), i, r, e[15], 3634488961, 14), a, i, e[4], 3889429448, 20), n = u(n, a = u(a, i = u(i, r, n, a, e[9], 568446438, 5), r, n, e[14], 3275163606, 9), i, r, e[3], 4107603335, 14), a, i, e[8], 1163531501, 20), n = u(n, a = u(a, i = u(i, r, n, a, e[13], 2850285829, 5), r, n, e[2], 4243563512, 9), i, r, e[7], 1735328473, 14), a, i, e[12], 2368359562, 20), n = f(n, a = f(a, i = f(i, r, n, a, e[5], 4294588738, 4), r, n, e[8], 2272392833, 11), i, r, e[11], 1839030562, 16), a, i, e[14], 4259657740, 23), n = f(n, a = f(a, i = f(i, r, n, a, e[1], 2763975236, 4), r, n, e[4], 1272893353, 11), i, r, e[7], 4139469664, 16), a, i, e[10], 3200236656, 23), n = f(n, a = f(a, i = f(i, r, n, a, e[13], 681279174, 4), r, n, e[0], 3936430074, 11), i, r, e[3], 3572445317, 16), a, i, e[6], 76029189, 23), n = f(n, a = f(a, i = f(i, r, n, a, e[9], 3654602809, 4), r, n, e[12], 3873151461, 11), i, r, e[15], 530742520, 16), a, i, e[2], 3299628645, 23), n = c(n, a = c(a, i = c(i, r, n, a, e[0], 4096336452, 6), r, n, e[7], 1126891415, 10), i, r, e[14], 2878612391, 15), a, i, e[5], 4237533241, 21), n = c(n, a = c(a, i = c(i, r, n, a, e[12], 1700485571, 6), r, n, e[3], 2399980690, 10), i, r, e[10], 4293915773, 15), a, i, e[1], 2240044497, 21), n = c(n, a = c(a, i = c(i, r, n, a, e[8], 1873313359, 6), r, n, e[15], 4264355552, 10), i, r, e[6], 2734768916, 15), a, i, e[13], 1309151649, 21), n = c(n, a = c(a, i = c(i, r, n, a, e[4], 4149444226, 6), r, n, e[11], 3174756917, 10), i, r, e[2], 718787259, 15), a, i, e[9], 3951481745, 21), this._a = this._a + i | 0, this._b = this._b + r | 0, this._c = this._c + n | 0, this._d = this._d + a | 0
        }, a.prototype._digest = function() {
            this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
            var e = new t(16);
            return e.writeInt32LE(this._a, 0), e.writeInt32LE(this._b, 4), e.writeInt32LE(this._c, 8), e.writeInt32LE(this._d, 12), e
        }, e.exports = a
    }).call(this, i(11).Buffer)
}, function(e, t, i) {
    var r = i(107),
        n = i(133).Buffer,
        o = i(19);

    function a(e) {
        var t = e._cipher.encryptBlockRaw(e._prev);
        return o(e._prev), t
    }
    t.encrypt = function(e, t) {
        var i = Math.ceil(t.length / 16),
            o = e._cache.length;
        e._cache = n.concat([e._cache, n.allocUnsafe(16 * i)]);
        for (var s = 0; s < i; s++) {
            var d = a(e),
                u = o + 16 * s;
            e._cache.writeUInt32BE(d[0], u + 0), e._cache.writeUInt32BE(d[1], u + 4), e._cache.writeUInt32BE(d[2], u + 8), e._cache.writeUInt32BE(d[3], u + 12)
        }
        var f = e._cache.slice(0, t.length);
        return e._cache = e._cache.slice(t.length), r(t, f)
    }
}, function(e, t, i) {
    "use strict";
    i.r(t), i.d(t, "audioUnmaskSource", function() {
        return o
    });
    var r = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=",
        n = {
            v: function(e) {
                return e.split("").reverse().join("")
            },
            r: function(e, t) {
                e = e.split("");
                for (var i, n = r + r, o = e.length; o--;) ~(i = n.indexOf(e[o])) && (e[o] = n.substr(i - t, 1));
                return e.join("")
            },
            s: function(e, t) {
                var i = e.length;
                if (i) {
                    var r = function(e, t) {
                            var i = e.length,
                                r = [];
                            if (i) {
                                var n = i;
                                for (t = Math.abs(t); n--;) t = (i * (n + 1) ^ t + n) % i, r[n] = t
                            }
                            return r
                        }(e, t),
                        n = 0;
                    for (e = e.split(""); ++n < i;) e[n] = e.splice(r[i - 1 - n], 1, e[n])[0];
                    e = e.join("")
                }
                return e
            },
            i: function(e, t) {
                return n.s(e, t ^ vk.id)
            },
            x: function(e, t) {
                var i = [];
                return t = t.charCodeAt(0), each(e.split(""), function(e, r) {
                    i.push(String.fromCharCode(r.charCodeAt(0) ^ t))
                }), i.join("")
            }
        };

    function o(e) {
        if ((!window.wbopen || !~(window.open + "").indexOf("wbopen")) && ~e.indexOf("audio_api_unavailable")) {
            var t = e.split("?extra=")[1].split("#"),
                i = "" === t[1] ? "" : a(t[1]);
            if (t = a(t[0]), "string" != typeof i || !t) return e;
            for (var r, o, s = (i = i ? i.split(String.fromCharCode(9)) : []).length; s--;) {
                if (r = (o = i[s].split(String.fromCharCode(11))).splice(0, 1, t)[0], !n[r]) return e;
                t = n[r].apply(null, o)
            }
            if (t && "http" === t.substr(0, 4)) return t
        }
        return e
    }

    function a(e) {
        if (!e || e.length % 4 == 1) return !1;
        for (var t, i, n = 0, o = 0, a = ""; i = e.charAt(o++);) ~(i = r.indexOf(i)) && (t = n % 4 ? 64 * t + i : i, n++ % 4) && (a += String.fromCharCode(255 & t >> (-2 * n & 6)));
        return a
    }
}, function(e, t, i) {
    (function(e) {
        var r = i(6),
            n = i(113),
            o = i(32);
        var a = {
            binary: !0,
            hex: !0,
            base64: !0
        };
        t.DiffieHellmanGroup = t.createDiffieHellmanGroup = t.getDiffieHellman = function(t) {
            var i = new e(n[t].prime, "hex"),
                r = new e(n[t].gen, "hex");
            return new o(i, r)
        }, t.createDiffieHellman = t.DiffieHellman = function t(i, n, s, d) {
            return e.isBuffer(n) || void 0 === a[n] ? t(i, "binary", n, s) : (n = n || "binary", d = d || "binary", s = s || new e([2]), e.isBuffer(s) || (s = new e(s, d)), "number" == typeof i ? new o(r(i, s), s, !0) : (e.isBuffer(i) || (i = new e(i, n)), new o(i, s, !0)))
        }
    }).call(this, i(11).Buffer)
}, function(e, t, i) {
    "use strict";
    var r = i(133).Buffer,
        n = r.isEncoding || function(e) {
            switch ((e = "" + e) && e.toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                case "raw":
                    return !0;
                default:
                    return !1
            }
        };

    function o(e) {
        var t;
        switch (this.encoding = function(e) {
            var t = function(e) {
                if (!e) return "utf8";
                for (var t;;) switch (e) {
                    case "utf8":
                    case "utf-8":
                        return "utf8";
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return "utf16le";
                    case "latin1":
                    case "binary":
                        return "latin1";
                    case "base64":
                    case "ascii":
                    case "hex":
                        return e;
                    default:
                        if (t) return;
                        e = ("" + e).toLowerCase(), t = !0
                }
            }(e);
            if ("string" != typeof t && (r.isEncoding === n || !n(e))) throw new Error("Unknown encoding: " + e);
            return t || e
        }(e), this.encoding) {
            case "utf16le":
                this.text = d, this.end = u, t = 4;
                break;
            case "utf8":
                this.fillLast = s, t = 4;
                break;
            case "base64":
                this.text = f, this.end = c, t = 3;
                break;
            default:
                return this.write = l, void(this.end = h)
        }
        this.lastNeed = 0, this.lastTotal = 0, this.lastChar = r.allocUnsafe(t)
    }

    function a(e) {
        return e <= 127 ? 0 : e >> 5 == 6 ? 2 : e >> 4 == 14 ? 3 : e >> 3 == 30 ? 4 : e >> 6 == 2 ? -1 : -2
    }

    function s(e) {
        var t = this.lastTotal - this.lastNeed,
            i = function(e, t, i) {
                if (128 != (192 & t[0])) return e.lastNeed = 0, "�";
                if (e.lastNeed > 1 && t.length > 1) {
                    if (128 != (192 & t[1])) return e.lastNeed = 1, "�";
                    if (e.lastNeed > 2 && t.length > 2 && 128 != (192 & t[2])) return e.lastNeed = 2, "�"
                }
            }(this, e);
        return void 0 !== i ? i : this.lastNeed <= e.length ? (e.copy(this.lastChar, t, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (e.copy(this.lastChar, t, 0, e.length), void(this.lastNeed -= e.length))
    }

    function d(e, t) {
        if ((e.length - t) % 2 == 0) {
            var i = e.toString("utf16le", t);
            if (i) {
                var r = i.charCodeAt(i.length - 1);
                if (r >= 55296 && r <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1], i.slice(0, -1)
            }
            return i
        }
        return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e[e.length - 1], e.toString("utf16le", t, e.length - 1)
    }

    function u(e) {
        var t = e && e.length ? this.write(e) : "";
        if (this.lastNeed) {
            var i = this.lastTotal - this.lastNeed;
            return t + this.lastChar.toString("utf16le", 0, i)
        }
        return t
    }

    function f(e, t) {
        var i = (e.length - t) % 3;
        return 0 === i ? e.toString("base64", t) : (this.lastNeed = 3 - i, this.lastTotal = 3, 1 === i ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1]), e.toString("base64", t, e.length - i))
    }

    function c(e) {
        var t = e && e.length ? this.write(e) : "";
        return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t
    }

    function l(e) {
        return e.toString(this.encoding)
    }

    function h(e) {
        return e && e.length ? this.write(e) : ""
    }
    t.StringDecoder = o, o.prototype.write = function(e) {
        if (0 === e.length) return "";
        var t, i;
        if (this.lastNeed) {
            if (void 0 === (t = this.fillLast(e))) return "";
            i = this.lastNeed, this.lastNeed = 0
        } else i = 0;
        return i < e.length ? t ? t + this.text(e, i) : this.text(e, i) : t || ""
    }, o.prototype.end = function(e) {
        var t = e && e.length ? this.write(e) : "";
        return this.lastNeed ? t + "�" : t
    }, o.prototype.text = function(e, t) {
        var i = function(e, t, i) {
            var r = t.length - 1;
            if (r < i) return 0;
            var n = a(t[r]);
            if (n >= 0) return n > 0 && (e.lastNeed = n - 1), n;
            if (--r < i || -2 === n) return 0;
            if ((n = a(t[r])) >= 0) return n > 0 && (e.lastNeed = n - 2), n;
            if (--r < i || -2 === n) return 0;
            if ((n = a(t[r])) >= 0) return n > 0 && (2 === n ? n = 0 : e.lastNeed = n - 3), n;
            return 0
        }(this, e, t);
        if (!this.lastNeed) return e.toString("utf8", t);
        this.lastTotal = i;
        var r = e.length - (i - this.lastNeed);
        return e.copy(this.lastChar, 0, r), e.toString("utf8", t, r)
    }, o.prototype.fillLast = function(e) {
        if (this.lastNeed <= e.length) return e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
        e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length), this.lastNeed -= e.length
    }
}, function(e, t) {}, function(e, t, i) {
    var r = t;
    r._reverse = function(e) {
        var t = {};
        return Object.keys(e).forEach(function(i) {
            (0 | i) == i && (i |= 0);
            var r = e[i];
            t[r] = i
        }), t
    }, r.der = i(129)
}, function(e, t, i) {
    (function(e) {
        var r = void 0 !== e && e || "undefined" != typeof self && self || window,
            n = Function.prototype.apply;

        function o(e, t) {
            this._id = e, this._clearFn = t
        }
        t.setTimeout = function() {
            return new o(n.call(setTimeout, r, arguments), clearTimeout)
        }, t.setInterval = function() {
            return new o(n.call(setInterval, r, arguments), clearInterval)
        }, t.clearTimeout = t.clearInterval = function(e) {
            e && e.close()
        }, o.prototype.unref = o.prototype.ref = function() {}, o.prototype.close = function() {
            this._clearFn.call(r, this._id)
        }, t.enroll = function(e, t) {
            clearTimeout(e._idleTimeoutId), e._idleTimeout = t
        }, t.unenroll = function(e) {
            clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
        }, t._unrefActive = t.active = function(e) {
            clearTimeout(e._idleTimeoutId);
            var t = e._idleTimeout;
            t >= 0 && (e._idleTimeoutId = setTimeout(function() {
                e._onTimeout && e._onTimeout()
            }, t))
        }, i(16), t.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== e && e.setImmediate || this && this.setImmediate, t.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== e && e.clearImmediate || this && this.clearImmediate
    }).call(this, i(38))
}, function(e, t, i) {
    "use strict";
    var r = i(143);

    function n(e) {
        this.options = e, this.type = this.options.type, this.blockSize = 8, this._init(), this.buffer = new Array(this.blockSize), this.bufferOff = 0
    }
    e.exports = n, n.prototype._init = function() {}, n.prototype.update = function(e) {
        return 0 === e.length ? [] : "decrypt" === this.type ? this._updateDecrypt(e) : this._updateEncrypt(e)
    }, n.prototype._buffer = function(e, t) {
        for (var i = Math.min(this.buffer.length - this.bufferOff, e.length - t), r = 0; r < i; r++) this.buffer[this.bufferOff + r] = e[t + r];
        return this.bufferOff += i, i
    }, n.prototype._flushBuffer = function(e, t) {
        return this._update(this.buffer, 0, e, t), this.bufferOff = 0, this.blockSize
    }, n.prototype._updateEncrypt = function(e) {
        var t = 0,
            i = 0,
            r = (this.bufferOff + e.length) / this.blockSize | 0,
            n = new Array(r * this.blockSize);
        0 !== this.bufferOff && (t += this._buffer(e, t), this.bufferOff === this.buffer.length && (i += this._flushBuffer(n, i)));
        for (var o = e.length - (e.length - t) % this.blockSize; t < o; t += this.blockSize) this._update(e, t, n, i), i += this.blockSize;
        for (; t < e.length; t++, this.bufferOff++) this.buffer[this.bufferOff] = e[t];
        return n
    }, n.prototype._updateDecrypt = function(e) {
        for (var t = 0, i = 0, r = Math.ceil((this.bufferOff + e.length) / this.blockSize) - 1, n = new Array(r * this.blockSize); r > 0; r--) t += this._buffer(e, t), i += this._flushBuffer(n, i);
        return t += this._buffer(e, t), n
    }, n.prototype.final = function(e) {
        var t, i;
        return e && (t = this.update(e)), i = "encrypt" === this.type ? this._finalEncrypt() : this._finalDecrypt(), t ? t.concat(i) : i
    }, n.prototype._pad = function(e, t) {
        if (0 === t) return !1;
        for (; t < e.length;) e[t++] = 0;
        return !0
    }, n.prototype._finalEncrypt = function() {
        if (!this._pad(this.buffer, this.bufferOff)) return [];
        var e = new Array(this.blockSize);
        return this._update(this.buffer, 0, e, 0), e
    }, n.prototype._unpad = function(e) {
        return e
    }, n.prototype._finalDecrypt = function() {
        r.equal(this.bufferOff, this.blockSize, "Not enough data to decrypt");
        var e = new Array(this.blockSize);
        return this._flushBuffer(e, 0), this._unpad(e)
    }
}, function(e, t, i) {
    "use strict";
    var r = i(105),
        n = i(61).utils.assert;

    function o(e, t) {
        this.ec = e, this.priv = null, this.pub = null, t.priv && this._importPrivate(t.priv, t.privEnc), t.pub && this._importPublic(t.pub, t.pubEnc)
    }
    e.exports = o, o.fromPublic = function(e, t, i) {
        return t instanceof o ? t : new o(e, {
            pub: t,
            pubEnc: i
        })
    }, o.fromPrivate = function(e, t, i) {
        return t instanceof o ? t : new o(e, {
            priv: t,
            privEnc: i
        })
    }, o.prototype.validate = function() {
        var e = this.getPublic();
        return e.isInfinity() ? {
            result: !1,
            reason: "Invalid public key"
        } : e.validate() ? e.mul(this.ec.curve.n).isInfinity() ? {
            result: !0,
            reason: null
        } : {
            result: !1,
            reason: "Public key * N != O"
        } : {
            result: !1,
            reason: "Public key is not a point"
        }
    }, o.prototype.getPublic = function(e, t) {
        return "string" == typeof e && (t = e, e = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), t ? this.pub.encode(t, e) : this.pub
    }, o.prototype.getPrivate = function(e) {
        return "hex" === e ? this.priv.toString(16, 2) : this.priv
    }, o.prototype._importPrivate = function(e, t) {
        this.priv = new r(e, t || 16), this.priv = this.priv.umod(this.ec.curve.n)
    }, o.prototype._importPublic = function(e, t) {
        if (e.x || e.y) return "mont" === this.ec.curve.type ? n(e.x, "Need x coordinate") : "short" !== this.ec.curve.type && "edwards" !== this.ec.curve.type || n(e.x && e.y, "Need both x and y coordinate"), void(this.pub = this.ec.curve.point(e.x, e.y));
        this.pub = this.ec.curve.decodePoint(e, t)
    }, o.prototype.derive = function(e) {
        return e.mul(this.priv).getX()
    }, o.prototype.sign = function(e, t, i) {
        return this.ec.sign(e, this, t, i)
    }, o.prototype.verify = function(e, t) {
        return this.ec.verify(e, t, this)
    }, o.prototype.inspect = function() {
        return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >"
    }
}, function(e, t, i) {
    "use strict";
    t.utils = i(8), t.Cipher = i(78), t.DES = i(157), t.CBC = i(136), t.EDE = i(22)
}, function(e, t, i) {
    "use strict";
    var r = i(61).utils,
        n = r.assert,
        o = r.parseBytes,
        a = r.cachedProperty;

    function s(e, t) {
        this.eddsa = e, this._secret = o(t.secret), e.isPoint(t.pub) ? this._pub = t.pub : this._pubBytes = o(t.pub)
    }
    s.fromPublic = function(e, t) {
        return t instanceof s ? t : new s(e, {
            pub: t
        })
    }, s.fromSecret = function(e, t) {
        return t instanceof s ? t : new s(e, {
            secret: t
        })
    }, s.prototype.secret = function() {
        return this._secret
    }, a(s, "pubBytes", function() {
        return this.eddsa.encodePoint(this.pub())
    }), a(s, "pub", function() {
        return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv())
    }), a(s, "privBytes", function() {
        var e = this.eddsa,
            t = this.hash(),
            i = e.encodingLength - 1,
            r = t.slice(0, e.encodingLength);
        return r[0] &= 248, r[i] &= 127, r[i] |= 64, r
    }), a(s, "priv", function() {
        return this.eddsa.decodeInt(this.privBytes())
    }), a(s, "hash", function() {
        return this.eddsa.hash().update(this.secret()).digest()
    }), a(s, "messagePrefix", function() {
        return this.hash().slice(this.eddsa.encodingLength)
    }), s.prototype.sign = function(e) {
        return n(this._secret, "KeyPair can only verify"), this.eddsa.sign(e, this)
    }, s.prototype.verify = function(e, t) {
        return this.eddsa.verify(e, t, this)
    }, s.prototype.getSecret = function(e) {
        return n(this._secret, "KeyPair is public only"), r.encode(this.secret(), e)
    }, s.prototype.getPublic = function(e) {
        return r.encode(this.pubBytes(), e)
    }, e.exports = s
}, function(e, t, i) {
    var r = i(114),
        n = i(133).Buffer,
        o = i(49),
        a = i(39),
        s = i(63),
        d = i(107),
        u = i(19);

    function f(e, t, i, a) {
        o.call(this);
        var d = n.alloc(4, 0);
        this._cipher = new r.AES(t);
        var f = this._cipher.encryptBlock(d);
        this._ghash = new s(f), i = function(e, t, i) {
            if (12 === t.length) return e._finID = n.concat([t, n.from([0, 0, 0, 1])]), n.concat([t, n.from([0, 0, 0, 2])]);
            var r = new s(i),
                o = t.length,
                a = o % 16;
            r.update(t), a && (a = 16 - a, r.update(n.alloc(a, 0))), r.update(n.alloc(8, 0));
            var d = 8 * o,
                f = n.alloc(8);
            f.writeUIntBE(d, 0, 8), r.update(f), e._finID = r.state;
            var c = n.from(e._finID);
            return u(c), c
        }(this, i, f), this._prev = n.from(i), this._cache = n.allocUnsafe(0), this._secCache = n.allocUnsafe(0), this._decrypt = a, this._alen = 0, this._len = 0, this._mode = e, this._authTag = null, this._called = !1
    }
    a(f, o), f.prototype._update = function(e) {
        if (!this._called && this._alen) {
            var t = 16 - this._alen % 16;
            t < 16 && (t = n.alloc(t, 0), this._ghash.update(t))
        }
        this._called = !0;
        var i = this._mode.encrypt(this, e);
        return this._decrypt ? this._ghash.update(e) : this._ghash.update(i), this._len += e.length, i
    }, f.prototype._final = function() {
        if (this._decrypt && !this._authTag) throw new Error("Unsupported state or unable to authenticate data");
        var e = d(this._ghash.final(8 * this._alen, 8 * this._len), this._cipher.encryptBlock(this._finID));
        if (this._decrypt && function(e, t) {
                var i = 0;
                e.length !== t.length && i++;
                for (var r = Math.min(e.length, t.length), n = 0; n < r; ++n) i += e[n] ^ t[n];
                return i
            }(e, this._authTag)) throw new Error("Unsupported state or unable to authenticate data");
        this._authTag = e, this._cipher.scrub()
    }, f.prototype.getAuthTag = function() {
        if (this._decrypt || !n.isBuffer(this._authTag)) throw new Error("Attempting to get auth tag in unsupported state");
        return this._authTag
    }, f.prototype.setAuthTag = function(e) {
        if (!this._decrypt) throw new Error("Attempting to set auth tag in unsupported state");
        this._authTag = e
    }, f.prototype.setAAD = function(e) {
        if (this._called) throw new Error("Attempting to set AAD in unsupported state");
        this._ghash.update(e), this._alen += e.length
    }, e.exports = f
}, function(e, t, i) {
    e.exports = i(102).PassThrough
}, function(e, t, i) {
    "use strict";
    var r = i(119);
    t.certificate = i(14);
    var n = r.define("RSAPrivateKey", function() {
        this.seq().obj(this.key("version").int(), this.key("modulus").int(), this.key("publicExponent").int(), this.key("privateExponent").int(), this.key("prime1").int(), this.key("prime2").int(), this.key("exponent1").int(), this.key("exponent2").int(), this.key("coefficient").int())
    });
    t.RSAPrivateKey = n;
    var o = r.define("RSAPublicKey", function() {
        this.seq().obj(this.key("modulus").int(), this.key("publicExponent").int())
    });
    t.RSAPublicKey = o;
    var a = r.define("SubjectPublicKeyInfo", function() {
        this.seq().obj(this.key("algorithm").use(s), this.key("subjectPublicKey").bitstr())
    });
    t.PublicKey = a;
    var s = r.define("AlgorithmIdentifier", function() {
            this.seq().obj(this.key("algorithm").objid(), this.key("none").null_().optional(), this.key("curve").objid().optional(), this.key("params").seq().obj(this.key("p").int(), this.key("q").int(), this.key("g").int()).optional())
        }),
        d = r.define("PrivateKeyInfo", function() {
            this.seq().obj(this.key("version").int(), this.key("algorithm").use(s), this.key("subjectPrivateKey").octstr())
        });
    t.PrivateKey = d;
    var u = r.define("EncryptedPrivateKeyInfo", function() {
        this.seq().obj(this.key("algorithm").seq().obj(this.key("id").objid(), this.key("decrypt").seq().obj(this.key("kde").seq().obj(this.key("id").objid(), this.key("kdeparams").seq().obj(this.key("salt").octstr(), this.key("iters").int())), this.key("cipher").seq().obj(this.key("algo").objid(), this.key("iv").octstr()))), this.key("subjectPrivateKey").octstr())
    });
    t.EncryptedPrivateKey = u;
    var f = r.define("DSAPrivateKey", function() {
        this.seq().obj(this.key("version").int(), this.key("p").int(), this.key("q").int(), this.key("g").int(), this.key("pub_key").int(), this.key("priv_key").int())
    });
    t.DSAPrivateKey = f, t.DSAparam = r.define("DSAparam", function() {
        this.int()
    });
    var c = r.define("ECPrivateKey", function() {
        this.seq().obj(this.key("version").int(), this.key("privateKey").octstr(), this.key("parameters").optional().explicit(0).use(l), this.key("publicKey").optional().explicit(1).bitstr())
    });
    t.ECPrivateKey = c;
    var l = r.define("ECParameters", function() {
        this.choice({
            namedCurve: this.objid()
        })
    });
    t.signature = r.define("signature", function() {
        this.seq().obj(this.key("r").int(), this.key("s").int())
    })
}, function(e, t) {
    function i() {
        this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
    }

    function r(e) {
        return "function" == typeof e
    }

    function n(e) {
        return "object" == typeof e && null !== e
    }

    function o(e) {
        return void 0 === e
    }
    e.exports = i, i.EventEmitter = i, i.prototype._events = void 0, i.prototype._maxListeners = void 0, i.defaultMaxListeners = 10, i.prototype.setMaxListeners = function(e) {
        if ("number" != typeof e || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
        return this._maxListeners = e, this
    }, i.prototype.emit = function(e) {
        var t, i, a, s, d, u;
        if (this._events || (this._events = {}), "error" === e && (!this._events.error || n(this._events.error) && !this._events.error.length)) {
            if ((t = arguments[1]) instanceof Error) throw t;
            var f = new Error('Uncaught, unspecified "error" event. (' + t + ")");
            throw f.context = t, f
        }
        if (o(i = this._events[e])) return !1;
        if (r(i)) switch (arguments.length) {
            case 1:
                i.call(this);
                break;
            case 2:
                i.call(this, arguments[1]);
                break;
            case 3:
                i.call(this, arguments[1], arguments[2]);
                break;
            default:
                s = Array.prototype.slice.call(arguments, 1), i.apply(this, s)
        } else if (n(i))
            for (s = Array.prototype.slice.call(arguments, 1), a = (u = i.slice()).length, d = 0; d < a; d++) u[d].apply(this, s);
        return !0
    }, i.prototype.addListener = function(e, t) {
        var a;
        if (!r(t)) throw TypeError("listener must be a function");
        return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, r(t.listener) ? t.listener : t), this._events[e] ? n(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, n(this._events[e]) && !this._events[e].warned && (a = o(this._maxListeners) ? i.defaultMaxListeners : this._maxListeners) && a > 0 && this._events[e].length > a && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace()), this
    }, i.prototype.on = i.prototype.addListener, i.prototype.once = function(e, t) {
        if (!r(t)) throw TypeError("listener must be a function");
        var i = !1;

        function n() {
            this.removeListener(e, n), i || (i = !0, t.apply(this, arguments))
        }
        return n.listener = t, this.on(e, n), this
    }, i.prototype.removeListener = function(e, t) {
        var i, o, a, s;
        if (!r(t)) throw TypeError("listener must be a function");
        if (!this._events || !this._events[e]) return this;
        if (a = (i = this._events[e]).length, o = -1, i === t || r(i.listener) && i.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
        else if (n(i)) {
            for (s = a; s-- > 0;)
                if (i[s] === t || i[s].listener && i[s].listener === t) {
                    o = s;
                    break
                }
            if (o < 0) return this;
            1 === i.length ? (i.length = 0, delete this._events[e]) : i.splice(o, 1), this._events.removeListener && this.emit("removeListener", e, t)
        }
        return this
    }, i.prototype.removeAllListeners = function(e) {
        var t, i;
        if (!this._events) return this;
        if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
        if (0 === arguments.length) {
            for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
            return this.removeAllListeners("removeListener"), this._events = {}, this
        }
        if (r(i = this._events[e])) this.removeListener(e, i);
        else if (i)
            for (; i.length;) this.removeListener(e, i[i.length - 1]);
        return delete this._events[e], this
    }, i.prototype.listeners = function(e) {
        return this._events && this._events[e] ? r(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
    }, i.prototype.listenerCount = function(e) {
        if (this._events) {
            var t = this._events[e];
            if (r(t)) return 1;
            if (t) return t.length
        }
        return 0
    }, i.listenerCount = function(e, t) {
        return e.listenerCount(t)
    }
}, function(e, t, i) {
    (function(t) {
        var r = i(61),
            n = i(105);
        e.exports = function(e) {
            return new a(e)
        };
        var o = {
            secp256k1: {
                name: "secp256k1",
                byteLength: 32
            },
            secp224r1: {
                name: "p224",
                byteLength: 28
            },
            prime256v1: {
                name: "p256",
                byteLength: 32
            },
            prime192v1: {
                name: "p192",
                byteLength: 24
            },
            ed25519: {
                name: "ed25519",
                byteLength: 32
            },
            secp384r1: {
                name: "p384",
                byteLength: 48
            },
            secp521r1: {
                name: "p521",
                byteLength: 66
            }
        };

        function a(e) {
            this.curveType = o[e], this.curveType || (this.curveType = {
                name: e
            }), this.curve = new r.ec(this.curveType.name), this.keys = void 0
        }

        function s(e, i, r) {
            Array.isArray(e) || (e = e.toArray());
            var n = new t(e);
            if (r && n.length < r) {
                var o = new t(r - n.length);
                o.fill(0), n = t.concat([o, n])
            }
            return i ? n.toString(i) : n
        }
        o.p224 = o.secp224r1, o.p256 = o.secp256r1 = o.prime256v1, o.p192 = o.secp192r1 = o.prime192v1, o.p384 = o.secp384r1, o.p521 = o.secp521r1, a.prototype.generateKeys = function(e, t) {
            return this.keys = this.curve.genKeyPair(), this.getPublicKey(e, t)
        }, a.prototype.computeSecret = function(e, i, r) {
            return i = i || "utf8", t.isBuffer(e) || (e = new t(e, i)), s(this.curve.keyFromPublic(e).getPublic().mul(this.keys.getPrivate()).getX(), r, this.curveType.byteLength)
        }, a.prototype.getPublicKey = function(e, t) {
            var i = this.keys.getPublic("compressed" === t, !0);
            return "hybrid" === t && (i[i.length - 1] % 2 ? i[0] = 7 : i[0] = 6), s(i, e)
        }, a.prototype.getPrivateKey = function(e) {
            return s(this.keys.getPrivate(), e)
        }, a.prototype.setPublicKey = function(e, i) {
            return i = i || "utf8", t.isBuffer(e) || (e = new t(e, i)), this.keys._importPublic(e), this
        }, a.prototype.setPrivateKey = function(e, i) {
            i = i || "utf8", t.isBuffer(e) || (e = new t(e, i));
            var r = new n(e);
            return r = r.toString(16), this.keys = this.curve.genKeyPair(), this.keys._importPrivate(r), this
        }
    }).call(this, i(11).Buffer)
}, function(e, t, i) {
    "use strict";
    (function(t, r, n) {
        var o = i(101);

        function a(e) {
            var t = this;
            this.next = null, this.entry = null, this.finish = function() {
                ! function(e, t, i) {
                    var r = e.entry;
                    e.entry = null;
                    for (; r;) {
                        var n = r.callback;
                        t.pendingcb--, n(i), r = r.next
                    }
                    t.corkedRequestsFree ? t.corkedRequestsFree.next = e : t.corkedRequestsFree = e
                }(t, e)
            }
        }
        e.exports = g;
        var s, d = !t.browser && ["v0.10", "v0.9."].indexOf(t.version.slice(0, 5)) > -1 ? r : o.nextTick;
        g.WritableState = b;
        var u = i(9);
        u.inherits = i(39);
        var f = {
                deprecate: i(34)
            },
            c = i(3),
            l = i(133).Buffer,
            h = n.Uint8Array || function() {};
        var p, _ = i(135);

        function y() {}

        function b(e, t) {
            s = s || i(166), e = e || {};
            var r = t instanceof s;
            this.objectMode = !!e.objectMode, r && (this.objectMode = this.objectMode || !!e.writableObjectMode);
            var n = e.highWaterMark,
                u = e.writableHighWaterMark,
                f = this.objectMode ? 16 : 16384;
            this.highWaterMark = n || 0 === n ? n : r && (u || 0 === u) ? u : f, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
            var c = !1 === e.decodeStrings;
            this.decodeStrings = !c, this.defaultEncoding = e.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(e) {
                ! function(e, t) {
                    var i = e._writableState,
                        r = i.sync,
                        n = i.writecb;
                    if (function(e) {
                            e.writing = !1, e.writecb = null, e.length -= e.writelen, e.writelen = 0
                        }(i), t) ! function(e, t, i, r, n) {
                        --t.pendingcb, i ? (o.nextTick(n, r), o.nextTick(P, e, t), e._writableState.errorEmitted = !0, e.emit("error", r)) : (n(r), e._writableState.errorEmitted = !0, e.emit("error", r), P(e, t))
                    }(e, i, r, t, n);
                    else {
                        var a = w(i);
                        a || i.corked || i.bufferProcessing || !i.bufferedRequest || A(e, i), r ? d(m, e, i, a, n) : m(e, i, a, n)
                    }
                }(t, e)
            }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new a(this)
        }

        function g(e) {
            if (s = s || i(166), !(p.call(g, this) || this instanceof s)) return new g(e);
            this._writableState = new b(e, this), this.writable = !0, e && ("function" == typeof e.write && (this._write = e.write), "function" == typeof e.writev && (this._writev = e.writev), "function" == typeof e.destroy && (this._destroy = e.destroy), "function" == typeof e.final && (this._final = e.final)), c.call(this)
        }

        function v(e, t, i, r, n, o, a) {
            t.writelen = r, t.writecb = a, t.writing = !0, t.sync = !0, i ? e._writev(n, t.onwrite) : e._write(n, o, t.onwrite), t.sync = !1
        }

        function m(e, t, i, r) {
            i || function(e, t) {
                0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain"))
            }(e, t), t.pendingcb--, r(), P(e, t)
        }

        function A(e, t) {
            t.bufferProcessing = !0;
            var i = t.bufferedRequest;
            if (e._writev && i && i.next) {
                var r = t.bufferedRequestCount,
                    n = new Array(r),
                    o = t.corkedRequestsFree;
                o.entry = i;
                for (var s = 0, d = !0; i;) n[s] = i, i.isBuf || (d = !1), i = i.next, s += 1;
                n.allBuffers = d, v(e, t, !0, t.length, n, "", o.finish), t.pendingcb++, t.lastBufferedRequest = null, o.next ? (t.corkedRequestsFree = o.next, o.next = null) : t.corkedRequestsFree = new a(t), t.bufferedRequestCount = 0
            } else {
                for (; i;) {
                    var u = i.chunk,
                        f = i.encoding,
                        c = i.callback;
                    if (v(e, t, !1, t.objectMode ? 1 : u.length, u, f, c), i = i.next, t.bufferedRequestCount--, t.writing) break
                }
                null === i && (t.lastBufferedRequest = null)
            }
            t.bufferedRequest = i, t.bufferProcessing = !1
        }

        function w(e) {
            return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing
        }

        function E(e, t) {
            e._final(function(i) {
                t.pendingcb--, i && e.emit("error", i), t.prefinished = !0, e.emit("prefinish"), P(e, t)
            })
        }

        function P(e, t) {
            var i = w(t);
            return i && (! function(e, t) {
                t.prefinished || t.finalCalled || ("function" == typeof e._final ? (t.pendingcb++, t.finalCalled = !0, o.nextTick(E, e, t)) : (t.prefinished = !0, e.emit("prefinish")))
            }(e, t), 0 === t.pendingcb && (t.finished = !0, e.emit("finish"))), i
        }
        u.inherits(g, c), b.prototype.getBuffer = function() {
                for (var e = this.bufferedRequest, t = []; e;) t.push(e), e = e.next;
                return t
            },
            function() {
                try {
                    Object.defineProperty(b.prototype, "buffer", {
                        get: f.deprecate(function() {
                            return this.getBuffer()
                        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                    })
                } catch (e) {}
            }(), "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (p = Function.prototype[Symbol.hasInstance], Object.defineProperty(g, Symbol.hasInstance, {
                value: function(e) {
                    return !!p.call(this, e) || this === g && (e && e._writableState instanceof b)
                }
            })) : p = function(e) {
                return e instanceof this
            }, g.prototype.pipe = function() {
                this.emit("error", new Error("Cannot pipe, not readable"))
            }, g.prototype.write = function(e, t, i) {
                var r, n = this._writableState,
                    a = !1,
                    s = !n.objectMode && (r = e, l.isBuffer(r) || r instanceof h);
                return s && !l.isBuffer(e) && (e = function(e) {
                    return l.from(e)
                }(e)), "function" == typeof t && (i = t, t = null), s ? t = "buffer" : t || (t = n.defaultEncoding), "function" != typeof i && (i = y), n.ended ? function(e, t) {
                    var i = new Error("write after end");
                    e.emit("error", i), o.nextTick(t, i)
                }(this, i) : (s || function(e, t, i, r) {
                    var n = !0,
                        a = !1;
                    return null === i ? a = new TypeError("May not write null values to stream") : "string" == typeof i || void 0 === i || t.objectMode || (a = new TypeError("Invalid non-string/buffer chunk")), a && (e.emit("error", a), o.nextTick(r, a), n = !1), n
                }(this, n, e, i)) && (n.pendingcb++, a = function(e, t, i, r, n, o) {
                    if (!i) {
                        var a = function(e, t, i) {
                            e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = l.from(t, i));
                            return t
                        }(t, r, n);
                        r !== a && (i = !0, n = "buffer", r = a)
                    }
                    var s = t.objectMode ? 1 : r.length;
                    t.length += s;
                    var d = t.length < t.highWaterMark;
                    d || (t.needDrain = !0);
                    if (t.writing || t.corked) {
                        var u = t.lastBufferedRequest;
                        t.lastBufferedRequest = {
                            chunk: r,
                            encoding: n,
                            isBuf: i,
                            callback: o,
                            next: null
                        }, u ? u.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest, t.bufferedRequestCount += 1
                    } else v(e, t, !1, s, r, n, o);
                    return d
                }(this, n, s, e, t, i)), a
            }, g.prototype.cork = function() {
                this._writableState.corked++
            }, g.prototype.uncork = function() {
                var e = this._writableState;
                e.corked && (e.corked--, e.writing || e.corked || e.finished || e.bufferProcessing || !e.bufferedRequest || A(this, e))
            }, g.prototype.setDefaultEncoding = function(e) {
                if ("string" == typeof e && (e = e.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + e);
                return this._writableState.defaultEncoding = e, this
            }, Object.defineProperty(g.prototype, "writableHighWaterMark", {
                enumerable: !1,
                get: function() {
                    return this._writableState.highWaterMark
                }
            }), g.prototype._write = function(e, t, i) {
                i(new Error("_write() is not implemented"))
            }, g.prototype._writev = null, g.prototype.end = function(e, t, i) {
                var r = this._writableState;
                "function" == typeof e ? (i = e, e = null, t = null) : "function" == typeof t && (i = t, t = null), null !== e && void 0 !== e && this.write(e, t), r.corked && (r.corked = 1, this.uncork()), r.ending || r.finished || function(e, t, i) {
                    t.ending = !0, P(e, t), i && (t.finished ? o.nextTick(i) : e.once("finish", i));
                    t.ended = !0, e.writable = !1
                }(this, r, i)
            }, Object.defineProperty(g.prototype, "destroyed", {
                get: function() {
                    return void 0 !== this._writableState && this._writableState.destroyed
                },
                set: function(e) {
                    this._writableState && (this._writableState.destroyed = e)
                }
            }), g.prototype.destroy = _.destroy, g.prototype._undestroy = _.undestroy, g.prototype._destroy = function(e, t) {
                this.end(), t(e)
            }
    }).call(this, i(128), i(77).setImmediate, i(38))
}, function(e, t, i) {
    var r = i(133).Buffer;

    function n(e, t, i) {
        var n = e._cipher.encryptBlock(e._prev)[0] ^ t;
        return e._prev = r.concat([e._prev.slice(1), r.from([i ? t : n])]), n
    }
    t.encrypt = function(e, t, i) {
        for (var o = t.length, a = r.allocUnsafe(o), s = -1; ++s < o;) a[s] = n(e, t[s], i);
        return a
    }
}, function(e, t, i) {
    "use strict";
    var r = i(142),
        n = i(61),
        o = i(105),
        a = i(39),
        s = r.base,
        d = n.utils.assert;

    function u(e) {
        s.call(this, "short", e), this.a = new o(e.a, 16).toRed(this.red), this.b = new o(e.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = 0 === this.a.fromRed().cmpn(0), this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3), this.endo = this._getEndomorphism(e), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4)
    }

    function f(e, t, i, r) {
        s.BasePoint.call(this, e, "affine"), null === t && null === i ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new o(t, 16), this.y = new o(i, 16), r && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1)
    }

    function c(e, t, i, r) {
        s.BasePoint.call(this, e, "jacobian"), null === t && null === i && null === r ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new o(0)) : (this.x = new o(t, 16), this.y = new o(i, 16), this.z = new o(r, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one
    }
    a(u, s), e.exports = u, u.prototype._getEndomorphism = function(e) {
        if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
            var t, i;
            if (e.beta) t = new o(e.beta, 16).toRed(this.red);
            else {
                var r = this._getEndoRoots(this.p);
                t = (t = r[0].cmp(r[1]) < 0 ? r[0] : r[1]).toRed(this.red)
            }
            if (e.lambda) i = new o(e.lambda, 16);
            else {
                var n = this._getEndoRoots(this.n);
                0 === this.g.mul(n[0]).x.cmp(this.g.x.redMul(t)) ? i = n[0] : (i = n[1], d(0 === this.g.mul(i).x.cmp(this.g.x.redMul(t))))
            }
            return {
                beta: t,
                lambda: i,
                basis: e.basis ? e.basis.map(function(e) {
                    return {
                        a: new o(e.a, 16),
                        b: new o(e.b, 16)
                    }
                }) : this._getEndoBasis(i)
            }
        }
    }, u.prototype._getEndoRoots = function(e) {
        var t = e === this.p ? this.red : o.mont(e),
            i = new o(2).toRed(t).redInvm(),
            r = i.redNeg(),
            n = new o(3).toRed(t).redNeg().redSqrt().redMul(i);
        return [r.redAdd(n).fromRed(), r.redSub(n).fromRed()]
    }, u.prototype._getEndoBasis = function(e) {
        for (var t, i, r, n, a, s, d, u, f, c = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), l = e, h = this.n.clone(), p = new o(1), _ = new o(0), y = new o(0), b = new o(1), g = 0; 0 !== l.cmpn(0);) {
            var v = h.div(l);
            u = h.sub(v.mul(l)), f = y.sub(v.mul(p));
            var m = b.sub(v.mul(_));
            if (!r && u.cmp(c) < 0) t = d.neg(), i = p, r = u.neg(), n = f;
            else if (r && 2 == ++g) break;
            d = u, h = l, l = u, y = p, p = f, b = _, _ = m
        }
        a = u.neg(), s = f;
        var A = r.sqr().add(n.sqr());
        return a.sqr().add(s.sqr()).cmp(A) >= 0 && (a = t, s = i), r.negative && (r = r.neg(), n = n.neg()), a.negative && (a = a.neg(), s = s.neg()), [{
            a: r,
            b: n
        }, {
            a: a,
            b: s
        }]
    }, u.prototype._endoSplit = function(e) {
        var t = this.endo.basis,
            i = t[0],
            r = t[1],
            n = r.b.mul(e).divRound(this.n),
            o = i.b.neg().mul(e).divRound(this.n),
            a = n.mul(i.a),
            s = o.mul(r.a),
            d = n.mul(i.b),
            u = o.mul(r.b);
        return {
            k1: e.sub(a).sub(s),
            k2: d.add(u).neg()
        }
    }, u.prototype.pointFromX = function(e, t) {
        (e = new o(e, 16)).red || (e = e.toRed(this.red));
        var i = e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b),
            r = i.redSqrt();
        if (0 !== r.redSqr().redSub(i).cmp(this.zero)) throw new Error("invalid point");
        var n = r.fromRed().isOdd();
        return (t && !n || !t && n) && (r = r.redNeg()), this.point(e, r)
    }, u.prototype.validate = function(e) {
        if (e.inf) return !0;
        var t = e.x,
            i = e.y,
            r = this.a.redMul(t),
            n = t.redSqr().redMul(t).redIAdd(r).redIAdd(this.b);
        return 0 === i.redSqr().redISub(n).cmpn(0)
    }, u.prototype._endoWnafMulAdd = function(e, t, i) {
        for (var r = this._endoWnafT1, n = this._endoWnafT2, o = 0; o < e.length; o++) {
            var a = this._endoSplit(t[o]),
                s = e[o],
                d = s._getBeta();
            a.k1.negative && (a.k1.ineg(), s = s.neg(!0)), a.k2.negative && (a.k2.ineg(), d = d.neg(!0)), r[2 * o] = s, r[2 * o + 1] = d, n[2 * o] = a.k1, n[2 * o + 1] = a.k2
        }
        for (var u = this._wnafMulAdd(1, r, n, 2 * o, i), f = 0; f < 2 * o; f++) r[f] = null, n[f] = null;
        return u
    }, a(f, s.BasePoint), u.prototype.point = function(e, t, i) {
        return new f(this, e, t, i)
    }, u.prototype.pointFromJSON = function(e, t) {
        return f.fromJSON(this, e, t)
    }, f.prototype._getBeta = function() {
        if (this.curve.endo) {
            var e = this.precomputed;
            if (e && e.beta) return e.beta;
            var t = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
            if (e) {
                var i = this.curve,
                    r = function(e) {
                        return i.point(e.x.redMul(i.endo.beta), e.y)
                    };
                e.beta = t, t.precomputed = {
                    beta: null,
                    naf: e.naf && {
                        wnd: e.naf.wnd,
                        points: e.naf.points.map(r)
                    },
                    doubles: e.doubles && {
                        step: e.doubles.step,
                        points: e.doubles.points.map(r)
                    }
                }
            }
            return t
        }
    }, f.prototype.toJSON = function() {
        return this.precomputed ? [this.x, this.y, this.precomputed && {
            doubles: this.precomputed.doubles && {
                step: this.precomputed.doubles.step,
                points: this.precomputed.doubles.points.slice(1)
            },
            naf: this.precomputed.naf && {
                wnd: this.precomputed.naf.wnd,
                points: this.precomputed.naf.points.slice(1)
            }
        }] : [this.x, this.y]
    }, f.fromJSON = function(e, t, i) {
        "string" == typeof t && (t = JSON.parse(t));
        var r = e.point(t[0], t[1], i);
        if (!t[2]) return r;

        function n(t) {
            return e.point(t[0], t[1], i)
        }
        var o = t[2];
        return r.precomputed = {
            beta: null,
            doubles: o.doubles && {
                step: o.doubles.step,
                points: [r].concat(o.doubles.points.map(n))
            },
            naf: o.naf && {
                wnd: o.naf.wnd,
                points: [r].concat(o.naf.points.map(n))
            }
        }, r
    }, f.prototype.inspect = function() {
        return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">"
    }, f.prototype.isInfinity = function() {
        return this.inf
    }, f.prototype.add = function(e) {
        if (this.inf) return e;
        if (e.inf) return this;
        if (this.eq(e)) return this.dbl();
        if (this.neg().eq(e)) return this.curve.point(null, null);
        if (0 === this.x.cmp(e.x)) return this.curve.point(null, null);
        var t = this.y.redSub(e.y);
        0 !== t.cmpn(0) && (t = t.redMul(this.x.redSub(e.x).redInvm()));
        var i = t.redSqr().redISub(this.x).redISub(e.x),
            r = t.redMul(this.x.redSub(i)).redISub(this.y);
        return this.curve.point(i, r)
    }, f.prototype.dbl = function() {
        if (this.inf) return this;
        var e = this.y.redAdd(this.y);
        if (0 === e.cmpn(0)) return this.curve.point(null, null);
        var t = this.curve.a,
            i = this.x.redSqr(),
            r = e.redInvm(),
            n = i.redAdd(i).redIAdd(i).redIAdd(t).redMul(r),
            o = n.redSqr().redISub(this.x.redAdd(this.x)),
            a = n.redMul(this.x.redSub(o)).redISub(this.y);
        return this.curve.point(o, a)
    }, f.prototype.getX = function() {
        return this.x.fromRed()
    }, f.prototype.getY = function() {
        return this.y.fromRed()
    }, f.prototype.mul = function(e) {
        return e = new o(e, 16), this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [e]) : this.curve._wnafMul(this, e)
    }, f.prototype.mulAdd = function(e, t, i) {
        var r = [this, t],
            n = [e, i];
        return this.curve.endo ? this.curve._endoWnafMulAdd(r, n) : this.curve._wnafMulAdd(1, r, n, 2)
    }, f.prototype.jmulAdd = function(e, t, i) {
        var r = [this, t],
            n = [e, i];
        return this.curve.endo ? this.curve._endoWnafMulAdd(r, n, !0) : this.curve._wnafMulAdd(1, r, n, 2, !0)
    }, f.prototype.eq = function(e) {
        return this === e || this.inf === e.inf && (this.inf || 0 === this.x.cmp(e.x) && 0 === this.y.cmp(e.y))
    }, f.prototype.neg = function(e) {
        if (this.inf) return this;
        var t = this.curve.point(this.x, this.y.redNeg());
        if (e && this.precomputed) {
            var i = this.precomputed,
                r = function(e) {
                    return e.neg()
                };
            t.precomputed = {
                naf: i.naf && {
                    wnd: i.naf.wnd,
                    points: i.naf.points.map(r)
                },
                doubles: i.doubles && {
                    step: i.doubles.step,
                    points: i.doubles.points.map(r)
                }
            }
        }
        return t
    }, f.prototype.toJ = function() {
        return this.inf ? this.curve.jpoint(null, null, null) : this.curve.jpoint(this.x, this.y, this.curve.one)
    }, a(c, s.BasePoint), u.prototype.jpoint = function(e, t, i) {
        return new c(this, e, t, i)
    }, c.prototype.toP = function() {
        if (this.isInfinity()) return this.curve.point(null, null);
        var e = this.z.redInvm(),
            t = e.redSqr(),
            i = this.x.redMul(t),
            r = this.y.redMul(t).redMul(e);
        return this.curve.point(i, r)
    }, c.prototype.neg = function() {
        return this.curve.jpoint(this.x, this.y.redNeg(), this.z)
    }, c.prototype.add = function(e) {
        if (this.isInfinity()) return e;
        if (e.isInfinity()) return this;
        var t = e.z.redSqr(),
            i = this.z.redSqr(),
            r = this.x.redMul(t),
            n = e.x.redMul(i),
            o = this.y.redMul(t.redMul(e.z)),
            a = e.y.redMul(i.redMul(this.z)),
            s = r.redSub(n),
            d = o.redSub(a);
        if (0 === s.cmpn(0)) return 0 !== d.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
        var u = s.redSqr(),
            f = u.redMul(s),
            c = r.redMul(u),
            l = d.redSqr().redIAdd(f).redISub(c).redISub(c),
            h = d.redMul(c.redISub(l)).redISub(o.redMul(f)),
            p = this.z.redMul(e.z).redMul(s);
        return this.curve.jpoint(l, h, p)
    }, c.prototype.mixedAdd = function(e) {
        if (this.isInfinity()) return e.toJ();
        if (e.isInfinity()) return this;
        var t = this.z.redSqr(),
            i = this.x,
            r = e.x.redMul(t),
            n = this.y,
            o = e.y.redMul(t).redMul(this.z),
            a = i.redSub(r),
            s = n.redSub(o);
        if (0 === a.cmpn(0)) return 0 !== s.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
        var d = a.redSqr(),
            u = d.redMul(a),
            f = i.redMul(d),
            c = s.redSqr().redIAdd(u).redISub(f).redISub(f),
            l = s.redMul(f.redISub(c)).redISub(n.redMul(u)),
            h = this.z.redMul(a);
        return this.curve.jpoint(c, l, h)
    }, c.prototype.dblp = function(e) {
        if (0 === e) return this;
        if (this.isInfinity()) return this;
        if (!e) return this.dbl();
        if (this.curve.zeroA || this.curve.threeA) {
            for (var t = this, i = 0; i < e; i++) t = t.dbl();
            return t
        }
        var r = this.curve.a,
            n = this.curve.tinv,
            o = this.x,
            a = this.y,
            s = this.z,
            d = s.redSqr().redSqr(),
            u = a.redAdd(a);
        for (i = 0; i < e; i++) {
            var f = o.redSqr(),
                c = u.redSqr(),
                l = c.redSqr(),
                h = f.redAdd(f).redIAdd(f).redIAdd(r.redMul(d)),
                p = o.redMul(c),
                _ = h.redSqr().redISub(p.redAdd(p)),
                y = p.redISub(_),
                b = h.redMul(y);
            b = b.redIAdd(b).redISub(l);
            var g = u.redMul(s);
            i + 1 < e && (d = d.redMul(l)), o = _, s = g, u = b
        }
        return this.curve.jpoint(o, u.redMul(n), s)
    }, c.prototype.dbl = function() {
        return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl()
    }, c.prototype._zeroDbl = function() {
        var e, t, i;
        if (this.zOne) {
            var r = this.x.redSqr(),
                n = this.y.redSqr(),
                o = n.redSqr(),
                a = this.x.redAdd(n).redSqr().redISub(r).redISub(o);
            a = a.redIAdd(a);
            var s = r.redAdd(r).redIAdd(r),
                d = s.redSqr().redISub(a).redISub(a),
                u = o.redIAdd(o);
            u = (u = u.redIAdd(u)).redIAdd(u), e = d, t = s.redMul(a.redISub(d)).redISub(u), i = this.y.redAdd(this.y)
        } else {
            var f = this.x.redSqr(),
                c = this.y.redSqr(),
                l = c.redSqr(),
                h = this.x.redAdd(c).redSqr().redISub(f).redISub(l);
            h = h.redIAdd(h);
            var p = f.redAdd(f).redIAdd(f),
                _ = p.redSqr(),
                y = l.redIAdd(l);
            y = (y = y.redIAdd(y)).redIAdd(y), e = _.redISub(h).redISub(h), t = p.redMul(h.redISub(e)).redISub(y), i = (i = this.y.redMul(this.z)).redIAdd(i)
        }
        return this.curve.jpoint(e, t, i)
    }, c.prototype._threeDbl = function() {
        var e, t, i;
        if (this.zOne) {
            var r = this.x.redSqr(),
                n = this.y.redSqr(),
                o = n.redSqr(),
                a = this.x.redAdd(n).redSqr().redISub(r).redISub(o);
            a = a.redIAdd(a);
            var s = r.redAdd(r).redIAdd(r).redIAdd(this.curve.a),
                d = s.redSqr().redISub(a).redISub(a);
            e = d;
            var u = o.redIAdd(o);
            u = (u = u.redIAdd(u)).redIAdd(u), t = s.redMul(a.redISub(d)).redISub(u), i = this.y.redAdd(this.y)
        } else {
            var f = this.z.redSqr(),
                c = this.y.redSqr(),
                l = this.x.redMul(c),
                h = this.x.redSub(f).redMul(this.x.redAdd(f));
            h = h.redAdd(h).redIAdd(h);
            var p = l.redIAdd(l),
                _ = (p = p.redIAdd(p)).redAdd(p);
            e = h.redSqr().redISub(_), i = this.y.redAdd(this.z).redSqr().redISub(c).redISub(f);
            var y = c.redSqr();
            y = (y = (y = y.redIAdd(y)).redIAdd(y)).redIAdd(y), t = h.redMul(p.redISub(e)).redISub(y)
        }
        return this.curve.jpoint(e, t, i)
    }, c.prototype._dbl = function() {
        var e = this.curve.a,
            t = this.x,
            i = this.y,
            r = this.z,
            n = r.redSqr().redSqr(),
            o = t.redSqr(),
            a = i.redSqr(),
            s = o.redAdd(o).redIAdd(o).redIAdd(e.redMul(n)),
            d = t.redAdd(t),
            u = (d = d.redIAdd(d)).redMul(a),
            f = s.redSqr().redISub(u.redAdd(u)),
            c = u.redISub(f),
            l = a.redSqr();
        l = (l = (l = l.redIAdd(l)).redIAdd(l)).redIAdd(l);
        var h = s.redMul(c).redISub(l),
            p = i.redAdd(i).redMul(r);
        return this.curve.jpoint(f, h, p)
    }, c.prototype.trpl = function() {
        if (!this.curve.zeroA) return this.dbl().add(this);
        var e = this.x.redSqr(),
            t = this.y.redSqr(),
            i = this.z.redSqr(),
            r = t.redSqr(),
            n = e.redAdd(e).redIAdd(e),
            o = n.redSqr(),
            a = this.x.redAdd(t).redSqr().redISub(e).redISub(r),
            s = (a = (a = (a = a.redIAdd(a)).redAdd(a).redIAdd(a)).redISub(o)).redSqr(),
            d = r.redIAdd(r);
        d = (d = (d = d.redIAdd(d)).redIAdd(d)).redIAdd(d);
        var u = n.redIAdd(a).redSqr().redISub(o).redISub(s).redISub(d),
            f = t.redMul(u);
        f = (f = f.redIAdd(f)).redIAdd(f);
        var c = this.x.redMul(s).redISub(f);
        c = (c = c.redIAdd(c)).redIAdd(c);
        var l = this.y.redMul(u.redMul(d.redISub(u)).redISub(a.redMul(s)));
        l = (l = (l = l.redIAdd(l)).redIAdd(l)).redIAdd(l);
        var h = this.z.redAdd(a).redSqr().redISub(i).redISub(s);
        return this.curve.jpoint(c, l, h)
    }, c.prototype.mul = function(e, t) {
        return e = new o(e, t), this.curve._wnafMul(this, e)
    }, c.prototype.eq = function(e) {
        if ("affine" === e.type) return this.eq(e.toJ());
        if (this === e) return !0;
        var t = this.z.redSqr(),
            i = e.z.redSqr();
        if (0 !== this.x.redMul(i).redISub(e.x.redMul(t)).cmpn(0)) return !1;
        var r = t.redMul(this.z),
            n = i.redMul(e.z);
        return 0 === this.y.redMul(n).redISub(e.y.redMul(r)).cmpn(0)
    }, c.prototype.eqXToP = function(e) {
        var t = this.z.redSqr(),
            i = e.toRed(this.curve.red).redMul(t);
        if (0 === this.x.cmp(i)) return !0;
        for (var r = e.clone(), n = this.curve.redN.redMul(t);;) {
            if (r.iadd(this.curve.n), r.cmp(this.curve.p) >= 0) return !1;
            if (i.redIAdd(n), 0 === this.x.cmp(i)) return !0
        }
        return !1
    }, c.prototype.inspect = function() {
        return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">"
    }, c.prototype.isInfinity = function() {
        return 0 === this.z.cmpn(0)
    }
}, function(e, t, i) {
    var r = {
            ECB: i(160),
            CBC: i(115),
            CFB: i(163),
            CFB8: i(88),
            CFB1: i(110),
            OFB: i(127),
            CTR: i(71),
            GCM: i(71)
        },
        n = i(108);
    for (var o in n) n[o].module = r[n[o].mode];
    e.exports = n
}, function(e, t, i) {
    (function(t, r) {
        var n, o = i(98),
            a = i(62),
            s = i(15),
            d = i(133).Buffer,
            u = t.crypto && t.crypto.subtle,
            f = {
                sha: "SHA-1",
                "sha-1": "SHA-1",
                sha1: "SHA-1",
                sha256: "SHA-256",
                "sha-256": "SHA-256",
                sha384: "SHA-384",
                "sha-384": "SHA-384",
                "sha-512": "SHA-512",
                sha512: "SHA-512"
            },
            c = [];

        function l(e, t, i, r, n) {
            return u.importKey("raw", e, {
                name: "PBKDF2"
            }, !1, ["deriveBits"]).then(function(e) {
                return u.deriveBits({
                    name: "PBKDF2",
                    salt: t,
                    iterations: i,
                    hash: {
                        name: n
                    }
                }, e, r << 3)
            }).then(function(e) {
                return d.from(e)
            })
        }
        e.exports = function(e, i, h, p, _, y) {
            "function" == typeof _ && (y = _, _ = void 0);
            var b = f[(_ = _ || "sha1").toLowerCase()];
            if (!b || "function" != typeof t.Promise) return r.nextTick(function() {
                var t;
                try {
                    t = s(e, i, h, p, _)
                } catch (e) {
                    return y(e)
                }
                y(null, t)
            });
            if (o(e, i, h, p), "function" != typeof y) throw new Error("No callback provided to pbkdf2");
            d.isBuffer(e) || (e = d.from(e, a)), d.isBuffer(i) || (i = d.from(i, a)),
                function(e, t) {
                    e.then(function(e) {
                        r.nextTick(function() {
                            t(null, e)
                        })
                    }, function(e) {
                        r.nextTick(function() {
                            t(e)
                        })
                    })
                }(function(e) {
                    if (t.process && !t.process.browser) return Promise.resolve(!1);
                    if (!u || !u.importKey || !u.deriveBits) return Promise.resolve(!1);
                    if (void 0 !== c[e]) return c[e];
                    var i = l(n = n || d.alloc(8), n, 10, 128, e).then(function() {
                        return !0
                    }).catch(function() {
                        return !1
                    });
                    return c[e] = i, i
                }(b).then(function(t) {
                    return t ? l(e, i, h, p, b) : s(e, i, h, p, _)
                }), y)
        }
    }).call(this, i(38), i(128))
}, function(e, t, i) {
    var r = i(39),
        n = i(119),
        o = n.base,
        a = n.bignum,
        s = n.constants.der;

    function d(e) {
        this.enc = "der", this.name = e.name, this.entity = e, this.tree = new u, this.tree._init(e.body)
    }

    function u(e) {
        o.Node.call(this, "der", e)
    }

    function f(e, t) {
        var i = e.readUInt8(t);
        if (e.isError(i)) return i;
        var r = s.tagClass[i >> 6],
            n = 0 == (32 & i);
        if (31 == (31 & i)) {
            var o = i;
            for (i = 0; 128 == (128 & o);) {
                if (o = e.readUInt8(t), e.isError(o)) return o;
                i <<= 7, i |= 127 & o
            }
        } else i &= 31;
        return {
            cls: r,
            primitive: n,
            tag: i,
            tagStr: s.tag[i]
        }
    }

    function c(e, t, i) {
        var r = e.readUInt8(i);
        if (e.isError(r)) return r;
        if (!t && 128 === r) return null;
        if (0 == (128 & r)) return r;
        var n = 127 & r;
        if (n > 4) return e.error("length octect is too long");
        r = 0;
        for (var o = 0; o < n; o++) {
            r <<= 8;
            var a = e.readUInt8(i);
            if (e.isError(a)) return a;
            r |= a
        }
        return r
    }
    e.exports = d, d.prototype.decode = function(e, t) {
        return e instanceof o.DecoderBuffer || (e = new o.DecoderBuffer(e, t)), this.tree._decode(e, t)
    }, r(u, o.Node), u.prototype._peekTag = function(e, t, i) {
        if (e.isEmpty()) return !1;
        var r = e.save(),
            n = f(e, 'Failed to peek tag: "' + t + '"');
        return e.isError(n) ? n : (e.restore(r), n.tag === t || n.tagStr === t || n.tagStr + "of" === t || i)
    }, u.prototype._decodeTag = function(e, t, i) {
        var r = f(e, 'Failed to decode tag of "' + t + '"');
        if (e.isError(r)) return r;
        var n = c(e, r.primitive, 'Failed to get length of "' + t + '"');
        if (e.isError(n)) return n;
        if (!i && r.tag !== t && r.tagStr !== t && r.tagStr + "of" !== t) return e.error('Failed to match tag: "' + t + '"');
        if (r.primitive || null !== n) return e.skip(n, 'Failed to match body of: "' + t + '"');
        var o = e.save(),
            a = this._skipUntilEnd(e, 'Failed to skip indefinite length body: "' + this.tag + '"');
        return e.isError(a) ? a : (n = e.offset - o.offset, e.restore(o), e.skip(n, 'Failed to match body of: "' + t + '"'))
    }, u.prototype._skipUntilEnd = function(e, t) {
        for (;;) {
            var i = f(e, t);
            if (e.isError(i)) return i;
            var r, n = c(e, i.primitive, t);
            if (e.isError(n)) return n;
            if (r = i.primitive || null !== n ? e.skip(n) : this._skipUntilEnd(e, t), e.isError(r)) return r;
            if ("end" === i.tagStr) break
        }
    }, u.prototype._decodeList = function(e, t, i, r) {
        for (var n = []; !e.isEmpty();) {
            var o = this._peekTag(e, "end");
            if (e.isError(o)) return o;
            var a = i.decode(e, "der", r);
            if (e.isError(a) && o) break;
            n.push(a)
        }
        return n
    }, u.prototype._decodeStr = function(e, t) {
        if ("bitstr" === t) {
            var i = e.readUInt8();
            return e.isError(i) ? i : {
                unused: i,
                data: e.raw()
            }
        }
        if ("bmpstr" === t) {
            var r = e.raw();
            if (r.length % 2 == 1) return e.error("Decoding of string type: bmpstr length mismatch");
            for (var n = "", o = 0; o < r.length / 2; o++) n += String.fromCharCode(r.readUInt16BE(2 * o));
            return n
        }
        if ("numstr" === t) {
            var a = e.raw().toString("ascii");
            return this._isNumstr(a) ? a : e.error("Decoding of string type: numstr unsupported characters")
        }
        if ("octstr" === t) return e.raw();
        if ("objDesc" === t) return e.raw();
        if ("printstr" === t) {
            var s = e.raw().toString("ascii");
            return this._isPrintstr(s) ? s : e.error("Decoding of string type: printstr unsupported characters")
        }
        return /str$/.test(t) ? e.raw().toString() : e.error("Decoding of string type: " + t + " unsupported")
    }, u.prototype._decodeObjid = function(e, t, i) {
        for (var r, n = [], o = 0; !e.isEmpty();) {
            var a = e.readUInt8();
            o <<= 7, o |= 127 & a, 0 == (128 & a) && (n.push(o), o = 0)
        }
        128 & a && n.push(o);
        var s = n[0] / 40 | 0,
            d = n[0] % 40;
        if (r = i ? n : [s, d].concat(n.slice(1)), t) {
            var u = t[r.join(" ")];
            void 0 === u && (u = t[r.join(".")]), void 0 !== u && (r = u)
        }
        return r
    }, u.prototype._decodeTime = function(e, t) {
        var i = e.raw().toString();
        if ("gentime" === t) var r = 0 | i.slice(0, 4),
            n = 0 | i.slice(4, 6),
            o = 0 | i.slice(6, 8),
            a = 0 | i.slice(8, 10),
            s = 0 | i.slice(10, 12),
            d = 0 | i.slice(12, 14);
        else {
            if ("utctime" !== t) return e.error("Decoding " + t + " time is not supported yet");
            r = 0 | i.slice(0, 2), n = 0 | i.slice(2, 4), o = 0 | i.slice(4, 6), a = 0 | i.slice(6, 8), s = 0 | i.slice(8, 10), d = 0 | i.slice(10, 12);
            r = r < 70 ? 2e3 + r : 1900 + r
        }
        return Date.UTC(r, n - 1, o, a, s, d, 0)
    }, u.prototype._decodeNull = function(e) {
        return null
    }, u.prototype._decodeBool = function(e) {
        var t = e.readUInt8();
        return e.isError(t) ? t : 0 !== t
    }, u.prototype._decodeInt = function(e, t) {
        var i = e.raw(),
            r = new a(i);
        return t && (r = t[r.toString(10)] || r), r
    }, u.prototype._use = function(e, t) {
        return "function" == typeof e && (e = e(t)), e._getDecoder("der").tree
    }
}, function(e, t, i) {
    "use strict";
    var r = i(132).rotr32;

    function n(e, t, i) {
        return e & t ^ ~e & i
    }

    function o(e, t, i) {
        return e & t ^ e & i ^ t & i
    }

    function a(e, t, i) {
        return e ^ t ^ i
    }
    t.ft_1 = function(e, t, i, r) {
        return 0 === e ? n(t, i, r) : 1 === e || 3 === e ? a(t, i, r) : 2 === e ? o(t, i, r) : void 0
    }, t.ch32 = n, t.maj32 = o, t.p32 = a, t.s0_256 = function(e) {
        return r(e, 2) ^ r(e, 13) ^ r(e, 22)
    }, t.s1_256 = function(e) {
        return r(e, 6) ^ r(e, 11) ^ r(e, 25)
    }, t.g0_256 = function(e) {
        return r(e, 7) ^ r(e, 18) ^ e >>> 3
    }, t.g1_256 = function(e) {
        return r(e, 17) ^ r(e, 19) ^ e >>> 10
    }
}, function(e, t, i) {
    "use strict";
    var r = i(13),
        n = i(139),
        o = i(143);

    function a(e) {
        if (!(this instanceof a)) return new a(e);
        this.hash = e.hash, this.predResist = !!e.predResist, this.outLen = this.hash.outSize, this.minEntropy = e.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
        var t = n.toArray(e.entropy, e.entropyEnc || "hex"),
            i = n.toArray(e.nonce, e.nonceEnc || "hex"),
            r = n.toArray(e.pers, e.persEnc || "hex");
        o(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._init(t, i, r)
    }
    e.exports = a, a.prototype._init = function(e, t, i) {
        var r = e.concat(t).concat(i);
        this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
        for (var n = 0; n < this.V.length; n++) this.K[n] = 0, this.V[n] = 1;
        this._update(r), this._reseed = 1, this.reseedInterval = 281474976710656
    }, a.prototype._hmac = function() {
        return new r.hmac(this.hash, this.K)
    }, a.prototype._update = function(e) {
        var t = this._hmac().update(this.V).update([0]);
        e && (t = t.update(e)), this.K = t.digest(), this.V = this._hmac().update(this.V).digest(), e && (this.K = this._hmac().update(this.V).update([1]).update(e).digest(), this.V = this._hmac().update(this.V).digest())
    }, a.prototype.reseed = function(e, t, i, r) {
        "string" != typeof t && (r = i, i = t, t = null), e = n.toArray(e, t), i = n.toArray(i, r), o(e.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._update(e.concat(i || [])), this._reseed = 1
    }, a.prototype.generate = function(e, t, i, r) {
        if (this._reseed > this.reseedInterval) throw new Error("Reseed is required");
        "string" != typeof t && (r = i, i = t, t = null), i && (i = n.toArray(i, r || "hex"), this._update(i));
        for (var o = []; o.length < e;) this.V = this._hmac().update(this.V).digest(), o = o.concat(this.V);
        var a = o.slice(0, e);
        return this._update(i), this._reseed++, n.encode(a, t)
    }
}, function(e, t, i) {
    "use strict";
    var r = i(133).Buffer,
        n = i(75);
    e.exports = function() {
        function e() {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e), this.head = null, this.tail = null, this.length = 0
        }
        return e.prototype.push = function(e) {
            var t = {
                data: e,
                next: null
            };
            this.length > 0 ? this.tail.next = t : this.head = t, this.tail = t, ++this.length
        }, e.prototype.unshift = function(e) {
            var t = {
                data: e,
                next: this.head
            };
            0 === this.length && (this.tail = t), this.head = t, ++this.length
        }, e.prototype.shift = function() {
            if (0 !== this.length) {
                var e = this.head.data;
                return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, e
            }
        }, e.prototype.clear = function() {
            this.head = this.tail = null, this.length = 0
        }, e.prototype.join = function(e) {
            if (0 === this.length) return "";
            for (var t = this.head, i = "" + t.data; t = t.next;) i += e + t.data;
            return i
        }, e.prototype.concat = function(e) {
            if (0 === this.length) return r.alloc(0);
            if (1 === this.length) return this.head.data;
            for (var t, i, n, o = r.allocUnsafe(e >>> 0), a = this.head, s = 0; a;) t = a.data, i = o, n = s, t.copy(i, n), s += a.data.length, a = a.next;
            return o
        }, e
    }(), n && n.inspect && n.inspect.custom && (e.exports.prototype[n.inspect.custom] = function() {
        var e = n.inspect({
            length: this.length
        });
        return this.constructor.name + " " + e
    })
}, function(e, t, i) {
    (t = e.exports = function(e) {
        e = e.toLowerCase();
        var i = t[e];
        if (!i) throw new Error(e + " is not supported (we accept pull requests)");
        return new i
    }).sha = i(154), t.sha1 = i(124), t.sha224 = i(17), t.sha256 = i(35), t.sha384 = i(51), t.sha512 = i(25)
}, function(e, t, i) {
    var r = i(120),
        n = i(0),
        o = i(90),
        a = i(99),
        s = i(111);

    function d(e, t, i) {
        if (e = e.toLowerCase(), o[e]) return n.createCipheriv(e, t, i);
        if (a[e]) return new r({
            key: t,
            iv: i,
            mode: e
        });
        throw new TypeError("invalid suite type")
    }

    function u(e, t, i) {
        if (e = e.toLowerCase(), o[e]) return n.createDecipheriv(e, t, i);
        if (a[e]) return new r({
            key: t,
            iv: i,
            mode: e,
            decrypt: !0
        });
        throw new TypeError("invalid suite type")
    }
    t.createCipher = t.Cipher = function(e, t) {
        var i, r;
        if (e = e.toLowerCase(), o[e]) i = o[e].key, r = o[e].iv;
        else {
            if (!a[e]) throw new TypeError("invalid suite type");
            i = 8 * a[e].key, r = a[e].iv
        }
        var n = s(t, !1, i, r);
        return d(e, n.key, n.iv)
    }, t.createCipheriv = t.Cipheriv = d, t.createDecipher = t.Decipher = function(e, t) {
        var i, r;
        if (e = e.toLowerCase(), o[e]) i = o[e].key, r = o[e].iv;
        else {
            if (!a[e]) throw new TypeError("invalid suite type");
            i = 8 * a[e].key, r = a[e].iv
        }
        var n = s(t, !1, i, r);
        return u(e, n.key, n.iv)
    }, t.createDecipheriv = t.Decipheriv = u, t.listCiphers = t.getCiphers = function() {
        return Object.keys(a).concat(n.getCiphers())
    }
}, function(e, t, i) {
    (function(t) {
        var i = Math.pow(2, 30) - 1;

        function r(e, i) {
            if ("string" != typeof e && !t.isBuffer(e)) throw new TypeError(i + " must be a buffer or string")
        }
        e.exports = function(e, t, n, o) {
            if (r(e, "Password"), r(t, "Salt"), "number" != typeof n) throw new TypeError("Iterations not a number");
            if (n < 0) throw new TypeError("Bad iterations");
            if ("number" != typeof o) throw new TypeError("Key length not a number");
            if (o < 0 || o > i || o != o) throw new TypeError("Bad key length")
        }
    }).call(this, i(11).Buffer)
}, function(e, t) {
    t["des-ecb"] = {
        key: 8,
        iv: 0
    }, t["des-cbc"] = t.des = {
        key: 8,
        iv: 8
    }, t["des-ede3-cbc"] = t.des3 = {
        key: 24,
        iv: 8
    }, t["des-ede3"] = {
        key: 24,
        iv: 0
    }, t["des-ede-cbc"] = {
        key: 16,
        iv: 8
    }, t["des-ede"] = {
        key: 16,
        iv: 0
    }
}, function(e, t, i) {
    "use strict";
    var r = i(142),
        n = i(105),
        o = i(39),
        a = r.base,
        s = i(61).utils;

    function d(e) {
        a.call(this, "mont", e), this.a = new n(e.a, 16).toRed(this.red), this.b = new n(e.b, 16).toRed(this.red), this.i4 = new n(4).toRed(this.red).redInvm(), this.two = new n(2).toRed(this.red), this.a24 = this.i4.redMul(this.a.redAdd(this.two))
    }

    function u(e, t, i) {
        a.BasePoint.call(this, e, "projective"), null === t && null === i ? (this.x = this.curve.one, this.z = this.curve.zero) : (this.x = new n(t, 16), this.z = new n(i, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)))
    }
    o(d, a), e.exports = d, d.prototype.validate = function(e) {
        var t = e.normalize().x,
            i = t.redSqr(),
            r = i.redMul(t).redAdd(i.redMul(this.a)).redAdd(t);
        return 0 === r.redSqrt().redSqr().cmp(r)
    }, o(u, a.BasePoint), d.prototype.decodePoint = function(e, t) {
        return this.point(s.toArray(e, t), 1)
    }, d.prototype.point = function(e, t) {
        return new u(this, e, t)
    }, d.prototype.pointFromJSON = function(e) {
        return u.fromJSON(this, e)
    }, u.prototype.precompute = function() {}, u.prototype._encode = function() {
        return this.getX().toArray("be", this.curve.p.byteLength())
    }, u.fromJSON = function(e, t) {
        return new u(e, t[0], t[1] || e.one)
    }, u.prototype.inspect = function() {
        return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
    }, u.prototype.isInfinity = function() {
        return 0 === this.z.cmpn(0)
    }, u.prototype.dbl = function() {
        var e = this.x.redAdd(this.z).redSqr(),
            t = this.x.redSub(this.z).redSqr(),
            i = e.redSub(t),
            r = e.redMul(t),
            n = i.redMul(t.redAdd(this.curve.a24.redMul(i)));
        return this.curve.point(r, n)
    }, u.prototype.add = function() {
        throw new Error("Not supported on Montgomery curve")
    }, u.prototype.diffAdd = function(e, t) {
        var i = this.x.redAdd(this.z),
            r = this.x.redSub(this.z),
            n = e.x.redAdd(e.z),
            o = e.x.redSub(e.z).redMul(i),
            a = n.redMul(r),
            s = t.z.redMul(o.redAdd(a).redSqr()),
            d = t.x.redMul(o.redISub(a).redSqr());
        return this.curve.point(s, d)
    }, u.prototype.mul = function(e) {
        for (var t = e.clone(), i = this, r = this.curve.point(null, null), n = []; 0 !== t.cmpn(0); t.iushrn(1)) n.push(t.andln(1));
        for (var o = n.length - 1; o >= 0; o--) 0 === n[o] ? (i = i.diffAdd(r, this), r = r.dbl()) : (r = i.diffAdd(r, this), i = i.dbl());
        return r
    }, u.prototype.mulAdd = function() {
        throw new Error("Not supported on Montgomery curve")
    }, u.prototype.jumlAdd = function() {
        throw new Error("Not supported on Montgomery curve")
    }, u.prototype.eq = function(e) {
        return 0 === this.getX().cmp(e.getX())
    }, u.prototype.normalize = function() {
        return this.x = this.x.redMul(this.z.redInvm()), this.z = this.curve.one, this
    }, u.prototype.getX = function() {
        return this.normalize(), this.x.fromRed()
    }
}, function(e, t, i) {
    "use strict";
    (function(t) {
        !t.version || 0 === t.version.indexOf("v0.") || 0 === t.version.indexOf("v1.") && 0 !== t.version.indexOf("v1.8.") ? e.exports = {
            nextTick: function(e, i, r, n) {
                if ("function" != typeof e) throw new TypeError('"callback" argument must be a function');
                var o, a, s = arguments.length;
                switch (s) {
                    case 0:
                    case 1:
                        return t.nextTick(e);
                    case 2:
                        return t.nextTick(function() {
                            e.call(null, i)
                        });
                    case 3:
                        return t.nextTick(function() {
                            e.call(null, i, r)
                        });
                    case 4:
                        return t.nextTick(function() {
                            e.call(null, i, r, n)
                        });
                    default:
                        for (o = new Array(s - 1), a = 0; a < o.length;) o[a++] = arguments[a];
                        return t.nextTick(function() {
                            e.apply(null, o)
                        })
                }
            }
        } : e.exports = t
    }).call(this, i(128))
}, function(e, t, i) {
    (t = e.exports = i(164)).Stream = t, t.Readable = t, t.Writable = i(87), t.Duplex = i(166), t.Transform = i(58), t.PassThrough = i(122)
}, function(e) {
    e.exports = {
        "2.16.840.1.101.3.4.1.1": "aes-128-ecb",
        "2.16.840.1.101.3.4.1.2": "aes-128-cbc",
        "2.16.840.1.101.3.4.1.3": "aes-128-ofb",
        "2.16.840.1.101.3.4.1.4": "aes-128-cfb",
        "2.16.840.1.101.3.4.1.21": "aes-192-ecb",
        "2.16.840.1.101.3.4.1.22": "aes-192-cbc",
        "2.16.840.1.101.3.4.1.23": "aes-192-ofb",
        "2.16.840.1.101.3.4.1.24": "aes-192-cfb",
        "2.16.840.1.101.3.4.1.41": "aes-256-ecb",
        "2.16.840.1.101.3.4.1.42": "aes-256-cbc",
        "2.16.840.1.101.3.4.1.43": "aes-256-ofb",
        "2.16.840.1.101.3.4.1.44": "aes-256-cfb"
    }
}, function(e, t, i) {
    (function(t) {
        var r = i(28),
            n = i(118),
            o = i(156),
            a = i(105),
            s = i(117),
            d = i(10),
            u = i(50);
        e.exports = function(e, i, f) {
            var c;
            c = e.padding ? e.padding : f ? 1 : 4;
            var l, h = r(e),
                p = h.modulus.byteLength();
            if (i.length > p || new a(i).cmp(h.modulus) >= 0) throw new Error("decryption error");
            l = f ? u(new a(i), h) : s(i, h);
            var _ = new t(p - l.length);
            if (_.fill(0), l = t.concat([_, l], p), 4 === c) return function(e, i) {
                e.modulus;
                var r = e.modulus.byteLength(),
                    a = (i.length, d("sha1").update(new t("")).digest()),
                    s = a.length;
                if (0 !== i[0]) throw new Error("decryption error");
                var u = i.slice(1, s + 1),
                    f = i.slice(s + 1),
                    c = o(u, n(f, s)),
                    l = o(f, n(c, r - s - 1));
                if (function(e, i) {
                        e = new t(e), i = new t(i);
                        var r = 0,
                            n = e.length;
                        e.length !== i.length && (r++, n = Math.min(e.length, i.length));
                        var o = -1;
                        for (; ++o < n;) r += e[o] ^ i[o];
                        return r
                    }(a, l.slice(0, s))) throw new Error("decryption error");
                var h = s;
                for (; 0 === l[h];) h++;
                if (1 !== l[h++]) throw new Error("decryption error");
                return l.slice(h)
            }(h, l);
            if (1 === c) return function(e, t, i) {
                var r = t.slice(0, 2),
                    n = 2,
                    o = 0;
                for (; 0 !== t[n++];)
                    if (n >= t.length) {
                        o++;
                        break
                    }
                var a = t.slice(2, n - 1);
                t.slice(n - 1, n);
                ("0002" !== r.toString("hex") && !i || "0001" !== r.toString("hex") && i) && o++;
                a.length < 8 && o++;
                if (o) throw new Error("decryption error");
                return t.slice(n)
            }(0, l, f);
            if (3 === c) return l;
            throw new Error("unknown padding")
        }
    }).call(this, i(11).Buffer)
}, function(e, t, i) {
    (function(e) {
        ! function(e, t) {
            "use strict";

            function r(e, t) {
                if (!e) throw new Error(t || "Assertion failed")
            }

            function n(e, t) {
                e.super_ = t;
                var i = function() {};
                i.prototype = t.prototype, e.prototype = new i, e.prototype.constructor = e
            }

            function o(e, t, i) {
                if (o.isBN(e)) return e;
                this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== e && ("le" !== t && "be" !== t || (i = t, t = 10), this._init(e || 0, t || 10, i || "be"))
            }
            var a;
            "object" == typeof e ? e.exports = o : t.BN = o, o.BN = o, o.wordSize = 26;
            try {
                a = i(20).Buffer
            } catch (e) {}

            function s(e, t, i) {
                for (var r = 0, n = Math.min(e.length, i), o = t; o < n; o++) {
                    var a = e.charCodeAt(o) - 48;
                    r <<= 4, r |= a >= 49 && a <= 54 ? a - 49 + 10 : a >= 17 && a <= 22 ? a - 17 + 10 : 15 & a
                }
                return r
            }

            function d(e, t, i, r) {
                for (var n = 0, o = Math.min(e.length, i), a = t; a < o; a++) {
                    var s = e.charCodeAt(a) - 48;
                    n *= r, n += s >= 49 ? s - 49 + 10 : s >= 17 ? s - 17 + 10 : s
                }
                return n
            }
            o.isBN = function(e) {
                return e instanceof o || null !== e && "object" == typeof e && e.constructor.wordSize === o.wordSize && Array.isArray(e.words)
            }, o.max = function(e, t) {
                return e.cmp(t) > 0 ? e : t
            }, o.min = function(e, t) {
                return e.cmp(t) < 0 ? e : t
            }, o.prototype._init = function(e, t, i) {
                if ("number" == typeof e) return this._initNumber(e, t, i);
                if ("object" == typeof e) return this._initArray(e, t, i);
                "hex" === t && (t = 16), r(t === (0 | t) && t >= 2 && t <= 36);
                var n = 0;
                "-" === (e = e.toString().replace(/\s+/g, ""))[0] && n++, 16 === t ? this._parseHex(e, n) : this._parseBase(e, t, n), "-" === e[0] && (this.negative = 1), this.strip(), "le" === i && this._initArray(this.toArray(), t, i)
            }, o.prototype._initNumber = function(e, t, i) {
                e < 0 && (this.negative = 1, e = -e), e < 67108864 ? (this.words = [67108863 & e], this.length = 1) : e < 4503599627370496 ? (this.words = [67108863 & e, e / 67108864 & 67108863], this.length = 2) : (r(e < 9007199254740992), this.words = [67108863 & e, e / 67108864 & 67108863, 1], this.length = 3), "le" === i && this._initArray(this.toArray(), t, i)
            }, o.prototype._initArray = function(e, t, i) {
                if (r("number" == typeof e.length), e.length <= 0) return this.words = [0], this.length = 1, this;
                this.length = Math.ceil(e.length / 3), this.words = new Array(this.length);
                for (var n = 0; n < this.length; n++) this.words[n] = 0;
                var o, a, s = 0;
                if ("be" === i)
                    for (n = e.length - 1, o = 0; n >= 0; n -= 3) a = e[n] | e[n - 1] << 8 | e[n - 2] << 16, this.words[o] |= a << s & 67108863, this.words[o + 1] = a >>> 26 - s & 67108863, (s += 24) >= 26 && (s -= 26, o++);
                else if ("le" === i)
                    for (n = 0, o = 0; n < e.length; n += 3) a = e[n] | e[n + 1] << 8 | e[n + 2] << 16, this.words[o] |= a << s & 67108863, this.words[o + 1] = a >>> 26 - s & 67108863, (s += 24) >= 26 && (s -= 26, o++);
                return this.strip()
            }, o.prototype._parseHex = function(e, t) {
                this.length = Math.ceil((e.length - t) / 6), this.words = new Array(this.length);
                for (var i = 0; i < this.length; i++) this.words[i] = 0;
                var r, n, o = 0;
                for (i = e.length - 6, r = 0; i >= t; i -= 6) n = s(e, i, i + 6), this.words[r] |= n << o & 67108863, this.words[r + 1] |= n >>> 26 - o & 4194303, (o += 24) >= 26 && (o -= 26, r++);
                i + 6 !== t && (n = s(e, t, i + 6), this.words[r] |= n << o & 67108863, this.words[r + 1] |= n >>> 26 - o & 4194303), this.strip()
            }, o.prototype._parseBase = function(e, t, i) {
                this.words = [0], this.length = 1;
                for (var r = 0, n = 1; n <= 67108863; n *= t) r++;
                r--, n = n / t | 0;
                for (var o = e.length - i, a = o % r, s = Math.min(o, o - a) + i, u = 0, f = i; f < s; f += r) u = d(e, f, f + r, t), this.imuln(n), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u);
                if (0 !== a) {
                    var c = 1;
                    for (u = d(e, f, e.length, t), f = 0; f < a; f++) c *= t;
                    this.imuln(c), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u)
                }
            }, o.prototype.copy = function(e) {
                e.words = new Array(this.length);
                for (var t = 0; t < this.length; t++) e.words[t] = this.words[t];
                e.length = this.length, e.negative = this.negative, e.red = this.red
            }, o.prototype.clone = function() {
                var e = new o(null);
                return this.copy(e), e
            }, o.prototype._expand = function(e) {
                for (; this.length < e;) this.words[this.length++] = 0;
                return this
            }, o.prototype.strip = function() {
                for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;
                return this._normSign()
            }, o.prototype._normSign = function() {
                return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this
            }, o.prototype.inspect = function() {
                return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
            };
            var u = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"],
                f = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                c = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];

            function l(e, t, i) {
                i.negative = t.negative ^ e.negative;
                var r = e.length + t.length | 0;
                i.length = r, r = r - 1 | 0;
                var n = 0 | e.words[0],
                    o = 0 | t.words[0],
                    a = n * o,
                    s = 67108863 & a,
                    d = a / 67108864 | 0;
                i.words[0] = s;
                for (var u = 1; u < r; u++) {
                    for (var f = d >>> 26, c = 67108863 & d, l = Math.min(u, t.length - 1), h = Math.max(0, u - e.length + 1); h <= l; h++) {
                        var p = u - h | 0;
                        f += (a = (n = 0 | e.words[p]) * (o = 0 | t.words[h]) + c) / 67108864 | 0, c = 67108863 & a
                    }
                    i.words[u] = 0 | c, d = 0 | f
                }
                return 0 !== d ? i.words[u] = 0 | d : i.length--, i.strip()
            }
            o.prototype.toString = function(e, t) {
                var i;
                if (e = e || 10, t = 0 | t || 1, 16 === e || "hex" === e) {
                    i = "";
                    for (var n = 0, o = 0, a = 0; a < this.length; a++) {
                        var s = this.words[a],
                            d = (16777215 & (s << n | o)).toString(16);
                        i = 0 !== (o = s >>> 24 - n & 16777215) || a !== this.length - 1 ? u[6 - d.length] + d + i : d + i, (n += 2) >= 26 && (n -= 26, a--)
                    }
                    for (0 !== o && (i = o.toString(16) + i); i.length % t != 0;) i = "0" + i;
                    return 0 !== this.negative && (i = "-" + i), i
                }
                if (e === (0 | e) && e >= 2 && e <= 36) {
                    var l = f[e],
                        h = c[e];
                    i = "";
                    var p = this.clone();
                    for (p.negative = 0; !p.isZero();) {
                        var _ = p.modn(h).toString(e);
                        i = (p = p.idivn(h)).isZero() ? _ + i : u[l - _.length] + _ + i
                    }
                    for (this.isZero() && (i = "0" + i); i.length % t != 0;) i = "0" + i;
                    return 0 !== this.negative && (i = "-" + i), i
                }
                r(!1, "Base should be between 2 and 36")
            }, o.prototype.toNumber = function() {
                var e = this.words[0];
                return 2 === this.length ? e += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? e += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && r(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -e : e
            }, o.prototype.toJSON = function() {
                return this.toString(16)
            }, o.prototype.toBuffer = function(e, t) {
                return r(void 0 !== a), this.toArrayLike(a, e, t)
            }, o.prototype.toArray = function(e, t) {
                return this.toArrayLike(Array, e, t)
            }, o.prototype.toArrayLike = function(e, t, i) {
                var n = this.byteLength(),
                    o = i || Math.max(1, n);
                r(n <= o, "byte array longer than desired length"), r(o > 0, "Requested array length <= 0"), this.strip();
                var a, s, d = "le" === t,
                    u = new e(o),
                    f = this.clone();
                if (d) {
                    for (s = 0; !f.isZero(); s++) a = f.andln(255), f.iushrn(8), u[s] = a;
                    for (; s < o; s++) u[s] = 0
                } else {
                    for (s = 0; s < o - n; s++) u[s] = 0;
                    for (s = 0; !f.isZero(); s++) a = f.andln(255), f.iushrn(8), u[o - s - 1] = a
                }
                return u
            }, Math.clz32 ? o.prototype._countBits = function(e) {
                return 32 - Math.clz32(e)
            } : o.prototype._countBits = function(e) {
                var t = e,
                    i = 0;
                return t >= 4096 && (i += 13, t >>>= 13), t >= 64 && (i += 7, t >>>= 7), t >= 8 && (i += 4, t >>>= 4), t >= 2 && (i += 2, t >>>= 2), i + t
            }, o.prototype._zeroBits = function(e) {
                if (0 === e) return 26;
                var t = e,
                    i = 0;
                return 0 == (8191 & t) && (i += 13, t >>>= 13), 0 == (127 & t) && (i += 7, t >>>= 7), 0 == (15 & t) && (i += 4, t >>>= 4), 0 == (3 & t) && (i += 2, t >>>= 2), 0 == (1 & t) && i++, i
            }, o.prototype.bitLength = function() {
                var e = this.words[this.length - 1],
                    t = this._countBits(e);
                return 26 * (this.length - 1) + t
            }, o.prototype.zeroBits = function() {
                if (this.isZero()) return 0;
                for (var e = 0, t = 0; t < this.length; t++) {
                    var i = this._zeroBits(this.words[t]);
                    if (e += i, 26 !== i) break
                }
                return e
            }, o.prototype.byteLength = function() {
                return Math.ceil(this.bitLength() / 8)
            }, o.prototype.toTwos = function(e) {
                return 0 !== this.negative ? this.abs().inotn(e).iaddn(1) : this.clone()
            }, o.prototype.fromTwos = function(e) {
                return this.testn(e - 1) ? this.notn(e).iaddn(1).ineg() : this.clone()
            }, o.prototype.isNeg = function() {
                return 0 !== this.negative
            }, o.prototype.neg = function() {
                return this.clone().ineg()
            }, o.prototype.ineg = function() {
                return this.isZero() || (this.negative ^= 1), this
            }, o.prototype.iuor = function(e) {
                for (; this.length < e.length;) this.words[this.length++] = 0;
                for (var t = 0; t < e.length; t++) this.words[t] = this.words[t] | e.words[t];
                return this.strip()
            }, o.prototype.ior = function(e) {
                return r(0 == (this.negative | e.negative)), this.iuor(e)
            }, o.prototype.or = function(e) {
                return this.length > e.length ? this.clone().ior(e) : e.clone().ior(this)
            }, o.prototype.uor = function(e) {
                return this.length > e.length ? this.clone().iuor(e) : e.clone().iuor(this)
            }, o.prototype.iuand = function(e) {
                var t;
                t = this.length > e.length ? e : this;
                for (var i = 0; i < t.length; i++) this.words[i] = this.words[i] & e.words[i];
                return this.length = t.length, this.strip()
            }, o.prototype.iand = function(e) {
                return r(0 == (this.negative | e.negative)), this.iuand(e)
            }, o.prototype.and = function(e) {
                return this.length > e.length ? this.clone().iand(e) : e.clone().iand(this)
            }, o.prototype.uand = function(e) {
                return this.length > e.length ? this.clone().iuand(e) : e.clone().iuand(this)
            }, o.prototype.iuxor = function(e) {
                var t, i;
                this.length > e.length ? (t = this, i = e) : (t = e, i = this);
                for (var r = 0; r < i.length; r++) this.words[r] = t.words[r] ^ i.words[r];
                if (this !== t)
                    for (; r < t.length; r++) this.words[r] = t.words[r];
                return this.length = t.length, this.strip()
            }, o.prototype.ixor = function(e) {
                return r(0 == (this.negative | e.negative)), this.iuxor(e)
            }, o.prototype.xor = function(e) {
                return this.length > e.length ? this.clone().ixor(e) : e.clone().ixor(this)
            }, o.prototype.uxor = function(e) {
                return this.length > e.length ? this.clone().iuxor(e) : e.clone().iuxor(this)
            }, o.prototype.inotn = function(e) {
                r("number" == typeof e && e >= 0);
                var t = 0 | Math.ceil(e / 26),
                    i = e % 26;
                this._expand(t), i > 0 && t--;
                for (var n = 0; n < t; n++) this.words[n] = 67108863 & ~this.words[n];
                return i > 0 && (this.words[n] = ~this.words[n] & 67108863 >> 26 - i), this.strip()
            }, o.prototype.notn = function(e) {
                return this.clone().inotn(e)
            }, o.prototype.setn = function(e, t) {
                r("number" == typeof e && e >= 0);
                var i = e / 26 | 0,
                    n = e % 26;
                return this._expand(i + 1), this.words[i] = t ? this.words[i] | 1 << n : this.words[i] & ~(1 << n), this.strip()
            }, o.prototype.iadd = function(e) {
                var t, i, r;
                if (0 !== this.negative && 0 === e.negative) return this.negative = 0, t = this.isub(e), this.negative ^= 1, this._normSign();
                if (0 === this.negative && 0 !== e.negative) return e.negative = 0, t = this.isub(e), e.negative = 1, t._normSign();
                this.length > e.length ? (i = this, r = e) : (i = e, r = this);
                for (var n = 0, o = 0; o < r.length; o++) t = (0 | i.words[o]) + (0 | r.words[o]) + n, this.words[o] = 67108863 & t, n = t >>> 26;
                for (; 0 !== n && o < i.length; o++) t = (0 | i.words[o]) + n, this.words[o] = 67108863 & t, n = t >>> 26;
                if (this.length = i.length, 0 !== n) this.words[this.length] = n, this.length++;
                else if (i !== this)
                    for (; o < i.length; o++) this.words[o] = i.words[o];
                return this
            }, o.prototype.add = function(e) {
                var t;
                return 0 !== e.negative && 0 === this.negative ? (e.negative = 0, t = this.sub(e), e.negative ^= 1, t) : 0 === e.negative && 0 !== this.negative ? (this.negative = 0, t = e.sub(this), this.negative = 1, t) : this.length > e.length ? this.clone().iadd(e) : e.clone().iadd(this)
            }, o.prototype.isub = function(e) {
                if (0 !== e.negative) {
                    e.negative = 0;
                    var t = this.iadd(e);
                    return e.negative = 1, t._normSign()
                }
                if (0 !== this.negative) return this.negative = 0, this.iadd(e), this.negative = 1, this._normSign();
                var i, r, n = this.cmp(e);
                if (0 === n) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
                n > 0 ? (i = this, r = e) : (i = e, r = this);
                for (var o = 0, a = 0; a < r.length; a++) o = (t = (0 | i.words[a]) - (0 | r.words[a]) + o) >> 26, this.words[a] = 67108863 & t;
                for (; 0 !== o && a < i.length; a++) o = (t = (0 | i.words[a]) + o) >> 26, this.words[a] = 67108863 & t;
                if (0 === o && a < i.length && i !== this)
                    for (; a < i.length; a++) this.words[a] = i.words[a];
                return this.length = Math.max(this.length, a), i !== this && (this.negative = 1), this.strip()
            }, o.prototype.sub = function(e) {
                return this.clone().isub(e)
            };
            var h = function(e, t, i) {
                var r, n, o, a = e.words,
                    s = t.words,
                    d = i.words,
                    u = 0,
                    f = 0 | a[0],
                    c = 8191 & f,
                    l = f >>> 13,
                    h = 0 | a[1],
                    p = 8191 & h,
                    _ = h >>> 13,
                    y = 0 | a[2],
                    b = 8191 & y,
                    g = y >>> 13,
                    v = 0 | a[3],
                    m = 8191 & v,
                    A = v >>> 13,
                    w = 0 | a[4],
                    E = 8191 & w,
                    P = w >>> 13,
                    S = 0 | a[5],
                    I = 8191 & S,
                    T = S >>> 13,
                    M = 0 | a[6],
                    L = 8191 & M,
                    k = M >>> 13,
                    C = 0 | a[7],
                    D = 8191 & C,
                    U = C >>> 13,
                    O = 0 | a[8],
                    x = 8191 & O,
                    R = O >>> 13,
                    B = 0 | a[9],
                    N = 8191 & B,
                    j = B >>> 13,
                    H = 0 | s[0],
                    F = 8191 & H,
                    q = H >>> 13,
                    V = 0 | s[1],
                    W = 8191 & V,
                    z = V >>> 13,
                    Y = 0 | s[2],
                    K = 8191 & Y,
                    X = Y >>> 13,
                    G = 0 | s[3],
                    J = 8191 & G,
                    Z = G >>> 13,
                    Q = 0 | s[4],
                    $ = 8191 & Q,
                    ee = Q >>> 13,
                    te = 0 | s[5],
                    ie = 8191 & te,
                    re = te >>> 13,
                    ne = 0 | s[6],
                    oe = 8191 & ne,
                    ae = ne >>> 13,
                    se = 0 | s[7],
                    de = 8191 & se,
                    ue = se >>> 13,
                    fe = 0 | s[8],
                    ce = 8191 & fe,
                    le = fe >>> 13,
                    he = 0 | s[9],
                    pe = 8191 & he,
                    _e = he >>> 13;
                i.negative = e.negative ^ t.negative, i.length = 19;
                var ye = (u + (r = Math.imul(c, F)) | 0) + ((8191 & (n = (n = Math.imul(c, q)) + Math.imul(l, F) | 0)) << 13) | 0;
                u = ((o = Math.imul(l, q)) + (n >>> 13) | 0) + (ye >>> 26) | 0, ye &= 67108863, r = Math.imul(p, F), n = (n = Math.imul(p, q)) + Math.imul(_, F) | 0, o = Math.imul(_, q);
                var be = (u + (r = r + Math.imul(c, W) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, z) | 0) + Math.imul(l, W) | 0)) << 13) | 0;
                u = ((o = o + Math.imul(l, z) | 0) + (n >>> 13) | 0) + (be >>> 26) | 0, be &= 67108863, r = Math.imul(b, F), n = (n = Math.imul(b, q)) + Math.imul(g, F) | 0, o = Math.imul(g, q), r = r + Math.imul(p, W) | 0, n = (n = n + Math.imul(p, z) | 0) + Math.imul(_, W) | 0, o = o + Math.imul(_, z) | 0;
                var ge = (u + (r = r + Math.imul(c, K) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, X) | 0) + Math.imul(l, K) | 0)) << 13) | 0;
                u = ((o = o + Math.imul(l, X) | 0) + (n >>> 13) | 0) + (ge >>> 26) | 0, ge &= 67108863, r = Math.imul(m, F), n = (n = Math.imul(m, q)) + Math.imul(A, F) | 0, o = Math.imul(A, q), r = r + Math.imul(b, W) | 0, n = (n = n + Math.imul(b, z) | 0) + Math.imul(g, W) | 0, o = o + Math.imul(g, z) | 0, r = r + Math.imul(p, K) | 0, n = (n = n + Math.imul(p, X) | 0) + Math.imul(_, K) | 0, o = o + Math.imul(_, X) | 0;
                var ve = (u + (r = r + Math.imul(c, J) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, Z) | 0) + Math.imul(l, J) | 0)) << 13) | 0;
                u = ((o = o + Math.imul(l, Z) | 0) + (n >>> 13) | 0) + (ve >>> 26) | 0, ve &= 67108863, r = Math.imul(E, F), n = (n = Math.imul(E, q)) + Math.imul(P, F) | 0, o = Math.imul(P, q), r = r + Math.imul(m, W) | 0, n = (n = n + Math.imul(m, z) | 0) + Math.imul(A, W) | 0, o = o + Math.imul(A, z) | 0, r = r + Math.imul(b, K) | 0, n = (n = n + Math.imul(b, X) | 0) + Math.imul(g, K) | 0, o = o + Math.imul(g, X) | 0, r = r + Math.imul(p, J) | 0, n = (n = n + Math.imul(p, Z) | 0) + Math.imul(_, J) | 0, o = o + Math.imul(_, Z) | 0;
                var me = (u + (r = r + Math.imul(c, $) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, ee) | 0) + Math.imul(l, $) | 0)) << 13) | 0;
                u = ((o = o + Math.imul(l, ee) | 0) + (n >>> 13) | 0) + (me >>> 26) | 0, me &= 67108863, r = Math.imul(I, F), n = (n = Math.imul(I, q)) + Math.imul(T, F) | 0, o = Math.imul(T, q), r = r + Math.imul(E, W) | 0, n = (n = n + Math.imul(E, z) | 0) + Math.imul(P, W) | 0, o = o + Math.imul(P, z) | 0, r = r + Math.imul(m, K) | 0, n = (n = n + Math.imul(m, X) | 0) + Math.imul(A, K) | 0, o = o + Math.imul(A, X) | 0, r = r + Math.imul(b, J) | 0, n = (n = n + Math.imul(b, Z) | 0) + Math.imul(g, J) | 0, o = o + Math.imul(g, Z) | 0, r = r + Math.imul(p, $) | 0, n = (n = n + Math.imul(p, ee) | 0) + Math.imul(_, $) | 0, o = o + Math.imul(_, ee) | 0;
                var Ae = (u + (r = r + Math.imul(c, ie) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, re) | 0) + Math.imul(l, ie) | 0)) << 13) | 0;
                u = ((o = o + Math.imul(l, re) | 0) + (n >>> 13) | 0) + (Ae >>> 26) | 0, Ae &= 67108863, r = Math.imul(L, F), n = (n = Math.imul(L, q)) + Math.imul(k, F) | 0, o = Math.imul(k, q), r = r + Math.imul(I, W) | 0, n = (n = n + Math.imul(I, z) | 0) + Math.imul(T, W) | 0, o = o + Math.imul(T, z) | 0, r = r + Math.imul(E, K) | 0, n = (n = n + Math.imul(E, X) | 0) + Math.imul(P, K) | 0, o = o + Math.imul(P, X) | 0, r = r + Math.imul(m, J) | 0, n = (n = n + Math.imul(m, Z) | 0) + Math.imul(A, J) | 0, o = o + Math.imul(A, Z) | 0, r = r + Math.imul(b, $) | 0, n = (n = n + Math.imul(b, ee) | 0) + Math.imul(g, $) | 0, o = o + Math.imul(g, ee) | 0, r = r + Math.imul(p, ie) | 0, n = (n = n + Math.imul(p, re) | 0) + Math.imul(_, ie) | 0, o = o + Math.imul(_, re) | 0;
                var we = (u + (r = r + Math.imul(c, oe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, ae) | 0) + Math.imul(l, oe) | 0)) << 13) | 0;
                u = ((o = o + Math.imul(l, ae) | 0) + (n >>> 13) | 0) + (we >>> 26) | 0, we &= 67108863, r = Math.imul(D, F), n = (n = Math.imul(D, q)) + Math.imul(U, F) | 0, o = Math.imul(U, q), r = r + Math.imul(L, W) | 0, n = (n = n + Math.imul(L, z) | 0) + Math.imul(k, W) | 0, o = o + Math.imul(k, z) | 0, r = r + Math.imul(I, K) | 0, n = (n = n + Math.imul(I, X) | 0) + Math.imul(T, K) | 0, o = o + Math.imul(T, X) | 0, r = r + Math.imul(E, J) | 0, n = (n = n + Math.imul(E, Z) | 0) + Math.imul(P, J) | 0, o = o + Math.imul(P, Z) | 0, r = r + Math.imul(m, $) | 0, n = (n = n + Math.imul(m, ee) | 0) + Math.imul(A, $) | 0, o = o + Math.imul(A, ee) | 0, r = r + Math.imul(b, ie) | 0, n = (n = n + Math.imul(b, re) | 0) + Math.imul(g, ie) | 0, o = o + Math.imul(g, re) | 0, r = r + Math.imul(p, oe) | 0, n = (n = n + Math.imul(p, ae) | 0) + Math.imul(_, oe) | 0, o = o + Math.imul(_, ae) | 0;
                var Ee = (u + (r = r + Math.imul(c, de) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, ue) | 0) + Math.imul(l, de) | 0)) << 13) | 0;
                u = ((o = o + Math.imul(l, ue) | 0) + (n >>> 13) | 0) + (Ee >>> 26) | 0, Ee &= 67108863, r = Math.imul(x, F), n = (n = Math.imul(x, q)) + Math.imul(R, F) | 0, o = Math.imul(R, q), r = r + Math.imul(D, W) | 0, n = (n = n + Math.imul(D, z) | 0) + Math.imul(U, W) | 0, o = o + Math.imul(U, z) | 0, r = r + Math.imul(L, K) | 0, n = (n = n + Math.imul(L, X) | 0) + Math.imul(k, K) | 0, o = o + Math.imul(k, X) | 0, r = r + Math.imul(I, J) | 0, n = (n = n + Math.imul(I, Z) | 0) + Math.imul(T, J) | 0, o = o + Math.imul(T, Z) | 0, r = r + Math.imul(E, $) | 0, n = (n = n + Math.imul(E, ee) | 0) + Math.imul(P, $) | 0, o = o + Math.imul(P, ee) | 0, r = r + Math.imul(m, ie) | 0, n = (n = n + Math.imul(m, re) | 0) + Math.imul(A, ie) | 0, o = o + Math.imul(A, re) | 0, r = r + Math.imul(b, oe) | 0, n = (n = n + Math.imul(b, ae) | 0) + Math.imul(g, oe) | 0, o = o + Math.imul(g, ae) | 0, r = r + Math.imul(p, de) | 0, n = (n = n + Math.imul(p, ue) | 0) + Math.imul(_, de) | 0, o = o + Math.imul(_, ue) | 0;
                var Pe = (u + (r = r + Math.imul(c, ce) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, le) | 0) + Math.imul(l, ce) | 0)) << 13) | 0;
                u = ((o = o + Math.imul(l, le) | 0) + (n >>> 13) | 0) + (Pe >>> 26) | 0, Pe &= 67108863, r = Math.imul(N, F), n = (n = Math.imul(N, q)) + Math.imul(j, F) | 0, o = Math.imul(j, q), r = r + Math.imul(x, W) | 0, n = (n = n + Math.imul(x, z) | 0) + Math.imul(R, W) | 0, o = o + Math.imul(R, z) | 0, r = r + Math.imul(D, K) | 0, n = (n = n + Math.imul(D, X) | 0) + Math.imul(U, K) | 0, o = o + Math.imul(U, X) | 0, r = r + Math.imul(L, J) | 0, n = (n = n + Math.imul(L, Z) | 0) + Math.imul(k, J) | 0, o = o + Math.imul(k, Z) | 0, r = r + Math.imul(I, $) | 0, n = (n = n + Math.imul(I, ee) | 0) + Math.imul(T, $) | 0, o = o + Math.imul(T, ee) | 0, r = r + Math.imul(E, ie) | 0, n = (n = n + Math.imul(E, re) | 0) + Math.imul(P, ie) | 0, o = o + Math.imul(P, re) | 0, r = r + Math.imul(m, oe) | 0, n = (n = n + Math.imul(m, ae) | 0) + Math.imul(A, oe) | 0, o = o + Math.imul(A, ae) | 0, r = r + Math.imul(b, de) | 0, n = (n = n + Math.imul(b, ue) | 0) + Math.imul(g, de) | 0, o = o + Math.imul(g, ue) | 0, r = r + Math.imul(p, ce) | 0, n = (n = n + Math.imul(p, le) | 0) + Math.imul(_, ce) | 0, o = o + Math.imul(_, le) | 0;
                var Se = (u + (r = r + Math.imul(c, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(c, _e) | 0) + Math.imul(l, pe) | 0)) << 13) | 0;
                u = ((o = o + Math.imul(l, _e) | 0) + (n >>> 13) | 0) + (Se >>> 26) | 0, Se &= 67108863, r = Math.imul(N, W), n = (n = Math.imul(N, z)) + Math.imul(j, W) | 0, o = Math.imul(j, z), r = r + Math.imul(x, K) | 0, n = (n = n + Math.imul(x, X) | 0) + Math.imul(R, K) | 0, o = o + Math.imul(R, X) | 0, r = r + Math.imul(D, J) | 0, n = (n = n + Math.imul(D, Z) | 0) + Math.imul(U, J) | 0, o = o + Math.imul(U, Z) | 0, r = r + Math.imul(L, $) | 0, n = (n = n + Math.imul(L, ee) | 0) + Math.imul(k, $) | 0, o = o + Math.imul(k, ee) | 0, r = r + Math.imul(I, ie) | 0, n = (n = n + Math.imul(I, re) | 0) + Math.imul(T, ie) | 0, o = o + Math.imul(T, re) | 0, r = r + Math.imul(E, oe) | 0, n = (n = n + Math.imul(E, ae) | 0) + Math.imul(P, oe) | 0, o = o + Math.imul(P, ae) | 0, r = r + Math.imul(m, de) | 0, n = (n = n + Math.imul(m, ue) | 0) + Math.imul(A, de) | 0, o = o + Math.imul(A, ue) | 0, r = r + Math.imul(b, ce) | 0, n = (n = n + Math.imul(b, le) | 0) + Math.imul(g, ce) | 0, o = o + Math.imul(g, le) | 0;
                var Ie = (u + (r = r + Math.imul(p, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(p, _e) | 0) + Math.imul(_, pe) | 0)) << 13) | 0;
                u = ((o = o + Math.imul(_, _e) | 0) + (n >>> 13) | 0) + (Ie >>> 26) | 0, Ie &= 67108863, r = Math.imul(N, K), n = (n = Math.imul(N, X)) + Math.imul(j, K) | 0, o = Math.imul(j, X), r = r + Math.imul(x, J) | 0, n = (n = n + Math.imul(x, Z) | 0) + Math.imul(R, J) | 0, o = o + Math.imul(R, Z) | 0, r = r + Math.imul(D, $) | 0, n = (n = n + Math.imul(D, ee) | 0) + Math.imul(U, $) | 0, o = o + Math.imul(U, ee) | 0, r = r + Math.imul(L, ie) | 0, n = (n = n + Math.imul(L, re) | 0) + Math.imul(k, ie) | 0, o = o + Math.imul(k, re) | 0, r = r + Math.imul(I, oe) | 0, n = (n = n + Math.imul(I, ae) | 0) + Math.imul(T, oe) | 0, o = o + Math.imul(T, ae) | 0, r = r + Math.imul(E, de) | 0, n = (n = n + Math.imul(E, ue) | 0) + Math.imul(P, de) | 0, o = o + Math.imul(P, ue) | 0, r = r + Math.imul(m, ce) | 0, n = (n = n + Math.imul(m, le) | 0) + Math.imul(A, ce) | 0, o = o + Math.imul(A, le) | 0;
                var Te = (u + (r = r + Math.imul(b, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(b, _e) | 0) + Math.imul(g, pe) | 0)) << 13) | 0;
                u = ((o = o + Math.imul(g, _e) | 0) + (n >>> 13) | 0) + (Te >>> 26) | 0, Te &= 67108863, r = Math.imul(N, J), n = (n = Math.imul(N, Z)) + Math.imul(j, J) | 0, o = Math.imul(j, Z), r = r + Math.imul(x, $) | 0, n = (n = n + Math.imul(x, ee) | 0) + Math.imul(R, $) | 0, o = o + Math.imul(R, ee) | 0, r = r + Math.imul(D, ie) | 0, n = (n = n + Math.imul(D, re) | 0) + Math.imul(U, ie) | 0, o = o + Math.imul(U, re) | 0, r = r + Math.imul(L, oe) | 0, n = (n = n + Math.imul(L, ae) | 0) + Math.imul(k, oe) | 0, o = o + Math.imul(k, ae) | 0, r = r + Math.imul(I, de) | 0, n = (n = n + Math.imul(I, ue) | 0) + Math.imul(T, de) | 0, o = o + Math.imul(T, ue) | 0, r = r + Math.imul(E, ce) | 0, n = (n = n + Math.imul(E, le) | 0) + Math.imul(P, ce) | 0, o = o + Math.imul(P, le) | 0;
                var Me = (u + (r = r + Math.imul(m, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, _e) | 0) + Math.imul(A, pe) | 0)) << 13) | 0;
                u = ((o = o + Math.imul(A, _e) | 0) + (n >>> 13) | 0) + (Me >>> 26) | 0, Me &= 67108863, r = Math.imul(N, $), n = (n = Math.imul(N, ee)) + Math.imul(j, $) | 0, o = Math.imul(j, ee), r = r + Math.imul(x, ie) | 0, n = (n = n + Math.imul(x, re) | 0) + Math.imul(R, ie) | 0, o = o + Math.imul(R, re) | 0, r = r + Math.imul(D, oe) | 0, n = (n = n + Math.imul(D, ae) | 0) + Math.imul(U, oe) | 0, o = o + Math.imul(U, ae) | 0, r = r + Math.imul(L, de) | 0, n = (n = n + Math.imul(L, ue) | 0) + Math.imul(k, de) | 0, o = o + Math.imul(k, ue) | 0, r = r + Math.imul(I, ce) | 0, n = (n = n + Math.imul(I, le) | 0) + Math.imul(T, ce) | 0, o = o + Math.imul(T, le) | 0;
                var Le = (u + (r = r + Math.imul(E, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(E, _e) | 0) + Math.imul(P, pe) | 0)) << 13) | 0;
                u = ((o = o + Math.imul(P, _e) | 0) + (n >>> 13) | 0) + (Le >>> 26) | 0, Le &= 67108863, r = Math.imul(N, ie), n = (n = Math.imul(N, re)) + Math.imul(j, ie) | 0, o = Math.imul(j, re), r = r + Math.imul(x, oe) | 0, n = (n = n + Math.imul(x, ae) | 0) + Math.imul(R, oe) | 0, o = o + Math.imul(R, ae) | 0, r = r + Math.imul(D, de) | 0, n = (n = n + Math.imul(D, ue) | 0) + Math.imul(U, de) | 0, o = o + Math.imul(U, ue) | 0, r = r + Math.imul(L, ce) | 0, n = (n = n + Math.imul(L, le) | 0) + Math.imul(k, ce) | 0, o = o + Math.imul(k, le) | 0;
                var ke = (u + (r = r + Math.imul(I, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(I, _e) | 0) + Math.imul(T, pe) | 0)) << 13) | 0;
                u = ((o = o + Math.imul(T, _e) | 0) + (n >>> 13) | 0) + (ke >>> 26) | 0, ke &= 67108863, r = Math.imul(N, oe), n = (n = Math.imul(N, ae)) + Math.imul(j, oe) | 0, o = Math.imul(j, ae), r = r + Math.imul(x, de) | 0, n = (n = n + Math.imul(x, ue) | 0) + Math.imul(R, de) | 0, o = o + Math.imul(R, ue) | 0, r = r + Math.imul(D, ce) | 0, n = (n = n + Math.imul(D, le) | 0) + Math.imul(U, ce) | 0, o = o + Math.imul(U, le) | 0;
                var Ce = (u + (r = r + Math.imul(L, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(L, _e) | 0) + Math.imul(k, pe) | 0)) << 13) | 0;
                u = ((o = o + Math.imul(k, _e) | 0) + (n >>> 13) | 0) + (Ce >>> 26) | 0, Ce &= 67108863, r = Math.imul(N, de), n = (n = Math.imul(N, ue)) + Math.imul(j, de) | 0, o = Math.imul(j, ue), r = r + Math.imul(x, ce) | 0, n = (n = n + Math.imul(x, le) | 0) + Math.imul(R, ce) | 0, o = o + Math.imul(R, le) | 0;
                var De = (u + (r = r + Math.imul(D, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(D, _e) | 0) + Math.imul(U, pe) | 0)) << 13) | 0;
                u = ((o = o + Math.imul(U, _e) | 0) + (n >>> 13) | 0) + (De >>> 26) | 0, De &= 67108863, r = Math.imul(N, ce), n = (n = Math.imul(N, le)) + Math.imul(j, ce) | 0, o = Math.imul(j, le);
                var Ue = (u + (r = r + Math.imul(x, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(x, _e) | 0) + Math.imul(R, pe) | 0)) << 13) | 0;
                u = ((o = o + Math.imul(R, _e) | 0) + (n >>> 13) | 0) + (Ue >>> 26) | 0, Ue &= 67108863;
                var Oe = (u + (r = Math.imul(N, pe)) | 0) + ((8191 & (n = (n = Math.imul(N, _e)) + Math.imul(j, pe) | 0)) << 13) | 0;
                return u = ((o = Math.imul(j, _e)) + (n >>> 13) | 0) + (Oe >>> 26) | 0, Oe &= 67108863, d[0] = ye, d[1] = be, d[2] = ge, d[3] = ve, d[4] = me, d[5] = Ae, d[6] = we, d[7] = Ee, d[8] = Pe, d[9] = Se, d[10] = Ie, d[11] = Te, d[12] = Me, d[13] = Le, d[14] = ke, d[15] = Ce, d[16] = De, d[17] = Ue, d[18] = Oe, 0 !== u && (d[19] = u, i.length++), i
            };

            function p(e, t, i) {
                return (new _).mulp(e, t, i)
            }

            function _(e, t) {
                this.x = e, this.y = t
            }
            Math.imul || (h = l), o.prototype.mulTo = function(e, t) {
                var i = this.length + e.length;
                return 10 === this.length && 10 === e.length ? h(this, e, t) : i < 63 ? l(this, e, t) : i < 1024 ? function(e, t, i) {
                    i.negative = t.negative ^ e.negative, i.length = e.length + t.length;
                    for (var r = 0, n = 0, o = 0; o < i.length - 1; o++) {
                        var a = n;
                        n = 0;
                        for (var s = 67108863 & r, d = Math.min(o, t.length - 1), u = Math.max(0, o - e.length + 1); u <= d; u++) {
                            var f = o - u,
                                c = (0 | e.words[f]) * (0 | t.words[u]),
                                l = 67108863 & c;
                            s = 67108863 & (l = l + s | 0), n += (a = (a = a + (c / 67108864 | 0) | 0) + (l >>> 26) | 0) >>> 26, a &= 67108863
                        }
                        i.words[o] = s, r = a, a = n
                    }
                    return 0 !== r ? i.words[o] = r : i.length--, i.strip()
                }(this, e, t) : p(this, e, t)
            }, _.prototype.makeRBT = function(e) {
                for (var t = new Array(e), i = o.prototype._countBits(e) - 1, r = 0; r < e; r++) t[r] = this.revBin(r, i, e);
                return t
            }, _.prototype.revBin = function(e, t, i) {
                if (0 === e || e === i - 1) return e;
                for (var r = 0, n = 0; n < t; n++) r |= (1 & e) << t - n - 1, e >>= 1;
                return r
            }, _.prototype.permute = function(e, t, i, r, n, o) {
                for (var a = 0; a < o; a++) r[a] = t[e[a]], n[a] = i[e[a]]
            }, _.prototype.transform = function(e, t, i, r, n, o) {
                this.permute(o, e, t, i, r, n);
                for (var a = 1; a < n; a <<= 1)
                    for (var s = a << 1, d = Math.cos(2 * Math.PI / s), u = Math.sin(2 * Math.PI / s), f = 0; f < n; f += s)
                        for (var c = d, l = u, h = 0; h < a; h++) {
                            var p = i[f + h],
                                _ = r[f + h],
                                y = i[f + h + a],
                                b = r[f + h + a],
                                g = c * y - l * b;
                            b = c * b + l * y, y = g, i[f + h] = p + y, r[f + h] = _ + b, i[f + h + a] = p - y, r[f + h + a] = _ - b, h !== s && (g = d * c - u * l, l = d * l + u * c, c = g)
                        }
            }, _.prototype.guessLen13b = function(e, t) {
                var i = 1 | Math.max(t, e),
                    r = 1 & i,
                    n = 0;
                for (i = i / 2 | 0; i; i >>>= 1) n++;
                return 1 << n + 1 + r
            }, _.prototype.conjugate = function(e, t, i) {
                if (!(i <= 1))
                    for (var r = 0; r < i / 2; r++) {
                        var n = e[r];
                        e[r] = e[i - r - 1], e[i - r - 1] = n, n = t[r], t[r] = -t[i - r - 1], t[i - r - 1] = -n
                    }
            }, _.prototype.normalize13b = function(e, t) {
                for (var i = 0, r = 0; r < t / 2; r++) {
                    var n = 8192 * Math.round(e[2 * r + 1] / t) + Math.round(e[2 * r] / t) + i;
                    e[r] = 67108863 & n, i = n < 67108864 ? 0 : n / 67108864 | 0
                }
                return e
            }, _.prototype.convert13b = function(e, t, i, n) {
                for (var o = 0, a = 0; a < t; a++) o += 0 | e[a], i[2 * a] = 8191 & o, o >>>= 13, i[2 * a + 1] = 8191 & o, o >>>= 13;
                for (a = 2 * t; a < n; ++a) i[a] = 0;
                r(0 === o), r(0 == (-8192 & o))
            }, _.prototype.stub = function(e) {
                for (var t = new Array(e), i = 0; i < e; i++) t[i] = 0;
                return t
            }, _.prototype.mulp = function(e, t, i) {
                var r = 2 * this.guessLen13b(e.length, t.length),
                    n = this.makeRBT(r),
                    o = this.stub(r),
                    a = new Array(r),
                    s = new Array(r),
                    d = new Array(r),
                    u = new Array(r),
                    f = new Array(r),
                    c = new Array(r),
                    l = i.words;
                l.length = r, this.convert13b(e.words, e.length, a, r), this.convert13b(t.words, t.length, u, r), this.transform(a, o, s, d, r, n), this.transform(u, o, f, c, r, n);
                for (var h = 0; h < r; h++) {
                    var p = s[h] * f[h] - d[h] * c[h];
                    d[h] = s[h] * c[h] + d[h] * f[h], s[h] = p
                }
                return this.conjugate(s, d, r), this.transform(s, d, l, o, r, n), this.conjugate(l, o, r), this.normalize13b(l, r), i.negative = e.negative ^ t.negative, i.length = e.length + t.length, i.strip()
            }, o.prototype.mul = function(e) {
                var t = new o(null);
                return t.words = new Array(this.length + e.length), this.mulTo(e, t)
            }, o.prototype.mulf = function(e) {
                var t = new o(null);
                return t.words = new Array(this.length + e.length), p(this, e, t)
            }, o.prototype.imul = function(e) {
                return this.clone().mulTo(e, this)
            }, o.prototype.imuln = function(e) {
                r("number" == typeof e), r(e < 67108864);
                for (var t = 0, i = 0; i < this.length; i++) {
                    var n = (0 | this.words[i]) * e,
                        o = (67108863 & n) + (67108863 & t);
                    t >>= 26, t += n / 67108864 | 0, t += o >>> 26, this.words[i] = 67108863 & o
                }
                return 0 !== t && (this.words[i] = t, this.length++), this
            }, o.prototype.muln = function(e) {
                return this.clone().imuln(e)
            }, o.prototype.sqr = function() {
                return this.mul(this)
            }, o.prototype.isqr = function() {
                return this.imul(this.clone())
            }, o.prototype.pow = function(e) {
                var t = function(e) {
                    for (var t = new Array(e.bitLength()), i = 0; i < t.length; i++) {
                        var r = i / 26 | 0,
                            n = i % 26;
                        t[i] = (e.words[r] & 1 << n) >>> n
                    }
                    return t
                }(e);
                if (0 === t.length) return new o(1);
                for (var i = this, r = 0; r < t.length && 0 === t[r]; r++, i = i.sqr());
                if (++r < t.length)
                    for (var n = i.sqr(); r < t.length; r++, n = n.sqr()) 0 !== t[r] && (i = i.mul(n));
                return i
            }, o.prototype.iushln = function(e) {
                r("number" == typeof e && e >= 0);
                var t, i = e % 26,
                    n = (e - i) / 26,
                    o = 67108863 >>> 26 - i << 26 - i;
                if (0 !== i) {
                    var a = 0;
                    for (t = 0; t < this.length; t++) {
                        var s = this.words[t] & o,
                            d = (0 | this.words[t]) - s << i;
                        this.words[t] = d | a, a = s >>> 26 - i
                    }
                    a && (this.words[t] = a, this.length++)
                }
                if (0 !== n) {
                    for (t = this.length - 1; t >= 0; t--) this.words[t + n] = this.words[t];
                    for (t = 0; t < n; t++) this.words[t] = 0;
                    this.length += n
                }
                return this.strip()
            }, o.prototype.ishln = function(e) {
                return r(0 === this.negative), this.iushln(e)
            }, o.prototype.iushrn = function(e, t, i) {
                var n;
                r("number" == typeof e && e >= 0), n = t ? (t - t % 26) / 26 : 0;
                var o = e % 26,
                    a = Math.min((e - o) / 26, this.length),
                    s = 67108863 ^ 67108863 >>> o << o,
                    d = i;
                if (n -= a, n = Math.max(0, n), d) {
                    for (var u = 0; u < a; u++) d.words[u] = this.words[u];
                    d.length = a
                }
                if (0 === a);
                else if (this.length > a)
                    for (this.length -= a, u = 0; u < this.length; u++) this.words[u] = this.words[u + a];
                else this.words[0] = 0, this.length = 1;
                var f = 0;
                for (u = this.length - 1; u >= 0 && (0 !== f || u >= n); u--) {
                    var c = 0 | this.words[u];
                    this.words[u] = f << 26 - o | c >>> o, f = c & s
                }
                return d && 0 !== f && (d.words[d.length++] = f), 0 === this.length && (this.words[0] = 0, this.length = 1), this.strip()
            }, o.prototype.ishrn = function(e, t, i) {
                return r(0 === this.negative), this.iushrn(e, t, i)
            }, o.prototype.shln = function(e) {
                return this.clone().ishln(e)
            }, o.prototype.ushln = function(e) {
                return this.clone().iushln(e)
            }, o.prototype.shrn = function(e) {
                return this.clone().ishrn(e)
            }, o.prototype.ushrn = function(e) {
                return this.clone().iushrn(e)
            }, o.prototype.testn = function(e) {
                r("number" == typeof e && e >= 0);
                var t = e % 26,
                    i = (e - t) / 26,
                    n = 1 << t;
                return !(this.length <= i) && !!(this.words[i] & n)
            }, o.prototype.imaskn = function(e) {
                r("number" == typeof e && e >= 0);
                var t = e % 26,
                    i = (e - t) / 26;
                if (r(0 === this.negative, "imaskn works only with positive numbers"), this.length <= i) return this;
                if (0 !== t && i++, this.length = Math.min(i, this.length), 0 !== t) {
                    var n = 67108863 ^ 67108863 >>> t << t;
                    this.words[this.length - 1] &= n
                }
                return this.strip()
            }, o.prototype.maskn = function(e) {
                return this.clone().imaskn(e)
            }, o.prototype.iaddn = function(e) {
                return r("number" == typeof e), r(e < 67108864), e < 0 ? this.isubn(-e) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) < e ? (this.words[0] = e - (0 | this.words[0]), this.negative = 0, this) : (this.negative = 0, this.isubn(e), this.negative = 1, this) : this._iaddn(e)
            }, o.prototype._iaddn = function(e) {
                this.words[0] += e;
                for (var t = 0; t < this.length && this.words[t] >= 67108864; t++) this.words[t] -= 67108864, t === this.length - 1 ? this.words[t + 1] = 1 : this.words[t + 1]++;
                return this.length = Math.max(this.length, t + 1), this
            }, o.prototype.isubn = function(e) {
                if (r("number" == typeof e), r(e < 67108864), e < 0) return this.iaddn(-e);
                if (0 !== this.negative) return this.negative = 0, this.iaddn(e), this.negative = 1, this;
                if (this.words[0] -= e, 1 === this.length && this.words[0] < 0) this.words[0] = -this.words[0], this.negative = 1;
                else
                    for (var t = 0; t < this.length && this.words[t] < 0; t++) this.words[t] += 67108864, this.words[t + 1] -= 1;
                return this.strip()
            }, o.prototype.addn = function(e) {
                return this.clone().iaddn(e)
            }, o.prototype.subn = function(e) {
                return this.clone().isubn(e)
            }, o.prototype.iabs = function() {
                return this.negative = 0, this
            }, o.prototype.abs = function() {
                return this.clone().iabs()
            }, o.prototype._ishlnsubmul = function(e, t, i) {
                var n, o, a = e.length + i;
                this._expand(a);
                var s = 0;
                for (n = 0; n < e.length; n++) {
                    o = (0 | this.words[n + i]) + s;
                    var d = (0 | e.words[n]) * t;
                    s = ((o -= 67108863 & d) >> 26) - (d / 67108864 | 0), this.words[n + i] = 67108863 & o
                }
                for (; n < this.length - i; n++) s = (o = (0 | this.words[n + i]) + s) >> 26, this.words[n + i] = 67108863 & o;
                if (0 === s) return this.strip();
                for (r(-1 === s), s = 0, n = 0; n < this.length; n++) s = (o = -(0 | this.words[n]) + s) >> 26, this.words[n] = 67108863 & o;
                return this.negative = 1, this.strip()
            }, o.prototype._wordDiv = function(e, t) {
                var i = (this.length, e.length),
                    r = this.clone(),
                    n = e,
                    a = 0 | n.words[n.length - 1];
                0 !== (i = 26 - this._countBits(a)) && (n = n.ushln(i), r.iushln(i), a = 0 | n.words[n.length - 1]);
                var s, d = r.length - n.length;
                if ("mod" !== t) {
                    (s = new o(null)).length = d + 1, s.words = new Array(s.length);
                    for (var u = 0; u < s.length; u++) s.words[u] = 0
                }
                var f = r.clone()._ishlnsubmul(n, 1, d);
                0 === f.negative && (r = f, s && (s.words[d] = 1));
                for (var c = d - 1; c >= 0; c--) {
                    var l = 67108864 * (0 | r.words[n.length + c]) + (0 | r.words[n.length + c - 1]);
                    for (l = Math.min(l / a | 0, 67108863), r._ishlnsubmul(n, l, c); 0 !== r.negative;) l--, r.negative = 0, r._ishlnsubmul(n, 1, c), r.isZero() || (r.negative ^= 1);
                    s && (s.words[c] = l)
                }
                return s && s.strip(), r.strip(), "div" !== t && 0 !== i && r.iushrn(i), {
                    div: s || null,
                    mod: r
                }
            }, o.prototype.divmod = function(e, t, i) {
                return r(!e.isZero()), this.isZero() ? {
                    div: new o(0),
                    mod: new o(0)
                } : 0 !== this.negative && 0 === e.negative ? (s = this.neg().divmod(e, t), "mod" !== t && (n = s.div.neg()), "div" !== t && (a = s.mod.neg(), i && 0 !== a.negative && a.iadd(e)), {
                    div: n,
                    mod: a
                }) : 0 === this.negative && 0 !== e.negative ? (s = this.divmod(e.neg(), t), "mod" !== t && (n = s.div.neg()), {
                    div: n,
                    mod: s.mod
                }) : 0 != (this.negative & e.negative) ? (s = this.neg().divmod(e.neg(), t), "div" !== t && (a = s.mod.neg(), i && 0 !== a.negative && a.isub(e)), {
                    div: s.div,
                    mod: a
                }) : e.length > this.length || this.cmp(e) < 0 ? {
                    div: new o(0),
                    mod: this
                } : 1 === e.length ? "div" === t ? {
                    div: this.divn(e.words[0]),
                    mod: null
                } : "mod" === t ? {
                    div: null,
                    mod: new o(this.modn(e.words[0]))
                } : {
                    div: this.divn(e.words[0]),
                    mod: new o(this.modn(e.words[0]))
                } : this._wordDiv(e, t);
                var n, a, s
            }, o.prototype.div = function(e) {
                return this.divmod(e, "div", !1).div
            }, o.prototype.mod = function(e) {
                return this.divmod(e, "mod", !1).mod
            }, o.prototype.umod = function(e) {
                return this.divmod(e, "mod", !0).mod
            }, o.prototype.divRound = function(e) {
                var t = this.divmod(e);
                if (t.mod.isZero()) return t.div;
                var i = 0 !== t.div.negative ? t.mod.isub(e) : t.mod,
                    r = e.ushrn(1),
                    n = e.andln(1),
                    o = i.cmp(r);
                return o < 0 || 1 === n && 0 === o ? t.div : 0 !== t.div.negative ? t.div.isubn(1) : t.div.iaddn(1)
            }, o.prototype.modn = function(e) {
                r(e <= 67108863);
                for (var t = (1 << 26) % e, i = 0, n = this.length - 1; n >= 0; n--) i = (t * i + (0 | this.words[n])) % e;
                return i
            }, o.prototype.idivn = function(e) {
                r(e <= 67108863);
                for (var t = 0, i = this.length - 1; i >= 0; i--) {
                    var n = (0 | this.words[i]) + 67108864 * t;
                    this.words[i] = n / e | 0, t = n % e
                }
                return this.strip()
            }, o.prototype.divn = function(e) {
                return this.clone().idivn(e)
            }, o.prototype.egcd = function(e) {
                r(0 === e.negative), r(!e.isZero());
                var t = this,
                    i = e.clone();
                t = 0 !== t.negative ? t.umod(e) : t.clone();
                for (var n = new o(1), a = new o(0), s = new o(0), d = new o(1), u = 0; t.isEven() && i.isEven();) t.iushrn(1), i.iushrn(1), ++u;
                for (var f = i.clone(), c = t.clone(); !t.isZero();) {
                    for (var l = 0, h = 1; 0 == (t.words[0] & h) && l < 26; ++l, h <<= 1);
                    if (l > 0)
                        for (t.iushrn(l); l-- > 0;)(n.isOdd() || a.isOdd()) && (n.iadd(f), a.isub(c)), n.iushrn(1), a.iushrn(1);
                    for (var p = 0, _ = 1; 0 == (i.words[0] & _) && p < 26; ++p, _ <<= 1);
                    if (p > 0)
                        for (i.iushrn(p); p-- > 0;)(s.isOdd() || d.isOdd()) && (s.iadd(f), d.isub(c)), s.iushrn(1), d.iushrn(1);
                    t.cmp(i) >= 0 ? (t.isub(i), n.isub(s), a.isub(d)) : (i.isub(t), s.isub(n), d.isub(a))
                }
                return {
                    a: s,
                    b: d,
                    gcd: i.iushln(u)
                }
            }, o.prototype._invmp = function(e) {
                r(0 === e.negative), r(!e.isZero());
                var t = this,
                    i = e.clone();
                t = 0 !== t.negative ? t.umod(e) : t.clone();
                for (var n, a = new o(1), s = new o(0), d = i.clone(); t.cmpn(1) > 0 && i.cmpn(1) > 0;) {
                    for (var u = 0, f = 1; 0 == (t.words[0] & f) && u < 26; ++u, f <<= 1);
                    if (u > 0)
                        for (t.iushrn(u); u-- > 0;) a.isOdd() && a.iadd(d), a.iushrn(1);
                    for (var c = 0, l = 1; 0 == (i.words[0] & l) && c < 26; ++c, l <<= 1);
                    if (c > 0)
                        for (i.iushrn(c); c-- > 0;) s.isOdd() && s.iadd(d), s.iushrn(1);
                    t.cmp(i) >= 0 ? (t.isub(i), a.isub(s)) : (i.isub(t), s.isub(a))
                }
                return (n = 0 === t.cmpn(1) ? a : s).cmpn(0) < 0 && n.iadd(e), n
            }, o.prototype.gcd = function(e) {
                if (this.isZero()) return e.abs();
                if (e.isZero()) return this.abs();
                var t = this.clone(),
                    i = e.clone();
                t.negative = 0, i.negative = 0;
                for (var r = 0; t.isEven() && i.isEven(); r++) t.iushrn(1), i.iushrn(1);
                for (;;) {
                    for (; t.isEven();) t.iushrn(1);
                    for (; i.isEven();) i.iushrn(1);
                    var n = t.cmp(i);
                    if (n < 0) {
                        var o = t;
                        t = i, i = o
                    } else if (0 === n || 0 === i.cmpn(1)) break;
                    t.isub(i)
                }
                return i.iushln(r)
            }, o.prototype.invm = function(e) {
                return this.egcd(e).a.umod(e)
            }, o.prototype.isEven = function() {
                return 0 == (1 & this.words[0])
            }, o.prototype.isOdd = function() {
                return 1 == (1 & this.words[0])
            }, o.prototype.andln = function(e) {
                return this.words[0] & e
            }, o.prototype.bincn = function(e) {
                r("number" == typeof e);
                var t = e % 26,
                    i = (e - t) / 26,
                    n = 1 << t;
                if (this.length <= i) return this._expand(i + 1), this.words[i] |= n, this;
                for (var o = n, a = i; 0 !== o && a < this.length; a++) {
                    var s = 0 | this.words[a];
                    o = (s += o) >>> 26, s &= 67108863, this.words[a] = s
                }
                return 0 !== o && (this.words[a] = o, this.length++), this
            }, o.prototype.isZero = function() {
                return 1 === this.length && 0 === this.words[0]
            }, o.prototype.cmpn = function(e) {
                var t, i = e < 0;
                if (0 !== this.negative && !i) return -1;
                if (0 === this.negative && i) return 1;
                if (this.strip(), this.length > 1) t = 1;
                else {
                    i && (e = -e), r(e <= 67108863, "Number is too big");
                    var n = 0 | this.words[0];
                    t = n === e ? 0 : n < e ? -1 : 1
                }
                return 0 !== this.negative ? 0 | -t : t
            }, o.prototype.cmp = function(e) {
                if (0 !== this.negative && 0 === e.negative) return -1;
                if (0 === this.negative && 0 !== e.negative) return 1;
                var t = this.ucmp(e);
                return 0 !== this.negative ? 0 | -t : t
            }, o.prototype.ucmp = function(e) {
                if (this.length > e.length) return 1;
                if (this.length < e.length) return -1;
                for (var t = 0, i = this.length - 1; i >= 0; i--) {
                    var r = 0 | this.words[i],
                        n = 0 | e.words[i];
                    if (r !== n) {
                        r < n ? t = -1 : r > n && (t = 1);
                        break
                    }
                }
                return t
            }, o.prototype.gtn = function(e) {
                return 1 === this.cmpn(e)
            }, o.prototype.gt = function(e) {
                return 1 === this.cmp(e)
            }, o.prototype.gten = function(e) {
                return this.cmpn(e) >= 0
            }, o.prototype.gte = function(e) {
                return this.cmp(e) >= 0
            }, o.prototype.ltn = function(e) {
                return -1 === this.cmpn(e)
            }, o.prototype.lt = function(e) {
                return -1 === this.cmp(e)
            }, o.prototype.lten = function(e) {
                return this.cmpn(e) <= 0
            }, o.prototype.lte = function(e) {
                return this.cmp(e) <= 0
            }, o.prototype.eqn = function(e) {
                return 0 === this.cmpn(e)
            }, o.prototype.eq = function(e) {
                return 0 === this.cmp(e)
            }, o.red = function(e) {
                return new w(e)
            }, o.prototype.toRed = function(e) {
                return r(!this.red, "Already a number in reduction context"), r(0 === this.negative, "red works only with positives"), e.convertTo(this)._forceRed(e)
            }, o.prototype.fromRed = function() {
                return r(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this)
            }, o.prototype._forceRed = function(e) {
                return this.red = e, this
            }, o.prototype.forceRed = function(e) {
                return r(!this.red, "Already a number in reduction context"), this._forceRed(e)
            }, o.prototype.redAdd = function(e) {
                return r(this.red, "redAdd works only with red numbers"), this.red.add(this, e)
            }, o.prototype.redIAdd = function(e) {
                return r(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, e)
            }, o.prototype.redSub = function(e) {
                return r(this.red, "redSub works only with red numbers"), this.red.sub(this, e)
            }, o.prototype.redISub = function(e) {
                return r(this.red, "redISub works only with red numbers"), this.red.isub(this, e)
            }, o.prototype.redShl = function(e) {
                return r(this.red, "redShl works only with red numbers"), this.red.shl(this, e)
            }, o.prototype.redMul = function(e) {
                return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.mul(this, e)
            }, o.prototype.redIMul = function(e) {
                return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.imul(this, e)
            }, o.prototype.redSqr = function() {
                return r(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this)
            }, o.prototype.redISqr = function() {
                return r(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this)
            }, o.prototype.redSqrt = function() {
                return r(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this)
            }, o.prototype.redInvm = function() {
                return r(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this)
            }, o.prototype.redNeg = function() {
                return r(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this)
            }, o.prototype.redPow = function(e) {
                return r(this.red && !e.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, e)
            };
            var y = {
                k256: null,
                p224: null,
                p192: null,
                p25519: null
            };

            function b(e, t) {
                this.name = e, this.p = new o(t, 16), this.n = this.p.bitLength(), this.k = new o(1).iushln(this.n).isub(this.p), this.tmp = this._tmp()
            }

            function g() {
                b.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
            }

            function v() {
                b.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
            }

            function m() {
                b.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
            }

            function A() {
                b.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
            }

            function w(e) {
                if ("string" == typeof e) {
                    var t = o._prime(e);
                    this.m = t.p, this.prime = t
                } else r(e.gtn(1), "modulus must be greater than 1"), this.m = e, this.prime = null
            }

            function E(e) {
                w.call(this, e), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new o(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv)
            }
            b.prototype._tmp = function() {
                var e = new o(null);
                return e.words = new Array(Math.ceil(this.n / 13)), e
            }, b.prototype.ireduce = function(e) {
                var t, i = e;
                do {
                    this.split(i, this.tmp), t = (i = (i = this.imulK(i)).iadd(this.tmp)).bitLength()
                } while (t > this.n);
                var r = t < this.n ? -1 : i.ucmp(this.p);
                return 0 === r ? (i.words[0] = 0, i.length = 1) : r > 0 ? i.isub(this.p) : i.strip(), i
            }, b.prototype.split = function(e, t) {
                e.iushrn(this.n, 0, t)
            }, b.prototype.imulK = function(e) {
                return e.imul(this.k)
            }, n(g, b), g.prototype.split = function(e, t) {
                for (var i = Math.min(e.length, 9), r = 0; r < i; r++) t.words[r] = e.words[r];
                if (t.length = i, e.length <= 9) return e.words[0] = 0, void(e.length = 1);
                var n = e.words[9];
                for (t.words[t.length++] = 4194303 & n, r = 10; r < e.length; r++) {
                    var o = 0 | e.words[r];
                    e.words[r - 10] = (4194303 & o) << 4 | n >>> 22, n = o
                }
                n >>>= 22, e.words[r - 10] = n, 0 === n && e.length > 10 ? e.length -= 10 : e.length -= 9
            }, g.prototype.imulK = function(e) {
                e.words[e.length] = 0, e.words[e.length + 1] = 0, e.length += 2;
                for (var t = 0, i = 0; i < e.length; i++) {
                    var r = 0 | e.words[i];
                    t += 977 * r, e.words[i] = 67108863 & t, t = 64 * r + (t / 67108864 | 0)
                }
                return 0 === e.words[e.length - 1] && (e.length--, 0 === e.words[e.length - 1] && e.length--), e
            }, n(v, b), n(m, b), n(A, b), A.prototype.imulK = function(e) {
                for (var t = 0, i = 0; i < e.length; i++) {
                    var r = 19 * (0 | e.words[i]) + t,
                        n = 67108863 & r;
                    r >>>= 26, e.words[i] = n, t = r
                }
                return 0 !== t && (e.words[e.length++] = t), e
            }, o._prime = function(e) {
                if (y[e]) return y[e];
                var t;
                if ("k256" === e) t = new g;
                else if ("p224" === e) t = new v;
                else if ("p192" === e) t = new m;
                else {
                    if ("p25519" !== e) throw new Error("Unknown prime " + e);
                    t = new A
                }
                return y[e] = t, t
            }, w.prototype._verify1 = function(e) {
                r(0 === e.negative, "red works only with positives"), r(e.red, "red works only with red numbers")
            }, w.prototype._verify2 = function(e, t) {
                r(0 == (e.negative | t.negative), "red works only with positives"), r(e.red && e.red === t.red, "red works only with red numbers")
            }, w.prototype.imod = function(e) {
                return this.prime ? this.prime.ireduce(e)._forceRed(this) : e.umod(this.m)._forceRed(this)
            }, w.prototype.neg = function(e) {
                return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this)
            }, w.prototype.add = function(e, t) {
                this._verify2(e, t);
                var i = e.add(t);
                return i.cmp(this.m) >= 0 && i.isub(this.m), i._forceRed(this)
            }, w.prototype.iadd = function(e, t) {
                this._verify2(e, t);
                var i = e.iadd(t);
                return i.cmp(this.m) >= 0 && i.isub(this.m), i
            }, w.prototype.sub = function(e, t) {
                this._verify2(e, t);
                var i = e.sub(t);
                return i.cmpn(0) < 0 && i.iadd(this.m), i._forceRed(this)
            }, w.prototype.isub = function(e, t) {
                this._verify2(e, t);
                var i = e.isub(t);
                return i.cmpn(0) < 0 && i.iadd(this.m), i
            }, w.prototype.shl = function(e, t) {
                return this._verify1(e), this.imod(e.ushln(t))
            }, w.prototype.imul = function(e, t) {
                return this._verify2(e, t), this.imod(e.imul(t))
            }, w.prototype.mul = function(e, t) {
                return this._verify2(e, t), this.imod(e.mul(t))
            }, w.prototype.isqr = function(e) {
                return this.imul(e, e.clone())
            }, w.prototype.sqr = function(e) {
                return this.mul(e, e)
            }, w.prototype.sqrt = function(e) {
                if (e.isZero()) return e.clone();
                var t = this.m.andln(3);
                if (r(t % 2 == 1), 3 === t) {
                    var i = this.m.add(new o(1)).iushrn(2);
                    return this.pow(e, i)
                }
                for (var n = this.m.subn(1), a = 0; !n.isZero() && 0 === n.andln(1);) a++, n.iushrn(1);
                r(!n.isZero());
                var s = new o(1).toRed(this),
                    d = s.redNeg(),
                    u = this.m.subn(1).iushrn(1),
                    f = this.m.bitLength();
                for (f = new o(2 * f * f).toRed(this); 0 !== this.pow(f, u).cmp(d);) f.redIAdd(d);
                for (var c = this.pow(f, n), l = this.pow(e, n.addn(1).iushrn(1)), h = this.pow(e, n), p = a; 0 !== h.cmp(s);) {
                    for (var _ = h, y = 0; 0 !== _.cmp(s); y++) _ = _.redSqr();
                    r(y < p);
                    var b = this.pow(c, new o(1).iushln(p - y - 1));
                    l = l.redMul(b), c = b.redSqr(), h = h.redMul(c), p = y
                }
                return l
            }, w.prototype.invm = function(e) {
                var t = e._invmp(this.m);
                return 0 !== t.negative ? (t.negative = 0, this.imod(t).redNeg()) : this.imod(t)
            }, w.prototype.pow = function(e, t) {
                if (t.isZero()) return new o(1).toRed(this);
                if (0 === t.cmpn(1)) return e.clone();
                var i = new Array(16);
                i[0] = new o(1).toRed(this), i[1] = e;
                for (var r = 2; r < i.length; r++) i[r] = this.mul(i[r - 1], e);
                var n = i[0],
                    a = 0,
                    s = 0,
                    d = t.bitLength() % 26;
                for (0 === d && (d = 26), r = t.length - 1; r >= 0; r--) {
                    for (var u = t.words[r], f = d - 1; f >= 0; f--) {
                        var c = u >> f & 1;
                        n !== i[0] && (n = this.sqr(n)), 0 !== c || 0 !== a ? (a <<= 1, a |= c, (4 === ++s || 0 === r && 0 === f) && (n = this.mul(n, i[a]), s = 0, a = 0)) : s = 0
                    }
                    d = 26
                }
                return n
            }, w.prototype.convertTo = function(e) {
                var t = e.umod(this.m);
                return t === e ? t.clone() : t
            }, w.prototype.convertFrom = function(e) {
                var t = e.clone();
                return t.red = null, t
            }, o.mont = function(e) {
                return new E(e)
            }, n(E, w), E.prototype.convertTo = function(e) {
                return this.imod(e.ushln(this.shift))
            }, E.prototype.convertFrom = function(e) {
                var t = this.imod(e.mul(this.rinv));
                return t.red = null, t
            }, E.prototype.imul = function(e, t) {
                if (e.isZero() || t.isZero()) return e.words[0] = 0, e.length = 1, e;
                var i = e.imul(t),
                    r = i.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                    n = i.isub(r).iushrn(this.shift),
                    o = n;
                return n.cmp(this.m) >= 0 ? o = n.isub(this.m) : n.cmpn(0) < 0 && (o = n.iadd(this.m)), o._forceRed(this)
            }, E.prototype.mul = function(e, t) {
                if (e.isZero() || t.isZero()) return new o(0)._forceRed(this);
                var i = e.mul(t),
                    r = i.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                    n = i.isub(r).iushrn(this.shift),
                    a = n;
                return n.cmp(this.m) >= 0 ? a = n.isub(this.m) : n.cmpn(0) < 0 && (a = n.iadd(this.m)), a._forceRed(this)
            }, E.prototype.invm = function(e) {
                return this.imod(e._invmp(this.m).mul(this.r2))._forceRed(this)
            }
        }(void 0 === e || e, this)
    }).call(this, i(47)(e))
}, function(e, t, i) {
    "use strict";
    var r = i(132),
        n = i(137),
        o = i(93),
        a = i(143),
        s = r.sum32,
        d = r.sum32_4,
        u = r.sum32_5,
        f = o.ch32,
        c = o.maj32,
        l = o.s0_256,
        h = o.s1_256,
        p = o.g0_256,
        _ = o.g1_256,
        y = n.BlockHash,
        b = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];

    function g() {
        if (!(this instanceof g)) return new g;
        y.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], this.k = b, this.W = new Array(64)
    }
    r.inherits(g, y), e.exports = g, g.blockSize = 512, g.outSize = 256, g.hmacStrength = 192, g.padLength = 64, g.prototype._update = function(e, t) {
        for (var i = this.W, r = 0; r < 16; r++) i[r] = e[t + r];
        for (; r < i.length; r++) i[r] = d(_(i[r - 2]), i[r - 7], p(i[r - 15]), i[r - 16]);
        var n = this.h[0],
            o = this.h[1],
            y = this.h[2],
            b = this.h[3],
            g = this.h[4],
            v = this.h[5],
            m = this.h[6],
            A = this.h[7];
        for (a(this.k.length === i.length), r = 0; r < i.length; r++) {
            var w = u(A, h(g), f(g, v, m), this.k[r], i[r]),
                E = s(l(n), c(n, o, y));
            A = m, m = v, v = g, g = s(b, w), b = y, y = o, o = n, n = s(w, E)
        }
        this.h[0] = s(this.h[0], n), this.h[1] = s(this.h[1], o), this.h[2] = s(this.h[2], y), this.h[3] = s(this.h[3], b), this.h[4] = s(this.h[4], g), this.h[5] = s(this.h[5], v), this.h[6] = s(this.h[6], m), this.h[7] = s(this.h[7], A)
    }, g.prototype._digest = function(e) {
        return "hex" === e ? r.toHex32(this.h, "big") : r.split32(this.h, "big")
    }
}, function(e, t, i) {
    (function(t) {
        e.exports = function(e, i) {
            for (var r = Math.min(e.length, i.length), n = new t(r), o = 0; o < r; ++o) n[o] = e[o] ^ i[o];
            return n
        }
    }).call(this, i(11).Buffer)
}, function(e) {
    e.exports = {
        "aes-128-ecb": {
            cipher: "AES",
            key: 128,
            iv: 0,
            mode: "ECB",
            type: "block"
        },
        "aes-192-ecb": {
            cipher: "AES",
            key: 192,
            iv: 0,
            mode: "ECB",
            type: "block"
        },
        "aes-256-ecb": {
            cipher: "AES",
            key: 256,
            iv: 0,
            mode: "ECB",
            type: "block"
        },
        "aes-128-cbc": {
            cipher: "AES",
            key: 128,
            iv: 16,
            mode: "CBC",
            type: "block"
        },
        "aes-192-cbc": {
            cipher: "AES",
            key: 192,
            iv: 16,
            mode: "CBC",
            type: "block"
        },
        "aes-256-cbc": {
            cipher: "AES",
            key: 256,
            iv: 16,
            mode: "CBC",
            type: "block"
        },
        aes128: {
            cipher: "AES",
            key: 128,
            iv: 16,
            mode: "CBC",
            type: "block"
        },
        aes192: {
            cipher: "AES",
            key: 192,
            iv: 16,
            mode: "CBC",
            type: "block"
        },
        aes256: {
            cipher: "AES",
            key: 256,
            iv: 16,
            mode: "CBC",
            type: "block"
        },
        "aes-128-cfb": {
            cipher: "AES",
            key: 128,
            iv: 16,
            mode: "CFB",
            type: "stream"
        },
        "aes-192-cfb": {
            cipher: "AES",
            key: 192,
            iv: 16,
            mode: "CFB",
            type: "stream"
        },
        "aes-256-cfb": {
            cipher: "AES",
            key: 256,
            iv: 16,
            mode: "CFB",
            type: "stream"
        },
        "aes-128-cfb8": {
            cipher: "AES",
            key: 128,
            iv: 16,
            mode: "CFB8",
            type: "stream"
        },
        "aes-192-cfb8": {
            cipher: "AES",
            key: 192,
            iv: 16,
            mode: "CFB8",
            type: "stream"
        },
        "aes-256-cfb8": {
            cipher: "AES",
            key: 256,
            iv: 16,
            mode: "CFB8",
            type: "stream"
        },
        "aes-128-cfb1": {
            cipher: "AES",
            key: 128,
            iv: 16,
            mode: "CFB1",
            type: "stream"
        },
        "aes-192-cfb1": {
            cipher: "AES",
            key: 192,
            iv: 16,
            mode: "CFB1",
            type: "stream"
        },
        "aes-256-cfb1": {
            cipher: "AES",
            key: 256,
            iv: 16,
            mode: "CFB1",
            type: "stream"
        },
        "aes-128-ofb": {
            cipher: "AES",
            key: 128,
            iv: 16,
            mode: "OFB",
            type: "stream"
        },
        "aes-192-ofb": {
            cipher: "AES",
            key: 192,
            iv: 16,
            mode: "OFB",
            type: "stream"
        },
        "aes-256-ofb": {
            cipher: "AES",
            key: 256,
            iv: 16,
            mode: "OFB",
            type: "stream"
        },
        "aes-128-ctr": {
            cipher: "AES",
            key: 128,
            iv: 16,
            mode: "CTR",
            type: "stream"
        },
        "aes-192-ctr": {
            cipher: "AES",
            key: 192,
            iv: 16,
            mode: "CTR",
            type: "stream"
        },
        "aes-256-ctr": {
            cipher: "AES",
            key: 256,
            iv: 16,
            mode: "CTR",
            type: "stream"
        },
        "aes-128-gcm": {
            cipher: "AES",
            key: 128,
            iv: 12,
            mode: "GCM",
            type: "auth"
        },
        "aes-192-gcm": {
            cipher: "AES",
            key: 192,
            iv: 12,
            mode: "GCM",
            type: "auth"
        },
        "aes-256-gcm": {
            cipher: "AES",
            key: 256,
            iv: 12,
            mode: "GCM",
            type: "auth"
        }
    }
}, function(e, t, i) {
    t.publicEncrypt = i(54), t.privateDecrypt = i(104), t.privateEncrypt = function(e, i) {
        return t.publicEncrypt(e, i, !0)
    }, t.publicDecrypt = function(e, i) {
        return t.privateDecrypt(e, i, !0)
    }
}, function(e, t, i) {
    var r = i(133).Buffer;

    function n(e, t, i) {
        for (var r, n, a, s = -1, d = 0; ++s < 8;) r = e._cipher.encryptBlock(e._prev), n = t & 1 << 7 - s ? 128 : 0, d += (128 & (a = r[0] ^ n)) >> s % 8, e._prev = o(e._prev, i ? n : a);
        return d
    }

    function o(e, t) {
        var i = e.length,
            n = -1,
            o = r.allocUnsafe(e.length);
        for (e = r.concat([e, r.from([t])]); ++n < i;) o[n] = e[n] << 1 | e[n + 1] >> 7;
        return o
    }
    t.encrypt = function(e, t, i) {
        for (var o = t.length, a = r.allocUnsafe(o), s = -1; ++s < o;) a[s] = n(e, t[s], i);
        return a
    }
}, function(e, t, i) {
    var r = i(133).Buffer,
        n = i(70);
    e.exports = function(e, t, i, o) {
        if (r.isBuffer(e) || (e = r.from(e, "binary")), t && (r.isBuffer(t) || (t = r.from(t, "binary")), 8 !== t.length)) throw new RangeError("salt should be Buffer with 8 byte length");
        for (var a = i / 8, s = r.alloc(a), d = r.alloc(o || 0), u = r.alloc(0); a > 0 || o > 0;) {
            var f = new n;
            f.update(u), f.update(e), t && f.update(t), u = f.digest();
            var c = 0;
            if (a > 0) {
                var l = s.length - a;
                c = Math.min(a, u.length), u.copy(s, l, 0, c), a -= c
            }
            if (c < u.length && o > 0) {
                var h = d.length - o,
                    p = Math.min(o, u.length - c);
                u.copy(d, h, c, c + p), o -= p
            }
        }
        return u.fill(0), {
            key: s,
            iv: d
        }
    }
}, function(e, t, i) {
    var r;

    function n(e) {
        this.rand = e
    }
    if (e.exports = function(e) {
            return r || (r = new n(null)), r.generate(e)
        }, e.exports.Rand = n, n.prototype.generate = function(e) {
            return this._rand(e)
        }, n.prototype._rand = function(e) {
            if (this.rand.getBytes) return this.rand.getBytes(e);
            for (var t = new Uint8Array(e), i = 0; i < t.length; i++) t[i] = this.rand.getByte();
            return t
        }, "object" == typeof self) self.crypto && self.crypto.getRandomValues ? n.prototype._rand = function(e) {
        var t = new Uint8Array(e);
        return self.crypto.getRandomValues(t), t
    } : self.msCrypto && self.msCrypto.getRandomValues ? n.prototype._rand = function(e) {
        var t = new Uint8Array(e);
        return self.msCrypto.getRandomValues(t), t
    } : "object" == typeof window && (n.prototype._rand = function() {
        throw new Error("Not implemented yet")
    });
    else try {
        var o = i(46);
        if ("function" != typeof o.randomBytes) throw new Error("Not supported");
        n.prototype._rand = function(e) {
            return o.randomBytes(e)
        }
    } catch (e) {}
}, function(e) {
    e.exports = {
        modp1: {
            gen: "02",
            prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"
        },
        modp2: {
            gen: "02",
            prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"
        },
        modp5: {
            gen: "02",
            prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"
        },
        modp14: {
            gen: "02",
            prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"
        },
        modp15: {
            gen: "02",
            prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"
        },
        modp16: {
            gen: "02",
            prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"
        },
        modp17: {
            gen: "02",
            prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"
        },
        modp18: {
            gen: "02",
            prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"
        }
    }
}, function(e, t, i) {
    var r = i(133).Buffer;

    function n(e) {
        r.isBuffer(e) || (e = r.from(e));
        for (var t = e.length / 4 | 0, i = new Array(t), n = 0; n < t; n++) i[n] = e.readUInt32BE(4 * n);
        return i
    }

    function o(e) {
        for (; 0 < e.length; e++) e[0] = 0
    }

    function a(e, t, i, r, n) {
        for (var o, a, s, d, u = i[0], f = i[1], c = i[2], l = i[3], h = e[0] ^ t[0], p = e[1] ^ t[1], _ = e[2] ^ t[2], y = e[3] ^ t[3], b = 4, g = 1; g < n; g++) o = u[h >>> 24] ^ f[p >>> 16 & 255] ^ c[_ >>> 8 & 255] ^ l[255 & y] ^ t[b++], a = u[p >>> 24] ^ f[_ >>> 16 & 255] ^ c[y >>> 8 & 255] ^ l[255 & h] ^ t[b++], s = u[_ >>> 24] ^ f[y >>> 16 & 255] ^ c[h >>> 8 & 255] ^ l[255 & p] ^ t[b++], d = u[y >>> 24] ^ f[h >>> 16 & 255] ^ c[p >>> 8 & 255] ^ l[255 & _] ^ t[b++], h = o, p = a, _ = s, y = d;
        return o = (r[h >>> 24] << 24 | r[p >>> 16 & 255] << 16 | r[_ >>> 8 & 255] << 8 | r[255 & y]) ^ t[b++], a = (r[p >>> 24] << 24 | r[_ >>> 16 & 255] << 16 | r[y >>> 8 & 255] << 8 | r[255 & h]) ^ t[b++], s = (r[_ >>> 24] << 24 | r[y >>> 16 & 255] << 16 | r[h >>> 8 & 255] << 8 | r[255 & p]) ^ t[b++], d = (r[y >>> 24] << 24 | r[h >>> 16 & 255] << 16 | r[p >>> 8 & 255] << 8 | r[255 & _]) ^ t[b++], [o >>>= 0, a >>>= 0, s >>>= 0, d >>>= 0]
    }
    var s = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
        d = function() {
            for (var e = new Array(256), t = 0; t < 256; t++) e[t] = t < 128 ? t << 1 : t << 1 ^ 283;
            for (var i = [], r = [], n = [
                    [],
                    [],
                    [],
                    []
                ], o = [
                    [],
                    [],
                    [],
                    []
                ], a = 0, s = 0, d = 0; d < 256; ++d) {
                var u = s ^ s << 1 ^ s << 2 ^ s << 3 ^ s << 4;
                u = u >>> 8 ^ 255 & u ^ 99, i[a] = u, r[u] = a;
                var f = e[a],
                    c = e[f],
                    l = e[c],
                    h = 257 * e[u] ^ 16843008 * u;
                n[0][a] = h << 24 | h >>> 8, n[1][a] = h << 16 | h >>> 16, n[2][a] = h << 8 | h >>> 24, n[3][a] = h, h = 16843009 * l ^ 65537 * c ^ 257 * f ^ 16843008 * a, o[0][u] = h << 24 | h >>> 8, o[1][u] = h << 16 | h >>> 16, o[2][u] = h << 8 | h >>> 24, o[3][u] = h, 0 === a ? a = s = 1 : (a = f ^ e[e[e[l ^ f]]], s ^= e[e[s]])
            }
            return {
                SBOX: i,
                INV_SBOX: r,
                SUB_MIX: n,
                INV_SUB_MIX: o
            }
        }();

    function u(e) {
        this._key = n(e), this._reset()
    }
    u.blockSize = 16, u.keySize = 32, u.prototype.blockSize = u.blockSize, u.prototype.keySize = u.keySize, u.prototype._reset = function() {
        for (var e = this._key, t = e.length, i = t + 6, r = 4 * (i + 1), n = [], o = 0; o < t; o++) n[o] = e[o];
        for (o = t; o < r; o++) {
            var a = n[o - 1];
            o % t == 0 ? (a = a << 8 | a >>> 24, a = d.SBOX[a >>> 24] << 24 | d.SBOX[a >>> 16 & 255] << 16 | d.SBOX[a >>> 8 & 255] << 8 | d.SBOX[255 & a], a ^= s[o / t | 0] << 24) : t > 6 && o % t == 4 && (a = d.SBOX[a >>> 24] << 24 | d.SBOX[a >>> 16 & 255] << 16 | d.SBOX[a >>> 8 & 255] << 8 | d.SBOX[255 & a]), n[o] = n[o - t] ^ a
        }
        for (var u = [], f = 0; f < r; f++) {
            var c = r - f,
                l = n[c - (f % 4 ? 0 : 4)];
            u[f] = f < 4 || c <= 4 ? l : d.INV_SUB_MIX[0][d.SBOX[l >>> 24]] ^ d.INV_SUB_MIX[1][d.SBOX[l >>> 16 & 255]] ^ d.INV_SUB_MIX[2][d.SBOX[l >>> 8 & 255]] ^ d.INV_SUB_MIX[3][d.SBOX[255 & l]]
        }
        this._nRounds = i, this._keySchedule = n, this._invKeySchedule = u
    }, u.prototype.encryptBlockRaw = function(e) {
        return a(e = n(e), this._keySchedule, d.SUB_MIX, d.SBOX, this._nRounds)
    }, u.prototype.encryptBlock = function(e) {
        var t = this.encryptBlockRaw(e),
            i = r.allocUnsafe(16);
        return i.writeUInt32BE(t[0], 0), i.writeUInt32BE(t[1], 4), i.writeUInt32BE(t[2], 8), i.writeUInt32BE(t[3], 12), i
    }, u.prototype.decryptBlock = function(e) {
        var t = (e = n(e))[1];
        e[1] = e[3], e[3] = t;
        var i = a(e, this._invKeySchedule, d.INV_SUB_MIX, d.INV_SBOX, this._nRounds),
            o = r.allocUnsafe(16);
        return o.writeUInt32BE(i[0], 0), o.writeUInt32BE(i[3], 4), o.writeUInt32BE(i[2], 8), o.writeUInt32BE(i[1], 12), o
    }, u.prototype.scrub = function() {
        o(this._keySchedule), o(this._invKeySchedule), o(this._key)
    }, e.exports.AES = u
}, function(e, t, i) {
    var r = i(107);
    t.encrypt = function(e, t) {
        var i = r(t, e._prev);
        return e._prev = e._cipher.encryptBlock(i), e._prev
    }, t.decrypt = function(e, t) {
        var i = e._prev;
        e._prev = t;
        var n = e._cipher.decryptBlock(t);
        return r(n, i)
    }
}, function(e, t, i) {
    var r = i(26).Reporter,
        n = i(26).EncoderBuffer,
        o = i(26).DecoderBuffer,
        a = i(143),
        s = ["seq", "seqof", "set", "setof", "objid", "bool", "gentime", "utctime", "null_", "enum", "int", "objDesc", "bitstr", "bmpstr", "charstr", "genstr", "graphstr", "ia5str", "iso646str", "numstr", "octstr", "printstr", "t61str", "unistr", "utf8str", "videostr"],
        d = ["key", "obj", "use", "optional", "explicit", "implicit", "def", "choice", "any", "contains"].concat(s);

    function u(e, t) {
        var i = {};
        this._baseState = i, i.enc = e, i.parent = t || null, i.children = null, i.tag = null, i.args = null, i.reverseArgs = null, i.choice = null, i.optional = !1, i.any = !1, i.obj = !1, i.use = null, i.useDecoder = null, i.key = null, i.default = null, i.explicit = null, i.implicit = null, i.contains = null, i.parent || (i.children = [], this._wrap())
    }
    e.exports = u;
    var f = ["enc", "parent", "children", "tag", "args", "reverseArgs", "choice", "optional", "any", "obj", "use", "alteredUse", "key", "default", "explicit", "implicit", "contains"];
    u.prototype.clone = function() {
        var e = this._baseState,
            t = {};
        f.forEach(function(i) {
            t[i] = e[i]
        });
        var i = new this.constructor(t.parent);
        return i._baseState = t, i
    }, u.prototype._wrap = function() {
        var e = this._baseState;
        d.forEach(function(t) {
            this[t] = function() {
                var i = new this.constructor(this);
                return e.children.push(i), i[t].apply(i, arguments)
            }
        }, this)
    }, u.prototype._init = function(e) {
        var t = this._baseState;
        a(null === t.parent), e.call(this), t.children = t.children.filter(function(e) {
            return e._baseState.parent === this
        }, this), a.equal(t.children.length, 1, "Root node can have only one child")
    }, u.prototype._useArgs = function(e) {
        var t = this._baseState,
            i = e.filter(function(e) {
                return e instanceof this.constructor
            }, this);
        e = e.filter(function(e) {
            return !(e instanceof this.constructor)
        }, this), 0 !== i.length && (a(null === t.children), t.children = i, i.forEach(function(e) {
            e._baseState.parent = this
        }, this)), 0 !== e.length && (a(null === t.args), t.args = e, t.reverseArgs = e.map(function(e) {
            if ("object" != typeof e || e.constructor !== Object) return e;
            var t = {};
            return Object.keys(e).forEach(function(i) {
                i == (0 | i) && (i |= 0);
                var r = e[i];
                t[r] = i
            }), t
        }))
    }, ["_peekTag", "_decodeTag", "_use", "_decodeStr", "_decodeObjid", "_decodeTime", "_decodeNull", "_decodeInt", "_decodeBool", "_decodeList", "_encodeComposite", "_encodeStr", "_encodeObjid", "_encodeTime", "_encodeNull", "_encodeInt", "_encodeBool"].forEach(function(e) {
        u.prototype[e] = function() {
            var t = this._baseState;
            throw new Error(e + " not implemented for encoding: " + t.enc)
        }
    }), s.forEach(function(e) {
        u.prototype[e] = function() {
            var t = this._baseState,
                i = Array.prototype.slice.call(arguments);
            return a(null === t.tag), t.tag = e, this._useArgs(i), this
        }
    }), u.prototype.use = function(e) {
        a(e);
        var t = this._baseState;
        return a(null === t.use), t.use = e, this
    }, u.prototype.optional = function() {
        return this._baseState.optional = !0, this
    }, u.prototype.def = function(e) {
        var t = this._baseState;
        return a(null === t.default), t.default = e, t.optional = !0, this
    }, u.prototype.explicit = function(e) {
        var t = this._baseState;
        return a(null === t.explicit && null === t.implicit), t.explicit = e, this
    }, u.prototype.implicit = function(e) {
        var t = this._baseState;
        return a(null === t.explicit && null === t.implicit), t.implicit = e, this
    }, u.prototype.obj = function() {
        var e = this._baseState,
            t = Array.prototype.slice.call(arguments);
        return e.obj = !0, 0 !== t.length && this._useArgs(t), this
    }, u.prototype.key = function(e) {
        var t = this._baseState;
        return a(null === t.key), t.key = e, this
    }, u.prototype.any = function() {
        return this._baseState.any = !0, this
    }, u.prototype.choice = function(e) {
        var t = this._baseState;
        return a(null === t.choice), t.choice = e, this._useArgs(Object.keys(e).map(function(t) {
            return e[t]
        })), this
    }, u.prototype.contains = function(e) {
        var t = this._baseState;
        return a(null === t.use), t.contains = e, this
    }, u.prototype._decode = function(e, t) {
        var i = this._baseState;
        if (null === i.parent) return e.wrapResult(i.children[0]._decode(e, t));
        var r, n = i.default,
            a = !0,
            s = null;
        if (null !== i.key && (s = e.enterKey(i.key)), i.optional) {
            var d = null;
            if (null !== i.explicit ? d = i.explicit : null !== i.implicit ? d = i.implicit : null !== i.tag && (d = i.tag), null !== d || i.any) {
                if (a = this._peekTag(e, d, i.any), e.isError(a)) return a
            } else {
                var u = e.save();
                try {
                    null === i.choice ? this._decodeGeneric(i.tag, e, t) : this._decodeChoice(e, t), a = !0
                } catch (e) {
                    a = !1
                }
                e.restore(u)
            }
        }
        if (i.obj && a && (r = e.enterObject()), a) {
            if (null !== i.explicit) {
                var f = this._decodeTag(e, i.explicit);
                if (e.isError(f)) return f;
                e = f
            }
            var c = e.offset;
            if (null === i.use && null === i.choice) {
                if (i.any) u = e.save();
                var l = this._decodeTag(e, null !== i.implicit ? i.implicit : i.tag, i.any);
                if (e.isError(l)) return l;
                i.any ? n = e.raw(u) : e = l
            }
            if (t && t.track && null !== i.tag && t.track(e.path(), c, e.length, "tagged"), t && t.track && null !== i.tag && t.track(e.path(), e.offset, e.length, "content"), n = i.any ? n : null === i.choice ? this._decodeGeneric(i.tag, e, t) : this._decodeChoice(e, t), e.isError(n)) return n;
            if (i.any || null !== i.choice || null === i.children || i.children.forEach(function(i) {
                    i._decode(e, t)
                }), i.contains && ("octstr" === i.tag || "bitstr" === i.tag)) {
                var h = new o(n);
                n = this._getUse(i.contains, e._reporterState.obj)._decode(h, t)
            }
        }
        return i.obj && a && (n = e.leaveObject(r)), null === i.key || null === n && !0 !== a ? null !== s && e.exitKey(s) : e.leaveKey(s, i.key, n), n
    }, u.prototype._decodeGeneric = function(e, t, i) {
        var r = this._baseState;
        return "seq" === e || "set" === e ? null : "seqof" === e || "setof" === e ? this._decodeList(t, e, r.args[0], i) : /str$/.test(e) ? this._decodeStr(t, e, i) : "objid" === e && r.args ? this._decodeObjid(t, r.args[0], r.args[1], i) : "objid" === e ? this._decodeObjid(t, null, null, i) : "gentime" === e || "utctime" === e ? this._decodeTime(t, e, i) : "null_" === e ? this._decodeNull(t, i) : "bool" === e ? this._decodeBool(t, i) : "objDesc" === e ? this._decodeStr(t, e, i) : "int" === e || "enum" === e ? this._decodeInt(t, r.args && r.args[0], i) : null !== r.use ? this._getUse(r.use, t._reporterState.obj)._decode(t, i) : t.error("unknown tag: " + e)
    }, u.prototype._getUse = function(e, t) {
        var i = this._baseState;
        return i.useDecoder = this._use(e, t), a(null === i.useDecoder._baseState.parent), i.useDecoder = i.useDecoder._baseState.children[0], i.implicit !== i.useDecoder._baseState.implicit && (i.useDecoder = i.useDecoder.clone(), i.useDecoder._baseState.implicit = i.implicit), i.useDecoder
    }, u.prototype._decodeChoice = function(e, t) {
        var i = this._baseState,
            r = null,
            n = !1;
        return Object.keys(i.choice).some(function(o) {
            var a = e.save(),
                s = i.choice[o];
            try {
                var d = s._decode(e, t);
                if (e.isError(d)) return !1;
                r = {
                    type: o,
                    value: d
                }, n = !0
            } catch (t) {
                return e.restore(a), !1
            }
            return !0
        }, this), n ? r : e.error("Choice not matched")
    }, u.prototype._createEncoderBuffer = function(e) {
        return new n(e, this.reporter)
    }, u.prototype._encode = function(e, t, i) {
        var r = this._baseState;
        if (null === r.default || r.default !== e) {
            var n = this._encodeValue(e, t, i);
            if (void 0 !== n && !this._skipDefault(n, t, i)) return n
        }
    }, u.prototype._encodeValue = function(e, t, i) {
        var n = this._baseState;
        if (null === n.parent) return n.children[0]._encode(e, t || new r);
        var o = null;
        if (this.reporter = t, n.optional && void 0 === e) {
            if (null === n.default) return;
            e = n.default
        }
        var a = null,
            s = !1;
        if (n.any) o = this._createEncoderBuffer(e);
        else if (n.choice) o = this._encodeChoice(e, t);
        else if (n.contains) a = this._getUse(n.contains, i)._encode(e, t), s = !0;
        else if (n.children) a = n.children.map(function(i) {
            if ("null_" === i._baseState.tag) return i._encode(null, t, e);
            if (null === i._baseState.key) return t.error("Child should have a key");
            var r = t.enterKey(i._baseState.key);
            if ("object" != typeof e) return t.error("Child expected, but input is not object");
            var n = i._encode(e[i._baseState.key], t, e);
            return t.leaveKey(r), n
        }, this).filter(function(e) {
            return e
        }), a = this._createEncoderBuffer(a);
        else if ("seqof" === n.tag || "setof" === n.tag) {
            if (!n.args || 1 !== n.args.length) return t.error("Too many args for : " + n.tag);
            if (!Array.isArray(e)) return t.error("seqof/setof, but data is not Array");
            var d = this.clone();
            d._baseState.implicit = null, a = this._createEncoderBuffer(e.map(function(i) {
                var r = this._baseState;
                return this._getUse(r.args[0], e)._encode(i, t)
            }, d))
        } else null !== n.use ? o = this._getUse(n.use, i)._encode(e, t) : (a = this._encodePrimitive(n.tag, e), s = !0);
        if (!n.any && null === n.choice) {
            var u = null !== n.implicit ? n.implicit : n.tag,
                f = null === n.implicit ? "universal" : "context";
            null === u ? null === n.use && t.error("Tag could be omitted only for .use()") : null === n.use && (o = this._encodeComposite(u, s, f, a))
        }
        return null !== n.explicit && (o = this._encodeComposite(n.explicit, !1, "context", o)), o
    }, u.prototype._encodeChoice = function(e, t) {
        var i = this._baseState,
            r = i.choice[e.type];
        return r || a(!1, e.type + " not found in " + JSON.stringify(Object.keys(i.choice))), r._encode(e.value, t)
    }, u.prototype._encodePrimitive = function(e, t) {
        var i = this._baseState;
        if (/str$/.test(e)) return this._encodeStr(t, e);
        if ("objid" === e && i.args) return this._encodeObjid(t, i.reverseArgs[0], i.args[1]);
        if ("objid" === e) return this._encodeObjid(t, null, null);
        if ("gentime" === e || "utctime" === e) return this._encodeTime(t, e);
        if ("null_" === e) return this._encodeNull();
        if ("int" === e || "enum" === e) return this._encodeInt(t, i.args && i.reverseArgs[0]);
        if ("bool" === e) return this._encodeBool(t);
        if ("objDesc" === e) return this._encodeStr(t, e);
        throw new Error("Unsupported tag: " + e)
    }, u.prototype._isNumstr = function(e) {
        return /^[0-9 ]*$/.test(e)
    }, u.prototype._isPrintstr = function(e) {
        return /^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test(e)
    }
}, function(e, t, i) {
    (function(t) {
        var r = i(105),
            n = i(24);

        function o(e, i) {
            var n = function(e) {
                    var t = a(e);
                    return {
                        blinder: t.toRed(r.mont(e.modulus)).redPow(new r(e.publicExponent)).fromRed(),
                        unblinder: t.invm(e.modulus)
                    }
                }(i),
                o = i.modulus.byteLength(),
                s = (r.mont(i.modulus), new r(e).mul(n.blinder).umod(i.modulus)),
                d = s.toRed(r.mont(i.prime1)),
                u = s.toRed(r.mont(i.prime2)),
                f = i.coefficient,
                c = i.prime1,
                l = i.prime2,
                h = d.redPow(i.exponent1),
                p = u.redPow(i.exponent2);
            h = h.fromRed(), p = p.fromRed();
            var _ = h.isub(p).imul(f).umod(c);
            return _.imul(l), p.iadd(_), new t(p.imul(n.unblinder).umod(i.modulus).toArray(!1, o))
        }

        function a(e) {
            for (var t = e.modulus.byteLength(), i = new r(n(t)); i.cmp(e.modulus) >= 0 || !i.umod(e.prime1) || !i.umod(e.prime2);) i = new r(n(t));
            return i
        }
        e.exports = o, o.getr = a
    }).call(this, i(11).Buffer)
}, function(e, t, i) {
    (function(t) {
        var r = i(10);

        function n(e) {
            var i = new t(4);
            return i.writeUInt32BE(e, 0), i
        }
        e.exports = function(e, i) {
            for (var o, a = new t(""), s = 0; a.length < i;) o = n(s++), a = t.concat([a, r("sha1").update(e).update(o).digest()]);
            return a.slice(0, i)
        }
    }).call(this, i(11).Buffer)
}, function(e, t, i) {
    var r = t;
    r.bignum = i(105), r.define = i(159).define, r.base = i(26), r.constants = i(76), r.decoders = i(40), r.encoders = i(18)
}, function(e, t, i) {
    (function(t) {
        var r = i(49),
            n = i(80),
            o = i(39),
            a = {
                "des-ede3-cbc": n.CBC.instantiate(n.EDE),
                "des-ede3": n.EDE,
                "des-ede-cbc": n.CBC.instantiate(n.EDE),
                "des-ede": n.EDE,
                "des-cbc": n.CBC.instantiate(n.DES),
                "des-ecb": n.DES
            };

        function s(e) {
            r.call(this);
            var i, n = e.mode.toLowerCase(),
                o = a[n];
            i = e.decrypt ? "decrypt" : "encrypt";
            var s = e.key;
            "des-ede" !== n && "des-ede-cbc" !== n || (s = t.concat([s, s.slice(0, 8)]));
            var d = e.iv;
            this._des = o.create({
                key: s,
                iv: d,
                type: i
            })
        }
        a.des = a["des-cbc"], a.des3 = a["des-ede3-cbc"], e.exports = s, o(s, r), s.prototype._update = function(e) {
            return new t(this._des.update(e))
        }, s.prototype._final = function() {
            return new t(this._des.final())
        }
    }).call(this, i(11).Buffer)
}, function(e, t, i) {
    var r = i(133).Buffer;

    function n(e, t) {
        this._block = r.alloc(e), this._finalSize = t, this._blockSize = e, this._len = 0
    }
    n.prototype.update = function(e, t) {
        "string" == typeof e && (t = t || "utf8", e = r.from(e, t));
        for (var i = this._block, n = this._blockSize, o = e.length, a = this._len, s = 0; s < o;) {
            for (var d = a % n, u = Math.min(o - s, n - d), f = 0; f < u; f++) i[d + f] = e[s + f];
            s += u, (a += u) % n == 0 && this._update(i)
        }
        return this._len += o, this
    }, n.prototype.digest = function(e) {
        var t = this._len % this._blockSize;
        this._block[t] = 128, this._block.fill(0, t + 1), t >= this._finalSize && (this._update(this._block), this._block.fill(0));
        var i = 8 * this._len;
        if (i <= 4294967295) this._block.writeUInt32BE(i, this._blockSize - 4);
        else {
            var r = (4294967295 & i) >>> 0,
                n = (i - r) / 4294967296;
            this._block.writeUInt32BE(n, this._blockSize - 8), this._block.writeUInt32BE(r, this._blockSize - 4)
        }
        this._update(this._block);
        var o = this._hash();
        return e ? o.toString(e) : o
    }, n.prototype._update = function() {
        throw new Error("_update must be implemented by subclass")
    }, e.exports = n
}, function(e, t, i) {
    "use strict";
    e.exports = o;
    var r = i(58),
        n = i(9);

    function o(e) {
        if (!(this instanceof o)) return new o(e);
        r.call(this, e)
    }
    n.inherits = i(39), n.inherits(o, r), o.prototype._transform = function(e, t, i) {
        i(null, e)
    }
}, function(e, t, i) {
    "use strict";
    var r = i(142),
        n = i(61),
        o = i(105),
        a = i(39),
        s = r.base,
        d = n.utils.assert;

    function u(e) {
        this.twisted = 1 != (0 | e.a), this.mOneA = this.twisted && -1 == (0 | e.a), this.extended = this.mOneA, s.call(this, "edwards", e), this.a = new o(e.a, 16).umod(this.red.m), this.a = this.a.toRed(this.red), this.c = new o(e.c, 16).toRed(this.red), this.c2 = this.c.redSqr(), this.d = new o(e.d, 16).toRed(this.red), this.dd = this.d.redAdd(this.d), d(!this.twisted || 0 === this.c.fromRed().cmpn(1)), this.oneC = 1 == (0 | e.c)
    }

    function f(e, t, i, r, n) {
        s.BasePoint.call(this, e, "projective"), null === t && null === i && null === r ? (this.x = this.curve.zero, this.y = this.curve.one, this.z = this.curve.one, this.t = this.curve.zero, this.zOne = !0) : (this.x = new o(t, 16), this.y = new o(i, 16), this.z = r ? new o(r, 16) : this.curve.one, this.t = n && new o(n, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)), this.zOne = this.z === this.curve.one, this.curve.extended && !this.t && (this.t = this.x.redMul(this.y), this.zOne || (this.t = this.t.redMul(this.z.redInvm()))))
    }
    a(u, s), e.exports = u, u.prototype._mulA = function(e) {
        return this.mOneA ? e.redNeg() : this.a.redMul(e)
    }, u.prototype._mulC = function(e) {
        return this.oneC ? e : this.c.redMul(e)
    }, u.prototype.jpoint = function(e, t, i, r) {
        return this.point(e, t, i, r)
    }, u.prototype.pointFromX = function(e, t) {
        (e = new o(e, 16)).red || (e = e.toRed(this.red));
        var i = e.redSqr(),
            r = this.c2.redSub(this.a.redMul(i)),
            n = this.one.redSub(this.c2.redMul(this.d).redMul(i)),
            a = r.redMul(n.redInvm()),
            s = a.redSqrt();
        if (0 !== s.redSqr().redSub(a).cmp(this.zero)) throw new Error("invalid point");
        var d = s.fromRed().isOdd();
        return (t && !d || !t && d) && (s = s.redNeg()), this.point(e, s)
    }, u.prototype.pointFromY = function(e, t) {
        (e = new o(e, 16)).red || (e = e.toRed(this.red));
        var i = e.redSqr(),
            r = i.redSub(this.one),
            n = i.redMul(this.d).redAdd(this.one),
            a = r.redMul(n.redInvm());
        if (0 === a.cmp(this.zero)) {
            if (t) throw new Error("invalid point");
            return this.point(this.zero, e)
        }
        var s = a.redSqrt();
        if (0 !== s.redSqr().redSub(a).cmp(this.zero)) throw new Error("invalid point");
        return s.isOdd() !== t && (s = s.redNeg()), this.point(s, e)
    }, u.prototype.validate = function(e) {
        if (e.isInfinity()) return !0;
        e.normalize();
        var t = e.x.redSqr(),
            i = e.y.redSqr(),
            r = t.redMul(this.a).redAdd(i),
            n = this.c2.redMul(this.one.redAdd(this.d.redMul(t).redMul(i)));
        return 0 === r.cmp(n)
    }, a(f, s.BasePoint), u.prototype.pointFromJSON = function(e) {
        return f.fromJSON(this, e)
    }, u.prototype.point = function(e, t, i, r) {
        return new f(this, e, t, i, r)
    }, f.fromJSON = function(e, t) {
        return new f(e, t[0], t[1], t[2])
    }, f.prototype.inspect = function() {
        return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
    }, f.prototype.isInfinity = function() {
        return 0 === this.x.cmpn(0) && 0 === this.y.cmp(this.z)
    }, f.prototype._extDbl = function() {
        var e = this.x.redSqr(),
            t = this.y.redSqr(),
            i = this.z.redSqr();
        i = i.redIAdd(i);
        var r = this.curve._mulA(e),
            n = this.x.redAdd(this.y).redSqr().redISub(e).redISub(t),
            o = r.redAdd(t),
            a = o.redSub(i),
            s = r.redSub(t),
            d = n.redMul(a),
            u = o.redMul(s),
            f = n.redMul(s),
            c = a.redMul(o);
        return this.curve.point(d, u, c, f)
    }, f.prototype._projDbl = function() {
        var e, t, i, r = this.x.redAdd(this.y).redSqr(),
            n = this.x.redSqr(),
            o = this.y.redSqr();
        if (this.curve.twisted) {
            var a = (u = this.curve._mulA(n)).redAdd(o);
            if (this.zOne) e = r.redSub(n).redSub(o).redMul(a.redSub(this.curve.two)), t = a.redMul(u.redSub(o)), i = a.redSqr().redSub(a).redSub(a);
            else {
                var s = this.z.redSqr(),
                    d = a.redSub(s).redISub(s);
                e = r.redSub(n).redISub(o).redMul(d), t = a.redMul(u.redSub(o)), i = a.redMul(d)
            }
        } else {
            var u = n.redAdd(o);
            s = this.curve._mulC(this.c.redMul(this.z)).redSqr(), d = u.redSub(s).redSub(s);
            e = this.curve._mulC(r.redISub(u)).redMul(d), t = this.curve._mulC(u).redMul(n.redISub(o)), i = u.redMul(d)
        }
        return this.curve.point(e, t, i)
    }, f.prototype.dbl = function() {
        return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl()
    }, f.prototype._extAdd = function(e) {
        var t = this.y.redSub(this.x).redMul(e.y.redSub(e.x)),
            i = this.y.redAdd(this.x).redMul(e.y.redAdd(e.x)),
            r = this.t.redMul(this.curve.dd).redMul(e.t),
            n = this.z.redMul(e.z.redAdd(e.z)),
            o = i.redSub(t),
            a = n.redSub(r),
            s = n.redAdd(r),
            d = i.redAdd(t),
            u = o.redMul(a),
            f = s.redMul(d),
            c = o.redMul(d),
            l = a.redMul(s);
        return this.curve.point(u, f, l, c)
    }, f.prototype._projAdd = function(e) {
        var t, i, r = this.z.redMul(e.z),
            n = r.redSqr(),
            o = this.x.redMul(e.x),
            a = this.y.redMul(e.y),
            s = this.curve.d.redMul(o).redMul(a),
            d = n.redSub(s),
            u = n.redAdd(s),
            f = this.x.redAdd(this.y).redMul(e.x.redAdd(e.y)).redISub(o).redISub(a),
            c = r.redMul(d).redMul(f);
        return this.curve.twisted ? (t = r.redMul(u).redMul(a.redSub(this.curve._mulA(o))), i = d.redMul(u)) : (t = r.redMul(u).redMul(a.redSub(o)), i = this.curve._mulC(d).redMul(u)), this.curve.point(c, t, i)
    }, f.prototype.add = function(e) {
        return this.isInfinity() ? e : e.isInfinity() ? this : this.curve.extended ? this._extAdd(e) : this._projAdd(e)
    }, f.prototype.mul = function(e) {
        return this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve._wnafMul(this, e)
    }, f.prototype.mulAdd = function(e, t, i) {
        return this.curve._wnafMulAdd(1, [this, t], [e, i], 2, !1)
    }, f.prototype.jmulAdd = function(e, t, i) {
        return this.curve._wnafMulAdd(1, [this, t], [e, i], 2, !0)
    }, f.prototype.normalize = function() {
        if (this.zOne) return this;
        var e = this.z.redInvm();
        return this.x = this.x.redMul(e), this.y = this.y.redMul(e), this.t && (this.t = this.t.redMul(e)), this.z = this.curve.one, this.zOne = !0, this
    }, f.prototype.neg = function() {
        return this.curve.point(this.x.redNeg(), this.y, this.z, this.t && this.t.redNeg())
    }, f.prototype.getX = function() {
        return this.normalize(), this.x.fromRed()
    }, f.prototype.getY = function() {
        return this.normalize(), this.y.fromRed()
    }, f.prototype.eq = function(e) {
        return this === e || 0 === this.getX().cmp(e.getX()) && 0 === this.getY().cmp(e.getY())
    }, f.prototype.eqXToP = function(e) {
        var t = e.toRed(this.curve.red).redMul(this.z);
        if (0 === this.x.cmp(t)) return !0;
        for (var i = e.clone(), r = this.curve.redN.redMul(this.z);;) {
            if (i.iadd(this.curve.n), i.cmp(this.curve.p) >= 0) return !1;
            if (t.redIAdd(r), 0 === this.x.cmp(t)) return !0
        }
        return !1
    }, f.prototype.toP = f.prototype.normalize, f.prototype.mixedAdd = f.prototype.add
}, function(e, t, i) {
    var r = i(39),
        n = i(121),
        o = i(133).Buffer,
        a = [1518500249, 1859775393, -1894007588, -899497514],
        s = new Array(80);

    function d() {
        this.init(), this._w = s, n.call(this, 64, 56)
    }

    function u(e) {
        return e << 5 | e >>> 27
    }

    function f(e) {
        return e << 30 | e >>> 2
    }

    function c(e, t, i, r) {
        return 0 === e ? t & i | ~t & r : 2 === e ? t & i | t & r | i & r : t ^ i ^ r
    }
    r(d, n), d.prototype.init = function() {
        return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
    }, d.prototype._update = function(e) {
        for (var t, i = this._w, r = 0 | this._a, n = 0 | this._b, o = 0 | this._c, s = 0 | this._d, d = 0 | this._e, l = 0; l < 16; ++l) i[l] = e.readInt32BE(4 * l);
        for (; l < 80; ++l) i[l] = (t = i[l - 3] ^ i[l - 8] ^ i[l - 14] ^ i[l - 16]) << 1 | t >>> 31;
        for (var h = 0; h < 80; ++h) {
            var p = ~~(h / 20),
                _ = u(r) + c(p, n, o, s) + d + i[h] + a[p] | 0;
            d = s, s = o, o = f(n), n = r, r = _
        }
        this._a = r + this._a | 0, this._b = n + this._b | 0, this._c = o + this._c | 0, this._d = s + this._d | 0, this._e = d + this._e | 0
    }, d.prototype._hash = function() {
        var e = o.allocUnsafe(20);
        return e.writeInt32BE(0 | this._a, 0), e.writeInt32BE(0 | this._b, 4), e.writeInt32BE(0 | this._c, 8), e.writeInt32BE(0 | this._d, 12), e.writeInt32BE(0 | this._e, 16), e
    }, e.exports = d
}, function(e, t, i) {
    "use strict";
    i.r(t), i.d(t, "parseFwd", function() {
        return s
    }), i.d(t, "convertKludgesToAttaches", function() {
        return d
    }), i.d(t, "isReservedPeer", function() {
        return u
    }), i.d(t, "isUserPeer", function() {
        return f
    }), i.d(t, "isChatPeer", function() {
        return c
    });
    var r = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var i = [],
                        r = !0,
                        n = !1,
                        o = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (i.push(a.value), !t || i.length !== t); r = !0);
                    } catch (e) {
                        n = !0, o = e
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (n) throw o
                        }
                    }
                    return i
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        n = window.intval;

    function o(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
            i = e.split("_"),
            n = r(i, 2);
        return [n[0], n[1], t]
    }
    var a = {};

    function s(e) {
        if (a[e]) return a[e];
        for (var t = e ? e.length : 0, i = [], n = [], s = "", d = 0; d < t; d++) {
            var u = e[d],
                f = u.charCodeAt(0);
            f >= 48 && f <= 57 || "_" === u || "-" === u ? s += u : "(" !== u && ")" !== u && ":" !== u && "," !== u || ("" !== s && (n.push(s), i.push("id"), s = ""), n.push(u), i.push(u))
        }
        s.length > 0 && (n.push(s), i.push("id"));
        var c = function e(t, i) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                    a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                if (a > 50) return [
                    [], t.length
                ];
                for (var s = [], d = ""; n < t.length;) {
                    var u = t[n];
                    if ("id" === u) d = i[n];
                    else if ("," === u && d) s.push(o(d)), d = "";
                    else if ("(" === u) {
                        var f = e(t, i, n + 1, a + 1),
                            c = r(f, 2),
                            l = c[0];
                        n = c[1], s.push(o(d, l)), d = ""
                    } else if (")" === u) return "" !== d && s.push(o(d)), [s, n];
                    n++
                }
                return d && s.push(o(d)), [s, n]
            }(i, n),
            l = r(c, 1)[0];
        return Object.keys(a).length > 300 && (a = {}), a[e] = l, l
    }

    function d(e, t) {
        var i = [];
        e.fwd_count ? i.push({
            type: "mail",
            id: -t,
            object: {
                fwd_count: e.fwd_count
            }
        }) : e.fwd && i.push({
            type: "mail",
            id: -t,
            object: {
                fwd_count: s(e.fwd).length
            }
        });
        for (var r = 1; e["attach" + r + "_type"]; ++r) "call" === e["attach" + r + "_type"] ? i.push({
            type: e["attach" + r + "_type"],
            id: e["attach" + r],
            initiatorId: n(e["attach" + r + "_call_initiator_id"]),
            state: e["attach" + r + "_call_state"],
            duration: n(e["attach" + r + "_call_duration"]),
            receiverId: n(e["attach" + r + "_call_receiver_id"])
        }) : i.push({
            type: e["attach" + r + "_type"],
            id: e["attach" + r],
            kind: e["attach" + r + "_kind"],
            productId: e["attach" + r + "_product_id"]
        });
        return e.geo && i.push({
            type: "geo",
            id: e.geo
        }), i
    }

    function u(e) {
        return 0 == e
    }

    function f(e) {
        return e > 0 && e < 2e9
    }

    function c(e) {
        return e > 2e9
    }
}, function(e, t, i) {
    e.exports = i(102).Transform
}, function(e, t, i) {
    (function(e) {
        var r = i(107);

        function n(e) {
            return e._prev = e._cipher.encryptBlock(e._prev), e._prev
        }
        t.encrypt = function(t, i) {
            for (; t._cache.length < i.length;) t._cache = e.concat([t._cache, n(t)]);
            var o = t._cache.slice(0, i.length);
            return t._cache = t._cache.slice(i.length), r(i, o)
        }
    }).call(this, i(11).Buffer)
}, function(e, t) {
    var i, r, n = e.exports = {};

    function o() {
        throw new Error("setTimeout has not been defined")
    }

    function a() {
        throw new Error("clearTimeout has not been defined")
    }

    function s(e) {
        if (i === setTimeout) return setTimeout(e, 0);
        if ((i === o || !i) && setTimeout) return i = setTimeout, setTimeout(e, 0);
        try {
            return i(e, 0)
        } catch (t) {
            try {
                return i.call(null, e, 0)
            } catch (t) {
                return i.call(this, e, 0)
            }
        }
    }! function() {
        try {
            i = "function" == typeof setTimeout ? setTimeout : o
        } catch (e) {
            i = o
        }
        try {
            r = "function" == typeof clearTimeout ? clearTimeout : a
        } catch (e) {
            r = a
        }
    }();
    var d, u = [],
        f = !1,
        c = -1;

    function l() {
        f && d && (f = !1, d.length ? u = d.concat(u) : c = -1, u.length && h())
    }

    function h() {
        if (!f) {
            var e = s(l);
            f = !0;
            for (var t = u.length; t;) {
                for (d = u, u = []; ++c < t;) d && d[c].run();
                c = -1, t = u.length
            }
            d = null, f = !1,
                function(e) {
                    if (r === clearTimeout) return clearTimeout(e);
                    if ((r === a || !r) && clearTimeout) return r = clearTimeout, clearTimeout(e);
                    try {
                        r(e)
                    } catch (t) {
                        try {
                            return r.call(null, e)
                        } catch (t) {
                            return r.call(this, e)
                        }
                    }
                }(e)
        }
    }

    function p(e, t) {
        this.fun = e, this.array = t
    }

    function _() {}
    n.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
        u.push(new p(e, t)), 1 !== u.length || f || s(h)
    }, p.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, n.title = "browser", n.browser = !0, n.env = {}, n.argv = [], n.version = "", n.versions = {}, n.on = _, n.addListener = _, n.once = _, n.off = _, n.removeListener = _, n.removeAllListeners = _, n.emit = _, n.prependListener = _, n.prependOnceListener = _, n.listeners = function(e) {
        return []
    }, n.binding = function(e) {
        throw new Error("process.binding is not supported")
    }, n.cwd = function() {
        return "/"
    }, n.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }, n.umask = function() {
        return 0
    }
}, function(e, t, i) {
    var r = i(76);
    t.tagClass = {
        0: "universal",
        1: "application",
        2: "context",
        3: "private"
    }, t.tagClassByName = r._reverse(t.tagClass), t.tag = {
        0: "end",
        1: "bool",
        2: "int",
        3: "bitstr",
        4: "octstr",
        5: "null_",
        6: "objid",
        7: "objDesc",
        8: "external",
        9: "real",
        10: "enum",
        11: "embed",
        12: "utf8str",
        13: "relativeOid",
        16: "seq",
        17: "set",
        18: "numstr",
        19: "printstr",
        20: "t61str",
        21: "videostr",
        22: "ia5str",
        23: "utctime",
        24: "gentime",
        25: "graphstr",
        26: "iso646str",
        27: "genstr",
        28: "unistr",
        29: "charstr",
        30: "bmpstr"
    }, t.tagByName = r._reverse(t.tag)
}, function(e, t, i) {
    t.pbkdf2 = i(91), t.pbkdf2Sync = i(15)
}, function(e, t, i) {
    "use strict";
    (function(e, r) {
        function n() {
            throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11")
        }
        var o = i(133),
            a = i(24),
            s = o.Buffer,
            d = o.kMaxLength,
            u = e.crypto || e.msCrypto,
            f = Math.pow(2, 32) - 1;

        function c(e, t) {
            if ("number" != typeof e || e != e) throw new TypeError("offset must be a number");
            if (e > f || e < 0) throw new TypeError("offset must be a uint32");
            if (e > d || e > t) throw new RangeError("offset out of range")
        }

        function l(e, t, i) {
            if ("number" != typeof e || e != e) throw new TypeError("size must be a number");
            if (e > f || e < 0) throw new TypeError("size must be a uint32");
            if (e + t > i || e > d) throw new RangeError("buffer too small")
        }

        function h(e, t, i, n) {
            if (r.browser) {
                var o = e.buffer,
                    s = new Uint8Array(o, t, i);
                return u.getRandomValues(s), n ? void r.nextTick(function() {
                    n(null, e)
                }) : e
            }
            if (!n) return a(i).copy(e, t), e;
            a(i, function(i, r) {
                if (i) return n(i);
                r.copy(e, t), n(null, e)
            })
        }
        u && u.getRandomValues || !r.browser ? (t.randomFill = function(t, i, r, n) {
            if (!(s.isBuffer(t) || t instanceof e.Uint8Array)) throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
            if ("function" == typeof i) n = i, i = 0, r = t.length;
            else if ("function" == typeof r) n = r, r = t.length - i;
            else if ("function" != typeof n) throw new TypeError('"cb" argument must be a function');
            return c(i, t.length), l(r, i, t.length), h(t, i, r, n)
        }, t.randomFillSync = function(t, i, r) {
            void 0 === i && (i = 0);
            if (!(s.isBuffer(t) || t instanceof e.Uint8Array)) throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
            c(i, t.length), void 0 === r && (r = t.length - i);
            return l(r, i, t.length), h(t, i, r)
        }) : (t.randomFill = n, t.randomFillSync = n)
    }).call(this, i(38), i(128))
}, function(e, t, i) {
    "use strict";
    var r = i(143),
        n = i(39);

    function o(e) {
        return (e >>> 24 | e >>> 8 & 65280 | e << 8 & 16711680 | (255 & e) << 24) >>> 0
    }

    function a(e) {
        return 1 === e.length ? "0" + e : e
    }

    function s(e) {
        return 7 === e.length ? "0" + e : 6 === e.length ? "00" + e : 5 === e.length ? "000" + e : 4 === e.length ? "0000" + e : 3 === e.length ? "00000" + e : 2 === e.length ? "000000" + e : 1 === e.length ? "0000000" + e : e
    }
    t.inherits = n, t.toArray = function(e, t) {
        if (Array.isArray(e)) return e.slice();
        if (!e) return [];
        var i = [];
        if ("string" == typeof e)
            if (t) {
                if ("hex" === t)
                    for ((e = e.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (e = "0" + e), r = 0; r < e.length; r += 2) i.push(parseInt(e[r] + e[r + 1], 16))
            } else
                for (var r = 0; r < e.length; r++) {
                    var n = e.charCodeAt(r),
                        o = n >> 8,
                        a = 255 & n;
                    o ? i.push(o, a) : i.push(a)
                } else
                    for (r = 0; r < e.length; r++) i[r] = 0 | e[r];
        return i
    }, t.toHex = function(e) {
        for (var t = "", i = 0; i < e.length; i++) t += a(e[i].toString(16));
        return t
    }, t.htonl = o, t.toHex32 = function(e, t) {
        for (var i = "", r = 0; r < e.length; r++) {
            var n = e[r];
            "little" === t && (n = o(n)), i += s(n.toString(16))
        }
        return i
    }, t.zero2 = a, t.zero8 = s, t.join32 = function(e, t, i, n) {
        var o = i - t;
        r(o % 4 == 0);
        for (var a = new Array(o / 4), s = 0, d = t; s < a.length; s++, d += 4) {
            var u;
            u = "big" === n ? e[d] << 24 | e[d + 1] << 16 | e[d + 2] << 8 | e[d + 3] : e[d + 3] << 24 | e[d + 2] << 16 | e[d + 1] << 8 | e[d], a[s] = u >>> 0
        }
        return a
    }, t.split32 = function(e, t) {
        for (var i = new Array(4 * e.length), r = 0, n = 0; r < e.length; r++, n += 4) {
            var o = e[r];
            "big" === t ? (i[n] = o >>> 24, i[n + 1] = o >>> 16 & 255, i[n + 2] = o >>> 8 & 255, i[n + 3] = 255 & o) : (i[n + 3] = o >>> 24, i[n + 2] = o >>> 16 & 255, i[n + 1] = o >>> 8 & 255, i[n] = 255 & o)
        }
        return i
    }, t.rotr32 = function(e, t) {
        return e >>> t | e << 32 - t
    }, t.rotl32 = function(e, t) {
        return e << t | e >>> 32 - t
    }, t.sum32 = function(e, t) {
        return e + t >>> 0
    }, t.sum32_3 = function(e, t, i) {
        return e + t + i >>> 0
    }, t.sum32_4 = function(e, t, i, r) {
        return e + t + i + r >>> 0
    }, t.sum32_5 = function(e, t, i, r, n) {
        return e + t + i + r + n >>> 0
    }, t.sum64 = function(e, t, i, r) {
        var n = e[t],
            o = r + e[t + 1] >>> 0,
            a = (o < r ? 1 : 0) + i + n;
        e[t] = a >>> 0, e[t + 1] = o
    }, t.sum64_hi = function(e, t, i, r) {
        return (t + r >>> 0 < t ? 1 : 0) + e + i >>> 0
    }, t.sum64_lo = function(e, t, i, r) {
        return t + r >>> 0
    }, t.sum64_4_hi = function(e, t, i, r, n, o, a, s) {
        var d = 0,
            u = t;
        return d += (u = u + r >>> 0) < t ? 1 : 0, d += (u = u + o >>> 0) < o ? 1 : 0, e + i + n + a + (d += (u = u + s >>> 0) < s ? 1 : 0) >>> 0
    }, t.sum64_4_lo = function(e, t, i, r, n, o, a, s) {
        return t + r + o + s >>> 0
    }, t.sum64_5_hi = function(e, t, i, r, n, o, a, s, d, u) {
        var f = 0,
            c = t;
        return f += (c = c + r >>> 0) < t ? 1 : 0, f += (c = c + o >>> 0) < o ? 1 : 0, f += (c = c + s >>> 0) < s ? 1 : 0, e + i + n + a + d + (f += (c = c + u >>> 0) < u ? 1 : 0) >>> 0
    }, t.sum64_5_lo = function(e, t, i, r, n, o, a, s, d, u) {
        return t + r + o + s + u >>> 0
    }, t.rotr64_hi = function(e, t, i) {
        return (t << 32 - i | e >>> i) >>> 0
    }, t.rotr64_lo = function(e, t, i) {
        return (e << 32 - i | t >>> i) >>> 0
    }, t.shr64_hi = function(e, t, i) {
        return e >>> i
    }, t.shr64_lo = function(e, t, i) {
        return (e << 32 - i | t >>> i) >>> 0
    }
}, function(e, t, i) {
    var r = i(11),
        n = r.Buffer;

    function o(e, t) {
        for (var i in e) t[i] = e[i]
    }

    function a(e, t, i) {
        return n(e, t, i)
    }
    n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? e.exports = r : (o(r, t), t.Buffer = a), o(n, a), a.from = function(e, t, i) {
        if ("number" == typeof e) throw new TypeError("Argument must not be a number");
        return n(e, t, i)
    }, a.alloc = function(e, t, i) {
        if ("number" != typeof e) throw new TypeError("Argument must be a number");
        var r = n(e);
        return void 0 !== t ? "string" == typeof i ? r.fill(t, i) : r.fill(t) : r.fill(0), r
    }, a.allocUnsafe = function(e) {
        if ("number" != typeof e) throw new TypeError("Argument must be a number");
        return n(e)
    }, a.allocUnsafeSlow = function(e) {
        if ("number" != typeof e) throw new TypeError("Argument must be a number");
        return r.SlowBuffer(e)
    }
}, function(e, t, i) {
    var r = i(105),
        n = i(112);

    function o(e) {
        this.rand = e || new n.Rand
    }
    e.exports = o, o.create = function(e) {
        return new o(e)
    }, o.prototype._randbelow = function(e) {
        var t = e.bitLength(),
            i = Math.ceil(t / 8);
        do {
            var n = new r(this.rand.generate(i))
        } while (n.cmp(e) >= 0);
        return n
    }, o.prototype._randrange = function(e, t) {
        var i = t.sub(e);
        return e.add(this._randbelow(i))
    }, o.prototype.test = function(e, t, i) {
        var n = e.bitLength(),
            o = r.mont(e),
            a = new r(1).toRed(o);
        t || (t = Math.max(1, n / 48 | 0));
        for (var s = e.subn(1), d = 0; !s.testn(d); d++);
        for (var u = e.shrn(d), f = s.toRed(o); t > 0; t--) {
            var c = this._randrange(new r(2), s);
            i && i(c);
            var l = c.toRed(o).redPow(u);
            if (0 !== l.cmp(a) && 0 !== l.cmp(f)) {
                for (var h = 1; h < d; h++) {
                    if (0 === (l = l.redSqr()).cmp(a)) return !1;
                    if (0 === l.cmp(f)) break
                }
                if (h === d) return !1
            }
        }
        return !0
    }, o.prototype.getDivisor = function(e, t) {
        var i = e.bitLength(),
            n = r.mont(e),
            o = new r(1).toRed(n);
        t || (t = Math.max(1, i / 48 | 0));
        for (var a = e.subn(1), s = 0; !a.testn(s); s++);
        for (var d = e.shrn(s), u = a.toRed(n); t > 0; t--) {
            var f = this._randrange(new r(2), a),
                c = e.gcd(f);
            if (0 !== c.cmpn(1)) return c;
            var l = f.toRed(n).redPow(d);
            if (0 !== l.cmp(o) && 0 !== l.cmp(u)) {
                for (var h = 1; h < s; h++) {
                    if (0 === (l = l.redSqr()).cmp(o)) return l.fromRed().subn(1).gcd(e);
                    if (0 === l.cmp(u)) break
                }
                if (h === s) return (l = l.redSqr()).fromRed().subn(1).gcd(e)
            }
        }
        return !1
    }
}, function(e, t, i) {
    "use strict";
    var r = i(101);

    function n(e, t) {
        e.emit("error", t)
    }
    e.exports = {
        destroy: function(e, t) {
            var i = this,
                o = this._readableState && this._readableState.destroyed,
                a = this._writableState && this._writableState.destroyed;
            return o || a ? (t ? t(e) : !e || this._writableState && this._writableState.errorEmitted || r.nextTick(n, this, e), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(e || null, function(e) {
                !t && e ? (r.nextTick(n, i, e), i._writableState && (i._writableState.errorEmitted = !0)) : t && t(e)
            }), this)
        },
        undestroy: function() {
            this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1)
        }
    }
}, function(e, t, i) {
    "use strict";
    var r = i(143),
        n = i(39),
        o = {};
    t.instantiate = function(e) {
        function t(t) {
            e.call(this, t), this._cbcInit()
        }
        n(t, e);
        for (var i = Object.keys(o), r = 0; r < i.length; r++) {
            var a = i[r];
            t.prototype[a] = o[a]
        }
        return t.create = function(e) {
            return new t(e)
        }, t
    }, o._cbcInit = function() {
        var e = new function(e) {
            r.equal(e.length, 8, "Invalid IV length"), this.iv = new Array(8);
            for (var t = 0; t < this.iv.length; t++) this.iv[t] = e[t]
        }(this.options.iv);
        this._cbcState = e
    }, o._update = function(e, t, i, r) {
        var n = this._cbcState,
            o = this.constructor.super_.prototype,
            a = n.iv;
        if ("encrypt" === this.type) {
            for (var s = 0; s < this.blockSize; s++) a[s] ^= e[t + s];
            o._update.call(this, a, 0, i, r);
            for (s = 0; s < this.blockSize; s++) a[s] = i[r + s]
        } else {
            o._update.call(this, e, t, i, r);
            for (s = 0; s < this.blockSize; s++) i[r + s] ^= a[s];
            for (s = 0; s < this.blockSize; s++) a[s] = e[t + s]
        }
    }
}, function(e, t, i) {
    "use strict";
    var r = i(132),
        n = i(143);

    function o() {
        this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32
    }
    t.BlockHash = o, o.prototype.update = function(e, t) {
        if (e = r.toArray(e, t), this.pending ? this.pending = this.pending.concat(e) : this.pending = e, this.pendingTotal += e.length, this.pending.length >= this._delta8) {
            var i = (e = this.pending).length % this._delta8;
            this.pending = e.slice(e.length - i, e.length), 0 === this.pending.length && (this.pending = null), e = r.join32(e, 0, e.length - i, this.endian);
            for (var n = 0; n < e.length; n += this._delta32) this._update(e, n, n + this._delta32)
        }
        return this
    }, o.prototype.digest = function(e) {
        return this.update(this._pad()), n(null === this.pending), this._digest(e)
    }, o.prototype._pad = function() {
        var e = this.pendingTotal,
            t = this._delta8,
            i = t - (e + this.padLength) % t,
            r = new Array(i + this.padLength);
        r[0] = 128;
        for (var n = 1; n < i; n++) r[n] = 0;
        if (e <<= 3, "big" === this.endian) {
            for (var o = 8; o < this.padLength; o++) r[n++] = 0;
            r[n++] = 0, r[n++] = 0, r[n++] = 0, r[n++] = 0, r[n++] = e >>> 24 & 255, r[n++] = e >>> 16 & 255, r[n++] = e >>> 8 & 255, r[n++] = 255 & e
        } else
            for (r[n++] = 255 & e, r[n++] = e >>> 8 & 255, r[n++] = e >>> 16 & 255, r[n++] = e >>> 24 & 255, r[n++] = 0, r[n++] = 0, r[n++] = 0, r[n++] = 0, o = 8; o < this.padLength; o++) r[n++] = 0;
        return r
    }
}, function(module, exports, __webpack_require__) {
    var indexOf = __webpack_require__(151),
        Object_keys = function(e) {
            if (Object.keys) return Object.keys(e);
            var t = [];
            for (var i in e) t.push(i);
            return t
        },
        forEach = function(e, t) {
            if (e.forEach) return e.forEach(t);
            for (var i = 0; i < e.length; i++) t(e[i], i, e)
        },
        defineProp = function() {
            try {
                return Object.defineProperty({}, "_", {}),
                    function(e, t, i) {
                        Object.defineProperty(e, t, {
                            writable: !0,
                            enumerable: !1,
                            configurable: !0,
                            value: i
                        })
                    }
            } catch (e) {
                return function(e, t, i) {
                    e[t] = i
                }
            }
        }(),
        globals = ["Array", "Boolean", "Date", "Error", "EvalError", "Function", "Infinity", "JSON", "Math", "NaN", "Number", "Object", "RangeError", "ReferenceError", "RegExp", "String", "SyntaxError", "TypeError", "URIError", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "undefined", "unescape"];

    function Context() {}
    Context.prototype = {};
    var Script = exports.Script = function(e) {
        if (!(this instanceof Script)) return new Script(e);
        this.code = e
    };
    Script.prototype.runInContext = function(e) {
        if (!(e instanceof Context)) throw new TypeError("needs a 'context' argument.");
        var t = document.createElement("iframe");
        t.style || (t.style = {}), t.style.display = "none", document.body.appendChild(t);
        var i = t.contentWindow,
            r = i.eval,
            n = i.execScript;
        !r && n && (n.call(i, "null"), r = i.eval), forEach(Object_keys(e), function(t) {
            i[t] = e[t]
        }), forEach(globals, function(t) {
            e[t] && (i[t] = e[t])
        });
        var o = Object_keys(i),
            a = r.call(i, this.code);
        return forEach(Object_keys(i), function(t) {
            (t in e || -1 === indexOf(o, t)) && (e[t] = i[t])
        }), forEach(globals, function(t) {
            t in e || defineProp(e, t, i[t])
        }), document.body.removeChild(t), a
    }, Script.prototype.runInThisContext = function() {
        return eval(this.code)
    }, Script.prototype.runInNewContext = function(e) {
        var t = Script.createContext(e),
            i = this.runInContext(t);
        return forEach(Object_keys(t), function(i) {
            e[i] = t[i]
        }), i
    }, forEach(Object_keys(Script.prototype), function(e) {
        exports[e] = Script[e] = function(t) {
            var i = Script(t);
            return i[e].apply(i, [].slice.call(arguments, 1))
        }
    }), exports.createScript = function(e) {
        return exports.Script(e)
    }, exports.createContext = Script.createContext = function(e) {
        var t = new Context;
        return "object" == typeof e && forEach(Object_keys(e), function(i) {
            t[i] = e[i]
        }), t
    }
}, function(e, t, i) {
    "use strict";
    var r = t;

    function n(e) {
        return 1 === e.length ? "0" + e : e
    }

    function o(e) {
        for (var t = "", i = 0; i < e.length; i++) t += n(e[i].toString(16));
        return t
    }
    r.toArray = function(e, t) {
        if (Array.isArray(e)) return e.slice();
        if (!e) return [];
        var i = [];
        if ("string" != typeof e) {
            for (var r = 0; r < e.length; r++) i[r] = 0 | e[r];
            return i
        }
        if ("hex" === t)
            for ((e = e.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (e = "0" + e), r = 0; r < e.length; r += 2) i.push(parseInt(e[r] + e[r + 1], 16));
        else
            for (r = 0; r < e.length; r++) {
                var n = e.charCodeAt(r),
                    o = n >> 8,
                    a = 255 & n;
                o ? i.push(o, a) : i.push(a)
            }
        return i
    }, r.zero2 = n, r.toHex = o, r.encode = function(e, t) {
        return "hex" === t ? o(e) : e
    }
}, function(e, t) {
    t.read = function(e, t, i, r, n) {
        var o, a, s = 8 * n - r - 1,
            d = (1 << s) - 1,
            u = d >> 1,
            f = -7,
            c = i ? n - 1 : 0,
            l = i ? -1 : 1,
            h = e[t + c];
        for (c += l, o = h & (1 << -f) - 1, h >>= -f, f += s; f > 0; o = 256 * o + e[t + c], c += l, f -= 8);
        for (a = o & (1 << -f) - 1, o >>= -f, f += r; f > 0; a = 256 * a + e[t + c], c += l, f -= 8);
        if (0 === o) o = 1 - u;
        else {
            if (o === d) return a ? NaN : 1 / 0 * (h ? -1 : 1);
            a += Math.pow(2, r), o -= u
        }
        return (h ? -1 : 1) * a * Math.pow(2, o - r)
    }, t.write = function(e, t, i, r, n, o) {
        var a, s, d, u = 8 * o - n - 1,
            f = (1 << u) - 1,
            c = f >> 1,
            l = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            h = r ? 0 : o - 1,
            p = r ? 1 : -1,
            _ = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
        for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, a = f) : (a = Math.floor(Math.log(t) / Math.LN2), t * (d = Math.pow(2, -a)) < 1 && (a--, d *= 2), (t += a + c >= 1 ? l / d : l * Math.pow(2, 1 - c)) * d >= 2 && (a++, d /= 2), a + c >= f ? (s = 0, a = f) : a + c >= 1 ? (s = (t * d - 1) * Math.pow(2, n), a += c) : (s = t * Math.pow(2, c - 1) * Math.pow(2, n), a = 0)); n >= 8; e[i + h] = 255 & s, h += p, s /= 256, n -= 8);
        for (a = a << n | s, u += n; u > 0; e[i + h] = 255 & a, h += p, a /= 256, u -= 8);
        e[i + h - p] |= 128 * _
    }
}, function(e, t, i) {
    "use strict";
    t.byteLength = function(e) {
        var t = u(e),
            i = t[0],
            r = t[1];
        return 3 * (i + r) / 4 - r
    }, t.toByteArray = function(e) {
        for (var t, i = u(e), r = i[0], a = i[1], s = new o(function(e, t, i) {
                return 3 * (t + i) / 4 - i
            }(0, r, a)), d = 0, f = a > 0 ? r - 4 : r, c = 0; c < f; c += 4) t = n[e.charCodeAt(c)] << 18 | n[e.charCodeAt(c + 1)] << 12 | n[e.charCodeAt(c + 2)] << 6 | n[e.charCodeAt(c + 3)], s[d++] = t >> 16 & 255, s[d++] = t >> 8 & 255, s[d++] = 255 & t;
        2 === a && (t = n[e.charCodeAt(c)] << 2 | n[e.charCodeAt(c + 1)] >> 4, s[d++] = 255 & t);
        1 === a && (t = n[e.charCodeAt(c)] << 10 | n[e.charCodeAt(c + 1)] << 4 | n[e.charCodeAt(c + 2)] >> 2, s[d++] = t >> 8 & 255, s[d++] = 255 & t);
        return s
    }, t.fromByteArray = function(e) {
        for (var t, i = e.length, n = i % 3, o = [], a = 0, s = i - n; a < s; a += 16383) o.push(f(e, a, a + 16383 > s ? s : a + 16383));
        1 === n ? (t = e[i - 1], o.push(r[t >> 2] + r[t << 4 & 63] + "==")) : 2 === n && (t = (e[i - 2] << 8) + e[i - 1], o.push(r[t >> 10] + r[t >> 4 & 63] + r[t << 2 & 63] + "="));
        return o.join("")
    };
    for (var r = [], n = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, d = a.length; s < d; ++s) r[s] = a[s], n[a.charCodeAt(s)] = s;

    function u(e) {
        var t = e.length;
        if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        var i = e.indexOf("=");
        return -1 === i && (i = t), [i, i === t ? 0 : 4 - i % 4]
    }

    function f(e, t, i) {
        for (var n, o, a = [], s = t; s < i; s += 3) n = (e[s] << 16 & 16711680) + (e[s + 1] << 8 & 65280) + (255 & e[s + 2]), a.push(r[(o = n) >> 18 & 63] + r[o >> 12 & 63] + r[o >> 6 & 63] + r[63 & o]);
        return a.join("")
    }
    n["-".charCodeAt(0)] = 62, n["_".charCodeAt(0)] = 63
}, function(e, t, i) {
    "use strict";
    var r = t;
    r.base = i(23), r.short = i(89), r.mont = i(100), r.edwards = i(123)
}, function(e, t) {
    function i(e, t) {
        if (!e) throw new Error(t || "Assertion failed")
    }
    e.exports = i, i.equal = function(e, t, i) {
        if (e != t) throw new Error(i || "Assertion failed: " + e + " != " + t)
    }
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    var _audioplayer_audio_unmask_source__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72),
        _audioplayer_audio_layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(64),
        _node_modules_node_uuid_uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66),
        _shared_im_longpoll_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(152),
        _audioplayer_audioplayer_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1),
        _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        _slicedToArray = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var i = [],
                        r = !0,
                        n = !1,
                        o = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (i.push(a.value), !t || i.length !== t); r = !0);
                    } catch (e) {
                        n = !0, o = e
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (n) throw o
                        }
                    }
                    return i
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }();
    window.AudioLayer = _audioplayer_audio_layer__WEBPACK_IMPORTED_MODULE_1__.default, window.AudioUtils = {
        AUDIO_ITEM_INDEX_ID: 0,
        AUDIO_ITEM_INDEX_OWNER_ID: 1,
        AUDIO_ITEM_INDEX_URL: 2,
        AUDIO_ITEM_INDEX_TITLE: 3,
        AUDIO_ITEM_INDEX_PERFORMER: 4,
        AUDIO_ITEM_INDEX_DURATION: 5,
        AUDIO_ITEM_INDEX_ALBUM_ID: 6,
        AUDIO_ITEM_INDEX_AUTHOR_LINK: 8,
        AUDIO_ITEM_INDEX_LYRICS: 9,
        AUDIO_ITEM_INDEX_FLAGS: 10,
        AUDIO_ITEM_INDEX_CONTEXT: 11,
        AUDIO_ITEM_INDEX_EXTRA: 12,
        AUDIO_ITEM_INDEX_HASHES: 13,
        AUDIO_ITEM_INDEX_COVER_URL: 14,
        AUDIO_ITEM_INDEX_ADS: 15,
        AUDIO_ITEM_INDEX_SUBTITLE: 16,
        AUDIO_ITEM_INDEX_MAIN_ARTISTS: 17,
        AUDIO_ITEM_INDEX_FEAT_ARTISTS: 18,
        AUDIO_ITEM_INDEX_ALBUM: 19,
        AUDIO_ITEM_HAS_LYRICS_BIT: 1,
        AUDIO_ITEM_CAN_ADD_BIT: 2,
        AUDIO_ITEM_CLAIMED_BIT: 4,
        AUDIO_ITEM_HQ_BIT: 16,
        AUDIO_ITEM_LONG_PERFORMER_BIT: 32,
        AUDIO_ITEM_UMA_BIT: 128,
        AUDIO_ITEM_REPLACEABLE: 512,
        AUDIO_ITEM_EXPLICIT_BIT: 1024,
        AUDIO_ENOUGH_LOCAL_SEARCH_RESULTS: 500,
        AUDIO_RECOMS_TYPE_LISTENED: "recoms6",
        AUDIO_PLAYING_CLS: "audio_row__playing",
        AUDIO_CURRENT_CLS: "audio_row__current",
        AUDIO_LAYER_HEIGHT: 550,
        AUDIO_LAYER_MIN_WIDTH: 400,
        AUDIO_LAYER_MAX_WIDTH: 1e3,
        AUDIO_HQ_LABEL_CLS: "audio_hq_label_show",
        AUDIO_MAX_AUDIOS_IN_SNIPPET: 5,
        AUDIO_ROW_COVER_SIZE: 40,
        AUDIO_ROW_PLAY_SIZE: 24,
        AUDIO_PODCAST_PART_LISTEN: .8,
        AUDIO_PODCAST_PART_COUNT: 100,
        AUDIO_ROW_ACTION_ROW_ITEM: '<div role="button" class="audio_row__more_action audio_row__more_action_%0% _audio_row__more_action_%0% %3%">%2%</div>',
        audioSearchPerformer: function(e, t, i) {
            var r = !!window.AudioPage && currentAudioPage(e),
                n = window.AudioPage && currentAudioPage(e) || cur.audioPage;
            layers.fullhide && layers.fullhide(!0), setTimeout(function() {
                r && n ? (t = unclean(t).replace(/<em>|<\/em>/g, ""), nav.change({
                    q: t,
                    performer: 1
                }, i, {
                    searchPerformer: !0,
                    nav: !0,
                    isLayer: r.isLayer()
                })) : nav.go(e, i)
            }, 50)
        },
        toggleAudioLyrics: function(e, t) {
            var i = geByClass1("_audio_row__lyrics", e);
            if (i) {
                if (toggle(i)) {
                    var r = getSize(e)[1],
                        n = getSize(i)[1];
                    setStyle(e, "height", r + n), data(e, "prevHeight", r)
                } else {
                    var o = data(e, "prevHeight");
                    setStyle(e, "height", o)
                }
            } else {
                addClass(e, "audio_loading");
                var a = {
                    act: "get_lyrics",
                    aid: t.fullId,
                    lid: t.lyrics
                };
                AudioUtils.isPodcast(t) && (a.podcast = !0), ajax.post("al_audio.php", a, {
                    onDone: function(r) {
                        removeClass(e, "audio_loading"), i = se('<div class="_audio_row__lyrics audio_row__lyrics" data-nodrag="1" style="display:none;"><div class="audio_row__lyrics_inner">' + r + "</div></div>"), geByClass1("_audio_row_content", e).appendChild(i), AudioUtils.toggleAudioLyrics(e, t)
                    }
                })
            }
        },
        getRowActionName: function(e, t, i) {
            var r = void 0,
                n = AudioUtils.getAddRestoreInfo();
            switch (e) {
                case "current_delete":
                    r = getLang("audio_delete_from_current");
                    break;
                case "recoms_delete":
                    r = getLang("audio_dont_show");
                    break;
                case "listened_delete":
                    r = getLang("audio_remove_from_list");
                    break;
                case "delete":
                    if (AudioUtils.isPodcast(t)) r = getLang("audio_podcast_delete_episode");
                    else if (window.AudioPage && AudioPage.isInRecentPlayed(i)) r = getLang("audio_remove_from_list");
                    else {
                        var o = n[t.fullId];
                        r = o && o.deleteAll ? o.deleteAll.text : getLang("global_delete_audio")
                    }
                    break;
                case "restore_recoms":
                    r = getLang("audio_restore_audio");
                    break;
                case "add":
                    var a = n[t.fullId];
                    if (AudioUtils.isPodcast(t)) r = getLang("audio_podcast_restore_episode");
                    else if (a && "deleted" == a.state) r = getLang("audio_restore_audio");
                    else if (a && "added" == a.state) r = getLang("global_delete_audio");
                    else {
                        var s = !!window.AudioPage && currentAudioPage(i);
                        r = s && s.getOwnerId() < 0 && s.canAddToGroup() ? getLang("audio_add_to_group") : getLang("audio_add_to_audio")
                    }
                    break;
                case "edit":
                    r = AudioUtils.isPodcast(t) ? getLang("audio_podcast_edit_episode") : getLang("audio_edit_audio");
                    break;
                case "next":
                    r = cur.lang && cur.lang.global_audio_set_next_audio || getLang("audio_set_next_audio");
                    break;
                case "recoms":
                    r = getLang("audio_show_recommendations");
                    break;
                case "fave":
                    r = AudioUtils.isPodcast(t) ? getLang("audio_podcast_listen_later") : "";
                    break;
                default:
                    r = ""
            }
            return r
        },
        onRowOver: function onRowOver(audioEl, event, forceRedraw) {
            var _this2 = this;
            data(audioEl, "leaved", !1), data(audioEl, "actions") && !forceRedraw || hasClass(audioEl, "no_extra") || (clearTimeout(window.audioRowHoverTO), window.audioRowHoverTO = setTimeout(function() {
                var audio = AudioUtils.getAudioFromEl(audioEl),
                    audioObject = AudioUtils.getAudioFromEl(audioEl, !0),
                    actions = [],
                    moreActions = [],
                    context = AudioUtils.getContextPlaylist(audioEl, !0),
                    _AudioUtils$contextSp = AudioUtils.contextSplit(context),
                    _AudioUtils$contextSp2 = _slicedToArray(_AudioUtils$contextSp, 2),
                    contextSection = _AudioUtils$contextSp2[0],
                    contextObjectId = _AudioUtils$contextSp2[1],
                    extra = AudioUtils.getAudioExtra(audioObject);
                if (audioObject.isDeleted)
                    if (AudioUtils.isPodcast(audioObject)) actions.push(["add", AudioUtils.restoreEpisode, "", 'onmouseover="audioShowActionTooltip(this)"']);
                    else if ("recoms_recoms" == contextSection) actions.push(["restore_recoms", AudioUtils.addAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                else {
                    var deleteRestoreInfo = AudioUtils.getAddRestoreInfo();
                    deleteRestoreInfo[audioObject.fullId] && deleteRestoreInfo[audioObject.fullId].deleteAll && actions.push(["delete", AudioUtils.deleteAudio, "", 'onmouseover="audioShowActionTooltip(this)"']), actions.push(["add", AudioUtils.addAudio, "", 'onmouseover="audioShowActionTooltip(this)"'])
                } else {
                    var actionsList = ["next", "add", "share", "open_album", "add_to_playlist"];
                    if (extra.claim && nav.objLoc.claim || audioObject.isReplaceable) actionsList = [];
                    else if (AudioUtils.isPodcast(audioObject)) actionsList = hasClass(audioEl, "audio_podcast_no_actions") ? [] : ["fave", "edit", "delete", "open_episode", "share"];
                    else if (audioObject.isFromCurrentPlaylist) actionsList = ["recoms", "add", !audioObject.isCurrent && "current_delete", "share", "open_album", "add_to_playlist"];
                    else if (audioObject.isInSnippet) actionsList = ["recoms", "next", "edit", "add", "share", "open_album", "add_to_playlist"];
                    else if (audioObject.isInEditBox) actionsList = [];
                    else if (audioObject.isInFastChat) actionsList = ["add"];
                    else if (vk.widget) actionsList = vk.id ? ["add"] : [];
                    else if (contextSection) switch (contextSection) {
                        case "my":
                        case "search_owned_audios":
                        case "user_list":
                        case "group_list":
                            actionsList = ["recoms", "edit", "next", "add", "delete", "share", "open_album", "add_to_playlist"];
                            break;
                        case "edit_playlist":
                            actionsList = ["add", "next", "edit"];
                            break;
                        case "recoms_recoms":
                            actionsList = ["recoms", "next", "add", "recoms_delete", "share", "open_album", "add_to_playlist"];
                            break;
                        case "recoms_recent_audios":
                            actionsList = ["recoms", "edit", "next", "add", "listened_delete", "share", "open_album", "add_to_playlist"];
                            break;
                        case "module":
                            actionsList = [];
                            break;
                        case "attach":
                        case "attach_preview":
                        case "podcast":
                            actionsList = [];
                            break;
                        default:
                            audioObject.isCurrent && audioObject.withInlinePlayer && (actionsList = ["recoms", "add", "share", "open_album", "add_to_playlist"])
                    }
                    actionsList.push("uma"), audioObject.isReplaceable && actionsList.push("replace"), extra.moder_actions && each(extra.moder_actions, function(i, act) {
                        moreActions.push(["moder_" + i, function(audioEl, audio) {
                            eval(act[1])
                        }, act[2]])
                    });
                    var ap = getAudioPlayer();
                    each(actionsList, function(e, t) {
                        switch (t) {
                            case "next":
                                audioObject.isCurrent || audioObject.isClaimed || AudioUtils.isPodcast(audioObject) || actions.push(["next", ap.setNext.bind(ap), "", 'onmouseover="audioShowActionTooltip(this)"']);
                                break;
                            case "restore_recoms":
                                actions.push(["restore_recoms", AudioUtils.addAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                break;
                            case "add":
                                var i = vk.id;
                                cur.audioPage && cur.audioPage.canAddToGroup() && (i = cur.audioPage.getOwnerId()), !audioObject.isClaimed && audioObject.canAdd && audioObject.ownerId != i && actions.push(["add", AudioUtils.addAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                break;
                            case "recoms":
                                cur.audioPage && actions.push(["recoms", AudioUtils.showRecoms, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                break;
                            case "uma":
                                audioObject.isUMA && actions.push(["uma", AudioUtils.getUMAInfo, "UMA"]);
                                break;
                            case "replace":
                                audioObject.isReplaceable && actions.push(["replace", function() {
                                    showAudioClaimWarning(audioObject, extra.claim, AudioUtils.replaceWithOriginal.bind(AudioUtils, audioEl, audioObject))
                                }, getLang("global_audio_replace")]);
                                break;
                            case "edit":
                                audioObject.canEdit && !vk.widget && (AudioUtils.isPodcast(audioObject) || inArray(contextSection, ["my", "group_list"])) && actions.push(["edit", AudioUtils.isPodcast(audioObject) ? AudioUtils.editEpisode : AudioUtils.editAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                break;
                            case "delete":
                                !audioObject.canDelete || audioObject.isInRecomsBlock || vk.widget || actions.push(["delete", AudioUtils.isPodcast(audioObject) ? AudioUtils.deleteEpisode : AudioUtils.deleteAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                break;
                            case "current_delete":
                                actions.push(["current_delete", AudioUtils.deleteCurrentAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                break;
                            case "recoms_delete":
                                audioObject.isInRecomsBlock || actions.push(["recoms_delete", AudioUtils.deleteRecomsAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                break;
                            case "listened_delete":
                                audioObject.isInRecomsBlock || actions.push(["listened_delete", AudioUtils.deleteListenedAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
                                break;
                            case "fave":
                                AudioUtils.isPodcast(audioObject) && actions.push(["fave", AudioUtils.faveEpisode, "", 'onmouseover="audioShowActionTooltip(this)"', AudioUtils.getAudioExtra(audioObject).fave ? " activated" : ""]);
                                break;
                            case "share":
                                audioObject.isClaimed || moreActions.push(["share", AudioUtils.shareAudio, getLang("audio_share_audio")]);
                                break;
                            case "add_to_playlist":
                                audioObject.isClaimed || moreActions.push(["add_to_playlist", "", getLang("audio_add_to_playlist")]);
                                break;
                            case "open_album":
                                audioObject.album && moreActions.push(["open_album", AudioUtils.showAudioAlbum, getLang("audio_open_album")]);
                                break;
                            case "open_episode":
                                AudioUtils.isPodcast(audioObject) && moreActions.push(["open_episode", AudioUtils.openEpisode, getLang("audio_podcast_open_episode")])
                        }
                    }), extra.claim && nav.objLoc.claim && (audioObject.isSetClaimed ? actions.push(["claim_btn", AudioUtils.unclaim.bind(_this2, audio, audioEl, extra.claim), "Unclaim"]) : actions.push(["claim_btn", AudioUtils.claim.bind(_this2, audio, audioEl, extra.claim), "Claim"]))
                }
                if (moreActions.length && actions.push(["more"]), actions.length) {
                    var actionsEl = se('<div class="_audio_row__actions audio_row__actions"></div>');
                    each(actions, function(e, t) {
                        var i = AudioUtils.getRowActionName(t[0], audioObject, audioEl),
                            r = se('<button aria-label="' + i + '" data-action="' + t[0] + '" class="audio_row__action audio_row__action_' + t[0] + " _audio_row__action_" + t[0] + (t[4] || "") + '" ' + (t[3] || "") + ">" + (t[2] || "") + "</button>");
                        r.addEventListener("click", function(e) {
                            return t[1] && t[1].call(window, audioEl, audioObject, audio), cancelEvent(e)
                        }), actionsEl.appendChild(r)
                    });
                    var rowInfoEl = geByClass1("_audio_row__info", audioEl),
                        rowDurationEl = geByClass1("_audio_row__duration", audioEl),
                        rowAlreadyActionsEl = geByClass1("_audio_row__actions", audioEl);
                    re(rowAlreadyActionsEl), setStyle(rowDurationEl, "visibility", "hidden"), rowInfoEl.appendChild(actionsEl);
                    var moreActionsBtnEl = geByClass1("_audio_row__action_more", actionsEl);
                    if (moreActions.length && moreActionsBtnEl) {
                        var moreActionsContentEls = se('<div class="_audio_row__more_actions audio_row__more_actions"></div>');
                        each(moreActions, function(e, t) {
                            var i = se(rs(AudioUtils.AUDIO_ROW_ACTION_ROW_ITEM, t));
                            if ("add_to_playlist" == t[0]) {
                                var r = void 0,
                                    n = void 0;
                                i.addEventListener("mouseenter", r = function() {
                                    clearTimeout(n), n = setTimeout(function() {
                                        i.removeEventListener("mouseenter", r), AudioUtils.initRowPlaylistsChooser(audio, i, moreTooltip)
                                    }, 150)
                                }), i.addEventListener("mouseleave", function() {
                                    clearTimeout(n)
                                })
                            } else i.addEventListener("click", function(e) {
                                return t[1].call(window, audioEl, audioObject), cancelEvent(e)
                            });
                            moreActionsContentEls.appendChild(i)
                        });
                        var layerTooltip = gpeByClass("_eltt_content", audioEl),
                            tooltipAppendOption = layerTooltip ? {
                                appendTo: layerTooltip
                            } : {
                                appendToParent: !0
                            },
                            moreTooltip = new ElementTooltip(moreActionsBtnEl, extend({
                                cls: "_audio_row__tt",
                                defaultSide: "bottom",
                                rightShift: 20,
                                content: moreActionsContentEls,
                                bottomGap: 150,
                                preventSideChange: !0,
                                autoShow: !0,
                                onFirstTimeShow: function(e, t) {
                                    domData(t, "nodrag", 1), setTimeout(function() {
                                        this.getOptions().bottomGap = 0
                                    }.bind(this))
                                },
                                onHide: function() {
                                    data(audioEl, "leaved") && AudioUtils.onRowLeave(audioEl)
                                }
                            }, {
                                appendToParent: !0
                            }));
                        data(audioEl, "tt", moreTooltip)
                    }
                    data(audioEl, "actions", 1)
                }
            }, forceRedraw ? 0 : 10))
        },
        _showPlaylistsChooser: function(e, t, i, r, n, o) {
            var a = i.playlists,
                s = i.newPlaylistHash,
                d = i.morePlaylists;
            AudioUtils.copiedToPlaylistAudios = AudioUtils.copiedToPlaylistAudios || {}, AudioUtils.copiedToPlaylistAudiosHashes = AudioUtils.copiedToPlaylistAudiosHashes || {};
            var u = t,
                f = se(rs(AudioUtils.AUDIO_ROW_ACTION_ROW_ITEM, ["pl_new", 0, getLang("audio_add_to_new_pl"), "audio_row__action_playlist"]));
            if (domInsertAfter(f, u), u = f, f.addEventListener("click", function() {
                    AudioUtils.editPlaylist(r, !1, "edit", {
                        addAudio: o,
                        newPlaylistHash: s
                    })
                }), each(a, function(e, t) {
                    var i = !0,
                        r = t[0] + "_" + t[1] + "_" + n.fullId,
                        o = AudioUtils.copiedToPlaylistAudios[r],
                        a = "audio_row__action_playlist";
                    (t[3] || o) && (i = !1, a += " audio_row__more_playlist_added");
                    var s = se(rs(AudioUtils.AUDIO_ROW_ACTION_ROW_ITEM, ["pl_" + t[0] + "_" + t[1], 0, t[2], a]));
                    domInsertAfter(s, u), u = s;
                    var d = !1;
                    s.addEventListener("click", function() {
                        if (!d) {
                            d = !0;
                            var e = n.ownerId,
                                o = n.id,
                                a = AudioUtils.copiedToPlaylistAudios[r];
                            a && (e = (a = a.split("_"))[0], o = a[1]), i && (AudioUtils.copiedToPlaylistAudiosHashes[r] = t[4]), ajax.post("al_audio.php", {
                                act: "add_audio_to_playlist",
                                hash: t[4],
                                playlist_id: t[1],
                                playlist_owner_id: t[0],
                                audio_owner_id: e,
                                audio_id: o,
                                do_add: intval(i)
                            }, {
                                onDone: function(e, n, o) {
                                    AudioUtils.copiedToPlaylistAudios[r] = !!i && o, t[4] = i ? e : AudioUtils.copiedToPlaylistAudiosHashes[r], i = !i, d = !1
                                }
                            }), toggleClass(s, "audio_row__more_playlist_added", i)
                        }
                    })
                }), d) {
                var c = se(rs(AudioUtils.AUDIO_ROW_ACTION_ROW_ITEM, ["pl_more", 0, getLang("audio_row_show_all_playlists"), "audio_row__action_playlist"]));
                c.addEventListener("click", function() {
                    showBox("al_audio.php?act=more_playlists_add", {
                        owner_id: r,
                        audio_owner_id: n.ownerId,
                        audio_id: n.id
                    }, {
                        params: {
                            bodyStyle: "padding: 0px",
                            width: 560
                        }
                    })
                }), domInsertAfter(c, u), u = c
            }
            e.updatePosition()
        },
        initRowPlaylistsChooser: function(e, t, i) {
            var r = AudioUtils.asObject(e),
                n = void 0;
            n = cur.audioPage && cur.audioPage.getOwnerId() < 0 && cur.audioPage.canEditGroup() ? cur.audioPage.getOwnerId() : vk.id, AudioUtils.playlistsByAudioDataCache = AudioUtils.playlistsByAudioDataCache || {};
            var o = AudioUtils.playlistsByAudioDataCache,
                a = n + "_" + r.ownerId + "_" + r.id;
            o[a] ? AudioUtils._showPlaylistsChooser(i, t, o[a], n, r, e) : ajax.post("al_audio.php", {
                act: "playlists_by_audio",
                owner_id: n,
                audio_owner_id: r.ownerId,
                audio_id: r.id
            }, {
                onDone: function(s, d, u) {
                    var f = o[a] = {
                        playlists: s,
                        morePlaylists: d,
                        newPlaylistHash: u
                    };
                    AudioUtils._showPlaylistsChooser(i, t, f, n, r, e)
                }
            })
        },
        onAudioAddedToPlaylist: function(e, t, i, r) {
            getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, e, t).addAudio(r, 0), each(geByClass("_audio_pl_" + e + "_" + t), function(e, t) {
                domReplaceEl(t, se(i))
            })
        },
        onRowLeave: function(e) {
            data(e, "leaved", !0);
            var t = data(e, "tt");
            if ((!t || !t.isShown()) && (clearTimeout(window.audioRowHoverTO), data(e, "actions"))) {
                var i = geByClass1("_audio_row__actions", e),
                    r = geByClass1("_audio_row__duration", e);
                re(i), setStyle(r, "visibility", "visible"), data(e, "actions", 0)
            }
        },
        addToPlaylistsBoxInit: function(e, t, i, r, n) {
            var o = curBox(),
                a = geByClass1("_audio_atp_content", o.bodyNode),
                s = geByClass1("_audio_atp_list", o.bodyNode),
                d = ge("audio_atp_search"),
                u = geByClass1("_audio_atp_empty"),
                f = getSize(a)[1];
            setStyle(s, {
                height: f - getSize(d)[1]
            });
            var c = "",
                l = void 0;

            function h() {
                l && l.destroy(), s.innerHTML = "";
                var e = [];
                e = c ? r.filter(function(e) {
                    return e[2].toLowerCase().indexOf(c) >= 0
                }) : r, toggle(s, 0 != e.length), toggle(u, 0 == e.length), l = new AutoList(s, {
                    onNeedRows: function(t, i) {
                        for (var r = [], n = i, o = Math.min(e.length, i + 30), a = n; a < o; a++) {
                            var s = e[a];
                            if (s) {
                                var d = '<div class="ape_pl_item _ape_pl_item ' + (s[4] ? "ape_selected" : "") + '" data-id="' + s[1] + '"><div class="ape_check"><div class="ape_check_icon"></div></div><div class="ape_pl_item_inner"><span class="ape_pl_title">' + s[2] + '</span> <span class="ape_pl_size">' + s[3] + "</span></div></div>";
                                r.push(d)
                            }
                        }
                        t(r)
                    }
                })
            }
            h(), cur.addToPlaylistSearch = debounce(function(e) {
                c = trim(e).toLowerCase(), h()
            }, 200);
            var p = {},
                _ = {};
            addEvent(s, "click", function(e) {
                var t = domClosest("_ape_pl_item", e.target),
                    i = domData(t, "id");
                toggleClass(t, "ape_selected") ? (_[i] = !0, delete p[i]) : (p[i] = !0, delete _[i])
            }), o.removeButtons(), o.addButton(getLang("global_save"), function(r) {
                var a = Object.keys(_),
                    s = Object.keys(p);
                ajax.post("al_audio.php", {
                    act: "save_audio_in_playlists",
                    add_pl_ids: a.join(","),
                    remove_pl_ids: s.join(","),
                    owner_id: e,
                    audio_owner_id: t,
                    audio_id: i,
                    hash: n
                }, {
                    showProgress: lockButton.pbind(r),
                    hideProgress: unlockButton.pbind(r),
                    onDone: function() {
                        o.hide()
                    }
                })
            }, "ok", !0), o.addButton(getLang("global_cancel"), o.hide.bind(this), "no", !0)
        },
        showRecoms: function(e, t) {
            cur.audioPage && cur.audioPage.showRecoms(!1, t.fullId)
        },
        shareAudio: function(e, t) {
            if (t = t || getAudioPlayer().getCurrentAudio()) {
                t = AudioUtils.asObject(t);
                var i = AudioUtils.isPodcast(t) ? "podcast" : "audio";
                return !showBox("like.php", {
                    act: "publish_box",
                    object: i + t.fullId,
                    list: "s" + vk.id,
                    to: "mail"
                }, {
                    stat: ["page.js", "page.css", "wide_dd.js", "wide_dd.css", "sharebox.js"],
                    onFail: function(e) {
                        return showDoneBox(e), !0
                    }
                })
            }
        },
        showAudioAlbum: function(e, t) {
            t = AudioUtils.asObject(t), layers.fullhide && layers.fullhide(), AudioUtils.showAudioPlaylist(t.album[0], t.album[1], t.album[2])
        },
        openEpisode: function(e, t) {
            t = AudioUtils.asObject(t), AudioUtils.isPodcast(t) && showPodcast(t.fullId)
        },
        replaceWithOriginal: function(e, t, i) {
            (t = t || getAudioPlayer().getCurrentAudio()) && (t = AudioUtils.asObject(t), ajax.post("al_audio.php", {
                act: "replace_with_original",
                hash: t.replaceHash,
                audio_id: t.fullId
            }, {
                onDone: function(r) {
                    var n = JSON.parse(t.extra).claim.original;
                    n[AudioUtils.AUDIO_ITEM_INDEX_ID] = r, n[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] = t.ownerId;
                    var o = se(AudioUtils.drawAudio(n));
                    e.parentElement.insertBefore(o, e), e.parentElement.removeChild(e), i && i()
                },
                onFail: i
            }))
        },
        editAudio: function(e, t, i) {
            showBox("al_audio.php", {
                act: "edit_audio_box",
                aid: t.fullId,
                force_edit_hash: i
            }, {
                params: {
                    width: "456px",
                    bodyStyle: "padding: 20px; background-color: #F7F7F7;",
                    hideButtons: 1
                },
                dark: 1
            })
        },
        editEpisode: function(e, t) {
            AudioUtils.isPodcast(t) && (cur.podcastEditData = {
                audioId: t.fullId
            }, stManager.add([jsc("web/podcast.js")], function() {
                Podcast.edit(t.fullId)
            }))
        },
        deleteCurrentAudio: function(e, t) {
            var i = getAudioPlayer().getCurrentPlaylist();
            i && i.removeAudio(t.fullId), re(e)
        },
        deleteRecomsAudio: function(e, t) {
            AudioUtils.deleteAudio(e, t, !1, !0)
        },
        deleteListenedAudio: function(e, t) {
            AudioUtils.deleteAudio(e, t, !1, !1, !0)
        },
        deleteAudio: function(e, t, i, r, n) {
            function o(t) {
                return domData(e, "in-progress", intval(t))
            }
            if (window.tooltips && tooltips.hideAll(), !intval(domData(e, "in-progress"))) {
                o(!0);
                var a = !1;
                t.isClaimed && (a = !0);
                var s = AudioUtils.getAddRestoreInfo(),
                    d = s[t.fullId];
                if (d && d.deleteAll) showFastBox({
                    title: getLang("audio_delete_all_title"),
                    dark: 1
                }, d.deleteConfirmMsg || "", getLang("global_delete"), function(e) {
                    var t = extend({
                        act: "delete_all"
                    }, d.deleteAll);
                    ajax.post("al_audio.php", t, {
                        showProgress: lockButton.pbind(e),
                        onDone: function() {
                            var e = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, d.deleteAll.from_id, AudioPlaylist.DEFAULT_PLAYLIST_ID);
                            getAudioPlayer().deletePlaylist(e), nav.reload()
                        }
                    })
                }, getLang("global_cancel"));
                else {
                    if (a ? re(e) : addClass(e, "audio_row__deleted"), n) {
                        ajax.post("al_audio.php", {
                            act: "remove_listened",
                            audio_id: t.id,
                            audio_owner_id: t.ownerId,
                            hash: t.actionHash
                        }), re(e);
                        var u = getAudioPlayer().getCurrentPlaylist();
                        u.getType() == AudioPlaylist.TYPE_RECOM && u.getAlbumId() == AudioUtils.AUDIO_RECOMS_TYPE_LISTENED && u.removeAudio(t.fullId)
                    } else if (r) {
                        var f = {
                            act: "hide_recommendation",
                            hash: AudioUtils.getAudioExtra(t).recom.hash,
                            audio_id: t.fullId
                        };
                        nav.objLoc.audio_id && (f.recommendation_type = "query"), ajax.post("al_audio.php", f, {
                            onDone: function() {
                                o(!1)
                            }
                        }), s[t.fullId] = {
                            state: "recom_hidden"
                        };
                        var c = getAudioPlayer().getCurrentPlaylist();
                        c && c.getType() == AudioPlaylist.TYPE_RECOM && (s[t.fullId].removedCurrentPos = c.removeAudio(t))
                    } else ajax.post("al_audio.php", {
                        act: "delete_audio",
                        oid: t.ownerId,
                        aid: t.id,
                        hash: t.deleteHash,
                        restore: 1
                    }, {
                        onDone: function(i, r) {
                            a || o(!1), s[t.fullId] = {
                                state: "deleted",
                                deleteAll: i,
                                deleteConfirmMsg: r
                            }, a && AudioUtils.deleteDeletedAudios(), AudioUtils.onRowOver(e, !1, !0)
                        }
                    });
                    AudioUtils.onRowOver(e, !1, !0)
                }
            }
        },
        deleteEpisode: function(e, t) {
            AudioUtils.isPodcast(t) && stManager.add([jsc("web/podcast.js")], function() {
                Podcast.deleteEpisode(t.fullId, t.deleteHash)
            })
        },
        restoreEpisode: function(e, t) {
            AudioUtils.isPodcast(t) && stManager.add([jsc("web/podcast.js")], function() {
                Podcast.restoreEpisode(t.fullId, t.editHash)
            })
        },
        deleteDeletedAudios: function() {
            each(AudioUtils._audioAddRestoreInfo || {}, function(e, t) {
                "deleted" != t.state && "recom_hidden" != t.state || getAudioPlayer().deleteAudioFromAllPlaylists(e)
            })
        },
        faveEpisode: function(e, t) {
            if (AudioUtils.isPodcast(t)) {
                var i = AudioUtils.getAudioExtra(t).faveHash;
                bookmarkPodcast(geByClass1("audio_row__action_fave", e), t.fullId, i)
            }
        },
        contextSplit: function(e) {
            return isObject(e) && (e = e.context), (e || "").split(":")
        },
        showAudioPlaylist: function(e, t, i, r, n, o) {
            return cur.apLayer ? cancelEvent(n) : !!vk.widget || (boxRefreshCoords(boxLoader), show(boxLoader), show(boxLayerWrap), stManager.add(["auto_list.js", "audio.css"], function() {
                var n, a;

                function s(e) {
                    boxQueue.hideAll(), cur.apLayerAutoList && (cur.apLayerAutoList.destroy(), cur.apLayerAutoList = null), layers.wraphide(window.audioPlaylistLayerWrap), layers.fullhide = !1, n && removeEvent(window.audioPlaylistLayerWrap, "click", n), a && removeEvent(bodyNode, "keydown", a), delete cur.apLayer, delete cur.apLayerPlaylistId, removeClass(layerBG, "ap_layer_bg_dark"), nav.change({
                        z: !1
                    }), layerQueue.pop()
                }
                new AudioPlaylist({
                    type: AudioPlaylist.TYPE_PLAYLIST,
                    ownerId: e,
                    albumId: t,
                    hasMore: !0,
                    accessHash: i,
                    fromId: cur.oid
                }).loadAll(function(d, u) {
                    if (hide(boxLoader), hide(boxLayerWrap), u) {
                        var f = getLang("audio_error_deleted_playlist_box").split("/");
                        return new MessageBox({
                            title: f[0]
                        }).content(f[1]).setButtons(getLang("global_close"), function() {
                            curBox().hide()
                        }).show(), void nav.setLoc(extend(nav.objLoc, {
                            z: null
                        }))
                    }
                    var c = extend(nav.objLoc, {
                        z: "audio_playlist" + e + "_" + t + (i ? "/" + i : "")
                    });
                    nav.setLoc(c), window.audioPlaylistLayerWrap || (window.audioPlaylistLayerWrap = se('<div class="ap_layer_wrap"></div>'), bodyNode.appendChild(window.audioPlaylistLayerWrap));
                    window.audioPlaylistLayerWrap.innerHTML = "";
                    var l = d.getAudiosList().length,
                        h = getTemplate("audio_playlist_snippet", {
                            title: d.getTitle(),
                            subTitle: d.getSubtitle(),
                            description: d.getDescription(),
                            coverStyle: d.getCoverUrl() ? "background-image:url('" + d.getCoverUrl() + "'); background-size: cover;" : "",
                            authorLine: d.getAuthorLine(),
                            infoLine1: d.getInfoLine1(),
                            infoLine2: d.getInfoLine2(),
                            id: d.getPlaylistId(),
                            ownerId: d.getOwnerId(),
                            href: "/audio?z=audio_playlist" + d.getOwnerId() + "_" + d.getPlaylistId() + "/" + d.getAccessHash(),
                            addCls: d.getAddClasses(),
                            followHash: d.getFollowHash(),
                            accessHash: d.getAccessHash(),
                            editHash: d.getEditHash(),
                            deleteHash: d.getDeleteHash(),
                            replaceHash: d.getReplaceHash(),
                            gridCovers: d.getGridCovers(),
                            type: d.getType(),
                            context: r,
                            followButtonText: d.isFollowed() ? getLang("audio_playlist_btn_added") : getLang("audio_playlist_btn_add")
                        });
                    cur.apLayer = se('<div class="ap_layer"><div class="ap_layer__content">' + h + '</div><div class="ap_layer__close _ap_layer__close"></div></div>'), window.audioPlaylistLayerWrap.appendChild(cur.apLayer), addEvent(window.audioPlaylistLayerWrap, "click", n = function(e) {
                        e.target != window.audioPlaylistLayerWrap && e.target != geByClass1("_ap_layer__close", cur.apLayer) || layers.fullhide()
                    }), addEvent(bodyNode, "keydown", a = function(e) {
                        if (27 == e.keyCode) return layers.fullhide(), cancelEvent(e)
                    }), layerQueue.push(), layerQueue.hide(), boxQueue.hideAll(), layers.wrapshow(window.audioPlaylistLayerWrap, .7), addClass(layerBG, "ap_layer_bg_dark");
                    var p = geByClass1("_audio_pl_snippet__list", cur.apLayer);
                    l && (cur.apLayerAutoList = new AutoList(p, {
                        scrollNode: window.audioPlaylistLayerWrap,
                        onNeedRows: function(e, t) {
                            for (var i = [], r = d.getUnshuffledAudiosList(), n = t; n < t + 30 && r[n]; n++) i.push(AudioUtils.drawAudio(r[n]));
                            e(i)
                        }
                    }));
                    setStyle(p, {}), boxRefreshCoords(cur.apLayer), getAudioPlayer().updateCurrentPlaying(), layers.fullhide = s, cur.apLayerPlaylistId = [e, t], o && o();
                    cur.articleLayer && cur.articleLayer.audioPlaylistOpened()
                })
            }), !1)
        },
        onAudioChoose: function(e, t, i, r) {
            if (isUndefined(t.selected)) {
                var n = cur.attachCount && cur.attachCount() || 0;
                if (cur.chooseMedia("audio", i.fullId, r), (!cur.attachCount || cur.attachCount() > n) && cur.lastAddMedia) {
                    t.selected = cur.lastAddMedia.chosenMedias.length - 1, addClass(domPN(t), "audio_selected");
                    var o = getSize(t)[0];
                    setStyle(t, "width", o), t.innerHTML = getLang("global_cancel")
                }
            } else cur.lastAddMedia.unchooseMedia(t.selected), t.selected = void 0, removeClass(domPN(t), "audio_selected"), t.innerHTML = getLang("global_add_media");
            return cancelEvent(e)
        },
        onPlaylistChoose: function(e, t) {
            var i = t.getAccessHash();
            cur.chooseMedia("audio_playlist", t.getOwnerId() + "_" + t.getPlaylistId() + (i ? ":" + i : ""), {
                id: t.getPlaylistId(),
                ownerId: t.getOwnerId(),
                coverUrl: t.getCoverUrl(),
                gridCovers: t.getGridCovers(),
                title: t.getTitle(),
                authorName: t.getAuthorName(),
                authorHref: t.getAuthorHref(),
                accessHash: t.getAccessHash()
            })
        },
        editPlaylist: function(e, t, i, r) {
            stManager.add(["audio.js", "audio.css", "auto_list.js"], function() {
                ajax.post("al_audio.php", {
                    act: "playlists_edit_data",
                    owner_id: e
                }, {
                    onDone: function(n) {
                        n.audio_playlist_cover_upload_options && (cur.audioCoverUploadOptions = cur.audioCoverUploadOptions || {}, cur.audioCoverUploadOptions[e] = n.audio_playlist_cover_upload_options), AudioPage.editPlaylist(e, t, i, r)
                    }
                })
            })
        },
        followPlaylist: function(e, t, i, r) {
            if (vk && vk.widget && !vk.id && window.Widgets) return Widgets.oauth(), !1;

            function n(r) {
                var n = domData(e, "text-followed"),
                    o = domData(e, "text-follow");
                domData(e, "tooltip-text", r ? n : o), e.innerHTML = r ? n : o, s.setFollowed(r);
                var a = s.getAddClasses() || "";
                a = a.replace("audio_pl__followed", ""), r && (a += " audio_pl__followed"), s.mergeWith({
                    addClasses: a
                }), each(geByClass("_audio_pl_" + t + "_" + i), function(t, i) {
                    toggleClass(i, "audio_pl__followed", r);
                    var n = i.querySelectorAll(".audio_pl_snippet__action_btn_add")[0];
                    n && (n.innerHTML = e.innerHTML)
                })
            }
            var o = gpeByClass("_audio_pl", e),
                a = toggleClass(o, "audio_pl__followed"),
                s = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, t, i);
            n(a), ajax.post("al_audio.php", {
                act: "follow_playlist",
                playlist_owner_id: t,
                playlist_id: i,
                hash: r
            }, {
                onFail: function(e) {
                    return new MessageBox({
                        title: getLang("global_error")
                    }).content(e).setButtons("Ok", function() {
                        curBox().hide()
                    }).show(), n(!1), !0
                }
            })
        },
        getLayer: function() {
            var e = window.audioLayer;
            return e || (window.audioLayer = e = new _audioplayer_audio_layer__WEBPACK_IMPORTED_MODULE_1__.default), e
        },
        updateQueueReceivedPost: function(e) {
            e && each(geByClass("_audio_row", e), function() {
                domData(this, "new-post", "groups" == cur.module ? "wall" : "feed")
            })
        },
        toggleAudioHQBodyClass: function() {
            var e = getAudioPlayer().showHQLabel();
            toggleClass(document.body, AudioUtils.AUDIO_HQ_LABEL_CLS, e)
        },
        hasAudioHQBodyClass: function() {
            return hasClass(document.body, AudioUtils.AUDIO_HQ_LABEL_CLS)
        },
        showNeedFlashBox: function() {
            var e = getLang("global_audio_flash_required").replace("{link}", '<a target=_blank href="https://get.adobe.com/flashplayer">').replace("{/link}", "</a>");
            new MessageBox({
                title: getLang("audio_need_flash_title")
            }).content(e).setButtons("Ok", function() {
                curBox().hide()
            }).show()
        },
        getAddRestoreInfo: function() {
            return AudioUtils._audioAddRestoreInfo = AudioUtils._audioAddRestoreInfo || {}, AudioUtils._audioAddRestoreInfo
        },
        addAudio: function(e, t) {
            if (vk && vk.widget && !vk.id && window.Widgets) return Widgets.oauth(), !1;

            function i(t) {
                return domData(e, "in-progress", intval(t))
            }
            if (!intval(domData(e, "in-progress"))) {
                i(!0), t || (t = AudioUtils.getAudioFromEl(e, !0));
                var r = window.AudioPage && currentAudioPage(e),
                    n = r && r.getOwnerId() < 0 && r.canAddToGroup() ? -r.getOwnerId() : 0,
                    o = AudioUtils.getAddRestoreInfo(),
                    a = o[t.fullId],
                    s = geByClass1("_audio_row_" + t.fullId);
                s = s != e && s;
                var d, u = r && r.getPageCurrentPlaylist(),
                    f = AudioUtils.getContextPlaylist(e, !0);
                f && (d = (f = AudioUtils.contextSplit(f))[0]), ("search" == d && u && u.getSearchQid() || "search" == cur.module && cur.qid) && (d = "search:external");
                var c = {
                    act: "add",
                    group_id: n,
                    audio_owner_id: t.ownerId,
                    audio_id: t.id,
                    hash: t.addHash,
                    from: d || ""
                };
                a ? "recom_hidden" == a.state ? (r && (r.restoreRecommendation(e), i(!1)), AudioUtils.onRowOver(e, !1, !0)) : "deleted" == a.state ? (ajax.post("al_audio.php", {
                    act: "restore_audio",
                    oid: t.ownerId,
                    aid: t.id,
                    hash: t.editHash
                }, {
                    onDone: function() {
                        i(!1)
                    }
                }), removeClass(e, "audio_row__deleted"), delete o[t.fullId], AudioUtils.onRowOver(e, !1, !0)) : "added" == a.state && (ajax.post("al_audio.php", {
                    act: "delete_audio",
                    oid: a.audio.ownerId,
                    aid: a.audio.id,
                    hash: a.audio.deleteHash
                }, {
                    onDone: function() {
                        r && getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, n ? -n : vk.id, AudioPlaylist.DEFAULT_PLAYLIST_ID).removeAudio(a.addedFullId);
                        i(!1)
                    }
                }), removeClass(e, "audio_row__added"), s && removeClass(s, "audio_row__added"), delete o[t.fullId], getAudioPlayer().notify(AudioPlayer.EVENT_REMOVED, t.fullId, a.addedFullId)) : (ajax.post("al_audio.php", c, {
                    onDone: function(e) {
                        if (e) {
                            var r = e[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + e[AudioUtils.AUDIO_ITEM_INDEX_ID];
                            o[t.fullId] = {
                                state: "added",
                                addedFullId: r,
                                audio: AudioUtils.asObject(e)
                            }, getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, n ? -n : vk.id, AudioPlaylist.DEFAULT_PLAYLIST_ID).addAudio(e, 0), u && u.getType() == AudioPlaylist.TYPE_SEARCH && u.sendSearchStats("search_add")
                        }
                        i(!1)
                    },
                    onFail: function(t) {
                        return t && new MessageBox({
                            title: getLang("global_error")
                        }).content(t).setButtons("Ok", function() {
                            curBox().hide()
                        }).show(), removeClass(e, "audio_row__added"), i(!1), !0
                    }
                }), addClass(e, "audio_row__added"), s && addClass(s, "audio_row__added"), getAudioPlayer().notify(AudioPlayer.EVENT_ADDED, t.fullId), r && u && r.onUserAction(t, u))
            }
        },
        addAudioToOwner: function(e, t) {
            return window.onAudioPageLoaded = function() {
                return this.uploadAudio({})
            }, nav.go("audios" + e), cancelEvent(t)
        },
        chooseAudioBox: function(e, t, i) {
            if (void 0 !== e.selected) cur.lastAddMedia.unchooseMedia(e.selected), e.selected = void 0, removeClass(domPN(e), "audio_selected"), e.innerHTML = t.labels.add;
            else {
                var r = cur.attachCount && cur.attachCount() || 0;
                cur.chooseMedia("audio", t.owner_id + "_" + t.id, t.info), (!cur.attachCount || cur.attachCount() > r) && cur.lastAddMedia && (e.selected = cur.lastAddMedia.chosenMedias.length - 1, addClass(domPN(e), "audio_selected"), e.innerHTML = t.labels.cancel)
            }
            return cancelEvent(i)
        },
        getAudioArtistsString: function(e, t) {
            var i = "";
            return e.forEach(function(r, n) {
                var o = "/audio?performer=1&q=" + encodeURIComponent(r.name);
                r.id && (o = "/artist/" + r.id), i += t ? '<a class="artist_link" href="' + o + '">' + r.name + "</a>" : r.name, n < e.length - 1 && (i += ", ")
            }), i
        },
        getAudioPerformers: function(e) {
            var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                i = "";
            if (t = !AudioUtils.isPodcast(e) && t, isArray(e[AudioUtils.AUDIO_ITEM_INDEX_MAIN_ARTISTS]) && (i = AudioUtils.getAudioArtistsString(e[AudioUtils.AUDIO_ITEM_INDEX_MAIN_ARTISTS], t)), isArray(e[AudioUtils.AUDIO_ITEM_INDEX_FEAT_ARTISTS]) && (i += " feat. ", i += AudioUtils.getAudioArtistsString(e[AudioUtils.AUDIO_ITEM_INDEX_FEAT_ARTISTS], t)), !i) {
                var r = e[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER].replace(/<\/?em>/g, "");
                if (t) i = '<a class="artist_link" data-performer="' + r + '" href="' + ("/audio?performer=1&q=" + encodeURIComponent(r)) + '">' + r + "</a>";
                else i = r
            }
            return i
        },
        drawAudio: function(e, t) {
            for (var i = JSON.parse(getTemplate("audio_bits_to_cls")), r = e[AudioUtils.AUDIO_ITEM_INDEX_FLAGS], n = [], o = 0; o < 32; o++) {
                var a = 1 << o;
                r & a && n.push(i[a])
            }
            AudioUtils.isPodcast(e) && (n.push("audio_podcast"), AudioUtils.isPrivatePodcast(e) && n.push("audio_podcast_private")), t && n.push(t);
            var s = "";
            e[AudioUtils.AUDIO_ITEM_INDEX_COVER_URL] && (s = "background-image: url(" + e[AudioUtils.AUDIO_ITEM_INDEX_COVER_URL].split(",")[0] + ")");
            var d = AudioUtils.getAudioPerformers(e),
                u = formatTime(e[AudioUtils.AUDIO_ITEM_INDEX_DURATION]),
                f = clean(JSON.stringify(e)).split("$").join("$$"),
                c = getTemplate("audio_row", e);
            return c = (c = (c = (c = (c = c.replace(/%cls%/, n.join(" "))).replace(/%duration%/, u)).replace(/%serialized%/, f)).replace(/%cover_style%/, s)).replace(/%performers%/, d)
        },
        isClaimedAudio: function(e) {
            return (e = AudioUtils.asObject(e)).flags & AudioUtils.AUDIO_ITEM_CLAIMED_BIT
        },
        getAudioExtra: function(e) {
            return e = AudioUtils.asObject(e), "object" === _typeof(e.extra) ? e.extra : JSON.parse(e.extra || "{}")
        },
        getAudioFromEl: function(e, t) {
            e = domClosest("_audio_row", e);
            var i = data(e, "audio");
            return i || (i = JSON.parse(domData(e, "audio"))), t && ((i = AudioUtils.asObject(i)).isDeleted = hasClass(e, "audio_row__deleted"), i.isCurrent = hasClass(e, AudioUtils.AUDIO_CURRENT_CLS), i.isPlaying = hasClass(e, AudioUtils.AUDIO_PLAYING_CLS), i.isFromCurrentPlaylist = !!gpeByClass("_audio_section__current", e), i.isNumeric = !!gpeByClass("audio_numeric", e), i.isWithCovers = !!gpeByClass("audio_w_covers", e), i.withInlinePlayer = !i.isWithCovers && !gpeByClass("audio_no_inline_player", e), i.isInSnippet = !!gpeByClass("_audio_pl_snippet__list", e), i.isInEditBox = !!gpeByClass("_audio_pl_edit_box", e), i.isInRecomsBlock = !!gpeByClass("_audio_recoms_blocks", e), i.isInFastChat = !!gpeByClass("fc_tab", e), i.isInAttach = !!gpeByClass("media_preview", e), i.isSetClaimed = hasClass(e, "audio_moder_claimed")), i
        },
        asObject: function(e) {
            if (!e) return null;
            if (isObject(e)) return e;
            if ("string" == typeof e) return {
                id: e
            };
            var t = (e[AudioUtils.AUDIO_ITEM_INDEX_HASHES] || "").split("/"),
                i = (e[AudioUtils.AUDIO_ITEM_INDEX_COVER_URL] || "").split(","),
                r = AudioUtils.getAudioPerformers(e, !1);
            return {
                id: intval(e[AudioUtils.AUDIO_ITEM_INDEX_ID]),
                owner_id: intval(e[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID]),
                ownerId: e[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID],
                fullId: e[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + e[AudioUtils.AUDIO_ITEM_INDEX_ID],
                title: e[AudioUtils.AUDIO_ITEM_INDEX_TITLE],
                subTitle: e[AudioUtils.AUDIO_ITEM_INDEX_SUBTITLE],
                performer: r,
                duration: intval(e[AudioUtils.AUDIO_ITEM_INDEX_DURATION]),
                lyrics: intval(e[AudioUtils.AUDIO_ITEM_INDEX_LYRICS]),
                url: e[AudioUtils.AUDIO_ITEM_INDEX_URL],
                flags: e[AudioUtils.AUDIO_ITEM_INDEX_FLAGS],
                context: e[AudioUtils.AUDIO_ITEM_INDEX_CONTEXT],
                extra: e[AudioUtils.AUDIO_ITEM_INDEX_EXTRA],
                addHash: t[0] || "",
                editHash: t[1] || "",
                actionHash: t[2] || "",
                deleteHash: t[3] || "",
                replaceHash: t[4] || "",
                canEdit: !!t[1],
                canDelete: !!t[3],
                isLongPerformer: e[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] & AudioUtils.AUDIO_ITEM_LONG_PERFORMER_BIT,
                canAdd: !!(e[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] & AudioUtils.AUDIO_ITEM_CAN_ADD_BIT),
                coverUrl_s: i[0],
                coverUrl_p: i[1],
                isClaimed: !!(e[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] & AudioUtils.AUDIO_ITEM_CLAIMED_BIT),
                isExplicit: !!(e[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] & AudioUtils.AUDIO_ITEM_EXPLICIT_BIT),
                isUMA: !!(e[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] & AudioUtils.AUDIO_ITEM_UMA_BIT),
                isReplaceable: !!(e[AudioUtils.AUDIO_ITEM_INDEX_FLAGS] & AudioUtils.AUDIO_ITEM_REPLACEABLE),
                ads: e[AudioUtils.AUDIO_ITEM_INDEX_ADS],
                album: e[AudioUtils.AUDIO_ITEM_INDEX_ALBUM],
                albumId: intval(e[AudioUtils.AUDIO_ITEM_INDEX_ALBUM_ID])
            }
        },
        initDomPlaylist: function(e, t) {
            var i = [];
            return each(t, function(e, t) {
                t && each(geByClass("_audio_row", t), function(e) {
                    i.push(AudioUtils.getAudioFromEl(this))
                })
            }), e.addAudio(i), e
        },
        getContextPlaylist: function(e, t) {
            var i = getAudioPlayer(),
                r = AudioUtils.getAudioFromEl(e, !0);

            function n(e) {
                return [].slice.call(e)
            }
            var o, a = null,
                s = [],
                d = domData(e, "new-post"),
                u = !1,
                f = null,
                c = AudioPlaylist.TYPE_TEMP,
                l = vk.id,
                h = {},
                p = window.AudioPage && currentAudioPage(e);
            if ((window.traverseParent || function(e, t) {
                    for (e = ge(e); e && !t(e) && (e = domPN(e)) != document;);
                    return null
                })(e, function(e) {
                    return u = domData(e, "audio-context")
                }), u = (u = r.context || u) || ("audio" == cur.module ? cur.submodule : cur.module), t) return {
                context: u
            };
            var _ = AudioUtils.contextSplit(u),
                y = _slicedToArray(_, 2),
                b = y[0],
                g = y[1],
                v = gpeByClass("_audio_pl", e);
            if (v) {
                var m = (domData(v, "playlist-id") || "").split("_");
                f = i.getPlaylist.apply(i, m);
                var A = domData(v, "title") || "";
                A && f.mergeWith({
                    title: clean(A)
                });
                var w = domData(v, "access-hash") || "";
                w && f.mergeWith({
                    accessHash: w
                }), p && p.getPageCurrentPlaylist() == f && p.getSortedList() ? f.initSortedList(p.getSortedList()) : r.isFromCurrentPlaylist || (f.removeSortedList(), f.shuffle(0))
            } else if (p && p.getPageCurrentPlaylist()) f = p.getPageCurrentPlaylist();
            else if ("module" == b) {
                var E = g;
                f = i.getPlaylist(AudioPlaylist.TYPE_PLAYLIST, E || cur.oid || vk.id, AudioPlaylist.DEFAULT_PLAYLIST_ID), s = [a]
            } else if (0 === r.context.indexOf("im")) a = (a = gpeByClass("_im_peer_history", e)) || gpeByClass("_fc_tab_log_msgs", e), o = "im" + (cur.peer || "");
            else if (0 === r.context.indexOf("board")) o = r.context, s = n(geByClass("_wall_audio_rows", a));
            else if (0 === r.context.indexOf("widget")) o = r.context;
            else if (0 === r.context.indexOf("wiki")) o = "wiki";
            else if (0 === r.context.indexOf("post")) {
                c = AudioPlaylist.TYPE_WALL, o = r.context, l = (P = r.context.replace("post", "").split("_"))[0], h = {
                    postId: P[1]
                }
            } else if (0 === r.context.indexOf("choose")) o = r.context;
            else if ("feed" == d || 0 === r.context.indexOf("feed") || 0 === r.context.indexOf("feedsearch")) o = "feed", s = n(geByClass("wall_text", a));
            else if ("group_wall" == b || "user_wall" == b || 0 === r.context.indexOf("reply") || "wall" == d) {
                c = AudioPlaylist.TYPE_WALL, l = cur.oid;
                var P = (g || "").split("_")[1],
                    S = cur.wallQuery || "",
                    I = ge("wall_search"),
                    T = inArray(cur.wallType, ["own", "full_own"]) ? "own" : "all";
                o = hashCode(T + "_" + S), "wall" == cur.module && val(I) && (S = val(I)), P && (h = {
                    postId: P,
                    wallQuery: S,
                    wallType: T
                }), 0 === r.context.indexOf("reply") && (s = n([gpeByClass("_replies_list", e)]), o = "reply" + o), s = s.concat(n([a]))
            } else "article" == b && (f = cur.articlePlaylist);
            return a || (a = domPN(e)), (s = s.filter(function(e) {
                return !!e
            })) && 0 != s.length || (s = [a]), (f = (f = f || i.getPlaylist(c, l, o)).getAudiosCount() ? f : AudioUtils.initDomPlaylist(f, s)).mergeWith(h || {}), -1 == f.indexOfAudio(r) && (f = AudioUtils.initDomPlaylist(f, [domPN(e)])), {
                playlist: f,
                context: u
            }
        },
        LOG_LS_KEY: "audiolog",
        debugLog: function() {},
        renderAudioDiag: function() {
            var e = ge("audio_diag_log"),
                t = ls.get(AudioUtils.LOG_LS_KEY) || [];
            e && each(t, function(t, i) {
                var r = new Date(i.shift()).toUTCString();
                i = i.join(", "), e.appendChild(se('<div class="audio_diag_log_row"><span class="audio_diag_log_time">' + r + "</span>" + i + "</div>"))
            })
        },
        claim: function(e, t, i) {
            addClass(t, "audio_moder_claimed"), AudioUtils.onRowOver(t, !1, !0), e = AudioUtils.asObject(e), ajax.post("al_claims.php", {
                act: "a_claim",
                claim_id: i,
                type: "audio",
                id: e.id,
                owner_id: e.ownerId
            })
        },
        unclaim: function(e, t, i) {
            removeClass(t, "audio_moder_claimed"), AudioUtils.onRowOver(t, !1, !0), e = AudioUtils.asObject(e), ajax.post("al_claims.php", {
                act: "a_unclaim",
                claim_id: i,
                type: "audio",
                id: e.id,
                owner_id: e.ownerId,
                hash: e.actionHash
            })
        },
        getUMAInfo: function(e, t) {
            t.isInEditBox || showBox("al_audio.php", {
                act: "get_uma_restrictions",
                id: t.id,
                owner_id: t.owner_id,
                hash: t.actionHash
            }, {
                params: {
                    width: 750
                }
            })
        },
        getUMAInfoAlbum: function(e, t) {
            t.isInEditBox || showBox("al_audio.php", {
                act: "get_uma_restrictions_album",
                playlist_raw_id: e
            }, {
                params: {
                    width: 750
                }
            })
        },
        cancelReplacement: function(e, t, i) {
            ajax.post("al_audio.php", {
                act: "cancel_replacement",
                hash: t,
                audio_id: e
            }), re(i)
        },
        removeFromGroup: function(e, t, i) {
            var r = e + "_" + t;
            if (cur.audioPage._ownerId < 0) var n = window.showBox("al_audio.php", {
                act: "delete_from_group_box",
                playlist_id: r,
                group_id: -cur.audioPage._ownerId
            }).setButtons(getLang("global_yes"), function() {
                ajax.post("al_audio.php", {
                    act: "delete_from_group",
                    group_id: -cur.audioPage._ownerId,
                    hash: i,
                    playlist_id: r
                }, {
                    onDone: function(e) {
                        n.hide(), showDoneBox(e)
                    },
                    onFail: function(e) {
                        return n.hide(), showDoneBox(e), !0
                    }
                })
            }, getLang("global_cancel"), function() {
                return n.hide()
            }).show()
        },
        addToGroupBox: function(e, t, i) {
            var r = e + "_" + t,
                n = window.showBox("al_audio.php", {
                    act: "add_to_groups_box",
                    playlist_id: r,
                    access_hash: i
                }).addButton(getLang("Save"), function() {
                    var e = [];
                    for (var t in cur.wdd.follow_playlist_wwd.selected) e.push(cur.wdd.follow_playlist_wwd.selected[t][0]);
                    e.length && (ge("add_playlist_to_group_fail").innerHTML = "", ajax.post("al_audio.php", {
                        act: "add_to_group",
                        group_ids: e,
                        hash: ge("add_playlist_to_group_hash").value,
                        playlist_id: r
                    }, {
                        onDone: function(e) {
                            n.hide(), showDoneBox(e)
                        },
                        onFail: function(e) {
                            return ge("add_playlist_to_group_fail").innerHTML = e, !0
                        }
                    }))
                })
        },
        isPodcast: function(e) {
            if (!e) return !1;
            var t = isObject(e) ? e.extra : e[AudioUtils.AUDIO_ITEM_INDEX_EXTRA];
            return isObject(t) || (t = JSON.parse(t || "{}")), !!t.podcast
        },
        isPrivatePodcast: function(e) {
            return !(!AudioUtils.isPodcast(e) || !AudioUtils.getAudioExtra(e).private)
        }
    }, window.TopAudioPlayer = function(e, t) {
        this.ap = getAudioPlayer(), this._el = e, this._playIconBtn = ge("top_audio"), this._audioBtnGroup = ge("top_audio_btn_group"), this.init()
    }, TopAudioPlayer.TITLE_CHANGE_ANIM_SPEED = 190, TopAudioPlayer.init = function() {
        var e = ge("top_audio_player"),
            t = data(e, "object");
        t || (t = new TopAudioPlayer(e), data(e, "object", t))
    }, TopAudioPlayer.prototype.init = function() {
        var e = this;

        function t(t) {
            return hasClass(this, "top_audio_player_play") ? (e.ap.isPlaying() ? e.ap.pause() : e.ap.play(), !1) : hasClass(this, "top_audio_player_prev") ? (e.ap.playPrev(), !1) : hasClass(this, "top_audio_player_next") ? (e.ap.playNext(), !1) : void 0
        }
        this.ap.on(this, AudioPlayer.EVENT_UPDATE, this.onPlay.bind(this)), this.ap.on(this, AudioPlayer.EVENT_PLAY, this.onPlay.bind(this)), this.ap.on(this, AudioPlayer.EVENT_PAUSE, this.onPause.bind(this)), this.ap.top = this, each(["prev", "play", "next"], function(i, r) {
            addEvent(geByClass1("top_audio_player_" + r, e._el), "click", t)
        }), addEvent(this._el, "mousedown", function(e) {
            if (!hasClass(domPN(e.target), "top_audio_player_btn")) return 1 != e.which || hasClass(e.target, "top_audio_player_btn") || hasClass(e.target, "top_audio_player_act_icon") || AudioUtils.getLayer().toggle(), cancelEvent(e)
        }), addEvent(ge("top_audio"), "mousedown", function(e) {
            return !0 !== checkEvent(e) && (AudioUtils.getLayer().toggle(), cancelEvent(e))
        }), browser.safari || addEvent(document, "keydown keyup", function(e) {
            toggleClass(ge("top_audio_play"), "shuffle", e.shiftKey)
        }), this.onPlay(this.ap.getCurrentAudio())
    }, TopAudioPlayer.prototype.onPlay = function(e, t, i) {
        var r = "top_audio_player_enabled";
        if (e) {
            var n = this;
            i = intval(i), hasClass(this._playIconBtn, r) ? s() : (addClass(this._playIconBtn, r), setTimeout(function() {
                hide(n._audioBtnGroup), s()
            }, 150))
        } else {
            removeClass(this._playIconBtn, r), removeClass(this._el, r), removeClass(this._el, "top_audio_player_playing"), removeClass(this._el, "audio_player_podcast"), show(this._audioBtnGroup);
            var o = geByClass1("top_audio_play__button", this._audioBtnGroup);
            o && removeClass(o, "loading");
            var a = AudioUtils.getLayer();
            a && a.isShown() && a.updatePosition()
        }

        function s() {
            var t = getAudioPlayer();
            setTimeout(function() {
                var e = AudioUtils.getLayer();
                e && e.isShown() && e.updatePosition()
            }, 1), toggleClass(n._el, "audio_player_podcast", AudioUtils.isPodcast(t.getCurrentAudio())), addClass(n._el, r), toggleClass(n._el, "top_audio_player_playing", t.isPlaying());
            var o = geByClass1("_top_audio_player_play_blind_label");
            o && (o.innerHTML = t.isPlaying() ? getLang("global_audio_pause") : getLang("global_audio_play")), e = AudioUtils.asObject(e), clearTimeout(n._currTitleReTO);
            var a = geByClass1("top_audio_player_title_out", n._el);
            re(a);
            var s = geByClass1("top_audio_player_title", n._el);
            if (0 != i) {
                var d = i < 0 ? -10 : 10,
                    u = s.offsetLeft,
                    f = se('<div class="top_audio_player_title top_audio_player_title_next" style="opacity: 0; top:' + d + "px; left: " + u + 'px">' + e.performer + " &ndash; " + e.title + "</div>");
                f.setAttribute("onmouseover", "setTitle(this)"), i > 0 ? domInsertAfter(f, s) : domInsertBefore(f, s), addClass(s, "top_audio_player_title_out"), setStyle(s, {
                    top: -d,
                    opacity: 0
                }), setTimeout(function() {
                    setStyle(f, {
                        top: 0,
                        opacity: 1
                    })
                }, 10), clearTimeout(n._currTitleReTO), n._currTitleReTO = setTimeout(function() {
                    re(s), removeClass(f, "top_audio_player_title_next")
                }, TopAudioPlayer.TITLE_CHANGE_ANIM_SPEED)
            } else s && (s.innerHTML = e.performer + " &ndash; " + e.title, s.titleSet = 0, s.setAttribute("onmouseover", "setTitle(this)"))
        }
    }, TopAudioPlayer.prototype.onPause = function() {
        removeClass(this._el, "top_audio_player_playing");
        var e = geByClass1("_top_audio_player_play_blind_label");
        e && (e.innerHTML = getLang("global_audio_play"))
    }, TopAudioPlayer.prototype.onNext = function() {}, window.AudioPlaylist = function e(t, i, r) {
        if (this.constructor != e) throw new Error("AudioPlaylist was called without 'new' operator");
        getAudioPlayer().addPlaylist(this);
        var n = {};
        return t && isFunction(t.getId) ? (this._ref = t, void getAudioPlayer().addPlaylist(this)) : (isObject(t) ? n = t : (n.ownerId = i, n.type = t, n.albumId = r || ++e.plIndex), this._type = n.type, this._ownerId = n.ownerId || vk.id, this._albumId = n.albumId || 0, this._fromId = n.fromId || 0, this._list = [], this.mergeWith(n), this)
    }, AudioPlaylist.plIndex = 0, AudioPlaylist.TYPE_CURRENT = "current", AudioPlaylist.TYPE_PLAYLIST = "playlist", AudioPlaylist.TYPE_ALBUM = "album", AudioPlaylist.TYPE_TEMP = "temp", AudioPlaylist.TYPE_RECOM = "recoms", AudioPlaylist.TYPE_SEARCH = "search", AudioPlaylist.TYPE_FEED = "feed", AudioPlaylist.TYPE_LIVE = "live", AudioPlaylist.TYPE_WALL = "wall", AudioPlaylist.TYPE_RECENT = "recent", AudioPlaylist.DEFAULT_PLAYLIST_ID = -1, AudioPlaylist.prototype.serialize = function() {
        var e = {},
            t = getAudioPlayer().getCurrentAudio(),
            i = Math.max(0, this.indexOfAudio(t));
        return e.list = clone(this.getAudiosList().slice(Math.max(0, i - 100), i + 300), !0), each(e.list, function(e, t) {
            t[AudioUtils.AUDIO_ITEM_INDEX_URL] = ""
        }), e.type = AudioPlaylist.TYPE_TEMP, e.ownerId = vk.id, e.albumId = irand(1, 999), e.hasMore = !1, e.title = this.getTitle(), e.context = getAudioPlayer()._getPlayingContext(), e.originalPlaylistRawId = this.getOriginalPlaylistRawId(), this.getType() == AudioPlaylist.TYPE_PLAYLIST && this.getAlbumId() > 0 && (e.originalPlaylistRawId = this.getOwnerId() + "_" + this.getAlbumId() + "_" + this.getAccessHash()), JSON.stringify(e)
    }, AudioPlaylist.prototype.getId = function() {
        return this.getType() + "_" + this.getOwnerId() + "_" + this.getAlbumId()
    }, AudioPlaylist.prototype.isReference = function() {
        return !!this._ref
    }, AudioPlaylist.prototype.getSelf = function() {
        return this._ref && isObject(this._ref) ? this._ref : this
    }, AudioPlaylist.prototype._unref = function() {
        var e = this._ref;
        if (isObject(e)) {
            var t = {};
            for (var i in e)
                if (e.hasOwnProperty(i) && !isFunction(e[i]) && 0 == i.indexOf("_")) {
                    var r = e[i];
                    t[i.substr(1)] = isObject(r) ? clone(r) : r
                }
            t.hasMore = !1, delete t.ownerId, delete this._ref, this._type = AudioPlaylist.TYPE_TEMP, this._ownerId = t.ownerId || vk.id, this._albumId = AudioPlaylist.plIndex++, this._list = [], this.mergeWith(t)
        }
    }, AudioPlaylist.prototype.isAdsAllowed = function() {
        return this._ref && isObject(this._ref) ? this._ref : this
    }, AudioPlaylist.prototype.getType = function() {
        return this.getSelf()._type
    }, AudioPlaylist.prototype.getOwnerId = function() {
        return this.getSelf()._ownerId
    }, AudioPlaylist.prototype.getAlbumId = function() {
        return this.getSelf()._albumId
    }, AudioPlaylist.prototype.getPlaylistId = function() {
        return this.getSelf()._albumId
    }, AudioPlaylist.prototype.getOriginalPlaylistRawId = function() {
        return this.getSelf()._originalPlaylistRawId
    }, AudioPlaylist.prototype.isFollowed = function() {
        return this.getSelf()._isFollowed
    }, AudioPlaylist.prototype.setFollowed = function(e) {
        var t = this.getAddClasses() || "";
        return t = t.replace("audio_playlist__followed", ""), e && (t += " audio_playlist__followed"), this.getSelf()._addClasses = t, this.getSelf()._isFollowed = e
    }, AudioPlaylist.prototype.getFollowHash = function() {
        return this.getSelf()._followHash
    }, AudioPlaylist.prototype.getRawId = function() {
        return this.getSelf()._rawId
    }, AudioPlaylist.prototype.getGridCovers = function() {
        return this.getSelf()._gridCovers || ""
    }, AudioPlaylist.prototype.getTitle = function() {
        return this.getSelf()._title || ""
    }, AudioPlaylist.prototype.getSubtitle = function() {
        return this.getSelf()._subTitle || ""
    }, AudioPlaylist.prototype.getDescription = function() {
        return this.getSelf()._description || ""
    }, AudioPlaylist.prototype.getRawDescription = function() {
        return this.getSelf()._rawDescription || ""
    }, AudioPlaylist.prototype.getAccessHash = function() {
        return this.getSelf()._accessHash || ""
    }, AudioPlaylist.prototype.getFromId = function() {
        return this.getSelf()._fromId || 0
    }, AudioPlaylist.prototype.getAuthorLine = function() {
        return this.getSelf()._authorLine || ""
    }, AudioPlaylist.prototype.getAuthorHref = function() {
        return this.getSelf()._authorHref || ""
    }, AudioPlaylist.prototype.getAuthorName = function() {
        return this.getSelf()._authorName || ""
    }, AudioPlaylist.prototype.getInfoLine1 = function() {
        return this.getSelf()._infoLine1 || ""
    }, AudioPlaylist.prototype.getInfoLine2 = function() {
        return this.getSelf()._infoLine2 || ""
    }, AudioPlaylist.prototype.getListens = function() {
        return this.getSelf()._listens || 0
    }, AudioPlaylist.prototype.getAddClasses = function() {
        return this.getSelf()._addClasses || ""
    }, AudioPlaylist.prototype.isOfficial = function() {
        return !!this.getSelf()._isOfficial
    }, AudioPlaylist.prototype.getLastUpdated = function() {
        return this.getSelf()._lastUpdated || ""
    }, AudioPlaylist.prototype.getEditHash = function() {
        return this.getSelf()._editHash || ""
    }, AudioPlaylist.prototype.getDeleteHash = function() {
        return this.getSelf()._deleteHash || ""
    }, AudioPlaylist.prototype.getReplaceHash = function() {
        return this.getSelf()._replaceHash || ""
    }, AudioPlaylist.prototype.getCoverUrl = function() {
        return this.getSelf()._coverUrl || ""
    }, AudioPlaylist.prototype.getBlocks = function() {
        return this.getSelf()._blocks || {}
    }, AudioPlaylist.prototype.hasMore = function() {
        return !!this.getSelf()._hasMore
    }, AudioPlaylist.prototype.getFeedFrom = function() {
        return this.getSelf()._feedFrom
    }, AudioPlaylist.prototype.getFeedOffset = function() {
        return this.getSelf()._feedOffset
    }, AudioPlaylist.prototype.getSearchParams = function() {
        return this.getSelf()._searchParams || null
    }, AudioPlaylist.prototype.getSearchQid = function() {
        return this.getSelf()._searchQid || null
    }, AudioPlaylist.prototype.getLocalFoundCount = function() {
        return this.getSelf()._localFoundTotal || 0
    }, AudioPlaylist.prototype.setLocalFoundCount = function(e) {
        this.getSelf()._localFoundTotal = e
    }, AudioPlaylist.prototype.getTotalCount = function() {
        return this.getSelf()._totalCount
    }, AudioPlaylist.prototype.getTotalCountHash = function() {
        return this.getSelf()._totalCountHash
    }, AudioPlaylist.prototype.isShuffled = function() {
        return !!this.getShuffle()
    }, AudioPlaylist.prototype.getShuffle = function() {
        return this.getSelf()._shuffle
    }, AudioPlaylist.prototype.getFriendId = function() {
        return this.getSelf()._friend
    }, AudioPlaylist.prototype.setAdsAllowed = function(e) {
        return this.getSelf()._isAdsAllowed = e
    }, AudioPlaylist.prototype.isAdsAllowed = function() {
        return !!this.getSelf()._isAdsAllowed
    }, AudioPlaylist.prototype.equals = function(e) {
        return this.getSelf() == e.getSelf()
    }, AudioPlaylist.prototype._moveCurrentAudioAtFirstPosition = function() {
        var e = getAudioPlayer().getCurrentAudio(),
            t = this.getSelf(),
            i = this.indexOfAudio(e); - 1 != i && (t._list.splice(i, 1), t._list.unshift(e), t._movedAudioToFirstPos = i)
    }, AudioPlaylist.prototype._resetMovedAudioToInitialPosition = function() {
        var e = this.getSelf();
        if (e._movedAudioToFirstPos) {
            var t = e._list.splice(0, 1);
            e._list.splice(e._movedAudioToFirstPos, 0, t[0]), delete e._movedAudioToFirstPos
        }
    }, AudioPlaylist.prototype.clean = function(e) {
        e || this._unref();
        var t = this.getSelf();
        t._hasMore = !0, t._list = [], t._items = [], t._feedOffset = t._feedFrom = 0, t._nextOffset = 0
    }, AudioPlaylist.prototype.isInitedSortedList = function() {
        return !!this.getSelf()._sorted
    }, AudioPlaylist.prototype.initSortedList = function(e) {
        var t = this.getSelf();
        t._originalList || (t._originalList = [].concat(t._list)), t._sorted = !0, t._list = e
    }, AudioPlaylist.prototype.removeSortedList = function(e) {
        var t = this.getSelf();
        t._originalList && (t._list = [].concat(t._originalList)), t._sorted = !1
    }, AudioPlaylist.prototype.shuffle = function(e, t) {
        if (!(this.isShuffled() && e || !this.isShuffled() && !e)) {
            var i = this.getSelf();
            if (delete i._sorted, e) {
                var r = !1;
                if (this.hasMore())
                    if (this.getType() == AudioPlaylist.TYPE_SEARCH) i._originalList = i._originalList || [].concat(i._list), shuffle(i._list), t || this._moveCurrentAudioAtFirstPosition(), r = !0;
                    else if (inArray(this.getType(), [AudioPlaylist.TYPE_RECOM])) {
                    var n = getAudioPlayer().getCurrentAudio(),
                        o = this.indexOfAudio(n);
                    this.clean(!0), o >= 0 && i.addAudio(n, 0), r = !0
                } else this._unref(), i._originalList = i._originalList || [].concat(i._list), shuffle(i._list), t || this._moveCurrentAudioAtFirstPosition(), r = !0;
                else i._originalList = i._originalList || [].concat(i._list), shuffle(i._list), t || this._moveCurrentAudioAtFirstPosition(), r = !0;
                r && (i._shuffle = e)
            } else i._originalList ? i._list = i._originalList : this.clean(!0), delete i._shuffle, delete i._originalList;
            return !0
        }
    }, AudioPlaylist.prototype.getNextOffset = function() {
        return this.getSelf()._nextOffset || this.getAudiosCount()
    }, AudioPlaylist.prototype.getAudiosList = function() {
        return this.getSelf()._list || []
    }, AudioPlaylist.prototype.getSortedAudiosList = function() {
        return this.getSelf()._sortedList || this.getAudiosList() || []
    }, AudioPlaylist.prototype.getUnshuffledAudiosList = function() {
        var e = this.getSelf();
        return e._originalList ? e._originalList : e._list
    }, AudioPlaylist.prototype.getItemsList = function() {
        return this.getSelf()._items || []
    }, AudioPlaylist.prototype.getPostId = function() {
        return this.getSelf()._postId
    }, AudioPlaylist.prototype.getWallQuery = function() {
        return this.getSelf()._wallQuery
    }, AudioPlaylist.prototype.getWallType = function() {
        return this.getSelf()._wallType
    }, AudioPlaylist.prototype.getCommunititesBlock = function() {
        return this.getSelf()._communitiesBlock
    }, AudioPlaylist.prototype.getArtistsBlock = function() {
        return this.getSelf()._artistsBlock
    }, AudioPlaylist.prototype.getPlaylistsBlock = function() {
        return this.getSelf()._playlistsBlock
    }, AudioPlaylist.prototype.getNextAudio = function(e, t) {
        if (!e) return e = this.getAudioAt(0), t && AudioUtils.asObject(e).isClaimed ? this.getNextAudio(e, !0) : e;
        var i = this.indexOfAudio(e);
        if (i < 0) return !1;
        if (i + 1 < this.getAudiosCount()) {
            var r = this.getAudioAt(i + 1);
            return t && AudioUtils.asObject(r).isClaimed ? this.getNextAudio(r, !0) : r
        }
        return !1
    };
    var AUDIO_LOAD_CHUNK_SIZE = 2e3;

    function _loadAllPlaylistAudios(playlist, onDone) {
        if (!playlist.hasMore() || !playlist.isFullyLoadable()) return onDone && onDone();
        var onAllLoaded = function() {
                if (isDeleted) return onDone && onDone(null, isDeleted);
                var e = [];
                each(chunks, function(t, i) {
                    i && (e = e.concat(i))
                }), each(getAudioPlayer().getPlaylists(), function(t, i) {
                    i.getId() == playlist.getId() && (i._list = e)
                }), getAudioPlayer().mergePlaylistData(playlist, {
                    hasMore: !1
                }), onDone && onDone(playlist)
            },
            _loadChunk = function _loadChunk(chunkIndex, _cb) {
                ajax.post("al_audio.php", {
                    act: "load_section",
                    type: playlist.getType(),
                    owner_id: playlist.getOwnerId(),
                    playlist_id: playlist.getPlaylistId(),
                    access_hash: playlist.getAccessHash(),
                    from_id: playlist.getFromId(),
                    offset: chunkIndex * AUDIO_LOAD_CHUNK_SIZE,
                    is_loading_all: 1,
                    claim: intval(nav.objLoc.claim)
                }, {
                    onDone: function onDone(data, tpl, langs, templatesScript) {
                        if (0 == chunkIndex) {
                            if (addTemplates({
                                    audio_playlist_snippet: tpl
                                }), extend(cur.lang, langs), templatesScript && eval(templatesScript), !data) return isDeleted = !0, _cb();
                            totalCount = data.totalCount, getAudioPlayer().mergePlaylistData(playlist, data)
                        }
                        chunks[chunkIndex] = data.list, _cb()
                    }
                })
            },
            _loadAllChunks = function(e, t) {
                t = t || 0;
                var i = Math.max(0, Math.ceil(totalCount / AUDIO_LOAD_CHUNK_SIZE));
                if (i - t <= 0) e();
                else
                    for (var r = new callHub(e, i - t), n = t; n < i; n++) _loadChunk(n, function() {
                        r.done()
                    })
            },
            chunks = [],
            totalCount = playlist.getTotalCount(),
            isDeleted = !1;
        void 0 === totalCount ? _loadChunk(0, function() {
            isDeleted ? onAllLoaded() : _loadAllChunks(onAllLoaded, 1)
        }) : _loadAllChunks(onAllLoaded, 0)
    }

    function _updateAudioSoundBars(e, t, i) {
        var r = e.getContext("2d");
        r.clearRect(0, 0, e.width, e.height), r.fillStyle = i ? "#3D6899" : "#ffffff";
        for (var n = 0; n < 4; n++) {
            var o = 2 + 12 * t[n];
            r.fillRect(13 + 4 * n, 12 - o + 14, 2, o)
        }
    }
    AudioPlaylist.prototype.isFullyLoadable = function() {
        return this.getType() == AudioPlaylist.TYPE_PLAYLIST
    }, AudioPlaylist.prototype.loadAll = function(e) {
        if (!this.isFullyLoadable()) return e && e();
        this.load(0, e, !0)
    }, AudioPlaylist.prototype.load = function(offset, onDone, needAll) {
        isFunction(offset) && (onDone = offset, offset = 0);
        var searchParams = this.getSearchParams();
        offset = intval(offset);
        var countAvailable = this.getType() == AudioPlaylist.TYPE_FEED ? this.getItemsCount() : this.getAudiosCount(),
            isGoingToLoadAll = this.isFullyLoadable() && needAll && this.hasMore();
        if (offset < countAvailable && !isGoingToLoadAll) return onDone && onDone(this);

        function callOnDones(e, t) {
            var i = this._onDoneLoading;
            delete this._onDoneLoading, delete this._loadingAll, each(i || [], function(e, i) {
                i && i(this, t)
            }.bind(this))
        }
        return this.hasMore() ? searchParams && this.getType() == AudioPlaylist.TYPE_SEARCH && !searchParams.globalQuery ? onDone && onDone(this) : (this._onDoneLoading = this._onDoneLoading || [], this._onDoneLoading.push(onDone), this._loadingAll ? void 0 : needAll ? (this._loadingAll = !0, void _loadAllPlaylistAudios(this, callOnDones.bind(this))) : (offset = this.getNextOffset(), offset == this.getLocalFoundCount() && (offset -= this.getLocalFoundCount()), offset || clearTimeout(this._sendSearchStatsTimeout), void ajax.post("al_audio.php", {
            act: "load_section",
            type: this.getType(),
            owner_id: cur.audioPage && "search" === this.getType() ? cur.audioPage.getOwnerId() : this.getOwnerId(),
            playlist_id: this.getPlaylistId(),
            offset: offset,
            access_hash: this.getAccessHash(),
            search_q: searchParams ? searchParams.globalQuery : null,
            search_performer: searchParams ? searchParams.performer : null,
            search_lyrics: searchParams ? searchParams.lyrics : null,
            search_sort: searchParams ? searchParams.sort : null,
            search_history: searchParams ? intval(searchParams.fromHistory) : null,
            search_qid: this.getSearchQid(),
            feed_from: this.getFeedFrom(),
            feed_offset: this.getFeedOffset(),
            shuffle: this.getShuffle(),
            post_id: this.getPostId(),
            wall_query: this.getWallQuery(),
            wall_type: this.getWallType(),
            claim: intval(nav.objLoc.claim)
        }, {
            onDone: function(loadedPlaylist, tpl, langs, templatesScript) {
                addTemplates({
                    audio_playlist_snippet: tpl
                }), extend(cur.lang, langs), templatesScript && eval(templatesScript), this._loadingAll && !needAll || (getAudioPlayer().mergePlaylistData(this, loadedPlaylist), callOnDones.call(this), getAudioPlayer().saveStateCurrentPlaylist(), offset || (clearTimeout(this._sendSearchStatsTimeout), this._sendSearchStatsTimeout = setTimeout(this.sendSearchStats.bind(this, "search_view"), 3e3), this._searchPlayStatsSent = !1))
            }.bind(this)
        }))) : onDone && onDone(this)
    }, AudioPlaylist.prototype.getLiveInfo = function() {
        var e = this.getSelf()._live;
        return !!e && {
            hostId: (e = e.split(","))[0],
            audioId: e[1],
            hash: e[2]
        }
    }, AudioPlaylist.prototype.isLive = function() {
        return !!this.getLiveInfo()
    }, AudioPlaylist.prototype.getAudioAt = function(e) {
        return this.getSelf()._list.length > e ? this.getSelf()._list[e] : null
    }, AudioPlaylist.prototype.getAudiosCount = function() {
        return this.getSelf()._list.length
    }, AudioPlaylist.prototype.getTotalDuration = function() {
        var e = this.getAudiosList(),
            t = 0;
        return each(e, function(e, i) {
            t += i[AudioUtils.AUDIO_ITEM_INDEX_DURATION]
        }), t
    }, AudioPlaylist.prototype.getItemsCount = function() {
        var e = this.getSelf();
        return e._items = e._items || [], e._items.length
    }, AudioPlaylist.prototype.removeAudio = function(e) {
        var t = this.indexOfAudio(e);
        if (t >= 0) {
            this._unref();
            var i = this._list.splice(t, 1);
            return this._index && this._index.remove(i[0]), t
        }
        return -1
    }, AudioPlaylist.prototype.addAudio = function(e, t) {
        this._unref();
        var i = this,
            r = void 0 === t;

        function n(e) {
            var n = i.getUnshuffledAudiosList(),
                o = i.indexOfAudio(e);
            if (o >= 0) {
                if (r) return;
                n.splice(o, 1)
            }(e = clone(e))[AudioUtils.AUDIO_ITEM_INDEX_TITLE] = clean(replaceEntities(e[AudioUtils.AUDIO_ITEM_INDEX_TITLE]).replace(/(<em>|<\/em>)/g, "")), e[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER] = clean(replaceEntities(e[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER]).replace(/(<em>|<\/em>)/g, "")), r ? n.push(e) : n.splice(t, 0, e), i._index && i._index.add(e)
        }
        if (isArray(e) && isArray(e[0]))
            for (var o = 0, a = e.length; o < a; o++) n(e[o]);
        else e.length && n(e)
    }, AudioPlaylist.prototype.mergeWith = function(e) {
        if (!isObject(this._ref)) {
            var t = e.list;
            if (t) {
                var i = getAudioPlayer().getCurrentAudio();
                if (i && this.indexOfAudio(i) >= 0) {
                    for (var r = -1, n = 0, o = t.length; n < o; n++)
                        if (i[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] == t[n][AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] && i[AudioUtils.AUDIO_ITEM_INDEX_ID] == t[n][AudioUtils.AUDIO_ITEM_INDEX_ID]) {
                            r = n;
                            break
                        }
                    r >= 0 && this.clean()
                }
                this.addAudio(e.list)
            }
            if (e.items) {
                this._items = this._items || [];
                for (n = 0, o = e.items.length; n < o; n++) this._items.push(e.items[n])
            }
            var a = this;
            each(["accessHash", "addClasses", "artistsBlock", "authorLine", "authorHref", "authorName", "communitiesBlock", "coverUrl", "description", "gridCovers", "editHash", "feedFrom", "feedOffset", "followHash", "hasMore", "infoLine1", "infoLine2", "isAdsAllowed", "isFollowed", "isOfficial", "lastUpdated", "listens", "live", "nextOffset", "originalList", "playlistsBlock", "postId", "rawId", "rawDescription", "searchQid", "searchParams", "shuffle", "subTitle", "title", "totalCount", "totalCountHash", "wallQuery", "wallType"], function(t, i) {
                void 0 !== e[i] && (a["_" + i] = e[i])
            })
        }
    }, AudioPlaylist.prototype.moveAudio = function(e, t) {
        this._unref();
        var i = this._list.splice(e, 1);
        e < t && (t -= 1), this._list.splice(t, 0, i[0])
    }, AudioPlaylist.prototype.indexOfAudio = function(e) {
        if (!e) return -1;
        var t;
        isString(e) ? t = e.split("_") : isObject(e) ? t = [e.ownerId, e.id] : isArray(e) && (t = [e[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID], e[AudioUtils.AUDIO_ITEM_INDEX_ID]]);
        for (var i = this.getSelf()._list, r = 0, n = i.length; r < n; r++)
            if (t[0] == i[r][AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] && t[1] == i[r][AudioUtils.AUDIO_ITEM_INDEX_ID]) return r;
        return -1
    }, AudioPlaylist.prototype.getAudio = function(e) {
        isString(e) || AudioUtils.asObject(e).fullId;
        e = e.split("_");
        for (var t = this.getSelf(), i = 0, r = t._list.length; i < r; i++)
            if (e[0] == t._list[i][AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] && e[1] == t._list[i][AudioUtils.AUDIO_ITEM_INDEX_ID]) return t._list[i];
        return null
    }, AudioPlaylist.prototype._ensureIndex = function(e) {
        var t = this.getSelf();
        if (t._index) e && e();
        else {
            var i = function(e, t) {
                var i = intval(t);
                return i >= 33 && i < 48 ? String.fromCharCode(i) : e
            };
            t._index = new vkIndexer(t._list, function(e) {
                return (e[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER] + " " + e[AudioUtils.AUDIO_ITEM_INDEX_TITLE]).replace(/\&\#(\d+);?/gi, i)
            }, e)
        }
    }, AudioPlaylist.prototype.search = function(e, t) {
        var i = this.getSelf();
        isObject(e) || (e = {
            q: e
        }), this._ensureIndex(function() {
            var r = i._index ? i._index.search(e.q) : [];
            return r = r.filter(function(t) {
                return !e.lyrics || !!intval(t[AudioUtils.AUDIO_ITEM_INDEX_LYRICS])
            }), t(r)
        }.bind(this))
    }, AudioPlaylist.prototype.sendSearchStats = function(e) {
        if ("search_play" == e) {
            if (this._searchPlayStatsSent) return;
            this._searchPlayStatsSent = !0
        }
        ajax.post("al_audio.php?act=search_stats", {
            event_type: e,
            search_type: this.getSearchQid() ? "external" : "internal",
            search_params: JSON.stringify(this.getSearchParams()),
            results_count: this.getTotalCount()
        })
    }, AudioPlaylist.prototype.toString = function() {
        return this.getId()
    }, AudioPlaylist.prototype.fetchNextLiveAudio = function(e) {
        var t = this.getLiveInfo(),
            i = this;
        ajax.post("al_audio.php", {
            act: "a_get_audio_status",
            host_id: t.hostId,
            hash: t.hash
        }, {
            onDone: function(t) {
                if (t) {
                    var r = i.indexOfAudio(t);
                    r >= 0 ? i.moveAudio(r, i.getAudiosCount() - 1) : i.addAudio(t)
                }
                e && e(t)
            }
        })
    }, window.AudioPlayer || (window.AudioPlayer = function() {
        var e = this;
        if (this._currentAudio = !1, this._isPlaying = !1, this._prevPlaylist = null, this._currentPlaylist = null, this._playlists = [], this.subscribers = [], this._tasks = [], this._statusExport = {}, this._currentPlayingRows = [], this._podcasts = {
                episodes: {}
            }, this._allowPrefetchNext = !1, !vk.isBanned) {
            AudioUtils.debugLog("Player creation"), this._initImpl(), this._initEvents(), this._restoreVolumeState(), this._podcastCleanStates();
            var t = this;
            setTimeout(function() {
                t.restoreState(), AudioUtils.toggleAudioHQBodyClass(), t.updateCurrentPlaying()
            }), window.stManager.add(["notifier.js"], function() {
                var t = !1,
                    i = Notifier.getLpInstance();
                i && i.onData(function(i) {
                    switch (i.type) {
                        case _shared_im_longpoll_events__WEBPACK_IMPORTED_MODULE_3__.AUDIO_START:
                            e.getDeviceId() !== i.uuid && !t && e._isPlaying && (getAudioPlayer().pause(), t = showBox("al_audio.php", {
                                act: "start_playback_box",
                                uuid: i.uuid,
                                device_name: i.deviceName
                            }, {
                                params: {
                                    hideButtons: !0,
                                    onHide: function() {
                                        t = !1
                                    }
                                },
                                containerClass: "audio_playback_box"
                            }))
                    }
                })
            })
        }
    }), AudioPlayer.prototype.getVersion = function() {
        return 15
    }, AudioPlayer.prototype._initImpl = function(e) {
        var t = this;
        this._impl && this._impl.destroy();
        var i = 0,
            r = function(e) {
                if (-1 != i) {
                    if (e && (i++, this._implSetDelay(200), i > 3)) {
                        i = -1;
                        var t = new MessageBox({
                            title: getLang("global_error")
                        }).content(getLang("audio_error_loading")).setButtons("Ok", function() {
                            i = 0, curBox().hide()
                        });
                        return t.show(), Object(_audioplayer_audioplayer_utils__WEBPACK_IMPORTED_MODULE_4__.setWorkerTimeout)(function() {
                            i = 0, t.hide()
                        }, 3e3), this.notify(AudioPlayer.EVENT_ENDED), void this.notify(AudioPlayer.EVENT_FAILED)
                    }
                    AudioUtils.isPodcast(this.getCurrentAudio()) ? (this._isPlaying = !1, this.notify(AudioPlayer.EVENT_PAUSE), this.notify(AudioPlayer.EVENT_ENDED), this.stop()) : this._repeatCurrent ? (this._implSeekImmediate(0), this._implPlay()) : (this._isPlaying = !1, this.notify(AudioPlayer.EVENT_PAUSE), this.notify(AudioPlayer.EVENT_ENDED), this.playNext(!0)), this._sendListenedData()
                }
            }.bind(this),
            n = {
                onBufferUpdate: function(e) {
                    this.notify(AudioPlayer.EVENT_BUFFERED, e)
                }.bind(this),
                onEnd: function() {
                    0,
                    r()
                },
                onFail: function() {
                    t._sendPlayerErrorStats(t._impl), 0, r(!0)
                },
                onCanPlay: function() {
                    this.notify(AudioPlayer.EVENT_CAN_PLAY)
                }.bind(this),
                onProgressUpdate: function(e, t) {
                    var i = this.getCurrentAudio();
                    !this._muteProgressEvents && i && this.notify(AudioPlayer.EVENT_PROGRESS, e, i[AudioUtils.AUDIO_ITEM_INDEX_DURATION], t)
                }.bind(this),
                onFrequency: function(e) {
                    t.notify(AudioPlayer.EVENT_FREQ_UPDATE, e)
                }
            };
        AudioUtils.debugLog("Implementation init"), AudioUtils.debugLog("param browser.flash", browser.flash), AudioUtils.debugLog("param force HTML5", !!e), browser.safari && parseInt(browser.version) >= 11 ? this._impl = new AudioPlayerHTML5Simple(n) : e ? this._impl = new AudioPlayerHTML5(n) : AudioPlayerHTML5WebAudio.isSupported() ? (this._impl = new AudioPlayerHTML5WebAudio(n), this._impl.failed && (this._impl = new AudioPlayerHTML5(n))) : AudioPlayerHTML5.isSupported() ? this._impl = new AudioPlayerHTML5(n) : browser.flash && (this._impl = new AudioPlayerFlash(n)), this._implSetVolume(0)
    }, AudioPlayer.EVENT_CURRENT_CHANGED = "curr", AudioPlayer.EVENT_PLAY = "start", AudioPlayer.EVENT_PAUSE = "pause", AudioPlayer.EVENT_STOP = "stop", AudioPlayer.EVENT_UPDATE = "update", AudioPlayer.EVENT_LOADED = "loaded", AudioPlayer.EVENT_ENDED = "ended", AudioPlayer.EVENT_FAILED = "failed", AudioPlayer.EVENT_BUFFERED = "buffered", AudioPlayer.EVENT_PROGRESS = "progress", AudioPlayer.EVENT_VOLUME = "volume", AudioPlayer.EVENT_PLAYLIST_CHANGED = "plchange", AudioPlayer.EVENT_ADDED = "added", AudioPlayer.EVENT_REMOVED = "removed", AudioPlayer.EVENT_FREQ_UPDATE = "freq", AudioPlayer.EVENT_SEEK = "seek", AudioPlayer.EVENT_AD_READY = "ad_ready", AudioPlayer.EVENT_AD_DEINITED = "ad_deinit", AudioPlayer.EVENT_AD_STARTED = "ad_started", AudioPlayer.EVENT_AD_COMPLETED = "ad_completed", AudioPlayer.EVENT_START_LOADING = "start_load", AudioPlayer.EVENT_CAN_PLAY = "actual_start", AudioPlayer.LS_VER = "v20", AudioPlayer.LS_KEY_PREFIX = "audio", AudioPlayer.LS_PREFIX = AudioPlayer.LS_KEY_PREFIX + "_" + AudioPlayer.LS_VER + "_", AudioPlayer.LS_VOLUME = "vol", AudioPlayer.LS_PL = "pl", AudioPlayer.LS_TRACK = "track", AudioPlayer.LS_SAVED = "saved", AudioPlayer.LS_PROGRESS = "progress", AudioPlayer.LS_PODCASTS = "podcasts", AudioPlayer.LS_DURATION_TYPE = "dur_type", AudioPlayer.LS_ADS_CURRENT_DELAY = "ads_current_delay_v4", AudioPlayer.PLAYBACK_RATE_STEP = .5, AudioPlayer.PLAYBACK_RATE_MAX = 3, AudioPlayer.DEFAULT_VOLUME = .8, AudioPlayer.AD_TYPE = "preroll", window.audioIconSuffix = window.devicePixelRatio >= 2 ? "_2x" : "", AudioPlayer.tabIcons = {
        def: "/images/icons/favicons/fav_logo" + audioIconSuffix + ".ico",
        play: "/images/icons/favicons/fav_play" + audioIconSuffix + ".ico",
        pause: "/images/icons/favicons/fav_pause" + audioIconSuffix + ".ico"
    }, AudioPlayer.getLang = function(e) {
        var t = getAudioPlayer();
        return t && t.langs ? t.langs[e] : e
    }, AudioPlayer.clearDeprecatedCacheKeys = function() {
        AudioPlayer._iterateCacheKeys(function(e) {
            return e == AudioPlayer.LS_VER
        })
    }, AudioPlayer.clearOutdatedCacheKeys = function() {
        (ls.get(AudioPlayer.LS_PREFIX + AudioPlayer.LS_SAVED) || 0) < vkNow() - 72e5 && AudioPlayer._iterateCacheKeys(function(e, t) {
            return !inArray(t, [AudioPlayer.LS_PL, AudioPlayer.LS_TRACK, AudioPlayer.LS_PROGRESS])
        })
    }, AudioPlayer.clearAllCacheKeys = function() {
        AudioPlayer._iterateCacheKeys(function() {
            return !1
        }), setCookie("remixcurr_audio", "", -1)
    }, AudioPlayer._iterateCacheKeys = function(e) {
        for (var t in window.localStorage)
            if (0 === t.indexOf(AudioPlayer.LS_KEY_PREFIX + "_")) {
                var i = t.split("_");
                e(i[1], i[2]) || localStorage.removeItem(t)
            }
    }, AudioPlayer.prototype.onMediaKeyPressedEvent = function(e) {
        var t = this.getCurrentAudio();
        this.getCurrentPlaylist();
        if (t) switch (e.keyCode) {
            case 179:
                this.isPlaying() ? this.pause() : this.play();
                break;
            case 178:
                this.seek(0), this.pause();
                break;
            case 177:
                this.playPrev();
                break;
            case 176:
                this.playNext()
        }
    }, AudioPlayer.prototype.deletePlaylist = function(e) {
        for (var t = 0; t < this._playlists.length; t++) this._playlists[t] == e && this._playlists.splice(t, 1)
    }, AudioPlayer.prototype.mergePlaylistData = function(e, t) {
        if (!e.hasMore()) return e;
        each(this._playlists, function(i, r) {
            r.getId() == e.getId() && r.mergeWith(t)
        })
    }, AudioPlayer.prototype.deleteCurrentPlaylist = function() {
        this.stop(), delete this._currentAudio, delete this._currentPlaylist, this.notify(AudioPlayer.EVENT_UPDATE), this.notify(AudioPlayer.EVENT_PLAYLIST_CHANGED), this.updateCurrentPlaying()
    }, AudioPlayer.prototype.updateCurrentPlaying = function(e) {
        e = !!e;
        var t = AudioUtils.asObject(this.getCurrentAudio()),
            i = [];
        if (t) {
            var r = geByClass("_audio_row_" + t.fullId);
            i = i.concat([].slice.call(r))
        }
        for (var n = 0, o = this._currentPlayingRows.length; n < o; n++) {
            (a = this._currentPlayingRows[n]) && !inArray(a, i) && this.toggleCurrentAudioRow(a, !1, e)
        }
        if (t)
            for (n = 0, o = i.length; n < o; n++) {
                var a;
                if (a = i[n]) {
                    if (gpeByClass("article_editor_canvas", a)) continue;
                    this.toggleCurrentAudioRow(a, !0, e)
                }
            }
        this._currentPlayingRows = i, each(geByClass("_audio_pl"), function() {
            removeClass(this, "audio_pl__playing")
        });
        var s, d = this.isPlaying(),
            u = this.getCurrentPlaylist();
        d && u && ((s = geByClass("_audio_pl_" + u.getOwnerId() + "_" + u.getPlaylistId())) && each(s, function() {
            addClass(this, "audio_pl__playing")
        }))
    }, AudioPlayer.prototype.toggleCurrentAudioRow = function(e, t, i) {
        var r = AudioUtils.getAudioFromEl(e, !0);
        if (r.isCurrent != t) {
            addClass(e, AudioUtils.AUDIO_CURRENT_CLS);
            var n = geByClass1("_audio_row__title", e),
                o = geByClass1("_audio_row__duration", e),
                a = geByClass1("_audio_row__play_btn", e);
            r.withInlinePlayer && toggleClass(e, "audio_row__player_transition", i), (i = !!r.withInlinePlayer && i) ? setTimeout(s.bind(this), 0) : s.call(this)
        }

        function s() {
            var s = this;
            if (r.withInlinePlayer && (t ? this._addRowPlayer(e, i) : this._removeRowPlayer(e)), t) {
                this.on(e, AudioPlayer.EVENT_PLAY, function(t) {
                    AudioUtils.asObject(t).fullId == r.fullId && (addClass(e, AudioUtils.AUDIO_PLAYING_CLS), a && attr(a, "aria-label", getLang("global_audio_pause")), n && attr(n, "role", "heading"))
                }), this.on(e, AudioPlayer.EVENT_PROGRESS, function(e, t, i) {
                    if (r.withInlinePlayer || !s.isAdPlaying()) {
                        i = intval(i);
                        var n = 0;
                        n = s.getDurationType() ? "-" + formatTime(Math.round(i - t * i)) : formatTime(Math.round(t * i)), o && (o.innerHTML = n)
                    } else o && (o.innerHTML = formatTime(r.duration))
                }), this.on(e, [AudioPlayer.EVENT_PAUSE, AudioPlayer.EVENT_ENDED], function() {
                    removeClass(e, AudioUtils.AUDIO_PLAYING_CLS), a && attr(a, "aria-label", getLang("global_audio_play")), n && attr(n, "role", "")
                });
                var d = data(e, "bars");
                if (!d && (r.isWithCovers || r.isNumeric)) {
                    if (d = se('<canvas class="audio_row__sound_bars"></canvas>'), e.appendChild(d), d.width = AudioUtils.AUDIO_ROW_COVER_SIZE * (isRetina() ? 2 : 1), d.height = AudioUtils.AUDIO_ROW_COVER_SIZE * (isRetina() ? 2 : 1), d.style.width = AudioUtils.AUDIO_ROW_COVER_SIZE, d.style.height = AudioUtils.AUDIO_ROW_COVER_SIZE, isRetina()) d.getContext("2d").scale(2, 2);
                    var u = r.isNumeric;
                    this.on(e, AudioPlayer.EVENT_FREQ_UPDATE, function(e, t) {
                        _updateAudioSoundBars(d, t, u)
                    }), _updateAudioSoundBars(d, [0, 0, 0, 0], u), data(e, "bars", d)
                }
                toggleClass(e, AudioUtils.AUDIO_PLAYING_CLS, this.isPlaying())
            } else {
                this.off(e), removeClass(e, AudioUtils.AUDIO_PLAYING_CLS), removeClass(e, AudioUtils.AUDIO_CURRENT_CLS), o && (o.innerHTML = formatTime(r.duration)), a && attr(a, "aria-label", getLang("global_audio_play")), n && attr(n, "role", "");
                var f = data(e, "bars");
                f && (re(f), data(e, "bars", null))
            }
            i ? setTimeout(function() {
                var t = AudioUtils.getAudioFromEl(e, !0);
                toggleClass(e, AudioUtils.AUDIO_CURRENT_CLS, !!t.isCurrent)
            }, 0) : toggleClass(e, AudioUtils.AUDIO_CURRENT_CLS, t)
        }
    }, AudioPlayer.prototype._removeRowPlayer = function(e) {
        removeClass(e, AudioUtils.AUDIO_CURRENT_CLS);
        var t = data(e, "player_inited");
        if (t) {
            setTimeout(function() {
                re(geByClass1("_audio_inline_player", e))
            }, 200);
            var i = geByClass1("_audio_duration", e);
            i && (i.innerHTML = formatTime(AudioUtils.getAudioFromEl(e, !0).duration)), this.off(e), each(t.sliders, function() {
                this.destroy()
            }), data(e, "player_inited", !1);
            var r = geByClass1("has_audio_player", e);
            r && removeClass(r, "has_audio_player")
        }
    }, AudioPlayer.prototype._addRowPlayer = function(e, t) {
        if (!geByClass1("_audio_inline_player", e)) {
            var i = this,
                r = se(vk.audioInlinePlayerTpl || getTemplate("audio_inline_player")),
                n = geByClass1("_audio_player__place", e);
            n.appendChild(r), addClass(n, "has_audio_player");
            var o = new Slider(geByClass1("audio_inline_player_volume", r), {
                    value: i.getVolume(),
                    backValue: 0,
                    size: 1,
                    hintClass: "audio_player_hint",
                    withBackLine: !0,
                    log: !0,
                    formatHint: function(e) {
                        return Math.round(100 * e) + "%"
                    },
                    onChange: function(e) {
                        i.setVolume(e)
                    }
                }),
                a = new Slider(geByClass1("audio_inline_player_progress", r), {
                    value: 0,
                    backValue: 0,
                    size: 1,
                    hintClass: "audio_player_hint",
                    withBackLine: !0,
                    formatHint: function(e) {
                        var t = AudioUtils.asObject(i.getCurrentAudio());
                        return formatTime(Math.round(e * t.duration))
                    },
                    onEndDragging: function(e) {
                        i.seek(e)
                    }
                });
            i.isAdPlaying() && a.toggleAdState(!0), i.on(e, AudioPlayer.EVENT_AD_DEINITED, function() {}), i.on(e, AudioPlayer.EVENT_AD_READY, function() {}), i.on(e, AudioPlayer.EVENT_AD_STARTED, function() {
                a.toggleAdState(!0), a.setBackValue(0)
            }), i.on(e, AudioPlayer.EVENT_AD_COMPLETED, function() {
                a.toggleAdState(!1)
            }), i.on(e, AudioPlayer.EVENT_START_LOADING, function() {
                a.toggleLoading(!0)
            }), i.on(e, AudioPlayer.EVENT_CAN_PLAY, function() {
                a.toggleLoading(!1)
            }), i.on(e, AudioPlayer.EVENT_BUFFERED, function(e, t) {
                a.setBackValue(t)
            }), i.on(e, AudioPlayer.EVENT_PROGRESS, function(e, t) {
                a.toggleLoading(!1), a.setValue(t)
            }), i.on(e, AudioPlayer.EVENT_VOLUME, function(e, t) {
                o.setValue(t)
            }), data(e, "player_inited", {
                sliders: [o, a]
            })
        }
    }, AudioPlayer.prototype.hasStatusExport = function() {
        for (var e in this._statusExport)
            if (this._statusExport[e]) return !0;
        return !1
    }, AudioPlayer.prototype.getStatusExportInfo = function() {
        return this._statusExport
    }, AudioPlayer.prototype.setStatusExportInfo = function(e) {
        this._statusExport = e
    }, AudioPlayer.prototype.deleteAudioFromAllPlaylists = function(e) {
        e = isObject(e) || isArray(e) ? AudioUtils.asObject(e).fullId : e, each(this._playlists, function(t, i) {
            i.removeAudio(e)
        })
    }, AudioPlayer.prototype.updateAudio = function(e, t) {
        var i = "";
        if (isString(e) ? i = e : isArray(e) && (i = AudioUtils.asObject(e).fullId), t || (t = e), each(this._playlists, function(e, r) {
                for (var n = r.getAudiosList(), o = 0, a = n.length; o < a; o++)
                    if (n[o][AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + n[o][AudioUtils.AUDIO_ITEM_INDEX_ID] == i) return isObject(t) && each(t, function(e, t) {
                        n[o][e] = t
                    }), void(isArray(t) && (n[o] = t))
            }), this._currentAudio[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + this._currentAudio[AudioUtils.AUDIO_ITEM_INDEX_ID] == i) {
            if (isObject(t)) {
                var r = this;
                each(t, function(e, t) {
                    r._currentAudio[e] = t
                })
            }
            isArray(t) && (this._currentAudio = t, this.notify(AudioPlayer.EVENT_CURRENT_CHANGED))
        }
        return this.notify(AudioPlayer.EVENT_UPDATE), e
    }, AudioPlayer.prototype._triggerTNSPixel = function() {
        var e = this._lsGet("tns_triggered_time_v3") || 0;
        vkNow() - e < 864e5 || (this._lsSet("tns_triggered_time_v3", vkNow()), vkImage().src = "https://www.tns-counter.ru/V13a****mail_ru/ru/CP1251/tmsec=mail_audiostart/" + irand(1, 1e9))
    }, AudioPlayer.prototype._sendLCNotification = function() {
        var e = window.Notifier;
        e && e.lcSend("audio_start");
        try {
            window.Videoview && Videoview.togglePlay(!1)
        } catch (e) {}
    }, AudioPlayer.prototype.showHQLabel = function(e) {
        var t = "_audio_show_hq_label";
        return void 0 === e ? !!ls.get(t) : (e = !!e, ls.set(t, e), AudioUtils.toggleAudioHQBodyClass(), e)
    }, AudioPlayer.prototype._restoreVolumeState = function() {
        AudioPlayer.clearDeprecatedCacheKeys(), AudioPlayer.clearOutdatedCacheKeys();
        var e = this._lsGet(AudioPlayer.LS_VOLUME);
        this._userVolume = void 0 == e || !1 === e ? AudioPlayer.DEFAULT_VOLUME : e
    }, AudioPlayer.prototype.restoreState = function() {
        if (!vk.widget && (AudioPlayer.clearDeprecatedCacheKeys(), AudioPlayer.clearOutdatedCacheKeys(), !window.cur.audioPreventRestoreTrack)) {
            this._currentAudio = this._lsGet(AudioPlayer.LS_TRACK);
            var e = this._lsGet(AudioPlayer.LS_PL);
            e && (e = JSON.parse(e), this._currentPlaylist = new AudioPlaylist(e), this._initPlayingContext(e.context), e.originalPlaylistRawId && (this._currentPlaylist._originalPlaylistRawId = e.originalPlaylistRawId)), this._currentPlaylist && this._currentAudio ? this.notify(AudioPlayer.EVENT_UPDATE) : this._currentPlaylist = this._currentAudio = !1;
            var t = 0;
            if (AudioUtils.isPodcast(this._currentAudio)) t = ((this._podcastGetStates()[this._currentAudio[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + this._currentAudio[AudioUtils.AUDIO_ITEM_INDEX_ID]] || {}).position || 0) / this._currentAudio[AudioUtils.AUDIO_ITEM_INDEX_DURATION];
            else t = this._lsGet(AudioPlayer.LS_PROGRESS) || 0;
            this._currentAudio && t && this._impl && 0 === this._impl.type.indexOf("html5") && (this._implSetUrl(this._currentAudio, !0), t < 1 && this._implSeek(t), this._implSetVolume(0)), this.notify(AudioPlayer.EVENT_CURRENT_CHANGED), this._updatePlaybackRate()
        }
    }, AudioPlayer.prototype._ensureImplReady = function(e) {
        var t = this;
        this._impl && this._impl.onReady(function(i) {
            if (i) return e();
            "flash" == t._impl.type && (AudioUtils.debugLog("Flash not initialized, lets try HTML5 as desperate way"), t._initImpl(!0))
        })
    }, AudioPlayer.prototype._implNewTask = function(e, t) {
        this._taskIDCounter = this._taskIDCounter || 1, this._tasks = this._tasks || [], this._tasks.push({
            name: e,
            cb: t,
            id: e + "_" + this._taskIDCounter++
        }), this._implDoTasks()
    }, AudioPlayer.prototype._implDoTasks = function() {
        if (this._tasks = this._tasks || [], !this._taskInProgress) {
            var e = this._tasks.shift();
            if (e) {
                var t = this;
                e = clone(e), this._taskInProgress = e.id, this._ensureImplReady(function() {
                    e.cb.call(t, function() {
                        t._taskAbort != e.id ? (t._taskInProgress = !1, t._implDoTasks()) : t._taskAbort = !1
                    })
                })
            }
        }
    }, AudioPlayer.prototype._implClearAllTasks = function() {
        this._taskAbort = this._taskInProgress, this._taskInProgress = !1, this._tasks = []
    }, AudioPlayer.prototype._implClearTask = function(e) {
        this._tasks = this._tasks || [], this._tasks = this._tasks.filter(function(t) {
            return t.name != e
        })
    }, AudioPlayer.prototype._implSetDelay = function(e) {
        this._implNewTask("delay", function e(t) {
            Object(_audioplayer_audioplayer_utils__WEBPACK_IMPORTED_MODULE_4__.setWorkerTimeout)(t, e)
        })
    }, AudioPlayer.prototype.getDeviceId = function() {
        var e = localStorage.getItem("audio_uuid");
        return e || (e = _node_modules_node_uuid_uuid__WEBPACK_IMPORTED_MODULE_2__(), localStorage.setItem("audio_uuid", e)), e
    }, AudioPlayer.prototype._implPlay = function() {
        var e = this;
        this._implNewTask("play", function(t) {
            var i = AudioUtils.asObject(e.getCurrentAudio());
            if (e._impl.play(i.url), e._muteProgressEvents = !1, e._allowPrefetchNext = !0, i.actionHash && ajax.post("al_audio.php", {
                    act: "start_playback",
                    audio_id: i.id,
                    owner_id: i.owner_id,
                    hash: i.actionHash,
                    uuid: e.getDeviceId()
                }), AudioUtils.isPodcast(i)) {
                var r = e._podcastRestoreState();
                e._podcastLog(i, r, 0, "play")
            }
            t()
        })
    }, AudioPlayer.prototype._implSeekImmediate = function(e) {
        this._impl && this._impl.seek(e)
    }, AudioPlayer.prototype._implSeek = function(e) {
        var t = this;
        this._implClearTask("seek"), this._implNewTask("seek", function(i) {
            t._impl.seek(e), i()
        })
    }, AudioPlayer.prototype._implPause = function() {
        var e = this;
        this._implNewTask("pause", function(t) {
            e._impl.pause(), t()
        })
    }, AudioPlayer.prototype._implSetVolume = function(e, t) {
        if (this._impl) {
            var i = this;
            if (t) {
                var r = 0 == e ? "vol_down" : "vol_up";
                this._implNewTask(r, function(t) {
                    i._impl.fadeVolume(e, function() {
                        t()
                    })
                })
            } else this._implNewTask("vol_set", function(t) {
                i._impl.setVolume(e), t()
            })
        }
    }, AudioPlayer.prototype._implSetUrl = function(e, t) {
        var i = this;
        this._implClearTask("url"), this._implNewTask("url", function(r) {
            t || i.notify(AudioPlayer.EVENT_START_LOADING);
            var n = i._taskInProgress;
            i._ensureHasURL(e, function(e) {
                n == i._taskInProgress && (e = AudioUtils.asObject(e), i._impl.setUrl(e.url, function(e) {
                    e || (i._implClearAllTasks(), i._onFailedUrl()), r()
                }))
            })
        })
    }, AudioPlayer.prototype.showSubscriptionPopup = function() {
        showBox("/al_audio.php", {
            act: "subscription_box"
        }, {
            params: {
                containerClass: "audio_subscription_popup",
                grey: !0,
                width: 520
            }
        })
    }, AudioPlayer.prototype.toggleDurationType = function() {
        var e = intval(ls.get(AudioPlayer.LS_PREFIX + AudioPlayer.LS_DURATION_TYPE));
        e = !e, ls.set(AudioPlayer.LS_PREFIX + AudioPlayer.LS_DURATION_TYPE, e), this.notify(AudioPlayer.EVENT_UPDATE, this.getCurrentProgress())
    }, AudioPlayer.prototype.getDurationType = function() {
        return intval(ls.get(AudioPlayer.LS_PREFIX + AudioPlayer.LS_DURATION_TYPE))
    }, AudioPlayer.prototype.getCurrentProgress = function() {
        return this._impl ? this._impl.getCurrentProgress() : 0
    }, AudioPlayer.prototype.getCurrentBuffered = function() {
        return this._impl ? this._impl.getCurrentBuffered() : 0
    }, AudioPlayer.prototype._initEvents = function() {
        var e = window.Notifier,
            t = this;
        e && (e.addRecvClbk("audio_start", "audio", function(e) {
            t.isPlaying() && t.pause(!1, !t._fadeVolumeWorker), delete t.pausedByVideo
        }), e.addRecvClbk("video_start", "audio", function(e) {
            t.isPlaying() && (t.pause(), t.pausedByVideo = vkNow())
        }), e.addRecvClbk("video_hide", "audio", function(e) {
            !t.isPlaying() && t.pausedByVideo && (vkNow() - t.pausedByVideo < 18e4 && t.play(), delete t.pausedByVideo)
        }), e.addRecvClbk("logged_off", "audio", function() {
            cur.loggingOff = !0, AudioPlayer.clearAllCacheKeys(), t.stop()
        }), e.addRecvClbk("stories_video_start", "audio", function() {
            t.isPlaying() && (t.pause(), t.pausedByStories = vkNow())
        }), e.addRecvClbk("stories_video_end", "audio", function() {
            !t.isPlaying() && t.pausedByStories && (vkNow() - t.pausedByStories < 18e4 && t.play(), delete t.pausedByStories)
        }))
    }, AudioPlayer.prototype.addPlaylist = function(e) {
        this.hasPlaylist(e.getId()) || this._playlists.push(e)
    }, AudioPlayer.prototype._cleanUpPlaylists = function() {
        for (var e = 0, t = -1, i = this._playlists.length - 1; i >= 0; i--) {
            if (!(d = this._playlists[i]).isReference() && (e += d.getAudiosCount()) > 4e3) {
                t = i;
                break
            }
        }
        if (-1 != t) {
            t += 1;
            var r = this._playlists.slice(0, t),
                n = this.getCurrentPlaylist(),
                o = [];
            for (i = 0; i < r.length; i++) {
                var a = r[i];
                if (n == a && (a = !1), a && !a.isReference())
                    for (var s = t; s < this._playlists.length; s++) {
                        var d;
                        (d = this._playlists[s]).isReference() && d.getSelf() == a && (a = !1)
                    }
                a && o.push(i)
            }
            for (i = 0; i < o.length; i++) {
                t = o[i];
                this._playlists.splice(t, 1)
            }
            o.length && debugLog("AudioPlayer - " + o.length + " playlists removed")
        }
    }, AudioPlayer.prototype.hasPlaylist = function(e, t, i) {
        var r;
        r = void 0 !== t && void 0 !== i ? e + "_" + t + "_" + i : e;
        for (var n = 0; n < this._playlists.length; n++) {
            var o = this._playlists[n];
            if (!o.isReference() && o.getId() == r) return o
        }
        return !1
    }, AudioPlayer.prototype.getPlaylist = function(e, t, i, r) {
        if (e && !t && !i) {
            var n = e.split("_");
            e = n[0], t = n[1], i = n[2]
        }
        var o = this.hasPlaylist(e, t, i);
        return o ? (o.mergeWith({
            accessHash: r
        }), o) : new AudioPlaylist({
            type: e,
            ownerId: t,
            albumId: i,
            hasMore: e != AudioPlaylist.TYPE_TEMP,
            accessHash: r
        })
    }, AudioPlayer.prototype.toggleRepeatCurrentAudio = function() {
        this._repeatCurrent = !this._repeatCurrent
    }, AudioPlayer.prototype.isRepeatCurrentAudio = function() {
        return !!this._repeatCurrent
    }, AudioPlayer.prototype.setNext = function(e, t, i) {
        if (vk && vk.widget && !vk.id && window.Widgets) return Widgets.oauth(), !1;
        if (!hasClass(e, "audio_row__added_next")) {
            addClass(e, "audio_row__added_next");
            var r = this.getCurrentPlaylist();
            if (r) {
                var n = AudioUtils.asObject(this.getCurrentAudio());
                if (n && t.fullId == n.fullId) return;
                var o = r.indexOfAudio(n);
                if (-1 == o) return;
                var a = r.indexOfAudio(t); - 1 != a ? r.moveAudio(a, o + 1) : r.addAudio(i, o + 1)
            } else {
                var s = AudioUtils.getContextPlaylist(e);
                this.play(i, s.playlist, s.context)
            }
            var d = window.AudioPage && currentAudioPage(e);
            if (d) {
                var u = d.getPageCurrentPlaylist();
                u && d.onUserAction(t, u)
            }
        }
    }, AudioPlayer.prototype._setTabIcon = function(e) {
        setFavIcon(AudioPlayer.tabIcons[e])
    }, AudioPlayer.prototype.on = function(e, t, i) {
        isArray(t) || (t = [t]), each(t, function(t, r) {
            this.subscribers.push({
                context: e,
                et: r,
                cb: i
            })
        }.bind(this))
    }, AudioPlayer.prototype.off = function(e) {
        this.subscribers = this.subscribers.filter(function(t) {
            return t.context != e
        })
    }, AudioPlayer.prototype.notify = function(e, t, i, r) {
        var n = this.getCurrentAudio(),
            o = AudioUtils.asObject(n);
        if (this._impl && (this.isAdPlaying() || !this._muteProgressEvents || !inArray(e, [AudioPlayer.EVENT_BUFFERED, AudioPlayer.EVENT_PROGRESS]))) switch (inArray(e, [AudioPlayer.EVENT_PLAY, AudioPlayer.EVENT_PAUSE]) && (this.subscribers = this.subscribers.filter(function(e) {
            return !(e.context instanceof Element) || bodyNode.contains(e.context)
        }), this.updateCurrentPlaying(!0)), each(this.subscribers || [], function(r, o) {
            o.et == e && o.cb(n, t, i)
        }), e) {
            case AudioPlayer.EVENT_VOLUME:
                this._lsSet(AudioPlayer.LS_VOLUME, this._userVolume);
                break;
            case AudioPlayer.EVENT_PLAY:
                this.saveStateCurrentPlaylist(), this._saveStateCurrentAudio(), this._setTabIcon("play"), this._sendStatusExport();
                break;
            case AudioPlayer.EVENT_PLAYLIST_CHANGED:
                this.saveStateCurrentPlaylist(), this._saveStateCurrentAudio();
                break;
            case AudioPlayer.EVENT_PROGRESS:
                if (AudioUtils.isPodcast(o)) t && this._podcastLog(o, t, r, "heartbeat");
                else if (!vk.widget && !this._adsIsAdPlaying()) {
                    var a = this.getCurrentPlaylist(),
                        s = this._impl.getCurrentProgress();
                    if (this._lsSet(AudioPlayer.LS_PROGRESS, s), this._trackListenedData(o, a, r, this._getPlayingContext()), this._allowPrefetchNext && s >= .8) {
                        var d = a.getNextAudio(n);
                        d && this._impl.isFullyLoaded() && (this._allowPrefetchNext = !1, this._prefetchAudio(d))
                    }
                }
                break;
            case AudioPlayer.EVENT_PAUSE:
                AudioUtils.isPodcast(o) && this._podcastLog(o, this.getCurrentProgress(), this._impl.getPlayedTime(), "pause"), this._setTabIcon("pause");
                break;
            case AudioPlayer.EVENT_SEEK:
                AudioUtils.isPodcast(o) && this._podcastLog(o, this.getCurrentProgress(), this._impl.getPlayedTime(), "seek");
                break;
            case AudioPlayer.EVENT_ENDED:
                AudioUtils.isPodcast(o) && this._podcastLog(o, this.getCurrentProgress(), this._impl.getPlayedTime(), "heartbeat")
        }
    }, AudioPlayer.prototype._trackListenedData = function(e, t, i, r) {
        var n = this;
        if (i = Math.round(i) || 0) {
            var o = {
                audio_id: AudioUtils.asObject(e).fullId,
                listened: i,
                context: r
            };
            "search" == r && t && (o.search_params = JSON.stringify(t.getSearchParams())), t && t.getType() == AudioPlaylist.TYPE_PLAYLIST && (o.playlist_id = t.getOwnerId() + "_" + t.getAlbumId() + (t.getAccessHash() ? "_" + t.getAccessHash() : "")), this._currentAudioListenData = o, clearTimeout(this._sendListenedTO), this._sendListenedTO = setTimeout(function() {
                n._sendListenedData()
            }, 1e4)
        }
    }, AudioPlayer.prototype._sendListenedData = function() {
        var e = this;
        clearTimeout(this._sendListenedTO);
        var t = this._currentAudioListenData;
        if (this._currentAudioListenData = !1, t && t.listened && this._listenedHash) {
            var i = extend({
                act: "listened_data",
                impl: this._impl.type,
                hash: this._listenedHash,
                v: 5,
                loc: nav.strLoc
            }, t);
            isArray(cur.audioLoadTimings) && (i.timings = cur.audioLoadTimings.join(","), cur.audioLoadTimings = []), ajax.post("al_audio.php", i, {
                onDone: function(t) {
                    e._adsConfig = t
                }
            })
        }
    }, AudioPlayer.prototype._sendPlayerErrorStats = function(e) {
        var t = AudioUtils.asObject(this.getCurrentAudio()).full_id,
            i = extend({
                audio: t,
                impl_type: e.type,
                progress: this.getCurrentProgress(),
                buffered: this.getCurrentBuffered()
            }, e.getErrorData());
        ajax.post("al_audio.php?act=player_error_stats", i)
    }, AudioPlayer.prototype.playLive = function(e, t) {
        var i = this.getPlaylist(AudioPlaylist.TYPE_LIVE, vk.id, data[0]);
        i.mergeWith({
            live: e,
            hasMore: !1
        }), e = i.getLiveInfo();
        var r = this;
        ajax.post("al_audio.php", {
            act: "a_play_audio_status",
            audio_id: e.audioId,
            host_id: e.hostId,
            hash: e.hash
        }, extend(t, {
            onDone: function(e, t, n) {
                i.mergeWith({
                    title: t.title,
                    list: [e]
                }), r.play(e, i, n)
            }
        }))
    }, AudioPlayer.prototype._sendStatusExport = function() {
        var e = this.getCurrentAudio();
        if (e) {
            e = AudioUtils.asObject(e);
            var t = this.statusSent ? this.statusSent.split(",") : [!1, 0],
                i = vkNow() - intval(t[1]);
            if (this.hasStatusExport() && !AudioUtils.isPodcast(e) && (e.id != t[0] || i > 3e5)) {
                var r = this.getCurrentPlaylist(),
                    n = r ? r.playbackParams : null;
                setTimeout(ajax.post.pbind("al_audio.php", {
                    act: "audio_status",
                    full_id: e.fullId,
                    hash: vk.statusExportHash,
                    top: intval(n && (n.top_audio || n.top))
                }), 0), this.statusSent = e.id + "," + vkNow()
            }
        }
    }, AudioPlayer.prototype.saveStateCurrentPlaylist = function() {
        if (!vk.widget) {
            var e = this.getCurrentPlaylist();
            if (e) {
                var t = e.serialize();
                this._lsSet(AudioPlayer.LS_PL, t)
            } else this._lsSet(AudioPlayer.LS_PL, null);
            this._lsSet(AudioPlayer.LS_SAVED, vkNow())
        }
    }, AudioPlayer.prototype._saveStateCurrentAudio = function() {
        if (!vk.widget) {
            var e = this.getCurrentAudio();
            if (e) {
                var t = clone(e);
                t[AudioUtils.AUDIO_ITEM_INDEX_URL] = "", this._lsSet(AudioPlayer.LS_TRACK, t), setCookie("remixcurr_audio", e[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + e[AudioUtils.AUDIO_ITEM_INDEX_ID], 1)
            } else this._lsSet(AudioPlayer.LS_TRACK, null), setCookie("remixcurr_audio", null, 1)
        }
    }, AudioPlayer.prototype.seekCurrentAudio = function(e) {
        if (this._adsIsAdPlaying()) return !1;
        var t = 10 / AudioUtils.asObject(this.getCurrentAudio()).duration,
            i = this.getCurrentProgress() + (e ? t : -t);
        i = Math.max(0, Math.min(1, i)), this.seek(i)
    }, AudioPlayer.prototype._lsGet = function(e) {
        return ls.get(AudioPlayer.LS_PREFIX + e)
    }, AudioPlayer.prototype._lsSet = function(e, t) {
        ls.set(AudioPlayer.LS_PREFIX + e, t)
    }, AudioPlayer.prototype.setVolume = function(e) {
        e = Math.min(1, Math.max(0, e)), this._userVolume = e, this._implSetVolume(e), this._adsUpdateVolume(), this.notify(AudioPlayer.EVENT_VOLUME, e)
    }, AudioPlayer.prototype.getVolume = function() {
        return void 0 === this._userVolume ? .8 : this._userVolume
    }, AudioPlayer.prototype.seek = function(e) {
        this._implSeekImmediate(e), this.notify(AudioPlayer.EVENT_SEEK)
    }, AudioPlayer.prototype._ensureHasURL = function(e, t) {
        var i = [];
        this._currentUrlEnsure = this._currentUrlEnsure || {};
        var r = AudioUtils.asObject(e);
        if (r.url) return t && t(e);
        var n = this.getCurrentPlaylist(),
            o = n.indexOfAudio(e);
        if (o >= 0)
            for (var a = o; a < o + 5; a++) {
                var s = AudioUtils.asObject(n.getAudioAt(a));
                !s || s.url || this._currentUrlEnsure[s.fullId] || (i.push(s.fullId + "_" + s.actionHash), this._currentUrlEnsure[s.fullId] = !0)
            }
        if (i.push(r.fullId), i.length) {
            var d = this;
            ajax.post("al_audio.php", {
                act: "reload_audio",
                ids: i.join(",")
            }, {
                onDone: function(i, n, o, a) {
                    getAudioPlayer().setStatusExportInfo(n), d._listenedHash = o, a && getAudioPlayer()._podcastSaveData(a), each(i, function(t, i) {
                        i = AudioUtils.asObject(i);
                        var n = {};
                        n[AudioUtils.AUDIO_ITEM_INDEX_URL] = i.url, n[AudioUtils.AUDIO_ITEM_INDEX_ADS] = i.ads, d.updateAudio(i.fullId, n), r.fullId == i.fullId && (e[AudioUtils.AUDIO_ITEM_INDEX_URL] = i.url, e[AudioUtils.AUDIO_ITEM_INDEX_ADS] = i.ads), d._currentAudio && AudioUtils.asObject(d._currentAudio).fullId == i.fullId && (d._currentAudio[AudioUtils.AUDIO_ITEM_INDEX_URL] = i.url, d._currentAudio[AudioUtils.AUDIO_ITEM_INDEX_ADS] = i.ads), delete d._currentUrlEnsure[i.fullId]
                    }), t && t(e)
                }
            })
        }
    }, AudioPlayer.prototype.toggleAudio = function(e, t) {
        if (vk && vk.widget && !vk.id && window.Widgets) return Widgets.oauth(), !1;
        if (domClosest("_audio_row__tt", t.target)) return cancelEvent(t);
        var i = domClosest("_audio_row", e),
            r = AudioUtils.getAudioFromEl(i, !0);
        if (window.getSelection && window.getSelection().rangeCount) {
            var n = window.getSelection().getRangeAt(0);
            if (n && n.startOffset != n.endOffset) return !1
        }
        if (t && hasClass(t.target, "mem_link")) return nav.go(attr(t.target, "href"), t, {
            navigateToUploader: !0
        }), cancelEvent(t);
        if (hasClass(t.target, "_audio_row__title_inner")) {
            if (AudioUtils.isPodcast(r)) return showPodcast(r.fullId), cancelEvent(t);
            if (r.lyrics && !r.isInAttach) return AudioUtils.toggleAudioLyrics(i, r), cancelEvent(t)
        }
        if (hasClass(t.target.parentNode, "audio_row__performers")) {
            if (checkEvent(t) || vk.widget) return !0;
            var o = domData(t.target, "performer");
            return !o || (AudioUtils.audioSearchPerformer(t.target, o, t), cancelEvent(t))
        }
        var a = cur.cancelClick || t && (hasClass(t.target, "audio_lyrics") || domClosest("_audio_duration_wrap", t.target) || domClosest("_audio_inline_player", t.target) || domClosest("audio_performer", t.target));
        if (cur._sliderMouseUpNowEl && cur._sliderMouseUpNowEl == geByClass1("audio_inline_player_progress", i) && (a = !0), delete cur.cancelClick, delete cur._sliderMouseUpNowEl, a) return !0;
        if (AudioUtils.isClaimedAudio(r) || r.isReplaceable) {
            var s = AudioUtils.getAudioExtra(r).claim;
            if (s) return void(hasClass(i, "no_actions") || r.isInEditBox || showAudioClaimWarning(r, s, AudioUtils.replaceWithOriginal.bind(AudioUtils, i, r)))
        }
        if (r.isPlaying) this.pause();
        else {
            var d = AudioUtils.getContextPlaylist(i);
            this.play(r.fullId, d.playlist, r.context || d.context), cur.audioPage && cur.audioPage.onUserAction(r, d.playlist)
        }
        AudioUtils.onRowOver(i, !1, !0)
    }, AudioPlayer.prototype._onFailedUrl = function(e) {
        this.notify(AudioPlayer.EVENT_FAILED), this.isPlaying() && (this.pause(), this.playNext(!0, !0))
    }, AudioPlayer.prototype._startAdsPlay = function(e, t, i, r) {
        function n() {
            var i = this._getPlayingContextSection();
            switch (e = AudioUtils.asObject(e), this._adsIsAllowed(e, t)) {
                case AudioPlayer.ADS_ALLOW_ALLOWED:
                    this._adsFetchAd(e, i, !1, function() {
                        r && r()
                    }.bind(this));
                    break;
                case AudioPlayer.ADS_ALLOW_DISABLED:
                    r && r();
                    break;
                case AudioPlayer.ADS_ALLOW_REJECT:
                    this._adsFetchAd(e, i, !0), r && r()
            }
        }
        this._startAdsTO && Object(_audioplayer_audioplayer_utils__WEBPACK_IMPORTED_MODULE_4__.clearWorkerTimeout)(this._startAdsTO), i ? this._startAdsTO = Object(_audioplayer_audioplayer_utils__WEBPACK_IMPORTED_MODULE_4__.setWorkerTimeout)(n.bind(this), 200) : n.call(this)
    }, AudioPlayer.prototype.playNextPlaylist = function(e, t, i) {
        var r = this,
            n = this.getPlaylist(AudioPlaylist.TYPE_PLAYLIST, e, t, i);
        n.loadAll(function() {
            r.getCurrentPlaylist().addAudio(n.getAudiosList())
        }), boxQueue && boxQueue.hideAll(), layers && layers.fullhide && layers.fullhide()
    }, AudioPlayer.prototype.playPlaylist = function(e, t, i, r, n) {
        if (vk && vk.widget && !vk.id && window.Widgets) return Widgets.oauth(), !1;
        var o = this.getCurrentPlaylist(),
            a = this.getPlaylist(AudioPlaylist.TYPE_PLAYLIST, e, t, i);
        if (o && o.getId() == a.getId() && this.isPlaying() && !n) this.pause();
        else {
            var s = function() {
                var e = a.getNextAudio(!1, !0);
                e && this.play(e, a, r)
            };
            a.loadAll(function() {
                n && (a.isShuffled() && a.shuffle(0), a.shuffle(irand(1, 999999), !0)), s.call(this)
            }.bind(this)), a.getAudiosCount() && !n && s.call(this)
        }
    }, AudioPlayer.prototype._initPlayingContext = function(e) {
        this._playingContext = e
    }, AudioPlayer.prototype._getPlayingContext = function() {
        return this._playingContext || ""
    }, AudioPlayer.prototype._getPlayingContextSection = function() {
        return this._getPlayingContext().split(":")[0]
    }, AudioPlayer.prototype.play = function(e, t, i, r, n) {
        if (!cur.loggingOff)
            if (this._impl) {
                this._cleanUpPlaylists(), (isObject(e) || isArray(e)) && (e = AudioUtils.asObject(e)) && (e = e.fullId);
                var o = AudioUtils.asObject(this._currentAudio),
                    a = this.getCurrentPlaylist();
                !e && o && (e = o.fullId);
                var s = !1,
                    d = e && o && e == o.fullId;
                t ? a && (s = t == a.getSelf() || t == a) : (t = a, s = !0), s || i || debugLog("New playlist play init without context"), i && this._initPlayingContext(i);
                var u = t.getAudio(e);
                u && t.load(t.indexOfAudio(u) + 3), d || (this._sendListenedData(), t.getType() == AudioPlaylist.TYPE_SEARCH && t.indexOfAudio(u) >= t.getLocalFoundCount() && t.sendSearchStats("search_play"), o && AudioUtils.isPodcast(o) && (this.isPlaying() && this._podcastLog(o, this.getCurrentProgress(), this._impl.getPlayedTime(), "pause"), this._podcasts.episodes[o.fullId] && delete this._podcasts.episodes[o.fullId].logListen)), d || this._adsIsAdPlaying() || this._adsDeinit(), d && s ? this._adsIsAdPlaying() ? this._adsResumeAd() : this.isPlaying() || (this._isPlaying = !0, this._sendLCNotification(), this.notify(AudioPlayer.EVENT_PLAY), d || this.notify(AudioPlayer.EVENT_PROGRESS, 0), this._implClearAllTasks(), this._implSetVolume(0), this._implSetUrl(u), this._implPlay(), this._updatePlaybackRate(), this._implSetVolume(this.getVolume(), !0), AudioUtils.isPodcast(u) && this._podcastLog(AudioUtils.asObject(u), this.getCurrentProgress(), this._impl.getPlayedTime(), "play")) : e && u && (this._currentAudio = u, s || (this._currentPlaylist && (this._prevPlaylist = this._currentPlaylist, this._prevAudio = this._currentAudio), this._currentPlaylist = new AudioPlaylist(t), this.notify(AudioPlayer.EVENT_PLAYLIST_CHANGED)), this.notify(AudioPlayer.EVENT_CURRENT_CHANGED), this._isPlaying = !0, this.updateCurrentPlaying(!0), this._adsIsAdPlaying() ? (this.notify(AudioPlayer.EVENT_PLAY, !0), this._adsResumeAd()) : (this._sendLCNotification(), this.notify(AudioPlayer.EVENT_PLAY, !0, intval(r), n), this.notify(AudioPlayer.EVENT_PROGRESS, 0), this._muteProgressEvents = !0, this._implClearAllTasks(), this._impl.preparePlay && this._impl.preparePlay(), n ? this._startAdsPlay(u, t, !1, function() {
                    (u = this.getCurrentAudio()) && this.isPlaying() && (this.notify(AudioPlayer.EVENT_UPDATE), this._implSetUrl(u), this._implPlay(), this._updatePlaybackRate(), this._implSetVolume(this.getVolume()), this._triggerTNSPixel())
                }.bind(this)) : (this._implSetVolume(0, !0), this._implPause(), this._startAdsPlay(u, t, !0, function() {
                    (u = this.getCurrentAudio()) && this.isPlaying() && (this.notify(AudioPlayer.EVENT_UPDATE), this._implSetUrl(u), this._implPlay(), this._updatePlaybackRate(), this._implSetVolume(this.getVolume()), this._triggerTNSPixel())
                }.bind(this)))))
            } else AudioUtils.showNeedFlashBox()
    }, AudioPlayer.prototype.preloadDefaultPlaylist = function(e) {
        browser.safari && !this._lsGet(AudioPlayer.LS_TRACK) && this.getPlaylist(AudioPlaylist.TYPE_PLAYLIST, vk.id, AudioPlaylist.DEFAULT_PLAYLIST_ID, e).load()
    }, AudioPlayer.prototype.instantPlay = function(e, t, i) {
        var r = !browser.safari && t && t.shiftKey;
        this.playPlaylist(vk.id, AudioPlaylist.DEFAULT_PLAYLIST_ID, i, "header", r), statlogsValueEvent("client_header_play_button", r ? "shuffle" : "play"), setTimeout(function() {
            addClass(e, "loading")
        }, 400)
    }, AudioPlayer.prototype._prefetchAudio = function(e) {
        (e = AudioUtils.asObject(e)) && e.url && this._impl.prefetch && this._impl.prefetch(e.url)
    }, AudioPlayer.prototype.getCurrentPlaylist = function() {
        return this._currentPlaylist
    }, AudioPlayer.prototype.getPlaylists = function() {
        return clone(this._playlists)
    }, AudioPlayer.prototype.pause = function() {
        this._adsIsAdPlaying() && this._adsPauseAd(), this._isPlaying = !1, this.notify(AudioPlayer.EVENT_PAUSE), this._implSetVolume(0, !0), this._implPause()
    }, AudioPlayer.prototype.stop = function() {
        this._isPlaying = !1, this._impl.stop(), this.notify(AudioPlayer.EVENT_STOP)
    }, AudioPlayer.prototype.isPlaying = function() {
        return this._isPlaying
    }, AudioPlayer.prototype.getCurrentAudio = function() {
        return this._currentAudio
    }, AudioPlayer.prototype.playNext = function(e, t) {
        this._playNext(1, e)
    }, AudioPlayer.prototype.playPrev = function() {
        this._playNext(-1)
    }, AudioPlayer.prototype._playNext = function(e, t) {
        if (!this._adsIsAdPlaying()) {
            var i = 10,
                r = this.getCurrentAudio(),
                n = this.getCurrentPlaylist();
            if (r && n)
                if (e > 0) {
                    for (var o = n.getNextAudio(r); i && o && AudioUtils.isClaimedAudio(o);) o = n.getNextAudio(o), i--;
                    o ? this.play(o, n, !1, 1, t) : n.isLive() ? (this._muteProgressEvents = !0, n.fetchNextLiveAudio(function(e) {
                        this.play(e, n, !1, 1, t)
                    }.bind(this))) : (o = n.getAudioAt(0), this.play(o, n, !1, 1, t))
                } else {
                    var a = n.indexOfAudio(this._currentAudio) - 1;
                    if (a < 0) this.seek(0);
                    else {
                        for (var s = n.getAudioAt(a); i && s && AudioUtils.isClaimedAudio(s);) s = n.getAudioAt(--a), i--;
                        this.play(s, n, !1, -1, t)
                    }
                }
        }
    }, AudioPlayer.prototype._adsPlayAd = function(e, t, i) {
        this._adman.onCompleted(function() {
            this._adsDeinit(!0), e ? this._adsSendAdEvent("statistics", t) : (this.notify(AudioPlayer.EVENT_PROGRESS, 0), this.notify(AudioPlayer.EVENT_AD_COMPLETED), delete this._adsPlaying, delete this._adsCurrentProgress, this._adsSendAdEvent("completed", t), setDocumentTitle(this._adsPrevTitle), i && i())
        }.bind(this)), this._adman.onStarted(function() {
            e || (this._isPlaying = !0, this.notify(AudioPlayer.EVENT_PROGRESS, 0), this.notify(AudioPlayer.EVENT_AD_STARTED), this._adsUpdateVolume(), this._adsSendAdEvent("started", t))
        }.bind(this));
        var r = [.25, .5, .75];
        if (this._adman.onTimeRemained(function(e) {
                this._adsCurrentProgress = e.percent / 100, this.notify(AudioPlayer.EVENT_PROGRESS, e.percent / 100, e.duration), each(r, function(e, i) {
                    if (this._adsCurrentProgress >= i) return r.shift(), this._adsSendAdEvent("progress_" + intval(100 * i), t), !1
                }.bind(this))
            }.bind(this)), this._adman.start(AudioPlayer.AD_TYPE), e) return i && i();
        this._adsPlaying = !0, this.notify(AudioPlayer.EVENT_PLAY), this.notify(AudioPlayer.EVENT_PROGRESS, 0), this._adsPrevTitle = document.title, setDocumentTitle(getLang("global_audio_ad"))
    }, AudioPlayer.prototype._adsUpdateVolume = function() {
        this._adman && this._adman.setVolume(.7 * this.getVolume())
    }, AudioPlayer.prototype._adsSendAdEvent = function(e, t) {
        this._adEvents = this._adEvents || [], this._adEvents.push(e + "/" + t), clearTimeout(this._adEventDelay), this._adEventDelay = setTimeout(function() {
            ajax.post("al_audio.php", {
                act: "ad_event",
                events: this._adEvents.join(","),
                v: this.getVersion(),
                abp: window.abp
            }), this._adEvents = []
        }.bind(this), 500)
    }, AudioPlayer.prototype.adsGetCurrentProgress = function() {
        return this._adsCurrentProgress || 0
    }, AudioPlayer.prototype._adsPauseAd = function() {
        this._adman && (this._isPlaying = !1, this._adman.pause(), this.notify(AudioPlayer.EVENT_PAUSE))
    }, AudioPlayer.prototype._adsResumeAd = function() {
        this._adman && (this._isPlaying = !0, this._adman.resume(), this.notify(AudioPlayer.EVENT_PLAY))
    }, AudioPlayer.prototype._adsIsAdPlaying = function() {
        return this._adsPlaying
    }, AudioPlayer.prototype.isAdPlaying = function() {
        return this._adsIsAdPlaying()
    }, AudioPlayer.prototype._adsDeinit = function(e) {
        this._adman = null, !e && this.notify(AudioPlayer.EVENT_AD_DEINITED)
    }, AudioPlayer.ADS_ALLOW_DISABLED = 1, AudioPlayer.ADS_ALLOW_ALLOWED = 2, AudioPlayer.ADS_ALLOW_REJECT = 3, AudioPlayer.prototype._adsIsAllowed = function(e, t) {
        if (vk.widget) return AudioPlayer.ADS_ALLOW_DISABLED;
        if (AudioUtils.isPodcast(e)) return AudioPlayer.ADS_ALLOW_DISABLED;
        if (cur.adsPreview) return AudioPlayer.ADS_ALLOW_ALLOWED;
        if (window.browser && window.browser.safari) return AudioPlayer.ADS_ALLOW_DISABLED;
        var i = this._adsConfig || vk.audioAdsConfig;
        return i ? i.enabled ? inArray(this._getPlayingContextSection(), i.sections) ? i.day_limit_reached ? AudioPlayer.ADS_ALLOW_REJECT : AudioPlayer.ADS_ALLOW_ALLOWED : AudioPlayer.ADS_ALLOW_REJECT : AudioPlayer.ADS_ALLOW_DISABLED : AudioPlayer.ADS_ALLOW_REJECT
    }, AudioPlayer.prototype._adsFetchAd = function(e, t, i, r) {
        this._loadAdman(function() {
            if (!window.AdmanHTML) return this._adsSendAdEvent("no_adman", t), r && r();
            var n = {
                my: 101,
                my_playlists: 101,
                audio_feed: 109,
                recent: 113,
                user_wall: 104,
                group_wall: 104,
                user_list: 102,
                group_list: 103,
                user_playlists: 102,
                group_playlists: 103,
                feed: 105,
                search: 110,
                global_search: 110,
                replies: 104,
                im: 106,
                group_status: 104,
                user_status: 104,
                recs: 107,
                recs_audio: 107,
                recs_album: 107,
                other: 114
            };
            this._adman = new AdmanHTML;
            var o = {
                _SITEID: 276,
                ver: 251116,
                vk_id: vk.id,
                duration: e.duration,
                content_id: function(e, t) {
                    for (var i = (e >>> 0).toString(16), r = t.toString(16); r.length < 8;) r = "0" + r;
                    return i + r
                }(e.ownerId, e.id),
                vk_catid: n[t] || n.other
            };
            extend(o, e.ads || {}), nav.objLoc.preview && (o.preview = intval(nav.objLoc.preview)), cur.adsPreview && (o.preview = 1), this._adman.setDebug(!!o.preview), this._adman.onError(function() {
                r && r()
            }), this._adman.onReady(function() {
                if (this._adman) {
                    var e = this._adman.getBannersForSection(AudioPlayer.AD_TYPE);
                    e && e.length ? "statistics" == e[0].type ? (this._adsPlayAd(!0, t), r && r()) : (this._adsSendAdEvent("received", t), i ? (this._adsSendAdEvent("rejected", t), this._adsDeinit(), r && r()) : (this._adsSendAdEvent("ready", t), this.notify(AudioPlayer.EVENT_AD_READY), this._adsPlayAd(!1, t, r))) : (i || this._adsSendAdEvent("not_received", t), r && r())
                }
            }.bind(this)), this._adman.init({
                slot: 3514,
                wrapper: se("<div></div>"),
                params: o,
                browser: {
                    adBlock: !!window.abp,
                    mobile: !1
                }
            }), this._adsSendAdEvent("requested", t)
        }.bind(this))
    }, AudioPlayer.prototype._loadAdman = function(e) {
        if (this._admadLoaded) return e && e();
        loadScript("//ad.mail.ru/static/admanhtml/rbadman-html5.min.js", {
            onLoad: function() {
                this._admadLoaded = !0, e && e()
            }.bind(this),
            onError: function() {
                this._admadLoaded = !0, e && e()
            }.bind(this)
        })
    }, AudioPlayer.prototype._podcastLog = function(e, t, i, r) {
        var n = this._podcastGetStates(),
            o = Math.round(e.duration * t);
        n[e.fullId] = {
            t: vkNow(),
            position: o
        }, this._podcastSetStates(n), this._podcasts.episodes[e.fullId] || (this._podcasts.episodes[e.fullId] = {}), this._podcasts.episodes[e.fullId].listen = i, this._podcasts.episodes[e.fullId].logAction = r, this._podcasts.updated = this._podcasts.updated || {}, this._podcasts.updated[e.fullId] = !0, this._podcastLogParts(e, o, r), this._listenedHash && ("heartbeat" !== r ? this._podcastSendLog() : this._podcasts._sendTimer || (this._podcasts._sendTimer = setTimeout(this._podcastSendLog.bind(this), 5e3)))
    }, AudioPlayer.prototype._podcastLogParts = function(e, t, i) {
        var r = "play" === i || "seek" === i;
        if (r || !(this._podcasts._logFrom > t)) {
            var n = e.duration / AudioUtils.AUDIO_PODCAST_PART_COUNT,
                o = t / n,
                a = Math.floor(o),
                s = o - a;
            if (this._podcasts._logFrom && !r) {
                this._podcasts.episodes[e.fullId] = this._podcasts.episodes[e.fullId] || {}, this._podcasts.episodes[e.fullId].partsProcessed = this._podcasts.episodes[e.fullId].partsProcessed || {}, this._podcasts.episodes[e.fullId].parts = this._podcasts.episodes[e.fullId].parts || {};
                for (var d = Math.floor(this._podcasts._logFrom / n); d <= a; d++)
                    if (this._podcasts._logFrom = d * n, !this._podcasts.episodes[e.fullId].partsProcessed[d]) {
                        if (!((a > d || a === AudioUtils.AUDIO_PODCAST_PART_COUNT ? 1 : s) >= AudioUtils.AUDIO_PODCAST_PART_LISTEN)) break;
                        this._podcasts.episodes[e.fullId].partsProcessed[d] = this._podcasts.episodes[e.fullId].parts[d] = !0
                    }
            } else this._podcasts._logFrom = (s > AudioUtils.AUDIO_PODCAST_PART_LISTEN ? a + 1 : a) * n
        }
    }, AudioPlayer.prototype._podcastSendLog = function() {
        var e = this;
        this._podcasts._sendTimer && (clearTimeout(this._podcasts._sendTimer), delete this._podcasts._sendTimer);
        var t = [];
        each(this._podcasts.updated, function(i) {
            e._podcasts.episodes[i] || (e._podcasts.episodes[i] = {});
            var r = e._podcasts.episodes[i],
                n = e._podcastGetStates(),
                o = Math.round(r.listen || 0),
                a = r.logListen || 0,
                s = r.logAction || "heartbeat",
                d = Object.keys(r.parts || {});
            n[i] && (t.push([i, n[i].position, Math.max(0, o - a), d.join(","), e.podcastGetPlaybackRate(), s, cur.module].join(":")), r.listen = 0, r.logListen = o, r.parts = {}, delete r.logAction)
        }), ajax.post("al_podcasts.php", {
            act: "a_states",
            hash: this._listenedHash,
            data: t.join("|")
        }, {
            onFail: function() {
                return !0
            }
        }), this._podcasts.updated = {}
    }, AudioPlayer.prototype._podcastCleanStates = function() {
        var e = this._podcastGetStates(),
            t = !1;
        return each(e, function(i, r) {
            Date.now() - r.t > 2419200 && (delete e[i], t = !0)
        }), t && this._podcastSetStates(e), e
    }, AudioPlayer.prototype._podcastSaveData = function(e) {
        var t = this._podcastGetStates();
        each(e, function(e, i) {
            var r = i.state;
            if (r) {
                var n = +r[1];
                (!t[e] || !t[e][1] || n && n > t[e][1]) && (t[e] = {
                    position: +r[0],
                    t: Date.now()
                })
            }
        }), this._podcastSetStates(t)
    }, AudioPlayer.prototype._podcastRestoreState = function() {
        var e = AudioUtils.asObject(this.getCurrentAudio());
        if (!AudioUtils.isPodcast(e)) return 0;
        var t = ((this._podcastGetStates()[e.fullId] || {}).position || 0) / e.duration;
        return t && t < 1 ? (this._implSeek(t), this.updateCurrentPlaying(), t) : 0
    }, AudioPlayer.prototype.getCurrentFaveStatus = function() {
        return !!AudioUtils.isPodcast(this._currentAudio) && AudioUtils.getAudioExtra(this._currentAudio).fave
    }, AudioPlayer.prototype._podcastGetStates = function() {
        return (this._lsGet(AudioPlayer.LS_PODCASTS) || {}).states || {}
    }, AudioPlayer.prototype._podcastSetStates = function(e) {
        var t = this._lsGet(AudioPlayer.LS_PODCASTS) || {};
        t.states = e, this._lsSet(AudioPlayer.LS_PODCASTS, t)
    }, AudioPlayer.prototype.podcastToggleFave = function(e, t) {
        if (t) {
            t = AudioUtils.asObject(t);
            var i = AudioUtils.getAudioExtra(t).faveHash;
            i && bookmarkPodcast(e, t.fullId, i)
        }
    }, AudioPlayer.prototype._updatePlaybackRate = function() {
        var e = this;
        this._implNewTask("playback_rate", function(t) {
            var i = !e._adsIsAdPlaying() && AudioUtils.isPodcast(e._currentAudio) ? e.podcastGetPlaybackRate() : 1;
            e._impl.setPlaybackRate(i), t()
        })
    }, AudioPlayer.prototype.podcastGetPlaybackRate = function() {
        return (this._lsGet(AudioPlayer.LS_PODCASTS) || {}).rate || 1
    }, AudioPlayer.prototype.podcastChangePlaybackRate = function(e) {
        var t = this._lsGet(AudioPlayer.LS_PODCASTS) || {},
            i = t.rate || 1;
        e ? i -= AudioPlayer.PLAYBACK_RATE_STEP : i += AudioPlayer.PLAYBACK_RATE_STEP, !e && i > AudioPlayer.PLAYBACK_RATE_MAX ? i = 1 : e && i < 1 && (i = AudioPlayer.PLAYBACK_RATE_MAX), t.rate = i, this._lsSet(AudioPlayer.LS_PODCASTS, t), this._updatePlaybackRate()
    }, AudioPlayer.prototype.playAudio = function(e) {
        var t = new AudioPlaylist(AudioPlaylist.TYPE_TEMP);
        t.mergeWith({
            list: [e]
        }), this.play(e, t)
    }, window.AudioPlayerFlash = function(e) {
        this.opts = e || {}, window._flashAudioInstance = this
    }, AudioPlayerFlash.onAudioFinishCallback = function() {
        var e = window._flashAudioInstance;
        e.opts.onEnd && e.opts.onEnd()
    }, AudioPlayerFlash.onAudioProgressCallback = function(e, t) {
        var i = window._flashAudioInstance;
        t && (i._total = t, i._currProgress = e / t, i.opts.onProgressUpdate && i.opts.onProgressUpdate(i._currProgress, e))
    }, AudioPlayerFlash.onAudioLoadProgressCallback = function(e, t) {
        var i = window._flashAudioInstance;
        i._currBuffered = e / t, i.opts.onBufferUpdate && i.opts.onBufferUpdate(i._currBuffered)
    }, AudioPlayerFlash.prototype.fadeVolume = function(e, t) {
        return this.setVolume(e), t()
    }, AudioPlayerFlash.prototype._stopFrequencyAnalise = function() {
        this._stopFrequencyAnaliseCallback && this._stopFrequencyAnaliseCallback(), delete this._stopFrequencyAnaliseCallback, clearInterval(this._freqUpdateInterval), this.opts.onFrequency([0, 0, 0, 0])
    }, AudioPlayerFlash.prototype._startFrequencyAnalise = function() {
        var e = this;

        function t(e, t, i, r) {
            return (i - t) * e / r + t
        }

        function i(e, t) {
            return Math.random() * (t - e) + e
        }
        this._stopFrequencyAnalise();
        var r = 999,
            n = null,
            o = null;
        this._freqUpdateInterval = setInterval(function() {
            var a;
            ++r > 3 && (r = 0, n = o, o = [i(.7, 1), i(.55, .8), i(.3, .55), i(.03, .45)], n || (n = [i(.7, 1), i(.55, .8), i(.3, .55), i(.03, .45)])), a = [t(r, n[0], o[0], 3), t(r, n[1], o[1], 3), t(r, n[2], o[2], 3), t(r, n[3], o[3], 3)], e.opts.onFrequency(a)
        }, 50)
    }, AudioPlayerFlash.prototype.type = "flash", AudioPlayerFlash.PLAYER_EL_ID = "flash_audio", AudioPlayerFlash.prototype.destroy = function() {
        re(AudioPlayerFlash.PLAYER_EL_ID)
    }, AudioPlayerFlash.prototype.onReady = function(e) {
        if (this._player) return e(!0);
        if (!1 === this._player) return e(!1);
        this._onReady = e;
        ge(AudioPlayerFlash.PLAYER_EL_ID) || document.body.appendChild(ce("div", {
            id: AudioPlayerFlash.PLAYER_EL_ID,
            className: "fixed"
        }));
        var t = this;
        renderFlash(AudioPlayerFlash.PLAYER_EL_ID, {
            url: "/swf/audio_lite.swf",
            id: "player",
            height: 2
        }, {
            swliveconnect: "true",
            allowscriptaccess: "always",
            wmode: "opaque"
        }, {
            onPlayFinish: "AudioPlayerFlash.onAudioFinishCallback",
            onLoadProgress: "AudioPlayerFlash.onAudioLoadProgressCallback",
            onPlayProgress: "AudioPlayerFlash.onAudioProgressCallback"
        }) && setTimeout(function() {
            t._checkFlashLoaded()
        }, 50)
    }, AudioPlayerFlash.prototype.setUrl = function(e, t) {
        var i = Object(_audioplayer_audio_unmask_source__WEBPACK_IMPORTED_MODULE_0__.audioUnmaskSource)(e);
        this._url != i ? (this._url = i, this._player && this._player.loadAudio(i), t && t(!0)) : t && t(!0)
    }, AudioPlayerFlash.prototype.setVolume = function(e) {
        this._player && this._player.setVolume && this._player.setVolume(e)
    }, AudioPlayerFlash.prototype.setPlaybackRate = function() {
        return !1
    }, AudioPlayerFlash.prototype.play = function() {
        this._player && this._player.playAudio(), this._startFrequencyAnalise()
    }, AudioPlayerFlash.prototype.seek = function(e) {
        var t = (this._total || 0) * e;
        this._player && this._player.playAudio(t)
    }, AudioPlayerFlash.prototype.pause = function() {
        this._player && this._player.pauseAudio(), this._stopFrequencyAnalise()
    }, AudioPlayerFlash.prototype.isFullyLoaded = function() {
        return !1
    }, AudioPlayerFlash.prototype.getPlayedTime = function() {
        return 0
    }, AudioPlayerFlash.prototype.getCurrentProgress = function() {
        return this._currProgress || 0
    }, AudioPlayerFlash.prototype.getCurrentBuffered = function() {
        return this._currBuffered || 0
    }, AudioPlayerFlash.prototype.stop = function() {
        this._player && this._player.stopAudio(), this._stopFrequencyAnalise()
    }, AudioPlayerFlash.prototype._checkFlashLoaded = function() {
        var e = ge("player");
        if (this._checks = this._checks || 0, this._checks++, AudioUtils.debugLog("Flash element check", this._checks), this._checks > 10) return AudioUtils.debugLog("No Flash element found after some amount of checks"), this._player = !1, this._onReady && this._onReady(!1);
        if (e && e.paused) AudioUtils.debugLog("Flash element found"), this._player = e, this._onReady && this._onReady(!0), this._onReady = null;
        else {
            var t = this;
            setTimeout(function() {
                t._checkFlashLoaded()
            }, 100)
        }
    }, AudioPlayerFlash.prototype.getErrorData = function() {
        return {
            url: this._url
        }
    }, window.AudioPlayerHTML5WebAudio = function(e) {
        this._opts = e, window.console && console.log("init audio context", window._audioContextData);
        var t = [];
        try {
            var i = window._audioContextData;
            i ? (t.push(1), this._context = i.context, this._audio = i.audio, this._analyser = i.analyzer, this._gainNode = i.gainNode, t.push(2), this._context.suspend(), t.push(3), this._toggleContext(!1)) : (window._audioContextData = !0, t.push(4), this._audio = new Audio, this._audio.crossOrigin = "anonymous", "AudioContext" in window ? this._context = new AudioContext : "webkitAudioContext" in window && (this._context = new webkitAudioContext), t.push(5), this._context.suspend(), t.push(6), this._toggleContext(!1), t.push(7), this._analyser = this._context.createAnalyser(), this._gainNode = this._context.createGain(), t.push(8), this._analyser.connect(this._gainNode), this._gainNode.connect(this._context.destination), t.push(9), window._audioContextData = {
                context: this._context,
                audio: this._audio,
                analyzer: this._analyser,
                gainNode: this._gainNode
            })
        } catch (e) {
            this.failed = !0, t = t.join(",");
            var r = "undefined" != typeof navigator ? navigator.userAgent : "";
            ajax.post("al_audio.php", {
                act: "webaudio_log",
                log: t,
                e: e.toString(),
                ua: r,
                v: 2,
                nav: nav.strLoc
            })
        }
        cur._audioVer = 1, this.type = "html5webapi"
    }, AudioPlayerHTML5WebAudio.isSupported = function() {
        return !1
    }, AudioPlayerHTML5WebAudio.VOLUME_FADE_DURATION = 300, AudioPlayerHTML5WebAudio.prototype._toggleContext = function(e) {
        var t = this;
        Object(_audioplayer_audioplayer_utils__WEBPACK_IMPORTED_MODULE_4__.clearWorkerTimeout)(this._toggleContextTO), e && "running" == this._context.state || (e || "suspended" != this._context.state) && (e ? this._context.resume() : this._toggleContextTO = Object(_audioplayer_audioplayer_utils__WEBPACK_IMPORTED_MODULE_4__.setWorkerTimeout)(function() {
            t._context.suspend()
        }, 1e3))
    }, AudioPlayerHTML5WebAudio.prototype.setUrl = function(e, t) {
        var i = this;
        this._createAudioNode(e, function() {
            var e = i._seekOnReady;
            delete i._seekOnReady, e && i.seek(e)
        }), t && t(!0)
    }, AudioPlayerHTML5WebAudio.prototype.getCurrentProgress = function() {
        var e = this._audio;
        return isNaN(e.duration) ? 0 : Math.max(0, Math.min(1, e.currentTime / e.duration))
    }, AudioPlayerHTML5WebAudio.prototype.getPlayedTime = function() {
        for (var e = this._audio.played, t = 0, i = 0; i < e.length; i++) t += e.end(i) - e.start(i);
        return t
    }, AudioPlayerHTML5WebAudio.prototype.getCurrentBuffered = function() {
        return this._audio.buffered.length ? Math.min(1, this._audio.buffered.end(0) / this._audio.duration) : 0
    }, AudioPlayerHTML5WebAudio.prototype.onReady = function(e) {
        return e && e(!0)
    }, AudioPlayerHTML5WebAudio.prototype.setVolume = function(e) {
        this._gainNode.gain.linearRampToValueAtTime(e, this._context.currentTime + .01)
    }, AudioPlayerHTML5WebAudio.prototype.setPlaybackRate = function(e) {
        this._audio.playbackRate = e
    }, AudioPlayerHTML5WebAudio.prototype.fadeVolume = function(e, t) {
        this._toggleContext(!0), this._gainNode.gain.linearRampToValueAtTime(e, this._context.currentTime + AudioPlayerHTML5WebAudio.VOLUME_FADE_DURATION / 1e3), Object(_audioplayer_audioplayer_utils__WEBPACK_IMPORTED_MODULE_4__.clearWorkerTimeout)(this._fadeTO), this._fadeTO = Object(_audioplayer_audioplayer_utils__WEBPACK_IMPORTED_MODULE_4__.setWorkerTimeout)(function() {
            t(!0)
        }, AudioPlayerHTML5WebAudio.VOLUME_FADE_DURATION + 50)
    }, AudioPlayerHTML5WebAudio.prototype.isFullyLoaded = function() {
        return !!this._audio._fullyLoaded
    }, AudioPlayerHTML5WebAudio.prototype.seek = function(e) {
        var t = this._audio;
        isNaN(t.duration) ? this._seekOnReady = e : t.currentTime = t.duration * e
    }, AudioPlayerHTML5WebAudio.prototype.pause = function() {
        this._audio.pause(), this._toggleContext(!1)
    }, AudioPlayerHTML5WebAudio.prototype.stop = function() {
        this.pause()
    }, AudioPlayerHTML5WebAudio.prototype.play = function(e) {
        var t = this;
        this._toggleContext(!0);
        var i = this._audio;

        function r(e) {
            isUndefined(e) || e.catch(function(e) {
                e.code != e.ABORT_ERR && Object(_audioplayer_audioplayer_utils__WEBPACK_IMPORTED_MODULE_4__.setWorkerTimeout)(function() {
                    triggerEvent(i, "error", !1, !0)
                }, 500)
            })
        }
        this._audio.src != e ? this._createAudioNode(e, function() {
            r(i.play()), t._startFreqAnalyse()
        }) : this._audio._canPlay ? (r(i.play()), this._startFreqAnalyse()) : (this._audio.onCanPlays = this._audio.onCanPlays || [], this._audio.onCanPlays.push(function() {
            r(i.play()), t._startFreqAnalyse()
        }))
    }, AudioPlayerHTML5WebAudio.prototype._createAudioNode = function(e, t) {
        var i = this;
        if (this._audio && this._audio.src == e) return this._audio._canPlay ? t && t() : (this._audio.onCanPlays = this._audio.onCanPlays || [], void this._audio.onCanPlays.push(t));
        this._source && this._source.disconnect(), this._audio = new Audio, this._audio.crossOrigin = "anonymous", this._audio.onCanPlays = [t], this._source = this._context.createMediaElementSource(this._audio), this._source.connect(this._analyser), this._audio.src = e, this._audio.addEventListener("canplay", function() {
            if (!i._audio._canPlay) {
                i._audio._canPlay = !0, i._opts.onCanPlay && i._opts.onCanPlay();
                var e = i._audio.onCanPlays;
                each(e, function(e, t) {
                    t && t()
                })
            }
        }), this._audio.addEventListener("timeupdate", function() {
            i._opts.onProgressUpdate && i._opts.onProgressUpdate(i.getCurrentProgress(), i.getPlayedTime())
        }), this._audio.addEventListener("progress", function() {
            i._opts.onBufferUpdate && i._opts.onBufferUpdate(i.getCurrentBuffered());
            var e = i._audio.buffered;
            1 == e.length && 0 == e.start(0) && e.end(0) == i._audio.duration && (i._audio._fullyLoaded = !0)
        }), this._audio.addEventListener("ended", function() {
            i._opts.onEnd && i._opts.onEnd()
        }), this._audio.addEventListener("seeked", function() {
            i._opts.onSeeked && i._opts.onSeeked()
        }), this._audio.addEventListener("seeking", function() {
            i._opts.onSeek && i._opts.onSeek()
        }), this._audio.addEventListener("error", function() {
            i._opts.onFail && i._opts.onFail()
        })
    }, AudioPlayerHTML5WebAudio.prototype._startFreqAnalyse = function() {
        var e = this;
        this._stopFreqAnalyse();
        var t = new Uint8Array(this._analyser.frequencyBinCount);
        this._freqUpdateInterval = setInterval(function() {
            e._analyser.getByteFrequencyData(t);
            var i = t.length,
                r = [Math.min(255, 1.2 * t[Math.round(.05 * i)]) / 255, Math.min(255, 1.2 * t[Math.round(.15 * i)]) / 255, Math.min(255, 1.3 * t[Math.round(.3 * i)]) / 255, Math.min(255, 1.4 * t[Math.round(.55 * i)]) / 255];
            e._opts.onFrequency && e._opts.onFrequency(r)
        }, 50)
    }, AudioPlayerHTML5WebAudio.prototype._stopFreqAnalyse = function() {
        clearInterval(this._freqUpdateInterval)
    }, AudioPlayerHTML5WebAudio.prototype.destroy = function() {
        this._stopFreqAnalyse()
    }, AudioPlayerHTML5WebAudio.prototype.prefetch = function(e) {
        (new Audio).src = e
    }, window.AudioPlayerHTML5Simple = function(e) {
        this.opts = e || {}, this._audioEl = this._createAudioNode(), this.type = "html5simple"
    }, AudioPlayerHTML5Simple.prototype.setUrl = function(e, t) {
        return t && t(!0)
    }, AudioPlayerHTML5Simple.prototype.onReady = function(e) {
        return e(!0)
    }, AudioPlayerHTML5Simple.prototype.seek = function(e) {
        var t = this._audioEl;
        isFinite(t.duration) ? setTimeout(function() {
            t.currentTime = t.duration * e
        }, 10) : this._seekOnReady = e
    }, AudioPlayerHTML5Simple.prototype.isFullyLoaded = function() {
        return !1
    }, AudioPlayerHTML5Simple.prototype.getPlayedTime = function() {
        for (var e = this._audioEl.played, t = 0, i = 0; i < e.length; i++) t += e.end(i) - e.start(i);
        return t
    }, AudioPlayerHTML5Simple.prototype.setVolume = function(e) {
        void 0 === e && (e = this._audioEl.volume), this._audioEl.volume = e, this._volume = e
    }, AudioPlayerHTML5Simple.prototype.setPlaybackRate = function(e) {
        this._audioEl.playbackRate = e
    }, AudioPlayerHTML5Simple.prototype.fadeVolume = function(e, t) {
        this.setVolume(e), t && t()
    }, AudioPlayerHTML5Simple.prototype.getCurrentProgress = function() {
        var e = this._audioEl;
        return isNaN(e.duration) ? 0 : Math.max(0, Math.min(1, e.currentTime / e.duration))
    }, AudioPlayerHTML5Simple.prototype._stopFrequencyAnalise = function() {
        clearInterval(this._freqUpdateInterval), this.opts.onFrequency([0, 0, 0, 0])
    }, AudioPlayerHTML5Simple.prototype._startFrequencyAnalise = function() {
        var e = this;

        function t(e, t, i, r) {
            return (i - t) * e / r + t
        }

        function i(e, t) {
            return Math.random() * (t - e) + e
        }
        this._stopFrequencyAnalise();
        var r = 999,
            n = null,
            o = null;
        this._freqUpdateInterval = setInterval(function() {
            var a = void 0;
            e._audioEl.paused || !data(e._audioEl, "canplay") ? a = [0, 0, 0, 0] : (++r > 3 && (r = 0, n = o, o = [i(.7, 1), i(.55, .8), i(.3, .55), i(.03, .45)], n || (n = [i(.7, 1), i(.55, .8), i(.3, .55), i(.03, .45)])), a = [t(r, n[0], o[0], 3), t(r, n[1], o[1], 3), t(r, n[2], o[2], 3), t(r, n[3], o[3], 3)]), e.opts.onFrequency(a)
        }, 50)
    }, AudioPlayerHTML5Simple.prototype.getCurrentBuffered = function() {
        var e = this._audioEl;
        return e && e.buffered.length ? Math.min(1, e.buffered.end(0) / e.duration) : 0
    }, AudioPlayerHTML5Simple.prototype.play = function(e) {
        var t = Object(_audioplayer_audio_unmask_source__WEBPACK_IMPORTED_MODULE_0__.audioUnmaskSource)(e);
        this._audioEl.src != t && (this._audioEl.src = t);
        var i = this._audioEl.play();
        i && i.catch(function(e) {
            console.log(e)
        }), this._startFrequencyAnalise()
    }, AudioPlayerHTML5Simple.prototype.preparePlay = function() {
        var e = this._audioEl.play();
        e && e.catch(function(e) {
            console.log(e)
        })
    }, AudioPlayerHTML5Simple.prototype.pause = function() {
        if (this._audioEl.paused) return !0;
        var e = this._audioEl.pause();
        e && e.catch(function(e) {
            console.log(e)
        })
    }, AudioPlayerHTML5Simple.prototype.stop = function() {
        this._audioEl.pause(), this._audioEl.src = ""
    }, AudioPlayerHTML5Simple.prototype._createAudioNode = function() {
        var e = this,
            t = new Audio,
            i = this;
        return this.opts.onBufferUpdate && addEvent(t, "progress", function() {
            i.opts.onBufferUpdate(i.getCurrentBuffered());
            var e = t.buffered;
            1 == e.length && 0 == e.start(0) && e.end(0) == t.duration && (t._fullyLoaded = !0)
        }), this.opts.onProgressUpdate && addEvent(t, "timeupdate", function() {
            this.opts.onProgressUpdate(this.getCurrentProgress(), this.getPlayedTime())
        }.bind(this)), this.opts.onEnd && addEvent(t, "ended", function() {
            i.opts.onEnd()
        }), this.opts.onSeeked && addEvent(t, "seeked", function() {
            i.opts.onSeeked()
        }), this.opts.onSeek && addEvent(t, "seeking", function() {
            i.opts.onSeek()
        }), t.addEventListener("error", function(e) {
            AudioUtils.debugLog("HTML5 error track loading"), i.opts.onFail && i.opts.onFail()
        }), t.addEventListener("canplay", function() {
            i.opts.onCanPlay && i.opts.onCanPlay(), data(t, "canplay", !0)
        }), t.addEventListener("durationchange", function() {
            e._audioEl === t && e._seekOnReady && isFinite(t.duration) && (e.seek(e._seekOnReady), e._seekOnReady = !1)
        }), t.crossOrigin = "anonymous", t
    }, window.AudioPlayerHTML5 = function(e) {
        this.opts = e || {}, this._audioNodes = [], this._currentAudioEl = this._createAudioNode(), this._prefetchAudioEl = this._createAudioNode()
    }, AudioPlayerHTML5.AUDIO_EL_ID = "ap_audio", AudioPlayerHTML5.STATE_HAVE_NOTHING = 0, AudioPlayerHTML5.STATE_HAVE_FUTURE_DATA = 3, AudioPlayerHTML5.HAVE_ENOUGH_DATA = 4, AudioPlayerHTML5.SILENCE = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=", AudioPlayerHTML5.isSupported = function() {
        var e = "undefined" != typeof navigator ? navigator.userAgent : "";
        if (/(Windows NT 5.1|Windows XP)/.test(e) && (browser.vivaldi || browser.opera || browser.mozilla)) return AudioUtils.debugLog("Force no HTML5 (xp vivaldi / opera / mozilla)"), !1;
        if (/(Windows 7|Windows NT 6.1)/.test(e) && (browser.vivaldi || browser.opera)) return AudioUtils.debugLog("Force no HTML5 (win7 vivaldi / opera)"), !1;
        var t = document.createElement("audio");
        if (t.canPlayType) {
            var i = t.canPlayType('audio/mpeg; codecs="mp3"'),
                r = !!i.replace(/no/, "");
            return AudioUtils.debugLog("HTML5 browser support " + (r ? "yes" : "no"), i, e), r
        }
        return AudioUtils.debugLog("audio.canPlayType is not available", e), !1
    }, AudioPlayerHTML5.prototype.type = "html5", AudioPlayerHTML5.prototype.destroy = function() {}, AudioPlayerHTML5.prototype.getPlayedTime = function() {
        for (var e = this._currentAudioEl.played, t = 0, i = 0; i < e.length; i++) t += e.end(i) - e.start(i);
        return t
    }, AudioPlayerHTML5.prototype._setAudioNodeUrl = function(e, t) {
        var i = Object(_audioplayer_audio_unmask_source__WEBPACK_IMPORTED_MODULE_0__.audioUnmaskSource)(t);
        data(e, "setUrlTime", i == AudioPlayerHTML5.SILENCE ? 0 : vkNow()), this._currentHls && e === this._currentAudioEl && (this._currentHls.destroy(), this._currentHls = null), this._isHlsUrl(i) ? this._initHls(e, i) : e.src = i
    }, AudioPlayerHTML5.prototype._isHlsUrl = function(e) {
        return /\.m3u8/.test(Object(_audioplayer_audio_unmask_source__WEBPACK_IMPORTED_MODULE_0__.audioUnmaskSource)(e))
    }, AudioPlayerHTML5.prototype._initHls = function(e, t) {
        var i = this;
        if (window.Hls) {
            var r = new Hls({
                debug: !!ls.get("audio_hls_debug"),
                maxBufferHole: 3,
                nudgeOffset: .5,
                nudgeMaxRetry: 5
            });
            r.attachMedia(e), r.loadSource(t), this._currentHls = r, this._hlsError = null, r.on(Hls.Events.ERROR, function(e, t) {
                t.fatal && (console.log("audio hls error", e, t), i._hlsError = {
                    type: t.type,
                    details: t.details,
                    url: t.frag && t.frag.url || t.context && t.context.url,
                    code: t.networkDetails ? t.networkDetails.status : 0
                }, i.opts.onFail && i.opts.onFail())
            });
            var n = getAudioPlayer();
            n.isPlaying() && !n.isAdPlaying() && this.play(t)
        } else stManager.add("hls.min.js", function() {
            i._currentAudioEl === e && i._initHls(e, t)
        })
    }, AudioPlayerHTML5.prototype._createAudioNode = function(e) {
        var t = this,
            i = new Audio,
            r = this;
        return this.opts.onBufferUpdate && addEvent(i, "progress", function() {
            r._currentAudioEl == i && r.opts.onBufferUpdate(r.getCurrentBuffered());
            var e = i.buffered;
            1 == e.length && 0 == e.start(0) && e.end(0) == i.duration && (i._fullyLoaded = !0)
        }), this.opts.onProgressUpdate && addEvent(i, "timeupdate", function() {
            this._currentAudioEl == i && this.opts.onProgressUpdate(this.getCurrentProgress(), this.getPlayedTime())
        }.bind(this)), this.opts.onEnd && addEvent(i, "ended", function() {
            r._currentAudioEl == i && r.opts.onEnd()
        }), this.opts.onSeeked && addEvent(i, "seeked", function() {
            r._currentAudioEl == i && r.opts.onSeeked()
        }), this.opts.onSeek && addEvent(i, "seeking", function() {
            r._currentAudioEl == i && r.opts.onSeek()
        }), addEvent(i, "error", function() {
            AudioUtils.debugLog("HTML5 error track loading"), r._prefetchAudioEl == i ? r._prefetchAudioEl = r._createAudioNode() : r._currentAudioEl == i && i.src != AudioPlayerHTML5.SILENCE && r.opts.onFail && r.opts.onFail()
        }), addEvent(i, "canplay", function() {
            var e = data(i, "setUrlTime");
            e && (cur.audioLoadTimings = cur.audioLoadTimings || [], cur.audioLoadTimings.push(vkNow() - e), data(i, "setUrlTime", 0)), r._prefetchAudioEl, r._currentAudioEl == i && (r.opts.onCanPlay && r.opts.onCanPlay(), data(i, "canplay", !0))
        }), addEvent(i, "durationchange", function() {
            t._currentAudioEl == i && t._seekOnReady && isFinite(i.duration) && (t.seek(t._seekOnReady), t._seekOnReady = !1)
        }), i.crossOrigin = "anonymous", e && (this._setAudioNodeUrl(i, e), i.preload = "auto", i.volume = this._volume || 1, i.load()), this._audioNodes.push(i), this._audioNodes.length > 10 && this._audioNodes.splice(0, 5), i
    }, AudioPlayerHTML5.prototype.onReady = function(e) {
        e(!0)
    }, AudioPlayerHTML5.prototype.prefetch = function(e) {
        this._isHlsUrl(e) || (this._prefetchAudioEl && this._setAudioNodeUrl(this._prefetchAudioEl, AudioPlayerHTML5.SILENCE), this._prefetchAudioEl = this._createAudioNode(e))
    }, AudioPlayerHTML5.prototype.seek = function(e) {
        var t = this._currentAudioEl;
        isFinite(t.duration) ? t.currentTime = t.duration * e : this._seekOnReady = e
    }, AudioPlayerHTML5.prototype.setVolume = function(e) {
        void 0 === e && (e = this._currentAudioEl.volume), this._currentAudioEl.volume = e, this._prefetchAudioEl && (this._prefetchAudioEl.volume = e), this._volume = e
    }, AudioPlayerHTML5.prototype.setPlaybackRate = function(e) {
        this._currentAudioEl.playbackRate = e
    }, AudioPlayerHTML5.prototype.getCurrentProgress = function() {
        var e = this._currentAudioEl;
        return isNaN(e.duration) ? 0 : Math.max(0, Math.min(1, e.currentTime / e.duration))
    }, AudioPlayerHTML5.prototype.getCurrentBuffered = function() {
        var e = this._currentAudioEl;
        return e && e.buffered.length ? Math.min(1, e.buffered.end(0) / e.duration) : 0
    }, AudioPlayerHTML5.prototype.isFullyLoaded = function() {
        return this._currentAudioEl._fullyLoaded
    }, AudioPlayerHTML5.prototype.setUrl = function(e, t) {
        var i = this._currentAudioEl,
            r = Object(_audioplayer_audio_unmask_source__WEBPACK_IMPORTED_MODULE_0__.audioUnmaskSource)(e);
        if (this._seekOnReady = !1, i.src == r || this._currentHls && this._currentHls.url == r) return this.opts.onCanPlay && this.opts.onCanPlay(), t && t(!0);
        if (this._prefetchAudioEl && this._prefetchAudioEl.readyState > AudioPlayerHTML5.STATE_HAVE_NOTHING)
            if (this._prefetchAudioEl.src == r) {
                this._currentAudioEl.pause(0), this._setAudioNodeUrl(this._currentAudioEl, AudioPlayerHTML5.SILENCE);
                var n = this;
                this._prefetchAudioEl.readyState >= AudioPlayerHTML5.STATE_HAVE_FUTURE_DATA && setTimeout(function() {
                    n.opts.onCanPlay && n.opts.onCanPlay()
                }), i = this._currentAudioEl = this._prefetchAudioEl, this._prefetchAudioEl = !1
            } else this._prefetchAudioEl.src && this._setAudioNodeUrl(this._prefetchAudioEl, AudioPlayerHTML5.SILENCE);
        return i.src != r && (this._setAudioNodeUrl(i, r), i.load(), data(this._currentAudioEl, "canplay", null), this._stopFrequencyAnalise()), t && t(!0)
    }, AudioPlayerHTML5.prototype.play = function(e) {
        this._stopFrequencyAnalise(), this._prefetchAudioEl.src == Object(_audioplayer_audio_unmask_source__WEBPACK_IMPORTED_MODULE_0__.audioUnmaskSource)(e) && this._prefetchAudioEl.readyState > AudioPlayerHTML5.STATE_HAVE_NOTHING && (this._setAudioNodeUrl(this._currentAudioEl, AudioPlayerHTML5.SILENCE), this._currentAudioEl = this._prefetchAudioEl, this._prefetchAudioEl = this._createAudioNode(), this.opts.onCanPlay && this.opts.onCanPlay());
        var t = this._currentAudioEl;
        if (t.src) {
            var i = t.play();
            isUndefined(i) || i.catch(function(e) {
                e.code != e.ABORT_ERR ? Object(_audioplayer_audioplayer_utils__WEBPACK_IMPORTED_MODULE_4__.setWorkerTimeout)(function() {
                    triggerEvent(t, "error", !1, !0)
                }, 10) : debugLog("HTML5 audio play error: " + e)
            }), this._startFrequencyAnalise()
        }
    }, AudioPlayerHTML5.prototype._stopFrequencyAnalise = function() {
        this._stopFrequencyAnaliseCallback && this._stopFrequencyAnaliseCallback(), delete this._stopFrequencyAnaliseCallback, clearInterval(this._freqUpdateInterval), this.opts.onFrequency([0, 0, 0, 0])
    }, AudioPlayerHTML5.prototype._startFrequencyAnalise = function() {
        var e = this;

        function t(e, t, i, r) {
            return (i - t) * e / r + t
        }

        function i(e, t) {
            return Math.random() * (t - e) + e
        }
        this._stopFrequencyAnalise();
        var r = 999,
            n = null,
            o = null;
        this._freqUpdateInterval = setInterval(function() {
            var a = void 0;
            e._currentAudioEl.paused || !data(e._currentAudioEl, "canplay") ? a = [0, 0, 0, 0] : (++r > 3 && (r = 0, n = o, o = [i(.7, 1), i(.55, .8), i(.3, .55), i(.03, .45)], n || (n = [i(.7, 1), i(.55, .8), i(.3, .55), i(.03, .45)])), a = [t(r, n[0], o[0], 3), t(r, n[1], o[1], 3), t(r, n[2], o[2], 3), t(r, n[3], o[3], 3)]), e.opts.onFrequency(a)
        }, 50)
    }, AudioPlayerHTML5.prototype.pause = function() {
        var e = this._currentAudioEl;
        if (e.src) {
            var t = e.pause();
            void 0 != t && t.catch(function() {})
        }
        this._stopFrequencyAnalise()
    }, AudioPlayerHTML5.prototype.stop = function() {
        this._currentAudioEl.pause(), this._currentAudioEl = this._createAudioNode(AudioPlayerHTML5.SILENCE), this._stopFrequencyAnalise()
    }, AudioPlayerHTML5.prototype._setFadeVolumeInterval = function(e) {
        if (e) {
            if (!this._fadeVolumeWorker && window.Worker && window.Blob) {
                var t = new Blob(["         var interval;         onmessage = function(e) {           clearInterval(interval);           if (e.data == 'start') {             interval = setInterval(function() { postMessage({}); }, 20);           }         }       "]);
                try {
                    this._fadeVolumeWorker = new Worker(window.URL.createObjectURL(t))
                } catch (e) {
                    this._fadeVolumeWorker = !1
                }
            }
            this._fadeVolumeWorker ? (this._fadeVolumeWorker.onmessage = e, this._fadeVolumeWorker.postMessage("start")) : this._fadeVolumeInterval = setInterval(e, 60)
        } else this._fadeVolumeWorker && (this._fadeVolumeWorker.terminate(), this._fadeVolumeWorker = null), this._fadeVolumeInterval && clearInterval(this._fadeVolumeInterval)
    }, AudioPlayerHTML5.prototype.fadeVolume = function(e, t) {
        e = Math.max(0, Math.min(1, e));
        var i = this._currentAudioEl,
            r = 0;
        if (r = e < i.volume ? -.06 : .001, Math.abs(e - i.volume) <= .001) return this._setFadeVolumeInterval(), t && t();
        var n = i.volume;
        this._setFadeVolumeInterval(function() {
            r > 0 && (r *= 1.35), n += r;
            if (r < 0 ? n <= e : n >= e) return this.setVolume(e), this._setFadeVolumeInterval(), t && t();
            this.setVolume(n)
        }.bind(this))
    }, AudioPlayerHTML5.prototype.getErrorData = function() {
        var e = this._currentAudioEl.error || {};
        return {
            is_hls: this._currentHls ? 1 : 0,
            url: this._currentHls ? this._currentHls.url : this._currentAudioEl.currentSrc,
            error_code: e.code,
            error_message: e.message,
            hls_error: this._hlsError ? JSON.stringify(this._hlsError) : null
        }
    };
    try {
        stManager.done("audioplayer.js")
    } catch (e) {}
}, function(e, t, i) {
    e.exports = i(166)
}, function(e, t, i) {
    "use strict";
    var r = i(13),
        n = i(61),
        o = n.utils,
        a = o.assert,
        s = o.parseBytes,
        d = i(81),
        u = i(30);

    function f(e) {
        if (a("ed25519" === e, "only tested with ed25519 so far"), !(this instanceof f)) return new f(e);
        e = n.curves[e].curve;
        this.curve = e, this.g = e.g, this.g.precompute(e.n.bitLength() + 1), this.pointClass = e.point().constructor, this.encodingLength = Math.ceil(e.n.bitLength() / 8), this.hash = r.sha512
    }
    e.exports = f, f.prototype.sign = function(e, t) {
        e = s(e);
        var i = this.keyFromSecret(t),
            r = this.hashInt(i.messagePrefix(), e),
            n = this.g.mul(r),
            o = this.encodePoint(n),
            a = this.hashInt(o, i.pubBytes(), e).mul(i.priv()),
            d = r.add(a).umod(this.curve.n);
        return this.makeSignature({
            R: n,
            S: d,
            Rencoded: o
        })
    }, f.prototype.verify = function(e, t, i) {
        e = s(e), t = this.makeSignature(t);
        var r = this.keyFromPublic(i),
            n = this.hashInt(t.Rencoded(), r.pubBytes(), e),
            o = this.g.mul(t.S());
        return t.R().add(r.pub().mul(n)).eq(o)
    }, f.prototype.hashInt = function() {
        for (var e = this.hash(), t = 0; t < arguments.length; t++) e.update(arguments[t]);
        return o.intFromLE(e.digest()).umod(this.curve.n)
    }, f.prototype.keyFromPublic = function(e) {
        return d.fromPublic(this, e)
    }, f.prototype.keyFromSecret = function(e) {
        return d.fromSecret(this, e)
    }, f.prototype.makeSignature = function(e) {
        return e instanceof u ? e : new u(this, e)
    }, f.prototype.encodePoint = function(e) {
        var t = e.getY().toArray("le", this.encodingLength);
        return t[this.encodingLength - 1] |= e.getX().isOdd() ? 128 : 0, t
    }, f.prototype.decodePoint = function(e) {
        var t = (e = o.parseBytes(e)).length - 1,
            i = e.slice(0, t).concat(-129 & e[t]),
            r = 0 != (128 & e[t]),
            n = o.intFromLE(i);
        return this.curve.pointFromY(n, r)
    }, f.prototype.encodeInt = function(e) {
        return e.toArray("le", this.encodingLength)
    }, f.prototype.decodeInt = function(e) {
        return o.intFromLE(e)
    }, f.prototype.isPoint = function(e) {
        return e instanceof this.pointClass
    }
}, function(e, t, i) {
    "use strict";
    var r = i(132),
        n = i(137),
        o = i(93),
        a = r.rotl32,
        s = r.sum32,
        d = r.sum32_5,
        u = o.ft_1,
        f = n.BlockHash,
        c = [1518500249, 1859775393, 2400959708, 3395469782];

    function l() {
        if (!(this instanceof l)) return new l;
        f.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.W = new Array(80)
    }
    r.inherits(l, f), e.exports = l, l.blockSize = 512, l.outSize = 160, l.hmacStrength = 80, l.padLength = 64, l.prototype._update = function(e, t) {
        for (var i = this.W, r = 0; r < 16; r++) i[r] = e[t + r];
        for (; r < i.length; r++) i[r] = a(i[r - 3] ^ i[r - 8] ^ i[r - 14] ^ i[r - 16], 1);
        var n = this.h[0],
            o = this.h[1],
            f = this.h[2],
            l = this.h[3],
            h = this.h[4];
        for (r = 0; r < i.length; r++) {
            var p = ~~(r / 20),
                _ = d(a(n, 5), u(p, o, f, l), h, i[r], c[p]);
            h = l, l = f, f = a(o, 30), o = n, n = _
        }
        this.h[0] = s(this.h[0], n), this.h[1] = s(this.h[1], o), this.h[2] = s(this.h[2], f), this.h[3] = s(this.h[3], l), this.h[4] = s(this.h[4], h)
    }, l.prototype._digest = function(e) {
        return "hex" === e ? r.toHex32(this.h, "big") : r.split32(this.h, "big")
    }
}, function(e, t, i) {
    (function(t) {
        var r = /Proc-Type: 4,ENCRYPTED[\n\r]+DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)[\n\r]+([0-9A-z\n\r\+\/\=]+)[\n\r]+/m,
            n = /^-----BEGIN ((?:.* KEY)|CERTIFICATE)-----/m,
            o = /^-----BEGIN ((?:.* KEY)|CERTIFICATE)-----([0-9A-z\n\r\+\/\=]+)-----END \1-----$/m,
            a = i(111),
            s = i(0);
        e.exports = function(e, i) {
            var d, u = e.toString(),
                f = u.match(r);
            if (f) {
                var c = "aes" + f[1],
                    l = new t(f[2], "hex"),
                    h = new t(f[3].replace(/[\r\n]/g, ""), "base64"),
                    p = a(i, l.slice(0, 8), parseInt(f[1], 10)).key,
                    _ = [],
                    y = s.createDecipheriv(c, p, l);
                _.push(y.update(h)), _.push(y.final()), d = t.concat(_)
            } else {
                var b = u.match(o);
                d = new t(b[2].replace(/[\r\n]/g, ""), "base64")
            }
            return {
                tag: u.match(n)[1],
                data: d
            }
        }
    }).call(this, i(11).Buffer)
}, function(e, t, i) {
    "use strict";
    var r = i(105),
        n = i(61).utils,
        o = n.assert;

    function a(e, t) {
        if (e instanceof a) return e;
        this._importDER(e, t) || (o(e.r && e.s, "Signature without r or s"), this.r = new r(e.r, 16), this.s = new r(e.s, 16), void 0 === e.recoveryParam ? this.recoveryParam = null : this.recoveryParam = e.recoveryParam)
    }

    function s(e, t) {
        var i = e[t.place++];
        if (!(128 & i)) return i;
        for (var r = 15 & i, n = 0, o = 0, a = t.place; o < r; o++, a++) n <<= 8, n |= e[a];
        return t.place = a, n
    }

    function d(e) {
        for (var t = 0, i = e.length - 1; !e[t] && !(128 & e[t + 1]) && t < i;) t++;
        return 0 === t ? e : e.slice(t)
    }

    function u(e, t) {
        if (t < 128) e.push(t);
        else {
            var i = 1 + (Math.log(t) / Math.LN2 >>> 3);
            for (e.push(128 | i); --i;) e.push(t >>> (i << 3) & 255);
            e.push(t)
        }
    }
    e.exports = a, a.prototype._importDER = function(e, t) {
        e = n.toArray(e, t);
        var i = new function() {
            this.place = 0
        };
        if (48 !== e[i.place++]) return !1;
        if (s(e, i) + i.place !== e.length) return !1;
        if (2 !== e[i.place++]) return !1;
        var o = s(e, i),
            a = e.slice(i.place, o + i.place);
        if (i.place += o, 2 !== e[i.place++]) return !1;
        var d = s(e, i);
        if (e.length !== d + i.place) return !1;
        var u = e.slice(i.place, d + i.place);
        return 0 === a[0] && 128 & a[1] && (a = a.slice(1)), 0 === u[0] && 128 & u[1] && (u = u.slice(1)), this.r = new r(a), this.s = new r(u), this.recoveryParam = null, !0
    }, a.prototype.toDER = function(e) {
        var t = this.r.toArray(),
            i = this.s.toArray();
        for (128 & t[0] && (t = [0].concat(t)), 128 & i[0] && (i = [0].concat(i)), t = d(t), i = d(i); !(i[0] || 128 & i[1]);) i = i.slice(1);
        var r = [2];
        u(r, t.length), (r = r.concat(t)).push(2), u(r, i.length);
        var o = r.concat(i),
            a = [48];
        return u(a, o.length), a = a.concat(o), n.encode(a, e)
    }
}, function(e, t) {
    var i = {}.toString;
    e.exports = Array.isArray || function(e) {
        return "[object Array]" == i.call(e)
    }
}, function(e, t) {
    var i = [].indexOf;
    e.exports = function(e, t) {
        if (i) return e.indexOf(t);
        for (var r = 0; r < e.length; ++r)
            if (e[r] === t) return r;
        return -1
    }
}, function(e, t, i) {
    "use strict";
    i.r(t), i.d(t, "DELETE", function() {
        return o
    }), i.d(t, "SET_FLAGS", function() {
        return a
    }), i.d(t, "REPLACE_FLAGS", function() {
        return s
    }), i.d(t, "RESET_FLAGS", function() {
        return d
    }), i.d(t, "ADD_MESSAGE", function() {
        return u
    }), i.d(t, "READ_INBOUND", function() {
        return f
    }), i.d(t, "READ_OUTBOUND", function() {
        return c
    }), i.d(t, "GOT_ONLINE", function() {
        return l
    }), i.d(t, "GOT_OFFLINE", function() {
        return h
    }), i.d(t, "CHAT_CHANGED", function() {
        return p
    }), i.d(t, "CONVERSATION_UPDATED", function() {
        return _
    }), i.d(t, "TYPING", function() {
        return y
    }), i.d(t, "VIDEO_CALL", function() {
        return b
    }), i.d(t, "UNREAD_COUNT", function() {
        return g
    }), i.d(t, "NOTIFY_SETTINGS_CHANGED", function() {
        return v
    }), i.d(t, "EMPTY", function() {
        return m
    }), i.d(t, "RESET_DIRECTORIES", function() {
        return A
    }), i.d(t, "REPLACE_DIRECTORIES", function() {
        return w
    }), i.d(t, "SET_DIRECTORIES", function() {
        return E
    }), i.d(t, "RESYNC", function() {
        return P
    }), i.d(t, "REFRESH_LP_KEY", function() {
        return S
    }), i.d(t, "TRANSITION", function() {
        return I
    }), i.d(t, "RESET_PEER", function() {
        return T
    }), i.d(t, "MUTEX", function() {
        return M
    }), i.d(t, "CHANGE_PEER", function() {
        return L
    }), i.d(t, "CHANGE_TAB", function() {
        return k
    }), i.d(t, "FAILED_MESSAGE", function() {
        return C
    }), i.d(t, "RESEND", function() {
        return D
    }), i.d(t, "DELETE_DIALOG", function() {
        return U
    }), i.d(t, "EDIT_MESSAGE", function() {
        return O
    }), i.d(t, "REPLACE_MESSAGE", function() {
        return x
    }), i.d(t, "AUDIO_START", function() {
        return R
    }), i.d(t, "FLAG_UNREAD", function() {
        return B
    }), i.d(t, "FLAG_OUTBOUND", function() {
        return N
    }), i.d(t, "FLAG_IMPORTANT", function() {
        return j
    }), i.d(t, "FLAG_CHAT", function() {
        return H
    }), i.d(t, "FLAG_FRIENDS", function() {
        return F
    }), i.d(t, "FLAG_SPAM", function() {
        return q
    }), i.d(t, "FLAG_DELETED", function() {
        return V
    }), i.d(t, "FLAG_MEDIA", function() {
        return W
    }), i.d(t, "FLAG_STEALTH", function() {
        return z
    }), i.d(t, "FOLDER_IMPORTANT", function() {
        return Y
    }), i.d(t, "FOLDER_UNRESPOND", function() {
        return K
    }), i.d(t, "FOLDER_HAS_BANNER", function() {
        return X
    }), i.d(t, "MAIL_CHAT_UPDATE_TYPE_TITLE_CHANGED", function() {
        return G
    }), i.d(t, "MAIL_CHAT_UPDATE_TYPE_AVATAR_CHANGED", function() {
        return J
    }), i.d(t, "MAIL_CHAT_UPDATE_TYPE_ADMIN_GRANTED", function() {
        return Z
    }), i.d(t, "MAIL_CHAT_UPDATE_TYPE_FLAGS_CHANGED", function() {
        return Q
    }), i.d(t, "MAIL_CHAT_UPDATE_TYPE_PINNED", function() {
        return $
    }), i.d(t, "MAIL_CHAT_UPDATE_TYPE_USER_JOINED", function() {
        return ee
    }), i.d(t, "MAIL_CHAT_UPDATE_TYPE_USER_LEFT", function() {
        return te
    }), i.d(t, "MAIL_CHAT_UPDATE_TYPE_USER_KICKED", function() {
        return ie
    }), i.d(t, "MAIL_CHAT_UPDATE_TYPE_ADMIN_KICKED", function() {
        return re
    }), i.d(t, "MAIL_CHAT_UPDATE_TYPE_BANNER_CHANGED", function() {
        return ne
    }), i.d(t, "MAIL_CHAT_UPDATE_TYPE_KEYBOARD_CHANGED", function() {
        return oe
    }), i.d(t, "deleteEvent", function() {
        return ae
    }), i.d(t, "replaceFlagsEvent", function() {
        return se
    }), i.d(t, "setFlagsEvent", function() {
        return de
    }), i.d(t, "resetFlagsEvent", function() {
        return ue
    }), i.d(t, "addMessageEvent", function() {
        return fe
    }), i.d(t, "editMessageEvent", function() {
        return ce
    }), i.d(t, "replaceMessageEvent", function() {
        return le
    }), i.d(t, "editMessageLocallyEvent", function() {
        return he
    }), i.d(t, "readInboundEvent", function() {
        return pe
    }), i.d(t, "readOutboundEvent", function() {
        return _e
    }), i.d(t, "gotOnlineEvent", function() {
        return ye
    }), i.d(t, "gotOfflineEvent", function() {
        return be
    }), i.d(t, "resetDirectoriesEvent", function() {
        return ge
    }), i.d(t, "replaceDirectoriesEvent", function() {
        return ve
    }), i.d(t, "setDirectoriesEvent", function() {
        return me
    }), i.d(t, "deleteDialogEvent", function() {
        return Ae
    }), i.d(t, "chatChangedEvent", function() {
        return we
    }), i.d(t, "chatUpdatedEvent", function() {
        return Ee
    }), i.d(t, "typingEvent", function() {
        return Pe
    }), i.d(t, "videoCallEvent", function() {
        return Se
    }), i.d(t, "unreadCountEvent", function() {
        return Ie
    }), i.d(t, "notifySettingsChangedEvent", function() {
        return Te
    }), i.d(t, "refreshMessageEvent", function() {
        return Me
    }), i.d(t, "audioStartEvent", function() {
        return Le
    }), i.d(t, "emptyEvent", function() {
        return ke
    }), i.d(t, "transitionEvent", function() {
        return Ce
    }), i.d(t, "resyncEvent", function() {
        return De
    }), i.d(t, "refreshLpKeyEvent", function() {
        return Ue
    }), i.d(t, "resetPeer", function() {
        return Oe
    }), i.d(t, "changePeer", function() {
        return xe
    }), i.d(t, "changeTab", function() {
        return Re
    }), i.d(t, "failedMessage", function() {
        return Be
    }), i.d(t, "mutexEvent", function() {
        return Ne
    }), i.d(t, "resendEvent", function() {
        return je
    });
    var r = i(125),
        n = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var i = [],
                        r = !0,
                        n = !1,
                        o = void 0;
                    try {
                        for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (i.push(a.value), !t || i.length !== t); r = !0);
                    } catch (e) {
                        n = !0, o = e
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (n) throw o
                        }
                    }
                    return i
                }(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        o = "event_delete",
        a = "event_set_flags",
        s = "event_replace_flags",
        d = "event_reset_flags",
        u = "event_add_message",
        f = "event_read_inbound",
        c = "event_read_outbound",
        l = "event_got_online",
        h = "event_got_offline",
        p = "event_chat_changed",
        _ = "event_chat_updated",
        y = "event_typing",
        b = "event_video_call",
        g = "event_unread_count",
        v = "event_notify_settings_changed",
        m = "event_empty",
        A = "event_reset_directories",
        w = "event_replace_directories",
        E = "event_set_directories",
        P = "event_resync",
        S = "event_refresh_lp_key",
        I = "transition_event",
        T = "reset_peer",
        M = "mutex",
        L = "change_peer",
        k = "event_change_tab",
        C = "event_failed_message",
        D = "event_resend",
        U = "event_delete_dialog",
        O = "event_edit_message",
        x = "event_replace_message",
        R = "event_audio_start",
        B = 1,
        N = 2,
        j = 8,
        H = 16,
        F = 32,
        q = 64,
        V = 128,
        W = 512,
        z = 65536,
        Y = 1,
        K = 2,
        X = 8,
        G = 1,
        J = 2,
        Z = 3,
        Q = 4,
        $ = 5,
        ee = 6,
        te = 7,
        ie = 8,
        re = 9,
        ne = 10,
        oe = 11;

    function ae(e) {
        var t = n(e, 2)[1];
        return {
            type: o,
            localId: t
        }
    }

    function se(e) {
        var t = n(e, 4),
            i = t[1],
            r = t[2],
            o = t[3];
        return {
            type: s,
            messageId: i,
            mask: r,
            peerId: o
        }
    }

    function de(e) {
        var t = n(e, 4),
            i = t[1],
            r = t[2],
            o = t[3];
        return {
            type: a,
            messageId: i,
            flags: r,
            peerId: o
        }
    }

    function ue(e) {
        var t = n(e, 4),
            i = t[1],
            r = t[2],
            o = t[3];
        return {
            type: d,
            messageId: i,
            flags: r,
            peerId: o
        }
    }

    function fe(e) {
        var t = n(e, 11),
            i = t[1],
            o = t[2],
            a = t[3],
            s = t[4],
            d = t[5],
            f = t[6],
            c = t[7],
            l = t[8],
            h = t[9],
            p = t[10],
            _ = extend(f, c || void 0);
        return {
            type: u,
            messageId: intval(i),
            flags: intval(o),
            peerId: intval(a),
            date: intval(s),
            attaches: Object(r.convertKludgesToAttaches)(_, i),
            subject: f.title || "",
            text: d,
            kludges: _,
            randomId: intval(l),
            userId: Object(r.isChatPeer)(a) ? intval(_.from) : intval(a),
            update_time: p,
            chat_local_id: h
        }
    }

    function ce(e) {
        var t = fe(e);
        return t.type = O, t
    }

    function le(e) {
        var t = fe(e);
        return t.type = x, t
    }

    function he(e) {
        return extend({}, e, {
            type: O
        })
    }

    function pe(e) {
        var t = n(e, 4),
            i = t[1],
            r = t[2],
            o = t[3];
        return {
            type: f,
            peerId: i,
            upToId: r,
            unread: o
        }
    }

    function _e(e) {
        var t = n(e, 4),
            i = t[1],
            r = t[2],
            o = t[3];
        return {
            type: c,
            peerId: i,
            upToId: r,
            unread: o
        }
    }

    function ye(e) {
        var t = n(e, 4),
            i = t[1],
            r = t[2],
            o = t[3];
        return {
            type: l,
            userId: -i,
            platform: r,
            lastSeenTs: o
        }
    }

    function be(e) {
        var t = n(e, 4),
            i = t[1],
            r = t[2],
            o = t[3];
        return {
            type: h,
            userId: -i,
            reason: r,
            lastSeenTs: o
        }
    }

    function ge(e) {
        var t = n(e, 4),
            i = t[1],
            r = t[2],
            o = t[3];
        return {
            type: A,
            peerId: i,
            mask: r,
            local: void 0 !== o && o
        }
    }

    function ve(e) {
        var t = n(e, 3),
            i = t[1],
            r = t[2];
        return {
            type: w,
            peerId: i,
            mask: r
        }
    }

    function me(e) {
        var t = n(e, 4),
            i = t[1],
            r = t[2],
            o = t[3];
        return {
            type: E,
            peerId: i,
            mask: r,
            local: void 0 !== o && o
        }
    }

    function Ae(e) {
        var t = n(e, 3),
            i = t[1],
            r = t[2];
        return {
            type: U,
            peerId: i,
            localId: r
        }
    }

    function we(e) {
        var t = n(e, 3),
            i = t[1],
            r = t[2];
        return {
            type: p,
            chatId: i,
            self: r
        }
    }

    function Ee(e) {
        var t = n(e, 4),
            i = t[1],
            r = t[2],
            o = t[3];
        return {
            type: _,
            peerId: r,
            updateType: i,
            updateArg: o
        }
    }

    function Pe(e) {
        var t = n(e, 5),
            i = t[1],
            r = t[2],
            o = t[3],
            a = t[4];
        return {
            type: y,
            peerId: i,
            userIds: r,
            totalCount: o,
            ts: a
        }
    }

    function Se(e) {
        var t = n(e, 3),
            i = t[1],
            r = t[2];
        return {
            type: b,
            userId: i,
            callId: r
        }
    }

    function Ie(e) {
        var t = n(e, 4),
            i = t[1],
            r = t[2],
            o = t[3];
        return {
            type: g,
            count: i,
            countNotMuted: r,
            showOnlyNotMuted: o
        }
    }

    function Te(e) {
        var t = n(e, 2)[1],
            i = void 0 === t ? {} : t;
        return {
            type: v,
            peerId: i.peer_id,
            sound: i.sound,
            disabledUntil: i.disabled_until
        }
    }

    function Me(e) {
        var t = n(e, 2)[1],
            i = void 0 === t ? {} : t,
            r = fe([!1, i.id, i.flags, i.peer_id, i.date, i.message, extend(i.kludges, {
                title: i.title || ""
            }), {}, i.random_id, i.chat_local_id, i.update_time]);
        return r.type = O, r
    }

    function Le(e) {
        var t = n(e, 2)[1],
            i = void 0 === t ? {} : t;
        return {
            type: R,
            uuid: i.uuid,
            deviceName: i.device_name || ""
        }
    }

    function ke(e) {
        return {
            type: m,
            params: e
        }
    }

    function Ce(e) {
        return {
            type: I,
            state: e
        }
    }

    function De() {
        return {
            type: P
        }
    }

    function Ue(e) {
        var t = n(e, 3),
            i = t[1],
            r = t[2];
        return {
            type: S,
            key: i,
            url: r
        }
    }

    function Oe() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return {
            type: T,
            cancelSearch: e,
            removeActivePeer: t
        }
    }

    function xe(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
            n = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "";
        return {
            type: L,
            peerId: e,
            msgid: t,
            forward: i,
            cancelSearch: r,
            entryPoint: n
        }
    }

    function Re(e) {
        return {
            type: k,
            tab: e
        }
    }

    function Be(e, t, i) {
        return {
            type: C,
            message: t,
            peer: e,
            error: i
        }
    }

    function Ne(e) {
        var t = n(e, 6),
            i = (t[0], t[1]),
            r = t[2],
            o = t[3],
            a = t[4],
            s = t[5];
        return {
            type: M,
            free: !!intval(i) || intval(a) === vk.id,
            resource: r,
            peerId: intval(o),
            who: intval(a),
            name: s
        }
    }

    function je(e, t) {
        return {
            type: D,
            message: t,
            peerId: e
        }
    }
}, function(e, t) {}, function(e, t, i) {
    var r = i(39),
        n = i(121),
        o = i(133).Buffer,
        a = [1518500249, 1859775393, -1894007588, -899497514],
        s = new Array(80);

    function d() {
        this.init(), this._w = s, n.call(this, 64, 56)
    }

    function u(e) {
        return e << 30 | e >>> 2
    }

    function f(e, t, i, r) {
        return 0 === e ? t & i | ~t & r : 2 === e ? t & i | t & r | i & r : t ^ i ^ r
    }
    r(d, n), d.prototype.init = function() {
        return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
    }, d.prototype._update = function(e) {
        for (var t, i = this._w, r = 0 | this._a, n = 0 | this._b, o = 0 | this._c, s = 0 | this._d, d = 0 | this._e, c = 0; c < 16; ++c) i[c] = e.readInt32BE(4 * c);
        for (; c < 80; ++c) i[c] = i[c - 3] ^ i[c - 8] ^ i[c - 14] ^ i[c - 16];
        for (var l = 0; l < 80; ++l) {
            var h = ~~(l / 20),
                p = 0 | ((t = r) << 5 | t >>> 27) + f(h, n, o, s) + d + i[l] + a[h];
            d = s, s = o, o = u(n), n = r, r = p
        }
        this._a = r + this._a | 0, this._b = n + this._b | 0, this._c = o + this._c | 0, this._d = s + this._d | 0, this._e = d + this._e | 0
    }, d.prototype._hash = function() {
        var e = o.allocUnsafe(20);
        return e.writeInt32BE(0 | this._a, 0), e.writeInt32BE(0 | this._b, 4), e.writeInt32BE(0 | this._c, 8), e.writeInt32BE(0 | this._d, 12), e.writeInt32BE(0 | this._e, 16), e
    }, e.exports = d
}, function(e, t, i) {
    var r = i(39);

    function n(e) {
        this._reporterState = {
            obj: null,
            path: [],
            options: e || {},
            errors: []
        }
    }

    function o(e, t) {
        this.path = e, this.rethrow(t)
    }
    t.Reporter = n, n.prototype.isError = function(e) {
        return e instanceof o
    }, n.prototype.save = function() {
        var e = this._reporterState;
        return {
            obj: e.obj,
            pathLen: e.path.length
        }
    }, n.prototype.restore = function(e) {
        var t = this._reporterState;
        t.obj = e.obj, t.path = t.path.slice(0, e.pathLen)
    }, n.prototype.enterKey = function(e) {
        return this._reporterState.path.push(e)
    }, n.prototype.exitKey = function(e) {
        var t = this._reporterState;
        t.path = t.path.slice(0, e - 1)
    }, n.prototype.leaveKey = function(e, t, i) {
        var r = this._reporterState;
        this.exitKey(e), null !== r.obj && (r.obj[t] = i)
    }, n.prototype.path = function() {
        return this._reporterState.path.join("/")
    }, n.prototype.enterObject = function() {
        var e = this._reporterState,
            t = e.obj;
        return e.obj = {}, t
    }, n.prototype.leaveObject = function(e) {
        var t = this._reporterState,
            i = t.obj;
        return t.obj = e, i
    }, n.prototype.error = function(e) {
        var t, i = this._reporterState,
            r = e instanceof o;
        if (t = r ? e : new o(i.path.map(function(e) {
                return "[" + JSON.stringify(e) + "]"
            }).join(""), e.message || e, e.stack), !i.options.partial) throw t;
        return r || i.errors.push(t), t
    }, n.prototype.wrapResult = function(e) {
        var t = this._reporterState;
        return t.options.partial ? {
            result: this.isError(e) ? null : e,
            errors: t.errors
        } : e
    }, r(o, Error), o.prototype.rethrow = function(e) {
        if (this.message = e + " at: " + (this.path || "(shallow)"), Error.captureStackTrace && Error.captureStackTrace(this, o), !this.stack) try {
            throw new Error(this.message)
        } catch (e) {
            this.stack = e.stack
        }
        return this
    }
}, function(e, t) {
    e.exports = function(e, t) {
        for (var i = e.length, r = -1; ++r < i;) e[r] ^= t[r];
        return e
    }
}, function(e, t, i) {
    "use strict";
    var r = i(143),
        n = i(39),
        o = i(80),
        a = o.utils,
        s = o.Cipher;

    function d(e) {
        s.call(this, e);
        var t = new function() {
            this.tmp = new Array(2), this.keys = null
        };
        this._desState = t, this.deriveKeys(t, e.key)
    }
    n(d, s), e.exports = d, d.create = function(e) {
        return new d(e)
    };
    var u = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
    d.prototype.deriveKeys = function(e, t) {
        e.keys = new Array(32), r.equal(t.length, this.blockSize, "Invalid key length");
        var i = a.readUInt32BE(t, 0),
            n = a.readUInt32BE(t, 4);
        a.pc1(i, n, e.tmp, 0), i = e.tmp[0], n = e.tmp[1];
        for (var o = 0; o < e.keys.length; o += 2) {
            var s = u[o >>> 1];
            i = a.r28shl(i, s), n = a.r28shl(n, s), a.pc2(i, n, e.keys, o)
        }
    }, d.prototype._update = function(e, t, i, r) {
        var n = this._desState,
            o = a.readUInt32BE(e, t),
            s = a.readUInt32BE(e, t + 4);
        a.ip(o, s, n.tmp, 0), o = n.tmp[0], s = n.tmp[1], "encrypt" === this.type ? this._encrypt(n, o, s, n.tmp, 0) : this._decrypt(n, o, s, n.tmp, 0), o = n.tmp[0], s = n.tmp[1], a.writeUInt32BE(i, o, r), a.writeUInt32BE(i, s, r + 4)
    }, d.prototype._pad = function(e, t) {
        for (var i = e.length - t, r = t; r < e.length; r++) e[r] = i;
        return !0
    }, d.prototype._unpad = function(e) {
        for (var t = e[e.length - 1], i = e.length - t; i < e.length; i++) r.equal(e[i], t);
        return e.slice(0, e.length - t)
    }, d.prototype._encrypt = function(e, t, i, r, n) {
        for (var o = t, s = i, d = 0; d < e.keys.length; d += 2) {
            var u = e.keys[d],
                f = e.keys[d + 1];
            a.expand(s, e.tmp, 0), u ^= e.tmp[0], f ^= e.tmp[1];
            var c = a.substitute(u, f),
                l = s;
            s = (o ^ a.permute(c)) >>> 0, o = l
        }
        a.rip(s, o, r, n)
    }, d.prototype._decrypt = function(e, t, i, r, n) {
        for (var o = i, s = t, d = e.keys.length - 2; d >= 0; d -= 2) {
            var u = e.keys[d],
                f = e.keys[d + 1];
            a.expand(o, e.tmp, 0), u ^= e.tmp[0], f ^= e.tmp[1];
            var c = a.substitute(u, f),
                l = o;
            o = (s ^ a.permute(c)) >>> 0, s = l
        }
        a.rip(o, s, r, n)
    }
}, function(e) {
    e.exports = {
        "1.3.132.0.10": "secp256k1",
        "1.3.132.0.33": "p224",
        "1.2.840.10045.3.1.1": "p192",
        "1.2.840.10045.3.1.7": "p256",
        "1.3.132.0.34": "p384",
        "1.3.132.0.35": "p521"
    }
}, function(e, t, i) {
    var r = i(119),
        n = i(39);

    function o(e, t) {
        this.name = e, this.body = t, this.decoders = {}, this.encoders = {}
    }
    t.define = function(e, t) {
        return new o(e, t)
    }, o.prototype._createNamed = function(e) {
        var t;
        try {
            t = i(138).runInThisContext("(function " + this.name + "(entity) {\n  this._initNamed(entity);\n})")
        } catch (e) {
            t = function(e) {
                this._initNamed(e)
            }
        }
        return n(t, e), t.prototype._initNamed = function(t) {
            e.call(this, t)
        }, new t(this)
    }, o.prototype._getDecoder = function(e) {
        return e = e || "der", this.decoders.hasOwnProperty(e) || (this.decoders[e] = this._createNamed(r.decoders[e])), this.decoders[e]
    }, o.prototype.decode = function(e, t, i) {
        return this._getDecoder(t).decode(e, i)
    }, o.prototype._getEncoder = function(e) {
        return e = e || "der", this.encoders.hasOwnProperty(e) || (this.encoders[e] = this._createNamed(r.encoders[e])), this.encoders[e]
    }, o.prototype.encode = function(e, t, i) {
        return this._getEncoder(t).encode(e, i)
    }
}, function(e, t) {
    t.encrypt = function(e, t) {
        return e._cipher.encryptBlock(t)
    }, t.decrypt = function(e, t) {
        return e._cipher.decryptBlock(t)
    }
}, function(e, t, i) {
    var r = i(39),
        n = i(26).Reporter,
        o = i(11).Buffer;

    function a(e, t) {
        n.call(this, t), o.isBuffer(e) ? (this.base = e, this.offset = 0, this.length = e.length) : this.error("Input not Buffer")
    }

    function s(e, t) {
        if (Array.isArray(e)) this.length = 0, this.value = e.map(function(e) {
            return e instanceof s || (e = new s(e, t)), this.length += e.length, e
        }, this);
        else if ("number" == typeof e) {
            if (!(0 <= e && e <= 255)) return t.error("non-byte EncoderBuffer value");
            this.value = e, this.length = 1
        } else if ("string" == typeof e) this.value = e, this.length = o.byteLength(e);
        else {
            if (!o.isBuffer(e)) return t.error("Unsupported type: " + typeof e);
            this.value = e, this.length = e.length
        }
    }
    r(a, n), t.DecoderBuffer = a, a.prototype.save = function() {
        return {
            offset: this.offset,
            reporter: n.prototype.save.call(this)
        }
    }, a.prototype.restore = function(e) {
        var t = new a(this.base);
        return t.offset = e.offset, t.length = this.offset, this.offset = e.offset, n.prototype.restore.call(this, e.reporter), t
    }, a.prototype.isEmpty = function() {
        return this.offset === this.length
    }, a.prototype.readUInt8 = function(e) {
        return this.offset + 1 <= this.length ? this.base.readUInt8(this.offset++, !0) : this.error(e || "DecoderBuffer overrun")
    }, a.prototype.skip = function(e, t) {
        if (!(this.offset + e <= this.length)) return this.error(t || "DecoderBuffer overrun");
        var i = new a(this.base);
        return i._reporterState = this._reporterState, i.offset = this.offset, i.length = this.offset + e, this.offset += e, i
    }, a.prototype.raw = function(e) {
        return this.base.slice(e ? e.offset : this.offset, this.length)
    }, t.EncoderBuffer = s, s.prototype.join = function(e, t) {
        return e || (e = new o(this.length)), t || (t = 0), 0 === this.length ? e : (Array.isArray(this.value) ? this.value.forEach(function(i) {
            i.join(e, t), t += i.length
        }) : ("number" == typeof this.value ? e[t] = this.value : "string" == typeof this.value ? e.write(this.value, t) : o.isBuffer(this.value) && this.value.copy(e, t), t += this.length), e)
    }
}, function(e) {
    e.exports = {
        name: "elliptic",
        version: "6.4.0",
        description: "EC cryptography",
        main: "lib/elliptic.js",
        files: ["lib"],
        scripts: {
            jscs: "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
            jshint: "jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js",
            lint: "npm run jscs && npm run jshint",
            unit: "istanbul test _mocha --reporter=spec test/index.js",
            test: "npm run lint && npm run unit",
            version: "grunt dist && git add dist/"
        },
        repository: {
            type: "git",
            url: "git@github.com:indutny/elliptic"
        },
        keywords: ["EC", "Elliptic", "curve", "Cryptography"],
        author: "Fedor Indutny <fedor@indutny.com>",
        license: "MIT",
        bugs: {
            url: "https://github.com/indutny/elliptic/issues"
        },
        homepage: "https://github.com/indutny/elliptic",
        devDependencies: {
            brfs: "^1.4.3",
            coveralls: "^2.11.3",
            grunt: "^0.4.5",
            "grunt-browserify": "^5.0.0",
            "grunt-cli": "^1.2.0",
            "grunt-contrib-connect": "^1.0.0",
            "grunt-contrib-copy": "^1.0.0",
            "grunt-contrib-uglify": "^1.0.1",
            "grunt-mocha-istanbul": "^3.0.1",
            "grunt-saucelabs": "^8.6.2",
            istanbul: "^0.4.2",
            jscs: "^2.9.0",
            jshint: "^2.6.0",
            mocha: "^2.1.0"
        },
        dependencies: {
            "bn.js": "^4.4.0",
            brorand: "^1.0.1",
            "hash.js": "^1.0.0",
            "hmac-drbg": "^1.0.0",
            inherits: "^2.0.1",
            "minimalistic-assert": "^1.0.0",
            "minimalistic-crypto-utils": "^1.0.0"
        }
    }
}, function(e, t, i) {
    var r = i(133).Buffer,
        n = i(107);

    function o(e, t, i) {
        var o = t.length,
            a = n(t, e._cache);
        return e._cache = e._cache.slice(o), e._prev = r.concat([e._prev, i ? t : a]), a
    }
    t.encrypt = function(e, t, i) {
        for (var n, a = r.allocUnsafe(0); t.length;) {
            if (0 === e._cache.length && (e._cache = e._cipher.encryptBlock(e._prev), e._prev = r.allocUnsafe(0)), !(e._cache.length <= t.length)) {
                a = r.concat([a, o(e, t, i)]);
                break
            }
            n = e._cache.length, a = r.concat([a, o(e, t.slice(0, n), i)]), t = t.slice(n)
        }
        return a
    }
}, function(e, t, i) {
    "use strict";
    (function(t, r) {
        var n = i(101);
        e.exports = v;
        var o, a = i(150);
        v.ReadableState = g;
        i(85).EventEmitter;
        var s = function(e, t) {
                return e.listeners(t).length
            },
            d = i(3),
            u = i(133).Buffer,
            f = t.Uint8Array || function() {};
        var c = i(9);
        c.inherits = i(39);
        var l = i(153),
            h = void 0;
        h = l && l.debuglog ? l.debuglog("stream") : function() {};
        var p, _ = i(95),
            y = i(135);
        c.inherits(v, d);
        var b = ["error", "close", "destroy", "pause", "resume"];

        function g(e, t) {
            o = o || i(166), e = e || {};
            var r = t instanceof o;
            this.objectMode = !!e.objectMode, r && (this.objectMode = this.objectMode || !!e.readableObjectMode);
            var n = e.highWaterMark,
                a = e.readableHighWaterMark,
                s = this.objectMode ? 16 : 16384;
            this.highWaterMark = n || 0 === n ? n : r && (a || 0 === a) ? a : s, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new _, this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = e.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, e.encoding && (p || (p = i(74).StringDecoder), this.decoder = new p(e.encoding), this.encoding = e.encoding)
        }

        function v(e) {
            if (o = o || i(166), !(this instanceof v)) return new v(e);
            this._readableState = new g(e, this), this.readable = !0, e && ("function" == typeof e.read && (this._read = e.read), "function" == typeof e.destroy && (this._destroy = e.destroy)), d.call(this)
        }

        function m(e, t, i, r, n) {
            var o, a = e._readableState;
            null === t ? (a.reading = !1, function(e, t) {
                if (t.ended) return;
                if (t.decoder) {
                    var i = t.decoder.end();
                    i && i.length && (t.buffer.push(i), t.length += t.objectMode ? 1 : i.length)
                }
                t.ended = !0, P(e)
            }(e, a)) : (n || (o = function(e, t) {
                var i;
                r = t, u.isBuffer(r) || r instanceof f || "string" == typeof t || void 0 === t || e.objectMode || (i = new TypeError("Invalid non-string/buffer chunk"));
                var r;
                return i
            }(a, t)), o ? e.emit("error", o) : a.objectMode || t && t.length > 0 ? ("string" == typeof t || a.objectMode || Object.getPrototypeOf(t) === u.prototype || (t = function(e) {
                return u.from(e)
            }(t)), r ? a.endEmitted ? e.emit("error", new Error("stream.unshift() after end event")) : A(e, a, t, !0) : a.ended ? e.emit("error", new Error("stream.push() after EOF")) : (a.reading = !1, a.decoder && !i ? (t = a.decoder.write(t), a.objectMode || 0 !== t.length ? A(e, a, t, !1) : I(e, a)) : A(e, a, t, !1))) : r || (a.reading = !1));
            return function(e) {
                return !e.ended && (e.needReadable || e.length < e.highWaterMark || 0 === e.length)
            }(a)
        }

        function A(e, t, i, r) {
            t.flowing && 0 === t.length && !t.sync ? (e.emit("data", i), e.read(0)) : (t.length += t.objectMode ? 1 : i.length, r ? t.buffer.unshift(i) : t.buffer.push(i), t.needReadable && P(e)), I(e, t)
        }
        Object.defineProperty(v.prototype, "destroyed", {
            get: function() {
                return void 0 !== this._readableState && this._readableState.destroyed
            },
            set: function(e) {
                this._readableState && (this._readableState.destroyed = e)
            }
        }), v.prototype.destroy = y.destroy, v.prototype._undestroy = y.undestroy, v.prototype._destroy = function(e, t) {
            this.push(null), t(e)
        }, v.prototype.push = function(e, t) {
            var i, r = this._readableState;
            return r.objectMode ? i = !0 : "string" == typeof e && ((t = t || r.defaultEncoding) !== r.encoding && (e = u.from(e, t), t = ""), i = !0), m(this, e, t, !1, i)
        }, v.prototype.unshift = function(e) {
            return m(this, e, null, !0, !1)
        }, v.prototype.isPaused = function() {
            return !1 === this._readableState.flowing
        }, v.prototype.setEncoding = function(e) {
            return p || (p = i(74).StringDecoder), this._readableState.decoder = new p(e), this._readableState.encoding = e, this
        };
        var w = 8388608;

        function E(e, t) {
            return e <= 0 || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e != e ? t.flowing && t.length ? t.buffer.head.data.length : t.length : (e > t.highWaterMark && (t.highWaterMark = function(e) {
                return e >= w ? e = w : (e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++), e
            }(e)), e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0, 0))
        }

        function P(e) {
            var t = e._readableState;
            t.needReadable = !1, t.emittedReadable || (h("emitReadable", t.flowing), t.emittedReadable = !0, t.sync ? n.nextTick(S, e) : S(e))
        }

        function S(e) {
            h("emit readable"), e.emit("readable"), k(e)
        }

        function I(e, t) {
            t.readingMore || (t.readingMore = !0, n.nextTick(T, e, t))
        }

        function T(e, t) {
            for (var i = t.length; !t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark && (h("maybeReadMore read 0"), e.read(0), i !== t.length);) i = t.length;
            t.readingMore = !1
        }

        function M(e) {
            h("readable nexttick read 0"), e.read(0)
        }

        function L(e, t) {
            t.reading || (h("resume read 0"), e.read(0)), t.resumeScheduled = !1, t.awaitDrain = 0, e.emit("resume"), k(e), t.flowing && !t.reading && e.read(0)
        }

        function k(e) {
            var t = e._readableState;
            for (h("flow", t.flowing); t.flowing && null !== e.read(););
        }

        function C(e, t) {
            return 0 === t.length ? null : (t.objectMode ? i = t.buffer.shift() : !e || e >= t.length ? (i = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.head.data : t.buffer.concat(t.length), t.buffer.clear()) : i = function(e, t, i) {
                var r;
                e < t.head.data.length ? (r = t.head.data.slice(0, e), t.head.data = t.head.data.slice(e)) : r = e === t.head.data.length ? t.shift() : i ? function(e, t) {
                    var i = t.head,
                        r = 1,
                        n = i.data;
                    e -= n.length;
                    for (; i = i.next;) {
                        var o = i.data,
                            a = e > o.length ? o.length : e;
                        if (a === o.length ? n += o : n += o.slice(0, e), 0 === (e -= a)) {
                            a === o.length ? (++r, i.next ? t.head = i.next : t.head = t.tail = null) : (t.head = i, i.data = o.slice(a));
                            break
                        }++r
                    }
                    return t.length -= r, n
                }(e, t) : function(e, t) {
                    var i = u.allocUnsafe(e),
                        r = t.head,
                        n = 1;
                    r.data.copy(i), e -= r.data.length;
                    for (; r = r.next;) {
                        var o = r.data,
                            a = e > o.length ? o.length : e;
                        if (o.copy(i, i.length - e, 0, a), 0 === (e -= a)) {
                            a === o.length ? (++n, r.next ? t.head = r.next : t.head = t.tail = null) : (t.head = r, r.data = o.slice(a));
                            break
                        }++n
                    }
                    return t.length -= n, i
                }(e, t);
                return r
            }(e, t.buffer, t.decoder), i);
            var i
        }

        function D(e) {
            var t = e._readableState;
            if (t.length > 0) throw new Error('"endReadable()" called on non-empty stream');
            t.endEmitted || (t.ended = !0, n.nextTick(U, t, e))
        }

        function U(e, t) {
            e.endEmitted || 0 !== e.length || (e.endEmitted = !0, t.readable = !1, t.emit("end"))
        }

        function O(e, t) {
            for (var i = 0, r = e.length; i < r; i++)
                if (e[i] === t) return i;
            return -1
        }
        v.prototype.read = function(e) {
            h("read", e), e = parseInt(e, 10);
            var t = this._readableState,
                i = e;
            if (0 !== e && (t.emittedReadable = !1), 0 === e && t.needReadable && (t.length >= t.highWaterMark || t.ended)) return h("read: emitReadable", t.length, t.ended), 0 === t.length && t.ended ? D(this) : P(this), null;
            if (0 === (e = E(e, t)) && t.ended) return 0 === t.length && D(this), null;
            var r, n = t.needReadable;
            return h("need readable", n), (0 === t.length || t.length - e < t.highWaterMark) && h("length less than watermark", n = !0), t.ended || t.reading ? h("reading or ended", n = !1) : n && (h("do read"), t.reading = !0, t.sync = !0, 0 === t.length && (t.needReadable = !0), this._read(t.highWaterMark), t.sync = !1, t.reading || (e = E(i, t))), null === (r = e > 0 ? C(e, t) : null) ? (t.needReadable = !0, e = 0) : t.length -= e, 0 === t.length && (t.ended || (t.needReadable = !0), i !== e && t.ended && D(this)), null !== r && this.emit("data", r), r
        }, v.prototype._read = function(e) {
            this.emit("error", new Error("_read() is not implemented"))
        }, v.prototype.pipe = function(e, t) {
            var i = this,
                o = this._readableState;
            switch (o.pipesCount) {
                case 0:
                    o.pipes = e;
                    break;
                case 1:
                    o.pipes = [o.pipes, e];
                    break;
                default:
                    o.pipes.push(e)
            }
            o.pipesCount += 1, h("pipe count=%d opts=%j", o.pipesCount, t);
            var d = (!t || !1 !== t.end) && e !== r.stdout && e !== r.stderr ? f : v;

            function u(t, r) {
                h("onunpipe"), t === i && r && !1 === r.hasUnpiped && (r.hasUnpiped = !0, h("cleanup"), e.removeListener("close", b), e.removeListener("finish", g), e.removeListener("drain", c), e.removeListener("error", y), e.removeListener("unpipe", u), i.removeListener("end", f), i.removeListener("end", v), i.removeListener("data", _), l = !0, !o.awaitDrain || e._writableState && !e._writableState.needDrain || c())
            }

            function f() {
                h("onend"), e.end()
            }
            o.endEmitted ? n.nextTick(d) : i.once("end", d), e.on("unpipe", u);
            var c = function(e) {
                return function() {
                    var t = e._readableState;
                    h("pipeOnDrain", t.awaitDrain), t.awaitDrain && t.awaitDrain--, 0 === t.awaitDrain && s(e, "data") && (t.flowing = !0, k(e))
                }
            }(i);
            e.on("drain", c);
            var l = !1;
            var p = !1;

            function _(t) {
                h("ondata"), p = !1, !1 !== e.write(t) || p || ((1 === o.pipesCount && o.pipes === e || o.pipesCount > 1 && -1 !== O(o.pipes, e)) && !l && (h("false write response, pause", i._readableState.awaitDrain), i._readableState.awaitDrain++, p = !0), i.pause())
            }

            function y(t) {
                h("onerror", t), v(), e.removeListener("error", y), 0 === s(e, "error") && e.emit("error", t)
            }

            function b() {
                e.removeListener("finish", g), v()
            }

            function g() {
                h("onfinish"), e.removeListener("close", b), v()
            }

            function v() {
                h("unpipe"), i.unpipe(e)
            }
            return i.on("data", _),
                function(e, t, i) {
                    if ("function" == typeof e.prependListener) return e.prependListener(t, i);
                    e._events && e._events[t] ? a(e._events[t]) ? e._events[t].unshift(i) : e._events[t] = [i, e._events[t]] : e.on(t, i)
                }(e, "error", y), e.once("close", b), e.once("finish", g), e.emit("pipe", i), o.flowing || (h("pipe resume"), i.resume()), e
        }, v.prototype.unpipe = function(e) {
            var t = this._readableState,
                i = {
                    hasUnpiped: !1
                };
            if (0 === t.pipesCount) return this;
            if (1 === t.pipesCount) return e && e !== t.pipes ? this : (e || (e = t.pipes), t.pipes = null, t.pipesCount = 0, t.flowing = !1, e && e.emit("unpipe", this, i), this);
            if (!e) {
                var r = t.pipes,
                    n = t.pipesCount;
                t.pipes = null, t.pipesCount = 0, t.flowing = !1;
                for (var o = 0; o < n; o++) r[o].emit("unpipe", this, i);
                return this
            }
            var a = O(t.pipes, e);
            return -1 === a ? this : (t.pipes.splice(a, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this, i), this)
        }, v.prototype.on = function(e, t) {
            var i = d.prototype.on.call(this, e, t);
            if ("data" === e) !1 !== this._readableState.flowing && this.resume();
            else if ("readable" === e) {
                var r = this._readableState;
                r.endEmitted || r.readableListening || (r.readableListening = r.needReadable = !0, r.emittedReadable = !1, r.reading ? r.length && P(this) : n.nextTick(M, this))
            }
            return i
        }, v.prototype.addListener = v.prototype.on, v.prototype.resume = function() {
            var e = this._readableState;
            return e.flowing || (h("resume"), e.flowing = !0, function(e, t) {
                t.resumeScheduled || (t.resumeScheduled = !0, n.nextTick(L, e, t))
            }(this, e)), this
        }, v.prototype.pause = function() {
            return h("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (h("pause"), this._readableState.flowing = !1, this.emit("pause")), this
        }, v.prototype.wrap = function(e) {
            var t = this,
                i = this._readableState,
                r = !1;
            for (var n in e.on("end", function() {
                    if (h("wrapped end"), i.decoder && !i.ended) {
                        var e = i.decoder.end();
                        e && e.length && t.push(e)
                    }
                    t.push(null)
                }), e.on("data", function(n) {
                    (h("wrapped data"), i.decoder && (n = i.decoder.write(n)), !i.objectMode || null !== n && void 0 !== n) && ((i.objectMode || n && n.length) && (t.push(n) || (r = !0, e.pause())))
                }), e) void 0 === this[n] && "function" == typeof e[n] && (this[n] = function(t) {
                return function() {
                    return e[t].apply(e, arguments)
                }
            }(n));
            for (var o = 0; o < b.length; o++) e.on(b[o], this.emit.bind(this, b[o]));
            return this._read = function(t) {
                h("wrapped _read", t), r && (r = !1, e.resume())
            }, this
        }, Object.defineProperty(v.prototype, "readableHighWaterMark", {
            enumerable: !1,
            get: function() {
                return this._readableState.highWaterMark
            }
        }), v._fromList = C
    }).call(this, i(38), i(128))
}, function(e, t, i) {
    "use strict";
    var r, n = t,
        o = i(13),
        a = i(61),
        s = a.utils.assert;

    function d(e) {
        "short" === e.type ? this.curve = new a.curve.short(e) : "edwards" === e.type ? this.curve = new a.curve.edwards(e) : this.curve = new a.curve.mont(e), this.g = this.curve.g, this.n = this.curve.n, this.hash = e.hash, s(this.g.validate(), "Invalid curve"), s(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O")
    }

    function u(e, t) {
        Object.defineProperty(n, e, {
            configurable: !0,
            enumerable: !0,
            get: function() {
                var i = new d(t);
                return Object.defineProperty(n, e, {
                    configurable: !0,
                    enumerable: !0,
                    value: i
                }), i
            }
        })
    }
    n.PresetCurve = d, u("p192", {
        type: "short",
        prime: "p192",
        p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
        a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
        b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
        n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
        hash: o.sha256,
        gRed: !1,
        g: ["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]
    }), u("p224", {
        type: "short",
        prime: "p224",
        p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
        a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
        b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
        n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
        hash: o.sha256,
        gRed: !1,
        g: ["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]
    }), u("p256", {
        type: "short",
        prime: null,
        p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
        a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
        b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
        n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
        hash: o.sha256,
        gRed: !1,
        g: ["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]
    }), u("p384", {
        type: "short",
        prime: null,
        p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
        a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
        b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
        n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
        hash: o.sha384,
        gRed: !1,
        g: ["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"]
    }), u("p521", {
        type: "short",
        prime: null,
        p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
        a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
        b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
        n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
        hash: o.sha512,
        gRed: !1,
        g: ["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"]
    }), u("curve25519", {
        type: "mont",
        prime: "p25519",
        p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
        a: "76d06",
        b: "1",
        n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
        hash: o.sha256,
        gRed: !1,
        g: ["9"]
    }), u("ed25519", {
        type: "edwards",
        prime: "p25519",
        p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
        a: "-1",
        c: "1",
        d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
        n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
        hash: o.sha256,
        gRed: !1,
        g: ["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a", "6666666666666666666666666666666666666666666666666666666666666658"]
    });
    try {
        r = i(167)
    } catch (e) {
        r = void 0
    }
    u("secp256k1", {
        type: "short",
        prime: "k256",
        p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
        a: "0",
        b: "7",
        n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
        h: "1",
        hash: o.sha256,
        beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
        lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
        basis: [{
            a: "3086d221a7d46bcde86c90e49284eb15",
            b: "-e4437ed6010e88286f547fa90abfe4c3"
        }, {
            a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
            b: "3086d221a7d46bcde86c90e49284eb15"
        }],
        gRed: !1,
        g: ["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", r]
    })
}, function(e, t, i) {
    "use strict";
    var r = i(101),
        n = Object.keys || function(e) {
            var t = [];
            for (var i in e) t.push(i);
            return t
        };
    e.exports = c;
    var o = i(9);
    o.inherits = i(39);
    var a = i(164),
        s = i(87);
    o.inherits(c, a);
    for (var d = n(s.prototype), u = 0; u < d.length; u++) {
        var f = d[u];
        c.prototype[f] || (c.prototype[f] = s.prototype[f])
    }

    function c(e) {
        if (!(this instanceof c)) return new c(e);
        a.call(this, e), s.call(this, e), e && !1 === e.readable && (this.readable = !1), e && !1 === e.writable && (this.writable = !1), this.allowHalfOpen = !0, e && !1 === e.allowHalfOpen && (this.allowHalfOpen = !1), this.once("end", l)
    }

    function l() {
        this.allowHalfOpen || this._writableState.ended || r.nextTick(h, this)
    }

    function h(e) {
        e.end()
    }
    Object.defineProperty(c.prototype, "writableHighWaterMark", {
        enumerable: !1,
        get: function() {
            return this._writableState.highWaterMark
        }
    }), Object.defineProperty(c.prototype, "destroyed", {
        get: function() {
            return void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed && this._writableState.destroyed)
        },
        set: function(e) {
            void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = e, this._writableState.destroyed = e)
        }
    }), c.prototype._destroy = function(e, t) {
        this.push(null), this.end(), r.nextTick(t, e)
    }
}, function(e, t) {
    e.exports = {
        doubles: {
            step: 4,
            points: [
                ["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a", "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"],
                ["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508", "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"],
                ["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739", "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"],
                ["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640", "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"],
                ["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c", "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"],
                ["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda", "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"],
                ["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa", "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"],
                ["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0", "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"],
                ["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d", "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"],
                ["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d", "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"],
                ["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1", "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"],
                ["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0", "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"],
                ["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047", "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"],
                ["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862", "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"],
                ["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7", "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"],
                ["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd", "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"],
                ["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83", "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"],
                ["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a", "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"],
                ["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8", "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"],
                ["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d", "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"],
                ["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725", "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"],
                ["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754", "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"],
                ["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c", "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"],
                ["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6", "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"],
                ["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39", "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"],
                ["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891", "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"],
                ["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b", "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"],
                ["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03", "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"],
                ["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d", "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"],
                ["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070", "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"],
                ["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4", "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"],
                ["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da", "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"],
                ["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11", "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"],
                ["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e", "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"],
                ["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41", "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"],
                ["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef", "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"],
                ["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8", "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"],
                ["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d", "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"],
                ["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96", "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"],
                ["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd", "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"],
                ["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5", "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"],
                ["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266", "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"],
                ["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71", "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"],
                ["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac", "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"],
                ["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751", "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"],
                ["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e", "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"],
                ["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241", "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"],
                ["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3", "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"],
                ["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f", "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"],
                ["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19", "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"],
                ["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be", "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"],
                ["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9", "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"],
                ["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2", "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"],
                ["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13", "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"],
                ["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c", "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"],
                ["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba", "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"],
                ["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151", "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"],
                ["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073", "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"],
                ["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458", "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"],
                ["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b", "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"],
                ["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366", "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"],
                ["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa", "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"],
                ["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0", "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"],
                ["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787", "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"],
                ["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e", "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"]
            ]
        },
        naf: {
            wnd: 7,
            points: [
                ["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9", "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"],
                ["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4", "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"],
                ["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc", "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"],
                ["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe", "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"],
                ["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb", "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"],
                ["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8", "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"],
                ["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e", "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"],
                ["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34", "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"],
                ["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c", "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"],
                ["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5", "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"],
                ["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f", "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"],
                ["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714", "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"],
                ["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729", "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"],
                ["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db", "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"],
                ["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4", "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"],
                ["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5", "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"],
                ["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479", "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"],
                ["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d", "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"],
                ["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f", "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"],
                ["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb", "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"],
                ["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9", "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"],
                ["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963", "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"],
                ["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74", "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"],
                ["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530", "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"],
                ["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b", "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"],
                ["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247", "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"],
                ["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1", "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"],
                ["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120", "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"],
                ["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435", "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"],
                ["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18", "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"],
                ["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8", "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"],
                ["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb", "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"],
                ["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f", "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"],
                ["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143", "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"],
                ["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba", "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"],
                ["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45", "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"],
                ["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a", "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"],
                ["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e", "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"],
                ["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8", "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"],
                ["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c", "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"],
                ["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519", "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"],
                ["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab", "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"],
                ["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca", "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"],
                ["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf", "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"],
                ["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610", "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"],
                ["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4", "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"],
                ["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c", "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"],
                ["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940", "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"],
                ["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980", "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"],
                ["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3", "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"],
                ["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf", "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"],
                ["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63", "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"],
                ["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448", "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"],
                ["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf", "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"],
                ["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5", "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"],
                ["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6", "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"],
                ["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5", "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"],
                ["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99", "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"],
                ["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51", "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"],
                ["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5", "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"],
                ["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5", "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"],
                ["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997", "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"],
                ["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881", "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"],
                ["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5", "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"],
                ["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66", "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"],
                ["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726", "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"],
                ["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede", "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"],
                ["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94", "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"],
                ["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31", "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"],
                ["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51", "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"],
                ["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252", "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"],
                ["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5", "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"],
                ["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b", "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"],
                ["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4", "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"],
                ["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f", "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"],
                ["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889", "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"],
                ["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246", "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"],
                ["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984", "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"],
                ["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a", "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"],
                ["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030", "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"],
                ["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197", "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"],
                ["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593", "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"],
                ["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef", "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"],
                ["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38", "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"],
                ["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a", "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"],
                ["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111", "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"],
                ["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502", "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"],
                ["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea", "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"],
                ["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26", "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"],
                ["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986", "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"],
                ["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e", "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"],
                ["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4", "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"],
                ["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda", "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"],
                ["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859", "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"],
                ["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f", "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"],
                ["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c", "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"],
                ["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942", "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"],
                ["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a", "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"],
                ["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80", "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"],
                ["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d", "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"],
                ["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1", "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"],
                ["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63", "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"],
                ["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352", "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"],
                ["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193", "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"],
                ["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00", "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"],
                ["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58", "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"],
                ["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7", "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"],
                ["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8", "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"],
                ["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e", "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"],
                ["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d", "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"],
                ["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b", "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"],
                ["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f", "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"],
                ["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6", "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"],
                ["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297", "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"],
                ["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a", "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"],
                ["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c", "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"],
                ["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52", "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"],
                ["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb", "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"],
                ["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065", "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"],
                ["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917", "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"],
                ["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9", "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"],
                ["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3", "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"],
                ["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57", "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"],
                ["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66", "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"],
                ["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8", "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"],
                ["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721", "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"],
                ["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180", "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"]
            ]
        }
    }
}]);