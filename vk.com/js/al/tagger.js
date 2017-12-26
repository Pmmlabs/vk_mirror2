function photoTagger(t, e) {
    if (t = ge(t), !t) return !1;
    var i, n, h, a, r, o, s, d, l, c, g = 0,
        f = t.parentNode,
        v = Math.abs,
        w = Math.min,
        p = Math.max,
        u = Math.floor,
        m = Math.ceil,
        y = (Math.round, function(t) {
            return 0 > t ? -1 : 1
        }),
        x = intval(e.zstart),
        E = intval(e.square),
        z = 0,
        N = intval(e.minw) || 30,
        S = intval(e.minh) || 30,
        C = intval(e.defw) || p(N, 100),
        M = intval(e.defh) || p(S, 100),
        T = vkImage(),
        b = E ? 1 : floatval(e.mina),
        A = E ? 1 : floatval(e.maxa);
    b > 0 && A > 0 && b > A && (A = b), t.src && (T.src = t.src);
    var _, I, L, X, Y, H, O, q, F = {},
        R = 0,
        W = 0,
        j = {},
        k = function(t, e) {
            j = extend(j, t), each(t, function(t) {
                var e = this + ("left" == t ? h : "top" == t ? a : 0);
                _.style[t] = e + "px"
            }), I.style.marginLeft = -t.left + "px", I.style.marginTop = -t.top + "px", each(F, function(e) {
                if (e.length < 2) "n" == e || "s" == e ? (this.style.left = h + t.left + intval(t.width / 2) - 5 + "px", this.style.top = a + t.top + ("n" == e ? 0 : t.height) - 5 + "px") : (this.style.left = h + t.left + ("w" == e ? 0 : t.width) - 5 + "px", this.style.top = a + t.top + intval(t.height / 2) - 5 + "px");
                else {
                    var i = e.charAt(0),
                        n = e.charAt(1);
                    this.style.left = h + t.left + ("w" == n ? 0 : t.width) - 5 + "px", this.style.top = a + t.top + ("n" == i ? 0 : t.height) - 5 + "px"
                }
            }), e || (r && (r.style.width = m(50 * R / t.width) + "px", r.style.height = m(50 * W / t.height) + "px", r.style.marginLeft = -u(50 * t.left / t.width) + "px", r.style.marginTop = -u(50 * t.top / t.width) + "px"), o && (o.style.width = m(100 * R / t.width) + "px", o.style.height = m(100 * W / t.height) + "px", o.style.marginLeft = -u(100 * t.left / t.width) + "px", o.style.marginTop = -u(100 * t.top / t.width) + "px"))
        },
        B = 0,
        D = function(t, e) {
            return [w(R, p(0, t - q[0])), w(W, p(0, e - q[1]))]
        },
        G = function() {
            var t = Math.max(intval(window.innerWidth), intval(document.documentElement.clientWidth)),
                e = Math.max(intval(window.innerHeight), intval(document.documentElement.clientHeight));
            s.style.width = t + "px", s.style.height = e + "px"
        },
        J = function(t) {
            t || (t = B);
            var e = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];
            switch (z) {
                case 1:
                    return e[(e.indexOf(t) + 2) % 8];
                case 2:
                    return e[(e.indexOf(t) + 4) % 8];
                case 3:
                    return e[(e.indexOf(t) + 6) % 8];
                default:
                    return t
            }
        },
        K = function(t) {
            B && (1 == B || B == r || B == o ? t = "move" : 2 == B ? t = "crosshair" : B.length && (t = J() + "-resize"), s.style.cursor = t)
        },
        P = function(t) {
            switch (z) {
                case 1:
                    return [q[0] + t.pageY - q[1] + u((R - W) / 2), q[1] - t.pageX + q[0] + u((R + W) / 2)];
                case 2:
                    return [q[0] + (q[0] + R - t.pageX), q[1] + (q[1] + W - t.pageY)];
                case 3:
                    return [q[0] - t.pageY + q[1] + u((R + W) / 2), q[1] + t.pageX - q[0] - u((R - W) / 2)];
                default:
                    return [t.pageX, t.pageY]
            }
        },
        Q = function(t) {
            var e = getXY(t);
            if (1 == z || 3 == z) {
                var i = (R - W) / 2;
                e = [e[0] - i, e[1] + i]
            }
            return e
        },
        U = function(i) {
            return q = Q(t), X = P(i), O = extend({}, j), d = l = c = !1, i.target == I ? B = 1 : i.target == L || i.target == t ? B = 2 : i.target == r || i.target == o ? (B = i.target, j.width && j.height || k({
                left: 0,
                top: 0,
                width: w(100, w(R, W)),
                height: w(100, w(R, W))
            })) : each(F, function(t) {
                if (i.target == this) {
                    B = t;
                    var e = X[0] - q[0],
                        n = X[1] - q[1],
                        h = [t.charAt(0), t.length > 1 ? t.charAt(1) : t.charAt(0)];
                    X[0] = j.left + ("w" == h[1] ? 0 : j.width), X[1] = j.top + ("n" == h[0] ? 0 : j.height), Y = X[0] - e, H = X[1] - n
                }
            }), B ? (e.onStart && e.onStart(), 2 != B && B != r && B != o && each(F, function() {
                setStyle(this, "opacity", .7)
            }), show(s), K(), removeEvent(t, "mousedown", U), addEvent(bodyNode, "mouseup dragend", Z), addEvent(bodyNode, "mousemove", V), cancelEvent(i)) : void 0
        },
        V = function(e) {
            if (window.getSelection) {
                var i = window.getSelection();
                i.removeAllRanges && i.removeAllRanges()
            }
            var n = P(e);
            if (1 == B) {
                var h = O.left + (n[0] - X[0]),
                    a = O.top + (n[1] - X[1]);
                h = w(R - j.width, p(0, h)), a = w(W - j.height, p(0, a)), k(extend(j, {
                    left: h,
                    top: a
                }))
            } else if (2 == B) v(n[0] - X[0]) > 3 && v(n[1] - X[1]) > 3 && (B = 3, K(), q = Q(t), X[0] -= q[0], X[1] -= q[1], show(_, L), each(F, function() {
                show(this), setStyle(this, "opacity", .7)
            }));
            else if (B == r || B == o) {
                var s = B == r ? 50 : 100,
                    h = O.left - u((n[0] - X[0]) * j.width / s),
                    a = O.top - u((n[1] - X[1]) * j.height / s);
                h = w(R - j.width, p(0, h)), a = w(W - j.height, p(0, a)), k(extend(j, {
                    left: h,
                    top: a
                }))
            } else if (B.length) {
                var d = D(n[0] + Y, n[1] + H);
                n[0] = d[0], n[1] = d[1];
                var l = n[0] - X[0],
                    c = n[1] - X[1];
                if (!l && !c) return cancelEvent(e);
                var h = j.left,
                    a = j.top,
                    g = j.width,
                    f = j.height,
                    x = 0,
                    E = 0;
                2 == B.length ? (x = "n" == B.charAt(0) ? -1 : 1, E = "w" == B.charAt(1) ? -1 : 1) : (x = "n" == B ? -1 : "s" == B ? 1 : 0, E = "w" == B ? -1 : "e" == B ? 1 : 0), x && f + y(x) * c < S / 2 && (x = -x, X[1] = j.top + (x > 0 ? j.height : 0), c = n[1] - X[1]), E && g + y(E) * l < N / 2 && (E = -E, X[0] = j.left + (E > 0 ? j.width : 0), l = n[0] - X[0]), vsign = x ? y(x) : 0, hsign = E ? y(E) : 0, b > 0 && g + hsign * l < (f + vsign * c) * b && (E ? l = hsign * m((f + vsign * c) * b - g) : c = vsign * u(g / b - f)), A > 0 && g + hsign * l > (f + vsign * c) * A && (x ? c = vsign * m((g + hsign * l) / A - f) : l = hsign * u(f * A - g)), x && (f += y(x) * c, S > f ? (a -= x > 0 ? 0 : S - f - c, f = S) : a += x > 0 ? 0 : c), E && (g += y(E) * l, N > g ? (h -= E > 0 ? 0 : N - g - l, g = N) : h += E > 0 ? 0 : l);
                var C = 0,
                    M = 0,
                    T = 0,
                    I = 0;
                0 > h ? (C = h, h = 0) : g > R - h && (C = R - h - g), C && (g += C, b > 0 && b * f > g && (I = u(g / b) - f, f += I, a -= x > 0 ? 0 : I)), 0 > a ? (M = a, a = 0) : f > W - a && (M = W - a - f), M && (f += M, A > 0 && g > A * f && (T = u(f * A) - g, g += T, h -= E > 0 ? 0 : T)), k({
                    left: h,
                    top: a,
                    width: g,
                    height: f
                }), X[0] = j.left + (E > 0 ? j.width : 0), X[1] = j.top + (x > 0 ? j.height : 0), x = x > 0 ? "s" : 0 > x ? "n" : "", E = E > 0 ? "e" : 0 > E ? "w" : "", B != x + E && (B = x + E, K())
            }
            return 3 == B && (n[0] -= q[0], n[1] -= q[1], n[0] = w(R, p(0, n[0])), n[1] = w(W, p(0, n[1])), K((y((X[0] - n[0]) * (X[1] - n[1]) * (.5 - z % 2)) > 0 ? "nw" : "ne") + "-resize"), k({
                left: X[0] > n[0] ? n[0] : X[0],
                top: X[1] > n[1] ? n[1] : X[1],
                width: v(X[0] - n[0]),
                height: v(X[1] - n[1])
            }, !0)), cancelEvent(e)
        },
        Z = function(h) {
            q = Q(t);
            var a, r = P(h);
            if (2 == B) {
                r[0] -= q[0], r[1] -= q[1];
                var o = w(R - C, p(0, r[0] - i)),
                    d = w(W - M, p(0, r[1] - n));
                k({
                    left: o,
                    top: d,
                    width: C,
                    height: M
                })
            } else if (3 == B) {
                r[0] -= q[0], r[1] -= q[1], r[0] > X[0] && (a = r[0], r[0] = X[0], X[0] = a), r[1] > X[1] && (a = r[1], r[1] = X[1], X[1] = a);
                var l = X[0] - r[0],
                    c = X[1] - r[1];
                if (r[0] < 0 && (l += r[0], r[0] = 0), r[1] < 0 && (c += r[1], r[1] = 0), l = w(l, R - r[0]), c = w(c, W - r[1]), b > 0 && c * b > l) {
                    var g, f, v = m(c * b) - l,
                        y = intval(v / 2);
                    r[0] -= y, l += v, g = r[0] < 0 ? r[0] : 0, r[0] -= g, r[0] + l + g > R && (g = R - l - r[0]), g && (f = u(g / b), l += g, r[1] -= intval(f / 2), c += f)
                } else if (A > 0 && l > c * A) {
                    var g, f, v = m(l / A) - c,
                        y = intval(v / 2);
                    r[1] -= y, c += v, f = r[1] < 0 ? r[1] : 0, r[1] -= f, r[1] + c + f > W && (f = W - c - r[1]), f && (g = u(f * A), c += f, r[0] -= intval(g / 2), l += g)
                }
                if (N > l) {
                    var v = N - l,
                        y = intval(v / 2);
                    r[0] -= y, l += v, r[0] = w(R - l, p(0, r[0]))
                }
                if (S > c) {
                    var v = S - c,
                        y = intval(v / 2);
                    r[1] -= y, c = S, r[1] = w(W - c, p(0, r[1]))
                }
                k({
                    left: r[0],
                    top: r[1],
                    width: l,
                    height: c
                })
            }
            return show(_, L), each(F, function() {
                fadeTo(this, 200, .3)
            }), hide(s), B = 0, removeEvent(bodyNode, "mousemove", V), removeEvent(bodyNode, "mouseup", Z), removeEvent(bodyNode, "dragend", Z), e.onFinish && e.onFinish(), cancelEvent(h)
        };
    return function() {
        if (R = T.width, W = T.height, !R || !W) return void(++g < 50 && setTimeout(arguments.callee, 100));
        var d = getSize(t);
        if (R = d[0], W = d[1], f.style.position = "relative", h = t.offsetLeft, a = t.offsetTop, C = w(R, C), i = intval(C / 2), M = w(W, M), n = intval(M / 2), N = w(N, C), S = w(S, M), b > 0 && S * b > N ? N = m(S * b) : A > 0 && N > S * A && (S = m(N / A)), E && (e.preview50 && (r = ge(e.preview50).appendChild(ce("img", {
                src: t.src
            })), addEvent(r, "mousedown", U)), e.preview100 && (o = ge(e.preview100).appendChild(ce("img", {
                src: t.src
            })), addEvent(o, "mousedown", U))), s = bodyNode.appendChild(ce("div", {
                className: "tag_bg fixed"
            })), addEvent(window, "resize", G), G(), t.style.zIndex = x + 20, _ = f.appendChild(ce("div", {
                className: "tag_frame",
                innerHTML: '<div class="tag_frame_inner"><img src="' + t.src + '" style="width: ' + R + "px; height: " + W + 'px;" /></div>'
            }, {
                cursor: "move",
                zIndex: x + 40,
                left: 0,
                top: 0
            })), I = geByTag1("img", _), L = f.appendChild(ce("div", {
                className: "tag_faded"
            }, {
                cursor: "crosshair",
                left: h,
                top: a,
                width: R,
                height: W,
                zIndex: x + 30
            })), each(["nw", "n", "ne", "w", "e", "sw", "s", "se"], function() {
                var t = this.toString();
                e.square && t.length < 2 || (F[t] = f.appendChild(ce("div", {
                    className: "tag_frame_handle " + t
                }, {
                    cursor: t + "-resize",
                    zIndex: x + 50
                })))
            }), addEvent(f, "mousedown", U), E && e.crop) {
            for (var l = e.crop.split(","), c = 0; 3 > c; ++c) l[c] = intval(l[c]);
            l[2] < N && (l[2] = N), e.rect = {
                left: l[0],
                top: l[1],
                width: l[2],
                height: l[2]
            }
        }
        e.rect ? (k(e.rect), show(L, _), each(F, function() {
            show(this)
        })) : (t.style.cursor = "crosshair", addEvent(t, "mousedown", U))
    }(), {
        destroy: function() {
            cleanElems(f, t, _, L, r, o), bodyNode.removeChild(s), f.removeChild(_), f.removeChild(L), each(["nw", "n", "ne", "w", "e", "sw", "s", "se"], function() {
                var t = this.toString();
                F[t] && f.removeChild(F[t])
            }), setStyle(t, {
                cursor: "",
                zIndex: ""
            }), removeEvent(t, "mousedown", U), removeEvent(window, "resize", G), each(F, function() {
                cleanElems(this)
            })
        },
        reset: function() {
            j = {}, hide(L, _), each(F, function() {
                hide(this)
            }), t.style.cursor = "crosshair", removeEvent(t, "mousedown", U), addEvent(t, "mousedown", U)
        },
        resize: function(e, r) {
            d || (d = R, l = W, c = clone(j));
            var o = e / d,
                s = r / l;
            R = e, W = r, C = w(R, C), i = intval(C / 2), M = w(W, M), n = intval(M / 2), N = w(N, C), S = w(S, M), b > 0 && S * b > N ? N = m(S * b) : A > 0 && N > S * A && (S = m(N / A)), h = t.offsetLeft, a = t.offsetTop, setStyle(L, {
                left: h,
                top: a,
                width: e,
                height: r
            }), setStyle(I, {
                width: e,
                height: r
            }), j.width && (j.left = u(o * c.left), j.width = u(o * c.width), j.top = u(s * c.top), j.height = u(s * c.height), j.width < N && (j.width = N), j.height < S && (j.height = S), k(j))
        },
        rotate: function(t) {
            if (t % 2) {
                var e = b;
                b = 1 / A, A = 1 / e, e = N, N = S, S = e, j.width && (j.width < N && (j.left = p(0, j.left - u((N - j.width) / 2)), j.width = N), j.height < S && (j.top = p(0, j.top - u((S - j.height) / 2)), j.height = S), j.width < j.height * b && (j.height = u(j.width / b)), j.width > j.height * A && (j.width = u(j.height * A)), k(j))
            }
            z = (z + t) % 4, each(F, function(t) {
                this.style.cursor = J(t) + "-resize"
            })
        },
        result: function() {
            var t = R,
                e = W;
            switch (z) {
                case 1:
                    return [e - j.top - j.height, j.left, j.height, j.width];
                case 2:
                    return [t - j.left - j.width, e - j.top - j.height, j.width, j.height];
                case 3:
                    return [j.top, t - j.left - j.width, j.height, j.width];
                default:
                    return [j.left, j.top, j.width, j.height]
            }
        }
    }
}
try {
    stManager.done("tagger.js")
} catch (e) {}