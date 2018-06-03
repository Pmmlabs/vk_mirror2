! function(e) {
    function a(s) {
        if (t[s]) return t[s].exports;
        var n = t[s] = {
            i: s,
            l: !1,
            exports: {}
        };
        return e[s].call(n.exports, n, n.exports, a), n.l = !0, n.exports
    }
    var t = {};
    return a.m = e, a.c = t, a.d = function(e, t, s) {
        a.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: s
        })
    }, a.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, a.t = function(e, t) {
        if (1 & t && (e = a(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var s = Object.create(null);
        if (a.r(s), Object.defineProperty(s, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var n in e) a.d(s, n, function(a) {
                return e[a]
            }.bind(null, n));
        return s
    }, a.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e["default"]
        } : function() {
            return e
        };
        return a.d(t, "a", t), t
    }, a.o = function(e, a) {
        return Object.prototype.hasOwnProperty.call(e, a)
    }, a.p = "", a(a.s = 218)
}({
    149: function(e, a) {
        function t() {
            this.over_noise = 0, this.tot_noise = 0, this.max_noise = 0, this.over_count = 0, this.over_SSD = 0, this.bits = 0
        }
        e.exports = t
    },
    151: function(e, a, t) {
        function s() {
            function e(e, a, t) {
                var n, _, i, o = 0;
                t <<= 1;
                var l = a + t;
                n = 4;
                do {
                    var f, c, u, h, b, m, p;
                    p = n >> 1, h = n, b = n << 1, m = b + h, n = b << 1, _ = a, i = _ + p;
                    do {
                        var v, d, g, S;
                        d = e[_ + 0] - e[_ + h], v = e[_ + 0] + e[_ + h], S = e[_ + b] - e[_ + m], g = e[_ + b] + e[_ + m], e[_ + b] = v - g, e[_ + 0] = v + g, e[_ + m] = d - S, e[_ + h] = d + S, d = e[i + 0] - e[i + h], v = e[i + 0] + e[i + h], S = r.SQRT2 * e[i + m], g = r.SQRT2 * e[i + b], e[i + b] = v - g, e[i + 0] = v + g, e[i + m] = d - S, e[i + h] = d + S, i += n, _ += n
                    } while (l > _);
                    for (c = s[o + 0], f = s[o + 1], u = 1; p > u; u++) {
                        var M, w;
                        M = 1 - 2 * f * f, w = 2 * f * c, _ = a + u, i = a + h - u;
                        do {
                            var A, R, B, v, d, y, g, E, S, T;
                            R = w * e[_ + h] - M * e[i + h], A = M * e[_ + h] + w * e[i + h], d = e[_ + 0] - A, v = e[_ + 0] + A, y = e[i + 0] - R, B = e[i + 0] + R, R = w * e[_ + m] - M * e[i + m], A = M * e[_ + m] + w * e[i + m], S = e[_ + b] - A, g = e[_ + b] + A, T = e[i + b] - R, E = e[i + b] + R, R = f * g - c * T, A = c * g + f * T, e[_ + b] = v - A, e[_ + 0] = v + A, e[i + m] = y - R, e[i + h] = y + R, R = c * E - f * S, A = f * E + c * S, e[i + b] = B - A, e[i + 0] = B + A, e[_ + m] = d - R, e[_ + h] = d + R, i += n, _ += n
                        } while (l > _);
                        M = c, c = M * s[o + 0] - f * s[o + 1], f = M * s[o + 1] + f * s[o + 0]
                    }
                    o += 2
                } while (t > n)
            }
            var a = _(i.BLKSIZE),
                t = _(i.BLKSIZE_s / 2),
                s = [.9238795325112867, .3826834323650898, .9951847266721969, .0980171403295606, .9996988186962042, .02454122852291229, .9999811752826011, .006135884649154475],
                n = [0, 128, 64, 192, 32, 160, 96, 224, 16, 144, 80, 208, 48, 176, 112, 240, 8, 136, 72, 200, 40, 168, 104, 232, 24, 152, 88, 216, 56, 184, 120, 248, 4, 132, 68, 196, 36, 164, 100, 228, 20, 148, 84, 212, 52, 180, 116, 244, 12, 140, 76, 204, 44, 172, 108, 236, 28, 156, 92, 220, 60, 188, 124, 252, 2, 130, 66, 194, 34, 162, 98, 226, 18, 146, 82, 210, 50, 178, 114, 242, 10, 138, 74, 202, 42, 170, 106, 234, 26, 154, 90, 218, 58, 186, 122, 250, 6, 134, 70, 198, 38, 166, 102, 230, 22, 150, 86, 214, 54, 182, 118, 246, 14, 142, 78, 206, 46, 174, 110, 238, 30, 158, 94, 222, 62, 190, 126, 254];
            this.fft_short = function(a, s, r, _, o) {
                for (var l = 0; 3 > l; l++) {
                    var f = i.BLKSIZE_s / 2,
                        c = 65535 & 192 * (l + 1),
                        u = i.BLKSIZE_s / 8 - 1;
                    do {
                        var h, b, m, p, v, d = 255 & n[u << 2];
                        h = t[d] * _[r][o + d + c], v = t[127 - d] * _[r][o + d + c + 128], b = h - v, h += v, m = t[d + 64] * _[r][o + d + c + 64], v = t[63 - d] * _[r][o + d + c + 192], p = m - v, m += v, f -= 4, s[l][f + 0] = h + m, s[l][f + 2] = h - m, s[l][f + 1] = b + p, s[l][f + 3] = b - p, h = t[d + 1] * _[r][o + d + c + 1], v = t[126 - d] * _[r][o + d + c + 129], b = h - v, h += v, m = t[d + 65] * _[r][o + d + c + 65], v = t[62 - d] * _[r][o + d + c + 193], p = m - v, m += v, s[l][f + i.BLKSIZE_s / 2 + 0] = h + m, s[l][f + i.BLKSIZE_s / 2 + 2] = h - m, s[l][f + i.BLKSIZE_s / 2 + 1] = b + p, s[l][f + i.BLKSIZE_s / 2 + 3] = b - p
                    } while (--u >= 0);
                    e(s[l], f, i.BLKSIZE_s / 2)
                }
            }, this.fft_long = function(t, s, r, _, o) {
                var l = i.BLKSIZE / 8 - 1,
                    f = i.BLKSIZE / 2;
                do {
                    var c, u, h, b, m, p = 255 & n[l];
                    c = a[p] * _[r][o + p], m = a[p + 512] * _[r][o + p + 512], u = c - m, c += m, h = a[p + 256] * _[r][o + p + 256], m = a[p + 768] * _[r][o + p + 768], b = h - m, h += m, f -= 4, s[f + 0] = c + h, s[f + 2] = c - h, s[f + 1] = u + b, s[f + 3] = u - b, c = a[p + 1] * _[r][o + p + 1], m = a[p + 513] * _[r][o + p + 513], u = c - m, c += m, h = a[p + 257] * _[r][o + p + 257], m = a[p + 769] * _[r][o + p + 769], b = h - m, h += m, s[f + i.BLKSIZE / 2 + 0] = c + h, s[f + i.BLKSIZE / 2 + 2] = c - h, s[f + i.BLKSIZE / 2 + 1] = u + b, s[f + i.BLKSIZE / 2 + 3] = u - b
                } while (--l >= 0);
                e(s, f, i.BLKSIZE / 2)
            }, this.init_fft = function(e) {
                for (var s = 0; s < i.BLKSIZE; s++) a[s] = .42 - .5 * Math.cos(2 * Math.PI * (s + .5) / i.BLKSIZE) + .08 * Math.cos(4 * Math.PI * (s + .5) / i.BLKSIZE);
                for (var s = 0; s < i.BLKSIZE_s / 2; s++) t[s] = .5 * (1 - Math.cos(2 * Math.PI * (s + .5) / i.BLKSIZE_s))
            }
        }
        var n = t(498),
            r = (n.System, n.VbrMode, n.Float, n.ShortBlock, n.Util),
            _ = (n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float),
            i = (n.new_float_n, n.new_int, n.new_int_n, n.assert, t(359));
        e.exports = s
    },
    200: function(e, a, t) {
        function s() {
            function e(e) {
                r.arraycopy(e.header[e.w_ptr].buf, 0, P, L, e.sideinfo_len), L += e.sideinfo_len, I += 8 * e.sideinfo_len, e.w_ptr = e.w_ptr + 1 & b.MAX_HEADER_BUF - 1
            }

            function a(a, t, s) {
                for (f(y - 2 > s); s > 0;) {
                    var n;
                    0 == V && (V = 8, L++, f(L < Lame.LAME_MAXMP3BUFFER), f(a.header[a.w_ptr].write_timing >= I), a.header[a.w_ptr].write_timing == I && e(a), P[L] = 0), n = Math.min(s, V), s -= n, V -= n, f(y > s), f(y > V), P[L] |= t >> s << V, I += n
                }
            }

            function t(e, a, t) {
                for (f(y - 2 > t); t > 0;) {
                    var s;
                    0 == V && (V = 8, L++, f(L < Lame.LAME_MAXMP3BUFFER), P[L] = 0), s = Math.min(t, V), t -= s, V -= s, f(y > t), f(y > V), P[L] |= a >> t << V, I += s
                }
            }

            function s(e, t) {
                var s, n = e.internal_flags;
                if (f(t >= 0), t >= 8 && (a(n, 76, 8), t -= 8), t >= 8 && (a(n, 65, 8), t -= 8), t >= 8 && (a(n, 77, 8), t -= 8), t >= 8 && (a(n, 69, 8), t -= 8), t >= 32) {
                    var r = k.getLameShortVersion();
                    if (t >= 32)
                        for (s = 0; s < r.length && t >= 8; ++s) t -= 8, a(n, r.charAt(s), 8)
                }
                for (; t >= 1; t -= 1) a(n, n.ancillary_flag, 1), n.ancillary_flag ^= e.disable_reservoir ? 0 : 1;
                f(0 == t)
            }

            function n(e, a, t) {
                for (var s = e.header[e.h_ptr].ptr; t > 0;) {
                    var n = Math.min(t, 8 - (7 & s));
                    t -= n, f(y > t), e.header[e.h_ptr].buf[s >> 3] |= a >> t << 8 - (7 & s) - n, s += n
                }
                e.header[e.h_ptr].ptr = s
            }

            function m(e, a) {
                e <<= 8;
                for (var t = 0; 8 > t; t++) e <<= 1, a <<= 1, 0 != (65536 & (a ^ e)) && (a ^= B);
                return a
            }

            function p(e, a) {
                var t, s, i, o = e.internal_flags;
                if (t = o.l3_side, o.header[o.h_ptr].ptr = 0, _.fill(o.header[o.h_ptr].buf, 0, o.sideinfo_len, 0), e.out_samplerate < 16e3 ? n(o, 4094, 12) : n(o, 4095, 12), n(o, e.version, 1), n(o, 1, 2), n(o, e.error_protection ? 0 : 1, 1), n(o, o.bitrate_index, 4), n(o, o.samplerate_index, 2), n(o, o.padding, 1), n(o, e.extension, 1), n(o, e.mode.ordinal(), 2), n(o, o.mode_ext, 2), n(o, e.copyright, 1), n(o, e.original, 1), n(o, e.emphasis, 2), e.error_protection && n(o, 0, 16), 1 == e.version) {
                    for (f(t.main_data_begin >= 0), n(o, t.main_data_begin, 9), 2 == o.channels_out ? n(o, t.private_bits, 3) : n(o, t.private_bits, 5), i = 0; i < o.channels_out; i++) {
                        var l;
                        for (l = 0; 4 > l; l++) n(o, t.scfsi[i][l], 1)
                    }
                    for (s = 0; 2 > s; s++)
                        for (i = 0; i < o.channels_out; i++) {
                            var c = t.tt[s][i];
                            n(o, c.part2_3_length + c.part2_length, 12), n(o, c.big_values / 2, 9), n(o, c.global_gain, 8), n(o, c.scalefac_compress, 4), c.block_type != h.NORM_TYPE ? (n(o, 1, 1), n(o, c.block_type, 2), n(o, c.mixed_block_flag, 1), 14 == c.table_select[0] && (c.table_select[0] = 16), n(o, c.table_select[0], 5), 14 == c.table_select[1] && (c.table_select[1] = 16), n(o, c.table_select[1], 5), n(o, c.subblock_gain[0], 3), n(o, c.subblock_gain[1], 3), n(o, c.subblock_gain[2], 3)) : (n(o, 0, 1), 14 == c.table_select[0] && (c.table_select[0] = 16), n(o, c.table_select[0], 5), 14 == c.table_select[1] && (c.table_select[1] = 16), n(o, c.table_select[1], 5), 14 == c.table_select[2] && (c.table_select[2] = 16), n(o, c.table_select[2], 5), f(0 <= c.region0_count && c.region0_count < 16), f(0 <= c.region1_count && c.region1_count < 8), n(o, c.region0_count, 4), n(o, c.region1_count, 3)), n(o, c.preflag, 1), n(o, c.scalefac_scale, 1), n(o, c.count1table_select, 1)
                        }
                } else
                    for (f(t.main_data_begin >= 0), n(o, t.main_data_begin, 8), n(o, t.private_bits, o.channels_out), s = 0, i = 0; i < o.channels_out; i++) {
                        var c = t.tt[s][i];
                        n(o, c.part2_3_length + c.part2_length, 12), n(o, c.big_values / 2, 9), n(o, c.global_gain, 8), n(o, c.scalefac_compress, 9), c.block_type != h.NORM_TYPE ? (n(o, 1, 1), n(o, c.block_type, 2), n(o, c.mixed_block_flag, 1), 14 == c.table_select[0] && (c.table_select[0] = 16), n(o, c.table_select[0], 5), 14 == c.table_select[1] && (c.table_select[1] = 16), n(o, c.table_select[1], 5), n(o, c.subblock_gain[0], 3), n(o, c.subblock_gain[1], 3), n(o, c.subblock_gain[2], 3)) : (n(o, 0, 1), 14 == c.table_select[0] && (c.table_select[0] = 16), n(o, c.table_select[0], 5), 14 == c.table_select[1] && (c.table_select[1] = 16), n(o, c.table_select[1], 5), 14 == c.table_select[2] && (c.table_select[2] = 16), n(o, c.table_select[2], 5), f(0 <= c.region0_count && c.region0_count < 16), f(0 <= c.region1_count && c.region1_count < 8), n(o, c.region0_count, 4), n(o, c.region1_count, 3)), n(o, c.scalefac_scale, 1), n(o, c.count1table_select, 1)
                    }
                e.error_protection && CRC_writeheader(o, o.header[o.h_ptr].buf);
                var u = o.h_ptr;
                f(o.header[u].ptr == 8 * o.sideinfo_len), o.h_ptr = u + 1 & b.MAX_HEADER_BUF - 1, o.header[o.h_ptr].write_timing = o.header[u].write_timing + a, o.h_ptr == o.w_ptr && r.err.println("Error: MAX_HEADER_BUF too small in bitstream.c \n")
            }

            function v(e, t) {
                var s, n = u.ht[t.count1table_select + 32],
                    r = 0,
                    _ = t.big_values,
                    i = t.big_values;
                for (f(t.count1table_select < 2), s = (t.count1 - t.big_values) / 4; s > 0; --s) {
                    var o, l = 0,
                        c = 0;
                    o = t.l3_enc[_ + 0], 0 != o && (c += 8, t.xr[i + 0] < 0 && l++, f(1 >= o)), o = t.l3_enc[_ + 1], 0 != o && (c += 4, l *= 2, t.xr[i + 1] < 0 && l++, f(1 >= o)), o = t.l3_enc[_ + 2], 0 != o && (c += 2, l *= 2, t.xr[i + 2] < 0 && l++, f(1 >= o)), o = t.l3_enc[_ + 3], 0 != o && (c++, l *= 2, t.xr[i + 3] < 0 && l++, f(1 >= o)), _ += 4, i += 4, a(e, l + n.table[c], n.hlen[c]), r += n.hlen[c]
                }
                return r
            }

            function d(e, t, s, n, r) {
                var _ = u.ht[t],
                    i = 0;
                if (f(32 > t), 0 == t) return i;
                for (var o = s; n > o; o += 2) {
                    var l = 0,
                        c = 0,
                        h = _.xlen,
                        b = _.xlen,
                        m = 0,
                        p = r.l3_enc[o],
                        v = r.l3_enc[o + 1];
                    if (0 != p && (r.xr[o] < 0 && m++, l--), t > 15) {
                        if (p > 14) {
                            var d = p - 15;
                            f(d <= _.linmax), m |= d << 1, c = h, p = 15
                        }
                        if (v > 14) {
                            var g = v - 15;
                            f(g <= _.linmax), m <<= h, m |= g, c += h, v = 15
                        }
                        b = 16
                    }
                    0 != v && (m <<= 1, r.xr[o + 1] < 0 && m++, l--), f(16 > (p | v)), p = p * b + v, c -= l, l += _.hlen[p], f(y >= l), f(y >= c), a(e, _.table[p], l), a(e, m, c), i += l + c
                }
                return i
            }

            function g(e, a) {
                var t = 3 * e.scalefac_band.s[3];
                t > a.big_values && (t = a.big_values);
                var s = d(e, a.table_select[0], 0, t, a);
                return s += d(e, a.table_select[1], t, a.big_values, a)
            }

            function S(e, a) {
                var t, s, n, r;
                t = a.big_values, f(t >= 0 && 576 >= t);
                var _ = a.region0_count + 1;
                return f(_ >= 0), f(_ < e.scalefac_band.l.length), n = e.scalefac_band.l[_], _ += a.region1_count + 1, f(_ >= 0), f(_ < e.scalefac_band.l.length), r = e.scalefac_band.l[_], n > t && (n = t), r > t && (r = t), s = d(e, a.table_select[0], 0, n, a), s += d(e, a.table_select[1], n, r, a), s += d(e, a.table_select[2], r, t, a)
            }

            function M(e) {
                var t, s, n, r, _ = 0,
                    i = e.internal_flags,
                    o = i.l3_side;
                if (1 == e.version)
                    for (t = 0; 2 > t; t++)
                        for (s = 0; s < i.channels_out; s++) {
                            var l = o.tt[t][s],
                                u = c.slen1_tab[l.scalefac_compress],
                                b = c.slen2_tab[l.scalefac_compress];
                            for (r = 0, n = 0; n < l.sfbdivide; n++) - 1 != l.scalefac[n] && (a(i, l.scalefac[n], u), r += u);
                            for (; n < l.sfbmax; n++) - 1 != l.scalefac[n] && (a(i, l.scalefac[n], b), r += b);
                            f(r == l.part2_length), r += l.block_type == h.SHORT_TYPE ? g(i, l) : S(i, l), r += v(i, l), f(r == l.part2_3_length + l.part2_length), _ += r
                        } else
                            for (t = 0, s = 0; s < i.channels_out; s++) {
                                var m, p, l = o.tt[t][s],
                                    d = 0;
                                if (f(null != l.sfb_partition_table), r = 0, n = 0, p = 0, l.block_type == h.SHORT_TYPE) {
                                    for (; 4 > p; p++) {
                                        var M = l.sfb_partition_table[p] / 3,
                                            w = l.slen[p];
                                        for (m = 0; M > m; m++, n++) a(i, Math.max(l.scalefac[3 * n + 0], 0), w), a(i, Math.max(l.scalefac[3 * n + 1], 0), w), a(i, Math.max(l.scalefac[3 * n + 2], 0), w), d += 3 * w
                                    }
                                    r += g(i, l)
                                } else {
                                    for (; 4 > p; p++) {
                                        var M = l.sfb_partition_table[p],
                                            w = l.slen[p];
                                        for (m = 0; M > m; m++, n++) a(i, Math.max(l.scalefac[n], 0), w), d += w
                                    }
                                    r += S(i, l)
                                }
                                r += v(i, l), f(r == l.part2_3_length), f(d == l.part2_length), _ += d + r
                            }
                return _
            }

            function w() {
                this.total = 0
            }

            function A(e, a) {
                var t, s, n, _, i, o = e.internal_flags;
                return i = o.w_ptr, _ = o.h_ptr - 1, -1 == _ && (_ = b.MAX_HEADER_BUF - 1), t = o.header[_].write_timing - I, a.total = t, t >= 0 && (s = 1 + _ - i, i > _ && (s = 1 + _ - i + b.MAX_HEADER_BUF), t -= 8 * s * o.sideinfo_len), n = R.getframebits(e), t += n, a.total += n, a.total % 8 != 0 ? a.total = 1 + a.total / 8 : a.total = a.total / 8, a.total += L + 1, 0 > t && r.err.println("strange error flushing buffer ... \n"), t
            }
            var R = this,
                B = 32773,
                y = 32,
                E = null,
                T = null,
                k = null,
                x = null;
            this.setModules = function(e, a, t, s) {
                E = e, T = a, k = t, x = s
            };
            var P = null,
                I = 0,
                L = 0,
                V = 0;
            this.getframebits = function(e) {
                var a, t = e.internal_flags;
                a = 0 != t.bitrate_index ? u.bitrate_table[e.version][t.bitrate_index] : e.brate, f(a >= 8 && 640 >= a);
                var s = 0 | 72e3 * (e.version + 1) * a / e.out_samplerate + t.padding;
                return 8 * s
            }, this.CRC_writeheader = function(e, a) {
                var t = 65535;
                t = m(255 & a[2], t), t = m(255 & a[3], t);
                for (var s = 6; s < e.sideinfo_len; s++) t = m(255 & a[s], t);
                a[4] = byte(t >> 8), a[5] = byte(255 & t)
            }, this.flush_bitstream = function(e) {
                var a, t, n = e.internal_flags,
                    r = n.h_ptr - 1;
                if (-1 == r && (r = b.MAX_HEADER_BUF - 1), a = n.l3_side, !((t = A(e, new w)) < 0)) {
                    if (s(e, t), f(n.header[r].write_timing + this.getframebits(e) == I), n.ResvSize = 0, a.main_data_begin = 0, n.findReplayGain) {
                        var _ = E.GetTitleGain(n.rgdata);
                        f(NEQ(_, GainAnalysis.GAIN_NOT_ENOUGH_SAMPLES)), n.RadioGain = 0 | Math.floor(10 * _ + .5)
                    }
                    n.findPeakSample && (n.noclipGainChange = 0 | Math.ceil(20 * Math.log10(n.PeakSample / 32767) * 10), n.noclipGainChange > 0 && (EQ(e.scale, 1) || EQ(e.scale, 0)) ? n.noclipScale = Math.floor(32767 / n.PeakSample * 100) / 100 : n.noclipScale = -1)
                }
            }, this.add_dummy_byte = function(e, a, s) {
                for (var n, r = e.internal_flags; s-- > 0;)
                    for (t(r, a, 8), n = 0; n < b.MAX_HEADER_BUF; ++n) r.header[n].write_timing += 8
            }, this.format_bitstream = function(e) {
                var a, t = e.internal_flags;
                a = t.l3_side;
                var n = this.getframebits(e);
                s(e, a.resvDrain_pre), p(e, n);
                var _ = 8 * t.sideinfo_len;
                if (_ += M(e), s(e, a.resvDrain_post), _ += a.resvDrain_post, a.main_data_begin += (n - _) / 8, A(e, new w) != t.ResvSize && r.err.println("Internal buffer inconsistency. flushbits <> ResvSize"), 8 * a.main_data_begin != t.ResvSize && (r.err.printf("bit reservoir error: \nl3_side.main_data_begin: %d \nResvoir size:             %d \nresv drain (post)         %d \nresv drain (pre)          %d \nheader and sideinfo:      %d \ndata bits:                %d \ntotal bits:               %d (remainder: %d) \nbitsperframe:             %d \n", 8 * a.main_data_begin, t.ResvSize, a.resvDrain_post, a.resvDrain_pre, 8 * t.sideinfo_len, _ - a.resvDrain_post - 8 * t.sideinfo_len, _, _ % 8, n), r.err.println("This is a fatal error.  It has several possible causes:"), r.err.println("90%%  LAME compiled with buggy version of gcc using advanced optimizations"), r.err.println(" 9%%  Your system is overclocked"), r.err.println(" 1%%  bug in LAME encoding library"), t.ResvSize = 8 * a.main_data_begin), f(I % 8 == 0), I > 1e9) {
                    var i;
                    for (i = 0; i < b.MAX_HEADER_BUF; ++i) t.header[i].write_timing -= I;
                    I = 0
                }
                return 0
            }, this.copy_buffer = function(e, a, t, s, n) {
                var _ = L + 1;
                if (0 >= _) return 0;
                if (0 != s && _ > s) return -1;
                if (r.arraycopy(P, 0, a, t, _), L = -1, V = 0, 0 != n) {
                    var i = l(1);
                    if (i[0] = e.nMusicCRC, x.updateMusicCRC(i, a, t, _), e.nMusicCRC = i[0], _ > 0 && (e.VBR_seek_table.nBytesWritten += _), e.decode_on_the_fly)
                        for (var c, u = o([2, 1152]), h = _, b = -1; 0 != b;)
                            if (b = T.hip_decode1_unclipped(e.hip, a, t, h, u[0], u[1]), h = 0, -1 == b && (b = 0), b > 0) {
                                if (f(1152 >= b), e.findPeakSample) {
                                    for (c = 0; b > c; c++) u[0][c] > e.PeakSample ? e.PeakSample = u[0][c] : -u[0][c] > e.PeakSample && (e.PeakSample = -u[0][c]);
                                    if (e.channels_out > 1)
                                        for (c = 0; b > c; c++) u[1][c] > e.PeakSample ? e.PeakSample = u[1][c] : -u[1][c] > e.PeakSample && (e.PeakSample = -u[1][c])
                                }
                                if (e.findReplayGain && E.AnalyzeSamples(e.rgdata, u[0], 0, u[1], 0, b, e.channels_out) == GainAnalysis.GAIN_ANALYSIS_ERROR) return -6
                            }
                }
                return _
            }, this.init_bit_stream_w = function(e) {
                P = i(Lame.LAME_MAXMP3BUFFER), e.h_ptr = e.w_ptr = 0, e.header[e.h_ptr].write_timing = 0, L = -1, V = 0, I = 0
            }
        }
        var n = t(498),
            r = n.System,
            _ = (n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays),
            i = (n.new_array_n, n.new_byte),
            o = (n.new_double, n.new_float, n.new_float_n),
            l = n.new_int,
            f = (n.new_int_n, n.assert),
            c = t(411),
            u = t(645),
            h = t(359),
            b = t(484);
        s.EQ = function(e, a) {
            return Math.abs(e) > Math.abs(a) ? Math.abs(e - a) <= 1e-6 * Math.abs(e) : Math.abs(e - a) <= 1e-6 * Math.abs(a)
        }, s.NEQ = function(e, a) {
            return !s.EQ(e, a)
        }, e.exports = s
    },
    218: function(e, a, t) {
        e.exports = t(520)
    },
    274: function(e, a) {
        function t() {
            var e = "http://www.mp3dev.org/",
                a = 3,
                t = 98,
                s = 4,
                n = 0,
                r = 93;
            this.getLameVersion = function() {
                return a + "." + t + "." + s
            }, this.getLameShortVersion = function() {
                return a + "." + t + "." + s
            }, this.getLameVeryShortVersion = function() {
                return "LAME" + a + "." + t + "r"
            }, this.getPsyVersion = function() {
                return n + "." + r
            }, this.getLameUrl = function() {
                return e
            }, this.getLameOsBitness = function() {
                return "32bits"
            }
        }
        e.exports = t
    },
    296: function(e, a, t) {
        function s(e) {
            var a = e;
            this.quantize = a, this.iteration_loop = function(e, a, t, s) {
                var n, u = e.internal_flags,
                    h = r(f.SFBMAX),
                    b = r(576),
                    m = _(2),
                    p = 0,
                    v = u.l3_side,
                    d = new o(p);
                this.quantize.rv.ResvFrameBegin(e, d), p = d.bits;
                for (var g = 0; g < u.mode_gr; g++) {
                    n = this.quantize.qupvt.on_pe(e, a, m, p, g, g), u.mode_ext == l.MPG_MD_MS_LR && (this.quantize.ms_convert(u.l3_side, g), this.quantize.qupvt.reduce_side(m, t[g], p, n));
                    for (var S = 0; S < u.channels_out; S++) {
                        var M, w, A = v.tt[g][S];
                        A.block_type != l.SHORT_TYPE ? (M = 0, w = u.PSY.mask_adjust - M) : (M = 0, w = u.PSY.mask_adjust_short - M), u.masking_lower = Math.pow(10, .1 * w), this.quantize.init_outer_loop(u, A), this.quantize.init_xrpow(u, A, b) && (this.quantize.qupvt.calc_xmin(e, s[g][S], A, h), this.quantize.outer_loop(e, A, h, b, S, m[S])), this.quantize.iteration_finish_one(u, g, S), i(A.part2_3_length <= c.MAX_BITS_PER_CHANNEL), i(A.part2_3_length <= m[S])
                    }
                }
                this.quantize.rv.ResvFrameEnd(u, p)
            }
        }
        var n = t(498),
            r = (n.System, n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float),
            _ = (n.new_float_n, n.new_int),
            i = (n.new_int_n, n.assert),
            o = t(464),
            l = t(359),
            f = t(561),
            c = t(484);
        e.exports = s
    },
    359: function(e, a, t) {
        function s() {
            function e(e) {
                var a, t;
                if (0 == e.ATH.useAdjust) return void(e.ATH.adjust = 1);
                if (t = e.loudness_sq[0][0], a = e.loudness_sq[1][0], 2 == e.channels_out ? (t += e.loudness_sq[0][1], a += e.loudness_sq[1][1]) : (t += t, a += a), 2 == e.mode_gr && (t = Math.max(t, a)), t *= .5, t *= e.ATH.aaSensitivityP, t > .03125) e.ATH.adjust >= 1 ? e.ATH.adjust = 1 : e.ATH.adjust < e.ATH.adjustLimit && (e.ATH.adjust = e.ATH.adjustLimit), e.ATH.adjustLimit = 1;
                else {
                    var s = 31.98 * t + 625e-6;
                    e.ATH.adjust >= s ? (e.ATH.adjust *= .075 * s + .925, e.ATH.adjust < s && (e.ATH.adjust = s)) : e.ATH.adjustLimit >= s ? e.ATH.adjust = s : e.ATH.adjust < e.ATH.adjustLimit && (e.ATH.adjust = e.ATH.adjustLimit), e.ATH.adjustLimit = s
                }
            }

            function a(e) {
                var a, t;
                for (c(0 <= e.bitrate_index && e.bitrate_index < 16), c(0 <= e.mode_ext && e.mode_ext < 4), e.bitrate_stereoMode_Hist[e.bitrate_index][4]++, e.bitrate_stereoMode_Hist[15][4]++, 2 == e.channels_out && (e.bitrate_stereoMode_Hist[e.bitrate_index][e.mode_ext]++, e.bitrate_stereoMode_Hist[15][e.mode_ext]++), a = 0; a < e.mode_gr; ++a)
                    for (t = 0; t < e.channels_out; ++t) {
                        var s = 0 | e.l3_side.tt[a][t].block_type;
                        0 != e.l3_side.tt[a][t].mixed_block_flag && (s = 4), e.bitrate_blockType_Hist[e.bitrate_index][s]++, e.bitrate_blockType_Hist[e.bitrate_index][5]++, e.bitrate_blockType_Hist[15][s]++, e.bitrate_blockType_Hist[15][5]++
                    }
            }

            function n(e, a) {
                var t, n, r = e.internal_flags;
                if (0 == r.lame_encode_frame_init) {
                    var _, i, l = o(2014),
                        f = o(2014);
                    for (r.lame_encode_frame_init = 1, _ = 0, i = 0; _ < 286 + 576 * (1 + r.mode_gr); ++_) _ < 576 * r.mode_gr ? (l[_] = 0, 2 == r.channels_out && (f[_] = 0)) : (l[_] = a[0][i], 2 == r.channels_out && (f[_] = a[1][i]), ++i);
                    for (n = 0; n < r.mode_gr; n++)
                        for (t = 0; t < r.channels_out; t++) r.l3_side.tt[n][t].block_type = s.SHORT_TYPE;
                    S.mdct_sub48(r, l, f), c(576 >= s.FFTOFFSET), c(r.mf_size >= s.BLKSIZE + e.framesize - s.FFTOFFSET), c(r.mf_size >= 512 + e.framesize - 32)
                }
            }
            var u = t(553),
                h = t(42),
                b = s.FFTOFFSET,
                m = s.MPG_MD_MS_LR,
                p = null;
            this.psy = null;
            var v = null,
                d = null,
                g = null;
            this.setModules = function(e, a, t, s) {
                p = e, this.psy = a, v = a, d = s, g = t
            };
            var S = new u;
            this.lame_encode_mp3_frame = function(t, o, c, u, M, w) {
                var A, R = i([2, 2]);
                R[0][0] = new h, R[0][1] = new h, R[1][0] = new h, R[1][1] = new h;
                var B = i([2, 2]);
                B[0][0] = new h, B[0][1] = new h, B[1][0] = new h, B[1][1] = new h;
                var y, E, T, k, x = [null, null],
                    P = t.internal_flags,
                    I = l([2, 4]),
                    L = [.5, .5],
                    V = [
                        [0, 0],
                        [0, 0]
                    ],
                    H = [
                        [0, 0],
                        [0, 0]
                    ];
                if (x[0] = o, x[1] = c, 0 == P.lame_encode_frame_init && n(t, x), P.padding = 0, (P.slot_lag -= P.frac_SpF) < 0 && (P.slot_lag += t.out_samplerate, P.padding = 1), 0 != P.psymodel) {
                    var O, N = [null, null],
                        X = 0,
                        D = f(2);
                    for (k = 0; k < P.mode_gr; k++) {
                        for (T = 0; T < P.channels_out; T++) N[T] = x[T], X = 576 + 576 * k - s.FFTOFFSET;
                        if (O = t.VBR == _.vbr_mtrh || t.VBR == _.vbr_mt ? v.L3psycho_anal_vbr(t, N, X, k, R, B, V[k], H[k], I[k], D) : v.L3psycho_anal_ns(t, N, X, k, R, B, V[k], H[k], I[k], D), 0 != O) return -4;
                        for (t.mode == MPEGMode.JOINT_STEREO && (L[k] = I[k][2] + I[k][3], L[k] > 0 && (L[k] = I[k][3] / L[k])), T = 0; T < P.channels_out; T++) {
                            var F = P.l3_side.tt[k][T];
                            F.block_type = D[T], F.mixed_block_flag = 0
                        }
                    }
                } else
                    for (k = 0; k < P.mode_gr; k++)
                        for (T = 0; T < P.channels_out; T++) P.l3_side.tt[k][T].block_type = s.NORM_TYPE, P.l3_side.tt[k][T].mixed_block_flag = 0, H[k][T] = V[k][T] = 700;
                if (e(P), S.mdct_sub48(P, x[0], x[1]), P.mode_ext = s.MPG_MD_LR_LR, t.force_ms) P.mode_ext = s.MPG_MD_MS_LR;
                else if (t.mode == MPEGMode.JOINT_STEREO) {
                    var Y = 0,
                        q = 0;
                    for (k = 0; k < P.mode_gr; k++)
                        for (T = 0; T < P.channels_out; T++) Y += H[k][T], q += V[k][T];
                    if (1 * q >= Y) {
                        var C = P.l3_side.tt[0],
                            G = P.l3_side.tt[P.mode_gr - 1];
                        C[0].block_type == C[1].block_type && G[0].block_type == G[1].block_type && (P.mode_ext = s.MPG_MD_MS_LR)
                    }
                }
                if (P.mode_ext == m ? (y = B, E = H) : (y = R, E = V), t.analysis && null != P.pinfo)
                    for (k = 0; k < P.mode_gr; k++)
                        for (T = 0; T < P.channels_out; T++) P.pinfo.ms_ratio[k] = P.ms_ratio[k], P.pinfo.ms_ener_ratio[k] = L[k], P.pinfo.blocktype[k][T] = P.l3_side.tt[k][T].block_type, P.pinfo.pe[k][T] = E[k][T], r.arraycopy(P.l3_side.tt[k][T].xr, 0, P.pinfo.xr[k][T], 0, 576), P.mode_ext == m && (P.pinfo.ers[k][T] = P.pinfo.ers[k][T + 2], r.arraycopy(P.pinfo.energy[k][T + 2], 0, P.pinfo.energy[k][T], 0, P.pinfo.energy[k][T].length));
                if (t.VBR == _.vbr_off || t.VBR == _.vbr_abr) {
                    var j, z;
                    for (j = 0; 18 > j; j++) P.nsPsy.pefirbuf[j] = P.nsPsy.pefirbuf[j + 1];
                    for (z = 0, k = 0; k < P.mode_gr; k++)
                        for (T = 0; T < P.channels_out; T++) z += E[k][T];
                    for (P.nsPsy.pefirbuf[18] = z, z = P.nsPsy.pefirbuf[9], j = 0; 9 > j; j++) z += (P.nsPsy.pefirbuf[j] + P.nsPsy.pefirbuf[18 - j]) * s.fircoef[j];
                    for (z = 3350 * P.mode_gr * P.channels_out / z, k = 0; k < P.mode_gr; k++)
                        for (T = 0; T < P.channels_out; T++) E[k][T] *= z
                }
                if (P.iteration_loop.iteration_loop(t, E, L, y), p.format_bitstream(t), A = p.copy_buffer(P, u, M, w, 1), t.bWriteVbrTag && d.addVbrFrame(t), t.analysis && null != P.pinfo) {
                    for (T = 0; T < P.channels_out; T++) {
                        var U;
                        for (U = 0; b > U; U++) P.pinfo.pcmdata[T][U] = P.pinfo.pcmdata[T][U + t.framesize];
                        for (U = b; 1600 > U; U++) P.pinfo.pcmdata[T][U] = x[T][U - b]
                    }
                    g.set_frame_pinfo(t, y)
                }
                return a(P), A
            }
        }
        var n = t(498),
            r = n.System,
            _ = n.VbrMode,
            i = (n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n),
            o = (n.new_byte, n.new_double, n.new_float),
            l = n.new_float_n,
            f = n.new_int,
            c = (n.new_int_n, n.assert);
        s.ENCDELAY = 576, s.POSTDELAY = 1152, s.MDCTDELAY = 48, s.FFTOFFSET = 224 + s.MDCTDELAY, s.DECDELAY = 528, s.SBLIMIT = 32, s.CBANDS = 64, s.SBPSY_l = 21, s.SBPSY_s = 12, s.SBMAX_l = 22, s.SBMAX_s = 13, s.PSFB21 = 6, s.PSFB12 = 6, s.BLKSIZE = 1024, s.HBLKSIZE = s.BLKSIZE / 2 + 1, s.BLKSIZE_s = 256, s.HBLKSIZE_s = s.BLKSIZE_s / 2 + 1, s.NORM_TYPE = 0, s.START_TYPE = 1, s.SHORT_TYPE = 2, s.STOP_TYPE = 3, s.MPG_MD_LR_LR = 0, s.MPG_MD_LR_I = 1, s.MPG_MD_MS_LR = 2, s.MPG_MD_MS_I = 3, s.fircoef = [-0.1039435, -0.1892065, 5 * -.0432472, -0.155915, 3.898045e-17, .0467745 * 5, .50455, .756825, .187098 * 5], e.exports = s
    },
    382: function(e, a, t) {
        function s() {
            this.class_id = 0, this.num_samples = 0, this.num_channels = 0, this.in_samplerate = 0, this.out_samplerate = 0, this.scale = 0, this.scale_left = 0, this.scale_right = 0, this.analysis = !1, this.bWriteVbrTag = !1, this.decode_only = !1, this.quality = 0, this.mode = n.STEREO, this.force_ms = !1, this.free_format = !1, this.findReplayGain = !1, this.decode_on_the_fly = !1, this.write_id3tag_automatic = !1, this.brate = 0, this.compression_ratio = 0, this.copyright = 0, this.original = 0, this.extension = 0, this.emphasis = 0, this.error_protection = 0, this.strict_ISO = !1, this.disable_reservoir = !1, this.quant_comp = 0, this.quant_comp_short = 0, this.experimentalY = !1, this.experimentalZ = 0, this.exp_nspsytune = 0, this.preset = 0, this.VBR = null, this.VBR_q_frac = 0, this.VBR_q = 0, this.VBR_mean_bitrate_kbps = 0, this.VBR_min_bitrate_kbps = 0, this.VBR_max_bitrate_kbps = 0, this.VBR_hard_min = 0, this.lowpassfreq = 0, this.highpassfreq = 0, this.lowpasswidth = 0, this.highpasswidth = 0, this.maskingadjust = 0, this.maskingadjust_short = 0, this.ATHonly = !1, this.ATHshort = !1, this.noATH = !1, this.ATHtype = 0, this.ATHcurve = 0, this.ATHlower = 0, this.athaa_type = 0, this.athaa_loudapprox = 0, this.athaa_sensitivity = 0, this.short_blocks = null, this.useTemporal = !1, this.interChRatio = 0, this.msfix = 0, this.tune = !1, this.tune_value_a = 0, this.version = 0, this.encoder_delay = 0, this.encoder_padding = 0, this.framesize = 0, this.frameNum = 0, this.lame_allocated_gfp = 0, this.internal_flags = null
        }
        var n = t(396);
        e.exports = s
    },
    396: function(e, a) {
        function t(e) {
            var a = e;
            this.ordinal = function() {
                return a
            }
        }
        t.STEREO = new t(0), t.JOINT_STEREO = new t(1), t.DUAL_CHANNEL = new t(2), t.MONO = new t(3), t.NOT_SET = new t(4), e.exports = t
    },
    405: function(e, a, t) {
        function s() {
            this.linprebuf = r(2 * i.MAX_ORDER), this.linpre = 0, this.lstepbuf = r(i.MAX_SAMPLES_PER_WINDOW + i.MAX_ORDER), this.lstep = 0, this.loutbuf = r(i.MAX_SAMPLES_PER_WINDOW + i.MAX_ORDER), this.lout = 0, this.rinprebuf = r(2 * i.MAX_ORDER), this.rinpre = 0, this.rstepbuf = r(i.MAX_SAMPLES_PER_WINDOW + i.MAX_ORDER), this.rstep = 0, this.routbuf = r(i.MAX_SAMPLES_PER_WINDOW + i.MAX_ORDER), this.rout = 0, this.sampleWindow = 0, this.totsamp = 0, this.lsum = 0, this.rsum = 0, this.freqindex = 0, this.first = 0, this.A = _(0 | i.STEPS_per_dB * i.MAX_dB), this.B = _(0 | i.STEPS_per_dB * i.MAX_dB)
        }
        var n = t(498),
            r = (n.System, n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float),
            _ = (n.new_float_n, n.new_int),
            i = (n.new_int_n, n.assert, t(427));
        e.exports = s
    },
    411: function(e, a, t) {
        function s() {
            function e(e) {
                this.bits = 0 | e
            }

            function a(e, a, t, s, n, r) {
                var _ = .5946 / a;
                for (o(e > 0), e >>= 1; 0 != e--;) n[r++] = _ > t[s++] ? 0 : 1, n[r++] = _ > t[s++] ? 0 : 1
            }

            function t(e, a, t, s, n, r) {
                o(e > 0), e >>= 1;
                var _ = e % 2;
                for (e >>= 1; 0 != e--;) {
                    var i, l, f, c, u, h, b, m;
                    i = t[s++] * a, l = t[s++] * a, u = 0 | i, f = t[s++] * a, h = 0 | l, c = t[s++] * a, b = 0 | f, i += A.adj43[u], m = 0 | c, l += A.adj43[h], n[r++] = 0 | i, f += A.adj43[b], n[r++] = 0 | l, c += A.adj43[m], n[r++] = 0 | f, n[r++] = 0 | c
                }
                if (0 != _) {
                    var i, l, u, h;
                    i = t[s++] * a, l = t[s++] * a, u = 0 | i, h = 0 | l, i += A.adj43[u], l += A.adj43[h], n[r++] = 0 | i, n[r++] = 0 | l
                }
            }

            function n(e, s, n, r, i) {
                var f, c, u, h = 0,
                    b = 0,
                    m = 0,
                    p = 0,
                    v = s,
                    d = 0,
                    g = v,
                    S = 0,
                    M = e,
                    w = 0;
                for (u = null != i && r.global_gain == i.global_gain, c = r.block_type == l.SHORT_TYPE ? 38 : 21, f = 0; c >= f; f++) {
                    var R = -1;
                    if ((u || r.block_type == l.NORM_TYPE) && (R = r.global_gain - (r.scalefac[f] + (0 != r.preflag ? A.pretab[f] : 0) << r.scalefac_scale + 1) - 8 * r.subblock_gain[r.window[f]]), o(r.width[f] >= 0), u && i.step[f] == R) 0 != b && (t(b, n, M, w, g, S), b = 0), 0 != m && (a(m, n, M, w, g, S), m = 0);
                    else {
                        var B = r.width[f];
                        if (h + r.width[f] > r.max_nonzero_coeff) {
                            var y;
                            y = r.max_nonzero_coeff - h + 1, _.fill(s, r.max_nonzero_coeff, 576, 0), B = y, 0 > B && (B = 0), f = c + 1
                        }
                        if (0 == b && 0 == m && (g = v, S = d, M = e, w = p), null != i && i.sfb_count1 > 0 && f >= i.sfb_count1 && i.step[f] > 0 && R >= i.step[f] ? (0 != b && (t(b, n, M, w, g, S), b = 0, g = v, S = d, M = e, w = p), m += B) : (0 != m && (a(m, n, M, w, g, S), m = 0, g = v, S = d, M = e, w = p), b += B), 0 >= B) {
                            0 != m && (a(m, n, M, w, g, S), m = 0), 0 != b && (t(b, n, M, w, g, S), b = 0);
                            break
                        }
                    }
                    c >= f && (d += r.width[f], p += r.width[f], h += r.width[f])
                }
                0 != b && (t(b, n, M, w, g, S), b = 0), 0 != m && (a(m, n, M, w, g, S), m = 0)
            }

            function h(e, a, t) {
                var s = 0,
                    n = 0;
                do {
                    var r = e[a++],
                        _ = e[a++];
                    r > s && (s = r), _ > n && (n = _)
                } while (t > a);
                return n > s && (s = n), s
            }

            function b(e, a, t, s, n, r) {
                var _, i = 65536 * f.ht[s].xlen + f.ht[n].xlen,
                    o = 0;
                do {
                    var l = e[a++],
                        c = e[a++];
                    0 != l && (l > 14 && (l = 15, o += i), l *= 16), 0 != c && (c > 14 && (c = 15, o += i), l += c), o += f.largetbl[l]
                } while (t > a);
                return _ = 65535 & o, o >>= 16, o > _ && (o = _, s = n), r.bits += o, s
            }

            function m(e, a, t, s) {
                var n = 0,
                    r = f.ht[1].hlen;
                do {
                    var _ = 2 * e[a + 0] + e[a + 1];
                    a += 2, n += r[_]
                } while (t > a);
                return s.bits += n, 1
            }

            function p(e, a, t, s, n) {
                var r, _, i = 0,
                    o = f.ht[s].xlen;
                _ = 2 == s ? f.table23 : f.table56;
                do {
                    var l = e[a + 0] * o + e[a + 1];
                    a += 2, i += _[l]
                } while (t > a);
                return r = 65535 & i, i >>= 16, i > r && (i = r, s++), n.bits += i, s
            }

            function v(e, a, t, s, n) {
                var r = 0,
                    _ = 0,
                    i = 0,
                    o = f.ht[s].xlen,
                    l = f.ht[s].hlen,
                    c = f.ht[s + 1].hlen,
                    u = f.ht[s + 2].hlen;
                do {
                    var h = e[a + 0] * o + e[a + 1];
                    a += 2, r += l[h], _ += c[h], i += u[h]
                } while (t > a);
                var b = s;
                return r > _ && (r = _, b++), r > i && (r = i, b = s + 2), n.bits += r, b
            }

            function d(e, a, t, s) {
                var n = h(e, a, t);
                switch (n) {
                    case 0:
                        return n;
                    case 1:
                        return m(e, a, t, s);
                    case 2:
                    case 3:
                        return p(e, a, t, B[n - 1], s);
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
                        return v(e, a, t, B[n - 1], s);
                    default:
                        if (n > u.IXMAX_VAL) return s.bits = u.LARGE_BITS, -1;
                        n -= 15;
                        var r;
                        for (r = 24; 32 > r && !(f.ht[r].linmax >= n); r++);
                        var _;
                        for (_ = r - 8; 24 > _ && !(f.ht[_].linmax >= n); _++);
                        return b(e, a, t, _, r, s)
                }
            }

            function g(a, t, s, n, r, _, i) {
                for (var o = t.big_values, l = 0; 22 >= l; l++) n[l] = u.LARGE_BITS;
                for (var l = 0; 16 > l; l++) {
                    var f = a.scalefac_band.l[l + 1];
                    if (f >= o) break;
                    var c = 0,
                        h = new e(c),
                        b = d(s, 0, f, h);
                    c = h.bits;
                    for (var m = 0; 8 > m; m++) {
                        var p = a.scalefac_band.l[l + m + 2];
                        if (p >= o) break;
                        var v = c;
                        h = new e(v);
                        var g = d(s, f, p, h);
                        v = h.bits, n[l + m] > v && (n[l + m] = v, r[l + m] = l, _[l + m] = b, i[l + m] = g)
                    }
                }
            }

            function S(a, t, s, n, r, _, i, o) {
                for (var f = t.big_values, c = 2; c < l.SBMAX_l + 1; c++) {
                    var u = a.scalefac_band.l[c];
                    if (u >= f) break;
                    var h = r[c - 2] + t.count1bits;
                    if (s.part2_3_length <= h) break;
                    var b = new e(h),
                        m = d(n, u, f, b);
                    h = b.bits, s.part2_3_length <= h || (s.assign(t), s.part2_3_length = h, s.region0_count = _[c - 2], s.region1_count = c - 2 - _[c - 2], s.table_select[0] = i[c - 2], s.table_select[1] = o[c - 2], s.table_select[2] = m)
                }
            }

            function M(e, a) {
                for (var t, s = a.tt[1][e], n = a.tt[0][e], r = 0; r < f.scfsi_band.length - 1; r++) {
                    for (t = f.scfsi_band[r]; t < f.scfsi_band[r + 1] && !(n.scalefac[t] != s.scalefac[t] && s.scalefac[t] >= 0); t++);
                    if (t == f.scfsi_band[r + 1]) {
                        for (t = f.scfsi_band[r]; t < f.scfsi_band[r + 1]; t++) s.scalefac[t] = -1;
                        a.scfsi[e][r] = 1
                    }
                }
                var _ = 0,
                    i = 0;
                for (t = 0; 11 > t; t++) - 1 != s.scalefac[t] && (i++, _ < s.scalefac[t] && (_ = s.scalefac[t]));
                for (var o = 0, c = 0; t < l.SBPSY_l; t++) - 1 != s.scalefac[t] && (c++, o < s.scalefac[t] && (o = s.scalefac[t]));
                for (var r = 0; 16 > r; r++)
                    if (_ < y[r] && o < E[r]) {
                        var u = T[r] * i + k[r] * c;
                        s.part2_length > u && (s.part2_length = u, s.scalefac_compress = r)
                    }
            }

            function w(e, a) {
                for (var t = 0; a > t; ++t)
                    if (e[t] < 0) return !1;
                return !0
            }
            var A = null;
            this.qupvt = null, this.setModules = function(e) {
                this.qupvt = e, A = e
            };
            var R = [
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
                ],
                B = [1, 2, 5, 7, 7, 10, 10, 13, 13, 13, 13, 13, 13, 13, 13];
            this.noquant_count_bits = function(a, t, s) {
                var n = t.l3_enc,
                    r = Math.min(576, t.max_nonzero_coeff + 2 >> 1 << 1);
                for (null != s && (s.sfb_count1 = 0); r > 1 && 0 == (n[r - 1] | n[r - 2]); r -= 2);
                t.count1 = r;
                for (var _ = 0, i = 0; r > 3; r -= 4) {
                    var c;
                    if ((2147483647 & (n[r - 1] | n[r - 2] | n[r - 3] | n[r - 4])) > 1) break;
                    c = 2 * (2 * (2 * n[r - 4] + n[r - 3]) + n[r - 2]) + n[r - 1], _ += f.t32l[c], i += f.t33l[c]
                }
                var u = _;
                if (t.count1table_select = 0, _ > i && (u = i, t.count1table_select = 1), t.count1bits = u, t.big_values = r, 0 == r) return u;
                if (t.block_type == l.SHORT_TYPE) _ = 3 * a.scalefac_band.s[3], _ > t.big_values && (_ = t.big_values), i = t.big_values;
                else if (t.block_type == l.NORM_TYPE) {
                    if (o(576 >= r), _ = t.region0_count = a.bv_scf[r - 2], i = t.region1_count = a.bv_scf[r - 1], o(_ + i + 2 < l.SBPSY_l), i = a.scalefac_band.l[_ + i + 2], _ = a.scalefac_band.l[_ + 1], r > i) {
                        var h = new e(u);
                        t.table_select[2] = d(n, i, r, h), u = h.bits
                    }
                } else t.region0_count = 7, t.region1_count = l.SBMAX_l - 1 - 7 - 1, _ = a.scalefac_band.l[8], i = r, _ > i && (_ = i);
                if (_ = Math.min(_, r), i = Math.min(i, r), o(_ >= 0), o(i >= 0), _ > 0) {
                    var h = new e(u);
                    t.table_select[0] = d(n, 0, _, h), u = h.bits
                }
                if (i > _) {
                    var h = new e(u);
                    t.table_select[1] = d(n, _, i, h), u = h.bits
                }
                if (2 == a.use_best_huffman && (t.part2_3_length = u, best_huffman_divide(a, t), u = t.part2_3_length), null != s && t.block_type == l.NORM_TYPE) {
                    for (var b = 0; a.scalefac_band.l[b] < t.big_values;) b++;
                    s.sfb_count1 = b
                }
                return u
            }, this.count_bits = function(e, a, t, s) {
                var r = t.l3_enc,
                    _ = u.IXMAX_VAL / A.IPOW20(t.global_gain);
                if (t.xrpow_max > _) return u.LARGE_BITS;
                if (n(a, r, A.IPOW20(t.global_gain), t, s), 0 != (2 & e.substep_shaping))
                    for (var i = 0, l = t.global_gain + t.scalefac_scale, f = .634521682242439 / A.IPOW20(l), c = 0; c < t.sfbmax; c++) {
                        var h = t.width[c];
                        if (o(h >= 0), 0 == e.pseudohalf[c]) i += h;
                        else {
                            var b;
                            for (b = i, i += h; i > b; ++b) r[b] = a[b] >= f ? r[b] : 0
                        }
                    }
                return this.noquant_count_bits(e, t, s)
            }, this.best_huffman_divide = function(a, t) {
                var s = new c,
                    n = t.l3_enc,
                    r = i(23),
                    _ = i(23),
                    u = i(23),
                    h = i(23);
                if (t.block_type != l.SHORT_TYPE || 1 != a.mode_gr) {
                    s.assign(t), t.block_type == l.NORM_TYPE && (g(a, t, n, r, _, u, h), S(a, s, t, n, r, _, u, h));
                    var b = s.big_values;
                    if (!(0 == b || (n[b - 2] | n[b - 1]) > 1 || (b = t.count1 + 2, b > 576))) {
                        s.assign(t), s.count1 = b;
                        var m = 0,
                            p = 0;
                        for (o(576 >= b); b > s.big_values; b -= 4) {
                            var v = 2 * (2 * (2 * n[b - 4] + n[b - 3]) + n[b - 2]) + n[b - 1];
                            m += f.t32l[v], p += f.t33l[v]
                        }
                        if (s.big_values = b, s.count1table_select = 0, m > p && (m = p, s.count1table_select = 1), s.count1bits = m, s.block_type == l.NORM_TYPE) S(a, s, t, n, r, _, u, h);
                        else {
                            if (s.part2_3_length = m, m = a.scalefac_band.l[8], m > b && (m = b), m > 0) {
                                var M = new e(s.part2_3_length);
                                s.table_select[0] = d(n, 0, m, M), s.part2_3_length = M.bits
                            }
                            if (b > m) {
                                var M = new e(s.part2_3_length);
                                s.table_select[1] = d(n, m, b, M), s.part2_3_length = M.bits
                            }
                            t.part2_3_length > s.part2_3_length && t.assign(s)
                        }
                    }
                }
            };
            var y = [1, 1, 1, 1, 8, 2, 2, 2, 4, 4, 4, 8, 8, 8, 16, 16],
                E = [1, 2, 4, 8, 1, 2, 4, 8, 2, 4, 8, 2, 4, 8, 4, 8],
                T = [0, 0, 0, 0, 3, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4],
                k = [0, 1, 2, 3, 0, 1, 2, 3, 1, 2, 3, 1, 2, 3, 2, 3];
            s.slen1_tab = T, s.slen2_tab = k, this.best_scalefac_store = function(e, a, t, s) {
                var n, r, _, i, f = s.tt[a][t],
                    c = 0;
                for (_ = 0, n = 0; n < f.sfbmax; n++) {
                    var u = f.width[n];
                    for (o(u >= 0), _ += u, i = -u; 0 > i && 0 == f.l3_enc[i + _]; i++);
                    0 == i && (f.scalefac[n] = c = -2)
                }
                if (0 == f.scalefac_scale && 0 == f.preflag) {
                    var h = 0;
                    for (n = 0; n < f.sfbmax; n++) f.scalefac[n] > 0 && (h |= f.scalefac[n]);
                    if (0 == (1 & h) && 0 != h) {
                        for (n = 0; n < f.sfbmax; n++) f.scalefac[n] > 0 && (f.scalefac[n] >>= 1);
                        f.scalefac_scale = c = 1
                    }
                }
                if (0 == f.preflag && f.block_type != l.SHORT_TYPE && 2 == e.mode_gr) {
                    for (n = 11; n < l.SBPSY_l && !(f.scalefac[n] < A.pretab[n] && -2 != f.scalefac[n]); n++);
                    if (n == l.SBPSY_l) {
                        for (n = 11; n < l.SBPSY_l; n++) f.scalefac[n] > 0 && (f.scalefac[n] -= A.pretab[n]);
                        f.preflag = c = 1
                    }
                }
                for (r = 0; 4 > r; r++) s.scfsi[t][r] = 0;
                for (2 == e.mode_gr && 1 == a && s.tt[0][t].block_type != l.SHORT_TYPE && s.tt[1][t].block_type != l.SHORT_TYPE && (M(t, s), c = 0), n = 0; n < f.sfbmax; n++) - 2 == f.scalefac[n] && (f.scalefac[n] = 0);
                0 != c && (2 == e.mode_gr ? this.scale_bitcount(f) : this.scale_bitcount_lsf(e, f))
            };
            var x = [0, 18, 36, 54, 54, 36, 54, 72, 54, 72, 90, 72, 90, 108, 108, 126],
                P = [0, 18, 36, 54, 51, 35, 53, 71, 52, 70, 88, 69, 87, 105, 104, 122],
                I = [0, 10, 20, 30, 33, 21, 31, 41, 32, 42, 52, 43, 53, 63, 64, 74];
            this.scale_bitcount = function(e) {
                var a, t, s, n = 0,
                    r = 0,
                    _ = e.scalefac;
                if (o(w(_, e.sfbmax)), e.block_type == l.SHORT_TYPE) s = x, 0 != e.mixed_block_flag && (s = P);
                else if (s = I,
                    0 == e.preflag) {
                    for (t = 11; t < l.SBPSY_l && !(_[t] < A.pretab[t]); t++);
                    if (t == l.SBPSY_l)
                        for (e.preflag = 1, t = 11; t < l.SBPSY_l; t++) _[t] -= A.pretab[t]
                }
                for (t = 0; t < e.sfbdivide; t++) n < _[t] && (n = _[t]);
                for (; t < e.sfbmax; t++) r < _[t] && (r = _[t]);
                for (e.part2_length = u.LARGE_BITS, a = 0; 16 > a; a++) n < y[a] && r < E[a] && e.part2_length > s[a] && (e.part2_length = s[a], e.scalefac_compress = a);
                return e.part2_length == u.LARGE_BITS
            };
            var L = [
                [15, 15, 7, 7],
                [15, 15, 7, 0],
                [7, 3, 0, 0],
                [15, 31, 31, 0],
                [7, 7, 7, 0],
                [3, 3, 0, 0]
            ];
            this.scale_bitcount_lsf = function(e, a) {
                var t, s, n, _, f, c, u, h, b = i(4),
                    m = a.scalefac;
                for (t = 0 != a.preflag ? 2 : 0, u = 0; 4 > u; u++) b[u] = 0;
                if (a.block_type == l.SHORT_TYPE) {
                    s = 1;
                    var p = A.nr_of_sfb_block[t][s];
                    for (h = 0, n = 0; 4 > n; n++)
                        for (_ = p[n] / 3, u = 0; _ > u; u++, h++)
                            for (f = 0; 3 > f; f++) m[3 * h + f] > b[n] && (b[n] = m[3 * h + f])
                } else {
                    s = 0;
                    var p = A.nr_of_sfb_block[t][s];
                    for (h = 0, n = 0; 4 > n; n++)
                        for (_ = p[n], u = 0; _ > u; u++, h++) m[h] > b[n] && (b[n] = m[h])
                }
                for (c = !1, n = 0; 4 > n; n++) b[n] > L[t][n] && (c = !0);
                if (!c) {
                    var v, d, g, S;
                    for (a.sfb_partition_table = A.nr_of_sfb_block[t][s], n = 0; 4 > n; n++) a.slen[n] = V[b[n]];
                    switch (v = a.slen[0], d = a.slen[1], g = a.slen[2], S = a.slen[3], t) {
                        case 0:
                            a.scalefac_compress = (5 * v + d << 4) + (g << 2) + S;
                            break;
                        case 1:
                            a.scalefac_compress = 400 + (5 * v + d << 2) + g;
                            break;
                        case 2:
                            a.scalefac_compress = 500 + 3 * v + d;
                            break;
                        default:
                            r.err.printf("intensity stereo not implemented yet\n")
                    }
                }
                if (!c)
                    for (o(null != a.sfb_partition_table), a.part2_length = 0, n = 0; 4 > n; n++) a.part2_length += a.slen[n] * a.sfb_partition_table[n];
                return c
            };
            var V = [0, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4];
            this.huffman_init = function(e) {
                for (var a = 2; 576 >= a; a += 2) {
                    for (var t, s = 0; e.scalefac_band.l[++s] < a;);
                    for (t = R[s][0]; e.scalefac_band.l[t + 1] > a;) t--;
                    for (0 > t && (t = R[s][0]), e.bv_scf[a - 2] = t, t = R[s][1]; e.scalefac_band.l[t + e.bv_scf[a - 2] + 2] > a;) t--;
                    0 > t && (t = R[s][1]), e.bv_scf[a - 1] = t
                }
            }
        }
        var n = t(498),
            r = n.System,
            _ = (n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays),
            i = (n.new_array_n, n.new_byte, n.new_double, n.new_float, n.new_float_n, n.new_int),
            o = (n.new_int_n, n.assert),
            l = t(359),
            f = t(645),
            c = t(599),
            u = t(751);
        e.exports = s
    },
    415: function(e, a, t) {
        function s() {
            this.l = i(n.SBMAX_l), this.s = o([n.SBMAX_s, 3]);
            var e = this;
            this.assign = function(a) {
                _.arraycopy(a.l, 0, e.l, 0, n.SBMAX_l);
                for (var t = 0; t < n.SBMAX_s; t++)
                    for (var s = 0; 3 > s; s++) e.s[t][s] = a.s[t][s]
            }
        }
        var n = t(359),
            r = t(498),
            _ = r.System,
            i = (r.VbrMode, r.Float, r.ShortBlock, r.Util, r.Arrays, r.new_array_n, r.new_byte, r.new_double, r.new_float),
            o = r.new_float_n;
        r.new_int, r.new_int_n, r.assert;
        e.exports = s
    },
    419: function(e, a, t) {
        function s(e, a, t, s) {
            this.l = _(1 + i.SBMAX_l), this.s = _(1 + i.SBMAX_s), this.psfb21 = _(1 + i.PSFB21), this.psfb12 = _(1 + i.PSFB12);
            var n = this.l,
                o = this.s;
            4 == arguments.length && (this.arrL = arguments[0], this.arrS = arguments[1], this.arr21 = arguments[2], this.arr12 = arguments[3], r.arraycopy(this.arrL, 0, n, 0, Math.min(this.arrL.length, this.l.length)), r.arraycopy(this.arrS, 0, o, 0, Math.min(this.arrS.length, this.s.length)), r.arraycopy(this.arr21, 0, this.psfb21, 0, Math.min(this.arr21.length, this.psfb21.length)), r.arraycopy(this.arr12, 0, this.psfb12, 0, Math.min(this.arr12.length, this.psfb12.length)))
        }
        var n = t(498),
            r = n.System,
            _ = (n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float, n.new_float_n, n.new_int),
            i = (n.new_int_n, n.assert, t(359));
        e.exports = s
    },
    42: function(e, a, t) {
        function s() {
            this.thm = new n, this.en = new n
        }
        var n = t(415);
        e.exports = s
    },
    427: function(e, a, t) {
        function s() {
            function e(e, a, t, s, n, r) {
                for (; 0 != n--;) t[s] = 1e-10 + e[a + 0] * r[0] - t[s - 1] * r[1] + e[a - 1] * r[2] - t[s - 2] * r[3] + e[a - 2] * r[4] - t[s - 3] * r[5] + e[a - 3] * r[6] - t[s - 4] * r[7] + e[a - 4] * r[8] - t[s - 5] * r[9] + e[a - 5] * r[10] - t[s - 6] * r[11] + e[a - 6] * r[12] - t[s - 7] * r[13] + e[a - 7] * r[14] - t[s - 8] * r[15] + e[a - 8] * r[16] - t[s - 9] * r[17] + e[a - 9] * r[18] - t[s - 10] * r[19] + e[a - 10] * r[20], ++s, ++a
            }

            function a(e, a, t, s, n, r) {
                for (; 0 != n--;) t[s] = e[a + 0] * r[0] - t[s - 1] * r[1] + e[a - 1] * r[2] - t[s - 2] * r[3] + e[a - 2] * r[4], ++s, ++a
            }

            function t(e, a) {
                for (var t = 0; t < MAX_ORDER; t++) e.linprebuf[t] = e.lstepbuf[t] = e.loutbuf[t] = e.rinprebuf[t] = e.rstepbuf[t] = e.routbuf[t] = 0;
                switch (0 | a) {
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
                return e.sampleWindow = 0 | (a * f + c - 1) / c, e.lsum = 0, e.rsum = 0, e.totsamp = 0, _.ill(e.A, 0), INIT_GAIN_ANALYSIS_OK
            }

            function n(e) {
                return e * e
            }

            function i(e, a) {
                var t, n = 0;
                for (t = 0; a > t; t++) n += e[t];
                if (0 == n) return GAIN_NOT_ENOUGH_SAMPLES;
                var r = 0 | Math.ceil(n * (1 - l));
                for (t = a; t-- > 0 && !((r -= e[t]) <= 0););
                return o - t / s.STEPS_per_dB
            }
            var o = 64.82,
                l = (s.YULE_ORDER, .95),
                f = (s.MAX_SAMP_FREQ, s.RMS_WINDOW_TIME_NUMERATOR),
                c = s.RMS_WINDOW_TIME_DENOMINATOR,
                u = (s.MAX_SAMPLES_PER_WINDOW, [
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
                h = [
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
            this.InitGainAnalysis = function(e, a) {
                return t(e, a) != INIT_GAIN_ANALYSIS_OK ? INIT_GAIN_ANALYSIS_ERROR : (e.linpre = MAX_ORDER, e.rinpre = MAX_ORDER, e.lstep = MAX_ORDER, e.rstep = MAX_ORDER, e.lout = MAX_ORDER, e.rout = MAX_ORDER, _.fill(e.B, 0), INIT_GAIN_ANALYSIS_OK)
            }, this.AnalyzeSamples = function(t, _, i, o, l, f, c) {
                var b, m, p, v, d, g, S;
                if (0 == f) return GAIN_ANALYSIS_OK;
                switch (S = 0, d = f, c) {
                    case 1:
                        o = _, l = i;
                        break;
                    case 2:
                        break;
                    default:
                        return GAIN_ANALYSIS_ERROR
                }
                for (f < MAX_ORDER ? (r.arraycopy(_, i, t.linprebuf, MAX_ORDER, f), r.arraycopy(o, l, t.rinprebuf, MAX_ORDER, f)) : (r.arraycopy(_, i, t.linprebuf, MAX_ORDER, MAX_ORDER), r.arraycopy(o, l, t.rinprebuf, MAX_ORDER, MAX_ORDER)); d > 0;) {
                    g = d > t.sampleWindow - t.totsamp ? t.sampleWindow - t.totsamp : d, S < MAX_ORDER ? (b = t.linpre + S, m = t.linprebuf, p = t.rinpre + S, v = t.rinprebuf, g > MAX_ORDER - S && (g = MAX_ORDER - S)) : (b = i + S, m = _, p = l + S, v = o), e(m, b, t.lstepbuf, t.lstep + t.totsamp, g, u[t.reqindex]), e(v, p, t.rstepbuf, t.rstep + t.totsamp, g, u[t.reqindex]), a(t.lstepbuf, t.lstep + t.totsamp, t.loutbuf, t.lout + t.totsamp, g, h[t.reqindex]), a(t.rstepbuf, t.rstep + t.totsamp, t.routbuf, t.rout + t.totsamp, g, h[t.reqindex]), b = t.lout + t.totsamp, m = t.loutbuf, p = t.rout + t.totsamp, v = t.routbuf;
                    for (var M = g % 8; 0 != M--;) t.lsum += n(m[b++]), t.rsum += n(v[p++]);
                    for (M = g / 8; 0 != M--;) t.lsum += n(m[b + 0]) + n(m[b + 1]) + n(m[b + 2]) + n(m[b + 3]) + n(m[b + 4]) + n(m[b + 5]) + n(m[b + 6]) + n(m[b + 7]), b += 8, t.rsum += n(v[p + 0]) + n(v[p + 1]) + n(v[p + 2]) + n(v[p + 3]) + n(v[p + 4]) + n(v[p + 5]) + n(v[p + 6]) + n(v[p + 7]), p += 8;
                    if (d -= g, S += g, t.totsamp += g, t.totsamp == t.sampleWindow) {
                        var w = 10 * s.STEPS_per_dB * Math.log10((t.lsum + t.rsum) / t.totsamp * .5 + 1e-37),
                            A = 0 >= w ? 0 : 0 | w;
                        A >= t.A.length && (A = t.A.length - 1), t.A[A]++, t.lsum = t.rsum = 0, r.arraycopy(t.loutbuf, t.totsamp, t.loutbuf, 0, MAX_ORDER), r.arraycopy(t.routbuf, t.totsamp, t.routbuf, 0, MAX_ORDER), r.arraycopy(t.lstepbuf, t.totsamp, t.lstepbuf, 0, MAX_ORDER), r.arraycopy(t.rstepbuf, t.totsamp, t.rstepbuf, 0, MAX_ORDER), t.totsamp = 0
                    }
                    if (t.totsamp > t.sampleWindow) return GAIN_ANALYSIS_ERROR
                }
                return f < MAX_ORDER ? (r.arraycopy(t.linprebuf, f, t.linprebuf, 0, MAX_ORDER - f), r.arraycopy(t.rinprebuf, f, t.rinprebuf, 0, MAX_ORDER - f), r.arraycopy(_, i, t.linprebuf, MAX_ORDER - f, f), r.arraycopy(o, l, t.rinprebuf, MAX_ORDER - f, f)) : (r.arraycopy(_, i + f - MAX_ORDER, t.linprebuf, 0, MAX_ORDER), r.arraycopy(o, l + f - MAX_ORDER, t.rinprebuf, 0, MAX_ORDER)), GAIN_ANALYSIS_OK
            }, this.GetTitleGain = function(e) {
                for (var a = i(e.A, e.A.length), t = 0; t < e.A.length; t++) e.B[t] += e.A[t], e.A[t] = 0;
                for (var t = 0; t < MAX_ORDER; t++) e.linprebuf[t] = e.lstepbuf[t] = e.loutbuf[t] = e.rinprebuf[t] = e.rstepbuf[t] = e.routbuf[t] = 0;
                return e.totsamp = 0, e.lsum = e.rsum = 0, a
            }
        }
        var n = t(498),
            r = n.System,
            _ = (n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays);
        n.new_array_n, n.new_byte, n.new_double, n.new_float, n.new_float_n, n.new_int, n.new_int_n, n.assert;
        s.STEPS_per_dB = 100, s.MAX_dB = 120, s.GAIN_NOT_ENOUGH_SAMPLES = -24601, s.GAIN_ANALYSIS_ERROR = 0, s.GAIN_ANALYSIS_OK = 1, s.INIT_GAIN_ANALYSIS_ERROR = 0, s.INIT_GAIN_ANALYSIS_OK = 1, s.YULE_ORDER = 10, s.MAX_ORDER = s.YULE_ORDER, s.MAX_SAMP_FREQ = 48e3, s.RMS_WINDOW_TIME_NUMERATOR = 1, s.RMS_WINDOW_TIME_DENOMINATOR = 20, s.MAX_SAMPLES_PER_WINDOW = s.MAX_SAMP_FREQ * s.RMS_WINDOW_TIME_NUMERATOR / s.RMS_WINDOW_TIME_DENOMINATOR + 1, e.exports = s
    },
    463: function(e, a, t) {
        function s() {
            this.tt = [
                [null, null],
                [null, null]
            ], this.main_data_begin = 0, this.private_bits = 0, this.resvDrain_pre = 0, this.resvDrain_post = 0, this.scfsi = [r(4), r(4)];
            for (var e = 0; 2 > e; e++)
                for (var a = 0; 2 > a; a++) this.tt[e][a] = new _
        }
        var n = t(498),
            r = (n.System, n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float, n.new_float_n, n.new_int),
            _ = (n.new_int_n, n.assert, t(599));
        e.exports = s
    },
    464: function(e, a) {
        function t(e) {
            this.bits = e
        }
        e.exports = t
    },
    484: function(e, a, t) {
        function s() {
            function e() {
                this.write_timing = 0, this.ptr = 0, this.buf = r(a)
            }
            var a = 40;
            this.Class_ID = 0, this.lame_encode_frame_init = 0, this.iteration_init_init = 0, this.fill_buffer_resample_init = 0, this.mfbuf = o([2, s.MFSIZE]), this.mode_gr = 0, this.channels_in = 0, this.channels_out = 0, this.resample_ratio = 0, this.mf_samples_to_encode = 0, this.mf_size = 0, this.VBR_min_bitrate = 0, this.VBR_max_bitrate = 0, this.bitrate_index = 0, this.samplerate_index = 0, this.mode_ext = 0, this.lowpass1 = 0, this.lowpass2 = 0, this.highpass1 = 0, this.highpass2 = 0, this.noise_shaping = 0, this.noise_shaping_amp = 0, this.substep_shaping = 0, this.psymodel = 0, this.noise_shaping_stop = 0, this.subblock_gain = 0, this.use_best_huffman = 0, this.full_outer_loop = 0, this.l3_side = new c, this.ms_ratio = i(2), this.padding = 0, this.frac_SpF = 0, this.slot_lag = 0, this.tag_spec = null, this.nMusicCRC = 0, this.OldValue = l(2), this.CurrentStep = l(2), this.masking_lower = 0, this.bv_scf = l(576), this.pseudohalf = l(v.SFBMAX), this.sfb21_extra = !1, this.inbuf_old = new Array(2), this.blackfilt = new Array(2 * s.BPC + 1), this.itime = _(2), this.sideinfo_len = 0, this.sb_sample = o([2, 2, 18, p.SBLIMIT]), this.amp_filter = i(32), this.header = new Array(s.MAX_HEADER_BUF), this.h_ptr = 0, this.w_ptr = 0, this.ancillary_flag = 0, this.ResvSize = 0, this.ResvMax = 0, this.scalefac_band = new u, this.minval_l = i(p.CBANDS), this.minval_s = i(p.CBANDS), this.nb_1 = o([4, p.CBANDS]), this.nb_2 = o([4, p.CBANDS]), this.nb_s1 = o([4, p.CBANDS]), this.nb_s2 = o([4, p.CBANDS]), this.s3_ss = null, this.s3_ll = null, this.decay = 0, this.thm = new Array(4), this.en = new Array(4), this.tot_ener = i(4), this.loudness_sq = o([2, 2]), this.loudness_sq_save = i(2), this.mld_l = i(p.SBMAX_l), this.mld_s = i(p.SBMAX_s), this.bm_l = l(p.SBMAX_l), this.bo_l = l(p.SBMAX_l), this.bm_s = l(p.SBMAX_s), this.bo_s = l(p.SBMAX_s), this.npart_l = 0, this.npart_s = 0, this.s3ind = f([p.CBANDS, 2]), this.s3ind_s = f([p.CBANDS, 2]), this.numlines_s = l(p.CBANDS), this.numlines_l = l(p.CBANDS), this.rnumlines_l = i(p.CBANDS), this.mld_cb_l = i(p.CBANDS), this.mld_cb_s = i(p.CBANDS), this.numlines_s_num1 = 0, this.numlines_l_num1 = 0, this.pe = i(4), this.ms_ratio_s_old = 0, this.ms_ratio_l_old = 0, this.ms_ener_ratio_old = 0, this.blocktype_old = l(2), this.nsPsy = new h, this.VBR_seek_table = new b, this.ATH = null, this.PSY = null, this.nogap_total = 0, this.nogap_current = 0, this.decode_on_the_fly = !0, this.findReplayGain = !0, this.findPeakSample = !0, this.PeakSample = 0, this.RadioGain = 0, this.AudiophileGain = 0, this.rgdata = null, this.noclipGainChange = 0, this.noclipScale = 0, this.bitrate_stereoMode_Hist = f([16, 5]), this.bitrate_blockType_Hist = f([16, 6]), this.pinfo = null, this.hip = null, this.in_buffer_nsamples = 0, this.in_buffer_0 = null, this.in_buffer_1 = null, this.iteration_loop = null;
            for (var t = 0; t < this.en.length; t++) this.en[t] = new m;
            for (var t = 0; t < this.thm.length; t++) this.thm[t] = new m;
            for (var t = 0; t < this.header.length; t++) this.header[t] = new e
        }
        var n = t(498),
            r = (n.System, n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n, n.new_byte),
            _ = n.new_double,
            i = n.new_float,
            o = n.new_float_n,
            l = n.new_int,
            f = n.new_int_n,
            c = (n.assert, t(463)),
            u = t(419),
            h = t(726),
            b = t(554),
            m = t(415),
            p = t(359),
            v = t(561);
        s.MFSIZE = 3456 + p.ENCDELAY - p.MDCTDELAY, s.MAX_HEADER_BUF = 256, s.MAX_BITS_PER_CHANNEL = 4095, s.MAX_BITS_PER_GRANULE = 7680, s.BPC = 320, e.exports = s
    },
    489: function(e, a, t) {
        function s() {
            this.global_gain = 0, this.sfb_count1 = 0, this.step = _(39), this.noise = r(39), this.noise_log = r(39)
        }
        var n = t(498),
            r = n.new_float,
            _ = n.new_int;
        n.assert;
        e.exports = s
    },
    498: function(e, a) {
        function t(e) {
            return new Int8Array(e)
        }

        function s(e) {
            return new Int16Array(e)
        }

        function n(e) {
            return new Int32Array(e)
        }

        function r(e) {
            return new Float32Array(e)
        }

        function _(e) {
            return new Float64Array(e)
        }

        function i(e) {
            if (1 == e.length) return r(e[0]);
            var a = e[0];
            e = e.slice(1);
            for (var t = [], s = 0; a > s; s++) t.push(i(e));
            return t
        }

        function o(e) {
            if (1 == e.length) return n(e[0]);
            var a = e[0];
            e = e.slice(1);
            for (var t = [], s = 0; a > s; s++) t.push(o(e));
            return t
        }

        function l(e) {
            if (1 == e.length) return s(e[0]);
            var a = e[0];
            e = e.slice(1);
            for (var t = [], n = 0; a > n; n++) t.push(l(e));
            return t
        }

        function f(e) {
            if (1 == e.length) return new Array(e[0]);
            var a = e[0];
            e = e.slice(1);
            for (var t = [], s = 0; a > s; s++) t.push(f(e));
            return t
        }

        function c(e) {
            this.ordinal = e
        }

        function u(e) {
            this.ordinal = e
        }
        var h = {};
        h.fill = function(e, a, t, s) {
            if (2 == arguments.length)
                for (var n = 0; n < e.length; n++) e[n] = arguments[1];
            else
                for (var n = a; t > n; n++) e[n] = s
        };
        var b = {};
        b.arraycopy = function(e, a, t, s, n) {
            for (var r = a + n; r > a;) t[s++] = e[a++]
        };
        var m = {};
        m.SQRT2 = 1.4142135623730951, m.FAST_LOG10 = function(e) {
            return Math.log10(e)
        }, m.FAST_LOG10_X = function(e, a) {
            return Math.log10(e) * a
        }, c.short_block_allowed = new c(0), c.short_block_coupled = new c(1), c.short_block_dispensed = new c(2), c.short_block_forced = new c(3);
        var p = {};
        p.MAX_VALUE = 3.4028235e38, u.vbr_off = new u(0), u.vbr_mt = new u(1), u.vbr_rh = new u(2), u.vbr_abr = new u(3), u.vbr_mtrh = new u(4), u.vbr_default = u.vbr_mtrh;
        var v = function(e) {};
        e.exports = {
            System: b,
            VbrMode: u,
            Float: p,
            ShortBlock: c,
            Util: m,
            Arrays: h,
            new_array_n: f,
            new_byte: t,
            new_double: _,
            new_float: r,
            new_float_n: i,
            new_int: n,
            new_int_n: o,
            new_short: s,
            new_short_n: l,
            assert: v
        }
    },
    520: function(e, a, t) {
        "use strict";

        function s(e, a) {
            if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function")
        }
        t.r(a);
        var n = t(654),
            r = n.Mp3Encoder;
        self.onmessage = function(e) {
            switch (e.data.command) {
                case "encode":
                    _ && _.encode(e.data.buffers);
                    break;
                case "done":
                    _ && _.encodeFinalFrame();
                    break;
                case "init":
                    _ = new o(e.data)
            }
        };
        var _ = void 0,
            i = 128,
            o = function() {
                function e(a) {
                    s(this, e), this.numberOfChannels = a.numberOfChannels || 1, this.originalSampleRate = a.originalSampleRate, this.bitRate = a.bitRate || i, this._codec = new r(this.numberOfChannels, this.originalSampleRate, this.bitRate)
                }
                return e.prototype._convertBuffer = function(e) {
                    for (var a = new Int16Array(e[0].length), t = 0; t < a.length; t++) {
                        var s = e[0][t] / 1.2 * 32767;
                        a[t] = 0 > s ? Math.max(s, -32768) : Math.min(s, 32767)
                    }
                    return a
                }, e.prototype.encode = function(e) {
                    var a = this._convertBuffer(e),
                        t = this._codec.encodeBuffer(a);
                    self.postMessage({
                        type: "data",
                        buffer: new Int8Array(t)
                    })
                }, e.prototype.encodeFinalFrame = function() {
                    var e = this._codec.flush();
                    self.postMessage({
                        type: "finish",
                        buffer: new Int8Array(e)
                    }), self.close()
                }, e
            }()
    },
    529: function(e, a, t) {
        function s() {
            function e(e, a) {
                if (e.nVbrNumFrames++, e.sum += a, e.seen++, !(e.seen < e.want) && (e.pos < e.size && (e.bag[e.pos] = e.sum, e.pos++, e.seen = 0), e.pos == e.size)) {
                    for (var t = 1; t < e.size; t += 2) e.bag[t / 2] = e.bag[t];
                    e.want *= 2, e.pos /= 2
                }
            }

            function a(e, a) {
                if (!(e.pos <= 0))
                    for (var t = 1; B > t; ++t) {
                        var s, n, r = t / B,
                            _ = 0 | Math.floor(r * e.pos);
                        _ > e.pos - 1 && (_ = e.pos - 1), s = e.bag[_], n = e.sum;
                        var i = 0 | 256 * s / n;
                        i > 255 && (i = 255), a[t] = 255 & i
                    }
            }

            function t(e, a) {
                var t = 255 & e[a + 0];
                return t <<= 8, t |= 255 & e[a + 1], t <<= 8, t |= 255 & e[a + 2], t <<= 8, t |= 255 & e[a + 3]
            }

            function n(e, a, t) {
                e[a + 0] = 255 & (t >> 24 & 255), e[a + 1] = 255 & (t >> 16 & 255), e[a + 2] = 255 & (t >> 8 & 255), e[a + 3] = 255 & (255 & t)
            }

            function c(e, a, t) {
                e[a + 0] = 255 & (t >> 8 & 255), e[a + 1] = 255 & (255 & t)
            }

            function u(e, a) {
                return new String(e, a, L.length(), I).equals(L) || new String(e, a, V.length(), I).equals(V)
            }

            function h(e, a, t) {
                return 255 & (e << a | t & ~(-1 << a))
            }

            function b(e, a) {
                var t = e.internal_flags;
                a[0] = h(a[0], 8, 255), a[1] = h(a[1], 3, 7), a[1] = h(a[1], 1, e.out_samplerate < 16e3 ? 0 : 1), a[1] = h(a[1], 1, e.version), a[1] = h(a[1], 2, 1), a[1] = h(a[1], 1, e.error_protection ? 0 : 1), a[2] = h(a[2], 4, t.bitrate_index), a[2] = h(a[2], 2, t.samplerate_index), a[2] = h(a[2], 1, 0), a[2] = h(a[2], 1, e.extension), a[3] = h(a[3], 2, e.mode.ordinal()), a[3] = h(a[3], 2, t.mode_ext), a[3] = h(a[3], 1, e.copyright), a[3] = h(a[3], 1, e.original), a[3] = h(a[3], 2, e.emphasis), a[0] = 255;
                var s, n = 255 & (241 & a[1]);
                s = 1 == e.version ? k : e.out_samplerate < 16e3 ? P : x, e.VBR == _.vbr_off && (s = e.brate);
                var r;
                r = e.free_format ? 0 : 255 & 16 * d.BitrateIndex(s, e.version, e.out_samplerate), 1 == e.version ? (a[1] = 255 & (10 | n), n = 255 & (13 & a[2]), a[2] = 255 & (r | n)) : (a[1] = 255 & (2 | n), n = 255 & (13 & a[2]), a[2] = 255 & (r | n))
            }

            function m(e, a) {
                var t = a ^ e;
                return a = a >> 8 ^ H[255 & t]
            }

            function p(e, a, t, s, r) {
                var _, o, l, f = e.internal_flags,
                    u = 0,
                    h = e.encoder_delay,
                    b = e.encoder_padding,
                    p = 100 - 10 * e.VBR_q - e.quality,
                    v = S.getLameVeryShortVersion(),
                    d = 0,
                    g = [1, 5, 3, 2, 4, 0, 3],
                    M = 0 | (e.lowpassfreq / 100 + .5 > 255 ? 255 : e.lowpassfreq / 100 + .5),
                    w = 0,
                    A = 0,
                    R = 0,
                    B = e.internal_flags.noise_shaping,
                    y = 0,
                    E = 0,
                    T = 0,
                    k = 0,
                    x = 0,
                    P = 0 != (1 & e.exp_nspsytune),
                    I = 0 != (2 & e.exp_nspsytune),
                    L = !1,
                    V = !1,
                    H = e.internal_flags.nogap_total,
                    O = e.internal_flags.nogap_current,
                    N = e.ATHtype,
                    X = 0;
                switch (e.VBR) {
                    case vbr_abr:
                        l = e.VBR_mean_bitrate_kbps;
                        break;
                    case vbr_off:
                        l = e.brate;
                        break;
                    default:
                        l = e.VBR_min_bitrate_kbps
                }
                switch (_ = e.VBR.ordinal() < g.length ? g[e.VBR.ordinal()] : 0, o = 16 * d + _, f.findReplayGain && (f.RadioGain > 510 && (f.RadioGain = 510), f.RadioGain < -510 && (f.RadioGain = -510), A = 8192, A |= 3072, f.RadioGain >= 0 ? A |= f.RadioGain : (A |= 512, A |= -f.RadioGain)), f.findPeakSample && (w = Math.abs(0 | f.PeakSample / 32767 * Math.pow(2, 23) + .5)), -1 != H && (O > 0 && (V = !0), H - 1 > O && (L = !0)), X = N + ((P ? 1 : 0) << 4) + ((I ? 1 : 0) << 5) + ((L ? 1 : 0) << 6) + ((V ? 1 : 0) << 7), 0 > p && (p = 0), e.mode) {
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
                T = e.in_samplerate <= 32e3 ? 0 : 48e3 == e.in_samplerate ? 2 : e.in_samplerate > 48e3 ? 3 : 1, (e.short_blocks == i.short_block_forced || e.short_blocks == i.short_block_dispensed || -1 == e.lowpassfreq && -1 == e.highpassfreq || e.scale_left < e.scale_right || e.scale_left > e.scale_right || e.disable_reservoir && e.brate < 320 || e.noATH || e.ATHonly || 0 == N || e.in_samplerate <= 32e3) && (E = 1), k = B + (y << 2) + (E << 5) + (T << 6), x = f.nMusicCRC, n(t, s + u, p), u += 4;
                for (var D = 0; 9 > D; D++) t[s + u + D] = 255 & v.charAt(D);
                u += 9, t[s + u] = 255 & o, u++, t[s + u] = 255 & M, u++, n(t, s + u, w), u += 4, c(t, s + u, A), u += 2, c(t, s + u, R), u += 2, t[s + u] = 255 & X, u++, l >= 255 ? t[s + u] = 255 : t[s + u] = 255 & l, u++, t[s + u] = 255 & h >> 4, t[s + u + 1] = 255 & (h << 4) + (b >> 8), t[s + u + 2] = 255 & b, u += 3, t[s + u] = 255 & k, u++, t[s + u++] = 0, c(t, s + u, e.preset), u += 2, n(t, s + u, a), u += 4, c(t, s + u, x), u += 2;
                for (var F = 0; u > F; F++) r = m(t[s + F], r);
                return c(t, s + u, r), u += 2
            }

            function v(e) {
                e.seek(0);
                var a = l(10);
                e.readFully(a);
                var t;
                return t = new String(a, "ISO-8859-1").startsWith("ID3") ? 0 : ((127 & a[6]) << 21 | (127 & a[7]) << 14 | (127 & a[8]) << 7 | 127 & a[9]) + a.length
            }
            var d, g, S;
            this.setModules = function(e, a, t) {
                d = e, g = a, S = t
            };
            var M = 1,
                w = 2,
                A = 4,
                R = 8,
                B = s.NUMTOCENTRIES,
                y = s.MAXFRAMESIZE,
                E = B + 4 + 4 + 4 + 4 + 4,
                T = E + 9 + 1 + 1 + 8 + 1 + 1 + 3 + 1 + 1 + 2 + 4 + 2 + 2,
                k = 128,
                x = 64,
                P = 32,
                I = null,
                L = "Xing",
                V = "Info",
                H = [0, 49345, 49537, 320, 49921, 960, 640, 49729, 50689, 1728, 1920, 51009, 1280, 50625, 50305, 1088, 52225, 3264, 3456, 52545, 3840, 53185, 52865, 3648, 2560, 51905, 52097, 2880, 51457, 2496, 2176, 51265, 55297, 6336, 6528, 55617, 6912, 56257, 55937, 6720, 7680, 57025, 57217, 8e3, 56577, 7616, 7296, 56385, 5120, 54465, 54657, 5440, 55041, 6080, 5760, 54849, 53761, 4800, 4992, 54081, 4352, 53697, 53377, 4160, 61441, 12480, 12672, 61761, 13056, 62401, 62081, 12864, 13824, 63169, 63361, 14144, 62721, 13760, 13440, 62529, 15360, 64705, 64897, 15680, 65281, 16320, 16e3, 65089, 64001, 15040, 15232, 64321, 14592, 63937, 63617, 14400, 10240, 59585, 59777, 10560, 60161, 11200, 10880, 59969, 60929, 11968, 12160, 61249, 11520, 60865, 60545, 11328, 58369, 9408, 9600, 58689, 9984, 59329, 59009, 9792, 8704, 58049, 58241, 9024, 57601, 8640, 8320, 57409, 40961, 24768, 24960, 41281, 25344, 41921, 41601, 25152, 26112, 42689, 42881, 26432, 42241, 26048, 25728, 42049, 27648, 44225, 44417, 27968, 44801, 28608, 28288, 44609, 43521, 27328, 27520, 43841, 26880, 43457, 43137, 26688, 30720, 47297, 47489, 31040, 47873, 31680, 31360, 47681, 48641, 32448, 32640, 48961, 32e3, 48577, 48257, 31808, 46081, 29888, 30080, 46401, 30464, 47041, 46721, 30272, 29184, 45761, 45953, 29504, 45313, 29120, 28800, 45121, 20480, 37057, 37249, 20800, 37633, 21440, 21120, 37441, 38401, 22208, 22400, 38721, 21760, 38337, 38017, 21568, 39937, 23744, 23936, 40257, 24320, 40897, 40577, 24128, 23040, 39617, 39809, 23360, 39169, 22976, 22656, 38977, 34817, 18624, 18816, 35137, 19200, 35777, 35457, 19008, 19968, 36545, 36737, 20288, 36097, 19904, 19584, 35905, 17408, 33985, 34177, 17728, 34561, 18368, 18048, 34369, 33281, 17088, 17280, 33601, 16640, 33217, 32897, 16448];
            this.addVbrFrame = function(a) {
                var t = a.internal_flags,
                    s = Tables.bitrate_table[a.version][t.bitrate_index];
                f(null != t.VBR_seek_table.bag), e(t.VBR_seek_table, s)
            }, this.getVbrTag = function(e) {
                var a = new VBRTagData,
                    s = 0;
                a.flags = 0;
                var n = e[s + 1] >> 3 & 1,
                    r = e[s + 2] >> 2 & 3,
                    _ = e[s + 3] >> 6 & 3,
                    i = e[s + 2] >> 4 & 15;
                if (i = Tables.bitrate_table[n][i], e[s + 1] >> 4 == 14 ? a.samprate = Tables.samplerate_table[2][r] : a.samprate = Tables.samplerate_table[n][r], s += 0 != n ? 3 != _ ? 36 : 21 : 3 != _ ? 21 : 13, !u(e, s)) return null;
                s += 4, a.hId = n;
                var o = a.flags = t(e, s);
                if (s += 4, 0 != (o & M) && (a.frames = t(e, s), s += 4), 0 != (o & w) && (a.bytes = t(e, s), s += 4), 0 != (o & A)) {
                    if (null != a.toc)
                        for (var l = 0; B > l; l++) a.toc[l] = e[s + l];
                    s += B
                }
                a.vbrScale = -1, 0 != (o & R) && (a.vbrScale = t(e, s), s += 4), a.headersize = 72e3 * (n + 1) * i / a.samprate, s += 21;
                var f = e[s + 0] << 4;
                f += e[s + 1] >> 4;
                var c = (15 & e[s + 1]) << 8;
                return c += 255 & e[s + 2], (0 > f || f > 3e3) && (f = -1), (0 > c || c > 3e3) && (c = -1), a.encDelay = f, a.encPadding = c, a
            }, this.InitVbrTag = function(e) {
                var a, t = e.internal_flags;
                a = 1 == e.version ? k : e.out_samplerate < 16e3 ? P : x, e.VBR == _.vbr_off && (a = e.brate);
                var s = 72e3 * (e.version + 1) * a / e.out_samplerate,
                    n = t.sideinfo_len + T;
                if (t.VBR_seek_table.TotalFrameSize = s, n > s || s > y) return void(e.bWriteVbrTag = !1);
                t.VBR_seek_table.nVbrNumFrames = 0, t.VBR_seek_table.nBytesWritten = 0, t.VBR_seek_table.sum = 0, t.VBR_seek_table.seen = 0, t.VBR_seek_table.want = 1, t.VBR_seek_table.pos = 0, null == t.VBR_seek_table.bag && (t.VBR_seek_table.bag = new int[400], t.VBR_seek_table.size = 400);
                var r = l(y);
                b(e, r);
                for (var i = t.VBR_seek_table.TotalFrameSize, o = 0; i > o; ++o) g.add_dummy_byte(e, 255 & r[o], 1)
            }, this.updateMusicCRC = function(e, a, t, s) {
                for (var n = 0; s > n; ++n) e[0] = m(a[t + n], e[0])
            }, this.getLameTagFrame = function(e, t) {
                var s = e.internal_flags;
                if (!e.bWriteVbrTag) return 0;
                if (s.Class_ID != Lame.LAME_ID) return 0;
                if (s.VBR_seek_table.pos <= 0) return 0;
                if (t.length < s.VBR_seek_table.TotalFrameSize) return s.VBR_seek_table.TotalFrameSize;
                o.fill(t, 0, s.VBR_seek_table.TotalFrameSize, 0), b(e, t);
                var i = l(B);
                if (e.free_format)
                    for (var f = 1; B > f; ++f) i[f] = 255 & 255 * f / 100;
                else a(s.VBR_seek_table, i);
                var c = s.sideinfo_len;
                e.error_protection && (c -= 2), e.VBR == _.vbr_off ? (t[c++] = 255 & V.charAt(0), t[c++] = 255 & V.charAt(1), t[c++] = 255 & V.charAt(2), t[c++] = 255 & V.charAt(3)) : (t[c++] = 255 & L.charAt(0), t[c++] = 255 & L.charAt(1), t[c++] = 255 & L.charAt(2), t[c++] = 255 & L.charAt(3)), n(t, c, M + w + A + R), c += 4, n(t, c, s.VBR_seek_table.nVbrNumFrames), c += 4;
                var u = s.VBR_seek_table.nBytesWritten + s.VBR_seek_table.TotalFrameSize;
                n(t, c, 0 | u), c += 4, r.arraycopy(i, 0, t, c, i.length), c += i.length, e.error_protection && g.CRC_writeheader(s, t);
                for (var h = 0, f = 0; c > f; f++) h = m(t[f], h);
                return c += p(e, u, t, c, h), s.VBR_seek_table.TotalFrameSize
            }, this.putVbrTag = function(e, a) {
                var t = e.internal_flags;
                if (t.VBR_seek_table.pos <= 0) return -1;
                if (a.seek(a.length()), 0 == a.length()) return -1;
                var s = v(a);
                a.seek(s);
                var n = l(y),
                    r = getLameTagFrame(e, n);
                return r > n.length ? -1 : 1 > r ? 0 : (a.write(n, 0, r), 0)
            }
        }
        var n = t(498),
            r = n.System,
            _ = n.VbrMode,
            i = (n.Float, n.ShortBlock),
            o = (n.Util, n.Arrays),
            l = (n.new_array_n, n.new_byte),
            f = (n.new_double, n.new_float, n.new_float_n, n.new_int, n.new_int_n, n.assert);
        s.NUMTOCENTRIES = 100, s.MAXFRAMESIZE = 2880, e.exports = s
    },
    533: function(e, a, t) {
        function s() {
            function e(e, a, t, s, n, r, _, i, o, l, f, c, u, h, b) {
                this.vbr_q = e, this.quant_comp = a, this.quant_comp_s = t, this.expY = s, this.st_lrm = n, this.st_s = r, this.masking_adj = _, this.masking_adj_short = i, this.ath_lower = o, this.ath_curve = l, this.ath_sensitivity = f, this.interch = c, this.safejoint = u, this.sfb21mod = h, this.msfix = b
            }

            function a(e, a, t, s, n, r, _, i, o, l, f, c, u, h) {
                this.quant_comp = a, this.quant_comp_s = t, this.safejoint = s, this.nsmsfix = n, this.st_lrm = r, this.st_s = _, this.nsbass = i, this.scale = o, this.masking_adj = l, this.ath_lower = f, this.ath_curve = c, this.interch = u, this.sfscale = h
            }

            function t(e, a, t) {
                var s = e.VBR == r.vbr_rh ? i : o,
                    _ = e.VBR_q_frac,
                    l = s[a],
                    f = s[a + 1],
                    c = l;
                l.st_lrm = l.st_lrm + _ * (f.st_lrm - l.st_lrm), l.st_s = l.st_s + _ * (f.st_s - l.st_s), l.masking_adj = l.masking_adj + _ * (f.masking_adj - l.masking_adj), l.masking_adj_short = l.masking_adj_short + _ * (f.masking_adj_short - l.masking_adj_short), l.ath_lower = l.ath_lower + _ * (f.ath_lower - l.ath_lower), l.ath_curve = l.ath_curve + _ * (f.ath_curve - l.ath_curve), l.ath_sensitivity = l.ath_sensitivity + _ * (f.ath_sensitivity - l.ath_sensitivity), l.interch = l.interch + _ * (f.interch - l.interch), l.msfix = l.msfix + _ * (f.msfix - l.msfix), n(e, c.vbr_q), 0 != t ? e.quant_comp = c.quant_comp : Math.abs(e.quant_comp - -1) > 0 || (e.quant_comp = c.quant_comp), 0 != t ? e.quant_comp_short = c.quant_comp_s : Math.abs(e.quant_comp_short - -1) > 0 || (e.quant_comp_short = c.quant_comp_s), 0 != c.expY && (e.experimentalY = 0 != c.expY), 0 != t ? e.internal_flags.nsPsy.attackthre = c.st_lrm : Math.abs(e.internal_flags.nsPsy.attackthre - -1) > 0 || (e.internal_flags.nsPsy.attackthre = c.st_lrm), 0 != t ? e.internal_flags.nsPsy.attackthre_s = c.st_s : Math.abs(e.internal_flags.nsPsy.attackthre_s - -1) > 0 || (e.internal_flags.nsPsy.attackthre_s = c.st_s), 0 != t ? e.maskingadjust = c.masking_adj : Math.abs(e.maskingadjust - 0) > 0 || (e.maskingadjust = c.masking_adj), 0 != t ? e.maskingadjust_short = c.masking_adj_short : Math.abs(e.maskingadjust_short - 0) > 0 || (e.maskingadjust_short = c.masking_adj_short), 0 != t ? e.ATHlower = -c.ath_lower / 10 : Math.abs(10 * -e.ATHlower - 0) > 0 || (e.ATHlower = -c.ath_lower / 10), 0 != t ? e.ATHcurve = c.ath_curve : Math.abs(e.ATHcurve - -1) > 0 || (e.ATHcurve = c.ath_curve), 0 != t ? e.athaa_sensitivity = c.ath_sensitivity : Math.abs(e.athaa_sensitivity - -1) > 0 || (e.athaa_sensitivity = c.ath_sensitivity), c.interch > 0 && (0 != t ? e.interChRatio = c.interch : Math.abs(e.interChRatio - -1) > 0 || (e.interChRatio = c.interch)), c.safejoint > 0 && (e.exp_nspsytune = e.exp_nspsytune | c.safejoint), c.sfb21mod > 0 && (e.exp_nspsytune = e.exp_nspsytune | c.sfb21mod << 20), 0 != t ? e.msfix = c.msfix : Math.abs(e.msfix - -1) > 0 || (e.msfix = c.msfix), 0 == t && (e.VBR_q = a, e.VBR_q_frac = _)
            }

            function s(e, a, t) {
                var s = a,
                    n = _.nearestBitrateFullIndex(a);
                if (e.VBR = r.vbr_abr, e.VBR_mean_bitrate_kbps = s, e.VBR_mean_bitrate_kbps = Math.min(e.VBR_mean_bitrate_kbps, 320), e.VBR_mean_bitrate_kbps = Math.max(e.VBR_mean_bitrate_kbps, 8), e.brate = e.VBR_mean_bitrate_kbps, e.VBR_mean_bitrate_kbps > 320 && (e.disable_reservoir = !0), l[n].safejoint > 0 && (e.exp_nspsytune = 2 | e.exp_nspsytune), l[n].sfscale > 0 && (e.internal_flags.noise_shaping = 2), Math.abs(l[n].nsbass) > 0) {
                    var i = int(4 * l[n].nsbass);
                    0 > i && (i += 64), e.exp_nspsytune = e.exp_nspsytune | i << 2
                }
                return 0 != t ? e.quant_comp = l[n].quant_comp : Math.abs(e.quant_comp - -1) > 0 || (e.quant_comp = l[n].quant_comp), 0 != t ? e.quant_comp_short = l[n].quant_comp_s : Math.abs(e.quant_comp_short - -1) > 0 || (e.quant_comp_short = l[n].quant_comp_s), 0 != t ? e.msfix = l[n].nsmsfix : Math.abs(e.msfix - -1) > 0 || (e.msfix = l[n].nsmsfix), 0 != t ? e.internal_flags.nsPsy.attackthre = l[n].st_lrm : Math.abs(e.internal_flags.nsPsy.attackthre - -1) > 0 || (e.internal_flags.nsPsy.attackthre = l[n].st_lrm), 0 != t ? e.internal_flags.nsPsy.attackthre_s = l[n].st_s : Math.abs(e.internal_flags.nsPsy.attackthre_s - -1) > 0 || (e.internal_flags.nsPsy.attackthre_s = l[n].st_s), 0 != t ? e.scale = l[n].scale : Math.abs(e.scale - -1) > 0 || (e.scale = l[n].scale), 0 != t ? e.maskingadjust = l[n].masking_adj : Math.abs(e.maskingadjust - 0) > 0 || (e.maskingadjust = l[n].masking_adj), l[n].masking_adj > 0 ? 0 != t ? e.maskingadjust_short = .9 * l[n].masking_adj : Math.abs(e.maskingadjust_short - 0) > 0 || (e.maskingadjust_short = .9 * l[n].masking_adj) : 0 != t ? e.maskingadjust_short = 1.1 * l[n].masking_adj : Math.abs(e.maskingadjust_short - 0) > 0 || (e.maskingadjust_short = 1.1 * l[n].masking_adj), 0 != t ? e.ATHlower = -l[n].ath_lower / 10 : Math.abs(10 * -e.ATHlower - 0) > 0 || (e.ATHlower = -l[n].ath_lower / 10), 0 != t ? e.ATHcurve = l[n].ath_curve : Math.abs(e.ATHcurve - -1) > 0 || (e.ATHcurve = l[n].ath_curve), 0 != t ? e.interChRatio = l[n].interch : Math.abs(e.interChRatio - -1) > 0 || (e.interChRatio = l[n].interch), a
            }

            function n(e, a) {
                var t = 0;
                return 0 > a && (t = -1, a = 0), a > 9 && (t = -1, a = 9), e.VBR_q = a, e.VBR_q_frac = 0, t
            }
            var _;
            this.setModules = function(e) {
                _ = e
            };
            var i = [new e(0, 9, 9, 0, 5.2, 125, -4.2, -6.3, 4.8, 1, 0, 0, 2, 21, .97), new e(1, 9, 9, 0, 5.3, 125, -3.6, -5.6, 4.5, 1.5, 0, 0, 2, 21, 1.35), new e(2, 9, 9, 0, 5.6, 125, -2.2, -3.5, 2.8, 2, 0, 0, 2, 21, 1.49), new e(3, 9, 9, 1, 5.8, 130, -1.8, -2.8, 2.6, 3, -4, 0, 2, 20, 1.64), new e(4, 9, 9, 1, 6, 135, -.7, -1.1, 1.1, 3.5, -8, 0, 2, 0, 1.79), new e(5, 9, 9, 1, 6.4, 140, .5, .4, -7.5, 4, -12, 2e-4, 0, 0, 1.95), new e(6, 9, 9, 1, 6.6, 145, .67, .65, -14.7, 6.5, -19, 4e-4, 0, 0, 2.3), new e(7, 9, 9, 1, 6.6, 145, .8, .75, -19.7, 8, -22, 6e-4, 0, 0, 2.7), new e(8, 9, 9, 1, 6.6, 145, 1.2, 1.15, -27.5, 10, -23, 7e-4, 0, 0, 0), new e(9, 9, 9, 1, 6.6, 145, 1.6, 1.6, -36, 11, -25, 8e-4, 0, 0, 0), new e(10, 9, 9, 1, 6.6, 145, 2, 2, -36, 12, -25, 8e-4, 0, 0, 0)],
                o = [new e(0, 9, 9, 0, 4.2, 25, -7, -4, 7.5, 1, 0, 0, 2, 26, .97), new e(1, 9, 9, 0, 4.2, 25, -5.6, -3.6, 4.5, 1.5, 0, 0, 2, 21, 1.35), new e(2, 9, 9, 0, 4.2, 25, -4.4, -1.8, 2, 2, 0, 0, 2, 18, 1.49), new e(3, 9, 9, 1, 4.2, 25, -3.4, -1.25, 1.1, 3, -4, 0, 2, 15, 1.64), new e(4, 9, 9, 1, 4.2, 25, -2.2, .1, 0, 3.5, -8, 0, 2, 0, 1.79), new e(5, 9, 9, 1, 4.2, 25, -1, 1.65, -7.7, 4, -12, 2e-4, 0, 0, 1.95), new e(6, 9, 9, 1, 4.2, 25, -0, 2.47, -7.7, 6.5, -19, 4e-4, 0, 0, 2), new e(7, 9, 9, 1, 4.2, 25, .5, 2, -14.5, 8, -22, 6e-4, 0, 0, 2), new e(8, 9, 9, 1, 4.2, 25, 1, 2.4, -22, 10, -23, 7e-4, 0, 0, 2), new e(9, 9, 9, 1, 4.2, 25, 1.5, 2.95, -30, 11, -25, 8e-4, 0, 0, 2), new e(10, 9, 9, 1, 4.2, 25, 2, 2.95, -36, 12, -30, 8e-4, 0, 0, 2)],
                l = [new a(8, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -30, 11, .0012, 1), new a(16, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -25, 11, .001, 1), new a(24, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -20, 11, .001, 1), new a(32, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -15, 11, .001, 1), new a(40, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -10, 11, 9e-4, 1), new a(48, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -10, 11, 9e-4, 1), new a(56, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -6, 11, 8e-4, 1), new a(64, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -2, 11, 8e-4, 1), new a(80, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, 0, 8, 7e-4, 1), new a(96, 9, 9, 0, 2.5, 6.6, 145, 0, .95, 0, 1, 5.5, 6e-4, 1), new a(112, 9, 9, 0, 2.25, 6.6, 145, 0, .95, 0, 2, 4.5, 5e-4, 1), new a(128, 9, 9, 0, 1.95, 6.4, 140, 0, .95, 0, 3, 4, 2e-4, 1), new a(160, 9, 9, 1, 1.79, 6, 135, 0, .95, -2, 5, 3.5, 0, 1), new a(192, 9, 9, 1, 1.49, 5.6, 125, 0, .97, -4, 7, 3, 0, 0), new a(224, 9, 9, 1, 1.25, 5.2, 125, 0, .98, -6, 9, 2, 0, 0), new a(256, 9, 9, 1, .97, 5.2, 125, 0, 1, -8, 10, 1, 0, 0), new a(320, 9, 9, 1, .9, 5.2, 125, 0, 1, -10, 12, 0, 0, 0)];
            this.apply_preset = function(e, a, n) {
                switch (a) {
                    case Lame.R3MIX:
                        a = Lame.V3, e.VBR = r.vbr_mtrh;
                        break;
                    case Lame.MEDIUM:
                        a = Lame.V4, e.VBR = r.vbr_rh;
                        break;
                    case Lame.MEDIUM_FAST:
                        a = Lame.V4, e.VBR = r.vbr_mtrh;
                        break;
                    case Lame.STANDARD:
                        a = Lame.V2, e.VBR = r.vbr_rh;
                        break;
                    case Lame.STANDARD_FAST:
                        a = Lame.V2, e.VBR = r.vbr_mtrh;
                        break;
                    case Lame.EXTREME:
                        a = Lame.V0, e.VBR = r.vbr_rh;
                        break;
                    case Lame.EXTREME_FAST:
                        a = Lame.V0, e.VBR = r.vbr_mtrh;
                        break;
                    case Lame.INSANE:
                        return a = 320, e.preset = a, s(e, a, n), e.VBR = r.vbr_off, a
                }
                switch (e.preset = a, a) {
                    case Lame.V9:
                        return t(e, 9, n), a;
                    case Lame.V8:
                        return t(e, 8, n), a;
                    case Lame.V7:
                        return t(e, 7, n), a;
                    case Lame.V6:
                        return t(e, 6, n), a;
                    case Lame.V5:
                        return t(e, 5, n), a;
                    case Lame.V4:
                        return t(e, 4, n), a;
                    case Lame.V3:
                        return t(e, 3, n), a;
                    case Lame.V2:
                        return t(e, 2, n), a;
                    case Lame.V1:
                        return t(e, 1, n), a;
                    case Lame.V0:
                        return t(e, 0, n), a
                }
                return a >= 8 && 320 >= a ? s(e, a, n) : (e.preset = 0, a)
            }
        }
        var n = t(498),
            r = (n.System, n.VbrMode);
        n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float, n.new_float_n, n.new_int, n.new_int_n, n.assert;
        e.exports = s
    },
    541: function(e, a, t) {
        function s() {
            function e() {
                this.mask_adjust = 0, this.mask_adjust_short = 0, this.bo_l_weight = o(S.SBMAX_l), this.bo_s_weight = o(S.SBMAX_s)
            }

            function a() {
                this.lowerlimit = 0
            }

            function t(e, a) {
                this.lowpass = a
            }

            function n(e) {
                var a;
                return e.class_id = $, a = e.internal_flags = new b, e.mode = MPEGMode.NOT_SET, e.original = 1, e.in_samplerate = 44100, e.num_channels = 2, e.num_samples = -1, e.bWriteVbrTag = !0, e.quality = -1, e.short_blocks = null, a.subblock_gain = -1, e.lowpassfreq = 0, e.highpassfreq = 0, e.lowpasswidth = -1, e.highpasswidth = -1, e.VBR = _.vbr_off, e.VBR_q = 4, e.ATHcurve = -1, e.VBR_mean_bitrate_kbps = 128, e.VBR_min_bitrate_kbps = 0, e.VBR_max_bitrate_kbps = 0, e.VBR_hard_min = 0, a.VBR_min_bitrate = 1, a.VBR_max_bitrate = 13, e.quant_comp = -1, e.quant_comp_short = -1, e.msfix = -1, a.resample_ratio = 1, a.OldValue[0] = 180, a.OldValue[1] = 180, a.CurrentStep[0] = 4, a.CurrentStep[1] = 4, a.masking_lower = 1, a.nsPsy.attackthre = -1, a.nsPsy.attackthre_s = -1, e.scale = -1, e.athaa_type = -1, e.ATHtype = -1, e.athaa_loudapprox = -1, e.athaa_sensitivity = 0, e.useTemporal = null, e.interChRatio = -1, a.mf_samples_to_encode = S.ENCDELAY + S.POSTDELAY, e.encoder_padding = 0, a.mf_size = S.ENCDELAY - S.MDCTDELAY, e.findReplayGain = !1, e.decode_on_the_fly = !1, a.decode_on_the_fly = !1, a.findReplayGain = !1, a.findPeakSample = !1, a.RadioGain = 0, a.AudiophileGain = 0, a.noclipGainChange = 0, a.noclipScale = -1, e.preset = 0, e.write_id3tag_automatic = !0, 0
            }

            function M(e) {
                return e > 1 ? 0 : 0 >= e ? 1 : Math.cos(Math.PI / 2 * e)
            }

            function w(e, a) {
                var t = 44100;
                return a >= 48e3 ? t = 48e3 : a >= 44100 ? t = 44100 : a >= 32e3 ? t = 32e3 : a >= 24e3 ? t = 24e3 : a >= 22050 ? t = 22050 : a >= 16e3 ? t = 16e3 : a >= 12e3 ? t = 12e3 : a >= 11025 ? t = 11025 : a >= 8e3 && (t = 8e3), -1 == e ? t : (15960 >= e && (t = 44100), 15250 >= e && (t = 32e3), 11220 >= e && (t = 24e3), 9970 >= e && (t = 22050), 7230 >= e && (t = 16e3), 5420 >= e && (t = 12e3), 4510 >= e && (t = 11025), 3970 >= e && (t = 8e3), t > a ? a > 44100 ? 48e3 : a > 32e3 ? 44100 : a > 24e3 ? 32e3 : a > 22050 ? 24e3 : a > 16e3 ? 22050 : a > 12e3 ? 16e3 : a > 11025 ? 12e3 : a > 8e3 ? 11025 : 8e3 : t)
            }

            function A(e, a) {
                switch (e) {
                    case 44100:
                        return a.version = 1, 0;
                    case 48e3:
                        return a.version = 1, 1;
                    case 32e3:
                        return a.version = 1, 2;
                    case 22050:
                        return a.version = 0, 0;
                    case 24e3:
                        return a.version = 0, 1;
                    case 16e3:
                        return a.version = 0, 2;
                    case 11025:
                        return a.version = 0, 0;
                    case 12e3:
                        return a.version = 0, 1;
                    case 8e3:
                        return a.version = 0, 2;
                    default:
                        return a.version = 0, -1
                }
            }

            function R(e, a, t) {
                16e3 > t && (a = 2);
                for (var s = g.bitrate_table[a][1], n = 2; 14 >= n; n++) g.bitrate_table[a][n] > 0 && Math.abs(g.bitrate_table[a][n] - e) < Math.abs(s - e) && (s = g.bitrate_table[a][n]);
                return s
            }

            function B(e, a, t) {
                16e3 > t && (a = 2);
                for (var s = 0; 14 >= s; s++)
                    if (g.bitrate_table[a][s] > 0 && g.bitrate_table[a][s] == e) return s;
                return -1
            }

            function y(e, a) {
                var s = [new t(8, 2e3), new t(16, 3700), new t(24, 3900), new t(32, 5500), new t(40, 7e3), new t(48, 7500), new t(56, 1e4), new t(64, 11e3), new t(80, 13500), new t(96, 15100), new t(112, 15600), new t(128, 17e3), new t(160, 17500), new t(192, 18600), new t(224, 19400), new t(256, 19700), new t(320, 20500)],
                    n = F.nearestBitrateFullIndex(a);
                e.lowerlimit = s[n].lowpass
            }

            function E(e) {
                var a = e.internal_flags,
                    t = 32,
                    s = -1;
                if (a.lowpass1 > 0) {
                    for (var n = 999, _ = 0; 31 >= _; _++) {
                        var i = _ / 31;
                        i >= a.lowpass2 && (t = Math.min(t, _)), a.lowpass1 < i && i < a.lowpass2 && (n = Math.min(n, _))
                    }
                    999 == n ? a.lowpass1 = (t - .75) / 31 : a.lowpass1 = (n - .75) / 31, a.lowpass2 = t / 31
                }
                if (a.highpass2 > 0 && a.highpass2 < .9 * (.75 / 31) && (a.highpass1 = 0, a.highpass2 = 0, r.err.println("Warning: highpass filter disabled.  highpass frequency too small\n")), a.highpass2 > 0) {
                    for (var o = -1, _ = 0; 31 >= _; _++) {
                        var i = _ / 31;
                        i <= a.highpass1 && (s = Math.max(s, _)), a.highpass1 < i && i < a.highpass2 && (o = Math.max(o, _))
                    }
                    a.highpass1 = s / 31, -1 == o ? a.highpass2 = (s + .75) / 31 : a.highpass2 = (o + .75) / 31
                }
                for (var _ = 0; 32 > _; _++) {
                    var l, f, i = _ / 31;
                    l = a.highpass2 > a.highpass1 ? M((a.highpass2 - i) / (a.highpass2 - a.highpass1 + 1e-20)) : 1, f = a.lowpass2 > a.lowpass1 ? M((i - a.lowpass1) / (a.lowpass2 - a.lowpass1 + 1e-20)) : 1, a.amp_filter[_] = l * f
                }
            }

            function T(e) {
                var a = e.internal_flags;
                switch (e.quality) {
                    default:
                        case 9:
                        a.psymodel = 0,
                    a.noise_shaping = 0,
                    a.noise_shaping_amp = 0,
                    a.noise_shaping_stop = 0,
                    a.use_best_huffman = 0,
                    a.full_outer_loop = 0;
                    break;
                    case 8:
                            e.quality = 7;
                    case 7:
                            a.psymodel = 1,
                        a.noise_shaping = 0,
                        a.noise_shaping_amp = 0,
                        a.noise_shaping_stop = 0,
                        a.use_best_huffman = 0,
                        a.full_outer_loop = 0;
                        break;
                    case 6:
                            a.psymodel = 1,
                        0 == a.noise_shaping && (a.noise_shaping = 1),
                        a.noise_shaping_amp = 0,
                        a.noise_shaping_stop = 0,
                        -1 == a.subblock_gain && (a.subblock_gain = 1),
                        a.use_best_huffman = 0,
                        a.full_outer_loop = 0;
                        break;
                    case 5:
                            a.psymodel = 1,
                        0 == a.noise_shaping && (a.noise_shaping = 1),
                        a.noise_shaping_amp = 0,
                        a.noise_shaping_stop = 0,
                        -1 == a.subblock_gain && (a.subblock_gain = 1),
                        a.use_best_huffman = 0,
                        a.full_outer_loop = 0;
                        break;
                    case 4:
                            a.psymodel = 1,
                        0 == a.noise_shaping && (a.noise_shaping = 1),
                        a.noise_shaping_amp = 0,
                        a.noise_shaping_stop = 0,
                        -1 == a.subblock_gain && (a.subblock_gain = 1),
                        a.use_best_huffman = 1,
                        a.full_outer_loop = 0;
                        break;
                    case 3:
                            a.psymodel = 1,
                        0 == a.noise_shaping && (a.noise_shaping = 1),
                        a.noise_shaping_amp = 1,
                        a.noise_shaping_stop = 1,
                        -1 == a.subblock_gain && (a.subblock_gain = 1),
                        a.use_best_huffman = 1,
                        a.full_outer_loop = 0;
                        break;
                    case 2:
                            a.psymodel = 1,
                        0 == a.noise_shaping && (a.noise_shaping = 1),
                        0 == a.substep_shaping && (a.substep_shaping = 2),
                        a.noise_shaping_amp = 1,
                        a.noise_shaping_stop = 1,
                        -1 == a.subblock_gain && (a.subblock_gain = 1),
                        a.use_best_huffman = 1,
                        a.full_outer_loop = 0;
                        break;
                    case 1:
                            a.psymodel = 1,
                        0 == a.noise_shaping && (a.noise_shaping = 1),
                        0 == a.substep_shaping && (a.substep_shaping = 2),
                        a.noise_shaping_amp = 2,
                        a.noise_shaping_stop = 1,
                        -1 == a.subblock_gain && (a.subblock_gain = 1),
                        a.use_best_huffman = 1,
                        a.full_outer_loop = 0;
                        break;
                    case 0:
                            a.psymodel = 1,
                        0 == a.noise_shaping && (a.noise_shaping = 1),
                        0 == a.substep_shaping && (a.substep_shaping = 2),
                        a.noise_shaping_amp = 2,
                        a.noise_shaping_stop = 1,
                        -1 == a.subblock_gain && (a.subblock_gain = 1),
                        a.use_best_huffman = 1,
                        a.full_outer_loop = 0
                }
            }

            function k(e) {
                var a = e.internal_flags;
                e.frameNum = 0, e.write_id3tag_automatic && Q.id3tag_write_v2(e), a.bitrate_stereoMode_Hist = l([16, 5]), a.bitrate_blockType_Hist = l([16, 6]), a.PeakSample = 0, e.bWriteVbrTag && K.InitVbrTag(e)
            }

            function x(e, a) {
                (null == e.in_buffer_0 || e.in_buffer_nsamples < a) && (e.in_buffer_0 = o(a), e.in_buffer_1 = o(a), e.in_buffer_nsamples = a)
            }

            function P(e) {
                var a = S.BLKSIZE + e.framesize - S.FFTOFFSET;
                return a = Math.max(a, 512 + e.framesize - 32), c(b.MFSIZE >= a), a
            }

            function I(e, a, t, s, n, r, _) {
                var i, o, l, f, u, h = e.internal_flags,
                    m = 0,
                    p = [null, null],
                    v = [null, null];
                if (h.Class_ID != $) return -3;
                if (0 == s) return 0;
                if (u = G.copy_buffer(h, n, r, _, 0), 0 > u) return u;
                if (r += u, m += u, v[0] = a, v[1] = t, d.NEQ(e.scale, 0) && d.NEQ(e.scale, 1))
                    for (o = 0; s > o; ++o) v[0][o] *= e.scale, 2 == h.channels_out && (v[1][o] *= e.scale);
                if (d.NEQ(e.scale_left, 0) && d.NEQ(e.scale_left, 1))
                    for (o = 0; s > o; ++o) v[0][o] *= e.scale_left;
                if (d.NEQ(e.scale_right, 0) && d.NEQ(e.scale_right, 1))
                    for (o = 0; s > o; ++o) v[1][o] *= e.scale_right;
                if (2 == e.num_channels && 1 == h.channels_out)
                    for (o = 0; s > o; ++o) v[0][o] = .5 * (v[0][o] + v[1][o]), v[1][o] = 0;
                f = P(e), p[0] = h.mfbuf[0], p[1] = h.mfbuf[1];
                for (var g = 0; s > 0;) {
                    var M = [null, null],
                        w = 0,
                        A = 0;
                    M[0] = v[0], M[1] = v[1];
                    var R = new V;
                    if (D(e, p, M, g, s, R), w = R.n_in, A = R.n_out, h.findReplayGain && !h.decode_on_the_fly && C.AnalyzeSamples(h.rgdata, p[0], h.mf_size, p[1], h.mf_size, A, h.channels_out) == GainAnalysis.GAIN_ANALYSIS_ERROR) return -6;
                    if (s -= w, g += w, 2 == h.channels_out, h.mf_size += A, c(h.mf_size <= b.MFSIZE), h.mf_samples_to_encode < 1 && (h.mf_samples_to_encode = S.ENCDELAY + S.POSTDELAY), h.mf_samples_to_encode += A, h.mf_size >= f) {
                        var B = _ - m;
                        if (0 == _ && (B = 0), i = L(e, p[0], p[1], n, r, B), 0 > i) return i;
                        for (r += i, m += i, h.mf_size -= e.framesize, h.mf_samples_to_encode -= e.framesize, l = 0; l < h.channels_out; l++)
                            for (o = 0; o < h.mf_size; o++) p[l][o] = p[l][o + e.framesize]
                    }
                }
                return c(0 == s), m
            }

            function L(e, a, t, s, n, r) {
                var _ = F.enc.lame_encode_mp3_frame(e, a, t, s, n, r);
                return e.frameNum++, _
            }

            function V() {
                this.n_in = 0, this.n_out = 0
            }

            function H() {
                this.num_used = 0
            }

            function O(e, a) {
                return 0 != a ? O(a, e % a) : e
            }

            function N(e, a, t) {
                var s = Math.PI * a;
                e /= t, 0 > e && (e = 0), e > 1 && (e = 1);
                var n = e - .5,
                    r = .42 - .5 * Math.cos(2 * e * Math.PI) + .08 * Math.cos(4 * e * Math.PI);
                return Math.abs(n) < 1e-9 ? s / Math.PI : r * Math.sin(t * s * n) / (Math.PI * t * n)
            }

            function X(e, a, t, s, n, r, _, i, l) {
                var f, u, h = e.internal_flags,
                    m = 0,
                    p = e.out_samplerate / O(e.out_samplerate, e.in_samplerate);
                p > b.BPC && (p = b.BPC);
                var v = Math.abs(h.resample_ratio - Math.floor(.5 + h.resample_ratio)) < 1e-4 ? 1 : 0,
                    d = 1 / h.resample_ratio;
                d > 1 && (d = 1);
                var g = 31;
                0 == g % 2 && --g, g += v;
                var S = g + 1;
                if (0 == h.fill_buffer_resample_init) {
                    for (h.inbuf_old[0] = o(S), h.inbuf_old[1] = o(S), f = 0; 2 * p >= f; ++f) h.blackfilt[f] = o(S);
                    for (h.itime[0] = 0, h.itime[1] = 0, m = 0; 2 * p >= m; m++) {
                        var M = 0,
                            w = (m - p) / (2 * p);
                        for (f = 0; g >= f; f++) M += h.blackfilt[m][f] = N(f - w, d, g);
                        for (f = 0; g >= f; f++) h.blackfilt[m][f] /= M
                    }
                    h.fill_buffer_resample_init = 1
                }
                var A = h.inbuf_old[l];
                for (u = 0; s > u; u++) {
                    var R, B;
                    if (R = u * h.resample_ratio, m = 0 | Math.floor(R - h.itime[l]), g + m - g / 2 >= _) break;
                    var w = R - h.itime[l] - (m + .5 * (g % 2));
                    c(Math.abs(w) <= .501), B = 0 | Math.floor(2 * w * p + p + .5);
                    var y = 0;
                    for (f = 0; g >= f; ++f) {
                        var E, T = f + m - g / 2;
                        c(_ > T), c(T + S >= 0), E = 0 > T ? A[S + T] : n[r + T], y += E * h.blackfilt[B][f]
                    }
                    a[t + u] = y
                }
                if (i.num_used = Math.min(_, g + m - g / 2), h.itime[l] += i.num_used - u * h.resample_ratio, i.num_used >= S)
                    for (f = 0; S > f; f++) A[f] = n[r + i.num_used + f - S];
                else {
                    var k = S - i.num_used;
                    for (f = 0; k > f; ++f) A[f] = A[f + i.num_used];
                    for (m = 0; S > f; ++f, ++m) A[f] = n[r + m];
                    c(m == i.num_used)
                }
                return u
            }

            function D(e, a, t, s, n, r) {
                var _ = e.internal_flags;
                if (_.resample_ratio < .9999 || _.resample_ratio > 1.0001)
                    for (var i = 0; i < _.channels_out; i++) {
                        var o = new H;
                        r.n_out = X(e, a[i], _.mf_size, e.framesize, t[i], s, n, o, i), r.n_in = o.num_used
                    } else {
                        r.n_out = Math.min(e.framesize, n), r.n_in = r.n_out;
                        for (var l = 0; l < r.n_out; ++l) a[0][_.mf_size + l] = t[0][s + l], 2 == _.channels_out && (a[1][_.mf_size + l] = t[1][s + l])
                    }
            }
            var F = this,
                Y = 131072;
            s.V9 = 410, s.V8 = 420, s.V7 = 430, s.V6 = 440, s.V5 = 450, s.V4 = 460, s.V3 = 470, s.V2 = 480, s.V1 = 490, s.V0 = 500, s.R3MIX = 1e3, s.STANDARD = 1001, s.EXTREME = 1002, s.INSANE = 1003, s.STANDARD_FAST = 1004, s.EXTREME_FAST = 1005, s.MEDIUM = 1006, s.MEDIUM_FAST = 1007;
            var q = 16384 + Y;
            s.LAME_MAXMP3BUFFER = q;
            var C, G, j, z, U, K, Z, Q, W, J = new u;
            this.enc = new S, this.setModules = function(e, a, t, s, n, r, _, i, o) {
                C = e, G = a, j = t, z = s, U = n, K = r, Z = _, Q = i, W = o, this.enc.setModules(G, J, z, K)
            };
            var $ = 4294479419;
            this.lame_init = function() {
                var e = new h,
                    a = n(e);
                return 0 != a ? null : (e.lame_allocated_gfp = 1, e)
            }, this.nearestBitrateFullIndex = function(e) {
                var a = [8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320],
                    t = 0,
                    s = 0,
                    n = 0,
                    r = 0;
                r = a[16], n = 16, s = a[16], t = 16;
                for (var _ = 0; 16 > _; _++)
                    if (Math.max(e, a[_ + 1]) != e) {
                        r = a[_ + 1], n = _ + 1, s = a[_], t = _;
                        break
                    }
                return r - e > e - s ? t : n
            }, this.lame_init_params = function(t) {
                var s = t.internal_flags;
                if (s.Class_ID = 0, null == s.ATH && (s.ATH = new m), null == s.PSY && (s.PSY = new e), null == s.rgdata && (s.rgdata = new p), s.channels_in = t.num_channels, 1 == s.channels_in && (t.mode = MPEGMode.MONO), s.channels_out = t.mode == MPEGMode.MONO ? 1 : 2, s.mode_ext = S.MPG_MD_MS_LR, t.mode == MPEGMode.MONO && (t.force_ms = !1), t.VBR == _.vbr_off && 128 != t.VBR_mean_bitrate_kbps && 0 == t.brate && (t.brate = t.VBR_mean_bitrate_kbps), t.VBR == _.vbr_off || t.VBR == _.vbr_mtrh || t.VBR == _.vbr_mt || (t.free_format = !1), t.VBR == _.vbr_off && 0 == t.brate && d.EQ(t.compression_ratio, 0) && (t.compression_ratio = 11.025), t.VBR == _.vbr_off && t.compression_ratio > 0 && (0 == t.out_samplerate && (t.out_samplerate = map2MP3Frequency(int(.97 * t.in_samplerate))), t.brate = 0 | 16 * t.out_samplerate * s.channels_out / (1e3 * t.compression_ratio), s.samplerate_index = A(t.out_samplerate, t), t.free_format || (t.brate = R(t.brate, t.version, t.out_samplerate))), 0 != t.out_samplerate && (t.out_samplerate < 16e3 ? (t.VBR_mean_bitrate_kbps = Math.max(t.VBR_mean_bitrate_kbps, 8), t.VBR_mean_bitrate_kbps = Math.min(t.VBR_mean_bitrate_kbps, 64)) : t.out_samplerate < 32e3 ? (t.VBR_mean_bitrate_kbps = Math.max(t.VBR_mean_bitrate_kbps, 8), t.VBR_mean_bitrate_kbps = Math.min(t.VBR_mean_bitrate_kbps, 160)) : (t.VBR_mean_bitrate_kbps = Math.max(t.VBR_mean_bitrate_kbps, 32), t.VBR_mean_bitrate_kbps = Math.min(t.VBR_mean_bitrate_kbps, 320))), 0 == t.lowpassfreq) {
                    var n = 16e3;
                    switch (t.VBR) {
                        case _.vbr_off:
                            var r = new a;
                            y(r, t.brate), n = r.lowerlimit;
                            break;
                        case _.vbr_abr:
                            var r = new a;
                            y(r, t.VBR_mean_bitrate_kbps), n = r.lowerlimit;
                            break;
                        case _.vbr_rh:
                            var o = [19500, 19e3, 18600, 18e3, 17500, 16e3, 15600, 14900, 12500, 1e4, 3950];
                            if (0 <= t.VBR_q && t.VBR_q <= 9) {
                                var l = o[t.VBR_q],
                                    f = o[t.VBR_q + 1],
                                    h = t.VBR_q_frac;
                                n = linear_int(l, f, h)
                            } else n = 19500;
                            break;
                        default:
                            var o = [19500, 19e3, 18500, 18e3, 17500, 16500, 15500, 14500, 12500, 9500, 3950];
                            if (0 <= t.VBR_q && t.VBR_q <= 9) {
                                var l = o[t.VBR_q],
                                    f = o[t.VBR_q + 1],
                                    h = t.VBR_q_frac;
                                n = linear_int(l, f, h)
                            } else n = 19500
                    }
                    t.mode != MPEGMode.MONO || t.VBR != _.vbr_off && t.VBR != _.vbr_abr || (n *= 1.5), t.lowpassfreq = 0 | n
                }
                if (0 == t.out_samplerate && (2 * t.lowpassfreq > t.in_samplerate && (t.lowpassfreq = t.in_samplerate / 2), t.out_samplerate = w(0 | t.lowpassfreq, t.in_samplerate)), t.lowpassfreq = Math.min(20500, t.lowpassfreq), t.lowpassfreq = Math.min(t.out_samplerate / 2, t.lowpassfreq), t.VBR == _.vbr_off && (t.compression_ratio = 16 * t.out_samplerate * s.channels_out / (1e3 * t.brate)), t.VBR == _.vbr_abr && (t.compression_ratio = 16 * t.out_samplerate * s.channels_out / (1e3 * t.VBR_mean_bitrate_kbps)), t.bWriteVbrTag || (t.findReplayGain = !1, t.decode_on_the_fly = !1, s.findPeakSample = !1), s.findReplayGain = t.findReplayGain, s.decode_on_the_fly = t.decode_on_the_fly, s.decode_on_the_fly && (s.findPeakSample = !0), s.findReplayGain && C.InitGainAnalysis(s.rgdata, t.out_samplerate) == GainAnalysis.INIT_GAIN_ANALYSIS_ERROR) return t.internal_flags = null, -6;
                switch (s.decode_on_the_fly && !t.decode_only && (null != s.hip && W.hip_decode_exit(s.hip), s.hip = W.hip_decode_init()), s.mode_gr = t.out_samplerate <= 24e3 ? 1 : 2, t.framesize = 576 * s.mode_gr, t.encoder_delay = S.ENCDELAY, s.resample_ratio = t.in_samplerate / t.out_samplerate, t.VBR) {
                    case _.vbr_mt:
                    case _.vbr_rh:
                    case _.vbr_mtrh:
                        var b = [5.7, 6.5, 7.3, 8.2, 10, 11.9, 13, 14, 15, 16.5];
                        t.compression_ratio = b[t.VBR_q];
                        break;
                    case _.vbr_abr:
                        t.compression_ratio = 16 * t.out_samplerate * s.channels_out / (1e3 * t.VBR_mean_bitrate_kbps);
                        break;
                    default:
                        t.compression_ratio = 16 * t.out_samplerate * s.channels_out / (1e3 * t.brate)
                }
                if (t.mode == MPEGMode.NOT_SET && (t.mode = MPEGMode.JOINT_STEREO), t.highpassfreq > 0 ? (s.highpass1 = 2 * t.highpassfreq, t.highpasswidth >= 0 ? s.highpass2 = 2 * (t.highpassfreq + t.highpasswidth) : s.highpass2 = 2 * t.highpassfreq, s.highpass1 /= t.out_samplerate, s.highpass2 /= t.out_samplerate) : (s.highpass1 = 0, s.highpass2 = 0), t.lowpassfreq > 0 ? (s.lowpass2 = 2 * t.lowpassfreq, t.lowpasswidth >= 0 ? (s.lowpass1 = 2 * (t.lowpassfreq - t.lowpasswidth), s.lowpass1 < 0 && (s.lowpass1 = 0)) : s.lowpass1 = 2 * t.lowpassfreq, s.lowpass1 /= t.out_samplerate, s.lowpass2 /= t.out_samplerate) : (s.lowpass1 = 0, s.lowpass2 = 0), E(t), s.samplerate_index = A(t.out_samplerate, t), s.samplerate_index < 0) return t.internal_flags = null, -1;
                if (t.VBR == _.vbr_off) {
                    if (t.free_format) s.bitrate_index = 0;
                    else if (t.brate = R(t.brate, t.version, t.out_samplerate), s.bitrate_index = B(t.brate, t.version, t.out_samplerate), s.bitrate_index <= 0) return t.internal_flags = null, -1
                } else s.bitrate_index = 1;
                t.analysis && (t.bWriteVbrTag = !1), null != s.pinfo && (t.bWriteVbrTag = !1), G.init_bit_stream_w(s);
                for (var M = s.samplerate_index + 3 * t.version + 6 * (t.out_samplerate < 16e3 ? 1 : 0), x = 0; x < S.SBMAX_l + 1; x++) s.scalefac_band.l[x] = z.sfBandIndex[M].l[x];
                for (var x = 0; x < S.PSFB21 + 1; x++) {
                    var P = (s.scalefac_band.l[22] - s.scalefac_band.l[21]) / S.PSFB21,
                        I = s.scalefac_band.l[21] + x * P;
                    s.scalefac_band.psfb21[x] = I
                }
                s.scalefac_band.psfb21[S.PSFB21] = 576;
                for (var x = 0; x < S.SBMAX_s + 1; x++) s.scalefac_band.s[x] = z.sfBandIndex[M].s[x];
                for (var x = 0; x < S.PSFB12 + 1; x++) {
                    var P = (s.scalefac_band.s[13] - s.scalefac_band.s[12]) / S.PSFB12,
                        I = s.scalefac_band.s[12] + x * P;
                    s.scalefac_band.psfb12[x] = I
                }
                s.scalefac_band.psfb12[S.PSFB12] = 192, 1 == t.version ? s.sideinfo_len = 1 == s.channels_out ? 21 : 36 : s.sideinfo_len = 1 == s.channels_out ? 13 : 21, t.error_protection && (s.sideinfo_len += 2), k(t), s.Class_ID = $;
                var L;
                for (L = 0; 19 > L; L++) s.nsPsy.pefirbuf[L] = 700 * s.mode_gr * s.channels_out;
                switch (-1 == t.ATHtype && (t.ATHtype = 4), c(t.VBR_q <= 9), c(t.VBR_q >= 0), t.VBR) {
                    case _.vbr_mt:
                        t.VBR = _.vbr_mtrh;
                    case _.vbr_mtrh:
                        null == t.useTemporal && (t.useTemporal = !1), j.apply_preset(t, 500 - 10 * t.VBR_q, 0), t.quality < 0 && (t.quality = LAME_DEFAULT_QUALITY), t.quality < 5 && (t.quality = 0), t.quality > 5 && (t.quality = 5), s.PSY.mask_adjust = t.maskingadjust, s.PSY.mask_adjust_short = t.maskingadjust_short, t.experimentalY ? s.sfb21_extra = !1 : s.sfb21_extra = t.out_samplerate > 44e3, s.iteration_loop = new VBRNewIterationLoop(U);
                        break;
                    case _.vbr_rh:
                        j.apply_preset(t, 500 - 10 * t.VBR_q, 0), s.PSY.mask_adjust = t.maskingadjust, s.PSY.mask_adjust_short = t.maskingadjust_short, t.experimentalY ? s.sfb21_extra = !1 : s.sfb21_extra = t.out_samplerate > 44e3, t.quality > 6 && (t.quality = 6), t.quality < 0 && (t.quality = LAME_DEFAULT_QUALITY), s.iteration_loop = new VBROldIterationLoop(U);
                        break;
                    default:
                        var V;
                        s.sfb21_extra = !1, t.quality < 0 && (t.quality = LAME_DEFAULT_QUALITY), V = t.VBR, V == _.vbr_off && (t.VBR_mean_bitrate_kbps = t.brate), j.apply_preset(t, t.VBR_mean_bitrate_kbps, 0), t.VBR = V, s.PSY.mask_adjust = t.maskingadjust, s.PSY.mask_adjust_short = t.maskingadjust_short, V == _.vbr_off ? s.iteration_loop = new v(U) : s.iteration_loop = new ABRIterationLoop(U)
                }
                if (c(t.scale >= 0), t.VBR != _.vbr_off) {
                    if (s.VBR_min_bitrate = 1, s.VBR_max_bitrate = 14, t.out_samplerate < 16e3 && (s.VBR_max_bitrate = 8), 0 != t.VBR_min_bitrate_kbps && (t.VBR_min_bitrate_kbps = R(t.VBR_min_bitrate_kbps, t.version, t.out_samplerate), s.VBR_min_bitrate = B(t.VBR_min_bitrate_kbps, t.version, t.out_samplerate), s.VBR_min_bitrate < 0)) return -1;
                    if (0 != t.VBR_max_bitrate_kbps && (t.VBR_max_bitrate_kbps = R(t.VBR_max_bitrate_kbps, t.version, t.out_samplerate), s.VBR_max_bitrate = B(t.VBR_max_bitrate_kbps, t.version, t.out_samplerate), s.VBR_max_bitrate < 0)) return -1;
                    t.VBR_min_bitrate_kbps = g.bitrate_table[t.version][s.VBR_min_bitrate], t.VBR_max_bitrate_kbps = g.bitrate_table[t.version][s.VBR_max_bitrate], t.VBR_mean_bitrate_kbps = Math.min(g.bitrate_table[t.version][s.VBR_max_bitrate], t.VBR_mean_bitrate_kbps), t.VBR_mean_bitrate_kbps = Math.max(g.bitrate_table[t.version][s.VBR_min_bitrate], t.VBR_mean_bitrate_kbps)
                }
                return t.tune && (s.PSY.mask_adjust += t.tune_value_a, s.PSY.mask_adjust_short += t.tune_value_a), T(t), c(t.scale >= 0), t.athaa_type < 0 ? s.ATH.useAdjust = 3 : s.ATH.useAdjust = t.athaa_type, s.ATH.aaSensitivityP = Math.pow(10, t.athaa_sensitivity / -10), null == t.short_blocks && (t.short_blocks = i.short_block_allowed), t.short_blocks != i.short_block_allowed || t.mode != MPEGMode.JOINT_STEREO && t.mode != MPEGMode.STEREO || (t.short_blocks = i.short_block_coupled), t.quant_comp < 0 && (t.quant_comp = 1), t.quant_comp_short < 0 && (t.quant_comp_short = 0), t.msfix < 0 && (t.msfix = 0), t.exp_nspsytune = 1 | t.exp_nspsytune, t.internal_flags.nsPsy.attackthre < 0 && (t.internal_flags.nsPsy.attackthre = u.NSATTACKTHRE), t.internal_flags.nsPsy.attackthre_s < 0 && (t.internal_flags.nsPsy.attackthre_s = u.NSATTACKTHRE_S), c(t.scale >= 0), t.scale < 0 && (t.scale = 1), t.ATHtype < 0 && (t.ATHtype = 4), t.ATHcurve < 0 && (t.ATHcurve = 4), t.athaa_loudapprox < 0 && (t.athaa_loudapprox = 2), t.interChRatio < 0 && (t.interChRatio = 0), null == t.useTemporal && (t.useTemporal = !0), s.slot_lag = s.frac_SpF = 0, t.VBR == _.vbr_off && (s.slot_lag = s.frac_SpF = 72e3 * (t.version + 1) * t.brate % t.out_samplerate | 0), z.iteration_init(t), J.psymodel_init(t), c(t.scale >= 0), 0
            }, this.lame_encode_flush = function(e, a, t, s) {
                var n, r, _, i, o = e.internal_flags,
                    l = f([2, 1152]),
                    c = 0,
                    u = o.mf_samples_to_encode - S.POSTDELAY,
                    h = P(e);
                if (o.mf_samples_to_encode < 1) return 0;
                for (n = 0, e.in_samplerate != e.out_samplerate && (u += 16 * e.out_samplerate / e.in_samplerate), _ = e.framesize - u % e.framesize, 576 > _ && (_ += e.framesize), e.encoder_padding = _, i = (u + _) / e.framesize; i > 0 && c >= 0;) {
                    var b = h - o.mf_size,
                        m = e.frameNum;
                    b *= e.in_samplerate, b /= e.out_samplerate, b > 1152 && (b = 1152), 1 > b && (b = 1), r = s - n, 0 == s && (r = 0), c = this.lame_encode_buffer(e, l[0], l[1], b, a, t, r), t += c, n += c, i -= m != e.frameNum ? 1 : 0
                }
                if (o.mf_samples_to_encode = 0, 0 > c) return c;
                if (r = s - n, 0 == s && (r = 0), G.flush_bitstream(e), c = G.copy_buffer(o, a, t, r, 1), 0 > c) return c;
                if (t += c, n += c, r = s - n, 0 == s && (r = 0), e.write_id3tag_automatic) {
                    if (Q.id3tag_write_v1(e), c = G.copy_buffer(o, a, t, r, 0), 0 > c) return c;
                    n += c
                }
                return n
            }, this.lame_encode_buffer = function(e, a, t, s, n, r, _) {
                var i = e.internal_flags,
                    o = [null, null];
                if (i.Class_ID != $) return -3;
                if (0 == s) return 0;
                x(i, s), o[0] = i.in_buffer_0, o[1] = i.in_buffer_1;
                for (var l = 0; s > l; l++) o[0][l] = a[l], i.channels_in > 1 && (o[1][l] = t[l]);
                return I(e, o[0], o[1], s, n, r, _)
            }
        }
        var n = t(498),
            r = n.System,
            _ = n.VbrMode,
            i = (n.Float, n.ShortBlock),
            o = (n.Util, n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float),
            l = (n.new_float_n, n.new_int, n.new_int_n),
            f = n.new_short_n,
            c = n.assert,
            u = t(770),
            h = t(382),
            b = t(484),
            m = t(685),
            p = t(405),
            v = t(296),
            d = t(200),
            g = t(645),
            S = t(359);
        e.exports = s
    },
    553: function(e, a, t) {
        function s() {
            function e(e, a, t) {
                for (var n = 10, r = a + 238 - 14 - 286, i = -15; 0 > i; i++) {
                    var o, l, f;
                    o = s[n + -10], l = e[r + -224] * o, f = e[a + 224] * o, o = s[n + -9], l += e[r + -160] * o, f += e[a + 160] * o, o = s[n + -8], l += e[r + -96] * o, f += e[a + 96] * o, o = s[n + -7], l += e[r + -32] * o, f += e[a + 32] * o, o = s[n + -6], l += e[r + 32] * o, f += e[a + -32] * o, o = s[n + -5], l += e[r + 96] * o, f += e[a + -96] * o, o = s[n + -4], l += e[r + 160] * o, f += e[a + -160] * o, o = s[n + -3], l += e[r + 224] * o, f += e[a + -224] * o, o = s[n + -2], l += e[a + -256] * o, f -= e[r + 256] * o, o = s[n + -1], l += e[a + -192] * o, f -= e[r + 192] * o, o = s[n + 0], l += e[a + -128] * o, f -= e[r + 128] * o, o = s[n + 1], l += e[a + -64] * o, f -= e[r + 64] * o, o = s[n + 2], l += e[a + 0] * o, f -= e[r + 0] * o, o = s[n + 3], l += e[a + 64] * o, f -= e[r + -64] * o, o = s[n + 4], l += e[a + 128] * o, f -= e[r + -128] * o, o = s[n + 5], l += e[a + 192] * o, f -= e[r + -192] * o, l *= s[n + 6], o = f - l, t[30 + 2 * i] = f + l, t[31 + 2 * i] = s[n + 7] * o, n += 18, a--, r++
                }
                var l, f, c, u;
                f = e[a + -16] * s[n + -10], l = e[a + -32] * s[n + -2], f += (e[a + -48] - e[a + 16]) * s[n + -9], l += e[a + -96] * s[n + -1], f += (e[a + -80] + e[a + 48]) * s[n + -8], l += e[a + -160] * s[n + 0], f += (e[a + -112] - e[a + 80]) * s[n + -7], l += e[a + -224] * s[n + 1], f += (e[a + -144] + e[a + 112]) * s[n + -6], l -= e[a + 32] * s[n + 2], f += (e[a + -176] - e[a + 144]) * s[n + -5], l -= e[a + 96] * s[n + 3], f += (e[a + -208] + e[a + 176]) * s[n + -4], l -= e[a + 160] * s[n + 4], f += (e[a + -240] - e[a + 208]) * s[n + -3], l -= e[a + 224], c = l - f, u = l + f, f = t[14], l = t[15] - f, t[31] = u + f, t[30] = c + l, t[15] = c - l, t[14] = u - f;
                var h;
                h = t[28] - t[0], t[0] += t[28], t[28] = h * s[n + -36 + 7], h = t[29] - t[1], t[1] += t[29], t[29] = h * s[n + -36 + 7], h = t[26] - t[2], t[2] += t[26], t[26] = h * s[n + -72 + 7], h = t[27] - t[3], t[3] += t[27], t[27] = h * s[n + -72 + 7], h = t[24] - t[4], t[4] += t[24], t[24] = h * s[n + -108 + 7], h = t[25] - t[5], t[5] += t[25], t[25] = h * s[n + -108 + 7], h = t[22] - t[6], t[6] += t[22], t[22] = h * _.SQRT2, h = t[23] - t[7], t[7] += t[23], t[23] = h * _.SQRT2 - t[7], t[7] -= t[6], t[22] -= t[7], t[23] -= t[22], h = t[6], t[6] = t[31] - h, t[31] = t[31] + h, h = t[7], t[7] = t[30] - h, t[30] = t[30] + h, h = t[22], t[22] = t[15] - h, t[15] = t[15] + h, h = t[23], t[23] = t[14] - h, t[14] = t[14] + h, h = t[20] - t[8], t[8] += t[20], t[20] = h * s[n + -180 + 7], h = t[21] - t[9], t[9] += t[21], t[21] = h * s[n + -180 + 7], h = t[18] - t[10], t[10] += t[18], t[18] = h * s[n + -216 + 7], h = t[19] - t[11], t[11] += t[19], t[19] = h * s[n + -216 + 7], h = t[16] - t[12], t[12] += t[16], t[16] = h * s[n + -252 + 7], h = t[17] - t[13], t[13] += t[17], t[17] = h * s[n + -252 + 7], h = -t[20] + t[24], t[20] += t[24], t[24] = h * s[n + -216 + 7], h = -t[21] + t[25], t[21] += t[25], t[25] = h * s[n + -216 + 7], h = t[4] - t[8], t[4] += t[8], t[8] = h * s[n + -216 + 7], h = t[5] - t[9], t[5] += t[9], t[9] = h * s[n + -216 + 7], h = t[0] - t[12], t[0] += t[12], t[12] = h * s[n + -72 + 7], h = t[1] - t[13], t[1] += t[13], t[13] = h * s[n + -72 + 7], h = t[16] - t[28], t[16] += t[28], t[28] = h * s[n + -72 + 7], h = -t[17] + t[29], t[17] += t[29], t[29] = h * s[n + -72 + 7], h = _.SQRT2 * (t[2] - t[10]), t[2] += t[10], t[10] = h, h = _.SQRT2 * (t[3] - t[11]), t[3] += t[11], t[11] = h, h = _.SQRT2 * (-t[18] + t[26]), t[18] += t[26], t[26] = h - t[18], h = _.SQRT2 * (-t[19] + t[27]), t[19] += t[27], t[27] = h - t[19], h = t[2], t[19] -= t[3], t[3] -= h, t[2] = t[31] - h, t[31] += h, h = t[3], t[11] -= t[19], t[18] -= h, t[3] = t[30] - h, t[30] += h, h = t[18], t[27] -= t[11], t[19] -= h, t[18] = t[15] - h, t[15] += h, h = t[19], t[10] -= h, t[19] = t[14] - h, t[14] += h, h = t[10], t[11] -= h, t[10] = t[23] - h, t[23] += h, h = t[11], t[26] -= h, t[11] = t[22] - h, t[22] += h, h = t[26], t[27] -= h, t[26] = t[7] - h, t[7] += h, h = t[27], t[27] = t[6] - h, t[6] += h, h = _.SQRT2 * (t[0] - t[4]), t[0] += t[4], t[4] = h, h = _.SQRT2 * (t[1] - t[5]), t[1] += t[5], t[5] = h, h = _.SQRT2 * (t[16] - t[20]), t[16] += t[20], t[20] = h, h = _.SQRT2 * (t[17] - t[21]), t[17] += t[21], t[21] = h, h = -_.SQRT2 * (t[8] - t[12]), t[8] += t[12], t[12] = h - t[8], h = -_.SQRT2 * (t[9] - t[13]), t[9] += t[13], t[13] = h - t[9], h = -_.SQRT2 * (t[25] - t[29]), t[25] += t[29], t[29] = h - t[25], h = -_.SQRT2 * (t[24] + t[28]), t[24] -= t[28], t[28] = h - t[24], h = t[24] - t[16], t[24] = h, h = t[20] - h, t[20] = h, h = t[28] - h, t[28] = h, h = t[25] - t[17], t[25] = h, h = t[21] - h, t[21] = h, h = t[29] - h, t[29] = h, h = t[17] - t[1], t[17] = h, h = t[9] - h, t[9] = h, h = t[25] - h, t[25] = h, h = t[5] - h, t[5] = h, h = t[21] - h, t[21] = h, h = t[13] - h, t[13] = h, h = t[29] - h, t[29] = h, h = t[1] - t[0], t[1] = h, h = t[16] - h, t[16] = h, h = t[17] - h, t[17] = h, h = t[8] - h, t[8] = h, h = t[9] - h, t[9] = h, h = t[24] - h, t[24] = h, h = t[25] - h, t[25] = h, h = t[4] - h, t[4] = h, h = t[5] - h, t[5] = h, h = t[20] - h, t[20] = h, h = t[21] - h, t[21] = h, h = t[12] - h, t[12] = h, h = t[13] - h, t[13] = h, h = t[28] - h, t[28] = h, h = t[29] - h, t[29] = h, h = t[0], t[0] += t[31], t[31] -= h, h = t[1], t[1] += t[30], t[30] -= h, h = t[16], t[16] += t[15], t[15] -= h, h = t[17], t[17] += t[14], t[14] -= h, h = t[8], t[8] += t[23], t[23] -= h, h = t[9], t[9] += t[22], t[22] -= h, h = t[24], t[24] += t[7], t[7] -= h, h = t[25], t[25] += t[6], t[6] -= h, h = t[4], t[4] += t[27], t[27] -= h, h = t[5], t[5] += t[26], t[26] -= h, h = t[20], t[20] += t[11], t[11] -= h, h = t[21], t[21] += t[10], t[10] -= h, h = t[12], t[12] += t[19], t[19] -= h, h = t[13], t[13] += t[18], t[18] -= h, h = t[28], t[28] += t[3], t[3] -= h, h = t[29], t[29] += t[2], t[2] -= h
            }

            function a(e, a) {
                for (var t = 0; 3 > t; t++) {
                    var s, n, r, _, i, o;
                    _ = e[a + 6] * c[l.SHORT_TYPE][0] - e[a + 15], s = e[a + 0] * c[l.SHORT_TYPE][2] - e[a + 9], n = _ + s, r = _ - s, _ = e[a + 15] * c[l.SHORT_TYPE][0] + e[a + 6], s = e[a + 9] * c[l.SHORT_TYPE][2] + e[a + 0], i = _ + s, o = -_ + s, s = 2.069978111953089e-11 * (e[a + 3] * c[l.SHORT_TYPE][1] - e[a + 12]), _ = 2.069978111953089e-11 * (e[a + 12] * c[l.SHORT_TYPE][1] + e[a + 3]), e[a + 0] = 1.90752519173728e-11 * n + s, e[a + 15] = 1.90752519173728e-11 * -i + _, r = .8660254037844387 * r * 1.907525191737281e-11, i = .5 * i * 1.907525191737281e-11 + _, e[a + 3] = r - i, e[a + 6] = r + i, n = .5 * n * 1.907525191737281e-11 - s, o = .8660254037844387 * o * 1.907525191737281e-11, e[a + 9] = n + o, e[a + 12] = n - o, a++
                }
            }

            function t(e, a, t) {
                var s, n, r, _, i, o, l, f, c, u;
                r = t[17] - t[9], i = t[15] - t[11], o = t[14] - t[12], l = t[0] + t[8], f = t[1] + t[7], c = t[2] + t[6], u = t[3] + t[5], e[a + 17] = l + c - u - (f - t[4]), n = (l + c - u) * h[19] + (f - t[4]), s = (r - i - o) * h[18], e[a + 5] = s + n, e[a + 6] = s - n, _ = (t[16] - t[10]) * h[18], f = f * h[19] + t[4], s = r * h[12] + _ + i * h[13] + o * h[14], n = -l * h[16] + f - c * h[17] + u * h[15], e[a + 1] = s + n, e[a + 2] = s - n, s = r * h[13] - _ - i * h[14] + o * h[12], n = -l * h[17] + f - c * h[15] + u * h[16], e[a + 9] = s + n, e[a + 10] = s - n, s = r * h[14] - _ + i * h[12] - o * h[13], n = l * h[15] - f + c * h[16] - u * h[17], e[a + 13] = s + n, e[a + 14] = s - n;
                var b, m, p, v, d, g, S, M;
                b = t[8] - t[0], p = t[6] - t[2], v = t[5] - t[3], d = t[17] + t[9], g = t[16] + t[10], S = t[15] + t[11], M = t[14] + t[12], e[a + 0] = d + S + M + (g + t[13]), s = (d + S + M) * h[19] - (g + t[13]), n = (b - p + v) * h[18], e[a + 11] = s + n, e[a + 12] = s - n, m = (t[7] - t[1]) * h[18], g = t[13] - g * h[19], s = d * h[15] - g + S * h[16] + M * h[17], n = b * h[14] + m + p * h[12] + v * h[13], e[a + 3] = s + n, e[a + 4] = s - n, s = -d * h[17] + g - S * h[15] - M * h[16], n = b * h[13] + m - p * h[14] - v * h[12], e[a + 7] = s + n, e[a + 8] = s - n, s = -d * h[16] + g - S * h[17] - M * h[15], n = b * h[12] - m + p * h[13] - v * h[14], e[a + 15] = s + n, e[a + 16] = s - n
            }
            var s = [-0.1482523854003001, 32.308141959636465, 296.40344946382766, 883.1344870032432, 11113.947376231741, 1057.2713659324597, 305.7402417275812, 30.825928907280012, 3.8533188138216365, 59.42900443849514, 709.5899960123345, 5281.91112291017, -5829.66483675846, -817.6293103748613, -76.91656988279972, -4.594269939176596, .9063471690191471, .1960342806591213, -0.15466694054279598, 34.324387823855965, 301.8067566458425, 817.599602898885, 11573.795901679885, 1181.2520595540152, 321.59731579894424, 31.232021761053772, 3.7107095756221318, 53.650946155329365, 684.167428119626, 5224.56624370173, -6366.391851890084, -908.9766368219582, -89.83068876699639, -5.411397422890401, .8206787908286602, .3901806440322567, -0.16070888947830023, 36.147034243915876, 304.11815768187864, 732.7429163887613, 11989.60988270091, 1300.012278487897, 335.28490093152146, 31.48816102859945, 3.373875931311736, 47.232241542899175, 652.7371796173471, 5132.414255594984, -6909.087078780055, -1001.9990371107289, -103.62185754286375, -6.104916304710272, .7416505462720353, .5805693545089249, -0.16636367662261495, 37.751650073343995, 303.01103387567713, 627.9747488785183, 12358.763425278165, 1412.2779918482834, 346.7496836825721, 31.598286663170416, 3.1598635433980946, 40.57878626349686, 616.1671130880391, 5007.833007176154, -7454.040671756168, -1095.7960341867115, -118.24411666465777, -6.818469345853504, .6681786379192989, .7653668647301797, -0.1716176790982088, 39.11551877123304, 298.3413246578966, 503.5259106886539, 12679.589408408976, 1516.5821921214542, 355.9850766329023, 31.395241710249053, 2.9164211881972335, 33.79716964664243, 574.8943997801362, 4853.234992253242, -7997.57021486075, -1189.7624067269965, -133.6444792601766, -7.7202770609839915, .5993769336819237, .9427934736519954, -0.17645823955292173, 40.21879108166477, 289.9982036694474, 359.3226160751053, 12950.259102786438, 1612.1013903507662, 362.85067106591504, 31.045922092242872, 2.822222032597987, 26.988862316190684, 529.8996541764288, 4671.371946949588, -8535.899136645805, -1282.5898586244496, -149.58553632943463, -8.643494270763135, .5345111359507916, 1.111140466039205, -0.36174739330527045, 41.04429910497807, 277.5463268268618, 195.6386023135583, 13169.43812144731, 1697.6433561479398, 367.40983966190305, 30.557037410382826, 2.531473372857427, 20.070154905927314, 481.50208566532336, 4464.970341588308, -9065.36882077239, -1373.62841526722, -166.1660487028118, -9.58289321133207, .4729647758913199, 1.268786568327291, -0.36970682634889585, 41.393213350082036, 261.2935935556502, 12.935476055240873, 13336.131683328815, 1772.508612059496, 369.76534388639965, 29.751323653701338, 2.4023193045459172, 13.304795348228817, 430.5615775526625, 4237.0568611071185, -9581.931701634761, -1461.6913552409758, -183.12733958476446, -10.718010163869403, .41421356237309503, 1.414213562373095, -0.37677560326535325, 41.619486213528496, 241.05423794991074, -187.94665032361226, 13450.063605744153, 1836.153896465782, 369.4908799925761, 29.001847876923147, 2.0714759319987186, 6.779591200894186, 377.7767837205709, 3990.386575512536, -10081.709459700915, -1545.947424837898, -200.3762958015653, -11.864482073055006, .3578057213145241, 1.546020906725474, -0.3829366947518991, 41.1516456456653, 216.47684307105183, -406.1569483347166, 13511.136535077321, 1887.8076599260432, 367.3025214564151, 28.136213436723654, 1.913880671464418, .3829366947518991, 323.85365704338597, 3728.1472257487526, -10561.233882199509, -1625.2025997821418, -217.62525175416, -13.015432208941645, .3033466836073424, 1.66293922460509, -0.5822628872992417, 40.35639251440489, 188.20071124269245, -640.2706748618148, 13519.21490106562, 1927.6022433578062, 362.8197642637487, 26.968821921868447, 1.7463817695935329, -5.62650678237171, 269.3016715297017, 3453.386536448852, -11016.145278780888, -1698.6569643425091, -234.7658734267683, -14.16351421663124, .2504869601913055, 1.76384252869671, -0.5887180101749253, 39.23429103868072, 155.76096234403798, -889.2492977967378, 13475.470561874661, 1955.0535223723712, 356.4450994756727, 25.894952980042156, 1.5695032905781554, -11.181939564328772, 214.80884394039484, 3169.1640829158237, -11443.321309975563, -1765.1588461316153, -251.68908574481912, -15.49755935939164, .198912367379658, 1.847759065022573, -0.7912582233652842, 37.39369355329111, 119.699486012458, -1151.0956593239027, 13380.446257078214, 1970.3952110853447, 348.01959814116185, 24.731487364283044, 1.3850130831637748, -16.421408865300393, 161.05030052864092, 2878.3322807850063, -11838.991423510031, -1823.985884688674, -268.2854986386903, -16.81724543849939, .1483359875383474, 1.913880671464418, -0.7960642926861912, 35.2322109610459, 80.01928065061526, -1424.0212633405113, 13235.794061869668, 1973.804052543835, 337.9908651258184, 23.289159354463873, 1.3934255946442087, -21.099669467133474, 108.48348407242611, 2583.700758091299, -12199.726194855148, -1874.2780658979746, -284.2467154529415, -18.11369784385905, .09849140335716425, 1.961570560806461, -0.998795456205172, 32.56307803611191, 36.958364584370486, -1706.075448829146, 13043.287458812016, 1965.3831106103316, 326.43182772364605, 22.175018750622293, 1.198638339011324, -25.371248002043963, 57.53505923036915, 2288.41886619975, -12522.674544337233, -1914.8400385312243, -299.26241273417224, -19.37805630698734, .04912684976946725, 1.990369453344394, .035780907 * _.SQRT2 * .5 / 2384e-9, .017876148 * _.SQRT2 * .5 / 2384e-9, .003134727 * _.SQRT2 * .5 / 2384e-9, .002457142 * _.SQRT2 * .5 / 2384e-9, 971317e-9 * _.SQRT2 * .5 / 2384e-9, 218868e-9 * _.SQRT2 * .5 / 2384e-9, 101566e-9 * _.SQRT2 * .5 / 2384e-9, 13828e-9 * _.SQRT2 * .5 / 2384e-9, 12804.797818791945, 1945.5515939597317, 313.4244966442953, 49591e-9 / 2384e-9, 1995.1556208053692, 21458e-9 / 2384e-9, -69618e-9 / 2384e-9],
                n = 12,
                f = 36,
                c = [
                    [2.382191739347913e-13, 6.423305872147834e-13, 9.400849094049688e-13, 1.122435026096556e-12, 1.183840321267481e-12, 1.122435026096556e-12, 9.40084909404969e-13, 6.423305872147839e-13, 2.382191739347918e-13, 5.456116108943412e-12, 4.878985199565852e-12, 4.240448995017367e-12, 3.559909094758252e-12, 2.858043359288075e-12, 2.156177623817898e-12, 1.475637723558783e-12, 8.371015190102974e-13, 2.599706096327376e-13, -5.456116108943412e-12, -4.878985199565852e-12, -4.240448995017367e-12, -3.559909094758252e-12, -2.858043359288076e-12, -2.156177623817898e-12, -1.475637723558783e-12, -8.371015190102975e-13, -2.599706096327376e-13, -2.382191739347923e-13, -6.423305872147843e-13, -9.400849094049696e-13, -1.122435026096556e-12, -1.183840321267481e-12, -1.122435026096556e-12, -9.400849094049694e-13, -6.42330587214784e-13, -2.382191739347918e-13],
                    [2.382191739347913e-13, 6.423305872147834e-13, 9.400849094049688e-13, 1.122435026096556e-12, 1.183840321267481e-12, 1.122435026096556e-12, 9.400849094049688e-13, 6.423305872147841e-13, 2.382191739347918e-13, 5.456116108943413e-12, 4.878985199565852e-12, 4.240448995017367e-12, 3.559909094758253e-12, 2.858043359288075e-12, 2.156177623817898e-12, 1.475637723558782e-12, 8.371015190102975e-13, 2.599706096327376e-13, -5.461314069809755e-12, -4.921085770524055e-12, -4.343405037091838e-12, -3.732668368707687e-12, -3.093523840190885e-12, -2.430835727329465e-12, -1.734679010007751e-12, -9.74825365660928e-13, -2.797435120168326e-13, 0, 0, 0, 0, 0, 0, -2.283748241799531e-13, -4.037858874020686e-13, -2.146547464825323e-13],
                    [.1316524975873958, .414213562373095, .7673269879789602, 1.091308501069271, 1.303225372841206, 1.56968557711749, 1.920982126971166, 2.414213562373094, 3.171594802363212, 4.510708503662055, 7.595754112725146, 22.90376554843115, .984807753012208, .6427876096865394, .3420201433256688, .9396926207859084, -.1736481776669303, -.7660444431189779, .8660254037844387, .5, -.5144957554275265, -.4717319685649723, -.3133774542039019, -.1819131996109812, -.09457419252642064, -.04096558288530405, -.01419856857247115, -.003699974673760037, .8574929257125442, .8817419973177052, .9496286491027329, .9833145924917901, .9955178160675857, .9991605581781475, .999899195244447, .9999931550702802],
                    [0, 0, 0, 0, 0, 0, 2.283748241799531e-13, 4.037858874020686e-13, 2.146547464825323e-13, 5.461314069809755e-12, 4.921085770524055e-12, 4.343405037091838e-12, 3.732668368707687e-12, 3.093523840190885e-12, 2.430835727329466e-12, 1.734679010007751e-12, 9.74825365660928e-13, 2.797435120168326e-13, -5.456116108943413e-12, -4.878985199565852e-12, -4.240448995017367e-12, -3.559909094758253e-12, -2.858043359288075e-12, -2.156177623817898e-12, -1.475637723558782e-12, -8.371015190102975e-13, -2.599706096327376e-13, -2.382191739347913e-13, -6.423305872147834e-13, -9.400849094049688e-13, -1.122435026096556e-12, -1.183840321267481e-12, -1.122435026096556e-12, -9.400849094049688e-13, -6.423305872147841e-13, -2.382191739347918e-13]
                ],
                u = c[l.SHORT_TYPE],
                h = c[l.SHORT_TYPE],
                b = c[l.SHORT_TYPE],
                m = c[l.SHORT_TYPE],
                p = [0, 1, 16, 17, 8, 9, 24, 25, 4, 5, 20, 21, 12, 13, 28, 29, 2, 3, 18, 19, 10, 11, 26, 27, 6, 7, 22, 23, 14, 15, 30, 31];
            this.mdct_sub48 = function(s, _, h) {
                for (var v = _, d = 286, g = 0; g < s.channels_out; g++) {
                    for (var S = 0; S < s.mode_gr; S++) {
                        for (var M, w = s.l3_side.tt[S][g], A = w.xr, R = 0, B = s.sb_sample[g][1 - S], y = 0, E = 0; 9 > E; E++)
                            for (e(v, d, B[y]), e(v, d + 32, B[y + 1]), y += 2, d += 64, M = 1; 32 > M; M += 2) B[y - 1][M] *= -1;
                        for (M = 0; 32 > M; M++, R += 18) {
                            var T = w.block_type,
                                k = s.sb_sample[g][S],
                                x = s.sb_sample[g][1 - S];
                            if (0 != w.mixed_block_flag && 2 > M && (T = 0), s.amp_filter[M] < 1e-12) i.fill(A, R + 0, R + 18, 0);
                            else {
                                if (s.amp_filter[M] < 1)
                                    for (var E = 0; 18 > E; E++) x[E][p[M]] *= s.amp_filter[M];
                                if (T == l.SHORT_TYPE) {
                                    for (var E = -n / 4; 0 > E; E++) {
                                        var P = c[l.SHORT_TYPE][E + 3];
                                        A[R + 3 * E + 9] = k[9 + E][p[M]] * P - k[8 - E][p[M]], A[R + 3 * E + 18] = k[14 - E][p[M]] * P + k[15 + E][p[M]], A[R + 3 * E + 10] = k[15 + E][p[M]] * P - k[14 - E][p[M]], A[R + 3 * E + 19] = x[2 - E][p[M]] * P + x[3 + E][p[M]], A[R + 3 * E + 11] = x[3 + E][p[M]] * P - x[2 - E][p[M]], A[R + 3 * E + 20] = x[8 - E][p[M]] * P + x[9 + E][p[M]]
                                    }
                                    a(A, R)
                                } else {
                                    for (var I = o(18), E = -f / 4; 0 > E; E++) {
                                        var L, V;
                                        L = c[T][E + 27] * x[E + 9][p[M]] + c[T][E + 36] * x[8 - E][p[M]], V = c[T][E + 9] * k[E + 9][p[M]] - c[T][E + 18] * k[8 - E][p[M]], I[E + 9] = L - V * u[3 + E + 9], I[E + 18] = L * u[3 + E + 9] + V
                                    }
                                    t(A, R, I)
                                }
                            }
                            if (T != l.SHORT_TYPE && 0 != M)
                                for (var E = 7; E >= 0; --E) {
                                    var H, O;
                                    H = A[R + E] * b[20 + E] + A[R + -1 - E] * m[28 + E], O = A[R + E] * m[28 + E] - A[R + -1 - E] * b[20 + E], A[R + -1 - E] = H, A[R + E] = O
                                }
                        }
                    }
                    if (v = h, d = 286, 1 == s.mode_gr)
                        for (var N = 0; 18 > N; N++) r.arraycopy(s.sb_sample[g][1][N], 0, s.sb_sample[g][0][N], 0, 32)
                }
            }
        }
        var n = t(498),
            r = n.System,
            _ = (n.VbrMode, n.Float, n.ShortBlock, n.Util),
            i = n.Arrays,
            o = (n.new_array_n, n.new_byte, n.new_double, n.new_float),
            l = (n.new_float_n, n.new_int, n.new_int_n, n.assert, t(359));
        e.exports = s
    },
    554: function(e, a) {
        function t() {
            this.sum = 0, this.seen = 0, this.want = 0, this.pos = 0, this.size = 0, this.bag = null, this.nVbrNumFrames = 0, this.nBytesWritten = 0, this.TotalFrameSize = 0
        }
        e.exports = t
    },
    561: function(e, a, t) {
        var s = t(359),
            n = {};
        n.SFBMAX = 3 * s.SBMAX_s, e.exports = n
    },
    599: function(e, a, t) {
        function s() {
            function e(e) {
                return new Int32Array(e)
            }

            function a(e) {
                return new Float32Array(e)
            }
            this.xr = r(576), this.l3_enc = _(576), this.scalefac = _(i.SFBMAX), this.xrpow_max = 0, this.part2_3_length = 0, this.big_values = 0, this.count1 = 0, this.global_gain = 0, this.scalefac_compress = 0, this.block_type = 0, this.mixed_block_flag = 0, this.table_select = _(3), this.subblock_gain = _(4), this.region0_count = 0, this.region1_count = 0, this.preflag = 0, this.scalefac_scale = 0, this.count1table_select = 0, this.part2_length = 0, this.sfb_lmax = 0, this.sfb_smin = 0, this.psy_lmax = 0, this.sfbmax = 0, this.psymax = 0, this.sfbdivide = 0, this.width = _(i.SFBMAX), this.window = _(i.SFBMAX), this.count1bits = 0, this.sfb_partition_table = null, this.slen = _(4), this.max_nonzero_coeff = 0;
            var t = this;
            this.assign = function(s) {
                t.xr = a(s.xr), t.l3_enc = e(s.l3_enc), t.scalefac = e(s.scalefac), t.xrpow_max = s.xrpow_max, t.part2_3_length = s.part2_3_length, t.big_values = s.big_values, t.count1 = s.count1, t.global_gain = s.global_gain, t.scalefac_compress = s.scalefac_compress, t.block_type = s.block_type, t.mixed_block_flag = s.mixed_block_flag, t.table_select = e(s.table_select), t.subblock_gain = e(s.subblock_gain), t.region0_count = s.region0_count, t.region1_count = s.region1_count, t.preflag = s.preflag, t.scalefac_scale = s.scalefac_scale, t.count1table_select = s.count1table_select, t.part2_length = s.part2_length, t.sfb_lmax = s.sfb_lmax, t.sfb_smin = s.sfb_smin, t.psy_lmax = s.psy_lmax, t.sfbmax = s.sfbmax, t.psymax = s.psymax, t.sfbdivide = s.sfbdivide, t.width = e(s.width), t.window = e(s.window), t.count1bits = s.count1bits, t.sfb_partition_table = s.sfb_partition_table.slice(0), t.slen = e(s.slen), t.max_nonzero_coeff = s.max_nonzero_coeff
            }
        }
        var n = t(498),
            r = (n.System, n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float),
            _ = (n.new_float_n, n.new_int),
            i = (n.new_int_n, n.assert, t(561));
        e.exports = s
    },
    609: function(e, a, t) {
        function s() {
            function e(e, a, t, s) {
                s = 0;
                for (var n = 0; t >= n; ++n) {
                    var r = Math.abs(e.xr[n]);
                    s += r, a[n] = Math.sqrt(r * Math.sqrt(r)), a[n] > e.xrpow_max && (e.xrpow_max = a[n])
                }
                return s
            }

            function a(e, a) {
                var t = e.ATH,
                    s = a.xr;
                if (a.block_type != b.SHORT_TYPE)
                    for (var n = !1, r = b.PSFB21 - 1; r >= 0 && !n; r--) {
                        var _ = e.scalefac_band.psfb21[r],
                            i = e.scalefac_band.psfb21[r + 1],
                            o = y.athAdjust(t.adjust, t.psfb21[r], t.floor);
                        e.nsPsy.longfact[21] > 1e-12 && (o *= e.nsPsy.longfact[21]);
                        for (var l = i - 1; l >= _; l--) {
                            if (!(Math.abs(s[l]) < o)) {
                                n = !0;
                                break
                            }
                            s[l] = 0
                        }
                    } else
                        for (var f = 0; 3 > f; f++)
                            for (var n = !1, r = b.PSFB12 - 1; r >= 0 && !n; r--) {
                                var _ = 3 * e.scalefac_band.s[12] + (e.scalefac_band.s[13] - e.scalefac_band.s[12]) * f + (e.scalefac_band.psfb12[r] - e.scalefac_band.psfb12[0]),
                                    i = _ + (e.scalefac_band.psfb12[r + 1] - e.scalefac_band.psfb12[r]),
                                    c = y.athAdjust(t.adjust, t.psfb12[r], t.floor);
                                e.nsPsy.shortfact[12] > 1e-12 && (c *= e.nsPsy.shortfact[12]);
                                for (var l = i - 1; l >= _; l--) {
                                    if (!(Math.abs(s[l]) < c)) {
                                        n = !0;
                                        break
                                    }
                                    s[l] = 0
                                }
                            }
            }

            function t(e) {
                this.ordinal = e
            }

            function s(e, a, s, n, r) {
                var _, i = e.CurrentStep[n],
                    o = !1,
                    l = e.OldValue[n],
                    c = t.BINSEARCH_NONE;
                for (a.global_gain = l, s -= a.part2_length, f(0 != i);;) {
                    var u;
                    if (_ = E.count_bits(e, r, a, null), 1 == i || _ == s) break;
                    _ > s ? (c == t.BINSEARCH_DOWN && (o = !0), o && (i /= 2), c = t.BINSEARCH_UP, u = i) : (c == t.BINSEARCH_UP && (o = !0), o && (i /= 2), c = t.BINSEARCH_DOWN, u = -i), a.global_gain += u, a.global_gain < 0 && (a.global_gain = 0, o = !0), a.global_gain > 255 && (a.global_gain = 255, o = !0)
                }
                for (f(a.global_gain >= 0), f(a.global_gain < 256); _ > s && a.global_gain < 255;) a.global_gain++, _ = E.count_bits(e, r, a, null);
                return e.CurrentStep[n] = l - a.global_gain >= 4 ? 4 : 2, e.OldValue[n] = a.global_gain, a.part2_3_length = _, _
            }

            function n(e) {
                for (var a = 0; a < e.sfbmax; a++)
                    if (e.scalefac[a] + e.subblock_gain[e.window[a]] == 0) return !1;
                return !0
            }

            function v(e) {
                return i.FAST_LOG10(.368 + .632 * e * e * e)
            }

            function d(e, a) {
                for (var t = 1e-37, s = 0; s < a.psymax; s++) t += v(e[s]);
                return Math.max(1e-20, t)
            }

            function g(e, a, t, s, n) {
                var r;
                switch (e) {
                    default:
                        case 9:
                        a.over_count > 0 ? (r = t.over_SSD <= a.over_SSD, t.over_SSD == a.over_SSD && (r = t.bits < a.bits)) : r = t.max_noise < 0 && 10 * t.max_noise + t.bits <= 10 * a.max_noise + a.bits;
                    break;
                    case 0:
                            r = t.over_count < a.over_count || t.over_count == a.over_count && t.over_noise < a.over_noise || t.over_count == a.over_count && BitStream.EQ(t.over_noise, a.over_noise) && t.tot_noise < a.tot_noise;
                        break;
                    case 8:
                            t.max_noise = d(n, s);
                    case 1:
                            r = t.max_noise < a.max_noise;
                        break;
                    case 2:
                            r = t.tot_noise < a.tot_noise;
                        break;
                    case 3:
                            r = t.tot_noise < a.tot_noise && t.max_noise < a.max_noise;
                        break;
                    case 4:
                            r = t.max_noise <= 0 && a.max_noise > .2 || t.max_noise <= 0 && a.max_noise < 0 && a.max_noise > t.max_noise - .2 && t.tot_noise < a.tot_noise || t.max_noise <= 0 && a.max_noise > 0 && a.max_noise > t.max_noise - .2 && t.tot_noise < a.tot_noise + a.over_noise || t.max_noise > 0 && a.max_noise > -.05 && a.max_noise > t.max_noise - .1 && t.tot_noise + t.over_noise < a.tot_noise + a.over_noise || t.max_noise > 0 && a.max_noise > -.1 && a.max_noise > t.max_noise - .15 && t.tot_noise + t.over_noise + t.over_noise < a.tot_noise + a.over_noise + a.over_noise;
                        break;
                    case 5:
                            r = t.over_noise < a.over_noise || BitStream.EQ(t.over_noise, a.over_noise) && t.tot_noise < a.tot_noise;
                        break;
                    case 6:
                            r = t.over_noise < a.over_noise || BitStream.EQ(t.over_noise, a.over_noise) && (t.max_noise < a.max_noise || BitStream.EQ(t.max_noise, a.max_noise) && t.tot_noise <= a.tot_noise);
                        break;
                    case 7:
                            r = t.over_count < a.over_count || t.over_noise < a.over_noise
                }
                return 0 == a.over_count && (r = r && t.bits < a.bits), r
            }

            function S(e, a, t, s, n) {
                var r, _ = e.internal_flags;
                r = 0 == a.scalefac_scale ? 1.2968395546510096 : 1.6817928305074292;
                for (var i = 0, o = 0; o < a.sfbmax; o++) i < t[o] && (i = t[o]);
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
                for (var f = 0, o = 0; o < a.sfbmax; o++) {
                    var c, u = a.width[o];
                    if (f += u, !(t[o] < i)) {
                        if (0 != (2 & _.substep_shaping) && (_.pseudohalf[o] = 0 == _.pseudohalf[o] ? 1 : 0, 0 == _.pseudohalf[o] && 2 == _.noise_shaping_amp)) return;
                        for (a.scalefac[o]++, c = -u; 0 > c; c++) s[f + c] *= r, s[f + c] > a.xrpow_max && (a.xrpow_max = s[f + c]);
                        if (2 == _.noise_shaping_amp) return
                    }
                }
            }

            function M(e, a) {
                for (var t = 1.2968395546510096, s = 0, n = 0; n < e.sfbmax; n++) {
                    var r = e.width[n],
                        _ = e.scalefac[n];
                    if (0 != e.preflag && (_ += y.pretab[n]), s += r, 0 != (1 & _)) {
                        _++;
                        for (var i = -r; 0 > i; i++) a[s + i] *= t, a[s + i] > e.xrpow_max && (e.xrpow_max = a[s + i])
                    }
                    e.scalefac[n] = _ >> 1
                }
                e.preflag = 0, e.scalefac_scale = 1
            }

            function w(e, a, t) {
                var s, n = a.scalefac;
                for (s = 0; s < a.sfb_lmax; s++)
                    if (n[s] >= 16) return !0;
                for (var r = 0; 3 > r; r++) {
                    var _ = 0,
                        i = 0;
                    for (s = a.sfb_lmax + r; s < a.sfbdivide; s += 3) _ < n[s] && (_ = n[s]);
                    for (; s < a.sfbmax; s += 3) i < n[s] && (i = n[s]);
                    if (!(16 > _ && 8 > i)) {
                        if (a.subblock_gain[r] >= 7) return !0;
                        a.subblock_gain[r]++;
                        var o = e.scalefac_band.l[a.sfb_lmax];
                        for (s = a.sfb_lmax + r; s < a.sfbmax; s += 3) {
                            var l, c = a.width[s],
                                u = n[s];
                            if (f(u >= 0), u -= 4 >> a.scalefac_scale, u >= 0) n[s] = u, o += 3 * c;
                            else {
                                n[s] = 0;
                                var h = 210 + (u << a.scalefac_scale + 1);
                                l = y.IPOW20(h), o += c * (r + 1);
                                for (var b = -c; 0 > b; b++) t[o + b] *= l, t[o + b] > a.xrpow_max && (a.xrpow_max = t[o + b]);
                                o += c * (3 - r - 1)
                            }
                        }
                        var l = y.IPOW20(202);
                        o += a.width[s] * (r + 1);
                        for (var b = -a.width[s]; 0 > b; b++) t[o + b] *= l, t[o + b] > a.xrpow_max && (a.xrpow_max = t[o + b])
                    }
                }
                return !1
            }

            function A(e, a, t, s, r) {
                var _ = e.internal_flags;
                S(e, a, t, s, r);
                var i = n(a);
                return i ? !1 : (i = 2 == _.mode_gr ? E.scale_bitcount(a) : E.scale_bitcount_lsf(_, a)) ? (_.noise_shaping > 1 && (o.fill(_.pseudohalf, 0), 0 == a.scalefac_scale ? (M(a, s), i = !1) : a.block_type == b.SHORT_TYPE && _.subblock_gain > 0 && (i = w(_, a, s) || n(a))), i || (i = 2 == _.mode_gr ? E.scale_bitcount(a) : E.scale_bitcount_lsf(_, a)), !i) : !0
            }
            var R;
            this.rv = null;
            var B;
            this.qupvt = null;
            var y, E, T = new c;
            this.setModules = function(e, a, t, s) {
                R = e, B = a, this.rv = a, y = t, this.qupvt = t, E = s, T.setModules(y, E)
            }, this.ms_convert = function(e, a) {
                for (var t = 0; 576 > t; ++t) {
                    var s = e.tt[a][0].xr[t],
                        n = e.tt[a][1].xr[t];
                    e.tt[a][0].xr[t] = (s + n) * (.5 * i.SQRT2), e.tt[a][1].xr[t] = (s - n) * (.5 * i.SQRT2)
                }
            }, this.init_xrpow = function(a, t, s) {
                var n = 0,
                    r = 0 | t.max_nonzero_coeff;
                if (f(null != s), t.xrpow_max = 0, f(r >= 0 && 575 >= r), o.fill(s, r, 576, 0), n = e(t, s, r, n), n > 1e-20) {
                    var _ = 0;
                    0 != (2 & a.substep_shaping) && (_ = 1);
                    for (var i = 0; i < t.psymax; i++) a.pseudohalf[i] = _;
                    return !0
                }
                return o.fill(t.l3_enc, 0, 576, 0), !1
            }, this.init_outer_loop = function(e, t) {
                t.part2_3_length = 0, t.big_values = 0, t.count1 = 0, t.global_gain = 210, t.scalefac_compress = 0, t.table_select[0] = 0, t.table_select[1] = 0, t.table_select[2] = 0, t.subblock_gain[0] = 0, t.subblock_gain[1] = 0, t.subblock_gain[2] = 0, t.subblock_gain[3] = 0, t.region0_count = 0, t.region1_count = 0, t.preflag = 0, t.scalefac_scale = 0, t.count1table_select = 0, t.part2_length = 0, t.sfb_lmax = b.SBPSY_l, t.sfb_smin = b.SBPSY_s, t.psy_lmax = e.sfb21_extra ? b.SBMAX_l : b.SBPSY_l, t.psymax = t.psy_lmax, t.sfbmax = t.sfb_lmax, t.sfbdivide = 11;
                for (var s = 0; s < b.SBMAX_l; s++) t.width[s] = e.scalefac_band.l[s + 1] - e.scalefac_band.l[s], t.window[s] = 3;
                if (t.block_type == b.SHORT_TYPE) {
                    var n = l(576);
                    t.sfb_smin = 0, t.sfb_lmax = 0, 0 != t.mixed_block_flag && (t.sfb_smin = 3, t.sfb_lmax = 2 * e.mode_gr + 4), t.psymax = t.sfb_lmax + 3 * ((e.sfb21_extra ? b.SBMAX_s : b.SBPSY_s) - t.sfb_smin), t.sfbmax = t.sfb_lmax + 3 * (b.SBPSY_s - t.sfb_smin), t.sfbdivide = t.sfbmax - 18, t.psy_lmax = t.sfb_lmax;
                    var _ = e.scalefac_band.l[t.sfb_lmax];
                    r.arraycopy(t.xr, 0, n, 0, 576);
                    for (var s = t.sfb_smin; s < b.SBMAX_s; s++)
                        for (var i = e.scalefac_band.s[s], f = e.scalefac_band.s[s + 1], c = 0; 3 > c; c++)
                            for (var u = i; f > u; u++) t.xr[_++] = n[3 * u + c];
                    for (var h = t.sfb_lmax, s = t.sfb_smin; s < b.SBMAX_s; s++) t.width[h] = t.width[h + 1] = t.width[h + 2] = e.scalefac_band.s[s + 1] - e.scalefac_band.s[s], t.window[h] = 0, t.window[h + 1] = 1, t.window[h + 2] = 2, h += 3
                }
                t.count1bits = 0, t.sfb_partition_table = y.nr_of_sfb_block[0][0], t.slen[0] = 0, t.slen[1] = 0, t.slen[2] = 0, t.slen[3] = 0, t.max_nonzero_coeff = 575, o.fill(t.scalefac, 0), a(e, t)
            }, t.BINSEARCH_NONE = new t(0), t.BINSEARCH_UP = new t(1), t.BINSEARCH_DOWN = new t(2), this.trancate_smallspectrums = function(e, a, t, s) {
                var n = l(p.SFBMAX);
                if ((0 != (4 & e.substep_shaping) || a.block_type != b.SHORT_TYPE) && 0 == (128 & e.substep_shaping)) {
                    y.calc_noise(a, t, n, new u, null);
                    for (var r = 0; 576 > r; r++) {
                        var _ = 0;
                        0 != a.l3_enc[r] && (_ = Math.abs(a.xr[r])), s[r] = _
                    }
                    var r = 0,
                        i = 8;
                    a.block_type == b.SHORT_TYPE && (i = 6);
                    do {
                        var f, c, h, m, v = a.width[i];
                        if (r += v, !(n[i] >= 1 || (o.sort(s, r - v, v), BitStream.EQ(s[r - 1], 0)))) {
                            f = (1 - n[i]) * t[i], c = 0, m = 0;
                            do {
                                var d;
                                for (h = 1; v > m + h && !BitStream.NEQ(s[m + r - v], s[m + r + h - v]); h++);
                                if (d = s[m + r - v] * s[m + r - v] * h, d > f) {
                                    0 != m && (c = s[m + r - v - 1]);
                                    break
                                }
                                f -= d, m += h
                            } while (v > m);
                            if (!BitStream.EQ(c, 0))
                                do Math.abs(a.xr[r - v]) <= c && (a.l3_enc[r - v] = 0); while (--v > 0)
                        }
                    } while (++i < a.psymax);
                    a.part2_3_length = E.noquant_count_bits(e, a, null)
                }
            }, this.outer_loop = function(e, a, t, n, i, o) {
                var c, v = e.internal_flags,
                    d = new m,
                    S = l(576),
                    M = l(p.SFBMAX),
                    w = new u,
                    R = new h,
                    B = 9999999,
                    T = !1,
                    k = !1,
                    x = 0;
                if (s(v, a, o, i, n), 0 == v.noise_shaping) return 100;
                y.calc_noise(a, t, M, w, R), w.bits = a.part2_3_length, d.assign(a);
                var P = 0;
                for (r.arraycopy(n, 0, S, 0, 576); !T;) {
                    do {
                        var I, L = new u,
                            V = 255;
                        if (I = 0 != (2 & v.substep_shaping) ? 20 : 3, v.sfb21_extra) {
                            if (M[d.sfbmax] > 1) break;
                            if (d.block_type == b.SHORT_TYPE && (M[d.sfbmax + 1] > 1 || M[d.sfbmax + 2] > 1)) break
                        }
                        if (!A(e, d, M, n, k)) break;
                        0 != d.scalefac_scale && (V = 254);
                        var H = o - d.part2_length;
                        if (0 >= H) break;
                        for (;
                            (d.part2_3_length = E.count_bits(v, n, d, R)) > H && d.global_gain <= V;) d.global_gain++;
                        if (d.global_gain > V) break;
                        if (0 == w.over_count) {
                            for (;
                                (d.part2_3_length = E.count_bits(v, n, d, R)) > B && d.global_gain <= V;) d.global_gain++;
                            if (d.global_gain > V) break
                        }
                        if (y.calc_noise(d, t, M, L, R), L.bits = d.part2_3_length, c = a.block_type != b.SHORT_TYPE ? e.quant_comp : e.quant_comp_short, c = g(c, w, L, d, M) ? 1 : 0, 0 != c) B = a.part2_3_length, w = L, a.assign(d), P = 0, r.arraycopy(n, 0, S, 0, 576);
                        else if (0 == v.full_outer_loop) {
                            if (++P > I && 0 == w.over_count) break;
                            if (3 == v.noise_shaping_amp && k && P > 30) break;
                            if (3 == v.noise_shaping_amp && k && d.global_gain - x > 15) break
                        }
                    } while (d.global_gain + d.scalefac_scale < 255);
                    3 == v.noise_shaping_amp ? k ? T = !0 : (d.assign(a), r.arraycopy(S, 0, n, 0, 576), P = 0, x = d.global_gain, k = !0) : T = !0
                }
                return f(a.global_gain + a.scalefac_scale <= 255), e.VBR == _.vbr_rh || e.VBR == _.vbr_mtrh ? r.arraycopy(S, 0, n, 0, 576) : 0 != (1 & v.substep_shaping) && trancate_smallspectrums(v, a, t, n), w.over_count
            }, this.iteration_finish_one = function(e, a, t) {
                var s = e.l3_side,
                    n = s.tt[a][t];
                E.best_scalefac_store(e, a, t, s), 1 == e.use_best_huffman && E.best_huffman_divide(e, n), B.ResvAdjust(e, n)
            }, this.VBR_encode_granule = function(e, a, t, s, n, _, i) {
                var c, u, h = e.internal_flags,
                    b = new m,
                    p = l(576),
                    v = i,
                    d = i + 1,
                    g = (i + _) / 2,
                    S = 0,
                    M = h.sfb21_extra;
                f(v <= LameInternalFlags.MAX_BITS_PER_CHANNEL), o.fill(b.l3_enc, 0);
                do f(g >= _), f(i >= g), f(i >= _), g > v - 42 ? h.sfb21_extra = !1 : h.sfb21_extra = M, u = outer_loop(e, a, t, s, n, g), 0 >= u ? (S = 1, d = a.part2_3_length, b.assign(a), r.arraycopy(s, 0, p, 0, 576), i = d - 32, c = i - _, g = (i + _) / 2) : (_ = g + 32, c = i - _, g = (i + _) / 2, 0 != S && (S = 2, a.assign(b), r.arraycopy(p, 0, s, 0, 576))); while (c > 12);
                h.sfb21_extra = M, 2 == S && r.arraycopy(b.l3_enc, 0, a.l3_enc, 0, 576), f(a.part2_3_length <= v)
            }, this.get_framebits = function(e, a) {
                var t = e.internal_flags;
                t.bitrate_index = t.VBR_min_bitrate;
                var s = R.getframebits(e);
                t.bitrate_index = 1, s = R.getframebits(e);
                for (var n = 1; n <= t.VBR_max_bitrate; n++) {
                    t.bitrate_index = n;
                    var r = new MeanBits(s);
                    a[n] = B.ResvFrameBegin(e, r), s = r.bits
                }
            }, this.VBR_old_prepare = function(e, a, t, s, n, r, _, i, o) {
                var l, f = e.internal_flags,
                    c = 0,
                    u = 1,
                    h = 0;
                f.bitrate_index = f.VBR_max_bitrate;
                var m = B.ResvFrameBegin(e, new MeanBits(0)) / f.mode_gr;
                get_framebits(e, r);
                for (var p = 0; p < f.mode_gr; p++) {
                    var v = y.on_pe(e, a, i[p], m, p, 0);
                    f.mode_ext == b.MPG_MD_MS_LR && (ms_convert(f.l3_side, p), y.reduce_side(i[p], t[p], m, v));
                    for (var d = 0; d < f.channels_out; ++d) {
                        var g = f.l3_side.tt[p][d];
                        g.block_type != b.SHORT_TYPE ? (c = 1.28 / (1 + Math.exp(3.5 - a[p][d] / 300)) - .05, l = f.PSY.mask_adjust - c) : (c = 2.56 / (1 + Math.exp(3.5 - a[p][d] / 300)) - .14, l = f.PSY.mask_adjust_short - c), f.masking_lower = Math.pow(10, .1 * l), init_outer_loop(f, g), o[p][d] = y.calc_xmin(e, s[p][d], g, n[p][d]), 0 != o[p][d] && (u = 0), _[p][d] = 126, h += i[p][d]
                    }
                }
                for (var p = 0; p < f.mode_gr; p++)
                    for (var d = 0; d < f.channels_out; d++) h > r[f.VBR_max_bitrate] && (i[p][d] *= r[f.VBR_max_bitrate], i[p][d] /= h), _[p][d] > i[p][d] && (_[p][d] = i[p][d]);
                return u
            }, this.bitpressure_strategy = function(e, a, t, s) {
                for (var n = 0; n < e.mode_gr; n++)
                    for (var r = 0; r < e.channels_out; r++) {
                        for (var _ = e.l3_side.tt[n][r], i = a[n][r], o = 0, l = 0; l < _.psy_lmax; l++) i[o++] *= 1 + .029 * l * l / b.SBMAX_l / b.SBMAX_l;
                        if (_.block_type == b.SHORT_TYPE)
                            for (var l = _.sfb_smin; l < b.SBMAX_s; l++) i[o++] *= 1 + .029 * l * l / b.SBMAX_s / b.SBMAX_s, i[o++] *= 1 + .029 * l * l / b.SBMAX_s / b.SBMAX_s, i[o++] *= 1 + .029 * l * l / b.SBMAX_s / b.SBMAX_s;
                        s[n][r] = 0 | Math.max(t[n][r], .9 * s[n][r])
                    }
            }, this.VBR_new_prepare = function(e, a, t, s, n, r) {
                var _, i = e.internal_flags,
                    o = 1,
                    l = 0,
                    f = 0;
                if (e.free_format) {
                    i.bitrate_index = 0;
                    var c = new MeanBits(l);
                    _ = B.ResvFrameBegin(e, c), l = c.bits, n[0] = _
                } else {
                    i.bitrate_index = i.VBR_max_bitrate;
                    var c = new MeanBits(l);
                    B.ResvFrameBegin(e, c), l = c.bits, get_framebits(e, n), _ = n[i.VBR_max_bitrate]
                }
                for (var u = 0; u < i.mode_gr; u++) {
                    y.on_pe(e, a, r[u], l, u, 0), i.mode_ext == b.MPG_MD_MS_LR && ms_convert(i.l3_side, u);
                    for (var h = 0; h < i.channels_out; ++h) {
                        var m = i.l3_side.tt[u][h];
                        i.masking_lower = Math.pow(10, .1 * i.PSY.mask_adjust), init_outer_loop(i, m), 0 != y.calc_xmin(e, t[u][h], m, s[u][h]) && (o = 0), f += r[u][h]
                    }
                }
                for (var u = 0; u < i.mode_gr; u++)
                    for (var h = 0; h < i.channels_out; h++) f > _ && (r[u][h] *= _, r[u][h] /= f);
                return o
            }, this.calc_target_bits = function(e, a, t, s, n, r) {
                var _, i, o, l, f = e.internal_flags,
                    c = f.l3_side,
                    u = 0;
                f.bitrate_index = f.VBR_max_bitrate;
                var h = new MeanBits(u);
                for (r[0] = B.ResvFrameBegin(e, h), u = h.bits, f.bitrate_index = 1, u = R.getframebits(e) - 8 * f.sideinfo_len, n[0] = u / (f.mode_gr * f.channels_out), u = e.VBR_mean_bitrate_kbps * e.framesize * 1e3, 0 != (1 & f.substep_shaping) && (u *= 1.09), u /= e.out_samplerate, u -= 8 * f.sideinfo_len, u /= f.mode_gr * f.channels_out, _ = .93 + .07 * (11 - e.compression_ratio) / 5.5, .9 > _ && (_ = .9), _ > 1 && (_ = 1), i = 0; i < f.mode_gr; i++) {
                    var m = 0;
                    for (o = 0; o < f.channels_out; o++) {
                        if (s[i][o] = int(_ * u), a[i][o] > 700) {
                            var p = int((a[i][o] - 700) / 1.4),
                                v = c.tt[i][o];
                            s[i][o] = int(_ * u), v.block_type == b.SHORT_TYPE && u / 2 > p && (p = u / 2), p > 3 * u / 2 ? p = 3 * u / 2 : 0 > p && (p = 0), s[i][o] += p
                        }
                        s[i][o] > LameInternalFlags.MAX_BITS_PER_CHANNEL && (s[i][o] = LameInternalFlags.MAX_BITS_PER_CHANNEL), m += s[i][o]
                    }
                    if (m > LameInternalFlags.MAX_BITS_PER_GRANULE)
                        for (o = 0; o < f.channels_out; ++o) s[i][o] *= LameInternalFlags.MAX_BITS_PER_GRANULE, s[i][o] /= m
                }
                if (f.mode_ext == b.MPG_MD_MS_LR)
                    for (i = 0; i < f.mode_gr; i++) y.reduce_side(s[i], t[i], u * f.channels_out, LameInternalFlags.MAX_BITS_PER_GRANULE);
                for (l = 0, i = 0; i < f.mode_gr; i++)
                    for (o = 0; o < f.channels_out; o++) s[i][o] > LameInternalFlags.MAX_BITS_PER_CHANNEL && (s[i][o] = LameInternalFlags.MAX_BITS_PER_CHANNEL), l += s[i][o];
                if (l > r[0])
                    for (i = 0; i < f.mode_gr; i++)
                        for (o = 0; o < f.channels_out; o++) s[i][o] *= r[0], s[i][o] /= l
            }
        }
        var n = t(498),
            r = n.System,
            _ = n.VbrMode,
            i = (n.Float, n.ShortBlock, n.Util),
            o = n.Arrays,
            l = (n.new_array_n, n.new_byte, n.new_double, n.new_float),
            f = (n.new_float_n, n.new_int, n.new_int_n, n.assert),
            c = t(95),
            u = t(149),
            h = t(489),
            b = t(359),
            m = t(599),
            p = t(561);
        e.exports = s
    },
    645: function(e, a) {
        function t(e, a, t, s) {
            this.xlen = e, this.linmax = a, this.table = t, this.hlen = s
        }
        var s = {};
        s.t1HB = [1, 1, 1, 0], s.t2HB = [1, 2, 1, 3, 1, 1, 3, 2, 0], s.t3HB = [3, 2, 1, 1, 1, 1, 3, 2, 0], s.t5HB = [1, 2, 6, 5, 3, 1, 4, 4, 7, 5, 7, 1, 6, 1, 1, 0], s.t6HB = [7, 3, 5, 1, 6, 2, 3, 2, 5, 4, 4, 1, 3, 3, 2, 0], s.t7HB = [1, 2, 10, 19, 16, 10, 3, 3, 7, 10, 5, 3, 11, 4, 13, 17, 8, 4, 12, 11, 18, 15, 11, 2, 7, 6, 9, 14, 3, 1, 6, 4, 5, 3, 2, 0], s.t8HB = [3, 4, 6, 18, 12, 5, 5, 1, 2, 16, 9, 3, 7, 3, 5, 14, 7, 3, 19, 17, 15, 13, 10, 4, 13, 5, 8, 11, 5, 1, 12, 4, 4, 1, 1, 0], s.t9HB = [7, 5, 9, 14, 15, 7, 6, 4, 5, 5, 6, 7, 7, 6, 8, 8, 8, 5, 15, 6, 9, 10, 5, 1, 11, 7, 9, 6, 4, 1, 14, 4, 6, 2, 6, 0], s.t10HB = [1, 2, 10, 23, 35, 30, 12, 17, 3, 3, 8, 12, 18, 21, 12, 7, 11, 9, 15, 21, 32, 40, 19, 6, 14, 13, 22, 34, 46, 23, 18, 7, 20, 19, 33, 47, 27, 22, 9, 3, 31, 22, 41, 26, 21, 20, 5, 3, 14, 13, 10, 11, 16, 6, 5, 1, 9, 8, 7, 8, 4, 4, 2, 0], s.t11HB = [3, 4, 10, 24, 34, 33, 21, 15, 5, 3, 4, 10, 32, 17, 11, 10, 11, 7, 13, 18, 30, 31, 20, 5, 25, 11, 19, 59, 27, 18, 12, 5, 35, 33, 31, 58, 30, 16, 7, 5, 28, 26, 32, 19, 17, 15, 8, 14, 14, 12, 9, 13, 14, 9, 4, 1, 11, 4, 6, 6, 6, 3, 2, 0], s.t12HB = [9, 6, 16, 33, 41, 39, 38, 26, 7, 5, 6, 9, 23, 16, 26, 11, 17, 7, 11, 14, 21, 30, 10, 7, 17, 10, 15, 12, 18, 28, 14, 5, 32, 13, 22, 19, 18, 16, 9, 5, 40, 17, 31, 29, 17, 13, 4, 2, 27, 12, 11, 15, 10, 7, 4, 1, 27, 12, 8, 12, 6, 3, 1, 0], s.t13HB = [1, 5, 14, 21, 34, 51, 46, 71, 42, 52, 68, 52, 67, 44, 43, 19, 3, 4, 12, 19, 31, 26, 44, 33, 31, 24, 32, 24, 31, 35, 22, 14, 15, 13, 23, 36, 59, 49, 77, 65, 29, 40, 30, 40, 27, 33, 42, 16, 22, 20, 37, 61, 56, 79, 73, 64, 43, 76, 56, 37, 26, 31, 25, 14, 35, 16, 60, 57, 97, 75, 114, 91, 54, 73, 55, 41, 48, 53, 23, 24, 58, 27, 50, 96, 76, 70, 93, 84, 77, 58, 79, 29, 74, 49, 41, 17, 47, 45, 78, 74, 115, 94, 90, 79, 69, 83, 71, 50, 59, 38, 36, 15, 72, 34, 56, 95, 92, 85, 91, 90, 86, 73, 77, 65, 51, 44, 43, 42, 43, 20, 30, 44, 55, 78, 72, 87, 78, 61, 46, 54, 37, 30, 20, 16, 53, 25, 41, 37, 44, 59, 54, 81, 66, 76, 57, 54, 37, 18, 39, 11, 35, 33, 31, 57, 42, 82, 72, 80, 47, 58, 55, 21, 22, 26, 38, 22, 53, 25, 23, 38, 70, 60, 51, 36, 55, 26, 34, 23, 27, 14, 9, 7, 34, 32, 28, 39, 49, 75, 30, 52, 48, 40, 52, 28, 18, 17, 9, 5, 45, 21, 34, 64, 56, 50, 49, 45, 31, 19, 12, 15, 10, 7, 6, 3, 48, 23, 20, 39, 36, 35, 53, 21, 16, 23, 13, 10, 6, 1, 4, 2, 16, 15, 17, 27, 25, 20, 29, 11, 17, 12, 16, 8, 1, 1, 0, 1], s.t15HB = [7, 12, 18, 53, 47, 76, 124, 108, 89, 123, 108, 119, 107, 81, 122, 63, 13, 5, 16, 27, 46, 36, 61, 51, 42, 70, 52, 83, 65, 41, 59, 36, 19, 17, 15, 24, 41, 34, 59, 48, 40, 64, 50, 78, 62, 80, 56, 33, 29, 28, 25, 43, 39, 63, 55, 93, 76, 59, 93, 72, 54, 75, 50, 29, 52, 22, 42, 40, 67, 57, 95, 79, 72, 57, 89, 69, 49, 66, 46, 27, 77, 37, 35, 66, 58, 52, 91, 74, 62, 48, 79, 63, 90, 62, 40, 38, 125, 32, 60, 56, 50, 92, 78, 65, 55, 87, 71, 51, 73, 51, 70, 30, 109, 53, 49, 94, 88, 75, 66, 122, 91, 73, 56, 42, 64, 44, 21, 25, 90, 43, 41, 77, 73, 63, 56, 92, 77, 66, 47, 67, 48, 53, 36, 20, 71, 34, 67, 60, 58, 49, 88, 76, 67, 106, 71, 54, 38, 39, 23, 15, 109, 53, 51, 47, 90, 82, 58, 57, 48, 72, 57, 41, 23, 27, 62, 9, 86, 42, 40, 37, 70, 64, 52, 43, 70, 55, 42, 25, 29, 18, 11, 11, 118, 68, 30, 55, 50, 46, 74, 65, 49, 39, 24, 16, 22, 13, 14, 7, 91, 44, 39, 38, 34, 63, 52, 45, 31, 52, 28, 19, 14, 8, 9, 3, 123, 60, 58, 53, 47, 43, 32, 22, 37, 24, 17, 12, 15, 10, 2, 1, 71, 37, 34, 30, 28, 20, 17, 26, 21, 16, 10, 6, 8, 6, 2, 0], s.t16HB = [1, 5, 14, 44, 74, 63, 110, 93, 172, 149, 138, 242, 225, 195, 376, 17, 3, 4, 12, 20, 35, 62, 53, 47, 83, 75, 68, 119, 201, 107, 207, 9, 15, 13, 23, 38, 67, 58, 103, 90, 161, 72, 127, 117, 110, 209, 206, 16, 45, 21, 39, 69, 64, 114, 99, 87, 158, 140, 252, 212, 199, 387, 365, 26, 75, 36, 68, 65, 115, 101, 179, 164, 155, 264, 246, 226, 395, 382, 362, 9, 66, 30, 59, 56, 102, 185, 173, 265, 142, 253, 232, 400, 388, 378, 445, 16, 111, 54, 52, 100, 184, 178, 160, 133, 257, 244, 228, 217, 385, 366, 715, 10, 98, 48, 91, 88, 165, 157, 148, 261, 248, 407, 397, 372, 380, 889, 884, 8, 85, 84, 81, 159, 156, 143, 260, 249, 427, 401, 392, 383, 727, 713, 708, 7, 154, 76, 73, 141, 131, 256, 245, 426, 406, 394, 384, 735, 359, 710, 352, 11, 139, 129, 67, 125, 247, 233, 229, 219, 393, 743, 737, 720, 885, 882, 439, 4, 243, 120, 118, 115, 227, 223, 396, 746, 742, 736, 721, 712, 706, 223, 436, 6, 202, 224, 222, 218, 216, 389, 386, 381, 364, 888, 443, 707, 440, 437, 1728, 4, 747, 211, 210, 208, 370, 379, 734, 723, 714, 1735, 883, 877, 876, 3459, 865, 2, 377, 369, 102, 187, 726, 722, 358, 711, 709, 866, 1734, 871, 3458, 870, 434, 0, 12, 10, 7, 11, 10, 17, 11, 9, 13, 12, 10, 7, 5, 3, 1, 3], s.t24HB = [15, 13, 46, 80, 146, 262, 248, 434, 426, 669, 653, 649, 621, 517, 1032, 88, 14, 12, 21, 38, 71, 130, 122, 216, 209, 198, 327, 345, 319, 297, 279, 42, 47, 22, 41, 74, 68, 128, 120, 221, 207, 194, 182, 340, 315, 295, 541, 18, 81, 39, 75, 70, 134, 125, 116, 220, 204, 190, 178, 325, 311, 293, 271, 16, 147, 72, 69, 135, 127, 118, 112, 210, 200, 188, 352, 323, 306, 285, 540, 14, 263, 66, 129, 126, 119, 114, 214, 202, 192, 180, 341, 317, 301, 281, 262, 12, 249, 123, 121, 117, 113, 215, 206, 195, 185, 347, 330, 308, 291, 272, 520, 10, 435, 115, 111, 109, 211, 203, 196, 187, 353, 332, 313, 298, 283, 531, 381, 17, 427, 212, 208, 205, 201, 193, 186, 177, 169, 320, 303, 286, 268, 514, 377, 16, 335, 199, 197, 191, 189, 181, 174, 333, 321, 305, 289, 275, 521, 379, 371, 11, 668, 184, 183, 179, 175, 344, 331, 314, 304, 290, 277, 530, 383, 373, 366, 10, 652, 346, 171, 168, 164, 318, 309, 299, 287, 276, 263, 513, 375, 368, 362, 6, 648, 322, 316, 312, 307, 302, 292, 284, 269, 261, 512, 376, 370, 364, 359, 4, 620, 300, 296, 294, 288, 282, 273, 266, 515, 380, 374, 369, 365, 361, 357, 2, 1033, 280, 278, 274, 267, 264, 259, 382, 378, 372, 367, 363, 360, 358, 356, 0, 43, 20, 19, 17, 15, 13, 11, 9, 7, 6, 4, 7, 5, 3, 1, 3], s.t32HB = [1, 10, 8, 20, 12, 20, 16, 32, 14, 12, 24, 0, 28, 16, 24, 16], s.t33HB = [15, 28, 26, 48, 22, 40, 36, 64, 14, 24, 20, 32, 12, 16, 8, 0], s.t1l = [1, 4, 3, 5], s.t2l = [1, 4, 7, 4, 5, 7, 6, 7, 8], s.t3l = [2, 3, 7, 4, 4, 7, 6, 7, 8], s.t5l = [1, 4, 7, 8, 4, 5, 8, 9, 7, 8, 9, 10, 8, 8, 9, 10], s.t6l = [3, 4, 6, 8, 4, 4, 6, 7, 5, 6, 7, 8, 7, 7, 8, 9], s.t7l = [1, 4, 7, 9, 9, 10, 4, 6, 8, 9, 9, 10, 7, 7, 9, 10, 10, 11, 8, 9, 10, 11, 11, 11, 8, 9, 10, 11, 11, 12, 9, 10, 11, 12, 12, 12], s.t8l = [2, 4, 7, 9, 9, 10, 4, 4, 6, 10, 10, 10, 7, 6, 8, 10, 10, 11, 9, 10, 10, 11, 11, 12, 9, 9, 10, 11, 12, 12, 10, 10, 11, 11, 13, 13], s.t9l = [3, 4, 6, 7, 9, 10, 4, 5, 6, 7, 8, 10, 5, 6, 7, 8, 9, 10, 7, 7, 8, 9, 9, 10, 8, 8, 9, 9, 10, 11, 9, 9, 10, 10, 11, 11], s.t10l = [1, 4, 7, 9, 10, 10, 10, 11, 4, 6, 8, 9, 10, 11, 10, 10, 7, 8, 9, 10, 11, 12, 11, 11, 8, 9, 10, 11, 12, 12, 11, 12, 9, 10, 11, 12, 12, 12, 12, 12, 10, 11, 12, 12, 13, 13, 12, 13, 9, 10, 11, 12, 12, 12, 13, 13, 10, 10, 11, 12, 12, 13, 13, 13], s.t11l = [2, 4, 6, 8, 9, 10, 9, 10, 4, 5, 6, 8, 10, 10, 9, 10, 6, 7, 8, 9, 10, 11, 10, 10, 8, 8, 9, 11, 10, 12, 10, 11, 9, 10, 10, 11, 11, 12, 11, 12, 9, 10, 11, 12, 12, 13, 12, 13, 9, 9, 9, 10, 11, 12, 12, 12, 9, 9, 10, 11, 12, 12, 12, 12], s.t12l = [4, 4, 6, 8, 9, 10, 10, 10, 4, 5, 6, 7, 9, 9, 10, 10, 6, 6, 7, 8, 9, 10, 9, 10, 7, 7, 8, 8, 9, 10, 10, 10, 8, 8, 9, 9, 10, 10, 10, 11, 9, 9, 10, 10, 10, 11, 10, 11, 9, 9, 9, 10, 10, 11, 11, 12, 10, 10, 10, 11, 11, 11, 11, 12], s.t13l = [1, 5, 7, 8, 9, 10, 10, 11, 10, 11, 12, 12, 13, 13, 14, 14, 4, 6, 8, 9, 10, 10, 11, 11, 11, 11, 12, 12, 13, 14, 14, 14, 7, 8, 9, 10, 11, 11, 12, 12, 11, 12, 12, 13, 13, 14, 15, 15, 8, 9, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 15, 15, 9, 9, 11, 11, 12, 12, 13, 13, 12, 13, 13, 14, 14, 15, 15, 16, 10, 10, 11, 12, 12, 12, 13, 13, 13, 13, 14, 13, 15, 15, 16, 16, 10, 11, 12, 12, 13, 13, 13, 13, 13, 14, 14, 14, 15, 15, 16, 16, 11, 11, 12, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 16, 18, 18, 10, 10, 11, 12, 12, 13, 13, 14, 14, 14, 14, 15, 15, 16, 17, 17, 11, 11, 12, 12, 13, 13, 13, 15, 14, 15, 15, 16, 16, 16, 18, 17, 11, 12, 12, 13, 13, 14, 14, 15, 14, 15, 16, 15, 16, 17, 18, 19, 12, 12, 12, 13, 14, 14, 14, 14, 15, 15, 15, 16, 17, 17, 17, 18, 12, 13, 13, 14, 14, 15, 14, 15, 16, 16, 17, 17, 17, 18, 18, 18, 13, 13, 14, 15, 15, 15, 16, 16, 16, 16, 16, 17, 18, 17, 18, 18, 14, 14, 14, 15, 15, 15, 17, 16, 16, 19, 17, 17, 17, 19, 18, 18, 13, 14, 15, 16, 16, 16, 17, 16, 17, 17, 18, 18, 21, 20, 21, 18], s.t15l = [3, 5, 6, 8, 8, 9, 10, 10, 10, 11, 11, 12, 12, 12, 13, 14, 5, 5, 7, 8, 9, 9, 10, 10, 10, 11, 11, 12, 12, 12, 13, 13, 6, 7, 7, 8, 9, 9, 10, 10, 10, 11, 11, 12, 12, 13, 13, 13, 7, 8, 8, 9, 9, 10, 10, 11, 11, 11, 12, 12, 12, 13, 13, 13, 8, 8, 9, 9, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 13, 13, 9, 9, 9, 10, 10, 10, 11, 11, 11, 11, 12, 12, 13, 13, 13, 14, 10, 9, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 13, 14, 14, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 14, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 14, 14, 14, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 13, 14, 15, 14, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 15, 12, 12, 11, 12, 12, 12, 13, 13, 13, 13, 13, 13, 14, 14, 15, 15, 12, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 14, 15, 15, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 14, 15, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15], s.t16_5l = [1, 5, 7, 9, 10, 10, 11, 11, 12, 12, 12, 13, 13, 13, 14, 11, 4, 6, 8, 9, 10, 11, 11, 11, 12, 12, 12, 13, 14, 13, 14, 11, 7, 8, 9, 10, 11, 11, 12, 12, 13, 12, 13, 13, 13, 14, 14, 12, 9, 9, 10, 11, 11, 12, 12, 12, 13, 13, 14, 14, 14, 15, 15, 13, 10, 10, 11, 11, 12, 12, 13, 13, 13, 14, 14, 14, 15, 15, 15, 12, 10, 10, 11, 11, 12, 13, 13, 14, 13, 14, 14, 15, 15, 15, 16, 13, 11, 11, 11, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 16, 13, 11, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 15, 17, 17, 13, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 13, 12, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 15, 16, 15, 14, 12, 13, 12, 13, 14, 14, 14, 14, 15, 16, 16, 16, 17, 17, 16, 13, 13, 13, 13, 13, 14, 14, 15, 16, 16, 16, 16, 16, 16, 15, 16, 14, 13, 14, 14, 14, 14, 15, 15, 15, 15, 17, 16, 16, 16, 16, 18, 14, 15, 14, 14, 14, 15, 15, 16, 16, 16, 18, 17, 17, 17, 19, 17, 14, 14, 15, 13, 14, 16, 16, 15, 16, 16, 17, 18, 17, 19, 17, 16, 14, 11, 11, 11, 12, 12, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 12], s.t16l = [1, 5, 7, 9, 10, 10, 11, 11, 12, 12, 12, 13, 13, 13, 14, 10, 4, 6, 8, 9, 10, 11, 11, 11, 12, 12, 12, 13, 14, 13, 14, 10, 7, 8, 9, 10, 11, 11, 12, 12, 13, 12, 13, 13, 13, 14, 14, 11, 9, 9, 10, 11, 11, 12, 12, 12, 13, 13, 14, 14, 14, 15, 15, 12, 10, 10, 11, 11, 12, 12, 13, 13, 13, 14, 14, 14, 15, 15, 15, 11, 10, 10, 11, 11, 12, 13, 13, 14, 13, 14, 14, 15, 15, 15, 16, 12, 11, 11, 11, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 16, 12, 11, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 15, 17, 17, 12, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 12, 12, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 15, 16, 15, 13, 12, 13, 12, 13, 14, 14, 14, 14, 15, 16, 16, 16, 17, 17, 16, 12, 13, 13, 13, 13, 14, 14, 15, 16, 16, 16, 16, 16, 16, 15, 16, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 17, 16, 16, 16, 16, 18, 13, 15, 14, 14, 14, 15, 15, 16, 16, 16, 18, 17, 17, 17, 19, 17, 13, 14, 15, 13, 14, 16, 16, 15, 16, 16, 17, 18, 17, 19, 17, 16, 13, 10, 10, 10, 11, 11, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 10], s.t24l = [4, 5, 7, 8, 9, 10, 10, 11, 11, 12, 12, 12, 12, 12, 13, 10, 5, 6, 7, 8, 9, 10, 10, 11, 11, 11, 12, 12, 12, 12, 12, 10, 7, 7, 8, 9, 9, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 9, 8, 8, 9, 9, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 12, 12, 12, 12, 13, 9, 10, 9, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 9, 10, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 9, 11, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 10, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 10, 12, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 10, 12, 12, 11, 11, 11, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 10, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 10, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 10, 13, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 6], s.t32l = [1, 5, 5, 7, 5, 8, 7, 9, 5, 7, 7, 9, 7, 9, 9, 10], s.t33l = [4, 5, 5, 6, 5, 6, 6, 7, 5, 6, 6, 7, 6, 7, 7, 8], s.ht = [new t(0, 0, null, null), new t(2, 0, s.t1HB, s.t1l), new t(3, 0, s.t2HB, s.t2l), new t(3, 0, s.t3HB, s.t3l), new t(0, 0, null, null), new t(4, 0, s.t5HB, s.t5l), new t(4, 0, s.t6HB, s.t6l), new t(6, 0, s.t7HB, s.t7l), new t(6, 0, s.t8HB, s.t8l), new t(6, 0, s.t9HB, s.t9l), new t(8, 0, s.t10HB, s.t10l), new t(8, 0, s.t11HB, s.t11l), new t(8, 0, s.t12HB, s.t12l), new t(16, 0, s.t13HB, s.t13l), new t(0, 0, null, s.t16_5l), new t(16, 0, s.t15HB, s.t15l), new t(1, 1, s.t16HB, s.t16l), new t(2, 3, s.t16HB, s.t16l), new t(3, 7, s.t16HB, s.t16l), new t(4, 15, s.t16HB, s.t16l), new t(6, 63, s.t16HB, s.t16l), new t(8, 255, s.t16HB, s.t16l), new t(10, 1023, s.t16HB, s.t16l), new t(13, 8191, s.t16HB, s.t16l), new t(4, 15, s.t24HB, s.t24l), new t(5, 31, s.t24HB, s.t24l), new t(6, 63, s.t24HB, s.t24l), new t(7, 127, s.t24HB, s.t24l), new t(8, 255, s.t24HB, s.t24l), new t(9, 511, s.t24HB, s.t24l), new t(11, 2047, s.t24HB, s.t24l), new t(13, 8191, s.t24HB, s.t24l), new t(0, 0, s.t32HB, s.t32l), new t(0, 0, s.t33HB, s.t33l)], s.largetbl = [65540, 327685, 458759, 589832, 655369, 655370, 720906, 720907, 786443, 786444, 786444, 851980, 851980, 851980, 917517, 655370, 262149, 393222, 524295, 589832, 655369, 720906, 720906, 720907, 786443, 786443, 786444, 851980, 917516, 851980, 917516, 655370, 458759, 524295, 589832, 655369, 720905, 720906, 786442, 786443, 851979, 786443, 851979, 851980, 851980, 917516, 917517, 720905, 589832, 589832, 655369, 720905, 720906, 786442, 786442, 786443, 851979, 851979, 917515, 917516, 917516, 983052, 983052, 786441, 655369, 655369, 720905, 720906, 786442, 786442, 851978, 851979, 851979, 917515, 917516, 917516, 983052, 983052, 983053, 720905, 655370, 655369, 720906, 720906, 786442, 851978, 851979, 917515, 851979, 917515, 917516, 983052, 983052, 983052, 1048588, 786441, 720906, 720906, 720906, 786442, 851978, 851979, 851979, 851979, 917515, 917516, 917516, 917516, 983052, 983052, 1048589, 786441, 720907, 720906, 786442, 786442, 851979, 851979, 851979, 917515, 917516, 983052, 983052, 983052, 983052, 1114125, 1114125, 786442, 720907, 786443, 786443, 851979, 851979, 851979, 917515, 917515, 983051, 983052, 983052, 983052, 1048588, 1048589, 1048589, 786442, 786443, 786443, 786443, 851979, 851979, 917515, 917515, 983052, 983052, 983052, 983052, 1048588, 983053, 1048589, 983053, 851978, 786444, 851979, 786443, 851979, 917515, 917516, 917516, 917516, 983052, 1048588, 1048588, 1048589, 1114125, 1114125, 1048589, 786442, 851980, 851980, 851979, 851979, 917515, 917516, 983052, 1048588, 1048588, 1048588, 1048588, 1048589, 1048589, 983053, 1048589, 851978, 851980, 917516, 917516, 917516, 917516, 983052, 983052, 983052, 983052, 1114124, 1048589, 1048589, 1048589, 1048589, 1179661, 851978, 983052, 917516, 917516, 917516, 983052, 983052, 1048588, 1048588, 1048589, 1179661, 1114125, 1114125, 1114125, 1245197, 1114125, 851978, 917517, 983052, 851980, 917516, 1048588, 1048588, 983052, 1048589, 1048589, 1114125, 1179661, 1114125, 1245197, 1114125, 1048589, 851978, 655369, 655369, 655369, 720905, 720905, 786441, 786441, 786441, 851977, 851977, 851977, 851978, 851978, 851978, 851978, 655366], s.table23 = [65538, 262147, 458759, 262148, 327684, 458759, 393222, 458759, 524296], s.table56 = [65539, 262148, 458758, 524296, 262148, 327684, 524294, 589831, 458757, 524294, 589831, 655368, 524295, 524295, 589832, 655369], s.bitrate_table = [
            [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, -1],
            [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1],
            [0, 8, 16, 24, 32, 40, 48, 56, 64, -1, -1, -1, -1, -1, -1, -1]
        ], s.samplerate_table = [
            [22050, 24e3, 16e3, -1],
            [44100, 48e3, 32e3, -1],
            [11025, 12e3, 8e3, -1]
        ], s.scfsi_band = [0, 6, 11, 16, 21], e.exports = s
    },
    654: function(e, a, t) {
        function s() {
            var e, a;
            this.setModules = function(t, s) {
                e = t, a = s
            }
        }

        function n() {
            var e, a, t;
            this.setModules = function(s, n, r) {
                e = s, a = n, t = r
            }
        }

        function r() {}

        function _() {
            var e, a;
            this.setModules = function(t, s) {
                e = t, a = s
            }
        }

        function i(e, a, t) {
            3 != arguments.length && (console.error("WARN: Mp3Encoder(channels, samplerate, kbps) not specified"), e = 1, a = 44100, t = 128);
            var i = new Lame,
                o = new s,
                l = new GainAnalysis,
                f = new BitStream,
                m = new Presets,
                p = new QuantizePVT,
                v = new Quantize,
                d = new b,
                g = new h,
                S = new _,
                M = new Reservoir,
                w = new Takehiro,
                A = new n,
                R = new r;
            i.setModules(l, f, m, p, v, d, g, S, R), f.setModules(l, R, g, d), S.setModules(f, g), m.setModules(i), v.setModules(f, M, p, w), p.setModules(w, M, i.enc.psy), M.setModules(f), w.setModules(p), d.setModules(i, f, g), o.setModules(A, R), A.setModules(g, S, m);
            var B = i.lame_init();
            B.num_channels = e, B.in_samplerate = a, B.brate = t, B.mode = MPEGMode.STEREO, B.quality = 3, B.bWriteVbrTag = !1, B.disable_reservoir = !0, B.write_id3tag_automatic = !1;
            var y = i.lame_init_params(B);
            u(0 == y);
            var E = 1152,
                T = 0 | 1.25 * E + 7200,
                k = c(T);
            this.encodeBuffer = function(a, t) {
                1 == e && (t = a), u(a.length == t.length), a.length > E && (E = a.length, T = 0 | 1.25 * E + 7200, k = c(T));
                var s = i.lame_encode_buffer(B, a, t, a.length, k, 0, T);
                return new Int8Array(k.subarray(0, s))
            }, this.flush = function() {
                var e = i.lame_encode_flush(B, k, 0, T);
                return new Int8Array(k.subarray(0, e))
            }
        }

        function o() {
            this.dataOffset = 0, this.dataLen = 0, this.channels = 0, this.sampleRate = 0
        }

        function l(e) {
            return e.charCodeAt(0) << 24 | e.charCodeAt(1) << 16 | e.charCodeAt(2) << 8 | e.charCodeAt(3)
        }
        var f = t(498),
            c = (f.System, f.VbrMode, f.Float, f.ShortBlock, f.Util, f.Arrays, f.new_array_n, f.new_byte),
            u = (f.new_double, f.new_float, f.new_float_n, f.new_int, f.new_int_n, f.assert);
        Lame = t(541), Presets = t(533),
            GainAnalysis = t(427), QuantizePVT = t(751), Quantize = t(609), Takehiro = t(411), Reservoir = t(711), MPEGMode = t(396), BitStream = t(200);
        var h = (t(359), t(274)),
            b = t(529);
        o.RIFF = l("RIFF"), o.WAVE = l("WAVE"), o.fmt_ = l("fmt "), o.data = l("data"), o.readHeader = function(e) {
            var a = new o,
                t = e.getUint32(0, !1);
            if (o.RIFF == t) {
                e.getUint32(4, !0);
                if (o.WAVE == e.getUint32(8, !1) && o.fmt_ == e.getUint32(12, !1)) {
                    var s = e.getUint32(16, !0),
                        n = 20;
                    switch (s) {
                        case 16:
                        case 18:
                            a.channels = e.getUint16(n + 2, !0), a.sampleRate = e.getUint32(n + 4, !0);
                            break;
                        default:
                            throw "extended fmt chunk not implemented"
                    }
                    n += s;
                    for (var r = o.data, _ = 0; r != t && (t = e.getUint32(n, !1), _ = e.getUint32(n + 4, !0), r != t);) n += _ + 8;
                    return a.dataLen = _, a.dataOffset = n + 8, a
                }
            }
        }, e.exports.Mp3Encoder = i, e.exports.WavHeader = o
    },
    685: function(e, a, t) {
        function s() {
            this.useAdjust = 0, this.aaSensitivityP = 0, this.adjust = 0, this.adjustLimit = 0, this.decay = 0, this.floor = 0, this.l = r(_.SBMAX_l), this.s = r(_.SBMAX_s), this.psfb21 = r(_.PSFB21), this.psfb12 = r(_.PSFB12), this.cb_l = r(_.CBANDS), this.cb_s = r(_.CBANDS), this.eql_w = r(_.BLKSIZE / 2)
        }
        var n = t(498),
            r = (n.System, n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float),
            _ = (n.new_float_n, n.new_int, n.new_int_n, n.assert, t(359));
        e.exports = s
    },
    711: function(e, a, t) {
        function s() {
            var e;
            this.setModules = function(a) {
                e = a
            }, this.ResvFrameBegin = function(a, t) {
                var s, n = a.internal_flags,
                    _ = n.l3_side,
                    i = e.getframebits(a);
                t.bits = (i - 8 * n.sideinfo_len) / n.mode_gr;
                var o = 2048 * n.mode_gr - 8;
                a.brate > 320 ? s = 8 * int(1e3 * a.brate / (a.out_samplerate / 1152) / 8 + .5) : (s = 11520, a.strict_ISO && (s = 8 * int(32e4 / (a.out_samplerate / 1152) / 8 + .5))), n.ResvMax = s - i, n.ResvMax > o && (n.ResvMax = o), (n.ResvMax < 0 || a.disable_reservoir) && (n.ResvMax = 0);
                var l = t.bits * n.mode_gr + Math.min(n.ResvSize, n.ResvMax);
                return l > s && (l = s), r(0 == n.ResvMax % 8), r(n.ResvMax >= 0), _.resvDrain_pre = 0, null != n.pinfo && (n.pinfo.mean_bits = t.bits / 2, n.pinfo.resvsize = n.ResvSize), l
            }, this.ResvMaxBits = function(e, a, t, s) {
                var n, r = e.internal_flags,
                    _ = r.ResvSize,
                    i = r.ResvMax;
                0 != s && (_ += a), 0 != (1 & r.substep_shaping) && (i *= .9), t.bits = a, 10 * _ > 9 * i ? (n = _ - 9 * i / 10, t.bits += n, r.substep_shaping |= 128) : (n = 0, r.substep_shaping &= 127, e.disable_reservoir || 0 != (1 & r.substep_shaping) || (t.bits -= .1 * a));
                var o = _ < 6 * r.ResvMax / 10 ? _ : 6 * r.ResvMax / 10;
                return o -= n, 0 > o && (o = 0), o
            }, this.ResvAdjust = function(e, a) {
                e.ResvSize -= a.part2_3_length + a.part2_length
            }, this.ResvFrameEnd = function(e, a) {
                var t, s = e.l3_side;
                e.ResvSize += a * e.mode_gr;
                var n = 0;
                s.resvDrain_post = 0, s.resvDrain_pre = 0, 0 != (t = e.ResvSize % 8) && (n += t), t = e.ResvSize - n - e.ResvMax, t > 0 && (r(0 == t % 8), r(t >= 0), n += t);
                var _ = Math.min(8 * s.main_data_begin, n) / 8;
                s.resvDrain_pre += 8 * _, n -= 8 * _, e.ResvSize -= 8 * _, s.main_data_begin -= _, s.resvDrain_post += n, e.ResvSize -= n
            }
        }
        var n = t(498),
            r = n.assert;
        e.exports = s
    },
    726: function(e, a, t) {
        function s() {
            this.last_en_subshort = _([4, 9]), this.lastAttacks = i(4), this.pefirbuf = r(19), this.longfact = r(o.SBMAX_l), this.shortfact = r(o.SBMAX_s), this.attackthre = 0, this.attackthre_s = 0
        }
        var n = t(498),
            r = (n.System, n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float),
            _ = n.new_float_n,
            i = n.new_int,
            o = (n.new_int_n, n.assert, t(359));
        e.exports = s
    },
    751: function(e, a, t) {
        function s() {
            function e(e) {
                return c(0 <= e + s.Q_MAX2 && e < s.Q_MAX), B[e + s.Q_MAX2]
            }

            function a(e, a) {
                var t = v.ATHformula(a, e);
                return t -= A, t = Math.pow(10, t / 10 + e.ATHlower)
            }

            function t(e) {
                for (var t = e.internal_flags.ATH.l, s = e.internal_flags.ATH.psfb21, n = e.internal_flags.ATH.s, r = e.internal_flags.ATH.psfb12, _ = e.internal_flags, o = e.out_samplerate, l = 0; l < u.SBMAX_l; l++) {
                    var f = _.scalefac_band.l[l],
                        c = _.scalefac_band.l[l + 1];
                    t[l] = i.MAX_VALUE;
                    for (var h = f; c > h; h++) {
                        var b = h * o / 1152,
                            m = a(e, b);
                        t[l] = Math.min(t[l], m)
                    }
                }
                for (var l = 0; l < u.PSFB21; l++) {
                    var f = _.scalefac_band.psfb21[l],
                        c = _.scalefac_band.psfb21[l + 1];
                    s[l] = i.MAX_VALUE;
                    for (var h = f; c > h; h++) {
                        var b = h * o / 1152,
                            m = a(e, b);
                        s[l] = Math.min(s[l], m)
                    }
                }
                for (var l = 0; l < u.SBMAX_s; l++) {
                    var f = _.scalefac_band.s[l],
                        c = _.scalefac_band.s[l + 1];
                    n[l] = i.MAX_VALUE;
                    for (var h = f; c > h; h++) {
                        var b = h * o / 384,
                            m = a(e, b);
                        n[l] = Math.min(n[l], m)
                    }
                    n[l] *= _.scalefac_band.s[l + 1] - _.scalefac_band.s[l]
                }
                for (var l = 0; l < u.PSFB12; l++) {
                    var f = _.scalefac_band.psfb12[l],
                        c = _.scalefac_band.psfb12[l + 1];
                    r[l] = i.MAX_VALUE;
                    for (var h = f; c > h; h++) {
                        var b = h * o / 384,
                            m = a(e, b);
                        r[l] = Math.min(r[l], m)
                    }
                    r[l] *= _.scalefac_band.s[13] - _.scalefac_band.s[12]
                }
                if (e.noATH) {
                    for (var l = 0; l < u.SBMAX_l; l++) t[l] = 1e-20;
                    for (var l = 0; l < u.PSFB21; l++) s[l] = 1e-20;
                    for (var l = 0; l < u.SBMAX_s; l++) n[l] = 1e-20;
                    for (var l = 0; l < u.PSFB12; l++) r[l] = 1e-20
                }
                _.ATH.floor = 10 * Math.log10(a(e, -1))
            }

            function r(e) {
                this.s = e
            }
            var m = null,
                p = null,
                v = null;
            this.setModules = function(e, a, t) {
                m = e, p = a, v = t
            }, this.IPOW20 = function(e) {
                return c(e >= 0 && e < s.Q_MAX), y[e]
            };
            var d = 2.220446049250313e-16,
                g = s.IXMAX_VAL,
                S = g + 2,
                M = s.Q_MAX,
                w = s.Q_MAX2,
                A = (s.LARGE_BITS, 100);
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
            var R = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 3, 2, 0];
            this.pretab = R, this.sfBandIndex = [new n([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0, 4, 8, 12, 18, 24, 32, 42, 56, 74, 100, 132, 174, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new n([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 114, 136, 162, 194, 232, 278, 332, 394, 464, 540, 576], [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 136, 180, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new n([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new n([0, 4, 8, 12, 16, 20, 24, 30, 36, 44, 52, 62, 74, 90, 110, 134, 162, 196, 238, 288, 342, 418, 576], [0, 4, 8, 12, 16, 22, 30, 40, 52, 66, 84, 106, 136, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new n([0, 4, 8, 12, 16, 20, 24, 30, 36, 42, 50, 60, 72, 88, 106, 128, 156, 190, 230, 276, 330, 384, 576], [0, 4, 8, 12, 16, 22, 28, 38, 50, 64, 80, 100, 126, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new n([0, 4, 8, 12, 16, 20, 24, 30, 36, 44, 54, 66, 82, 102, 126, 156, 194, 240, 296, 364, 448, 550, 576], [0, 4, 8, 12, 16, 22, 30, 42, 58, 78, 104, 138, 180, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new n([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new n([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new n([0, 12, 24, 36, 48, 60, 72, 88, 108, 132, 160, 192, 232, 280, 336, 400, 476, 566, 568, 570, 572, 574, 576], [0, 8, 16, 24, 36, 52, 72, 96, 124, 160, 162, 164, 166, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0])];
            var B = l(M + w + 1),
                y = l(M),
                E = l(S),
                T = l(S);
            this.adj43 = T, this.iteration_init = function(e) {
                var a, s = e.internal_flags,
                    n = s.l3_side;
                if (0 == s.iteration_init_init) {
                    for (s.iteration_init_init = 1, n.main_data_begin = 0, t(e), E[0] = 0, a = 1; S > a; a++) E[a] = Math.pow(a, 4 / 3);
                    for (a = 0; S - 1 > a; a++) T[a] = a + 1 - Math.pow(.5 * (E[a] + E[a + 1]), .75);
                    for (T[a] = .5, a = 0; M > a; a++) y[a] = Math.pow(2, (a - 210) * -.1875);
                    for (a = 0; M + w >= a; a++) B[a] = Math.pow(2, .25 * (a - 210 - w));
                    m.huffman_init(s);
                    var r, _, i, o;
                    for (a = e.exp_nspsytune >> 2 & 63, a >= 32 && (a -= 64), r = Math.pow(10, a / 4 / 10), a = e.exp_nspsytune >> 8 & 63, a >= 32 && (a -= 64), _ = Math.pow(10, a / 4 / 10), a = e.exp_nspsytune >> 14 & 63, a >= 32 && (a -= 64), i = Math.pow(10, a / 4 / 10), a = e.exp_nspsytune >> 20 & 63, a >= 32 && (a -= 64), o = i * Math.pow(10, a / 4 / 10), a = 0; a < u.SBMAX_l; a++) {
                        var l;
                        l = 6 >= a ? r : 13 >= a ? _ : 20 >= a ? i : o, s.nsPsy.longfact[a] = l
                    }
                    for (a = 0; a < u.SBMAX_s; a++) {
                        var l;
                        l = 5 >= a ? r : 10 >= a ? _ : 11 >= a ? i : o, s.nsPsy.shortfact[a] = l
                    }
                }
            }, this.on_pe = function(e, a, t, s, n, r) {
                var _, i, o = e.internal_flags,
                    l = 0,
                    u = f(2),
                    m = new h(l),
                    v = p.ResvMaxBits(e, s, m, r);
                l = m.bits;
                var d = l + v;
                for (d > b.MAX_BITS_PER_GRANULE && (d = b.MAX_BITS_PER_GRANULE), _ = 0, i = 0; i < o.channels_out; ++i) t[i] = Math.min(b.MAX_BITS_PER_CHANNEL, l / o.channels_out), u[i] = 0 | t[i] * a[n][i] / 700 - t[i], u[i] > 3 * s / 4 && (u[i] = 3 * s / 4), u[i] < 0 && (u[i] = 0), u[i] + t[i] > b.MAX_BITS_PER_CHANNEL && (u[i] = Math.max(0, b.MAX_BITS_PER_CHANNEL - t[i])), _ += u[i];
                if (_ > v)
                    for (i = 0; i < o.channels_out; ++i) u[i] = v * u[i] / _;
                for (i = 0; i < o.channels_out; ++i) t[i] += u[i], v -= u[i];
                for (_ = 0, i = 0; i < o.channels_out; ++i) _ += t[i];
                if (_ > b.MAX_BITS_PER_GRANULE) {
                    var g = 0;
                    for (i = 0; i < o.channels_out; ++i) t[i] *= b.MAX_BITS_PER_GRANULE, t[i] /= _, g += t[i];
                    c(g <= b.MAX_BITS_PER_GRANULE)
                }
                return d
            }, this.reduce_side = function(e, a, t, s) {
                c(s <= b.MAX_BITS_PER_GRANULE), c(e[0] + e[1] <= b.MAX_BITS_PER_GRANULE);
                var n = .33 * (.5 - a) / .5;
                0 > n && (n = 0), n > .5 && (n = .5);
                var r = 0 | .5 * n * (e[0] + e[1]);
                r > b.MAX_BITS_PER_CHANNEL - e[0] && (r = b.MAX_BITS_PER_CHANNEL - e[0]), 0 > r && (r = 0), e[1] >= 125 && (e[1] - r > 125 ? (e[0] < t && (e[0] += r), e[1] -= r) : (e[0] += e[1] - 125, e[1] = 125)), r = e[0] + e[1], r > s && (e[0] = s * e[0] / r, e[1] = s * e[1] / r), c(e[0] <= b.MAX_BITS_PER_CHANNEL), c(e[1] <= b.MAX_BITS_PER_CHANNEL), c(e[0] + e[1] <= b.MAX_BITS_PER_GRANULE)
            }, this.athAdjust = function(e, a, t) {
                var s = 90.30873362,
                    n = 94.82444863,
                    r = o.FAST_LOG10_X(a, 10),
                    _ = e * e,
                    i = 0;
                return r -= t, _ > 1e-20 && (i = 1 + o.FAST_LOG10_X(_, 10 / s)), 0 > i && (i = 0), r *= i, r += t + s - n, Math.pow(10, .1 * r)
            }, this.calc_xmin = function(e, a, t, s) {
                var n, r = 0,
                    i = e.internal_flags,
                    o = 0,
                    l = 0,
                    f = i.ATH,
                    c = t.xr,
                    h = e.VBR == _.vbr_mtrh ? 1 : 0,
                    b = i.masking_lower;
                for ((e.VBR == _.vbr_mtrh || e.VBR == _.vbr_mt) && (b = 1), n = 0; n < t.psy_lmax; n++) {
                    var m, p, v, g, S, M;
                    p = e.VBR == _.vbr_rh || e.VBR == _.vbr_mtrh ? athAdjust(f.adjust, f.l[n], f.floor) : f.adjust * f.l[n], S = t.width[n], v = p / S, g = d, M = S >> 1, m = 0;
                    do {
                        var w, A;
                        w = c[o] * c[o], m += w, g += v > w ? w : v, o++, A = c[o] * c[o], m += A, g += v > A ? A : v, o++
                    } while (--M > 0);
                    if (m > p && l++, n == u.SBPSY_l) {
                        var R = p * i.nsPsy.longfact[n];
                        R > g && (g = R)
                    }
                    if (0 != h && (p = g), !e.ATHonly) {
                        var B = a.en.l[n];
                        if (B > 0) {
                            var R;
                            R = m * a.thm.l[n] * b / B, 0 != h && (R *= i.nsPsy.longfact[n]), R > p && (p = R)
                        }
                    }
                    0 != h ? s[r++] = p : s[r++] = p * i.nsPsy.longfact[n]
                }
                var y = 575;
                if (t.block_type != u.SHORT_TYPE)
                    for (var E = 576; 0 != E-- && BitStream.EQ(c[E], 0);) y = E;
                t.max_nonzero_coeff = y;
                for (var T = t.sfb_smin; n < t.psymax; T++, n += 3) {
                    var S, k, x;
                    for (x = e.VBR == _.vbr_rh || e.VBR == _.vbr_mtrh ? athAdjust(f.adjust, f.s[T], f.floor) : f.adjust * f.s[T], S = t.width[n], k = 0; 3 > k; k++) {
                        var p, v, g, m = 0,
                            M = S >> 1;
                        v = x / S, g = d;
                        do {
                            var w, A;
                            w = c[o] * c[o], m += w, g += v > w ? w : v, o++, A = c[o] * c[o], m += A, g += v > A ? A : v, o++
                        } while (--M > 0);
                        if (m > x && l++, T == u.SBPSY_s) {
                            var R = x * i.nsPsy.shortfact[T];
                            R > g && (g = R)
                        }
                        if (p = 0 != h ? g : x, !e.ATHonly && !e.ATHshort) {
                            var B = a.en.s[T][k];
                            if (B > 0) {
                                var R;
                                R = m * a.thm.s[T][k] * b / B, 0 != h && (R *= i.nsPsy.shortfact[T]), R > p && (p = R)
                            }
                        }
                        0 != h ? s[r++] = p : s[r++] = p * i.nsPsy.shortfact[T]
                    }
                    e.useTemporal && (s[r - 3] > s[r - 3 + 1] && (s[r - 3 + 1] += (s[r - 3] - s[r - 3 + 1]) * i.decay), s[r - 3 + 1] > s[r - 3 + 2] && (s[r - 3 + 2] += (s[r - 3 + 1] - s[r - 3 + 2]) * i.decay))
                }
                return l
            }, this.calc_noise_core = function(e, a, t, s) {
                var n = 0,
                    r = a.s,
                    _ = e.l3_enc;
                if (r > e.count1)
                    for (; 0 != t--;) {
                        var i;
                        i = e.xr[r], r++, n += i * i, i = e.xr[r], r++, n += i * i
                    } else if (r > e.big_values) {
                        var o = l(2);
                        for (o[0] = 0, o[1] = s; 0 != t--;) {
                            var i;
                            i = Math.abs(e.xr[r]) - o[_[r]], r++, n += i * i, i = Math.abs(e.xr[r]) - o[_[r]], r++, n += i * i
                        }
                    } else
                        for (; 0 != t--;) {
                            var i;
                            i = Math.abs(e.xr[r]) - E[_[r]] * s, r++, n += i * i, i = Math.abs(e.xr[r]) - E[_[r]] * s, r++, n += i * i
                        }
                return a.s = r, n
            }, this.calc_noise = function(a, t, s, n, _) {
                var i, l, f = 0,
                    c = 0,
                    u = 0,
                    h = 0,
                    b = 0,
                    m = -20,
                    p = 0,
                    v = a.scalefac,
                    d = 0;
                for (n.over_SSD = 0, i = 0; i < a.psymax; i++) {
                    var g = a.global_gain - (v[d++] + (0 != a.preflag ? R[i] : 0) << a.scalefac_scale + 1) - 8 * a.subblock_gain[a.window[i]],
                        S = 0;
                    if (null != _ && _.step[i] == g) S = _.noise[i], p += a.width[i], s[f++] = S / t[c++], S = _.noise_log[i];
                    else {
                        var M = e(g);
                        if (l = a.width[i] >> 1, p + a.width[i] > a.max_nonzero_coeff) {
                            var w;
                            w = a.max_nonzero_coeff - p + 1, l = w > 0 ? w >> 1 : 0
                        }
                        var A = new r(p);
                        S = this.calc_noise_core(a, A, l, M), p = A.s, null != _ && (_.step[i] = g, _.noise[i] = S), S = s[f++] = S / t[c++], S = o.FAST_LOG10(Math.max(S, 1e-20)), null != _ && (_.noise_log[i] = S)
                    }
                    if (null != _ && (_.global_gain = a.global_gain), b += S, S > 0) {
                        var B;
                        B = Math.max(0 | 10 * S + .5, 1), n.over_SSD += B * B, u++, h += S
                    }
                    m = Math.max(m, S)
                }
                return n.over_count = u, n.tot_noise = b, n.over_noise = h, n.max_noise = m, u
            }, this.set_pinfo = function(e, a, t, s, n) {
                var r, _, i, o, f, h = e.internal_flags,
                    b = 0 == a.scalefac_scale ? .5 : 1,
                    m = a.scalefac,
                    p = l(L3Side.SFBMAX),
                    v = l(L3Side.SFBMAX),
                    d = new CalcNoiseResult;
                calc_xmin(e, t, a, p), calc_noise(a, p, v, d, null);
                var g = 0;
                for (_ = a.sfb_lmax, a.block_type != u.SHORT_TYPE && 0 == a.mixed_block_flag && (_ = 22), r = 0; _ > r; r++) {
                    var S = h.scalefac_band.l[r],
                        M = h.scalefac_band.l[r + 1],
                        w = M - S;
                    for (o = 0; M > g; g++) o += a.xr[g] * a.xr[g];
                    o /= w, f = 1e15, h.pinfo.en[s][n][r] = f * o, h.pinfo.xfsf[s][n][r] = f * p[r] * v[r] / w, t.en.l[r] > 0 && !e.ATHonly ? o /= t.en.l[r] : o = 0, h.pinfo.thr[s][n][r] = f * Math.max(o * t.thm.l[r], h.ATH.l[r]), h.pinfo.LAMEsfb[s][n][r] = 0, 0 != a.preflag && r >= 11 && (h.pinfo.LAMEsfb[s][n][r] = -b * R[r]), r < u.SBPSY_l && (c(m[r] >= 0), h.pinfo.LAMEsfb[s][n][r] -= b * m[r])
                }
                if (a.block_type == u.SHORT_TYPE)
                    for (_ = r, r = a.sfb_smin; r < u.SBMAX_s; r++)
                        for (var S = h.scalefac_band.s[r], M = h.scalefac_band.s[r + 1], w = M - S, A = 0; 3 > A; A++) {
                            for (o = 0, i = S; M > i; i++) o += a.xr[g] * a.xr[g], g++;
                            o = Math.max(o / w, 1e-20), f = 1e15, h.pinfo.en_s[s][n][3 * r + A] = f * o, h.pinfo.xfsf_s[s][n][3 * r + A] = f * p[_] * v[_] / w, t.en.s[r][A] > 0 ? o /= t.en.s[r][A] : o = 0, (e.ATHonly || e.ATHshort) && (o = 0), h.pinfo.thr_s[s][n][3 * r + A] = f * Math.max(o * t.thm.s[r][A], h.ATH.s[r]), h.pinfo.LAMEsfb_s[s][n][3 * r + A] = -2 * a.subblock_gain[A], r < u.SBPSY_s && (h.pinfo.LAMEsfb_s[s][n][3 * r + A] -= b * m[_]), _++
                        }
                h.pinfo.LAMEqss[s][n] = a.global_gain, h.pinfo.LAMEmainbits[s][n] = a.part2_3_length + a.part2_length, h.pinfo.LAMEsfbits[s][n] = a.part2_length, h.pinfo.over[s][n] = d.over_count, h.pinfo.max_noise[s][n] = 10 * d.max_noise, h.pinfo.over_noise[s][n] = 10 * d.over_noise, h.pinfo.tot_noise[s][n] = 10 * d.tot_noise, h.pinfo.over_SSD[s][n] = d.over_SSD
            }
        }
        var n = t(419),
            r = t(498),
            _ = (r.System, r.VbrMode),
            i = r.Float,
            o = (r.ShortBlock, r.Util),
            l = (r.Arrays, r.new_array_n, r.new_byte, r.new_double, r.new_float),
            f = (r.new_float_n, r.new_int),
            c = (r.new_int_n, r.assert),
            u = t(359),
            h = t(464),
            b = t(484);
        s.Q_MAX = 257, s.Q_MAX2 = 116, s.LARGE_BITS = 1e5, s.IXMAX_VAL = 8206, e.exports = s
    },
    770: function(e, a, t) {
        function s() {
            function e(e) {
                return e
            }

            function a(e, a) {
                for (var t = 0, s = 0; s < m.BLKSIZE / 2; ++s) t += e[s] * a.ATH.eql_w[s];
                return t *= re
            }

            function t(t, s, n, r, _, i, l, f, c, u, h) {
                var b = t.internal_flags;
                if (2 > c) J.fft_long(b, r[_], c, u, h), J.fft_short(b, i[l], c, u, h);
                else if (2 == c) {
                    for (var p = m.BLKSIZE - 1; p >= 0; --p) {
                        var v = r[_ + 0][p],
                            d = r[_ + 1][p];
                        r[_ + 0][p] = (v + d) * o.SQRT2 * .5, r[_ + 1][p] = (v - d) * o.SQRT2 * .5
                    }
                    for (var g = 2; g >= 0; --g)
                        for (var p = m.BLKSIZE_s - 1; p >= 0; --p) {
                            var v = i[l + 0][g][p],
                                d = i[l + 1][g][p];
                            i[l + 0][g][p] = (v + d) * o.SQRT2 * .5, i[l + 1][g][p] = (v - d) * o.SQRT2 * .5
                        }
                }
                s[0] = e(r[_ + 0][0]), s[0] *= s[0];
                for (var p = m.BLKSIZE / 2 - 1; p >= 0; --p) {
                    var S = r[_ + 0][m.BLKSIZE / 2 - p],
                        M = r[_ + 0][m.BLKSIZE / 2 + p];
                    s[m.BLKSIZE / 2 - p] = e(.5 * (S * S + M * M))
                }
                for (var g = 2; g >= 0; --g) {
                    n[g][0] = i[l + 0][g][0], n[g][0] *= n[g][0];
                    for (var p = m.BLKSIZE_s / 2 - 1; p >= 0; --p) {
                        var S = i[l + 0][g][m.BLKSIZE_s / 2 - p],
                            M = i[l + 0][g][m.BLKSIZE_s / 2 + p];
                        n[g][m.BLKSIZE_s / 2 - p] = e(.5 * (S * S + M * M))
                    }
                }
                for (var w = 0, p = 11; p < m.HBLKSIZE; p++) w += s[p];
                if (b.tot_ener[c] = w, t.analysis) {
                    for (var p = 0; p < m.HBLKSIZE; p++) b.pinfo.energy[f][c][p] = b.pinfo.energy_save[c][p], b.pinfo.energy_save[c][p] = s[p];
                    b.pinfo.pe[f][c] = b.pe[c]
                }
                2 == t.athaa_loudapprox && 2 > c && (b.loudness_sq[f][c] = b.loudness_sq_save[c], b.loudness_sq_save[c] = a(s, b))
            }

            function s() {
                Z = Math.pow(10, (he + 1) / 16), Q = Math.pow(10, (be + 1) / 16), W = Math.pow(10, me / 10)
            }

            function n(e, a, t, s, n, r) {
                var _;
                if (a > e) {
                    if (!(e * Q > a)) return e + a;
                    _ = a / e
                } else {
                    if (e >= a * Q) return e + a;
                    _ = e / a
                }
                if (h(e >= 0), h(a >= 0), e += a, 6 >= s + 3) {
                    if (_ >= Z) return e;
                    var i = 0 | o.FAST_LOG10_X(_, 16);
                    return e * de[i]
                }
                var i = 0 | o.FAST_LOG10_X(_, 16);
                if (a = 0 != r ? n.ATH.cb_s[t] * n.ATH.adjust : n.ATH.cb_l[t] * n.ATH.adjust, h(a >= 0), W * a > e) {
                    if (e > a) {
                        var l, f;
                        return l = 1, 13 >= i && (l = ge[i]), f = o.FAST_LOG10_X(e / a, 10 / 15), e * ((ve[i] - l) * f + l)
                    }
                    return i > 13 ? e : e * ge[i]
                }
                return e * ve[i]
            }

            function p(e, a, t) {
                var s;
                if (0 > e && (e = 0), 0 > a && (a = 0), 0 >= e) return a;
                if (0 >= a) return e;
                if (s = a > e ? a / e : e / a, t >= -2 && 2 >= t) {
                    if (s >= Z) return e + a;
                    var n = 0 | o.FAST_LOG10_X(s, 16);
                    return (e + a) * Se[n]
                }
                return Q > s ? e + a : (a > e && (e = a), e)
            }

            function v(e, a) {
                var t = e.internal_flags;
                if (t.channels_out > 1) {
                    for (var s = 0; s < m.SBMAX_l; s++) {
                        var n = t.thm[0].l[s],
                            r = t.thm[1].l[s];
                        t.thm[0].l[s] += r * a, t.thm[1].l[s] += n * a
                    }
                    for (var s = 0; s < m.SBMAX_s; s++)
                        for (var _ = 0; 3 > _; _++) {
                            var n = t.thm[0].s[s][_],
                                r = t.thm[1].s[s][_];
                            t.thm[0].s[s][_] += r * a, t.thm[1].s[s][_] += n * a
                        }
                }
            }

            function d(e) {
                for (var a = 0; a < m.SBMAX_l; a++)
                    if (!(e.thm[0].l[a] > 1.58 * e.thm[1].l[a] || e.thm[1].l[a] > 1.58 * e.thm[0].l[a])) {
                        var t = e.mld_l[a] * e.en[3].l[a],
                            s = Math.max(e.thm[2].l[a], Math.min(e.thm[3].l[a], t));
                        t = e.mld_l[a] * e.en[2].l[a];
                        var n = Math.max(e.thm[3].l[a], Math.min(e.thm[2].l[a], t));
                        e.thm[2].l[a] = s, e.thm[3].l[a] = n
                    }
                for (var a = 0; a < m.SBMAX_s; a++)
                    for (var r = 0; 3 > r; r++)
                        if (!(e.thm[0].s[a][r] > 1.58 * e.thm[1].s[a][r] || e.thm[1].s[a][r] > 1.58 * e.thm[0].s[a][r])) {
                            var t = e.mld_s[a] * e.en[3].s[a][r],
                                s = Math.max(e.thm[2].s[a][r], Math.min(e.thm[3].s[a][r], t));
                            t = e.mld_s[a] * e.en[2].s[a][r];
                            var n = Math.max(e.thm[3].s[a][r], Math.min(e.thm[2].s[a][r], t));
                            e.thm[2].s[a][r] = s, e.thm[3].s[a][r] = n
                        }
            }

            function g(e, a, t) {
                var s = a,
                    n = Math.pow(10, t);
                a *= 2, s *= 2;
                for (var r = 0; r < m.SBMAX_l; r++) {
                    var _, i, o, l;
                    if (l = e.ATH.cb_l[e.bm_l[r]] * n, _ = Math.min(Math.max(e.thm[0].l[r], l), Math.max(e.thm[1].l[r], l)), i = Math.max(e.thm[2].l[r], l), o = Math.max(e.thm[3].l[r], l), i + o > _ * a) {
                        var f = _ * s / (i + o);
                        i *= f, o *= f, h(i + o > 0)
                    }
                    e.thm[2].l[r] = Math.min(i, e.thm[2].l[r]), e.thm[3].l[r] = Math.min(o, e.thm[3].l[r])
                }
                n *= m.BLKSIZE_s / m.BLKSIZE;
                for (var r = 0; r < m.SBMAX_s; r++)
                    for (var c = 0; 3 > c; c++) {
                        var _, i, o, l;
                        if (l = e.ATH.cb_s[e.bm_s[r]] * n, _ = Math.min(Math.max(e.thm[0].s[r][c], l), Math.max(e.thm[1].s[r][c], l)), i = Math.max(e.thm[2].s[r][c], l), o = Math.max(e.thm[3].s[r][c], l), i + o > _ * a) {
                            var f = _ * a / (i + o);
                            i *= f, o *= f, h(i + o > 0)
                        }
                        e.thm[2].s[r][c] = Math.min(e.thm[2].s[r][c], i), e.thm[3].s[r][c] = Math.min(e.thm[3].s[r][c], o)
                    }
            }

            function S(e, a, t, s, n) {
                var r, _, i = 0,
                    o = 0;
                for (r = _ = 0; r < m.SBMAX_s; ++_, ++r) {
                    for (var l = e.bo_s[r], f = e.npart_s, c = f > l ? l : f; c > _;) h(a[_] >= 0), h(t[_] >= 0), i += a[_], o += t[_], _++;
                    if (e.en[s].s[r][n] = i, e.thm[s].s[r][n] = o, _ >= f) {
                        ++r;
                        break
                    }
                    h(a[_] >= 0), h(t[_] >= 0);
                    var u = e.PSY.bo_s_weight[r],
                        b = 1 - u;
                    i = u * a[_], o = u * t[_], e.en[s].s[r][n] += i, e.thm[s].s[r][n] += o, i = b * a[_], o = b * t[_]
                }
                for (; r < m.SBMAX_s; ++r) e.en[s].s[r][n] = 0, e.thm[s].s[r][n] = 0
            }

            function M(e, a, t, s) {
                var n, r, _ = 0,
                    i = 0;
                for (n = r = 0; n < m.SBMAX_l; ++r, ++n) {
                    for (var o = e.bo_l[n], l = e.npart_l, f = l > o ? o : l; f > r;) h(a[r] >= 0), h(t[r] >= 0), _ += a[r], i += t[r], r++;
                    if (e.en[s].l[n] = _, e.thm[s].l[n] = i, r >= l) {
                        ++n;
                        break
                    }
                    h(a[r] >= 0), h(t[r] >= 0);
                    var c = e.PSY.bo_l_weight[n],
                        u = 1 - c;
                    _ = c * a[r], i = c * t[r], e.en[s].l[n] += _, e.thm[s].l[n] += i, _ = u * a[r], i = u * t[r]
                }
                for (; n < m.SBMAX_l; ++n) e.en[s].l[n] = 0, e.thm[s].l[n] = 0
            }

            function w(e, a, t, s, n, r) {
                var _, i, o = e.internal_flags;
                for (i = _ = 0; i < o.npart_s; ++i) {
                    for (var l = 0, f = 0, c = o.numlines_s[i], u = 0; c > u; ++u, ++_) {
                        var b = a[r][_];
                        l += b, b > f && (f = b)
                    }
                    t[i] = l
                }
                for (h(i == o.npart_s), h(129 == _), _ = i = 0; i < o.npart_s; i++) {
                    var p = o.s3ind_s[i][0],
                        v = o.s3_ss[_++] * t[p];
                    for (++p; p <= o.s3ind_s[i][1];) v += o.s3_ss[_] * t[p], ++_, ++p;
                    var d = te * o.nb_s1[n][i];
                    if (s[i] = Math.min(v, d), o.blocktype_old[1 & n] == m.SHORT_TYPE) {
                        var d = se * o.nb_s2[n][i],
                            g = s[i];
                        s[i] = Math.min(d, g)
                    }
                    o.nb_s2[n][i] = o.nb_s1[n][i], o.nb_s1[n][i] = v, h(s[i] >= 0)
                }
                for (; i <= m.CBANDS; ++i) t[i] = 0, s[i] = 0
            }

            function A(e, a, t, s) {
                var n = e.internal_flags;
                e.short_blocks != i.short_block_coupled || 0 != a[0] && 0 != a[1] || (a[0] = a[1] = 0);
                for (var r = 0; r < n.channels_out; r++) s[r] = m.NORM_TYPE, e.short_blocks == i.short_block_dispensed && (a[r] = 1), e.short_blocks == i.short_block_forced && (a[r] = 0), 0 != a[r] ? (h(n.blocktype_old[r] != m.START_TYPE), n.blocktype_old[r] == m.SHORT_TYPE && (s[r] = m.STOP_TYPE)) : (s[r] = m.SHORT_TYPE, n.blocktype_old[r] == m.NORM_TYPE && (n.blocktype_old[r] = m.START_TYPE), n.blocktype_old[r] == m.STOP_TYPE && (n.blocktype_old[r] = m.SHORT_TYPE)), t[r] = n.blocktype_old[r], n.blocktype_old[r] = s[r]
            }

            function R(e, a, t) {
                return t >= 1 ? e : 0 >= t ? a : a > 0 ? Math.pow(e / a, t) * a : 0
            }

            function B(e, a) {
                for (var t = 309.07, s = 0; s < m.SBMAX_s - 1; s++)
                    for (var n = 0; 3 > n; n++) {
                        var r = e.thm.s[s][n];
                        if (h(s < Me.length), r > 0) {
                            var _ = r * a,
                                i = e.en.s[s][n];
                            i > _ && (i > 1e10 * _ ? t += Me[s] * (10 * $) : (h(_ > 0), t += Me[s] * o.FAST_LOG10(i / _)))
                        }
                    }
                return t
            }

            function y(e, a) {
                for (var t = 281.0575, s = 0; s < m.SBMAX_l - 1; s++) {
                    var n = e.thm.l[s];
                    if (h(s < we.length), n > 0) {
                        var r = n * a,
                            _ = e.en.l[s];
                        _ > r && (_ > 1e10 * r ? t += we[s] * (10 * $) : (h(r > 0), t += we[s] * o.FAST_LOG10(_ / r)))
                    }
                }
                return t
            }

            function E(e, a, t, s, n) {
                var r, _;
                for (r = _ = 0; r < e.npart_l; ++r) {
                    var i, o = 0,
                        l = 0;
                    for (i = 0; i < e.numlines_l[r]; ++i, ++_) {
                        var f = a[_];
                        h(f >= 0), o += f, f > l && (l = f)
                    }
                    t[r] = o, s[r] = l, n[r] = o * e.rnumlines_l[r], h(e.rnumlines_l[r] >= 0), h(o >= 0), h(t[r] >= 0), h(s[r] >= 0), h(n[r] >= 0)
                }
            }

            function T(e, a, t, s) {
                var n = pe.length - 1,
                    r = 0,
                    _ = t[r] + t[r + 1];
                if (h(_ >= 0), _ > 0) {
                    var i = a[r];
                    i < a[r + 1] && (i = a[r + 1]), h(e.numlines_l[r] + e.numlines_l[r + 1] - 1 > 0), _ = 20 * (2 * i - _) / (_ * (e.numlines_l[r] + e.numlines_l[r + 1] - 1));
                    var o = 0 | _;
                    o > n && (o = n), s[r] = o
                } else s[r] = 0;
                for (r = 1; r < e.npart_l - 1; r++)
                    if (_ = t[r - 1] + t[r] + t[r + 1], h(_ >= 0), _ > 0) {
                        var i = a[r - 1];
                        i < a[r] && (i = a[r]), i < a[r + 1] && (i = a[r + 1]), h(e.numlines_l[r - 1] + e.numlines_l[r] + e.numlines_l[r + 1] - 1 > 0), _ = 20 * (3 * i - _) / (_ * (e.numlines_l[r - 1] + e.numlines_l[r] + e.numlines_l[r + 1] - 1));
                        var o = 0 | _;
                        o > n && (o = n), s[r] = o
                    } else s[r] = 0;
                if (h(r > 0), h(r == e.npart_l - 1), _ = t[r - 1] + t[r], h(_ >= 0), _ > 0) {
                    var i = a[r - 1];
                    i < a[r] && (i = a[r]), h(e.numlines_l[r - 1] + e.numlines_l[r] - 1 > 0), _ = 20 * (2 * i - _) / (_ * (e.numlines_l[r - 1] + e.numlines_l[r] - 1));
                    var o = 0 | _;
                    o > n && (o = n), s[r] = o
                } else s[r] = 0;
                h(r == e.npart_l - 1)
            }

            function k(a, t, s, n, r, _, i, l) {
                var f = a.internal_flags;
                if (2 > n) J.fft_long(f, i[l], n, t, s);
                else if (2 == n)
                    for (var c = m.BLKSIZE - 1; c >= 0; --c) {
                        var u = i[l + 0][c],
                            h = i[l + 1][c];
                        i[l + 0][c] = (u + h) * o.SQRT2 * .5, i[l + 1][c] = (u - h) * o.SQRT2 * .5
                    }
                _[0] = e(i[l + 0][0]), _[0] *= _[0];
                for (var c = m.BLKSIZE / 2 - 1; c >= 0; --c) {
                    var b = i[l + 0][m.BLKSIZE / 2 - c],
                        p = i[l + 0][m.BLKSIZE / 2 + c];
                    _[m.BLKSIZE / 2 - c] = e(.5 * (b * b + p * p))
                }
                for (var v = 0, c = 11; c < m.HBLKSIZE; c++) v += _[c];
                if (f.tot_ener[n] = v, a.analysis) {
                    for (var c = 0; c < m.HBLKSIZE; c++) f.pinfo.energy[r][n][c] = f.pinfo.energy_save[n][c], f.pinfo.energy_save[n][c] = _[c];
                    f.pinfo.pe[r][n] = f.pe[n]
                }
            }

            function x(a, t, s, n, r, _, i, l) {
                var f = a.internal_flags;
                if (0 == r && 2 > n && J.fft_short(f, i[l], n, t, s), 2 == n)
                    for (var c = m.BLKSIZE_s - 1; c >= 0; --c) {
                        var u = i[l + 0][r][c],
                            h = i[l + 1][r][c];
                        i[l + 0][r][c] = (u + h) * o.SQRT2 * .5, i[l + 1][r][c] = (u - h) * o.SQRT2 * .5
                    }
                _[r][0] = i[l + 0][r][0], _[r][0] *= _[r][0];
                for (var c = m.BLKSIZE_s / 2 - 1; c >= 0; --c) {
                    var b = i[l + 0][r][m.BLKSIZE_s / 2 - c],
                        p = i[l + 0][r][m.BLKSIZE_s / 2 + c];
                    _[r][m.BLKSIZE_s / 2 - c] = e(.5 * (b * b + p * p))
                }
            }

            function P(e, t, s, n) {
                var r = e.internal_flags;
                2 == e.athaa_loudapprox && 2 > s && (r.loudness_sq[t][s] = r.loudness_sq_save[s], r.loudness_sq_save[s] = a(n, r))
            }

            function I(e, a, t, s, n, r, _, i, o, l) {
                for (var u = c([2, 576]), b = e.internal_flags, m = b.channels_out, p = e.mode == MPEGMode.JOINT_STEREO ? 4 : m, v = 0; m > v; v++) {
                    firbuf = a[v];
                    var d = t + 576 - 350 - ce + 192;
                    h(Re.length == (ce - 1) / 2);
                    for (var g = 0; 576 > g; g++) {
                        var S, M;
                        S = firbuf[d + g + 10], M = 0;
                        for (var w = 0;
                            (ce - 1) / 2 - 1 > w; w += 2) S += Re[w] * (firbuf[d + g + w] + firbuf[d + g + ce - w]), M += Re[w + 1] * (firbuf[d + g + w + 1] + firbuf[d + g + ce - w - 1]);
                        u[v][g] = S + M
                    }
                    n[s][v].en.assign(b.en[v]), n[s][v].thm.assign(b.thm[v]), p > 2 && (r[s][v].en.assign(b.en[v + 2]), r[s][v].thm.assign(b.thm[v + 2]))
                }
                for (var v = 0; p > v; v++) {
                    var A = f(12),
                        R = f(12),
                        B = [0, 0, 0, 0],
                        y = u[1 & v],
                        E = 0,
                        T = 3 == v ? b.nsPsy.attackthre_s : b.nsPsy.attackthre,
                        k = 1;
                    if (2 == v)
                        for (var g = 0, w = 576; w > 0; ++g, --w) {
                            var x = u[0][g],
                                P = u[1][g];
                            u[0][g] = x + P, u[1][g] = x - P
                        }
                    for (var g = 0; 3 > g; g++) R[g] = b.nsPsy.last_en_subshort[v][g + 6], h(b.nsPsy.last_en_subshort[v][g + 4] > 0), A[g] = R[g] / b.nsPsy.last_en_subshort[v][g + 4], B[0] += R[g];
                    for (var g = 0; 9 > g; g++) {
                        for (var I = E + 64, L = 1; I > E; E++) L < Math.abs(y[E]) && (L = Math.abs(y[E]));
                        b.nsPsy.last_en_subshort[v][g] = R[g + 3] = L, B[1 + g / 3] += L, L > R[g + 3 - 2] ? (h(R[g + 3 - 2] > 0), L /= R[g + 3 - 2]) : R[g + 3 - 2] > 10 * L ? (h(L > 0), L = R[g + 3 - 2] / (10 * L)) : L = 0, A[g + 3] = L
                    }
                    for (var g = 0; 3 > g; ++g) {
                        var V = R[3 * g + 3] + R[3 * g + 4] + R[3 * g + 5],
                            H = 1;
                        6 * R[3 * g + 5] < V && (H *= .5, 6 * R[3 * g + 4] < V && (H *= .5)), i[v][g] = H
                    }
                    if (e.analysis) {
                        for (var O = A[0], g = 1; 12 > g; g++) O < A[g] && (O = A[g]);
                        b.pinfo.ers[s][v] = b.pinfo.ers_save[v], b.pinfo.ers_save[v] = O
                    }
                    for (var g = 0; 12 > g; g++) 0 == o[v][g / 3] && A[g] > T && (o[v][g / 3] = g % 3 + 1);
                    for (var g = 1; 4 > g; g++) {
                        var N = B[g - 1],
                            X = B[g],
                            D = Math.max(N, X);
                        4e4 > D && 1.7 * X > N && 1.7 * N > X && (1 == g && o[v][0] <= o[v][g] && (o[v][0] = 0), o[v][g] = 0)
                    }
                    o[v][0] <= b.nsPsy.lastAttacks[v] && (o[v][0] = 0), (3 == b.nsPsy.lastAttacks[v] || o[v][0] + o[v][1] + o[v][2] + o[v][3] != 0) && (k = 0, 0 != o[v][1] && 0 != o[v][0] && (o[v][1] = 0), 0 != o[v][2] && 0 != o[v][1] && (o[v][2] = 0), 0 != o[v][3] && 0 != o[v][2] && (o[v][3] = 0)), 2 > v ? l[v] = k : 0 == k && (l[0] = l[1] = 0), _[v] = b.tot_ener[v]
                }
            }

            function L(e, a, t) {
                if (0 == t)
                    for (var s = 0; s < e.npart_s; s++) e.nb_s2[a][s] = e.nb_s1[a][s], e.nb_s1[a][s] = 0
            }

            function V(e, a) {
                for (var t = 0; t < e.npart_l; t++) e.nb_2[a][t] = e.nb_1[a][t], e.nb_1[a][t] = 0
            }

            function H(e, a, t, s) {
                var n = pe.length - 1,
                    r = 0,
                    _ = t[r] + t[r + 1];
                if (h(_ >= 0), _ > 0) {
                    var i = a[r];
                    i < a[r + 1] && (i = a[r + 1]), h(e.numlines_s[r] + e.numlines_s[r + 1] - 1 > 0), _ = 20 * (2 * i - _) / (_ * (e.numlines_s[r] + e.numlines_s[r + 1] - 1));
                    var o = 0 | _;
                    o > n && (o = n), s[r] = o
                } else s[r] = 0;
                for (r = 1; r < e.npart_s - 1; r++)
                    if (_ = t[r - 1] + t[r] + t[r + 1], h(r + 1 < e.npart_s), h(_ >= 0), _ > 0) {
                        var i = a[r - 1];
                        i < a[r] && (i = a[r]), i < a[r + 1] && (i = a[r + 1]), h(e.numlines_s[r - 1] + e.numlines_s[r] + e.numlines_s[r + 1] - 1 > 0), _ = 20 * (3 * i - _) / (_ * (e.numlines_s[r - 1] + e.numlines_s[r] + e.numlines_s[r + 1] - 1));
                        var o = 0 | _;
                        o > n && (o = n), s[r] = o
                    } else s[r] = 0;
                if (h(r > 0), h(r == e.npart_s - 1), _ = t[r - 1] + t[r], h(_ >= 0), _ > 0) {
                    var i = a[r - 1];
                    i < a[r] && (i = a[r]), h(e.numlines_s[r - 1] + e.numlines_s[r] - 1 > 0), _ = 20 * (2 * i - _) / (_ * (e.numlines_s[r - 1] + e.numlines_s[r] - 1));
                    var o = 0 | _;
                    o > n && (o = n), s[r] = o
                } else s[r] = 0;
                h(r == e.npart_s - 1)
            }

            function O(e, a, t, s, n, r) {
                var _, i, o, l = e.internal_flags,
                    c = new float[m.CBANDS],
                    u = f(m.CBANDS),
                    b = new int[m.CBANDS];
                for (o = i = 0; o < l.npart_s; ++o) {
                    var v = 0,
                        d = 0,
                        g = l.numlines_s[o];
                    for (_ = 0; g > _; ++_, ++i) {
                        var S = a[r][i];
                        v += S, S > d && (d = S)
                    }
                    t[o] = v, h(v >= 0), c[o] = d, h(g > 0), u[o] = v / g, h(u[o] >= 0)
                }
                for (h(o == l.npart_s), h(129 == i); o < m.CBANDS; ++o) c[o] = 0, u[o] = 0;
                for (H(l, c, u, b), i = o = 0; o < l.npart_s; o++) {
                    var M, w, A, R, B, y = l.s3ind_s[o][0],
                        E = l.s3ind_s[o][1];
                    for (M = b[y], w = 1, R = l.s3_ss[i] * t[y] * pe[b[y]], ++i, ++y; E >= y;) M += b[y], w += 1, A = l.s3_ss[i] * t[y] * pe[b[y]], R = p(R, A, y - o), ++i, ++y;
                    M = (1 + 2 * M) / (2 * w), B = .5 * pe[M], R *= B, s[o] = R, l.nb_s2[n][o] = l.nb_s1[n][o], l.nb_s1[n][o] = R, A = c[o], A *= l.minval_s[o], A *= B, s[o] > A && (s[o] = A), l.masking_lower > 1 && (s[o] *= l.masking_lower), s[o] > t[o] && (s[o] = t[o]), l.masking_lower < 1 && (s[o] *= l.masking_lower), h(s[o] >= 0)
                }
                for (; o < m.CBANDS; ++o) t[o] = 0, s[o] = 0
            }

            function N(e, a, t, s, n) {
                var r, _ = f(m.CBANDS),
                    i = f(m.CBANDS),
                    o = u(m.CBANDS + 2);
                E(e, a, t, _, i), T(e, _, i, o);
                var l = 0;
                for (r = 0; r < e.npart_l; r++) {
                    var c, b, v, d, g = e.s3ind[r][0],
                        S = e.s3ind[r][1],
                        M = 0,
                        w = 0;
                    for (M = o[g], w += 1, b = e.s3_ll[l] * t[g] * pe[o[g]], ++l, ++g; S >= g;) M += o[g], w += 1, c = e.s3_ll[l] * t[g] * pe[o[g]], d = p(b, c, g - r), b = d, ++l, ++g;
                    if (M = (1 + 2 * M) / (2 * w), v = .5 * pe[M], b *= v, e.blocktype_old[1 & n] == m.SHORT_TYPE) {
                        var A = ee * e.nb_1[n][r];
                        A > 0 ? s[r] = Math.min(b, A) : s[r] = Math.min(b, t[r] * le)
                    } else {
                        var A, R = ae * e.nb_2[n][r],
                            B = ee * e.nb_1[n][r];
                        0 >= R && (R = b), 0 >= B && (B = b), A = e.blocktype_old[1 & n] == m.NORM_TYPE ? Math.min(B, R) : B, s[r] = Math.min(b, A)
                    }
                    e.nb_2[n][r] = e.nb_1[n][r], e.nb_1[n][r] = b, c = _[r], c *= e.minval_l[r], c *= v, s[r] > c && (s[r] = c), e.masking_lower > 1 && (s[r] *= e.masking_lower), s[r] > t[r] && (s[r] = t[r]), e.masking_lower < 1 && (s[r] *= e.masking_lower), h(s[r] >= 0)
                }
                for (; r < m.CBANDS; ++r) t[r] = 0, s[r] = 0
            }

            function X(e, a) {
                var t = e.internal_flags;
                e.short_blocks != i.short_block_coupled || 0 != a[0] && 0 != a[1] || (a[0] = a[1] = 0);
                for (var s = 0; s < t.channels_out; s++) e.short_blocks == i.short_block_dispensed && (a[s] = 1), e.short_blocks == i.short_block_forced && (a[s] = 0)
            }

            function D(e, a, t) {
                for (var s = e.internal_flags, n = 0; n < s.channels_out; n++) {
                    var r = m.NORM_TYPE;
                    0 != a[n] ? (h(s.blocktype_old[n] != m.START_TYPE), s.blocktype_old[n] == m.SHORT_TYPE && (r = m.STOP_TYPE)) : (r = m.SHORT_TYPE, s.blocktype_old[n] == m.NORM_TYPE && (s.blocktype_old[n] = m.START_TYPE), s.blocktype_old[n] == m.STOP_TYPE && (s.blocktype_old[n] = m.SHORT_TYPE)), t[n] = s.blocktype_old[n], s.blocktype_old[n] = r
                }
            }

            function F(e, a, t, s, n, r, _) {
                for (var i, o, l = 2 * r, f = r > 0 ? Math.pow(10, n) : 1, c = 0; _ > c; ++c) {
                    var u = e[2][c],
                        b = e[3][c],
                        m = a[0][c],
                        p = a[1][c],
                        v = a[2][c],
                        d = a[3][c];
                    if (1.58 * p >= m && 1.58 * m >= p) {
                        var g = t[c] * b,
                            S = t[c] * u;
                        o = Math.max(v, Math.min(d, g)), i = Math.max(d, Math.min(v, S))
                    } else o = v, i = d;
                    if (r > 0) {
                        var M, w, A = s[c] * f;
                        if (M = Math.min(Math.max(m, A), Math.max(p, A)), v = Math.max(o, A), d = Math.max(i, A), w = v + d, w > 0 && w > M * l) {
                            var R = M * l / w;
                            v *= R, d *= R, h(w > 0)
                        }
                        o = Math.min(v, o), i = Math.min(d, i)
                    }
                    o > u && (o = u), i > b && (i = b), a[2][c] = o, a[3][c] = i
                }
            }

            function Y(e, a) {
                var t, s = e;
                return t = s >= 0 ? 27 * -s : s * a, -72 >= t ? 0 : Math.exp(t * ue)
            }

            function q(e) {
                var a, t, s = 0,
                    n = 0,
                    r = 0;
                for (r = 0; Y(r, e) > 1e-20; r -= 1);
                for (a = r, t = 0; Math.abs(t - a) > 1e-12;) r = (t + a) / 2, Y(r, e) > 0 ? t = r : a = r;
                s = a;
                var a, t, r = 0;
                for (r = 0; Y(r, e) > 1e-20; r += 1);
                for (a = 0, t = r; Math.abs(t - a) > 1e-12;) r = (t + a) / 2, Y(r, e) > 0 ? a = r : t = r;
                n = t;
                var _, i = 0,
                    o = 1e3;
                for (_ = 0; o >= _; ++_) {
                    var r = s + _ * (n - s) / o,
                        l = Y(r, e);
                    i += l
                }
                var f = (o + 1) / (i * (n - s));
                return f
            }

            function C(e) {
                var a, t, s, n;
                return a = e, a *= a >= 0 ? 3 : 1.5, a >= .5 && 2.5 >= a ? (n = a - .5, t = 8 * (n * n - 2 * n)) : t = 0, a += .474, s = 15.811389 + 7.5 * a - 17.5 * Math.sqrt(1 + a * a), -60 >= s ? 0 : (a = Math.exp((t + s) * ue), a /= .6609193)
            }

            function G(e) {
                return 0 > e && (e = 0), e = .001 * e, 13 * Math.atan(.76 * e) + 3.5 * Math.atan(e * e / 56.25)
            }

            function j(e, a, t, s, n, r, _, i, o, l, c, b) {
                var p, v = f(m.CBANDS + 1),
                    d = i / (b > 15 ? 1152 : 384),
                    g = u(m.HBLKSIZE);
                i /= o;
                var S = 0,
                    M = 0;
                for (p = 0; p < m.CBANDS; p++) {
                    var w, A;
                    for (w = G(i * S), v[p] = i * S, A = S; G(i * A) - w < ne && o / 2 >= A; A++);
                    for (e[p] = A - S, M = p + 1; A > S;) h(S < m.HBLKSIZE), g[S++] = p;
                    if (S > o / 2) {
                        S = o / 2, ++p;
                        break
                    }
                }
                h(p < m.CBANDS), v[p] = i * S;
                for (var R = 0; b > R; R++) {
                    var B, y, E, T, k;
                    E = l[R], T = l[R + 1], B = 0 | Math.floor(.5 + c * (E - .5)), 0 > B && (B = 0), y = 0 | Math.floor(.5 + c * (T - .5)), y > o / 2 && (y = o / 2), t[R] = (g[B] + g[y]) / 2, a[R] = g[y];
                    var x = d * T;
                    _[R] = (x - v[a[R]]) / (v[a[R] + 1] - v[a[R]]), _[R] < 0 ? _[R] = 0 : _[R] > 1 && (_[R] = 1), k = G(i * l[R] * c), k = Math.min(k, 15.5) / 15.5, r[R] = Math.pow(10, 1.25 * (1 - Math.cos(Math.PI * k)) - 2.5)
                }
                S = 0;
                for (var P = 0; M > P; P++) {
                    var w, I, L = e[P];
                    w = G(i * S), I = G(i * (S + L - 1)), s[P] = .5 * (w + I), w = G(i * (S - .5)), I = G(i * (S + L - .5)), n[P] = I - w, S += L
                }
                return M
            }

            function z(e, a, t, s, n, r) {
                var _, i = c([m.CBANDS, m.CBANDS]),
                    o = 0;
                if (r)
                    for (var l = 0; a > l; l++)
                        for (_ = 0; a > _; _++) {
                            var u = C(t[l] - t[_]) * s[_];
                            i[l][_] = u * n[l]
                        } else
                            for (_ = 0; a > _; _++)
                                for (var h = 15 + Math.min(21 / t[_], 12), b = q(h), l = 0; a > l; l++) {
                                    var u = b * Y(t[l] - t[_], h) * s[_];
                                    i[l][_] = u * n[l]
                                }
                for (var l = 0; a > l; l++) {
                    for (_ = 0; a > _ && !(i[l][_] > 0); _++);
                    for (e[l][0] = _, _ = a - 1; _ > 0 && !(i[l][_] > 0); _--);
                    e[l][1] = _, o += e[l][1] - e[l][0] + 1
                }
                for (var p = f(o), v = 0, l = 0; a > l; l++)
                    for (_ = e[l][0]; _ <= e[l][1]; _++) p[v++] = i[l][_];
                return p
            }

            function U(e) {
                var a = G(e);
                return a = Math.min(a, 15.5) / 15.5, Math.pow(10, 1.25 * (1 - Math.cos(Math.PI * a)) - 2.5)
            }

            function K(e, a) {
                -.3 > e && (e = 3410), e /= 1e3, e = Math.max(.1, e);
                var t = 3.64 * Math.pow(e, -.8) - 6.8 * Math.exp(-.6 * Math.pow(e - 3.4, 2)) + 6 * Math.exp(-.15 * Math.pow(e - 8.7, 2)) + .001 * (.6 + .04 * a) * Math.pow(e, 4);
                return t
            }
            var Z, Q, W, J = new b,
                $ = 2.302585092994046,
                ee = 2,
                ae = 16,
                te = 2,
                se = 16,
                ne = .34,
                re = 1 / 217621504 / (m.BLKSIZE / 2),
                _e = .01,
                ie = .8,
                oe = .6,
                le = .3,
                fe = 3.5,
                ce = 21,
                ue = .2302585093,
                he = 8,
                be = 23,
                me = 15,
                pe = [1, .79433, .63096, .63096, .63096, .63096, .63096, .25119, .11749],
                ve = [3.3246 * 3.3246, 3.23837 * 3.23837, 9.9500500969, 9.0247369744, 8.1854926609, 7.0440875649, 2.46209 * 2.46209, 2.284 * 2.284, 4.4892710641, 1.96552 * 1.96552, 1.82335 * 1.82335, 1.69146 * 1.69146, 2.4621061921, 2.1508568964, 1.37074 * 1.37074, 1.31036 * 1.31036, 1.5691069696, 1.4555939904, 1.16203 * 1.16203, 1.2715945225, 1.09428 * 1.09428, 1.0659 * 1.0659, 1.0779838276, 1.0382591025, 1],
                de = [1.7782755904, 1.35879 * 1.35879, 1.38454 * 1.38454, 1.39497 * 1.39497, 1.40548 * 1.40548, 1.3537 * 1.3537, 1.6999465924, 1.22321 * 1.22321, 1.3169398564, 1],
                ge = [5.5396212496, 2.29259 * 2.29259, 4.9868695969, 2.12675 * 2.12675, 2.02545 * 2.02545, 1.87894 * 1.87894, 1.74303 * 1.74303, 1.61695 * 1.61695, 2.2499700001, 1.39148 * 1.39148, 1.29083 * 1.29083, 1.19746 * 1.19746, 1.2339655056, 1.0779838276],
                Se = [1.7782755904, 1.35879 * 1.35879, 1.38454 * 1.38454, 1.39497 * 1.39497, 1.40548 * 1.40548, 1.3537 * 1.3537, 1.6999465924, 1.22321 * 1.22321, 1.3169398564, 1],
                Me = [11.8, 13.6, 17.2, 32, 46.5, 51.3, 57.5, 67.1, 71.5, 84.6, 97.6, 130],
                we = [6.8, 5.8, 5.8, 6.4, 6.5, 9.9, 12.1, 14.4, 15, 18.9, 21.6, 26.9, 34.2, 40.2, 46.8, 56.5, 60.7, 73.9, 85.7, 93.4, 126.1],
                Ae = [-1.730326e-17, -0.01703172, -1.349528e-17, .0418072, -6.73278e-17, -0.0876324, -3.0835e-17, .1863476, -1.104424e-16, -0.627638];
            this.L3psycho_anal_ns = function(e, a, s, _, i, o, b, p, k, x) {
                var P, I, L, V, H, O, N, X, D, F = e.internal_flags,
                    Y = c([2, m.BLKSIZE]),
                    q = c([2, 3, m.BLKSIZE_s]),
                    C = f(m.CBANDS + 1),
                    G = f(m.CBANDS + 1),
                    j = f(m.CBANDS + 2),
                    z = u(2),
                    U = u(2),
                    K = c([2, 576]),
                    Z = u(m.CBANDS + 2),
                    Q = u(m.CBANDS + 2);
                for (l.fill(Q, 0), P = F.channels_out, e.mode == MPEGMode.JOINT_STEREO && (P = 4), D = e.VBR == r.vbr_off ? 0 == F.ResvMax ? 0 : F.ResvSize / F.ResvMax * .5 : e.VBR == r.vbr_rh || e.VBR == r.vbr_mtrh || e.VBR == r.vbr_mt ? .6 : 1, I = 0; I < F.channels_out; I++) {
                    var W = a[I],
                        J = s + 576 - 350 - ce + 192;
                    for (h(Ae.length == (ce - 1) / 2), V = 0; 576 > V; V++) {
                        var $, te;
                        for ($ = W[J + V + 10], te = 0, H = 0;
                            (ce - 1) / 2 - 1 > H; H += 2) $ += Ae[H] * (W[J + V + H] + W[J + V + ce - H]), te += Ae[H + 1] * (W[J + V + H + 1] + W[J + V + ce - H - 1]);
                        K[I][V] = $ + te
                    }
                    i[_][I].en.assign(F.en[I]), i[_][I].thm.assign(F.thm[I]), P > 2 && (o[_][I].en.assign(F.en[I + 2]), o[_][I].thm.assign(F.thm[I + 2]))
                }
                for (I = 0; P > I; I++) {
                    var se, ne, re, _e = f(12),
                        fe = [0, 0, 0, 0],
                        ue = f(12),
                        he = 1,
                        be = f(m.CBANDS),
                        me = f(m.CBANDS),
                        ve = [0, 0, 0, 0],
                        de = f(m.HBLKSIZE),
                        ge = c([3, m.HBLKSIZE_s]);
                    for (h(F.npart_s <= m.CBANDS), h(F.npart_l <= m.CBANDS), V = 0; 3 > V; V++) _e[V] = F.nsPsy.last_en_subshort[I][V + 6], h(F.nsPsy.last_en_subshort[I][V + 4] > 0), ue[V] = _e[V] / F.nsPsy.last_en_subshort[I][V + 4], fe[0] += _e[V];
                    if (2 == I)
                        for (V = 0; 576 > V; V++) {
                            var Se, Me;
                            Se = K[0][V], Me = K[1][V], K[0][V] = Se + Me, K[1][V] = Se - Me
                        }
                    var we = K[1 & I],
                        Re = 0;
                    for (V = 0; 9 > V; V++) {
                        for (var Be = Re + 64, ye = 1; Be > Re; Re++) ye < Math.abs(we[Re]) && (ye = Math.abs(we[Re]));
                        F.nsPsy.last_en_subshort[I][V] = _e[V + 3] = ye, fe[1 + V / 3] += ye, ye > _e[V + 3 - 2] ? (h(_e[V + 3 - 2] > 0), ye /= _e[V + 3 - 2]) : _e[V + 3 - 2] > 10 * ye ? (h(ye > 0), ye = _e[V + 3 - 2] / (10 * ye)) : ye = 0, ue[V + 3] = ye
                    }
                    if (e.analysis) {
                        var Ee = ue[0];
                        for (V = 1; 12 > V; V++) Ee < ue[V] && (Ee = ue[V]);
                        F.pinfo.ers[_][I] = F.pinfo.ers_save[I], F.pinfo.ers_save[I] = Ee
                    }
                    for (re = 3 == I ? F.nsPsy.attackthre_s : F.nsPsy.attackthre, V = 0; 12 > V; V++) 0 == ve[V / 3] && ue[V] > re && (ve[V / 3] = V % 3 + 1);
                    for (V = 1; 4 > V; V++) {
                        var Te;
                        fe[V - 1] > fe[V] ? (h(fe[V] > 0), Te = fe[V - 1] / fe[V]) : (h(fe[V - 1] > 0), Te = fe[V] / fe[V - 1]), 1.7 > Te && (ve[V] = 0, 1 == V && (ve[0] = 0))
                    }
                    for (0 != ve[0] && 0 != F.nsPsy.lastAttacks[I] && (ve[0] = 0), (3 == F.nsPsy.lastAttacks[I] || ve[0] + ve[1] + ve[2] + ve[3] != 0) && (he = 0, 0 != ve[1] && 0 != ve[0] && (ve[1] = 0), 0 != ve[2] && 0 != ve[1] && (ve[2] = 0), 0 != ve[3] && 0 != ve[2] && (ve[3] = 0)), 2 > I ? U[I] = he : 0 == he && (U[0] = U[1] = 0), k[I] = F.tot_ener[I], ne = q, se = Y, t(e, de, ge, se, 1 & I, ne, 1 & I, _, I, a, s), E(F, de, C, be, me), T(F, be, me, Z), X = 0; 3 > X; X++) {
                        var ke, xe;
                        for (w(e, ge, G, j, I, X), S(F, G, j, I, X), N = 0; N < m.SBMAX_s; N++) {
                            if (xe = F.thm[I].s[N][X], xe *= ie, ve[X] >= 2 || 1 == ve[X + 1]) {
                                var Pe = 0 != X ? X - 1 : 2,
                                    ye = R(F.thm[I].s[N][Pe], xe, oe * D);
                                xe = Math.min(xe, ye)
                            }
                            if (1 == ve[X]) {
                                var Pe = 0 != X ? X - 1 : 2,
                                    ye = R(F.thm[I].s[N][Pe], xe, le * D);
                                xe = Math.min(xe, ye)
                            } else if (0 != X && 3 == ve[X - 1] || 0 == X && 3 == F.nsPsy.lastAttacks[I]) {
                                var Pe = 2 != X ? X + 1 : 0,
                                    ye = R(F.thm[I].s[N][Pe], xe, le * D);
                                xe = Math.min(xe, ye)
                            }
                            ke = _e[3 * X + 3] + _e[3 * X + 4] + _e[3 * X + 5], 6 * _e[3 * X + 5] < ke && (xe *= .5, 6 * _e[3 * X + 4] < ke && (xe *= .5)), F.thm[I].s[N][X] = xe
                        }
                    }
                    for (F.nsPsy.lastAttacks[I] = ve[2], O = 0, L = 0; L < F.npart_l; L++) {
                        for (var Ie = F.s3ind[L][0], Le = C[Ie] * pe[Z[Ie]], Ve = F.s3_ll[O++] * Le; ++Ie <= F.s3ind[L][1];) Le = C[Ie] * pe[Z[Ie]], Ve = n(Ve, F.s3_ll[O++] * Le, Ie, Ie - L, F, 0);
                        Ve *= .158489319246111, F.blocktype_old[1 & I] == m.SHORT_TYPE ? j[L] = Ve : j[L] = R(Math.min(Ve, Math.min(ee * F.nb_1[I][L], ae * F.nb_2[I][L])), Ve, D), F.nb_2[I][L] = F.nb_1[I][L], F.nb_1[I][L] = Ve
                    }
                    for (; L <= m.CBANDS; ++L) C[L] = 0, j[L] = 0;
                    M(F, C, j, I)
                }
                if ((e.mode == MPEGMode.STEREO || e.mode == MPEGMode.JOINT_STEREO) && e.interChRatio > 0 && v(e, e.interChRatio), e.mode == MPEGMode.JOINT_STEREO) {
                    var He;
                    d(F), He = e.msfix, Math.abs(He) > 0 && g(F, He, e.ATHlower * F.ATH.adjust)
                }
                for (A(e, U, x, z), I = 0; P > I; I++) {
                    var Oe, Ne, Xe, De = 0;
                    I > 1 ? (Oe = p, De = -2, Ne = m.NORM_TYPE, (x[0] == m.SHORT_TYPE || x[1] == m.SHORT_TYPE) && (Ne = m.SHORT_TYPE), Xe = o[_][I - 2]) : (Oe = b, De = 0, Ne = x[I], Xe = i[_][I]), Ne == m.SHORT_TYPE ? Oe[De + I] = B(Xe, F.masking_lower) : Oe[De + I] = y(Xe, F.masking_lower), e.analysis && (F.pinfo.pe[_][I] = Oe[De + I])
                }
                return 0
            };
            var Re = [-1.730326e-17, -0.01703172, -1.349528e-17, .0418072, -6.73278e-17, -0.0876324, -3.0835e-17, .1863476, -1.104424e-16, -0.627638];
            this.L3psycho_anal_vbr = function(e, a, t, s, n, r, _, i, o, l) {
                var h, b, p = e.internal_flags,
                    v = f(m.HBLKSIZE),
                    d = c([3, m.HBLKSIZE_s]),
                    g = c([2, m.BLKSIZE]),
                    w = c([2, 3, m.BLKSIZE_s]),
                    A = c([4, m.CBANDS]),
                    E = c([4, m.CBANDS]),
                    T = c([4, 3]),
                    H = .6,
                    Y = [
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    q = u(2),
                    C = e.mode == MPEGMode.JOINT_STEREO ? 4 : p.channels_out;
                I(e, a, t, s, n, r, o, T, Y, q), X(e, q);
                for (var G = 0; C > G; G++) {
                    var j = 1 & G;
                    h = g, k(e, a, t, G, s, v, h, j), P(e, s, G, v), 0 != q[j] ? N(p, v, A[G], E[G], G) : V(p, G)
                }
                q[0] + q[1] == 2 && e.mode == MPEGMode.JOINT_STEREO && F(A, E, p.mld_cb_l, p.ATH.cb_l, e.ATHlower * p.ATH.adjust, e.msfix, p.npart_l);
                for (var G = 0; C > G; G++) {
                    var j = 1 & G;
                    0 != q[j] && M(p, A[G], E[G], G)
                }
                for (var z = 0; 3 > z; z++) {
                    for (var G = 0; C > G; ++G) {
                        var j = 1 & G;
                        0 != q[j] ? L(p, G, z) : (b = w, x(e, a, t, G, z, d, b, j), O(e, d, A[G], E[G], G, z))
                    }
                    q[0] + q[1] == 0 && e.mode == MPEGMode.JOINT_STEREO && F(A, E, p.mld_cb_s, p.ATH.cb_s, e.ATHlower * p.ATH.adjust, e.msfix, p.npart_s);
                    for (var G = 0; C > G; ++G) {
                        var j = 1 & G;
                        0 == q[j] && S(p, A[G], E[G], G, z)
                    }
                }
                for (var G = 0; C > G; G++) {
                    var j = 1 & G;
                    if (0 == q[j])
                        for (var U = 0; U < m.SBMAX_s; U++) {
                            for (var K = f(3), z = 0; 3 > z; z++) {
                                var Z = p.thm[G].s[U][z];
                                if (Z *= ie, Y[G][z] >= 2 || 1 == Y[G][z + 1]) {
                                    var Q = 0 != z ? z - 1 : 2,
                                        W = R(p.thm[G].s[U][Q], Z, oe * H);
                                    Z = Math.min(Z, W)
                                } else if (1 == Y[G][z]) {
                                    var Q = 0 != z ? z - 1 : 2,
                                        W = R(p.thm[G].s[U][Q], Z, le * H);
                                    Z = Math.min(Z, W)
                                } else if (0 != z && 3 == Y[G][z - 1] || 0 == z && 3 == p.nsPsy.lastAttacks[G]) {
                                    var Q = 2 != z ? z + 1 : 0,
                                        W = R(p.thm[G].s[U][Q], Z, le * H);
                                    Z = Math.min(Z, W)
                                }
                                Z *= T[G][z], K[z] = Z
                            }
                            for (var z = 0; 3 > z; z++) p.thm[G].s[U][z] = K[z]
                        }
                }
                for (var G = 0; C > G; G++) p.nsPsy.lastAttacks[G] = Y[G][2];
                D(e, q, l);
                for (var G = 0; C > G; G++) {
                    var J, $, ee, ae;
                    G > 1 ? (J = i, $ = -2, ee = m.NORM_TYPE, (l[0] == m.SHORT_TYPE || l[1] == m.SHORT_TYPE) && (ee = m.SHORT_TYPE), ae = r[s][G - 2]) : (J = _, $ = 0, ee = l[G], ae = n[s][G]), ee == m.SHORT_TYPE ? J[$ + G] = B(ae, p.masking_lower) : J[$ + G] = y(ae, p.masking_lower), e.analysis && (p.pinfo.pe[s][G] = J[$ + G])
                }
                return 0
            }, this.psymodel_init = function(e) {
                var a, t = e.internal_flags,
                    n = !0,
                    i = 13,
                    o = 24,
                    l = 0,
                    c = 0,
                    u = -8.25,
                    b = -4.5,
                    p = f(m.CBANDS),
                    v = f(m.CBANDS),
                    d = f(m.CBANDS),
                    g = e.out_samplerate;
                switch (e.experimentalZ) {
                    default:
                        case 0:
                        n = !0;
                    break;
                    case 1:
                            n = e.VBR == r.vbr_mtrh || e.VBR == r.vbr_mt ? !1 : !0;
                        break;
                    case 2:
                            n = !1;
                        break;
                    case 3:
                            i = 8,
                        l = -1.75,
                        c = -.0125,
                        u = -8.25,
                        b = -2.25
                }
                for (t.ms_ener_ratio_old = .25, t.blocktype_old[0] = t.blocktype_old[1] = m.NORM_TYPE, a = 0; 4 > a; ++a) {
                    for (var S = 0; S < m.CBANDS; ++S) t.nb_1[a][S] = 1e20, t.nb_2[a][S] = 1e20, t.nb_s1[a][S] = t.nb_s2[a][S] = 1;
                    for (var M = 0; M < m.SBMAX_l; M++) t.en[a].l[M] = 1e20, t.thm[a].l[M] = 1e20;
                    for (var S = 0; 3 > S; ++S) {
                        for (var M = 0; M < m.SBMAX_s; M++) t.en[a].s[M][S] = 1e20, t.thm[a].s[M][S] = 1e20;
                        t.nsPsy.lastAttacks[a] = 0
                    }
                    for (var S = 0; 9 > S; S++) t.nsPsy.last_en_subshort[a][S] = 10
                }
                for (t.loudness_sq_save[0] = t.loudness_sq_save[1] = 0, t.npart_l = j(t.numlines_l, t.bo_l, t.bm_l, p, v, t.mld_l, t.PSY.bo_l_weight, g, m.BLKSIZE, t.scalefac_band.l, m.BLKSIZE / 1152, m.SBMAX_l), h(t.npart_l < m.CBANDS), a = 0; a < t.npart_l; a++) {
                    var w = l;
                    p[a] >= i && (w = c * (p[a] - i) / (o - i) + l * (o - p[a]) / (o - i)), d[a] = Math.pow(10, w / 10), t.numlines_l[a] > 0 ? t.rnumlines_l[a] = 1 / t.numlines_l[a] : t.rnumlines_l[a] = 0
                }
                t.s3_ll = z(t.s3ind, t.npart_l, p, v, d, n);
                var S = 0;
                for (a = 0; a < t.npart_l; a++) {
                    var A;
                    A = _.MAX_VALUE;
                    for (var R = 0; R < t.numlines_l[a]; R++, S++) {
                        var B, y = g * S / (1e3 * m.BLKSIZE);
                        B = this.ATHformula(1e3 * y, e) - 20, B = Math.pow(10, .1 * B), B *= t.numlines_l[a], A > B && (A = B)
                    }
                    t.ATH.cb_l[a] = A, A = -20 + 20 * p[a] / 10, A > 6 && (A = 100), -15 > A && (A = -15), A -= 8, t.minval_l[a] = Math.pow(10, A / 10) * t.numlines_l[a]
                }
                for (t.npart_s = j(t.numlines_s, t.bo_s, t.bm_s, p, v, t.mld_s, t.PSY.bo_s_weight, g, m.BLKSIZE_s, t.scalefac_band.s, m.BLKSIZE_s / 384, m.SBMAX_s), h(t.npart_s < m.CBANDS), S = 0, a = 0; a < t.npart_s; a++) {
                    var A, w = u;
                    p[a] >= i && (w = b * (p[a] - i) / (o - i) + u * (o - p[a]) / (o - i)), d[a] = Math.pow(10, w / 10), A = _.MAX_VALUE;
                    for (var R = 0; R < t.numlines_s[a]; R++, S++) {
                        var B, y = g * S / (1e3 * m.BLKSIZE_s);
                        B = this.ATHformula(1e3 * y, e) - 20, B = Math.pow(10, .1 * B), B *= t.numlines_s[a], A > B && (A = B)
                    }
                    t.ATH.cb_s[a] = A, A = -7 + 7 * p[a] / 12, p[a] > 12 && (A *= 1 + 3.1 * Math.log(1 + A)), p[a] < 12 && (A *= 1 + 2.3 * Math.log(1 - A)), -15 > A && (A = -15), A -= 8, t.minval_s[a] = Math.pow(10, A / 10) * t.numlines_s[a]
                }
                t.s3_ss = z(t.s3ind_s, t.npart_s, p, v, d, n), s(), J.init_fft(t), t.decay = Math.exp(-1 * $ / (_e * g / 192));
                var E;
                E = fe, 0 != (2 & e.exp_nspsytune) && (E = 1), Math.abs(e.msfix) > 0 && (E = e.msfix), e.msfix = E;
                for (var T = 0; T < t.npart_l; T++) t.s3ind[T][1] > t.npart_l - 1 && (t.s3ind[T][1] = t.npart_l - 1);
                var k = 576 * t.mode_gr / g;
                if (t.ATH.decay = Math.pow(10, -1.2 * k), t.ATH.adjust = .01, t.ATH.adjustLimit = 1, h(t.bo_l[m.SBMAX_l - 1] <= t.npart_l), h(t.bo_s[m.SBMAX_s - 1] <= t.npart_s), -1 != e.ATHtype) {
                    var y, x = e.out_samplerate / m.BLKSIZE,
                        P = 0;
                    for (y = 0, a = 0; a < m.BLKSIZE / 2; ++a) y += x, t.ATH.eql_w[a] = 1 / Math.pow(10, this.ATHformula(y, e) / 10), P += t.ATH.eql_w[a];
                    for (P = 1 / P, a = m.BLKSIZE / 2; --a >= 0;) t.ATH.eql_w[a] *= P
                }
                for (var T = S = 0; T < t.npart_s; ++T)
                    for (a = 0; a < t.numlines_s[T]; ++a) ++S;
                h(129 == S);
                for (var T = S = 0; T < t.npart_l; ++T)
                    for (a = 0; a < t.numlines_l[T]; ++a) ++S;
                for (h(513 == S), S = 0, a = 0; a < t.npart_l; a++) {
                    var y = g * (S + t.numlines_l[a] / 2) / (1 * m.BLKSIZE);
                    t.mld_cb_l[a] = U(y), S += t.numlines_l[a]
                }
                for (; a < m.CBANDS; ++a) t.mld_cb_l[a] = 1;
                for (S = 0, a = 0; a < t.npart_s; a++) {
                    var y = g * (S + t.numlines_s[a] / 2) / (1 * m.BLKSIZE_s);
                    t.mld_cb_s[a] = U(y), S += t.numlines_s[a]
                }
                for (; a < m.CBANDS; ++a) t.mld_cb_s[a] = 1;
                return 0
            }, this.ATHformula = function(e, a) {
                var t;
                switch (a.ATHtype) {
                    case 0:
                        t = K(e, 9);
                        break;
                    case 1:
                        t = K(e, -1);
                        break;
                    case 2:
                        t = K(e, 0);
                        break;
                    case 3:
                        t = K(e, 1) + 6;
                        break;
                    case 4:
                        t = K(e, a.ATHcurve);
                        break;
                    default:
                        t = K(e, 0)
                }
                return t
            }
        }
        var n = t(498),
            r = (n.System, n.VbrMode),
            _ = n.Float,
            i = n.ShortBlock,
            o = n.Util,
            l = n.Arrays,
            f = (n.new_array_n, n.new_byte, n.new_double, n.new_float),
            c = n.new_float_n,
            u = n.new_int,
            h = (n.new_int_n, n.assert),
            b = t(151),
            m = t(359);
        e.exports = s
    },
    95: function(e, a) {
        function t() {
            var e, a;
            this.setModules = function(t, s) {
                e = t, a = s
            }
        }
        e.exports = t
    }
});