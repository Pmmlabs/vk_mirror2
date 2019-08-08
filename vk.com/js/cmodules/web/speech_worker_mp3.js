! function(e) {
    function t(t) {
        for (var s, _, i = t[0], o = t[1], l = t[2], c = 0, u = []; c < i.length; c++) _ = i[c], n[_] && u.push(n[_][0]), n[_] = 0;
        for (s in o) Object.prototype.hasOwnProperty.call(o, s) && (e[s] = o[s]);
        for (f && f(t); u.length;) u.shift()();
        return r.push.apply(r, l || []), a()
    }

    function a() {
        for (var e, t = 0; t < r.length; t++) {
            for (var a = r[t], s = !0, i = 1; i < a.length; i++) {
                var o = a[i];
                0 !== n[o] && (s = !1)
            }
            s && (r.splice(t--, 1), e = _(_.s = a[0]))
        }
        return e
    }
    var s = {},
        n = {
            "web/speech_worker_mp3": 0
        },
        r = [];

    function _(t) {
        if (s[t]) return s[t].exports;
        var a = s[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(a.exports, a, a.exports, _), a.l = !0, a.exports
    }
    _.m = e, _.c = s, _.d = function(e, t, a) {
        _.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: a
        })
    }, _.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, _.t = function(e, t) {
        if (1 & t && (e = _(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var a = Object.create(null);
        if (_.r(a), Object.defineProperty(a, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var s in e) _.d(a, s, function(t) {
                return e[t]
            }.bind(null, s));
        return a
    }, _.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return _.d(t, "a", t), t
    }, _.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, _.p = "";
    var i = window.webpackJsonp = window.webpackJsonp || [],
        o = i.push.bind(i);
    i.push = t, i = i.slice();
    for (var l = 0; l < i.length; l++) t(i[l]);
    var f = o;
    r.push([142, "bundles/common"]), a()
}({
    "/4Hr": function(e, t, a) {
        var s = a("Agby"),
            n = s.System,
            r = (s.VbrMode, s.Float, s.ShortBlock, s.Util, s.Arrays, s.new_array_n, s.new_byte, s.new_double, s.new_float, s.new_float_n, s.new_int),
            _ = (s.new_int_n, s.assert, a("S14o"));
        e.exports = function(e, t, a, s) {
            this.l = r(1 + _.SBMAX_l), this.s = r(1 + _.SBMAX_s), this.psfb21 = r(1 + _.PSFB21), this.psfb12 = r(1 + _.PSFB12);
            var i = this.l,
                o = this.s;
            4 == arguments.length && (this.arrL = arguments[0], this.arrS = arguments[1], this.arr21 = arguments[2], this.arr12 = arguments[3], n.arraycopy(this.arrL, 0, i, 0, Math.min(this.arrL.length, this.l.length)), n.arraycopy(this.arrS, 0, o, 0, Math.min(this.arrS.length, this.s.length)), n.arraycopy(this.arr21, 0, this.psfb21, 0, Math.min(this.arr21.length, this.psfb21.length)), n.arraycopy(this.arr12, 0, this.psfb12, 0, Math.min(this.arr12.length, this.psfb12.length)))
        }
    },
    142: function(e, t, a) {
        e.exports = a("KzWn")
    },
    "27FD": function(e, t, a) {
        var s = a("Agby"),
            n = s.System,
            r = s.VbrMode,
            _ = (s.Float, s.ShortBlock, s.Util),
            i = s.Arrays,
            o = (s.new_array_n, s.new_byte, s.new_double, s.new_float),
            l = (s.new_float_n, s.new_int, s.new_int_n, s.assert),
            f = a("omqh"),
            c = a("cnaB"),
            u = a("CeaS"),
            h = a("S14o"),
            b = a("87Ww"),
            m = a("mCij");
        e.exports = function() {
            var e, t, a;
            this.rv = null, this.qupvt = null;
            var s, p = new f;

            function d(e) {
                this.ordinal = e
            }

            function v(e) {
                for (var t = 0; t < e.sfbmax; t++)
                    if (e.scalefac[t] + e.subblock_gain[e.window[t]] == 0) return !1;
                return !0
            }

            function g(e) {
                return _.FAST_LOG10(.368 + .632 * e * e * e)
            }

            function S(e, t, a, s, n) {
                var r;
                switch (e) {
                    default:
                        case 9:
                        t.over_count > 0 ? (r = a.over_SSD <= t.over_SSD, a.over_SSD == t.over_SSD && (r = a.bits < t.bits)) : r = a.max_noise < 0 && 10 * a.max_noise + a.bits <= 10 * t.max_noise + t.bits;
                    break;
                    case 0:
                            r = a.over_count < t.over_count || a.over_count == t.over_count && a.over_noise < t.over_noise || a.over_count == t.over_count && BitStream.EQ(a.over_noise, t.over_noise) && a.tot_noise < t.tot_noise;
                        break;
                    case 8:
                            a.max_noise = function(e, t) {
                            for (var a = 1e-37, s = 0; s < t.psymax; s++) a += g(e[s]);
                            return Math.max(1e-20, a)
                        }(n, s);
                    case 1:
                            r = a.max_noise < t.max_noise;
                        break;
                    case 2:
                            r = a.tot_noise < t.tot_noise;
                        break;
                    case 3:
                            r = a.tot_noise < t.tot_noise && a.max_noise < t.max_noise;
                        break;
                    case 4:
                            r = a.max_noise <= 0 && t.max_noise > .2 || a.max_noise <= 0 && t.max_noise < 0 && t.max_noise > a.max_noise - .2 && a.tot_noise < t.tot_noise || a.max_noise <= 0 && t.max_noise > 0 && t.max_noise > a.max_noise - .2 && a.tot_noise < t.tot_noise + t.over_noise || a.max_noise > 0 && t.max_noise > -.05 && t.max_noise > a.max_noise - .1 && a.tot_noise + a.over_noise < t.tot_noise + t.over_noise || a.max_noise > 0 && t.max_noise > -.1 && t.max_noise > a.max_noise - .15 && a.tot_noise + a.over_noise + a.over_noise < t.tot_noise + t.over_noise + t.over_noise;
                        break;
                    case 5:
                            r = a.over_noise < t.over_noise || BitStream.EQ(a.over_noise, t.over_noise) && a.tot_noise < t.tot_noise;
                        break;
                    case 6:
                            r = a.over_noise < t.over_noise || BitStream.EQ(a.over_noise, t.over_noise) && (a.max_noise < t.max_noise || BitStream.EQ(a.max_noise, t.max_noise) && a.tot_noise <= t.tot_noise);
                        break;
                    case 7:
                            r = a.over_count < t.over_count || a.over_noise < t.over_noise
                }
                return 0 == t.over_count && (r = r && a.bits < t.bits), r
            }

            function w(e, t, n, r, _) {
                var o = e.internal_flags;
                ! function(e, t, a, s, n) {
                    var r, _ = e.internal_flags;
                    r = 0 == t.scalefac_scale ? 1.2968395546510096 : 1.6817928305074292;
                    for (var i = 0, o = 0; o < t.sfbmax; o++) i < a[o] && (i = a[o]);
                    var l = _.noise_shaping_amp;
                    switch (3 == l && (l = n ? 2 : 1), l) {
                        case 2:
                            break;
                        case 1:
                            i > 1 ? i = Math.pow(i, .5) : i *= .95;
                            break;
                        case 0:
                        default:
                            i > 1 ? i = 1 : i *= .95
                    }
                    var f = 0;
                    for (o = 0; o < t.sfbmax; o++) {
                        var c, u = t.width[o];
                        if (f += u, !(a[o] < i)) {
                            if (0 != (2 & _.substep_shaping) && (_.pseudohalf[o] = 0 == _.pseudohalf[o] ? 1 : 0, 0 == _.pseudohalf[o] && 2 == _.noise_shaping_amp)) return;
                            for (t.scalefac[o]++, c = -u; c < 0; c++) s[f + c] *= r, s[f + c] > t.xrpow_max && (t.xrpow_max = s[f + c]);
                            if (2 == _.noise_shaping_amp) return
                        }
                    }
                }(e, t, n, r, _);
                var f = v(t);
                return !(f || (f = 2 == o.mode_gr ? s.scale_bitcount(t) : s.scale_bitcount_lsf(o, t)) && (o.noise_shaping > 1 && (i.fill(o.pseudohalf, 0), 0 == t.scalefac_scale ? (function(e, t) {
                    for (var s = 0, n = 0; n < e.sfbmax; n++) {
                        var r = e.width[n],
                            _ = e.scalefac[n];
                        if (0 != e.preflag && (_ += a.pretab[n]), s += r, 0 != (1 & _)) {
                            _++;
                            for (var i = -r; i < 0; i++) t[s + i] *= 1.2968395546510096, t[s + i] > e.xrpow_max && (e.xrpow_max = t[s + i])
                        }
                        e.scalefac[n] = _ >> 1
                    }
                    e.preflag = 0, e.scalefac_scale = 1
                }(t, r), f = !1) : t.block_type == h.SHORT_TYPE && o.subblock_gain > 0 && (f = function(e, t, s) {
                    var n, r = t.scalefac;
                    for (n = 0; n < t.sfb_lmax; n++)
                        if (r[n] >= 16) return !0;
                    for (var _ = 0; _ < 3; _++) {
                        var i = 0,
                            o = 0;
                        for (n = t.sfb_lmax + _; n < t.sfbdivide; n += 3) i < r[n] && (i = r[n]);
                        for (; n < t.sfbmax; n += 3) o < r[n] && (o = r[n]);
                        if (!(i < 16 && o < 8)) {
                            if (t.subblock_gain[_] >= 7) return !0;
                            t.subblock_gain[_]++;
                            var f = e.scalefac_band.l[t.sfb_lmax];
                            for (n = t.sfb_lmax + _; n < t.sfbmax; n += 3) {
                                var c = t.width[n],
                                    u = r[n];
                                if (l(u >= 0), (u -= 4 >> t.scalefac_scale) >= 0) r[n] = u, f += 3 * c;
                                else {
                                    r[n] = 0;
                                    var h = 210 + (u << t.scalefac_scale + 1);
                                    m = a.IPOW20(h), f += c * (_ + 1);
                                    for (var b = -c; b < 0; b++) s[f + b] *= m, s[f + b] > t.xrpow_max && (t.xrpow_max = s[f + b]);
                                    f += c * (3 - _ - 1)
                                }
                            }
                            var m = a.IPOW20(202);
                            for (f += t.width[n] * (_ + 1), b = -t.width[n]; b < 0; b++) s[f + b] *= m, s[f + b] > t.xrpow_max && (t.xrpow_max = s[f + b])
                        }
                    }
                    return !1
                }(o, t, r) || v(t))), f || (f = 2 == o.mode_gr ? s.scale_bitcount(t) : s.scale_bitcount_lsf(o, t)), f))
            }
            this.setModules = function(n, r, _, i) {
                e = n, t = r, this.rv = r, a = _, this.qupvt = _, s = i, p.setModules(a, s)
            }, this.ms_convert = function(e, t) {
                for (var a = 0; a < 576; ++a) {
                    var s = e.tt[t][0].xr[a],
                        n = e.tt[t][1].xr[a];
                    e.tt[t][0].xr[a] = (s + n) * (.5 * _.SQRT2), e.tt[t][1].xr[a] = (s - n) * (.5 * _.SQRT2)
                }
            }, this.init_xrpow = function(e, t, a) {
                var s = 0,
                    n = 0 | t.max_nonzero_coeff;
                if (l(null != a), t.xrpow_max = 0, l(0 <= n && n <= 575), i.fill(a, n, 576, 0), (s = function(e, t, a, s) {
                        s = 0;
                        for (var n = 0; n <= a; ++n) {
                            var r = Math.abs(e.xr[n]);
                            s += r, t[n] = Math.sqrt(r * Math.sqrt(r)), t[n] > e.xrpow_max && (e.xrpow_max = t[n])
                        }
                        return s
                    }(t, a, n, s)) > 1e-20) {
                    var r = 0;
                    0 != (2 & e.substep_shaping) && (r = 1);
                    for (var _ = 0; _ < t.psymax; _++) e.pseudohalf[_] = r;
                    return !0
                }
                return i.fill(t.l3_enc, 0, 576, 0), !1
            }, this.init_outer_loop = function(e, t) {
                t.part2_3_length = 0, t.big_values = 0, t.count1 = 0, t.global_gain = 210, t.scalefac_compress = 0, t.table_select[0] = 0, t.table_select[1] = 0, t.table_select[2] = 0, t.subblock_gain[0] = 0, t.subblock_gain[1] = 0, t.subblock_gain[2] = 0, t.subblock_gain[3] = 0, t.region0_count = 0, t.region1_count = 0, t.preflag = 0, t.scalefac_scale = 0, t.count1table_select = 0, t.part2_length = 0, t.sfb_lmax = h.SBPSY_l, t.sfb_smin = h.SBPSY_s, t.psy_lmax = e.sfb21_extra ? h.SBMAX_l : h.SBPSY_l, t.psymax = t.psy_lmax, t.sfbmax = t.sfb_lmax, t.sfbdivide = 11;
                for (var s = 0; s < h.SBMAX_l; s++) t.width[s] = e.scalefac_band.l[s + 1] - e.scalefac_band.l[s], t.window[s] = 3;
                if (t.block_type == h.SHORT_TYPE) {
                    var r = o(576);
                    t.sfb_smin = 0, t.sfb_lmax = 0, 0 != t.mixed_block_flag && (t.sfb_smin = 3, t.sfb_lmax = 2 * e.mode_gr + 4), t.psymax = t.sfb_lmax + 3 * ((e.sfb21_extra ? h.SBMAX_s : h.SBPSY_s) - t.sfb_smin), t.sfbmax = t.sfb_lmax + 3 * (h.SBPSY_s - t.sfb_smin), t.sfbdivide = t.sfbmax - 18, t.psy_lmax = t.sfb_lmax;
                    var _ = e.scalefac_band.l[t.sfb_lmax];
                    for (n.arraycopy(t.xr, 0, r, 0, 576), s = t.sfb_smin; s < h.SBMAX_s; s++)
                        for (var l = e.scalefac_band.s[s], f = e.scalefac_band.s[s + 1], c = 0; c < 3; c++)
                            for (var u = l; u < f; u++) t.xr[_++] = r[3 * u + c];
                    var b = t.sfb_lmax;
                    for (s = t.sfb_smin; s < h.SBMAX_s; s++) t.width[b] = t.width[b + 1] = t.width[b + 2] = e.scalefac_band.s[s + 1] - e.scalefac_band.s[s], t.window[b] = 0, t.window[b + 1] = 1, t.window[b + 2] = 2, b += 3
                }
                t.count1bits = 0, t.sfb_partition_table = a.nr_of_sfb_block[0][0], t.slen[0] = 0, t.slen[1] = 0, t.slen[2] = 0, t.slen[3] = 0, t.max_nonzero_coeff = 575, i.fill(t.scalefac, 0),
                    function(e, t) {
                        var s = e.ATH,
                            n = t.xr;
                        if (t.block_type != h.SHORT_TYPE)
                            for (var r = !1, _ = h.PSFB21 - 1; _ >= 0 && !r; _--) {
                                var i = e.scalefac_band.psfb21[_],
                                    o = e.scalefac_band.psfb21[_ + 1],
                                    l = a.athAdjust(s.adjust, s.psfb21[_], s.floor);
                                e.nsPsy.longfact[21] > 1e-12 && (l *= e.nsPsy.longfact[21]);
                                for (var f = o - 1; f >= i; f--) {
                                    if (!(Math.abs(n[f]) < l)) {
                                        r = !0;
                                        break
                                    }
                                    n[f] = 0
                                }
                            } else
                                for (var c = 0; c < 3; c++)
                                    for (r = !1, _ = h.PSFB12 - 1; _ >= 0 && !r; _--) {
                                        o = (i = 3 * e.scalefac_band.s[12] + (e.scalefac_band.s[13] - e.scalefac_band.s[12]) * c + (e.scalefac_band.psfb12[_] - e.scalefac_band.psfb12[0])) + (e.scalefac_band.psfb12[_ + 1] - e.scalefac_band.psfb12[_]);
                                        var u = a.athAdjust(s.adjust, s.psfb12[_], s.floor);
                                        for (e.nsPsy.shortfact[12] > 1e-12 && (u *= e.nsPsy.shortfact[12]), f = o - 1; f >= i; f--) {
                                            if (!(Math.abs(n[f]) < u)) {
                                                r = !0;
                                                break
                                            }
                                            n[f] = 0
                                        }
                                    }
                    }(e, t)
            }, d.BINSEARCH_NONE = new d(0), d.BINSEARCH_UP = new d(1), d.BINSEARCH_DOWN = new d(2), this.trancate_smallspectrums = function(e, t, n, r) {
                var _ = o(m.SFBMAX);
                if ((0 != (4 & e.substep_shaping) || t.block_type != h.SHORT_TYPE) && 0 == (128 & e.substep_shaping)) {
                    a.calc_noise(t, n, _, new c, null);
                    for (var l = 0; l < 576; l++) {
                        var f = 0;
                        0 != t.l3_enc[l] && (f = Math.abs(t.xr[l])), r[l] = f
                    }
                    l = 0;
                    var u = 8;
                    t.block_type == h.SHORT_TYPE && (u = 6);
                    do {
                        var b, p, d, v, g = t.width[u];
                        if (l += g, !(_[u] >= 1 || (i.sort(r, l - g, g), BitStream.EQ(r[l - 1], 0)))) {
                            b = (1 - _[u]) * n[u], p = 0, v = 0;
                            do {
                                var S;
                                for (d = 1; v + d < g && !BitStream.NEQ(r[v + l - g], r[v + l + d - g]); d++);
                                if (b < (S = r[v + l - g] * r[v + l - g] * d)) {
                                    0 != v && (p = r[v + l - g - 1]);
                                    break
                                }
                                b -= S, v += d
                            } while (v < g);
                            if (!BitStream.EQ(p, 0))
                                do {
                                    Math.abs(t.xr[l - g]) <= p && (t.l3_enc[l - g] = 0)
                                } while (--g > 0)
                        }
                    } while (++u < t.psymax);
                    t.part2_3_length = s.noquant_count_bits(e, t, null)
                }
            }, this.outer_loop = function(e, t, _, i, f, p) {
                var v = e.internal_flags,
                    g = new b,
                    M = o(576),
                    A = o(m.SFBMAX),
                    R = new c,
                    B = new u,
                    y = 9999999,
                    E = !1,
                    T = !1,
                    k = 0;
                if (function(e, t, a, n, r) {
                        var _, i = e.CurrentStep[n],
                            o = !1,
                            f = e.OldValue[n],
                            c = d.BINSEARCH_NONE;
                        for (t.global_gain = f, a -= t.part2_length, l(0 != i);;) {
                            var u;
                            if (_ = s.count_bits(e, r, t, null), 1 == i || _ == a) break;
                            _ > a ? (c == d.BINSEARCH_DOWN && (o = !0), o && (i /= 2), c = d.BINSEARCH_UP, u = i) : (c == d.BINSEARCH_UP && (o = !0), o && (i /= 2), c = d.BINSEARCH_DOWN, u = -i), t.global_gain += u, t.global_gain < 0 && (t.global_gain = 0, o = !0), t.global_gain > 255 && (t.global_gain = 255, o = !0)
                        }
                        for (l(t.global_gain >= 0), l(t.global_gain < 256); _ > a && t.global_gain < 255;) t.global_gain++, _ = s.count_bits(e, r, t, null);
                        e.CurrentStep[n] = f - t.global_gain >= 4 ? 4 : 2, e.OldValue[n] = t.global_gain, t.part2_3_length = _
                    }(v, t, p, f, i), 0 == v.noise_shaping) return 100;
                a.calc_noise(t, _, A, R, B), R.bits = t.part2_3_length, g.assign(t);
                var x = 0;
                for (n.arraycopy(i, 0, M, 0, 576); !E;) {
                    do {
                        var P, I = new c,
                            L = 255;
                        if (P = 0 != (2 & v.substep_shaping) ? 20 : 3, v.sfb21_extra) {
                            if (A[g.sfbmax] > 1) break;
                            if (g.block_type == h.SHORT_TYPE && (A[g.sfbmax + 1] > 1 || A[g.sfbmax + 2] > 1)) break
                        }
                        if (!w(e, g, A, i, T)) break;
                        0 != g.scalefac_scale && (L = 254);
                        var V = p - g.part2_length;
                        if (V <= 0) break;
                        for (;
                            (g.part2_3_length = s.count_bits(v, i, g, B)) > V && g.global_gain <= L;) g.global_gain++;
                        if (g.global_gain > L) break;
                        if (0 == R.over_count) {
                            for (;
                                (g.part2_3_length = s.count_bits(v, i, g, B)) > y && g.global_gain <= L;) g.global_gain++;
                            if (g.global_gain > L) break
                        }
                        if (a.calc_noise(g, _, A, I, B), I.bits = g.part2_3_length, 0 != (S(t.block_type != h.SHORT_TYPE ? e.quant_comp : e.quant_comp_short, R, I, g, A) ? 1 : 0)) y = t.part2_3_length, R = I, t.assign(g), x = 0, n.arraycopy(i, 0, M, 0, 576);
                        else if (0 == v.full_outer_loop) {
                            if (++x > P && 0 == R.over_count) break;
                            if (3 == v.noise_shaping_amp && T && x > 30) break;
                            if (3 == v.noise_shaping_amp && T && g.global_gain - k > 15) break
                        }
                    } while (g.global_gain + g.scalefac_scale < 255);
                    3 == v.noise_shaping_amp ? T ? E = !0 : (g.assign(t), n.arraycopy(M, 0, i, 0, 576), x = 0, k = g.global_gain, T = !0) : E = !0
                }
                return l(t.global_gain + t.scalefac_scale <= 255), e.VBR == r.vbr_rh || e.VBR == r.vbr_mtrh ? n.arraycopy(M, 0, i, 0, 576) : 0 != (1 & v.substep_shaping) && trancate_smallspectrums(v, t, _, i), R.over_count
            }, this.iteration_finish_one = function(e, a, n) {
                var r = e.l3_side,
                    _ = r.tt[a][n];
                s.best_scalefac_store(e, a, n, r), 1 == e.use_best_huffman && s.best_huffman_divide(e, _), t.ResvAdjust(e, _)
            }, this.VBR_encode_granule = function(e, t, a, s, r, _, f) {
                var c, u = e.internal_flags,
                    h = new b,
                    m = o(576),
                    p = f,
                    d = f + 1,
                    v = (f + _) / 2,
                    g = 0,
                    S = u.sfb21_extra;
                l(p <= LameInternalFlags.MAX_BITS_PER_CHANNEL), i.fill(h.l3_enc, 0);
                do {
                    l(v >= _), l(v <= f), l(_ <= f), u.sfb21_extra = !(v > p - 42) && S, outer_loop(e, t, a, s, r, v) <= 0 ? (g = 1, d = t.part2_3_length, h.assign(t), n.arraycopy(s, 0, m, 0, 576), c = (f = d - 32) - _, v = (f + _) / 2) : (c = f - (_ = v + 32), v = (f + _) / 2, 0 != g && (g = 2, t.assign(h), n.arraycopy(m, 0, s, 0, 576)))
                } while (c > 12);
                u.sfb21_extra = S, 2 == g && n.arraycopy(h.l3_enc, 0, t.l3_enc, 0, 576), l(t.part2_3_length <= p)
            }, this.get_framebits = function(a, s) {
                var n = a.internal_flags;
                n.bitrate_index = n.VBR_min_bitrate;
                var r = e.getframebits(a);
                n.bitrate_index = 1, r = e.getframebits(a);
                for (var _ = 1; _ <= n.VBR_max_bitrate; _++) {
                    n.bitrate_index = _;
                    var i = new MeanBits(r);
                    s[_] = t.ResvFrameBegin(a, i), r = i.bits
                }
            }, this.VBR_old_prepare = function(e, s, n, r, _, i, o, l, f) {
                var c, u = e.internal_flags,
                    b = 0,
                    m = 1,
                    p = 0;
                u.bitrate_index = u.VBR_max_bitrate;
                var d = t.ResvFrameBegin(e, new MeanBits(0)) / u.mode_gr;
                get_framebits(e, i);
                for (var v = 0; v < u.mode_gr; v++) {
                    var g = a.on_pe(e, s, l[v], d, v, 0);
                    u.mode_ext == h.MPG_MD_MS_LR && (ms_convert(u.l3_side, v), a.reduce_side(l[v], n[v], d, g));
                    for (var S = 0; S < u.channels_out; ++S) {
                        var w = u.l3_side.tt[v][S];
                        w.block_type != h.SHORT_TYPE ? (b = 1.28 / (1 + Math.exp(3.5 - s[v][S] / 300)) - .05, c = u.PSY.mask_adjust - b) : (b = 2.56 / (1 + Math.exp(3.5 - s[v][S] / 300)) - .14, c = u.PSY.mask_adjust_short - b), u.masking_lower = Math.pow(10, .1 * c), init_outer_loop(u, w), f[v][S] = a.calc_xmin(e, r[v][S], w, _[v][S]), 0 != f[v][S] && (m = 0), o[v][S] = 126, p += l[v][S]
                    }
                }
                for (v = 0; v < u.mode_gr; v++)
                    for (S = 0; S < u.channels_out; S++) p > i[u.VBR_max_bitrate] && (l[v][S] *= i[u.VBR_max_bitrate], l[v][S] /= p), o[v][S] > l[v][S] && (o[v][S] = l[v][S]);
                return m
            }, this.bitpressure_strategy = function(e, t, a, s) {
                for (var n = 0; n < e.mode_gr; n++)
                    for (var r = 0; r < e.channels_out; r++) {
                        for (var _ = e.l3_side.tt[n][r], i = t[n][r], o = 0, l = 0; l < _.psy_lmax; l++) i[o++] *= 1 + .029 * l * l / h.SBMAX_l / h.SBMAX_l;
                        if (_.block_type == h.SHORT_TYPE)
                            for (l = _.sfb_smin; l < h.SBMAX_s; l++) i[o++] *= 1 + .029 * l * l / h.SBMAX_s / h.SBMAX_s, i[o++] *= 1 + .029 * l * l / h.SBMAX_s / h.SBMAX_s, i[o++] *= 1 + .029 * l * l / h.SBMAX_s / h.SBMAX_s;
                        s[n][r] = 0 | Math.max(a[n][r], .9 * s[n][r])
                    }
            }, this.VBR_new_prepare = function(e, s, n, r, _, i) {
                var o, l = e.internal_flags,
                    f = 1,
                    c = 0,
                    u = 0;
                if (e.free_format) l.bitrate_index = 0, b = new MeanBits(c), o = t.ResvFrameBegin(e, b), c = b.bits, _[0] = o;
                else {
                    l.bitrate_index = l.VBR_max_bitrate;
                    var b = new MeanBits(c);
                    t.ResvFrameBegin(e, b), c = b.bits, get_framebits(e, _), o = _[l.VBR_max_bitrate]
                }
                for (var m = 0; m < l.mode_gr; m++) {
                    a.on_pe(e, s, i[m], c, m, 0), l.mode_ext == h.MPG_MD_MS_LR && ms_convert(l.l3_side, m);
                    for (var p = 0; p < l.channels_out; ++p) {
                        var d = l.l3_side.tt[m][p];
                        l.masking_lower = Math.pow(10, .1 * l.PSY.mask_adjust), init_outer_loop(l, d), 0 != a.calc_xmin(e, n[m][p], d, r[m][p]) && (f = 0), u += i[m][p]
                    }
                }
                for (m = 0; m < l.mode_gr; m++)
                    for (p = 0; p < l.channels_out; p++) u > o && (i[m][p] *= o, i[m][p] /= u);
                return f
            }, this.calc_target_bits = function(s, n, r, _, i, o) {
                var l, f, c, u, b = s.internal_flags,
                    m = b.l3_side,
                    p = 0;
                b.bitrate_index = b.VBR_max_bitrate;
                var d = new MeanBits(p);
                for (o[0] = t.ResvFrameBegin(s, d), p = d.bits, b.bitrate_index = 1, p = e.getframebits(s) - 8 * b.sideinfo_len, i[0] = p / (b.mode_gr * b.channels_out), p = s.VBR_mean_bitrate_kbps * s.framesize * 1e3, 0 != (1 & b.substep_shaping) && (p *= 1.09), p /= s.out_samplerate, p -= 8 * b.sideinfo_len, p /= b.mode_gr * b.channels_out, (l = .93 + .07 * (11 - s.compression_ratio) / 5.5) < .9 && (l = .9), l > 1 && (l = 1), f = 0; f < b.mode_gr; f++) {
                    var v = 0;
                    for (c = 0; c < b.channels_out; c++) {
                        if (_[f][c] = int(l * p), n[f][c] > 700) {
                            var g = int((n[f][c] - 700) / 1.4),
                                S = m.tt[f][c];
                            _[f][c] = int(l * p), S.block_type == h.SHORT_TYPE && g < p / 2 && (g = p / 2), g > 3 * p / 2 ? g = 3 * p / 2 : g < 0 && (g = 0), _[f][c] += g
                        }
                        _[f][c] > LameInternalFlags.MAX_BITS_PER_CHANNEL && (_[f][c] = LameInternalFlags.MAX_BITS_PER_CHANNEL), v += _[f][c]
                    }
                    if (v > LameInternalFlags.MAX_BITS_PER_GRANULE)
                        for (c = 0; c < b.channels_out; ++c) _[f][c] *= LameInternalFlags.MAX_BITS_PER_GRANULE, _[f][c] /= v
                }
                if (b.mode_ext == h.MPG_MD_MS_LR)
                    for (f = 0; f < b.mode_gr; f++) a.reduce_side(_[f], r[f], p * b.channels_out, LameInternalFlags.MAX_BITS_PER_GRANULE);
                for (u = 0, f = 0; f < b.mode_gr; f++)
                    for (c = 0; c < b.channels_out; c++) _[f][c] > LameInternalFlags.MAX_BITS_PER_CHANNEL && (_[f][c] = LameInternalFlags.MAX_BITS_PER_CHANNEL), u += _[f][c];
                if (u > o[0])
                    for (f = 0; f < b.mode_gr; f++)
                        for (c = 0; c < b.channels_out; c++) _[f][c] *= o[0], _[f][c] /= u
            }
        }
    },
    "2b6p": function(e, t, a) {
        var s = a("Agby"),
            n = s.System,
            r = (s.VbrMode, s.Float, s.ShortBlock, s.Util, s.Arrays),
            _ = (s.new_array_n, s.new_byte, s.new_double, s.new_float, s.new_float_n, s.new_int),
            i = (s.new_int_n, s.assert),
            o = a("S14o"),
            l = a("X4Rc"),
            f = a("87Ww"),
            c = a("uyIQ");
        e.exports = function e() {
            var t = null;

            function a(e) {
                this.bits = 0 | e
            }
            this.qupvt = null, this.setModules = function(e) {
                this.qupvt = e, t = e
            };
            var s = [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 1],
                [1, 1],
                [1, 1],
                [1, 2],
                [2, 2],
                [2, 3],
                [2, 3],
                [3, 4],
                [3, 4],
                [3, 4],
                [4, 5],
                [4, 5],
                [4, 6],
                [5, 6],
                [5, 6],
                [5, 7],
                [6, 7],
                [6, 7]
            ];

            function u(e, t, a, s, n, r) {
                var _ = .5946 / t;
                for (i(e > 0), e >>= 1; 0 != e--;) n[r++] = _ > a[s++] ? 0 : 1, n[r++] = _ > a[s++] ? 0 : 1
            }

            function h(e, a, s, n, r, _) {
                i(e > 0);
                var o = (e >>= 1) % 2;
                for (e >>= 1; 0 != e--;) {
                    var l, f, c, u, h, b, m, p;
                    l = s[n++] * a, f = s[n++] * a, h = 0 | l, c = s[n++] * a, b = 0 | f, u = s[n++] * a, m = 0 | c, l += t.adj43[h], p = 0 | u, f += t.adj43[b], r[_++] = 0 | l, c += t.adj43[m], r[_++] = 0 | f, u += t.adj43[p], r[_++] = 0 | c, r[_++] = 0 | u
                }
                0 != o && (h = 0 | (l = s[n++] * a), b = 0 | (f = s[n++] * a), l += t.adj43[h], f += t.adj43[b], r[_++] = 0 | l, r[_++] = 0 | f)
            }
            var b = [1, 2, 5, 7, 7, 10, 10, 13, 13, 13, 13, 13, 13, 13, 13];

            function m(e, t, a, s) {
                var n = function(e, t, a) {
                    var s = 0,
                        n = 0;
                    do {
                        var r = e[t++],
                            _ = e[t++];
                        s < r && (s = r), n < _ && (n = _)
                    } while (t < a);
                    return s < n && (s = n), s
                }(e, t, a);
                switch (n) {
                    case 0:
                        return n;
                    case 1:
                        return function(e, t, a, s) {
                            var n = 0,
                                r = l.ht[1].hlen;
                            do {
                                var _ = 2 * e[t + 0] + e[t + 1];
                                t += 2, n += r[_]
                            } while (t < a);
                            return s.bits += n, 1
                        }(e, t, a, s);
                    case 2:
                    case 3:
                        return function(e, t, a, s, n) {
                            var r, _, i = 0,
                                o = l.ht[s].xlen;
                            _ = 2 == s ? l.table23 : l.table56;
                            do {
                                var f = e[t + 0] * o + e[t + 1];
                                t += 2, i += _[f]
                            } while (t < a);
                            return r = 65535 & i, (i >>= 16) > r && (i = r, s++), n.bits += i, s
                        }(e, t, a, b[n - 1], s);
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                        return function(e, t, a, s, n) {
                            var r = 0,
                                _ = 0,
                                i = 0,
                                o = l.ht[s].xlen,
                                f = l.ht[s].hlen,
                                c = l.ht[s + 1].hlen,
                                u = l.ht[s + 2].hlen;
                            do {
                                var h = e[t + 0] * o + e[t + 1];
                                t += 2, r += f[h], _ += c[h], i += u[h]
                            } while (t < a);
                            var b = s;
                            return r > _ && (r = _, b++), r > i && (r = i, b = s + 2), n.bits += r, b
                        }(e, t, a, b[n - 1], s);
                    default:
                        if (n > c.IXMAX_VAL) return s.bits = c.LARGE_BITS, -1;
                        var r, _;
                        for (n -= 15, r = 24; r < 32 && !(l.ht[r].linmax >= n); r++);
                        for (_ = r - 8; _ < 24 && !(l.ht[_].linmax >= n); _++);
                        return function(e, t, a, s, n, r) {
                            var _, i = 65536 * l.ht[s].xlen + l.ht[n].xlen,
                                o = 0;
                            do {
                                var f = e[t++],
                                    c = e[t++];
                                0 != f && (f > 14 && (f = 15, o += i), f *= 16), 0 != c && (c > 14 && (c = 15, o += i), f += c), o += l.largetbl[f]
                            } while (t < a);
                            return _ = 65535 & o, (o >>= 16) > _ && (o = _, s = n), r.bits += o, s
                        }(e, t, a, _, r, s)
                }
            }

            function p(e, t, s, n, r, _, i, l) {
                for (var f = t.big_values, c = 2; c < o.SBMAX_l + 1; c++) {
                    var u = e.scalefac_band.l[c];
                    if (u >= f) break;
                    var h = r[c - 2] + t.count1bits;
                    if (s.part2_3_length <= h) break;
                    var b = new a(h),
                        p = m(n, u, f, b);
                    h = b.bits, s.part2_3_length <= h || (s.assign(t), s.part2_3_length = h, s.region0_count = _[c - 2], s.region1_count = c - 2 - _[c - 2], s.table_select[0] = i[c - 2], s.table_select[1] = l[c - 2], s.table_select[2] = p)
                }
            }
            this.noquant_count_bits = function(e, t, s) {
                var n = t.l3_enc,
                    r = Math.min(576, t.max_nonzero_coeff + 2 >> 1 << 1);
                for (null != s && (s.sfb_count1 = 0); r > 1 && 0 == (n[r - 1] | n[r - 2]); r -= 2);
                t.count1 = r;
                for (var _ = 0, f = 0; r > 3; r -= 4) {
                    var c;
                    if ((2147483647 & (n[r - 1] | n[r - 2] | n[r - 3] | n[r - 4])) > 1) break;
                    c = 2 * (2 * (2 * n[r - 4] + n[r - 3]) + n[r - 2]) + n[r - 1], _ += l.t32l[c], f += l.t33l[c]
                }
                var u = _;
                if (t.count1table_select = 0, _ > f && (u = f, t.count1table_select = 1), t.count1bits = u, t.big_values = r, 0 == r) return u;
                if (t.block_type == o.SHORT_TYPE)(_ = 3 * e.scalefac_band.s[3]) > t.big_values && (_ = t.big_values), f = t.big_values;
                else if (t.block_type == o.NORM_TYPE) {
                    if (i(r <= 576), _ = t.region0_count = e.bv_scf[r - 2], f = t.region1_count = e.bv_scf[r - 1], i(_ + f + 2 < o.SBPSY_l), f = e.scalefac_band.l[_ + f + 2], _ = e.scalefac_band.l[_ + 1], f < r) {
                        var h = new a(u);
                        t.table_select[2] = m(n, f, r, h), u = h.bits
                    }
                } else t.region0_count = 7, t.region1_count = o.SBMAX_l - 1 - 7 - 1, (_ = e.scalefac_band.l[8]) > (f = r) && (_ = f);
                if (_ = Math.min(_, r), f = Math.min(f, r), i(_ >= 0), i(f >= 0), 0 < _ && (h = new a(u), t.table_select[0] = m(n, 0, _, h), u = h.bits), _ < f && (h = new a(u), t.table_select[1] = m(n, _, f, h), u = h.bits), 2 == e.use_best_huffman && (t.part2_3_length = u, best_huffman_divide(e, t), u = t.part2_3_length), null != s && t.block_type == o.NORM_TYPE) {
                    for (var b = 0; e.scalefac_band.l[b] < t.big_values;) b++;
                    s.sfb_count1 = b
                }
                return u
            }, this.count_bits = function(e, a, s, n) {
                var _ = s.l3_enc,
                    l = c.IXMAX_VAL / t.IPOW20(s.global_gain);
                if (s.xrpow_max > l) return c.LARGE_BITS;
                if (function(e, a, s, n, _) {
                        var l, f, c, b = 0,
                            m = 0,
                            p = 0,
                            d = 0,
                            v = a,
                            g = 0,
                            S = v,
                            w = 0,
                            M = e,
                            A = 0;
                        for (c = null != _ && n.global_gain == _.global_gain, f = n.block_type == o.SHORT_TYPE ? 38 : 21, l = 0; l <= f; l++) {
                            var R = -1;
                            if ((c || n.block_type == o.NORM_TYPE) && (R = n.global_gain - (n.scalefac[l] + (0 != n.preflag ? t.pretab[l] : 0) << n.scalefac_scale + 1) - 8 * n.subblock_gain[n.window[l]]), i(n.width[l] >= 0), c && _.step[l] == R) 0 != m && (h(m, s, M, A, S, w), m = 0), 0 != p && (u(p, s, M, A, S, w), p = 0);
                            else {
                                var B, y = n.width[l];
                                if (b + n.width[l] > n.max_nonzero_coeff && (B = n.max_nonzero_coeff - b + 1, r.fill(a, n.max_nonzero_coeff, 576, 0), (y = B) < 0 && (y = 0), l = f + 1), 0 == m && 0 == p && (S = v, w = g, M = e, A = d), null != _ && _.sfb_count1 > 0 && l >= _.sfb_count1 && _.step[l] > 0 && R >= _.step[l] ? (0 != m && (h(m, s, M, A, S, w), m = 0, S = v, w = g, M = e, A = d), p += y) : (0 != p && (u(p, s, M, A, S, w), p = 0, S = v, w = g, M = e, A = d), m += y), y <= 0) {
                                    0 != p && (u(p, s, M, A, S, w), p = 0), 0 != m && (h(m, s, M, A, S, w), m = 0);
                                    break
                                }
                            }
                            l <= f && (g += n.width[l], d += n.width[l], b += n.width[l])
                        }
                        0 != m && (h(m, s, M, A, S, w), m = 0), 0 != p && (u(p, s, M, A, S, w), p = 0)
                    }(a, _, t.IPOW20(s.global_gain), s, n), 0 != (2 & e.substep_shaping))
                    for (var f = 0, b = s.global_gain + s.scalefac_scale, m = .634521682242439 / t.IPOW20(b), p = 0; p < s.sfbmax; p++) {
                        var d, v = s.width[p];
                        if (i(v >= 0), 0 == e.pseudohalf[p]) f += v;
                        else
                            for (d = f, f += v; d < f; ++d) _[d] = a[d] >= m ? _[d] : 0
                    }
                return this.noquant_count_bits(e, s, n)
            }, this.best_huffman_divide = function(e, t) {
                var s = new f,
                    n = t.l3_enc,
                    r = _(23),
                    u = _(23),
                    h = _(23),
                    b = _(23);
                if (t.block_type != o.SHORT_TYPE || 1 != e.mode_gr) {
                    s.assign(t), t.block_type == o.NORM_TYPE && (function(e, t, s, n, r, _, i) {
                        for (var o = t.big_values, l = 0; l <= 22; l++) n[l] = c.LARGE_BITS;
                        for (l = 0; l < 16; l++) {
                            var f = e.scalefac_band.l[l + 1];
                            if (f >= o) break;
                            var u = 0,
                                h = new a(u),
                                b = m(s, 0, f, h);
                            u = h.bits;
                            for (var p = 0; p < 8; p++) {
                                var d = e.scalefac_band.l[l + p + 2];
                                if (d >= o) break;
                                var v = u,
                                    g = m(s, f, d, h = new a(v));
                                v = h.bits, n[l + p] > v && (n[l + p] = v, r[l + p] = l, _[l + p] = b, i[l + p] = g)
                            }
                        }
                    }(e, t, n, r, u, h, b), p(e, s, t, n, r, u, h, b));
                    var d = s.big_values;
                    if (!(0 == d || (n[d - 2] | n[d - 1]) > 1 || (d = t.count1 + 2) > 576)) {
                        s.assign(t), s.count1 = d;
                        var v = 0,
                            g = 0;
                        for (i(d <= 576); d > s.big_values; d -= 4) {
                            var S = 2 * (2 * (2 * n[d - 4] + n[d - 3]) + n[d - 2]) + n[d - 1];
                            v += l.t32l[S], g += l.t33l[S]
                        }
                        if (s.big_values = d, s.count1table_select = 0, v > g && (v = g, s.count1table_select = 1), s.count1bits = v, s.block_type == o.NORM_TYPE) p(e, s, t, n, r, u, h, b);
                        else {
                            if (s.part2_3_length = v, (v = e.scalefac_band.l[8]) > d && (v = d), v > 0) {
                                var w = new a(s.part2_3_length);
                                s.table_select[0] = m(n, 0, v, w), s.part2_3_length = w.bits
                            }
                            d > v && (w = new a(s.part2_3_length), s.table_select[1] = m(n, v, d, w), s.part2_3_length = w.bits), t.part2_3_length > s.part2_3_length && t.assign(s)
                        }
                    }
                }
            };
            var d = [1, 1, 1, 1, 8, 2, 2, 2, 4, 4, 4, 8, 8, 8, 16, 16],
                v = [1, 2, 4, 8, 1, 2, 4, 8, 2, 4, 8, 2, 4, 8, 4, 8],
                g = [0, 0, 0, 0, 3, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4],
                S = [0, 1, 2, 3, 0, 1, 2, 3, 1, 2, 3, 1, 2, 3, 2, 3];
            e.slen1_tab = g, e.slen2_tab = S, this.best_scalefac_store = function(e, a, s, n) {
                var r, _, f, c, u = n.tt[a][s],
                    h = 0;
                for (f = 0, r = 0; r < u.sfbmax; r++) {
                    var b = u.width[r];
                    for (i(b >= 0), f += b, c = -b; c < 0 && 0 == u.l3_enc[c + f]; c++);
                    0 == c && (u.scalefac[r] = h = -2)
                }
                if (0 == u.scalefac_scale && 0 == u.preflag) {
                    var m = 0;
                    for (r = 0; r < u.sfbmax; r++) u.scalefac[r] > 0 && (m |= u.scalefac[r]);
                    if (0 == (1 & m) && 0 != m) {
                        for (r = 0; r < u.sfbmax; r++) u.scalefac[r] > 0 && (u.scalefac[r] >>= 1);
                        u.scalefac_scale = h = 1
                    }
                }
                if (0 == u.preflag && u.block_type != o.SHORT_TYPE && 2 == e.mode_gr) {
                    for (r = 11; r < o.SBPSY_l && !(u.scalefac[r] < t.pretab[r] && -2 != u.scalefac[r]); r++);
                    if (r == o.SBPSY_l) {
                        for (r = 11; r < o.SBPSY_l; r++) u.scalefac[r] > 0 && (u.scalefac[r] -= t.pretab[r]);
                        u.preflag = h = 1
                    }
                }
                for (_ = 0; _ < 4; _++) n.scfsi[s][_] = 0;
                for (2 == e.mode_gr && 1 == a && n.tt[0][s].block_type != o.SHORT_TYPE && n.tt[1][s].block_type != o.SHORT_TYPE && (function(e, t) {
                        for (var a, s = t.tt[1][e], n = t.tt[0][e], r = 0; r < l.scfsi_band.length - 1; r++) {
                            for (a = l.scfsi_band[r]; a < l.scfsi_band[r + 1] && !(n.scalefac[a] != s.scalefac[a] && s.scalefac[a] >= 0); a++);
                            if (a == l.scfsi_band[r + 1]) {
                                for (a = l.scfsi_band[r]; a < l.scfsi_band[r + 1]; a++) s.scalefac[a] = -1;
                                t.scfsi[e][r] = 1
                            }
                        }
                        var _ = 0,
                            i = 0;
                        for (a = 0; a < 11; a++) - 1 != s.scalefac[a] && (i++, _ < s.scalefac[a] && (_ = s.scalefac[a]));
                        for (var f = 0, c = 0; a < o.SBPSY_l; a++) - 1 != s.scalefac[a] && (c++, f < s.scalefac[a] && (f = s.scalefac[a]));
                        for (r = 0; r < 16; r++)
                            if (_ < d[r] && f < v[r]) {
                                var u = g[r] * i + S[r] * c;
                                s.part2_length > u && (s.part2_length = u, s.scalefac_compress = r)
                            }
                    }(s, n), h = 0), r = 0; r < u.sfbmax; r++) - 2 == u.scalefac[r] && (u.scalefac[r] = 0);
                0 != h && (2 == e.mode_gr ? this.scale_bitcount(u) : this.scale_bitcount_lsf(e, u))
            };
            var w = [0, 18, 36, 54, 54, 36, 54, 72, 54, 72, 90, 72, 90, 108, 108, 126],
                M = [0, 18, 36, 54, 51, 35, 53, 71, 52, 70, 88, 69, 87, 105, 104, 122],
                A = [0, 10, 20, 30, 33, 21, 31, 41, 32, 42, 52, 43, 53, 63, 64, 74];
            this.scale_bitcount = function(e) {
                var a, s, n, r = 0,
                    _ = 0,
                    l = e.scalefac;
                if (i(function(e, t) {
                        for (var a = 0; a < t; ++a)
                            if (e[a] < 0) return !1;
                        return !0
                    }(l, e.sfbmax)), e.block_type == o.SHORT_TYPE) n = w, 0 != e.mixed_block_flag && (n = M);
                else if (n = A, 0 == e.preflag) {
                    for (s = 11; s < o.SBPSY_l && !(l[s] < t.pretab[s]); s++);
                    if (s == o.SBPSY_l)
                        for (e.preflag = 1, s = 11; s < o.SBPSY_l; s++) l[s] -= t.pretab[s]
                }
                for (s = 0; s < e.sfbdivide; s++) r < l[s] && (r = l[s]);
                for (; s < e.sfbmax; s++) _ < l[s] && (_ = l[s]);
                for (e.part2_length = c.LARGE_BITS, a = 0; a < 16; a++) r < d[a] && _ < v[a] && e.part2_length > n[a] && (e.part2_length = n[a], e.scalefac_compress = a);
                return e.part2_length == c.LARGE_BITS
            };
            var R = [
                [15, 15, 7, 7],
                [15, 15, 7, 0],
                [7, 3, 0, 0],
                [15, 31, 31, 0],
                [7, 7, 7, 0],
                [3, 3, 0, 0]
            ];
            this.scale_bitcount_lsf = function(e, a) {
                var s, r, l, f, c, u, h, b, m = _(4),
                    p = a.scalefac;
                for (s = 0 != a.preflag ? 2 : 0, h = 0; h < 4; h++) m[h] = 0;
                if (a.block_type == o.SHORT_TYPE) {
                    r = 1;
                    var d = t.nr_of_sfb_block[s][r];
                    for (b = 0, l = 0; l < 4; l++)
                        for (f = d[l] / 3, h = 0; h < f; h++, b++)
                            for (c = 0; c < 3; c++) p[3 * b + c] > m[l] && (m[l] = p[3 * b + c])
                } else
                    for (r = 0, d = t.nr_of_sfb_block[s][r], b = 0, l = 0; l < 4; l++)
                        for (f = d[l], h = 0; h < f; h++, b++) p[b] > m[l] && (m[l] = p[b]);
                for (u = !1, l = 0; l < 4; l++) m[l] > R[s][l] && (u = !0);
                if (!u) {
                    var v, g, S, w;
                    for (a.sfb_partition_table = t.nr_of_sfb_block[s][r], l = 0; l < 4; l++) a.slen[l] = B[m[l]];
                    switch (v = a.slen[0], g = a.slen[1], S = a.slen[2], w = a.slen[3], s) {
                        case 0:
                            a.scalefac_compress = (5 * v + g << 4) + (S << 2) + w;
                            break;
                        case 1:
                            a.scalefac_compress = 400 + (5 * v + g << 2) + S;
                            break;
                        case 2:
                            a.scalefac_compress = 500 + 3 * v + g;
                            break;
                        default:
                            n.err.printf("intensity stereo not implemented yet\n")
                    }
                }
                if (!u)
                    for (i(null != a.sfb_partition_table), a.part2_length = 0, l = 0; l < 4; l++) a.part2_length += a.slen[l] * a.sfb_partition_table[l];
                return u
            };
            var B = [0, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4];
            this.huffman_init = function(e) {
                for (var t = 2; t <= 576; t += 2) {
                    for (var a, n = 0; e.scalefac_band.l[++n] < t;);
                    for (a = s[n][0]; e.scalefac_band.l[a + 1] > t;) a--;
                    for (a < 0 && (a = s[n][0]), e.bv_scf[t - 2] = a, a = s[n][1]; e.scalefac_band.l[a + e.bv_scf[t - 2] + 2] > t;) a--;
                    a < 0 && (a = s[n][1]), e.bv_scf[t - 1] = a
                }
            }
        }
    },
    "2z9j": function(e, t, a) {
        var s = a("Agby"),
            n = (s.System, s.VbrMode, s.Float, s.ShortBlock, s.Util, s.Arrays, s.new_array_n, s.new_byte),
            r = (s.new_double, s.new_float, s.new_float_n, s.new_int, s.new_int_n, s.assert);
        Lame = a("3q3k"), Presets = a("OWcs"), GainAnalysis = a("LyF0"), QuantizePVT = a("uyIQ"), Quantize = a("27FD"), Takehiro = a("2b6p"), Reservoir = a("WLGJ"), MPEGMode = a("Z7J9"), BitStream = a("abK7");
        a("S14o");
        var _ = a("jLoq"),
            i = a("4QfB");

        function o() {
            this.dataOffset = 0, this.dataLen = 0, this.channels = 0, this.sampleRate = 0
        }

        function l(e) {
            return e.charCodeAt(0) << 24 | e.charCodeAt(1) << 16 | e.charCodeAt(2) << 8 | e.charCodeAt(3)
        }
        o.RIFF = l("RIFF"), o.WAVE = l("WAVE"), o.fmt_ = l("fmt "), o.data = l("data"), o.readHeader = function(e) {
            var t = new o,
                a = e.getUint32(0, !1);
            if (o.RIFF == a) {
                e.getUint32(4, !0);
                if (o.WAVE == e.getUint32(8, !1) && o.fmt_ == e.getUint32(12, !1)) {
                    var s = e.getUint32(16, !0),
                        n = 20;
                    switch (s) {
                        case 16:
                        case 18:
                            t.channels = e.getUint16(n + 2, !0), t.sampleRate = e.getUint32(n + 4, !0);
                            break;
                        default:
                            throw "extended fmt chunk not implemented"
                    }
                    n += s;
                    for (var r = o.data, _ = 0; r != a && (a = e.getUint32(n, !1), _ = e.getUint32(n + 4, !0), r != a);) n += _ + 8;
                    return t.dataLen = _, t.dataOffset = n + 8, t
                }
            }
        }, e.exports.Mp3Encoder = function(e, t, a) {
            3 != arguments.length && (console.error("WARN: Mp3Encoder(channels, samplerate, kbps) not specified"), e = 1, t = 44100, a = 128);
            var s = new Lame,
                o = new function() {
                    this.setModules = function(e, t) {}
                },
                l = new GainAnalysis,
                f = new BitStream,
                c = new Presets,
                u = new QuantizePVT,
                h = new Quantize,
                b = new i,
                m = new _,
                p = new function() {
                    this.setModules = function(e, t) {}
                },
                d = new Reservoir,
                v = new Takehiro,
                g = new function() {
                    this.setModules = function(e, t, a) {}
                },
                S = new function() {};
            s.setModules(l, f, c, u, h, b, m, p, S), f.setModules(l, S, m, b), p.setModules(f, m), c.setModules(s), h.setModules(f, d, u, v), u.setModules(v, d, s.enc.psy), d.setModules(f), v.setModules(u), b.setModules(s, f, m), o.setModules(g, S), g.setModules(m, p, c);
            var w = s.lame_init();
            w.num_channels = e, w.in_samplerate = t, w.brate = a, w.mode = MPEGMode.STEREO, w.quality = 3, w.bWriteVbrTag = !1, w.disable_reservoir = !0, w.write_id3tag_automatic = !1;
            var M = s.lame_init_params(w);
            r(0 == M);
            var A = 1152,
                R = 0 | 1.25 * A + 7200,
                B = n(R);
            this.encodeBuffer = function(t, a) {
                1 == e && (a = t), r(t.length == a.length), t.length > A && (A = t.length, B = n(R = 0 | 1.25 * A + 7200));
                var _ = s.lame_encode_buffer(w, t, a, t.length, B, 0, R);
                return new Int8Array(B.subarray(0, _))
            }, this.flush = function() {
                var e = s.lame_encode_flush(w, B, 0, R);
                return new Int8Array(B.subarray(0, e))
            }
        }, e.exports.WavHeader = o
    },
    "3q3k": function(e, t, a) {
        var s = a("Agby"),
            n = s.System,
            r = s.VbrMode,
            _ = (s.Float, s.ShortBlock),
            i = (s.Util, s.Arrays, s.new_array_n, s.new_byte, s.new_double, s.new_float),
            o = (s.new_float_n, s.new_int, s.new_int_n),
            l = s.new_short_n,
            f = s.assert,
            c = a("JHR4"),
            u = a("lH8m"),
            h = a("vYvw"),
            b = a("q/UI"),
            m = a("cl2l"),
            p = a("SmUK"),
            d = a("abK7"),
            v = a("X4Rc"),
            g = a("S14o");
        e.exports = function e() {
            var t = this;
            e.V9 = 410, e.V8 = 420, e.V7 = 430, e.V6 = 440, e.V5 = 450, e.V4 = 460, e.V3 = 470, e.V2 = 480, e.V1 = 490, e.V0 = 500, e.R3MIX = 1e3, e.STANDARD = 1001, e.EXTREME = 1002, e.INSANE = 1003, e.STANDARD_FAST = 1004, e.EXTREME_FAST = 1005, e.MEDIUM = 1006, e.MEDIUM_FAST = 1007;
            var a, s, S, w, M;
            e.LAME_MAXMP3BUFFER = 147456;
            var A, R, B, y = new c;

            function E() {
                this.lowerlimit = 0
            }

            function T(e, t) {
                this.lowpass = t
            }
            this.enc = new g, this.setModules = function(e, t, n, r, _, i, o, l, f) {
                a = e, s = t, S = n, w = r, M = _, A = i, R = l, B = f, this.enc.setModules(s, y, w, A)
            };
            var k = 4294479419;

            function x(e) {
                return e > 1 ? 0 : e <= 0 ? 1 : Math.cos(Math.PI / 2 * e)
            }

            function P(e, t) {
                switch (e) {
                    case 44100:
                        return t.version = 1, 0;
                    case 48e3:
                        return t.version = 1, 1;
                    case 32e3:
                        return t.version = 1, 2;
                    case 22050:
                        return t.version = 0, 0;
                    case 24e3:
                        return t.version = 0, 1;
                    case 16e3:
                        return t.version = 0, 2;
                    case 11025:
                        return t.version = 0, 0;
                    case 12e3:
                        return t.version = 0, 1;
                    case 8e3:
                        return t.version = 0, 2;
                    default:
                        return t.version = 0, -1
                }
            }

            function I(e, t, a) {
                a < 16e3 && (t = 2);
                for (var s = v.bitrate_table[t][1], n = 2; n <= 14; n++) v.bitrate_table[t][n] > 0 && Math.abs(v.bitrate_table[t][n] - e) < Math.abs(s - e) && (s = v.bitrate_table[t][n]);
                return s
            }

            function L(e, t, a) {
                a < 16e3 && (t = 2);
                for (var s = 0; s <= 14; s++)
                    if (v.bitrate_table[t][s] > 0 && v.bitrate_table[t][s] == e) return s;
                return -1
            }

            function V(e, a) {
                var s = [new T(8, 2e3), new T(16, 3700), new T(24, 3900), new T(32, 5500), new T(40, 7e3), new T(48, 7500), new T(56, 1e4), new T(64, 11e3), new T(80, 13500), new T(96, 15100), new T(112, 15600), new T(128, 17e3), new T(160, 17500), new T(192, 18600), new T(224, 19400), new T(256, 19700), new T(320, 20500)],
                    n = t.nearestBitrateFullIndex(a);
                e.lowerlimit = s[n].lowpass
            }

            function H(e) {
                var t = g.BLKSIZE + e.framesize - g.FFTOFFSET;
                return t = Math.max(t, 512 + e.framesize - 32), f(h.MFSIZE >= t), t
            }

            function O(e, a, s, n, r, _) {
                var i = t.enc.lame_encode_mp3_frame(e, a, s, n, r, _);
                return e.frameNum++, i
            }

            function N() {
                this.n_in = 0, this.n_out = 0
            }

            function D() {
                this.num_used = 0
            }

            function X(e, t, a) {
                var s = Math.PI * t;
                (e /= a) < 0 && (e = 0), e > 1 && (e = 1);
                var n = e - .5,
                    r = .42 - .5 * Math.cos(2 * e * Math.PI) + .08 * Math.cos(4 * e * Math.PI);
                return Math.abs(n) < 1e-9 ? s / Math.PI : r * Math.sin(a * s * n) / (Math.PI * a * n)
            }

            function F(e, t, a, s, n, r, _, o, l) {
                var c, u, b = e.internal_flags,
                    m = 0,
                    p = e.out_samplerate / function e(t, a) {
                        return 0 != a ? e(a, t % a) : t
                    }(e.out_samplerate, e.in_samplerate);
                p > h.BPC && (p = h.BPC);
                var d = Math.abs(b.resample_ratio - Math.floor(.5 + b.resample_ratio)) < 1e-4 ? 1 : 0,
                    v = 1 / b.resample_ratio;
                v > 1 && (v = 1);
                var g = 31;
                0 == g % 2 && --g;
                var S = (g += d) + 1;
                if (0 == b.fill_buffer_resample_init) {
                    for (b.inbuf_old[0] = i(S), b.inbuf_old[1] = i(S), c = 0; c <= 2 * p; ++c) b.blackfilt[c] = i(S);
                    for (b.itime[0] = 0, b.itime[1] = 0, m = 0; m <= 2 * p; m++) {
                        var w = 0,
                            M = (m - p) / (2 * p);
                        for (c = 0; c <= g; c++) w += b.blackfilt[m][c] = X(c - M, v, g);
                        for (c = 0; c <= g; c++) b.blackfilt[m][c] /= w
                    }
                    b.fill_buffer_resample_init = 1
                }
                var A = b.inbuf_old[l];
                for (u = 0; u < s; u++) {
                    var R, B;
                    if (R = u * b.resample_ratio, g + (m = 0 | Math.floor(R - b.itime[l])) - g / 2 >= _) break;
                    M = R - b.itime[l] - (m + g % 2 * .5), f(Math.abs(M) <= .501), B = 0 | Math.floor(2 * M * p + p + .5);
                    var y = 0;
                    for (c = 0; c <= g; ++c) {
                        var E = c + m - g / 2;
                        f(E < _), f(E + S >= 0), y += (E < 0 ? A[S + E] : n[r + E]) * b.blackfilt[B][c]
                    }
                    t[a + u] = y
                }
                if (o.num_used = Math.min(_, g + m - g / 2), b.itime[l] += o.num_used - u * b.resample_ratio, o.num_used >= S)
                    for (c = 0; c < S; c++) A[c] = n[r + o.num_used + c - S];
                else {
                    var T = S - o.num_used;
                    for (c = 0; c < T; ++c) A[c] = A[c + o.num_used];
                    for (m = 0; c < S; ++c, ++m) A[c] = n[r + m];
                    f(m == o.num_used)
                }
                return u
            }

            function q(e, t, a, s, n, r) {
                var _ = e.internal_flags;
                if (_.resample_ratio < .9999 || _.resample_ratio > 1.0001)
                    for (var i = 0; i < _.channels_out; i++) {
                        var o = new D;
                        r.n_out = F(e, t[i], _.mf_size, e.framesize, a[i], s, n, o, i), r.n_in = o.num_used
                    } else {
                        r.n_out = Math.min(e.framesize, n), r.n_in = r.n_out;
                        for (var l = 0; l < r.n_out; ++l) t[0][_.mf_size + l] = a[0][s + l], 2 == _.channels_out && (t[1][_.mf_size + l] = a[1][s + l])
                    }
            }
            this.lame_init = function() {
                var e = new u;
                return 0 != function(e) {
                    var t;
                    return e.class_id = k, t = e.internal_flags = new h, e.mode = MPEGMode.NOT_SET, e.original = 1, e.in_samplerate = 44100, e.num_channels = 2, e.num_samples = -1, e.bWriteVbrTag = !0, e.quality = -1, e.short_blocks = null, t.subblock_gain = -1, e.lowpassfreq = 0, e.highpassfreq = 0, e.lowpasswidth = -1, e.highpasswidth = -1, e.VBR = r.vbr_off, e.VBR_q = 4, e.ATHcurve = -1, e.VBR_mean_bitrate_kbps = 128, e.VBR_min_bitrate_kbps = 0, e.VBR_max_bitrate_kbps = 0, e.VBR_hard_min = 0, t.VBR_min_bitrate = 1, t.VBR_max_bitrate = 13, e.quant_comp = -1, e.quant_comp_short = -1, e.msfix = -1, t.resample_ratio = 1, t.OldValue[0] = 180, t.OldValue[1] = 180, t.CurrentStep[0] = 4, t.CurrentStep[1] = 4, t.masking_lower = 1, t.nsPsy.attackthre = -1, t.nsPsy.attackthre_s = -1, e.scale = -1, e.athaa_type = -1, e.ATHtype = -1, e.athaa_loudapprox = -1, e.athaa_sensitivity = 0, e.useTemporal = null, e.interChRatio = -1, t.mf_samples_to_encode = g.ENCDELAY + g.POSTDELAY, e.encoder_padding = 0, t.mf_size = g.ENCDELAY - g.MDCTDELAY, e.findReplayGain = !1, e.decode_on_the_fly = !1, t.decode_on_the_fly = !1, t.findReplayGain = !1, t.findPeakSample = !1, t.RadioGain = 0, t.AudiophileGain = 0, t.noclipGainChange = 0, t.noclipScale = -1, e.preset = 0, e.write_id3tag_automatic = !0, 0
                }(e) ? null : (e.lame_allocated_gfp = 1, e)
            }, this.nearestBitrateFullIndex = function(e) {
                var t = [8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320],
                    a = 0,
                    s = 0,
                    n = 0,
                    r = 0;
                r = t[16], n = 16, s = t[16], a = 16;
                for (var _ = 0; _ < 16; _++)
                    if (Math.max(e, t[_ + 1]) != e) {
                        r = t[_ + 1], n = _ + 1, s = t[_], a = _;
                        break
                    }
                return r - e > e - s ? a : n
            }, this.lame_init_params = function(e) {
                var t = e.internal_flags;
                if (t.Class_ID = 0, null == t.ATH && (t.ATH = new b), null == t.PSY && (t.PSY = new function() {
                        this.mask_adjust = 0, this.mask_adjust_short = 0, this.bo_l_weight = i(g.SBMAX_l), this.bo_s_weight = i(g.SBMAX_s)
                    }), null == t.rgdata && (t.rgdata = new m), t.channels_in = e.num_channels, 1 == t.channels_in && (e.mode = MPEGMode.MONO), t.channels_out = e.mode == MPEGMode.MONO ? 1 : 2, t.mode_ext = g.MPG_MD_MS_LR, e.mode == MPEGMode.MONO && (e.force_ms = !1), e.VBR == r.vbr_off && 128 != e.VBR_mean_bitrate_kbps && 0 == e.brate && (e.brate = e.VBR_mean_bitrate_kbps), e.VBR == r.vbr_off || e.VBR == r.vbr_mtrh || e.VBR == r.vbr_mt || (e.free_format = !1), e.VBR == r.vbr_off && 0 == e.brate && d.EQ(e.compression_ratio, 0) && (e.compression_ratio = 11.025), e.VBR == r.vbr_off && e.compression_ratio > 0 && (0 == e.out_samplerate && (e.out_samplerate = map2MP3Frequency(int(.97 * e.in_samplerate))), e.brate = 0 | 16 * e.out_samplerate * t.channels_out / (1e3 * e.compression_ratio), t.samplerate_index = P(e.out_samplerate, e), e.free_format || (e.brate = I(e.brate, e.version, e.out_samplerate))), 0 != e.out_samplerate && (e.out_samplerate < 16e3 ? (e.VBR_mean_bitrate_kbps = Math.max(e.VBR_mean_bitrate_kbps, 8), e.VBR_mean_bitrate_kbps = Math.min(e.VBR_mean_bitrate_kbps, 64)) : e.out_samplerate < 32e3 ? (e.VBR_mean_bitrate_kbps = Math.max(e.VBR_mean_bitrate_kbps, 8), e.VBR_mean_bitrate_kbps = Math.min(e.VBR_mean_bitrate_kbps, 160)) : (e.VBR_mean_bitrate_kbps = Math.max(e.VBR_mean_bitrate_kbps, 32), e.VBR_mean_bitrate_kbps = Math.min(e.VBR_mean_bitrate_kbps, 320))), 0 == e.lowpassfreq) {
                    var l = 16e3;
                    switch (e.VBR) {
                        case r.vbr_off:
                            V(u = new E, e.brate), l = u.lowerlimit;
                            break;
                        case r.vbr_abr:
                            var u;
                            V(u = new E, e.VBR_mean_bitrate_kbps), l = u.lowerlimit;
                            break;
                        case r.vbr_rh:
                            var h = [19500, 19e3, 18600, 18e3, 17500, 16e3, 15600, 14900, 12500, 1e4, 3950];
                            if (0 <= e.VBR_q && e.VBR_q <= 9) {
                                var T = h[e.VBR_q],
                                    H = h[e.VBR_q + 1],
                                    O = e.VBR_q_frac;
                                l = linear_int(T, H, O)
                            } else l = 19500;
                            break;
                        default:
                            h = [19500, 19e3, 18500, 18e3, 17500, 16500, 15500, 14500, 12500, 9500, 3950], 0 <= e.VBR_q && e.VBR_q <= 9 ? (T = h[e.VBR_q], H = h[e.VBR_q + 1], O = e.VBR_q_frac, l = linear_int(T, H, O)) : l = 19500
                    }
                    e.mode != MPEGMode.MONO || e.VBR != r.vbr_off && e.VBR != r.vbr_abr || (l *= 1.5), e.lowpassfreq = 0 | l
                }
                if (0 == e.out_samplerate && (2 * e.lowpassfreq > e.in_samplerate && (e.lowpassfreq = e.in_samplerate / 2), e.out_samplerate = function(e, t) {
                        var a = 44100;
                        return t >= 48e3 ? a = 48e3 : t >= 44100 ? a = 44100 : t >= 32e3 ? a = 32e3 : t >= 24e3 ? a = 24e3 : t >= 22050 ? a = 22050 : t >= 16e3 ? a = 16e3 : t >= 12e3 ? a = 12e3 : t >= 11025 ? a = 11025 : t >= 8e3 && (a = 8e3), -1 == e ? a : (e <= 15960 && (a = 44100), e <= 15250 && (a = 32e3), e <= 11220 && (a = 24e3), e <= 9970 && (a = 22050), e <= 7230 && (a = 16e3), e <= 5420 && (a = 12e3), e <= 4510 && (a = 11025), e <= 3970 && (a = 8e3), t < a ? t > 44100 ? 48e3 : t > 32e3 ? 44100 : t > 24e3 ? 32e3 : t > 22050 ? 24e3 : t > 16e3 ? 22050 : t > 12e3 ? 16e3 : t > 11025 ? 12e3 : t > 8e3 ? 11025 : 8e3 : a)
                    }(0 | e.lowpassfreq, e.in_samplerate)), e.lowpassfreq = Math.min(20500, e.lowpassfreq), e.lowpassfreq = Math.min(e.out_samplerate / 2, e.lowpassfreq), e.VBR == r.vbr_off && (e.compression_ratio = 16 * e.out_samplerate * t.channels_out / (1e3 * e.brate)), e.VBR == r.vbr_abr && (e.compression_ratio = 16 * e.out_samplerate * t.channels_out / (1e3 * e.VBR_mean_bitrate_kbps)), e.bWriteVbrTag || (e.findReplayGain = !1, e.decode_on_the_fly = !1, t.findPeakSample = !1), t.findReplayGain = e.findReplayGain, t.decode_on_the_fly = e.decode_on_the_fly, t.decode_on_the_fly && (t.findPeakSample = !0), t.findReplayGain && a.InitGainAnalysis(t.rgdata, e.out_samplerate) == GainAnalysis.INIT_GAIN_ANALYSIS_ERROR) return e.internal_flags = null, -6;
                switch (t.decode_on_the_fly && !e.decode_only && (null != t.hip && B.hip_decode_exit(t.hip), t.hip = B.hip_decode_init()), t.mode_gr = e.out_samplerate <= 24e3 ? 1 : 2, e.framesize = 576 * t.mode_gr, e.encoder_delay = g.ENCDELAY, t.resample_ratio = e.in_samplerate / e.out_samplerate, e.VBR) {
                    case r.vbr_mt:
                    case r.vbr_rh:
                    case r.vbr_mtrh:
                        e.compression_ratio = [5.7, 6.5, 7.3, 8.2, 10, 11.9, 13, 14, 15, 16.5][e.VBR_q];
                        break;
                    case r.vbr_abr:
                        e.compression_ratio = 16 * e.out_samplerate * t.channels_out / (1e3 * e.VBR_mean_bitrate_kbps);
                        break;
                    default:
                        e.compression_ratio = 16 * e.out_samplerate * t.channels_out / (1e3 * e.brate)
                }
                if (e.mode == MPEGMode.NOT_SET && (e.mode = MPEGMode.JOINT_STEREO), e.highpassfreq > 0 ? (t.highpass1 = 2 * e.highpassfreq, e.highpasswidth >= 0 ? t.highpass2 = 2 * (e.highpassfreq + e.highpasswidth) : t.highpass2 = 2 * e.highpassfreq, t.highpass1 /= e.out_samplerate, t.highpass2 /= e.out_samplerate) : (t.highpass1 = 0, t.highpass2 = 0), e.lowpassfreq > 0 ? (t.lowpass2 = 2 * e.lowpassfreq, e.lowpasswidth >= 0 ? (t.lowpass1 = 2 * (e.lowpassfreq - e.lowpasswidth), t.lowpass1 < 0 && (t.lowpass1 = 0)) : t.lowpass1 = 2 * e.lowpassfreq, t.lowpass1 /= e.out_samplerate, t.lowpass2 /= e.out_samplerate) : (t.lowpass1 = 0, t.lowpass2 = 0), function(e) {
                        var t = e.internal_flags,
                            a = 32,
                            s = -1;
                        if (t.lowpass1 > 0) {
                            for (var r = 999, _ = 0; _ <= 31; _++)(f = _ / 31) >= t.lowpass2 && (a = Math.min(a, _)), t.lowpass1 < f && f < t.lowpass2 && (r = Math.min(r, _));
                            t.lowpass1 = 999 == r ? (a - .75) / 31 : (r - .75) / 31, t.lowpass2 = a / 31
                        }
                        if (t.highpass2 > 0 && t.highpass2 < .75 / 31 * .9 && (t.highpass1 = 0, t.highpass2 = 0, n.err.println("Warning: highpass filter disabled.  highpass frequency too small\n")), t.highpass2 > 0) {
                            var i = -1;
                            for (_ = 0; _ <= 31; _++)(f = _ / 31) <= t.highpass1 && (s = Math.max(s, _)), t.highpass1 < f && f < t.highpass2 && (i = Math.max(i, _));
                            t.highpass1 = s / 31, t.highpass2 = -1 == i ? (s + .75) / 31 : (i + .75) / 31
                        }
                        for (_ = 0; _ < 32; _++) {
                            var o, l, f = _ / 31;
                            o = t.highpass2 > t.highpass1 ? x((t.highpass2 - f) / (t.highpass2 - t.highpass1 + 1e-20)) : 1, l = t.lowpass2 > t.lowpass1 ? x((f - t.lowpass1) / (t.lowpass2 - t.lowpass1 + 1e-20)) : 1, t.amp_filter[_] = o * l
                        }
                    }(e), t.samplerate_index = P(e.out_samplerate, e), t.samplerate_index < 0) return e.internal_flags = null, -1;
                if (e.VBR == r.vbr_off) {
                    if (e.free_format) t.bitrate_index = 0;
                    else if (e.brate = I(e.brate, e.version, e.out_samplerate), t.bitrate_index = L(e.brate, e.version, e.out_samplerate), t.bitrate_index <= 0) return e.internal_flags = null, -1
                } else t.bitrate_index = 1;
                e.analysis && (e.bWriteVbrTag = !1), null != t.pinfo && (e.bWriteVbrTag = !1), s.init_bit_stream_w(t);
                for (var N, D = t.samplerate_index + 3 * e.version + 6 * (e.out_samplerate < 16e3 ? 1 : 0), X = 0; X < g.SBMAX_l + 1; X++) t.scalefac_band.l[X] = w.sfBandIndex[D].l[X];
                for (X = 0; X < g.PSFB21 + 1; X++) {
                    var F = (t.scalefac_band.l[22] - t.scalefac_band.l[21]) / g.PSFB21,
                        q = t.scalefac_band.l[21] + X * F;
                    t.scalefac_band.psfb21[X] = q
                }
                for (t.scalefac_band.psfb21[g.PSFB21] = 576, X = 0; X < g.SBMAX_s + 1; X++) t.scalefac_band.s[X] = w.sfBandIndex[D].s[X];
                for (X = 0; X < g.PSFB12 + 1; X++) F = (t.scalefac_band.s[13] - t.scalefac_band.s[12]) / g.PSFB12, q = t.scalefac_band.s[12] + X * F, t.scalefac_band.psfb12[X] = q;
                for (t.scalefac_band.psfb12[g.PSFB12] = 192, 1 == e.version ? t.sideinfo_len = 1 == t.channels_out ? 21 : 36 : t.sideinfo_len = 1 == t.channels_out ? 13 : 21, e.error_protection && (t.sideinfo_len += 2), function(e) {
                        var t = e.internal_flags;
                        e.frameNum = 0, e.write_id3tag_automatic && R.id3tag_write_v2(e), t.bitrate_stereoMode_Hist = o([16, 5]), t.bitrate_blockType_Hist = o([16, 6]), t.PeakSample = 0, e.bWriteVbrTag && A.InitVbrTag(e)
                    }(e), t.Class_ID = k, N = 0; N < 19; N++) t.nsPsy.pefirbuf[N] = 700 * t.mode_gr * t.channels_out;
                switch (-1 == e.ATHtype && (e.ATHtype = 4), f(e.VBR_q <= 9), f(e.VBR_q >= 0), e.VBR) {
                    case r.vbr_mt:
                        e.VBR = r.vbr_mtrh;
                    case r.vbr_mtrh:
                        null == e.useTemporal && (e.useTemporal = !1), S.apply_preset(e, 500 - 10 * e.VBR_q, 0), e.quality < 0 && (e.quality = LAME_DEFAULT_QUALITY), e.quality < 5 && (e.quality = 0), e.quality > 5 && (e.quality = 5), t.PSY.mask_adjust = e.maskingadjust, t.PSY.mask_adjust_short = e.maskingadjust_short, e.experimentalY ? t.sfb21_extra = !1 : t.sfb21_extra = e.out_samplerate > 44e3, t.iteration_loop = new VBRNewIterationLoop(M);
                        break;
                    case r.vbr_rh:
                        S.apply_preset(e, 500 - 10 * e.VBR_q, 0), t.PSY.mask_adjust = e.maskingadjust, t.PSY.mask_adjust_short = e.maskingadjust_short, e.experimentalY ? t.sfb21_extra = !1 : t.sfb21_extra = e.out_samplerate > 44e3, e.quality > 6 && (e.quality = 6), e.quality < 0 && (e.quality = LAME_DEFAULT_QUALITY), t.iteration_loop = new VBROldIterationLoop(M);
                        break;
                    default:
                        var Y;
                        t.sfb21_extra = !1, e.quality < 0 && (e.quality = LAME_DEFAULT_QUALITY), (Y = e.VBR) == r.vbr_off && (e.VBR_mean_bitrate_kbps = e.brate), S.apply_preset(e, e.VBR_mean_bitrate_kbps, 0), e.VBR = Y, t.PSY.mask_adjust = e.maskingadjust, t.PSY.mask_adjust_short = e.maskingadjust_short, Y == r.vbr_off ? t.iteration_loop = new p(M) : t.iteration_loop = new ABRIterationLoop(M)
                }
                if (f(e.scale >= 0), e.VBR != r.vbr_off) {
                    if (t.VBR_min_bitrate = 1, t.VBR_max_bitrate = 14, e.out_samplerate < 16e3 && (t.VBR_max_bitrate = 8), 0 != e.VBR_min_bitrate_kbps && (e.VBR_min_bitrate_kbps = I(e.VBR_min_bitrate_kbps, e.version, e.out_samplerate), t.VBR_min_bitrate = L(e.VBR_min_bitrate_kbps, e.version, e.out_samplerate), t.VBR_min_bitrate < 0)) return -1;
                    if (0 != e.VBR_max_bitrate_kbps && (e.VBR_max_bitrate_kbps = I(e.VBR_max_bitrate_kbps, e.version, e.out_samplerate), t.VBR_max_bitrate = L(e.VBR_max_bitrate_kbps, e.version, e.out_samplerate), t.VBR_max_bitrate < 0)) return -1;
                    e.VBR_min_bitrate_kbps = v.bitrate_table[e.version][t.VBR_min_bitrate], e.VBR_max_bitrate_kbps = v.bitrate_table[e.version][t.VBR_max_bitrate], e.VBR_mean_bitrate_kbps = Math.min(v.bitrate_table[e.version][t.VBR_max_bitrate], e.VBR_mean_bitrate_kbps), e.VBR_mean_bitrate_kbps = Math.max(v.bitrate_table[e.version][t.VBR_min_bitrate], e.VBR_mean_bitrate_kbps)
                }
                return e.tune && (t.PSY.mask_adjust += e.tune_value_a, t.PSY.mask_adjust_short += e.tune_value_a),
                    function(e) {
                        var t = e.internal_flags;
                        switch (e.quality) {
                            default:
                                case 9:
                                t.psymodel = 0,
                            t.noise_shaping = 0,
                            t.noise_shaping_amp = 0,
                            t.noise_shaping_stop = 0,
                            t.use_best_huffman = 0,
                            t.full_outer_loop = 0;
                            break;
                            case 8:
                                    e.quality = 7;
                            case 7:
                                    t.psymodel = 1,
                                t.noise_shaping = 0,
                                t.noise_shaping_amp = 0,
                                t.noise_shaping_stop = 0,
                                t.use_best_huffman = 0,
                                t.full_outer_loop = 0;
                                break;
                            case 6:
                                    case 5:
                                    t.psymodel = 1,
                                0 == t.noise_shaping && (t.noise_shaping = 1),
                                t.noise_shaping_amp = 0,
                                t.noise_shaping_stop = 0,
                                -1 == t.subblock_gain && (t.subblock_gain = 1),
                                t.use_best_huffman = 0,
                                t.full_outer_loop = 0;
                                break;
                            case 4:
                                    t.psymodel = 1,
                                0 == t.noise_shaping && (t.noise_shaping = 1),
                                t.noise_shaping_amp = 0,
                                t.noise_shaping_stop = 0,
                                -1 == t.subblock_gain && (t.subblock_gain = 1),
                                t.use_best_huffman = 1,
                                t.full_outer_loop = 0;
                                break;
                            case 3:
                                    t.psymodel = 1,
                                0 == t.noise_shaping && (t.noise_shaping = 1),
                                t.noise_shaping_amp = 1,
                                t.noise_shaping_stop = 1,
                                -1 == t.subblock_gain && (t.subblock_gain = 1),
                                t.use_best_huffman = 1,
                                t.full_outer_loop = 0;
                                break;
                            case 2:
                                    t.psymodel = 1,
                                0 == t.noise_shaping && (t.noise_shaping = 1),
                                0 == t.substep_shaping && (t.substep_shaping = 2),
                                t.noise_shaping_amp = 1,
                                t.noise_shaping_stop = 1,
                                -1 == t.subblock_gain && (t.subblock_gain = 1),
                                t.use_best_huffman = 1,
                                t.full_outer_loop = 0;
                                break;
                            case 1:
                                    case 0:
                                    t.psymodel = 1,
                                0 == t.noise_shaping && (t.noise_shaping = 1),
                                0 == t.substep_shaping && (t.substep_shaping = 2),
                                t.noise_shaping_amp = 2,
                                t.noise_shaping_stop = 1,
                                -1 == t.subblock_gain && (t.subblock_gain = 1),
                                t.use_best_huffman = 1,
                                t.full_outer_loop = 0
                        }
                    }(e), f(e.scale >= 0), e.athaa_type < 0 ? t.ATH.useAdjust = 3 : t.ATH.useAdjust = e.athaa_type, t.ATH.aaSensitivityP = Math.pow(10, e.athaa_sensitivity / -10), null == e.short_blocks && (e.short_blocks = _.short_block_allowed), e.short_blocks != _.short_block_allowed || e.mode != MPEGMode.JOINT_STEREO && e.mode != MPEGMode.STEREO || (e.short_blocks = _.short_block_coupled), e.quant_comp < 0 && (e.quant_comp = 1), e.quant_comp_short < 0 && (e.quant_comp_short = 0), e.msfix < 0 && (e.msfix = 0), e.exp_nspsytune = 1 | e.exp_nspsytune, e.internal_flags.nsPsy.attackthre < 0 && (e.internal_flags.nsPsy.attackthre = c.NSATTACKTHRE), e.internal_flags.nsPsy.attackthre_s < 0 && (e.internal_flags.nsPsy.attackthre_s = c.NSATTACKTHRE_S), f(e.scale >= 0), e.scale < 0 && (e.scale = 1), e.ATHtype < 0 && (e.ATHtype = 4), e.ATHcurve < 0 && (e.ATHcurve = 4), e.athaa_loudapprox < 0 && (e.athaa_loudapprox = 2), e.interChRatio < 0 && (e.interChRatio = 0), null == e.useTemporal && (e.useTemporal = !0), t.slot_lag = t.frac_SpF = 0, e.VBR == r.vbr_off && (t.slot_lag = t.frac_SpF = 72e3 * (e.version + 1) * e.brate % e.out_samplerate | 0), w.iteration_init(e), y.psymodel_init(e), f(e.scale >= 0), 0
            }, this.lame_encode_flush = function(e, t, a, n) {
                var r, _, i, o, f = e.internal_flags,
                    c = l([2, 1152]),
                    u = 0,
                    h = f.mf_samples_to_encode - g.POSTDELAY,
                    b = H(e);
                if (f.mf_samples_to_encode < 1) return 0;
                for (r = 0, e.in_samplerate != e.out_samplerate && (h += 16 * e.out_samplerate / e.in_samplerate), (i = e.framesize - h % e.framesize) < 576 && (i += e.framesize), e.encoder_padding = i, o = (h + i) / e.framesize; o > 0 && u >= 0;) {
                    var m = b - f.mf_size,
                        p = e.frameNum;
                    m *= e.in_samplerate, (m /= e.out_samplerate) > 1152 && (m = 1152), m < 1 && (m = 1), _ = n - r, 0 == n && (_ = 0), a += u = this.lame_encode_buffer(e, c[0], c[1], m, t, a, _), r += u, o -= p != e.frameNum ? 1 : 0
                }
                if (f.mf_samples_to_encode = 0, u < 0) return u;
                if (_ = n - r, 0 == n && (_ = 0), s.flush_bitstream(e), (u = s.copy_buffer(f, t, a, _, 1)) < 0) return u;
                if (a += u, _ = n - (r += u), 0 == n && (_ = 0), e.write_id3tag_automatic) {
                    if (R.id3tag_write_v1(e), (u = s.copy_buffer(f, t, a, _, 0)) < 0) return u;
                    r += u
                }
                return r
            }, this.lame_encode_buffer = function(e, t, n, r, _, o, l) {
                var c = e.internal_flags,
                    u = [null, null];
                if (c.Class_ID != k) return -3;
                if (0 == r) return 0;
                ! function(e, t) {
                    (null == e.in_buffer_0 || e.in_buffer_nsamples < t) && (e.in_buffer_0 = i(t), e.in_buffer_1 = i(t), e.in_buffer_nsamples = t)
                }(c, r), u[0] = c.in_buffer_0, u[1] = c.in_buffer_1;
                for (var b = 0; b < r; b++) u[0][b] = t[b], c.channels_in > 1 && (u[1][b] = n[b]);
                return function(e, t, n, r, _, i, o) {
                    var l, c, u, b, m, p = e.internal_flags,
                        v = 0,
                        S = [null, null],
                        w = [null, null];
                    if (p.Class_ID != k) return -3;
                    if (0 == r) return 0;
                    if ((m = s.copy_buffer(p, _, i, o, 0)) < 0) return m;
                    if (i += m, v += m, w[0] = t, w[1] = n, d.NEQ(e.scale, 0) && d.NEQ(e.scale, 1))
                        for (c = 0; c < r; ++c) w[0][c] *= e.scale, 2 == p.channels_out && (w[1][c] *= e.scale);
                    if (d.NEQ(e.scale_left, 0) && d.NEQ(e.scale_left, 1))
                        for (c = 0; c < r; ++c) w[0][c] *= e.scale_left;
                    if (d.NEQ(e.scale_right, 0) && d.NEQ(e.scale_right, 1))
                        for (c = 0; c < r; ++c) w[1][c] *= e.scale_right;
                    if (2 == e.num_channels && 1 == p.channels_out)
                        for (c = 0; c < r; ++c) w[0][c] = .5 * (w[0][c] + w[1][c]), w[1][c] = 0;
                    b = H(e), S[0] = p.mfbuf[0], S[1] = p.mfbuf[1];
                    for (var M = 0; r > 0;) {
                        var A = [null, null],
                            R = 0,
                            B = 0;
                        A[0] = w[0], A[1] = w[1];
                        var y = new N;
                        if (q(e, S, A, M, r, y), R = y.n_in, B = y.n_out, p.findReplayGain && !p.decode_on_the_fly && a.AnalyzeSamples(p.rgdata, S[0], p.mf_size, S[1], p.mf_size, B, p.channels_out) == GainAnalysis.GAIN_ANALYSIS_ERROR) return -6;
                        if (r -= R, M += R, p.channels_out, p.mf_size += B, f(p.mf_size <= h.MFSIZE), p.mf_samples_to_encode < 1 && (p.mf_samples_to_encode = g.ENCDELAY + g.POSTDELAY), p.mf_samples_to_encode += B, p.mf_size >= b) {
                            var E = o - v;
                            if (0 == o && (E = 0), (l = O(e, S[0], S[1], _, i, E)) < 0) return l;
                            for (i += l, v += l, p.mf_size -= e.framesize, p.mf_samples_to_encode -= e.framesize, u = 0; u < p.channels_out; u++)
                                for (c = 0; c < p.mf_size; c++) S[u][c] = S[u][c + e.framesize]
                        }
                    }
                    return f(0 == r), v
                }(e, u[0], u[1], r, _, o, l)
            }
        }
    },
    "4QfB": function(e, t, a) {
        var s = a("Agby"),
            n = s.System,
            r = s.VbrMode,
            _ = (s.Float, s.ShortBlock),
            i = (s.Util, s.Arrays),
            o = (s.new_array_n, s.new_byte),
            l = (s.new_double, s.new_float, s.new_float_n, s.new_int, s.new_int_n, s.assert);

        function f() {
            var e, t, a;
            this.setModules = function(s, n, r) {
                e = s, t = n, a = r
            };
            var s = f.NUMTOCENTRIES,
                c = f.MAXFRAMESIZE,
                u = s + 4 + 4 + 4 + 4 + 4 + 9 + 1 + 1 + 8 + 1 + 1 + 3 + 1 + 1 + 2 + 4 + 2 + 2,
                h = 128,
                b = 64,
                m = 32,
                p = null,
                d = "Xing",
                v = "Info",
                g = [0, 49345, 49537, 320, 49921, 960, 640, 49729, 50689, 1728, 1920, 51009, 1280, 50625, 50305, 1088, 52225, 3264, 3456, 52545, 3840, 53185, 52865, 3648, 2560, 51905, 52097, 2880, 51457, 2496, 2176, 51265, 55297, 6336, 6528, 55617, 6912, 56257, 55937, 6720, 7680, 57025, 57217, 8e3, 56577, 7616, 7296, 56385, 5120, 54465, 54657, 5440, 55041, 6080, 5760, 54849, 53761, 4800, 4992, 54081, 4352, 53697, 53377, 4160, 61441, 12480, 12672, 61761, 13056, 62401, 62081, 12864, 13824, 63169, 63361, 14144, 62721, 13760, 13440, 62529, 15360, 64705, 64897, 15680, 65281, 16320, 16e3, 65089, 64001, 15040, 15232, 64321, 14592, 63937, 63617, 14400, 10240, 59585, 59777, 10560, 60161, 11200, 10880, 59969, 60929, 11968, 12160, 61249, 11520, 60865, 60545, 11328, 58369, 9408, 9600, 58689, 9984, 59329, 59009, 9792, 8704, 58049, 58241, 9024, 57601, 8640, 8320, 57409, 40961, 24768, 24960, 41281, 25344, 41921, 41601, 25152, 26112, 42689, 42881, 26432, 42241, 26048, 25728, 42049, 27648, 44225, 44417, 27968, 44801, 28608, 28288, 44609, 43521, 27328, 27520, 43841, 26880, 43457, 43137, 26688, 30720, 47297, 47489, 31040, 47873, 31680, 31360, 47681, 48641, 32448, 32640, 48961, 32e3, 48577, 48257, 31808, 46081, 29888, 30080, 46401, 30464, 47041, 46721, 30272, 29184, 45761, 45953, 29504, 45313, 29120, 28800, 45121, 20480, 37057, 37249, 20800, 37633, 21440, 21120, 37441, 38401, 22208, 22400, 38721, 21760, 38337, 38017, 21568, 39937, 23744, 23936, 40257, 24320, 40897, 40577, 24128, 23040, 39617, 39809, 23360, 39169, 22976, 22656, 38977, 34817, 18624, 18816, 35137, 19200, 35777, 35457, 19008, 19968, 36545, 36737, 20288, 36097, 19904, 19584, 35905, 17408, 33985, 34177, 17728, 34561, 18368, 18048, 34369, 33281, 17088, 17280, 33601, 16640, 33217, 32897, 16448];

            function S(e, t) {
                var a = 255 & e[t + 0];
                return a <<= 8, a |= 255 & e[t + 1], a <<= 8, a |= 255 & e[t + 2], a <<= 8, a |= 255 & e[t + 3]
            }

            function w(e, t, a) {
                e[t + 0] = 255 & a >> 24, e[t + 1] = 255 & a >> 16, e[t + 2] = 255 & a >> 8, e[t + 3] = 255 & a
            }

            function M(e, t, a) {
                e[t + 0] = 255 & a >> 8, e[t + 1] = 255 & a
            }

            function A(e, t, a) {
                return 255 & (e << t | a & ~(-1 << t))
            }

            function R(t, a) {
                var s = t.internal_flags;
                a[0] = A(a[0], 8, 255), a[1] = A(a[1], 3, 7), a[1] = A(a[1], 1, t.out_samplerate < 16e3 ? 0 : 1), a[1] = A(a[1], 1, t.version), a[1] = A(a[1], 2, 1), a[1] = A(a[1], 1, t.error_protection ? 0 : 1), a[2] = A(a[2], 4, s.bitrate_index), a[2] = A(a[2], 2, s.samplerate_index), a[2] = A(a[2], 1, 0), a[2] = A(a[2], 1, t.extension), a[3] = A(a[3], 2, t.mode.ordinal()), a[3] = A(a[3], 2, s.mode_ext), a[3] = A(a[3], 1, t.copyright), a[3] = A(a[3], 1, t.original), a[3] = A(a[3], 2, t.emphasis), a[0] = 255;
                var n, _, i = 241 & a[1];
                n = 1 == t.version ? h : t.out_samplerate < 16e3 ? m : b, t.VBR == r.vbr_off && (n = t.brate), _ = t.free_format ? 0 : 255 & 16 * e.BitrateIndex(n, t.version, t.out_samplerate), 1 == t.version ? (a[1] = 255 & (10 | i), i = 13 & a[2], a[2] = 255 & (_ | i)) : (a[1] = 255 & (2 | i), i = 13 & a[2], a[2] = 255 & (_ | i))
            }

            function B(e, t) {
                return t = t >> 8 ^ g[255 & (t ^ e)]
            }
            this.addVbrFrame = function(e) {
                var t = e.internal_flags,
                    a = Tables.bitrate_table[e.version][t.bitrate_index];
                l(null != t.VBR_seek_table.bag),
                    function(e, t) {
                        if (e.nVbrNumFrames++, e.sum += t, e.seen++, !(e.seen < e.want) && (e.pos < e.size && (e.bag[e.pos] = e.sum, e.pos++, e.seen = 0), e.pos == e.size)) {
                            for (var a = 1; a < e.size; a += 2) e.bag[a / 2] = e.bag[a];
                            e.want *= 2, e.pos /= 2
                        }
                    }(t.VBR_seek_table, a)
            }, this.getVbrTag = function(e) {
                var t = new VBRTagData,
                    a = 0;
                t.flags = 0;
                var n = e[a + 1] >> 3 & 1,
                    r = e[a + 2] >> 2 & 3,
                    _ = e[a + 3] >> 6 & 3,
                    i = e[a + 2] >> 4 & 15;
                if (i = Tables.bitrate_table[n][i], e[a + 1] >> 4 == 14 ? t.samprate = Tables.samplerate_table[2][r] : t.samprate = Tables.samplerate_table[n][r], ! function(e, t) {
                        return new String(e, t, d.length(), p).equals(d) || new String(e, t, v.length(), p).equals(v)
                    }(e, a += 0 != n ? 3 != _ ? 36 : 21 : 3 != _ ? 21 : 13)) return null;
                a += 4, t.hId = n;
                var o = t.flags = S(e, a);
                if (a += 4, 0 != (1 & o) && (t.frames = S(e, a), a += 4), 0 != (2 & o) && (t.bytes = S(e, a), a += 4), 0 != (4 & o)) {
                    if (null != t.toc)
                        for (var l = 0; l < s; l++) t.toc[l] = e[a + l];
                    a += s
                }
                t.vbrScale = -1, 0 != (8 & o) && (t.vbrScale = S(e, a), a += 4), t.headersize = 72e3 * (n + 1) * i / t.samprate;
                var f = e[(a += 21) + 0] << 4;
                f += e[a + 1] >> 4;
                var c = (15 & e[a + 1]) << 8;
                return c += 255 & e[a + 2], (f < 0 || f > 3e3) && (f = -1), (c < 0 || c > 3e3) && (c = -1), t.encDelay = f, t.encPadding = c, t
            }, this.InitVbrTag = function(e) {
                var a, s = e.internal_flags;
                a = 1 == e.version ? h : e.out_samplerate < 16e3 ? m : b, e.VBR == r.vbr_off && (a = e.brate);
                var n = 72e3 * (e.version + 1) * a / e.out_samplerate,
                    _ = s.sideinfo_len + u;
                if (s.VBR_seek_table.TotalFrameSize = n, n < _ || n > c) e.bWriteVbrTag = !1;
                else {
                    s.VBR_seek_table.nVbrNumFrames = 0, s.VBR_seek_table.nBytesWritten = 0, s.VBR_seek_table.sum = 0, s.VBR_seek_table.seen = 0, s.VBR_seek_table.want = 1, s.VBR_seek_table.pos = 0, null == s.VBR_seek_table.bag && (s.VBR_seek_table.bag = new int[400], s.VBR_seek_table.size = 400);
                    var i = o(c);
                    R(e, i);
                    for (var l = s.VBR_seek_table.TotalFrameSize, f = 0; f < l; ++f) t.add_dummy_byte(e, 255 & i[f], 1)
                }
            }, this.updateMusicCRC = function(e, t, a, s) {
                for (var n = 0; n < s; ++n) e[0] = B(t[a + n], e[0])
            }, this.getLameTagFrame = function(e, l) {
                var f = e.internal_flags;
                if (!e.bWriteVbrTag) return 0;
                if (f.Class_ID != Lame.LAME_ID) return 0;
                if (f.VBR_seek_table.pos <= 0) return 0;
                if (l.length < f.VBR_seek_table.TotalFrameSize) return f.VBR_seek_table.TotalFrameSize;
                i.fill(l, 0, f.VBR_seek_table.TotalFrameSize, 0), R(e, l);
                var c = o(s);
                if (e.free_format)
                    for (var u = 1; u < s; ++u) c[u] = 255 & 255 * u / 100;
                else ! function(e, t) {
                    if (!(e.pos <= 0))
                        for (var a = 1; a < s; ++a) {
                            var n = a / s,
                                r = 0 | Math.floor(n * e.pos);
                            r > e.pos - 1 && (r = e.pos - 1);
                            var _ = 0 | 256 * e.bag[r] / e.sum;
                            _ > 255 && (_ = 255), t[a] = 255 & _
                        }
                }(f.VBR_seek_table, c);
                var h = f.sideinfo_len;
                e.error_protection && (h -= 2), e.VBR == r.vbr_off ? (l[h++] = 255 & v.charAt(0), l[h++] = 255 & v.charAt(1), l[h++] = 255 & v.charAt(2), l[h++] = 255 & v.charAt(3)) : (l[h++] = 255 & d.charAt(0), l[h++] = 255 & d.charAt(1), l[h++] = 255 & d.charAt(2), l[h++] = 255 & d.charAt(3)), w(l, h, 15), w(l, h += 4, f.VBR_seek_table.nVbrNumFrames), h += 4;
                var b = f.VBR_seek_table.nBytesWritten + f.VBR_seek_table.TotalFrameSize;
                w(l, h, 0 | b), h += 4, n.arraycopy(c, 0, l, h, c.length), h += c.length, e.error_protection && t.CRC_writeheader(f, l);
                var m = 0;
                for (u = 0; u < h; u++) m = B(l[u], m);
                return h += function(e, t, s, n, r) {
                    var i, o, l, f, c, u = e.internal_flags,
                        h = 0,
                        b = e.encoder_delay,
                        m = e.encoder_padding,
                        p = 100 - 10 * e.VBR_q - e.quality,
                        d = a.getLameVeryShortVersion(),
                        v = [1, 5, 3, 2, 4, 0, 3],
                        g = 0 | (e.lowpassfreq / 100 + .5 > 255 ? 255 : e.lowpassfreq / 100 + .5),
                        S = 0,
                        A = 0,
                        R = e.internal_flags.noise_shaping,
                        y = 0,
                        E = 0,
                        T = 0,
                        k = 0 != (1 & e.exp_nspsytune),
                        x = 0 != (2 & e.exp_nspsytune),
                        P = !1,
                        I = !1,
                        L = e.internal_flags.nogap_total,
                        V = e.internal_flags.nogap_current,
                        H = e.ATHtype;
                    switch (e.VBR) {
                        case vbr_abr:
                            c = e.VBR_mean_bitrate_kbps;
                            break;
                        case vbr_off:
                            c = e.brate;
                            break;
                        default:
                            c = e.VBR_min_bitrate_kbps
                    }
                    switch (i = 0 + (e.VBR.ordinal() < v.length ? v[e.VBR.ordinal()] : 0), u.findReplayGain && (u.RadioGain > 510 && (u.RadioGain = 510), u.RadioGain < -510 && (u.RadioGain = -510), A = 8192, A |= 3072, u.RadioGain >= 0 ? A |= u.RadioGain : (A |= 512, A |= -u.RadioGain)), u.findPeakSample && (S = Math.abs(0 | u.PeakSample / 32767 * Math.pow(2, 23) + .5)), -1 != L && (V > 0 && (I = !0), V < L - 1 && (P = !0)), f = H + ((k ? 1 : 0) << 4) + ((x ? 1 : 0) << 5) + ((P ? 1 : 0) << 6) + ((I ? 1 : 0) << 7), p < 0 && (p = 0), e.mode) {
                        case MONO:
                            y = 0;
                            break;
                        case STEREO:
                            y = 1;
                            break;
                        case DUAL_CHANNEL:
                            y = 2;
                            break;
                        case JOINT_STEREO:
                            y = e.force_ms ? 4 : 3;
                            break;
                        case NOT_SET:
                        default:
                            y = 7
                    }
                    T = e.in_samplerate <= 32e3 ? 0 : 48e3 == e.in_samplerate ? 2 : e.in_samplerate > 48e3 ? 3 : 1, (e.short_blocks == _.short_block_forced || e.short_blocks == _.short_block_dispensed || -1 == e.lowpassfreq && -1 == e.highpassfreq || e.scale_left < e.scale_right || e.scale_left > e.scale_right || e.disable_reservoir && e.brate < 320 || e.noATH || e.ATHonly || 0 == H || e.in_samplerate <= 32e3) && (E = 1), o = R + (y << 2) + (E << 5) + (T << 6), l = u.nMusicCRC, w(s, n + h, p), h += 4;
                    for (var O = 0; O < 9; O++) s[n + h + O] = 255 & d.charAt(O);
                    s[n + (h += 9)] = 255 & i, s[n + ++h] = 255 & g, w(s, n + ++h, S), M(s, n + (h += 4), A), M(s, n + (h += 2), 0), s[n + (h += 2)] = 255 & f, s[n + ++h] = c >= 255 ? 255 : 255 & c, s[n + ++h] = 255 & b >> 4, s[n + h + 1] = 255 & (b << 4) + (m >> 8), s[n + h + 2] = 255 & m, s[n + (h += 3)] = 255 & o, h++, s[n + h++] = 0, M(s, n + h, e.preset), w(s, n + (h += 2), t), M(s, n + (h += 4), l), h += 2;
                    for (var N = 0; N < h; N++) r = B(s[n + N], r);
                    return M(s, n + h, r), h += 2
                }(e, b, l, h, m), f.VBR_seek_table.TotalFrameSize
            }, this.putVbrTag = function(e, t) {
                if (e.internal_flags.VBR_seek_table.pos <= 0) return -1;
                if (t.seek(t.length()), 0 == t.length()) return -1;
                var a = function(e) {
                    e.seek(0);
                    var t = o(10);
                    return e.readFully(t), new String(t, "ISO-8859-1").startsWith("ID3") ? 0 : ((127 & t[6]) << 21 | (127 & t[7]) << 14 | (127 & t[8]) << 7 | 127 & t[9]) + t.length
                }(t);
                t.seek(a);
                var s = o(c),
                    n = getLameTagFrame(e, s);
                return n > s.length ? -1 : n < 1 ? 0 : (t.write(s, 0, n), 0)
            }
        }
        f.NUMTOCENTRIES = 100, f.MAXFRAMESIZE = 2880, e.exports = f
    },
    "8+Kk": function(e, t, a) {
        var s = a("Agby"),
            n = s.System,
            r = (s.VbrMode, s.Float, s.ShortBlock, s.Util),
            _ = s.Arrays,
            i = (s.new_array_n, s.new_byte, s.new_double, s.new_float),
            o = (s.new_float_n, s.new_int, s.new_int_n, s.assert, a("S14o"));
        e.exports = function() {
            var e = [-.1482523854003001, 32.308141959636465, 296.40344946382766, 883.1344870032432, 11113.947376231741, 1057.2713659324597, 305.7402417275812, 30.825928907280012, 3.8533188138216365, 59.42900443849514, 709.5899960123345, 5281.91112291017, -5829.66483675846, -817.6293103748613, -76.91656988279972, -4.594269939176596, .9063471690191471, .1960342806591213, -.15466694054279598, 34.324387823855965, 301.8067566458425, 817.599602898885, 11573.795901679885, 1181.2520595540152, 321.59731579894424, 31.232021761053772, 3.7107095756221318, 53.650946155329365, 684.167428119626, 5224.56624370173, -6366.391851890084, -908.9766368219582, -89.83068876699639, -5.411397422890401, .8206787908286602, .3901806440322567, -.16070888947830023, 36.147034243915876, 304.11815768187864, 732.7429163887613, 11989.60988270091, 1300.012278487897, 335.28490093152146, 31.48816102859945, 3.373875931311736, 47.232241542899175, 652.7371796173471, 5132.414255594984, -6909.087078780055, -1001.9990371107289, -103.62185754286375, -6.104916304710272, .7416505462720353, .5805693545089249, -.16636367662261495, 37.751650073343995, 303.01103387567713, 627.9747488785183, 12358.763425278165, 1412.2779918482834, 346.7496836825721, 31.598286663170416, 3.1598635433980946, 40.57878626349686, 616.1671130880391, 5007.833007176154, -7454.040671756168, -1095.7960341867115, -118.24411666465777, -6.818469345853504, .6681786379192989, .7653668647301797, -.1716176790982088, 39.11551877123304, 298.3413246578966, 503.5259106886539, 12679.589408408976, 1516.5821921214542, 355.9850766329023, 31.395241710249053, 2.9164211881972335, 33.79716964664243, 574.8943997801362, 4853.234992253242, -7997.57021486075, -1189.7624067269965, -133.6444792601766, -7.7202770609839915, .5993769336819237, .9427934736519954, -.17645823955292173, 40.21879108166477, 289.9982036694474, 359.3226160751053, 12950.259102786438, 1612.1013903507662, 362.85067106591504, 31.045922092242872, 2.822222032597987, 26.988862316190684, 529.8996541764288, 4671.371946949588, -8535.899136645805, -1282.5898586244496, -149.58553632943463, -8.643494270763135, .5345111359507916, 1.111140466039205, -.36174739330527045, 41.04429910497807, 277.5463268268618, 195.6386023135583, 13169.43812144731, 1697.6433561479398, 367.40983966190305, 30.557037410382826, 2.531473372857427, 20.070154905927314, 481.50208566532336, 4464.970341588308, -9065.36882077239, -1373.62841526722, -166.1660487028118, -9.58289321133207, .4729647758913199, 1.268786568327291, -.36970682634889585, 41.393213350082036, 261.2935935556502, 12.935476055240873, 13336.131683328815, 1772.508612059496, 369.76534388639965, 29.751323653701338, 2.4023193045459172, 13.304795348228817, 430.5615775526625, 4237.0568611071185, -9581.931701634761, -1461.6913552409758, -183.12733958476446, -10.718010163869403, .41421356237309503, 1.414213562373095, -.37677560326535325, 41.619486213528496, 241.05423794991074, -187.94665032361226, 13450.063605744153, 1836.153896465782, 369.4908799925761, 29.001847876923147, 2.0714759319987186, 6.779591200894186, 377.7767837205709, 3990.386575512536, -10081.709459700915, -1545.947424837898, -200.3762958015653, -11.864482073055006, .3578057213145241, 1.546020906725474, -.3829366947518991, 41.1516456456653, 216.47684307105183, -406.1569483347166, 13511.136535077321, 1887.8076599260432, 367.3025214564151, 28.136213436723654, 1.913880671464418, .3829366947518991, 323.85365704338597, 3728.1472257487526, -10561.233882199509, -1625.2025997821418, -217.62525175416, -13.015432208941645, .3033466836073424, 1.66293922460509, -.5822628872992417, 40.35639251440489, 188.20071124269245, -640.2706748618148, 13519.21490106562, 1927.6022433578062, 362.8197642637487, 26.968821921868447, 1.7463817695935329, -5.62650678237171, 269.3016715297017, 3453.386536448852, -11016.145278780888, -1698.6569643425091, -234.7658734267683, -14.16351421663124, .2504869601913055, 1.76384252869671, -.5887180101749253, 39.23429103868072, 155.76096234403798, -889.2492977967378, 13475.470561874661, 1955.0535223723712, 356.4450994756727, 25.894952980042156, 1.5695032905781554, -11.181939564328772, 214.80884394039484, 3169.1640829158237, -11443.321309975563, -1765.1588461316153, -251.68908574481912, -15.49755935939164, .198912367379658, 1.847759065022573, -.7912582233652842, 37.39369355329111, 119.699486012458, -1151.0956593239027, 13380.446257078214, 1970.3952110853447, 348.01959814116185, 24.731487364283044, 1.3850130831637748, -16.421408865300393, 161.05030052864092, 2878.3322807850063, -11838.991423510031, -1823.985884688674, -268.2854986386903, -16.81724543849939, .1483359875383474, 1.913880671464418, -.7960642926861912, 35.2322109610459, 80.01928065061526, -1424.0212633405113, 13235.794061869668, 1973.804052543835, 337.9908651258184, 23.289159354463873, 1.3934255946442087, -21.099669467133474, 108.48348407242611, 2583.700758091299, -12199.726194855148, -1874.2780658979746, -284.2467154529415, -18.11369784385905, .09849140335716425, 1.961570560806461, -.998795456205172, 32.56307803611191, 36.958364584370486, -1706.075448829146, 13043.287458812016, 1965.3831106103316, 326.43182772364605, 22.175018750622293, 1.198638339011324, -25.371248002043963, 57.53505923036915, 2288.41886619975, -12522.674544337233, -1914.8400385312243, -299.26241273417224, -19.37805630698734, .04912684976946725, 1.990369453344394, .035780907 * r.SQRT2 * .5 / 2384e-9, .017876148 * r.SQRT2 * .5 / 2384e-9, .003134727 * r.SQRT2 * .5 / 2384e-9, .002457142 * r.SQRT2 * .5 / 2384e-9, 971317e-9 * r.SQRT2 * .5 / 2384e-9, 218868e-9 * r.SQRT2 * .5 / 2384e-9, 101566e-9 * r.SQRT2 * .5 / 2384e-9, 13828e-9 * r.SQRT2 * .5 / 2384e-9, 12804.797818791945, 1945.5515939597317, 313.4244966442953, 49591e-9 / 2384e-9, 1995.1556208053692, 21458e-9 / 2384e-9, -69618e-9 / 2384e-9],
                t = [
                    [2.382191739347913e-13, 6.423305872147834e-13, 9.400849094049688e-13, 1.122435026096556e-12, 1.183840321267481e-12, 1.122435026096556e-12, 9.40084909404969e-13, 6.423305872147839e-13, 2.382191739347918e-13, 5.456116108943412e-12, 4.878985199565852e-12, 4.240448995017367e-12, 3.559909094758252e-12, 2.858043359288075e-12, 2.156177623817898e-12, 1.475637723558783e-12, 8.371015190102974e-13, 2.599706096327376e-13, -5.456116108943412e-12, -4.878985199565852e-12, -4.240448995017367e-12, -3.559909094758252e-12, -2.858043359288076e-12, -2.156177623817898e-12, -1.475637723558783e-12, -8.371015190102975e-13, -2.599706096327376e-13, -2.382191739347923e-13, -6.423305872147843e-13, -9.400849094049696e-13, -1.122435026096556e-12, -1.183840321267481e-12, -1.122435026096556e-12, -9.400849094049694e-13, -6.42330587214784e-13, -2.382191739347918e-13],
                    [2.382191739347913e-13, 6.423305872147834e-13, 9.400849094049688e-13, 1.122435026096556e-12, 1.183840321267481e-12, 1.122435026096556e-12, 9.400849094049688e-13, 6.423305872147841e-13, 2.382191739347918e-13, 5.456116108943413e-12, 4.878985199565852e-12, 4.240448995017367e-12, 3.559909094758253e-12, 2.858043359288075e-12, 2.156177623817898e-12, 1.475637723558782e-12, 8.371015190102975e-13, 2.599706096327376e-13, -5.461314069809755e-12, -4.921085770524055e-12, -4.343405037091838e-12, -3.732668368707687e-12, -3.093523840190885e-12, -2.430835727329465e-12, -1.734679010007751e-12, -9.74825365660928e-13, -2.797435120168326e-13, 0, 0, 0, 0, 0, 0, -2.283748241799531e-13, -4.037858874020686e-13, -2.146547464825323e-13],
                    [.1316524975873958, .414213562373095, .7673269879789602, 1.091308501069271, 1.303225372841206, 1.56968557711749, 1.920982126971166, 2.414213562373094, 3.171594802363212, 4.510708503662055, 7.595754112725146, 22.90376554843115, .984807753012208, .6427876096865394, .3420201433256688, .9396926207859084, -.1736481776669303, -.7660444431189779, .8660254037844387, .5, -.5144957554275265, -.4717319685649723, -.3133774542039019, -.1819131996109812, -.09457419252642064, -.04096558288530405, -.01419856857247115, -.003699974673760037, .8574929257125442, .8817419973177052, .9496286491027329, .9833145924917901, .9955178160675857, .9991605581781475, .999899195244447, .9999931550702802],
                    [0, 0, 0, 0, 0, 0, 2.283748241799531e-13, 4.037858874020686e-13, 2.146547464825323e-13, 5.461314069809755e-12, 4.921085770524055e-12, 4.343405037091838e-12, 3.732668368707687e-12, 3.093523840190885e-12, 2.430835727329466e-12, 1.734679010007751e-12, 9.74825365660928e-13, 2.797435120168326e-13, -5.456116108943413e-12, -4.878985199565852e-12, -4.240448995017367e-12, -3.559909094758253e-12, -2.858043359288075e-12, -2.156177623817898e-12, -1.475637723558782e-12, -8.371015190102975e-13, -2.599706096327376e-13, -2.382191739347913e-13, -6.423305872147834e-13, -9.400849094049688e-13, -1.122435026096556e-12, -1.183840321267481e-12, -1.122435026096556e-12, -9.400849094049688e-13, -6.423305872147841e-13, -2.382191739347918e-13]
                ],
                a = t[o.SHORT_TYPE],
                s = t[o.SHORT_TYPE],
                l = t[o.SHORT_TYPE],
                f = t[o.SHORT_TYPE],
                c = [0, 1, 16, 17, 8, 9, 24, 25, 4, 5, 20, 21, 12, 13, 28, 29, 2, 3, 18, 19, 10, 11, 26, 27, 6, 7, 22, 23, 14, 15, 30, 31];

            function u(t, a, s) {
                for (var n, _, i, o = 10, l = a + 238 - 14 - 286, f = -15; f < 0; f++) {
                    var c, u, h;
                    c = e[o + -10], u = t[l + -224] * c, h = t[a + 224] * c, c = e[o + -9], u += t[l + -160] * c, h += t[a + 160] * c, c = e[o + -8], u += t[l + -96] * c, h += t[a + 96] * c, c = e[o + -7], u += t[l + -32] * c, h += t[a + 32] * c, c = e[o + -6], u += t[l + 32] * c, h += t[a + -32] * c, c = e[o + -5], u += t[l + 96] * c, h += t[a + -96] * c, c = e[o + -4], u += t[l + 160] * c, h += t[a + -160] * c, c = e[o + -3], u += t[l + 224] * c, h += t[a + -224] * c, c = e[o + -2], u += t[a + -256] * c, h -= t[l + 256] * c, c = e[o + -1], u += t[a + -192] * c, h -= t[l + 192] * c, c = e[o + 0], u += t[a + -128] * c, h -= t[l + 128] * c, c = e[o + 1], u += t[a + -64] * c, h -= t[l + 64] * c, c = e[o + 2], u += t[a + 0] * c, h -= t[l + 0] * c, c = e[o + 3], u += t[a + 64] * c, h -= t[l + -64] * c, c = e[o + 4], u += t[a + 128] * c, h -= t[l + -128] * c, c = e[o + 5], u += t[a + 192] * c, c = (h -= t[l + -192] * c) - (u *= e[o + 6]), s[30 + 2 * f] = h + u, s[31 + 2 * f] = e[o + 7] * c, o += 18, a--, l++
                }
                h = t[a + -16] * e[o + -10], u = t[a + -32] * e[o + -2], h += (t[a + -48] - t[a + 16]) * e[o + -9], u += t[a + -96] * e[o + -1], h += (t[a + -80] + t[a + 48]) * e[o + -8], u += t[a + -160] * e[o + 0], h += (t[a + -112] - t[a + 80]) * e[o + -7], u += t[a + -224] * e[o + 1], h += (t[a + -144] + t[a + 112]) * e[o + -6], u -= t[a + 32] * e[o + 2], h += (t[a + -176] - t[a + 144]) * e[o + -5], u -= t[a + 96] * e[o + 3], h += (t[a + -208] + t[a + 176]) * e[o + -4], u -= t[a + 160] * e[o + 4], h += (t[a + -240] - t[a + 208]) * e[o + -3], n = (u -= t[a + 224]) - h, _ = u + h, h = s[14], u = s[15] - h, s[31] = _ + h, s[30] = n + u, s[15] = n - u, s[14] = _ - h, i = s[28] - s[0], s[0] += s[28], s[28] = i * e[o + -36 + 7], i = s[29] - s[1], s[1] += s[29], s[29] = i * e[o + -36 + 7], i = s[26] - s[2], s[2] += s[26], s[26] = i * e[o + -72 + 7], i = s[27] - s[3], s[3] += s[27], s[27] = i * e[o + -72 + 7], i = s[24] - s[4], s[4] += s[24], s[24] = i * e[o + -108 + 7], i = s[25] - s[5], s[5] += s[25], s[25] = i * e[o + -108 + 7], i = s[22] - s[6], s[6] += s[22], s[22] = i * r.SQRT2, i = s[23] - s[7], s[7] += s[23], s[23] = i * r.SQRT2 - s[7], s[7] -= s[6], s[22] -= s[7], s[23] -= s[22], i = s[6], s[6] = s[31] - i, s[31] = s[31] + i, i = s[7], s[7] = s[30] - i, s[30] = s[30] + i, i = s[22], s[22] = s[15] - i, s[15] = s[15] + i, i = s[23], s[23] = s[14] - i, s[14] = s[14] + i, i = s[20] - s[8], s[8] += s[20], s[20] = i * e[o + -180 + 7], i = s[21] - s[9], s[9] += s[21], s[21] = i * e[o + -180 + 7], i = s[18] - s[10], s[10] += s[18], s[18] = i * e[o + -216 + 7], i = s[19] - s[11], s[11] += s[19], s[19] = i * e[o + -216 + 7], i = s[16] - s[12], s[12] += s[16], s[16] = i * e[o + -252 + 7], i = s[17] - s[13], s[13] += s[17], s[17] = i * e[o + -252 + 7], i = -s[20] + s[24], s[20] += s[24], s[24] = i * e[o + -216 + 7], i = -s[21] + s[25], s[21] += s[25], s[25] = i * e[o + -216 + 7], i = s[4] - s[8], s[4] += s[8], s[8] = i * e[o + -216 + 7], i = s[5] - s[9], s[5] += s[9], s[9] = i * e[o + -216 + 7], i = s[0] - s[12], s[0] += s[12], s[12] = i * e[o + -72 + 7], i = s[1] - s[13], s[1] += s[13], s[13] = i * e[o + -72 + 7], i = s[16] - s[28], s[16] += s[28], s[28] = i * e[o + -72 + 7], i = -s[17] + s[29], s[17] += s[29], s[29] = i * e[o + -72 + 7], i = r.SQRT2 * (s[2] - s[10]), s[2] += s[10], s[10] = i, i = r.SQRT2 * (s[3] - s[11]), s[3] += s[11], s[11] = i, i = r.SQRT2 * (-s[18] + s[26]), s[18] += s[26], s[26] = i - s[18], i = r.SQRT2 * (-s[19] + s[27]), s[19] += s[27], s[27] = i - s[19], i = s[2], s[19] -= s[3], s[3] -= i, s[2] = s[31] - i, s[31] += i, i = s[3], s[11] -= s[19], s[18] -= i, s[3] = s[30] - i, s[30] += i, i = s[18], s[27] -= s[11], s[19] -= i, s[18] = s[15] - i, s[15] += i, i = s[19], s[10] -= i, s[19] = s[14] - i, s[14] += i, i = s[10], s[11] -= i, s[10] = s[23] - i, s[23] += i, i = s[11], s[26] -= i, s[11] = s[22] - i, s[22] += i, i = s[26], s[27] -= i, s[26] = s[7] - i, s[7] += i, i = s[27], s[27] = s[6] - i, s[6] += i, i = r.SQRT2 * (s[0] - s[4]), s[0] += s[4], s[4] = i, i = r.SQRT2 * (s[1] - s[5]), s[1] += s[5], s[5] = i, i = r.SQRT2 * (s[16] - s[20]), s[16] += s[20], s[20] = i, i = r.SQRT2 * (s[17] - s[21]), s[17] += s[21], s[21] = i, i = -r.SQRT2 * (s[8] - s[12]), s[8] += s[12], s[12] = i - s[8], i = -r.SQRT2 * (s[9] - s[13]), s[9] += s[13], s[13] = i - s[9], i = -r.SQRT2 * (s[25] - s[29]), s[25] += s[29], s[29] = i - s[25], i = -r.SQRT2 * (s[24] + s[28]), s[24] -= s[28], s[28] = i - s[24], i = s[24] - s[16], s[24] = i, i = s[20] - i, s[20] = i, i = s[28] - i, s[28] = i, i = s[25] - s[17], s[25] = i, i = s[21] - i, s[21] = i, i = s[29] - i, s[29] = i, i = s[17] - s[1], s[17] = i, i = s[9] - i, s[9] = i, i = s[25] - i, s[25] = i, i = s[5] - i, s[5] = i, i = s[21] - i, s[21] = i, i = s[13] - i, s[13] = i, i = s[29] - i, s[29] = i, i = s[1] - s[0], s[1] = i, i = s[16] - i, s[16] = i, i = s[17] - i, s[17] = i, i = s[8] - i, s[8] = i, i = s[9] - i, s[9] = i, i = s[24] - i, s[24] = i, i = s[25] - i, s[25] = i, i = s[4] - i, s[4] = i, i = s[5] - i, s[5] = i, i = s[20] - i, s[20] = i, i = s[21] - i, s[21] = i, i = s[12] - i, s[12] = i, i = s[13] - i, s[13] = i, i = s[28] - i, s[28] = i, i = s[29] - i, s[29] = i, i = s[0], s[0] += s[31], s[31] -= i, i = s[1], s[1] += s[30], s[30] -= i, i = s[16], s[16] += s[15], s[15] -= i, i = s[17], s[17] += s[14], s[14] -= i, i = s[8], s[8] += s[23], s[23] -= i, i = s[9], s[9] += s[22], s[22] -= i, i = s[24], s[24] += s[7], s[7] -= i, i = s[25], s[25] += s[6], s[6] -= i, i = s[4], s[4] += s[27], s[27] -= i, i = s[5], s[5] += s[26], s[26] -= i, i = s[20], s[20] += s[11], s[11] -= i, i = s[21], s[21] += s[10], s[10] -= i, i = s[12], s[12] += s[19], s[19] -= i, i = s[13], s[13] += s[18], s[18] -= i, i = s[28], s[28] += s[3], s[3] -= i, i = s[29], s[29] += s[2], s[2] -= i
            }

            function h(e, a) {
                for (var s = 0; s < 3; s++) {
                    var n, r, _, i, l, f;
                    r = (i = e[a + 6] * t[o.SHORT_TYPE][0] - e[a + 15]) + (n = e[a + 0] * t[o.SHORT_TYPE][2] - e[a + 9]), _ = i - n, l = (i = e[a + 15] * t[o.SHORT_TYPE][0] + e[a + 6]) + (n = e[a + 9] * t[o.SHORT_TYPE][2] + e[a + 0]), f = -i + n, n = 2.069978111953089e-11 * (e[a + 3] * t[o.SHORT_TYPE][1] - e[a + 12]), i = 2.069978111953089e-11 * (e[a + 12] * t[o.SHORT_TYPE][1] + e[a + 3]), e[a + 0] = 1.90752519173728e-11 * r + n, e[a + 15] = 1.90752519173728e-11 * -l + i, _ = .8660254037844387 * _ * 1.907525191737281e-11, l = .5 * l * 1.907525191737281e-11 + i, e[a + 3] = _ - l, e[a + 6] = _ + l, r = .5 * r * 1.907525191737281e-11 - n, f = .8660254037844387 * f * 1.907525191737281e-11, e[a + 9] = r + f, e[a + 12] = r - f, a++
                }
            }

            function b(e, t, a) {
                var n, r, _, i, o, l, f, c, u, h, b, m, p, d, v, g, S, w;
                _ = a[17] - a[9], o = a[15] - a[11], l = a[14] - a[12], f = a[0] + a[8], c = a[1] + a[7], u = a[2] + a[6], h = a[3] + a[5], e[t + 17] = f + u - h - (c - a[4]), r = (f + u - h) * s[19] + (c - a[4]), n = (_ - o - l) * s[18], e[t + 5] = n + r, e[t + 6] = n - r, i = (a[16] - a[10]) * s[18], c = c * s[19] + a[4], n = _ * s[12] + i + o * s[13] + l * s[14], r = -f * s[16] + c - u * s[17] + h * s[15], e[t + 1] = n + r, e[t + 2] = n - r, n = _ * s[13] - i - o * s[14] + l * s[12], r = -f * s[17] + c - u * s[15] + h * s[16], e[t + 9] = n + r, e[t + 10] = n - r, n = _ * s[14] - i + o * s[12] - l * s[13], r = f * s[15] - c + u * s[16] - h * s[17], e[t + 13] = n + r, e[t + 14] = n - r, b = a[8] - a[0], p = a[6] - a[2], d = a[5] - a[3], v = a[17] + a[9], g = a[16] + a[10], S = a[15] + a[11], w = a[14] + a[12], e[t + 0] = v + S + w + (g + a[13]), n = (v + S + w) * s[19] - (g + a[13]), r = (b - p + d) * s[18], e[t + 11] = n + r, e[t + 12] = n - r, m = (a[7] - a[1]) * s[18], g = a[13] - g * s[19], n = v * s[15] - g + S * s[16] + w * s[17], r = b * s[14] + m + p * s[12] + d * s[13], e[t + 3] = n + r, e[t + 4] = n - r, n = -v * s[17] + g - S * s[15] - w * s[16], r = b * s[13] + m - p * s[14] - d * s[12], e[t + 7] = n + r, e[t + 8] = n - r, n = -v * s[16] + g - S * s[17] - w * s[15], r = b * s[12] - m + p * s[13] - d * s[14], e[t + 15] = n + r, e[t + 16] = n - r
            }
            this.mdct_sub48 = function(e, s, r) {
                for (var m = s, p = 286, d = 0; d < e.channels_out; d++) {
                    for (var v = 0; v < e.mode_gr; v++) {
                        for (var g, S = e.l3_side.tt[v][d], w = S.xr, M = 0, A = e.sb_sample[d][1 - v], R = 0, B = 0; B < 9; B++)
                            for (u(m, p, A[R]), u(m, p + 32, A[R + 1]), R += 2, p += 64, g = 1; g < 32; g += 2) A[R - 1][g] *= -1;
                        for (g = 0; g < 32; g++, M += 18) {
                            var y = S.block_type,
                                E = e.sb_sample[d][v],
                                T = e.sb_sample[d][1 - v];
                            if (0 != S.mixed_block_flag && g < 2 && (y = 0), e.amp_filter[g] < 1e-12) _.fill(w, M + 0, M + 18, 0);
                            else {
                                if (e.amp_filter[g] < 1)
                                    for (B = 0; B < 18; B++) T[B][c[g]] *= e.amp_filter[g];
                                if (y == o.SHORT_TYPE) {
                                    for (B = -3; B < 0; B++) {
                                        var k = t[o.SHORT_TYPE][B + 3];
                                        w[M + 3 * B + 9] = E[9 + B][c[g]] * k - E[8 - B][c[g]], w[M + 3 * B + 18] = E[14 - B][c[g]] * k + E[15 + B][c[g]], w[M + 3 * B + 10] = E[15 + B][c[g]] * k - E[14 - B][c[g]], w[M + 3 * B + 19] = T[2 - B][c[g]] * k + T[3 + B][c[g]], w[M + 3 * B + 11] = T[3 + B][c[g]] * k - T[2 - B][c[g]], w[M + 3 * B + 20] = T[8 - B][c[g]] * k + T[9 + B][c[g]]
                                    }
                                    h(w, M)
                                } else {
                                    var x = i(18);
                                    for (B = -9; B < 0; B++) {
                                        var P, I;
                                        P = t[y][B + 27] * T[B + 9][c[g]] + t[y][B + 36] * T[8 - B][c[g]], I = t[y][B + 9] * E[B + 9][c[g]] - t[y][B + 18] * E[8 - B][c[g]], x[B + 9] = P - I * a[3 + B + 9], x[B + 18] = P * a[3 + B + 9] + I
                                    }
                                    b(w, M, x)
                                }
                            }
                            if (y != o.SHORT_TYPE && 0 != g)
                                for (B = 7; B >= 0; --B) {
                                    var L, V;
                                    L = w[M + B] * l[20 + B] + w[M + -1 - B] * f[28 + B], V = w[M + B] * f[28 + B] - w[M + -1 - B] * l[20 + B], w[M + -1 - B] = L, w[M + B] = V
                                }
                        }
                    }
                    if (m = r, p = 286, 1 == e.mode_gr)
                        for (var H = 0; H < 18; H++) n.arraycopy(e.sb_sample[d][1][H], 0, e.sb_sample[d][0][H], 0, 32)
                }
            }
        }
    },
    "87Ww": function(e, t, a) {
        var s = a("Agby"),
            n = (s.System, s.VbrMode, s.Float, s.ShortBlock, s.Util, s.Arrays, s.new_array_n, s.new_byte, s.new_double, s.new_float),
            r = (s.new_float_n, s.new_int),
            _ = (s.new_int_n, s.assert, a("mCij"));
        e.exports = function() {
            this.xr = n(576), this.l3_enc = r(576), this.scalefac = r(_.SFBMAX), this.xrpow_max = 0, this.part2_3_length = 0, this.big_values = 0, this.count1 = 0, this.global_gain = 0, this.scalefac_compress = 0, this.block_type = 0, this.mixed_block_flag = 0, this.table_select = r(3), this.subblock_gain = r(4), this.region0_count = 0, this.region1_count = 0, this.preflag = 0, this.scalefac_scale = 0, this.count1table_select = 0, this.part2_length = 0, this.sfb_lmax = 0, this.sfb_smin = 0, this.psy_lmax = 0, this.sfbmax = 0, this.psymax = 0, this.sfbdivide = 0, this.width = r(_.SFBMAX), this.window = r(_.SFBMAX), this.count1bits = 0, this.sfb_partition_table = null, this.slen = r(4), this.max_nonzero_coeff = 0;
            var e = this;

            function t(e) {
                return new Int32Array(e)
            }
            this.assign = function(a) {
                e.xr = function(e) {
                    return new Float32Array(e)
                }(a.xr), e.l3_enc = t(a.l3_enc), e.scalefac = t(a.scalefac), e.xrpow_max = a.xrpow_max, e.part2_3_length = a.part2_3_length, e.big_values = a.big_values, e.count1 = a.count1, e.global_gain = a.global_gain, e.scalefac_compress = a.scalefac_compress, e.block_type = a.block_type, e.mixed_block_flag = a.mixed_block_flag, e.table_select = t(a.table_select), e.subblock_gain = t(a.subblock_gain), e.region0_count = a.region0_count, e.region1_count = a.region1_count, e.preflag = a.preflag, e.scalefac_scale = a.scalefac_scale, e.count1table_select = a.count1table_select, e.part2_length = a.part2_length, e.sfb_lmax = a.sfb_lmax, e.sfb_smin = a.sfb_smin, e.psy_lmax = a.psy_lmax, e.sfbmax = a.sfbmax, e.psymax = a.psymax, e.sfbdivide = a.sfbdivide, e.width = t(a.width), e.window = t(a.window), e.count1bits = a.count1bits, e.sfb_partition_table = a.sfb_partition_table.slice(0), e.slen = t(a.slen), e.max_nonzero_coeff = a.max_nonzero_coeff
            }
        }
    },
    "8FI/": function(e, t) {
        e.exports = function(e) {
            this.bits = e
        }
    },
    "8m0O": function(e, t, a) {
        var s = a("obch");
        e.exports = function() {
            this.thm = new s, this.en = new s
        }
    },
    Agby: function(e, t) {
        function a(e) {
            return new Int16Array(e)
        }

        function s(e) {
            return new Int32Array(e)
        }

        function n(e) {
            return new Float32Array(e)
        }
        var r = {
                fill: function(e, t, a, s) {
                    if (2 == arguments.length)
                        for (var n = 0; n < e.length; n++) e[n] = arguments[1];
                    else
                        for (n = t; n < a; n++) e[n] = s
                }
            },
            _ = {
                arraycopy: function(e, t, a, s, n) {
                    for (var r = t + n; t < r;) a[s++] = e[t++]
                }
            },
            i = {};

        function o(e) {
            this.ordinal = e
        }
        i.SQRT2 = 1.4142135623730951, i.FAST_LOG10 = function(e) {
            return Math.log10(e)
        }, i.FAST_LOG10_X = function(e, t) {
            return Math.log10(e) * t
        }, o.short_block_allowed = new o(0), o.short_block_coupled = new o(1), o.short_block_dispensed = new o(2), o.short_block_forced = new o(3);
        var l = {};

        function f(e) {
            this.ordinal = e
        }
        l.MAX_VALUE = 3.4028235e38, f.vbr_off = new f(0), f.vbr_mt = new f(1), f.vbr_rh = new f(2), f.vbr_abr = new f(3), f.vbr_mtrh = new f(4), f.vbr_default = f.vbr_mtrh;
        e.exports = {
            System: _,
            VbrMode: f,
            Float: l,
            ShortBlock: o,
            Util: i,
            Arrays: r,
            new_array_n: function e(t) {
                if (1 == t.length) return new Array(t[0]);
                var a = t[0];
                t = t.slice(1);
                for (var s = [], n = 0; n < a; n++) s.push(e(t));
                return s
            },
            new_byte: function(e) {
                return new Int8Array(e)
            },
            new_double: function(e) {
                return new Float64Array(e)
            },
            new_float: n,
            new_float_n: function e(t) {
                if (1 == t.length) return n(t[0]);
                var a = t[0];
                t = t.slice(1);
                for (var s = [], r = 0; r < a; r++) s.push(e(t));
                return s
            },
            new_int: s,
            new_int_n: function e(t) {
                if (1 == t.length) return s(t[0]);
                var a = t[0];
                t = t.slice(1);
                for (var n = [], r = 0; r < a; r++) n.push(e(t));
                return n
            },
            new_short: a,
            new_short_n: function e(t) {
                if (1 == t.length) return a(t[0]);
                var s = t[0];
                t = t.slice(1);
                for (var n = [], r = 0; r < s; r++) n.push(e(t));
                return n
            },
            assert: function(e) {}
        }
    },
    CeaS: function(e, t, a) {
        var s = a("Agby"),
            n = s.new_float,
            r = s.new_int;
        s.assert;
        e.exports = function() {
            this.global_gain = 0, this.sfb_count1 = 0, this.step = r(39), this.noise = n(39), this.noise_log = n(39)
        }
    },
    Faw5: function(e, t, a) {
        a("7DDg")("Int16", 2, function(e) {
            return function(t, a, s) {
                return e(this, t, a, s)
            }
        })
    },
    JGZy: function(e, t) {
        e.exports = function() {
            this.sum = 0, this.seen = 0, this.want = 0, this.pos = 0, this.size = 0, this.bag = null, this.nVbrNumFrames = 0, this.nBytesWritten = 0, this.TotalFrameSize = 0
        }
    },
    JHR4: function(e, t, a) {
        var s = a("Agby"),
            n = (s.System, s.VbrMode),
            r = s.Float,
            _ = s.ShortBlock,
            i = s.Util,
            o = s.Arrays,
            l = (s.new_array_n, s.new_byte, s.new_double, s.new_float),
            f = s.new_float_n,
            c = s.new_int,
            u = (s.new_int_n, s.assert),
            h = a("gQDO"),
            b = a("S14o");
        e.exports = function() {
            var e = new h,
                t = 2.302585092994046,
                a = 2,
                s = 16,
                m = 2,
                p = 16,
                d = .34,
                v = 1 / 217621504 / (b.BLKSIZE / 2),
                g = .3,
                S = 21,
                w = .2302585093;

            function M(e) {
                return e
            }

            function A(e, t) {
                for (var a = 0, s = 0; s < b.BLKSIZE / 2; ++s) a += e[s] * t.ATH.eql_w[s];
                return a *= v
            }

            function R(t, a, s, n, r, _, o, l, f, c, u) {
                var h = t.internal_flags;
                if (f < 2) e.fft_long(h, n[r], f, c, u), e.fft_short(h, _[o], f, c, u);
                else if (2 == f) {
                    for (var m = b.BLKSIZE - 1; m >= 0; --m) {
                        var p = n[r + 0][m],
                            d = n[r + 1][m];
                        n[r + 0][m] = (p + d) * i.SQRT2 * .5, n[r + 1][m] = (p - d) * i.SQRT2 * .5
                    }
                    for (var v = 2; v >= 0; --v)
                        for (m = b.BLKSIZE_s - 1; m >= 0; --m) p = _[o + 0][v][m], d = _[o + 1][v][m], _[o + 0][v][m] = (p + d) * i.SQRT2 * .5, _[o + 1][v][m] = (p - d) * i.SQRT2 * .5
                }
                for (a[0] = M(n[r + 0][0]), a[0] *= a[0], m = b.BLKSIZE / 2 - 1; m >= 0; --m) {
                    var g = n[r + 0][b.BLKSIZE / 2 - m],
                        S = n[r + 0][b.BLKSIZE / 2 + m];
                    a[b.BLKSIZE / 2 - m] = M(.5 * (g * g + S * S))
                }
                for (v = 2; v >= 0; --v)
                    for (s[v][0] = _[o + 0][v][0], s[v][0] *= s[v][0], m = b.BLKSIZE_s / 2 - 1; m >= 0; --m) g = _[o + 0][v][b.BLKSIZE_s / 2 - m], S = _[o + 0][v][b.BLKSIZE_s / 2 + m], s[v][b.BLKSIZE_s / 2 - m] = M(.5 * (g * g + S * S));
                var w = 0;
                for (m = 11; m < b.HBLKSIZE; m++) w += a[m];
                if (h.tot_ener[f] = w, t.analysis) {
                    for (m = 0; m < b.HBLKSIZE; m++) h.pinfo.energy[l][f][m] = h.pinfo.energy_save[f][m], h.pinfo.energy_save[f][m] = a[m];
                    h.pinfo.pe[l][f] = h.pe[f]
                }
                2 == t.athaa_loudapprox && f < 2 && (h.loudness_sq[l][f] = h.loudness_sq_save[f], h.loudness_sq_save[f] = A(a, h))
            }
            var B, y, E, T = 8,
                k = 23,
                x = 15,
                P = [1, .79433, .63096, .63096, .63096, .63096, .63096, .25119, .11749],
                I = [3.3246 * 3.3246, 3.23837 * 3.23837, 9.9500500969, 9.0247369744, 8.1854926609, 7.0440875649, 2.46209 * 2.46209, 2.284 * 2.284, 4.4892710641, 1.96552 * 1.96552, 1.82335 * 1.82335, 1.69146 * 1.69146, 2.4621061921, 2.1508568964, 1.37074 * 1.37074, 1.31036 * 1.31036, 1.5691069696, 1.4555939904, 1.16203 * 1.16203, 1.2715945225, 1.09428 * 1.09428, 1.0659 * 1.0659, 1.0779838276, 1.0382591025, 1],
                L = [1.7782755904, 1.35879 * 1.35879, 1.38454 * 1.38454, 1.39497 * 1.39497, 1.40548 * 1.40548, 1.3537 * 1.3537, 1.6999465924, 1.22321 * 1.22321, 1.3169398564, 1],
                V = [5.5396212496, 2.29259 * 2.29259, 4.9868695969, 2.12675 * 2.12675, 2.02545 * 2.02545, 1.87894 * 1.87894, 1.74303 * 1.74303, 1.61695 * 1.61695, 2.2499700001, 1.39148 * 1.39148, 1.29083 * 1.29083, 1.19746 * 1.19746, 1.2339655056, 1.0779838276];

            function H(e, t, a, s, n, r) {
                var _, o, l;
                if (t > e) {
                    if (!(t < e * y)) return e + t;
                    _ = t / e
                } else {
                    if (e >= t * y) return e + t;
                    _ = e / t
                }
                if (u(e >= 0), u(t >= 0), e += t, s + 3 <= 6) {
                    if (_ >= B) return e;
                    var f = 0 | i.FAST_LOG10_X(_, 16);
                    return e * L[f]
                }
                return f = 0 | i.FAST_LOG10_X(_, 16), t = 0 != r ? n.ATH.cb_s[a] * n.ATH.adjust : n.ATH.cb_l[a] * n.ATH.adjust, u(t >= 0), e < E * t ? e > t ? (o = 1, f <= 13 && (o = V[f]), l = i.FAST_LOG10_X(e / t, 10 / 15), e * ((I[f] - o) * l + o)) : f > 13 ? e : e * V[f] : e * I[f]
            }
            var O = [1.7782755904, 1.35879 * 1.35879, 1.38454 * 1.38454, 1.39497 * 1.39497, 1.40548 * 1.40548, 1.3537 * 1.3537, 1.6999465924, 1.22321 * 1.22321, 1.3169398564, 1];

            function N(e, t, a) {
                var s;
                if (e < 0 && (e = 0), t < 0 && (t = 0), e <= 0) return t;
                if (t <= 0) return e;
                if (s = t > e ? t / e : e / t, -2 <= a && a <= 2) {
                    if (s >= B) return e + t;
                    var n = 0 | i.FAST_LOG10_X(s, 16);
                    return (e + t) * O[n]
                }
                return s < y ? e + t : (e < t && (e = t), e)
            }

            function D(e, t, a, s, n) {
                var r, _, i = 0,
                    o = 0;
                for (r = _ = 0; r < b.SBMAX_s; ++_, ++r) {
                    for (var l = e.bo_s[r], f = e.npart_s, c = l < f ? l : f; _ < c;) u(t[_] >= 0), u(a[_] >= 0), i += t[_], o += a[_], _++;
                    if (e.en[s].s[r][n] = i, e.thm[s].s[r][n] = o, _ >= f) {
                        ++r;
                        break
                    }
                    u(t[_] >= 0), u(a[_] >= 0);
                    var h = e.PSY.bo_s_weight[r],
                        m = 1 - h;
                    i = h * t[_], o = h * a[_], e.en[s].s[r][n] += i, e.thm[s].s[r][n] += o, i = m * t[_], o = m * a[_]
                }
                for (; r < b.SBMAX_s; ++r) e.en[s].s[r][n] = 0, e.thm[s].s[r][n] = 0
            }

            function X(e, t, a, s) {
                var n, r, _ = 0,
                    i = 0;
                for (n = r = 0; n < b.SBMAX_l; ++r, ++n) {
                    for (var o = e.bo_l[n], l = e.npart_l, f = o < l ? o : l; r < f;) u(t[r] >= 0), u(a[r] >= 0), _ += t[r], i += a[r], r++;
                    if (e.en[s].l[n] = _, e.thm[s].l[n] = i, r >= l) {
                        ++n;
                        break
                    }
                    u(t[r] >= 0), u(a[r] >= 0);
                    var c = e.PSY.bo_l_weight[n],
                        h = 1 - c;
                    _ = c * t[r], i = c * a[r], e.en[s].l[n] += _, e.thm[s].l[n] += i, _ = h * t[r], i = h * a[r]
                }
                for (; n < b.SBMAX_l; ++n) e.en[s].l[n] = 0, e.thm[s].l[n] = 0
            }

            function F(e, t, a, s, n, r) {
                var _, i, o = e.internal_flags;
                for (i = _ = 0; i < o.npart_s; ++i) {
                    for (var l = 0, f = 0, c = o.numlines_s[i], h = 0; h < c; ++h, ++_) {
                        var d = t[r][_];
                        l += d, f < d && (f = d)
                    }
                    a[i] = l
                }
                for (u(i == o.npart_s), u(129 == _), _ = i = 0; i < o.npart_s; i++) {
                    var v = o.s3ind_s[i][0],
                        g = o.s3_ss[_++] * a[v];
                    for (++v; v <= o.s3ind_s[i][1];) g += o.s3_ss[_] * a[v], ++_, ++v;
                    var S = m * o.nb_s1[n][i];
                    if (s[i] = Math.min(g, S), o.blocktype_old[1 & n] == b.SHORT_TYPE) {
                        S = p * o.nb_s2[n][i];
                        var w = s[i];
                        s[i] = Math.min(S, w)
                    }
                    o.nb_s2[n][i] = o.nb_s1[n][i], o.nb_s1[n][i] = g, u(s[i] >= 0)
                }
                for (; i <= b.CBANDS; ++i) a[i] = 0, s[i] = 0
            }

            function q(e, t, a) {
                return a >= 1 ? e : a <= 0 ? t : t > 0 ? Math.pow(e / t, a) * t : 0
            }
            var Y = [11.8, 13.6, 17.2, 32, 46.5, 51.3, 57.5, 67.1, 71.5, 84.6, 97.6, 130];

            function C(e, a) {
                for (var s = 309.07, n = 0; n < b.SBMAX_s - 1; n++)
                    for (var r = 0; r < 3; r++) {
                        var _ = e.thm.s[n][r];
                        if (u(n < Y.length), _ > 0) {
                            var o = _ * a,
                                l = e.en.s[n][r];
                            l > o && (l > 1e10 * o ? s += Y[n] * (10 * t) : (u(o > 0), s += Y[n] * i.FAST_LOG10(l / o)))
                        }
                    }
                return s
            }
            var j = [6.8, 5.8, 5.8, 6.4, 6.5, 9.9, 12.1, 14.4, 15, 18.9, 21.6, 26.9, 34.2, 40.2, 46.8, 56.5, 60.7, 73.9, 85.7, 93.4, 126.1];

            function G(e, a) {
                for (var s = 281.0575, n = 0; n < b.SBMAX_l - 1; n++) {
                    var r = e.thm.l[n];
                    if (u(n < j.length), r > 0) {
                        var _ = r * a,
                            o = e.en.l[n];
                        o > _ && (o > 1e10 * _ ? s += j[n] * (10 * t) : (u(_ > 0), s += j[n] * i.FAST_LOG10(o / _)))
                    }
                }
                return s
            }

            function z(e, t, a, s, n) {
                var r, _;
                for (r = _ = 0; r < e.npart_l; ++r) {
                    var i, o = 0,
                        l = 0;
                    for (i = 0; i < e.numlines_l[r]; ++i, ++_) {
                        var f = t[_];
                        u(f >= 0), o += f, l < f && (l = f)
                    }
                    a[r] = o, s[r] = l, n[r] = o * e.rnumlines_l[r], u(e.rnumlines_l[r] >= 0), u(o >= 0), u(a[r] >= 0), u(s[r] >= 0), u(n[r] >= 0)
                }
            }

            function U(e, t, a, s) {
                var n = P.length - 1,
                    r = 0,
                    _ = a[r] + a[r + 1];
                for (u(_ >= 0), _ > 0 ? ((i = t[r]) < t[r + 1] && (i = t[r + 1]), u(e.numlines_l[r] + e.numlines_l[r + 1] - 1 > 0), (o = 0 | (_ = 20 * (2 * i - _) / (_ * (e.numlines_l[r] + e.numlines_l[r + 1] - 1)))) > n && (o = n), s[r] = o) : s[r] = 0, r = 1; r < e.npart_l - 1; r++) {
                    var i, o;
                    _ = a[r - 1] + a[r] + a[r + 1], u(_ >= 0), _ > 0 ? ((i = t[r - 1]) < t[r] && (i = t[r]), i < t[r + 1] && (i = t[r + 1]), u(e.numlines_l[r - 1] + e.numlines_l[r] + e.numlines_l[r + 1] - 1 > 0), (o = 0 | (_ = 20 * (3 * i - _) / (_ * (e.numlines_l[r - 1] + e.numlines_l[r] + e.numlines_l[r + 1] - 1)))) > n && (o = n), s[r] = o) : s[r] = 0
                }
                u(r > 0), u(r == e.npart_l - 1), _ = a[r - 1] + a[r], u(_ >= 0), _ > 0 ? ((i = t[r - 1]) < t[r] && (i = t[r]), u(e.numlines_l[r - 1] + e.numlines_l[r] - 1 > 0), (o = 0 | (_ = 20 * (2 * i - _) / (_ * (e.numlines_l[r - 1] + e.numlines_l[r] - 1)))) > n && (o = n), s[r] = o) : s[r] = 0, u(r == e.npart_l - 1)
            }
            var K = [-1.730326e-17, -.01703172, -1.349528e-17, .0418072, -6.73278e-17, -.0876324, -3.0835e-17, .1863476, -1.104424e-16, -.627638];

            function Z(t, a, s, n, r, _, o, l) {
                var f = t.internal_flags;
                if (n < 2) e.fft_long(f, o[l], n, a, s);
                else if (2 == n)
                    for (var c = b.BLKSIZE - 1; c >= 0; --c) {
                        var u = o[l + 0][c],
                            h = o[l + 1][c];
                        o[l + 0][c] = (u + h) * i.SQRT2 * .5, o[l + 1][c] = (u - h) * i.SQRT2 * .5
                    }
                for (_[0] = M(o[l + 0][0]), _[0] *= _[0], c = b.BLKSIZE / 2 - 1; c >= 0; --c) {
                    var m = o[l + 0][b.BLKSIZE / 2 - c],
                        p = o[l + 0][b.BLKSIZE / 2 + c];
                    _[b.BLKSIZE / 2 - c] = M(.5 * (m * m + p * p))
                }
                var d = 0;
                for (c = 11; c < b.HBLKSIZE; c++) d += _[c];
                if (f.tot_ener[n] = d, t.analysis) {
                    for (c = 0; c < b.HBLKSIZE; c++) f.pinfo.energy[r][n][c] = f.pinfo.energy_save[n][c], f.pinfo.energy_save[n][c] = _[c];
                    f.pinfo.pe[r][n] = f.pe[n]
                }
            }

            function Q(t, a, s, n, r, _, o, l) {
                var f = t.internal_flags;
                if (0 == r && n < 2 && e.fft_short(f, o[l], n, a, s), 2 == n)
                    for (var c = b.BLKSIZE_s - 1; c >= 0; --c) {
                        var u = o[l + 0][r][c],
                            h = o[l + 1][r][c];
                        o[l + 0][r][c] = (u + h) * i.SQRT2 * .5, o[l + 1][r][c] = (u - h) * i.SQRT2 * .5
                    }
                for (_[r][0] = o[l + 0][r][0], _[r][0] *= _[r][0], c = b.BLKSIZE_s / 2 - 1; c >= 0; --c) {
                    var m = o[l + 0][r][b.BLKSIZE_s / 2 - c],
                        p = o[l + 0][r][b.BLKSIZE_s / 2 + c];
                    _[r][b.BLKSIZE_s / 2 - c] = M(.5 * (m * m + p * p))
                }
            }

            function W(e, t, a, s) {
                var n = e.internal_flags;
                2 == e.athaa_loudapprox && a < 2 && (n.loudness_sq[t][a] = n.loudness_sq_save[a], n.loudness_sq_save[a] = A(s, n))
            }
            this.L3psycho_anal_ns = function(e, t, r, i, h, m, p, d, v, w) {
                var M, A, B, y, E, T, k, x, I, L, V = e.internal_flags,
                    O = f([2, b.BLKSIZE]),
                    N = f([2, 3, b.BLKSIZE_s]),
                    Y = l(b.CBANDS + 1),
                    j = l(b.CBANDS + 1),
                    Z = l(b.CBANDS + 2),
                    Q = c(2),
                    W = c(2),
                    J = f([2, 576]),
                    $ = c(b.CBANDS + 2),
                    ee = c(b.CBANDS + 2);
                for (o.fill(ee, 0), M = V.channels_out, e.mode == MPEGMode.JOINT_STEREO && (M = 4), I = e.VBR == n.vbr_off ? 0 == V.ResvMax ? 0 : V.ResvSize / V.ResvMax * .5 : e.VBR == n.vbr_rh || e.VBR == n.vbr_mtrh || e.VBR == n.vbr_mt ? .6 : 1, A = 0; A < V.channels_out; A++) {
                    var te = t[A],
                        ae = r + 576 - 350 - S + 192;
                    for (u(K.length == (S - 1) / 2), y = 0; y < 576; y++) {
                        var se, ne;
                        for (se = te[ae + y + 10], ne = 0, E = 0; E < (S - 1) / 2 - 1; E += 2) se += K[E] * (te[ae + y + E] + te[ae + y + S - E]), ne += K[E + 1] * (te[ae + y + E + 1] + te[ae + y + S - E - 1]);
                        J[A][y] = se + ne
                    }
                    h[i][A].en.assign(V.en[A]), h[i][A].thm.assign(V.thm[A]), M > 2 && (m[i][A].en.assign(V.en[A + 2]), m[i][A].thm.assign(V.thm[A + 2]))
                }
                for (A = 0; A < M; A++) {
                    var re, _e = l(12),
                        ie = [0, 0, 0, 0],
                        oe = l(12),
                        le = 1,
                        fe = l(b.CBANDS),
                        ce = l(b.CBANDS),
                        ue = [0, 0, 0, 0],
                        he = l(b.HBLKSIZE),
                        be = f([3, b.HBLKSIZE_s]);
                    for (u(V.npart_s <= b.CBANDS), u(V.npart_l <= b.CBANDS), y = 0; y < 3; y++) _e[y] = V.nsPsy.last_en_subshort[A][y + 6], u(V.nsPsy.last_en_subshort[A][y + 4] > 0), oe[y] = _e[y] / V.nsPsy.last_en_subshort[A][y + 4], ie[0] += _e[y];
                    if (2 == A)
                        for (y = 0; y < 576; y++) {
                            var me, pe;
                            me = J[0][y], pe = J[1][y], J[0][y] = me + pe, J[1][y] = me - pe
                        }
                    var de = J[1 & A],
                        ve = 0;
                    for (y = 0; y < 9; y++) {
                        for (var ge = ve + 64, Se = 1; ve < ge; ve++) Se < Math.abs(de[ve]) && (Se = Math.abs(de[ve]));
                        V.nsPsy.last_en_subshort[A][y] = _e[y + 3] = Se, ie[1 + y / 3] += Se, Se > _e[y + 3 - 2] ? (u(_e[y + 3 - 2] > 0), Se /= _e[y + 3 - 2]) : _e[y + 3 - 2] > 10 * Se ? (u(Se > 0), Se = _e[y + 3 - 2] / (10 * Se)) : Se = 0, oe[y + 3] = Se
                    }
                    if (e.analysis) {
                        var we = oe[0];
                        for (y = 1; y < 12; y++) we < oe[y] && (we = oe[y]);
                        V.pinfo.ers[i][A] = V.pinfo.ers_save[A], V.pinfo.ers_save[A] = we
                    }
                    for (re = 3 == A ? V.nsPsy.attackthre_s : V.nsPsy.attackthre, y = 0; y < 12; y++) 0 == ue[y / 3] && oe[y] > re && (ue[y / 3] = y % 3 + 1);
                    for (y = 1; y < 4; y++) {
                        var Me;
                        ie[y - 1] > ie[y] ? (u(ie[y] > 0), Me = ie[y - 1] / ie[y]) : (u(ie[y - 1] > 0), Me = ie[y] / ie[y - 1]), Me < 1.7 && (ue[y] = 0, 1 == y && (ue[0] = 0))
                    }
                    for (0 != ue[0] && 0 != V.nsPsy.lastAttacks[A] && (ue[0] = 0), 3 != V.nsPsy.lastAttacks[A] && ue[0] + ue[1] + ue[2] + ue[3] == 0 || (le = 0, 0 != ue[1] && 0 != ue[0] && (ue[1] = 0), 0 != ue[2] && 0 != ue[1] && (ue[2] = 0), 0 != ue[3] && 0 != ue[2] && (ue[3] = 0)), A < 2 ? W[A] = le : 0 == le && (W[0] = W[1] = 0), v[A] = V.tot_ener[A], R(e, he, be, O, 1 & A, N, 1 & A, i, A, t, r), z(V, he, Y, fe, ce), U(V, fe, ce, $), x = 0; x < 3; x++) {
                        var Ae, Re;
                        for (F(e, be, j, Z, A, x), D(V, j, Z, A, x), k = 0; k < b.SBMAX_s; k++) {
                            if (Re = V.thm[A].s[k][x], Re *= .8, ue[x] >= 2 || 1 == ue[x + 1]) {
                                var Be = 0 != x ? x - 1 : 2;
                                Se = q(V.thm[A].s[k][Be], Re, .6 * I), Re = Math.min(Re, Se)
                            }
                            1 == ue[x] ? (Be = 0 != x ? x - 1 : 2, Se = q(V.thm[A].s[k][Be], Re, g * I), Re = Math.min(Re, Se)) : (0 != x && 3 == ue[x - 1] || 0 == x && 3 == V.nsPsy.lastAttacks[A]) && (Be = 2 != x ? x + 1 : 0, Se = q(V.thm[A].s[k][Be], Re, g * I), Re = Math.min(Re, Se)), Ae = _e[3 * x + 3] + _e[3 * x + 4] + _e[3 * x + 5], 6 * _e[3 * x + 5] < Ae && (Re *= .5, 6 * _e[3 * x + 4] < Ae && (Re *= .5)), V.thm[A].s[k][x] = Re
                        }
                    }
                    for (V.nsPsy.lastAttacks[A] = ue[2], T = 0, B = 0; B < V.npart_l; B++) {
                        for (var ye = V.s3ind[B][0], Ee = Y[ye] * P[$[ye]], Te = V.s3_ll[T++] * Ee; ++ye <= V.s3ind[B][1];) Ee = Y[ye] * P[$[ye]], Te = H(Te, V.s3_ll[T++] * Ee, ye, ye - B, V, 0);
                        Te *= .158489319246111, V.blocktype_old[1 & A] == b.SHORT_TYPE ? Z[B] = Te : Z[B] = q(Math.min(Te, Math.min(a * V.nb_1[A][B], s * V.nb_2[A][B])), Te, I), V.nb_2[A][B] = V.nb_1[A][B], V.nb_1[A][B] = Te
                    }
                    for (; B <= b.CBANDS; ++B) Y[B] = 0, Z[B] = 0;
                    X(V, Y, Z, A)
                }
                for (e.mode != MPEGMode.STEREO && e.mode != MPEGMode.JOINT_STEREO || e.interChRatio > 0 && function(e, t) {
                        var a = e.internal_flags;
                        if (a.channels_out > 1) {
                            for (var s = 0; s < b.SBMAX_l; s++) {
                                var n = a.thm[0].l[s],
                                    r = a.thm[1].l[s];
                                a.thm[0].l[s] += r * t, a.thm[1].l[s] += n * t
                            }
                            for (s = 0; s < b.SBMAX_s; s++)
                                for (var _ = 0; _ < 3; _++) n = a.thm[0].s[s][_], r = a.thm[1].s[s][_], a.thm[0].s[s][_] += r * t, a.thm[1].s[s][_] += n * t
                        }
                    }(e, e.interChRatio), e.mode == MPEGMode.JOINT_STEREO && (function(e) {
                        for (var t = 0; t < b.SBMAX_l; t++)
                            if (!(e.thm[0].l[t] > 1.58 * e.thm[1].l[t] || e.thm[1].l[t] > 1.58 * e.thm[0].l[t])) {
                                var a = e.mld_l[t] * e.en[3].l[t],
                                    s = Math.max(e.thm[2].l[t], Math.min(e.thm[3].l[t], a));
                                a = e.mld_l[t] * e.en[2].l[t];
                                var n = Math.max(e.thm[3].l[t], Math.min(e.thm[2].l[t], a));
                                e.thm[2].l[t] = s, e.thm[3].l[t] = n
                            }
                        for (t = 0; t < b.SBMAX_s; t++)
                            for (var r = 0; r < 3; r++) e.thm[0].s[t][r] > 1.58 * e.thm[1].s[t][r] || e.thm[1].s[t][r] > 1.58 * e.thm[0].s[t][r] || (a = e.mld_s[t] * e.en[3].s[t][r], s = Math.max(e.thm[2].s[t][r], Math.min(e.thm[3].s[t][r], a)), a = e.mld_s[t] * e.en[2].s[t][r], n = Math.max(e.thm[3].s[t][r], Math.min(e.thm[2].s[t][r], a)), e.thm[2].s[t][r] = s, e.thm[3].s[t][r] = n)
                    }(V), L = e.msfix, Math.abs(L) > 0 && function(e, t, a) {
                        var s = t,
                            n = Math.pow(10, a);
                        t *= 2, s *= 2;
                        for (var r = 0; r < b.SBMAX_l; r++) f = e.ATH.cb_l[e.bm_l[r]] * n, (i = Math.min(Math.max(e.thm[0].l[r], f), Math.max(e.thm[1].l[r], f))) * t < (o = Math.max(e.thm[2].l[r], f)) + (l = Math.max(e.thm[3].l[r], f)) && u((o *= c = i * s / (o + l)) + (l *= c) > 0), e.thm[2].l[r] = Math.min(o, e.thm[2].l[r]), e.thm[3].l[r] = Math.min(l, e.thm[3].l[r]);
                        for (n *= b.BLKSIZE_s / b.BLKSIZE, r = 0; r < b.SBMAX_s; r++)
                            for (var _ = 0; _ < 3; _++) {
                                var i, o, l, f, c;
                                f = e.ATH.cb_s[e.bm_s[r]] * n, (i = Math.min(Math.max(e.thm[0].s[r][_], f), Math.max(e.thm[1].s[r][_], f))) * t < (o = Math.max(e.thm[2].s[r][_], f)) + (l = Math.max(e.thm[3].s[r][_], f)) && u((o *= c = i * t / (o + l)) + (l *= c) > 0), e.thm[2].s[r][_] = Math.min(e.thm[2].s[r][_], o), e.thm[3].s[r][_] = Math.min(e.thm[3].s[r][_], l)
                            }
                    }(V, L, e.ATHlower * V.ATH.adjust)), function(e, t, a, s) {
                        var n = e.internal_flags;
                        e.short_blocks != _.short_block_coupled || 0 != t[0] && 0 != t[1] || (t[0] = t[1] = 0);
                        for (var r = 0; r < n.channels_out; r++) s[r] = b.NORM_TYPE, e.short_blocks == _.short_block_dispensed && (t[r] = 1), e.short_blocks == _.short_block_forced && (t[r] = 0), 0 != t[r] ? (u(n.blocktype_old[r] != b.START_TYPE), n.blocktype_old[r] == b.SHORT_TYPE && (s[r] = b.STOP_TYPE)) : (s[r] = b.SHORT_TYPE, n.blocktype_old[r] == b.NORM_TYPE && (n.blocktype_old[r] = b.START_TYPE), n.blocktype_old[r] == b.STOP_TYPE && (n.blocktype_old[r] = b.SHORT_TYPE)), a[r] = n.blocktype_old[r], n.blocktype_old[r] = s[r]
                    }(e, W, w, Q), A = 0; A < M; A++) {
                    var ke, xe, Pe, Ie = 0;
                    A > 1 ? (ke = d, Ie = -2, xe = b.NORM_TYPE, w[0] != b.SHORT_TYPE && w[1] != b.SHORT_TYPE || (xe = b.SHORT_TYPE), Pe = m[i][A - 2]) : (ke = p, Ie = 0, xe = w[A], Pe = h[i][A]), xe == b.SHORT_TYPE ? ke[Ie + A] = C(Pe, V.masking_lower) : ke[Ie + A] = G(Pe, V.masking_lower), e.analysis && (V.pinfo.pe[i][A] = ke[Ie + A])
                }
                return 0
            };
            var J = [-1.730326e-17, -.01703172, -1.349528e-17, .0418072, -6.73278e-17, -.0876324, -3.0835e-17, .1863476, -1.104424e-16, -.627638];

            function $(e, t, a) {
                if (0 == a)
                    for (var s = 0; s < e.npart_s; s++) e.nb_s2[t][s] = e.nb_s1[t][s], e.nb_s1[t][s] = 0
            }

            function ee(e, t) {
                for (var a = 0; a < e.npart_l; a++) e.nb_2[t][a] = e.nb_1[t][a], e.nb_1[t][a] = 0
            }

            function te(e, t, a, s, n, r) {
                var _, i, o, f = e.internal_flags,
                    c = new float[b.CBANDS],
                    h = l(b.CBANDS),
                    m = new int[b.CBANDS];
                for (o = i = 0; o < f.npart_s; ++o) {
                    var p = 0,
                        d = 0,
                        v = f.numlines_s[o];
                    for (_ = 0; _ < v; ++_, ++i) {
                        var g = t[r][i];
                        p += g, d < g && (d = g)
                    }
                    a[o] = p, u(p >= 0), c[o] = d, u(v > 0), h[o] = p / v, u(h[o] >= 0)
                }
                for (u(o == f.npart_s), u(129 == i); o < b.CBANDS; ++o) c[o] = 0, h[o] = 0;
                for (function(e, t, a, s) {
                        var n = P.length - 1,
                            r = 0,
                            _ = a[r] + a[r + 1];
                        for (u(_ >= 0), _ > 0 ? ((i = t[r]) < t[r + 1] && (i = t[r + 1]), u(e.numlines_s[r] + e.numlines_s[r + 1] - 1 > 0), (o = 0 | (_ = 20 * (2 * i - _) / (_ * (e.numlines_s[r] + e.numlines_s[r + 1] - 1)))) > n && (o = n), s[r] = o) : s[r] = 0, r = 1; r < e.npart_s - 1; r++) {
                            var i, o;
                            _ = a[r - 1] + a[r] + a[r + 1], u(r + 1 < e.npart_s), u(_ >= 0), _ > 0 ? ((i = t[r - 1]) < t[r] && (i = t[r]), i < t[r + 1] && (i = t[r + 1]), u(e.numlines_s[r - 1] + e.numlines_s[r] + e.numlines_s[r + 1] - 1 > 0), (o = 0 | (_ = 20 * (3 * i - _) / (_ * (e.numlines_s[r - 1] + e.numlines_s[r] + e.numlines_s[r + 1] - 1)))) > n && (o = n), s[r] = o) : s[r] = 0
                        }
                        u(r > 0), u(r == e.npart_s - 1), _ = a[r - 1] + a[r], u(_ >= 0), _ > 0 ? ((i = t[r - 1]) < t[r] && (i = t[r]), u(e.numlines_s[r - 1] + e.numlines_s[r] - 1 > 0), (o = 0 | (_ = 20 * (2 * i - _) / (_ * (e.numlines_s[r - 1] + e.numlines_s[r] - 1)))) > n && (o = n), s[r] = o) : s[r] = 0, u(r == e.npart_s - 1)
                    }(f, c, h, m), i = o = 0; o < f.npart_s; o++) {
                    var S, w, M, A, R, B = f.s3ind_s[o][0],
                        y = f.s3ind_s[o][1];
                    for (S = m[B], w = 1, A = f.s3_ss[i] * a[B] * P[m[B]], ++i, ++B; B <= y;) S += m[B], w += 1, A = N(A, M = f.s3_ss[i] * a[B] * P[m[B]], B - o), ++i, ++B;
                    A *= R = .5 * P[S = (1 + 2 * S) / (2 * w)], s[o] = A, f.nb_s2[n][o] = f.nb_s1[n][o], f.nb_s1[n][o] = A, M = c[o], M *= f.minval_s[o], M *= R, s[o] > M && (s[o] = M), f.masking_lower > 1 && (s[o] *= f.masking_lower), s[o] > a[o] && (s[o] = a[o]), f.masking_lower < 1 && (s[o] *= f.masking_lower), u(s[o] >= 0)
                }
                for (; o < b.CBANDS; ++o) a[o] = 0, s[o] = 0
            }

            function ae(e, t, n, r, _) {
                var i, o = l(b.CBANDS),
                    f = l(b.CBANDS),
                    h = c(b.CBANDS + 2);
                z(e, t, n, o, f), U(e, o, f, h);
                var m = 0;
                for (i = 0; i < e.npart_l; i++) {
                    var p, d, v, S = e.s3ind[i][0],
                        w = e.s3ind[i][1],
                        M = 0,
                        A = 0;
                    for (M = h[S], A += 1, d = e.s3_ll[m] * n[S] * P[h[S]], ++m, ++S; S <= w;) M += h[S], A += 1, d = N(d, p = e.s3_ll[m] * n[S] * P[h[S]], S - i), ++m, ++S;
                    if (d *= v = .5 * P[M = (1 + 2 * M) / (2 * A)], e.blocktype_old[1 & _] == b.SHORT_TYPE) {
                        var R = a * e.nb_1[_][i];
                        r[i] = R > 0 ? Math.min(d, R) : Math.min(d, n[i] * g)
                    } else {
                        var B = s * e.nb_2[_][i],
                            y = a * e.nb_1[_][i];
                        B <= 0 && (B = d), y <= 0 && (y = d), R = e.blocktype_old[1 & _] == b.NORM_TYPE ? Math.min(y, B) : y, r[i] = Math.min(d, R)
                    }
                    e.nb_2[_][i] = e.nb_1[_][i], e.nb_1[_][i] = d, p = o[i], p *= e.minval_l[i], p *= v, r[i] > p && (r[i] = p), e.masking_lower > 1 && (r[i] *= e.masking_lower), r[i] > n[i] && (r[i] = n[i]), e.masking_lower < 1 && (r[i] *= e.masking_lower), u(r[i] >= 0)
                }
                for (; i < b.CBANDS; ++i) n[i] = 0, r[i] = 0
            }

            function se(e, t, a, s, n, r, _) {
                for (var i, o, l = 2 * r, f = r > 0 ? Math.pow(10, n) : 1, c = 0; c < _; ++c) {
                    var h = e[2][c],
                        b = e[3][c],
                        m = t[0][c],
                        p = t[1][c],
                        d = t[2][c],
                        v = t[3][c];
                    if (m <= 1.58 * p && p <= 1.58 * m) {
                        var g = a[c] * b,
                            S = a[c] * h;
                        o = Math.max(d, Math.min(v, g)), i = Math.max(v, Math.min(d, S))
                    } else o = d, i = v;
                    if (r > 0) {
                        var w, M, A = s[c] * f;
                        if (w = Math.min(Math.max(m, A), Math.max(p, A)), (M = (d = Math.max(o, A)) + (v = Math.max(i, A))) > 0 && w * l < M) {
                            var R = w * l / M;
                            d *= R, v *= R, u(M > 0)
                        }
                        o = Math.min(d, o), i = Math.min(v, i)
                    }
                    o > h && (o = h), i > b && (i = b), t[2][c] = o, t[3][c] = i
                }
            }

            function ne(e, t) {
                var a;
                return (a = e >= 0 ? 27 * -e : e * t) <= -72 ? 0 : Math.exp(a * w)
            }

            function re(e) {
                var t, a, s, n, r = 0;
                for (r = 0; ne(r, e) > 1e-20; r -= 1);
                for (s = r, n = 0; Math.abs(n - s) > 1e-12;) ne(r = (n + s) / 2, e) > 0 ? n = r : s = r;
                for (t = s, r = 0, r = 0; ne(r, e) > 1e-20; r += 1);
                for (s = 0, n = r; Math.abs(n - s) > 1e-12;) ne(r = (n + s) / 2, e) > 0 ? s = r : n = r;
                a = n;
                var _, i = 0;
                for (_ = 0; _ <= 1e3; ++_) i += ne(r = t + _ * (a - t) / 1e3, e);
                return 1001 / (i * (a - t))
            }

            function _e(e) {
                var t, a, s, n;
                return t = e, a = (t *= t >= 0 ? 3 : 1.5) >= .5 && t <= 2.5 ? 8 * ((n = t - .5) * n - 2 * n) : 0, (s = 15.811389 + 7.5 * (t += .474) - 17.5 * Math.sqrt(1 + t * t)) <= -60 ? 0 : (t = Math.exp((a + s) * w), t /= .6609193)
            }

            function ie(e) {
                return e < 0 && (e = 0), e *= .001, 13 * Math.atan(.76 * e) + 3.5 * Math.atan(e * e / 56.25)
            }

            function oe(e, t, a, s, n, r, _, i, o, f, h, m) {
                var p, v = l(b.CBANDS + 1),
                    g = i / (m > 15 ? 1152 : 384),
                    S = c(b.HBLKSIZE);
                i /= o;
                var w = 0,
                    M = 0;
                for (p = 0; p < b.CBANDS; p++) {
                    var A;
                    for (I = ie(i * w), v[p] = i * w, A = w; ie(i * A) - I < d && A <= o / 2; A++);
                    for (e[p] = A - w, M = p + 1; w < A;) u(w < b.HBLKSIZE), S[w++] = p;
                    if (w > o / 2) {
                        w = o / 2, ++p;
                        break
                    }
                }
                u(p < b.CBANDS), v[p] = i * w;
                for (var R = 0; R < m; R++) {
                    var B, y, E, T, k;
                    E = f[R], T = f[R + 1], (B = 0 | Math.floor(.5 + h * (E - .5))) < 0 && (B = 0), (y = 0 | Math.floor(.5 + h * (T - .5))) > o / 2 && (y = o / 2), a[R] = (S[B] + S[y]) / 2, t[R] = S[y];
                    var x = g * T;
                    _[R] = (x - v[t[R]]) / (v[t[R] + 1] - v[t[R]]), _[R] < 0 ? _[R] = 0 : _[R] > 1 && (_[R] = 1), k = ie(i * f[R] * h), k = Math.min(k, 15.5) / 15.5, r[R] = Math.pow(10, 1.25 * (1 - Math.cos(Math.PI * k)) - 2.5)
                }
                w = 0;
                for (var P = 0; P < M; P++) {
                    var I, L, V = e[P];
                    I = ie(i * w), L = ie(i * (w + V - 1)), s[P] = .5 * (I + L), I = ie(i * (w - .5)), L = ie(i * (w + V - .5)), n[P] = L - I, w += V
                }
                return M
            }

            function le(e, t, a, s, n, r) {
                var _, i = f([b.CBANDS, b.CBANDS]),
                    o = 0;
                if (r)
                    for (var c = 0; c < t; c++)
                        for (_ = 0; _ < t; _++) {
                            var u = _e(a[c] - a[_]) * s[_];
                            i[c][_] = u * n[c]
                        } else
                            for (_ = 0; _ < t; _++) {
                                var h = 15 + Math.min(21 / a[_], 12),
                                    m = re(h);
                                for (c = 0; c < t; c++) u = m * ne(a[c] - a[_], h) * s[_], i[c][_] = u * n[c]
                            }
                for (c = 0; c < t; c++) {
                    for (_ = 0; _ < t && !(i[c][_] > 0); _++);
                    for (e[c][0] = _, _ = t - 1; _ > 0 && !(i[c][_] > 0); _--);
                    e[c][1] = _, o += e[c][1] - e[c][0] + 1
                }
                var p = l(o),
                    d = 0;
                for (c = 0; c < t; c++)
                    for (_ = e[c][0]; _ <= e[c][1]; _++) p[d++] = i[c][_];
                return p
            }

            function fe(e) {
                var t = ie(e);
                return t = Math.min(t, 15.5) / 15.5, Math.pow(10, 1.25 * (1 - Math.cos(Math.PI * t)) - 2.5)
            }

            function ce(e, t) {
                return e < -.3 && (e = 3410), e /= 1e3, e = Math.max(.1, e), 3.64 * Math.pow(e, -.8) - 6.8 * Math.exp(-.6 * Math.pow(e - 3.4, 2)) + 6 * Math.exp(-.15 * Math.pow(e - 8.7, 2)) + .001 * (.6 + .04 * t) * Math.pow(e, 4)
            }
            this.L3psycho_anal_vbr = function(e, t, a, s, n, r, i, o, h, m) {
                var p = e.internal_flags,
                    d = l(b.HBLKSIZE),
                    v = f([3, b.HBLKSIZE_s]),
                    w = f([2, b.BLKSIZE]),
                    M = f([2, 3, b.BLKSIZE_s]),
                    A = f([4, b.CBANDS]),
                    R = f([4, b.CBANDS]),
                    B = f([4, 3]),
                    y = [
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    E = c(2),
                    T = e.mode == MPEGMode.JOINT_STEREO ? 4 : p.channels_out;
                ! function(e, t, a, s, n, r, _, i, o, c) {
                    for (var h = f([2, 576]), b = e.internal_flags, m = b.channels_out, p = e.mode == MPEGMode.JOINT_STEREO ? 4 : m, d = 0; d < m; d++) {
                        firbuf = t[d];
                        var v = a + 576 - 350 - S + 192;
                        u(J.length == (S - 1) / 2);
                        for (var g = 0; g < 576; g++) {
                            var w, M;
                            w = firbuf[v + g + 10], M = 0;
                            for (var A = 0; A < (S - 1) / 2 - 1; A += 2) w += J[A] * (firbuf[v + g + A] + firbuf[v + g + S - A]), M += J[A + 1] * (firbuf[v + g + A + 1] + firbuf[v + g + S - A - 1]);
                            h[d][g] = w + M
                        }
                        n[s][d].en.assign(b.en[d]), n[s][d].thm.assign(b.thm[d]), p > 2 && (r[s][d].en.assign(b.en[d + 2]), r[s][d].thm.assign(b.thm[d + 2]))
                    }
                    for (d = 0; d < p; d++) {
                        var R = l(12),
                            B = l(12),
                            y = [0, 0, 0, 0],
                            E = h[1 & d],
                            T = 0,
                            k = 3 == d ? b.nsPsy.attackthre_s : b.nsPsy.attackthre,
                            x = 1;
                        if (2 == d)
                            for (g = 0, A = 576; A > 0; ++g, --A) {
                                var P = h[0][g],
                                    I = h[1][g];
                                h[0][g] = P + I, h[1][g] = P - I
                            }
                        for (g = 0; g < 3; g++) B[g] = b.nsPsy.last_en_subshort[d][g + 6], u(b.nsPsy.last_en_subshort[d][g + 4] > 0), R[g] = B[g] / b.nsPsy.last_en_subshort[d][g + 4], y[0] += B[g];
                        for (g = 0; g < 9; g++) {
                            for (var L = T + 64, V = 1; T < L; T++) V < Math.abs(E[T]) && (V = Math.abs(E[T]));
                            b.nsPsy.last_en_subshort[d][g] = B[g + 3] = V, y[1 + g / 3] += V, V > B[g + 3 - 2] ? (u(B[g + 3 - 2] > 0), V /= B[g + 3 - 2]) : B[g + 3 - 2] > 10 * V ? (u(V > 0), V = B[g + 3 - 2] / (10 * V)) : V = 0, R[g + 3] = V
                        }
                        for (g = 0; g < 3; ++g) {
                            var H = B[3 * g + 3] + B[3 * g + 4] + B[3 * g + 5],
                                O = 1;
                            6 * B[3 * g + 5] < H && (O *= .5, 6 * B[3 * g + 4] < H && (O *= .5)), i[d][g] = O
                        }
                        if (e.analysis) {
                            var N = R[0];
                            for (g = 1; g < 12; g++) N < R[g] && (N = R[g]);
                            b.pinfo.ers[s][d] = b.pinfo.ers_save[d], b.pinfo.ers_save[d] = N
                        }
                        for (g = 0; g < 12; g++) 0 == o[d][g / 3] && R[g] > k && (o[d][g / 3] = g % 3 + 1);
                        for (g = 1; g < 4; g++) {
                            var D = y[g - 1],
                                X = y[g];
                            Math.max(D, X) < 4e4 && D < 1.7 * X && X < 1.7 * D && (1 == g && o[d][0] <= o[d][g] && (o[d][0] = 0), o[d][g] = 0)
                        }
                        o[d][0] <= b.nsPsy.lastAttacks[d] && (o[d][0] = 0), 3 != b.nsPsy.lastAttacks[d] && o[d][0] + o[d][1] + o[d][2] + o[d][3] == 0 || (x = 0, 0 != o[d][1] && 0 != o[d][0] && (o[d][1] = 0), 0 != o[d][2] && 0 != o[d][1] && (o[d][2] = 0), 0 != o[d][3] && 0 != o[d][2] && (o[d][3] = 0)), d < 2 ? c[d] = x : 0 == x && (c[0] = c[1] = 0), _[d] = b.tot_ener[d]
                    }
                }(e, t, a, s, n, r, h, B, y, E),
                function(e, t) {
                    var a = e.internal_flags;
                    e.short_blocks != _.short_block_coupled || 0 != t[0] && 0 != t[1] || (t[0] = t[1] = 0);
                    for (var s = 0; s < a.channels_out; s++) e.short_blocks == _.short_block_dispensed && (t[s] = 1), e.short_blocks == _.short_block_forced && (t[s] = 0)
                }(e, E);
                for (var k = 0; k < T; k++) Z(e, t, a, k, s, d, w, P = 1 & k), W(e, s, k, d), 0 != E[P] ? ae(p, d, A[k], R[k], k) : ee(p, k);
                for (E[0] + E[1] == 2 && e.mode == MPEGMode.JOINT_STEREO && se(A, R, p.mld_cb_l, p.ATH.cb_l, e.ATHlower * p.ATH.adjust, e.msfix, p.npart_l), k = 0; k < T; k++) 0 != E[P = 1 & k] && X(p, A[k], R[k], k);
                for (var x = 0; x < 3; x++) {
                    for (k = 0; k < T; ++k) 0 != E[P = 1 & k] ? $(p, k, x) : (Q(e, t, a, k, x, v, M, P), te(e, v, A[k], R[k], k, x));
                    for (E[0] + E[1] == 0 && e.mode == MPEGMode.JOINT_STEREO && se(A, R, p.mld_cb_s, p.ATH.cb_s, e.ATHlower * p.ATH.adjust, e.msfix, p.npart_s), k = 0; k < T; ++k) 0 == E[P = 1 & k] && D(p, A[k], R[k], k, x)
                }
                for (k = 0; k < T; k++) {
                    var P;
                    if (0 == E[P = 1 & k])
                        for (var I = 0; I < b.SBMAX_s; I++) {
                            var L = l(3);
                            for (x = 0; x < 3; x++) {
                                var V = p.thm[k].s[I][x];
                                if (V *= .8, y[k][x] >= 2 || 1 == y[k][x + 1]) {
                                    var H = 0 != x ? x - 1 : 2,
                                        O = q(p.thm[k].s[I][H], V, .36);
                                    V = Math.min(V, O)
                                } else 1 == y[k][x] ? (H = 0 != x ? x - 1 : 2, O = q(p.thm[k].s[I][H], V, .6 * g), V = Math.min(V, O)) : (0 != x && 3 == y[k][x - 1] || 0 == x && 3 == p.nsPsy.lastAttacks[k]) && (H = 2 != x ? x + 1 : 0, O = q(p.thm[k].s[I][H], V, .6 * g), V = Math.min(V, O));
                                V *= B[k][x], L[x] = V
                            }
                            for (x = 0; x < 3; x++) p.thm[k].s[I][x] = L[x]
                        }
                }
                for (k = 0; k < T; k++) p.nsPsy.lastAttacks[k] = y[k][2];
                for (function(e, t, a) {
                        for (var s = e.internal_flags, n = 0; n < s.channels_out; n++) {
                            var r = b.NORM_TYPE;
                            0 != t[n] ? (u(s.blocktype_old[n] != b.START_TYPE), s.blocktype_old[n] == b.SHORT_TYPE && (r = b.STOP_TYPE)) : (r = b.SHORT_TYPE, s.blocktype_old[n] == b.NORM_TYPE && (s.blocktype_old[n] = b.START_TYPE), s.blocktype_old[n] == b.STOP_TYPE && (s.blocktype_old[n] = b.SHORT_TYPE)), a[n] = s.blocktype_old[n], s.blocktype_old[n] = r
                        }
                    }(e, E, m), k = 0; k < T; k++) {
                    var N, F, Y, j;
                    k > 1 ? (N = o, F = -2, Y = b.NORM_TYPE, m[0] != b.SHORT_TYPE && m[1] != b.SHORT_TYPE || (Y = b.SHORT_TYPE), j = r[s][k - 2]) : (N = i, F = 0, Y = m[k], j = n[s][k]), Y == b.SHORT_TYPE ? N[F + k] = C(j, p.masking_lower) : N[F + k] = G(j, p.masking_lower), e.analysis && (p.pinfo.pe[s][k] = N[F + k])
                }
                return 0
            }, this.psymodel_init = function(a) {
                var s, _, i = a.internal_flags,
                    o = !0,
                    f = 13,
                    c = 0,
                    h = 0,
                    m = -8.25,
                    p = -4.5,
                    d = l(b.CBANDS),
                    v = l(b.CBANDS),
                    g = l(b.CBANDS),
                    S = a.out_samplerate;
                switch (a.experimentalZ) {
                    default:
                        case 0:
                        o = !0;
                    break;
                    case 1:
                            o = a.VBR != n.vbr_mtrh && a.VBR != n.vbr_mt;
                        break;
                    case 2:
                            o = !1;
                        break;
                    case 3:
                            f = 8,
                        c = -1.75,
                        h = -.0125,
                        m = -8.25,
                        p = -2.25
                }
                for (i.ms_ener_ratio_old = .25, i.blocktype_old[0] = i.blocktype_old[1] = b.NORM_TYPE, s = 0; s < 4; ++s) {
                    for (var w = 0; w < b.CBANDS; ++w) i.nb_1[s][w] = 1e20, i.nb_2[s][w] = 1e20, i.nb_s1[s][w] = i.nb_s2[s][w] = 1;
                    for (var M = 0; M < b.SBMAX_l; M++) i.en[s].l[M] = 1e20, i.thm[s].l[M] = 1e20;
                    for (w = 0; w < 3; ++w) {
                        for (M = 0; M < b.SBMAX_s; M++) i.en[s].s[M][w] = 1e20, i.thm[s].s[M][w] = 1e20;
                        i.nsPsy.lastAttacks[s] = 0
                    }
                    for (w = 0; w < 9; w++) i.nsPsy.last_en_subshort[s][w] = 10
                }
                for (i.loudness_sq_save[0] = i.loudness_sq_save[1] = 0, i.npart_l = oe(i.numlines_l, i.bo_l, i.bm_l, d, v, i.mld_l, i.PSY.bo_l_weight, S, b.BLKSIZE, i.scalefac_band.l, b.BLKSIZE / 1152, b.SBMAX_l), u(i.npart_l < b.CBANDS), s = 0; s < i.npart_l; s++) {
                    var A = c;
                    d[s] >= f && (A = h * (d[s] - f) / (24 - f) + c * (24 - d[s]) / (24 - f)), g[s] = Math.pow(10, A / 10), i.numlines_l[s] > 0 ? i.rnumlines_l[s] = 1 / i.numlines_l[s] : i.rnumlines_l[s] = 0
                }
                for (i.s3_ll = le(i.s3ind, i.npart_l, d, v, g, o), w = 0, s = 0; s < i.npart_l; s++) {
                    I = r.MAX_VALUE;
                    for (var R = 0; R < i.numlines_l[s]; R++, w++) {
                        var P = S * w / (1e3 * b.BLKSIZE);
                        L = this.ATHformula(1e3 * P, a) - 20, L = Math.pow(10, .1 * L), I > (L *= i.numlines_l[s]) && (I = L)
                    }
                    i.ATH.cb_l[s] = I, (I = 20 * d[s] / 10 - 20) > 6 && (I = 100), I < -15 && (I = -15), I -= 8, i.minval_l[s] = Math.pow(10, I / 10) * i.numlines_l[s]
                }
                for (i.npart_s = oe(i.numlines_s, i.bo_s, i.bm_s, d, v, i.mld_s, i.PSY.bo_s_weight, S, b.BLKSIZE_s, i.scalefac_band.s, b.BLKSIZE_s / 384, b.SBMAX_s), u(i.npart_s < b.CBANDS), w = 0, s = 0; s < i.npart_s; s++) {
                    var I;
                    for (A = m, d[s] >= f && (A = p * (d[s] - f) / (24 - f) + m * (24 - d[s]) / (24 - f)), g[s] = Math.pow(10, A / 10), I = r.MAX_VALUE, R = 0; R < i.numlines_s[s]; R++, w++) {
                        var L;
                        P = S * w / (1e3 * b.BLKSIZE_s), L = this.ATHformula(1e3 * P, a) - 20, L = Math.pow(10, .1 * L), I > (L *= i.numlines_s[s]) && (I = L)
                    }
                    i.ATH.cb_s[s] = I, I = 7 * d[s] / 12 - 7, d[s] > 12 && (I *= 1 + 3.1 * Math.log(1 + I)), d[s] < 12 && (I *= 1 + 2.3 * Math.log(1 - I)), I < -15 && (I = -15), I -= 8, i.minval_s[s] = Math.pow(10, I / 10) * i.numlines_s[s]
                }
                i.s3_ss = le(i.s3ind_s, i.npart_s, d, v, g, o), B = Math.pow(10, (T + 1) / 16), y = Math.pow(10, (k + 1) / 16), E = Math.pow(10, x / 10), e.init_fft(i), i.decay = Math.exp(-1 * t / (.01 * S / 192)), _ = 3.5, 0 != (2 & a.exp_nspsytune) && (_ = 1), Math.abs(a.msfix) > 0 && (_ = a.msfix), a.msfix = _;
                for (var V = 0; V < i.npart_l; V++) i.s3ind[V][1] > i.npart_l - 1 && (i.s3ind[V][1] = i.npart_l - 1);
                var H = 576 * i.mode_gr / S;
                if (i.ATH.decay = Math.pow(10, -1.2 * H), i.ATH.adjust = .01, i.ATH.adjustLimit = 1, u(i.bo_l[b.SBMAX_l - 1] <= i.npart_l), u(i.bo_s[b.SBMAX_s - 1] <= i.npart_s), -1 != a.ATHtype) {
                    var O = a.out_samplerate / b.BLKSIZE,
                        N = 0;
                    for (P = 0, s = 0; s < b.BLKSIZE / 2; ++s) P += O, i.ATH.eql_w[s] = 1 / Math.pow(10, this.ATHformula(P, a) / 10), N += i.ATH.eql_w[s];
                    for (N = 1 / N, s = b.BLKSIZE / 2; --s >= 0;) i.ATH.eql_w[s] *= N
                }
                for (V = w = 0; V < i.npart_s; ++V)
                    for (s = 0; s < i.numlines_s[V]; ++s) ++w;
                for (u(129 == w), V = w = 0; V < i.npart_l; ++V)
                    for (s = 0; s < i.numlines_l[V]; ++s) ++w;
                for (u(513 == w), w = 0, s = 0; s < i.npart_l; s++) P = S * (w + i.numlines_l[s] / 2) / (1 * b.BLKSIZE), i.mld_cb_l[s] = fe(P), w += i.numlines_l[s];
                for (; s < b.CBANDS; ++s) i.mld_cb_l[s] = 1;
                for (w = 0, s = 0; s < i.npart_s; s++) P = S * (w + i.numlines_s[s] / 2) / (1 * b.BLKSIZE_s), i.mld_cb_s[s] = fe(P), w += i.numlines_s[s];
                for (; s < b.CBANDS; ++s) i.mld_cb_s[s] = 1;
                return 0
            }, this.ATHformula = function(e, t) {
                var a;
                switch (t.ATHtype) {
                    case 0:
                        a = ce(e, 9);
                        break;
                    case 1:
                        a = ce(e, -1);
                        break;
                    case 2:
                        a = ce(e, 0);
                        break;
                    case 3:
                        a = ce(e, 1) + 6;
                        break;
                    case 4:
                        a = ce(e, t.ATHcurve);
                        break;
                    default:
                        a = ce(e, 0)
                }
                return a
            }
        }
    },
    JpUa: function(e, t, a) {
        var s = a("Agby"),
            n = (s.System, s.VbrMode, s.Float, s.ShortBlock, s.Util, s.Arrays, s.new_array_n, s.new_byte, s.new_double, s.new_float, s.new_float_n, s.new_int),
            r = (s.new_int_n, s.assert, a("87Ww"));
        e.exports = function() {
            this.tt = [
                [null, null],
                [null, null]
            ], this.main_data_begin = 0, this.private_bits = 0, this.resvDrain_pre = 0, this.resvDrain_post = 0, this.scfsi = [n(4), n(4)];
            for (var e = 0; e < 2; e++)
                for (var t = 0; t < 2; t++) this.tt[e][t] = new r
        }
    },
    KzWn: function(e, t, a) {
        "use strict";
        a.r(t);
        a("sFw1"), a("Faw5");
        var s, n = a("2z9j").Mp3Encoder;
        self.onmessage = function(e) {
            switch (e.data.command) {
                case "encode":
                    s && s.encode(e.data.buffers);
                    break;
                case "done":
                    s && s.encodeFinalFrame();
                    break;
                case "init":
                    s = new class {
                        constructor(e) {
                            this.numberOfChannels = e.numberOfChannels || 1, this.originalSampleRate = e.originalSampleRate, this.bitRate = e.bitRate || r, this._codec = new n(this.numberOfChannels, this.originalSampleRate, this.bitRate)
                        }
                        _convertBuffer(e) {
                            for (var t = new Int16Array(e[0].length), a = 0; a < t.length; a++) {
                                var s = e[0][a] / 1.2 * 32767;
                                t[a] = s < 0 ? Math.max(s, -32768) : Math.min(s, 32767)
                            }
                            return t
                        }
                        encode(e) {
                            var t = this._convertBuffer(e),
                                a = this._codec.encodeBuffer(t);
                            self.postMessage({
                                type: "data",
                                buffer: new Int8Array(a)
                            })
                        }
                        encodeFinalFrame() {
                            var e = this._codec.flush();
                            self.postMessage({
                                type: "finish",
                                buffer: new Int8Array(e)
                            }), self.close()
                        }
                    }(e.data)
            }
        };
        var r = 128
    },
    LyF0: function(e, t, a) {
        var s = a("Agby"),
            n = s.System,
            r = (s.VbrMode, s.Float, s.ShortBlock, s.Util, s.Arrays);
        s.new_array_n, s.new_byte, s.new_double, s.new_float, s.new_float_n, s.new_int, s.new_int_n, s.assert;

        function _() {
            var e = 64.82,
                t = (_.YULE_ORDER, .95),
                a = (_.MAX_SAMP_FREQ, _.RMS_WINDOW_TIME_NUMERATOR),
                s = _.RMS_WINDOW_TIME_DENOMINATOR,
                i = (_.MAX_SAMPLES_PER_WINDOW, [
                    [.038575994352, -3.84664617118067, -.02160367184185, 7.81501653005538, -.00123395316851, -11.34170355132042, -9291677959e-14, 13.05504219327545, -.01655260341619, -12.28759895145294, .02161526843274, 9.4829380631979, -.02074045215285, -5.87257861775999, .00594298065125, 2.75465861874613, .00306428023191, -.86984376593551, .00012025322027, .13919314567432, .00288463683916],
                    [.0541865640643, -3.47845948550071, -.02911007808948, 6.36317777566148, -.00848709379851, -8.54751527471874, -.00851165645469, 9.4769360780128, -.00834990904936, -8.81498681370155, .02245293253339, 6.85401540936998, -.02596338512915, -4.39470996079559, .01624864962975, 2.19611684890774, -.00240879051584, -.75104302451432, .00674613682247, .13149317958808, -.00187763777362],
                    [.15457299681924, -2.37898834973084, -.09331049056315, 2.84868151156327, -.06247880153653, -2.64577170229825, .02163541888798, 2.23697657451713, -.05588393329856, -1.67148153367602, .04781476674921, 1.00595954808547, .00222312597743, -.45953458054983, .03174092540049, .16378164858596, -.01390589421898, -.05032077717131, .00651420667831, .0234789740702, -.00881362733839],
                    [.30296907319327, -1.61273165137247, -.22613988682123, 1.0797749225997, -.08587323730772, -.2565625775407, .03282930172664, -.1627671912044, -.00915702933434, -.22638893773906, -.02364141202522, .39120800788284, -.00584456039913, -.22138138954925, .06276101321749, .04500235387352, -828086748e-14, .02005851806501, .00205861885564, .00302439095741, -.02950134983287],
                    [.33642304856132, -1.49858979367799, -.2557224142557, .87350271418188, -.11828570177555, .12205022308084, .11921148675203, -.80774944671438, -.07834489609479, .47854794562326, -.0046997791438, -.12453458140019, -.0058950022444, -.04067510197014, .05724228140351, .08333755284107, .00832043980773, -.04237348025746, -.0163538138454, .02977207319925, -.0176017656815],
                    [.4491525660845, -.62820619233671, -.14351757464547, .29661783706366, -.22784394429749, -.372563729424, -.01419140100551, .00213767857124, .04078262797139, -.42029820170918, -.12398163381748, .22199650564824, .04097565135648, .00613424350682, .10478503600251, .06747620744683, -.01863887810927, .05784820375801, -.03193428438915, .03222754072173, .00541907748707],
                    [.56619470757641, -1.04800335126349, -.75464456939302, .29156311971249, .1624213774223, -.26806001042947, .16744243493672, .00819999645858, -.18901604199609, .45054734505008, .3093178284183, -.33032403314006, -.27562961986224, .0673936833311, .00647310677246, -.04784254229033, .08647503780351, .01639907836189, -.0378898455484, .01807364323573, -.00588215443421],
                    [.58100494960553, -.51035327095184, -.53174909058578, -.31863563325245, -.14289799034253, -.20256413484477, .17520704835522, .1472815413433, .02377945217615, .38952639978999, .15558449135573, -.23313271880868, -.25344790059353, -.05246019024463, .01628462406333, -.02505961724053, .06920467763959, .02442357316099, -.03721611395801, .01818801111503, -.00749618797172],
                    [.53648789255105, -.2504987195602, -.42163034350696, -.43193942311114, -.00275953611929, -.03424681017675, .04267842219415, -.04678328784242, -.10214864179676, .26408300200955, .14590772289388, .15113130533216, -.02459864859345, -.17556493366449, -.11202315195388, -.18823009262115, -.04060034127, .05477720428674, .0478866554818, .0470440968812, -.02217936801134]
                ]),
                o = [
                    [.98621192462708, -1.97223372919527, -1.97242384925416, .97261396931306, .98621192462708],
                    [.98500175787242, -1.96977855582618, -1.97000351574484, .9702284756635, .98500175787242],
                    [.97938932735214, -1.95835380975398, -1.95877865470428, .95920349965459, .97938932735214],
                    [.97531843204928, -1.95002759149878, -1.95063686409857, .95124613669835, .97531843204928],
                    [.97316523498161, -1.94561023566527, -1.94633046996323, .94705070426118, .97316523498161],
                    [.96454515552826, -1.92783286977036, -1.92909031105652, .93034775234268, .96454515552826],
                    [.96009142950541, -1.91858953033784, -1.92018285901082, .92177618768381, .96009142950541],
                    [.95856916599601, -1.9154210807478, -1.91713833199203, .91885558323625, .95856916599601],
                    [.94597685600279, -1.88903307939452, -1.89195371200558, .89487434461664, .94597685600279]
                ];

            function l(e, t, a, s, n, r) {
                for (; 0 != n--;) a[s] = 1e-10 + e[t + 0] * r[0] - a[s - 1] * r[1] + e[t - 1] * r[2] - a[s - 2] * r[3] + e[t - 2] * r[4] - a[s - 3] * r[5] + e[t - 3] * r[6] - a[s - 4] * r[7] + e[t - 4] * r[8] - a[s - 5] * r[9] + e[t - 5] * r[10] - a[s - 6] * r[11] + e[t - 6] * r[12] - a[s - 7] * r[13] + e[t - 7] * r[14] - a[s - 8] * r[15] + e[t - 8] * r[16] - a[s - 9] * r[17] + e[t - 9] * r[18] - a[s - 10] * r[19] + e[t - 10] * r[20], ++s, ++t
            }

            function f(e, t, a, s, n, r) {
                for (; 0 != n--;) a[s] = e[t + 0] * r[0] - a[s - 1] * r[1] + e[t - 1] * r[2] - a[s - 2] * r[3] + e[t - 2] * r[4], ++s, ++t
            }

            function c(e) {
                return e * e
            }
            this.InitGainAnalysis = function(e, t) {
                return function(e, t) {
                    for (var n = 0; n < MAX_ORDER; n++) e.linprebuf[n] = e.lstepbuf[n] = e.loutbuf[n] = e.rinprebuf[n] = e.rstepbuf[n] = e.routbuf[n] = 0;
                    switch (0 | t) {
                        case 48e3:
                            e.reqindex = 0;
                            break;
                        case 44100:
                            e.reqindex = 1;
                            break;
                        case 32e3:
                            e.reqindex = 2;
                            break;
                        case 24e3:
                            e.reqindex = 3;
                            break;
                        case 22050:
                            e.reqindex = 4;
                            break;
                        case 16e3:
                            e.reqindex = 5;
                            break;
                        case 12e3:
                            e.reqindex = 6;
                            break;
                        case 11025:
                            e.reqindex = 7;
                            break;
                        case 8e3:
                            e.reqindex = 8;
                            break;
                        default:
                            return INIT_GAIN_ANALYSIS_ERROR
                    }
                    return e.sampleWindow = 0 | (t * a + s - 1) / s, e.lsum = 0, e.rsum = 0, e.totsamp = 0, r.ill(e.A, 0), INIT_GAIN_ANALYSIS_OK
                }(e, t) != INIT_GAIN_ANALYSIS_OK ? INIT_GAIN_ANALYSIS_ERROR : (e.linpre = MAX_ORDER, e.rinpre = MAX_ORDER, e.lstep = MAX_ORDER, e.rstep = MAX_ORDER, e.lout = MAX_ORDER, e.rout = MAX_ORDER, r.fill(e.B, 0), INIT_GAIN_ANALYSIS_OK)
            }, this.AnalyzeSamples = function(e, t, a, s, r, u, h) {
                var b, m, p, d, v, g, S;
                if (0 == u) return GAIN_ANALYSIS_OK;
                switch (S = 0, v = u, h) {
                    case 1:
                        s = t, r = a;
                        break;
                    case 2:
                        break;
                    default:
                        return GAIN_ANALYSIS_ERROR
                }
                for (u < MAX_ORDER ? (n.arraycopy(t, a, e.linprebuf, MAX_ORDER, u), n.arraycopy(s, r, e.rinprebuf, MAX_ORDER, u)) : (n.arraycopy(t, a, e.linprebuf, MAX_ORDER, MAX_ORDER), n.arraycopy(s, r, e.rinprebuf, MAX_ORDER, MAX_ORDER)); v > 0;) {
                    g = v > e.sampleWindow - e.totsamp ? e.sampleWindow - e.totsamp : v, S < MAX_ORDER ? (b = e.linpre + S, m = e.linprebuf, p = e.rinpre + S, d = e.rinprebuf, g > MAX_ORDER - S && (g = MAX_ORDER - S)) : (b = a + S, m = t, p = r + S, d = s), l(m, b, e.lstepbuf, e.lstep + e.totsamp, g, i[e.reqindex]), l(d, p, e.rstepbuf, e.rstep + e.totsamp, g, i[e.reqindex]), f(e.lstepbuf, e.lstep + e.totsamp, e.loutbuf, e.lout + e.totsamp, g, o[e.reqindex]), f(e.rstepbuf, e.rstep + e.totsamp, e.routbuf, e.rout + e.totsamp, g, o[e.reqindex]), b = e.lout + e.totsamp, m = e.loutbuf, p = e.rout + e.totsamp, d = e.routbuf;
                    for (var w = g % 8; 0 != w--;) e.lsum += c(m[b++]), e.rsum += c(d[p++]);
                    for (w = g / 8; 0 != w--;) e.lsum += c(m[b + 0]) + c(m[b + 1]) + c(m[b + 2]) + c(m[b + 3]) + c(m[b + 4]) + c(m[b + 5]) + c(m[b + 6]) + c(m[b + 7]), b += 8, e.rsum += c(d[p + 0]) + c(d[p + 1]) + c(d[p + 2]) + c(d[p + 3]) + c(d[p + 4]) + c(d[p + 5]) + c(d[p + 6]) + c(d[p + 7]), p += 8;
                    if (v -= g, S += g, e.totsamp += g, e.totsamp == e.sampleWindow) {
                        var M = 10 * _.STEPS_per_dB * Math.log10((e.lsum + e.rsum) / e.totsamp * .5 + 1e-37),
                            A = M <= 0 ? 0 : 0 | M;
                        A >= e.A.length && (A = e.A.length - 1), e.A[A]++, e.lsum = e.rsum = 0, n.arraycopy(e.loutbuf, e.totsamp, e.loutbuf, 0, MAX_ORDER), n.arraycopy(e.routbuf, e.totsamp, e.routbuf, 0, MAX_ORDER), n.arraycopy(e.lstepbuf, e.totsamp, e.lstepbuf, 0, MAX_ORDER), n.arraycopy(e.rstepbuf, e.totsamp, e.rstepbuf, 0, MAX_ORDER), e.totsamp = 0
                    }
                    if (e.totsamp > e.sampleWindow) return GAIN_ANALYSIS_ERROR
                }
                return u < MAX_ORDER ? (n.arraycopy(e.linprebuf, u, e.linprebuf, 0, MAX_ORDER - u), n.arraycopy(e.rinprebuf, u, e.rinprebuf, 0, MAX_ORDER - u), n.arraycopy(t, a, e.linprebuf, MAX_ORDER - u, u), n.arraycopy(s, r, e.rinprebuf, MAX_ORDER - u, u)) : (n.arraycopy(t, a + u - MAX_ORDER, e.linprebuf, 0, MAX_ORDER), n.arraycopy(s, r + u - MAX_ORDER, e.rinprebuf, 0, MAX_ORDER)), GAIN_ANALYSIS_OK
            }, this.GetTitleGain = function(a) {
                for (var s = function(a, s) {
                        var n, r = 0;
                        for (n = 0; n < s; n++) r += a[n];
                        if (0 == r) return GAIN_NOT_ENOUGH_SAMPLES;
                        var i = 0 | Math.ceil(r * (1 - t));
                        for (n = s; n-- > 0 && !((i -= a[n]) <= 0););
                        return e - n / _.STEPS_per_dB
                    }(a.A, a.A.length), n = 0; n < a.A.length; n++) a.B[n] += a.A[n], a.A[n] = 0;
                for (n = 0; n < MAX_ORDER; n++) a.linprebuf[n] = a.lstepbuf[n] = a.loutbuf[n] = a.rinprebuf[n] = a.rstepbuf[n] = a.routbuf[n] = 0;
                return a.totsamp = 0, a.lsum = a.rsum = 0, s
            }
        }
        _.STEPS_per_dB = 100, _.MAX_dB = 120, _.GAIN_NOT_ENOUGH_SAMPLES = -24601, _.GAIN_ANALYSIS_ERROR = 0, _.GAIN_ANALYSIS_OK = 1, _.INIT_GAIN_ANALYSIS_ERROR = 0, _.INIT_GAIN_ANALYSIS_OK = 1, _.YULE_ORDER = 10, _.MAX_ORDER = _.YULE_ORDER, _.MAX_SAMP_FREQ = 48e3, _.RMS_WINDOW_TIME_NUMERATOR = 1, _.RMS_WINDOW_TIME_DENOMINATOR = 20, _.MAX_SAMPLES_PER_WINDOW = _.MAX_SAMP_FREQ * _.RMS_WINDOW_TIME_NUMERATOR / _.RMS_WINDOW_TIME_DENOMINATOR + 1, e.exports = _
    },
    OWcs: function(e, t, a) {
        var s = a("Agby"),
            n = (s.System, s.VbrMode);
        s.Float, s.ShortBlock, s.Util, s.Arrays, s.new_array_n, s.new_byte, s.new_double, s.new_float, s.new_float_n, s.new_int, s.new_int_n, s.assert;
        e.exports = function() {
            function e(e, t, a, s, n, r, _, i, o, l, f, c, u, h, b) {
                this.vbr_q = e, this.quant_comp = t, this.quant_comp_s = a, this.expY = s, this.st_lrm = n, this.st_s = r, this.masking_adj = _, this.masking_adj_short = i, this.ath_lower = o, this.ath_curve = l, this.ath_sensitivity = f, this.interch = c, this.safejoint = u, this.sfb21mod = h, this.msfix = b
            }

            function t(e, t, a, s, n, r, _, i, o, l, f, c, u, h) {
                this.quant_comp = t, this.quant_comp_s = a, this.safejoint = s, this.nsmsfix = n, this.st_lrm = r, this.st_s = _, this.nsbass = i, this.scale = o, this.masking_adj = l, this.ath_lower = f, this.ath_curve = c, this.interch = u, this.sfscale = h
            }
            var a;
            this.setModules = function(e) {
                a = e
            };
            var s = [new e(0, 9, 9, 0, 5.2, 125, -4.2, -6.3, 4.8, 1, 0, 0, 2, 21, .97), new e(1, 9, 9, 0, 5.3, 125, -3.6, -5.6, 4.5, 1.5, 0, 0, 2, 21, 1.35), new e(2, 9, 9, 0, 5.6, 125, -2.2, -3.5, 2.8, 2, 0, 0, 2, 21, 1.49), new e(3, 9, 9, 1, 5.8, 130, -1.8, -2.8, 2.6, 3, -4, 0, 2, 20, 1.64), new e(4, 9, 9, 1, 6, 135, -.7, -1.1, 1.1, 3.5, -8, 0, 2, 0, 1.79), new e(5, 9, 9, 1, 6.4, 140, .5, .4, -7.5, 4, -12, 2e-4, 0, 0, 1.95), new e(6, 9, 9, 1, 6.6, 145, .67, .65, -14.7, 6.5, -19, 4e-4, 0, 0, 2.3), new e(7, 9, 9, 1, 6.6, 145, .8, .75, -19.7, 8, -22, 6e-4, 0, 0, 2.7), new e(8, 9, 9, 1, 6.6, 145, 1.2, 1.15, -27.5, 10, -23, 7e-4, 0, 0, 0), new e(9, 9, 9, 1, 6.6, 145, 1.6, 1.6, -36, 11, -25, 8e-4, 0, 0, 0), new e(10, 9, 9, 1, 6.6, 145, 2, 2, -36, 12, -25, 8e-4, 0, 0, 0)],
                r = [new e(0, 9, 9, 0, 4.2, 25, -7, -4, 7.5, 1, 0, 0, 2, 26, .97), new e(1, 9, 9, 0, 4.2, 25, -5.6, -3.6, 4.5, 1.5, 0, 0, 2, 21, 1.35), new e(2, 9, 9, 0, 4.2, 25, -4.4, -1.8, 2, 2, 0, 0, 2, 18, 1.49), new e(3, 9, 9, 1, 4.2, 25, -3.4, -1.25, 1.1, 3, -4, 0, 2, 15, 1.64), new e(4, 9, 9, 1, 4.2, 25, -2.2, .1, 0, 3.5, -8, 0, 2, 0, 1.79), new e(5, 9, 9, 1, 4.2, 25, -1, 1.65, -7.7, 4, -12, 2e-4, 0, 0, 1.95), new e(6, 9, 9, 1, 4.2, 25, -0, 2.47, -7.7, 6.5, -19, 4e-4, 0, 0, 2), new e(7, 9, 9, 1, 4.2, 25, .5, 2, -14.5, 8, -22, 6e-4, 0, 0, 2), new e(8, 9, 9, 1, 4.2, 25, 1, 2.4, -22, 10, -23, 7e-4, 0, 0, 2), new e(9, 9, 9, 1, 4.2, 25, 1.5, 2.95, -30, 11, -25, 8e-4, 0, 0, 2), new e(10, 9, 9, 1, 4.2, 25, 2, 2.95, -36, 12, -30, 8e-4, 0, 0, 2)];

            function _(e, t, a) {
                var _ = e.VBR == n.vbr_rh ? s : r,
                    i = e.VBR_q_frac,
                    o = _[t],
                    l = _[t + 1],
                    f = o;
                o.st_lrm = o.st_lrm + i * (l.st_lrm - o.st_lrm), o.st_s = o.st_s + i * (l.st_s - o.st_s), o.masking_adj = o.masking_adj + i * (l.masking_adj - o.masking_adj), o.masking_adj_short = o.masking_adj_short + i * (l.masking_adj_short - o.masking_adj_short), o.ath_lower = o.ath_lower + i * (l.ath_lower - o.ath_lower), o.ath_curve = o.ath_curve + i * (l.ath_curve - o.ath_curve), o.ath_sensitivity = o.ath_sensitivity + i * (l.ath_sensitivity - o.ath_sensitivity), o.interch = o.interch + i * (l.interch - o.interch), o.msfix = o.msfix + i * (l.msfix - o.msfix),
                    function(e, t) {
                        0 > t && (-1, t = 0), 9 < t && (-1, t = 9), e.VBR_q = t, e.VBR_q_frac = 0
                    }(e, f.vbr_q), 0 != a ? e.quant_comp = f.quant_comp : Math.abs(e.quant_comp - -1) > 0 || (e.quant_comp = f.quant_comp), 0 != a ? e.quant_comp_short = f.quant_comp_s : Math.abs(e.quant_comp_short - -1) > 0 || (e.quant_comp_short = f.quant_comp_s), 0 != f.expY && (e.experimentalY = 0 != f.expY), 0 != a ? e.internal_flags.nsPsy.attackthre = f.st_lrm : Math.abs(e.internal_flags.nsPsy.attackthre - -1) > 0 || (e.internal_flags.nsPsy.attackthre = f.st_lrm), 0 != a ? e.internal_flags.nsPsy.attackthre_s = f.st_s : Math.abs(e.internal_flags.nsPsy.attackthre_s - -1) > 0 || (e.internal_flags.nsPsy.attackthre_s = f.st_s), 0 != a ? e.maskingadjust = f.masking_adj : Math.abs(e.maskingadjust - 0) > 0 || (e.maskingadjust = f.masking_adj), 0 != a ? e.maskingadjust_short = f.masking_adj_short : Math.abs(e.maskingadjust_short - 0) > 0 || (e.maskingadjust_short = f.masking_adj_short), 0 != a ? e.ATHlower = -f.ath_lower / 10 : Math.abs(10 * -e.ATHlower - 0) > 0 || (e.ATHlower = -f.ath_lower / 10), 0 != a ? e.ATHcurve = f.ath_curve : Math.abs(e.ATHcurve - -1) > 0 || (e.ATHcurve = f.ath_curve), 0 != a ? e.athaa_sensitivity = f.ath_sensitivity : Math.abs(e.athaa_sensitivity - -1) > 0 || (e.athaa_sensitivity = f.ath_sensitivity), f.interch > 0 && (0 != a ? e.interChRatio = f.interch : Math.abs(e.interChRatio - -1) > 0 || (e.interChRatio = f.interch)), f.safejoint > 0 && (e.exp_nspsytune = e.exp_nspsytune | f.safejoint), f.sfb21mod > 0 && (e.exp_nspsytune = e.exp_nspsytune | f.sfb21mod << 20), 0 != a ? e.msfix = f.msfix : Math.abs(e.msfix - -1) > 0 || (e.msfix = f.msfix), 0 == a && (e.VBR_q = t, e.VBR_q_frac = i)
            }
            var i = [new t(8, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -30, 11, .0012, 1), new t(16, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -25, 11, .001, 1), new t(24, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -20, 11, .001, 1), new t(32, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -15, 11, .001, 1), new t(40, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -10, 11, 9e-4, 1), new t(48, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -10, 11, 9e-4, 1), new t(56, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -6, 11, 8e-4, 1), new t(64, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -2, 11, 8e-4, 1), new t(80, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, 0, 8, 7e-4, 1), new t(96, 9, 9, 0, 2.5, 6.6, 145, 0, .95, 0, 1, 5.5, 6e-4, 1), new t(112, 9, 9, 0, 2.25, 6.6, 145, 0, .95, 0, 2, 4.5, 5e-4, 1), new t(128, 9, 9, 0, 1.95, 6.4, 140, 0, .95, 0, 3, 4, 2e-4, 1), new t(160, 9, 9, 1, 1.79, 6, 135, 0, .95, -2, 5, 3.5, 0, 1), new t(192, 9, 9, 1, 1.49, 5.6, 125, 0, .97, -4, 7, 3, 0, 0), new t(224, 9, 9, 1, 1.25, 5.2, 125, 0, .98, -6, 9, 2, 0, 0), new t(256, 9, 9, 1, .97, 5.2, 125, 0, 1, -8, 10, 1, 0, 0), new t(320, 9, 9, 1, .9, 5.2, 125, 0, 1, -10, 12, 0, 0, 0)];

            function o(e, t, s) {
                var r = t,
                    _ = a.nearestBitrateFullIndex(t);
                if (e.VBR = n.vbr_abr, e.VBR_mean_bitrate_kbps = r, e.VBR_mean_bitrate_kbps = Math.min(e.VBR_mean_bitrate_kbps, 320), e.VBR_mean_bitrate_kbps = Math.max(e.VBR_mean_bitrate_kbps, 8), e.brate = e.VBR_mean_bitrate_kbps, e.VBR_mean_bitrate_kbps > 320 && (e.disable_reservoir = !0), i[_].safejoint > 0 && (e.exp_nspsytune = 2 | e.exp_nspsytune), i[_].sfscale > 0 && (e.internal_flags.noise_shaping = 2), Math.abs(i[_].nsbass) > 0) {
                    var o = int(4 * i[_].nsbass);
                    o < 0 && (o += 64), e.exp_nspsytune = e.exp_nspsytune | o << 2
                }
                return 0 != s ? e.quant_comp = i[_].quant_comp : Math.abs(e.quant_comp - -1) > 0 || (e.quant_comp = i[_].quant_comp), 0 != s ? e.quant_comp_short = i[_].quant_comp_s : Math.abs(e.quant_comp_short - -1) > 0 || (e.quant_comp_short = i[_].quant_comp_s), 0 != s ? e.msfix = i[_].nsmsfix : Math.abs(e.msfix - -1) > 0 || (e.msfix = i[_].nsmsfix), 0 != s ? e.internal_flags.nsPsy.attackthre = i[_].st_lrm : Math.abs(e.internal_flags.nsPsy.attackthre - -1) > 0 || (e.internal_flags.nsPsy.attackthre = i[_].st_lrm), 0 != s ? e.internal_flags.nsPsy.attackthre_s = i[_].st_s : Math.abs(e.internal_flags.nsPsy.attackthre_s - -1) > 0 || (e.internal_flags.nsPsy.attackthre_s = i[_].st_s), 0 != s ? e.scale = i[_].scale : Math.abs(e.scale - -1) > 0 || (e.scale = i[_].scale), 0 != s ? e.maskingadjust = i[_].masking_adj : Math.abs(e.maskingadjust - 0) > 0 || (e.maskingadjust = i[_].masking_adj), i[_].masking_adj > 0 ? 0 != s ? e.maskingadjust_short = .9 * i[_].masking_adj : Math.abs(e.maskingadjust_short - 0) > 0 || (e.maskingadjust_short = .9 * i[_].masking_adj) : 0 != s ? e.maskingadjust_short = 1.1 * i[_].masking_adj : Math.abs(e.maskingadjust_short - 0) > 0 || (e.maskingadjust_short = 1.1 * i[_].masking_adj), 0 != s ? e.ATHlower = -i[_].ath_lower / 10 : Math.abs(10 * -e.ATHlower - 0) > 0 || (e.ATHlower = -i[_].ath_lower / 10), 0 != s ? e.ATHcurve = i[_].ath_curve : Math.abs(e.ATHcurve - -1) > 0 || (e.ATHcurve = i[_].ath_curve), 0 != s ? e.interChRatio = i[_].interch : Math.abs(e.interChRatio - -1) > 0 || (e.interChRatio = i[_].interch), t
            }
            this.apply_preset = function(e, t, a) {
                switch (t) {
                    case Lame.R3MIX:
                        t = Lame.V3, e.VBR = n.vbr_mtrh;
                        break;
                    case Lame.MEDIUM:
                        t = Lame.V4, e.VBR = n.vbr_rh;
                        break;
                    case Lame.MEDIUM_FAST:
                        t = Lame.V4, e.VBR = n.vbr_mtrh;
                        break;
                    case Lame.STANDARD:
                        t = Lame.V2, e.VBR = n.vbr_rh;
                        break;
                    case Lame.STANDARD_FAST:
                        t = Lame.V2, e.VBR = n.vbr_mtrh;
                        break;
                    case Lame.EXTREME:
                        t = Lame.V0, e.VBR = n.vbr_rh;
                        break;
                    case Lame.EXTREME_FAST:
                        t = Lame.V0, e.VBR = n.vbr_mtrh;
                        break;
                    case Lame.INSANE:
                        return t = 320, e.preset = t, o(e, t, a), e.VBR = n.vbr_off, t
                }
                switch (e.preset = t, t) {
                    case Lame.V9:
                        return _(e, 9, a), t;
                    case Lame.V8:
                        return _(e, 8, a), t;
                    case Lame.V7:
                        return _(e, 7, a), t;
                    case Lame.V6:
                        return _(e, 6, a), t;
                    case Lame.V5:
                        return _(e, 5, a), t;
                    case Lame.V4:
                        return _(e, 4, a), t;
                    case Lame.V3:
                        return _(e, 3, a), t;
                    case Lame.V2:
                        return _(e, 2, a), t;
                    case Lame.V1:
                        return _(e, 1, a), t;
                    case Lame.V0:
                        return _(e, 0, a), t
                }
                return 8 <= t && t <= 320 ? o(e, t, a) : (e.preset = 0, t)
            }
        }
    },
    S14o: function(e, t, a) {
        var s = a("Agby"),
            n = s.System,
            r = s.VbrMode,
            _ = (s.Float, s.ShortBlock, s.Util, s.Arrays, s.new_array_n),
            i = (s.new_byte, s.new_double, s.new_float),
            o = s.new_float_n,
            l = s.new_int,
            f = (s.new_int_n, s.assert);

        function c() {
            var e = a("8+Kk"),
                t = a("8m0O"),
                s = c.FFTOFFSET,
                u = c.MPG_MD_MS_LR,
                h = null;
            this.psy = null;
            var b = null,
                m = null,
                p = null;
            this.setModules = function(e, t, a, s) {
                h = e, this.psy = t, b = t, m = s, p = a
            };
            var d = new e;
            this.lame_encode_mp3_frame = function(e, a, v, g, S, w) {
                var M, A = _([2, 2]);
                A[0][0] = new t, A[0][1] = new t, A[1][0] = new t, A[1][1] = new t;
                var R, B = _([2, 2]);
                B[0][0] = new t, B[0][1] = new t, B[1][0] = new t, B[1][1] = new t;
                var y, E, T, k = [null, null],
                    x = e.internal_flags,
                    P = o([2, 4]),
                    I = [.5, .5],
                    L = [
                        [0, 0],
                        [0, 0]
                    ],
                    V = [
                        [0, 0],
                        [0, 0]
                    ];
                if (k[0] = a, k[1] = v, 0 == x.lame_encode_frame_init && function(e, t) {
                        var a, s, n = e.internal_flags;
                        if (0 == n.lame_encode_frame_init) {
                            var r, _, o = i(2014),
                                l = i(2014);
                            for (n.lame_encode_frame_init = 1, r = 0, _ = 0; r < 286 + 576 * (1 + n.mode_gr); ++r) r < 576 * n.mode_gr ? (o[r] = 0, 2 == n.channels_out && (l[r] = 0)) : (o[r] = t[0][_], 2 == n.channels_out && (l[r] = t[1][_]), ++_);
                            for (s = 0; s < n.mode_gr; s++)
                                for (a = 0; a < n.channels_out; a++) n.l3_side.tt[s][a].block_type = c.SHORT_TYPE;
                            d.mdct_sub48(n, o, l), f(576 >= c.FFTOFFSET), f(n.mf_size >= c.BLKSIZE + e.framesize - c.FFTOFFSET), f(n.mf_size >= 512 + e.framesize - 32)
                        }
                    }(e, k), x.padding = 0, (x.slot_lag -= x.frac_SpF) < 0 && (x.slot_lag += e.out_samplerate, x.padding = 1), 0 != x.psymodel) {
                    var H = [null, null],
                        O = 0,
                        N = l(2);
                    for (T = 0; T < x.mode_gr; T++) {
                        for (E = 0; E < x.channels_out; E++) H[E] = k[E], O = 576 + 576 * T - c.FFTOFFSET;
                        if (0 != (e.VBR == r.vbr_mtrh || e.VBR == r.vbr_mt ? b.L3psycho_anal_vbr(e, H, O, T, A, B, L[T], V[T], P[T], N) : b.L3psycho_anal_ns(e, H, O, T, A, B, L[T], V[T], P[T], N))) return -4;
                        for (e.mode == MPEGMode.JOINT_STEREO && (I[T] = P[T][2] + P[T][3], I[T] > 0 && (I[T] = P[T][3] / I[T])), E = 0; E < x.channels_out; E++) {
                            var D = x.l3_side.tt[T][E];
                            D.block_type = N[E], D.mixed_block_flag = 0
                        }
                    }
                } else
                    for (T = 0; T < x.mode_gr; T++)
                        for (E = 0; E < x.channels_out; E++) x.l3_side.tt[T][E].block_type = c.NORM_TYPE, x.l3_side.tt[T][E].mixed_block_flag = 0, V[T][E] = L[T][E] = 700;
                if (function(e) {
                        var t, a;
                        if (0 != e.ATH.useAdjust)
                            if (a = e.loudness_sq[0][0], t = e.loudness_sq[1][0], 2 == e.channels_out ? (a += e.loudness_sq[0][1], t += e.loudness_sq[1][1]) : (a += a, t += t), 2 == e.mode_gr && (a = Math.max(a, t)), a *= .5, (a *= e.ATH.aaSensitivityP) > .03125) e.ATH.adjust >= 1 ? e.ATH.adjust = 1 : e.ATH.adjust < e.ATH.adjustLimit && (e.ATH.adjust = e.ATH.adjustLimit), e.ATH.adjustLimit = 1;
                            else {
                                var s = 31.98 * a + 625e-6;
                                e.ATH.adjust >= s ? (e.ATH.adjust *= .075 * s + .925, e.ATH.adjust < s && (e.ATH.adjust = s)) : e.ATH.adjustLimit >= s ? e.ATH.adjust = s : e.ATH.adjust < e.ATH.adjustLimit && (e.ATH.adjust = e.ATH.adjustLimit), e.ATH.adjustLimit = s
                            }
                        else e.ATH.adjust = 1
                    }(x), d.mdct_sub48(x, k[0], k[1]), x.mode_ext = c.MPG_MD_LR_LR, e.force_ms) x.mode_ext = c.MPG_MD_MS_LR;
                else if (e.mode == MPEGMode.JOINT_STEREO) {
                    var X = 0,
                        F = 0;
                    for (T = 0; T < x.mode_gr; T++)
                        for (E = 0; E < x.channels_out; E++) X += V[T][E], F += L[T][E];
                    if (X <= 1 * F) {
                        var q = x.l3_side.tt[0],
                            Y = x.l3_side.tt[x.mode_gr - 1];
                        q[0].block_type == q[1].block_type && Y[0].block_type == Y[1].block_type && (x.mode_ext = c.MPG_MD_MS_LR)
                    }
                }
                if (x.mode_ext == u ? (R = B, y = V) : (R = A, y = L), e.analysis && null != x.pinfo)
                    for (T = 0; T < x.mode_gr; T++)
                        for (E = 0; E < x.channels_out; E++) x.pinfo.ms_ratio[T] = x.ms_ratio[T], x.pinfo.ms_ener_ratio[T] = I[T], x.pinfo.blocktype[T][E] = x.l3_side.tt[T][E].block_type, x.pinfo.pe[T][E] = y[T][E], n.arraycopy(x.l3_side.tt[T][E].xr, 0, x.pinfo.xr[T][E], 0, 576), x.mode_ext == u && (x.pinfo.ers[T][E] = x.pinfo.ers[T][E + 2], n.arraycopy(x.pinfo.energy[T][E + 2], 0, x.pinfo.energy[T][E], 0, x.pinfo.energy[T][E].length));
                if (e.VBR == r.vbr_off || e.VBR == r.vbr_abr) {
                    var C, j;
                    for (C = 0; C < 18; C++) x.nsPsy.pefirbuf[C] = x.nsPsy.pefirbuf[C + 1];
                    for (j = 0, T = 0; T < x.mode_gr; T++)
                        for (E = 0; E < x.channels_out; E++) j += y[T][E];
                    for (x.nsPsy.pefirbuf[18] = j, j = x.nsPsy.pefirbuf[9], C = 0; C < 9; C++) j += (x.nsPsy.pefirbuf[C] + x.nsPsy.pefirbuf[18 - C]) * c.fircoef[C];
                    for (j = 3350 * x.mode_gr * x.channels_out / j, T = 0; T < x.mode_gr; T++)
                        for (E = 0; E < x.channels_out; E++) y[T][E] *= j
                }
                if (x.iteration_loop.iteration_loop(e, y, I, R), h.format_bitstream(e), M = h.copy_buffer(x, g, S, w, 1), e.bWriteVbrTag && m.addVbrFrame(e), e.analysis && null != x.pinfo) {
                    for (E = 0; E < x.channels_out; E++) {
                        var G;
                        for (G = 0; G < s; G++) x.pinfo.pcmdata[E][G] = x.pinfo.pcmdata[E][G + e.framesize];
                        for (G = s; G < 1600; G++) x.pinfo.pcmdata[E][G] = k[E][G - s]
                    }
                    p.set_frame_pinfo(e, R)
                }
                return function(e) {
                    var t, a;
                    for (f(0 <= e.bitrate_index && e.bitrate_index < 16), f(0 <= e.mode_ext && e.mode_ext < 4), e.bitrate_stereoMode_Hist[e.bitrate_index][4]++, e.bitrate_stereoMode_Hist[15][4]++, 2 == e.channels_out && (e.bitrate_stereoMode_Hist[e.bitrate_index][e.mode_ext]++, e.bitrate_stereoMode_Hist[15][e.mode_ext]++), t = 0; t < e.mode_gr; ++t)
                        for (a = 0; a < e.channels_out; ++a) {
                            var s = 0 | e.l3_side.tt[t][a].block_type;
                            0 != e.l3_side.tt[t][a].mixed_block_flag && (s = 4), e.bitrate_blockType_Hist[e.bitrate_index][s]++, e.bitrate_blockType_Hist[e.bitrate_index][5]++, e.bitrate_blockType_Hist[15][s]++, e.bitrate_blockType_Hist[15][5]++
                        }
                }(x), M
            }
        }
        c.ENCDELAY = 576, c.POSTDELAY = 1152, c.MDCTDELAY = 48, c.FFTOFFSET = 224 + c.MDCTDELAY, c.DECDELAY = 528, c.SBLIMIT = 32, c.CBANDS = 64, c.SBPSY_l = 21, c.SBPSY_s = 12, c.SBMAX_l = 22, c.SBMAX_s = 13, c.PSFB21 = 6, c.PSFB12 = 6, c.BLKSIZE = 1024, c.HBLKSIZE = c.BLKSIZE / 2 + 1, c.BLKSIZE_s = 256, c.HBLKSIZE_s = c.BLKSIZE_s / 2 + 1, c.NORM_TYPE = 0, c.START_TYPE = 1, c.SHORT_TYPE = 2, c.STOP_TYPE = 3, c.MPG_MD_LR_LR = 0, c.MPG_MD_LR_I = 1, c.MPG_MD_MS_LR = 2, c.MPG_MD_MS_I = 3, c.fircoef = [-.1039435, -.1892065, 5 * -.0432472, -.155915, 3.898045e-17, .0467745 * 5, .50455, .756825, .187098 * 5], e.exports = c
    },
    SmUK: function(e, t, a) {
        var s = a("Agby"),
            n = (s.System, s.VbrMode, s.Float, s.ShortBlock, s.Util, s.Arrays, s.new_array_n, s.new_byte, s.new_double, s.new_float),
            r = (s.new_float_n, s.new_int),
            _ = (s.new_int_n, s.assert),
            i = a("8FI/"),
            o = a("S14o"),
            l = a("mCij"),
            f = a("vYvw");
        e.exports = function(e) {
            var t = e;
            this.quantize = t, this.iteration_loop = function(e, t, a, s) {
                var c, u = e.internal_flags,
                    h = n(l.SFBMAX),
                    b = n(576),
                    m = r(2),
                    p = 0,
                    d = u.l3_side,
                    v = new i(p);
                this.quantize.rv.ResvFrameBegin(e, v), p = v.bits;
                for (var g = 0; g < u.mode_gr; g++) {
                    c = this.quantize.qupvt.on_pe(e, t, m, p, g, g), u.mode_ext == o.MPG_MD_MS_LR && (this.quantize.ms_convert(u.l3_side, g), this.quantize.qupvt.reduce_side(m, a[g], p, c));
                    for (var S = 0; S < u.channels_out; S++) {
                        var w, M, A = d.tt[g][S];
                        A.block_type != o.SHORT_TYPE ? (w = 0, M = u.PSY.mask_adjust - w) : (w = 0, M = u.PSY.mask_adjust_short - w), u.masking_lower = Math.pow(10, .1 * M), this.quantize.init_outer_loop(u, A), this.quantize.init_xrpow(u, A, b) && (this.quantize.qupvt.calc_xmin(e, s[g][S], A, h), this.quantize.outer_loop(e, A, h, b, S, m[S])), this.quantize.iteration_finish_one(u, g, S), _(A.part2_3_length <= f.MAX_BITS_PER_CHANNEL), _(A.part2_3_length <= m[S])
                    }
                }
                this.quantize.rv.ResvFrameEnd(u, p)
            }
        }
    },
    WLGJ: function(e, t, a) {
        var s = a("Agby").assert;
        e.exports = function() {
            var e;
            this.setModules = function(t) {
                e = t
            }, this.ResvFrameBegin = function(t, a) {
                var n, r = t.internal_flags,
                    _ = r.l3_side,
                    i = e.getframebits(t);
                a.bits = (i - 8 * r.sideinfo_len) / r.mode_gr;
                var o = 2048 * r.mode_gr - 8;
                t.brate > 320 ? n = 8 * int(1e3 * t.brate / (t.out_samplerate / 1152) / 8 + .5) : (n = 11520, t.strict_ISO && (n = 8 * int(32e4 / (t.out_samplerate / 1152) / 8 + .5))), r.ResvMax = n - i, r.ResvMax > o && (r.ResvMax = o), (r.ResvMax < 0 || t.disable_reservoir) && (r.ResvMax = 0);
                var l = a.bits * r.mode_gr + Math.min(r.ResvSize, r.ResvMax);
                return l > n && (l = n), s(0 == r.ResvMax % 8), s(r.ResvMax >= 0), _.resvDrain_pre = 0, null != r.pinfo && (r.pinfo.mean_bits = a.bits / 2, r.pinfo.resvsize = r.ResvSize), l
            }, this.ResvMaxBits = function(e, t, a, s) {
                var n, r = e.internal_flags,
                    _ = r.ResvSize,
                    i = r.ResvMax;
                0 != s && (_ += t), 0 != (1 & r.substep_shaping) && (i *= .9), a.bits = t, 10 * _ > 9 * i ? (n = _ - 9 * i / 10, a.bits += n, r.substep_shaping |= 128) : (n = 0, r.substep_shaping &= 127, e.disable_reservoir || 0 != (1 & r.substep_shaping) || (a.bits -= .1 * t));
                var o = _ < 6 * r.ResvMax / 10 ? _ : 6 * r.ResvMax / 10;
                return (o -= n) < 0 && (o = 0), o
            }, this.ResvAdjust = function(e, t) {
                e.ResvSize -= t.part2_3_length + t.part2_length
            }, this.ResvFrameEnd = function(e, t) {
                var a, n = e.l3_side;
                e.ResvSize += t * e.mode_gr;
                var r = 0;
                n.resvDrain_post = 0, n.resvDrain_pre = 0, 0 != (a = e.ResvSize % 8) && (r += a), (a = e.ResvSize - r - e.ResvMax) > 0 && (s(0 == a % 8), s(a >= 0), r += a);
                var _ = Math.min(8 * n.main_data_begin, r) / 8;
                n.resvDrain_pre += 8 * _, r -= 8 * _, e.ResvSize -= 8 * _, n.main_data_begin -= _, n.resvDrain_post += r, e.ResvSize -= r
            }
        }
    },
    X4Rc: function(e, t) {
        function a(e, t, a, s) {
            this.xlen = e, this.linmax = t, this.table = a, this.hlen = s
        }
        var s = {
            t1HB: [1, 1, 1, 0],
            t2HB: [1, 2, 1, 3, 1, 1, 3, 2, 0],
            t3HB: [3, 2, 1, 1, 1, 1, 3, 2, 0],
            t5HB: [1, 2, 6, 5, 3, 1, 4, 4, 7, 5, 7, 1, 6, 1, 1, 0],
            t6HB: [7, 3, 5, 1, 6, 2, 3, 2, 5, 4, 4, 1, 3, 3, 2, 0],
            t7HB: [1, 2, 10, 19, 16, 10, 3, 3, 7, 10, 5, 3, 11, 4, 13, 17, 8, 4, 12, 11, 18, 15, 11, 2, 7, 6, 9, 14, 3, 1, 6, 4, 5, 3, 2, 0],
            t8HB: [3, 4, 6, 18, 12, 5, 5, 1, 2, 16, 9, 3, 7, 3, 5, 14, 7, 3, 19, 17, 15, 13, 10, 4, 13, 5, 8, 11, 5, 1, 12, 4, 4, 1, 1, 0],
            t9HB: [7, 5, 9, 14, 15, 7, 6, 4, 5, 5, 6, 7, 7, 6, 8, 8, 8, 5, 15, 6, 9, 10, 5, 1, 11, 7, 9, 6, 4, 1, 14, 4, 6, 2, 6, 0],
            t10HB: [1, 2, 10, 23, 35, 30, 12, 17, 3, 3, 8, 12, 18, 21, 12, 7, 11, 9, 15, 21, 32, 40, 19, 6, 14, 13, 22, 34, 46, 23, 18, 7, 20, 19, 33, 47, 27, 22, 9, 3, 31, 22, 41, 26, 21, 20, 5, 3, 14, 13, 10, 11, 16, 6, 5, 1, 9, 8, 7, 8, 4, 4, 2, 0],
            t11HB: [3, 4, 10, 24, 34, 33, 21, 15, 5, 3, 4, 10, 32, 17, 11, 10, 11, 7, 13, 18, 30, 31, 20, 5, 25, 11, 19, 59, 27, 18, 12, 5, 35, 33, 31, 58, 30, 16, 7, 5, 28, 26, 32, 19, 17, 15, 8, 14, 14, 12, 9, 13, 14, 9, 4, 1, 11, 4, 6, 6, 6, 3, 2, 0],
            t12HB: [9, 6, 16, 33, 41, 39, 38, 26, 7, 5, 6, 9, 23, 16, 26, 11, 17, 7, 11, 14, 21, 30, 10, 7, 17, 10, 15, 12, 18, 28, 14, 5, 32, 13, 22, 19, 18, 16, 9, 5, 40, 17, 31, 29, 17, 13, 4, 2, 27, 12, 11, 15, 10, 7, 4, 1, 27, 12, 8, 12, 6, 3, 1, 0],
            t13HB: [1, 5, 14, 21, 34, 51, 46, 71, 42, 52, 68, 52, 67, 44, 43, 19, 3, 4, 12, 19, 31, 26, 44, 33, 31, 24, 32, 24, 31, 35, 22, 14, 15, 13, 23, 36, 59, 49, 77, 65, 29, 40, 30, 40, 27, 33, 42, 16, 22, 20, 37, 61, 56, 79, 73, 64, 43, 76, 56, 37, 26, 31, 25, 14, 35, 16, 60, 57, 97, 75, 114, 91, 54, 73, 55, 41, 48, 53, 23, 24, 58, 27, 50, 96, 76, 70, 93, 84, 77, 58, 79, 29, 74, 49, 41, 17, 47, 45, 78, 74, 115, 94, 90, 79, 69, 83, 71, 50, 59, 38, 36, 15, 72, 34, 56, 95, 92, 85, 91, 90, 86, 73, 77, 65, 51, 44, 43, 42, 43, 20, 30, 44, 55, 78, 72, 87, 78, 61, 46, 54, 37, 30, 20, 16, 53, 25, 41, 37, 44, 59, 54, 81, 66, 76, 57, 54, 37, 18, 39, 11, 35, 33, 31, 57, 42, 82, 72, 80, 47, 58, 55, 21, 22, 26, 38, 22, 53, 25, 23, 38, 70, 60, 51, 36, 55, 26, 34, 23, 27, 14, 9, 7, 34, 32, 28, 39, 49, 75, 30, 52, 48, 40, 52, 28, 18, 17, 9, 5, 45, 21, 34, 64, 56, 50, 49, 45, 31, 19, 12, 15, 10, 7, 6, 3, 48, 23, 20, 39, 36, 35, 53, 21, 16, 23, 13, 10, 6, 1, 4, 2, 16, 15, 17, 27, 25, 20, 29, 11, 17, 12, 16, 8, 1, 1, 0, 1],
            t15HB: [7, 12, 18, 53, 47, 76, 124, 108, 89, 123, 108, 119, 107, 81, 122, 63, 13, 5, 16, 27, 46, 36, 61, 51, 42, 70, 52, 83, 65, 41, 59, 36, 19, 17, 15, 24, 41, 34, 59, 48, 40, 64, 50, 78, 62, 80, 56, 33, 29, 28, 25, 43, 39, 63, 55, 93, 76, 59, 93, 72, 54, 75, 50, 29, 52, 22, 42, 40, 67, 57, 95, 79, 72, 57, 89, 69, 49, 66, 46, 27, 77, 37, 35, 66, 58, 52, 91, 74, 62, 48, 79, 63, 90, 62, 40, 38, 125, 32, 60, 56, 50, 92, 78, 65, 55, 87, 71, 51, 73, 51, 70, 30, 109, 53, 49, 94, 88, 75, 66, 122, 91, 73, 56, 42, 64, 44, 21, 25, 90, 43, 41, 77, 73, 63, 56, 92, 77, 66, 47, 67, 48, 53, 36, 20, 71, 34, 67, 60, 58, 49, 88, 76, 67, 106, 71, 54, 38, 39, 23, 15, 109, 53, 51, 47, 90, 82, 58, 57, 48, 72, 57, 41, 23, 27, 62, 9, 86, 42, 40, 37, 70, 64, 52, 43, 70, 55, 42, 25, 29, 18, 11, 11, 118, 68, 30, 55, 50, 46, 74, 65, 49, 39, 24, 16, 22, 13, 14, 7, 91, 44, 39, 38, 34, 63, 52, 45, 31, 52, 28, 19, 14, 8, 9, 3, 123, 60, 58, 53, 47, 43, 32, 22, 37, 24, 17, 12, 15, 10, 2, 1, 71, 37, 34, 30, 28, 20, 17, 26, 21, 16, 10, 6, 8, 6, 2, 0],
            t16HB: [1, 5, 14, 44, 74, 63, 110, 93, 172, 149, 138, 242, 225, 195, 376, 17, 3, 4, 12, 20, 35, 62, 53, 47, 83, 75, 68, 119, 201, 107, 207, 9, 15, 13, 23, 38, 67, 58, 103, 90, 161, 72, 127, 117, 110, 209, 206, 16, 45, 21, 39, 69, 64, 114, 99, 87, 158, 140, 252, 212, 199, 387, 365, 26, 75, 36, 68, 65, 115, 101, 179, 164, 155, 264, 246, 226, 395, 382, 362, 9, 66, 30, 59, 56, 102, 185, 173, 265, 142, 253, 232, 400, 388, 378, 445, 16, 111, 54, 52, 100, 184, 178, 160, 133, 257, 244, 228, 217, 385, 366, 715, 10, 98, 48, 91, 88, 165, 157, 148, 261, 248, 407, 397, 372, 380, 889, 884, 8, 85, 84, 81, 159, 156, 143, 260, 249, 427, 401, 392, 383, 727, 713, 708, 7, 154, 76, 73, 141, 131, 256, 245, 426, 406, 394, 384, 735, 359, 710, 352, 11, 139, 129, 67, 125, 247, 233, 229, 219, 393, 743, 737, 720, 885, 882, 439, 4, 243, 120, 118, 115, 227, 223, 396, 746, 742, 736, 721, 712, 706, 223, 436, 6, 202, 224, 222, 218, 216, 389, 386, 381, 364, 888, 443, 707, 440, 437, 1728, 4, 747, 211, 210, 208, 370, 379, 734, 723, 714, 1735, 883, 877, 876, 3459, 865, 2, 377, 369, 102, 187, 726, 722, 358, 711, 709, 866, 1734, 871, 3458, 870, 434, 0, 12, 10, 7, 11, 10, 17, 11, 9, 13, 12, 10, 7, 5, 3, 1, 3],
            t24HB: [15, 13, 46, 80, 146, 262, 248, 434, 426, 669, 653, 649, 621, 517, 1032, 88, 14, 12, 21, 38, 71, 130, 122, 216, 209, 198, 327, 345, 319, 297, 279, 42, 47, 22, 41, 74, 68, 128, 120, 221, 207, 194, 182, 340, 315, 295, 541, 18, 81, 39, 75, 70, 134, 125, 116, 220, 204, 190, 178, 325, 311, 293, 271, 16, 147, 72, 69, 135, 127, 118, 112, 210, 200, 188, 352, 323, 306, 285, 540, 14, 263, 66, 129, 126, 119, 114, 214, 202, 192, 180, 341, 317, 301, 281, 262, 12, 249, 123, 121, 117, 113, 215, 206, 195, 185, 347, 330, 308, 291, 272, 520, 10, 435, 115, 111, 109, 211, 203, 196, 187, 353, 332, 313, 298, 283, 531, 381, 17, 427, 212, 208, 205, 201, 193, 186, 177, 169, 320, 303, 286, 268, 514, 377, 16, 335, 199, 197, 191, 189, 181, 174, 333, 321, 305, 289, 275, 521, 379, 371, 11, 668, 184, 183, 179, 175, 344, 331, 314, 304, 290, 277, 530, 383, 373, 366, 10, 652, 346, 171, 168, 164, 318, 309, 299, 287, 276, 263, 513, 375, 368, 362, 6, 648, 322, 316, 312, 307, 302, 292, 284, 269, 261, 512, 376, 370, 364, 359, 4, 620, 300, 296, 294, 288, 282, 273, 266, 515, 380, 374, 369, 365, 361, 357, 2, 1033, 280, 278, 274, 267, 264, 259, 382, 378, 372, 367, 363, 360, 358, 356, 0, 43, 20, 19, 17, 15, 13, 11, 9, 7, 6, 4, 7, 5, 3, 1, 3],
            t32HB: [1, 10, 8, 20, 12, 20, 16, 32, 14, 12, 24, 0, 28, 16, 24, 16],
            t33HB: [15, 28, 26, 48, 22, 40, 36, 64, 14, 24, 20, 32, 12, 16, 8, 0],
            t1l: [1, 4, 3, 5],
            t2l: [1, 4, 7, 4, 5, 7, 6, 7, 8],
            t3l: [2, 3, 7, 4, 4, 7, 6, 7, 8],
            t5l: [1, 4, 7, 8, 4, 5, 8, 9, 7, 8, 9, 10, 8, 8, 9, 10],
            t6l: [3, 4, 6, 8, 4, 4, 6, 7, 5, 6, 7, 8, 7, 7, 8, 9],
            t7l: [1, 4, 7, 9, 9, 10, 4, 6, 8, 9, 9, 10, 7, 7, 9, 10, 10, 11, 8, 9, 10, 11, 11, 11, 8, 9, 10, 11, 11, 12, 9, 10, 11, 12, 12, 12],
            t8l: [2, 4, 7, 9, 9, 10, 4, 4, 6, 10, 10, 10, 7, 6, 8, 10, 10, 11, 9, 10, 10, 11, 11, 12, 9, 9, 10, 11, 12, 12, 10, 10, 11, 11, 13, 13],
            t9l: [3, 4, 6, 7, 9, 10, 4, 5, 6, 7, 8, 10, 5, 6, 7, 8, 9, 10, 7, 7, 8, 9, 9, 10, 8, 8, 9, 9, 10, 11, 9, 9, 10, 10, 11, 11],
            t10l: [1, 4, 7, 9, 10, 10, 10, 11, 4, 6, 8, 9, 10, 11, 10, 10, 7, 8, 9, 10, 11, 12, 11, 11, 8, 9, 10, 11, 12, 12, 11, 12, 9, 10, 11, 12, 12, 12, 12, 12, 10, 11, 12, 12, 13, 13, 12, 13, 9, 10, 11, 12, 12, 12, 13, 13, 10, 10, 11, 12, 12, 13, 13, 13],
            t11l: [2, 4, 6, 8, 9, 10, 9, 10, 4, 5, 6, 8, 10, 10, 9, 10, 6, 7, 8, 9, 10, 11, 10, 10, 8, 8, 9, 11, 10, 12, 10, 11, 9, 10, 10, 11, 11, 12, 11, 12, 9, 10, 11, 12, 12, 13, 12, 13, 9, 9, 9, 10, 11, 12, 12, 12, 9, 9, 10, 11, 12, 12, 12, 12],
            t12l: [4, 4, 6, 8, 9, 10, 10, 10, 4, 5, 6, 7, 9, 9, 10, 10, 6, 6, 7, 8, 9, 10, 9, 10, 7, 7, 8, 8, 9, 10, 10, 10, 8, 8, 9, 9, 10, 10, 10, 11, 9, 9, 10, 10, 10, 11, 10, 11, 9, 9, 9, 10, 10, 11, 11, 12, 10, 10, 10, 11, 11, 11, 11, 12],
            t13l: [1, 5, 7, 8, 9, 10, 10, 11, 10, 11, 12, 12, 13, 13, 14, 14, 4, 6, 8, 9, 10, 10, 11, 11, 11, 11, 12, 12, 13, 14, 14, 14, 7, 8, 9, 10, 11, 11, 12, 12, 11, 12, 12, 13, 13, 14, 15, 15, 8, 9, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 15, 15, 9, 9, 11, 11, 12, 12, 13, 13, 12, 13, 13, 14, 14, 15, 15, 16, 10, 10, 11, 12, 12, 12, 13, 13, 13, 13, 14, 13, 15, 15, 16, 16, 10, 11, 12, 12, 13, 13, 13, 13, 13, 14, 14, 14, 15, 15, 16, 16, 11, 11, 12, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 16, 18, 18, 10, 10, 11, 12, 12, 13, 13, 14, 14, 14, 14, 15, 15, 16, 17, 17, 11, 11, 12, 12, 13, 13, 13, 15, 14, 15, 15, 16, 16, 16, 18, 17, 11, 12, 12, 13, 13, 14, 14, 15, 14, 15, 16, 15, 16, 17, 18, 19, 12, 12, 12, 13, 14, 14, 14, 14, 15, 15, 15, 16, 17, 17, 17, 18, 12, 13, 13, 14, 14, 15, 14, 15, 16, 16, 17, 17, 17, 18, 18, 18, 13, 13, 14, 15, 15, 15, 16, 16, 16, 16, 16, 17, 18, 17, 18, 18, 14, 14, 14, 15, 15, 15, 17, 16, 16, 19, 17, 17, 17, 19, 18, 18, 13, 14, 15, 16, 16, 16, 17, 16, 17, 17, 18, 18, 21, 20, 21, 18],
            t15l: [3, 5, 6, 8, 8, 9, 10, 10, 10, 11, 11, 12, 12, 12, 13, 14, 5, 5, 7, 8, 9, 9, 10, 10, 10, 11, 11, 12, 12, 12, 13, 13, 6, 7, 7, 8, 9, 9, 10, 10, 10, 11, 11, 12, 12, 13, 13, 13, 7, 8, 8, 9, 9, 10, 10, 11, 11, 11, 12, 12, 12, 13, 13, 13, 8, 8, 9, 9, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 13, 13, 9, 9, 9, 10, 10, 10, 11, 11, 11, 11, 12, 12, 13, 13, 13, 14, 10, 9, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 13, 14, 14, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 14, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 14, 14, 14, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 13, 14, 15, 14, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 15, 12, 12, 11, 12, 12, 12, 13, 13, 13, 13, 13, 13, 14, 14, 15, 15, 12, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 14, 15, 15, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 14, 15, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15],
            t16_5l: [1, 5, 7, 9, 10, 10, 11, 11, 12, 12, 12, 13, 13, 13, 14, 11, 4, 6, 8, 9, 10, 11, 11, 11, 12, 12, 12, 13, 14, 13, 14, 11, 7, 8, 9, 10, 11, 11, 12, 12, 13, 12, 13, 13, 13, 14, 14, 12, 9, 9, 10, 11, 11, 12, 12, 12, 13, 13, 14, 14, 14, 15, 15, 13, 10, 10, 11, 11, 12, 12, 13, 13, 13, 14, 14, 14, 15, 15, 15, 12, 10, 10, 11, 11, 12, 13, 13, 14, 13, 14, 14, 15, 15, 15, 16, 13, 11, 11, 11, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 16, 13, 11, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 15, 17, 17, 13, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 13, 12, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 15, 16, 15, 14, 12, 13, 12, 13, 14, 14, 14, 14, 15, 16, 16, 16, 17, 17, 16, 13, 13, 13, 13, 13, 14, 14, 15, 16, 16, 16, 16, 16, 16, 15, 16, 14, 13, 14, 14, 14, 14, 15, 15, 15, 15, 17, 16, 16, 16, 16, 18, 14, 15, 14, 14, 14, 15, 15, 16, 16, 16, 18, 17, 17, 17, 19, 17, 14, 14, 15, 13, 14, 16, 16, 15, 16, 16, 17, 18, 17, 19, 17, 16, 14, 11, 11, 11, 12, 12, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 12],
            t16l: [1, 5, 7, 9, 10, 10, 11, 11, 12, 12, 12, 13, 13, 13, 14, 10, 4, 6, 8, 9, 10, 11, 11, 11, 12, 12, 12, 13, 14, 13, 14, 10, 7, 8, 9, 10, 11, 11, 12, 12, 13, 12, 13, 13, 13, 14, 14, 11, 9, 9, 10, 11, 11, 12, 12, 12, 13, 13, 14, 14, 14, 15, 15, 12, 10, 10, 11, 11, 12, 12, 13, 13, 13, 14, 14, 14, 15, 15, 15, 11, 10, 10, 11, 11, 12, 13, 13, 14, 13, 14, 14, 15, 15, 15, 16, 12, 11, 11, 11, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 16, 12, 11, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 15, 17, 17, 12, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 12, 12, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 15, 16, 15, 13, 12, 13, 12, 13, 14, 14, 14, 14, 15, 16, 16, 16, 17, 17, 16, 12, 13, 13, 13, 13, 14, 14, 15, 16, 16, 16, 16, 16, 16, 15, 16, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 17, 16, 16, 16, 16, 18, 13, 15, 14, 14, 14, 15, 15, 16, 16, 16, 18, 17, 17, 17, 19, 17, 13, 14, 15, 13, 14, 16, 16, 15, 16, 16, 17, 18, 17, 19, 17, 16, 13, 10, 10, 10, 11, 11, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 10],
            t24l: [4, 5, 7, 8, 9, 10, 10, 11, 11, 12, 12, 12, 12, 12, 13, 10, 5, 6, 7, 8, 9, 10, 10, 11, 11, 11, 12, 12, 12, 12, 12, 10, 7, 7, 8, 9, 9, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 9, 8, 8, 9, 9, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 12, 12, 12, 12, 13, 9, 10, 9, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 9, 10, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 9, 11, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 10, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 10, 12, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 10, 12, 12, 11, 11, 11, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 10, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 10, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 10, 13, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 6],
            t32l: [1, 5, 5, 7, 5, 8, 7, 9, 5, 7, 7, 9, 7, 9, 9, 10],
            t33l: [4, 5, 5, 6, 5, 6, 6, 7, 5, 6, 6, 7, 6, 7, 7, 8]
        };
        s.ht = [new a(0, 0, null, null), new a(2, 0, s.t1HB, s.t1l), new a(3, 0, s.t2HB, s.t2l), new a(3, 0, s.t3HB, s.t3l), new a(0, 0, null, null), new a(4, 0, s.t5HB, s.t5l), new a(4, 0, s.t6HB, s.t6l), new a(6, 0, s.t7HB, s.t7l), new a(6, 0, s.t8HB, s.t8l), new a(6, 0, s.t9HB, s.t9l), new a(8, 0, s.t10HB, s.t10l), new a(8, 0, s.t11HB, s.t11l), new a(8, 0, s.t12HB, s.t12l), new a(16, 0, s.t13HB, s.t13l), new a(0, 0, null, s.t16_5l), new a(16, 0, s.t15HB, s.t15l), new a(1, 1, s.t16HB, s.t16l), new a(2, 3, s.t16HB, s.t16l), new a(3, 7, s.t16HB, s.t16l), new a(4, 15, s.t16HB, s.t16l), new a(6, 63, s.t16HB, s.t16l), new a(8, 255, s.t16HB, s.t16l), new a(10, 1023, s.t16HB, s.t16l), new a(13, 8191, s.t16HB, s.t16l), new a(4, 15, s.t24HB, s.t24l), new a(5, 31, s.t24HB, s.t24l), new a(6, 63, s.t24HB, s.t24l), new a(7, 127, s.t24HB, s.t24l), new a(8, 255, s.t24HB, s.t24l), new a(9, 511, s.t24HB, s.t24l), new a(11, 2047, s.t24HB, s.t24l), new a(13, 8191, s.t24HB, s.t24l), new a(0, 0, s.t32HB, s.t32l), new a(0, 0, s.t33HB, s.t33l)], s.largetbl = [65540, 327685, 458759, 589832, 655369, 655370, 720906, 720907, 786443, 786444, 786444, 851980, 851980, 851980, 917517, 655370, 262149, 393222, 524295, 589832, 655369, 720906, 720906, 720907, 786443, 786443, 786444, 851980, 917516, 851980, 917516, 655370, 458759, 524295, 589832, 655369, 720905, 720906, 786442, 786443, 851979, 786443, 851979, 851980, 851980, 917516, 917517, 720905, 589832, 589832, 655369, 720905, 720906, 786442, 786442, 786443, 851979, 851979, 917515, 917516, 917516, 983052, 983052, 786441, 655369, 655369, 720905, 720906, 786442, 786442, 851978, 851979, 851979, 917515, 917516, 917516, 983052, 983052, 983053, 720905, 655370, 655369, 720906, 720906, 786442, 851978, 851979, 917515, 851979, 917515, 917516, 983052, 983052, 983052, 1048588, 786441, 720906, 720906, 720906, 786442, 851978, 851979, 851979, 851979, 917515, 917516, 917516, 917516, 983052, 983052, 1048589, 786441, 720907, 720906, 786442, 786442, 851979, 851979, 851979, 917515, 917516, 983052, 983052, 983052, 983052, 1114125, 1114125, 786442, 720907, 786443, 786443, 851979, 851979, 851979, 917515, 917515, 983051, 983052, 983052, 983052, 1048588, 1048589, 1048589, 786442, 786443, 786443, 786443, 851979, 851979, 917515, 917515, 983052, 983052, 983052, 983052, 1048588, 983053, 1048589, 983053, 851978, 786444, 851979, 786443, 851979, 917515, 917516, 917516, 917516, 983052, 1048588, 1048588, 1048589, 1114125, 1114125, 1048589, 786442, 851980, 851980, 851979, 851979, 917515, 917516, 983052, 1048588, 1048588, 1048588, 1048588, 1048589, 1048589, 983053, 1048589, 851978, 851980, 917516, 917516, 917516, 917516, 983052, 983052, 983052, 983052, 1114124, 1048589, 1048589, 1048589, 1048589, 1179661, 851978, 983052, 917516, 917516, 917516, 983052, 983052, 1048588, 1048588, 1048589, 1179661, 1114125, 1114125, 1114125, 1245197, 1114125, 851978, 917517, 983052, 851980, 917516, 1048588, 1048588, 983052, 1048589, 1048589, 1114125, 1179661, 1114125, 1245197, 1114125, 1048589, 851978, 655369, 655369, 655369, 720905, 720905, 786441, 786441, 786441, 851977, 851977, 851977, 851978, 851978, 851978, 851978, 655366], s.table23 = [65538, 262147, 458759, 262148, 327684, 458759, 393222, 458759, 524296], s.table56 = [65539, 262148, 458758, 524296, 262148, 327684, 524294, 589831, 458757, 524294, 589831, 655368, 524295, 524295, 589832, 655369], s.bitrate_table = [
            [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, -1],
            [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1],
            [0, 8, 16, 24, 32, 40, 48, 56, 64, -1, -1, -1, -1, -1, -1, -1]
        ], s.samplerate_table = [
            [22050, 24e3, 16e3, -1],
            [44100, 48e3, 32e3, -1],
            [11025, 12e3, 8e3, -1]
        ], s.scfsi_band = [0, 6, 11, 16, 21], e.exports = s
    },
    Z7J9: function(e, t) {
        function a(e) {
            var t = e;
            this.ordinal = function() {
                return t
            }
        }
        a.STEREO = new a(0), a.JOINT_STEREO = new a(1), a.DUAL_CHANNEL = new a(2), a.MONO = new a(3), a.NOT_SET = new a(4), e.exports = a
    },
    abK7: function(e, t, a) {
        var s = a("Agby"),
            n = s.System,
            r = (s.VbrMode, s.Float, s.ShortBlock, s.Util, s.Arrays),
            _ = (s.new_array_n, s.new_byte),
            i = (s.new_double, s.new_float, s.new_float_n),
            o = s.new_int,
            l = (s.new_int_n, s.assert),
            f = a("2b6p"),
            c = a("X4Rc"),
            u = a("S14o"),
            h = a("vYvw");

        function b() {
            var e = this,
                t = 32773,
                a = 32,
                s = null,
                b = null,
                m = null,
                p = null;
            this.setModules = function(e, t, a, n) {
                s = e, b = t, m = a, p = n
            };
            var d = null,
                v = 0,
                g = 0,
                S = 0;

            function w(e) {
                n.arraycopy(e.header[e.w_ptr].buf, 0, d, g, e.sideinfo_len), g += e.sideinfo_len, v += 8 * e.sideinfo_len, e.w_ptr = e.w_ptr + 1 & h.MAX_HEADER_BUF - 1
            }

            function M(e, t, s) {
                for (l(s < a - 2); s > 0;) {
                    var n;
                    0 == S && (S = 8, l(++g < Lame.LAME_MAXMP3BUFFER), l(e.header[e.w_ptr].write_timing >= v), e.header[e.w_ptr].write_timing == v && w(e), d[g] = 0), n = Math.min(s, S), S -= n, l((s -= n) < a), l(S < a), d[g] |= t >> s << S, v += n
                }
            }

            function A(e, t, s) {
                for (l(s < a - 2); s > 0;) {
                    var n;
                    0 == S && (S = 8, l(++g < Lame.LAME_MAXMP3BUFFER), d[g] = 0), n = Math.min(s, S), S -= n, l((s -= n) < a), l(S < a), d[g] |= t >> s << S, v += n
                }
            }

            function R(e, t) {
                var a, s = e.internal_flags;
                if (l(t >= 0), t >= 8 && (M(s, 76, 8), t -= 8), t >= 8 && (M(s, 65, 8), t -= 8), t >= 8 && (M(s, 77, 8), t -= 8), t >= 8 && (M(s, 69, 8), t -= 8), t >= 32) {
                    var n = m.getLameShortVersion();
                    if (t >= 32)
                        for (a = 0; a < n.length && t >= 8; ++a) t -= 8, M(s, n.charAt(a), 8)
                }
                for (; t >= 1; t -= 1) M(s, s.ancillary_flag, 1), s.ancillary_flag ^= e.disable_reservoir ? 0 : 1;
                l(0 == t)
            }

            function B(e, t, s) {
                for (var n = e.header[e.h_ptr].ptr; s > 0;) {
                    var r = Math.min(s, 8 - (7 & n));
                    l((s -= r) < a), e.header[e.h_ptr].buf[n >> 3] |= t >> s << 8 - (7 & n) - r, n += r
                }
                e.header[e.h_ptr].ptr = n
            }

            function y(e, a) {
                e <<= 8;
                for (var s = 0; s < 8; s++) 0 != (65536 & ((a <<= 1) ^ (e <<= 1))) && (a ^= t);
                return a
            }

            function E(e, t) {
                var a, s = c.ht[t.count1table_select + 32],
                    n = 0,
                    r = t.big_values,
                    _ = t.big_values;
                for (l(t.count1table_select < 2), a = (t.count1 - t.big_values) / 4; a > 0; --a) {
                    var i, o = 0,
                        f = 0;
                    0 != (i = t.l3_enc[r + 0]) && (f += 8, t.xr[_ + 0] < 0 && o++, l(i <= 1)), 0 != (i = t.l3_enc[r + 1]) && (f += 4, o *= 2, t.xr[_ + 1] < 0 && o++, l(i <= 1)), 0 != (i = t.l3_enc[r + 2]) && (f += 2, o *= 2, t.xr[_ + 2] < 0 && o++, l(i <= 1)), 0 != (i = t.l3_enc[r + 3]) && (f++, o *= 2, t.xr[_ + 3] < 0 && o++, l(i <= 1)), r += 4, _ += 4, M(e, o + s.table[f], s.hlen[f]), n += s.hlen[f]
                }
                return n
            }

            function T(e, t, s, n, r) {
                var _ = c.ht[t],
                    i = 0;
                if (l(t < 32), 0 == t) return i;
                for (var o = s; o < n; o += 2) {
                    var f = 0,
                        u = 0,
                        h = _.xlen,
                        b = _.xlen,
                        m = 0,
                        p = r.l3_enc[o],
                        d = r.l3_enc[o + 1];
                    if (0 != p && (r.xr[o] < 0 && m++, f--), t > 15) {
                        if (p > 14) {
                            var v = p - 15;
                            l(v <= _.linmax), m |= v << 1, u = h, p = 15
                        }
                        if (d > 14) {
                            var g = d - 15;
                            l(g <= _.linmax), m <<= h, m |= g, u += h, d = 15
                        }
                        b = 16
                    }
                    0 != d && (m <<= 1, r.xr[o + 1] < 0 && m++, f--), l((p | d) < 16), p = p * b + d, u -= f, f += _.hlen[p], l(f <= a), l(u <= a), M(e, _.table[p], f), M(e, m, u), i += f + u
                }
                return i
            }

            function k(e, t) {
                var a = 3 * e.scalefac_band.s[3];
                a > t.big_values && (a = t.big_values);
                var s = T(e, t.table_select[0], 0, a, t);
                return s += T(e, t.table_select[1], a, t.big_values, t)
            }

            function x(e, t) {
                var a, s, n, r;
                a = t.big_values, l(0 <= a && a <= 576);
                var _ = t.region0_count + 1;
                return l(0 <= _), l(_ < e.scalefac_band.l.length), n = e.scalefac_band.l[_], _ += t.region1_count + 1, l(0 <= _), l(_ < e.scalefac_band.l.length), r = e.scalefac_band.l[_], n > a && (n = a), r > a && (r = a), s = T(e, t.table_select[0], 0, n, t), s += T(e, t.table_select[1], n, r, t), s += T(e, t.table_select[2], r, a, t)
            }

            function P() {
                this.total = 0
            }

            function I(t, a) {
                var s, r, _, i, o, l = t.internal_flags;
                return o = l.w_ptr, -1 == (i = l.h_ptr - 1) && (i = h.MAX_HEADER_BUF - 1), s = l.header[i].write_timing - v, a.total = s, s >= 0 && (r = 1 + i - o, i < o && (r = 1 + i - o + h.MAX_HEADER_BUF), s -= 8 * r * l.sideinfo_len), s += _ = e.getframebits(t), a.total += _, a.total % 8 != 0 ? a.total = 1 + a.total / 8 : a.total = a.total / 8, a.total += g + 1, s < 0 && n.err.println("strange error flushing buffer ... \n"), s
            }
            this.getframebits = function(e) {
                var t, a = e.internal_flags;
                return t = 0 != a.bitrate_index ? c.bitrate_table[e.version][a.bitrate_index] : e.brate, l(8 <= t && t <= 640), 8 * (0 | 72e3 * (e.version + 1) * t / e.out_samplerate + a.padding)
            }, this.CRC_writeheader = function(e, t) {
                var a = 65535;
                a = y(255 & t[2], a), a = y(255 & t[3], a);
                for (var s = 6; s < e.sideinfo_len; s++) a = y(255 & t[s], a);
                t[4] = byte(a >> 8), t[5] = byte(255 & a)
            }, this.flush_bitstream = function(e) {
                var t, a, n = e.internal_flags,
                    r = n.h_ptr - 1;
                if (-1 == r && (r = h.MAX_HEADER_BUF - 1), t = n.l3_side, !((a = I(e, new P)) < 0)) {
                    if (R(e, a), l(n.header[r].write_timing + this.getframebits(e) == v), n.ResvSize = 0, t.main_data_begin = 0, n.findReplayGain) {
                        var _ = s.GetTitleGain(n.rgdata);
                        l(NEQ(_, GainAnalysis.GAIN_NOT_ENOUGH_SAMPLES)), n.RadioGain = 0 | Math.floor(10 * _ + .5)
                    }
                    n.findPeakSample && (n.noclipGainChange = 0 | Math.ceil(20 * Math.log10(n.PeakSample / 32767) * 10), n.noclipGainChange > 0 && (EQ(e.scale, 1) || EQ(e.scale, 0)) ? n.noclipScale = Math.floor(32767 / n.PeakSample * 100) / 100 : n.noclipScale = -1)
                }
            }, this.add_dummy_byte = function(e, t, a) {
                for (var s, n = e.internal_flags; a-- > 0;)
                    for (A(0, t, 8), s = 0; s < h.MAX_HEADER_BUF; ++s) n.header[s].write_timing += 8
            }, this.format_bitstream = function(e) {
                var t, a = e.internal_flags;
                t = a.l3_side;
                var s = this.getframebits(e);
                R(e, t.resvDrain_pre),
                    function(e, t) {
                        var a, s, _, i = e.internal_flags;
                        if (a = i.l3_side, i.header[i.h_ptr].ptr = 0, r.fill(i.header[i.h_ptr].buf, 0, i.sideinfo_len, 0), e.out_samplerate < 16e3 ? B(i, 4094, 12) : B(i, 4095, 12), B(i, e.version, 1), B(i, 1, 2), B(i, e.error_protection ? 0 : 1, 1), B(i, i.bitrate_index, 4), B(i, i.samplerate_index, 2), B(i, i.padding, 1), B(i, e.extension, 1), B(i, e.mode.ordinal(), 2), B(i, i.mode_ext, 2), B(i, e.copyright, 1), B(i, e.original, 1), B(i, e.emphasis, 2), e.error_protection && B(i, 0, 16), 1 == e.version) {
                            for (l(a.main_data_begin >= 0), B(i, a.main_data_begin, 9), 2 == i.channels_out ? B(i, a.private_bits, 3) : B(i, a.private_bits, 5), _ = 0; _ < i.channels_out; _++) {
                                var o;
                                for (o = 0; o < 4; o++) B(i, a.scfsi[_][o], 1)
                            }
                            for (s = 0; s < 2; s++)
                                for (_ = 0; _ < i.channels_out; _++) B(i, (f = a.tt[s][_]).part2_3_length + f.part2_length, 12), B(i, f.big_values / 2, 9), B(i, f.global_gain, 8), B(i, f.scalefac_compress, 4), f.block_type != u.NORM_TYPE ? (B(i, 1, 1), B(i, f.block_type, 2), B(i, f.mixed_block_flag, 1), 14 == f.table_select[0] && (f.table_select[0] = 16), B(i, f.table_select[0], 5), 14 == f.table_select[1] && (f.table_select[1] = 16), B(i, f.table_select[1], 5), B(i, f.subblock_gain[0], 3), B(i, f.subblock_gain[1], 3), B(i, f.subblock_gain[2], 3)) : (B(i, 0, 1), 14 == f.table_select[0] && (f.table_select[0] = 16), B(i, f.table_select[0], 5), 14 == f.table_select[1] && (f.table_select[1] = 16), B(i, f.table_select[1], 5), 14 == f.table_select[2] && (f.table_select[2] = 16), B(i, f.table_select[2], 5), l(0 <= f.region0_count && f.region0_count < 16), l(0 <= f.region1_count && f.region1_count < 8), B(i, f.region0_count, 4), B(i, f.region1_count, 3)), B(i, f.preflag, 1), B(i, f.scalefac_scale, 1), B(i, f.count1table_select, 1)
                        } else
                            for (l(a.main_data_begin >= 0), B(i, a.main_data_begin, 8), B(i, a.private_bits, i.channels_out), s = 0, _ = 0; _ < i.channels_out; _++) {
                                var f;
                                B(i, (f = a.tt[s][_]).part2_3_length + f.part2_length, 12), B(i, f.big_values / 2, 9), B(i, f.global_gain, 8), B(i, f.scalefac_compress, 9), f.block_type != u.NORM_TYPE ? (B(i, 1, 1), B(i, f.block_type, 2), B(i, f.mixed_block_flag, 1), 14 == f.table_select[0] && (f.table_select[0] = 16), B(i, f.table_select[0], 5), 14 == f.table_select[1] && (f.table_select[1] = 16), B(i, f.table_select[1], 5), B(i, f.subblock_gain[0], 3), B(i, f.subblock_gain[1], 3), B(i, f.subblock_gain[2], 3)) : (B(i, 0, 1), 14 == f.table_select[0] && (f.table_select[0] = 16), B(i, f.table_select[0], 5), 14 == f.table_select[1] && (f.table_select[1] = 16), B(i, f.table_select[1], 5), 14 == f.table_select[2] && (f.table_select[2] = 16), B(i, f.table_select[2], 5), l(0 <= f.region0_count && f.region0_count < 16), l(0 <= f.region1_count && f.region1_count < 8), B(i, f.region0_count, 4), B(i, f.region1_count, 3)), B(i, f.scalefac_scale, 1), B(i, f.count1table_select, 1)
                            }
                        e.error_protection && CRC_writeheader(i, i.header[i.h_ptr].buf);
                        var c = i.h_ptr;
                        l(i.header[c].ptr == 8 * i.sideinfo_len), i.h_ptr = c + 1 & h.MAX_HEADER_BUF - 1, i.header[i.h_ptr].write_timing = i.header[c].write_timing + t, i.h_ptr == i.w_ptr && n.err.println("Error: MAX_HEADER_BUF too small in bitstream.c \n")
                    }(e, s);
                var _ = 8 * a.sideinfo_len;
                if (_ += function(e) {
                        var t, a, s, n, r = 0,
                            _ = e.internal_flags,
                            i = _.l3_side;
                        if (1 == e.version)
                            for (t = 0; t < 2; t++)
                                for (a = 0; a < _.channels_out; a++) {
                                    var o = i.tt[t][a],
                                        c = f.slen1_tab[o.scalefac_compress],
                                        h = f.slen2_tab[o.scalefac_compress];
                                    for (n = 0, s = 0; s < o.sfbdivide; s++) - 1 != o.scalefac[s] && (M(_, o.scalefac[s], c), n += c);
                                    for (; s < o.sfbmax; s++) - 1 != o.scalefac[s] && (M(_, o.scalefac[s], h), n += h);
                                    l(n == o.part2_length), o.block_type == u.SHORT_TYPE ? n += k(_, o) : n += x(_, o), n += E(_, o), l(n == o.part2_3_length + o.part2_length), r += n
                                } else
                                    for (t = 0, a = 0; a < _.channels_out; a++) {
                                        o = i.tt[t][a];
                                        var b, m, p = 0;
                                        if (l(null != o.sfb_partition_table), n = 0, s = 0, m = 0, o.block_type == u.SHORT_TYPE) {
                                            for (; m < 4; m++) {
                                                var d = o.sfb_partition_table[m] / 3,
                                                    v = o.slen[m];
                                                for (b = 0; b < d; b++, s++) M(_, Math.max(o.scalefac[3 * s + 0], 0), v), M(_, Math.max(o.scalefac[3 * s + 1], 0), v), M(_, Math.max(o.scalefac[3 * s + 2], 0), v), p += 3 * v
                                            }
                                            n += k(_, o)
                                        } else {
                                            for (; m < 4; m++)
                                                for (d = o.sfb_partition_table[m], v = o.slen[m], b = 0; b < d; b++, s++) M(_, Math.max(o.scalefac[s], 0), v), p += v;
                                            n += x(_, o)
                                        }
                                        n += E(_, o), l(n == o.part2_3_length), l(p == o.part2_length), r += p + n
                                    }
                        return r
                    }(e), R(e, t.resvDrain_post), _ += t.resvDrain_post, t.main_data_begin += (s - _) / 8, I(e, new P) != a.ResvSize && n.err.println("Internal buffer inconsistency. flushbits <> ResvSize"), 8 * t.main_data_begin != a.ResvSize && (n.err.printf("bit reservoir error: \nl3_side.main_data_begin: %d \nResvoir size:             %d \nresv drain (post)         %d \nresv drain (pre)          %d \nheader and sideinfo:      %d \ndata bits:                %d \ntotal bits:               %d (remainder: %d) \nbitsperframe:             %d \n", 8 * t.main_data_begin, a.ResvSize, t.resvDrain_post, t.resvDrain_pre, 8 * a.sideinfo_len, _ - t.resvDrain_post - 8 * a.sideinfo_len, _, _ % 8, s), n.err.println("This is a fatal error.  It has several possible causes:"), n.err.println("90%%  LAME compiled with buggy version of gcc using advanced optimizations"), n.err.println(" 9%%  Your system is overclocked"), n.err.println(" 1%%  bug in LAME encoding library"), a.ResvSize = 8 * t.main_data_begin), l(v % 8 == 0), v > 1e9) {
                    var i;
                    for (i = 0; i < h.MAX_HEADER_BUF; ++i) a.header[i].write_timing -= v;
                    v = 0
                }
                return 0
            }, this.copy_buffer = function(e, t, a, r, _) {
                var f = g + 1;
                if (f <= 0) return 0;
                if (0 != r && f > r) return -1;
                if (n.arraycopy(d, 0, t, a, f), g = -1, S = 0, 0 != _) {
                    var c = o(1);
                    if (c[0] = e.nMusicCRC, p.updateMusicCRC(c, t, a, f), e.nMusicCRC = c[0], f > 0 && (e.VBR_seek_table.nBytesWritten += f), e.decode_on_the_fly)
                        for (var u, h = i([2, 1152]), m = f, v = -1; 0 != v;)
                            if (v = b.hip_decode1_unclipped(e.hip, t, a, m, h[0], h[1]), m = 0, -1 == v && (v = 0), v > 0) {
                                if (l(v <= 1152), e.findPeakSample) {
                                    for (u = 0; u < v; u++) h[0][u] > e.PeakSample ? e.PeakSample = h[0][u] : -h[0][u] > e.PeakSample && (e.PeakSample = -h[0][u]);
                                    if (e.channels_out > 1)
                                        for (u = 0; u < v; u++) h[1][u] > e.PeakSample ? e.PeakSample = h[1][u] : -h[1][u] > e.PeakSample && (e.PeakSample = -h[1][u])
                                }
                                if (e.findReplayGain && s.AnalyzeSamples(e.rgdata, h[0], 0, h[1], 0, v, e.channels_out) == GainAnalysis.GAIN_ANALYSIS_ERROR) return -6
                            }
                }
                return f
            }, this.init_bit_stream_w = function(e) {
                d = _(Lame.LAME_MAXMP3BUFFER), e.h_ptr = e.w_ptr = 0, e.header[e.h_ptr].write_timing = 0, g = -1, S = 0, v = 0
            }
        }
        b.EQ = function(e, t) {
            return Math.abs(e) > Math.abs(t) ? Math.abs(e - t) <= 1e-6 * Math.abs(e) : Math.abs(e - t) <= 1e-6 * Math.abs(t)
        }, b.NEQ = function(e, t) {
            return !b.EQ(e, t)
        }, e.exports = b
    },
    cl2l: function(e, t, a) {
        var s = a("Agby"),
            n = (s.System, s.VbrMode, s.Float, s.ShortBlock, s.Util, s.Arrays, s.new_array_n, s.new_byte, s.new_double, s.new_float),
            r = (s.new_float_n, s.new_int),
            _ = (s.new_int_n, s.assert, a("LyF0"));
        e.exports = function() {
            this.linprebuf = n(2 * _.MAX_ORDER), this.linpre = 0, this.lstepbuf = n(_.MAX_SAMPLES_PER_WINDOW + _.MAX_ORDER), this.lstep = 0, this.loutbuf = n(_.MAX_SAMPLES_PER_WINDOW + _.MAX_ORDER), this.lout = 0, this.rinprebuf = n(2 * _.MAX_ORDER), this.rinpre = 0, this.rstepbuf = n(_.MAX_SAMPLES_PER_WINDOW + _.MAX_ORDER), this.rstep = 0, this.routbuf = n(_.MAX_SAMPLES_PER_WINDOW + _.MAX_ORDER), this.rout = 0, this.sampleWindow = 0, this.totsamp = 0, this.lsum = 0, this.rsum = 0, this.freqindex = 0, this.first = 0, this.A = r(0 | _.STEPS_per_dB * _.MAX_dB), this.B = r(0 | _.STEPS_per_dB * _.MAX_dB)
        }
    },
    cnaB: function(e, t) {
        e.exports = function() {
            this.over_noise = 0, this.tot_noise = 0, this.max_noise = 0, this.over_count = 0, this.over_SSD = 0, this.bits = 0
        }
    },
    gQDO: function(e, t, a) {
        var s = a("Agby"),
            n = (s.System, s.VbrMode, s.Float, s.ShortBlock, s.Util),
            r = (s.Arrays, s.new_array_n, s.new_byte, s.new_double, s.new_float),
            _ = (s.new_float_n, s.new_int, s.new_int_n, s.assert, a("S14o"));
        e.exports = function() {
            var e = r(_.BLKSIZE),
                t = r(_.BLKSIZE_s / 2),
                a = [.9238795325112867, .3826834323650898, .9951847266721969, .0980171403295606, .9996988186962042, .02454122852291229, .9999811752826011, .006135884649154475];

            function s(e, t, s) {
                var r, _, i, o = 0,
                    l = t + (s <<= 1);
                r = 4;
                do {
                    var f, c, u, h, b, m, p;
                    p = r >> 1, m = (b = r << 1) + (h = r), r = b << 1, i = (_ = t) + p;
                    do {
                        A = e[_ + 0] - e[_ + h], M = e[_ + 0] + e[_ + h], E = e[_ + b] - e[_ + m], B = e[_ + b] + e[_ + m], e[_ + b] = M - B, e[_ + 0] = M + B, e[_ + m] = A - E, e[_ + h] = A + E, A = e[i + 0] - e[i + h], M = e[i + 0] + e[i + h], E = n.SQRT2 * e[i + m], B = n.SQRT2 * e[i + b], e[i + b] = M - B, e[i + 0] = M + B, e[i + m] = A - E, e[i + h] = A + E, i += r, _ += r
                    } while (_ < l);
                    for (c = a[o + 0], f = a[o + 1], u = 1; u < p; u++) {
                        var d, v;
                        d = 1 - 2 * f * f, v = 2 * f * c, _ = t + u, i = t + h - u;
                        do {
                            var g, S, w, M, A, R, B, y, E, T;
                            S = v * e[_ + h] - d * e[i + h], g = d * e[_ + h] + v * e[i + h], A = e[_ + 0] - g, M = e[_ + 0] + g, R = e[i + 0] - S, w = e[i + 0] + S, S = v * e[_ + m] - d * e[i + m], g = d * e[_ + m] + v * e[i + m], E = e[_ + b] - g, B = e[_ + b] + g, T = e[i + b] - S, y = e[i + b] + S, S = f * B - c * T, g = c * B + f * T, e[_ + b] = M - g, e[_ + 0] = M + g, e[i + m] = R - S, e[i + h] = R + S, S = c * y - f * E, g = f * y + c * E, e[i + b] = w - g, e[i + 0] = w + g, e[_ + m] = A - S, e[_ + h] = A + S, i += r, _ += r
                        } while (_ < l);
                        c = (d = c) * a[o + 0] - f * a[o + 1], f = d * a[o + 1] + f * a[o + 0]
                    }
                    o += 2
                } while (r < s)
            }
            var i = [0, 128, 64, 192, 32, 160, 96, 224, 16, 144, 80, 208, 48, 176, 112, 240, 8, 136, 72, 200, 40, 168, 104, 232, 24, 152, 88, 216, 56, 184, 120, 248, 4, 132, 68, 196, 36, 164, 100, 228, 20, 148, 84, 212, 52, 180, 116, 244, 12, 140, 76, 204, 44, 172, 108, 236, 28, 156, 92, 220, 60, 188, 124, 252, 2, 130, 66, 194, 34, 162, 98, 226, 18, 146, 82, 210, 50, 178, 114, 242, 10, 138, 74, 202, 42, 170, 106, 234, 26, 154, 90, 218, 58, 186, 122, 250, 6, 134, 70, 198, 38, 166, 102, 230, 22, 150, 86, 214, 54, 182, 118, 246, 14, 142, 78, 206, 46, 174, 110, 238, 30, 158, 94, 222, 62, 190, 126, 254];
            this.fft_short = function(e, a, n, r, o) {
                for (var l = 0; l < 3; l++) {
                    var f = _.BLKSIZE_s / 2,
                        c = 65535 & 192 * (l + 1),
                        u = _.BLKSIZE_s / 8 - 1;
                    do {
                        var h, b, m, p, d, v = 255 & i[u << 2];
                        b = (h = t[v] * r[n][o + v + c]) - (d = t[127 - v] * r[n][o + v + c + 128]), h += d, p = (m = t[v + 64] * r[n][o + v + c + 64]) - (d = t[63 - v] * r[n][o + v + c + 192]), m += d, f -= 4, a[l][f + 0] = h + m, a[l][f + 2] = h - m, a[l][f + 1] = b + p, a[l][f + 3] = b - p, b = (h = t[v + 1] * r[n][o + v + c + 1]) - (d = t[126 - v] * r[n][o + v + c + 129]), h += d, p = (m = t[v + 65] * r[n][o + v + c + 65]) - (d = t[62 - v] * r[n][o + v + c + 193]), m += d, a[l][f + _.BLKSIZE_s / 2 + 0] = h + m, a[l][f + _.BLKSIZE_s / 2 + 2] = h - m, a[l][f + _.BLKSIZE_s / 2 + 1] = b + p, a[l][f + _.BLKSIZE_s / 2 + 3] = b - p
                    } while (--u >= 0);
                    s(a[l], f, _.BLKSIZE_s / 2)
                }
            }, this.fft_long = function(t, a, n, r, o) {
                var l = _.BLKSIZE / 8 - 1,
                    f = _.BLKSIZE / 2;
                do {
                    var c, u, h, b, m, p = 255 & i[l];
                    u = (c = e[p] * r[n][o + p]) - (m = e[p + 512] * r[n][o + p + 512]), c += m, b = (h = e[p + 256] * r[n][o + p + 256]) - (m = e[p + 768] * r[n][o + p + 768]), h += m, a[0 + (f -= 4)] = c + h, a[f + 2] = c - h, a[f + 1] = u + b, a[f + 3] = u - b, u = (c = e[p + 1] * r[n][o + p + 1]) - (m = e[p + 513] * r[n][o + p + 513]), c += m, b = (h = e[p + 257] * r[n][o + p + 257]) - (m = e[p + 769] * r[n][o + p + 769]), h += m, a[f + _.BLKSIZE / 2 + 0] = c + h, a[f + _.BLKSIZE / 2 + 2] = c - h, a[f + _.BLKSIZE / 2 + 1] = u + b, a[f + _.BLKSIZE / 2 + 3] = u - b
                } while (--l >= 0);
                s(a, f, _.BLKSIZE / 2)
            }, this.init_fft = function(a) {
                for (var s = 0; s < _.BLKSIZE; s++) e[s] = .42 - .5 * Math.cos(2 * Math.PI * (s + .5) / _.BLKSIZE) + .08 * Math.cos(4 * Math.PI * (s + .5) / _.BLKSIZE);
                for (s = 0; s < _.BLKSIZE_s / 2; s++) t[s] = .5 * (1 - Math.cos(2 * Math.PI * (s + .5) / _.BLKSIZE_s))
            }
        }
    },
    jLoq: function(e, t) {
        e.exports = function() {
            this.getLameVersion = function() {
                return "3.98.4"
            }, this.getLameShortVersion = function() {
                return "3.98.4"
            }, this.getLameVeryShortVersion = function() {
                return "LAME3.98r"
            }, this.getPsyVersion = function() {
                return "0.93"
            }, this.getLameUrl = function() {
                return "http://www.mp3dev.org/"
            }, this.getLameOsBitness = function() {
                return "32bits"
            }
        }
    },
    lH8m: function(e, t, a) {
        var s = a("Z7J9");
        e.exports = function() {
            this.class_id = 0, this.num_samples = 0, this.num_channels = 0, this.in_samplerate = 0, this.out_samplerate = 0, this.scale = 0, this.scale_left = 0, this.scale_right = 0, this.analysis = !1, this.bWriteVbrTag = !1, this.decode_only = !1, this.quality = 0, this.mode = s.STEREO, this.force_ms = !1, this.free_format = !1, this.findReplayGain = !1, this.decode_on_the_fly = !1, this.write_id3tag_automatic = !1, this.brate = 0, this.compression_ratio = 0, this.copyright = 0, this.original = 0, this.extension = 0, this.emphasis = 0, this.error_protection = 0, this.strict_ISO = !1, this.disable_reservoir = !1, this.quant_comp = 0, this.quant_comp_short = 0, this.experimentalY = !1, this.experimentalZ = 0, this.exp_nspsytune = 0, this.preset = 0, this.VBR = null, this.VBR_q_frac = 0, this.VBR_q = 0, this.VBR_mean_bitrate_kbps = 0, this.VBR_min_bitrate_kbps = 0, this.VBR_max_bitrate_kbps = 0, this.VBR_hard_min = 0, this.lowpassfreq = 0, this.highpassfreq = 0, this.lowpasswidth = 0, this.highpasswidth = 0, this.maskingadjust = 0, this.maskingadjust_short = 0, this.ATHonly = !1, this.ATHshort = !1, this.noATH = !1, this.ATHtype = 0, this.ATHcurve = 0, this.ATHlower = 0, this.athaa_type = 0, this.athaa_loudapprox = 0, this.athaa_sensitivity = 0, this.short_blocks = null, this.useTemporal = !1, this.interChRatio = 0, this.msfix = 0, this.tune = !1, this.tune_value_a = 0, this.version = 0, this.encoder_delay = 0, this.encoder_padding = 0, this.framesize = 0, this.frameNum = 0, this.lame_allocated_gfp = 0, this.internal_flags = null
        }
    },
    mCij: function(e, t, a) {
        var s = a("S14o"),
            n = {};
        n.SFBMAX = 3 * s.SBMAX_s, e.exports = n
    },
    obch: function(e, t, a) {
        var s = a("S14o"),
            n = a("Agby"),
            r = n.System,
            _ = (n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float),
            i = n.new_float_n;
        n.new_int, n.new_int_n, n.assert;
        e.exports = function() {
            this.l = _(s.SBMAX_l), this.s = i([s.SBMAX_s, 3]);
            var e = this;
            this.assign = function(t) {
                r.arraycopy(t.l, 0, e.l, 0, s.SBMAX_l);
                for (var a = 0; a < s.SBMAX_s; a++)
                    for (var n = 0; n < 3; n++) e.s[a][n] = t.s[a][n]
            }
        }
    },
    omqh: function(e, t) {
        e.exports = function() {
            this.setModules = function(e, t) {}
        }
    },
    "q/UI": function(e, t, a) {
        var s = a("Agby"),
            n = (s.System, s.VbrMode, s.Float, s.ShortBlock, s.Util, s.Arrays, s.new_array_n, s.new_byte, s.new_double, s.new_float),
            r = (s.new_float_n, s.new_int, s.new_int_n, s.assert, a("S14o"));
        e.exports = function() {
            this.useAdjust = 0, this.aaSensitivityP = 0, this.adjust = 0, this.adjustLimit = 0, this.decay = 0, this.floor = 0, this.l = n(r.SBMAX_l), this.s = n(r.SBMAX_s), this.psfb21 = n(r.PSFB21), this.psfb12 = n(r.PSFB12), this.cb_l = n(r.CBANDS), this.cb_s = n(r.CBANDS), this.eql_w = n(r.BLKSIZE / 2)
        }
    },
    sFw1: function(e, t, a) {
        a("7DDg")("Int8", 1, function(e) {
            return function(t, a, s) {
                return e(this, t, a, s)
            }
        })
    },
    uyIQ: function(e, t, a) {
        var s = a("/4Hr"),
            n = a("Agby"),
            r = (n.System, n.VbrMode),
            _ = n.Float,
            i = (n.ShortBlock, n.Util),
            o = (n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float),
            l = (n.new_float_n, n.new_int),
            f = (n.new_int_n, n.assert),
            c = a("S14o"),
            u = a("8FI/"),
            h = a("vYvw");

        function b() {
            var e = null,
                t = null,
                a = null;

            function n(e) {
                return f(0 <= e + b.Q_MAX2 && e < b.Q_MAX), S[e + b.Q_MAX2]
            }
            this.setModules = function(s, n, r) {
                e = s, t = n, a = r
            }, this.IPOW20 = function(e) {
                return f(0 <= e && e < b.Q_MAX), w[e]
            };
            var m = b.IXMAX_VAL + 2,
                p = b.Q_MAX,
                d = b.Q_MAX2,
                v = (b.LARGE_BITS, 100);
            this.nr_of_sfb_block = [
                [
                    [6, 5, 5, 5],
                    [9, 9, 9, 9],
                    [6, 9, 9, 9]
                ],
                [
                    [6, 5, 7, 3],
                    [9, 9, 12, 6],
                    [6, 9, 12, 6]
                ],
                [
                    [11, 10, 0, 0],
                    [18, 18, 0, 0],
                    [15, 18, 0, 0]
                ],
                [
                    [7, 7, 7, 0],
                    [12, 12, 12, 0],
                    [6, 15, 12, 0]
                ],
                [
                    [6, 6, 6, 3],
                    [12, 9, 9, 6],
                    [6, 12, 9, 6]
                ],
                [
                    [8, 8, 5, 0],
                    [15, 12, 9, 0],
                    [6, 18, 9, 0]
                ]
            ];
            var g = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 3, 2, 0];
            this.pretab = g, this.sfBandIndex = [new s([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0, 4, 8, 12, 18, 24, 32, 42, 56, 74, 100, 132, 174, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new s([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 114, 136, 162, 194, 232, 278, 332, 394, 464, 540, 576], [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 136, 180, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new s([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new s([0, 4, 8, 12, 16, 20, 24, 30, 36, 44, 52, 62, 74, 90, 110, 134, 162, 196, 238, 288, 342, 418, 576], [0, 4, 8, 12, 16, 22, 30, 40, 52, 66, 84, 106, 136, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new s([0, 4, 8, 12, 16, 20, 24, 30, 36, 42, 50, 60, 72, 88, 106, 128, 156, 190, 230, 276, 330, 384, 576], [0, 4, 8, 12, 16, 22, 28, 38, 50, 64, 80, 100, 126, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new s([0, 4, 8, 12, 16, 20, 24, 30, 36, 44, 54, 66, 82, 102, 126, 156, 194, 240, 296, 364, 448, 550, 576], [0, 4, 8, 12, 16, 22, 30, 42, 58, 78, 104, 138, 180, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new s([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new s([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new s([0, 12, 24, 36, 48, 60, 72, 88, 108, 132, 160, 192, 232, 280, 336, 400, 476, 566, 568, 570, 572, 574, 576], [0, 8, 16, 24, 36, 52, 72, 96, 124, 160, 162, 164, 166, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0])];
            var S = o(p + d + 1),
                w = o(p),
                M = o(m),
                A = o(m);

            function R(e, t) {
                var s = a.ATHformula(t, e);
                return s -= v, s = Math.pow(10, s / 10 + e.ATHlower)
            }

            function B(e) {
                this.s = e
            }
            this.adj43 = A, this.iteration_init = function(t) {
                var a, s = t.internal_flags,
                    n = s.l3_side;
                if (0 == s.iteration_init_init) {
                    for (s.iteration_init_init = 1, n.main_data_begin = 0, function(e) {
                            for (var t = e.internal_flags.ATH.l, a = e.internal_flags.ATH.psfb21, s = e.internal_flags.ATH.s, n = e.internal_flags.ATH.psfb12, r = e.internal_flags, i = e.out_samplerate, o = 0; o < c.SBMAX_l; o++) {
                                var l = r.scalefac_band.l[o],
                                    f = r.scalefac_band.l[o + 1];
                                t[o] = _.MAX_VALUE;
                                for (var u = l; u < f; u++) {
                                    var h = R(e, u * i / 1152);
                                    t[o] = Math.min(t[o], h)
                                }
                            }
                            for (o = 0; o < c.PSFB21; o++)
                                for (l = r.scalefac_band.psfb21[o], f = r.scalefac_band.psfb21[o + 1], a[o] = _.MAX_VALUE, u = l; u < f; u++) h = R(e, u * i / 1152), a[o] = Math.min(a[o], h);
                            for (o = 0; o < c.SBMAX_s; o++) {
                                for (l = r.scalefac_band.s[o], f = r.scalefac_band.s[o + 1], s[o] = _.MAX_VALUE, u = l; u < f; u++) h = R(e, u * i / 384), s[o] = Math.min(s[o], h);
                                s[o] *= r.scalefac_band.s[o + 1] - r.scalefac_band.s[o]
                            }
                            for (o = 0; o < c.PSFB12; o++) {
                                for (l = r.scalefac_band.psfb12[o], f = r.scalefac_band.psfb12[o + 1], n[o] = _.MAX_VALUE, u = l; u < f; u++) h = R(e, u * i / 384), n[o] = Math.min(n[o], h);
                                n[o] *= r.scalefac_band.s[13] - r.scalefac_band.s[12]
                            }
                            if (e.noATH) {
                                for (o = 0; o < c.SBMAX_l; o++) t[o] = 1e-20;
                                for (o = 0; o < c.PSFB21; o++) a[o] = 1e-20;
                                for (o = 0; o < c.SBMAX_s; o++) s[o] = 1e-20;
                                for (o = 0; o < c.PSFB12; o++) n[o] = 1e-20
                            }
                            r.ATH.floor = 10 * Math.log10(R(e, -1))
                        }(t), M[0] = 0, a = 1; a < m; a++) M[a] = Math.pow(a, 4 / 3);
                    for (a = 0; a < m - 1; a++) A[a] = a + 1 - Math.pow(.5 * (M[a] + M[a + 1]), .75);
                    for (A[a] = .5, a = 0; a < p; a++) w[a] = Math.pow(2, -.1875 * (a - 210));
                    for (a = 0; a <= p + d; a++) S[a] = Math.pow(2, .25 * (a - 210 - d));
                    var r, i, o, l;
                    for (e.huffman_init(s), (a = t.exp_nspsytune >> 2 & 63) >= 32 && (a -= 64), r = Math.pow(10, a / 4 / 10), (a = t.exp_nspsytune >> 8 & 63) >= 32 && (a -= 64), i = Math.pow(10, a / 4 / 10), (a = t.exp_nspsytune >> 14 & 63) >= 32 && (a -= 64), o = Math.pow(10, a / 4 / 10), (a = t.exp_nspsytune >> 20 & 63) >= 32 && (a -= 64), l = o * Math.pow(10, a / 4 / 10), a = 0; a < c.SBMAX_l; a++) {
                        f = a <= 6 ? r : a <= 13 ? i : a <= 20 ? o : l, s.nsPsy.longfact[a] = f
                    }
                    for (a = 0; a < c.SBMAX_s; a++) {
                        var f;
                        f = a <= 5 ? r : a <= 10 ? i : a <= 11 ? o : l, s.nsPsy.shortfact[a] = f
                    }
                }
            }, this.on_pe = function(e, a, s, n, r, _) {
                var i, o, c = e.internal_flags,
                    b = 0,
                    m = l(2),
                    p = new u(b),
                    d = t.ResvMaxBits(e, n, p, _),
                    v = (b = p.bits) + d;
                for (v > h.MAX_BITS_PER_GRANULE && (v = h.MAX_BITS_PER_GRANULE), i = 0, o = 0; o < c.channels_out; ++o) s[o] = Math.min(h.MAX_BITS_PER_CHANNEL, b / c.channels_out), m[o] = 0 | s[o] * a[r][o] / 700 - s[o], m[o] > 3 * n / 4 && (m[o] = 3 * n / 4), m[o] < 0 && (m[o] = 0), m[o] + s[o] > h.MAX_BITS_PER_CHANNEL && (m[o] = Math.max(0, h.MAX_BITS_PER_CHANNEL - s[o])), i += m[o];
                if (i > d)
                    for (o = 0; o < c.channels_out; ++o) m[o] = d * m[o] / i;
                for (o = 0; o < c.channels_out; ++o) s[o] += m[o], d -= m[o];
                for (i = 0, o = 0; o < c.channels_out; ++o) i += s[o];
                if (i > h.MAX_BITS_PER_GRANULE) {
                    var g = 0;
                    for (o = 0; o < c.channels_out; ++o) s[o] *= h.MAX_BITS_PER_GRANULE, s[o] /= i, g += s[o];
                    f(g <= h.MAX_BITS_PER_GRANULE)
                }
                return v
            }, this.reduce_side = function(e, t, a, s) {
                f(s <= h.MAX_BITS_PER_GRANULE), f(e[0] + e[1] <= h.MAX_BITS_PER_GRANULE);
                var n = .33 * (.5 - t) / .5;
                n < 0 && (n = 0), n > .5 && (n = .5);
                var r = 0 | .5 * n * (e[0] + e[1]);
                r > h.MAX_BITS_PER_CHANNEL - e[0] && (r = h.MAX_BITS_PER_CHANNEL - e[0]), r < 0 && (r = 0), e[1] >= 125 && (e[1] - r > 125 ? (e[0] < a && (e[0] += r), e[1] -= r) : (e[0] += e[1] - 125, e[1] = 125)), (r = e[0] + e[1]) > s && (e[0] = s * e[0] / r, e[1] = s * e[1] / r), f(e[0] <= h.MAX_BITS_PER_CHANNEL), f(e[1] <= h.MAX_BITS_PER_CHANNEL), f(e[0] + e[1] <= h.MAX_BITS_PER_GRANULE)
            }, this.athAdjust = function(e, t, a) {
                var s = 90.30873362,
                    n = i.FAST_LOG10_X(t, 10),
                    r = e * e,
                    _ = 0;
                return n -= a, r > 1e-20 && (_ = 1 + i.FAST_LOG10_X(r, 10 / s)), _ < 0 && (_ = 0), n *= _, n += a + s - 94.82444863, Math.pow(10, .1 * n)
            }, this.calc_xmin = function(e, t, a, s) {
                var n, _ = 0,
                    i = e.internal_flags,
                    o = 0,
                    l = 0,
                    f = i.ATH,
                    u = a.xr,
                    h = e.VBR == r.vbr_mtrh ? 1 : 0,
                    b = i.masking_lower;
                for (e.VBR != r.vbr_mtrh && e.VBR != r.vbr_mt || (b = 1), n = 0; n < a.psy_lmax; n++) {
                    M = (w = e.VBR == r.vbr_rh || e.VBR == r.vbr_mtrh ? athAdjust(f.adjust, f.l[n], f.floor) : f.adjust * f.l[n]) / (v = a.width[n]), A = 2.220446049250313e-16, E = v >> 1, y = 0;
                    do {
                        y += T = u[o] * u[o], A += T < M ? T : M, y += k = u[++o] * u[o], A += k < M ? k : M, o++
                    } while (--E > 0);
                    if (y > w && l++, n == c.SBPSY_l) A < (B = w * i.nsPsy.longfact[n]) && (A = B);
                    if (0 != h && (w = A), !e.ATHonly)
                        if ((R = t.en.l[n]) > 0) B = y * t.thm.l[n] * b / R, 0 != h && (B *= i.nsPsy.longfact[n]), w < B && (w = B);
                    s[_++] = 0 != h ? w : w * i.nsPsy.longfact[n]
                }
                var m = 575;
                if (a.block_type != c.SHORT_TYPE)
                    for (var p = 576; 0 != p-- && BitStream.EQ(u[p], 0);) m = p;
                a.max_nonzero_coeff = m;
                for (var d = a.sfb_smin; n < a.psymax; d++, n += 3) {
                    var v, g, S;
                    for (S = e.VBR == r.vbr_rh || e.VBR == r.vbr_mtrh ? athAdjust(f.adjust, f.s[d], f.floor) : f.adjust * f.s[d], v = a.width[n], g = 0; g < 3; g++) {
                        var w, M, A, R, B, y = 0,
                            E = v >> 1;
                        M = S / v, A = 2.220446049250313e-16;
                        do {
                            var T, k;
                            y += T = u[o] * u[o], A += T < M ? T : M, y += k = u[++o] * u[o], A += k < M ? k : M, o++
                        } while (--E > 0);
                        if (y > S && l++, d == c.SBPSY_s) A < (B = S * i.nsPsy.shortfact[d]) && (A = B);
                        if (w = 0 != h ? A : S, !e.ATHonly && !e.ATHshort)
                            if ((R = t.en.s[d][g]) > 0) B = y * t.thm.s[d][g] * b / R, 0 != h && (B *= i.nsPsy.shortfact[d]), w < B && (w = B);
                        s[_++] = 0 != h ? w : w * i.nsPsy.shortfact[d]
                    }
                    e.useTemporal && (s[_ - 3] > s[_ - 3 + 1] && (s[_ - 3 + 1] += (s[_ - 3] - s[_ - 3 + 1]) * i.decay), s[_ - 3 + 1] > s[_ - 3 + 2] && (s[_ - 3 + 2] += (s[_ - 3 + 1] - s[_ - 3 + 2]) * i.decay))
                }
                return l
            }, this.calc_noise_core = function(e, t, a, s) {
                var n = 0,
                    r = t.s,
                    _ = e.l3_enc;
                if (r > e.count1)
                    for (; 0 != a--;) {
                        l = e.xr[r], r++, n += l * l, l = e.xr[r], r++, n += l * l
                    } else if (r > e.big_values) {
                        var i = o(2);
                        for (i[0] = 0, i[1] = s; 0 != a--;) {
                            l = Math.abs(e.xr[r]) - i[_[r]], r++, n += l * l, l = Math.abs(e.xr[r]) - i[_[r]], r++, n += l * l
                        }
                    } else
                        for (; 0 != a--;) {
                            var l;
                            l = Math.abs(e.xr[r]) - M[_[r]] * s, r++, n += l * l, l = Math.abs(e.xr[r]) - M[_[r]] * s, r++, n += l * l
                        }
                return t.s = r, n
            }, this.calc_noise = function(e, t, a, s, r) {
                var _, o, l = 0,
                    f = 0,
                    c = 0,
                    u = 0,
                    h = 0,
                    b = -20,
                    m = 0,
                    p = e.scalefac,
                    d = 0;
                for (s.over_SSD = 0, _ = 0; _ < e.psymax; _++) {
                    var v, S = e.global_gain - (p[d++] + (0 != e.preflag ? g[_] : 0) << e.scalefac_scale + 1) - 8 * e.subblock_gain[e.window[_]],
                        w = 0;
                    if (null != r && r.step[_] == S) w = r.noise[_], m += e.width[_], a[l++] = w / t[f++], w = r.noise_log[_];
                    else {
                        var M, A = n(S);
                        if (o = e.width[_] >> 1, m + e.width[_] > e.max_nonzero_coeff) o = (M = e.max_nonzero_coeff - m + 1) > 0 ? M >> 1 : 0;
                        var R = new B(m);
                        w = this.calc_noise_core(e, R, o, A), m = R.s, null != r && (r.step[_] = S, r.noise[_] = w), w = a[l++] = w / t[f++], w = i.FAST_LOG10(Math.max(w, 1e-20)), null != r && (r.noise_log[_] = w)
                    }
                    if (null != r && (r.global_gain = e.global_gain), h += w, w > 0) v = Math.max(0 | 10 * w + .5, 1), s.over_SSD += v * v, c++, u += w;
                    b = Math.max(b, w)
                }
                return s.over_count = c, s.tot_noise = h, s.over_noise = u, s.max_noise = b, c
            }, this.set_pinfo = function(e, t, a, s, n) {
                var r, _, i, l, u, h = e.internal_flags,
                    b = 0 == t.scalefac_scale ? .5 : 1,
                    m = t.scalefac,
                    p = o(L3Side.SFBMAX),
                    d = o(L3Side.SFBMAX),
                    v = new CalcNoiseResult;
                calc_xmin(e, a, t, p), calc_noise(t, p, d, v, null);
                var S = 0;
                for (_ = t.sfb_lmax, t.block_type != c.SHORT_TYPE && 0 == t.mixed_block_flag && (_ = 22), r = 0; r < _; r++) {
                    var w = h.scalefac_band.l[r],
                        M = (A = h.scalefac_band.l[r + 1]) - w;
                    for (l = 0; S < A; S++) l += t.xr[S] * t.xr[S];
                    l /= M, u = 1e15, h.pinfo.en[s][n][r] = u * l, h.pinfo.xfsf[s][n][r] = u * p[r] * d[r] / M, a.en.l[r] > 0 && !e.ATHonly ? l /= a.en.l[r] : l = 0, h.pinfo.thr[s][n][r] = u * Math.max(l * a.thm.l[r], h.ATH.l[r]), h.pinfo.LAMEsfb[s][n][r] = 0, 0 != t.preflag && r >= 11 && (h.pinfo.LAMEsfb[s][n][r] = -b * g[r]), r < c.SBPSY_l && (f(m[r] >= 0), h.pinfo.LAMEsfb[s][n][r] -= b * m[r])
                }
                if (t.block_type == c.SHORT_TYPE)
                    for (_ = r, r = t.sfb_smin; r < c.SBMAX_s; r++) {
                        w = h.scalefac_band.s[r], M = (A = h.scalefac_band.s[r + 1]) - w;
                        for (var A, R = 0; R < 3; R++) {
                            for (l = 0, i = w; i < A; i++) l += t.xr[S] * t.xr[S], S++;
                            l = Math.max(l / M, 1e-20), u = 1e15, h.pinfo.en_s[s][n][3 * r + R] = u * l, h.pinfo.xfsf_s[s][n][3 * r + R] = u * p[_] * d[_] / M, a.en.s[r][R] > 0 ? l /= a.en.s[r][R] : l = 0, (e.ATHonly || e.ATHshort) && (l = 0), h.pinfo.thr_s[s][n][3 * r + R] = u * Math.max(l * a.thm.s[r][R], h.ATH.s[r]), h.pinfo.LAMEsfb_s[s][n][3 * r + R] = -2 * t.subblock_gain[R], r < c.SBPSY_s && (h.pinfo.LAMEsfb_s[s][n][3 * r + R] -= b * m[_]), _++
                        }
                    }
                h.pinfo.LAMEqss[s][n] = t.global_gain, h.pinfo.LAMEmainbits[s][n] = t.part2_3_length + t.part2_length, h.pinfo.LAMEsfbits[s][n] = t.part2_length, h.pinfo.over[s][n] = v.over_count, h.pinfo.max_noise[s][n] = 10 * v.max_noise, h.pinfo.over_noise[s][n] = 10 * v.over_noise, h.pinfo.tot_noise[s][n] = 10 * v.tot_noise, h.pinfo.over_SSD[s][n] = v.over_SSD
            }
        }
        b.Q_MAX = 257, b.Q_MAX2 = 116, b.LARGE_BITS = 1e5, b.IXMAX_VAL = 8206, e.exports = b
    },
    vYvw: function(e, t, a) {
        var s = a("Agby"),
            n = (s.System, s.VbrMode, s.Float, s.ShortBlock, s.Util, s.Arrays, s.new_array_n, s.new_byte),
            r = s.new_double,
            _ = s.new_float,
            i = s.new_float_n,
            o = s.new_int,
            l = s.new_int_n,
            f = (s.assert, a("JpUa")),
            c = a("/4Hr"),
            u = a("wL4T"),
            h = a("JGZy"),
            b = a("obch"),
            m = a("S14o"),
            p = a("mCij");

        function d() {
            var e = 40;

            function t() {
                this.write_timing = 0, this.ptr = 0, this.buf = n(e)
            }
            this.Class_ID = 0, this.lame_encode_frame_init = 0, this.iteration_init_init = 0, this.fill_buffer_resample_init = 0, this.mfbuf = i([2, d.MFSIZE]), this.mode_gr = 0, this.channels_in = 0, this.channels_out = 0, this.resample_ratio = 0, this.mf_samples_to_encode = 0, this.mf_size = 0, this.VBR_min_bitrate = 0, this.VBR_max_bitrate = 0, this.bitrate_index = 0, this.samplerate_index = 0, this.mode_ext = 0, this.lowpass1 = 0, this.lowpass2 = 0, this.highpass1 = 0, this.highpass2 = 0, this.noise_shaping = 0, this.noise_shaping_amp = 0, this.substep_shaping = 0, this.psymodel = 0, this.noise_shaping_stop = 0, this.subblock_gain = 0, this.use_best_huffman = 0, this.full_outer_loop = 0, this.l3_side = new f, this.ms_ratio = _(2), this.padding = 0, this.frac_SpF = 0, this.slot_lag = 0, this.tag_spec = null, this.nMusicCRC = 0, this.OldValue = o(2), this.CurrentStep = o(2), this.masking_lower = 0, this.bv_scf = o(576), this.pseudohalf = o(p.SFBMAX), this.sfb21_extra = !1, this.inbuf_old = new Array(2), this.blackfilt = new Array(2 * d.BPC + 1), this.itime = r(2), this.sideinfo_len = 0, this.sb_sample = i([2, 2, 18, m.SBLIMIT]), this.amp_filter = _(32), this.header = new Array(d.MAX_HEADER_BUF), this.h_ptr = 0, this.w_ptr = 0, this.ancillary_flag = 0, this.ResvSize = 0, this.ResvMax = 0, this.scalefac_band = new c, this.minval_l = _(m.CBANDS), this.minval_s = _(m.CBANDS), this.nb_1 = i([4, m.CBANDS]), this.nb_2 = i([4, m.CBANDS]), this.nb_s1 = i([4, m.CBANDS]), this.nb_s2 = i([4, m.CBANDS]), this.s3_ss = null, this.s3_ll = null, this.decay = 0, this.thm = new Array(4), this.en = new Array(4), this.tot_ener = _(4), this.loudness_sq = i([2, 2]), this.loudness_sq_save = _(2), this.mld_l = _(m.SBMAX_l), this.mld_s = _(m.SBMAX_s), this.bm_l = o(m.SBMAX_l), this.bo_l = o(m.SBMAX_l), this.bm_s = o(m.SBMAX_s), this.bo_s = o(m.SBMAX_s), this.npart_l = 0, this.npart_s = 0, this.s3ind = l([m.CBANDS, 2]), this.s3ind_s = l([m.CBANDS, 2]), this.numlines_s = o(m.CBANDS), this.numlines_l = o(m.CBANDS), this.rnumlines_l = _(m.CBANDS), this.mld_cb_l = _(m.CBANDS), this.mld_cb_s = _(m.CBANDS), this.numlines_s_num1 = 0, this.numlines_l_num1 = 0, this.pe = _(4), this.ms_ratio_s_old = 0, this.ms_ratio_l_old = 0, this.ms_ener_ratio_old = 0, this.blocktype_old = o(2), this.nsPsy = new u, this.VBR_seek_table = new h, this.ATH = null, this.PSY = null, this.nogap_total = 0, this.nogap_current = 0, this.decode_on_the_fly = !0, this.findReplayGain = !0, this.findPeakSample = !0, this.PeakSample = 0, this.RadioGain = 0, this.AudiophileGain = 0, this.rgdata = null, this.noclipGainChange = 0, this.noclipScale = 0, this.bitrate_stereoMode_Hist = l([16, 5]), this.bitrate_blockType_Hist = l([16, 6]), this.pinfo = null, this.hip = null, this.in_buffer_nsamples = 0, this.in_buffer_0 = null, this.in_buffer_1 = null, this.iteration_loop = null;
            for (var a = 0; a < this.en.length; a++) this.en[a] = new b;
            for (a = 0; a < this.thm.length; a++) this.thm[a] = new b;
            for (a = 0; a < this.header.length; a++) this.header[a] = new t
        }
        d.MFSIZE = 3456 + m.ENCDELAY - m.MDCTDELAY, d.MAX_HEADER_BUF = 256, d.MAX_BITS_PER_CHANNEL = 4095, d.MAX_BITS_PER_GRANULE = 7680, d.BPC = 320, e.exports = d
    },
    wL4T: function(e, t, a) {
        var s = a("Agby"),
            n = (s.System, s.VbrMode, s.Float, s.ShortBlock, s.Util, s.Arrays, s.new_array_n, s.new_byte, s.new_double, s.new_float),
            r = s.new_float_n,
            _ = s.new_int,
            i = (s.new_int_n, s.assert, a("S14o"));
        e.exports = function() {
            this.last_en_subshort = r([4, 9]), this.lastAttacks = _(4), this.pefirbuf = n(19), this.longfact = n(i.SBMAX_l), this.shortfact = n(i.SBMAX_s), this.attackthre = 0, this.attackthre_s = 0
        }
    }
});