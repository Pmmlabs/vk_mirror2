! function(t) {
    var e = {};

    function i(r) {
        if (e[r]) return e[r].exports;
        var n = e[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return t[r].call(n.exports, n, n.exports, i), n.l = !0, n.exports
    }
    i.m = t, i.c = e, i.d = function(t, e, r) {
        i.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: r
        })
    }, i.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, i.t = function(t, e) {
        if (1 & e && (t = i(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (i.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var n in t) i.d(r, n, function(e) {
                return t[e]
            }.bind(null, n));
        return r
    }, i.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return i.d(e, "a", e), e
    }, i.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, i.p = "", i(i.s = 767)
}([function(t, e, i) {
    "use strict";
    var r = e,
        n = i(218),
        o = i(214),
        a = i(129);
    r.assert = o, r.toArray = a.toArray, r.zero2 = a.zero2, r.toHex = a.toHex, r.encode = a.encode, r.getNAF = function(t, e) {
        for (var i = [], r = 1 << e + 1, n = t.clone(); n.cmpn(1) >= 0;) {
            var o;
            if (n.isOdd()) {
                var a = n.andln(r - 1);
                o = a > (r >> 1) - 1 ? (r >> 1) - a : a, n.isubn(o)
            } else o = 0;
            i.push(o);
            for (var s = 0 !== n.cmpn(0) && 0 === n.andln(r - 1) ? e + 1 : 1, u = 1; u < s; u++) i.push(0);
            n.iushrn(s)
        }
        return i
    }, r.getJSF = function(t, e) {
        var i = [
            [],
            []
        ];
        t = t.clone(), e = e.clone();
        for (var r = 0, n = 0; t.cmpn(-r) > 0 || e.cmpn(-n) > 0;) {
            var o, a, s, u = t.andln(3) + r & 3,
                d = e.andln(3) + n & 3;
            3 === u && (u = -1), 3 === d && (d = -1), o = 0 == (1 & u) ? 0 : 3 != (s = t.andln(7) + r & 7) && 5 !== s || 2 !== d ? u : -u, i[0].push(o), a = 0 == (1 & d) ? 0 : 3 != (s = e.andln(7) + n & 7) && 5 !== s || 2 !== u ? d : -d, i[1].push(a), 2 * r === o + 1 && (r = 1 - r), 2 * n === a + 1 && (n = 1 - n), t.iushrn(1), e.iushrn(1)
        }
        return i
    }, r.cachedProperty = function(t, e, i) {
        var r = "_" + e;
        t.prototype[e] = function() {
            return void 0 !== this[r] ? this[r] : this[r] = i.call(this)
        }
    }, r.parseBytes = function(t) {
        return "string" == typeof t ? r.toArray(t, "hex") : t
    }, r.intFromLE = function(t) {
        return new n(t, "hex", "le")
    }
}, , , , function(t) {
    t.exports = {
        "1.3.132.0.10": "secp256k1",
        "1.3.132.0.33": "p224",
        "1.2.840.10045.3.1.1": "p192",
        "1.2.840.10045.3.1.7": "p256",
        "1.3.132.0.34": "p384",
        "1.3.132.0.35": "p521"
    }
}, function(t, e, i) {
    "use strict";

    function r(t, e) {
        cur.audioPage && cur.audioPage.showRecoms(!1, e.fullId)
    }
    i.r(e), i.d(e, "showRecoms", function() {
        return r
    })
}, , , function(t, e, i) {
    "use strict";
    var r = i(436),
        n = i(673);

    function o() {
        if (!(this instanceof o)) return new o;
        n.call(this), this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]
    }
    r.inherits(o, n), t.exports = o, o.blockSize = 512, o.outSize = 224, o.hmacStrength = 192, o.padLength = 64, o.prototype._digest = function(t) {
        return "hex" === t ? r.toHex32(this.h.slice(0, 7), "big") : r.split32(this.h.slice(0, 7), "big")
    }
}, function(t, e, i) {
    "use strict";

    function r(t) {
        return '<div class="audio_album_part_row">' + getLang("audio_album_part").replace("{part}", t) + "</div>"
    }
    i.r(e), i.d(e, "drawAlbumPartRow", function() {
        return r
    })
}, , function(t, e, i) {
    "use strict";
    var r = i(581),
        n = i(414),
        o = i(147),
        a = i(484),
        s = i(189);

    function u(t) {
        s.call(this, "digest"), this._hash = t
    }
    r(u, s), u.prototype._update = function(t) {
        this._hash.update(t)
    }, u.prototype._final = function() {
        return this._hash.digest()
    }, t.exports = function(t) {
        return "md5" === (t = t.toLowerCase()) ? new n : "rmd160" === t || "ripemd160" === t ? new o : new u(a(t))
    }
}, , , , , , , , , , function(t, e) {}, , , function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "AUDIO_PLAYER_ENUMS", function() {
        return r
    });
    var r = {
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
        AUDIO_ITEM_INDEX_TRACK_CODE: 20,
        AUDIO_ITEM_INDEX_RESTRICTION: 21,
        AUDIO_ITEM_INDEX_ALBUM_PART: 22,
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
        AUDIO_DURATION_CLS: "audio_row__duration",
        AUDIO_LAYER_HEIGHT: 550,
        AUDIO_LAYER_MIN_WIDTH: 400,
        AUDIO_LAYER_MAX_WIDTH: 1e3,
        AUDIO_HQ_LABEL_CLS: "audio_hq_label_show",
        AUDIO_MAX_AUDIOS_IN_SNIPPET: 5,
        AUDIO_ROW_COVER_SIZE: 40,
        AUDIO_ROW_PLAY_SIZE: 24,
        AUDIO_ROW_ACTION_ROW_ITEM: '<div role="button" class="audio_row__more_action audio_row__more_action_%0% _audio_row__more_action_%0% %3%">%2%</div>',
        LOG_LS_KEY: "audiolog"
    }
}, , function(t, e, i) {
    t.exports = i(389).Transform
}, , , , , function(t, e, i) {
    "use strict";
    var r = i(93);
    e.certificate = i(685);
    var n = r.define("RSAPrivateKey", function() {
        this.seq().obj(this.key("version").int(), this.key("modulus").int(), this.key("publicExponent").int(), this.key("privateExponent").int(), this.key("prime1").int(), this.key("prime2").int(), this.key("exponent1").int(), this.key("exponent2").int(), this.key("coefficient").int())
    });
    e.RSAPrivateKey = n;
    var o = r.define("RSAPublicKey", function() {
        this.seq().obj(this.key("modulus").int(), this.key("publicExponent").int())
    });
    e.RSAPublicKey = o;
    var a = r.define("SubjectPublicKeyInfo", function() {
        this.seq().obj(this.key("algorithm").use(s), this.key("subjectPublicKey").bitstr())
    });
    e.PublicKey = a;
    var s = r.define("AlgorithmIdentifier", function() {
            this.seq().obj(this.key("algorithm").objid(), this.key("none").null_().optional(), this.key("curve").objid().optional(), this.key("params").seq().obj(this.key("p").int(), this.key("q").int(), this.key("g").int()).optional())
        }),
        u = r.define("PrivateKeyInfo", function() {
            this.seq().obj(this.key("version").int(), this.key("algorithm").use(s), this.key("subjectPrivateKey").octstr())
        });
    e.PrivateKey = u;
    var d = r.define("EncryptedPrivateKeyInfo", function() {
        this.seq().obj(this.key("algorithm").seq().obj(this.key("id").objid(), this.key("decrypt").seq().obj(this.key("kde").seq().obj(this.key("id").objid(), this.key("kdeparams").seq().obj(this.key("salt").octstr(), this.key("iters").int())), this.key("cipher").seq().obj(this.key("algo").objid(), this.key("iv").octstr()))), this.key("subjectPrivateKey").octstr())
    });
    e.EncryptedPrivateKey = d;
    var c = r.define("DSAPrivateKey", function() {
        this.seq().obj(this.key("version").int(), this.key("p").int(), this.key("q").int(), this.key("g").int(), this.key("pub_key").int(), this.key("priv_key").int())
    });
    e.DSAPrivateKey = c, e.DSAparam = r.define("DSAparam", function() {
        this.int()
    });
    var f = r.define("ECPrivateKey", function() {
        this.seq().obj(this.key("version").int(), this.key("privateKey").octstr(), this.key("parameters").optional().explicit(0).use(l), this.key("publicKey").optional().explicit(1).bitstr())
    });
    e.ECPrivateKey = f;
    var l = r.define("ECParameters", function() {
        this.choice({
            namedCurve: this.objid()
        })
    });
    e.signature = r.define("signature", function() {
        this.seq().obj(this.key("r").int(), this.key("s").int())
    })
}, , function(t, e, i) {
    "use strict";

    function r() {
        return hasClass(document.body, AudioUtils.AUDIO_HQ_LABEL_CLS)
    }
    i.r(e), i.d(e, "hasAudioHQBodyClass", function() {
        return r
    })
}, , , , , function(t, e, i) {
    "use strict";
    var r = i(436).rotr32;

    function n(t, e, i) {
        return t & e ^ ~t & i
    }

    function o(t, e, i) {
        return t & e ^ t & i ^ e & i
    }

    function a(t, e, i) {
        return t ^ e ^ i
    }
    e.ft_1 = function(t, e, i, r) {
        return 0 === t ? n(e, i, r) : 1 === t || 3 === t ? a(e, i, r) : 2 === t ? o(e, i, r) : void 0
    }, e.ch32 = n, e.maj32 = o, e.p32 = a, e.s0_256 = function(t) {
        return r(t, 2) ^ r(t, 13) ^ r(t, 22)
    }, e.s1_256 = function(t) {
        return r(t, 6) ^ r(t, 11) ^ r(t, 25)
    }, e.g0_256 = function(t) {
        return r(t, 7) ^ r(t, 18) ^ t >>> 3
    }, e.g1_256 = function(t) {
        return r(t, 17) ^ r(t, 19) ^ t >>> 10
    }
}, function(t, e, i) {
    "use strict";
    var r = i(567),
        n = i(329),
        o = i(218),
        a = i(581),
        s = r.base,
        u = n.utils.assert;

    function d(t) {
        this.twisted = 1 != (0 | t.a), this.mOneA = this.twisted && -1 == (0 | t.a), this.extended = this.mOneA, s.call(this, "edwards", t), this.a = new o(t.a, 16).umod(this.red.m), this.a = this.a.toRed(this.red), this.c = new o(t.c, 16).toRed(this.red), this.c2 = this.c.redSqr(), this.d = new o(t.d, 16).toRed(this.red), this.dd = this.d.redAdd(this.d), u(!this.twisted || 0 === this.c.fromRed().cmpn(1)), this.oneC = 1 == (0 | t.c)
    }

    function c(t, e, i, r, n) {
        s.BasePoint.call(this, t, "projective"), null === e && null === i && null === r ? (this.x = this.curve.zero, this.y = this.curve.one, this.z = this.curve.one, this.t = this.curve.zero, this.zOne = !0) : (this.x = new o(e, 16), this.y = new o(i, 16), this.z = r ? new o(r, 16) : this.curve.one, this.t = n && new o(n, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)), this.zOne = this.z === this.curve.one, this.curve.extended && !this.t && (this.t = this.x.redMul(this.y), this.zOne || (this.t = this.t.redMul(this.z.redInvm()))))
    }
    a(d, s), t.exports = d, d.prototype._mulA = function(t) {
        return this.mOneA ? t.redNeg() : this.a.redMul(t)
    }, d.prototype._mulC = function(t) {
        return this.oneC ? t : this.c.redMul(t)
    }, d.prototype.jpoint = function(t, e, i, r) {
        return this.point(t, e, i, r)
    }, d.prototype.pointFromX = function(t, e) {
        (t = new o(t, 16)).red || (t = t.toRed(this.red));
        var i = t.redSqr(),
            r = this.c2.redSub(this.a.redMul(i)),
            n = this.one.redSub(this.c2.redMul(this.d).redMul(i)),
            a = r.redMul(n.redInvm()),
            s = a.redSqrt();
        if (0 !== s.redSqr().redSub(a).cmp(this.zero)) throw new Error("invalid point");
        var u = s.fromRed().isOdd();
        return (e && !u || !e && u) && (s = s.redNeg()), this.point(t, s)
    }, d.prototype.pointFromY = function(t, e) {
        (t = new o(t, 16)).red || (t = t.toRed(this.red));
        var i = t.redSqr(),
            r = i.redSub(this.one),
            n = i.redMul(this.d).redAdd(this.one),
            a = r.redMul(n.redInvm());
        if (0 === a.cmp(this.zero)) {
            if (e) throw new Error("invalid point");
            return this.point(this.zero, t)
        }
        var s = a.redSqrt();
        if (0 !== s.redSqr().redSub(a).cmp(this.zero)) throw new Error("invalid point");
        return s.isOdd() !== e && (s = s.redNeg()), this.point(s, t)
    }, d.prototype.validate = function(t) {
        if (t.isInfinity()) return !0;
        t.normalize();
        var e = t.x.redSqr(),
            i = t.y.redSqr(),
            r = e.redMul(this.a).redAdd(i),
            n = this.c2.redMul(this.one.redAdd(this.d.redMul(e).redMul(i)));
        return 0 === r.cmp(n)
    }, a(c, s.BasePoint), d.prototype.pointFromJSON = function(t) {
        return c.fromJSON(this, t)
    }, d.prototype.point = function(t, e, i, r) {
        return new c(this, t, e, i, r)
    }, c.fromJSON = function(t, e) {
        return new c(t, e[0], e[1], e[2])
    }, c.prototype.inspect = function() {
        return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
    }, c.prototype.isInfinity = function() {
        return 0 === this.x.cmpn(0) && 0 === this.y.cmp(this.z)
    }, c.prototype._extDbl = function() {
        var t = this.x.redSqr(),
            e = this.y.redSqr(),
            i = this.z.redSqr();
        i = i.redIAdd(i);
        var r = this.curve._mulA(t),
            n = this.x.redAdd(this.y).redSqr().redISub(t).redISub(e),
            o = r.redAdd(e),
            a = o.redSub(i),
            s = r.redSub(e),
            u = n.redMul(a),
            d = o.redMul(s),
            c = n.redMul(s),
            f = a.redMul(o);
        return this.curve.point(u, d, f, c)
    }, c.prototype._projDbl = function() {
        var t, e, i, r = this.x.redAdd(this.y).redSqr(),
            n = this.x.redSqr(),
            o = this.y.redSqr();
        if (this.curve.twisted) {
            var a = (d = this.curve._mulA(n)).redAdd(o);
            if (this.zOne) t = r.redSub(n).redSub(o).redMul(a.redSub(this.curve.two)), e = a.redMul(d.redSub(o)), i = a.redSqr().redSub(a).redSub(a);
            else {
                var s = this.z.redSqr(),
                    u = a.redSub(s).redISub(s);
                t = r.redSub(n).redISub(o).redMul(u), e = a.redMul(d.redSub(o)), i = a.redMul(u)
            }
        } else {
            var d = n.redAdd(o);
            s = this.curve._mulC(this.c.redMul(this.z)).redSqr(), u = d.redSub(s).redSub(s);
            t = this.curve._mulC(r.redISub(d)).redMul(u), e = this.curve._mulC(d).redMul(n.redISub(o)), i = d.redMul(u)
        }
        return this.curve.point(t, e, i)
    }, c.prototype.dbl = function() {
        return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl()
    }, c.prototype._extAdd = function(t) {
        var e = this.y.redSub(this.x).redMul(t.y.redSub(t.x)),
            i = this.y.redAdd(this.x).redMul(t.y.redAdd(t.x)),
            r = this.t.redMul(this.curve.dd).redMul(t.t),
            n = this.z.redMul(t.z.redAdd(t.z)),
            o = i.redSub(e),
            a = n.redSub(r),
            s = n.redAdd(r),
            u = i.redAdd(e),
            d = o.redMul(a),
            c = s.redMul(u),
            f = o.redMul(u),
            l = a.redMul(s);
        return this.curve.point(d, c, l, f)
    }, c.prototype._projAdd = function(t) {
        var e, i, r = this.z.redMul(t.z),
            n = r.redSqr(),
            o = this.x.redMul(t.x),
            a = this.y.redMul(t.y),
            s = this.curve.d.redMul(o).redMul(a),
            u = n.redSub(s),
            d = n.redAdd(s),
            c = this.x.redAdd(this.y).redMul(t.x.redAdd(t.y)).redISub(o).redISub(a),
            f = r.redMul(u).redMul(c);
        return this.curve.twisted ? (e = r.redMul(d).redMul(a.redSub(this.curve._mulA(o))), i = u.redMul(d)) : (e = r.redMul(d).redMul(a.redSub(o)), i = this.curve._mulC(u).redMul(d)), this.curve.point(f, e, i)
    }, c.prototype.add = function(t) {
        return this.isInfinity() ? t : t.isInfinity() ? this : this.curve.extended ? this._extAdd(t) : this._projAdd(t)
    }, c.prototype.mul = function(t) {
        return this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve._wnafMul(this, t)
    }, c.prototype.mulAdd = function(t, e, i) {
        return this.curve._wnafMulAdd(1, [this, e], [t, i], 2, !1)
    }, c.prototype.jmulAdd = function(t, e, i) {
        return this.curve._wnafMulAdd(1, [this, e], [t, i], 2, !0)
    }, c.prototype.normalize = function() {
        if (this.zOne) return this;
        var t = this.z.redInvm();
        return this.x = this.x.redMul(t), this.y = this.y.redMul(t), this.t && (this.t = this.t.redMul(t)), this.z = this.curve.one, this.zOne = !0, this
    }, c.prototype.neg = function() {
        return this.curve.point(this.x.redNeg(), this.y, this.z, this.t && this.t.redNeg())
    }, c.prototype.getX = function() {
        return this.normalize(), this.x.fromRed()
    }, c.prototype.getY = function() {
        return this.normalize(), this.y.fromRed()
    }, c.prototype.eq = function(t) {
        return this === t || 0 === this.getX().cmp(t.getX()) && 0 === this.getY().cmp(t.getY())
    }, c.prototype.eqXToP = function(t) {
        var e = t.toRed(this.curve.red).redMul(this.z);
        if (0 === this.x.cmp(e)) return !0;
        for (var i = t.clone(), r = this.curve.redN.redMul(this.z);;) {
            if (i.iadd(this.curve.n), i.cmp(this.curve.p) >= 0) return !1;
            if (e.redIAdd(r), 0 === this.x.cmp(e)) return !0
        }
        return !1
    }, c.prototype.toP = c.prototype.normalize, c.prototype.mixedAdd = c.prototype.add
}, function(t, e, i) {
    "use strict";

    function r(t, e) {
        e = AudioUtils.asObject(e), AudioUtils.isPodcast(e) && showPodcast(t, e.fullId, null, "audio")
    }
    i.r(e), i.d(e, "openEpisode", function() {
        return r
    })
}, , function(t, e, i) {
    var r = i(724),
        n = i(307).Buffer,
        o = i(378),
        a = i(722),
        s = i(189),
        u = i(511),
        d = i(674);

    function c(t, e, i) {
        s.call(this), this._cache = new f, this._last = void 0, this._cipher = new u.AES(e), this._prev = n.from(i), this._mode = t, this._autopadding = !0
    }

    function f() {
        this.cache = n.allocUnsafe(0)
    }

    function l(t, e, i) {
        var s = o[t.toLowerCase()];
        if (!s) throw new TypeError("invalid suite type");
        if ("string" == typeof i && (i = n.from(i)), "GCM" !== s.mode && i.length !== s.iv) throw new TypeError("invalid iv length " + i.length);
        if ("string" == typeof e && (e = n.from(e)), e.length !== s.key / 8) throw new TypeError("invalid key length " + e.length);
        return "stream" === s.type ? new a(s.module, e, i, !0) : "auth" === s.type ? new r(s.module, e, i, !0) : new c(s.module, e, i)
    }
    i(581)(c, s), c.prototype._update = function(t) {
        var e, i;
        this._cache.add(t);
        for (var r = []; e = this._cache.get(this._autopadding);) i = this._mode.decrypt(this, e), r.push(i);
        return n.concat(r)
    }, c.prototype._final = function() {
        var t = this._cache.flush();
        if (this._autopadding) return function(t) {
            var e = t[15];
            if (e < 1 || e > 16) throw new Error("unable to decrypt data");
            var i = -1;
            for (; ++i < e;)
                if (t[i + (16 - e)] !== e) throw new Error("unable to decrypt data");
            if (16 === e) return;
            return t.slice(0, 16 - e)
        }(this._mode.decrypt(this, t));
        if (t) throw new Error("data not multiple of block length")
    }, c.prototype.setAutoPadding = function(t) {
        return this._autopadding = !!t, this
    }, f.prototype.add = function(t) {
        this.cache = n.concat([this.cache, t])
    }, f.prototype.get = function(t) {
        var e;
        if (t) {
            if (this.cache.length > 16) return e = this.cache.slice(0, 16), this.cache = this.cache.slice(16), e
        } else if (this.cache.length >= 16) return e = this.cache.slice(0, 16), this.cache = this.cache.slice(16), e;
        return null
    }, f.prototype.flush = function() {
        if (this.cache.length) return this.cache
    }, e.createDecipher = function(t, e) {
        var i = o[t.toLowerCase()];
        if (!i) throw new TypeError("invalid suite type");
        var r = d(e, !1, i.key, i.iv);
        return l(t, r.key, r.iv)
    }, e.createDecipheriv = l
}, function(t, e, i) {
    "use strict";

    function r(t, e, i, r, n) {
        function o(e) {
            return domData(t, "in-progress", intval(e))
        }
        if (window.tooltips && tooltips.hideAll(), !intval(domData(t, "in-progress"))) {
            o(!0);
            var a = !1;
            e.isClaimed && (a = !0);
            var s = AudioUtils.getAddRestoreInfo(),
                u = s[e.fullId];
            if (u && u.deleteAll) showFastBox({
                title: getLang("audio_delete_all_title"),
                dark: 1
            }, u.deleteConfirmMsg || "", getLang("global_delete"), function(t) {
                var e = extend({
                    act: "delete_all"
                }, u.deleteAll);
                ajax.post("al_audio.php", e, {
                    showProgress: lockButton.pbind(t),
                    onDone: function() {
                        var t = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, u.deleteAll.from_id, AudioPlaylist.DEFAULT_PLAYLIST_ID);
                        getAudioPlayer().deletePlaylist(t), nav.reload()
                    }
                })
            }, getLang("global_cancel"));
            else {
                if (a ? re(t) : addClass(t, "audio_row__deleted"), n) {
                    ajax.post("al_audio.php", {
                        act: "remove_listened",
                        audio_id: e.id,
                        audio_owner_id: e.ownerId,
                        hash: e.actionHash
                    }), re(t);
                    var d = getAudioPlayer().getCurrentPlaylist();
                    d.getType() == AudioPlaylist.TYPE_RECOM && d.getAlbumId() == AudioUtils.AUDIO_RECOMS_TYPE_LISTENED && d.removeAudio(e.fullId)
                } else if (r) {
                    var c = {
                        act: "hide_recommendation",
                        hash: AudioUtils.getAudioExtra(e).recom.hash,
                        audio_id: e.fullId
                    };
                    nav.objLoc.audio_id && (c.recommendation_type = "query"), ajax.post("al_audio.php", c, {
                        onDone: function() {
                            o(!1)
                        }
                    }), s[e.fullId] = {
                        state: "recom_hidden"
                    };
                    var f = getAudioPlayer().getCurrentPlaylist();
                    f && f.getType() == AudioPlaylist.TYPE_RECOM && (s[e.fullId].removedCurrentPos = f.removeAudio(e))
                } else ajax.post("al_audio.php", {
                    act: "delete_audio",
                    oid: e.ownerId,
                    aid: e.id,
                    hash: e.deleteHash,
                    restore: 1,
                    track_code: e.trackCode
                }, {
                    onDone: function(i, r) {
                        a || o(!1), s[e.fullId] = {
                            state: "deleted",
                            deleteAll: i,
                            deleteConfirmMsg: r
                        }, a && AudioUtils.deleteDeletedAudios(), AudioUtils.onRowOver(t, !1, !0)
                    }
                });
                AudioUtils.onRowOver(t, !1, !0)
            }
        }
    }
    i.r(e), i.d(e, "deleteAudio", function() {
        return r
    })
}, , , , function(t, e, i) {
    "use strict";

    function r(t, e) {
        e.isInEditBox || showBox("al_audio.php", {
            act: "get_uma_restrictions_album",
            playlist_raw_id: t
        }, {
            params: {
                width: 750
            }
        })
    }
    i.r(e), i.d(e, "getUMAInfoAlbum", function() {
        return r
    })
}, function(t, e, i) {
    "use strict";
    e.byteLength = function(t) {
        var e = d(t),
            i = e[0],
            r = e[1];
        return 3 * (i + r) / 4 - r
    }, e.toByteArray = function(t) {
        for (var e, i = d(t), r = i[0], a = i[1], s = new o(function(t, e, i) {
                return 3 * (e + i) / 4 - i
            }(0, r, a)), u = 0, c = a > 0 ? r - 4 : r, f = 0; f < c; f += 4) e = n[t.charCodeAt(f)] << 18 | n[t.charCodeAt(f + 1)] << 12 | n[t.charCodeAt(f + 2)] << 6 | n[t.charCodeAt(f + 3)], s[u++] = e >> 16 & 255, s[u++] = e >> 8 & 255, s[u++] = 255 & e;
        2 === a && (e = n[t.charCodeAt(f)] << 2 | n[t.charCodeAt(f + 1)] >> 4, s[u++] = 255 & e);
        1 === a && (e = n[t.charCodeAt(f)] << 10 | n[t.charCodeAt(f + 1)] << 4 | n[t.charCodeAt(f + 2)] >> 2, s[u++] = e >> 8 & 255, s[u++] = 255 & e);
        return s
    }, e.fromByteArray = function(t) {
        for (var e, i = t.length, n = i % 3, o = [], a = 0, s = i - n; a < s; a += 16383) o.push(c(t, a, a + 16383 > s ? s : a + 16383));
        1 === n ? (e = t[i - 1], o.push(r[e >> 2] + r[e << 4 & 63] + "==")) : 2 === n && (e = (t[i - 2] << 8) + t[i - 1], o.push(r[e >> 10] + r[e >> 4 & 63] + r[e << 2 & 63] + "="));
        return o.join("")
    };
    for (var r = [], n = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, u = a.length; s < u; ++s) r[s] = a[s], n[a.charCodeAt(s)] = s;

    function d(t) {
        var e = t.length;
        if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        var i = t.indexOf("=");
        return -1 === i && (i = e), [i, i === e ? 0 : 4 - i % 4]
    }

    function c(t, e, i) {
        for (var n, o, a = [], s = e; s < i; s += 3) n = (t[s] << 16 & 16711680) + (t[s + 1] << 8 & 65280) + (255 & t[s + 2]), a.push(r[(o = n) >> 18 & 63] + r[o >> 12 & 63] + r[o >> 6 & 63] + r[63 & o]);
        return a.join("")
    }
    n["-".charCodeAt(0)] = 62, n["_".charCodeAt(0)] = 63
}, , , function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "AudioPlaylist", function() {
        return AudioPlaylist
    });
    var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(462),
        _playlist_loadAllPlaylistAudios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(671);

    function _classCallCheck(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    var AudioPlaylist = function() {
        function AudioPlaylist(t, e, i) {
            _classCallCheck(this, AudioPlaylist), getAudioPlayer().addPlaylist(this);
            var r = {};
            if (t && isFunction(t.getId)) return this._ref = t, void getAudioPlayer().addPlaylist(this);
            isObject(t) ? r = t : (r.ownerId = e, r.type = t, r.albumId = i || ++AudioPlaylist.plIndex), this._type = r.type, this._ownerId = r.ownerId || vk.id, this._albumId = r.albumId || 0, this._fromId = r.fromId || 0, this._list = [], this.mergeWith(r)
        }
        return AudioPlaylist.prototype.getId = function() {
            return this.getType() + "_" + this.getOwnerId() + "_" + this.getAlbumId()
        }, AudioPlaylist.prototype.getFullId = function() {
            return this.getOwnerId() + "_" + this.getAlbumId() + (this.getAccessHash() ? "_" + this.getAccessHash() : "")
        }, AudioPlaylist.prototype.isReference = function() {
            return !!this._ref
        }, AudioPlaylist.prototype.getSelf = function() {
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
        }, AudioPlaylist.prototype.getTotalCount = function() {
            return this.getSelf()._totalCount
        }, AudioPlaylist.prototype.getTotalCountHash = function() {
            return this.getSelf()._totalCountHash
        }, AudioPlaylist.prototype.getShuffle = function() {
            return this.getSelf()._shuffle
        }, AudioPlaylist.prototype.getFriendId = function() {
            return this.getSelf()._friend
        }, AudioPlaylist.prototype.getNextOffset = function() {
            var t = this.getSelf();
            return t._forceReload ? (t._forceReload = !1, 0) : t._nextOffset || this.getAudiosCount()
        }, AudioPlaylist.prototype.getAudiosList = function() {
            return this.getSelf()._list || []
        }, AudioPlaylist.prototype.getSortedAudiosList = function() {
            return this.getSelf()._sortedList || this.getAudiosList() || []
        }, AudioPlaylist.prototype.getUnshuffledAudiosList = function() {
            var t = this.getSelf();
            return t._originalList ? t._originalList : t._list
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
        }, AudioPlaylist.prototype.getLiveInfo = function() {
            var t = this.getSelf()._live;
            return !!t && {
                hostId: (t = t.split(","))[0],
                audioId: t[1],
                hash: t[2]
            }
        }, AudioPlaylist.prototype.getAudioAt = function(t) {
            return this.getSelf()._list.length > t ? this.getSelf()._list[t] : null
        }, AudioPlaylist.prototype.getAudiosCount = function() {
            return this.getSelf()._list.length
        }, AudioPlaylist.prototype.getTotalDuration = function() {
            var t = this.getAudiosList(),
                e = 0;
            return each(t, function(t, i) {
                e += i[_utils__WEBPACK_IMPORTED_MODULE_0__.AudioUtils.AUDIO_ITEM_INDEX_DURATION]
            }), e
        }, AudioPlaylist.prototype.getItemsCount = function() {
            var t = this.getSelf();
            return t._items = t._items || [], t._items.length
        }, AudioPlaylist.prototype.setForceReload = function(t) {
            this.getSelf()._forceReload = t
        }, AudioPlaylist.prototype.setLocalFoundCount = function(t) {
            this.getSelf()._localFoundTotal = t
        }, AudioPlaylist.prototype.setAdsAllowed = function(t) {
            return this.getSelf()._isAdsAllowed = t
        }, AudioPlaylist.prototype.setFollowed = function(t) {
            var e = this.getAddClasses() || "";
            return e = e.replace("audio_playlist__followed", ""), t && (e += " audio_playlist__followed"), this.getSelf()._addClasses = e, this.getSelf()._isFollowed = t
        }, AudioPlaylist.prototype.isBlocked = function() {
            return !!this.getSelf()._isBlocked
        }, AudioPlaylist.prototype.hasMore = function() {
            return !!this.getSelf()._hasMore
        }, AudioPlaylist.prototype.isOfficial = function() {
            return !!this.getSelf()._isOfficial
        }, AudioPlaylist.prototype.isFollowed = function() {
            return this.getSelf()._isFollowed
        }, AudioPlaylist.prototype.isShuffled = function() {
            return !!this.getShuffle()
        }, AudioPlaylist.prototype.isAdsAllowed = function() {
            return !!this.getSelf()._isAdsAllowed
        }, AudioPlaylist.prototype.isInitedSortedList = function() {
            return !!this.getSelf()._sorted
        }, AudioPlaylist.prototype.isFullyLoadable = function() {
            return this.getType() === AudioPlaylist.TYPE_PLAYLIST
        }, AudioPlaylist.prototype.isLive = function() {
            return !!this.getLiveInfo()
        }, AudioPlaylist.prototype._unref = function() {
            var t = this._ref;
            if (isObject(t)) {
                var e = {};
                for (var i in t)
                    if (t.hasOwnProperty(i) && !isFunction(t[i]) && 0 === i.indexOf("_")) {
                        var r = t[i];
                        e[i.substr(1)] = isObject(r) ? clone(r) : r
                    }
                e.hasMore = !1, delete e.ownerId, delete this._ref, this._type = AudioPlaylist.TYPE_TEMP, this._ownerId = e.ownerId || vk.id, this._albumId = AudioPlaylist.plIndex++, this._list = [], this.mergeWith(e)
            }
        }, AudioPlaylist.prototype.equals = function(t) {
            return this.getSelf() === t.getSelf()
        }, AudioPlaylist.prototype.serialize = function() {
            var t = {},
                e = getAudioPlayer().getCurrentAudio(),
                i = Math.max(0, this.indexOfAudio(e));
            return t.list = clone(this.getAudiosList().slice(Math.max(0, i - 100), i + 300), !0), each(t.list, function(t, e) {
                e[_utils__WEBPACK_IMPORTED_MODULE_0__.AudioUtils.AUDIO_ITEM_INDEX_URL] = ""
            }), t.type = AudioPlaylist.TYPE_TEMP, t.ownerId = vk.id, t.albumId = irand(1, 999), t.hasMore = !1, t.title = this.getTitle(), t.context = getAudioPlayer()._getPlayingContext(), t.originalPlaylistRawId = this.getOriginalPlaylistRawId(), this.getType() === AudioPlaylist.TYPE_PLAYLIST && this.getAlbumId() > 0 && (t.originalPlaylistRawId = this.getOwnerId() + "_" + this.getAlbumId() + "_" + this.getAccessHash()), JSON.stringify(t)
        }, AudioPlaylist.prototype.toString = function() {
            return this.getId()
        }, AudioPlaylist.prototype._moveCurrentAudioAtFirstPosition = function() {
            var t = getAudioPlayer().getCurrentAudio(),
                e = this.getSelf(),
                i = this.indexOfAudio(t); - 1 !== i && (e._list.splice(i, 1), e._list.unshift(t), e._movedAudioToFirstPos = i)
        }, AudioPlaylist.prototype._resetMovedAudioToInitialPosition = function() {
            var t = this.getSelf();
            if (t._movedAudioToFirstPos) {
                var e = t._list.splice(0, 1);
                t._list.splice(t._movedAudioToFirstPos, 0, e[0]), delete t._movedAudioToFirstPos
            }
        }, AudioPlaylist.prototype._ensureIndex = function(t) {
            var e = this.getSelf();
            if (e._index) t && t();
            else {
                var i = function(t, e) {
                    var i = intval(e);
                    return i >= 33 && i < 48 ? String.fromCharCode(i) : t
                };
                e._index = new vkIndexer(e._list, function(t) {
                    return (t[_utils__WEBPACK_IMPORTED_MODULE_0__.AudioUtils.AUDIO_ITEM_INDEX_PERFORMER] + " " + t[_utils__WEBPACK_IMPORTED_MODULE_0__.AudioUtils.AUDIO_ITEM_INDEX_TITLE]).replace(/\&\#(\d+);?/gi, i)
                }, t)
            }
        }, AudioPlaylist.prototype.clean = function(t) {
            t || this._unref();
            var e = this.getSelf();
            e._hasMore = !0, e._list = [], e._items = [], e._feedOffset = e._feedFrom = 0, e._nextOffset = 0
        }, AudioPlaylist.prototype.initSortedList = function(t) {
            var e = this.getSelf();
            e._originalList || (e._originalList = [].concat(e._list)), e._sorted = !0, e._list = t
        }, AudioPlaylist.prototype.removeSortedList = function() {
            var t = this.getSelf();
            t._originalList && (t._list = [].concat(t._originalList)), t._sorted = !1
        }, AudioPlaylist.prototype.shuffle = function(t) {
            function e(e, i) {
                return t.apply(this, arguments)
            }
            return e.toString = function() {
                return t.toString()
            }, e
        }(function(t, e) {
            if (!(this.isShuffled() && t || !this.isShuffled() && !t)) {
                var i = this.getSelf();
                if (delete i._sorted, t) {
                    var r = !1;
                    if (this.hasMore())
                        if (this.getType() === AudioPlaylist.TYPE_SEARCH) i._originalList = i._originalList || [].concat(i._list), shuffle(i._list), e || this._moveCurrentAudioAtFirstPosition(), r = !0;
                        else if (inArray(this.getType(), [AudioPlaylist.TYPE_RECOM])) {
                        var n = getAudioPlayer().getCurrentAudio(),
                            o = this.indexOfAudio(n);
                        this.clean(!0), o >= 0 && i.addAudio(n, 0), r = !0
                    } else this._unref(), (i = this.getSelf())._originalList = i._originalList || [].concat(i._list), shuffle(i._list), e || this._moveCurrentAudioAtFirstPosition(), r = !0;
                    else i._originalList = i._originalList || [].concat(i._list), shuffle(i._list), e || this._moveCurrentAudioAtFirstPosition(), r = !0;
                    r && (i._shuffle = t)
                } else i._originalList ? i._list = i._originalList : this.clean(!0), delete i._shuffle, delete i._originalList;
                return !0
            }
        }), AudioPlaylist.prototype.getNextAudio = function(t, e) {
            if (!t) return t = this.getAudioAt(0), e && _utils__WEBPACK_IMPORTED_MODULE_0__.AudioUtils.asObject(t).isClaimed ? this.getNextAudio(t, !0) : t;
            var i = this.indexOfAudio(t);
            if (i < 0) return !1;
            if (i + 1 < this.getAudiosCount()) {
                var r = this.getAudioAt(i + 1);
                return e && _utils__WEBPACK_IMPORTED_MODULE_0__.AudioUtils.asObject(r).isClaimed ? this.getNextAudio(r, !0) : r
            }
            return !1
        }, AudioPlaylist.prototype.removeAudio = function(t) {
            var e = this.indexOfAudio(t);
            if (e >= 0) {
                this._unref();
                var i = this._list.splice(e, 1);
                return this._index && this._index.remove(i[0]), e
            }
            return -1
        }, AudioPlaylist.prototype.addAudio = function(t, e) {
            var i = this;
            this._unref();
            var r = void 0 === e,
                n = function(t) {
                    var n = i.getUnshuffledAudiosList(),
                        o = i.indexOfAudio(t);
                    if (o >= 0) {
                        if (r) return;
                        n.splice(o, 1)
                    }(t = clone(t))[_utils__WEBPACK_IMPORTED_MODULE_0__.AudioUtils.AUDIO_ITEM_INDEX_TITLE] = clean(replaceEntities(t[_utils__WEBPACK_IMPORTED_MODULE_0__.AudioUtils.AUDIO_ITEM_INDEX_TITLE]).replace(/(<em>|<\/em>)/g, "")), t[_utils__WEBPACK_IMPORTED_MODULE_0__.AudioUtils.AUDIO_ITEM_INDEX_PERFORMER] = clean(replaceEntities(t[_utils__WEBPACK_IMPORTED_MODULE_0__.AudioUtils.AUDIO_ITEM_INDEX_PERFORMER]).replace(/(<em>|<\/em>)/g, "")), r ? n.push(t) : n.splice(e, 0, t), i._index && i._index.add(t)
                };
            if (isArray(t) && isArray(t[0]))
                for (var o = 0, a = t.length; o < a; o++) n(t[o]);
            else t.length && n(t)
        }, AudioPlaylist.prototype.moveAudio = function(t, e) {
            this._unref();
            var i = this._list.splice(t, 1);
            t < e && (e -= 1), this._list.splice(e, 0, i[0])
        }, AudioPlaylist.prototype.indexOfAudio = function(t) {
            if (!t) return -1;
            var e = void 0;
            isString(t) ? e = t.split("_") : isObject(t) ? e = [t.ownerId, t.id] : isArray(t) && (e = [t[_utils__WEBPACK_IMPORTED_MODULE_0__.AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID], t[_utils__WEBPACK_IMPORTED_MODULE_0__.AudioUtils.AUDIO_ITEM_INDEX_ID]]);
            for (var i = this.getSelf()._list, r = 0, n = i.length; r < n; r++)
                if (i[r] && e[0] == i[r][_utils__WEBPACK_IMPORTED_MODULE_0__.AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] && e[1] == i[r][_utils__WEBPACK_IMPORTED_MODULE_0__.AudioUtils.AUDIO_ITEM_INDEX_ID]) return r;
            return -1
        }, AudioPlaylist.prototype.getAudio = function(t) {
            var e = this.getSelf();
            t = t.split("_");
            for (var i = 0, r = e._list.length; i < r; i++)
                if (t[0] == e._list[i][_utils__WEBPACK_IMPORTED_MODULE_0__.AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] && t[1] == e._list[i][_utils__WEBPACK_IMPORTED_MODULE_0__.AudioUtils.AUDIO_ITEM_INDEX_ID]) return e._list[i];
            return null
        }, AudioPlaylist.prototype.loadAll = function(t) {
            if (!this.isFullyLoadable()) return t && t();
            this.load(0, t, !0)
        }, AudioPlaylist.prototype.load = function load(offset, onDone, needAll) {
            var _this2 = this,
                trackType = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "default";
            isFunction(offset) && (onDone = offset, offset = 0);
            var searchParams = this.getSearchParams();
            offset = intval(offset);
            var countAvailable = this.getType() === AudioPlaylist.TYPE_FEED ? this.getItemsCount() : this.getAudiosCount(),
                isGoingToLoadAll = this.isFullyLoadable() && needAll && this.hasMore();
            if (offset < countAvailable && !isGoingToLoadAll) return onDone && onDone(this);
            var callOnDones = function(t, e) {
                var i = _this2._onDoneLoading;
                delete _this2._onDoneLoading, delete _this2._loadingAll, each(i || [], function(t, i) {
                    i && i(_this2, e)
                })
            };
            return this.hasMore() ? searchParams && this.getType() === AudioPlaylist.TYPE_SEARCH && !searchParams.globalQuery ? onDone && onDone(this) : (this._onDoneLoading = this._onDoneLoading || [], this._onDoneLoading.push(onDone), this._loadingAll ? void 0 : needAll ? (this._loadingAll = !0, void Object(_playlist_loadAllPlaylistAudios__WEBPACK_IMPORTED_MODULE_1__.loadAllPlaylistAudios)(this, callOnDones)) : (offset = this.getNextOffset(), offset === this.getLocalFoundCount() && (offset -= this.getLocalFoundCount()), offset || clearTimeout(this._sendSearchStatsTimeout), void ajax.post("al_audio.php", {
                act: "load_section",
                type: this.getType(),
                owner_id: cur.audioPage && this.getType() === AudioPlaylist.TYPE_SEARCH ? cur.audioPage.getOwnerId() : this.getOwnerId(),
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
                claim: intval(nav.objLoc.claim),
                track_type: trackType
            }, {
                onDone: function onDone(loadedPlaylist, tpl, langs, templatesScript) {
                    addTemplates({
                        audio_playlist_snippet: tpl
                    }), extend(cur.lang, langs), templatesScript && eval(templatesScript), _this2._loadingAll && !needAll || (getAudioPlayer().mergePlaylistData(_this2, loadedPlaylist), callOnDones(), getAudioPlayer().saveStateCurrentPlaylist(), offset || (clearTimeout(_this2._sendSearchStatsTimeout), _this2._sendSearchStatsTimeout = setTimeout(_this2.sendSearchStats.bind(_this2, "search_view"), 3e3), _this2._searchPlayStatsSent = !1))
                }
            }))) : onDone && onDone(this)
        }, AudioPlaylist.prototype.mergeWith = function(t) {
            var e = this;
            if (!isObject(this._ref)) {
                var i = t.list;
                if (i) {
                    var r = getAudioPlayer().getCurrentAudio();
                    if (r && this.indexOfAudio(r) >= 0) {
                        for (var n = -1, o = 0, a = i.length; o < a; o++)
                            if (r[_utils__WEBPACK_IMPORTED_MODULE_0__.AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] == i[o][_utils__WEBPACK_IMPORTED_MODULE_0__.AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] && r[_utils__WEBPACK_IMPORTED_MODULE_0__.AudioUtils.AUDIO_ITEM_INDEX_ID] == i[o][_utils__WEBPACK_IMPORTED_MODULE_0__.AudioUtils.AUDIO_ITEM_INDEX_ID]) {
                                n = o;
                                break
                            }
                        n >= 0 && this.clean()
                    }
                    this.addAudio(t.list)
                }
                if (t.items) {
                    this._items = this._items || [];
                    for (var s = 0, u = t.items.length; s < u; s++) this._items.push(t.items[s])
                }
                each(["accessHash", "addClasses", "artistsBlock", "authorLine", "authorHref", "authorName", "communitiesBlock", "coverUrl", "description", "gridCovers", "editHash", "feedFrom", "feedOffset", "followHash", "hasMore", "infoLine1", "infoLine2", "isAdsAllowed", "isFollowed", "isOfficial", "isBlocked", "lastUpdated", "listens", "live", "nextOffset", "originalList", "playlistsBlock", "postId", "rawId", "rawDescription", "searchQid", "searchParams", "shuffle", "subTitle", "title", "totalCount", "totalCountHash", "wallQuery", "wallType"], function(i, r) {
                    void 0 !== t[r] && (e["_" + r] = t[r])
                })
            }
        }, AudioPlaylist.prototype.search = function(t, e) {
            var i = this.getSelf();
            isObject(t) || (t = {
                q: t
            }), this._ensureIndex(function() {
                var r = i._index ? i._index.search(t.q) : [];
                return r = r.filter(function(e) {
                    return !t.lyrics || !!intval(e[_utils__WEBPACK_IMPORTED_MODULE_0__.AudioUtils.AUDIO_ITEM_INDEX_LYRICS])
                }), e(r)
            })
        }, AudioPlaylist.prototype.sendSearchStats = function(t) {
            if ("search_play" == t) {
                if (this._searchPlayStatsSent) return;
                this._searchPlayStatsSent = !0
            }
            ajax.post("al_audio.php?act=search_stats", {
                event_type: t,
                search_type: this.getSearchQid() ? "external" : "internal",
                search_params: JSON.stringify(this.getSearchParams()),
                results_count: this.getTotalCount()
            })
        }, AudioPlaylist.prototype.fetchNextLiveAudio = function(t) {
            var e = this,
                i = this.getLiveInfo();
            ajax.post("al_audio.php", {
                act: "a_get_audio_status",
                host_id: i.hostId,
                hash: i.hash
            }, {
                onDone: function(i) {
                    if (i) {
                        var r = e.indexOfAudio(i);
                        r >= 0 ? e.moveAudio(r, e.getAudiosCount() - 1) : e.addAudio(i)
                    }
                    t && t(i)
                }
            })
        }, AudioPlaylist
    }();
    AudioPlaylist.plIndex = 0, AudioPlaylist.TYPE_CURRENT = "current", AudioPlaylist.TYPE_PLAYLIST = "playlist", AudioPlaylist.TYPE_ALBUM = "album", AudioPlaylist.TYPE_TEMP = "temp", AudioPlaylist.TYPE_RECOM = "recoms", AudioPlaylist.TYPE_SEARCH = "search", AudioPlaylist.TYPE_FEED = "feed", AudioPlaylist.TYPE_LIVE = "live", AudioPlaylist.TYPE_WALL = "wall", AudioPlaylist.TYPE_RECENT = "recent", AudioPlaylist.DEFAULT_PLAYLIST_ID = -1
}, , , function(t, e, i) {
    (function(e, r) {
        var n, o = i(547),
            a = i(600),
            s = i(103),
            u = i(307).Buffer,
            d = e.crypto && e.crypto.subtle,
            c = {
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
            f = [];

        function l(t, e, i, r, n) {
            return d.importKey("raw", t, {
                name: "PBKDF2"
            }, !1, ["deriveBits"]).then(function(t) {
                return d.deriveBits({
                    name: "PBKDF2",
                    salt: e,
                    iterations: i,
                    hash: {
                        name: n
                    }
                }, t, r << 3)
            }).then(function(t) {
                return u.from(t)
            })
        }
        t.exports = function(t, i, h, p, _, y) {
            "function" == typeof _ && (y = _, _ = void 0);
            var b = c[(_ = _ || "sha1").toLowerCase()];
            if (!b || "function" != typeof e.Promise) return r.nextTick(function() {
                var e;
                try {
                    e = s(t, i, h, p, _)
                } catch (t) {
                    return y(t)
                }
                y(null, e)
            });
            if (o(t, i, h, p), "function" != typeof y) throw new Error("No callback provided to pbkdf2");
            u.isBuffer(t) || (t = u.from(t, a)), u.isBuffer(i) || (i = u.from(i, a)),
                function(t, e) {
                    t.then(function(t) {
                        r.nextTick(function() {
                            e(null, t)
                        })
                    }, function(t) {
                        r.nextTick(function() {
                            e(t)
                        })
                    })
                }(function(t) {
                    if (e.process && !e.process.browser) return Promise.resolve(!1);
                    if (!d || !d.importKey || !d.deriveBits) return Promise.resolve(!1);
                    if (void 0 !== f[t]) return f[t];
                    var i = l(n = n || u.alloc(8), n, 10, 128, t).then(function() {
                        return !0
                    }).catch(function() {
                        return !1
                    });
                    return f[t] = i, i
                }(b).then(function(e) {
                    return e ? l(t, i, h, p, b) : s(t, i, h, p, _)
                }), y)
        }
    }).call(this, i(186), i(210))
}, , , , , , , function(t) {
    t.exports = {
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
}, function(t, e, i) {
    var r = i(581),
        n = i(564),
        o = i(307).Buffer,
        a = [1518500249, 1859775393, -1894007588, -899497514],
        s = new Array(80);

    function u() {
        this.init(), this._w = s, n.call(this, 64, 56)
    }

    function d(t) {
        return t << 5 | t >>> 27
    }

    function c(t) {
        return t << 30 | t >>> 2
    }

    function f(t, e, i, r) {
        return 0 === t ? e & i | ~e & r : 2 === t ? e & i | e & r | i & r : e ^ i ^ r
    }
    r(u, n), u.prototype.init = function() {
        return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
    }, u.prototype._update = function(t) {
        for (var e, i = this._w, r = 0 | this._a, n = 0 | this._b, o = 0 | this._c, s = 0 | this._d, u = 0 | this._e, l = 0; l < 16; ++l) i[l] = t.readInt32BE(4 * l);
        for (; l < 80; ++l) i[l] = (e = i[l - 3] ^ i[l - 8] ^ i[l - 14] ^ i[l - 16]) << 1 | e >>> 31;
        for (var h = 0; h < 80; ++h) {
            var p = ~~(h / 20),
                _ = d(r) + f(p, n, o, s) + u + i[h] + a[p] | 0;
            u = s, s = o, o = c(n), n = r, r = _
        }
        this._a = r + this._a | 0, this._b = n + this._b | 0, this._c = o + this._c | 0, this._d = s + this._d | 0, this._e = u + this._e | 0
    }, u.prototype._hash = function() {
        var t = o.allocUnsafe(20);
        return t.writeInt32BE(0 | this._a, 0), t.writeInt32BE(0 | this._b, 4), t.writeInt32BE(0 | this._c, 8), t.writeInt32BE(0 | this._d, 12), t.writeInt32BE(0 | this._e, 16), t
    }, t.exports = u
}, , function(t, e, i) {
    "use strict";

    function r(t, e, i) {
        var r = t + "_" + e;
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
                onDone: function(t) {
                    n.hide(), showDoneBox(t)
                },
                onFail: function(t) {
                    return n.hide(), showDoneBox(t), !0
                }
            })
        }, getLang("global_cancel"), function() {
            return n.hide()
        }).show()
    }
    i.r(e), i.d(e, "removeFromGroup", function() {
        return r
    })
}, function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "getAudioFullId", function() {
        return n
    });
    var r = i(24);

    function n(t) {
        return t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_ID]
    }
}, , , , , , , , function(t, e, i) {
    (function(e) {
        var r = i(11),
            n = i(561),
            o = i(581),
            a = i(381),
            s = i(515),
            u = i(104);

        function d(t) {
            n.Writable.call(this);
            var e = u[t];
            if (!e) throw new Error("Unknown message digest");
            this._hashType = e.hash, this._hash = r(e.hash), this._tag = e.id, this._signType = e.sign
        }

        function c(t) {
            n.Writable.call(this);
            var e = u[t];
            if (!e) throw new Error("Unknown message digest");
            this._hash = r(e.hash), this._tag = e.id, this._signType = e.sign
        }

        function f(t) {
            return new d(t)
        }

        function l(t) {
            return new c(t)
        }
        Object.keys(u).forEach(function(t) {
            u[t].id = new e(u[t].id, "hex"), u[t.toLowerCase()] = u[t]
        }), o(d, n.Writable), d.prototype._write = function(t, e, i) {
            this._hash.update(t), i()
        }, d.prototype.update = function(t, i) {
            return "string" == typeof t && (t = new e(t, i)), this._hash.update(t), this
        }, d.prototype.sign = function(t, e) {
            this.end();
            var i = this._hash.digest(),
                r = a(i, t, this._hashType, this._signType, this._tag);
            return e ? r.toString(e) : r
        }, o(c, n.Writable), c.prototype._write = function(t, e, i) {
            this._hash.update(t), i()
        }, c.prototype.update = function(t, i) {
            return "string" == typeof t && (t = new e(t, i)), this._hash.update(t), this
        }, c.prototype.verify = function(t, i, r) {
            "string" == typeof i && (i = new e(i, r)), this.end();
            var n = this._hash.digest();
            return s(i, n, t, this._signType, this._tag)
        }, t.exports = {
            Sign: f,
            Verify: l,
            createSign: f,
            createVerify: l
        }
    }).call(this, i(315).Buffer)
}, , , , , function(t) {
    t.exports = {
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
}, function(t, e, i) {
    "use strict";
    var r = i(567),
        n = i(329),
        o = i(218),
        a = i(581),
        s = r.base,
        u = n.utils.assert;

    function d(t) {
        s.call(this, "short", t), this.a = new o(t.a, 16).toRed(this.red), this.b = new o(t.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = 0 === this.a.fromRed().cmpn(0), this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3), this.endo = this._getEndomorphism(t), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4)
    }

    function c(t, e, i, r) {
        s.BasePoint.call(this, t, "affine"), null === e && null === i ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new o(e, 16), this.y = new o(i, 16), r && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1)
    }

    function f(t, e, i, r) {
        s.BasePoint.call(this, t, "jacobian"), null === e && null === i && null === r ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new o(0)) : (this.x = new o(e, 16), this.y = new o(i, 16), this.z = new o(r, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one
    }
    a(d, s), t.exports = d, d.prototype._getEndomorphism = function(t) {
        if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
            var e, i;
            if (t.beta) e = new o(t.beta, 16).toRed(this.red);
            else {
                var r = this._getEndoRoots(this.p);
                e = (e = r[0].cmp(r[1]) < 0 ? r[0] : r[1]).toRed(this.red)
            }
            if (t.lambda) i = new o(t.lambda, 16);
            else {
                var n = this._getEndoRoots(this.n);
                0 === this.g.mul(n[0]).x.cmp(this.g.x.redMul(e)) ? i = n[0] : (i = n[1], u(0 === this.g.mul(i).x.cmp(this.g.x.redMul(e))))
            }
            return {
                beta: e,
                lambda: i,
                basis: t.basis ? t.basis.map(function(t) {
                    return {
                        a: new o(t.a, 16),
                        b: new o(t.b, 16)
                    }
                }) : this._getEndoBasis(i)
            }
        }
    }, d.prototype._getEndoRoots = function(t) {
        var e = t === this.p ? this.red : o.mont(t),
            i = new o(2).toRed(e).redInvm(),
            r = i.redNeg(),
            n = new o(3).toRed(e).redNeg().redSqrt().redMul(i);
        return [r.redAdd(n).fromRed(), r.redSub(n).fromRed()]
    }, d.prototype._getEndoBasis = function(t) {
        for (var e, i, r, n, a, s, u, d, c, f = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), l = t, h = this.n.clone(), p = new o(1), _ = new o(0), y = new o(0), b = new o(1), g = 0; 0 !== l.cmpn(0);) {
            var v = h.div(l);
            d = h.sub(v.mul(l)), c = y.sub(v.mul(p));
            var m = b.sub(v.mul(_));
            if (!r && d.cmp(f) < 0) e = u.neg(), i = p, r = d.neg(), n = c;
            else if (r && 2 == ++g) break;
            u = d, h = l, l = d, y = p, p = c, b = _, _ = m
        }
        a = d.neg(), s = c;
        var A = r.sqr().add(n.sqr());
        return a.sqr().add(s.sqr()).cmp(A) >= 0 && (a = e, s = i), r.negative && (r = r.neg(), n = n.neg()), a.negative && (a = a.neg(), s = s.neg()), [{
            a: r,
            b: n
        }, {
            a: a,
            b: s
        }]
    }, d.prototype._endoSplit = function(t) {
        var e = this.endo.basis,
            i = e[0],
            r = e[1],
            n = r.b.mul(t).divRound(this.n),
            o = i.b.neg().mul(t).divRound(this.n),
            a = n.mul(i.a),
            s = o.mul(r.a),
            u = n.mul(i.b),
            d = o.mul(r.b);
        return {
            k1: t.sub(a).sub(s),
            k2: u.add(d).neg()
        }
    }, d.prototype.pointFromX = function(t, e) {
        (t = new o(t, 16)).red || (t = t.toRed(this.red));
        var i = t.redSqr().redMul(t).redIAdd(t.redMul(this.a)).redIAdd(this.b),
            r = i.redSqrt();
        if (0 !== r.redSqr().redSub(i).cmp(this.zero)) throw new Error("invalid point");
        var n = r.fromRed().isOdd();
        return (e && !n || !e && n) && (r = r.redNeg()), this.point(t, r)
    }, d.prototype.validate = function(t) {
        if (t.inf) return !0;
        var e = t.x,
            i = t.y,
            r = this.a.redMul(e),
            n = e.redSqr().redMul(e).redIAdd(r).redIAdd(this.b);
        return 0 === i.redSqr().redISub(n).cmpn(0)
    }, d.prototype._endoWnafMulAdd = function(t, e, i) {
        for (var r = this._endoWnafT1, n = this._endoWnafT2, o = 0; o < t.length; o++) {
            var a = this._endoSplit(e[o]),
                s = t[o],
                u = s._getBeta();
            a.k1.negative && (a.k1.ineg(), s = s.neg(!0)), a.k2.negative && (a.k2.ineg(), u = u.neg(!0)), r[2 * o] = s, r[2 * o + 1] = u, n[2 * o] = a.k1, n[2 * o + 1] = a.k2
        }
        for (var d = this._wnafMulAdd(1, r, n, 2 * o, i), c = 0; c < 2 * o; c++) r[c] = null, n[c] = null;
        return d
    }, a(c, s.BasePoint), d.prototype.point = function(t, e, i) {
        return new c(this, t, e, i)
    }, d.prototype.pointFromJSON = function(t, e) {
        return c.fromJSON(this, t, e)
    }, c.prototype._getBeta = function() {
        if (this.curve.endo) {
            var t = this.precomputed;
            if (t && t.beta) return t.beta;
            var e = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
            if (t) {
                var i = this.curve,
                    r = function(t) {
                        return i.point(t.x.redMul(i.endo.beta), t.y)
                    };
                t.beta = e, e.precomputed = {
                    beta: null,
                    naf: t.naf && {
                        wnd: t.naf.wnd,
                        points: t.naf.points.map(r)
                    },
                    doubles: t.doubles && {
                        step: t.doubles.step,
                        points: t.doubles.points.map(r)
                    }
                }
            }
            return e
        }
    }, c.prototype.toJSON = function() {
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
    }, c.fromJSON = function(t, e, i) {
        "string" == typeof e && (e = JSON.parse(e));
        var r = t.point(e[0], e[1], i);
        if (!e[2]) return r;

        function n(e) {
            return t.point(e[0], e[1], i)
        }
        var o = e[2];
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
    }, c.prototype.inspect = function() {
        return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">"
    }, c.prototype.isInfinity = function() {
        return this.inf
    }, c.prototype.add = function(t) {
        if (this.inf) return t;
        if (t.inf) return this;
        if (this.eq(t)) return this.dbl();
        if (this.neg().eq(t)) return this.curve.point(null, null);
        if (0 === this.x.cmp(t.x)) return this.curve.point(null, null);
        var e = this.y.redSub(t.y);
        0 !== e.cmpn(0) && (e = e.redMul(this.x.redSub(t.x).redInvm()));
        var i = e.redSqr().redISub(this.x).redISub(t.x),
            r = e.redMul(this.x.redSub(i)).redISub(this.y);
        return this.curve.point(i, r)
    }, c.prototype.dbl = function() {
        if (this.inf) return this;
        var t = this.y.redAdd(this.y);
        if (0 === t.cmpn(0)) return this.curve.point(null, null);
        var e = this.curve.a,
            i = this.x.redSqr(),
            r = t.redInvm(),
            n = i.redAdd(i).redIAdd(i).redIAdd(e).redMul(r),
            o = n.redSqr().redISub(this.x.redAdd(this.x)),
            a = n.redMul(this.x.redSub(o)).redISub(this.y);
        return this.curve.point(o, a)
    }, c.prototype.getX = function() {
        return this.x.fromRed()
    }, c.prototype.getY = function() {
        return this.y.fromRed()
    }, c.prototype.mul = function(t) {
        return t = new o(t, 16), this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [t]) : this.curve._wnafMul(this, t)
    }, c.prototype.mulAdd = function(t, e, i) {
        var r = [this, e],
            n = [t, i];
        return this.curve.endo ? this.curve._endoWnafMulAdd(r, n) : this.curve._wnafMulAdd(1, r, n, 2)
    }, c.prototype.jmulAdd = function(t, e, i) {
        var r = [this, e],
            n = [t, i];
        return this.curve.endo ? this.curve._endoWnafMulAdd(r, n, !0) : this.curve._wnafMulAdd(1, r, n, 2, !0)
    }, c.prototype.eq = function(t) {
        return this === t || this.inf === t.inf && (this.inf || 0 === this.x.cmp(t.x) && 0 === this.y.cmp(t.y))
    }, c.prototype.neg = function(t) {
        if (this.inf) return this;
        var e = this.curve.point(this.x, this.y.redNeg());
        if (t && this.precomputed) {
            var i = this.precomputed,
                r = function(t) {
                    return t.neg()
                };
            e.precomputed = {
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
        return e
    }, c.prototype.toJ = function() {
        return this.inf ? this.curve.jpoint(null, null, null) : this.curve.jpoint(this.x, this.y, this.curve.one)
    }, a(f, s.BasePoint), d.prototype.jpoint = function(t, e, i) {
        return new f(this, t, e, i)
    }, f.prototype.toP = function() {
        if (this.isInfinity()) return this.curve.point(null, null);
        var t = this.z.redInvm(),
            e = t.redSqr(),
            i = this.x.redMul(e),
            r = this.y.redMul(e).redMul(t);
        return this.curve.point(i, r)
    }, f.prototype.neg = function() {
        return this.curve.jpoint(this.x, this.y.redNeg(), this.z)
    }, f.prototype.add = function(t) {
        if (this.isInfinity()) return t;
        if (t.isInfinity()) return this;
        var e = t.z.redSqr(),
            i = this.z.redSqr(),
            r = this.x.redMul(e),
            n = t.x.redMul(i),
            o = this.y.redMul(e.redMul(t.z)),
            a = t.y.redMul(i.redMul(this.z)),
            s = r.redSub(n),
            u = o.redSub(a);
        if (0 === s.cmpn(0)) return 0 !== u.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
        var d = s.redSqr(),
            c = d.redMul(s),
            f = r.redMul(d),
            l = u.redSqr().redIAdd(c).redISub(f).redISub(f),
            h = u.redMul(f.redISub(l)).redISub(o.redMul(c)),
            p = this.z.redMul(t.z).redMul(s);
        return this.curve.jpoint(l, h, p)
    }, f.prototype.mixedAdd = function(t) {
        if (this.isInfinity()) return t.toJ();
        if (t.isInfinity()) return this;
        var e = this.z.redSqr(),
            i = this.x,
            r = t.x.redMul(e),
            n = this.y,
            o = t.y.redMul(e).redMul(this.z),
            a = i.redSub(r),
            s = n.redSub(o);
        if (0 === a.cmpn(0)) return 0 !== s.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
        var u = a.redSqr(),
            d = u.redMul(a),
            c = i.redMul(u),
            f = s.redSqr().redIAdd(d).redISub(c).redISub(c),
            l = s.redMul(c.redISub(f)).redISub(n.redMul(d)),
            h = this.z.redMul(a);
        return this.curve.jpoint(f, l, h)
    }, f.prototype.dblp = function(t) {
        if (0 === t) return this;
        if (this.isInfinity()) return this;
        if (!t) return this.dbl();
        if (this.curve.zeroA || this.curve.threeA) {
            for (var e = this, i = 0; i < t; i++) e = e.dbl();
            return e
        }
        var r = this.curve.a,
            n = this.curve.tinv,
            o = this.x,
            a = this.y,
            s = this.z,
            u = s.redSqr().redSqr(),
            d = a.redAdd(a);
        for (i = 0; i < t; i++) {
            var c = o.redSqr(),
                f = d.redSqr(),
                l = f.redSqr(),
                h = c.redAdd(c).redIAdd(c).redIAdd(r.redMul(u)),
                p = o.redMul(f),
                _ = h.redSqr().redISub(p.redAdd(p)),
                y = p.redISub(_),
                b = h.redMul(y);
            b = b.redIAdd(b).redISub(l);
            var g = d.redMul(s);
            i + 1 < t && (u = u.redMul(l)), o = _, s = g, d = b
        }
        return this.curve.jpoint(o, d.redMul(n), s)
    }, f.prototype.dbl = function() {
        return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl()
    }, f.prototype._zeroDbl = function() {
        var t, e, i;
        if (this.zOne) {
            var r = this.x.redSqr(),
                n = this.y.redSqr(),
                o = n.redSqr(),
                a = this.x.redAdd(n).redSqr().redISub(r).redISub(o);
            a = a.redIAdd(a);
            var s = r.redAdd(r).redIAdd(r),
                u = s.redSqr().redISub(a).redISub(a),
                d = o.redIAdd(o);
            d = (d = d.redIAdd(d)).redIAdd(d), t = u, e = s.redMul(a.redISub(u)).redISub(d), i = this.y.redAdd(this.y)
        } else {
            var c = this.x.redSqr(),
                f = this.y.redSqr(),
                l = f.redSqr(),
                h = this.x.redAdd(f).redSqr().redISub(c).redISub(l);
            h = h.redIAdd(h);
            var p = c.redAdd(c).redIAdd(c),
                _ = p.redSqr(),
                y = l.redIAdd(l);
            y = (y = y.redIAdd(y)).redIAdd(y), t = _.redISub(h).redISub(h), e = p.redMul(h.redISub(t)).redISub(y), i = (i = this.y.redMul(this.z)).redIAdd(i)
        }
        return this.curve.jpoint(t, e, i)
    }, f.prototype._threeDbl = function() {
        var t, e, i;
        if (this.zOne) {
            var r = this.x.redSqr(),
                n = this.y.redSqr(),
                o = n.redSqr(),
                a = this.x.redAdd(n).redSqr().redISub(r).redISub(o);
            a = a.redIAdd(a);
            var s = r.redAdd(r).redIAdd(r).redIAdd(this.curve.a),
                u = s.redSqr().redISub(a).redISub(a);
            t = u;
            var d = o.redIAdd(o);
            d = (d = d.redIAdd(d)).redIAdd(d), e = s.redMul(a.redISub(u)).redISub(d), i = this.y.redAdd(this.y)
        } else {
            var c = this.z.redSqr(),
                f = this.y.redSqr(),
                l = this.x.redMul(f),
                h = this.x.redSub(c).redMul(this.x.redAdd(c));
            h = h.redAdd(h).redIAdd(h);
            var p = l.redIAdd(l),
                _ = (p = p.redIAdd(p)).redAdd(p);
            t = h.redSqr().redISub(_), i = this.y.redAdd(this.z).redSqr().redISub(f).redISub(c);
            var y = f.redSqr();
            y = (y = (y = y.redIAdd(y)).redIAdd(y)).redIAdd(y), e = h.redMul(p.redISub(t)).redISub(y)
        }
        return this.curve.jpoint(t, e, i)
    }, f.prototype._dbl = function() {
        var t = this.curve.a,
            e = this.x,
            i = this.y,
            r = this.z,
            n = r.redSqr().redSqr(),
            o = e.redSqr(),
            a = i.redSqr(),
            s = o.redAdd(o).redIAdd(o).redIAdd(t.redMul(n)),
            u = e.redAdd(e),
            d = (u = u.redIAdd(u)).redMul(a),
            c = s.redSqr().redISub(d.redAdd(d)),
            f = d.redISub(c),
            l = a.redSqr();
        l = (l = (l = l.redIAdd(l)).redIAdd(l)).redIAdd(l);
        var h = s.redMul(f).redISub(l),
            p = i.redAdd(i).redMul(r);
        return this.curve.jpoint(c, h, p)
    }, f.prototype.trpl = function() {
        if (!this.curve.zeroA) return this.dbl().add(this);
        var t = this.x.redSqr(),
            e = this.y.redSqr(),
            i = this.z.redSqr(),
            r = e.redSqr(),
            n = t.redAdd(t).redIAdd(t),
            o = n.redSqr(),
            a = this.x.redAdd(e).redSqr().redISub(t).redISub(r),
            s = (a = (a = (a = a.redIAdd(a)).redAdd(a).redIAdd(a)).redISub(o)).redSqr(),
            u = r.redIAdd(r);
        u = (u = (u = u.redIAdd(u)).redIAdd(u)).redIAdd(u);
        var d = n.redIAdd(a).redSqr().redISub(o).redISub(s).redISub(u),
            c = e.redMul(d);
        c = (c = c.redIAdd(c)).redIAdd(c);
        var f = this.x.redMul(s).redISub(c);
        f = (f = f.redIAdd(f)).redIAdd(f);
        var l = this.y.redMul(d.redMul(u.redISub(d)).redISub(a.redMul(s)));
        l = (l = (l = l.redIAdd(l)).redIAdd(l)).redIAdd(l);
        var h = this.z.redAdd(a).redSqr().redISub(i).redISub(s);
        return this.curve.jpoint(f, l, h)
    }, f.prototype.mul = function(t, e) {
        return t = new o(t, e), this.curve._wnafMul(this, t)
    }, f.prototype.eq = function(t) {
        if ("affine" === t.type) return this.eq(t.toJ());
        if (this === t) return !0;
        var e = this.z.redSqr(),
            i = t.z.redSqr();
        if (0 !== this.x.redMul(i).redISub(t.x.redMul(e)).cmpn(0)) return !1;
        var r = e.redMul(this.z),
            n = i.redMul(t.z);
        return 0 === this.y.redMul(n).redISub(t.y.redMul(r)).cmpn(0)
    }, f.prototype.eqXToP = function(t) {
        var e = this.z.redSqr(),
            i = t.toRed(this.curve.red).redMul(e);
        if (0 === this.x.cmp(i)) return !0;
        for (var r = t.clone(), n = this.curve.redN.redMul(e);;) {
            if (r.iadd(this.curve.n), r.cmp(this.curve.p) >= 0) return !1;
            if (i.redIAdd(n), 0 === this.x.cmp(i)) return !0
        }
        return !1
    }, f.prototype.inspect = function() {
        return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">"
    }, f.prototype.isInfinity = function() {
        return 0 === this.z.cmpn(0)
    }
}, function(t, e, i) {
    "use strict";

    function r(t, e, i, r, n, o) {
        if (cur.apLayer) return cancelEvent(n);
        if (vk.widget) return !0;
        var a = null;
        return window.Photoview && window.cur && cur.pvShown && (a = clone(nav.objLoc), Photoview.hide(!0)), boxRefreshCoords(boxLoader), show(boxLoader), show(boxLayerWrap), stManager.add(["auto_list.js", "audio.css"], function() {
            new AudioPlaylist({
                type: AudioPlaylist.TYPE_PLAYLIST,
                ownerId: t,
                albumId: e,
                hasMore: !0,
                accessHash: i,
                fromId: cur.oid
            }).loadAll(function(d, c) {
                if (hide(boxLoader), hide(boxLayerWrap), c) {
                    var f = getLang("audio_error_deleted_playlist_box").split("/");
                    return new MessageBox({
                        title: f[0]
                    }).content(f[1]).setButtons(getLang("global_close"), function() {
                        curBox().hide(), a && nav.change(a)
                    }).show(), void nav.setLoc(extend(nav.objLoc, {
                        z: !1
                    }))
                }
                var l = extend(nav.objLoc, {
                    z: "audio_playlist" + t + "_" + e + (i ? "/" + i : "")
                });
                nav.setLoc(l), window.audioPlaylistLayerWrap || (window.audioPlaylistLayerWrap = se('<div class="ap_layer_wrap"></div>'), bodyNode.appendChild(window.audioPlaylistLayerWrap));
                window.audioPlaylistLayerWrap.innerHTML = "";
                var h = d.getAudiosList().length,
                    p = d.isBlocked && d.isBlocked(),
                    _ = getTemplate("audio_playlist_snippet", {
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
                if (cur.apLayer = se('\n        <div class="ap_layer">\n          <div class="ap_layer__content">\n            ' + _ + '\n          </div>\n          <div class="ap_layer__close _ap_layer__close"></div>\n        </div>\n      '), p) {
                    var y = geByClass1("audio_pl_snippet__body", cur.apLayer);
                    y.innerHTML = getTemplate("playlist_snippet_stub")
                }
                window.audioPlaylistLayerWrap.appendChild(cur.apLayer), addEvent(window.audioPlaylistLayerWrap, "click", n = function(t) {
                    t.target != window.audioPlaylistLayerWrap && t.target != geByClass1("_ap_layer__close", cur.apLayer) || layers.fullhide()
                }), addEvent(bodyNode, "keydown", s = function(t) {
                    if (27 == t.keyCode) return layers.fullhide(), cancelEvent(t)
                }), layerQueue.push(), layerQueue.hide(), boxQueue.hideAll(), layers.wrapshow(window.audioPlaylistLayerWrap, .7), addClass(layerBG, "ap_layer_bg_dark");
                var b = geByClass1("_audio_pl_snippet__list", cur.apLayer),
                    g = AudioUtils.getAlbumParts(d),
                    v = 0;
                h && !p && (cur.apLayerAutoList = new AutoList(b, {
                    scrollNode: window.audioPlaylistLayerWrap,
                    onNeedRows: function(t, e) {
                        for (var i = [], r = d.getUnshuffledAudiosList(), n = e -= v; n < e + 30; n++) {
                            var o = r[n];
                            if (!o) break;
                            if (g && g.length && g[0].offset === n) {
                                var a = g.shift();
                                v++, i.push(AudioUtils.drawAlbumPartRow(a.number))
                            }
                            i.push(AudioUtils.drawAudio(o))
                        }
                        t(i)
                    }
                }));
                boxRefreshCoords(cur.apLayer), getAudioPlayer().updateCurrentPlaying(), layers.fullhide = u, cur.apLayerPlaylistId = [t, e], o && o();
                cur.articleLayer && cur.articleLayer.audioPlaylistOpened()
            });
            var n = void 0,
                s = void 0;

            function u(t) {
                boxQueue.hideAll(), cur.apLayerAutoList && (cur.apLayerAutoList.destroy(), cur.apLayerAutoList = null), layers.wraphide(window.audioPlaylistLayerWrap), layers.fullhide = !1, n && removeEvent(window.audioPlaylistLayerWrap, "click", n), s && removeEvent(bodyNode, "keydown", s), delete cur.apLayer, delete cur.apLayerPlaylistId, removeClass(layerBG, "ap_layer_bg_dark"), a ? nav.change(a) : nav.change({
                    z: !1
                }), layerQueue.pop()
            }
        }), !1
    }
    i.r(e), i.d(e, "showAudioPlaylist", function() {
        return r
    })
}, function(t, e, i) {
    "use strict";
    var r = i(226);

    function n(t, e) {
        t.emit("error", e)
    }
    t.exports = {
        destroy: function(t, e) {
            var i = this,
                o = this._readableState && this._readableState.destroyed,
                a = this._writableState && this._writableState.destroyed;
            return o || a ? (e ? e(t) : !t || this._writableState && this._writableState.errorEmitted || r.nextTick(n, this, t), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(t || null, function(t) {
                !e && t ? (r.nextTick(n, i, t), i._writableState && (i._writableState.errorEmitted = !0)) : e && e(t)
            }), this)
        },
        undestroy: function() {
            this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1)
        }
    }
}, , , , function(t, e) {
    e.read = function(t, e, i, r, n) {
        var o, a, s = 8 * n - r - 1,
            u = (1 << s) - 1,
            d = u >> 1,
            c = -7,
            f = i ? n - 1 : 0,
            l = i ? -1 : 1,
            h = t[e + f];
        for (f += l, o = h & (1 << -c) - 1, h >>= -c, c += s; c > 0; o = 256 * o + t[e + f], f += l, c -= 8);
        for (a = o & (1 << -c) - 1, o >>= -c, c += r; c > 0; a = 256 * a + t[e + f], f += l, c -= 8);
        if (0 === o) o = 1 - d;
        else {
            if (o === u) return a ? NaN : 1 / 0 * (h ? -1 : 1);
            a += Math.pow(2, r), o -= d
        }
        return (h ? -1 : 1) * a * Math.pow(2, o - r)
    }, e.write = function(t, e, i, r, n, o) {
        var a, s, u, d = 8 * o - n - 1,
            c = (1 << d) - 1,
            f = c >> 1,
            l = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            h = r ? 0 : o - 1,
            p = r ? 1 : -1,
            _ = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
        for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, a = c) : (a = Math.floor(Math.log(e) / Math.LN2), e * (u = Math.pow(2, -a)) < 1 && (a--, u *= 2), (e += a + f >= 1 ? l / u : l * Math.pow(2, 1 - f)) * u >= 2 && (a++, u /= 2), a + f >= c ? (s = 0, a = c) : a + f >= 1 ? (s = (e * u - 1) * Math.pow(2, n), a += f) : (s = e * Math.pow(2, f - 1) * Math.pow(2, n), a = 0)); n >= 8; t[i + h] = 255 & s, h += p, s /= 256, n -= 8);
        for (a = a << n | s, d += n; d > 0; t[i + h] = 255 & a, h += p, a /= 256, d -= 8);
        t[i + h - p] |= 128 * _
    }
}, , , , , function(t, e, i) {
    "use strict";

    function r(t, e) {
        var i = getAudioPlayer().getCurrentPlaylist();
        i && i.removeAudio(e.fullId), re(t)
    }
    i.r(e), i.d(e, "deleteCurrentAudio", function() {
        return r
    })
}, function(t, e, i) {
    "use strict";
    var r = i(307).Buffer,
        n = i(423);
    t.exports = function() {
        function t() {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this.head = null, this.tail = null, this.length = 0
        }
        return t.prototype.push = function(t) {
            var e = {
                data: t,
                next: null
            };
            this.length > 0 ? this.tail.next = e : this.head = e, this.tail = e, ++this.length
        }, t.prototype.unshift = function(t) {
            var e = {
                data: t,
                next: this.head
            };
            0 === this.length && (this.tail = e), this.head = e, ++this.length
        }, t.prototype.shift = function() {
            if (0 !== this.length) {
                var t = this.head.data;
                return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, t
            }
        }, t.prototype.clear = function() {
            this.head = this.tail = null, this.length = 0
        }, t.prototype.join = function(t) {
            if (0 === this.length) return "";
            for (var e = this.head, i = "" + e.data; e = e.next;) i += t + e.data;
            return i
        }, t.prototype.concat = function(t) {
            if (0 === this.length) return r.alloc(0);
            if (1 === this.length) return this.head.data;
            for (var e, i, n, o = r.allocUnsafe(t >>> 0), a = this.head, s = 0; a;) e = a.data, i = o, n = s, e.copy(i, n), s += a.data.length, a = a.next;
            return o
        }, t
    }(), n && n.inspect && n.inspect.custom && (t.exports.prototype[n.inspect.custom] = function() {
        var t = n.inspect({
            length: this.length
        });
        return this.constructor.name + " " + t
    })
}, function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "browser", function() {
        return o
    }), i.d(e, "mobPlatforms", function() {
        return a
    }), i.d(e, "browserFeatures", function() {
        return s
    }), i.d(e, "initBrowserUtils", function() {
        return u
    });
    var r = i(506),
        n = navigator.userAgent.toLowerCase(),
        o = {
            version: (n.match(/.+(?:me|ox|on|rv|it|era|opr|ie|edge)[\/: ]([\d.]+)/) || [0, "0"])[1],
            opera: /opera/i.test(n) || /opr/i.test(n),
            vivaldi: /vivaldi/i.test(n),
            amigo: /amigo.*mrchrome soc/i.test(n),
            msie: /msie/i.test(n) && !/opera/i.test(n) || /trident\//i.test(n) || /edge/i.test(n),
            msie6: /msie 6/i.test(n) && !/opera/i.test(n),
            msie7: /msie 7/i.test(n) && !/opera/i.test(n),
            msie8: /msie 8/i.test(n) && !/opera/i.test(n),
            msie9: /msie 9/i.test(n) && !/opera/i.test(n),
            msie_edge: /edge/i.test(n) && !/opera/i.test(n),
            mozilla: /firefox/i.test(n),
            chrome: /chrome/i.test(n) && !/edge/i.test(n),
            safari: !/chrome/i.test(n) && /webkit|safari|khtml/i.test(n),
            iphone: /iphone/i.test(n),
            ipod: /ipod/i.test(n),
            iphone4: /iphone.*OS 4/i.test(n),
            ipod4: /ipod.*OS 4/i.test(n),
            ipad: /ipad/i.test(n),
            android: /android/i.test(n),
            bada: /bada/i.test(n),
            mobile: /iphone|ipod|ipad|opera mini|opera mobi|iemobile|android/i.test(n),
            msie_mobile: /iemobile/i.test(n),
            safari_mobile: /iphone|ipod|ipad/i.test(n),
            opera_mobile: /opera mini|opera mobi/i.test(n),
            opera_mini: /opera mini/i.test(n),
            mac: /mac/i.test(n),
            windows7: /windows nt 6.1/i.test(n),
            windowsVista: /windows nt 6.0/i.test(n),
            windowsXp: /windows nt (5.2|5.1)/i.test(n),
            search_bot: /(yandex|google|stackrambler|aport|slurp|msnbot|bingbot|twitterbot|ia_archiver|facebookexternalhit)/i.test(n),
            smart_tv: /smart-tv|smarttv/i.test(n)
        },
        a = {
            1: 1,
            2: 1,
            3: 1,
            4: 1,
            5: 1,
            8: 1
        },
        s = {
            wheelEvent: "onwheel" in Object(r.ce)("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : o.mozilla ? "MozMousePixelScroll" : "DOMMouseScroll",
            hasBoundingClientRect: "getBoundingClientRect" in Object(r.ce)("div"),
            cmaEnabled: navigator.credentials && navigator.credentials.preventSilentAccess && window.vk && vk.cma
        };

    function u() {
        window._ua || (window._ua = navigator.userAgent.toLowerCase()), window.locDomain || (window.locDomain = location.host.toString().match(/[a-zA-Z]+\.[a-zA-Z]+\.?$/)[0]), window.locHost = location.host, window.locProtocol = location.protocol, window.locHash = location.hash.replace("#/", "").replace("#!", "")
    }
}, function(t, e, i) {
    var r = e;
    r.bignum = i(218), r.define = i(265).define, r.base = i(631), r.constants = i(421), r.decoders = i(137), r.encoders = i(312)
}, , , , function(t, e, i) {
    "use strict";

    function r(t, e) {
        AudioUtils.isPodcast(e) && stManager.add([jsc("web/podcast.js")], function() {
            Podcast.deleteEpisode(e.fullId, e.deleteHash)
        })
    }
    i.r(e), i.d(e, "deleteEpisode", function() {
        return r
    })
}, , function(t, e, i) {
    "use strict";
    t.exports = o;
    var r = i(608),
        n = i(192);

    function o(t) {
        if (!(this instanceof o)) return new o(t);
        r.call(this, t)
    }
    n.inherits = i(581), n.inherits(o, r), o.prototype._transform = function(t, e, i) {
        i(null, t)
    }
}, , , function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "getDurationMod", function() {
        return a
    }), i.d(e, "drawAudio", function() {
        return s
    });
    var r = 600,
        n = 3600,
        o = 36e3;

    function a(t) {
        return t < r ? "s" : t < n ? "m" : t < o ? "l" : "n"
    }

    function s(t, e) {
        for (var i = JSON.parse(getTemplate("audio_bits_to_cls")), r = t[AudioUtils.AUDIO_ITEM_INDEX_FLAGS], n = [], o = 0; o < 32; o++) {
            var s = 1 << o;
            r & s && n.push(i[s])
        }
        AudioUtils.isPodcast(t) && (n.push("audio_podcast"), AudioUtils.isPrivatePodcast(t) && n.push("audio_podcast_private")), e && n.push(e);
        var u = "";
        if (t[AudioUtils.AUDIO_ITEM_INDEX_COVER_URL]) {
            var d = t[AudioUtils.AUDIO_ITEM_INDEX_COVER_URL].split(",");
            u = "background-image: url(" + d[0] + ")"
        }
        var c = AudioUtils.getAudioPerformers(t),
            f = t[AudioUtils.AUDIO_ITEM_INDEX_DURATION],
            l = formatTime(f),
            h = clean(JSON.stringify(t)),
            p = getTemplate("audio_row", t);
        return p = (p = (p = (p = (p = (p = p.replace(/%cls%/, function() {
            return n.join(" ")
        })).replace(/%duration%/, function() {
            return l
        })).replace(/%serialized%/, function() {
            return h
        })).replace(/%cover_style%/, function() {
            return u
        })).replace(/%performers%/, function() {
            return c
        })).replace(/%duration_mod%/, function() {
            return a(f)
        })
    }
}, function(t, e, i) {
    var r = i(370),
        n = i(147),
        o = i(484),
        a = i(547),
        s = i(600),
        u = i(307).Buffer,
        d = u.alloc(128),
        c = {
            md5: 16,
            sha1: 20,
            sha224: 28,
            sha256: 32,
            sha384: 48,
            sha512: 64,
            rmd160: 20,
            ripemd160: 20
        };

    function f(t, e, i) {
        var a = function(t) {
                return "rmd160" === t || "ripemd160" === t ? n : "md5" === t ? r : function(e) {
                    return o(t).update(e).digest()
                }
            }(t),
            s = "sha512" === t || "sha384" === t ? 128 : 64;
        e.length > s ? e = a(e) : e.length < s && (e = u.concat([e, d], s));
        for (var f = u.allocUnsafe(s + c[t]), l = u.allocUnsafe(s + c[t]), h = 0; h < s; h++) f[h] = 54 ^ e[h], l[h] = 92 ^ e[h];
        var p = u.allocUnsafe(s + i + 4);
        f.copy(p, 0, 0, s), this.ipad1 = p, this.ipad2 = f, this.opad = l, this.alg = t, this.blocksize = s, this.hash = a, this.size = c[t]
    }
    f.prototype.run = function(t, e) {
        return t.copy(e, this.blocksize), this.hash(e).copy(this.opad, this.blocksize), this.hash(this.opad)
    }, t.exports = function(t, e, i, r, n) {
        a(t, e, i, r), u.isBuffer(t) || (t = u.from(t, s)), u.isBuffer(e) || (e = u.from(e, s));
        var o = new f(n = n || "sha1", t, e.length),
            d = u.allocUnsafe(r),
            l = u.allocUnsafe(e.length + 4);
        e.copy(l, 0, 0, e.length);
        for (var h = 0, p = c[n], _ = Math.ceil(r / p), y = 1; y <= _; y++) {
            l.writeUInt32BE(y, e.length);
            for (var b = o.run(l, o.ipad1), g = b, v = 1; v < i; v++) {
                g = o.run(g, o.ipad2);
                for (var m = 0; m < p; m++) b[m] ^= g[m]
            }
            b.copy(d, h), h += p
        }
        return d
    }
}, function(t) {
    t.exports = {
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
}, , function(t) {
    t.exports = {
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
}, , function(t, e, i) {
    "use strict";
    i.r(e);
    var r = i(462),
        n = i(135),
        o = i(51),
        a = i(499),
        s = i(528),
        u = i(273),
        d = i(776);

    function c(t, e, i) {
        var r = t.getContext("2d");
        r.clearRect(0, 0, t.width, t.height), r.fillStyle = i ? "#3D6899" : "#ffffff";
        for (var n = 0; n < 4; n++) {
            var o = 2 + 12 * e[n];
            r.fillRect(13 + 4 * n, 12 - o + 14, 2, o)
        }
    }
    window.TopAudioPlayer = n.TopAudioPlayer, window.AudioPlaylist = o.AudioPlaylist, window.AudioPlayerHTML5 = u.AudioPlayerHTML5, window.AudioPlayerFlash = d.AudioPlayerFlash, window.AudioPlayer || (window.AudioPlayer = function() {
        var t = this;
        this._currentAudio = !1, this._isPlaying = !1, this._prevPlaylist = null, this._currentPlaylist = null, this._playlists = [], this.subscribers = [], this._tasks = [], this._statusExport = {}, this._currentPlayingRows = [], this._podcastsActionRef = {}, this._podcastsActionLastId = {}, this._allowPrefetchNext = !1, vk.isBanned || (r.AudioUtils.debugLog("Player creation"), this._initImpl(), this._initEvents(), this._restoreVolumeState(), this._podcastCleanStates(), setTimeout(function() {
            t.restoreState(), r.AudioUtils.toggleAudioHQBodyClass(), t.updateCurrentPlaying()
        }))
    }), AudioPlayer.prototype.getVersion = function() {
        return 15
    }, AudioPlayer.prototype._initImpl = function(t) {
        var e = this;
        this._impl && this._impl.destroy();
        var i = 0,
            n = function(t) {
                if (-1 != i) {
                    if (t && (i++, this._implSetDelay(200), i > 3)) {
                        i = -1;
                        var e = new MessageBox({
                            title: getLang("global_error")
                        }).content(getLang("audio_error_loading")).setButtons("Ok", function() {
                            i = 0, curBox().hide()
                        });
                        return e.show(), Object(s.setWorkerTimeout)(function() {
                            i = 0, e.hide()
                        }, 3e3), this.notify(AudioPlayer.EVENT_ENDED), void this.notify(AudioPlayer.EVENT_FAILED)
                    }
                    r.AudioUtils.isPodcast(this.getCurrentAudio()) ? (this._isPlaying = !1, this.notify(AudioPlayer.EVENT_PAUSE), this.notify(AudioPlayer.EVENT_ENDED), this.stop()) : this._repeatCurrent ? (this._implSeekImmediate(0), this._implPlay()) : (this._isPlaying = !1, this.notify(AudioPlayer.EVENT_PAUSE), this.notify(AudioPlayer.EVENT_ENDED), this.playNext(!0)), this._sendListenedData()
                }
            }.bind(this),
            o = {
                onBufferUpdate: function(t) {
                    this.notify(AudioPlayer.EVENT_BUFFERED, t)
                }.bind(this),
                onEnd: function() {
                    0,
                    n()
                },
                onFail: function() {
                    e._sendPlayerErrorStats(e._impl), 0, n(!0)
                },
                onCanPlay: function() {
                    this.notify(AudioPlayer.EVENT_CAN_PLAY)
                }.bind(this),
                onProgressUpdate: function(t, e) {
                    var i = this.getCurrentAudio();
                    !this._muteProgressEvents && i && this.notify(AudioPlayer.EVENT_PROGRESS, t, i[r.AudioUtils.AUDIO_ITEM_INDEX_DURATION], e)
                }.bind(this),
                onFrequency: function(t) {
                    e.notify(AudioPlayer.EVENT_FREQ_UPDATE, t)
                }
            };
        r.AudioUtils.debugLog("Implementation init"), r.AudioUtils.debugLog("param browser.flash", browser.flash), r.AudioUtils.debugLog("param force HTML5", !!t), t ? this._impl = new u.AudioPlayerHTML5(o) : u.AudioPlayerHTML5.isSupported() ? this._impl = new u.AudioPlayerHTML5(o) : browser.flash && (this._impl = new d.AudioPlayerFlash(o)), this._implSetVolume(0)
    }, AudioPlayer.EVENT_CURRENT_CHANGED = "curr", AudioPlayer.EVENT_PLAY = "start", AudioPlayer.EVENT_PAUSE = "pause", AudioPlayer.EVENT_STOP = "stop", AudioPlayer.EVENT_UPDATE = "update", AudioPlayer.EVENT_LOADED = "loaded", AudioPlayer.EVENT_ENDED = "ended", AudioPlayer.EVENT_FAILED = "failed", AudioPlayer.EVENT_BUFFERED = "buffered", AudioPlayer.EVENT_PROGRESS = "progress", AudioPlayer.EVENT_VOLUME = "volume", AudioPlayer.EVENT_PLAYLIST_CHANGED = "plchange", AudioPlayer.EVENT_ADDED = "added", AudioPlayer.EVENT_REMOVED = "removed", AudioPlayer.EVENT_FREQ_UPDATE = "freq", AudioPlayer.EVENT_SEEK = "seek", AudioPlayer.EVENT_AD_READY = "ad_ready", AudioPlayer.EVENT_AD_DEINITED = "ad_deinit", AudioPlayer.EVENT_AD_STARTED = "ad_started", AudioPlayer.EVENT_AD_COMPLETED = "ad_completed", AudioPlayer.EVENT_START_LOADING = "start_load", AudioPlayer.EVENT_CAN_PLAY = "actual_start", AudioPlayer.LS_VER = "v20", AudioPlayer.LS_KEY_PREFIX = "audio", AudioPlayer.LS_PREFIX = AudioPlayer.LS_KEY_PREFIX + "_" + AudioPlayer.LS_VER + "_", AudioPlayer.LS_VOLUME = "vol", AudioPlayer.LS_PL = "pl", AudioPlayer.LS_TRACK = "track", AudioPlayer.LS_SAVED = "saved", AudioPlayer.LS_PROGRESS = "progress", AudioPlayer.LS_PODCASTS = "podcasts", AudioPlayer.LS_DURATION_TYPE = "dur_type", AudioPlayer.LS_UUID = "uuid", AudioPlayer.LS_ADS_CURRENT_DELAY = "ads_current_delay_v4", AudioPlayer.PLAYBACK_RATE_STEP = .5, AudioPlayer.PLAYBACK_RATE_MAX = 3, AudioPlayer.DEFAULT_VOLUME = .8, AudioPlayer.AD_TYPE = "preroll", window.audioIconSuffix = window.devicePixelRatio >= 2 ? "_2x" : "", AudioPlayer.tabIcons = {
        def: "/images/icons/favicons/fav_logo" + audioIconSuffix + ".ico",
        play: "/images/icons/favicons/fav_play" + audioIconSuffix + ".ico",
        pause: "/images/icons/favicons/fav_pause" + audioIconSuffix + ".ico"
    }, AudioPlayer.getLang = function(t) {
        var e = getAudioPlayer();
        return e && e.langs ? e.langs[t] : t
    }, AudioPlayer.clearDeprecatedCacheKeys = function() {
        AudioPlayer._iterateCacheKeys(function(t) {
            return t == AudioPlayer.LS_VER
        })
    }, AudioPlayer.clearOutdatedCacheKeys = function() {
        (ls.get(AudioPlayer.LS_PREFIX + AudioPlayer.LS_SAVED) || 0) < vkNow() - 72e5 && AudioPlayer._iterateCacheKeys(function(t, e) {
            return !inArray(e, [AudioPlayer.LS_PL, AudioPlayer.LS_TRACK, AudioPlayer.LS_PROGRESS])
        })
    }, AudioPlayer.clearAllCacheKeys = function() {
        AudioPlayer._iterateCacheKeys(function() {
            return !1
        }), setCookie("remixcurr_audio", "", -1)
    }, AudioPlayer._iterateCacheKeys = function(t) {
        for (var e in window.localStorage)
            if (0 === e.indexOf(AudioPlayer.LS_KEY_PREFIX + "_")) {
                var i = e.split("_");
                t(i[1], i[2]) || localStorage.removeItem(e)
            }
    }, AudioPlayer.prototype.onMediaKeyPressedEvent = function(t) {
        var e = this.getCurrentAudio();
        this.getCurrentPlaylist();
        if (e) switch (t.keyCode) {
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
    }, AudioPlayer.prototype.deletePlaylist = function(t) {
        for (var e = 0; e < this._playlists.length; e++) this._playlists[e] == t && this._playlists.splice(e, 1)
    }, AudioPlayer.prototype.mergePlaylistData = function(t, e) {
        if (!t.hasMore()) return t;
        each(this._playlists, function(i, r) {
            r.getId() == t.getId() && r.mergeWith(e)
        })
    }, AudioPlayer.prototype.deleteCurrentPlaylist = function() {
        this.stop(), delete this._currentAudio, delete this._currentPlaylist, this.notify(AudioPlayer.EVENT_UPDATE), this.notify(AudioPlayer.EVENT_PLAYLIST_CHANGED), this.updateCurrentPlaying()
    }, AudioPlayer.prototype.updateCurrentPlaying = function(t) {
        t = !!t;
        var e = r.AudioUtils.asObject(this.getCurrentAudio()),
            i = [];
        if (e) {
            var n = geByClass("_audio_row_" + e.fullId);
            i = i.concat([].slice.call(n))
        }
        for (var o = 0, a = this._currentPlayingRows.length; o < a; o++) {
            (s = this._currentPlayingRows[o]) && !inArray(s, i) && this.toggleCurrentAudioRow(s, !1, t)
        }
        if (e)
            for (o = 0, a = i.length; o < a; o++) {
                var s;
                if (s = i[o]) {
                    if (gpeByClass("article_editor_canvas", s)) continue;
                    this.toggleCurrentAudioRow(s, !0, t)
                }
            }
        this._currentPlayingRows = i, each(geByClass("_audio_pl"), function() {
            removeClass(this, "audio_pl__playing")
        });
        var u, d = this.isPlaying(),
            c = this.getCurrentPlaylist();
        d && c && ((u = geByClass("_audio_pl_" + c.getOwnerId() + "_" + c.getPlaylistId())) && each(u, function() {
            addClass(this, "audio_pl__playing")
        }))
    }, AudioPlayer.prototype.toggleCurrentAudioRow = function(t, e, i) {
        var n = r.AudioUtils.getAudioFromEl(t, !0);
        if (n.isCurrent != e) {
            addClass(t, r.AudioUtils.AUDIO_CURRENT_CLS);
            var o = geByClass1("_audio_row__title", t),
                a = geByClass1("_audio_row__duration", t),
                s = geByClass1("_audio_row__play_btn", t),
                u = r.AudioUtils.getDurationMod(e ? n.duration : n.duration * this.getCurrentProgress()),
                d = function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                    if (a) {
                        var i = r.AudioUtils.getDurationMod(t);
                        a.innerHTML = e + formatTime(t), i !== u && (replaceClass(a, r.AudioUtils.AUDIO_DURATION_CLS + "-" + u, r.AudioUtils.AUDIO_DURATION_CLS + "-" + i), u = i)
                    }
                };
            n.withInlinePlayer && toggleClass(t, "audio_row__player_transition", i), (i = !!n.withInlinePlayer && i) ? setTimeout(f.bind(this), 0) : f.call(this)
        }

        function f() {
            var a = this;
            if (n.withInlinePlayer && (e ? this._addRowPlayer(t, i) : this._removeRowPlayer(t)), e) {
                this.on(t, AudioPlayer.EVENT_PLAY, function(e) {
                    r.AudioUtils.asObject(e).fullId == n.fullId && (addClass(t, r.AudioUtils.AUDIO_PLAYING_CLS), s && attr(s, "aria-label", getLang("global_audio_pause")), o && attr(o, "role", "heading"))
                }), this.on(t, AudioPlayer.EVENT_PROGRESS, function(t, e, i) {
                    if (n.withInlinePlayer || !a.isAdPlaying()) {
                        i = intval(i);
                        var r = 0,
                            o = "";
                        a.getDurationType() ? (r = Math.round(i - e * i), o = "-") : r = Math.round(e * i), d(r, o)
                    } else d(n.duration)
                }), this.on(t, [AudioPlayer.EVENT_PAUSE, AudioPlayer.EVENT_ENDED], function() {
                    removeClass(t, r.AudioUtils.AUDIO_PLAYING_CLS), s && attr(s, "aria-label", getLang("global_audio_play")), o && attr(o, "role", "")
                });
                var u = data(t, "bars");
                if (!u && (n.isWithCovers || n.isNumeric || n.isPodcastListSnippet)) {
                    if (u = se('<canvas class="audio_row__sound_bars"></canvas>'), n.isPodcastListSnippet ? geByClass1("podcast_list_snippet__cover", t).appendChild(u) : t.appendChild(u), u.width = r.AudioUtils.AUDIO_ROW_COVER_SIZE * (isRetina() ? 2 : 1), u.height = r.AudioUtils.AUDIO_ROW_COVER_SIZE * (isRetina() ? 2 : 1), u.style.width = r.AudioUtils.AUDIO_ROW_COVER_SIZE, u.style.height = r.AudioUtils.AUDIO_ROW_COVER_SIZE, isRetina()) u.getContext("2d").scale(2, 2);
                    var f = n.isNumeric;
                    this.on(t, AudioPlayer.EVENT_FREQ_UPDATE, function(t, e) {
                        c(u, e, f)
                    }), c(u, [0, 0, 0, 0], f), data(t, "bars", u)
                }
                toggleClass(t, r.AudioUtils.AUDIO_PLAYING_CLS, this.isPlaying())
            } else {
                this.off(t), removeClass(t, r.AudioUtils.AUDIO_PLAYING_CLS), removeClass(t, r.AudioUtils.AUDIO_CURRENT_CLS), d(n.duration), s && attr(s, "aria-label", getLang("global_audio_play")), o && attr(o, "role", "");
                var l = data(t, "bars");
                l && (re(l), data(t, "bars", null))
            }
            i ? setTimeout(function() {
                var e = r.AudioUtils.getAudioFromEl(t, !0);
                toggleClass(t, r.AudioUtils.AUDIO_CURRENT_CLS, !!e.isCurrent)
            }, 0) : toggleClass(t, r.AudioUtils.AUDIO_CURRENT_CLS, e)
        }
    }, AudioPlayer.prototype._removeRowPlayer = function(t) {
        removeClass(t, r.AudioUtils.AUDIO_CURRENT_CLS);
        var e = data(t, "player_inited");
        if (e) {
            setTimeout(function() {
                re(geByClass1("_audio_inline_player", t))
            }, 200);
            var i = geByClass1("_audio_duration", t);
            i && (i.innerHTML = formatTime(r.AudioUtils.getAudioFromEl(t, !0).duration)), this.off(t), each(e.sliders, function() {
                this.destroy()
            }), data(t, "player_inited", !1);
            var n = geByClass1("has_audio_player", t);
            n && removeClass(n, "has_audio_player")
        }
    }, AudioPlayer.prototype._addRowPlayer = function(t, e) {
        if (!(geByClass1("_audio_inline_player", t) || hasClass(t, "podcast_list_snippet") || hasClass(t, "podcast_snippet__controls"))) {
            var i = this,
                n = se(vk.audioInlinePlayerTpl || getTemplate("audio_inline_player")),
                o = geByClass1("_audio_player__place", t);
            o.appendChild(n), addClass(o, "has_audio_player");
            var a = new Slider(geByClass1("audio_inline_player_volume", n), {
                    value: i.getVolume(),
                    backValue: 0,
                    size: 1,
                    hintClass: "audio_player_hint",
                    withBackLine: !0,
                    log: !0,
                    formatHint: function(t) {
                        return Math.round(100 * t) + "%"
                    },
                    onChange: function(t) {
                        i.setVolume(t)
                    }
                }),
                s = new Slider(geByClass1("audio_inline_player_progress", n), {
                    value: 0,
                    backValue: 0,
                    size: 1,
                    hintClass: "audio_player_hint",
                    withBackLine: !0,
                    formatHint: function(t) {
                        var e = r.AudioUtils.asObject(i.getCurrentAudio());
                        return formatTime(Math.round(t * e.duration))
                    },
                    onEndDragging: function(t) {
                        var e = r.AudioUtils.asObject(i.getCurrentAudio());
                        e && r.AudioUtils.isPodcast(e) && i.podcastSetActionRef(e, r.AudioUtils.PodcastsLogs.ACTION_SEEK, "", n), i.seek(t)
                    }
                });
            i.isAdPlaying() && s.toggleAdState(!0), i.on(t, AudioPlayer.EVENT_AD_DEINITED, function() {}), i.on(t, AudioPlayer.EVENT_AD_READY, function() {}), i.on(t, AudioPlayer.EVENT_AD_STARTED, function() {
                s.toggleAdState(!0), s.setBackValue(0)
            }), i.on(t, AudioPlayer.EVENT_AD_COMPLETED, function() {
                s.toggleAdState(!1)
            }), i.on(t, AudioPlayer.EVENT_START_LOADING, function() {
                s.toggleLoading(!0)
            }), i.on(t, AudioPlayer.EVENT_CAN_PLAY, function() {
                s.toggleLoading(!1)
            }), i.on(t, AudioPlayer.EVENT_BUFFERED, function(t, e) {
                s.setBackValue(e)
            }), i.on(t, AudioPlayer.EVENT_PROGRESS, function(t, e) {
                s.toggleLoading(!1), s.setValue(e)
            }), i.on(t, AudioPlayer.EVENT_VOLUME, function(t, e) {
                a.setValue(e)
            }), data(t, "player_inited", {
                sliders: [a, s]
            })
        }
    }, AudioPlayer.prototype.hasStatusExport = function() {
        for (var t in this._statusExport)
            if (this._statusExport[t]) return !0;
        return !1
    }, AudioPlayer.prototype.getStatusExportInfo = function() {
        return this._statusExport
    }, AudioPlayer.prototype.setStatusExportInfo = function(t) {
        this._statusExport = t
    }, AudioPlayer.prototype.deleteAudioFromAllPlaylists = function(t) {
        t = isObject(t) || isArray(t) ? r.AudioUtils.asObject(t).fullId : t, each(this._playlists, function(e, i) {
            i.removeAudio(t)
        })
    }, AudioPlayer.prototype.updateAudio = function(t, e) {
        var i = "";
        if (isString(t) ? i = t : isArray(t) && (i = r.AudioUtils.asObject(t).fullId), e || (e = t), each(this._playlists, function(t, n) {
                for (var o = n.getAudiosList(), a = 0, s = o.length; a < s; a++)
                    if (o[a][r.AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + o[a][r.AudioUtils.AUDIO_ITEM_INDEX_ID] == i) return isObject(e) && each(e, function(t, e) {
                        o[a][t] = e
                    }), void(isArray(e) && (o[a] = e))
            }), this._currentAudio[r.AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + this._currentAudio[r.AudioUtils.AUDIO_ITEM_INDEX_ID] == i) {
            if (isObject(e)) {
                var n = this;
                each(e, function(t, e) {
                    n._currentAudio[t] = e
                })
            }
            isArray(e) && (this._currentAudio = e, this.notify(AudioPlayer.EVENT_CURRENT_CHANGED))
        }
        return this.notify(AudioPlayer.EVENT_UPDATE), t
    }, AudioPlayer.prototype._triggerTNSPixel = function() {
        var t = this._lsGet("tns_triggered_time_v3") || 0;
        vkNow() - t < 864e5 || (this._lsSet("tns_triggered_time_v3", vkNow()), vkImage().src = "https://www.tns-counter.ru/V13a****mail_ru/ru/CP1251/tmsec=mail_audiostart/" + irand(1, 1e9))
    }, AudioPlayer.prototype._sendLCNotification = function() {
        var t = window.Notifier;
        t && t.lcSend("audio_start");
        try {
            window.Videoview && Videoview.togglePlay(!1)
        } catch (t) {}
    }, AudioPlayer.prototype.showHQLabel = function(t) {
        var e = "_audio_show_hq_label";
        return void 0 === t ? !!ls.get(e) : (t = !!t, ls.set(e, t), r.AudioUtils.toggleAudioHQBodyClass(), t)
    }, AudioPlayer.prototype._restoreVolumeState = function() {
        AudioPlayer.clearDeprecatedCacheKeys(), AudioPlayer.clearOutdatedCacheKeys();
        var t = this._lsGet(AudioPlayer.LS_VOLUME);
        this._userVolume = void 0 == t || !1 === t ? AudioPlayer.DEFAULT_VOLUME : t
    }, AudioPlayer.prototype.restoreState = function() {
        if (!vk.widget && (AudioPlayer.clearDeprecatedCacheKeys(), AudioPlayer.clearOutdatedCacheKeys(), !window.cur.audioPreventRestoreTrack)) {
            this._currentAudio = this._lsGet(AudioPlayer.LS_TRACK);
            var t = this._lsGet(AudioPlayer.LS_PL);
            t && (t = JSON.parse(t), this._currentPlaylist = new o.AudioPlaylist(t), this._initPlayingContext(t.context), t.originalPlaylistRawId && (this._currentPlaylist._originalPlaylistRawId = t.originalPlaylistRawId)), this._currentPlaylist && this._currentAudio ? this.notify(AudioPlayer.EVENT_UPDATE) : this._currentPlaylist = this._currentAudio = !1;
            var e = 0;
            if (r.AudioUtils.isPodcast(this._currentAudio)) e = ((this._podcastGetStates()[this._currentAudio[r.AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + this._currentAudio[r.AudioUtils.AUDIO_ITEM_INDEX_ID]] || {}).position || 0) / this._currentAudio[r.AudioUtils.AUDIO_ITEM_INDEX_DURATION];
            else e = this._lsGet(AudioPlayer.LS_PROGRESS) || 0;
            this._currentAudio && e && this._impl && 0 === this._impl.type.indexOf("html5") && (this._implSetUrl(this._currentAudio, !0), e < 1 && this._implSeek(e), this._implSetVolume(0)), this.notify(AudioPlayer.EVENT_CURRENT_CHANGED), this._updatePlaybackRate()
        }
    }, AudioPlayer.prototype._ensureImplReady = function(t) {
        var e = this;
        this._impl && this._impl.onReady(function(i) {
            if (i) return t();
            "flash" == e._impl.type && (r.AudioUtils.debugLog("Flash not initialized, lets try HTML5 as desperate way"), e._initImpl(!0))
        })
    }, AudioPlayer.prototype._implNewTask = function(t, e) {
        this._taskIDCounter = this._taskIDCounter || 1, this._tasks = this._tasks || [], this._tasks.push({
            name: t,
            cb: e,
            id: t + "_" + this._taskIDCounter++
        }), this._implDoTasks()
    }, AudioPlayer.prototype._implDoTasks = function() {
        if (this._tasks = this._tasks || [], !this._taskInProgress) {
            var t = this._tasks.shift();
            if (t) {
                var e = this;
                t = clone(t), this._taskInProgress = t.id, this._ensureImplReady(function() {
                    t.cb.call(e, function() {
                        e._taskAbort != t.id ? (e._taskInProgress = !1, e._implDoTasks()) : e._taskAbort = !1
                    })
                })
            }
        }
    }, AudioPlayer.prototype._implClearAllTasks = function() {
        this._taskAbort = this._taskInProgress, this._taskInProgress = !1, this._tasks = []
    }, AudioPlayer.prototype._implClearTask = function(t) {
        this._tasks = this._tasks || [], this._tasks = this._tasks.filter(function(e) {
            return e.name != t
        })
    }, AudioPlayer.prototype._implSetDelay = function(t) {
        this._implNewTask("delay", function t(e) {
            Object(s.setWorkerTimeout)(e, t)
        })
    }, AudioPlayer.prototype.getDeviceId = function() {
        var t = ls.get(AudioPlayer.LS_PREFIX + AudioPlayer.LS_UUID);
        return t || (t = a(), ls.set(AudioPlayer.LS_PREFIX + AudioPlayer.LS_UUID, t)), t
    }, AudioPlayer.prototype._implPlay = function() {
        var t = this;
        this._implNewTask("play", function(e) {
            var i = r.AudioUtils.asObject(t.getCurrentAudio());
            if (t._impl.play(i.url), t._muteProgressEvents = !1, t._allowPrefetchNext = !0, i.actionHash && (r.AudioUtils.connectListenQueue(), ajax.post("al_audio.php", {
                    act: "start_playback",
                    audio_id: i.id,
                    owner_id: i.owner_id,
                    hash: i.actionHash,
                    uuid: t.getDeviceId()
                })), r.AudioUtils.isPodcast(i)) {
                var n = t._podcastRestoreState();
                t._podcastUpdateState(i, n, 0, r.AudioUtils.PodcastsLogs.ACTION_PLAY)
            }
            e()
        })
    }, AudioPlayer.prototype._implSeekImmediate = function(t) {
        this._impl && this._impl.seek(t)
    }, AudioPlayer.prototype._implSeek = function(t) {
        var e = this;
        this._implClearTask("seek"), this._implNewTask("seek", function(i) {
            e._impl.seek(t), i()
        })
    }, AudioPlayer.prototype._implPause = function() {
        var t = this;
        this._implNewTask("pause", function(e) {
            t._impl.pause(), e()
        })
    }, AudioPlayer.prototype._implSetVolume = function(t, e) {
        if (this._impl) {
            var i = this;
            if (e) {
                var r = 0 == t ? "vol_down" : "vol_up";
                this._implNewTask(r, function(e) {
                    i._impl.fadeVolume(t, function() {
                        e()
                    })
                })
            } else this._implNewTask("vol_set", function(e) {
                i._impl.setVolume(t), e()
            })
        }
    }, AudioPlayer.prototype._implSetUrl = function(t, e) {
        var i = this;
        this._implClearTask("url"), this._implNewTask("url", function(n) {
            e || i.notify(AudioPlayer.EVENT_START_LOADING);
            var o = i._taskInProgress;
            i._ensureHasURL(t, function(t) {
                o == i._taskInProgress && (t = r.AudioUtils.asObject(t), i._impl.setUrl(t.url, function(t) {
                    t || (i._implClearAllTasks(), i._onFailedUrl()), n()
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
        var t = intval(ls.get(AudioPlayer.LS_PREFIX + AudioPlayer.LS_DURATION_TYPE));
        t = !t, ls.set(AudioPlayer.LS_PREFIX + AudioPlayer.LS_DURATION_TYPE, t), this.notify(AudioPlayer.EVENT_UPDATE, this.getCurrentProgress())
    }, AudioPlayer.prototype.getDurationType = function() {
        return intval(ls.get(AudioPlayer.LS_PREFIX + AudioPlayer.LS_DURATION_TYPE))
    }, AudioPlayer.prototype.getCurrentProgress = function() {
        return this._impl ? this._impl.getCurrentProgress() : 0
    }, AudioPlayer.prototype.getCurrentBuffered = function() {
        return this._impl ? this._impl.getCurrentBuffered() : 0
    }, AudioPlayer.prototype._initEvents = function() {
        var t = window.Notifier,
            e = this;
        t && (t.addRecvClbk("audio_start", "audio", function(t) {
            e.isPlaying() && e.pause(!1, !e._fadeVolumeWorker), delete e.pausedByVideo
        }), t.addRecvClbk("video_start", "audio", function(t) {
            e.isPlaying() && (e.pause(), e.pausedByVideo = vkNow())
        }), t.addRecvClbk("video_hide", "audio", function(t) {
            !e.isPlaying() && e.pausedByVideo && (vkNow() - e.pausedByVideo < 18e4 && e.play(), delete e.pausedByVideo)
        }), t.addRecvClbk("logged_off", "audio", function() {
            cur.loggingOff = !0, AudioPlayer.clearAllCacheKeys(), e.stop()
        }), t.addRecvClbk("stories_video_start", "audio", function() {
            e.isPlaying() && (e.pause(), e.pausedByStories = vkNow())
        }), t.addRecvClbk("stories_video_end", "audio", function() {
            !e.isPlaying() && e.pausedByStories && (vkNow() - e.pausedByStories < 18e4 && e.play(), delete e.pausedByStories)
        }))
    }, AudioPlayer.prototype.addPlaylist = function(t) {
        this.hasPlaylist(t.getId()) || this._playlists.push(t)
    }, AudioPlayer.prototype._cleanUpPlaylists = function() {
        for (var t = 0, e = -1, i = this._playlists.length - 1; i >= 0; i--) {
            if (!(u = this._playlists[i]).isReference() && (t += u.getAudiosCount()) > 4e3) {
                e = i;
                break
            }
        }
        if (-1 != e) {
            e += 1;
            var r = this._playlists.slice(0, e),
                n = this.getCurrentPlaylist(),
                o = [];
            for (i = 0; i < r.length; i++) {
                var a = r[i];
                if (n == a && (a = !1), a && !a.isReference())
                    for (var s = e; s < this._playlists.length; s++) {
                        var u;
                        (u = this._playlists[s]).isReference() && u.getSelf() == a && (a = !1)
                    }
                a && o.push(i)
            }
            for (i = 0; i < o.length; i++) {
                e = o[i];
                this._playlists.splice(e, 1)
            }
            o.length && debugLog("AudioPlayer - " + o.length + " playlists removed")
        }
    }, AudioPlayer.prototype.hasPlaylist = function(t, e, i) {
        var r;
        r = void 0 !== e && void 0 !== i ? t + "_" + e + "_" + i : t;
        for (var n = 0; n < this._playlists.length; n++) {
            var o = this._playlists[n];
            if (!o.isReference() && o.getId() == r) return o
        }
        return !1
    }, AudioPlayer.prototype.getPlaylist = function(t, e, i, r) {
        if (t && !e && !i) {
            var n = t.split("_");
            t = n[0], e = n[1], i = n[2]
        }
        var a = this.hasPlaylist(t, e, i);
        return a ? (a.mergeWith({
            accessHash: r
        }), a) : new o.AudioPlaylist({
            type: t,
            ownerId: e,
            albumId: i,
            hasMore: t != o.AudioPlaylist.TYPE_TEMP,
            accessHash: r
        })
    }, AudioPlayer.prototype.isFromNextSequence = function() {
        return 1 === this._seq
    }, AudioPlayer.prototype.isFromPrevSequence = function() {
        return -1 === this._seq
    }, AudioPlayer.prototype.isAutoPlayed = function() {
        return !!this._autoNext
    }, AudioPlayer.prototype.hasPrevAudio = function() {
        return !(!this._prevAudio || r.AudioUtils.getAudioFullId(this._currentAudio) === r.AudioUtils.getAudioFullId(this._prevAudio))
    }, AudioPlayer.prototype.hasPrevPlaylist = function() {
        return !!this._prevPlaylist
    }, AudioPlayer.prototype.toggleRepeatCurrentAudio = function() {
        this._repeatCurrent = !this._repeatCurrent
    }, AudioPlayer.prototype.isRepeatCurrentAudio = function() {
        return !!this._repeatCurrent
    }, AudioPlayer.prototype.setNext = function(t, e, i) {
        if (vk && vk.widget && !vk.id && window.Widgets) return Widgets.oauth(), !1;
        if (!hasClass(t, "audio_row__added_next")) {
            addClass(t, "audio_row__added_next");
            var n = this.getCurrentPlaylist();
            if (n) {
                var o = r.AudioUtils.asObject(this.getCurrentAudio());
                if (o && e.fullId == o.fullId) return;
                var a = n.indexOfAudio(o);
                if (-1 == a) return;
                var s = n.indexOfAudio(e); - 1 != s ? n.moveAudio(s, a + 1) : n.addAudio(i, a + 1)
            } else {
                var u = r.AudioUtils.getContextPlaylist(t);
                this.play(i, u.playlist, u.context)
            }
            var d = window.AudioPage && currentAudioPage(t);
            if (d) {
                var c = d.getPageCurrentPlaylist();
                c && d.onUserAction(e, c)
            }
        }
    }, AudioPlayer.prototype._setTabIcon = function(t) {
        setFavIcon(AudioPlayer.tabIcons[t])
    }, AudioPlayer.prototype.on = function(t, e, i) {
        isArray(e) || (e = [e]), each(e, function(e, r) {
            this.subscribers.push({
                context: t,
                et: r,
                cb: i
            })
        }.bind(this))
    }, AudioPlayer.prototype.off = function(t) {
        this.subscribers = this.subscribers.filter(function(e) {
            return e.context != t
        })
    }, AudioPlayer.prototype.notify = function(t, e, i, n) {
        var o = this.getCurrentAudio(),
            a = r.AudioUtils.asObject(o);
        if (this._impl && (this.isAdPlaying() || !this._muteProgressEvents || !inArray(t, [AudioPlayer.EVENT_BUFFERED, AudioPlayer.EVENT_PROGRESS]))) switch (inArray(t, [AudioPlayer.EVENT_PLAY, AudioPlayer.EVENT_PAUSE]) && (this.subscribers = this.subscribers.filter(function(t) {
            return !(t.context instanceof Element) || bodyNode.contains(t.context)
        }), this.updateCurrentPlaying(!0)), each(this.subscribers || [], function(r, n) {
            n.et == t && n.cb(o, e, i)
        }), t) {
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
                if (r.AudioUtils.isPodcast(a)) e && n && this._podcastUpdateState(a, e, n, r.AudioUtils.PodcastsLogs.ACTION_HEARTBEAT);
                else if (!this._adsIsAdPlaying()) {
                    var s = this.getCurrentPlaylist(),
                        u = this._impl.getCurrentProgress();
                    if (vk.widget || this._lsSet(AudioPlayer.LS_PROGRESS, u), this._trackListenedData(a, s, n, this._getPlayingContext()), !vk.widget && this._allowPrefetchNext && u >= .8) {
                        var d = s.getNextAudio(o);
                        d && this._impl.isFullyLoaded() && (this._allowPrefetchNext = !1, this._prefetchAudio(d))
                    }
                }
                break;
            case AudioPlayer.EVENT_PAUSE:
                r.AudioUtils.isPodcast(a) && this._podcastUpdateState(a, this.getCurrentProgress(), this._impl.getPlayedTime(), r.AudioUtils.PodcastsLogs.ACTION_PAUSE);
                var c = this.getCurrentPlaylist();
                this._trackListenedData(a, c, n, this._getPlayingContext()), this._setTabIcon("pause");
                break;
            case AudioPlayer.EVENT_SEEK:
                r.AudioUtils.isPodcast(a) && this._podcastUpdateState(a, this.getCurrentProgress(), this._impl.getPlayedTime(), r.AudioUtils.PodcastsLogs.ACTION_SEEK);
                break;
            case AudioPlayer.EVENT_ENDED:
                r.AudioUtils.isPodcast(a) && this._podcastUpdateState(a, this.getCurrentProgress(), this._impl.getPlayedTime(), r.AudioUtils.PodcastsLogs.ACTION_HEARTBEAT)
        }
    }, AudioPlayer.prototype._trackListenedDataSwitch = function(t, e, i) {
        if (this._currentAudioListenData) {
            this._switchPlaylistRef || (this._switchPlaylistRef = this._currentPlaylist);
            var r = 0,
                n = this.isAutoPlayed(),
                o = e && this._prevContext !== e,
                a = this._switchPlaylistRef && i && this._switchPlaylistRef.getId() !== i.getId();
            this._seq && !n ? r = "next_btn" : (o || a) && (r = "playlist_change"), !r && n && (r = "playlist_next"), this._currentAudioListenData.end_stream_reason = r || "unknown", this._switchPlaylistRef = i
        }
    }, AudioPlayer.prototype._trackListenedData = function(t, e, i, n) {
        var a = this;
        if (i = Math.round(i) || 0) {
            var s = {
                audio_id: r.AudioUtils.asObject(t).fullId,
                listened: i,
                context: n
            };
            vk.widget && (s.ref = cur.widgetReferrer || ""), n === o.AudioPlaylist.TYPE_SEARCH && e && (s.search_params = JSON.stringify(e.getSearchParams())), e && (e.getType() === o.AudioPlaylist.TYPE_PLAYLIST && (s.playlist_id = e.getFullId && e.getFullId()), e.isShuffled() && (s.shuffled = 1)), t.trackCode && (s.track_code = t.trackCode), this.isRepeatCurrentAudio() && (s.repeat = "one"), this.isAutoPlayed() && (s.auto = 1), this.hasPrevAudio() && (s.prev_audio_id = r.AudioUtils.asObject(this._prevAudio).fullId), this.hasPrevPlaylist() && this._prevPlaylist.getType() === o.AudioPlaylist.TYPE_PLAYLIST && (s.prev_playlist_id = this._prevPlaylist.getFullId && this._prevPlaylist.getFullId()), this.isPlaying() || (s.end_stream_reason = "stop_btn"), s.state = document.hidden ? "background" : "app", this._currentAudioListenData = s, clearTimeout(this._sendListenedTO), this._sendListenedTO = setTimeout(function() {
                a._sendListenedData()
            }, 1e4)
        }
    }, AudioPlayer.prototype._sendListenedData = function() {
        var t = this;
        clearTimeout(this._sendListenedTO);
        var e = this._currentAudioListenData;
        if (this._currentAudioListenData = !1, e && e.listened && this.getListenedHash()) {
            var i = extend({
                act: "listened_data",
                impl: this._impl.type,
                hash: this.getListenedHash(),
                v: 5,
                loc: nav.strLoc
            }, e);
            isArray(cur.audioLoadTimings) && (i.timings = cur.audioLoadTimings.join(","), cur.audioLoadTimings = []), ajax.post("al_audio.php", i, {
                onDone: function(e) {
                    t._adsConfig = e
                }
            })
        }
    }, AudioPlayer.prototype._sendPlayerErrorStats = function(t) {
        var e = r.AudioUtils.asObject(this.getCurrentAudio()).full_id,
            i = extend({
                audio: e,
                impl_type: t.type,
                progress: this.getCurrentProgress(),
                buffered: this.getCurrentBuffered()
            }, t.getErrorData());
        ajax.post("al_audio.php?act=player_error_stats", i)
    }, AudioPlayer.prototype.playLive = function(t, e) {
        var i = this.getPlaylist(o.AudioPlaylist.TYPE_LIVE, vk.id, data[0]);
        i.mergeWith({
            live: t,
            hasMore: !1
        }), t = i.getLiveInfo();
        var r = this;
        ajax.post("al_audio.php", {
            act: "a_play_audio_status",
            audio_id: t.audioId,
            host_id: t.hostId,
            hash: t.hash
        }, extend(e, {
            onDone: function(t, e, n) {
                i.mergeWith({
                    title: e.title,
                    list: [t]
                }), r.play(t, i, n)
            }
        }))
    }, AudioPlayer.prototype._sendStatusExport = function() {
        var t = this.getCurrentAudio();
        if (t) {
            t = r.AudioUtils.asObject(t);
            var e = this.statusSent ? this.statusSent.split(",") : [!1, 0],
                i = vkNow() - intval(e[1]);
            if (this.hasStatusExport() && !r.AudioUtils.isPodcast(t) && (t.id != e[0] || i > 3e5)) {
                var n = this.getCurrentPlaylist(),
                    o = n ? n.playbackParams : null;
                setTimeout(ajax.post.pbind("al_audio.php", {
                    act: "audio_status",
                    full_id: t.fullId,
                    hash: vk.statusExportHash,
                    top: intval(o && (o.top_audio || o.top))
                }), 0), this.statusSent = t.id + "," + vkNow()
            }
        }
    }, AudioPlayer.prototype.saveStateCurrentPlaylist = function() {
        if (!vk.widget) {
            var t = this.getCurrentPlaylist();
            if (t) {
                var e = t.serialize();
                this._lsSet(AudioPlayer.LS_PL, e)
            } else this._lsSet(AudioPlayer.LS_PL, null);
            this._lsSet(AudioPlayer.LS_SAVED, vkNow())
        }
    }, AudioPlayer.prototype._saveStateCurrentAudio = function() {
        if (!vk.widget) {
            var t = this.getCurrentAudio();
            if (t) {
                var e = clone(t);
                e[r.AudioUtils.AUDIO_ITEM_INDEX_URL] = "", this._lsSet(AudioPlayer.LS_TRACK, e), setCookie("remixcurr_audio", t[r.AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + t[r.AudioUtils.AUDIO_ITEM_INDEX_ID], 1)
            } else this._lsSet(AudioPlayer.LS_TRACK, null), setCookie("remixcurr_audio", null, 1)
        }
    }, AudioPlayer.prototype.seekCurrentAudio = function(t) {
        if (this._adsIsAdPlaying()) return !1;
        var e = 10 / r.AudioUtils.asObject(this.getCurrentAudio()).duration,
            i = this.getCurrentProgress() + (t ? e : -e);
        i = Math.max(0, Math.min(1, i)), this.seek(i)
    }, AudioPlayer.prototype._lsGet = function(t) {
        return ls.get(AudioPlayer.LS_PREFIX + t)
    }, AudioPlayer.prototype._lsSet = function(t, e) {
        ls.set(AudioPlayer.LS_PREFIX + t, e)
    }, AudioPlayer.prototype.setVolume = function(t) {
        t = Math.min(1, Math.max(0, t)), this._userVolume = t, this._implSetVolume(t), this._adsUpdateVolume(), this.notify(AudioPlayer.EVENT_VOLUME, t)
    }, AudioPlayer.prototype.getVolume = function() {
        return void 0 === this._userVolume ? .8 : this._userVolume
    }, AudioPlayer.prototype.seek = function(t) {
        this._implSeekImmediate(t), this.notify(AudioPlayer.EVENT_SEEK)
    }, AudioPlayer.prototype.seekToTime = function(t, e) {
        var i = this.getCurrentAudio();
        if (!i) return 0;
        var n = t / i[r.AudioUtils.AUDIO_ITEM_INDEX_DURATION];
        if (n = Math.max(0, n), n = Math.min(n, 1), this.seek(n), r.AudioUtils.isPodcast(i)) {
            var o = "",
                a = r.AudioUtils.asObject(i);
            e && (o = r.AudioUtils.PodcastsLogs.ACTION_TIME_MARKER, this.podcastSetActionRef(a, r.AudioUtils.PodcastsLogs.ACTION_SEEK, e)), this._podcastUpdateState(a, n, 0, o)
        }
        return n
    }, AudioPlayer.prototype._ensureHasURL = function(t, e) {
        var i = [];
        this._currentUrlEnsure = this._currentUrlEnsure || {};
        var n = r.AudioUtils.asObject(t);
        if (n.url) return e && e(t);
        var o = this.getCurrentPlaylist(),
            a = o.indexOfAudio(t);
        if (a >= 0)
            for (var s = a; s < a + 5; s++) {
                var u = r.AudioUtils.asObject(o.getAudioAt(s));
                !u || u.url || this._currentUrlEnsure[u.fullId] || (i.push(u.fullId + "_" + u.actionHash + "_" + u.urlHash), this._currentUrlEnsure[u.fullId] = !0)
            }
        if (i.push(n.fullId), i.length) {
            var d = this;
            ajax.post("al_audio.php", {
                act: "reload_audio",
                ids: i.join(",")
            }, {
                onDone: function(i, o, a, s) {
                    getAudioPlayer().setStatusExportInfo(o), d._listenedHash = a, s && getAudioPlayer()._podcastSaveData(s), each(i, function(e, i) {
                        i = r.AudioUtils.asObject(i);
                        var o = {};
                        o[r.AudioUtils.AUDIO_ITEM_INDEX_URL] = i.url, o[r.AudioUtils.AUDIO_ITEM_INDEX_ADS] = i.ads, n.fullId == i.fullId && (o[r.AudioUtils.AUDIO_ITEM_INDEX_FLAGS] = i.flags, o[r.AudioUtils.AUDIO_ITEM_INDEX_EXTRA] = i.extra), d.updateAudio(i.fullId, o), n.fullId == i.fullId && (t[r.AudioUtils.AUDIO_ITEM_INDEX_URL] = i.url, t[r.AudioUtils.AUDIO_ITEM_INDEX_ADS] = i.ads, t[r.AudioUtils.AUDIO_ITEM_INDEX_FLAGS] = i.flags, t[r.AudioUtils.AUDIO_ITEM_INDEX_EXTRA] = i.extra), d._currentAudio && r.AudioUtils.asObject(d._currentAudio).fullId == i.fullId && (d._currentAudio[r.AudioUtils.AUDIO_ITEM_INDEX_URL] = i.url, d._currentAudio[r.AudioUtils.AUDIO_ITEM_INDEX_ADS] = i.ads, d._currentAudio[r.AudioUtils.AUDIO_ITEM_INDEX_FLAGS] = i.flags, d._currentAudio[r.AudioUtils.AUDIO_ITEM_INDEX_EXTRA] = i.extra), delete d._currentUrlEnsure[i.fullId]
                    }), e && e(t)
                }
            })
        }
    }, AudioPlayer.prototype.toggleAudio = function(t, e) {
        if (vk && vk.widget && !vk.id && window.Widgets) return Widgets.oauth(), !1;
        if (domClosest("_audio_row__tt", e.target)) return cancelEvent(e);
        var i = domClosest("_audio_row", t),
            n = r.AudioUtils.getAudioFromEl(i, !0);
        if (window.getSelection && window.getSelection().rangeCount) {
            var o = window.getSelection().getRangeAt(0);
            if (o) {
                var a = o.commonAncestorContainer;
                if (a && domClosest("_audio_row", a) === i && o.startOffset !== o.endOffset) return !1
            }
        }
        if (e && hasClass(e.target, "mem_link")) return nav.go(attr(e.target, "href"), e, {
            navigateToUploader: !0
        }), cancelEvent(e);
        if (hasClass(e.target, "_audio_row__title_inner")) {
            if (r.AudioUtils.isPodcast(n)) return showPodcast(i, n.fullId), cancelEvent(e);
            if (n.lyrics && !n.isInAttach) return r.AudioUtils.toggleAudioLyrics(i, n), cancelEvent(e)
        }
        if (hasClass(e.target.parentNode, "audio_row__performers")) {
            if (checkEvent(e) || vk.widget) return !0;
            var s = domData(e.target, "performer");
            return !s || (r.AudioUtils.audioSearchPerformer(e.target, s, e), cancelEvent(e))
        }
        var u = cur.cancelClick || e && (hasClass(e.target, "audio_lyrics") || domClosest("_audio_duration_wrap", e.target) || domClosest("_audio_inline_player", e.target) || domClosest("audio_performer", e.target)),
            d = hasClass(e.target, "slider") || domClosest("slider", e.target),
            c = cur._sliderMouseUpNowEl && cur._sliderMouseUpNowEl === geByClass1("audio_inline_player_progress", i);
        if (d && c && (u = !0), delete cur.cancelClick, delete cur._sliderMouseUpNowEl, u) return !0;
        if (r.AudioUtils.isClaimedAudio(n) || n.isReplaceable) {
            var f = r.AudioUtils.getAudioExtra(n).claim;
            if (f) return void(hasClass(i, "no_actions") || n.isInEditBox || showAudioClaimWarning(n, f, r.AudioUtils.replaceWithOriginal.bind(r.AudioUtils, i, n)))
        }
        if (this.podcastSetActionRef(n, n.isPlaying ? r.AudioUtils.PodcastsLogs.ACTION_PAUSE : r.AudioUtils.PodcastsLogs.ACTION_PLAY, "", i), n.isPlaying) this.pause();
        else {
            var l = r.AudioUtils.getContextPlaylist(i);
            this.play(n.fullId, l.playlist, n.context || l.context), cur.audioPage && cur.audioPage.onUserAction(n, l.playlist)
        }
        r.AudioUtils.onRowOver(i, !1, !0)
    }, AudioPlayer.prototype._onFailedUrl = function(t) {
        this.notify(AudioPlayer.EVENT_FAILED), this.isPlaying() && (this.pause(), this.playNext(!0, !0))
    }, AudioPlayer.prototype._startAdsPlay = function(t, e, i, n) {
        function o() {
            var i = this._getPlayingContextSection();
            switch (t = r.AudioUtils.asObject(t), this._adsIsAllowed(t, e)) {
                case AudioPlayer.ADS_ALLOW_ALLOWED:
                    this._adsFetchAd(t, i, !1, function() {
                        n && n()
                    }.bind(this));
                    break;
                case AudioPlayer.ADS_ALLOW_DISABLED:
                    n && n();
                    break;
                case AudioPlayer.ADS_ALLOW_REJECT:
                    this._adsFetchAd(t, i, !0), n && n()
            }
        }
        this._startAdsTO && Object(s.clearWorkerTimeout)(this._startAdsTO), i ? this._startAdsTO = Object(s.setWorkerTimeout)(o.bind(this), 200) : o.call(this)
    }, AudioPlayer.prototype.playNextPlaylist = function(t, e, i) {
        var r = this,
            n = this.getPlaylist(o.AudioPlaylist.TYPE_PLAYLIST, t, e, i);
        n.loadAll(function() {
            var t = r.getCurrentPlaylist();
            if (t) t.addAudio(n.getAudiosList());
            else {
                r._currentPlaylist = new o.AudioPlaylist(n);
                var e = n.getAudioAt(0);
                e && (r._currentAudio = e, r.notify(AudioPlayer.EVENT_UPDATE), r.notify(AudioPlayer.EVENT_PLAYLIST_CHANGED), r.updateCurrentPlaying())
            }
        }), boxQueue && boxQueue.hideAll(), layers && layers.fullhide && layers.fullhide()
    }, AudioPlayer.prototype.playPlaylist = function(t, e, i, r, n) {
        if (vk && vk.widget && !vk.id && window.Widgets) return Widgets.oauth(), !1;
        this.playNextInPlaylist(t, e, i, r, {
            shuffled: n,
            preDoPlay: function(t) {
                n && (t.isShuffled() && t.shuffle(0), t.shuffle(irand(1, 999999), !0))
            }
        })
    }, AudioPlayer.prototype.playBlock = function(t, e, i, r, n) {
        var o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "default";
        this.playNextInPlaylist(t, e, i, r, {
            type: n,
            trackType: o,
            shuffled: !1
        })
    }, AudioPlayer.prototype.playNextInPlaylist = function(t, e, i, r) {
        var n = this,
            a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
            s = this.getCurrentPlaylist(),
            u = this.getPlaylist(a.type || o.AudioPlaylist.TYPE_PLAYLIST, t, e, i);
        if (s && s.getId() === u.getId() && this.isPlaying() && !a.shuffled) this.pause();
        else {
            var d = function() {
                a.preDoPlay && a.preDoPlay(u);
                var t = u.getNextAudio(!1, !0);
                t && n.play(t, u, r)
            };
            u.load(0, d, null, a.trackType), u.getAudiosCount() && !a.shuffled ? d() : this._impl.preparePlay && !this.isAdPlaying() && this._impl.preparePlay()
        }
    }, AudioPlayer.prototype._initPlayingContext = function(t) {
        this._playingContext = t
    }, AudioPlayer.prototype.getListenedHash = function() {
        return this._listenedHash || ""
    }, AudioPlayer.prototype._getPlayingContext = function() {
        return this._playingContext || ""
    }, AudioPlayer.prototype._getPlayingContextSection = function() {
        return this._getPlayingContext().split(":")[0]
    }, AudioPlayer.prototype.play = function(t, e, i, n, a) {
        if (!cur.loggingOff)
            if (this._impl) {
                this._seq = n, this._autoNext = a, this._prevAudio = this._currentAudio, this._cleanUpPlaylists(), (isObject(t) || isArray(t)) && (t = r.AudioUtils.asObject(t)) && (t = t.fullId);
                var s = r.AudioUtils.asObject(this._currentAudio),
                    u = this.getCurrentPlaylist();
                !t && s && (t = s.fullId);
                var d = !1,
                    c = t && s && t == s.fullId;
                e ? u && (d = e == u.getSelf() || e == u) : (e = u, d = !0), d || i || debugLog("New playlist play init without context"), i && (this._prevContext = this._playingContext, this._initPlayingContext(i));
                var f = e.getAudio(t);
                f && e.load(e.indexOfAudio(f) + 3), c || (this._trackListenedDataSwitch(s, i, e), this._sendListenedData(), e.getType() == o.AudioPlaylist.TYPE_SEARCH && e.indexOfAudio(f) >= e.getLocalFoundCount() && e.sendSearchStats("search_play"), s && r.AudioUtils.isPodcast(s) && this.isPlaying() && this._podcastUpdateState(s, this.getCurrentProgress(), this._impl.getPlayedTime(), r.AudioUtils.PodcastsLogs.ACTION_PAUSE, {
                    needResetListen: !0
                })), c || this._adsIsAdPlaying() || this._adsDeinit(), c && d ? this._adsIsAdPlaying() ? this._adsResumeAd() : this.isPlaying() || (this._isPlaying = !0, this._sendLCNotification(), this.notify(AudioPlayer.EVENT_PLAY), c || this.notify(AudioPlayer.EVENT_PROGRESS, 0), this._implClearAllTasks(), this._implSetVolume(0), this._implSetUrl(f), this._implPlay(), this._updatePlaybackRate(), this._implSetVolume(this.getVolume(), !0), r.AudioUtils.isPodcast(f) && this._podcastUpdateState(r.AudioUtils.asObject(f), this.getCurrentProgress(), this._impl.getPlayedTime())) : t && f && (this._currentAudio = f, d || (this._currentPlaylist && (this._prevPlaylist = this._currentPlaylist, this._prevAudio = this._currentAudio), this._currentPlaylist = new o.AudioPlaylist(e), this.notify(AudioPlayer.EVENT_PLAYLIST_CHANGED)), this.notify(AudioPlayer.EVENT_CURRENT_CHANGED), this._isPlaying = !0, this.updateCurrentPlaying(!0), this._adsIsAdPlaying() ? (this.notify(AudioPlayer.EVENT_PLAY, !0), this._adsResumeAd()) : (this._sendLCNotification(), this.notify(AudioPlayer.EVENT_PLAY, !0, intval(n), a), this.notify(AudioPlayer.EVENT_PROGRESS, 0), this._muteProgressEvents = !0, this._implClearAllTasks(), this._impl.preparePlay && this._impl.preparePlay(), a ? this._startAdsPlay(f, e, !1, function() {
                    (f = this.getCurrentAudio()) && this.isPlaying() && (this.notify(AudioPlayer.EVENT_UPDATE), this._implSetUrl(f), this._implPlay(), this._updatePlaybackRate(), this._implSetVolume(this.getVolume()), this._triggerTNSPixel())
                }.bind(this)) : (this._implSetVolume(0, !0), this._implPause(), this._startAdsPlay(f, e, !0, function() {
                    (f = this.getCurrentAudio()) && this.isPlaying() && (this.notify(AudioPlayer.EVENT_UPDATE), this._implSetUrl(f), this._implPlay(), this._updatePlaybackRate(), this._implSetVolume(this.getVolume()), this._triggerTNSPixel())
                }.bind(this)))))
            } else r.AudioUtils.showNeedFlashBox()
    }, AudioPlayer.prototype.preloadDefaultPlaylist = function(t) {
        browser.safari && !this._lsGet(AudioPlayer.LS_TRACK) && this.getPlaylist(o.AudioPlaylist.TYPE_PLAYLIST, vk.id, o.AudioPlaylist.DEFAULT_PLAYLIST_ID, t).load()
    }, AudioPlayer.prototype.instantPlay = function(t, e, i) {
        var r = !browser.safari && e && e.shiftKey;
        this.playPlaylist(vk.id, o.AudioPlaylist.DEFAULT_PLAYLIST_ID, i, "header", r), statlogsValueEvent("client_header_play_button", r ? "shuffle" : "play"), setTimeout(function() {
            addClass(t, "loading")
        }, 400)
    }, AudioPlayer.prototype._prefetchAudio = function(t) {
        (t = r.AudioUtils.asObject(t)) && t.url && this._impl.prefetch && this._impl.prefetch(t.url)
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
    }, AudioPlayer.prototype.playNext = function(t, e) {
        this._playNext(1, t)
    }, AudioPlayer.prototype.playPrev = function() {
        this._playNext(-1)
    }, AudioPlayer.prototype._playNext = function(t, e) {
        var i = this;
        if (!this._adsIsAdPlaying()) {
            var n = 10,
                o = this.getCurrentAudio(),
                a = this.getCurrentPlaylist(),
                s = function(t, n) {
                    r.AudioUtils.isClaimedAudio(t) || i.play(t, a, !1, n, e)
                };
            if (o && a)
                if (t > 0) {
                    for (var u = a.getNextAudio(o); n && u && r.AudioUtils.isClaimedAudio(u);) u = a.getNextAudio(u), n--;
                    if (u) s(u, 1);
                    else if (a.isLive()) this._muteProgressEvents = !0, a.fetchNextLiveAudio(function(t) {
                        return s(t, 1)
                    });
                    else {
                        if (u = a.getAudioAt(0), r.AudioUtils.isClaimedAudio(u))
                            for (var d = a.getAudiosList(), c = a.getAudiosCount(), f = 0; f < c; f++) {
                                var l = d[f];
                                if (!r.AudioUtils.isClaimedAudio(l)) {
                                    u = l;
                                    break
                                }
                            }
                        s(u, 1)
                    }
                } else {
                    var h = a.indexOfAudio(this._currentAudio) - 1;
                    if (h < 0) this.seek(0);
                    else {
                        for (var p = a.getAudioAt(h); n && p && r.AudioUtils.isClaimedAudio(p);) p = a.getAudioAt(--h), n--;
                        p ? s(p, -1) : this.seek(0)
                    }
                }
        }
    }, AudioPlayer.prototype._adsPlayAd = function(t, e, i) {
        this._adman.onCompleted(function() {
            this._adsDeinit(!0), t ? this._adsSendAdEvent("statistics", e) : (this.notify(AudioPlayer.EVENT_PROGRESS, 0), this.notify(AudioPlayer.EVENT_AD_COMPLETED), delete this._adsPlaying, delete this._adsCurrentProgress, this._adsSendAdEvent("completed", e), setDocumentTitle(this._adsPrevTitle), i && i())
        }.bind(this)), this._adman.onStarted(function() {
            t || (this._isPlaying = !0, this.notify(AudioPlayer.EVENT_PROGRESS, 0), this.notify(AudioPlayer.EVENT_AD_STARTED), this._adsUpdateVolume(), this._adsSendAdEvent("started", e))
        }.bind(this));
        var r = [.25, .5, .75];
        if (this._adman.onTimeRemained(function(t) {
                this._adsCurrentProgress = t.percent / 100, this.notify(AudioPlayer.EVENT_PROGRESS, t.percent / 100, t.duration), each(r, function(t, i) {
                    if (this._adsCurrentProgress >= i) return r.shift(), this._adsSendAdEvent("progress_" + intval(100 * i), e), !1
                }.bind(this))
            }.bind(this)), this._adman.start(AudioPlayer.AD_TYPE), t) return i && i();
        this._adsPlaying = !0, this.notify(AudioPlayer.EVENT_PLAY), this.notify(AudioPlayer.EVENT_PROGRESS, 0), this._adsPrevTitle = document.title, setDocumentTitle(getLang("global_audio_ad"))
    }, AudioPlayer.prototype._adsUpdateVolume = function() {
        this._adman && this._adman.setVolume(.7 * this.getVolume())
    }, AudioPlayer.prototype._adsSendAdEvent = function(t, e) {
        this._adEvents = this._adEvents || [], this._adEvents.push(t + "/" + e), clearTimeout(this._adEventDelay), this._adEventDelay = setTimeout(function() {
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
    }, AudioPlayer.prototype._adsDeinit = function(t) {
        this._adman = null, !t && this.notify(AudioPlayer.EVENT_AD_DEINITED)
    }, AudioPlayer.ADS_ALLOW_DISABLED = 1, AudioPlayer.ADS_ALLOW_ALLOWED = 2, AudioPlayer.ADS_ALLOW_REJECT = 3, AudioPlayer.prototype._adsIsAllowed = function(t, e) {
        if (vk.widget) return AudioPlayer.ADS_ALLOW_DISABLED;
        if (r.AudioUtils.isPodcast(t)) return AudioPlayer.ADS_ALLOW_DISABLED;
        if (cur.adsPreview) return AudioPlayer.ADS_ALLOW_ALLOWED;
        if (window.browser && window.browser.safari) return AudioPlayer.ADS_ALLOW_DISABLED;
        var i = this._adsConfig || vk.audioAdsConfig;
        return i ? i.enabled ? inArray(this._getPlayingContextSection(), i.sections) ? i.day_limit_reached ? AudioPlayer.ADS_ALLOW_REJECT : AudioPlayer.ADS_ALLOW_ALLOWED : AudioPlayer.ADS_ALLOW_REJECT : AudioPlayer.ADS_ALLOW_DISABLED : AudioPlayer.ADS_ALLOW_REJECT
    }, AudioPlayer.prototype._adsFetchAd = function(t, e, i, r) {
        this._loadAdman(function() {
            if (!window.AdmanHTML) return this._adsSendAdEvent("no_adman", e), r && r();
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
                duration: t.duration,
                content_id: function(t, e) {
                    for (var i = (t >>> 0).toString(16), r = e.toString(16); r.length < 8;) r = "0" + r;
                    return i + r
                }(t.ownerId, t.id),
                vk_catid: n[e] || n.other
            };
            extend(o, t.ads || {}), nav.objLoc.preview && (o.preview = intval(nav.objLoc.preview)), cur.adsPreview && (o.preview = 1), this._adman.setDebug(!!o.preview), this._adman.onError(function() {
                r && r()
            }), this._adman.onReady(function() {
                if (this._adman) {
                    var t = this._adman.getBannersForSection(AudioPlayer.AD_TYPE);
                    t && t.length ? "statistics" == t[0].type ? (this._adsPlayAd(!0, e), r && r()) : (this._adsSendAdEvent("received", e), i ? (this._adsSendAdEvent("rejected", e), this._adsDeinit(), r && r()) : (this._adsSendAdEvent("ready", e), this.notify(AudioPlayer.EVENT_AD_READY), this._adsPlayAd(!1, e, r))) : (i || this._adsSendAdEvent("not_received", e), r && r())
                }
            }.bind(this)), this._adman.init({
                slot: 3514,
                wrapper: se("<div></div>"),
                params: o,
                browser: {
                    adBlock: !!window.abp,
                    mobile: !1
                }
            }), this._adsSendAdEvent("requested", e)
        }.bind(this))
    }, AudioPlayer.prototype._loadAdman = function(t) {
        if (this._admadLoaded) return t && t();
        loadScript("//ad.mail.ru/static/admanhtml/rbadman-html5.min.js", {
            onLoad: function() {
                this._admadLoaded = !0, t && t()
            }.bind(this),
            onError: function() {
                this._admadLoaded = !0, t && t()
            }.bind(this)
        })
    }, AudioPlayer.prototype._podcastUpdateState = function(t, e, i, r, n) {
        var o = this._podcastGetStates(),
            a = Math.round(t.duration * e);
        o[t.fullId] = {
            t: vkNow(),
            position: a
        }, this._podcastSetStates(o), r && this._podcastSendLogs(r, t, i, a, n)
    }, AudioPlayer.prototype._podcastSendLogs = function(t, e, i, n, o) {
        if (e && t && r.AudioUtils.isPodcast(e) && (!cur._podcastsActionId || !cur._podcastsActionId[t] || this._podcastsActionLastId[t] !== cur._podcastsActionId[t])) {
            var a = this._podcastsActionRef[e.fullId] || {},
                s = a[t] || {};
            r.AudioUtils.PodcastsLogs.log(t, extend({
                audio: e,
                position: n,
                listen: i
            }, s, o || {})), delete a[t], this._podcastsActionLastId[t] = cur._podcastsActionId ? cur._podcastsActionId[t] : null
        }
    }, AudioPlayer.prototype.podcastSetActionRef = function(t, e, i, n) {
        t = r.AudioUtils.asObject(t), e && r.AudioUtils.isPodcast(t) && (this._podcastsActionRef[t.fullId] = this._podcastsActionRef[t.fullId] || {}, this._podcastsActionRef[t.fullId][e] = {
            ref: i,
            refEl: n
        }, cur._podcastsActionId = cur._podcastsActionId || {}, cur._podcastsActionId[e] = irand(0, 1e6))
    }, AudioPlayer.prototype._podcastCleanStates = function() {
        var t = this._podcastGetStates(),
            e = !1;
        return each(t, function(i, r) {
            Date.now() - r.t > 2419200 && (delete t[i], e = !0)
        }), e && this._podcastSetStates(t), t
    }, AudioPlayer.prototype._podcastSaveData = function(t) {
        var e = this._podcastGetStates();
        each(t, function(t, i) {
            var r = i.state;
            if (r) {
                var n = +r[1];
                (!e[t] || !e[t][1] || n && n > e[t][1]) && (e[t] = {
                    position: +r[0],
                    t: Date.now()
                })
            }
        }), this._podcastSetStates(e)
    }, AudioPlayer.prototype._podcastRestoreState = function() {
        var t = r.AudioUtils.asObject(this.getCurrentAudio());
        if (!r.AudioUtils.isPodcast(t)) return 0;
        var e = 0;
        cur.podcastSeekToTime ? (e = this.seekToTime(cur.podcastSeekToTime, cur.podcastSeekToTimeRef), delete cur.podcastSeekToTime, delete cur.podcastSeekToTimeRef) : (e = ((this._podcastGetStates()[t.fullId] || {}).position || 0) / t.duration) && e < 1 && this._implSeek(e);
        return e && e < 1 ? (this.updateCurrentPlaying(), e) : 0
    }, AudioPlayer.prototype.getCurrentFaveStatus = function() {
        return !!r.AudioUtils.isPodcast(this._currentAudio) && r.AudioUtils.getAudioExtra(this._currentAudio).fave
    }, AudioPlayer.prototype._podcastGetStates = function() {
        return (this._lsGet(AudioPlayer.LS_PODCASTS) || {}).states || {}
    }, AudioPlayer.prototype._podcastSetStates = function(t) {
        var e = this._lsGet(AudioPlayer.LS_PODCASTS) || {};
        e.states = t, this._lsSet(AudioPlayer.LS_PODCASTS, e)
    }, AudioPlayer.prototype.podcastToggleFave = function(t, e) {
        if (e) {
            e = r.AudioUtils.asObject(e);
            var i = r.AudioUtils.getAudioExtra(e).faveHash;
            i && bookmarkPodcast(t, e.fullId, i)
        }
    }, AudioPlayer.prototype._updatePlaybackRate = function() {
        var t = this;
        this._implNewTask("playback_rate", function(e) {
            var i = !t._adsIsAdPlaying() && r.AudioUtils.isPodcast(t._currentAudio) ? t.podcastGetPlaybackRate() : 1;
            t._impl.setPlaybackRate(i), e()
        })
    }, AudioPlayer.prototype.podcastGetPlaybackRate = function() {
        return (this._lsGet(AudioPlayer.LS_PODCASTS) || {}).rate || 1
    }, AudioPlayer.prototype.podcastChangePlaybackRate = function(t) {
        var e = this._lsGet(AudioPlayer.LS_PODCASTS) || {},
            i = e.rate || 1;
        t ? i -= AudioPlayer.PLAYBACK_RATE_STEP : i += AudioPlayer.PLAYBACK_RATE_STEP, !t && i > AudioPlayer.PLAYBACK_RATE_MAX ? i = 1 : t && i < 1 && (i = AudioPlayer.PLAYBACK_RATE_MAX), e.rate = i, this._lsSet(AudioPlayer.LS_PODCASTS, e), this._updatePlaybackRate()
    }, AudioPlayer.prototype.playAudio = function(t) {
        var e = new o.AudioPlaylist(o.AudioPlaylist.TYPE_TEMP);
        e.mergeWith({
            list: [t]
        }), this.play(t, e)
    };
    try {
        stManager.done("audioplayer.js")
    } catch (t) {}
}, , , , function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "getContextPlaylist", function() {
        return n
    });
    var r = function() {
        return function(t, e) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return function(t, e) {
                var i = [],
                    r = !0,
                    n = !1,
                    o = void 0;
                try {
                    for (var a, s = t[Symbol.iterator](); !(r = (a = s.next()).done) && (i.push(a.value), !e || i.length !== e); r = !0);
                } catch (t) {
                    n = !0, o = t
                } finally {
                    try {
                        !r && s.return && s.return()
                    } finally {
                        if (n) throw o
                    }
                }
                return i
            }(t, e);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();

    function n(t, e) {
        var i = getAudioPlayer(),
            n = AudioUtils.getAudioFromEl(t, !0);

        function o(t) {
            return [].slice.call(t)
        }
        var a = null,
            s = [],
            u = domData(t, "new-post"),
            d = !1,
            c = null,
            f = AudioPlaylist.TYPE_TEMP,
            l = vk.id,
            h = void 0,
            p = {},
            _ = window.AudioPage && currentAudioPage(t);
        if ((window.traverseParent || function(t, e) {
                for (t = ge(t); t && !e(t) && (t = domPN(t)) != document;);
                return null
            })(t, function(t) {
                return d = domData(t, "audio-context")
            }), d = (d = n.context || d) || ("audio" == cur.module ? cur.submodule : cur.module), e) return {
            context: d
        };
        var y = AudioUtils.contextSplit(d),
            b = r(y, 2),
            g = b[0],
            v = b[1],
            m = gpeByClass("_audio_pl", t);
        if (m) {
            var A = (domData(m, "playlist-id") || "").split("_");
            c = i.getPlaylist.apply(i, A);
            var w = domData(m, "title") || "";
            w && c.mergeWith({
                title: clean(w)
            });
            var E = domData(m, "access-hash") || "";
            E && c.mergeWith({
                accessHash: E
            }), _ && _.getPageCurrentPlaylist() == c && _.getSortedList() ? c.initSortedList(_.getSortedList()) : n.isFromCurrentPlaylist || (c.removeSortedList(), c.shuffle(0)), "music_2018_top_audios" === d && (s = [geByClass1("audio_recoms_audios_block")])
        } else if (_ && _.getPageCurrentPlaylist()) c = _.getPageCurrentPlaylist();
        else if ("module" == g) {
            var P = v;
            c = i.getPlaylist(AudioPlaylist.TYPE_PLAYLIST, P || cur.oid || vk.id, AudioPlaylist.DEFAULT_PLAYLIST_ID), s = [a]
        } else if (0 === n.context.indexOf("admin"))(c = i.getPlaylist.apply(i, [AudioPlaylist.TYPE_PLAYLIST].concat(function(t) {
            if (Array.isArray(t)) {
                for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
                return i
            }
            return Array.from(t)
        }(n.album)))).getAudiosCount() || c.setForceReload(!0);
        else if (0 === n.context.indexOf("im")) a = (a = gpeByClass("_im_peer_history", t)) || gpeByClass("_fc_tab_log_msgs", t), h = "im" + (cur.peer || "");
        else if (0 === n.context.indexOf("board")) h = n.context, s = o(geByClass("_wall_audio_rows", a));
        else if (0 === n.context.indexOf("widget")) h = n.context;
        else if (0 === n.context.indexOf("wiki")) h = "wiki";
        else if (0 === n.context.indexOf("post")) {
            f = AudioPlaylist.TYPE_WALL, h = n.context;
            var S = n.context.replace("post", "").split("_");
            l = S[0], p = {
                postId: S[1]
            }
        } else if (0 === n.context.indexOf("choose")) h = n.context;
        else if ("feed" == u || 0 === n.context.indexOf("feed") || 0 === n.context.indexOf("feedsearch")) h = "feed", s = o(geByClass("wall_text", a));
        else if ("group_wall" == g || "user_wall" == g || 0 === n.context.indexOf("reply") || "wall" == u) {
            f = AudioPlaylist.TYPE_WALL, l = cur.oid;
            var I = (v || "").split("_")[1],
                T = cur.wallQuery || "",
                M = ge("wall_search"),
                C = inArray(cur.wallType, ["own", "full_own"]) ? "own" : "all";
            h = hashCode(C + "_" + T), "wall" == cur.module && val(M) && (T = val(M)), I && (p = {
                postId: I,
                wallQuery: T,
                wallType: C
            }), 0 === n.context.indexOf("reply") && (s = o([gpeByClass("_replies_list", t)]), h = "reply" + h), s = s.concat(o([a]))
        } else "article" == g && (c = cur.articlePlaylist);
        return a || (a = domPN(t)), (s = s.filter(function(t) {
            return !!t
        })) && 0 != s.length || (s = [a]), (c = (c = c || i.getPlaylist(f, l, h)).getAudiosCount() ? c : AudioUtils.initDomPlaylist(c, s)).mergeWith(p || {}), -1 == c.indexOfAudio(n) && (c = AudioUtils.initDomPlaylist(c, [domPN(t)])), {
            playlist: c,
            context: d
        }
    }
}, , , , , , , , , , , , , function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "vkLocal", function() {
        return u
    }), i.d(e, "lTimeout", function() {
        return d
    }), i.d(e, "rand", function() {
        return c
    }), i.d(e, "irand", function() {
        return f
    }), i.d(e, "isUndefined", function() {
        return l
    }), i.d(e, "isFunction", function() {
        return h
    }), i.d(e, "isArray", function() {
        return p
    }), i.d(e, "isString", function() {
        return _
    }), i.d(e, "isObject", function() {
        return y
    }), i.d(e, "isEmpty", function() {
        return b
    }), i.d(e, "vkNow", function() {
        return g
    }), i.d(e, "vkImage", function() {
        return v
    }), i.d(e, "trim", function() {
        return m
    }), i.d(e, "stripHTML", function() {
        return A
    }), i.d(e, "escapeRE", function() {
        return w
    }), i.d(e, "intval", function() {
        return E
    }), i.d(e, "floatval", function() {
        return P
    }), i.d(e, "positive", function() {
        return S
    }), i.d(e, "isNumeric", function() {
        return I
    }), i.d(e, "winToUtf", function() {
        return T
    }), i.d(e, "replaceEntities", function() {
        return M
    }), i.d(e, "clean", function() {
        return C
    }), i.d(e, "unclean", function() {
        return k
    }), i.d(e, "each", function() {
        return D
    }), i.d(e, "indexOf", function() {
        return O
    }), i.d(e, "inArray", function() {
        return U
    }), i.d(e, "clone", function() {
        return L
    }), i.d(e, "arrayKeyDiff", function() {
        return x
    }), i.d(e, "extend", function() {
        return R
    }), i.d(e, "addTemplates", function() {
        return N
    }), i.d(e, "getTemplate", function() {
        return B
    }), i.d(e, "serializeForm", function() {
        return j
    }), i.d(e, "extractUrls", function() {
        return F
    }), i.d(e, "isRetina", function() {
        return H
    }), i.d(e, "getCaretCharacterOffsetWithin", function() {
        return q
    }), i.d(e, "formatCount", function() {
        return Y
    }), i.d(e, "encodeHtml", function() {
        return W
    }), i.d(e, "decodeHtml", function() {
        return X
    }), i.d(e, "initUtilsCommon", function() {
        return K
    });
    var r = i(506),
        n = i(416),
        o = i(92),
        a = function() {
            return function(t, e) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return function(t, e) {
                    var i = [],
                        r = !0,
                        n = !1,
                        o = void 0;
                    try {
                        for (var a, s = t[Symbol.iterator](); !(r = (a = s.next()).done) && (i.push(a.value), !e || i.length !== e); r = !0);
                    } catch (t) {
                        n = !0, o = t
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (n) throw o
                        }
                    }
                    return i
                }(t, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        };

    function u(t) {
        var e = PageID;
        return function() {
            e === PageID && t.apply(this, arguments)
        }
    }

    function d(t, e) {
        return setTimeout(u(t), e)
    }
    var c = function(t, e) {
            return Math.random() * (e - t + 1) + t
        },
        f = function(t, e) {
            return Math.floor(c(t, e))
        },
        l = function(t) {
            return void 0 === t
        },
        h = function(t) {
            return t && "[object Function]" === Object.prototype.toString.call(t)
        },
        p = function(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        },
        _ = function(t) {
            return "string" == typeof t
        },
        y = function(t) {
            return "[object Object]" === Object.prototype.toString.call(t)
        };

    function b(t) {
        if ("[object Object]" !== Object.prototype.toString.call(t)) return !1;
        for (var e in t)
            if (t.hasOwnProperty(e)) return !1;
        return !0
    }
    var g = function() {
            return +new Date
        },
        v = function() {
            return window.Image ? new Image : Object(r.ce)("img")
        },
        m = function(t) {
            return (t || "").replace(/^\s+|\s+$/g, "")
        },
        A = function(t) {
            return t ? t.replace(/<(?:.|\s)*?>/g, "") : ""
        },
        w = function(t) {
            return t ? t.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
        };

    function E(t) {
        return !0 === t ? 1 : parseInt(t) || 0
    }

    function P(t) {
        return !0 === t ? 1 : parseFloat(t) || 0
    }

    function S(t) {
        return (t = E(t)) < 0 ? 0 : t
    }

    function I(t) {
        return !isNaN(t)
    }

    function T(t) {
        return t.replace(/&#(\d\d+);/g, function(t, e) {
            return (e = E(e)) >= 32 ? String.fromCharCode(e) : t
        }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
    }

    function M() {
        var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        return Object(r.se)("<textarea>" + t + "</textarea>").value
    }

    function C(t) {
        return t ? t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
    }

    function k(t) {
        return M(t.replace(/\t/g, "\n"))
    }

    function D(t, e) {
        if (y(t) || void 0 === t.length) {
            for (var i in t)
                if (Object.prototype.hasOwnProperty.call(t, i) && !1 === e.call(t[i], i, t[i])) break
        } else
            for (var r = 0, n = t.length; r < n; r++) {
                var o = t[r];
                if (!1 === e.call(o, r, o)) break
            }
        return t
    }

    function O(t, e, i) {
        for (var r = i || 0, n = (t || []).length; r < n; r++)
            if (t[r] == e) return r;
        return -1
    }

    function U(t, e) {
        return -1 !== O(e, t)
    }

    function L(t, e) {
        var i = y(t) || void 0 === t.length ? {} : [];
        for (var r in t)(!/webkit/i.test(_ua) || "layerX" != r && "layerY" != r && "webkitMovementX" != r && "webkitMovementY" != r) && (e && "object" === s(t[r]) && "prototype" !== r && null !== t[r] ? i[r] = L(t[r]) : i[r] = t[r]);
        return i
    }

    function x(t) {
        var e = {},
            i = arguments.length,
            r = arguments;
        for (var n in t)
            if (t.hasOwnProperty(n)) {
                for (var o = !1, a = 1; a < i; a++) r[a][n] && r[a][n] === t[n] && (o = !0);
                o || (e[n] = t[n])
            }
        return e
    }

    function R() {
        var t = arguments,
            e = t.length,
            i = t[0] || {},
            r = 1,
            n = !1;
        for ("boolean" == typeof i && (n = i, i = t[1] || {}, r = 2), "object" === (void 0 === i ? "undefined" : s(i)) || h(i) || (i = {}); r < e; r++) {
            var o = t[r];
            if (null != o)
                for (var a in o)
                    if (o.hasOwnProperty(a)) {
                        var u = i[a],
                            d = o[a];
                        i !== d && (n && d && "object" === (void 0 === d ? "undefined" : s(d)) && !d.nodeType ? i[a] = R(n, u || (null != d.length ? [] : {}), d) : void 0 !== d && (i[a] = d))
                    }
        }
        return i
    }

    function N(t) {
        window.templates = window.templates || {}, R(window.templates, t)
    }

    function B(t, e) {
        var i = (window.templates = window.templates || {})[t];
        return "function" == typeof i && (i = i()), i && e ? Object(r.rs)(i, e) : i || ""
    }

    function j(t) {
        if ("object" !== (void 0 === t ? "undefined" : s(t))) return !1;
        var e = {},
            i = function(e) {
                return Object(r.geByTag)(e, t)
            },
            n = function(i, n) {
                if (n.name)
                    if ("text" !== n.type && n.type)
                        if (n.getAttribute("bool")) {
                            var a = Object(r.val)(n);
                            if (!a || "0" === a) return;
                            e[n.name] = 1
                        } else e[n.name] = o.browser.msie && !n.value && t[n.name] ? t[n.name].value : n.value;
                else e[n.name] = Object(r.val)(n)
            };
        return D(i("input"), function(t, e) {
            if ("radio" !== e.type && "checkbox" !== e.type || e.checked) return n(0, e)
        }), D(i("select"), n), D(i("textarea"), n), e
    }

    function F(t, e) {
        for (var i = e ? /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i : /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i, r = void 0, n = []; t && (r = t.match(i));) {
            t = t.substr(r.index + r[0].length);
            var o = 0;
            r[4] || (o = 7), n.push({
                url: r[2 + o],
                query: r[5 + o] || "",
                domain: r[4 + o]
            })
        }
        return n
    }
    var H = function() {
        return window.devicePixelRatio >= 2
    };

    function q(t) {
        var e = 0,
            i = 0,
            r = t.ownerDocument || t.document,
            n = r.defaultView || r.parentWindow;
        if (n.getSelection().rangeCount > 0) {
            var o = n.getSelection().getRangeAt(0),
                a = o.cloneRange();
            a.selectNodeContents(t), a.setEnd(o.startContainer, o.startOffset), e = a.toString().length, a.setEnd(o.endContainer, o.endOffset), i = a.toString().length
        }
        return [e, i]
    }

    function Y(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            i = e.kLimit || 1e3;
        return t >= (e.mLimit || 1e6) && !e.noCheck ? Y(t = (t = E(t / 1e5)) > 1e3 ? E(t / 10) : t / 10, R(e, {
            noCheck: !0
        }), !0) + "M" : t >= i && !e.noCheck ? Y(t = (t = E(t / 100)) > 100 ? E(t / 10) : t / 10, R(e, {
            noCheck: !0
        }), !0) + "K" : Object(n.langNumeric)(t, "%s", !0).replace(/,/g, ".")
    }
    var V, z = a((V = null, [function(t) {
            return V || (V = Object(r.se)("<span> </span>")), V.innerText = t, V.innerHTML
        }, function(t) {
            return V || (V = Object(r.se)("<span> </span>")), V.innerHTML = t.replace(/<br\s*\/?>/gim, "\n"), V.innerText
        }]), 2),
        W = z[0],
        X = z[1];

    function K() {
        window.PageID = window.PageID || 1
    }
}, , , , function(t, e, i) {
    "use strict";
    var r = e;

    function n(t) {
        return 1 === t.length ? "0" + t : t
    }

    function o(t) {
        for (var e = "", i = 0; i < t.length; i++) e += n(t[i].toString(16));
        return e
    }
    r.toArray = function(t, e) {
        if (Array.isArray(t)) return t.slice();
        if (!t) return [];
        var i = [];
        if ("string" != typeof t) {
            for (var r = 0; r < t.length; r++) i[r] = 0 | t[r];
            return i
        }
        if ("hex" === e)
            for ((t = t.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (t = "0" + t), r = 0; r < t.length; r += 2) i.push(parseInt(t[r] + t[r + 1], 16));
        else
            for (r = 0; r < t.length; r++) {
                var n = t.charCodeAt(r),
                    o = n >> 8,
                    a = 255 & n;
                o ? i.push(o, a) : i.push(a)
            }
        return i
    }, r.zero2 = n, r.toHex = o, r.encode = function(t, e) {
        return "hex" === e ? o(t) : t
    }
}, function(t, e, i) {
    (function(e) {
        var r = /Proc-Type: 4,ENCRYPTED[\n\r]+DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)[\n\r]+([0-9A-z\n\r\+\/\=]+)[\n\r]+/m,
            n = /^-----BEGIN ((?:.* KEY)|CERTIFICATE)-----/m,
            o = /^-----BEGIN ((?:.* KEY)|CERTIFICATE)-----([0-9A-z\n\r\+\/\=]+)-----END \1-----$/m,
            a = i(674),
            s = i(428);
        t.exports = function(t, i) {
            var u, d = t.toString(),
                c = d.match(r);
            if (c) {
                var f = "aes" + c[1],
                    l = new e(c[2], "hex"),
                    h = new e(c[3].replace(/[\r\n]/g, ""), "base64"),
                    p = a(i, l.slice(0, 8), parseInt(c[1], 10)).key,
                    _ = [],
                    y = s.createDecipheriv(f, p, l);
                _.push(y.update(h)), _.push(y.final()), u = e.concat(_)
            } else {
                var b = d.match(o);
                u = new e(b[2].replace(/[\r\n]/g, ""), "base64")
            }
            return {
                tag: d.match(n)[1],
                data: u
            }
        }
    }).call(this, i(315).Buffer)
}, , , , function(t) {
    t.exports = {
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
}, function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "TopAudioPlayer", function() {
        return n
    });
    var r = i(462);
    var n = function() {
        function t(e, i) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this.ap = getAudioPlayer(), this._el = e, this._playIconBtn = ge("top_audio"), this._audioBtnGroup = ge("top_audio_btn_group"), this.init()
        }
        return t.init = function() {
            var e = ge("top_audio_player"),
                i = data(e, "object");
            i || (i = new t(e), data(e, "object", i))
        }, t.prototype.init = function() {
            var t = this;

            function e(e) {
                return hasClass(this, "top_audio_player_play") ? (t.ap.podcastSetActionRef(t.ap.getCurrentAudio(), t.ap.isPlaying() ? r.AudioUtils.PodcastsLogs.ACTION_PAUSE : r.AudioUtils.PodcastsLogs.ACTION_PLAY, "top_player"), t.ap.isPlaying() ? t.ap.pause() : t.ap.play(), !1) : hasClass(this, "top_audio_player_prev") ? (t.ap.playPrev(), !1) : hasClass(this, "top_audio_player_next") ? (t.ap.playNext(), !1) : void 0
            }
            this.ap.on(this, AudioPlayer.EVENT_UPDATE, this.onPlay.bind(this)), this.ap.on(this, AudioPlayer.EVENT_PLAY, this.onPlay.bind(this)), this.ap.on(this, AudioPlayer.EVENT_PAUSE, this.onPause.bind(this)), this.ap.top = this, each(["prev", "play", "next"], function(i, r) {
                addEvent(geByClass1("top_audio_player_" + r, t._el), "click", e)
            }), addEvent(this._el, "mousedown", function(t) {
                if (!hasClass(domPN(t.target), "top_audio_player_btn")) return 1 != t.which || hasClass(t.target, "top_audio_player_btn") || hasClass(t.target, "top_audio_player_act_icon") || r.AudioUtils.getLayer().toggle(), cancelEvent(t)
            }), addEvent(ge("top_audio"), "mousedown", function(t) {
                return !0 !== checkEvent(t) && (r.AudioUtils.getLayer().toggle(), cancelEvent(t))
            }), browser.safari || addEvent(document, "keydown keyup", function(t) {
                toggleClass(ge("top_audio_play"), "shuffle", t.shiftKey)
            }), this.onPlay(this.ap.getCurrentAudio())
        }, t.prototype.onPlay = function(e, i, n) {
            var o = this,
                a = "top_audio_player_enabled";
            if (e) {
                var s = function() {
                    var i = getAudioPlayer();
                    setTimeout(function() {
                        var t = r.AudioUtils.getLayer();
                        t && t.isShown() && t.updatePosition()
                    }, 1), toggleClass(o._el, "audio_player_podcast", r.AudioUtils.isPodcast(i.getCurrentAudio())), addClass(o._el, a), toggleClass(o._el, "top_audio_player_playing", i.isPlaying());
                    var s = geByClass1("_top_audio_player_play_blind_label");
                    s && (s.innerHTML = i.isPlaying() ? getLang("global_audio_pause") : getLang("global_audio_play")), e = r.AudioUtils.asObject(e), clearTimeout(o._currTitleReTO);
                    var u = geByClass1("top_audio_player_title_out", o._el);
                    re(u);
                    var d = geByClass1("top_audio_player_title", o._el);
                    if (0 != n) {
                        var c = n < 0 ? -10 : 10,
                            f = "opacity: 0; top: " + c + "px; left: " + d.offsetLeft + "px",
                            l = e.performer + " &ndash; " + e.title,
                            h = se('<div class="top_audio_player_title top_audio_player_title_next" style="' + f + '">' + l + "</div>");
                        h.setAttribute("onmouseover", "setTitle(this)"), n > 0 ? domInsertAfter(h, d) : domInsertBefore(h, d), addClass(d, "top_audio_player_title_out"), setStyle(d, {
                            top: -c,
                            opacity: 0
                        }), setTimeout(function() {
                            setStyle(h, {
                                top: 0,
                                opacity: 1
                            })
                        }, 10), clearTimeout(o._currTitleReTO), o._currTitleReTO = setTimeout(function() {
                            re(d), removeClass(h, "top_audio_player_title_next")
                        }, t.TITLE_CHANGE_ANIM_SPEED)
                    } else d && (d.innerHTML = e.performer + " &ndash; " + e.title, d.titleSet = 0, d.setAttribute("onmouseover", "setTitle(this)"))
                };
                n = intval(n), hasClass(this._playIconBtn, a) ? s() : (addClass(this._playIconBtn, a), setTimeout(function() {
                    hide(o._audioBtnGroup), s()
                }, 150))
            } else {
                removeClass(this._playIconBtn, a), removeClass(this._el, a), removeClass(this._el, "top_audio_player_playing"), removeClass(this._el, "audio_player_podcast"), show(this._audioBtnGroup);
                var u = geByClass1("top_audio_play__button", this._audioBtnGroup);
                u && removeClass(u, "loading");
                var d = r.AudioUtils.getLayer();
                d && d.isShown() && d.updatePosition()
            }
        }, t.prototype.onPause = function() {
            removeClass(this._el, "top_audio_player_playing");
            var t = geByClass1("_top_audio_player_play_blind_label");
            t && (t.innerHTML = getLang("global_audio_play"))
        }, t.prototype.onNext = function() {}, t
    }();
    n.TITLE_CHANGE_ANIM_SPEED = 190
}, , function(t, e, i) {
    var r = e;
    r.der = i(320), r.pem = i(780)
}, , function(t, e, i) {
    (function(t) {
        var r = i(342),
            n = i(106),
            o = i(668);
        var a = {
            binary: !0,
            hex: !0,
            base64: !0
        };
        e.DiffieHellmanGroup = e.createDiffieHellmanGroup = e.getDiffieHellman = function(e) {
            var i = new t(n[e].prime, "hex"),
                r = new t(n[e].gen, "hex");
            return new o(i, r)
        }, e.createDiffieHellman = e.DiffieHellman = function e(i, n, s, u) {
            return t.isBuffer(n) || void 0 === a[n] ? e(i, "binary", n, s) : (n = n || "binary", u = u || "binary", s = s || new t([2]), t.isBuffer(s) || (s = new t(s, u)), "number" == typeof i ? new o(r(i, s), s, !0) : (t.isBuffer(i) || (i = new t(i, n)), new o(i, s, !0)))
        }
    }).call(this, i(315).Buffer)
}, , function(t, e, i) {
    "use strict";

    function r(t, e, i) {
        var r = AudioUtils.asObject(t),
            n = void 0;
        n = cur.audioPage && cur.audioPage.getOwnerId() < 0 && cur.audioPage.canEditGroup() ? cur.audioPage.getOwnerId() : vk.id, AudioUtils.playlistsByAudioDataCache = AudioUtils.playlistsByAudioDataCache || {};
        var o = AudioUtils.playlistsByAudioDataCache,
            a = n + "_" + r.ownerId + "_" + r.id;
        o[a] ? AudioUtils._showPlaylistsChooser(i, e, o[a], n, r, t) : ajax.post("al_audio.php", {
            act: "playlists_by_audio",
            owner_id: n,
            audio_owner_id: r.ownerId,
            audio_id: r.id
        }, {
            onDone: function(s, u, d) {
                var c = o[a] = {
                    playlists: s,
                    morePlaylists: u,
                    newPlaylistHash: d
                };
                AudioUtils._showPlaylistsChooser(i, e, c, n, r, t)
            }
        })
    }
    i.r(e), i.d(e, "initRowPlaylistsChooser", function() {
        return r
    })
}, , , , , , function(t, e, i) {
    "use strict";
    var r = i(315).Buffer,
        n = i(581),
        o = i(556),
        a = new Array(16),
        s = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13],
        u = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11],
        d = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6],
        c = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11],
        f = [0, 1518500249, 1859775393, 2400959708, 2840853838],
        l = [1352829926, 1548603684, 1836072691, 2053994217, 0];

    function h() {
        o.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520
    }

    function p(t, e) {
        return t << e | t >>> 32 - e
    }

    function _(t, e, i, r, n, o, a, s) {
        return p(t + (e ^ i ^ r) + o + a | 0, s) + n | 0
    }

    function y(t, e, i, r, n, o, a, s) {
        return p(t + (e & i | ~e & r) + o + a | 0, s) + n | 0
    }

    function b(t, e, i, r, n, o, a, s) {
        return p(t + ((e | ~i) ^ r) + o + a | 0, s) + n | 0
    }

    function g(t, e, i, r, n, o, a, s) {
        return p(t + (e & r | i & ~r) + o + a | 0, s) + n | 0
    }

    function v(t, e, i, r, n, o, a, s) {
        return p(t + (e ^ (i | ~r)) + o + a | 0, s) + n | 0
    }
    n(h, o), h.prototype._update = function() {
        for (var t = a, e = 0; e < 16; ++e) t[e] = this._block.readInt32LE(4 * e);
        for (var i = 0 | this._a, r = 0 | this._b, n = 0 | this._c, o = 0 | this._d, h = 0 | this._e, m = 0 | this._a, A = 0 | this._b, w = 0 | this._c, E = 0 | this._d, P = 0 | this._e, S = 0; S < 80; S += 1) {
            var I, T;
            S < 16 ? (I = _(i, r, n, o, h, t[s[S]], f[0], d[S]), T = v(m, A, w, E, P, t[u[S]], l[0], c[S])) : S < 32 ? (I = y(i, r, n, o, h, t[s[S]], f[1], d[S]), T = g(m, A, w, E, P, t[u[S]], l[1], c[S])) : S < 48 ? (I = b(i, r, n, o, h, t[s[S]], f[2], d[S]), T = b(m, A, w, E, P, t[u[S]], l[2], c[S])) : S < 64 ? (I = g(i, r, n, o, h, t[s[S]], f[3], d[S]), T = y(m, A, w, E, P, t[u[S]], l[3], c[S])) : (I = v(i, r, n, o, h, t[s[S]], f[4], d[S]), T = _(m, A, w, E, P, t[u[S]], l[4], c[S])), i = h, h = o, o = p(n, 10), n = r, r = I, m = P, P = E, E = p(w, 10), w = A, A = T
        }
        var M = this._b + n + E | 0;
        this._b = this._c + o + P | 0, this._c = this._d + h + m | 0, this._d = this._e + i + A | 0, this._e = this._a + r + w | 0, this._a = M
    }, h.prototype._digest = function() {
        this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
        var t = r.alloc ? r.alloc(20) : new r(20);
        return t.writeInt32LE(this._a, 0), t.writeInt32LE(this._b, 4), t.writeInt32LE(this._c, 8), t.writeInt32LE(this._d, 12), t.writeInt32LE(this._e, 16), t
    }, t.exports = h
}, , , , , , function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "audioUnmaskSource", function() {
        return o
    });
    var r = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=",
        n = {
            v: function(t) {
                return t.split("").reverse().join("")
            },
            r: function(t, e) {
                t = t.split("");
                for (var i, n = r + r, o = t.length; o--;) ~(i = n.indexOf(t[o])) && (t[o] = n.substr(i - e, 1));
                return t.join("")
            },
            s: function(t, e) {
                var i = t.length;
                if (i) {
                    var r = function(t, e) {
                            var i = t.length,
                                r = [];
                            if (i) {
                                var n = i;
                                for (e = Math.abs(e); n--;) e = (i * (n + 1) ^ e + n) % i, r[n] = e
                            }
                            return r
                        }(t, e),
                        n = 0;
                    for (t = t.split(""); ++n < i;) t[n] = t.splice(r[i - 1 - n], 1, t[n])[0];
                    t = t.join("")
                }
                return t
            },
            i: function(t, e) {
                return n.s(t, e ^ vk.id)
            },
            x: function(t, e) {
                var i = [];
                return e = e.charCodeAt(0), each(t.split(""), function(t, r) {
                    i.push(String.fromCharCode(r.charCodeAt(0) ^ e))
                }), i.join("")
            }
        };

    function o(t) {
        if ((!window.wbopen || !~(window.open + "").indexOf("wbopen")) && ~t.indexOf("audio_api_unavailable")) {
            var e = t.split("?extra=")[1].split("#"),
                i = "" === e[1] ? "" : a(e[1]);
            if (e = a(e[0]), "string" != typeof i || !e) return t;
            for (var r, o, s = (i = i ? i.split(String.fromCharCode(9)) : []).length; s--;) {
                if (r = (o = i[s].split(String.fromCharCode(11))).splice(0, 1, e)[0], !n[r]) return t;
                e = n[r].apply(null, o)
            }
            if (e && "http" === e.substr(0, 4)) return e
        }
        return t
    }

    function a(t) {
        if (!t || t.length % 4 == 1) return !1;
        for (var e, i, n = 0, o = 0, a = ""; i = t.charAt(o++);) ~(i = r.indexOf(i)) && (e = n % 4 ? 64 * e + i : i, n++ % 4) && (a += String.fromCharCode(255 & e >> (-2 * n & 6)));
        return a
    }
}, function(t, e) {
    e.encrypt = function(t, e) {
        return t._cipher.encryptBlock(e)
    }, e.decrypt = function(t, e) {
        return t._cipher.decryptBlock(e)
    }
}, function(t, e, i) {
    "use strict";

    function r() {
        return AudioUtils._audioAddRestoreInfo = AudioUtils._audioAddRestoreInfo || {}, AudioUtils._audioAddRestoreInfo
    }
    i.r(e), i.d(e, "getAddRestoreInfo", function() {
        return r
    })
}, , , , , , , , , , , function(t, e, i) {
    "use strict";

    function r() {
        var t = window.audioLayer;
        return t || (window.audioLayer = t = new AudioLayer), t
    }
    i.r(e), i.d(e, "getLayer", function() {
        return r
    })
}, , , , , , , function(t, e) {
    t.exports = function(t, e) {
        for (var i = t.length, r = -1; ++r < i;) t[r] ^= e[r];
        return t
    }
}, , , , , , function(t, e, i) {
    (function(t) {
        var r = void 0 !== t && t || "undefined" != typeof self && self || window,
            n = Function.prototype.apply;

        function o(t, e) {
            this._id = t, this._clearFn = e
        }
        e.setTimeout = function() {
            return new o(n.call(setTimeout, r, arguments), clearTimeout)
        }, e.setInterval = function() {
            return new o(n.call(setInterval, r, arguments), clearInterval)
        }, e.clearTimeout = e.clearInterval = function(t) {
            t && t.close()
        }, o.prototype.unref = o.prototype.ref = function() {}, o.prototype.close = function() {
            this._clearFn.call(r, this._id)
        }, e.enroll = function(t, e) {
            clearTimeout(t._idleTimeoutId), t._idleTimeout = e
        }, e.unenroll = function(t) {
            clearTimeout(t._idleTimeoutId), t._idleTimeout = -1
        }, e._unrefActive = e.active = function(t) {
            clearTimeout(t._idleTimeoutId);
            var e = t._idleTimeout;
            e >= 0 && (t._idleTimeoutId = setTimeout(function() {
                t._onTimeout && t._onTimeout()
            }, e))
        }, i(411), e.setImmediate = "undefined" != typeof self && self.setImmediate || void 0 !== t && t.setImmediate || this && this.setImmediate, e.clearImmediate = "undefined" != typeof self && self.clearImmediate || void 0 !== t && t.clearImmediate || this && this.clearImmediate
    }).call(this, i(186))
}, , , , function(t, e, i) {
    "use strict";

    function r(t, e, i, r, n, o) {
        var a = i.playlists,
            s = i.newPlaylistHash,
            u = i.morePlaylists;
        AudioUtils.copiedToPlaylistAudios = AudioUtils.copiedToPlaylistAudios || {}, AudioUtils.copiedToPlaylistAudiosHashes = AudioUtils.copiedToPlaylistAudiosHashes || {};
        var d = e,
            c = se(rs(AudioUtils.AUDIO_ROW_ACTION_ROW_ITEM, ["pl_new", 0, getLang("audio_add_to_new_pl"), "audio_row__action_playlist"]));
        if (domInsertAfter(c, d), d = c, c.addEventListener("click", function() {
                AudioUtils.editPlaylist(r, !1, "edit", {
                    addAudio: o,
                    newPlaylistHash: s
                })
            }), each(a, function(t, e) {
                var i = !0,
                    r = e[0] + "_" + e[1] + "_" + n.fullId,
                    o = AudioUtils.copiedToPlaylistAudios[r],
                    a = "audio_row__action_playlist";
                (e[3] || o) && (i = !1, a += " audio_row__more_playlist_added");
                var s = se(rs(AudioUtils.AUDIO_ROW_ACTION_ROW_ITEM, ["pl_" + e[0] + "_" + e[1], 0, e[2], a]));
                domInsertAfter(s, d), d = s;
                var u = !1;
                s.addEventListener("click", function() {
                    if (!u) {
                        u = !0;
                        var t = n.ownerId,
                            o = n.id,
                            a = AudioUtils.copiedToPlaylistAudios[r];
                        a && (t = (a = a.split("_"))[0], o = a[1]), i && (AudioUtils.copiedToPlaylistAudiosHashes[r] = e[4]), ajax.post("al_audio.php", {
                            act: "add_audio_to_playlist",
                            hash: e[4],
                            playlist_id: e[1],
                            playlist_owner_id: e[0],
                            audio_owner_id: t,
                            audio_id: o,
                            do_add: intval(i)
                        }, {
                            onDone: function(t, n, o) {
                                AudioUtils.copiedToPlaylistAudios[r] = !!i && o, e[4] = i ? t : AudioUtils.copiedToPlaylistAudiosHashes[r], i = !i, u = !1
                            }
                        }), toggleClass(s, "audio_row__more_playlist_added", i)
                    }
                })
            }), u) {
            var f = se(rs(AudioUtils.AUDIO_ROW_ACTION_ROW_ITEM, ["pl_more", 0, getLang("audio_row_show_all_playlists"), "audio_row__action_playlist"]));
            f.addEventListener("click", function() {
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
            }), domInsertAfter(f, d), d = f
        }
        t.updatePosition()
    }
    i.r(e), i.d(e, "showPlaylistsChooser", function() {
        return r
    })
}, , , function(t, e) {
    var i;
    i = function() {
        return this
    }();
    try {
        i = i || Function("return this")() || (0, eval)("this")
    } catch (t) {
        "object" == typeof window && (i = window)
    }
    t.exports = i
}, , , function(t, e, i) {
    var r = i(307).Buffer,
        n = i(561).Transform,
        o = i(621).StringDecoder;

    function a(t) {
        n.call(this), this.hashMode = "string" == typeof t, this.hashMode ? this[t] = this._finalOrDigest : this.final = this._finalOrDigest, this._final && (this.__final = this._final, this._final = null), this._decoder = null, this._encoding = null
    }
    i(581)(a, n), a.prototype.update = function(t, e, i) {
        "string" == typeof t && (t = r.from(t, e));
        var n = this._update(t);
        return this.hashMode ? this : (i && (n = this._toString(n, i)), n)
    }, a.prototype.setAutoPadding = function() {}, a.prototype.getAuthTag = function() {
        throw new Error("trying to get auth tag in unsupported state")
    }, a.prototype.setAuthTag = function() {
        throw new Error("trying to set auth tag in unsupported state")
    }, a.prototype.setAAD = function() {
        throw new Error("trying to set aad in unsupported state")
    }, a.prototype._transform = function(t, e, i) {
        var r;
        try {
            this.hashMode ? this._update(t) : this.push(this._update(t))
        } catch (t) {
            r = t
        } finally {
            i(r)
        }
    }, a.prototype._flush = function(t) {
        var e;
        try {
            this.push(this.__final())
        } catch (t) {
            e = t
        }
        t(e)
    }, a.prototype._finalOrDigest = function(t) {
        var e = this.__final() || r.alloc(0);
        return t && (e = this._toString(e, t, !0)), e
    }, a.prototype._toString = function(t, e, i) {
        if (this._decoder || (this._decoder = new o(e), this._encoding = e), this._encoding !== e) throw new Error("can't switch encodings");
        var r = this._decoder.write(t);
        return i && (r += this._decoder.end()), r
    }, t.exports = a
}, function(t, e, i) {
    "use strict";

    function r(t, e) {
        return window.onAudioPageLoaded = function() {
            return this.uploadAudio({})
        }, nav.go("audios" + t), cancelEvent(e)
    }
    i.r(e), i.d(e, "addAudioToOwner", function() {
        return r
    })
}, function(t, e, i) {
    t.exports = i(389).PassThrough
}, function(t, e, i) {
    (function(t) {
        function i(t) {
            return Object.prototype.toString.call(t)
        }
        e.isArray = function(t) {
            return Array.isArray ? Array.isArray(t) : "[object Array]" === i(t)
        }, e.isBoolean = function(t) {
            return "boolean" == typeof t
        }, e.isNull = function(t) {
            return null === t
        }, e.isNullOrUndefined = function(t) {
            return null == t
        }, e.isNumber = function(t) {
            return "number" == typeof t
        }, e.isString = function(t) {
            return "string" == typeof t
        }, e.isSymbol = function(t) {
            return "symbol" == typeof t
        }, e.isUndefined = function(t) {
            return void 0 === t
        }, e.isRegExp = function(t) {
            return "[object RegExp]" === i(t)
        }, e.isObject = function(t) {
            return "object" == typeof t && null !== t
        }, e.isDate = function(t) {
            return "[object Date]" === i(t)
        }, e.isError = function(t) {
            return "[object Error]" === i(t) || t instanceof Error
        }, e.isFunction = function(t) {
            return "function" == typeof t
        }, e.isPrimitive = function(t) {
            return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || void 0 === t
        }, e.isBuffer = t.isBuffer
    }).call(this, i(315).Buffer)
}, function(module, exports, __webpack_require__) {
    var indexOf = __webpack_require__(746),
        Object_keys = function(t) {
            if (Object.keys) return Object.keys(t);
            var e = [];
            for (var i in t) e.push(i);
            return e
        },
        forEach = function(t, e) {
            if (t.forEach) return t.forEach(e);
            for (var i = 0; i < t.length; i++) e(t[i], i, t)
        },
        defineProp = function() {
            try {
                return Object.defineProperty({}, "_", {}),
                    function(t, e, i) {
                        Object.defineProperty(t, e, {
                            writable: !0,
                            enumerable: !1,
                            configurable: !0,
                            value: i
                        })
                    }
            } catch (t) {
                return function(t, e, i) {
                    t[e] = i
                }
            }
        }(),
        globals = ["Array", "Boolean", "Date", "Error", "EvalError", "Function", "Infinity", "JSON", "Math", "NaN", "Number", "Object", "RangeError", "ReferenceError", "RegExp", "String", "SyntaxError", "TypeError", "URIError", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "undefined", "unescape"];

    function Context() {}
    Context.prototype = {};
    var Script = exports.Script = function(t) {
        if (!(this instanceof Script)) return new Script(t);
        this.code = t
    };
    Script.prototype.runInContext = function(t) {
        if (!(t instanceof Context)) throw new TypeError("needs a 'context' argument.");
        var e = document.createElement("iframe");
        e.style || (e.style = {}), e.style.display = "none", document.body.appendChild(e);
        var i = e.contentWindow,
            r = i.eval,
            n = i.execScript;
        !r && n && (n.call(i, "null"), r = i.eval), forEach(Object_keys(t), function(e) {
            i[e] = t[e]
        }), forEach(globals, function(e) {
            t[e] && (i[e] = t[e])
        });
        var o = Object_keys(i),
            a = r.call(i, this.code);
        return forEach(Object_keys(i), function(e) {
            (e in t || -1 === indexOf(o, e)) && (t[e] = i[e])
        }), forEach(globals, function(e) {
            e in t || defineProp(t, e, i[e])
        }), document.body.removeChild(e), a
    }, Script.prototype.runInThisContext = function() {
        return eval(this.code)
    }, Script.prototype.runInNewContext = function(t) {
        var e = Script.createContext(t),
            i = this.runInContext(e);
        return forEach(Object_keys(e), function(i) {
            t[i] = e[i]
        }), i
    }, forEach(Object_keys(Script.prototype), function(t) {
        exports[t] = Script[t] = function(e) {
            var i = Script(e);
            return i[t].apply(i, [].slice.call(arguments, 1))
        }
    }), exports.createScript = function(t) {
        return exports.Script(t)
    }, exports.createContext = Script.createContext = function(t) {
        var e = new Context;
        return "object" == typeof t && forEach(Object_keys(t), function(i) {
            e[i] = t[i]
        }), e
    }
}, , , function(t, e) {
    e["des-ecb"] = {
        key: 8,
        iv: 0
    }, e["des-cbc"] = e.des = {
        key: 8,
        iv: 8
    }, e["des-ede3-cbc"] = e.des3 = {
        key: 24,
        iv: 8
    }, e["des-ede3"] = {
        key: 24,
        iv: 0
    }, e["des-ede-cbc"] = {
        key: 16,
        iv: 8
    }, e["des-ede"] = {
        key: 16,
        iv: 0
    }
}, function(t, e, i) {
    "use strict";

    function r(t, e) {
        var i = geByClass1("_audio_row__lyrics", t);
        if (i) {
            if (toggle(i)) {
                var r = getSize(t)[1],
                    n = getSize(i)[1];
                setStyle(t, "height", r + n), data(t, "prevHeight", r)
            } else {
                var o = data(t, "prevHeight");
                setStyle(t, "height", o)
            }
        } else {
            addClass(t, "audio_loading");
            var a = {
                act: "get_lyrics",
                aid: e.fullId,
                lid: e.lyrics
            };
            AudioUtils.isPodcast(e) && (a.podcast = !0), ajax.post("al_audio.php", a, {
                onDone: function(r) {
                    removeClass(t, "audio_loading"), i = se('<div class="_audio_row__lyrics audio_row__lyrics" data-nodrag="1" style="display:none;"><div class="audio_row__lyrics_inner">' + r + "</div></div>"), geByClass1("_audio_row_content", t).appendChild(i), AudioUtils.toggleAudioLyrics(t, e)
                }
            })
        }
    }
    i.r(e), i.d(e, "toggleAudioLyrics", function() {
        return r
    })
}, function(t, e, i) {
    "use strict";
    var r = i(436),
        n = i(687);

    function o() {
        if (!(this instanceof o)) return new o;
        n.call(this), this.h = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428]
    }
    r.inherits(o, n), t.exports = o, o.blockSize = 1024, o.outSize = 384, o.hmacStrength = 192, o.padLength = 128, o.prototype._digest = function(t) {
        return "hex" === t ? r.toHex32(this.h.slice(0, 12), "big") : r.split32(this.h.slice(0, 12), "big")
    }
}, function(t, e) {
    t.exports = function(t) {
        for (var e, i = t.length; i--;) {
            if (255 !== (e = t.readUInt8(i))) {
                e++, t.writeUInt8(e, i);
                break
            }
            t.writeUInt8(0, i)
        }
    }
}, , , function(t, e, i) {
    (function(e) {
        var r = i(294),
            n = i(203),
            o = i(173),
            a = i(218),
            s = i(443),
            u = i(11),
            d = i(360);
        t.exports = function(t, i, c) {
            var f;
            f = t.padding ? t.padding : c ? 1 : 4;
            var l, h = r(t),
                p = h.modulus.byteLength();
            if (i.length > p || new a(i).cmp(h.modulus) >= 0) throw new Error("decryption error");
            l = c ? d(new a(i), h) : s(i, h);
            var _ = new e(p - l.length);
            if (_.fill(0), l = e.concat([_, l], p), 4 === f) return function(t, i) {
                t.modulus;
                var r = t.modulus.byteLength(),
                    a = (i.length, u("sha1").update(new e("")).digest()),
                    s = a.length;
                if (0 !== i[0]) throw new Error("decryption error");
                var d = i.slice(1, s + 1),
                    c = i.slice(s + 1),
                    f = o(d, n(c, s)),
                    l = o(c, n(f, r - s - 1));
                if (function(t, i) {
                        t = new e(t), i = new e(i);
                        var r = 0,
                            n = t.length;
                        t.length !== i.length && (r++, n = Math.min(t.length, i.length));
                        var o = -1;
                        for (; ++o < n;) r += t[o] ^ i[o];
                        return r
                    }(a, l.slice(0, s))) throw new Error("decryption error");
                var h = s;
                for (; 0 === l[h];) h++;
                if (1 !== l[h++]) throw new Error("decryption error");
                return l.slice(h)
            }(h, l);
            if (1 === f) return function(t, e, i) {
                var r = e.slice(0, 2),
                    n = 2,
                    o = 0;
                for (; 0 !== e[n++];)
                    if (n >= e.length) {
                        o++;
                        break
                    }
                var a = e.slice(2, n - 1);
                e.slice(n - 1, n);
                ("0002" !== r.toString("hex") && !i || "0001" !== r.toString("hex") && i) && o++;
                a.length < 8 && o++;
                if (o) throw new Error("decryption error");
                return e.slice(n)
            }(0, l, c);
            if (3 === f) return l;
            throw new Error("unknown padding")
        }
    }).call(this, i(315).Buffer)
}, function(t, e, i) {
    (function(e) {
        var r = i(11);

        function n(t) {
            var i = new e(4);
            return i.writeUInt32BE(t, 0), i
        }
        t.exports = function(t, i) {
            for (var o, a = new e(""), s = 0; a.length < i;) o = n(s++), a = e.concat([a, r("sha1").update(t).update(o).digest()]);
            return a.slice(0, i)
        }
    }).call(this, i(315).Buffer)
}, , , , , , , function(t, e) {
    var i, r, n = t.exports = {};

    function o() {
        throw new Error("setTimeout has not been defined")
    }

    function a() {
        throw new Error("clearTimeout has not been defined")
    }

    function s(t) {
        if (i === setTimeout) return setTimeout(t, 0);
        if ((i === o || !i) && setTimeout) return i = setTimeout, setTimeout(t, 0);
        try {
            return i(t, 0)
        } catch (e) {
            try {
                return i.call(null, t, 0)
            } catch (e) {
                return i.call(this, t, 0)
            }
        }
    }! function() {
        try {
            i = "function" == typeof setTimeout ? setTimeout : o
        } catch (t) {
            i = o
        }
        try {
            r = "function" == typeof clearTimeout ? clearTimeout : a
        } catch (t) {
            r = a
        }
    }();
    var u, d = [],
        c = !1,
        f = -1;

    function l() {
        c && u && (c = !1, u.length ? d = u.concat(d) : f = -1, d.length && h())
    }

    function h() {
        if (!c) {
            var t = s(l);
            c = !0;
            for (var e = d.length; e;) {
                for (u = d, d = []; ++f < e;) u && u[f].run();
                f = -1, e = d.length
            }
            u = null, c = !1,
                function(t) {
                    if (r === clearTimeout) return clearTimeout(t);
                    if ((r === a || !r) && clearTimeout) return r = clearTimeout, clearTimeout(t);
                    try {
                        r(t)
                    } catch (e) {
                        try {
                            return r.call(null, t)
                        } catch (e) {
                            return r.call(this, t)
                        }
                    }
                }(t)
        }
    }

    function p(t, e) {
        this.fun = t, this.array = e
    }

    function _() {}
    n.nextTick = function(t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
        d.push(new p(t, e)), 1 !== d.length || c || s(h)
    }, p.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, n.title = "browser", n.browser = !0, n.env = {}, n.argv = [], n.version = "", n.versions = {}, n.on = _, n.addListener = _, n.once = _, n.off = _, n.removeListener = _, n.removeAllListeners = _, n.emit = _, n.prependListener = _, n.prependOnceListener = _, n.listeners = function(t) {
        return []
    }, n.binding = function(t) {
        throw new Error("process.binding is not supported")
    }, n.cwd = function() {
        return "/"
    }, n.chdir = function(t) {
        throw new Error("process.chdir is not supported")
    }, n.umask = function() {
        return 0
    }
}, , , , function(t, e) {
    function i(t, e) {
        if (!t) throw new Error(e || "Assertion failed")
    }
    t.exports = i, i.equal = function(t, e, i) {
        if (t != e) throw new Error(i || "Assertion failed: " + t + " != " + e)
    }
}, function(t, e, i) {
    "use strict";

    function r(t, e, i, n, o) {
        if ("undefined" == typeof AutoList) return stManager.add("auto_list.js", function() {
            r(t, e, i, n, o)
        });
        var a = curBox(),
            s = geByClass1("_audio_atp_content", a.bodyNode),
            u = geByClass1("_audio_atp_list", a.bodyNode),
            d = ge("audio_atp_search"),
            c = geByClass1("_audio_atp_empty"),
            f = getSize(s)[1];
        setStyle(u, {
            height: f - getSize(d)[1]
        });
        var l = "",
            h = void 0;

        function p() {
            h && h.destroy(), u.innerHTML = "";
            var t = [];
            t = l ? n.filter(function(t) {
                return t[2].toLowerCase().indexOf(l) >= 0
            }) : n, toggle(u, 0 != t.length), toggle(c, 0 == t.length), h = new AutoList(u, {
                onNeedRows: function(e, i) {
                    for (var r = [], n = i, o = Math.min(t.length, i + 30), a = n; a < o; a++) {
                        var s = t[a];
                        if (s) {
                            var u = '<div class="ape_pl_item _ape_pl_item ' + (s[4] ? "ape_selected" : "") + '" data-id="' + s[1] + '"><div class="ape_check"><div class="ape_check_icon"></div></div><div class="ape_pl_item_inner"><span class="ape_pl_title">' + s[2] + '</span> <span class="ape_pl_size">' + s[3] + "</span></div></div>";
                            r.push(u)
                        }
                    }
                    e(r)
                }
            })
        }
        p(), cur.addToPlaylistSearch = debounce(function(t) {
            l = trim(t).toLowerCase(), p()
        }, 200);
        var _ = {},
            y = {};
        addEvent(u, "click", function(t) {
            var e = domClosest("_ape_pl_item", t.target),
                i = domData(e, "id");
            toggleClass(e, "ape_selected") ? (y[i] = !0, delete _[i]) : (_[i] = !0, delete y[i])
        }), a.removeButtons(), a.addButton(getLang("global_save"), function(r) {
            var n = Object.keys(y),
                s = Object.keys(_);
            ajax.post("al_audio.php", {
                act: "save_audio_in_playlists",
                add_pl_ids: n.join(","),
                remove_pl_ids: s.join(","),
                owner_id: t,
                audio_owner_id: e,
                audio_id: i,
                hash: o
            }, {
                showProgress: lockButton.pbind(r),
                hideProgress: unlockButton.pbind(r),
                onDone: function() {
                    a.hide()
                }
            })
        }, "ok", !0), a.addButton(getLang("global_cancel"), a.hide.bind(this), "no", !0)
    }
    i.r(e), i.d(e, "addToPlaylistsBoxInit", function() {
        return r
    })
}, function(t, e, i) {
    "use strict";
    var r = i(214),
        n = i(581),
        o = i(717),
        a = o.utils,
        s = o.Cipher;

    function u(t) {
        s.call(this, t);
        var e = new function() {
            this.tmp = new Array(2), this.keys = null
        };
        this._desState = e, this.deriveKeys(e, t.key)
    }
    n(u, s), t.exports = u, u.create = function(t) {
        return new u(t)
    };
    var d = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
    u.prototype.deriveKeys = function(t, e) {
        t.keys = new Array(32), r.equal(e.length, this.blockSize, "Invalid key length");
        var i = a.readUInt32BE(e, 0),
            n = a.readUInt32BE(e, 4);
        a.pc1(i, n, t.tmp, 0), i = t.tmp[0], n = t.tmp[1];
        for (var o = 0; o < t.keys.length; o += 2) {
            var s = d[o >>> 1];
            i = a.r28shl(i, s), n = a.r28shl(n, s), a.pc2(i, n, t.keys, o)
        }
    }, u.prototype._update = function(t, e, i, r) {
        var n = this._desState,
            o = a.readUInt32BE(t, e),
            s = a.readUInt32BE(t, e + 4);
        a.ip(o, s, n.tmp, 0), o = n.tmp[0], s = n.tmp[1], "encrypt" === this.type ? this._encrypt(n, o, s, n.tmp, 0) : this._decrypt(n, o, s, n.tmp, 0), o = n.tmp[0], s = n.tmp[1], a.writeUInt32BE(i, o, r), a.writeUInt32BE(i, s, r + 4)
    }, u.prototype._pad = function(t, e) {
        for (var i = t.length - e, r = e; r < t.length; r++) t[r] = i;
        return !0
    }, u.prototype._unpad = function(t) {
        for (var e = t[t.length - 1], i = t.length - e; i < t.length; i++) r.equal(t[i], e);
        return t.slice(0, t.length - e)
    }, u.prototype._encrypt = function(t, e, i, r, n) {
        for (var o = e, s = i, u = 0; u < t.keys.length; u += 2) {
            var d = t.keys[u],
                c = t.keys[u + 1];
            a.expand(s, t.tmp, 0), d ^= t.tmp[0], c ^= t.tmp[1];
            var f = a.substitute(d, c),
                l = s;
            s = (o ^ a.permute(f)) >>> 0, o = l
        }
        a.rip(s, o, r, n)
    }, u.prototype._decrypt = function(t, e, i, r, n) {
        for (var o = i, s = e, u = t.keys.length - 2; u >= 0; u -= 2) {
            var d = t.keys[u],
                c = t.keys[u + 1];
            a.expand(o, t.tmp, 0), d ^= t.tmp[0], c ^= t.tmp[1];
            var f = a.substitute(d, c),
                l = o;
            o = (s ^ a.permute(f)) >>> 0, s = l
        }
        a.rip(o, s, r, n)
    }
}, , function(t, e, i) {
    (function(t) {
        ! function(t, e) {
            "use strict";

            function r(t, e) {
                if (!t) throw new Error(e || "Assertion failed")
            }

            function n(t, e) {
                t.super_ = e;
                var i = function() {};
                i.prototype = e.prototype, t.prototype = new i, t.prototype.constructor = t
            }

            function o(t, e, i) {
                if (o.isBN(t)) return t;
                this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== t && ("le" !== e && "be" !== e || (i = e, e = 10), this._init(t || 0, e || 10, i || "be"))
            }
            var a;
            "object" == typeof t ? t.exports = o : e.BN = o, o.BN = o, o.wordSize = 26;
            try {
                a = i(343).Buffer
            } catch (t) {}

            function s(t, e, i) {
                for (var r = 0, n = Math.min(t.length, i), o = e; o < n; o++) {
                    var a = t.charCodeAt(o) - 48;
                    r <<= 4, r |= a >= 49 && a <= 54 ? a - 49 + 10 : a >= 17 && a <= 22 ? a - 17 + 10 : 15 & a
                }
                return r
            }

            function u(t, e, i, r) {
                for (var n = 0, o = Math.min(t.length, i), a = e; a < o; a++) {
                    var s = t.charCodeAt(a) - 48;
                    n *= r, n += s >= 49 ? s - 49 + 10 : s >= 17 ? s - 17 + 10 : s
                }
                return n
            }
            o.isBN = function(t) {
                return t instanceof o || null !== t && "object" == typeof t && t.constructor.wordSize === o.wordSize && Array.isArray(t.words)
            }, o.max = function(t, e) {
                return t.cmp(e) > 0 ? t : e
            }, o.min = function(t, e) {
                return t.cmp(e) < 0 ? t : e
            }, o.prototype._init = function(t, e, i) {
                if ("number" == typeof t) return this._initNumber(t, e, i);
                if ("object" == typeof t) return this._initArray(t, e, i);
                "hex" === e && (e = 16), r(e === (0 | e) && e >= 2 && e <= 36);
                var n = 0;
                "-" === (t = t.toString().replace(/\s+/g, ""))[0] && n++, 16 === e ? this._parseHex(t, n) : this._parseBase(t, e, n), "-" === t[0] && (this.negative = 1), this.strip(), "le" === i && this._initArray(this.toArray(), e, i)
            }, o.prototype._initNumber = function(t, e, i) {
                t < 0 && (this.negative = 1, t = -t), t < 67108864 ? (this.words = [67108863 & t], this.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t / 67108864 & 67108863], this.length = 2) : (r(t < 9007199254740992), this.words = [67108863 & t, t / 67108864 & 67108863, 1], this.length = 3), "le" === i && this._initArray(this.toArray(), e, i)
            }, o.prototype._initArray = function(t, e, i) {
                if (r("number" == typeof t.length), t.length <= 0) return this.words = [0], this.length = 1, this;
                this.length = Math.ceil(t.length / 3), this.words = new Array(this.length);
                for (var n = 0; n < this.length; n++) this.words[n] = 0;
                var o, a, s = 0;
                if ("be" === i)
                    for (n = t.length - 1, o = 0; n >= 0; n -= 3) a = t[n] | t[n - 1] << 8 | t[n - 2] << 16, this.words[o] |= a << s & 67108863, this.words[o + 1] = a >>> 26 - s & 67108863, (s += 24) >= 26 && (s -= 26, o++);
                else if ("le" === i)
                    for (n = 0, o = 0; n < t.length; n += 3) a = t[n] | t[n + 1] << 8 | t[n + 2] << 16, this.words[o] |= a << s & 67108863, this.words[o + 1] = a >>> 26 - s & 67108863, (s += 24) >= 26 && (s -= 26, o++);
                return this.strip()
            }, o.prototype._parseHex = function(t, e) {
                this.length = Math.ceil((t.length - e) / 6), this.words = new Array(this.length);
                for (var i = 0; i < this.length; i++) this.words[i] = 0;
                var r, n, o = 0;
                for (i = t.length - 6, r = 0; i >= e; i -= 6) n = s(t, i, i + 6), this.words[r] |= n << o & 67108863, this.words[r + 1] |= n >>> 26 - o & 4194303, (o += 24) >= 26 && (o -= 26, r++);
                i + 6 !== e && (n = s(t, e, i + 6), this.words[r] |= n << o & 67108863, this.words[r + 1] |= n >>> 26 - o & 4194303), this.strip()
            }, o.prototype._parseBase = function(t, e, i) {
                this.words = [0], this.length = 1;
                for (var r = 0, n = 1; n <= 67108863; n *= e) r++;
                r--, n = n / e | 0;
                for (var o = t.length - i, a = o % r, s = Math.min(o, o - a) + i, d = 0, c = i; c < s; c += r) d = u(t, c, c + r, e), this.imuln(n), this.words[0] + d < 67108864 ? this.words[0] += d : this._iaddn(d);
                if (0 !== a) {
                    var f = 1;
                    for (d = u(t, c, t.length, e), c = 0; c < a; c++) f *= e;
                    this.imuln(f), this.words[0] + d < 67108864 ? this.words[0] += d : this._iaddn(d)
                }
            }, o.prototype.copy = function(t) {
                t.words = new Array(this.length);
                for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
                t.length = this.length, t.negative = this.negative, t.red = this.red
            }, o.prototype.clone = function() {
                var t = new o(null);
                return this.copy(t), t
            }, o.prototype._expand = function(t) {
                for (; this.length < t;) this.words[this.length++] = 0;
                return this
            }, o.prototype.strip = function() {
                for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;
                return this._normSign()
            }, o.prototype._normSign = function() {
                return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this
            }, o.prototype.inspect = function() {
                return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
            };
            var d = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"],
                c = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                f = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];

            function l(t, e, i) {
                i.negative = e.negative ^ t.negative;
                var r = t.length + e.length | 0;
                i.length = r, r = r - 1 | 0;
                var n = 0 | t.words[0],
                    o = 0 | e.words[0],
                    a = n * o,
                    s = 67108863 & a,
                    u = a / 67108864 | 0;
                i.words[0] = s;
                for (var d = 1; d < r; d++) {
                    for (var c = u >>> 26, f = 67108863 & u, l = Math.min(d, e.length - 1), h = Math.max(0, d - t.length + 1); h <= l; h++) {
                        var p = d - h | 0;
                        c += (a = (n = 0 | t.words[p]) * (o = 0 | e.words[h]) + f) / 67108864 | 0, f = 67108863 & a
                    }
                    i.words[d] = 0 | f, u = 0 | c
                }
                return 0 !== u ? i.words[d] = 0 | u : i.length--, i.strip()
            }
            o.prototype.toString = function(t, e) {
                var i;
                if (t = t || 10, e = 0 | e || 1, 16 === t || "hex" === t) {
                    i = "";
                    for (var n = 0, o = 0, a = 0; a < this.length; a++) {
                        var s = this.words[a],
                            u = (16777215 & (s << n | o)).toString(16);
                        i = 0 !== (o = s >>> 24 - n & 16777215) || a !== this.length - 1 ? d[6 - u.length] + u + i : u + i, (n += 2) >= 26 && (n -= 26, a--)
                    }
                    for (0 !== o && (i = o.toString(16) + i); i.length % e != 0;) i = "0" + i;
                    return 0 !== this.negative && (i = "-" + i), i
                }
                if (t === (0 | t) && t >= 2 && t <= 36) {
                    var l = c[t],
                        h = f[t];
                    i = "";
                    var p = this.clone();
                    for (p.negative = 0; !p.isZero();) {
                        var _ = p.modn(h).toString(t);
                        i = (p = p.idivn(h)).isZero() ? _ + i : d[l - _.length] + _ + i
                    }
                    for (this.isZero() && (i = "0" + i); i.length % e != 0;) i = "0" + i;
                    return 0 !== this.negative && (i = "-" + i), i
                }
                r(!1, "Base should be between 2 and 36")
            }, o.prototype.toNumber = function() {
                var t = this.words[0];
                return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && r(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -t : t
            }, o.prototype.toJSON = function() {
                return this.toString(16)
            }, o.prototype.toBuffer = function(t, e) {
                return r(void 0 !== a), this.toArrayLike(a, t, e)
            }, o.prototype.toArray = function(t, e) {
                return this.toArrayLike(Array, t, e)
            }, o.prototype.toArrayLike = function(t, e, i) {
                var n = this.byteLength(),
                    o = i || Math.max(1, n);
                r(n <= o, "byte array longer than desired length"), r(o > 0, "Requested array length <= 0"), this.strip();
                var a, s, u = "le" === e,
                    d = new t(o),
                    c = this.clone();
                if (u) {
                    for (s = 0; !c.isZero(); s++) a = c.andln(255), c.iushrn(8), d[s] = a;
                    for (; s < o; s++) d[s] = 0
                } else {
                    for (s = 0; s < o - n; s++) d[s] = 0;
                    for (s = 0; !c.isZero(); s++) a = c.andln(255), c.iushrn(8), d[o - s - 1] = a
                }
                return d
            }, Math.clz32 ? o.prototype._countBits = function(t) {
                return 32 - Math.clz32(t)
            } : o.prototype._countBits = function(t) {
                var e = t,
                    i = 0;
                return e >= 4096 && (i += 13, e >>>= 13), e >= 64 && (i += 7, e >>>= 7), e >= 8 && (i += 4, e >>>= 4), e >= 2 && (i += 2, e >>>= 2), i + e
            }, o.prototype._zeroBits = function(t) {
                if (0 === t) return 26;
                var e = t,
                    i = 0;
                return 0 == (8191 & e) && (i += 13, e >>>= 13), 0 == (127 & e) && (i += 7, e >>>= 7), 0 == (15 & e) && (i += 4, e >>>= 4), 0 == (3 & e) && (i += 2, e >>>= 2), 0 == (1 & e) && i++, i
            }, o.prototype.bitLength = function() {
                var t = this.words[this.length - 1],
                    e = this._countBits(t);
                return 26 * (this.length - 1) + e
            }, o.prototype.zeroBits = function() {
                if (this.isZero()) return 0;
                for (var t = 0, e = 0; e < this.length; e++) {
                    var i = this._zeroBits(this.words[e]);
                    if (t += i, 26 !== i) break
                }
                return t
            }, o.prototype.byteLength = function() {
                return Math.ceil(this.bitLength() / 8)
            }, o.prototype.toTwos = function(t) {
                return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
            }, o.prototype.fromTwos = function(t) {
                return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
            }, o.prototype.isNeg = function() {
                return 0 !== this.negative
            }, o.prototype.neg = function() {
                return this.clone().ineg()
            }, o.prototype.ineg = function() {
                return this.isZero() || (this.negative ^= 1), this
            }, o.prototype.iuor = function(t) {
                for (; this.length < t.length;) this.words[this.length++] = 0;
                for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];
                return this.strip()
            }, o.prototype.ior = function(t) {
                return r(0 == (this.negative | t.negative)), this.iuor(t)
            }, o.prototype.or = function(t) {
                return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
            }, o.prototype.uor = function(t) {
                return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
            }, o.prototype.iuand = function(t) {
                var e;
                e = this.length > t.length ? t : this;
                for (var i = 0; i < e.length; i++) this.words[i] = this.words[i] & t.words[i];
                return this.length = e.length, this.strip()
            }, o.prototype.iand = function(t) {
                return r(0 == (this.negative | t.negative)), this.iuand(t)
            }, o.prototype.and = function(t) {
                return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
            }, o.prototype.uand = function(t) {
                return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
            }, o.prototype.iuxor = function(t) {
                var e, i;
                this.length > t.length ? (e = this, i = t) : (e = t, i = this);
                for (var r = 0; r < i.length; r++) this.words[r] = e.words[r] ^ i.words[r];
                if (this !== e)
                    for (; r < e.length; r++) this.words[r] = e.words[r];
                return this.length = e.length, this.strip()
            }, o.prototype.ixor = function(t) {
                return r(0 == (this.negative | t.negative)), this.iuxor(t)
            }, o.prototype.xor = function(t) {
                return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
            }, o.prototype.uxor = function(t) {
                return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
            }, o.prototype.inotn = function(t) {
                r("number" == typeof t && t >= 0);
                var e = 0 | Math.ceil(t / 26),
                    i = t % 26;
                this._expand(e), i > 0 && e--;
                for (var n = 0; n < e; n++) this.words[n] = 67108863 & ~this.words[n];
                return i > 0 && (this.words[n] = ~this.words[n] & 67108863 >> 26 - i), this.strip()
            }, o.prototype.notn = function(t) {
                return this.clone().inotn(t)
            }, o.prototype.setn = function(t, e) {
                r("number" == typeof t && t >= 0);
                var i = t / 26 | 0,
                    n = t % 26;
                return this._expand(i + 1), this.words[i] = e ? this.words[i] | 1 << n : this.words[i] & ~(1 << n), this.strip()
            }, o.prototype.iadd = function(t) {
                var e, i, r;
                if (0 !== this.negative && 0 === t.negative) return this.negative = 0, e = this.isub(t), this.negative ^= 1, this._normSign();
                if (0 === this.negative && 0 !== t.negative) return t.negative = 0, e = this.isub(t), t.negative = 1, e._normSign();
                this.length > t.length ? (i = this, r = t) : (i = t, r = this);
                for (var n = 0, o = 0; o < r.length; o++) e = (0 | i.words[o]) + (0 | r.words[o]) + n, this.words[o] = 67108863 & e, n = e >>> 26;
                for (; 0 !== n && o < i.length; o++) e = (0 | i.words[o]) + n, this.words[o] = 67108863 & e, n = e >>> 26;
                if (this.length = i.length, 0 !== n) this.words[this.length] = n, this.length++;
                else if (i !== this)
                    for (; o < i.length; o++) this.words[o] = i.words[o];
                return this
            }, o.prototype.add = function(t) {
                var e;
                return 0 !== t.negative && 0 === this.negative ? (t.negative = 0, e = this.sub(t), t.negative ^= 1, e) : 0 === t.negative && 0 !== this.negative ? (this.negative = 0, e = t.sub(this), this.negative = 1, e) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this)
            }, o.prototype.isub = function(t) {
                if (0 !== t.negative) {
                    t.negative = 0;
                    var e = this.iadd(t);
                    return t.negative = 1, e._normSign()
                }
                if (0 !== this.negative) return this.negative = 0, this.iadd(t), this.negative = 1, this._normSign();
                var i, r, n = this.cmp(t);
                if (0 === n) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
                n > 0 ? (i = this, r = t) : (i = t, r = this);
                for (var o = 0, a = 0; a < r.length; a++) o = (e = (0 | i.words[a]) - (0 | r.words[a]) + o) >> 26, this.words[a] = 67108863 & e;
                for (; 0 !== o && a < i.length; a++) o = (e = (0 | i.words[a]) + o) >> 26, this.words[a] = 67108863 & e;
                if (0 === o && a < i.length && i !== this)
                    for (; a < i.length; a++) this.words[a] = i.words[a];
                return this.length = Math.max(this.length, a), i !== this && (this.negative = 1), this.strip()
            }, o.prototype.sub = function(t) {
                return this.clone().isub(t)
            };
            var h = function(t, e, i) {
                var r, n, o, a = t.words,
                    s = e.words,
                    u = i.words,
                    d = 0,
                    c = 0 | a[0],
                    f = 8191 & c,
                    l = c >>> 13,
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
                    C = 8191 & M,
                    k = M >>> 13,
                    D = 0 | a[7],
                    O = 8191 & D,
                    U = D >>> 13,
                    L = 0 | a[8],
                    x = 8191 & L,
                    R = L >>> 13,
                    N = 0 | a[9],
                    B = 8191 & N,
                    j = N >>> 13,
                    F = 0 | s[0],
                    H = 8191 & F,
                    q = F >>> 13,
                    Y = 0 | s[1],
                    V = 8191 & Y,
                    z = Y >>> 13,
                    W = 0 | s[2],
                    X = 8191 & W,
                    K = W >>> 13,
                    G = 0 | s[3],
                    Z = 8191 & G,
                    Q = G >>> 13,
                    J = 0 | s[4],
                    $ = 8191 & J,
                    tt = J >>> 13,
                    et = 0 | s[5],
                    it = 8191 & et,
                    rt = et >>> 13,
                    nt = 0 | s[6],
                    ot = 8191 & nt,
                    at = nt >>> 13,
                    st = 0 | s[7],
                    ut = 8191 & st,
                    dt = st >>> 13,
                    ct = 0 | s[8],
                    ft = 8191 & ct,
                    lt = ct >>> 13,
                    ht = 0 | s[9],
                    pt = 8191 & ht,
                    _t = ht >>> 13;
                i.negative = t.negative ^ e.negative, i.length = 19;
                var yt = (d + (r = Math.imul(f, H)) | 0) + ((8191 & (n = (n = Math.imul(f, q)) + Math.imul(l, H) | 0)) << 13) | 0;
                d = ((o = Math.imul(l, q)) + (n >>> 13) | 0) + (yt >>> 26) | 0, yt &= 67108863, r = Math.imul(p, H), n = (n = Math.imul(p, q)) + Math.imul(_, H) | 0, o = Math.imul(_, q);
                var bt = (d + (r = r + Math.imul(f, V) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, z) | 0) + Math.imul(l, V) | 0)) << 13) | 0;
                d = ((o = o + Math.imul(l, z) | 0) + (n >>> 13) | 0) + (bt >>> 26) | 0, bt &= 67108863, r = Math.imul(b, H), n = (n = Math.imul(b, q)) + Math.imul(g, H) | 0, o = Math.imul(g, q), r = r + Math.imul(p, V) | 0, n = (n = n + Math.imul(p, z) | 0) + Math.imul(_, V) | 0, o = o + Math.imul(_, z) | 0;
                var gt = (d + (r = r + Math.imul(f, X) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, K) | 0) + Math.imul(l, X) | 0)) << 13) | 0;
                d = ((o = o + Math.imul(l, K) | 0) + (n >>> 13) | 0) + (gt >>> 26) | 0, gt &= 67108863, r = Math.imul(m, H), n = (n = Math.imul(m, q)) + Math.imul(A, H) | 0, o = Math.imul(A, q), r = r + Math.imul(b, V) | 0, n = (n = n + Math.imul(b, z) | 0) + Math.imul(g, V) | 0, o = o + Math.imul(g, z) | 0, r = r + Math.imul(p, X) | 0, n = (n = n + Math.imul(p, K) | 0) + Math.imul(_, X) | 0, o = o + Math.imul(_, K) | 0;
                var vt = (d + (r = r + Math.imul(f, Z) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, Q) | 0) + Math.imul(l, Z) | 0)) << 13) | 0;
                d = ((o = o + Math.imul(l, Q) | 0) + (n >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863, r = Math.imul(E, H), n = (n = Math.imul(E, q)) + Math.imul(P, H) | 0, o = Math.imul(P, q), r = r + Math.imul(m, V) | 0, n = (n = n + Math.imul(m, z) | 0) + Math.imul(A, V) | 0, o = o + Math.imul(A, z) | 0, r = r + Math.imul(b, X) | 0, n = (n = n + Math.imul(b, K) | 0) + Math.imul(g, X) | 0, o = o + Math.imul(g, K) | 0, r = r + Math.imul(p, Z) | 0, n = (n = n + Math.imul(p, Q) | 0) + Math.imul(_, Z) | 0, o = o + Math.imul(_, Q) | 0;
                var mt = (d + (r = r + Math.imul(f, $) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, tt) | 0) + Math.imul(l, $) | 0)) << 13) | 0;
                d = ((o = o + Math.imul(l, tt) | 0) + (n >>> 13) | 0) + (mt >>> 26) | 0, mt &= 67108863, r = Math.imul(I, H), n = (n = Math.imul(I, q)) + Math.imul(T, H) | 0, o = Math.imul(T, q), r = r + Math.imul(E, V) | 0, n = (n = n + Math.imul(E, z) | 0) + Math.imul(P, V) | 0, o = o + Math.imul(P, z) | 0, r = r + Math.imul(m, X) | 0, n = (n = n + Math.imul(m, K) | 0) + Math.imul(A, X) | 0, o = o + Math.imul(A, K) | 0, r = r + Math.imul(b, Z) | 0, n = (n = n + Math.imul(b, Q) | 0) + Math.imul(g, Z) | 0, o = o + Math.imul(g, Q) | 0, r = r + Math.imul(p, $) | 0, n = (n = n + Math.imul(p, tt) | 0) + Math.imul(_, $) | 0, o = o + Math.imul(_, tt) | 0;
                var At = (d + (r = r + Math.imul(f, it) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, rt) | 0) + Math.imul(l, it) | 0)) << 13) | 0;
                d = ((o = o + Math.imul(l, rt) | 0) + (n >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, r = Math.imul(C, H), n = (n = Math.imul(C, q)) + Math.imul(k, H) | 0, o = Math.imul(k, q), r = r + Math.imul(I, V) | 0, n = (n = n + Math.imul(I, z) | 0) + Math.imul(T, V) | 0, o = o + Math.imul(T, z) | 0, r = r + Math.imul(E, X) | 0, n = (n = n + Math.imul(E, K) | 0) + Math.imul(P, X) | 0, o = o + Math.imul(P, K) | 0, r = r + Math.imul(m, Z) | 0, n = (n = n + Math.imul(m, Q) | 0) + Math.imul(A, Z) | 0, o = o + Math.imul(A, Q) | 0, r = r + Math.imul(b, $) | 0, n = (n = n + Math.imul(b, tt) | 0) + Math.imul(g, $) | 0, o = o + Math.imul(g, tt) | 0, r = r + Math.imul(p, it) | 0, n = (n = n + Math.imul(p, rt) | 0) + Math.imul(_, it) | 0, o = o + Math.imul(_, rt) | 0;
                var wt = (d + (r = r + Math.imul(f, ot) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, at) | 0) + Math.imul(l, ot) | 0)) << 13) | 0;
                d = ((o = o + Math.imul(l, at) | 0) + (n >>> 13) | 0) + (wt >>> 26) | 0, wt &= 67108863, r = Math.imul(O, H), n = (n = Math.imul(O, q)) + Math.imul(U, H) | 0, o = Math.imul(U, q), r = r + Math.imul(C, V) | 0, n = (n = n + Math.imul(C, z) | 0) + Math.imul(k, V) | 0, o = o + Math.imul(k, z) | 0, r = r + Math.imul(I, X) | 0, n = (n = n + Math.imul(I, K) | 0) + Math.imul(T, X) | 0, o = o + Math.imul(T, K) | 0, r = r + Math.imul(E, Z) | 0, n = (n = n + Math.imul(E, Q) | 0) + Math.imul(P, Z) | 0, o = o + Math.imul(P, Q) | 0, r = r + Math.imul(m, $) | 0, n = (n = n + Math.imul(m, tt) | 0) + Math.imul(A, $) | 0, o = o + Math.imul(A, tt) | 0, r = r + Math.imul(b, it) | 0, n = (n = n + Math.imul(b, rt) | 0) + Math.imul(g, it) | 0, o = o + Math.imul(g, rt) | 0, r = r + Math.imul(p, ot) | 0, n = (n = n + Math.imul(p, at) | 0) + Math.imul(_, ot) | 0, o = o + Math.imul(_, at) | 0;
                var Et = (d + (r = r + Math.imul(f, ut) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, dt) | 0) + Math.imul(l, ut) | 0)) << 13) | 0;
                d = ((o = o + Math.imul(l, dt) | 0) + (n >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863, r = Math.imul(x, H), n = (n = Math.imul(x, q)) + Math.imul(R, H) | 0, o = Math.imul(R, q), r = r + Math.imul(O, V) | 0, n = (n = n + Math.imul(O, z) | 0) + Math.imul(U, V) | 0, o = o + Math.imul(U, z) | 0, r = r + Math.imul(C, X) | 0, n = (n = n + Math.imul(C, K) | 0) + Math.imul(k, X) | 0, o = o + Math.imul(k, K) | 0, r = r + Math.imul(I, Z) | 0, n = (n = n + Math.imul(I, Q) | 0) + Math.imul(T, Z) | 0, o = o + Math.imul(T, Q) | 0, r = r + Math.imul(E, $) | 0, n = (n = n + Math.imul(E, tt) | 0) + Math.imul(P, $) | 0, o = o + Math.imul(P, tt) | 0, r = r + Math.imul(m, it) | 0, n = (n = n + Math.imul(m, rt) | 0) + Math.imul(A, it) | 0, o = o + Math.imul(A, rt) | 0, r = r + Math.imul(b, ot) | 0, n = (n = n + Math.imul(b, at) | 0) + Math.imul(g, ot) | 0, o = o + Math.imul(g, at) | 0, r = r + Math.imul(p, ut) | 0, n = (n = n + Math.imul(p, dt) | 0) + Math.imul(_, ut) | 0, o = o + Math.imul(_, dt) | 0;
                var Pt = (d + (r = r + Math.imul(f, ft) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, lt) | 0) + Math.imul(l, ft) | 0)) << 13) | 0;
                d = ((o = o + Math.imul(l, lt) | 0) + (n >>> 13) | 0) + (Pt >>> 26) | 0, Pt &= 67108863, r = Math.imul(B, H), n = (n = Math.imul(B, q)) + Math.imul(j, H) | 0, o = Math.imul(j, q), r = r + Math.imul(x, V) | 0, n = (n = n + Math.imul(x, z) | 0) + Math.imul(R, V) | 0, o = o + Math.imul(R, z) | 0, r = r + Math.imul(O, X) | 0, n = (n = n + Math.imul(O, K) | 0) + Math.imul(U, X) | 0, o = o + Math.imul(U, K) | 0, r = r + Math.imul(C, Z) | 0, n = (n = n + Math.imul(C, Q) | 0) + Math.imul(k, Z) | 0, o = o + Math.imul(k, Q) | 0, r = r + Math.imul(I, $) | 0, n = (n = n + Math.imul(I, tt) | 0) + Math.imul(T, $) | 0, o = o + Math.imul(T, tt) | 0, r = r + Math.imul(E, it) | 0, n = (n = n + Math.imul(E, rt) | 0) + Math.imul(P, it) | 0, o = o + Math.imul(P, rt) | 0, r = r + Math.imul(m, ot) | 0, n = (n = n + Math.imul(m, at) | 0) + Math.imul(A, ot) | 0, o = o + Math.imul(A, at) | 0, r = r + Math.imul(b, ut) | 0, n = (n = n + Math.imul(b, dt) | 0) + Math.imul(g, ut) | 0, o = o + Math.imul(g, dt) | 0, r = r + Math.imul(p, ft) | 0, n = (n = n + Math.imul(p, lt) | 0) + Math.imul(_, ft) | 0, o = o + Math.imul(_, lt) | 0;
                var St = (d + (r = r + Math.imul(f, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(f, _t) | 0) + Math.imul(l, pt) | 0)) << 13) | 0;
                d = ((o = o + Math.imul(l, _t) | 0) + (n >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863, r = Math.imul(B, V), n = (n = Math.imul(B, z)) + Math.imul(j, V) | 0, o = Math.imul(j, z), r = r + Math.imul(x, X) | 0, n = (n = n + Math.imul(x, K) | 0) + Math.imul(R, X) | 0, o = o + Math.imul(R, K) | 0, r = r + Math.imul(O, Z) | 0, n = (n = n + Math.imul(O, Q) | 0) + Math.imul(U, Z) | 0, o = o + Math.imul(U, Q) | 0, r = r + Math.imul(C, $) | 0, n = (n = n + Math.imul(C, tt) | 0) + Math.imul(k, $) | 0, o = o + Math.imul(k, tt) | 0, r = r + Math.imul(I, it) | 0, n = (n = n + Math.imul(I, rt) | 0) + Math.imul(T, it) | 0, o = o + Math.imul(T, rt) | 0, r = r + Math.imul(E, ot) | 0, n = (n = n + Math.imul(E, at) | 0) + Math.imul(P, ot) | 0, o = o + Math.imul(P, at) | 0, r = r + Math.imul(m, ut) | 0, n = (n = n + Math.imul(m, dt) | 0) + Math.imul(A, ut) | 0, o = o + Math.imul(A, dt) | 0, r = r + Math.imul(b, ft) | 0, n = (n = n + Math.imul(b, lt) | 0) + Math.imul(g, ft) | 0, o = o + Math.imul(g, lt) | 0;
                var It = (d + (r = r + Math.imul(p, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(p, _t) | 0) + Math.imul(_, pt) | 0)) << 13) | 0;
                d = ((o = o + Math.imul(_, _t) | 0) + (n >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863, r = Math.imul(B, X), n = (n = Math.imul(B, K)) + Math.imul(j, X) | 0, o = Math.imul(j, K), r = r + Math.imul(x, Z) | 0, n = (n = n + Math.imul(x, Q) | 0) + Math.imul(R, Z) | 0, o = o + Math.imul(R, Q) | 0, r = r + Math.imul(O, $) | 0, n = (n = n + Math.imul(O, tt) | 0) + Math.imul(U, $) | 0, o = o + Math.imul(U, tt) | 0, r = r + Math.imul(C, it) | 0, n = (n = n + Math.imul(C, rt) | 0) + Math.imul(k, it) | 0, o = o + Math.imul(k, rt) | 0, r = r + Math.imul(I, ot) | 0, n = (n = n + Math.imul(I, at) | 0) + Math.imul(T, ot) | 0, o = o + Math.imul(T, at) | 0, r = r + Math.imul(E, ut) | 0, n = (n = n + Math.imul(E, dt) | 0) + Math.imul(P, ut) | 0, o = o + Math.imul(P, dt) | 0, r = r + Math.imul(m, ft) | 0, n = (n = n + Math.imul(m, lt) | 0) + Math.imul(A, ft) | 0, o = o + Math.imul(A, lt) | 0;
                var Tt = (d + (r = r + Math.imul(b, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(b, _t) | 0) + Math.imul(g, pt) | 0)) << 13) | 0;
                d = ((o = o + Math.imul(g, _t) | 0) + (n >>> 13) | 0) + (Tt >>> 26) | 0, Tt &= 67108863, r = Math.imul(B, Z), n = (n = Math.imul(B, Q)) + Math.imul(j, Z) | 0, o = Math.imul(j, Q), r = r + Math.imul(x, $) | 0, n = (n = n + Math.imul(x, tt) | 0) + Math.imul(R, $) | 0, o = o + Math.imul(R, tt) | 0, r = r + Math.imul(O, it) | 0, n = (n = n + Math.imul(O, rt) | 0) + Math.imul(U, it) | 0, o = o + Math.imul(U, rt) | 0, r = r + Math.imul(C, ot) | 0, n = (n = n + Math.imul(C, at) | 0) + Math.imul(k, ot) | 0, o = o + Math.imul(k, at) | 0, r = r + Math.imul(I, ut) | 0, n = (n = n + Math.imul(I, dt) | 0) + Math.imul(T, ut) | 0, o = o + Math.imul(T, dt) | 0, r = r + Math.imul(E, ft) | 0, n = (n = n + Math.imul(E, lt) | 0) + Math.imul(P, ft) | 0, o = o + Math.imul(P, lt) | 0;
                var Mt = (d + (r = r + Math.imul(m, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, _t) | 0) + Math.imul(A, pt) | 0)) << 13) | 0;
                d = ((o = o + Math.imul(A, _t) | 0) + (n >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863, r = Math.imul(B, $), n = (n = Math.imul(B, tt)) + Math.imul(j, $) | 0, o = Math.imul(j, tt), r = r + Math.imul(x, it) | 0, n = (n = n + Math.imul(x, rt) | 0) + Math.imul(R, it) | 0, o = o + Math.imul(R, rt) | 0, r = r + Math.imul(O, ot) | 0, n = (n = n + Math.imul(O, at) | 0) + Math.imul(U, ot) | 0, o = o + Math.imul(U, at) | 0, r = r + Math.imul(C, ut) | 0, n = (n = n + Math.imul(C, dt) | 0) + Math.imul(k, ut) | 0, o = o + Math.imul(k, dt) | 0, r = r + Math.imul(I, ft) | 0, n = (n = n + Math.imul(I, lt) | 0) + Math.imul(T, ft) | 0, o = o + Math.imul(T, lt) | 0;
                var Ct = (d + (r = r + Math.imul(E, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(E, _t) | 0) + Math.imul(P, pt) | 0)) << 13) | 0;
                d = ((o = o + Math.imul(P, _t) | 0) + (n >>> 13) | 0) + (Ct >>> 26) | 0, Ct &= 67108863, r = Math.imul(B, it), n = (n = Math.imul(B, rt)) + Math.imul(j, it) | 0, o = Math.imul(j, rt), r = r + Math.imul(x, ot) | 0, n = (n = n + Math.imul(x, at) | 0) + Math.imul(R, ot) | 0, o = o + Math.imul(R, at) | 0, r = r + Math.imul(O, ut) | 0, n = (n = n + Math.imul(O, dt) | 0) + Math.imul(U, ut) | 0, o = o + Math.imul(U, dt) | 0, r = r + Math.imul(C, ft) | 0, n = (n = n + Math.imul(C, lt) | 0) + Math.imul(k, ft) | 0, o = o + Math.imul(k, lt) | 0;
                var kt = (d + (r = r + Math.imul(I, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(I, _t) | 0) + Math.imul(T, pt) | 0)) << 13) | 0;
                d = ((o = o + Math.imul(T, _t) | 0) + (n >>> 13) | 0) + (kt >>> 26) | 0, kt &= 67108863, r = Math.imul(B, ot), n = (n = Math.imul(B, at)) + Math.imul(j, ot) | 0, o = Math.imul(j, at), r = r + Math.imul(x, ut) | 0, n = (n = n + Math.imul(x, dt) | 0) + Math.imul(R, ut) | 0, o = o + Math.imul(R, dt) | 0, r = r + Math.imul(O, ft) | 0, n = (n = n + Math.imul(O, lt) | 0) + Math.imul(U, ft) | 0, o = o + Math.imul(U, lt) | 0;
                var Dt = (d + (r = r + Math.imul(C, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(C, _t) | 0) + Math.imul(k, pt) | 0)) << 13) | 0;
                d = ((o = o + Math.imul(k, _t) | 0) + (n >>> 13) | 0) + (Dt >>> 26) | 0, Dt &= 67108863, r = Math.imul(B, ut), n = (n = Math.imul(B, dt)) + Math.imul(j, ut) | 0, o = Math.imul(j, dt), r = r + Math.imul(x, ft) | 0, n = (n = n + Math.imul(x, lt) | 0) + Math.imul(R, ft) | 0, o = o + Math.imul(R, lt) | 0;
                var Ot = (d + (r = r + Math.imul(O, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(O, _t) | 0) + Math.imul(U, pt) | 0)) << 13) | 0;
                d = ((o = o + Math.imul(U, _t) | 0) + (n >>> 13) | 0) + (Ot >>> 26) | 0, Ot &= 67108863, r = Math.imul(B, ft), n = (n = Math.imul(B, lt)) + Math.imul(j, ft) | 0, o = Math.imul(j, lt);
                var Ut = (d + (r = r + Math.imul(x, pt) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(x, _t) | 0) + Math.imul(R, pt) | 0)) << 13) | 0;
                d = ((o = o + Math.imul(R, _t) | 0) + (n >>> 13) | 0) + (Ut >>> 26) | 0, Ut &= 67108863;
                var Lt = (d + (r = Math.imul(B, pt)) | 0) + ((8191 & (n = (n = Math.imul(B, _t)) + Math.imul(j, pt) | 0)) << 13) | 0;
                return d = ((o = Math.imul(j, _t)) + (n >>> 13) | 0) + (Lt >>> 26) | 0, Lt &= 67108863, u[0] = yt, u[1] = bt, u[2] = gt, u[3] = vt, u[4] = mt, u[5] = At, u[6] = wt, u[7] = Et, u[8] = Pt, u[9] = St, u[10] = It, u[11] = Tt, u[12] = Mt, u[13] = Ct, u[14] = kt, u[15] = Dt, u[16] = Ot, u[17] = Ut, u[18] = Lt, 0 !== d && (u[19] = d, i.length++), i
            };

            function p(t, e, i) {
                return (new _).mulp(t, e, i)
            }

            function _(t, e) {
                this.x = t, this.y = e
            }
            Math.imul || (h = l), o.prototype.mulTo = function(t, e) {
                var i = this.length + t.length;
                return 10 === this.length && 10 === t.length ? h(this, t, e) : i < 63 ? l(this, t, e) : i < 1024 ? function(t, e, i) {
                    i.negative = e.negative ^ t.negative, i.length = t.length + e.length;
                    for (var r = 0, n = 0, o = 0; o < i.length - 1; o++) {
                        var a = n;
                        n = 0;
                        for (var s = 67108863 & r, u = Math.min(o, e.length - 1), d = Math.max(0, o - t.length + 1); d <= u; d++) {
                            var c = o - d,
                                f = (0 | t.words[c]) * (0 | e.words[d]),
                                l = 67108863 & f;
                            s = 67108863 & (l = l + s | 0), n += (a = (a = a + (f / 67108864 | 0) | 0) + (l >>> 26) | 0) >>> 26, a &= 67108863
                        }
                        i.words[o] = s, r = a, a = n
                    }
                    return 0 !== r ? i.words[o] = r : i.length--, i.strip()
                }(this, t, e) : p(this, t, e)
            }, _.prototype.makeRBT = function(t) {
                for (var e = new Array(t), i = o.prototype._countBits(t) - 1, r = 0; r < t; r++) e[r] = this.revBin(r, i, t);
                return e
            }, _.prototype.revBin = function(t, e, i) {
                if (0 === t || t === i - 1) return t;
                for (var r = 0, n = 0; n < e; n++) r |= (1 & t) << e - n - 1, t >>= 1;
                return r
            }, _.prototype.permute = function(t, e, i, r, n, o) {
                for (var a = 0; a < o; a++) r[a] = e[t[a]], n[a] = i[t[a]]
            }, _.prototype.transform = function(t, e, i, r, n, o) {
                this.permute(o, t, e, i, r, n);
                for (var a = 1; a < n; a <<= 1)
                    for (var s = a << 1, u = Math.cos(2 * Math.PI / s), d = Math.sin(2 * Math.PI / s), c = 0; c < n; c += s)
                        for (var f = u, l = d, h = 0; h < a; h++) {
                            var p = i[c + h],
                                _ = r[c + h],
                                y = i[c + h + a],
                                b = r[c + h + a],
                                g = f * y - l * b;
                            b = f * b + l * y, y = g, i[c + h] = p + y, r[c + h] = _ + b, i[c + h + a] = p - y, r[c + h + a] = _ - b, h !== s && (g = u * f - d * l, l = u * l + d * f, f = g)
                        }
            }, _.prototype.guessLen13b = function(t, e) {
                var i = 1 | Math.max(e, t),
                    r = 1 & i,
                    n = 0;
                for (i = i / 2 | 0; i; i >>>= 1) n++;
                return 1 << n + 1 + r
            }, _.prototype.conjugate = function(t, e, i) {
                if (!(i <= 1))
                    for (var r = 0; r < i / 2; r++) {
                        var n = t[r];
                        t[r] = t[i - r - 1], t[i - r - 1] = n, n = e[r], e[r] = -e[i - r - 1], e[i - r - 1] = -n
                    }
            }, _.prototype.normalize13b = function(t, e) {
                for (var i = 0, r = 0; r < e / 2; r++) {
                    var n = 8192 * Math.round(t[2 * r + 1] / e) + Math.round(t[2 * r] / e) + i;
                    t[r] = 67108863 & n, i = n < 67108864 ? 0 : n / 67108864 | 0
                }
                return t
            }, _.prototype.convert13b = function(t, e, i, n) {
                for (var o = 0, a = 0; a < e; a++) o += 0 | t[a], i[2 * a] = 8191 & o, o >>>= 13, i[2 * a + 1] = 8191 & o, o >>>= 13;
                for (a = 2 * e; a < n; ++a) i[a] = 0;
                r(0 === o), r(0 == (-8192 & o))
            }, _.prototype.stub = function(t) {
                for (var e = new Array(t), i = 0; i < t; i++) e[i] = 0;
                return e
            }, _.prototype.mulp = function(t, e, i) {
                var r = 2 * this.guessLen13b(t.length, e.length),
                    n = this.makeRBT(r),
                    o = this.stub(r),
                    a = new Array(r),
                    s = new Array(r),
                    u = new Array(r),
                    d = new Array(r),
                    c = new Array(r),
                    f = new Array(r),
                    l = i.words;
                l.length = r, this.convert13b(t.words, t.length, a, r), this.convert13b(e.words, e.length, d, r), this.transform(a, o, s, u, r, n), this.transform(d, o, c, f, r, n);
                for (var h = 0; h < r; h++) {
                    var p = s[h] * c[h] - u[h] * f[h];
                    u[h] = s[h] * f[h] + u[h] * c[h], s[h] = p
                }
                return this.conjugate(s, u, r), this.transform(s, u, l, o, r, n), this.conjugate(l, o, r), this.normalize13b(l, r), i.negative = t.negative ^ e.negative, i.length = t.length + e.length, i.strip()
            }, o.prototype.mul = function(t) {
                var e = new o(null);
                return e.words = new Array(this.length + t.length), this.mulTo(t, e)
            }, o.prototype.mulf = function(t) {
                var e = new o(null);
                return e.words = new Array(this.length + t.length), p(this, t, e)
            }, o.prototype.imul = function(t) {
                return this.clone().mulTo(t, this)
            }, o.prototype.imuln = function(t) {
                r("number" == typeof t), r(t < 67108864);
                for (var e = 0, i = 0; i < this.length; i++) {
                    var n = (0 | this.words[i]) * t,
                        o = (67108863 & n) + (67108863 & e);
                    e >>= 26, e += n / 67108864 | 0, e += o >>> 26, this.words[i] = 67108863 & o
                }
                return 0 !== e && (this.words[i] = e, this.length++), this
            }, o.prototype.muln = function(t) {
                return this.clone().imuln(t)
            }, o.prototype.sqr = function() {
                return this.mul(this)
            }, o.prototype.isqr = function() {
                return this.imul(this.clone())
            }, o.prototype.pow = function(t) {
                var e = function(t) {
                    for (var e = new Array(t.bitLength()), i = 0; i < e.length; i++) {
                        var r = i / 26 | 0,
                            n = i % 26;
                        e[i] = (t.words[r] & 1 << n) >>> n
                    }
                    return e
                }(t);
                if (0 === e.length) return new o(1);
                for (var i = this, r = 0; r < e.length && 0 === e[r]; r++, i = i.sqr());
                if (++r < e.length)
                    for (var n = i.sqr(); r < e.length; r++, n = n.sqr()) 0 !== e[r] && (i = i.mul(n));
                return i
            }, o.prototype.iushln = function(t) {
                r("number" == typeof t && t >= 0);
                var e, i = t % 26,
                    n = (t - i) / 26,
                    o = 67108863 >>> 26 - i << 26 - i;
                if (0 !== i) {
                    var a = 0;
                    for (e = 0; e < this.length; e++) {
                        var s = this.words[e] & o,
                            u = (0 | this.words[e]) - s << i;
                        this.words[e] = u | a, a = s >>> 26 - i
                    }
                    a && (this.words[e] = a, this.length++)
                }
                if (0 !== n) {
                    for (e = this.length - 1; e >= 0; e--) this.words[e + n] = this.words[e];
                    for (e = 0; e < n; e++) this.words[e] = 0;
                    this.length += n
                }
                return this.strip()
            }, o.prototype.ishln = function(t) {
                return r(0 === this.negative), this.iushln(t)
            }, o.prototype.iushrn = function(t, e, i) {
                var n;
                r("number" == typeof t && t >= 0), n = e ? (e - e % 26) / 26 : 0;
                var o = t % 26,
                    a = Math.min((t - o) / 26, this.length),
                    s = 67108863 ^ 67108863 >>> o << o,
                    u = i;
                if (n -= a, n = Math.max(0, n), u) {
                    for (var d = 0; d < a; d++) u.words[d] = this.words[d];
                    u.length = a
                }
                if (0 === a);
                else if (this.length > a)
                    for (this.length -= a, d = 0; d < this.length; d++) this.words[d] = this.words[d + a];
                else this.words[0] = 0, this.length = 1;
                var c = 0;
                for (d = this.length - 1; d >= 0 && (0 !== c || d >= n); d--) {
                    var f = 0 | this.words[d];
                    this.words[d] = c << 26 - o | f >>> o, c = f & s
                }
                return u && 0 !== c && (u.words[u.length++] = c), 0 === this.length && (this.words[0] = 0, this.length = 1), this.strip()
            }, o.prototype.ishrn = function(t, e, i) {
                return r(0 === this.negative), this.iushrn(t, e, i)
            }, o.prototype.shln = function(t) {
                return this.clone().ishln(t)
            }, o.prototype.ushln = function(t) {
                return this.clone().iushln(t)
            }, o.prototype.shrn = function(t) {
                return this.clone().ishrn(t)
            }, o.prototype.ushrn = function(t) {
                return this.clone().iushrn(t)
            }, o.prototype.testn = function(t) {
                r("number" == typeof t && t >= 0);
                var e = t % 26,
                    i = (t - e) / 26,
                    n = 1 << e;
                return !(this.length <= i) && !!(this.words[i] & n)
            }, o.prototype.imaskn = function(t) {
                r("number" == typeof t && t >= 0);
                var e = t % 26,
                    i = (t - e) / 26;
                if (r(0 === this.negative, "imaskn works only with positive numbers"), this.length <= i) return this;
                if (0 !== e && i++, this.length = Math.min(i, this.length), 0 !== e) {
                    var n = 67108863 ^ 67108863 >>> e << e;
                    this.words[this.length - 1] &= n
                }
                return this.strip()
            }, o.prototype.maskn = function(t) {
                return this.clone().imaskn(t)
            }, o.prototype.iaddn = function(t) {
                return r("number" == typeof t), r(t < 67108864), t < 0 ? this.isubn(-t) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) < t ? (this.words[0] = t - (0 | this.words[0]), this.negative = 0, this) : (this.negative = 0, this.isubn(t), this.negative = 1, this) : this._iaddn(t)
            }, o.prototype._iaddn = function(t) {
                this.words[0] += t;
                for (var e = 0; e < this.length && this.words[e] >= 67108864; e++) this.words[e] -= 67108864, e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
                return this.length = Math.max(this.length, e + 1), this
            }, o.prototype.isubn = function(t) {
                if (r("number" == typeof t), r(t < 67108864), t < 0) return this.iaddn(-t);
                if (0 !== this.negative) return this.negative = 0, this.iaddn(t), this.negative = 1, this;
                if (this.words[0] -= t, 1 === this.length && this.words[0] < 0) this.words[0] = -this.words[0], this.negative = 1;
                else
                    for (var e = 0; e < this.length && this.words[e] < 0; e++) this.words[e] += 67108864, this.words[e + 1] -= 1;
                return this.strip()
            }, o.prototype.addn = function(t) {
                return this.clone().iaddn(t)
            }, o.prototype.subn = function(t) {
                return this.clone().isubn(t)
            }, o.prototype.iabs = function() {
                return this.negative = 0, this
            }, o.prototype.abs = function() {
                return this.clone().iabs()
            }, o.prototype._ishlnsubmul = function(t, e, i) {
                var n, o, a = t.length + i;
                this._expand(a);
                var s = 0;
                for (n = 0; n < t.length; n++) {
                    o = (0 | this.words[n + i]) + s;
                    var u = (0 | t.words[n]) * e;
                    s = ((o -= 67108863 & u) >> 26) - (u / 67108864 | 0), this.words[n + i] = 67108863 & o
                }
                for (; n < this.length - i; n++) s = (o = (0 | this.words[n + i]) + s) >> 26, this.words[n + i] = 67108863 & o;
                if (0 === s) return this.strip();
                for (r(-1 === s), s = 0, n = 0; n < this.length; n++) s = (o = -(0 | this.words[n]) + s) >> 26, this.words[n] = 67108863 & o;
                return this.negative = 1, this.strip()
            }, o.prototype._wordDiv = function(t, e) {
                var i = (this.length, t.length),
                    r = this.clone(),
                    n = t,
                    a = 0 | n.words[n.length - 1];
                0 !== (i = 26 - this._countBits(a)) && (n = n.ushln(i), r.iushln(i), a = 0 | n.words[n.length - 1]);
                var s, u = r.length - n.length;
                if ("mod" !== e) {
                    (s = new o(null)).length = u + 1, s.words = new Array(s.length);
                    for (var d = 0; d < s.length; d++) s.words[d] = 0
                }
                var c = r.clone()._ishlnsubmul(n, 1, u);
                0 === c.negative && (r = c, s && (s.words[u] = 1));
                for (var f = u - 1; f >= 0; f--) {
                    var l = 67108864 * (0 | r.words[n.length + f]) + (0 | r.words[n.length + f - 1]);
                    for (l = Math.min(l / a | 0, 67108863), r._ishlnsubmul(n, l, f); 0 !== r.negative;) l--, r.negative = 0, r._ishlnsubmul(n, 1, f), r.isZero() || (r.negative ^= 1);
                    s && (s.words[f] = l)
                }
                return s && s.strip(), r.strip(), "div" !== e && 0 !== i && r.iushrn(i), {
                    div: s || null,
                    mod: r
                }
            }, o.prototype.divmod = function(t, e, i) {
                return r(!t.isZero()), this.isZero() ? {
                    div: new o(0),
                    mod: new o(0)
                } : 0 !== this.negative && 0 === t.negative ? (s = this.neg().divmod(t, e), "mod" !== e && (n = s.div.neg()), "div" !== e && (a = s.mod.neg(), i && 0 !== a.negative && a.iadd(t)), {
                    div: n,
                    mod: a
                }) : 0 === this.negative && 0 !== t.negative ? (s = this.divmod(t.neg(), e), "mod" !== e && (n = s.div.neg()), {
                    div: n,
                    mod: s.mod
                }) : 0 != (this.negative & t.negative) ? (s = this.neg().divmod(t.neg(), e), "div" !== e && (a = s.mod.neg(), i && 0 !== a.negative && a.isub(t)), {
                    div: s.div,
                    mod: a
                }) : t.length > this.length || this.cmp(t) < 0 ? {
                    div: new o(0),
                    mod: this
                } : 1 === t.length ? "div" === e ? {
                    div: this.divn(t.words[0]),
                    mod: null
                } : "mod" === e ? {
                    div: null,
                    mod: new o(this.modn(t.words[0]))
                } : {
                    div: this.divn(t.words[0]),
                    mod: new o(this.modn(t.words[0]))
                } : this._wordDiv(t, e);
                var n, a, s
            }, o.prototype.div = function(t) {
                return this.divmod(t, "div", !1).div
            }, o.prototype.mod = function(t) {
                return this.divmod(t, "mod", !1).mod
            }, o.prototype.umod = function(t) {
                return this.divmod(t, "mod", !0).mod
            }, o.prototype.divRound = function(t) {
                var e = this.divmod(t);
                if (e.mod.isZero()) return e.div;
                var i = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
                    r = t.ushrn(1),
                    n = t.andln(1),
                    o = i.cmp(r);
                return o < 0 || 1 === n && 0 === o ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e.div.iaddn(1)
            }, o.prototype.modn = function(t) {
                r(t <= 67108863);
                for (var e = (1 << 26) % t, i = 0, n = this.length - 1; n >= 0; n--) i = (e * i + (0 | this.words[n])) % t;
                return i
            }, o.prototype.idivn = function(t) {
                r(t <= 67108863);
                for (var e = 0, i = this.length - 1; i >= 0; i--) {
                    var n = (0 | this.words[i]) + 67108864 * e;
                    this.words[i] = n / t | 0, e = n % t
                }
                return this.strip()
            }, o.prototype.divn = function(t) {
                return this.clone().idivn(t)
            }, o.prototype.egcd = function(t) {
                r(0 === t.negative), r(!t.isZero());
                var e = this,
                    i = t.clone();
                e = 0 !== e.negative ? e.umod(t) : e.clone();
                for (var n = new o(1), a = new o(0), s = new o(0), u = new o(1), d = 0; e.isEven() && i.isEven();) e.iushrn(1), i.iushrn(1), ++d;
                for (var c = i.clone(), f = e.clone(); !e.isZero();) {
                    for (var l = 0, h = 1; 0 == (e.words[0] & h) && l < 26; ++l, h <<= 1);
                    if (l > 0)
                        for (e.iushrn(l); l-- > 0;)(n.isOdd() || a.isOdd()) && (n.iadd(c), a.isub(f)), n.iushrn(1), a.iushrn(1);
                    for (var p = 0, _ = 1; 0 == (i.words[0] & _) && p < 26; ++p, _ <<= 1);
                    if (p > 0)
                        for (i.iushrn(p); p-- > 0;)(s.isOdd() || u.isOdd()) && (s.iadd(c), u.isub(f)), s.iushrn(1), u.iushrn(1);
                    e.cmp(i) >= 0 ? (e.isub(i), n.isub(s), a.isub(u)) : (i.isub(e), s.isub(n), u.isub(a))
                }
                return {
                    a: s,
                    b: u,
                    gcd: i.iushln(d)
                }
            }, o.prototype._invmp = function(t) {
                r(0 === t.negative), r(!t.isZero());
                var e = this,
                    i = t.clone();
                e = 0 !== e.negative ? e.umod(t) : e.clone();
                for (var n, a = new o(1), s = new o(0), u = i.clone(); e.cmpn(1) > 0 && i.cmpn(1) > 0;) {
                    for (var d = 0, c = 1; 0 == (e.words[0] & c) && d < 26; ++d, c <<= 1);
                    if (d > 0)
                        for (e.iushrn(d); d-- > 0;) a.isOdd() && a.iadd(u), a.iushrn(1);
                    for (var f = 0, l = 1; 0 == (i.words[0] & l) && f < 26; ++f, l <<= 1);
                    if (f > 0)
                        for (i.iushrn(f); f-- > 0;) s.isOdd() && s.iadd(u), s.iushrn(1);
                    e.cmp(i) >= 0 ? (e.isub(i), a.isub(s)) : (i.isub(e), s.isub(a))
                }
                return (n = 0 === e.cmpn(1) ? a : s).cmpn(0) < 0 && n.iadd(t), n
            }, o.prototype.gcd = function(t) {
                if (this.isZero()) return t.abs();
                if (t.isZero()) return this.abs();
                var e = this.clone(),
                    i = t.clone();
                e.negative = 0, i.negative = 0;
                for (var r = 0; e.isEven() && i.isEven(); r++) e.iushrn(1), i.iushrn(1);
                for (;;) {
                    for (; e.isEven();) e.iushrn(1);
                    for (; i.isEven();) i.iushrn(1);
                    var n = e.cmp(i);
                    if (n < 0) {
                        var o = e;
                        e = i, i = o
                    } else if (0 === n || 0 === i.cmpn(1)) break;
                    e.isub(i)
                }
                return i.iushln(r)
            }, o.prototype.invm = function(t) {
                return this.egcd(t).a.umod(t)
            }, o.prototype.isEven = function() {
                return 0 == (1 & this.words[0])
            }, o.prototype.isOdd = function() {
                return 1 == (1 & this.words[0])
            }, o.prototype.andln = function(t) {
                return this.words[0] & t
            }, o.prototype.bincn = function(t) {
                r("number" == typeof t);
                var e = t % 26,
                    i = (t - e) / 26,
                    n = 1 << e;
                if (this.length <= i) return this._expand(i + 1), this.words[i] |= n, this;
                for (var o = n, a = i; 0 !== o && a < this.length; a++) {
                    var s = 0 | this.words[a];
                    o = (s += o) >>> 26, s &= 67108863, this.words[a] = s
                }
                return 0 !== o && (this.words[a] = o, this.length++), this
            }, o.prototype.isZero = function() {
                return 1 === this.length && 0 === this.words[0]
            }, o.prototype.cmpn = function(t) {
                var e, i = t < 0;
                if (0 !== this.negative && !i) return -1;
                if (0 === this.negative && i) return 1;
                if (this.strip(), this.length > 1) e = 1;
                else {
                    i && (t = -t), r(t <= 67108863, "Number is too big");
                    var n = 0 | this.words[0];
                    e = n === t ? 0 : n < t ? -1 : 1
                }
                return 0 !== this.negative ? 0 | -e : e
            }, o.prototype.cmp = function(t) {
                if (0 !== this.negative && 0 === t.negative) return -1;
                if (0 === this.negative && 0 !== t.negative) return 1;
                var e = this.ucmp(t);
                return 0 !== this.negative ? 0 | -e : e
            }, o.prototype.ucmp = function(t) {
                if (this.length > t.length) return 1;
                if (this.length < t.length) return -1;
                for (var e = 0, i = this.length - 1; i >= 0; i--) {
                    var r = 0 | this.words[i],
                        n = 0 | t.words[i];
                    if (r !== n) {
                        r < n ? e = -1 : r > n && (e = 1);
                        break
                    }
                }
                return e
            }, o.prototype.gtn = function(t) {
                return 1 === this.cmpn(t)
            }, o.prototype.gt = function(t) {
                return 1 === this.cmp(t)
            }, o.prototype.gten = function(t) {
                return this.cmpn(t) >= 0
            }, o.prototype.gte = function(t) {
                return this.cmp(t) >= 0
            }, o.prototype.ltn = function(t) {
                return -1 === this.cmpn(t)
            }, o.prototype.lt = function(t) {
                return -1 === this.cmp(t)
            }, o.prototype.lten = function(t) {
                return this.cmpn(t) <= 0
            }, o.prototype.lte = function(t) {
                return this.cmp(t) <= 0
            }, o.prototype.eqn = function(t) {
                return 0 === this.cmpn(t)
            }, o.prototype.eq = function(t) {
                return 0 === this.cmp(t)
            }, o.red = function(t) {
                return new w(t)
            }, o.prototype.toRed = function(t) {
                return r(!this.red, "Already a number in reduction context"), r(0 === this.negative, "red works only with positives"), t.convertTo(this)._forceRed(t)
            }, o.prototype.fromRed = function() {
                return r(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this)
            }, o.prototype._forceRed = function(t) {
                return this.red = t, this
            }, o.prototype.forceRed = function(t) {
                return r(!this.red, "Already a number in reduction context"), this._forceRed(t)
            }, o.prototype.redAdd = function(t) {
                return r(this.red, "redAdd works only with red numbers"), this.red.add(this, t)
            }, o.prototype.redIAdd = function(t) {
                return r(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t)
            }, o.prototype.redSub = function(t) {
                return r(this.red, "redSub works only with red numbers"), this.red.sub(this, t)
            }, o.prototype.redISub = function(t) {
                return r(this.red, "redISub works only with red numbers"), this.red.isub(this, t)
            }, o.prototype.redShl = function(t) {
                return r(this.red, "redShl works only with red numbers"), this.red.shl(this, t)
            }, o.prototype.redMul = function(t) {
                return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.mul(this, t)
            }, o.prototype.redIMul = function(t) {
                return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.imul(this, t)
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
            }, o.prototype.redPow = function(t) {
                return r(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, t)
            };
            var y = {
                k256: null,
                p224: null,
                p192: null,
                p25519: null
            };

            function b(t, e) {
                this.name = t, this.p = new o(e, 16), this.n = this.p.bitLength(), this.k = new o(1).iushln(this.n).isub(this.p), this.tmp = this._tmp()
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

            function w(t) {
                if ("string" == typeof t) {
                    var e = o._prime(t);
                    this.m = e.p, this.prime = e
                } else r(t.gtn(1), "modulus must be greater than 1"), this.m = t, this.prime = null
            }

            function E(t) {
                w.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new o(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv)
            }
            b.prototype._tmp = function() {
                var t = new o(null);
                return t.words = new Array(Math.ceil(this.n / 13)), t
            }, b.prototype.ireduce = function(t) {
                var e, i = t;
                do {
                    this.split(i, this.tmp), e = (i = (i = this.imulK(i)).iadd(this.tmp)).bitLength()
                } while (e > this.n);
                var r = e < this.n ? -1 : i.ucmp(this.p);
                return 0 === r ? (i.words[0] = 0, i.length = 1) : r > 0 ? i.isub(this.p) : i.strip(), i
            }, b.prototype.split = function(t, e) {
                t.iushrn(this.n, 0, e)
            }, b.prototype.imulK = function(t) {
                return t.imul(this.k)
            }, n(g, b), g.prototype.split = function(t, e) {
                for (var i = Math.min(t.length, 9), r = 0; r < i; r++) e.words[r] = t.words[r];
                if (e.length = i, t.length <= 9) return t.words[0] = 0, void(t.length = 1);
                var n = t.words[9];
                for (e.words[e.length++] = 4194303 & n, r = 10; r < t.length; r++) {
                    var o = 0 | t.words[r];
                    t.words[r - 10] = (4194303 & o) << 4 | n >>> 22, n = o
                }
                n >>>= 22, t.words[r - 10] = n, 0 === n && t.length > 10 ? t.length -= 10 : t.length -= 9
            }, g.prototype.imulK = function(t) {
                t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;
                for (var e = 0, i = 0; i < t.length; i++) {
                    var r = 0 | t.words[i];
                    e += 977 * r, t.words[i] = 67108863 & e, e = 64 * r + (e / 67108864 | 0)
                }
                return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t
            }, n(v, b), n(m, b), n(A, b), A.prototype.imulK = function(t) {
                for (var e = 0, i = 0; i < t.length; i++) {
                    var r = 19 * (0 | t.words[i]) + e,
                        n = 67108863 & r;
                    r >>>= 26, t.words[i] = n, e = r
                }
                return 0 !== e && (t.words[t.length++] = e), t
            }, o._prime = function(t) {
                if (y[t]) return y[t];
                var e;
                if ("k256" === t) e = new g;
                else if ("p224" === t) e = new v;
                else if ("p192" === t) e = new m;
                else {
                    if ("p25519" !== t) throw new Error("Unknown prime " + t);
                    e = new A
                }
                return y[t] = e, e
            }, w.prototype._verify1 = function(t) {
                r(0 === t.negative, "red works only with positives"), r(t.red, "red works only with red numbers")
            }, w.prototype._verify2 = function(t, e) {
                r(0 == (t.negative | e.negative), "red works only with positives"), r(t.red && t.red === e.red, "red works only with red numbers")
            }, w.prototype.imod = function(t) {
                return this.prime ? this.prime.ireduce(t)._forceRed(this) : t.umod(this.m)._forceRed(this)
            }, w.prototype.neg = function(t) {
                return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
            }, w.prototype.add = function(t, e) {
                this._verify2(t, e);
                var i = t.add(e);
                return i.cmp(this.m) >= 0 && i.isub(this.m), i._forceRed(this)
            }, w.prototype.iadd = function(t, e) {
                this._verify2(t, e);
                var i = t.iadd(e);
                return i.cmp(this.m) >= 0 && i.isub(this.m), i
            }, w.prototype.sub = function(t, e) {
                this._verify2(t, e);
                var i = t.sub(e);
                return i.cmpn(0) < 0 && i.iadd(this.m), i._forceRed(this)
            }, w.prototype.isub = function(t, e) {
                this._verify2(t, e);
                var i = t.isub(e);
                return i.cmpn(0) < 0 && i.iadd(this.m), i
            }, w.prototype.shl = function(t, e) {
                return this._verify1(t), this.imod(t.ushln(e))
            }, w.prototype.imul = function(t, e) {
                return this._verify2(t, e), this.imod(t.imul(e))
            }, w.prototype.mul = function(t, e) {
                return this._verify2(t, e), this.imod(t.mul(e))
            }, w.prototype.isqr = function(t) {
                return this.imul(t, t.clone())
            }, w.prototype.sqr = function(t) {
                return this.mul(t, t)
            }, w.prototype.sqrt = function(t) {
                if (t.isZero()) return t.clone();
                var e = this.m.andln(3);
                if (r(e % 2 == 1), 3 === e) {
                    var i = this.m.add(new o(1)).iushrn(2);
                    return this.pow(t, i)
                }
                for (var n = this.m.subn(1), a = 0; !n.isZero() && 0 === n.andln(1);) a++, n.iushrn(1);
                r(!n.isZero());
                var s = new o(1).toRed(this),
                    u = s.redNeg(),
                    d = this.m.subn(1).iushrn(1),
                    c = this.m.bitLength();
                for (c = new o(2 * c * c).toRed(this); 0 !== this.pow(c, d).cmp(u);) c.redIAdd(u);
                for (var f = this.pow(c, n), l = this.pow(t, n.addn(1).iushrn(1)), h = this.pow(t, n), p = a; 0 !== h.cmp(s);) {
                    for (var _ = h, y = 0; 0 !== _.cmp(s); y++) _ = _.redSqr();
                    r(y < p);
                    var b = this.pow(f, new o(1).iushln(p - y - 1));
                    l = l.redMul(b), f = b.redSqr(), h = h.redMul(f), p = y
                }
                return l
            }, w.prototype.invm = function(t) {
                var e = t._invmp(this.m);
                return 0 !== e.negative ? (e.negative = 0, this.imod(e).redNeg()) : this.imod(e)
            }, w.prototype.pow = function(t, e) {
                if (e.isZero()) return new o(1).toRed(this);
                if (0 === e.cmpn(1)) return t.clone();
                var i = new Array(16);
                i[0] = new o(1).toRed(this), i[1] = t;
                for (var r = 2; r < i.length; r++) i[r] = this.mul(i[r - 1], t);
                var n = i[0],
                    a = 0,
                    s = 0,
                    u = e.bitLength() % 26;
                for (0 === u && (u = 26), r = e.length - 1; r >= 0; r--) {
                    for (var d = e.words[r], c = u - 1; c >= 0; c--) {
                        var f = d >> c & 1;
                        n !== i[0] && (n = this.sqr(n)), 0 !== f || 0 !== a ? (a <<= 1, a |= f, (4 === ++s || 0 === r && 0 === c) && (n = this.mul(n, i[a]), s = 0, a = 0)) : s = 0
                    }
                    u = 26
                }
                return n
            }, w.prototype.convertTo = function(t) {
                var e = t.umod(this.m);
                return e === t ? e.clone() : e
            }, w.prototype.convertFrom = function(t) {
                var e = t.clone();
                return e.red = null, e
            }, o.mont = function(t) {
                return new E(t)
            }, n(E, w), E.prototype.convertTo = function(t) {
                return this.imod(t.ushln(this.shift))
            }, E.prototype.convertFrom = function(t) {
                var e = this.imod(t.mul(this.rinv));
                return e.red = null, e
            }, E.prototype.imul = function(t, e) {
                if (t.isZero() || e.isZero()) return t.words[0] = 0, t.length = 1, t;
                var i = t.imul(e),
                    r = i.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                    n = i.isub(r).iushrn(this.shift),
                    o = n;
                return n.cmp(this.m) >= 0 ? o = n.isub(this.m) : n.cmpn(0) < 0 && (o = n.iadd(this.m)), o._forceRed(this)
            }, E.prototype.mul = function(t, e) {
                if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
                var i = t.mul(e),
                    r = i.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                    n = i.isub(r).iushrn(this.shift),
                    a = n;
                return n.cmp(this.m) >= 0 ? a = n.isub(this.m) : n.cmpn(0) < 0 && (a = n.iadd(this.m)), a._forceRed(this)
            }, E.prototype.invm = function(t) {
                return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
            }
        }(void 0 === t || t, this)
    }).call(this, i(287)(t))
}, , , , , , , , function(t, e, i) {
    "use strict";
    (function(e) {
        !e.version || 0 === e.version.indexOf("v0.") || 0 === e.version.indexOf("v1.") && 0 !== e.version.indexOf("v1.8.") ? t.exports = {
            nextTick: function(t, i, r, n) {
                if ("function" != typeof t) throw new TypeError('"callback" argument must be a function');
                var o, a, s = arguments.length;
                switch (s) {
                    case 0:
                    case 1:
                        return e.nextTick(t);
                    case 2:
                        return e.nextTick(function() {
                            t.call(null, i)
                        });
                    case 3:
                        return e.nextTick(function() {
                            t.call(null, i, r)
                        });
                    case 4:
                        return e.nextTick(function() {
                            t.call(null, i, r, n)
                        });
                    default:
                        for (o = new Array(s - 1), a = 0; a < o.length;) o[a++] = arguments[a];
                        return e.nextTick(function() {
                            t.apply(null, o)
                        })
                }
            }
        } : t.exports = e
    }).call(this, i(210))
}, , , , , function(t, e, i) {
    "use strict";

    function r(t, e) {
        AudioUtils.deleteAudio(t, e, !1, !0)
    }
    i.r(e), i.d(e, "deleteRecomsAudio", function() {
        return r
    })
}, function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "getFiles", function() {
        return s
    }), i.d(e, "clipboardProcessPaste", function() {
        return c
    }), i.d(e, "copyToClipboard", function() {
        return f
    });
    var r = i(240),
        n = i(473),
        o = function() {
            return function(t, e) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return function(t, e) {
                    var i = [],
                        r = !0,
                        n = !1,
                        o = void 0;
                    try {
                        for (var a, s = t[Symbol.iterator](); !(r = (a = s.next()).done) && (i.push(a.value), !e || i.length !== e); r = !0);
                    } catch (t) {
                        n = !0, o = t
                    } finally {
                        try {
                            !r && s.return && s.return()
                        } finally {
                            if (n) throw o
                        }
                    }
                    return i
                }(t, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        a = n.Promise;

    function s(t) {
        var e = function(t) {
            return t && t.clipboardData ? t.clipboardData : t && t.originalEvent && t.originalEvent.clipboardData ? t.originalEvent.clipboardData : window.clipboardData
        }(t);
        if (!e) return [];
        var i = e.items;
        if (!i) return [];
        for (var r = [], n = 0; n < i.length; n++) 0 == i[n].type.indexOf("image") && r.push(i[n].getAsFile());
        return r
    }
    var u = !1,
        d = null;

    function c(t) {
        return new a(function(e, i) {
            if (u) return cancelEvent(t), i();
            var n = Object(r.rangeGet)(),
                s = o(n, 5),
                c = s[0],
                f = s[1],
                l = s[2],
                h = s[3],
                p = s[4];
            if (c) {
                if ("paste" === t.type) {
                    var _ = t.clipboardData || t.originalEvent && t.originalEvent.clipboardData;
                    if (_ && _.types && _.getData) {
                        cancelEvent(t), u = !0;
                        var y = _.getData("text/html") || clean(_.getData("text/plain")) || "";
                        return e([y, function(t) {
                            Object(r.rangeInsert)(c, t), u = !1
                        }])
                    }
                    for (var b = cf(), g = t.target || window.event.srcElement; g.firstChild;) b.appendChild(g.firstChild);
                    return new a(function(t) {
                        return setTimeout(function() {
                            var e = g.innerHTML || "";
                            g.innerHTML = "", g.appendChild(b), t([e, function(t) {
                                c = Object(r.rangeCreate)(f, l, h, p), Object(r.rangeInsert)(c, t), u = !1
                            }])
                        }, 0)
                    })
                }
                if ("beforepaste" === t.type) return u = !0,
                    function() {
                        if (!d) {
                            var t = ge("utils");
                            d = ce("div", {}, {
                                width: "10px",
                                height: "10px",
                                overflow: "hidden"
                            }), attr(d, "contenteditable", "true"), t.appendChild(d)
                        }
                    }(), d.focus(), void(d.onpaste = function() {
                        setTimeout(function() {
                            var t = d.innerHTML || "";
                            d.innerHTML = "", delete d.onpaste, e([t, function(t) {
                                c = Object(r.rangeCreate)(f, l, h, p), Object(r.rangeInsert)(c, t), u = !1
                            }])
                        }, 0)
                    })
            }
            return i()
        })
    }

    function f(t) {
        var e = document.createElement("input"),
            i = document.activeElement;
        e.value = t, document.body.appendChild(e), e.select(), document.execCommand("copy"), document.body.removeChild(e), i.focus()
    }
}, , , , , function(t, e, i) {
    "use strict";

    function r(t, e) {
        if (AudioUtils.isPodcast(e)) {
            var i = AudioUtils.getAudioExtra(e).faveHash;
            bookmarkPodcast(geByClass1("audio_row__action_fave", t), e.fullId, i)
        }
    }
    i.r(e), i.d(e, "faveEpisode", function() {
        return r
    })
}, , function(t, e, i) {
    "use strict";

    function r() {
        each(AudioUtils._audioAddRestoreInfo || {}, function(t, e) {
            "deleted" != e.state && "recom_hidden" != e.state || getAudioPlayer().deleteAudioFromAllPlaylists(t)
        })
    }
    i.r(e), i.d(e, "deleteDeletedAudios", function() {
        return r
    })
}, function(t, e, i) {
    "use strict";

    function r() {
        var t = null,
            e = window.getSelection();
        e.getRangeAt && e.rangeCount && (t = e.getRangeAt(0));
        var i = null,
            r = null,
            n = 0,
            o = 0,
            a = document.activeElement;
        return t && ("selectionStart" in a ? (i = a, r = a, n = a.selectionStart, o = a.selectionEnd) : e.rangeCount && (i = t.startContainer, r = t.endContainer, n = t.startOffset, o = t.endOffset)), [t, i, n, r, o]
    }

    function n(t) {
        var e = window.getSelection();
        return e.removeAllRanges(), e.addRange(t), t
    }

    function o(t, e, i, r) {
        var o = document.createRange();
        return o.setStart(t, e), o.setEnd(i, r), n(o)
    }

    function a(t, e) {
        if (e = e ? e + "" : "", !browser.msie && document.execCommand) document.execCommand("insertHTML", !1, e);
        else if (t) {
            t.deleteContents();
            var i = cf(e),
                r = i.lastChild;
            t.insertNode(i), r && ((t = t.cloneRange()).setStartAfter(r), t.collapse(!0), n(t))
        }
        return t
    }
    i.r(e), i.d(e, "rangeGet", function() {
        return r
    }), i.d(e, "rangeSet", function() {
        return n
    }), i.d(e, "rangeCreate", function() {
        return o
    }), i.d(e, "rangeInsert", function() {
        return a
    })
}, , function(t, e, i) {
    "use strict";
    var r = i(218),
        n = i(329).utils.assert;

    function o(t, e) {
        this.ec = t, this.priv = null, this.pub = null, e.priv && this._importPrivate(e.priv, e.privEnc), e.pub && this._importPublic(e.pub, e.pubEnc)
    }
    t.exports = o, o.fromPublic = function(t, e, i) {
        return e instanceof o ? e : new o(t, {
            pub: e,
            pubEnc: i
        })
    }, o.fromPrivate = function(t, e, i) {
        return e instanceof o ? e : new o(t, {
            priv: e,
            privEnc: i
        })
    }, o.prototype.validate = function() {
        var t = this.getPublic();
        return t.isInfinity() ? {
            result: !1,
            reason: "Invalid public key"
        } : t.validate() ? t.mul(this.ec.curve.n).isInfinity() ? {
            result: !0,
            reason: null
        } : {
            result: !1,
            reason: "Public key * N != O"
        } : {
            result: !1,
            reason: "Public key is not a point"
        }
    }, o.prototype.getPublic = function(t, e) {
        return "string" == typeof t && (e = t, t = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), e ? this.pub.encode(e, t) : this.pub
    }, o.prototype.getPrivate = function(t) {
        return "hex" === t ? this.priv.toString(16, 2) : this.priv
    }, o.prototype._importPrivate = function(t, e) {
        this.priv = new r(t, e || 16), this.priv = this.priv.umod(this.ec.curve.n)
    }, o.prototype._importPublic = function(t, e) {
        if (t.x || t.y) return "mont" === this.ec.curve.type ? n(t.x, "Need x coordinate") : "short" !== this.ec.curve.type && "edwards" !== this.ec.curve.type || n(t.x && t.y, "Need both x and y coordinate"), void(this.pub = this.ec.curve.point(t.x, t.y));
        this.pub = this.ec.curve.decodePoint(t, e)
    }, o.prototype.derive = function(t) {
        return t.mul(this.priv).getX()
    }, o.prototype.sign = function(t, e, i) {
        return this.ec.sign(t, this, e, i)
    }, o.prototype.verify = function(t, e) {
        return this.ec.verify(t, e, this)
    }, o.prototype.inspect = function() {
        return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >"
    }
}, , , , , function(t, e, i) {
    "use strict";

    function r(t) {
        var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
            i = "";
        if (e = !AudioUtils.isPodcast(t) && e, isArray(t[AudioUtils.AUDIO_ITEM_INDEX_MAIN_ARTISTS]) && (i = AudioUtils.getAudioArtistsString(t[AudioUtils.AUDIO_ITEM_INDEX_MAIN_ARTISTS], e)), isArray(t[AudioUtils.AUDIO_ITEM_INDEX_FEAT_ARTISTS]) && (i += " feat. ", i += AudioUtils.getAudioArtistsString(t[AudioUtils.AUDIO_ITEM_INDEX_FEAT_ARTISTS], e)), !i) {
            var r = t[AudioUtils.AUDIO_ITEM_INDEX_PERFORMER].replace(/<\/?em>/g, "");
            if (e) i = '<a class="artist_link" data-performer="' + r + '" href="' + ("/audio?performer=1&q=" + encodeURIComponent(r)) + '">' + r + "</a>";
            else i = r
        }
        return i
    }
    i.r(e), i.d(e, "getAudioPerformers", function() {
        return r
    })
}, , , , function(t, e, i) {
    var r = i(581),
        n = i(502);

    function o(t) {
        n.call(this, t), this.enc = "pem"
    }
    r(o, n), t.exports = o, o.prototype.encode = function(t, e) {
        for (var i = n.prototype.encode.call(this, t).toString("base64"), r = ["-----BEGIN " + e.label + "-----"], o = 0; o < i.length; o += 64) r.push(i.slice(o, o + 64));
        return r.push("-----END " + e.label + "-----"), r.join("\n")
    }
}, , function(t, e, i) {
    "use strict";

    function r(t, e) {
        var i = e.getAccessHash();
        cur.chooseMedia("audio_playlist", e.getOwnerId() + "_" + e.getPlaylistId() + (i ? ":" + i : ""), {
            id: e.getPlaylistId(),
            ownerId: e.getOwnerId(),
            coverUrl: e.getCoverUrl(),
            gridCovers: e.getGridCovers(),
            title: e.getTitle(),
            authorName: e.getAuthorName(),
            authorHref: e.getAuthorHref(),
            accessHash: e.getAccessHash()
        })
    }
    i.r(e), i.d(e, "onPlaylistChoose", function() {
        return r
    })
}, , , , , function(t, e, i) {
    "use strict";

    function r(t, e, i) {
        var r = void 0,
            n = AudioUtils.getAddRestoreInfo();
        switch (t) {
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
                if (AudioUtils.isPodcast(e)) r = getLang("audio_podcast_delete_episode");
                else if (window.AudioPage && AudioPage.isInRecentPlayed(i)) r = getLang("audio_remove_from_list");
                else {
                    var o = n[e.fullId];
                    r = o && o.deleteAll ? o.deleteAll.text : getLang("global_delete_audio")
                }
                break;
            case "restore_recoms":
                r = getLang("audio_restore_audio");
                break;
            case "add":
                var a = n[e.fullId];
                if (AudioUtils.isPodcast(e)) r = getLang("audio_podcast_restore_episode");
                else if (a && "deleted" == a.state) r = getLang("audio_restore_audio");
                else if (a && "added" == a.state) r = getLang("global_delete_audio");
                else {
                    var s = !!window.AudioPage && currentAudioPage(i);
                    r = s && s.getOwnerId() < 0 && s.canAddToGroup() ? getLang("audio_add_to_group") : getLang("audio_add_to_audio")
                }
                break;
            case "edit":
                r = AudioUtils.isPodcast(e) ? getLang("audio_podcast_edit_episode") : getLang("audio_edit_audio");
                break;
            case "next":
                r = cur.lang && cur.lang.global_audio_set_next_audio || getLang("audio_set_next_audio");
                break;
            case "recoms":
                r = getLang("audio_show_recommendations");
                break;
            case "fave":
                r = AudioUtils.isPodcast(e) ? getLang("audio_podcast_listen_later") : "";
                break;
            default:
                r = ""
        }
        return r
    }
    i.r(e), i.d(e, "getRowActionName", function() {
        return r
    })
}, , function(t, e, i) {
    "use strict";

    function r(t) {
        return !!t && (t = AudioUtils.asObject(t)).flags & AudioUtils.AUDIO_ITEM_CLAIMED_BIT
    }
    i.r(e), i.d(e, "isClaimedAudio", function() {
        return r
    })
}, , , , , function(t, e, i) {
    var r = i(93),
        n = i(581);

    function o(t, e) {
        this.name = t, this.body = e, this.decoders = {}, this.encoders = {}
    }
    e.define = function(t, e) {
        return new o(t, e)
    }, o.prototype._createNamed = function(t) {
        var e;
        try {
            e = i(193).runInThisContext("(function " + this.name + "(entity) {\n  this._initNamed(entity);\n})")
        } catch (t) {
            e = function(t) {
                this._initNamed(t)
            }
        }
        return n(e, t), e.prototype._initNamed = function(e) {
            t.call(this, e)
        }, new e(this)
    }, o.prototype._getDecoder = function(t) {
        return t = t || "der", this.decoders.hasOwnProperty(t) || (this.decoders[t] = this._createNamed(r.decoders[t])), this.decoders[t]
    }, o.prototype.decode = function(t, e, i) {
        return this._getDecoder(e).decode(t, i)
    }, o.prototype._getEncoder = function(t) {
        return t = t || "der", this.encoders.hasOwnProperty(t) || (this.encoders[t] = this._createNamed(r.encoders[t])), this.encoders[t]
    }, o.prototype.encode = function(t, e, i) {
        return this._getEncoder(e).encode(t, i)
    }
}, , function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "KEY", function() {
        return a
    }), i.d(e, "addEvent", function() {
        return s
    }), i.d(e, "removeEvent", function() {
        return u
    }), i.d(e, "triggerEvent", function() {
        return d
    }), i.d(e, "cancelEvent", function() {
        return c
    }), i.d(e, "stopEvent", function() {
        return f
    }), i.d(e, "normEvent", function() {
        return l
    }), i.d(e, "checkEvent", function() {
        return h
    }), i.d(e, "checkKeyboardEvent", function() {
        return p
    }), i.d(e, "checkOver", function() {
        return _
    });
    var r = i(506),
        n = i(125),
        o = i(92),
        a = {
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            DEL: 8,
            TAB: 9,
            RETURN: 13,
            ENTER: 13,
            ESC: 27,
            PAGEUP: 33,
            PAGEDOWN: 34,
            SPACE: 32,
            CTRL: 17,
            ALT: 18,
            SHIFT: 16
        };

    function s(t, e, i, o, a, s) {
        if ((t = Object(r.ge)(t)) && 3 != t.nodeType && 8 != t.nodeType) {
            var u, d = a ? ((u = function(t) {
                var e = t.data;
                t.data = a;
                var r = i.apply(this, [t]);
                return t.data = e, r
            }).handler = i, u) : i;
            t.setInterval && t !== window && (t = window);
            var f = Object(r.data)(t, "events") || Object(r.data)(t, "events", {}),
                h = Object(r.data)(t, "handle") || Object(r.data)(t, "handle", function(t) {
                    return function() {
                        (function(t) {
                            t = l(t);
                            var e = Array.from(arguments);
                            e[0] = t;
                            var i = Object(r.data)(this, "events");
                            if (!i || "string" != typeof t.type || !i[t.type] || !i[t.type].length) return;
                            var n = (i[t.type] || []).slice();
                            for (var o in n)
                                if (n.hasOwnProperty(o)) {
                                    if ("mouseover" === t.type || "mouseout" === t.type) {
                                        for (var a = t.relatedElement; a && a !== this;) a = a.parentNode;
                                        if (a === this) continue
                                    }
                                    var s = n[o].apply(this, e);
                                    if (!1 !== s && -1 !== s || c(t), -1 === s) return !1
                                }
                        }).apply(t, arguments)
                    }
                }(t));
            Object(n.each)(e.split(/\s+/), function(e, i) {
                f[i] || (f[i] = [], !o && t.addEventListener ? t.addEventListener(i, h, s) : !o && t.attachEvent && t.attachEvent("on" + i, h)), f[i].push(d)
            })
        }
    }

    function u(t, e, i, o) {
        if (void 0 === o && (o = !1), t = Object(r.ge)(t)) {
            var a = Object(r.data)(t, "events");
            if (a)
                if ("string" == typeof e) Object(n.each)(e.split(/\s+/), function(e, s) {
                    if (Object(n.isArray)(a[s])) {
                        var u = a[s].length;
                        if (Object(n.isFunction)(i)) {
                            for (var d = u - 1; d >= 0; d--)
                                if (a[s][d] && (a[s][d] === i || a[s][d].handler === i)) {
                                    a[s].splice(d, 1), u--;
                                    break
                                }
                        } else {
                            for (var c = 0; c < u; c++) delete a[s][c];
                            u = 0
                        }
                        u || (t.removeEventListener ? t.removeEventListener(s, Object(r.data)(t, "handle"), o) : t.detachEvent && t.detachEvent("on" + s, Object(r.data)(t, "handle")), delete a[s])
                    }
                }), Object(n.isEmpty)(a) && (Object(r.removeData)(t, "events"), Object(r.removeData)(t, "handle"));
                else
                    for (var s in a) a.hasOwnProperty(s) && u(t, s)
        }
    }

    function d(t, e, i, o) {
        t = Object(r.ge)(t);
        var a = Object(r.data)(t, "handle");
        if (a) {
            var s = function() {
                return a.call(t, Object(n.extend)(i || {}, {
                    type: e,
                    target: t
                }))
            };
            o ? s() : setTimeout(s, 0)
        }
    }

    function c(t) {
        if (!(t = t || window.event)) return !1;
        for (; t.originalEvent;) t = t.originalEvent;
        return t.preventDefault && t.preventDefault(), t.stopPropagation && t.stopPropagation(), t.stopImmediatePropagation && t.stopImmediatePropagation(), t.cancelBubble = !0, t.returnValue = !1, !1
    }

    function f(t) {
        if (!(t = t || window.event)) return !1;
        for (; t.originalEvent;) t = t.originalEvent;
        return t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0, !1
    }

    function l(t) {
        var e = t = t || window.event;
        if ((t = Object(n.clone)(e)).originalEvent = e, t.target || (t.target = t.srcElement || document), 3 == t.target.nodeType && (t.target = t.target.parentNode), !t.relatedTarget && t.fromElement && (t.relatedTarget = t.fromElement === t.target), null == t.pageX && null != t.clientX) {
            var i = document.documentElement,
                r = bodyNode;
            t.pageX = t.clientX + (i && i.scrollLeft || r && r.scrollLeft || 0) - (i.clientLeft || 0), t.pageY = t.clientY + (i && i.scrollTop || r && r.scrollTop || 0) - (i.clientTop || 0)
        }
        return !t.which && (t.charCode || 0 === t.charCode ? t.charCode : t.keyCode) && (t.which = t.charCode || t.keyCode), !t.metaKey && t.ctrlKey ? t.metaKey = t.ctrlKey : !t.ctrlKey && t.metaKey && o.browser.mac && (t.ctrlKey = t.metaKey), !t.which && t.button && (t.which = 1 & t.button ? 1 : 2 & t.button ? 3 : 4 & t.button ? 2 : 0), t
    }

    function h(t) {
        var e = t || window.event;
        return e && ("click" === e.type || "mousedown" === e.type || "mouseup" === e.type) && (e.which > 1 || e.button > 1 || e.ctrlKey || e.shiftKey || o.browser.mac && e.metaKey) || !1
    }

    function p(t) {
        if (!(t = l(t)) || !t.target) return !1;
        if (!t.screenX) return !0;
        var e = Object(r.getSize)(t.target),
            i = Object(r.getXY)(t.target),
            n = t.pageX - i[0],
            o = t.pageY - i[1];
        return n < -1 || n > e[0] + 1 || o < -1 || o > e[1] + 1 || Math.abs(t.pageX - i[0] - e[0] / 2) < 1 && Math.abs(t.pageY - i[1] - e[1] / 2) < 1
    }

    function _(t, e) {
        if (!t) return !0;
        t = t.originalEvent || t, e = e || t.target;
        var i = t.fromElement || t.relatedTarget;
        if (!i || i === e || i === e.parentNode) return !0;
        for (; i !== e && i.parentNode && i.parentNode !== bodyNode;) i = i.parentNode;
        return i !== e
    }
}, function(t, e, i) {
    var r = i(581),
        n = i(564),
        o = i(307).Buffer,
        a = [1518500249, 1859775393, -1894007588, -899497514],
        s = new Array(80);

    function u() {
        this.init(), this._w = s, n.call(this, 64, 56)
    }

    function d(t) {
        return t << 30 | t >>> 2
    }

    function c(t, e, i, r) {
        return 0 === t ? e & i | ~e & r : 2 === t ? e & i | e & r | i & r : e ^ i ^ r
    }
    r(u, n), u.prototype.init = function() {
        return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
    }, u.prototype._update = function(t) {
        for (var e, i = this._w, r = 0 | this._a, n = 0 | this._b, o = 0 | this._c, s = 0 | this._d, u = 0 | this._e, f = 0; f < 16; ++f) i[f] = t.readInt32BE(4 * f);
        for (; f < 80; ++f) i[f] = i[f - 3] ^ i[f - 8] ^ i[f - 14] ^ i[f - 16];
        for (var l = 0; l < 80; ++l) {
            var h = ~~(l / 20),
                p = 0 | ((e = r) << 5 | e >>> 27) + c(h, n, o, s) + u + i[l] + a[h];
            u = s, s = o, o = d(n), n = r, r = p
        }
        this._a = r + this._a | 0, this._b = n + this._b | 0, this._c = o + this._c | 0, this._d = s + this._d | 0, this._e = u + this._e | 0
    }, u.prototype._hash = function() {
        var t = o.allocUnsafe(20);
        return t.writeInt32BE(0 | this._a, 0), t.writeInt32BE(0 | this._b, 4), t.writeInt32BE(0 | this._c, 8), t.writeInt32BE(0 | this._d, 12), t.writeInt32BE(0 | this._e, 16), t
    }, t.exports = u
}, , , function(t, e, i) {
    "use strict";
    var r = i(436),
        n = i(430),
        o = i(38),
        a = r.rotl32,
        s = r.sum32,
        u = r.sum32_5,
        d = o.ft_1,
        c = n.BlockHash,
        f = [1518500249, 1859775393, 2400959708, 3395469782];

    function l() {
        if (!(this instanceof l)) return new l;
        c.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.W = new Array(80)
    }
    r.inherits(l, c), t.exports = l, l.blockSize = 512, l.outSize = 160, l.hmacStrength = 80, l.padLength = 64, l.prototype._update = function(t, e) {
        for (var i = this.W, r = 0; r < 16; r++) i[r] = t[e + r];
        for (; r < i.length; r++) i[r] = a(i[r - 3] ^ i[r - 8] ^ i[r - 14] ^ i[r - 16], 1);
        var n = this.h[0],
            o = this.h[1],
            c = this.h[2],
            l = this.h[3],
            h = this.h[4];
        for (r = 0; r < i.length; r++) {
            var p = ~~(r / 20),
                _ = u(a(n, 5), d(p, o, c, l), h, i[r], f[p]);
            h = l, l = c, c = a(o, 30), o = n, n = _
        }
        this.h[0] = s(this.h[0], n), this.h[1] = s(this.h[1], o), this.h[2] = s(this.h[2], c), this.h[3] = s(this.h[3], l), this.h[4] = s(this.h[4], h)
    }, l.prototype._digest = function(t) {
        return "hex" === t ? r.toHex32(this.h, "big") : r.split32(this.h, "big")
    }
}, function(t, e, i) {
    "use strict";
    var r = i(436),
        n = i(214);

    function o(t, e, i) {
        if (!(this instanceof o)) return new o(t, e, i);
        this.Hash = t, this.blockSize = t.blockSize / 8, this.outSize = t.outSize / 8, this.inner = null, this.outer = null, this._init(r.toArray(e, i))
    }
    t.exports = o, o.prototype._init = function(t) {
        t.length > this.blockSize && (t = (new this.Hash).update(t).digest()), n(t.length <= this.blockSize);
        for (var e = t.length; e < this.blockSize; e++) t.push(0);
        for (e = 0; e < t.length; e++) t[e] ^= 54;
        for (this.inner = (new this.Hash).update(t), e = 0; e < t.length; e++) t[e] ^= 106;
        this.outer = (new this.Hash).update(t)
    }, o.prototype.update = function(t, e) {
        return this.inner.update(t, e), this
    }, o.prototype.digest = function(t) {
        return this.outer.update(this.inner.digest()), this.outer.digest(t)
    }
}, function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "AudioPlayerHTML5", function() {
        return a
    });
    var r = i(153),
        n = i(528);
    var o = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=",
        a = function() {
            function t(e) {
                ! function(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), this.type = "html5", this.opts = e || {}, this._audioNodes = [], this._currentAudioEl = this._createAudioNode(), this._prefetchAudioEl = this._createAudioNode()
            }
            return t.prototype.destroy = function() {}, t.prototype.getPlayedTime = function() {
                for (var t = this._currentAudioEl.played, e = 0, i = 0; i < t.length; i++) e += t.end(i) - t.start(i);
                return e
            }, t.prototype._setAudioNodeUrl = function(t, e) {
                var i = Object(r.audioUnmaskSource)(e);
                data(t, "setUrlTime", i == o ? 0 : vkNow()), this._currentHls && t === this._currentAudioEl && (this._currentHls.destroy(), this._currentHls = null), this._isHlsUrl(i) ? this._initHls(t, i) : t.src = i
            }, t.prototype._isHlsUrl = function(t) {
                return /\.m3u8/.test(Object(r.audioUnmaskSource)(t))
            }, t.prototype._initHls = function(t, e) {
                var i = this;
                if (window.Hls) {
                    var r = new Hls({
                        debug: !!ls.get("audio_hls_debug"),
                        maxBufferHole: 3,
                        nudgeOffset: .5,
                        nudgeMaxRetry: 5
                    });
                    r.attachMedia(t), r.loadSource(e), this._currentHls = r, this._hlsError = null, r.on(Hls.Events.ERROR, function(t, e) {
                        e.details === Hls.ErrorDetails.BUFFER_STALLED_ERROR && (r.stopLoad(), r.startLoad()), e.fatal && (console.log("audio hls error", t, e), i._hlsError = {
                            type: e.type,
                            details: e.details,
                            url: e.frag && e.frag.url || e.context && e.context.url,
                            code: e.networkDetails ? e.networkDetails.status : 0
                        }, i.opts.onFail && i.opts.onFail())
                    });
                    var n = getAudioPlayer();
                    n.isPlaying() && !n.isAdPlaying() && this.play(e)
                } else stManager.add("hls.min.js", function() {
                    i._currentAudioEl === t && i._initHls(t, e)
                })
            }, t.prototype._createAudioNode = function(t) {
                var e = this,
                    i = new Audio;
                return this.opts.onBufferUpdate && addEvent(i, "progress", function() {
                    e._currentAudioEl === i && e.opts.onBufferUpdate(e.getCurrentBuffered());
                    var t = i.buffered;
                    1 === t.length && 0 === t.start(0) && t.end(0) === i.duration && (i._fullyLoaded = !0)
                }), this.opts.onProgressUpdate && addEvent(i, "timeupdate", function() {
                    e._currentAudioEl === i && e.opts.onProgressUpdate(e.getCurrentProgress(), e.getPlayedTime())
                }), this.opts.onEnd && addEvent(i, "ended", function() {
                    e._currentAudioEl === i && e.opts.onEnd()
                }), this.opts.onSeeked && addEvent(i, "seeked", function() {
                    e._currentAudioEl === i && e.opts.onSeeked()
                }), this.opts.onSeek && addEvent(i, "seeking", function() {
                    e._currentAudioEl === i && e.opts.onSeek()
                }), addEvent(i, "error", function() {
                    AudioUtils.debugLog("HTML5 error track loading"), e._prefetchAudioEl === i ? e._prefetchAudioEl = e._createAudioNode() : e._currentAudioEl === i && i.src !== o && e.opts.onFail && e.opts.onFail()
                }), addEvent(i, "canplay", function() {
                    var t = data(i, "setUrlTime");
                    t && (cur.audioLoadTimings = cur.audioLoadTimings || [], cur.audioLoadTimings.push(vkNow() - t), data(i, "setUrlTime", 0)), e._currentAudioEl === i && (e.opts.onCanPlay && e.opts.onCanPlay(), data(i, "canplay", !0))
                }), addEvent(i, "durationchange", function() {
                    e._currentAudioEl === i && e._seekOnReady && isFinite(i.duration) && (e.seek(e._seekOnReady), e._seekOnReady = !1)
                }), i.crossOrigin = "anonymous", t && (this._setAudioNodeUrl(i, t), i.preload = "auto", i.volume = this._volume || 1, i.load()), this._audioNodes.push(i), this._audioNodes.length > 10 && this._audioNodes.splice(0, 5), i
            }, t.prototype.onReady = function(t) {
                t(!0)
            }, t.prototype.prefetch = function(t) {
                this._isHlsUrl(t) || (this._prefetchAudioEl && this._setAudioNodeUrl(this._prefetchAudioEl, o), this._prefetchAudioEl = this._createAudioNode(t))
            }, t.prototype.seek = function(t) {
                var e = this._currentAudioEl;
                isFinite(e.duration) ? e.currentTime = e.duration * t : this._seekOnReady = t
            }, t.prototype.setVolume = function(t) {
                void 0 === t && (t = this._currentAudioEl.volume), this._currentAudioEl.volume = t, this._prefetchAudioEl && (this._prefetchAudioEl.volume = t), this._volume = t
            }, t.prototype.setPlaybackRate = function(t) {
                this._currentAudioEl.playbackRate = t
            }, t.prototype.getCurrentProgress = function() {
                var t = this._currentAudioEl;
                return isNaN(t.duration) ? 0 : Math.max(0, Math.min(1, t.currentTime / t.duration))
            }, t.prototype.getCurrentBuffered = function() {
                var t = this._currentAudioEl;
                return t && t.buffered.length ? Math.min(1, t.buffered.end(0) / t.duration) : 0
            }, t.prototype.isFullyLoaded = function() {
                return this._currentAudioEl._fullyLoaded
            }, t.prototype.setUrl = function(t, e) {
                var i = this;
                if (!t) return e && e(!1);
                var n = Object(r.audioUnmaskSource)(t),
                    a = this._currentAudioEl;
                return this._seekOnReady = !1, a.src === n || this._currentHls && this._currentHls.url === n ? (this.opts.onCanPlay && this.opts.onCanPlay(), e && e(!0)) : (this._prefetchAudioEl && this._prefetchAudioEl.readyState > 0 && (this._prefetchAudioEl.src === n ? (this._currentAudioEl.pause(0), this._setAudioNodeUrl(this._currentAudioEl, o), this._prefetchAudioEl.readyState >= 3 && setTimeout(function() {
                    return i.opts.onCanPlay && i.opts.onCanPlay()
                }), this._currentAudioEl = this._prefetchAudioEl, a = this._currentAudioEl, this._prefetchAudioEl = !1) : this._prefetchAudioEl.src && this._setAudioNodeUrl(this._prefetchAudioEl, o)), a.src !== n && (this._setAudioNodeUrl(a, n), a.load(), data(this._currentAudioEl, "canplay", null), this._stopFrequencyAnalise()), e && e(!0))
            }, t.prototype.playAudioEl = function(t) {
                var e = t.play();
                isUndefined(e) || e.catch(function(e) {
                    e.code !== e.ABORT_ERR && Object(n.setWorkerTimeout)(function() {
                        return triggerEvent(t, "error", !1, !0)
                    }, 10)
                })
            }, t.prototype.play = function(t) {
                this._stopFrequencyAnalise(), this._prefetchAudioEl.src === Object(r.audioUnmaskSource)(t) && this._prefetchAudioEl.readyState > 0 && (this._setAudioNodeUrl(this._currentAudioEl, o), this._currentAudioEl = this._prefetchAudioEl, this._prefetchAudioEl = this._createAudioNode(), this.opts.onCanPlay && this.opts.onCanPlay());
                var e = this._currentAudioEl;
                e.src && (this.playAudioEl(e), this._startFrequencyAnalise())
            }, t.prototype.preparePlay = function() {
                if (browser.safari) {
                    var t = this._currentAudioEl;
                    this.playAudioEl(t)
                }
            }, t.prototype._startFrequencyAnalise = function() {
                var t = this;

                function e(t, e, i, r) {
                    return (i - e) * t / r + e
                }

                function i(t, e) {
                    return Math.random() * (e - t) + t
                }
                this._stopFrequencyAnalise();
                var r = 999,
                    n = null,
                    o = null;
                this._freqUpdateInterval = setInterval(function() {
                    var a = void 0;
                    t._currentAudioEl.paused || !data(t._currentAudioEl, "canplay") ? a = [0, 0, 0, 0] : (++r > 3 && (r = 0, n = o, o = [i(.7, 1), i(.55, .8), i(.3, .55), i(.03, .45)], n || (n = [i(.7, 1), i(.55, .8), i(.3, .55), i(.03, .45)])), a = [e(r, n[0], o[0], 3), e(r, n[1], o[1], 3), e(r, n[2], o[2], 3), e(r, n[3], o[3], 3)]), t.opts && t.opts.onFrequency(a)
                }, 50)
            }, t.prototype._stopFrequencyAnalise = function() {
                this._stopFrequencyAnaliseCallback && this._stopFrequencyAnaliseCallback(), delete this._stopFrequencyAnaliseCallback, clearInterval(this._freqUpdateInterval), this.opts && this.opts.onFrequency([0, 0, 0, 0])
            }, t.prototype.pause = function() {
                var t = this._currentAudioEl;
                if (t.src) {
                    var e = t.pause();
                    void 0 != e && e.catch(function() {})
                }
                this._stopFrequencyAnalise()
            }, t.prototype.stop = function() {
                this._currentAudioEl.pause(), this._currentAudioEl = this._createAudioNode(o), this._stopFrequencyAnalise()
            }, t.prototype._setFadeVolumeInterval = function(t) {
                if (t) {
                    if (!this._fadeVolumeWorker && window.Worker && window.Blob) {
                        var e = new Blob(["\n          var interval;\n          onmessage = function(e) {\n            clearInterval(interval);\n            if (e.data == 'start') {\n              interval = setInterval(function() { postMessage({}); }, 20);\n            }\n          }\n        "]);
                        try {
                            this._fadeVolumeWorker = new Worker(window.URL.createObjectURL(e))
                        } catch (t) {
                            this._fadeVolumeWorker = !1
                        }
                    }
                    this._fadeVolumeWorker ? (this._fadeVolumeWorker.onmessage = t, this._fadeVolumeWorker.postMessage("start")) : this._fadeVolumeInterval = setInterval(t, 60)
                } else this._fadeVolumeWorker && (this._fadeVolumeWorker.terminate(), this._fadeVolumeWorker = null), this._fadeVolumeInterval && clearInterval(this._fadeVolumeInterval)
            }, t.prototype.fadeVolume = function(t, e) {
                var i = this;
                t = Math.max(0, Math.min(1, t));
                var r = this._currentAudioEl,
                    n = 0;
                if (n = t < r.volume ? -.06 : .001, Math.abs(t - r.volume) <= .001) return this._setFadeVolumeInterval(), e && e();
                var o = r.volume;
                this._setFadeVolumeInterval(function() {
                    n > 0 && (n *= 1.35), o += n;
                    if (n < 0 ? o <= t : o >= t) return i.setVolume(t), i._setFadeVolumeInterval(), e && e();
                    i.setVolume(o)
                })
            }, t.prototype.getErrorData = function() {
                var t = this._currentAudioEl.error || {};
                return {
                    is_hls: this._currentHls ? 1 : 0,
                    url: this._currentHls ? this._currentHls.url : this._currentAudioEl.currentSrc,
                    error_code: t.code,
                    error_message: t.message,
                    hls_error: this._hlsError ? JSON.stringify(this._hlsError) : null
                }
            }, t
        }();
    a.isSupported = function() {
        var t = "undefined" != typeof navigator ? navigator.userAgent : "";
        if (/(Windows NT 5.1|Windows XP)/.test(t) && (browser.vivaldi || browser.opera || browser.mozilla)) return AudioUtils.debugLog("Force no HTML5 (xp vivaldi / opera / mozilla)"), !1;
        if (/(Windows 7|Windows NT 6.1)/.test(t) && (browser.vivaldi || browser.opera)) return AudioUtils.debugLog("Force no HTML5 (win7 vivaldi / opera)"), !1;
        var e = document.createElement("audio");
        if (e.canPlayType) {
            var i = e.canPlayType('audio/mpeg; codecs="mp3"'),
                r = !!i.replace(/no/, "");
            return AudioUtils.debugLog("HTML5 browser support " + (r ? "yes" : "no"), i, t), r
        }
        return AudioUtils.debugLog("audio.canPlayType is not available", t), !1
    }
}, function(t, e, i) {
    "use strict";
    var r = i(226),
        n = Object.keys || function(t) {
            var e = [];
            for (var i in t) e.push(i);
            return e
        };
    t.exports = f;
    var o = i(192);
    o.inherits = i(581);
    var a = i(604),
        s = i(554);
    o.inherits(f, a);
    for (var u = n(s.prototype), d = 0; d < u.length; d++) {
        var c = u[d];
        f.prototype[c] || (f.prototype[c] = s.prototype[c])
    }

    function f(t) {
        if (!(this instanceof f)) return new f(t);
        a.call(this, t), s.call(this, t), t && !1 === t.readable && (this.readable = !1), t && !1 === t.writable && (this.writable = !1), this.allowHalfOpen = !0, t && !1 === t.allowHalfOpen && (this.allowHalfOpen = !1), this.once("end", l)
    }

    function l() {
        this.allowHalfOpen || this._writableState.ended || r.nextTick(h, this)
    }

    function h(t) {
        t.end()
    }
    Object.defineProperty(f.prototype, "writableHighWaterMark", {
        enumerable: !1,
        get: function() {
            return this._writableState.highWaterMark
        }
    }), Object.defineProperty(f.prototype, "destroyed", {
        get: function() {
            return void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed && this._writableState.destroyed)
        },
        set: function(t) {
            void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = t, this._writableState.destroyed = t)
        }
    }), f.prototype._destroy = function(t, e) {
        this.push(null), this.end(), r.nextTick(e, t)
    }
}, , , , , , , , , , , , , function(t, e) {
    t.exports = function(t) {
        return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", {
            enumerable: !0,
            get: function() {
                return t.l
            }
        }), Object.defineProperty(t, "id", {
            enumerable: !0,
            get: function() {
                return t.i
            }
        }), t.webpackPolyfill = 1), t
    }
}, , function(t, e, i) {
    (function(e) {
        var r = i(329),
            n = i(218);
        t.exports = function(t) {
            return new a(t)
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

        function a(t) {
            this.curveType = o[t], this.curveType || (this.curveType = {
                name: t
            }), this.curve = new r.ec(this.curveType.name), this.keys = void 0
        }

        function s(t, i, r) {
            Array.isArray(t) || (t = t.toArray());
            var n = new e(t);
            if (r && n.length < r) {
                var o = new e(r - n.length);
                o.fill(0), n = e.concat([o, n])
            }
            return i ? n.toString(i) : n
        }
        o.p224 = o.secp224r1, o.p256 = o.secp256r1 = o.prime256v1, o.p192 = o.secp192r1 = o.prime192v1, o.p384 = o.secp384r1, o.p521 = o.secp521r1, a.prototype.generateKeys = function(t, e) {
            return this.keys = this.curve.genKeyPair(), this.getPublicKey(t, e)
        }, a.prototype.computeSecret = function(t, i, r) {
            return i = i || "utf8", e.isBuffer(t) || (t = new e(t, i)), s(this.curve.keyFromPublic(t).getPublic().mul(this.keys.getPrivate()).getX(), r, this.curveType.byteLength)
        }, a.prototype.getPublicKey = function(t, e) {
            var i = this.keys.getPublic("compressed" === e, !0);
            return "hybrid" === e && (i[i.length - 1] % 2 ? i[0] = 7 : i[0] = 6), s(i, t)
        }, a.prototype.getPrivateKey = function(t) {
            return s(this.keys.getPrivate(), t)
        }, a.prototype.setPublicKey = function(t, i) {
            return i = i || "utf8", e.isBuffer(t) || (t = new e(t, i)), this.keys._importPublic(t), this
        }, a.prototype.setPrivateKey = function(t, i) {
            i = i || "utf8", e.isBuffer(t) || (t = new e(t, i));
            var r = new n(t);
            return r = r.toString(16), this.keys = this.curve.genKeyPair(), this.keys._importPrivate(r), this
        }
    }).call(this, i(315).Buffer)
}, function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "connectListenQueue", function() {
        return u
    });
    var r = 25e3,
        n = null,
        o = null,
        a = null;

    function s(t) {
        window.Notifier && n !== t.key && (a && clearTimeout(a), n = t.key, Notifier.addKey({
            key: t.key,
            ts: t.timestamp
        }, function(e, i) {
            return function(t, e) {
                if (t === n)
                    if (e.failed) u(!0);
                    else
                        for (var i = getAudioPlayer(), r = i.isPlaying(), a = i.getCurrentAudio(), s = AudioUtils.isPodcast(a), d = 0; d < e.events.length; d++) {
                            var c = e.events[d].data;
                            if ("start" === c.type && i.getDeviceId() !== c.uuid && !o && !s && r) {
                                i.pause(), o = showBox("al_audio.php", {
                                    act: "start_playback_box",
                                    uuid: c.uuid,
                                    device_name: c.device_name
                                }, {
                                    params: {
                                        hideButtons: !0,
                                        onHide: function() {
                                            o = !1
                                        }
                                    },
                                    containerClass: "audio_playback_box"
                                });
                                break
                            }
                        }
            }(t.key, i)
        }), a = setTimeout(function() {
            return u(!0)
        }, r))
    }

    function u(t) {
        var e = getAudioPlayer().getCurrentAudio(),
            i = window.Notifier && e && !vk.widget,
            r = !t && n,
            o = AudioUtils.isPodcast(e);
        !i || o || r || e && (e = AudioUtils.asObject(e), ajax.post("al_audio.php", {
            act: "queue_params",
            audio_id: e.id,
            owner_id: e.owner_id,
            hash: e.actionHash
        }, {
            onDone: function(t) {
                if (t && t.errors && !t.errors.length) {
                    var e = t.data.queues[0];
                    e && s(e)
                }
            }
        }))
    }
}, function(t, e, i) {
    var r = i(581),
        n = i(564),
        o = i(307).Buffer,
        a = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
        s = new Array(64);

    function u() {
        this.init(), this._w = s, n.call(this, 64, 56)
    }

    function d(t, e, i) {
        return i ^ t & (e ^ i)
    }

    function c(t, e, i) {
        return t & e | i & (t | e)
    }

    function f(t) {
        return (t >>> 2 | t << 30) ^ (t >>> 13 | t << 19) ^ (t >>> 22 | t << 10)
    }

    function l(t) {
        return (t >>> 6 | t << 26) ^ (t >>> 11 | t << 21) ^ (t >>> 25 | t << 7)
    }

    function h(t) {
        return (t >>> 7 | t << 25) ^ (t >>> 18 | t << 14) ^ t >>> 3
    }
    r(u, n), u.prototype.init = function() {
        return this._a = 1779033703, this._b = 3144134277, this._c = 1013904242, this._d = 2773480762, this._e = 1359893119, this._f = 2600822924, this._g = 528734635, this._h = 1541459225, this
    }, u.prototype._update = function(t) {
        for (var e, i = this._w, r = 0 | this._a, n = 0 | this._b, o = 0 | this._c, s = 0 | this._d, u = 0 | this._e, p = 0 | this._f, _ = 0 | this._g, y = 0 | this._h, b = 0; b < 16; ++b) i[b] = t.readInt32BE(4 * b);
        for (; b < 64; ++b) i[b] = 0 | (((e = i[b - 2]) >>> 17 | e << 15) ^ (e >>> 19 | e << 13) ^ e >>> 10) + i[b - 7] + h(i[b - 15]) + i[b - 16];
        for (var g = 0; g < 64; ++g) {
            var v = y + l(u) + d(u, p, _) + a[g] + i[g] | 0,
                m = f(r) + c(r, n, o) | 0;
            y = _, _ = p, p = u, u = s + v | 0, s = o, o = n, n = r, r = v + m | 0
        }
        this._a = r + this._a | 0, this._b = n + this._b | 0, this._c = o + this._c | 0, this._d = s + this._d | 0, this._e = u + this._e | 0, this._f = p + this._f | 0, this._g = _ + this._g | 0, this._h = y + this._h | 0
    }, u.prototype._hash = function() {
        var t = o.allocUnsafe(32);
        return t.writeInt32BE(this._a, 0), t.writeInt32BE(this._b, 4), t.writeInt32BE(this._c, 8), t.writeInt32BE(this._d, 12), t.writeInt32BE(this._e, 16), t.writeInt32BE(this._f, 20), t.writeInt32BE(this._g, 24), t.writeInt32BE(this._h, 28), t
    }, t.exports = u
}, , function(t, e, i) {
    "use strict";
    var r = i(214),
        n = i(581),
        o = i(717),
        a = o.Cipher,
        s = o.DES;

    function u(t) {
        a.call(this, t);
        var e = new function(t, e) {
            r.equal(e.length, 24, "Invalid key length");
            var i = e.slice(0, 8),
                n = e.slice(8, 16),
                o = e.slice(16, 24);
            this.ciphers = "encrypt" === t ? [s.create({
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
        this._edeState = e
    }
    n(u, a), t.exports = u, u.create = function(t) {
        return new u(t)
    }, u.prototype._update = function(t, e, i, r) {
        var n = this._edeState;
        n.ciphers[0]._update(t, e, i, r), n.ciphers[1]._update(i, r, i, r), n.ciphers[2]._update(i, r, i, r)
    }, u.prototype._pad = s.prototype._pad, u.prototype._unpad = s.prototype._unpad
}, function(t, e, i) {
    (function(e) {
        var r = i(31),
            n = i(61),
            o = i(130),
            a = i(428),
            s = i(755);

        function u(t) {
            var i;
            "object" != typeof t || e.isBuffer(t) || (i = t.passphrase, t = t.key), "string" == typeof t && (t = new e(t));
            var u, d, c = o(t, i),
                f = c.tag,
                l = c.data;
            switch (f) {
                case "CERTIFICATE":
                    d = r.certificate.decode(l, "der").tbsCertificate.subjectPublicKeyInfo;
                case "PUBLIC KEY":
                    switch (d || (d = r.PublicKey.decode(l, "der")), u = d.algorithm.algorithm.join(".")) {
                        case "1.2.840.113549.1.1.1":
                            return r.RSAPublicKey.decode(d.subjectPublicKey.data, "der");
                        case "1.2.840.10045.2.1":
                            return d.subjectPrivateKey = d.subjectPublicKey, {
                                type: "ec",
                                data: d
                            };
                        case "1.2.840.10040.4.1":
                            return d.algorithm.params.pub_key = r.DSAparam.decode(d.subjectPublicKey.data, "der"), {
                                type: "dsa",
                                data: d.algorithm.params
                            };
                        default:
                            throw new Error("unknown key id " + u)
                    }
                    throw new Error("unknown key type " + f);
                case "ENCRYPTED PRIVATE KEY":
                    l = function(t, i) {
                        var r = t.algorithm.decrypt.kde.kdeparams.salt,
                            o = parseInt(t.algorithm.decrypt.kde.kdeparams.iters.toString(), 10),
                            u = n[t.algorithm.decrypt.cipher.algo.join(".")],
                            d = t.algorithm.decrypt.cipher.iv,
                            c = t.subjectPrivateKey,
                            f = parseInt(u.split("-")[1], 10) / 8,
                            l = s.pbkdf2Sync(i, r, o, f),
                            h = a.createDecipheriv(u, l, d),
                            p = [];
                        return p.push(h.update(c)), p.push(h.final()), e.concat(p)
                    }(l = r.EncryptedPrivateKey.decode(l, "der"), i);
                case "PRIVATE KEY":
                    switch (u = (d = r.PrivateKey.decode(l, "der")).algorithm.algorithm.join(".")) {
                        case "1.2.840.113549.1.1.1":
                            return r.RSAPrivateKey.decode(d.subjectPrivateKey, "der");
                        case "1.2.840.10045.2.1":
                            return {
                                curve: d.algorithm.curve,
                                privateKey: r.ECPrivateKey.decode(d.subjectPrivateKey, "der").privateKey
                            };
                        case "1.2.840.10040.4.1":
                            return d.algorithm.params.priv_key = r.DSAparam.decode(d.subjectPrivateKey, "der"), {
                                type: "dsa",
                                params: d.algorithm.params
                            };
                        default:
                            throw new Error("unknown key id " + u)
                    }
                    throw new Error("unknown key type " + f);
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
                    throw new Error("unknown key type " + f)
            }
        }
        t.exports = u, u.signature = r.signature
    }).call(this, i(315).Buffer)
}, function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "initDebugTools", function() {
        return n
    }), i.d(e, "logEvalError", function() {
        return o
    }), i.d(e, "debugLog", function() {
        return a
    }), i.d(e, "debugEl", function() {
        return s
    });
    var r = i(92);

    function n() {
        window._logTimer = (new Date).getTime()
    }

    function o(t, e) {
        window.Raven && (e && e.length > 350 && (e = e.slice(0, 150) + "..." + e.slice(-150)), t.message += ": " + e, Raven.captureException(t))
    }

    function a(t) {
        try {
            window.debuglogClient && debuglogClient(t);
            var e = "[" + ((new Date).getTime() - window._logTimer) / 1e3 + "] ";
            if (window.console && console.log) {
                var i = Array.prototype.slice.call(arguments);
                i.unshift(e), r.browser.msie || r.browser.mobile ? console.log(i.join(" ")) : console.log.apply(console, i)
            }
        } catch (t) {}
    }

    function s(t) {
        if (!t) return !1;
        var e = t.tagName,
            i = t.id,
            r = t.className,
            n = (e || "").toLowerCase();
        return r && (n += "." + t.className.replace(/\s+/g, ".")), i && !/^__vk/.test(i) && (n += "#" + t.id), n || (t.toString() || "[NULL]")
    }
}, , , , , , , , , , , , function(t, e, i) {
    var r = i(315),
        n = r.Buffer;

    function o(t, e) {
        for (var i in t) e[i] = t[i]
    }

    function a(t, e, i) {
        return n(t, e, i)
    }
    n.from && n.alloc && n.allocUnsafe && n.allocUnsafeSlow ? t.exports = r : (o(r, e), e.Buffer = a), o(n, a), a.from = function(t, e, i) {
        if ("number" == typeof t) throw new TypeError("Argument must not be a number");
        return n(t, e, i)
    }, a.alloc = function(t, e, i) {
        if ("number" != typeof t) throw new TypeError("Argument must be a number");
        var r = n(t);
        return void 0 !== e ? "string" == typeof i ? r.fill(e, i) : r.fill(e) : r.fill(0), r
    }, a.allocUnsafe = function(t) {
        if ("number" != typeof t) throw new TypeError("Argument must be a number");
        return n(t)
    }, a.allocUnsafeSlow = function(t) {
        if ("number" != typeof t) throw new TypeError("Argument must be a number");
        return r.SlowBuffer(t)
    }
}, function(t, e, i) {
    "use strict";
    var r = i(218),
        n = i(329).utils,
        o = n.assert;

    function a(t, e) {
        if (t instanceof a) return t;
        this._importDER(t, e) || (o(t.r && t.s, "Signature without r or s"), this.r = new r(t.r, 16), this.s = new r(t.s, 16), void 0 === t.recoveryParam ? this.recoveryParam = null : this.recoveryParam = t.recoveryParam)
    }

    function s(t, e) {
        var i = t[e.place++];
        if (!(128 & i)) return i;
        for (var r = 15 & i, n = 0, o = 0, a = e.place; o < r; o++, a++) n <<= 8, n |= t[a];
        return e.place = a, n
    }

    function u(t) {
        for (var e = 0, i = t.length - 1; !t[e] && !(128 & t[e + 1]) && e < i;) e++;
        return 0 === e ? t : t.slice(e)
    }

    function d(t, e) {
        if (e < 128) t.push(e);
        else {
            var i = 1 + (Math.log(e) / Math.LN2 >>> 3);
            for (t.push(128 | i); --i;) t.push(e >>> (i << 3) & 255);
            t.push(e)
        }
    }
    t.exports = a, a.prototype._importDER = function(t, e) {
        t = n.toArray(t, e);
        var i = new function() {
            this.place = 0
        };
        if (48 !== t[i.place++]) return !1;
        if (s(t, i) + i.place !== t.length) return !1;
        if (2 !== t[i.place++]) return !1;
        var o = s(t, i),
            a = t.slice(i.place, o + i.place);
        if (i.place += o, 2 !== t[i.place++]) return !1;
        var u = s(t, i);
        if (t.length !== u + i.place) return !1;
        var d = t.slice(i.place, u + i.place);
        return 0 === a[0] && 128 & a[1] && (a = a.slice(1)), 0 === d[0] && 128 & d[1] && (d = d.slice(1)), this.r = new r(a), this.s = new r(d), this.recoveryParam = null, !0
    }, a.prototype.toDER = function(t) {
        var e = this.r.toArray(),
            i = this.s.toArray();
        for (128 & e[0] && (e = [0].concat(e)), 128 & i[0] && (i = [0].concat(i)), e = u(e), i = u(i); !(i[0] || 128 & i[1]);) i = i.slice(1);
        var r = [2];
        d(r, e.length), (r = r.concat(e)).push(2), d(r, i.length);
        var o = r.concat(i),
            a = [48];
        return d(a, o.length), a = a.concat(o), n.encode(a, t)
    }
}, , , , function(t, e, i) {
    var r = e;
    r.der = i(502), r.pem = i(251)
}, , function(t, e, i) {
    "use strict";
    var r = i(567),
        n = i(218),
        o = i(581),
        a = r.base,
        s = i(329).utils;

    function u(t) {
        a.call(this, "mont", t), this.a = new n(t.a, 16).toRed(this.red), this.b = new n(t.b, 16).toRed(this.red), this.i4 = new n(4).toRed(this.red).redInvm(), this.two = new n(2).toRed(this.red), this.a24 = this.i4.redMul(this.a.redAdd(this.two))
    }

    function d(t, e, i) {
        a.BasePoint.call(this, t, "projective"), null === e && null === i ? (this.x = this.curve.one, this.z = this.curve.zero) : (this.x = new n(e, 16), this.z = new n(i, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)))
    }
    o(u, a), t.exports = u, u.prototype.validate = function(t) {
        var e = t.normalize().x,
            i = e.redSqr(),
            r = i.redMul(e).redAdd(i.redMul(this.a)).redAdd(e);
        return 0 === r.redSqrt().redSqr().cmp(r)
    }, o(d, a.BasePoint), u.prototype.decodePoint = function(t, e) {
        return this.point(s.toArray(t, e), 1)
    }, u.prototype.point = function(t, e) {
        return new d(this, t, e)
    }, u.prototype.pointFromJSON = function(t) {
        return d.fromJSON(this, t)
    }, d.prototype.precompute = function() {}, d.prototype._encode = function() {
        return this.getX().toArray("be", this.curve.p.byteLength())
    }, d.fromJSON = function(t, e) {
        return new d(t, e[0], e[1] || t.one)
    }, d.prototype.inspect = function() {
        return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
    }, d.prototype.isInfinity = function() {
        return 0 === this.z.cmpn(0)
    }, d.prototype.dbl = function() {
        var t = this.x.redAdd(this.z).redSqr(),
            e = this.x.redSub(this.z).redSqr(),
            i = t.redSub(e),
            r = t.redMul(e),
            n = i.redMul(e.redAdd(this.curve.a24.redMul(i)));
        return this.curve.point(r, n)
    }, d.prototype.add = function() {
        throw new Error("Not supported on Montgomery curve")
    }, d.prototype.diffAdd = function(t, e) {
        var i = this.x.redAdd(this.z),
            r = this.x.redSub(this.z),
            n = t.x.redAdd(t.z),
            o = t.x.redSub(t.z).redMul(i),
            a = n.redMul(r),
            s = e.z.redMul(o.redAdd(a).redSqr()),
            u = e.x.redMul(o.redISub(a).redSqr());
        return this.curve.point(s, u)
    }, d.prototype.mul = function(t) {
        for (var e = t.clone(), i = this, r = this.curve.point(null, null), n = []; 0 !== e.cmpn(0); e.iushrn(1)) n.push(e.andln(1));
        for (var o = n.length - 1; o >= 0; o--) 0 === n[o] ? (i = i.diffAdd(r, this), r = r.dbl()) : (r = i.diffAdd(r, this), i = i.dbl());
        return r
    }, d.prototype.mulAdd = function() {
        throw new Error("Not supported on Montgomery curve")
    }, d.prototype.jumlAdd = function() {
        throw new Error("Not supported on Montgomery curve")
    }, d.prototype.eq = function(t) {
        return 0 === this.getX().cmp(t.getX())
    }, d.prototype.normalize = function() {
        return this.x = this.x.redMul(this.z.redInvm()), this.z = this.curve.one, this
    }, d.prototype.getX = function() {
        return this.normalize(), this.x.fromRed()
    }
}, function(t, e, i) {
    "use strict";
    (function(t) {
        var r = i(48),
            n = i(85),
            o = i(379);

        function a() {
            return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
        }

        function s(t, e) {
            if (a() < e) throw new RangeError("Invalid typed array length");
            return u.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = u.prototype : (null === t && (t = new u(e)), t.length = e), t
        }

        function u(t, e, i) {
            if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u)) return new u(t, e, i);
            if ("number" == typeof t) {
                if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
                return f(this, t)
            }
            return d(this, t, e, i)
        }

        function d(t, e, i, r) {
            if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
            return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function(t, e, i, r) {
                if (e.byteLength, i < 0 || e.byteLength < i) throw new RangeError("'offset' is out of bounds");
                if (e.byteLength < i + (r || 0)) throw new RangeError("'length' is out of bounds");
                e = void 0 === i && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, i) : new Uint8Array(e, i, r);
                u.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = u.prototype : t = l(t, e);
                return t
            }(t, e, i, r) : "string" == typeof e ? function(t, e, i) {
                "string" == typeof i && "" !== i || (i = "utf8");
                if (!u.isEncoding(i)) throw new TypeError('"encoding" must be a valid string encoding');
                var r = 0 | p(e, i),
                    n = (t = s(t, r)).write(e, i);
                n !== r && (t = t.slice(0, n));
                return t
            }(t, e, i) : function(t, e) {
                if (u.isBuffer(e)) {
                    var i = 0 | h(e.length);
                    return 0 === (t = s(t, i)).length ? t : (e.copy(t, 0, 0, i), t)
                }
                if (e) {
                    if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (r = e.length) != r ? s(t, 0) : l(t, e);
                    if ("Buffer" === e.type && o(e.data)) return l(t, e.data)
                }
                var r;
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
            }(t, e)
        }

        function c(t) {
            if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
            if (t < 0) throw new RangeError('"size" argument must not be negative')
        }

        function f(t, e) {
            if (c(e), t = s(t, e < 0 ? 0 : 0 | h(e)), !u.TYPED_ARRAY_SUPPORT)
                for (var i = 0; i < e; ++i) t[i] = 0;
            return t
        }

        function l(t, e) {
            var i = e.length < 0 ? 0 : 0 | h(e.length);
            t = s(t, i);
            for (var r = 0; r < i; r += 1) t[r] = 255 & e[r];
            return t
        }

        function h(t) {
            if (t >= a()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a().toString(16) + " bytes");
            return 0 | t
        }

        function p(t, e) {
            if (u.isBuffer(t)) return t.length;
            if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
            "string" != typeof t && (t = "" + t);
            var i = t.length;
            if (0 === i) return 0;
            for (var r = !1;;) switch (e) {
                case "ascii":
                case "latin1":
                case "binary":
                    return i;
                case "utf8":
                case "utf-8":
                case void 0:
                    return F(t).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * i;
                case "hex":
                    return i >>> 1;
                case "base64":
                    return H(t).length;
                default:
                    if (r) return F(t).length;
                    e = ("" + e).toLowerCase(), r = !0
            }
        }

        function _(t, e, i) {
            var r = t[e];
            t[e] = t[i], t[i] = r
        }

        function y(t, e, i, r, n) {
            if (0 === t.length) return -1;
            if ("string" == typeof i ? (r = i, i = 0) : i > 2147483647 ? i = 2147483647 : i < -2147483648 && (i = -2147483648), i = +i, isNaN(i) && (i = n ? 0 : t.length - 1), i < 0 && (i = t.length + i), i >= t.length) {
                if (n) return -1;
                i = t.length - 1
            } else if (i < 0) {
                if (!n) return -1;
                i = 0
            }
            if ("string" == typeof e && (e = u.from(e, r)), u.isBuffer(e)) return 0 === e.length ? -1 : b(t, e, i, r, n);
            if ("number" == typeof e) return e &= 255, u.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? n ? Uint8Array.prototype.indexOf.call(t, e, i) : Uint8Array.prototype.lastIndexOf.call(t, e, i) : b(t, [e], i, r, n);
            throw new TypeError("val must be string, number or Buffer")
        }

        function b(t, e, i, r, n) {
            var o, a = 1,
                s = t.length,
                u = e.length;
            if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                if (t.length < 2 || e.length < 2) return -1;
                a = 2, s /= 2, u /= 2, i /= 2
            }

            function d(t, e) {
                return 1 === a ? t[e] : t.readUInt16BE(e * a)
            }
            if (n) {
                var c = -1;
                for (o = i; o < s; o++)
                    if (d(t, o) === d(e, -1 === c ? 0 : o - c)) {
                        if (-1 === c && (c = o), o - c + 1 === u) return c * a
                    } else -1 !== c && (o -= o - c), c = -1
            } else
                for (i + u > s && (i = s - u), o = i; o >= 0; o--) {
                    for (var f = !0, l = 0; l < u; l++)
                        if (d(t, o + l) !== d(e, l)) {
                            f = !1;
                            break
                        }
                    if (f) return o
                }
            return -1
        }

        function g(t, e, i, r) {
            i = Number(i) || 0;
            var n = t.length - i;
            r ? (r = Number(r)) > n && (r = n) : r = n;
            var o = e.length;
            if (o % 2 != 0) throw new TypeError("Invalid hex string");
            r > o / 2 && (r = o / 2);
            for (var a = 0; a < r; ++a) {
                var s = parseInt(e.substr(2 * a, 2), 16);
                if (isNaN(s)) return a;
                t[i + a] = s
            }
            return a
        }

        function v(t, e, i, r) {
            return q(F(e, t.length - i), t, i, r)
        }

        function m(t, e, i, r) {
            return q(function(t) {
                for (var e = [], i = 0; i < t.length; ++i) e.push(255 & t.charCodeAt(i));
                return e
            }(e), t, i, r)
        }

        function A(t, e, i, r) {
            return m(t, e, i, r)
        }

        function w(t, e, i, r) {
            return q(H(e), t, i, r)
        }

        function E(t, e, i, r) {
            return q(function(t, e) {
                for (var i, r, n, o = [], a = 0; a < t.length && !((e -= 2) < 0); ++a) i = t.charCodeAt(a), r = i >> 8, n = i % 256, o.push(n), o.push(r);
                return o
            }(e, t.length - i), t, i, r)
        }

        function P(t, e, i) {
            return 0 === e && i === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, i))
        }

        function S(t, e, i) {
            i = Math.min(t.length, i);
            for (var r = [], n = e; n < i;) {
                var o, a, s, u, d = t[n],
                    c = null,
                    f = d > 239 ? 4 : d > 223 ? 3 : d > 191 ? 2 : 1;
                if (n + f <= i) switch (f) {
                    case 1:
                        d < 128 && (c = d);
                        break;
                    case 2:
                        128 == (192 & (o = t[n + 1])) && (u = (31 & d) << 6 | 63 & o) > 127 && (c = u);
                        break;
                    case 3:
                        o = t[n + 1], a = t[n + 2], 128 == (192 & o) && 128 == (192 & a) && (u = (15 & d) << 12 | (63 & o) << 6 | 63 & a) > 2047 && (u < 55296 || u > 57343) && (c = u);
                        break;
                    case 4:
                        o = t[n + 1], a = t[n + 2], s = t[n + 3], 128 == (192 & o) && 128 == (192 & a) && 128 == (192 & s) && (u = (15 & d) << 18 | (63 & o) << 12 | (63 & a) << 6 | 63 & s) > 65535 && u < 1114112 && (c = u)
                }
                null === c ? (c = 65533, f = 1) : c > 65535 && (c -= 65536, r.push(c >>> 10 & 1023 | 55296), c = 56320 | 1023 & c), r.push(c), n += f
            }
            return function(t) {
                var e = t.length;
                if (e <= I) return String.fromCharCode.apply(String, t);
                var i = "",
                    r = 0;
                for (; r < e;) i += String.fromCharCode.apply(String, t.slice(r, r += I));
                return i
            }(r)
        }
        e.Buffer = u, e.SlowBuffer = function(t) {
            +t != t && (t = 0);
            return u.alloc(+t)
        }, e.INSPECT_MAX_BYTES = 50, u.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
            try {
                var t = new Uint8Array(1);
                return t.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function() {
                        return 42
                    }
                }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
            } catch (t) {
                return !1
            }
        }(), e.kMaxLength = a(), u.poolSize = 8192, u._augment = function(t) {
            return t.__proto__ = u.prototype, t
        }, u.from = function(t, e, i) {
            return d(null, t, e, i)
        }, u.TYPED_ARRAY_SUPPORT && (u.prototype.__proto__ = Uint8Array.prototype, u.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && u[Symbol.species] === u && Object.defineProperty(u, Symbol.species, {
            value: null,
            configurable: !0
        })), u.alloc = function(t, e, i) {
            return function(t, e, i, r) {
                return c(e), e <= 0 ? s(t, e) : void 0 !== i ? "string" == typeof r ? s(t, e).fill(i, r) : s(t, e).fill(i) : s(t, e)
            }(null, t, e, i)
        }, u.allocUnsafe = function(t) {
            return f(null, t)
        }, u.allocUnsafeSlow = function(t) {
            return f(null, t)
        }, u.isBuffer = function(t) {
            return !(null == t || !t._isBuffer)
        }, u.compare = function(t, e) {
            if (!u.isBuffer(t) || !u.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
            if (t === e) return 0;
            for (var i = t.length, r = e.length, n = 0, o = Math.min(i, r); n < o; ++n)
                if (t[n] !== e[n]) {
                    i = t[n], r = e[n];
                    break
                }
            return i < r ? -1 : r < i ? 1 : 0
        }, u.isEncoding = function(t) {
            switch (String(t).toLowerCase()) {
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
        }, u.concat = function(t, e) {
            if (!o(t)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === t.length) return u.alloc(0);
            var i;
            if (void 0 === e)
                for (e = 0, i = 0; i < t.length; ++i) e += t[i].length;
            var r = u.allocUnsafe(e),
                n = 0;
            for (i = 0; i < t.length; ++i) {
                var a = t[i];
                if (!u.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
                a.copy(r, n), n += a.length
            }
            return r
        }, u.byteLength = p, u.prototype._isBuffer = !0, u.prototype.swap16 = function() {
            var t = this.length;
            if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var e = 0; e < t; e += 2) _(this, e, e + 1);
            return this
        }, u.prototype.swap32 = function() {
            var t = this.length;
            if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var e = 0; e < t; e += 4) _(this, e, e + 3), _(this, e + 1, e + 2);
            return this
        }, u.prototype.swap64 = function() {
            var t = this.length;
            if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var e = 0; e < t; e += 8) _(this, e, e + 7), _(this, e + 1, e + 6), _(this, e + 2, e + 5), _(this, e + 3, e + 4);
            return this
        }, u.prototype.toString = function() {
            var t = 0 | this.length;
            return 0 === t ? "" : 0 === arguments.length ? S(this, 0, t) : function(t, e, i) {
                var r = !1;
                if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                if ((void 0 === i || i > this.length) && (i = this.length), i <= 0) return "";
                if ((i >>>= 0) <= (e >>>= 0)) return "";
                for (t || (t = "utf8");;) switch (t) {
                    case "hex":
                        return C(this, e, i);
                    case "utf8":
                    case "utf-8":
                        return S(this, e, i);
                    case "ascii":
                        return T(this, e, i);
                    case "latin1":
                    case "binary":
                        return M(this, e, i);
                    case "base64":
                        return P(this, e, i);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return k(this, e, i);
                    default:
                        if (r) throw new TypeError("Unknown encoding: " + t);
                        t = (t + "").toLowerCase(), r = !0
                }
            }.apply(this, arguments)
        }, u.prototype.equals = function(t) {
            if (!u.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
            return this === t || 0 === u.compare(this, t)
        }, u.prototype.inspect = function() {
            var t = "",
                i = e.INSPECT_MAX_BYTES;
            return this.length > 0 && (t = this.toString("hex", 0, i).match(/.{2}/g).join(" "), this.length > i && (t += " ... ")), "<Buffer " + t + ">"
        }, u.prototype.compare = function(t, e, i, r, n) {
            if (!u.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
            if (void 0 === e && (e = 0), void 0 === i && (i = t ? t.length : 0), void 0 === r && (r = 0), void 0 === n && (n = this.length), e < 0 || i > t.length || r < 0 || n > this.length) throw new RangeError("out of range index");
            if (r >= n && e >= i) return 0;
            if (r >= n) return -1;
            if (e >= i) return 1;
            if (e >>>= 0, i >>>= 0, r >>>= 0, n >>>= 0, this === t) return 0;
            for (var o = n - r, a = i - e, s = Math.min(o, a), d = this.slice(r, n), c = t.slice(e, i), f = 0; f < s; ++f)
                if (d[f] !== c[f]) {
                    o = d[f], a = c[f];
                    break
                }
            return o < a ? -1 : a < o ? 1 : 0
        }, u.prototype.includes = function(t, e, i) {
            return -1 !== this.indexOf(t, e, i)
        }, u.prototype.indexOf = function(t, e, i) {
            return y(this, t, e, i, !0)
        }, u.prototype.lastIndexOf = function(t, e, i) {
            return y(this, t, e, i, !1)
        }, u.prototype.write = function(t, e, i, r) {
            if (void 0 === e) r = "utf8", i = this.length, e = 0;
            else if (void 0 === i && "string" == typeof e) r = e, i = this.length, e = 0;
            else {
                if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                e |= 0, isFinite(i) ? (i |= 0, void 0 === r && (r = "utf8")) : (r = i, i = void 0)
            }
            var n = this.length - e;
            if ((void 0 === i || i > n) && (i = n), t.length > 0 && (i < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
            r || (r = "utf8");
            for (var o = !1;;) switch (r) {
                case "hex":
                    return g(this, t, e, i);
                case "utf8":
                case "utf-8":
                    return v(this, t, e, i);
                case "ascii":
                    return m(this, t, e, i);
                case "latin1":
                case "binary":
                    return A(this, t, e, i);
                case "base64":
                    return w(this, t, e, i);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return E(this, t, e, i);
                default:
                    if (o) throw new TypeError("Unknown encoding: " + r);
                    r = ("" + r).toLowerCase(), o = !0
            }
        }, u.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        };
        var I = 4096;

        function T(t, e, i) {
            var r = "";
            i = Math.min(t.length, i);
            for (var n = e; n < i; ++n) r += String.fromCharCode(127 & t[n]);
            return r
        }

        function M(t, e, i) {
            var r = "";
            i = Math.min(t.length, i);
            for (var n = e; n < i; ++n) r += String.fromCharCode(t[n]);
            return r
        }

        function C(t, e, i) {
            var r = t.length;
            (!e || e < 0) && (e = 0), (!i || i < 0 || i > r) && (i = r);
            for (var n = "", o = e; o < i; ++o) n += j(t[o]);
            return n
        }

        function k(t, e, i) {
            for (var r = t.slice(e, i), n = "", o = 0; o < r.length; o += 2) n += String.fromCharCode(r[o] + 256 * r[o + 1]);
            return n
        }

        function D(t, e, i) {
            if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
            if (t + e > i) throw new RangeError("Trying to access beyond buffer length")
        }

        function O(t, e, i, r, n, o) {
            if (!u.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (e > n || e < o) throw new RangeError('"value" argument is out of bounds');
            if (i + r > t.length) throw new RangeError("Index out of range")
        }

        function U(t, e, i, r) {
            e < 0 && (e = 65535 + e + 1);
            for (var n = 0, o = Math.min(t.length - i, 2); n < o; ++n) t[i + n] = (e & 255 << 8 * (r ? n : 1 - n)) >>> 8 * (r ? n : 1 - n)
        }

        function L(t, e, i, r) {
            e < 0 && (e = 4294967295 + e + 1);
            for (var n = 0, o = Math.min(t.length - i, 4); n < o; ++n) t[i + n] = e >>> 8 * (r ? n : 3 - n) & 255
        }

        function x(t, e, i, r, n, o) {
            if (i + r > t.length) throw new RangeError("Index out of range");
            if (i < 0) throw new RangeError("Index out of range")
        }

        function R(t, e, i, r, o) {
            return o || x(t, 0, i, 4), n.write(t, e, i, r, 23, 4), i + 4
        }

        function N(t, e, i, r, o) {
            return o || x(t, 0, i, 8), n.write(t, e, i, r, 52, 8), i + 8
        }
        u.prototype.slice = function(t, e) {
            var i, r = this.length;
            if (t = ~~t, e = void 0 === e ? r : ~~e, t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t), u.TYPED_ARRAY_SUPPORT)(i = this.subarray(t, e)).__proto__ = u.prototype;
            else {
                var n = e - t;
                i = new u(n, void 0);
                for (var o = 0; o < n; ++o) i[o] = this[o + t]
            }
            return i
        }, u.prototype.readUIntLE = function(t, e, i) {
            t |= 0, e |= 0, i || D(t, e, this.length);
            for (var r = this[t], n = 1, o = 0; ++o < e && (n *= 256);) r += this[t + o] * n;
            return r
        }, u.prototype.readUIntBE = function(t, e, i) {
            t |= 0, e |= 0, i || D(t, e, this.length);
            for (var r = this[t + --e], n = 1; e > 0 && (n *= 256);) r += this[t + --e] * n;
            return r
        }, u.prototype.readUInt8 = function(t, e) {
            return e || D(t, 1, this.length), this[t]
        }, u.prototype.readUInt16LE = function(t, e) {
            return e || D(t, 2, this.length), this[t] | this[t + 1] << 8
        }, u.prototype.readUInt16BE = function(t, e) {
            return e || D(t, 2, this.length), this[t] << 8 | this[t + 1]
        }, u.prototype.readUInt32LE = function(t, e) {
            return e || D(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
        }, u.prototype.readUInt32BE = function(t, e) {
            return e || D(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
        }, u.prototype.readIntLE = function(t, e, i) {
            t |= 0, e |= 0, i || D(t, e, this.length);
            for (var r = this[t], n = 1, o = 0; ++o < e && (n *= 256);) r += this[t + o] * n;
            return r >= (n *= 128) && (r -= Math.pow(2, 8 * e)), r
        }, u.prototype.readIntBE = function(t, e, i) {
            t |= 0, e |= 0, i || D(t, e, this.length);
            for (var r = e, n = 1, o = this[t + --r]; r > 0 && (n *= 256);) o += this[t + --r] * n;
            return o >= (n *= 128) && (o -= Math.pow(2, 8 * e)), o
        }, u.prototype.readInt8 = function(t, e) {
            return e || D(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
        }, u.prototype.readInt16LE = function(t, e) {
            e || D(t, 2, this.length);
            var i = this[t] | this[t + 1] << 8;
            return 32768 & i ? 4294901760 | i : i
        }, u.prototype.readInt16BE = function(t, e) {
            e || D(t, 2, this.length);
            var i = this[t + 1] | this[t] << 8;
            return 32768 & i ? 4294901760 | i : i
        }, u.prototype.readInt32LE = function(t, e) {
            return e || D(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
        }, u.prototype.readInt32BE = function(t, e) {
            return e || D(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
        }, u.prototype.readFloatLE = function(t, e) {
            return e || D(t, 4, this.length), n.read(this, t, !0, 23, 4)
        }, u.prototype.readFloatBE = function(t, e) {
            return e || D(t, 4, this.length), n.read(this, t, !1, 23, 4)
        }, u.prototype.readDoubleLE = function(t, e) {
            return e || D(t, 8, this.length), n.read(this, t, !0, 52, 8)
        }, u.prototype.readDoubleBE = function(t, e) {
            return e || D(t, 8, this.length), n.read(this, t, !1, 52, 8)
        }, u.prototype.writeUIntLE = function(t, e, i, r) {
            (t = +t, e |= 0, i |= 0, r) || O(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
            var n = 1,
                o = 0;
            for (this[e] = 255 & t; ++o < i && (n *= 256);) this[e + o] = t / n & 255;
            return e + i
        }, u.prototype.writeUIntBE = function(t, e, i, r) {
            (t = +t, e |= 0, i |= 0, r) || O(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
            var n = i - 1,
                o = 1;
            for (this[e + n] = 255 & t; --n >= 0 && (o *= 256);) this[e + n] = t / o & 255;
            return e + i
        }, u.prototype.writeUInt8 = function(t, e, i) {
            return t = +t, e |= 0, i || O(this, t, e, 1, 255, 0), u.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1
        }, u.prototype.writeUInt16LE = function(t, e, i) {
            return t = +t, e |= 0, i || O(this, t, e, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : U(this, t, e, !0), e + 2
        }, u.prototype.writeUInt16BE = function(t, e, i) {
            return t = +t, e |= 0, i || O(this, t, e, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : U(this, t, e, !1), e + 2
        }, u.prototype.writeUInt32LE = function(t, e, i) {
            return t = +t, e |= 0, i || O(this, t, e, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : L(this, t, e, !0), e + 4
        }, u.prototype.writeUInt32BE = function(t, e, i) {
            return t = +t, e |= 0, i || O(this, t, e, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : L(this, t, e, !1), e + 4
        }, u.prototype.writeIntLE = function(t, e, i, r) {
            if (t = +t, e |= 0, !r) {
                var n = Math.pow(2, 8 * i - 1);
                O(this, t, e, i, n - 1, -n)
            }
            var o = 0,
                a = 1,
                s = 0;
            for (this[e] = 255 & t; ++o < i && (a *= 256);) t < 0 && 0 === s && 0 !== this[e + o - 1] && (s = 1), this[e + o] = (t / a >> 0) - s & 255;
            return e + i
        }, u.prototype.writeIntBE = function(t, e, i, r) {
            if (t = +t, e |= 0, !r) {
                var n = Math.pow(2, 8 * i - 1);
                O(this, t, e, i, n - 1, -n)
            }
            var o = i - 1,
                a = 1,
                s = 0;
            for (this[e + o] = 255 & t; --o >= 0 && (a *= 256);) t < 0 && 0 === s && 0 !== this[e + o + 1] && (s = 1), this[e + o] = (t / a >> 0) - s & 255;
            return e + i
        }, u.prototype.writeInt8 = function(t, e, i) {
            return t = +t, e |= 0, i || O(this, t, e, 1, 127, -128), u.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
        }, u.prototype.writeInt16LE = function(t, e, i) {
            return t = +t, e |= 0, i || O(this, t, e, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : U(this, t, e, !0), e + 2
        }, u.prototype.writeInt16BE = function(t, e, i) {
            return t = +t, e |= 0, i || O(this, t, e, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : U(this, t, e, !1), e + 2
        }, u.prototype.writeInt32LE = function(t, e, i) {
            return t = +t, e |= 0, i || O(this, t, e, 4, 2147483647, -2147483648), u.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : L(this, t, e, !0), e + 4
        }, u.prototype.writeInt32BE = function(t, e, i) {
            return t = +t, e |= 0, i || O(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), u.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : L(this, t, e, !1), e + 4
        }, u.prototype.writeFloatLE = function(t, e, i) {
            return R(this, t, e, !0, i)
        }, u.prototype.writeFloatBE = function(t, e, i) {
            return R(this, t, e, !1, i)
        }, u.prototype.writeDoubleLE = function(t, e, i) {
            return N(this, t, e, !0, i)
        }, u.prototype.writeDoubleBE = function(t, e, i) {
            return N(this, t, e, !1, i)
        }, u.prototype.copy = function(t, e, i, r) {
            if (i || (i = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < i && (r = i), r === i) return 0;
            if (0 === t.length || 0 === this.length) return 0;
            if (e < 0) throw new RangeError("targetStart out of bounds");
            if (i < 0 || i >= this.length) throw new RangeError("sourceStart out of bounds");
            if (r < 0) throw new RangeError("sourceEnd out of bounds");
            r > this.length && (r = this.length), t.length - e < r - i && (r = t.length - e + i);
            var n, o = r - i;
            if (this === t && i < e && e < r)
                for (n = o - 1; n >= 0; --n) t[n + e] = this[n + i];
            else if (o < 1e3 || !u.TYPED_ARRAY_SUPPORT)
                for (n = 0; n < o; ++n) t[n + e] = this[n + i];
            else Uint8Array.prototype.set.call(t, this.subarray(i, i + o), e);
            return o
        }, u.prototype.fill = function(t, e, i, r) {
            if ("string" == typeof t) {
                if ("string" == typeof e ? (r = e, e = 0, i = this.length) : "string" == typeof i && (r = i, i = this.length), 1 === t.length) {
                    var n = t.charCodeAt(0);
                    n < 256 && (t = n)
                }
                if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                if ("string" == typeof r && !u.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
            } else "number" == typeof t && (t &= 255);
            if (e < 0 || this.length < e || this.length < i) throw new RangeError("Out of range index");
            if (i <= e) return this;
            var o;
            if (e >>>= 0, i = void 0 === i ? this.length : i >>> 0, t || (t = 0), "number" == typeof t)
                for (o = e; o < i; ++o) this[o] = t;
            else {
                var a = u.isBuffer(t) ? t : F(new u(t, r).toString()),
                    s = a.length;
                for (o = 0; o < i - e; ++o) this[o + e] = a[o % s]
            }
            return this
        };
        var B = /[^+\/0-9A-Za-z-_]/g;

        function j(t) {
            return t < 16 ? "0" + t.toString(16) : t.toString(16)
        }

        function F(t, e) {
            var i;
            e = e || 1 / 0;
            for (var r = t.length, n = null, o = [], a = 0; a < r; ++a) {
                if ((i = t.charCodeAt(a)) > 55295 && i < 57344) {
                    if (!n) {
                        if (i > 56319) {
                            (e -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        if (a + 1 === r) {
                            (e -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        n = i;
                        continue
                    }
                    if (i < 56320) {
                        (e -= 3) > -1 && o.push(239, 191, 189), n = i;
                        continue
                    }
                    i = 65536 + (n - 55296 << 10 | i - 56320)
                } else n && (e -= 3) > -1 && o.push(239, 191, 189);
                if (n = null, i < 128) {
                    if ((e -= 1) < 0) break;
                    o.push(i)
                } else if (i < 2048) {
                    if ((e -= 2) < 0) break;
                    o.push(i >> 6 | 192, 63 & i | 128)
                } else if (i < 65536) {
                    if ((e -= 3) < 0) break;
                    o.push(i >> 12 | 224, i >> 6 & 63 | 128, 63 & i | 128)
                } else {
                    if (!(i < 1114112)) throw new Error("Invalid code point");
                    if ((e -= 4) < 0) break;
                    o.push(i >> 18 | 240, i >> 12 & 63 | 128, i >> 6 & 63 | 128, 63 & i | 128)
                }
            }
            return o
        }

        function H(t) {
            return r.toByteArray(function(t) {
                if ((t = function(t) {
                        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
                    }(t).replace(B, "")).length < 2) return "";
                for (; t.length % 4 != 0;) t += "=";
                return t
            }(t))
        }

        function q(t, e, i, r) {
            for (var n = 0; n < r && !(n + i >= e.length || n >= t.length); ++n) e[n + i] = t[n];
            return n
        }
    }).call(this, i(186))
}, , , , , function(t, e, i) {
    var r = i(581),
        n = i(93),
        o = n.base,
        a = n.bignum,
        s = n.constants.der;

    function u(t) {
        this.enc = "der", this.name = t.name, this.entity = t, this.tree = new d, this.tree._init(t.body)
    }

    function d(t) {
        o.Node.call(this, "der", t)
    }

    function c(t, e) {
        var i = t.readUInt8(e);
        if (t.isError(i)) return i;
        var r = s.tagClass[i >> 6],
            n = 0 == (32 & i);
        if (31 == (31 & i)) {
            var o = i;
            for (i = 0; 128 == (128 & o);) {
                if (o = t.readUInt8(e), t.isError(o)) return o;
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

    function f(t, e, i) {
        var r = t.readUInt8(i);
        if (t.isError(r)) return r;
        if (!e && 128 === r) return null;
        if (0 == (128 & r)) return r;
        var n = 127 & r;
        if (n > 4) return t.error("length octect is too long");
        r = 0;
        for (var o = 0; o < n; o++) {
            r <<= 8;
            var a = t.readUInt8(i);
            if (t.isError(a)) return a;
            r |= a
        }
        return r
    }
    t.exports = u, u.prototype.decode = function(t, e) {
        return t instanceof o.DecoderBuffer || (t = new o.DecoderBuffer(t, e)), this.tree._decode(t, e)
    }, r(d, o.Node), d.prototype._peekTag = function(t, e, i) {
        if (t.isEmpty()) return !1;
        var r = t.save(),
            n = c(t, 'Failed to peek tag: "' + e + '"');
        return t.isError(n) ? n : (t.restore(r), n.tag === e || n.tagStr === e || n.tagStr + "of" === e || i)
    }, d.prototype._decodeTag = function(t, e, i) {
        var r = c(t, 'Failed to decode tag of "' + e + '"');
        if (t.isError(r)) return r;
        var n = f(t, r.primitive, 'Failed to get length of "' + e + '"');
        if (t.isError(n)) return n;
        if (!i && r.tag !== e && r.tagStr !== e && r.tagStr + "of" !== e) return t.error('Failed to match tag: "' + e + '"');
        if (r.primitive || null !== n) return t.skip(n, 'Failed to match body of: "' + e + '"');
        var o = t.save(),
            a = this._skipUntilEnd(t, 'Failed to skip indefinite length body: "' + this.tag + '"');
        return t.isError(a) ? a : (n = t.offset - o.offset, t.restore(o), t.skip(n, 'Failed to match body of: "' + e + '"'))
    }, d.prototype._skipUntilEnd = function(t, e) {
        for (;;) {
            var i = c(t, e);
            if (t.isError(i)) return i;
            var r, n = f(t, i.primitive, e);
            if (t.isError(n)) return n;
            if (r = i.primitive || null !== n ? t.skip(n) : this._skipUntilEnd(t, e), t.isError(r)) return r;
            if ("end" === i.tagStr) break
        }
    }, d.prototype._decodeList = function(t, e, i, r) {
        for (var n = []; !t.isEmpty();) {
            var o = this._peekTag(t, "end");
            if (t.isError(o)) return o;
            var a = i.decode(t, "der", r);
            if (t.isError(a) && o) break;
            n.push(a)
        }
        return n
    }, d.prototype._decodeStr = function(t, e) {
        if ("bitstr" === e) {
            var i = t.readUInt8();
            return t.isError(i) ? i : {
                unused: i,
                data: t.raw()
            }
        }
        if ("bmpstr" === e) {
            var r = t.raw();
            if (r.length % 2 == 1) return t.error("Decoding of string type: bmpstr length mismatch");
            for (var n = "", o = 0; o < r.length / 2; o++) n += String.fromCharCode(r.readUInt16BE(2 * o));
            return n
        }
        if ("numstr" === e) {
            var a = t.raw().toString("ascii");
            return this._isNumstr(a) ? a : t.error("Decoding of string type: numstr unsupported characters")
        }
        if ("octstr" === e) return t.raw();
        if ("objDesc" === e) return t.raw();
        if ("printstr" === e) {
            var s = t.raw().toString("ascii");
            return this._isPrintstr(s) ? s : t.error("Decoding of string type: printstr unsupported characters")
        }
        return /str$/.test(e) ? t.raw().toString() : t.error("Decoding of string type: " + e + " unsupported")
    }, d.prototype._decodeObjid = function(t, e, i) {
        for (var r, n = [], o = 0; !t.isEmpty();) {
            var a = t.readUInt8();
            o <<= 7, o |= 127 & a, 0 == (128 & a) && (n.push(o), o = 0)
        }
        128 & a && n.push(o);
        var s = n[0] / 40 | 0,
            u = n[0] % 40;
        if (r = i ? n : [s, u].concat(n.slice(1)), e) {
            var d = e[r.join(" ")];
            void 0 === d && (d = e[r.join(".")]), void 0 !== d && (r = d)
        }
        return r
    }, d.prototype._decodeTime = function(t, e) {
        var i = t.raw().toString();
        if ("gentime" === e) var r = 0 | i.slice(0, 4),
            n = 0 | i.slice(4, 6),
            o = 0 | i.slice(6, 8),
            a = 0 | i.slice(8, 10),
            s = 0 | i.slice(10, 12),
            u = 0 | i.slice(12, 14);
        else {
            if ("utctime" !== e) return t.error("Decoding " + e + " time is not supported yet");
            r = 0 | i.slice(0, 2), n = 0 | i.slice(2, 4), o = 0 | i.slice(4, 6), a = 0 | i.slice(6, 8), s = 0 | i.slice(8, 10), u = 0 | i.slice(10, 12);
            r = r < 70 ? 2e3 + r : 1900 + r
        }
        return Date.UTC(r, n - 1, o, a, s, u, 0)
    }, d.prototype._decodeNull = function(t) {
        return null
    }, d.prototype._decodeBool = function(t) {
        var e = t.readUInt8();
        return t.isError(e) ? e : 0 !== e
    }, d.prototype._decodeInt = function(t, e) {
        var i = t.raw(),
            r = new a(i);
        return e && (r = e[r.toString(10)] || r), r
    }, d.prototype._use = function(t, e) {
        return "function" == typeof t && (t = t(e)), t._getDecoder("der").tree
    }
}, , , function(t, e, i) {
    "use strict";
    var r = i(214);

    function n(t) {
        this.options = t, this.type = this.options.type, this.blockSize = 8, this._init(), this.buffer = new Array(this.blockSize), this.bufferOff = 0
    }
    t.exports = n, n.prototype._init = function() {}, n.prototype.update = function(t) {
        return 0 === t.length ? [] : "decrypt" === this.type ? this._updateDecrypt(t) : this._updateEncrypt(t)
    }, n.prototype._buffer = function(t, e) {
        for (var i = Math.min(this.buffer.length - this.bufferOff, t.length - e), r = 0; r < i; r++) this.buffer[this.bufferOff + r] = t[e + r];
        return this.bufferOff += i, i
    }, n.prototype._flushBuffer = function(t, e) {
        return this._update(this.buffer, 0, t, e), this.bufferOff = 0, this.blockSize
    }, n.prototype._updateEncrypt = function(t) {
        var e = 0,
            i = 0,
            r = (this.bufferOff + t.length) / this.blockSize | 0,
            n = new Array(r * this.blockSize);
        0 !== this.bufferOff && (e += this._buffer(t, e), this.bufferOff === this.buffer.length && (i += this._flushBuffer(n, i)));
        for (var o = t.length - (t.length - e) % this.blockSize; e < o; e += this.blockSize) this._update(t, e, n, i), i += this.blockSize;
        for (; e < t.length; e++, this.bufferOff++) this.buffer[this.bufferOff] = t[e];
        return n
    }, n.prototype._updateDecrypt = function(t) {
        for (var e = 0, i = 0, r = Math.ceil((this.bufferOff + t.length) / this.blockSize) - 1, n = new Array(r * this.blockSize); r > 0; r--) e += this._buffer(t, e), i += this._flushBuffer(n, i);
        return e += this._buffer(t, e), n
    }, n.prototype.final = function(t) {
        var e, i;
        return t && (e = this.update(t)), i = "encrypt" === this.type ? this._finalEncrypt() : this._finalDecrypt(), e ? e.concat(i) : i
    }, n.prototype._pad = function(t, e) {
        if (0 === e) return !1;
        for (; e < t.length;) t[e++] = 0;
        return !0
    }, n.prototype._finalEncrypt = function() {
        if (!this._pad(this.buffer, this.bufferOff)) return [];
        var t = new Array(this.blockSize);
        return this._update(this.buffer, 0, t, 0), t
    }, n.prototype._unpad = function(t) {
        return t
    }, n.prototype._finalDecrypt = function() {
        r.equal(this.bufferOff, this.blockSize, "Not enough data to decrypt");
        var t = new Array(this.blockSize);
        return this._flushBuffer(t, 0), this._unpad(t)
    }
}, , , , function(t, e, i) {
    "use strict";

    function r(t, e, i, r) {
        stManager.add(["audio.js", "audio.css", "auto_list.js"], function() {
            ajax.post("al_audio.php", {
                act: "playlists_edit_data",
                owner_id: t
            }, {
                onDone: function(n) {
                    n.audio_playlist_cover_upload_options && (cur.audioCoverUploadOptions = cur.audioCoverUploadOptions || {}, cur.audioCoverUploadOptions[t] = n.audio_playlist_cover_upload_options), AudioPage.editPlaylist(t, e, i, r)
                }
            })
        })
    }
    i.r(e), i.d(e, "editPlaylist", function() {
        return r
    })
}, function(t, e, i) {
    "use strict";

    function r() {
        var t = getAudioPlayer().showHQLabel();
        toggleClass(document.body, AudioUtils.AUDIO_HQ_LABEL_CLS, t)
    }
    i.r(e), i.d(e, "toggleAudioHQBodyClass", function() {
        return r
    })
}, function(t, e, i) {
    "use strict";
    var r = e;
    r.version = i(78).version, r.utils = i(0), r.rand = i(341), r.curve = i(567), r.curves = i(539), r.ec = i(730), r.eddsa = i(523)
}, function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "getAlbumParts", function() {
        return n
    });
    var r = i(24);

    function n(t) {
        if (t && t.getAudiosCount() && t.isFullyLoadable() && !t.hasMore()) {
            for (var e = t.getAudiosList(), i = t.getAudiosCount(), n = [], o = 0, a = 0; a < i; a++) {
                var s = e[a][r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_ALBUM_PART];
                s > o && (o = s, n.push({
                    number: s,
                    offset: a
                }))
            }
            if (n.length > 1) return n
        }
        return !1
    }
}, , , function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "onRowOver", function() {
        return onRowOver
    });
    var _slicedToArray = function() {
        return function(t, e) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return function(t, e) {
                var i = [],
                    r = !0,
                    n = !1,
                    o = void 0;
                try {
                    for (var a, s = t[Symbol.iterator](); !(r = (a = s.next()).done) && (i.push(a.value), !e || i.length !== e); r = !0);
                } catch (t) {
                    n = !0, o = t
                } finally {
                    try {
                        !r && s.return && s.return()
                    } finally {
                        if (n) throw o
                    }
                }
                return i
            }(t, e);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();

    function onRowOver(audioEl, event, forceRedraw) {
        var _this = this;
        hasClass(audioEl, "podcast_list_snippet") || hasClass(audioEl, "podcast_snippet__controls") || (data(audioEl, "leaved", !1), data(audioEl, "actions") && !forceRedraw || hasClass(audioEl, "no_extra") || (clearTimeout(window.audioRowHoverTO), window.audioRowHoverTO = setTimeout(function() {
            var audio = AudioUtils.getAudioFromEl(audioEl),
                audioObject = AudioUtils.getAudioFromEl(audioEl, !0),
                actions = [],
                moreActions = [],
                context = AudioUtils.getContextPlaylist(audioEl, !0),
                _AudioUtils$contextSp = AudioUtils.contextSplit(context),
                _AudioUtils$contextSp2 = _slicedToArray(_AudioUtils$contextSp, 1),
                contextSection = _AudioUtils$contextSp2[0],
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
                each(actionsList, function(t, e) {
                    switch (e) {
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
                            !audioObject.isClaimed && cur.audioPage && actions.push(["recoms", AudioUtils.showRecoms, "", 'onmouseover="audioShowActionTooltip(this)"']);
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
                            audioObject.canEdit && !vk.widget && (AudioUtils.isPodcast(audioObject) || inArray(contextSection, ["my", "group_list", "search_owned_audios"])) && actions.push(["edit", AudioUtils.isPodcast(audioObject) ? AudioUtils.editEpisode : AudioUtils.editAudio, "", 'onmouseover="audioShowActionTooltip(this)"']);
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
                            audioObject.isClaimed || cur.viewAsBox || moreActions.push(["add_to_playlist", "", getLang("audio_add_to_playlist")]);
                            break;
                        case "open_album":
                            audioObject.album && moreActions.push(["open_album", AudioUtils.showAudioAlbum, getLang("audio_open_album")]);
                            break;
                        case "open_episode":
                            AudioUtils.isPodcast(audioObject) && moreActions.push(["open_episode", AudioUtils.openEpisode, getLang("audio_podcast_open_episode")])
                    }
                }), extra.claim && nav.objLoc.claim && (audioObject.isSetClaimed ? actions.push(["claim_btn", AudioUtils.unclaim.bind(_this, audio, audioEl, extra.claim), "Unclaim"]) : actions.push(["claim_btn", AudioUtils.claim.bind(_this, audio, audioEl, extra.claim), "Claim"]))
            }
            if (moreActions.length && actions.push(["more"]), actions.length) {
                var actionsEl = se('<div class="_audio_row__actions audio_row__actions"></div>');
                each(actions, function(t, e) {
                    var i = AudioUtils.getRowActionName(e[0], audioObject, audioEl),
                        r = se('<button aria-label="' + i + '" data-action="' + e[0] + '" class="audio_row__action audio_row__action_' + e[0] + " _audio_row__action_" + e[0] + (e[4] || "") + '" ' + (e[3] || "") + ">" + (e[2] || "") + "</button>");
                    r.addEventListener("click", function(t) {
                        return e[1] && e[1].call(window, audioEl, audioObject, audio), cancelEvent(t)
                    }), actionsEl.appendChild(r)
                });
                var rowInfoEl = geByClass1("_audio_row__info", audioEl),
                    rowDurationEl = geByClass1("_audio_row__duration", audioEl),
                    rowAlreadyActionsEl = geByClass1("_audio_row__actions", audioEl);
                if (!rowInfoEl) return;
                re(rowAlreadyActionsEl), setStyle(rowDurationEl, "visibility", "hidden"), rowInfoEl.appendChild(actionsEl);
                var moreActionsBtnEl = geByClass1("_audio_row__action_more", actionsEl);
                if (moreActions.length && moreActionsBtnEl) {
                    var moreActionsContentEls = se('<div class="_audio_row__more_actions audio_row__more_actions"></div>'),
                        moreTooltip = new ElementTooltip(moreActionsBtnEl, extend({
                            cls: "_audio_row__tt",
                            defaultSide: "bottom",
                            rightShift: 20,
                            content: moreActionsContentEls,
                            bottomGap: 150,
                            preventSideChange: !0,
                            autoShow: !0,
                            onFirstTimeShow: function(t, e) {
                                domData(e, "nodrag", 1), setTimeout(function() {
                                    this.getOptions().bottomGap = 0
                                }.bind(this))
                            },
                            onHide: function() {
                                data(audioEl, "leaved") && AudioUtils.onRowLeave(audioEl)
                            }
                        }, {
                            appendToParent: !0
                        }));
                    each(moreActions, function(t, e) {
                        var i = se(rs(AudioUtils.AUDIO_ROW_ACTION_ROW_ITEM, e));
                        if ("add_to_playlist" == e[0]) {
                            var r = void 0,
                                n = void 0;
                            i.addEventListener("mouseenter", r = function() {
                                clearTimeout(n), n = setTimeout(function() {
                                    i.removeEventListener("mouseenter", r), AudioUtils.initRowPlaylistsChooser(audio, i, moreTooltip)
                                }, 150)
                            }), i.addEventListener("mouseleave", function() {
                                clearTimeout(n)
                            })
                        } else i.addEventListener("click", function(t) {
                            return e[1].call(window, audioEl, audioObject), cancelEvent(t)
                        });
                        moreActionsContentEls.appendChild(i)
                    }), data(audioEl, "tt", moreTooltip)
                }
                data(audioEl, "actions", 1)
            }
        }, forceRedraw ? 0 : 10)))
    }
}, , function(t, e, i) {
    "use strict";

    function r(t, e, i) {
        removeClass(e, "audio_moder_claimed"), AudioUtils.onRowOver(e, !1, !0), t = AudioUtils.asObject(t), ajax.post("al_claims.php", {
            act: "a_unclaim",
            claim_id: i,
            type: "audio",
            id: t.id,
            owner_id: t.ownerId,
            hash: t.actionHash
        })
    }
    i.r(e), i.d(e, "unclaim", function() {
        return r
    })
}, , , , , function(t, e, i) {
    "use strict";

    function r(t, e) {
        var i = "";
        return t.forEach(function(r, n) {
            var o = "/audio?performer=1&q=" + encodeURIComponent(r.name);
            r.id && (o = "/artist/" + r.id), i += e ? '<a class="artist_link" href="' + o + '">' + r.name + "</a>" : r.name, n < t.length - 1 && (i += ", ")
        }), i
    }
    i.r(e), i.d(e, "getAudioArtistsString", function() {
        return r
    })
}, function(t, e, i) {
    var r;

    function n(t) {
        this.rand = t
    }
    if (t.exports = function(t) {
            return r || (r = new n(null)), r.generate(t)
        }, t.exports.Rand = n, n.prototype.generate = function(t) {
            return this._rand(t)
        }, n.prototype._rand = function(t) {
            if (this.rand.getBytes) return this.rand.getBytes(t);
            for (var e = new Uint8Array(t), i = 0; i < e.length; i++) e[i] = this.rand.getByte();
            return e
        }, "object" == typeof self) self.crypto && self.crypto.getRandomValues ? n.prototype._rand = function(t) {
        var e = new Uint8Array(t);
        return self.crypto.getRandomValues(e), e
    } : self.msCrypto && self.msCrypto.getRandomValues ? n.prototype._rand = function(t) {
        var e = new Uint8Array(t);
        return self.msCrypto.getRandomValues(e), e
    } : "object" == typeof window && (n.prototype._rand = function() {
        throw new Error("Not implemented yet")
    });
    else try {
        var o = i(774);
        if ("function" != typeof o.randomBytes) throw new Error("Not supported");
        n.prototype._rand = function(t) {
            return o.randomBytes(t)
        }
    } catch (t) {}
}, function(t, e, i) {
    var r = i(503);
    t.exports = g, g.simpleSieve = y, g.fermatTest = b;
    var n = i(218),
        o = new n(24),
        a = new(i(401)),
        s = new n(1),
        u = new n(2),
        d = new n(5),
        c = (new n(16), new n(8), new n(10)),
        f = new n(3),
        l = (new n(7), new n(11)),
        h = new n(4),
        p = (new n(12), null);

    function _() {
        if (null !== p) return p;
        var t = [];
        t[0] = 2;
        for (var e = 1, i = 3; i < 1048576; i += 2) {
            for (var r = Math.ceil(Math.sqrt(i)), n = 0; n < e && t[n] <= r && i % t[n] != 0; n++);
            e !== n && t[n] <= r || (t[e++] = i)
        }
        return p = t, t
    }

    function y(t) {
        for (var e = _(), i = 0; i < e.length; i++)
            if (0 === t.modn(e[i])) return 0 === t.cmpn(e[i]);
        return !0
    }

    function b(t) {
        var e = n.mont(t);
        return 0 === u.toRed(e).redPow(t.subn(1)).fromRed().cmpn(1)
    }

    function g(t, e) {
        if (t < 16) return new n(2 === e || 5 === e ? [140, 123] : [140, 39]);
        var i, p;
        for (e = new n(e);;) {
            for (i = new n(r(Math.ceil(t / 8))); i.bitLength() > t;) i.ishrn(1);
            if (i.isEven() && i.iadd(s), i.testn(1) || i.iadd(u), e.cmp(u)) {
                if (!e.cmp(d))
                    for (; i.mod(c).cmp(f);) i.iadd(h)
            } else
                for (; i.mod(o).cmp(l);) i.iadd(h);
            if (y(p = i.shrn(1)) && y(i) && b(p) && b(i) && a.test(p) && a.test(i)) return i
        }
    }
}, function(t, e) {}, function(t, e, i) {
    var r = i(581),
        n = i(631).Reporter,
        o = i(315).Buffer;

    function a(t, e) {
        n.call(this, e), o.isBuffer(t) ? (this.base = t, this.offset = 0, this.length = t.length) : this.error("Input not Buffer")
    }

    function s(t, e) {
        if (Array.isArray(t)) this.length = 0, this.value = t.map(function(t) {
            return t instanceof s || (t = new s(t, e)), this.length += t.length, t
        }, this);
        else if ("number" == typeof t) {
            if (!(0 <= t && t <= 255)) return e.error("non-byte EncoderBuffer value");
            this.value = t, this.length = 1
        } else if ("string" == typeof t) this.value = t, this.length = o.byteLength(t);
        else {
            if (!o.isBuffer(t)) return e.error("Unsupported type: " + typeof t);
            this.value = t, this.length = t.length
        }
    }
    r(a, n), e.DecoderBuffer = a, a.prototype.save = function() {
        return {
            offset: this.offset,
            reporter: n.prototype.save.call(this)
        }
    }, a.prototype.restore = function(t) {
        var e = new a(this.base);
        return e.offset = t.offset, e.length = this.offset, this.offset = t.offset, n.prototype.restore.call(this, t.reporter), e
    }, a.prototype.isEmpty = function() {
        return this.offset === this.length
    }, a.prototype.readUInt8 = function(t) {
        return this.offset + 1 <= this.length ? this.base.readUInt8(this.offset++, !0) : this.error(t || "DecoderBuffer overrun")
    }, a.prototype.skip = function(t, e) {
        if (!(this.offset + t <= this.length)) return this.error(e || "DecoderBuffer overrun");
        var i = new a(this.base);
        return i._reporterState = this._reporterState, i.offset = this.offset, i.length = this.offset + t, this.offset += t, i
    }, a.prototype.raw = function(t) {
        return this.base.slice(t ? t.offset : this.offset, this.length)
    }, e.EncoderBuffer = s, s.prototype.join = function(t, e) {
        return t || (t = new o(this.length)), e || (e = 0), 0 === this.length ? t : (Array.isArray(this.value) ? this.value.forEach(function(i) {
            i.join(t, e), e += i.length
        }) : ("number" == typeof this.value ? t[e] = this.value : "string" == typeof this.value ? t.write(this.value, e) : o.isBuffer(this.value) && this.value.copy(t, e), e += this.length), t)
    }
}, function(t, e, i) {
    "use strict";
    e.sha1 = i(271), e.sha224 = i(8), e.sha256 = i(673), e.sha384 = i(198), e.sha512 = i(687)
}, , , function(t, e, i) {
    "use strict";

    function r(t, e) {
        AudioUtils.isPodcast(e) && (cur.podcastEditData = {
            audioId: e.fullId
        }, stManager.add([jsc("web/podcast.js")], function() {
            Podcast.edit(e.fullId)
        }))
    }
    i.r(e), i.d(e, "editEpisode", function() {
        return r
    })
}, , , function(t, e, i) {
    "use strict";
    var r = i(329).utils,
        n = r.assert,
        o = r.parseBytes,
        a = r.cachedProperty;

    function s(t, e) {
        this.eddsa = t, this._secret = o(e.secret), t.isPoint(e.pub) ? this._pub = e.pub : this._pubBytes = o(e.pub)
    }
    s.fromPublic = function(t, e) {
        return e instanceof s ? e : new s(t, {
            pub: e
        })
    }, s.fromSecret = function(t, e) {
        return e instanceof s ? e : new s(t, {
            secret: e
        })
    }, s.prototype.secret = function() {
        return this._secret
    }, a(s, "pubBytes", function() {
        return this.eddsa.encodePoint(this.pub())
    }), a(s, "pub", function() {
        return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv())
    }), a(s, "privBytes", function() {
        var t = this.eddsa,
            e = this.hash(),
            i = t.encodingLength - 1,
            r = e.slice(0, t.encodingLength);
        return r[0] &= 248, r[i] &= 127, r[i] |= 64, r
    }), a(s, "priv", function() {
        return this.eddsa.decodeInt(this.privBytes())
    }), a(s, "hash", function() {
        return this.eddsa.hash().update(this.secret()).digest()
    }), a(s, "messagePrefix", function() {
        return this.hash().slice(this.eddsa.encodingLength)
    }), s.prototype.sign = function(t) {
        return n(this._secret, "KeyPair can only verify"), this.eddsa.sign(t, this)
    }, s.prototype.verify = function(t, e) {
        return this.eddsa.verify(t, e, this)
    }, s.prototype.getSecret = function(t) {
        return n(this._secret, "KeyPair is public only"), r.encode(this.secret(), t)
    }, s.prototype.getPublic = function(t) {
        return r.encode(this.pubBytes(), t)
    }, t.exports = s
}, , function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    var _lib_debug_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(295);

    function _classCallCheck(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
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
        return AudioLayer.prepare = function(t) {
            stManager.add(["audio.js", "audioplayer.js", "audio.css", "suggester.js", "auto_list.js", "indexer.js"], function() {
                t && t()
            })
        }, AudioLayer.prototype.toggle = function(t, e) {
            var i = this;
            this._initTooltip();
            var r = this._els.tooltip,
                n = void 0 !== t ? t : !r.isShown();
            n ? (r.show(), cancelStackPush("top_audio", function() {
                i.toggle(!1, !0)
            }, !0)) : (e || cancelStackPop(), r.hide()), toggleClass(this._els.topNotaBtn, "active", n)
        }, AudioLayer.prototype.hide = function() {
            this._els.tooltip.hide()
        }, AudioLayer.prototype.isShown = function() {
            return this._els.tooltip && this._els.tooltip.isShown()
        }, AudioLayer.prototype.updatePosition = function() {
            return this._els.tooltip && this._els.tooltip.updatePosition()
        }, AudioLayer.prototype._layerPosition = function() {
            var t = getXY(this._els.layerPlace),
                e = getXY("ts_wrap")[0] - t[0] - 1,
                i = 0;
            isVisible(this._els.topNotaBtnGroup) ? i = -e + (getXY(this._els.topNotaBtn)[0] - t[0]) + 15 : i = -e + (getXY(this._els.topPlayBtn)[0] - t[0]) + 3;
            return {
                left: e,
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
                    } catch (t) {
                        Object(_lib_debug_tools__WEBPACK_IMPORTED_MODULE_0__.logEvalError)(t, templatesScript)
                    }
                    _this2._els.container.innerHTML = html, _this2._page = new AudioPage(geByClass1("_audio_page_layout", _this2._els.container), data), _this2._initSection = "recoms" == data.initSection ? data.initSection : void 0, _this2._page.onLayerShow(_this2._initSection)
                }
            }))
        }, AudioLayer
    }();
    __webpack_exports__.default = AudioLayer
}, , , , , , , function(t, e, i) {
    (function(e) {
        var r = i(218);
        t.exports = function(t, i) {
            return new e(t.toRed(r.mont(i.modulus)).redPow(new r(i.publicExponent)).fromRed().toArray())
        }
    }).call(this, i(315).Buffer)
}, , , , , function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "ACTION_PLAY", function() {
        return r
    }), i.d(e, "ACTION_PAUSE", function() {
        return n
    }), i.d(e, "ACTION_SEEK", function() {
        return o
    }), i.d(e, "ACTION_HEARTBEAT", function() {
        return a
    }), i.d(e, "ACTION_TIME_MARKER", function() {
        return s
    }), i.d(e, "log", function() {
        return u
    });
    var r = "play",
        n = "pause",
        o = "seek",
        a = "heartbeat",
        s = "time_marker";

    function u(t, e) {
        var i = e.audio;
        AudioUtils.isPodcast(i) && stManager.add([jsc("web/podcast.js")], function() {
            Podcast.log(t, e)
        })
    }
}, , function(t, e, i) {
    (function(e) {
        t.exports = function(t, i) {
            for (var r = Math.min(t.length, i.length), n = new e(r), o = 0; o < r; ++o) n[o] = t[o] ^ i[o];
            return n
        }
    }).call(this, i(315).Buffer)
}, , , function(t, e, i) {
    var r = i(414);
    t.exports = function(t) {
        return (new r).update(t).digest()
    }
}, , , function(t, e, i) {
    "use strict";

    function r(t) {
        return isObject(t) && (t = t.context), (t || "").split(":")
    }
    i.r(e), i.d(e, "contextSplit", function() {
        return r
    })
}, function(t, e, i) {
    "use strict";

    function r(t) {
        return !(!AudioUtils.isPodcast(t) || !AudioUtils.getAudioExtra(t).private)
    }
    i.r(e), i.d(e, "isPrivatePodcast", function() {
        return r
    })
}, , , , function(t, e, i) {
    var r = {
            ECB: i(154),
            CBC: i(491),
            CFB: i(662),
            CFB8: i(577),
            CFB1: i(772),
            OFB: i(382),
            CTR: i(666),
            GCM: i(666)
        },
        n = i(134);
    for (var o in n) n[o].module = r[n[o].mode];
    t.exports = n
}, function(t, e) {
    var i = {}.toString;
    t.exports = Array.isArray || function(t) {
        return "[object Array]" == i.call(t)
    }
}, , function(t, e, i) {
    (function(e) {
        var r = i(609),
            n = i(443),
            o = i(329).ec,
            a = i(218),
            s = i(294),
            u = i(4);

        function d(t, i, n, o) {
            if ((t = new e(t.toArray())).length < i.byteLength()) {
                var a = new e(i.byteLength() - t.length);
                a.fill(0), t = e.concat([a, t])
            }
            var s = n.length,
                u = function(t, i) {
                    t = (t = c(t, i)).mod(i);
                    var r = new e(t.toArray());
                    if (r.length < i.byteLength()) {
                        var n = new e(i.byteLength() - r.length);
                        n.fill(0), r = e.concat([n, r])
                    }
                    return r
                }(n, i),
                d = new e(s);
            d.fill(1);
            var f = new e(s);
            return f.fill(0), f = r(o, f).update(d).update(new e([0])).update(t).update(u).digest(), d = r(o, f).update(d).digest(), {
                k: f = r(o, f).update(d).update(new e([1])).update(t).update(u).digest(),
                v: d = r(o, f).update(d).digest()
            }
        }

        function c(t, e) {
            var i = new a(t),
                r = (t.length << 3) - e.bitLength();
            return r > 0 && i.ishrn(r), i
        }

        function f(t, i, n) {
            var o, a;
            do {
                for (o = new e(0); 8 * o.length < t.bitLength();) i.v = r(n, i.k).update(i.v).digest(), o = e.concat([o, i.v]);
                a = c(o, t), i.k = r(n, i.k).update(i.v).update(new e([0])).digest(), i.v = r(n, i.k).update(i.v).digest()
            } while (-1 !== a.cmp(t));
            return a
        }

        function l(t, e, i, r) {
            return t.toRed(a.mont(i)).redPow(e).fromRed().mod(r)
        }
        t.exports = function(t, i, r, h, p) {
            var _ = s(i);
            if (_.curve) {
                if ("ecdsa" !== h && "ecdsa/rsa" !== h) throw new Error("wrong private key type");
                return function(t, i) {
                    var r = u[i.curve.join(".")];
                    if (!r) throw new Error("unknown curve " + i.curve.join("."));
                    var n = new o(r).keyFromPrivate(i.privateKey).sign(t);
                    return new e(n.toDER())
                }(t, _)
            }
            if ("dsa" === _.type) {
                if ("dsa" !== h) throw new Error("wrong private key type");
                return function(t, i, r) {
                    for (var n, o = i.params.priv_key, s = i.params.p, u = i.params.q, h = i.params.g, p = new a(0), _ = c(t, u).mod(u), y = !1, b = d(o, u, t, r); !1 === y;) n = f(u, b, r), p = l(h, n, s, u), 0 === (y = n.invm(u).imul(_.add(o.mul(p))).mod(u)).cmpn(0) && (y = !1, p = new a(0));
                    return function(t, i) {
                        t = t.toArray(), i = i.toArray(), 128 & t[0] && (t = [0].concat(t)), 128 & i[0] && (i = [0].concat(i));
                        var r = [48, t.length + i.length + 4, 2, t.length];
                        return r = r.concat(t, [2, i.length], i), new e(r)
                    }(p, y)
                }(t, _, r)
            }
            if ("rsa" !== h && "ecdsa/rsa" !== h) throw new Error("wrong private key type");
            t = e.concat([p, t]);
            for (var y = _.modulus.byteLength(), b = [0, 1]; t.length + b.length + 1 < y;) b.push(255);
            b.push(0);
            for (var g = -1; ++g < t.length;) b.push(t[g]);
            return n(b, _)
        }, t.exports.getKey = d, t.exports.makeKey = f
    }).call(this, i(315).Buffer)
}, function(t, e, i) {
    (function(t) {
        var r = i(367);

        function n(t) {
            return t._prev = t._cipher.encryptBlock(t._prev), t._prev
        }
        e.encrypt = function(e, i) {
            for (; e._cache.length < i.length;) e._cache = t.concat([e._cache, n(e)]);
            var o = e._cache.slice(0, i.length);
            return e._cache = e._cache.slice(i.length), r(i, o)
        }
    }).call(this, i(315).Buffer)
}, , , , , , , function(t, e, i) {
    (e = t.exports = i(604)).Stream = e, e.Readable = e, e.Writable = i(554), e.Duplex = i(274), e.Transform = i(608), e.PassThrough = i(99)
}, function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "copyPlaylistLink", function() {
        return n
    });
    var r = i(232);

    function n(t, e, i) {
        var n = location.protocol + "//" + location.host + "/music?z=audio_playlist" + t + "_" + e;
        i && (n += "/" + i), statlogsValueEvent("audio_copy_link", vk.id), Object(r.copyToClipboard)(n);
        var o = new MessageBox;
        o.content(getLang("audio_playlist_link_copied")), o.addButton(getLang("box_close"), !1, "no"), o.show()
    }
}, , , , , function(t, e, i) {
    var r = i(581),
        n = i(291),
        o = i(564),
        a = i(307).Buffer,
        s = new Array(64);

    function u() {
        this.init(), this._w = s, o.call(this, 64, 56)
    }
    r(u, n), u.prototype.init = function() {
        return this._a = 3238371032, this._b = 914150663, this._c = 812702999, this._d = 4144912697, this._e = 4290775857, this._f = 1750603025, this._g = 1694076839, this._h = 3204075428, this
    }, u.prototype._hash = function() {
        var t = a.allocUnsafe(28);
        return t.writeInt32BE(this._a, 0), t.writeInt32BE(this._b, 4), t.writeInt32BE(this._c, 8), t.writeInt32BE(this._d, 12), t.writeInt32BE(this._e, 16), t.writeInt32BE(this._f, 20), t.writeInt32BE(this._g, 24), t
    }, t.exports = u
}, , , , , , function(t, e, i) {
    var r = i(218),
        n = i(341);

    function o(t) {
        this.rand = t || new n.Rand
    }
    t.exports = o, o.create = function(t) {
        return new o(t)
    }, o.prototype._randbelow = function(t) {
        var e = t.bitLength(),
            i = Math.ceil(e / 8);
        do {
            var n = new r(this.rand.generate(i))
        } while (n.cmp(t) >= 0);
        return n
    }, o.prototype._randrange = function(t, e) {
        var i = e.sub(t);
        return t.add(this._randbelow(i))
    }, o.prototype.test = function(t, e, i) {
        var n = t.bitLength(),
            o = r.mont(t),
            a = new r(1).toRed(o);
        e || (e = Math.max(1, n / 48 | 0));
        for (var s = t.subn(1), u = 0; !s.testn(u); u++);
        for (var d = t.shrn(u), c = s.toRed(o); e > 0; e--) {
            var f = this._randrange(new r(2), s);
            i && i(f);
            var l = f.toRed(o).redPow(d);
            if (0 !== l.cmp(a) && 0 !== l.cmp(c)) {
                for (var h = 1; h < u; h++) {
                    if (0 === (l = l.redSqr()).cmp(a)) return !1;
                    if (0 === l.cmp(c)) break
                }
                if (h === u) return !1
            }
        }
        return !0
    }, o.prototype.getDivisor = function(t, e) {
        var i = t.bitLength(),
            n = r.mont(t),
            o = new r(1).toRed(n);
        e || (e = Math.max(1, i / 48 | 0));
        for (var a = t.subn(1), s = 0; !a.testn(s); s++);
        for (var u = t.shrn(s), d = a.toRed(n); e > 0; e--) {
            var c = this._randrange(new r(2), a),
                f = t.gcd(c);
            if (0 !== f.cmpn(1)) return f;
            var l = c.toRed(n).redPow(u);
            if (0 !== l.cmp(o) && 0 !== l.cmp(d)) {
                for (var h = 1; h < s; h++) {
                    if (0 === (l = l.redSqr()).cmp(o)) return l.fromRed().subn(1).gcd(t);
                    if (0 === l.cmp(d)) break
                }
                if (h === s) return (l = l.redSqr()).fromRed().subn(1).gcd(t)
            }
        }
        return !1
    }
}, , , , , , , , function(t, e) {}, , function(t, e, i) {
    (function(t, e) {
        ! function(t, i) {
            "use strict";
            if (!t.setImmediate) {
                var r, n, o, a, s, u = 1,
                    d = {},
                    c = !1,
                    f = t.document,
                    l = Object.getPrototypeOf && Object.getPrototypeOf(t);
                l = l && l.setTimeout ? l : t, "[object process]" === {}.toString.call(t.process) ? r = function(t) {
                    e.nextTick(function() {
                        p(t)
                    })
                } : ! function() {
                    if (t.postMessage && !t.importScripts) {
                        var e = !0,
                            i = t.onmessage;
                        return t.onmessage = function() {
                            e = !1
                        }, t.postMessage("", "*"), t.onmessage = i, e
                    }
                }() ? t.MessageChannel ? ((o = new MessageChannel).port1.onmessage = function(t) {
                    p(t.data)
                }, r = function(t) {
                    o.port2.postMessage(t)
                }) : f && "onreadystatechange" in f.createElement("script") ? (n = f.documentElement, r = function(t) {
                    var e = f.createElement("script");
                    e.onreadystatechange = function() {
                        p(t), e.onreadystatechange = null, n.removeChild(e), e = null
                    }, n.appendChild(e)
                }) : r = function(t) {
                    setTimeout(p, 0, t)
                } : (a = "setImmediate$" + Math.random() + "$", s = function(e) {
                    e.source === t && "string" == typeof e.data && 0 === e.data.indexOf(a) && p(+e.data.slice(a.length))
                }, t.addEventListener ? t.addEventListener("message", s, !1) : t.attachEvent("onmessage", s), r = function(e) {
                    t.postMessage(a + e, "*")
                }), l.setImmediate = function(t) {
                    "function" != typeof t && (t = new Function("" + t));
                    for (var e = new Array(arguments.length - 1), i = 0; i < e.length; i++) e[i] = arguments[i + 1];
                    var n = {
                        callback: t,
                        args: e
                    };
                    return d[u] = n, r(u), u++
                }, l.clearImmediate = h
            }

            function h(t) {
                delete d[t]
            }

            function p(t) {
                if (c) setTimeout(p, 0, t);
                else {
                    var e = d[t];
                    if (e) {
                        c = !0;
                        try {
                            ! function(t) {
                                var e = t.callback,
                                    r = t.args;
                                switch (r.length) {
                                    case 0:
                                        e();
                                        break;
                                    case 1:
                                        e(r[0]);
                                        break;
                                    case 2:
                                        e(r[0], r[1]);
                                        break;
                                    case 3:
                                        e(r[0], r[1], r[2]);
                                        break;
                                    default:
                                        e.apply(i, r)
                                }
                            }(e)
                        } finally {
                            h(t), c = !1
                        }
                    }
                }
            }
        }("undefined" == typeof self ? void 0 === t ? this : t : self)
    }).call(this, i(186), i(210))
}, , , function(t, e, i) {
    "use strict";
    (function(e) {
        var r = i(581),
            n = i(556),
            o = new Array(16);

        function a() {
            n.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878
        }

        function s(t, e) {
            return t << e | t >>> 32 - e
        }

        function u(t, e, i, r, n, o, a) {
            return s(t + (e & i | ~e & r) + n + o | 0, a) + e | 0
        }

        function d(t, e, i, r, n, o, a) {
            return s(t + (e & r | i & ~r) + n + o | 0, a) + e | 0
        }

        function c(t, e, i, r, n, o, a) {
            return s(t + (e ^ i ^ r) + n + o | 0, a) + e | 0
        }

        function f(t, e, i, r, n, o, a) {
            return s(t + (i ^ (e | ~r)) + n + o | 0, a) + e | 0
        }
        r(a, n), a.prototype._update = function() {
            for (var t = o, e = 0; e < 16; ++e) t[e] = this._block.readInt32LE(4 * e);
            var i = this._a,
                r = this._b,
                n = this._c,
                a = this._d;
            r = f(r = f(r = f(r = f(r = c(r = c(r = c(r = c(r = d(r = d(r = d(r = d(r = u(r = u(r = u(r = u(r, n = u(n, a = u(a, i = u(i, r, n, a, t[0], 3614090360, 7), r, n, t[1], 3905402710, 12), i, r, t[2], 606105819, 17), a, i, t[3], 3250441966, 22), n = u(n, a = u(a, i = u(i, r, n, a, t[4], 4118548399, 7), r, n, t[5], 1200080426, 12), i, r, t[6], 2821735955, 17), a, i, t[7], 4249261313, 22), n = u(n, a = u(a, i = u(i, r, n, a, t[8], 1770035416, 7), r, n, t[9], 2336552879, 12), i, r, t[10], 4294925233, 17), a, i, t[11], 2304563134, 22), n = u(n, a = u(a, i = u(i, r, n, a, t[12], 1804603682, 7), r, n, t[13], 4254626195, 12), i, r, t[14], 2792965006, 17), a, i, t[15], 1236535329, 22), n = d(n, a = d(a, i = d(i, r, n, a, t[1], 4129170786, 5), r, n, t[6], 3225465664, 9), i, r, t[11], 643717713, 14), a, i, t[0], 3921069994, 20), n = d(n, a = d(a, i = d(i, r, n, a, t[5], 3593408605, 5), r, n, t[10], 38016083, 9), i, r, t[15], 3634488961, 14), a, i, t[4], 3889429448, 20), n = d(n, a = d(a, i = d(i, r, n, a, t[9], 568446438, 5), r, n, t[14], 3275163606, 9), i, r, t[3], 4107603335, 14), a, i, t[8], 1163531501, 20), n = d(n, a = d(a, i = d(i, r, n, a, t[13], 2850285829, 5), r, n, t[2], 4243563512, 9), i, r, t[7], 1735328473, 14), a, i, t[12], 2368359562, 20), n = c(n, a = c(a, i = c(i, r, n, a, t[5], 4294588738, 4), r, n, t[8], 2272392833, 11), i, r, t[11], 1839030562, 16), a, i, t[14], 4259657740, 23), n = c(n, a = c(a, i = c(i, r, n, a, t[1], 2763975236, 4), r, n, t[4], 1272893353, 11), i, r, t[7], 4139469664, 16), a, i, t[10], 3200236656, 23), n = c(n, a = c(a, i = c(i, r, n, a, t[13], 681279174, 4), r, n, t[0], 3936430074, 11), i, r, t[3], 3572445317, 16), a, i, t[6], 76029189, 23), n = c(n, a = c(a, i = c(i, r, n, a, t[9], 3654602809, 4), r, n, t[12], 3873151461, 11), i, r, t[15], 530742520, 16), a, i, t[2], 3299628645, 23), n = f(n, a = f(a, i = f(i, r, n, a, t[0], 4096336452, 6), r, n, t[7], 1126891415, 10), i, r, t[14], 2878612391, 15), a, i, t[5], 4237533241, 21), n = f(n, a = f(a, i = f(i, r, n, a, t[12], 1700485571, 6), r, n, t[3], 2399980690, 10), i, r, t[10], 4293915773, 15), a, i, t[1], 2240044497, 21), n = f(n, a = f(a, i = f(i, r, n, a, t[8], 1873313359, 6), r, n, t[15], 4264355552, 10), i, r, t[6], 2734768916, 15), a, i, t[13], 1309151649, 21), n = f(n, a = f(a, i = f(i, r, n, a, t[4], 4149444226, 6), r, n, t[11], 3174756917, 10), i, r, t[2], 718787259, 15), a, i, t[9], 3951481745, 21), this._a = this._a + i | 0, this._b = this._b + r | 0, this._c = this._c + n | 0, this._d = this._d + a | 0
        }, a.prototype._digest = function() {
            this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
            var t = new e(16);
            return t.writeInt32LE(this._a, 0), t.writeInt32LE(this._b, 4), t.writeInt32LE(this._c, 8), t.writeInt32LE(this._d, 12), t
        }, t.exports = a
    }).call(this, i(315).Buffer)
}, , function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "parseLatin", function() {
        return a
    }), i.d(e, "parseCyr", function() {
        return s
    }), i.d(e, "parseLatKeys", function() {
        return u
    }), i.d(e, "langNumeric", function() {
        return d
    }), i.d(e, "langSex", function() {
        return c
    }), i.d(e, "langStr", function() {
        return f
    }), i.d(e, "addLangKeys", function() {
        return l
    }), i.d(e, "getLang", function() {
        return h
    }), i.d(e, "langDate", function() {
        return p
    }), i.d(e, "getShortDate", function() {
        return _
    }), i.d(e, "getShortDateOrTime", function() {
        return y
    }), i.d(e, "langWordNumeric", function() {
        return b
    }), i.d(e, "getDateText", function() {
        return g
    }), i.d(e, "getBigDateNew", function() {
        return v
    }), i.d(e, "getSmDate", function() {
        return m
    });
    var r = i(496),
        n = i(125),
        o = i(295);

    function a(t) {
        for (var e = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], i = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], r = t, n = 0, o = e.length; n < o; n++) r = r.split(e[n]).join(i[n]);
        for (var a = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ", s = 0, u = a.length; s < u; s++) r = r.split(a.charAt(s)).join("абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ".charAt(s));
        return r === t ? null : r
    }

    function s(t) {
        for (var e = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], i = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], r = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ", n = t, o = 0; o < i.length; o++) n = n.split(i[o]).join(e[o]);
        for (var a = 0; a < r.length; a++) n = n.split(r.charAt(a)).join("abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ".charAt(a));
        return n === t ? null : n
    }

    function u(t) {
        for (var e = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`", i = t, r = 0; r < e.length; r++) i = i.split(e.charAt(r)).join("йцукенгшщзхъфывапролджэячсмитьбю.ё".charAt(r));
        return i == t ? null : i
    }

    function d(t, e, i) {
        if (!e || !window.langConfig) return t;
        var r = void 0;
        if (Object(n.isArray)(e) ? (r = e[1], t != Math.floor(t) ? r = e[langConfig.numRules.float] : Object(n.each)(langConfig.numRules.int, function(i, o) {
                if ("*" == o[0]) return r = e[o[2]], !1;
                var a = o[0] ? t % o[0] : t;
                return -1 != Object(n.indexOf)(o[1], a) ? (r = e[o[2]], !1) : void 0
            })) : r = e, i) {
            for (var o = t.toString().split("."), a = [], s = o[0].length - 3; s > -3; s -= 3) a.unshift(o[0].slice(s > 0 ? s : 0, s + 3));
            o[0] = a.join(langConfig.numDel), t = o.join(langConfig.numDec)
        }
        return r = (r || "%s").replace("%s", t)
    }

    function c(t, e) {
        if (!Object(n.isArray)(e)) return e;
        var i = e[1];
        return window.langConfig ? (Object(n.each)(langConfig.sexRules, function(r, n) {
            return "*" == n[0] ? (i = e[n[1]], !1) : t == n[0] && e[n[1]] ? (i = e[n[1]], !1) : void 0
        }), i) : i
    }

    function f(t) {
        for (var e = arguments, i = e.length, r = t + "", n = 1; n < i; n += 2) {
            var o = "%" === e[n][0] ? e[n] : "{" + e[n] + "}";
            r = r.replace(o, e[n + 1])
        }
        return r
    }

    function l(t, e) {
        var i = e ? window : window.cur;
        i.lang ? Object(n.extend)(i.lang, t) : i.lang = t
    }

    function h() {
        try {
            var t = Array.from(arguments),
                e = t.shift();
            if (!e) return "...";
            var i = window.cur.lang && window.cur.lang[e] || window.lang && window.lang[e] || window.langpack && window.langpack[e] || window[e];
            if (!i) {
                var r = e.split("_");
                return r.shift(), r.join(" ")
            }
            return Object(n.isFunction)(i) ? i.apply(null, t) : void 0 === t[0] && !Object(n.isArray)(i) || "raw" === t[0] ? i : d(t[0], i, t[1])
        } catch (t) {
            Object(o.debugLog)("lang error:" + t.message + "(" + Array.from(arguments).join(", ") + ")")
        }
    }

    function p(t, e, i, o, a, s) {
        var u = void 0;
        if (s || (s = ""), Object(n.isArray)(e) || (e = ["", e, e, e, e]), "number" == typeof t || "string" == typeof t ? (t > 2147483646e3 && (t = 0), t += i, u = new Date(t)) : u = t, a) e = e[1];
        else {
            var d = "";
            !(d = Object(r.isToday)(u) ? e[3] : Object(r.isYesterday)(u) ? e[2] : Object(r.isTomorrow)(u) ? e[4] : e[1]) && e[1] && (d = e[1]), e = d
        }
        var c = {
                hours: u.getHours(),
                minutes: u.getMinutes(),
                seconds: u.getSeconds(),
                day: u.getDate(),
                month: u.getMonth() + 1,
                year: u.getFullYear()
            },
            f = "";
        switch (3 === vk.lang && (f = u.getHours() > 11 ? "pm" : "am", c.hours = u.getHours() % 12 == 0 ? 12 : u.getHours() % 12), vk.lang) {
            case 1:
                switch (u.getHours()) {
                    case 11:
                        e = e.replace(" о ", " об ");
                        break;
                    case 0:
                        e = e.replace(" о ", " в ")
                }
                break;
            case 3:
                !Object(r.isToday)(u) || Object(r.isYesterday)(u) || Object(r.isTomorrow)(u) || (e = s + e);
                break;
            case 12:
            case 73:
                1 == u.getHours() && (e = e.replace(" &#224;s ", " &#224; "))
        }
        return 68 === vk.lang && (c.year = c.year + 543), e.replace("{hour}", c.hours).replace("{num_hour}", Object(r.leadingZero)(c.hours)).replace("{minute}", Object(r.leadingZero)(c.minutes)).replace("{day}", c.day).replace("{num_day}", Object(r.leadingZero)(c.day)).replace("{month}", o[c.month]).replace("{year}", c.year).replace("{short_year}", c.year % 100).replace("{second}", Object(r.leadingZero)(c.seconds)).replace("{am_pm}", f)
    }

    function _(t, e, i, r, n) {
        t *= 1e3, void 0 === i && (i = !0), void 0 === r && (r = h("months_of", "raw")), e *= 1e3;
        var o = Date.now(),
            a = new Date(o),
            s = new Date(t + e);
        return !n && t > o && t - o < 864e5 && a.getDate() === s.getDate() ? p(t, "{hour}:{minute} {am_pm}", e, [], !i) : s.getYear() !== a.getYear() || t < o - 157248e5 ? p(t, h("global_date", "raw"), e, r, !i) : p(t, h("global_short_date", "raw"), e, r, !i)
    }

    function y(t, e, i, n) {
        return Object(r.isToday)(new Date(1e3 * t + 1e3 * e)) ? p(1e3 * t, "{hour}:{minute} {am_pm}", 1e3 * e, [], !i) : _(t, e, i, n)
    }

    function b(t, e, i) {
        return Object(n.isArray)(e) && t < e.length ? e[t] : d(t, i)
    }

    function g(t, e) {
        t += e;
        var i = parseInt(Date.now() / 1e3) - t,
            r = "";
        if (i < 60) r = h("global_just_now");
        else if (i < 3600) {
            r = b(Object(n.intval)(i / 60), h("global_word_mins_ago", "raw"), h("global_mins_ago", "raw"))
        } else if (i < 14400) {
            r = b(Object(n.intval)(i / 3600), h("global_word_hours_ago", "raw"), h("global_hours_ago", "raw"))
        } else r = v(t, 0, !0, "_l");
        return r
    }

    function v(t, e, i, r) {
        void 0 === i && (i = !0), void 0 === e && (e = 0), void 0 === r && (r = ""), e *= 1e3;
        var n = new Date(1e3 * t),
            o = new Date;
        return n.getFullYear() !== o.getFullYear() && n.getTime() < o.getTime() - 1728e5 || Math.abs(n.getTime() - o.getTime()) > 157248e5 ? p(1e3 * t, h("global_date", "raw"), e, h("months_sm_of"), !i) : p(1e3 * t, h("global_short_date_time" + r, "raw"), e, h("months_sm_of"), !i)
    }

    function m(t, e, i) {
        void 0 === i && (i = !0), void 0 === e && (e = 0);
        var r = new Date,
            n = r.getFullYear(),
            o = r.getMonth(),
            a = new Date(1e3 * t),
            s = a.getFullYear(),
            u = a.getMonth();
        return p(1e3 * t, h(s < n && (o > 1 || u < 9 || n - s >= 2) ? "global_date" : "global_short_date_time", "raw"), e, h("months_sm_of", "raw"), !i)
    }
}, , , , function(t, e, i) {
    "use strict";

    function r() {
        var t = ge("audio_diag_log"),
            e = ls.get(AudioUtils.LOG_LS_KEY) || [];
        t && each(e, function(e, i) {
            var r = new Date(i.shift()).toUTCString();
            i = i.join(", "), t.appendChild(se('<div class="audio_diag_log_row"><span class="audio_diag_log_time">' + r + "</span>" + i + "</div>"))
        })
    }
    i.r(e), i.d(e, "renderAudioDiag", function() {
        return r
    })
}, function(t, e, i) {
    var r = e;
    r._reverse = function(t) {
        var e = {};
        return Object.keys(t).forEach(function(i) {
            (0 | i) == i && (i |= 0);
            var r = t[i];
            e[r] = i
        }), e
    }, r.der = i(680)
}, , function(t, e) {}, function(t, e, i) {
    "use strict";
    var r = i(581),
        n = i(307).Buffer,
        o = i(189),
        a = n.alloc(128),
        s = 64;

    function u(t, e) {
        o.call(this, "digest"), "string" == typeof e && (e = n.from(e)), this._alg = t, this._key = e, e.length > s ? e = t(e) : e.length < s && (e = n.concat([e, a], s));
        for (var i = this._ipad = n.allocUnsafe(s), r = this._opad = n.allocUnsafe(s), u = 0; u < s; u++) i[u] = 54 ^ e[u], r[u] = 92 ^ e[u];
        this._hash = [i]
    }
    r(u, o), u.prototype._update = function(t) {
        this._hash.push(t)
    }, u.prototype._final = function() {
        var t = this._alg(n.concat(this._hash));
        return this._alg(n.concat([this._opad, t]))
    }, t.exports = u
}, , , , function(t, e, i) {
    var r = i(555),
        n = i(42),
        o = i(134);
    e.createCipher = e.Cipher = r.createCipher, e.createCipheriv = e.Cipheriv = r.createCipheriv, e.createDecipher = e.Decipher = n.createDecipher, e.createDecipheriv = e.Decipheriv = n.createDecipheriv, e.listCiphers = e.getCiphers = function() {
        return Object.keys(o)
    }
}, , function(t, e, i) {
    "use strict";
    var r = i(436),
        n = i(214);

    function o() {
        this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32
    }
    e.BlockHash = o, o.prototype.update = function(t, e) {
        if (t = r.toArray(t, e), this.pending ? this.pending = this.pending.concat(t) : this.pending = t, this.pendingTotal += t.length, this.pending.length >= this._delta8) {
            var i = (t = this.pending).length % this._delta8;
            this.pending = t.slice(t.length - i, t.length), 0 === this.pending.length && (this.pending = null), t = r.join32(t, 0, t.length - i, this.endian);
            for (var n = 0; n < t.length; n += this._delta32) this._update(t, n, n + this._delta32)
        }
        return this
    }, o.prototype.digest = function(t) {
        return this.update(this._pad()), n(null === this.pending), this._digest(t)
    }, o.prototype._pad = function() {
        var t = this.pendingTotal,
            e = this._delta8,
            i = e - (t + this.padLength) % e,
            r = new Array(i + this.padLength);
        r[0] = 128;
        for (var n = 1; n < i; n++) r[n] = 0;
        if (t <<= 3, "big" === this.endian) {
            for (var o = 8; o < this.padLength; o++) r[n++] = 0;
            r[n++] = 0, r[n++] = 0, r[n++] = 0, r[n++] = 0, r[n++] = t >>> 24 & 255, r[n++] = t >>> 16 & 255, r[n++] = t >>> 8 & 255, r[n++] = 255 & t
        } else
            for (r[n++] = 255 & t, r[n++] = t >>> 8 & 255, r[n++] = t >>> 16 & 255, r[n++] = t >>> 24 & 255, r[n++] = 0, r[n++] = 0, r[n++] = 0, r[n++] = 0, o = 8; o < this.padLength; o++) r[n++] = 0;
        return r
    }
}, , function(t, e, i) {
    (function(e) {
        var r = i(294),
            n = i(503),
            o = i(11),
            a = i(203),
            s = i(173),
            u = i(218),
            d = i(360),
            c = i(443);
        t.exports = function(t, i, f) {
            var l;
            l = t.padding ? t.padding : f ? 1 : 4;
            var h, p = r(t);
            if (4 === l) h = function(t, i) {
                var r = t.modulus.byteLength(),
                    d = i.length,
                    c = o("sha1").update(new e("")).digest(),
                    f = c.length,
                    l = 2 * f;
                if (d > r - l - 2) throw new Error("message too long");
                var h = new e(r - d - l - 2);
                h.fill(0);
                var p = r - f - 1,
                    _ = n(f),
                    y = s(e.concat([c, h, new e([1]), i], p), a(_, p)),
                    b = s(_, a(y, f));
                return new u(e.concat([new e([0]), b, y], r))
            }(p, i);
            else if (1 === l) h = function(t, i, r) {
                var o, a = i.length,
                    s = t.modulus.byteLength();
                if (a > s - 11) throw new Error("message too long");
                r ? (o = new e(s - a - 3)).fill(255) : o = function(t, i) {
                    var r, o = new e(t),
                        a = 0,
                        s = n(2 * t),
                        u = 0;
                    for (; a < t;) u === s.length && (s = n(2 * t), u = 0), (r = s[u++]) && (o[a++] = r);
                    return o
                }(s - a - 3);
                return new u(e.concat([new e([0, r ? 1 : 2]), o, new e([0]), i], s))
            }(p, i, f);
            else {
                if (3 !== l) throw new Error("unknown padding");
                if ((h = new u(i)).cmp(p.modulus) >= 0) throw new Error("data too long for modulus")
            }
            return f ? c(h, p) : d(h, p)
        }
    }).call(this, i(315).Buffer)
}, , , , function(t, e, i) {
    "use strict";
    var r = i(214),
        n = i(581);

    function o(t) {
        return (t >>> 24 | t >>> 8 & 65280 | t << 8 & 16711680 | (255 & t) << 24) >>> 0
    }

    function a(t) {
        return 1 === t.length ? "0" + t : t
    }

    function s(t) {
        return 7 === t.length ? "0" + t : 6 === t.length ? "00" + t : 5 === t.length ? "000" + t : 4 === t.length ? "0000" + t : 3 === t.length ? "00000" + t : 2 === t.length ? "000000" + t : 1 === t.length ? "0000000" + t : t
    }
    e.inherits = n, e.toArray = function(t, e) {
        if (Array.isArray(t)) return t.slice();
        if (!t) return [];
        var i = [];
        if ("string" == typeof t)
            if (e) {
                if ("hex" === e)
                    for ((t = t.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (t = "0" + t), r = 0; r < t.length; r += 2) i.push(parseInt(t[r] + t[r + 1], 16))
            } else
                for (var r = 0; r < t.length; r++) {
                    var n = t.charCodeAt(r),
                        o = n >> 8,
                        a = 255 & n;
                    o ? i.push(o, a) : i.push(a)
                } else
                    for (r = 0; r < t.length; r++) i[r] = 0 | t[r];
        return i
    }, e.toHex = function(t) {
        for (var e = "", i = 0; i < t.length; i++) e += a(t[i].toString(16));
        return e
    }, e.htonl = o, e.toHex32 = function(t, e) {
        for (var i = "", r = 0; r < t.length; r++) {
            var n = t[r];
            "little" === e && (n = o(n)), i += s(n.toString(16))
        }
        return i
    }, e.zero2 = a, e.zero8 = s, e.join32 = function(t, e, i, n) {
        var o = i - e;
        r(o % 4 == 0);
        for (var a = new Array(o / 4), s = 0, u = e; s < a.length; s++, u += 4) {
            var d;
            d = "big" === n ? t[u] << 24 | t[u + 1] << 16 | t[u + 2] << 8 | t[u + 3] : t[u + 3] << 24 | t[u + 2] << 16 | t[u + 1] << 8 | t[u], a[s] = d >>> 0
        }
        return a
    }, e.split32 = function(t, e) {
        for (var i = new Array(4 * t.length), r = 0, n = 0; r < t.length; r++, n += 4) {
            var o = t[r];
            "big" === e ? (i[n] = o >>> 24, i[n + 1] = o >>> 16 & 255, i[n + 2] = o >>> 8 & 255, i[n + 3] = 255 & o) : (i[n + 3] = o >>> 24, i[n + 2] = o >>> 16 & 255, i[n + 1] = o >>> 8 & 255, i[n] = 255 & o)
        }
        return i
    }, e.rotr32 = function(t, e) {
        return t >>> e | t << 32 - e
    }, e.rotl32 = function(t, e) {
        return t << e | t >>> 32 - e
    }, e.sum32 = function(t, e) {
        return t + e >>> 0
    }, e.sum32_3 = function(t, e, i) {
        return t + e + i >>> 0
    }, e.sum32_4 = function(t, e, i, r) {
        return t + e + i + r >>> 0
    }, e.sum32_5 = function(t, e, i, r, n) {
        return t + e + i + r + n >>> 0
    }, e.sum64 = function(t, e, i, r) {
        var n = t[e],
            o = r + t[e + 1] >>> 0,
            a = (o < r ? 1 : 0) + i + n;
        t[e] = a >>> 0, t[e + 1] = o
    }, e.sum64_hi = function(t, e, i, r) {
        return (e + r >>> 0 < e ? 1 : 0) + t + i >>> 0
    }, e.sum64_lo = function(t, e, i, r) {
        return e + r >>> 0
    }, e.sum64_4_hi = function(t, e, i, r, n, o, a, s) {
        var u = 0,
            d = e;
        return u += (d = d + r >>> 0) < e ? 1 : 0, u += (d = d + o >>> 0) < o ? 1 : 0, t + i + n + a + (u += (d = d + s >>> 0) < s ? 1 : 0) >>> 0
    }, e.sum64_4_lo = function(t, e, i, r, n, o, a, s) {
        return e + r + o + s >>> 0
    }, e.sum64_5_hi = function(t, e, i, r, n, o, a, s, u, d) {
        var c = 0,
            f = e;
        return c += (f = f + r >>> 0) < e ? 1 : 0, c += (f = f + o >>> 0) < o ? 1 : 0, c += (f = f + s >>> 0) < s ? 1 : 0, t + i + n + a + u + (c += (f = f + d >>> 0) < d ? 1 : 0) >>> 0
    }, e.sum64_5_lo = function(t, e, i, r, n, o, a, s, u, d) {
        return e + r + o + s + d >>> 0
    }, e.rotr64_hi = function(t, e, i) {
        return (e << 32 - i | t >>> i) >>> 0
    }, e.rotr64_lo = function(t, e, i) {
        return (t << 32 - i | e >>> i) >>> 0
    }, e.shr64_hi = function(t, e, i) {
        return t >>> i
    }, e.shr64_lo = function(t, e, i) {
        return (t << 32 - i | e >>> i) >>> 0
    }
}, , , function(t, e, i) {
    var r = i(581),
        n = i(564),
        o = i(307).Buffer,
        a = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591],
        s = new Array(160);

    function u() {
        this.init(), this._w = s, n.call(this, 128, 112)
    }

    function d(t, e, i) {
        return i ^ t & (e ^ i)
    }

    function c(t, e, i) {
        return t & e | i & (t | e)
    }

    function f(t, e) {
        return (t >>> 28 | e << 4) ^ (e >>> 2 | t << 30) ^ (e >>> 7 | t << 25)
    }

    function l(t, e) {
        return (t >>> 14 | e << 18) ^ (t >>> 18 | e << 14) ^ (e >>> 9 | t << 23)
    }

    function h(t, e) {
        return (t >>> 1 | e << 31) ^ (t >>> 8 | e << 24) ^ t >>> 7
    }

    function p(t, e) {
        return (t >>> 1 | e << 31) ^ (t >>> 8 | e << 24) ^ (t >>> 7 | e << 25)
    }

    function _(t, e) {
        return (t >>> 19 | e << 13) ^ (e >>> 29 | t << 3) ^ t >>> 6
    }

    function y(t, e) {
        return (t >>> 19 | e << 13) ^ (e >>> 29 | t << 3) ^ (t >>> 6 | e << 26)
    }

    function b(t, e) {
        return t >>> 0 < e >>> 0 ? 1 : 0
    }
    r(u, n), u.prototype.init = function() {
        return this._ah = 1779033703, this._bh = 3144134277, this._ch = 1013904242, this._dh = 2773480762, this._eh = 1359893119, this._fh = 2600822924, this._gh = 528734635, this._hh = 1541459225, this._al = 4089235720, this._bl = 2227873595, this._cl = 4271175723, this._dl = 1595750129, this._el = 2917565137, this._fl = 725511199, this._gl = 4215389547, this._hl = 327033209, this
    }, u.prototype._update = function(t) {
        for (var e = this._w, i = 0 | this._ah, r = 0 | this._bh, n = 0 | this._ch, o = 0 | this._dh, s = 0 | this._eh, u = 0 | this._fh, g = 0 | this._gh, v = 0 | this._hh, m = 0 | this._al, A = 0 | this._bl, w = 0 | this._cl, E = 0 | this._dl, P = 0 | this._el, S = 0 | this._fl, I = 0 | this._gl, T = 0 | this._hl, M = 0; M < 32; M += 2) e[M] = t.readInt32BE(4 * M), e[M + 1] = t.readInt32BE(4 * M + 4);
        for (; M < 160; M += 2) {
            var C = e[M - 30],
                k = e[M - 30 + 1],
                D = h(C, k),
                O = p(k, C),
                U = _(C = e[M - 4], k = e[M - 4 + 1]),
                L = y(k, C),
                x = e[M - 14],
                R = e[M - 14 + 1],
                N = e[M - 32],
                B = e[M - 32 + 1],
                j = O + R | 0,
                F = D + x + b(j, O) | 0;
            F = (F = F + U + b(j = j + L | 0, L) | 0) + N + b(j = j + B | 0, B) | 0, e[M] = F, e[M + 1] = j
        }
        for (var H = 0; H < 160; H += 2) {
            F = e[H], j = e[H + 1];
            var q = c(i, r, n),
                Y = c(m, A, w),
                V = f(i, m),
                z = f(m, i),
                W = l(s, P),
                X = l(P, s),
                K = a[H],
                G = a[H + 1],
                Z = d(s, u, g),
                Q = d(P, S, I),
                J = T + X | 0,
                $ = v + W + b(J, T) | 0;
            $ = ($ = ($ = $ + Z + b(J = J + Q | 0, Q) | 0) + K + b(J = J + G | 0, G) | 0) + F + b(J = J + j | 0, j) | 0;
            var tt = z + Y | 0,
                et = V + q + b(tt, z) | 0;
            v = g, T = I, g = u, I = S, u = s, S = P, s = o + $ + b(P = E + J | 0, E) | 0, o = n, E = w, n = r, w = A, r = i, A = m, i = $ + et + b(m = J + tt | 0, J) | 0
        }
        this._al = this._al + m | 0, this._bl = this._bl + A | 0, this._cl = this._cl + w | 0, this._dl = this._dl + E | 0, this._el = this._el + P | 0, this._fl = this._fl + S | 0, this._gl = this._gl + I | 0, this._hl = this._hl + T | 0, this._ah = this._ah + i + b(this._al, m) | 0, this._bh = this._bh + r + b(this._bl, A) | 0, this._ch = this._ch + n + b(this._cl, w) | 0, this._dh = this._dh + o + b(this._dl, E) | 0, this._eh = this._eh + s + b(this._el, P) | 0, this._fh = this._fh + u + b(this._fl, S) | 0, this._gh = this._gh + g + b(this._gl, I) | 0, this._hh = this._hh + v + b(this._hl, T) | 0
    }, u.prototype._hash = function() {
        var t = o.allocUnsafe(64);

        function e(e, i, r) {
            t.writeInt32BE(e, r), t.writeInt32BE(i, r + 4)
        }
        return e(this._ah, this._al, 0), e(this._bh, this._bl, 8), e(this._ch, this._cl, 16), e(this._dh, this._dl, 24), e(this._eh, this._el, 32), e(this._fh, this._fl, 40), e(this._gh, this._gl, 48), e(this._hh, this._hl, 56), t
    }, t.exports = u
}, , , , function(t, e, i) {
    (function(e) {
        var r = i(218),
            n = i(503);

        function o(t, i) {
            var n = function(t) {
                    var e = a(t);
                    return {
                        blinder: e.toRed(r.mont(t.modulus)).redPow(new r(t.publicExponent)).fromRed(),
                        unblinder: e.invm(t.modulus)
                    }
                }(i),
                o = i.modulus.byteLength(),
                s = (r.mont(i.modulus), new r(t).mul(n.blinder).umod(i.modulus)),
                u = s.toRed(r.mont(i.prime1)),
                d = s.toRed(r.mont(i.prime2)),
                c = i.coefficient,
                f = i.prime1,
                l = i.prime2,
                h = u.redPow(i.exponent1),
                p = d.redPow(i.exponent2);
            h = h.fromRed(), p = p.fromRed();
            var _ = h.isub(p).imul(c).umod(f);
            return _.imul(l), p.iadd(_), new e(p.imul(n.unblinder).umod(i.modulus).toArray(!1, o))
        }

        function a(t) {
            for (var e = t.modulus.byteLength(), i = new r(n(e)); i.cmp(t.modulus) >= 0 || !i.umod(t.prime1) || !i.umod(t.prime2);) i = new r(n(e));
            return i
        }
        t.exports = o, o.getr = a
    }).call(this, i(315).Buffer)
}, , , , , , , function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "getAudioExtra", function() {
        return n
    });
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };

    function n(t) {
        return t = AudioUtils.asObject(t), "object" === r(t.extra) ? t.extra : JSON.parse(t.extra || "{}")
    }
}, , , , , , , , , , , , function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "AudioUtils", function() {
        return gt
    });
    var r = i(24),
        n = i(728),
        o = i(197),
        a = i(258),
        s = i(333),
        u = i(560),
        d = i(470),
        c = i(183),
        f = i(141),
        l = i(215),
        h = i(5),
        p = i(638),
        _ = i(661),
        y = i(40),
        b = i(773),
        g = i(602),
        v = i(348),
        m = i(90),
        A = i(231),
        w = i(464),
        E = i(43),
        P = i(97),
        S = i(670),
        I = i(239),
        T = i(237),
        M = i(373),
        C = i(80),
        k = i(775),
        D = i(253),
        O = i(327),
        U = i(572),
        L = i(166),
        x = i(536),
        R = i(328),
        N = i(33),
        B = i(681),
        j = i(155),
        F = i(586),
        H = i(190),
        q = i(575),
        Y = i(340),
        V = i(247),
        z = i(102),
        W = i(260),
        X = i(450),
        K = i(756),
        G = i(65),
        Z = i(543),
        Q = i(466),
        J = i(112),
        $ = i(656),
        tt = i(420),
        et = i(748),
        it = i(335),
        rt = i(494),
        nt = i(47),
        ot = i(573),
        at = i(64),
        st = i(709),
        ut = i(764),
        dt = i(374),
        ct = i(365),
        ft = i(390),
        lt = i(290),
        ht = i(708),
        pt = i(330),
        _t = i(9),
        yt = i(353),
        bt = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var i = arguments[e];
                for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r])
            }
            return t
        };
    window.AudioLayer = yt.default, window.AudioUtils = bt({}, r.AUDIO_PLAYER_ENUMS, {
        audioSearchPerformer: n.audioSearchPerformer,
        toggleAudioLyrics: o.toggleAudioLyrics,
        getRowActionName: a.getRowActionName,
        initRowPlaylistsChooser: f.initRowPlaylistsChooser,
        addToPlaylistsBoxInit: l.addToPlaylistsBoxInit,
        showRecoms: h.showRecoms,
        shareAudio: p.shareAudio,
        showAudioAlbum: _.showAudioAlbum,
        openEpisode: y.openEpisode,
        replaceWithOriginal: b.replaceWithOriginal,
        editAudio: g.editAudio,
        editEpisode: v.editEpisode,
        deleteCurrentAudio: m.deleteCurrentAudio,
        deleteRecomsAudio: A.deleteRecomsAudio,
        deleteListenedAudio: w.deleteListenedAudio,
        deleteAudio: E.deleteAudio,
        deleteEpisode: P.deleteEpisode,
        restoreEpisode: S.restoreEpisode,
        deleteDeletedAudios: I.deleteDeletedAudios,
        faveEpisode: T.faveEpisode,
        contextSplit: M.contextSplit,
        showAudioPlaylist: C.showAudioPlaylist,
        editPlaylist: O.editPlaylist,
        followPlaylist: U.followPlaylist,
        getLayer: L.getLayer,
        updateQueueReceivedPost: x.updateQueueReceivedPost,
        toggleAudioHQBodyClass: R.toggleAudioHQBodyClass,
        hasAudioHQBodyClass: N.hasAudioHQBodyClass,
        showNeedFlashBox: B.showNeedFlashBox,
        getAddRestoreInfo: j.getAddRestoreInfo,
        addAudio: F.addAudio,
        addAudioToOwner: H.addAudioToOwner,
        chooseAudioBox: q.chooseAudioBox,
        getAudioArtistsString: Y.getAudioArtistsString,
        getAudioPerformers: V.getAudioPerformers,
        drawAudio: z.drawAudio,
        isClaimedAudio: W.isClaimedAudio,
        getDurationMod: z.getDurationMod,
        getAudioExtra: X.getAudioExtra,
        getAudioFromEl: K.getAudioFromEl,
        getAudioFullId: G.getAudioFullId,
        asObject: Z.asObject,
        initDomPlaylist: Q.initDomPlaylist,
        getContextPlaylist: J.getContextPlaylist,
        renderAudioDiag: tt.renderAudioDiag,
        claim: et.claim,
        unclaim: it.unclaim,
        getUMAInfo: rt.getUMAInfo,
        getUMAInfoAlbum: nt.getUMAInfoAlbum,
        cancelReplacement: ot.cancelReplacement,
        removeFromGroup: at.removeFromGroup,
        addToGroupBox: st.addToGroupBox,
        showAudioRestriction: ht.showAudioRestriction,
        isPodcast: ut.isPodcast,
        isPrivatePodcast: dt.isPrivatePodcast,
        PodcastsLogs: ct,
        copyPlaylistLink: ft.copyPlaylistLink,
        connectListenQueue: lt.connectListenQueue,
        getAlbumParts: pt.getAlbumParts,
        drawAlbumPartRow: _t.drawAlbumPartRow,
        onRowOver: s.onRowOver,
        onRowLeave: u.onRowLeave,
        onAudioAddedToPlaylist: d.onAudioAddedToPlaylist,
        onAudioChoose: k.onAudioChoose,
        onPlaylistChoose: D.onPlaylistChoose,
        _showPlaylistsChooser: c.showPlaylistsChooser,
        debugLog: $.debugLog
    });
    var gt = window.AudioUtils
}, , function(t, e, i) {
    "use strict";

    function r(t, e) {
        AudioUtils.deleteAudio(t, e, !1, !1, !0)
    }
    i.r(e), i.d(e, "deleteListenedAudio", function() {
        return r
    })
}, , function(t, e, i) {
    "use strict";

    function r(t, e) {
        var i = [];
        return each(e, function(t, e) {
            e && each(geByClass("_audio_row", e), function(t) {
                i.push(AudioUtils.getAudioFromEl(this))
            })
        }), t.addAudio(i), t
    }
    i.r(e), i.d(e, "initDomPlaylist", function() {
        return r
    })
}, , , , function(t, e, i) {
    "use strict";

    function r(t, e, i, r) {
        getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, t, e).addAudio(r, 0), each(geByClass("_audio_pl_" + t + "_" + e), function(t, e) {
            domReplaceEl(e, se(i))
        })
    }
    i.r(e), i.d(e, "onAudioAddedToPlaylist", function() {
        return r
    })
}, , , function(t, e, i) {
    (function(r, n) {
        var o;
        (function() {
            "use strict";

            function a(t) {
                return "function" == typeof t
            }
            var s, u, d = Array.isArray ? Array.isArray : function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                },
                c = 0,
                f = function(t, e) {
                    E[c] = t, E[c + 1] = e, 2 === (c += 2) && (u ? u(P) : g())
                };
            var l = "undefined" != typeof window ? window : void 0,
                h = l || {},
                p = h.MutationObserver || h.WebKitMutationObserver,
                _ = void 0 !== r && "[object process]" === {}.toString.call(r),
                y = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;

            function b() {
                return function() {
                    setTimeout(P, 1)
                }
            }
            var g, v, m, A, w, E = new Array(1e3);

            function P() {
                for (var t = 0; t < c; t += 2) {
                    (0, E[t])(E[t + 1]), E[t] = void 0, E[t + 1] = void 0
                }
                c = 0
            }
            _ ? g = function() {
                r.nextTick(P)
            } : p ? (m = 0, A = new p(P), w = document.createTextNode(""), A.observe(w, {
                characterData: !0
            }), g = function() {
                w.data = m = ++m % 2
            }) : y ? ((v = new MessageChannel).port1.onmessage = P, g = function() {
                v.port2.postMessage(0)
            }) : g = void 0 === l ? function() {
                try {
                    var t = i(21);
                    return s = t.runOnLoop || t.runOnContext,
                        function() {
                            s(P)
                        }
                } catch (t) {
                    return b()
                }
            }() : b();
            var S = function(t, e) {
                var i = this._state;
                if (i === C && !t || i === k && !e) return this;
                var r = new this.constructor(T),
                    n = this._result;
                if (i) {
                    var o = arguments[i - 1];
                    f(function() {
                        q(i, r, o, n)
                    })
                } else B(this, r, t, e);
                return r
            };
            var I = function(t) {
                if (t && "object" == typeof t && t.constructor === this) return t;
                var e = new this(T);
                return L(e, t), e
            };

            function T() {}
            var M = void 0,
                C = 1,
                k = 2,
                D = new F;

            function O(t) {
                try {
                    return t.then
                } catch (t) {
                    return D.error = t, D
                }
            }

            function U(t, e, i) {
                e.constructor === t.constructor && i === S && constructor.resolve === I ? function(t, e) {
                    e._state === C ? R(t, e._result) : e._state === k ? N(t, e._result) : B(e, void 0, function(e) {
                        L(t, e)
                    }, function(e) {
                        N(t, e)
                    })
                }(t, e) : i === D ? N(t, D.error) : void 0 === i ? R(t, e) : a(i) ? function(t, e, i) {
                    f(function(t) {
                        var r = !1,
                            n = function(t, e, i, r) {
                                try {
                                    t.call(e, i, r)
                                } catch (t) {
                                    return t
                                }
                            }(i, e, function(i) {
                                r || (r = !0, e !== i ? L(t, i) : R(t, i))
                            }, function(e) {
                                r || (r = !0, N(t, e))
                            }, t._label);
                        !r && n && (r = !0, N(t, n))
                    }, t)
                }(t, e, i) : R(t, e)
            }

            function L(t, e) {
                var i;
                t === e ? N(t, new TypeError("You cannot resolve a promise with itself")) : "function" == typeof(i = e) || "object" == typeof i && null !== i ? U(t, e, O(e)) : R(t, e)
            }

            function x(t) {
                t._onerror && t._onerror(t._result), j(t)
            }

            function R(t, e) {
                t._state === M && (t._result = e, t._state = C, 0 !== t._subscribers.length && f(j, t))
            }

            function N(t, e) {
                t._state === M && (t._state = k, t._result = e, f(x, t))
            }

            function B(t, e, i, r) {
                var n = t._subscribers,
                    o = n.length;
                t._onerror = null, n[o] = e, n[o + C] = i, n[o + k] = r, 0 === o && t._state && f(j, t)
            }

            function j(t) {
                var e = t._subscribers,
                    i = t._state;
                if (0 !== e.length) {
                    for (var r, n, o = t._result, a = 0; a < e.length; a += 3) r = e[a], n = e[a + i], r ? q(i, r, n, o) : n(o);
                    t._subscribers.length = 0
                }
            }

            function F() {
                this.error = null
            }
            var H = new F;

            function q(t, e, i, r) {
                var n, o, s, u, d = a(i);
                if (d) {
                    if ((n = function(t, e) {
                            try {
                                return t(e)
                            } catch (t) {
                                return H.error = t, H
                            }
                        }(i, r)) === H ? (u = !0, o = n.error, n = null) : s = !0, e === n) return void N(e, new TypeError("A promises callback cannot return that same promise."))
                } else n = r, s = !0;
                e._state !== M || (d && s ? L(e, n) : u ? N(e, o) : t === C ? R(e, n) : t === k && N(e, n))
            }
            var Y = function(t) {
                return new G(this, t).promise
            };
            var V = function(t) {
                var e = new this(T);
                if (!d(t)) return N(e, new TypeError("You must pass an array to race.")), e;
                var i = t.length;

                function r(t) {
                    L(e, t)
                }

                function n(t) {
                    N(e, t)
                }
                for (var o = 0; e._state === M && o < i; o++) B(this.resolve(t[o]), void 0, r, n);
                return e
            };
            var z = function(t) {
                    var e = new this(T);
                    return N(e, t), e
                },
                W = 0;
            var X = K;

            function K(t) {
                this._id = W++, this._state = void 0, this._result = void 0, this._subscribers = [], T !== t && ("function" != typeof t && function() {
                    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
                }(), this instanceof K ? function(t, e) {
                    try {
                        e(function(e) {
                            L(t, e)
                        }, function(e) {
                            N(t, e)
                        })
                    } catch (e) {
                        N(t, e)
                    }
                }(this, t) : function() {
                    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
                }())
            }
            K.all = Y, K.race = V, K.resolve = I, K.reject = z, K._setScheduler = function(t) {
                u = t
            }, K._setAsap = function(t) {
                f = t
            }, K._asap = f, K.prototype = {
                constructor: K,
                then: S,
                catch: function(t) {
                    return this.then(null, t)
                }
            };
            var G = Z;

            function Z(t, e) {
                this._instanceConstructor = t, this.promise = new t(T), Array.isArray(e) ? (this._input = e, this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? R(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && R(this.promise, this._result))) : N(this.promise, this._validationError())
            }
            Z.prototype._validationError = function() {
                return new Error("Array Methods must be provided an Array")
            }, Z.prototype._enumerate = function() {
                for (var t = this.length, e = this._input, i = 0; this._state === M && i < t; i++) this._eachEntry(e[i], i)
            }, Z.prototype._eachEntry = function(t, e) {
                var i = this._instanceConstructor,
                    r = i.resolve;
                if (r === I) {
                    var n = O(t);
                    if (n === S && t._state !== M) this._settledAt(t._state, e, t._result);
                    else if ("function" != typeof n) this._remaining--, this._result[e] = t;
                    else if (i === X) {
                        var o = new i(T);
                        U(o, t, n), this._willSettleAt(o, e)
                    } else this._willSettleAt(new i(function(e) {
                        e(t)
                    }), e)
                } else this._willSettleAt(r(t), e)
            }, Z.prototype._settledAt = function(t, e, i) {
                var r = this.promise;
                r._state === M && (this._remaining--, t === k ? N(r, i) : this._result[e] = i), 0 === this._remaining && R(r, this._result)
            }, Z.prototype._willSettleAt = function(t, e) {
                var i = this;
                B(t, void 0, function(t) {
                    i._settledAt(C, e, t)
                }, function(t) {
                    i._settledAt(k, e, t)
                })
            };
            var Q = function() {
                    var t;
                    if (void 0 !== n) t = n;
                    else if ("undefined" != typeof self) t = self;
                    else try {
                        t = Function("return this")()
                    } catch (t) {
                        throw new Error("polyfill failed because global object is unavailable in this environment")
                    }
                    var e = t.Promise;
                    e && "[object Promise]" === Object.prototype.toString.call(e.resolve()) && !e.cast || (t.Promise = X)
                },
                J = {
                    Promise: X,
                    polyfill: Q
                };
            void 0 === (o = function() {
                return J
            }.call(e, i, e, t)) || (t.exports = o), Q()
        }).call(this)
    }).call(this, i(210), i(186))
}, , , , , , , , , , , function(t, e, i) {
    (e = t.exports = function(t) {
        t = t.toLowerCase();
        var i = e[t];
        if (!i) throw new Error(t + " is not supported (we accept pull requests)");
        return new i
    }).sha = i(268), e.sha1 = i(62), e.sha224 = i(395), e.sha256 = i(291), e.sha384 = i(533), e.sha512 = i(439)
}, , , , , , , function(t, e, i) {
    var r = i(367);
    e.encrypt = function(t, e) {
        var i = r(e, t._prev);
        return t._prev = t._cipher.encryptBlock(i), t._prev
    }, e.decrypt = function(t, e) {
        var i = t._prev;
        t._prev = e;
        var n = t._cipher.decryptBlock(e);
        return r(n, i)
    }
}, , , function(t, e, i) {
    "use strict";

    function r(t, e) {
        e.isInEditBox || showBox("al_audio.php", {
            act: "get_uma_restrictions",
            id: e.id,
            owner_id: e.owner_id,
            hash: e.actionHash
        }, {
            params: {
                width: 750
            }
        })
    }
    i.r(e), i.d(e, "getUMAInfo", function() {
        return r
    })
}, , function(t, e, i) {
    "use strict";

    function r(t) {
        var e = new Date;
        return t.getFullYear() === e.getFullYear() && t.getMonth() === e.getMonth() && t.getDate() === e.getDate()
    }

    function n(t) {
        return r(new Date(t.getTime() + 864e5))
    }

    function o(t) {
        return r(new Date(t.getTime() - 864e5))
    }

    function a(t, e) {
        var i = new Date(t),
            r = new Date(e);
        return i.getFullYear() === r.getFullYear() && i.getMonth() === r.getMonth() && i.getDate() === r.getDate()
    }

    function s(t) {
        return t >= 10 ? t : "0" + t
    }

    function u(t, e) {
        var i = void 0;
        t = Math.max(t, 0);
        var r = Math.floor(t % 60);
        i = r < 10 ? "0" + r : r;
        var n = (t = Math.floor(t / 60)) % 60;
        return i = n + ":" + i, ((t = Math.floor(t / 60)) > 0 || e) && (n < 10 && (i = "0" + i), i = t + ":" + i), i
    }
    i.r(e), i.d(e, "isToday", function() {
        return r
    }), i.d(e, "isYesterday", function() {
        return n
    }), i.d(e, "isTomorrow", function() {
        return o
    }), i.d(e, "isSameDate", function() {
        return a
    }), i.d(e, "leadingZero", function() {
        return s
    }), i.d(e, "formatTime", function() {
        return u
    })
}, , function(t, e, i) {
    var r = e;
    r.utils = i(436), r.common = i(430), r.sha = i(345), r.ripemd = i(684), r.hmac = i(272), r.sha1 = r.sha.sha1, r.sha256 = r.sha.sha256, r.sha224 = r.sha.sha224, r.sha384 = r.sha.sha384, r.sha512 = r.sha.sha512, r.ripemd160 = r.ripemd.ripemd160
}, function(t, e, i) {
    (function(r) {
        var n;
        ! function(o) {
            "use strict";
            var a, s, u, d;
            o ? function() {
                var t = o.crypto || o.msCrypto;
                if (!a && t && t.getRandomValues) try {
                    var e = new Uint8Array(16);
                    d = a = function() {
                        return t.getRandomValues(e), e
                    }, a()
                } catch (t) {}
                if (!a) {
                    var i = new Array(16);
                    s = a = function() {
                        for (var t, e = 0; e < 16; e++) 0 == (3 & e) && (t = 4294967296 * Math.random()), i[e] = t >>> ((3 & e) << 3) & 255;
                        return i
                    }, "undefined" != typeof console && console.warn && console.warn("[SECURITY] node-uuid: crypto not usable, falling back to insecure Math.random()")
                }
            }() : function() {
                try {
                    var t = i(587).randomBytes;
                    u = a = t && function() {
                        return t(16)
                    }, a()
                } catch (t) {}
            }();
            for (var c = "function" == typeof r ? r : Array, f = [], l = {}, h = 0; h < 256; h++) f[h] = (h + 256).toString(16).substr(1), l[f[h]] = h;

            function p(t, e) {
                var i = e || 0,
                    r = f;
                return r[t[i++]] + r[t[i++]] + r[t[i++]] + r[t[i++]] + "-" + r[t[i++]] + r[t[i++]] + "-" + r[t[i++]] + r[t[i++]] + "-" + r[t[i++]] + r[t[i++]] + "-" + r[t[i++]] + r[t[i++]] + r[t[i++]] + r[t[i++]] + r[t[i++]] + r[t[i++]]
            }
            var _ = a(),
                y = [1 | _[0], _[1], _[2], _[3], _[4], _[5]],
                b = 16383 & (_[6] << 8 | _[7]),
                g = 0,
                v = 0;

            function m(t, e, i) {
                var r = e && i || 0;
                "string" == typeof t && (e = "binary" === t ? new c(16) : null, t = null);
                var n = (t = t || {}).random || (t.rng || a)();
                if (n[6] = 15 & n[6] | 64, n[8] = 63 & n[8] | 128, e)
                    for (var o = 0; o < 16; o++) e[r + o] = n[o];
                return e || p(n)
            }
            var A = m;
            A.v1 = function(t, e, i) {
                var r = e && i || 0,
                    n = e || [],
                    o = null != (t = t || {}).clockseq ? t.clockseq : b,
                    a = null != t.msecs ? t.msecs : (new Date).getTime(),
                    s = null != t.nsecs ? t.nsecs : v + 1,
                    u = a - g + (s - v) / 1e4;
                if (u < 0 && null == t.clockseq && (o = o + 1 & 16383), (u < 0 || a > g) && null == t.nsecs && (s = 0), s >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
                g = a, v = s, b = o;
                var d = (1e4 * (268435455 & (a += 122192928e5)) + s) % 4294967296;
                n[r++] = d >>> 24 & 255, n[r++] = d >>> 16 & 255, n[r++] = d >>> 8 & 255, n[r++] = 255 & d;
                var c = a / 4294967296 * 1e4 & 268435455;
                n[r++] = c >>> 8 & 255, n[r++] = 255 & c, n[r++] = c >>> 24 & 15 | 16, n[r++] = c >>> 16 & 255, n[r++] = o >>> 8 | 128, n[r++] = 255 & o;
                for (var f = t.node || y, l = 0; l < 6; l++) n[r + l] = f[l];
                return e || p(n)
            }, A.v4 = m, A.parse = function(t, e, i) {
                var r = e && i || 0,
                    n = 0;
                for (e = e || [], t.toLowerCase().replace(/[0-9a-f]{2}/g, function(t) {
                        n < 16 && (e[r + n++] = l[t])
                    }); n < 16;) e[r + n++] = 0;
                return e
            }, A.unparse = p, A.BufferClass = c, A._rng = a, A._mathRNG = s, A._nodeRNG = u, A._whatwgRNG = d, void 0 !== t && t.exports ? t.exports = A : void 0 === (n = function() {
                return A
            }.call(e, i, e, t)) || (t.exports = n)
        }("undefined" != typeof window ? window : null)
    }).call(this, i(315).Buffer)
}, , function(t, e) {
    t.exports = {
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
}, function(t, e, i) {
    var r = i(581),
        n = i(315).Buffer,
        o = i(93),
        a = o.base,
        s = o.constants.der;

    function u(t) {
        this.enc = "der", this.name = t.name, this.entity = t, this.tree = new d, this.tree._init(t.body)
    }

    function d(t) {
        a.Node.call(this, "der", t)
    }

    function c(t) {
        return t < 10 ? "0" + t : t
    }
    t.exports = u, u.prototype.encode = function(t, e) {
        return this.tree._encode(t, e).join()
    }, r(d, a.Node), d.prototype._encodeComposite = function(t, e, i, r) {
        var o, a = function(t, e, i, r) {
            var n;
            "seqof" === t ? t = "seq" : "setof" === t && (t = "set");
            if (s.tagByName.hasOwnProperty(t)) n = s.tagByName[t];
            else {
                if ("number" != typeof t || (0 | t) !== t) return r.error("Unknown tag: " + t);
                n = t
            }
            if (n >= 31) return r.error("Multi-octet tag encoding unsupported");
            e || (n |= 32);
            return n |= s.tagClassByName[i || "universal"] << 6
        }(t, e, i, this.reporter);
        if (r.length < 128) return (o = new n(2))[0] = a, o[1] = r.length, this._createEncoderBuffer([o, r]);
        for (var u = 1, d = r.length; d >= 256; d >>= 8) u++;
        (o = new n(2 + u))[0] = a, o[1] = 128 | u;
        d = 1 + u;
        for (var c = r.length; c > 0; d--, c >>= 8) o[d] = 255 & c;
        return this._createEncoderBuffer([o, r])
    }, d.prototype._encodeStr = function(t, e) {
        if ("bitstr" === e) return this._createEncoderBuffer([0 | t.unused, t.data]);
        if ("bmpstr" === e) {
            for (var i = new n(2 * t.length), r = 0; r < t.length; r++) i.writeUInt16BE(t.charCodeAt(r), 2 * r);
            return this._createEncoderBuffer(i)
        }
        return "numstr" === e ? this._isNumstr(t) ? this._createEncoderBuffer(t) : this.reporter.error("Encoding of string type: numstr supports only digits and space") : "printstr" === e ? this._isPrintstr(t) ? this._createEncoderBuffer(t) : this.reporter.error("Encoding of string type: printstr supports only latin upper and lower case letters, digits, space, apostrophe, left and rigth parenthesis, plus sign, comma, hyphen, dot, slash, colon, equal sign, question mark") : /str$/.test(e) ? this._createEncoderBuffer(t) : "objDesc" === e ? this._createEncoderBuffer(t) : this.reporter.error("Encoding of string type: " + e + " unsupported")
    }, d.prototype._encodeObjid = function(t, e, i) {
        if ("string" == typeof t) {
            if (!e) return this.reporter.error("string objid given, but no values map found");
            if (!e.hasOwnProperty(t)) return this.reporter.error("objid not found in values map");
            t = e[t].split(/[\s\.]+/g);
            for (var r = 0; r < t.length; r++) t[r] |= 0
        } else if (Array.isArray(t)) {
            t = t.slice();
            for (r = 0; r < t.length; r++) t[r] |= 0
        }
        if (!Array.isArray(t)) return this.reporter.error("objid() should be either array or string, got: " + JSON.stringify(t));
        if (!i) {
            if (t[1] >= 40) return this.reporter.error("Second objid identifier OOB");
            t.splice(0, 2, 40 * t[0] + t[1])
        }
        var o = 0;
        for (r = 0; r < t.length; r++) {
            var a = t[r];
            for (o++; a >= 128; a >>= 7) o++
        }
        var s = new n(o),
            u = s.length - 1;
        for (r = t.length - 1; r >= 0; r--) {
            a = t[r];
            for (s[u--] = 127 & a;
                (a >>= 7) > 0;) s[u--] = 128 | 127 & a
        }
        return this._createEncoderBuffer(s)
    }, d.prototype._encodeTime = function(t, e) {
        var i, r = new Date(t);
        return "gentime" === e ? i = [c(r.getFullYear()), c(r.getUTCMonth() + 1), c(r.getUTCDate()), c(r.getUTCHours()), c(r.getUTCMinutes()), c(r.getUTCSeconds()), "Z"].join("") : "utctime" === e ? i = [c(r.getFullYear() % 100), c(r.getUTCMonth() + 1), c(r.getUTCDate()), c(r.getUTCHours()), c(r.getUTCMinutes()), c(r.getUTCSeconds()), "Z"].join("") : this.reporter.error("Encoding " + e + " time is not supported yet"), this._encodeStr(i, "octstr")
    }, d.prototype._encodeNull = function() {
        return this._createEncoderBuffer("")
    }, d.prototype._encodeInt = function(t, e) {
        if ("string" == typeof t) {
            if (!e) return this.reporter.error("String int or enum given, but no values map");
            if (!e.hasOwnProperty(t)) return this.reporter.error("Values map doesn't contain: " + JSON.stringify(t));
            t = e[t]
        }
        if ("number" != typeof t && !n.isBuffer(t)) {
            var i = t.toArray();
            !t.sign && 128 & i[0] && i.unshift(0), t = new n(i)
        }
        if (n.isBuffer(t)) {
            var r = t.length;
            0 === t.length && r++;
            var o = new n(r);
            return t.copy(o), 0 === t.length && (o[0] = 0), this._createEncoderBuffer(o)
        }
        if (t < 128) return this._createEncoderBuffer(t);
        if (t < 256) return this._createEncoderBuffer([0, t]);
        r = 1;
        for (var a = t; a >= 256; a >>= 8) r++;
        for (a = (o = new Array(r)).length - 1; a >= 0; a--) o[a] = 255 & t, t >>= 8;
        return 128 & o[0] && o.unshift(0), this._createEncoderBuffer(new n(o))
    }, d.prototype._encodeBool = function(t) {
        return this._createEncoderBuffer(t ? 255 : 0)
    }, d.prototype._use = function(t, e) {
        return "function" == typeof t && (t = t(e)), t._getEncoder("der").tree
    }, d.prototype._skipDefault = function(t, e, i) {
        var r, n = this._baseState;
        if (null === n.default) return !1;
        var o = t.join();
        if (void 0 === n.defaultBuffer && (n.defaultBuffer = this._encodeValue(n.default, e, i).join()), o.length !== n.defaultBuffer.length) return !1;
        for (r = 0; r < o.length; r++)
            if (o[r] !== n.defaultBuffer[r]) return !1;
        return !0
    }
}, function(t, e, i) {
    "use strict";
    (function(e, r) {
        var n = i(307).Buffer,
            o = e.crypto || e.msCrypto;
        o && o.getRandomValues ? t.exports = function(t, i) {
            if (t > 65536) throw new Error("requested too many random bytes");
            var a = new e.Uint8Array(t);
            t > 0 && o.getRandomValues(a);
            var s = n.from(a.buffer);
            if ("function" == typeof i) return r.nextTick(function() {
                i(null, s)
            });
            return s
        } : t.exports = function() {
            throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11")
        }
    }).call(this, i(186), i(210))
}, , , function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "ge", function() {
        return s
    }), i.d(e, "geByTag", function() {
        return u
    }), i.d(e, "geByTag1", function() {
        return d
    }), i.d(e, "geByClass", function() {
        return c
    }), i.d(e, "geByClass1", function() {
        return f
    }), i.d(e, "gpeByClass", function() {
        return l
    }), i.d(e, "domQuery", function() {
        return h
    }), i.d(e, "domQuery1", function() {
        return p
    }), i.d(e, "domClosest", function() {
        return _
    }), i.d(e, "domClosestByTag", function() {
        return y
    }), i.d(e, "gpeByTag", function() {
        return b
    }), i.d(e, "ce", function() {
        return g
    }), i.d(e, "cf", function() {
        return E
    }), i.d(e, "re", function() {
        return P
    }), i.d(e, "se", function() {
        return S
    }), i.d(e, "sech", function() {
        return I
    }), i.d(e, "rs", function() {
        return T
    }), i.d(e, "psr", function() {
        return M
    }), i.d(e, "domReplaceEl", function() {
        return C
    }), i.d(e, "domEL", function() {
        return k
    }), i.d(e, "domNS", function() {
        return D
    }), i.d(e, "domPS", function() {
        return O
    }), i.d(e, "domFC", function() {
        return U
    }), i.d(e, "domLC", function() {
        return L
    }), i.d(e, "domPN", function() {
        return x
    }), i.d(e, "domChildren", function() {
        return R
    }), i.d(e, "domInsertBefore", function() {
        return N
    }), i.d(e, "domInsertAfter", function() {
        return B
    }), i.d(e, "domByClass", function() {
        return j
    }), i.d(e, "domData", function() {
        return F
    }), i.d(e, "domChildIndex", function() {
        return H
    }), i.d(e, "domCA", function() {
        return q
    }), i.d(e, "domClosestSibling", function() {
        return Y
    }), i.d(e, "matchesSelector", function() {
        return V
    }), i.d(e, "isHover", function() {
        return z
    }), i.d(e, "isAncestor", function() {
        return W
    }), i.d(e, "getScroll", function() {
        return X
    }), i.d(e, "domClosestPositioned", function() {
        return K
    }), i.d(e, "domClosestOverflowHidden", function() {
        return G
    }), i.d(e, "show", function() {
        return Z
    }), i.d(e, "hide", function() {
        return Q
    }), i.d(e, "isVisible", function() {
        return J
    }), i.d(e, "clientHeight", function() {
        return $
    }), i.d(e, "getClientRectOffsetY", function() {
        return tt
    }), i.d(e, "toggle", function() {
        return et
    }), i.d(e, "boundingRectEnabled", function() {
        return it
    }), i.d(e, "getXYRect", function() {
        return rt
    }), i.d(e, "getXY", function() {
        return nt
    }), i.d(e, "isWindow", function() {
        return ot
    }), i.d(e, "getSize", function() {
        return at
    }), i.d(e, "getW", function() {
        return st
    }), i.d(e, "getH", function() {
        return ut
    }), i.d(e, "hasClass", function() {
        return dt
    }), i.d(e, "addClass", function() {
        return ct
    }), i.d(e, "addClassDelayed", function() {
        return ft
    }), i.d(e, "removeClass", function() {
        return lt
    }), i.d(e, "removeClassDelayed", function() {
        return ht
    }), i.d(e, "toggleClass", function() {
        return pt
    }), i.d(e, "toggleClassDelayed", function() {
        return _t
    }), i.d(e, "replaceClass", function() {
        return yt
    }), i.d(e, "getStyle", function() {
        return bt
    }), i.d(e, "setStyle", function() {
        return gt
    }), i.d(e, "setStyleDelayed", function() {
        return vt
    }), i.d(e, "setPseudoStyle", function() {
        return mt
    }), i.d(e, "data", function() {
        return At
    }), i.d(e, "attr", function() {
        return wt
    }), i.d(e, "removeAttr", function() {
        return Et
    }), i.d(e, "removeData", function() {
        return Pt
    }), i.d(e, "cleanElems", function() {
        return St
    }), i.d(e, "setTitle", function() {
        return It
    }), i.d(e, "getZoom", function() {
        return Tt
    }), i.d(e, "val", function() {
        return Mt
    }), i.d(e, "elfocus", function() {
        return Ct
    }), i.d(e, "traverseParent", function() {
        return kt
    }), i.d(e, "setDocumentTitle", function() {
        return Ot
    }), i.d(e, "lockDocumentTitle", function() {
        return Ut
    }), i.d(e, "initDomScripts", function() {
        return Lt
    });
    var r = i(125),
        n = i(267),
        o = i(92),
        a = i(295),
        s = function(t) {
            return "string" == typeof t || "number" == typeof t ? document.getElementById(t) : t
        };

    function u(t, e) {
        return (e = s(e) || document).getElementsByTagName(t)
    }

    function d(t, e) {
        return (e = s(e) || document).querySelector && e.querySelector(t) || u(t, e)[0]
    }

    function c(t, e, i) {
        return e = s(e) || document, i = i || "*", t = ("." + t).replace(/\s+/gm, "."), Array.prototype.slice.call(e.querySelectorAll(i + t))
    }

    function f(t, e, i) {
        return e = s(e) || document, i = i || "*", e.querySelector && e.querySelector(i + ("." + t).replace(/\s+/gm, ".")) || c(t, e, i)[0]
    }

    function l(t, e, i) {
        if (!(e = s(e))) return null;
        for (; i !== e && (e = e.parentNode);)
            if (dt(e, t)) return e;
        return null
    }

    function h(t, e) {
        return (e || document).querySelectorAll(t)
    }

    function p(t, e) {
        return (e || document).querySelector(t)
    }

    function _(t, e) {
        return dt(e, t) ? e : l(t, e)
    }

    function y(t, e) {
        return t = t.toUpperCase(), e.nodeType === Node.ELEMENT_NODE && e.tagName.toUpperCase() === t ? e : b(t, e)
    }

    function b(t, e) {
        if (!(e = s(e))) return null;
        for (t = t.toUpperCase(); e = e.parentNode;)
            if (e.tagName && e.tagName.toUpperCase() === t) return e;
        return null
    }

    function g(t, e, i) {
        var n = document.createElement(t);
        return e && Object(r.extend)(n, e), i && gt(n, i), n
    }
    var v, m, A, w, E = (v = document, m = v.createDocumentFragment(), A = v.createElement("div"), w = v.createRange && v.createRange(), m.appendChild(A), w && w.selectNodeContents(A), w && w.createContextualFragment ? function(t) {
        return t ? w.createContextualFragment(t) : v.createDocumentFragment()
    } : function(t) {
        if (!t) return v.createDocumentFragment();
        A.innerHTML = t;
        for (var e = v.createDocumentFragment(); A.firstChild;) e.appendChild(A.firstChild);
        return e
    });

    function P(t) {
        return (t = s(t)) && t.parentNode && t.parentNode.removeChild(t), t
    }
    var S = function(t) {
            return U(g("div", {
                innerHTML: t
            }))
        },
        I = function(t) {
            return R(g("div", {
                innerHTML: t
            }))
        };

    function T(t, e) {
        return Object(r.each)(e, function(e, i) {
            t = t.replace(new RegExp("%" + e + "%", "g"), (void 0 === i ? "" : i).toString().replace(/\$/g, "&#036;"))
        }), t
    }

    function M(t) {
        return "https:" !== locProtocol ? t : t = (t = (t = (t = (t = t.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/")).replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/")
    }

    function C(t, e) {
        return Object(r.isString)(e) && (e = S(e)), x(t).replaceChild(e, t), e
    }

    function k(t, e) {
        for (e = e ? "previousSibling" : "nextSibling"; t && !t.tagName;) t = t[e];
        return t
    }
    var D = function(t) {
            return k((t || {}).nextSibling)
        },
        O = function(t) {
            return k((t || {}).previousSibling, 1)
        },
        U = function(t) {
            return k((t || {}).firstChild)
        },
        L = function(t) {
            return k((t || {}).lastChild, 1)
        },
        x = function(t) {
            return (t || {}).parentNode
        };

    function R(t) {
        for (var e = [], i = t.childNodes, r = 0; r < i.length; r++) i[r].tagName && e.push(i[r]);
        return e
    }

    function N(t, e) {
        var i = x(e);
        return i && i.insertBefore(t, e)
    }

    function B(t, e) {
        var i = x(e);
        return i && i.insertBefore(t, D(e))
    }

    function j(t, e) {
        return t ? f(e, t) : t
    }

    function F(t, e, i) {
        return t ? void 0 !== i ? (null === i ? t.removeAttribute("data-" + e) : t.setAttribute("data-" + e, i), i) : t.getAttribute("data-" + e) : null
    }

    function H(t) {
        for (var e = 0; null != (t = O(t));) e++;
        return e
    }

    function q(t, e) {
        do {
            t = x(t)
        } while (t && !V(t, e));
        return t
    }

    function Y(t, e, i) {
        for (var r = null; null === r && t;)(t = -1 === i ? O(t) : D(t)) && V(t, e) && (r = t);
        return r
    }

    function V(t, e) {
        return !(!(t = s(t)) || t === document) && (t.matches || t.matchesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector || t.webkitMatchesSelector || function(t) {
            for (var e = (this.document || this.ownerDocument).querySelectorAll(t), i = e.length; --i >= 0 && e.item(i) !== this;);
            return i > -1
        }).call(t, e)
    }

    function z(t) {
        return V(t, ":hover")
    }

    function W(t, e) {
        var i = s(t);
        if (e = s(e), !t || !e) return !1;
        for (; i = i.parentNode;)
            if (i === e) return !0;
        return !1
    }

    function X() {
        var t = o.browser.msie6 ? s("PageContainer") : document.body,
            e = document.documentElement;
        return [t.scrollLeft || e.scrollLeft || window.pageXOffset || 0, t.scrollTop || e.scrollTop || window.pageYOffset || 0, e.clientWidth || t.clientWidth || 0, e.clientHeight || t.clientHeight || 0]
    }

    function K(t, e) {
        for (var i = (e = e || {}).fromEl || x(t), n = e.positions || ["relative", "absolute", "fixed"]; i && i !== bodyNode;) {
            var o = bt(i, "position");
            if (Object(r.inArray)(o, n) && (!e.noOverflow || "hidden" !== bt(i, "overflow"))) break;
            i = x(i)
        }
        return i
    }

    function G(t, e) {
        for (var i = t = s(t), r = void 0, n = void 0, a = void 0, u = !1; i && i.tagName && i !== bodyNode;) {
            if (r = bt(i, "position"), n = bt(i, "overflow"), a = bt(i, "transform"), e && o.browser.mozilla) {
                if ("page_wrap" != i.id && i !== t && "visible" !== n && ("static" === r ? !u || "relative" === u : "fixed" !== u)) break
            } else if (i !== t && "visible" !== n && ("static" === r ? !u || "relative" === u : "fixed" !== u)) break;
            "none" !== a ? u = void 0 : "static" !== r && "fixed" !== u && (u = r), i = x(i)
        }
        return i
    }

    function Z(t) {
        var e = arguments.length;
        if (e > 1)
            for (var i = 0; i < e; i++) Z(arguments[i]);
        else if ((t = s(t)) && t.style) {
            var r = t.olddisplay,
                n = t.tagName.toLowerCase(),
                a = "block";
            t.style.display = r || "", "none" === bt(t, "display") && (a = dt(t, "inline") || dt(t, "_inline") ? "inline" : dt(t, "_inline_block") ? "inline-block" : "tr" !== n || o.browser.msie ? "table" !== n || o.browser.msie ? "block" : "table" : "table-row", t.style.display = t.olddisplay = a)
        }
    }

    function Q(t) {
        var e = arguments.length;
        if (e > 1)
            for (var i = 0; i < e; i++) Q(arguments[i]);
        else if ((t = s(t)) && t.style) {
            var r = bt(t, "display");
            t.olddisplay = "none" !== r ? r : "", t.style.display = "none"
        }
    }

    function J(t) {
        return !(!(t = s(t)) || !t.style) && "none" !== bt(t, "display")
    }

    function $() {
        return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
    }

    function tt(t, e, i) {
        t = s(t), i = i || 0;
        var n = nt(t)[1],
            o = at(t)[1],
            a = window,
            u = document.documentElement,
            d = Math.max(Object(r.intval)(a.innerHeight), Object(r.intval)(u.clientHeight)),
            c = s("page_header_cont"),
            f = u.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
            l = vk.staticheader ? Math.max(0, at(c)[1] - f) : at(c)[1];
        if (e) {
            if (n + o < f + l + i) return n + o - f - l - i;
            if (n > f + d - i) return n - f - d + i
        } else {
            if (n < f + l + i) return n - f - l - i;
            if (n + o > f + d - i) return n + o - f - d + i
        }
        return 0
    }

    function et(t, e) {
        return void 0 === e && (e = !J(t)), e ? Z(t) : Q(t), e
    }

    function it(t) {
        return void 0 !== t.getBoundingClientRect
    }

    function rt(t, e) {
        var i = void 0;
        if (e && "inline" === bt(t, "display")) {
            var r = t.getClientRects();
            i = r && r[0] || t.getBoundingClientRect()
        } else i = t.getBoundingClientRect();
        return i
    }

    function nt(t, e) {
        if (!(t = s(t))) return [0, 0];
        var i = t.ownerDocument,
            r = {
                top: 0,
                left: 0
            };
        if (!i) return [0, 0];
        var n = i.documentElement;
        it(t) && (r = rt(t, !0));
        var o = i === i.window ? i : 9 === i.nodeType && (i.defaultView || i.parentWindow);
        return [r.left + (e ? 0 : o.pageXOffset || n.scrollLeft) - (n.clientLeft || 0), r.top + (e ? 0 : o.pageYOffset || n.scrollTop) - (n.clientTop || 0)]
    }

    function ot(t) {
        return null != t && t === t.window
    }

    function at(t, e, i) {
        t = s(t);
        var n = document.documentElement,
            o = [0, 0],
            a = void 0;
        if (e && "border-box" === bt(t, "boxSizing") && (e = !1), t === document) o = [Math.max(n.clientWidth, bodyNode.scrollWidth, n.scrollWidth, bodyNode.offsetWidth, n.offsetWidth), Math.max(n.clientHeight, bodyNode.scrollHeight, n.scrollHeight, bodyNode.offsetHeight, n.offsetHeight)];
        else if (t) {
            var u = function() {
                o = it(t) && (a = rt(t, i)) && void 0 !== a.width ? [a.width, a.height] : [t.offsetWidth, t.offsetHeight], e && Object(r.each)(o, function(e, i) {
                    var n = e ? ["Top", "Bottom"] : ["Left", "Right"];
                    Object(r.each)(n, function() {
                        o[e] -= parseFloat(bt(t, "padding" + this)) || 0, o[e] -= parseFloat(bt(t, "border" + this + "Width")) || 0
                    })
                })
            };
            if (J(t)) u();
            else {
                var d = {
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    },
                    c = {},
                    f = !1;
                t.style.cssText.indexOf("!important") > -1 && (f = t.style.cssText), Object(r.each)(d, function(e, i) {
                    c[e] = t.style[e], t.style[e] = i
                }), u(), Object(r.each)(d, function(e, i) {
                    t.style[e] = c[e]
                }), f && (t.style.cssText = f)
            }
        }
        return o
    }

    function st(t) {
        return at(t)[0]
    }

    function ut(t) {
        return at(t)[1]
    }

    function dt(t, e) {
        var i = s(t);
        return i && 1 === i.nodeType && (" " + i.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + e + " ") >= 0
    }

    function ct(t, e) {
        var i = s(t);
        i && !dt(i, e) && (i.className = (i.className ? i.className + " " : "") + e)
    }
    window.whitespaceRegex = /[\t\r\n\f]/g;
    var ft = function(t, e, i) {
        i = Object(r.positive)(i), setTimeout(ct.pbind(t, e), i)
    };

    function lt(t, e) {
        var i = s(t);
        i && (i.className = Object(r.trim)((i.className || "").replace(new RegExp("(\\s|^)" + e + "(\\s|$)"), " ")))
    }
    var ht = function(t, e, i) {
        i = Object(r.positive)(i), setTimeout(lt.pbind(t, e), i)
    };

    function pt(t, e, i) {
        return void 0 === i && (i = !dt(t, e)), (i ? ct : lt)(t, e), i
    }

    function _t(t, e, i, n) {
        return n = Object(r.positive)(n), void 0 === i && (i = !dt(t, e)), (i ? ft : ht)(t, e, n), i
    }

    function yt(t, e, i) {
        lt(t, e), ct(t, i)
    }

    function bt(t, e, i) {
        if (t = s(t), Object(r.isArray)(e)) {
            var n = {};
            return Object(r.each)(e, function(e, i) {
                return n[i] = bt(t, i)
            }), n
        }
        if (!t) return "";
        if (void 0 === i && (i = !0), !i && "opacity" === e && o.browser.msie) {
            var a = t.style.filter;
            return a ? a.indexOf("opacity=") >= 0 ? parseFloat(a.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
        }
        if (!i && t.style && (t.style[e] || "height" === e)) return t.style[e];
        var u = void 0,
            d = document.defaultView || window;
        if (d.getComputedStyle) {
            e = e.replace(/([A-Z])/g, "-$1").toLowerCase();
            var c = d.getComputedStyle(t, null);
            c && (u = c.getPropertyValue(e))
        } else if (t.currentStyle) {
            if ("opacity" === e && o.browser.msie) {
                var f = t.currentStyle.filter;
                return f && f.indexOf("opacity=") >= 0 ? parseFloat(f.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
            }
            var l = e.replace(/\-(\w)/g, function(t, e) {
                return e.toUpperCase()
            });
            "auto" === (u = t.currentStyle[e] || t.currentStyle[l]) && (u = 0), u = (u + "").split(" "), Object(r.each)(u, function(e, i) {
                if (!/^\d+(px)?$/i.test(i) && /^\d/.test(i)) {
                    var r = t.style,
                        n = r.left,
                        o = t.runtimeStyle.left;
                    t.runtimeStyle.left = t.currentStyle.left, r.left = i || 0, u[e] = r.pixelLeft + "px", r.left = n, t.runtimeStyle.left = o
                }
            }), u = u.join(" ")
        }
        if (i && ("width" === e || "height" === e)) {
            var h = at(t, !0)[{
                width: 0,
                height: 1
            }[e]];
            u = (Object(r.intval)(u) ? Math.max(Object(r.floatval)(u), h) : h) + "px"
        }
        return u
    }

    function gt(t, e, i) {
        if (t = s(t))
            if (Object(r.isObject)(e)) Object(r.each)(e, function(e, i) {
                return gt(t, e, i)
            });
            else if ("opacity" === e) o.browser.msie && ((i + "").length ? t.style.filter = 1 !== i ? "alpha(opacity=" + 100 * i + ")" : "" : t.style.cssText = t.style.cssText.replace(/filter\s*:[^;]*/gi, ""), t.style.zoom = 1), t.style.opacity !== i && (t.style.opacity = i);
        else try {
            var n = "number" == typeof i;
            n && /height|width/i.test(e) && (i = Math.abs(i)), i = n && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(e) ? i + "px" : i, t.style[e] !== i && (t.style[e] = i)
        } catch (t) {
            Object(a.debugLog)("setStyle error: ", [e, i], t)
        }
    }
    window.cssTransformProp = function() {
        var t = document.createElement("div");
        if (null == t.style.transform) {
            var e = ["Webkit", "Moz", "ms"];
            for (var i in e)
                if (void 0 !== t.style[e[i] + "Transform"]) return e[i] + "Transform"
        }
        return "transform"
    }();
    var vt = function(t, e, i) {
        return setTimeout(gt.pbind(t, e, i), 0)
    };

    function mt(t, e, i) {
        var n = At(t, "pseudo-id");
        n || (At(t, "pseudo-id", n = Object(r.irand)(1e8, 999999999)), ct(t, "_pseudo_" + n));
        var o = e + "-style-" + n,
            a = s(o),
            u = "._pseudo_" + n + ":" + e + "{";
        a || (a = headNode.appendChild(g("style", {
            id: o,
            type: "text/css"
        }))), Object(r.each)(i, function(t, e) {
            u += t + ": " + e + " !important;"
        }), u += "}", a.sheet ? (a.sheet.cssRules.length && a.sheet.deleteRule(0), a.sheet.insertRule(u, 0)) : a.styleSheet && (a.styleSheet.cssText = u)
    }

    function At(t, e, i) {
        if (!t) return !1;
        var r = t[vkExpand];
        return r || (r = t[vkExpand] = ++vkUUID), void 0 !== i && (vkCache[r] || (vkCache[r] = {}, window.__debugMode && (vkCache[r].__elem = t)), vkCache[r][e] = i), e ? vkCache[r] && vkCache[r][e] : r
    }

    function wt(t, e, i) {
        return t = s(t), void 0 === i ? t.getAttribute(e) : (t.setAttribute(e, i), i)
    }

    function Et(t) {
        for (var e = 0, i = arguments.length; e < i; ++e) {
            var r = arguments[e];
            if (void 0 !== t[r]) try {
                delete t[r]
            } catch (e) {
                try {
                    t.removeAttribute(r)
                } catch (t) {}
            }
        }
    }

    function Pt(t, e) {
        var i = !!t && t[vkExpand];
        if (i)
            if (e) {
                if (vkCache[i]) {
                    delete vkCache[i][e], e = "";
                    var r = 0;
                    for (var o in vkCache[i])
                        if ("__elem" !== o) {
                            r++;
                            break
                        }
                    r || Pt(t)
                }
            } else Object(n.removeEvent)(t), Et(t, vkExpand), delete vkCache[i]
    }

    function St() {
        for (var t = arguments, e = 0; e < t.length; ++e) {
            var i = s(t[e]);
            i && (Pt(i), Et(i, "btnevents"))
        }
    }

    function It(t, e, i) {
        if ((t = s(t)) && !t.titleSet) {
            if (e || (e = t), e.scrollWidth > e.clientWidth || e.scrollHeight > e.clientHeight) t.setAttribute("title", i || t.innerText || t.textContent);
            else {
                var r = d("b", t);
                r && (r.scrollWidth > r.clientWidth || r.scrollHeight > r.clientHeight) ? t.setAttribute("title", i || t.innerText || t.textContent) : t.removeAttribute("title")
            }
            t.titleSet = 1
        }
    }

    function Tt() {
        var t = s("zoom_test_1") || document.body.appendChild(g("div", {
            id: "zoom_test_1"
        }, {
            left: "10%",
            position: "absolute",
            visibility: "hidden"
        }));
        return (s("zoom_test_2") || document.body.appendChild(g("div", {
            id: "zoom_test_2"
        }, {
            left: t.offsetLeft + "px",
            position: "absolute",
            visibility: "hidden"
        }))).offsetLeft / t.offsetLeft
    }

    function Mt(t, e, i) {
        if (t = s(t)) return void 0 !== e && (t.setValue ? (t.setValue(e), !i && t.phonblur && t.phonblur()) : "INPUT" === t.tagName || "TEXTAREA" === t.tagName ? t.value = e : void 0 !== t.emojiId && window.Emoji ? Emoji.val(t, e) : t.innerHTML = e, !i && Object(n.triggerEvent)(t, "valueChanged")), t.getValue ? t.getValue() : ("INPUT" === t.tagName || "TEXTAREA" === t.tagName ? t.value : t.innerHTML) || ""
    }

    function Ct(t, e, i) {
        t = s(t);
        try {
            if (t.focus(), void 0 !== e && !1 !== e || (e = t.value.length), void 0 !== i && !1 !== i || (i = e), t.setSelectionRange) t.setSelectionRange(e, i);
            else if (window.getSelection && document.createRange) {
                var r = document.createRange();
                r.selectNodeContents(t), r.collapse(!1);
                var n = window.getSelection();
                n.removeAllRanges(), n.addRange(r)
            }
        } catch (t) {}
    }

    function kt(t, e, i) {
        for (t = s(t), i = i || 999; t && !e(t);) {
            if (0 === --i) return !1;
            try {
                if ((t = x(t)) === document) return !1
            } catch (e) {
                t = !1
            }
        }
        return t
    }
    var Dt = !1;

    function Ot(t) {
        if (!Dt) return window.document.title = Object(r.replaceEntities)(t)
    }

    function Ut(t) {
        Dt = t, t && window.cur && window.cur.destroy.push(function() {
            Ut(!1)
        })
    }

    function Lt() {
        window.vkExpand = window.vkExpand || "VK" + Object(r.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {}
    }
}, , function(t, e, i) {
    var r = i(631).Reporter,
        n = i(631).EncoderBuffer,
        o = i(631).DecoderBuffer,
        a = i(214),
        s = ["seq", "seqof", "set", "setof", "objid", "bool", "gentime", "utctime", "null_", "enum", "int", "objDesc", "bitstr", "bmpstr", "charstr", "genstr", "graphstr", "ia5str", "iso646str", "numstr", "octstr", "printstr", "t61str", "unistr", "utf8str", "videostr"],
        u = ["key", "obj", "use", "optional", "explicit", "implicit", "def", "choice", "any", "contains"].concat(s);

    function d(t, e) {
        var i = {};
        this._baseState = i, i.enc = t, i.parent = e || null, i.children = null, i.tag = null, i.args = null, i.reverseArgs = null, i.choice = null, i.optional = !1, i.any = !1, i.obj = !1, i.use = null, i.useDecoder = null, i.key = null, i.default = null, i.explicit = null, i.implicit = null, i.contains = null, i.parent || (i.children = [], this._wrap())
    }
    t.exports = d;
    var c = ["enc", "parent", "children", "tag", "args", "reverseArgs", "choice", "optional", "any", "obj", "use", "alteredUse", "key", "default", "explicit", "implicit", "contains"];
    d.prototype.clone = function() {
        var t = this._baseState,
            e = {};
        c.forEach(function(i) {
            e[i] = t[i]
        });
        var i = new this.constructor(e.parent);
        return i._baseState = e, i
    }, d.prototype._wrap = function() {
        var t = this._baseState;
        u.forEach(function(e) {
            this[e] = function() {
                var i = new this.constructor(this);
                return t.children.push(i), i[e].apply(i, arguments)
            }
        }, this)
    }, d.prototype._init = function(t) {
        var e = this._baseState;
        a(null === e.parent), t.call(this), e.children = e.children.filter(function(t) {
            return t._baseState.parent === this
        }, this), a.equal(e.children.length, 1, "Root node can have only one child")
    }, d.prototype._useArgs = function(t) {
        var e = this._baseState,
            i = t.filter(function(t) {
                return t instanceof this.constructor
            }, this);
        t = t.filter(function(t) {
            return !(t instanceof this.constructor)
        }, this), 0 !== i.length && (a(null === e.children), e.children = i, i.forEach(function(t) {
            t._baseState.parent = this
        }, this)), 0 !== t.length && (a(null === e.args), e.args = t, e.reverseArgs = t.map(function(t) {
            if ("object" != typeof t || t.constructor !== Object) return t;
            var e = {};
            return Object.keys(t).forEach(function(i) {
                i == (0 | i) && (i |= 0);
                var r = t[i];
                e[r] = i
            }), e
        }))
    }, ["_peekTag", "_decodeTag", "_use", "_decodeStr", "_decodeObjid", "_decodeTime", "_decodeNull", "_decodeInt", "_decodeBool", "_decodeList", "_encodeComposite", "_encodeStr", "_encodeObjid", "_encodeTime", "_encodeNull", "_encodeInt", "_encodeBool"].forEach(function(t) {
        d.prototype[t] = function() {
            var e = this._baseState;
            throw new Error(t + " not implemented for encoding: " + e.enc)
        }
    }), s.forEach(function(t) {
        d.prototype[t] = function() {
            var e = this._baseState,
                i = Array.prototype.slice.call(arguments);
            return a(null === e.tag), e.tag = t, this._useArgs(i), this
        }
    }), d.prototype.use = function(t) {
        a(t);
        var e = this._baseState;
        return a(null === e.use), e.use = t, this
    }, d.prototype.optional = function() {
        return this._baseState.optional = !0, this
    }, d.prototype.def = function(t) {
        var e = this._baseState;
        return a(null === e.default), e.default = t, e.optional = !0, this
    }, d.prototype.explicit = function(t) {
        var e = this._baseState;
        return a(null === e.explicit && null === e.implicit), e.explicit = t, this
    }, d.prototype.implicit = function(t) {
        var e = this._baseState;
        return a(null === e.explicit && null === e.implicit), e.implicit = t, this
    }, d.prototype.obj = function() {
        var t = this._baseState,
            e = Array.prototype.slice.call(arguments);
        return t.obj = !0, 0 !== e.length && this._useArgs(e), this
    }, d.prototype.key = function(t) {
        var e = this._baseState;
        return a(null === e.key), e.key = t, this
    }, d.prototype.any = function() {
        return this._baseState.any = !0, this
    }, d.prototype.choice = function(t) {
        var e = this._baseState;
        return a(null === e.choice), e.choice = t, this._useArgs(Object.keys(t).map(function(e) {
            return t[e]
        })), this
    }, d.prototype.contains = function(t) {
        var e = this._baseState;
        return a(null === e.use), e.contains = t, this
    }, d.prototype._decode = function(t, e) {
        var i = this._baseState;
        if (null === i.parent) return t.wrapResult(i.children[0]._decode(t, e));
        var r, n = i.default,
            a = !0,
            s = null;
        if (null !== i.key && (s = t.enterKey(i.key)), i.optional) {
            var u = null;
            if (null !== i.explicit ? u = i.explicit : null !== i.implicit ? u = i.implicit : null !== i.tag && (u = i.tag), null !== u || i.any) {
                if (a = this._peekTag(t, u, i.any), t.isError(a)) return a
            } else {
                var d = t.save();
                try {
                    null === i.choice ? this._decodeGeneric(i.tag, t, e) : this._decodeChoice(t, e), a = !0
                } catch (t) {
                    a = !1
                }
                t.restore(d)
            }
        }
        if (i.obj && a && (r = t.enterObject()), a) {
            if (null !== i.explicit) {
                var c = this._decodeTag(t, i.explicit);
                if (t.isError(c)) return c;
                t = c
            }
            var f = t.offset;
            if (null === i.use && null === i.choice) {
                if (i.any) d = t.save();
                var l = this._decodeTag(t, null !== i.implicit ? i.implicit : i.tag, i.any);
                if (t.isError(l)) return l;
                i.any ? n = t.raw(d) : t = l
            }
            if (e && e.track && null !== i.tag && e.track(t.path(), f, t.length, "tagged"), e && e.track && null !== i.tag && e.track(t.path(), t.offset, t.length, "content"), n = i.any ? n : null === i.choice ? this._decodeGeneric(i.tag, t, e) : this._decodeChoice(t, e), t.isError(n)) return n;
            if (i.any || null !== i.choice || null === i.children || i.children.forEach(function(i) {
                    i._decode(t, e)
                }), i.contains && ("octstr" === i.tag || "bitstr" === i.tag)) {
                var h = new o(n);
                n = this._getUse(i.contains, t._reporterState.obj)._decode(h, e)
            }
        }
        return i.obj && a && (n = t.leaveObject(r)), null === i.key || null === n && !0 !== a ? null !== s && t.exitKey(s) : t.leaveKey(s, i.key, n), n
    }, d.prototype._decodeGeneric = function(t, e, i) {
        var r = this._baseState;
        return "seq" === t || "set" === t ? null : "seqof" === t || "setof" === t ? this._decodeList(e, t, r.args[0], i) : /str$/.test(t) ? this._decodeStr(e, t, i) : "objid" === t && r.args ? this._decodeObjid(e, r.args[0], r.args[1], i) : "objid" === t ? this._decodeObjid(e, null, null, i) : "gentime" === t || "utctime" === t ? this._decodeTime(e, t, i) : "null_" === t ? this._decodeNull(e, i) : "bool" === t ? this._decodeBool(e, i) : "objDesc" === t ? this._decodeStr(e, t, i) : "int" === t || "enum" === t ? this._decodeInt(e, r.args && r.args[0], i) : null !== r.use ? this._getUse(r.use, e._reporterState.obj)._decode(e, i) : e.error("unknown tag: " + t)
    }, d.prototype._getUse = function(t, e) {
        var i = this._baseState;
        return i.useDecoder = this._use(t, e), a(null === i.useDecoder._baseState.parent), i.useDecoder = i.useDecoder._baseState.children[0], i.implicit !== i.useDecoder._baseState.implicit && (i.useDecoder = i.useDecoder.clone(), i.useDecoder._baseState.implicit = i.implicit), i.useDecoder
    }, d.prototype._decodeChoice = function(t, e) {
        var i = this._baseState,
            r = null,
            n = !1;
        return Object.keys(i.choice).some(function(o) {
            var a = t.save(),
                s = i.choice[o];
            try {
                var u = s._decode(t, e);
                if (t.isError(u)) return !1;
                r = {
                    type: o,
                    value: u
                }, n = !0
            } catch (e) {
                return t.restore(a), !1
            }
            return !0
        }, this), n ? r : t.error("Choice not matched")
    }, d.prototype._createEncoderBuffer = function(t) {
        return new n(t, this.reporter)
    }, d.prototype._encode = function(t, e, i) {
        var r = this._baseState;
        if (null === r.default || r.default !== t) {
            var n = this._encodeValue(t, e, i);
            if (void 0 !== n && !this._skipDefault(n, e, i)) return n
        }
    }, d.prototype._encodeValue = function(t, e, i) {
        var n = this._baseState;
        if (null === n.parent) return n.children[0]._encode(t, e || new r);
        var o = null;
        if (this.reporter = e, n.optional && void 0 === t) {
            if (null === n.default) return;
            t = n.default
        }
        var a = null,
            s = !1;
        if (n.any) o = this._createEncoderBuffer(t);
        else if (n.choice) o = this._encodeChoice(t, e);
        else if (n.contains) a = this._getUse(n.contains, i)._encode(t, e), s = !0;
        else if (n.children) a = n.children.map(function(i) {
            if ("null_" === i._baseState.tag) return i._encode(null, e, t);
            if (null === i._baseState.key) return e.error("Child should have a key");
            var r = e.enterKey(i._baseState.key);
            if ("object" != typeof t) return e.error("Child expected, but input is not object");
            var n = i._encode(t[i._baseState.key], e, t);
            return e.leaveKey(r), n
        }, this).filter(function(t) {
            return t
        }), a = this._createEncoderBuffer(a);
        else if ("seqof" === n.tag || "setof" === n.tag) {
            if (!n.args || 1 !== n.args.length) return e.error("Too many args for : " + n.tag);
            if (!Array.isArray(t)) return e.error("seqof/setof, but data is not Array");
            var u = this.clone();
            u._baseState.implicit = null, a = this._createEncoderBuffer(t.map(function(i) {
                var r = this._baseState;
                return this._getUse(r.args[0], t)._encode(i, e)
            }, u))
        } else null !== n.use ? o = this._getUse(n.use, i)._encode(t, e) : (a = this._encodePrimitive(n.tag, t), s = !0);
        if (!n.any && null === n.choice) {
            var d = null !== n.implicit ? n.implicit : n.tag,
                c = null === n.implicit ? "universal" : "context";
            null === d ? null === n.use && e.error("Tag could be omitted only for .use()") : null === n.use && (o = this._encodeComposite(d, s, c, a))
        }
        return null !== n.explicit && (o = this._encodeComposite(n.explicit, !1, "context", o)), o
    }, d.prototype._encodeChoice = function(t, e) {
        var i = this._baseState,
            r = i.choice[t.type];
        return r || a(!1, t.type + " not found in " + JSON.stringify(Object.keys(i.choice))), r._encode(t.value, e)
    }, d.prototype._encodePrimitive = function(t, e) {
        var i = this._baseState;
        if (/str$/.test(t)) return this._encodeStr(e, t);
        if ("objid" === t && i.args) return this._encodeObjid(e, i.reverseArgs[0], i.args[1]);
        if ("objid" === t) return this._encodeObjid(e, null, null);
        if ("gentime" === t || "utctime" === t) return this._encodeTime(e, t);
        if ("null_" === t) return this._encodeNull();
        if ("int" === t || "enum" === t) return this._encodeInt(e, i.args && i.reverseArgs[0]);
        if ("bool" === t) return this._encodeBool(e);
        if ("objDesc" === t) return this._encodeStr(e, t);
        throw new Error("Unsupported tag: " + t)
    }, d.prototype._isNumstr = function(t) {
        return /^[0-9 ]*$/.test(t)
    }, d.prototype._isPrintstr = function(t) {
        return /^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test(t)
    }
}, , , function(t, e, i) {
    var r = i(307).Buffer;

    function n(t) {
        r.isBuffer(t) || (t = r.from(t));
        for (var e = t.length / 4 | 0, i = new Array(e), n = 0; n < e; n++) i[n] = t.readUInt32BE(4 * n);
        return i
    }

    function o(t) {
        for (; 0 < t.length; t++) t[0] = 0
    }

    function a(t, e, i, r, n) {
        for (var o, a, s, u, d = i[0], c = i[1], f = i[2], l = i[3], h = t[0] ^ e[0], p = t[1] ^ e[1], _ = t[2] ^ e[2], y = t[3] ^ e[3], b = 4, g = 1; g < n; g++) o = d[h >>> 24] ^ c[p >>> 16 & 255] ^ f[_ >>> 8 & 255] ^ l[255 & y] ^ e[b++], a = d[p >>> 24] ^ c[_ >>> 16 & 255] ^ f[y >>> 8 & 255] ^ l[255 & h] ^ e[b++], s = d[_ >>> 24] ^ c[y >>> 16 & 255] ^ f[h >>> 8 & 255] ^ l[255 & p] ^ e[b++], u = d[y >>> 24] ^ c[h >>> 16 & 255] ^ f[p >>> 8 & 255] ^ l[255 & _] ^ e[b++], h = o, p = a, _ = s, y = u;
        return o = (r[h >>> 24] << 24 | r[p >>> 16 & 255] << 16 | r[_ >>> 8 & 255] << 8 | r[255 & y]) ^ e[b++], a = (r[p >>> 24] << 24 | r[_ >>> 16 & 255] << 16 | r[y >>> 8 & 255] << 8 | r[255 & h]) ^ e[b++], s = (r[_ >>> 24] << 24 | r[y >>> 16 & 255] << 16 | r[h >>> 8 & 255] << 8 | r[255 & p]) ^ e[b++], u = (r[y >>> 24] << 24 | r[h >>> 16 & 255] << 16 | r[p >>> 8 & 255] << 8 | r[255 & _]) ^ e[b++], [o >>>= 0, a >>>= 0, s >>>= 0, u >>>= 0]
    }
    var s = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
        u = function() {
            for (var t = new Array(256), e = 0; e < 256; e++) t[e] = e < 128 ? e << 1 : e << 1 ^ 283;
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
                ], a = 0, s = 0, u = 0; u < 256; ++u) {
                var d = s ^ s << 1 ^ s << 2 ^ s << 3 ^ s << 4;
                d = d >>> 8 ^ 255 & d ^ 99, i[a] = d, r[d] = a;
                var c = t[a],
                    f = t[c],
                    l = t[f],
                    h = 257 * t[d] ^ 16843008 * d;
                n[0][a] = h << 24 | h >>> 8, n[1][a] = h << 16 | h >>> 16, n[2][a] = h << 8 | h >>> 24, n[3][a] = h, h = 16843009 * l ^ 65537 * f ^ 257 * c ^ 16843008 * a, o[0][d] = h << 24 | h >>> 8, o[1][d] = h << 16 | h >>> 16, o[2][d] = h << 8 | h >>> 24, o[3][d] = h, 0 === a ? a = s = 1 : (a = c ^ t[t[t[l ^ c]]], s ^= t[t[s]])
            }
            return {
                SBOX: i,
                INV_SBOX: r,
                SUB_MIX: n,
                INV_SUB_MIX: o
            }
        }();

    function d(t) {
        this._key = n(t), this._reset()
    }
    d.blockSize = 16, d.keySize = 32, d.prototype.blockSize = d.blockSize, d.prototype.keySize = d.keySize, d.prototype._reset = function() {
        for (var t = this._key, e = t.length, i = e + 6, r = 4 * (i + 1), n = [], o = 0; o < e; o++) n[o] = t[o];
        for (o = e; o < r; o++) {
            var a = n[o - 1];
            o % e == 0 ? (a = a << 8 | a >>> 24, a = u.SBOX[a >>> 24] << 24 | u.SBOX[a >>> 16 & 255] << 16 | u.SBOX[a >>> 8 & 255] << 8 | u.SBOX[255 & a], a ^= s[o / e | 0] << 24) : e > 6 && o % e == 4 && (a = u.SBOX[a >>> 24] << 24 | u.SBOX[a >>> 16 & 255] << 16 | u.SBOX[a >>> 8 & 255] << 8 | u.SBOX[255 & a]), n[o] = n[o - e] ^ a
        }
        for (var d = [], c = 0; c < r; c++) {
            var f = r - c,
                l = n[f - (c % 4 ? 0 : 4)];
            d[c] = c < 4 || f <= 4 ? l : u.INV_SUB_MIX[0][u.SBOX[l >>> 24]] ^ u.INV_SUB_MIX[1][u.SBOX[l >>> 16 & 255]] ^ u.INV_SUB_MIX[2][u.SBOX[l >>> 8 & 255]] ^ u.INV_SUB_MIX[3][u.SBOX[255 & l]]
        }
        this._nRounds = i, this._keySchedule = n, this._invKeySchedule = d
    }, d.prototype.encryptBlockRaw = function(t) {
        return a(t = n(t), this._keySchedule, u.SUB_MIX, u.SBOX, this._nRounds)
    }, d.prototype.encryptBlock = function(t) {
        var e = this.encryptBlockRaw(t),
            i = r.allocUnsafe(16);
        return i.writeUInt32BE(e[0], 0), i.writeUInt32BE(e[1], 4), i.writeUInt32BE(e[2], 8), i.writeUInt32BE(e[3], 12), i
    }, d.prototype.decryptBlock = function(t) {
        var e = (t = n(t))[1];
        t[1] = t[3], t[3] = e;
        var i = a(t, this._invKeySchedule, u.INV_SUB_MIX, u.INV_SBOX, this._nRounds),
            o = r.allocUnsafe(16);
        return o.writeUInt32BE(i[0], 0), o.writeUInt32BE(i[3], 4), o.writeUInt32BE(i[2], 8), o.writeUInt32BE(i[1], 12), o
    }, d.prototype.scrub = function() {
        o(this._keySchedule), o(this._invKeySchedule), o(this._key)
    }, t.exports.AES = d
}, , , , function(t, e, i) {
    (function(e) {
        var r = i(218),
            n = i(329).ec,
            o = i(294),
            a = i(4);

        function s(t, e) {
            if (t.cmpn(0) <= 0) throw new Error("invalid sig");
            if (t.cmp(e) >= e) throw new Error("invalid sig")
        }
        t.exports = function(t, i, u, d, c) {
            var f = o(u);
            if ("ec" === f.type) {
                if ("ecdsa" !== d && "ecdsa/rsa" !== d) throw new Error("wrong public key type");
                return function(t, e, i) {
                    var r = a[i.data.algorithm.curve.join(".")];
                    if (!r) throw new Error("unknown curve " + i.data.algorithm.curve.join("."));
                    var o = new n(r),
                        s = i.data.subjectPrivateKey.data;
                    return o.verify(e, t, s)
                }(t, i, f)
            }
            if ("dsa" === f.type) {
                if ("dsa" !== d) throw new Error("wrong public key type");
                return function(t, e, i) {
                    var n = i.data.p,
                        a = i.data.q,
                        u = i.data.g,
                        d = i.data.pub_key,
                        c = o.signature.decode(t, "der"),
                        f = c.s,
                        l = c.r;
                    s(f, a), s(l, a);
                    var h = r.mont(n),
                        p = f.invm(a);
                    return 0 === u.toRed(h).redPow(new r(e).mul(p).mod(a)).fromRed().mul(d.toRed(h).redPow(l.mul(p).mod(a)).fromRed()).mod(n).mod(a).cmp(l)
                }(t, i, f)
            }
            if ("rsa" !== d && "ecdsa/rsa" !== d) throw new Error("wrong public key type");
            i = e.concat([c, i]);
            for (var l = f.modulus.byteLength(), h = [1], p = 0; i.length + h.length + 2 < l;) h.push(255), p++;
            h.push(0);
            for (var _ = -1; ++_ < i.length;) h.push(i[_]);
            h = new e(h);
            var y = r.mont(f.modulus);
            t = (t = new r(t).toRed(y)).redPow(new r(f.publicExponent)), t = new e(t.fromRed().toArray());
            var b = p < 8 ? 1 : 0;
            for (l = Math.min(t.length, h.length), t.length !== h.length && (b = 1), _ = -1; ++_ < l;) b |= t[_] ^ h[_];
            return 0 === b
        }
    }).call(this, i(315).Buffer)
}, function(t, e, i) {
    var r = i(307).Buffer,
        n = r.alloc(16, 0);

    function o(t) {
        var e = r.allocUnsafe(16);
        return e.writeUInt32BE(t[0] >>> 0, 0), e.writeUInt32BE(t[1] >>> 0, 4), e.writeUInt32BE(t[2] >>> 0, 8), e.writeUInt32BE(t[3] >>> 0, 12), e
    }

    function a(t) {
        this.h = t, this.state = r.alloc(16, 0), this.cache = r.allocUnsafe(0)
    }
    a.prototype.ghash = function(t) {
        for (var e = -1; ++e < t.length;) this.state[e] ^= t[e];
        this._multiply()
    }, a.prototype._multiply = function() {
        for (var t, e, i, r = [(t = this.h).readUInt32BE(0), t.readUInt32BE(4), t.readUInt32BE(8), t.readUInt32BE(12)], n = [0, 0, 0, 0], a = -1; ++a < 128;) {
            for (0 != (this.state[~~(a / 8)] & 1 << 7 - a % 8) && (n[0] ^= r[0], n[1] ^= r[1], n[2] ^= r[2], n[3] ^= r[3]), i = 0 != (1 & r[3]), e = 3; e > 0; e--) r[e] = r[e] >>> 1 | (1 & r[e - 1]) << 31;
            r[0] = r[0] >>> 1, i && (r[0] = r[0] ^ 225 << 24)
        }
        this.state = o(n)
    }, a.prototype.update = function(t) {
        var e;
        for (this.cache = r.concat([this.cache, t]); this.cache.length >= 16;) e = this.cache.slice(0, 16), this.cache = this.cache.slice(16), this.ghash(e)
    }, a.prototype.final = function(t, e) {
        return this.cache.length && this.ghash(r.concat([this.cache, n], 16)), this.ghash(o([0, t, 0, e])), this.state
    }, t.exports = a
}, , , , , , , function(t, e, i) {
    "use strict";
    var r = i(498),
        n = i(329),
        o = n.utils,
        a = o.assert,
        s = o.parseBytes,
        u = i(351),
        d = i(669);

    function c(t) {
        if (a("ed25519" === t, "only tested with ed25519 so far"), !(this instanceof c)) return new c(t);
        t = n.curves[t].curve;
        this.curve = t, this.g = t.g, this.g.precompute(t.n.bitLength() + 1), this.pointClass = t.point().constructor, this.encodingLength = Math.ceil(t.n.bitLength() / 8), this.hash = r.sha512
    }
    t.exports = c, c.prototype.sign = function(t, e) {
        t = s(t);
        var i = this.keyFromSecret(e),
            r = this.hashInt(i.messagePrefix(), t),
            n = this.g.mul(r),
            o = this.encodePoint(n),
            a = this.hashInt(o, i.pubBytes(), t).mul(i.priv()),
            u = r.add(a).umod(this.curve.n);
        return this.makeSignature({
            R: n,
            S: u,
            Rencoded: o
        })
    }, c.prototype.verify = function(t, e, i) {
        t = s(t), e = this.makeSignature(e);
        var r = this.keyFromPublic(i),
            n = this.hashInt(e.Rencoded(), r.pubBytes(), t),
            o = this.g.mul(e.S());
        return e.R().add(r.pub().mul(n)).eq(o)
    }, c.prototype.hashInt = function() {
        for (var t = this.hash(), e = 0; e < arguments.length; e++) t.update(arguments[e]);
        return o.intFromLE(t.digest()).umod(this.curve.n)
    }, c.prototype.keyFromPublic = function(t) {
        return u.fromPublic(this, t)
    }, c.prototype.keyFromSecret = function(t) {
        return u.fromSecret(this, t)
    }, c.prototype.makeSignature = function(t) {
        return t instanceof d ? t : new d(this, t)
    }, c.prototype.encodePoint = function(t) {
        var e = t.getY().toArray("le", this.encodingLength);
        return e[this.encodingLength - 1] |= t.getX().isOdd() ? 128 : 0, e
    }, c.prototype.decodePoint = function(t) {
        var e = (t = o.parseBytes(t)).length - 1,
            i = t.slice(0, e).concat(-129 & t[e]),
            r = 0 != (128 & t[e]),
            n = o.intFromLE(i);
        return this.curve.pointFromY(n, r)
    }, c.prototype.encodeInt = function(t) {
        return t.toArray("le", this.encodingLength)
    }, c.prototype.decodeInt = function(t) {
        return o.intFromLE(t)
    }, c.prototype.isPoint = function(t) {
        return t instanceof this.pointClass
    }
}, , , , , function(t, e, i) {
    "use strict";

    function r(t, e) {
        if (!window.Worker || !window.Blob) return setTimeout(t, e);
        var i = new Blob(["\n      var timeout;\n      onmessage = function(e) {\n        clearTimeout(timeout);\n        if (e.data == 'start') {\n          timeout = setTimeout(function() { postMessage({}); }, \" + delay + \");\n        }\n      }\n    "]);
        try {
            var r = new Worker(window.URL.createObjectURL(i));
            return r.onmessage = function() {
                r.terminate(), t()
            }, r.postMessage("start"), r
        } catch (i) {
            return setTimeout(t, e)
        }
    }

    function n(t) {
        if (!t) return !1;
        isNumeric(t) ? clearTimeout(t) : t.terminate()
    }
    i.r(e), i.d(e, "setWorkerTimeout", function() {
        return r
    }), i.d(e, "clearWorkerTimeout", function() {
        return n
    })
}, , , , , function(t, e, i) {
    var r = i(581),
        n = i(439),
        o = i(564),
        a = i(307).Buffer,
        s = new Array(160);

    function u() {
        this.init(), this._w = s, o.call(this, 128, 112)
    }
    r(u, n), u.prototype.init = function() {
        return this._ah = 3418070365, this._bh = 1654270250, this._ch = 2438529370, this._dh = 355462360, this._eh = 1731405415, this._fh = 2394180231, this._gh = 3675008525, this._hh = 1203062813, this._al = 3238371032, this._bl = 914150663, this._cl = 812702999, this._dl = 4144912697, this._el = 4290775857, this._fl = 1750603025, this._gl = 1694076839, this._hl = 3204075428, this
    }, u.prototype._hash = function() {
        var t = a.allocUnsafe(48);

        function e(e, i, r) {
            t.writeInt32BE(e, r), t.writeInt32BE(i, r + 4)
        }
        return e(this._ah, this._al, 0), e(this._bh, this._bl, 8), e(this._ch, this._cl, 16), e(this._dh, this._dl, 24), e(this._eh, this._el, 32), e(this._fh, this._fl, 40), t
    }, t.exports = u
}, , , function(t, e, i) {
    "use strict";

    function r(t) {
        t && each(geByClass("_audio_row", t), function() {
            domData(this, "new-post", "groups" == cur.module ? "wall" : "feed")
        })
    }
    i.r(e), i.d(e, "updateQueueReceivedPost", function() {
        return r
    })
}, , , function(t, e, i) {
    "use strict";
    var r, n = e,
        o = i(498),
        a = i(329),
        s = a.utils.assert;

    function u(t) {
        "short" === t.type ? this.curve = new a.curve.short(t) : "edwards" === t.type ? this.curve = new a.curve.edwards(t) : this.curve = new a.curve.mont(t), this.g = this.curve.g, this.n = this.curve.n, this.hash = t.hash, s(this.g.validate(), "Invalid curve"), s(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O")
    }

    function d(t, e) {
        Object.defineProperty(n, t, {
            configurable: !0,
            enumerable: !0,
            get: function() {
                var i = new u(e);
                return Object.defineProperty(n, t, {
                    configurable: !0,
                    enumerable: !0,
                    value: i
                }), i
            }
        })
    }
    n.PresetCurve = u, d("p192", {
        type: "short",
        prime: "p192",
        p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
        a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
        b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
        n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
        hash: o.sha256,
        gRed: !1,
        g: ["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]
    }), d("p224", {
        type: "short",
        prime: "p224",
        p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
        a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
        b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
        n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
        hash: o.sha256,
        gRed: !1,
        g: ["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]
    }), d("p256", {
        type: "short",
        prime: null,
        p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
        a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
        b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
        n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
        hash: o.sha256,
        gRed: !1,
        g: ["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]
    }), d("p384", {
        type: "short",
        prime: null,
        p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
        a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
        b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
        n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
        hash: o.sha384,
        gRed: !1,
        g: ["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"]
    }), d("p521", {
        type: "short",
        prime: null,
        p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
        a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
        b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
        n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
        hash: o.sha512,
        gRed: !1,
        g: ["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"]
    }), d("curve25519", {
        type: "mont",
        prime: "p25519",
        p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
        a: "76d06",
        b: "1",
        n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
        hash: o.sha256,
        gRed: !1,
        g: ["9"]
    }), d("ed25519", {
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
        r = i(501)
    } catch (t) {
        r = void 0
    }
    d("secp256k1", {
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
}, , , , function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "asObject", function() {
        return o
    });
    var r = i(24),
        n = i(247);

    function o(t) {
        if (!t) return null;
        if (isObject(t)) return t;
        if ("string" == typeof t) return {
            id: t
        };
        var e = (t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_HASHES] || "").split("/"),
            i = (t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_COVER_URL] || "").split(","),
            o = Object(n.getAudioPerformers)(t, !1);
        return {
            id: intval(t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_ID]),
            owner_id: intval(t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_OWNER_ID]),
            ownerId: t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_OWNER_ID],
            fullId: t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_ID],
            title: t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_TITLE],
            subTitle: t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_SUBTITLE],
            performer: o,
            duration: intval(t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_DURATION]),
            lyrics: intval(t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_LYRICS]),
            url: t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_URL],
            flags: t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_FLAGS],
            context: t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_CONTEXT],
            extra: t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_EXTRA],
            addHash: e[0] || "",
            editHash: e[1] || "",
            actionHash: e[2] || "",
            deleteHash: e[3] || "",
            replaceHash: e[4] || "",
            urlHash: e[5] || "",
            restoreHash: e[6] || "",
            canEdit: !!e[1],
            canDelete: !!e[3],
            isLongPerformer: t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_FLAGS] & r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_LONG_PERFORMER_BIT,
            canAdd: !!(t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_FLAGS] & r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_CAN_ADD_BIT),
            coverUrl_s: i[0],
            coverUrl_p: i[1],
            isClaimed: !!(t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_FLAGS] & r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_CLAIMED_BIT),
            isExplicit: !!(t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_FLAGS] & r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_EXPLICIT_BIT),
            isUMA: !!(t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_FLAGS] & r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_UMA_BIT),
            isReplaceable: !!(t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_FLAGS] & r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_REPLACEABLE),
            ads: t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_ADS],
            album: t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_ALBUM],
            albumId: intval(t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_ALBUM_ID]),
            albumPart: intval(t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_ALBUM_PART]),
            trackCode: t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_TRACK_CODE],
            restrictionStatus: t[r.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_RESTRICTION]
        }
    }
}, , , , function(t, e, i) {
    (function(e) {
        var i = Math.pow(2, 30) - 1;

        function r(t, i) {
            if ("string" != typeof t && !e.isBuffer(t)) throw new TypeError(i + " must be a buffer or string")
        }
        t.exports = function(t, e, n, o) {
            if (r(t, "Password"), r(e, "Salt"), "number" != typeof n) throw new TypeError("Iterations not a number");
            if (n < 0) throw new TypeError("Bad iterations");
            if ("number" != typeof o) throw new TypeError("Key length not a number");
            if (o < 0 || o > i || o != o) throw new TypeError("Bad key length")
        }
    }).call(this, i(315).Buffer)
}, , , , , , , function(t, e, i) {
    "use strict";
    (function(e, r, n) {
        var o = i(226);

        function a(t) {
            var e = this;
            this.next = null, this.entry = null, this.finish = function() {
                ! function(t, e, i) {
                    var r = t.entry;
                    t.entry = null;
                    for (; r;) {
                        var n = r.callback;
                        e.pendingcb--, n(i), r = r.next
                    }
                    e.corkedRequestsFree ? e.corkedRequestsFree.next = t : e.corkedRequestsFree = t
                }(e, t)
            }
        }
        t.exports = g;
        var s, u = !e.browser && ["v0.10", "v0.9."].indexOf(e.version.slice(0, 5)) > -1 ? r : o.nextTick;
        g.WritableState = b;
        var d = i(192);
        d.inherits = i(581);
        var c = {
                deprecate: i(653)
            },
            f = i(588),
            l = i(307).Buffer,
            h = n.Uint8Array || function() {};
        var p, _ = i(81);

        function y() {}

        function b(t, e) {
            s = s || i(274), t = t || {};
            var r = e instanceof s;
            this.objectMode = !!t.objectMode, r && (this.objectMode = this.objectMode || !!t.writableObjectMode);
            var n = t.highWaterMark,
                d = t.writableHighWaterMark,
                c = this.objectMode ? 16 : 16384;
            this.highWaterMark = n || 0 === n ? n : r && (d || 0 === d) ? d : c, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
            var f = !1 === t.decodeStrings;
            this.decodeStrings = !f, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(t) {
                ! function(t, e) {
                    var i = t._writableState,
                        r = i.sync,
                        n = i.writecb;
                    if (function(t) {
                            t.writing = !1, t.writecb = null, t.length -= t.writelen, t.writelen = 0
                        }(i), e) ! function(t, e, i, r, n) {
                        --e.pendingcb, i ? (o.nextTick(n, r), o.nextTick(P, t, e), t._writableState.errorEmitted = !0, t.emit("error", r)) : (n(r), t._writableState.errorEmitted = !0, t.emit("error", r), P(t, e))
                    }(t, i, r, e, n);
                    else {
                        var a = w(i);
                        a || i.corked || i.bufferProcessing || !i.bufferedRequest || A(t, i), r ? u(m, t, i, a, n) : m(t, i, a, n)
                    }
                }(e, t)
            }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new a(this)
        }

        function g(t) {
            if (s = s || i(274), !(p.call(g, this) || this instanceof s)) return new g(t);
            this._writableState = new b(t, this), this.writable = !0, t && ("function" == typeof t.write && (this._write = t.write), "function" == typeof t.writev && (this._writev = t.writev), "function" == typeof t.destroy && (this._destroy = t.destroy), "function" == typeof t.final && (this._final = t.final)), f.call(this)
        }

        function v(t, e, i, r, n, o, a) {
            e.writelen = r, e.writecb = a, e.writing = !0, e.sync = !0, i ? t._writev(n, e.onwrite) : t._write(n, o, e.onwrite), e.sync = !1
        }

        function m(t, e, i, r) {
            i || function(t, e) {
                0 === e.length && e.needDrain && (e.needDrain = !1, t.emit("drain"))
            }(t, e), e.pendingcb--, r(), P(t, e)
        }

        function A(t, e) {
            e.bufferProcessing = !0;
            var i = e.bufferedRequest;
            if (t._writev && i && i.next) {
                var r = e.bufferedRequestCount,
                    n = new Array(r),
                    o = e.corkedRequestsFree;
                o.entry = i;
                for (var s = 0, u = !0; i;) n[s] = i, i.isBuf || (u = !1), i = i.next, s += 1;
                n.allBuffers = u, v(t, e, !0, e.length, n, "", o.finish), e.pendingcb++, e.lastBufferedRequest = null, o.next ? (e.corkedRequestsFree = o.next, o.next = null) : e.corkedRequestsFree = new a(e), e.bufferedRequestCount = 0
            } else {
                for (; i;) {
                    var d = i.chunk,
                        c = i.encoding,
                        f = i.callback;
                    if (v(t, e, !1, e.objectMode ? 1 : d.length, d, c, f), i = i.next, e.bufferedRequestCount--, e.writing) break
                }
                null === i && (e.lastBufferedRequest = null)
            }
            e.bufferedRequest = i, e.bufferProcessing = !1
        }

        function w(t) {
            return t.ending && 0 === t.length && null === t.bufferedRequest && !t.finished && !t.writing
        }

        function E(t, e) {
            t._final(function(i) {
                e.pendingcb--, i && t.emit("error", i), e.prefinished = !0, t.emit("prefinish"), P(t, e)
            })
        }

        function P(t, e) {
            var i = w(e);
            return i && (! function(t, e) {
                e.prefinished || e.finalCalled || ("function" == typeof t._final ? (e.pendingcb++, e.finalCalled = !0, o.nextTick(E, t, e)) : (e.prefinished = !0, t.emit("prefinish")))
            }(t, e), 0 === e.pendingcb && (e.finished = !0, t.emit("finish"))), i
        }
        d.inherits(g, f), b.prototype.getBuffer = function() {
                for (var t = this.bufferedRequest, e = []; t;) e.push(t), t = t.next;
                return e
            },
            function() {
                try {
                    Object.defineProperty(b.prototype, "buffer", {
                        get: c.deprecate(function() {
                            return this.getBuffer()
                        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                    })
                } catch (t) {}
            }(), "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (p = Function.prototype[Symbol.hasInstance], Object.defineProperty(g, Symbol.hasInstance, {
                value: function(t) {
                    return !!p.call(this, t) || this === g && (t && t._writableState instanceof b)
                }
            })) : p = function(t) {
                return t instanceof this
            }, g.prototype.pipe = function() {
                this.emit("error", new Error("Cannot pipe, not readable"))
            }, g.prototype.write = function(t, e, i) {
                var r, n = this._writableState,
                    a = !1,
                    s = !n.objectMode && (r = t, l.isBuffer(r) || r instanceof h);
                return s && !l.isBuffer(t) && (t = function(t) {
                    return l.from(t)
                }(t)), "function" == typeof e && (i = e, e = null), s ? e = "buffer" : e || (e = n.defaultEncoding), "function" != typeof i && (i = y), n.ended ? function(t, e) {
                    var i = new Error("write after end");
                    t.emit("error", i), o.nextTick(e, i)
                }(this, i) : (s || function(t, e, i, r) {
                    var n = !0,
                        a = !1;
                    return null === i ? a = new TypeError("May not write null values to stream") : "string" == typeof i || void 0 === i || e.objectMode || (a = new TypeError("Invalid non-string/buffer chunk")), a && (t.emit("error", a), o.nextTick(r, a), n = !1), n
                }(this, n, t, i)) && (n.pendingcb++, a = function(t, e, i, r, n, o) {
                    if (!i) {
                        var a = function(t, e, i) {
                            t.objectMode || !1 === t.decodeStrings || "string" != typeof e || (e = l.from(e, i));
                            return e
                        }(e, r, n);
                        r !== a && (i = !0, n = "buffer", r = a)
                    }
                    var s = e.objectMode ? 1 : r.length;
                    e.length += s;
                    var u = e.length < e.highWaterMark;
                    u || (e.needDrain = !0);
                    if (e.writing || e.corked) {
                        var d = e.lastBufferedRequest;
                        e.lastBufferedRequest = {
                            chunk: r,
                            encoding: n,
                            isBuf: i,
                            callback: o,
                            next: null
                        }, d ? d.next = e.lastBufferedRequest : e.bufferedRequest = e.lastBufferedRequest, e.bufferedRequestCount += 1
                    } else v(t, e, !1, s, r, n, o);
                    return u
                }(this, n, s, t, e, i)), a
            }, g.prototype.cork = function() {
                this._writableState.corked++
            }, g.prototype.uncork = function() {
                var t = this._writableState;
                t.corked && (t.corked--, t.writing || t.corked || t.finished || t.bufferProcessing || !t.bufferedRequest || A(this, t))
            }, g.prototype.setDefaultEncoding = function(t) {
                if ("string" == typeof t && (t = t.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((t + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + t);
                return this._writableState.defaultEncoding = t, this
            }, Object.defineProperty(g.prototype, "writableHighWaterMark", {
                enumerable: !1,
                get: function() {
                    return this._writableState.highWaterMark
                }
            }), g.prototype._write = function(t, e, i) {
                i(new Error("_write() is not implemented"))
            }, g.prototype._writev = null, g.prototype.end = function(t, e, i) {
                var r = this._writableState;
                "function" == typeof t ? (i = t, t = null, e = null) : "function" == typeof e && (i = e, e = null), null !== t && void 0 !== t && this.write(t, e), r.corked && (r.corked = 1, this.uncork()), r.ending || r.finished || function(t, e, i) {
                    e.ending = !0, P(t, e), i && (e.finished ? o.nextTick(i) : t.once("finish", i));
                    e.ended = !0, t.writable = !1
                }(this, r, i)
            }, Object.defineProperty(g.prototype, "destroyed", {
                get: function() {
                    return void 0 !== this._writableState && this._writableState.destroyed
                },
                set: function(t) {
                    this._writableState && (this._writableState.destroyed = t)
                }
            }), g.prototype.destroy = _.destroy, g.prototype._undestroy = _.undestroy, g.prototype._destroy = function(t, e) {
                this.end(), e(t)
            }
    }).call(this, i(210), i(179).setImmediate, i(186))
}, function(t, e, i) {
    var r = i(378),
        n = i(724),
        o = i(307).Buffer,
        a = i(722),
        s = i(189),
        u = i(511),
        d = i(674);

    function c(t, e, i) {
        s.call(this), this._cache = new l, this._cipher = new u.AES(e), this._prev = o.from(i), this._mode = t, this._autopadding = !0
    }
    i(581)(c, s), c.prototype._update = function(t) {
        var e, i;
        this._cache.add(t);
        for (var r = []; e = this._cache.get();) i = this._mode.encrypt(this, e), r.push(i);
        return o.concat(r)
    };
    var f = o.alloc(16, 16);

    function l() {
        this.cache = o.allocUnsafe(0)
    }

    function h(t, e, i) {
        var s = r[t.toLowerCase()];
        if (!s) throw new TypeError("invalid suite type");
        if ("string" == typeof e && (e = o.from(e)), e.length !== s.key / 8) throw new TypeError("invalid key length " + e.length);
        if ("string" == typeof i && (i = o.from(i)), "GCM" !== s.mode && i.length !== s.iv) throw new TypeError("invalid iv length " + i.length);
        return "stream" === s.type ? new a(s.module, e, i) : "auth" === s.type ? new n(s.module, e, i) : new c(s.module, e, i)
    }
    c.prototype._final = function() {
        var t = this._cache.flush();
        if (this._autopadding) return t = this._mode.encrypt(this, t), this._cipher.scrub(), t;
        if (!t.equals(f)) throw this._cipher.scrub(), new Error("data not multiple of block length")
    }, c.prototype.setAutoPadding = function(t) {
        return this._autopadding = !!t, this
    }, l.prototype.add = function(t) {
        this.cache = o.concat([this.cache, t])
    }, l.prototype.get = function() {
        if (this.cache.length > 15) {
            var t = this.cache.slice(0, 16);
            return this.cache = this.cache.slice(16), t
        }
        return null
    }, l.prototype.flush = function() {
        for (var t = 16 - this.cache.length, e = o.allocUnsafe(t), i = -1; ++i < t;) e.writeUInt8(t, i);
        return o.concat([this.cache, e])
    }, e.createCipheriv = h, e.createCipher = function(t, e) {
        var i = r[t.toLowerCase()];
        if (!i) throw new TypeError("invalid suite type");
        var n = d(e, !1, i.key, i.iv);
        return h(t, n.key, n.iv)
    }
}, function(t, e, i) {
    "use strict";
    var r = i(307).Buffer,
        n = i(561).Transform;

    function o(t) {
        n.call(this), this._block = r.allocUnsafe(t), this._blockSize = t, this._blockOffset = 0, this._length = [0, 0, 0, 0], this._finalized = !1
    }
    i(581)(o, n), o.prototype._transform = function(t, e, i) {
        var r = null;
        try {
            this.update(t, e)
        } catch (t) {
            r = t
        }
        i(r)
    }, o.prototype._flush = function(t) {
        var e = null;
        try {
            this.push(this.digest())
        } catch (t) {
            e = t
        }
        t(e)
    }, o.prototype.update = function(t, e) {
        if (function(t, e) {
                if (!r.isBuffer(t) && "string" != typeof t) throw new TypeError(e + " must be a string or a buffer")
            }(t, "Data"), this._finalized) throw new Error("Digest already called");
        r.isBuffer(t) || (t = r.from(t, e));
        for (var i = this._block, n = 0; this._blockOffset + t.length - n >= this._blockSize;) {
            for (var o = this._blockOffset; o < this._blockSize;) i[o++] = t[n++];
            this._update(), this._blockOffset = 0
        }
        for (; n < t.length;) i[this._blockOffset++] = t[n++];
        for (var a = 0, s = 8 * t.length; s > 0; ++a) this._length[a] += s, (s = this._length[a] / 4294967296 | 0) > 0 && (this._length[a] -= 4294967296 * s);
        return this
    }, o.prototype._update = function() {
        throw new Error("_update is not implemented")
    }, o.prototype.digest = function(t) {
        if (this._finalized) throw new Error("Digest already called");
        this._finalized = !0;
        var e = this._digest();
        void 0 !== t && (e = e.toString(t)), this._block.fill(0), this._blockOffset = 0;
        for (var i = 0; i < 4; ++i) this._length[i] = 0;
        return e
    }, o.prototype._digest = function() {
        throw new Error("_digest is not implemented")
    }, t.exports = o
}, , , , function(t, e, i) {
    "use strict";

    function r(t) {
        data(t, "leaved", !0);
        var e = data(t, "tt");
        if ((!e || !e.isShown()) && (clearTimeout(window.audioRowHoverTO), data(t, "actions"))) {
            var i = geByClass1("_audio_row__actions", t),
                r = geByClass1("_audio_row__duration", t);
            re(i), setStyle(r, "visibility", "visible"), data(t, "actions", 0)
        }
    }
    i.r(e), i.d(e, "onRowLeave", function() {
        return r
    })
}, function(t, e, i) {
    t.exports = n;
    var r = i(634).EventEmitter;

    function n() {
        r.call(this)
    }
    i(581)(n, r), n.Readable = i(389), n.Writable = i(689), n.Duplex = i(591), n.Transform = i(26), n.PassThrough = i(191), n.Stream = n, n.prototype.pipe = function(t, e) {
        var i = this;

        function n(e) {
            t.writable && !1 === t.write(e) && i.pause && i.pause()
        }

        function o() {
            i.readable && i.resume && i.resume()
        }
        i.on("data", n), t.on("drain", o), t._isStdio || e && !1 === e.end || (i.on("end", s), i.on("close", u));
        var a = !1;

        function s() {
            a || (a = !0, t.end())
        }

        function u() {
            a || (a = !0, "function" == typeof t.destroy && t.destroy())
        }

        function d(t) {
            if (c(), 0 === r.listenerCount(this, "error")) throw t
        }

        function c() {
            i.removeListener("data", n), t.removeListener("drain", o), i.removeListener("end", s), i.removeListener("close", u), i.removeListener("error", d), t.removeListener("error", d), i.removeListener("end", c), i.removeListener("close", c), t.removeListener("close", c)
        }
        return i.on("error", d), t.on("error", d), i.on("end", c), i.on("close", c), t.on("close", c), t.emit("pipe", i), t
    }
}, , , function(t, e, i) {
    var r = i(307).Buffer;

    function n(t, e) {
        this._block = r.alloc(t), this._finalSize = e, this._blockSize = t, this._len = 0
    }
    n.prototype.update = function(t, e) {
        "string" == typeof t && (e = e || "utf8", t = r.from(t, e));
        for (var i = this._block, n = this._blockSize, o = t.length, a = this._len, s = 0; s < o;) {
            for (var u = a % n, d = Math.min(o - s, n - u), c = 0; c < d; c++) i[u + c] = t[s + c];
            s += d, (a += d) % n == 0 && this._update(i)
        }
        return this._len += o, this
    }, n.prototype.digest = function(t) {
        var e = this._len % this._blockSize;
        this._block[e] = 128, this._block.fill(0, e + 1), e >= this._finalSize && (this._update(this._block), this._block.fill(0));
        var i = 8 * this._len;
        if (i <= 4294967295) this._block.writeUInt32BE(i, this._blockSize - 4);
        else {
            var r = (4294967295 & i) >>> 0,
                n = (i - r) / 4294967296;
            this._block.writeUInt32BE(n, this._blockSize - 8), this._block.writeUInt32BE(r, this._blockSize - 4)
        }
        this._update(this._block);
        var o = this._hash();
        return t ? o.toString(t) : o
    }, n.prototype._update = function() {
        throw new Error("_update must be implemented by subclass")
    }, t.exports = n
}, , , function(t, e, i) {
    "use strict";
    var r = e;
    r.base = i(701), r.short = i(79), r.mont = i(314), r.edwards = i(39)
}, , , , , function(t, e, i) {
    "use strict";

    function r(t, e, i, r) {
        var n = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
        if (vk && vk.widget && !vk.id && window.Widgets) return Widgets.oauth(), !1;

        function o(r) {
            var n = domData(t, "text-followed"),
                o = domData(t, "text-follow");
            domData(t, "tooltip-text", r ? n : o), t.innerHTML = r ? n : o, u.setFollowed(r);
            var a = u.getAddClasses() || "";
            a = a.replace("audio_pl__followed", ""), r && (a += " audio_pl__followed"), u.mergeWith({
                addClasses: a
            }), each(geByClass("_audio_pl_" + e + "_" + i), function(e, i) {
                toggleClass(i, "audio_pl__followed", r);
                var n = i.querySelectorAll(".audio_pl_snippet__action_btn_add")[0];
                n && (n.innerHTML = t.innerHTML)
            })
        }
        var a = gpeByClass("_audio_pl", t),
            s = toggleClass(a, "audio_pl__followed"),
            u = getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, e, i);
        o(s), ajax.post("al_audio.php", {
            act: "follow_playlist",
            playlist_owner_id: e,
            playlist_id: i,
            hash: r,
            showcase: n
        }, {
            onFail: function(t) {
                return new MessageBox({
                    title: getLang("global_error")
                }).content(t).setButtons("Ok", function() {
                    curBox().hide()
                }).show(), o(!1), !0
            }
        })
    }
    i.r(e), i.d(e, "followPlaylist", function() {
        return r
    })
}, function(t, e, i) {
    "use strict";

    function r(t, e, i) {
        ajax.post("al_audio.php", {
            act: "cancel_replacement",
            hash: e,
            audio_id: t
        }), re(i)
    }
    i.r(e), i.d(e, "cancelReplacement", function() {
        return r
    })
}, , function(t, e, i) {
    "use strict";

    function r(t, e, i) {
        if (void 0 !== t.selected) cur.lastAddMedia.unchooseMedia(t.selected), t.selected = void 0, removeClass(domPN(t), "audio_selected"), t.innerHTML = e.labels.add;
        else {
            var r = cur.attachCount && cur.attachCount() || 0;
            cur.chooseMedia("audio", e.owner_id + "_" + e.id, e.info), (!cur.attachCount || cur.attachCount() > r) && cur.lastAddMedia && (t.selected = cur.lastAddMedia.chosenMedias.length - 1, addClass(domPN(t), "audio_selected"), t.innerHTML = e.labels.cancel)
        }
        return cancelEvent(i)
    }
    i.r(e), i.d(e, "chooseAudioBox", function() {
        return r
    })
}, , function(t, e, i) {
    var r = i(307).Buffer;

    function n(t, e, i) {
        var n = t._cipher.encryptBlock(t._prev)[0] ^ e;
        return t._prev = r.concat([t._prev.slice(1), r.from([i ? e : n])]), n
    }
    e.encrypt = function(t, e, i) {
        for (var o = e.length, a = r.allocUnsafe(o), s = -1; ++s < o;) a[s] = n(t, e[s], i);
        return a
    }
}, , , , function(t, e) {
    "function" == typeof Object.create ? t.exports = function(t, e) {
        t.super_ = e, t.prototype = Object.create(e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        })
    } : t.exports = function(t, e) {
        t.super_ = e;
        var i = function() {};
        i.prototype = e.prototype, t.prototype = new i, t.prototype.constructor = t
    }
}, function(t, e, i) {
    t.exports = i(104)
}, , , , function(t, e, i) {
    "use strict";

    function r(t, e) {
        if (cur.viewAsBox) return cur.viewAsBox();
        if (vk && vk.widget && !vk.id && window.Widgets) return Widgets.oauth(), !1;

        function i(e) {
            return domData(t, "in-progress", intval(e))
        }
        if (!intval(domData(t, "in-progress"))) {
            i(!0), e || (e = AudioUtils.getAudioFromEl(t, !0));
            var r = window.AudioPage && currentAudioPage(t),
                n = r && r.getOwnerId() < 0 && r.canAddToGroup() ? -r.getOwnerId() : 0,
                o = AudioUtils.getAddRestoreInfo(),
                a = o[e.fullId],
                s = geByClass1("_audio_row_" + e.fullId);
            s = s != t && s;
            var u = r && r.getPageCurrentPlaylist(),
                d = void 0,
                c = AudioUtils.getContextPlaylist(t, !0);
            c && (d = (c = AudioUtils.contextSplit(c))[0]), ("search" == d && u && u.getSearchQid() || "search" == cur.module && cur.qid) && (d = "search:external");
            var f = {
                act: "add",
                group_id: n,
                audio_owner_id: e.ownerId,
                audio_id: e.id,
                hash: e.addHash,
                from: d || "",
                track_code: e.trackCode
            };
            a ? "recom_hidden" == a.state ? (r && (r.restoreRecommendation(t), i(!1)), AudioUtils.onRowOver(t, !1, !0)) : "deleted" == a.state ? (ajax.post("al_audio.php", {
                act: "restore_audio",
                oid: e.ownerId,
                aid: e.id,
                hash: e.restoreHash,
                track_code: e.trackCode
            }, {
                onDone: function() {
                    i(!1)
                }
            }), removeClass(t, "audio_row__deleted"), delete o[e.fullId], AudioUtils.onRowOver(t, !1, !0)) : "added" == a.state && (ajax.post("al_audio.php", {
                act: "delete_audio",
                oid: a.audio.ownerId,
                aid: a.audio.id,
                hash: a.audio.deleteHash,
                track_code: e.trackCode
            }, {
                onDone: function() {
                    r && getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, n ? -n : vk.id, AudioPlaylist.DEFAULT_PLAYLIST_ID).removeAudio(a.addedFullId);
                    i(!1)
                }
            }), removeClass(t, "audio_row__added"), s && removeClass(s, "audio_row__added"), delete o[e.fullId], getAudioPlayer().notify(AudioPlayer.EVENT_REMOVED, e.fullId, a.addedFullId)) : (ajax.post("al_audio.php", f, {
                onDone: function(t) {
                    if (t) {
                        var r = t[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + t[AudioUtils.AUDIO_ITEM_INDEX_ID];
                        o[e.fullId] = {
                            state: "added",
                            addedFullId: r,
                            audio: AudioUtils.asObject(t)
                        }, getAudioPlayer().getPlaylist(AudioPlaylist.TYPE_PLAYLIST, n ? -n : vk.id, AudioPlaylist.DEFAULT_PLAYLIST_ID).addAudio(t, 0), u && u.getType() == AudioPlaylist.TYPE_SEARCH && u.sendSearchStats("search_add")
                    }
                    i(!1)
                },
                onFail: function(e) {
                    return e && new MessageBox({
                        title: getLang("global_error")
                    }).content(e).setButtons("Ok", function() {
                        curBox().hide()
                    }).show(), removeClass(t, "audio_row__added"), i(!1), !0
                }
            }), addClass(t, "audio_row__added"), s && addClass(s, "audio_row__added"), getAudioPlayer().notify(AudioPlayer.EVENT_ADDED, e.fullId), r && u && r.onUserAction(e, u))
        }
    }
    i.r(e), i.d(e, "addAudio", function() {
        return r
    })
}, function(t, e, i) {
    "use strict";
    e.randomBytes = e.rng = e.pseudoRandomBytes = e.prng = i(503), e.createHash = e.Hash = i(11), e.createHmac = e.Hmac = i(609);
    var r = i(582),
        n = Object.keys(r),
        o = ["sha1", "sha224", "sha256", "sha384", "sha512", "md5", "rmd160"].concat(n);
    e.getHashes = function() {
        return o
    };
    var a = i(755);
    e.pbkdf2 = a.pbkdf2, e.pbkdf2Sync = a.pbkdf2Sync;
    var s = i(720);
    e.Cipher = s.Cipher, e.createCipher = s.createCipher, e.Cipheriv = s.Cipheriv, e.createCipheriv = s.createCipheriv, e.Decipher = s.Decipher, e.createDecipher = s.createDecipher, e.Decipheriv = s.Decipheriv, e.createDecipheriv = s.createDecipheriv, e.getCiphers = s.getCiphers, e.listCiphers = s.listCiphers;
    var u = i(139);
    e.DiffieHellmanGroup = u.DiffieHellmanGroup, e.createDiffieHellmanGroup = u.createDiffieHellmanGroup, e.getDiffieHellman = u.getDiffieHellman, e.createDiffieHellman = u.createDiffieHellman, e.DiffieHellman = u.DiffieHellman;
    var d = i(73);
    e.createSign = d.createSign, e.Sign = d.Sign, e.createVerify = d.createVerify, e.Verify = d.Verify, e.createECDH = i(289);
    var c = i(742);
    e.publicEncrypt = c.publicEncrypt, e.privateEncrypt = c.privateEncrypt, e.publicDecrypt = c.publicDecrypt, e.privateDecrypt = c.privateDecrypt;
    var f = i(779);
    e.randomFill = f.randomFill, e.randomFillSync = f.randomFillSync, e.createCredentials = function() {
        throw new Error(["sorry, createCredentials is not implemented yet", "we accept pull requests", "https://github.com/crypto-browserify/crypto-browserify"].join("\n"))
    }, e.constants = {
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
}, function(t, e, i) {
    t.exports = i(634).EventEmitter
}, , , function(t, e, i) {
    t.exports = i(274)
}, , , , , , , , , function(t, e, i) {
    (function(e) {
        var i;
        e.browser ? i = "utf-8" : i = parseInt(e.version.split(".")[0].slice(1), 10) >= 6 ? "utf-8" : "binary";
        t.exports = i
    }).call(this, i(210))
}, , function(t, e, i) {
    "use strict";

    function r(t, e, i) {
        showBox("al_audio.php", {
            act: "edit_audio_box",
            aid: e.fullId,
            force_edit_hash: i
        }, {
            params: {
                width: "456px",
                bodyStyle: "padding: 20px; background-color: #F7F7F7;",
                hideButtons: 1
            },
            dark: 1
        })
    }
    i.r(e), i.d(e, "editAudio", function() {
        return r
    })
}, , function(t, e, i) {
    "use strict";
    (function(e, r) {
        var n = i(226);
        t.exports = v;
        var o, a = i(379);
        v.ReadableState = g;
        i(634).EventEmitter;
        var s = function(t, e) {
                return t.listeners(e).length
            },
            u = i(588),
            d = i(307).Buffer,
            c = e.Uint8Array || function() {};
        var f = i(192);
        f.inherits = i(581);
        var l = i(409),
            h = void 0;
        h = l && l.debuglog ? l.debuglog("stream") : function() {};
        var p, _ = i(91),
            y = i(81);
        f.inherits(v, u);
        var b = ["error", "close", "destroy", "pause", "resume"];

        function g(t, e) {
            o = o || i(274), t = t || {};
            var r = e instanceof o;
            this.objectMode = !!t.objectMode, r && (this.objectMode = this.objectMode || !!t.readableObjectMode);
            var n = t.highWaterMark,
                a = t.readableHighWaterMark,
                s = this.objectMode ? 16 : 16384;
            this.highWaterMark = n || 0 === n ? n : r && (a || 0 === a) ? a : s, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new _, this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = t.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (p || (p = i(621).StringDecoder), this.decoder = new p(t.encoding), this.encoding = t.encoding)
        }

        function v(t) {
            if (o = o || i(274), !(this instanceof v)) return new v(t);
            this._readableState = new g(t, this), this.readable = !0, t && ("function" == typeof t.read && (this._read = t.read), "function" == typeof t.destroy && (this._destroy = t.destroy)), u.call(this)
        }

        function m(t, e, i, r, n) {
            var o, a = t._readableState;
            null === e ? (a.reading = !1, function(t, e) {
                if (e.ended) return;
                if (e.decoder) {
                    var i = e.decoder.end();
                    i && i.length && (e.buffer.push(i), e.length += e.objectMode ? 1 : i.length)
                }
                e.ended = !0, P(t)
            }(t, a)) : (n || (o = function(t, e) {
                var i;
                r = e, d.isBuffer(r) || r instanceof c || "string" == typeof e || void 0 === e || t.objectMode || (i = new TypeError("Invalid non-string/buffer chunk"));
                var r;
                return i
            }(a, e)), o ? t.emit("error", o) : a.objectMode || e && e.length > 0 ? ("string" == typeof e || a.objectMode || Object.getPrototypeOf(e) === d.prototype || (e = function(t) {
                return d.from(t)
            }(e)), r ? a.endEmitted ? t.emit("error", new Error("stream.unshift() after end event")) : A(t, a, e, !0) : a.ended ? t.emit("error", new Error("stream.push() after EOF")) : (a.reading = !1, a.decoder && !i ? (e = a.decoder.write(e), a.objectMode || 0 !== e.length ? A(t, a, e, !1) : I(t, a)) : A(t, a, e, !1))) : r || (a.reading = !1));
            return function(t) {
                return !t.ended && (t.needReadable || t.length < t.highWaterMark || 0 === t.length)
            }(a)
        }

        function A(t, e, i, r) {
            e.flowing && 0 === e.length && !e.sync ? (t.emit("data", i), t.read(0)) : (e.length += e.objectMode ? 1 : i.length, r ? e.buffer.unshift(i) : e.buffer.push(i), e.needReadable && P(t)), I(t, e)
        }
        Object.defineProperty(v.prototype, "destroyed", {
            get: function() {
                return void 0 !== this._readableState && this._readableState.destroyed
            },
            set: function(t) {
                this._readableState && (this._readableState.destroyed = t)
            }
        }), v.prototype.destroy = y.destroy, v.prototype._undestroy = y.undestroy, v.prototype._destroy = function(t, e) {
            this.push(null), e(t)
        }, v.prototype.push = function(t, e) {
            var i, r = this._readableState;
            return r.objectMode ? i = !0 : "string" == typeof t && ((e = e || r.defaultEncoding) !== r.encoding && (t = d.from(t, e), e = ""), i = !0), m(this, t, e, !1, i)
        }, v.prototype.unshift = function(t) {
            return m(this, t, null, !0, !1)
        }, v.prototype.isPaused = function() {
            return !1 === this._readableState.flowing
        }, v.prototype.setEncoding = function(t) {
            return p || (p = i(621).StringDecoder), this._readableState.decoder = new p(t), this._readableState.encoding = t, this
        };
        var w = 8388608;

        function E(t, e) {
            return t <= 0 || 0 === e.length && e.ended ? 0 : e.objectMode ? 1 : t != t ? e.flowing && e.length ? e.buffer.head.data.length : e.length : (t > e.highWaterMark && (e.highWaterMark = function(t) {
                return t >= w ? t = w : (t--, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, t |= t >>> 16, t++), t
            }(t)), t <= e.length ? t : e.ended ? e.length : (e.needReadable = !0, 0))
        }

        function P(t) {
            var e = t._readableState;
            e.needReadable = !1, e.emittedReadable || (h("emitReadable", e.flowing), e.emittedReadable = !0, e.sync ? n.nextTick(S, t) : S(t))
        }

        function S(t) {
            h("emit readable"), t.emit("readable"), k(t)
        }

        function I(t, e) {
            e.readingMore || (e.readingMore = !0, n.nextTick(T, t, e))
        }

        function T(t, e) {
            for (var i = e.length; !e.reading && !e.flowing && !e.ended && e.length < e.highWaterMark && (h("maybeReadMore read 0"), t.read(0), i !== e.length);) i = e.length;
            e.readingMore = !1
        }

        function M(t) {
            h("readable nexttick read 0"), t.read(0)
        }

        function C(t, e) {
            e.reading || (h("resume read 0"), t.read(0)), e.resumeScheduled = !1, e.awaitDrain = 0, t.emit("resume"), k(t), e.flowing && !e.reading && t.read(0)
        }

        function k(t) {
            var e = t._readableState;
            for (h("flow", e.flowing); e.flowing && null !== t.read(););
        }

        function D(t, e) {
            return 0 === e.length ? null : (e.objectMode ? i = e.buffer.shift() : !t || t >= e.length ? (i = e.decoder ? e.buffer.join("") : 1 === e.buffer.length ? e.buffer.head.data : e.buffer.concat(e.length), e.buffer.clear()) : i = function(t, e, i) {
                var r;
                t < e.head.data.length ? (r = e.head.data.slice(0, t), e.head.data = e.head.data.slice(t)) : r = t === e.head.data.length ? e.shift() : i ? function(t, e) {
                    var i = e.head,
                        r = 1,
                        n = i.data;
                    t -= n.length;
                    for (; i = i.next;) {
                        var o = i.data,
                            a = t > o.length ? o.length : t;
                        if (a === o.length ? n += o : n += o.slice(0, t), 0 === (t -= a)) {
                            a === o.length ? (++r, i.next ? e.head = i.next : e.head = e.tail = null) : (e.head = i, i.data = o.slice(a));
                            break
                        }++r
                    }
                    return e.length -= r, n
                }(t, e) : function(t, e) {
                    var i = d.allocUnsafe(t),
                        r = e.head,
                        n = 1;
                    r.data.copy(i), t -= r.data.length;
                    for (; r = r.next;) {
                        var o = r.data,
                            a = t > o.length ? o.length : t;
                        if (o.copy(i, i.length - t, 0, a), 0 === (t -= a)) {
                            a === o.length ? (++n, r.next ? e.head = r.next : e.head = e.tail = null) : (e.head = r, r.data = o.slice(a));
                            break
                        }++n
                    }
                    return e.length -= n, i
                }(t, e);
                return r
            }(t, e.buffer, e.decoder), i);
            var i
        }

        function O(t) {
            var e = t._readableState;
            if (e.length > 0) throw new Error('"endReadable()" called on non-empty stream');
            e.endEmitted || (e.ended = !0, n.nextTick(U, e, t))
        }

        function U(t, e) {
            t.endEmitted || 0 !== t.length || (t.endEmitted = !0, e.readable = !1, e.emit("end"))
        }

        function L(t, e) {
            for (var i = 0, r = t.length; i < r; i++)
                if (t[i] === e) return i;
            return -1
        }
        v.prototype.read = function(t) {
            h("read", t), t = parseInt(t, 10);
            var e = this._readableState,
                i = t;
            if (0 !== t && (e.emittedReadable = !1), 0 === t && e.needReadable && (e.length >= e.highWaterMark || e.ended)) return h("read: emitReadable", e.length, e.ended), 0 === e.length && e.ended ? O(this) : P(this), null;
            if (0 === (t = E(t, e)) && e.ended) return 0 === e.length && O(this), null;
            var r, n = e.needReadable;
            return h("need readable", n), (0 === e.length || e.length - t < e.highWaterMark) && h("length less than watermark", n = !0), e.ended || e.reading ? h("reading or ended", n = !1) : n && (h("do read"), e.reading = !0, e.sync = !0, 0 === e.length && (e.needReadable = !0), this._read(e.highWaterMark), e.sync = !1, e.reading || (t = E(i, e))), null === (r = t > 0 ? D(t, e) : null) ? (e.needReadable = !0, t = 0) : e.length -= t, 0 === e.length && (e.ended || (e.needReadable = !0), i !== t && e.ended && O(this)), null !== r && this.emit("data", r), r
        }, v.prototype._read = function(t) {
            this.emit("error", new Error("_read() is not implemented"))
        }, v.prototype.pipe = function(t, e) {
            var i = this,
                o = this._readableState;
            switch (o.pipesCount) {
                case 0:
                    o.pipes = t;
                    break;
                case 1:
                    o.pipes = [o.pipes, t];
                    break;
                default:
                    o.pipes.push(t)
            }
            o.pipesCount += 1, h("pipe count=%d opts=%j", o.pipesCount, e);
            var u = (!e || !1 !== e.end) && t !== r.stdout && t !== r.stderr ? c : v;

            function d(e, r) {
                h("onunpipe"), e === i && r && !1 === r.hasUnpiped && (r.hasUnpiped = !0, h("cleanup"), t.removeListener("close", b), t.removeListener("finish", g), t.removeListener("drain", f), t.removeListener("error", y), t.removeListener("unpipe", d), i.removeListener("end", c), i.removeListener("end", v), i.removeListener("data", _), l = !0, !o.awaitDrain || t._writableState && !t._writableState.needDrain || f())
            }

            function c() {
                h("onend"), t.end()
            }
            o.endEmitted ? n.nextTick(u) : i.once("end", u), t.on("unpipe", d);
            var f = function(t) {
                return function() {
                    var e = t._readableState;
                    h("pipeOnDrain", e.awaitDrain), e.awaitDrain && e.awaitDrain--, 0 === e.awaitDrain && s(t, "data") && (e.flowing = !0, k(t))
                }
            }(i);
            t.on("drain", f);
            var l = !1;
            var p = !1;

            function _(e) {
                h("ondata"), p = !1, !1 !== t.write(e) || p || ((1 === o.pipesCount && o.pipes === t || o.pipesCount > 1 && -1 !== L(o.pipes, t)) && !l && (h("false write response, pause", i._readableState.awaitDrain), i._readableState.awaitDrain++, p = !0), i.pause())
            }

            function y(e) {
                h("onerror", e), v(), t.removeListener("error", y), 0 === s(t, "error") && t.emit("error", e)
            }

            function b() {
                t.removeListener("finish", g), v()
            }

            function g() {
                h("onfinish"), t.removeListener("close", b), v()
            }

            function v() {
                h("unpipe"), i.unpipe(t)
            }
            return i.on("data", _),
                function(t, e, i) {
                    if ("function" == typeof t.prependListener) return t.prependListener(e, i);
                    t._events && t._events[e] ? a(t._events[e]) ? t._events[e].unshift(i) : t._events[e] = [i, t._events[e]] : t.on(e, i)
                }(t, "error", y), t.once("close", b), t.once("finish", g), t.emit("pipe", i), o.flowing || (h("pipe resume"), i.resume()), t
        }, v.prototype.unpipe = function(t) {
            var e = this._readableState,
                i = {
                    hasUnpiped: !1
                };
            if (0 === e.pipesCount) return this;
            if (1 === e.pipesCount) return t && t !== e.pipes ? this : (t || (t = e.pipes), e.pipes = null, e.pipesCount = 0, e.flowing = !1, t && t.emit("unpipe", this, i), this);
            if (!t) {
                var r = e.pipes,
                    n = e.pipesCount;
                e.pipes = null, e.pipesCount = 0, e.flowing = !1;
                for (var o = 0; o < n; o++) r[o].emit("unpipe", this, i);
                return this
            }
            var a = L(e.pipes, t);
            return -1 === a ? this : (e.pipes.splice(a, 1), e.pipesCount -= 1, 1 === e.pipesCount && (e.pipes = e.pipes[0]), t.emit("unpipe", this, i), this)
        }, v.prototype.on = function(t, e) {
            var i = u.prototype.on.call(this, t, e);
            if ("data" === t) !1 !== this._readableState.flowing && this.resume();
            else if ("readable" === t) {
                var r = this._readableState;
                r.endEmitted || r.readableListening || (r.readableListening = r.needReadable = !0, r.emittedReadable = !1, r.reading ? r.length && P(this) : n.nextTick(M, this))
            }
            return i
        }, v.prototype.addListener = v.prototype.on, v.prototype.resume = function() {
            var t = this._readableState;
            return t.flowing || (h("resume"), t.flowing = !0, function(t, e) {
                e.resumeScheduled || (e.resumeScheduled = !0, n.nextTick(C, t, e))
            }(this, t)), this
        }, v.prototype.pause = function() {
            return h("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (h("pause"), this._readableState.flowing = !1, this.emit("pause")), this
        }, v.prototype.wrap = function(t) {
            var e = this,
                i = this._readableState,
                r = !1;
            for (var n in t.on("end", function() {
                    if (h("wrapped end"), i.decoder && !i.ended) {
                        var t = i.decoder.end();
                        t && t.length && e.push(t)
                    }
                    e.push(null)
                }), t.on("data", function(n) {
                    (h("wrapped data"), i.decoder && (n = i.decoder.write(n)), !i.objectMode || null !== n && void 0 !== n) && ((i.objectMode || n && n.length) && (e.push(n) || (r = !0, t.pause())))
                }), t) void 0 === this[n] && "function" == typeof t[n] && (this[n] = function(e) {
                return function() {
                    return t[e].apply(t, arguments)
                }
            }(n));
            for (var o = 0; o < b.length; o++) t.on(b[o], this.emit.bind(this, b[o]));
            return this._read = function(e) {
                h("wrapped _read", e), r && (r = !1, t.resume())
            }, this
        }, Object.defineProperty(v.prototype, "readableHighWaterMark", {
            enumerable: !1,
            get: function() {
                return this._readableState.highWaterMark
            }
        }), v._fromList = D
    }).call(this, i(186), i(210))
}, , , , function(t, e, i) {
    "use strict";
    t.exports = o;
    var r = i(274),
        n = i(192);

    function o(t) {
        if (!(this instanceof o)) return new o(t);
        r.call(this, t), this._transformState = {
            afterTransform: function(t, e) {
                var i = this._transformState;
                i.transforming = !1;
                var r = i.writecb;
                if (!r) return this.emit("error", new Error("write callback called multiple times"));
                i.writechunk = null, i.writecb = null, null != e && this.push(e), r(t);
                var n = this._readableState;
                n.reading = !1, (n.needReadable || n.length < n.highWaterMark) && this._read(n.highWaterMark)
            }.bind(this),
            needTransform: !1,
            transforming: !1,
            writecb: null,
            writechunk: null,
            writeencoding: null
        }, this._readableState.needReadable = !0, this._readableState.sync = !1, t && ("function" == typeof t.transform && (this._transform = t.transform), "function" == typeof t.flush && (this._flush = t.flush)), this.on("prefinish", a)
    }

    function a() {
        var t = this;
        "function" == typeof this._flush ? this._flush(function(e, i) {
            s(t, e, i)
        }) : s(this, null, null)
    }

    function s(t, e, i) {
        if (e) return t.emit("error", e);
        if (null != i && t.push(i), t._writableState.length) throw new Error("Calling transform done when ws.length != 0");
        if (t._transformState.transforming) throw new Error("Calling transform done when still transforming");
        return t.push(null)
    }
    n.inherits = i(581), n.inherits(o, r), o.prototype.push = function(t, e) {
        return this._transformState.needTransform = !1, r.prototype.push.call(this, t, e)
    }, o.prototype._transform = function(t, e, i) {
        throw new Error("_transform() is not implemented")
    }, o.prototype._write = function(t, e, i) {
        var r = this._transformState;
        if (r.writecb = i, r.writechunk = t, r.writeencoding = e, !r.transforming) {
            var n = this._readableState;
            (r.needTransform || n.needReadable || n.length < n.highWaterMark) && this._read(n.highWaterMark)
        }
    }, o.prototype._read = function(t) {
        var e = this._transformState;
        null !== e.writechunk && e.writecb && !e.transforming ? (e.transforming = !0, this._transform(e.writechunk, e.writeencoding, e.afterTransform)) : e.needTransform = !0
    }, o.prototype._destroy = function(t, e) {
        var i = this;
        r.prototype._destroy.call(this, t, function(t) {
            e(t), i.emit("close")
        })
    }
}, function(t, e, i) {
    "use strict";
    var r = i(581),
        n = i(424),
        o = i(189),
        a = i(307).Buffer,
        s = i(370),
        u = i(147),
        d = i(484),
        c = a.alloc(128);

    function f(t, e) {
        o.call(this, "digest"), "string" == typeof e && (e = a.from(e));
        var i = "sha512" === t || "sha384" === t ? 128 : 64;
        (this._alg = t, this._key = e, e.length > i) ? e = ("rmd160" === t ? new u : d(t)).update(e).digest(): e.length < i && (e = a.concat([e, c], i));
        for (var r = this._ipad = a.allocUnsafe(i), n = this._opad = a.allocUnsafe(i), s = 0; s < i; s++) r[s] = 54 ^ e[s], n[s] = 92 ^ e[s];
        this._hash = "rmd160" === t ? new u : d(t), this._hash.update(r)
    }
    r(f, o), f.prototype._update = function(t) {
        this._hash.update(t)
    }, f.prototype._final = function() {
        var t = this._hash.digest();
        return ("rmd160" === this._alg ? new u : d(this._alg)).update(this._opad).update(t).digest()
    }, t.exports = function(t, e) {
        return "rmd160" === (t = t.toLowerCase()) || "ripemd160" === t ? new f("rmd160", e) : "md5" === t ? new n(s, e) : new f(t, e)
    }
}, , , , , , , , , , , , function(t, e, i) {
    "use strict";
    var r = i(307).Buffer,
        n = r.isEncoding || function(t) {
            switch ((t = "" + t) && t.toLowerCase()) {
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

    function o(t) {
        var e;
        switch (this.encoding = function(t) {
            var e = function(t) {
                if (!t) return "utf8";
                for (var e;;) switch (t) {
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
                        return t;
                    default:
                        if (e) return;
                        t = ("" + t).toLowerCase(), e = !0
                }
            }(t);
            if ("string" != typeof e && (r.isEncoding === n || !n(t))) throw new Error("Unknown encoding: " + t);
            return e || t
        }(t), this.encoding) {
            case "utf16le":
                this.text = u, this.end = d, e = 4;
                break;
            case "utf8":
                this.fillLast = s, e = 4;
                break;
            case "base64":
                this.text = c, this.end = f, e = 3;
                break;
            default:
                return this.write = l, void(this.end = h)
        }
        this.lastNeed = 0, this.lastTotal = 0, this.lastChar = r.allocUnsafe(e)
    }

    function a(t) {
        return t <= 127 ? 0 : t >> 5 == 6 ? 2 : t >> 4 == 14 ? 3 : t >> 3 == 30 ? 4 : t >> 6 == 2 ? -1 : -2
    }

    function s(t) {
        var e = this.lastTotal - this.lastNeed,
            i = function(t, e, i) {
                if (128 != (192 & e[0])) return t.lastNeed = 0, "�";
                if (t.lastNeed > 1 && e.length > 1) {
                    if (128 != (192 & e[1])) return t.lastNeed = 1, "�";
                    if (t.lastNeed > 2 && e.length > 2 && 128 != (192 & e[2])) return t.lastNeed = 2, "�"
                }
            }(this, t);
        return void 0 !== i ? i : this.lastNeed <= t.length ? (t.copy(this.lastChar, e, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (t.copy(this.lastChar, e, 0, t.length), void(this.lastNeed -= t.length))
    }

    function u(t, e) {
        if ((t.length - e) % 2 == 0) {
            var i = t.toString("utf16le", e);
            if (i) {
                var r = i.charCodeAt(i.length - 1);
                if (r >= 55296 && r <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1], i.slice(0, -1)
            }
            return i
        }
        return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = t[t.length - 1], t.toString("utf16le", e, t.length - 1)
    }

    function d(t) {
        var e = t && t.length ? this.write(t) : "";
        if (this.lastNeed) {
            var i = this.lastTotal - this.lastNeed;
            return e + this.lastChar.toString("utf16le", 0, i)
        }
        return e
    }

    function c(t, e) {
        var i = (t.length - e) % 3;
        return 0 === i ? t.toString("base64", e) : (this.lastNeed = 3 - i, this.lastTotal = 3, 1 === i ? this.lastChar[0] = t[t.length - 1] : (this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1]), t.toString("base64", e, t.length - i))
    }

    function f(t) {
        var e = t && t.length ? this.write(t) : "";
        return this.lastNeed ? e + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : e
    }

    function l(t) {
        return t.toString(this.encoding)
    }

    function h(t) {
        return t && t.length ? this.write(t) : ""
    }
    e.StringDecoder = o, o.prototype.write = function(t) {
        if (0 === t.length) return "";
        var e, i;
        if (this.lastNeed) {
            if (void 0 === (e = this.fillLast(t))) return "";
            i = this.lastNeed, this.lastNeed = 0
        } else i = 0;
        return i < t.length ? e ? e + this.text(t, i) : this.text(t, i) : e || ""
    }, o.prototype.end = function(t) {
        var e = t && t.length ? this.write(t) : "";
        return this.lastNeed ? e + "�" : e
    }, o.prototype.text = function(t, e) {
        var i = function(t, e, i) {
            var r = e.length - 1;
            if (r < i) return 0;
            var n = a(e[r]);
            if (n >= 0) return n > 0 && (t.lastNeed = n - 1), n;
            if (--r < i || -2 === n) return 0;
            if ((n = a(e[r])) >= 0) return n > 0 && (t.lastNeed = n - 2), n;
            if (--r < i || -2 === n) return 0;
            if ((n = a(e[r])) >= 0) return n > 0 && (2 === n ? n = 0 : t.lastNeed = n - 3), n;
            return 0
        }(this, t, e);
        if (!this.lastNeed) return t.toString("utf8", e);
        this.lastTotal = i;
        var r = t.length - (i - this.lastNeed);
        return t.copy(this.lastChar, 0, r), t.toString("utf8", e, r)
    }, o.prototype.fillLast = function(t) {
        if (this.lastNeed <= t.length) return t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
        t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t.length), this.lastNeed -= t.length
    }
}, , , function(t, e, i) {
    "use strict";
    var r = i(214),
        n = i(581),
        o = {};
    e.instantiate = function(t) {
        function e(e) {
            t.call(this, e), this._cbcInit()
        }
        n(e, t);
        for (var i = Object.keys(o), r = 0; r < i.length; r++) {
            var a = i[r];
            e.prototype[a] = o[a]
        }
        return e.create = function(t) {
            return new e(t)
        }, e
    }, o._cbcInit = function() {
        var t = new function(t) {
            r.equal(t.length, 8, "Invalid IV length"), this.iv = new Array(8);
            for (var e = 0; e < this.iv.length; e++) this.iv[e] = t[e]
        }(this.options.iv);
        this._cbcState = t
    }, o._update = function(t, e, i, r) {
        var n = this._cbcState,
            o = this.constructor.super_.prototype,
            a = n.iv;
        if ("encrypt" === this.type) {
            for (var s = 0; s < this.blockSize; s++) a[s] ^= t[e + s];
            o._update.call(this, a, 0, i, r);
            for (s = 0; s < this.blockSize; s++) a[s] = i[r + s]
        } else {
            o._update.call(this, t, e, i, r);
            for (s = 0; s < this.blockSize; s++) i[r + s] ^= a[s];
            for (s = 0; s < this.blockSize; s++) a[s] = t[e + s]
        }
    }
}, , , , , , , function(t, e, i) {
    var r = e;
    r.Reporter = i(729).Reporter, r.DecoderBuffer = i(344).DecoderBuffer, r.EncoderBuffer = i(344).EncoderBuffer, r.Node = i(508)
}, , , function(t, e) {
    function i() {
        this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
    }

    function r(t) {
        return "function" == typeof t
    }

    function n(t) {
        return "object" == typeof t && null !== t
    }

    function o(t) {
        return void 0 === t
    }
    t.exports = i, i.EventEmitter = i, i.prototype._events = void 0, i.prototype._maxListeners = void 0, i.defaultMaxListeners = 10, i.prototype.setMaxListeners = function(t) {
        if ("number" != typeof t || t < 0 || isNaN(t)) throw TypeError("n must be a positive number");
        return this._maxListeners = t, this
    }, i.prototype.emit = function(t) {
        var e, i, a, s, u, d;
        if (this._events || (this._events = {}), "error" === t && (!this._events.error || n(this._events.error) && !this._events.error.length)) {
            if ((e = arguments[1]) instanceof Error) throw e;
            var c = new Error('Uncaught, unspecified "error" event. (' + e + ")");
            throw c.context = e, c
        }
        if (o(i = this._events[t])) return !1;
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
            for (s = Array.prototype.slice.call(arguments, 1), a = (d = i.slice()).length, u = 0; u < a; u++) d[u].apply(this, s);
        return !0
    }, i.prototype.addListener = function(t, e) {
        var a;
        if (!r(e)) throw TypeError("listener must be a function");
        return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", t, r(e.listener) ? e.listener : e), this._events[t] ? n(this._events[t]) ? this._events[t].push(e) : this._events[t] = [this._events[t], e] : this._events[t] = e, n(this._events[t]) && !this._events[t].warned && (a = o(this._maxListeners) ? i.defaultMaxListeners : this._maxListeners) && a > 0 && this._events[t].length > a && (this._events[t].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[t].length), "function" == typeof console.trace && console.trace()), this
    }, i.prototype.on = i.prototype.addListener, i.prototype.once = function(t, e) {
        if (!r(e)) throw TypeError("listener must be a function");
        var i = !1;

        function n() {
            this.removeListener(t, n), i || (i = !0, e.apply(this, arguments))
        }
        return n.listener = e, this.on(t, n), this
    }, i.prototype.removeListener = function(t, e) {
        var i, o, a, s;
        if (!r(e)) throw TypeError("listener must be a function");
        if (!this._events || !this._events[t]) return this;
        if (a = (i = this._events[t]).length, o = -1, i === e || r(i.listener) && i.listener === e) delete this._events[t], this._events.removeListener && this.emit("removeListener", t, e);
        else if (n(i)) {
            for (s = a; s-- > 0;)
                if (i[s] === e || i[s].listener && i[s].listener === e) {
                    o = s;
                    break
                }
            if (o < 0) return this;
            1 === i.length ? (i.length = 0, delete this._events[t]) : i.splice(o, 1), this._events.removeListener && this.emit("removeListener", t, e)
        }
        return this
    }, i.prototype.removeAllListeners = function(t) {
        var e, i;
        if (!this._events) return this;
        if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[t] && delete this._events[t], this;
        if (0 === arguments.length) {
            for (e in this._events) "removeListener" !== e && this.removeAllListeners(e);
            return this.removeAllListeners("removeListener"), this._events = {}, this
        }
        if (r(i = this._events[t])) this.removeListener(t, i);
        else if (i)
            for (; i.length;) this.removeListener(t, i[i.length - 1]);
        return delete this._events[t], this
    }, i.prototype.listeners = function(t) {
        return this._events && this._events[t] ? r(this._events[t]) ? [this._events[t]] : this._events[t].slice() : []
    }, i.prototype.listenerCount = function(t) {
        if (this._events) {
            var e = this._events[t];
            if (r(e)) return 1;
            if (e) return e.length
        }
        return 0
    }, i.listenerCount = function(t, e) {
        return t.listenerCount(e)
    }
}, , , , function(t, e, i) {
    "use strict";

    function r(t, e) {
        if (cur.viewAsBox) return cur.viewAsBox();
        if (e = e || getAudioPlayer().getCurrentAudio()) {
            e = AudioUtils.asObject(e);
            var i = AudioUtils.isPodcast(e) ? "podcast" : "audio";
            return !showBox("like.php", {
                act: "publish_box",
                object: i + e.fullId,
                list: "s" + vk.id,
                to: "mail"
            }, {
                stat: ["page.js", "page.css", "wide_dd.js", "wide_dd.css", "sharebox.js"],
                onFail: function(t) {
                    return showDoneBox(t), !0
                }
            })
        }
    }
    i.r(e), i.d(e, "shareAudio", function() {
        return r
    })
}, , , , , , , , , , , function(t, e, i) {
    "use strict";
    e.readUInt32BE = function(t, e) {
        return (t[0 + e] << 24 | t[1 + e] << 16 | t[2 + e] << 8 | t[3 + e]) >>> 0
    }, e.writeUInt32BE = function(t, e, i) {
        t[0 + i] = e >>> 24, t[1 + i] = e >>> 16 & 255, t[2 + i] = e >>> 8 & 255, t[3 + i] = 255 & e
    }, e.ip = function(t, e, i, r) {
        for (var n = 0, o = 0, a = 6; a >= 0; a -= 2) {
            for (var s = 0; s <= 24; s += 8) n <<= 1, n |= e >>> s + a & 1;
            for (s = 0; s <= 24; s += 8) n <<= 1, n |= t >>> s + a & 1
        }
        for (a = 6; a >= 0; a -= 2) {
            for (s = 1; s <= 25; s += 8) o <<= 1, o |= e >>> s + a & 1;
            for (s = 1; s <= 25; s += 8) o <<= 1, o |= t >>> s + a & 1
        }
        i[r + 0] = n >>> 0, i[r + 1] = o >>> 0
    }, e.rip = function(t, e, i, r) {
        for (var n = 0, o = 0, a = 0; a < 4; a++)
            for (var s = 24; s >= 0; s -= 8) n <<= 1, n |= e >>> s + a & 1, n <<= 1, n |= t >>> s + a & 1;
        for (a = 4; a < 8; a++)
            for (s = 24; s >= 0; s -= 8) o <<= 1, o |= e >>> s + a & 1, o <<= 1, o |= t >>> s + a & 1;
        i[r + 0] = n >>> 0, i[r + 1] = o >>> 0
    }, e.pc1 = function(t, e, i, r) {
        for (var n = 0, o = 0, a = 7; a >= 5; a--) {
            for (var s = 0; s <= 24; s += 8) n <<= 1, n |= e >> s + a & 1;
            for (s = 0; s <= 24; s += 8) n <<= 1, n |= t >> s + a & 1
        }
        for (s = 0; s <= 24; s += 8) n <<= 1, n |= e >> s + a & 1;
        for (a = 1; a <= 3; a++) {
            for (s = 0; s <= 24; s += 8) o <<= 1, o |= e >> s + a & 1;
            for (s = 0; s <= 24; s += 8) o <<= 1, o |= t >> s + a & 1
        }
        for (s = 0; s <= 24; s += 8) o <<= 1, o |= t >> s + a & 1;
        i[r + 0] = n >>> 0, i[r + 1] = o >>> 0
    }, e.r28shl = function(t, e) {
        return t << e & 268435455 | t >>> 28 - e
    };
    var r = [14, 11, 17, 4, 27, 23, 25, 0, 13, 22, 7, 18, 5, 9, 16, 24, 2, 20, 12, 21, 1, 8, 15, 26, 15, 4, 25, 19, 9, 1, 26, 16, 5, 11, 23, 8, 12, 7, 17, 0, 22, 3, 10, 14, 6, 20, 27, 24];
    e.pc2 = function(t, e, i, n) {
        for (var o = 0, a = 0, s = r.length >>> 1, u = 0; u < s; u++) o <<= 1, o |= t >>> r[u] & 1;
        for (u = s; u < r.length; u++) a <<= 1, a |= e >>> r[u] & 1;
        i[n + 0] = o >>> 0, i[n + 1] = a >>> 0
    }, e.expand = function(t, e, i) {
        var r = 0,
            n = 0;
        r = (1 & t) << 5 | t >>> 27;
        for (var o = 23; o >= 15; o -= 4) r <<= 6, r |= t >>> o & 63;
        for (o = 11; o >= 3; o -= 4) n |= t >>> o & 63, n <<= 6;
        n |= (31 & t) << 1 | t >>> 31, e[i + 0] = r >>> 0, e[i + 1] = n >>> 0
    };
    var n = [14, 0, 4, 15, 13, 7, 1, 4, 2, 14, 15, 2, 11, 13, 8, 1, 3, 10, 10, 6, 6, 12, 12, 11, 5, 9, 9, 5, 0, 3, 7, 8, 4, 15, 1, 12, 14, 8, 8, 2, 13, 4, 6, 9, 2, 1, 11, 7, 15, 5, 12, 11, 9, 3, 7, 14, 3, 10, 10, 0, 5, 6, 0, 13, 15, 3, 1, 13, 8, 4, 14, 7, 6, 15, 11, 2, 3, 8, 4, 14, 9, 12, 7, 0, 2, 1, 13, 10, 12, 6, 0, 9, 5, 11, 10, 5, 0, 13, 14, 8, 7, 10, 11, 1, 10, 3, 4, 15, 13, 4, 1, 2, 5, 11, 8, 6, 12, 7, 6, 12, 9, 0, 3, 5, 2, 14, 15, 9, 10, 13, 0, 7, 9, 0, 14, 9, 6, 3, 3, 4, 15, 6, 5, 10, 1, 2, 13, 8, 12, 5, 7, 14, 11, 12, 4, 11, 2, 15, 8, 1, 13, 1, 6, 10, 4, 13, 9, 0, 8, 6, 15, 9, 3, 8, 0, 7, 11, 4, 1, 15, 2, 14, 12, 3, 5, 11, 10, 5, 14, 2, 7, 12, 7, 13, 13, 8, 14, 11, 3, 5, 0, 6, 6, 15, 9, 0, 10, 3, 1, 4, 2, 7, 8, 2, 5, 12, 11, 1, 12, 10, 4, 14, 15, 9, 10, 3, 6, 15, 9, 0, 0, 6, 12, 10, 11, 1, 7, 13, 13, 8, 15, 9, 1, 4, 3, 5, 14, 11, 5, 12, 2, 7, 8, 2, 4, 14, 2, 14, 12, 11, 4, 2, 1, 12, 7, 4, 10, 7, 11, 13, 6, 1, 8, 5, 5, 0, 3, 15, 15, 10, 13, 3, 0, 9, 14, 8, 9, 6, 4, 11, 2, 8, 1, 12, 11, 7, 10, 1, 13, 14, 7, 2, 8, 13, 15, 6, 9, 15, 12, 0, 5, 9, 6, 10, 3, 4, 0, 5, 14, 3, 12, 10, 1, 15, 10, 4, 15, 2, 9, 7, 2, 12, 6, 9, 8, 5, 0, 6, 13, 1, 3, 13, 4, 14, 14, 0, 7, 11, 5, 3, 11, 8, 9, 4, 14, 3, 15, 2, 5, 12, 2, 9, 8, 5, 12, 15, 3, 10, 7, 11, 0, 14, 4, 1, 10, 7, 1, 6, 13, 0, 11, 8, 6, 13, 4, 13, 11, 0, 2, 11, 14, 7, 15, 4, 0, 9, 8, 1, 13, 10, 3, 14, 12, 3, 9, 5, 7, 12, 5, 2, 10, 15, 6, 8, 1, 6, 1, 6, 4, 11, 11, 13, 13, 8, 12, 1, 3, 4, 7, 10, 14, 7, 10, 9, 15, 5, 6, 0, 8, 15, 0, 14, 5, 2, 9, 3, 2, 12, 13, 1, 2, 15, 8, 13, 4, 8, 6, 10, 15, 3, 11, 7, 1, 4, 10, 12, 9, 5, 3, 6, 14, 11, 5, 0, 0, 14, 12, 9, 7, 2, 7, 2, 11, 1, 4, 14, 1, 7, 9, 4, 12, 10, 14, 8, 2, 13, 0, 15, 6, 12, 10, 9, 13, 0, 15, 3, 3, 5, 5, 6, 8, 11];
    e.substitute = function(t, e) {
        for (var i = 0, r = 0; r < 4; r++) {
            i <<= 4, i |= n[64 * r + (t >>> 18 - 6 * r & 63)]
        }
        for (r = 0; r < 4; r++) {
            i <<= 4, i |= n[256 + 64 * r + (e >>> 18 - 6 * r & 63)]
        }
        return i >>> 0
    };
    var o = [16, 25, 12, 11, 3, 20, 4, 15, 31, 17, 9, 6, 27, 14, 1, 22, 30, 24, 8, 18, 0, 5, 29, 23, 13, 19, 2, 26, 10, 21, 28, 7];
    e.permute = function(t) {
        for (var e = 0, i = 0; i < o.length; i++) e <<= 1, e |= t >>> o[i] & 1;
        return e >>> 0
    }, e.padSplit = function(t, e, i) {
        for (var r = t.toString(2); r.length < e;) r = "0" + r;
        for (var n = [], o = 0; o < e; o += i) n.push(r.slice(o, o + i));
        return n.join(" ")
    }
}, function(t, e, i) {
    (function(e) {
        var r = i(189),
            n = i(717),
            o = i(581),
            a = {
                "des-ede3-cbc": n.CBC.instantiate(n.EDE),
                "des-ede3": n.EDE,
                "des-ede-cbc": n.CBC.instantiate(n.EDE),
                "des-ede": n.EDE,
                "des-cbc": n.CBC.instantiate(n.DES),
                "des-ecb": n.DES
            };

        function s(t) {
            r.call(this);
            var i, n = t.mode.toLowerCase(),
                o = a[n];
            i = t.decrypt ? "decrypt" : "encrypt";
            var s = t.key;
            "des-ede" !== n && "des-ede-cbc" !== n || (s = e.concat([s, s.slice(0, 8)]));
            var u = t.iv;
            this._des = o.create({
                key: s,
                iv: u,
                type: i
            })
        }
        a.des = a["des-cbc"], a.des3 = a["des-ede3-cbc"], t.exports = s, o(s, r), s.prototype._update = function(t) {
            return new e(this._des.update(t))
        }, s.prototype._final = function() {
            return new e(this._des.final())
        }
    }).call(this, i(315).Buffer)
}, , , function(t, e, i) {
    (function(e) {
        function i(t) {
            try {
                if (!e.localStorage) return !1
            } catch (t) {
                return !1
            }
            var i = e.localStorage[t];
            return null != i && "true" === String(i).toLowerCase()
        }
        t.exports = function(t, e) {
            if (i("noDeprecation")) return t;
            var r = !1;
            return function() {
                if (!r) {
                    if (i("throwDeprecation")) throw new Error(e);
                    i("traceDeprecation") ? console.trace(e) : console.warn(e), r = !0
                }
                return t.apply(this, arguments)
            }
        }
    }).call(this, i(186))
}, , , function(t, e, i) {
    "use strict";

    function r() {}
    i.r(e), i.d(e, "debugLog", function() {
        return r
    })
}, , , , , function(t, e, i) {
    "use strict";

    function r(t, e) {
        if (cur.viewAsBox) return cur.viewAsBox();
        e = AudioUtils.asObject(e), layers.fullhide && layers.fullhide(), AudioUtils.showAudioPlaylist(e.album[0], e.album[1], e.album[2])
    }
    i.r(e), i.d(e, "showAudioAlbum", function() {
        return r
    })
}, function(t, e, i) {
    var r = i(307).Buffer,
        n = i(367);

    function o(t, e, i) {
        var o = e.length,
            a = n(e, t._cache);
        return t._cache = t._cache.slice(o), t._prev = r.concat([t._prev, i ? e : a]), a
    }
    e.encrypt = function(t, e, i) {
        for (var n, a = r.allocUnsafe(0); e.length;) {
            if (0 === t._cache.length && (t._cache = t._cipher.encryptBlock(t._prev), t._prev = r.allocUnsafe(0)), !(t._cache.length <= e.length)) {
                a = r.concat([a, o(t, e, i)]);
                break
            }
            n = t._cache.length, a = r.concat([a, o(t, e.slice(0, n), i)]), e = e.slice(n)
        }
        return a
    }
}, , , , function(t, e, i) {
    var r = i(367),
        n = i(307).Buffer,
        o = i(199);

    function a(t) {
        var e = t._cipher.encryptBlockRaw(t._prev);
        return o(t._prev), e
    }
    e.encrypt = function(t, e) {
        var i = Math.ceil(e.length / 16),
            o = t._cache.length;
        t._cache = n.concat([t._cache, n.allocUnsafe(16 * i)]);
        for (var s = 0; s < i; s++) {
            var u = a(t),
                d = o + 16 * s;
            t._cache.writeUInt32BE(u[0], d + 0), t._cache.writeUInt32BE(u[1], d + 4), t._cache.writeUInt32BE(u[2], d + 8), t._cache.writeUInt32BE(u[3], d + 12)
        }
        var c = t._cache.slice(0, e.length);
        return t._cache = t._cache.slice(e.length), r(e, c)
    }
}, , function(t, e, i) {
    (function(e) {
        var r = i(218),
            n = new(i(401)),
            o = new r(24),
            a = new r(11),
            s = new r(10),
            u = new r(3),
            d = new r(7),
            c = i(342),
            f = i(503);

        function l(t, i) {
            return i = i || "utf8", e.isBuffer(t) || (t = new e(t, i)), this._pub = new r(t), this
        }

        function h(t, i) {
            return i = i || "utf8", e.isBuffer(t) || (t = new e(t, i)), this._priv = new r(t), this
        }
        t.exports = _;
        var p = {};

        function _(t, e, i) {
            this.setGenerator(e), this.__prime = new r(t), this._prime = r.mont(this.__prime), this._primeLen = t.length, this._pub = void 0, this._priv = void 0, this._primeCode = void 0, i ? (this.setPublicKey = l, this.setPrivateKey = h) : this._primeCode = 8
        }

        function y(t, i) {
            var r = new e(t.toArray());
            return i ? r.toString(i) : r
        }
        Object.defineProperty(_.prototype, "verifyError", {
            enumerable: !0,
            get: function() {
                return "number" != typeof this._primeCode && (this._primeCode = function(t, e) {
                    var i = e.toString("hex"),
                        r = [i, t.toString(16)].join("_");
                    if (r in p) return p[r];
                    var f, l = 0;
                    if (t.isEven() || !c.simpleSieve || !c.fermatTest(t) || !n.test(t)) return l += 1, l += "02" === i || "05" === i ? 8 : 4, p[r] = l, l;
                    switch (n.test(t.shrn(1)) || (l += 2), i) {
                        case "02":
                            t.mod(o).cmp(a) && (l += 8);
                            break;
                        case "05":
                            (f = t.mod(s)).cmp(u) && f.cmp(d) && (l += 8);
                            break;
                        default:
                            l += 4
                    }
                    return p[r] = l, l
                }(this.__prime, this.__gen)), this._primeCode
            }
        }), _.prototype.generateKeys = function() {
            return this._priv || (this._priv = new r(f(this._primeLen))), this._pub = this._gen.toRed(this._prime).redPow(this._priv).fromRed(), this.getPublicKey()
        }, _.prototype.computeSecret = function(t) {
            var i = (t = (t = new r(t)).toRed(this._prime)).redPow(this._priv).fromRed(),
                n = new e(i.toArray()),
                o = this.getPrime();
            if (n.length < o.length) {
                var a = new e(o.length - n.length);
                a.fill(0), n = e.concat([a, n])
            }
            return n
        }, _.prototype.getPublicKey = function(t) {
            return y(this._pub, t)
        }, _.prototype.getPrivateKey = function(t) {
            return y(this._priv, t)
        }, _.prototype.getPrime = function(t) {
            return y(this.__prime, t)
        }, _.prototype.getGenerator = function(t) {
            return y(this._gen, t)
        }, _.prototype.setGenerator = function(t, i) {
            return i = i || "utf8", e.isBuffer(t) || (t = new e(t, i)), this.__gen = t, this._gen = new r(t), this
        }
    }).call(this, i(315).Buffer)
}, function(t, e, i) {
    "use strict";
    var r = i(218),
        n = i(329).utils,
        o = n.assert,
        a = n.cachedProperty,
        s = n.parseBytes;

    function u(t, e) {
        this.eddsa = t, "object" != typeof e && (e = s(e)), Array.isArray(e) && (e = {
            R: e.slice(0, t.encodingLength),
            S: e.slice(t.encodingLength)
        }), o(e.R && e.S, "Signature without R or S"), t.isPoint(e.R) && (this._R = e.R), e.S instanceof r && (this._S = e.S), this._Rencoded = Array.isArray(e.R) ? e.R : e.Rencoded, this._Sencoded = Array.isArray(e.S) ? e.S : e.Sencoded
    }
    a(u, "S", function() {
        return this.eddsa.decodeInt(this.Sencoded())
    }), a(u, "R", function() {
        return this.eddsa.decodePoint(this.Rencoded())
    }), a(u, "Rencoded", function() {
        return this.eddsa.encodePoint(this.R())
    }), a(u, "Sencoded", function() {
        return this.eddsa.encodeInt(this.S())
    }), u.prototype.toBytes = function() {
        return this.Rencoded().concat(this.Sencoded())
    }, u.prototype.toHex = function() {
        return n.encode(this.toBytes(), "hex").toUpperCase()
    }, t.exports = u
}, function(t, e, i) {
    "use strict";

    function r(t, e) {
        AudioUtils.isPodcast(e) && stManager.add([jsc("web/podcast.js")], function() {
            Podcast.restoreEpisode(e.fullId, e.editHash)
        })
    }
    i.r(e), i.d(e, "restoreEpisode", function() {
        return r
    })
}, function(__webpack_module__, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, "loadAllPlaylistAudios", function() {
        return loadAllPlaylistAudios
    });
    var AUDIO_LOAD_CHUNK_SIZE = 2e3;

    function loadAllPlaylistAudios(playlist, onDone) {
        if (!playlist.hasMore() || !playlist.isFullyLoadable()) return onDone && onDone();
        var chunks = [],
            totalCount = playlist.getTotalCount(),
            isDeleted = !1,
            onAllLoaded = function() {
                if (isDeleted) return onDone && onDone(null, isDeleted);
                var t = [];
                each(chunks, function(e, i) {
                    i && (t = t.concat(i))
                }), each(getAudioPlayer().getPlaylists(), function(e, i) {
                    i.getId() === playlist.getId() && (i._list = t)
                }), getAudioPlayer().mergePlaylistData(playlist, {
                    hasMore: !1
                }), onDone && onDone(playlist)
            },
            loadChunk = function loadChunk(chunkIndex, _cb) {
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
                        if (0 === chunkIndex) {
                            if (addTemplates({
                                    audio_playlist_snippet: tpl
                                }), extend(cur.lang, langs), templatesScript && eval(templatesScript), !data) return isDeleted = !0, _cb();
                            totalCount = data.totalCount, getAudioPlayer().mergePlaylistData(playlist, data)
                        }
                        chunks[chunkIndex] = data.list, _cb()
                    }
                })
            },
            loadAllChunks = function(t, e) {
                e = e || 0;
                var i = Math.max(0, Math.ceil(totalCount / AUDIO_LOAD_CHUNK_SIZE));
                i - e <= 0 ? t() : function() {
                    for (var r = new CallHub(t, i - e), n = e; n < i; n++) loadChunk(n, function() {
                        r.done()
                    })
                }()
            };
        void 0 === totalCount ? loadChunk(0, function() {
            isDeleted ? onAllLoaded() : loadAllChunks(onAllLoaded, 1)
        }) : loadAllChunks(onAllLoaded, 0)
    }
}, , function(t, e, i) {
    "use strict";
    var r = i(436),
        n = i(430),
        o = i(38),
        a = i(214),
        s = r.sum32,
        u = r.sum32_4,
        d = r.sum32_5,
        c = o.ch32,
        f = o.maj32,
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
    r.inherits(g, y), t.exports = g, g.blockSize = 512, g.outSize = 256, g.hmacStrength = 192, g.padLength = 64, g.prototype._update = function(t, e) {
        for (var i = this.W, r = 0; r < 16; r++) i[r] = t[e + r];
        for (; r < i.length; r++) i[r] = u(_(i[r - 2]), i[r - 7], p(i[r - 15]), i[r - 16]);
        var n = this.h[0],
            o = this.h[1],
            y = this.h[2],
            b = this.h[3],
            g = this.h[4],
            v = this.h[5],
            m = this.h[6],
            A = this.h[7];
        for (a(this.k.length === i.length), r = 0; r < i.length; r++) {
            var w = d(A, h(g), c(g, v, m), this.k[r], i[r]),
                E = s(l(n), f(n, o, y));
            A = m, m = v, v = g, g = s(b, w), b = y, y = o, o = n, n = s(w, E)
        }
        this.h[0] = s(this.h[0], n), this.h[1] = s(this.h[1], o), this.h[2] = s(this.h[2], y), this.h[3] = s(this.h[3], b), this.h[4] = s(this.h[4], g), this.h[5] = s(this.h[5], v), this.h[6] = s(this.h[6], m), this.h[7] = s(this.h[7], A)
    }, g.prototype._digest = function(t) {
        return "hex" === t ? r.toHex32(this.h, "big") : r.split32(this.h, "big")
    }
}, function(t, e, i) {
    var r = i(307).Buffer,
        n = i(414);
    t.exports = function(t, e, i, o) {
        if (r.isBuffer(t) || (t = r.from(t, "binary")), e && (r.isBuffer(e) || (e = r.from(e, "binary")), 8 !== e.length)) throw new RangeError("salt should be Buffer with 8 byte length");
        for (var a = i / 8, s = r.alloc(a), u = r.alloc(o || 0), d = r.alloc(0); a > 0 || o > 0;) {
            var c = new n;
            c.update(d), c.update(t), e && c.update(e), d = c.digest();
            var f = 0;
            if (a > 0) {
                var l = s.length - a;
                f = Math.min(a, d.length), d.copy(s, l, 0, f), a -= f
            }
            if (f < d.length && o > 0) {
                var h = u.length - o,
                    p = Math.min(o, d.length - f);
                d.copy(u, h, f, f + p), o -= p
            }
        }
        return d.fill(0), {
            key: s,
            iv: u
        }
    }
}, , , , , , function(t, e, i) {
    var r = i(421);
    e.tagClass = {
        0: "universal",
        1: "application",
        2: "context",
        3: "private"
    }, e.tagClassByName = r._reverse(e.tagClass), e.tag = {
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
    }, e.tagByName = r._reverse(e.tag)
}, function(t, e, i) {
    "use strict";

    function r() {
        var t = getLang("global_audio_flash_required").replace("{link}", '<a target=_blank href="https://get.adobe.com/flashplayer">').replace("{/link}", "</a>");
        new MessageBox({
            title: getLang("audio_need_flash_title")
        }).content(t).setButtons("Ok", function() {
            curBox().hide()
        }).show()
    }
    i.r(e), i.d(e, "showNeedFlashBox", function() {
        return r
    })
}, , , function(t, e, i) {
    "use strict";
    var r = i(436),
        n = i(430),
        o = r.rotl32,
        a = r.sum32,
        s = r.sum32_3,
        u = r.sum32_4,
        d = n.BlockHash;

    function c() {
        if (!(this instanceof c)) return new c;
        d.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little"
    }

    function f(t, e, i, r) {
        return t <= 15 ? e ^ i ^ r : t <= 31 ? e & i | ~e & r : t <= 47 ? (e | ~i) ^ r : t <= 63 ? e & r | i & ~r : e ^ (i | ~r)
    }

    function l(t) {
        return t <= 15 ? 0 : t <= 31 ? 1518500249 : t <= 47 ? 1859775393 : t <= 63 ? 2400959708 : 2840853838
    }

    function h(t) {
        return t <= 15 ? 1352829926 : t <= 31 ? 1548603684 : t <= 47 ? 1836072691 : t <= 63 ? 2053994217 : 0
    }
    r.inherits(c, d), e.ripemd160 = c, c.blockSize = 512, c.outSize = 160, c.hmacStrength = 192, c.padLength = 64, c.prototype._update = function(t, e) {
        for (var i = this.h[0], r = this.h[1], n = this.h[2], d = this.h[3], c = this.h[4], g = i, v = r, m = n, A = d, w = c, E = 0; E < 80; E++) {
            var P = a(o(u(i, f(E, r, n, d), t[p[E] + e], l(E)), y[E]), c);
            i = c, c = d, d = o(n, 10), n = r, r = P, P = a(o(u(g, f(79 - E, v, m, A), t[_[E] + e], h(E)), b[E]), w), g = w, w = A, A = o(m, 10), m = v, v = P
        }
        P = s(this.h[1], n, A), this.h[1] = s(this.h[2], d, w), this.h[2] = s(this.h[3], c, g), this.h[3] = s(this.h[4], i, v), this.h[4] = s(this.h[0], r, m), this.h[0] = P
    }, c.prototype._digest = function(t) {
        return "hex" === t ? r.toHex32(this.h, "little") : r.split32(this.h, "little")
    };
    var p = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13],
        _ = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11],
        y = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6],
        b = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]
}, function(t, e, i) {
    "use strict";
    var r = i(93),
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
        u = r.define("RelativeDistinguishedName", function() {
            this.setof(o)
        }),
        d = r.define("RDNSequence", function() {
            this.seqof(u)
        }),
        c = r.define("Name", function() {
            this.choice({
                rdnSequence: this.use(d)
            })
        }),
        f = r.define("Validity", function() {
            this.seq().obj(this.key("notBefore").use(n), this.key("notAfter").use(n))
        }),
        l = r.define("Extension", function() {
            this.seq().obj(this.key("extnID").objid(), this.key("critical").bool().def(!1), this.key("extnValue").octstr())
        }),
        h = r.define("TBSCertificate", function() {
            this.seq().obj(this.key("version").explicit(0).int(), this.key("serialNumber").int(), this.key("signature").use(a), this.key("issuer").use(c), this.key("validity").use(f), this.key("subject").use(c), this.key("subjectPublicKeyInfo").use(s), this.key("issuerUniqueID").implicit(1).bitstr().optional(), this.key("subjectUniqueID").implicit(2).bitstr().optional(), this.key("extensions").explicit(3).seqof(l).optional())
        }),
        p = r.define("X509Certificate", function() {
            this.seq().obj(this.key("tbsCertificate").use(h), this.key("signatureAlgorithm").use(a), this.key("signatureValue").bitstr())
        });
    t.exports = p
}, , function(t, e, i) {
    "use strict";
    var r = i(436),
        n = i(430),
        o = i(214),
        a = r.rotr64_hi,
        s = r.rotr64_lo,
        u = r.shr64_hi,
        d = r.shr64_lo,
        c = r.sum64,
        f = r.sum64_hi,
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

    function m(t, e, i, r, n) {
        var o = t & i ^ ~t & n;
        return o < 0 && (o += 4294967296), o
    }

    function A(t, e, i, r, n, o) {
        var a = e & r ^ ~e & o;
        return a < 0 && (a += 4294967296), a
    }

    function w(t, e, i, r, n) {
        var o = t & i ^ t & n ^ i & n;
        return o < 0 && (o += 4294967296), o
    }

    function E(t, e, i, r, n, o) {
        var a = e & r ^ e & o ^ r & o;
        return a < 0 && (a += 4294967296), a
    }

    function P(t, e) {
        var i = a(t, e, 28) ^ a(e, t, 2) ^ a(e, t, 7);
        return i < 0 && (i += 4294967296), i
    }

    function S(t, e) {
        var i = s(t, e, 28) ^ s(e, t, 2) ^ s(e, t, 7);
        return i < 0 && (i += 4294967296), i
    }

    function I(t, e) {
        var i = a(t, e, 14) ^ a(t, e, 18) ^ a(e, t, 9);
        return i < 0 && (i += 4294967296), i
    }

    function T(t, e) {
        var i = s(t, e, 14) ^ s(t, e, 18) ^ s(e, t, 9);
        return i < 0 && (i += 4294967296), i
    }

    function M(t, e) {
        var i = a(t, e, 1) ^ a(t, e, 8) ^ u(t, e, 7);
        return i < 0 && (i += 4294967296), i
    }

    function C(t, e) {
        var i = s(t, e, 1) ^ s(t, e, 8) ^ d(t, e, 7);
        return i < 0 && (i += 4294967296), i
    }

    function k(t, e) {
        var i = a(t, e, 19) ^ a(e, t, 29) ^ u(t, e, 6);
        return i < 0 && (i += 4294967296), i
    }

    function D(t, e) {
        var i = s(t, e, 19) ^ s(e, t, 29) ^ d(t, e, 6);
        return i < 0 && (i += 4294967296), i
    }
    r.inherits(v, b), t.exports = v, v.blockSize = 1024, v.outSize = 512, v.hmacStrength = 192, v.padLength = 128, v.prototype._prepareBlock = function(t, e) {
        for (var i = this.W, r = 0; r < 32; r++) i[r] = t[e + r];
        for (; r < i.length; r += 2) {
            var n = k(i[r - 4], i[r - 3]),
                o = D(i[r - 4], i[r - 3]),
                a = i[r - 14],
                s = i[r - 13],
                u = M(i[r - 30], i[r - 29]),
                d = C(i[r - 30], i[r - 29]),
                c = i[r - 32],
                f = i[r - 31];
            i[r] = h(n, o, a, s, u, d, c, f), i[r + 1] = p(n, o, a, s, u, d, c, f)
        }
    }, v.prototype._update = function(t, e) {
        this._prepareBlock(t, e);
        var i = this.W,
            r = this.h[0],
            n = this.h[1],
            a = this.h[2],
            s = this.h[3],
            u = this.h[4],
            d = this.h[5],
            h = this.h[6],
            p = this.h[7],
            b = this.h[8],
            g = this.h[9],
            v = this.h[10],
            M = this.h[11],
            C = this.h[12],
            k = this.h[13],
            D = this.h[14],
            O = this.h[15];
        o(this.k.length === i.length);
        for (var U = 0; U < i.length; U += 2) {
            var L = D,
                x = O,
                R = I(b, g),
                N = T(b, g),
                B = m(b, g, v, M, C),
                j = A(b, g, v, M, C, k),
                F = this.k[U],
                H = this.k[U + 1],
                q = i[U],
                Y = i[U + 1],
                V = _(L, x, R, N, B, j, F, H, q, Y),
                z = y(L, x, R, N, B, j, F, H, q, Y);
            L = P(r, n), x = S(r, n), R = w(r, n, a, s, u), N = E(r, n, a, s, u, d);
            var W = f(L, x, R, N),
                X = l(L, x, R, N);
            D = C, O = k, C = v, k = M, v = b, M = g, b = f(h, p, V, z), g = l(p, p, V, z), h = u, p = d, u = a, d = s, a = r, s = n, r = f(V, z, W, X), n = l(V, z, W, X)
        }
        c(this.h, 0, r, n), c(this.h, 2, a, s), c(this.h, 4, u, d), c(this.h, 6, h, p), c(this.h, 8, b, g), c(this.h, 10, v, M), c(this.h, 12, C, k), c(this.h, 14, D, O)
    }, v.prototype._digest = function(t) {
        return "hex" === t ? r.toHex32(this.h, "big") : r.split32(this.h, "big")
    }
}, , function(t, e, i) {
    t.exports = i(554)
}, , , , , , , , , , , , function(t, e, i) {
    "use strict";
    var r = i(218),
        n = i(329).utils,
        o = n.getNAF,
        a = n.getJSF,
        s = n.assert;

    function u(t, e) {
        this.type = t, this.p = new r(e.p, 16), this.red = e.prime ? r.red(e.prime) : r.mont(this.p), this.zero = new r(0).toRed(this.red), this.one = new r(1).toRed(this.red), this.two = new r(2).toRed(this.red), this.n = e.n && new r(e.n, 16), this.g = e.g && this.pointFromJSON(e.g, e.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4);
        var i = this.n && this.p.div(this.n);
        !i || i.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red))
    }

    function d(t, e) {
        this.curve = t, this.type = e, this.precomputed = null
    }
    t.exports = u, u.prototype.point = function() {
        throw new Error("Not implemented")
    }, u.prototype.validate = function() {
        throw new Error("Not implemented")
    }, u.prototype._fixedNafMul = function(t, e) {
        s(t.precomputed);
        var i = t._getDoubles(),
            r = o(e, 1),
            n = (1 << i.step + 1) - (i.step % 2 == 0 ? 2 : 1);
        n /= 3;
        for (var a = [], u = 0; u < r.length; u += i.step) {
            var d = 0;
            for (e = u + i.step - 1; e >= u; e--) d = (d << 1) + r[e];
            a.push(d)
        }
        for (var c = this.jpoint(null, null, null), f = this.jpoint(null, null, null), l = n; l > 0; l--) {
            for (u = 0; u < a.length; u++) {
                (d = a[u]) === l ? f = f.mixedAdd(i.points[u]) : d === -l && (f = f.mixedAdd(i.points[u].neg()))
            }
            c = c.add(f)
        }
        return c.toP()
    }, u.prototype._wnafMul = function(t, e) {
        var i = 4,
            r = t._getNAFPoints(i);
        i = r.wnd;
        for (var n = r.points, a = o(e, i), u = this.jpoint(null, null, null), d = a.length - 1; d >= 0; d--) {
            for (e = 0; d >= 0 && 0 === a[d]; d--) e++;
            if (d >= 0 && e++, u = u.dblp(e), d < 0) break;
            var c = a[d];
            s(0 !== c), u = "affine" === t.type ? c > 0 ? u.mixedAdd(n[c - 1 >> 1]) : u.mixedAdd(n[-c - 1 >> 1].neg()) : c > 0 ? u.add(n[c - 1 >> 1]) : u.add(n[-c - 1 >> 1].neg())
        }
        return "affine" === t.type ? u.toP() : u
    }, u.prototype._wnafMulAdd = function(t, e, i, r, n) {
        for (var s = this._wnafT1, u = this._wnafT2, d = this._wnafT3, c = 0, f = 0; f < r; f++) {
            var l = (S = e[f])._getNAFPoints(t);
            s[f] = l.wnd, u[f] = l.points
        }
        for (f = r - 1; f >= 1; f -= 2) {
            var h = f - 1,
                p = f;
            if (1 === s[h] && 1 === s[p]) {
                var _ = [e[h], null, null, e[p]];
                0 === e[h].y.cmp(e[p].y) ? (_[1] = e[h].add(e[p]), _[2] = e[h].toJ().mixedAdd(e[p].neg())) : 0 === e[h].y.cmp(e[p].y.redNeg()) ? (_[1] = e[h].toJ().mixedAdd(e[p]), _[2] = e[h].add(e[p].neg())) : (_[1] = e[h].toJ().mixedAdd(e[p]), _[2] = e[h].toJ().mixedAdd(e[p].neg()));
                var y = [-3, -1, -5, -7, 0, 7, 5, 1, 3],
                    b = a(i[h], i[p]);
                c = Math.max(b[0].length, c), d[h] = new Array(c), d[p] = new Array(c);
                for (var g = 0; g < c; g++) {
                    var v = 0 | b[0][g],
                        m = 0 | b[1][g];
                    d[h][g] = y[3 * (v + 1) + (m + 1)], d[p][g] = 0, u[h] = _
                }
            } else d[h] = o(i[h], s[h]), d[p] = o(i[p], s[p]), c = Math.max(d[h].length, c), c = Math.max(d[p].length, c)
        }
        var A = this.jpoint(null, null, null),
            w = this._wnafT4;
        for (f = c; f >= 0; f--) {
            for (var E = 0; f >= 0;) {
                var P = !0;
                for (g = 0; g < r; g++) w[g] = 0 | d[g][f], 0 !== w[g] && (P = !1);
                if (!P) break;
                E++, f--
            }
            if (f >= 0 && E++, A = A.dblp(E), f < 0) break;
            for (g = 0; g < r; g++) {
                var S, I = w[g];
                0 !== I && (I > 0 ? S = u[g][I - 1 >> 1] : I < 0 && (S = u[g][-I - 1 >> 1].neg()), A = "affine" === S.type ? A.mixedAdd(S) : A.add(S))
            }
        }
        for (f = 0; f < r; f++) u[f] = null;
        return n ? A : A.toP()
    }, u.BasePoint = d, d.prototype.eq = function() {
        throw new Error("Not implemented")
    }, d.prototype.validate = function() {
        return this.curve.validate(this)
    }, u.prototype.decodePoint = function(t, e) {
        t = n.toArray(t, e);
        var i = this.p.byteLength();
        if ((4 === t[0] || 6 === t[0] || 7 === t[0]) && t.length - 1 == 2 * i) return 6 === t[0] ? s(t[t.length - 1] % 2 == 0) : 7 === t[0] && s(t[t.length - 1] % 2 == 1), this.point(t.slice(1, 1 + i), t.slice(1 + i, 1 + 2 * i));
        if ((2 === t[0] || 3 === t[0]) && t.length - 1 === i) return this.pointFromX(t.slice(1, 1 + i), 3 === t[0]);
        throw new Error("Unknown point format")
    }, d.prototype.encodeCompressed = function(t) {
        return this.encode(t, !0)
    }, d.prototype._encode = function(t) {
        var e = this.curve.p.byteLength(),
            i = this.getX().toArray("be", e);
        return t ? [this.getY().isEven() ? 2 : 3].concat(i) : [4].concat(i, this.getY().toArray("be", e))
    }, d.prototype.encode = function(t, e) {
        return n.encode(this._encode(e), t)
    }, d.prototype.precompute = function(t) {
        if (this.precomputed) return this;
        var e = {
            doubles: null,
            naf: null,
            beta: null
        };
        return e.naf = this._getNAFPoints(8), e.doubles = this._getDoubles(4, t), e.beta = this._getBeta(), this.precomputed = e, this
    }, d.prototype._hasDoubles = function(t) {
        if (!this.precomputed) return !1;
        var e = this.precomputed.doubles;
        return !!e && e.points.length >= Math.ceil((t.bitLength() + 1) / e.step)
    }, d.prototype._getDoubles = function(t, e) {
        if (this.precomputed && this.precomputed.doubles) return this.precomputed.doubles;
        for (var i = [this], r = this, n = 0; n < e; n += t) {
            for (var o = 0; o < t; o++) r = r.dbl();
            i.push(r)
        }
        return {
            step: t,
            points: i
        }
    }, d.prototype._getNAFPoints = function(t) {
        if (this.precomputed && this.precomputed.naf) return this.precomputed.naf;
        for (var e = [this], i = (1 << t) - 1, r = 1 === i ? null : this.dbl(), n = 1; n < i; n++) e[n] = e[n - 1].add(r);
        return {
            wnd: t,
            points: e
        }
    }, d.prototype._getBeta = function() {
        return null
    }, d.prototype.dblp = function(t) {
        for (var e = this, i = 0; i < t; i++) e = e.dbl();
        return e
    }
}, , , , , , , function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "showAudioRestriction", function() {
        return f
    });
    var r = i(543),
        n = i(102),
        o = i(24),
        a = window,
        s = a.parseJSON,
        u = a.domData,
        d = a.getAudioPlayer;

    function c(t) {
        showFastBox({
            hideButtons: !0,
            title: !1,
            containerClass: "audio_restriction_box",
            onHide: function() {
                statlogsValueEvent("audio_restriction_popup", "hide", t.restrictionStatus)
            }
        }, '\n    <button class="audio_restriction_box__close" onclick="curBox().hide()">' + getLang("global_close") + '</button>\n    <div class="audio_restriction_box__icon audio_restriction_box__icon_pensive_face"></div>\n    <div class="audio_restriction_box__title">' + getLang("audio_restriction_title_claim") + '</div>\n    <div class="audio_restriction_box__controls">\n        <button class="flat_button" onclick="curBox().hide()">' + getLang("global_close") + "</button>\n    </div>\n  ")
    }

    function f(t) {
        if (!t) return !1;
        if ((t = Object(r.asObject)(t)).restrictionStatus) {
            if (t.actionHash) {
                statlogsValueEvent("audio_restriction_popup", "show", t.restrictionStatus);
                var e = showBox("al_audio.php", {
                    act: "restriction_box",
                    audio_id: t.id,
                    owner_id: t.owner_id,
                    hash: t.actionHash
                }, {
                    params: {
                        hideButtons: !0,
                        onShow: function() {
                            var e = curBox();
                            e && e.once("click:ok", function() {
                                statlogsValueEvent("audio_restriction_popup", "click", t.restrictionStatus)
                            })
                        },
                        onHide: function(e) {
                            e || statlogsValueEvent("audio_restriction_popup", "hide", t.restrictionStatus)
                        }
                    },
                    containerClass: "audio_restriction_box audio_restriction_box_type_" + t.restrictionStatus,
                    onDone: function(e, i) {
                        if (i && i.play) {
                            e.hide();
                            var a = function(t) {
                                    var e = geByClass("_audio_row_" + t.fullId);
                                    if (!e || !e.length) return !1;
                                    var i = s(u(e[0], "audio"));
                                    if (!i) return !1;
                                    var r = s(i[o.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_EXTRA]);
                                    r && delete r.claim, i[o.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_RESTRICTION] = 0, i[o.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_FLAGS] &= ~o.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_CLAIMED_BIT, i[o.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_EXTRA] = JSON.stringify(r);
                                    var a = d().getCurrentPlaylist(),
                                        c = se(Object(n.drawAudio)(i, "no_extra"));
                                    if (a) {
                                        var f = i[o.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + i[o.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_ID],
                                            l = a.getAudio(f);
                                        l && (l[o.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_RESTRICTION] = i[o.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_RESTRICTION], l[o.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_FLAGS] = i[o.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_FLAGS], l[o.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_EXTRA] = i[o.AUDIO_PLAYER_ENUMS.AUDIO_ITEM_INDEX_EXTRA])
                                    }
                                    return each(e, function(t, e) {
                                        var r = t > 0 ? se(Object(n.drawAudio)(i, "no_extra")) : c;
                                        e.parentElement.insertBefore(r, e), e.parentElement.removeChild(e)
                                    }), c
                                }(i.audio ? Object(r.asObject)(i.audio) : t),
                                c = d();
                            a && c.toggleAudio(a, {
                                target: a
                            })
                        }
                    },
                    onFail: function() {
                        e && e.hide(), c(t)
                    }
                })
            } else c(t);
            return !0
        }
        return !1
    }
}, function(t, e, i) {
    "use strict";

    function r(t, e, i) {
        var r = t + "_" + e,
            n = window.showBox("al_audio.php", {
                act: "add_to_groups_box",
                playlist_id: r,
                access_hash: i
            }).setButtons(getLang("Save"), function() {
                var t = [];
                for (var e in cur.wdd.follow_playlist_wwd.selected) t.push(cur.wdd.follow_playlist_wwd.selected[e][0]);
                t.length && (ge("add_playlist_to_group_fail").innerHTML = "", ajax.post("al_audio.php", {
                    act: "add_to_group",
                    group_ids: t,
                    hash: ge("add_playlist_to_group_hash").value,
                    playlist_id: r
                }, {
                    onDone: function(t) {
                        n.hide(), showDoneBox(t)
                    },
                    onFail: function(t) {
                        return ge("add_playlist_to_group_fail").innerHTML = t, !0
                    }
                }))
            })
    }
    i.r(e), i.d(e, "addToGroupBox", function() {
        return r
    })
}, , , , , function(t, e, i) {
    "use strict";
    var r = i(498),
        n = i(129),
        o = i(214);

    function a(t) {
        if (!(this instanceof a)) return new a(t);
        this.hash = t.hash, this.predResist = !!t.predResist, this.outLen = this.hash.outSize, this.minEntropy = t.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
        var e = n.toArray(t.entropy, t.entropyEnc || "hex"),
            i = n.toArray(t.nonce, t.nonceEnc || "hex"),
            r = n.toArray(t.pers, t.persEnc || "hex");
        o(e.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._init(e, i, r)
    }
    t.exports = a, a.prototype._init = function(t, e, i) {
        var r = t.concat(e).concat(i);
        this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
        for (var n = 0; n < this.V.length; n++) this.K[n] = 0, this.V[n] = 1;
        this._update(r), this._reseed = 1, this.reseedInterval = 281474976710656
    }, a.prototype._hmac = function() {
        return new r.hmac(this.hash, this.K)
    }, a.prototype._update = function(t) {
        var e = this._hmac().update(this.V).update([0]);
        t && (e = e.update(t)), this.K = e.digest(), this.V = this._hmac().update(this.V).digest(), t && (this.K = this._hmac().update(this.V).update([1]).update(t).digest(), this.V = this._hmac().update(this.V).digest())
    }, a.prototype.reseed = function(t, e, i, r) {
        "string" != typeof e && (r = i, i = e, e = null), t = n.toArray(t, e), i = n.toArray(i, r), o(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._update(t.concat(i || [])), this._reseed = 1
    }, a.prototype.generate = function(t, e, i, r) {
        if (this._reseed > this.reseedInterval) throw new Error("Reseed is required");
        "string" != typeof e && (r = i, i = e, e = null), i && (i = n.toArray(i, r || "hex"), this._update(i));
        for (var o = []; o.length < t;) this.V = this._hmac().update(this.V).digest(), o = o.concat(this.V);
        var a = o.slice(0, t);
        return this._update(i), this._reseed++, n.encode(a, e)
    }
}, , , function(t, e, i) {
    "use strict";
    e.utils = i(649), e.Cipher = i(323), e.DES = i(216), e.CBC = i(624), e.EDE = i(293)
}, , , function(t, e, i) {
    var r = i(650),
        n = i(428),
        o = i(378),
        a = i(196),
        s = i(674);

    function u(t, e, i) {
        if (t = t.toLowerCase(), o[t]) return n.createCipheriv(t, e, i);
        if (a[t]) return new r({
            key: e,
            iv: i,
            mode: t
        });
        throw new TypeError("invalid suite type")
    }

    function d(t, e, i) {
        if (t = t.toLowerCase(), o[t]) return n.createDecipheriv(t, e, i);
        if (a[t]) return new r({
            key: e,
            iv: i,
            mode: t,
            decrypt: !0
        });
        throw new TypeError("invalid suite type")
    }
    e.createCipher = e.Cipher = function(t, e) {
        var i, r;
        if (t = t.toLowerCase(), o[t]) i = o[t].key, r = o[t].iv;
        else {
            if (!a[t]) throw new TypeError("invalid suite type");
            i = 8 * a[t].key, r = a[t].iv
        }
        var n = s(e, !1, i, r);
        return u(t, n.key, n.iv)
    }, e.createCipheriv = e.Cipheriv = u, e.createDecipher = e.Decipher = function(t, e) {
        var i, r;
        if (t = t.toLowerCase(), o[t]) i = o[t].key, r = o[t].iv;
        else {
            if (!a[t]) throw new TypeError("invalid suite type");
            i = 8 * a[t].key, r = a[t].iv
        }
        var n = s(e, !1, i, r);
        return d(t, n.key, n.iv)
    }, e.createDecipheriv = e.Decipheriv = d, e.listCiphers = e.getCiphers = function() {
        return Object.keys(a).concat(n.getCiphers())
    }
}, , function(t, e, i) {
    var r = i(511),
        n = i(307).Buffer,
        o = i(189);

    function a(t, e, i, a) {
        o.call(this), this._cipher = new r.AES(e), this._prev = n.from(i), this._cache = n.allocUnsafe(0), this._secCache = n.allocUnsafe(0), this._decrypt = a, this._mode = t
    }
    i(581)(a, o), a.prototype._update = function(t) {
        return this._mode.encrypt(this, t, this._decrypt)
    }, a.prototype._final = function() {
        this._cipher.scrub()
    }, t.exports = a
}, , function(t, e, i) {
    var r = i(511),
        n = i(307).Buffer,
        o = i(189),
        a = i(581),
        s = i(516),
        u = i(367),
        d = i(199);

    function c(t, e, i, a) {
        o.call(this);
        var u = n.alloc(4, 0);
        this._cipher = new r.AES(e);
        var c = this._cipher.encryptBlock(u);
        this._ghash = new s(c), i = function(t, e, i) {
            if (12 === e.length) return t._finID = n.concat([e, n.from([0, 0, 0, 1])]), n.concat([e, n.from([0, 0, 0, 2])]);
            var r = new s(i),
                o = e.length,
                a = o % 16;
            r.update(e), a && (a = 16 - a, r.update(n.alloc(a, 0))), r.update(n.alloc(8, 0));
            var u = 8 * o,
                c = n.alloc(8);
            c.writeUIntBE(u, 0, 8), r.update(c), t._finID = r.state;
            var f = n.from(t._finID);
            return d(f), f
        }(this, i, c), this._prev = n.from(i), this._cache = n.allocUnsafe(0), this._secCache = n.allocUnsafe(0), this._decrypt = a, this._alen = 0, this._len = 0, this._mode = t, this._authTag = null, this._called = !1
    }
    a(c, o), c.prototype._update = function(t) {
        if (!this._called && this._alen) {
            var e = 16 - this._alen % 16;
            e < 16 && (e = n.alloc(e, 0), this._ghash.update(e))
        }
        this._called = !0;
        var i = this._mode.encrypt(this, t);
        return this._decrypt ? this._ghash.update(t) : this._ghash.update(i), this._len += t.length, i
    }, c.prototype._final = function() {
        if (this._decrypt && !this._authTag) throw new Error("Unsupported state or unable to authenticate data");
        var t = u(this._ghash.final(8 * this._alen, 8 * this._len), this._cipher.encryptBlock(this._finID));
        if (this._decrypt && function(t, e) {
                var i = 0;
                t.length !== e.length && i++;
                for (var r = Math.min(t.length, e.length), n = 0; n < r; ++n) i += t[n] ^ e[n];
                return i
            }(t, this._authTag)) throw new Error("Unsupported state or unable to authenticate data");
        this._authTag = t, this._cipher.scrub()
    }, c.prototype.getAuthTag = function() {
        if (this._decrypt || !n.isBuffer(this._authTag)) throw new Error("Attempting to get auth tag in unsupported state");
        return this._authTag
    }, c.prototype.setAuthTag = function(t) {
        if (!this._decrypt) throw new Error("Attempting to set auth tag in unsupported state");
        this._authTag = t
    }, c.prototype.setAAD = function(t) {
        if (this._called) throw new Error("Attempting to set AAD in unsupported state");
        this._ghash.update(t), this._alen += t.length
    }, t.exports = c
}, , , , function(t, e, i) {
    "use strict";

    function r(t, e, i) {
        var r = !!window.AudioPage && currentAudioPage(t),
            n = window.AudioPage && currentAudioPage(t) || cur.audioPage;
        layers.fullhide && layers.fullhide(!0), setTimeout(function() {
            r && n ? (e = unclean(e).replace(/<em>|<\/em>/g, ""), nav.change({
                q: e,
                performer: 1
            }, i, {
                searchPerformer: !0,
                nav: !0,
                isLayer: r.isLayer()
            })) : nav.go(t, i)
        }, 50)
    }
    i.r(e), i.d(e, "audioSearchPerformer", function() {
        return r
    })
}, function(t, e, i) {
    var r = i(581);

    function n(t) {
        this._reporterState = {
            obj: null,
            path: [],
            options: t || {},
            errors: []
        }
    }

    function o(t, e) {
        this.path = t, this.rethrow(e)
    }
    e.Reporter = n, n.prototype.isError = function(t) {
        return t instanceof o
    }, n.prototype.save = function() {
        var t = this._reporterState;
        return {
            obj: t.obj,
            pathLen: t.path.length
        }
    }, n.prototype.restore = function(t) {
        var e = this._reporterState;
        e.obj = t.obj, e.path = e.path.slice(0, t.pathLen)
    }, n.prototype.enterKey = function(t) {
        return this._reporterState.path.push(t)
    }, n.prototype.exitKey = function(t) {
        var e = this._reporterState;
        e.path = e.path.slice(0, t - 1)
    }, n.prototype.leaveKey = function(t, e, i) {
        var r = this._reporterState;
        this.exitKey(t), null !== r.obj && (r.obj[e] = i)
    }, n.prototype.path = function() {
        return this._reporterState.path.join("/")
    }, n.prototype.enterObject = function() {
        var t = this._reporterState,
            e = t.obj;
        return t.obj = {}, e
    }, n.prototype.leaveObject = function(t) {
        var e = this._reporterState,
            i = e.obj;
        return e.obj = t, i
    }, n.prototype.error = function(t) {
        var e, i = this._reporterState,
            r = t instanceof o;
        if (e = r ? t : new o(i.path.map(function(t) {
                return "[" + JSON.stringify(t) + "]"
            }).join(""), t.message || t, t.stack), !i.options.partial) throw e;
        return r || i.errors.push(e), e
    }, n.prototype.wrapResult = function(t) {
        var e = this._reporterState;
        return e.options.partial ? {
            result: this.isError(t) ? null : t,
            errors: e.errors
        } : t
    }, r(o, Error), o.prototype.rethrow = function(t) {
        if (this.message = t + " at: " + (this.path || "(shallow)"), Error.captureStackTrace && Error.captureStackTrace(this, o), !this.stack) try {
            throw new Error(this.message)
        } catch (t) {
            this.stack = t.stack
        }
        return this
    }
}, function(t, e, i) {
    "use strict";
    var r = i(218),
        n = i(714),
        o = i(329),
        a = o.utils.assert,
        s = i(242),
        u = i(308);

    function d(t) {
        if (!(this instanceof d)) return new d(t);
        "string" == typeof t && (a(o.curves.hasOwnProperty(t), "Unknown curve " + t), t = o.curves[t]), t instanceof o.curves.PresetCurve && (t = {
            curve: t
        }), this.curve = t.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = t.curve.g, this.g.precompute(t.curve.n.bitLength() + 1), this.hash = t.hash || t.curve.hash
    }
    t.exports = d, d.prototype.keyPair = function(t) {
        return new s(this, t)
    }, d.prototype.keyFromPrivate = function(t, e) {
        return s.fromPrivate(this, t, e)
    }, d.prototype.keyFromPublic = function(t, e) {
        return s.fromPublic(this, t, e)
    }, d.prototype.genKeyPair = function(t) {
        t || (t = {});
        for (var e = new n({
                hash: this.hash,
                pers: t.pers,
                persEnc: t.persEnc || "utf8",
                entropy: t.entropy || o.rand(this.hash.hmacStrength),
                entropyEnc: t.entropy && t.entropyEnc || "utf8",
                nonce: this.n.toArray()
            }), i = this.n.byteLength(), a = this.n.sub(new r(2));;) {
            var s = new r(e.generate(i));
            if (!(s.cmp(a) > 0)) return s.iaddn(1), this.keyFromPrivate(s)
        }
    }, d.prototype._truncateToN = function(t, e) {
        var i = 8 * t.byteLength() - this.n.bitLength();
        return i > 0 && (t = t.ushrn(i)), !e && t.cmp(this.n) >= 0 ? t.sub(this.n) : t
    }, d.prototype.sign = function(t, e, i, o) {
        "object" == typeof i && (o = i, i = null), o || (o = {}), e = this.keyFromPrivate(e, i), t = this._truncateToN(new r(t, 16));
        for (var a = this.n.byteLength(), s = e.getPrivate().toArray("be", a), d = t.toArray("be", a), c = new n({
                hash: this.hash,
                entropy: s,
                nonce: d,
                pers: o.pers,
                persEnc: o.persEnc || "utf8"
            }), f = this.n.sub(new r(1)), l = 0;; l++) {
            var h = o.k ? o.k(l) : new r(c.generate(this.n.byteLength()));
            if (!((h = this._truncateToN(h, !0)).cmpn(1) <= 0 || h.cmp(f) >= 0)) {
                var p = this.g.mul(h);
                if (!p.isInfinity()) {
                    var _ = p.getX(),
                        y = _.umod(this.n);
                    if (0 !== y.cmpn(0)) {
                        var b = h.invm(this.n).mul(y.mul(e.getPrivate()).iadd(t));
                        if (0 !== (b = b.umod(this.n)).cmpn(0)) {
                            var g = (p.getY().isOdd() ? 1 : 0) | (0 !== _.cmp(y) ? 2 : 0);
                            return o.canonical && b.cmp(this.nh) > 0 && (b = this.n.sub(b), g ^= 1), new u({
                                r: y,
                                s: b,
                                recoveryParam: g
                            })
                        }
                    }
                }
            }
        }
    }, d.prototype.verify = function(t, e, i, n) {
        t = this._truncateToN(new r(t, 16)), i = this.keyFromPublic(i, n);
        var o = (e = new u(e, "hex")).r,
            a = e.s;
        if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0) return !1;
        if (a.cmpn(1) < 0 || a.cmp(this.n) >= 0) return !1;
        var s, d = a.invm(this.n),
            c = d.mul(t).umod(this.n),
            f = d.mul(o).umod(this.n);
        return this.curve._maxwellTrick ? !(s = this.g.jmulAdd(c, i.getPublic(), f)).isInfinity() && s.eqXToP(o) : !(s = this.g.mulAdd(c, i.getPublic(), f)).isInfinity() && 0 === s.getX().umod(this.n).cmp(o)
    }, d.prototype.recoverPubKey = function(t, e, i, n) {
        a((3 & i) === i, "The recovery param is more than two bits"), e = new u(e, n);
        var o = this.n,
            s = new r(t),
            d = e.r,
            c = e.s,
            f = 1 & i,
            l = i >> 1;
        if (d.cmp(this.curve.p.umod(this.curve.n)) >= 0 && l) throw new Error("Unable to find sencond key candinate");
        d = l ? this.curve.pointFromX(d.add(this.curve.n), f) : this.curve.pointFromX(d, f);
        var h = e.r.invm(o),
            p = o.sub(s).mul(h).umod(o),
            _ = c.mul(h).umod(o);
        return this.g.mulAdd(p, d, _)
    }, d.prototype.getKeyRecoveryParam = function(t, e, i, r) {
        if (null !== (e = new u(e, r)).recoveryParam) return e.recoveryParam;
        for (var n = 0; n < 4; n++) {
            var o;
            try {
                o = this.recoverPubKey(t, e, n)
            } catch (t) {
                continue
            }
            if (o.eq(i)) return n
        }
        throw new Error("Unable to find valid recovery factor")
    }
}, , , , , , , , , , , , function(t, e, i) {
    e.publicEncrypt = i(432), e.privateDecrypt = i(202), e.privateEncrypt = function(t, i) {
        return e.publicEncrypt(t, i, !0)
    }, e.publicDecrypt = function(t, i) {
        return e.privateDecrypt(t, i, !0)
    }
}, , , , function(t, e) {
    var i = [].indexOf;
    t.exports = function(t, e) {
        if (i) return t.indexOf(e);
        for (var r = 0; r < t.length; ++r)
            if (t[r] === e) return r;
        return -1
    }
}, , function(t, e, i) {
    "use strict";

    function r(t, e, i) {
        addClass(e, "audio_moder_claimed"), AudioUtils.onRowOver(e, !1, !0), t = AudioUtils.asObject(t), ajax.post("al_claims.php", {
            act: "a_claim",
            claim_id: i,
            type: "audio",
            id: t.id,
            owner_id: t.ownerId
        })
    }
    i.r(e), i.d(e, "claim", function() {
        return r
    })
}, , , , , , , function(t, e, i) {
    e.pbkdf2 = i(54), e.pbkdf2Sync = i(103)
}, function(t, e, i) {
    "use strict";

    function r(t, e) {
        t = domClosest("_audio_row", t);
        var i = data(t, "audio");
        return i || (i = JSON.parse(domData(t, "audio"))), e && ((i = AudioUtils.asObject(i)).isDeleted = hasClass(t, "audio_row__deleted"), i.isCurrent = hasClass(t, AudioUtils.AUDIO_CURRENT_CLS), i.isPlaying = hasClass(t, AudioUtils.AUDIO_PLAYING_CLS), i.isFromCurrentPlaylist = !!gpeByClass("_audio_section__current", t), i.isNumeric = !!gpeByClass("audio_numeric", t), i.isWithCovers = !!gpeByClass("audio_w_covers", t), i.withInlinePlayer = !i.isWithCovers && !gpeByClass("audio_no_inline_player", t), i.isInSnippet = !!gpeByClass("_audio_pl_snippet__list", t), i.isInEditBox = !!gpeByClass("_audio_pl_edit_box", t), i.isInRecomsBlock = !!gpeByClass("_audio_recoms_blocks", t), i.isInFastChat = !!gpeByClass("fc_tab", t), i.isInAttach = !!gpeByClass("media_preview", t), i.isSetClaimed = hasClass(t, "audio_moder_claimed"), i.isPodcastListSnippet = hasClass(t, "podcast_list_snippet")), i
    }
    i.r(e), i.d(e, "getAudioFromEl", function() {
        return r
    })
}, , , , , , , , function(t, e, i) {
    "use strict";

    function r(t) {
        if (!t) return !1;
        var e = isObject(t) ? t.extra : t[AudioUtils.AUDIO_ITEM_INDEX_EXTRA];
        return isObject(e) || (e = JSON.parse(e || "{}")), !!e.podcast
    }
    i.r(e), i.d(e, "isPodcast", function() {
        return r
    })
}, , , function(t, e, i) {
    t.exports = i(108)
}, , , , , function(t, e, i) {
    var r = i(307).Buffer;

    function n(t, e, i) {
        for (var r, n, a, s = -1, u = 0; ++s < 8;) r = t._cipher.encryptBlock(t._prev), n = e & 1 << 7 - s ? 128 : 0, u += (128 & (a = r[0] ^ n)) >> s % 8, t._prev = o(t._prev, i ? n : a);
        return u
    }

    function o(t, e) {
        var i = t.length,
            n = -1,
            o = r.allocUnsafe(t.length);
        for (t = r.concat([t, r.from([e])]); ++n < i;) o[n] = t[n] << 1 | t[n + 1] >> 7;
        return o
    }
    e.encrypt = function(t, e, i) {
        for (var o = e.length, a = r.allocUnsafe(o), s = -1; ++s < o;) a[s] = n(t, e[s], i);
        return a
    }
}, function(t, e, i) {
    "use strict";

    function r(t, e, i) {
        (e = e || getAudioPlayer().getCurrentAudio()) && (e = AudioUtils.asObject(e), ajax.post("al_audio.php", {
            act: "replace_with_original",
            hash: e.replaceHash,
            audio_id: e.fullId
        }, {
            onDone: function(r) {
                var n = JSON.parse(e.extra).claim.original;
                n[AudioUtils.AUDIO_ITEM_INDEX_ID] = r, n[AudioUtils.AUDIO_ITEM_INDEX_OWNER_ID] = e.ownerId;
                var o = se(AudioUtils.drawAudio(n));
                t.parentElement.insertBefore(o, t), t.parentElement.removeChild(t), i && i()
            },
            onFail: i
        }))
    }
    i.r(e), i.d(e, "replaceWithOriginal", function() {
        return r
    })
}, function(t, e) {}, function(t, e, i) {
    "use strict";

    function r(t, e, i, r) {
        if (isUndefined(e.selected)) {
            var n = cur.attachCount && cur.attachCount() || 0;
            if (cur.chooseMedia("audio", i.fullId + "_" + i.actionHash, r), (!cur.attachCount || cur.attachCount() > n) && cur.lastAddMedia) {
                e.selected = cur.lastAddMedia.chosenMedias.length - 1, addClass(domPN(e), "audio_selected");
                var o = getSize(e)[0];
                setStyle(e, "width", o), e.innerHTML = getLang("global_cancel")
            }
        } else cur.lastAddMedia.unchooseMedia(e.selected), e.selected = void 0, removeClass(domPN(e), "audio_selected"), e.innerHTML = getLang("global_add_media");
        return cancelEvent(t)
    }
    i.r(e), i.d(e, "onAudioChoose", function() {
        return r
    })
}, function(t, e, i) {
    "use strict";
    i.r(e), i.d(e, "AudioPlayerFlash", function() {
        return n
    });
    var r = i(153);
    var n = function() {
        function t(e) {
            ! function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }(this, t), this.type = "flash", this.opts = e || {}, window._flashAudioInstance = this
        }
        return t.onAudioFinishCallback = function() {
            var t = window._flashAudioInstance;
            t.opts.onEnd && t.opts.onEnd()
        }, t.onAudioProgressCallback = function(t, e) {
            if (e) {
                var i = window._flashAudioInstance;
                i._total = e, i._currProgress = t / e, i.opts.onProgressUpdate && i.opts.onProgressUpdate(i._currProgress, t)
            }
        }, t.onAudioLoadProgressCallback = function(t, e) {
            var i = window._flashAudioInstance;
            i._currBuffered = t / e, i.opts.onBufferUpdate && i.opts.onBufferUpdate(i._currBuffered)
        }, t.prototype.fadeVolume = function(t, e) {
            return this.setVolume(t), e()
        }, t.prototype._startFrequencyAnalise = function() {
            var t = this;

            function e(t, e, i, r) {
                return (i - e) * t / r + e
            }

            function i(t, e) {
                return Math.random() * (e - t) + t
            }
            this._stopFrequencyAnalise();
            var r = 999,
                n = null,
                o = null;
            this._freqUpdateInterval = setInterval(function() {
                var a;
                ++r > 3 && (r = 0, n = o, o = [i(.7, 1), i(.55, .8), i(.3, .55), i(.03, .45)], n || (n = [i(.7, 1), i(.55, .8), i(.3, .55), i(.03, .45)])), a = [e(r, n[0], o[0], 3), e(r, n[1], o[1], 3), e(r, n[2], o[2], 3), e(r, n[3], o[3], 3)], t.opts.onFrequency(a)
            }, 50)
        }, t.prototype._stopFrequencyAnalise = function() {
            this._stopFrequencyAnaliseCallback && this._stopFrequencyAnaliseCallback(), delete this._stopFrequencyAnaliseCallback, clearInterval(this._freqUpdateInterval), this.opts.onFrequency([0, 0, 0, 0])
        }, t.prototype.destroy = function() {
            re("flash_audio")
        }, t.prototype.onReady = function(t) {
            var e = this;
            if (this._player) return t(!0);
            if (!1 === this._player) return t(!1);
            this._onReady = t;
            ge("flash_audio") || document.body.appendChild(ce("div", {
                id: "flash_audio",
                className: "fixed"
            })), renderFlash("flash_audio", {
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
                return e._checkFlashLoaded()
            }, 50)
        }, t.prototype.setUrl = function(t, e) {
            var i = Object(r.audioUnmaskSource)(t);
            this._url !== i ? (this._url = i, this._player && this._player.loadAudio(i), e && e(!0)) : e && e(!0)
        }, t.prototype.setVolume = function(t) {
            this._player && this._player.setVolume && this._player.setVolume(t)
        }, t.prototype.setPlaybackRate = function() {
            return !1
        }, t.prototype.play = function() {
            this._player && this._player.playAudio(), this._startFrequencyAnalise()
        }, t.prototype.seek = function(t) {
            var e = (this._total || 0) * t;
            this._player && this._player.playAudio(e)
        }, t.prototype.pause = function() {
            this._player && this._player.pauseAudio(), this._stopFrequencyAnalise()
        }, t.prototype.isFullyLoaded = function() {
            return !1
        }, t.prototype.getPlayedTime = function() {
            return 0
        }, t.prototype.getCurrentProgress = function() {
            return this._currProgress || 0
        }, t.prototype.getCurrentBuffered = function() {
            return this._currBuffered || 0
        }, t.prototype._checkFlashLoaded = function() {
            var t = this,
                e = ge("player");
            if (this._checks = this._checks || 0, this._checks++, this._checks > 10) return this._player = !1, this._onReady && this._onReady(!1);
            e && e.paused ? (this._player = e, this._onReady && this._onReady(!0), this._onReady = null) : setTimeout(function() {
                return t._checkFlashLoaded()
            }, 100)
        }, t.prototype.getErrorData = function() {
            return {
                url: this._url
            }
        }, t
    }()
}, , , function(t, e, i) {
    "use strict";
    (function(t, r) {
        function n() {
            throw new Error("secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11")
        }
        var o = i(307),
            a = i(503),
            s = o.Buffer,
            u = o.kMaxLength,
            d = t.crypto || t.msCrypto,
            c = Math.pow(2, 32) - 1;

        function f(t, e) {
            if ("number" != typeof t || t != t) throw new TypeError("offset must be a number");
            if (t > c || t < 0) throw new TypeError("offset must be a uint32");
            if (t > u || t > e) throw new RangeError("offset out of range")
        }

        function l(t, e, i) {
            if ("number" != typeof t || t != t) throw new TypeError("size must be a number");
            if (t > c || t < 0) throw new TypeError("size must be a uint32");
            if (t + e > i || t > u) throw new RangeError("buffer too small")
        }

        function h(t, e, i, n) {
            if (r.browser) {
                var o = t.buffer,
                    s = new Uint8Array(o, e, i);
                return d.getRandomValues(s), n ? void r.nextTick(function() {
                    n(null, t)
                }) : t
            }
            if (!n) return a(i).copy(t, e), t;
            a(i, function(i, r) {
                if (i) return n(i);
                r.copy(t, e), n(null, t)
            })
        }
        d && d.getRandomValues || !r.browser ? (e.randomFill = function(e, i, r, n) {
            if (!(s.isBuffer(e) || e instanceof t.Uint8Array)) throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
            if ("function" == typeof i) n = i, i = 0, r = e.length;
            else if ("function" == typeof r) n = r, r = e.length - i;
            else if ("function" != typeof n) throw new TypeError('"cb" argument must be a function');
            return f(i, e.length), l(r, i, e.length), h(e, i, r, n)
        }, e.randomFillSync = function(e, i, r) {
            void 0 === i && (i = 0);
            if (!(s.isBuffer(e) || e instanceof t.Uint8Array)) throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
            f(i, e.length), void 0 === r && (r = e.length - i);
            return l(r, i, e.length), h(e, i, r)
        }) : (e.randomFill = n, e.randomFillSync = n)
    }).call(this, i(186), i(210))
}, function(t, e, i) {
    var r = i(581),
        n = i(315).Buffer,
        o = i(320);

    function a(t) {
        o.call(this, t), this.enc = "pem"
    }
    r(a, o), t.exports = a, a.prototype.decode = function(t, e) {
        for (var i = t.toString().split(/[\r\n]+/g), r = e.label.toUpperCase(), a = /^-----(BEGIN|END) ([^-]+)-----$/, s = -1, u = -1, d = 0; d < i.length; d++) {
            var c = i[d].match(a);
            if (null !== c && c[2] === r) {
                if (-1 !== s) {
                    if ("END" !== c[1]) break;
                    u = d;
                    break
                }
                if ("BEGIN" !== c[1]) break;
                s = d
            }
        }
        if (-1 === s || -1 === u) throw new Error("PEM section not found for: " + r);
        var f = i.slice(s + 1, u).join("");
        f.replace(/[^a-z0-9\+\/=]+/gi, "");
        var l = new n(f, "base64");
        return o.prototype.decode.call(this, l, e)
    }
}]);