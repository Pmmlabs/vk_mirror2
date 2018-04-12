! function(e) {
    function t(r) {
        if (a[r]) return a[r].exports;
        var n = a[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(n.exports, n, n.exports, t), n.l = !0, n.exports
    }
    var a = {};
    return t.m = e, t.c = a, t.d = function(e, a, r) {
        t.o(e, a) || Object.defineProperty(e, a, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.n = function(e) {
        var a = e && e.__esModule ? function() {
            return e["default"]
        } : function() {
            return e
        };
        return t.d(a, "a", a), a
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 209)
}({
    10: function(e, t, a) {
        function r() {
            function e(e) {
                var t, a;
                if (0 == e.ATH.useAdjust) return void(e.ATH.adjust = 1);
                if (a = e.loudness_sq[0][0], t = e.loudness_sq[1][0], 2 == e.channels_out ? (a += e.loudness_sq[0][1], t += e.loudness_sq[1][1]) : (a += a, t += t), 2 == e.mode_gr && (a = Math.max(a, t)), a *= .5, a *= e.ATH.aaSensitivityP, a > .03125) e.ATH.adjust >= 1 ? e.ATH.adjust = 1 : e.ATH.adjust < e.ATH.adjustLimit && (e.ATH.adjust = e.ATH.adjustLimit), e.ATH.adjustLimit = 1;
                else {
                    var r = 31.98 * a + 625e-6;
                    e.ATH.adjust >= r ? (e.ATH.adjust *= .075 * r + .925, e.ATH.adjust < r && (e.ATH.adjust = r)) : e.ATH.adjustLimit >= r ? e.ATH.adjust = r : e.ATH.adjust < e.ATH.adjustLimit && (e.ATH.adjust = e.ATH.adjustLimit), e.ATH.adjustLimit = r
                }
            }

            function t(e) {
                var t, a;
                for (u(0 <= e.bitrate_index && e.bitrate_index < 16), u(0 <= e.mode_ext && e.mode_ext < 4), e.bitrate_stereoMode_Hist[e.bitrate_index][4]++, e.bitrate_stereoMode_Hist[15][4]++, 2 == e.channels_out && (e.bitrate_stereoMode_Hist[e.bitrate_index][e.mode_ext]++, e.bitrate_stereoMode_Hist[15][e.mode_ext]++), t = 0; t < e.mode_gr; ++t)
                    for (a = 0; a < e.channels_out; ++a) {
                        var r = 0 | e.l3_side.tt[t][a].block_type;
                        0 != e.l3_side.tt[t][a].mixed_block_flag && (r = 4), e.bitrate_blockType_Hist[e.bitrate_index][r]++, e.bitrate_blockType_Hist[e.bitrate_index][5]++, e.bitrate_blockType_Hist[15][r]++, e.bitrate_blockType_Hist[15][5]++
                    }
            }

            function n(e, t) {
                var a, n, s = e.internal_flags;
                if (0 == s.lame_encode_frame_init) {
                    var i, o, l = _(2014),
                        f = _(2014);
                    for (s.lame_encode_frame_init = 1, i = 0, o = 0; i < 286 + 576 * (1 + s.mode_gr); ++i) i < 576 * s.mode_gr ? (l[i] = 0, 2 == s.channels_out && (f[i] = 0)) : (l[i] = t[0][o], 2 == s.channels_out && (f[i] = t[1][o]), ++o);
                    for (n = 0; n < s.mode_gr; n++)
                        for (a = 0; a < s.channels_out; a++) s.l3_side.tt[n][a].block_type = r.SHORT_TYPE;
                    w.mdct_sub48(s, l, f), u(576 >= r.FFTOFFSET), u(s.mf_size >= r.BLKSIZE + e.framesize - r.FFTOFFSET), u(s.mf_size >= 512 + e.framesize - 32)
                }
            }
            var h = a(122),
                c = a(89),
                p = r.FFTOFFSET,
                b = r.MPG_MD_MS_LR,
                m = null;
            this.psy = null;
            var v = null,
                d = null,
                g = null;
            this.setModules = function(e, t, a, r) {
                m = e, this.psy = t, v = t, d = r, g = a
            };
            var w = new h;
            this.lame_encode_mp3_frame = function(a, _, u, h, S, A) {
                var R, M = o([2, 2]);
                M[0][0] = new c, M[0][1] = new c, M[1][0] = new c, M[1][1] = new c;
                var y = o([2, 2]);
                y[0][0] = new c, y[0][1] = new c, y[1][0] = new c, y[1][1] = new c;
                var B, E, T, k, x = [null, null],
                    P = a.internal_flags,
                    I = l([2, 4]),
                    L = [.5, .5],
                    O = [
                        [0, 0],
                        [0, 0]
                    ],
                    V = [
                        [0, 0],
                        [0, 0]
                    ];
                if (x[0] = _, x[1] = u, 0 == P.lame_encode_frame_init && n(a, x), P.padding = 0, (P.slot_lag -= P.frac_SpF) < 0 && (P.slot_lag += a.out_samplerate, P.padding = 1), 0 != P.psymodel) {
                    var N, H = [null, null],
                        D = 0,
                        Y = f(2);
                    for (k = 0; k < P.mode_gr; k++) {
                        for (T = 0; T < P.channels_out; T++) H[T] = x[T], D = 576 + 576 * k - r.FFTOFFSET;
                        if (N = a.VBR == i.vbr_mtrh || a.VBR == i.vbr_mt ? v.L3psycho_anal_vbr(a, H, D, k, M, y, O[k], V[k], I[k], Y) : v.L3psycho_anal_ns(a, H, D, k, M, y, O[k], V[k], I[k], Y), 0 != N) return -4;
                        for (a.mode == MPEGMode.JOINT_STEREO && (L[k] = I[k][2] + I[k][3], L[k] > 0 && (L[k] = I[k][3] / L[k])), T = 0; T < P.channels_out; T++) {
                            var X = P.l3_side.tt[k][T];
                            X.block_type = Y[T], X.mixed_block_flag = 0
                        }
                    }
                } else
                    for (k = 0; k < P.mode_gr; k++)
                        for (T = 0; T < P.channels_out; T++) P.l3_side.tt[k][T].block_type = r.NORM_TYPE, P.l3_side.tt[k][T].mixed_block_flag = 0, V[k][T] = O[k][T] = 700;
                if (e(P), w.mdct_sub48(P, x[0], x[1]), P.mode_ext = r.MPG_MD_LR_LR, a.force_ms) P.mode_ext = r.MPG_MD_MS_LR;
                else if (a.mode == MPEGMode.JOINT_STEREO) {
                    var F = 0,
                        C = 0;
                    for (k = 0; k < P.mode_gr; k++)
                        for (T = 0; T < P.channels_out; T++) F += V[k][T], C += O[k][T];
                    if (1 * C >= F) {
                        var q = P.l3_side.tt[0],
                            U = P.l3_side.tt[P.mode_gr - 1];
                        q[0].block_type == q[1].block_type && U[0].block_type == U[1].block_type && (P.mode_ext = r.MPG_MD_MS_LR)
                    }
                }
                if (P.mode_ext == b ? (B = y, E = V) : (B = M, E = O), a.analysis && null != P.pinfo)
                    for (k = 0; k < P.mode_gr; k++)
                        for (T = 0; T < P.channels_out; T++) P.pinfo.ms_ratio[k] = P.ms_ratio[k], P.pinfo.ms_ener_ratio[k] = L[k], P.pinfo.blocktype[k][T] = P.l3_side.tt[k][T].block_type, P.pinfo.pe[k][T] = E[k][T], s.arraycopy(P.l3_side.tt[k][T].xr, 0, P.pinfo.xr[k][T], 0, 576), P.mode_ext == b && (P.pinfo.ers[k][T] = P.pinfo.ers[k][T + 2], s.arraycopy(P.pinfo.energy[k][T + 2], 0, P.pinfo.energy[k][T], 0, P.pinfo.energy[k][T].length));
                if (a.VBR == i.vbr_off || a.VBR == i.vbr_abr) {
                    var j, G;
                    for (j = 0; 18 > j; j++) P.nsPsy.pefirbuf[j] = P.nsPsy.pefirbuf[j + 1];
                    for (G = 0, k = 0; k < P.mode_gr; k++)
                        for (T = 0; T < P.channels_out; T++) G += E[k][T];
                    for (P.nsPsy.pefirbuf[18] = G, G = P.nsPsy.pefirbuf[9], j = 0; 9 > j; j++) G += (P.nsPsy.pefirbuf[j] + P.nsPsy.pefirbuf[18 - j]) * r.fircoef[j];
                    for (G = 3350 * P.mode_gr * P.channels_out / G, k = 0; k < P.mode_gr; k++)
                        for (T = 0; T < P.channels_out; T++) E[k][T] *= G
                }
                if (P.iteration_loop.iteration_loop(a, E, L, B), m.format_bitstream(a), R = m.copy_buffer(P, h, S, A, 1), a.bWriteVbrTag && d.addVbrFrame(a), a.analysis && null != P.pinfo) {
                    for (T = 0; T < P.channels_out; T++) {
                        var z;
                        for (z = 0; p > z; z++) P.pinfo.pcmdata[T][z] = P.pinfo.pcmdata[T][z + a.framesize];
                        for (z = p; 1600 > z; z++) P.pinfo.pcmdata[T][z] = x[T][z - p]
                    }
                    g.set_frame_pinfo(a, B)
                }
                return t(P), R
            }
        }
        var n = a(157),
            s = n.System,
            i = n.VbrMode,
            o = (n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n),
            _ = (n.new_byte, n.new_double, n.new_float),
            l = n.new_float_n,
            f = n.new_int,
            u = (n.new_int_n, n.assert);
        r.ENCDELAY = 576, r.POSTDELAY = 1152, r.MDCTDELAY = 48, r.FFTOFFSET = 224 + r.MDCTDELAY, r.DECDELAY = 528, r.SBLIMIT = 32, r.CBANDS = 64, r.SBPSY_l = 21, r.SBPSY_s = 12, r.SBMAX_l = 22, r.SBMAX_s = 13, r.PSFB21 = 6, r.PSFB12 = 6, r.BLKSIZE = 1024, r.HBLKSIZE = r.BLKSIZE / 2 + 1, r.BLKSIZE_s = 256, r.HBLKSIZE_s = r.BLKSIZE_s / 2 + 1, r.NORM_TYPE = 0, r.START_TYPE = 1, r.SHORT_TYPE = 2, r.STOP_TYPE = 3, r.MPG_MD_LR_LR = 0, r.MPG_MD_LR_I = 1, r.MPG_MD_MS_LR = 2, r.MPG_MD_MS_I = 3, r.fircoef = [-.1039435, -.1892065, 5 * -.0432472, -.155915, 3.898045e-17, .0467745 * 5, .50455, .756825, .187098 * 5], e.exports = r
    },
    100: function(e, t, a) {
        function r() {
            function e(e, t, a, r) {
                r = 0;
                for (var n = 0; a >= n; ++n) {
                    var s = Math.abs(e.xr[n]);
                    r += s, t[n] = Math.sqrt(s * Math.sqrt(s)), t[n] > e.xrpow_max && (e.xrpow_max = t[n])
                }
                return r
            }

            function t(e, t) {
                var a = e.ATH,
                    r = t.xr;
                if (t.block_type != p.SHORT_TYPE)
                    for (var n = !1, s = p.PSFB21 - 1; s >= 0 && !n; s--) {
                        var i = e.scalefac_band.psfb21[s],
                            o = e.scalefac_band.psfb21[s + 1],
                            _ = B.athAdjust(a.adjust, a.psfb21[s], a.floor);
                        e.nsPsy.longfact[21] > 1e-12 && (_ *= e.nsPsy.longfact[21]);
                        for (var l = o - 1; l >= i; l--) {
                            if (!(Math.abs(r[l]) < _)) {
                                n = !0;
                                break
                            }
                            r[l] = 0
                        }
                    } else
                        for (var f = 0; 3 > f; f++)
                            for (var n = !1, s = p.PSFB12 - 1; s >= 0 && !n; s--) {
                                var i = 3 * e.scalefac_band.s[12] + (e.scalefac_band.s[13] - e.scalefac_band.s[12]) * f + (e.scalefac_band.psfb12[s] - e.scalefac_band.psfb12[0]),
                                    o = i + (e.scalefac_band.psfb12[s + 1] - e.scalefac_band.psfb12[s]),
                                    u = B.athAdjust(a.adjust, a.psfb12[s], a.floor);
                                e.nsPsy.shortfact[12] > 1e-12 && (u *= e.nsPsy.shortfact[12]);
                                for (var l = o - 1; l >= i; l--) {
                                    if (!(Math.abs(r[l]) < u)) {
                                        n = !0;
                                        break
                                    }
                                    r[l] = 0
                                }
                            }
            }

            function a(e) {
                this.ordinal = e
            }

            function r(e, t, r, n, s) {
                var i, o = e.CurrentStep[n],
                    _ = !1,
                    l = e.OldValue[n],
                    u = a.BINSEARCH_NONE;
                for (t.global_gain = l, r -= t.part2_length, f(0 != o);;) {
                    var h;
                    if (i = E.count_bits(e, s, t, null), 1 == o || i == r) break;
                    i > r ? (u == a.BINSEARCH_DOWN && (_ = !0), _ && (o /= 2), u = a.BINSEARCH_UP, h = o) : (u == a.BINSEARCH_UP && (_ = !0), _ && (o /= 2), u = a.BINSEARCH_DOWN, h = -o), t.global_gain += h, t.global_gain < 0 && (t.global_gain = 0, _ = !0), t.global_gain > 255 && (t.global_gain = 255, _ = !0)
                }
                for (f(t.global_gain >= 0), f(t.global_gain < 256); i > r && t.global_gain < 255;) t.global_gain++, i = E.count_bits(e, s, t, null);
                return e.CurrentStep[n] = l - t.global_gain >= 4 ? 4 : 2, e.OldValue[n] = t.global_gain, t.part2_3_length = i, i
            }

            function n(e) {
                for (var t = 0; t < e.sfbmax; t++)
                    if (e.scalefac[t] + e.subblock_gain[e.window[t]] == 0) return !1;
                return !0
            }

            function v(e) {
                return o.FAST_LOG10(.368 + .632 * e * e * e)
            }

            function d(e, t) {
                for (var a = 1e-37, r = 0; r < t.psymax; r++) a += v(e[r]);
                return Math.max(1e-20, a)
            }

            function g(e, t, a, r, n) {
                var s;
                switch (e) {
                    default:
                        case 9:
                        t.over_count > 0 ? (s = a.over_SSD <= t.over_SSD, a.over_SSD == t.over_SSD && (s = a.bits < t.bits)) : s = a.max_noise < 0 && 10 * a.max_noise + a.bits <= 10 * t.max_noise + t.bits;
                    break;
                    case 0:
                            s = a.over_count < t.over_count || a.over_count == t.over_count && a.over_noise < t.over_noise || a.over_count == t.over_count && BitStream.EQ(a.over_noise, t.over_noise) && a.tot_noise < t.tot_noise;
                        break;
                    case 8:
                            a.max_noise = d(n, r);
                    case 1:
                            s = a.max_noise < t.max_noise;
                        break;
                    case 2:
                            s = a.tot_noise < t.tot_noise;
                        break;
                    case 3:
                            s = a.tot_noise < t.tot_noise && a.max_noise < t.max_noise;
                        break;
                    case 4:
                            s = a.max_noise <= 0 && t.max_noise > .2 || a.max_noise <= 0 && t.max_noise < 0 && t.max_noise > a.max_noise - .2 && a.tot_noise < t.tot_noise || a.max_noise <= 0 && t.max_noise > 0 && t.max_noise > a.max_noise - .2 && a.tot_noise < t.tot_noise + t.over_noise || a.max_noise > 0 && t.max_noise > -.05 && t.max_noise > a.max_noise - .1 && a.tot_noise + a.over_noise < t.tot_noise + t.over_noise || a.max_noise > 0 && t.max_noise > -.1 && t.max_noise > a.max_noise - .15 && a.tot_noise + a.over_noise + a.over_noise < t.tot_noise + t.over_noise + t.over_noise;
                        break;
                    case 5:
                            s = a.over_noise < t.over_noise || BitStream.EQ(a.over_noise, t.over_noise) && a.tot_noise < t.tot_noise;
                        break;
                    case 6:
                            s = a.over_noise < t.over_noise || BitStream.EQ(a.over_noise, t.over_noise) && (a.max_noise < t.max_noise || BitStream.EQ(a.max_noise, t.max_noise) && a.tot_noise <= t.tot_noise);
                        break;
                    case 7:
                            s = a.over_count < t.over_count || a.over_noise < t.over_noise
                }
                return 0 == t.over_count && (s = s && a.bits < t.bits), s
            }

            function w(e, t, a, r, n) {
                var s, i = e.internal_flags;
                s = 0 == t.scalefac_scale ? 1.2968395546510096 : 1.6817928305074292;
                for (var o = 0, _ = 0; _ < t.sfbmax; _++) o < a[_] && (o = a[_]);
                var l = i.noise_shaping_amp;
                switch (3 == l && (l = n ? 2 : 1), l) {
                    case 2:
                        break;
                    case 1:
                        o > 1 ? o = Math.pow(o, .5) : o *= .95;
                        break;
                    case 0:
                    default:
                        o > 1 ? o = 1 : o *= .95
                }
                for (var f = 0, _ = 0; _ < t.sfbmax; _++) {
                    var u, h = t.width[_];
                    if (f += h, !(a[_] < o)) {
                        if (0 != (2 & i.substep_shaping) && (i.pseudohalf[_] = 0 == i.pseudohalf[_] ? 1 : 0, 0 == i.pseudohalf[_] && 2 == i.noise_shaping_amp)) return;
                        for (t.scalefac[_]++, u = -h; 0 > u; u++) r[f + u] *= s, r[f + u] > t.xrpow_max && (t.xrpow_max = r[f + u]);
                        if (2 == i.noise_shaping_amp) return
                    }
                }
            }

            function S(e, t) {
                for (var a = 1.2968395546510096, r = 0, n = 0; n < e.sfbmax; n++) {
                    var s = e.width[n],
                        i = e.scalefac[n];
                    if (0 != e.preflag && (i += B.pretab[n]), r += s, 0 != (1 & i)) {
                        i++;
                        for (var o = -s; 0 > o; o++) t[r + o] *= a, t[r + o] > e.xrpow_max && (e.xrpow_max = t[r + o])
                    }
                    e.scalefac[n] = i >> 1
                }
                e.preflag = 0, e.scalefac_scale = 1
            }

            function A(e, t, a) {
                var r, n = t.scalefac;
                for (r = 0; r < t.sfb_lmax; r++)
                    if (n[r] >= 16) return !0;
                for (var s = 0; 3 > s; s++) {
                    var i = 0,
                        o = 0;
                    for (r = t.sfb_lmax + s; r < t.sfbdivide; r += 3) i < n[r] && (i = n[r]);
                    for (; r < t.sfbmax; r += 3) o < n[r] && (o = n[r]);
                    if (!(16 > i && 8 > o)) {
                        if (t.subblock_gain[s] >= 7) return !0;
                        t.subblock_gain[s]++;
                        var _ = e.scalefac_band.l[t.sfb_lmax];
                        for (r = t.sfb_lmax + s; r < t.sfbmax; r += 3) {
                            var l, u = t.width[r],
                                h = n[r];
                            if (f(h >= 0), h -= 4 >> t.scalefac_scale, h >= 0) n[r] = h, _ += 3 * u;
                            else {
                                n[r] = 0;
                                var c = 210 + (h << t.scalefac_scale + 1);
                                l = B.IPOW20(c), _ += u * (s + 1);
                                for (var p = -u; 0 > p; p++) a[_ + p] *= l, a[_ + p] > t.xrpow_max && (t.xrpow_max = a[_ + p]);
                                _ += u * (3 - s - 1)
                            }
                        }
                        var l = B.IPOW20(202);
                        _ += t.width[r] * (s + 1);
                        for (var p = -t.width[r]; 0 > p; p++) a[_ + p] *= l, a[_ + p] > t.xrpow_max && (t.xrpow_max = a[_ + p])
                    }
                }
                return !1
            }

            function R(e, t, a, r, s) {
                var i = e.internal_flags;
                w(e, t, a, r, s);
                var o = n(t);
                return o ? !1 : (o = 2 == i.mode_gr ? E.scale_bitcount(t) : E.scale_bitcount_lsf(i, t)) ? (i.noise_shaping > 1 && (_.fill(i.pseudohalf, 0), 0 == t.scalefac_scale ? (S(t, r), o = !1) : t.block_type == p.SHORT_TYPE && i.subblock_gain > 0 && (o = A(i, t, r) || n(t))), o || (o = 2 == i.mode_gr ? E.scale_bitcount(t) : E.scale_bitcount_lsf(i, t)), !o) : !0
            }
            var M;
            this.rv = null;
            var y;
            this.qupvt = null;
            var B, E, T = new u;
            this.setModules = function(e, t, a, r) {
                M = e, y = t, this.rv = t, B = a, this.qupvt = a, E = r, T.setModules(B, E)
            }, this.ms_convert = function(e, t) {
                for (var a = 0; 576 > a; ++a) {
                    var r = e.tt[t][0].xr[a],
                        n = e.tt[t][1].xr[a];
                    e.tt[t][0].xr[a] = (r + n) * (.5 * o.SQRT2), e.tt[t][1].xr[a] = (r - n) * (.5 * o.SQRT2)
                }
            }, this.init_xrpow = function(t, a, r) {
                var n = 0,
                    s = 0 | a.max_nonzero_coeff;
                if (f(null != r), a.xrpow_max = 0, f(s >= 0 && 575 >= s), _.fill(r, s, 576, 0), n = e(a, r, s, n), n > 1e-20) {
                    var i = 0;
                    0 != (2 & t.substep_shaping) && (i = 1);
                    for (var o = 0; o < a.psymax; o++) t.pseudohalf[o] = i;
                    return !0
                }
                return _.fill(a.l3_enc, 0, 576, 0), !1
            }, this.init_outer_loop = function(e, a) {
                a.part2_3_length = 0, a.big_values = 0, a.count1 = 0, a.global_gain = 210, a.scalefac_compress = 0, a.table_select[0] = 0, a.table_select[1] = 0, a.table_select[2] = 0, a.subblock_gain[0] = 0, a.subblock_gain[1] = 0, a.subblock_gain[2] = 0, a.subblock_gain[3] = 0, a.region0_count = 0, a.region1_count = 0, a.preflag = 0, a.scalefac_scale = 0, a.count1table_select = 0, a.part2_length = 0, a.sfb_lmax = p.SBPSY_l, a.sfb_smin = p.SBPSY_s, a.psy_lmax = e.sfb21_extra ? p.SBMAX_l : p.SBPSY_l, a.psymax = a.psy_lmax, a.sfbmax = a.sfb_lmax, a.sfbdivide = 11;
                for (var r = 0; r < p.SBMAX_l; r++) a.width[r] = e.scalefac_band.l[r + 1] - e.scalefac_band.l[r], a.window[r] = 3;
                if (a.block_type == p.SHORT_TYPE) {
                    var n = l(576);
                    a.sfb_smin = 0, a.sfb_lmax = 0, 0 != a.mixed_block_flag && (a.sfb_smin = 3, a.sfb_lmax = 2 * e.mode_gr + 4), a.psymax = a.sfb_lmax + 3 * ((e.sfb21_extra ? p.SBMAX_s : p.SBPSY_s) - a.sfb_smin), a.sfbmax = a.sfb_lmax + 3 * (p.SBPSY_s - a.sfb_smin), a.sfbdivide = a.sfbmax - 18, a.psy_lmax = a.sfb_lmax;
                    var i = e.scalefac_band.l[a.sfb_lmax];
                    s.arraycopy(a.xr, 0, n, 0, 576);
                    for (var r = a.sfb_smin; r < p.SBMAX_s; r++)
                        for (var o = e.scalefac_band.s[r], f = e.scalefac_band.s[r + 1], u = 0; 3 > u; u++)
                            for (var h = o; f > h; h++) a.xr[i++] = n[3 * h + u];
                    for (var c = a.sfb_lmax, r = a.sfb_smin; r < p.SBMAX_s; r++) a.width[c] = a.width[c + 1] = a.width[c + 2] = e.scalefac_band.s[r + 1] - e.scalefac_band.s[r], a.window[c] = 0, a.window[c + 1] = 1, a.window[c + 2] = 2, c += 3
                }
                a.count1bits = 0, a.sfb_partition_table = B.nr_of_sfb_block[0][0], a.slen[0] = 0, a.slen[1] = 0, a.slen[2] = 0, a.slen[3] = 0, a.max_nonzero_coeff = 575, _.fill(a.scalefac, 0), t(e, a)
            }, a.BINSEARCH_NONE = new a(0), a.BINSEARCH_UP = new a(1), a.BINSEARCH_DOWN = new a(2), this.trancate_smallspectrums = function(e, t, a, r) {
                var n = l(m.SFBMAX);
                if ((0 != (4 & e.substep_shaping) || t.block_type != p.SHORT_TYPE) && 0 == (128 & e.substep_shaping)) {
                    B.calc_noise(t, a, n, new h, null);
                    for (var s = 0; 576 > s; s++) {
                        var i = 0;
                        0 != t.l3_enc[s] && (i = Math.abs(t.xr[s])), r[s] = i
                    }
                    var s = 0,
                        o = 8;
                    t.block_type == p.SHORT_TYPE && (o = 6);
                    do {
                        var f, u, c, b, v = t.width[o];
                        if (s += v, !(n[o] >= 1 || (_.sort(r, s - v, v), BitStream.EQ(r[s - 1], 0)))) {
                            f = (1 - n[o]) * a[o], u = 0, b = 0;
                            do {
                                var d;
                                for (c = 1; v > b + c && !BitStream.NEQ(r[b + s - v], r[b + s + c - v]); c++);
                                if (d = r[b + s - v] * r[b + s - v] * c, d > f) {
                                    0 != b && (u = r[b + s - v - 1]);
                                    break
                                }
                                f -= d, b += c
                            } while (v > b);
                            if (!BitStream.EQ(u, 0))
                                do Math.abs(t.xr[s - v]) <= u && (t.l3_enc[s - v] = 0); while (--v > 0)
                        }
                    } while (++o < t.psymax);
                    t.part2_3_length = E.noquant_count_bits(e, t, null)
                }
            }, this.outer_loop = function(e, t, a, n, o, _) {
                var u, v = e.internal_flags,
                    d = new b,
                    w = l(576),
                    S = l(m.SFBMAX),
                    A = new h,
                    M = new c,
                    y = 9999999,
                    T = !1,
                    k = !1,
                    x = 0;
                if (r(v, t, _, o, n), 0 == v.noise_shaping) return 100;
                B.calc_noise(t, a, S, A, M), A.bits = t.part2_3_length, d.assign(t);
                var P = 0;
                for (s.arraycopy(n, 0, w, 0, 576); !T;) {
                    do {
                        var I, L = new h,
                            O = 255;
                        if (I = 0 != (2 & v.substep_shaping) ? 20 : 3, v.sfb21_extra) {
                            if (S[d.sfbmax] > 1) break;
                            if (d.block_type == p.SHORT_TYPE && (S[d.sfbmax + 1] > 1 || S[d.sfbmax + 2] > 1)) break
                        }
                        if (!R(e, d, S, n, k)) break;
                        0 != d.scalefac_scale && (O = 254);
                        var V = _ - d.part2_length;
                        if (0 >= V) break;
                        for (;
                            (d.part2_3_length = E.count_bits(v, n, d, M)) > V && d.global_gain <= O;) d.global_gain++;
                        if (d.global_gain > O) break;
                        if (0 == A.over_count) {
                            for (;
                                (d.part2_3_length = E.count_bits(v, n, d, M)) > y && d.global_gain <= O;) d.global_gain++;
                            if (d.global_gain > O) break
                        }
                        if (B.calc_noise(d, a, S, L, M), L.bits = d.part2_3_length, u = t.block_type != p.SHORT_TYPE ? e.quant_comp : e.quant_comp_short, u = g(u, A, L, d, S) ? 1 : 0, 0 != u) y = t.part2_3_length, A = L, t.assign(d), P = 0, s.arraycopy(n, 0, w, 0, 576);
                        else if (0 == v.full_outer_loop) {
                            if (++P > I && 0 == A.over_count) break;
                            if (3 == v.noise_shaping_amp && k && P > 30) break;
                            if (3 == v.noise_shaping_amp && k && d.global_gain - x > 15) break
                        }
                    } while (d.global_gain + d.scalefac_scale < 255);
                    3 == v.noise_shaping_amp ? k ? T = !0 : (d.assign(t), s.arraycopy(w, 0, n, 0, 576), P = 0, x = d.global_gain, k = !0) : T = !0
                }
                return f(t.global_gain + t.scalefac_scale <= 255), e.VBR == i.vbr_rh || e.VBR == i.vbr_mtrh ? s.arraycopy(w, 0, n, 0, 576) : 0 != (1 & v.substep_shaping) && trancate_smallspectrums(v, t, a, n), A.over_count
            }, this.iteration_finish_one = function(e, t, a) {
                var r = e.l3_side,
                    n = r.tt[t][a];
                E.best_scalefac_store(e, t, a, r), 1 == e.use_best_huffman && E.best_huffman_divide(e, n), y.ResvAdjust(e, n)
            }, this.VBR_encode_granule = function(e, t, a, r, n, i, o) {
                var u, h, c = e.internal_flags,
                    p = new b,
                    m = l(576),
                    v = o,
                    d = o + 1,
                    g = (o + i) / 2,
                    w = 0,
                    S = c.sfb21_extra;
                f(v <= LameInternalFlags.MAX_BITS_PER_CHANNEL), _.fill(p.l3_enc, 0);
                do f(g >= i), f(o >= g), f(o >= i), g > v - 42 ? c.sfb21_extra = !1 : c.sfb21_extra = S, h = outer_loop(e, t, a, r, n, g), 0 >= h ? (w = 1, d = t.part2_3_length, p.assign(t), s.arraycopy(r, 0, m, 0, 576), o = d - 32, u = o - i, g = (o + i) / 2) : (i = g + 32, u = o - i, g = (o + i) / 2, 0 != w && (w = 2, t.assign(p), s.arraycopy(m, 0, r, 0, 576))); while (u > 12);
                c.sfb21_extra = S, 2 == w && s.arraycopy(p.l3_enc, 0, t.l3_enc, 0, 576), f(t.part2_3_length <= v)
            }, this.get_framebits = function(e, t) {
                var a = e.internal_flags;
                a.bitrate_index = a.VBR_min_bitrate;
                var r = M.getframebits(e);
                a.bitrate_index = 1, r = M.getframebits(e);
                for (var n = 1; n <= a.VBR_max_bitrate; n++) {
                    a.bitrate_index = n;
                    var s = new MeanBits(r);
                    t[n] = y.ResvFrameBegin(e, s), r = s.bits
                }
            }, this.VBR_old_prepare = function(e, t, a, r, n, s, i, o, _) {
                var l, f = e.internal_flags,
                    u = 0,
                    h = 1,
                    c = 0;
                f.bitrate_index = f.VBR_max_bitrate;
                var b = y.ResvFrameBegin(e, new MeanBits(0)) / f.mode_gr;
                get_framebits(e, s);
                for (var m = 0; m < f.mode_gr; m++) {
                    var v = B.on_pe(e, t, o[m], b, m, 0);
                    f.mode_ext == p.MPG_MD_MS_LR && (ms_convert(f.l3_side, m), B.reduce_side(o[m], a[m], b, v));
                    for (var d = 0; d < f.channels_out; ++d) {
                        var g = f.l3_side.tt[m][d];
                        g.block_type != p.SHORT_TYPE ? (u = 1.28 / (1 + Math.exp(3.5 - t[m][d] / 300)) - .05, l = f.PSY.mask_adjust - u) : (u = 2.56 / (1 + Math.exp(3.5 - t[m][d] / 300)) - .14, l = f.PSY.mask_adjust_short - u), f.masking_lower = Math.pow(10, .1 * l), init_outer_loop(f, g), _[m][d] = B.calc_xmin(e, r[m][d], g, n[m][d]), 0 != _[m][d] && (h = 0), i[m][d] = 126, c += o[m][d]
                    }
                }
                for (var m = 0; m < f.mode_gr; m++)
                    for (var d = 0; d < f.channels_out; d++) c > s[f.VBR_max_bitrate] && (o[m][d] *= s[f.VBR_max_bitrate], o[m][d] /= c), i[m][d] > o[m][d] && (i[m][d] = o[m][d]);
                return h
            }, this.bitpressure_strategy = function(e, t, a, r) {
                for (var n = 0; n < e.mode_gr; n++)
                    for (var s = 0; s < e.channels_out; s++) {
                        for (var i = e.l3_side.tt[n][s], o = t[n][s], _ = 0, l = 0; l < i.psy_lmax; l++) o[_++] *= 1 + .029 * l * l / p.SBMAX_l / p.SBMAX_l;
                        if (i.block_type == p.SHORT_TYPE)
                            for (var l = i.sfb_smin; l < p.SBMAX_s; l++) o[_++] *= 1 + .029 * l * l / p.SBMAX_s / p.SBMAX_s, o[_++] *= 1 + .029 * l * l / p.SBMAX_s / p.SBMAX_s, o[_++] *= 1 + .029 * l * l / p.SBMAX_s / p.SBMAX_s;
                        r[n][s] = 0 | Math.max(a[n][s], .9 * r[n][s])
                    }
            }, this.VBR_new_prepare = function(e, t, a, r, n, s) {
                var i, o = e.internal_flags,
                    _ = 1,
                    l = 0,
                    f = 0;
                if (e.free_format) {
                    o.bitrate_index = 0;
                    var u = new MeanBits(l);
                    i = y.ResvFrameBegin(e, u), l = u.bits, n[0] = i
                } else {
                    o.bitrate_index = o.VBR_max_bitrate;
                    var u = new MeanBits(l);
                    y.ResvFrameBegin(e, u), l = u.bits, get_framebits(e, n), i = n[o.VBR_max_bitrate]
                }
                for (var h = 0; h < o.mode_gr; h++) {
                    B.on_pe(e, t, s[h], l, h, 0), o.mode_ext == p.MPG_MD_MS_LR && ms_convert(o.l3_side, h);
                    for (var c = 0; c < o.channels_out; ++c) {
                        var b = o.l3_side.tt[h][c];
                        o.masking_lower = Math.pow(10, .1 * o.PSY.mask_adjust), init_outer_loop(o, b), 0 != B.calc_xmin(e, a[h][c], b, r[h][c]) && (_ = 0), f += s[h][c]
                    }
                }
                for (var h = 0; h < o.mode_gr; h++)
                    for (var c = 0; c < o.channels_out; c++) f > i && (s[h][c] *= i, s[h][c] /= f);
                return _
            }, this.calc_target_bits = function(e, t, a, r, n, s) {
                var i, o, _, l, f = e.internal_flags,
                    u = f.l3_side,
                    h = 0;
                f.bitrate_index = f.VBR_max_bitrate;
                var c = new MeanBits(h);
                for (s[0] = y.ResvFrameBegin(e, c), h = c.bits, f.bitrate_index = 1, h = M.getframebits(e) - 8 * f.sideinfo_len, n[0] = h / (f.mode_gr * f.channels_out), h = e.VBR_mean_bitrate_kbps * e.framesize * 1e3, 0 != (1 & f.substep_shaping) && (h *= 1.09), h /= e.out_samplerate, h -= 8 * f.sideinfo_len, h /= f.mode_gr * f.channels_out, i = .93 + .07 * (11 - e.compression_ratio) / 5.5, .9 > i && (i = .9), i > 1 && (i = 1), o = 0; o < f.mode_gr; o++) {
                    var b = 0;
                    for (_ = 0; _ < f.channels_out; _++) {
                        if (r[o][_] = int(i * h), t[o][_] > 700) {
                            var m = int((t[o][_] - 700) / 1.4),
                                v = u.tt[o][_];
                            r[o][_] = int(i * h), v.block_type == p.SHORT_TYPE && h / 2 > m && (m = h / 2), m > 3 * h / 2 ? m = 3 * h / 2 : 0 > m && (m = 0), r[o][_] += m
                        }
                        r[o][_] > LameInternalFlags.MAX_BITS_PER_CHANNEL && (r[o][_] = LameInternalFlags.MAX_BITS_PER_CHANNEL), b += r[o][_]
                    }
                    if (b > LameInternalFlags.MAX_BITS_PER_GRANULE)
                        for (_ = 0; _ < f.channels_out; ++_) r[o][_] *= LameInternalFlags.MAX_BITS_PER_GRANULE, r[o][_] /= b
                }
                if (f.mode_ext == p.MPG_MD_MS_LR)
                    for (o = 0; o < f.mode_gr; o++) B.reduce_side(r[o], a[o], h * f.channels_out, LameInternalFlags.MAX_BITS_PER_GRANULE);
                for (l = 0, o = 0; o < f.mode_gr; o++)
                    for (_ = 0; _ < f.channels_out; _++) r[o][_] > LameInternalFlags.MAX_BITS_PER_CHANNEL && (r[o][_] = LameInternalFlags.MAX_BITS_PER_CHANNEL), l += r[o][_];
                if (l > s[0])
                    for (o = 0; o < f.mode_gr; o++)
                        for (_ = 0; _ < f.channels_out; _++) r[o][_] *= s[0], r[o][_] /= l
            }
        }
        var n = a(157),
            s = n.System,
            i = n.VbrMode,
            o = (n.Float, n.ShortBlock, n.Util),
            _ = n.Arrays,
            l = (n.new_array_n, n.new_byte, n.new_double, n.new_float),
            f = (n.new_float_n, n.new_int, n.new_int_n, n.assert),
            u = a(329),
            h = a(324),
            c = a(336),
            p = a(10),
            b = a(84),
            m = a(258);
        e.exports = r
    },
    105: function(e, t, a) {
        function r() {
            function e(e) {
                this.bits = 0 | e
            }

            function t(e, t, a, r, n, s) {
                var i = .5946 / t;
                for (_(e > 0), e >>= 1; 0 != e--;) n[s++] = i > a[r++] ? 0 : 1, n[s++] = i > a[r++] ? 0 : 1
            }

            function a(e, t, a, r, n, s) {
                _(e > 0), e >>= 1;
                var i = e % 2;
                for (e >>= 1; 0 != e--;) {
                    var o, l, f, u, h, c, p, b;
                    o = a[r++] * t, l = a[r++] * t, h = 0 | o, f = a[r++] * t, c = 0 | l, u = a[r++] * t, p = 0 | f, o += R.adj43[h], b = 0 | u, l += R.adj43[c], n[s++] = 0 | o, f += R.adj43[p], n[s++] = 0 | l, u += R.adj43[b], n[s++] = 0 | f, n[s++] = 0 | u
                }
                if (0 != i) {
                    var o, l, h, c;
                    o = a[r++] * t, l = a[r++] * t, h = 0 | o, c = 0 | l, o += R.adj43[h], l += R.adj43[c], n[s++] = 0 | o, n[s++] = 0 | l
                }
            }

            function n(e, r, n, s, o) {
                var f, u, h, c = 0,
                    p = 0,
                    b = 0,
                    m = 0,
                    v = r,
                    d = 0,
                    g = v,
                    w = 0,
                    S = e,
                    A = 0;
                for (h = null != o && s.global_gain == o.global_gain, u = s.block_type == l.SHORT_TYPE ? 38 : 21, f = 0; u >= f; f++) {
                    var M = -1;
                    if ((h || s.block_type == l.NORM_TYPE) && (M = s.global_gain - (s.scalefac[f] + (0 != s.preflag ? R.pretab[f] : 0) << s.scalefac_scale + 1) - 8 * s.subblock_gain[s.window[f]]), _(s.width[f] >= 0), h && o.step[f] == M) 0 != p && (a(p, n, S, A, g, w), p = 0), 0 != b && (t(b, n, S, A, g, w), b = 0);
                    else {
                        var y = s.width[f];
                        if (c + s.width[f] > s.max_nonzero_coeff) {
                            var B;
                            B = s.max_nonzero_coeff - c + 1, i.fill(r, s.max_nonzero_coeff, 576, 0), y = B, 0 > y && (y = 0), f = u + 1
                        }
                        if (0 == p && 0 == b && (g = v, w = d, S = e, A = m), null != o && o.sfb_count1 > 0 && f >= o.sfb_count1 && o.step[f] > 0 && M >= o.step[f] ? (0 != p && (a(p, n, S, A, g, w), p = 0, g = v, w = d, S = e, A = m), b += y) : (0 != b && (t(b, n, S, A, g, w), b = 0, g = v, w = d, S = e, A = m), p += y), 0 >= y) {
                            0 != b && (t(b, n, S, A, g, w), b = 0), 0 != p && (a(p, n, S, A, g, w), p = 0);
                            break
                        }
                    }
                    u >= f && (d += s.width[f], m += s.width[f], c += s.width[f])
                }
                0 != p && (a(p, n, S, A, g, w), p = 0), 0 != b && (t(b, n, S, A, g, w), b = 0)
            }

            function c(e, t, a) {
                var r = 0,
                    n = 0;
                do {
                    var s = e[t++],
                        i = e[t++];
                    s > r && (r = s), i > n && (n = i)
                } while (a > t);
                return n > r && (r = n), r
            }

            function p(e, t, a, r, n, s) {
                var i, o = 65536 * f.ht[r].xlen + f.ht[n].xlen,
                    _ = 0;
                do {
                    var l = e[t++],
                        u = e[t++];
                    0 != l && (l > 14 && (l = 15, _ += o), l *= 16), 0 != u && (u > 14 && (u = 15, _ += o), l += u), _ += f.largetbl[l]
                } while (a > t);
                return i = 65535 & _, _ >>= 16, _ > i && (_ = i, r = n), s.bits += _, r
            }

            function b(e, t, a, r) {
                var n = 0,
                    s = f.ht[1].hlen;
                do {
                    var i = 2 * e[t + 0] + e[t + 1];
                    t += 2, n += s[i]
                } while (a > t);
                return r.bits += n, 1
            }

            function m(e, t, a, r, n) {
                var s, i, o = 0,
                    _ = f.ht[r].xlen;
                i = 2 == r ? f.table23 : f.table56;
                do {
                    var l = e[t + 0] * _ + e[t + 1];
                    t += 2, o += i[l]
                } while (a > t);
                return s = 65535 & o, o >>= 16, o > s && (o = s, r++), n.bits += o, r
            }

            function v(e, t, a, r, n) {
                var s = 0,
                    i = 0,
                    o = 0,
                    _ = f.ht[r].xlen,
                    l = f.ht[r].hlen,
                    u = f.ht[r + 1].hlen,
                    h = f.ht[r + 2].hlen;
                do {
                    var c = e[t + 0] * _ + e[t + 1];
                    t += 2, s += l[c], i += u[c], o += h[c]
                } while (a > t);
                var p = r;
                return s > i && (s = i, p++), s > o && (s = o, p = r + 2), n.bits += s, p
            }

            function d(e, t, a, r) {
                var n = c(e, t, a);
                switch (n) {
                    case 0:
                        return n;
                    case 1:
                        return b(e, t, a, r);
                    case 2:
                    case 3:
                        return m(e, t, a, y[n - 1], r);
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
                        return v(e, t, a, y[n - 1], r);
                    default:
                        if (n > h.IXMAX_VAL) return r.bits = h.LARGE_BITS, -1;
                        n -= 15;
                        var s;
                        for (s = 24; 32 > s && !(f.ht[s].linmax >= n); s++);
                        var i;
                        for (i = s - 8; 24 > i && !(f.ht[i].linmax >= n); i++);
                        return p(e, t, a, i, s, r)
                }
            }

            function g(t, a, r, n, s, i, o) {
                for (var _ = a.big_values, l = 0; 22 >= l; l++) n[l] = h.LARGE_BITS;
                for (var l = 0; 16 > l; l++) {
                    var f = t.scalefac_band.l[l + 1];
                    if (f >= _) break;
                    var u = 0,
                        c = new e(u),
                        p = d(r, 0, f, c);
                    u = c.bits;
                    for (var b = 0; 8 > b; b++) {
                        var m = t.scalefac_band.l[l + b + 2];
                        if (m >= _) break;
                        var v = u;
                        c = new e(v);
                        var g = d(r, f, m, c);
                        v = c.bits, n[l + b] > v && (n[l + b] = v, s[l + b] = l, i[l + b] = p, o[l + b] = g)
                    }
                }
            }

            function w(t, a, r, n, s, i, o, _) {
                for (var f = a.big_values, u = 2; u < l.SBMAX_l + 1; u++) {
                    var h = t.scalefac_band.l[u];
                    if (h >= f) break;
                    var c = s[u - 2] + a.count1bits;
                    if (r.part2_3_length <= c) break;
                    var p = new e(c),
                        b = d(n, h, f, p);
                    c = p.bits, r.part2_3_length <= c || (r.assign(a), r.part2_3_length = c, r.region0_count = i[u - 2], r.region1_count = u - 2 - i[u - 2], r.table_select[0] = o[u - 2], r.table_select[1] = _[u - 2], r.table_select[2] = b)
                }
            }

            function S(e, t) {
                for (var a, r = t.tt[1][e], n = t.tt[0][e], s = 0; s < f.scfsi_band.length - 1; s++) {
                    for (a = f.scfsi_band[s]; a < f.scfsi_band[s + 1] && !(n.scalefac[a] != r.scalefac[a] && r.scalefac[a] >= 0); a++);
                    if (a == f.scfsi_band[s + 1]) {
                        for (a = f.scfsi_band[s]; a < f.scfsi_band[s + 1]; a++) r.scalefac[a] = -1;
                        t.scfsi[e][s] = 1
                    }
                }
                var i = 0,
                    o = 0;
                for (a = 0; 11 > a; a++) - 1 != r.scalefac[a] && (o++, i < r.scalefac[a] && (i = r.scalefac[a]));
                for (var _ = 0, u = 0; a < l.SBPSY_l; a++) - 1 != r.scalefac[a] && (u++, _ < r.scalefac[a] && (_ = r.scalefac[a]));
                for (var s = 0; 16 > s; s++)
                    if (i < B[s] && _ < E[s]) {
                        var h = T[s] * o + k[s] * u;
                        r.part2_length > h && (r.part2_length = h, r.scalefac_compress = s)
                    }
            }

            function A(e, t) {
                for (var a = 0; t > a; ++a)
                    if (e[a] < 0) return !1;
                return !0
            }
            var R = null;
            this.qupvt = null, this.setModules = function(e) {
                this.qupvt = e, R = e
            };
            var M = [
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
                y = [1, 2, 5, 7, 7, 10, 10, 13, 13, 13, 13, 13, 13, 13, 13];
            this.noquant_count_bits = function(t, a, r) {
                var n = a.l3_enc,
                    s = Math.min(576, a.max_nonzero_coeff + 2 >> 1 << 1);
                for (null != r && (r.sfb_count1 = 0); s > 1 && 0 == (n[s - 1] | n[s - 2]); s -= 2);
                a.count1 = s;
                for (var i = 0, o = 0; s > 3; s -= 4) {
                    var u;
                    if ((2147483647 & (n[s - 1] | n[s - 2] | n[s - 3] | n[s - 4])) > 1) break;
                    u = 2 * (2 * (2 * n[s - 4] + n[s - 3]) + n[s - 2]) + n[s - 1], i += f.t32l[u], o += f.t33l[u]
                }
                var h = i;
                if (a.count1table_select = 0, i > o && (h = o, a.count1table_select = 1), a.count1bits = h, a.big_values = s, 0 == s) return h;
                if (a.block_type == l.SHORT_TYPE) i = 3 * t.scalefac_band.s[3], i > a.big_values && (i = a.big_values), o = a.big_values;
                else if (a.block_type == l.NORM_TYPE) {
                    if (_(576 >= s), i = a.region0_count = t.bv_scf[s - 2], o = a.region1_count = t.bv_scf[s - 1], _(i + o + 2 < l.SBPSY_l), o = t.scalefac_band.l[i + o + 2], i = t.scalefac_band.l[i + 1], s > o) {
                        var c = new e(h);
                        a.table_select[2] = d(n, o, s, c), h = c.bits
                    }
                } else a.region0_count = 7, a.region1_count = l.SBMAX_l - 1 - 7 - 1, i = t.scalefac_band.l[8], o = s, i > o && (i = o);
                if (i = Math.min(i, s), o = Math.min(o, s), _(i >= 0), _(o >= 0), i > 0) {
                    var c = new e(h);
                    a.table_select[0] = d(n, 0, i, c), h = c.bits
                }
                if (o > i) {
                    var c = new e(h);
                    a.table_select[1] = d(n, i, o, c), h = c.bits
                }
                if (2 == t.use_best_huffman && (a.part2_3_length = h, best_huffman_divide(t, a), h = a.part2_3_length), null != r && a.block_type == l.NORM_TYPE) {
                    for (var p = 0; t.scalefac_band.l[p] < a.big_values;) p++;
                    r.sfb_count1 = p
                }
                return h
            }, this.count_bits = function(e, t, a, r) {
                var s = a.l3_enc,
                    i = h.IXMAX_VAL / R.IPOW20(a.global_gain);
                if (a.xrpow_max > i) return h.LARGE_BITS;
                if (n(t, s, R.IPOW20(a.global_gain), a, r), 0 != (2 & e.substep_shaping))
                    for (var o = 0, l = a.global_gain + a.scalefac_scale, f = .634521682242439 / R.IPOW20(l), u = 0; u < a.sfbmax; u++) {
                        var c = a.width[u];
                        if (_(c >= 0), 0 == e.pseudohalf[u]) o += c;
                        else {
                            var p;
                            for (p = o, o += c; o > p; ++p) s[p] = t[p] >= f ? s[p] : 0
                        }
                    }
                return this.noquant_count_bits(e, a, r)
            }, this.best_huffman_divide = function(t, a) {
                var r = new u,
                    n = a.l3_enc,
                    s = o(23),
                    i = o(23),
                    h = o(23),
                    c = o(23);
                if (a.block_type != l.SHORT_TYPE || 1 != t.mode_gr) {
                    r.assign(a), a.block_type == l.NORM_TYPE && (g(t, a, n, s, i, h, c), w(t, r, a, n, s, i, h, c));
                    var p = r.big_values;
                    if (!(0 == p || (n[p - 2] | n[p - 1]) > 1 || (p = a.count1 + 2, p > 576))) {
                        r.assign(a), r.count1 = p;
                        var b = 0,
                            m = 0;
                        for (_(576 >= p); p > r.big_values; p -= 4) {
                            var v = 2 * (2 * (2 * n[p - 4] + n[p - 3]) + n[p - 2]) + n[p - 1];
                            b += f.t32l[v], m += f.t33l[v]
                        }
                        if (r.big_values = p, r.count1table_select = 0, b > m && (b = m, r.count1table_select = 1), r.count1bits = b, r.block_type == l.NORM_TYPE) w(t, r, a, n, s, i, h, c);
                        else {
                            if (r.part2_3_length = b, b = t.scalefac_band.l[8], b > p && (b = p), b > 0) {
                                var S = new e(r.part2_3_length);
                                r.table_select[0] = d(n, 0, b, S), r.part2_3_length = S.bits
                            }
                            if (p > b) {
                                var S = new e(r.part2_3_length);
                                r.table_select[1] = d(n, b, p, S), r.part2_3_length = S.bits
                            }
                            a.part2_3_length > r.part2_3_length && a.assign(r)
                        }
                    }
                }
            };
            var B = [1, 1, 1, 1, 8, 2, 2, 2, 4, 4, 4, 8, 8, 8, 16, 16],
                E = [1, 2, 4, 8, 1, 2, 4, 8, 2, 4, 8, 2, 4, 8, 4, 8],
                T = [0, 0, 0, 0, 3, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4],
                k = [0, 1, 2, 3, 0, 1, 2, 3, 1, 2, 3, 1, 2, 3, 2, 3];
            r.slen1_tab = T, r.slen2_tab = k, this.best_scalefac_store = function(e, t, a, r) {
                var n, s, i, o, f = r.tt[t][a],
                    u = 0;
                for (i = 0, n = 0; n < f.sfbmax; n++) {
                    var h = f.width[n];
                    for (_(h >= 0), i += h, o = -h; 0 > o && 0 == f.l3_enc[o + i]; o++);
                    0 == o && (f.scalefac[n] = u = -2)
                }
                if (0 == f.scalefac_scale && 0 == f.preflag) {
                    var c = 0;
                    for (n = 0; n < f.sfbmax; n++) f.scalefac[n] > 0 && (c |= f.scalefac[n]);
                    if (0 == (1 & c) && 0 != c) {
                        for (n = 0; n < f.sfbmax; n++) f.scalefac[n] > 0 && (f.scalefac[n] >>= 1);
                        f.scalefac_scale = u = 1
                    }
                }
                if (0 == f.preflag && f.block_type != l.SHORT_TYPE && 2 == e.mode_gr) {
                    for (n = 11; n < l.SBPSY_l && !(f.scalefac[n] < R.pretab[n] && -2 != f.scalefac[n]); n++);
                    if (n == l.SBPSY_l) {
                        for (n = 11; n < l.SBPSY_l; n++) f.scalefac[n] > 0 && (f.scalefac[n] -= R.pretab[n]);
                        f.preflag = u = 1
                    }
                }
                for (s = 0; 4 > s; s++) r.scfsi[a][s] = 0;
                for (2 == e.mode_gr && 1 == t && r.tt[0][a].block_type != l.SHORT_TYPE && r.tt[1][a].block_type != l.SHORT_TYPE && (S(a, r), u = 0), n = 0; n < f.sfbmax; n++) - 2 == f.scalefac[n] && (f.scalefac[n] = 0);
                0 != u && (2 == e.mode_gr ? this.scale_bitcount(f) : this.scale_bitcount_lsf(e, f))
            };
            var x = [0, 18, 36, 54, 54, 36, 54, 72, 54, 72, 90, 72, 90, 108, 108, 126],
                P = [0, 18, 36, 54, 51, 35, 53, 71, 52, 70, 88, 69, 87, 105, 104, 122],
                I = [0, 10, 20, 30, 33, 21, 31, 41, 32, 42, 52, 43, 53, 63, 64, 74];
            this.scale_bitcount = function(e) {
                var t, a, r, n = 0,
                    s = 0,
                    i = e.scalefac;
                if (_(A(i, e.sfbmax)), e.block_type == l.SHORT_TYPE) r = x, 0 != e.mixed_block_flag && (r = P);
                else if (r = I, 0 == e.preflag) {
                    for (a = 11; a < l.SBPSY_l && !(i[a] < R.pretab[a]); a++);
                    if (a == l.SBPSY_l)
                        for (e.preflag = 1, a = 11; a < l.SBPSY_l; a++) i[a] -= R.pretab[a]
                }
                for (a = 0; a < e.sfbdivide; a++) n < i[a] && (n = i[a]);
                for (; a < e.sfbmax; a++) s < i[a] && (s = i[a]);
                for (e.part2_length = h.LARGE_BITS, t = 0; 16 > t; t++) n < B[t] && s < E[t] && e.part2_length > r[t] && (e.part2_length = r[t], e.scalefac_compress = t);
                return e.part2_length == h.LARGE_BITS
            };
            var L = [
                [15, 15, 7, 7],
                [15, 15, 7, 0],
                [7, 3, 0, 0],
                [15, 31, 31, 0],
                [7, 7, 7, 0],
                [3, 3, 0, 0]
            ];
            this.scale_bitcount_lsf = function(e, t) {
                var a, r, n, i, f, u, h, c, p = o(4),
                    b = t.scalefac;
                for (a = 0 != t.preflag ? 2 : 0, h = 0; 4 > h; h++) p[h] = 0;
                if (t.block_type == l.SHORT_TYPE) {
                    r = 1;
                    var m = R.nr_of_sfb_block[a][r];
                    for (c = 0, n = 0; 4 > n; n++)
                        for (i = m[n] / 3, h = 0; i > h; h++, c++)
                            for (f = 0; 3 > f; f++) b[3 * c + f] > p[n] && (p[n] = b[3 * c + f])
                } else {
                    r = 0;
                    var m = R.nr_of_sfb_block[a][r];
                    for (c = 0, n = 0; 4 > n; n++)
                        for (i = m[n], h = 0; i > h; h++, c++) b[c] > p[n] && (p[n] = b[c])
                }
                for (u = !1, n = 0; 4 > n; n++) p[n] > L[a][n] && (u = !0);
                if (!u) {
                    var v, d, g, w;
                    for (t.sfb_partition_table = R.nr_of_sfb_block[a][r], n = 0; 4 > n; n++) t.slen[n] = O[p[n]];
                    switch (v = t.slen[0], d = t.slen[1], g = t.slen[2], w = t.slen[3], a) {
                        case 0:
                            t.scalefac_compress = (5 * v + d << 4) + (g << 2) + w;
                            break;
                        case 1:
                            t.scalefac_compress = 400 + (5 * v + d << 2) + g;
                            break;
                        case 2:
                            t.scalefac_compress = 500 + 3 * v + d;
                            break;
                        default:
                            s.err.printf("intensity stereo not implemented yet\n")
                    }
                }
                if (!u)
                    for (_(null != t.sfb_partition_table), t.part2_length = 0, n = 0; 4 > n; n++) t.part2_length += t.slen[n] * t.sfb_partition_table[n];
                return u
            };
            var O = [0, 1, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4];
            this.huffman_init = function(e) {
                for (var t = 2; 576 >= t; t += 2) {
                    for (var a, r = 0; e.scalefac_band.l[++r] < t;);
                    for (a = M[r][0]; e.scalefac_band.l[a + 1] > t;) a--;
                    for (0 > a && (a = M[r][0]), e.bv_scf[t - 2] = a, a = M[r][1]; e.scalefac_band.l[a + e.bv_scf[t - 2] + 2] > t;) a--;
                    0 > a && (a = M[r][1]), e.bv_scf[t - 1] = a
                }
            }
        }
        var n = a(157),
            s = n.System,
            i = (n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays),
            o = (n.new_array_n, n.new_byte, n.new_double, n.new_float, n.new_float_n, n.new_int),
            _ = (n.new_int_n, n.assert),
            l = a(10),
            f = a(340),
            u = a(84),
            h = a(274);
        e.exports = r
    },
    11: function(e, t) {
        t.read = function(e, t, a, r, n) {
            var s, i, o = 8 * n - r - 1,
                _ = (1 << o) - 1,
                l = _ >> 1,
                f = -7,
                u = a ? n - 1 : 0,
                h = a ? -1 : 1,
                c = e[t + u];
            for (u += h, s = c & (1 << -f) - 1, c >>= -f, f += o; f > 0; s = 256 * s + e[t + u], u += h, f -= 8);
            for (i = s & (1 << -f) - 1, s >>= -f, f += r; f > 0; i = 256 * i + e[t + u], u += h, f -= 8);
            if (0 === s) s = 1 - l;
            else {
                if (s === _) return i ? NaN : (c ? -1 : 1) * (1 / 0);
                i += Math.pow(2, r), s -= l
            }
            return (c ? -1 : 1) * i * Math.pow(2, s - r)
        }, t.write = function(e, t, a, r, n, s) {
            var i, o, _, l = 8 * s - n - 1,
                f = (1 << l) - 1,
                u = f >> 1,
                h = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                c = r ? 0 : s - 1,
                p = r ? 1 : -1,
                b = 0 > t || 0 === t && 0 > 1 / t ? 1 : 0;
            for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (o = isNaN(t) ? 1 : 0, i = f) : (i = Math.floor(Math.log(t) / Math.LN2), t * (_ = Math.pow(2, -i)) < 1 && (i--, _ *= 2), t += i + u >= 1 ? h / _ : h * Math.pow(2, 1 - u), t * _ >= 2 && (i++, _ /= 2), i + u >= f ? (o = 0, i = f) : i + u >= 1 ? (o = (t * _ - 1) * Math.pow(2, n), i += u) : (o = t * Math.pow(2, u - 1) * Math.pow(2, n), i = 0)); n >= 8; e[a + c] = 255 & o, c += p, o /= 256, n -= 8);
            for (i = i << n | o, l += n; l > 0; e[a + c] = 255 & i, c += p, i /= 256, l -= 8);
            e[a + c - p] |= 128 * b
        }
    },
    110: function(e, t, a) {
        function r() {
            this.linprebuf = s(2 * o.MAX_ORDER), this.linpre = 0, this.lstepbuf = s(o.MAX_SAMPLES_PER_WINDOW + o.MAX_ORDER), this.lstep = 0, this.loutbuf = s(o.MAX_SAMPLES_PER_WINDOW + o.MAX_ORDER), this.lout = 0, this.rinprebuf = s(2 * o.MAX_ORDER), this.rinpre = 0, this.rstepbuf = s(o.MAX_SAMPLES_PER_WINDOW + o.MAX_ORDER), this.rstep = 0, this.routbuf = s(o.MAX_SAMPLES_PER_WINDOW + o.MAX_ORDER), this.rout = 0, this.sampleWindow = 0, this.totsamp = 0, this.lsum = 0, this.rsum = 0, this.freqindex = 0, this.first = 0, this.A = i(0 | o.STEPS_per_dB * o.MAX_dB), this.B = i(0 | o.STEPS_per_dB * o.MAX_dB)
        }
        var n = a(157),
            s = (n.System, n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float),
            i = (n.new_float_n, n.new_int),
            o = (n.new_int_n, n.assert, a(82));
        e.exports = r
    },
    122: function(e, t, a) {
        function r() {
            function e(e, t, a) {
                for (var n = 10, s = t + 238 - 14 - 286, o = -15; 0 > o; o++) {
                    var _, l, f;
                    _ = r[n + -10], l = e[s + -224] * _, f = e[t + 224] * _, _ = r[n + -9], l += e[s + -160] * _, f += e[t + 160] * _, _ = r[n + -8], l += e[s + -96] * _, f += e[t + 96] * _, _ = r[n + -7], l += e[s + -32] * _, f += e[t + 32] * _, _ = r[n + -6],
                        l += e[s + 32] * _, f += e[t + -32] * _, _ = r[n + -5], l += e[s + 96] * _, f += e[t + -96] * _, _ = r[n + -4], l += e[s + 160] * _, f += e[t + -160] * _, _ = r[n + -3], l += e[s + 224] * _, f += e[t + -224] * _, _ = r[n + -2], l += e[t + -256] * _, f -= e[s + 256] * _, _ = r[n + -1], l += e[t + -192] * _, f -= e[s + 192] * _, _ = r[n + 0], l += e[t + -128] * _, f -= e[s + 128] * _, _ = r[n + 1], l += e[t + -64] * _, f -= e[s + 64] * _, _ = r[n + 2], l += e[t + 0] * _, f -= e[s + 0] * _, _ = r[n + 3], l += e[t + 64] * _, f -= e[s + -64] * _, _ = r[n + 4], l += e[t + 128] * _, f -= e[s + -128] * _, _ = r[n + 5], l += e[t + 192] * _, f -= e[s + -192] * _, l *= r[n + 6], _ = f - l, a[30 + 2 * o] = f + l, a[31 + 2 * o] = r[n + 7] * _, n += 18, t--, s++
                }
                var l, f, u, h;
                f = e[t + -16] * r[n + -10], l = e[t + -32] * r[n + -2], f += (e[t + -48] - e[t + 16]) * r[n + -9], l += e[t + -96] * r[n + -1], f += (e[t + -80] + e[t + 48]) * r[n + -8], l += e[t + -160] * r[n + 0], f += (e[t + -112] - e[t + 80]) * r[n + -7], l += e[t + -224] * r[n + 1], f += (e[t + -144] + e[t + 112]) * r[n + -6], l -= e[t + 32] * r[n + 2], f += (e[t + -176] - e[t + 144]) * r[n + -5], l -= e[t + 96] * r[n + 3], f += (e[t + -208] + e[t + 176]) * r[n + -4], l -= e[t + 160] * r[n + 4], f += (e[t + -240] - e[t + 208]) * r[n + -3], l -= e[t + 224], u = l - f, h = l + f, f = a[14], l = a[15] - f, a[31] = h + f, a[30] = u + l, a[15] = u - l, a[14] = h - f;
                var c;
                c = a[28] - a[0], a[0] += a[28], a[28] = c * r[n + -36 + 7], c = a[29] - a[1], a[1] += a[29], a[29] = c * r[n + -36 + 7], c = a[26] - a[2], a[2] += a[26], a[26] = c * r[n + -72 + 7], c = a[27] - a[3], a[3] += a[27], a[27] = c * r[n + -72 + 7], c = a[24] - a[4], a[4] += a[24], a[24] = c * r[n + -108 + 7], c = a[25] - a[5], a[5] += a[25], a[25] = c * r[n + -108 + 7], c = a[22] - a[6], a[6] += a[22], a[22] = c * i.SQRT2, c = a[23] - a[7], a[7] += a[23], a[23] = c * i.SQRT2 - a[7], a[7] -= a[6], a[22] -= a[7], a[23] -= a[22], c = a[6], a[6] = a[31] - c, a[31] = a[31] + c, c = a[7], a[7] = a[30] - c, a[30] = a[30] + c, c = a[22], a[22] = a[15] - c, a[15] = a[15] + c, c = a[23], a[23] = a[14] - c, a[14] = a[14] + c, c = a[20] - a[8], a[8] += a[20], a[20] = c * r[n + -180 + 7], c = a[21] - a[9], a[9] += a[21], a[21] = c * r[n + -180 + 7], c = a[18] - a[10], a[10] += a[18], a[18] = c * r[n + -216 + 7], c = a[19] - a[11], a[11] += a[19], a[19] = c * r[n + -216 + 7], c = a[16] - a[12], a[12] += a[16], a[16] = c * r[n + -252 + 7], c = a[17] - a[13], a[13] += a[17], a[17] = c * r[n + -252 + 7], c = -a[20] + a[24], a[20] += a[24], a[24] = c * r[n + -216 + 7], c = -a[21] + a[25], a[21] += a[25], a[25] = c * r[n + -216 + 7], c = a[4] - a[8], a[4] += a[8], a[8] = c * r[n + -216 + 7], c = a[5] - a[9], a[5] += a[9], a[9] = c * r[n + -216 + 7], c = a[0] - a[12], a[0] += a[12], a[12] = c * r[n + -72 + 7], c = a[1] - a[13], a[1] += a[13], a[13] = c * r[n + -72 + 7], c = a[16] - a[28], a[16] += a[28], a[28] = c * r[n + -72 + 7], c = -a[17] + a[29], a[17] += a[29], a[29] = c * r[n + -72 + 7], c = i.SQRT2 * (a[2] - a[10]), a[2] += a[10], a[10] = c, c = i.SQRT2 * (a[3] - a[11]), a[3] += a[11], a[11] = c, c = i.SQRT2 * (-a[18] + a[26]), a[18] += a[26], a[26] = c - a[18], c = i.SQRT2 * (-a[19] + a[27]), a[19] += a[27], a[27] = c - a[19], c = a[2], a[19] -= a[3], a[3] -= c, a[2] = a[31] - c, a[31] += c, c = a[3], a[11] -= a[19], a[18] -= c, a[3] = a[30] - c, a[30] += c, c = a[18], a[27] -= a[11], a[19] -= c, a[18] = a[15] - c, a[15] += c, c = a[19], a[10] -= c, a[19] = a[14] - c, a[14] += c, c = a[10], a[11] -= c, a[10] = a[23] - c, a[23] += c, c = a[11], a[26] -= c, a[11] = a[22] - c, a[22] += c, c = a[26], a[27] -= c, a[26] = a[7] - c, a[7] += c, c = a[27], a[27] = a[6] - c, a[6] += c, c = i.SQRT2 * (a[0] - a[4]), a[0] += a[4], a[4] = c, c = i.SQRT2 * (a[1] - a[5]), a[1] += a[5], a[5] = c, c = i.SQRT2 * (a[16] - a[20]), a[16] += a[20], a[20] = c, c = i.SQRT2 * (a[17] - a[21]), a[17] += a[21], a[21] = c, c = -i.SQRT2 * (a[8] - a[12]), a[8] += a[12], a[12] = c - a[8], c = -i.SQRT2 * (a[9] - a[13]), a[9] += a[13], a[13] = c - a[9], c = -i.SQRT2 * (a[25] - a[29]), a[25] += a[29], a[29] = c - a[25], c = -i.SQRT2 * (a[24] + a[28]), a[24] -= a[28], a[28] = c - a[24], c = a[24] - a[16], a[24] = c, c = a[20] - c, a[20] = c, c = a[28] - c, a[28] = c, c = a[25] - a[17], a[25] = c, c = a[21] - c, a[21] = c, c = a[29] - c, a[29] = c, c = a[17] - a[1], a[17] = c, c = a[9] - c, a[9] = c, c = a[25] - c, a[25] = c, c = a[5] - c, a[5] = c, c = a[21] - c, a[21] = c, c = a[13] - c, a[13] = c, c = a[29] - c, a[29] = c, c = a[1] - a[0], a[1] = c, c = a[16] - c, a[16] = c, c = a[17] - c, a[17] = c, c = a[8] - c, a[8] = c, c = a[9] - c, a[9] = c, c = a[24] - c, a[24] = c, c = a[25] - c, a[25] = c, c = a[4] - c, a[4] = c, c = a[5] - c, a[5] = c, c = a[20] - c, a[20] = c, c = a[21] - c, a[21] = c, c = a[12] - c, a[12] = c, c = a[13] - c, a[13] = c, c = a[28] - c, a[28] = c, c = a[29] - c, a[29] = c, c = a[0], a[0] += a[31], a[31] -= c, c = a[1], a[1] += a[30], a[30] -= c, c = a[16], a[16] += a[15], a[15] -= c, c = a[17], a[17] += a[14], a[14] -= c, c = a[8], a[8] += a[23], a[23] -= c, c = a[9], a[9] += a[22], a[22] -= c, c = a[24], a[24] += a[7], a[7] -= c, c = a[25], a[25] += a[6], a[6] -= c, c = a[4], a[4] += a[27], a[27] -= c, c = a[5], a[5] += a[26], a[26] -= c, c = a[20], a[20] += a[11], a[11] -= c, c = a[21], a[21] += a[10], a[10] -= c, c = a[12], a[12] += a[19], a[19] -= c, c = a[13], a[13] += a[18], a[18] -= c, c = a[28], a[28] += a[3], a[3] -= c, c = a[29], a[29] += a[2], a[2] -= c
            }

            function t(e, t) {
                for (var a = 0; 3 > a; a++) {
                    var r, n, s, i, o, _;
                    i = e[t + 6] * u[l.SHORT_TYPE][0] - e[t + 15], r = e[t + 0] * u[l.SHORT_TYPE][2] - e[t + 9], n = i + r, s = i - r, i = e[t + 15] * u[l.SHORT_TYPE][0] + e[t + 6], r = e[t + 9] * u[l.SHORT_TYPE][2] + e[t + 0], o = i + r, _ = -i + r, r = 2.069978111953089e-11 * (e[t + 3] * u[l.SHORT_TYPE][1] - e[t + 12]), i = 2.069978111953089e-11 * (e[t + 12] * u[l.SHORT_TYPE][1] + e[t + 3]), e[t + 0] = 1.90752519173728e-11 * n + r, e[t + 15] = 1.90752519173728e-11 * -o + i, s = .8660254037844387 * s * 1.907525191737281e-11, o = .5 * o * 1.907525191737281e-11 + i, e[t + 3] = s - o, e[t + 6] = s + o, n = .5 * n * 1.907525191737281e-11 - r, _ = .8660254037844387 * _ * 1.907525191737281e-11, e[t + 9] = n + _, e[t + 12] = n - _, t++
                }
            }

            function a(e, t, a) {
                var r, n, s, i, o, _, l, f, u, h;
                s = a[17] - a[9], o = a[15] - a[11], _ = a[14] - a[12], l = a[0] + a[8], f = a[1] + a[7], u = a[2] + a[6], h = a[3] + a[5], e[t + 17] = l + u - h - (f - a[4]), n = (l + u - h) * c[19] + (f - a[4]), r = (s - o - _) * c[18], e[t + 5] = r + n, e[t + 6] = r - n, i = (a[16] - a[10]) * c[18], f = f * c[19] + a[4], r = s * c[12] + i + o * c[13] + _ * c[14], n = -l * c[16] + f - u * c[17] + h * c[15], e[t + 1] = r + n, e[t + 2] = r - n, r = s * c[13] - i - o * c[14] + _ * c[12], n = -l * c[17] + f - u * c[15] + h * c[16], e[t + 9] = r + n, e[t + 10] = r - n, r = s * c[14] - i + o * c[12] - _ * c[13], n = l * c[15] - f + u * c[16] - h * c[17], e[t + 13] = r + n, e[t + 14] = r - n;
                var p, b, m, v, d, g, w, S;
                p = a[8] - a[0], m = a[6] - a[2], v = a[5] - a[3], d = a[17] + a[9], g = a[16] + a[10], w = a[15] + a[11], S = a[14] + a[12], e[t + 0] = d + w + S + (g + a[13]), r = (d + w + S) * c[19] - (g + a[13]), n = (p - m + v) * c[18], e[t + 11] = r + n, e[t + 12] = r - n, b = (a[7] - a[1]) * c[18], g = a[13] - g * c[19], r = d * c[15] - g + w * c[16] + S * c[17], n = p * c[14] + b + m * c[12] + v * c[13], e[t + 3] = r + n, e[t + 4] = r - n, r = -d * c[17] + g - w * c[15] - S * c[16], n = p * c[13] + b - m * c[14] - v * c[12], e[t + 7] = r + n, e[t + 8] = r - n, r = -d * c[16] + g - w * c[17] - S * c[15], n = p * c[12] - b + m * c[13] - v * c[14], e[t + 15] = r + n, e[t + 16] = r - n
            }
            var r = [-.1482523854003001, 32.308141959636465, 296.40344946382766, 883.1344870032432, 11113.947376231741, 1057.2713659324597, 305.7402417275812, 30.825928907280012, 3.8533188138216365, 59.42900443849514, 709.5899960123345, 5281.91112291017, -5829.66483675846, -817.6293103748613, -76.91656988279972, -4.594269939176596, .9063471690191471, .1960342806591213, -.15466694054279598, 34.324387823855965, 301.8067566458425, 817.599602898885, 11573.795901679885, 1181.2520595540152, 321.59731579894424, 31.232021761053772, 3.7107095756221318, 53.650946155329365, 684.167428119626, 5224.56624370173, -6366.391851890084, -908.9766368219582, -89.83068876699639, -5.411397422890401, .8206787908286602, .3901806440322567, -.16070888947830023, 36.147034243915876, 304.11815768187864, 732.7429163887613, 11989.60988270091, 1300.012278487897, 335.28490093152146, 31.48816102859945, 3.373875931311736, 47.232241542899175, 652.7371796173471, 5132.414255594984, -6909.087078780055, -1001.9990371107289, -103.62185754286375, -6.104916304710272, .7416505462720353, .5805693545089249, -.16636367662261495, 37.751650073343995, 303.01103387567713, 627.9747488785183, 12358.763425278165, 1412.2779918482834, 346.7496836825721, 31.598286663170416, 3.1598635433980946, 40.57878626349686, 616.1671130880391, 5007.833007176154, -7454.040671756168, -1095.7960341867115, -118.24411666465777, -6.818469345853504, .6681786379192989, .7653668647301797, -.1716176790982088, 39.11551877123304, 298.3413246578966, 503.5259106886539, 12679.589408408976, 1516.5821921214542, 355.9850766329023, 31.395241710249053, 2.9164211881972335, 33.79716964664243, 574.8943997801362, 4853.234992253242, -7997.57021486075, -1189.7624067269965, -133.6444792601766, -7.7202770609839915, .5993769336819237, .9427934736519954, -.17645823955292173, 40.21879108166477, 289.9982036694474, 359.3226160751053, 12950.259102786438, 1612.1013903507662, 362.85067106591504, 31.045922092242872, 2.822222032597987, 26.988862316190684, 529.8996541764288, 4671.371946949588, -8535.899136645805, -1282.5898586244496, -149.58553632943463, -8.643494270763135, .5345111359507916, 1.111140466039205, -.36174739330527045, 41.04429910497807, 277.5463268268618, 195.6386023135583, 13169.43812144731, 1697.6433561479398, 367.40983966190305, 30.557037410382826, 2.531473372857427, 20.070154905927314, 481.50208566532336, 4464.970341588308, -9065.36882077239, -1373.62841526722, -166.1660487028118, -9.58289321133207, .4729647758913199, 1.268786568327291, -.36970682634889585, 41.393213350082036, 261.2935935556502, 12.935476055240873, 13336.131683328815, 1772.508612059496, 369.76534388639965, 29.751323653701338, 2.4023193045459172, 13.304795348228817, 430.5615775526625, 4237.0568611071185, -9581.931701634761, -1461.6913552409758, -183.12733958476446, -10.718010163869403, .41421356237309503, 1.414213562373095, -.37677560326535325, 41.619486213528496, 241.05423794991074, -187.94665032361226, 13450.063605744153, 1836.153896465782, 369.4908799925761, 29.001847876923147, 2.0714759319987186, 6.779591200894186, 377.7767837205709, 3990.386575512536, -10081.709459700915, -1545.947424837898, -200.3762958015653, -11.864482073055006, .3578057213145241, 1.546020906725474, -.3829366947518991, 41.1516456456653, 216.47684307105183, -406.1569483347166, 13511.136535077321, 1887.8076599260432, 367.3025214564151, 28.136213436723654, 1.913880671464418, .3829366947518991, 323.85365704338597, 3728.1472257487526, -10561.233882199509, -1625.2025997821418, -217.62525175416, -13.015432208941645, .3033466836073424, 1.66293922460509, -.5822628872992417, 40.35639251440489, 188.20071124269245, -640.2706748618148, 13519.21490106562, 1927.6022433578062, 362.8197642637487, 26.968821921868447, 1.7463817695935329, -5.62650678237171, 269.3016715297017, 3453.386536448852, -11016.145278780888, -1698.6569643425091, -234.7658734267683, -14.16351421663124, .2504869601913055, 1.76384252869671, -.5887180101749253, 39.23429103868072, 155.76096234403798, -889.2492977967378, 13475.470561874661, 1955.0535223723712, 356.4450994756727, 25.894952980042156, 1.5695032905781554, -11.181939564328772, 214.80884394039484, 3169.1640829158237, -11443.321309975563, -1765.1588461316153, -251.68908574481912, -15.49755935939164, .198912367379658, 1.847759065022573, -.7912582233652842, 37.39369355329111, 119.699486012458, -1151.0956593239027, 13380.446257078214, 1970.3952110853447, 348.01959814116185, 24.731487364283044, 1.3850130831637748, -16.421408865300393, 161.05030052864092, 2878.3322807850063, -11838.991423510031, -1823.985884688674, -268.2854986386903, -16.81724543849939, .1483359875383474, 1.913880671464418, -.7960642926861912, 35.2322109610459, 80.01928065061526, -1424.0212633405113, 13235.794061869668, 1973.804052543835, 337.9908651258184, 23.289159354463873, 1.3934255946442087, -21.099669467133474, 108.48348407242611, 2583.700758091299, -12199.726194855148, -1874.2780658979746, -284.2467154529415, -18.11369784385905, .09849140335716425, 1.961570560806461, -.998795456205172, 32.56307803611191, 36.958364584370486, -1706.075448829146, 13043.287458812016, 1965.3831106103316, 326.43182772364605, 22.175018750622293, 1.198638339011324, -25.371248002043963, 57.53505923036915, 2288.41886619975, -12522.674544337233, -1914.8400385312243, -299.26241273417224, -19.37805630698734, .04912684976946725, 1.990369453344394, .035780907 * i.SQRT2 * .5 / 2384e-9, .017876148 * i.SQRT2 * .5 / 2384e-9, .003134727 * i.SQRT2 * .5 / 2384e-9, .002457142 * i.SQRT2 * .5 / 2384e-9, 971317e-9 * i.SQRT2 * .5 / 2384e-9, 218868e-9 * i.SQRT2 * .5 / 2384e-9, 101566e-9 * i.SQRT2 * .5 / 2384e-9, 13828e-9 * i.SQRT2 * .5 / 2384e-9, 12804.797818791945, 1945.5515939597317, 313.4244966442953, 49591e-9 / 2384e-9, 1995.1556208053692, 21458e-9 / 2384e-9, -69618e-9 / 2384e-9],
                n = 12,
                f = 36,
                u = [
                    [2.382191739347913e-13, 6.423305872147834e-13, 9.400849094049688e-13, 1.122435026096556e-12, 1.183840321267481e-12, 1.122435026096556e-12, 9.40084909404969e-13, 6.423305872147839e-13, 2.382191739347918e-13, 5.456116108943412e-12, 4.878985199565852e-12, 4.240448995017367e-12, 3.559909094758252e-12, 2.858043359288075e-12, 2.156177623817898e-12, 1.475637723558783e-12, 8.371015190102974e-13, 2.599706096327376e-13, -5.456116108943412e-12, -4.878985199565852e-12, -4.240448995017367e-12, -3.559909094758252e-12, -2.858043359288076e-12, -2.156177623817898e-12, -1.475637723558783e-12, -8.371015190102975e-13, -2.599706096327376e-13, -2.382191739347923e-13, -6.423305872147843e-13, -9.400849094049696e-13, -1.122435026096556e-12, -1.183840321267481e-12, -1.122435026096556e-12, -9.400849094049694e-13, -6.42330587214784e-13, -2.382191739347918e-13],
                    [2.382191739347913e-13, 6.423305872147834e-13, 9.400849094049688e-13, 1.122435026096556e-12, 1.183840321267481e-12, 1.122435026096556e-12, 9.400849094049688e-13, 6.423305872147841e-13, 2.382191739347918e-13, 5.456116108943413e-12, 4.878985199565852e-12, 4.240448995017367e-12, 3.559909094758253e-12, 2.858043359288075e-12, 2.156177623817898e-12, 1.475637723558782e-12, 8.371015190102975e-13, 2.599706096327376e-13, -5.461314069809755e-12, -4.921085770524055e-12, -4.343405037091838e-12, -3.732668368707687e-12, -3.093523840190885e-12, -2.430835727329465e-12, -1.734679010007751e-12, -9.74825365660928e-13, -2.797435120168326e-13, 0, 0, 0, 0, 0, 0, -2.283748241799531e-13, -4.037858874020686e-13, -2.146547464825323e-13],
                    [.1316524975873958, .414213562373095, .7673269879789602, 1.091308501069271, 1.303225372841206, 1.56968557711749, 1.920982126971166, 2.414213562373094, 3.171594802363212, 4.510708503662055, 7.595754112725146, 22.90376554843115, .984807753012208, .6427876096865394, .3420201433256688, .9396926207859084, -.1736481776669303, -.7660444431189779, .8660254037844387, .5, -.5144957554275265, -.4717319685649723, -.3133774542039019, -.1819131996109812, -.09457419252642064, -.04096558288530405, -.01419856857247115, -.003699974673760037, .8574929257125442, .8817419973177052, .9496286491027329, .9833145924917901, .9955178160675857, .9991605581781475, .999899195244447, .9999931550702802],
                    [0, 0, 0, 0, 0, 0, 2.283748241799531e-13, 4.037858874020686e-13, 2.146547464825323e-13, 5.461314069809755e-12, 4.921085770524055e-12, 4.343405037091838e-12, 3.732668368707687e-12, 3.093523840190885e-12, 2.430835727329466e-12, 1.734679010007751e-12, 9.74825365660928e-13, 2.797435120168326e-13, -5.456116108943413e-12, -4.878985199565852e-12, -4.240448995017367e-12, -3.559909094758253e-12, -2.858043359288075e-12, -2.156177623817898e-12, -1.475637723558782e-12, -8.371015190102975e-13, -2.599706096327376e-13, -2.382191739347913e-13, -6.423305872147834e-13, -9.400849094049688e-13, -1.122435026096556e-12, -1.183840321267481e-12, -1.122435026096556e-12, -9.400849094049688e-13, -6.423305872147841e-13, -2.382191739347918e-13]
                ],
                h = u[l.SHORT_TYPE],
                c = u[l.SHORT_TYPE],
                p = u[l.SHORT_TYPE],
                b = u[l.SHORT_TYPE],
                m = [0, 1, 16, 17, 8, 9, 24, 25, 4, 5, 20, 21, 12, 13, 28, 29, 2, 3, 18, 19, 10, 11, 26, 27, 6, 7, 22, 23, 14, 15, 30, 31];
            this.mdct_sub48 = function(r, i, c) {
                for (var v = i, d = 286, g = 0; g < r.channels_out; g++) {
                    for (var w = 0; w < r.mode_gr; w++) {
                        for (var S, A = r.l3_side.tt[w][g], R = A.xr, M = 0, y = r.sb_sample[g][1 - w], B = 0, E = 0; 9 > E; E++)
                            for (e(v, d, y[B]), e(v, d + 32, y[B + 1]), B += 2, d += 64, S = 1; 32 > S; S += 2) y[B - 1][S] *= -1;
                        for (S = 0; 32 > S; S++, M += 18) {
                            var T = A.block_type,
                                k = r.sb_sample[g][w],
                                x = r.sb_sample[g][1 - w];
                            if (0 != A.mixed_block_flag && 2 > S && (T = 0), r.amp_filter[S] < 1e-12) o.fill(R, M + 0, M + 18, 0);
                            else {
                                if (r.amp_filter[S] < 1)
                                    for (var E = 0; 18 > E; E++) x[E][m[S]] *= r.amp_filter[S];
                                if (T == l.SHORT_TYPE) {
                                    for (var E = -n / 4; 0 > E; E++) {
                                        var P = u[l.SHORT_TYPE][E + 3];
                                        R[M + 3 * E + 9] = k[9 + E][m[S]] * P - k[8 - E][m[S]], R[M + 3 * E + 18] = k[14 - E][m[S]] * P + k[15 + E][m[S]], R[M + 3 * E + 10] = k[15 + E][m[S]] * P - k[14 - E][m[S]], R[M + 3 * E + 19] = x[2 - E][m[S]] * P + x[3 + E][m[S]], R[M + 3 * E + 11] = x[3 + E][m[S]] * P - x[2 - E][m[S]], R[M + 3 * E + 20] = x[8 - E][m[S]] * P + x[9 + E][m[S]]
                                    }
                                    t(R, M)
                                } else {
                                    for (var I = _(18), E = -f / 4; 0 > E; E++) {
                                        var L, O;
                                        L = u[T][E + 27] * x[E + 9][m[S]] + u[T][E + 36] * x[8 - E][m[S]], O = u[T][E + 9] * k[E + 9][m[S]] - u[T][E + 18] * k[8 - E][m[S]], I[E + 9] = L - O * h[3 + E + 9], I[E + 18] = L * h[3 + E + 9] + O
                                    }
                                    a(R, M, I)
                                }
                            }
                            if (T != l.SHORT_TYPE && 0 != S)
                                for (var E = 7; E >= 0; --E) {
                                    var V, N;
                                    V = R[M + E] * p[20 + E] + R[M + -1 - E] * b[28 + E], N = R[M + E] * b[28 + E] - R[M + -1 - E] * p[20 + E], R[M + -1 - E] = V, R[M + E] = N
                                }
                        }
                    }
                    if (v = c, d = 286, 1 == r.mode_gr)
                        for (var H = 0; 18 > H; H++) s.arraycopy(r.sb_sample[g][1][H], 0, r.sb_sample[g][0][H], 0, 32)
                }
            }
        }
        var n = a(157),
            s = n.System,
            i = (n.VbrMode, n.Float, n.ShortBlock, n.Util),
            o = n.Arrays,
            _ = (n.new_array_n, n.new_byte, n.new_double, n.new_float),
            l = (n.new_float_n, n.new_int, n.new_int_n, n.assert, a(10));
        e.exports = r
    },
    133: function(e, t, a) {
        "use strict";
        (function(e) {
            function r() {
                try {
                    var e = new Uint8Array(1);
                    return e.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                            return 42
                        }
                    }, 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
                } catch (t) {
                    return !1
                }
            }

            function n() {
                return i.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
            }

            function s(e, t) {
                if (n() < t) throw new RangeError("Invalid typed array length");
                return i.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t), e.__proto__ = i.prototype) : (null === e && (e = new i(t)), e.length = t), e
            }

            function i(e, t, a) {
                if (!(i.TYPED_ARRAY_SUPPORT || this instanceof i)) return new i(e, t, a);
                if ("number" == typeof e) {
                    if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
                    return f(this, e)
                }
                return o(this, e, t, a)
            }

            function o(e, t, a, r) {
                if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
                return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? c(e, t, a, r) : "string" == typeof t ? u(e, t, a) : p(e, t)
            }

            function _(e) {
                if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
                if (0 > e) throw new RangeError('"size" argument must not be negative')
            }

            function l(e, t, a, r) {
                return _(t), 0 >= t ? s(e, t) : void 0 !== a ? "string" == typeof r ? s(e, t).fill(a, r) : s(e, t).fill(a) : s(e, t)
            }

            function f(e, t) {
                if (_(t), e = s(e, 0 > t ? 0 : 0 | b(t)), !i.TYPED_ARRAY_SUPPORT)
                    for (var a = 0; t > a; ++a) e[a] = 0;
                return e
            }

            function u(e, t, a) {
                if (("string" != typeof a || "" === a) && (a = "utf8"), !i.isEncoding(a)) throw new TypeError('"encoding" must be a valid string encoding');
                var r = 0 | v(t, a);
                e = s(e, r);
                var n = e.write(t, a);
                return n !== r && (e = e.slice(0, n)), e
            }

            function h(e, t) {
                var a = t.length < 0 ? 0 : 0 | b(t.length);
                e = s(e, a);
                for (var r = 0; a > r; r += 1) e[r] = 255 & t[r];
                return e
            }

            function c(e, t, a, r) {
                if (t.byteLength, 0 > a || t.byteLength < a) throw new RangeError("'offset' is out of bounds");
                if (t.byteLength < a + (r || 0)) throw new RangeError("'length' is out of bounds");
                return t = void 0 === a && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, a) : new Uint8Array(t, a, r), i.TYPED_ARRAY_SUPPORT ? (e = t, e.__proto__ = i.prototype) : e = h(e, t), e
            }

            function p(e, t) {
                if (i.isBuffer(t)) {
                    var a = 0 | b(t.length);
                    return e = s(e, a), 0 === e.length ? e : (t.copy(e, 0, 0, a), e)
                }
                if (t) {
                    if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || Q(t.length) ? s(e, 0) : h(e, t);
                    if ("Buffer" === t.type && $(t.data)) return h(e, t.data)
                }
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
            }

            function b(e) {
                if (e >= n()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + n().toString(16) + " bytes");
                return 0 | e
            }

            function m(e) {
                return +e != e && (e = 0), i.alloc(+e)
            }

            function v(e, t) {
                if (i.isBuffer(e)) return e.length;
                if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
                "string" != typeof e && (e = "" + e);
                var a = e.length;
                if (0 === a) return 0;
                for (var r = !1;;) switch (t) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return a;
                    case "utf8":
                    case "utf-8":
                    case void 0:
                        return j(e).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * a;
                    case "hex":
                        return a >>> 1;
                    case "base64":
                        return K(e).length;
                    default:
                        if (r) return j(e).length;
                        t = ("" + t).toLowerCase(), r = !0
                }
            }

            function d(e, t, a) {
                var r = !1;
                if ((void 0 === t || 0 > t) && (t = 0), t > this.length) return "";
                if ((void 0 === a || a > this.length) && (a = this.length), 0 >= a) return "";
                if (a >>>= 0, t >>>= 0, t >= a) return "";
                for (e || (e = "utf8");;) switch (e) {
                    case "hex":
                        return L(this, t, a);
                    case "utf8":
                    case "utf-8":
                        return k(this, t, a);
                    case "ascii":
                        return P(this, t, a);
                    case "latin1":
                    case "binary":
                        return I(this, t, a);
                    case "base64":
                        return T(this, t, a);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return O(this, t, a);
                    default:
                        if (r) throw new TypeError("Unknown encoding: " + e);
                        e = (e + "").toLowerCase(), r = !0
                }
            }

            function g(e, t, a) {
                var r = e[t];
                e[t] = e[a], e[a] = r
            }

            function w(e, t, a, r, n) {
                if (0 === e.length) return -1;
                if ("string" == typeof a ? (r = a, a = 0) : a > 2147483647 ? a = 2147483647 : -2147483648 > a && (a = -2147483648), a = +a, isNaN(a) && (a = n ? 0 : e.length - 1), 0 > a && (a = e.length + a), a >= e.length) {
                    if (n) return -1;
                    a = e.length - 1
                } else if (0 > a) {
                    if (!n) return -1;
                    a = 0
                }
                if ("string" == typeof t && (t = i.from(t, r)), i.isBuffer(t)) return 0 === t.length ? -1 : S(e, t, a, r, n);
                if ("number" == typeof t) return t = 255 & t, i.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? n ? Uint8Array.prototype.indexOf.call(e, t, a) : Uint8Array.prototype.lastIndexOf.call(e, t, a) : S(e, [t], a, r, n);
                throw new TypeError("val must be string, number or Buffer")
            }

            function S(e, t, a, r, n) {
                function s(e, t) {
                    return 1 === i ? e[t] : e.readUInt16BE(t * i)
                }
                var i = 1,
                    o = e.length,
                    _ = t.length;
                if (void 0 !== r && (r = String(r).toLowerCase(), "ucs2" === r || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                    if (e.length < 2 || t.length < 2) return -1;
                    i = 2, o /= 2, _ /= 2, a /= 2
                }
                var l;
                if (n) {
                    var f = -1;
                    for (l = a; o > l; l++)
                        if (s(e, l) === s(t, -1 === f ? 0 : l - f)) {
                            if (-1 === f && (f = l), l - f + 1 === _) return f * i
                        } else -1 !== f && (l -= l - f), f = -1
                } else
                    for (a + _ > o && (a = o - _), l = a; l >= 0; l--) {
                        for (var u = !0, h = 0; _ > h; h++)
                            if (s(e, l + h) !== s(t, h)) {
                                u = !1;
                                break
                            }
                        if (u) return l
                    }
                return -1
            }

            function A(e, t, a, r) {
                a = Number(a) || 0;
                var n = e.length - a;
                r ? (r = Number(r), r > n && (r = n)) : r = n;
                var s = t.length;
                if (s % 2 !== 0) throw new TypeError("Invalid hex string");
                r > s / 2 && (r = s / 2);
                for (var i = 0; r > i; ++i) {
                    var o = parseInt(t.substr(2 * i, 2), 16);
                    if (isNaN(o)) return i;
                    e[a + i] = o
                }
                return i
            }

            function R(e, t, a, r) {
                return Z(j(t, e.length - a), e, a, r)
            }

            function M(e, t, a, r) {
                return Z(G(t), e, a, r)
            }

            function y(e, t, a, r) {
                return M(e, t, a, r)
            }

            function B(e, t, a, r) {
                return Z(K(t), e, a, r)
            }

            function E(e, t, a, r) {
                return Z(z(t, e.length - a), e, a, r)
            }

            function T(e, t, a) {
                return 0 === t && a === e.length ? W.fromByteArray(e) : W.fromByteArray(e.slice(t, a))
            }

            function k(e, t, a) {
                a = Math.min(e.length, a);
                for (var r = [], n = t; a > n;) {
                    var s = e[n],
                        i = null,
                        o = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
                    if (a >= n + o) {
                        var _, l, f, u;
                        switch (o) {
                            case 1:
                                128 > s && (i = s);
                                break;
                            case 2:
                                _ = e[n + 1], 128 === (192 & _) && (u = (31 & s) << 6 | 63 & _, u > 127 && (i = u));
                                break;
                            case 3:
                                _ = e[n + 1], l = e[n + 2], 128 === (192 & _) && 128 === (192 & l) && (u = (15 & s) << 12 | (63 & _) << 6 | 63 & l, u > 2047 && (55296 > u || u > 57343) && (i = u));
                                break;
                            case 4:
                                _ = e[n + 1], l = e[n + 2], f = e[n + 3], 128 === (192 & _) && 128 === (192 & l) && 128 === (192 & f) && (u = (15 & s) << 18 | (63 & _) << 12 | (63 & l) << 6 | 63 & f, u > 65535 && 1114112 > u && (i = u))
                        }
                    }
                    null === i ? (i = 65533, o = 1) : i > 65535 && (i -= 65536, r.push(i >>> 10 & 1023 | 55296), i = 56320 | 1023 & i), r.push(i), n += o
                }
                return x(r)
            }

            function x(e) {
                var t = e.length;
                if (ee >= t) return String.fromCharCode.apply(String, e);
                for (var a = "", r = 0; t > r;) a += String.fromCharCode.apply(String, e.slice(r, r += ee));
                return a
            }

            function P(e, t, a) {
                var r = "";
                a = Math.min(e.length, a);
                for (var n = t; a > n; ++n) r += String.fromCharCode(127 & e[n]);
                return r
            }

            function I(e, t, a) {
                var r = "";
                a = Math.min(e.length, a);
                for (var n = t; a > n; ++n) r += String.fromCharCode(e[n]);
                return r
            }

            function L(e, t, a) {
                var r = e.length;
                (!t || 0 > t) && (t = 0), (!a || 0 > a || a > r) && (a = r);
                for (var n = "", s = t; a > s; ++s) n += U(e[s]);
                return n
            }

            function O(e, t, a) {
                for (var r = e.slice(t, a), n = "", s = 0; s < r.length; s += 2) n += String.fromCharCode(r[s] + 256 * r[s + 1]);
                return n
            }

            function V(e, t, a) {
                if (e % 1 !== 0 || 0 > e) throw new RangeError("offset is not uint");
                if (e + t > a) throw new RangeError("Trying to access beyond buffer length")
            }

            function N(e, t, a, r, n, s) {
                if (!i.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (t > n || s > t) throw new RangeError('"value" argument is out of bounds');
                if (a + r > e.length) throw new RangeError("Index out of range")
            }

            function H(e, t, a, r) {
                0 > t && (t = 65535 + t + 1);
                for (var n = 0, s = Math.min(e.length - a, 2); s > n; ++n) e[a + n] = (t & 255 << 8 * (r ? n : 1 - n)) >>> 8 * (r ? n : 1 - n)
            }

            function D(e, t, a, r) {
                0 > t && (t = 4294967295 + t + 1);
                for (var n = 0, s = Math.min(e.length - a, 4); s > n; ++n) e[a + n] = t >>> 8 * (r ? n : 3 - n) & 255
            }

            function Y(e, t, a, r, n, s) {
                if (a + r > e.length) throw new RangeError("Index out of range");
                if (0 > a) throw new RangeError("Index out of range")
            }

            function X(e, t, a, r, n) {
                return n || Y(e, t, a, 4, 3.4028234663852886e38, -3.4028234663852886e38), J.write(e, t, a, r, 23, 4), a + 4
            }

            function F(e, t, a, r, n) {
                return n || Y(e, t, a, 8, 1.7976931348623157e308, -1.7976931348623157e308), J.write(e, t, a, r, 52, 8), a + 8
            }

            function C(e) {
                if (e = q(e).replace(te, ""), e.length < 2) return "";
                for (; e.length % 4 !== 0;) e += "=";
                return e
            }

            function q(e) {
                return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
            }

            function U(e) {
                return 16 > e ? "0" + e.toString(16) : e.toString(16)
            }

            function j(e, t) {
                t = t || 1 / 0;
                for (var a, r = e.length, n = null, s = [], i = 0; r > i; ++i) {
                    if (a = e.charCodeAt(i), a > 55295 && 57344 > a) {
                        if (!n) {
                            if (a > 56319) {
                                (t -= 3) > -1 && s.push(239, 191, 189);
                                continue
                            }
                            if (i + 1 === r) {
                                (t -= 3) > -1 && s.push(239, 191, 189);
                                continue
                            }
                            n = a;
                            continue
                        }
                        if (56320 > a) {
                            (t -= 3) > -1 && s.push(239, 191, 189), n = a;
                            continue
                        }
                        a = (n - 55296 << 10 | a - 56320) + 65536
                    } else n && (t -= 3) > -1 && s.push(239, 191, 189);
                    if (n = null, 128 > a) {
                        if ((t -= 1) < 0) break;
                        s.push(a)
                    } else if (2048 > a) {
                        if ((t -= 2) < 0) break;
                        s.push(a >> 6 | 192, 63 & a | 128)
                    } else if (65536 > a) {
                        if ((t -= 3) < 0) break;
                        s.push(a >> 12 | 224, a >> 6 & 63 | 128, 63 & a | 128)
                    } else {
                        if (!(1114112 > a)) throw new Error("Invalid code point");
                        if ((t -= 4) < 0) break;
                        s.push(a >> 18 | 240, a >> 12 & 63 | 128, a >> 6 & 63 | 128, 63 & a | 128)
                    }
                }
                return s
            }

            function G(e) {
                for (var t = [], a = 0; a < e.length; ++a) t.push(255 & e.charCodeAt(a));
                return t
            }

            function z(e, t) {
                for (var a, r, n, s = [], i = 0; i < e.length && !((t -= 2) < 0); ++i) a = e.charCodeAt(i), r = a >> 8, n = a % 256, s.push(n), s.push(r);
                return s
            }

            function K(e) {
                return W.toByteArray(C(e))
            }

            function Z(e, t, a, r) {
                for (var n = 0; r > n && !(n + a >= t.length || n >= e.length); ++n) t[n + a] = e[n];
                return n
            }

            function Q(e) {
                return e !== e
            }
            var W = a(319),
                J = a(11),
                $ = a(69);
            t.Buffer = i, t.SlowBuffer = m, t.INSPECT_MAX_BYTES = 50, i.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : r(), t.kMaxLength = n(), i.poolSize = 8192, i._augment = function(e) {
                return e.__proto__ = i.prototype, e
            }, i.from = function(e, t, a) {
                return o(null, e, t, a)
            }, i.TYPED_ARRAY_SUPPORT && (i.prototype.__proto__ = Uint8Array.prototype, i.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && i[Symbol.species] === i && Object.defineProperty(i, Symbol.species, {
                value: null,
                configurable: !0
            })), i.alloc = function(e, t, a) {
                return l(null, e, t, a)
            }, i.allocUnsafe = function(e) {
                return f(null, e)
            }, i.allocUnsafeSlow = function(e) {
                return f(null, e)
            }, i.isBuffer = function(e) {
                return !(null == e || !e._isBuffer)
            }, i.compare = function(e, t) {
                if (!i.isBuffer(e) || !i.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
                if (e === t) return 0;
                for (var a = e.length, r = t.length, n = 0, s = Math.min(a, r); s > n; ++n)
                    if (e[n] !== t[n]) {
                        a = e[n], r = t[n];
                        break
                    }
                return r > a ? -1 : a > r ? 1 : 0
            }, i.isEncoding = function(e) {
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
            }, i.concat = function(e, t) {
                if (!$(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === e.length) return i.alloc(0);
                var a;
                if (void 0 === t)
                    for (t = 0, a = 0; a < e.length; ++a) t += e[a].length;
                var r = i.allocUnsafe(t),
                    n = 0;
                for (a = 0; a < e.length; ++a) {
                    var s = e[a];
                    if (!i.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
                    s.copy(r, n), n += s.length
                }
                return r
            }, i.byteLength = v, i.prototype._isBuffer = !0, i.prototype.swap16 = function() {
                var e = this.length;
                if (e % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var t = 0; e > t; t += 2) g(this, t, t + 1);
                return this
            }, i.prototype.swap32 = function() {
                var e = this.length;
                if (e % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var t = 0; e > t; t += 4) g(this, t, t + 3), g(this, t + 1, t + 2);
                return this
            }, i.prototype.swap64 = function() {
                var e = this.length;
                if (e % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var t = 0; e > t; t += 8) g(this, t, t + 7), g(this, t + 1, t + 6), g(this, t + 2, t + 5), g(this, t + 3, t + 4);
                return this
            }, i.prototype.toString = function() {
                var e = 0 | this.length;
                return 0 === e ? "" : 0 === arguments.length ? k(this, 0, e) : d.apply(this, arguments)
            }, i.prototype.equals = function(e) {
                if (!i.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                return this === e ? !0 : 0 === i.compare(this, e)
            }, i.prototype.inspect = function() {
                var e = "",
                    a = t.INSPECT_MAX_BYTES;
                return this.length > 0 && (e = this.toString("hex", 0, a).match(/.{2}/g).join(" "), this.length > a && (e += " ... ")), "<Buffer " + e + ">"
            }, i.prototype.compare = function(e, t, a, r, n) {
                if (!i.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                if (void 0 === t && (t = 0), void 0 === a && (a = e ? e.length : 0), void 0 === r && (r = 0), void 0 === n && (n = this.length), 0 > t || a > e.length || 0 > r || n > this.length) throw new RangeError("out of range index");
                if (r >= n && t >= a) return 0;
                if (r >= n) return -1;
                if (t >= a) return 1;
                if (t >>>= 0, a >>>= 0, r >>>= 0, n >>>= 0, this === e) return 0;
                for (var s = n - r, o = a - t, _ = Math.min(s, o), l = this.slice(r, n), f = e.slice(t, a), u = 0; _ > u; ++u)
                    if (l[u] !== f[u]) {
                        s = l[u], o = f[u];
                        break
                    }
                return o > s ? -1 : s > o ? 1 : 0
            }, i.prototype.includes = function(e, t, a) {
                return -1 !== this.indexOf(e, t, a)
            }, i.prototype.indexOf = function(e, t, a) {
                return w(this, e, t, a, !0)
            }, i.prototype.lastIndexOf = function(e, t, a) {
                return w(this, e, t, a, !1)
            }, i.prototype.write = function(e, t, a, r) {
                if (void 0 === t) r = "utf8", a = this.length, t = 0;
                else if (void 0 === a && "string" == typeof t) r = t, a = this.length, t = 0;
                else {
                    if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    t = 0 | t, isFinite(a) ? (a = 0 | a, void 0 === r && (r = "utf8")) : (r = a, a = void 0)
                }
                var n = this.length - t;
                if ((void 0 === a || a > n) && (a = n), e.length > 0 && (0 > a || 0 > t) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                r || (r = "utf8");
                for (var s = !1;;) switch (r) {
                    case "hex":
                        return A(this, e, t, a);
                    case "utf8":
                    case "utf-8":
                        return R(this, e, t, a);
                    case "ascii":
                        return M(this, e, t, a);
                    case "latin1":
                    case "binary":
                        return y(this, e, t, a);
                    case "base64":
                        return B(this, e, t, a);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return E(this, e, t, a);
                    default:
                        if (s) throw new TypeError("Unknown encoding: " + r);
                        r = ("" + r).toLowerCase(), s = !0
                }
            }, i.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            };
            var ee = 4096;
            i.prototype.slice = function(e, t) {
                var a = this.length;
                e = ~~e, t = void 0 === t ? a : ~~t, 0 > e ? (e += a, 0 > e && (e = 0)) : e > a && (e = a), 0 > t ? (t += a, 0 > t && (t = 0)) : t > a && (t = a), e > t && (t = e);
                var r;
                if (i.TYPED_ARRAY_SUPPORT) r = this.subarray(e, t), r.__proto__ = i.prototype;
                else {
                    var n = t - e;
                    r = new i(n, void 0);
                    for (var s = 0; n > s; ++s) r[s] = this[s + e]
                }
                return r
            }, i.prototype.readUIntLE = function(e, t, a) {
                e = 0 | e, t = 0 | t, a || V(e, t, this.length);
                for (var r = this[e], n = 1, s = 0; ++s < t && (n *= 256);) r += this[e + s] * n;
                return r
            }, i.prototype.readUIntBE = function(e, t, a) {
                e = 0 | e, t = 0 | t, a || V(e, t, this.length);
                for (var r = this[e + --t], n = 1; t > 0 && (n *= 256);) r += this[e + --t] * n;
                return r
            }, i.prototype.readUInt8 = function(e, t) {
                return t || V(e, 1, this.length), this[e]
            }, i.prototype.readUInt16LE = function(e, t) {
                return t || V(e, 2, this.length), this[e] | this[e + 1] << 8
            }, i.prototype.readUInt16BE = function(e, t) {
                return t || V(e, 2, this.length), this[e] << 8 | this[e + 1]
            }, i.prototype.readUInt32LE = function(e, t) {
                return t || V(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
            }, i.prototype.readUInt32BE = function(e, t) {
                return t || V(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
            }, i.prototype.readIntLE = function(e, t, a) {
                e = 0 | e, t = 0 | t, a || V(e, t, this.length);
                for (var r = this[e], n = 1, s = 0; ++s < t && (n *= 256);) r += this[e + s] * n;
                return n *= 128, r >= n && (r -= Math.pow(2, 8 * t)), r
            }, i.prototype.readIntBE = function(e, t, a) {
                e = 0 | e, t = 0 | t, a || V(e, t, this.length);
                for (var r = t, n = 1, s = this[e + --r]; r > 0 && (n *= 256);) s += this[e + --r] * n;
                return n *= 128, s >= n && (s -= Math.pow(2, 8 * t)), s
            }, i.prototype.readInt8 = function(e, t) {
                return t || V(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            }, i.prototype.readInt16LE = function(e, t) {
                t || V(e, 2, this.length);
                var a = this[e] | this[e + 1] << 8;
                return 32768 & a ? 4294901760 | a : a
            }, i.prototype.readInt16BE = function(e, t) {
                t || V(e, 2, this.length);
                var a = this[e + 1] | this[e] << 8;
                return 32768 & a ? 4294901760 | a : a
            }, i.prototype.readInt32LE = function(e, t) {
                return t || V(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
            }, i.prototype.readInt32BE = function(e, t) {
                return t || V(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
            }, i.prototype.readFloatLE = function(e, t) {
                return t || V(e, 4, this.length), J.read(this, e, !0, 23, 4)
            }, i.prototype.readFloatBE = function(e, t) {
                return t || V(e, 4, this.length), J.read(this, e, !1, 23, 4)
            }, i.prototype.readDoubleLE = function(e, t) {
                return t || V(e, 8, this.length), J.read(this, e, !0, 52, 8)
            }, i.prototype.readDoubleBE = function(e, t) {
                return t || V(e, 8, this.length), J.read(this, e, !1, 52, 8)
            }, i.prototype.writeUIntLE = function(e, t, a, r) {
                if (e = +e, t = 0 | t, a = 0 | a, !r) {
                    var n = Math.pow(2, 8 * a) - 1;
                    N(this, e, t, a, n, 0)
                }
                var s = 1,
                    i = 0;
                for (this[t] = 255 & e; ++i < a && (s *= 256);) this[t + i] = e / s & 255;
                return t + a
            }, i.prototype.writeUIntBE = function(e, t, a, r) {
                if (e = +e, t = 0 | t, a = 0 | a, !r) {
                    var n = Math.pow(2, 8 * a) - 1;
                    N(this, e, t, a, n, 0)
                }
                var s = a - 1,
                    i = 1;
                for (this[t + s] = 255 & e; --s >= 0 && (i *= 256);) this[t + s] = e / i & 255;
                return t + a
            }, i.prototype.writeUInt8 = function(e, t, a) {
                return e = +e, t = 0 | t, a || N(this, e, t, 1, 255, 0), i.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1
            }, i.prototype.writeUInt16LE = function(e, t, a) {
                return e = +e, t = 0 | t, a || N(this, e, t, 2, 65535, 0), i.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : H(this, e, t, !0), t + 2
            }, i.prototype.writeUInt16BE = function(e, t, a) {
                return e = +e, t = 0 | t, a || N(this, e, t, 2, 65535, 0), i.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : H(this, e, t, !1), t + 2
            }, i.prototype.writeUInt32LE = function(e, t, a) {
                return e = +e, t = 0 | t, a || N(this, e, t, 4, 4294967295, 0), i.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : D(this, e, t, !0), t + 4
            }, i.prototype.writeUInt32BE = function(e, t, a) {
                return e = +e, t = 0 | t, a || N(this, e, t, 4, 4294967295, 0), i.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : D(this, e, t, !1), t + 4
            }, i.prototype.writeIntLE = function(e, t, a, r) {
                if (e = +e, t = 0 | t, !r) {
                    var n = Math.pow(2, 8 * a - 1);
                    N(this, e, t, a, n - 1, -n)
                }
                var s = 0,
                    i = 1,
                    o = 0;
                for (this[t] = 255 & e; ++s < a && (i *= 256);) 0 > e && 0 === o && 0 !== this[t + s - 1] && (o = 1), this[t + s] = (e / i >> 0) - o & 255;
                return t + a
            }, i.prototype.writeIntBE = function(e, t, a, r) {
                if (e = +e, t = 0 | t, !r) {
                    var n = Math.pow(2, 8 * a - 1);
                    N(this, e, t, a, n - 1, -n)
                }
                var s = a - 1,
                    i = 1,
                    o = 0;
                for (this[t + s] = 255 & e; --s >= 0 && (i *= 256);) 0 > e && 0 === o && 0 !== this[t + s + 1] && (o = 1), this[t + s] = (e / i >> 0) - o & 255;
                return t + a
            }, i.prototype.writeInt8 = function(e, t, a) {
                return e = +e, t = 0 | t, a || N(this, e, t, 1, 127, -128), i.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), 0 > e && (e = 255 + e + 1), this[t] = 255 & e, t + 1
            }, i.prototype.writeInt16LE = function(e, t, a) {
                return e = +e, t = 0 | t, a || N(this, e, t, 2, 32767, -32768), i.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : H(this, e, t, !0), t + 2
            }, i.prototype.writeInt16BE = function(e, t, a) {
                return e = +e, t = 0 | t, a || N(this, e, t, 2, 32767, -32768), i.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : H(this, e, t, !1), t + 2
            }, i.prototype.writeInt32LE = function(e, t, a) {
                return e = +e, t = 0 | t, a || N(this, e, t, 4, 2147483647, -2147483648), i.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : D(this, e, t, !0), t + 4
            }, i.prototype.writeInt32BE = function(e, t, a) {
                return e = +e, t = 0 | t, a || N(this, e, t, 4, 2147483647, -2147483648), 0 > e && (e = 4294967295 + e + 1), i.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : D(this, e, t, !1), t + 4
            }, i.prototype.writeFloatLE = function(e, t, a) {
                return X(this, e, t, !0, a)
            }, i.prototype.writeFloatBE = function(e, t, a) {
                return X(this, e, t, !1, a)
            }, i.prototype.writeDoubleLE = function(e, t, a) {
                return F(this, e, t, !0, a)
            }, i.prototype.writeDoubleBE = function(e, t, a) {
                return F(this, e, t, !1, a)
            }, i.prototype.copy = function(e, t, a, r) {
                if (a || (a = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), r > 0 && a > r && (r = a), r === a) return 0;
                if (0 === e.length || 0 === this.length) return 0;
                if (0 > t) throw new RangeError("targetStart out of bounds");
                if (0 > a || a >= this.length) throw new RangeError("sourceStart out of bounds");
                if (0 > r) throw new RangeError("sourceEnd out of bounds");
                r > this.length && (r = this.length), e.length - t < r - a && (r = e.length - t + a);
                var n, s = r - a;
                if (this === e && t > a && r > t)
                    for (n = s - 1; n >= 0; --n) e[n + t] = this[n + a];
                else if (1e3 > s || !i.TYPED_ARRAY_SUPPORT)
                    for (n = 0; s > n; ++n) e[n + t] = this[n + a];
                else Uint8Array.prototype.set.call(e, this.subarray(a, a + s), t);
                return s
            }, i.prototype.fill = function(e, t, a, r) {
                if ("string" == typeof e) {
                    if ("string" == typeof t ? (r = t, t = 0, a = this.length) : "string" == typeof a && (r = a, a = this.length), 1 === e.length) {
                        var n = e.charCodeAt(0);
                        256 > n && (e = n)
                    }
                    if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                    if ("string" == typeof r && !i.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
                } else "number" == typeof e && (e = 255 & e);
                if (0 > t || this.length < t || this.length < a) throw new RangeError("Out of range index");
                if (t >= a) return this;
                t >>>= 0, a = void 0 === a ? this.length : a >>> 0, e || (e = 0);
                var s;
                if ("number" == typeof e)
                    for (s = t; a > s; ++s) this[s] = e;
                else {
                    var o = i.isBuffer(e) ? e : j(new i(e, r).toString()),
                        _ = o.length;
                    for (s = 0; a - t > s; ++s) this[s + t] = o[s % _]
                }
                return this
            };
            var te = /[^+\/0-9A-Za-z-_]/g
        }).call(this, a(7))
    },
    143: function(e, t, a) {
        "use strict";
        a.r(t), module.exports = null
    },
    157: function(e, t) {
        function a(e) {
            return new Int8Array(e)
        }

        function r(e) {
            return new Int16Array(e)
        }

        function n(e) {
            return new Int32Array(e)
        }

        function s(e) {
            return new Float32Array(e)
        }

        function i(e) {
            return new Float64Array(e)
        }

        function o(e) {
            if (1 == e.length) return s(e[0]);
            var t = e[0];
            e = e.slice(1);
            for (var a = [], r = 0; t > r; r++) a.push(o(e));
            return a
        }

        function _(e) {
            if (1 == e.length) return n(e[0]);
            var t = e[0];
            e = e.slice(1);
            for (var a = [], r = 0; t > r; r++) a.push(_(e));
            return a
        }

        function l(e) {
            if (1 == e.length) return r(e[0]);
            var t = e[0];
            e = e.slice(1);
            for (var a = [], n = 0; t > n; n++) a.push(l(e));
            return a
        }

        function f(e) {
            if (1 == e.length) return new Array(e[0]);
            var t = e[0];
            e = e.slice(1);
            for (var a = [], r = 0; t > r; r++) a.push(f(e));
            return a
        }

        function u(e) {
            this.ordinal = e
        }

        function h(e) {
            this.ordinal = e
        }
        var c = {};
        c.fill = function(e, t, a, r) {
            if (2 == arguments.length)
                for (var n = 0; n < e.length; n++) e[n] = arguments[1];
            else
                for (var n = t; a > n; n++) e[n] = r
        };
        var p = {};
        p.arraycopy = function(e, t, a, r, n) {
            for (var s = t + n; s > t;) a[r++] = e[t++]
        };
        var b = {};
        b.SQRT2 = 1.4142135623730951, b.FAST_LOG10 = function(e) {
            return Math.log10(e)
        }, b.FAST_LOG10_X = function(e, t) {
            return Math.log10(e) * t
        }, u.short_block_allowed = new u(0), u.short_block_coupled = new u(1), u.short_block_dispensed = new u(2), u.short_block_forced = new u(3);
        var m = {};
        m.MAX_VALUE = 3.4028235e38, h.vbr_off = new h(0), h.vbr_mt = new h(1), h.vbr_rh = new h(2), h.vbr_abr = new h(3), h.vbr_mtrh = new h(4), h.vbr_default = h.vbr_mtrh;
        var v = function(e) {};
        e.exports = {
            System: p,
            VbrMode: h,
            Float: m,
            ShortBlock: u,
            Util: b,
            Arrays: c,
            new_array_n: f,
            new_byte: a,
            new_double: i,
            new_float: s,
            new_float_n: o,
            new_int: n,
            new_int_n: _,
            new_short: r,
            new_short_n: l,
            assert: v
        }
    },
    160: function(e, t) {
        function a(e) {
            var t = e;
            this.ordinal = function() {
                return t
            }
        }
        a.STEREO = new a(0), a.JOINT_STEREO = new a(1), a.DUAL_CHANNEL = new a(2), a.MONO = new a(3), a.NOT_SET = new a(4), e.exports = a
    },
    164: function(e, t, a) {
        function r() {
            this.tt = [
                [null, null],
                [null, null]
            ], this.main_data_begin = 0, this.private_bits = 0, this.resvDrain_pre = 0, this.resvDrain_post = 0, this.scfsi = [s(4), s(4)];
            for (var e = 0; 2 > e; e++)
                for (var t = 0; 2 > t; t++) this.tt[e][t] = new i
        }
        var n = a(157),
            s = (n.System, n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float, n.new_float_n, n.new_int),
            i = (n.new_int_n, n.assert, a(84));
        e.exports = r
    },
    175: function(e, t, a) {
        function r() {
            function e() {
                this.write_timing = 0, this.ptr = 0, this.buf = s(t)
            }
            var t = 40;
            this.Class_ID = 0, this.lame_encode_frame_init = 0, this.iteration_init_init = 0, this.fill_buffer_resample_init = 0, this.mfbuf = _([2, r.MFSIZE]), this.mode_gr = 0, this.channels_in = 0, this.channels_out = 0, this.resample_ratio = 0, this.mf_samples_to_encode = 0, this.mf_size = 0, this.VBR_min_bitrate = 0, this.VBR_max_bitrate = 0, this.bitrate_index = 0, this.samplerate_index = 0, this.mode_ext = 0, this.lowpass1 = 0, this.lowpass2 = 0, this.highpass1 = 0, this.highpass2 = 0, this.noise_shaping = 0, this.noise_shaping_amp = 0, this.substep_shaping = 0, this.psymodel = 0, this.noise_shaping_stop = 0, this.subblock_gain = 0, this.use_best_huffman = 0, this.full_outer_loop = 0, this.l3_side = new u, this.ms_ratio = o(2), this.padding = 0, this.frac_SpF = 0, this.slot_lag = 0, this.tag_spec = null, this.nMusicCRC = 0, this.OldValue = l(2), this.CurrentStep = l(2), this.masking_lower = 0, this.bv_scf = l(576), this.pseudohalf = l(v.SFBMAX), this.sfb21_extra = !1, this.inbuf_old = new Array(2), this.blackfilt = new Array(2 * r.BPC + 1), this.itime = i(2), this.sideinfo_len = 0, this.sb_sample = _([2, 2, 18, m.SBLIMIT]), this.amp_filter = o(32), this.header = new Array(r.MAX_HEADER_BUF), this.h_ptr = 0, this.w_ptr = 0, this.ancillary_flag = 0, this.ResvSize = 0, this.ResvMax = 0, this.scalefac_band = new h, this.minval_l = o(m.CBANDS), this.minval_s = o(m.CBANDS), this.nb_1 = _([4, m.CBANDS]), this.nb_2 = _([4, m.CBANDS]), this.nb_s1 = _([4, m.CBANDS]), this.nb_s2 = _([4, m.CBANDS]), this.s3_ss = null, this.s3_ll = null, this.decay = 0, this.thm = new Array(4), this.en = new Array(4), this.tot_ener = o(4), this.loudness_sq = _([2, 2]), this.loudness_sq_save = o(2), this.mld_l = o(m.SBMAX_l), this.mld_s = o(m.SBMAX_s), this.bm_l = l(m.SBMAX_l), this.bo_l = l(m.SBMAX_l), this.bm_s = l(m.SBMAX_s), this.bo_s = l(m.SBMAX_s), this.npart_l = 0, this.npart_s = 0, this.s3ind = f([m.CBANDS, 2]), this.s3ind_s = f([m.CBANDS, 2]), this.numlines_s = l(m.CBANDS), this.numlines_l = l(m.CBANDS), this.rnumlines_l = o(m.CBANDS), this.mld_cb_l = o(m.CBANDS), this.mld_cb_s = o(m.CBANDS), this.numlines_s_num1 = 0, this.numlines_l_num1 = 0, this.pe = o(4), this.ms_ratio_s_old = 0, this.ms_ratio_l_old = 0, this.ms_ener_ratio_old = 0, this.blocktype_old = l(2), this.nsPsy = new c, this.VBR_seek_table = new p, this.ATH = null, this.PSY = null, this.nogap_total = 0, this.nogap_current = 0, this.decode_on_the_fly = !0, this.findReplayGain = !0, this.findPeakSample = !0, this.PeakSample = 0, this.RadioGain = 0, this.AudiophileGain = 0, this.rgdata = null, this.noclipGainChange = 0, this.noclipScale = 0, this.bitrate_stereoMode_Hist = f([16, 5]), this.bitrate_blockType_Hist = f([16, 6]), this.pinfo = null, this.hip = null, this.in_buffer_nsamples = 0, this.in_buffer_0 = null, this.in_buffer_1 = null, this.iteration_loop = null;
            for (var a = 0; a < this.en.length; a++) this.en[a] = new b;
            for (var a = 0; a < this.thm.length; a++) this.thm[a] = new b;
            for (var a = 0; a < this.header.length; a++) this.header[a] = new e
        }
        var n = a(157),
            s = (n.System, n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n, n.new_byte),
            i = n.new_double,
            o = n.new_float,
            _ = n.new_float_n,
            l = n.new_int,
            f = n.new_int_n,
            u = (n.assert, a(164)),
            h = a(243),
            c = a(337),
            p = a(317),
            b = a(30),
            m = a(10),
            v = a(258);
        r.MFSIZE = 3456 + m.ENCDELAY - m.MDCTDELAY, r.MAX_HEADER_BUF = 256, r.MAX_BITS_PER_CHANNEL = 4095, r.MAX_BITS_PER_GRANULE = 7680, r.BPC = 320, e.exports = r
    },
    183: function(e, t, a) {
        function r() {
            this.useAdjust = 0, this.aaSensitivityP = 0, this.adjust = 0, this.adjustLimit = 0, this.decay = 0, this.floor = 0, this.l = s(i.SBMAX_l), this.s = s(i.SBMAX_s), this.psfb21 = s(i.PSFB21), this.psfb12 = s(i.PSFB12), this.cb_l = s(i.CBANDS), this.cb_s = s(i.CBANDS), this.eql_w = s(i.BLKSIZE / 2)
        }
        var n = a(157),
            s = (n.System, n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float),
            i = (n.new_float_n, n.new_int, n.new_int_n, n.assert, a(10));
        e.exports = r
    },
    198: function(e, t, a) {
        (function(t) {
            function r() {
                var e, t;
                this.setModules = function(a, r) {
                    e = a, t = r
                }
            }

            function n() {
                var e, t, a;
                this.setModules = function(r, n, s) {
                    e = r, t = n, a = s
                }
            }

            function s() {}

            function i() {
                var e, t;
                this.setModules = function(a, r) {
                    e = a, t = r
                }
            }

            function o(e, t, a) {
                3 != arguments.length && (console.error("WARN: Mp3Encoder(channels, samplerate, kbps) not specified"), e = 1, t = 44100, a = 128);
                var o = new Lame,
                    _ = new r,
                    l = new GainAnalysis,
                    f = new BitStream,
                    b = new Presets,
                    m = new QuantizePVT,
                    v = new Quantize,
                    d = new p,
                    g = new c,
                    w = new i,
                    S = new Reservoir,
                    A = new Takehiro,
                    R = new n,
                    M = new s;
                o.setModules(l, f, b, m, v, d, g, w, M), f.setModules(l, M, g, d), w.setModules(f, g), b.setModules(o), v.setModules(f, S, m, A), m.setModules(A, S, o.enc.psy), S.setModules(f), A.setModules(m), d.setModules(o, f, g), _.setModules(R, M), R.setModules(g, w, b);
                var y = o.lame_init();
                y.num_channels = e, y.in_samplerate = t, y.brate = a, y.mode = MPEGMode.STEREO, y.quality = 3, y.bWriteVbrTag = !1, y.disable_reservoir = !0, y.write_id3tag_automatic = !1;
                var B = o.lame_init_params(y);
                h(0 == B);
                var E = 1152,
                    T = 0 | 1.25 * E + 7200,
                    k = u(T);
                this.encodeBuffer = function(t, a) {
                    1 == e && (a = t), h(t.length == a.length), t.length > E && (E = t.length, T = 0 | 1.25 * E + 7200, k = u(T));
                    var r = o.lame_encode_buffer(y, t, a, t.length, k, 0, T);
                    return new Int8Array(k.subarray(0, r))
                }, this.flush = function() {
                    var e = o.lame_encode_flush(y, k, 0, T);
                    return new Int8Array(k.subarray(0, e))
                }
            }

            function _() {
                this.dataOffset = 0, this.dataLen = 0, this.channels = 0, this.sampleRate = 0
            }

            function l(e) {
                return e.charCodeAt(0) << 24 | e.charCodeAt(1) << 16 | e.charCodeAt(2) << 8 | e.charCodeAt(3)
            }
            a(143), fs = a(143);
            var f = a(157),
                u = (f.System, f.VbrMode, f.Float, f.ShortBlock, f.Util, f.Arrays, f.new_array_n, f.new_byte),
                h = (f.new_double, f.new_float, f.new_float_n, f.new_int, f.new_int_n, f.assert);
            Lame = a(67), Presets = a(241), GainAnalysis = a(82), QuantizePVT = a(274), Quantize = a(100), Takehiro = a(105), Reservoir = a(210), MPEGMode = a(160), BitStream = a(208);
            var c = (a(10), a(293)),
                p = a(217);
            _.RIFF = l("RIFF"), _.WAVE = l("WAVE"), _.fmt_ = l("fmt "), _.data = l("data"), _.readHeader = function(e) {
                var t = new _,
                    a = e.getUint32(0, !1);
                if (_.RIFF == a && (e.getUint32(4, !0), _.WAVE == e.getUint32(8, !1) && _.fmt_ == e.getUint32(12, !1))) {
                    var r = e.getUint32(16, !0),
                        n = 20;
                    switch (r) {
                        case 16:
                        case 18:
                            t.channels = e.getUint16(n + 2, !0), t.sampleRate = e.getUint32(n + 4, !0);
                            break;
                        default:
                            throw "extended fmt chunk not implemented"
                    }
                    n += r;
                    for (var s = _.data, i = 0; s != a && (a = e.getUint32(n, !1), i = e.getUint32(n + 4, !0), s != a);) n += i + 8;
                    return t.dataLen = i, t.dataOffset = n + 8, t
                }
            }, e.exports.Mp3Encoder = o, e.exports.WavHeader = _
        }).call(this, a(133).Buffer)
    },
    208: function(e, t, a) {
        function r() {
            function e(e) {
                s.arraycopy(e.header[e.w_ptr].buf, 0, P, L, e.sideinfo_len), L += e.sideinfo_len, I += 8 * e.sideinfo_len, e.w_ptr = e.w_ptr + 1 & p.MAX_HEADER_BUF - 1
            }

            function t(t, a, r) {
                for (f(B - 2 > r); r > 0;) {
                    var n;
                    0 == O && (O = 8, L++, f(L < Lame.LAME_MAXMP3BUFFER), f(t.header[t.w_ptr].write_timing >= I), t.header[t.w_ptr].write_timing == I && e(t), P[L] = 0), n = Math.min(r, O), r -= n, O -= n, f(B > r), f(B > O), P[L] |= a >> r << O, I += n
                }
            }

            function a(e, t, a) {
                for (f(B - 2 > a); a > 0;) {
                    var r;
                    0 == O && (O = 8, L++, f(L < Lame.LAME_MAXMP3BUFFER), P[L] = 0), r = Math.min(a, O), a -= r, O -= r, f(B > a), f(B > O), P[L] |= t >> a << O, I += r
                }
            }

            function r(e, a) {
                var r, n = e.internal_flags;
                if (f(a >= 0), a >= 8 && (t(n, 76, 8), a -= 8), a >= 8 && (t(n, 65, 8), a -= 8), a >= 8 && (t(n, 77, 8), a -= 8), a >= 8 && (t(n, 69, 8), a -= 8), a >= 32) {
                    var s = k.getLameShortVersion();
                    if (a >= 32)
                        for (r = 0; r < s.length && a >= 8; ++r) a -= 8, t(n, s.charAt(r), 8)
                }
                for (; a >= 1; a -= 1) t(n, n.ancillary_flag, 1), n.ancillary_flag ^= e.disable_reservoir ? 0 : 1;
                f(0 == a)
            }

            function n(e, t, a) {
                for (var r = e.header[e.h_ptr].ptr; a > 0;) {
                    var n = Math.min(a, 8 - (7 & r));
                    a -= n, f(B > a), e.header[e.h_ptr].buf[r >> 3] |= t >> a << 8 - (7 & r) - n, r += n
                }
                e.header[e.h_ptr].ptr = r
            }

            function b(e, t) {
                e <<= 8;
                for (var a = 0; 8 > a; a++) e <<= 1, t <<= 1, 0 != (65536 & (t ^ e)) && (t ^= y);
                return t
            }

            function m(e, t) {
                var a, r, o, _ = e.internal_flags;
                if (a = _.l3_side, _.header[_.h_ptr].ptr = 0, i.fill(_.header[_.h_ptr].buf, 0, _.sideinfo_len, 0), e.out_samplerate < 16e3 ? n(_, 4094, 12) : n(_, 4095, 12), n(_, e.version, 1), n(_, 1, 2), n(_, e.error_protection ? 0 : 1, 1), n(_, _.bitrate_index, 4), n(_, _.samplerate_index, 2), n(_, _.padding, 1), n(_, e.extension, 1), n(_, e.mode.ordinal(), 2), n(_, _.mode_ext, 2), n(_, e.copyright, 1), n(_, e.original, 1), n(_, e.emphasis, 2), e.error_protection && n(_, 0, 16), 1 == e.version) {
                    for (f(a.main_data_begin >= 0), n(_, a.main_data_begin, 9), 2 == _.channels_out ? n(_, a.private_bits, 3) : n(_, a.private_bits, 5), o = 0; o < _.channels_out; o++) {
                        var l;
                        for (l = 0; 4 > l; l++) n(_, a.scfsi[o][l], 1)
                    }
                    for (r = 0; 2 > r; r++)
                        for (o = 0; o < _.channels_out; o++) {
                            var u = a.tt[r][o];
                            n(_, u.part2_3_length + u.part2_length, 12), n(_, u.big_values / 2, 9), n(_, u.global_gain, 8), n(_, u.scalefac_compress, 4), u.block_type != c.NORM_TYPE ? (n(_, 1, 1), n(_, u.block_type, 2), n(_, u.mixed_block_flag, 1), 14 == u.table_select[0] && (u.table_select[0] = 16), n(_, u.table_select[0], 5), 14 == u.table_select[1] && (u.table_select[1] = 16), n(_, u.table_select[1], 5), n(_, u.subblock_gain[0], 3), n(_, u.subblock_gain[1], 3), n(_, u.subblock_gain[2], 3)) : (n(_, 0, 1), 14 == u.table_select[0] && (u.table_select[0] = 16), n(_, u.table_select[0], 5), 14 == u.table_select[1] && (u.table_select[1] = 16), n(_, u.table_select[1], 5), 14 == u.table_select[2] && (u.table_select[2] = 16), n(_, u.table_select[2], 5), f(0 <= u.region0_count && u.region0_count < 16), f(0 <= u.region1_count && u.region1_count < 8), n(_, u.region0_count, 4), n(_, u.region1_count, 3)), n(_, u.preflag, 1), n(_, u.scalefac_scale, 1), n(_, u.count1table_select, 1)
                        }
                } else
                    for (f(a.main_data_begin >= 0), n(_, a.main_data_begin, 8), n(_, a.private_bits, _.channels_out), r = 0, o = 0; o < _.channels_out; o++) {
                        var u = a.tt[r][o];
                        n(_, u.part2_3_length + u.part2_length, 12), n(_, u.big_values / 2, 9), n(_, u.global_gain, 8), n(_, u.scalefac_compress, 9), u.block_type != c.NORM_TYPE ? (n(_, 1, 1), n(_, u.block_type, 2), n(_, u.mixed_block_flag, 1), 14 == u.table_select[0] && (u.table_select[0] = 16), n(_, u.table_select[0], 5), 14 == u.table_select[1] && (u.table_select[1] = 16), n(_, u.table_select[1], 5), n(_, u.subblock_gain[0], 3), n(_, u.subblock_gain[1], 3), n(_, u.subblock_gain[2], 3)) : (n(_, 0, 1), 14 == u.table_select[0] && (u.table_select[0] = 16), n(_, u.table_select[0], 5), 14 == u.table_select[1] && (u.table_select[1] = 16), n(_, u.table_select[1], 5), 14 == u.table_select[2] && (u.table_select[2] = 16), n(_, u.table_select[2], 5), f(0 <= u.region0_count && u.region0_count < 16), f(0 <= u.region1_count && u.region1_count < 8), n(_, u.region0_count, 4), n(_, u.region1_count, 3)), n(_, u.scalefac_scale, 1), n(_, u.count1table_select, 1)
                    }
                e.error_protection && CRC_writeheader(_, _.header[_.h_ptr].buf);
                var h = _.h_ptr;
                f(_.header[h].ptr == 8 * _.sideinfo_len), _.h_ptr = h + 1 & p.MAX_HEADER_BUF - 1, _.header[_.h_ptr].write_timing = _.header[h].write_timing + t, _.h_ptr == _.w_ptr && s.err.println("Error: MAX_HEADER_BUF too small in bitstream.c \n")
            }

            function v(e, a) {
                var r, n = h.ht[a.count1table_select + 32],
                    s = 0,
                    i = a.big_values,
                    o = a.big_values;
                for (f(a.count1table_select < 2), r = (a.count1 - a.big_values) / 4; r > 0; --r) {
                    var _, l = 0,
                        u = 0;
                    _ = a.l3_enc[i + 0], 0 != _ && (u += 8, a.xr[o + 0] < 0 && l++, f(1 >= _)), _ = a.l3_enc[i + 1], 0 != _ && (u += 4, l *= 2, a.xr[o + 1] < 0 && l++, f(1 >= _)), _ = a.l3_enc[i + 2], 0 != _ && (u += 2, l *= 2, a.xr[o + 2] < 0 && l++, f(1 >= _)), _ = a.l3_enc[i + 3], 0 != _ && (u++, l *= 2, a.xr[o + 3] < 0 && l++, f(1 >= _)), i += 4, o += 4, t(e, l + n.table[u], n.hlen[u]), s += n.hlen[u]
                }
                return s
            }

            function d(e, a, r, n, s) {
                var i = h.ht[a],
                    o = 0;
                if (f(32 > a), 0 == a) return o;
                for (var _ = r; n > _; _ += 2) {
                    var l = 0,
                        u = 0,
                        c = i.xlen,
                        p = i.xlen,
                        b = 0,
                        m = s.l3_enc[_],
                        v = s.l3_enc[_ + 1];
                    if (0 != m && (s.xr[_] < 0 && b++, l--), a > 15) {
                        if (m > 14) {
                            var d = m - 15;
                            f(d <= i.linmax), b |= d << 1, u = c, m = 15
                        }
                        if (v > 14) {
                            var g = v - 15;
                            f(g <= i.linmax), b <<= c, b |= g, u += c, v = 15
                        }
                        p = 16
                    }
                    0 != v && (b <<= 1, s.xr[_ + 1] < 0 && b++, l--), f(16 > (m | v)), m = m * p + v, u -= l, l += i.hlen[m], f(B >= l), f(B >= u), t(e, i.table[m], l), t(e, b, u), o += l + u
                }
                return o
            }

            function g(e, t) {
                var a = 3 * e.scalefac_band.s[3];
                a > t.big_values && (a = t.big_values);
                var r = d(e, t.table_select[0], 0, a, t);
                return r += d(e, t.table_select[1], a, t.big_values, t)
            }

            function w(e, t) {
                var a, r, n, s;
                a = t.big_values, f(a >= 0 && 576 >= a);
                var i = t.region0_count + 1;
                return f(i >= 0), f(i < e.scalefac_band.l.length), n = e.scalefac_band.l[i], i += t.region1_count + 1, f(i >= 0), f(i < e.scalefac_band.l.length), s = e.scalefac_band.l[i], n > a && (n = a), s > a && (s = a), r = d(e, t.table_select[0], 0, n, t), r += d(e, t.table_select[1], n, s, t), r += d(e, t.table_select[2], s, a, t)
            }

            function S(e) {
                var a, r, n, s, i = 0,
                    o = e.internal_flags,
                    _ = o.l3_side;
                if (1 == e.version)
                    for (a = 0; 2 > a; a++)
                        for (r = 0; r < o.channels_out; r++) {
                            var l = _.tt[a][r],
                                h = u.slen1_tab[l.scalefac_compress],
                                p = u.slen2_tab[l.scalefac_compress];
                            for (s = 0, n = 0; n < l.sfbdivide; n++) - 1 != l.scalefac[n] && (t(o, l.scalefac[n], h), s += h);
                            for (; n < l.sfbmax; n++) - 1 != l.scalefac[n] && (t(o, l.scalefac[n], p), s += p);
                            f(s == l.part2_length), s += l.block_type == c.SHORT_TYPE ? g(o, l) : w(o, l), s += v(o, l), f(s == l.part2_3_length + l.part2_length), i += s
                        } else
                            for (a = 0, r = 0; r < o.channels_out; r++) {
                                var b, m, l = _.tt[a][r],
                                    d = 0;
                                if (f(null != l.sfb_partition_table), s = 0, n = 0, m = 0, l.block_type == c.SHORT_TYPE) {
                                    for (; 4 > m; m++) {
                                        var S = l.sfb_partition_table[m] / 3,
                                            A = l.slen[m];
                                        for (b = 0; S > b; b++, n++) t(o, Math.max(l.scalefac[3 * n + 0], 0), A), t(o, Math.max(l.scalefac[3 * n + 1], 0), A), t(o, Math.max(l.scalefac[3 * n + 2], 0), A), d += 3 * A
                                    }
                                    s += g(o, l)
                                } else {
                                    for (; 4 > m; m++) {
                                        var S = l.sfb_partition_table[m],
                                            A = l.slen[m];
                                        for (b = 0; S > b; b++, n++) t(o, Math.max(l.scalefac[n], 0), A), d += A
                                    }
                                    s += w(o, l)
                                }
                                s += v(o, l), f(s == l.part2_3_length), f(d == l.part2_length), i += d + s
                            }
                return i
            }

            function A() {
                this.total = 0
            }

            function R(e, t) {
                var a, r, n, i, o, _ = e.internal_flags;
                return o = _.w_ptr, i = _.h_ptr - 1, -1 == i && (i = p.MAX_HEADER_BUF - 1), a = _.header[i].write_timing - I, t.total = a, a >= 0 && (r = 1 + i - o, o > i && (r = 1 + i - o + p.MAX_HEADER_BUF), a -= 8 * r * _.sideinfo_len), n = M.getframebits(e), a += n, t.total += n, t.total % 8 != 0 ? t.total = 1 + t.total / 8 : t.total = t.total / 8, t.total += L + 1, 0 > a && s.err.println("strange error flushing buffer ... \n"), a
            }
            var M = this,
                y = 32773,
                B = 32,
                E = null,
                T = null,
                k = null,
                x = null;
            this.setModules = function(e, t, a, r) {
                E = e, T = t, k = a, x = r
            };
            var P = null,
                I = 0,
                L = 0,
                O = 0;
            this.getframebits = function(e) {
                var t, a = e.internal_flags;
                t = 0 != a.bitrate_index ? h.bitrate_table[e.version][a.bitrate_index] : e.brate, f(t >= 8 && 640 >= t);
                var r = 0 | 72e3 * (e.version + 1) * t / e.out_samplerate + a.padding;
                return 8 * r
            }, this.CRC_writeheader = function(e, t) {
                var a = 65535;
                a = b(255 & t[2], a), a = b(255 & t[3], a);
                for (var r = 6; r < e.sideinfo_len; r++) a = b(255 & t[r], a);
                t[4] = byte(a >> 8), t[5] = byte(255 & a)
            }, this.flush_bitstream = function(e) {
                var t, a, n = e.internal_flags,
                    s = n.h_ptr - 1;
                if (-1 == s && (s = p.MAX_HEADER_BUF - 1), t = n.l3_side, !((a = R(e, new A)) < 0)) {
                    if (r(e, a), f(n.header[s].write_timing + this.getframebits(e) == I), n.ResvSize = 0, t.main_data_begin = 0, n.findReplayGain) {
                        var i = E.GetTitleGain(n.rgdata);
                        f(NEQ(i, GainAnalysis.GAIN_NOT_ENOUGH_SAMPLES)), n.RadioGain = 0 | Math.floor(10 * i + .5)
                    }
                    n.findPeakSample && (n.noclipGainChange = 0 | Math.ceil(20 * Math.log10(n.PeakSample / 32767) * 10), n.noclipGainChange > 0 && (EQ(e.scale, 1) || EQ(e.scale, 0)) ? n.noclipScale = Math.floor(32767 / n.PeakSample * 100) / 100 : n.noclipScale = -1)
                }
            }, this.add_dummy_byte = function(e, t, r) {
                for (var n, s = e.internal_flags; r-- > 0;)
                    for (a(s, t, 8), n = 0; n < p.MAX_HEADER_BUF; ++n) s.header[n].write_timing += 8
            }, this.format_bitstream = function(e) {
                var t, a = e.internal_flags;
                t = a.l3_side;
                var n = this.getframebits(e);
                r(e, t.resvDrain_pre), m(e, n);
                var i = 8 * a.sideinfo_len;
                if (i += S(e), r(e, t.resvDrain_post), i += t.resvDrain_post, t.main_data_begin += (n - i) / 8, R(e, new A) != a.ResvSize && s.err.println("Internal buffer inconsistency. flushbits <> ResvSize"), 8 * t.main_data_begin != a.ResvSize && (s.err.printf("bit reservoir error: \nl3_side.main_data_begin: %d \nResvoir size:             %d \nresv drain (post)         %d \nresv drain (pre)          %d \nheader and sideinfo:      %d \ndata bits:                %d \ntotal bits:               %d (remainder: %d) \nbitsperframe:             %d \n", 8 * t.main_data_begin, a.ResvSize, t.resvDrain_post, t.resvDrain_pre, 8 * a.sideinfo_len, i - t.resvDrain_post - 8 * a.sideinfo_len, i, i % 8, n), s.err.println("This is a fatal error.  It has several possible causes:"), s.err.println("90%%  LAME compiled with buggy version of gcc using advanced optimizations"), s.err.println(" 9%%  Your system is overclocked"), s.err.println(" 1%%  bug in LAME encoding library"), a.ResvSize = 8 * t.main_data_begin), f(I % 8 == 0), I > 1e9) {
                    var o;
                    for (o = 0; o < p.MAX_HEADER_BUF; ++o) a.header[o].write_timing -= I;
                    I = 0
                }
                return 0
            }, this.copy_buffer = function(e, t, a, r, n) {
                var i = L + 1;
                if (0 >= i) return 0;
                if (0 != r && i > r) return -1;
                if (s.arraycopy(P, 0, t, a, i), L = -1, O = 0, 0 != n) {
                    var o = l(1);
                    if (o[0] = e.nMusicCRC, x.updateMusicCRC(o, t, a, i), e.nMusicCRC = o[0], i > 0 && (e.VBR_seek_table.nBytesWritten += i), e.decode_on_the_fly)
                        for (var u, h = _([2, 1152]), c = i, p = -1; 0 != p;)
                            if (p = T.hip_decode1_unclipped(e.hip, t, a, c, h[0], h[1]), c = 0, -1 == p && (p = 0), p > 0) {
                                if (f(1152 >= p), e.findPeakSample) {
                                    for (u = 0; p > u; u++) h[0][u] > e.PeakSample ? e.PeakSample = h[0][u] : -h[0][u] > e.PeakSample && (e.PeakSample = -h[0][u]);
                                    if (e.channels_out > 1)
                                        for (u = 0; p > u; u++) h[1][u] > e.PeakSample ? e.PeakSample = h[1][u] : -h[1][u] > e.PeakSample && (e.PeakSample = -h[1][u])
                                }
                                if (e.findReplayGain && E.AnalyzeSamples(e.rgdata, h[0], 0, h[1], 0, p, e.channels_out) == GainAnalysis.GAIN_ANALYSIS_ERROR) return -6
                            }
                }
                return i
            }, this.init_bit_stream_w = function(e) {
                P = o(Lame.LAME_MAXMP3BUFFER), e.h_ptr = e.w_ptr = 0, e.header[e.h_ptr].write_timing = 0, L = -1, O = 0, I = 0
            }
        }
        var n = a(157),
            s = n.System,
            i = (n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays),
            o = (n.new_array_n, n.new_byte),
            _ = (n.new_double, n.new_float, n.new_float_n),
            l = n.new_int,
            f = (n.new_int_n, n.assert),
            u = a(105),
            h = a(340),
            c = a(10),
            p = a(175);
        r.EQ = function(e, t) {
            return Math.abs(e) > Math.abs(t) ? Math.abs(e - t) <= 1e-6 * Math.abs(e) : Math.abs(e - t) <= 1e-6 * Math.abs(t)
        }, r.NEQ = function(e, t) {
            return !r.EQ(e, t)
        }, e.exports = r
    },
    209: function(e, t, a) {
        e.exports = a(221)
    },
    210: function(e, t, a) {
        function r() {
            var e;
            this.setModules = function(t) {
                e = t
            }, this.ResvFrameBegin = function(t, a) {
                var r, n = t.internal_flags,
                    i = n.l3_side,
                    o = e.getframebits(t);
                a.bits = (o - 8 * n.sideinfo_len) / n.mode_gr;
                var _ = 2048 * n.mode_gr - 8;
                t.brate > 320 ? r = 8 * int(1e3 * t.brate / (t.out_samplerate / 1152) / 8 + .5) : (r = 11520, t.strict_ISO && (r = 8 * int(32e4 / (t.out_samplerate / 1152) / 8 + .5))), n.ResvMax = r - o, n.ResvMax > _ && (n.ResvMax = _), (n.ResvMax < 0 || t.disable_reservoir) && (n.ResvMax = 0);
                var l = a.bits * n.mode_gr + Math.min(n.ResvSize, n.ResvMax);
                return l > r && (l = r), s(0 == n.ResvMax % 8), s(n.ResvMax >= 0), i.resvDrain_pre = 0, null != n.pinfo && (n.pinfo.mean_bits = a.bits / 2, n.pinfo.resvsize = n.ResvSize), l
            }, this.ResvMaxBits = function(e, t, a, r) {
                var n, s = e.internal_flags,
                    i = s.ResvSize,
                    o = s.ResvMax;
                0 != r && (i += t), 0 != (1 & s.substep_shaping) && (o *= .9), a.bits = t, 10 * i > 9 * o ? (n = i - 9 * o / 10, a.bits += n, s.substep_shaping |= 128) : (n = 0, s.substep_shaping &= 127, e.disable_reservoir || 0 != (1 & s.substep_shaping) || (a.bits -= .1 * t));
                var _ = i < 6 * s.ResvMax / 10 ? i : 6 * s.ResvMax / 10;
                return _ -= n, 0 > _ && (_ = 0), _
            }, this.ResvAdjust = function(e, t) {
                e.ResvSize -= t.part2_3_length + t.part2_length
            }, this.ResvFrameEnd = function(e, t) {
                var a, r = e.l3_side;
                e.ResvSize += t * e.mode_gr;
                var n = 0;
                r.resvDrain_post = 0, r.resvDrain_pre = 0, 0 != (a = e.ResvSize % 8) && (n += a), a = e.ResvSize - n - e.ResvMax, a > 0 && (s(0 == a % 8), s(a >= 0), n += a);
                var i = Math.min(8 * r.main_data_begin, n) / 8;
                r.resvDrain_pre += 8 * i, n -= 8 * i, e.ResvSize -= 8 * i, r.main_data_begin -= i, r.resvDrain_post += n, e.ResvSize -= n
            }
        }
        var n = a(157),
            s = n.assert;
        e.exports = r
    },
    212: function(e, t) {
        function a(e) {
            this.bits = e
        }
        e.exports = a
    },
    217: function(e, t, a) {
        function r() {
            function e(e, t) {
                if (e.nVbrNumFrames++, e.sum += t, e.seen++, !(e.seen < e.want) && (e.pos < e.size && (e.bag[e.pos] = e.sum, e.pos++, e.seen = 0), e.pos == e.size)) {
                    for (var a = 1; a < e.size; a += 2) e.bag[a / 2] = e.bag[a];
                    e.want *= 2, e.pos /= 2
                }
            }

            function t(e, t) {
                if (!(e.pos <= 0))
                    for (var a = 1; y > a; ++a) {
                        var r, n, s = a / y,
                            i = 0 | Math.floor(s * e.pos);
                        i > e.pos - 1 && (i = e.pos - 1), r = e.bag[i], n = e.sum;
                        var o = 0 | 256 * r / n;
                        o > 255 && (o = 255), t[a] = 255 & o
                    }
            }

            function a(e, t) {
                var a = 255 & e[t + 0];
                return a <<= 8, a |= 255 & e[t + 1], a <<= 8, a |= 255 & e[t + 2], a <<= 8, a |= 255 & e[t + 3]
            }

            function n(e, t, a) {
                e[t + 0] = 255 & (a >> 24 & 255), e[t + 1] = 255 & (a >> 16 & 255), e[t + 2] = 255 & (a >> 8 & 255), e[t + 3] = 255 & (255 & a)
            }

            function u(e, t, a) {
                e[t + 0] = 255 & (a >> 8 & 255), e[t + 1] = 255 & (255 & a)
            }

            function h(e, t) {
                return new String(e, t, L.length(), I).equals(L) || new String(e, t, O.length(), I).equals(O)
            }

            function c(e, t, a) {
                return 255 & (e << t | a & ~(-1 << t))
            }

            function p(e, t) {
                var a = e.internal_flags;
                t[0] = c(t[0], 8, 255), t[1] = c(t[1], 3, 7), t[1] = c(t[1], 1, e.out_samplerate < 16e3 ? 0 : 1), t[1] = c(t[1], 1, e.version), t[1] = c(t[1], 2, 1), t[1] = c(t[1], 1, e.error_protection ? 0 : 1), t[2] = c(t[2], 4, a.bitrate_index), t[2] = c(t[2], 2, a.samplerate_index), t[2] = c(t[2], 1, 0), t[2] = c(t[2], 1, e.extension), t[3] = c(t[3], 2, e.mode.ordinal()), t[3] = c(t[3], 2, a.mode_ext), t[3] = c(t[3], 1, e.copyright), t[3] = c(t[3], 1, e.original), t[3] = c(t[3], 2, e.emphasis), t[0] = 255;
                var r, n = 255 & (241 & t[1]);
                r = 1 == e.version ? k : e.out_samplerate < 16e3 ? P : x, e.VBR == i.vbr_off && (r = e.brate);
                var s;
                s = e.free_format ? 0 : 255 & 16 * d.BitrateIndex(r, e.version, e.out_samplerate), 1 == e.version ? (t[1] = 255 & (10 | n), n = 255 & (13 & t[2]), t[2] = 255 & (s | n)) : (t[1] = 255 & (2 | n), n = 255 & (13 & t[2]), t[2] = 255 & (s | n))
            }

            function b(e, t) {
                var a = t ^ e;
                return t = t >> 8 ^ V[255 & a]
            }

            function m(e, t, a, r, s) {
                var i, _, l, f = e.internal_flags,
                    h = 0,
                    c = e.encoder_delay,
                    p = e.encoder_padding,
                    m = 100 - 10 * e.VBR_q - e.quality,
                    v = w.getLameVeryShortVersion(),
                    d = 0,
                    g = [1, 5, 3, 2, 4, 0, 3],
                    S = 0 | (e.lowpassfreq / 100 + .5 > 255 ? 255 : e.lowpassfreq / 100 + .5),
                    A = 0,
                    R = 0,
                    M = 0,
                    y = e.internal_flags.noise_shaping,
                    B = 0,
                    E = 0,
                    T = 0,
                    k = 0,
                    x = 0,
                    P = 0 != (1 & e.exp_nspsytune),
                    I = 0 != (2 & e.exp_nspsytune),
                    L = !1,
                    O = !1,
                    V = e.internal_flags.nogap_total,
                    N = e.internal_flags.nogap_current,
                    H = e.ATHtype,
                    D = 0;
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
                switch (i = e.VBR.ordinal() < g.length ? g[e.VBR.ordinal()] : 0, _ = 16 * d + i, f.findReplayGain && (f.RadioGain > 510 && (f.RadioGain = 510), f.RadioGain < -510 && (f.RadioGain = -510), R = 8192, R |= 3072, f.RadioGain >= 0 ? R |= f.RadioGain : (R |= 512, R |= -f.RadioGain)), f.findPeakSample && (A = Math.abs(0 | f.PeakSample / 32767 * Math.pow(2, 23) + .5)), -1 != V && (N > 0 && (O = !0), V - 1 > N && (L = !0)), D = H + ((P ? 1 : 0) << 4) + ((I ? 1 : 0) << 5) + ((L ? 1 : 0) << 6) + ((O ? 1 : 0) << 7), 0 > m && (m = 0), e.mode) {
                    case MONO:
                        B = 0;
                        break;
                    case STEREO:
                        B = 1;
                        break;
                    case DUAL_CHANNEL:
                        B = 2;
                        break;
                    case JOINT_STEREO:
                        B = e.force_ms ? 4 : 3;
                        break;
                    case NOT_SET:
                    default:
                        B = 7
                }
                T = e.in_samplerate <= 32e3 ? 0 : 48e3 == e.in_samplerate ? 2 : e.in_samplerate > 48e3 ? 3 : 1, (e.short_blocks == o.short_block_forced || e.short_blocks == o.short_block_dispensed || -1 == e.lowpassfreq && -1 == e.highpassfreq || e.scale_left < e.scale_right || e.scale_left > e.scale_right || e.disable_reservoir && e.brate < 320 || e.noATH || e.ATHonly || 0 == H || e.in_samplerate <= 32e3) && (E = 1), k = y + (B << 2) + (E << 5) + (T << 6), x = f.nMusicCRC, n(a, r + h, m), h += 4;
                for (var Y = 0; 9 > Y; Y++) a[r + h + Y] = 255 & v.charAt(Y);
                h += 9, a[r + h] = 255 & _, h++, a[r + h] = 255 & S, h++, n(a, r + h, A), h += 4, u(a, r + h, R), h += 2, u(a, r + h, M), h += 2, a[r + h] = 255 & D, h++, l >= 255 ? a[r + h] = 255 : a[r + h] = 255 & l, h++, a[r + h] = 255 & c >> 4, a[r + h + 1] = 255 & (c << 4) + (p >> 8), a[r + h + 2] = 255 & p, h += 3, a[r + h] = 255 & k, h++, a[r + h++] = 0, u(a, r + h, e.preset), h += 2, n(a, r + h, t), h += 4, u(a, r + h, x), h += 2;
                for (var X = 0; h > X; X++) s = b(a[r + X], s);
                return u(a, r + h, s), h += 2
            }

            function v(e) {
                e.seek(0);
                var t = l(10);
                e.readFully(t);
                var a;
                return a = new String(t, "ISO-8859-1").startsWith("ID3") ? 0 : ((127 & t[6]) << 21 | (127 & t[7]) << 14 | (127 & t[8]) << 7 | 127 & t[9]) + t.length
            }
            var d, g, w;
            this.setModules = function(e, t, a) {
                d = e, g = t, w = a
            };
            var S = 1,
                A = 2,
                R = 4,
                M = 8,
                y = r.NUMTOCENTRIES,
                B = r.MAXFRAMESIZE,
                E = y + 4 + 4 + 4 + 4 + 4,
                T = E + 9 + 1 + 1 + 8 + 1 + 1 + 3 + 1 + 1 + 2 + 4 + 2 + 2,
                k = 128,
                x = 64,
                P = 32,
                I = null,
                L = "Xing",
                O = "Info",
                V = [0, 49345, 49537, 320, 49921, 960, 640, 49729, 50689, 1728, 1920, 51009, 1280, 50625, 50305, 1088, 52225, 3264, 3456, 52545, 3840, 53185, 52865, 3648, 2560, 51905, 52097, 2880, 51457, 2496, 2176, 51265, 55297, 6336, 6528, 55617, 6912, 56257, 55937, 6720, 7680, 57025, 57217, 8e3, 56577, 7616, 7296, 56385, 5120, 54465, 54657, 5440, 55041, 6080, 5760, 54849, 53761, 4800, 4992, 54081, 4352, 53697, 53377, 4160, 61441, 12480, 12672, 61761, 13056, 62401, 62081, 12864, 13824, 63169, 63361, 14144, 62721, 13760, 13440, 62529, 15360, 64705, 64897, 15680, 65281, 16320, 16e3, 65089, 64001, 15040, 15232, 64321, 14592, 63937, 63617, 14400, 10240, 59585, 59777, 10560, 60161, 11200, 10880, 59969, 60929, 11968, 12160, 61249, 11520, 60865, 60545, 11328, 58369, 9408, 9600, 58689, 9984, 59329, 59009, 9792, 8704, 58049, 58241, 9024, 57601, 8640, 8320, 57409, 40961, 24768, 24960, 41281, 25344, 41921, 41601, 25152, 26112, 42689, 42881, 26432, 42241, 26048, 25728, 42049, 27648, 44225, 44417, 27968, 44801, 28608, 28288, 44609, 43521, 27328, 27520, 43841, 26880, 43457, 43137, 26688, 30720, 47297, 47489, 31040, 47873, 31680, 31360, 47681, 48641, 32448, 32640, 48961, 32e3, 48577, 48257, 31808, 46081, 29888, 30080, 46401, 30464, 47041, 46721, 30272, 29184, 45761, 45953, 29504, 45313, 29120, 28800, 45121, 20480, 37057, 37249, 20800, 37633, 21440, 21120, 37441, 38401, 22208, 22400, 38721, 21760, 38337, 38017, 21568, 39937, 23744, 23936, 40257, 24320, 40897, 40577, 24128, 23040, 39617, 39809, 23360, 39169, 22976, 22656, 38977, 34817, 18624, 18816, 35137, 19200, 35777, 35457, 19008, 19968, 36545, 36737, 20288, 36097, 19904, 19584, 35905, 17408, 33985, 34177, 17728, 34561, 18368, 18048, 34369, 33281, 17088, 17280, 33601, 16640, 33217, 32897, 16448];
            this.addVbrFrame = function(t) {
                var a = t.internal_flags,
                    r = Tables.bitrate_table[t.version][a.bitrate_index];
                f(null != a.VBR_seek_table.bag), e(a.VBR_seek_table, r)
            }, this.getVbrTag = function(e) {
                var t = new VBRTagData,
                    r = 0;
                t.flags = 0;
                var n = e[r + 1] >> 3 & 1,
                    s = e[r + 2] >> 2 & 3,
                    i = e[r + 3] >> 6 & 3,
                    o = e[r + 2] >> 4 & 15;
                if (o = Tables.bitrate_table[n][o], e[r + 1] >> 4 == 14 ? t.samprate = Tables.samplerate_table[2][s] : t.samprate = Tables.samplerate_table[n][s], r += 0 != n ? 3 != i ? 36 : 21 : 3 != i ? 21 : 13, !h(e, r)) return null;
                r += 4, t.hId = n;
                var _ = t.flags = a(e, r);
                if (r += 4, 0 != (_ & S) && (t.frames = a(e, r), r += 4), 0 != (_ & A) && (t.bytes = a(e, r), r += 4), 0 != (_ & R)) {
                    if (null != t.toc)
                        for (var l = 0; y > l; l++) t.toc[l] = e[r + l];
                    r += y
                }
                t.vbrScale = -1, 0 != (_ & M) && (t.vbrScale = a(e, r), r += 4), t.headersize = 72e3 * (n + 1) * o / t.samprate, r += 21;
                var f = e[r + 0] << 4;
                f += e[r + 1] >> 4;
                var u = (15 & e[r + 1]) << 8;
                return u += 255 & e[r + 2], (0 > f || f > 3e3) && (f = -1), (0 > u || u > 3e3) && (u = -1), t.encDelay = f, t.encPadding = u, t
            }, this.InitVbrTag = function(e) {
                var t, a = e.internal_flags;
                t = 1 == e.version ? k : e.out_samplerate < 16e3 ? P : x, e.VBR == i.vbr_off && (t = e.brate);
                var r = 72e3 * (e.version + 1) * t / e.out_samplerate,
                    n = a.sideinfo_len + T;
                if (a.VBR_seek_table.TotalFrameSize = r, n > r || r > B) return void(e.bWriteVbrTag = !1);
                a.VBR_seek_table.nVbrNumFrames = 0, a.VBR_seek_table.nBytesWritten = 0, a.VBR_seek_table.sum = 0, a.VBR_seek_table.seen = 0, a.VBR_seek_table.want = 1, a.VBR_seek_table.pos = 0, null == a.VBR_seek_table.bag && (a.VBR_seek_table.bag = new int[400], a.VBR_seek_table.size = 400);
                var s = l(B);
                p(e, s);
                for (var o = a.VBR_seek_table.TotalFrameSize, _ = 0; o > _; ++_) g.add_dummy_byte(e, 255 & s[_], 1)
            }, this.updateMusicCRC = function(e, t, a, r) {
                for (var n = 0; r > n; ++n) e[0] = b(t[a + n], e[0])
            }, this.getLameTagFrame = function(e, a) {
                var r = e.internal_flags;
                if (!e.bWriteVbrTag) return 0;
                if (r.Class_ID != Lame.LAME_ID) return 0;
                if (r.VBR_seek_table.pos <= 0) return 0;
                if (a.length < r.VBR_seek_table.TotalFrameSize) return r.VBR_seek_table.TotalFrameSize;
                _.fill(a, 0, r.VBR_seek_table.TotalFrameSize, 0), p(e, a);
                var o = l(y);
                if (e.free_format)
                    for (var f = 1; y > f; ++f) o[f] = 255 & 255 * f / 100;
                else t(r.VBR_seek_table, o);
                var u = r.sideinfo_len;
                e.error_protection && (u -= 2), e.VBR == i.vbr_off ? (a[u++] = 255 & O.charAt(0), a[u++] = 255 & O.charAt(1), a[u++] = 255 & O.charAt(2), a[u++] = 255 & O.charAt(3)) : (a[u++] = 255 & L.charAt(0), a[u++] = 255 & L.charAt(1), a[u++] = 255 & L.charAt(2), a[u++] = 255 & L.charAt(3)), n(a, u, S + A + R + M), u += 4, n(a, u, r.VBR_seek_table.nVbrNumFrames), u += 4;
                var h = r.VBR_seek_table.nBytesWritten + r.VBR_seek_table.TotalFrameSize;
                n(a, u, 0 | h), u += 4, s.arraycopy(o, 0, a, u, o.length), u += o.length, e.error_protection && g.CRC_writeheader(r, a);
                for (var c = 0, f = 0; u > f; f++) c = b(a[f], c);
                return u += m(e, h, a, u, c), r.VBR_seek_table.TotalFrameSize
            }, this.putVbrTag = function(e, t) {
                var a = e.internal_flags;
                if (a.VBR_seek_table.pos <= 0) return -1;
                if (t.seek(t.length()), 0 == t.length()) return -1;
                var r = v(t);
                t.seek(r);
                var n = l(B),
                    s = getLameTagFrame(e, n);
                return s > n.length ? -1 : 1 > s ? 0 : (t.write(n, 0, s), 0)
            }
        }
        var n = a(157),
            s = n.System,
            i = n.VbrMode,
            o = (n.Float, n.ShortBlock),
            _ = (n.Util, n.Arrays),
            l = (n.new_array_n, n.new_byte),
            f = (n.new_double, n.new_float, n.new_float_n, n.new_int, n.new_int_n, n.assert);
        r.NUMTOCENTRIES = 100, r.MAXFRAMESIZE = 2880, e.exports = r
    },
    221: function(e, t, a) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        a.r(t);
        var n = a(198),
            s = n.Mp3Encoder;
        self.onmessage = function(e) {
            switch (e.data.command) {
                case "encode":
                    i && i.encode(e.data.buffers);
                    break;
                case "done":
                    i && i.encodeFinalFrame();
                    break;
                case "init":
                    i = new _(e.data)
            }
        };
        var i = void 0,
            o = 128,
            _ = function() {
                function e(t) {
                    r(this, e), this.numberOfChannels = t.numberOfChannels || 1, this.originalSampleRate = t.originalSampleRate, this.bitRate = t.bitRate || o, this._codec = new s(this.numberOfChannels, this.originalSampleRate, this.bitRate)
                }
                return e.prototype._convertBuffer = function(e) {
                    for (var t = new Int16Array(e[0].length), a = 0; a < t.length; a++) {
                        var r = e[0][a] / 1.2 * 32767;
                        t[a] = 0 > r ? Math.max(r, -32768) : Math.min(r, 32767)
                    }
                    return t
                }, e.prototype.encode = function(e) {
                    var t = this._convertBuffer(e),
                        a = this._codec.encodeBuffer(t);
                    self.postMessage({
                        type: "data",
                        buffer: new Int8Array(a)
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
    241: function(e, t, a) {
        function r() {
            function e(e, t, a, r, n, s, i, o, _, l, f, u, h, c, p) {
                this.vbr_q = e, this.quant_comp = t, this.quant_comp_s = a, this.expY = r, this.st_lrm = n, this.st_s = s, this.masking_adj = i, this.masking_adj_short = o, this.ath_lower = _, this.ath_curve = l, this.ath_sensitivity = f, this.interch = u, this.safejoint = h, this.sfb21mod = c, this.msfix = p
            }

            function t(e, t, a, r, n, s, i, o, _, l, f, u, h, c) {
                this.quant_comp = t, this.quant_comp_s = a, this.safejoint = r, this.nsmsfix = n, this.st_lrm = s, this.st_s = i, this.nsbass = o, this.scale = _, this.masking_adj = l, this.ath_lower = f, this.ath_curve = u, this.interch = h, this.sfscale = c
            }

            function a(e, t, a) {
                var r = e.VBR == s.vbr_rh ? o : _,
                    i = e.VBR_q_frac,
                    l = r[t],
                    f = r[t + 1],
                    u = l;
                l.st_lrm = l.st_lrm + i * (f.st_lrm - l.st_lrm), l.st_s = l.st_s + i * (f.st_s - l.st_s), l.masking_adj = l.masking_adj + i * (f.masking_adj - l.masking_adj), l.masking_adj_short = l.masking_adj_short + i * (f.masking_adj_short - l.masking_adj_short), l.ath_lower = l.ath_lower + i * (f.ath_lower - l.ath_lower), l.ath_curve = l.ath_curve + i * (f.ath_curve - l.ath_curve), l.ath_sensitivity = l.ath_sensitivity + i * (f.ath_sensitivity - l.ath_sensitivity), l.interch = l.interch + i * (f.interch - l.interch), l.msfix = l.msfix + i * (f.msfix - l.msfix), n(e, u.vbr_q), 0 != a ? e.quant_comp = u.quant_comp : Math.abs(e.quant_comp - -1) > 0 || (e.quant_comp = u.quant_comp), 0 != a ? e.quant_comp_short = u.quant_comp_s : Math.abs(e.quant_comp_short - -1) > 0 || (e.quant_comp_short = u.quant_comp_s), 0 != u.expY && (e.experimentalY = 0 != u.expY), 0 != a ? e.internal_flags.nsPsy.attackthre = u.st_lrm : Math.abs(e.internal_flags.nsPsy.attackthre - -1) > 0 || (e.internal_flags.nsPsy.attackthre = u.st_lrm), 0 != a ? e.internal_flags.nsPsy.attackthre_s = u.st_s : Math.abs(e.internal_flags.nsPsy.attackthre_s - -1) > 0 || (e.internal_flags.nsPsy.attackthre_s = u.st_s), 0 != a ? e.maskingadjust = u.masking_adj : Math.abs(e.maskingadjust - 0) > 0 || (e.maskingadjust = u.masking_adj), 0 != a ? e.maskingadjust_short = u.masking_adj_short : Math.abs(e.maskingadjust_short - 0) > 0 || (e.maskingadjust_short = u.masking_adj_short), 0 != a ? e.ATHlower = -u.ath_lower / 10 : Math.abs(10 * -e.ATHlower - 0) > 0 || (e.ATHlower = -u.ath_lower / 10), 0 != a ? e.ATHcurve = u.ath_curve : Math.abs(e.ATHcurve - -1) > 0 || (e.ATHcurve = u.ath_curve), 0 != a ? e.athaa_sensitivity = u.ath_sensitivity : Math.abs(e.athaa_sensitivity - -1) > 0 || (e.athaa_sensitivity = u.ath_sensitivity), u.interch > 0 && (0 != a ? e.interChRatio = u.interch : Math.abs(e.interChRatio - -1) > 0 || (e.interChRatio = u.interch)), u.safejoint > 0 && (e.exp_nspsytune = e.exp_nspsytune | u.safejoint), u.sfb21mod > 0 && (e.exp_nspsytune = e.exp_nspsytune | u.sfb21mod << 20), 0 != a ? e.msfix = u.msfix : Math.abs(e.msfix - -1) > 0 || (e.msfix = u.msfix), 0 == a && (e.VBR_q = t, e.VBR_q_frac = i)
            }

            function r(e, t, a) {
                var r = t,
                    n = i.nearestBitrateFullIndex(t);
                if (e.VBR = s.vbr_abr, e.VBR_mean_bitrate_kbps = r, e.VBR_mean_bitrate_kbps = Math.min(e.VBR_mean_bitrate_kbps, 320), e.VBR_mean_bitrate_kbps = Math.max(e.VBR_mean_bitrate_kbps, 8), e.brate = e.VBR_mean_bitrate_kbps, e.VBR_mean_bitrate_kbps > 320 && (e.disable_reservoir = !0), l[n].safejoint > 0 && (e.exp_nspsytune = 2 | e.exp_nspsytune), l[n].sfscale > 0 && (e.internal_flags.noise_shaping = 2), Math.abs(l[n].nsbass) > 0) {
                    var o = int(4 * l[n].nsbass);
                    0 > o && (o += 64), e.exp_nspsytune = e.exp_nspsytune | o << 2
                }
                return 0 != a ? e.quant_comp = l[n].quant_comp : Math.abs(e.quant_comp - -1) > 0 || (e.quant_comp = l[n].quant_comp), 0 != a ? e.quant_comp_short = l[n].quant_comp_s : Math.abs(e.quant_comp_short - -1) > 0 || (e.quant_comp_short = l[n].quant_comp_s), 0 != a ? e.msfix = l[n].nsmsfix : Math.abs(e.msfix - -1) > 0 || (e.msfix = l[n].nsmsfix), 0 != a ? e.internal_flags.nsPsy.attackthre = l[n].st_lrm : Math.abs(e.internal_flags.nsPsy.attackthre - -1) > 0 || (e.internal_flags.nsPsy.attackthre = l[n].st_lrm), 0 != a ? e.internal_flags.nsPsy.attackthre_s = l[n].st_s : Math.abs(e.internal_flags.nsPsy.attackthre_s - -1) > 0 || (e.internal_flags.nsPsy.attackthre_s = l[n].st_s), 0 != a ? e.scale = l[n].scale : Math.abs(e.scale - -1) > 0 || (e.scale = l[n].scale), 0 != a ? e.maskingadjust = l[n].masking_adj : Math.abs(e.maskingadjust - 0) > 0 || (e.maskingadjust = l[n].masking_adj), l[n].masking_adj > 0 ? 0 != a ? e.maskingadjust_short = .9 * l[n].masking_adj : Math.abs(e.maskingadjust_short - 0) > 0 || (e.maskingadjust_short = .9 * l[n].masking_adj) : 0 != a ? e.maskingadjust_short = 1.1 * l[n].masking_adj : Math.abs(e.maskingadjust_short - 0) > 0 || (e.maskingadjust_short = 1.1 * l[n].masking_adj), 0 != a ? e.ATHlower = -l[n].ath_lower / 10 : Math.abs(10 * -e.ATHlower - 0) > 0 || (e.ATHlower = -l[n].ath_lower / 10), 0 != a ? e.ATHcurve = l[n].ath_curve : Math.abs(e.ATHcurve - -1) > 0 || (e.ATHcurve = l[n].ath_curve), 0 != a ? e.interChRatio = l[n].interch : Math.abs(e.interChRatio - -1) > 0 || (e.interChRatio = l[n].interch), t
            }

            function n(e, t) {
                var a = 0;
                return 0 > t && (a = -1, t = 0), t > 9 && (a = -1, t = 9), e.VBR_q = t, e.VBR_q_frac = 0, a
            }
            var i;
            this.setModules = function(e) {
                i = e
            };
            var o = [new e(0, 9, 9, 0, 5.2, 125, -4.2, -6.3, 4.8, 1, 0, 0, 2, 21, .97), new e(1, 9, 9, 0, 5.3, 125, -3.6, -5.6, 4.5, 1.5, 0, 0, 2, 21, 1.35), new e(2, 9, 9, 0, 5.6, 125, -2.2, -3.5, 2.8, 2, 0, 0, 2, 21, 1.49), new e(3, 9, 9, 1, 5.8, 130, -1.8, -2.8, 2.6, 3, -4, 0, 2, 20, 1.64), new e(4, 9, 9, 1, 6, 135, -.7, -1.1, 1.1, 3.5, -8, 0, 2, 0, 1.79), new e(5, 9, 9, 1, 6.4, 140, .5, .4, -7.5, 4, -12, 2e-4, 0, 0, 1.95), new e(6, 9, 9, 1, 6.6, 145, .67, .65, -14.7, 6.5, -19, 4e-4, 0, 0, 2.3), new e(7, 9, 9, 1, 6.6, 145, .8, .75, -19.7, 8, -22, 6e-4, 0, 0, 2.7), new e(8, 9, 9, 1, 6.6, 145, 1.2, 1.15, -27.5, 10, -23, 7e-4, 0, 0, 0), new e(9, 9, 9, 1, 6.6, 145, 1.6, 1.6, -36, 11, -25, 8e-4, 0, 0, 0), new e(10, 9, 9, 1, 6.6, 145, 2, 2, -36, 12, -25, 8e-4, 0, 0, 0)],
                _ = [new e(0, 9, 9, 0, 4.2, 25, -7, -4, 7.5, 1, 0, 0, 2, 26, .97), new e(1, 9, 9, 0, 4.2, 25, -5.6, -3.6, 4.5, 1.5, 0, 0, 2, 21, 1.35), new e(2, 9, 9, 0, 4.2, 25, -4.4, -1.8, 2, 2, 0, 0, 2, 18, 1.49), new e(3, 9, 9, 1, 4.2, 25, -3.4, -1.25, 1.1, 3, -4, 0, 2, 15, 1.64), new e(4, 9, 9, 1, 4.2, 25, -2.2, .1, 0, 3.5, -8, 0, 2, 0, 1.79), new e(5, 9, 9, 1, 4.2, 25, -1, 1.65, -7.7, 4, -12, 2e-4, 0, 0, 1.95), new e(6, 9, 9, 1, 4.2, 25, -0, 2.47, -7.7, 6.5, -19, 4e-4, 0, 0, 2), new e(7, 9, 9, 1, 4.2, 25, .5, 2, -14.5, 8, -22, 6e-4, 0, 0, 2), new e(8, 9, 9, 1, 4.2, 25, 1, 2.4, -22, 10, -23, 7e-4, 0, 0, 2), new e(9, 9, 9, 1, 4.2, 25, 1.5, 2.95, -30, 11, -25, 8e-4, 0, 0, 2), new e(10, 9, 9, 1, 4.2, 25, 2, 2.95, -36, 12, -30, 8e-4, 0, 0, 2)],
                l = [new t(8, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -30, 11, .0012, 1), new t(16, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -25, 11, .001, 1), new t(24, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -20, 11, .001, 1), new t(32, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -15, 11, .001, 1), new t(40, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -10, 11, 9e-4, 1), new t(48, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -10, 11, 9e-4, 1), new t(56, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -6, 11, 8e-4, 1), new t(64, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, -2, 11, 8e-4, 1), new t(80, 9, 9, 0, 0, 6.6, 145, 0, .95, 0, 0, 8, 7e-4, 1), new t(96, 9, 9, 0, 2.5, 6.6, 145, 0, .95, 0, 1, 5.5, 6e-4, 1), new t(112, 9, 9, 0, 2.25, 6.6, 145, 0, .95, 0, 2, 4.5, 5e-4, 1), new t(128, 9, 9, 0, 1.95, 6.4, 140, 0, .95, 0, 3, 4, 2e-4, 1), new t(160, 9, 9, 1, 1.79, 6, 135, 0, .95, -2, 5, 3.5, 0, 1), new t(192, 9, 9, 1, 1.49, 5.6, 125, 0, .97, -4, 7, 3, 0, 0), new t(224, 9, 9, 1, 1.25, 5.2, 125, 0, .98, -6, 9, 2, 0, 0), new t(256, 9, 9, 1, .97, 5.2, 125, 0, 1, -8, 10, 1, 0, 0), new t(320, 9, 9, 1, .9, 5.2, 125, 0, 1, -10, 12, 0, 0, 0)];
            this.apply_preset = function(e, t, n) {
                switch (t) {
                    case Lame.R3MIX:
                        t = Lame.V3, e.VBR = s.vbr_mtrh;
                        break;
                    case Lame.MEDIUM:
                        t = Lame.V4, e.VBR = s.vbr_rh;
                        break;
                    case Lame.MEDIUM_FAST:
                        t = Lame.V4, e.VBR = s.vbr_mtrh;
                        break;
                    case Lame.STANDARD:
                        t = Lame.V2, e.VBR = s.vbr_rh;
                        break;
                    case Lame.STANDARD_FAST:
                        t = Lame.V2, e.VBR = s.vbr_mtrh;
                        break;
                    case Lame.EXTREME:
                        t = Lame.V0, e.VBR = s.vbr_rh;
                        break;
                    case Lame.EXTREME_FAST:
                        t = Lame.V0, e.VBR = s.vbr_mtrh;
                        break;
                    case Lame.INSANE:
                        return t = 320, e.preset = t, r(e, t, n), e.VBR = s.vbr_off, t
                }
                switch (e.preset = t, t) {
                    case Lame.V9:
                        return a(e, 9, n), t;
                    case Lame.V8:
                        return a(e, 8, n), t;
                    case Lame.V7:
                        return a(e, 7, n), t;
                    case Lame.V6:
                        return a(e, 6, n), t;
                    case Lame.V5:
                        return a(e, 5, n), t;
                    case Lame.V4:
                        return a(e, 4, n), t;
                    case Lame.V3:
                        return a(e, 3, n), t;
                    case Lame.V2:
                        return a(e, 2, n), t;
                    case Lame.V1:
                        return a(e, 1, n), t;
                    case Lame.V0:
                        return a(e, 0, n), t
                }
                return t >= 8 && 320 >= t ? r(e, t, n) : (e.preset = 0, t)
            }
        }
        var n = a(157),
            s = (n.System, n.VbrMode);
        n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float, n.new_float_n, n.new_int, n.new_int_n, n.assert, e.exports = r
    },
    243: function(e, t, a) {
        function r(e, t, a, r) {
            this.l = i(1 + o.SBMAX_l), this.s = i(1 + o.SBMAX_s), this.psfb21 = i(1 + o.PSFB21), this.psfb12 = i(1 + o.PSFB12);
            var n = this.l,
                _ = this.s;
            4 == arguments.length && (this.arrL = arguments[0], this.arrS = arguments[1], this.arr21 = arguments[2], this.arr12 = arguments[3], s.arraycopy(this.arrL, 0, n, 0, Math.min(this.arrL.length, this.l.length)), s.arraycopy(this.arrS, 0, _, 0, Math.min(this.arrS.length, this.s.length)), s.arraycopy(this.arr21, 0, this.psfb21, 0, Math.min(this.arr21.length, this.psfb21.length)), s.arraycopy(this.arr12, 0, this.psfb12, 0, Math.min(this.arr12.length, this.psfb12.length)))
        }
        var n = a(157),
            s = n.System,
            i = (n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float, n.new_float_n, n.new_int),
            o = (n.new_int_n, n.assert, a(10));
        e.exports = r
    },
    258: function(e, t, a) {
        var r = a(10),
            n = {};
        n.SFBMAX = 3 * r.SBMAX_s, e.exports = n
    },
    274: function(e, t, a) {
        function r() {
            function e(e) {
                return u(0 <= e + r.Q_MAX2 && e < r.Q_MAX), y[e + r.Q_MAX2]
            }

            function t(e, t) {
                var a = v.ATHformula(t, e);
                return a -= R, a = Math.pow(10, a / 10 + e.ATHlower)
            }

            function a(e) {
                for (var a = e.internal_flags.ATH.l, r = e.internal_flags.ATH.psfb21, n = e.internal_flags.ATH.s, s = e.internal_flags.ATH.psfb12, i = e.internal_flags, _ = e.out_samplerate, l = 0; l < h.SBMAX_l; l++) {
                    var f = i.scalefac_band.l[l],
                        u = i.scalefac_band.l[l + 1];
                    a[l] = o.MAX_VALUE;
                    for (var c = f; u > c; c++) {
                        var p = c * _ / 1152,
                            b = t(e, p);
                        a[l] = Math.min(a[l], b)
                    }
                }
                for (var l = 0; l < h.PSFB21; l++) {
                    var f = i.scalefac_band.psfb21[l],
                        u = i.scalefac_band.psfb21[l + 1];
                    r[l] = o.MAX_VALUE;
                    for (var c = f; u > c; c++) {
                        var p = c * _ / 1152,
                            b = t(e, p);
                        r[l] = Math.min(r[l], b)
                    }
                }
                for (var l = 0; l < h.SBMAX_s; l++) {
                    var f = i.scalefac_band.s[l],
                        u = i.scalefac_band.s[l + 1];
                    n[l] = o.MAX_VALUE;
                    for (var c = f; u > c; c++) {
                        var p = c * _ / 384,
                            b = t(e, p);
                        n[l] = Math.min(n[l], b)
                    }
                    n[l] *= i.scalefac_band.s[l + 1] - i.scalefac_band.s[l]
                }
                for (var l = 0; l < h.PSFB12; l++) {
                    var f = i.scalefac_band.psfb12[l],
                        u = i.scalefac_band.psfb12[l + 1];
                    s[l] = o.MAX_VALUE;
                    for (var c = f; u > c; c++) {
                        var p = c * _ / 384,
                            b = t(e, p);
                        s[l] = Math.min(s[l], b)
                    }
                    s[l] *= i.scalefac_band.s[13] - i.scalefac_band.s[12]
                }
                if (e.noATH) {
                    for (var l = 0; l < h.SBMAX_l; l++) a[l] = 1e-20;
                    for (var l = 0; l < h.PSFB21; l++) r[l] = 1e-20;
                    for (var l = 0; l < h.SBMAX_s; l++) n[l] = 1e-20;
                    for (var l = 0; l < h.PSFB12; l++) s[l] = 1e-20
                }
                i.ATH.floor = 10 * Math.log10(t(e, -1))
            }

            function s(e) {
                this.s = e
            }
            var b = null,
                m = null,
                v = null;
            this.setModules = function(e, t, a) {
                b = e, m = t, v = a
            }, this.IPOW20 = function(e) {
                return u(e >= 0 && e < r.Q_MAX), B[e]
            };
            var d = 2.220446049250313e-16,
                g = r.IXMAX_VAL,
                w = g + 2,
                S = r.Q_MAX,
                A = r.Q_MAX2,
                R = (r.LARGE_BITS, 100);
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
            var M = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 3, 3, 2, 0];
            this.pretab = M, this.sfBandIndex = [new n([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0, 4, 8, 12, 18, 24, 32, 42, 56, 74, 100, 132, 174, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new n([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 114, 136, 162, 194, 232, 278, 332, 394, 464, 540, 576], [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 136, 180, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new n([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new n([0, 4, 8, 12, 16, 20, 24, 30, 36, 44, 52, 62, 74, 90, 110, 134, 162, 196, 238, 288, 342, 418, 576], [0, 4, 8, 12, 16, 22, 30, 40, 52, 66, 84, 106, 136, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new n([0, 4, 8, 12, 16, 20, 24, 30, 36, 42, 50, 60, 72, 88, 106, 128, 156, 190, 230, 276, 330, 384, 576], [0, 4, 8, 12, 16, 22, 28, 38, 50, 64, 80, 100, 126, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new n([0, 4, 8, 12, 16, 20, 24, 30, 36, 44, 54, 66, 82, 102, 126, 156, 194, 240, 296, 364, 448, 550, 576], [0, 4, 8, 12, 16, 22, 30, 42, 58, 78, 104, 138, 180, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new n([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new n([0, 6, 12, 18, 24, 30, 36, 44, 54, 66, 80, 96, 116, 140, 168, 200, 238, 284, 336, 396, 464, 522, 576], [0, 4, 8, 12, 18, 26, 36, 48, 62, 80, 104, 134, 174, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]), new n([0, 12, 24, 36, 48, 60, 72, 88, 108, 132, 160, 192, 232, 280, 336, 400, 476, 566, 568, 570, 572, 574, 576], [0, 8, 16, 24, 36, 52, 72, 96, 124, 160, 162, 164, 166, 192], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0])];
            var y = l(S + A + 1),
                B = l(S),
                E = l(w),
                T = l(w);
            this.adj43 = T, this.iteration_init = function(e) {
                var t, r = e.internal_flags,
                    n = r.l3_side;
                if (0 == r.iteration_init_init) {
                    for (r.iteration_init_init = 1, n.main_data_begin = 0, a(e), E[0] = 0, t = 1; w > t; t++) E[t] = Math.pow(t, 4 / 3);
                    for (t = 0; w - 1 > t; t++) T[t] = t + 1 - Math.pow(.5 * (E[t] + E[t + 1]), .75);
                    for (T[t] = .5, t = 0; S > t; t++) B[t] = Math.pow(2, (t - 210) * -.1875);
                    for (t = 0; S + A >= t; t++) y[t] = Math.pow(2, .25 * (t - 210 - A));
                    b.huffman_init(r);
                    var s, i, o, _;
                    for (t = e.exp_nspsytune >> 2 & 63, t >= 32 && (t -= 64), s = Math.pow(10, t / 4 / 10), t = e.exp_nspsytune >> 8 & 63, t >= 32 && (t -= 64), i = Math.pow(10, t / 4 / 10), t = e.exp_nspsytune >> 14 & 63, t >= 32 && (t -= 64), o = Math.pow(10, t / 4 / 10), t = e.exp_nspsytune >> 20 & 63, t >= 32 && (t -= 64), _ = o * Math.pow(10, t / 4 / 10), t = 0; t < h.SBMAX_l; t++) {
                        var l;
                        l = 6 >= t ? s : 13 >= t ? i : 20 >= t ? o : _, r.nsPsy.longfact[t] = l
                    }
                    for (t = 0; t < h.SBMAX_s; t++) {
                        var l;
                        l = 5 >= t ? s : 10 >= t ? i : 11 >= t ? o : _, r.nsPsy.shortfact[t] = l
                    }
                }
            }, this.on_pe = function(e, t, a, r, n, s) {
                var i, o, _ = e.internal_flags,
                    l = 0,
                    h = f(2),
                    b = new c(l),
                    v = m.ResvMaxBits(e, r, b, s);
                l = b.bits;
                var d = l + v;
                for (d > p.MAX_BITS_PER_GRANULE && (d = p.MAX_BITS_PER_GRANULE), i = 0, o = 0; o < _.channels_out; ++o) a[o] = Math.min(p.MAX_BITS_PER_CHANNEL, l / _.channels_out), h[o] = 0 | a[o] * t[n][o] / 700 - a[o], h[o] > 3 * r / 4 && (h[o] = 3 * r / 4), h[o] < 0 && (h[o] = 0), h[o] + a[o] > p.MAX_BITS_PER_CHANNEL && (h[o] = Math.max(0, p.MAX_BITS_PER_CHANNEL - a[o])), i += h[o];
                if (i > v)
                    for (o = 0; o < _.channels_out; ++o) h[o] = v * h[o] / i;
                for (o = 0; o < _.channels_out; ++o) a[o] += h[o], v -= h[o];
                for (i = 0, o = 0; o < _.channels_out; ++o) i += a[o];
                if (i > p.MAX_BITS_PER_GRANULE) {
                    var g = 0;
                    for (o = 0; o < _.channels_out; ++o) a[o] *= p.MAX_BITS_PER_GRANULE, a[o] /= i, g += a[o];
                    u(g <= p.MAX_BITS_PER_GRANULE)
                }
                return d
            }, this.reduce_side = function(e, t, a, r) {
                u(r <= p.MAX_BITS_PER_GRANULE), u(e[0] + e[1] <= p.MAX_BITS_PER_GRANULE);
                var n = .33 * (.5 - t) / .5;
                0 > n && (n = 0), n > .5 && (n = .5);
                var s = 0 | .5 * n * (e[0] + e[1]);
                s > p.MAX_BITS_PER_CHANNEL - e[0] && (s = p.MAX_BITS_PER_CHANNEL - e[0]), 0 > s && (s = 0), e[1] >= 125 && (e[1] - s > 125 ? (e[0] < a && (e[0] += s), e[1] -= s) : (e[0] += e[1] - 125, e[1] = 125)), s = e[0] + e[1], s > r && (e[0] = r * e[0] / s, e[1] = r * e[1] / s), u(e[0] <= p.MAX_BITS_PER_CHANNEL), u(e[1] <= p.MAX_BITS_PER_CHANNEL), u(e[0] + e[1] <= p.MAX_BITS_PER_GRANULE)
            }, this.athAdjust = function(e, t, a) {
                var r = 90.30873362,
                    n = 94.82444863,
                    s = _.FAST_LOG10_X(t, 10),
                    i = e * e,
                    o = 0;
                return s -= a, i > 1e-20 && (o = 1 + _.FAST_LOG10_X(i, 10 / r)), 0 > o && (o = 0), s *= o, s += a + r - n, Math.pow(10, .1 * s)
            }, this.calc_xmin = function(e, t, a, r) {
                var n, s = 0,
                    o = e.internal_flags,
                    _ = 0,
                    l = 0,
                    f = o.ATH,
                    u = a.xr,
                    c = e.VBR == i.vbr_mtrh ? 1 : 0,
                    p = o.masking_lower;
                for ((e.VBR == i.vbr_mtrh || e.VBR == i.vbr_mt) && (p = 1), n = 0; n < a.psy_lmax; n++) {
                    var b, m, v, g, w, S;
                    m = e.VBR == i.vbr_rh || e.VBR == i.vbr_mtrh ? athAdjust(f.adjust, f.l[n], f.floor) : f.adjust * f.l[n], w = a.width[n], v = m / w, g = d, S = w >> 1, b = 0;
                    do {
                        var A, R;
                        A = u[_] * u[_], b += A, g += v > A ? A : v, _++, R = u[_] * u[_], b += R, g += v > R ? R : v, _++
                    } while (--S > 0);
                    if (b > m && l++, n == h.SBPSY_l) {
                        var M = m * o.nsPsy.longfact[n];
                        M > g && (g = M)
                    }
                    if (0 != c && (m = g), !e.ATHonly) {
                        var y = t.en.l[n];
                        if (y > 0) {
                            var M;
                            M = b * t.thm.l[n] * p / y, 0 != c && (M *= o.nsPsy.longfact[n]), M > m && (m = M)
                        }
                    }
                    0 != c ? r[s++] = m : r[s++] = m * o.nsPsy.longfact[n]
                }
                var B = 575;
                if (a.block_type != h.SHORT_TYPE)
                    for (var E = 576; 0 != E-- && BitStream.EQ(u[E], 0);) B = E;
                a.max_nonzero_coeff = B;
                for (var T = a.sfb_smin; n < a.psymax; T++, n += 3) {
                    var w, k, x;
                    for (x = e.VBR == i.vbr_rh || e.VBR == i.vbr_mtrh ? athAdjust(f.adjust, f.s[T], f.floor) : f.adjust * f.s[T], w = a.width[n], k = 0; 3 > k; k++) {
                        var m, v, g, b = 0,
                            S = w >> 1;
                        v = x / w, g = d;
                        do {
                            var A, R;
                            A = u[_] * u[_], b += A, g += v > A ? A : v, _++, R = u[_] * u[_], b += R, g += v > R ? R : v, _++
                        } while (--S > 0);
                        if (b > x && l++, T == h.SBPSY_s) {
                            var M = x * o.nsPsy.shortfact[T];
                            M > g && (g = M)
                        }
                        if (m = 0 != c ? g : x, !e.ATHonly && !e.ATHshort) {
                            var y = t.en.s[T][k];
                            if (y > 0) {
                                var M;
                                M = b * t.thm.s[T][k] * p / y, 0 != c && (M *= o.nsPsy.shortfact[T]), M > m && (m = M)
                            }
                        }
                        0 != c ? r[s++] = m : r[s++] = m * o.nsPsy.shortfact[T]
                    }
                    e.useTemporal && (r[s - 3] > r[s - 3 + 1] && (r[s - 3 + 1] += (r[s - 3] - r[s - 3 + 1]) * o.decay), r[s - 3 + 1] > r[s - 3 + 2] && (r[s - 3 + 2] += (r[s - 3 + 1] - r[s - 3 + 2]) * o.decay))
                }
                return l
            }, this.calc_noise_core = function(e, t, a, r) {
                var n = 0,
                    s = t.s,
                    i = e.l3_enc;
                if (s > e.count1)
                    for (; 0 != a--;) {
                        var o;
                        o = e.xr[s], s++, n += o * o, o = e.xr[s], s++, n += o * o
                    } else if (s > e.big_values) {
                        var _ = l(2);
                        for (_[0] = 0, _[1] = r; 0 != a--;) {
                            var o;
                            o = Math.abs(e.xr[s]) - _[i[s]], s++, n += o * o, o = Math.abs(e.xr[s]) - _[i[s]], s++, n += o * o
                        }
                    } else
                        for (; 0 != a--;) {
                            var o;
                            o = Math.abs(e.xr[s]) - E[i[s]] * r, s++, n += o * o, o = Math.abs(e.xr[s]) - E[i[s]] * r, s++, n += o * o
                        }
                return t.s = s, n
            }, this.calc_noise = function(t, a, r, n, i) {
                var o, l, f = 0,
                    u = 0,
                    h = 0,
                    c = 0,
                    p = 0,
                    b = -20,
                    m = 0,
                    v = t.scalefac,
                    d = 0;
                for (n.over_SSD = 0, o = 0; o < t.psymax; o++) {
                    var g = t.global_gain - (v[d++] + (0 != t.preflag ? M[o] : 0) << t.scalefac_scale + 1) - 8 * t.subblock_gain[t.window[o]],
                        w = 0;
                    if (null != i && i.step[o] == g) w = i.noise[o], m += t.width[o], r[f++] = w / a[u++], w = i.noise_log[o];
                    else {
                        var S = e(g);
                        if (l = t.width[o] >> 1, m + t.width[o] > t.max_nonzero_coeff) {
                            var A;
                            A = t.max_nonzero_coeff - m + 1, l = A > 0 ? A >> 1 : 0
                        }
                        var R = new s(m);
                        w = this.calc_noise_core(t, R, l, S), m = R.s, null != i && (i.step[o] = g, i.noise[o] = w), w = r[f++] = w / a[u++], w = _.FAST_LOG10(Math.max(w, 1e-20)), null != i && (i.noise_log[o] = w)
                    }
                    if (null != i && (i.global_gain = t.global_gain), p += w, w > 0) {
                        var y;
                        y = Math.max(0 | 10 * w + .5, 1), n.over_SSD += y * y, h++, c += w
                    }
                    b = Math.max(b, w)
                }
                return n.over_count = h, n.tot_noise = p, n.over_noise = c, n.max_noise = b, h
            }, this.set_pinfo = function(e, t, a, r, n) {
                var s, i, o, _, f, c = e.internal_flags,
                    p = 0 == t.scalefac_scale ? .5 : 1,
                    b = t.scalefac,
                    m = l(L3Side.SFBMAX),
                    v = l(L3Side.SFBMAX),
                    d = new CalcNoiseResult;
                calc_xmin(e, a, t, m), calc_noise(t, m, v, d, null);
                var g = 0;
                for (i = t.sfb_lmax, t.block_type != h.SHORT_TYPE && 0 == t.mixed_block_flag && (i = 22), s = 0; i > s; s++) {
                    var w = c.scalefac_band.l[s],
                        S = c.scalefac_band.l[s + 1],
                        A = S - w;
                    for (_ = 0; S > g; g++) _ += t.xr[g] * t.xr[g];
                    _ /= A, f = 1e15, c.pinfo.en[r][n][s] = f * _, c.pinfo.xfsf[r][n][s] = f * m[s] * v[s] / A, a.en.l[s] > 0 && !e.ATHonly ? _ /= a.en.l[s] : _ = 0, c.pinfo.thr[r][n][s] = f * Math.max(_ * a.thm.l[s], c.ATH.l[s]), c.pinfo.LAMEsfb[r][n][s] = 0, 0 != t.preflag && s >= 11 && (c.pinfo.LAMEsfb[r][n][s] = -p * M[s]), s < h.SBPSY_l && (u(b[s] >= 0), c.pinfo.LAMEsfb[r][n][s] -= p * b[s])
                }
                if (t.block_type == h.SHORT_TYPE)
                    for (i = s, s = t.sfb_smin; s < h.SBMAX_s; s++)
                        for (var w = c.scalefac_band.s[s], S = c.scalefac_band.s[s + 1], A = S - w, R = 0; 3 > R; R++) {
                            for (_ = 0, o = w; S > o; o++) _ += t.xr[g] * t.xr[g], g++;
                            _ = Math.max(_ / A, 1e-20), f = 1e15, c.pinfo.en_s[r][n][3 * s + R] = f * _, c.pinfo.xfsf_s[r][n][3 * s + R] = f * m[i] * v[i] / A, a.en.s[s][R] > 0 ? _ /= a.en.s[s][R] : _ = 0, (e.ATHonly || e.ATHshort) && (_ = 0), c.pinfo.thr_s[r][n][3 * s + R] = f * Math.max(_ * a.thm.s[s][R], c.ATH.s[s]), c.pinfo.LAMEsfb_s[r][n][3 * s + R] = -2 * t.subblock_gain[R], s < h.SBPSY_s && (c.pinfo.LAMEsfb_s[r][n][3 * s + R] -= p * b[i]), i++
                        }
                c.pinfo.LAMEqss[r][n] = t.global_gain, c.pinfo.LAMEmainbits[r][n] = t.part2_3_length + t.part2_length, c.pinfo.LAMEsfbits[r][n] = t.part2_length, c.pinfo.over[r][n] = d.over_count, c.pinfo.max_noise[r][n] = 10 * d.max_noise, c.pinfo.over_noise[r][n] = 10 * d.over_noise, c.pinfo.tot_noise[r][n] = 10 * d.tot_noise, c.pinfo.over_SSD[r][n] = d.over_SSD
            }
        }
        var n = a(243),
            s = a(157),
            i = (s.System, s.VbrMode),
            o = s.Float,
            _ = (s.ShortBlock, s.Util),
            l = (s.Arrays, s.new_array_n, s.new_byte, s.new_double, s.new_float),
            f = (s.new_float_n, s.new_int),
            u = (s.new_int_n, s.assert),
            h = a(10),
            c = a(212),
            p = a(175);
        r.Q_MAX = 257, r.Q_MAX2 = 116, r.LARGE_BITS = 1e5, r.IXMAX_VAL = 8206, e.exports = r
    },
    293: function(e, t) {
        function a() {
            var e = "http://www.mp3dev.org/",
                t = 3,
                a = 98,
                r = 4,
                n = 0,
                s = 93;
            this.getLameVersion = function() {
                return t + "." + a + "." + r
            }, this.getLameShortVersion = function() {
                return t + "." + a + "." + r
            }, this.getLameVeryShortVersion = function() {
                return "LAME" + t + "." + a + "r"
            }, this.getPsyVersion = function() {
                return n + "." + s
            }, this.getLameUrl = function() {
                return e
            }, this.getLameOsBitness = function() {
                return "32bits"
            }
        }
        e.exports = a
    },
    30: function(e, t, a) {
        function r() {
            this.l = o(n.SBMAX_l), this.s = _([n.SBMAX_s, 3]);
            var e = this;
            this.assign = function(t) {
                i.arraycopy(t.l, 0, e.l, 0, n.SBMAX_l);
                for (var a = 0; a < n.SBMAX_s; a++)
                    for (var r = 0; 3 > r; r++) e.s[a][r] = t.s[a][r]
            }
        }
        var n = a(10),
            s = a(157),
            i = s.System,
            o = (s.VbrMode, s.Float, s.ShortBlock, s.Util, s.Arrays, s.new_array_n, s.new_byte, s.new_double, s.new_float),
            _ = s.new_float_n;
        s.new_int, s.new_int_n, s.assert, e.exports = r
    },
    306: function(e, t, a) {
        function r() {
            function e(e) {
                return e
            }

            function t(e, t) {
                for (var a = 0, r = 0; r < b.BLKSIZE / 2; ++r) a += e[r] * t.ATH.eql_w[r];
                return a *= se
            }

            function a(a, r, n, s, i, o, l, f, u, h, c) {
                var p = a.internal_flags;
                if (2 > u) J.fft_long(p, s[i], u, h, c), J.fft_short(p, o[l], u, h, c);
                else if (2 == u) {
                    for (var m = b.BLKSIZE - 1; m >= 0; --m) {
                        var v = s[i + 0][m],
                            d = s[i + 1][m];
                        s[i + 0][m] = (v + d) * _.SQRT2 * .5, s[i + 1][m] = (v - d) * _.SQRT2 * .5
                    }
                    for (var g = 2; g >= 0; --g)
                        for (var m = b.BLKSIZE_s - 1; m >= 0; --m) {
                            var v = o[l + 0][g][m],
                                d = o[l + 1][g][m];
                            o[l + 0][g][m] = (v + d) * _.SQRT2 * .5, o[l + 1][g][m] = (v - d) * _.SQRT2 * .5
                        }
                }
                r[0] = e(s[i + 0][0]), r[0] *= r[0];
                for (var m = b.BLKSIZE / 2 - 1; m >= 0; --m) {
                    var w = s[i + 0][b.BLKSIZE / 2 - m],
                        S = s[i + 0][b.BLKSIZE / 2 + m];
                    r[b.BLKSIZE / 2 - m] = e(.5 * (w * w + S * S))
                }
                for (var g = 2; g >= 0; --g) {
                    n[g][0] = o[l + 0][g][0], n[g][0] *= n[g][0];
                    for (var m = b.BLKSIZE_s / 2 - 1; m >= 0; --m) {
                        var w = o[l + 0][g][b.BLKSIZE_s / 2 - m],
                            S = o[l + 0][g][b.BLKSIZE_s / 2 + m];
                        n[g][b.BLKSIZE_s / 2 - m] = e(.5 * (w * w + S * S))
                    }
                }
                for (var A = 0, m = 11; m < b.HBLKSIZE; m++) A += r[m];
                if (p.tot_ener[u] = A, a.analysis) {
                    for (var m = 0; m < b.HBLKSIZE; m++) p.pinfo.energy[f][u][m] = p.pinfo.energy_save[u][m], p.pinfo.energy_save[u][m] = r[m];
                    p.pinfo.pe[f][u] = p.pe[u]
                }
                2 == a.athaa_loudapprox && 2 > u && (p.loudness_sq[f][u] = p.loudness_sq_save[u], p.loudness_sq_save[u] = t(r, p))
            }

            function r() {
                Z = Math.pow(10, (ce + 1) / 16), Q = Math.pow(10, (pe + 1) / 16), W = Math.pow(10, be / 10)
            }

            function n(e, t, a, r, n, s) {
                var i;
                if (t > e) {
                    if (!(e * Q > t)) return e + t;
                    i = t / e
                } else {
                    if (e >= t * Q) return e + t;
                    i = e / t
                }
                if (c(e >= 0), c(t >= 0), e += t, 6 >= r + 3) {
                    if (i >= Z) return e;
                    var o = 0 | _.FAST_LOG10_X(i, 16);
                    return e * de[o]
                }
                var o = 0 | _.FAST_LOG10_X(i, 16);
                if (t = 0 != s ? n.ATH.cb_s[a] * n.ATH.adjust : n.ATH.cb_l[a] * n.ATH.adjust, c(t >= 0), W * t > e) {
                    if (e > t) {
                        var l, f;
                        return l = 1, 13 >= o && (l = ge[o]), f = _.FAST_LOG10_X(e / t, 10 / 15), e * ((ve[o] - l) * f + l)
                    }
                    return o > 13 ? e : e * ge[o]
                }
                return e * ve[o]
            }

            function m(e, t, a) {
                var r;
                if (0 > e && (e = 0), 0 > t && (t = 0), 0 >= e) return t;
                if (0 >= t) return e;
                if (r = t > e ? t / e : e / t, a >= -2 && 2 >= a) {
                    if (r >= Z) return e + t;
                    var n = 0 | _.FAST_LOG10_X(r, 16);
                    return (e + t) * we[n]
                }
                return Q > r ? e + t : (t > e && (e = t), e)
            }

            function v(e, t) {
                var a = e.internal_flags;
                if (a.channels_out > 1) {
                    for (var r = 0; r < b.SBMAX_l; r++) {
                        var n = a.thm[0].l[r],
                            s = a.thm[1].l[r];
                        a.thm[0].l[r] += s * t, a.thm[1].l[r] += n * t
                    }
                    for (var r = 0; r < b.SBMAX_s; r++)
                        for (var i = 0; 3 > i; i++) {
                            var n = a.thm[0].s[r][i],
                                s = a.thm[1].s[r][i];
                            a.thm[0].s[r][i] += s * t, a.thm[1].s[r][i] += n * t
                        }
                }
            }

            function d(e) {
                for (var t = 0; t < b.SBMAX_l; t++)
                    if (!(e.thm[0].l[t] > 1.58 * e.thm[1].l[t] || e.thm[1].l[t] > 1.58 * e.thm[0].l[t])) {
                        var a = e.mld_l[t] * e.en[3].l[t],
                            r = Math.max(e.thm[2].l[t], Math.min(e.thm[3].l[t], a));
                        a = e.mld_l[t] * e.en[2].l[t];
                        var n = Math.max(e.thm[3].l[t], Math.min(e.thm[2].l[t], a));
                        e.thm[2].l[t] = r, e.thm[3].l[t] = n
                    }
                for (var t = 0; t < b.SBMAX_s; t++)
                    for (var s = 0; 3 > s; s++)
                        if (!(e.thm[0].s[t][s] > 1.58 * e.thm[1].s[t][s] || e.thm[1].s[t][s] > 1.58 * e.thm[0].s[t][s])) {
                            var a = e.mld_s[t] * e.en[3].s[t][s],
                                r = Math.max(e.thm[2].s[t][s], Math.min(e.thm[3].s[t][s], a));
                            a = e.mld_s[t] * e.en[2].s[t][s];
                            var n = Math.max(e.thm[3].s[t][s], Math.min(e.thm[2].s[t][s], a));
                            e.thm[2].s[t][s] = r, e.thm[3].s[t][s] = n
                        }
            }

            function g(e, t, a) {
                var r = t,
                    n = Math.pow(10, a);
                t *= 2, r *= 2;
                for (var s = 0; s < b.SBMAX_l; s++) {
                    var i, o, _, l;
                    if (l = e.ATH.cb_l[e.bm_l[s]] * n, i = Math.min(Math.max(e.thm[0].l[s], l), Math.max(e.thm[1].l[s], l)), o = Math.max(e.thm[2].l[s], l), _ = Math.max(e.thm[3].l[s], l), o + _ > i * t) {
                        var f = i * r / (o + _);
                        o *= f, _ *= f, c(o + _ > 0)
                    }
                    e.thm[2].l[s] = Math.min(o, e.thm[2].l[s]), e.thm[3].l[s] = Math.min(_, e.thm[3].l[s])
                }
                n *= b.BLKSIZE_s / b.BLKSIZE;
                for (var s = 0; s < b.SBMAX_s; s++)
                    for (var u = 0; 3 > u; u++) {
                        var i, o, _, l;
                        if (l = e.ATH.cb_s[e.bm_s[s]] * n, i = Math.min(Math.max(e.thm[0].s[s][u], l), Math.max(e.thm[1].s[s][u], l)), o = Math.max(e.thm[2].s[s][u], l), _ = Math.max(e.thm[3].s[s][u], l), o + _ > i * t) {
                            var f = i * t / (o + _);
                            o *= f, _ *= f, c(o + _ > 0)
                        }
                        e.thm[2].s[s][u] = Math.min(e.thm[2].s[s][u], o), e.thm[3].s[s][u] = Math.min(e.thm[3].s[s][u], _)
                    }
            }

            function w(e, t, a, r, n) {
                var s, i, o = 0,
                    _ = 0;
                for (s = i = 0; s < b.SBMAX_s; ++i, ++s) {
                    for (var l = e.bo_s[s], f = e.npart_s, u = f > l ? l : f; u > i;) c(t[i] >= 0), c(a[i] >= 0), o += t[i], _ += a[i], i++;
                    if (e.en[r].s[s][n] = o, e.thm[r].s[s][n] = _, i >= f) {
                        ++s;
                        break
                    }
                    c(t[i] >= 0), c(a[i] >= 0);
                    var h = e.PSY.bo_s_weight[s],
                        p = 1 - h;
                    o = h * t[i], _ = h * a[i], e.en[r].s[s][n] += o, e.thm[r].s[s][n] += _, o = p * t[i], _ = p * a[i]
                }
                for (; s < b.SBMAX_s; ++s) e.en[r].s[s][n] = 0, e.thm[r].s[s][n] = 0
            }

            function S(e, t, a, r) {
                var n, s, i = 0,
                    o = 0;
                for (n = s = 0; n < b.SBMAX_l; ++s, ++n) {
                    for (var _ = e.bo_l[n], l = e.npart_l, f = l > _ ? _ : l; f > s;) c(t[s] >= 0), c(a[s] >= 0), i += t[s], o += a[s], s++;
                    if (e.en[r].l[n] = i, e.thm[r].l[n] = o, s >= l) {
                        ++n;
                        break
                    }
                    c(t[s] >= 0), c(a[s] >= 0);
                    var u = e.PSY.bo_l_weight[n],
                        h = 1 - u;
                    i = u * t[s], o = u * a[s], e.en[r].l[n] += i, e.thm[r].l[n] += o, i = h * t[s], o = h * a[s]
                }
                for (; n < b.SBMAX_l; ++n) e.en[r].l[n] = 0, e.thm[r].l[n] = 0
            }

            function A(e, t, a, r, n, s) {
                var i, o, _ = e.internal_flags;
                for (o = i = 0; o < _.npart_s; ++o) {
                    for (var l = 0, f = 0, u = _.numlines_s[o], h = 0; u > h; ++h, ++i) {
                        var p = t[s][i];
                        l += p, p > f && (f = p)
                    }
                    a[o] = l
                }
                for (c(o == _.npart_s), c(129 == i), i = o = 0; o < _.npart_s; o++) {
                    var m = _.s3ind_s[o][0],
                        v = _.s3_ss[i++] * a[m];
                    for (++m; m <= _.s3ind_s[o][1];) v += _.s3_ss[i] * a[m], ++i, ++m;
                    var d = ae * _.nb_s1[n][o];
                    if (r[o] = Math.min(v, d), _.blocktype_old[1 & n] == b.SHORT_TYPE) {
                        var d = re * _.nb_s2[n][o],
                            g = r[o];
                        r[o] = Math.min(d, g)
                    }
                    _.nb_s2[n][o] = _.nb_s1[n][o], _.nb_s1[n][o] = v, c(r[o] >= 0)
                }
                for (; o <= b.CBANDS; ++o) a[o] = 0, r[o] = 0
            }

            function R(e, t, a, r) {
                var n = e.internal_flags;
                e.short_blocks != o.short_block_coupled || 0 != t[0] && 0 != t[1] || (t[0] = t[1] = 0);
                for (var s = 0; s < n.channels_out; s++) r[s] = b.NORM_TYPE, e.short_blocks == o.short_block_dispensed && (t[s] = 1), e.short_blocks == o.short_block_forced && (t[s] = 0), 0 != t[s] ? (c(n.blocktype_old[s] != b.START_TYPE), n.blocktype_old[s] == b.SHORT_TYPE && (r[s] = b.STOP_TYPE)) : (r[s] = b.SHORT_TYPE, n.blocktype_old[s] == b.NORM_TYPE && (n.blocktype_old[s] = b.START_TYPE), n.blocktype_old[s] == b.STOP_TYPE && (n.blocktype_old[s] = b.SHORT_TYPE)), a[s] = n.blocktype_old[s], n.blocktype_old[s] = r[s]
            }

            function M(e, t, a) {
                return a >= 1 ? e : 0 >= a ? t : t > 0 ? Math.pow(e / t, a) * t : 0
            }

            function y(e, t) {
                for (var a = 309.07, r = 0; r < b.SBMAX_s - 1; r++)
                    for (var n = 0; 3 > n; n++) {
                        var s = e.thm.s[r][n];
                        if (c(r < Se.length), s > 0) {
                            var i = s * t,
                                o = e.en.s[r][n];
                            o > i && (o > 1e10 * i ? a += Se[r] * (10 * $) : (c(i > 0), a += Se[r] * _.FAST_LOG10(o / i)))
                        }
                    }
                return a
            }

            function B(e, t) {
                for (var a = 281.0575, r = 0; r < b.SBMAX_l - 1; r++) {
                    var n = e.thm.l[r];
                    if (c(r < Ae.length), n > 0) {
                        var s = n * t,
                            i = e.en.l[r];
                        i > s && (i > 1e10 * s ? a += Ae[r] * (10 * $) : (c(s > 0), a += Ae[r] * _.FAST_LOG10(i / s)))
                    }
                }
                return a
            }

            function E(e, t, a, r, n) {
                var s, i;
                for (s = i = 0; s < e.npart_l; ++s) {
                    var o, _ = 0,
                        l = 0;
                    for (o = 0; o < e.numlines_l[s]; ++o, ++i) {
                        var f = t[i];
                        c(f >= 0), _ += f, f > l && (l = f)
                    }
                    a[s] = _, r[s] = l, n[s] = _ * e.rnumlines_l[s], c(e.rnumlines_l[s] >= 0), c(_ >= 0), c(a[s] >= 0), c(r[s] >= 0), c(n[s] >= 0)
                }
            }

            function T(e, t, a, r) {
                var n = me.length - 1,
                    s = 0,
                    i = a[s] + a[s + 1];
                if (c(i >= 0), i > 0) {
                    var o = t[s];
                    o < t[s + 1] && (o = t[s + 1]), c(e.numlines_l[s] + e.numlines_l[s + 1] - 1 > 0), i = 20 * (2 * o - i) / (i * (e.numlines_l[s] + e.numlines_l[s + 1] - 1));
                    var _ = 0 | i;
                    _ > n && (_ = n), r[s] = _
                } else r[s] = 0;
                for (s = 1; s < e.npart_l - 1; s++)
                    if (i = a[s - 1] + a[s] + a[s + 1], c(i >= 0), i > 0) {
                        var o = t[s - 1];
                        o < t[s] && (o = t[s]), o < t[s + 1] && (o = t[s + 1]), c(e.numlines_l[s - 1] + e.numlines_l[s] + e.numlines_l[s + 1] - 1 > 0), i = 20 * (3 * o - i) / (i * (e.numlines_l[s - 1] + e.numlines_l[s] + e.numlines_l[s + 1] - 1));
                        var _ = 0 | i;
                        _ > n && (_ = n), r[s] = _
                    } else r[s] = 0;
                if (c(s > 0), c(s == e.npart_l - 1), i = a[s - 1] + a[s], c(i >= 0), i > 0) {
                    var o = t[s - 1];
                    o < t[s] && (o = t[s]), c(e.numlines_l[s - 1] + e.numlines_l[s] - 1 > 0), i = 20 * (2 * o - i) / (i * (e.numlines_l[s - 1] + e.numlines_l[s] - 1));
                    var _ = 0 | i;
                    _ > n && (_ = n), r[s] = _
                } else r[s] = 0;
                c(s == e.npart_l - 1)
            }

            function k(t, a, r, n, s, i, o, l) {
                var f = t.internal_flags;
                if (2 > n) J.fft_long(f, o[l], n, a, r);
                else if (2 == n)
                    for (var u = b.BLKSIZE - 1; u >= 0; --u) {
                        var h = o[l + 0][u],
                            c = o[l + 1][u];
                        o[l + 0][u] = (h + c) * _.SQRT2 * .5, o[l + 1][u] = (h - c) * _.SQRT2 * .5
                    }
                i[0] = e(o[l + 0][0]), i[0] *= i[0];
                for (var u = b.BLKSIZE / 2 - 1; u >= 0; --u) {
                    var p = o[l + 0][b.BLKSIZE / 2 - u],
                        m = o[l + 0][b.BLKSIZE / 2 + u];
                    i[b.BLKSIZE / 2 - u] = e(.5 * (p * p + m * m))
                }
                for (var v = 0, u = 11; u < b.HBLKSIZE; u++) v += i[u];
                if (f.tot_ener[n] = v, t.analysis) {
                    for (var u = 0; u < b.HBLKSIZE; u++) f.pinfo.energy[s][n][u] = f.pinfo.energy_save[n][u], f.pinfo.energy_save[n][u] = i[u];
                    f.pinfo.pe[s][n] = f.pe[n]
                }
            }

            function x(t, a, r, n, s, i, o, l) {
                var f = t.internal_flags;
                if (0 == s && 2 > n && J.fft_short(f, o[l], n, a, r), 2 == n)
                    for (var u = b.BLKSIZE_s - 1; u >= 0; --u) {
                        var h = o[l + 0][s][u],
                            c = o[l + 1][s][u];
                        o[l + 0][s][u] = (h + c) * _.SQRT2 * .5, o[l + 1][s][u] = (h - c) * _.SQRT2 * .5
                    }
                i[s][0] = o[l + 0][s][0], i[s][0] *= i[s][0];
                for (var u = b.BLKSIZE_s / 2 - 1; u >= 0; --u) {
                    var p = o[l + 0][s][b.BLKSIZE_s / 2 - u],
                        m = o[l + 0][s][b.BLKSIZE_s / 2 + u];
                    i[s][b.BLKSIZE_s / 2 - u] = e(.5 * (p * p + m * m))
                }
            }

            function P(e, a, r, n) {
                var s = e.internal_flags;
                2 == e.athaa_loudapprox && 2 > r && (s.loudness_sq[a][r] = s.loudness_sq_save[r], s.loudness_sq_save[r] = t(n, s))
            }

            function I(e, t, a, r, n, s, i, o, _, l) {
                for (var h = u([2, 576]), p = e.internal_flags, b = p.channels_out, m = e.mode == MPEGMode.JOINT_STEREO ? 4 : b, v = 0; b > v; v++) {
                    firbuf = t[v];
                    var d = a + 576 - 350 - ue + 192;
                    c(Me.length == (ue - 1) / 2);
                    for (var g = 0; 576 > g; g++) {
                        var w, S;
                        w = firbuf[d + g + 10], S = 0;
                        for (var A = 0;
                            (ue - 1) / 2 - 1 > A; A += 2) w += Me[A] * (firbuf[d + g + A] + firbuf[d + g + ue - A]), S += Me[A + 1] * (firbuf[d + g + A + 1] + firbuf[d + g + ue - A - 1]);
                        h[v][g] = w + S
                    }
                    n[r][v].en.assign(p.en[v]), n[r][v].thm.assign(p.thm[v]), m > 2 && (s[r][v].en.assign(p.en[v + 2]), s[r][v].thm.assign(p.thm[v + 2]))
                }
                for (var v = 0; m > v; v++) {
                    var R = f(12),
                        M = f(12),
                        y = [0, 0, 0, 0],
                        B = h[1 & v],
                        E = 0,
                        T = 3 == v ? p.nsPsy.attackthre_s : p.nsPsy.attackthre,
                        k = 1;
                    if (2 == v)
                        for (var g = 0, A = 576; A > 0; ++g, --A) {
                            var x = h[0][g],
                                P = h[1][g];
                            h[0][g] = x + P, h[1][g] = x - P
                        }
                    for (var g = 0; 3 > g; g++) M[g] = p.nsPsy.last_en_subshort[v][g + 6], c(p.nsPsy.last_en_subshort[v][g + 4] > 0), R[g] = M[g] / p.nsPsy.last_en_subshort[v][g + 4], y[0] += M[g];
                    for (var g = 0; 9 > g; g++) {
                        for (var I = E + 64, L = 1; I > E; E++) L < Math.abs(B[E]) && (L = Math.abs(B[E]));
                        p.nsPsy.last_en_subshort[v][g] = M[g + 3] = L, y[1 + g / 3] += L, L > M[g + 3 - 2] ? (c(M[g + 3 - 2] > 0), L /= M[g + 3 - 2]) : M[g + 3 - 2] > 10 * L ? (c(L > 0), L = M[g + 3 - 2] / (10 * L)) : L = 0, R[g + 3] = L
                    }
                    for (var g = 0; 3 > g; ++g) {
                        var O = M[3 * g + 3] + M[3 * g + 4] + M[3 * g + 5],
                            V = 1;
                        6 * M[3 * g + 5] < O && (V *= .5, 6 * M[3 * g + 4] < O && (V *= .5)), o[v][g] = V
                    }
                    if (e.analysis) {
                        for (var N = R[0], g = 1; 12 > g; g++) N < R[g] && (N = R[g]);
                        p.pinfo.ers[r][v] = p.pinfo.ers_save[v], p.pinfo.ers_save[v] = N
                    }
                    for (var g = 0; 12 > g; g++) 0 == _[v][g / 3] && R[g] > T && (_[v][g / 3] = g % 3 + 1);
                    for (var g = 1; 4 > g; g++) {
                        var H = y[g - 1],
                            D = y[g],
                            Y = Math.max(H, D);
                        4e4 > Y && 1.7 * D > H && 1.7 * H > D && (1 == g && _[v][0] <= _[v][g] && (_[v][0] = 0), _[v][g] = 0)
                    }
                    _[v][0] <= p.nsPsy.lastAttacks[v] && (_[v][0] = 0), (3 == p.nsPsy.lastAttacks[v] || _[v][0] + _[v][1] + _[v][2] + _[v][3] != 0) && (k = 0, 0 != _[v][1] && 0 != _[v][0] && (_[v][1] = 0), 0 != _[v][2] && 0 != _[v][1] && (_[v][2] = 0), 0 != _[v][3] && 0 != _[v][2] && (_[v][3] = 0)), 2 > v ? l[v] = k : 0 == k && (l[0] = l[1] = 0), i[v] = p.tot_ener[v]
                }
            }

            function L(e, t, a) {
                if (0 == a)
                    for (var r = 0; r < e.npart_s; r++) e.nb_s2[t][r] = e.nb_s1[t][r], e.nb_s1[t][r] = 0
            }

            function O(e, t) {
                for (var a = 0; a < e.npart_l; a++) e.nb_2[t][a] = e.nb_1[t][a], e.nb_1[t][a] = 0
            }

            function V(e, t, a, r) {
                var n = me.length - 1,
                    s = 0,
                    i = a[s] + a[s + 1];
                if (c(i >= 0), i > 0) {
                    var o = t[s];
                    o < t[s + 1] && (o = t[s + 1]), c(e.numlines_s[s] + e.numlines_s[s + 1] - 1 > 0), i = 20 * (2 * o - i) / (i * (e.numlines_s[s] + e.numlines_s[s + 1] - 1));
                    var _ = 0 | i;
                    _ > n && (_ = n), r[s] = _
                } else r[s] = 0;
                for (s = 1; s < e.npart_s - 1; s++)
                    if (i = a[s - 1] + a[s] + a[s + 1], c(s + 1 < e.npart_s), c(i >= 0), i > 0) {
                        var o = t[s - 1];
                        o < t[s] && (o = t[s]), o < t[s + 1] && (o = t[s + 1]), c(e.numlines_s[s - 1] + e.numlines_s[s] + e.numlines_s[s + 1] - 1 > 0), i = 20 * (3 * o - i) / (i * (e.numlines_s[s - 1] + e.numlines_s[s] + e.numlines_s[s + 1] - 1));
                        var _ = 0 | i;
                        _ > n && (_ = n), r[s] = _
                    } else r[s] = 0;
                if (c(s > 0), c(s == e.npart_s - 1), i = a[s - 1] + a[s], c(i >= 0), i > 0) {
                    var o = t[s - 1];
                    o < t[s] && (o = t[s]), c(e.numlines_s[s - 1] + e.numlines_s[s] - 1 > 0), i = 20 * (2 * o - i) / (i * (e.numlines_s[s - 1] + e.numlines_s[s] - 1));
                    var _ = 0 | i;
                    _ > n && (_ = n), r[s] = _
                } else r[s] = 0;
                c(s == e.npart_s - 1)
            }

            function N(e, t, a, r, n, s) {
                var i, o, _, l = e.internal_flags,
                    u = new float[b.CBANDS],
                    h = f(b.CBANDS),
                    p = new int[b.CBANDS];
                for (_ = o = 0; _ < l.npart_s; ++_) {
                    var v = 0,
                        d = 0,
                        g = l.numlines_s[_];
                    for (i = 0; g > i; ++i, ++o) {
                        var w = t[s][o];
                        v += w, w > d && (d = w)
                    }
                    a[_] = v, c(v >= 0), u[_] = d, c(g > 0), h[_] = v / g, c(h[_] >= 0)
                }
                for (c(_ == l.npart_s), c(129 == o); _ < b.CBANDS; ++_) u[_] = 0, h[_] = 0;
                for (V(l, u, h, p), o = _ = 0; _ < l.npart_s; _++) {
                    var S, A, R, M, y, B = l.s3ind_s[_][0],
                        E = l.s3ind_s[_][1];
                    for (S = p[B], A = 1, M = l.s3_ss[o] * a[B] * me[p[B]], ++o, ++B; E >= B;) S += p[B], A += 1, R = l.s3_ss[o] * a[B] * me[p[B]], M = m(M, R, B - _), ++o, ++B;
                    S = (1 + 2 * S) / (2 * A), y = .5 * me[S], M *= y, r[_] = M, l.nb_s2[n][_] = l.nb_s1[n][_], l.nb_s1[n][_] = M, R = u[_], R *= l.minval_s[_], R *= y, r[_] > R && (r[_] = R), l.masking_lower > 1 && (r[_] *= l.masking_lower), r[_] > a[_] && (r[_] = a[_]), l.masking_lower < 1 && (r[_] *= l.masking_lower), c(r[_] >= 0)
                }
                for (; _ < b.CBANDS; ++_) a[_] = 0,
                    r[_] = 0
            }

            function H(e, t, a, r, n) {
                var s, i = f(b.CBANDS),
                    o = f(b.CBANDS),
                    _ = h(b.CBANDS + 2);
                E(e, t, a, i, o), T(e, i, o, _);
                var l = 0;
                for (s = 0; s < e.npart_l; s++) {
                    var u, p, v, d, g = e.s3ind[s][0],
                        w = e.s3ind[s][1],
                        S = 0,
                        A = 0;
                    for (S = _[g], A += 1, p = e.s3_ll[l] * a[g] * me[_[g]], ++l, ++g; w >= g;) S += _[g], A += 1, u = e.s3_ll[l] * a[g] * me[_[g]], d = m(p, u, g - s), p = d, ++l, ++g;
                    if (S = (1 + 2 * S) / (2 * A), v = .5 * me[S], p *= v, e.blocktype_old[1 & n] == b.SHORT_TYPE) {
                        var R = ee * e.nb_1[n][s];
                        R > 0 ? r[s] = Math.min(p, R) : r[s] = Math.min(p, a[s] * le)
                    } else {
                        var R, M = te * e.nb_2[n][s],
                            y = ee * e.nb_1[n][s];
                        0 >= M && (M = p), 0 >= y && (y = p), R = e.blocktype_old[1 & n] == b.NORM_TYPE ? Math.min(y, M) : y, r[s] = Math.min(p, R)
                    }
                    e.nb_2[n][s] = e.nb_1[n][s], e.nb_1[n][s] = p, u = i[s], u *= e.minval_l[s], u *= v, r[s] > u && (r[s] = u), e.masking_lower > 1 && (r[s] *= e.masking_lower), r[s] > a[s] && (r[s] = a[s]), e.masking_lower < 1 && (r[s] *= e.masking_lower), c(r[s] >= 0)
                }
                for (; s < b.CBANDS; ++s) a[s] = 0, r[s] = 0
            }

            function D(e, t) {
                var a = e.internal_flags;
                e.short_blocks != o.short_block_coupled || 0 != t[0] && 0 != t[1] || (t[0] = t[1] = 0);
                for (var r = 0; r < a.channels_out; r++) e.short_blocks == o.short_block_dispensed && (t[r] = 1), e.short_blocks == o.short_block_forced && (t[r] = 0)
            }

            function Y(e, t, a) {
                for (var r = e.internal_flags, n = 0; n < r.channels_out; n++) {
                    var s = b.NORM_TYPE;
                    0 != t[n] ? (c(r.blocktype_old[n] != b.START_TYPE), r.blocktype_old[n] == b.SHORT_TYPE && (s = b.STOP_TYPE)) : (s = b.SHORT_TYPE, r.blocktype_old[n] == b.NORM_TYPE && (r.blocktype_old[n] = b.START_TYPE), r.blocktype_old[n] == b.STOP_TYPE && (r.blocktype_old[n] = b.SHORT_TYPE)), a[n] = r.blocktype_old[n], r.blocktype_old[n] = s
                }
            }

            function X(e, t, a, r, n, s, i) {
                for (var o, _, l = 2 * s, f = s > 0 ? Math.pow(10, n) : 1, u = 0; i > u; ++u) {
                    var h = e[2][u],
                        p = e[3][u],
                        b = t[0][u],
                        m = t[1][u],
                        v = t[2][u],
                        d = t[3][u];
                    if (1.58 * m >= b && 1.58 * b >= m) {
                        var g = a[u] * p,
                            w = a[u] * h;
                        _ = Math.max(v, Math.min(d, g)), o = Math.max(d, Math.min(v, w))
                    } else _ = v, o = d;
                    if (s > 0) {
                        var S, A, R = r[u] * f;
                        if (S = Math.min(Math.max(b, R), Math.max(m, R)), v = Math.max(_, R), d = Math.max(o, R), A = v + d, A > 0 && A > S * l) {
                            var M = S * l / A;
                            v *= M, d *= M, c(A > 0)
                        }
                        _ = Math.min(v, _), o = Math.min(d, o)
                    }
                    _ > h && (_ = h), o > p && (o = p), t[2][u] = _, t[3][u] = o
                }
            }

            function F(e, t) {
                var a, r = e;
                return a = r >= 0 ? 27 * -r : r * t, -72 >= a ? 0 : Math.exp(a * he)
            }

            function C(e) {
                var t, a, r = 0,
                    n = 0,
                    s = 0;
                for (s = 0; F(s, e) > 1e-20; s -= 1);
                for (t = s, a = 0; Math.abs(a - t) > 1e-12;) s = (a + t) / 2, F(s, e) > 0 ? a = s : t = s;
                r = t;
                var t, a, s = 0;
                for (s = 0; F(s, e) > 1e-20; s += 1);
                for (t = 0, a = s; Math.abs(a - t) > 1e-12;) s = (a + t) / 2, F(s, e) > 0 ? t = s : a = s;
                n = a;
                var i, o = 0,
                    _ = 1e3;
                for (i = 0; _ >= i; ++i) {
                    var s = r + i * (n - r) / _,
                        l = F(s, e);
                    o += l
                }
                var f = (_ + 1) / (o * (n - r));
                return f
            }

            function q(e) {
                var t, a, r, n;
                return t = e, t *= t >= 0 ? 3 : 1.5, t >= .5 && 2.5 >= t ? (n = t - .5, a = 8 * (n * n - 2 * n)) : a = 0, t += .474, r = 15.811389 + 7.5 * t - 17.5 * Math.sqrt(1 + t * t), -60 >= r ? 0 : (t = Math.exp((a + r) * he), t /= .6609193)
            }

            function U(e) {
                return 0 > e && (e = 0), e = .001 * e, 13 * Math.atan(.76 * e) + 3.5 * Math.atan(e * e / 56.25)
            }

            function j(e, t, a, r, n, s, i, o, _, l, u, p) {
                var m, v = f(b.CBANDS + 1),
                    d = o / (p > 15 ? 1152 : 384),
                    g = h(b.HBLKSIZE);
                o /= _;
                var w = 0,
                    S = 0;
                for (m = 0; m < b.CBANDS; m++) {
                    var A, R;
                    for (A = U(o * w), v[m] = o * w, R = w; U(o * R) - A < ne && _ / 2 >= R; R++);
                    for (e[m] = R - w, S = m + 1; R > w;) c(w < b.HBLKSIZE), g[w++] = m;
                    if (w > _ / 2) {
                        w = _ / 2, ++m;
                        break
                    }
                }
                c(m < b.CBANDS), v[m] = o * w;
                for (var M = 0; p > M; M++) {
                    var y, B, E, T, k;
                    E = l[M], T = l[M + 1], y = 0 | Math.floor(.5 + u * (E - .5)), 0 > y && (y = 0), B = 0 | Math.floor(.5 + u * (T - .5)), B > _ / 2 && (B = _ / 2), a[M] = (g[y] + g[B]) / 2, t[M] = g[B];
                    var x = d * T;
                    i[M] = (x - v[t[M]]) / (v[t[M] + 1] - v[t[M]]), i[M] < 0 ? i[M] = 0 : i[M] > 1 && (i[M] = 1), k = U(o * l[M] * u), k = Math.min(k, 15.5) / 15.5, s[M] = Math.pow(10, 1.25 * (1 - Math.cos(Math.PI * k)) - 2.5)
                }
                w = 0;
                for (var P = 0; S > P; P++) {
                    var A, I, L = e[P];
                    A = U(o * w), I = U(o * (w + L - 1)), r[P] = .5 * (A + I), A = U(o * (w - .5)), I = U(o * (w + L - .5)), n[P] = I - A, w += L
                }
                return S
            }

            function G(e, t, a, r, n, s) {
                var i, o = u([b.CBANDS, b.CBANDS]),
                    _ = 0;
                if (s)
                    for (var l = 0; t > l; l++)
                        for (i = 0; t > i; i++) {
                            var h = q(a[l] - a[i]) * r[i];
                            o[l][i] = h * n[l]
                        } else
                            for (i = 0; t > i; i++)
                                for (var c = 15 + Math.min(21 / a[i], 12), p = C(c), l = 0; t > l; l++) {
                                    var h = p * F(a[l] - a[i], c) * r[i];
                                    o[l][i] = h * n[l]
                                }
                for (var l = 0; t > l; l++) {
                    for (i = 0; t > i && !(o[l][i] > 0); i++);
                    for (e[l][0] = i, i = t - 1; i > 0 && !(o[l][i] > 0); i--);
                    e[l][1] = i, _ += e[l][1] - e[l][0] + 1
                }
                for (var m = f(_), v = 0, l = 0; t > l; l++)
                    for (i = e[l][0]; i <= e[l][1]; i++) m[v++] = o[l][i];
                return m
            }

            function z(e) {
                var t = U(e);
                return t = Math.min(t, 15.5) / 15.5, Math.pow(10, 1.25 * (1 - Math.cos(Math.PI * t)) - 2.5)
            }

            function K(e, t) {
                -.3 > e && (e = 3410), e /= 1e3, e = Math.max(.1, e);
                var a = 3.64 * Math.pow(e, -.8) - 6.8 * Math.exp(-.6 * Math.pow(e - 3.4, 2)) + 6 * Math.exp(-.15 * Math.pow(e - 8.7, 2)) + .001 * (.6 + .04 * t) * Math.pow(e, 4);
                return a
            }
            var Z, Q, W, J = new p,
                $ = 2.302585092994046,
                ee = 2,
                te = 16,
                ae = 2,
                re = 16,
                ne = .34,
                se = 1 / 217621504 / (b.BLKSIZE / 2),
                ie = .01,
                oe = .8,
                _e = .6,
                le = .3,
                fe = 3.5,
                ue = 21,
                he = .2302585093,
                ce = 8,
                pe = 23,
                be = 15,
                me = [1, .79433, .63096, .63096, .63096, .63096, .63096, .25119, .11749],
                ve = [3.3246 * 3.3246, 3.23837 * 3.23837, 9.9500500969, 9.0247369744, 8.1854926609, 7.0440875649, 2.46209 * 2.46209, 2.284 * 2.284, 4.4892710641, 1.96552 * 1.96552, 1.82335 * 1.82335, 1.69146 * 1.69146, 2.4621061921, 2.1508568964, 1.37074 * 1.37074, 1.31036 * 1.31036, 1.5691069696, 1.4555939904, 1.16203 * 1.16203, 1.2715945225, 1.09428 * 1.09428, 1.0659 * 1.0659, 1.0779838276, 1.0382591025, 1],
                de = [1.7782755904, 1.35879 * 1.35879, 1.38454 * 1.38454, 1.39497 * 1.39497, 1.40548 * 1.40548, 1.3537 * 1.3537, 1.6999465924, 1.22321 * 1.22321, 1.3169398564, 1],
                ge = [5.5396212496, 2.29259 * 2.29259, 4.9868695969, 2.12675 * 2.12675, 2.02545 * 2.02545, 1.87894 * 1.87894, 1.74303 * 1.74303, 1.61695 * 1.61695, 2.2499700001, 1.39148 * 1.39148, 1.29083 * 1.29083, 1.19746 * 1.19746, 1.2339655056, 1.0779838276],
                we = [1.7782755904, 1.35879 * 1.35879, 1.38454 * 1.38454, 1.39497 * 1.39497, 1.40548 * 1.40548, 1.3537 * 1.3537, 1.6999465924, 1.22321 * 1.22321, 1.3169398564, 1],
                Se = [11.8, 13.6, 17.2, 32, 46.5, 51.3, 57.5, 67.1, 71.5, 84.6, 97.6, 130],
                Ae = [6.8, 5.8, 5.8, 6.4, 6.5, 9.9, 12.1, 14.4, 15, 18.9, 21.6, 26.9, 34.2, 40.2, 46.8, 56.5, 60.7, 73.9, 85.7, 93.4, 126.1],
                Re = [-1.730326e-17, -.01703172, -1.349528e-17, .0418072, -6.73278e-17, -.0876324, -3.0835e-17, .1863476, -1.104424e-16, -.627638];
            this.L3psycho_anal_ns = function(e, t, r, i, o, _, p, m, k, x) {
                var P, I, L, O, V, N, H, D, Y, X = e.internal_flags,
                    F = u([2, b.BLKSIZE]),
                    C = u([2, 3, b.BLKSIZE_s]),
                    q = f(b.CBANDS + 1),
                    U = f(b.CBANDS + 1),
                    j = f(b.CBANDS + 2),
                    G = h(2),
                    z = h(2),
                    K = u([2, 576]),
                    Z = h(b.CBANDS + 2),
                    Q = h(b.CBANDS + 2);
                for (l.fill(Q, 0), P = X.channels_out, e.mode == MPEGMode.JOINT_STEREO && (P = 4), Y = e.VBR == s.vbr_off ? 0 == X.ResvMax ? 0 : X.ResvSize / X.ResvMax * .5 : e.VBR == s.vbr_rh || e.VBR == s.vbr_mtrh || e.VBR == s.vbr_mt ? .6 : 1, I = 0; I < X.channels_out; I++) {
                    var W = t[I],
                        J = r + 576 - 350 - ue + 192;
                    for (c(Re.length == (ue - 1) / 2), O = 0; 576 > O; O++) {
                        var $, ae;
                        for ($ = W[J + O + 10], ae = 0, V = 0;
                            (ue - 1) / 2 - 1 > V; V += 2) $ += Re[V] * (W[J + O + V] + W[J + O + ue - V]), ae += Re[V + 1] * (W[J + O + V + 1] + W[J + O + ue - V - 1]);
                        K[I][O] = $ + ae
                    }
                    o[i][I].en.assign(X.en[I]), o[i][I].thm.assign(X.thm[I]), P > 2 && (_[i][I].en.assign(X.en[I + 2]), _[i][I].thm.assign(X.thm[I + 2]))
                }
                for (I = 0; P > I; I++) {
                    var re, ne, se, ie = f(12),
                        fe = [0, 0, 0, 0],
                        he = f(12),
                        ce = 1,
                        pe = f(b.CBANDS),
                        be = f(b.CBANDS),
                        ve = [0, 0, 0, 0],
                        de = f(b.HBLKSIZE),
                        ge = u([3, b.HBLKSIZE_s]);
                    for (c(X.npart_s <= b.CBANDS), c(X.npart_l <= b.CBANDS), O = 0; 3 > O; O++) ie[O] = X.nsPsy.last_en_subshort[I][O + 6], c(X.nsPsy.last_en_subshort[I][O + 4] > 0), he[O] = ie[O] / X.nsPsy.last_en_subshort[I][O + 4], fe[0] += ie[O];
                    if (2 == I)
                        for (O = 0; 576 > O; O++) {
                            var we, Se;
                            we = K[0][O], Se = K[1][O], K[0][O] = we + Se, K[1][O] = we - Se
                        }
                    var Ae = K[1 & I],
                        Me = 0;
                    for (O = 0; 9 > O; O++) {
                        for (var ye = Me + 64, Be = 1; ye > Me; Me++) Be < Math.abs(Ae[Me]) && (Be = Math.abs(Ae[Me]));
                        X.nsPsy.last_en_subshort[I][O] = ie[O + 3] = Be, fe[1 + O / 3] += Be, Be > ie[O + 3 - 2] ? (c(ie[O + 3 - 2] > 0), Be /= ie[O + 3 - 2]) : ie[O + 3 - 2] > 10 * Be ? (c(Be > 0), Be = ie[O + 3 - 2] / (10 * Be)) : Be = 0, he[O + 3] = Be
                    }
                    if (e.analysis) {
                        var Ee = he[0];
                        for (O = 1; 12 > O; O++) Ee < he[O] && (Ee = he[O]);
                        X.pinfo.ers[i][I] = X.pinfo.ers_save[I], X.pinfo.ers_save[I] = Ee
                    }
                    for (se = 3 == I ? X.nsPsy.attackthre_s : X.nsPsy.attackthre, O = 0; 12 > O; O++) 0 == ve[O / 3] && he[O] > se && (ve[O / 3] = O % 3 + 1);
                    for (O = 1; 4 > O; O++) {
                        var Te;
                        fe[O - 1] > fe[O] ? (c(fe[O] > 0), Te = fe[O - 1] / fe[O]) : (c(fe[O - 1] > 0), Te = fe[O] / fe[O - 1]), 1.7 > Te && (ve[O] = 0, 1 == O && (ve[0] = 0))
                    }
                    for (0 != ve[0] && 0 != X.nsPsy.lastAttacks[I] && (ve[0] = 0), (3 == X.nsPsy.lastAttacks[I] || ve[0] + ve[1] + ve[2] + ve[3] != 0) && (ce = 0, 0 != ve[1] && 0 != ve[0] && (ve[1] = 0), 0 != ve[2] && 0 != ve[1] && (ve[2] = 0), 0 != ve[3] && 0 != ve[2] && (ve[3] = 0)), 2 > I ? z[I] = ce : 0 == ce && (z[0] = z[1] = 0), k[I] = X.tot_ener[I], ne = C, re = F, a(e, de, ge, re, 1 & I, ne, 1 & I, i, I, t, r), E(X, de, q, pe, be), T(X, pe, be, Z), D = 0; 3 > D; D++) {
                        var ke, xe;
                        for (A(e, ge, U, j, I, D), w(X, U, j, I, D), H = 0; H < b.SBMAX_s; H++) {
                            if (xe = X.thm[I].s[H][D], xe *= oe, ve[D] >= 2 || 1 == ve[D + 1]) {
                                var Pe = 0 != D ? D - 1 : 2,
                                    Be = M(X.thm[I].s[H][Pe], xe, _e * Y);
                                xe = Math.min(xe, Be)
                            }
                            if (1 == ve[D]) {
                                var Pe = 0 != D ? D - 1 : 2,
                                    Be = M(X.thm[I].s[H][Pe], xe, le * Y);
                                xe = Math.min(xe, Be)
                            } else if (0 != D && 3 == ve[D - 1] || 0 == D && 3 == X.nsPsy.lastAttacks[I]) {
                                var Pe = 2 != D ? D + 1 : 0,
                                    Be = M(X.thm[I].s[H][Pe], xe, le * Y);
                                xe = Math.min(xe, Be)
                            }
                            ke = ie[3 * D + 3] + ie[3 * D + 4] + ie[3 * D + 5], 6 * ie[3 * D + 5] < ke && (xe *= .5, 6 * ie[3 * D + 4] < ke && (xe *= .5)), X.thm[I].s[H][D] = xe
                        }
                    }
                    for (X.nsPsy.lastAttacks[I] = ve[2], N = 0, L = 0; L < X.npart_l; L++) {
                        for (var Ie = X.s3ind[L][0], Le = q[Ie] * me[Z[Ie]], Oe = X.s3_ll[N++] * Le; ++Ie <= X.s3ind[L][1];) Le = q[Ie] * me[Z[Ie]], Oe = n(Oe, X.s3_ll[N++] * Le, Ie, Ie - L, X, 0);
                        Oe *= .158489319246111, X.blocktype_old[1 & I] == b.SHORT_TYPE ? j[L] = Oe : j[L] = M(Math.min(Oe, Math.min(ee * X.nb_1[I][L], te * X.nb_2[I][L])), Oe, Y), X.nb_2[I][L] = X.nb_1[I][L], X.nb_1[I][L] = Oe
                    }
                    for (; L <= b.CBANDS; ++L) q[L] = 0, j[L] = 0;
                    S(X, q, j, I)
                }
                if ((e.mode == MPEGMode.STEREO || e.mode == MPEGMode.JOINT_STEREO) && e.interChRatio > 0 && v(e, e.interChRatio), e.mode == MPEGMode.JOINT_STEREO) {
                    var Ve;
                    d(X), Ve = e.msfix, Math.abs(Ve) > 0 && g(X, Ve, e.ATHlower * X.ATH.adjust)
                }
                for (R(e, z, x, G), I = 0; P > I; I++) {
                    var Ne, He, De, Ye = 0;
                    I > 1 ? (Ne = m, Ye = -2, He = b.NORM_TYPE, (x[0] == b.SHORT_TYPE || x[1] == b.SHORT_TYPE) && (He = b.SHORT_TYPE), De = _[i][I - 2]) : (Ne = p, Ye = 0, He = x[I], De = o[i][I]), He == b.SHORT_TYPE ? Ne[Ye + I] = y(De, X.masking_lower) : Ne[Ye + I] = B(De, X.masking_lower), e.analysis && (X.pinfo.pe[i][I] = Ne[Ye + I])
                }
                return 0
            };
            var Me = [-1.730326e-17, -.01703172, -1.349528e-17, .0418072, -6.73278e-17, -.0876324, -3.0835e-17, .1863476, -1.104424e-16, -.627638];
            this.L3psycho_anal_vbr = function(e, t, a, r, n, s, i, o, _, l) {
                var c, p, m = e.internal_flags,
                    v = f(b.HBLKSIZE),
                    d = u([3, b.HBLKSIZE_s]),
                    g = u([2, b.BLKSIZE]),
                    A = u([2, 3, b.BLKSIZE_s]),
                    R = u([4, b.CBANDS]),
                    E = u([4, b.CBANDS]),
                    T = u([4, 3]),
                    V = .6,
                    F = [
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ],
                    C = h(2),
                    q = e.mode == MPEGMode.JOINT_STEREO ? 4 : m.channels_out;
                I(e, t, a, r, n, s, _, T, F, C), D(e, C);
                for (var U = 0; q > U; U++) {
                    var j = 1 & U;
                    c = g, k(e, t, a, U, r, v, c, j), P(e, r, U, v), 0 != C[j] ? H(m, v, R[U], E[U], U) : O(m, U)
                }
                C[0] + C[1] == 2 && e.mode == MPEGMode.JOINT_STEREO && X(R, E, m.mld_cb_l, m.ATH.cb_l, e.ATHlower * m.ATH.adjust, e.msfix, m.npart_l);
                for (var U = 0; q > U; U++) {
                    var j = 1 & U;
                    0 != C[j] && S(m, R[U], E[U], U)
                }
                for (var G = 0; 3 > G; G++) {
                    for (var U = 0; q > U; ++U) {
                        var j = 1 & U;
                        0 != C[j] ? L(m, U, G) : (p = A, x(e, t, a, U, G, d, p, j), N(e, d, R[U], E[U], U, G))
                    }
                    C[0] + C[1] == 0 && e.mode == MPEGMode.JOINT_STEREO && X(R, E, m.mld_cb_s, m.ATH.cb_s, e.ATHlower * m.ATH.adjust, e.msfix, m.npart_s);
                    for (var U = 0; q > U; ++U) {
                        var j = 1 & U;
                        0 == C[j] && w(m, R[U], E[U], U, G)
                    }
                }
                for (var U = 0; q > U; U++) {
                    var j = 1 & U;
                    if (0 == C[j])
                        for (var z = 0; z < b.SBMAX_s; z++) {
                            for (var K = f(3), G = 0; 3 > G; G++) {
                                var Z = m.thm[U].s[z][G];
                                if (Z *= oe, F[U][G] >= 2 || 1 == F[U][G + 1]) {
                                    var Q = 0 != G ? G - 1 : 2,
                                        W = M(m.thm[U].s[z][Q], Z, _e * V);
                                    Z = Math.min(Z, W)
                                } else if (1 == F[U][G]) {
                                    var Q = 0 != G ? G - 1 : 2,
                                        W = M(m.thm[U].s[z][Q], Z, le * V);
                                    Z = Math.min(Z, W)
                                } else if (0 != G && 3 == F[U][G - 1] || 0 == G && 3 == m.nsPsy.lastAttacks[U]) {
                                    var Q = 2 != G ? G + 1 : 0,
                                        W = M(m.thm[U].s[z][Q], Z, le * V);
                                    Z = Math.min(Z, W)
                                }
                                Z *= T[U][G], K[G] = Z
                            }
                            for (var G = 0; 3 > G; G++) m.thm[U].s[z][G] = K[G]
                        }
                }
                for (var U = 0; q > U; U++) m.nsPsy.lastAttacks[U] = F[U][2];
                Y(e, C, l);
                for (var U = 0; q > U; U++) {
                    var J, $, ee, te;
                    U > 1 ? (J = o, $ = -2, ee = b.NORM_TYPE, (l[0] == b.SHORT_TYPE || l[1] == b.SHORT_TYPE) && (ee = b.SHORT_TYPE), te = s[r][U - 2]) : (J = i, $ = 0, ee = l[U], te = n[r][U]), ee == b.SHORT_TYPE ? J[$ + U] = y(te, m.masking_lower) : J[$ + U] = B(te, m.masking_lower), e.analysis && (m.pinfo.pe[r][U] = J[$ + U])
                }
                return 0
            }, this.psymodel_init = function(e) {
                var t, a = e.internal_flags,
                    n = !0,
                    o = 13,
                    _ = 24,
                    l = 0,
                    u = 0,
                    h = -8.25,
                    p = -4.5,
                    m = f(b.CBANDS),
                    v = f(b.CBANDS),
                    d = f(b.CBANDS),
                    g = e.out_samplerate;
                switch (e.experimentalZ) {
                    default:
                        case 0:
                        n = !0;
                    break;
                    case 1:
                            n = e.VBR == s.vbr_mtrh || e.VBR == s.vbr_mt ? !1 : !0;
                        break;
                    case 2:
                            n = !1;
                        break;
                    case 3:
                            o = 8,
                        l = -1.75,
                        u = -.0125,
                        h = -8.25,
                        p = -2.25
                }
                for (a.ms_ener_ratio_old = .25, a.blocktype_old[0] = a.blocktype_old[1] = b.NORM_TYPE, t = 0; 4 > t; ++t) {
                    for (var w = 0; w < b.CBANDS; ++w) a.nb_1[t][w] = 1e20, a.nb_2[t][w] = 1e20, a.nb_s1[t][w] = a.nb_s2[t][w] = 1;
                    for (var S = 0; S < b.SBMAX_l; S++) a.en[t].l[S] = 1e20, a.thm[t].l[S] = 1e20;
                    for (var w = 0; 3 > w; ++w) {
                        for (var S = 0; S < b.SBMAX_s; S++) a.en[t].s[S][w] = 1e20, a.thm[t].s[S][w] = 1e20;
                        a.nsPsy.lastAttacks[t] = 0
                    }
                    for (var w = 0; 9 > w; w++) a.nsPsy.last_en_subshort[t][w] = 10
                }
                for (a.loudness_sq_save[0] = a.loudness_sq_save[1] = 0, a.npart_l = j(a.numlines_l, a.bo_l, a.bm_l, m, v, a.mld_l, a.PSY.bo_l_weight, g, b.BLKSIZE, a.scalefac_band.l, b.BLKSIZE / 1152, b.SBMAX_l), c(a.npart_l < b.CBANDS), t = 0; t < a.npart_l; t++) {
                    var A = l;
                    m[t] >= o && (A = u * (m[t] - o) / (_ - o) + l * (_ - m[t]) / (_ - o)), d[t] = Math.pow(10, A / 10), a.numlines_l[t] > 0 ? a.rnumlines_l[t] = 1 / a.numlines_l[t] : a.rnumlines_l[t] = 0
                }
                a.s3_ll = G(a.s3ind, a.npart_l, m, v, d, n);
                var w = 0;
                for (t = 0; t < a.npart_l; t++) {
                    var R;
                    R = i.MAX_VALUE;
                    for (var M = 0; M < a.numlines_l[t]; M++, w++) {
                        var y, B = g * w / (1e3 * b.BLKSIZE);
                        y = this.ATHformula(1e3 * B, e) - 20, y = Math.pow(10, .1 * y), y *= a.numlines_l[t], R > y && (R = y)
                    }
                    a.ATH.cb_l[t] = R, R = -20 + 20 * m[t] / 10, R > 6 && (R = 100), -15 > R && (R = -15), R -= 8, a.minval_l[t] = Math.pow(10, R / 10) * a.numlines_l[t]
                }
                for (a.npart_s = j(a.numlines_s, a.bo_s, a.bm_s, m, v, a.mld_s, a.PSY.bo_s_weight, g, b.BLKSIZE_s, a.scalefac_band.s, b.BLKSIZE_s / 384, b.SBMAX_s), c(a.npart_s < b.CBANDS), w = 0, t = 0; t < a.npart_s; t++) {
                    var R, A = h;
                    m[t] >= o && (A = p * (m[t] - o) / (_ - o) + h * (_ - m[t]) / (_ - o)), d[t] = Math.pow(10, A / 10), R = i.MAX_VALUE;
                    for (var M = 0; M < a.numlines_s[t]; M++, w++) {
                        var y, B = g * w / (1e3 * b.BLKSIZE_s);
                        y = this.ATHformula(1e3 * B, e) - 20, y = Math.pow(10, .1 * y), y *= a.numlines_s[t], R > y && (R = y)
                    }
                    a.ATH.cb_s[t] = R, R = -7 + 7 * m[t] / 12, m[t] > 12 && (R *= 1 + 3.1 * Math.log(1 + R)), m[t] < 12 && (R *= 1 + 2.3 * Math.log(1 - R)), -15 > R && (R = -15), R -= 8, a.minval_s[t] = Math.pow(10, R / 10) * a.numlines_s[t]
                }
                a.s3_ss = G(a.s3ind_s, a.npart_s, m, v, d, n), r(), J.init_fft(a), a.decay = Math.exp(-1 * $ / (ie * g / 192));
                var E;
                E = fe, 0 != (2 & e.exp_nspsytune) && (E = 1), Math.abs(e.msfix) > 0 && (E = e.msfix), e.msfix = E;
                for (var T = 0; T < a.npart_l; T++) a.s3ind[T][1] > a.npart_l - 1 && (a.s3ind[T][1] = a.npart_l - 1);
                var k = 576 * a.mode_gr / g;
                if (a.ATH.decay = Math.pow(10, -1.2 * k), a.ATH.adjust = .01, a.ATH.adjustLimit = 1, c(a.bo_l[b.SBMAX_l - 1] <= a.npart_l), c(a.bo_s[b.SBMAX_s - 1] <= a.npart_s), -1 != e.ATHtype) {
                    var B, x = e.out_samplerate / b.BLKSIZE,
                        P = 0;
                    for (B = 0, t = 0; t < b.BLKSIZE / 2; ++t) B += x, a.ATH.eql_w[t] = 1 / Math.pow(10, this.ATHformula(B, e) / 10), P += a.ATH.eql_w[t];
                    for (P = 1 / P, t = b.BLKSIZE / 2; --t >= 0;) a.ATH.eql_w[t] *= P
                }
                for (var T = w = 0; T < a.npart_s; ++T)
                    for (t = 0; t < a.numlines_s[T]; ++t) ++w;
                c(129 == w);
                for (var T = w = 0; T < a.npart_l; ++T)
                    for (t = 0; t < a.numlines_l[T]; ++t) ++w;
                for (c(513 == w), w = 0, t = 0; t < a.npart_l; t++) {
                    var B = g * (w + a.numlines_l[t] / 2) / (1 * b.BLKSIZE);
                    a.mld_cb_l[t] = z(B), w += a.numlines_l[t]
                }
                for (; t < b.CBANDS; ++t) a.mld_cb_l[t] = 1;
                for (w = 0, t = 0; t < a.npart_s; t++) {
                    var B = g * (w + a.numlines_s[t] / 2) / (1 * b.BLKSIZE_s);
                    a.mld_cb_s[t] = z(B), w += a.numlines_s[t]
                }
                for (; t < b.CBANDS; ++t) a.mld_cb_s[t] = 1;
                return 0
            }, this.ATHformula = function(e, t) {
                var a;
                switch (t.ATHtype) {
                    case 0:
                        a = K(e, 9);
                        break;
                    case 1:
                        a = K(e, -1);
                        break;
                    case 2:
                        a = K(e, 0);
                        break;
                    case 3:
                        a = K(e, 1) + 6;
                        break;
                    case 4:
                        a = K(e, t.ATHcurve);
                        break;
                    default:
                        a = K(e, 0)
                }
                return a
            }
        }
        var n = a(157),
            s = (n.System, n.VbrMode),
            i = n.Float,
            o = n.ShortBlock,
            _ = n.Util,
            l = n.Arrays,
            f = (n.new_array_n, n.new_byte, n.new_double, n.new_float),
            u = n.new_float_n,
            h = n.new_int,
            c = (n.new_int_n, n.assert),
            p = a(37),
            b = a(10);
        e.exports = r
    },
    317: function(e, t) {
        function a() {
            this.sum = 0, this.seen = 0, this.want = 0, this.pos = 0, this.size = 0, this.bag = null, this.nVbrNumFrames = 0, this.nBytesWritten = 0, this.TotalFrameSize = 0
        }
        e.exports = a
    },
    319: function(e, t, a) {
        "use strict";

        function r(e) {
            var t = e.length;
            if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            return "=" === e[t - 2] ? 2 : "=" === e[t - 1] ? 1 : 0
        }

        function n(e) {
            return 3 * e.length / 4 - r(e)
        }

        function s(e) {
            var t, a, n, s, i, o = e.length;
            s = r(e), i = new u(3 * o / 4 - s), a = s > 0 ? o - 4 : o;
            var _ = 0;
            for (t = 0; a > t; t += 4) n = f[e.charCodeAt(t)] << 18 | f[e.charCodeAt(t + 1)] << 12 | f[e.charCodeAt(t + 2)] << 6 | f[e.charCodeAt(t + 3)], i[_++] = n >> 16 & 255, i[_++] = n >> 8 & 255, i[_++] = 255 & n;
            return 2 === s ? (n = f[e.charCodeAt(t)] << 2 | f[e.charCodeAt(t + 1)] >> 4, i[_++] = 255 & n) : 1 === s && (n = f[e.charCodeAt(t)] << 10 | f[e.charCodeAt(t + 1)] << 4 | f[e.charCodeAt(t + 2)] >> 2, i[_++] = n >> 8 & 255, i[_++] = 255 & n), i
        }

        function i(e) {
            return l[e >> 18 & 63] + l[e >> 12 & 63] + l[e >> 6 & 63] + l[63 & e]
        }

        function o(e, t, a) {
            for (var r, n = [], s = t; a > s; s += 3) r = (e[s] << 16 & 16711680) + (e[s + 1] << 8 & 65280) + (255 & e[s + 2]), n.push(i(r));
            return n.join("")
        }

        function _(e) {
            for (var t, a = e.length, r = a % 3, n = "", s = [], i = 16383, _ = 0, f = a - r; f > _; _ += i) s.push(o(e, _, _ + i > f ? f : _ + i));
            return 1 === r ? (t = e[a - 1], n += l[t >> 2], n += l[t << 4 & 63], n += "==") : 2 === r && (t = (e[a - 2] << 8) + e[a - 1], n += l[t >> 10], n += l[t >> 4 & 63], n += l[t << 2 & 63], n += "="), s.push(n), s.join("")
        }
        t.byteLength = n, t.toByteArray = s, t.fromByteArray = _;
        for (var l = [], f = [], u = "undefined" != typeof Uint8Array ? Uint8Array : Array, h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", c = 0, p = h.length; p > c; ++c) l[c] = h[c], f[h.charCodeAt(c)] = c;
        f["-".charCodeAt(0)] = 62, f["_".charCodeAt(0)] = 63
    },
    324: function(e, t) {
        function a() {
            this.over_noise = 0, this.tot_noise = 0, this.max_noise = 0, this.over_count = 0, this.over_SSD = 0, this.bits = 0
        }
        e.exports = a
    },
    329: function(e, t) {
        function a() {
            var e, t;
            this.setModules = function(a, r) {
                e = a, t = r
            }
        }
        e.exports = a
    },
    33: function(e, t, a) {
        function r(e) {
            var t = e;
            this.quantize = t, this.iteration_loop = function(e, t, a, r) {
                var n, h = e.internal_flags,
                    c = s(f.SFBMAX),
                    p = s(576),
                    b = i(2),
                    m = 0,
                    v = h.l3_side,
                    d = new _(m);
                this.quantize.rv.ResvFrameBegin(e, d), m = d.bits;
                for (var g = 0; g < h.mode_gr; g++) {
                    n = this.quantize.qupvt.on_pe(e, t, b, m, g, g), h.mode_ext == l.MPG_MD_MS_LR && (this.quantize.ms_convert(h.l3_side, g), this.quantize.qupvt.reduce_side(b, a[g], m, n));
                    for (var w = 0; w < h.channels_out; w++) {
                        var S, A, R = v.tt[g][w];
                        R.block_type != l.SHORT_TYPE ? (S = 0, A = h.PSY.mask_adjust - S) : (S = 0, A = h.PSY.mask_adjust_short - S), h.masking_lower = Math.pow(10, .1 * A), this.quantize.init_outer_loop(h, R), this.quantize.init_xrpow(h, R, p) && (this.quantize.qupvt.calc_xmin(e, r[g][w], R, c), this.quantize.outer_loop(e, R, c, p, w, b[w])), this.quantize.iteration_finish_one(h, g, w), o(R.part2_3_length <= u.MAX_BITS_PER_CHANNEL), o(R.part2_3_length <= b[w])
                    }
                }
                this.quantize.rv.ResvFrameEnd(h, m)
            }
        }
        var n = a(157),
            s = (n.System, n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float),
            i = (n.new_float_n, n.new_int),
            o = (n.new_int_n, n.assert),
            _ = a(212),
            l = a(10),
            f = a(258),
            u = a(175);
        e.exports = r
    },
    336: function(e, t, a) {
        function r() {
            this.global_gain = 0, this.sfb_count1 = 0, this.step = i(39), this.noise = s(39), this.noise_log = s(39)
        }
        var n = a(157),
            s = n.new_float,
            i = n.new_int;
        n.assert, e.exports = r
    },
    337: function(e, t, a) {
        function r() {
            this.last_en_subshort = i([4, 9]), this.lastAttacks = o(4), this.pefirbuf = s(19), this.longfact = s(_.SBMAX_l), this.shortfact = s(_.SBMAX_s), this.attackthre = 0, this.attackthre_s = 0
        }
        var n = a(157),
            s = (n.System, n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float),
            i = n.new_float_n,
            o = n.new_int,
            _ = (n.new_int_n, n.assert, a(10));
        e.exports = r
    },
    340: function(e, t) {
        function a(e, t, a, r) {
            this.xlen = e, this.linmax = t, this.table = a, this.hlen = r
        }
        var r = {};
        r.t1HB = [1, 1, 1, 0], r.t2HB = [1, 2, 1, 3, 1, 1, 3, 2, 0], r.t3HB = [3, 2, 1, 1, 1, 1, 3, 2, 0], r.t5HB = [1, 2, 6, 5, 3, 1, 4, 4, 7, 5, 7, 1, 6, 1, 1, 0], r.t6HB = [7, 3, 5, 1, 6, 2, 3, 2, 5, 4, 4, 1, 3, 3, 2, 0], r.t7HB = [1, 2, 10, 19, 16, 10, 3, 3, 7, 10, 5, 3, 11, 4, 13, 17, 8, 4, 12, 11, 18, 15, 11, 2, 7, 6, 9, 14, 3, 1, 6, 4, 5, 3, 2, 0], r.t8HB = [3, 4, 6, 18, 12, 5, 5, 1, 2, 16, 9, 3, 7, 3, 5, 14, 7, 3, 19, 17, 15, 13, 10, 4, 13, 5, 8, 11, 5, 1, 12, 4, 4, 1, 1, 0], r.t9HB = [7, 5, 9, 14, 15, 7, 6, 4, 5, 5, 6, 7, 7, 6, 8, 8, 8, 5, 15, 6, 9, 10, 5, 1, 11, 7, 9, 6, 4, 1, 14, 4, 6, 2, 6, 0], r.t10HB = [1, 2, 10, 23, 35, 30, 12, 17, 3, 3, 8, 12, 18, 21, 12, 7, 11, 9, 15, 21, 32, 40, 19, 6, 14, 13, 22, 34, 46, 23, 18, 7, 20, 19, 33, 47, 27, 22, 9, 3, 31, 22, 41, 26, 21, 20, 5, 3, 14, 13, 10, 11, 16, 6, 5, 1, 9, 8, 7, 8, 4, 4, 2, 0], r.t11HB = [3, 4, 10, 24, 34, 33, 21, 15, 5, 3, 4, 10, 32, 17, 11, 10, 11, 7, 13, 18, 30, 31, 20, 5, 25, 11, 19, 59, 27, 18, 12, 5, 35, 33, 31, 58, 30, 16, 7, 5, 28, 26, 32, 19, 17, 15, 8, 14, 14, 12, 9, 13, 14, 9, 4, 1, 11, 4, 6, 6, 6, 3, 2, 0], r.t12HB = [9, 6, 16, 33, 41, 39, 38, 26, 7, 5, 6, 9, 23, 16, 26, 11, 17, 7, 11, 14, 21, 30, 10, 7, 17, 10, 15, 12, 18, 28, 14, 5, 32, 13, 22, 19, 18, 16, 9, 5, 40, 17, 31, 29, 17, 13, 4, 2, 27, 12, 11, 15, 10, 7, 4, 1, 27, 12, 8, 12, 6, 3, 1, 0], r.t13HB = [1, 5, 14, 21, 34, 51, 46, 71, 42, 52, 68, 52, 67, 44, 43, 19, 3, 4, 12, 19, 31, 26, 44, 33, 31, 24, 32, 24, 31, 35, 22, 14, 15, 13, 23, 36, 59, 49, 77, 65, 29, 40, 30, 40, 27, 33, 42, 16, 22, 20, 37, 61, 56, 79, 73, 64, 43, 76, 56, 37, 26, 31, 25, 14, 35, 16, 60, 57, 97, 75, 114, 91, 54, 73, 55, 41, 48, 53, 23, 24, 58, 27, 50, 96, 76, 70, 93, 84, 77, 58, 79, 29, 74, 49, 41, 17, 47, 45, 78, 74, 115, 94, 90, 79, 69, 83, 71, 50, 59, 38, 36, 15, 72, 34, 56, 95, 92, 85, 91, 90, 86, 73, 77, 65, 51, 44, 43, 42, 43, 20, 30, 44, 55, 78, 72, 87, 78, 61, 46, 54, 37, 30, 20, 16, 53, 25, 41, 37, 44, 59, 54, 81, 66, 76, 57, 54, 37, 18, 39, 11, 35, 33, 31, 57, 42, 82, 72, 80, 47, 58, 55, 21, 22, 26, 38, 22, 53, 25, 23, 38, 70, 60, 51, 36, 55, 26, 34, 23, 27, 14, 9, 7, 34, 32, 28, 39, 49, 75, 30, 52, 48, 40, 52, 28, 18, 17, 9, 5, 45, 21, 34, 64, 56, 50, 49, 45, 31, 19, 12, 15, 10, 7, 6, 3, 48, 23, 20, 39, 36, 35, 53, 21, 16, 23, 13, 10, 6, 1, 4, 2, 16, 15, 17, 27, 25, 20, 29, 11, 17, 12, 16, 8, 1, 1, 0, 1], r.t15HB = [7, 12, 18, 53, 47, 76, 124, 108, 89, 123, 108, 119, 107, 81, 122, 63, 13, 5, 16, 27, 46, 36, 61, 51, 42, 70, 52, 83, 65, 41, 59, 36, 19, 17, 15, 24, 41, 34, 59, 48, 40, 64, 50, 78, 62, 80, 56, 33, 29, 28, 25, 43, 39, 63, 55, 93, 76, 59, 93, 72, 54, 75, 50, 29, 52, 22, 42, 40, 67, 57, 95, 79, 72, 57, 89, 69, 49, 66, 46, 27, 77, 37, 35, 66, 58, 52, 91, 74, 62, 48, 79, 63, 90, 62, 40, 38, 125, 32, 60, 56, 50, 92, 78, 65, 55, 87, 71, 51, 73, 51, 70, 30, 109, 53, 49, 94, 88, 75, 66, 122, 91, 73, 56, 42, 64, 44, 21, 25, 90, 43, 41, 77, 73, 63, 56, 92, 77, 66, 47, 67, 48, 53, 36, 20, 71, 34, 67, 60, 58, 49, 88, 76, 67, 106, 71, 54, 38, 39, 23, 15, 109, 53, 51, 47, 90, 82, 58, 57, 48, 72, 57, 41, 23, 27, 62, 9, 86, 42, 40, 37, 70, 64, 52, 43, 70, 55, 42, 25, 29, 18, 11, 11, 118, 68, 30, 55, 50, 46, 74, 65, 49, 39, 24, 16, 22, 13, 14, 7, 91, 44, 39, 38, 34, 63, 52, 45, 31, 52, 28, 19, 14, 8, 9, 3, 123, 60, 58, 53, 47, 43, 32, 22, 37, 24, 17, 12, 15, 10, 2, 1, 71, 37, 34, 30, 28, 20, 17, 26, 21, 16, 10, 6, 8, 6, 2, 0], r.t16HB = [1, 5, 14, 44, 74, 63, 110, 93, 172, 149, 138, 242, 225, 195, 376, 17, 3, 4, 12, 20, 35, 62, 53, 47, 83, 75, 68, 119, 201, 107, 207, 9, 15, 13, 23, 38, 67, 58, 103, 90, 161, 72, 127, 117, 110, 209, 206, 16, 45, 21, 39, 69, 64, 114, 99, 87, 158, 140, 252, 212, 199, 387, 365, 26, 75, 36, 68, 65, 115, 101, 179, 164, 155, 264, 246, 226, 395, 382, 362, 9, 66, 30, 59, 56, 102, 185, 173, 265, 142, 253, 232, 400, 388, 378, 445, 16, 111, 54, 52, 100, 184, 178, 160, 133, 257, 244, 228, 217, 385, 366, 715, 10, 98, 48, 91, 88, 165, 157, 148, 261, 248, 407, 397, 372, 380, 889, 884, 8, 85, 84, 81, 159, 156, 143, 260, 249, 427, 401, 392, 383, 727, 713, 708, 7, 154, 76, 73, 141, 131, 256, 245, 426, 406, 394, 384, 735, 359, 710, 352, 11, 139, 129, 67, 125, 247, 233, 229, 219, 393, 743, 737, 720, 885, 882, 439, 4, 243, 120, 118, 115, 227, 223, 396, 746, 742, 736, 721, 712, 706, 223, 436, 6, 202, 224, 222, 218, 216, 389, 386, 381, 364, 888, 443, 707, 440, 437, 1728, 4, 747, 211, 210, 208, 370, 379, 734, 723, 714, 1735, 883, 877, 876, 3459, 865, 2, 377, 369, 102, 187, 726, 722, 358, 711, 709, 866, 1734, 871, 3458, 870, 434, 0, 12, 10, 7, 11, 10, 17, 11, 9, 13, 12, 10, 7, 5, 3, 1, 3], r.t24HB = [15, 13, 46, 80, 146, 262, 248, 434, 426, 669, 653, 649, 621, 517, 1032, 88, 14, 12, 21, 38, 71, 130, 122, 216, 209, 198, 327, 345, 319, 297, 279, 42, 47, 22, 41, 74, 68, 128, 120, 221, 207, 194, 182, 340, 315, 295, 541, 18, 81, 39, 75, 70, 134, 125, 116, 220, 204, 190, 178, 325, 311, 293, 271, 16, 147, 72, 69, 135, 127, 118, 112, 210, 200, 188, 352, 323, 306, 285, 540, 14, 263, 66, 129, 126, 119, 114, 214, 202, 192, 180, 341, 317, 301, 281, 262, 12, 249, 123, 121, 117, 113, 215, 206, 195, 185, 347, 330, 308, 291, 272, 520, 10, 435, 115, 111, 109, 211, 203, 196, 187, 353, 332, 313, 298, 283, 531, 381, 17, 427, 212, 208, 205, 201, 193, 186, 177, 169, 320, 303, 286, 268, 514, 377, 16, 335, 199, 197, 191, 189, 181, 174, 333, 321, 305, 289, 275, 521, 379, 371, 11, 668, 184, 183, 179, 175, 344, 331, 314, 304, 290, 277, 530, 383, 373, 366, 10, 652, 346, 171, 168, 164, 318, 309, 299, 287, 276, 263, 513, 375, 368, 362, 6, 648, 322, 316, 312, 307, 302, 292, 284, 269, 261, 512, 376, 370, 364, 359, 4, 620, 300, 296, 294, 288, 282, 273, 266, 515, 380, 374, 369, 365, 361, 357, 2, 1033, 280, 278, 274, 267, 264, 259, 382, 378, 372, 367, 363, 360, 358, 356, 0, 43, 20, 19, 17, 15, 13, 11, 9, 7, 6, 4, 7, 5, 3, 1, 3], r.t32HB = [1, 10, 8, 20, 12, 20, 16, 32, 14, 12, 24, 0, 28, 16, 24, 16], r.t33HB = [15, 28, 26, 48, 22, 40, 36, 64, 14, 24, 20, 32, 12, 16, 8, 0], r.t1l = [1, 4, 3, 5], r.t2l = [1, 4, 7, 4, 5, 7, 6, 7, 8], r.t3l = [2, 3, 7, 4, 4, 7, 6, 7, 8], r.t5l = [1, 4, 7, 8, 4, 5, 8, 9, 7, 8, 9, 10, 8, 8, 9, 10], r.t6l = [3, 4, 6, 8, 4, 4, 6, 7, 5, 6, 7, 8, 7, 7, 8, 9], r.t7l = [1, 4, 7, 9, 9, 10, 4, 6, 8, 9, 9, 10, 7, 7, 9, 10, 10, 11, 8, 9, 10, 11, 11, 11, 8, 9, 10, 11, 11, 12, 9, 10, 11, 12, 12, 12], r.t8l = [2, 4, 7, 9, 9, 10, 4, 4, 6, 10, 10, 10, 7, 6, 8, 10, 10, 11, 9, 10, 10, 11, 11, 12, 9, 9, 10, 11, 12, 12, 10, 10, 11, 11, 13, 13], r.t9l = [3, 4, 6, 7, 9, 10, 4, 5, 6, 7, 8, 10, 5, 6, 7, 8, 9, 10, 7, 7, 8, 9, 9, 10, 8, 8, 9, 9, 10, 11, 9, 9, 10, 10, 11, 11], r.t10l = [1, 4, 7, 9, 10, 10, 10, 11, 4, 6, 8, 9, 10, 11, 10, 10, 7, 8, 9, 10, 11, 12, 11, 11, 8, 9, 10, 11, 12, 12, 11, 12, 9, 10, 11, 12, 12, 12, 12, 12, 10, 11, 12, 12, 13, 13, 12, 13, 9, 10, 11, 12, 12, 12, 13, 13, 10, 10, 11, 12, 12, 13, 13, 13], r.t11l = [2, 4, 6, 8, 9, 10, 9, 10, 4, 5, 6, 8, 10, 10, 9, 10, 6, 7, 8, 9, 10, 11, 10, 10, 8, 8, 9, 11, 10, 12, 10, 11, 9, 10, 10, 11, 11, 12, 11, 12, 9, 10, 11, 12, 12, 13, 12, 13, 9, 9, 9, 10, 11, 12, 12, 12, 9, 9, 10, 11, 12, 12, 12, 12], r.t12l = [4, 4, 6, 8, 9, 10, 10, 10, 4, 5, 6, 7, 9, 9, 10, 10, 6, 6, 7, 8, 9, 10, 9, 10, 7, 7, 8, 8, 9, 10, 10, 10, 8, 8, 9, 9, 10, 10, 10, 11, 9, 9, 10, 10, 10, 11, 10, 11, 9, 9, 9, 10, 10, 11, 11, 12, 10, 10, 10, 11, 11, 11, 11, 12], r.t13l = [1, 5, 7, 8, 9, 10, 10, 11, 10, 11, 12, 12, 13, 13, 14, 14, 4, 6, 8, 9, 10, 10, 11, 11, 11, 11, 12, 12, 13, 14, 14, 14, 7, 8, 9, 10, 11, 11, 12, 12, 11, 12, 12, 13, 13, 14, 15, 15, 8, 9, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 15, 15, 9, 9, 11, 11, 12, 12, 13, 13, 12, 13, 13, 14, 14, 15, 15, 16, 10, 10, 11, 12, 12, 12, 13, 13, 13, 13, 14, 13, 15, 15, 16, 16, 10, 11, 12, 12, 13, 13, 13, 13, 13, 14, 14, 14, 15, 15, 16, 16, 11, 11, 12, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 16, 18, 18, 10, 10, 11, 12, 12, 13, 13, 14, 14, 14, 14, 15, 15, 16, 17, 17, 11, 11, 12, 12, 13, 13, 13, 15, 14, 15, 15, 16, 16, 16, 18, 17, 11, 12, 12, 13, 13, 14, 14, 15, 14, 15, 16, 15, 16, 17, 18, 19, 12, 12, 12, 13, 14, 14, 14, 14, 15, 15, 15, 16, 17, 17, 17, 18, 12, 13, 13, 14, 14, 15, 14, 15, 16, 16, 17, 17, 17, 18, 18, 18, 13, 13, 14, 15, 15, 15, 16, 16, 16, 16, 16, 17, 18, 17, 18, 18, 14, 14, 14, 15, 15, 15, 17, 16, 16, 19, 17, 17, 17, 19, 18, 18, 13, 14, 15, 16, 16, 16, 17, 16, 17, 17, 18, 18, 21, 20, 21, 18], r.t15l = [3, 5, 6, 8, 8, 9, 10, 10, 10, 11, 11, 12, 12, 12, 13, 14, 5, 5, 7, 8, 9, 9, 10, 10, 10, 11, 11, 12, 12, 12, 13, 13, 6, 7, 7, 8, 9, 9, 10, 10, 10, 11, 11, 12, 12, 13, 13, 13, 7, 8, 8, 9, 9, 10, 10, 11, 11, 11, 12, 12, 12, 13, 13, 13, 8, 8, 9, 9, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 13, 13, 9, 9, 9, 10, 10, 10, 11, 11, 11, 11, 12, 12, 13, 13, 13, 14, 10, 9, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 13, 14, 14, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 14, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 14, 14, 14, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 13, 14, 15, 14, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 15, 12, 12, 11, 12, 12, 12, 13, 13, 13, 13, 13, 13, 14, 14, 15, 15, 12, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 14, 15, 15, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 14, 15, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 15, 15, 15, 15], r.t16_5l = [1, 5, 7, 9, 10, 10, 11, 11, 12, 12, 12, 13, 13, 13, 14, 11, 4, 6, 8, 9, 10, 11, 11, 11, 12, 12, 12, 13, 14, 13, 14, 11, 7, 8, 9, 10, 11, 11, 12, 12, 13, 12, 13, 13, 13, 14, 14, 12, 9, 9, 10, 11, 11, 12, 12, 12, 13, 13, 14, 14, 14, 15, 15, 13, 10, 10, 11, 11, 12, 12, 13, 13, 13, 14, 14, 14, 15, 15, 15, 12, 10, 10, 11, 11, 12, 13, 13, 14, 13, 14, 14, 15, 15, 15, 16, 13, 11, 11, 11, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 16, 13, 11, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 15, 17, 17, 13, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 13, 12, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 15, 16, 15, 14, 12, 13, 12, 13, 14, 14, 14, 14, 15, 16, 16, 16, 17, 17, 16, 13, 13, 13, 13, 13, 14, 14, 15, 16, 16, 16, 16, 16, 16, 15, 16, 14, 13, 14, 14, 14, 14, 15, 15, 15, 15, 17, 16, 16, 16, 16, 18, 14, 15, 14, 14, 14, 15, 15, 16, 16, 16, 18, 17, 17, 17, 19, 17, 14, 14, 15, 13, 14, 16, 16, 15, 16, 16, 17, 18, 17, 19, 17, 16, 14, 11, 11, 11, 12, 12, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 12], r.t16l = [1, 5, 7, 9, 10, 10, 11, 11, 12, 12, 12, 13, 13, 13, 14, 10, 4, 6, 8, 9, 10, 11, 11, 11, 12, 12, 12, 13, 14, 13, 14, 10, 7, 8, 9, 10, 11, 11, 12, 12, 13, 12, 13, 13, 13, 14, 14, 11, 9, 9, 10, 11, 11, 12, 12, 12, 13, 13, 14, 14, 14, 15, 15, 12, 10, 10, 11, 11, 12, 12, 13, 13, 13, 14, 14, 14, 15, 15, 15, 11, 10, 10, 11, 11, 12, 13, 13, 14, 13, 14, 14, 15, 15, 15, 16, 12, 11, 11, 11, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 16, 12, 11, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 15, 17, 17, 12, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 12, 12, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 15, 16, 15, 13, 12, 13, 12, 13, 14, 14, 14, 14, 15, 16, 16, 16, 17, 17, 16, 12, 13, 13, 13, 13, 14, 14, 15, 16, 16, 16, 16, 16, 16, 15, 16, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 17, 16, 16, 16, 16, 18, 13, 15, 14, 14, 14, 15, 15, 16, 16, 16, 18, 17, 17, 17, 19, 17, 13, 14, 15, 13, 14, 16, 16, 15, 16, 16, 17, 18, 17, 19, 17, 16, 13, 10, 10, 10, 11, 11, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 10], r.t24l = [4, 5, 7, 8, 9, 10, 10, 11, 11, 12, 12, 12, 12, 12, 13, 10, 5, 6, 7, 8, 9, 10, 10, 11, 11, 11, 12, 12, 12, 12, 12, 10, 7, 7, 8, 9, 9, 10, 10, 11, 11, 11, 11, 12, 12, 12, 13, 9, 8, 8, 9, 9, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 9, 9, 9, 9, 10, 10, 10, 10, 11, 11, 11, 12, 12, 12, 12, 13, 9, 10, 9, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 9, 10, 10, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 9, 11, 10, 10, 10, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 13, 13, 10, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 13, 13, 13, 10, 12, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 10, 12, 12, 11, 11, 11, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 10, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 10, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 10, 13, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 6], r.t32l = [1, 5, 5, 7, 5, 8, 7, 9, 5, 7, 7, 9, 7, 9, 9, 10], r.t33l = [4, 5, 5, 6, 5, 6, 6, 7, 5, 6, 6, 7, 6, 7, 7, 8], r.ht = [new a(0, 0, null, null), new a(2, 0, r.t1HB, r.t1l), new a(3, 0, r.t2HB, r.t2l), new a(3, 0, r.t3HB, r.t3l), new a(0, 0, null, null), new a(4, 0, r.t5HB, r.t5l), new a(4, 0, r.t6HB, r.t6l), new a(6, 0, r.t7HB, r.t7l), new a(6, 0, r.t8HB, r.t8l), new a(6, 0, r.t9HB, r.t9l), new a(8, 0, r.t10HB, r.t10l), new a(8, 0, r.t11HB, r.t11l), new a(8, 0, r.t12HB, r.t12l), new a(16, 0, r.t13HB, r.t13l), new a(0, 0, null, r.t16_5l), new a(16, 0, r.t15HB, r.t15l), new a(1, 1, r.t16HB, r.t16l), new a(2, 3, r.t16HB, r.t16l), new a(3, 7, r.t16HB, r.t16l), new a(4, 15, r.t16HB, r.t16l), new a(6, 63, r.t16HB, r.t16l), new a(8, 255, r.t16HB, r.t16l), new a(10, 1023, r.t16HB, r.t16l), new a(13, 8191, r.t16HB, r.t16l), new a(4, 15, r.t24HB, r.t24l), new a(5, 31, r.t24HB, r.t24l), new a(6, 63, r.t24HB, r.t24l), new a(7, 127, r.t24HB, r.t24l), new a(8, 255, r.t24HB, r.t24l), new a(9, 511, r.t24HB, r.t24l), new a(11, 2047, r.t24HB, r.t24l), new a(13, 8191, r.t24HB, r.t24l), new a(0, 0, r.t32HB, r.t32l), new a(0, 0, r.t33HB, r.t33l)], r.largetbl = [65540, 327685, 458759, 589832, 655369, 655370, 720906, 720907, 786443, 786444, 786444, 851980, 851980, 851980, 917517, 655370, 262149, 393222, 524295, 589832, 655369, 720906, 720906, 720907, 786443, 786443, 786444, 851980, 917516, 851980, 917516, 655370, 458759, 524295, 589832, 655369, 720905, 720906, 786442, 786443, 851979, 786443, 851979, 851980, 851980, 917516, 917517, 720905, 589832, 589832, 655369, 720905, 720906, 786442, 786442, 786443, 851979, 851979, 917515, 917516, 917516, 983052, 983052, 786441, 655369, 655369, 720905, 720906, 786442, 786442, 851978, 851979, 851979, 917515, 917516, 917516, 983052, 983052, 983053, 720905, 655370, 655369, 720906, 720906, 786442, 851978, 851979, 917515, 851979, 917515, 917516, 983052, 983052, 983052, 1048588, 786441, 720906, 720906, 720906, 786442, 851978, 851979, 851979, 851979, 917515, 917516, 917516, 917516, 983052, 983052, 1048589, 786441, 720907, 720906, 786442, 786442, 851979, 851979, 851979, 917515, 917516, 983052, 983052, 983052, 983052, 1114125, 1114125, 786442, 720907, 786443, 786443, 851979, 851979, 851979, 917515, 917515, 983051, 983052, 983052, 983052, 1048588, 1048589, 1048589, 786442, 786443, 786443, 786443, 851979, 851979, 917515, 917515, 983052, 983052, 983052, 983052, 1048588, 983053, 1048589, 983053, 851978, 786444, 851979, 786443, 851979, 917515, 917516, 917516, 917516, 983052, 1048588, 1048588, 1048589, 1114125, 1114125, 1048589, 786442, 851980, 851980, 851979, 851979, 917515, 917516, 983052, 1048588, 1048588, 1048588, 1048588, 1048589, 1048589, 983053, 1048589, 851978, 851980, 917516, 917516, 917516, 917516, 983052, 983052, 983052, 983052, 1114124, 1048589, 1048589, 1048589, 1048589, 1179661, 851978, 983052, 917516, 917516, 917516, 983052, 983052, 1048588, 1048588, 1048589, 1179661, 1114125, 1114125, 1114125, 1245197, 1114125, 851978, 917517, 983052, 851980, 917516, 1048588, 1048588, 983052, 1048589, 1048589, 1114125, 1179661, 1114125, 1245197, 1114125, 1048589, 851978, 655369, 655369, 655369, 720905, 720905, 786441, 786441, 786441, 851977, 851977, 851977, 851978, 851978, 851978, 851978, 655366], r.table23 = [65538, 262147, 458759, 262148, 327684, 458759, 393222, 458759, 524296], r.table56 = [65539, 262148, 458758, 524296, 262148, 327684, 524294, 589831, 458757, 524294, 589831, 655368, 524295, 524295, 589832, 655369], r.bitrate_table = [
            [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160, -1],
            [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1],
            [0, 8, 16, 24, 32, 40, 48, 56, 64, -1, -1, -1, -1, -1, -1, -1]
        ], r.samplerate_table = [
            [22050, 24e3, 16e3, -1],
            [44100, 48e3, 32e3, -1],
            [11025, 12e3, 8e3, -1]
        ], r.scfsi_band = [0, 6, 11, 16, 21], e.exports = r
    },
    37: function(e, t, a) {
        function r() {
            function e(e, t, a) {
                var n, i, o, _ = 0;
                a <<= 1;
                var l = t + a;
                n = 4;
                do {
                    var f, u, h, c, p, b, m;
                    m = n >> 1, c = n, p = n << 1, b = p + c, n = p << 1, i = t, o = i + m;
                    do {
                        var v, d, g, w;
                        d = e[i + 0] - e[i + c], v = e[i + 0] + e[i + c], w = e[i + p] - e[i + b], g = e[i + p] + e[i + b], e[i + p] = v - g, e[i + 0] = v + g, e[i + b] = d - w, e[i + c] = d + w, d = e[o + 0] - e[o + c], v = e[o + 0] + e[o + c], w = s.SQRT2 * e[o + b], g = s.SQRT2 * e[o + p], e[o + p] = v - g, e[o + 0] = v + g, e[o + b] = d - w, e[o + c] = d + w, o += n, i += n
                    } while (l > i);
                    for (u = r[_ + 0], f = r[_ + 1], h = 1; m > h; h++) {
                        var S, A;
                        S = 1 - 2 * f * f, A = 2 * f * u, i = t + h, o = t + c - h;
                        do {
                            var R, M, y, v, d, B, g, E, w, T;
                            M = A * e[i + c] - S * e[o + c], R = S * e[i + c] + A * e[o + c], d = e[i + 0] - R, v = e[i + 0] + R, B = e[o + 0] - M, y = e[o + 0] + M, M = A * e[i + b] - S * e[o + b], R = S * e[i + b] + A * e[o + b], w = e[i + p] - R, g = e[i + p] + R, T = e[o + p] - M, E = e[o + p] + M, M = f * g - u * T, R = u * g + f * T, e[i + p] = v - R, e[i + 0] = v + R, e[o + b] = B - M, e[o + c] = B + M, M = u * E - f * w, R = f * E + u * w, e[o + p] = y - R, e[o + 0] = y + R, e[i + b] = d - M, e[i + c] = d + M, o += n, i += n
                        } while (l > i);
                        S = u, u = S * r[_ + 0] - f * r[_ + 1], f = S * r[_ + 1] + f * r[_ + 0]
                    }
                    _ += 2
                } while (a > n)
            }
            var t = i(o.BLKSIZE),
                a = i(o.BLKSIZE_s / 2),
                r = [.9238795325112867, .3826834323650898, .9951847266721969, .0980171403295606, .9996988186962042, .02454122852291229, .9999811752826011, .006135884649154475],
                n = [0, 128, 64, 192, 32, 160, 96, 224, 16, 144, 80, 208, 48, 176, 112, 240, 8, 136, 72, 200, 40, 168, 104, 232, 24, 152, 88, 216, 56, 184, 120, 248, 4, 132, 68, 196, 36, 164, 100, 228, 20, 148, 84, 212, 52, 180, 116, 244, 12, 140, 76, 204, 44, 172, 108, 236, 28, 156, 92, 220, 60, 188, 124, 252, 2, 130, 66, 194, 34, 162, 98, 226, 18, 146, 82, 210, 50, 178, 114, 242, 10, 138, 74, 202, 42, 170, 106, 234, 26, 154, 90, 218, 58, 186, 122, 250, 6, 134, 70, 198, 38, 166, 102, 230, 22, 150, 86, 214, 54, 182, 118, 246, 14, 142, 78, 206, 46, 174, 110, 238, 30, 158, 94, 222, 62, 190, 126, 254];
            this.fft_short = function(t, r, s, i, _) {
                for (var l = 0; 3 > l; l++) {
                    var f = o.BLKSIZE_s / 2,
                        u = 65535 & 192 * (l + 1),
                        h = o.BLKSIZE_s / 8 - 1;
                    do {
                        var c, p, b, m, v, d = 255 & n[h << 2];
                        c = a[d] * i[s][_ + d + u], v = a[127 - d] * i[s][_ + d + u + 128], p = c - v, c += v, b = a[d + 64] * i[s][_ + d + u + 64], v = a[63 - d] * i[s][_ + d + u + 192], m = b - v, b += v, f -= 4, r[l][f + 0] = c + b, r[l][f + 2] = c - b, r[l][f + 1] = p + m, r[l][f + 3] = p - m, c = a[d + 1] * i[s][_ + d + u + 1], v = a[126 - d] * i[s][_ + d + u + 129], p = c - v, c += v, b = a[d + 65] * i[s][_ + d + u + 65], v = a[62 - d] * i[s][_ + d + u + 193], m = b - v, b += v, r[l][f + o.BLKSIZE_s / 2 + 0] = c + b, r[l][f + o.BLKSIZE_s / 2 + 2] = c - b, r[l][f + o.BLKSIZE_s / 2 + 1] = p + m, r[l][f + o.BLKSIZE_s / 2 + 3] = p - m
                    } while (--h >= 0);
                    e(r[l], f, o.BLKSIZE_s / 2)
                }
            }, this.fft_long = function(a, r, s, i, _) {
                var l = o.BLKSIZE / 8 - 1,
                    f = o.BLKSIZE / 2;
                do {
                    var u, h, c, p, b, m = 255 & n[l];
                    u = t[m] * i[s][_ + m], b = t[m + 512] * i[s][_ + m + 512], h = u - b, u += b, c = t[m + 256] * i[s][_ + m + 256], b = t[m + 768] * i[s][_ + m + 768], p = c - b, c += b, f -= 4, r[f + 0] = u + c, r[f + 2] = u - c, r[f + 1] = h + p, r[f + 3] = h - p, u = t[m + 1] * i[s][_ + m + 1], b = t[m + 513] * i[s][_ + m + 513], h = u - b, u += b, c = t[m + 257] * i[s][_ + m + 257], b = t[m + 769] * i[s][_ + m + 769], p = c - b, c += b, r[f + o.BLKSIZE / 2 + 0] = u + c, r[f + o.BLKSIZE / 2 + 2] = u - c, r[f + o.BLKSIZE / 2 + 1] = h + p, r[f + o.BLKSIZE / 2 + 3] = h - p
                } while (--l >= 0);
                e(r, f, o.BLKSIZE / 2)
            }, this.init_fft = function(e) {
                for (var r = 0; r < o.BLKSIZE; r++) t[r] = .42 - .5 * Math.cos(2 * Math.PI * (r + .5) / o.BLKSIZE) + .08 * Math.cos(4 * Math.PI * (r + .5) / o.BLKSIZE);
                for (var r = 0; r < o.BLKSIZE_s / 2; r++) a[r] = .5 * (1 - Math.cos(2 * Math.PI * (r + .5) / o.BLKSIZE_s))
            }
        }
        var n = a(157),
            s = (n.System, n.VbrMode, n.Float, n.ShortBlock, n.Util),
            i = (n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float),
            o = (n.new_float_n, n.new_int, n.new_int_n, n.assert, a(10));
        e.exports = r
    },
    67: function(e, t, a) {
        function r() {
            function e() {
                this.mask_adjust = 0, this.mask_adjust_short = 0, this.bo_l_weight = _(w.SBMAX_l), this.bo_s_weight = _(w.SBMAX_s)
            }

            function t() {
                this.lowerlimit = 0
            }

            function a(e, t) {
                this.lowpass = t
            }

            function n(e) {
                var t;
                return e.class_id = $, t = e.internal_flags = new p, e.mode = MPEGMode.NOT_SET, e.original = 1, e.in_samplerate = 44100, e.num_channels = 2, e.num_samples = -1, e.bWriteVbrTag = !0, e.quality = -1, e.short_blocks = null, t.subblock_gain = -1, e.lowpassfreq = 0, e.highpassfreq = 0, e.lowpasswidth = -1, e.highpasswidth = -1, e.VBR = i.vbr_off, e.VBR_q = 4, e.ATHcurve = -1, e.VBR_mean_bitrate_kbps = 128, e.VBR_min_bitrate_kbps = 0, e.VBR_max_bitrate_kbps = 0, e.VBR_hard_min = 0, t.VBR_min_bitrate = 1, t.VBR_max_bitrate = 13, e.quant_comp = -1, e.quant_comp_short = -1, e.msfix = -1, t.resample_ratio = 1, t.OldValue[0] = 180, t.OldValue[1] = 180, t.CurrentStep[0] = 4, t.CurrentStep[1] = 4, t.masking_lower = 1, t.nsPsy.attackthre = -1, t.nsPsy.attackthre_s = -1, e.scale = -1, e.athaa_type = -1, e.ATHtype = -1, e.athaa_loudapprox = -1, e.athaa_sensitivity = 0, e.useTemporal = null, e.interChRatio = -1, t.mf_samples_to_encode = w.ENCDELAY + w.POSTDELAY, e.encoder_padding = 0, t.mf_size = w.ENCDELAY - w.MDCTDELAY, e.findReplayGain = !1, e.decode_on_the_fly = !1, t.decode_on_the_fly = !1, t.findReplayGain = !1, t.findPeakSample = !1, t.RadioGain = 0, t.AudiophileGain = 0, t.noclipGainChange = 0, t.noclipScale = -1, e.preset = 0, e.write_id3tag_automatic = !0, 0
            }

            function S(e) {
                return e > 1 ? 0 : 0 >= e ? 1 : Math.cos(Math.PI / 2 * e)
            }

            function A(e, t) {
                var a = 44100;
                return t >= 48e3 ? a = 48e3 : t >= 44100 ? a = 44100 : t >= 32e3 ? a = 32e3 : t >= 24e3 ? a = 24e3 : t >= 22050 ? a = 22050 : t >= 16e3 ? a = 16e3 : t >= 12e3 ? a = 12e3 : t >= 11025 ? a = 11025 : t >= 8e3 && (a = 8e3), -1 == e ? a : (15960 >= e && (a = 44100), 15250 >= e && (a = 32e3), 11220 >= e && (a = 24e3), 9970 >= e && (a = 22050), 7230 >= e && (a = 16e3), 5420 >= e && (a = 12e3), 4510 >= e && (a = 11025), 3970 >= e && (a = 8e3), a > t ? t > 44100 ? 48e3 : t > 32e3 ? 44100 : t > 24e3 ? 32e3 : t > 22050 ? 24e3 : t > 16e3 ? 22050 : t > 12e3 ? 16e3 : t > 11025 ? 12e3 : t > 8e3 ? 11025 : 8e3 : a)
            }

            function R(e, t) {
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

            function M(e, t, a) {
                16e3 > a && (t = 2);
                for (var r = g.bitrate_table[t][1], n = 2; 14 >= n; n++) g.bitrate_table[t][n] > 0 && Math.abs(g.bitrate_table[t][n] - e) < Math.abs(r - e) && (r = g.bitrate_table[t][n]);
                return r
            }

            function y(e, t, a) {
                16e3 > a && (t = 2);
                for (var r = 0; 14 >= r; r++)
                    if (g.bitrate_table[t][r] > 0 && g.bitrate_table[t][r] == e) return r;
                return -1
            }

            function B(e, t) {
                var r = [new a(8, 2e3), new a(16, 3700), new a(24, 3900), new a(32, 5500), new a(40, 7e3), new a(48, 7500), new a(56, 1e4), new a(64, 11e3), new a(80, 13500), new a(96, 15100), new a(112, 15600), new a(128, 17e3), new a(160, 17500), new a(192, 18600), new a(224, 19400), new a(256, 19700), new a(320, 20500)],
                    n = X.nearestBitrateFullIndex(t);
                e.lowerlimit = r[n].lowpass
            }

            function E(e) {
                var t = e.internal_flags,
                    a = 32,
                    r = -1;
                if (t.lowpass1 > 0) {
                    for (var n = 999, i = 0; 31 >= i; i++) {
                        var o = i / 31;
                        o >= t.lowpass2 && (a = Math.min(a, i)), t.lowpass1 < o && o < t.lowpass2 && (n = Math.min(n, i))
                    }
                    999 == n ? t.lowpass1 = (a - .75) / 31 : t.lowpass1 = (n - .75) / 31, t.lowpass2 = a / 31
                }
                if (t.highpass2 > 0 && t.highpass2 < .9 * (.75 / 31) && (t.highpass1 = 0, t.highpass2 = 0, s.err.println("Warning: highpass filter disabled.  highpass frequency too small\n")), t.highpass2 > 0) {
                    for (var _ = -1, i = 0; 31 >= i; i++) {
                        var o = i / 31;
                        o <= t.highpass1 && (r = Math.max(r, i)), t.highpass1 < o && o < t.highpass2 && (_ = Math.max(_, i))
                    }
                    t.highpass1 = r / 31, -1 == _ ? t.highpass2 = (r + .75) / 31 : t.highpass2 = (_ + .75) / 31
                }
                for (var i = 0; 32 > i; i++) {
                    var l, f, o = i / 31;
                    l = t.highpass2 > t.highpass1 ? S((t.highpass2 - o) / (t.highpass2 - t.highpass1 + 1e-20)) : 1, f = t.lowpass2 > t.lowpass1 ? S((o - t.lowpass1) / (t.lowpass2 - t.lowpass1 + 1e-20)) : 1, t.amp_filter[i] = l * f
                }
            }

            function T(e) {
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
                            t.psymodel = 1,
                        0 == t.noise_shaping && (t.noise_shaping = 1),
                        t.noise_shaping_amp = 0,
                        t.noise_shaping_stop = 0,
                        -1 == t.subblock_gain && (t.subblock_gain = 1),
                        t.use_best_huffman = 0,
                        t.full_outer_loop = 0;
                        break;
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
                            t.psymodel = 1,
                        0 == t.noise_shaping && (t.noise_shaping = 1),
                        0 == t.substep_shaping && (t.substep_shaping = 2),
                        t.noise_shaping_amp = 2,
                        t.noise_shaping_stop = 1,
                        -1 == t.subblock_gain && (t.subblock_gain = 1),
                        t.use_best_huffman = 1,
                        t.full_outer_loop = 0;
                        break;
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
            }

            function k(e) {
                var t = e.internal_flags;
                e.frameNum = 0, e.write_id3tag_automatic && Q.id3tag_write_v2(e), t.bitrate_stereoMode_Hist = l([16, 5]), t.bitrate_blockType_Hist = l([16, 6]), t.PeakSample = 0, e.bWriteVbrTag && K.InitVbrTag(e)
            }

            function x(e, t) {
                (null == e.in_buffer_0 || e.in_buffer_nsamples < t) && (e.in_buffer_0 = _(t), e.in_buffer_1 = _(t), e.in_buffer_nsamples = t)
            }

            function P(e) {
                var t = w.BLKSIZE + e.framesize - w.FFTOFFSET;
                return t = Math.max(t, 512 + e.framesize - 32), u(p.MFSIZE >= t), t
            }

            function I(e, t, a, r, n, s, i) {
                var o, _, l, f, h, c = e.internal_flags,
                    b = 0,
                    m = [null, null],
                    v = [null, null];
                if (c.Class_ID != $) return -3;
                if (0 == r) return 0;
                if (h = U.copy_buffer(c, n, s, i, 0), 0 > h) return h;
                if (s += h, b += h, v[0] = t, v[1] = a, d.NEQ(e.scale, 0) && d.NEQ(e.scale, 1))
                    for (_ = 0; r > _; ++_) v[0][_] *= e.scale, 2 == c.channels_out && (v[1][_] *= e.scale);
                if (d.NEQ(e.scale_left, 0) && d.NEQ(e.scale_left, 1))
                    for (_ = 0; r > _; ++_) v[0][_] *= e.scale_left;
                if (d.NEQ(e.scale_right, 0) && d.NEQ(e.scale_right, 1))
                    for (_ = 0; r > _; ++_) v[1][_] *= e.scale_right;
                if (2 == e.num_channels && 1 == c.channels_out)
                    for (_ = 0; r > _; ++_) v[0][_] = .5 * (v[0][_] + v[1][_]), v[1][_] = 0;
                f = P(e), m[0] = c.mfbuf[0], m[1] = c.mfbuf[1];
                for (var g = 0; r > 0;) {
                    var S = [null, null],
                        A = 0,
                        R = 0;
                    S[0] = v[0], S[1] = v[1];
                    var M = new O;
                    if (Y(e, m, S, g, r, M), A = M.n_in, R = M.n_out, c.findReplayGain && !c.decode_on_the_fly && q.AnalyzeSamples(c.rgdata, m[0], c.mf_size, m[1], c.mf_size, R, c.channels_out) == GainAnalysis.GAIN_ANALYSIS_ERROR) return -6;
                    if (r -= A, g += A, 2 == c.channels_out, c.mf_size += R, u(c.mf_size <= p.MFSIZE), c.mf_samples_to_encode < 1 && (c.mf_samples_to_encode = w.ENCDELAY + w.POSTDELAY), c.mf_samples_to_encode += R, c.mf_size >= f) {
                        var y = i - b;
                        if (0 == i && (y = 0), o = L(e, m[0], m[1], n, s, y), 0 > o) return o;
                        for (s += o, b += o, c.mf_size -= e.framesize, c.mf_samples_to_encode -= e.framesize, l = 0; l < c.channels_out; l++)
                            for (_ = 0; _ < c.mf_size; _++) m[l][_] = m[l][_ + e.framesize]
                    }
                }
                return u(0 == r), b
            }

            function L(e, t, a, r, n, s) {
                var i = X.enc.lame_encode_mp3_frame(e, t, a, r, n, s);
                return e.frameNum++, i
            }

            function O() {
                this.n_in = 0, this.n_out = 0
            }

            function V() {
                this.num_used = 0
            }

            function N(e, t) {
                return 0 != t ? N(t, e % t) : e
            }

            function H(e, t, a) {
                var r = Math.PI * t;
                e /= a, 0 > e && (e = 0), e > 1 && (e = 1);
                var n = e - .5,
                    s = .42 - .5 * Math.cos(2 * e * Math.PI) + .08 * Math.cos(4 * e * Math.PI);
                return Math.abs(n) < 1e-9 ? r / Math.PI : s * Math.sin(a * r * n) / (Math.PI * a * n)
            }

            function D(e, t, a, r, n, s, i, o, l) {
                var f, h, c = e.internal_flags,
                    b = 0,
                    m = e.out_samplerate / N(e.out_samplerate, e.in_samplerate);
                m > p.BPC && (m = p.BPC);
                var v = Math.abs(c.resample_ratio - Math.floor(.5 + c.resample_ratio)) < 1e-4 ? 1 : 0,
                    d = 1 / c.resample_ratio;
                d > 1 && (d = 1);
                var g = 31;
                0 == g % 2 && --g, g += v;
                var w = g + 1;
                if (0 == c.fill_buffer_resample_init) {
                    for (c.inbuf_old[0] = _(w), c.inbuf_old[1] = _(w), f = 0; 2 * m >= f; ++f) c.blackfilt[f] = _(w);
                    for (c.itime[0] = 0, c.itime[1] = 0, b = 0; 2 * m >= b; b++) {
                        var S = 0,
                            A = (b - m) / (2 * m);
                        for (f = 0; g >= f; f++) S += c.blackfilt[b][f] = H(f - A, d, g);
                        for (f = 0; g >= f; f++) c.blackfilt[b][f] /= S
                    }
                    c.fill_buffer_resample_init = 1
                }
                var R = c.inbuf_old[l];
                for (h = 0; r > h; h++) {
                    var M, y;
                    if (M = h * c.resample_ratio, b = 0 | Math.floor(M - c.itime[l]), g + b - g / 2 >= i) break;
                    var A = M - c.itime[l] - (b + .5 * (g % 2));
                    u(Math.abs(A) <= .501), y = 0 | Math.floor(2 * A * m + m + .5);
                    var B = 0;
                    for (f = 0; g >= f; ++f) {
                        var E, T = f + b - g / 2;
                        u(i > T), u(T + w >= 0), E = 0 > T ? R[w + T] : n[s + T], B += E * c.blackfilt[y][f]
                    }
                    t[a + h] = B
                }
                if (o.num_used = Math.min(i, g + b - g / 2), c.itime[l] += o.num_used - h * c.resample_ratio, o.num_used >= w)
                    for (f = 0; w > f; f++) R[f] = n[s + o.num_used + f - w];
                else {
                    var k = w - o.num_used;
                    for (f = 0; k > f; ++f) R[f] = R[f + o.num_used];
                    for (b = 0; w > f; ++f, ++b) R[f] = n[s + b];
                    u(b == o.num_used)
                }
                return h
            }

            function Y(e, t, a, r, n, s) {
                var i = e.internal_flags;
                if (i.resample_ratio < .9999 || i.resample_ratio > 1.0001)
                    for (var o = 0; o < i.channels_out; o++) {
                        var _ = new V;
                        s.n_out = D(e, t[o], i.mf_size, e.framesize, a[o], r, n, _, o), s.n_in = _.num_used
                    } else {
                        s.n_out = Math.min(e.framesize, n), s.n_in = s.n_out;
                        for (var l = 0; l < s.n_out; ++l) t[0][i.mf_size + l] = a[0][r + l], 2 == i.channels_out && (t[1][i.mf_size + l] = a[1][r + l])
                    }
            }
            var X = this,
                F = 131072;
            r.V9 = 410, r.V8 = 420, r.V7 = 430, r.V6 = 440, r.V5 = 450, r.V4 = 460, r.V3 = 470, r.V2 = 480, r.V1 = 490, r.V0 = 500, r.R3MIX = 1e3, r.STANDARD = 1001, r.EXTREME = 1002, r.INSANE = 1003, r.STANDARD_FAST = 1004, r.EXTREME_FAST = 1005, r.MEDIUM = 1006, r.MEDIUM_FAST = 1007;
            var C = 16384 + F;
            r.LAME_MAXMP3BUFFER = C;
            var q, U, j, G, z, K, Z, Q, W, J = new h;
            this.enc = new w, this.setModules = function(e, t, a, r, n, s, i, o, _) {
                q = e, U = t, j = a, G = r, z = n, K = s, Z = i, Q = o, W = _, this.enc.setModules(U, J, G, K)
            };
            var $ = 4294479419;
            this.lame_init = function() {
                var e = new c,
                    t = n(e);
                return 0 != t ? null : (e.lame_allocated_gfp = 1, e)
            }, this.nearestBitrateFullIndex = function(e) {
                var t = [8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320],
                    a = 0,
                    r = 0,
                    n = 0,
                    s = 0;
                s = t[16], n = 16, r = t[16], a = 16;
                for (var i = 0; 16 > i; i++)
                    if (Math.max(e, t[i + 1]) != e) {
                        s = t[i + 1], n = i + 1, r = t[i], a = i;
                        break
                    }
                return s - e > e - r ? a : n
            }, this.lame_init_params = function(a) {
                var r = a.internal_flags;
                if (r.Class_ID = 0, null == r.ATH && (r.ATH = new b), null == r.PSY && (r.PSY = new e), null == r.rgdata && (r.rgdata = new m), r.channels_in = a.num_channels, 1 == r.channels_in && (a.mode = MPEGMode.MONO), r.channels_out = a.mode == MPEGMode.MONO ? 1 : 2, r.mode_ext = w.MPG_MD_MS_LR, a.mode == MPEGMode.MONO && (a.force_ms = !1), a.VBR == i.vbr_off && 128 != a.VBR_mean_bitrate_kbps && 0 == a.brate && (a.brate = a.VBR_mean_bitrate_kbps), a.VBR == i.vbr_off || a.VBR == i.vbr_mtrh || a.VBR == i.vbr_mt || (a.free_format = !1), a.VBR == i.vbr_off && 0 == a.brate && d.EQ(a.compression_ratio, 0) && (a.compression_ratio = 11.025), a.VBR == i.vbr_off && a.compression_ratio > 0 && (0 == a.out_samplerate && (a.out_samplerate = map2MP3Frequency(int(.97 * a.in_samplerate))), a.brate = 0 | 16 * a.out_samplerate * r.channels_out / (1e3 * a.compression_ratio), r.samplerate_index = R(a.out_samplerate, a), a.free_format || (a.brate = M(a.brate, a.version, a.out_samplerate))), 0 != a.out_samplerate && (a.out_samplerate < 16e3 ? (a.VBR_mean_bitrate_kbps = Math.max(a.VBR_mean_bitrate_kbps, 8), a.VBR_mean_bitrate_kbps = Math.min(a.VBR_mean_bitrate_kbps, 64)) : a.out_samplerate < 32e3 ? (a.VBR_mean_bitrate_kbps = Math.max(a.VBR_mean_bitrate_kbps, 8), a.VBR_mean_bitrate_kbps = Math.min(a.VBR_mean_bitrate_kbps, 160)) : (a.VBR_mean_bitrate_kbps = Math.max(a.VBR_mean_bitrate_kbps, 32), a.VBR_mean_bitrate_kbps = Math.min(a.VBR_mean_bitrate_kbps, 320))), 0 == a.lowpassfreq) {
                    var n = 16e3;
                    switch (a.VBR) {
                        case i.vbr_off:
                            var s = new t;
                            B(s, a.brate), n = s.lowerlimit;
                            break;
                        case i.vbr_abr:
                            var s = new t;
                            B(s, a.VBR_mean_bitrate_kbps), n = s.lowerlimit;
                            break;
                        case i.vbr_rh:
                            var _ = [19500, 19e3, 18600, 18e3, 17500, 16e3, 15600, 14900, 12500, 1e4, 3950];
                            if (0 <= a.VBR_q && a.VBR_q <= 9) {
                                var l = _[a.VBR_q],
                                    f = _[a.VBR_q + 1],
                                    c = a.VBR_q_frac;
                                n = linear_int(l, f, c)
                            } else n = 19500;
                            break;
                        default:
                            var _ = [19500, 19e3, 18500, 18e3, 17500, 16500, 15500, 14500, 12500, 9500, 3950];
                            if (0 <= a.VBR_q && a.VBR_q <= 9) {
                                var l = _[a.VBR_q],
                                    f = _[a.VBR_q + 1],
                                    c = a.VBR_q_frac;
                                n = linear_int(l, f, c)
                            } else n = 19500
                    }
                    a.mode != MPEGMode.MONO || a.VBR != i.vbr_off && a.VBR != i.vbr_abr || (n *= 1.5), a.lowpassfreq = 0 | n
                }
                if (0 == a.out_samplerate && (2 * a.lowpassfreq > a.in_samplerate && (a.lowpassfreq = a.in_samplerate / 2), a.out_samplerate = A(0 | a.lowpassfreq, a.in_samplerate)), a.lowpassfreq = Math.min(20500, a.lowpassfreq), a.lowpassfreq = Math.min(a.out_samplerate / 2, a.lowpassfreq), a.VBR == i.vbr_off && (a.compression_ratio = 16 * a.out_samplerate * r.channels_out / (1e3 * a.brate)), a.VBR == i.vbr_abr && (a.compression_ratio = 16 * a.out_samplerate * r.channels_out / (1e3 * a.VBR_mean_bitrate_kbps)), a.bWriteVbrTag || (a.findReplayGain = !1, a.decode_on_the_fly = !1, r.findPeakSample = !1), r.findReplayGain = a.findReplayGain, r.decode_on_the_fly = a.decode_on_the_fly, r.decode_on_the_fly && (r.findPeakSample = !0), r.findReplayGain && q.InitGainAnalysis(r.rgdata, a.out_samplerate) == GainAnalysis.INIT_GAIN_ANALYSIS_ERROR) return a.internal_flags = null, -6;
                switch (r.decode_on_the_fly && !a.decode_only && (null != r.hip && W.hip_decode_exit(r.hip), r.hip = W.hip_decode_init()), r.mode_gr = a.out_samplerate <= 24e3 ? 1 : 2, a.framesize = 576 * r.mode_gr, a.encoder_delay = w.ENCDELAY, r.resample_ratio = a.in_samplerate / a.out_samplerate, a.VBR) {
                    case i.vbr_mt:
                    case i.vbr_rh:
                    case i.vbr_mtrh:
                        var p = [5.7, 6.5, 7.3, 8.2, 10, 11.9, 13, 14, 15, 16.5];
                        a.compression_ratio = p[a.VBR_q];
                        break;
                    case i.vbr_abr:
                        a.compression_ratio = 16 * a.out_samplerate * r.channels_out / (1e3 * a.VBR_mean_bitrate_kbps);
                        break;
                    default:
                        a.compression_ratio = 16 * a.out_samplerate * r.channels_out / (1e3 * a.brate)
                }
                if (a.mode == MPEGMode.NOT_SET && (a.mode = MPEGMode.JOINT_STEREO), a.highpassfreq > 0 ? (r.highpass1 = 2 * a.highpassfreq, a.highpasswidth >= 0 ? r.highpass2 = 2 * (a.highpassfreq + a.highpasswidth) : r.highpass2 = 2 * a.highpassfreq, r.highpass1 /= a.out_samplerate, r.highpass2 /= a.out_samplerate) : (r.highpass1 = 0, r.highpass2 = 0), a.lowpassfreq > 0 ? (r.lowpass2 = 2 * a.lowpassfreq, a.lowpasswidth >= 0 ? (r.lowpass1 = 2 * (a.lowpassfreq - a.lowpasswidth), r.lowpass1 < 0 && (r.lowpass1 = 0)) : r.lowpass1 = 2 * a.lowpassfreq, r.lowpass1 /= a.out_samplerate, r.lowpass2 /= a.out_samplerate) : (r.lowpass1 = 0, r.lowpass2 = 0), E(a), r.samplerate_index = R(a.out_samplerate, a), r.samplerate_index < 0) return a.internal_flags = null, -1;
                if (a.VBR == i.vbr_off) {
                    if (a.free_format) r.bitrate_index = 0;
                    else if (a.brate = M(a.brate, a.version, a.out_samplerate), r.bitrate_index = y(a.brate, a.version, a.out_samplerate), r.bitrate_index <= 0) return a.internal_flags = null, -1
                } else r.bitrate_index = 1;
                a.analysis && (a.bWriteVbrTag = !1), null != r.pinfo && (a.bWriteVbrTag = !1), U.init_bit_stream_w(r);
                for (var S = r.samplerate_index + 3 * a.version + 6 * (a.out_samplerate < 16e3 ? 1 : 0), x = 0; x < w.SBMAX_l + 1; x++) r.scalefac_band.l[x] = G.sfBandIndex[S].l[x];
                for (var x = 0; x < w.PSFB21 + 1; x++) {
                    var P = (r.scalefac_band.l[22] - r.scalefac_band.l[21]) / w.PSFB21,
                        I = r.scalefac_band.l[21] + x * P;
                    r.scalefac_band.psfb21[x] = I
                }
                r.scalefac_band.psfb21[w.PSFB21] = 576;
                for (var x = 0; x < w.SBMAX_s + 1; x++) r.scalefac_band.s[x] = G.sfBandIndex[S].s[x];
                for (var x = 0; x < w.PSFB12 + 1; x++) {
                    var P = (r.scalefac_band.s[13] - r.scalefac_band.s[12]) / w.PSFB12,
                        I = r.scalefac_band.s[12] + x * P;
                    r.scalefac_band.psfb12[x] = I
                }
                r.scalefac_band.psfb12[w.PSFB12] = 192, 1 == a.version ? r.sideinfo_len = 1 == r.channels_out ? 21 : 36 : r.sideinfo_len = 1 == r.channels_out ? 13 : 21, a.error_protection && (r.sideinfo_len += 2), k(a), r.Class_ID = $;
                var L;
                for (L = 0; 19 > L; L++) r.nsPsy.pefirbuf[L] = 700 * r.mode_gr * r.channels_out;
                switch (-1 == a.ATHtype && (a.ATHtype = 4), u(a.VBR_q <= 9), u(a.VBR_q >= 0), a.VBR) {
                    case i.vbr_mt:
                        a.VBR = i.vbr_mtrh;
                    case i.vbr_mtrh:
                        null == a.useTemporal && (a.useTemporal = !1), j.apply_preset(a, 500 - 10 * a.VBR_q, 0), a.quality < 0 && (a.quality = LAME_DEFAULT_QUALITY), a.quality < 5 && (a.quality = 0), a.quality > 5 && (a.quality = 5), r.PSY.mask_adjust = a.maskingadjust, r.PSY.mask_adjust_short = a.maskingadjust_short, a.experimentalY ? r.sfb21_extra = !1 : r.sfb21_extra = a.out_samplerate > 44e3, r.iteration_loop = new VBRNewIterationLoop(z);
                        break;
                    case i.vbr_rh:
                        j.apply_preset(a, 500 - 10 * a.VBR_q, 0), r.PSY.mask_adjust = a.maskingadjust, r.PSY.mask_adjust_short = a.maskingadjust_short, a.experimentalY ? r.sfb21_extra = !1 : r.sfb21_extra = a.out_samplerate > 44e3, a.quality > 6 && (a.quality = 6), a.quality < 0 && (a.quality = LAME_DEFAULT_QUALITY), r.iteration_loop = new VBROldIterationLoop(z);
                        break;
                    default:
                        var O;
                        r.sfb21_extra = !1, a.quality < 0 && (a.quality = LAME_DEFAULT_QUALITY), O = a.VBR, O == i.vbr_off && (a.VBR_mean_bitrate_kbps = a.brate), j.apply_preset(a, a.VBR_mean_bitrate_kbps, 0), a.VBR = O, r.PSY.mask_adjust = a.maskingadjust, r.PSY.mask_adjust_short = a.maskingadjust_short, O == i.vbr_off ? r.iteration_loop = new v(z) : r.iteration_loop = new ABRIterationLoop(z)
                }
                if (u(a.scale >= 0), a.VBR != i.vbr_off) {
                    if (r.VBR_min_bitrate = 1, r.VBR_max_bitrate = 14, a.out_samplerate < 16e3 && (r.VBR_max_bitrate = 8), 0 != a.VBR_min_bitrate_kbps && (a.VBR_min_bitrate_kbps = M(a.VBR_min_bitrate_kbps, a.version, a.out_samplerate), r.VBR_min_bitrate = y(a.VBR_min_bitrate_kbps, a.version, a.out_samplerate), r.VBR_min_bitrate < 0)) return -1;
                    if (0 != a.VBR_max_bitrate_kbps && (a.VBR_max_bitrate_kbps = M(a.VBR_max_bitrate_kbps, a.version, a.out_samplerate), r.VBR_max_bitrate = y(a.VBR_max_bitrate_kbps, a.version, a.out_samplerate), r.VBR_max_bitrate < 0)) return -1;
                    a.VBR_min_bitrate_kbps = g.bitrate_table[a.version][r.VBR_min_bitrate], a.VBR_max_bitrate_kbps = g.bitrate_table[a.version][r.VBR_max_bitrate], a.VBR_mean_bitrate_kbps = Math.min(g.bitrate_table[a.version][r.VBR_max_bitrate], a.VBR_mean_bitrate_kbps), a.VBR_mean_bitrate_kbps = Math.max(g.bitrate_table[a.version][r.VBR_min_bitrate], a.VBR_mean_bitrate_kbps)
                }
                return a.tune && (r.PSY.mask_adjust += a.tune_value_a, r.PSY.mask_adjust_short += a.tune_value_a), T(a), u(a.scale >= 0), a.athaa_type < 0 ? r.ATH.useAdjust = 3 : r.ATH.useAdjust = a.athaa_type, r.ATH.aaSensitivityP = Math.pow(10, a.athaa_sensitivity / -10), null == a.short_blocks && (a.short_blocks = o.short_block_allowed), a.short_blocks != o.short_block_allowed || a.mode != MPEGMode.JOINT_STEREO && a.mode != MPEGMode.STEREO || (a.short_blocks = o.short_block_coupled), a.quant_comp < 0 && (a.quant_comp = 1), a.quant_comp_short < 0 && (a.quant_comp_short = 0), a.msfix < 0 && (a.msfix = 0), a.exp_nspsytune = 1 | a.exp_nspsytune, a.internal_flags.nsPsy.attackthre < 0 && (a.internal_flags.nsPsy.attackthre = h.NSATTACKTHRE), a.internal_flags.nsPsy.attackthre_s < 0 && (a.internal_flags.nsPsy.attackthre_s = h.NSATTACKTHRE_S), u(a.scale >= 0), a.scale < 0 && (a.scale = 1), a.ATHtype < 0 && (a.ATHtype = 4), a.ATHcurve < 0 && (a.ATHcurve = 4), a.athaa_loudapprox < 0 && (a.athaa_loudapprox = 2), a.interChRatio < 0 && (a.interChRatio = 0), null == a.useTemporal && (a.useTemporal = !0), r.slot_lag = r.frac_SpF = 0, a.VBR == i.vbr_off && (r.slot_lag = r.frac_SpF = 72e3 * (a.version + 1) * a.brate % a.out_samplerate | 0), G.iteration_init(a), J.psymodel_init(a), u(a.scale >= 0), 0
            }, this.lame_encode_flush = function(e, t, a, r) {
                var n, s, i, o, _ = e.internal_flags,
                    l = f([2, 1152]),
                    u = 0,
                    h = _.mf_samples_to_encode - w.POSTDELAY,
                    c = P(e);
                if (_.mf_samples_to_encode < 1) return 0;
                for (n = 0, e.in_samplerate != e.out_samplerate && (h += 16 * e.out_samplerate / e.in_samplerate), i = e.framesize - h % e.framesize, 576 > i && (i += e.framesize), e.encoder_padding = i, o = (h + i) / e.framesize; o > 0 && u >= 0;) {
                    var p = c - _.mf_size,
                        b = e.frameNum;
                    p *= e.in_samplerate, p /= e.out_samplerate, p > 1152 && (p = 1152), 1 > p && (p = 1), s = r - n, 0 == r && (s = 0), u = this.lame_encode_buffer(e, l[0], l[1], p, t, a, s), a += u, n += u, o -= b != e.frameNum ? 1 : 0
                }
                if (_.mf_samples_to_encode = 0, 0 > u) return u;
                if (s = r - n, 0 == r && (s = 0), U.flush_bitstream(e), u = U.copy_buffer(_, t, a, s, 1), 0 > u) return u;
                if (a += u, n += u, s = r - n, 0 == r && (s = 0), e.write_id3tag_automatic) {
                    if (Q.id3tag_write_v1(e), u = U.copy_buffer(_, t, a, s, 0), 0 > u) return u;
                    n += u
                }
                return n
            }, this.lame_encode_buffer = function(e, t, a, r, n, s, i) {
                var o = e.internal_flags,
                    _ = [null, null];
                if (o.Class_ID != $) return -3;
                if (0 == r) return 0;
                x(o, r), _[0] = o.in_buffer_0, _[1] = o.in_buffer_1;
                for (var l = 0; r > l; l++) _[0][l] = t[l], o.channels_in > 1 && (_[1][l] = a[l]);
                return I(e, _[0], _[1], r, n, s, i)
            }
        }
        var n = a(157),
            s = n.System,
            i = n.VbrMode,
            o = (n.Float, n.ShortBlock),
            _ = (n.Util, n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float),
            l = (n.new_float_n, n.new_int, n.new_int_n),
            f = n.new_short_n,
            u = n.assert,
            h = a(306),
            c = a(80),
            p = a(175),
            b = a(183),
            m = a(110),
            v = a(33),
            d = a(208),
            g = a(340),
            w = a(10);
        e.exports = r
    },
    69: function(e, t) {
        var a = {}.toString;
        e.exports = Array.isArray || function(e) {
            return "[object Array]" == a.call(e)
        }
    },
    7: function(e, t) {
        var a;
        a = function() {
            return this
        }();
        try {
            a = a || Function("return this")() || (1, eval)("this")
        } catch (r) {
            "object" == typeof window && (a = window)
        }
        e.exports = a
    },
    80: function(e, t, a) {
        function r() {
            this.class_id = 0, this.num_samples = 0, this.num_channels = 0, this.in_samplerate = 0, this.out_samplerate = 0, this.scale = 0, this.scale_left = 0, this.scale_right = 0, this.analysis = !1, this.bWriteVbrTag = !1, this.decode_only = !1, this.quality = 0, this.mode = n.STEREO, this.force_ms = !1, this.free_format = !1, this.findReplayGain = !1, this.decode_on_the_fly = !1, this.write_id3tag_automatic = !1, this.brate = 0, this.compression_ratio = 0, this.copyright = 0, this.original = 0, this.extension = 0, this.emphasis = 0, this.error_protection = 0, this.strict_ISO = !1, this.disable_reservoir = !1, this.quant_comp = 0, this.quant_comp_short = 0, this.experimentalY = !1, this.experimentalZ = 0, this.exp_nspsytune = 0, this.preset = 0, this.VBR = null, this.VBR_q_frac = 0, this.VBR_q = 0, this.VBR_mean_bitrate_kbps = 0, this.VBR_min_bitrate_kbps = 0, this.VBR_max_bitrate_kbps = 0, this.VBR_hard_min = 0, this.lowpassfreq = 0, this.highpassfreq = 0, this.lowpasswidth = 0, this.highpasswidth = 0, this.maskingadjust = 0, this.maskingadjust_short = 0, this.ATHonly = !1, this.ATHshort = !1, this.noATH = !1, this.ATHtype = 0, this.ATHcurve = 0, this.ATHlower = 0, this.athaa_type = 0, this.athaa_loudapprox = 0, this.athaa_sensitivity = 0, this.short_blocks = null, this.useTemporal = !1, this.interChRatio = 0, this.msfix = 0, this.tune = !1, this.tune_value_a = 0, this.version = 0, this.encoder_delay = 0, this.encoder_padding = 0, this.framesize = 0, this.frameNum = 0, this.lame_allocated_gfp = 0, this.internal_flags = null
        }
        var n = a(160);
        e.exports = r
    },
    82: function(e, t, a) {
        function r() {
            function e(e, t, a, r, n, s) {
                for (; 0 != n--;) a[r] = 1e-10 + e[t + 0] * s[0] - a[r - 1] * s[1] + e[t - 1] * s[2] - a[r - 2] * s[3] + e[t - 2] * s[4] - a[r - 3] * s[5] + e[t - 3] * s[6] - a[r - 4] * s[7] + e[t - 4] * s[8] - a[r - 5] * s[9] + e[t - 5] * s[10] - a[r - 6] * s[11] + e[t - 6] * s[12] - a[r - 7] * s[13] + e[t - 7] * s[14] - a[r - 8] * s[15] + e[t - 8] * s[16] - a[r - 9] * s[17] + e[t - 9] * s[18] - a[r - 10] * s[19] + e[t - 10] * s[20], ++r, ++t
            }

            function t(e, t, a, r, n, s) {
                for (; 0 != n--;) a[r] = e[t + 0] * s[0] - a[r - 1] * s[1] + e[t - 1] * s[2] - a[r - 2] * s[3] + e[t - 2] * s[4], ++r, ++t
            }

            function a(e, t) {
                for (var a = 0; a < MAX_ORDER; a++) e.linprebuf[a] = e.lstepbuf[a] = e.loutbuf[a] = e.rinprebuf[a] = e.rstepbuf[a] = e.routbuf[a] = 0;
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
                return e.sampleWindow = 0 | (t * f + u - 1) / u, e.lsum = 0, e.rsum = 0, e.totsamp = 0, i.ill(e.A, 0), INIT_GAIN_ANALYSIS_OK
            }

            function n(e) {
                return e * e
            }

            function o(e, t) {
                var a, n = 0;
                for (a = 0; t > a; a++) n += e[a];
                if (0 == n) return GAIN_NOT_ENOUGH_SAMPLES;
                var s = 0 | Math.ceil(n * (1 - l));
                for (a = t; a-- > 0 && !((s -= e[a]) <= 0););
                return _ - a / r.STEPS_per_dB
            }
            var _ = 64.82,
                l = (r.YULE_ORDER, .95),
                f = (r.MAX_SAMP_FREQ, r.RMS_WINDOW_TIME_NUMERATOR),
                u = r.RMS_WINDOW_TIME_DENOMINATOR,
                h = (r.MAX_SAMPLES_PER_WINDOW, [
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
                c = [
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
            this.InitGainAnalysis = function(e, t) {
                return a(e, t) != INIT_GAIN_ANALYSIS_OK ? INIT_GAIN_ANALYSIS_ERROR : (e.linpre = MAX_ORDER, e.rinpre = MAX_ORDER, e.lstep = MAX_ORDER, e.rstep = MAX_ORDER, e.lout = MAX_ORDER, e.rout = MAX_ORDER, i.fill(e.B, 0), INIT_GAIN_ANALYSIS_OK)
            }, this.AnalyzeSamples = function(a, i, o, _, l, f, u) {
                var p, b, m, v, d, g, w;
                if (0 == f) return GAIN_ANALYSIS_OK;
                switch (w = 0, d = f, u) {
                    case 1:
                        _ = i, l = o;
                        break;
                    case 2:
                        break;
                    default:
                        return GAIN_ANALYSIS_ERROR
                }
                for (f < MAX_ORDER ? (s.arraycopy(i, o, a.linprebuf, MAX_ORDER, f), s.arraycopy(_, l, a.rinprebuf, MAX_ORDER, f)) : (s.arraycopy(i, o, a.linprebuf, MAX_ORDER, MAX_ORDER), s.arraycopy(_, l, a.rinprebuf, MAX_ORDER, MAX_ORDER)); d > 0;) {
                    g = d > a.sampleWindow - a.totsamp ? a.sampleWindow - a.totsamp : d, w < MAX_ORDER ? (p = a.linpre + w, b = a.linprebuf, m = a.rinpre + w, v = a.rinprebuf, g > MAX_ORDER - w && (g = MAX_ORDER - w)) : (p = o + w, b = i, m = l + w, v = _), e(b, p, a.lstepbuf, a.lstep + a.totsamp, g, h[a.reqindex]), e(v, m, a.rstepbuf, a.rstep + a.totsamp, g, h[a.reqindex]), t(a.lstepbuf, a.lstep + a.totsamp, a.loutbuf, a.lout + a.totsamp, g, c[a.reqindex]), t(a.rstepbuf, a.rstep + a.totsamp, a.routbuf, a.rout + a.totsamp, g, c[a.reqindex]), p = a.lout + a.totsamp, b = a.loutbuf, m = a.rout + a.totsamp, v = a.routbuf;
                    for (var S = g % 8; 0 != S--;) a.lsum += n(b[p++]), a.rsum += n(v[m++]);
                    for (S = g / 8; 0 != S--;) a.lsum += n(b[p + 0]) + n(b[p + 1]) + n(b[p + 2]) + n(b[p + 3]) + n(b[p + 4]) + n(b[p + 5]) + n(b[p + 6]) + n(b[p + 7]), p += 8, a.rsum += n(v[m + 0]) + n(v[m + 1]) + n(v[m + 2]) + n(v[m + 3]) + n(v[m + 4]) + n(v[m + 5]) + n(v[m + 6]) + n(v[m + 7]), m += 8;
                    if (d -= g, w += g, a.totsamp += g, a.totsamp == a.sampleWindow) {
                        var A = 10 * r.STEPS_per_dB * Math.log10((a.lsum + a.rsum) / a.totsamp * .5 + 1e-37),
                            R = 0 >= A ? 0 : 0 | A;
                        R >= a.A.length && (R = a.A.length - 1), a.A[R]++, a.lsum = a.rsum = 0, s.arraycopy(a.loutbuf, a.totsamp, a.loutbuf, 0, MAX_ORDER), s.arraycopy(a.routbuf, a.totsamp, a.routbuf, 0, MAX_ORDER), s.arraycopy(a.lstepbuf, a.totsamp, a.lstepbuf, 0, MAX_ORDER), s.arraycopy(a.rstepbuf, a.totsamp, a.rstepbuf, 0, MAX_ORDER), a.totsamp = 0
                    }
                    if (a.totsamp > a.sampleWindow) return GAIN_ANALYSIS_ERROR
                }
                return f < MAX_ORDER ? (s.arraycopy(a.linprebuf, f, a.linprebuf, 0, MAX_ORDER - f), s.arraycopy(a.rinprebuf, f, a.rinprebuf, 0, MAX_ORDER - f), s.arraycopy(i, o, a.linprebuf, MAX_ORDER - f, f), s.arraycopy(_, l, a.rinprebuf, MAX_ORDER - f, f)) : (s.arraycopy(i, o + f - MAX_ORDER, a.linprebuf, 0, MAX_ORDER), s.arraycopy(_, l + f - MAX_ORDER, a.rinprebuf, 0, MAX_ORDER)), GAIN_ANALYSIS_OK
            }, this.GetTitleGain = function(e) {
                for (var t = o(e.A, e.A.length), a = 0; a < e.A.length; a++) e.B[a] += e.A[a], e.A[a] = 0;
                for (var a = 0; a < MAX_ORDER; a++) e.linprebuf[a] = e.lstepbuf[a] = e.loutbuf[a] = e.rinprebuf[a] = e.rstepbuf[a] = e.routbuf[a] = 0;
                return e.totsamp = 0, e.lsum = e.rsum = 0, t
            }
        }
        var n = a(157),
            s = n.System,
            i = (n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays);
        n.new_array_n, n.new_byte, n.new_double, n.new_float, n.new_float_n, n.new_int, n.new_int_n, n.assert, r.STEPS_per_dB = 100, r.MAX_dB = 120, r.GAIN_NOT_ENOUGH_SAMPLES = -24601, r.GAIN_ANALYSIS_ERROR = 0, r.GAIN_ANALYSIS_OK = 1, r.INIT_GAIN_ANALYSIS_ERROR = 0, r.INIT_GAIN_ANALYSIS_OK = 1, r.YULE_ORDER = 10, r.MAX_ORDER = r.YULE_ORDER, r.MAX_SAMP_FREQ = 48e3, r.RMS_WINDOW_TIME_NUMERATOR = 1, r.RMS_WINDOW_TIME_DENOMINATOR = 20, r.MAX_SAMPLES_PER_WINDOW = r.MAX_SAMP_FREQ * r.RMS_WINDOW_TIME_NUMERATOR / r.RMS_WINDOW_TIME_DENOMINATOR + 1, e.exports = r
    },
    84: function(e, t, a) {
        function r() {
            function e(e) {
                return new Int32Array(e)
            }

            function t(e) {
                return new Float32Array(e)
            }
            this.xr = s(576), this.l3_enc = i(576), this.scalefac = i(o.SFBMAX), this.xrpow_max = 0, this.part2_3_length = 0, this.big_values = 0, this.count1 = 0, this.global_gain = 0, this.scalefac_compress = 0, this.block_type = 0, this.mixed_block_flag = 0, this.table_select = i(3), this.subblock_gain = i(4), this.region0_count = 0, this.region1_count = 0, this.preflag = 0, this.scalefac_scale = 0, this.count1table_select = 0, this.part2_length = 0, this.sfb_lmax = 0, this.sfb_smin = 0, this.psy_lmax = 0, this.sfbmax = 0, this.psymax = 0, this.sfbdivide = 0, this.width = i(o.SFBMAX), this.window = i(o.SFBMAX), this.count1bits = 0, this.sfb_partition_table = null, this.slen = i(4), this.max_nonzero_coeff = 0;
            var a = this;
            this.assign = function(r) {
                a.xr = t(r.xr), a.l3_enc = e(r.l3_enc), a.scalefac = e(r.scalefac), a.xrpow_max = r.xrpow_max, a.part2_3_length = r.part2_3_length, a.big_values = r.big_values, a.count1 = r.count1, a.global_gain = r.global_gain, a.scalefac_compress = r.scalefac_compress,
                    a.block_type = r.block_type, a.mixed_block_flag = r.mixed_block_flag, a.table_select = e(r.table_select), a.subblock_gain = e(r.subblock_gain), a.region0_count = r.region0_count, a.region1_count = r.region1_count, a.preflag = r.preflag, a.scalefac_scale = r.scalefac_scale, a.count1table_select = r.count1table_select, a.part2_length = r.part2_length, a.sfb_lmax = r.sfb_lmax, a.sfb_smin = r.sfb_smin, a.psy_lmax = r.psy_lmax, a.sfbmax = r.sfbmax, a.psymax = r.psymax, a.sfbdivide = r.sfbdivide, a.width = e(r.width), a.window = e(r.window), a.count1bits = r.count1bits, a.sfb_partition_table = r.sfb_partition_table.slice(0), a.slen = e(r.slen), a.max_nonzero_coeff = r.max_nonzero_coeff
            }
        }
        var n = a(157),
            s = (n.System, n.VbrMode, n.Float, n.ShortBlock, n.Util, n.Arrays, n.new_array_n, n.new_byte, n.new_double, n.new_float),
            i = (n.new_float_n, n.new_int),
            o = (n.new_int_n, n.assert, a(258));
        e.exports = r
    },
    89: function(e, t, a) {
        function r() {
            this.thm = new n, this.en = new n
        }
        var n = a(30);
        e.exports = r
    }
});