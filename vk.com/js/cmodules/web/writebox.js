﻿! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var i = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var i in e) n.d(r, i, function(t) {
                return e[t]
            }.bind(null, i));
        return r
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 498)
}({
    104: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "getFirstUnread", function() {
            return d
        }), n.d(t, "isSearchShown", function() {
            return l
        }), n.d(t, "getPeer", function() {
            return f
        }), n.d(t, "getCurrentKeyboard", function() {
            return m
        }), n.d(t, "getKeyboard", function() {
            return g
        }), n.d(t, "getTab", function() {
            return p
        }), n.d(t, "getCurrentTab", function() {
            return h
        }), n.d(t, "getSelectedMessages", function() {
            return _
        }), n.d(t, "getMessageRangeFromSelection", function() {
            return b
        }), n.d(t, "countUnread", function() {
            return v
        }), n.d(t, "getMessageByRid", function() {
            return y
        }), n.d(t, "isRidExist", function() {
            return w
        }), n.d(t, "getLocalId", function() {
            return O
        }), n.d(t, "getLastMessage", function() {
            return j
        }), n.d(t, "parserMessage", function() {
            return k
        }), n.d(t, "getAuthorFullName", function() {
            return E
        }), n.d(t, "getMessage", function() {
            return T
        }), n.d(t, "getPreviousMessage", function() {
            return I
        }), n.d(t, "isClassicInterface", function() {
            return A
        }), n.d(t, "isLocksAvailable", function() {
            return C
        }), n.d(t, "isFoldersAvailable", function() {
            return S
        }), n.d(t, "isCommunityInterface", function() {
            return M
        }), n.d(t, "isChannel", function() {
            return x
        }), n.d(t, "getBareTab", function() {
            return D
        }), n.d(t, "isReversedDialogs", function() {
            return P
        }), n.d(t, "isFullyLoadedTab", function() {
            return L
        }), n.d(t, "makeTabNotFullyLoaded", function() {
            return N
        }), n.d(t, "isGoToEndVisible", function() {
            return R
        }), n.d(t, "getUnreadScrollBottom", function() {
            return F
        }), n.d(t, "isSendingAvailable", function() {
            return H
        }), n.d(t, "isCommunityPeer", function() {
            return U
        }), n.d(t, "isCommunityBlocked", function() {
            return B
        }), n.d(t, "checkVoiceMessageAvailable", function() {
            return G
        }), n.d(t, "isSearching", function() {
            return z
        }), n.d(t, "getSearchText", function() {
            return q
        }), n.d(t, "isSearchingValue", function() {
            return K
        }), n.d(t, "isRecentSearchesActive", function() {
            return V
        }), n.d(t, "getPinnedMessage", function() {
            return W
        }), n.d(t, "doPopularSuggExist", function() {
            return Y
        }), n.d(t, "isAnyMessageBeingEdited", function() {
            return X
        }), n.d(t, "getGroupId", function() {
            return $
        }), n.d(t, "getTabDraft", function() {
            return Q
        }), n.d(t, "getTemplates", function() {
            return Z
        });
        var r = n(322),
            i = n(423),
            a = n(163),
            o = n(72),
            u = n(406),
            c = n(29),
            s = n(470);

        function d(e, t) {
            var n = Object(c.unpackStore)(e),
                i = n.tabs[n.peer];
            return Object.keys(i.msgs).filter(function(n) {
                var a = T(e, t, n);
                return !Object(r.isOut)(a) && intval(n) > i.in_up_to
            })[0]
        }

        function l(e) {
            return Object(c.unpackStore)(e).searchShown
        }

        function f(e) {
            return Object(c.unpackStore)(e).peer
        }

        function m(e) {
            return g(e, f(e))
        }

        function g(e, t) {
            return (p(e, t) || {}).keyboard
        }

        function p(e, t) {
            var n = Object(c.unpackStore)(e);
            return n.tabs && n.tabs[t]
        }

        function h(e) {
            var t = Object(c.unpackStore)(e);
            return t.peer ? t.tabs[t.peer] : null
        }

        function _(e) {
            return Object(c.unpackStore)(e).selectedMessages
        }

        function b(e, t, n) {
            var i = p(e, t),
                a = _(e)[0];
            if (void 0 === a) return [n];
            var o = Math.min(n, a),
                u = Math.max(n, a);
            return Object.keys(i.msgs).filter(function(e) {
                return e >= o && e <= u
            }).filter(function(t) {
                var n = T(e, e.get().peer, t);
                return !Object(r.isServiceMsg)(n) && !Object(r.isCallMessage)(n)
            }).map(intval)
        }

        function v(e, t) {
            var n = p(Object(c.unpackStore)(t), e),
                i = 0;
            for (var a in n.msgs)
                if (n.msgs.hasOwnProperty(a)) {
                    var o = T(t, e, a);
                    Object(r.isOut)(o) || (i += Object(r.isUnread)(n, o) ? 1 : 0)
                }
            return i
        }

        function y(e, t, n) {
            var r = p(e, t);
            return Object.keys(r.msgs).filter(function(r) {
                return intval(T(e, t, r).randomId) === n
            }).length > 0
        }

        function w(e, t, n) {
            return !!y(e, t, n)
        }

        function O(e, t) {
            var n = Object(c.unpackStore)(e),
                r = n.msg_local_ids_sort && n.msg_local_ids_sort[t];
            return void 0 !== r ? 2e9 + r : t
        }

        function j(e, t, n) {
            var r = p(e, t),
                a = T(e, t, n),
                o = Object.keys(r.msgs).filter(function(n) {
                    var r = T(e, t, n),
                        o = r.local && r.type !== i.EDIT_MESSAGE;
                    return !(!a.local && o) && (!(!a.local || o) || O(e, a.messageId) > O(e, r.messageId))
                }).pop();
            return o ? T(e, t, o) : null
        }

        function k(e) {
            return e && e.length > 0 ? i.addMessageEvent([0].concat(e)) : e
        }

        function E(e, t, n) {
            var i = p(e, t),
                a = T(e, t, n),
                u = Object(c.unpackStore)(e);
            return Object(r.isOut)(a) ? Object(o.oCacheGet)(e, u.id).name : a.userId !== a.peerId ? !!Object(o.oCacheExists)(e, a.userId) && Object(o.oCacheGet)(e, a.userId).name : i.tab
        }

        function T(e, t, n) {
            var r = p(e, t),
                i = r && r.msgs && r.msgs[n];
            return i ? k(i) : null
        }

        function I(e, t, n) {
            var r = p(e, t),
                i = r && r.msgs && Object.keys(r.msgs).sort(function(e, t) {
                    return +e - t
                });
            if (!i) return null;
            var a = i && i.indexOf("" + n),
                o = a > -1 ? i[a - 1] : null;
            return r.msgs[o]
        }

        function A(e) {
            var t = Object(c.unpackStore)(e);
            return t.gid || t.isClassic
        }

        function C(e) {
            return Object(c.unpackStore)(e).gid
        }

        function S(e) {
            return Object(c.unpackStore)(e).gid
        }

        function M(e) {
            return !!Object(c.unpackStore)(e).gid
        }

        function x(e, t) {
            return !!(t.peerId > 2e9 && Object(s.doesChatTabHaveFlag)(t, 1024))
        }

        function D(e, t) {
            var n = Object(c.unpackStore)(t);
            return n.tabs[e] || n.mapped_index[e]
        }

        function P(e) {
            var t = Object(c.unpackStore)(e);
            return !!M(e) && ((19542789 === t.gid || 103416369 == t.gid) && (t.active_tab === a.FOLDER_UNRESPOND || t.active_tab === a.FOLDER_UNREAD))
        }

        function L(e, t) {
            var n = (e = Object(c.unpackStore)(e)).tabs;
            return !(!n || !n[t] || void 0 === n[t].history || !n[t].msgs)
        }

        function N(e, t) {
            var n = p(e, t);
            n && (n.msgs = void 0, n.msgid = void 0, n.scrollTop = void 0, n.scrollBottom = void 0, n.contHeight = void 0, n.offset = void 0, n.skipped = void 0)
        }

        function R(e) {
            var t = e.get().go_to_end_visible;
            return !!t && t[0]
        }

        function F(e) {
            var t = e.get().go_to_end_visible;
            return t ? t[1] : 0
        }

        function H(e) {
            return !Object(c.unpackStore)(e).lockedSending
        }

        function U(e) {
            return e > -2e9 && e < 0
        }

        function B(e, t) {
            return !!U(t) && !!p(e, t).blocked_community
        }

        function G(e) {
            return Object(c.unpackStore)(e).voice_message_available
        }

        function z(e) {
            var t = Object(c.unpackStore)(e);
            return !(!q(t) && !t.recentSearch)
        }

        function q(e) {
            return Object(c.unpackStore)(e).searchText
        }

        function K(e, t) {
            var n = Object(c.unpackStore)(e);
            return !!(t && t !== q(e) || n.recentSearch)
        }

        function V(e) {
            return Object(c.unpackStore)(e).recentSearch
        }

        function W(e) {
            var t = h(e);
            return t && t.pinned && k(t.pinned)
        }

        function Y(e) {
            var t = e.get().popular_sugg;
            return t && t.length > 0
        }

        function X(e) {
            return 1 == Object(c.unpackStore)(e).isEditing
        }

        function $(e) {
            return Object(c.unpackStore)(e).gid
        }

        function Q(e) {
            return e.draft || (e.draft = Object(u.loadDraftForPeer)(cur.imDb, e.peerId)), e.draft
        }

        function Z(e) {
            return (Object(c.unpackStore)(e).templates || []).filter(function(e) {
                return !e.deleted
            })
        }
    },
    149: function(e, t, n) {
        "use strict";

        function r(e, t) {
            return new Promise(function(n) {
                setTimeout(n.bind(null, t), 1e3 * e)
            })
        }

        function i(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                i = 0;
            return function a() {
                for (var o = arguments.length, u = Array(o), c = 0; c < o; c++) u[c] = arguments[c];
                return Promise.resolve().then(function() {
                    return e.apply(void 0, u)
                }).catch(function(e) {
                    if (++i <= t) {
                        var o = "function" == typeof n ? n(i) : 0;
                        return 0 === o ? a.apply(void 0, u) : r(o).then(function() {
                            return a.apply(void 0, u)
                        })
                    }
                    throw e
                })
            }
        }

        function a(e, t, n) {
            var r = void 0,
                i = void 0;
            return function() {
                for (var a = arguments.length, o = Array(a), u = 0; u < a; u++) o[u] = arguments[u];
                return new Promise(function(e, a) {
                    var u = n && !r;
                    clearTimeout(r), i && i.reject("debounce"), r = setTimeout(function() {
                        r = null, i = null, n || e(o)
                    }, t), u ? e(o) : n && a("debounce"), i = {
                        resolve: e,
                        reject: a
                    }
                }).then(function(t) {
                    return e.apply(void 0, function(e) {
                        if (Array.isArray(e)) {
                            for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                            return n
                        }
                        return Array.from(e)
                    }(t))
                })
            }
        }

        function o(e, t) {
            var n = void 0,
                r = new Promise(function(r) {
                    n = r, setTimeout(r.bind(null, t), 1e3 * e)
                });
            return {
                pause: function() {
                    return r
                },
                abort: function() {
                    n(t)
                }
            }
        }
        n.r(t), n.d(t, "pause", function() {
            return r
        }), n.d(t, "retryFn", function() {
            return i
        }), n.d(t, "debouncedPromise", function() {
            return a
        }), n.d(t, "abortablePause", function() {
            return o
        })
    },
    150: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "mount", function() {
            return a
        });
        var r = n(31);

        function i(e) {
            return {
                unmount: function() {
                    Object(r.destroyModule)(e)
                }
            }
        }

        function a(e, t, n) {
            return (0, Object(r.createMutations)(i).bindMutations)(Object(r.createModule)({
                handlers: function(e, t) {}
            }))
        }
    },
    163: function(e, t, n) {
        "use strict";
        var r;

        function i(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }
        n.r(t), n.d(t, "OUR_DOMAINS", function() {
            return a
        }), n.d(t, "ENTITIES", function() {
            return o
        }), n.d(t, "VK_DOMAIN", function() {
            return u
        }), n.d(t, "MENTION", function() {
            return c
        }), n.d(t, "MENTION_RAW", function() {
            return s
        }), n.d(t, "ARROW_UP", function() {
            return d
        }), n.d(t, "ARROW_DOWN", function() {
            return l
        }), n.d(t, "PAGE_UP", function() {
            return f
        }), n.d(t, "PAGE_DOWN", function() {
            return m
        }), n.d(t, "END_KEY", function() {
            return g
        }), n.d(t, "HOME", function() {
            return p
        }), n.d(t, "ENTER", function() {
            return h
        }), n.d(t, "ESC", function() {
            return _
        }), n.d(t, "UNPRINTABLE_KEYS", function() {
            return b
        }), n.d(t, "UP_DOWN_CONTROLS", function() {
            return v
        }), n.d(t, "PRINTABLE", function() {
            return y
        }), n.d(t, "FOLDER_UNREAD", function() {
            return w
        }), n.d(t, "FOLDER_ALL", function() {
            return O
        }), n.d(t, "FOLDER_UNRESPOND", function() {
            return j
        }), n.d(t, "FOLDER_IMPORTANT", function() {
            return k
        }), n.d(t, "FOLDERS", function() {
            return E
        }), n.d(t, "FOLDER_MASKS", function() {
            return T
        }), n.d(t, "TOP_DOMAINS", function() {
            return I
        }), n.d(t, "MAX_DOMAIN_LENGTH", function() {
            return A
        }), n.d(t, "EMAIL", function() {
            return C
        }), n.d(t, "MESSAGE_REGEXP", function() {
            return S
        }), n.d(t, "RE_HASHTAG_EXTRACTION_PATTERN", function() {
            return M
        });
        var a = /^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me)$/,
            o = /([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g,
            u = /^(?:https?:\/\/)?(?:vk\.com|vkontakte\.ru)?\/([a-zA-Z0-9\._]+)\??$/,
            c = /\[(id|club)(\d+)(?:\:([a-z0-9_\-]+))?\|([^\$]+?)\]/g,
            s = /(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g,
            d = 38,
            l = 40,
            f = 33,
            m = 34,
            g = 35,
            p = 36,
            h = 13,
            _ = 27,
            b = [d, l, f, m, h, _, g, p],
            v = [f, m, l, d, p, g],
            y = "printable",
            w = "unread",
            O = "all",
            j = "unrespond",
            k = "important",
            E = [O, w, j, k],
            T = (i(r = {}, j, 2), i(r, k, 1), r),
            I = [].concat("aaa,aarp,abarth,abb,abbott,abbvie,abc,able,abogado,abudhabi,ac,academy,accenture,accountant,accountants,aco,active,actor,ad,adac,ads,adult,ae,aeg,aero,aetna,af,afamilycompany,afl,africa,ag,agakhan,agency,ai,aig,aigo,airbus,airforce,airtel,akdn,al,alfaromeo,alibaba,alipay,allfinanz,allstate,ally,alsace,alstom,am,americanexpress,americanfamily,amex,amfam,amica,amsterdam,an,analytics,android,anquan,anz,ao,aol,apartments,app,apple,aq,aquarelle,ar,aramco,archi,army,arpa,art,arte,as,asda,asia,associates,at,athleta,attorney,au,auction,audi,audible,audio,auspost,author,auto,autos,avianca,aw,aws,ax,axa,az,azure,ba,baby,baidu,banamex,bananarepublic,band,bank,bar,barcelona,barclaycard,barclays,barefoot,bargains,baseball,basketball,bauhaus,bayern,bb,bbc,bbt,bbva,bcg,bcn,bd,be,beats,beauty,beer,bentley,berlin,best,bestbuy,bet,bf,bg,bh,bharti,bi,bible,bid,bike,bing,bingo,bio,biz,bj,bl,black,blackfriday,blanco,blockbuster,blog,bloomberg,blue,bm,bms,bmw,bn,bnl,bnpparibas,bo,boats,boehringer,bofa,bom,bond,boo,book,booking,boots,bosch,bostik,boston,bot,boutique,box,bq,br,bradesco,bridgestone,broadway,broker,brother,brussels,bs,bt,budapest,bugatti,build,builders,business,buy,buzz,bv,bw,by,bz,bzh,ca,cab,cafe,cal,call,calvinklein,cam,camera,camp,cancerresearch,canon,capetown,capital,capitalone,car,caravan,cards,care,career,careers,cars,cartier,casa,case,caseih,cash,casino,cat,catering,catholic,cba,cbn,cbre,cbs,cc,cd,ceb,center,ceo,cern,cf,cfa,cfd,cg,ch,chanel,channel,chase,chat,cheap,chintai,chloe,christmas,chrome,chrysler,church,ci,cipriani,circle,cisco,citadel,citi,citic,city,cityeats,ck,cl,claims,cleaning,click,clinic,clinique,clothing,cloud,club,clubmed,cm,cn,co,coach,codes,coffee,college,cologne,com,comcast,commbank,community,company,compare,computer,comsec,condos,construction,consulting,contact,contractors,cooking,cookingchannel,cool,coop,corsica,country,coupon,coupons,courses,cr,credit,creditcard,creditunion,cricket,crown,crs,cruise,cruises,csc,cu,cuisinella,cv,cw,cx,cy,cymru,cyou,cz,dabur,dad,dance,data,date,dating,datsun,day,dclk,dds,de,deal,dealer,deals,degree,delivery,dell,deloitte,delta,democrat,dental,dentist,desi,design,dev,dhl,diamonds,diet,digital,direct,directory,discount,discover,dish,diy,dj,dk,dm,dnp,do,docs,doctor,dodge,dog,doha,domains,dot,download,drive,dtv,dubai,duck,dunlop,duns,dupont,durban,dvag,dvr,dz,earth,eat,ec,eco,edeka,edu,education,ee,eg,eh,email,emerck,energy,engineer,engineering,enterprises,epost,epson,equipment,er,ericsson,erni,es,esq,estate,esurance,et,eu,eurovision,eus,events,everbank,exchange,expert,exposed,express,extraspace,fage,fail,fairwinds,faith,family,fan,fans,farm,farmers,fashion,fast,fedex,feedback,ferrari,ferrero,fi,fiat,fidelity,fido,film,final,finance,financial,fire,firestone,firmdale,fish,fishing,fit,fitness,fj,fk,flickr,flights,flir,florist,flowers,fly,fm,fo,foo,food,foodnetwork,football,ford,forex,forsale,forum,foundation,fox,fr,free,fresenius,frl,frogans,frontdoor,frontier,ftr,fujitsu,fujixerox,fun,fund,furniture,futbol,fyi,ga,gal,gallery,gallo,gallup,game,games,gap,garden,gb,gbiz,gd,gdn,ge,gea,gent,genting,george,gf,gg,ggee,gh,gi,gift,gifts,gives,giving,gl,glade,glass,gle,global,globo,gm,gmail,gmbh,gmo,gmx,gn,godaddy,gold,goldpoint,golf,goo,goodhands,goodyear,goog,google,gop,got,gov,gp,gq,gr,grainger,graphics,gratis,green,gripe,group,gs,gt,gu,guardian,gucci,guge,guide,guitars,guru,gw,gy,hair,hamburg,hangout,haus,hbo,hdfc,hdfcbank,health,healthcare,help,helsinki,here,hermes,hgtv,hiphop,hisamitsu,hitachi,hiv,hk,hkt,hm,hn,hockey,holdings,holiday,homedepot,homegoods,homes,homesense,honda,honeywell,horse,hospital,host,hosting,hot,hoteles,hotmail,house,how,hr,hsbc,ht,htc,hu,hughes,hyatt,hyundai,ibm,icbc,ice,icu,id,ie,ieee,ifm,ikano,il,im,imamat,imdb,immo,immobilien,in,industries,infiniti,info,ing,ink,institute,insurance,insure,int,intel,international,intuit,investments,io,ipiranga,iq,ir,irish,is,iselect,ismaili,ist,istanbul,it,itau,itv,iveco,iwc,jaguar,java,jcb,jcp,je,jeep,jetzt,jewelry,jio,jlc,jll,jm,jmp,jnj,jo,jobs,joburg,jot,joy,jp,jpmorgan,jprs,juegos,juniper,kaufen,kddi,ke,kerryhotels,kerrylogistics,kerryproperties,kfh,kg,kh,ki,kia,kim,kinder,kindle,kitchen,kiwi,km,kn,koeln,komatsu,kosher,kp,kpmg,kpn,kr,krd,kred,kuokgroup,kw,ky,kyoto,kz,la,lacaixa,ladbrokes,lamborghini,lamer,lancaster,lancia,lancome,land,landrover,lanxess,lasalle,lat,latino,latrobe,law,lawyer,lb,lc,lds,lease,leclerc,lefrak,legal,lego,lexus,lgbt,li,liaison,lidl,life,lifeinsurance,lifestyle,lighting,like,lilly,limited,limo,lincoln,linde,link,lipsy,live,living,lixil,lk,loan,loans,local,locker,locus,loft,lol,london,lotte,lotto,love,lpl,lplfinancial,lr,ls,lt,ltd,ltda,lu,lundbeck,lupin,luxe,luxury,lv,ly,ma,macys,madrid,maif,maison,makeup,man,management,mango,market,marketing,markets,marriott,marshalls,maserati,mattel,mba,mc,mcd,mcdonalds,mckinsey,md,me,med,media,meet,melbourne,meme,memorial,men,menu,meo,metlife,mf,mg,mh,miami,microsoft,mil,mini,mint,mit,mitsubishi,mk,ml,mlb,mls,mm,mma,mn,mo,mobi,mobile,mobily,moda,moe,moi,mom,monash,money,monster,montblanc,mopar,mormon,mortgage,moscow,moto,motorcycles,mov,movie,movistar,mp,mq,mr,ms,msd,mt,mtn,mtpc,mtr,mu,museum,mutual,mv,mw,mx,my,mz,na,nab,nadex,nagoya,name,nationwide,natura,navy,nba,nc,ne,nec,net,netbank,netflix,network,neustar,new,newholland,news,next,nextdirect,nexus,nf,nfl,ng,ngo,nhk,ni,nico,nike,nikon,ninja,nissan,nissay,nl,no,nokia,northwesternmutual,norton,now,nowruz,nowtv,np,nr,nra,nrw,ntt,nu,nyc,nz,obi,observer,off,office,okinawa,olayan,olayangroup,oldnavy,ollo,om,omega,one,ong,onl,online,onyourside,ooo,open,oracle,orange,org,organic,orientexpress,origins,osaka,otsuka,ott,ovh,pa,page,pamperedchef,panasonic,panerai,paris,pars,partners,parts,party,passagens,pay,pccw,pe,pet,pf,pfizer,pg,ph,pharmacy,philips,phone,photo,photography,photos,physio,piaget,pics,pictet,pictures,pid,pin,ping,pink,pioneer,pizza,pk,pl,place,play,playstation,plumbing,plus,pm,pn,pnc,pohl,poker,politie,porn,post,pr,pramerica,praxi,press,prime,pro,prod,productions,prof,progressive,promo,properties,property,protection,pru,prudential,ps,pt,pub,pw,pwc,py,qa,qpon,quebec,quest,qvc,racing,radio,raid,re,read,realestate,realtor,realty,recipes,red,redstone,redumbrella,rehab,reise,reisen,reit,reliance,ren,rent,rentals,repair,report,republican,rest,restaurant,review,reviews,rexroth,rich,richardli,ricoh,rightathome,ril,rio,rip,rmit,ro,rocher,rocks,rodeo,rogers,room,rs,rsvp,ru,ruhr,run,rw,rwe,ryukyu,sa,saarland,safe,safety,sakura,sale,salon,samsclub,samsung,sandvik,sandvikcoromant,sanofi,sap,sapo,sarl,sas,save,saxo,sb,sbi,sbs,sc,sca,scb,schaeffler,schmidt,scholarships,school,schule,schwarz,science,scjohnson,scor,scot,sd,se,seat,secure,security,seek,select,sener,services,ses,seven,sew,sex,sexy,sfr,sg,sh,shangrila,sharp,shaw,shell,shia,shiksha,shoes,shop,shopping,shouji,show,showtime,shriram,si,silk,sina,singles,site,sj,sk,ski,skin,sky,skype,sl,sling,sm,smart,smile,sn,sncf,so,soccer,social,softbank,software,sohu,solar,solutions,song,sony,soy,space,spiegel,spot,spreadbetting,sr,srl,srt,ss,st,stada,staples,star,starhub,statebank,statefarm,statoil,stc,stcgroup,stockholm,storage,store,stream,studio,study,style,su,sucks,supplies,supply,support,surf,surgery,suzuki,sv,swatch,swiftcover,swiss,sx,sy,sydney,symantec,systems,sz,tab,taipei,talk,taobao,target,tatamotors,tatar,tattoo,tax,taxi,tc,tci,td,tdk,team,tech,technology,tel,telecity,telefonica,temasek,tennis,teva,tf,tg,th,thd,theater,theatre,tiaa,tickets,tienda,tiffany,tips,tires,tirol,tj,tjmaxx,tjx,tk,tkmaxx,tl,tm,tmall,tn,to,today,tokyo,tools,top,toray,toshiba,total,tours,town,toyota,toys,tp,tr,trade,trading,training,travel,travelchannel,travelers,travelersinsurance,trust,trv,tt,tube,tui,tunes,tushu,tv,tvs,tw,tz,ua,ubank,ubs,uconnect,ug,uk,um,unicom,university,uno,uol,ups,us,uy,uz,va,vacations,vana,vanguard,vc,ve,vegas,ventures,verisign,vermögensberater,vermögensberatung,versicherung,vet,vg,vi,viajes,video,vig,viking,villas,vin,vip,virgin,visa,vision,vista,vistaprint,viva,vivo,vlaanderen,vn,vodka,volkswagen,volvo,vote,voting,voto,voyage,vu,vuelos,wales,walmart,walter,wang,wanggou,warman,watch,watches,weather,weatherchannel,webcam,weber,website,wed,wedding,weibo,weir,wf,whoswho,wien,wiki,williamhill,win,windows,wine,winners,wme,wolterskluwer,woodside,work,works,world,wow,ws,wtc,wtf,xbox,xerox,xfinity,xihuan,xin,xperia,xxx,xyz,yachts,yahoo,yamaxun,yandex,ye,yodobashi,yoga,yokohama,you,youtube,yt,yu,yun,za,zappos,zara,zero,zip,zippo,zm,zone,zuerich,zw".split(","), "бг,бел,дети,ею,католик,ком,мкд,мон,москва,онлайн,орг,рус,рф,сайт,срб,укр".split(","), "qxam,90ae,90ais,d1acj3b,e1a4c,80aqecdr1a,j1aef,d1alf,l1acc,80adxhks,80asehdb,c1avg,p1acf,p1ai,80aswg,90a3ac,j1amh,80ao21a,y9a3aq,9dbq2a,mgbca7dzdo,mgba3a3ejt,mgbayh7gpa,lgbbat1ad8j,mgberp4a5d4ar,mgba7c0bbn0a,mgbc0a9azcg,mgb2ddes,mgbaam7a8h,mgba3a4f16a,mgbbh1a,mgbab2bd,ngbe9e0a,mgbbh1a71e,pgbs0dh,mgbpl2fh,ogbpf8fl,ngbc5azd,mgbtx2b,mgb9awbf,ygbi2ammx,wgbl6a,mgbi4ecexp,fhbei,wgbh1c,mgbx4cd0ab,mgbb9fbpob,4gbrim,mgbt3dhd,mgbai9azgqp6j,mgbgu82a,11b4c3d,c2br7g,h2brj9c,h2breg3eve,h2brj9c8c,i1b6b1a6a2e,54b7fta0cc,45brj9c,45br5cyl,s9brj9c,gecrj9c,3hcrj9c,xkc2dl3a5ee0h,xkc2al3hye2a,clchc0ea0b2g2a9gcd,fpcrj9c3d,2scrj9c,rvc1e0am3e,fzc2c9e2c,42c2d9a,o3cw4h,node,q9jyb4c,gckr3f0f,qcka1pmc,tckwe,cck2b3b,1ck2e1b,bck1b9a5dre4c,eckvdtc9d,rhqv96g,fiq64b,fiqs8s,fiqz9s,fiq228c5hs,vhquv,1qqw23a,vuq861b,nyqy26a,45q11c,55qx5d,55qw42g,kprw13d,kpry57d,czru2d,czrs0t,czr694b,w4rs40l,w4r85el8fhu5dnra,3ds443g,3oq18vl8pn36a,pssy2u,tiq49xqyj,fjq720a,fct429k,estv75g,xhq521b,9krt00a,30rr7y,6qq986b3xl,kput3i,kpu716f,zfr164b,mxtq1m,yfro4i67o,efvy88h,9et52u,rovu88b,nqv7f,b4w605ferd,unup4y,mix891f,mix082f,3pxu8k,pbt977c,6frz82g,nqv7fs00ema,ses554g,hxt814e,5tzm5g,io0a7i,8y0a063a,jlq61u9w7b,flw351e,g2xx48c,gk3at1e,3bst00m,fzys8d69uvgm,kcrx77d1x4a,jvr189m,imr513n,5su34j936bgsg,j6w193g,t60b56a,mk1bu44c,cg4bki,3e0b707e".split(",").map(function(e) {
                return "xn--" + e
            })),
            A = I.reduce(function(e, t) {
                return Math.max(e, t.length)
            }, 0),
            C = new RegExp("([a-zA-Zа-яА-Я\\-_\\.0-9\\+]+@(((?:[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\—\\-\\_]+\\.){1,5})([A-Za-z\\$а-яА-Я\\-\\d]{2,22})))", "ig"),
            S = new RegExp("(https?:\\/\\/)?(((?:[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\—\\-\\_]+\\.){1,5})([A-Za-z\\$а-яА-Я\\-\\d]{2,22})(?:\\:(\\d{2,5}))?)(([\\/?#])(?:\\&amp;|\\&#\\d{2,6};|,[_%]|!|,*[\\wА-Яа-я\\xa8\\xb8\\xc0-\\xffєЄҐґЇїІіЈј\\—\\-\\_@#%?+\\/\\$.~=;:'ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ　-〿＀-￯*]+|(?:\\(|\\[)[\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј\\d&#%;,]+(?:\\)|\\])){0,200})?", "ig"),
            M = "(^|[s.,:'\";>)(]?)((#(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’_\\d]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?)){0,100}(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?))(?:[a-zA-Zа-яА-ЯёіјєїґўЁІЈЄЇҐЎ’_\\d]|(?:&#(?:19[2-9]|(?:[2-9]|1[0-3])[0-9][0-9]);?)){0,100}))(@((?:[a-z0-9_]*[a-z0-9])?(?:(?:.[a-z](?:[a-z0-9_]+[a-z0-9])?)*.[a-z][a-z0-9_]{2,40}[a-z0-9])?))?(?=$|[s.,:'\"&;?<)(]?)"
    },
    212: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "mount", function() {
            return c
        });
        var r = n(275),
            i = n(31),
            a = n(423),
            o = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, u = e[Symbol.iterator](); !(r = (o = u.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && u.return && u.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            u = "_im_join_chat";

        function c(e, t) {
            var n = Object(i.createModule)({
                handlers: function(n, i) {
                    i(e, "click", u, function(e) {
                        return function(e, t) {
                            var n = domData(t, "chat-id"),
                                i = domData(t, "hash");
                            return lockButton(t), Object(r.joinChat)(n, i, e.get()).then(function(n) {
                                var r = o(n, 1)[0];
                                unlockButton(t), e.get().longpoll.push([Object(a.changePeer)(r)])
                            }).catch(function(e) {
                                showFastBox(getLang("mail_join_invite_error_title"), e), unlockButton(t)
                            })
                        }(t, e.target)
                    })
                }
            });
            return {
                unmount: function() {
                    Object(i.destroyModule)(n)
                }
            }
        }
    },
    237: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "post", function() {
            return a
        }), n.d(t, "plainget", function() {
            return o
        }), n.d(t, "plaingetCancelable", function() {
            return u
        });
        var r = window.ajax,
            i = 2;

        function a(e, t, n) {
            return t && (t.im_v = i), new Promise(function(i, a) {
                r.post(e, t, {
                    timeout: n,
                    onDone: function() {
                        i.apply(null, [
                            [].concat(Array.prototype.slice.call(arguments))
                        ])
                    },
                    onFail: function() {
                        return a.apply(null, arguments), !0
                    }
                })
            })
        }

        function o(e, t) {
            return u(e, t, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).request
        }

        function u(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                i = void 0;
            return i = window.XDomainRequest ? new XDomainRequest : r._getreq(), {
                request: new Promise(function(r, a) {
                    var o = void 0,
                        u = Date.now(),
                        c = n.timeout || 60,
                        s = ajx2q(t);
                    if (window.XDomainRequest) i.open("get", e + "?" + s), i.ontimeout = function(e) {
                        a([e, {}])
                    }, i.onerror = function(e) {
                        a([e, {}])
                    }, i.onload = function() {
                        r([i.responseText, {}])
                    }, setTimeout(function() {
                        i.send()
                    }, 0);
                    else {
                        i.onreadystatechange = function() {
                            4 == i.readyState && (clearInterval(o), i.status >= 200 && i.status < 300 ? r([i.responseText, i]) : a([i.responseText, i]))
                        };
                        try {
                            i.open("GET", e + "?" + s, !0)
                        } catch (e) {
                            return a([e, i])
                        }
                        i.send()
                    }
                    o = setInterval(function() {
                        Date.now() - u > 1e3 * c && (a(["", {}]), clearInterval(o))
                    }, 1e3)
                }),
                cancel: function() {
                    i.abort()
                }
            }
        }
    },
    24: function(e, t, n) {
        "use strict";
        n.r(t);
        var r = n(482),
            i = n(406),
            a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            o = window.WriteBox = {
                mrg: function(e) {
                    return vk.rtl ? {
                        marginRight: e
                    } : {
                        marginLeft: e
                    }
                },
                show: function(e, t) {
                    var n = t.toData[0],
                        i = t.toData[7];
                    if (e.setOptions({
                            hideButtons: !0,
                            width: 502,
                            bodyStyle: "padding: 0px; border: 0px;",
                            title: t.title,
                            titleControls: ('<a class="mail_box_header_link" href="/im?sel=' + n + '" onclick="return WriteBox.toFull(event, ' + n + ')">' + t.mail_go_to_dialog + "</a>").replace("%s", i)
                        }), e.removeButtons(), cur.lang = extend(cur.lang || {}, t.lang), extend(cur, {
                            mbTxtInp: {},
                            mbEditable: t.editable,
                            mbSmile: ge("mbe_smile"),
                            toData: t.toData,
                            mbEmoji: t.emoji,
                            mbMedia: null,
                            mbField: ge(t.editable ? "mail_box_editable" : "mail_box_text"),
                            mbAva: ge("mail_box_ava"),
                            mbMediaTypes: t.mediaTypes,
                            mbTo: t.toData,
                            mbHash: t.hash,
                            mbBannedHim: t.bannedhim,
                            ldb: Object(r.mount)(vk.id)
                        }), t.emojiRcnt && !cur.mbRcntEmoji) {
                        for (var a = [], u = t.emojiRcnt, c = 0, s = u.length; c < s; ++c) {
                            var d = u[c];
                            d && a.push('<a id="mbe_rc_em_' + d + '" class="mbe_rc_emojibtn" onmousedown="Emoji.addEmoji(cur.emojiWId, \'' + d + "', this); return cancelEvent(event);\">" + Emoji.getEmojiHTML(d, !1, !0) + "</a>")
                        }
                        cur.mbRcntEmoji = a.join("")
                    }
                    cur.nav.push(function() {
                        cur.ldb.unmount()
                    }), val("mbe_rcemoji", cur.mbRcntEmoji || ""), cur.peer = o.getPeer(), cur.sharedImWrite = {}, cur.emojiWId = Emoji.init(cur.mbField, {
                        ttDiff: 1,
                        controlsCont: ge("mbe_emoji_wrap"),
                        shouldFocus: !0,
                        onSend: o.send,
                        rPointer: !0,
                        noEnterSend: 1,
                        ref: "writebox",
                        noStickers: !!t.checkedRecipent,
                        forceTxt: !t.editable,
                        sharedTT: cur.sharedImWrite,
                        txt: ge("mail_box_editable"),
                        checkEditable: o.checkEditable,
                        saveDraft: o.saveDraft,
                        rceCont: ge("mbe_rcemoji_cont"),
                        addMediaBtn: ge("mail_box_add_row"),
                        sendWrap: ge("mail_box_controls"),
                        onKeyAction: function(e) {
                            clearTimeout(cur.saveWriteBoxDraft);
                            var t = "paste" == e.type ? 0 : 300;
                            cur.saveWriteBoxDraft = setTimeout(o.saveDraft, t)
                        },
                        onStickerSend: function(e, t) {
                            var n = trim(Emoji.editableVal(cur.mbField)),
                                r = cur.mbMedia.getMedias(),
                                i = cur.toData[0];
                            ajax.post("/al_im.php", {
                                act: "a_send_box",
                                to_ids: i,
                                chas: cur.mbHash,
                                msg: "",
                                ts: cur.ts,
                                media: "sticker:" + e,
                                send_sticker: 1,
                                from: "box",
                                sticker_referrer: t
                            }, {
                                onDone: function(e, t) {
                                    n || r.length ? o.send(!1) : (t && ls.set("im_draft" + vk.id + "_" + t, !1), curBox().hide(), showDoneBox(e))
                                },
                                showProgress: lockButton.pbind("mail_box_send"),
                                hideProgress: unlockButton.pbind("mail_box_send"),
                                onFail: function(e) {
                                    var t = showFastBox(getLang("global_error"), e).hide;
                                    return setTimeout(t, 3e3), !0
                                }
                            })
                        },
                        onRecentEmojiUpdate: function() {
                            o.extractEmoji()
                        }
                    }), Emoji.emojiLoadMore(cur.emojiWId), cur.mbTo[0] ? cur.mbHidden = !1 : cur.mbHidden = !0, cur.imwEmoji = -1;
                    var l = cur.postTo;
                    cur.postTo = !1, e.setOptions({
                        onHide: function() {
                            removeEvent(document, "keydown", o.onKey), cur.mbEmojiShown && Emoji.ttClick(cur.emojiWId, cur.mbSmile, !0), cur.mbOnMouseClick && (cur.onMouseClick = cur.mbOnMouseClick, cur.mbOnMouseClick = !1), browser.mozilla
                        },
                        onShow: function() {
                            addEvent(document, "keydown", o.onKey), cur.mbOnMouseClick || (cur.mbOnMouseClick = cur.onMouseClick), browser.mozilla, cur.sorterClbk && (cur.sorterClbk(), delete cur.sorterClbk)
                        },
                        onClean: function() {
                            clearTimeout(cur.mbSaveDraftTO), delete cur.mbSaveDraftTO, delete cur.mbField, cur.postTo = l, cur.mbEmojiScroll = cur.mbEmojiExpanded = !1, cur.mbForceAttach = !1, window.WideDropdown && WideDropdown.deinit("mail_box_dd")
                        }
                    }), addEvent(document, "keydown", o.onKey), cur.mbOnMouseClick || (cur.mbOnMouseClick = cur.onMouseClick), stManager.add(["page.js", "page.css"], function() {
                        var t = {
                            mail: 1,
                            nocl: 1,
                            editable: 1,
                            sortable: 1,
                            teWidth: 150,
                            teHeight: 100,
                            toggleLnk: !0
                        };
                        cur.mbForceAttach && "market" == cur.mbForceAttach[0] && (t.onMediaAdd = function() {
                            for (var e in cur.mbMedia.chosenMedias)
                                if ("market" == cur.mbMedia.chosenMedias[e][0]) {
                                    var t = cur.mbMedia.chosenMedias[e][2];
                                    hide(geByClass1("page_media_x_wrap", t))
                                }
                        }), cur.mbMedia = new MediaSelector("mail_box_add_link", "mail_box_added_row", cur.mbMediaTypes, t), cur.mbMedia.onChange = function() {
                            e.changed = !0, setTimeout(function() {
                                o.saveDraft()
                            }, 100)
                        }, ls.checkVersion() && cur.mbTo[0] && o.restoreDraft(cur.mbTo[0])
                    })
                },
                getPeer: function() {
                    return intval(cur.toData[0])
                },
                restoreDraft: function(e) {
                    var t = o.getPeer();
                    if (!(!t || e && t != intval(e) || browser.mobile) && cur.mbMedia) {
                        var n = Object(i.loadDraftForPeer)(cur.ldb, t);
                        cur.mbForceAttach && "market" == cur.mbForceAttach[0] && (n.setText(unclean(getLang("mail_market_tmpl")).replace(/<br>/g, "\n")), n.removeAllAttaches(), n.addAttach("market", cur.mbForceAttach[1])), o.editableHasVal(cur.mbField) || (cur.mbEditable ? (Emoji.val(cur.mbField, clean(n.dData.txt)), window.Emoji && Emoji.editableFocus(cur.mbField, !1, !0)) : val(cur.mbField, clean(n.dData.txt))), n.prepareObjects().then(function() {
                            if (cur.mbField && o.getPeer() == t)
                                for (var e = n.dData.attaches, r = 0; r < e.length; r++) cur.mbMedia.chooseMedia(e[r].type, e[r].id, e[r].object || {}, null, !0)
                        }), o.checkEditable(cur.emojiWId, cur.mbField), o.checkLen(cur.mbField)
                    }
                },
                saveDraft: function() {
                    var e = o.getPeer();
                    if (e && cur.mbField) {
                        var t = Object(i.loadDraftForPeer)(cur.ldb, e);
                        t.setText(unclean(trim(Emoji.val(cur.mbField)))), t.removeAllAttaches(), cur.mbMedia.getMedias().forEach(function(e) {
                            return t.addAttach(e[0], e[1])
                        }), t.destroy()
                    }
                },
                toFull: function(e, t) {
                    if (!checkEvent(e)) {
                        var n = {
                                0: "im",
                                sel: t
                            },
                            r = trim(Emoji.editableVal(cur.mbField));
                        if (r && (n.message = r), cur.mbMedia.chosenMedias) {
                            for (var i = cur.mbMedia.getMedias(), o = [], u = 0, c = i.length; u < c; ++u) {
                                var s = i[u],
                                    d = [];
                                for (var l in s) "object" != a(s[l]) && d.push(s[l]);
                                o.push(d.join(","))
                            }
                            n.media = o.join("*")
                        }
                        return nav.go(n, null, {
                            noback: !0
                        }), !1
                    }
                },
                send: function(e) {
                    if (!buttonLocked("mail_box_send")) {
                        var t = trim(Emoji.editableVal(cur.mbField)),
                            n = cur.mbMedia.getMedias();
                        cur.mbEditable && o.extractEmoji();
                        var r = {
                            act: "a_send_box",
                            chas: cur.mbHash,
                            message: t,
                            title: isVisible("mail_box_title_wrap") && val("mail_box_title") || "",
                            from: "box",
                            entrypoint: "friends" === cur.module ? "friends" : "writebox",
                            media: [],
                            to_ids: []
                        };
                        cur.mbForceAttach && (r.attach1_type = cur.mbForceAttach[0], r.attach1 = cur.mbForceAttach[1], r.attach1_hash = cur.mbForceAttach[2]);
                        for (var a, u = 0, c = n.length; u < c; ++u)(a = n[u]) && r.media.push(a[0] + ":" + a[1]);
                        if (r.media = r.media.join(","), !t && !r.media) return cur.mbEditable ? Emoji.editableFocus(cur.mbField) : elfocus(cur.mbField);
                        r.to_ids = cur.toData[0], cur.mbBannedHim != r.to_ids || !0 === e ? ajax.post("al_im.php", r, {
                            onDone: function(e, t) {
                                if (t) {
                                    var n = Object(i.loadDraftForPeer)(cur.ldb, t);
                                    n.clear(), n.destroy()
                                }
                                curBox().hide(), showDoneBox(e)
                            },
                            showProgress: lockButton.pbind("mail_box_send"),
                            hideProgress: unlockButton.pbind("mail_box_send")
                        }) : showBox("al_profile.php", {
                            act: "banned_him",
                            action: "mail",
                            mid: cur.mbBannedHim
                        }, {
                            dark: 1
                        }).onContinue = o.send.pbind(!0)
                    }
                },
                checkLen: function(e) {
                    cur.mbTxtInp.value = Emoji.editableVal(e), checkTextLength(4096, cur.mbTxtInp, "mail_box_warn"), toggle("mail_box_title_wrap", cur.mbTxtInp.lastLen > 200)
                },
                codeToChr: function(e) {
                    for (var t = e.length / 4, n = "", r = 0; t--;) n += String.fromCharCode(parseInt(e.substr(r, 4), 16)), r += 4;
                    return n
                },
                editableHasVal: function(e) {
                    return !!e && ("TEXTAREA" == e.tagName ? !!val(e) : !(!geByTag1("IMG", e) && !stripHTML(val(e)).replace(/[\s\xa0]/g, "").length))
                },
                checkEditable: function(e, t) {
                    cur.mbEditable && Emoji.checkEditable(e, t, {
                        height: 180
                    })
                },
                cssAnimation: function() {
                    var e = intval(browser.version);
                    return !!(browser.chrome && e > 14 || browser.mozilla && e > 13 || browser.opera && e > 2)
                },
                onKey: function(e) {
                    var t = "INPUT" == e.target.tagName || "TEXTAREA" == e.target.tagName || "mail_box_editable" == e.target.id;
                    if (!isInputActive()) {
                        if (e.keyCode > 40 && !e.ctrlKey && !e.metaKey && !t)
                            if (cur.mbEditable) Emoji.editableFocus(cur.mbField, !1, !0);
                            else {
                                var n = cur.mbField;
                                !n.active && elfocus(n)
                            }
                        return !0
                    }
                },
                extractEmoji: function() {
                    var e = ge("mbe_rcemoji");
                    if (e) {
                        var t = "",
                            n = Emoji.getRecentEmojiSorted().slice(0, 7);
                        for (var r in n)
                            if (n.hasOwnProperty(r)) {
                                var i = n[r];
                                t += '<a id="mbe_rc_em_' + i + '" class="mbe_rc_emojibtn" onmousedown="Emoji.addEmoji(cur.emojiWId, \'' + i + "', this); return cancelEvent(event);\">" + Emoji.getEmojiHTML(i, !1, !0) + "</a>"
                            }
                        val(e, t)
                    }
                }
            };
        try {
            stManager.done("writebox.js")
        } catch (e) {}
    },
    27: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "addDelegateEvent", function() {
            return o
        }), n.d(t, "removeDelegateEvent", function() {
            return u
        });
        var r = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, u = e[Symbol.iterator](); !(r = (o = u.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && u.return && u.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            i = new window.Map;

        function a(e) {
            var t = i.get(e.currentTarget);
            if (t) {
                var n = t[e.type];
                if (n)
                    for (var a = void 0, o = 0; o < n.length; o++) {
                        var u = r(n[o], 2),
                            c = u[0],
                            s = u[1],
                            d = void 0;
                        if (hasClass(e.target, c) ? d = s(e, e.target) : (a = gpeByClass(c, e.target, e.currentTarget)) && (d = s(e, a)), !1 === d) break
                    }
            }
        }

        function o(e, t, n, r) {
            var o = i.get(e);
            o || (i.set(e, {}), o = i.get(e));
            for (var u = t.split(" "), c = 0; c < u.length; c++) {
                var s = u[c];
                o[s] || (o[s] = [], addEvent(e, s, a)), o[s].push([n, r])
            }
        }

        function u(e, t, n, r) {
            var o = i.get(e);
            o && (t.split(" ").forEach(function(t) {
                o[t] && (o[t] = o[t].filter(function(e) {
                    return e[0] !== n || e[1] !== r
                }), 0 === o[t].length && removeEvent(e, t, a))
            }), 0 === Object.keys(o).map(function(e) {
                return o[e].length
            }).reduce(function(e, t) {
                return e + t
            }) && i.delete(e))
        }
    },
    275: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "CONTROLLER", function() {
            return O
        }), n.d(t, "TYPING_PERIOD", function() {
            return j
        }), n.d(t, "ACTION_PRIORITIES", function() {
            return C
        }), n.d(t, "loadHashes", function() {
            return S
        }), n.d(t, "strHistory", function() {
            return P
        }), n.d(t, "updateBlockStates", function() {
            return L
        }), n.d(t, "loadPeer", function() {
            return N
        }), n.d(t, "restoreHistoryQueue", function() {
            return R
        }), n.d(t, "removeFailed", function() {
            return F
        }), n.d(t, "selectPeer", function() {
            return U
        }), n.d(t, "selectPeerOnMessage", function() {
            return G
        }), n.d(t, "changePeer", function() {
            return z
        }), n.d(t, "updateMentions", function() {
            return q
        }), n.d(t, "setActions", function() {
            return K
        }), n.d(t, "loadMoreHistory", function() {
            return V
        }), n.d(t, "loadLessHistory", function() {
            return W
        }), n.d(t, "readLastMessages", function() {
            return X
        }), n.d(t, "loadLongPollKey", function() {
            return $
        }), n.d(t, "loadLongPollTs", function() {
            return Q
        }), n.d(t, "setMessageErrored", function() {
            return Z
        }), n.d(t, "resendMessage", function() {
            return J
        }), n.d(t, "loadAdmins", function() {
            return te
        }), n.d(t, "updateVideoThumb", function() {
            return ie
        }), n.d(t, "editMessage", function() {
            return ae
        }), n.d(t, "addMessage", function() {
            return oe
        }), n.d(t, "markInboundMessagesAsRead", function() {
            return ce
        }), n.d(t, "markOutboundMessagesAsRead", function() {
            return de
        }), n.d(t, "initTextStore", function() {
            return le
        }), n.d(t, "processFwd", function() {
            return fe
        }), n.d(t, "mergeTabs", function() {
            return me
        }), n.d(t, "updateOnline", function() {
            return ge
        }), n.d(t, "setTyping", function() {
            return pe
        }), n.d(t, "waitTyping", function() {
            return he
        }), n.d(t, "sendMessage", function() {
            return ve
        }), n.d(t, "deliverMessage", function() {
            return ye
        }), n.d(t, "deliverEditedMessage", function() {
            return we
        }), n.d(t, "addSelection", function() {
            return Oe
        }), n.d(t, "cleanSelected", function() {
            return je
        }), n.d(t, "dropSelection", function() {
            return ke
        }), n.d(t, "replaceMessage", function() {
            return Ee
        }), n.d(t, "saveMedia", function() {
            return Te
        }), n.d(t, "loadMedia", function() {
            return Ie
        }), n.d(t, "addAttachmentsToStoreData", function() {
            return Ae
        }), n.d(t, "replaceMediaAttachesStore", function() {
            return Ce
        }), n.d(t, "setCurrentSearchDate", function() {
            return Se
        }), n.d(t, "setInplaceSearch", function() {
            return Me
        }), n.d(t, "setCurrentSearch", function() {
            return xe
        }), n.d(t, "searchHints", function() {
            return De
        }), n.d(t, "searchHintsIndex", function() {
            return Pe
        }), n.d(t, "localIndexToDialog", function() {
            return Le
        }), n.d(t, "searchTopConv", function() {
            return Re
        }), n.d(t, "searchImTopConv", function() {
            return Fe
        }), n.d(t, "searchLocalHints", function() {
            return He
        }), n.d(t, "preloadSearchIndex", function() {
            return Ue
        }), n.d(t, "loadDialogs", function() {
            return Be
        }), n.d(t, "searchMessages", function() {
            return Ge
        }), n.d(t, "isSearchAllLoaded", function() {
            return ze
        }), n.d(t, "isSearchingInplace", function() {
            return qe
        }), n.d(t, "cancelSearch", function() {
            return Ke
        }), n.d(t, "clearDate", function() {
            return Ve
        }), n.d(t, "searchInplaceStart", function() {
            return We
        }), n.d(t, "searchMessagesInplace", function() {
            return Ye
        }), n.d(t, "loadImportant", function() {
            return Xe
        }), n.d(t, "loadActualLastMessage", function() {
            return $e
        }), n.d(t, "removeMessagesMarkDeleted", function() {
            return Qe
        }), n.d(t, "removeMessages", function() {
            return Ze
        }), n.d(t, "removeMessageSend", function() {
            return Je
        }), n.d(t, "removeMessagesWithRestore", function() {
            return et
        }), n.d(t, "restoreMessage", function() {
            return tt
        }), n.d(t, "restoreMessageSend", function() {
            return nt
        }), n.d(t, "sendTyping", function() {
            return rt
        }), n.d(t, "forwardMessages", function() {
            return it
        }), n.d(t, "prepareForward", function() {
            return at
        }), n.d(t, "deletedDialog", function() {
            return ot
        }), n.d(t, "flushHistory", function() {
            return ut
        }), n.d(t, "updateChatTopic", function() {
            return ct
        }), n.d(t, "loadChatInfo", function() {
            return st
        }), n.d(t, "addNewMemberOptimisticly", function() {
            return dt
        }), n.d(t, "addNewMember", function() {
            return lt
        }), n.d(t, "loadChatMember", function() {
            return ft
        }), n.d(t, "checkNewPeople", function() {
            return mt
        }), n.d(t, "loadNewPeople", function() {
            return gt
        }), n.d(t, "updateChatPhoto", function() {
            return pt
        }), n.d(t, "updateActions", function() {
            return ht
        }), n.d(t, "leaveChat", function() {
            return _t
        }), n.d(t, "returnToChat", function() {
            return bt
        }), n.d(t, "toggleMutePeer", function() {
            return vt
        }), n.d(t, "setMutedPeer", function() {
            return yt
        }), n.d(t, "setExecStack", function() {
            return wt
        }), n.d(t, "favMessage", function() {
            return Ot
        }), n.d(t, "updateFavMessage", function() {
            return jt
        }), n.d(t, "updateImportant", function() {
            return kt
        }), n.d(t, "loadSpam", function() {
            return Et
        }), n.d(t, "flushSpam", function() {
            return Tt
        }), n.d(t, "setCreationType", function() {
            return It
        }), n.d(t, "getOwnerPhoto", function() {
            return At
        }), n.d(t, "presetAvatar", function() {
            return Ct
        }), n.d(t, "setChatPhoto", function() {
            return St
        }), n.d(t, "createChat", function() {
            return Mt
        }), n.d(t, "resync", function() {
            return xt
        }), n.d(t, "toggleSendingAbility", function() {
            return Dt
        }), n.d(t, "setDelayedMessage", function() {
            return Pt
        }), n.d(t, "isAnythingLoading", function() {
            return Lt
        }), n.d(t, "updateUnreadCount", function() {
            return Nt
        }), n.d(t, "changeSubmitSettings", function() {
            return Rt
        }), n.d(t, "updateFavAndTitle", function() {
            return Ft
        }), n.d(t, "saveHistoryScroll", function() {
            return Ht
        }), n.d(t, "filterFromTab", function() {
            return Ut
        }), n.d(t, "changeDialogsTab", function() {
            return Bt
        }), n.d(t, "updateFolderState", function() {
            return zt
        }), n.d(t, "toggleDialogImportant", function() {
            return qt
        }), n.d(t, "markDialogAnswered", function() {
            return Kt
        }), n.d(t, "getMutexQueue", function() {
            return Vt
        }), n.d(t, "releaseBlock", function() {
            return Wt
        }), n.d(t, "toggleCommunityMute", function() {
            return Yt
        }), n.d(t, "deleteDialog", function() {
            return Xt
        }), n.d(t, "restoreDialog", function() {
            return $t
        }), n.d(t, "spamDialog", function() {
            return Qt
        }), n.d(t, "updateTabbedPeers", function() {
            return Zt
        }), n.d(t, "isEverythingLoaded", function() {
            return Jt
        }), n.d(t, "cleanTab", function() {
            return en
        }), n.d(t, "stringifyTab", function() {
            return tn
        }), n.d(t, "updateGoToEndVisibility", function() {
            return nn
        }), n.d(t, "toggleCommunityMessages", function() {
            return rn
        }), n.d(t, "updateHistory", function() {
            return an
        }), n.d(t, "startRecording", function() {
            return on
        }), n.d(t, "cancelRecording", function() {
            return un
        }), n.d(t, "setVoiceMessageAvail", function() {
            return cn
        }), n.d(t, "toggleConversation", function() {
            return sn
        }), n.d(t, "updateSearchQuery", function() {
            return dn
        }), n.d(t, "initializeChatResize", function() {
            return ln
        }), n.d(t, "joinChat", function() {
            return fn
        }), n.d(t, "getInviteLink", function() {
            return mn
        }), n.d(t, "resetInviteLink", function() {
            return gn
        }), n.d(t, "leaveInvitation", function() {
            return pn
        }), n.d(t, "saveRecentSearchPeer", function() {
            return hn
        }), n.d(t, "resetRecentSearch", function() {
            return _n
        }), n.d(t, "removeFromRecentSearch", function() {
            return bn
        }), n.d(t, "pinMessageOptimistic", function() {
            return vn
        }), n.d(t, "unpinMessageOptimistic", function() {
            return yn
        }), n.d(t, "pinMessage", function() {
            return wn
        }), n.d(t, "unpinMessage", function() {
            return On
        }), n.d(t, "getPinnedMessage", function() {
            return jn
        }), n.d(t, "getMessageLocalId", function() {
            return kn
        }), n.d(t, "getChatMembers", function() {
            return En
        }), n.d(t, "getChatDetails", function() {
            return Tn
        }), n.d(t, "updateFlags", function() {
            return In
        }), n.d(t, "removeChatPhoto", function() {
            return An
        }), n.d(t, "kickUserOptimisticly", function() {
            return Cn
        }), n.d(t, "kickUser", function() {
            return Sn
        }), n.d(t, "toggleAdminOptimisticly", function() {
            return Mn
        }), n.d(t, "toggleAdmin", function() {
            return xn
        }), n.d(t, "checkChatMember", function() {
            return Dn
        }), n.d(t, "hidePromoTooltip", function() {
            return Pn
        }), n.d(t, "videoAutoPlayHandler", function() {
            return Ln
        }), n.d(t, "hideTopBannerAction", function() {
            return Nn
        }), n.d(t, "callbackTopBannerAction", function() {
            return Rn
        }), n.d(t, "loadBanner", function() {
            return Fn
        }), n.d(t, "setKeyboard", function() {
            return Hn
        }), n.d(t, "deleteKeyboard", function() {
            return Un
        }), n.d(t, "toggleKeyboard", function() {
            return Bn
        }), n.d(t, "loadKeyboard", function() {
            return Gn
        }), n.d(t, "changeCommunityAccess", function() {
            return zn
        }), n.d(t, "deleteTemplate", function() {
            return qn
        }), n.d(t, "createTemplate", function() {
            return Kn
        }), n.d(t, "updateTemplate", function() {
            return Vn
        }), n.d(t, "resetTabAll", function() {
            return Wn
        });
        var r = n(237),
            i = n(479),
            a = n(423),
            o = n(149),
            u = n(29),
            c = n(482),
            s = n(30),
            d = n(163),
            l = n(104),
            f = n(322),
            m = n(72),
            g = n(277),
            p = n(452),
            h = n(470),
            _ = n(360),
            b = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
                }
                return e
            },
            v = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, u = e[Symbol.iterator](); !(r = (o = u.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && u.return && u.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function y(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        function w(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }
        var O = "al_im.php",
            j = 5,
            k = 8,
            E = Object(i.updateLazyLocation)(),
            T = E.scheduleNav,
            I = E.commitNav,
            A = E.scheduleNavWithTimeOut;
        var C = {
            settings: 0,
            block: 1,
            fav: 1,
            chat: 2,
            invite: 2,
            invite_link: 3,
            topic: 3,
            avatar: 4,
            photos: 5,
            search: 6,
            pin_hide: 7,
            pin_unhide: 7,
            unpin: 8,
            mute: 10,
            unmute: 10,
            clear: 11,
            leave: 12,
            return: 12,
            block_community: 12,
            allow_community: 12
        };

        function S(e, t, n) {
            return Object(r.post)(O, {
                act: "a_renew_hash",
                peers: e.join(","),
                gid: t.hidegid ? void 0 : n.gid
            })
        }

        function M(e, t, n) {
            return function(e) {
                return e.resync_in_process ? e.resync_in_process : Promise.resolve(!1)
            }(e).then(function(r) {
                return r ? t.apply(void 0, w(n)) : function(e) {
                    if (!e.renew_hashes) {
                        var t = e.last_hashes_update || 0;
                        if (Date.now() - t < 1e4) return Promise.resolve();
                        var n = Object.keys(e.tabs).filter(function(t) {
                            return Object(s.isFullyLoadedTab)(e, t)
                        });
                        e.renew_hashes = S(n, {}, e).then(function(t) {
                            var r = v(t, 2),
                                i = r[0],
                                a = r[1];
                            return n.forEach(function(t) {
                                e.tabs[t].hash = i[t]
                            }), e.writeHash = a, delete e.renew_hashes, e.last_hashes_update = Date.now(), e
                        })
                    }
                    return e.renew_hashes
                }(e).then(function(e) {
                    return t.apply(void 0, w(n))
                })
            })
        }

        function x(e) {
            return function() {
                var t = arguments,
                    n = t[t.length - 1];
                return e.apply(void 0, w(t)).catch(function(r) {
                    if (r && r.match && r.match(/1001;/)) return M(n, e, t);
                    throw r
                })
            }
        }

        function D(e) {
            return "string" == typeof e ? se("<div>" + e + "</div>") : e
        }

        function P(e) {
            return "string" == typeof e ? e : e.innerHTML
        }

        function L(e, t) {
            return t.block_states = extend(t.block_states, e), Promise.resolve(t)
        }

        function N(e, t, n, i, a) {
            return a.tabHistoryNotChanged = !1, Object(o.retryFn)(r.post, 3, function(e) {
                return e - 1
            })(O, {
                act: "a_start",
                peer: e,
                msgid: n,
                history: t,
                prevpeer: a.prevPeer,
                gid: a.gid,
                block: i
            }).then(function(t) {
                var r = v(t, 5),
                    i = r[0],
                    o = r[1],
                    u = r[2],
                    c = r[3],
                    d = r[4];
                if (o.forEach(function(e) {
                        return Object(m.oCacheAdd)(a, e)
                    }), a.tabs || (a.tabs = {}), a.dialog_tab_cts = d, a.tabs[e] || (a.tabs[e] = Object(s.normalizeTab)(a, i)), L(c, a), n) {
                    if (a.tabs[e]) {
                        var l = a.tabs[e].lastmsg,
                            f = a.tabs[e].lastmsg_meta;
                        extend(a.tabs[e], i), a.tabs[e].lastmsg = l, a.tabs[e].lastmsg_meta = f
                    }
                } else extend(a.tabs[e], i);
                return a.admins = extend(a.admins, u), a.imQueue(e, !1), Ln(), R(e, a)
            }).catch(function(e) {
                return Object(g.imWeirdCatch)("loadPeer", e)
            })
        }

        function R(e, t) {
            var n = t.imQueue(e, !1),
                r = t.tabs[e],
                i = n.filter(function(n) {
                    return !Object(l.isRidExist)(t, e, n.rid)
                });
            return r.msgs = i.reduce(function(e, t) {
                return e["rid" + t.rid] = t.mess, e
            }, r.msgs), t.imQueueSet(e, i), t.tabs[e].history = Object(s.restoreQueue)(i, t, D(t.tabs[e].history)), Promise.resolve(t)
        }

        function F(e, t, n) {
            var r = n.imQueue(e, !1).filter(function(e) {
                return e.failed && e.mess.messageId !== t
            });
            return n.imQueueSet(e, r), n.tabs[e].history = Object(s.removeMessages)([t], D(n.tabs[e].history)), Promise.resolve(n)
        }

        function H(e, t) {
            return !1 === (t.block_states[e] || {}).free ? Promise.resolve(t) : Object(r.post)(O, {
                act: "a_block",
                peer: e,
                prevPeer: t.prevPeer,
                gid: t.gid
            }).then(function(e) {
                return L(v(e, 1)[0], t)
            })
        }

        function U(e, t) {
            var n = t.peer;
            return Promise.resolve(t).then(function(t) {
                return t.tabHistoryNotChanged = !1, Object(s.isFullyLoadedTab)(t, n) && !t.tabs[n].msgid ? (t.gid && H(n, t), Promise.resolve(t).then(K)) : (Object(s.isFullyLoadedTab)(t, n) && (t.tabs[n].msgid = !1), N(n, e, !1, !0, t))
            }).then(K).then(B.bind(null, n))
        }

        function B(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return Object(s.isTabLoaded)(t, e) && (t.tabs[e].last_touched = Date.now()), Object(s.isTabLoaded)(t, e) && n && (t.tabs[e].last_visited = Date.now()), t
        }

        function G(e, t, n) {
            var r = n.msgid,
                i = n.peer;
            return !e && Object(s.isFullyLoadedTab)(n, i) && n.tabs[i].msgs[r] ? (t === n.peer ? n.tabHistoryNotChanged = !0 : n.tabHistoryNotChanged = !1, n.gid && H(i, n), Promise.resolve(n).then(K).then(B.bind(null, i))) : N(i, !0, r, !0, n).then(K).then(function() {
                return Object(l.getTab)(n, i).msgid = r, n
            }).then(B.bind(null, i))
        }

        function z(e, t, n, r) {
            if (Lt(r)) throw Object(s.showWaitUntilUploadedBox)(), new Error("Cant change peer while loading something");
            var i = r.gid ? "gim" + r.gid : "im";
            if (r.prevPeer = r.peer, r.peer = e, r.msgid = t || "", r.currentEntryPoint = n, cur.peer = e, T({
                    sel: e ? Object(s.convertPeerToUrl)(e) : null,
                    msgid: r.msgid,
                    email: "",
                    0: i
                }), 0 != r.prevPeer && B(r.prevPeer, r, !0), 0 !== e) {
                Object(s.isTabLoaded)(r, e) && B(e, r, !0), Zt(r.tabbedPeers.map(function(e) {
                    return e.peer
                }).indexOf(e) < 0 ? [{
                    peer: e,
                    type: "perm"
                }].concat(r.tabbedPeers) : r.tabbedPeers.map(function(t) {
                    return t.peer == e && "perm" !== t.type && (t.type = "perm"), t
                }), !1, r)
            } else Zt(r.tabbedPeers, !1, r);
            return I(), Ke(r.prevPeer, r)
        }

        function q(e) {
            cur.wallMentions = function() {
                return new Promise(function(t, n) {
                    if (cur.wallMentions = [], !Object(s.isChatPeer)(e.peer) || !Object(s.isFullyLoadedTab)(e, e.peer) || Object(s.isFvkcomgroup)(e, e.peer)) return n();
                    var r = e.tabs[e.peer];

                    function i() {
                        var n = [];
                        Object.keys(r.msgs || {}).reverse().forEach(function(e) {
                            var t = Object(l.parserMessage)(r.msgs[e]),
                                i = t && t.userId;
                            i && i != vk.id && -1 === n.indexOf(i) && Object(s.isUserAliveInChat)(r, i) && n.push(i)
                        }), (r.memberIds || []).forEach(function(e) {
                            -1 === n.indexOf(e) && n.push(e)
                        });
                        var i = [];
                        n.forEach(function(t) {
                            if (Object(m.oCacheExists)(e, t)) {
                                var n = Object(m.oCacheGet)(e, t),
                                    r = n.link.substring(1);
                                i.push([n.id, n.name, "@" + r, n.photo, void 0, void 0, void 0, r, n.first_name])
                            }
                        }), t(i)
                    }
                    r.membersLoaded ? i() : En(e.peer, e).then(i)
                })
            }
        }

        function K(e) {
            var t = e.peer;
            if (0 === t) return Promise.resolve(e);
            var n = e.tabs[t],
                r = [],
                i = Object(s.isChatPeer)(t) && (n.data.closed || n.data.kicked),
                a = Object(s.isFvkcomgroup)(e, t);
            n.offset && r.push("photos"), n.offset && r.push("search"), (t < -2e9 || n.offset) && !a && r.push("clear"), Object(s.isCommunityInterface)(e) && !a && r.push("block"), Object(s.isCommunityPeer)(t) && (n.blocked_community ? r.push("allow_community") : r.push("block_community")), !Object(s.isChatPeer)(t) && !Object(s.isUserPeer)(t) || Object(s.isCommunityInterface)(e) || Object(s.isChatPeer)(t) && (n.data.kicked || n.data.closed) || (inArray(t, e.mutedPeers) ? r.push("unmute") : r.push("mute")), Object(s.isUserPeer)(t) && !e.gid && !n.blacklisted && n.is_friend && r.push("invite"), !e.chatSettingsAllowed && Object(s.isChatPeer)(t) && !i && n.data.link && r.push("invite_link"), Object(s.isChatPeer)(t) && !i && (e.chatSettingsAllowed || (Object(h.canChangeTitle)(e) && r.push("topic"), Object(h.canChangeAvatar)(e) && r.push("avatar")), Object(h.canInviteUser)(e) && r.push("invite"), e.gid || r.push("leave")), Object(s.isChatPeer)(t) && n.data.closed && !n.data.kicked && r.push("return"), Object(s.isChatPeer)(t) && e.chatSettingsAllowed && !n.data.closed && !n.data.kicked && r.push("settings"), Object(s.isChatPeer)(t) && n.pinned && (r.push(Object(p.isPinnedMessageVisibleInTab)(e, t) ? "pin_hide" : "pin_unhide"), Object(h.canPinOrUnpin)(e) && r.push("unpin"));
            var o = Object(s.chatActions)(e, a);
            return e.curActions = r.sort(function(e, t) {
                return C[e] - C[t]
            }).reduce(function(e, t) {
                return e[t] = o[t], e
            }, {}), Promise.resolve(e)
        }

        function V(e, t, n) {
            var i = n.tabs[n.peer];
            return Object(r.post)(O, {
                peer: n.peer,
                whole: e,
                act: "a_history",
                offset: i.offset + (i.skipped || 0),
                toend: t,
                gid: n.gid
            }).then(function(e) {
                var t = v(e, 4),
                    r = t[0],
                    a = t[1],
                    o = t[2],
                    u = t[3];
                return i.allShown = o, n.admins = extend(n.admins, u), i.history = r + P(i.history), i.historyToAppend = r, i.offset += Object.keys(a).length, i.msgs = extend(i.msgs, a), n
            })
        }

        function W(e) {
            var t = e.tabs[e.peer];
            return Object(r.post)(O, {
                peer: e.peer,
                act: "a_history",
                rev: 1,
                offset: t.skipped,
                gid: e.gid
            }).then(function(n) {
                var r = v(n, 5),
                    i = r[0],
                    a = r[1],
                    o = r[2];
                r[3], r[4];
                t.allShown = t.allShown || o, t.history = P(t.history) + i, t.historyToAppend = i;
                var u = Object.keys(a).length;
                return t.skipped -= u, t.offset += u, t.msgs = extend(t.msgs, a), e
            })
        }

        function Y(e, t, n, r) {
            var i = e.tabs[t];
            return r === a.FLAG_OUTBOUND && i.out_up_to > n ? e : (r === a.FLAG_OUTBOUND ? i.out_up_to = n : i.in_up_to = n, e)
        }
        var X = x(function(e, t) {
            var n = t.tabs[e],
                i = n.msgs || {},
                o = Object.keys(i).map(function(n) {
                    return Object(l.getMessage)(t, e, n)
                }).filter(function(e) {
                    return !Object(f.isOut)(e)
                }).map(function(e) {
                    return e.messageId
                }).sort(function(e, t) {
                    return t - e
                });
            return n.skipped > 0 && (o = o.filter(function(e) {
                return intval(e) <= n.lastmsg - n.skipped
            })), (o = intval(o.shift())) <= n.in_up_to ? Promise.resolve(t) : (t.longpoll.push([a.readInboundEvent([6, e, o])]), Object(r.post)(O, {
                peer: e,
                ids: [o],
                hash: n.hash,
                act: "a_mark_read",
                gid: t.gid
            }).then(function() {
                return Y(t, e, o, a.FLAG_OUTBOUND)
            }))
        });

        function $(e) {
            return Object(r.post)(O, {
                act: "a_get_key",
                uid: e.id,
                gid: e.gid
            }).then(function(t) {
                var n = v(t, 3),
                    r = n[0],
                    i = n[1],
                    a = n[2];
                return extend({}, e, {
                    imKey: r,
                    imUrl: i,
                    imPart: a
                })
            })
        }

        function Q(e) {
            return Object(r.post)(O, {
                act: "a_get_ts",
                gid: e.gid
            }).then(function(t) {
                var n = v(t, 1)[0];
                return extend({}, e, {
                    imTs: n
                })
            })
        }

        function Z(e, t, n) {
            var r = n.tabs[e];
            return r.msgs[t.messageId] && (r.msgs[t.messageId].errored = 1, r.history = Object(s.setMessageError)(e, t, D(r.history))), Promise.resolve(n)
        }

        function J(e, t, n, r) {
            var i = r.tabs[e];
            return i.msgs[t] && (i.msgs[t].errored = 0, i.lastmsg_meta = n, i.lastmsg = t, i.history = Object(s.startResendMessage)(e, t, D(i.history))), Promise.resolve(r)
        }

        function ee(e, t, n, r) {
            var i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            t.deletedDialog || (e.dialog_tabs = Object.keys(e.dialog_tabs).reduce(function(e, a) {
                return !n && !Ut(a)(t) || i && !i(a, e[a], t) || (e[a] = Object(u.arrayUnique)(r(e[a], a))), e
            }, e.dialog_tabs))
        }

        function te(e, t) {
            return 0 === e.length ? Promise.resolve(t) : Object(r.post)(O, {
                act: "a_get_admin",
                admins: e.join(","),
                gid: t.gid
            }).then(function(e) {
                var n = v(e, 1)[0];
                return t.admins = extend(t.admins, n), t
            })
        }

        function ne(e, t) {
            if (!inArray(e, t.tabbedPeers.map(function(e) {
                    return e.peer
                })) && (0 !== t.peer || t.searchText) && !inArray(e, t.mutedPeers)) {
                var n = {
                    peer: e,
                    type: "temp"
                };
                Zt(t.tabbedPeers.concat([n]), !1, t)
            }
        }

        function re(e, t, n) {
            return Object(s.isReversedDialogs)(n) ? t.concat([e]) : [e].concat(t)
        }

        function ie(e, t) {
            var n = e.get().peer,
                r = Object(l.getTab)(e, n);
            if (Object(s.isFullyLoadedTab)(e, n)) {
                var i = D(r.history);
                r.history = Object(s.updateMessageInCache)(e, i, t)
            }
        }

        function ae(e, t) {
            var n = Object(l.getTab)(t, e.peerId);
            if (Object(s.isFullyLoadedTab)(t, e.peerId)) {
                var r = D(n.history);
                n.msgs[e.messageId] = extend(!0, {}, e), n.history = Object(s.editAndReplaceMessage)(t, e, r)
            }
            n && n.lastmsg == e.messageId && (n.lastmsg_meta = e);
            var i = n && n.pinned && Object(l.parserMessage)(n.pinned);
            return i && i.messageId == e.messageId && (n.pinned = e), Promise.resolve(t)
        }

        function oe(e, t) {
            var n = e.flags & a.FLAG_OUTBOUND,
                r = e.peerId;
            if (Object(s.isTabLoaded)(t, r)) {
                var i = t.tabs[r];
                if (i.deletedDialog = !1, !t.msg_local_ids_sort && e.local ? t.msg_local_ids_sort = y({}, e.messageId, 0) : e.local && (t.msg_local_ids_sort[e.messageId] = Object.keys(t.msg_local_ids_sort).length), n ? i.unread = 0 : (i.lastmsg == e.messageId && i.unread ? ue(t, 1, e.peerId) : (!i.unread && ue(t, 1, e.peerId), i.unread++), ne(e.peerId, t)), Object(s.isFullyLoadedTab)(t, r)) {
                    var o = D(i.history);
                    i.skipped > 0 && i.skipped++, i.offset++, i.msgs[e.messageId] = extend(!0, {}, e), i.history = Object(s.appendToHistory)(t, e, o, !0, !0, !0), Object(f.isOut)(e) && (i.blocked_community = 0, K(t))
                }
                if (i.typing) {
                    var u = i.typing.userIds.indexOf(e.userId);
                    u >= 0 && i.typing.userIds.splice(u, 1)
                }
                return i.lastmsg = e.messageId, i.lastmsg_meta = e, B(e.peerId, t), ee(t, i, !1, re.bind(null, r), Gt.bind(null, t)), Promise.resolve(t)
            }
            return N(r, 0, 0, 0, t).then(function(t) {
                return ee(t, t.tabs[r], !1, re.bind(null, r), Gt.bind(null, t)), B(e.peerId, t), n || ne(e.peerId, t), t
            })
        }

        function ue(e, t, n) {
            e.cur_unread_cnt || (e.cur_unread_cnt = {}), -1 === t && delete e.cur_unread_cnt[n], e.unread_cnt += t
        }

        function ce(e, t) {
            if (Object(s.isFullyLoadedTab)(t, e.peerId)) {
                var n = t.tabs[e.peerId],
                    r = n.unread;
                if (t = Y(t, e.peerId, e.upToId, 0), null != e.unread ? n.unread = e.unread : n.unread = e.upToId >= n.lastmsg ? 0 : Object(l.countUnread)(e.peerId, t) + (n.unread > 0 ? +n.skipped : 0), r > 0 && !n.unread && ue(t, -1, e.peerId), !n.skipped) {
                    var i = D(n.history);
                    n.history = Object(s.removewNewUnreadBarAndMerge)(t, i, e.peerId)
                }
            } else Object(s.isTabLoaded)(t, e.peerId) && (t.tabs[e.peerId].unread > 0 && ue(t, -1, e.peerId), t.tabs[e.peerId].unread = 0, t.tabs[e.peerId].in_up_to = e.upToId);
            return Object(s.isTabLoaded)(t, e.peerId) && (t.dialog_tabs[d.FOLDER_UNREAD] = t.dialog_tabs[d.FOLDER_UNREAD].filter(function(t) {
                return intval(t) !== e.peerId
            })), 0 !== t.unread_cnt || t.active_tab !== d.FOLDER_UNREAD || t.gid ? Promise.resolve(t) : Bt(d.FOLDER_ALL, t)
        }

        function de(e, t) {
            var n = t.tabs[e.peerId];
            if (Object(s.isTabLoaded)(t, e.peerId) && Y(t, e.peerId, e.upToId, a.FLAG_OUTBOUND), Object(s.isFullyLoadedTab)(t, e.peerId)) {
                var r = D(n.history);
                n.history = Object(s.markMessagesAsRead)(t, e.peerId, r)
            }
            return Promise.resolve(t)
        }

        function le(e, t, n, r, i) {
            return i.text = {}, i.imQueue = e, i.imQueueResend = t, i.imQueueSet = n, i.imQueueComplete = r, Promise.resolve(i)
        }

        function fe(e, t, n) {
            function r(e, t) {
                return {
                    id: e.messageId,
                    text: e.text,
                    date: e.date,
                    kludges: e.kludges,
                    authorName: t
                }
            }
            if (1 === e.length) {
                var i = e[0],
                    a = Object(l.getMessage)(n, t, i),
                    o = Object(l.getAuthorFullName)(n, t, i);
                return !1 === o ? n.set(ft.bind(null, y({}, t, [a.userId]))).then(function(n) {
                    var o = Object(l.getAuthorFullName)(n, t, i);
                    return {
                        msgIds: e,
                        object: r(a, o)
                    }
                }) : Promise.resolve({
                    msgIds: e,
                    object: r(a, o)
                })
            }
            return Promise.resolve({
                msgIds: e
            })
        }

        function me(e, t) {
            Object(s.normalizeTabsGotFromServer)(t, e);
            var n = t.tabs[t.peer];
            return t.tabs = Object.keys(e).reduce(function(n, r) {
                var i = t.tabs[r] ? t.tabs[r].msgs : {},
                    a = extend({}, i || {}, e[r].msgs || {});
                return n[r] = extend(t.tabs[r] || {}, e[r]), a && (n[r].msgs = a), e[r].lastmsg || (n[r].lastmsg = !1), n
            }, t.tabs), n && (t.tabs[t.peer] = n), Promise.resolve(t)
        }

        function ge(e, t, n, r) {
            var i = Object(l.getTab)(r, e);
            if (i) {
                var a = !1 !== t ? t == k ? 2 : mobPlatforms[t] ? 1 : 0 : i.last_seen[2];
                i.online = t, i.last_seen = [t, n || i.last_seen[1], a]
            }
            return Promise.resolve(r)
        }

        function pe(e, t) {
            var n = Object(l.getTab)(t, e.peerId);
            return n && (e.ts = Date.now() / 1e3, n.typing = e), Promise.resolve(t)
        }

        function he(e, t) {
            return Object(o.pause)(j + 2).then(function() {
                if (Object(s.isTabLoaded)(t, e)) {
                    var n = t.tabs[e];
                    if (n.typing) Date.now() - 1e3 * n.typing.ts >= 1e3 * j && (n.typing = void 0)
                }
                return t
            })
        }

        function _e(e) {
            var t = {},
                n = e.find(function(e) {
                    return "poll" === e[0]
                });
            if (n) {
                var r = v(n, 3)[2];
                Object.assign(t, r)
            }
            return t
        }

        function be(e) {
            return e.map(function(e) {
                return e[0] + ":" + e[1]
            }).join(",")
        }
        var ve = function(e, t, n, i) {
                var a = Date.now() + rand(0, 100).toFixed(0),
                    u = i.ref_id,
                    c = i.ref_source;
                return i.ref_source = void 0, i.ref_id = void 0, (c || u) && (T({
                    ref_source: null,
                    ref: null
                }), I()), Object(o.retryFn)(r.post, 1)(O, Object.assign({
                    act: "a_send",
                    to: e,
                    hash: n.hash,
                    ref_source: c,
                    ref: u,
                    msg: t.message,
                    payload: t.payload,
                    media: be(t.attaches),
                    guid: a,
                    share_url: t.share_url,
                    cancelled_shares: t.cancelled_shares,
                    random_id: t.rid,
                    gid: n.hidegid ? void 0 : i.gid,
                    entrypoint: i.currentEntryPoint || "",
                    sticker_referrer: t.sticker_referrer
                }, n.external, _e(t.attaches)), 2e4).then(function(e) {
                    var t = v(e, 1)[0];
                    return i.version !== t.version && nav.reload({
                        force: !0
                    }), i.currentEntryPoint = "", i
                })
            },
            ye = x(function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    r = arguments[3],
                    i = r.tabs[e];
                return ve(e, t, b({
                    hash: i.hash
                }, n), r)
            }),
            we = x(function(e, t, n) {
                return Object(r.post)(O, Object.assign({
                    act: "a_edit_message",
                    hash: e.hash,
                    id: t.messageId,
                    peerId: e.peerId,
                    gid: n.gid,
                    msg: t.origText,
                    media: be(t.attaches),
                    share_url: t.share_url,
                    cancelled_shares: t.cancelled_shares
                }, _e(t.attaches)), 2e4).then(function(e) {
                    v(e, 1)[0];
                    return n
                })
            });

        function Oe(e, t) {
            if (t.selectedMessages || (t.selectedMessages = []), 1 === e.length && inArray(e[0], t.selectedMessages)) t.selectedMessages = t.selectedMessages.filter(function(t) {
                return t !== e[0]
            });
            else {
                var n = t.selectedMessages.concat(e);
                t.selectedMessages = Object(u.arrayUnique)(n).sort(function(e, t) {
                    return e - t
                })
            }
            return Promise.resolve(t)
        }

        function je(e) {
            return e.selectedMessages = [], Promise.resolve(e)
        }

        function ke(e) {
            return e.selectedMessages = [], Promise.resolve(e)
        }

        function Ee(e, t) {
            if (Object(s.isFullyLoadedTab)(t, e.peerId)) {
                var n = t.tabs[e.peerId],
                    r = t.imQueue(e.peerId).filter(function(t) {
                        return t.failed && t.rid !== e.randomId
                    });
                t.imQueueSet(e.peerId, r), t.imQueueComplete(e.peerId, e.randomId), n.lastmsg_meta = e, n.lastmsg = e.messageId, n.msgs["rid" + e.randomId] && (n.msgs[e.messageId] = e, delete n.msgs["rid" + e.randomId]), n.history = Object(s.replaceMessageAttrs)(t, D(n.history), e)
            }
            return Promise.resolve(t)
        }

        function Te(e, t) {
            return Promise.resolve()
        }

        function Ie(e, t) {
            var n = {
                act: "a_get_media",
                id: e.messageId,
                gid: t.gid
            };
            return Object(o.retryFn)(r.post, 3, function(e) {
                return e * e
            })(O, n).then(function(n) {
                return Ae(e, n, t)
            }).catch(function() {
                return Ae(e, null, t)
            })
        }

        function Ae(e, t, n) {
            var r = n.tabs[e.peerId];
            return r.mediacontent || (r.mediacontent = {}), r.mediacontent[e.messageId] = t || [getTemplate("im_retry_link")], Ce(e, n)
        }

        function Ce(e, t) {
            var n = t.tabs[e.peerId];
            return n.history = Object(s.replaceAttaches)(D(n.history), e, t), Promise.resolve(t)
        }

        function Se(e, t, n) {
            var r = Object(s.dayFromVal)(t),
                i = n.tabs[e];
            return i.searchDay = r, i.searchOffset = 0, i.searchAllLoaded = !1, Promise.resolve(n)
        }

        function Me(e, t, n) {
            return n.tabs[t].searchText = e, We(t, n), n
        }

        function xe(e, t, n) {
            if (t) {
                var r = n.tabs[t];
                r.searchText = e, r.searchOffset = 0, r.searchAllLoaded = !1
            } else n.searchText = e, n.searchOffset = 0, n.searchAllLoaded = !1;
            return Promise.resolve(n)
        }

        function De(e, t, n, i, a) {
            return Object(r.post)(O, {
                act: "a_hints",
                str: e,
                gid: i.hidegid ? 0 : a.gid,
                query: n,
                peerIds: t.join(",")
            }).then(function(e) {
                var t = v(e, 3),
                    n = t[0],
                    r = t[1];
                return L(t[2], a), r.forEach(function(e) {
                    return Object(m.oCacheAdd)(a, e)
                }), me(n, a), Object.keys(n).sort(function(e, t) {
                    return n[e].order - n[t].order
                }).map(function(e) {
                    return n[e]
                })
            })
        }

        function Pe(e, t, n, r) {
            return De(e, t, n, {}, r).then(function(e) {
                return e.map(function(e) {
                    return {
                        peerId: e.peerId,
                        name: e.tab,
                        photo: e.photo,
                        online: e.online,
                        is_friend: "friends" === n
                    }
                })
            })
        }

        function Le(e) {
            var t = {
                peerId: e[0],
                name: e[1],
                tab: e[1],
                photo: e[2],
                href: e[3],
                online: e[4],
                is_friend: e[5],
                local_index: !0
            };
            return e[6] && (t.data = {
                flags: e[6]
            }), t
        }

        function Ne(e) {
            return function(t, n) {
                return e(n).then(function(e) {
                    var r = (t ? e.search(t) : e.list).map(Le);
                    return n.mapped_index || (n.mapped_index = {}), r.forEach(function(e) {
                        n.mapped_index[e.peerId] = e
                    }), r
                })
            }
        }
        var Re = Ne(function(e) {
                return e.topConvTree
            }),
            Fe = Ne(function(e) {
                return e.imTopConvTree
            }),
            He = Ne(function(e) {
                return e.hintsTree
            });

        function Ue(e, t) {
            var n = void 0,
                i = void 0,
                a = void 0;
            t.topConvTree = new Promise(function(e) {
                n = e
            }), t.hintsTree = new Promise(function(e) {
                i = e
            }), t.imTopConvTree = new Promise(function(e) {
                a = e
            });
            var u = e.select(c.RECENT_SEARCH_OP);
            return Object(o.retryFn)(r.post, 1, function() {
                return 4
            })(O, {
                act: "a_dialogs_preload",
                rs: u.join(","),
                gid: t.gid
            }).catch(function(e) {
                return [
                    [],
                    [],
                    []
                ]
            }).then(function(e) {
                var r = v(e, 4),
                    o = r[0],
                    u = r[1],
                    c = r[2],
                    s = r[3];
                return t.popular_sugg = c, new vkIndexer(o, function(e) {
                    return e[1]
                }, n), new vkIndexer(u, function(e) {
                    return e[1]
                }, i), s && s.length > 0 ? new vkIndexer(s, function(e) {
                    return e[1]
                }, a) : a(), t
            })
        }

        function Be(e) {
            var t = e.active_tab,
                n = void 0;
            return n = e.dialog_tabs[t].length > 0 ? Math.min.apply(null, e.dialog_tabs[t].map(function(t) {
                return e.tabs[t].lastmsg
            })) : 0, Object(r.post)(O, {
                act: "a_get_dialogs",
                start_message_id: n,
                tab: t,
                gid: e.gid
            }).then(function(n) {
                var r = v(n, 4),
                    i = r[0],
                    a = r[1],
                    o = r[2],
                    u = r[3];
                return o.forEach(function(t) {
                    return Object(m.oCacheAdd)(e, t)
                }), L(u, e), me(a, e), e.dialog_tabs[t] = e.dialog_tabs[t].concat(Object.keys(a).map(intval)), e.dialog_tabs_all[t] = !i.has_more, Promise.resolve(e)
            })
        }
        var Ge = x(function(e, t) {
            return Object(r.post)(O, {
                act: "a_search",
                q: e,
                from: "all",
                gid: t.gid,
                hash: t.writeHash,
                offset: t.searchOffset || 0
            }).then(function(n) {
                var r = v(n, 5),
                    i = r[0],
                    a = r[1],
                    o = r[2],
                    u = r[3],
                    c = r[4];
                return a.forEach(function(e) {
                    return Object(m.oCacheAdd)(t, e)
                }), Object(s.normalizeTabsGotFromServer)(t, i), e === t.searchText && (t.searchOffset = u, t.searchAllLoaded = c), Object.keys(i).filter(function(e) {
                    return !t.tabs[e]
                }).forEach(function(e) {
                    t.tabs[e] = i[e]
                }), [i, o]
            })
        });

        function ze(e, t) {
            return t.tabs[e].searchAllLoaded
        }

        function qe(e, t) {
            return !(t.peer !== e || !Object(s.isFullyLoadedTab)(t, e)) && t.tabs[e].inplaceSearch
        }

        function Ke(e, t) {
            if (Object(s.isFullyLoadedTab)(t, e)) {
                var n = t.tabs[e];
                delete n.inplaceSearch, delete n.searchOffset, delete n.searchAllLoaded, delete n.searchText, delete n.searchDay, T({
                    st: ""
                }), I()
            }
            return Promise.resolve(t)
        }

        function Ve(e, t) {
            if (Object(s.isFullyLoadedTab)(t, e)) {
                var n = t.tabs[e];
                delete n.searchDay, n.searchOffset = 0, n.searchAllLoaded = !1
            }
            return Promise.resolve(t)
        }

        function We(e, t) {
            return t.tabs[e].inplaceSearch = !0, Promise.resolve(t)
        }
        var Ye = x(function(e, t) {
            var n = t.tabs[e],
                i = "";
            if (We(e, t), n.searchDay && (i = "day:" + n.searchDay), !i && !n.searchText) return Promise.reject();
            var a = "in:" + e + " " + i + " " + (n.searchText || "");
            return T({
                st: n.searchText
            }), I(), Object(r.post)(O, {
                act: "a_search",
                q: a,
                from: "in",
                gid: t.gid,
                hash: t.writeHash,
                offset: n.searchOffset || 0
            }).then(function(e) {
                var t = v(e, 3),
                    r = t[0],
                    i = t[1],
                    a = t[2];
                return n.searchOffset = i, n.searchAllLoaded = a, r
            })
        });

        function Xe(e) {
            return Object(r.post)(O, {
                act: "a_important",
                offset: e,
                part: e > 0
            })
        }

        function $e(e, t) {
            var n = Object(l.getTab)(e, t);
            return Object(r.post)(O, {
                act: "a_load_lastmsg",
                peerId: t,
                gid: e.get().gid
            }).then(function(r) {
                var i = v(r, 2),
                    a = i[0],
                    o = i[1];
                n.lastmsg = a[0] || !1, n.lastmsg_meta = a;
                var u = v(o, 3);
                n.unread = u[0], n.in_up_to = u[1], n.out_up_to = u[2], n.unread || (e.get().dialog_tabs[d.FOLDER_UNREAD] = e.get().dialog_tabs[d.FOLDER_UNREAD].filter(function(e) {
                    return e != t
                })), ee(e.get(), n, !1, re.bind(null, t), Gt.bind(null, e.get()))
            })
        }

        function Qe(e, t, n) {
            if (Object(s.isFullyLoadedTab)(n, t)) {
                var r = n.tabs[t];
                r.deleted = r.deleted ? r.deleted.concat(e) : e
            }
            return Promise.resolve(n)
        }

        function Ze(e, t, n) {
            if (Object(s.isFullyLoadedTab)(n, t)) {
                var r = n.tabs[t];
                r.history = Object(s.removeMessages)(e, D(r.history)), r.offset -= e.filter(function(e) {
                    return r.msgs[e]
                }).length, e.forEach(function(e) {
                    return delete r.msgs[e]
                }), e.forEach(function(e) {
                    var t = (n.selectedMessages || []).indexOf(e); - 1 != t && n.selectedMessages.splice(t, 1)
                })
            }
            return Promise.resolve(n)
        }
        var Je = x(function(e, t, n, i, a) {
            return Object(r.post)(O, {
                act: "a_mark",
                peer: t,
                hash: n || a.tabs[t].hash,
                gid: a.gid,
                msgs_ids: e.join(","),
                mark: i
            })
        });

        function et(e, t, n, r) {
            if (Object(s.isFullyLoadedTab)(r, t)) {
                var i = r.tabs[t];
                i.deleted = i.deleted ? i.deleted.concat(e) : e, i.history = Object(s.removeMessagesWithRestore)(e, t, n, D(i.history)), i.offset -= e.filter(function(e) {
                    return i.msgs[e]
                }).length
            }
            return Promise.resolve(r)
        }

        function tt(e, t, n) {
            if (Object(s.isFullyLoadedTab)(n, t)) {
                var r = n.tabs[t];
                r.deleted && (r.deleted = r.deleted.filter(function(t) {
                    return t !== e
                })), r.history = Object(s.restoreMessage)(e, t, D(r.history)), r.offset++
            }
            return Promise.resolve(n)
        }

        function nt(e, t, n, i) {
            return Object(r.post)(O, {
                act: "a_restore",
                id: e,
                peer: t,
                hash: n,
                gid: i
            })
        }
        var rt = x(function(e, t) {
            return t.tabs[e].lastTyping = Date.now(), Object(r.post)(O, {
                act: "a_typing",
                peer: e,
                gid: t.gid,
                hash: t.tabs[e].hash
            }).then(function() {
                return t
            }, function() {
                return t
            })
        });

        function it(e, t, n, r) {
            return t && (r.pendingForward = null, e || (e = {
                msgIds: []
            }), t.addAttach(n ? "reply" : "mail", e.msgIds.join(";"), e.object || null)), Promise.resolve(r)
        }

        function at(e, t) {
            return t.pendingForward = e, Promise.resolve(t)
        }

        function ot(e, t, n) {
            if (Object(s.isTabLoaded)(n, e)) {
                n.blockedFlagUpdates || (n.blockedFlagUpdates = {}), n.blockedFlagUpdates[e] = !0, ee(n, n.tabs[e], !0, function(t) {
                    return t.filter(function(t) {
                        return t !== e
                    })
                }), n.tabs[e].unread > 0 && ue(n, -1, e);
                var r = n.tabs[e];
                return r.deletedDialog = !0, Zt(n.tabbedPeers.filter(function(t) {
                    return t.peer !== e
                }), !0, n), t.then(function(t) {
                    var i = v(t, 2);
                    i[0], i[1];
                    return delete n.blockedFlagUpdates[e], r.msgs = null, r.history = null, r.unread = 0, r.lastmsg = !1, r.lastmsg_meta = null, n
                })
            }
        }
        var ut = x(function(e, t) {
                return ot(e, Object(r.post)("al_im.php", {
                    act: "a_flush_history",
                    id: e,
                    from: "im",
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }), t)
            }),
            ct = x(function(e, t, n) {
                return Object(r.post)(O, {
                    act: "a_set_chat_title",
                    peer: e,
                    new_title: t,
                    gid: n.gid,
                    hash: n.tabs[e].hash
                }).then(function() {
                    return n
                })
            }),
            st = x(function(e, t) {
                return Object(r.post)(O, {
                    act: "a_load_chat_info",
                    peer: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(n) {
                    var r = v(n, 1)[0];
                    return t.tabs[e] = extend(t.tabs[e], r), t
                })
            });

        function dt(e, t, n) {
            var r = n.tabs[e];
            return r.memberIds = [].concat(r.memberIds, t).filter(function(e, t, n) {
                return n.indexOf(e) === t
            }), r.membersCount = r.memberIds.length, Promise.resolve(n)
        }
        var lt = x(function(e, t, n) {
            return Object(r.post)(O, {
                act: "a_add_chat_members",
                peer: e,
                new_peer: t.join(","),
                gid: n.gid,
                hash: n.tabs[e].hash
            }).then(function(e) {
                return n
            })
        });

        function ft(e, t) {
            if (isEmpty(e)) return Promise.resolve(t);
            var n = Object.keys(e).map(function(t) {
                return t + ":" + e[t].join(",")
            }).join(";");
            return Object(r.post)(O, {
                act: "a_load_member",
                need: n
            }).then(function(e) {
                return v(e, 1)[0].forEach(function(e) {
                    return Object(m.oCacheAdd)(t, e)
                }), t
            })
        }

        function mt(e, t, n) {
            var r = {},
                i = n.get();

            function o(e, t) {
                Object(s.isChatPeer)(e) && t && !Object(m.oCacheExists)(i, t) && (r[e] ? -1 === r[e].indexOf(t) && r[e].push(t) : r[e] = [t])
            }
            var u = t.filter(function(e) {
                return !Object(s.isTabLoaded)(i, e.peerId)
            }).map(function(e) {
                return e.peerId
            });
            t.forEach(function(e) {
                o(e.peerId, e.userId)
            }), e.forEach(function(e) {
                o(e.peerId, +e.kludges.source_mid)
            });
            var c = t.filter(function(e) {
                return e.flags & a.FLAG_OUTBOUND && !e.local
            }).map(function(e) {
                return e.kludges.from_admin
            }).filter(function(e) {
                return e && !i.admins[e]
            });
            return 0 === Object.keys(r).length && 0 === c.length && 0 === u.length ? Promise.resolve(i) : {
                shouldLoad: Object.keys(r).length > 0 || c.length > 0 || u.length > 0,
                needMembers: r,
                needAdminIds: c,
                needPeers: u
            }
        }

        function gt(e, t, n) {
            var r = e.needMembers,
                i = e.needAdminIds,
                a = e.needPeers;
            return t.pause(), Promise.all([ft(r, n), te(i, n), Promise.all(a.map(function(e) {
                return N(e, 0, 0, 0, n)
            }))]).catch(function() {
                return n
            }).then(function() {
                return t.resume()
            }).then(function() {
                return n
            })
        }
        var pt = x(function(e, t) {
            return e.kludges.source_act === s.CHAT_PHOTO_REMOVE ? (delete t.tabs[e.peerId].photo, delete t.tabs[e.peerId].photoLarge, Promise.resolve(t)) : Object(r.post)(O, {
                act: "a_get_chat_photo",
                msg_id: e.messageId
            }).then(function(n) {
                var r = v(n, 2),
                    i = r[0],
                    a = r[1];
                t.chat_photo_msg = a;
                var o = t.tabs[e.peerId];
                if (t.tabs[e.peerId].photo = i[0], t.tabs[e.peerId].photoLarge = i[1], Object(s.isFullyLoadedTab)(t, e.peerId)) {
                    var u = e.kludges.source_act;
                    o.history = Object(s.addChatPhotoToUpdate)(e, u, t, D(o.history))
                }
                return t
            })
        });

        function ht(e, t, n, r) {
            return t !== vk.id ? Promise.resolve(r) : (Object(s.isTabLoaded)(r, n) && r.peer == n && (r = K(r)), Promise.resolve(r))
        }
        var _t = x(function(e, t) {
                return Object(r.post)(O, {
                    act: "a_leave_chat",
                    chat: e - 2e9,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(ht.bind(null, s.CHAT_KICK_USER, vk.id, e, t))
            }),
            bt = x(function(e, t) {
                return Object(r.post)(O, {
                    act: "a_return_to_chat",
                    chat: e - 2e9,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(ht.bind(null, s.CHAT_INVITE_USER, vk.id, e, t))
            }),
            vt = x(function(e, t, n) {
                return Object(r.post)(O, {
                    act: "a_mute",
                    peer: e,
                    hash: n.tabs[e].hash,
                    gid: n.gid,
                    value: t ? 1 : 0
                }).then(function() {
                    var r = t ? "mute" : "unmute";
                    return window.Notifier && Notifier.lcSend("im", {
                        act: r,
                        peer: e
                    }), n
                }).then(yt.bind(null, e, t))
            });

        function yt(e, t, n) {
            var r = n.mutedPeers.filter(function(t) {
                return t !== e
            });
            return t && r.push(e), n.mutedPeers = r, cur.mutedPeers = n.mutedPeers, K(n)
        }

        function wt(e, t) {
            return t.stack = e, Promise.resolve(t)
        }
        var Ot = x(function(e, t, n, i) {
            return jt(e, n, t, i), Object(r.post)(O, {
                act: "a_mark_important",
                ids: e,
                val: t ? 1 : 0,
                from: "im",
                gid: i.gid,
                peer: n,
                hash: i.tabs[n].hash
            }).then(function() {
                return i
            })
        });

        function jt(e, t, n, r) {
            if (Object(s.isFullyLoadedTab)(r, t)) {
                var i = r.tabs[t];
                e.filter(function(e) {
                    return i.msgs[e]
                }).forEach(function(e) {
                    var o = Object(l.getMessage)(r, t, e),
                        u = n ? o.flags | a.FLAG_IMPORTANT : o.flags & ~a.FLAG_IMPORTANT;
                    o.flags = u, i.msgs[e] = o, i.history = Object(s.updateStar)(e, n, D(i.history))
                })
            }
            return Promise.resolve(r)
        }

        function kt(e, t, n) {
            return n.importants || (n.importants = {}), (n.importants[t] || 0) !== e && (n.important_cnt += e, n.importants[t] = e), Promise.resolve(n)
        }

        function Et(e, t) {
            return Object(r.post)(O, {
                act: "a_spam",
                offset: e,
                gid: t,
                part: e > 0
            })
        }

        function Tt(e, t) {
            return Object(r.post)(O, {
                act: "a_flush_spam",
                gid: t,
                hash: e
            })
        }

        function It(e, t, n) {
            return n.creationType = e, n.creationFilter = t, Promise.resolve(n)
        }

        function At(e, t) {
            return Object(r.post)(O, {
                act: "a_owner_photo",
                photo: JSON.parse(e).data[0],
                peer: t
            })
        }

        function Ct(e, t) {
            return t.next_chat_avatar = e, Promise.resolve(t)
        }

        function St(e, t, n) {
            return Object(r.post)("al_page.php", {
                act: "owner_photo_save",
                peer: e,
                _query: t
            }).then(function(e) {
                return n
            })
        }
        var Mt = x(function(e, t, n, i) {
            return i.creating = !0, i.longpoll.pause(), Object(r.post)(O, {
                act: "a_multi_start",
                hash: i.writeHash,
                peers: t.join(","),
                title: n
            }).then(function(e) {
                var t = v(e, 1)[0];
                return i.next_peer = t.peerId, i.tabs[t.peerId] = t, ee(i, t, !1, function(e) {
                    return [t.peerId].concat(e)
                }), i.longpoll.resume(), i
            }).then(function(t) {
                return e ? St(t.next_peer, e, t) : t
            }).then(function(e) {
                return e.creating = !1, e
            }).catch(function(e) {
                throw i.creating = !1, i.longpoll.resume(), e
            })
        });

        function xt(e) {
            var t = void 0;
            e.resync_in_process = new Promise(function(e) {
                t = e
            });
            var n = Object.keys(e.tabs).length,
                i = e.active_tab;
            return Object(r.post)(O, {
                act: "a_resync",
                sel: e.peer,
                gid: e.gid,
                loaded: n,
                tab: i,
                add_peers: e.tabbedPeers.map(function(e) {
                    return e.peer
                }).join(",")
            }).then(function(n) {
                var r = v(n, 5),
                    a = r[0],
                    o = r[1],
                    c = r[2],
                    l = r[3],
                    f = r[4];
                o.forEach(function(t) {
                    return Object(m.oCacheAdd)(e, t)
                }), Object(s.normalizeTabsGotFromServer)(e, a), c.user_unread && handlePageCount("msg", c.user_unread), Object(u.lplog)("Resync success", "success");
                var g = e.peer,
                    p = void 0;
                if (Object(s.isReservedPeer)(g)) p = Promise.resolve(!1);
                else {
                    var h = {
                        tabs: y({}, g, e.tabs[g]),
                        oCache: {}
                    };
                    p = me(y({}, g, a[g]), h)
                }
                return p.then(function(n) {
                    e.tabs = a, e.admins = extend(e.admins, l), n && (e.tabs[g] = n.tabs[g], e.tabs[g].history = Object(s.restoreQueue)(g, e, D(e.tabs[g].history))), e.loadingDialogs = !1, e.mutedPeers = c.mutedPeers, e.lastDialogsOptions = {
                        has_more: c.has_more
                    }, e.dialog_tab_cts = c.folder_cts, e.dialog_tabs[i] = f.map(intval);
                    var r = e.dialog_tabs[i].map(function(t) {
                        return e.tabs[t]
                    });
                    return Object.keys(e.dialog_tabs).filter(function(e) {
                        return e != i
                    }).forEach(function(t) {
                        i == d.FOLDER_ALL ? e.dialog_tabs[t] = r.filter(Ut(t)).map(function(e) {
                            return e.peerId
                        }) : e.dialog_tabs[t] = []
                    }), delete e.resync_in_process, setTimeout(t.bind(null, !0), 0), Nt(intval(c.unread), e)
                })
            }).catch(function(t) {
                return Object(u.lplog)("Resync error: " + t.message + " " + t.stack, "error"), Object(o.pause)(2).then(xt.bind(null, e))
            })
        }

        function Dt(e, t) {
            return t.lockedSending = e, Promise.resolve(t)
        }

        function Pt(e, t, n) {
            return e && !n.delayed_message ? (n.delayed_message = e, n.delayed_ts = t) : e || (n.delayed_message = e, n.delayed_ts = t), Promise.resolve(n)
        }

        function Lt(e) {
            return !!e.textMediaSelector.urlAttachmentLoading || !!(window.Upload && Upload.options && Upload.isSomethingUploading) && Object.keys(Upload.options).filter(function(e) {
                return Upload.isSomethingUploading(e)
            }).length > 0
        }

        function Nt(e, t) {
            return t.unread_cnt = e, t.dialog_tab_cts[d.FOLDER_UNREAD] = e, Promise.resolve(t)
        }

        function Rt(e, t) {
            return t.ctrl_submit = !!e, Object(r.post)(O, {
                act: "a_save_ctrl_submit",
                to: t.peer,
                hash: t.tabs[t.peer].hash,
                value: e ? 1 : 0
            }).then(function(e) {
                return t
            })
        }

        function Ft(e, t, n) {
            n.cur_unread_cnt || (n.cur_unread_cnt = {}), t && !inArray(e, n.mutedPeers) && (n.cur_unread_cnt[e] = !0);
            var r = document.title,
                i = window.devicePixelRatio >= 2 ? "_2x" : "";
            if (t && !n.update_title_to) {
                var a = function(e, t, n) {
                    return function() {
                        n.update_old_title = e;
                        var r = Object.keys(n.cur_unread_cnt).length;
                        if (0 === r) return Object(_.setDocumentTitle)(e || document.title), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), clearInterval(n.update_title_to), void(n.update_title_to = !1);
                        e ? (Object(_.setDocumentTitle)(e), setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), e = !1) : (e = document.title, setFavIcon("/images/icons/favicons/fav_im" + (r > 9 ? 10 : r) + t + ".ico"), Object(_.setDocumentTitle)(winToUtf(getLang("mail_im_new_messages", r))))
                    }
                }(r, i, n);
                n.update_title_to = setInterval(a, 1e3), a()
            } else !t && n.update_old_title && (Object(_.setDocumentTitle)(n.update_old_title), n.cur_unread_cnt = {}, r = !1, n.update_old_title = !1, setFavIcon("/images/icons/favicons/fav_im" + i + ".ico"), clearInterval(n.update_title_to), n.update_title_to = !1);
            return Promise.resolve(n)
        }

        function Ht(e, t, n, r, i) {
            return Object(s.isFullyLoadedTab)(i, e) && (i.tabs[e].scrollTop = intval(t), i.tabs[e].scrollBottom = intval(n), i.tabs[e].contHeight = intval(r)), Promise.resolve(i)
        }

        function Ut(e) {
            return e === d.FOLDER_ALL ? function() {
                return !0
            } : e === d.FOLDER_UNREAD ? function(e) {
                return e.unread > 0
            } : function(t) {
                return t.folders & d.FOLDER_MASKS[e]
            }
        }

        function Bt(e, t) {
            t.active_tab = e, Object(i.updateLocation)({
                tab: e === d.FOLDER_ALL ? null : e
            });
            var n = [];
            if (e !== d.FOLDER_ALL && !Object(s.isReversedDialogs)(t)) {
                var r = t.dialog_tabs[e];
                n = t.dialog_tabs[d.FOLDER_ALL].map(function(e) {
                    return t.tabs[e]
                }).filter(Ut(e)).map(function(e) {
                    return e.peerId
                }), t.dialog_tabs[e] = r.length >= n.length ? r : n
            }
            return Promise.resolve(t)
        }

        function Gt(e, t, n, r) {
            var i = e.dialog_tabs_all;
            return !(!i[d.FOLDER_ALL] && !i[t]) || (n.filter(function(e) {
                return e === r.peerId
            }).length > 0 || ("r" === r.lastmsg[0] || n.map(function(t) {
                return e.tabs[t.toString()]
            }).filter(function(t) {
                return Object(s.isReversedDialogs)(e) ? t.lastmsg > r.lastmsg : t.lastmsg < r.lastmsg
            }).length > 0))
        }

        function zt(e, t, n, r, i) {
            if (Object(s.isTabLoaded)(i, e)) {
                var o = i.tabs[e];
                return n === a.REPLACE_DIRECTORIES && (t ^= o.folders),
                    function(e, t, n) {
                        return !(e === a.SET_DIRECTORIES && n.folders & t || !(e !== a.RESET_DIRECTORIES || n.folders & t))
                    }(n, t, o) && Object.keys(d.FOLDER_MASKS).filter(function(e) {
                        return d.FOLDER_MASKS[e] & t
                    }).forEach(function(e) {
                        i.dialog_tab_cts[e] += function(e, t, n) {
                            return t !== a.RESET_DIRECTORIES || e.folders & d.FOLDER_MASKS[n] ? t === a.REPLACE_DIRECTORIES ? e.folders & d.FOLDER_MASKS[n] ? -1 : 1 : t === a.SET_DIRECTORIES ? 1 : -1 : 0
                        }(o, n, e)
                    }), n === a.SET_DIRECTORIES ? i.tabs[e].folders |= t : n === a.RESET_DIRECTORIES ? i.tabs[e].folders &= ~t : i.tabs[e].folders = t ^= o.folders, ee(i, i.tabs[e], !0, function(t, n) {
                        return t.concat([e]).map(function(e) {
                            return i.tabs[e]
                        }).filter(Ut(n)).map(function(e) {
                            return e.peerId
                        })
                    }, Gt.bind(null, i)), Promise.resolve(i)
            }
            return N(e, 0, 0, 0, i).then(zt.bind(null, e, t, n, i))
        }
        var qt = x(function(e, t) {
                var n = d.FOLDER_MASKS[d.FOLDER_IMPORTANT],
                    i = t.tabs[e].folders & n,
                    o = i ? a.resetDirectoriesEvent : a.setDirectoriesEvent;
                return t.longpoll.push([o([0, e, n, !0])]), Object(r.post)(O, {
                    act: "a_dialog_star",
                    val: i ? 0 : 1,
                    peer: e,
                    hash: t.tabs[e].hash,
                    gid: t.gid
                }).then(function() {
                    return t
                })
            }),
            Kt = x(function(e, t, n) {
                var i = d.FOLDER_MASKS[d.FOLDER_UNRESPOND];
                return n.longpoll.push([a.resetDirectoriesEvent([0, e, i, !0]), a.readInboundEvent([6, e, t])]), Object(r.post)(O, {
                    act: "a_mark_answered",
                    peer: e,
                    lastmsg: t,
                    hash: n.tabs[e].hash,
                    gid: n.gid
                }).then(function() {
                    return n
                })
            });

        function Vt(e) {
            return Object(r.post)(O, {
                act: "a_get_mutex_key",
                gid: e
            })
        }

        function Wt(e, t) {
            return L(y({}, e, {
                free: !0
            }), t), Object(r.post)(O, {
                act: "a_block_release",
                peer: e,
                gid: t.gid
            }).then(function() {
                return t
            })
        }

        function Yt(e, t) {
            var n = ls.get("comm_mute_" + t.gid) ? 1 : 0;
            return e && (n ^= 1), ls.set("comm_mute_" + t.gid, n), t.mute = n, Promise.resolve(t)
        }
        var Xt = x(function(e, t) {
            return ee(t, t.tabs[e], !0, function(t) {
                return t.filter(function(t) {
                    return t !== e
                })
            }), t.tabs[e].deletedDialog = !0, Object(r.post)(O, {
                act: "a_delete_dialog",
                peer: e,
                gid: t.gid,
                hash: t.tabs[e].hash
            }).then(function(n) {
                return n[0] ? (Zt(t.tabbedPeers.filter(function(t) {
                    return t.peer !== e
                }), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null) : (t.tabs[e].deletedDialog = !1, ee(t, t.tabs[e], !1, re.bind(null, e), Gt.bind(null, t))), n
            })
        });

        function $t(e, t, n, i) {
            return Object(r.post)(O, {
                act: "a_restore_dialog",
                hash: t,
                gid: i.gid,
                spam: n ? 1 : 0,
                peer: e
            }).then(function(t) {
                return i.tabs[e].deletedDialog = !1, ee(i, i.tabs[e], !1, function(t) {
                    return [e].concat(t)
                }), i.tabs[e].unread = t, i
            })
        }

        function Qt(e, t, n) {
            return Object(r.post)(O, {
                act: "a_spam_dialog",
                peer: e,
                gid: n.gid,
                hash: t
            })
        }

        function Zt(e, t, n) {
            return n.tabbedPeers = e, Object(s.isClassicInterface)(n) && (T({
                peers: n.tabbedPeers.filter(function(e) {
                    var t = e.peer,
                        r = e.type;
                    return t !== n.peer && "perm" === r
                }).map(function(e) {
                    return Object(s.getBareTab)(e.peer, n)
                }).filter(function(e) {
                    return !e.deletedDialog
                }).map(function(e) {
                    return e.peerId
                }).map(s.convertPeerToUrl).join("_")
            }), t && I()), Promise.resolve(n)
        }

        function Jt(e) {
            return !e.peer || (qe(e.peer, e) ? ze(e.peer, e) : !!Object(s.isFullyLoadedTab)(e, e.peer) && e.tabs[e.peer].allShown)
        }

        function en(e, t) {
            var n = t.tabs[e];
            return Object(s.isFullyLoadedTab)(t, e) && (n.skipped = null, n.msgs = null, n.offset = null, n.allShown = null, n.history = null), Promise.resolve(t)
        }

        function tn(e, t) {
            var n = t.tabs[e];
            return Object(s.isFullyLoadedTab)(t, e) && (n.history = P(n.history)), Promise.resolve(t)
        }

        function nn(e, t) {
            return t.go_to_end_visible = e, Promise.resolve(t)
        }

        function rn(e, t, n) {
            if (!Object(s.isCommunityPeer)(t)) return Promise.resolve(n);
            var i = Object(l.getTab)(n, t);
            return i.blocked_community = !e, Object(r.post)(O, {
                act: "a_toggle_community",
                peer_id: t,
                hash: i.hash,
                state: e ? 1 : 0
            }).then(function() {
                return K(n)
            })
        }

        function an(e, t) {
            if (0 !== t.peer && Object(s.isFullyLoadedTab)(t, t.peer)) {
                var n = Object(l.getTab)(t, t.peer);
                n.history = D(n.history), e(n.history)
            }
            return Promise.resolve(t)
        }

        function on(e) {
            return e.audio_msg.isRecording ? Promise.reject() : (e.audio_msg.isRecording = !0, Promise.resolve(e))
        }

        function un(e) {
            return e.audio_msg.isRecording = !1, Promise.resolve(e)
        }

        function cn(e, t) {
            return t.voice_message_available = e, Promise.resolve(t)
        }

        function sn(e) {
            T({
                act: e ? "create" : null
            }), I()
        }

        function dn() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            T({
                q: e
            }), I()
        }

        function ln(e) {
            return void 0 === e.chatResizeInitialized && (e.chatResizeInitialized = !0, Object(s.getClassicChatHeight)() > window.clientHeight() && Object(s.setClassicChatHeight)(0)), Promise.resolve(e)
        }
        var fn = x(function(e, t, n) {
            return Object(r.post)(O, {
                act: "a_join_chat",
                chat_id: e,
                hash: t,
                write_hash: n.writeHash
            }).then(function(e) {
                var t = v(e, 4),
                    r = t[0],
                    i = t[1],
                    a = t[2],
                    o = t[3];
                return a.forEach(function(e) {
                    return Object(m.oCacheAdd)(n, e)
                }), n.tabs[r] = i, ee(n, i, !1, re.bind(null, r), Gt.bind(null, n)), n.admins = extend(n.admins, o), [r]
            })
        });

        function mn(e, t) {
            return Object(r.post)(O, {
                act: "a_get_link",
                gid: t.gid,
                chat_id: e
            })
        }
        var gn = x(function(e, t) {
            var n = t.tabs[e];
            return Object(r.post)(O, {
                act: "a_reset_link",
                chat_id: e - 2e9,
                write_hash: t.writeHash
            }).then(function(e) {
                return n.inviteLink = e[0], e
            })
        });

        function pn(e) {
            return A({
                invite_chat_id: null,
                invite_hash: null
            }), e.invitation = void 0, Promise.resolve(e)
        }

        function hn(e, t) {
            var n = Object(u.arrayUnique)([e].concat(t.select(c.RECENT_SEARCH_OP))).slice(0, 500);
            t.update(c.RECENT_SEARCH_OP, n)
        }

        function _n(e) {
            e.update(c.RECENT_SEARCH_OP, [])
        }

        function bn(e, t) {
            var n = t.select(c.RECENT_SEARCH_OP).filter(function(t) {
                return t !== e
            });
            return t.update(c.RECENT_SEARCH_OP, n), n
        }

        function vn(e, t, n) {
            var r = n.tabs[t],
                i = Object(l.getMessage)(n, t, e);
            return r.data.kicked || r.data.closed || i.kludges.source_act || (r.pinned = i), Promise.resolve(n)
        }

        function yn(e, t) {
            return t.tabs[e].pinned = null, Promise.resolve(t)
        }
        var wn = x(function(e, t, n) {
                var i = n.tabs[t];
                return i.data.kicked || i.data.closed ? Promise.resolve(n) : Object(r.post)(O, {
                    act: "a_pin_message",
                    msgid: e,
                    chat: t,
                    gid: n.gid,
                    hash: n.tabs[t].hash
                }).then(function(e) {
                    var r = v(e, 1)[0];
                    return n.tabs[t] = Object.assign({}, i, r), n
                })
            }),
            On = x(function(e, t) {
                var n = t.tabs[e];
                return n.data.kicked || n.data.closed ? Promise.resolve(t) : Object(r.post)(O, {
                    act: "a_unpin_message",
                    chat: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(r) {
                    var i = v(r, 1)[0];
                    return t.tabs[e] = Object.assign({}, n, i), t
                })
            }),
            jn = x(function(e, t) {
                var n = t.tabs[e];
                return Object(r.post)(O, {
                    act: "a_get_pinned_message",
                    chat: e,
                    gid: t.gid,
                    hash: t.tabs[e].hash
                }).then(function(e) {
                    var r = v(e, 1)[0];
                    return n.pinned = r || null, t
                })
            }),
            kn = x(function(e, t, n) {
                var i = n.tabs[e];
                return Object(r.post)(O, {
                    act: "a_get_message_local_id",
                    chat: e,
                    chat_local_id: t,
                    hash: i.hash
                })
            }),
            En = x(function(e, t) {
                var n = t.tabs[e];
                return n.membersLoaded ? Promise.resolve(t) : Object(r.post)(O, {
                    act: "a_get_chat_members",
                    chat: e,
                    gid: t.gid,
                    hash: n.hash
                }).then(function(e) {
                    var r = v(e, 1),
                        i = v(r[0], 3),
                        a = i[0],
                        o = i[1],
                        u = i[2];
                    return n.memberIds = a, n.adminIds = o, u.forEach(function(e) {
                        return Object(m.oCacheAdd)(t, e)
                    }), n.membersLoaded = !0, t
                })
            }),
            Tn = x(function(e, t) {
                return Promise.all([En(e, t), function(e, t) {
                    var n = t.tabs[e];
                    return Object(r.post)(O, {
                        act: "a_get_chat_details",
                        chat: e,
                        gid: t.gid,
                        hash: n.hash
                    }).then(function(e) {
                        var r = v(e, 1)[0];
                        return n.photoGrid = r.grid, n.photoLarge = r.photo, n.membersLastSeen = r.lastSeen || null, n.inviters = r.inviters, n.caccess = r.caccess, n.invitedByMe = r.invitedByMe || [], n.inviteLink = r.link || null, n.serverSettings = r.serverSettings || null, t
                    })
                }(e, t)]).then(function() {
                    return t
                })
            }),
            In = x(function(e, t, n) {
                var i = n.tabs[e];
                return Object(r.post)(O, {
                    act: "a_update_flags",
                    chat: e,
                    hash: i.hash,
                    flags: t
                })
            }),
            An = x(function(e, t) {
                var n = t.tabs[e];
                return Object(r.post)("al_page.php", {
                    act: "owner_photo_remove",
                    oid: e,
                    gid: t.gid,
                    hash: n.photoHash
                }).then(function() {
                    return n.photo = null, n.photoLarge = null, t
                })
            });

        function Cn(e, t, n) {
            var r = n.tabs[e];
            return r.memberIds = r.memberIds.filter(function(e) {
                return e !== t
            }), r.adminIds = r.adminIds.filter(function(e) {
                return e !== t
            }), r.membersCount = r.memberIds.length, Promise.resolve(n)
        }
        var Sn = x(function(e, t, n) {
            var i = n.tabs[e];
            return Object(r.post)(O, {
                act: "a_kick_user",
                chat: e,
                hash: i.hash,
                mid: t
            }).then(function() {
                return i.memberIds = i.memberIds.filter(function(e) {
                    return e !== t
                }), i.adminIds = i.adminIds.filter(function(e) {
                    return e !== t
                }), i.membersCount = i.memberIds.length, n
            })
        });

        function Mn(e, t, n, r) {
            var i = r.tabs[e];
            return i.adminIds = n ? [].concat(i.adminIds, t).filter(function(e, t, n) {
                return n.indexOf(e) === t
            }) : i.adminIds.filter(function(e) {
                return e !== t
            }), Promise.resolve(r)
        }
        var xn = x(function(e, t, n, i) {
            var a = i.tabs[e];
            return Object(r.post)(O, {
                act: "a_toggle_admin",
                chat: e,
                hash: a.hash,
                mid: t,
                is_admin: +n
            }).then(function() {
                return Mn(e, t, n, i)
            })
        });

        function Dn(e, t, n, r) {
            var i = Object(l.getMessage)(e, n, t).userId;
            return Object(m.oCacheGet)(r, i) ? Promise.resolve(r) : ft(y({}, n, [i]), r)
        }

        function Pn() {
            ajax.post("al_im.php", {
                act: "a_hide_promo_tooltip"
            })
        }

        function Ln() {
            cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler()
        }
        var Nn = x(function(e, t) {
                return t.tabs[e].top_banner = void 0, Object(r.post)(O, {
                    act: "a_hide_banner",
                    peer_id: e,
                    hash: t.tabs[e].hash
                }).then(function() {
                    return t
                })
            }),
            Rn = x(function(e, t, n) {
                n.tabs[e].top_banner = void 0;
                var i = n.tabs[e];
                return Object(r.post)(O, {
                    act: "a_callback_banner",
                    peer_id: e,
                    callback_data: t,
                    hash: i.hash
                }).then(function() {
                    return n
                })
            });

        function Fn(e, t) {
            return Object(r.post)(O, {
                act: "a_load_banner",
                peer_id: e
            }).then(function(n) {
                var r = v(n, 1)[0];
                return t.tabs[e].top_banner = r, t
            })
        }

        function Hn(e, t, n) {
            return n.tabs[e].keyboard = t && t.buttons ? t : null, Bn(e, !1, !0, n)
        }

        function Un(e, t) {
            return Hn(e, null, t)
        }

        function Bn(e, t, n, r) {
            return ((r.tabs || {})[e] || {}).keyboard && (r.tabs[e].keyboard.hide = t, n && ls.set("is_keyboards_hide", Object.assign(ls.get("is_keyboards_hide") || {}, y({}, e, t)))), Promise.resolve(r)
        }
        var Gn = x(function(e, t) {
            var n = t.tabs[e];
            return Object(r.post)(O, {
                act: "a_get_keyboard",
                peer_id: e,
                hash: n.hash
            }).then(function(n) {
                var r = v(n, 1)[0];
                return Hn(e, r, t)
            })
        });

        function zn(e, t, n, i) {
            var a = i.tabs[e];
            return a.caccess[t] = n, Object(r.post)(O, {
                act: "a_change_caccess",
                peer_id: e,
                member_id: t,
                hash: a.hash,
                access: n ? 1 : 0
            }).then(function() {
                return i
            }).catch(function(e) {
                throw a.caccess[t] = !n, e
            })
        }
        var qn = x(function(e, t) {
            var n = t.tabs[t.peer];
            return Object(r.post)(O, {
                act: "a_delete_template",
                template_id: e,
                hash: n.hash,
                gid: t.gid,
                peer_id: t.peer
            }).then(function() {
                var n = t.templates.find(function(t) {
                    return t.id === e
                });
                return n && (n.deleted = !0), t
            })
        });

        function Kn(e, t, n) {
            var i = n.tabs[n.peer];
            return Object(r.post)(O, {
                act: "a_create_template",
                hash: i.hash,
                gid: n.gid,
                peer_id: n.peer,
                name: e,
                text: t
            }).then(function(e) {
                return n.templates.unshift(e[0]), n
            })
        }

        function Vn(e, t, n, i) {
            var a = i.tabs[i.peer];
            return Object(r.post)(O, {
                act: "a_update_template",
                template_id: e,
                hash: a.hash,
                gid: i.gid,
                peer_id: i.peer,
                group_id: i.gid,
                name: t,
                text: n
            }).then(function(t) {
                var n = i.templates.find(function(t) {
                    return t.id === e
                });
                return n && Object.assign(n, t[0]), i
            })
        }

        function Wn(e, t) {
            if (Object(s.isFullyLoadedTab)(t, e)) {
                var n = Object(l.getTab)(t, e);
                n.allShown = !1, n.lastReset = Date.now()
            }
            return t
        }
    },
    277: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "isWeirdLogging", function() {
            return s
        }), n.d(t, "imWeirdLog", function() {
            return d
        }), n.d(t, "imWeirdCatch", function() {
            return l
        }), n.d(t, "startLoggingAllUnhandled", function() {
            return f
        }), n.d(t, "stopLoggingAllUnhandled", function() {
            return m
        });
        var r = n(237),
            i = n(149),
            a = void 0,
            o = 1;

        function u(e, t, n, r, i) {
            if ("Script error." !== e) {
                var o = i ? i.stack || i.message : null;
                d("unhandled_error", o ? {
                    err: e,
                    stack: o
                } : {
                    err: e
                })
            }
            a && a.apply(this, arguments)
        }

        function c(e) {
            e.preventDefault()
        }

        function s() {
            return !!window.imwl
        }

        function d(e, t) {
            var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
            s() && (n && window.console && (console.error(e, t), console.trace && console.trace()), Object(i.retryFn)(r.post, 3, function() {
                return 2
            })("al_im.php", {
                act: "a_weird_log",
                kind: e,
                data: JSON.stringify(extend({
                    errIdx: o++,
                    ua: navigator.userAgent
                }, t))
            }))
        }

        function l(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return d(e, extend({
                err: t && t.message || t
            }, n)), Promise.reject(t)
        }

        function f() {
            a = window.onerror, window.onerror = u, window.addEventListener("unhandledrejection", c)
        }

        function m() {
            window.onerror = a, a = void 0, window.removeEventListener("unhandledrejection", c)
        }
    },
    280: function(e, t, n) {
        "use strict";

        function r(e) {
            var t = new Date;
            return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate()
        }

        function i(e) {
            return r(new Date(e.getTime() + 864e5))
        }

        function a(e) {
            return r(new Date(e.getTime() - 864e5))
        }

        function o(e, t) {
            var n = new Date(e),
                r = new Date(t);
            return n.getFullYear() === r.getFullYear() && n.getMonth() === r.getMonth() && n.getDate() === r.getDate()
        }

        function u(e) {
            return e >= 10 ? e : "0" + e
        }
        n.r(t), n.d(t, "isToday", function() {
            return r
        }), n.d(t, "isYesterday", function() {
            return i
        }), n.d(t, "isTomorrow", function() {
            return a
        }), n.d(t, "isSameDate", function() {
            return o
        }), n.d(t, "leadingZero", function() {
            return u
        })
    },
    29: function(e, t, n) {
        "use strict";

        function r(e, t) {
            var n = [],
                r = 0;
            return function(i) {
                n.push(i), r || (r = setTimeout(function() {
                    r = !1, e(n), n = []
                }, t))
            }
        }

        function i(e) {
            return e.length > 0 && e.pop().func(), e
        }

        function a(e, t) {
            var n = void 0,
                r = void 0;
            if (window.__debugMode) {
                switch (t) {
                    case "error":
                        n = "color: red", r = "background: red; color: white";
                        break;
                    case "success":
                        n = "color: green", r = "background: green; color: white";
                        break;
                    default:
                        n = "color: blue;", r = "background: #000; color: #fff;"
                }
                try {
                    var i = new Date;
                    console.debug("%cLP:[" + i.getHours() + ":" + i.getMinutes() + ":" + i.getSeconds() + ":" + i.getMilliseconds() + "]%c " + e, r, n)
                } catch (e) {}
            }
        }

        function o(e) {
            var t = [];
            if (void 0 === e.length) return Object.keys(e).map(function(t) {
                return e[t]
            });
            for (var n = 0; n < e.length; n++) t.push(e[n]);
            return t
        }

        function u(e) {
            for (var t = {}, n = [], r = 0; r < e.length; r++) t[e[r]] || (n.push(e[r]), t[n[r]] = 1);
            return n
        }

        function c(e) {
            for (var t = (e + "=".repeat((4 - e.length % 4) % 4)).replace(/\-/g, "+").replace(/_/g, "/"), n = window.atob(t), r = new Uint8Array(n.length), i = 0; i < n.length; ++i) r[i] = n.charCodeAt(i);
            return r
        }

        function s(e) {
            return e.get ? e.get() : e
        }
        n.r(t), n.d(t, "throttleAccumulate", function() {
            return r
        }), n.d(t, "executionStackPop", function() {
            return i
        }), n.d(t, "lplog", function() {
            return a
        }), n.d(t, "toArray", function() {
            return o
        }), n.d(t, "arrayUnique", function() {
            return u
        }), n.d(t, "urlBase64ToUint8Array", function() {
            return c
        }), n.d(t, "unpackStore", function() {
            return s
        })
    },
    30: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "SENDING_CLASS", function() {
            return y
        }), n.d(t, "FAILED_CLASS", function() {
            return w
        }), n.d(t, "ORIGINAL_CLASS", function() {
            return O
        }), n.d(t, "RESTORE_CLASS", function() {
            return j
        }), n.d(t, "TYPING_CLASS", function() {
            return k
        }), n.d(t, "CREATE_CHAT_ACTION", function() {
            return E
        }), n.d(t, "CHAT_TITLE_ACTION", function() {
            return T
        }), n.d(t, "CHAT_INVITE_USER", function() {
            return I
        }), n.d(t, "CHAT_KICK_USER", function() {
            return A
        }), n.d(t, "CHAT_PHOTO_UPDATE", function() {
            return C
        }), n.d(t, "CHAT_PHOTO_REMOVE", function() {
            return S
        }), n.d(t, "CHAT_PIN_MESSAGE", function() {
            return M
        }), n.d(t, "CHAT_UNPIN_MESSAGE", function() {
            return x
        }), n.d(t, "CHAT_INVITE_BY_LINK", function() {
            return D
        }), n.d(t, "DESELECT_ALL_CLASS", function() {
            return P
        }), n.d(t, "SHOW_CHAT_MEMBERS_CLASS", function() {
            return L
        }), n.d(t, "HIDE_TOP_NOTICE_CLASS", function() {
            return N
        }), n.d(t, "HIDE_ASIDE_NOTICE_CLASS", function() {
            return R
        }), n.d(t, "HIDE_ASIDE_PROMO_BLOCK_CLASS", function() {
            return F
        }), n.d(t, "INSTALL_VKADMIN_LINK", function() {
            return H
        }), n.d(t, "CLEAR_RECENT_CLASS", function() {
            return U
        }), n.d(t, "MESSAGE_SEARCH_CLASS", function() {
            return B
        }), n.d(t, "PINNED_CONTAINER_CLASS", function() {
            return G
        }), n.d(t, "getClassicChatHeight", function() {
            return qe
        }), n.d(t, "setClassicChatHeight", function() {
            return Ke
        }), n.d(t, "fixTableCellChildHeight", function() {
            return Ve
        }), n.d(t, "applyInnerHtml", function() {
            return We
        }), n.d(t, "compensateHistoryHeightChange", function() {
            return Ye
        }), n.d(t, "renderSticker", function() {
            return Xe
        }), n.d(t, "isAlreadyDeleted", function() {
            return $e
        }), n.d(t, "replaceMessageAttrs", function() {
            return Qe
        }), n.d(t, "isVoiceMessageAvailable", function() {
            return Ze
        }), n.d(t, "getAvailableMicrophones", function() {
            return Je
        }), n.d(t, "renderAttach", function() {
            return et
        }), n.d(t, "dayFromVal", function() {
            return tt
        }), n.d(t, "showInvisibleBar", function() {
            return nt
        }), n.d(t, "updateMessageInCache", function() {
            return rt
        }), n.d(t, "editAndReplaceMessage", function() {
            return it
        }), n.d(t, "renderMessage", function() {
            return at
        }), n.d(t, "renderMessageMedia", function() {
            return ot
        }), n.d(t, "ensureDomHasActions", function() {
            return ut
        }), n.d(t, "renderCallMessage", function() {
            return ct
        }), n.d(t, "appendToHistory", function() {
            return st
        }), n.d(t, "restoreQueue", function() {
            return dt
        }), n.d(t, "markMessagesAsRead", function() {
            return lt
        }), n.d(t, "replaceAttaches", function() {
            return ft
        }), n.d(t, "isDuplicate", function() {
            return mt
        }), n.d(t, "isPeerActive", function() {
            return gt
        }), n.d(t, "isFvkcomgroup", function() {
            return pt
        }), n.d(t, "isTabLoaded", function() {
            return ht
        }), n.d(t, "isTabLoadedWithMessage", function() {
            return _t
        }), n.d(t, "parseMessage", function() {
            return wt
        }), n.d(t, "convertPeerToUrl", function() {
            return Ot
        }), n.d(t, "unUrlPeer", function() {
            return jt
        }), n.d(t, "simplifyCounter", function() {
            return kt
        }), n.d(t, "chatActions", function() {
            return Et
        }), n.d(t, "renderPhotos", function() {
            return At
        }), n.d(t, "renderPhotosFromTab", function() {
            return Ct
        }), n.d(t, "renderBtnSearchOnlyMessages", function() {
            return St
        }), n.d(t, "renderMessagesSep", function() {
            return Mt
        }), n.d(t, "renderConversationsSep", function() {
            return xt
        }), n.d(t, "renderPopularSuggSep", function() {
            return Dt
        }), n.d(t, "renderClearRecent", function() {
            return Pt
        }), n.d(t, "renderPopularSuggestions", function() {
            return Lt
        }), n.d(t, "setMessageError", function() {
            return Nt
        }), n.d(t, "startResendMessage", function() {
            return Rt
        }), n.d(t, "removeMessages", function() {
            return Ft
        }), n.d(t, "removeStartingFromMessage", function() {
            return Ut
        }), n.d(t, "removeMessagesWithRestore", function() {
            return Bt
        }), n.d(t, "restoreMessage", function() {
            return Gt
        }), n.d(t, "formatTyper", function() {
            return zt
        }), n.d(t, "renderEmptySearch", function() {
            return Kt
        }), n.d(t, "serviceLink", function() {
            return Vt
        }), n.d(t, "renderServiceMsg", function() {
            return Wt
        }), n.d(t, "addChatPhotoToUpdate", function() {
            return Yt
        }), n.d(t, "replaceSpecialSymbols", function() {
            return Xt
        }), n.d(t, "isSelfMessage", function() {
            return $t
        }), n.d(t, "showVerifiedTooltip", function() {
            return Qt
        }), n.d(t, "wrapLoading", function() {
            return Zt
        }), n.d(t, "tabFromIds", function() {
            return Jt
        }), n.d(t, "checkSelectClick", function() {
            return en
        }), n.d(t, "renderGoTo", function() {
            return tn
        }), n.d(t, "showFlushDialog", function() {
            return nn
        }), n.d(t, "showUnpinDialog", function() {
            return rn
        }), n.d(t, "showMsgDeleteDialog", function() {
            return an
        }), n.d(t, "cleanHistory", function() {
            return on
        }), n.d(t, "showChatMembers", function() {
            return un
        }), n.d(t, "inviteUser", function() {
            return cn
        }), n.d(t, "showUnreadOnly", function() {
            return sn
        }), n.d(t, "changeTab", function() {
            return dn
        }), n.d(t, "isImportant", function() {
            return ln
        }), n.d(t, "isUnrespond", function() {
            return fn
        }), n.d(t, "isPeerBlocked", function() {
            return mn
        }), n.d(t, "isPendingForward", function() {
            return gn
        }), n.d(t, "isPeerBlockedByMe", function() {
            return pn
        }), n.d(t, "blockLatencyCompensation", function() {
            return hn
        }), n.d(t, "showSpamLayer", function() {
            return _n
        }), n.d(t, "getLastSeenTextInHeader", function() {
            return bn
        }), n.d(t, "getLastSeenText", function() {
            return vn
        }), n.d(t, "showBlacklistBoxUser", function() {
            return wn
        }), n.d(t, "showBlacklistBox", function() {
            return On
        }), n.d(t, "getBaseLink", function() {
            return jn
        }), n.d(t, "showFavvedBox", function() {
            return kn
        }), n.d(t, "isEditableFocused", function() {
            return En
        }), n.d(t, "updateStar", function() {
            return Tn
        }), n.d(t, "removewNewUnreadBarAndMerge", function() {
            return In
        }), n.d(t, "isMessagesVisible", function() {
            return An
        }), n.d(t, "hideTopNotice", function() {
            return Cn
        }), n.d(t, "hideAsideNotice", function() {
            return Sn
        }), n.d(t, "hideAsidePromoBlock", function() {
            return Mn
        }), n.d(t, "installVKAdminApp", function() {
            return xn
        }), n.d(t, "renderShortText", function() {
            return Dn
        }), n.d(t, "attachToText", function() {
            return Pn
        }), n.d(t, "lockButton", function() {
            return Ln
        }), n.d(t, "unlockButton", function() {
            return Nn
        }), n.d(t, "renderPinnedMessage", function() {
            return Rn
        }), n.d(t, "renderPinnedMedia", function() {
            return Fn
        }), n.d(t, "showEditTimeTooltip", function() {
            return Hn
        }), n.d(t, "getPinnedMessageHeight", function() {
            return Un
        }), n.d(t, "boxHandleEditTimeTooltips", function() {
            return Bn
        }), n.d(t, "showPinnedBox", function() {
            return Gn
        }), n.d(t, "isUserAliveInChat", function() {
            return zn
        }), n.d(t, "getAliveMembersCount", function() {
            return qn
        }), n.d(t, "normalizeTab", function() {
            return Kn
        }), n.d(t, "normalizeTabsGotFromServer", function() {
            return Vn
        }), n.d(t, "splitMessageToParts", function() {
            return Wn
        }), n.d(t, "isMessageTooLong", function() {
            return Yn
        }), n.d(t, "showInvitationBox", function() {
            return Xn
        }), n.d(t, "showWaitUntilUploadedBox", function() {
            return $n
        }), n.d(t, "canMessageBeDeletedForAll", function() {
            return Qn
        }), n.d(t, "getTopChatMembers", function() {
            return Zn
        }), n.d(t, "getChatMembersByIds", function() {
            return Jn
        }), n.d(t, "getChatMembers", function() {
            return er
        }), n.d(t, "formatTimespan", function() {
            return tr
        });
        var r = n(423),
            i = n(163),
            a = n(31),
            o = n(104);
        n.d(t, "getFirstUnread", function() {
            return o.getFirstUnread
        }), n.d(t, "isSearchShown", function() {
            return o.isSearchShown
        }), n.d(t, "getPeer", function() {
            return o.getPeer
        }), n.d(t, "getCurrentKeyboard", function() {
            return o.getCurrentKeyboard
        }), n.d(t, "getKeyboard", function() {
            return o.getKeyboard
        }), n.d(t, "getTab", function() {
            return o.getTab
        }), n.d(t, "getCurrentTab", function() {
            return o.getCurrentTab
        }), n.d(t, "getSelectedMessages", function() {
            return o.getSelectedMessages
        }), n.d(t, "getMessageRangeFromSelection", function() {
            return o.getMessageRangeFromSelection
        }), n.d(t, "countUnread", function() {
            return o.countUnread
        }), n.d(t, "getMessageByRid", function() {
            return o.getMessageByRid
        }), n.d(t, "isRidExist", function() {
            return o.isRidExist
        }), n.d(t, "getLocalId", function() {
            return o.getLocalId
        }), n.d(t, "getLastMessage", function() {
            return o.getLastMessage
        }), n.d(t, "parserMessage", function() {
            return o.parserMessage
        }), n.d(t, "getAuthorFullName", function() {
            return o.getAuthorFullName
        }), n.d(t, "getMessage", function() {
            return o.getMessage
        }), n.d(t, "getPreviousMessage", function() {
            return o.getPreviousMessage
        }), n.d(t, "isClassicInterface", function() {
            return o.isClassicInterface
        }), n.d(t, "isLocksAvailable", function() {
            return o.isLocksAvailable
        }), n.d(t, "isFoldersAvailable", function() {
            return o.isFoldersAvailable
        }), n.d(t, "isCommunityInterface", function() {
            return o.isCommunityInterface
        }), n.d(t, "isChannel", function() {
            return o.isChannel
        }), n.d(t, "getBareTab", function() {
            return o.getBareTab
        }), n.d(t, "isReversedDialogs", function() {
            return o.isReversedDialogs
        }), n.d(t, "isFullyLoadedTab", function() {
            return o.isFullyLoadedTab
        }), n.d(t, "makeTabNotFullyLoaded", function() {
            return o.makeTabNotFullyLoaded
        }), n.d(t, "isGoToEndVisible", function() {
            return o.isGoToEndVisible
        }), n.d(t, "getUnreadScrollBottom", function() {
            return o.getUnreadScrollBottom
        }), n.d(t, "isSendingAvailable", function() {
            return o.isSendingAvailable
        }), n.d(t, "isCommunityPeer", function() {
            return o.isCommunityPeer
        }), n.d(t, "isCommunityBlocked", function() {
            return o.isCommunityBlocked
        }), n.d(t, "checkVoiceMessageAvailable", function() {
            return o.checkVoiceMessageAvailable
        }), n.d(t, "isSearching", function() {
            return o.isSearching
        }), n.d(t, "getSearchText", function() {
            return o.getSearchText
        }), n.d(t, "isSearchingValue", function() {
            return o.isSearchingValue
        }), n.d(t, "isRecentSearchesActive", function() {
            return o.isRecentSearchesActive
        }), n.d(t, "getPinnedMessage", function() {
            return o.getPinnedMessage
        }), n.d(t, "doPopularSuggExist", function() {
            return o.doPopularSuggExist
        }), n.d(t, "isAnyMessageBeingEdited", function() {
            return o.isAnyMessageBeingEdited
        }), n.d(t, "getGroupId", function() {
            return o.getGroupId
        }), n.d(t, "getTabDraft", function() {
            return o.getTabDraft
        }), n.d(t, "getTemplates", function() {
            return o.getTemplates
        });
        var u = n(322),
            c = n(341),
            s = n(336);
        n.d(t, "isChatPeer", function() {
            return s.isChatPeer
        }), n.d(t, "isUserPeer", function() {
            return s.isUserPeer
        }), n.d(t, "isReservedPeer", function() {
            return s.isReservedPeer
        });
        var d = n(212),
            l = n(29),
            f = n(72),
            m = n(452),
            g = n(36),
            p = n(275),
            h = n(277),
            _ = n(470),
            b = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, u = e[Symbol.iterator](); !(r = (o = u.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && u.return && u.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };
        var y = "_im_mess_sending",
            w = "_im_mess_failed",
            O = "_im_mess_original",
            j = "_im_mess_restore",
            k = "_im_typing",
            E = "chat_create",
            T = "chat_title_update",
            I = "chat_invite_user",
            A = "chat_kick_user",
            C = "chat_photo_update",
            S = "chat_photo_remove",
            M = "chat_pin_message",
            x = "chat_unpin_message",
            D = "chat_invite_user_by_link",
            P = "_im_deselect_all",
            L = "_im_show_chat_mems",
            N = "_im_top_notice_hide",
            R = "_im_aside_notice_hide",
            F = "_im_aside_promo_block_hide",
            H = "_im_vkadmin_promo_link",
            U = "_im_clear_recent",
            B = "_im_mess_search",
            G = "_im_pinned",
            z = window,
            q = z.vk,
            K = z.ls,
            V = z.se,
            W = z.re,
            Y = z.rs,
            X = z.sech,
            $ = z.inArray,
            Q = z.intval,
            Z = z.trim,
            J = z.stripHTML,
            ee = z.domFC,
            te = z.domPS,
            ne = z.domLC,
            re = z.domChildren,
            ie = z.domClosestSibling,
            ae = z.domData,
            oe = z.geByClass,
            ue = z.geByClass1,
            ce = z.gpeByClass,
            se = z.addClass,
            de = z.removeClass,
            le = z.toggleClass,
            fe = z.hasClass,
            me = z.attr,
            ge = z.setStyle,
            pe = z.val,
            he = z.getTemplate,
            _e = z.getLang,
            be = z.langSex,
            ve = z.langDate,
            ye = z.langNumeric,
            we = z.getDateText,
            Oe = z.getSmDate,
            je = z.getShortDate,
            ke = z.isSameDate,
            Ee = z.isToday,
            Te = z.ajax,
            Ie = z.showBox,
            Ae = z.showFastBox,
            Ce = z.showTabbedBox,
            Se = z.showTooltip,
            Me = z.mobPlatforms,
            xe = z.onlinePlatformClass,
            De = z.AudioMessagePlayer,
            Pe = z.Emoji,
            Le = z.slideUp,
            Ne = z.fadeOut,
            Re = z.cancelEvent,
            Fe = z.fifaReplaceText,
            He = 4096,
            Ue = 100,
            Be = 8,
            Ge = 52,
            ze = "chatPosition";

        function qe() {
            return K.get(ze) || 0
        }

        function Ke(e) {
            e >= window.clientHeight() - 30 && (e = 0), K.set(ze, e)
        }

        function Ve(e, t) {
            var n = ue(e, t);
            n.firstElementChild.offsetHeight !== n.parentNode.offsetHeight && ge(n.firstElementChild, {
                height: n.parentNode.offsetHeight
            })
        }

        function We(e, t) {
            e && e.innerHTML !== t && (e.innerHTML = t)
        }

        function Ye(e, t, n, r) {
            var i = t && !n ? 1 : !t && n ? -1 : 0;
            i && !Object(o.isClassicInterface)(e) && r().compensateHistoryHeightChange(i)
        }

        function Xe(e, t, n, r) {
            var i = window.devicePixelRatio >= 2 ? "256" : "128",
                a = "animation" === n,
                o = "im_gift";
            a && (o += " sticker_img");
            var u = '<img height="128" class="' + o + '" src="' + ("/images/stickers/" + Q(e) + "/" + i + ".png") + '"/>';
            if (a) {
                var c = "animatedSticker" + r;
                u = '<div id="' + c + '" data-loop-count=3 data-animation-path="' + ("/stickers.php?act=proxy_animation&product_id=" + t + "&sticker_id=" + e) + '" onmouseenter="StickersAnimation.loadAndPlaySticker(this);"\n     data-uniq-id="' + r + '" data-sticker-id="' + Q(e) + '" class="sticker_animation sticker_animation_128 im_gift">' + u + "</div>";
                var s = !1;
                browser.msie ? (0 ^ r) === r && (s = !0) : s = Number.isInteger(r), s && window.StickersSettings.getAutoplay() && window.StickersAnimation && window.StickersAnimation.loadAndPlayStickerWithTimer(c, 10)
            }
            return t && (u = '<a onmouseover="return Emoji.stickerOver(' + Q(e) + ', this);"\n        onclick="return Emoji.clickSticker(' + Q(t) + ', this, event);">' + u + "</a>"), u = '<div class="im_sticker_row">' + u + "</div>"
        }

        function $e(e, t, n) {
            var r = e.get ? e.get() : e;
            if (ht(r, t)) {
                var i = r.tabs[t].deleted || [];
                return $(n, i)
            }
            return !1
        }

        function Qe(e, t, n) {
            var r = n.randomId,
                i = ue("_im_mess_rid" + r, t);
            return i && (t = st(e, n, t = Ht([i], t), !0, !1)), t
        }

        function Ze(e) {
            var t = Object(o.checkVoiceMessageAvailable)(e);
            return browser.mobile && browser.safari ? Promise.resolve(!1) : void 0 !== t ? Promise.resolve(t) : Je().then(function(e) {
                return e.length > 0
            }).catch(function(e) {
                return !1
            })
        }

        function Je() {
            return window.AudioContext && navigator.mediaDevices ? navigator.mediaDevices.enumerateDevices().then(function(e) {
                for (var t = [], n = 0; n < e.length; n++) "audioinput" == e[n].kind && t.push(e[n]);
                return t
            }) : Promise.reject(new Error("NotSupported"))
        }

        function et(e) {
            return he("im_preloader", {
                preloader: Y(q.pr_tpl, {
                    id: ""
                }),
                cls: "im-preloader_attach im-preloader_visible im-preloader_" + e
            })
        }

        function tt(e) {
            var t = e.split(".");
            return (t[0] < 10 ? "0" : "") + t[0] + (t[1] < 10 ? "0" : "") + t[1] + t[2]
        }

        function nt(e) {
            var t = ue("_im_invisible_bar", e);
            t && (de(t, "_im_invisible_bar"), de(t, "im-page--history-new-bar_hide"))
        }

        function rt(e, t, n) {
            var r = ae(n, "msgid"),
                i = ue("_im_mess_" + r, t),
                a = n.cloneNode(!0);
            return i && (i.parentNode.replaceChild(a, i), ut(t)), t
        }

        function it(e, t, n) {
            var r = at(e, t),
                i = ue("_im_mess_" + t.messageId, n);
            return i && (i.parentNode.replaceChild(V(r), i), ut(n)), n
        }

        function at(e, t) {
            var n = ["_im_mess"],
                r = Object(u.isUnread)(e.tabs[t.peerId], t);
            Object(u.isOut)(t) && r && n.push("im-mess_unread _im_mess_unread"), Object(u.isOut)(t) && n.push("im-mess_out"), Object(u.wasEdited)(t) && n.push("im-mess_was_edited"), Object(g.canMessageBeEdited)(e, t) && n.push("im-mess_editable"), Object(u.isImportant)(t) && n.push("im-mess_fav"), -1 != (e.selectedMessages || []).indexOf(t.messageId) && n.push("im-mess_selected");
            var i = Date.now() - 1e3 * t.date > 1e3;
            t.local && i && n.push("im-mess_sending"), t.local && n.push("" + y), t.local && Object(u.wasEdited)(t) && !r && n.push("im-mess_unread im-mess_nobg"), t.failed && n.push("im-mess_failed " + w), Object(u.isGift)(t) && n.push("im-mess_gift");
            var a = ot(t),
                o = wt(e, t.text, t.kludges, !1, t.peerId);
            "" != o && Object(u.wasEdited)(t) && (o += he("sImLblWasEdited", {
                update_time: t.update_time
            })), t.subject && "..." !== t.subject.trim() && !Object(s.isChatPeer)(t.peerId) && (o = he("im_topic", {
                topic: t.subject
            }) + o);
            var c = he("im_message_media", {
                messageId: t.messageId,
                attaches: a.join(""),
                text: Object(u.isGift)(t) ? '<div class="im-mess--gift-lbl">' + o + "</div>" : ""
            });
            return Object(u.isGift)(t) || (c = o + c), "" == o && Object(u.wasEdited)(t) && (c += he("sImLblWasEdited", {
                update_time: t.update_time
            })), he("im_msg_row", {
                msg_id: t.messageId,
                from_id: t.peerId,
                text: c,
                aria_hidden: t.local && !t.failed ? "true" : "false",
                ts: t.date,
                marker_params: t.failed ? 'aria-label="' + _e("mail_send_message_error") + '" role="link"' : "",
                unread_params: r ? 'aria-label="' + _e("mail_unread_message") + '"' : "",
                cls: n.join(" ")
            })
        }

        function ot(e) {
            return e.attaches.map(function(t) {
                return "sticker" === t.type ? e.messageId ? Xe(t.id, t.productId, t.kind, e.messageId) : Xe(t.id, t.productId) : et(t.type)
            })
        }

        function ut(e) {
            for (var t = e.getElementsByClassName("_im_mess_noa"), n = t.length; n--;) fe(t[n], "im-mess_fwd") || t[n].insertAdjacentHTML("afterbegin", he("sImHistoryRowActions")), de(t[n], "_im_mess_noa")
        }

        function ct(e, t, n) {
            var r, i, a, o, u, c = q.id,
                s = e.attaches[0],
                d = s.initiatorId,
                l = s.state,
                m = s.receiverId,
                g = void 0;
            switch (l) {
                case "reached":
                    g = _e(c === d ? "mail_call_outgoing" : "mail_call_incoming");
                    var p = t ? "" : (r = s.duration, i = Math.floor(r / 3600), a = Math.floor(r / 60) - 60 * i, o = !1, u = !1, [i, a, r - 3600 * i - 60 * a].reduce(function(e, t) {
                        return 0 !== t || u ? (o && (t = t < 10 ? "0" + t : t), o = !0, u = !0, e + ("" !== e ? ":" : "") + t) : (u = !0, e)
                    }, ""));
                    g = g.replace("{duration}", p);
                    break;
                case "canceled_by_initiator":
                    g = _e(c === d ? "mail_call_canceled" : "mail_call_missed");
                    break;
                case "canceled_by_receiver":
                    if (c === d) {
                        if (t) return _e("mail_call_declined");
                        var h = Object(f.oCacheGet)(n, m);
                        return h ? be(h.sex, _e("mail_call_declined_by", "raw")).replace("{user_name}", h.first_name) : _e("mail_call_declined")
                    }
                    return _e("mail_call_canceled");
                default:
                    g = _e("mail_added_call")
            }
            return he("im_calls_link", {
                text: g
            })
        }

        function st(e, t, n) {
            !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
            var r = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
                i = !(arguments.length > 5 && void 0 !== arguments[5]) || arguments[5],
                a = Date.now() - 1e3 * t.date > 1e3,
                c = e.tabs[t.peerId];
            if (!n || ue("_im_mess", n) || ue("_im_bar_date", n) || (n.innerHTML = ""), c.skipped > 0) return n;
            var d = [];
            t.local || (d = e.imQueue(t.peerId, r)), d.length > 0 && Ht(d.map(function(e) {
                return ue("_im_mess_rid" + e.rid, n)
            }, n).filter(function(e) {
                return e
            }));
            var m = at(e, t),
                g = ne(n);
            fe(g, "_im_mess_stack") || (g = ie(g, "._im_mess_stack", -1));
            for (var p = Object(o.getLastMessage)(e, t.peerId, t.messageId); t.peerId === e.peer && p && !ue("_im_mess_" + p.messageId);) p = Object(o.getLastMessage)(e, t.peerId, p.messageId);
            var h = ue("_im_unread_bar_row", n),
                _ = Object(u.getUserId)(t),
                b = p ? bt(p.date, e) : 0;
            if (!p || vt(c, p, t, e, i)) {
                var v = "",
                    w = !1;
                if (h && Object(u.isOut)(t) && In(e, n, t.peerId), 1 === c.unread && !Object(u.isOut)(t) && i && (v += he("im_mess_bar", {}), w = !0, In(e, n, t.peerId)), !Ee(new Date(b))) {
                    var O = new Date,
                        j = w ? "im-page--history-new-bar_hide _im_invisible_bar" : "";
                    v += he("im_day_bar", {
                        day: je(t.date, e.timeshift, !0, _e("months_of", "raw"), !0),
                        date: t.date,
                        day_class: O.getDate() + O.getMonth() + O.getFullYear() + " " + j
                    })
                }
                if (Object(u.isServiceMsg)(t)) v += he("im_service_row", {
                    text: Wt(e, t, c),
                    type: "",
                    date: t.date,
                    from_id: "",
                    message_id: t.messageId
                });
                else if (Object(u.isCallMessage)(t)) v += he("im_service_row", {
                    text: Vt("", ct(t, !1, e), ""),
                    type: "",
                    date: t.date,
                    from_id: "",
                    message_id: t.messageId
                });
                else {
                    var k = e.gid && Object(u.isOut)(t) ? Q(t.kludges.from_admin) || -e.gid : 0,
                        E = Object(f.oCacheGet)(e, k ? -e.gid : _) || c,
                        T = Object(s.isChatPeer)(t.peerId) ? E.name : E.first_name,
                        I = E.link || c.href,
                        A = he("im_mess_stack_name", {
                            name: T,
                            link: I,
                            class: Object(u.isMoney)(t) ? " im-mess-stack--lnk-money-transfer" : ""
                        });
                    if (Object(u.isGift)(t)) {
                        var C = _e("mail_gift_message_sent", "raw");
                        A += ' <span class="im-mess-stack--gift">' + be(E.sex || 0, C) + "</span>"
                    }
                    if (Object(u.isMoney)(t)) {
                        var S = Object(u.isMoneyRequest)(t) ? _e("mail_money_request_message_sent", "raw") : _e("mail_money_tranfer_message_sent", "raw");
                        A += ' <span class="im-mess-stack--money-transfer">' + be(E.sex || 0, S) + "</span>"
                    }
                    var M = e.gid ? "/gim" + e.gid : "/im",
                        x = void 0;
                    if (x = t.local ? yt(t.date, e.timeshift) : he("im_stack_date", {
                            date: yt(t.date, e.timeshift),
                            link: M + "?sel=" + t.peerId + "&msgid=" + t.messageId
                        }), k && e.admins[k]) {
                        var D = e.admins[k],
                            P = k === q.id ? _e("mail_by_you") : D[0];
                        x = x + " " + he("im_admin_link", {
                            name: P,
                            href: D[1]
                        })
                    }
                    v += he("im_mess_stack", {
                        photo: E.photo,
                        href: I,
                        cls: "",
                        date_attr: "",
                        link: "/im?sel=" + t.peerId + "&msgid=" + t.messageId,
                        name: J(A),
                        stack_name: A,
                        peerId: _,
                        date: x,
                        messages: m,
                        admin: t.kludges.from_admin || 0
                    })
                }
                Object(l.toArray)(X(v)).forEach(function(e) {
                    return n && n.appendChild(e)
                })
            } else h && e.peer === t.peerId && !c.inplaceSearch && Object(u.isOut)(t) && In(e, n, t.peerId), ue("_im_stack_messages", g).appendChild(V(m));
            return Object(u.isOut)(t) && !a && setTimeout(function() {
                var e = ue("_im_mess_" + t.messageId, n);
                fe(e, y) && se(e, "im-mess_sending")
            }, 500), d = d.filter(function(e) {
                return e.rid !== t.randomId
            }), ut(n), dt(d, e, n)
        }

        function dt(e, t, n) {
            var r = void 0;
            return (r = "object" === (void 0 === e ? "undefined" : v(e)) ? e : t.imQueue(e, !1)).length > 0 && r.map(function(e) {
                return e.mess.failed = !!e.failed, e.mess
            }).filter(function(e) {
                return Object(o.getMessage)(t, e.peerId, e.messageId)
            }).forEach(function(e) {
                return st(t, e, n, !1)
            }), n
        }

        function lt(e, t, n) {
            var r = e.tabs[t];
            return Object(l.toArray)(oe("_im_mess_unread", n)).forEach(function(e) {
                var t, n = Q(ae(e, "msgid"));
                n > 0 && r.out_up_to >= n && (de(e, "_im_mess_unread"), de(e, "im-mess_unread"), (t = ue("_im_mess_blind_unread_marker", e)) && (t.removeAttribute("aria-label"), t.removeAttribute("role"), t.removeAttribute("tabindex")))
            }), n
        }

        function ft(e, t, n) {
            var r = ue("_im_msg_media" + t.messageId, e);
            return r && (r.innerHTML = n.tabs[t.peerId].mediacontent[t.messageId][0]), e
        }

        function mt(e, t) {
            if (!Object(o.isFullyLoadedTab)(t, e.peerId)) return 0;
            var n = t.tabs[e.peerId];
            return n.msgs[e.messageId] ? 1 : n.msgs["rid" + e.randomId] ? 2 : 0
        }

        function gt(e, t) {
            return e === t.peer
        }

        function pt(e, t) {
            return Object(_.doesChatTabHaveFlag)(Object(o.getTab)(e, t), 1024)
        }

        function ht(e, t) {
            return !!e.tabs[t]
        }

        function _t(e, t) {
            return !!ht(e, t) && null !== e.tabs[t].lastmsg
        }

        function bt(e, t) {
            return 1e3 * e + 1e3 * t.timeshift
        }

        function vt(e, t, n, r, i) {
            if (Object(u.getUserId)(t) !== Object(u.getUserId)(n)) return !0;
            var a = bt(t.date, r),
                c = bt(n.date, r);
            return !ke(a, c) || (!(!Object(o.isCommunityInterface)(r) || Q(t.kludges.from_admin) === Q(n.kludges.from_admin)) || (n.date - t.date > 300 || (!(!Object(u.isServiceMsg)(t) && !Object(u.isServiceMsg)(n)) || (!(!Object(u.isCallMessage)(n) && !Object(u.isCallMessage)(t)) || (!(!Object(u.isGift)(t) && !Object(u.isGift)(n)) || (!(!Object(u.isGraffiti)(t) && !Object(u.isGraffiti)(n)) || !(Object(u.isUnread)(e, t) === Object(u.isUnread)(e, n) || !i || Object(u.isOut)(n) || $t(n.peerId, r.gid))))))))
        }

        function yt(e, t) {
            return ve(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !0)
        }

        function wt(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                a = Math.round(1e9 * Math.random()).toString(16),
                u = {},
                s = 0;
            return t = (t = Object(c.replaceHyperLinks)(t || "", c.linksReplacer.bind(null, r))).replace(/(<a.+?<\/a>)/gi, function(e) {
                var t = "!link_" + s + "_" + a + "!";
                return u[t] = e, s++, t
            }), t = Object(c.replaceMentions)(t), t = Object(c.replaceEmailLinks)(t), t = Object(c.replaceHashtags)(t, function(t) {
                var n = Object(o.getGroupId)(e);
                return '<a href="/' + (n ? "gim" + n : "im") + "?sel=" + (i || Object(o.getPeer)(e)) + "&st=" + encodeURIComponent(t) + '">' + t + "</a>"
            }), Object.keys(u).forEach(function(e) {
                t = t.replace(e, function() {
                    return u[e]
                })
            }), n.emoji && (t = Pe.emojiToHTML(t, !0)), Fe && (t = Fe(t)), t
        }

        function Ot(e) {
            return Object(s.isChatPeer)(e) ? "c" + (e - 2e9) : e < -2e9 ? "e" + Math.abs(e + 2e9) : e
        }

        function jt(e) {
            switch (e.substr(0, 1)) {
                case "e":
                    return -2e9 - Q(e.substr(1));
                case "c":
                    return 2e9 + Q(e.substr(1));
                default:
                    return Q(e)
            }
        }

        function kt(e) {
            return e > 9999999 ? Math.floor(e / 1e6) + "M" : e > 9999 ? Math.floor(e / 1e3) + "K" : e > 0 ? e.toString() : ""
        }

        function Et(e, t) {
            return {
                search: {
                    name: _e("mail_im_peer_search"),
                    icon: "search"
                },
                block_community: {
                    icon: "block",
                    name: _e("mail_block_comm_messages")
                },
                allow_community: {
                    icon: "unblock",
                    name: _e("mail_allow_comm_messages")
                },
                clear: {
                    name: e.peer < -2e9 ? _e("mail_im_delete_email_contact") : _e("mail_im_delete_all_history"),
                    icon: "clear"
                },
                chat: {
                    name: _e("mail_im_create_chat_with"),
                    icon: "invite"
                },
                mute: {
                    name: _e("mail_im_mute"),
                    icon: "mute"
                },
                unmute: {
                    name: _e("mail_im_unmute"),
                    icon: "unmute"
                },
                photos: {
                    name: e.gid ? _e("mail_im_show_media_history_group") : _e("mail_im_show_media_history"),
                    icon: "media"
                },
                avatar: {
                    icon: "avatar",
                    name: _e("mail_update_photo_red")
                },
                block: {
                    icon: "block",
                    name: _e("mail_block_user")
                },
                invite: {
                    icon: "invite",
                    name: _e("mail_im_create_chat_with")
                },
                invite_link: {
                    icon: "invite-link",
                    name: _e(t ? "mail_vkcomgroup_invite_link" : "mail_chat_invite_link")
                },
                leave: {
                    icon: "leave",
                    name: _e(t ? "mail_leave_vkcomgroup" : "mail_leave_chat")
                },
                topic: {
                    icon: "topic",
                    name: _e("mail_change_topic")
                },
                return: {
                    icon: "return",
                    name: _e(t ? "mail_return_to_vkcomgroup" : "mail_return_to_chat")
                },
                pin_hide: {
                    icon: "pin_hide",
                    name: _e("mail_menu_pin_hide")
                },
                pin_unhide: {
                    icon: "pin_unhide",
                    name: _e("mail_menu_pin_show")
                },
                unpin: {
                    icon: "unpin",
                    name: _e("mail_menu_unpin")
                },
                settings: {
                    icon: "settings",
                    name: _e(t ? "mail_vkcomgroup_settings" : "mail_settings")
                }
            }
        }

        function Tt(e, t) {
            var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter dialogs_inline_chatter_half"/>';
            return t && (n = he("im_dialogs_link", {
                href: t,
                photo: n
            })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter dialogs_inline_chatter_half">\n      ' + n + "\n    </div>\n  </div>"
        }

        function It(e, t) {
            var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter"/>';
            return t && (n = he("im_dialogs_link", {
                href: t,
                photo: n
            })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter">\n      ' + n + "\n    </div>\n  </div>"
        }

        function At(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            if ("string" == typeof e) return '<div class="im_grid"><img src="' + e + '" alt=""/></div>';
            switch (e.length) {
                case 1:
                    return '<div class="im_grid"><img src="' + e[0] + '" alt=""/></div>';
                case 2:
                    return e.map(function(e, n) {
                        return Tt(e, t[n])
                    }).join("");
                case 3:
                    return Tt(e[0], t[0]) + e.slice(1).map(function(e, n) {
                        return It(e, t[n + 1])
                    }).join("");
                case 4:
                    return e.map(function(e, n) {
                        return It(e, t[n])
                    }).join("")
            }
        }

        function Ct(e, t, n) {
            if ("string" == typeof t.photo && t.photo) return '<div class="im_grid"><img src="' + t.photo + '" alt=""></div>';
            if (Object(s.isChatPeer)(t.peerId) && t.membersCount < 2) return '<div class="im_grid"><img src="' + e.get().default_chat_photo + '" alt=""></div>';
            if (Array.isArray(t.photo)) return At(t.photo);
            var r = t.data.active.slice(0, 4).map(f.oCacheGet.bind(null, e));
            return At(r.map(function(e) {
                return e.photo
            }), n ? [] : r.map(function(e) {
                return e.link
            }))
        }

        function St(e) {
            var t = e.get().gid ? _e("mail_search_only_messages_comm") : _e("mail_search_only_messages");
            return '<li class="im-page--mess-search-w">\n    <div class="im-page--mess-search ' + B + '">\n      <button type="button" class="im-i--messages-search"></button>' + t + "\n    </div>\n  </li>"
        }

        function Mt() {
            return '<li class="im-search-results-head">' + _e("mail_search_messages") + "</li>"
        }

        function xt() {
            return '<li class="im-search-results-head">' + _e("mail_search_conversations_sep") + "</li>"
        }

        function Dt() {
            return '<li class="im-search-results-head">' + _e("mail_search_dialogs_sep") + "</li>"
        }

        function Pt() {
            return '<li class="im-search-results-head _im_recent_bar">\n    ' + _e("mail_recent_searches") + '\n    <button type="button" class="' + U + ' im-page--clear-recent">' + _e("mail_clear_recent") + "</button>\n  </li>"
        }

        function Lt(e) {
            var t = e.get().popular_sugg,
                n = Object(o.isClassicInterface)(e) ? 8 : 5;
            return t.length > n && (t = t.slice(0, n)), '<li class="im-popular clear_fix">' + t.map(function(t) {
                var n = t.peerId,
                    r = Object(f.oCacheGet)(e, n) || t,
                    i = e.get().tabs[n] || t,
                    a = (e.get().mutedPeers || []).indexOf(n) >= 0;
                return '<div class="' + ["im-popular--item", "fl_l", "_im_dialog", "_dont_add_recent", "_im_sugg_" + n, i.unread > 0 && "sugg-is_unread", a && "sugg-is_muted"].filter(function(e) {
                    return !!e
                }).join(" ") + '" data-peer="' + n + '">\n    <a class="im-popular--avatar-w ' + xe(i.online) + '" href="' + r.link + '"><img class="im-popular--avatar" src="' + r.photo + '"/></a>\n    <div class="im-popular--name-w"><a class="im-popular--name" href="' + r.link + '">' + (r.first_name || r.name) + '</a></div>\n    <span class="im-popular--unread _sugg_unread_ct">' + kt(i.unread) + "</span>\n</div>"
            }).join("") + "</li>"
        }

        function Nt(e, t, n) {
            var r = ue("_im_mess_" + t.messageId, n);
            if (r) {
                me(r, "aria-hidden", "false"), se(r, "im-mess_failed " + w);
                var i = ue("_im_mess_marker", r);
                me(i, "aria-label", _e("mail_send_message_error")), me(i, "role", "link")
            }
            return n
        }

        function Rt(e, t, n) {
            var r = ue("_im_mess_" + t, n);
            if (r) {
                de(r, "im-mess_failed"), me(r, "aria-hidden", "true"), de(r, w);
                var i = ue("_im_mess_marker", r);
                me(i, "aria-label", ""), me(i, "role", "")
            }
            return n
        }

        function Ft(e, t) {
            return Ht(e.map(function(e) {
                return ue("_im_mess_" + e, t)
            }).filter(function(e) {
                return e
            }), t)
        }

        function Ht(e, t) {
            var n = e.filter(function(e) {
                return !fe(e, "im-mess_srv")
            }).map(function(e) {
                return e.parentNode
            });
            return e.forEach(function(e) {
                fe(e, "im-mess_srv") ? e.parentNode.parentNode.removeChild(e.parentNode) : e.parentNode.removeChild(e)
            }), n.filter(function(e) {
                return 0 === re(e).length
            }).map(function(e) {
                return ce("_im_mess_stack", e)
            }).forEach(function(e) {
                fe(te(e), "_im_bar_date") && W(te(e)), fe(te(e), "_im_unread_bar_row") && W(te(e)), W(e)
            }), t
        }

        function Ut(e) {
            for (var t = e; t;) {
                var n = t;
                if (null === (t = t.previousElementSibling)) {
                    fe(n, "mess_srv") && (t = n.parentNode);
                    var r = ce("_im_mess_stack", n);
                    r && (t = r.previousElementSibling, 1 === re(n.parentNode).length && r.parentNode.removeChild(r))
                }
                fe(n, "_im_unread_bar_row") || n.parentNode.removeChild(n)
            }
        }

        function Bt(e, t, n, r) {
            return e.map(function(e) {
                return ue("_im_mess_" + e, r)
            }).filter(function(e) {
                return e
            }).forEach(function(e) {
                pe(e, function(e, t, n) {
                    var r = t.innerHTML;
                    return '<div class="im-mess--text">\n    ' + _e("delete" === n ? "mail_deleted_stop" : "mail_marked_as_spam") + ' <button type="button" data-peer="' + e + '" class="' + j + ' im-mess--btn">' + _e("mail_restore") + '</button>\n    <div class="' + O + ' im-mess--original">' + r + "</div>\n  </div>"
                }(t, e, n)), se(e, "im-mess_light")
            }), r
        }

        function Gt(e, t, n) {
            var r = ue("_im_mess_" + e, n);
            if (r) {
                var i = ue(O, r);
                pe(r, i.innerHTML), de(r, "im-mess_light")
            }
            return n
        }

        function zt(e, t, n, r) {
            var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2;
            if (arguments.length > 5 && void 0 !== arguments[5] && arguments[5]) return qt(e, t, n, r, !0, i);
            var a = (Object(o.isClassicInterface)(r), 60),
                u = qt(e, t, n, r, !1, i);
            return u.length > a ? qt(e, t, n, r, !0, i) : u
        }

        function qt(e, t, n, r, i, a) {
            var u, c, d, l = [],
                m = (e && e.userIds || []).filter(function(e) {
                    var t = Object(f.oCacheExists)(r, e);
                    return t || l.push(e), t && e != r.id
                });
            if (l.length && Object(p.loadChatMember)((d = l, (c = t) in (u = {}) ? Object.defineProperty(u, c, {
                    value: d,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : u[c] = d, u), r), 0 === m.length) return "";
            var g = Object(s.isUserPeer)(t) || Object(o.isCommunityPeer)(t) ? "first_name" : i ? "short_name" : "name";
            if (1 == m.length) return (n ? "" : Object(f.oCacheGet)(r, m[0])[g]) + " " + _e("mail_typing");
            var h = _e("mail_typing_several", m.length),
                _ = m.slice(0, Math.min(m.length - 1, a)),
                b = _.map(function(e) {
                    return Object(f.oCacheGet)(r, e)[g]
                }).join(", ");
            if (m.length > a + 1) b += " " + _e("mail_and_peer").replace("{count}", e.totalCount - a).replace("{typing}", h);
            else {
                var v = Object(f.oCacheGet)(r, m[_.length])[g];
                b += " " + _e("mail_and_peer_one") + " " + v + " " + h
            }
            return b
        }

        function Kt() {
            return '<div class="im-page--chat-search-empty">\n    ' + _e("mail_im_search_empty") + "\n  </div>"
        }

        function Vt(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
            return n ? '<a class="im_srv_lnk ' + r + '" target="_blank" href="' + e + '">' + t + "</a>" : '<span class="' + r + '">' + t + "</span>"
        }

        function Wt(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                i = t.kludges,
                a = i.source_act,
                o = Q(i.source_mid),
                u = t.userId,
                c = Object(f.oCacheGet)(e, u),
                s = "",
                d = u === o;
            switch (a) {
                case E:
                    s = "mail_im_chat_created";
                    break;
                case T:
                    s = i.source_is_channel ? "mail_im_title_updated_channel" : "mail_im_title_updated_dot";
                    break;
                case I:
                    s = d ? "mail_im_returned_to_chat" : "mail_im_invited";
                    break;
                case A:
                    s = d ? "mail_im_left" : "mail_im_kicked_from_chat";
                    break;
                case C:
                    s = "mail_im_photo_set";
                    break;
                case S:
                    s = i.source_is_channel ? "mail_im_photo_removed_channel" : "mail_im_photo_removed";
                    break;
                case M:
                    s = i.source_message ? "mail_im_pin_message" : "mail_im_pin_message_empty2";
                    break;
                case x:
                    s = i.source_message ? "mail_im_unpin_message" : "mail_im_unpin_message_empty2";
                    break;
                case D:
                    s = "mail_im_invite_by_link";
                    break;
                default:
                    return "mail_no_support"
            }
            if (s = (s = be(c.sex, _e(s, "raw"))).replace("{from}", Vt(c.link, c.name, r)), o && o !== u) {
                var l = i.source_email;
                if (l) s = s.replace("{user}", Vt("/im?email=" + encodeURIComponent(l), "email", r));
                else {
                    var m = Object(f.oCacheGet)(e, o),
                        g = a === A ? m.inv_name : m.kick_name;
                    s = s.replace("{user}", Vt(m.link, g, r))
                }
            }
            if (i.source_text) {
                var p = i.source_old_text ? '«<b class="im_srv_lnk">' + i.source_old_text + "</b>» &rarr; " : "";
                s = s.replace("{title}", p + '«<b class="im_srv_lnk">' + i.source_text + "</b>»")
            }
            if (i.source_act === M || i.source_act === x)
                if (i.source_message) {
                    var h = Vt("", Xt(Pe.emojiToHTML(J(i.source_message.replace(/<br\s?\/?>/gi, " ")), !0)), !1, "im_srv_mess_link");
                    s = s.replace("{msg}", h)
                } else s = s.replace(/{link}(.+){\/link}/i, function(e, t) {
                    return Vt("", t, !1, "im_srv_mess_link")
                });
            return s
        }

        function Yt(e, t, n, r) {
            if (t === C) {
                var i = ue("_im_mess_" + e.messageId, r);
                if (i) {
                    var a = n.tabs[e.peerId];
                    i.parentNode.innerHTML = he("im_msg_row", {
                        msg_id: e.messageId,
                        from_id: e.peerId,
                        text: Wt(n, e, a) + n.chat_photo_msg,
                        ts: e.date,
                        cls: "im-mess_srv"
                    })
                }
            }
            return r
        }

        function Xt(e) {
            return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(i.MENTION_RAW, "$1$4")
        }

        function $t(e, t) {
            return !t && e === q.id
        }

        function Qt(e, t) {
            return Se(e, {
                url: Object(o.isCommunityPeer)(t) ? "al_groups.php" : "al_profile.php",
                params: {
                    act: "verified_tt",
                    mid: t,
                    gid: t
                },
                slide: 15,
                ajxdt: 200,
                showdt: 200,
                hidedt: 200,
                dir: "auto",
                shift: [94, 7, 7],
                className: "verified_tt"
            })
        }

        function Zt(e) {
            return function(t) {
                var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "bottom",
                    r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                    i = V(he("im_preloader", {
                        preloader: Y(q.pr_tpl, {
                            id: ""
                        }),
                        cls: ["bottom" === n ? "im-preloader_bottom" : "im-preloader_top", r].join(" ")
                    })),
                    a = !1;

                function o() {
                    a = !0, de(i, "im-preloader_visible"), i.parentNode && i.parentNode.removeChild(i)
                }
                setTimeout(function() {
                    a || ("bottom" === n ? e.appendChild(i) : e.insertBefore(i, ee(e)), se(i, "im-preloader_visible"))
                }, 0), t.then(o).catch(function(e) {
                    Object(h.imWeirdCatch)("wrapLoading", e), o()
                })
            }
        }

        function Jt(e, t) {
            return {
                0: {
                    msgs: e.reduce(function(e, t) {
                        return e[t] = [t, r.FLAG_IMPORTANT, 0, 0, "", {}, {}, 0, 0, 0], e
                    }, {}),
                    hash: t,
                    history: 1
                }
            }
        }

        function en(e, t) {
            if (!t && !e) return !1;
            var n = e.target || e.srcElement,
                r = Be,
                i = !1,
                a = /_im_mess|im_log_act|im_log_ract|_im_log_body|im_log_rspacer|_im_graffiti_w|_wall_post_cont/;
            do {
                if (!n || n.onclick || n.onmousedown || "A" == n.tagName || fe(n, "_im_no_select") || fe(n, "im_msg_media_link") || "IMG" == n.tagName && !fe(n, "_im_graffiti") && !fe(n, "emoji") && !fe(n, "emoji_css") && !fe(n, "im_gift") || "TEXTAREA" == n.tagName || fe(n, "play_new") || fe(n, "videoplayer") || (i = a.test(n.className))) break
            } while (r-- && (n = n.parentNode));
            return !i || !!Z((window.getSelection && window.getSelection() || document.getSelection && document.getSelection() || "").toString())
        }

        function tn(e, t) {
            return '<div class="im-mess--text">\n      <span>' + _e("mail_restored") + '</span>\n      <a class="_im_go_to" href="/im?sel=' + Ot(e) + "&msgid=" + t + '">' + _e("mail_im_goto_conversation") + "</a>\n    </div>"
        }

        function nn(e, t, n) {
            var r = _e("mail_deleteall1"),
                i = _e("mail_sure_to_delete_all"),
                a = _e("mail_delete");
            return Object(s.isChatPeer)(t) && (Object(_.doesChatTabHaveFlag)(e, 1024) ? (r = _e("mail_leave_vkcomgroup"), i = _e("mail_unfollow_channel_confirmation"), a = _e("mail_unfollow_channel")) : i = _e("mail_chat_sure_to_delete_all")), Object(o.isCommunityPeer)(t) && (i = _e("mail_group_sure_to_delete_all")), Ae(r, i, a, n, _e("global_cancel"))
        }

        function rn(e) {
            return Ae(_e("mail_unpin_title"), _e("mail_unpin_text"), _e("mail_unpin"), e, _e("global_cancel"))
        }

        function an(e, t, n, r) {
            var i = _e("mail_dialog_msg_delete_N", t),
                a = Ae(_e("mail_dialog_msg_delete_title"), i, _e("mail_delete"), function() {
                    return r(isChecked(ue("_check_forall")))
                }, _e("global_cancel")),
                o = "",
                u = !1;
            return n && (o = '<div class="checkbox im-delete-forall-checkbox _check_forall" onclick="checkbox(this);" role="checkbox" aria-checked="false">' + _e("mail_delete_for_all") + "</div>", u = cur.imDb.selectByKey("del_forall_checked")), a.setControlsText(o), u && checkbox(ue("_check_forall")), a
        }

        function on(e, t, n, r, i) {
            t.showProgress(), e.set(r.bind(null, i)).then(function() {
                t.hideProgress(), t.hide(), n().removePeer(e, i), n().updateDialogFilters(e)
            })
        }

        function un(e, t, n, r, i) {
            var o = e.get().peer;
            Re(r), Ie("al_im.php", {
                act: "a_show_members_box",
                chat: o - 2e9
            }, {
                stat: ["boxes.css"],
                params: {
                    dark: 1
                },
                onDone: function(r, i) {
                    var o = Object(a.createModule)({
                        handlers: function(i, u) {
                            u(r.bodyNode.parentNode, "click", "_im_invite_box", function() {
                                r.hide(), cn(e, e.get().peer, t, n), Object(a.destroyModule)(o)
                            }), u(r.bodyNode.parentNode, "mouseover", "im_status_mob_onl", function(e, t) {
                                var n = ue("_im_chat_members_w", r.bodyNode.parentNode),
                                    i = ce("_im_member_item", t).offsetTop - n.scrollTop + 160 > 370;
                                mobileOnlineTip(t, {
                                    was: Q(ae(t, "was")),
                                    mid: Q(ae(t, "peer")),
                                    vk_mobile: Q(ae(t, "vk_mobile")),
                                    forcetoup: i
                                })
                            })
                        }
                    })
                }
            }, r)
        }

        function cn(e, t, n, r) {
            var i = e.get().tabs[t].memberIds;
            e.set(r.bind(null, "add_member", i)).then(n().showCreation)
        }

        function sn(e, t, n) {
            if (e.get().active_tab === i.FOLDER_ALL && 0 === e.get().unread_cnt) return !1;
            var r = e.get().active_tab === i.FOLDER_ALL ? i.FOLDER_UNREAD : i.FOLDER_ALL;
            return e.set(n.bind(null, r)).then(function(e) {
                t().restoreDialogs(e, !0)
            })
        }

        function dn(e, t, n, r) {
            if (t.get().active_tab === e) return Promise.resolve(t);
            var i = Object(o.isReversedDialogs)(t);
            return t.set(r.bind(null, e)).then(function(e) {
                return n().restoreDialogs(e, !0, i !== Object(o.isReversedDialogs)(e)), e
            })
        }

        function ln(e, t) {
            void 0 === t && (t = e.get().peer);
            var n = e.get().tabs[t];
            return i.FOLDER_MASKS[i.FOLDER_IMPORTANT] & n.folders
        }

        function fn(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (void 0 === t && (t = e.get().peer), !Object(o.isFoldersAvailable)(e)) return !1;
            var r = n || e.get().tabs[t];
            return i.FOLDER_MASKS[i.FOLDER_UNRESPOND] & r.folders
        }

        function mn(e, t) {
            return !1 === ((t.get().block_states || {})[e] || {}).free
        }

        function gn(e) {
            return null != e.get().pendingForward
        }

        function pn(e, t) {
            return (t.get().block_states[e] || {}).who === q.id
        }

        function hn(e, t) {
            var n = e.get().block_states;
            Object.keys(n).forEach(function(i) {
                n[i].time ? !1 === n[i].free && Date.now() - n[i].time >= 5e4 && t.push([r.mutexEvent([, 1, "gim" + e.get().gid, i, 0, ""])]) : n[i].time = Date.now()
            })
        }

        function _n(e, t, n) {
            var r = void 0;
            return !Ce("al_im.php", {
                act: "a_spam",
                offset: "0",
                gid: e.get().gid
            }, {
                onDone: function(n, i) {
                    i && (r = t(n, e, i))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        De.loaded && De.detachPlayer(!0), r.unmount()
                    }
                }
            }, n)
        }

        function bn(e, t) {
            return vn(e.get(), t, Object(o.getTab)(e, t).last_seen)
        }

        function vn(e, t, n, r) {
            if (n[0]) return _e("mail_header_online_status") + (Me[n[0]] ? yn(t, !1, !1, !0, r) : "");
            if (!n[1]) return "";
            var i = we(n[1], e.timeshift),
                a = be(Object(f.oCacheGet)(e, t).sex, _e("mail_last_activity_tip", "raw")).replace("{user}", "").replace("{time}", i);
            return 2 === n[2] ? a += yn(t, !1, !0, !1, r) : n[2] && (a += yn(t, !1, !1, !1, r)), a
        }

        function yn(e, t, n, r, i) {
            var a = {
                mid: e
            };
            r || (a.was = 1), t ? a.forcetoup = !0 : a.forcetodown = !0, n && (a.vk_mobile = 1), a = Object.assign(a, i);
            var o = JSON.stringify(a).slice(1, -1).replace(/"/g, "&quot;");
            return he("im_wrap_mobile", {
                class: "im_status_mob_onl" + (n ? " vk_mobile" : ""),
                params: o,
                attrs: n ? "" : 'onclick="mobilePromo();"'
            })
        }

        function wn(e, t) {
            var n = t.get().tabs[e];
            return Ie("al_settings.php", {
                act: "blacklist_box",
                q: n.href
            }, {
                stat: ["settings.js", "settings.css"],
                dark: 1
            })
        }

        function On(e, t) {
            return Ie("groupsedit.php", {
                act: "bl_edit",
                name: "/id" + e,
                gid: t.get().gid
            }, {
                stat: ["page.css", "ui_controls.js", "ui_controls.css"],
                dark: 1
            })
        }

        function jn(e) {
            return e.get().gid ? "/gim" + e.get().gid : "/im"
        }

        function kn(e, t, n, r) {
            var i = void 0;
            Bn(Ce("al_im.php", {
                act: "a_important",
                offset: "0"
            }, {
                onDone: function(r, a) {
                    a && (i = n(r, e, t, a))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        De.loaded && De.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        i && i.unmount()
                    }
                }
            }, r), e)
        }

        function En() {
            var e = document.activeElement;
            return null !== e && ("INPUT" === e.tagName || "TEXTAREA" === e.tagName || e.getAttribute("contenteditable"))
        }

        function Tn(e, t, n) {
            var r = ue("_im_mess_" + e, n);
            return r && le(r, "im-mess_fav", t), n
        }

        function In(e, t, n) {
            var r = ue("_im_unread_bar_row", t);
            if (!r) return t;
            var i = ie(r, "._im_mess_stack", -1),
                a = ie(r, "._im_mess_stack"),
                u = i ? oe("_im_mess", i).pop() : null,
                c = a ? ue("_im_mess", a) : null;
            if (W(r), nt(t), !c || !u) return t;
            var s = ae(c, "msgid"),
                d = Object(o.getPreviousMessage)(e, n, s),
                f = Object(o.getMessage)(e, n, s);
            if (!d || vt(e.tabs[n], d, f, e)) return t;
            var m = ue("_im_stack_messages", i),
                g = ue("_im_stack_messages", a).children;
            return Object(l.toArray)(g).forEach(function(e) {
                W(e), m.appendChild(e)
            }), W(a), t
        }

        function An(e, t, n) {
            var r = Object(o.getFirstUnread)(e, e.get().peer);
            if (!r) return [!1, 0];
            var i = ue("_im_mess_" + r, t);
            if (!i) {
                var a = Object(o.getLastMessage)(e, e.get().peer, r);
                if (!a) return [!0, 0];
                i = ue("_im_mess_" + a.messageId, t)
            }
            var u = fe(i, "_im_mess_srv") ? i : ce("_im_mess_stack", i);
            if (!u) return [!0, 0];
            var c = i ? i.offsetTop : 0,
                s = u.offsetTop + c,
                d = n.contHeight();
            return s <= n.scrollTop() + n.getScrollHeight() ? [!0, 0] : [!1, Math.max(0, d - s)]
        }

        function Cn(e, t, n) {
            Re(t);
            var r = ce("_im_top_notice", n);
            Ne(r, 200, W.pbind(r));
            var i = ce("_im_page_dialogs", r);
            i && fe(i, "im-page--dialogs-notice") && de(i, "im-page--dialogs-notice"), Te.post("al_im.php", {
                act: "a_hide_top_notice",
                type: r.getAttribute("data-type"),
                hash: r.getAttribute("data-hash")
            })
        }

        function Sn(e, t, n) {
            Re(t);
            var r = ce("_im_aside_notice", n);
            Le(r, 200, W.pbind(r)), Te.post("al_im.php", {
                act: "a_hide_top_notice",
                type: r.getAttribute("data-type"),
                hash: r.getAttribute("data-hash")
            })
        }

        function Mn(e, t) {
            Re(e);
            var n = ce("_im_aside_promo_block", t);
            Le(n, 200, W.pbind(n)), Te.post("al_im.php", {
                act: "a_hide_promo_block",
                type: n.getAttribute("data-type"),
                hash: n.getAttribute("data-hash")
            })
        }

        function xn(e, t) {
            ce("_im_aside_promo_block", t).classList.add("--action-called"), Te.post("al_im.php", {
                act: "a_vkadmin_app_install",
                hash: ae(t, "hash"),
                platform: ae(t, "platform")
            })
        }

        function Dn(e, t, n, r, i) {
            return n = n.replace(/\<br\s*\/?\>(\n)?/gi, " ").replace(/[\n\r]/gi, " "), n = Object(c.replaceMentions)(n, function(e, t, n, r, i) {
                return i
            }), r && (n = Pe.emojiToHTML(n, !0)), t && "..." !== t.trim() && !Object(s.isChatPeer)(e) && (n = he("im_topic", {
                topic: t,
                cls: "im-topic_dialog"
            }) + n), !n && i.length > 0 && (n = he("im_dialog_media", {
                name: Pn(i[0], i)
            })), n
        }

        function Pn(e, t) {
            var n = {
                photo: _e("mail_added_photos", "raw"),
                video: _e("mail_added_videos", "raw"),
                audio: _e("mail_added_audios", "raw")
            };
            switch (e.type) {
                case "mail":
                case "respond":
                    var r = e.object ? e.object.fwd_count : e.id.split(";").length;
                    return ye(r, _e("mail_fwd_msgs", "raw"), !0);
                case "photo":
                case "video":
                case "audio":
                    var i = t.filter(function(t) {
                        return t.type === e.type
                    }).length;
                    return ye(i, n[e.type], !0);
                case "audio_playlist":
                    return _e("mail_added_audio_playlist");
                case "doc":
                    switch (e.kind) {
                        case "graffiti":
                            return _e("mail_added_graffiti");
                        case "audiomsg":
                            return _e("mail_added_audiomsg");
                        default:
                            return _e("mail_added_docs")
                    }
                case "geo":
                case "map":
                    return _e("mail_added_geo");
                case "wall":
                    return _e("mail_added_wall");
                case "wall_reply":
                    return _e("mail_added_wall_reply");
                case "gift":
                    return _e("mail_added_gift");
                case "link":
                case "share":
                    return _e("mail_added_link");
                case "sticker":
                    return _e("mail_added_sticker");
                case "market":
                    return _e("mail_added_market_item");
                case "money_transfer":
                    return _e("mail_added_money_transfer");
                case "money_request":
                    return _e("mail_added_money_request");
                case "story":
                    return _e("mail_added_story");
                case "mask":
                    return _e("mail_added_mask");
                case "article":
                    return _e("mail_added_article");
                case "call":
                    return _e("mail_added_call");
                case "poll":
                    return _e("mail_added_poll");
                case "podcast":
                    return _e("mail_added_podcast");
                default:
                    return _e("mail_added_" + e.type)
            }
            return ""
        }

        function Ln(e) {
            se(e, "im-send-btn_loading")
        }

        function Nn(e) {
            de(e, "im-send-btn_loading")
        }

        function Rn(e) {
            var t = e.get(),
                n = Object(o.getPinnedMessage)(e);
            if (!n || !Object(m.isPinnedMessageVisibleInTab)(e, Object(o.getPeer)(e))) return "";
            var r = Object(f.oCacheGet)(e, n.userId);
            if (!r) return "";
            var i = Fn(e, n);
            return i || (i = !(i = n.text) && n.attaches.length ? he("im_pinned_message_media", {
                text: Pn(n.attaches[0], n.attaches)
            }) : wt(e, i, n && n.kludges || {}) || ""), i = i.replace(/<br\s?\/?>/gi, " "), he("im_pinned_message", {
                date: Oe(n.date, t.timeshift),
                content: i,
                link: r.link,
                name: r.name
            })
        }

        function Fn(e, t) {
            var n = "";
            if (t && Object(u.isMoneyRequest)(t) && void 0 !== t.kludges.attach1_tr_amount) {
                var r = "%s " + t.kludges.attach1_currency;
                if ("RUB" === t.kludges.attach1_currency && (r = _e("mail_money_amount_rub", "raw")), t.kludges.attach1_total_amount) {
                    var i = ye(t.kludges.attach1_tr_amount / 1e3, "%s", !0),
                        a = ye(t.kludges.attach1_total_amount / 1e3, r, !0);
                    n = _e("mail_money_request_collected_amount_from").replace("{amount}", i).replace("{total_amount}", a)
                } else {
                    var o = ye(t.kludges.attach1_tr_amount / 1e3, r, !0);
                    n = _e("mail_money_request_collected_amount").replace("{amount}", o)
                }
                if (Q(t.kludges.attach1_held_amount)) {
                    var c = ye(t.kludges.attach1_held_amount / 1e3, r, !0);
                    n += " " + _e("mail_money_request_held_amount").replace("{amount}", c)
                }
                t.text && (n += '<span class="divider"></span>' + wt(e, t.text, t.kludges)), t.kludges.attach1_total_amount && (n += he("im_pinned_message_media_bar", {
                    percent: Math.min(100, Math.floor(t.kludges.attach1_tr_amount / t.kludges.attach1_total_amount * 100))
                }))
            }
            return n
        }

        function Hn(e, t, n) {
            var r = +n.getAttribute("data-time");
            r && Se(n, {
                text: _e("mail_message_edited") + " " + Oe(r, e.get().timeshift),
                className: "_im_history_tooltip",
                appendParentCls: "_im_mess_stack",
                black: 1,
                shift: [0, 4]
            })
        }

        function Un() {
            var e = getSize(ue(G))[1];
            return e || (e = Ge), e
        }

        function Bn(e, t) {
            e.bodyNode.addEventListener("mouseover", function(e) {
                fe(e.target, "_im_edit_time") && Hn(t, 0, e.target)
            })
        }

        function Gn(e, t, n, r, i) {
            var a = e.get(),
                o = void 0;
            Bn(Ce("al_im.php", {
                act: "a_get_pinned_message_box",
                chat: n,
                gid: e.get().gid,
                hash: a.tabs[n].hash
            }, {
                onDone: function(n, i) {
                    i && (o = r(n, e, t, i))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        De.loaded && De.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        o && o.unmount()
                    }
                }
            }, i), e)
        }

        function zn(e, t) {
            return !(!Object(s.isChatPeer)(e.peerId) || !e.memberIds) && e.memberIds.indexOf(t) >= 0
        }

        function qn(e) {
            return !Object(s.isChatPeer)(e.peerId) || e.data.kicked ? 0 : e.membersCount
        }

        function Kn(e, t) {
            var n = Object(f.oCacheGet)(e, t.peerId),
                r = Object(o.getTab)(e, t.peerId) || {};
            return n && (t.photo = t.photo || n.photo, t.name = t.name || n.name, t.href = t.link || n.link, t.sex = t.sex || n.sex), t.last_touched = r.last_touched || 0, t.verified = !!t.verified, t.lastmsg = t.lastmsg || t.lastmsg_meta && t.lastmsg_meta[0] || !1, t.folders = t.folders || null, t.unread = t.unread || 0, t.last_seen = t.last_seen || [0, 0, 0], t.online = t.last_seen && t.last_seen[0] || 0, t.out_up_to = null != t.out_up_to ? t.out_up_to : t.in_up_to || 0, Object(s.isChatPeer)(t.peerId) && (t.memberIds = t.memberIds || r.memberIds || null), t
        }

        function Vn(e, t) {
            for (var n in t) t.hasOwnProperty(n) && Kn(e, t[n])
        }

        function Wn(e, t) {
            var n = [],
                r = t.find(function(e) {
                    return "mail" === e[0]
                }),
                i = r ? r[1].split(";") : [];
            for (i.length > Ue && (r[1] = i.slice(0, Ue).join(";")); e.length > He;) {
                var a = e.substr(0, He).lastIndexOf(" "); - 1 == a && (a = He), n.push({
                    msgText: Z(e.substr(0, a))
                }), e = Z(e.substr(a))
            }
            for (e.length && n.push({
                    msgText: e,
                    attaches: t
                }), n.length || n.push({
                    attaches: t
                }), i = i.slice(Ue); i.length; i = i.slice(Ue)) n.push({
                attaches: [
                    ["mail", i.slice(0, Ue).join(";")]
                ]
            });
            return n
        }

        function Yn(e) {
            return e.length > He
        }

        function Xn(e, t, n) {
            var r = !1;
            Ie("al_im.php", {
                act: "a_chat_preview",
                chat_id: t.invite_chat_id,
                hash: t.invite_hash
            }, {
                stat: ["boxes.css"],
                params: {
                    dark: 1,
                    hideButtons: !0,
                    onHide: function() {
                        e.set(n), r && r.unmount()
                    }
                },
                onFail: function(e) {
                    return setTimeout(function() {
                        return Ae(_e("global_error"), e)
                    }, 0), !0
                },
                onDone: function(t, n) {
                    r = Object(d.mount)(t.bodyNode, e)
                }
            }, {})
        }

        function $n() {
            Ae(_e("global_error"), _e("mail_message_wait_until_uploaded"))
        }

        function Qn(e, t) {
            var n = Object(o.getTab)(e, t.peerId) || {};
            if (!t || !Object(u.isOut)(t)) return !1;
            if (333 == t.peerId) return !1;
            if (Date.now() / 1e3 - t.date > 86400) return !1;
            if ($e(e, t.peerId, t.messageId)) return !1;
            if (Object(s.isChatPeer)(t.peerId)) {
                if (n.data.kicked || n.data.closed) return !1
            } else if (n.block_error > 0) return !1;
            return !0
        }

        function Zn(e, t) {
            var n = Object(o.getTab)(e, t),
                r = -1 !== n.memberIds.indexOf(n.ownerId),
                i = r ? [n.ownerId] : [];
            return (i = i.concat(n.memberIds.filter(function(t) {
                return t !== n.ownerId && Object(f.oCacheExists)(e, t)
            }).slice(0, r ? 4 : 5))).map(function(t) {
                return Object(f.oCacheGet)(e, t)
            })
        }

        function Jn(e, t) {
            return t.map(function(t) {
                return Object(f.oCacheGet)(e, t)
            })
        }

        function er(e, t) {
            return Object(o.getTab)(e, t).memberIds.reduce(function(t, n) {
                var r = Object(f.oCacheGet)(e, n);
                return t[r.id] = r, t
            }, {})
        }

        function tr(e, t) {
            if ("number" != typeof e || 0 === e) return "";
            var n, r = e,
                i = [];
            if ([
                    [31536e3, _e(t ? "global_years_accusative" : "global_age_years", "raw")],
                    [2592e3, _e(t ? "global_months_accusative" : "global_age_months", "raw")],
                    [604800, _e(t ? "global_weeks_accusative" : "global_age_weeks", "raw")],
                    [86400, _e(t ? "global_days_accusative" : "global_age_days", "raw")],
                    [3600, _e(t ? "global_hours_accusative" : "global_hours", "raw")],
                    [60, _e(t ? "global_minutes_accusative" : "global_minutes", "raw")],
                    [1, _e(t ? "global_seconds_accusative" : "global_age_seconds", "raw")]
                ].forEach(function(e) {
                    var t = b(e, 2),
                        n = t[0],
                        a = t[1],
                        o = Math.floor(r / n);
                    r %= n, o >= 1 && i.push(ye(o, a))
                }), 1 === (n = i.length)) return i.pop();
            var a = i.slice(0, n - 1).join(", "),
                o = i.pop();
            return _e("global_and").replace(/{before}/gi, a).replace(/{after}/gi, o)
        }
    },
    309: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "parseLatin", function() {
            return a
        }), n.d(t, "parseCyr", function() {
            return o
        }), n.d(t, "parseLatKeys", function() {
            return u
        }), n.d(t, "langNumeric", function() {
            return c
        }), n.d(t, "langSex", function() {
            return s
        }), n.d(t, "langStr", function() {
            return d
        }), n.d(t, "addLangKeys", function() {
            return l
        }), n.d(t, "getLang", function() {
            return f
        }), n.d(t, "langDate", function() {
            return m
        }), n.d(t, "getShortDate", function() {
            return g
        }), n.d(t, "getShortDateOrTime", function() {
            return p
        }), n.d(t, "langWordNumeric", function() {
            return h
        }), n.d(t, "getDateText", function() {
            return _
        }), n.d(t, "getBigDateNew", function() {
            return b
        }), n.d(t, "getSmDate", function() {
            return v
        });
        var r = n(280),
            i = n(54);

        function a(e) {
            for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], n = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], r = e, i = 0, a = t.length; i < a; i++) r = r.split(t[i]).join(n[i]);
            for (var o = "abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ", u = 0, c = o.length; u < c; u++) r = r.split(o.charAt(u)).join("абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ".charAt(u));
            return r === e ? null : r
        }

        function o(e) {
            for (var t = ["yo", "zh", "kh", "ts", "ch", "sch", "shch", "sh", "eh", "yu", "ya", "YO", "ZH", "KH", "TS", "CH", "SCH", "SHCH", "SH", "EH", "YU", "YA", "'"], n = ["ё", "ж", "х", "ц", "ч", "щ", "щ", "ш", "э", "ю", "я", "Ё", "Ж", "Х", "Ц", "Ч", "Щ", "Щ", "Ш", "Э", "Ю", "Я", "ь"], r = "абвгдезийклмнопрстуфхцыАБВГДЕЗИЙКЛМНОПРСТУФХЦЫеЕ", i = e, a = 0; a < n.length; a++) i = i.split(n[a]).join(t[a]);
            for (var o = 0; o < r.length; o++) i = i.split(r.charAt(o)).join("abvgdezijklmnoprstufhcyABVGDEZIJKLMNOPRSTUFHCYёЁ".charAt(o));
            return i === e ? null : i
        }

        function u(e) {
            for (var t = "qwertyuiop[]asdfghjkl;'zxcvbnm,./`", n = e, r = 0; r < t.length; r++) n = n.split(t.charAt(r)).join("йцукенгшщзхъфывапролджэячсмитьбю.ё".charAt(r));
            return n == e ? null : n
        }

        function c(e, t, n) {
            if (!t || !window.langConfig) return e;
            var r = void 0;
            if (Object(i.isArray)(t) ? (r = t[1], e != Math.floor(e) ? r = t[langConfig.numRules.float] : Object(i.each)(langConfig.numRules.int, function(n, a) {
                    if ("*" == a[0]) return r = t[a[2]], !1;
                    var o = a[0] ? e % a[0] : e;
                    return -1 != Object(i.indexOf)(a[1], o) ? (r = t[a[2]], !1) : void 0
                })) : r = t, n) {
                for (var a = e.toString().split("."), o = [], u = a[0].length - 3; u > -3; u -= 3) o.unshift(a[0].slice(u > 0 ? u : 0, u + 3));
                a[0] = o.join(langConfig.numDel), e = a.join(langConfig.numDec)
            }
            return r = (r || "%s").replace("%s", e)
        }

        function s(e, t) {
            if (!Object(i.isArray)(t)) return t;
            var n = t[1];
            return window.langConfig ? (Object(i.each)(langConfig.sexRules, function(r, i) {
                return "*" == i[0] ? (n = t[i[1]], !1) : e == i[0] && t[i[1]] ? (n = t[i[1]], !1) : void 0
            }), n) : n
        }

        function d(e) {
            for (var t = arguments, n = t.length, r = e + "", i = 1; i < n; i += 2) {
                var a = "%" === t[i][0] ? t[i] : "{" + t[i] + "}";
                r = r.replace(a, t[i + 1])
            }
            return r
        }

        function l(e, t) {
            var n = t ? window : window.cur;
            n.lang ? Object(i.extend)(n.lang, e) : n.lang = e
        }

        function f() {
            try {
                var e = Array.from(arguments),
                    t = e.shift();
                if (!t) return "...";
                var n = window.cur.lang && window.cur.lang[t] || window.lang && window.lang[t] || window.langpack && window.langpack[t] || window[t];
                if (!n) {
                    var r = t.split("_");
                    return r.shift(), r.join(" ")
                }
                return Object(i.isFunction)(n) ? n.apply(null, e) : void 0 === e[0] && !Object(i.isArray)(n) || "raw" === e[0] ? n : c(e[0], n, e[1])
            } catch (e) {
                debugLog("lang error:" + e.message + "(" + Array.from(arguments).join(", ") + ")")
            }
        }

        function m(e, t, n, a, o, u) {
            var c = void 0;
            if (u || (u = ""), Object(i.isArray)(t) || (t = ["", t, t, t, t]), "number" == typeof e || "string" == typeof e ? (e > 2147483646e3 && (e = 0), e += n, c = new Date(e)) : c = e, o) t = t[1];
            else {
                var s = "";
                !(s = Object(r.isToday)(c) ? t[3] : Object(r.isYesterday)(c) ? t[2] : Object(r.isTomorrow)(c) ? t[4] : t[1]) && t[1] && (s = t[1]), t = s
            }
            var d = {
                    hours: c.getHours(),
                    minutes: c.getMinutes(),
                    seconds: c.getSeconds(),
                    day: c.getDate(),
                    month: c.getMonth() + 1,
                    year: c.getFullYear()
                },
                l = "";
            switch (3 === vk.lang && (l = c.getHours() > 11 ? "pm" : "am", d.hours = c.getHours() % 12 == 0 ? 12 : c.getHours() % 12), vk.lang) {
                case 1:
                    switch (c.getHours()) {
                        case 11:
                            t = t.replace(" о ", " об ");
                            break;
                        case 0:
                            t = t.replace(" о ", " в ")
                    }
                    break;
                case 3:
                    !Object(r.isToday)(c) || Object(r.isYesterday)(c) || Object(r.isTomorrow)(c) || (t = u + t);
                    break;
                case 12:
                case 73:
                    1 == c.getHours() && (t = t.replace(" &#224;s ", " &#224; "))
            }
            return 68 === vk.lang && (d.year = d.year + 543), t.replace("{hour}", d.hours).replace("{num_hour}", Object(r.leadingZero)(d.hours)).replace("{minute}", Object(r.leadingZero)(d.minutes)).replace("{day}", d.day).replace("{num_day}", Object(r.leadingZero)(d.day)).replace("{month}", a[d.month]).replace("{year}", d.year).replace("{short_year}", d.year % 100).replace("{second}", Object(r.leadingZero)(d.seconds)).replace("{am_pm}", l)
        }

        function g(e, t, n, r, i) {
            e *= 1e3, void 0 === n && (n = !0), void 0 === r && (r = f("months_of", "raw")), t *= 1e3;
            var a = Date.now(),
                o = new Date(a),
                u = new Date(e + t);
            return !i && e > a && e - a < 864e5 && o.getDate() === u.getDate() ? m(e, "{hour}:{minute} {am_pm}", t, [], !n) : u.getYear() !== o.getYear() || e < a - 157248e5 ? m(e, f("global_date", "raw"), t, r, !n) : m(e, f("global_short_date", "raw"), t, r, !n)
        }

        function p(e, t, n, i) {
            return Object(r.isToday)(new Date(1e3 * e + 1e3 * t)) ? m(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !n) : g(e, t, n, i)
        }

        function h(e, t, n) {
            return Object(i.isArray)(t) && e < t.length ? t[e] : c(e, n)
        }

        function _(e, t) {
            e += t;
            var n = parseInt(Date.now() / 1e3) - e,
                r = "";
            if (n < 60) r = f("global_just_now");
            else if (n < 3600) {
                r = h(Object(i.intval)(n / 60), f("global_word_mins_ago", "raw"), f("global_mins_ago", "raw"))
            } else if (n < 14400) {
                r = h(Object(i.intval)(n / 3600), f("global_word_hours_ago", "raw"), f("global_hours_ago", "raw"))
            } else r = b(e, 0, !0, "_l");
            return r
        }

        function b(e, t, n, r) {
            void 0 === n && (n = !0), void 0 === t && (t = 0), void 0 === r && (r = ""), t *= 1e3;
            var i = new Date(1e3 * e),
                a = new Date;
            return i.getFullYear() !== a.getFullYear() && i.getTime() < a.getTime() - 1728e5 || Math.abs(i.getTime() - a.getTime()) > 157248e5 ? m(1e3 * e, f("global_date", "raw"), t, f("months_sm_of"), !n) : m(1e3 * e, f("global_short_date_time" + r, "raw"), t, f("months_sm_of"), !n)
        }

        function v(e, t, n) {
            void 0 === n && (n = !0), void 0 === t && (t = 0);
            var r = new Date,
                i = r.getFullYear(),
                a = r.getMonth(),
                o = new Date(1e3 * e),
                u = o.getFullYear(),
                c = o.getMonth();
            return m(1e3 * e, f(u < i && (a > 1 || c < 9 || i - u >= 2) ? "global_date" : "global_short_date_time", "raw"), t, f("months_sm_of", "raw"), !n)
        }
        window.parseLatin = a, window.parseCyr = o, window.parseLatKeys = u, window.langNumeric = c, window.langSex = s, window.langStr = d, window.addLangKeys = l, window.getLang = f, window.langDate = m, window.getShortDate = g, window.getShortDateOrTime = p, window.langWordNumeric = h, window.getDateText = _, window.getBigDateNew = b, window.getSmDate = v
    },
    31: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "createMutations", function() {
            return c
        }), n.d(t, "createModule", function() {
            return s
        }), n.d(t, "destroyModule", function() {
            return d
        });
        var r = n(27);

        function i(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }
        var a = window,
            o = a.addEvent,
            u = a.removeEvent;

        function c(e) {
            return {
                callMutations: function() {
                    if ("function" == typeof e) throw console.trace(), new Error("Mutations are not initialized");
                    return e
                },
                bindMutations: function() {
                    if ("function" != typeof e) throw console.trace(), new Error("Mutations are already initialized");
                    return e = e.apply(void 0, arguments)
                }
            }
        }

        function s(e) {
            var t = {
                _registeredHandlers: []
            };
            return e.handlers(function(e, t, n, r) {
                o(t, n, r), e._registeredHandlers.push(["bind", t, n, r])
            }.bind(null, t), function(e, t, n, i, a) {
                Object(r.addDelegateEvent)(t, n, i, a), e._registeredHandlers.push(["delegate", t, n, i, a])
            }.bind(null, t)), t
        }

        function d(e) {
            e._registeredHandlers.forEach(function(e) {
                var t = e.slice(1);
                "delegate" === e[0] ? r.removeDelegateEvent.apply(void 0, i(t)) : u.apply(void 0, i(t))
            }), e._registeredHandlers = []
        }
    },
    322: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "isUnread", function() {
            return a
        }), n.d(t, "isServiceMsg", function() {
            return o
        }), n.d(t, "isCallMessage", function() {
            return u
        }), n.d(t, "isOut", function() {
            return c
        }), n.d(t, "isGraffiti", function() {
            return d
        }), n.d(t, "isAudioMsg", function() {
            return l
        }), n.d(t, "isSticker", function() {
            return f
        }), n.d(t, "isGift", function() {
            return m
        }), n.d(t, "isMoney", function() {
            return g
        }), n.d(t, "isMoneyRequest", function() {
            return p
        }), n.d(t, "isVKPay", function() {
            return h
        }), n.d(t, "isImportant", function() {
            return _
        }), n.d(t, "getUserId", function() {
            return b
        }), n.d(t, "getAuthorId", function() {
            return v
        }), n.d(t, "wasEdited", function() {
            return y
        }), n.d(t, "isMessageSelected", function() {
            return w
        });
        var r = n(423),
            i = n(29);

        function a(e, t) {
            return "number" != typeof t.messageId || (c(t) ? t.messageId > e.out_up_to : t.messageId > e.in_up_to)
        }

        function o(e) {
            return e.kludges && void 0 !== e.kludges.source_act
        }

        function u(e) {
            return "call" == e.kludges.attach1_type
        }

        function c(e) {
            return e.flags & r.FLAG_OUTBOUND
        }

        function s(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                r = e.attaches[0];
            return r && (r.type === t || r.type === n)
        }

        function d(e) {
            return s(e, "doc") && "graffiti" === e.attaches[0].kind
        }

        function l(e) {
            return s(e, "doc") && "audiomsg" === e.attaches[0].kind
        }

        function f(e) {
            return s(e, "sticker")
        }

        function m(e) {
            return s(e, "gift")
        }

        function g(e) {
            return s(e, "money_transfer", "money_request")
        }

        function p(e) {
            return s(e, "money_request")
        }

        function h(e) {
            return s(e, "link", "vkpay") && 6217559 == e.kludges.attach1_app_id
        }

        function _(e) {
            return e.flags & r.FLAG_IMPORTANT
        }

        function b(e) {
            return c(e) ? vk.id : e.userId
        }

        function v(e, t) {
            var n = Object(i.unpackStore)(e);
            return c(t) ? n.id : t.userId
        }

        function y(e) {
            return e.update_time > 0
        }

        function w(e, t) {
            return (e.get().selectedMessages || []).indexOf(t) >= 0
        }
    },
    336: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "parseFwd", function() {
            return u
        }), n.d(t, "convertKludgesToAttaches", function() {
            return c
        }), n.d(t, "isReservedPeer", function() {
            return s
        }), n.d(t, "isUserPeer", function() {
            return d
        }), n.d(t, "isChatPeer", function() {
            return l
        });
        var r = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, u = e[Symbol.iterator](); !(r = (o = u.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && u.return && u.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            i = window.intval;

        function a(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                n = e.split("_"),
                i = r(n, 2);
            return [i[0], i[1], t]
        }
        var o = {};

        function u(e) {
            if (o[e]) return o[e];
            for (var t = e ? e.length : 0, n = [], i = [], u = "", c = 0; c < t; c++) {
                var s = e[c],
                    d = s.charCodeAt(0);
                d >= 48 && d <= 57 || "_" === s || "-" === s ? u += s : "(" !== s && ")" !== s && ":" !== s && "," !== s || ("" !== u && (i.push(u), n.push("id"), u = ""), i.push(s), n.push(s))
            }
            u.length > 0 && (i.push(u), n.push("id"));
            var l = function e(t, n) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                        o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
                    if (o > 50) return [
                        [], t.length
                    ];
                    for (var u = [], c = ""; i < t.length;) {
                        var s = t[i];
                        if ("id" === s) c = n[i];
                        else if ("," === s && c) u.push(a(c)), c = "";
                        else if ("(" === s) {
                            var d = e(t, n, i + 1, o + 1),
                                l = r(d, 2),
                                f = l[0];
                            i = l[1], u.push(a(c, f)), c = ""
                        } else if (")" === s) return "" !== c && u.push(a(c)), [u, i];
                        i++
                    }
                    return c && u.push(a(c)), [u, i]
                }(n, i),
                f = r(l, 1)[0];
            return Object.keys(o).length > 300 && (o = {}), o[e] = f, f
        }

        function c(e, t) {
            var n = [];
            e.fwd_count ? n.push({
                type: "mail",
                id: -t,
                object: {
                    fwd_count: e.fwd_count
                }
            }) : e.fwd && n.push({
                type: "mail",
                id: -t,
                object: {
                    fwd_count: u(e.fwd).length
                }
            });
            for (var r = 1; e["attach" + r + "_type"]; ++r) "call" === e["attach" + r + "_type"] ? n.push({
                type: e["attach" + r + "_type"],
                id: e["attach" + r],
                initiatorId: i(e["attach" + r + "_call_initiator_id"]),
                state: e["attach" + r + "_call_state"],
                duration: i(e["attach" + r + "_call_duration"]),
                receiverId: i(e["attach" + r + "_call_receiver_id"])
            }) : n.push({
                type: e["attach" + r + "_type"],
                id: e["attach" + r],
                kind: e["attach" + r + "_kind"],
                productId: e["attach" + r + "_product_id"]
            });
            return e.geo && n.push({
                type: "geo",
                id: e.geo
            }), n
        }

        function s(e) {
            return 0 == e
        }

        function d(e) {
            return e > 0 && e < 2e9
        }

        function l(e) {
            return e > 2e9
        }
    },
    341: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "replaceHyperLinks", function() {
            return s
        }), n.d(t, "replaceEmailLinks", function() {
            return d
        }), n.d(t, "replaceMentions", function() {
            return l
        }), n.d(t, "replaceHashtags", function() {
            return g
        }), n.d(t, "confirmDelivery", function() {
            return p
        }), n.d(t, "linksReplacer", function() {
            return h
        });
        var r = n(163),
            i = void 0,
            a = window,
            o = a.clean,
            u = a.replaceEntities,
            c = a.statlogsValueEvent;

        function s(e, t) {
            for (var n = void 0, i = 0, a = e; null !== (n = r.MESSAGE_REGEXP.exec(e));) {
                var o = (n = f(n))[0].length,
                    u = n.index + o,
                    c = e[n.index - 1],
                    s = e[u - 1],
                    d = void 0 !== c && /([\w\$А-Яа-яёЁєЄҐґЇїІіЈј\—\-\_@;.])/i.test(c),
                    l = void 0 !== s && /([:;$])/i.test(s);
                if (!d && !l) {
                    var g = m(n),
                        p = g.domain.toLowerCase();
                    if (p.length <= r.MAX_DOMAIN_LENGTH && -1 !== r.TOP_DOMAINS.indexOf(p)) {
                        var h = t(g);
                        a = a.slice(0, n.index + i) + h + a.slice(u + i), i += h.length - o
                    }
                }
            }
            return a
        }

        function d(e, t) {
            return e.replace(r.EMAIL, t || function(e) {
                return '<a href="mailto:' + e + '">' + e + "</a>"
            })
        }

        function l(e, t) {
            return e.replace(r.MENTION, t || function(e, t, n, r, i) {
                return '<a href="/' + (t + n) + '" class="mem_link" mention="' + o(r || "") + '" mention_id="' + o(t + n) + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)">' + i + "</a>"
            })
        }

        function f(e) {
            if (!e[0] || !e[6]) return e;
            var t = e[0].length - 1,
                n = e[6].length - 1;
            return "." === e[0][t] && "." === e[6][n] && (e[0] = e[0].slice(0, t), e[6] = e[6].slice(0, n)), e
        }

        function m(e) {
            return {
                full: e[0],
                protocol: e[1] || "http://",
                url: e[2],
                domain: e[4],
                query: e[6] || ""
            }
        }

        function g(e, t) {
            return e.replace((i || (i = new RegExp(r.RE_HASHTAG_EXTRACTION_PATTERN, "ig")), i), function(e, n, r, i, a, o) {
                return (n || "") + t(r + (a || ""))
            })
        }

        function p(e) {
            c("ttl_message_confirm_delivery", e)
        }

        function h(e, t) {
            var n = t.protocol,
                i = t.url,
                a = t.query,
                c = t.domain,
                s = t.full;
            try {
                s = decodeURIComponent(s)
            } catch (e) {}
            if (s.length > 55 && (s = s.substr(0, 53) + ".."), s = o(s).replace(/&amp;/g, "&"), !e && c.match(r.OUR_DOMAINS)) {
                var d, l = i = u(i).replace(r.ENTITIES, encodeURIComponent),
                    f = i.indexOf("#/"),
                    m = "";
                return f >= 0 ? l = i.substr(f + 1) : (f = i.indexOf("#!")) >= 0 && (l = "/" + i.substr(f + 2).replace(/^\//, "")), (d = l.match(r.VK_DOMAIN)) && d[1].length < 32 && (m = ' mention_id="' + d[1] + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"'), '<a href="' + function(e) {
                    return e.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                }(n + i + a) + '" target="_blank"' + m + ">" + s + "</a>"
            }
            return '<a href="' + ("away.php?utf=1&to=" + encodeURIComponent(n + u(i + a))) + '" target="_blank" onclick="' + ("return goAway('" + o((n + i + a).replace(/'/g, "\\'")) + "', {}, event);") + '">' + s + "</a>"
        }
    },
    36: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "canMessageBeEdited", function() {
            return c
        }), n.d(t, "convertEmojiHtmlToRegularText", function() {
            return s
        }), n.d(t, "findLastMessageToEdit", function() {
            return d
        }), n.d(t, "wasMessageReallyModified", function() {
            return l
        }), n.d(t, "replaceMsgAfterEdit", function() {
            return f
        });
        var r = n(104),
            i = n(322),
            a = n(30),
            o = n(336),
            u = n(29);

        function c(e, t) {
            t = Object(r.parserMessage)(t);
            var n = vk.id == t.peerId && !Object(u.unpackStore)(e).gid;
            return 333 != t.peerId && (!(!n && !Object(i.isOut)(t)) && (!Object(i.isServiceMsg)(t) && (!(Date.now() / 1e3 - t.date > 86400) && (!(Object(i.isGift)(t) || Object(i.isSticker)(t) || Object(i.isAudioMsg)(t) || Object(i.isGraffiti)(t) || Object(i.isMoney)(t) || Object(i.isVKPay)(t)) && !Object(a.isAlreadyDeleted)(e, t.peerId, t.messageId)))))
        }

        function s(e) {
            var t = document.createElement("div");
            return e = e.replace(/\[((id|club)\d+)\|(.+?)]/g, function() {
                var e = arguments.length <= 1 ? void 0 : arguments[1],
                    t = arguments.length <= 3 ? void 0 : arguments[3];
                return /^\@/.test(t) ? t : "@" + e + " (" + t + ")"
            }), t.innerHTML = e, Emoji.val(t)
        }

        function d(e, t) {
            return +(t && t.msgs ? Object.keys(t.msgs) : []).filter(function(e) {
                return e > 0
            }).sort(function(e, t) {
                return t - e
            }).find(function(n) {
                return c(e, t.msgs[n])
            }) || null
        }

        function l(e, t, n) {
            var r = Object(o.convertKludgesToAttaches)(t.kludges, t.messageId),
                i = n.dData.attaches;
            if (s(t.text) !== n.dData.txt || r.length !== i.length) return !0;
            for (var a = r.length; a--;) {
                var u = r[a],
                    c = i[a];
                if (u.id != c.id || u.type != c.type || "poll" == u.type && c.object && c.object.poll_is_edited) return !0
            }
            return !1
        }

        function f(e, t, n, r, i, o) {
            t.origText = n, t.text = Object(a.replaceSpecialSymbols)(clean(n)).replace(/\n/gi, "<br>"), t.attaches = r, t.kludges.emoji = 1, t.local = 1, t.share_url = i, t.cancelled_shares = o, t.update_time = Math.floor(Date.now() / 1e3), e.get().tabs[t.peerId].msgs[t.messageId] = t
        }
    },
    360: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "ge", function() {
            return a
        }), n.d(t, "geByTag", function() {
            return o
        }), n.d(t, "geByTag1", function() {
            return u
        }), n.d(t, "geByClass", function() {
            return c
        }), n.d(t, "geByClass1", function() {
            return s
        }), n.d(t, "gpeByClass", function() {
            return d
        }), n.d(t, "domQuery", function() {
            return l
        }), n.d(t, "domQuery1", function() {
            return f
        }), n.d(t, "domClosest", function() {
            return m
        }), n.d(t, "domClosestByTag", function() {
            return g
        }), n.d(t, "gpeByTag", function() {
            return p
        }), n.d(t, "ce", function() {
            return h
        }), n.d(t, "re", function() {
            return O
        }), n.d(t, "se", function() {
            return j
        }), n.d(t, "sech", function() {
            return k
        }), n.d(t, "rs", function() {
            return E
        }), n.d(t, "psr", function() {
            return T
        }), n.d(t, "domReplaceEl", function() {
            return I
        }), n.d(t, "domEL", function() {
            return A
        }), n.d(t, "domNS", function() {
            return C
        }), n.d(t, "domPS", function() {
            return S
        }), n.d(t, "domFC", function() {
            return M
        }), n.d(t, "domLC", function() {
            return x
        }), n.d(t, "domPN", function() {
            return D
        }), n.d(t, "domChildren", function() {
            return P
        }), n.d(t, "domInsertBefore", function() {
            return L
        }), n.d(t, "domInsertAfter", function() {
            return N
        }), n.d(t, "domByClass", function() {
            return R
        }), n.d(t, "domData", function() {
            return F
        }), n.d(t, "domChildIndex", function() {
            return H
        }), n.d(t, "domCA", function() {
            return U
        }), n.d(t, "domClosestSibling", function() {
            return B
        }), n.d(t, "matchesSelector", function() {
            return G
        }), n.d(t, "isHover", function() {
            return z
        }), n.d(t, "isAncestor", function() {
            return q
        }), n.d(t, "getScroll", function() {
            return K
        }), n.d(t, "domClosestPositioned", function() {
            return V
        }), n.d(t, "domClosestOverflowHidden", function() {
            return W
        }), n.d(t, "show", function() {
            return Y
        }), n.d(t, "hide", function() {
            return X
        }), n.d(t, "isVisible", function() {
            return $
        }), n.d(t, "clientHeight", function() {
            return Q
        }), n.d(t, "getClientRectOffsetY", function() {
            return Z
        }), n.d(t, "toggle", function() {
            return J
        }), n.d(t, "boundingRectEnabled", function() {
            return ee
        }), n.d(t, "getXYRect", function() {
            return te
        }), n.d(t, "getXY", function() {
            return ne
        }), n.d(t, "isWindow", function() {
            return re
        }), n.d(t, "getSize", function() {
            return ie
        }), n.d(t, "getW", function() {
            return ae
        }), n.d(t, "getH", function() {
            return oe
        }), n.d(t, "hasClass", function() {
            return ue
        }), n.d(t, "addClass", function() {
            return ce
        }), n.d(t, "addClassDelayed", function() {
            return se
        }), n.d(t, "removeClass", function() {
            return de
        }), n.d(t, "removeClassDelayed", function() {
            return le
        }), n.d(t, "toggleClass", function() {
            return fe
        }), n.d(t, "toggleClassDelayed", function() {
            return me
        }), n.d(t, "replaceClass", function() {
            return ge
        }), n.d(t, "getStyle", function() {
            return pe
        }), n.d(t, "setStyle", function() {
            return he
        }), n.d(t, "setStyleDelayed", function() {
            return _e
        }), n.d(t, "setPseudoStyle", function() {
            return be
        }), n.d(t, "data", function() {
            return ve
        }), n.d(t, "attr", function() {
            return ye
        }), n.d(t, "removeAttr", function() {
            return we
        }), n.d(t, "removeData", function() {
            return Oe
        }), n.d(t, "cleanElems", function() {
            return je
        }), n.d(t, "setTitle", function() {
            return ke
        }), n.d(t, "getZoom", function() {
            return Ee
        }), n.d(t, "val", function() {
            return Te
        }), n.d(t, "elfocus", function() {
            return Ie
        }), n.d(t, "traverseParent", function() {
            return Ae
        }), n.d(t, "setDocumentTitle", function() {
            return Se
        }), n.d(t, "lockDocumentTitle", function() {
            return Me
        });
        var r = n(54),
            i = n(83),
            a = function(e) {
                return "string" == typeof e || "number" == typeof e ? document.getElementById(e) : e
            };

        function o(e, t) {
            return (t = a(t) || document).getElementsByTagName(e)
        }

        function u(e, t) {
            return (t = a(t) || document).querySelector && t.querySelector(e) || o(e, t)[0]
        }

        function c(e, t, n) {
            return t = a(t) || document, n = n || "*", e = ("." + e).replace(/\s+/gm, "."), Array.prototype.slice.call(t.querySelectorAll(n + e))
        }

        function s(e, t, n) {
            return t = a(t) || document, n = n || "*", t.querySelector && t.querySelector(n + ("." + e).replace(/\s+/gm, ".")) || c(e, t, n)[0]
        }

        function d(e, t, n) {
            if (!(t = a(t))) return null;
            for (; n !== t && (t = t.parentNode);)
                if (ue(t, e)) return t;
            return null
        }

        function l(e, t) {
            return (t || document).querySelectorAll(e)
        }

        function f(e, t) {
            return (t || document).querySelector(e)
        }

        function m(e, t) {
            return ue(t, e) ? t : d(e, t)
        }

        function g(e, t) {
            return e = e.toUpperCase(), t.nodeType === Node.ELEMENT_NODE && t.tagName.toUpperCase() === e ? t : p(e, t)
        }

        function p(e, t) {
            if (!(t = a(t))) return null;
            for (e = e.toUpperCase(); t = t.parentNode;)
                if (t.tagName && t.tagName.toUpperCase() === e) return t;
            return null
        }

        function h(e, t, n) {
            var i = document.createElement(e);
            return t && Object(r.extend)(i, t), n && he(i, n), i
        }
        var _, b, v, y, w = (_ = document, b = _.createDocumentFragment(), v = _.createElement("div"), y = _.createRange && _.createRange(), b.appendChild(v), y && y.selectNodeContents(v), y && y.createContextualFragment ? function(e) {
            return e ? y.createContextualFragment(e) : _.createDocumentFragment()
        } : function(e) {
            if (!e) return _.createDocumentFragment();
            v.innerHTML = e;
            for (var t = _.createDocumentFragment(); v.firstChild;) t.appendChild(v.firstChild);
            return t
        });

        function O(e) {
            return (e = a(e)) && e.parentNode && e.parentNode.removeChild(e), e
        }
        var j = function(e) {
                return M(h("div", {
                    innerHTML: e
                }))
            },
            k = function(e) {
                return P(h("div", {
                    innerHTML: e
                }))
            };

        function E(e, t) {
            return Object(r.each)(t, function(t, n) {
                e = e.replace(new RegExp("%" + t + "%", "g"), (void 0 === n ? "" : n).toString().replace(/\$/g, "&#036;"))
            }), e
        }

        function T(e) {
            return "https:" !== locProtocol ? e : e = (e = (e = (e = (e = e.replace(/http:\/\/(cs(\d+)\.vk\.me\/c(\d+)\/)/gi, "https://$1")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/c(\d+)\/(v\d+\/|[a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$3/$4")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\/([a-z0-9\/_:\-]+\.jpg)/gi, "https://pp.vk.me/c$1/$3")).replace(/http:\/\/cs(\d+)\.(userapi\.com|vk\.com|vk\.me|vkontakte\.ru)\//gi, "https://ps.vk.me/c$1/")).replace(/http:\/\/video(\d+)\.vkadre\.ru\//gi, "https://ps.vk.me/v$1/")
        }

        function I(e, t) {
            return Object(r.isString)(t) && (t = j(t)), D(e).replaceChild(t, e), t
        }

        function A(e, t) {
            for (t = t ? "previousSibling" : "nextSibling"; e && !e.tagName;) e = e[t];
            return e
        }
        var C = function(e) {
                return A((e || {}).nextSibling)
            },
            S = function(e) {
                return A((e || {}).previousSibling, 1)
            },
            M = function(e) {
                return A((e || {}).firstChild)
            },
            x = function(e) {
                return A((e || {}).lastChild, 1)
            },
            D = function(e) {
                return (e || {}).parentNode
            };

        function P(e) {
            for (var t = [], n = e.childNodes, r = 0; r < n.length; r++) n[r].tagName && t.push(n[r]);
            return t
        }

        function L(e, t) {
            var n = D(t);
            return n && n.insertBefore(e, t)
        }

        function N(e, t) {
            var n = D(t);
            return n && n.insertBefore(e, C(t))
        }

        function R(e, t) {
            return e ? s(t, e) : e
        }

        function F(e, t, n) {
            return e ? void 0 !== n ? (null === n ? e.removeAttribute("data-" + t) : e.setAttribute("data-" + t, n), n) : e.getAttribute("data-" + t) : null
        }

        function H(e) {
            for (var t = 0; null != (e = S(e));) t++;
            return t
        }

        function U(e, t) {
            do {
                e = D(e)
            } while (e && !G(e, t));
            return e
        }

        function B(e, t, n) {
            for (var r = null; null === r && e;)(e = -1 === n ? S(e) : C(e)) && G(e, t) && (r = e);
            return r
        }

        function G(e, t) {
            return !(!(e = a(e)) || e === document) && (e.matches || e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector || function(e) {
                for (var t = (this.document || this.ownerDocument).querySelectorAll(e), n = t.length; --n >= 0 && t.item(n) !== this;);
                return n > -1
            }).call(e, t)
        }

        function z(e) {
            return G(e, ":hover")
        }

        function q(e, t) {
            var n = a(e);
            if (t = a(t), !e || !t) return !1;
            for (; n = n.parentNode;)
                if (n === t) return !0;
            return !1
        }

        function K() {
            var e = browser.msie6 ? a("PageContainer") : document.body,
                t = document.documentElement;
            return [e.scrollLeft || t.scrollLeft || window.pageXOffset || 0, e.scrollTop || t.scrollTop || window.pageYOffset || 0, t.clientWidth || e.clientWidth || 0, t.clientHeight || e.clientHeight || 0]
        }

        function V(e, t) {
            for (var n = (t = t || {}).fromEl || D(e), i = t.positions || ["relative", "absolute", "fixed"]; n && n !== bodyNode;) {
                var a = pe(n, "position");
                if (Object(r.inArray)(a, i) && (!t.noOverflow || "hidden" !== pe(n, "overflow"))) break;
                n = D(n)
            }
            return n
        }

        function W(e, t) {
            for (var n = e = a(e), r = void 0, i = void 0, o = void 0, u = !1; n && n.tagName && n !== bodyNode;) {
                if (r = pe(n, "position"), i = pe(n, "overflow"), o = pe(n, "transform"), t && browser.mozilla) {
                    if ("page_wrap" != n.id && n !== e && "visible" !== i && ("static" === r ? !u || "relative" === u : "fixed" !== u)) break
                } else if (n !== e && "visible" !== i && ("static" === r ? !u || "relative" === u : "fixed" !== u)) break;
                "none" !== o ? u = void 0 : "static" !== r && "fixed" !== u && (u = r), n = D(n)
            }
            return n
        }

        function Y(e) {
            var t = arguments.length;
            if (t > 1)
                for (var n = 0; n < t; n++) Y(arguments[n]);
            else if ((e = a(e)) && e.style) {
                var r = e.olddisplay,
                    i = e.tagName.toLowerCase(),
                    o = "block";
                e.style.display = r || "", "none" === pe(e, "display") && (o = ue(e, "inline") || ue(e, "_inline") ? "inline" : ue(e, "_inline_block") ? "inline-block" : "tr" !== i || browser.msie ? "table" !== i || browser.msie ? "block" : "table" : "table-row", e.style.display = e.olddisplay = o)
            }
        }

        function X(e) {
            var t = arguments.length;
            if (t > 1)
                for (var n = 0; n < t; n++) X(arguments[n]);
            else if ((e = a(e)) && e.style) {
                var r = pe(e, "display");
                e.olddisplay = "none" !== r ? r : "", e.style.display = "none"
            }
        }

        function $(e) {
            return !(!(e = a(e)) || !e.style) && "none" !== pe(e, "display")
        }

        function Q() {
            return window.innerHeight || document.documentElement.clientHeight || bodyNode.clientHeight
        }

        function Z(e, t, n) {
            e = a(e), n = n || 0;
            var i = ne(e)[1],
                o = ie(e)[1],
                u = window,
                c = document.documentElement,
                s = Math.max(Object(r.intval)(u.innerHeight), Object(r.intval)(c.clientHeight)),
                d = a("page_header_cont"),
                l = c.scrollTop || bodyNode.scrollTop || window.scrollY || 0,
                f = vk.staticheader ? Math.max(0, ie(d)[1] - l) : ie(d)[1];
            if (t) {
                if (i + o < l + f + n) return i + o - l - f - n;
                if (i > l + s - n) return i - l - s + n
            } else {
                if (i < l + f + n) return i - l - f - n;
                if (i + o > l + s - n) return i + o - l - s + n
            }
            return 0
        }

        function J(e, t) {
            return void 0 === t && (t = !$(e)), t ? Y(e) : X(e), t
        }

        function ee(e) {
            return void 0 !== e.getBoundingClientRect
        }

        function te(e, t) {
            var n = void 0;
            if (t && "inline" === pe(e, "display")) {
                var r = e.getClientRects();
                n = r && r[0] || e.getBoundingClientRect()
            } else n = e.getBoundingClientRect();
            return n
        }

        function ne(e, t) {
            if (!(e = a(e))) return [0, 0];
            var n = e.ownerDocument,
                r = {
                    top: 0,
                    left: 0
                };
            if (!n) return [0, 0];
            var i = n.documentElement;
            ee(e) && (r = te(e, !0));
            var o = n === n.window ? n : 9 === n.nodeType && (n.defaultView || n.parentWindow);
            return [r.left + (t ? 0 : o.pageXOffset || i.scrollLeft) - (i.clientLeft || 0), r.top + (t ? 0 : o.pageYOffset || i.scrollTop) - (i.clientTop || 0)]
        }

        function re(e) {
            return null != e && e === e.window
        }

        function ie(e, t, n) {
            e = a(e);
            var i = document.documentElement,
                o = [0, 0],
                u = void 0;
            if (t && "border-box" === pe(e, "boxSizing") && (t = !1), e === document) o = [Math.max(i.clientWidth, bodyNode.scrollWidth, i.scrollWidth, bodyNode.offsetWidth, i.offsetWidth), Math.max(i.clientHeight, bodyNode.scrollHeight, i.scrollHeight, bodyNode.offsetHeight, i.offsetHeight)];
            else if (e) {
                var c = function() {
                    o = ee(e) && (u = te(e, n)) && void 0 !== u.width ? [u.width, u.height] : [e.offsetWidth, e.offsetHeight], t && Object(r.each)(o, function(t, n) {
                        var i = t ? ["Top", "Bottom"] : ["Left", "Right"];
                        Object(r.each)(i, function() {
                            o[t] -= parseFloat(pe(e, "padding" + this)) || 0, o[t] -= parseFloat(pe(e, "border" + this + "Width")) || 0
                        })
                    })
                };
                if ($(e)) c();
                else {
                    var s = {
                            position: "absolute",
                            visibility: "hidden",
                            display: "block"
                        },
                        d = {},
                        l = !1;
                    e.style.cssText.indexOf("!important") > -1 && (l = e.style.cssText), Object(r.each)(s, function(t, n) {
                        d[t] = e.style[t], e.style[t] = n
                    }), c(), Object(r.each)(s, function(t, n) {
                        e.style[t] = d[t]
                    }), l && (e.style.cssText = l)
                }
            }
            return o
        }

        function ae(e) {
            return ie(e)[0]
        }

        function oe(e) {
            return ie(e)[1]
        }

        function ue(e, t) {
            var n = a(e);
            return n && 1 === n.nodeType && (" " + n.className + " ").replace(window.whitespaceRegex, " ").indexOf(" " + t + " ") >= 0
        }

        function ce(e, t) {
            var n = a(e);
            n && !ue(n, t) && (n.className = (n.className ? n.className + " " : "") + t)
        }
        window.whitespaceRegex = /[\t\r\n\f]/g;
        var se = function(e, t) {
            return setTimeout(ce.pbind(e, t), 0)
        };

        function de(e, t) {
            var n = a(e);
            n && (n.className = Object(r.trim)((n.className || "").replace(new RegExp("(\\s|^)" + t + "(\\s|$)"), " ")))
        }
        var le = function(e, t) {
            return setTimeout(de.pbind(e, t), 0)
        };

        function fe(e, t, n) {
            return void 0 === n && (n = !ue(e, t)), (n ? ce : de)(e, t), n
        }

        function me(e, t, n) {
            return void 0 === n && (n = !ue(e, t)), (n ? se : le)(e, t), n
        }

        function ge(e, t, n) {
            de(e, t), ce(e, n)
        }

        function pe(e, t, n) {
            if (e = a(e), Object(r.isArray)(t)) {
                var i = {};
                return Object(r.each)(t, function(t, n) {
                    return i[n] = pe(e, n)
                }), i
            }
            if (!e) return "";
            if (void 0 === n && (n = !0), !n && "opacity" === t && browser.msie) {
                var o = e.style.filter;
                return o ? o.indexOf("opacity=") >= 0 ? parseFloat(o.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1" : ""
            }
            if (!n && e.style && (e.style[t] || "height" === t)) return e.style[t];
            var u = void 0,
                c = document.defaultView || window;
            if (c.getComputedStyle) {
                t = t.replace(/([A-Z])/g, "-$1").toLowerCase();
                var s = c.getComputedStyle(e, null);
                s && (u = s.getPropertyValue(t))
            } else if (e.currentStyle) {
                if ("opacity" === t && browser.msie) {
                    var d = e.currentStyle.filter;
                    return d && d.indexOf("opacity=") >= 0 ? parseFloat(d.match(/opacity=([^)]*)/)[1]) / 100 + "" : "1"
                }
                var l = t.replace(/\-(\w)/g, function(e, t) {
                    return t.toUpperCase()
                });
                "auto" === (u = e.currentStyle[t] || e.currentStyle[l]) && (u = 0), u = (u + "").split(" "), Object(r.each)(u, function(t, n) {
                    if (!/^\d+(px)?$/i.test(n) && /^\d/.test(n)) {
                        var r = e.style,
                            i = r.left,
                            a = e.runtimeStyle.left;
                        e.runtimeStyle.left = e.currentStyle.left, r.left = n || 0, u[t] = r.pixelLeft + "px", r.left = i, e.runtimeStyle.left = a
                    }
                }), u = u.join(" ")
            }
            if (n && ("width" === t || "height" === t)) {
                var f = ie(e, !0)[{
                    width: 0,
                    height: 1
                }[t]];
                u = (Object(r.intval)(u) ? Math.max(Object(r.floatval)(u), f) : f) + "px"
            }
            return u
        }

        function he(e, t, n) {
            if (e = a(e))
                if (Object(r.isObject)(t)) Object(r.each)(t, function(t, n) {
                    return he(e, t, n)
                });
                else if ("opacity" === t) browser.msie && ((n + "").length ? e.style.filter = 1 !== n ? "alpha(opacity=" + 100 * n + ")" : "" : e.style.cssText = e.style.cssText.replace(/filter\s*:[^;]*/gi, ""), e.style.zoom = 1), e.style.opacity !== n && (e.style.opacity = n);
            else try {
                var i = "number" == typeof n;
                i && /height|width/i.test(t) && (n = Math.abs(n)), n = i && !/z-?index|font-?weight|opacity|zoom|line-?height/i.test(t) ? n + "px" : n, e.style[t] !== n && (e.style[t] = n)
            } catch (e) {
                debugLog("setStyle error: ", [t, n], e)
            }
        }
        window.cssTransformProp = function() {
            var e = document.createElement("div");
            if (null == e.style.transform) {
                var t = ["Webkit", "Moz", "ms"];
                for (var n in t)
                    if (void 0 !== e.style[t[n] + "Transform"]) return t[n] + "Transform"
            }
            return "transform"
        }();
        var _e = function(e, t, n) {
            return setTimeout(he.pbind(e, t, n), 0)
        };

        function be(e, t, n) {
            var i = ve(e, "pseudo-id");
            i || (ve(e, "pseudo-id", i = Object(r.irand)(1e8, 999999999)), ce(e, "_pseudo_" + i));
            var o = t + "-style-" + i,
                u = a(o),
                c = "._pseudo_" + i + ":" + t + "{";
            u || (u = headNode.appendChild(h("style", {
                id: o,
                type: "text/css"
            }))), Object(r.each)(n, function(e, t) {
                c += e + ": " + t + " !important;"
            }), c += "}", u.sheet ? (u.sheet.cssRules.length && u.sheet.deleteRule(0), u.sheet.insertRule(c, 0)) : u.styleSheet && (u.styleSheet.cssText = c)
        }

        function ve(e, t, n) {
            if (!e) return !1;
            var r = e[vkExpand];
            return r || (r = e[vkExpand] = ++vkUUID), void 0 !== n && (vkCache[r] || (vkCache[r] = {}, window.__debugMode && (vkCache[r].__elem = e)), vkCache[r][t] = n), t ? vkCache[r] && vkCache[r][t] : r
        }

        function ye(e, t, n) {
            return e = a(e), void 0 === n ? e.getAttribute(t) : (e.setAttribute(t, n), n)
        }

        function we(e) {
            for (var t = 0, n = arguments.length; t < n; ++t) {
                var r = arguments[t];
                if (void 0 !== e[r]) try {
                    delete e[r]
                } catch (t) {
                    try {
                        e.removeAttribute(r)
                    } catch (e) {}
                }
            }
        }

        function Oe(e, t) {
            var n = !!e && e[vkExpand];
            if (n)
                if (t) {
                    if (vkCache[n]) {
                        delete vkCache[n][t], t = "";
                        var r = 0;
                        for (var a in vkCache[n])
                            if ("__elem" !== a) {
                                r++;
                                break
                            }
                        r || Oe(e)
                    }
                } else Object(i.removeEvent)(e), we(e, vkExpand), delete vkCache[n]
        }

        function je() {
            for (var e = arguments, t = 0; t < e.length; ++t) {
                var n = a(e[t]);
                n && (Oe(n), we(n, "btnevents"))
            }
        }

        function ke(e, t, n) {
            if ((e = a(e)) && !e.titleSet) {
                if (t || (t = e), t.scrollWidth > t.clientWidth) e.setAttribute("title", n || e.innerText || e.textContent);
                else {
                    var r = u("b", e);
                    r && r.scrollWidth > r.clientWidth ? e.setAttribute("title", n || e.innerText || e.textContent) : e.removeAttribute("title")
                }
                e.titleSet = 1
            }
        }

        function Ee() {
            var e = a("zoom_test_1") || document.body.appendChild(h("div", {
                id: "zoom_test_1"
            }, {
                left: "10%",
                position: "absolute",
                visibility: "hidden"
            }));
            return (a("zoom_test_2") || document.body.appendChild(h("div", {
                id: "zoom_test_2"
            }, {
                left: e.offsetLeft + "px",
                position: "absolute",
                visibility: "hidden"
            }))).offsetLeft / e.offsetLeft
        }

        function Te(e, t, n) {
            if (e = a(e)) return void 0 !== t && (e.setValue ? (e.setValue(t), !n && e.phonblur && e.phonblur()) : "INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value = t : void 0 !== e.emojiId && window.Emoji ? Emoji.val(e, t) : e.innerHTML = t, !n && Object(i.triggerEvent)(e, "valueChanged")), e.getValue ? e.getValue() : ("INPUT" === e.tagName || "TEXTAREA" === e.tagName ? e.value : e.innerHTML) || ""
        }

        function Ie(e, t, n) {
            e = a(e);
            try {
                e.focus(), void 0 !== t && !1 !== t || (t = e.value.length), void 0 !== n && !1 !== n || (n = t), e.setSelectionRange && e.setSelectionRange(t, n)
            } catch (e) {}
        }

        function Ae(e, t, n) {
            for (e = a(e), n = n || 999; e && !t(e);) {
                if (0 === --n) return !1;
                try {
                    if ((e = D(e)) === document) break
                } catch (t) {
                    e = !1
                }
            }
            return e
        }
        window.vkExpand = window.vkExpand || "VK" + Object(r.vkNow)(), window.vkUUID = window.vkUUID || 0, window.vkCache = window.vkCache || {};
        var Ce = !1;

        function Se(e) {
            if (!Ce) return window.document.title = Object(r.replaceEntities)(e)
        }

        function Me(e) {
            Ce = e, e && window.cur && window.cur.destroy.push(function() {
                Me(!1)
            })
        }
        window.ge = a, window.geByTag = o, window.geByTag1 = u, window.geByClass = c, window.geByClass1 = s, window.gpeByClass = d, window.domQuery = l, window.domQuery1 = f, window.domClosest = m, window.ce = h, window.cf = w, window.re = O, window.se = j, window.sech = k, window.rs = E, window.psr = T, window.domReplaceEl = I, window.domEL = A, window.domNS = C, window.domPS = S, window.domFC = M, window.domLC = x, window.domPN = D, window.domChildren = P, window.domInsertBefore = L, window.domInsertAfter = N, window.domByClass = R, window.domData = F, window.domChildIndex = H, window.domCA = U, window.domClosestSibling = B, window.matchesSelector = G, window.isHover = z, window.isAncestor = q, window.getScroll = K, window.domClosestPositioned = V, window.domClosestOverflowHidden = W, window.show = Y, window.hide = X, window.isVisible = $, window.clientHeight = Q, window.getClientRectOffsetY = Z, window.toggle = J, window.boundingRectEnabled = ee, window.getXYRect = te, window.getXY = ne, window.isWindow = re, window.getSize = ie, window.hasClass = ue, window.addClass = ce, window.addClassDelayed = se, window.removeClass = de, window.removeClassDelayed = le, window.toggleClass = fe, window.toggleClassDelayed = me, window.replaceClass = ge, window.getStyle = pe, window.setStyle = he, window.setStyleDelayed = _e, window.setPseudoStyle = be, window.data = ve, window.attr = ye, window.removeAttr = we, window.removeData = Oe, window.cleanElems = je, window.setTitle = ke, window.getZoom = Ee, window.val = Te, window.elfocus = Ie, window.traverseParent = Ae, window.getH = oe, window.getW = ae, window.domClosestByTag = g, window.setDocumentTitle = Se, window.lockDocumentTitle = Me
    },
    406: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "ImDraft", function() {
            return o
        }), n.d(t, "loadDraftForPeer", function() {
            return c
        });
        var r = n(237),
            i = n(275),
            a = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, u = e[Symbol.iterator](); !(r = (o = u.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && u.return && u.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }();

        function o(e, t) {
            this._db = e, this._key = t, this.dData = {
                txt: "",
                attaches: [],
                urlBinds: [],
                cancelled: []
            }, this.load()
        }

        function u(e) {
            switch (e.type) {
                case "mail":
                case "reply":
                    return e.id < 0 && 1 == e.object.fwd_count;
                default:
                    return !e.object
            }
        }

        function c(e, t) {
            return new o(e, "draft_" + t)
        }
        o.prototype.dump = function() {
            var e;
            this._key && this._db.updateByKey(this._key, {
                txt: (e = this.dData).txt,
                attaches: e.attaches.length ? e.attaches : void 0,
                urlBinds: e.urlBinds.length ? e.urlBinds : void 0,
                cancelled: e.cancelled.length ? e.cancelled : void 0
            })
        }, o.prototype.load = function() {
            if (this._key) {
                var e = this._db.selectByKey(this._key);
                e && (this.dData = function(e) {
                    return {
                        txt: e.txt,
                        attaches: e.attaches || [],
                        urlBinds: e.urlBinds || [],
                        cancelled: e.cancelled || []
                    }
                }(e))
            }
        }, o.prototype.clear = function() {
            this.dData = {
                txt: "",
                attaches: [],
                urlBinds: [],
                cancelled: []
            }, this.dump()
        }, o.prototype.setText = function(e) {
            this.dData.txt = trim(e), this.dump()
        }, o.prototype.addAttach = function(e, t, n) {
            if ("share" === e && this.removeAttachByType(e), "mail" !== e && "reply" !== e || (this.removeAttachByType("mail"), this.removeAttachByType("reply")), !e || !t && "poll" !== e) return !1;
            var r = this.dData.attaches.findIndex(function(n) {
                return n.type === e && n.id === t
            }); - 1 === r ? (this.dData.attaches.push({
                type: e,
                id: t,
                object: n
            }), this.dump()) : "video" !== e && "poll" !== e || (this.dData.attaches[r] = {
                type: e,
                id: t,
                object: n
            }, this.dump())
        }, o.prototype.syncWithSelector = function(e) {
            var t = this,
                n = this.getFwdRaw();
            this.dData.attaches = (n ? [n] : []).concat(e.getMedias().map(function(e) {
                var n = a(e, 2),
                    r = n[0],
                    i = n[1];
                return t.dData.attaches.find(function(e) {
                    return e.type == r && e.id == i
                }) || {
                    type: r,
                    id: i
                }
            })), this.dump()
        }, o.prototype.removeAttachByType = function(e) {
            for (var t = this.dData.attaches.length; t--;) this.dData.attaches[t].type === e && this.dData.attaches.splice(t, 1);
            this.dump()
        }, o.prototype.removeAllAttaches = function() {
            this.dData.attaches = [], this.dData.cancelled = [], this.dump()
        }, o.prototype.addBindUrl = function(e, t, n) {
            this.getBoundAttach(e) || (this.dData.urlBinds.push({
                url: e,
                type: t,
                id: n
            }), this.dump())
        }, o.prototype.getBoundAttach = function(e) {
            var t = this.dData.urlBinds.find(function(t) {
                return t.url === e
            });
            return t && this.dData.attaches.find(function(e) {
                return e.type === t.type && e.id === t.id
            }) || null
        }, o.prototype.getShareUrl = function() {
            var e = this.dData.attaches.find(function(e) {
                return "share" === e.type
            });
            if (e && e.object) return e.object.url
        }, o.prototype.hasOnlyReplies = function() {
            return this.hasAttaches() && !this.dData.attaches.find(function(e) {
                return "reply" !== e.type
            })
        }, o.prototype.getCancelledShares = function() {
            return this.dData.cancelled.length ? this.dData.cancelled : void 0
        }, o.prototype.hasAttaches = function() {
            return this.dData.attaches.length > 0
        }, o.prototype.destroy = function() {
            this.dData = {}, this._key = this._db = null
        }, o.prototype.prepareObjects = function(e, t) {
            var n = this;
            return this.dData.attaches.find(u) ? Object(r.post)(i.CONTROLLER, {
                act: "draft_medias",
                gid: e,
                messageId: t || 0,
                media: t ? void 0 : this.dData.attaches.map(function(e) {
                    return [e.type, e.id]
                }).join("*")
            }).then(function(e) {
                var t = a(e, 1)[0];
                n.dData.attaches = t.map(function(e) {
                    return {
                        type: e[0],
                        id: e[1],
                        object: e[2]
                    }
                })
            }) : Promise.resolve()
        }, o.prototype.getFwdRaw = function() {
            return this.dData.attaches.find(function(e) {
                return "mail" === e.type || "reply" === e.type
            })
        }, o.prototype.getFwdCount = function() {
            var e = this.getFwdRaw();
            return e ? e.id < 0 ? e.object.fwd_count : e.id.split(";").length : 0
        }
    },
    423: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "DELETE", function() {
            return a
        }), n.d(t, "SET_FLAGS", function() {
            return o
        }), n.d(t, "REPLACE_FLAGS", function() {
            return u
        }), n.d(t, "RESET_FLAGS", function() {
            return c
        }), n.d(t, "ADD_MESSAGE", function() {
            return s
        }), n.d(t, "READ_INBOUND", function() {
            return d
        }), n.d(t, "READ_OUTBOUND", function() {
            return l
        }), n.d(t, "GOT_ONLINE", function() {
            return f
        }), n.d(t, "GOT_OFFLINE", function() {
            return m
        }), n.d(t, "CHAT_CHANGED", function() {
            return g
        }), n.d(t, "CONVERSATION_UPDATED", function() {
            return p
        }), n.d(t, "TYPING", function() {
            return h
        }), n.d(t, "VIDEO_CALL", function() {
            return _
        }), n.d(t, "UNREAD_COUNT", function() {
            return b
        }), n.d(t, "NOTIFY_SETTINGS_CHANGED", function() {
            return v
        }), n.d(t, "EMPTY", function() {
            return y
        }), n.d(t, "RESET_DIRECTORIES", function() {
            return w
        }), n.d(t, "REPLACE_DIRECTORIES", function() {
            return O
        }), n.d(t, "SET_DIRECTORIES", function() {
            return j
        }), n.d(t, "RESYNC", function() {
            return k
        }), n.d(t, "REFRESH_LP_KEY", function() {
            return E
        }), n.d(t, "TRANSITION", function() {
            return T
        }), n.d(t, "RESET_PEER", function() {
            return I
        }), n.d(t, "MUTEX", function() {
            return A
        }), n.d(t, "CHANGE_PEER", function() {
            return C
        }), n.d(t, "CHANGE_TAB", function() {
            return S
        }), n.d(t, "FAILED_MESSAGE", function() {
            return M
        }), n.d(t, "RESEND", function() {
            return x
        }), n.d(t, "DELETE_DIALOG", function() {
            return D
        }), n.d(t, "EDIT_MESSAGE", function() {
            return P
        }), n.d(t, "REPLACE_MESSAGE", function() {
            return L
        }), n.d(t, "AUDIO_START", function() {
            return N
        }), n.d(t, "FLAG_UNREAD", function() {
            return R
        }), n.d(t, "FLAG_OUTBOUND", function() {
            return F
        }), n.d(t, "FLAG_IMPORTANT", function() {
            return H
        }), n.d(t, "FLAG_CHAT", function() {
            return U
        }), n.d(t, "FLAG_FRIENDS", function() {
            return B
        }), n.d(t, "FLAG_SPAM", function() {
            return G
        }), n.d(t, "FLAG_DELETED", function() {
            return z
        }), n.d(t, "FLAG_MEDIA", function() {
            return q
        }), n.d(t, "FLAG_STEALTH", function() {
            return K
        }), n.d(t, "FOLDER_IMPORTANT", function() {
            return V
        }), n.d(t, "FOLDER_UNRESPOND", function() {
            return W
        }), n.d(t, "FOLDER_HAS_BANNER", function() {
            return Y
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_TITLE_CHANGED", function() {
            return X
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_AVATAR_CHANGED", function() {
            return $
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_ADMIN_GRANTED", function() {
            return Q
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_FLAGS_CHANGED", function() {
            return Z
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_PINNED", function() {
            return J
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_USER_JOINED", function() {
            return ee
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_USER_LEFT", function() {
            return te
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_USER_KICKED", function() {
            return ne
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_ADMIN_KICKED", function() {
            return re
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_BANNER_CHANGED", function() {
            return ie
        }), n.d(t, "MAIL_CHAT_UPDATE_TYPE_KEYBOARD_CHANGED", function() {
            return ae
        }), n.d(t, "deleteEvent", function() {
            return oe
        }), n.d(t, "replaceFlagsEvent", function() {
            return ue
        }), n.d(t, "setFlagsEvent", function() {
            return ce
        }), n.d(t, "resetFlagsEvent", function() {
            return se
        }), n.d(t, "addMessageEvent", function() {
            return de
        }), n.d(t, "editMessageEvent", function() {
            return le
        }), n.d(t, "replaceMessageEvent", function() {
            return fe
        }), n.d(t, "editMessageLocallyEvent", function() {
            return me
        }), n.d(t, "readInboundEvent", function() {
            return ge
        }), n.d(t, "readOutboundEvent", function() {
            return pe
        }), n.d(t, "gotOnlineEvent", function() {
            return he
        }), n.d(t, "gotOfflineEvent", function() {
            return _e
        }), n.d(t, "resetDirectoriesEvent", function() {
            return be
        }), n.d(t, "replaceDirectoriesEvent", function() {
            return ve
        }), n.d(t, "setDirectoriesEvent", function() {
            return ye
        }), n.d(t, "deleteDialogEvent", function() {
            return we
        }), n.d(t, "chatChangedEvent", function() {
            return Oe
        }), n.d(t, "chatUpdatedEvent", function() {
            return je
        }), n.d(t, "typingEvent", function() {
            return ke
        }), n.d(t, "videoCallEvent", function() {
            return Ee
        }), n.d(t, "unreadCountEvent", function() {
            return Te
        }), n.d(t, "notifySettingsChangedEvent", function() {
            return Ie
        }), n.d(t, "refreshMessageEvent", function() {
            return Ae
        }), n.d(t, "audioStartEvent", function() {
            return Ce
        }), n.d(t, "emptyEvent", function() {
            return Se
        }), n.d(t, "transitionEvent", function() {
            return Me
        }), n.d(t, "resyncEvent", function() {
            return xe
        }), n.d(t, "refreshLpKeyEvent", function() {
            return De
        }), n.d(t, "resetPeer", function() {
            return Pe
        }), n.d(t, "changePeer", function() {
            return Le
        }), n.d(t, "changeTab", function() {
            return Ne
        }), n.d(t, "failedMessage", function() {
            return Re
        }), n.d(t, "mutexEvent", function() {
            return Fe
        }), n.d(t, "resendEvent", function() {
            return He
        });
        var r = n(336),
            i = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, u = e[Symbol.iterator](); !(r = (o = u.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && u.return && u.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            a = "event_delete",
            o = "event_set_flags",
            u = "event_replace_flags",
            c = "event_reset_flags",
            s = "event_add_message",
            d = "event_read_inbound",
            l = "event_read_outbound",
            f = "event_got_online",
            m = "event_got_offline",
            g = "event_chat_changed",
            p = "event_chat_updated",
            h = "event_typing",
            _ = "event_video_call",
            b = "event_unread_count",
            v = "event_notify_settings_changed",
            y = "event_empty",
            w = "event_reset_directories",
            O = "event_replace_directories",
            j = "event_set_directories",
            k = "event_resync",
            E = "event_refresh_lp_key",
            T = "transition_event",
            I = "reset_peer",
            A = "mutex",
            C = "change_peer",
            S = "event_change_tab",
            M = "event_failed_message",
            x = "event_resend",
            D = "event_delete_dialog",
            P = "event_edit_message",
            L = "event_replace_message",
            N = "event_audio_start",
            R = 1,
            F = 2,
            H = 8,
            U = 16,
            B = 32,
            G = 64,
            z = 128,
            q = 512,
            K = 65536,
            V = 1,
            W = 2,
            Y = 8,
            X = 1,
            $ = 2,
            Q = 3,
            Z = 4,
            J = 5,
            ee = 6,
            te = 7,
            ne = 8,
            re = 9,
            ie = 10,
            ae = 11;

        function oe(e) {
            var t = i(e, 2)[1];
            return {
                type: a,
                localId: t
            }
        }

        function ue(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: u,
                messageId: n,
                mask: r,
                peerId: a
            }
        }

        function ce(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: o,
                messageId: n,
                flags: r,
                peerId: a
            }
        }

        function se(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: c,
                messageId: n,
                flags: r,
                peerId: a
            }
        }

        function de(e) {
            var t = i(e, 11),
                n = t[1],
                a = t[2],
                o = t[3],
                u = t[4],
                c = t[5],
                d = t[6],
                l = t[7],
                f = t[8],
                m = t[9],
                g = t[10],
                p = extend(d, l || void 0);
            return {
                type: s,
                messageId: intval(n),
                flags: intval(a),
                peerId: intval(o),
                date: intval(u),
                attaches: Object(r.convertKludgesToAttaches)(p, n),
                subject: d.title || "",
                text: c,
                kludges: p,
                randomId: intval(f),
                userId: Object(r.isChatPeer)(o) ? intval(p.from) : intval(o),
                update_time: g,
                chat_local_id: m
            }
        }

        function le(e) {
            var t = de(e);
            return t.type = P, t
        }

        function fe(e) {
            var t = de(e);
            return t.type = L, t
        }

        function me(e) {
            return extend({}, e, {
                type: P
            })
        }

        function ge(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: d,
                peerId: n,
                upToId: r,
                unread: a
            }
        }

        function pe(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: l,
                peerId: n,
                upToId: r,
                unread: a
            }
        }

        function he(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: f,
                userId: -n,
                platform: r,
                lastSeenTs: a
            }
        }

        function _e(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: m,
                userId: -n,
                reason: r,
                lastSeenTs: a
            }
        }

        function be(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: w,
                peerId: n,
                mask: r,
                local: void 0 !== a && a
            }
        }

        function ve(e) {
            var t = i(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: O,
                peerId: n,
                mask: r
            }
        }

        function ye(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: j,
                peerId: n,
                mask: r,
                local: void 0 !== a && a
            }
        }

        function we(e) {
            var t = i(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: D,
                peerId: n,
                localId: r
            }
        }

        function Oe(e) {
            var t = i(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: g,
                chatId: n,
                self: r
            }
        }

        function je(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: p,
                peerId: r,
                updateType: n,
                updateArg: a
            }
        }

        function ke(e) {
            var t = i(e, 5),
                n = t[1],
                r = t[2],
                a = t[3],
                o = t[4];
            return {
                type: h,
                peerId: n,
                userIds: r,
                totalCount: a,
                ts: o
            }
        }

        function Ee(e) {
            var t = i(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: _,
                userId: n,
                callId: r
            }
        }

        function Te(e) {
            var t = i(e, 4),
                n = t[1],
                r = t[2],
                a = t[3];
            return {
                type: b,
                count: n,
                countNotMuted: r,
                showOnlyNotMuted: a
            }
        }

        function Ie(e) {
            var t = i(e, 2)[1],
                n = void 0 === t ? {} : t;
            return {
                type: v,
                peerId: n.peer_id,
                sound: n.sound,
                disabledUntil: n.disabled_until
            }
        }

        function Ae(e) {
            var t = i(e, 2)[1],
                n = void 0 === t ? {} : t,
                r = de([!1, n.id, n.flags, n.peer_id, n.date, n.message, extend(n.kludges, {
                    title: n.title || ""
                }), {}, n.random_id, n.chat_local_id, n.update_time]);
            return r.type = P, r
        }

        function Ce(e) {
            var t = i(e, 2)[1],
                n = void 0 === t ? {} : t;
            return {
                type: N,
                uuid: n.uuid,
                deviceName: n.device_name || ""
            }
        }

        function Se(e) {
            return {
                type: y,
                params: e
            }
        }

        function Me(e) {
            return {
                type: T,
                state: e
            }
        }

        function xe() {
            return {
                type: k
            }
        }

        function De(e) {
            var t = i(e, 3),
                n = t[1],
                r = t[2];
            return {
                type: E,
                key: n,
                url: r
            }
        }

        function Pe() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            return {
                type: I,
                cancelSearch: e,
                removeActivePeer: t
            }
        }

        function Le(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "";
            return {
                type: C,
                peerId: e,
                msgid: t,
                forward: n,
                cancelSearch: r,
                entryPoint: i
            }
        }

        function Ne(e) {
            return {
                type: S,
                tab: e
            }
        }

        function Re(e, t, n) {
            return {
                type: M,
                message: t,
                peer: e,
                error: n
            }
        }

        function Fe(e) {
            var t = i(e, 6),
                n = (t[0], t[1]),
                r = t[2],
                a = t[3],
                o = t[4],
                u = t[5];
            return {
                type: A,
                free: !!intval(n) || intval(o) === vk.id,
                resource: r,
                peerId: intval(a),
                who: intval(o),
                name: u
            }
        }

        function He(e, t) {
            return {
                type: x,
                message: t,
                peerId: e
            }
        }
    },
    452: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "isPinnedMessageVisibleInTab", function() {
            return g
        }), n.d(t, "pinnedMessageHide", function() {
            return p
        }), n.d(t, "pinnedMessageUnHide", function() {
            return h
        }), n.d(t, "pinnedMessageUnpin", function() {
            return _
        }), n.d(t, "mount", function() {
            return y
        });
        var r = n(31),
            i = n(275),
            a = n(423),
            o = n(150),
            u = n(30),
            c = n(104),
            s = n(29),
            d = n(479),
            l = n(482),
            f = "_im_pin_hide",
            m = "_im_pinned_message";

        function g(e, t) {
            if (Object(s.unpackStore)(e).searchShown) return !1;
            var n = Object(c.getTab)(e, t),
                r = n && Object(c.parserMessage)(n.pinned);
            return !!r && n.pinHideId != r.chat_local_id
        }

        function p(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                i = Object(c.getTab)(e, t),
                a = i && Object(c.parserMessage)(i.pinned);
            i && a && (i.pinHideId = a.chat_local_id, cur.imDb.update(l.PIN_HIDDEN_ID_OP, [i.peerId, i.pinHideId]), b(n, t, e), re(geByClass1("_im_pinned_tt")), r && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 1,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "hide"))
        }

        function h(e, t, n) {
            var r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
                i = Object(c.getTab)(e, t);
            i && i.pinHideId && (delete i.pinHideId, cur.imDb.update(l.PIN_HIDDEN_ID_OP, [i.peerId, void 0]), b(n, t, e), r && window.Notifier && Notifier.lcSend("pin_hide", {
                hide: 0,
                peer: t
            }), statlogsValueEvent("im_pinned_messages", "show"))
        }

        function _(e, t, n) {
            var r = b.bind(null, n, t),
                a = Object(u.showUnpinDialog)(function() {
                    a.hideProgress(), a.hide(), e.set(i.unpinMessageOptimistic.bind(null, t)).then(r).then(function(e) {
                        return e.set(i.unpinMessage.bind(null, t))
                    }).then(r)
                })
        }

        function b(e, t, n) {
            return e().updateChatTopic(t, n), Object(i.setActions)(n.get()), e().updateActions(n), n
        }

        function v(e) {
            return {
                unmount: function() {
                    Object(r.destroyModule)(e)
                }
            }
        }

        function y(e, t, n) {
            var i = Object(r.createMutations)(v).bindMutations,
                s = function(e, t, n) {
                    var r = e.get().peer,
                        i = Object(c.parserMessage)(Object(c.getTab)(e, r).pinned);
                    if (n.target.classList.contains(f)) i && p(e, r, t);
                    else if ("A" !== n.target.tagName) {
                        var s = i && i.messageId;
                        if (s && !Object(u.isAlreadyDeleted)(e, r, s)) {
                            var l = e.get();
                            Object(c.getMessage)(e, r, s) ? (e.setState({
                                msgid: s
                            }), Object(d.updateLocation)({
                                msgid: s
                            }), t().focusOnMessage()) : l.longpoll.push([Object(a.changePeer)(r, s)])
                        } else Object(u.showPinnedBox)(e, t, r, o.mount, n);
                        statlogsValueEvent("im_pinned_messages", "open")
                    }
                }.bind(null, t, n),
                l = function(e) {
                    showTooltip(e.target, {
                        text: getLang("mail_hide_unpin_hover"),
                        black: 1,
                        needLeft: 1,
                        shift: [8, 4],
                        forcetoup: !0,
                        className: "_im_pinned_tt",
                        appendEl: bodyNode
                    })
                }.bind(null);
            return i(Object(r.createModule)({
                handlers: function(t, n) {
                    n(e, "click", m, s), n(e, "mouseover", f, l)
                }
            }))
        }
    },
    470: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_INVITE", function() {
            return c
        }), n.d(t, "MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_PIN", function() {
            return s
        }), n.d(t, "MAIL_CHAT_FLAG_ONLY_ADMINS_CAN_CHANGE_TITLE", function() {
            return d
        }), n.d(t, "MAIL_CHAT_FLAG_ADMINS_CAN_ADD_ADMINS", function() {
            return l
        }), n.d(t, "MAIL_CHAT_FLAG_ADMINS_CAN_INVITE_LINK", function() {
            return f
        }), n.d(t, "MAIL_CHATS_ACTION_SEE_INVITE_LINK", function() {
            return m
        }), n.d(t, "MAIL_CHATS_ACTION_CHANGE_INVITE_LINK", function() {
            return g
        }), n.d(t, "MAIL_CHATS_ACTION_INVITE_USER", function() {
            return p
        }), n.d(t, "MAIL_CHATS_ACTION_PIN_OR_UNPIN", function() {
            return h
        }), n.d(t, "MAIL_CHATS_ACTION_CHANGE_TITLE", function() {
            return _
        }), n.d(t, "MAIL_CHATS_ACTION_ADD_ADMIN", function() {
            return b
        }), n.d(t, "canSeeInviteLink", function() {
            return w
        }), n.d(t, "canChangeInviteLink", function() {
            return O
        }), n.d(t, "canAddAdmin", function() {
            return j
        }), n.d(t, "canInviteUser", function() {
            return k
        }), n.d(t, "canKickUser", function() {
            return E
        }), n.d(t, "canPinOrUnpin", function() {
            return T
        }), n.d(t, "canChangeTitle", function() {
            return I
        }), n.d(t, "canChangeAvatar", function() {
            return A
        }), n.d(t, "canSeeAllMessages", function() {
            return C
        }), n.d(t, "checkChatRights", function() {
            return S
        }), n.d(t, "doesChatTabHaveFlag", function() {
            return M
        }), n.d(t, "isUserAdminInChat", function() {
            return x
        }), n.d(t, "isUserOwnerInChat", function() {
            return D
        }), n.d(t, "isUserInvitedByMe", function() {
            return P
        });
        var r, i = n(104),
            a = n(29),
            o = n(30);

        function u(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }
        var c = 1,
            s = 4,
            d = 8,
            l = 16,
            f = 32,
            m = "see_invite_link",
            g = "change_invite_link",
            p = "invite_user",
            h = "pin_unpin",
            _ = "change_title",
            b = "add_admin",
            v = (u(r = {}, m, f), u(r, g, f), u(r, b, l), u(r, p, c), u(r, h, s), u(r, _, d), r),
            y = 1;

        function w(e, t, n) {
            return S(e, m, t, n)
        }

        function O(e, t, n) {
            return S(e, g, t, n)
        }

        function j(e, t, n, r) {
            var o = Object(a.unpackStore)(e);
            return !D(Object(i.getTab)(o, n || o.peer), t) && S(e, b, n, r)
        }

        function k(e, t, n) {
            return S(e, p, t, n)
        }

        function E(e, t, n, r) {
            var u = Object(a.unpackStore)(e);
            if (function(e, t) {
                    var n = Object(a.unpackStore)(e);
                    return void 0 !== n.service && (n.service & t) > 0
                }(e, y)) return !0;
            var c = Object(i.getTab)(u, n || u.peer);
            return !(c.data.kicked && !c.data.closed) && (!Object(o.isFvkcomgroup)(e, n) && (!D(c, t) && (!!D(c, r = void 0 === r ? window.vk.id : r) || (x(c, r) ? !x(c, t) : P(c, t) && !x(c, t)))))
        }

        function T(e, t, n) {
            return S(e, h, t, n)
        }

        function I(e, t, n) {
            return S(e, _, t, n)
        }

        function A(e, t, n) {
            return I(e, t, n) && !Object(o.isFvkcomgroup)(e, t)
        }

        function C(e, t, n) {
            return !Object(i.isCommunityPeer)(n) || !!Object(i.getTab)(e, t).caccess[n]
        }

        function S(e, t, n, r) {
            var u = Object(a.unpackStore)(e);
            r = void 0 === r ? window.vk.id : r, n = void 0 === n ? u.peer : n;
            var c = Object(i.getTab)(u, n),
                s = !c.data.kicked && !c.data.closed,
                d = v[t];
            if (Object(o.isFvkcomgroup)(e, n)) switch (t) {
                case b:
                case p:
                    return !1;
                case m:
                    return s;
                default:
                    return u.gid > 0
            }
            switch (t) {
                case m:
                case g:
                case b:
                    return M(c, d) ? x(c, r) && s : D(c, r);
                case p:
                case h:
                case _:
                    return M(c, d) ? x(c, r) && s : s
            }
            return !1
        }

        function M(e, t) {
            return ((e && e.data && e.data.flags || 0) & t) > 0
        }

        function x(e, t) {
            return (e && e.adminIds || []).indexOf(+t) > -1
        }

        function D(e, t) {
            return e.ownerId === t
        }

        function P(e, t) {
            return -1 !== e.invitedByMe.indexOf(t)
        }
    },
    479: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "updateLocation", function() {
            return o
        }), n.d(t, "updateLazyLocation", function() {
            return u
        });
        var r = window,
            i = r.nav,
            a = r.extend;

        function o(e) {
            var t = a({}, i.objLoc, e);
            Object.keys(t).filter(function(e) {
                return "" === t[e]
            }).forEach(function(e) {
                delete t[e]
            });
            var n = i.toStr(t);
            i.setLoc(n)
        }

        function u() {
            var e = {};
            return {
                scheduleNav: function(t) {
                    e = a(e, t)
                },
                commitNav: function() {
                    o(e), e = {}
                },
                scheduleNavWithTimeOut: function(t) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
                    e = a(e, t), setTimeout(function() {
                        o(e), e = {}
                    }, n)
                }
            }
        }
    },
    482: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "RECENT_SEARCH_OP", function() {
            return i
        }), n.d(t, "PIN_HIDDEN_ID_OP", function() {
            return a
        }), n.d(t, "deleteOldStoredFormat", function() {
            return s
        }), n.d(t, "mount", function() {
            return d
        });
        var r = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, u = e[Symbol.iterator](); !(r = (o = u.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && u.return && u.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            i = "recent_search",
            a = "pin_hide";

        function o(e) {
            return "im_store_" + e
        }

        function u(e) {
            return ls.get(o(e)) || {}
        }

        function c(e, t, n) {
            if (ls.checkVersion()) {
                var r = JSON.stringify(t);
                rand(0, 1e5) <= 1 && statlogsValueEvent("im_local_store_size", r.length), n(o(e), r)
            }
        }

        function s(e, t) {
            for (var n = ["fwd", "draft", "bind_attach"], r = u(e), i = !1, a = n.length; a--;) n[a] in r && (delete r[n[a]], i = !0);
            i && c(e, r, t)
        }

        function d(e) {
            var t = debounce(function(e, t) {
                localStorage.setItem(e, t)
            }, 300);
            ls.checkVersion() && s(e, t);
            var n = {
                    db: u(e),
                    checkTime: Date.now()
                },
                d = function(e, t, n) {
                    n.key === o(e) && (t.db = JSON.parse(n.newValue), t.checkTime = Date.now())
                }.bind(null, e, n);
            return window.addEventListener("storage", d, !1), {
                select: function(t, r) {
                    return Date.now() - n.checkTime > 1e3 && (n.db = u(e)),
                        function(e, t, n) {
                            return t === i ? e[t] || [] : t === a ? e[t] && e[t][n] : e[t] ? extend(!0, {}, e[t][n]) : null
                        }(n.db, t, r)
                },
                selectByKey: function(t) {
                    return Date.now() - n.checkTime > 1e3 && (n.db = u(e)), n.db[t]
                },
                update: function(o, u) {
                    var s = function(e, t, n) {
                        switch (e[t] || (e[t] = {}), t) {
                            case i:
                                var o = n;
                                o && o.length > 0 ? e[t] = o : delete e[t];
                                break;
                            case a:
                                var u = r(n, 2),
                                    c = u[0],
                                    s = u[1];
                                s ? e[t][c] = +s : delete e[t][c]
                        }
                        return e
                    }(n.db, o, u);
                    return n.db = s, n.checkTime = Date.now(), c(e, s, t)
                },
                updateByKey: function(r, i) {
                    return n.db[r] = i, n.checkTime = Date.now(), c(e, n.db, t)
                },
                unmount: function() {
                    window.removeEventListener("storage", d, !1)
                }
            }
        }
    },
    498: function(e, t, n) {
        e.exports = n(24)
    },
    54: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "vkLocal", function() {
            return u
        }), n.d(t, "lTimeout", function() {
            return c
        }), n.d(t, "rand", function() {
            return s
        }), n.d(t, "irand", function() {
            return d
        }), n.d(t, "isUndefined", function() {
            return l
        }), n.d(t, "isFunction", function() {
            return f
        }), n.d(t, "isArray", function() {
            return m
        }), n.d(t, "isString", function() {
            return g
        }), n.d(t, "isObject", function() {
            return p
        }), n.d(t, "isEmpty", function() {
            return h
        }), n.d(t, "vkNow", function() {
            return _
        }), n.d(t, "vkImage", function() {
            return b
        }), n.d(t, "trim", function() {
            return v
        }), n.d(t, "stripHTML", function() {
            return y
        }), n.d(t, "escapeRE", function() {
            return w
        }), n.d(t, "intval", function() {
            return O
        }), n.d(t, "floatval", function() {
            return j
        }), n.d(t, "positive", function() {
            return k
        }), n.d(t, "isNumeric", function() {
            return E
        }), n.d(t, "winToUtf", function() {
            return T
        }), n.d(t, "replaceEntities", function() {
            return I
        }), n.d(t, "clean", function() {
            return A
        }), n.d(t, "unclean", function() {
            return C
        }), n.d(t, "each", function() {
            return S
        }), n.d(t, "indexOf", function() {
            return M
        }), n.d(t, "inArray", function() {
            return x
        }), n.d(t, "clone", function() {
            return D
        }), n.d(t, "arrayKeyDiff", function() {
            return P
        }), n.d(t, "extend", function() {
            return L
        }), n.d(t, "addTemplates", function() {
            return N
        }), n.d(t, "getTemplate", function() {
            return R
        }), n.d(t, "serializeForm", function() {
            return F
        }), n.d(t, "extractUrls", function() {
            return H
        }), n.d(t, "isRetina", function() {
            return U
        }), n.d(t, "getCaretCharacterOffsetWithin", function() {
            return B
        }), n.d(t, "formatCount", function() {
            return G
        }), n.d(t, "encodeHtml", function() {
            return K
        }), n.d(t, "decodeHtml", function() {
            return V
        });
        var r = n(360),
            i = n(309),
            a = function() {
                return function(e, t) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return function(e, t) {
                        var n = [],
                            r = !0,
                            i = !1,
                            a = void 0;
                        try {
                            for (var o, u = e[Symbol.iterator](); !(r = (o = u.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                        } catch (e) {
                            i = !0, a = e
                        } finally {
                            try {
                                !r && u.return && u.return()
                            } finally {
                                if (i) throw a
                            }
                        }
                        return n
                    }(e, t);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance")
                }
            }(),
            o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };

        function u(e) {
            var t = PageID;
            return function() {
                t === PageID && e.apply(this, arguments)
            }
        }

        function c(e, t) {
            return setTimeout(u(e), t)
        }
        window.PageID = window.PageID || 1;
        var s = function(e, t) {
                return Math.random() * (t - e + 1) + e
            },
            d = function(e, t) {
                return Math.floor(s(e, t))
            },
            l = function(e) {
                return void 0 === e
            },
            f = function(e) {
                return e && "[object Function]" === Object.prototype.toString.call(e)
            },
            m = function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            },
            g = function(e) {
                return "string" == typeof e
            },
            p = function(e) {
                return "[object Object]" === Object.prototype.toString.call(e)
            };

        function h(e) {
            if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
            for (var t in e)
                if (e.hasOwnProperty(t)) return !1;
            return !0
        }
        var _ = function() {
                return +new Date
            },
            b = function() {
                return window.Image ? new Image : ce("img")
            },
            v = function(e) {
                return (e || "").replace(/^\s+|\s+$/g, "")
            },
            y = function(e) {
                return e ? e.replace(/<(?:.|\s)*?>/g, "") : ""
            },
            w = function(e) {
                return e ? e.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1") : ""
            };

        function O(e) {
            return !0 === e ? 1 : parseInt(e) || 0
        }

        function j(e) {
            return !0 === e ? 1 : parseFloat(e) || 0
        }

        function k(e) {
            return (e = O(e)) < 0 ? 0 : e
        }

        function E(e) {
            return !isNaN(e)
        }

        function T(e) {
            return e.replace(/&#(\d\d+);/g, function(e, t) {
                return (t = O(t)) >= 32 ? String.fromCharCode(t) : e
            }).replace(/&quot;/gi, '"').replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&amp;/gi, "&")
        }

        function I() {
            var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
            return Object(r.se)("<textarea>" + e + "</textarea>").value
        }

        function A(e) {
            return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : ""
        }

        function C(e) {
            return I(e.replace(/\t/g, "\n"))
        }

        function S(e, t) {
            if (p(e) || void 0 === e.length) {
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n) && !1 === t.call(e[n], n, e[n])) break
            } else
                for (var r = 0, i = e.length; r < i; r++) {
                    var a = e[r];
                    if (!1 === t.call(a, r, a)) break
                }
            return e
        }

        function M(e, t, n) {
            for (var r = n || 0, i = (e || []).length; r < i; r++)
                if (e[r] == t) return r;
            return -1
        }

        function x(e, t) {
            return -1 !== M(t, e)
        }

        function D(e, t) {
            var n = p(e) || void 0 === e.length ? {} : [];
            for (var r in e)(!/webkit/i.test(_ua) || "layerX" != r && "layerY" != r && "webkitMovementX" != r && "webkitMovementY" != r) && (t && "object" === o(e[r]) && "prototype" !== r && null !== e[r] ? n[r] = D(e[r]) : n[r] = e[r]);
            return n
        }

        function P(e) {
            var t = {},
                n = arguments.length,
                r = arguments;
            for (var i in e)
                if (e.hasOwnProperty(i)) {
                    for (var a = !1, o = 1; o < n; o++) r[o][i] && r[o][i] === e[i] && (a = !0);
                    a || (t[i] = e[i])
                }
            return t
        }

        function L() {
            var e = arguments,
                t = e.length,
                n = e[0] || {},
                r = 1,
                i = !1;
            for ("boolean" == typeof n && (i = n, n = e[1] || {}, r = 2), "object" === (void 0 === n ? "undefined" : o(n)) || f(n) || (n = {}); r < t; r++) {
                var a = e[r];
                if (null != a)
                    for (var u in a)
                        if (a.hasOwnProperty(u)) {
                            var c = n[u],
                                s = a[u];
                            n !== s && (i && s && "object" === (void 0 === s ? "undefined" : o(s)) && !s.nodeType ? n[u] = L(i, c || (null != s.length ? [] : {}), s) : void 0 !== s && (n[u] = s))
                        }
            }
            return n
        }

        function N(e) {
            window.templates = window.templates || {}, L(window.templates, e)
        }

        function R(e, t) {
            var n = (window.templates = window.templates || {})[e];
            return "function" == typeof n && (n = n()), n && t ? Object(r.rs)(n, t) : n || ""
        }

        function F(e) {
            if ("object" !== (void 0 === e ? "undefined" : o(e))) return !1;
            var t = {},
                n = function(t) {
                    return Object(r.geByTag)(t, e)
                },
                i = function(n, i) {
                    if (i.name)
                        if ("text" !== i.type && i.type)
                            if (i.getAttribute("bool")) {
                                var a = Object(r.val)(i);
                                if (!a || "0" === a) return;
                                t[i.name] = 1
                            } else t[i.name] = browser.msie && !i.value && e[i.name] ? e[i.name].value : i.value;
                    else t[i.name] = Object(r.val)(i)
                };
            return S(n("input"), function(e, t) {
                if ("radio" !== t.type && "checkbox" !== t.type || t.checked) return i(0, t)
            }), S(n("select"), i), S(n("textarea"), i), t
        }

        function H(e, t) {
            for (var n = t ? /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)&]*(&nbsp;|[ \t\r\n \u00A0]|$)))/i : /(?:([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9_\-]+\.)+(?:[a-z]{2,9}|xn--p1ai|xn--j1amh|xn--80asehdb|xn--80aswg))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0]))|([!()?., \n\r\t \u00A0]|^)((https?:\/\/)?((?:[a-z0-9а-яєґї_\-]+\.)+(?:рф|укр|онлайн|сайт|срб))(\/.*?)?(\#.*?)?)(?:[\.!:;,\*\(\)]*(&nbsp;|[ \t\r\n \u00A0])))/i, r = void 0, i = []; e && (r = e.match(n));) {
                e = e.substr(r.index + r[0].length);
                var a = 0;
                r[4] || (a = 7), i.push({
                    url: r[2 + a],
                    query: r[5 + a] || "",
                    domain: r[4 + a]
                })
            }
            return i
        }
        var U = function() {
            return window.devicePixelRatio >= 2
        };

        function B(e) {
            var t = 0,
                n = 0,
                r = e.ownerDocument || e.document,
                i = r.defaultView || r.parentWindow;
            if (i.getSelection().rangeCount > 0) {
                var a = i.getSelection().getRangeAt(0),
                    o = a.cloneRange();
                o.selectNodeContents(e), o.setEnd(a.startContainer, a.startOffset), t = o.toString().length, o.setEnd(a.endContainer, a.endOffset), n = o.toString().length
            }
            return [t, n]
        }

        function G(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                n = t.kLimit || 1e3;
            return e >= (t.mLimit || 1e6) && !t.noCheck ? G(e = (e = O(e / 1e5)) > 1e3 ? O(e / 10) : e / 10, L(t, {
                noCheck: !0
            }), !0) + "M" : e >= n && !t.noCheck ? G(e = (e = O(e / 100)) > 100 ? O(e / 10) : e / 10, L(t, {
                noCheck: !0
            }), !0) + "K" : Object(i.langNumeric)(e, "%s", !0).replace(/,/g, ".")
        }
        var z, q = a((z = null, [function(e) {
                return z || (z = Object(r.se)("<span> </span>")), z.innerText = e, z.innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
            }, function(e) {
                return z || (z = Object(r.se)("<span> </span>")), z.innerHTML = e, z.innerText
            }]), 2),
            K = q[0],
            V = q[1];
        window.isRetina = U, window.extractUrls = H, window.serializeForm = F, window.addTemplates = N, window.getTemplate = R, window.rand = s, window.irand = d, window.isUndefined = l, window.isFunction = f, window.isArray = m, window.isString = g, window.isObject = p, window.isEmpty = h, window.vkNow = _, window.vkImage = b, window.trim = v, window.stripHTML = y, window.escapeRE = w, window.intval = O, window.floatval = j, window.positive = k, window.isNumeric = E, window.winToUtf = T, window.replaceEntities = I, window.clean = A, window.unclean = C, window.each = S, window.indexOf = M, window.inArray = x, window.clone = D, window.arrayKeyDiff = P, window.extend = L, window.vkLocal = u, window.lTimeout = c, window.getCaretCharacterOffsetWithin = B, window.formatCount = G, window.encodeHtml = K, window.decodeHtml = V
    },
    72: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "oCacheExists", function() {
            return i
        }), n.d(t, "oCacheGet", function() {
            return a
        }), n.d(t, "oCacheAdd", function() {
            return o
        });
        var r = n(29);

        function i(e, t) {
            return t in Object(r.unpackStore)(e).oCache
        }

        function a(e, t) {
            var n = Object(r.unpackStore)(e).oCache[t];
            return n && !n._n && (! function(e) {
                if (!e.first_name) {
                    var t = e.name.split(" ", 2);
                    e.first_name = t[0], e.short_name = t[1] ? t[0] + " " + t[1].substr(0, 1) + "." : t[0]
                }
                e.inv_name || (e.inv_name = e.name), e.kick_name || (e.kick_name = e.inv_name)
            }(n), n._n = 1), n
        }

        function o(e, t) {
            var n = Object(r.unpackStore)(e);
            n.oCache || (n.oCache = {}), t.id && (n.oCache[t.id] = t)
        }
    },
    83: function(e, t, n) {
        "use strict";
        n.r(t), n.d(t, "KEY", function() {
            return a
        }), n.d(t, "addEvent", function() {
            return o
        }), n.d(t, "removeEvent", function() {
            return u
        }), n.d(t, "triggerEvent", function() {
            return c
        }), n.d(t, "cancelEvent", function() {
            return s
        }), n.d(t, "stopEvent", function() {
            return d
        }), n.d(t, "normEvent", function() {
            return l
        }), n.d(t, "checkEvent", function() {
            return f
        }), n.d(t, "checkKeyboardEvent", function() {
            return m
        }), n.d(t, "checkOver", function() {
            return g
        });
        var r = n(360),
            i = n(54),
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

        function o(e, t, n, a, o, u) {
            if ((e = Object(r.ge)(e)) && 3 != e.nodeType && 8 != e.nodeType) {
                var c, d = o ? ((c = function(e) {
                    var t = e.data;
                    e.data = o;
                    var r = n.apply(this, [e]);
                    return e.data = t, r
                }).handler = n, c) : n;
                e.setInterval && e !== window && (e = window);
                var f = Object(r.data)(e, "events") || Object(r.data)(e, "events", {}),
                    m = Object(r.data)(e, "handle") || Object(r.data)(e, "handle", function(e) {
                        return function() {
                            (function(e) {
                                e = l(e);
                                var t = Array.from(arguments);
                                t[0] = e;
                                var n = Object(r.data)(this, "events");
                                if (!n || "string" != typeof e.type || !n[e.type] || !n[e.type].length) return;
                                var i = (n[e.type] || []).slice();
                                for (var a in i)
                                    if (i.hasOwnProperty(a)) {
                                        if ("mouseover" === e.type || "mouseout" === e.type) {
                                            for (var o = e.relatedElement; o && o !== this;) o = o.parentNode;
                                            if (o === this) continue
                                        }
                                        var u = i[a].apply(this, t);
                                        if (!1 !== u && -1 !== u || s(e), -1 === u) return !1
                                    }
                            }).apply(e, arguments)
                        }
                    }(e));
                Object(i.each)(t.split(/\s+/), function(t, n) {
                    f[n] || (f[n] = [], !a && e.addEventListener ? e.addEventListener(n, m, u) : !a && e.attachEvent && e.attachEvent("on" + n, m)), f[n].push(d)
                })
            }
        }

        function u(e, t, n, a) {
            if (void 0 === a && (a = !1), e = Object(r.ge)(e)) {
                var o = Object(r.data)(e, "events");
                if (o)
                    if ("string" == typeof t) Object(i.each)(t.split(/\s+/), function(t, u) {
                        if (Object(i.isArray)(o[u])) {
                            var c = o[u].length;
                            if (Object(i.isFunction)(n)) {
                                for (var s = c - 1; s >= 0; s--)
                                    if (o[u][s] && (o[u][s] === n || o[u][s].handler === n)) {
                                        o[u].splice(s, 1), c--;
                                        break
                                    }
                            } else {
                                for (var d = 0; d < c; d++) delete o[u][d];
                                c = 0
                            }
                            c || (e.removeEventListener ? e.removeEventListener(u, Object(r.data)(e, "handle"), a) : e.detachEvent && e.detachEvent("on" + u, Object(r.data)(e, "handle")), delete o[u])
                        }
                    }), Object(i.isEmpty)(o) && (Object(r.removeData)(e, "events"), Object(r.removeData)(e, "handle"));
                    else
                        for (var c in o) o.hasOwnProperty(c) && u(e, c)
            }
        }

        function c(e, t, n, a) {
            e = Object(r.ge)(e);
            var o = Object(r.data)(e, "handle");
            if (o) {
                var u = function() {
                    return o.call(e, Object(i.extend)(n || {}, {
                        type: t,
                        target: e
                    }))
                };
                a ? u() : setTimeout(u, 0)
            }
        }

        function s(e) {
            if (!(e = e || window.event)) return !1;
            for (; e.originalEvent;) e = e.originalEvent;
            return e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), e.cancelBubble = !0, e.returnValue = !1, !1
        }

        function d(e) {
            if (!(e = e || window.event)) return !1;
            for (; e.originalEvent;) e = e.originalEvent;
            return e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0, !1
        }

        function l(e) {
            var t = e = e || window.event;
            if ((e = Object(i.clone)(t)).originalEvent = t, e.target || (e.target = e.srcElement || document), 3 == e.target.nodeType && (e.target = e.target.parentNode), !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement === e.target), null == e.pageX && null != e.clientX) {
                var n = document.documentElement,
                    r = bodyNode;
                e.pageX = e.clientX + (n && n.scrollLeft || r && r.scrollLeft || 0) - (n.clientLeft || 0), e.pageY = e.clientY + (n && n.scrollTop || r && r.scrollTop || 0) - (n.clientTop || 0)
            }
            return !e.which && (e.charCode || 0 === e.charCode ? e.charCode : e.keyCode) && (e.which = e.charCode || e.keyCode), !e.metaKey && e.ctrlKey ? e.metaKey = e.ctrlKey : !e.ctrlKey && e.metaKey && browser.mac && (e.ctrlKey = e.metaKey), !e.which && e.button && (e.which = 1 & e.button ? 1 : 2 & e.button ? 3 : 4 & e.button ? 2 : 0), e
        }

        function f(e) {
            var t = e || window.event;
            return t && ("click" === t.type || "mousedown" === t.type || "mouseup" === t.type) && (t.which > 1 || t.button > 1 || t.ctrlKey || t.shiftKey || browser.mac && t.metaKey) || !1
        }

        function m(e) {
            if (!(e = l(e)) || !e.target) return !1;
            if (!e.screenX) return !0;
            var t = Object(r.getSize)(e.target),
                n = Object(r.getXY)(e.target),
                i = e.pageX - n[0],
                a = e.pageY - n[1];
            return i < -1 || i > t[0] + 1 || a < -1 || a > t[1] + 1 || Math.abs(e.pageX - n[0] - t[0] / 2) < 1 && Math.abs(e.pageY - n[1] - t[1] / 2) < 1
        }

        function g(e, t) {
            if (!e) return !0;
            e = e.originalEvent || e, t = t || e.target;
            var n = e.fromElement || e.relatedTarget;
            if (!n || n === t || n === t.parentNode) return !0;
            for (; n !== t && n.parentNode && n.parentNode !== bodyNode;) n = n.parentNode;
            return n !== t
        }
        window.KEY = a, window.addEvent = o, window.removeEvent = u, window.triggerEvent = c, window.cancelEvent = s, window.stopEvent = d, window.normEvent = l, window.checkEvent = f, window.checkKeyboardEvent = m, window.checkOver = g
    }
});