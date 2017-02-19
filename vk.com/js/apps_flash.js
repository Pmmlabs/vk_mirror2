/*
 * easyXDM
 * http://easyxdm.net/
 * Copyright(c) 2009, Øyvind Sean Kinsey, oyvind@kinsey.no.
 *
 * MIT Licensed - http://easyxdm.net/license/mit.txt
 *
 */
(function(i, s, c, d, n, b) {
    var r = 0;
    var w = /^(http.?:\/\/([^\/\s]+))/,
        x = /[\-\w]+\/\.\.\//,
        l = /([^:])\/\//g;

    function k(B, D) {
        var C = typeof B[D];
        return C == "function" || (!!(C == "object" && B[D])) || C == "unknown"
    }

    function h(B, C) {
        return !!(typeof(B[C]) == "object" && B[C])
    }
    var m = (function() {
        if (k(i, "addEventListener")) {
            return function(D, B, C) {
                D.addEventListener(B, C, false)
            }
        } else {
            return function(B, D, C) {
                B.attachEvent("on" + D, C)
            }
        }
    }());
    var o = (function() {
        if (k(i, "removeEventListener")) {
            return function(E, C, D, B) {
                E.removeEventListener(C, D, B)
            }
        } else {
            return function(B, D, C) {
                B.detachEvent("on" + D, C)
            }
        }
    }());

    function u(B) {
        return B.match(w)[2]
    }

    function A(B) {
        return B.match(w)[1]
    }

    function e(B) {
        B = B.replace(l, "$1/");
        if (!B.match(/^(http||https):\/\//)) {
            var C = (B.substring(0, 1) === "/") ? "" : c.pathname;
            if (C.substring(C.length - 1) !== "/") {
                C = C.substring(0, C.lastIndexOf("/") + 1)
            }
            B = c.protocol + "//" + c.host + C + B
        }
        while (x.test(B)) {
            B = B.replace(x, "")
        }
        return B
    }

    function j(B, D) {
        var E = [];
        for (var C in D) {
            if (D.hasOwnProperty(C)) {
                E.push(C + "=" + D[C])
            }
        }
        return B + ((B.indexOf("?") === -1) ? "?" : "&") + E.join("&")
    }
    var p = (function() {
        var E = {},
            F, D = c.search.substring(1).split("&"),
            C = D.length;
        while (C--) {
            F = D[C].split("=");
            E[F[0]] = F[1]
        }
        if (i.parent) {
            var B = i.name.replace(/\<#>/g, ":").split(",");
            E.xdm_e = B[1];
            E.xdm_c = B[2];
            E.xdm_p = B[3];
            if (B[4] != null) {
                E.xdm_s = B[4]
            }
        }
        return E
    }());

    function f(B) {
        return typeof B === "undefined"
    }

    function y() {
        var C = {};
        var D = {
                a: [1, 2, 3]
            },
            B = '{"a":[1,2,3]}';
        if (JSON && typeof JSON.stringify === "function" && JSON.stringify(D).replace((/\s/g), "") === B) {
            return JSON
        }
        if (Object.toJSON) {
            if (Object.toJSON(D).replace((/\s/g), "") === B) {
                C.stringify = Object.toJSON
            }
        }
        if (typeof String.prototype.evalJSON === "function") {
            D = B.evalJSON();
            if (D.a && D.a.length === 3 && D.a[2] === 3) {
                C.parse = function(E) {
                    return E.evalJSON()
                }
            }
        }
        if (C.stringify && C.parse) {
            y = function() {
                return C
            };
            return C
        }
        return null
    }

    function t(E, C, D) {
        if (!C) {
            return
        }
        for (var B in C) {
            if (C.hasOwnProperty(B) && (!D || !E[B])) {
                E[B] = C[B]
            }
        }
    }

    function z(C, B, E, G) {
        var F;
        if (G != null && G.name) {
            G.name = G.name.replace(/:/g, "<#>");
            if (!/opera/i.test(navigator.userAgent.toLowerCase()) && (/msie [67]/i.test(navigator.userAgent.toLowerCase()))) {
                F = s.createElement('<IFRAME NAME="' + G.name + '">')
            } else {
                F = s.createElement("IFRAME");
                F.name = G.name
            }
        } else {
            F = s.createElement("IFRAME")
        }
        for (var D in G) {
            F.setAttribute(D, G[D])
        }
        F.src = C;
        if (E) {
            F.loadFn = function() {
                E(F.contentWindow)
            };
            m(F, "load", F.loadFn)
        }
        if (B) {
            F.border = F.frameBorder = 0;
            B.appendChild(F)
        } else {
            F.style.position = "absolute";
            F.style.left = "-2000px";
            F.style.top = "0px";
            s.body.appendChild(F)
        }
        return F
    }
    var a = (function() {
        if (k(i, "XMLHttpRequest")) {
            return function() {
                return new XMLHttpRequest()
            }
        } else {
            var B = (function() {
                var D = ["Microsoft", "Msxml2", "Msxml3"],
                    C = D.length;
                while (C--) {
                    try {
                        B = D[C] + ".XMLHTTP";
                        var F = new ActiveXObject(B);
                        return B
                    } catch (E) {}
                }
            }());
            return function() {
                return new ActiveXObject(B)
            }
        }
    }());

    function q(I, C, G, H, B) {
        if (!B) {
            B = function() {}
        }
        var E = a(),
            F = [];
        E.open(I, C, true);
        E.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        E.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        E.onreadystatechange = function() {
            if (E.readyState == 4) {
                if (E.status >= 200 && E.status < 300) {
                    H(y().parse(E.responseText))
                } else {
                    B("An error occured. Status code: " + E.status)
                }
                E.onreadystatechange = null;
                delete E.onreadystatechange
            }
        };
        if (G) {
            for (var D in G) {
                if (G.hasOwnProperty(D)) {
                    F.push(D + "=" + b(G[D]))
                }
            }
        }
        E.send(F.join("&"))
    }

    function g(D) {
        var I = D.protocol,
            C;
        D.isHost = D.isHost || f(p.xdm_p);
        if (!D.isHost) {
            D.channel = p.xdm_c;
            D.secret = p.xdm_s;
            D.remote = n(p.xdm_e);
            I = p.xdm_p
        } else {
            D.remote = e(D.remote);
            D.channel = D.channel || "default" + r++;
            D.secret = Math.random().toString(16).substring(2);
            if (f(I)) {
                if (k(i, "postMessage")) {
                    I = "1"
                } else {
                    if (k(i, "ActiveXObject") && k(i, "execScript")) {
                        I = "3"
                    } else {
                        if (D.remoteHelper) {
                            D.remoteHelper = e(D.remoteHelper);
                            I = "2"
                        } else {
                            I = "0"
                        }
                    }
                }
            }
        }
        switch (I) {
            case "0":
                t(D, {
                    interval: 300,
                    delay: 2000,
                    useResize: true,
                    useParent: false,
                    usePolling: false
                }, true);
                if (D.isHost) {
                    if (!D.local) {
                        var G = c.protocol + "//" + c.host,
                            B = s.body.getElementsByTagName("img"),
                            E = B.length,
                            H;
                        while (E--) {
                            H = B[E];
                            if (H.src.substring(0, G.length) === G) {
                                D.local = H.src;
                                break
                            }
                        }
                        if (!D.local) {
                            D.local = i
                        }
                    }
                    var F = {
                        xdm_c: D.channel,
                        xdm_p: 0
                    };
                    if (D.local === i) {
                        D.usePolling = true;
                        D.useParent = true;
                        D.local = c.protocol + "//" + c.host + c.pathname + c.search;
                        F.xdm_e = b(D.local);
                        F.xdm_pa = 1
                    } else {
                        F.xdm_e = e(D.local)
                    }
                    if (D.container) {
                        D.useResize = false;
                        F.xdm_po = 1
                    }
                    D.remote = j(D.remote, F)
                } else {
                    t(D, {
                        channel: p.xdm_c,
                        remote: n(p.xdm_e),
                        useParent: !f(p.xdm_pa),
                        usePolling: !f(p.xdm_po),
                        useResize: D.useParent ? false : D.useResize
                    })
                }
                C = [new easyXDM.stack.HashTransport(D), new easyXDM.stack.ReliableBehavior({
                    timeout: ((D.useResize ? 50 : D.interval * 1.5) + (D.usePolling ? D.interval * 1.5 : 50))
                }), new easyXDM.stack.QueueBehavior({
                    encode: true,
                    maxLength: 4000 - D.remote.length
                }), new easyXDM.stack.VerifyBehavior({
                    initiate: D.isHost
                })];
                break;
            case "1":
                C = [new easyXDM.stack.PostMessageTransport(D)];
                break;
            case "2":
                C = [new easyXDM.stack.NameTransport(D), new easyXDM.stack.QueueBehavior(), new easyXDM.stack.VerifyBehavior({
                    initiate: D.isHost
                })];
                break;
            case "3":
                C = [new easyXDM.stack.NixTransport(D)];
                break
        }
        return C
    }

    function v(E) {
        var F, D = {
            incoming: function(H, G) {
                this.up.incoming(H, G)
            },
            outgoing: function(G, H) {
                this.down.outgoing(G, H)
            },
            callback: function(G) {
                this.up.callback(G)
            },
            init: function() {
                this.down.init()
            },
            destroy: function() {
                this.down.destroy()
            }
        };
        for (var C = 0, B = E.length; C < B; C++) {
            F = E[C];
            t(F, D, true);
            if (C !== 0) {
                F.down = E[C - 1]
            }
            if (C !== B - 1) {
                F.up = E[C + 1]
            }
        }
        return F
    }
    easyXDM = {
        version: "2.3.1.85",
        apply: t,
        ajax: q,
        getJSONObject: y,
        stack: {}
    };
    easyXDM.DomHelper = {
        on: m,
        un: o,
        requiresJSON: function(B) {
            if (!h(i, "JSON")) {
                s.write('<script type="text/javascript" src="' + B + '"><\/script>')
            }
        }
    };
    (function() {
        var B = {};
        easyXDM.Fn = {
            set: function(C, D) {
                B[C] = D
            },
            get: function(D, C) {
                var E = B[D];
                if (C) {
                    delete B[D]
                }
                return E
            }
        }
    }());
    easyXDM.Socket = function(C) {
        var B = v(g(C).concat([{
                incoming: function(F, E) {
                    C.onMessage(F, E)
                },
                callback: function(E) {
                    if (C.onReady) {
                        C.onReady(E)
                    }
                }
            }])),
            D = A(C.remote);
        this.destroy = function() {
            B.destroy()
        };
        this.postMessage = function(E) {
            B.outgoing(E, D)
        };
        B.init()
    };
    easyXDM.Rpc = function(D, C) {
        if (C.local) {
            for (var F in C.local) {
                if (C.local.hasOwnProperty(F)) {
                    var E = C.local[F];
                    if (typeof E === "function") {
                        C.local[F] = {
                            method: E
                        }
                    }
                }
            }
        }
        var B = v(g(D).concat([new easyXDM.stack.RpcBehavior(this, C), {
            callback: function(G) {
                if (D.onReady) {
                    D.onReady(G)
                }
            }
        }]));
        this.destroy = function() {
            B.destroy()
        };
        B.init()
    };
    easyXDM.stack.PostMessageTransport = function(E) {
        var G, H, C, D;

        function B(I) {
            if (I.origin) {
                return I.origin
            }
            if (I.uri) {
                return A(I.uri)
            }
            if (I.domain) {
                return c.protocol + "//" + I.domain
            }
            throw "Unable to retrieve the origin of the event"
        }

        function F(J) {
            var I = B(J);
            if (J.data.substring(0, E.channel.length + 1) == E.channel + " ") {
                G.up.incoming(J.data.substring(E.channel.length + 1), I)
            }
        }
        return (G = {
            outgoing: function(I, J) {
                C.postMessage(E.channel + " " + I, J || D)
            },
            destroy: function() {
                o(i, "message", F);
                if (H) {
                    C = null;
                    H.parentNode.removeChild(H);
                    H = null
                }
            },
            init: function() {
                D = A(E.remote);
                var J = D.indexOf("?");
                if (J > 0) {
                    D = D.substr(0, J)
                }
                if (E.isHost) {
                    o(i, "message", F);
                    m(i, "message", function I(K) {
                        if (K.data == E.channel + "-ready") {
                            C = H.contentWindow;
                            o(i, "message", I);
                            o(i, "message", F);
                            m(i, "message", F);
                            d(function() {
                                G.up.callback(true)
                            }, 0)
                        }
                    });
                    if (!E.prop) {
                        E.prop = {}
                    }
                    E.prop.name = E.prop.name + "," + c.protocol + "//" + c.host + "," + E.channel + ",1";
                    H = z(E.remote, E.container, null, E.prop)
                } else {
                    m(i, "message", F);
                    C = i.parent;
                    C.postMessage(E.channel + "-ready", D);
                    d(function() {
                        G.up.callback(true)
                    }, 0)
                }
            }
        })
    };
    easyXDM.stack.NixTransport = function(C) {
        var E, G, F, B, D;
        return (E = {
            outgoing: function(H, I) {
                F(H)
            },
            destroy: function() {
                if (G) {
                    D = null;
                    G.parentNode.removeChild(G);
                    G = null
                }
            },
            init: function() {
                B = A(C.remote);
                if (C.isHost) {
                    try {
                        if (!k(i, "GetNixProxy")) {
                            i.execScript("Class NixProxy\n    Private m_parent, m_child, m_Auth\n\n    Public Sub SetParent(obj, auth)\n        If isEmpty(m_Auth) Then m_Auth = auth\n        SET m_parent = obj\n    End Sub\n    Public Sub SetChild(obj)\n        SET m_child = obj\n        m_parent.ready()\n    End Sub\n\n    Public Sub SendToParent(data, auth)\n        If m_Auth = auth Then m_parent.send(CStr(data))\n    End Sub\n    Public Sub SendToChild(data, auth)\n        If m_Auth = auth Then m_child.send(CStr(data))\n    End Sub\nEnd Class\nFunction GetNixProxy()\n    Set GetNixProxy = New NixProxy\nEnd Function\n", "vbscript")
                        }
                        D = GetNixProxy();
                        D.SetParent({
                            send: function(I) {
                                E.up.incoming(I, B)
                            },
                            ready: function() {
                                d(function() {
                                    E.up.callback(true)
                                }, 0)
                            }
                        }, C.secret);
                        F = function(I) {
                            D.SendToChild(I, C.secret)
                        }
                    } catch (H) {
                        throw new Error("Could not set up VBScript NixProxy:" + H.message)
                    }
                    if (!C.prop) {
                        C.prop = {}
                    }
                    C.prop.name = C.prop.name + "," + c.protocol + "//" + c.host + "," + C.channel + ",3," + C.secret;
                    G = z(C.remote, C.container, null, C.prop);
                    G.contentWindow.opener = D
                } else {
                    D = i.opener;
                    D.SetChild({
                        send: function(I) {
                            E.up.incoming(I, B)
                        }
                    });
                    F = function(I) {
                        D.SendToParent(I, C.secret)
                    };
                    d(function() {
                        E.up.callback(true)
                    }, 0)
                }
            }
        })
    };
    easyXDM.stack.NameTransport = function(F) {
        var G;
        var I, M, E, K, L, C, B;

        function J(P) {
            var O = F.remoteHelper + (I ? ("#_3" + b(B + "#" + F.channel)) : ("#_2" + F.channel));
            M.contentWindow.sendMessage(P, O)
        }

        function H() {
            if (I) {
                if (++K === 2 || !I) {
                    G.up.callback(true)
                }
            } else {
                J("ready");
                G.up.callback(true)
            }
        }

        function N(O) {
            G.up.incoming(O, C)
        }

        function D() {
            if (L) {
                d(function() {
                    L(true)
                }, 0)
            }
        }
        return (G = {
            outgoing: function(P, Q, O) {
                L = O;
                J(P)
            },
            destroy: function() {
                M.parentNode.removeChild(M);
                M = null;
                if (I) {
                    E.parentNode.removeChild(E);
                    E = null
                }
            },
            init: function() {
                I = F.isHost;
                K = 0;
                C = A(F.remote);
                F.local = e(F.local);
                if (I) {
                    easyXDM.Fn.set(F.channel, function(O) {
                        if (I && O === "ready") {
                            easyXDM.Fn.set(F.channel, N);
                            H()
                        }
                    });
                    if (!F.prop) {
                        F.prop = {}
                    }
                    F.prop.name = F.prop.name + "," + F.local + "," + F.channel + ",2";
                    E = z(F.remote + "#" + F.channel, F.container, null, F.prop)
                } else {
                    F.remoteHelper = F.remote;
                    easyXDM.Fn.set(F.channel, N)
                }
                M = z(F.local + "#_4" + F.channel, null, function() {
                    o(M, "load", M.loadFn);
                    easyXDM.Fn.set(F.channel + "_load", D);
                    H()
                })
            }
        })
    };
    easyXDM.stack.HashTransport = function(S) {
        var Q;
        var T = this,
            N, C, B, M, E, J, P;
        var G, L, D, H;

        function F(V) {
            if (!P) {
                return
            }
            var U = S.remote + "#" + (E++) + "_" + V;
            if (N || !L) {
                P.contentWindow.location = U;
                if (D) {
                    P.width = P.width > 75 ? 50 : 100
                }
            } else {
                P.location = U
            }
        }

        function R(U) {
            M = U;
            Q.up.incoming(M.substring(M.indexOf("_") + 1), H)
        }

        function I() {
            R(J.location.hash)
        }

        function O() {
            if (J.location.hash && J.location.hash != M) {
                R(J.location.hash)
            }
        }

        function K() {
            if (G) {
                C = setInterval(O, B)
            } else {
                m(J, "resize", I)
            }
        }
        return (Q = {
            outgoing: function(U, V) {
                F(U)
            },
            destroy: function() {
                if (G) {
                    i.clearInterval(C)
                } else {
                    if (J) {
                        o(J, "resize", O)
                    }
                }
                if (N || !L) {
                    P.parentNode.removeChild(P)
                }
                P = null
            },
            init: function() {
                N = S.isHost;
                B = S.interval;
                M = "#" + S.channel;
                E = 0;
                G = S.usePolling;
                L = S.useParent;
                D = S.useResize;
                H = A(S.remote);
                if (!N && L) {
                    J = i;
                    P = parent;
                    K();
                    Q.up.callback(true)
                } else {
                    if (!S.prop) {
                        S.prop = {}
                    }
                    S.prop.name = (N ? "local_" : "remote_") + S.channel;
                    S.prop.name = S.prop.name + "," + c.protocol + "//" + c.host + "," + S.channel + ",1";
                    P = z((N ? S.remote : S.remote + "#" + S.channel), S.container, (N && L || !N) ? function() {
                        J = i;
                        K();
                        Q.up.callback(true)
                    } : null, S.prop);
                    if (N && !L) {
                        var W = 0,
                            U = S.delay / 50;
                        (function V() {
                            if (++W > U) {
                                throw new Error("Unable to reference listenerwindow")
                            }
                            if (J) {
                                return
                            }
                            try {
                                J = P.contentWindow.frames["remote_" + S.channel];
                                i.clearTimeout(C);
                                K();
                                Q.up.callback(true);
                                return
                            } catch (X) {
                                d(V, 50)
                            }
                        }())
                    }
                }
            }
        })
    };
    easyXDM.stack.ReliableBehavior = function(D) {
        var E, B, I, G, K = 0,
            F = 0,
            H = D.tries || 5,
            J = D.timeout,
            C = 0,
            L;
        return (E = {
            incoming: function(O, M) {
                var N = O.indexOf("_"),
                    Q = parseInt(O.substring(0, N), 10),
                    P;
                O = O.substring(N + 1);
                N = O.indexOf("_");
                P = parseInt(O.substring(0, N), 10);
                N = O.indexOf("_");
                O = O.substring(N + 1);
                if (B && Q === K) {
                    i.clearTimeout(B);
                    B = null;
                    if (L) {
                        d(function() {
                            L(true)
                        }, 0)
                    }
                }
                if (P !== 0) {
                    if (P !== C) {
                        C = P;
                        O = O.substring(P.length + 1);
                        E.down.outgoing(P + "_0_ack", M);
                        d(function() {
                            E.up.incoming(O, M)
                        }, D.timeout / 2)
                    } else {
                        E.down.outgoing(P + "_0_ack", M)
                    }
                }
            },
            outgoing: function(O, M, N) {
                L = N;
                F = 0;
                I = {
                    data: C + "_" + (++K) + "_" + O,
                    origin: M
                };
                (function P() {
                    B = null;
                    if (++F > H) {
                        if (L) {
                            d(function() {
                                L(false)
                            }, 0)
                        }
                    } else {
                        E.down.outgoing(I.data, I.origin);
                        B = d(P, D.timeout)
                    }
                }())
            },
            destroy: function() {
                if (B) {
                    i.clearInterval(B)
                }
                E.down.destroy()
            }
        })
    };
    easyXDM.stack.QueueBehavior = function(C) {
        var E, F = [],
            J = false,
            D = "",
            I, B = (C) ? C.maxLength : 0,
            G = (C) ? (C.encode || false) : false;

        function H() {
            if (J || F.length === 0 || I) {
                return
            }
            J = true;
            var K = F.shift();
            E.down.outgoing(K.data, K.origin, function(L) {
                J = false;
                if (K.callback) {
                    d(function() {
                        K.callback(L)
                    }, 0)
                }
                H()
            })
        }
        return (E = {
            incoming: function(N, L) {
                var M = N.indexOf("_"),
                    K = parseInt(N.substring(0, M), 10);
                D += N.substring(M + 1);
                if (K === 0) {
                    if (G) {
                        D = n(D)
                    }
                    E.up.incoming(D, L);
                    D = ""
                }
            },
            outgoing: function(O, L, N) {
                if (G) {
                    O = b(O)
                }
                var K = [],
                    M;
                if (B) {
                    while (O.length !== 0) {
                        M = O.substring(0, B);
                        O = O.substring(M.length);
                        K.push(M)
                    }
                } else {
                    K.push(O)
                }
                while ((M = K.shift())) {
                    F.push({
                        data: K.length + "_" + M,
                        origin: L,
                        callback: K.length === 0 ? N : null
                    })
                }
                H()
            },
            destroy: function() {
                I = true;
                E.down.destroy()
            }
        })
    };
    easyXDM.stack.VerifyBehavior = function(F) {
        var G, E, C, D = false;

        function B() {
            E = Math.random().toString(16).substring(2);
            G.down.outgoing(E)
        }
        return (G = {
            incoming: function(J, H) {
                var I = J.indexOf("_");
                if (I === -1) {
                    if (J === E) {
                        G.up.callback(true)
                    } else {
                        if (!C) {
                            C = J;
                            if (!F.initiate) {
                                B()
                            }
                            G.down.outgoing(J)
                        }
                    }
                } else {
                    if (J.substring(0, I) === C) {
                        G.up.incoming(J.substring(I + 1), H)
                    }
                }
            },
            outgoing: function(J, H, I) {
                G.down.outgoing(E + "_" + J, H, I)
            },
            callback: function(H) {
                if (F.initiate) {
                    B()
                }
            }
        })
    };
    easyXDM.stack.RpcBehavior = function(I, C) {
        var E, K = C.serializer || y();
        var J = 0,
            H = {};

        function B(L) {
            L.jsonrpc = "2.0";
            E.down.outgoing(K.stringify(L))
        }

        function F() {}

        function G(L, N) {
            var M = Array.prototype.slice;
            return function() {
                var O = arguments.length,
                    Q, P = {
                        method: N
                    };
                if (O > 0 && typeof arguments[O - 1] === "function") {
                    if (O > 1 && typeof arguments[O - 2] === "function") {
                        Q = {
                            success: arguments[O - 2],
                            error: arguments[O - 1]
                        };
                        P.params = M.call(arguments, 0, O - 2)
                    } else {
                        Q = {
                            success: arguments[O - 1]
                        };
                        P.params = M.call(arguments, 0, O - 1)
                    }
                    H["" + (++J)] = Q;
                    P.id = J
                } else {
                    P.params = M.call(arguments, 0)
                }
                B(P)
            }
        }

        function D(L, N, Q, O) {
            if (!Q) {
                if (N) {
                    B({
                        id: N,
                        error: {
                            code: -32601,
                            message: "Procedure not found."
                        }
                    })
                }
                return
            }
            var S = false,
                R, P;
            if (N) {
                R = function(U) {
                    if (S) {
                        return
                    }
                    S = true;
                    B({
                        id: N,
                        result: U
                    })
                };
                P = function(U) {
                    if (S) {
                        return
                    }
                    S = true;
                    B({
                        id: N,
                        error: {
                            code: -32099,
                            message: "Application error: " + U
                        }
                    })
                }
            } else {
                R = P = F
            }
            try {
                var T = Q.method.apply(Q.scope, O.concat([R, P]));
                if (!f(T)) {
                    R(T)
                }
            } catch (M) {
                P(M.message)
            }
        }
        return (E = {
            incoming: function(M, L) {
                var N = K.parse(M);
                if (N.method) {
                    if (C.handle) {
                        C.handle(N, B)
                    } else {
                        D(N.method, N.id, C.local[N.method], N.params)
                    }
                } else {
                    var O = H[N.id];
                    if (N.result && O && O.success) {
                        if (typeof(O.success) != "undefined") {
                            O.success(N.result)
                        }
                    } else {
                        if (N.error) {
                            if (O.error) {
                                O.error(N.error)
                            }
                        }
                    }
                    delete H[N.id]
                }
            },
            init: function() {
                if (C.remote) {
                    for (var L in C.remote) {
                        if (C.remote.hasOwnProperty(L)) {
                            I[L] = G(C.remote[L], L)
                        }
                    }
                }
                E.down.init()
            },
            destroy: function() {
                for (var L in C.remote) {
                    if (C.remote.hasOwnProperty(L) && I.hasOwnProperty(L)) {
                        delete I[L]
                    }
                }
                E.down.destroy()
            }
        })
    }
})(window, document, location, window.setTimeout, decodeURIComponent, encodeURIComponent);

easyXDM.DomHelper.requiresJSON('http://vk.com/js/lib/json2.js');

window.onMd5Load = [];

function showAddStatusBox() {
    if (!settingsBox) {
        settingsBox = new MessageBox({
            title: apps_app_settings,
            progress: 'settingsProgress'
        });
    }
    settingsBox.removeButtons();
    settingsBox.addButton({
        label: box_close,
        onClick: function() {
            settingsBox.hide(200);
        }
    });
    settingsBox.loadContent('apps.php?act=a_load_settings', {
        id: appId,
        mask: settings,
        main: main ? 1 : 0
    }, true).show();
}

var Api = {
    api_id: null,
    viewer_id: null,
    sid: null,
    secret: null,
    checkMethod: function(method, params, callback) {
        var m = method.toLowerCase();
        if (m == 'wall.post' || m == 'activity.set') {
            showWallPrePost(Api.api_id, params[m == 'wall.post' ? 'message' : 'text'], params['attachment'], params['owner_id'], function(hash, error) {
                if (error) {
                    if (callback)
                        callback({
                            error: error
                        });
                } else {
                    Api.call(method, extend(params, {
                        method_access: hash
                    }), callback);
                }
            });
            return false;
        }
        return true;
    },
    checkMethodResult: function(method, params, data, callback) {
        switch (method) {
            case 'photos.saveProfilePhoto':
                if (!data.error) {
                    window.profilePhotoBoxCallback = function(success) {
                        if (success) {
                            callback({
                                response: {
                                    'photo_src': data.response['photo_src']
                                }
                            });
                        } else {
                            callback({
                                error: {
                                    error_code: 10007,
                                    error_msg: "Operation denied by user"
                                }
                            });
                        }
                        window.profilePhotoBoxCallback = false;
                    }
                    extShowProfilePhotoBox(data.response['photo_hash']);
                    return false;
                }
                break;
        }
        return true;
    },
    call: function(method, inputParams, callback, captcha) {
        if (arguments.length == 2) {
            callback = inputParams;
            inputParams = {};
        }
        if (inputParams == undefined) {
            inputParams = {};
        }
        if (!captcha && !inputParams.method_access && !inputParams.method_force && !Api.checkMethod(method, inputParams, callback)) {
            return;
        }
        if (inputParams.method_force) {
            delete inputParams.method_force;
        }
        var params = {
            v: '3.0',
            api_id: Api.api_id,
            method: method,
            format: 'json',
            rnd: parseInt(Math.random() * 10000)
        }

        if (inputParams)
            for (var i in inputParams) params[i] = inputParams[i];

        var lParams = [];
        for (i in params) {
            lParams.push([i, params[i]]);
        }

        function sName(i, ii) {
            if (i[0] > ii[0])
                return 1;
            else if (i[0] < ii[0])
                return -1;
            else
                return 0;
        }

        lParams.sort(sName);
        var sig = Api.viewer_id;
        for (i in lParams) {
            sig += lParams[i][0] + '=' + lParams[i][1];
        }
        sig += Api.secret;
        params.sid = Api.sid;

        function pass() {
            params.sig = MD5(sig);
            debugLog('VK.api: ' + method);
            var done = function(text) {
                //var response = JSON.parse(text);
                var response = eval('(' + text + ')');
                if (response.error && response.error.error_code == 14) { // Captcha needed
                    showCaptcha(response.error.captcha_sid, response.error.captcha_img, function(sid, value) {
                        inputParams['captcha_sid'] = sid;
                        inputParams['captcha_key'] = value;
                        Api.call(method, inputParams, callback, true);
                    }, false, function() {
                        callback(response);
                    });
                } else {
                    if (captcha) window.Ajax._captchaBox.setOptions({
                        onHide: function() {}
                    }).hide();
                    if (!Api.checkMethodResult(method, params, response, callback)) {
                        return;
                    } else {
                        callback(response);
                    }
                }
            }
            var fail = function() {
                debugLog('Ajax fail');
            }
            if (vk.al) {
                ajax.plainpost('/api.php', params, {
                    onDone: done,
                    onFail: fail
                });
            } else {
                Ajax.Post({
                    url: '/api.php',
                    query: params,
                    onDone: function(obj, text) {
                        done(text);
                    },
                    onFail: fail
                });
            }
        }
        if (typeof(MD5) != 'undefined') {
            pass();
        } else {
            window.onMd5Load.push(pass);
            if (window.onMd5Load.length == 1) {
                if (vk.al) {
                    stManager.add('md5.js');
                } else {
                    attachScript('md5_function', 'http://vk.com/js/lib/md5.js');
                }
            }
        }

    }
};

var appLoaded = false,
    lastLocation = '',
    hashHandler, appContainer;
var inlineApp = (typeof inlineApp != 'undefined' && inlineApp),
    iframeApp = (typeof iframeApp != 'undefined' && iframeApp),
    useCallbacks = (typeof useCallbacks != 'undefined' && useCallbacks);

function getAppContainer() {
    if (!appContainer) {
        appContainer = ge('app_container');
    }
    return appContainer;
}

function onFlashReady() {
    if (appLoaded && !inlineApp) return;
    appLoaded = true;
    if (!inlineApp) {
        lastLocation = location.hash.replace('#', '');
        runCallback('onLocationChanged', lastLocation);
    }
    return true;
}

function runCallback(method) {
    if (!useCallbacks)
        return;
    if (!appContainer)
        appContainer = ge('app_container');
    if (!appContainer)
        return false;
    var args = Array.prototype.slice.call(arguments);

    var r = [],
        arr = args.slice(1);

    if (iframeApp) {
        if (method == 'customEvent') var customEvent = args.shift();
        if (window.receiveMessageOldUsed && window.postMessage) {
            var msg = args.join(String.fromCharCode(31));
            appContainer.contentWindow.postMessage(msg, '*');
        } else {
            try {
                Rpc.runCallback(args);
            } catch (e) {}
        }
    }

    for (var i in arr) {
        r.push(typeof arr[i] == 'string' ? "'" + arr[i].replace(/'/g, "\\'") + "'" : intval(arr[i]));
    }
    var el = iframeApp ? ge('api_proxy') : appContainer;
    try {
        eval('el.' + method + '(' + r.join(',') + ');');
    } catch (e) {}
}

onDomReady(function() {
    if (!useCallbacks || inlineApp) {
        return;
    }
    hashHandler = new HashHandler(function(hash) {
        if (!inlineApp && appLoaded) {
            runCallback('onLocationChanged', hash);
            lastLocation = hash;
        }
    });
    window.extSetLocation = hashHandler.setHash;
    addEvent(document, 'block unblock', function(e) {
        if (e.type == 'block')
            runCallback('customEvent', 'onWindowBlur');
        else
            runCallback('customEvent', 'onWindowFocus');
    }, true);
});

function HashHandler(onHashChanged) {
    var currentHash = '',
        frame;
    var handler = function(manual) {
        if (location.hash != currentHash) {
            currentHash = location.hash;
            var chCurrentHash = currentHash.replace('#', '');
            onHashChanged(chCurrentHash);
            if (!manual && browser.msie && !browser.msie8) frame.src = '/blank.html?ahHash=' + encodeURIComponent(chCurrentHash);
        }
    }

    if (browser.msie && !browser.msie8) {
        frame = document.createElement('iframe');
        frame.style.position = 'absolute';
        frame.style.visibility = 'hidden';
        frame.id = 'appLocFrame';
        addEvent(frame, 'readystatechange', function() {
            if (this.contentWindow.document.readyState != 'complete') return;
            var m = this.contentWindow.document.location.search.match(/ahHash=(.*)$/);
            if (m) {
                location.hash = decodeURIComponent(m[1] || '');
                handler(true);
            }
        });
        document.body.appendChild(frame);
        var initHash = encodeURIComponent(location.hash.replace('#', ''));
        if (initHash) frame.src = '/blank.html?ahHash=' + initHash;
    }
    setInterval(handler, 100);
    return {
        getHash: function() {
            return currentHash.replace('#', '');
        },
        setHash: function(locationHash, fireEvent) {
            locationHash = locationHash.replace('#', '');
            if (locationHash == location.hash.replace('#', '')) return;
            location.hash = locationHash;
            if (!fireEvent)
                currentHash = location.hash;
            if (browser.msie && !browser.msie8) {
                frame.src = '/blank.html?ahHash=' + encodeURIComponent(locationHash);
            }
        }
    }
}

// Declare external functions for Applications
function extCallMethod() {
    var args = Array.prototype.slice.call(arguments);
    var method = args.shift();
    if (method && extFuncs[method]) {
        extFuncs[method].apply(null, args);
    }
}

function extApi(callId, method, params) {
    Api.call(method, params, function(response) {
        try {
            var el = iframeApp ? ge('api_proxy') : appContainer;
            el.apiCallback(callId, response);
        } catch (e) {}
    });
}

function extDebug(msg) {
    if ((browser.mozilla || browser.chrome) && console) {
        console.log(msg);
    }
}
var settingsTries = 1;

function extShowSettingsBox(settings) {
    if (settingsTries > 0) {
        showSettingsBox(appId, settings);
        settingsTries--;
        setTimeout(function() {
            settingsTries++;
        }, 3000);
    }
}

var settingsBox;

function showSettingsBox(appId, settings, main) {
    if (!settingsBox) {
        settingsBox = new MessageBox({
            title: apps_app_settings,
            progress: 'settingsProgress'
        });
    }
    settingsBox.removeButtons();
    settingsBox.addButton({
        label: box_close,
        onClick: function() {
            settingsBox.hide(200);
        }
    });
    settingsBox.loadContent('apps.php?act=a_load_settings', {
        id: appId,
        mask: settings,
        main: main ? 1 : 0
    }, true).show();
}

var wallPostBox;
var boxTries = 1;

function showWallPrePost(appId, text, attachment, ownerId, callback) {
    if (boxTries > 0) {
        if (!wallPostBox) {
            wallPostBox = new MessageBox({
                title: getLang('box_loading'),
                progress: 'settingsProgress'
            });
        }
        wallPostBox.apiCallback = callback;
        wallPostBox.removeButtons();
        wallPostBox.addButton({
            label: box_close,
            onClick: function() {
                settingsBox.hide(200);
            }
        });
        wallPostBox.loadContent('apps.php?act=a_prepare_post', {
            aid: appId,
            text: text,
            owner_id: ownerId,
            attachment: attachment
        }, true).show();
        boxTries--;
        setTimeout(function() {
            boxTries++;
        }, 3000);
    } else {
        callback('', {
            error_code: 10005,
            error_msg: "Too frequently"
        })
    }
}

function recountAddVotes(obj) {
    var add_val = obj.value.replace(/[^0-9]/g, '');
    ge('add_votes').innerHTML = langNumeric(add_val, votes_flex);
    if (add_val > 0 && ge('withdraw')) {
        ge('withdraw').value = 0;
        recountWithdrawVotes(ge('withdraw'));
    }
}

function recountWithdrawVotes(obj) {
    var withdraw_val = obj.value.replace(/[^0-9]/g, '');
    ge('withdraw_votes').innerHTML = langNumeric(withdraw_val, votes_flex);
    if (withdraw_val > 0) {
        ge('add').value = 0;
        recountAddVotes(ge('add'));
    }
}

function extScrollWindow(y, speed) {
    if (inlineApp) return;
    var offsetTop = 0, //getAppContainer().offsetTop,
        scrollTop = Math.max(offsetTop + y, 0);
    speed = intval(speed);
    if (speed && speed > 0) {
        animate(document.getElementsByTagName('html')[0], {
            scrollTop: scrollTop
        }, speed);
    } else window.scroll(0, scrollTop);
}

var profilePhotoBox;

function extShowProfilePhotoBox(photoHash) {
    if (inlineApp) return;
    if (!profilePhotoBox) {
        profilePhotoBox = new MessageBox({
            progress: 'ppProgress',
            title: box_loading
        });
    }
    profilePhotoBox.removeButtons().addButton({
        label: box_close,
        onClick: function() {
            if (profilePhotoBoxCallback) {
                profilePhotoBoxCallback(false);
            }
            profilePhotoBox.hide();
        }
    }).loadContent('apps.php', {
        act: 'a_load_profile_photo',
        photo_hash: photoHash,
        id: appId
    }, true).show();
}

var appName;

function extSetNavigation(labels, links) {
    if (inlineApp) return;
    var appNav = ge('appNav'),
        appNavStr = "";
    if (!appName)
        appName = appNav.innerHTML;
    if (!labels)
        appNavStr = appName;
    else {
        var lnk, label;
        if (!links) links = [];
        links.unshift("");
        labels.unshift(appName);
        for (var i = 0; i < labels.length && i < 3; i++) {
            lnk = (links && links[i] != undefined) ? links[i] : ('level' + i);
            label = labels[i].replace(/[<>#]+/gi, '');
            if (i < labels.length - 1) {
                lnk = lnk.replace(/[<>#"']+/gi, '');
                appNavStr += '<a href="#' + lnk + '" onclick="extSetLocation(\'' + lnk + '\', true); return false;">' + label + '</a> &raquo; ';
            } else {
                appNavStr += label;
            }
        }
    }
    appNav.innerHTML = appNavStr;
}

function extSetTitle(title) {
    if (inlineApp) return;
    title.replace(/[<>]+/gi, '');
    var prefix = cur.backLang;
    prefix = !prefix ? getLang('global_vkontakte') : prefix;
    document.title = prefix + (title ? (' | ' + title) : '');
}

function extShowInviteBox() {
    if (inlineApp) return;
    showInviteBox();
}

function extShowPaymentBox(votes) {
    if (inlineApp) return;
    showPaymentBox(votes);
}
var installTries = 1;

function extShowInstallBox() {
    if (inlineApp) return;
    if (!window.isAppUser) {
        if (installTries > 0) {
            showInstallBox();
            installTries--;
            setTimeout(function() {
                installTries++;
            }, 3000);
        }
        return;
    }
    runCallback('customEvent', 'onApplicationAdded');
}

function extSaveWallPost(hash) {
    return inlineApp ? doSendAppPost(hash) : showWallPostBox(hash);
}
var wallPostBox;

function showWallPostBox(postHash) {
    if (!wallPostBox) {
        wallPostBox = new MessageBox({
            progress: 'wpProgress',
            title: box_loading
        });
    }
    if (wallPostBox.isVisible()) return;
    wallPostBox.removeButtons().addButton({
        label: box_close,
        onClick: function() {
            runCallback('customEvent', 'onWallPostCancel');
            wallPostBox.hide();
        }
    }).loadContent('apps.php', {
        act: 'a_load_wall_post',
        post_hash: postHash,
        id: appId
    }, true).show();
}

/**
 * @param string param,... Key-value pair separated by '=' sign.
 **/
function extShowMerchantPaymentBox(params) {
    if (inlineApp) return;
    var paramsObj = {};
    if (typeof params == 'object') {
        paramsObj = params;
    } else {
        var args = Array.prototype.slice.call(arguments);
        each(args, function() {
            var kv = this.split('=');
            if (kv.length == 2) paramsObj[kv[0]] = kv[1];
        });
    }
    showMerchantPaymentBox(paramsObj);
}

function extNavigateToURL(url, type) {
    if (url.indexOf('http://') == -1) {
        if (url[0] != '/') url = '/' + url;
        url = 'http://' + window.location.host + url;
    }
    goAway(url, {
        type: type
    });
}

function extScrollTop() {
    runCallback('customEvent', 'onScrollTop', parseInt(document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset));
}

function ext_getAppInfo(callback) {
    callback([Api.api_id, window.location.hash]);
}

var merchantPaymentBox;

function showMerchantPaymentBox(params) {
    if (inlineApp) return;
    var boxOptions = {
        title: getLang('apps_merchant_payment_title'),
        bodyStyle: 'padding: 0;',
        width: 534,
        onHide: function() {
            if (!window.merchantPaymentConfirmBox || !window.merchantPaymentConfirmBox.isVisible()) {
                onMerchantPaymentCancel();
            }
        }
    };

    var testMode = 1;
    if ('test_mode' in params) {
        testMode = ((params.test_mode.toString() == '0') ? 0 : 1);
    }

    // Clear parameters
    {
        var trash = [];
        for (var i in params) {
            if ((i == 'merchant_id') || (i == 'required_fields')) {
                continue;
            }
            if (i.indexOf('custom_') == 0) {
                continue;
            }
            if (i.indexOf('item_') == 0) {
                var part = i.substr(5);
                var allowed = ['id_', 'name_', 'description_', 'price_', 'currency_', 'quantity_', 'photo_url_', 'digital_'];
                var found = false;
                for (var j in allowed) {
                    if (part.indexOf(allowed[j]) == 0) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    continue;
                }
            }
            trash.push(i);
        }

        for (var i in trash) {
            delete params[trash[i]];
        }
    }

    var targetUrl = (testMode ? 'paytest.php' : 'pay.php');

    targetUrl += '?act=auth';
    params.show_in_box = 1;

    showBox('merchantPaymentBox', targetUrl, params, {
        reload: true,
        params: boxOptions
    })
    window.merchantPaymentBox = winBoxes['merchantPaymentBox'];
}

function onMerchantPaymentCancel() {
    runCallback('customEvent', 'onMerchantPaymentCancel');
}

function onMerchantPaymentSuccess(merchant_order_id) {
    runCallback('onMerchantPaymentSuccess', merchant_order_id);
}

function onMerchantPaymentFail(errorCode) {
    runCallback('customEvent', 'onMerchantPaymentFail', errorCode);
}

var invite_used = 0;
var friendsInvited = new Array();
var messageBox;
friends_select_all = ' ';

var inviteBox, invitedBox;

function showInviteBox() {
    if (!inviteBox) {
        inviteBox = new PrivacyBox({
            params: {
                from: 'apps',
                aid: window.app_id
            },
            saveList: false,
            onPrivacySave: function(item, friendsIds) {
                friendsInvited = friendsIds;
                Ajax.Send('apps.php?act=a_invite_friends', {
                    friends: friendsIds.join(','),
                    app_id: window.app_id,
                    app_hash: window.appHash
                }, onFriendsInvited);
            }
        });
    }
    inviteBox.editPrivacy('apps', friendsInvited);
}

function onFriendsInvited(ajaxObj, responseText) {
    var result = eval('(' + responseText + ')');
    if (!invitedBox) {
        invitedBox = new MessageBox({
            title: app_invited
        });
        invitedBox.addButton({
            label: box_close,
            onClick: function() {
                this.hide();
            }
        });
    }
    if (result.result) {
        if (parseInt(result.result) > 1) {
            invitedBox.content(app_invited_text);
        } else {
            invitedBox.content(app_invited1_text);
        }
    } else if (result.error) {
        invitedBox.content(result.error);
    } else {
        return;
    }
    invitedBox.show();
    setTimeout(invitedBox.hide, 900);
}

function getVotes(from_box, count) {
    addCss('css/privacy.css');
    if (window.event && (window.event.which == 2 || window.event.button == 1)) {
        return true;
    }
    if (!window.getVotesBox) {
        window.getVotesBox = new MessageBox({
            title: window.lang_increase_balance,
            width: '480px',
            progress: 'getVotesProgress',
            bodyStyle: 'padding: 0px',
            onHide: function() {
                window.getVotesBoxHidden();
                if (from_box == 1) {
                    showPaymentBox(window.paymentBoxVotes);
                }
            }
        });
    }
    if (count === undefined) {
        count = window.paymentBoxVotes - window.userBalance;
        if (count < 0) {
            count = 0;
        }
    }
    window.getVotesBox.removeButtons().addButton({
        label: window.lang_close,
        onClick: window.getVotesBox.hide
    });
    window.getVotesBox.loadContent('payments.php?return=apps', {
        'act': 'a_get_votes_box',
        votes: count
    }, true).show();
    return false;
}

(function() {
    var installBox;
    window.showInstallBox = function() {
        if (!installBox) {
            installBox = new MessageBox({
                title: window.lang_add_app_title,
                progress: 'joinProgress'
            });
            installBox.addButton({
                label: box_no,
                style: 'button_no',
                onClick: installBox.hide
            });
            installBox.addButton({
                label: box_yes,
                onClick: installApp
            });
            installBox.content(window.lang_install_app_confirm);
        }
        installBox.show();
    }

    function installApp(app_id) {
        show('joinProgress');
        Ajax.Send('apps.php', {
            act: 'join',
            id: window.app_id,
            hash: appHash
        }, function(ajaxObj, responseText) {
            var response = eval('(' + responseText + ')');
            if (response.result) {
                window.isAppUser = true;
                if (ge('app_message')) ge('app_message').innerHTML = response.result;
                if (response.links) {
                    if (ge('summary_links')) ge('summary_links').innerHTML = response.links;
                } else if (response.items) {
                    // TODO
                    window.dropDownAppSettings.setData(response.items);
                }
                runCallback('customEvent', 'onApplicationAdded');
                //} else if (response.error) {
                // generate error callback
            }
            hide('joinProgress');
            installBox.hide();
        });
    }
    var paymentBox, addingVotes;
    window.paymentBoxVotes = false;
    window.showPaymentBox = function(votes) {
        addingVotes = false;
        if (!paymentBox) {
            paymentBox = new MessageBox({
                title: window.lang_add_votes_title,
                progress: 'addVotesProgress'
            });
        }
        window.paymentBoxVotes = votes; // To update it when balance is updated.

        var text = '';
        votes = intval(votes);
        if (votes < 0) votes = 0;
        if (votes > 0) {
            text = langNumeric(votes, apps_need_X_votes) + '<br />';
        } else {
            text = window.lang_need_votes + '<br/>';
        }
        if (votes == 0) {
            text += '<table cellspacing="0" cellpadding="0" style="margin: 10px 0px 5px 0px"><tr><td>' + window.lang_balance_plus + '</td><td>';
            text += '<input type="text" class="inputText" id="votesToAdd" maxlength="8" size="3" style="margin: 0px 4px;" onKeyUp="onVotesChange(this)" />';
            text += '</td><td id="votesToAddFlex">' + window.lang_votes + '</td></tr></table>';
        } else {
            text += window.lang_will_be_charged;
            text += '<input type="hidden" id="votesToAdd" value="' + votes + '" />';
        }
        text += '<div id="apps_error" style="margin-top: 10px; display: none">';
        text += '  <div class="error" style="margin: 0px; background-color: #F9F6E7; border: 1px solid #D4BC4C;">' + window.lang_not_enough_votes + ' <a href="payments.php?act=addfunds" onclick="return getVotes(1)">' + window.lang_get_votes + '</a></div>';
        text += '</div>';
        text += '<div id="a_money_to_votes" style="display: none; background-color: #F9F6E7; border: 1px solid #D4BC4C; padding: 8px 11px; margin: 10px 0px 0px; text-align: center;">';
        text += '  <div id="a_money_to_votes_text"></div>';
        text += '  <div style="padding-top: 5px"><a href="payments.php?return=apps" onclick="return getVotes(1, -1)">' + window.lang_get_votes_other_way + '</a></div>';
        text += '</div>';
        text += '<div style="margin-top:10px; vertical-align:top; font-size:9px; background:#F7F7F7; border:1px solid #DAE1E8; padding:5px 10px">' + window.lang_votes_agreement + '</div>';

        paymentBox.removeButtons();
        paymentBox.addButton({
            label: box_cancel,
            style: 'button_no',
            onClick: paymentBox.hide
        });
        paymentBox.addButton({
            label: window.lang_add_votes,
            onClick: addVotes
        });

        paymentBox.content(text).show();
        onVotesChange(ge('votesToAdd'));
    }
    window.onVotesChange = function(obj) {
        var value = intval(obj.value.replace(/[^0-9]/g, ''));
        if (!value) return;
        if (ge('votesToAddFlex')) {
            ge('votesToAddFlex').innerHTML = langNumeric(value, votes_flex);
        }
        if (value <= window.userBalance) {
            hide('apps_error', 'a_money_to_votes');
        } else if (value <= window.userBalance + Math.floor(window.userMoney / config_vote_cost)) {
            hide('apps_error');
            var v = langNumeric(value - window.userBalance, lang_n_votes);
            var m = langNumeric(parseInt((value - window.userBalance) * config_vote_cost / 10) / 100, lang_money_amount);
            ge('a_money_to_votes_text').innerHTML = lang_money_to_votes.replace('{money}', '<b>' + m + '</b>').replace('{votes}', '<b>' + v + '</b>');
            show('a_money_to_votes');
        } else {
            hide('a_money_to_votes');
            show('apps_error');
        }
    }

    function addVotes() {
        if (isVisible('addVotesProgress')) return;
        var votes = intval(ge('votesToAdd').value);
        if (!votes) {
            focusAtEnd('votesToAdd');
            return;
        }

        show('addVotesProgress');
        Ajax.Send('apps.php', {
            act: 'a_add_votes',
            id: window.app_id,
            hash: window.appHash,
            votes: votes
        }, {
            onSuccess: function(ajaxObj, responseText) {
                hide('addVotesProgress');
                var result = eval('(' + responseText + ')');
                if (result.error) {
                    ge('apps_error').innerHTML = result.error;
                    hide('a_money_to_votes');
                    show('apps_error');
                    animate(ge('apps_error').firstChild, {
                        backgroundColor: '#F9F6E7',
                        borderColor: '#D4BC4C'
                    }, 5000);
                } else {
                    paymentBox.removeButtons().addButton({
                        label: box_close,
                        onClick: paymentBox.hide
                    });
                    paymentBox.content(langNumeric(result.added, apps_balance_plus_X_done));
                    if (result.coins != undefined) {
                        new_balance = intval(result.coins);
                        runCallback('onBalanceChanged', new_balance);
                    }
                    if (result.balance != undefined) {
                        window.userBalance = intval(result.balance);
                        window.userMoney = intval(result.money);
                        if (window.userMoney || window.userBalance) {
                            show('left_money_box');
                            ge('left_money_box').innerHTML = result.money_html;
                            if (result.money_script) {
                                eval(result.money_script);
                            }
                        } else {
                            hide('left_money_box');
                        }
                        if (ge('votes_balance_str')) {
                            ge('votes_balance_str').innerHTML = result.votes_balance_str;
                        }
                    }
                    setTimeout(function() {
                        paymentBox.hide()
                    }, 900);
                }
            },
            onCaptchaShow: function() {
                hide('addVotesProgress');
            },
            onCaptchaHide: function(success) {
                if (success) paymentBox.show();
                else showPaymentBox(window.paymentBoxVotes);
            }
        });
    }
})();

(function() {
    var lastW, lastH, containerSize, appContainerOuter;
    window.extResizeWindow = function(width, height, fireEvent) {
        if (inlineApp) return;
        if (!appContainerOuter || !containerSize) {
            appContainerOuter = ge('app_container_outer');
            if (!appContainerOuter) return;
            containerSize = getSize(appContainerOuter);
        }

        height = Math.max(100, Math.min(iframeApp ? 1000000 : 4050, height));
        width = Math.max(100, Math.min(containerSize[0], width));

        var appCont = ge('flash_app') || getAppContainer();

        if (lastW != width) {
            appCont.style.width = width + 'px';
            lastW = width;
        }

        if (lastH != height) {
            appCont.style.height = height + 'px';
            appContainerOuter.style.height = height + 'px';
            lastH = height;
        }
        if (fireEvent)
            runCallback('onWindowResized', width, height);
    }

    window.extFuncs = {
        setAppReady: onFlashReady,
        showPaymentBox: extShowPaymentBox,
        showSettingsBox: extShowSettingsBox,
        showInviteBox: extShowInviteBox,
        showInstallBox: extShowInstallBox,
        resizeWindow: extResizeWindow,
        scrollWindow: extScrollWindow,
        setLocation: function() {
            extSetLocation.apply(null, arguments);
        },
        setTitle: extSetTitle,
        saveWallPost: extSaveWallPost,
        showProfilePhotoBox: extShowProfilePhotoBox,
        showMerchantPaymentBox: extShowMerchantPaymentBox,
        navigateToURL: extNavigateToURL,
        scrollTop: extScrollTop,
        _getAppInfo: ext_getAppInfo
    };

})(); // end of flash callbacks

try {
    stManager.done('apps_flash.js');
} catch (e) {}