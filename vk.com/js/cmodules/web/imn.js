! function(e) {
    function t(r) {
        if (n[r]) return n[r].exports;
        var a = n[r] = {
            exports: {},
            id: r,
            loaded: !1
        };
        return e[r].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n) {
    e.exports = n(96)
}, function(e, t, n) {
    var r = n(61),
        a = n(136);
    e.exports = function(e) {
        return function(t, n) {
            var i, s, o = String(a(t)),
                l = r(n),
                u = o.length;
            return 0 > l || l >= u ? e ? "" : void 0 : (i = o.charCodeAt(l), 55296 > i || i > 56319 || l + 1 === u || (s = o.charCodeAt(l + 1)) < 56320 || s > 57343 ? e ? o.charAt(l) : i : e ? o.slice(l, l + 2) : (i - 55296 << 10) + (s - 56320) + 65536)
        }
    }
}, function(e, t, n) {
    var r = n(54).f,
        a = n(114),
        i = n(17)("toStringTag");
    e.exports = function(e, t, n) {
        e && !a(e = n ? e : e.prototype, i) && r(e, i, {
            configurable: !0,
            value: t
        })
    }
}, function(e, t) {
    "use strict";

    function n(e, t) {
        return new Promise(function(n) {
            setTimeout(n.bind(null, t), 1e3 * e)
        })
    }

    function r(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            a = 0;
        return function i() {
            for (var s = arguments.length, o = Array(s), l = 0; s > l; l++) o[l] = arguments[l];
            return Promise.resolve().then(function() {
                return e.apply(void 0, o)
            })["catch"](function(e) {
                if (a++, t >= a) {
                    var s = "function" == typeof r ? r(a) : 0;
                    return 0 === s ? i.apply(void 0, o) : n(s).then(function() {
                        return i.apply(void 0, o)
                    })
                }
                throw e
            })
        }
    }

    function a(e, t, n) {
        var r = void 0,
            a = void 0;
        return function() {
            for (var i = arguments.length, s = Array(i), o = 0; i > o; o++) s[o] = arguments[o];
            return new Promise(function(e, i) {
                var o = function() {
                        r = null, a = null, n || e(s)
                    },
                    l = n && !r;
                clearTimeout(r), a && a.reject("debounce"), r = setTimeout(o, t), l ? e(s) : n && i("debounce"), a = {
                    resolve: e,
                    reject: i
                }
            }).then(function(t) {
                return e.apply(void 0, t)
            })
        }
    }

    function i(e, t) {
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
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.pause = n, t.retryFn = r, t.debouncedPromise = a, t.abortablePause = i
}, function(e, t) {
    e.exports = function(e) {
        try {
            return !!e()
        } catch (t) {
            return !0
        }
    }
}, function(e, t) {
    "use strict";

    function n(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r, a = "\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј",
        i = "(https?:\\/\\/)?",
        s = "((?:[" + a + "\\—\\-\\_]+\\.){1,5})",
        o = "([A-Za-z\\$а-яА-Я\\-\\d]{2,22})",
        l = "(?:\\:(\\d{2,5}))",
        u = "(" + s + o + l + "?)",
        c = "([\\/?#])",
        d = "\\wА-Яа-я\\xa8\\xb8\\xc0-\\xffєЄҐґЇїІіЈј",
        g = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
        m = "　-〿＀-￯",
        f = "\\—\\-\\_@#%?+\\/\\$.~=;:'",
        p = "[" + d + f + g + m + "]",
        _ = "(?:\\(|\\[)[" + a + "\\d&#%;,]+(?:\\)|\\])",
        h = "(" + c + "(?:\\&amp;|\\&#\\d{2,6};|,[_%]|!|,*" + p + "+|" + _ + "){0,200})?",
        v = i + u + h,
        b = "aaa,aarp,abarth,abb,abbott,abbvie,abc,able,abogado,abudhabi,ac,academy,accenture,accountant,accountants,aco,active,actor,ad,adac,ads,adult,ae,aeg,aero,aetna,af,afamilycompany,afl,africa,ag,agakhan,agency,ai,aig,aigo,airbus,airforce,airtel,akdn,al,alfaromeo,alibaba,alipay,allfinanz,allstate,ally,alsace,alstom,am,americanexpress,americanfamily,amex,amfam,amica,amsterdam,an,analytics,android,anquan,anz,ao,aol,apartments,app,apple,aq,aquarelle,ar,aramco,archi,army,arpa,art,arte,as,asda,asia,associates,at,athleta,attorney,au,auction,audi,audible,audio,auspost,author,auto,autos,avianca,aw,aws,ax,axa,az,azure,ba,baby,baidu,banamex,bananarepublic,band,bank,bar,barcelona,barclaycard,barclays,barefoot,bargains,baseball,basketball,bauhaus,bayern,bb,bbc,bbt,bbva,bcg,bcn,bd,be,beats,beauty,beer,bentley,berlin,best,bestbuy,bet,bf,bg,bh,bharti,bi,bible,bid,bike,bing,bingo,bio,biz,bj,bl,black,blackfriday,blanco,blockbuster,blog,bloomberg,blue,bm,bms,bmw,bn,bnl,bnpparibas,bo,boats,boehringer,bofa,bom,bond,boo,book,booking,boots,bosch,bostik,boston,bot,boutique,box,bq,br,bradesco,bridgestone,broadway,broker,brother,brussels,bs,bt,budapest,bugatti,build,builders,business,buy,buzz,bv,bw,by,bz,bzh,ca,cab,cafe,cal,call,calvinklein,cam,camera,camp,cancerresearch,canon,capetown,capital,capitalone,car,caravan,cards,care,career,careers,cars,cartier,casa,case,caseih,cash,casino,cat,catering,catholic,cba,cbn,cbre,cbs,cc,cd,ceb,center,ceo,cern,cf,cfa,cfd,cg,ch,chanel,channel,chase,chat,cheap,chintai,chloe,christmas,chrome,chrysler,church,ci,cipriani,circle,cisco,citadel,citi,citic,city,cityeats,ck,cl,claims,cleaning,click,clinic,clinique,clothing,cloud,club,clubmed,cm,cn,co,coach,codes,coffee,college,cologne,com,comcast,commbank,community,company,compare,computer,comsec,condos,construction,consulting,contact,contractors,cooking,cookingchannel,cool,coop,corsica,country,coupon,coupons,courses,cr,credit,creditcard,creditunion,cricket,crown,crs,cruise,cruises,csc,cu,cuisinella,cv,cw,cx,cy,cymru,cyou,cz,dabur,dad,dance,data,date,dating,datsun,day,dclk,dds,de,deal,dealer,deals,degree,delivery,dell,deloitte,delta,democrat,dental,dentist,desi,design,dev,dhl,diamonds,diet,digital,direct,directory,discount,discover,dish,diy,dj,dk,dm,dnp,do,docs,doctor,dodge,dog,doha,domains,dot,download,drive,dtv,dubai,duck,dunlop,duns,dupont,durban,dvag,dvr,dz,earth,eat,ec,eco,edeka,edu,education,ee,eg,eh,email,emerck,energy,engineer,engineering,enterprises,epost,epson,equipment,er,ericsson,erni,es,esq,estate,esurance,et,eu,eurovision,eus,events,everbank,exchange,expert,exposed,express,extraspace,fage,fail,fairwinds,faith,family,fan,fans,farm,farmers,fashion,fast,fedex,feedback,ferrari,ferrero,fi,fiat,fidelity,fido,film,final,finance,financial,fire,firestone,firmdale,fish,fishing,fit,fitness,fj,fk,flickr,flights,flir,florist,flowers,fly,fm,fo,foo,food,foodnetwork,football,ford,forex,forsale,forum,foundation,fox,fr,free,fresenius,frl,frogans,frontdoor,frontier,ftr,fujitsu,fujixerox,fun,fund,furniture,futbol,fyi,ga,gal,gallery,gallo,gallup,game,games,gap,garden,gb,gbiz,gd,gdn,ge,gea,gent,genting,george,gf,gg,ggee,gh,gi,gift,gifts,gives,giving,gl,glade,glass,gle,global,globo,gm,gmail,gmbh,gmo,gmx,gn,godaddy,gold,goldpoint,golf,goo,goodhands,goodyear,goog,google,gop,got,gov,gp,gq,gr,grainger,graphics,gratis,green,gripe,group,gs,gt,gu,guardian,gucci,guge,guide,guitars,guru,gw,gy,hair,hamburg,hangout,haus,hbo,hdfc,hdfcbank,health,healthcare,help,helsinki,here,hermes,hgtv,hiphop,hisamitsu,hitachi,hiv,hk,hkt,hm,hn,hockey,holdings,holiday,homedepot,homegoods,homes,homesense,honda,honeywell,horse,hospital,host,hosting,hot,hoteles,hotmail,house,how,hr,hsbc,ht,htc,hu,hughes,hyatt,hyundai,ibm,icbc,ice,icu,id,ie,ieee,ifm,ikano,il,im,imamat,imdb,immo,immobilien,in,industries,infiniti,info,ing,ink,institute,insurance,insure,int,intel,international,intuit,investments,io,ipiranga,iq,ir,irish,is,iselect,ismaili,ist,istanbul,it,itau,itv,iveco,iwc,jaguar,java,jcb,jcp,je,jeep,jetzt,jewelry,jio,jlc,jll,jm,jmp,jnj,jo,jobs,joburg,jot,joy,jp,jpmorgan,jprs,juegos,juniper,kaufen,kddi,ke,kerryhotels,kerrylogistics,kerryproperties,kfh,kg,kh,ki,kia,kim,kinder,kindle,kitchen,kiwi,km,kn,koeln,komatsu,kosher,kp,kpmg,kpn,kr,krd,kred,kuokgroup,kw,ky,kyoto,kz,la,lacaixa,ladbrokes,lamborghini,lamer,lancaster,lancia,lancome,land,landrover,lanxess,lasalle,lat,latino,latrobe,law,lawyer,lb,lc,lds,lease,leclerc,lefrak,legal,lego,lexus,lgbt,li,liaison,lidl,life,lifeinsurance,lifestyle,lighting,like,lilly,limited,limo,lincoln,linde,link,lipsy,live,living,lixil,lk,loan,loans,local,locker,locus,loft,lol,london,lotte,lotto,love,lpl,lplfinancial,lr,ls,lt,ltd,ltda,lu,lundbeck,lupin,luxe,luxury,lv,ly,ma,macys,madrid,maif,maison,makeup,man,management,mango,market,marketing,markets,marriott,marshalls,maserati,mattel,mba,mc,mcd,mcdonalds,mckinsey,md,me,med,media,meet,melbourne,meme,memorial,men,menu,meo,metlife,mf,mg,mh,miami,microsoft,mil,mini,mint,mit,mitsubishi,mk,ml,mlb,mls,mm,mma,mn,mo,mobi,mobile,mobily,moda,moe,moi,mom,monash,money,monster,montblanc,mopar,mormon,mortgage,moscow,moto,motorcycles,mov,movie,movistar,mp,mq,mr,ms,msd,mt,mtn,mtpc,mtr,mu,museum,mutual,mv,mw,mx,my,mz,na,nab,nadex,nagoya,name,nationwide,natura,navy,nba,nc,ne,nec,net,netbank,netflix,network,neustar,new,newholland,news,next,nextdirect,nexus,nf,nfl,ng,ngo,nhk,ni,nico,nike,nikon,ninja,nissan,nissay,nl,no,nokia,northwesternmutual,norton,now,nowruz,nowtv,np,nr,nra,nrw,ntt,nu,nyc,nz,obi,observer,off,office,okinawa,olayan,olayangroup,oldnavy,ollo,om,omega,one,ong,onl,online,onyourside,ooo,open,oracle,orange,org,organic,orientexpress,origins,osaka,otsuka,ott,ovh,pa,page,pamperedchef,panasonic,panerai,paris,pars,partners,parts,party,passagens,pay,pccw,pe,pet,pf,pfizer,pg,ph,pharmacy,philips,phone,photo,photography,photos,physio,piaget,pics,pictet,pictures,pid,pin,ping,pink,pioneer,pizza,pk,pl,place,play,playstation,plumbing,plus,pm,pn,pnc,pohl,poker,politie,porn,post,pr,pramerica,praxi,press,prime,pro,prod,productions,prof,progressive,promo,properties,property,protection,pru,prudential,ps,pt,pub,pw,pwc,py,qa,qpon,quebec,quest,qvc,racing,radio,raid,re,read,realestate,realtor,realty,recipes,red,redstone,redumbrella,rehab,reise,reisen,reit,reliance,ren,rent,rentals,repair,report,republican,rest,restaurant,review,reviews,rexroth,rich,richardli,ricoh,rightathome,ril,rio,rip,rmit,ro,rocher,rocks,rodeo,rogers,room,rs,rsvp,ru,ruhr,run,rw,rwe,ryukyu,sa,saarland,safe,safety,sakura,sale,salon,samsclub,samsung,sandvik,sandvikcoromant,sanofi,sap,sapo,sarl,sas,save,saxo,sb,sbi,sbs,sc,sca,scb,schaeffler,schmidt,scholarships,school,schule,schwarz,science,scjohnson,scor,scot,sd,se,seat,secure,security,seek,select,sener,services,ses,seven,sew,sex,sexy,sfr,sg,sh,shangrila,sharp,shaw,shell,shia,shiksha,shoes,shop,shopping,shouji,show,showtime,shriram,si,silk,sina,singles,site,sj,sk,ski,skin,sky,skype,sl,sling,sm,smart,smile,sn,sncf,so,soccer,social,softbank,software,sohu,solar,solutions,song,sony,soy,space,spiegel,spot,spreadbetting,sr,srl,srt,ss,st,stada,staples,star,starhub,statebank,statefarm,statoil,stc,stcgroup,stockholm,storage,store,stream,studio,study,style,su,sucks,supplies,supply,support,surf,surgery,suzuki,sv,swatch,swiftcover,swiss,sx,sy,sydney,symantec,systems,sz,tab,taipei,talk,taobao,target,tatamotors,tatar,tattoo,tax,taxi,tc,tci,td,tdk,team,tech,technology,tel,telecity,telefonica,temasek,tennis,teva,tf,tg,th,thd,theater,theatre,tiaa,tickets,tienda,tiffany,tips,tires,tirol,tj,tjmaxx,tjx,tk,tkmaxx,tl,tm,tmall,tn,to,today,tokyo,tools,top,toray,toshiba,total,tours,town,toyota,toys,tp,tr,trade,trading,training,travel,travelchannel,travelers,travelersinsurance,trust,trv,tt,tube,tui,tunes,tushu,tv,tvs,tw,tz,ua,ubank,ubs,uconnect,ug,uk,um,unicom,university,uno,uol,ups,us,uy,uz,va,vacations,vana,vanguard,vc,ve,vegas,ventures,verisign,vermögensberater,vermögensberatung,versicherung,vet,vg,vi,viajes,video,vig,viking,villas,vin,vip,virgin,visa,vision,vista,vistaprint,viva,vivo,vlaanderen,vn,vodka,volkswagen,volvo,vote,voting,voto,voyage,vu,vuelos,wales,walmart,walter,wang,wanggou,warman,watch,watches,weather,weatherchannel,webcam,weber,website,wed,wedding,weibo,weir,wf,whoswho,wien,wiki,williamhill,win,windows,wine,winners,wme,wolterskluwer,woodside,work,works,world,wow,ws,wtc,wtf,xbox,xerox,xfinity,xihuan,xin,xperia,xxx,xyz,yachts,yahoo,yamaxun,yandex,ye,yodobashi,yoga,yokohama,you,youtube,yt,yu,yun,za,zappos,zara,zero,zip,zippo,zm,zone,zuerich,zw",
        y = "бг,бел,дети,ею,католик,ком,мкд,мон,москва,онлайн,орг,рус,рф,сайт,срб,укр",
        C = "qxam,90ae,90ais,d1acj3b,e1a4c,80aqecdr1a,j1aef,d1alf,l1acc,80adxhks,80asehdb,c1avg,p1acf,p1ai,80aswg,90a3ac,j1amh,80ao21a,y9a3aq,9dbq2a,mgbca7dzdo,mgba3a3ejt,mgbayh7gpa,lgbbat1ad8j,mgberp4a5d4ar,mgba7c0bbn0a,mgbc0a9azcg,mgb2ddes,mgbaam7a8h,mgba3a4f16a,mgbbh1a,mgbab2bd,ngbe9e0a,mgbbh1a71e,pgbs0dh,mgbpl2fh,ogbpf8fl,ngbc5azd,mgbtx2b,mgb9awbf,ygbi2ammx,wgbl6a,mgbi4ecexp,fhbei,wgbh1c,mgbx4cd0ab,mgbb9fbpob,4gbrim,mgbt3dhd,mgbai9azgqp6j,mgbgu82a,11b4c3d,c2br7g,h2brj9c,h2breg3eve,h2brj9c8c,i1b6b1a6a2e,54b7fta0cc,45brj9c,45br5cyl,s9brj9c,gecrj9c,3hcrj9c,xkc2dl3a5ee0h,xkc2al3hye2a,clchc0ea0b2g2a9gcd,fpcrj9c3d,2scrj9c,rvc1e0am3e,fzc2c9e2c,42c2d9a,o3cw4h,node,q9jyb4c,gckr3f0f,qcka1pmc,tckwe,cck2b3b,1ck2e1b,bck1b9a5dre4c,eckvdtc9d,rhqv96g,fiq64b,fiqs8s,fiqz9s,fiq228c5hs,vhquv,1qqw23a,vuq861b,nyqy26a,45q11c,55qx5d,55qw42g,kprw13d,kpry57d,czru2d,czrs0t,czr694b,w4rs40l,w4r85el8fhu5dnra,3ds443g,3oq18vl8pn36a,pssy2u,tiq49xqyj,fjq720a,fct429k,estv75g,xhq521b,9krt00a,30rr7y,6qq986b3xl,kput3i,kpu716f,zfr164b,mxtq1m,yfro4i67o,efvy88h,9et52u,rovu88b,nqv7f,b4w605ferd,unup4y,mix891f,mix082f,3pxu8k,pbt977c,6frz82g,nqv7fs00ema,ses554g,hxt814e,5tzm5g,io0a7i,8y0a063a,jlq61u9w7b,flw351e,g2xx48c,gk3at1e,3bst00m,fzys8d69uvgm,kcrx77d1x4a,jvr189m,imr513n,5su34j936bgsg,j6w193g,t60b56a,mk1bu44c,cg4bki,3e0b707e",
        w = (t.OUR_DOMAINS = /^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me)$/, t.ENTITIES = /([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g, t.VK_DOMAIN = /^(?:https?:\/\/)?(?:vk\.com|vkontakte\.ru)?\/([a-zA-Z0-9\._]+)\??$/, t.MENTION = /\[(id|club)(\d+)(?:\:([a-z0-9_\-]+))?\|([^\$]+?)\]/g, t.MENTION_RAW = /(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g, t.ARROW_UP = 38),
        E = t.ARROW_DOWN = 40,
        k = t.PAGE_UP = 33,
        T = t.PAGE_DOWN = 34,
        S = t.END_KEY = 35,
        I = t.HOME = 36,
        M = t.ENTER = 13,
        P = t.ESC = 27,
        L = (t.UNPRINTABLE_KEYS = [w, E, k, T, M, P, S, I], t.UP_DOWN_CONTROLS = [k, T, E, w, I, S], t.PRINTABLE = "printable", t.FOLDER_UNREAD = "unread"),
        A = t.FOLDER_ALL = "all",
        O = t.FOLDER_UNRESPOND = "unrespond",
        D = t.FOLDER_IMPORTANT = "important",
        x = (t.FOLDERS = [A, L, O, D], t.FOLDER_MASKS = (r = {}, n(r, O, 2), n(r, D, 1), r), t.TOP_DOMAINS = [].concat(b.split(","), y.split(","), C.split(",").map(function(e) {
            return "xn--" + e
        })));
    t.MAX_DOMAIN_LENGTH = x.reduce(function(e, t) {
        return Math.max(e, t.length)
    }, 0), t.EMAIL = new RegExp("([a-zA-Zа-яА-Я\\-_\\.0-9\\+]+@(" + s + o + "))", "ig"), t.MESSAGE_REGEXP = new RegExp(v, "ig")
}, function(e, t, n) {
    var r = n(43),
        a = "__core-js_shared__",
        i = r[a] || (r[a] = {});
    e.exports = function(e) {
        return i[e] || (i[e] = {})
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        for (var n = void 0, r = 0, a = e; null !== (n = d.MESSAGE_REGEXP.exec(e));) {
            n = s(n);
            var i = n[0].length,
                l = n.index + i,
                u = e[n.index - 1],
                c = e[l - 1],
                g = void 0 !== u && /([\w\$А-Яа-яёЁєЄҐґЇїІіЈј\—\-\_@;.])/i.test(u),
                m = void 0 !== c && /([:;$])/i.test(c);
            if (!g && !m) {
                var f = o(n),
                    p = f.domain;
                if (p.length <= d.MAX_DOMAIN_LENGTH && -1 !== d.TOP_DOMAINS.indexOf(p)) {
                    var _ = t(f);
                    a = a.slice(0, n.index + r) + _ + a.slice(l + r), r += _.length - i
                }
            }
        }
        return a
    }

    function a(e, t) {
        return e.replace(d.EMAIL, t || function(e) {
            return '<a href="mailto:' + e + '">' + e + "</a>"
        })
    }

    function i(e, t) {
        return e.replace(d.MENTION, t || function(e, t, n, r, a) {
            return '<a href="/' + (t + n) + '" class="mem_link" mention="' + m(r || "") + '" mention_id="' + m(t + n) + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)">' + a + "</a>"
        })
    }

    function s(e) {
        if (!e[0] || !e[6]) return e;
        var t = e[0].length - 1,
            n = e[6].length - 1;
        return "." === e[0][t] && "." === e[6][n] && (e[0] = e[0].slice(0, t), e[6] = e[6].slice(0, n)), e
    }

    function o(e) {
        return {
            full: e[0],
            protocol: e[1] || "http://",
            url: e[2],
            domain: e[4],
            query: e[6] || ""
        }
    }

    function l(e) {
        p("ttl_message_confirm_delivery", e)
    }

    function u(e, t) {
        var n = t.protocol,
            r = t.url,
            a = t.query,
            i = t.domain,
            s = t.full;
        try {
            s = decodeURIComponent(s)
        } catch (o) {}
        if (s.length > 55 && (s = s.substr(0, 53) + ".."), s = m(s).replace(/&amp;/g, "&"), !e && i.match(d.OUR_DOMAINS)) {
            r = f(r).replace(d.ENTITIES, encodeURIComponent);
            var l = r,
                u = r.indexOf("#/"),
                g = "",
                p = void 0;
            return u >= 0 ? l = r.substr(u + 1) : (u = r.indexOf("#!"), u >= 0 && (l = "/" + r.substr(u + 2).replace(/^\//, ""))), p = l.match(d.VK_DOMAIN), p && p[1].length < 32 && (g = ' mention_id="' + p[1] + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"'), '<a href="' + c(n + r + a) + '" target="_blank"' + g + ">" + s + "</a>"
        }
        var _ = "away.php?utf=1&to=" + encodeURIComponent(n + f(r + a)),
            h = m((n + r + a).replace(/'/g, "\\'")),
            v = "return goAway('" + h + "', {}, event);";
        return '<a href="' + _ + '" target="_blank" onclick="' + v + '">' + s + "</a>"
    }

    function c(e) {
        return e.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.replaceHyperLinks = r, t.replaceEmailLinks = a, t.replaceMentions = i, t.confirmDelivery = l, t.linksReplacer = u;
    var d = n(5),
        g = window,
        m = g.clean,
        f = g.replaceEntities,
        p = g.statlogsValueEvent
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }

    function a(e, t) {
        return "number" != typeof t.messageId ? !0 : i(t) ? t.messageId > e.out_up_to : t.messageId > e.in_up_to
    }

    function i(e) {
        return e.flags & y.FLAG_OUTBOUND
    }

    function s(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            r = e.attaches[0];
        return r && (r.type === t || r.type === n)
    }

    function o(e) {
        return s(e, "doc") && "graffiti" === e.attaches[0].kind
    }

    function l(e) {
        return s(e, "doc") && "audiomsg" === e.attaches[0].kind
    }

    function u(e) {
        return s(e, "sticker")
    }

    function c(e) {
        return s(e, "gift")
    }

    function d(e) {
        return s(e, "money_transfer", "money_request")
    }

    function g(e) {
        return s(e, "money_request")
    }

    function m(e) {
        return s(e, "link") && f(e.kludges.attach1_url)
    }

    function f(e) {
        var t = /^https:\/\/(.+\.)?vk\.com\/vk-me\.php\?act=join&(amp;)?link=[\w\/=_]+$/,
            n = /^https:\/\/vk\.me\/join\/[\w\/=_]+$/;
        return t.test(e) || n.test(e)
    }

    function p(e) {
        return e.flags & y.FLAG_IMPORTANT
    }

    function _(e) {
        return i(e) ? vk.id : e.userId
    }

    function h(e) {
        return e.update_time > 0
    }

    function v(e, t) {
        return (e.get().selectedMessages || []).indexOf(t) >= 0
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.isUnread = a, t.isOut = i, t.isGraffiti = o, t.isAudioMsg = l, t.isSticker = u, t.isGift = c, t.isMoney = d, t.isMoneyRequest = g, t.isMessageWithInviteLink = m, t.isImportant = p, t.getUserId = _, t.wasEdited = h, t.isMessageSelected = v;
    var b = n(132),
        y = r(b)
}, function(e, t, n) {
    "use strict";

    function r() {
        window.getSelection ? window.getSelection().empty ? window.getSelection().empty() : window.getSelection().removeAllRanges && window.getSelection().removeAllRanges() : document.selection && document.selection.empty()
    }

    function a(e, t, n, a, s) {
        if (!(0, c.isSearchingInplace)(e.get().peer, e.get()) && !(hasClass(s, u.FAILED_CLASS) || hasClass(s, u.SENDING_CLASS) || hasClass(s, "_im_mess_srv") || (0, u.checkSelectClick)(a, s) || (0, d.isAnyMessageBeingEdited)(e) || "A" === a.target.tagName || a.target.classList.contains(g))) {
            var o = intval(domData(s, "msgid")),
                l = e.get().peer;
            if (!(0, u.isAlreadyDeleted)(e, l, o)) {
                var m = void 0,
                    f = void 0;
                m = a.shiftKey ? (0, d.getMessageRangeFromSelection)(e, l, o) : [o], e.set(c.addSelection.bind(null, m)).then(function() {
                    var a = (0, d.getSelectedMessages)(e),
                        i = !1;
                    m.forEach(function(e) {
                        var t = geByClass1("_im_mess_" + e, n);
                        if (t) {
                            var r = inArray(e, a);
                            i |= r, toggleClass(t, "im-mess_selected", r);
                            var s = r ? getLang("mail_deselect_message") : getLang("mail_select_message"),
                                o = geByClass1("_im_mess_blind_label_select", t);
                            attr(o, "aria-label", s)
                        }
                    }), i && r(), t().changedMessageSelection(e)
                }).then(function() {
                    1 !== e.get().selectedMessages.length || f ? f && f.hide() : f = i(e)
                })
            }
        }
    }

    function i(e) {
        var t = e.get();
        if (t.pinnedMessagesPromo && (0, u.isChatPeer)(t.peer)) {
            var n = geByClass1("_mess-action-promo"),
                r = new ElementTooltip(n, {
                    autoShow: !1,
                    appendTo: n,
                    content: getTemplate("im_pinned_messages_promo", {
                        content: getLang("mail_pinned_messages_promo_tooltip")
                    }),
                    forceSide: "bottom",
                    cls: "feature_intro_tt",
                    width: 260,
                    onHide: function() {
                        e.setState({
                            pinnedMessagesPromo: !1
                        }), (0, c.hidePromoTooltip)()
                    }
                });
            return r.show(), r
        }
    }

    function s(e, t) {
        return {
            cleanSelection: function(t) {
                t.map(function(t) {
                    return geByClass1("_im_mess_" + t, e)
                }).filter(function(e) {
                    return e
                }).forEach(function(e) {
                    return removeClass(e, "im-mess_selected")
                })
            },
            unmount: function() {
                (0, l.destroyModule)(t)
            }
        }
    }

    function o(e, t, n) {
        var r = a.bind(null, t, n, e),
            i = (0, l.createModule)({
                handlers: function(t, n) {
                    n(e, "click", "_im_mess", r)
                }
            });
        return s(e, i)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = o;
    var l = n(83),
        u = n(20),
        c = n(46),
        d = n(139),
        g = "_im_retry_media"
}, function(e, t) {
    e.exports = function(e) {
        return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children = [], e.webpackPolyfill = 1), e
    }
}, function(e, t) {}, function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
    }
}, function(e, t, n) {
    var r = n(6)("keys"),
        a = n(127);
    e.exports = function(e) {
        return r[e] || (r[e] = a(e))
    }
}, function(e, t) {
    e.exports = function(e, t, n, r) {
        if (!(e instanceof t) || void 0 !== r && r in e) throw TypeError(n + ": incorrect invocation!");
        return e
    }
}, function(e, t, n) {
    "use strict";
    var r = n(1)(!0);
    n(40)(String, "String", function(e) {
        this._t = String(e), this._i = 0
    }, function() {
        var e, t = this._t,
            n = this._i;
        return n >= t.length ? {
            value: void 0,
            done: !0
        } : (e = r(t, n), this._i += e.length, {
            value: e,
            done: !1
        })
    })
}, function(e, t, n) {
    var r = n(35),
        a = n(33),
        i = n(60);
    e.exports = function(e) {
        return function(t, n, s) {
            var o, l = r(t),
                u = a(l.length),
                c = i(s, u);
            if (e && n != n) {
                for (; u > c;)
                    if (o = l[c++], o != o) return !0
            } else
                for (; u > c; c++)
                    if ((e || c in l) && l[c] === n) return e || c;
            return !e && -1
        }
    }
}, function(e, t, n) {
    var r = n(6)("wks"),
        a = n(127),
        i = n(43).Symbol,
        s = "function" == typeof i;
    e.exports = function(e) {
        return r[e] || (r[e] = s && i[e] || (s ? i : a)("Symbol." + e))
    }
}, function(e, t) {
    e.exports = {}
}, function(e, t) {
    e.exports = {
        im_img_prebody: '<div class="im-prebody"> <img alt="" src="%photo%" /> </div>',
        im_admin_link: ' (<a href="%href%" class="_im_admin_name" target="_blank">%name%</a>)',
        im_right_menu_tpl: '<a id="ui_rmenu_peer_%peer%" href="%href%" class="_im_peer_tab ui_rmenu_item %cls%"%attrs%>\n  <span>%label%</span>\n</a>',
        im_right_menu_sep: '<div class="ui_rmenu_sep"></div>',
        im_right_menu_ct: '<span class="ui_rmenu_count im-right-menu--count _im_r_ct">%count%</span> <button type="button" class="im-right-menu--close _im_r_cl"></button><span class="im-right-menu--text _im_r_tx">%name%</span>',
        im_dialogs_link_img: '<a href="%href%" class="_im_peer_target _online_reader" target="_blank"><div class="im_grid">%photo%</div></a>',
        im_dialogs_link: '<a href="%href%" class="_im_peer_target _online_reader" target="_blank">%photo%</a>',
        im_peer_photo: '<div class="nim-peer %online_class% %modifier_class%"> <div class="nim-peer--photo-w"> <div class="nim-peer--photo"> %owner_photo% </div> </div> </div>',
        im_owner_item: '<a href="%link%" class="olist_item_wrap%cls%" id="olist_item_wrap%owner_id%" >\n  <div class="olist_item clear_fix">\n    <div class="olist_item_photo_wrap %img_cls%">\n      <img class="olist_item_photo" src="%photo%"/>\n    </div>\n    <div class="olist_item_name">%name%</div>\n    <div class="olist_checkbox"></div>\n  </div>\n</a>',
        im_simple_name: '<div class="im-page--title %more_cls%"> <span class="im-page--title-main" title="%name_attr%" %ads_union%><span class="im-page--title-main-in"><a href="%href%" target="_blank" class="im-page--title-main-inner _im_page_peer_name">%name%</a><span class="im-page--title-main-verified _im_chat_verified"></span></span></span> <span class="im-page--title-meta _im_page_peer_online">%online%</span> </div>',
        im_simple_link: '<a href="%href%" class="_im_header_link" target="_blank">%content%</a>',
        im_selected_messages: '<span class="im-page--selected-messages-count">%label%</span> <button aria-label="%tip%" type="button" class="im-page--selected-messages-remove"></button>',
        im_topic: "<div class='im-topic %cls%'>%topic%</div>",
        im_stack_date: ' <a href="%link%" class="_im_mess_link" >%date%</a>',
        im_dialogs_none: '<li data-list-id="002300" class="im-page--dialogs-empty"> %msg%</li>',
        im_filter: '<a class="im-page--dialogs-filter %cls%">%filter%</a>',
        im_drow_prebody: '<span class="nim-dialog--who">%prebody%</span> <span class="nim-dialog--inner-text">%body%</span>',
        im_attach_mess: ' <div class="im-fwd %modifier%"> <span class="im-fwd--title"> <span class="im-fwd--title-name">%text%</span> <span class="im-fwd--date">%date%</span></span> <span class="im-fwd--close _im_fwd_close"></span> <div rel="button" tab-index="0" type="button" class="im-fwd--messages _im_will_fwd">%messages%</div> </div>',
        im_preloader: '<div class="im-preloader %cls%"> %preloader%</div>',
        im_service_row: '<ul class="ui_clean_list"> <li class="im-mess im-mess_srv _im_mess _im_mess_srv _im_mess_%message_id%" data-msgid="%message_id%" data-from="%from_id%" data-ts="%date%"> <div class="im-mess--text">%text%</div> </li> </ul>',
        im_chat_members: '<button type="button" class="_im_chat_members im-page--members">%name%</button>',
        im_mess_stack: '<div class="im-mess-stack _im_mess_stack %cls%" data-peer="%peerId%" data-admin="%admin%"> <div class="im-mess-stack--photo"> <div class="nim-peer nim-peer_small fl_l"> <div class="nim-peer--photo-w"> <div class="nim-peer--photo"> <a target="_blank" class="im_grid" href="%href%"><img alt="%name%" src="%photo%" /></a> </div> </div> </div> </div> <div class="im-mess-stack--content"> <div class="im-mess-stack--info"> <div class="im-mess-stack--pname"> %stack_name% <span class="im-mess-stack--tools">%date%</span> </div> </div> <ul class="ui_clean_list im-mess-stack--mess _im_stack_messages"> %messages% </ul> </div> </div>',
        im_mess_stack_name: '<a href="%link%" class="im-mess-stack--lnk%class%" title="" target="_blank">%name%</a>',
        im_message_media: '<div class="_im_msg_media%messageId%" class="wall_module">%attaches%</div>%text%',
        im_dialog_media: '<span class="nim-dialog--preview nim-dialog--preview-attach">%name%</span>',
        im_typing: '<div class="im-page--typing _im_typing"> <div class="im-typing %cls%"><div class="pr im-typing--icon" id=""><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div><span class="_im_typing_name">&nbsp;</span></div> </div>',
        ctrl_submit_hint: function() {
            return '<div class="reply_submit_hint_wrap" >\n  <div class="reply_submit_hint_title">' + getLang("wall_reply_submit_settings") + '</div>\n  <div class="reply_submit_hint_opts" id="">\n    <div class="radiobtn %enter_on% _im_submit_btn" data-val="0" onclick="radiobtn(this, 0, \'im_submit\'); "><div class="radiobtn_label">' + getLang("wall_reply_submit_settings_1") + '</div></div>\n    <div class="radiobtn %ctrl_on% _im_submit_btn" data-val="1" onclick="radiobtn(this, 1, \'im_submit\'); "><div class="radiobtn_label">' + getLang("wall_reply_submit_settings_2") + "</div></div>\n  </div>\n</div>"
        },
        im_day_bar: '<h5 class="im-page--history-new-bar im-page--history-new-bar_days _im_bar_date %day_class%" data-date="%date%"><span>%day%</span></h5>',
        im_mess_bar: function() {
            return '<h4 class="im-page--history-new-bar _im_unread_bar_row"><span>' + getLang("mail_new_unread_msgs") + "</span></h4>"
        },
        im_drow: function() {
            return '<li data-list-id="%peer%" class="nim-dialog _im_dialog _im_dialog_%peer% %is_unread% %is_unread_out% %is_selected% %more%" data-peer="%peer%" data-msgid="%msg_id%"> <div class="nim-dialog--photo"> <div class="nim-peer %is_online% _im_peer_online"> <div class="nim-peer--photo-w"> <div class="nim-peer--photo _im_dialog_photo"> %photo% </div> </div> </div> </div> <div class="nim-dialog--content"> <div class="nim-dialog--cw"> <span role="link" class="blind_label" aria-label="' + getLang("mail_im_to_multidialog") + ': %tab_name%"></span> <div class="nim-dialog--date _im_dialog_date">%date%</div> <button type="button" class="nim-dialog--close _im_dialog_close"></button> <button type="button" class="nim-dialog--markre _im_dialog_markre"></button> <div class="nim-dialog--name"> <span class="nim-dialog--name-w" aria-hidden="true"> %user_link% </span> <span class="nim-dialog--verfifed _im_dialog_verified"></span> <span class="nim-dialog--mute"></span> <button type="button" class="nim-dialog--star _im_dialog_star"></button> </div> <div class="nim-dialog--text-preview"> <span class="nim-dialog--preview _dialog_body" tabindex="0">%body%</span> <span class="nim-dialog--typing _im_dialog_typing"></span><span class="nim-dialog--typer-el"></span> </div> <label class="blind_label _im_unread_blind_label">%unread_message_string%</label> <div class="nim-dialog--unread _im_dialog_unread_ct" aria-hidden="true">%unread%</div> </div> </div> </li>'
        },
        im_conversation_search_row: function() {
            return '<li data-list-id="%peer%" class="nim-dialog nim-conversation-search-row _im_dialog _im_dialog_%peer% %is_unread% %is_selected% %more%" data-peer="%peer%" data-msgid="%msg_id%"> <div class="nim-dialog--photo"> <div class="nim-peer nim-peer_search %is_online% _im_peer_online"> <div class="nim-peer--photo-w"> <div class="nim-peer--photo _im_dialog_photo"> %photo% </div> </div> </div> </div> <div class="nim-dialog--content"> <div class="nim-dialog--cw"> <span role="link" class="blind_label" aria-label="' + getLang("mail_im_to_multidialog") + ': %tab_name%"></span> <button type="button" class="nim-dialog--close _im_dialog_close"></button> <div class="nim-dialog--name"> <span class="nim-dialog--name-w" aria-hidden="true"> %user_link% </span> </div> <div class="nim-dialog--unread _im_dialog_unread_ct" aria-hidden="true">%unread%</div> </div> </div> </li>'
        },
        im_delete_actions: function() {
            return '<span class="nim-dialog--who">%text%</span> <button class="nim-dialog--daction ui_bullet _im_dialog_daction" data-sid=%spam_id% data-peer="%peer%" data-action="restore" type="button">' + getLang("mail_restore") + '</button> <button class="nim-dialog--daction ui_bullet _im_dialog_daction" data-sid=%spam_id% data-peer="%peer%" data-action="spam" type="button">' + getLang("mail_im_mark_spam") + '</button> <button class="nim-dialog--daction nim-dialog--daction_last _im_dialog_daction" data-sid=%spam_id% data-peer="%peer%" data-action="block" type="button">' + getLang("mail_user_black_list") + "</button>"
        },
        im_chat_change_topic: function() {
            return '<div class="im_change_topic_wrap clear_fix"> <div class="im_change_topic_label fl_l ta_r">' + getLang("mail_chat_topic_change_label") + '</div> <div class="im_change_topic_labeled fl_l"> <input class="text _im_chat_topic_change_input" value="%value%"/> </div> </div>'
        },
        im_msg_row: function() {
            return '<li class="im-mess %cls% _im_mess_noa _im_mess_%msg_id%" aria-hidden="%aria_hidden%" data-ts="%ts%" data-msgid="%msg_id%" data-peer="%from_id%"> <div class="im-mess--text wall_module _im_log_body">%text%</div> <span tabindex="0" role="link" aria-label="' + getLang("mail_select_message") + '" class="blind_label im-mess--blind-select _im_mess_blind_label_select"></span> <span class="blind_label im-mess--blind-read _im_mess_blind_unread_marker" %unread_params%></span> <span class="im-mess--marker _im_mess_marker" %marker_params%></span> </li>'
        },
        sImHistoryRowActions: function() {
            return '<div class="im-mess--actions"> <span role="link" aria-label="' + getLang("mail_im_reply") + '" class="im-mess--reply _im_mess_reply"></span><span role="link" aria-label="' + getLang("mail_im_edit") + '" class="im-mess--edit _im_mess_edit"></span><span role="link" aria-label="' + getLang("mail_important_message") + '" class="im-mess--fav _im_mess_fav"></span> </div> <div class="im-mess--check fl_l"></div>'
        },
        im_wrap_mobile: '<b class="mob_onl %class%" %attrs% onmouseover="mobileOnlineTip(this, {%params%})"></b>',
        im_pinned_message: '<div class="im-page-pinned _im_pinned_message"> <button class="im-page-pinned--hide _im_pin_hide"></button> <div class="im-page-pinned--meta"> <a href="%link%" target="_blank" class="im-page-pinned--name">%name%</a> <span class="im-page-pinned--date">%date%</span> </div> <div class="im-page-pinned--content">%content%</div> </div>',
        im_pinned_message_media: '<span class="im-page-pinned--media">%text%</span>',
        im_pinned_messages_promo: '<div class="im-page--mess-actions-promo-content">%content%</div>',
        im_retry_link: function() {
            return '<button class="im-page--retry _im_retry_media">' + getLang("mail_retry") + "</button>"
        },
        sImLblWasEdited: function() {
            return " <span class='im-mess--lbl-was-edited _im_edit_time' data-time='%update_time%'>" + getLang("mail_was_edited_short") + "</span>"
        }
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }

    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i() {
        var e = Kt.get(Vn);
        return e || 0
    }

    function s(e) {
        e >= window.clientHeight() - 30 && (e = 0), Kt.set(Vn, e)
    }

    function o(e, t) {
        var n = un(e, t),
            r = n.firstElementChild.offsetHeight !== n.parentNode.offsetHeight;
        r && _n(n.firstElementChild, {
            height: n.parentNode.offsetHeight
        })
    }

    function l(e, t) {
        e && e.innerHTML !== t && (e.innerHTML = t)
    }

    function u(e, t, n, r) {
        var a = window.devicePixelRatio >= 2 ? "256" : "128",
            i = "animation" === n,
            s = "im_gift";
        i && (s += " sticker_img");
        var o = "/images/stickers/" + Jt(e) + "/" + a + ".png",
            l = '<img height="128" class="' + s + '" src="' + o + '"/>';
        if (i) {
            var u = "/stickers.php?act=proxy_animation&product_id=" + t + "&sticker_id=" + e,
                c = "animatedSticker" + r;
            l = '<div id="' + c + '" data-loop-count=3 data-animation-path="' + u + '" onmouseenter="StickersAnimation.loadAndPlaySticker(this);"\n     data-uniq-id="' + r + '" data-sticker-id="' + Jt(e) + '" class="sticker_animation sticker_animation_128 im_gift">' + l + "</div>";
            var d = !1;
            browser.msie ? (0 ^ r) === r && (d = !0) : d = Number.isInteger(r), d && window.StickersSettings.getAutoplay() && window.StickersAnimation && window.StickersAnimation.loadAndPlayStickerWithTimer(c, 10)
        }
        return t && (l = '<a onmouseover="return Emoji.stickerOver(' + Jt(e) + ', this);"\n        onclick="return Emoji.clickSticker(' + Jt(t) + ', this, event);">' + l + "</a>"), l = '<div class="im_sticker_row">' + l + "</div>"
    }

    function c(e, t, n) {
        var r = e.get ? e.get() : e;
        if (O(r, t)) {
            var a = r.tabs[t].deleted || [];
            return $t(n, a)
        }
        return !1
    }

    function d(e, t, n) {
        var r = n.randomId,
            a = un("_im_mess_rid" + r, t);
        return a && (t = te([a], t), t = C(e, n, t, !0, !1)), t
    }

    function g(e) {
        var t = (0, pt.checkVoiceMessageAvailable)(e);
        return "undefined" != typeof t ? Promise.resolve(t) : m().then(function(e) {
            return e.length > 0
        })["catch"](function(e) {
            return !1
        })
    }

    function m() {
        return window.AudioContext && navigator.mediaDevices ? navigator.mediaDevices.enumerateDevices().then(function(e) {
            for (var t = [], n = 0; n < e.length; n++) "audioinput" == e[n].kind && t.push(e[n]);
            return t
        }) : Promise.reject(new Error("NotSupported"))
    }

    function f(e) {
        return vn("im_preloader", {
            preloader: Qt(Vt.pr_tpl, {
                id: ""
            }),
            cls: "im-preloader_attach im-preloader_visible im-preloader_" + e
        })
    }

    function p(e) {
        var t = e.split(".");
        return (t[0] < 10 ? "0" : "") + t[0] + (t[1] < 10 ? "0" : "") + t[1] + t[2]
    }

    function _(e) {
        var t = un("_im_invisible_bar", e);
        t && (gn(t, "_im_invisible_bar"), gn(t, "im-page--history-new-bar_hide"))
    }

    function h(e, t, n) {
        var r = v(e, t),
            a = un("_im_mess_" + t.messageId, n);
        return a && (a.parentNode.replaceChild(Wt(r), a), y(n)), n
    }

    function v(e, t) {
        var n = ["_im_mess"],
            r = (0, yt.isUnread)(e.tabs[t.peerId], t);
        (0, yt.isOut)(t) && r && n.push("im-mess_unread _im_mess_unread"), (0, yt.isOut)(t) && n.push("im-mess_out"), (0, yt.wasEdited)(t) && n.push("im-mess_was_edited"), (0, It.canMessageBeEdited)(e, t) && n.push("im-mess_editable"), (0, yt.isImportant)(t) && n.push("im-mess_fav"), -1 != (e.selectedMessages || []).indexOf(t.messageId) && n.push("im-mess_selected");
        var a = Date.now() - 1e3 * t.date > 1e3;
        t.local && a && n.push("im-mess_sending"), t.local && n.push("" + Pt), t.local && (0, yt.wasEdited)(t) && !r && n.push("im-mess_unread im-mess_nobg"), t.failed && n.push("im-mess_failed " + Lt), (0, yt.isGift)(t) && n.push("im-mess_gift");
        var i = b(t),
            s = N(t.text, t.kludges);
        "" != s && (0, yt.wasEdited)(t) && (s += vn("sImLblWasEdited", {
            update_time: t.update_time
        })), t.subject && "..." !== t.subject.trim() && !P(t.peerId) && (s = vn("im_topic", {
            topic: t.subject
        }) + s);
        var o = vn("im_message_media", {
            messageId: t.messageId,
            attaches: i.join(""),
            text: (0, yt.isGift)(t) ? '<div class="im-mess--gift-lbl">' + s + "</div>" : ""
        });
        return (0, yt.isGift)(t) || (o = s + o), "" == s && (0, yt.wasEdited)(t) && (o += vn("sImLblWasEdited", {
            update_time: t.update_time
        })), vn("im_msg_row", {
            msg_id: t.messageId,
            from_id: t.peerId,
            text: o,
            aria_hidden: t.local && !t.failed ? "true" : "false",
            ts: t.date,
            marker_params: t.failed ? 'aria-label="' + bn("mail_send_message_error") + '" role="link"' : "",
            unread_params: r ? 'aria-label="' + bn("mail_unread_message") + '"' : "",
            cls: n.join(" ")
        })
    }

    function b(e) {
        return e.attaches.map(function(t) {
            return "sticker" === t.type ? e.messageId ? u(t.id, t.productId, t.kind, e.messageId) : u(t.id, t.productId) : f(t.type)
        })
    }

    function y(e) {
        for (var t = e.getElementsByClassName("_im_mess_noa"), n = t.length; n--;) fn(t[n], "im-mess_fwd") || t[n].insertAdjacentHTML("afterbegin", vn("sImHistoryRowActions")), gn(t[n], "_im_mess_noa")
    }

    function C(e, t, n) {
        var r = (arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0, arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !0),
            a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !0,
            i = Date.now() - 1e3 * t.date > 1e3,
            s = e.tabs[t.peerId];
        if (!n || un("_im_mess", n) || un("_im_bar_date", n) || (n.innerHTML = ""), s.skipped > 0) return n;
        var o = [];
        t.local || (o = e.imQueue(t.peerId, r)), o.length > 0 && te(o.map(function(e) {
            return un("_im_mess_rid" + e.rid, n)
        }, n).filter(function(e) {
            return e
        }));
        var l = v(e, t),
            u = rn(n);
        fn(u, "_im_mess_stack") || (u = sn(u, "._im_mess_stack", -1));
        var c = (0, pt.getLastMessage)(e, t.peerId, t.messageId),
            d = un("_im_unread_bar_row", n),
            g = (0, yt.getUserId)(t),
            m = c ? x(c.date, e) : 0;
        if (!c || R(s, c, t, e, a)) {
            var f = "",
                p = !1;
            if (d && (0, yt.isOut)(t) && qe(e, n, t.peerId), 1 === s.unread && !(0, yt.isOut)(t) && a && (f += vn("im_mess_bar", {}), p = !0, qe(e, n, t.peerId)), !In(new Date(m))) {
                var _ = new Date,
                    h = p ? "im-page--history-new-bar_hide _im_invisible_bar" : "";
                f += vn("im_day_bar", {
                    day: Tn(t.date, e.timeshift, !0, bn("months_of", "raw"), !0),
                    date: t.date,
                    day_class: _.getDate() + _.getMonth() + _.getFullYear() + " " + h
                })
            }
            if (le(t)) f += vn("im_service_row", {
                text: ce(e, t, s),
                type: "",
                date: t.date,
                from_id: "",
                message_id: t.messageId
            });
            else {
                var b = e.gid && (0, yt.isOut)(t) ? Jt(t.kludges.from_admin) || 0 : 0,
                    C = (0, Tt.oCacheGet)(e, b ? -e.gid : g) || s,
                    E = P(t.peerId) ? C.name : C.first_name,
                    k = C.link || s.href,
                    T = vn("im_mess_stack_name", {
                        name: E,
                        link: k,
                        "class": (0, yt.isMoney)(t) ? " im-mess-stack--lnk-money-transfer" : ""
                    });
                if ((0, yt.isGift)(t)) {
                    var S = bn("mail_gift_message_sent", "raw");
                    T += ' <span class="im-mess-stack--gift">' + yn(C.sex || 0, S) + "</span>"
                }
                if ((0, yt.isMoney)(t)) {
                    var I = (0, yt.isMoneyRequest)(t) ? bn("mail_money_request_message_sent", "raw") : bn("mail_money_tranfer_message_sent", "raw");
                    T += ' <span class="im-mess-stack--money-transfer">' + yn(C.sex || 0, I) + "</span>"
                }
                var M = e.gid ? "/gim" + e.gid : "/im",
                    L = void 0;
                if (L = t.local ? B(t.date, e.timeshift) : vn("im_stack_date", {
                        date: B(t.date, e.timeshift),
                        link: M + "?sel=" + t.peerId + "&msgid=" + t.messageId
                    }), b && e.admins[b]) {
                    var A = e.admins[b],
                        O = b === Vt.id ? bn("mail_by_you") : A[0];
                    L = L + " " + vn("im_admin_link", {
                        name: O,
                        href: A[1]
                    })
                }
                f += vn("im_mess_stack", {
                    photo: C.photo,
                    href: k,
                    cls: "",
                    date_attr: "",
                    link: "/im?sel=" + t.peerId + "&msgid=" + t.messageId,
                    name: en(T),
                    stack_name: T,
                    peerId: g,
                    date: L,
                    messages: l,
                    admin: t.kludges.from_admin || 0
                })
            }(0, kt.toArray)(Xt(f)).forEach(function(e) {
                return n && n.appendChild(e)
            })
        } else d && e.peer === t.peerId && !s.inplaceSearch && (0, yt.isOut)(t) && qe(e, n, t.peerId), un("_im_stack_messages", u).appendChild(Wt(l));
        return (0, yt.isOut)(t) && !i && setTimeout(function() {
            var e = un("_im_mess_" + t.messageId, n);
            fn(e, Pt) && dn(e, "im-mess_sending")
        }, 500), o = o.filter(function(e) {
            return e.rid !== t.randomId
        }), y(n), w(o, e, n)
    }

    function w(e, t, n) {
        var r = void 0;
        return r = "object" === ("undefined" == typeof e ? "undefined" : ft(e)) ? e : t.imQueue(e, !1), r.length > 0 && r.map(function(e) {
            return e.mess.failed = !!e.failed, e.mess
        }).filter(function(e) {
            return (0, pt.getMessage)(t, e.peerId, e.messageId)
        }).forEach(function(e) {
            return C(t, e, n, !1)
        }), n
    }

    function E(e) {
        var t = un("_im_mess_blind_unread_marker", e);
        t && (t.removeAttribute("aria-label"), t.removeAttribute("role"), t.removeAttribute("tabindex"))
    }

    function k(e, t, n) {
        var r = e.tabs[t];
        return (0, kt.toArray)(ln("_im_mess_unread", n)).forEach(function(e) {
            var t = Jt(on(e, "msgid"));
            t > 0 && r.out_up_to >= t && (gn(e, "_im_mess_unread"), gn(e, "im-mess_unread"), E(e))
        }), n
    }

    function T(e, t, n) {
        var r = un("_im_msg_media" + t.messageId, e);
        return r && (r.innerHTML = n.tabs[t.peerId].mediacontent[t.messageId][0]), e
    }

    function S(e, t) {
        if (!(0, pt.isFullyLoadedTab)(t, e.peerId)) return 0;
        var n = t.tabs[e.peerId];
        return n.msgs[e.messageId] ? 1 : n.msgs["rid" + e.randomId] ? 2 : 0
    }

    function I(e) {
        return 0 == e ? !0 : !1
    }

    function M(e) {
        return e > 0 && 2e9 > e
    }

    function P(e) {
        return e > 2e9
    }

    function L(e) {
        return -2e9 > e
    }

    function A(e, t) {
        return e === t.peer
    }

    function O(e, t) {
        return e.tabs[t] ? !0 : !1
    }

    function D(e, t) {
        return O(e, t) ? null !== e.tabs[t].lastmsg : !1
    }

    function x(e, t) {
        return 1e3 * e + 1e3 * t.timeshift
    }

    function R(e, t, n, r, a) {
        if ((0, yt.getUserId)(t) !== (0, yt.getUserId)(n)) return !0;
        var i = x(t.date, r),
            s = x(n.date, r);
        return Sn(i, s) ? (0, pt.isCommunityInterface)(r) && Jt(t.kludges.from_admin) !== Jt(n.kludges.from_admin) ? !0 : n.date - t.date > 300 ? !0 : le(t) || le(n) ? !0 : (0, yt.isGift)(t) || (0, yt.isGift)(n) ? !0 : (0, yt.isGraffiti)(t) || (0, yt.isGraffiti)(n) ? !0 : (0, yt.isUnread)(e, t) === (0, yt.isUnread)(e, n) || !a || (0, yt.isOut)(n) || me(n.peerId, r.gid) ? !1 : !0 : !0
    }

    function B(e, t) {
        return Cn(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !0)
    }

    function N(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = Math.round(1e9 * Math.random()).toString(16),
            a = {},
            i = 0;
        return e = (0, Ct.replaceHyperLinks)(e || "", Ct.linksReplacer.bind(null, n)), e = e.replace(/(<a.+?<\/a>)/gi, function(e) {
            var t = "!link_" + i + "_" + r + "!";
            return a[t] = e, i++, t
        }), e = (0, Ct.replaceMentions)(e), e = (0, Ct.replaceEmailLinks)(e), Object.keys(a).forEach(function(t) {
            e = e.replace(t, function() {
                return a[t]
            })
        }), t.emoji && (e = Nn.emojiToHTML(e, !0)), Un && (e = Un(e)), e
    }

    function F(e) {
        return P(e) ? "c" + (e - 2e9) : L(e) ? "e" + Math.abs(e + 2e9) : e
    }

    function j(e) {
        var t = e.substr(0, 1);
        switch (t) {
            case "e":
                return -2e9 - Jt(e.substr(1));
            case "c":
                return 2e9 + Jt(e.substr(1));
            default:
                return Jt(e)
        }
    }

    function H(e) {
        return e > 9999999 ? Math.floor(e / 1e6) + "M" : e > 9999 ? Math.floor(e / 1e3) + "K" : e > 0 ? e.toString() : ""
    }

    function U(e) {
        return {
            search: {
                name: bn("mail_im_peer_search"),
                icon: "search"
            },
            block_community: {
                icon: "block",
                name: bn("mail_block_comm_messages")
            },
            allow_community: {
                icon: "unblock",
                name: bn("mail_allow_comm_messages")
            },
            clear: {
                name: bn(e.peer < -2e9 ? "mail_im_delete_email_contact" : "mail_im_delete_all_history"),
                icon: "clear"
            },
            chat: {
                name: bn("mail_im_create_chat_with"),
                icon: "invite"
            },
            mute: {
                name: bn("mail_im_mute"),
                icon: "mute"
            },
            unmute: {
                name: bn("mail_im_unmute"),
                icon: "unmute"
            },
            photos: {
                name: bn(e.gid ? "mail_im_show_media_history_group" : "mail_im_show_media_history"),
                icon: "media"
            },
            avatar: {
                icon: "avatar",
                name: bn("mail_update_photo_red")
            },
            block: {
                icon: "block",
                name: bn("mail_block_user")
            },
            invite: {
                icon: "invite",
                name: bn("mail_im_create_chat_with")
            },
            invite_link: {
                icon: "invite-link",
                name: bn("mail_chat_invite_link")
            },
            leave: {
                icon: "leave",
                name: bn("mail_leave_chat")
            },
            topic: {
                icon: "topic",
                name: bn("mail_change_topic")
            },
            "return": {
                icon: "return",
                name: bn("mail_return_to_chat")
            },
            pin_hide: {
                icon: "pin_hide",
                name: bn("mail_menu_pin_hide")
            },
            pin_unhide: {
                icon: "pin_unhide",
                name: bn("mail_menu_pin_show")
            },
            unpin: {
                icon: "unpin",
                name: bn("mail_menu_unpin")
            }
        }
    }

    function G(e, t) {
        var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter dialogs_inline_chatter_half"/>';
        return t && (n = vn("im_dialogs_link", {
            href: t,
            photo: n
        })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter dialogs_inline_chatter_half">\n      ' + n + "\n    </div>\n  </div>"
    }

    function q(e, t) {
        var n = '<img src="' + e + '" alt="" class="dialogs_inline_chatter"/>';
        return t && (n = vn("im_dialogs_link", {
            href: t,
            photo: n
        })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter">\n      ' + n + "\n    </div>\n  </div>"
    }

    function z(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        if ("string" == typeof e) return '<div class="im_grid"><img src="' + e + '" alt=""/></div>';
        switch (e.length) {
            case 1:
                return '<div class="im_grid"><img src="' + e[0] + '" alt=""/></div>';
            case 2:
                return e.map(function(e, n) {
                    return G(e, t[n])
                }).join("");
            case 3:
                return G(e[0], t[0]) + e.slice(1).map(function(e, n) {
                    return q(e, t[n + 1])
                }).join("");
            case 4:
                return e.map(function(e, n) {
                    return q(e, t[n])
                }).join("")
        }
    }

    function V(e, t, n) {
        if ("string" == typeof t.photo && t.photo) return '<div class="im_grid"><img src="' + t.photo + '" alt=""></div>';
        if (P(t.peerId) && t.membersCount < 2) return '<div class="im_grid"><img src="' + e.get().default_chat_photo + '" alt=""></div>';
        if (Array.isArray(t.photo)) return z(t.photo);
        var r = t.data.active.slice(0, 4).map(Tt.oCacheGet.bind(null, e)),
            a = r.map(function(e) {
                return e.photo
            }),
            i = n ? [] : r.map(function(e) {
                return e.link
            });
        return z(a, i)
    }

    function K(e) {
        var t = bn(e.get().gid ? "mail_search_only_messages_comm" : "mail_search_only_messages");
        return '<li class="im-page--mess-search-w">\n    <div class="im-page--mess-search ' + qt + '">\n      <button type="button" class="im-i--messages-search"></button>' + t + "\n    </div>\n  </li>"
    }

    function W() {
        return '<li class="im-search-results-head">' + bn("mail_search_messages") + "</li>"
    }

    function Y() {
        return '<li class="im-search-results-head">' + bn("mail_search_conversations_sep") + "</li>"
    }

    function Q() {
        return '<li class="im-search-results-head">' + bn("mail_search_dialogs_sep") + "</li>"
    }

    function X() {
        return '<li class="im-search-results-head _im_recent_bar">\n    ' + bn("mail_recent_searches") + '\n    <button type="button" class="' + Gt + ' im-page--clear-recent">' + bn("mail_clear_recent") + "</button>\n  </li>"
    }

    function $(e) {
        var t = e.get().popular_sugg,
            n = (0, pt.isClassicInterface)(e) ? 8 : 5;
        return t.length > n && (t = t.slice(0, n)), '<li class="im-popular clear_fix">' + t.map(function(t) {
            var n = t.peerId,
                r = (0, Tt.oCacheGet)(e, n) || t,
                a = e.get().tabs[n] || t,
                i = (e.get().mutedPeers || []).indexOf(n) >= 0,
                s = ["im-popular--item", "fl_l", "_im_dialog", "_dont_add_recent", "_im_sugg_" + n, a.unread > 0 && "sugg-is_unread", i && "sugg-is_muted"].filter(function(e) {
                    return !!e
                }).join(" ");
            return '<div class="' + s + '" data-peer="' + n + '">\n    <a class="im-popular--avatar-w ' + Rn(a.online) + '" href="' + r.link + '"><img class="im-popular--avatar" src="' + r.photo + '"/></a>\n    <div class="im-popular--name-w"><a class="im-popular--name" href="' + r.link + '">' + (r.first_name || r.name) + '</a></div>\n    <span class="im-popular--unread _sugg_unread_ct">' + H(a.unread) + "</span>\n</div>"
        }).join("") + "</li>"
    }

    function J(e, t, n) {
        var r = un("_im_mess_" + t.messageId, n);
        if (r) {
            pn(r, "aria-hidden", "false"), dn(r, "im-mess_failed " + Lt);
            var a = un("_im_mess_marker", r);
            pn(a, "aria-label", bn("mail_send_message_error")), pn(a, "role", "link")
        }
        return n
    }

    function Z(e, t, n) {
        var r = un("_im_mess_" + t, n);
        if (r) {
            gn(r, "im-mess_failed"), pn(r, "aria-hidden", "true"), gn(r, Lt);
            var a = un("_im_mess_marker", r);
            pn(a, "aria-label", ""), pn(a, "role", "")
        }
        return n
    }

    function ee(e, t) {
        var n = e.map(function(e) {
            return un("_im_mess_" + e, t)
        }).filter(function(e) {
            return e
        });
        return te(n, t)
    }

    function te(e, t) {
        var n = e.filter(function(e) {
            return !fn(e, "im-mess_srv")
        }).map(function(e) {
            return e.parentNode
        });
        return e.forEach(function(e) {
            return e.parentNode.removeChild(e)
        }), n.filter(function(e) {
            return 0 === an(e).length
        }).map(function(e) {
            return cn("_im_mess_stack", e)
        }).forEach(function(e) {
            fn(nn(e), "_im_bar_date") && Yt(nn(e)), fn(nn(e), "_im_unread_bar_row") && Yt(nn(e)), Yt(e)
        }), t
    }

    function ne(e, t, n, r) {
        return e.map(function(e) {
            return un("_im_mess_" + e, r)
        }).filter(function(e) {
            return e
        }).forEach(function(e) {
            hn(e, se(t, e, n)), dn(e, "im-mess_light")
        }), r
    }

    function re(e, t, n) {
        var r = un("_im_mess_" + e, n);
        if (r) {
            var a = un(At, r);
            hn(r, a.innerHTML), gn(r, "im-mess_light")
        }
        return n
    }

    function ae(e, t, n, r) {
        var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2,
            i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !1;
        if (i) return ie(e, t, n, r, !0, a);
        var s = ((0, pt.isClassicInterface)(r), 60),
            o = ie(e, t, n, r, !1, a);
        return o.length > s ? ie(e, t, n, r, !0, a) : o
    }

    function ie(e, t, n, r, i, s) {
        var o = [],
            l = Object.keys(e || {}).sort(function(t, n) {
                return e[n] - e[t]
            }).filter(function(e) {
                var t = (0, Tt.oCacheExists)(r, e);
                return t || o.push(e), t
            });
        if (o.length && (0, Mt.loadChatMember)(a({}, t, o), r), 0 === l.length) return "";
        var u = M(t) || (0, pt.isCommunityPeer)(t) ? "first_name" : i ? "short_name" : "name";
        if (1 == l.length) {
            var c = n ? "" : (0, Tt.oCacheGet)(r, l[0])[u];
            return c + " " + bn("mail_typing")
        }
        var d = bn("mail_typing_several", l.length),
            g = l.slice(0, Math.min(l.length - 1, s)),
            m = g.map(function(e) {
                return (0, Tt.oCacheGet)(r, e)[u]
            }).join(", ");
        if (l.length > s + 1) m += " " + bn("mail_and_peer").replace("{count}", l.length - s).replace("{typing}", d);
        else {
            var f = (0, Tt.oCacheGet)(r, l[g.length])[u];
            m += " " + bn("mail_and_peer_one") + " " + f + " " + d
        }
        return m
    }

    function se(e, t, n) {
        var r = t.innerHTML,
            a = "delete" === n ? "mail_deleted_stop" : "mail_marked_as_spam";
        return '<div class="im-mess--text">\n    ' + bn(a) + ' <button type="button" data-peer="' + e + '" class="' + Ot + ' im-mess--btn">' + bn("mail_restore") + '</button>\n    <div class="' + At + ' im-mess--original">' + r + "</div>\n  </div>"
    }

    function oe() {
        return '<div class="im-page--chat-search-empty">\n    ' + bn("mail_im_search_empty") + "\n  </div>"
    }

    function le(e) {
        return e.kludges && "undefined" != typeof e.kludges.source_act
    }

    function ue(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
        return n ? '<a class="im_srv_lnk ' + r + '" target="_blank" href="' + e + '">' + t + "</a>" : '<span class="' + r + '">' + t + "</span>"
    }

    function ce(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
            a = t.kludges,
            i = a.source_act,
            s = Jt(a.source_mid),
            o = t.userId,
            l = (0, Tt.oCacheGet)(e, o),
            u = "",
            c = o === s;
        switch (i) {
            case Dt:
                u = "mail_im_chat_created";
                break;
            case xt:
                u = "mail_im_title_updated_dot";
                break;
            case Rt:
                u = c ? "mail_im_returned_to_chat" : "mail_im_invited";
                break;
            case Bt:
                u = c ? "mail_im_left" : "mail_im_kicked_from_chat";
                break;
            case Nt:
                u = "mail_im_photo_set";
                break;
            case Ft:
                u = "mail_im_photo_removed";
                break;
            case jt:
                u = a.source_message ? "mail_im_pin_message" : "mail_im_pin_message_empty2";
                break;
            case Ht:
                u = a.source_message ? "mail_im_unpin_message" : "mail_im_unpin_message_empty2";
                break;
            case Ut:
                u = "mail_im_invite_by_link";
                break;
            default:
                return "mail_no_support"
        }
        if (u = yn(l.sex, bn(u, "raw")), u = u.replace("{from}", ue(l.link, l.name, r)), s && s !== o) {
            var d = a.source_email;
            if (d) u = u.replace("{user}", ue("/im?email=" + encodeURIComponent(d), "email", r));
            else {
                var g = (0, Tt.oCacheGet)(e, s),
                    m = i === Bt ? g.inv_name : g.kick_name;
                u = u.replace("{user}", ue(g.link, m, r))
            }
        }
        if (a.source_text) {
            var f = a.source_old_text ? '«<b class="im_srv_lnk">' + a.source_old_text + "</b>» &rarr; " : "";
            u = u.replace("{title}", f + ('«<b class="im_srv_lnk">' + a.source_text + "</b>»"))
        }
        if (a.source_act === jt || a.source_act === Ht)
            if (a.source_message) {
                var p = ge(Nn.emojiToHTML(en(a.source_message.replace(/<br\s?\/?>/gi, " ")), !0)),
                    _ = ue("", p, !1, "im_srv_mess_link");
                u = u.replace("{msg}", _)
            } else u = u.replace(/{link}(.+){\/link}/i, function(e, t) {
                return ue("", t, !1, "im_srv_mess_link")
            });
        return u
    }

    function de(e, t, n, r) {
        if (t === Nt) {
            var a = un("_im_mess_" + e.messageId, r);
            if (a) {
                var i = n.tabs[e.peerId];
                a.parentNode.innerHTML = vn("im_msg_row", {
                    msg_id: e.messageId,
                    from_id: e.peerId,
                    text: ce(n, e, i) + n.chat_photo_msg,
                    ts: e.date,
                    cls: "im-mess_srv"
                })
            }
        }
        return r
    }

    function ge(e) {
        return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(bt.MENTION_RAW, "$1$4")
    }

    function me(e, t) {
        return t ? !1 : e === Vt.id
    }

    function fe(e, t) {
        return On(e, {
            url: (0, pt.isCommunityPeer)(t) ? "al_groups.php" : "al_profile.php",
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

    function pe(e) {
        return function(t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "bottom",
                r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                a = Wt(vn("im_preloader", {
                    preloader: Qt(Vt.pr_tpl, {
                        id: ""
                    }),
                    cls: ["bottom" === n ? "im-preloader_bottom" : "im-preloader_top", r].join(" ")
                })),
                i = !1;
            setTimeout(function() {
                i || ("bottom" === n ? e.appendChild(a) : e.insertBefore(a, tn(e)), dn(a, "im-preloader_visible"))
            }, 0), t.then(function() {
                i = !0, gn(a, "im-preloader_visible"), a.parentNode && a.parentNode.removeChild(a)
            })
        }
    }

    function _e(e, t) {
        return {
            0: {
                msgs: e.reduce(function(e, t) {
                    return e[t] = [t, ht.FLAG_IMPORTANT, 0, 0, "", "", {}, 0], e
                }, {}),
                hash: t,
                history: 1
            }
        }
    }

    function he(e, t) {
        if (!t && !e) return !1;
        var n = e.target || e.srcElement,
            r = zn,
            a = !1,
            i = /_im_mess|im_log_act|im_log_ract|_im_log_body|im_log_rspacer|_im_graffiti_w|_wall_post_cont/;
        do
            if (!n || n.onclick || n.onmousedown || "A" == n.tagName || fn(n, "_im_no_select") || fn(n, "im_msg_media_link") || "IMG" == n.tagName && !fn(n, "_im_graffiti") && !fn(n, "emoji") && !fn(n, "emoji_css") && !fn(n, "im_gift") || "TEXTAREA" == n.tagName || fn(n, "play_new") || fn(n, "videoplayer") || (a = i.test(n.className))) break; while (r-- && (n = n.parentNode));
        return a ? !!Zt(ve()) : !0
    }

    function ve() {
        var e = window.getSelection && window.getSelection() || document.getSelection && document.getSelection();
        return (e || "").toString()
    }

    function be(e, t) {
        return '<div class="im-mess--text">\n      <span>' + bn("mail_restored") + '</span>\n      <a class="_im_go_to" href="/im?sel=' + F(e) + "&msgid=" + t + '">' + bn("mail_im_goto_conversation") + "</a>\n    </div>"
    }

    function ye(e, t) {
        var n = bn(P(e) ? "mail_chat_sure_to_delete_all" : (0, pt.isCommunityPeer)(e) ? "mail_group_sure_to_delete_all" : "mail_sure_to_delete_all");
        return Ln(bn("mail_deleteall1"), n, bn("mail_delete"), t, bn("global_cancel"))
    }

    function Ce(e) {
        return Ln(bn("mail_unpin_title"), bn("mail_unpin_text"), bn("mail_unpin"), e, bn("global_cancel"))
    }

    function we(e, t, n) {
        var r = bn("mail_dialog_msg_delete_N", t),
            a = Ln(bn("mail_dialog_msg_delete_title"), r, bn("mail_delete"), function() {
                return n(isChecked(un("_check_forall")))
            }, bn("global_cancel")),
            i = '<div class="checkbox im-delete-forall-checkbox _check_forall" onclick="checkbox(this);" role="checkbox" aria-checked="false">' + bn("mail_delete_for_all") + "</div>",
            s = cur.imDb.selectByKey("del_forall_checked");
        return a.setControlsText(i), s && checkbox(un("_check_forall")), a
    }

    function Ee(e, t, n, r, a) {
        t.showProgress(), e.set(r.bind(null, a)).then(function() {
            t.hideProgress(), t.hide(), n().removePeer(e, a), n().updateDialogFilters(e)
        })
    }

    function ke(e, t, n, r, a) {
        var i = e.get().peer;
        Hn(r), Pn("al_im.php", {
            act: "a_show_members_box",
            chat: i - 2e9
        }, {
            stat: ["boxes.css"],
            params: {
                dark: 1
            },
            onDone: function(r, a) {
                var i = (0, Et.createModule)({
                    handlers: function(a, s) {
                        s(r.bodyNode.parentNode, "click", "_im_invite_box", function() {
                            r.hide(), Te(e, e.get().peer, t, n), (0, Et.destroyModule)(i)
                        }), s(r.bodyNode.parentNode, "mouseover", "im_status_mob_onl", function(e, t) {
                            var n = un("_im_chat_members_w", r.bodyNode.parentNode),
                                a = 160,
                                i = cn("_im_member_item", t),
                                s = i.offsetTop - n.scrollTop + a,
                                o = s > 370;
                            Dn(t, {
                                was: Jt(on(t, "was")),
                                mid: Jt(on(t, "peer")),
                                vk_mobile: Jt(on(t, "vk_mobile")),
                                forcetoup: o
                            })
                        })
                    }
                })
            }
        }, r)
    }

    function Te(e, t, n, r) {
        var a = e.get().tabs[t],
            i = a.memberIds;
        e.set(r.bind(null, "add_member", i)).then(n().showCreation)
    }

    function Se(e, t, n) {
        if (e.get().active_tab === bt.FOLDER_ALL && 0 === e.get().unread_cnt) return !1;
        var r = e.get().active_tab === bt.FOLDER_ALL ? bt.FOLDER_UNREAD : bt.FOLDER_ALL;
        return e.set(n.bind(null, r)).then(function(e) {
            t().restoreDialogs(e, !0)
        })
    }

    function Ie(e, t, n, r) {
        if (t.get().active_tab === e) return Promise.resolve(t);
        var a = (0, pt.isReversedDialogs)(t);
        return t.set(r.bind(null, e)).then(function(e) {
            return n().restoreDialogs(e, !0, a !== (0, pt.isReversedDialogs)(e)), e
        })
    }

    function Me(e, t) {
        "undefined" == typeof t && (t = e.get().peer);
        var n = e.get().tabs[t];
        return bt.FOLDER_MASKS[bt.FOLDER_IMPORTANT] & n.folders
    }

    function Pe(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
        if ("undefined" == typeof t && (t = e.get().peer), !(0, pt.isFoldersAvailable)(e)) return !1;
        var r = n || e.get().tabs[t];
        return bt.FOLDER_MASKS[bt.FOLDER_UNRESPOND] & r.folders
    }

    function Le(e, t) {
        return (t.get().block_states[e] || {}).free === !1
    }

    function Ae(e) {
        return null != e.get().pendingForward
    }

    function Oe(e, t) {
        return (t.get().block_states[e] || {}).who === Vt.id
    }

    function De(e, t) {
        var n = e.get().block_states;
        Object.keys(n).forEach(function(r) {
            n[r].time ? n[r].free === !1 && Date.now() - n[r].time >= 5e4 && t.push([ht.mutexEvent([, 1, "gim" + e.get().gid, r, 0, ""])]) : n[r].time = Date.now()
        })
    }

    function xe(e, t, n) {
        var r = void 0;
        return !An("al_im.php", {
            act: "a_spam",
            offset: "0",
            gid: e.get().gid
        }, {
            onDone: function(n, a) {
                a && (r = t(n, e, a))
            },
            params: {
                width: 638,
                onHide: function() {
                    Bn.loaded && Bn.detachPlayer(!0), r.unmount()
                }
            }
        }, n)
    }

    function Re(e, t) {
        var n = (0, pt.getTab)(e, t).last_seen;
        if (n[0]) return 2 === n[2] ? '<span class="is_vk_mobile is_online">' + bn("mail_header_online_status") + Be(t, !1, !0) + "</span>" : "online" + (xn[n[0]] ? Be(t) : "");
        if (!n[1]) return "";
        var r = En(n[1], e.get().timeshift),
            a = yn((0, Tt.oCacheGet)(e, t).sex, bn("mail_last_activity_tip", "raw")).replace("{user}", "").replace("{time}", r);
        return 2 === n[2] ? a += Be(t, !1, !0) : n[2] && (a += Be(t, !1)), a
    }

    function Be(e, t, n) {
        var r = n ? "" : 'onclick="mobilePromo();"',
            a = n ? ", vk_mobile: 1" : "",
            i = n ? " vk_mobile" : "";
        return vn("im_wrap_mobile", {
            "class": "im_status_mob_onl" + i,
            params: "mid: " + e + ", was: 1," + (t ? "forcetoup: true" : "forcetodown: true") + a,
            attrs: r
        })
    }

    function Ne(e, t) {
        var n = t.get().tabs[e];
        return Pn("al_settings.php", {
            act: "blacklist_box",
            q: n.href
        }, {
            stat: ["settings.js", "settings.css"],
            dark: 1
        })
    }

    function Fe(e, t) {
        return Pn("groupsedit.php", {
            act: "bl_edit",
            name: "/id" + e,
            gid: t.get().gid
        }, {
            stat: ["page.css", "ui_controls.js", "ui_controls.css"],
            dark: 1
        })
    }

    function je(e) {
        return e.get().gid ? "/gim" + e.get().gid : "/im"
    }

    function He(e, t, n, r) {
        var a = void 0,
            i = An("al_im.php", {
                act: "a_important",
                offset: "0"
            }, {
                onDone: function(r, i) {
                    i && (a = n(r, e, t, i))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Bn.loaded && Bn.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        a && a.unmount()
                    }
                }
            }, r);
        nt(i, e)
    }

    function Ue() {
        var e = document.activeElement;
        return null === e ? !1 : "INPUT" === e.tagName || "TEXTAREA" === e.tagName || e.getAttribute("contenteditable")
    }

    function Ge(e, t, n) {
        var r = un("_im_mess_" + e, n);
        return r && mn(r, "im-mess_fav", t), n
    }

    function qe(e, t, n) {
        var r = un("_im_unread_bar_row", t);
        if (!r) return t;
        var a = sn(r, "._im_mess_stack", -1),
            i = sn(r, "._im_mess_stack"),
            s = a ? ln("_im_mess", a).pop() : null,
            o = i ? un("_im_mess", i) : null;
        if (Yt(r), _(t), !o || !s) return t;
        var l = on(s, "msgid"),
            u = on(o, "msgid"),
            c = (0, pt.getMessage)(e, n, l),
            d = (0, pt.getMessage)(e, n, u);
        if (R(e.tabs[n], c, d, e)) return t;
        var g = un("_im_stack_messages", a),
            m = un("_im_stack_messages", i).children;
        return (0, kt.toArray)(m).forEach(function(e) {
            Yt(e), g.appendChild(e)
        }), Yt(i), t
    }

    function ze(e, t, n) {
        var r = (0, pt.getFirstUnread)(e, e.get().peer);
        if (!r) return [!1, 0];
        var a = un("_im_mess_" + r, t);
        if (!a) {
            var i = (0, pt.getLastMessage)(e, e.get().peer, r);
            if (!i) return [!0, 0];
            a = un("_im_mess_" + i.messageId, t)
        }
        var s = fn(a, "_im_mess_srv") ? a : cn("_im_mess_stack", a);
        if (!s) return [!0, 0];
        var o = a ? a.offsetTop : 0,
            l = s.offsetTop + o,
            u = n.contHeight();
        return l <= n.scrollTop() + n.getScrollHeight() ? [!0, 0] : [!1, Math.max(0, u - l)]
    }

    function Ve(e, t, n) {
        Hn(t);
        var r = cn("_im_top_notice", n);
        jn(r, 200, Yt.pbind(r));
        var a = cn("_im_page_dialogs", r);
        a && fn(a, "im-page--dialogs-notice") && gn(a, "im-page--dialogs-notice"), Mn.post("al_im.php", {
            act: "a_hide_top_notice",
            type: r.getAttribute("data-type"),
            hash: r.getAttribute("data-hash")
        })
    }

    function Ke(e, t, n) {
        Hn(t);
        var r = cn("_im_aside_notice", n);
        Fn(r, 200, Yt.pbind(r)), Mn.post("al_im.php", {
            act: "a_hide_top_notice",
            type: r.getAttribute("data-type"),
            hash: r.getAttribute("data-hash")
        })
    }

    function We(e, t, n, r, a) {
        return n = n.replace(/\<br\s*\/?\>(\n)?/gi, " ").replace(/[\n\r]/gi, " "), n = (0, Ct.replaceMentions)(n, function(e, t, n, r, a) {
            return a
        }), r && (n = Nn.emojiToHTML(n, !0)), t && "..." !== t.trim() && !P(e) && (n = vn("im_topic", {
            topic: t,
            cls: "im-topic_dialog"
        }) + n), !n && a.length > 0 && (n = vn("im_dialog_media", {
            name: $e(a[0], a)
        })), n
    }

    function Ye(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
            n = e.split("_"),
            r = mt(n, 2),
            a = r[0],
            i = r[1];
        return [a, i, t]
    }

    function Qe(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
        if (r > 50) return [
            [], e.length
        ];
        for (var a = [], i = ""; n < e.length;) {
            var s = e[n];
            if ("id" === s) i = t[n];
            else if ("," === s && i) a.push(Ye(i)), i = "";
            else if ("(" === s) {
                var o = Qe(e, t, n + 1, r + 1),
                    l = mt(o, 2),
                    u = l[0],
                    c = l[1];
                n = c, a.push(Ye(i, u)), i = ""
            } else if (")" === s) return "" !== i && a.push(Ye(i)), [a, n];
            n++
        }
        return i && a.push(Ye(i)), [a, n]
    }

    function Xe(e) {
        if (Kn[e]) return Kn[e];
        for (var t = e ? e.length : 0, n = [], r = [], a = "", i = 0; t > i; i++) {
            var s = e[i],
                o = s.charCodeAt(0);
            o >= 48 && 57 >= o || "_" === s || "-" === s ? a += s : ("(" === s || ")" === s || ":" === s || "," === s) && ("" !== a && (r.push(a), n.push("id"), a = ""), r.push(s), n.push(s))
        }
        a.length > 0 && (r.push(a), n.push("id"));
        var l = Qe(n, r),
            u = mt(l, 1),
            c = u[0];
        return Object.keys(Kn).length > 300 && (Kn = {}), Kn[e] = c, c
    }

    function $e(e, t) {
        var n = {
            photo: bn("mail_added_photos", "raw"),
            video: bn("mail_added_videos", "raw"),
            audio: bn("mail_added_audios", "raw")
        };
        switch (e.type) {
            case "mail":
                return wn(e.object.fwd_count, bn("mail_fwd_msgs", "raw"), !0);
            case "photo":
            case "video":
            case "audio":
                var r = t.filter(function(t) {
                    return t.type === e.type
                }).length;
                return wn(r, n[e.type], !0);
            case "audio_playlist":
                return bn("mail_added_audio_playlist");
            case "doc":
                switch (e.kind) {
                    case "graffiti":
                        return bn("mail_added_graffiti");
                    case "audiomsg":
                        return bn("mail_added_audiomsg");
                    default:
                        return bn("mail_added_docs")
                }
            case "geo":
            case "map":
                return bn("mail_added_geo");
            case "wall":
                return bn("mail_added_wall");
            case "wall_reply":
                return bn("mail_added_wall_reply");
            case "gift":
                return bn("mail_added_gift");
            case "link":
            case "share":
                return bn("mail_added_link");
            case "sticker":
                return bn("mail_added_sticker");
            case "market":
                return bn("mail_added_market_item");
            case "money_transfer":
                return bn("mail_added_money_transfer");
            case "money_request":
                return bn("mail_added_money_request");
            case "story":
                return bn("mail_added_story");
            case "mask":
                return bn("mail_added_mask");
            case "article":
                return bn("mail_added_article")
        }
        return ""
    }

    function Je(e) {
        dn(e, "im-send-btn_loading")
    }

    function Ze(e) {
        gn(e, "im-send-btn_loading")
    }

    function et(e) {
        var t = e.get(),
            n = (0, pt.getPinnedMessage)(e);
        if (!n || !(0, St.isPinnedMessageVisibleInTab)(e, (0, pt.getPeer)(e))) return "";
        var r = (0, Tt.oCacheGet)(e, n.userId);
        if (!r) return "";
        var a = n.text;
        a = !a && n.attaches.length ? vn("im_pinned_message_media", {
            text: $e(n.attaches[0], n.attaches)
        }) : N(a, n && n.kludges || {}) || "", a = a.replace(/<br\s?\/?>/gi, " ");
        var i = vn("im_pinned_message", {
            date: kn(n.date, t.timeshift),
            content: a,
            link: r.link,
            name: r.name
        });
        return i
    }

    function tt(e, t, n) {
        var r = +n.getAttribute("data-time");
        r && On(n, {
            text: kn(r, e.get().timeshift),
            className: "_im_history_tooltip",
            appendParentCls: "_im_mess_stack",
            black: 1,
            shift: [0, 4]
        })
    }

    function nt(e, t) {
        e.bodyNode.addEventListener("mouseover", function(e) {
            fn(e.target, "_im_edit_time") && tt(t, e, e.target)
        })
    }

    function rt(e, t, n, r, a) {
        var i = e.get(),
            s = void 0,
            o = An("al_im.php", {
                act: "a_get_pinned_message_box",
                chat: n,
                hash: i.tabs[n].hash
            }, {
                onDone: function(n, a) {
                    a && (s = r(n, e, t, a))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Bn.loaded && Bn.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        s && s.unmount()
                    }
                }
            }, a);
        nt(o, e)
    }

    function at(e, t) {
        return P(e.peerId) && e.memberIds ? e.memberIds.indexOf(t) >= 0 : !1
    }

    function it(e) {
        return !P(e.peerId) || e.data.kicked ? 0 : e.membersCount
    }

    function st(e, t) {
        var n = (0, Tt.oCacheGet)(e, t.peerId),
            r = (0, pt.getTab)(e, t.peerId) || {};
        return n && (t.photo = t.photo || n.photo, t.name = t.name || n.name, t.href = t.link || n.link, t.sex = t.sex || n.sex), t.last_touched = r.last_touched || 0, t.verified = !!t.verified, t.lastmsg = t.lastmsg || t.lastmsg_meta && t.lastmsg_meta[0] || !1, t.folders = t.folders || null, t.unread = t.unread || 0, t.last_seen = t.last_seen || [0, 0, 0], t.online = t.last_seen && t.last_seen[0] || 0, t.out_up_to = null != t.out_up_to ? t.out_up_to : t.in_up_to || 0, P(t.peerId) && (t.memberIds = t.memberIds || r.memberIds || null), t
    }

    function ot(e, t) {
        for (var n in t) t.hasOwnProperty(n) && st(e, t[n])
    }

    function lt(e, t) {
        var n = [],
            r = t.find(function(e) {
                return "mail" === e[0]
            }),
            a = r ? r[1].split(";") : [];
        for (a.length > qn && (r[1] = a.slice(0, qn).join(";")); e.length > Gn;) {
            var i = e.substr(0, Gn).lastIndexOf(" "); - 1 == i && (i = Gn), n.push({
                msgText: Zt(e.substr(0, i))
            }), e = Zt(e.substr(i))
        }
        for (e.length && n.push({
                msgText: e,
                attaches: t
            }), n.length || n.push({
                attaches: t
            }), a = a.slice(qn); a.length; a = a.slice(qn)) n.push({
            attaches: [
                ["mail", a.slice(0, qn).join(";")]
            ]
        });
        return n
    }

    function ut(e) {
        return e.length > Gn
    }

    function ct(e, t, n) {
        var r = !1;
        Pn("al_im.php", {
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
                    return Ln(bn("global_error"), e)
                }, 0), !0
            },
            onDone: function(t, n) {
                r = (0, wt.mount)(t.bodyNode, e)
            }
        }, {})
    }

    function dt() {
        Ln(bn("global_error"), bn("mail_message_wait_until_uploaded"))
    }

    function gt(e, t) {
        var n = (0, pt.getTab)(e, t.peerId) || {};
        if (!t || !(0, yt.isOut)(t)) return !1;
        if (333 == t.peerId) return !1;
        if (Date.now() / 1e3 - t.date > 86400) return !1;
        if (c(e, t.peerId, t.messageId)) return !1;
        if (P(t.peerId)) {
            if (n.data.kicked || n.data.closed) return !1
        } else if (n.block_error > 0) return !1;
        return !0
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.MESSAGE_SEARCH_CLASS = t.CLEAR_RECENT_CLASS = t.HIDE_ASIDE_NOTICE_CLASS = t.HIDE_TOP_NOTICE_CLASS = t.SHOW_CHAT_MEMBERS_CLASS = t.DESELECT_ALL_CLASS = t.CHAT_INVITE_BY_LINK = t.CHAT_UNPIN_MESSAGE = t.CHAT_PIN_MESSAGE = t.CHAT_PHOTO_REMOVE = t.CHAT_PHOTO_UPDATE = t.CHAT_KICK_USER = t.CHAT_INVITE_USER = t.CHAT_TITLE_ACTION = t.CREATE_CHAT_ACTION = t.TYPING_CLASS = t.RESTORE_CLASS = t.ORIGINAL_CLASS = t.FAILED_CLASS = t.SENDING_CLASS = void 0;
    var mt = function() {
            function e(e, t) {
                var n = [],
                    r = !0,
                    a = !1,
                    i = void 0;
                try {
                    for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
                } catch (l) {
                    a = !0, i = l
                } finally {
                    try {
                        !r && o["return"] && o["return"]()
                    } finally {
                        if (a) throw i
                    }
                }
                return n
            }
            return function(t, n) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        ft = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        pt = n(139);
    Object.keys(pt).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
            enumerable: !0,
            get: function() {
                return pt[e]
            }
        })
    }), t.getClassicChatHeight = i, t.setClassicChatHeight = s, t.fixTableCellChildHeight = o, t.applyInnerHtml = l, t.renderSticker = u, t.isAlreadyDeleted = c, t.replaceMessageAttrs = d, t.isVoiceMessageAvailable = g, t.getAvailableMicrophones = m, t.renderAttach = f, t.dayFromVal = p, t.showInvisibleBar = _, t.editAndReplaceMessage = h, t.renderMessage = v, t.renderMessageMedia = b, t.ensureDomHasActions = y, t.appendToHistory = C, t.restoreQueue = w, t.markMessagesAsRead = k, t.replaceAttaches = T, t.isDuplicate = S, t.isReservedPeer = I, t.isUserPeer = M, t.isChatPeer = P, t.isPeerActive = A, t.isTabLoaded = O, t.isTabLoadedWithMessage = D, t.parseMessage = N, t.convertPeerToUrl = F, t.unUrlPeer = j, t.simplifyCounter = H, t.chatActions = U, t.renderPhotos = z, t.renderPhotosFromTab = V, t.renderBtnSearchOnlyMessages = K, t.renderMessagesSep = W, t.renderConversationsSep = Y, t.renderPopularSuggSep = Q, t.renderClearRecent = X, t.renderPopularSuggestions = $, t.setMessageError = J, t.startResendMessage = Z, t.removeMessages = ee, t.removeMessagesWithRestore = ne, t.restoreMessage = re, t.formatTyper = ae, t.formatTyperHelper = ie, t.renderEmptySearch = oe, t.isServiceMsg = le, t.serviceLink = ue, t.renderServiceMsg = ce, t.addChatPhotoToUpdate = de, t.replaceSpecialSymbols = ge, t.isSelfMessage = me, t.showVerifiedTooltip = fe, t.wrapLoading = pe, t.tabFromIds = _e, t.checkSelectClick = he, t.renderGoTo = be, t.showFlushDialog = ye, t.showUnpinDialog = Ce, t.showMsgDeleteDialog = we, t.cleanHistory = Ee, t.showChatMembers = ke, t.inviteUser = Te, t.showUnreadOnly = Se, t.changeTab = Ie, t.isImportant = Me, t.isUnrespond = Pe, t.isPeerBlocked = Le, t.isPendingForward = Ae, t.isPeerBlockedByMe = Oe, t.blockLatencyCompensation = De, t.showSpamLayer = xe, t.getLastSeenTextInHeader = Re, t.getMobileIcon = Be, t.showBlacklistBoxUser = Ne, t.showBlacklistBox = Fe, t.getBaseLink = je, t.showFavvedBox = He, t.isEditableFocused = Ue, t.updateStar = Ge, t.removewNewUnreadBarAndMerge = qe, t.isMessagesVisible = ze, t.hideTopNotice = Ve, t.hideAsideNotice = Ke, t.renderShortText = We, t.parseFwd = Xe, t.attachToText = $e, t.lockButton = Je, t.unlockButton = Ze, t.renderPinnedMessage = et, t.showEditTimeTooltip = tt, t.boxHandleEditTimeTooltips = nt, t.showPinnedBox = rt, t.isUserAliveInChat = at, t.getAliveMembersCount = it, t.normalizeTab = st, t.normalizeTabsGotFromServer = ot, t.splitMessageToParts = lt, t.isMessageTooLong = ut, t.showInvitationBox = ct, t.showWaitUntilUploadedBox = dt, t.canMessageBeDeletedForAll = gt;
    var _t = n(132),
        ht = r(_t),
        vt = n(5),
        bt = r(vt),
        yt = n(8),
        Ct = n(7),
        wt = n(69),
        Et = n(83),
        kt = n(36),
        Tt = n(66),
        St = n(121),
        It = n(135),
        Mt = n(46),
        Pt = t.SENDING_CLASS = "_im_mess_sending",
        Lt = t.FAILED_CLASS = "_im_mess_failed",
        At = t.ORIGINAL_CLASS = "_im_mess_original",
        Ot = t.RESTORE_CLASS = "_im_mess_restore",
        Dt = (t.TYPING_CLASS = "_im_typing", t.CREATE_CHAT_ACTION = "chat_create"),
        xt = t.CHAT_TITLE_ACTION = "chat_title_update",
        Rt = t.CHAT_INVITE_USER = "chat_invite_user",
        Bt = t.CHAT_KICK_USER = "chat_kick_user",
        Nt = t.CHAT_PHOTO_UPDATE = "chat_photo_update",
        Ft = t.CHAT_PHOTO_REMOVE = "chat_photo_remove",
        jt = t.CHAT_PIN_MESSAGE = "chat_pin_message",
        Ht = t.CHAT_UNPIN_MESSAGE = "chat_unpin_message",
        Ut = t.CHAT_INVITE_BY_LINK = "chat_invite_user_by_link",
        Gt = (t.DESELECT_ALL_CLASS = "_im_deselect_all", t.SHOW_CHAT_MEMBERS_CLASS = "_im_show_chat_mems", t.HIDE_TOP_NOTICE_CLASS = "_im_top_notice_hide", t.HIDE_ASIDE_NOTICE_CLASS = "_im_aside_notice_hide", t.CLEAR_RECENT_CLASS = "_im_clear_recent"),
        qt = t.MESSAGE_SEARCH_CLASS = "_im_mess_search",
        zt = window,
        Vt = zt.vk,
        Kt = zt.ls,
        Wt = zt.se,
        Yt = zt.re,
        Qt = zt.rs,
        Xt = zt.sech,
        $t = zt.inArray,
        Jt = zt.intval,
        Zt = zt.trim,
        en = zt.stripHTML,
        tn = zt.domFC,
        nn = zt.domPS,
        rn = zt.domLC,
        an = zt.domChildren,
        sn = zt.domClosestSibling,
        on = zt.domData,
        ln = zt.geByClass,
        un = zt.geByClass1,
        cn = zt.gpeByClass,
        dn = zt.addClass,
        gn = zt.removeClass,
        mn = zt.toggleClass,
        fn = zt.hasClass,
        pn = zt.attr,
        _n = zt.setStyle,
        hn = zt.val,
        vn = zt.getTemplate,
        bn = zt.getLang,
        yn = zt.langSex,
        Cn = zt.langDate,
        wn = zt.langNumeric,
        En = zt.getDateText,
        kn = zt.getSmDate,
        Tn = zt.getShortDate,
        Sn = zt.isSameDate,
        In = zt.isToday,
        Mn = zt.ajax,
        Pn = zt.showBox,
        Ln = zt.showFastBox,
        An = zt.showTabbedBox,
        On = zt.showTooltip,
        Dn = zt.mobileOnlineTip,
        xn = zt.mobPlatforms,
        Rn = zt.onlinePlatformClass,
        Bn = zt.AudioMessagePlayer,
        Nn = zt.Emoji,
        Fn = zt.slideUp,
        jn = zt.fadeOut,
        Hn = zt.cancelEvent,
        Un = zt.ny2018ReplaceText,
        Gn = 4096,
        qn = 100,
        zn = 8,
        Vn = "chatPosition",
        Kn = {}
}, function(e, t) {
    e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
}, function(e, t) {
    "use strict";

    function n() {
        var e = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || window.MediaDevices && window.MediaDevices.getUserMedia,
            t = function(t) {
                return new Promise(function(n, r) {
                    e ? e.call(navigator, t, n, r) : r(new Error("NotSupported"))
                })
            },
            n = function() {
                return new Promise(function(e, t) {
                    if (MediaStreamTrack && MediaStreamTrack.getSources) {
                        var n = {
                            audio: "audioinput",
                            video: "videoinput"
                        };
                        return MediaStreamTrack.getSources(function(t) {
                            e(t.map(function(e) {
                                return {
                                    label: e.label,
                                    kind: n[e.kind],
                                    deviceId: e.id,
                                    groupId: ""
                                }
                            }))
                        })
                    }
                    t(new Error("NotSupported"))
                })
            };
        e && !navigator.mediaDevices && (navigator.mediaDevices = navigator.mediaDevices || {}), navigator.mediaDevices && (navigator.mediaDevices.getUserMedia || (navigator.mediaDevices.getUserMedia = t), navigator.mediaDevices.enumerateDevices || (navigator.mediaDevices.enumerateDevices = n)), window.AudioContext = window.AudioContext || window.webkitAudioContext, window.AudioContext && (window.AudioContext.prototype.createScriptProcessor = window.AudioContext.prototype.createScriptProcessor || window.AudioContext.prototype.createJavaScriptNode)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.initFailBack = n
}, function(e, t, n) {
    "use strict";
    var r = n(43),
        a = n(108),
        i = n(59),
        s = n(37),
        o = n(95),
        l = n(58),
        u = n(14),
        c = n(21),
        d = n(4),
        g = n(73),
        m = n(2),
        f = n(113);
    e.exports = function(e, t, n, p, _, h) {
        var v = r[e],
            b = v,
            y = _ ? "set" : "add",
            C = b && b.prototype,
            w = {},
            E = function(e) {
                var t = C[e];
                i(C, e, "delete" == e ? function(e) {
                    return h && !c(e) ? !1 : t.call(this, 0 === e ? 0 : e)
                } : "has" == e ? function(e) {
                    return h && !c(e) ? !1 : t.call(this, 0 === e ? 0 : e)
                } : "get" == e ? function(e) {
                    return h && !c(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                } : "add" == e ? function(e) {
                    return t.call(this, 0 === e ? 0 : e), this
                } : function(e, n) {
                    return t.call(this, 0 === e ? 0 : e, n), this
                })
            };
        if ("function" == typeof b && (h || C.forEach && !d(function() {
                (new b).entries().next()
            }))) {
            var k = new b,
                T = k[y](h ? {} : -0, 1) != k,
                S = d(function() {
                    k.has(1)
                }),
                I = g(function(e) {
                    new b(e)
                }),
                M = !h && d(function() {
                    for (var e = new b, t = 5; t--;) e[y](t, t);
                    return !e.has(-0)
                });
            I || (b = t(function(t, n) {
                u(t, b, e);
                var r = f(new v, t, b);
                return void 0 != n && l(n, _, r[y], r), r
            }), b.prototype = C, C.constructor = b), (S || M) && (E("delete"), E("has"), _ && E("get")), (M || T) && E(y), h && C.clear && delete C.clear
        } else b = p.getConstructor(t, e, _, y), s(b.prototype, n), o.NEED = !0;
        return m(b, e), w[e] = b, a(a.G + a.W + a.F * (b != v), w), h || p.setStrong(b, e, _), b
    }
}, function(e, t, n) {
    var r = n(86),
        a = n(28),
        i = n(138),
        s = n(13)("IE_PROTO"),
        o = function() {},
        l = "prototype",
        u = function() {
            var e, t = n(124)("iframe"),
                r = i.length,
                a = ">";
            for (t.style.display = "none", n(79).appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write("<script>document.F=Object</script" + a), e.close(), u = e.F; r--;) delete u[l][i[r]];
            return u()
        };
    e.exports = Object.create || function(e, t) {
        var n;
        return null !== e ? (o[l] = r(e), n = new o, o[l] = null, n[s] = e) : n = u(), void 0 === t ? n : a(n, t)
    }
}, , function(e, t, n) {
    "use strict";

    function r(e, t) {
        return t.selection || (t.selection = []), t.selection.push(e), Promise.resolve(t)
    }

    function a(e) {
        return e.selection = [], Promise.resolve(e)
    }

    function i(e, t) {
        return t.selection = t.selection.filter(function(t) {
            return t.id !== e
        }), Promise.resolve(t)
    }

    function s(e, t, n, r, a, s, o) {
        var l = intval(domData(o, "peer"));
        tooltips.hide(o), t.set(i.bind(null, l)).then(function(i) {
            c(e, r, t, a), n().selectionDeleted(t, l)
        })
    }

    function o(e) {
        var t = 0;
        return function() {
            var n = e.offsetWidth;
            setStyle(e, {
                width: 1
            });
            var r = e.offsetLeft;
            return t === r ? void setStyle(e, {
                width: n
            }) : (t = r, n = e.parentNode.offsetWidth, void setStyle(e, {
                width: Math.max(30, n - r - 20)
            }))
        }
    }

    function l(e, t, n, r) {
        e.set(m.setCurrentSearch.bind(null, n, !1)).then(t().onChange)
    }

    function u(e, t, n, r) {
        e.set(a).then(c.bind(null, t, n, e, r))
    }

    function c(e, t, n, r) {
        var a = n.get().selection,
            i = uiSearch.getFieldEl(e);
        uiSearch.focus(e), a.length > 0 ? attr(i, "placeholder", "") : attr(i, "placeholder", unclean(getLang("mail_search_creation"))), t.innerHTML = a.map(function(e) {
            return '<div class="token">\n      <div class="token_title">' + e.name + '</div>\n      <div data-peer="' + e.id + '" class="token_del ' + p + '"></div>\n    </div>'
        }).join(""), toggleClass(e, "ui_multiselect_has_selection", a.length > 0), domFC(e).scrollTop += 50, r()
    }

    function d(e, t) {
        return showTooltip(t, {
            text: getLang("mail_create_chat_remove_user"),
            black: 1,
            shift: [15, 8],
            appendParentCls: "_wrap"
        })
    }

    function g(e, t, n) {
        uiSearch.init(e, {
            onChange: l.bind(null, t, n)
        });
        var g = uiSearch.getFieldEl(e),
            m = ce("div", {
                className: "_ui_multiselection ui_multiselect_cnt"
            });
        g && g.parentNode.insertBefore(m, g);
        var _ = o(g);
        t.set(a);
        var h = s.bind(null, e, t, n, m, _),
            v = function() {
                return uiSearch.focus(e)
            },
            b = (0, f.createModule)({
                handlers: function(t, n) {
                    n(e, "click", p, h), n(e, "mouseover", p, d), t(e, "click", v)
                }
            });
        return {
            addSelection: function(n, a) {
                return t.set(r.bind(null, {
                    id: n,
                    name: a
                })).then(c.bind(null, e, m, t, _))
            },
            removeSelection: function(n) {
                return t.set(i.bind(null, n)).then(c.bind(null, e, m, t, _))
            },
            resetSelection: function() {
                u(t, e, m, _)
            },
            focus: function() {
                uiSearch.focus(e)
            },
            save: function() {
                t.stash(), c(e, m, t, _)
            },
            restore: function() {
                t.pop(), c(e, m, t, _)
            },
            unmount: function() {
                uiSearch.destroy(e), (0, f.destroyModule)(b)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = g;
    var m = n(46),
        f = n(83),
        p = "_ui_multiselect_cancel"
}, , function(e, t, n) {
    var r = n(54),
        a = n(86),
        i = n(57);
    e.exports = n(70) ? Object.defineProperties : function(e, t) {
        a(e);
        for (var n, s = i(t), o = s.length, l = 0; o > l;) r.f(e, n = s[l++], t[n]);
        return e
    }
}, function(e, t, n) {
    for (var r = n(87), a = n(59), i = n(43), s = n(99), o = n(18), l = n(17), u = l("iterator"), c = l("toStringTag"), d = o.Array, g = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], m = 0; 5 > m; m++) {
        var f, p = g[m],
            _ = i[p],
            h = _ && _.prototype;
        if (h) {
            h[u] || s(h, u, d), h[c] || s(h, c, p), o[p] = d;
            for (f in r) h[f] || a(h, f, r[f], !0)
        }
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        var n = ge("page_header"),
            r = geByClass1("_im_chat_input_w", t),
            a = r.offsetHeight - r.clientHeight;
        return Math.min(window.clientHeight() - a, Math.max(Math.max(0, e), Ae + n.offsetHeight + t.offsetTop))
    }

    function i(e, t) {
        var n = intval(domData(t.target, "msgid")),
            r = gpeByClass("_im_mess_" + n, t.target),
            a = geByClass1("_im_log_body", r),
            i = geByClass1("_im_mess_susp_cont", r);
        a.innerHTML = i.innerHTML
    }

    function s(e, t) {
        return geByClass1("_im_mess_" + t, e)
    }

    function o(e, t, n) {
        var r = geByClass1(e, t),
            i = void 0,
            s = void 0;
        (0, ye.initDraggable)(r, {
            onStartDrag: function(e, t) {
                addClass(bodyNode, "cursor_ns_resize"), i = t, s = t
            },
            onDrop: function() {
                removeClass(bodyNode, "cursor_ns_resize")
            },
            onDrag: function(e, r) {
                var o = a(s - i + r, t);
                (0, ne.setClassicChatHeight)(o), n().fixHeight()
            }
        })
    }

    function l(e, t) {
        (0, ye.removeDraggable)(geByClass1(e, t))
    }

    function u(e) {
        hide(e.target)
    }

    function c(e, t, n, r, a, i, s, o, l) {
        removeClass(e, "im-page--history_empty"), h(e, t, n, r, a, i, s, o, l)
    }

    function d(e, t, n, r, a) {
        if (checkEvent(r)) return !0;
        var i = q2ajx(a.getAttribute("href")),
            s = intval(i.msgid);
        s && e.set(te.changePeer.bind(null, e.get().peer, s)).then(function() {
            k(n, t, s, e)
        }), cancelEvent(r)
    }

    function g(e, t, n) {
        var r = (0, re.getTab)(t, n),
            a = (0, te.strHistory)(r.history);
        toggleClass(e, "im-page--history_empty-hist", !a)
    }

    function m(e, t, n, r) {
        if (hasClass(n.target, "_im_mess_marker")) {
            var a = n.target;
            window.tooltips && (0, se.toArray)(geByClass(ne.FAILED_CLASS, t)).map(function(e) {
                return geByClass1("_im_mess_marker", e)
            }).filter(function(e) {
                return e !== a
            }).forEach(function(e) {
                return tooltips.hide(e, {
                    fasthide: !0
                })
            });
            var i = domData(r, "msgid");
            showTooltip(a, {
                content: getTemplate("im_failed_menu", {
                    id: i
                }),
                className: "im-page--failed-tt" + (i > 0 ? " no_delete" : ""),
                appendParentCls: "_chat_body_wrap",
                dir: "down",
                noZIndex: !0,
                shift: [12, 8],
                hasover: !0
            })
        }
    }

    function f(e) {
        return geByClass1("_im_peer_history", e)
    }

    function p(e) {
        addClass(e, "im-page--history_empty"), f(e).innerHTML = ""
    }

    function _(e, t) {
        var n = t.contHeight(),
            r = e.scrollTop + (n - e.contHeight);
        t.scrollTop(r)
    }

    function h(e, t, n, r, a, i, s) {
        var o = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : !0,
            l = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : !1,
            u = (t.get().tabs || {})[n];
        a().hideError(), i.renderPeer(t);
        var c = geByClass1("_im_peer_history", e);
        if (!t.get().tabHistoryNotChanged) {
            val(geByClass1("_im_page_peer_name", e), u.tab);
            var d = (0, te.strHistory)(u.history);
            g(e, t, n), d || (d = getLang("mail_im_here_history")), val(c, d), getAudioPlayer().updateCurrentPlaying(), (0, ne.isClassicInterface)(t) || (0, ne.fixTableCellChildHeight)("_chat_body_wrap", e), B(t, r, e)
        }
        if ((0, te.isSearchingInplace)(n, t.get()) ? a().showSearch(t) : a().cancelSearch(t, !1), s.changePeer(n, t), t.get().msgid) k(r, e, t.get().msgid, t);
        else if (u.scrollBottom && o) {
            _(u, r);
            var m = (0, ne.isMessagesVisible)(t, e, r),
                f = ee(m, 1),
                p = f[0];
            u.skipped || setTimeout(function() {
                u.unread && !p && M(t, e, !0), y(t, r, e)
            }, 100)
        } else E(r, e, a, t, l) || r.scrollBottom(Me);
        window.LazyLoad && window.LazyLoad.scan(r.scroll ? r.scroll.scroller : !1)
    }

    function v(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = n || t.scrollTop(),
            a = t.scrollBottom(),
            i = t.contHeight(),
            s = e.get().peer;
        e.set(te.saveHistoryScroll.bind(null, s, r, a, i))
    }

    function b() {
        return ie.screenfull.isFullscreen
    }

    function y(e, t, n) {
        var r = (0, re.isGoToEndVisible)(e),
            a = 4 * t.getScrollHeight();
        t.scrollBottom() > a && !r && M(e, n, !0, 2 * t.getScrollHeight())
    }

    function C(e, t, n, r, a, i, s, o) {
        var l = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : !0;
        if ((e.get().history_init || (e.get().history_init = !0, !(o.scrollTop() >= 0))) && !b()) {
            a.update(o), a.show();
            var u = e.get().peer;
            if (0 !== u && (0, ne.isFullyLoadedTab)(e.get(), u) && (we["default"].onHistoryScroll(o.scrollTop()), !layers.visible)) {
                var c = (0, re.isGoToEndVisible)(e),
                    d = (0, re.getTab)(e, u);
                d && !d.skipped && 0 > s ? y(e, o, i) : s > 0 && !d.skipped && !d.unread && H(e, i), I(e, o) && (c && d && !d.skipped && H(e, i), d.unread > 0 && w(e));
                var g = (0, ne.wrapLoading)(n);
                if (!(0, te.isSearchingInplace)(u, e.get()) && l && r(o), !Xe && (0 > s || 0 === o.scrollBottom()) && o.scrollBottom() < Ie) {
                    if ((0, te.isSearchingInplace)(u, e.get())) return;
                    if (d.skipped > 0 && !e.get().no_moving_down) {
                        var m = gpeByClass("_im_page_history", m),
                            f = e.get();
                        Xe = !0;
                        var p = e.set(te.loadLessHistory).then(t().loadHistory.bind(null, f.peer, {
                            reversed: !0
                        })).then(function() {
                            w(e), Xe = !1, M(e, m), d.skipped || e.set(te.changePeer.bind(null, e.get().peer, !1))
                        });
                        return x(m, !0), void p.then(x.bind(null, m, !1))
                    }
                }
                if (!Xe && o.scrollTop() < Ie) {
                    if ((0, te.isSearchingInplace)(u, e.get())) {
                        Xe = !0;
                        var _ = t().getSearchResulstModule();
                        return _.isAll(e) ? void(Xe = !1) : void g(_.loadMore(e).then(function(n) {
                            Xe = !1, n && (t().loadHistory(e.get().peer, {}, e, n), r(o))
                        }), "up")
                    }
                    var h = e.get();
                    d.allShown || (Xe = !0, g(e.set(te.loadMoreHistory.bind(null, 0, 0)).then(t().loadHistory.bind(null, h.peer, {})).then(function() {
                        Xe = !1, r(o)
                    }), "up"))
                }
                0 > s && $(e, u, o.scrollBottom(), i, t), (0, te.videoAutoPlayHandler)()
            }
        }
    }

    function w(e) {
        return window.curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle ? void 0 : e.set(te.readLastMessages.bind(null, e.get().peer))
    }

    function E(e, t, n, r, a) {
        var i = geByClass1("_im_unread_bar_row", t);
        if (i) {
            var s = r.get(),
                o = s.peer,
                l = i.getBoundingClientRect(),
                u = geByClass1("_im_chat_body_abs", t).getBoundingClientRect().top + 20;
            if ((0, ne.isClassicInterface)(r)) {
                var c = (0, ne.isChatPeer)(o) && (0, _e.isPinnedMessageVisibleInTab)(s, o);
                u += xe + (c ? De : 0)
            }
            var d = e.scrollTop() - u + l.top;
            return e.scrollTop(d), v(r, e, d), setTimeout(function() {
                o === r.get().peer && C(r, n, f(t), function() {}, a, t, 0, e)
            }, 80), w(r), !0
        }
        return !1
    }

    function k(e, t, n, r) {
        var a = s(t, n);
        if (a) {
            var i = (0, ne.isClassicInterface)(r),
                o = r.get().peer,
                l = i ? window.clientHeight() : geByClass1("_im_chat_body_abs", t).offsetHeight,
                u = a.offsetTop + domPN(a).offsetTop + domPN(domPN(a)).offsetTop + domPN(domPN(domPN(a))).offsetTop;
            i && (0, ne.isChatPeer)(o) && (0, _e.isPinnedMessageVisibleInTab)(r, o) && (u -= De), e.scrollTop(u - e.getScrollHeight() / 2 + l / 2), addClass(a, "im-mess_light"), setTimeout(function() {
                removeClass(a, "im-mess_light")
            }, Le)
        }
    }

    function T(e, t, n) {
        n.updateLastSeen(e)
    }

    function S(e, t, n, r, a) {
        var i = domData(a, "action"),
            o = domData(a, "msgid"),
            l = geByClass1("_im_mess_marker", s(n, o));
        switch (i) {
            case "resend":
                t(r, a);
                break;
            case "delete":
                e.set(te.removeFailed.bind(null, e.get().peer, o)).then(function() {
                    (0, ne.removeMessages)([o], f(n))
                })
        }
        tooltips.hide(l, {
            fasthide: !0
        })
    }

    function I(e, t) {
        return (0, re.getUnreadScrollBottom)(e) >= intval(t.scrollBottom())
    }

    function M(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
            a = e.get().peer;
        if (!(0, ne.isReservedPeer)(a)) {
            var i = e.get().tabs[a],
                s = geByClass1(Be, t),
                o = geByClass1("_im_to_end_label", s);
            n && i.unread > 0 ? val(o, getLang("mail_im_new_messages", i.unread)) : val(o, getLang("mail_im_to_end_new"));
            var l = !1;
            (n || i.skipped > 0) && !(0, te.isSearchingInplace)(e.get().peer, e.get()) ? (l = !0, addClass(s, "im-to-end_shown")) : j(s, !0), e.set(te.updateGoToEndVisibility.bind(null, [l, intval(r)]))
        }
    }

    function P(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        if (0 === e.scrollTop() && 0 === e.scrollBottom()) return !1;
        var n = e.scrollBottom();
        return (t ? Pe + t : Pe) > n
    }

    function L(e, t, n, r, a) {
        var i = domData(a, "msgid"),
            s = e.get().peer,
            o = (0, re.getMessage)(e, s, i);
        o.type === be.EDIT_MESSAGE ? (n().sendEditMessage(e, o), n().resendMessage(s, i)) : e.get().imQueueResend(s, i).then(function(t) {
            e.get().longpoll.push([(0, be.resendEvent)(s, t.mess)])
        })
    }

    function A(e, t, n, r, a) {
        var i = intval(domData(a, "peer")),
            s = intval(domData(gpeByClass("_im_mess", a), "msgid")),
            o = e.get().tabs[i].hash;
        return (0, te.restoreMessageSend)(s, i, o, e.get().gid), e.set(te.restoreMessage.bind(null, s, i)).then(ne.restoreMessage.bind(null, s, i, f(t))).then(function() {
            return B(e, n, t)
        }), !1
    }

    function O(e, t) {
        e().showCreation(t)
    }

    function D(e, t, n) {
        cancelStackFilter("forward"), e.set(te.prepareForward.bind(null, null)).then(function() {
            t().changePeer(!1, e), removeClass(n, "im-page--history_fwd"), e.get().longpoll.push([(0, be.transitionEvent)("default")])
        })
    }

    function x(e, t) {
        var n = geByClass1(Be, e);
        toggleClass(n, "im-to-end_loading", t)
    }

    function R(e, t, n, r) {
        var a = t.get().tabs[t.get().peer];
        return a.skipped ? (x(n, !0), void t.set(te.changePeer.bind(null, t.get().peer, !1)).then(function() {
            return t.set(te.loadPeer.bind(null, t.get().peer, !0, -1, !1))
        }).then(function() {
            x(n, !1), e().changePeer(t, !1, !1), w(t)
        })) : (r.scrollBottom(Me), M(t, n), w(t), void $(t, t.get().peer, 0, n, e))
    }

    function B(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1;
        if ((0, ne.isClassicInterface)(e)) {
            var i = t.contHeight(),
                s = geByClass1("_im_chat_input_w", n),
                o = s.offsetHeight - s.clientHeight,
                l = geByClass1("_im_chat_resize", n),
                u = geByClass1("_im_chat_input_parent", n),
                c = geByClass1("_im_chat_audio_input_parent", n);
            if (r = r !== !1 ? r : (0, ne.getClassicChatHeight)(), r !== !1 && r > 0) {
                var d = a(r, n),
                    g = hasClass(c, Ve) || hasClass(c, ze),
                    m = g ? c : u,
                    f = d - m.offsetHeight;
                l.style.height = window.clientHeight() - d - o + "px", setStyle(s, {
                    top: f + "px",
                    bottom: "auto"
                })
            } else l.style.height = "0px", setStyle(s, {
                top: "auto",
                bottom: "0px"
            });
            var p = geByClass1("_im_peer_history_w", n);
            return setStyle(p, {
                borderBottomWidth: s.offsetHeight - Oe - 1
            }), t.contHeight() - i
        }(0, ne.fixTableCellChildHeight)("_chat_body_wrap", n);
        var _ = t.getScrollHeight();
        t.update(!1, !0);
        var h = t.getScrollHeight();
        return _ - h
    }

    function N(e, t, n, r) {
        var a = t.offsetHeight;
        r(), e.heightIncreased(t.offsetHeight - a, n)
    }

    function F(e, t) {
        var n = t.getBoundingClientRect().top;
        showTooltip(t, {
            className: "im-page--admin-tt",
            text: getLang("mail_only_admin_see"),
            appendParentCls: "_chat_body_wrap",
            shift: [20, 5],
            dir: "auto",
            showdt: 400,
            noZIndex: !0,
            toup: n > 200
        })
    }

    function j(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
        t && addClass(e, "im-to-end_fast"), removeClass(e, "im-to-end_shown"), t && (e.offsetHeight, removeClass(e, "im-to-end_fast"))
    }

    function H(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = geByClass1(Be, t);
        e.set(te.updateGoToEndVisibility.bind(null, [!1, 0])), j(r, n)
    }

    function U(e, t, n) {
        ie.screenfull.isFullscreen || 0 === t.get().peer || (0, ne.isClassicInterface)(t) || e().restoreScroll(t, t.get().peer)
    }

    function G(e, t) {
        var n = e.get(),
            r = n.peer,
            a = domClosest(Ke, t.target),
            i = intval(domData(a, "msgid")),
            s = (0, re.getMessage)(e, r, i),
            o = s && (0, ne.isServiceMsg)(s) && s.kludges.source_act;
        if (o === ne.CHAT_PIN_MESSAGE || o === ne.CHAT_UNPIN_MESSAGE) {
            var l = a.querySelector("." + We);
            if (l && "A" !== l.tagName) {
                var u = s.kludges.source_chat_local_id;
                if (!u || $e[u]) return;
                $e[u] = (0, te.getMessageLocalId)(r, u, n).then(function(e) {
                    var t = ee(e, 1),
                        n = t[0];
                    if (n) {
                        var a = "/im?sel=" + (0, ne.convertPeerToUrl)(r) + "&msgid=" + n,
                            i = l.innerHTML;
                        domReplaceEl(l, (0, ne.serviceLink)(a, i, !0, We)), delete $e[u]
                    }
                })
            }
        }
    }

    function q(e, t, n) {
        var r = e.get(),
            a = r.peer,
            i = n.target.href && n.target.href.match(/msgid=([\d]+)/),
            s = i && i[1];
        if ("A" === n.target.tagName && s && !(0, ne.isAlreadyDeleted)(e, a, s) && !checkEvent(n)) {
            var o = (0, re.getMessage)(e, a, s);
            o ? (e.setState({
                msgid: s
            }), (0, Ee.updateLocation)({
                msgid: s
            }), t().focusOnMessage()) : r.longpoll.push([(0, be.changePeer)(a, s)])
        }
        cancelEvent(n)
    }

    function z(e) {
        var t = (0, re.getCurrentTab)(e);
        (0, ne.isChatPeer)(t.peerId) && (t.pinHideId = cur.imDb.select(ke.PIN_HIDDEN_ID_OP, t.peerId))
    }

    function V(e, t, n, r, a) {
        e.setState({
            isEditing: !0
        }), n.saveText(e), addClass(r, "im-mess_is_editing"), addClass(geByClass1("_im_page_history"), "is_msg_editing"), cancelStackPush("cancel_edit", function() {
            return K(e, t, n, r, a)
        });
        var i = new Se.ImDraft;
        i.dData.txt = (0, Te.convertEmojiHtmlToRegularText)(a.text), i.dData.attaches = (0, Se.convertKludgesToAttaches)(a.kludges, a.messageId), n.toggleStickers(e, !1), n.setDraft(e, i), setTimeout(function() {
            return n.focusOn(e)
        }, 0)
    }

    function K(e, t, n, r, a) {
        e.setState({
            isEditing: !1
        }), removeClass(r, "im-mess_is_editing"), removeClass(geByClass1("_im_page_history"), "is_msg_editing"), cancelStackFilter("cancel_edit"), n.setDraft(e, (0, re.getPeer)(e) ? (0, re.getTabDraft)((0, re.getCurrentTab)(e)) : null), n.toggleStickers(e, !0), Y(t)
    }

    function W(e) {
        var t = geByClass1("im-mess_is_editing");
        if (!t) return null;
        var n = e.get().tabs[e.get().peer],
            r = (0, re.parserMessage)(n.msgs[domData(t, "msgid")]);
        return r && r.peerId == e.get().peer ? r : null
    }

    function Y(e) {
        (0, se.toArray)(geByClass("_im_history_tooltip", e)).forEach(hide)
    }

    function Q(e, t, n) {
        var r = e.get(),
            a = domClosest(Qe, n.target),
            i = domData(a, "msgid"),
            s = (0, re.getMessage)(r, r.peer, i),
            o = function(e) {
                return t().replaceAttachmentPlaceholders(e, s)
            };
        s && (e.set(te.addAttachmentsToStoreData.bind(null, s, [(0, ne.renderMessageMedia)(s)])).then(o), e.set(te.loadMedia.bind(null, s)).then(o))
    }

    function X(e, t) {
        (0, ne.boxHandleEditTimeTooltips)(showBox("al_im.php", t, {
            dark: 1
        }), e)
    }

    function $(e, t, n, r, a) {
        var i = 50,
            s = (0, re.getTab)(e, t),
            o = s && s.msgs && s.history && !Xe && s.offset > 60 && 0 == s.skipped && 50 > n && n >= 0 && 0 === (e.get().selectedMessages || []).length && e.get().cutHistAllowed;
        if (o) {
            var l = Object.keys(s.msgs).filter(function(e) {
                return e > 0
            }).sort(function(e, t) {
                return e - t
            }).slice(0, -i);
            e.set(te.removeMessages.bind(null, l, t)).then(function() {
                return a().removeMessages(l, t, e)
            })
        }
    }

    function J(e, t, n, r, a, i, o, u, d, g, m, b, y, C, w) {
        var E = void 0,
            S = throttle(function() {
                n.smoothScroll.apply(n, arguments)
            }, 300);
        return {
            changePeer: function(e) {
                var s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !0,
                    o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !0;
                if (0 === e.get().peer && w.disable(), revertLastInlineVideo(t), 0 === e.get().peer) return a.setDraft(e, null), p(t, e);
                if ((0, ne.isFullyLoadedTab)(e.get(), e.get().peer)) {
                    removeClass(t, "im-page--history_search"), e.set(te.dropSelection), r.changeActions(e);
                    var l = e.get().peer,
                        d = e.get().prevPeer;
                    removeClass(t, "im-page--history_loading"), s ? a.setDraft(e, (0, re.getTabDraft)((0, re.getCurrentTab)(e))) : a.updateState(e), M(e, t), i().updateTyping(l, e), w.toggle(!0), T(e, t, r), (0, ne.isReservedPeer)(d) && !(0, ne.isReservedPeer)(l) ? (c(t, e, l, n, i, r, u, o, w), w.reset(n)) : (0, ne.isReservedPeer)(d) || (0, ne.isReservedPeer)(l) || (h(t, e, l, n, i, r, u, o, w), w.reset(n)), (0, ne.ensureDomHasActions)(t)
                }
            },
            preparePeer: function(e) {
                var n = (0, re.getPeer)(e);
                z(e), a.setDraft(e, (0, re.getTabDraft)((0, re.getTab)(e, n))), i().updateTyping(n, e), i().hideError(), r.renderPeer(e), r.hideActions(e), u.changePeer(n, e), T(e, t, r), w.toggle(!1), H(e, t, !0)
            },
            saveScroll: function(e) {
                return v(e, n)
            },
            loadingPeer: function(e) {
                (0, te.isAnythingLoading)(e.get()) || (removeClass(t, "im-page--history_empty"), addClass(t, "im-page--history_loading"))
            },
            stopLoading: function(e) {
                removeClass(t, "im-page--history_loading")
            },
            deselectDialog: function(e) {
                o().removeSelection(e)
            },
            replaceMessageAttrs: function(e, n) {
                (0, ne.replaceMessageAttrs)(n.get(), f(t), e)
            },
            cleanSelection: function(e) {
                g.cleanSelection(e)
            },
            updateDialogFilters: function(e) {
                o().updateDialogFilters(e)
            },
            getSearchResulstModule: function() {
                return E
            },
            insertSearch: function(e, a) {
                E || (r.deselectAll(a), E = (0, me.mount)(t, a, i)), addClass(t, "im-page--history_search"), e ? (removeClass(t, "im-page--history_search-empty"), f(t).innerHTML = e) : (addClass(t, "im-page--history_search-empty"), f(t).innerHTML = (0, ne.renderEmptySearch)()), B(a, n, t), n.scrollBottom(0), M(a, t), w.reset(n)
            },
            updateChatTopic: function(e, t) {
                o().updateDialog(e, t), e === t.get().peer && (r.renderPeer(t), r.renderActions(t))
            },
            updateActions: function(e) {
                r.changeActions(e)
            },
            updateChatPhoto: function(e, a, i) {
                if ((0, ne.isPeerActive)(e.peerId, i.get())) {
                    r.renderPeer(i);
                    var s = P(n);
                    (0, ne.addChatPhotoToUpdate)(e, a, i.get(), f(t)), s && n.scrollBottom(Me)
                }
            },
            markImportant: function(e, n, a) {
                var i = s(t, e);
                i && (r.changedMessageSelection(a), d.markImportant(e, n, a))
            },
            isNewMessagesVisible: function(e) {
                return I(e, n)
            },
            loadHistory: function(e, r, a) {
                var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1,
                    s = a.get();
                if ((0, ne.isPeerActive)(e, s)) {
                    var o = i || s.tabs[e].historyToAppend;
                    if (!o) return;
                    var l = geByClass1("_im_peer_history", t),
                        u = domFC(l),
                        c = n.scrollBottom(),
                        d = r.reversed ? function(e) {
                            return l.appendChild(e)
                        } : function(e) {
                            return l.insertBefore(e, u)
                        },
                        g = 0;
                    r.reversed && (g = l.offsetHeight);
                    var m = sech(o),
                        f = document.createDocumentFragment();
                    m.forEach(function(e) {
                        return f.appendChild(e)
                    }), d(f), r.reversed && w.heightIncreased(l.offsetHeight - g, n), r.reversed || n.scrollBottomFixSave(c), n.update(!1, !0);
                    var p = m.filter(function(e) {
                        return hasClass(e, "_im_bar_date")
                    });
                    w.parseMore(p, n), (0, ne.ensureDomHasActions)(t)
                }
            },
            sendMessage: function(e) {
                0 !== e.get().peer && a.sendMessage()
            },
            editMessage: function(e, a) {
                if ((0, ne.isFullyLoadedTab)(e, a.peerId) && (0, ne.isPeerActive)(a.peerId, e.get())) {
                    var i = s(t, a.messageId);
                    if (!i) return;
                    (0, ne.editAndReplaceMessage)(e.get(), a, t), r.reRenderPinned(e), w.reset(n)
                }
            },
            addMessage: function(e, r) {
                if (!(0, te.isSearchingInplace)(r.peerId, e.get()) && (0, ne.isFullyLoadedTab)(e, r.peerId) && (0, ne.isPeerActive)(r.peerId, e.get())) {
                    if (s(t, r.messageId)) return;
                    var a = f(t);
                    N(w, a, n, function() {
                        var s = P(n),
                            o = geByClass1("_im_unread_bar_row", t),
                            l = (0, ne.isMessagesVisible)(e, t, n),
                            u = ee(l, 2),
                            c = u[0],
                            d = u[1];
                        (0, ne.appendToHistory)(e.get(), r, a, !0, !0, !c && !o), removeClass(t, "im-page--history_empty-hist");
                        var g = (0, re.getTab)(e, e.get().peer),
                            m = (0, ne.isServiceMsg)(r) && r.userId === vk.id,
                            f = r.kludges && r.kludges.source_act,
                            p = m && f !== ne.CHAT_PIN_MESSAGE && f !== ne.CHAT_UNPIN_MESSAGE;
                        g.skipped || c || !(0, ae.isUnread)(g, r) || (0, ae.isOut)(r) || M(e, t, !0, d), (r.local || s || p) && n.scrollBottom(0), i().updateTyping(r.peerId, e), Y(t)
                    });
                    var o = domPS(domLC(a));
                    if (hasClass(o, "_im_bar_date")) {
                        var l = ce("div");
                        l.innerHTML = o.outterHTML, w.parseMore(l, n)
                    }
                    i().hideError(), w.update(n), (0, te.updateMentions)(e.get()), $(e, r.peerId, n.scrollBottom(), t, i)
                }
            },
            setMessageErrored: function(e, n, r, a) {
                r && i().showError(r), (0, ne.setMessageError)(e, n, t)
            },
            markMessagesAsRead: function(e, n) {
                e.get().peer === n.peerId && (0, ne.markMessagesAsRead)(e.get(), n.peerId, t)
            },
            compensateHistoryHeightChange: function(e) {
                n.scrollTop(n.scrollTop() + e * De)
            },
            hideFwd: function(e) {
                removeClass(t, "im-page--history_fwd")
            },
            updateTyping: function(e, n) {
                if (!(0, te.isSearchingInplace)(e, n.get())) {
                    var r = n.get();
                    if (n.get().peer === e && (0, ne.isFullyLoadedTab)(r, e)) {
                        var a = (0, ne.formatTyper)(n.get().tabs[e].typing, e, !1, n.get()),
                            s = geByClass1(ne.TYPING_CLASS, t);
                        if (s || a) {
                            if (!s) {
                                var o = geByClass1(He, t);
                                val(o, getTemplate("im_typing", {
                                    cls: (0, ne.isClassicInterface)(n) ? "im-typing_classic" : ""
                                })), s = geByClass1(ne.TYPING_CLASS, t)
                            }
                            val(geByClass1("_im_typing_name", s), a), a ? (addClass(s, "im-page--typing_vis"), i().hideError()) : removeClass(s, "im-page--typing_vis")
                        }
                    }
                }
            },
            scrollFix: function(e, t, r) {
                w.heightIncreased(r, n), w.update(n), (0, ne.isPeerActive)(t, e.get()) && P(n, r) && n.scrollBottom(Me)
            },
            updateGoToEnd: function(e, r) {
                var a = (0, re.getTab)(e, e.get().peer);
                a && a.skipped ? M(e, t) : H(e, t, r), m(0, n, !1);
                var i = e.get().peer;
                setTimeout(function() {
                    e.get().peer === i && v(e, n)
                })
            },
            newMessage: function(e) {
                o().newMessage(e), H(e, t, !0)
            },
            scroll: function(e, t) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
                    a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1;
                if (0 !== e.get().peer) {
                    var i = r ? n.getScrollHeight() : 40;
                    a === !0 && (i = n.contHeight()), i = "up" === t ? -i : i, r || a ? S(i, function() {
                        m(i, n)
                    }) : (n.scrollTop(n.scrollTop() + i), m(i, n))
                }
            },
            showCreation: function(e, t) {
                o().showCreation(e, t)
            },
            updateScroll: function() {
                return B(b, n, t)
            },
            toggleBarDate: function(e) {
                w.toggle(e)
            },
            changedMessageSelection: function(e) {
                r.changedMessageSelection(e)
            },
            updateOnline: function(e, t) {
                (0, ne.isTabLoaded)(t.get(), e) && e === t.get().peer && r.renderPeer(t)
            },
            isEmpty: function(e) {
                return a.isEmpty(e)
            },
            replaceAttachmentPlaceholders: function(e, r) {
                (0, ne.isPeerActive)(r.peerId, e.get()) && (N(w, f(t), n, function() {
                    var a = P(n);
                    (0, ne.replaceAttaches)(t, r, e.get()), a && n.scrollBottom(0)
                }), w.update(n))
            },
            removeMessages: function(e, a, i) {
                i.get().peer === a && ((0, ne.removeMessages)(e, f(t)), B(i, n, t), r.changedMessageSelection(i))
            },
            hideGoToEnd: function(e) {
                H(b, t, e)
            },
            removeMessagesRestore: function(e, n, r, a) {
                a.get().peer === n && (0, ne.removeMessagesWithRestore)(e, n, r, f(t))
            },
            updateState: function(e, t) {
                o().updateState(e, t)
            },
            updateChat: function(e, t) {
                e.get().peer === t && (r.changeActions(e), r.renderPeer(e), r.renderActions(e), a.updateState(e), (0, te.updateMentions)(e.get()))
            },
            focustTxt: function(e) {
                a.focusOn(e)
            },
            showSearch: function(e) {
                addClass(t, "im-page--hisory_search-open"), e.setState({
                    searchShown: !0
                }), (0, re.getPinnedMessage)(e) && this.updateChatTopic(e.get().peer, e), this.cancelEditing(), setTimeout(function() {
                    return u.focus(e)
                }, 10)
            },
            cancelSearch: function(e) {
                var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !0;
                if (removeClass(t, "im-page--hisory_search-open"), removeClass(t, "im-page--history_search"), removeClass(t, "im-page--history_search-empty"), e.setState({
                        searchShown: !1
                    }), (0, re.getPinnedMessage)(e) && this.updateChatTopic(e.get().peer, e), r.changedMessageSelection(e), a && !(0, ne.isReservedPeer)(e.get().peer) && E) {
                    var i = e.get().tabs[e.get().peer];
                    f(t).innerHTML = (0, te.strHistory)(i.history), B(e, n, t), n.scrollBottom(0), e.get().msgid && (k(n, t, e.get().msgid, e), M(e, t)), y(n), w.reset(n)
                }
                E && (E.unmount(), E = !1), (0, ne.ensureDomHasActions)(t)
            },
            updateHistory: function(e) {
                0 !== b.get().peer && e(t)
            },
            focusOnMessage: function() {
                k(n, t, b.get().msgid, b)
            },
            sendEditMessage: function(e, t) {
                e.set(te.deliverEditedMessage.bind(null, (0, re.getTab)(e, t.peerId), t))["catch"](function(n) {
                    return e.get().longpoll.push([(0, be.failedMessage)(t.peerId, t, n)])
                })
            },
            unmount: function() {
                (0, oe.destroyModule)(e), n.destroy(), clearInterval(C), a.unmount(), r.unmount(), d.unmount(), g.unmount(), u.unmount(), cancelStackFilter("forward"), l("_im_chat_resize_track", t)
            },
            removePeer: function(e, t) {
                o().removePeer(e, t)
            },
            restoreScroll: function(e, t) {
                var r = e.get().tabs[t];
                r.scrollBottom ? _(r, n) : n.scrollBottom(Me)
            },
            resendMessage: function(e, n) {
                e === b.get().peer && (0, ne.startResendMessage)(e, n, t)
            },
            respond: function(e, t) {
                a.attachMessages(e, t), a.focusOn(e);
                var r = (0, re.getTab)(e, t);
                r && !r.skipped && (n.scrollBottom(Me), y(n))
            },
            startForward: function(e) {
                addClass(t, "im-page--history_fwd"), geByClass1("_im_explain_fwd", t).textContent = getLang("mail_explain_fwd", e.get().pendingForward.msgIds.length), o().cancelSearch(e), o().removeSelection(e), cancelStackPush("forward", function() {
                    return D(e, o, t)
                })
            },
            cancelRecording: function() {
                a.cancelRecording()
            },
            hideError: function() {
                hide(geByClass1(Ue, t))
            },
            showError: function(e) {
                geByClass1(Ue, t).innerHTML = e, show(geByClass1(Ue, t)), n.scrollBottom(Me)
            },
            startEditing: function(e) {
                if ((0, te.isAnythingLoading)(b.get())) return void(0,
                    ne.showWaitUntilUploadedBox)();
                e = (0, re.parserMessage)(e);
                var n = W(b);
                if (!(a.isBlocked() || n && n.messageId == e.messageId)) {
                    n && this.cancelEditing(), Y(t), b.get().searchShown && this.cancelSearch(b);
                    var i = s(t, e.messageId);
                    i && (this.cancelRecording(), V(b, t, a, i, e), r.deselectAll(b))
                }
            },
            cancelEditing: function() {
                var e = W(b);
                e && K(b, t, a, s(t, e.messageId), e)
            },
            getEditingMessage: function() {
                return W(b)
            },
            focusEditingMessage: function() {
                var e = W(b);
                e && k(n, t, e.messageId, b), a.focusOn(b)
            }
        }
    }

    function Z(e, t, n) {
        var r = geByClass1("_im_peer_history_w", e);
        show(r), hasAccessibilityMode() && addClass(r, "history_a11y");
        var a = (0, oe.createMutations)(J),
            s = a.callMutations,
            l = a.bindMutations,
            c = function(e) {
                var t = debounce(e, 100),
                    n = throttle(e, 100);
                return function(e) {
                    t(e), n(e)
                }
            }(v.bind(null, t)),
            p = (0, ve.mount)(t, e),
            _ = C.bind(null, t, s, r, c, p, e),
            h = (0, he.createScroll)(geByClass1("_im_chat_body_abs", e), {
                onScroll: _,
                nativeScroll: (0, ne.isClassicInterface)(t),
                shadows: !1
            });
        setTimeout(function() {
            t.get().peer && (z(t), (0, re.getCurrentTab)(t).pinned && (s().updateChatTopic(t.get().peer, t), t.set(te.setActions), b.changeActions(t)), t.get().msgid ? k(h, e, t.get().msgid, t) : E(h, e, s, t, p) || h.scrollBottom(Me), t.get().history_init = !1, p.reset(h), M(t, e), C(t, s, r, c, p, e, 0, h), (0, ne.ensureDomHasActions)(e))
        }, 15);
        var b = (0, le.mount)(geByClass1("_im_dialog_actions", e), t, s),
            y = (0, ue.mount)(geByClass1("_im_text_input", e), t, s),
            w = (0, de.mount)(geByClass1("_im_dialog_actions", e), t, s),
            I = (0, fe.mount)(e, t, s),
            P = (0, pe.mount)(e, t, function() {
                return {
                    changedMessageSelection: b.changedMessageSelection
                }
            });
        (0, _e.mount)(e, t, s), (0, ne.isReservedPeer)(t.get().peer) || t.set(te.restoreHistoryQueue.bind(null, t.get().peer)).then(function() {
            (0, ne.restoreQueue)(t.get().peer, t.get(), f(e)), g(e, t, t.get().peer)
        }), o("_im_chat_resize_track", e, n);
        var x = L.bind(null, t, e, s),
            B = A.bind(null, t, e, h),
            N = D.bind(null, t, n, e),
            j = O.bind(null, n, t),
            H = R.bind(null, s, t, e, h),
            V = m.bind(null, t, e),
            K = ne.showEditTimeTooltip.bind(null, t),
            W = S.bind(null, t, x, e),
            Y = ne.showChatMembers.bind(null, t, s, te.setCreationType),
            $ = d.bind(null, t, e, h),
            Z = U.bind(null, s, t, h),
            ee = G.bind(null, t),
            ae = q.bind(null, t, s),
            se = (0, oe.createModule)({
                handlers: function(n, r) {
                    r(e, "click", ne.RESTORE_CLASS, B), r(e, "mouseover click", ne.FAILED_CLASS, V), r(e, "mouseover", "_im_edit_time", K), r(e, "click", "_im_mess_susp", i.bind(null, e)), r(e, "click", Re, N), r(e, "click", Ne, W), r(e, "click", ne.SHOW_CHAT_MEMBERS_CLASS, Y), r(e, "click", Fe, $), r(e, "mouseover", je, F), r(e, "mouseover", Ke, ee), r(e, "click", We, ae), r(e, "click", Ue, u), r(e, "click", Ye, function(e, n) {
                        if (checkEvent(e)) return !0;
                        if (!gpeByClass("wall_postlink_preview_btn", e.target) && !hasClass(e.target, "wall_postlink_preview_btn")) return !0;
                        var r = geByClass1("flat_button", n),
                            a = {
                                invite_chat_id: domData(r, "inv-id"),
                                invite_hash: domData(r, "hash")
                            };
                        (0, ne.showInvitationBox)(t, a, te.leaveInvitation), cancelEvent(e)
                    }), r(e, "click", Ge, function() {
                        return t.get().longpoll.push([(0, be.resetPeer)()])
                    }), r(e, "click", qe, function(e) {
                        return Q(t, s, e)
                    }), n(geByClass1("_im_peer_history_w", e), "mousemove", p.show), n(geByClass1("_im_start_new", e), "click", j), n(geByClass1(Be, e), "click", H), n(geByClass1("_im_cancel_edit", e), "click", function() {
                        return s().cancelEditing(), !1
                    }), n(geByClass1("_im_edit_focus_cur", e), "click", function() {
                        return s().focusEditingMessage(), !1
                    }), ie.screenfull.raw && n(document, ie.screenfull.raw.fullscreenchange, Z)
                }
            });
        curNotifier.recvClbks.pin_hide = [function(e) {
            e.hide ? (0, _e.pinnedMessageHide)(t, e.peer, s, !1) : (0, _e.pinnedMessageUnHide)(t, e.peer, s, !1)
        }], window.showForwardBox = function(e) {
            return X(t, e)
        };
        var ce = setInterval(T.bind(null, t, e, b), 1e4);
        return l(se, e, h, b, y, s, n, w, I, P, _, t, c, ce, p)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var ee = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && o["return"] && o["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.mount = Z;
    var te = n(46),
        ne = n(20),
        re = n(139),
        ae = n(8),
        ie = n(128),
        se = n(36),
        oe = n(83),
        le = n(32),
        ue = n(38),
        de = n(93),
        me = n(48),
        fe = n(75),
        pe = n(9),
        _e = n(121),
        he = n(112),
        ve = n(41),
        be = n(132),
        ye = n(82),
        Ce = n(89),
        we = r(Ce),
        Ee = n(91),
        ke = n(110),
        Te = n(135),
        Se = n(68),
        Ie = 1e3,
        Me = -30,
        Pe = 30,
        Le = 2e3,
        Ae = 700,
        Oe = 15,
        De = 52,
        xe = 47,
        Re = "_im_cancel_fwd",
        Be = "_im_to_end",
        Ne = "_im_failed_action",
        Fe = "_im_mess_link",
        je = "_im_admin_name",
        He = "_im_typer_c",
        Ue = "_im_error",
        Ge = "_im_join_cancel",
        qe = "_im_retry_media",
        ze = "im-audio-message_recorded",
        Ve = "im-audio-message_recording",
        Ke = "_im_mess_srv",
        We = "im_srv_mess_link",
        Ye = "_chat_invitation",
        Qe = "_im_mess",
        Xe = !1,
        $e = {}
}, function(e, t) {
    var n = e.exports = {
        version: "2.2.1"
    };
    "number" == typeof __e && (__e = n)
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function a(e, t, n) {
        return !e.map(function(e) {
            var r = (0, D.getMessage)(t, n, e);
            return (0, x.isImportant)(r)
        }).reduce(function(e, t) {
            return e && t
        }, !1)
    }

    function i(e, t) {
        var n = t.get(),
            r = n.peer,
            a = n.tabs[r].pinned;
        return 1 === e.length && a && e[0] === (0, D.parserMessage)(a).messageId
    }

    function s(e, t) {
        var n = e.get().peer,
            r = geByClass1("_im_page_peer_online", t);
        r && (0, A.isUserPeer)(n) && (0, D.getTab)(e, n) && (0, A.applyInnerHtml)(r, (0, A.getLastSeenTextInHeader)(e, n))
    }

    function o(e, t, n) {
        geByClass("_im_header_icon", e).forEach(function(e) {
            if (n.length > 0) hide(e);
            else if ("star" === domData(e, "type") && (0, A.isFoldersAvailable)(t) && (toggleClass(e, "im-page--header-icon_star-active", (0, A.isImportant)(t)), setStyle(e, {
                    display: "inline-block"
                })), "answer" === domData(e, "type") && (0, A.isFoldersAvailable)(t) && (toggleClass(e, "im-page--header-icon_answer-shown", (0, A.isUnrespond)(t)), (0, A.isUnrespond)(t) ? setStyle(e, {
                    display: "inline-block"
                }) : hide(e)), "search" === domData(e, "type") && !(0, A.isCommunityInterface)(t)) {
                var r = (0, A.isFullyLoadedTab)(t, t.get().peer) && t.get().tabs[t.get().peer].offset;
                setStyle(e, {
                    display: "inline-block"
                }), toggleClass(e, "im-page-header-icon_search-shown", r)
            }
        })
    }

    function l(e, t, n) {
        var r = getLang("mail_selected_shorted", t.length);
        m({
            actions: !0
        }, "im-page--chat-header"), val(geByClass1("im-page--selected-messages"), getTemplate("im_selected_messages", {
            label: r.replace("{count}", t.length),
            tip: getLang("mail_deselect_all")
        }));
        var s = geByClass1(U, e),
            o = a(t, n, n.get().peer),
            l = i(t, n);
        toggleClass(s, "im-page--mess-actions_important", !o), toggleClass(s, "im-page--mess-actions_pinned", l), toggleClass(s, "im-page--mess-actions_multiple-selection", t.length > 1);
        var u = o ? getLang("mail_im_toggle_important") : getLang("mail_im_toggle_important_off"),
            c = l ? getLang("mail_unpin") : getLang("mail_pin");
        attr(geByClass1("im-page-action_star", e), "aria-label", u), attr(geByClass1("im-page-action_pin", e), "aria-label", c)
    }

    function u(e, t, n) {
        var a = t.get(),
            i = a.peer,
            s = a.tabs[i],
            l = clean(stripHTML(unclean(s.tab))),
            c = geByClass1(z, e),
            f = geByClass1(V);
        c.tt = !1;
        var p = (0, A.renderPhotosFromTab)(t, s, !0),
            _ = getTemplate("im_simple_link", {
                href: s.href,
                content: getTemplate("im_peer_photo", {
                    online_class: "",
                    owner_photo: p,
                    modifier_class: "nim-peer_smaller"
                })
            });
        val(geByClass1("im-page--aside-photo", e), _);
        var h = (0, A.isChatPeer)(i),
            v = h ? !s.data.closed && !s.data.kicked : 0,
            b = {
                muted: inArray(i, a.mutedPeers),
                verified: !!s.verified,
                chat: h,
                actions: !1,
                derelict: h && !v,
                pinned: !1
            };
        if (h) {
            var y = (0, D.getPinnedMessage)(t),
                C = d(t);
            y && (0, B.isPinnedMessageVisibleInTab)(t, i) && (C ? t.set(L.loadChatMember.bind(null, r({}, i, [C]))).then(u.bind(null, e, t, n)) : b.pinned = !0)
        }
        var w = "";
        h ? w = v ? getTemplate("im_chat_members", {
            name: getLang("mail_im_n_chat_members", (0, A.getAliveMembersCount)(s))
        }) : "" : (0, A.isUserPeer)(i) && (w = (0, A.getLastSeenTextInHeader)(t, i));
        var E = getTemplate("im_simple_name", {
            name: s.tab,
            href: s.href,
            name_attr: l,
            ads_union: s.ad_union_ids_attr,
            online: w,
            more_cls: "" === w ? "im-page--title--1line" : ""
        });
        val(geByClass1("im-page--title-wrapper", e), E);
        var k = (0, A.renderPinnedMessage)(t),
            T = val(f);
        val(f, k);
        var S = geByClass1(F, e);
        if (removeClass(S, A.DESELECT_ALL_CLASS), show(geByClass1(H, e)), removeClass(geByClass1(U, e), "im-page--mess-actions_visible"), removeClass(geByClass1(U, e), "im-page--mess-actions_all-sel"), o(e, t, []), (0, A.isClassicInterface)(t)) {
            var I = geByClass1("_im_page_back", e);
            attr(I, "href", (0, A.getBaseLink)(t) + "?tab=" + a.active_tab)
        }
        m(b, "im-page--chat-header"), g(t, k, T, n)
    }

    function c(e) {
        val(geByClass1(V), (0, A.renderPinnedMessage)(e))
    }

    function d(e) {
        var t = (0, D.getPinnedMessage)(e);
        return !t || (0, R.oCacheGet)(e, t.userId) ? !1 : t.userId
    }

    function g(e, t, n, r) {
        var a = t && !n ? 1 : !t && n ? -1 : 0;
        a && !(0, A.isClassicInterface)(e) && r().compensateHistoryHeightChange(a)
    }

    function m(e, t) {
        var n = geByClass1(t);
        Object.keys(e).forEach(function(r) {
            toggleClass(n, t + "_" + r, !!e[r])
        })
    }

    function f(e, t, n, r, a) {
        e.set(L.removeMessagesWithRestore.bind(null, n, a, r)).then(t().removeMessagesRestore.bind(null, n, a, r)), (0, L.removeMessageSend)(n, a, (0, D.getTab)(e, a).hash, r, e.get().gid)
    }

    function p(e, t, n, r, s) {
        var o = e.get().selectedMessages,
            l = domData(s, "action"),
            u = e.get().peer,
            c = !0;
        switch (l) {
            case "delete":
                var d = vk.id == u && !e.get().gid,
                    g = !d && e.get().delAllAllowed && o.every(function(t) {
                        return (0, A.canMessageBeDeletedForAll)(e, (0, D.getMessage)(e, u, t))
                    });
                if (g) {
                    c = !1;
                    var m = (0, A.showMsgDeleteDialog)(u, o.length, function(r) {
                        y(e, t, n), m.hide(), cur.imDb.updateByKey("del_forall_checked", r), r ? (0, L.removeMessageSend)(o, u, (0, D.getTab)(e, u).hash, "deleteforall", e.get().gid) : f(e, t, o, l, u)
                    })
                } else f(e, t, o, l, u);
                break;
            case "spam":
                f(e, t, o, l, u);
                break;
            case "forward":
                (0, L.processFwd)(o, e.get().peer, e).then(function(t) {
                    return e.set(L.prepareForward.bind(null, t))
                }).then(function() {
                    (0, A.isClassicInterface)(e) ? (cancelStackPush("forward", function(t) {
                        e.set(L.prepareForward.bind(null, null)).then(function() {
                            e.get().longpoll.push([(0, O.changePeer)(t)])
                        })
                    }.bind(null, e.get().peer)), e.get().longpoll.push([(0, O.resetPeer)(!0)])) : t().startForward(e)
                });
                break;
            case "star":
                var p = a(o, e, u);
                e.set(L.favMessage.bind(null, o, p, u)), e.get().longpoll.push(o.map(function(e) {
                    return {
                        type: p ? O.SET_FLAGS : O.RESET_FLAGS,
                        messageId: e,
                        peerId: u,
                        flags: O.FLAG_IMPORTANT
                    }
                }));
                break;
            case "respond":
                (0, L.processFwd)(o, e.get().peer, e).then(function(t) {
                    return e.set(L.forwardMessages.bind(null, t, e.get().tfdraft))
                }).then(function() {
                    t().respond(e, u)
                });
                break;
            case "pin":
                var _ = (0, D.getLocalId)(e, o[0]),
                    h = i(o, e),
                    v = h ? L.unpinMessageOptimistic.bind(null, u) : L.pinMessageOptimistic.bind(null, _, u),
                    b = h ? L.unpinMessage.bind(null, u) : L.pinMessage.bind(null, _, u),
                    C = T.bind(null, t, u);
                e.set(L.checkChatMember.bind(null, e, _, u)).then(function(e) {
                    return e.set(v)
                }).then(C).then(function(e) {
                    return e.set(b)
                }).then(C)
        }
        c && y(e, t, n)
    }

    function _(e, t, n, r, a, i) {
        if ("keydown" !== i.type || 13 === i.which) {
            var s = trim(val(a));
            return s ? (s !== n && e.set(L.updateChatTopic.bind(null, t, s)).then(r().updateChatTopic.bind(null, t)), !0) : (notaBene(a), !1)
        }
    }

    function h(e, t, n) {
        var r = showFastBox({
            title: getLang("mail_chat_invite_link"),
            dark: 1
        }, getLang("mail_chat_reset_link_warning"), getLang("mail_chat_reset_link_confirm"), function(a) {
            var i = gpeByClass("_im_invite_box", n.target),
                s = geByClass1(Q, i),
                o = geByClass1("_im_invite_new", i);
            lockButton(r.btns.ok[0]), (0, L.resetInviteLink)(t - 2e9, e.get()).then(function(e) {
                var t = M(e, 1),
                    n = t[0];
                unlockButton(r.btns.ok[0]), s.value = n, unlockButton(o), addClass(i, "im-invite-box_reseted"), elfocus(s, 0, n.length), r.hide()
            })
        }, getLang("global_cancel"), function() {
            r.hide()
        })
    }

    function v(e, t, n) {
        if ((0, A.isChatPeer)(t)) {
            var r = e.get().tabs[t].name,
                a = _.bind(null, e, t, r, n),
                i = showFastBox({
                    title: getLang("mail_chat_topic_change_title"),
                    dark: 1
                }, getTemplate("im_chat_change_topic", {
                    value: r
                }), getLang("global_save"), function(e, t) {
                    var n = a(s, t);
                    n && i.hide()
                }, getLang("global_cancel"), function() {
                    i.hide()
                }),
                s = geByClass1(q, i.bodyNode);
            elfocus(s), addEvent(s, "keydown", function(e) {
                var t = a(s, e);
                t && i.hide()
            })
        }
    }

    function b(e, t, n, r, a, i) {
        var s = domData(i, "action"),
            o = geByClass1(j, r).parentNode,
            l = e.get().peer;
        switch (s) {
            case "clear":
                var u = (0, A.showFlushDialog)(l, function() {
                    (0, A.cleanHistory)(e, u, t, L.flushHistory, e.get().peer)
                });
                break;
            case "photos":
            case "media":
                showWiki({
                    w: "history" + (0, A.convertPeerToUrl)(l) + "_photo"
                }, null, {});
                break;
            case "topic":
                v(e, l, t);
                break;
            case "avatar":
                cur.recieveCropResult = void 0, Page.ownerPhoto(l);
                break;
            case "search":
                t().showSearch(e);
                break;
            case "block_community":
                e.set(L.toggleCommunityMessages.bind(null, !1, l)).then(function() {
                    e.get().longpoll.push([(0, O.resetPeer)()]), showDoneBox(getLang("mail_community_was_blocked"))
                });
                break;
            case "allow_community":
                e.set(L.toggleCommunityMessages.bind(null, !0, l)).then(function() {
                    n().changeActions(e)
                });
                break;
            case "block":
                var c = (0, A.showBlacklistBox)(l, e);
                c.once("success", function(t) {
                    t.delta && (showDoneBox(t.msg), e.get().longpoll.push([(0, O.resetPeer)()]))
                });
                break;
            case "leave":
                var d = showFastBox({
                    title: getLang("mail_chat_leave_title"),
                    dark: 1,
                    bodyStyle: "padding: 20px; line-height: 160%;"
                }, getLang("mail_chat_leave_confirm"), getLang("mail_leave_chat"), function() {
                    e.set(L.leaveChat.bind(null, l)), e.set(L.unpinMessageOptimistic.bind(null, l)), d.hide(), e.get().longpoll.push([(0, O.resetPeer)()])
                }, getLang("global_cancel"), function() {
                    d.hide()
                });
                break;
            case "invite_link":
                var g = h.bind(null, e, l),
                    m = !1,
                    f = !1,
                    p = !1,
                    _ = function() {
                        elfocus(m, 0, m.value.length), document.execCommand("copy"), setStyle(f, {
                            opacity: 1
                        }), p && (p = clearTimeout(p)), p = setTimeout(function() {
                            return setStyle(f, {
                                opacity: 0
                            })
                        }, 2e3)
                    },
                    b = !1,
                    y = !1;
                showBox("al_im.php", {
                    act: "a_get_invite_link",
                    chat_id: l - 2e9
                }, {
                    onDone: function(e) {
                        m = geByClass1(Q, e.bodyNode), b = geByClass1("_im_reset_link", e.bodyNode), y = geByClass1("_im_invite_copy", e.bodyNode), f = geByClass1("_im_invite_copied", e.bodyNode), elfocus(m, 0, m.value.length), addEvent(b, "click", g), addEvent(y, "click", _)
                    },
                    params: {
                        hideButtons: !0,
                        onHide: function() {
                            removeEvent(b, "click", g), removeEvent(y, "click", _)
                        },
                        onShow: function() {
                            addEvent(b, "click", g), addEvent(y, "click", _)
                        }
                    }
                }, {});
                break;
            case "return":
                e.set(L.returnToChat.bind(null, l)).then(function(e) {
                    return e.set(L.getPinnedMessage.bind(null, l))
                }).then(t().updateChatTopic.bind(null, l))["catch"](function(e) {
                    showFastBox(getLang("global_error"), e)
                });
                break;
            case "unmute":
            case "mute":
                var C = "mute" === s ? 1 : 0;
                e.set(L.toggleMutePeer.bind(null, l, C)).then(t().updateState.bind(null, l));
                break;
            case "chat":
            case "invite":
                if ((0, A.isChatPeer)(l))(0, A.inviteUser)(e, l, t, L.setCreationType);
                else if ((0, A.isUserPeer)(l)) {
                    var w = e.get().tabs[l],
                        E = [
                            [l, w.tab]
                        ];
                    e.set(L.setCreationType.bind(null, "chat", [])).then(function() {
                        return t().showCreation(e, E)
                    })
                }
                break;
            case "pin_hide":
                (0, B.pinnedMessageHide)(e, (0, D.getPeer)(e), t);
                break;
            case "pin_unhide":
                (0, B.pinnedMessageUnHide)(e, (0, D.getPeer)(e), t);
                break;
            case "unpin":
                (0, B.pinnedMessageUnpin)(e, (0, D.getPeer)(e), t)
        }
        uiActionsMenu.toggle(o, !1), t().cancelEditing()
    }

    function y(e, t, n) {
        var r = e.get().selectedMessages;
        e.set(L.cleanSelected).then(n().changedMessageSelection).then(t().cleanSelection.bind(null, r))
    }

    function C(e, t, n, r) {
        var a = (0, A.isClassicInterface)(e),
            i = void 0,
            s = void 0;
        switch (domData(r, "type")) {
            case "star":
                s = [4, 6], i = function() {
                    return (0, A.isImportant)(e) ? getLang("mail_im_toggle_important_off") : getLang("mail_im_toggle_important")
                };
                break;
            case "answer":
                s = [4, 6], i = getLang("mail_end_conversation");
                break;
            case "search":
                s = a ? [5, 6] : [4, -9], i = getLang("mail_search_in_peer")
        }
        showTooltip(r, {
            text: i || "",
            black: 1,
            shift: s,
            forcetoup: !0,
            appendParentCls: a ? "_im_dialog_actions" : "_im_mess_actions"
        })
    }

    function w(e, t, n) {
        var r = (0, A.isClassicInterface)(e),
            a = domData(n.target, "action");
        "respond" !== a && "forward" !== a && showTooltip(n.target, {
            text: E.bind(null, e, a) || "",
            black: 1,
            shift: [2, r ? -4 : 11],
            forcetodown: !0,
            appendParentCls: "_im_dialog_actions"
        })
    }

    function E(e, t) {
        var n = e.get(),
            r = n.selectedMessages,
            s = n.peer;
        switch (t) {
            case "pin":
                return i(r, e) ? getLang("mail_unpin") : getLang("mail_pin");
            case "star":
                return a(r, e, s) ? getLang("mail_im_toggle_important") : getLang("mail_im_toggle_important_off");
            case "delete":
                return getLang("mail_delete");
            case "spam":
                return getLang("mail_im_mark_spam")
        }
    }

    function k(e, t, n, r, a) {
        var i = domData(a, "type");
        switch (i) {
            case "star":
                e.set(L.toggleDialogImportant.bind(null, e.get().peer)).then(function() {
                    setTimeout(function() {
                        return C(e, t, r, a)
                    }, 40)
                });
                break;
            case "search":
                n().showSearch(e), window.tooltips && tooltips.hide(a, {
                    fasthide: !0
                });
                break;
            case "answer":
                var s = (0, D.getTab)(e, e.get().peer);
                s && (e.set(L.markDialogAnswered.bind(null, e.get().peer, s.lastmsg)), showDoneBox(getLang("mail_marked_as_answered"), {
                    out: 1e3
                }), e.get().longpoll.push([(0, O.resetPeer)()]))
        }
    }

    function T(e, t, n) {
        return e().updateChatTopic(t, n), n
    }

    function S(e, t, n, r) {
        return {
            changeActions: function(t) {
                var n = geByClass1(j, e),
                    r = geByClass1(H, e),
                    a = t.get().curActions,
                    i = Object.keys(a).map(function(e, t) {
                        var n = "";
                        return 7 !== L.ACTION_PRIORITIES[e] && 10 !== L.ACTION_PRIORITIES[e] || 0 === t || (n = '<div class="ui_actions_menu_sep"></div>'), n + rs(X, {
                            name: a[e].name,
                            icon: a[e].icon,
                            action: e
                        })
                    }).join("");
                0 === Object.keys(a).length ? addClass(r, "im-page--header-more_loading") : (val(n, i), removeClass(r, "im-page--header-more_loading"))
            },
            renderPeer: function(n) {
                u(e, n, t)
            },
            reRenderPinned: function(e) {
                var t = (0, D.getCurrentTab)(e);
                t && t.pinned && c(e)
            },
            renderActions: function(t) {
                var n = t.get().selectedMessages || [];
                n.length > 0 && l(e, n, t)
            },
            hideActions: function(t) {
                if (!(0, A.isFullyLoadedTab)(t, t.get().peer)) {
                    var n = geByClass1(H, e);
                    addClass(n, "im-page--header-more_loading")
                }
            },
            changedMessageSelection: function(n) {
                if (0 !== n.get().peer) {
                    var r = n.get().selectedMessages || [];
                    r.length > 0 ? l(e, r, n) : u(e, n, t)
                }
            },
            updateLastSeen: function(t) {
                s(t, e)
            },
            deselectAll: function(e) {
                y(e, t, r)
            },
            unmount: function() {
                (0, P.destroyModule)(n), cancelStackFilter("fowrward")
            }
        }
    }

    function I(e, t, n) {
        var r = (0, P.createMutations)(S),
            a = r.callMutations,
            i = r.bindMutations,
            s = p.bind(null, t, n, a),
            o = b.bind(null, t, n, a, e),
            l = y.bind(null, t, n, a),
            u = function(e, n) {
                return (0, A.showVerifiedTooltip)(n, t.get().peer)
            },
            c = C.bind(null, t, e),
            d = w.bind(null, t, e),
            g = k.bind(null, t, e, n),
            m = function(r) {
                gpeByClass(K, r.target, e) && !checkEvent(r) && ((0, A.showChatMembers)(t, n, L.setCreationType), cancelEvent(r))
            },
            f = (0, P.createModule)({
                handlers: function(r, a) {
                    a(e, "click", G, s), a(e, "click", N, o), a(e, "click", A.DESELECT_ALL_CLASS, l), a(e, "mouseover", z, u), a(e, "mouseover", "_im_header_icon", c), a(e, "mouseover", G, d), a(e, "click", "_im_header_icon", g), a(e, "click", "_im_header_link", m), a(e, "click", W, m), a(e, "click", Y, function(e) {
                        return (0, A.showChatMembers)(t, n, L.setCreationType)
                    }), a(e, "click", "_im_page_back", function(e) {
                        checkEvent(e) || (t.get().longpoll.push([(0, O.resetPeer)()]), cancelEvent(e))
                    })
                }
            });
        return (0, A.isReservedPeer)(t.get().peer) || setTimeout(function() {
            t.set(L.setActions).then(a().changeActions)
        }), i(e, n, f, a)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var M = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && o["return"] && o["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.mount = I;
    var P = n(83),
        L = n(46),
        A = n(20),
        O = n(132),
        D = n(139),
        x = n(8),
        R = n(66),
        B = n(121),
        N = "_im_action",
        F = "_im_page_peer_name",
        j = "_ui_menu",
        H = "_im_dialog_action_wrapper",
        U = "_im_mess_actions",
        G = "_im_page_action",
        q = "_im_chat_topic_change_input",
        z = "_im_chat_verified",
        V = "_im_pinned",
        K = "im-page--chat-header_chat",
        W = "_im_page_peer_name",
        Y = "_im_chat_members",
        Q = "_im_chat_invite_link",
        X = '<a tabindex="0" role="link" class="ui_actions_menu_item ' + N + ' im-action im-action_%icon%" data-action="%action%">%name%</a>'
}, function(e, t, n) {
    var r = n(61),
        a = Math.min;
    e.exports = function(e) {
        return e > 0 ? a(r(e), 9007199254740991) : 0
    }
}, function(e, t) {
    "use strict";

    function n(e, t, n, r, a) {
        return window.statlogsValueEvent(e, t, n, r, a)
    }

    function r(e) {
        return Math.random() < e
    }

    function a(e, t, a, i, s, o) {
        r(e) && n(a, i, s, o)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.statlogsValueEvent = n, t.randEnabled = r, t.statlogsProbValueEvent = a
}, function(e, t, n) {
    var r = n(123),
        a = n(136);
    e.exports = function(e) {
        return r(a(e))
    }
}, function(e, t) {
    "use strict";

    function n(e, t) {
        var n = [],
            r = 0;
        return function(a) {
            n.push(a), r || (r = setTimeout(function() {
                r = !1, e(n), n = []
            }, t))
        }
    }

    function r(e) {
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
                var a = new Date;
                console.debug("%cLP:[" + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds() + ":" + a.getMilliseconds() + "]%c " + e, r, n)
            } catch (i) {}
        }
    }

    function i(e) {
        var t = [];
        if ("undefined" == typeof e.length) return Object.keys(e).map(function(t) {
            return e[t]
        });
        for (var n = 0; n < e.length; n++) t.push(e[n]);
        return t
    }

    function s(e) {
        for (var t = {}, n = [], r = 0; r < e.length; r++) t[e[r]] || (n.push(e[r]), t[n[r]] = 1);
        return n
    }

    function o(e) {
        for (var t = "=".repeat((4 - e.length % 4) % 4), n = (e + t).replace(/\-/g, "+").replace(/_/g, "/"), r = window.atob(n), a = new Uint8Array(r.length), i = 0; i < r.length; ++i) a[i] = r.charCodeAt(i);
        return a
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.throttleAccumulate = n, t.executionStackPop = r, t.lplog = a, t.toArray = i, t.arrayUnique = s, t.urlBase64ToUint8Array = o
}, function(e, t, n) {
    var r = n(59);
    e.exports = function(e, t, n) {
        for (var a in t) r(e, a, t[a], n);
        return e
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }

    function a(e, t) {
        return e ? void(window.tooltips && tooltips.hide(e, t)) : !1
    }

    function i(e) {
        return e.map(function(e) {
            return {
                id: e[1],
                type: e[0],
                kind: e[2] || null
            }
        })
    }

    function s(e, t, n, r, a, s) {
        var o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : !0;
        if (T(t, r)) return Promise.resolve(!1);
        g(r).getBoundAttach(n.message) && (n.message = ""), n.share_url = g(r).getShareUrl();
        var l = (0, q.random)(),
            u = {
                peerId: t,
                messageId: "rid" + l,
                flags: N.FLAG_OUTBOUND,
                date: intval(Date.now() / 1e3) - r.get().timeshift,
                subject: "",
                text: (0, H.replaceSpecialSymbols)(clean(n.message)).replace(/\n/gi, "<br>"),
                local: !0,
                kludges: {
                    emoji: !0,
                    from_admin: r.get().gid ? vk.id : null
                },
                type: N.ADD_MESSAGE,
                attaches: i(n.attaches)
            };
        return n.rid = l, n.mess = u, e(t, n), r.get().longpoll.push([u]), o && s().clearText(t, r), a().newMessage(r), Promise.resolve(!0)
    }

    function o(e, t, n, r, a, i, o) {
        var u = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : !1;
        u || (u = e.get().peer);
        var c = {
            message: "",
            attaches: i
        };
        o && extend(c, o), l(e, t, !1).then(function(a) {
            return s(n, u, c, e, t, r, !1)
        })["catch"](function(t) {
            debugLog(t), d(e, a)
        })
    }

    function l(e, t, n) {
        var r = e.get().tabs[e.get().peer];
        return r.skipped > 0 ? (t().loadingPeer(e), e.setState({
            no_moving_down: !0
        }), e.set(j.changePeer.bind(null, e.get().peer, !1)).then(function() {
            return e.set(j.loadPeer.bind(null, e.get().peer, !0, -1, !1))
        }).then(function() {
            return t().changePeer(e, !1), e.setState({
                no_moving_down: !1
            }), n
        })) : Promise.resolve(n)
    }

    function u(e, t, n) {
        var r = !!intval(domData(n, "val"));
        r !== cur.ctrl_submit && (cur.ctrl_submit = r, e.set(j.changeSubmitSettings.bind(null, r)))
    }

    function c(e, t, n) {
        return e.get().delayed_ts ? !1 : setTimeout(function() {
            e.set(j.setDelayedMessage.bind(null, !1, !1)).then(function() {
                m.apply(void 0, n)
            })
        }, t)
    }

    function d(e, t) {
        document.activeElement && document.activeElement.blur(), showFastBox({
            title: getLang("global_error")
        }, getLang("mail_send_error"), getLang("mail_ok"), function() {
            nav.reload({
                force: !0
            })
        });
        var n = geByClass1("_im_send", t);
        return e.set(j.toggleSendingAbility.bind(null, !0)).then(function() {
            (0, H.lockButton)(n)
        })
    }

    function g(e) {
        var t = e.get().tfdraft;
        return t || new Y.ImDraft
    }

    function m(e, t, n, r, a, i) {
        var o = arguments,
            u = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : [];
        return Promise.resolve().then(function() {
            var i = geByClass1("_im_send", r);
            if (!(0, U.isSendingAvailable)(e)) return !1;
            if ((0, j.isAnythingLoading)(e.get()) || !(0, H.isFullyLoadedTab)(e, e.get().peer)) {
                var d = c(e, ue, (0, z.toArray)(o));
                return e.set(j.setDelayedMessage.bind(null, !0, d)).then(function() {
                    (0, H.lockButton)(i)
                })
            }
            clearTimeout(e.get().delayed_ts), a().saveText(e);
            var m = e.set(j.setDelayedMessage.bind(null, !1, !1)).then(function() {
                    (0, H.unlockButton)(i)
                }),
                f = (0, U.getPeer)(e);
            return m.then(l.bind(null, e, t)).then(function() {
                var r = g(e),
                    i = r.dData.attaches.map(function(e) {
                        return [e.type, e.id]
                    }).concat(u),
                    o = r.dData.txt;
                if (o || i.length) {
                    var l = t().getEditingMessage();
                    if (l) return (0, H.isMessageTooLong)(o) ? void showFastBox(getLang("global_error"), getLang("mail_err_edit_too_long")) : (t().cancelEditing(), void((0, W.wasMessageReallyModified)(e, l, r) && ((0, W.replaceMsgAfterEdit)(e, l, o, i, r.getShareUrl()), t().sendEditMessage(e, l), e.get().longpoll.push([(0, B.editMessageLocallyEvent)(l)]))));
                    var c = (0, H.splitMessageToParts)(o, i),
                        d = c.map(function(r) {
                            return s(n, f, {
                                message: r.msgText || "",
                                attaches: r.attaches || []
                            }, e, t, a)
                        });
                    return Promise.all(d)
                }
            })
        })["catch"](function(t) {
            debugLog(t), d(e, r)
        })
    }

    function f(e, t, n) {
        return e.set(j.deliverMessage.bind(null, t, n))
    }

    function p(e, t, n, r) {
        e.get().longpoll.push([N.failedMessage(t, n.mess, r)])
    }

    function _(e, t, n, r, a, i, s) {
        function o(n, r) {
            var a = e.get().peer,
                i = Emoji.val(r);
            (0, H.isReservedPeer)(a) || T(a, e) || g(e).dData.txt == i || !i || I(e), O(e, t, i), u(r);
            var o = t.offsetHeight;
            if (l && l !== o) {
                var c = s().updateScroll();
                s().scrollFix(e, e.get().peer, c)
            }
            l = o
        }
        var l = void 0,
            u = debounce(S.bind(null, e, n), 500),
            c = Emoji.init(geByClass1("_im_text", t), {
                ttDiff: 93,
                rPointer: !0,
                onSend: function() {
                    return r([])
                },
                controlsCont: t,
                forceTxt: !e.get().editable,
                checkEditable: o,
                onStickerSend: function(e, t, n) {
                    return a([
                        ["sticker", e, n]
                    ], {
                        sticker_referrer: t
                    })
                },
                uploadActions: i
            });
        return Emoji.emojiLoadMore(c), e.setState({
            emojiOptId: c
        }), c
    }

    function h(e, t) {
        var n = geByClass1("_im_text", e);
        Wall.initComposer(n, {
            lang: {
                introText: getLang("profile_mention_start_typing"),
                noResult: getLang("profile_mention_not_found")
            },
            toup: !0,
            getValue: function() {
                return t.get().peer > 2e9 ? (window.Emoji && Emoji.editableVal || val)(n) : ""
            },
            onShow: function() {
                addClass(e, "im_mention_shown");
                var t = data(n, "composer");
                if (t && t.wdd && t.wdd.shown) {
                    var r = 0,
                        a = !1,
                        i = function() {
                            t.ignoredTerm = t.curTerm, t.curTerm = !1, val(t.wddInput, ""), Composer.toggleSelectList(t)
                        };
                    each(t.wdd.shown, function() {
                        this[0] && (r++, "@" + t.curTerm == this[2] && (a = !0))
                    }), !r || a && 1 == r ? i() : cancelStackPush("im_mention", i)
                }
            },
            onHide: function() {
                removeClass(e, "im_mention_shown"), cancelStackFilter("im_mention")
            },
            searchKeys: [1, 7],
            wddOpts: {}
        })
    }

    function v(e, t, n, r, a, i, s, o, l) {
        if (!t.get().removingMedias) {
            if ("album" === a || "page" === a || "mail" === a) return !1;
            if ("share" === a && !s.title) return !1;
            show(pe), i && "string" == typeof a ? (o && g(t).addBindUrl(o, a, i), g(t).addAttach(a, i, s)) : g(t).syncWithSelector(l);
            var u = e().updateScroll();
            return e().scrollFix(t, t.get().peer, u), t.get().delayed_message && !(0, j.isAnythingLoading)(t.get()) ? (n([]), !1) : void O(t, r)
        }
    }

    function b(e, t, n) {
        (0, U.isAnyMessageBeingEdited)(e) || A(e, t).then(function(t) {
            var r = intval(domData(n.target, "tttype"));
            if ((2 === r && t !== !0 || 1 === r && t === !0) && window.tooltips && tooltips.destroy(n.target, {
                    fasthide: !0
                }), t !== !0) return domData(n.target, "tttype", 1), showTooltip(n.target, {
                text: getLang("mail_added_audiomsg"),
                black: !0,
                force: 1 !== r,
                appendParentCls: "_im_chat_input_parent",
                shift: [-8, -10]
            });
            domData(n.target, "tttype", 2);
            var a = e.get().ctrl_submit ? 1 : 0;
            return showTooltip(n.target, {
                text: getTemplate("ctrl_submit_hint", {
                    enter_on: a ? "" : "on",
                    ctrl_on: a ? "on" : ""
                }),
                dir: "down",
                shift: [-28, -5],
                needLeft: !0,
                className: "im-chat-input--tt",
                hasover: !0,
                force: 2 !== r,
                showdt: 700,
                zIndex: 200,
                hidedt: 700,
                appendParentCls: "_im_chat_input_parent",
                onCreate: function() {
                    radioBtns.im_submit = {
                        els: (0, z.toArray)(geByClass(fe)),
                        val: a
                    }
                }
            })
        })
    }

    function y(e, t) {
        Emoji.val(e, clean(t)), Emoji.focus(e, !0), setTimeout(Emoji.correctCaret.pbind(e), 10)
    }

    function C(e, t, n) {
        var r = e.getFwdRaw(),
            a = geByClass1(de, t);
        if (r)
            if (r.object && r.object.authorName) {
                var i = r.object,
                    s = (0, H.renderShortText)(0, "", i.text, !0, (0, Y.convertKludgesToAttaches)(i.kludges, 0));
                a.innerHTML = getTemplate("im_attach_mess", {
                    messages: s,
                    text: i.authorName,
                    date: getSmDate(i.date, n.get().timeshift),
                    modifier: "im-fwd_msg"
                })
            } else a.innerHTML = getTemplate("im_attach_mess", {
                messages: getLang("mail_title_X_msgs", e.getFwdCount()),
                text: getLang("mail_im_fwd_msgs_title"),
                date: "",
                modifier: ""
            });
        else a.innerHTML = ""
    }

    function w(e, t, n) {
        e.set(j.forwardMessages.bind(null, null, g(e))).then(function() {
            var r = geByClass1(de, t);
            if (r && r.children.length) {
                r.innerHTML = "";
                var a = n().updateScroll();
                n().scrollFix(e, e.get().peer, a)
            }
            O(e, t)
        })
    }

    function E(e, t, n, r, a, i, s, o, l, u) {
        return {
            restoreDraft: function(e, a) {
                e.setState({
                    removingMedias: !0
                }), t.unchooseMedia(), t.chosenMedias = [], e.setState({
                    removingMedias: !1
                });
                var s = e.get().peer,
                    o = (0, H.isUserPeer)(s) && s != vk.id && !e.get().gid,
                    l = (0, H.isUserPeer)(s) && s != vk.id && !e.get().gid && !inArray(s, e.get().moneyTransferExcept) || (0, H.isCommunityPeer)(s) && e.get().moneyTransferCommAvail && !e.get().gid || e.get().moneyRequestAvail && e.get().gid;
                if (toggle(geByClass1("ms_item_gift", r), o && !(0, U.isAnyMessageBeingEdited)(e)), toggle(geByClass1("ms_item_money", r), l && !(0, U.isAnyMessageBeingEdited)(e)), (0, H.isReservedPeer)(s)) return Promise.resolve();
                var u = g(e);
                return y(n, u.dData.txt), u.prepareObjects(e.get().gid, a && a.messageId).then(function() {
                    var a = L(e, s, n);
                    if (!a && s == e.get().peer) {
                        for (var o = u.dData.attaches, l = 0; l < o.length; l++) t.chooseMedia(o[l].type, o[l].id, o[l].object || {});
                        C(u, r, e);
                        var c = i().updateScroll();
                        i().scrollFix(e, s, c), O(e, r, u.dData.txt)
                    }
                })
            },
            sendMessage: function() {
                a([])
            },
            choose: function(e, n, r) {
                t.chooseMedia(e, n, r)
            },
            canAddMedia: function() {
                return !t.hasRestrictingAttach()
            },
            isEmpty: function(e) {
                return !trim(Emoji.val(n)) && !g(e).hasAttaches()
            },
            unchoose: function(e) {
                t.unchooseMedia(e)
            },
            attachCount: function() {
                return t.attachCount()
            },
            progress: function(e, n, r) {
                show(pe), t.showMediaProgress(e, n, r)
            },
            updateState: function(e) {
                L(e, e.get().peer, n)
            },
            focusOn: function(e) {
                Emoji.editableFocus(n, !1, !0)
            },
            setDraft: function(e, t) {
                e.setState({
                    tfdraft: t
                }), t && this.restoreDraft(e, i().getEditingMessage())
            },
            clearText: function(e, a) {
                g(a).clear(), t.unchooseMedia(), t.chosenMedias = [], Emoji.val(n, ""), w(a, r, i);
                var s = i().updateScroll();
                i().scrollFix(a, a.get().peer, s)
            },
            attachMessages: function(e, t) {
                if (e.get().peer === t) {
                    C(g(e), r, e);
                    var n = i().updateScroll();
                    i().scrollFix(e, t, n), O(e, r)
                }
            },
            cancelRecording: function() {
                u.cancelRecording()
            },
            reHeight: function(e) {
                var t = i().updateScroll();
                i().scrollFix(e, e.get().peer, t)
            },
            isBlocked: function() {
                return T(e.get().peer, e)
            },
            toggleStickers: function(e, t) {
                Emoji.toggleStickers(e.get().emojiOptId, !t)
            },
            saveText: function(e) {
                g(e).setText(Emoji.val(geByClass1("_im_text", r)))
            },
            unmount: function() {
                (0, V.destroyModule)(l), t.destroy(), o.unmount(), Emoji.destroy(e.get().emojiOptId), u.unmount()
            }
        }
    }

    function k(e, t) {
        return (0, H.isChatPeer)(e) ? t.get().tabs[e].data.kicked : !1
    }

    function T(e, t) {
        return k(e, t) || (0, U.getTab)(t, e) && (0, U.getTab)(t, e).block_error > 0 || (0, H.isLocksAvailable)(t) && (0, H.isPeerBlocked)(e, t)
    }

    function S(e, t, n) {
        var r = e.get().peer,
            a = Emoji.val(n);
        (0, H.isReservedPeer)(r) || g(e).dData.txt == a || T(r, e) || (t.checkMessageURLs(a, !0, ue), g(e).setText(a))
    }

    function I(e) {
        var t = e.get().peer;
        (0, H.isFullyLoadedTab)(e, t) && !(0, U.isAnyMessageBeingEdited)(e) && Date.now() - ((0, U.getTab)(e, t).lastTyping || 0) > 1e3 * j.TYPING_PERIOD && e.set(j.sendTyping.bind(null, t))
    }

    function M(e) {
        var t = g(e).getFwdRaw();
        t && window.showForwardBox({
            act: "a_show_forward_box",
            will_fwd: t.id,
            gid: e.get().gid
        })
    }

    function P(e, t, n) {
        switch (n.block_error) {
            case Z:
            case $:
                return getLang("mail_peer_deleted");
            case ae:
                return getLang("mail_community_deleted");
            case te:
                return getLang("mail_group_banned_messages");
            case X:
            case J:
            case ee:
            case se:
            case oe:
            case re:
                return (0, H.isCommunityPeer)(t) ? getLang("mail_send_privacy_community_error") : getLang("mail_send_privacy_error");
            case le:
                var r = (0, Q.oCacheGet)(e, t);
                return langSex(r.sex, getLang("mail_blacklist_user", "raw")).replace("{user}", r.kick_name);
            case ne:
                return getLang("mail_cant_send_messages_to_community");
            case ie:
                return getLang("mail_chat_youre_kicked");
            case 0:
                if (k(t, e)) return getLang("mail_chat_youre_kicked");
                var a = e.get().block_states[t].name;
                return getLang("mail_community_answering").replace("{username}", a);
            default:
                return getLang("mail_send_privacy_error")
        }
    }

    function L(e, t, n) {
        var r = gpeByClass("_im_chat_input_parent", n),
            a = geByClass1("_im_chat_input_error", r);
        if (T(t, e)) {
            n.disabled = !0;
            var i = P(e, t, (0, U.getTab)(e, t));
            return addClass(n, "im-chat-input--text_disabled"), addClass(r, "im-chat-input_error"), addClass(geByClass1("_im_page_history"), "is_tf_blocked"), n.contentEditable = "false", val(a, i), !0
        }
        return n.disabled && (n.disabled = !1, removeClass(r, "im-chat-input_error"),
            n.contentEditable = "true", removeClass(n, "im-chat-input--text_disabled"), removeClass(geByClass1("_im_page_history"), "is_tf_blocked"), val(a, "")), !1
    }

    function A(e, t, n) {
        return (0, H.isVoiceMessageAvailable)(e).then(function(r) {
            if (!r && !(0, U.isAnyMessageBeingEdited)(e)) return !0;
            var a = null != n ? n : Emoji.val(geByClass1("_im_text", t));
            return trim(a) ? (0, U.isAnyMessageBeingEdited)(e) ? !(0, H.isMessageTooLong)(a) : !0 : g(e).hasAttaches()
        })
    }

    function O(e, t, n) {
        var r = geByClass1("_im_send", t.parentNode);
        a(r, {
            fasthide: !0
        }), A(e, t, n).then(function(t) {
            if ((0, U.isAnyMessageBeingEdited)(e)) toggleClass(r, "is_input_empty", !t), attr(r, "aria-label", getLang("mail_im_edit"));
            else {
                toggleClass(r, "im-send-btn_audio", !t), toggleClass(r, "im-send-btn_send", t), t && removeClass(r, "im-send-btn_saudio");
                var n = t ? getLang("mail_send2") : getLang("mail_added_audiomsg");
                attr(r, "aria-label", n)
            }
        })
    }

    function D(e) {
        var t = ge(pe),
            n = t.offsetHeight;
        toggleClass(e, "im-chat-input--overflowed", n > 400)
    }

    function x(e, t, n, r) {
        if (38 === r.which && n().isEmpty(e) && !t().getEditingMessage() && !Emoji.shown && !hasAccessibilityMode() && !(0, j.isAnythingLoading)(e.get())) {
            var a = (0, W.findLastMessageToEdit)(e, (0, U.getCurrentTab)(e));
            a && t().startEditing((0, U.getMessage)(e, e.get().peer, a))
        }
    }

    function R(e, t, n) {
        cur.share_timehash = t.get().share_timehash;
        var r = (0, V.createMutations)(E),
            i = r.callMutations,
            s = r.bindMutations,
            l = (0, K.mount)(e, t, i),
            c = f.bind(null, t);
        ls.remove("im_send_queue_2" + vk.id), ls.remove("im_send_queue_1" + vk.id);
        var d = (0, G.initQueue)(c, p.bind(null, t), {
                store: "ls",
                key: "im_send_queue_" + vk.id,
                waitCommit: !0
            }),
            g = d.pushMessage,
            y = d.inspectQueue,
            C = d.resend,
            k = d.setErrored,
            T = d.complete,
            S = o.bind(null, t, n, g, i, e),
            I = M.bind(null, t);
        hide(geByClass1("ms_items_more_helper", e));
        var P = [
            ["video", getLang("profile_wall_video")],
            ["audio", getLang("profile_wall_audio")],
            ["doc", getLang("profile_wall_doc")],
            ["map", getLang("profile_wall_map")],
            ["gift", getLang("profile_wall_gift")]
        ];
        (t.get().moneyTransferAvail || t.get().moneyRequestAvail) && P.push(["money", getLang("profile_wall_money")]), P.unshift(["photo", getLang("mail_added_photo")]);
        var L = new MediaSelector(geByClass1(ce, e), pe, P, {
                maxShown: 0,
                vectorIcon: !0,
                onAddMediaChange: function(r, a, i, s) {
                    return v(n, t, O, e, r, a, i, s, L)
                },
                editable: 1,
                onChangedSize: function() {
                    var r = n().updateScroll();
                    n().scrollFix(t, t.get().peer, r), D(e)
                },
                sortable: 1,
                teWidth: 150,
                mail: 1,
                teHeight: 100,
                forceToUp: !0,
                toId: t.get().gid ? -t.get().gid : void 0,
                blockPersonal: t.get().gid ? 1 : 0,
                docParams: t.get().gid ? {
                    imhash: t.get().upload_doc_opts.opts.imhash,
                    from: "from_gim"
                } : {}
            }),
            O = m.bind(null, t, n, g, e, i, L),
            R = b.bind(null, t, e),
            B = geByClass1("_im_send", e),
            H = o.bind(null, t, n, g, i, e),
            q = (0, F.mount)(e, t, H, function() {
                addClass(B, "im-send-btn_audio"), removeClass(B, "im-send-btn_static")
            });
        h(e, t), t.get().textMediaSelector = L, t.set(j.initTextStore.bind(null, y, C, k, T));
        var z = geByClass1("_im_text", e);
        setTimeout(function() {
            (0, U.getPeer)(t) && i().setDraft(t, (0, U.getTabDraft)((0, U.getCurrentTab)(t))), _(t, e, L, O, S, l, n)
        }, 0);
        var W = w.bind(null, t, e, n),
            Y = u.bind(null, t),
            Q = (0, V.createModule)({
                handlers: function(r, s) {
                    r(B, "click", function() {
                        A(t, e).then(function(e) {
                            e || (0, U.isAnyMessageBeingEdited)(t) ? O([]) : (a(B, {
                                fasthide: !0
                            }), q.start(), setTimeout(function() {
                                return removeClass(B, "im-send-btn_saudio")
                            }, 300))
                        })
                    }), r(B, "mouseover", R), r(z, "focus", function() {
                        t.get().longpoll.push([N.transitionEvent("message")]), cur.focused = t.get().peer
                    }), r(z, "blur", function() {
                        var e = 0 === t.get().peer ? "search" : "default";
                        t.get().longpoll.push([N.transitionEvent(e)]), cur.focused = !1
                    }), s(e, "click", me, W), s(e, "click", "_im_will_fwd", I), s(e, "keydown", "_im_text", function(e) {
                        return x(t, n, i, e)
                    }), s(bodyNode, "click", fe, Y)
                }
            });
        return s(t, L, z, e, O, n, y, l, Q, q)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = R;
    var B = n(132),
        N = r(B),
        F = n(106),
        j = n(46),
        H = n(20),
        U = n(139),
        G = n(119),
        q = n(140),
        z = n(36),
        V = n(83),
        K = n(101),
        W = n(135),
        Y = n(68),
        Q = n(66),
        X = 4,
        $ = 5,
        J = 6,
        Z = 7,
        ee = 9,
        te = 11,
        ne = 12,
        re = 13,
        ae = 14,
        ie = 16,
        se = 19,
        oe = 20,
        le = 23,
        ue = 2e3,
        ce = "_im_media_selector",
        de = "_im_media_fwd",
        me = "_im_fwd_close",
        fe = "_im_submit_btn",
        pe = "_im_media_preview"
}, function(e, t, n) {
    "use strict";
    var r = n(65),
        a = {};
    a[n(17)("toStringTag")] = "z", a + "" != "[object z]" && n(59)(Object.prototype, "toString", function() {
        return "[object " + r(this) + "]"
    }, !0)
}, function(e, t, n) {
    "use strict";
    var r = n(131),
        a = n(108),
        i = n(59),
        s = n(99),
        o = n(114),
        l = n(18),
        u = n(71),
        c = n(2),
        d = n(102),
        g = n(17)("iterator"),
        m = !([].keys && "next" in [].keys()),
        f = "@@iterator",
        p = "keys",
        _ = "values",
        h = function() {
            return this
        };
    e.exports = function(e, t, n, v, b, y, C) {
        u(n, t, v);
        var w, E, k, T = function(e) {
                if (!m && e in P) return P[e];
                switch (e) {
                    case p:
                        return function() {
                            return new n(this, e)
                        };
                    case _:
                        return function() {
                            return new n(this, e)
                        }
                }
                return function() {
                    return new n(this, e)
                }
            },
            S = t + " Iterator",
            I = b == _,
            M = !1,
            P = e.prototype,
            L = P[g] || P[f] || b && P[b],
            A = L || T(b),
            O = b ? I ? T("entries") : A : void 0,
            D = "Array" == t ? P.entries || L : L;
        if (D && (k = d(D.call(new e)), k !== Object.prototype && (c(k, S, !0), r || o(k, g) || s(k, g, h))), I && L && L.name !== _ && (M = !0, A = function() {
                return L.call(this)
            }), r && !C || !m && !M && P[g] || s(P, g, A), l[t] = A, l[S] = h, b)
            if (w = {
                    values: I ? A : T(_),
                    keys: y ? A : T(p),
                    entries: O
                }, C)
                for (E in w) E in P || i(P, E, w[E]);
            else a(a.P + a.F * (m || M), t, w);
        return w
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e, t) {
        domData(e, "ts") !== t.date && (e.innerHTML = t.text, domData(e, "ts", t.date), setStyle(e, {
            visibility: "visible"
        }))
    }

    function s(e, t, n, r) {
        var a = e instanceof Array ? e : geByClass("_im_bar_date", e),
            i = t.contHeight();
        y["default"].onNewMessagesChunk();
        var s = a.reduce(function(e, t) {
                return e[domData(t, "date")] = [t.offsetTop + L, i, t], e
            }, {}),
            o = !n && r.barMap ? r.barMap : {};
        return r.barMap = extend(o, s), r.barMapKeys = Object.keys(r.barMap).sort(), Promise.resolve(r)
    }

    function o(e, t) {
        return t.barMapKeys.forEach(function(n) {
            t.barMap[n][0] -= e
        }), Promise.resolve(t)
    }

    function l(e, t, n, r, a) {
        var i = e.get().barMap[t],
            s = (0, h.isClassicInterface)(a) ? P : M;
        return n - (i[0] + n - i[1]) + r - s
    }

    function u(e, t) {
        var n = e.get().barMap[t][2];
        return {
            text: n.textContent,
            date: domData(n, "date")
        }
    }

    function c(e, t, n, r) {
        return r.barTransition = r.barMap[t][2], n > 0 ? (addClass(r.barMap[t][2], "im-page--date-bar-transition-inverse"), addClass(e, "im-page--date-bar-transition-inverse")) : 0 > n && (removeClass(r.barMap[t][2], "im-page--date-bar-transition-inverse"), removeClass(e, "im-page--date-bar-transition-inverse")), addClass(r.barMap[t][2], "im-page--date-bar-transition"), addClass(e, "im-page--date-bar-transition"), Promise.resolve(r)
    }

    function d(e, t) {
        return t.barTransition && (removeClass(t.barTransition, "im-page--date-bar-transition"), t.barTransition = null), removeClass(e, "im-page--date-bar-transition"), Promise.resolve(t)
    }

    function g(e, t, n, r, a) {
        var i = e.get(),
            s = void 0,
            o = void 0,
            c = n - t;
        i.barMapKeys.forEach(function(t) {
            var i = l(e, t, n, r, a);
            if (i >= c) {
                var u = s ? l(e, s, n, r, a) : n;
                s = u > i ? t : s
            } else if (c > i) {
                var d = o ? l(e, o, n, r, a) : 0;
                o = i > d ? t : o
            }
        });
        var d = {};
        return [
            [o, "prev"],
            [s, "cur"]
        ].forEach(function(t) {
            var i = _(t, 2),
                s = i[0],
                o = i[1];
            s && (d[o + "Bar"] = u(e, s), d[o + "Left"] = l(e, s, n, r, a) - c)
        }), d
    }

    function m(e) {
        var t = geByClass1("_im_mess", e),
            n = domData(t, "ts");
        return t && n ? {
            text: getShortDate(intval(n), !1, !0, getLang("months_of", "raw")),
            date: n
        } : null
    }

    function f(e, t, n, r, s) {
        var o = e.get(),
            l = (0, v.isEverythingLoaded)(o),
            u = t.get(),
            f = s.scrollTop(),
            p = u.lastTop ? u.lastTop - f : 0;
        u.lastTop = f;
        var _ = (0, E.isPinnedMessageVisibleInTab)(o, o.peer) ? T : 0,
            b = ((0, h.isClassicInterface)(e) ? k + _ : 0) - S / 2,
            y = s.contHeight(),
            C = g(t, f, y, b, e),
            w = C.prevBar,
            I = C.curBar,
            M = C.prevLeft,
            P = "translateY(0px)",
            L = !1,
            A = !1,
            O = !1;
        I || l || (I = m(r)), I ? L = I : A = !0, w && I && M > -S && 0 > M && (O = !0, A = !1, L = I, P = "translateY(" + (-S - M) + "px)"), L && i(n, L), O ? t.set(c.bind(null, n, w.date, p)) : t.set(d.bind(null, n)), P && setStyle(n, a({}, cssTransformProp, P)), toggleClass(n, "im-page--top-date-bar_no-b", A)
    }

    function p(e, t) {
        var n = geByClass1("_im_top_date_bar"),
            r = (0, w["default"])({
                lastTop: !1,
                barMap: {},
                barMapKeys: []
            }),
            a = null,
            i = null,
            l = null,
            u = debounce(function(e) {
                r.set(s.bind(null, t, e, !1))
            }, 500);
        return {
            reset: function(a) {
                r.set(s.bind(null, t, a, !0)).then(function() {
                    f(e, r, n, t, a)
                })
            },
            disable: function() {
                r.reset()
            },
            heightIncreased: function(e, t) {
                return u(t), r.set(o.bind(null, e))
            },
            parseMore: function(a, i) {
                r.set(s.bind(null, a, i, !1)).then(function() {
                    f(e, r, n, t, i)
                })
            },
            toggle: function(e) {
                e ? setStyle(n, {
                    display: ""
                }) : hide(n)
            },
            show: function() {
                i = Date.now(), l || (addClass(geByClass1("_im_page_history"), "im-page--top-date-bar_visible"), l = setInterval(function() {
                    Date.now() - i > A && (removeClass(geByClass1("_im_page_history"), "im-page--top-date-bar_visible"), clearInterval(l), l = null)
                }, O))
            },
            update: function(i) {
                a && (clearTimeout(a), a = null), a = setTimeout(function() {
                    f(e, r, n, t, i)
                }, I), f(e, r, n, t, i)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var _ = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && o["return"] && o["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.setCurrentDateBar = i, t.mount = p;
    var h = n(20),
        v = n(46),
        b = n(89),
        y = r(b),
        C = n(78),
        w = r(C),
        E = n(121),
        k = 68,
        T = 52,
        S = 32,
        I = 300,
        M = 20,
        P = 68,
        L = 10,
        A = 2e3,
        O = 100
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t, n, r, a, i) {
        (0, S.toggleConversation)(!1), removeClass(t, "im-create_shown"), removeClass(t, "im-create_photo-attached"), setTimeout(s.bind(null, t, !1), 100);
        var o = g(i);
        o.map(function(e) {
            return geByClass1("_im_dialog" + e)
        }).forEach(function(e) {
            removeClass(e, "olist_item_wrap_on")
        }), n().createCanceled(e, r), a.resetSelection(), "add_member" === e.get().creationType && e.set(S.setCreationType.bind(null, "chat", [])), e.set(S.presetAvatar.bind(null, !1));
        var u = geByClass1(V, t);
        l(e, i, t), uiSearch.reset(geByClass1(j, t)), uiSearch.reset(geByClass1(H, t)), u && u.parentNode.removeChild(u), l(e, i, t), cancelStackFilter("im_search");
        var c = 0 === e.get().peer ? "search" : "default";
        e.get().longpoll.push([(0, x.transitionEvent)(c)]), attr(t, "aria-hidden", "true")
    }

    function i(e, t, n) {
        return t && (n.current_create_peer_ids = {}, n.current_create_peers = []), n.current_create_peer_ids || (n.current_create_peer_ids = {}), n.current_create_peers || (n.current_create_peers = []), e.forEach(function(e) {
            e.then(function(e) {
                e = e.filter(function(e) {
                    return !n.current_create_peer_ids[e.peerId]
                }), n.current_create_peer_ids = e.reduce(function(e, t) {
                    return e[t.peerId] = !0, e
                }, n.current_create_peer_ids), n.current_create_peers = n.current_create_peers.concat(e)
            })
        }), Promise.resolve(n)
    }

    function s(e, t) {
        toggleClass(e, "im-create_material", t)
    }

    function o(e, t, n, r, i, s) {
        a(e, t, n, !1, i, s), e.get().longpoll.push([(0, x.changePeer)(r)])
    }

    function l(e, t, n) {
        var r = geByClass1(q, n),
            a = t.get().selection.length,
            i = "add_member" === e.get().creationType,
            s = a > 0,
            o = a > 1;
        i ? val(r, 1 === a ? getLang("mail_append_chat") : getLang("mail_im_create_chat_with")) : (val(r, o ? getLang("mail_im_create_chat") : getLang("mail_im_go_to_dialog")), toggleClass(n, "im-create_chat-details", o)), toggleClass(n, "im-create_tools", s), toggleClass(r, "button_disabled", !s)
    }

    function u(e, t, n, r, a, i, s) {
        if (s) {
            var o = intval(domData(s, "list-id")),
                u = g(i),
                c = trim(s.textContent),
                d = geByClass1(H, t),
                m = getSize(d)[1],
                f = void 0;
            inArray(o, u) ? (f = r.removeSelection(o, c), removeClass(s, "olist_item_wrap_on")) : (f = r.addSelection(o, c), addClass(s, "olist_item_wrap_on")), f.then(function() {
                var e = m - getSize(d)[1],
                    t = a.scrollTop();
                a.scrollTop(t - e)
            }), l(e, i, t);
            var p = geByClass1(H, t);
            uiSearch.reset(p)
        }
    }

    function c(e, t) {
        var n = g(e),
            r = ["_im_dialog", "_im_dialog" + t.peerId, "im-creation--item"],
            a = [];
        return t.online && a.push("online"), mobPlatforms[t.online] && a.push("mobile"), inArray(t.peerId, n) && r.push("olist_item_wrap_on"), getTemplate("im_owner_item", {
            owner_id: t.peerId,
            cls: " " + r.join(" "),
            photo: t.photo,
            name: t.name,
            link: t.href,
            img_cls: a.join(" ")
        })
    }

    function d(e) {
        return (0, I.getSearchText)(e) || !1
    }

    function g(e) {
        return e.get().selection.map(function(e) {
            return e.id
        })
    }

    function m(e, t, n, r) {
        toggleClass(e, "im-create_chat", "chat" === r.get().creationType), toggleClass(e, "im-create_invite", "add_member" === r.get().creationType);
        var a = "chat" === r.get().creationType ? getLang("mail_im_group_dialog") : getLang("mail_im_friends_tab"),
            i = geByClass1("_im_create_title", e);
        val(i, a), val(geByClass1(q, e), "add_member" === r.get().creationType ? getLang("mail_im_create_chat_with") : getLang("mail_im_create_chat"));
        var s = n.get().selection.map(function(e) {
            return e.id
        });
        p(e, r, t, !1, s), (0, P.fixTableCellChildHeight)("_im_create_wrap_safe", e)
    }

    function f(e, t, n) {
        return e.then(function(e) {
            return e.filter(function(e) {
                return e.is_friend && !inArray(e.peerId, n.get().creationFilter)
            })
        })
    }

    function p(e, t, n, r, a) {
        var s = geByClass1(H, e),
            o = void 0,
            l = void 0,
            u = (0, S.searchLocalHints)(r, t.get()),
            c = n.hoverFirstElement.bind(n, K, E(t));
        t.get().creation_shown_all = !1, n.reset(), n.pipe(f(u, r, t), r), n.toTop(), r ? (l = (0, S.searchTopConv)(r, t.get()), o = (0, S.searchHintsIndex)(r, [], "friends", t.get()), n.pipe(f(o, r, t), r).then(c), n.pipe(f(l, r, t), r).then(c)) : (o = Promise.resolve([]), l = Promise.resolve([])), t.set(i.bind(null, [u, l, o], !0)), uiSearch.showProgress(s), Promise.all([u, o, l]).then(function() {
            return uiSearch.hideProgress(s)
        })
    }

    function _(e, t, n, r, a, i, s, o) {
        uiTabs.switchTab(o.firstElementChild);
        var l = domData(o, "type");
        switch (l) {
            case "chat":
                i.restore()
        }
        e.set(S.setCreationType.bind(null, l, [])).then(m.bind(null, t, r, a))
    }

    function h(e, t, n, r) {
        var a = r.get(),
            i = d(a),
            s = a.selection.map(function(e) {
                return e.id
            });
        n.unhoverElements(K), e.get().creationQuery = i, p(t, e, n, i, s)
    }

    function v(e, t, n, r) {
        var a = 2e9 + Math.round(rand(1e6, 2e6));
        cur.recieveCropResult = function(n) {
            cur.recieveCropResult = !1, curBox() && curBox().hide(), e.set(S.presetAvatar.bind(null, n)), (0, S.getOwnerPhoto)(n, a).then(function(e) {
                geByClass1(U, t).appendChild(ce("img", {
                    className: "im-chat-placeholder--img " + V,
                    src: e
                }))
            }), addClass(t, "im-create_photo-attached")
        }, Page.ownerPhoto(a)
    }

    function b(e, t) {
        geByClass1(U, t).innerHTML = "", e.set(S.presetAvatar.bind(null, !1)), removeClass(t, "im-create_photo-attached")
    }

    function y(e, t, n, r, i, s) {
        g(t).map(function(e) {
            return geByClass1("_im_dialog" + e)
        }).forEach(function(e) {
            return removeClass(e, "olist_item_wrap_on")
        }), t.reset(), p(n, e, r, !1, g(t)), i.resetSelection(), a(e, n, s, !1, i, t)
    }

    function C(e, t, n, r, i, s, l) {
        function u(a) {
            y(e, t, n, r, i, s), o(e, n, s, a, i, t), unlockButton(m), (0, I.isSearching)(e) ? s().cancelSearch(e) : s().restoreDialogs(e)
        }
        var c = g(t),
            d = e.get(),
            m = geByClass1(q, n),
            f = uiSearch.getFieldEl(geByClass1(j, n)).value;
        return c.length < 0 ? void 0 : "add_member" === e.get().creationType ? (e.set(S.addNewMember.bind(null, d.peer, c))["catch"](function(e) {
            return showFastBox(getLang("global_error"), e)
        }), a(e, n, s, "", i, t)) : (lockButton(m), 1 === c.length ? u(c[0]) : void e.set(S.createChat.bind(null, d.next_chat_avatar, c, f)).then(function() {
            return u(d.next_peer)
        })["catch"](function(e) {
            unlockButton(m), topMsg(getLang("global_unknown_error"), 2, "#FFB4A3")
        }))
    }

    function w(e, t) {
        return showTooltip(e, {
            text: getLang("mail_cancel"),
            black: 1,
            zIndex: 1e3,
            shift: [3, -2],
            appendCls: "js-im-page"
        })
    }

    function E(e, t) {
        var n = 70,
            r = t && t.get().selection.length;
        return {
            top: -1,
            bottom: (0, P.isClassicInterface)(e) ? r > 0 ? n - 1 : 0 : -1
        }
    }

    function k(e, t, n, r, i, o, l, c) {
        return {
            show: function(t) {
                var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
                t.setState({
                    shown: !0
                }), s(e, !0), cancelStackPush("im_create", l), addClass(e, "im-create_shown"), a && a.forEach(function(e) {
                    return i.addSelection(e[0], e[1])
                }), m(e, n, r, t), setTimeout(function() {
                    t.get().longpoll.push([(0, x.transitionEvent)("create")]), attr(e, "aria-hidden", "false"), i.focus()
                }, 1)
            },
            focusSearch: function(e) {
                i.focus()
            },
            confirmCreate: function(e) {
                c()
            },
            hide: function(n) {
                n.get().shown = !1, a(n, e, t, !1, i, r)
            },
            scroll: function(e) {
                n.scrollPage(e, !0)
            },
            updateScroll: function() {
                (0, P.fixTableCellChildHeight)("_im_create_wrap_safe", e), n.updateScroll()
            },
            selectElement: function(a) {
                u(a, e, t, i, n, r, n.getHoveredElement())
            },
            hoverPrevElement: function(e) {
                n.hoverPrevElement(K, null, E(e, r))
            },
            hoverNextElement: function(e) {
                n.hoverNextElement(K, null, E(e, r))
            },
            unmount: function() {
                (0, A.destroyModule)(o), n.unmount(), i.unmount(), cancelStackFilter("im_create"), cur.recieveCropResult = void 0
            }
        }
    }

    function T(e, t, n) {
        var r = (0, D["default"])({
                selection: []
            }),
            s = geByClass1(B, e),
            o = (0, M.mount)(s, (0, D["default"])({
                offset: 0,
                limit: W,
                elements: [],
                elCls: N
            }), function() {
                return {
                    idFn: function(e) {
                        return intval(e.peerId)
                    },
                    hoverableFn: function(e) {
                        return hasClass(e, "_im_dialog")
                    },
                    renderFn: c.bind(null, r),
                    more: function(e, n) {
                        var a = void 0;
                        return t.get().shown ? (t.get().creation_shown_all || d(r) !== !1 ? a = Promise.resolve([]) : (t.get().creation_shown_all = !0, a = (0, S.searchTopConv)(d(r), t.get())), t.set(i.bind(null, [a], !1)), f(a, d(r), t)) : Promise.resolve(!1)
                    },
                    onClick: function(a, i) {
                        checkEvent(a) || (u(t, e, n, m, o, r, i), cancelEvent(a))
                    }
                }
            });
        t.get().creationQuery = !1, t.get().creationType = "chat";
        var g = geByClass1(H, e),
            m = (0, L.mount)(g, r, function() {
                return {
                    selectionDeleted: function(n, r) {
                        l(t, n, e), removeClass(geByClass1("_im_dialog" + r), "olist_item_wrap_on")
                    },
                    onChange: h.bind(null, t, e, o)
                }
            }),
            p = a.bind(null, t, e, n, "cross", m, r),
            E = _.bind(null, t, e, n, o, r, m),
            T = v.bind(null, t, e),
            I = b.bind(null, t, e),
            P = y.bind(null, t, r, e, o, m, n),
            O = C.bind(null, t, r, e, o, m, n),
            x = geByClass1(R, e),
            j = (0, A.createModule)({
                handlers: function(t, n) {
                    t(x, "click", p), t(x, "mouseover", w.bind(null, x)), t(geByClass1(U, e), "click", T), t(geByClass1(G, e), "click", I), t(geByClass1(z, e), "click", P), t(geByClass1(q, e), "click", O), t(e, "mouseover", throttle(o.unhoverElements.bind(o, K), 100)), n(e, "click", F, E)
                }
            });
        return k(e, n, o, r, m, j, p, O)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = T;
    var S = n(46),
        I = n(139),
        M = n(49),
        P = n(20),
        L = n(26),
        A = n(83),
        O = n(78),
        D = r(O),
        x = n(132),
        R = "_im_create_cancel",
        B = "_im_create_list",
        N = "_im_dialog",
        F = "_im_create_tab",
        j = "_im_dialogs_creation_name",
        H = "_im_create_select",
        U = "_im_create_avatar",
        G = "_im_create_remove_avatar",
        q = "_im_confirm_creation",
        z = "_im_cancel_creation",
        V = "_im_avatar_img",
        K = ["im-creation--item_hovered"],
        W = 100
}, function(e, t) {
    var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = n)
}, function(e, t, n) {
    "use strict";
    var r = n(54).f,
        a = n(24),
        i = (n(99), n(37)),
        s = n(81),
        o = n(14),
        l = n(136),
        u = n(58),
        c = n(40),
        d = n(125),
        g = n(50),
        m = n(70),
        f = n(95).fastKey,
        p = m ? "_s" : "size",
        _ = function(e, t) {
            var n, r = f(t);
            if ("F" !== r) return e._i[r];
            for (n = e._f; n; n = n.n)
                if (n.k == t) return n
        };
    e.exports = {
        getConstructor: function(e, t, n, c) {
            var d = e(function(e, r) {
                o(e, d, t, "_i"), e._i = a(null), e._f = void 0, e._l = void 0, e[p] = 0, void 0 != r && u(r, n, e[c], e)
            });
            return i(d.prototype, {
                clear: function() {
                    for (var e = this, t = e._i, n = e._f; n; n = n.n) n.r = !0, n.p && (n.p = n.p.n = void 0), delete t[n.i];
                    e._f = e._l = void 0, e[p] = 0
                },
                "delete": function(e) {
                    var t = this,
                        n = _(t, e);
                    if (n) {
                        var r = n.n,
                            a = n.p;
                        delete t._i[n.i], n.r = !0, a && (a.n = r), r && (r.p = a), t._f == n && (t._f = r), t._l == n && (t._l = a), t[p]--
                    }
                    return !!n
                },
                forEach: function(e) {
                    o(this, d, "forEach");
                    for (var t, n = s(e, arguments.length > 1 ? arguments[1] : void 0, 3); t = t ? t.n : this._f;)
                        for (n(t.v, t.k, this); t && t.r;) t = t.p
                },
                has: function(e) {
                    return !!_(this, e)
                }
            }), m && r(d.prototype, "size", {
                get: function() {
                    return l(this[p])
                }
            }), d
        },
        def: function(e, t, n) {
            var r, a, i = _(e, t);
            return i ? i.v = n : (e._l = i = {
                i: a = f(t, !0),
                k: t,
                v: n,
                p: r = e._l,
                n: void 0,
                r: !1
            }, e._f || (e._f = i), r && (r.n = i), e[p]++, "F" !== a && (e._i[a] = i)), e
        },
        getEntry: _,
        setStrong: function(e, t, n) {
            c(e, t, function(e, t) {
                this._t = e, this._k = t, this._l = void 0
            }, function() {
                for (var e = this, t = e._k, n = e._l; n && n.r;) n = n.p;
                return e._t && (e._l = n = n ? n.n : e._t._f) ? "keys" == t ? d(0, n.k) : "values" == t ? d(0, n.v) : d(0, [n.k, n.v]) : (e._t = void 0, d(1))
            }, n ? "entries" : "values", !n, !0), g(t)
        }
    }
}, , function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }

    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e) {
        return e.resync_in_process ? e.resync_in_process : Promise.resolve(!1)
    }

    function s(e) {
        if (!e.renew_hashes) {
            var t = e.last_hashes_update || 0;
            if (Date.now() - t < 1e4) return Promise.resolve();
            var n = Object.keys(e.tabs).filter(function(t) {
                return (0, Vt.isFullyLoadedTab)(e, t)
            });
            e.renew_hashes = (0, Ft.post)(Ft.CONTROLLER, {
                act: "a_renew_hash",
                peers: n.join(","),
                gid: e.gid
            }).then(function(t) {
                var r = Nt(t, 1),
                    a = r[0];
                return n.forEach(function(t) {
                    e.tabs[t].hash = a[t]
                }), delete e.renew_hashes, e.last_hashes_update = Date.now(), e
            })
        }
        return e.renew_hashes
    }

    function o(e, t, n) {
        return i(e).then(function(r) {
            return r ? t.apply(void 0, n) : s(e).then(function(e) {
                return t.apply(void 0, n)
            })
        })
    }

    function l(e) {
        return function() {
            var t = arguments,
                n = t[t.length - 1];
            return e.apply(void 0, t)["catch"](function(r) {
                if (r && r.match && r.match(/1001;/)) return o(n, e, t);
                throw r
            })
        }
    }

    function u(e) {
        return "string" == typeof e ? se("<div>" + e + "</div>") : e
    }

    function c(e, t) {
        var n = e ? e.indexOf(t) : 0; - 1 === n && e.push(t)
    }

    function d(e, t) {
        var n = e ? e.indexOf(t) : -1; - 1 !== n && e.splice(n, 1)
    }

    function g(e) {
        return "string" == typeof e ? e : e.innerHTML
    }

    function m(e, t) {
        return t.block_states = extend(t.block_states, e), Promise.resolve(t)
    }

    function f(e, t, n, r, a) {
        return a.tabHistoryNotChanged = !1, (0, Gt.retryFn)(Ft.post, 3, function(e) {
            return e - 1
        })(Ft.CONTROLLER, {
            act: "a_start",
            peer: e,
            msgid: n,
            history: t,
            prevpeer: a.prevPeer,
            gid: a.gid,
            block: r
        }).then(function(t) {
            var r = Nt(t, 5),
                i = r[0],
                s = r[1],
                o = r[2],
                l = r[3],
                u = r[4];
            if (s.forEach(function(e) {
                    return (0, Qt.oCacheAdd)(a, e)
                }), a.tabs || (a.tabs = {}), a.dialog_tab_cts = u, a.tabs[e] || (a.tabs[e] = (0, Vt.normalizeTab)(a, i)), m(l, a), n) {
                if (a.tabs[e]) {
                    var c = a.tabs[e].lastmsg,
                        d = a.tabs[e].lastmsg_meta;
                    extend(a.tabs[e], i), a.tabs[e].lastmsg = c, a.tabs[e].lastmsg_meta = d
                }
            } else extend(a.tabs[e], i);
            return a.admins = extend(a.admins, o), a.imQueue(e, !1), Bt(), p(e, a)
        })["catch"](function(e) {
            return (0, Xt.imWeirdCatch)("loadPeer", e)
        })
    }

    function p(e, t) {
        var n = t.imQueue(e, !1),
            r = t.tabs[e],
            a = n.filter(function(n) {
                return !(0, Wt.isRidExist)(t, e, n.rid)
            });
        return r.msgs = a.reduce(function(e, t) {
            return e["rid" + t.rid] = t.mess, e
        }, r.msgs), t.imQueueSet(e, a), t.tabs[e].history = (0, Vt.restoreQueue)(a, t, u(t.tabs[e].history)), Promise.resolve(t)
    }

    function _(e, t, n) {
        var r = n.imQueue(e, !1).filter(function(e) {
            return e.failed && e.mess.messageId !== t
        });
        return n.imQueueSet(e, r), n.tabs[e].history = (0, Vt.removeMessages)([t], u(n.tabs[e].history)), Promise.resolve(n)
    }

    function h(e, t) {
        return (t.block_states[e] || {}).free === !1 ? Promise.resolve(t) : (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_block",
            peer: e,
            prevPeer: t.prevPeer,
            gid: t.gid
        }).then(function(e) {
            var n = Nt(e, 1),
                r = n[0];
            return m(r, t)
        })
    }

    function v(e, t) {
        var n = t.peer;
        return Promise.resolve(t).then(function(t) {
            return t.tabHistoryNotChanged = !1, (0, Vt.isFullyLoadedTab)(t, n) && !t.tabs[n].msgid ? (t.gid && h(n, t), Promise.resolve(t).then(E)) : ((0, Vt.isFullyLoadedTab)(t, n) && (t.tabs[n].msgid = !1), f(n, e, !1, !0, t))
        }).then(E).then(b.bind(null, n))
    }

    function b(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
        return (0, Vt.isTabLoaded)(t, e) && (t.tabs[e].last_touched = Date.now()), (0, Vt.isTabLoaded)(t, e) && n && (t.tabs[e].last_visited = Date.now()), t
    }

    function y(e, t, n) {
        var r = n.msgid,
            a = n.peer;
        return !e && (0, Vt.isFullyLoadedTab)(n, a) && n.tabs[a].msgs[r] ? (t === n.peer ? n.tabHistoryNotChanged = !0 : n.tabHistoryNotChanged = !1, n.gid && h(a, n), Promise.resolve(n).then(E).then(b.bind(null, a))) : f(a, !0, r, !0, n).then(E).then(function() {
            var e = (0, Wt.getTab)(n, a);
            return e.msgid = r, n
        }).then(b.bind(null, a))
    }

    function C(e, t, n) {
        if (Xe(n)) throw (0, Vt.showWaitUntilUploadedBox)(), new Error("Cant change peer while loading somethind");
        var r = n.gid ? "gim" + n.gid : "im";
        if (n.prevPeer = n.peer, n.peer = e, n.msgid = t || "", cur.peer = e, nn({
                sel: e ? (0, Vt.convertPeerToUrl)(e) : null,
                msgid: n.msgid,
                email: "",
                0: r
            }), 0 != n.prevPeer && b(n.prevPeer, n, !0), 0 !== e) {
            var a = [];
            (0, Vt.isTabLoaded)(n, e) && b(e, n, !0), a = n.tabbedPeers.map(function(e) {
                return e.peer
            }).indexOf(e) < 0 ? [{
                peer: e,
                type: "perm"
            }].concat(n.tabbedPeers) : n.tabbedPeers.map(function(t) {
                return t.peer == e && "perm" !== t.type && (t.type = "perm"), t
            }), mt(a, !1, n)
        } else mt(n.tabbedPeers, !1, n);
        return rn(), fe(n.prevPeer, n)
    }

    function w(e) {
        if (cur.wallMentions = [], (0, Vt.isChatPeer)(e.peer) && (0, Vt.isFullyLoadedTab)(e, e.peer)) {
            var t = e.tabs[e.peer],
                n = [];
            Object.keys(t.msgs || {}).reverse().forEach(function(e) {
                var r = (0, Wt.parserMessage)(t.msgs[e]),
                    a = r && r.userId;
                a && a != vk.id && -1 === n.indexOf(a) && (0, Vt.isUserAliveInChat)(t, a) && n.push(a)
            }), (t.memberIds || []).forEach(function(e) {
                -1 === n.indexOf(e) && n.push(e)
            }), n.forEach(function(t) {
                if ((0, Qt.oCacheExists)(e, t)) {
                    var n = (0, Qt.oCacheGet)(e, t),
                        r = n.link.substring(1);
                    cur.wallMentions.push([n.id, n.name, "@" + r, n.photo, void 0, void 0, void 0, r, n.first_name])
                }
            })
        }
    }

    function E(e) {
        var t = e.peer;
        if (0 === t) return Promise.resolve(e);
        var n = e.tabs[t],
            r = [];
        n.offset && r.push("photos"), n.offset && r.push("search"), (-2e9 > t || n.offset) && r.push("clear"), (0, Vt.isCommunityInterface)(e) && r.push("block"), (0, Vt.isCommunityPeer)(t) && (n.blocked_community ? r.push("allow_community") : r.push("block_community")), !(0, Vt.isChatPeer)(t) && !(0, Vt.isUserPeer)(t) || (0, Vt.isCommunityInterface)(e) || (0, Vt.isChatPeer)(t) && (n.data.kicked || n.data.closed) || (inArray(t, e.mutedPeers) ? r.push("unmute") : r.push("mute")), (0, Vt.isUserPeer)(t) && !e.gid && !n.blacklisted && n.is_friend && r.push("invite"), (0, Vt.isChatPeer)(t) && !n.data.closed && !n.data.kicked && n.data.link && r.push("invite_link"), !(0, Vt.isChatPeer)(t) || n.data.closed || n.data.kicked || r.push("topic", "avatar", "invite", "leave"), (0, Vt.isChatPeer)(t) && n.data.closed && !n.data.kicked && r.push("return"), (0, Vt.isChatPeer)(t) && n.pinned && (geByClass1("im-page--chat-header_hide-pin-actions") || (r.push((0, $t.isPinnedMessageVisibleInTab)(e, t) ? "pin_hide" : "pin_unhide"), r.push("unpin")));
        var a = (0, Vt.chatActions)(e);
        return e.curActions = r.sort(function(e, t) {
            return sn[e] - sn[t]
        }).reduce(function(e, t) {
            return e[t] = a[t], e
        }, {}), Promise.resolve(e)
    }

    function k(e, t, n) {
        var r = n.tabs[n.peer];
        return (0, Ft.post)(Ft.CONTROLLER, {
            peer: n.peer,
            whole: e,
            act: "a_history",
            offset: r.offset + (r.skipped || 0),
            toend: t,
            gid: n.gid
        }).then(function(e) {
            var t = Nt(e, 4),
                a = t[0],
                i = t[1],
                s = t[2],
                o = t[3];
            return r.allShown = s, n.admins = extend(n.admins, o), r.history = a + g(r.history), r.historyToAppend = a, r.offset += Object.keys(i).length, r.msgs = extend(r.msgs, i), n
        })
    }

    function T(e) {
        var t = e.tabs[e.peer];
        return (0, Ft.post)(Ft.CONTROLLER, {
            peer: e.peer,
            act: "a_history",
            rev: 1,
            offset: t.skipped,
            gid: e.gid
        }).then(function(n) {
            var r = Nt(n, 5),
                a = r[0],
                i = r[1],
                s = r[2];
            r[3], r[4], t.allShown = t.allShown || s, t.history = g(t.history) + a, t.historyToAppend = a;
            var o = Object.keys(i).length;
            return t.skipped -= o, t.offset += o, t.msgs = extend(t.msgs, i), e
        })
    }

    function S(e, t, n, r) {
        var a = e.tabs[t];
        return r === Ut.FLAG_OUTBOUND ? a.out_up_to = n : a.in_up_to = n, e
    }

    function I(e, t) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_email_start",
            email: e,
            hash: t.writeHash
        }).then(function(e) {
            var n = Nt(e, 2),
                r = n[0],
                a = n[1];
            return q(r, t), a
        })
    }

    function M(e) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_get_key",
            uid: e.id,
            gid: e.gid
        }).then(function(t) {
            var n = Nt(t, 3),
                r = n[0],
                a = n[1],
                i = n[2];
            return extend({}, e, {
                imKey: r,
                imUrl: a,
                imPart: i
            })
        })
    }

    function P(e) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_get_ts",
            gid: e.gid
        }).then(function(t) {
            var n = Nt(t, 1),
                r = n[0];
            return extend({}, e, {
                imTs: r
            })
        })
    }

    function L(e, t, n) {
        var r = n.tabs[e];
        return r.msgs[t.messageId] && (r.msgs[t.messageId].errored = 1, r.history = (0, Vt.setMessageError)(e, t, u(r.history))), Promise.resolve(n)
    }

    function A(e, t, n, r) {
        var a = r.tabs[e];
        return a.msgs[t] && (a.msgs[t].errored = 0, a.lastmsg_meta = n, a.lastmsg = t, a.history = (0, Vt.startResendMessage)(e, t, u(a.history))), Promise.resolve(r)
    }

    function O(e, t, n, r) {
        var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !1;
        t.deletedDialog || (e.dialog_tabs = Object.keys(e.dialog_tabs).reduce(function(e, i) {
            return !n && !nt(i)(t) || a && !a(i, e[i], t) || (e[i] = (0, qt.arrayUnique)(r(e[i], i))), e
        }, e.dialog_tabs))
    }

    function D(e, t) {
        return 0 === e.length ? Promise.resolve(t) : (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_get_admin",
            admins: e.join(","),
            gid: t.gid
        }).then(function(e) {
            var n = Nt(e, 1),
                r = n[0];
            return t.admins = extend(t.admins, r), t
        })
    }

    function x(e, t) {
        if (!inArray(e, t.tabbedPeers.map(function(e) {
                return e.peer
            })) && (0 !== t.peer || t.searchText) && !inArray(e, t.mutedPeers)) {
            var n = {
                peer: e,
                type: "temp"
            };
            mt(t.tabbedPeers.concat([n]), !1, t)
        }
    }

    function R(e, t, n) {
        return (0, Vt.isReversedDialogs)(n) ? t.concat([e]) : [e].concat(t)
    }

    function B(e, t) {
        var n = (0, Wt.getTab)(t, e.peerId);
        if ((0, Vt.isFullyLoadedTab)(t, e.peerId)) {
            var r = u(n.history);
            n.msgs[e.messageId] = extend(!0, {}, e), n.history = (0, Vt.editAndReplaceMessage)(t, e, r)
        }
        n && n.lastmsg == e.messageId && (n.lastmsg_meta = e);
        var a = n && n.pinned && (0, Wt.parserMessage)(n.pinned);
        return a && a.messageId == e.messageId && (n.pinned = e), Promise.resolve(t)
    }

    function N(e, t) {
        var n = e.flags & Ut.FLAG_OUTBOUND,
            r = e.peerId;
        if ((0, Vt.isTabLoaded)(t, r)) {
            var i = t.tabs[r];
            if (i.deletedDialog = !1, !t.msg_local_ids_sort && e.local ? t.msg_local_ids_sort = a({}, e.messageId, 0) : e.local && (t.msg_local_ids_sort[e.messageId] = Object.keys(t.msg_local_ids_sort).length), n ? i.unread = 0 : (i.lastmsg == e.messageId && i.unread ? F(t, 1, e.peerId) : (!i.unread && F(t, 1, e.peerId), i.unread++), x(e.peerId, t)), (0, Vt.isFullyLoadedTab)(t, r)) {
                var s = u(i.history);
                i.skipped > 0 && i.skipped++, i.offset++, i.msgs[e.messageId] = extend(!0, {}, e), i.history = (0, Vt.appendToHistory)(t, e, s, !0, !0, !0), (0, Yt.isOut)(e) && (i.blocked_community = 0, E(t))
            }
            return i.typing && i.typing[e.userId] && delete i.typing[e.userId], i.lastmsg = e.messageId, i.lastmsg_meta = e, b(e.peerId, t), O(t, i, !1, R.bind(null, r), st.bind(null, t)), Promise.resolve(t)
        }
        return f(r, 0, 0, 0, t).then(function(t) {
            var a = t.tabs[r];
            return O(t, a, !1, R.bind(null, r), st.bind(null, t)), b(e.peerId, t), n || x(e.peerId, t), t
        })
    }

    function F(e, t, n) {
        e.cur_unread_cnt || (e.cur_unread_cnt = {}), -1 === t && delete e.cur_unread_cnt[n], e.unread_cnt += t
    }

    function j(e, t) {
        if ((0, Vt.isFullyLoadedTab)(t, e.peerId)) {
            var n = t.tabs[e.peerId],
                r = n.unread;
            if (t = S(t, e.peerId, e.upToId, 0), null != e.unread ? n.unread = e.unread : n.unread = e.upToId >= n.lastmsg ? 0 : (0, Wt.countUnread)(e.peerId, t) + (n.unread > 0 ? +n.skipped : 0), r > 0 && !n.unread && F(t, -1, e.peerId), !n.skipped) {
                var a = u(n.history);
                n.history = (0, Vt.removewNewUnreadBarAndMerge)(t, a, e.peerId)
            }
        } else(0, Vt.isTabLoaded)(t, e.peerId) && (t.tabs[e.peerId].unread > 0 && F(t, -1, e.peerId), t.tabs[e.peerId].unread = 0, t.tabs[e.peerId].in_up_to = e.upToId);
        return (0, Vt.isTabLoaded)(t, e.peerId) && (t.dialog_tabs[Kt.FOLDER_UNREAD] = t.dialog_tabs[Kt.FOLDER_UNREAD].filter(function(t) {
            return intval(t) !== e.peerId
        })), 0 !== t.unread_cnt || t.active_tab !== Kt.FOLDER_UNREAD || t.gid ? Promise.resolve(t) : rt(Kt.FOLDER_ALL, t)
    }

    function H(e, t) {
        var n = t.tabs[e.peerId];
        if ((0, Vt.isTabLoaded)(t, e.peerId) && S(t, e.peerId, e.upToId, Ut.FLAG_OUTBOUND), (0, Vt.isFullyLoadedTab)(t, e.peerId)) {
            var r = u(n.history);
            n.history = (0, Vt.markMessagesAsRead)(t, e.peerId, r)
        }
        return Promise.resolve(t)
    }

    function U(e, t, n, r, a) {
        return a.text = {}, a.imQueue = e, a.imQueueResend = t, a.imQueueSet = n, a.imQueueComplete = r, Promise.resolve(a)
    }

    function G(e, t, n) {
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
                s = (0, Wt.getMessage)(n, t, i),
                o = (0, Wt.getAuthorFullName)(n, t, i);
            return o === !1 ? n.set(Le.bind(null, a({}, t, [s.userId]))).then(function(n) {
                var a = (0, Wt.getAuthorFullName)(n, t, i);
                return {
                    msgIds: e,
                    object: r(s, a)
                }
            }) : Promise.resolve({
                msgIds: e,
                object: r(s, o)
            })
        }
        return Promise.resolve({
            msgIds: e
        })
    }

    function q(e, t) {
        (0, Vt.normalizeTabsGotFromServer)(t, e);
        var n = t.tabs[t.peer];
        return t.tabs = Object.keys(e).reduce(function(n, r) {
            var a = t.tabs[r] ? t.tabs[r].msgs : {},
                i = extend({}, a || {}, e[r].msgs || {});
            return n[r] = extend(t.tabs[r] || {}, e[r]), i && (n[r].msgs = i), e[r].lastmsg || (n[r].lastmsg = !1), n
        }, t.tabs), n && (t.tabs[t.peer] = n), Promise.resolve(t)
    }

    function z(e, t, n, r) {
        var a = (0, Wt.getTab)(r, e);
        if (a) {
            var i = t !== !1 ? t == en ? 2 : mobPlatforms[t] ? 1 : 0 : a.last_seen[2];
            a.online = t, a.last_seen = [t, n || a.last_seen[1], i]
        }
        return Promise.resolve(r)
    }

    function V(e, t, n) {
        var r = (0, Wt.getTab)(n, e);
        return r && (r.typing || (r.typing = {}), r.typing[t] = Date.now()), Promise.resolve(n)
    }

    function K(e, t, n) {
        return (0, Gt.pause)(Jt + 2).then(function() {
            if ((0, Vt.isTabLoaded)(n, e)) {
                var r = n.tabs[e];
                if (r.typing) {
                    var a = Date.now() - (r.typing[t] || 0);
                    a >= 1e3 * Jt && delete r.typing[t]
                }
            }
            return n
        })
    }

    function W(e) {
        return e.map(function(e) {
            return e[0] + ":" + e[1]
        }).join(",")
    }

    function Y(e, t) {
        if (t.selectedMessages || (t.selectedMessages = []), 1 === e.length && inArray(e[0], t.selectedMessages)) t.selectedMessages = t.selectedMessages.filter(function(t) {
            return t !== e[0]
        });
        else {
            var n = t.selectedMessages.concat(e);
            t.selectedMessages = (0, qt.arrayUnique)(n).sort(function(e, t) {
                return e - t
            })
        }
        return Promise.resolve(t)
    }

    function Q(e) {
        return e.selectedMessages = [], Promise.resolve(e)
    }

    function X(e) {
        return e.selectedMessages = [], Promise.resolve(e);
    }

    function $(e, t) {
        if ((0, Vt.isFullyLoadedTab)(t, e.peerId)) {
            var n = t.tabs[e.peerId],
                r = t.imQueue(e.peerId).filter(function(t) {
                    return t.failed && t.rid !== e.randomId
                });
            t.imQueueSet(e.peerId, r), t.imQueueComplete(e.peerId, e.randomId), n.lastmsg_meta = e, n.lastmsg = e.messageId;
            var a = n.msgs["rid" + e.randomId];
            a && (n.msgs[e.messageId] = e, delete n.msgs["rid" + e.randomId]), n.history = (0, Vt.replaceMessageAttrs)(t, u(n.history), e)
        }
        return Promise.resolve(t)
    }

    function J(e, t) {
        return Promise.resolve()
    }

    function Z(e, t) {
        var n = {
            act: "a_get_media",
            id: e.messageId,
            gid: t.gid
        };
        return (0, Gt.retryFn)(Ft.post, 3, function(e) {
            return e * e
        })(Ft.CONTROLLER, n).then(function(n) {
            return ee(e, n, t)
        })["catch"](function() {
            return ee(e, null, t)
        })
    }

    function ee(e, t, n) {
        var r = n.tabs[e.peerId];
        return r.mediacontent || (r.mediacontent = {}), r.mediacontent[e.messageId] = t || [getTemplate("im_retry_link")], te(e, n)
    }

    function te(e, t) {
        var n = t.tabs[e.peerId];
        return n.history = (0, Vt.replaceAttaches)(u(n.history), e, t), Promise.resolve(t)
    }

    function ne(e, t, n) {
        var r = (0, Vt.dayFromVal)(t),
            a = n.tabs[e];
        return a.searchDay = r, a.searchOffset = 0, a.searchAllLoaded = !1, Promise.resolve(n)
    }

    function re(e, t, n) {
        if (t) {
            var r = n.tabs[t];
            r.searchText = e, r.searchOffset = 0, r.searchAllLoaded = !1
        } else n.searchText = e, n.searchOffset = 0, n.searchAllLoaded = !1;
        return Promise.resolve(n)
    }

    function ae(e, t, n, r) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_hints",
            str: e,
            gid: r.gid,
            query: n,
            peerIds: t.join(",")
        }).then(function(e) {
            var t = Nt(e, 3),
                n = t[0],
                a = t[1],
                i = t[2];
            return m(i, r), a.forEach(function(e) {
                return (0, Qt.oCacheAdd)(r, e)
            }), q(n, r), Object.keys(n).sort(function(e, t) {
                return n[e].order - n[t].order
            }).map(function(e) {
                return n[e]
            })
        })
    }

    function ie(e, t, n, r) {
        return ae(e, t, n, r).then(function(e) {
            return e.map(function(e) {
                return {
                    peerId: e.peerId,
                    name: e.tab,
                    photo: e.photo,
                    online: e.online,
                    is_friend: "friends" === n ? !0 : !1
                }
            })
        })
    }

    function oe(e) {
        return {
            peerId: e[0],
            name: e[1],
            tab: e[1],
            photo: e[2],
            href: e[3],
            online: e[4],
            is_friend: e[5],
            local_index: !0
        }
    }

    function le(e) {
        return function(t, n) {
            return e(n).then(function(e) {
                var r = t ? e.search(t) : e.list,
                    a = r.map(oe);
                return n.mapped_index || (n.mapped_index = {}), a.forEach(function(e) {
                    n.mapped_index[e.peerId] = e
                }), a
            })
        }
    }

    function ue(e, t) {
        var n = void 0,
            r = void 0;
        t.topConvTree = new Promise(function(e) {
            n = e
        }), t.hintsTree = new Promise(function(e) {
            r = e
        });
        var a = e.select(zt.RECENT_SEARCH_OP);
        return (0, Gt.retryFn)(Ft.post, 1, function() {
            return 4
        })(Ft.CONTROLLER, {
            act: "a_dialogs_preload",
            rs: a.join(","),
            gid: t.gid
        })["catch"](function(e) {
            return [
                [],
                [],
                []
            ]
        }).then(function(e) {
            var a = Nt(e, 3),
                i = a[0],
                s = a[1],
                o = a[2];
            return t.popular_sugg = o, new vkIndexer(i, function(e) {
                return e[1]
            }, n), new vkIndexer(s, function(e) {
                return e[1]
            }, r), t
        })
    }

    function ce(e) {
        var t = e.active_tab,
            n = void 0;
        return n = e.dialog_tabs[t].length > 0 ? Math.min.apply(null, e.dialog_tabs[t].map(function(t) {
            return e.tabs[t].lastmsg
        })) : 0, (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_get_dialogs",
            start_message_id: n,
            tab: t,
            gid: e.gid
        }).then(function(n) {
            var r = Nt(n, 4),
                a = r[0],
                i = r[1],
                s = r[2],
                o = r[3];
            return s.forEach(function(t) {
                return (0, Qt.oCacheAdd)(e, t)
            }), m(o, e), q(i, e), e.dialog_tabs[t] = e.dialog_tabs[t].concat(Object.keys(i).map(intval)), e.dialog_tabs_all[t] = !a.has_more, Promise.resolve(e)
        })
    }

    function de(e, t) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_search",
            q: e,
            from: "all",
            gid: t.gid,
            hash: t.writeHash,
            offset: t.searchOffset || 0
        }).then(function(n) {
            var r = Nt(n, 5),
                a = r[0],
                i = r[1],
                s = r[2],
                o = r[3],
                l = r[4];
            return i.forEach(function(e) {
                return (0, Qt.oCacheAdd)(t, e)
            }), (0, Vt.normalizeTabsGotFromServer)(t, a), e === t.searchText && (t.searchOffset = o, t.searchAllLoaded = l), Object.keys(a).filter(function(e) {
                return !t.tabs[e]
            }).forEach(function(e) {
                t.tabs[e] = a[e]
            }), [a, s]
        })
    }

    function ge(e, t) {
        var n = t.tabs[e];
        return n.searchAllLoaded
    }

    function me(e, t) {
        if (t.peer === e && (0, Vt.isFullyLoadedTab)(t, e)) {
            var n = t.tabs[e];
            return n.inplaceSearch
        }
        return !1
    }

    function fe(e, t) {
        if ((0, Vt.isFullyLoadedTab)(t, e)) {
            var n = t.tabs[e];
            delete n.inplaceSearch, delete n.searchOffset, delete n.searchAllLoaded, delete n.searchText, delete n.searchDay
        }
        return Promise.resolve(t)
    }

    function pe(e, t) {
        if ((0, Vt.isFullyLoadedTab)(t, e)) {
            var n = t.tabs[e];
            delete n.searchDay, n.searchOffset = 0, n.searchAllLoaded = !1
        }
        return Promise.resolve(t)
    }

    function _e(e, t) {
        var n = t.tabs[e];
        return n.inplaceSearch = !0, Promise.resolve(t)
    }

    function he(e, t) {
        var n = t.tabs[e],
            r = "";
        if (_e(e, t), n.searchDay && (r = "day:" + n.searchDay), !r && !n.searchText) return Promise.reject();
        var a = "in:" + e + " " + r + " " + (n.searchText || "");
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_search",
            q: a,
            from: "in",
            gid: t.gid,
            hash: t.writeHash,
            offset: n.searchOffset || 0
        }).then(function(e) {
            var t = Nt(e, 3),
                r = t[0],
                a = t[1],
                i = t[2];
            return n.searchOffset = a, n.searchAllLoaded = i, r
        })
    }

    function ve(e) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_important",
            offset: e,
            part: e > 0
        })
    }

    function be(e, t) {
        var n = (0, Wt.getTab)(e, t);
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_load_lastmsg",
            peerId: t,
            gid: e.get().gid
        }).then(function(r) {
            var a = Nt(r, 2),
                i = a[0],
                s = a[1];
            n.lastmsg = i[0] || !1, n.lastmsg_meta = i;
            var o = Nt(s, 3);
            n.unread = o[0], n.in_up_to = o[1], n.out_up_to = o[2], n.unread || (e.get().dialog_tabs[Kt.FOLDER_UNREAD] = e.get().dialog_tabs[Kt.FOLDER_UNREAD].filter(function(e) {
                return e != t
            })), O(e.get(), n, !1, R.bind(null, t), st.bind(null, e.get()))
        })
    }

    function ye(e, t, n) {
        if ((0, Vt.isFullyLoadedTab)(n, t)) {
            var r = n.tabs[t];
            r.deleted = r.deleted ? r.deleted.concat(e) : e
        }
        return Promise.resolve(n)
    }

    function Ce(e, t, n) {
        if ((0, Vt.isFullyLoadedTab)(n, t)) {
            var r = n.tabs[t];
            r.history = (0, Vt.removeMessages)(e, u(r.history)), r.offset -= e.filter(function(e) {
                return r.msgs[e]
            }).length, e.forEach(function(e) {
                return delete r.msgs[e]
            }), e.forEach(function(e) {
                var t = (n.selectedMessages || []).indexOf(e); - 1 != t && n.selectedMessages.splice(t, 1)
            })
        }
        return Promise.resolve(n)
    }

    function we(e, t, n, r, a) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_mark",
            peer: t,
            hash: n,
            gid: a,
            msgs_ids: e.join(","),
            mark: r
        })
    }

    function Ee(e, t, n, r) {
        if ((0, Vt.isFullyLoadedTab)(r, t)) {
            var a = r.tabs[t];
            a.deleted = a.deleted ? a.deleted.concat(e) : e, a.history = (0, Vt.removeMessagesWithRestore)(e, t, n, u(a.history)), a.offset -= e.filter(function(e) {
                return a.msgs[e]
            }).length
        }
        return Promise.resolve(r)
    }

    function ke(e, t, n) {
        if ((0, Vt.isFullyLoadedTab)(n, t)) {
            var r = n.tabs[t];
            r.deleted && (r.deleted = r.deleted.filter(function(t) {
                return t !== e
            })), r.history = (0, Vt.restoreMessage)(e, t, u(r.history)), r.offset++
        }
        return Promise.resolve(n)
    }

    function Te(e, t, n, r) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_restore",
            id: e,
            peer: t,
            hash: n,
            gid: r
        })
    }

    function Se(e, t, n) {
        return t && (n.pendingForward = null, e || (e = {
            msgIds: []
        }), t.addAttach("mail", e.msgIds.join(";"), e.object || null)), Promise.resolve(n)
    }

    function Ie(e, t) {
        return t.pendingForward = e, Promise.resolve(t)
    }

    function Me(e, t, n) {
        if ((0, Vt.isTabLoaded)(n, e)) {
            n.blockedFlagUpdates || (n.blockedFlagUpdates = {}), n.blockedFlagUpdates[e] = !0, O(n, n.tabs[e], !0, function(t) {
                return t.filter(function(t) {
                    return t !== e
                })
            }), n.tabs[e].unread > 0 && F(n, -1, e);
            var r = n.tabs[e];
            r.deletedDialog = !0;
            var a = n.tabbedPeers.filter(function(t) {
                return t.peer !== e
            });
            return mt(a, !0, n), t.then(function(t) {
                var a = Nt(t, 2);
                return a[0], a[1], delete n.blockedFlagUpdates[e], r.msgs = null, r.history = null, r.unread = 0, r.lastmsg = !1, r.lastmsg_meta = null, n
            })
        }
    }

    function Pe(e, t, n) {
        return n.tabs[e].tab = t, Promise.resolve(n)
    }

    function Le(e, t) {
        if (isEmpty(e)) return Promise.resolve(t);
        var n = Object.keys(e).map(function(t) {
            return t + ":" + e[t].join(",")
        }).join(";");
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_load_member",
            need: n
        }).then(function(e) {
            var n = Nt(e, 1),
                r = n[0];
            return r.forEach(function(e) {
                return (0, Qt.oCacheAdd)(t, e)
            }), t
        })
    }

    function Ae(e, t, n, r) {
        function a(e, t) {
            (0, Vt.isChatPeer)(e) && t && !(0, Qt.oCacheExists)(r, t) && (i[e] ? -1 === i[e].indexOf(t) && i[e].push(t) : i[e] = [t])
        }
        var i = {},
            s = t.filter(function(e) {
                return !(0, Vt.isTabLoaded)(r, e.peerId)
            }).map(function(e) {
                return f(e.peerId, 0, 0, 0, r)
            });
        t.forEach(function(e) {
            (0, Vt.isTabLoaded)(r, e.peerId) && a(e.peerId, e.userId)
        }), e.forEach(function(e) {
            a(e.peerId, +e.kludges.source_mid)
        });
        var o = t.filter(function(e) {
            return e.flags & Ut.FLAG_OUTBOUND && !e.local
        }).map(function(e) {
            return e.kludges.from_admin
        }).filter(function(e) {
            return e && !r.admins[e]
        });
        return 0 === Object.keys(i).length && 0 === o.length && 0 === s.length ? Promise.resolve(r) : (n.pause(), Promise.all([Le(i, r), D(o, r), Promise.all(s)])["catch"](function() {
            return r
        }).then(function() {
            return n.resume()
        }).then(function() {
            return r
        }))
    }

    function Oe(e, t, n, r) {
        return t !== vk.id ? Promise.resolve(r) : ((0, Vt.isTabLoaded)(r, n) && r.peer == n && (r = E(r)), Promise.resolve(r))
    }

    function De(e, t, n) {
        var r = n.mutedPeers.filter(function(t) {
            return t !== e
        });
        return t && r.push(e), n.mutedPeers = r, cur.mutedPeers = n.mutedPeers, E(n)
    }

    function xe(e, t) {
        return t.stack = e, Promise.resolve(t)
    }

    function Re(e, t, n, r) {
        if ((0, Vt.isFullyLoadedTab)(r, t)) {
            var a = r.tabs[t];
            e.filter(function(e) {
                return a.msgs[e]
            }).forEach(function(e) {
                var i = (0, Wt.getMessage)(r, t, e),
                    s = n ? i.flags | Ut.FLAG_IMPORTANT : i.flags & ~Ut.FLAG_IMPORTANT;
                i.flags = s, a.msgs[e] = i, a.history = (0, Vt.updateStar)(e, n, u(a.history))
            })
        }
        return Promise.resolve(r)
    }

    function Be(e, t, n) {
        n.importants || (n.importants = {});
        var r = n.importants[t] || 0;
        return r !== e && (n.important_cnt += e, n.importants[t] = e), Promise.resolve(n)
    }

    function Ne(e, t) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_spam",
            offset: e,
            gid: t,
            part: e > 0
        })
    }

    function Fe(e, t) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_flush_spam",
            gid: t,
            hash: e
        })
    }

    function je(e, t, n) {
        return n.creationType = e, n.creationFilter = t, Promise.resolve(n)
    }

    function He(e, t) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_owner_photo",
            photo: JSON.parse(e).data[0],
            peer: t
        })
    }

    function Ue(e, t) {
        return t.next_chat_avatar = e, Promise.resolve(t)
    }

    function Ge(e, t, n) {
        return (0, Ft.post)("al_page.php", {
            act: "owner_photo_save",
            peer: e,
            _query: t
        }).then(function(e) {
            return n
        })
    }

    function qe(e, t, n, r) {
        return r.creating = !0, r.longpoll.pause(), (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_multi_start",
            hash: r.writeHash,
            peers: t.join(","),
            title: n
        }).then(function(e) {
            var t = Nt(e, 1),
                n = t[0];
            return r.next_peer = n.peerId, r.tabs[n.peerId] = n, O(r, n, !1, function(e) {
                return [n.peerId].concat(e)
            }), r.longpoll.resume(), r
        }).then(function(t) {
            return e ? Ge(t.next_peer, e, t) : t
        }).then(function(e) {
            return e.creating = !1, e
        })["catch"](function(e) {
            throw r.creating = !1, r.longpoll.resume(), e
        })
    }

    function ze(e) {
        var t = void 0;
        e.resync_in_process = new Promise(function(e) {
            t = e
        });
        var n = Object.keys(e.tabs).length,
            r = e.active_tab;
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_resync",
            sel: e.peer,
            gid: e.gid,
            loaded: n,
            tab: r,
            add_peers: e.tabbedPeers.map(function(e) {
                return e.peer
            }).join(",")
        }).then(function(n) {
            var i = Nt(n, 5),
                s = i[0],
                o = i[1],
                l = i[2],
                c = i[3],
                d = i[4];
            o.forEach(function(t) {
                return (0, Qt.oCacheAdd)(e, t)
            }), (0, Vt.normalizeTabsGotFromServer)(e, s), l.user_unread && handlePageCount("msg", l.user_unread), (0, qt.lplog)("Resync success", "success");
            var g = e.peer,
                m = void 0;
            if ((0, Vt.isReservedPeer)(g)) m = Promise.resolve(!1);
            else {
                var f = {
                    tabs: a({}, g, e.tabs[g]),
                    oCache: {}
                };
                m = q(a({}, g, s[g]), f)
            }
            return m.then(function(n) {
                e.tabs = s, e.admins = extend(e.admins, c), n && (e.tabs[g] = n.tabs[g], e.tabs[g].history = (0, Vt.restoreQueue)(g, e, u(e.tabs[g].history))), e.loadingDialogs = !1, e.mutedPeers = l.mutedPeers, e.lastDialogsOptions = {
                    has_more: l.has_more
                }, e.dialog_tab_cts = l.folder_cts, e.dialog_tabs[r] = d.map(intval);
                var a = e.dialog_tabs[r].map(function(t) {
                    return e.tabs[t]
                });
                return Object.keys(e.dialog_tabs).filter(function(e) {
                    return e != r
                }).forEach(function(t) {
                    r == Kt.FOLDER_ALL ? e.dialog_tabs[t] = a.filter(nt(t)).map(function(e) {
                        return e.peerId
                    }) : e.dialog_tabs[t] = []
                }), delete e.resync_in_process, setTimeout(t.bind(null, !0), 0), $e(intval(l.unread), e)
            })
        })["catch"](function(t) {
            return (0, qt.lplog)("Resync error: " + t.message + " " + t.stack, "error"), (0, Gt.pause)(2).then(ze.bind(null, e))
        })
    }

    function Ve(e, t, n, r) {
        if ((0, Vt.isTabLoaded)(r, e)) {
            var a = r.tabs[e];
            c(a.memberIds, n), a.membersCount++, n === vk.id && (a.data.kicked = 0, a.data.closed = 0)
        }
        return Promise.resolve(r)
    }

    function Ke(e, t, n, r) {
        if ((0, Vt.isTabLoaded)(r, e)) {
            var a = r.tabs[e];
            d(a.memberIds, n), a.membersCount--, n === vk.id && (t == n ? a.data.closed = 1 : a.data.kicked = 1)
        }
        return Promise.resolve(r)
    }

    function We(e, t) {
        return t.lockedSending = e, Promise.resolve(t)
    }

    function Ye(e, t, n) {
        return e && !n.delayed_message ? (n.delayed_message = e, n.delayed_ts = t) : e || (n.delayed_message = e, n.delayed_ts = t), Promise.resolve(n)
    }

    function Qe() {
        return window.Upload && Upload.options ? Object.keys(Upload.options).map(function(e) {
            return Upload.options[e]
        }).filter(function(e) {
            return e.xhr && 4 !== e.xhr.readyState && 0 !== e.xhr.readyState
        }).length > 0 : !1
    }

    function Xe(e) {
        var t = e.textMediaSelector;
        return !!t.urlAttachmentLoading || Qe()
    }

    function $e(e, t) {
        return t.unread_cnt = e, t.dialog_tab_cts[Kt.FOLDER_UNREAD] = e, Promise.resolve(t)
    }

    function Je(e, t) {
        return t.ctrl_submit = !!e, (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_save_ctrl_submit",
            to: t.peer,
            hash: t.tabs[t.peer].hash,
            value: e ? 1 : 0
        }).then(function(e) {
            return t
        })
    }

    function Ze(e, t, n) {
        return function() {
            n.update_old_title = e;
            var r = Object.keys(n.cur_unread_cnt).length;
            if (0 === r) return document.title = e ? e : document.title, setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), clearInterval(n.update_title_to), void(n.update_title_to = !1);
            if (e) document.title = e, setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), e = !1;
            else {
                e = document.title;
                var a = r > 9 ? 10 : r;
                setFavIcon("/images/icons/favicons/fav_im" + a + t + ".ico"), document.title = winToUtf(getLang("mail_im_new_messages", r))
            }
        }
    }

    function et(e, t, n) {
        n.cur_unread_cnt || (n.cur_unread_cnt = {}), t && !inArray(e, n.mutedPeers) && (n.cur_unread_cnt[e] = !0);
        var r = document.title,
            a = window.devicePixelRatio >= 2 ? "_2x" : "";
        if (t && !n.update_title_to) {
            var i = Ze(r, a, n);
            n.update_title_to = setInterval(i, 1e3), i()
        } else !t && n.update_old_title && (document.title = n.update_old_title, n.cur_unread_cnt = {}, r = !1, n.update_old_title = !1, setFavIcon("/images/icons/favicons/fav_im" + a + ".ico"), clearInterval(n.update_title_to), n.update_title_to = !1);
        return Promise.resolve(n)
    }

    function tt(e, t, n, r, a) {
        return (0, Vt.isFullyLoadedTab)(a, e) && (a.tabs[e].scrollTop = intval(t), a.tabs[e].scrollBottom = intval(n), a.tabs[e].contHeight = intval(r)), Promise.resolve(a)
    }

    function nt(e) {
        return e === Kt.FOLDER_ALL ? function() {
            return !0
        } : e === Kt.FOLDER_UNREAD ? function(e) {
            return e.unread > 0
        } : function(t) {
            return t.folders & Kt.FOLDER_MASKS[e]
        }
    }

    function rt(e, t) {
        t.active_tab = e, (0, jt.updateLocation)({
            tab: e === Kt.FOLDER_ALL ? null : e
        });
        var n = [];
        if (e !== Kt.FOLDER_ALL && !(0, Vt.isReversedDialogs)(t)) {
            var r = t.dialog_tabs[e];
            n = t.dialog_tabs[Kt.FOLDER_ALL].map(function(e) {
                return t.tabs[e]
            }).filter(nt(e)).map(function(e) {
                return e.peerId
            }), t.dialog_tabs[e] = r.length >= n.length ? r : n
        }
        return Promise.resolve(t)
    }

    function at(e, t, n) {
        return e === Ut.SET_DIRECTORIES && n.folders & t ? !1 : e !== Ut.RESET_DIRECTORIES || n.folders & t ? !0 : !1
    }

    function it(e, t, n) {
        return t !== Ut.RESET_DIRECTORIES || e.folders & Kt.FOLDER_MASKS[n] ? t === Ut.REPLACE_DIRECTORIES ? e.folders & Kt.FOLDER_MASKS[n] ? -1 : 1 : t === Ut.SET_DIRECTORIES ? 1 : -1 : 0
    }

    function st(e, t, n, r) {
        var a = e.dialog_tabs_all;
        if (a[Kt.FOLDER_ALL] || a[t]) return !0;
        if (n.filter(function(e) {
                return e === r.peerId
            }).length > 0) return !0;
        if ("r" === r.lastmsg[0]) return !0;
        var i = n.map(function(t) {
            return e.tabs[t.toString()]
        }).filter(function(t) {
            return (0, Vt.isReversedDialogs)(e) ? t.lastmsg > r.lastmsg : t.lastmsg < r.lastmsg
        });
        return i.length > 0 ? !0 : !1
    }

    function ot(e, t, n, r, a) {
        if ((0, Vt.isTabLoaded)(a, e)) {
            var i = a.tabs[e];
            return n === Ut.REPLACE_DIRECTORIES && (t ^= i.folders), at(n, t, i) && Object.keys(Kt.FOLDER_MASKS).filter(function(e) {
                return Kt.FOLDER_MASKS[e] & t
            }).forEach(function(e) {
                a.dialog_tab_cts[e] += it(i, n, e)
            }), n === Ut.SET_DIRECTORIES ? a.tabs[e].folders |= t : n === Ut.RESET_DIRECTORIES ? a.tabs[e].folders &= ~t : a.tabs[e].folders = t ^= i.folders, O(a, a.tabs[e], !0, function(t, n) {
                return t.concat([e]).map(function(e) {
                    return a.tabs[e]
                }).filter(nt(n)).map(function(e) {
                    return e.peerId
                })
            }, st.bind(null, a)), Promise.resolve(a)
        }
        return f(e, 0, 0, 0, a).then(ot.bind(null, e, t, n, a))
    }

    function lt(e) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_get_mutex_key",
            gid: e
        })
    }

    function ut(e, t) {
        return m(a({}, e, {
            free: !0
        }), t), (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_block_release",
            peer: e,
            gid: t.gid
        }).then(function() {
            return t
        })
    }

    function ct(e, t) {
        var n = ls.get("comm_mute_" + t.gid) ? 1 : 0;
        return e && (n = 1 ^ n), ls.set("comm_mute_" + t.gid, n), t.mute = n, Promise.resolve(t)
    }

    function dt(e, t, n, r) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_restore_dialog",
            hash: t,
            gid: r.gid,
            spam: n ? 1 : 0,
            peer: e
        }).then(function(t) {
            return r.tabs[e].deletedDialog = !1, O(r, r.tabs[e], !1, function(t) {
                return [e].concat(t)
            }), r.tabs[e].unread = t, r
        })
    }

    function gt(e, t, n) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_spam_dialog",
            peer: e,
            gid: n.gid,
            hash: t
        })
    }

    function mt(e, t, n) {
        return n.tabbedPeers = e, (0, Vt.isClassicInterface)(n) && (nn({
            peers: n.tabbedPeers.filter(function(e) {
                var t = e.peer,
                    r = e.type;
                return t !== n.peer && "perm" === r
            }).map(function(e) {
                return (0, Vt.getBareTab)(e.peer, n)
            }).filter(function(e) {
                return !e.deletedDialog
            }).map(function(e) {
                return e.peerId
            }).map(Vt.convertPeerToUrl).join("_")
        }), t && rn()), Promise.resolve(n)
    }

    function ft(e) {
        return e.peer ? me(e.peer, e) ? ge(e.peer, e) : (0, Vt.isFullyLoadedTab)(e, e.peer) ? e.tabs[e.peer].allShown : !1 : !0
    }

    function pt(e, t) {
        var n = t.tabs[e];
        return (0, Vt.isFullyLoadedTab)(t, e) && (n.skipped = null, n.msgs = null, n.offset = null, n.allShown = null, n.history = null), Promise.resolve(t)
    }

    function _t(e, t) {
        var n = t.tabs[e];
        return (0, Vt.isFullyLoadedTab)(t, e) && (n.history = g(n.history)), Promise.resolve(t)
    }

    function ht(e, t) {
        return t.go_to_end_visible = e, Promise.resolve(t)
    }

    function vt(e, t, n) {
        if (!(0, Vt.isCommunityPeer)(t)) return Promise.resolve(n);
        var r = (0, Wt.getTab)(n, t);
        return r.blocked_community = !e, (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_toggle_community",
            peer_id: t,
            hash: r.hash,
            state: e ? 1 : 0
        }).then(function() {
            return E(n)
        })
    }

    function bt(e, t) {
        if (0 !== t.peer && (0, Vt.isFullyLoadedTab)(t, t.peer)) {
            var n = (0, Wt.getTab)(t, t.peer);
            n.history = u(n.history), e(n.history)
        }
        return Promise.resolve(t)
    }

    function yt(e) {
        return e.audio_msg.isRecording ? Promise.reject() : (e.audio_msg.isRecording = !0, Promise.resolve(e))
    }

    function Ct(e) {
        return e.audio_msg.isRecording = !1, Promise.resolve(e)
    }

    function wt(e, t) {
        return t.voice_message_available = e, Promise.resolve(t)
    }

    function Et(e) {
        nn({
            act: e ? "create" : null
        }), rn()
    }

    function kt() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
        nn({
            q: e
        }), rn()
    }

    function Tt(e) {
        return "undefined" == typeof e.chatResizeInitialized && (e.chatResizeInitialized = !0, (0, Vt.getClassicChatHeight)() > window.clientHeight() && (0, Vt.setClassicChatHeight)(0)), Promise.resolve(e)
    }

    function St(e, t, n) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_join_chat",
            chat_id: e,
            hash: t,
            write_hash: n.writeHash
        }).then(function(e) {
            var t = Nt(e, 4),
                r = t[0],
                a = t[1],
                i = t[2],
                s = t[3];
            return i.forEach(function(e) {
                return (0, Qt.oCacheAdd)(n, e)
            }), n.tabs[r] = a, O(n, a, !1, R.bind(null, r), st.bind(null, n)), n.admins = extend(n.admins, s), [r]
        })
    }

    function It(e, t) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_reset_link",
            chat_id: e,
            write_hash: t.writeHash
        })
    }

    function Mt(e) {
        return an({
            invite_chat_id: null,
            invite_hash: null
        }), e.invitation = void 0, Promise.resolve(e)
    }

    function Pt(e, t) {
        var n = (0, qt.arrayUnique)([e].concat(t.select(zt.RECENT_SEARCH_OP))).slice(0, 500);
        t.update(zt.RECENT_SEARCH_OP, n)
    }

    function Lt(e) {
        e.update(zt.RECENT_SEARCH_OP, [])
    }

    function At(e, t) {
        var n = t.select(zt.RECENT_SEARCH_OP).filter(function(t) {
            return t !== e
        });
        return t.update(zt.RECENT_SEARCH_OP, n), n
    }

    function Ot(e, t, n) {
        var r = n.tabs[t],
            a = (0, Wt.getMessage)(n, t, e);
        return r.data.kicked || r.data.closed || a.kludges.source_act || (r.pinned = a), Promise.resolve(n)
    }

    function Dt(e, t) {
        var n = t.tabs[e];
        return n.pinned = null, Promise.resolve(t)
    }

    function xt(e, t, n, r) {
        var i = (0, Wt.getMessage)(e, n, t),
            s = i.userId;
        return (0, Qt.oCacheGet)(r, s) ? Promise.resolve(r) : Le(a({}, n, [s]), r)
    }

    function Rt() {
        ajax.post("al_im.php", {
            act: "a_hide_promo_tooltip"
        })
    }

    function Bt() {
        cur.videoAutoplayScrollHandler && cur.videoAutoplayScrollHandler()
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getMessageLocalId = t.getPinnedMessage = t.unpinMessage = t.pinMessage = t.deleteDialog = t.markDialogAnswered = t.toggleDialogImportant = t.favMessage = t.toggleMutePeer = t.returnToChat = t.leaveChat = t.updateChatPhoto = t.addNewMember = t.updateChatTopic = t.flushHistory = t.sendTyping = t.searchLocalHints = t.searchTopConv = t.deliverEditedMessage = t.deliverMessage = t.readLastMessages = t.ACTION_PRIORITIES = t.TYPING_PERIOD = void 0;
    var Nt = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && o["return"] && o["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.strHistory = g, t.updateBlockStates = m, t.loadPeer = f, t.restoreHistoryQueue = p, t.removeFailed = _, t.selectPeer = v, t.selectPeerOnMessage = y, t.changePeer = C, t.updateMentions = w, t.setActions = E, t.loadMoreHistory = k, t.loadLessHistory = T, t.createEmailChat = I, t.loadLongPollKey = M, t.loadLongPollTs = P, t.setMessageErrored = L, t.resendMessage = A, t.loadAdmins = D, t.editMessage = B, t.addMessage = N, t.markInboundMessagesAsRead = j, t.markOutboundMessagesAsRead = H, t.initTextStore = U, t.processFwd = G, t.mergeTabs = q, t.updateOnline = z, t.setTyping = V, t.waitTyping = K, t.addSelection = Y, t.cleanSelected = Q, t.dropSelection = X, t.replaceMessage = $, t.saveMedia = J, t.loadMedia = Z, t.addAttachmentsToStoreData = ee, t.replaceMediaAttachesStore = te, t.setCurrentSearchDate = ne, t.setCurrentSearch = re, t.searchHints = ae, t.searchHintsIndex = ie, t.localIndexToDialog = oe, t.preloadSearchIndex = ue, t.loadDialogs = ce, t.searchMessages = de, t.isSearchAllLoaded = ge, t.isSearchingInplace = me, t.cancelSearch = fe, t.clearDate = pe, t.searchInplaceStart = _e, t.searchMessagesInplace = he, t.loadImportant = ve, t.loadActualLastMessage = be, t.removeMessagesMarkDeleted = ye, t.removeMessages = Ce, t.removeMessageSend = we, t.removeMessagesWithRestore = Ee, t.restoreMessage = ke, t.restoreMessageSend = Te, t.forwardMessages = Se, t.prepareForward = Ie, t.deletedDialog = Me, t.setChatTitle = Pe, t.loadChatMember = Le, t.checkNewPeople = Ae, t.updateActions = Oe, t.setMutedPeer = De, t.setExecStack = xe, t.updateFavMessage = Re, t.updateImportant = Be, t.loadSpam = Ne, t.flushSpam = Fe, t.setCreationType = je, t.getOwnerPhoto = He, t.presetAvatar = Ue, t.setChatPhoto = Ge, t.createChat = qe, t.resync = ze, t.chatUserHasJoined = Ve, t.chatUserHasLeft = Ke, t.toggleSendingAbility = We, t.setDelayedMessage = Ye, t.isAnythingLoading = Xe, t.updateUnreadCount = $e, t.changeSubmitSettings = Je, t.updateFavAndTitle = et, t.saveHistoryScroll = tt, t.filterFromTab = nt, t.changeDialogsTab = rt, t.updateFolderState = ot, t.getMutexQueue = lt, t.releaseBlock = ut, t.toggleCommunityMute = ct, t.restoreDialog = dt, t.spamDialog = gt, t.updateTabbedPeers = mt, t.isEverythingLoaded = ft, t.cleanTab = pt, t.stringifyTab = _t, t.updateGoToEndVisibility = ht, t.toggleCommunityMessages = vt, t.updateHistory = bt, t.startRecording = yt, t.cancelRecording = Ct, t.setVoiceMessageAvail = wt, t.toggleConversation = Et, t.updateSearchQuery = kt, t.initializeChatResize = Tt, t.joinChat = St, t.resetInviteLink = It, t.leaveInvitation = Mt, t.saveRecentSearchPeer = Pt, t.resetRecentSearch = Lt, t.removeFromRecentSearch = At, t.pinMessageOptimistic = Ot, t.unpinMessageOptimistic = Dt, t.checkChatMember = xt, t.hidePromoTooltip = Rt, t.videoAutoPlayHandler = Bt;
    var Ft = n(85),
        jt = n(91),
        Ht = n(132),
        Ut = r(Ht),
        Gt = n(3),
        qt = n(36),
        zt = n(110),
        Vt = n(20),
        Kt = n(5),
        Wt = n(139),
        Yt = n(8),
        Qt = n(66),
        Xt = n(117),
        $t = n(121),
        Jt = t.TYPING_PERIOD = 5,
        Zt = 2e4,
        en = 8,
        tn = (0, jt.updateLazyLocation)(),
        nn = tn.scheduleNav,
        rn = tn.commitNav,
        an = tn.scheduleNavWithTimeOut,
        sn = t.ACTION_PRIORITIES = {
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
            "return": 12,
            block_community: 12,
            allow_community: 12
        };
    t.readLastMessages = l(function(e, t) {
        var n = t.tabs[e],
            r = Object.keys(n.msgs).map(function(n) {
                return (0, Wt.getMessage)(t, e, n)
            }).filter(function(e) {
                return !(0, Yt.isOut)(e)
            }).map(function(e) {
                return e.messageId
            }).sort(function(e, t) {
                return t - e
            });
        return n.skipped > 0 && (r = r.filter(function(e) {
            return intval(e) <= n.lastmsg - n.skipped
        })), r = intval(r.shift()), r <= n.in_up_to ? Promise.resolve(t) : (t.longpoll.push([Ut.readInboundEvent([6, e, r])]), (0, Ft.post)(Ft.CONTROLLER, {
            peer: e,
            ids: [r],
            hash: n.hash,
            act: "a_mark_read",
            gid: t.gid
        }).then(function() {
            return S(t, e, r, Ut.FLAG_OUTBOUND)
        }))
    }), t.deliverMessage = l(function(e, t, n) {
        var r = Date.now() + rand(0, 100).toFixed(0),
            a = n.tabs[e];
        return (0, Gt.retryFn)(Ft.post, 1)(Ft.CONTROLLER, {
            act: "a_send",
            to: e,
            hash: a.hash,
            msg: t.message,
            media: W(t.attaches),
            guid: r,
            share_url: t.share_url,
            random_id: t.rid,
            gid: n.gid,
            sticker_referrer: t.sticker_referrer
        }, Zt).then(function(e) {
            var t = Nt(e, 1),
                r = t[0];
            return n.version !== r.version && nav.reload({
                force: !0
            }), n
        })
    }), t.deliverEditedMessage = l(function(e, t, n) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_edit_message",
            hash: e.hash,
            id: t.messageId,
            peerId: e.peerId,
            gid: n.gid,
            msg: t.origText,
            media: W(t.attaches),
            share_url: t.share_url
        }, Zt).then(function(e) {
            var t = Nt(e, 1);
            return t[0], n
        })
    }), t.searchTopConv = le(function(e) {
        return e.topConvTree
    }), t.searchLocalHints = le(function(e) {
        return e.hintsTree
    }), t.sendTyping = l(function(e, t) {
        return t.tabs[e].lastTyping = Date.now(), (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_typing",
            peer: e,
            gid: t.gid,
            hash: t.tabs[e].hash
        }).then(function(e) {
            return t
        }, function(e) {
            return t
        })
    }), t.flushHistory = l(function(e, t) {
        return Me(e, (0, Ft.post)("al_im.php", {
            act: "a_flush_history",
            id: e,
            from: "im",
            gid: t.gid,
            hash: t.tabs[e].hash
        }), t)
    }), t.updateChatTopic = l(function(e, t, n) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_get_chat",
            chat: e - 2e9,
            new_title: t,
            hash: n.tabs[e].hash
        }).then(function(t) {
            var r = Nt(t, 2),
                a = (r[0], r[1]);
            return n.tabs[e] = extend(n.tabs[e], (0, Vt.normalizeTab)(n, a)), n
        })
    }), t.addNewMember = l(function(e, t, n) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_get_chat",
            chat: e - 2e9,
            new_peer: t.join(","),
            hash: n.tabs[e].hash
        }).then(function(t) {
            var r = Nt(t, 2),
                a = (r[0], r[1]);
            return n.tabs[e] = extend(n.tabs[e], (0, Vt.normalizeTab)(n, a)), n
        })
    }), t.updateChatPhoto = l(function(e, t) {
        return e.kludges.source_act === Vt.CHAT_PHOTO_REMOVE ? (delete t.tabs[e.peerId].photo, Promise.resolve(t)) : (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_get_chat_photo",
            msg_id: e.messageId
        }).then(function(n) {
            var r = Nt(n, 2),
                a = r[0],
                i = r[1];
            t.chat_photo_msg = i;
            var s = t.tabs[e.peerId];
            if (t.tabs[e.peerId].photo = a, (0, Vt.isFullyLoadedTab)(t, e.peerId)) {
                var o = e.kludges.source_act;
                s.history = (0, Vt.addChatPhotoToUpdate)(e, o, t, u(s.history))
            }
            return t
        })
    }), t.leaveChat = l(function(e, t) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_leave_chat",
            chat: e - 2e9,
            hash: t.tabs[e].hash
        }).then(Oe.bind(null, Vt.CHAT_KICK_USER, vk.id, e, t))
    }), t.returnToChat = l(function(e, t) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_return_to_chat",
            chat: e - 2e9,
            hash: t.tabs[e].hash
        }).then(Oe.bind(null, Vt.CHAT_INVITE_USER, vk.id, e, t))
    }), t.toggleMutePeer = l(function(e, t, n) {
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_mute",
            peer: e,
            hash: n.tabs[e].hash,
            gid: n.gid,
            value: t
        }).then(function() {
            var r = t ? "mute" : "unmute";
            return window.Notifier && Notifier.lcSend("im", {
                act: r,
                peer: e
            }), n
        }).then(De.bind(null, e, t))
    }), t.favMessage = l(function(e, t, n, r) {
        return Re(e, n, t, r), (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_mark_important",
            ids: e,
            val: t ? 1 : 0,
            from: "im",
            gid: r.gid,
            peer: n,
            hash: r.tabs[n].hash
        }).then(function(e) {
            return r
        })
    }), t.toggleDialogImportant = l(function(e, t) {
        var n = Kt.FOLDER_MASKS[Kt.FOLDER_IMPORTANT],
            r = t.tabs[e].folders & n,
            a = r ? Ut.resetDirectoriesEvent : Ut.setDirectoriesEvent;
        return t.longpoll.push([a([0, e, n, !0])]), (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_dialog_star",
            val: r ? 0 : 1,
            peer: e,
            hash: t.tabs[e].hash,
            gid: t.gid
        }).then(function() {
            return t
        })
    }), t.markDialogAnswered = l(function(e, t, n) {
        var r = Kt.FOLDER_MASKS[Kt.FOLDER_UNRESPOND];
        return n.longpoll.push([Ut.resetDirectoriesEvent([0, e, r, !0]), Ut.readInboundEvent([6, e, t])]), (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_mark_answered",
            peer: e,
            lastmsg: t,
            hash: n.tabs[e].hash,
            gid: n.gid
        }).then(function() {
            return n
        })
    }), t.deleteDialog = l(function(e, t) {
        return O(t, t.tabs[e], !0, function(t) {
            return t.filter(function(t) {
                return t !== e
            })
        }), t.tabs[e].deletedDialog = !0, (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_delete_dialog",
            peer: e,
            gid: t.gid,
            hash: t.tabs[e].hash
        }).then(function(n) {
            return n[0] ? (mt(t.tabbedPeers.filter(function(t) {
                return t.peer !== e
            }), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null) : (t.tabs[e].deletedDialog = !1, O(t, t.tabs[e], !1, R.bind(null, e), st.bind(null, t))), n
        })
    }), t.pinMessage = l(function(e, t, n) {
        var r = n.tabs[t];
        return r.data.kicked || r.data.closed ? Promise.resolve(n) : (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_pin_message",
            msgid: e,
            chat: t,
            hash: n.tabs[t].hash
        }).then(function(e) {
            var a = Nt(e, 1),
                i = a[0];
            return n.tabs[t] = Object.assign({}, r, i), n
        })
    }), t.unpinMessage = l(function(e, t) {
        var n = t.tabs[e];
        return n.data.kicked || n.data.closed ? Promise.resolve(t) : (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_unpin_message",
            chat: e,
            hash: t.tabs[e].hash
        }).then(function(r) {
            var a = Nt(r, 1),
                i = a[0];
            return t.tabs[e] = Object.assign({}, n, i), t
        })
    }), t.getPinnedMessage = l(function(e, t) {
        var n = t.tabs[e];
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_get_pinned_message",
            chat: e,
            hash: t.tabs[e].hash
        }).then(function(e) {
            var r = Nt(e, 1),
                a = r[0];
            return n.pinned = a || null, t
        })
    }), t.getMessageLocalId = l(function(e, t, n) {
        var r = n.tabs[e];
        return (0, Ft.post)(Ft.CONTROLLER, {
            act: "a_get_message_local_id",
            chat: e,
            chat_local_id: t,
            hash: r.hash
        })
    })
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        return t.state = e, Promise.resolve(t)
    }

    function i(e, t, n, r, a) {
        switch (t) {
            case m.ARROW_UP:
                r.scroll(a, "up"), cancelEvent(n);
                break;
            case m.ARROW_DOWN:
                r.scroll(a, "down"), cancelEvent(n);
                break;
            case m.PAGE_UP:
                n.ctrlKey || (0, g.isClassicInterface)(a) || (r.scroll(a, "up", !0), cancelEvent(n));
                break;
            case m.PAGE_DOWN:
                n.ctrlKey || (0, g.isClassicInterface)(a) || (r.scroll(a, "down", !0), cancelEvent(n));
                break;
            case m.HOME:
                (0, g.isEditableFocused)() || (r.scroll(a, "up", !1, !0), cancelEvent(n));
                break;
            case m.END_KEY:
                (0, g.isEditableFocused)() || (r.scroll(a, "down", !1, !0), cancelEvent(n));
                break;
            case m.PRINTABLE:
                r.focustTxt(e)
        }
    }

    function s(e, t, n, r, a, i) {
        switch (t) {
            case m.ARROW_DOWN:
                r.hoverNextDialog(i), cancelEvent(n);
                break;
            case m.ARROW_UP:
                r.hoverPrevDialog(i), cancelEvent(n);
                break;
            case m.ENTER:
                (!(0, g.isEditableFocused)() || gpeByClass("_im_dialogs_search_input", document.activeElement)) && r.selectHoveredDialog(i);
                break;
            case m.PRINTABLE:
                a.focusInput(i)
        }
    }

    function o(e, t, n, r, a) {
        switch (t) {
            case m.HOME:
            case m.END_KEY:
                r.isEmpty(a) && i(e, t, n, r, a);
                break;
            case m.PAGE_UP:
            case m.PAGE_DOWN:
                i(e, t, n, r, a)
        }
    }

    function l(e, t, n, r, a) {
        switch (t) {
            case m.PAGE_UP:
                !n.ctrlKey && (0, g.isClassicInterface)(a) && (r.scroll("up"), cancelEvent(n));
                break;
            case m.PAGE_DOWN:
                !n.ctrlKey && (0, g.isClassicInterface)(a) && (r.scroll("down"), cancelEvent(n));
                break;
            case m.ARROW_DOWN:
                r.hoverNextElement(a);
                break;
            case m.ARROW_UP:
                r.hoverPrevElement(a);
                break;
            case m.ENTER:
                gpeByClass("_im_dialogs_creation_name", document.activeElement) ? r.confirmCreate(a) : gpeByClass("im-create--search", document.activeElement) && r.selectElement(a);
                break;
            case m.PRINTABLE:
                r.focusSearch(a)
        }
    }

    function u(e, t, n, r, u, c) {
        var g = (0, d["default"])({
            state: t || "default"
        });
        return {
            signal: function(t, a) {
                if (!cur.storyLayer && !cur.articleEditorLayer) switch (g.get().state) {
                    case "default":
                        return i(g, t, a, r, e);
                    case "fwd":
                    case "search":
                        return s(g, t, a, n, u, e);
                    case "create":
                        return l(g, t, a, c, e);
                    case "message":
                        return o(g, t, a, r, e);
                    default:
                        throw new Error("Unknown state: " + g.get().state)
                }
            },
            transition: function(e) {
                return g.set(a.bind(null, e))
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.create = u;
    var c = n(78),
        d = r(c),
        g = n(20),
        m = n(5)
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        var r = intval(domData(n, "msgid"));
        if (!getSelectionText() && !(0, c.checkSelectClick)(t)) {
            var a = intval(domData(n, "peer"));
            return e.set(u.cancelSearch.bind(null, a)), e.get().longpoll.push([(0, d.changePeer)(a, r)]), !1
        }
    }

    function a(e) {
        return (0, u.isSearchAllLoaded)(e.get().peer, e.get()) ? Promise.resolve("") : (0, u.searchMessagesInplace)(e.get().peer, e.get())
    }

    function i(e, t) {
        return {
            isAll: function(e) {
                return (0, u.isSearchAllLoaded)(e.get().peer, e.get())
            },
            loadMore: function(e) {
                return a(e)
            },
            unmount: function() {
                (0, l.destroyModule)(t)
            }
        }
    }

    function s(e) {
        return e.findIndex(function(e) {
            return "number" == typeof e.peerId && e.href
        }) > -1
    }

    function o(e, t) {
        var n = r.bind(null, t),
            a = (0, l.createModule)({
                handlers: function(t, r) {
                    r(e, "click", "_im_mess", n)
                }
            });
        return i(e, a)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.doesSearchResultContainConversations = s, t.mount = o;
    var l = n(83),
        u = n(46),
        c = n(20),
        d = n(132)
}, function(e, t, n) {
    "use strict";

    function r(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function a(e, t) {
        return (0, P.toArray)(e).find(function(e) {
            return domData(e, "list-id") === t
        })
    }

    function i(e, t) {
        return (0, P.toArray)(e).findIndex(function(e) {
            return domData(e, "list-id") === t
        })
    }

    function s(e, t, n, r) {
        if (n) {
            o(e, t, r);
            var i = domData(n, "list-id"),
                s = i && a(t.children, i);
            s && r.forEach(function(e) {
                return addClass(s, e)
            }), e.setState({
                hoveredListItemId: i
            })
        }
    }

    function o(e, t, n) {
        var r = domQuery("." + n.join("."), t);
        r && (0, P.toArray)(r).forEach(function(e) {
            n.forEach(function(t) {
                return removeClass(e, t)
            })
        }), e.setState({
            hoveredListItemId: null
        })
    }

    function l(e, t) {
        var n = t && domQuery("." + t.join("."), e)[0];
        return n ? domData(n, "list-id") : null
    }

    function u(e, t, n) {
        return e.map(t).reduce(function(e, t) {
            return e[t] = !0, e
        }, n)
    }

    function c(e, t, n) {
        var r = e.filter(function(e) {
            return !n.ids[t(e)]
        });
        return {
            _sortedEls: !1,
            els: r,
            ids: u(r, t, n.ids),
            elements: n.elements.concat(r)
        }
    }

    function d(e, t, n) {
        return {
            ids: u(n.get().elements, e, {}),
            scrolls: t,
            activated: !0
        }
    }

    function g(e, t, n) {
        return n.elements = n.elements.filter(function(n) {
            return t(n) !== e
        }), delete n.ids[e], Promise.resolve(n)
    }

    function m(e, t, n) {
        var r = [];
        n.elements = n.elements.map(function(n) {
            var a = t(n),
                i = e.filter(function(e) {
                    return t(e) === a
                })[0];
            return r.push(a), i || n
        });
        var a = e.filter(function(e) {
            return !inArray(t(e), r)
        });
        return n.elements = n.elements.concat(a), Promise.resolve(n)
    }

    function f(e, t) {
        var n = t.get();
        return !n._sortedEls && e && t.setState({
            elements: n.elements.sort(e),
            _sortedEls: !0
        }), t.get().elements
    }

    function p(e) {
        var t = {};
        return e.forEach(function(e) {
            "r" === e[0] && t["a," + e[1]] ? delete t["a," + e[1]] : t[e[0] + "," + e[1]] = e
        }), Object.keys(t).map(function(e) {
            return t[e]
        })
    }

    function _(e, t) {
        for (var n = [], r = Math.max(e.length, t.length), a = 0; r > a; a++) {
            var i = e[a],
                s = t[a];
            !i && s ? n.push(["a", s, a]) : i && !s ? n.push(["r", i, a]) : i !== s && (n.push(["r", i, a]), n.push(["a", s, a]))
        }
        var o = p(n),
            l = p(n.reverse());
        return o.length > l.length ? l : o
    }

    function h(e, t, n, r, a, i) {
        for (var s = 0; r > s; s++) e = domNS(e);
        var o = se(a(t));
        return domData(o, "list-id", n), e ? i.insertBefore(o, e) : i.appendChild(o), e
    }

    function v(e, t, n, r) {
        if (0 !== t.length) {
            t = t.sort(function(e, t) {
                return e[2] - t[2]
            });
            var a = t.filter(function(e) {
                    return "a" === e[0]
                }),
                i = t.filter(function(e) {
                    return "r" === e[0]
                });
            if (i.map(function(t) {
                    return e.children[t[2]]
                }).forEach(function(e) {
                    return re(e)
                }), 0 !== a.length)
                for (var s = a.shift(), o = s[2], l = h(e.children[o], n[s[2]], s[1], 0, r, e), u = 0; u < a.length; u++) s = a[u], l = h(e.children[o], n[s[2]], s[1], s[2] - o, r, e), o = s[2]
        }
    }

    function b(e, t) {
        e.get().loading ? t.update(!1, !0) : (e.get().loading = !0, t.update(!1, !0), e.get().loading = !1)
    }

    function y(e, t, n, r, a) {
        var i = r.get(),
            s = i.limit,
            o = i.offset,
            l = n().sortFn,
            u = f(l, r).slice(0, o + s),
            c = (0, P.toArray)(e.children).map(function(e) {
                return domData(e, "list-id")
            }).filter(function(e) {
                return !!e
            }),
            d = u.map(function(e) {
                return n().idFn(e).toString()
            }),
            g = _(c, d);
        return v(e, g, u, n().renderFn), b(r, t), a ? g.filter(function(e) {
            return "a" == e[0]
        }).map(function(e) {
            return parseInt(e[1])
        }) : void 0
    }

    function C(e, t, n, r) {
        var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !1,
            s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
            o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
            l = e.get(),
            u = t.getContainer().children,
            c = i(u, r || l.hoveredListItemId);
        if (!(0 > c)) {
            var d = void 0;
            d = l.limit + l.offset < c ? e.setState({
                offset: c - l.limit + 1
            }).then(y.bind(null, t.getContainer(), t, n)) : Promise.resolve(), d.then(function() {
                var e = u[c],
                    n = t.scrollTop(),
                    r = t.getScrollHeight(),
                    i = e.offsetHeight;
                s = "center" === s ? -.5 * t.getScrollHeight() : s, o = "center" === o ? r / 2 : o;
                var l = a ? function(e) {
                        t.smoothScroll(e - t.scrollTop())
                    } : t.scrollTop.bind(t),
                    d = n + s > e.offsetTop,
                    g = i + e.offsetTop > n + r - o;
                d ? l(e.offsetTop - s) : g && l(e.offsetTop - r + i + o)
            })
        }
    }

    function w(e, t) {
        if (e.get().loading || e.get().stop || !e.get().activated) return Promise.resolve([]);
        e.get().loading = !0;
        for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), a = 2; n > a; a++) r[a - 2] = arguments[a];
        return t.apply(void 0, r).then(function(t) {
            e.get().loading = !1
        })
    }

    function E(e, t, n) {
        return n.scrolls || (n.scrolls = {}), (!n.scrolls[e] || t) && (n.scrolls[e] = {
            scrolled: n.scrolled || 0,
            scrollItem: n.scrollItem
        }), Promise.resolve(n)
    }

    function k(e, t, n, r) {
        var a = e.get(),
            i = a.elements,
            s = r.getContainer(),
            o = e.setState({
                offset: a.offset + a.limit
            }).then(function(n) {
                var o = a.offset,
                    l = a.limit,
                    u = void 0;
                return l + o > i.length ? u = t().more(o, l).then(function(t) {
                    return t === !1 ? [] : (0 === t.length && e.setState({
                        stop: !0
                    }), t)
                }).then(S.bind(null, e, s, r, t, a.pipeId)) : (u = Promise.resolve(), y(s, r, t, e)), u
            });
        if (!n) {
            var l = i.length > 0 ? "im-preloader_fixed-bottom" : "im-preloader_fixed-center";
            (0, M.wrapLoading)(s)(o, "bottom", l)
        }
        return o
    }

    function T(e, t) {
        var n = e.get().pipeId;
        return !("undefined" != typeof n && "undefined" != typeof t && n !== t)
    }

    function S(e, t, n, r, a, i) {
        return T(e, a) ? e.setState(c(i, r().idFn, e.get())).then(y.bind(null, t, n, r)) : !1
    }

    function I(e, t, n) {
        var c = w.bind(null, t, k.bind(null, t, n)),
            f = function(e, r) {
                (t.get().activated || e) && ("undefined" != typeof r && t.get().elements.length > 0 && t.setState({
                    scrolled: r
                }), n().onScroll && n().onScroll())
            },
            p = (0, L.createScroll)(e, {
                noScroll: t.get().noScroll,
                nativeScroll: t.get().nativeScroll,
                scrollChange: f.bind(null, !1),
                more: n().more ? c.bind(null, !1) : !1
            }),
            _ = (0, A.createModule)({
                handlers: function(r, a) {
                    a(e, "click", t.get().elCls, n().onClick)
                }
            });
        return t.setState(d(n().idFn, {}, t)), {
            pipe: function(e, r) {
                return t.setState({
                    pipeId: r
                }), e.then(S.bind(null, t, p.getContainer(), p, n, r))
            },
            replacePreserveOrder: function(e) {
                return t.set(m.bind(null, e, n().idFn)).then(y.bind(null, p.getContainer(), p, n))
            },
            pipeReplace: function(e, r) {
                var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
                return t.setState({
                    pipeId: r,
                    stop: !1
                }), e.then(function(e) {
                    return T(t, r) ? t.setState({
                        elements: e,
                        _sortedEls: !1,
                        ids: u(e, n().idFn, {})
                    }).then(y.bind(null, p.getContainer(), p, n, t, a)) : void 0
                })
            },
            wipe: function() {
                p.getContainer().innerHTML = ""
            },
            deactivate: function() {
                t.setState({
                    activated: !1
                })
            },
            activate: function() {
                t.setState({
                    activated: !0
                })
            },
            saveScroll: function(e, n) {
                return t.set(E.bind(null, e, n))
            },
            updateScroll: function() {
                p.update(!1, !0)
            },
            toTop: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                t ? p.smoothScroll(-p.scrollTop()) : p.scrollTop(0), e && f(e, 0)
            },
            scrollTop: function(e) {
                return p.scrollTop(e)
            },
            restoreScroll: function(e) {
                var n = t.get().scrolls,
                    a = n[e];
                return a && (t.setState({
                    scrolls: extend({}, n, r({}, e, null))
                }), p.scrollTop(a.scrolled)), !!a
            },
            unsetScroll: function(e) {
                t.setState({
                    scrolls: extend({}, t.get().scrolls, r({}, e, null))
                })
            },
            scrollPage: function(e, t) {
                var n = p.scroll.scroller,
                    r = p.scrollTop(),
                    a = "up" === e ? -1 : 1,
                    i = r + a * n.clientHeight;
                t ? p.smoothScroll(i - r) : p.scrollTop(i)
            },
            scrollToElement: function(e, r, a, i) {
                C(t, p, n, e, r, a, i)
            },
            checkMore: function(e) {
                return t.get().elements.length < t.get().limit ? c(e, p) : Promise.resolve([])
            },
            add: function(e, r) {
                return S(t, p.getContainer(), p, n, r, e)
            },
            hoverNextElement: function(e, r) {
                var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    o = p.getContainer(),
                    u = o.children,
                    c = t.get().hoveredListItemId || l(o, r),
                    d = i(u, c),
                    g = (0, P.toArray)(u).slice(d + 1).find(n().hoverableFn);
                s(t, o, g, e), C(t, p, n, null, !1, a.top, a.bottom)
            },
            hoverPrevElement: function(e, r) {
                var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                    o = p.getContainer(),
                    u = o.children,
                    c = t.get().hoveredListItemId || l(o, r),
                    d = i(u, c),
                    g = d >= 0 && (0, P.toArray)(u).slice(0, d).reverse().find(n().hoverableFn);
                s(t, o, g, e), C(t, p, n, null, !1, a.top, a.bottom)
            },
            hoverFirstElement: function(e, r) {
                var a = p.getContainer(),
                    i = a.children,
                    o = (0, P.toArray)(i).findIndex(n().hoverableFn),
                    l = i[o];
                !t.get().hoveredListItemId && l && (s(t, a, l, e), C(t, p, n, o, !1, r.top, r.bottom))
            },
            hoverElement: function(e, r, a) {
                var o = p.getContainer(),
                    l = o.children,
                    u = i(l, e),
                    c = l[u];
                c && (s(t, o, c, r), C(t, p, n, u, !1, a.top, a.bottom))
            },
            unhoverElements: function(e) {
                o(t, p.getContainer(), e)
            },
            reset: function() {
                var e = t.get().scrolls;
                t.reset(), t.setState(d(n().idFn, e, t))
            },
            getHoveredElement: function() {
                return a(p.getContainer().children, t.get().hoveredListItemId)
            },
            getCurrentElements: function() {
                return t.get().elements
            },
            isLoading: function() {
                return t.get().loading
            },
            isEmpty: function() {
                return 0 === t.get().elements.length
            },
            remove: function(e) {
                t.set(g.bind(null, e, n().idFn)).then(y.bind(null, p.getContainer(), p, n))
            },
            unmount: function() {
                (0, A.destroyModule)(_), p.destroy()
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.createIdMap = u, t.addElements = c, t.collapseOps = p, t.distance = _, t.mount = I;
    var M = n(20),
        P = n(36),
        L = n(112),
        A = n(83)
}, function(e, t, n) {
    "use strict";
    var r = n(43),
        a = n(54),
        i = n(70),
        s = n(17)("species");
    e.exports = function(e) {
        var t = r[e];
        i && t && !t[s] && a.f(t, s, {
            configurable: !0,
            get: function() {
                return this
            }
        })
    }
}, , , function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        return e.which || e.keyCode
    }

    function i(e, t) {
        var n = e.get().tabbedPeers[t];
        n && e.get().longpoll.push([(0, m.changePeer)(n.peer, !1, !0, !0)])
    }

    function s(e, t, n) {
        !n || inArray(a(n), c.UNPRINTABLE_KEYS) || (0, d.isSearchingInplace)(e.get().peer, e.get()) || (0, g.isEditableFocused)() || n.ctrlKey || browser.mac && n.metaKey || n.key && 1 !== n.key.length || t.signal("printable", n)
    }

    function o(e, t, n) {
        a(n) === c.ENTER && e.signal(a(n), n)
    }

    function l(e, t, n, r) {
        var s = a(r);
        if (!layers.visible) {
            if (s >= 49 && 57 >= s && (r.ctrlKey || r.metaKey && browser.mac) && (0, g.isClassicInterface)(t)) return i(t, s - 49), cancelEvent(r);
            inArray(s, c.UP_DOWN_CONTROLS) && e.signal(s, r)
        }
    }

    function u(e, t) {
        var n = browser.mozilla ? "keydown" : "keypress",
            r = (0, p["default"])({
                signalTimer: !1
            }),
            a = s.bind(null, e, t),
            i = l.bind(null, t, e, r),
            u = o.bind(null, t, r),
            c = (0, _.createModule)({
                handlers: function(e, t) {
                    e(document, "keydown", i), e(document, "keyup", u), e(document, n, a)
                }
            });
        return {
            unmount: function() {
                (0, _.destroyModule)(c)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = u;
    var c = n(5),
        d = n(46),
        g = n(20),
        m = n(132),
        f = n(78),
        p = r(f),
        _ = n(83)
}, function(e, t, n) {
    var r = n(86),
        a = n(100),
        i = n(94),
        s = Object.defineProperty;
    t.f = n(70) ? Object.defineProperty : function(e, t, n) {
        if (r(e), t = i(t, !0), r(n), a) try {
            return s(e, t, n)
        } catch (o) {}
        if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
        return "value" in n && (e[t] = n.value), e
    }
}, , , function(e, t, n) {
    var r = n(130),
        a = n(138);
    e.exports = Object.keys || function(e) {
        return r(e, a)
    }
}, function(e, t, n) {
    var r = n(81),
        a = n(129),
        i = n(63),
        s = n(86),
        o = n(33),
        l = n(115);
    e.exports = function(e, t, n, u, c) {
        var d, g, m, f = c ? function() {
                return e
            } : l(e),
            p = r(n, u, t ? 2 : 1),
            _ = 0;
        if ("function" != typeof f) throw TypeError(e + " is not iterable!");
        if (i(f))
            for (d = o(e.length); d > _; _++) t ? p(s(g = e[_])[0], g[1]) : p(e[_]);
        else
            for (m = f.call(e); !(g = m.next()).done;) a(m, p, g.value, t)
    }
}, function(e, t, n) {
    var r = n(43),
        a = n(99),
        i = n(114),
        s = n(127)("src"),
        o = "toString",
        l = Function[o],
        u = ("" + l).split(o);
    n(31).inspectSource = function(e) {
        return l.call(e)
    }, (e.exports = function(e, t, n, o) {
        var l = "function" == typeof n;
        l && (i(n, "name") || a(n, "name", t)), e[t] !== n && (l && (i(n, s) || a(n, s, e[t] ? "" + e[t] : u.join(String(t)))), e === r ? e[t] = n : o ? e[t] ? e[t] = n : a(e, t, n) : (delete e[t], a(e, t, n)))
    })(Function.prototype, o, function() {
        return "function" == typeof this && this[s] || l.call(this)
    })
}, function(e, t, n) {
    var r = n(61),
        a = Math.max,
        i = Math.min;
    e.exports = function(e, t) {
        return e = r(e), 0 > e ? a(e + t, 0) : i(e, t)
    }
}, function(e, t) {
    var n = Math.ceil,
        r = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e)
    }
}, function(e, t) {
    function n() {
        u = !1, s.length ? l = s.concat(l) : c = -1, l.length && r()
    }

    function r() {
        if (!u) {
            var e = setTimeout(n);
            u = !0;
            for (var t = l.length; t;) {
                for (s = l, l = []; ++c < t;) s && s[c].run();
                c = -1, t = l.length
            }
            s = null, u = !1, clearTimeout(e)
        }
    }

    function a(e, t) {
        this.fun = e, this.array = t
    }

    function i() {}
    var s, o = e.exports = {},
        l = [],
        u = !1,
        c = -1;
    o.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        l.push(new a(e, t)), 1 !== l.length || u || setTimeout(r, 0)
    }, a.prototype.run = function() {
        this.fun.apply(null, this.array)
    }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = i, o.addListener = i, o.once = i, o.off = i, o.removeListener = i, o.removeAllListeners = i, o.emit = i, o.binding = function(e) {
        throw new Error("process.binding is not supported")
    }, o.cwd = function() {
        return "/"
    }, o.chdir = function(e) {
        throw new Error("process.chdir is not supported")
    }, o.umask = function() {
        return 0
    }
}, function(e, t, n) {
    var r = n(18),
        a = n(17)("iterator"),
        i = Array.prototype;
    e.exports = function(e) {
        return void 0 !== e && (r.Array === e || i[a] === e)
    }
}, function(e, t, n) {
    var r = n(136);
    e.exports = function(e) {
        return Object(r(e))
    }
}, function(e, t, n) {
    var r = n(107),
        a = n(17)("toStringTag"),
        i = "Arguments" == r(function() {
            return arguments
        }()),
        s = function(e, t) {
            try {
                return e[t]
            } catch (n) {}
        };
    e.exports = function(e) {
        var t, n, o;
        return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(n = s(t = Object(e), a)) ? n : i ? r(t) : "Object" == (o = r(t)) && "function" == typeof t.callee ? "Arguments" : o
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (!e.first_name) {
            var t = e.name.split(" ", 2);
            e.first_name = t[0], e.short_name = t[1] ? t[0] + " " + t[1].substr(0, 1) + "." : t[0]
        }
        e.inv_name || (e.inv_name = e.name), e.kick_name || (e.kick_name = e.inv_name)
    }

    function a(e, t) {
        var n = (0, o.unpackStore)(e);
        return t in n.oCache
    }

    function i(e, t) {
        var n = (0, o.unpackStore)(e).oCache[t];
        return n && !n._n && (r(n), n._n = 1), n
    }

    function s(e, t) {
        var n = (0, o.unpackStore)(e);
        n.oCache || (n.oCache = {}), t.id && (n.oCache[t.id] = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.oCacheExists = a, t.oCacheGet = i, t.oCacheAdd = s;
    var o = n(139)
}, function(e, t, n) {
    "use strict";

    function r() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "im_settings";
        return getTemplate(e, {
            sound: ls.get("sound_notify_off") ? getLang("mail_im_sound_off") : getLang("mail_im_sound_on"),
            browser: i() ? getLang("mail_im_notifications_on") : getLang("mail_im_notifications_off")
        })
    }

    function a(e, t) {
        showTooltip(t.target, {
            content: r("im_settings_pop"),
            dir: "down",
            shift: [220, 9],
            hasover: !0,
            showdt: 300
        })
    }

    function i() {
        return DesktopNotifications.supported() && !DesktopNotifications.checkPermission() && !ls.get("im_ui_notify_off")
    }

    function s(e, t, n, a, s) {
        var o = domData(s, "action"),
            l = gpeByClass("_im_settings_menu", s),
            u = hasClass(l, "_im_settings_popup") ? "im_settings_pop" : "im_settings";
        switch (o) {
            case "spam":
                (0, g.showSpamLayer)(e, c.mount, a);
                break;
            case "sound":
                ls.get("sound_notify_off") ? ls.set("sound_notify_off", 0) : ls.set("sound_notify_off", 1), l.outerHTML = r(u);
                break;
            case "browser":
                i() ? (ls.set("im_ui_notify_off", 1), l.outerHTML = r(u)) : DesktopNotifications.checkPermission() ? DesktopNotifications.requestPermission(function() {
                    l.parentNode && (l.outerHTML = r(u))
                }) : (ls.set("im_ui_notify_off", 0), l.outerHTML = r(u))
        }
    }

    function o(e, t) {
        return {
            updateFilter: function(t) {
                var n = void 0,
                    r = t.get().active_tab === m.FOLDER_UNREAD;
                n = t.get().unread_cnt > 0 ? getTemplate("im_filter", {
                    filter: r ? getLang("mail_to_all_dialogs") : getLang("mail_to_unread"),
                    cls: ""
                }) : getTemplate("im_filter", {
                    filter: getLang("mail_all_dialogs"),
                    cls: "im-page--dialogs-filter_disabled"
                }), val(geByClass1(_, e), n)
            },
            toggleLoader: function(t, n) {
                var r = geByClass1(f, e);
                toggleClass(r, "im-page--dialogs-settings_loading", n)
            },
            updateSettings: function(t) {
                var n = geByClass1("_im_settings_menu", e);
                n.outerHTML = r()
            },
            unmount: function() {
                (0, u.destroyModule)(t)
            }
        }
    }

    function l(e, t, n) {
        var r = a.bind(null, t),
            i = s.bind(null, t, n, e),
            l = function(e, r) {
                if ((0, g.showUnreadOnly)(t, n, d.changeDialogsTab)) {
                    var a = t.get().active_tab === m.FOLDER_UNREAD;
                    val(r, getTemplate("im_filter", {
                        filter: a ? getLang("mail_to_all_dialogs") : getLang("mail_to_unread")
                    }))
                }
            },
            c = (0, u.createModule)({
                handlers: function(t, n) {
                    n(e, "mouseover", f, r), n(e, "click", p, i), n(e, "click", _, l)
                }
            });
        return o(e, c)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = l;
    var u = n(83),
        c = n(126),
        d = n(46),
        g = n(20),
        m = n(5),
        f = "_im_dialogs_cog_settings",
        p = "_im_settings_action",
        _ = "_im_to_unread"
}, function(e, t, n) {
    "use strict";

    function r() {
        return {
            txt: "",
            attaches: [],
            urlBinds: []
        }
    }

    function a(e, t) {
        this._db = e, this._key = t, this.dData = r(), this.load()
    }

    function i(e) {
        switch (e.type) {
            case "mail":
                return e.id < 0 && 1 == e.object.fwd_count;
            default:
                return !e.object
        }
    }

    function s(e) {
        return {
            txt: e.txt,
            attaches: e.attaches.length ? e.attaches : void 0,
            urlBinds: e.urlBinds.length ? e.urlBinds : void 0
        }
    }

    function o(e) {
        return {
            txt: e.txt,
            attaches: e.attaches || [],
            urlBinds: e.urlBinds || []
        }
    }

    function l(e, t) {
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
                fwd_count: (0, g.parseFwd)(e.fwd).length
            }
        });
        for (var r = 1; e["attach" + r + "_type"]; ++r) n.push({
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

    function u(e, t) {
        return new a(e, "draft_" + t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var c = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && o["return"] && o["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.ImDraft = a, t.convertKludgesToAttaches = l, t.loadDraftForPeer = u;
    var d = n(85),
        g = n(20);
    a.prototype.dump = function() {
        this._key && this._db.updateByKey(this._key, s(this.dData))
    }, a.prototype.load = function() {
        if (this._key) {
            var e = this._db.selectByKey(this._key);
            e && (this.dData = o(e))
        }
    }, a.prototype.clear = function() {
        this.dData = r(), this.dump()
    }, a.prototype.setText = function(e) {
        this.dData.txt = trim(e), this.dump()
    }, a.prototype.addAttach = function(e, t, n) {
        ("share" === e || "mail" === e) && this.removeAttachByType(e);
        var r = this.dData.attaches.find(function(n) {
            return n.type === e && n.id === t
        });
        !r && e && t && (this.dData.attaches.push({
            type: e,
            id: t,
            object: n
        }), this.dump())
    }, a.prototype.syncWithSelector = function(e) {
        var t = this,
            n = this.getFwdRaw();
        this.dData.attaches = (n ? [n] : []).concat(e.getMedias().map(function(e) {
            var n = c(e, 2),
                r = n[0],
                a = n[1],
                i = t.dData.attaches.find(function(e) {
                    return e.type == r && e.id == a
                });
            return i || {
                type: r,
                id: a
            }
        })), this.dump()
    }, a.prototype.removeAttachByType = function(e) {
        for (var t = this.dData.attaches.length; t--;) this.dData.attaches[t].type === e && this.dData.attaches.splice(t, 1);
        this.dump()
    }, a.prototype.removeAllAttaches = function() {
        this.dData.attaches = [], this.dump()
    }, a.prototype.addBindUrl = function(e, t, n) {
        this.getBoundAttach(e) || (this.dData.urlBinds.push({
            url: e,
            type: t,
            id: n
        }), this.dump())
    }, a.prototype.getBoundAttach = function(e) {
        var t = this.dData.urlBinds.find(function(t) {
            return t.url === e
        });
        return t ? this.dData.attaches.find(function(e) {
            return e.type === t.type && e.id === t.id
        }) || null : null
    }, a.prototype.getShareUrl = function() {
        var e = this.dData.attaches.find(function(e) {
            return "share" === e.type
        });
        return e && e.object ? e.object.url : void 0
    }, a.prototype.hasAttaches = function() {
        return this.dData.attaches.length > 0
    }, a.prototype.destroy = function() {
        this.dData = {}, this._key = this._db = null
    }, a.prototype.prepareObjects = function(e, t) {
        var n = this,
            r = this.dData.attaches.find(i);
        return r ? (0, d.post)(d.CONTROLLER, {
            act: "draft_medias",
            gid: e,
            messageId: t || 0,
            media: t ? void 0 : this.dData.attaches.map(function(e) {
                return [e.type, e.id]
            }).join("*")
        }).then(function(e) {
            var t = c(e, 1),
                r = t[0];
            n.dData.attaches = r.map(function(e) {
                return {
                    type: e[0],
                    id: e[1],
                    object: e[2]
                }
            })
        }) : Promise.resolve()
    }, a.prototype.getFwdRaw = function() {
        return this.dData.attaches.find(function(e) {
            return "mail" === e.type
        })
    }, a.prototype.getFwdCount = function() {
        var e = this.getFwdRaw();
        return e ? e.id < 0 ? e.object.fwd_count : e.id.split(";").length : 0
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        var n = domData(t, "chat-id"),
            r = domData(t, "hash");
        return lockButton(t), (0, s.joinChat)(n, r, e.get()).then(function(n) {
            var r = i(n, 1),
                a = r[0];
            unlockButton(t), e.get().longpoll.push([(0, l.changePeer)(a)])
        })["catch"](function(e) {
            showFastBox(getLang("mail_join_invite_error_title"), e), unlockButton(t)
        })
    }

    function a(e, t) {
        var n = (0, o.createModule)({
            handlers: function(n, a) {
                a(e, "click", u, function(e) {
                    return r(t, e.target)
                })
            }
        });
        return {
            unmount: function() {
                (0, o.destroyModule)(n)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var i = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && o["return"] && o["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.mount = a;
    var s = n(46),
        o = n(83),
        l = n(132),
        u = "_im_join_chat"
}, function(e, t, n) {
    e.exports = !n(4)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t, n) {
    "use strict";
    var r = n(24),
        a = n(137),
        i = n(2),
        s = {};
    n(99)(s, n(17)("iterator"), function() {
        return this
    }), e.exports = function(e, t, n) {
        e.prototype = r(s, {
            next: a(1, n)
        }), i(e, t + " Iterator")
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        var t = c.get(e.currentTarget);
        if (t) {
            var n = t[e.type];
            if (n)
                for (var r = void 0, a = 0; a < n.length; a++) {
                    var i = o(n[a], 2),
                        s = i[0],
                        l = i[1],
                        u = void 0;
                    if (hasClass(e.target, s) ? u = l(e, e.target) : (r = gpeByClass(s, e.target, e.currentTarget)) && (u = l(e, r)), u === !1) break
                }
        }
    }

    function i(e, t, n, r) {
        var i = c.get(e);
        i || (c.set(e, {}), i = c.get(e));
        for (var s = t.split(" "), o = 0; o < s.length; o++) {
            var l = s[o];
            i[l] || (i[l] = [], addEvent(e, l, a)), i[l].push([n, r])
        }
    }

    function s(e, t, n, r) {
        var i = c.get(e);
        if (i) {
            t.split(" ").forEach(function(t) {
                i[t] && (i[t] = i[t].filter(function(e) {
                    return e[0] !== n || e[1] !== r
                }), 0 === i[t].length && removeEvent(e, t, a))
            });
            var s = Object.keys(i).map(function(e) {
                return i[e].length
            }).reduce(function(e, t) {
                return e + t
            });
            0 === s && c["delete"](e)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && o["return"] && o["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.addDelegateEvent = i, t.removeDelegateEvent = s;
    var l = n(120),
        u = r(l),
        c = new u["default"]
}, function(e, t, n) {
    var r = n(17)("iterator"),
        a = !1;
    try {
        var i = [7][r]();
        i["return"] = function() {
            a = !0
        }, Array.from(i, function() {
            throw 2
        })
    } catch (s) {}
    e.exports = function(e, t) {
        if (!t && !a) return !1;
        var n = !1;
        try {
            var i = [7],
                s = i[r]();
            s.next = function() {
                n = !0
            }, i[r] = function() {
                return s
            }, e(i)
        } catch (o) {}
        return n
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        return e.queue || e.key
    }

    function i(e) {
        return window.curNotifier ? !curNotifier.addQueues[a(e)] : !1
    }

    function s(e) {
        return window.curNotifier ? void!curNotifier.addQueues[a(e)] : !1
    }

    function o() {
        _.forEach(function(e, t) {
            var n = e.onData,
                r = e.onUpdateKey,
                a = e.ts;
            i(t) && Notifier.addKey(extend(t, {
                ts: a
            }), d.bind(null, n, r, t))
        })
    }

    function l() {
        h || (h = setInterval(o, 3e3))
    }

    function u(e) {
        s(e), _["delete"](e), 0 === _.size && (clearInterval(h), h = !1)
    }

    function c(e, t, n, r) {
        var a = void 0;
        switch (e) {
            case 1:
            case 2:
            case 3:
            case 5:
                a = r(t, e);
                break;
            case 4:
                a = (0, p.pause)(1).then(function() {
                    return t
                });
                break;
            default:
                throw new Error("Unkonwn error from queue: " + e)
        }(0, p.pause)(3).then(function() {
            return a
        }).then(function(e) {
            _.set(e, {
                onUpdateKey: r,
                onData: n,
                ts: e.ts
            }), o(), l()
        })
    }

    function d(e, t, n, r, a) {
        return a.failed ? (u(n), void c(a.err, n, e, t)) : (_.set(n, {
            onData: e,
            onUpdateKey: t,
            ts: intval(a.ts)
        }), void a.events.map(function(e) {
            return e.split("<!>")
        }).forEach(e))
    }

    function g(e, t, n) {
        return Notifier.addKey(e, d.bind(null, t, n, e)), _.set(e, {
            onData: t,
            onUpdateKey: n,
            ts: e.ts
        }), l(), {
            stop: u.bind(null, e)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.createWorker = g;
    var m = n(120),
        f = r(m),
        p = n(3),
        _ = new f["default"],
        h = !1
}, function(e, t, n) {
    "use strict";

    function r(e, t, n, r, a) {
        var i = 52,
            s = 105 + ((0, v.isPinnedMessageVisibleInTab)(e, (0, p.getPeer)(e)) ? i : 0);
        showTooltip(t, {
            shift: [n, 10],
            black: 1,
            className: "_im_history_tooltip " + r,
            appendParentCls: "_im_mess_stack",
            toup: t.getBoundingClientRect().top > s + 37,
            text: a
        })
    }

    function a(e, t, n) {
        var r = gpeByClass("_im_mess", n),
            a = intval(domData(r, "msgid")),
            s = e.get().peer,
            o = (0, p.getMessage)(e, s, a),
            l = !(0, f.isImportant)(o);
        return e.get().longpoll.push([{
            peerId: s,
            messageId: a,
            type: l ? h.SET_FLAGS : h.RESET_FLAGS,
            flags: h.FLAG_IMPORTANT
        }]), e.set(g.favMessage.bind(null, [a], l, s)), i(e, -10, t, n), !1
    }

    function i(e, t, n, a) {
        var i = getLang("mail_im_toggle_important").length > 14;
        r(e, a, i ? 84 : 34, i ? "im-star-tt_long" : "im-star-tt", function() {
            var t = domData(gpeByClass("_im_mess", a), "msgid"),
                n = (0, p.getMessage)(e, e.get().peer, t);
            return n ? (0, f.isImportant)(n) ? getLang("mail_im_unmark_important") : getLang("mail_im_toggle_important") : ""
        })
    }

    function s(e, t, n) {
        var r = e.get().peer,
            a = +domData(domClosest("im-mess", n.target), "msgid");
        return (0, g.processFwd)([a], r, e).then(function(t) {
            return e.set(g.forwardMessages.bind(null, t, e.get().tfdraft))
        }).then(function() {
            return t().respond(e, r)
        }), !1
    }

    function o(e, t, n, a) {
        r(e, a, 18, "im-reply-tt", getLang("mail_im_reply"))
    }

    function l(e, t, n, r) {
        var a = intval(domData(gpeByClass("_im_mess", r), "msgid")),
            i = (0, p.getMessage)(e, e.get().peer, a);
        return i && t().startEditing(i), !1
    }

    function u(e, t, n) {
        r(e, n, 18, "im-edit-tt", getLang("mail_im_edit"))
    }

    function c(e, t) {
        return {
            markImportant: function(t, n, r) {
                (0, m.updateStar)(t, n, e)
            },
            unmount: function() {
                (0, _.destroyModule)(t)
            }
        }
    }

    function d(e, t, n) {
        var r = i.bind(null, t, 0),
            d = a.bind(null, t),
            g = o.bind(null, t, 0),
            m = s.bind(null, t, n),
            f = u.bind(null, t),
            p = l.bind(null, t, n),
            h = (0, _.createModule)({
                handlers: function(t, n) {
                    n(e, "click", b, d), n(e, "mouseover", b, r), n(e, "click", y, m), n(e, "mouseover", y, g), n(e, "click", C, p), n(e, "mouseover", C, f)
                }
            });
        return c(e, h)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = d;
    var g = n(46),
        m = n(20),
        f = n(8),
        p = n(139),
        _ = n(83),
        h = n(132),
        v = n(121),
        b = "_im_mess_fav",
        y = "_im_mess_reply",
        C = "_im_mess_edit"
}, function(e, t, n) {
    var r = n(17)("unscopables"),
        a = Array.prototype;
    void 0 == a[r] && n(99)(a, r, {}), e.exports = function(e) {
        a[r][e] = !0
    }
}, function(e, t, n) {
    var r = n(122),
        a = n(137),
        i = n(35),
        s = n(94),
        o = n(114),
        l = n(100),
        u = Object.getOwnPropertyDescriptor;
    t.f = n(70) ? u : function(e, t) {
        if (e = i(e), t = s(t, !0), l) try {
            return u(e, t)
        } catch (n) {}
        return o(e, t) ? a(!r.f.call(e, t), e[t]) : void 0
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        return t ? void ls.set(e, t) : ls.get(e)
    }

    function a(e) {
        try {
            var t = {};
            return Error.captureStackTrace(t, e), t.stack
        } catch (n) {
            return ""
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            n = debounce(r, 300),
            s = extend({}, e),
            o = [];
        return t.store && (s = ls.get(t.key) || s), {
            get: function() {
                return s
            },
            set: function(e) {
                var r = this,
                    o = (0, i.isWeirdLogging)() ? a(this.set) : null;
                return e(s).then(function(e) {
                    return s = e, t.store && n(t.key, e), r
                })["catch"](function(e) {
                    return (0, i.imWeirdCatch)("store_set_catch", e, {
                        stack: o
                    })
                })
            },
            setState: function(e) {
                return this.set(function(t) {
                    return Promise.resolve(extend(t, e))
                })
            },
            stash: function() {
                o.push(s), s = extend({}, e)
            },
            reset: function() {
                s = extend({}, e)
            },
            unmount: function() {
                s = {}, e = !1
            },
            pop: function() {
                o.length > 0 && (s = o.pop())
            },
            mutate: function(e) {
                e(s), t.store && n(t.key, s)
            }
        }
    };
    var i = n(117)
}, function(e, t, n) {
    e.exports = n(43).document && document.documentElement
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return {
            unmount: function() {
                (0, i.destroyModule)(e)
            }
        }
    }

    function a(e, t, n) {
        var a = (0, i.createMutations)(r),
            s = a.bindMutations,
            o = (0, i.createModule)({
                handlers: function(e, t) {}
            });
        return s(o)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = a;
    var i = n(83)
}, function(e, t, n) {
    var r = n(12);
    e.exports = function(e, t, n) {
        if (r(e), void 0 === t) return e;
        switch (n) {
            case 1:
                return function(n) {
                    return e.call(t, n)
                };
            case 2:
                return function(n, r) {
                    return e.call(t, n, r)
                };
            case 3:
                return function(n, r, a) {
                    return e.call(t, n, r, a)
                }
        }
        return function() {
            return e.apply(t, arguments)
        }
    }
}, function(e, t) {
    "use strict";

    function n(e, t) {
        var n = void 0,
            r = void 0,
            a = function(a) {
                n = "undefined" != typeof a.clientX ? a.clientX : a.touches[0].clientX, r = "undefined" != typeof a.clientY ? a.clientY : a.touches[0].clientY, t.onDrag && t.onDrag.call(e, n, r)
            },
            i = function o(i) {
                t.onDrop && t.onDrop.call(e, n, r), removeEvent(document, "mouseup touchend mouseleave", o), removeEvent(document, "mousemove touchmove", a)
            },
            s = function(s) {
                (1 === s.which || s.touches && s.touches[0]) && (addEvent(document, "mouseup touchend mouseleave", i), addEvent(document, "mousemove touchmove", a), n = "undefined" != typeof s.clientX ? s.clientX : s.touches[0].clientX, r = "undefined" != typeof s.clientY ? s.clientY : s.touches[0].clientY, t.onStartDrag && t.onStartDrag.call(e, n, r), t.onDrag && t.onDrag.call(e, n, r), cancelEvent(s))
            };
        e.beginDragHandler = s, addEvent(e, "mousedown touchstart", s)
    }

    function r(e) {
        removeEvent(e, "mousedown touchstart", e.beginDragHandler)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.initDraggable = n, t.removeDraggable = r
}, function(e, t, n) {
    "use strict";

    function r(e) {
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

    function a(e, t, n, r) {
        c(t, n, r), e._registeredHandlers.push(["bind", t, n, r])
    }

    function i(e, t, n, r, a) {
        (0, l.addDelegateEvent)(t, n, r, a), e._registeredHandlers.push(["delegate", t, n, r, a])
    }

    function s(e) {
        var t = {
            _registeredHandlers: []
        };
        return e.handlers(a.bind(null, t), i.bind(null, t)), t
    }

    function o(e) {
        e._registeredHandlers.forEach(function(e) {
            var t = e.slice(1);
            "delegate" === e[0] ? l.removeDelegateEvent.apply(void 0, t) : d.apply(void 0, t)
        }), e._registeredHandlers = []
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.createMutations = r, t.createModule = s, t.destroyModule = o;
    var l = n(72),
        u = window,
        c = u.addEvent,
        d = u.removeEvent
}, function(e, t, n) {
    "use strict";
    var r = n(44);
    e.exports = n(23)("Map", function(e) {
        return function() {
            return e(this, arguments.length > 0 ? arguments[0] : void 0)
        }
    }, {
        get: function(e) {
            var t = r.getEntry(this, e);
            return t && t.v
        },
        set: function(e, t) {
            return r.def(this, 0 === e ? 0 : e, t)
        }
    }, r, !0)
}, function(e, t) {
    "use strict";

    function n(e, t, n) {
        return t && (t.im_v = i), new Promise(function(r, a) {
            ajax.post(e, t, {
                timeout: n,
                onDone: function() {
                    r.apply(null, [
                        [].concat(Array.prototype.slice.call(arguments))
                    ])
                },
                onFail: function() {
                    return a.apply(null, arguments), !0
                }
            })
        })
    }

    function r(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = a(e, t, n),
            i = r.request;
        return i
    }

    function a(e, t) {
        function n() {
            a.abort()
        }
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            a = void 0;
        a = window.XDomainRequest ? new XDomainRequest : ajax._getreq();
        var i = new Promise(function(n, i) {
            var s = void 0,
                o = Date.now(),
                l = r.timeout || 60,
                u = ajx2q(t);
            if (window.XDomainRequest) a.open("get", e + "?" + u), a.ontimeout = function() {
                i(["", {}])
            }, a.onerror = function() {
                i(["", {}])
            }, a.onload = function() {
                n([a.responseText, {}])
            }, setTimeout(function() {
                a.send()
            }, 0);
            else {
                a.onreadystatechange = function() {
                    4 == a.readyState && (clearInterval(s), a.status >= 200 && a.status < 300 ? n([a.responseText, a]) : i([a.responseText, a]))
                };
                try {
                    a.open("GET", e + "?" + u, !0)
                } catch (c) {
                    return i([c, a])
                }
                a.send()
            }
            s = setInterval(function() {
                Date.now() - o > 1e3 * l && (i(["", {}]), clearInterval(s))
            }, 1e3)
        });
        return {
            request: i,
            cancel: n
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.post = n, t.plainget = r, t.plaingetCancelable = a;
    var i = (t.CONTROLLER = "al_im.php", 2)
}, function(e, t, n) {
    var r = n(21);
    e.exports = function(e) {
        if (!r(e)) throw TypeError(e + " is not an object!");
        return e
    }
}, function(e, t, n) {
    "use strict";
    var r = n(76),
        a = n(125),
        i = n(18),
        s = n(35);
    e.exports = n(40)(Array, "Array", function(e, t) {
        this._t = s(e), this._i = 0, this._k = t
    }, function() {
        var e = this._t,
            t = this._k,
            n = this._i++;
        return !e || n >= e.length ? (this._t = void 0, a(1)) : "keys" == t ? a(0, n) : "values" == t ? a(0, e[n]) : a(0, [n, e[n]])
    }, "values"), i.Arguments = i.Array, r("keys"), r("values"), r("entries")
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = e.get().tabs,
            n = e.get().peer,
            r = Object.keys(t).filter(function(t) {
                return (0, i.isFullyLoadedTab)(e, t) && intval(t) !== n
            }).map(function(e) {
                return t[e]
            });
        r.filter(function(e) {
            return Date.now() - e.last_visited > l
        }).forEach(function(t) {
            return e.set(s.cleanTab.bind(null, t.peerId))
        }), r.filter(function(t) {
            return (0, i.isFullyLoadedTab)(e, t.peerId) && "string" != typeof t.history && Date.now() - t.last_touched > u
        }).forEach(function(t) {
            return e.set(s.stringifyTab.bind(null, t.peerId))
        })
    }

    function a(e) {
        var t = setInterval(r.bind(null, e), o);
        return {
            unmount: function() {
                clearInterval(t)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = a;
    var i = n(20),
        s = n(46),
        o = 5e3,
        l = 54e6,
        u = 72e5
}, function(e, t) {
    "use strict";

    function n(e) {
        var t = geByClass("post");
        LongView.clearElemsCache && LongView.clearElemsCache(), t.forEach(function(e) {
            return LongView.register(e, "im")
        })
    }

    function r(e) {
        LongView.onScroll(e, window.innerHeight)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t["default"] = {
        onNewMessagesChunk: n,
        onHistoryScroll: r
    }
}, function(e, t) {
    "use strict";
    Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
        value: function(e, t) {
            for (var n = 0; n < this.length; ++n)
                if (e.call(t, this[n], n, this)) return n;
            return -1
        }
    }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
        value: function(e, t) {
            for (var n = 0; n < this.length; ++n)
                if (e.call(t, this[n], n, this)) return this[n];
        }
    })
}, function(e, t) {
    "use strict";

    function n(e) {
        var t = s({}, i.objLoc, e);
        Object.keys(t).filter(function(e) {
            return "" === t[e]
        }).forEach(function(e) {
            delete t[e]
        });
        var n = i.toStr(t);
        i.setLoc(n)
    }

    function r() {
        var e = {};
        return {
            scheduleNav: function(t) {
                e = s(e, t)
            },
            commitNav: function() {
                n(e), e = {}
            },
            scheduleNavWithTimeOut: function(t) {
                var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
                e = s(e, t), setTimeout(function() {
                    n(e), e = {}
                }, r)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.updateLocation = n, t.updateLazyLocation = r;
    var a = window,
        i = a.nav,
        s = a.extend
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        return ge("im_dialogs_search", e)
    }

    function i(e, t, n, r, a, i) {
        var s = trim(i);
        if ((0, E.isSearchingValue)(e, s)) {
            var o = g.bind(null, e, n, a, t);
            s ? (e.setState({
                recentSearch: !1
            }), a.stop()) : a.replaceOrAdd(o), cancelStackPush("im_search", o), s && e.set(w.setCurrentSearch.bind(null, s, !1)).then(t), addClass(r, "im-page--dialogs-search_fill"), addClass(r, "_im_d_search")
        } else s || (a.stop(), e.set(w.setCurrentSearch.bind(null, "", !1)).then(t), removeClass(r, "im-page--dialogs-search_fill"), removeClass(r, "_im_d_search"))
    }

    function s(e, t, n) {
        return function() {
            var r = (0, E.getSearchText)(t);
            r === e && n.apply(void 0, arguments)
        }
    }

    function o(e, t, n) {
        var r = t().appendFastDialogs.bind(null, n),
            a = s(e, n, r);
        return (0, w.searchTopConv)(e, n.get()).then(function(t) {
            var r = t;
            if (e.indexOf("@") >= 0 && !(0, k.isCommunityInterface)(n)) {
                var i = {
                    type: "email_create",
                    query: clean(e),
                    peerId: Math.random()
                };
                r = [i].concat(t)
            }
            return a(r), t
        })
    }

    function l(e, t, n) {
        var r = (0, E.getSearchText)(n);
        return x(.01, "im_search_stat", 1, "search_start"), (0, w.updateSearchQuery)(r), n.setState({
            recentSearch: !1
        }), r ? (n.get().dialog_search_going = !0, o(r, e, n).then(function(a) {
            var i = a.map(function(e) {
                return e.peerId
            });
            return t(r, e, i, n)
        }).then(function(e) {
            n.get().dialog_search_going = !1
        })["catch"](function() {})) : (e().restoreDialogs(n, !1, !0), Promise.resolve(!1))
    }

    function u(e, t, n, r) {
        var a = r.get(),
            i = s(e, r, t().appendDialogs.bind(null, r)),
            o = s(e, r, t().appendSearch);
        return (0, k.isPendingForward)(r) ? (0, w.searchHints)(e, n, "all", a).then(i) : Promise.all([(0, w.searchHints)(e, n, "all", a).then(i), (0, w.searchMessages)(e, a)]).then(function(e) {
            var t = C(e, 2),
                n = C(t[1], 2),
                a = n[0],
                i = n[1];
            o(r, a, i, !0)
        })
    }

    function c(e, t, n) {
        n().showCreation(e)
    }

    function d(e, t, n, r, s) {
        var o = a(t);
        o.value = s, i(e, r, t, o, n, o.value)
    }

    function g(e, t, n, r) {
        cancelStackFilter("im_search");
        var s = a(t);
        uiSearch.reset(s), e.setState({
            recentSearch: !1
        }), i(e, r, t, s, n, s.value)
    }

    function m(e, t, n, r, a, i) {
        (0, E.isSearching)(e) ? (g(e, t, a, n), setTimeout(function() {
            return p(e, i)
        }, 10)) : (window.tooltips && tooltips.hide(i, {
            showsp: 0
        }), c(e, i, r))
    }

    function f(e, t, n, r, a) {
        return (0, k.showFavvedBox)(e, n, A.mount, r)
    }

    function p(e, t) {
        return showTooltip(t, {
            appendEl: bodyNode,
            text: function() {
                return (0, E.isSearching)(e) ? getLang("mail_cancel") : getLang("mail_start_conversaion")
            },
            black: 1,
            shift: [3, -1],
            appendCls: "js-im-page"
        })
    }

    function _(e, t, n) {
        var r = n.target;
        e.set(w.toggleCommunityMute.bind(null, t)).then(function() {
            toggleClass(r, "im-page--gim-mute_muted", e.get().mute), t && v(e, {
                target: r
            })
        })
    }

    function h(e, t, n, r, a) {
        if (!(0, E.isSearching)(e)) {
            var s = cur.imDb.select(O.RECENT_SEARCH_OP);
            if (0 !== s.length || (0, D.doPopularSuggExist)(e)) {
                e.setState({
                    recentSearch: !0
                }), i(e, function() {
                    (0, E.isSearching)(e) || (r.stop(), a().restoreDialogs(e, !1, !0))
                }, t, n, r, "");
                var o = s.filter(function(t) {
                        return !(0, k.isTabLoadedWithMessage)(e.get(), t)
                    }),
                    l = s.filter(function(t) {
                        return (0, k.isTabLoadedWithMessage)(e.get(), t)
                    }).reduce(function(t, n) {
                        return t[n] = (0, E.getTab)(e, n), t
                    }, {});
                e.get().topConvTree.then(function(t) {
                    var n = t.list.filter(function(e) {
                            return inArray(e[0], o)
                        }).reduce(function(e, t) {
                            return e[t[0]] = (0, w.localIndexToDialog)(t), e
                        }, {}),
                        r = extend({}, n, l);
                    return a().appendFastDialogs(e, s.map(function(e) {
                        return r[e]
                    })), (0, w.searchHints)(!1, Object.keys(n), !1, e.get())
                }).then(function(t) {
                    a().appendDialogs(e, t)
                })
            }
        }
    }

    function v(e, t) {
        var n = t.target;
        return showTooltip(n, {
            text: function() {
                return e.get().mute ? getLang("mail_im_sound_off") : getLang("mail_im_sound_on")
            },
            black: 1,
            shift: [13, 9],
            appendCls: "js-im-page"
        })
    }

    function b(e, t, n, r, i) {
        return {
            focusInput: function(t) {
                uiSearch.focus(a(e).parentNode)
            },
            createCanceled: function(e, n) {
                removeClass(t, "im-dialog-select_rotated")
            },
            rotateCross: function(e) {
                addClass(t, "im-dialog-select_rotated")
            },
            setSearch: function(t, n) {
                d(t, e, r, function() {}, n)
            },
            clearSearch: function(t) {
                g(t, e, r, function() {})
            },
            updateImportantCnt: function(t) {
                var n = t.get().important_cnt,
                    r = geByClass1(R, e);
                toggleClass(r, "im-page--stars_hidden", 0 === n), r.innerHTML = "<i></i> " + n
            },
            unmount: function() {
                r.stop(), (0, I.destroyModule)(i), uiSearch.destroy(n), cancelStackFilter("im_search")
            }
        }
    }

    function y(e, t, n) {
        var r = geByClass1("_im_search_croll", e),
            s = a(e),
            o = (0, S["default"])("im_search", ["_im_search_croll", "_im_page_dcontent", "_im_d_search", "_im_dialog"]),
            c = (0, P.debouncedPromise)(u, 300),
            d = l.bind(null, n, c),
            g = i.bind(null, t, d, e, s, o),
            y = m.bind(null, t, e, d, n, o, r),
            C = f.bind(null, t, e, n),
            w = geByClass1("_im_dialogs_search_input", e);
        uiSearch.init(w, {
            onChange: g
        });
        var E = p.bind(null, t, r),
            T = geByClass1(B, e);
        s.value && g(s.value);
        var M = (0, I.createModule)({
            handlers: function(a, i) {
                if (a(geByClass1("_im_av_time", e), "mouseover", function(e) {
                        showTooltip(e.target, {
                            text: getLang("mail_admin_av_time"),
                            dir: geByClass1("_im_top_notice") || geByClass1("im-page--dialogs--group-status") ? "down" : "up",
                            shift: [0, 8]
                        })
                    }), a(r, "click", y), a(r, "mouseover", E), a(geByClass1(R, e), "click", C), (0, k.isClassicInterface)(t)) {
                    var l = _.bind(null, t, !0),
                        u = v.bind(null, t);
                    a(T, "click", l), a(T, "mouseover", u)
                }
                a(s, "focus", function() {
                    t.get().longpoll.push([(0, L.transitionEvent)("search")])
                }), a(s, "click", function() {
                    h(t, e, s, o, n)
                }), a(s, "blur", function() {
                    var e = void 0;
                    e = 0 === t.get().peer ? "search" : (0, k.isPendingForward)(t) ? "search" : "default", t.get().longpoll.push([(0, L.transitionEvent)(e)])
                })
            }
        });
        return (0, k.isClassicInterface)(t) && _(t, !1, {
            target: T
        }), b(e, r, w, o, M)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var C = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && o["return"] && o["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.mount = y;
    var w = n(46),
        E = n(139),
        k = n(20),
        T = n(111),
        S = r(T),
        I = n(83),
        M = n(34),
        P = n(3),
        L = n(132),
        A = n(98),
        O = n(110),
        D = n(139),
        x = debounce(M.statlogsProbValueEvent, 1e3),
        R = "_im_important_counter",
        B = "_im_gim_mute"
}, function(e, t, n) {
    "use strict";

    function r(e, t, n, r) {
        var a = '<td class="im_cal_clear" colspan="7"><button type="button" class="im_cal_clear_lnk _im_clear_date">' + getLang("wall_clear_date_filter") + "</button></td>";
        return new Promise(function(e) {
            stManager.add(["ui_controls.js", "datepicker.js", "datepicker.css"], function() {
                var t = new Datepicker(n, {
                    width: 140,
                    resfmt: "plain",
                    addRows: '<tr id="im_day_clear">' + a + "</tr>",
                    addRowsM: '<tr id="im_month_clear">' + a + "</tr>",
                    onUpdate: r
                });
                e(t)
            })
        })
    }

    function a(e, t, n, r, a) {
        return {
            focus: function(e) {
                uiSearch.focus(t), l(e, t, n, r)
            },
            changePeer: function(e, n) {
                uiSearch.getFieldEl(t).value = n.get().tabs[e].searchText || ""
            },
            unmount: function() {
                (0, f.destroyModule)(a), cancelStackFilter(p), r.then(function(e) {
                    return e.destroy()
                })
            }
        }
    }

    function i(e, t, n, r) {
        e.set(m.setCurrentSearchDate.bind(null, e.get().peer, r.d + "." + r.m + "." + r.y)).then(o.bind(null, e, t, n))
    }

    function s(e, t) {
        e.then(function(e) {
            triggerEvent(geByClass1("datepicker_control", t), "mousedown", !1, !0)
        })
    }

    function o(e, t, n) {
        var r = e.get().peer;
        uiSearch.showProgress(n), (0, m.searchMessagesInplace)(r, e.get()).then(function(r) {
            uiSearch.hideProgress(n), t().insertSearch(r, e)
        })["catch"](function() {
            uiSearch.focus(n), uiSearch.hideProgress(n)
        })
    }

    function l(e, t, n, r) {
        cancelStackPush(p, c.bind(null, e, t, n, r))
    }

    function u(e, t, n, r, a, i) {
        if ("keyup" !== i.type || 13 == i.which) {
            var s = clean(uiSearch.getFieldEl(t).value);
            e.set(m.setCurrentSearch.bind(null, s, e.get().peer)).then(a.bind(null, e, r, t))
        }
    }

    function c(e, t, n, r) {
        cancelStackFilter(p), r.then(function(e) {
            e.hide()
        }), e.set(m.cancelSearch.bind(null, e.get().peer)).then(function() {
            uiSearch.getFieldEl(t).value = "", n().cancelSearch(e)
        })
    }

    function d(e, t, n, r) {
        n.then(function(e) {
            e.hide()
        }), e.set(m.clearDate.bind(null, e.get().peer)).then(o.bind(null, e, t, r))
    }

    function g(e, t, n) {
        var l = geByClass1(h, e),
            g = geByClass1(v, e),
            m = i.bind(null, t, n, g),
            p = r(t, e, l, m),
            w = s.bind(null, p, e),
            E = u.bind(null, t, g, l, n, debounce(o, 300)),
            k = c.bind(null, t, g, n, p),
            T = d.bind(null, t, n, p, g),
            S = (0, f.createModule)({
                handlers: function(t, n) {
                    t(geByClass1(_, e), "click", w), t(uiSearch.getFieldEl(g), "keyup", E), t(geByClass1(b, e), "click", E), t(geByClass1(y, e), "click", k), n(e, "click", C, T)
                }
            });
        return a(e, g, n, p, S)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = g;
    var m = n(46),
        f = n(83),
        p = "im_hist_search",
        _ = "_im_search_date",
        h = "_im_search_date_input",
        v = "_im_search_history_input",
        b = "_im_start_inplace_search",
        y = "_im_cancel_inplace_search",
        C = "_im_clear_date"
}, function(e, t, n) {
    var r = n(21);
    e.exports = function(e, t) {
        if (!r(e)) return e;
        var n, a;
        if (t && "function" == typeof(n = e.toString) && !r(a = n.call(e))) return a;
        if ("function" == typeof(n = e.valueOf) && !r(a = n.call(e))) return a;
        if (!t && "function" == typeof(n = e.toString) && !r(a = n.call(e))) return a;
        throw TypeError("Can't convert object to primitive value")
    }
}, function(e, t, n) {
    var r = n(127)("meta"),
        a = n(21),
        i = n(114),
        s = n(54).f,
        o = 0,
        l = Object.isExtensible || function() {
            return !0
        },
        u = !n(4)(function() {
            return l(Object.preventExtensions({}))
        }),
        c = function(e) {
            s(e, r, {
                value: {
                    i: "O" + ++o,
                    w: {}
                }
            })
        },
        d = function(e, t) {
            if (!a(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
            if (!i(e, r)) {
                if (!l(e)) return "F";
                if (!t) return "E";
                c(e)
            }
            return e[r].i
        },
        g = function(e, t) {
            if (!i(e, r)) {
                if (!l(e)) return !0;
                if (!t) return !1;
                c(e)
            }
            return e[r].w
        },
        m = function(e) {
            return u && f.NEED && l(e) && !i(e, r) && c(e), e
        },
        f = e.exports = {
            KEY: r,
            NEED: !1,
            fastKey: d,
            getWeak: g,
            onFreeze: m
        }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    n(90);
    var a = n(104),
        i = n(78),
        s = r(i),
        o = n(109),
        l = n(132),
        u = n(46),
        c = n(66),
        d = n(20),
        g = n(117),
        m = n(19);
    window.IM = {
        init: function(e) {
            window.imwl = e.imwl, (0, g.startLoggingAllUnhandled)(), addTemplates(m), window.Promise || (window.Promise = o.Promise), window.cur.lang.dont_attach = getLang("mail_dont_add_media"), e.tabbedPeers = (e.tabbedPeers || []).map(function(e) {
                return {
                    peer: e,
                    type: "perm"
                }
            }), cur.ctrl_submit = e.ctrl_submit, cur.module = "im", cur.mutedPeers = e.mutedPeers, cur.gid = e.gid, cur.peer = e.peer, e.blockedFlagUpdates = {}, e.msgid = intval(nav.objLoc.msgid), cur.options = {
                blacklist_hash: e.thash
            };
            var t = 60 * (new Date).getTimezoneOffset(),
                n = -10800,
                r = n - t,
                i = e.timeshift;
            e.timeshift = i - r, e.oCache = {};
            var f = (0, s["default"])(e);
            e.owners.forEach(function(e) {
                return (0, c.oCacheAdd)(f, e)
            }), e.owners = void 0, (0, d.normalizeTabsGotFromServer)(f, f.get().tabs), window.store = f, cur.imClassicInterface = (0, d.isClassicInterface)(f);
            var p = (0, a.mount)(geByClass1("js-im-page", ge("page_body")), f);
            (0, u.updateMentions)(f.get()), window.IMBRIDGE = {
                chatPhotoSaved: function(e) {
                    curBox() && curBox().hide();
                    var t = (e || {})[1];
                    return t ? (cur.pvShown && layers.fullhide(!0, !0), "im" != cur.module || f.get().peer != t ? nav.go("/im?sel=c" + (t - 2e9)) : void 0) : nav.reload()
                },
                updateHistory: function(e) {
                    f.set(u.updateHistory.bind(null, e)).then(function() {
                        p.updateHistory(e)
                    })
                },
                activateTab: function(e) {
                    f.get().longpoll.push([(0, l.changePeer)(intval(e), !1, !1, !0)])
                }
            };
            var _ = !1;
            cur.nav.push(function() {
                if (_) return !0;
                f.get().audio_msg && f.get().audio_msg.isRecording && p.cancelRecording(), AudioMessagePlayer.detachPlayer();
                var t = p.route.apply(null, arguments);
                return t !== !1 && (p.unmount(), window.IMBRIDGE = void 0, f.unmount(), window.store = void 0, _ = !0, e = !1, f = !1, p = !1, (0, g.stopLoggingAllUnhandled)()), t
            })
        }
    };
    try {
        stManager.done("imn.js")
    } catch (f) {}
}, function(e, t) {
    e.exports = function() {
        throw new Error("define cannot be used indirect")
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t, n, r) {
        if (!e.loading && !e.all) {
            var a = n.scrollTop + window.innerHeight - n.scrollHeight;
            if (a > -300) {
                var i = geByClass1("_im_peer_history", t.bodyNode);
                e.loading = !0, (0, d.wrapLoading)(i)((0, l.loadImportant)(e.offset).then(function(t) {
                    var n = o(t, 4),
                        a = (n[0], n[1]),
                        s = (n[2], n[3]);
                    e.all = s.all, e.offset = s.offset, e.all ? addClass(i, "im-important_all") : e.loading = !1, r.set(l.mergeTabs.bind(null, (0, d.tabFromIds)(s.msgs, s.hash)));
                    var u = ce("div");
                    u.innerHTML = a, i.appendChild(u), (0, d.ensureDomHasActions)(i)
                }), "bottom")
            }
        }
    }

    function i(e, t, n) {
        for (var r = arguments.length, a = Array(r > 3 ? r - 3 : 0), i = 3; r > i; i++) a[i - 3] = arguments[i];
        a.filter(function(e) {
            return inArray(e.type, [p.SET_FLAGS, p.RESET_FLAGS, p.CHANGE_PEER])
        }).forEach(function(r) {
            if (r.type === p.CHANGE_PEER) return void n.hide();
            if (r.flags === p.FLAG_IMPORTANT) {
                var a = r.type === p.SET_FLAGS;
                e.set(l.updateFavMessage.bind(null, [r.messageId], 0, a)).then(function(n) {
                    t.markImportant(r.messageId, a, e)
                })
            }
        })
    }

    function s(e, t, n, r) {
        var s = ge("box_layer_wrap"),
            o = t.get().longpoll,
            l = (0, m["default"])({
                peer: 0,
                longpoll: o,
                oCache: {},
                tabs: (0, d.tabFromIds)(r.msgs, r.hash)
            }),
            g = (0, c.mount)(e.bodyNode, l, function() {
                return {}
            }),
            p = (0, u.mount)(e.bodyNode, t);
        (0, d.ensureDomHasActions)(e.bodyNode);
        var _ = i.bind(null, t, g, e);
        o.on("data", _);
        var h = a.bind(null, {
                all: !1,
                loading: r.all,
                offset: r.offset
            }, e, s, l),
            v = (0, f.createModule)({
                handlers: function(e, t) {
                    e(s, "scroll", h)
                }
            });
        return {
            unmount: function() {
                (0, f.destroyModule)(v), p.unmount(), g.unmount(), o.off("data", _)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && o["return"] && o["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.mount = s;
    var l = n(46),
        u = n(48),
        c = n(75),
        d = n(20),
        g = n(78),
        m = r(g),
        f = n(83),
        p = n(132)
}, function(e, t, n) {
    var r = n(54),
        a = n(137);
    e.exports = n(70) ? function(e, t, n) {
        return r.f(e, t, a(1, n))
    } : function(e, t, n) {
        return e[t] = n, e
    }
}, function(e, t, n) {
    e.exports = !n(70) && !n(4)(function() {
        return 7 != Object.defineProperty(n(124)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(module, exports, __webpack_require__) {
    "use strict";

    function uploadFailed(e, t, n) {
        var r = void 0 !== t.ind ? t.ind : t,
            a = t.fileName ? r + "_" + t.fileName : t;
        re("upload" + a + "_progress_wrap"), e().unchoose(a);
        var i = geByClass1("popup_box_container");
        if (!i) {
            var s = "photo" == Upload.options[r].file_name ? getLang("mail_add_photo_error") : getLang("mail_add_doc_error");
            setTimeout(showFastBox({
                title: getLang("global_error")
            }, s).hide, 2e3)
        }
        topError("Upload failed", {
            dt: -1,
            type: 102,
            url: (ge("file_uploader_form" + r) || {}).action
        }), Upload.embed(r)
    }

    function onAnyUploaded(e) {
        var t = void 0 !== e.ind ? e.ind : e,
            n = (e.fileName || e.filename || "").replace(/[&<>"']/g, ""),
            r = n ? t + "_" + n : e,
            a = ge("upload" + r + "_progress_wrap");
        return a && hide(geByClass1("progress_x", a)), r
    }

    function onPhotoUploaded(e, t, n, r) {
        var a = onAnyUploaded(e);
        ajax.post("al_photos.php", extend({
            act: "choose_uploaded"
        }, t), {
            onDone: function(e, t) {
                r().choose("photo", e, extend(t, {
                    upload_ind: a
                }))
            },
            onFail: uploadFailed.bind(null, r, e)
        })
    }

    function onDocUploaded(e, t, n, r) {
        var a = onAnyUploaded(e),
            i = {
                act: "a_save_doc",
                from: "choose",
                mail_add: 1
            };
        n.opts.imhash && (i = extend(i, {
            from_place: "from_gim",
            imhash: n.opts.imhash
        })), ajax.post("docs.php", extend(i, t), {
            onDone: function(e, t, n) {
                r().choose("doc", e + "_" + t, extend(n, {
                    upload_ind: a
                }))
            },
            onFail: uploadFailed.bind(null, r, e)
        })
    }

    function detectDropboxMode(e, t) {
        if (!e().canAddMedia()) return "none";
        if (!t.items) return "photo";
        var n = [].slice.call(t.items).every(function(e) {
            var t = e.type.split("/");
            return /^(jpg|jpeg|png|heic|heif)$/i.test(t[1])
        });
        return n ? "photo" : "doc"
    }

    function showDropbox(e) {
        var t = geByClass1(DROPBOX_CLASS),
            n = geByClass1("im-page--chat-header").getBoundingClientRect(),
            r = geByClass1("im-chat-input").getBoundingClientRect();
        (n.width < 10 || r.bottom - n.bottom < 10) && (e = "none"), t.style.top = n.bottom + "px", t.style.left = n.left + 1 + "px", t.style.width = n.width - 2 + "px", t.style.height = r.bottom - n.bottom + "px", t.setAttribute("data-mode", e), "none" !== e && show(t)
    }

    function hideDropbox() {
        var e = geByClass1(DROPBOX_CLASS);
        hide(e)
    }

    function parseOnCompleteResponse(res) {
        try {
            return eval("(" + res + ")")
        } catch (e) {
            return q2ajx(res)
        }
    }

    function parseOnUploadProgress(e, t, n) {
        return {
            loaded: t,
            total: n,
            fileName: e.fileName ? e.fileName.replace(/[&<>"']/g, "") : void 0
        }
    }

    function handleUploadCompleteError(e, t, n, r) {
        var a = "string" == typeof t && t.indexOf("TERMINATED") > -1;
        a || Upload.onUploadError(e), r().reHeight(n)
    }

    function initPhotoUploader(e, t, n, r) {
        var a = t.get().upload_opts,
            i = geByClass1("_im_upload_photo"),
            s = geByClass1("_im_drop_photo");
        return Upload.init(i, a.url, a.params, {
            file_name: "photo",
            file_size_limit: 26214400,
            file_types: "*.jpg;*.JPG;*.png;*.PNG;*.gif;*.GIF;*.jpeg;*.JPEG;*.heic;*.HEIC;*.heif;*.HEIF",
            accept: "image/jpeg,image/png,image/gif,image/heic,image/heif",
            file_match: a.opts.ext_re,
            lang: a.opts.lang,
            onNoFilteredCallback: function(e) {
                Upload.onFileApiSend(r, e)
            },
            onUploadStart: function(e, t) {
                delete cur.notStarted, this.onUploadProgress(e, 0, 0)
            },
            onUploadComplete: function(e, r) {
                var i = parseOnCompleteResponse(r);
                i.photos ? (statlogsValueEvent("upload_photo_fails", 1, a.opts.server, "success"), onPhotoUploaded(e, i, a, n)) : handleUploadCompleteError(e, r, t, n)
            },
            onUploadProgress: function(e, t, r) {
                var a = void 0 !== e.ind ? e.ind : e;
                n().progress("photo", a, parseOnUploadProgress(e, t, r))
            },
            onUploadError: function(e, t) {
                statlogsValueEvent("upload_photo_fails", 1, a.opts.server, t), uploadFailed(n, e, t)
            },
            onDragEnter: function(e) {
                var t = geByClass1("im-audio-message_recording");
                e.dataTransfer && !t && showDropbox(detectDropboxMode(n, e.dataTransfer))
            },
            onDragOut: function() {
                hideDropbox()
            },
            onDrop: function() {
                hideDropbox()
            },
            multiple: 1,
            multi_progress: 1,
            max_files: 10,
            chooseBox: 1,
            clear: 1,
            type: "photo",
            max_attempts: 3,
            server: a.opts.server,
            error: a.opts.default_error,
            error_hash: a.opts.error_hash,
            dropbox: s,
            dragEl: bodyNode
        })
    }

    function initDocUploader(e, t, n) {
        var r = t.get().upload_doc_opts,
            a = geByClass1("_im_upload_doc"),
            i = geByClass1("_im_drop_doc");
        return Upload.init(a, r.url, r.params, {
            file_name: "file",
            file_size_limit: 209715200,
            file_types: "*.*;",
            lang: r.opts.lang,
            onUploadStart: function(e, t) {
                delete cur.notStarted, this.onUploadProgress(e, 0, 0)
            },
            onUploadComplete: function(e, a) {
                var i = parseOnCompleteResponse(a);
                i.file ? (statlogsValueEvent("upload_photo_fails", 1, r.opts.server, "success"), onDocUploaded(e, i, r, n)) : handleUploadCompleteError(e, a, t, n)
            },
            onUploadProgress: function(e, t, r) {
                var a = void 0 !== e.ind ? e.ind : e;
                n().progress("doc", a, parseOnUploadProgress(e, t, r))
            },
            onUploadError: function(e, t) {
                statlogsValueEvent("upload_photo_fails", 1, r.opts.server, t), uploadFailed(n, e, t)
            },
            multiple: 1,
            multi_progress: 1,
            max_files: 10,
            chooseBox: 1,
            clear: 1,
            type: "doc",
            max_attempts: 3,
            server: r.opts.server,
            error: r.opts.default_error,
            error_hash: r.opts.error_hash,
            dropbox: i,
            dragEl: bodyNode
        })
    }

    function mount(e, t, n) {
        removeEvent(bodyNode, "dragover dragenter");
        var r = initDocUploader(e, t, n),
            a = initPhotoUploader(e, t, n, r);
        cur.lang.attachments_limit = t.get().upload_opts.opts.lang.max_files_warning;
        var i = (0, _modules.createModule)({
            handlers: function(e) {
                var t = ge("im_full_upload");
                e(t, "change", function r(s) {
                    n().canAddMedia() ? Upload.onFileApiSend(a, s.target.files) : showFastBox(getLang("global_error"), getLang("global_error")), (0, _modules.destroyModule)(i);
                    var o = t.cloneNode();
                    t.parentNode.replaceChild(o, t), t = o, e(t, "change", r)
                })
            }
        });
        return {
            paste: function(e) {
                Upload.onFileApiSend(a, e)
            },
            unmount: function() {
                (0, _modules.destroyModule)(i), Upload.deinit(a), Upload.deinit(r)
            }
        }
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports.mount = mount;
    var _modules = __webpack_require__(83),
        DROPBOX_CLASS = "_im_upload_dropbox"
}, function(e, t, n) {
    var r = n(114),
        a = n(64),
        i = n(13)("IE_PROTO"),
        s = Object.prototype;
    e.exports = Object.getPrototypeOf || function(e) {
        return e = a(e), r(e, i) ? e[i] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? s : null
    }
}, , function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }

    function a(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function i(e, t, n, r, a) {
        var i = a.reduce(function(e, t) {
            return e[t.peerId] || (e[t.peerId] = []), e[t.peerId].push(t.messageId), e
        }, {});
        Object.keys(i).forEach(function(a) {
            var s = i[a];
            e.set(se.removeMessages.bind(null, s, a)).then(function() {
                return e.set(se.removeMessagesMarkDeleted.bind(null, s, a))
            }).then(function() {
                return t.removeMessages(s, +a, e)
            }).then(function() {
                var i = (0, ie.getTab)(e, a),
                    o = i && s.some(function(e) {
                        return e >= i.lastmsg
                    });
                o && (0, se.loadActualLastMessage)(e, a).then(function() {
                    n.promoteDialog(e, a), r.updateCounter(e, a), t.updateGoToEnd(e, !0)
                })
            })
        })
    }

    function s(e, t, n, r) {
        t.set(se.updateChatPhoto.bind(null, e)).then(function() {
            var a = e.kludges.source_act;
            n.updateDialog(e.peerId, t), r.updateChatPhoto(e, a, t)
        })
    }

    function o(e, t, n, r, i, s, o) {
        e.set(se.updateActions.bind(null, t, r, n)).then(function() {
            return t === oe.CHAT_INVITE_USER || t === oe.CHAT_INVITE_BY_LINK ? (e.set(se.chatUserHasJoined.bind(null, n, i, r)), e.set(se.loadChatMember.bind(null, a({}, n, [r]))).then(function(t) {
                return r === vk.id && e.get().peer === n ? e.set(se.getPinnedMessage.bind(null, n)) : Promise.resolve(t)
            })) : (r === vk.id && e.get().peer === n && (e.set(se.unpinMessageOptimistic.bind(null, n)), o.cancelEditing()), e.set(se.chatUserHasLeft.bind(null, n, i, r)))
        }).then(function() {
            e.get().peer === n && ((0, se.setActions)(e.get()), o.updateChat(e, n), s.updateDialog(n, e))
        })
    }

    function l(e, t) {
        "spam" === t ? (0, oe.showSpamLayer)(e, ee.mount, {}) : "fav" === t && (0, oe.showFavvedBox)(e, {}, ue.mount, {})
    }

    function u(e, t) {
        if (e.get().gid) {
            var n = t.parentNode,
                r = geByClass("_im_right_menu_counter", n),
                a = e.get().dialog_tab_cts;
            r.forEach(function(e) {
                var t = domData(e, "tab");
                val(e, a[t] || "")
            })
        }
    }

    function c(e, t, n, r) {
        e.set(se.cancelRecording).then(function(e) {
            n.cancelRecording()
        }), AudioMessagePlayer.detachPlayer(), t.removeSelection(e), removeClass(r, "im-page_history-show"), n.stopLoading(), (0, ie.isAnyMessageBeingEdited)(e) && n.cancelEditing();
        var a = e.get().peer;
        e.set(se.changePeer.bind(null, 0, !1)).then(function() {
            window.tooltips && window.tooltips.hideAll(), w(), (0, oe.isClassicInterface)(e) && t.activate(), n.changePeer(e), (0, oe.isClassicInterface)(e) && t.restoreScroll(e), setTimeout(function() {
                e.get().longpoll.push([J.transitionEvent("search")])
            }, 13), (0, oe.isLocksAvailable)(e) && (0, oe.isPeerBlockedByMe)(a, e) && e.set(se.releaseBlock.bind(null, a))
        })
    }

    function d(e, t, n, r, a) {
        e.forEach(function(e) {
            var i = e.kludges.source_act,
                l = intval(e.kludges.source_mid);
            switch (i) {
                case oe.CHAT_PHOTO_REMOVE:
                case oe.CHAT_PHOTO_UPDATE:
                    s(e, t, n, r);
                    break;
                case oe.CHAT_INVITE_BY_LINK:
                    l = e.userId;
                case oe.CHAT_KICK_USER:
                case oe.CHAT_INVITE_USER:
                    o(t, i, e.peerId, l, e.userId, n, r);
                    break;
                case oe.CHAT_TITLE_ACTION:
                    var u = e.kludges.source_text;
                    (0, oe.isTabLoaded)(t.get(), e.peerId) && t.set(se.setChatTitle.bind(null, e.peerId, u)).then(function() {
                        r.updateChatTopic(e.peerId, t), (0, oe.isClassicInterface)(t) && a.updateName(e.peerId, t)
                    });
                    break;
                case oe.CHAT_PIN_MESSAGE:
                case oe.CHAT_UNPIN_MESSAGE:
                    (0, oe.isTabLoaded)(t.get(), e.peerId) && t.set(se.getPinnedMessage.bind(null, e.peerId)).then(function() {
                        return (0, fe.pinnedMessageUnHide)(t, e.peerId, function() {
                            return r
                        }, !1)
                    })
            }
        })
    }

    function g(e, t) {
        return 2e9 > t && e && !e.match(/^\s*(Re(\(\d*\))?\:)?\s*\.\.\.\s*$/)
    }

    function m(e, t) {
        var n = t.flags & J.FLAG_OUTBOUND,
            r = inArray(t.peerId, e.get().mutedPeers),
            a = t.flags & J.FLAG_DELETED,
            i = e.get().gid;
        if (!n && !r && !a) {
            var s = g(t.subject, t.peerId) || "",
                o = (s ? s + " " : "") + t.text || "",
                l = t.userId,
                u = t.peerId,
                c = void 0,
                d = void 0,
                m = e.get().tabs[u];
            if (t.kludges && t.kludges.source_act && (o = stripHTML((0, oe.renderServiceMsg)(e, t, m, !1))), (!e.get().notify_msg && !(0, oe.isChatPeer)(u) || i && !e.get().mute) && window.Notifier && Notifier.playSound({
                    author_id: u
                }), !(0, oe.isChatPeer)(u)) return;
            o = trim(replaceEntities(stripHTML(o.replace(/<br>/g, "\n").replace(/<\*>.*$/, "")))), o = (0, W.replaceMentions)(o, function(e, t, n, r, a) {
                return a
            }), (0, oe.isChatPeer)(u) ? (c = (0, de.oCacheGet)(e, l).name, m.tab && (c += " » " + m.tab), d = (0, de.oCacheGet)(e, l).photo) : (c = m.tab, d = m.photo);
            var f = t.attaches[0];
            if (f && "mail" === f.type) o += "\n[" + getLang("mail_added_msgs") + "]";
            else if (f) {
                var p = "doc" === f.type && "graffiti" === f.kind ? "graffiti" : f.type;
                o += "\n[" + getLang("mail_added_" + p) + "]"
            }
            c = trim(replaceEntities(stripHTML((c || "").replace("&nbsp;", " ")))), window.Notifier && Notifier.proxyIm({
                id: t.messageId,
                text: o,
                author_id: u,
                title: c,
                author_photo: d
            })
        }
    }

    function f(e, t) {
        var n = e.get().longpoll.push.bind(null, [J.resetPeer()]),
            r = function a() {
                var r = e.get().selectedMessages;
                r && r.length ? (e.setState({
                    selectedMessages: []
                }).then(function() {
                    t.changedMessageSelection(e), t.cleanSelection(r)
                }), setTimeout(function() {
                    return cancelStackPush("im_peer", a)
                }, 0)) : n()
            };
        cancelStackPush("im_peer", r)
    }

    function p(e) {
        e.set(se.leaveInvitation)
    }

    function _(e, t) {
        var n = e.get().tabs[t.peerId],
            r = e.get().active_tab;
        return r === le.FOLDER_ALL ? !0 : (0, se.filterFromTab)(r)(n)
    }

    function h(e) {
        var t = e.attaches.filter(function(e) {
            return "sticker" !== e.type
        });
        return (0, oe.isServiceMsg)(e) || 0 === t.length
    }

    function v(e, t, n) {
        addClass(n, "im-page_history-show"), t.loadingPeer(e)
    }

    function b(e, t) {
        (0, oe.isPendingForward)(e) && (cancelStackFilter("forward"), e.set(se.forwardMessages.bind(null, e.get().pendingForward, (0, ie.getTabDraft)((0, ie.getTab)(e, t)))))
    }

    function y(e, t) {
        var n = document.querySelector(ke),
            r = (0, oe.isCommunityInterface)(e) ? Ce : we,
            a = n ? n.offsetHeight : 0;
        return r += Ee, r += a, Math.floor((t.offsetHeight - r) / ve)
    }

    function C(e, t) {
        var n = y(e, t);
        if (e.get().tabbedPeers.length > n) {
            var r = e.get().tabbedPeers.filter(function(t) {
                    var n = t.peer;
                    return intval(n) !== e.get().peer
                }),
                a = r.map(function(t) {
                    var n = t.peer;
                    return e.get().tabs[n]
                }),
                i = a.sort(function(e, t) {
                    return t.last_touched - e.last_touched
                }),
                s = [];
            0 !== e.get().peer && s.push(e.get().tabs[e.get().peer]);
            var o = s.concat(i).slice(n).map(function(e) {
                    return e.peerId
                }),
                l = e.get().tabbedPeers.filter(function(e) {
                    return !inArray(e.peer, o)
                });
            return e.set(se.updateTabbedPeers.bind(null, l, !0))
        }
        return Promise.resolve(e)
    }

    function w() {
        for (var e = curBox(); e;) e.hide(), e = curBox()
    }

    function E(e, t, n, r, a, i, s, o, l) {
        e.set(se.cancelRecording).then(function() {
            r.cancelRecording()
        }), AudioMessagePlayer.detachPlayer(), t.forward && r.hideFwd(e), (0, ie.isAnyMessageBeingEdited)(e) && r.cancelEditing(), (0, ie.isSearching)(e) && t.cancelSearch && (a.clearSearch(e), n.restoreDialogs(e)), k(e, o, l), v(e, r, i);
        var u = e.get().peer;
        (0, se.updateMentions)(e.get()), (0, se.videoAutoPlayHandler)(), (0, oe.isFullyLoadedTab)(e, t.peerId) && (t.msgid && !(0, ie.getMessage)(e, t.peerId, t.msgid) || !t.msgid && !(0, ie.getMessage)(e, t.peerId, (0, ie.getTab)(e, t.peerId).lastmsg) || (0, ie.getTab)(e, t.peerId).skipped) && e.mutate(function(e) {
            return (0, ie.makeTabNotFullyLoaded)(e, t.peerId)
        });
        var c = e.set(se.changePeer.bind(null, t.peerId, t.msgid)).then(function(e) {
            var n = e.get(),
                r = se.loadPeer.bind(null, t.peerId, !1, t.msgid, !1, n);
            return n.tabs[t.peerId] ? Promise.resolve(n) : e.set(r)
        }).then(function() {
            n.selectPeer(t.msgid, e), b(e, e.get().peer), window.tooltips && tooltips.hideAll(), w(), r.preparePeer(e), f(e, r), (0, oe.isClassicInterface)(e) && (n.deactivate(), C(e, i).then(function() {
                return s.updateMenu(e)
            }))
        });
        return c = t.msgid ? c.then(function() {
            return e.set(se.selectPeerOnMessage.bind(null, t.peerId === u, u))
        }) : c.then(function() {
            return e.set(se.selectPeer.bind(null, !0))
        }), c.then(function() {
            if (e.get().peer === t.peerId) {
                if (t.forward) {
                    var n = e.get().tabs[e.get().peer];
                    !n.scrollBottom && n.unread && e.set(se.readLastMessages.bind(null, e.get().peer))
                }(0, oe.isClassicInterface)(e) && s.updateMenu(e), r.changePeer(e, !1), r.updateTyping(t.peerId, e), (0, se.updateMentions)(e.get())
            }
        })["catch"](function(e) {
            return (0, me.imWeirdCatch)("applyNewPeer", e)
        })
    }

    function k(e, t, n) {
        t && e.get().shown && (t.hide(e), n().createCanceled(e))
    }

    function T(e, t, n) {
        (0, ie.isSearching)(e) && (t.clearSearch(e), n.restoreDialogs(e))
    }

    function S(e, t, n, r, a, i, s) {
        (0, oe.isClassicInterface)(e) && (a.saveScroll(e), i.saveScroll(e)), r.rotateCross(e), addClass(s, "im-page_creating"), e.setState({
            isCreating: !0
        }), n && n.show(e, t), (0, oe.isClassicInterface)(e) && (setStyle(s, {
            height: A(s, e).page
        }), setTimeout(function() {
            addClass(s, "im-page_cropped")
        }, 200)), (0, se.toggleConversation)(!0)
    }

    function I(e, t, n, r) {
        n && n.hide(e, t)
    }

    function M(e) {
        for (var t = !1, n = e.length - 1; n >= 0; n--) e[n].type !== J.UNREAD_COUNT || t ? e[n].type === J.UNREAD_COUNT && e.splice(n, 1) : t = !0;
        return e
    }

    function P(e, t, n, r, i, s, o, g, f, b, y, w, P, L, A, O, D, x, R, B) {
        return {
            changePeer: function(e, n) {
                t.selectPeer(e, n)
            },
            cancelSearch: function(e) {
                T(e, r, t)
            },
            loadingPeer: function(e) {
                v(e, n, i)
            },
            restoreDialogs: function(e, n, r) {
                t.restoreDialogs(e, n, r)
            },
            focusSearch: function(e) {
                r.focusInput(e)
            },
            appendSearch: function(e, n, r, a) {
                t.appendSearch(e, n, r, a)
            },
            appendDialogs: function(e, n) {
                t.appendDialogs(e, n)
            },
            showCreation: function(e, a) {
                S(e, a, b, r, t, n, i)
            },
            updateState: function(e, r) {
                t.updateDialog(e, r), r.get().peer === e && n.updateChat(r, e)
            },
            appendFastDialogs: function(e, n) {
                t.appendFastDialogs(e, n, !0)
            },
            createCanceled: function(e, a) {
                r.createCanceled(e, a), (0, oe.isClassicInterface)(e) ? (setStyle(i, {
                    height: "auto"
                }), removeClass(i, "im-page_cropped"), setTimeout(function() {
                    return r.focusInput(e)
                }, 0), 0 === e.get().peer ? t.restoreScroll(e) : n.restoreScroll(e, e.get().peer)) : setTimeout(function() {
                    0 === e.get().peer ? r.focusInput(e) : n.focustTxt(e)
                }, 0), removeClass(i, "im-page_creating"), e.setState({
                    isCreating: !1
                })
            },
            updateMenu: function(e) {
                O && O.updateMenu(e)
            },
            hideFwd: function(e) {
                n.hideFwd(e)
            },
            updateDialog: function(e, n) {
                t.updateDialog(e, n)
            },
            focusTxt: function(e) {
                n.focustTxt(e)
            },
            resync: function(e) {
                (0, ie.isSearching)(e) && r.clearSearch(e), t.restoreDialogs(e, !0, !0), t.focusOnSelected(e), b && b.hide(e), (0, oe.isCommunityInterface)(e) && u(e, i), (0, oe.isClassicInterface)(e) && e.get().tabbedPeers.forEach(function(t) {
                    var n = t.peer;
                    O.updateCounter(e, n), O.updateName(n, e)
                }), n.cleanSelection(e.get().selectedMessages || []), n.cancelSearch(e, !0), (0, oe.isReservedPeer)(e.get().peer) || n.changePeer(e, !1);
                var a = e.get().gid ? "l_mgid" + e.get().gid : "msg";
                handlePageCount(a, e.get().unread_cnt)
            },
            toggleSettingsLoader: function(e, t) {
                y.toggleLoader(e, t)
            },
            onUserActions: function(e, t) {
                if (!(0, se.isSearchingInplace)(e.get().peer, e.get())) {
                    var r = e.get(),
                        a = r.peer;
                    if ((0, oe.isFullyLoadedTab)(r, a) && !s.is_idle) {
                        var i = (0, ie.countUnread)(e.get().peer, e.get());
                        if (i > 0) {
                            var o = r.tabs[a];
                            !o.skipped && n.isNewMessagesVisible(e) && (n.hideGoToEnd(!0), e.set(se.readLastMessages.bind(null, a)))
                        }
                    }
                }
            },
            removeSelection: function(e) {
                t.removeSelection(e), r.focusInput(e)
            },
            route: function(e, a, s, o) {
                if ("undefined" != typeof e[0]) return !0;
                e.box && (e = {
                    box: e.box
                });
                var u = !1;
                return e.invite_chat_id && s.invite_hash ? !0 : (o && o.params && "left_nav" === o.params._ref && "undefined" == typeof e.sel && t.scrollUp(!0, !0), Object.keys(e).sort().forEach(function(e) {
                    switch (e) {
                        case "sel":
                            u = !0;
                            var a = s.sel ? (0, oe.unUrlPeer)(s.sel) : 0,
                                c = o.back;
                            0 === a ? w.get().longpoll.push([J.resetPeer(!1, c)]) : w.get().longpoll.push([J.changePeer(a, s.msgid || !1)]);
                            break;
                        case "invite_chat_id":
                        case "invite_hash":
                            p(w);
                            break;
                        case "tab":
                            k(w, b, f), u = !0;
                            var d = s.tab || le.FOLDER_ALL;
                            w.get().longpoll.push([J.changeTab(d)]);
                            break;
                        case "act":
                            s.act && "create" === s.act ? S(w, [], b, r, t, n, i) : I(w, [], b, i);
                            break;
                        case "q":
                            s.q ? r.setSearch(w, s.q) : r.clearSearch(w);
                            break;
                        case "box":
                            l(w, s.box)
                    }
                }), (0, oe.isClassicInterface)(w) && "undefined" == typeof e.sel && O.updateMenu(w), u && T(w, r, t), !1)
            },
            updateDialogFilters: function(e) {
                (0, ie.isSearching)(e) || t.restoreDialogs(e), y.updateFilter(e)
            },
            removePeer: function(e, n) {
                t.removeDialog(e, n), t.saveScroll(e), e.get().peer === n && e.get().longpoll.push([J.resetPeer()]), (0, oe.isClassicInterface)(e) && O.updateMenu(e)
            },
            newMessage: function(e) {
                (0, oe.isClassicInterface)(e) || t.scrollUp(!0)
            },
            onEvents: function(e, s) {
                var l = M(s.filter(function(e) {
                        return e.type !== J.ADD_MESSAGE || !(e.flags & J.FLAG_STEALTH)
                    })),
                    p = s.filter(oe.isServiceMsg),
                    v = s.filter(function(e) {
                        return e.type === J.ADD_MESSAGE
                    });
                d(p, e, t, n, O), e.set(se.checkNewPeople.bind(null, p, v, o)).then(function() {
                    l.forEach(function(s) {
                        switch (s.type) {
                            case J.ADD_MESSAGE:
                                var o = e.get().tabs[e.get().peer],
                                    l = !o || !o.msgs || 0 == o.msgs.length,
                                    d = (0, oe.isDuplicate)(s, e.get()),
                                    p = (0, ie.isCommunityBlocked)(e, s.peerId);
                                if (0 === d) {
                                    s.flags & J.FLAG_OUTBOUND || e.set(se.updateFavAndTitle.bind(null, s.peerId, !0)), e.set(se.addMessage.bind(null, s)), C(e, i), _(e, s) && (m(e, s), t.updateTyping(s.peerId, e), (0, ie.isSearching)(e) ? t.updateDialog(s.peerId, e) : t.promoteDialog(e, s.peerId));
                                    var v = (0, ie.isCommunityBlocked)(e, s.peerId);
                                    v === !1 && p === !0 && n.updateActions(e), (0, oe.isClassicInterface)(e) && (O.updateCounter(e, s.peerId), O.updateMenu(e)), n.updateTyping(s.peerId, e), n.addMessage(e, s), (0, oe.isClassicInterface)(e) || y.updateFilter(e), h(s) || !(0, oe.isFullyLoadedTab)(e, s.peerId) || s.local || e.set(se.loadMedia.bind(null, s)).then(function(e) {
                                        n.replaceAttachmentPlaceholders(e, s), (0, se.videoAutoPlayHandler)()
                                    })
                                } else 2 === d ? (h(s) || e.set(se.loadMedia.bind(null, s)).then(function(e) {
                                    n.replaceAttachmentPlaceholders(e, s)
                                }), e.set(se.replaceMessage.bind(null, s)), n.replaceMessageAttrs(s, e), t.updateDialog(s.peerId, e)) : (0, ie.isSearching)(e) || t.promoteDialog(e, s.peerId);
                                o && l && B();
                                break;
                            case J.EDIT_MESSAGE:
                                e.set(se.editMessage.bind(null, s)).then(function(e) {
                                    t.updateDialog(s.peerId, e), n.updateTyping(s.peerId, e), n.editMessage(e, s), h(s) || !(0, oe.isFullyLoadedTab)(e, s.peerId) || s.local || e.set(se.loadMedia.bind(null, s)).then(function(e) {
                                        n.replaceAttachmentPlaceholders(e, s)
                                    })
                                });
                                break;
                            case J.READ_INBOUND:
                                e.set(se.markInboundMessagesAsRead.bind(null, s)).then(function(e) {
                                    t.updateCounter(e, s.peerId), n.updateGoToEnd(e, !0), (0, oe.isClassicInterface)(e) && O.updateCounter(e, s.peerId), (0, ie.isSearching)(e) || t.restoreDialogs(e), y.updateFilter(e)
                                });
                                break;
                            case J.READ_OUTBOUND:
                                e.set(se.markOutboundMessagesAsRead.bind(null, s)).then(function(e) {
                                    t.updateCounter(e, s.peerId), n.markMessagesAsRead(e, s)
                                });
                                break;
                            case J.UNREAD_COUNT:
                                e.set(se.updateUnreadCount.bind(null, s.count)).then(function() {
                                    var t = e.get().gid ? "l_mgid" + e.get().gid : "msg";
                                    handlePageCount(t, s.count), y.updateFilter(e), (0, oe.isClassicInterface)(e) && u(e, i)
                                });
                                break;
                            case J.GOT_ONLINE:
                            case J.GOT_OFFLINE:
                                var w = s.type === J.GOT_ONLINE;
                                e.set(se.updateOnline.bind(null, s.userId, w ? s.platform : !1, s.lastSeenTs)).then(function(e) {
                                    (0, oe.isTabLoaded)(e.get(), s.userId) && (t.updateOnline(s.userId, e), n.updateOnline(s.userId, e))
                                });
                                break;
                            case J.SET_FLAGS:
                            case J.RESET_FLAGS:
                                if (s.flags & J.FLAG_DELETED && s.type === J.SET_FLAGS && !(0, oe.isAlreadyDeleted)(e, s.peerId, s.messageId) && !e.get().blockedFlagUpdates[s.peerId] && g(s), s.flags === J.FLAG_IMPORTANT) {
                                    var k = s.type === J.SET_FLAGS;
                                    e.set(se.updateImportant.bind(null, k ? 1 : -1, s.messageId)).then(function() {
                                        (0, oe.isClassicInterface)(e) || r.updateImportantCnt(e)
                                    }), e.set(se.updateFavMessage.bind(null, [s.messageId], s.peerId, k)).then(function(t) {
                                        n.markImportant(s.messageId, k, e)
                                    })
                                }
                                break;
                            case J.TYPING:
                                (0, oe.isSelfMessage)(s.peerId, e.get().gid) || (e.set(se.setTyping.bind(null, s.peerId, s.userId)).then(function(e) {
                                    (0, oe.isTabLoaded)(e.get(), s.peerId) && (n.updateTyping(s.peerId, e), t.updateTyping(s.peerId, e))
                                }), e.set(se.waitTyping.bind(null, s.peerId, s.userId)).then(function(e) {
                                    (0, oe.isTabLoaded)(e.get(), s.peerId) && (n.updateTyping(s.peerId, e), t.updateTyping(s.peerId, e))
                                }));
                                break;
                            case J.NOTIFY_SETTINGS_CHANGED:
                                N(e, f, s.peerId, 0 !== s.disabledUntil);
                                break;
                            case J.RESYNC:
                                e.get().longpoll.pause(), e.set(se.resync).then(f().resync).then(function() {
                                    return e.get().longpoll.resume()
                                });
                                break;
                            case J.TRANSITION:
                                P.transition(s.state);
                                break;
                            case J.RESET_PEER:
                                if (s.removeActivePeer) {
                                    var S = e.get().tabbedPeers.filter(function(t) {
                                        var n = t.peer,
                                            r = t.type;
                                        return n !== e.get().peer && "perm" === r
                                    });
                                    e.setState({
                                        tabbedPeers: S
                                    })
                                }
                                c(e, t, n, i), s.cancelSearch && T(e, r, t), (0, oe.isClassicInterface)(e) && O.updateMenu(e), r.focusInput(e);
                                break;
                            case J.CHANGE_TAB:
                                (0, oe.changeTab)(s.tab, e, f, se.changeDialogsTab).then(function(e) {
                                    y.updateFilter(e)
                                });
                                break;
                            case J.RESET_DIRECTORIES:
                            case J.SET_DIRECTORIES:
                            case J.REPLACE_DIRECTORIES:
                                e.set(se.updateFolderState.bind(null, s.peerId, s.mask, s.type, s.local)).then(function(e) {
                                    (0, ie.isSearching)(e) || s.type === J.RESET_DIRECTORIES && s.mask === J.FOLDER_IMPORTANT || s.type === J.REPLACE_DIRECTORIES || t.restoreDialogs(e), t.updateDialog(s.peerId, e), u(e, i), e.get().peer === s.peerId && n.changedMessageSelection(e)
                                });
                                break;
                            case J.DELETE_DIALOG:
                                e.set(se.deletedDialog.bind(null, s.peerId, Promise.resolve([]))).then(function() {
                                    f().removePeer(e, s.peerId), f().updateDialogFilters(e)
                                });
                                break;
                            case J.CHANGE_PEER:
                                E(e, s, t, n, r, i, O, b, f);
                                break;
                            case J.MUTEX:
                                var I = a({}, s.peerId, s),
                                    M = (0, oe.isPeerBlocked)(s.peerId, e);
                                e.set(se.updateBlockStates.bind(null, I)).then(function() {
                                    t.updateDialog(s.peerId, e);
                                    var r = (0, oe.isPeerBlocked)(s.peerId, e);
                                    (0, oe.isFullyLoadedTab)(e.get(), s.peerId) && M !== r && n.updateChat(e, s.peerId)
                                });
                                break;
                            case J.FAILED_MESSAGE:
                                e.set(se.setMessageErrored.bind(null, s.peer, s.message)).then(function() {
                                    n.setMessageErrored(s.peer, s.message, s.error, e), t.setDialogFailed(s.peer, s.message.messageId, e)
                                });
                                break;
                            case J.RESEND:
                                var L = s.message.messageId;
                                e.set(se.resendMessage.bind(null, s.peerId, L, s.message)).then(function() {
                                    n.resendMessage(s.peerId, L), t.promoteDialog(e, s.peerId)
                                })
                        }
                    })
                })
            },
            updateHistory: function(e) {
                return n.updateHistory(e)
            },
            cancelRecording: function() {
                return w.set(se.cancelRecording).then(function() {
                    return n.cancelRecording()
                })
            },
            fixHeight: function() {
                B()
            },
            unmount: function() {
                (0, Y.destroyModule)(e), clearInterval(w.get().update_title_to), s.stop(), o.stop(), t.unmount();
                var a = window.devicePixelRatio >= 2 ? "_2x" : "";
                setFavIcon("/images/icons/favicons/fav_logo" + a + ".ico"), n.unmount(), r.unmount(), cancelStackFilter("im_peer"), y.unmount(), b && b.unmount(), O && O.unmount(), D && D(), L && L(), (0, oe.isLocksAvailable)(w) && w.get().peer && w.set(se.releaseBlock.bind(null, w.get().peer)), x.unmount(), O && O.unmount(), R.unmount(), clearInterval(A), cur.imDb.unmount(), cur.imDb = !1
            }
        }
    }

    function L(e, t, n, r) {
        (0, oe.isReservedPeer)(t.get().peer) || e().onUserActions(t, r), t.set(se.updateFavAndTitle.bind(null, !1, !1))
    }

    function A(e, t) {
        var n = ge("page_header"),
            r = geByClass1("_im_page_history", e),
            a = window.clientHeight() - n.offsetHeight - pe - 2,
            i = (0, oe.isClassicInterface)(t) ? he : _e,
            s = {
                page: Math.max(a, i)
            };
        if ((0, oe.isClassicInterface)(t)) {
            var o = (0, oe.getClassicChatHeight)();
            o = o > 0 ? Math.min(o - n.offsetHeight - pe - 2, a) : a;
            var l = hasClass(r, "im-page--history_empty-hist") ? o : a;
            s.history = Math.max(o, i), s.chat = Math.max(l, i)
        }
        return s
    }

    function O(e, t, n, r, a) {
        var i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !0,
            s = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : !1;
        if (!isFullScreen()) {
            var o = A(e, t);
            if (setStyle(e, {
                    minHeight: o.page
                }), (0, oe.isClassicInterface)(t) && ("undefined" == typeof t.get().chatResizeInitialized && t.set(se.initializeChatResize), setStyle(e, {
                    height: t.get().isCreating ? o.page : "auto"
                }), setStyle(geByClass1("_im_page_dialogs", e), {
                    minHeight: o.page,
                    position: "static",
                    top: 0
                }), setStyle(geByClass1("_im_page_history", e), {
                    minHeight: o.history,
                    position: "relative",
                    top: 0
                }), setStyle(geByClass1("_im_chat_body_abs", e), {
                    minHeight: o.chat,
                    height: o.chat,
                    position: "relative",
                    top: 0
                })), browser.safari && s && "function" == typeof s && s(), r && r.updateScroll(), a && a.updateScroll(), n) {
                var l = n.updateScroll();
                n.scrollFix(t, t.get().peer, l)
            }
            i && setTimeout(function() {
                return O(e, t, n, r, a, !1)
            }, 100)
        }
    }

    function D(e) {
        var t = "safari-repaint";
        e.forEach(function(e) {
            hasClass(e, t) && removeClass(e, t), addClass(e, t)
        }), setTimeout(function() {
            e.forEach(function(e) {
                removeClass(e, t)
            })
        }, 100)
    }

    function x() {
        var e = [geByClass1("_im_dialog_actions"), geByClass1("_im_chat_input_w"), ge("side_bar"), geByClass1("_im_right_menu"), geByClass1("_im_dialogs_settings"), geByClass1("_im_dialogs_search")];
        D(e)
    }

    function R(e, t, n, r) {
        function i() {
            var t = (0, K.getNativeOption)("scrollLeft"),
                n = hasClass(e, "im-page--header_static"),
                r = [];
            u !== t ? r = l.slice().concat([e]) : n !== c && (r = [e]), u = t, c = n, r.length > 0 && r.forEach(function(r) {
                var i = e === r && n ? 0 : -t;
                setStyle(r, a({}, cssTransformProp, 0 === i ? "unset" : "translateX(" + i + "px)"))
            })
        }
        if (browser.mobile) return !1;
        var s = geByClass1("_im_chat_input_w", r),
            o = geByClass1("_im_dialog_actions", r),
            l = [t, n, s, o],
            u = null,
            c = hasClass(e, "im-page--header_static"),
            d = ge("im-group-online-disabled-notice");
        return d && l.push(d), addEvent(window, "scroll", i), i(),
            function() {
                removeEvent(window, "scroll", i)
            }
    }

    function B(e) {
        var t = e.get();
        if (!(0, oe.isLocksAvailable)(e)) return null;
        var n = (0, Z.createWorker)(t.mutex_key, function(e) {
                t.longpoll.push([J.mutexEvent(e)])
            }, function(e, n) {
                return (0, se.getMutexQueue)(t.gid).then(function(e) {
                    var t = j(e, 1),
                        n = t[0];
                    return n
                })
            }),
            r = n.stop;
        return r
    }

    function N(e, t, n, r) {
        e.set(se.setMutedPeer.bind(null, n, r)).then(t().updateState.bind(null, n))
    }

    function F(e, t) {
        var n = t.get(),
            r = void 0,
            a = window.devicePixelRatio >= 2 ? "_2x" : "";
        setFavIcon("/images/icons/favicons/fav_im" + a + ".ico"), O(e, t, !1, !1, !1, !0), show(e);
        var s = (0, Y.createMutations)(P),
            o = s.callMutations,
            u = s.bindMutations,
            c = (0, X.startLongPoll)(n);
        c.on("data", function() {
            for (var e = arguments.length, n = Array(e), r = 0; e > r; r++) n[r] = arguments[r];
            return o().onEvents(t, n)
        });
        var d = geByClass1("_im_dialogs_search", e),
            g = geByClass1("_im_dialogs_settings", e),
            m = (0, H.mount)(geByClass1("_im_page_dcontent", e), t, o),
            p = (0, U.mount)(geByClass1("_im_page_history", e), t, o),
            _ = (0, G.mount)(d, t, o),
            h = (0, q.mount)(g, t, o),
            v = (0, ne.mount)(t);
        cur.imDb = (0, re.mount)(t.get().gid ? -t.get().gid : vk.id), t.set(se.preloadSearchIndex.bind(null, cur.imDb)), (0, oe.isClassicInterface)(t) && h.updateSettings(t);
        var b = void 0,
            y = void 0;
        if ((0, oe.isClassicInterface)(t)) {
            var C = geByClass1("_im_ui_peers_list", e.parentNode);
            b = (0, te.mount)(C, t, o), y = R(d, g, geByClass1("_im_right_menu", e.parentNode), e)
        }(0, oe.isClassicInterface)(t) && n.peer && m.deactivate(), n.gid || (r = (0, z.mount)(geByClass1("_im_dialogs_creation", e), t, o));
        var w = n.isCreating,
            E = w ? "create" : 0 === n.peer ? "search" : "default";
        w && r.show(t, []);
        var k = (0, Q.create)(t, E, m, p, _, r),
            T = (0, ce.mount)(t, k);
        p.updateScroll();
        var S = L.bind(null, o, t, k);
        (0, oe.isReservedPeer)(n.peer) || setTimeout(function() {
            return f(t, p)
        }, 10);
        var I = new IdleManager({
                id: "im",
                element: document,
                focusElement: window,
                triggerEvents: "mouseover mousedown keypress"
            }),
            M = debounce(x, 300),
            A = O.bind(null, e, t, p, m, r, !1, M);
        t.setState({
            longpoll: c
        }), t.set(se.setExecStack.bind(null, [])), I.on("unidle", function() {
            c.abortPauses(), S()
        }), I.start(), nav.objLoc.box && (l(t, nav.objLoc.box), (0, V.updateLocation)({
            box: null
        }));
        var D = B(t),
            N = void 0;
        (0, oe.isLocksAvailable)(t) && (N = setInterval(oe.blockLatencyCompensation.bind(null, t, n.longpoll), 2e3)), t.get().invitation && (0, oe.showInvitationBox)(t, t.get().invitation, se.leaveInvitation);
        var F = (0, ae.throttleAccumulate)(i.bind(null, t, p, m, b), 200),
            j = oe.hideTopNotice.bind(null, t),
            K = oe.hideAsideNotice.bind(null, t),
            W = (0, Y.createModule)({
                handlers: function(t, n) {
                    t(document, "mousemove mousedown keypress", S), t(window, "resize", A), n(e, "click", oe.HIDE_TOP_NOTICE_CLASS, j), n(gpeByClass("_im-page-wrap", e), "click", oe.HIDE_ASIDE_NOTICE_CLASS, K), browser.safari && t(document, "visibilitychange", x)
                }
            });
        return u(W, m, p, _, e, I, c, F, o, r, h, t, k, D, N, b, y, v, T, A)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var j = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && o["return"] && o["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.mount = F;
    var H = n(105),
        U = n(30),
        G = n(92),
        q = n(67),
        z = n(42),
        V = n(91),
        K = n(112),
        W = n(7),
        Y = n(83),
        Q = n(47),
        X = n(133),
        $ = n(132),
        J = r($),
        Z = n(74),
        ee = n(126),
        te = n(118),
        ne = n(88),
        re = n(110),
        ae = n(36),
        ie = n(139),
        se = n(46),
        oe = n(20),
        le = n(5),
        ue = n(98),
        ce = n(53),
        de = n(66),
        me = n(117),
        fe = n(121),
        pe = 30,
        _e = 400,
        he = 250,
        ve = 32,
        be = 12,
        ye = 52,
        Ce = 5 * ve + 2 * be + ye,
        we = 3 * ve + 2 * be,
        Ee = 10,
        ke = "._im_aside_notice"
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }

    function a(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function i(e, t, n) {
        removeClass(t.parentNode, "im-page--dialogs_with-mess");
        var r = n.getCurrentElements().filter(function(e) {
            return e.message
        });
        n.toTop(), n.reset(), (0, ae.statlogsProbValueEvent)(.01, "im_search_stat", 1, "search_messages_only"), r.length > 0 ? (r = [{
            type: "sep_messages"
        }].concat(r), e.setState({
            searchOnlyMessages: !0
        })) : r = [P()], n.pipeReplace(Promise.resolve(r))
    }

    function s(e) {
        return hasClass(e, "_im_search")
    }

    function o(e, t, n, r) {
        if ((0, Y.isSearching)(e) && e.get().searchAllLoaded || (0, Y.isRecentSearchesActive)(e)) return Promise.resolve([]);
        if (e.get().dialog_search_going || (0, W.isClassicInterface)(e) && 0 !== e.get().peer) return Promise.resolve(!1);
        if ((0, Y.isSearching)(e)) return (0, K.searchMessages)((0, Y.getSearchText)(e), e.get()).then(function(e) {
            var t = V(e, 2),
                n = t[0],
                r = t[1];
            return M(r, n)
        });
        var a = e.get().active_tab,
            i = e.get().dialog_tabs_all;
        return i[X.FOLDER_ALL] && !(0, W.isReversedDialogs)(e) || i[a] ? 0 === G(e).length ? Promise.resolve([{
            type: "empty_dialogs"
        }]) : Promise.resolve([]) : e.set(K.loadDialogs).then(function(t) {
            var n = G(e);
            return 0 === n.length ? [{
                type: "empty_dialogs"
            }] : n
        })
    }

    function l(e, t, n, r, a) {
        if (!gpeByClass("_im_peer_target", r.target)) {
            var i = t.get(),
                o = s(a),
                l = parseInt(domData(a, "peer"), 10),
                u = parseInt(domData(a, "msgid"), 10),
                c = (0, Y.getTab)(t, l);
            if (hasClass(a, "_im_create_email")) {
                var d = trim(geByClass1("_im_dialog_link", a).textContent);
                c = {
                    name: d,
                    type: "email_create"
                }
            }
            if (checkEvent(r)) return window.open(h(t, c, u, o));
            if (c && "email_create" === c.type) return (0, K.createEmailChat)(c.name, i).then(function(e) {
                return i.longpoll.push([te.changePeer(e, !1, !0, !0)])
            })["catch"](function(e) {
                showFastBox(getLang("global_error"), e), document.activeElement && document.activeElement.blur()
            });
            if (n.saveScroll("list"), o && i.msgid !== u) i.longpoll.push([te.changePeer(l, u)]);
            else if (l !== i.peer) {
                i.longpoll.push([te.changePeer(l, !1, !0, !0)]);
                var g = (0, Y.isSearching)(t);
                g && !hasClass(a, "_dont_add_recent") && (0, K.saveRecentSearchPeer)(l, cur.imDb), g && c && !(0, W.isClassicInterface)(t) && setTimeout(function() {
                    var e = c.message ? c.message.messageId : c.peerId;
                    n.scrollToElement(e.toString(), !0, 0, "center")
                }, 100)
            } else l === i.peer && i.longpoll.push([te.changePeer(l, !1, !0, !o)]);
            cancelEvent(r)
        }
    }

    function u(e, t, n, r) {
        var a = void 0;
        !(0, W.isChatPeer)(t) || "string" == typeof n.photo && "" !== n.photo ? (a = '<img src="' + n.photo + '" alt="">', r && (a = getTemplate("im_dialogs_link_img", {
            href: n.href,
            photo: a
        }))) : a = (0, W.renderPhotosFromTab)(e, n, !r);
        var i = '<span class="_im_dialog_link">' + n.tab + "</span>";
        return {
            photo: a,
            userLink: i
        }
    }

    function c(e) {
        return !(0, W.isPendingForward)(e)
    }

    function d(e, t, n) {
        return n ? getTemplate("im_img_prebody", {
            photo: t
        }) : e + ":"
    }

    function g(e, t, n, r, a, i, s, o, l, u) {
        var c = "",
            g = "";
        return t & te.FLAG_OUTBOUND ? c = d(getLang("mail_by_you"), u, l) : (0, W.isChatPeer)(n) && 0 !== r && (c = d((0, ie.oCacheGet)(e, r).first_name, (0, ie.oCacheGet)(e, r).photo, l)), s = (0, W.renderShortText)(n, o, s, a, i), g = c ? getTemplate("im_drow_prebody", {
            prebody: c,
            body: s
        }) : s
    }

    function m(e, t, n, r) {
        var a = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
            i = [];
        return (0, W.isClassicInterface)(r) && i.push("nim-dialog_classic"), (0, Y.isRecentSearchesActive)(r) && i.push("nim-dialog_recent"), i.push("nim-dialog_empty"), a.search && i.push("_im_search"), getTemplate("im_drow", {
            peer: e.peerId,
            msg_id: "",
            photo: t,
            user_link: n,
            date: "",
            body: "",
            unread: "",
            more: i.join(" "),
            is_star: "",
            unread_message_string: "",
            is_online: onlinePlatformClass(e.online),
            is_unread: "",
            is_unread_out: "",
            is_selected: e.peerId == r.get().peer ? "nim-dialog_selected _im_dialog_selected" : ""
        })
    }

    function f(e, t, n) {
        return n & te.FLAG_OUTBOUND ? (0, W.isSelfMessage)(t.peerId, e.get().gid) ? !1 : (0, W.isChatPeer)(t.peerId) && t.data && t.data.closed ? !1 : t.unread ? !1 : t.lastmsg <= t.out_up_to ? !1 : !0 : !1
    }

    function p(e) {
        var t = C(e),
            n = e.unread > 0 ? e.unread : "";
        return n > 0 && t
    }

    function _(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
            a = u(e, t.peerId, t, (0, W.isClassicInterface)(e)),
            i = a.photo,
            s = a.userLink,
            o = n || C(t);
        if (!o) return m(t, i, s, e, r);
        var l = o.flags,
            c = y(t, e, n),
            d = [];
        r.search && d.push("_im_search", "nim-dialog_search"), inArray(t.peerId, e.get().mutedPeers) && d.push("nim-dialog_muted"), t.verified && d.push("nim-dialog_verified"), (0, Y.isRecentSearchesActive)(e) && d.push("nim-dialog_recent"), -1 === o.messageId && d.push("nim-dialog_empty"), (0, W.isClassicInterface)(e) && d.push("nim-dialog_classic"), t.folders & te.FOLDER_IMPORTANT && d.push("nim-dialog_starred"), !r.search && (0, W.isUnrespond)(e, t.peerId, t) && d.push("nim-dialog_unrespond");
        var g = e.get().timeshift,
            _ = f(e, t, l) ? "nim-dialog_unread-out" : "",
            h = t.unread > 0 ? getLang("mail_im_new_messages", t.unread) : "";
        return getTemplate("im_drow", {
            peer: t.peerId,
            msg_id: o.messageId,
            photo: i,
            user_link: s,
            date: o.date ? getShortDateOrTime(o.date, g, !0, getLang("months_sm_of", "raw")) : "",
            body: c,
            unread_message_string: h,
            tab_name: stripHTML(t.tab),
            unread: (0, W.simplifyCounter)(t.unread),
            more: d.join(" "),
            is_online: onlinePlatformClass(t.online),
            is_unread: p(t) ? "nim-dialog_unread" : "",
            is_unread_out: _,
            is_selected: r.noselect || t.peerId != e.get().peer ? "" : "nim-dialog_selected _im_dialog_selected"
        })
    }

    function h(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1,
            a = (0, W.getBaseLink)(e),
            i = function() {
                return a + "?sel=" + (0, W.convertPeerToUrl)(t.peerId) + (r && n ? "&msgid=" + n : "")
            };
        return "email_create" === t.type ? a + "?email=" + t.name : r ? i() : (0, W.isUserPeer)(t.peerId) || (0, W.isCommunityPeer)(t.peerId) ? (0, W.isClassicInterface)(e) ? i() : t.href : i()
    }

    function v(e, t, n, r, a) {
        if (!t.deletedDialog) {
            if (hasClass(e, "nim-conversation-search-row")) return void b(e, t, n);
            var i = C(t),
                s = i.flags,
                o = y(t, n),
                l = u(n, t.peerId, t, (0, W.isClassicInterface)(n)),
                c = l.photo,
                d = n.get().timeshift,
                g = i.date ? getShortDateOrTime(i.date, d, !0, getLang("months_sm_of", "raw")) : "";
            R(e, t), val(geByClass1("_dialog_body", e), o), val(geByClass1("_im_dialog_date", e), g), val(geByClass1("_im_dialog_unread_ct", e), (0, W.simplifyCounter)(t.unread)), val(geByClass1("_im_dialog_link", e), t.tab);
            var m = geByClass1("_im_dialog_photo", e);
            m.innerHTML !== c && val(m, c), toggleClass(e, "nim-dialog_verified", !!t.verified), toggleClass(e, "nim-dialog_starred", t.folders & te.FOLDER_IMPORTANT), toggleClass(e, "nim-dialog_muted", inArray(t.peerId, n.get().mutedPeers)), toggleClass(e, "nim-dialog_unrespond", (0, W.isUnrespond)(n, t.peerId, t)), toggleClass(e, "nim-dialog_classic", (0, W.isClassicInterface)(n)), toggleClass(e, "nim-dialog_unread", p(t)), removeClass(e, "nim-dialog_failed"), removeClass(e, "nim-dialog_deleted"), addClass(e, "_im_dialog"), toggleOnline(geByClass1("_im_peer_online", e), t.online), toggleClass(e, "nim-dialog_recent", (0, Y.isRecentSearchesActive)(n)), toggleClass(e, "nim-dialog_empty", -1 === i.messageId), f(n, t, s) && addClass(e, "nim-dialog_unread-out"), a && setTimeout(function() {
                addClass(geByClass1("_im_dialog_" + t.peerId, r), "nim-dialog_injected")
            }, 100)
        }
    }

    function b(e, t, n) {
        R(e, t), toggleClass(e, "nim-dialog_recent", (0, Y.isRecentSearchesActive)(n)), val(geByClass1("_im_dialog_unread_ct", e), (0, W.simplifyCounter)(t.unread));
        var r = u(n, t.peerId, t, (0, W.isClassicInterface)(n)),
            a = r.photo,
            i = geByClass1("_im_dialog_photo", e);
        i.innerHTML !== a && val(i, a), toggleOnline(geByClass1("_im_peer_online", e), t.online), p(t) && addClass(e, "nim-dialog_unread")
    }

    function y(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = n || C(e);
        if ((0, W.isPeerBlocked)(e.peerId, t)) {
            var a = t.get().block_states[e.peerId].name,
                i = getLang("mail_community_answering").replace("{username}", a);
            return getTemplate("im_drow_prebody", {
                prebody: i,
                body: ""
            })
        }
        return (0, W.isServiceMsg)(r) ? (0, W.renderServiceMsg)(t, r, e, !1) : g(t, r.flags, e.peerId, r.userId, !0, r.attaches, r.text, r.subject, (0, W.isClassicInterface)(t), (0, ie.oCacheGet)(t, t.get().id).photo)
    }

    function C(e) {
        var t = e.lastmsg_meta;
        return isArray(t) && (t = (0, ee.addMessageEvent)([4].concat(t))), t ? t : (0, ee.addMessageEvent)([4, -1, 0, e.peer, 0, "", {}, {}, -1, -1, 0])
    }

    function w(e, t, n, r, a) {
        var i = geByClass1("_dialog_body", t);
        addClass(t, "nim-dialog_deleted"), removeClass(t, "_im_dialog"), val(i, getTemplate("im_delete_actions", {
            text: langNumeric(n, getLang("mail_im_X_message_deleted", "raw")),
            peer: e,
            spam_id: r
        }))
    }

    function E(e, t, n) {
        var r = (0, W.showFlushDialog)(t, function(a) {
            n().updateMenu(e), (0, W.cleanHistory)(e, r, n, K.flushHistory, t)
        })
    }

    function k(e, t, n, r, a, i) {
        var s = gpeByClass("_im_dialog", i, n);
        if (s) {
            var o = intval(domData(s, "peer"));
            if (t.get().recentSearch) {
                var l = (0, K.removeFromRecentSearch)(o, cur.imDb);
                return re(s), cancelEvent(a), 0 === l.length && H(t, r, e), !1
            }
            var u = (0, W.isCommunityPeer)(o) || (0, W.isUserPeer)(o);
            (0, W.isClassicInterface)(t) && u ? (0, K.deleteDialog)(o, t.get()).then(function(n) {
                var r = V(n, 2),
                    a = r[0],
                    i = r[1];
                a ? (w(o, s, a, i, t), e().updateMenu(t)) : E(t, o, e)
            }) : E(t, o, e)
        }
        return cancelEvent(a), !1
    }

    function T(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
            r = u(e, t.peerId, t, (0, W.isClassicInterface)(e)),
            a = r.photo,
            i = r.userLink,
            s = c(e),
            o = "" === n ? [] : [n];
        return (0, Y.isRecentSearchesActive)(e) && o.push("nim-dialog_recent"), (0, W.isClassicInterface)(e) && o.push("nim-csr_classic"), inArray(t.peerId, e.get().mutedPeers) && o.push("nim-dialog_muted"), getTemplate("im_conversation_search_row", {
            peer: t.peerId,
            msg_id: t.lastmsg || "",
            photo: a,
            user_link: i,
            unread: (0, W.simplifyCounter)(t.unread),
            tab_name: stripHTML(t.tab),
            is_unread: p(t) ? "nim-dialog_unread" : "",
            is_online: onlinePlatformClass(t.online),
            is_selected: t.peerId == e.get().peer && s ? "nim-dialog_selected _im_dialog_selected" : "",
            more: o.join(" ")
        })
    }

    function S(e, t) {
        switch (t.type) {
            case "sep_btn_search_msg":
                return (0, W.renderBtnSearchOnlyMessages)(e);
            case "sep_messages":
                return (0, W.renderMessagesSep)();
            case "sep_conversations":
                return (0, W.renderConversationsSep)();
            case "sep_popular":
                return (0, W.renderPopularSuggSep)();
            case "popular_sugg":
                return (0, W.renderPopularSuggestions)(e);
            case "email_create":
                var n = {
                    peerId: t.peerId,
                    lastmsg: -1,
                    photo: "/images/contact_2x.png",
                    online: "",
                    type: t.type,
                    name: t.query,
                    tab: t.query
                };
                return T(e, n, "_im_create_email");
            case "clear_recent":
                return (0, W.renderClearRecent)();
            case "empty_dialogs":
                return getTemplate("im_dialogs_none", {
                    msg: getLang("mail_dialogs_list_empty")
                });
            case "empty":
                return getTemplate("im_dialogs_none", {
                    msg: getLang("mail_im_search_empty")
                });
            default:
                return t.message ? _(e, t, t.message, {
                    noselect: !0,
                    search: !0
                }) : t.local_index || (0, Y.isSearching)(e) ? T(e, t) : _(e, t)
        }
    }

    function I(e, t, n, r, a, i) {
        var s = intval(domData(i, "peer")),
            o = domData(i, "action"),
            l = domData(i, "sid"),
            u = geByClass1("_im_dialog_" + s, t),
            c = intval(domData(i, "spam"));
        switch (o) {
            case "restore":
                u && e.set(K.restoreDialog.bind(null, s, l, c)).then(function() {
                    addClass(u, "_im_dialog"), removeClass(u, "nim-dialog_deleted"), v(u, e.get().tabs[s], e, t, !1), r().updateMenu(e)
                });
                break;
            case "spam":
                var d = getLang("mail_im_dialog_marked_spam") + '\n        <button type="button" class="nim-dialog--daction nim-dialog--daction_last _im_dialog_daction"\n          data-action="restore"\n          data-spam="1"\n          data-sid="' + l + '" data-peer="' + s + '">\n            ' + getLang("mail_restore") + "\n        </button>";
                if (u) {
                    var g = geByClass1("_dialog_body", u);
                    val(g, d), (0, K.spamDialog)(s, l, e.get())
                }
                break;
            case "block":
                var m = void 0;
                m = (0, W.isCommunityInterface)(e) ? (0, W.showBlacklistBox)(s, e) : (0, W.showBlacklistBoxUser)(s, e), m.once("success", function() {
                    e.set(K.flushHistory.bind(null, s)).then(function() {
                        n().restoreDialogs(e)
                    })
                })
        }
        cancelEvent(a)
    }

    function M(e, t) {
        return e.map(function(e) {
            return (0, ee.addMessageEvent)([4].concat(e))
        }).map(function(e) {
            return extend({}, t[e.peerId], {
                message: e
            })
        })
    }

    function P(e) {
        return {
            type: "empty",
            lang: e
        }
    }

    function L(e, t, n) {
        return (0, W.isClassicInterface)(n) || t().toggleSettingsLoader(n, !0), e.checkMore(!(0, W.isClassicInterface)(n)).then(function() {
            (0, W.isClassicInterface)(n) || t().toggleSettingsLoader(n, !1)
        })
    }

    function A(e, t) {
        var n = e.get().msg_local_ids_sort && e.get().msg_local_ids_sort[t.lastmsg];
        return "undefined" != typeof n ? 2e9 + n : t.lastmsg
    }

    function O(e, t, n, r) {
        var a = gpeByClass("_im_dialog", r, t),
            i = intval(domData(a, "peer"));
        return e.set(K.toggleDialogImportant.bind(null, i)), setTimeout(function() {
            x(e, t, n, r)
        }, 100), cancelEvent(n), !1
    }

    function D(e, t, n) {
        var r = void 0;
        return t.message && n.message ? (r = n.message.messageId - t.message.messageId, r = (0, W.isReversedDialogs)(e) ? -r : r) : t.message && !n.message ? r = 1 : n.message && !t.message ? r = -1 : (r = A(e, n) - A(e, t), r = (0, W.isReversedDialogs)(e) ? -r : r), r
    }

    function x(e, t, n, r) {
        var a = r.getBoundingClientRect().top;
        showTooltip(r, {
            text: function() {
                var n = gpeByClass("_im_dialog", r, t),
                    a = domData(n, "peer");
                return e.get().tabs[a].folders & te.FOLDER_IMPORTANT ? getLang("mail_im_toggle_important_off") : getLang("mail_im_toggle_important")
            },
            black: 1,
            zIndex: 1,
            shift: [14, 8],
            toup: (0, Y.isSearching)(e) ? a > 190 : a > 150
        })
    }

    function R(e, t) {
        var n = t.unread > 0 ? getLang("mail_im_new_messages", t.unread) : "",
            r = geByClass1("_im_unread_blind_label", e);
        val(r, n)
    }

    function B(e, t, n, r, a) {
        var i = gpeByClass("_im_dialog", a, t),
            s = intval(domData(i, "peer")),
            o = e.get().tabs[s].lastmsg;
        return e.set(K.markDialogAnswered.bind(null, s, o)).then(function() {
            v(i, e.get().tabs[s], e, t), (0, Y.isRecentSearchesActive)(e) || n().restoreDialogs(e)
        }), showDoneBox(getLang("mail_marked_as_answered"), {
            out: 1e3
        }), cancelEvent(r), !1
    }

    function N(e) {
        var t = 42,
            n = 60,
            r = 45,
            a = 37,
            i = (0, Y.isSearching)(e),
            s = e.get().searchOnlyMessages;
        return (0, W.isClassicInterface)(e) ? {
            top: i && !s ? n + a - 1 : n,
            bottom: (0, W.isCommunityInterface)(e) ? t : t + r
        } : {
            top: i && !s ? a - 1 : 0,
            bottom: 0
        }
    }

    function F(e, t) {
        e.hoverFirstElement(ce, N(t))
    }

    function j(e) {
        e.unhoverElements(ce)
    }

    function H(e, t, n) {
        if ((0, Y.doPopularSuggExist)(e)) {
            var r = [{
                type: "sep_popular"
            }, {
                type: "popular_sugg"
            }];
            t.pipeReplace(Promise.resolve(r)), t.toTop()
        } else n().cancelSearch(e), cancelStackFilter("im_search")
    }

    function U(e, t, n, r, a) {
        return {
            selectPeer: function(t, n) {
                for (var r = geByClass("_im_dialog", e), a = n.get().peer, i = 0; i < r.length; i++) {
                    var o = r[i],
                        l = intval(domData(o, "peer")),
                        u = intval(domData(o, "msgid"));
                    l === a && (!s(o) || t === u && s(o)) ? (addClass(o, "nim-dialog_selected"), addClass(o, "_im_dialog_selected")) : hasClass(o, "_im_dialog_selected") && (removeClass(o, "nim-dialog_selected"), removeClass(o, "_im_dialog_selected"))
                }
            },
            appendFastDialogs: function(t, r, a) {
                removeClass(e.parentNode, "im-page--dialogs_with-mess"), n.saveScroll("list"), a ? (n.reset(), (0, W.isPendingForward)(t) || (0, Y.isRecentSearchesActive)(t) || !(0, Q.doesSearchResultContainConversations)(r) ? (0, Y.isRecentSearchesActive)(t) && ((0, Q.doesSearchResultContainConversations)(r) && (r = [{
                    type: "clear_recent"
                }].concat(r)), (0, Y.doPopularSuggExist)(t) && (r = [{
                    type: "sep_popular"
                }, {
                    type: "popular_sugg"
                }].concat(r))) : r = [{
                    type: "sep_btn_search_msg"
                }, {
                    type: "sep_conversations"
                }].concat(r), t.setState({
                    searchOnlyMessages: !1
                }), n.pipeReplace(Promise.resolve(r)).then(function() {
                    return F(n, t)
                })) : n.pipe(Promise.resolve(r)), (!(0, W.isClassicInterface)(t) || (0, W.isReservedPeer)(t.get().peer)) && n.toTop()
            },
            deactivate: function() {
                n.deactivate()
            },
            activate: function() {
                n.activate()
            },
            hoverFirstDialog: function(e) {
                F(n, e)
            },
            hoverNextDialog: function(e) {
                n.hoverNextElement(ce, ue, N(e))
            },
            hoverPrevDialog: function(e) {
                n.hoverPrevElement(ce, ue, N(e))
            },
            unhoverDialogs: j.bind(n),
            selectHoveredDialog: function(t) {
                var a = geByClass1("_im_dialog_hovered", e);
                a || (a = geByClass1("_im_dialog", e)), a && l(r, t, n, {}, a)
            },
            appendSearch: function(t, r, a) {
                var i = M(a, r);
                a.length > 0 ? (addClass(e.parentNode, "im-page--dialogs_with-mess"), n.pipe(Promise.resolve([{
                    type: "sep_messages"
                }].concat(i))).then(function() {
                    return F(n, t)
                })) : (0 === n.getCurrentElements().length && n.pipeReplace(Promise.resolve([P()])), removeClass(e.parentNode, "im-page--dialogs_with-mess"))
            },
            updateDialog: function(t, n) {
                var r = geByClass1("_im_dialog_" + t);
                r && !s(r) && v(r, n.get().tabs[t], n, e)
            },
            focusOnSelected: function(e) {
                var t = e.get().peer;
                if (t) {
                    var r = geByClass1("_im_dialog_" + t);
                    r ? n.scrollTop(r.offsetTop - r.offsetHeight) : n.toTop()
                }
            },
            restoreScroll: function(e) {
                var t = n.restoreScroll("list");
                t || n.toTop()
            },
            restoreDialogs: function(t, a, i) {
                removeClass(e.parentNode, "im-page--dialogs_with-mess"), t.setState({
                    searchOnlyMessages: !1
                }), 0 !== G(t).length || n.isLoading() || (a = !0), a && n.reset(), i && n.wipe(), n.pipeReplace(Promise.resolve(G(t))).then(function(e) {
                    if (a && (!(0, W.isClassicInterface)(t) || !t.get().peer)) {
                        var i = L(n, r, t);
                        return n.toTop(), i
                    }
                }).then(function() {
                    return j(n)
                })
            },
            appendDialogs: function(t, r) {
                removeClass(e.parentNode, "im-page--dialogs_with-mess"), r.forEach(function(n) {
                    var r = geByClass1("_im_dialog_" + n.peerId, e);
                    r && b(r, n, t)
                }), (0, W.isPendingForward)(t) || (0, Y.isRecentSearchesActive)(t) || !(0, Q.doesSearchResultContainConversations)(r) || (r = [{
                    type: "sep_btn_search_msg"
                }, {
                    type: "sep_conversations"
                }].concat(r)), t.setState({
                    searchOnlyMessages: !1
                }), n.isEmpty() && 0 === r.length && (0, W.isPendingForward)(t) && (r = [P(getLang("mail_im_search_empty_chats"))]), n.replacePreserveOrder(r)
            },
            updateCounter: function(t, n) {
                var r = geByClass1("_im_dialog_" + n, e),
                    a = (0, Y.getTab)(t, n);
                if (r && !s(r) && (R(r, a), val(geByClass1("_im_dialog_unread_ct", r), (0, W.simplifyCounter)(a.unread)), toggleClass(r, "nim-dialog_unread", a.unread > 0), toggleClass(r, "nim-dialog_unread-out", f(t, a, C(a).flags))), (0, Y.isRecentSearchesActive)(t)) {
                    var i = geByClass1("_im_sugg_" + n);
                    i && (val(geByClass1("_sugg_unread_ct", i), (0, W.simplifyCounter)(a.unread)), toggleClass(i, "sugg-is_unread", a.unread > 0))
                }
            },
            removeDialog: function(e, t) {
                n.remove(t)
            },
            updateOnline: function(t, n) {
                var r = geByClass1("_im_dialog_" + t, e);
                if (r) {
                    var a = n.get().tabs[t],
                        i = geByClass1("_im_peer_online", r);
                    toggleOnline(i, a.online)
                }
            },
            setDialogFailed: function(t, n, r) {
                var a = geByClass1("_im_dialog_" + t, e);
                if (a) {
                    var i = r.get().tabs[t];
                    i.lastmsg === n && (addClass(a, "nim-dialog_failed"), val(geByClass1("_im_dialog_unread_ct", a), "!"))
                }
            },
            scrollUp: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                n.toTop(e, t), n.saveScroll("list", !0)
            },
            saveScroll: function(e) {
                n.saveScroll("list", !0)
            },
            promoteDialog: function(r, a) {
                var i = geByClass1("_im_dialog_" + a, e);
                return i && !s(i) || !(0, Y.isSearching)(r) ? (n.pipeReplace(Promise.resolve(G(r)), void 0, !0).then(function(t) {
                    !inArray(a, t) && i && v(i, (0, Y.getTab)(r, a), r, e)
                }), void t().updateTyping(a, r)) : void n.unsetScroll("list")
            },
            removeSelection: function(t) {
                var r = t.get().peer.toString(),
                    a = "._im_dialog_" + r + "." + ue.join("."),
                    i = domQuery(a, e)[0];
                ue.forEach(function(e) {
                    return removeClass(i, e)
                }), (0, W.isClassicInterface)(t) || n.hoverElement(r, ce, N(t))
            },
            updateScroll: function() {
                n.updateScroll()
            },
            updateTyping: function(t, n) {
                var r = geByClass1("_im_dialog_" + t, e);
                if (r && !s(r) && !n.get().tabs[t].deletedDialog) {
                    var a = geByClass1("_im_dialog_typing", r),
                        i = !(0, W.isClassicInterface)(n),
                        o = (0, W.formatTyper)(n.get().tabs[t].typing, t, !(0, W.isChatPeer)(t), n.get(), 1, i);
                    val(a, o), toggleClass(r, "nim-dialog_typing", o)
                }
            },
            unmount: function() {
                n.unmount(), (0, ne.destroyModule)(a)
            }
        }
    }

    function G(e) {
        var t = e.get().active_tab,
            n = e.get().dialog_tabs[t],
            r = e.get().tabs;
        return n.map(function(e) {
            return r["" + e]
        }).sort(D.bind(null, e))
    }

    function q(e, t) {
        return t.message ? t.message.messageId : (0, Y.isSearching)(e) && t.peerId ? t.peerId + "cr" : t.peerId || t.type
    }

    function z(e, t, n) {
        var r = (0, ne.createMutations)(U),
            a = r.callMutations,
            s = r.bindMutations,
            u = function(e, n) {
                var r = n.getBoundingClientRect().top;
                showTooltip(n, {
                    text: function() {
                        return (0, Y.isRecentSearchesActive)(t) ? getLang("mail_hide_from_recent") : getLang("mail_delete")
                    },
                    black: 1,
                    center: !0,
                    shift: (0, W.isClassicInterface)(t) ? [-4, 10] : [2, 10],
                    toup: r > 150 || (0, Y.isSearching)(t),
                    zIndex: 1
                })
            },
            c = function(e, t) {
                var n = t.getBoundingClientRect().top;
                showTooltip(t, {
                    text: getLang("mail_end_conversation"),
                    black: 1,
                    center: !0,
                    zIndex: 1,
                    shift: [1, 4],
                    toup: n > 150
                })
            },
            d = x.bind(null, t, e),
            g = O.bind(null, t, e),
            m = B.bind(null, t, e, a),
            f = geByClass1("_im_dialogs_search"),
            p = {
                idFn: function(e) {
                    return q(t, e)
                },
                hoverableFn: function(e) {
                    return hasClass(e, "_im_dialog")
                },
                renderFn: S.bind(null, t),
                more: o.bind(null, t, a),
                onScroll: (0, W.isClassicInterface)(t) ? function() {
                    var e = bodyNode.scrollTop || document.documentElement.scrollTop;
                    0 >= e && !layers.visible && browser.safari ? addClass(f, "im-page--header_static") : removeClass(f, "im-page--header_static")
                } : !1
            },
            _ = (0, Z.mount)(e, (0, J["default"])({
                limit: 40,
                offset: 0,
                nativeScroll: !!(0, W.isClassicInterface)(t),
                height: se,
                elements: G(t)
            }), function() {
                return p
            }),
            h = l.bind(null, n, t, _),
            v = i.bind(null, t, e, _),
            b = I.bind(null, t, e, a, n),
            y = k.bind(null, n, t, e, _),
            C = (0, ne.createModule)({
                handlers: function(r, a) {
                    a(e, "click", "_im_dialog_close", y), a(e, "click", "_im_dialog_markre", m), a(e, "click", oe, g), a(e, "click", "_im_dialog", h), a(e, "click", W.MESSAGE_SEARCH_CLASS, v), a(e, "mouseover", "_im_dialog_close", u), a(e, "mouseover", "_im_dialog_markre", c), a(e, "click", W.CLEAR_RECENT_CLASS, function() {
                        (0, K.resetRecentSearch)(cur.imDb), H(t, _, n)
                    }), a(e, "mouseover", oe, d), a(e, "click", le, b), r(e, "mouseover", throttle(_.unhoverElements.bind(_, ce), 100))
                }
            });
        return s(e, a, _, n, C)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var V = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && o["return"] && o["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.mount = z;
    var K = n(46),
        W = n(20),
        Y = n(139),
        Q = n(48),
        X = n(5),
        $ = n(78),
        J = a($),
        Z = n(49),
        ee = n(132),
        te = r(ee),
        ne = n(83),
        ae = n(34),
        ie = n(66),
        se = 64,
        oe = "_im_dialog_star",
        le = "_im_dialog_daction",
        ue = ["_im_dialog_selected", "nim-dialog_selected"],
        ce = ["_im_dialog_hovered", "nim-dialog_hovered"]
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = parseInt(e / 60),
            n = e % 60;
        return t + ":" + (10 > n ? "0" : "") + n
    }

    function a(e) {
        var t = e.match(/.*\/(\w*).*/);
        switch (t[1]) {
            case "mpeg":
                return "mp3";
            case "ogg":
            case "webm":
            case "wav":
                return t[1]
        }
        return ""
    }

    function i(e) {
        return new Promise(function(t, n) {
            for (var r = new FormData, i = [], s = 0; s < e.wave.length; s++) i.push(parseInt(31 * e.wave[s]));
            r.append("waveform", JSON.stringify(i)), r.append("file", e.buffer, "voice_message." + a(e.mimeType));
            var o = new D;
            o.onload = o.onerror = function(e) {
                var r = e.currentTarget.response;
                200 == this.status && r.length > 0 && "{" == r[0] ? (r = JSON.parse(r), t(r)) : n()
            }, o.open("POST", W.upload_url, !0), o.send(r)
        })
    }

    function s(e) {
        if (!Q) {
            Q = !0, (0, A.lockButton)(j);
            var t = {
                peer: q.get().peer,
                from_place: cur.docsChooseFrom,
                imhash: cur.docsChooseImHash,
                blockPersonal: cur.docsChooseBlockPersonal,
                mail_add: cur.docsChooseMailAdd
            };
            i(e).then(function(e) {
                return e.file ? new Promise(function(n, r) {
                    ajax.post("/docs.php", extend({
                        act: "a_save_doc",
                        from: "choose",
                        from_place: t.from_place,
                        imhash: t.imhash,
                        blockPersonal: t.blockPersonal,
                        mail_add: t.mail_add
                    }, e), {
                        onDone: function(e, r) {
                            m(), K([
                                ["doc", e + "_" + r, "audiomsg"]
                            ], {}, t.peer), C(), n()
                        },
                        onFail: function(e) {
                            r(e)
                        },
                        progress: null
                    })
                }) : Promise.reject()
            }).then(function() {
                (0, A.unlockButton)(j), Q = !1
            })["catch"](function() {
                Q = !1, (0, A.unlockButton)(j), showFastBox(getLang("global_error"), getLang("mail_audio_message_upload_error"))
            })
        }
    }

    function o(e) {
        var t = URL.createObjectURL(Y.buffer);
        domData(z, "duration", Y.duration), domData(z, "ogg", t), domData(z, "mp3", t), geByClass1("audio-msg-track--duration", z).innerHTML = r(Y.duration), geByClass1("audio-msg-track--wave-wrapper", z).innerHTML = AudioMessagePlayer.getWave(Y.wave, X)
    }

    function l() {
        R.innerHTML = r(Y.duration), Y.duration >= O && v()
    }

    function u(e) {
        e.set(P.cancelRecording).then(_)
    }

    function c() {
        stManager.add(["voice_message_player.js", "speech.js"], function() {
            Y || (Y = Speech.newRecorder(), addEvent(Y, "progress", l)), AudioMessagePlayer.detachPlayer(), AudioMessagePlayer.pauseGlobalMedia(), Y.record().then(function() {
                g(q), b(), y(), V = Speech.createVisualization("wave", Y.source, B), V.start();
                var e = B.getBoundingClientRect();
                X = (e.right - e.left) / 3
            })["catch"](function(e) {
                AudioMessagePlayer.resumeGlobalMedia();
                var t = e.name;
                switch (e.name) {
                    case "DevicesNotFoundError":
                    case "NotFoundError":
                        t = "mail_audio_message_device_error";
                        break;
                    case "PermissionDeniedError":
                    case "PermissionDismissedError":
                        t = "mail_audio_message_permission_error";
                        break;
                    case "Unsupported":
                        t = "mail_audio_message_unsupported_error"
                }
                showFastBox(getLang("global_error"), getLang(t)), console.error(e)
            })
        })
    }

    function d() {
        Y && Y.stop(), V && (V.destroy(), V = null)
    }

    function g(e) {
        W.isRecording = !0, cancelStackPush("audio_message_cancel", u.bind(null, e))
    }

    function m() {
        W.isRecording = !1, cancelStackFilter("audio_message_cancel")
    }

    function f() {
        p(), s(Y)
    }

    function p() {
        AudioMessagePlayer.loaded && AudioMessagePlayer.resumeGlobalMedia(), removeEvent(Y, "finish", p), removeEvent(Y, "finish", f), o(), removeClass(x, "im-audio-message_recording"), addClass(x, "im-audio-message_recorded")
    }

    function _() {
        m(), AudioMessagePlayer.loaded && (AudioMessagePlayer.resumeGlobalMedia(), AudioMessagePlayer.detachPlayer()), removeEvent(Y, "finish", p), removeEvent(Y, "finish", f), d(), C()
    }

    function h() {
        Y.isRecording ? (addEvent(Y, "finish", f), removeEvent(Y, "finish", p), d()) : s(Y)
    }

    function v() {
        addEvent(Y, "finish", p), removeEvent(Y, "finish", f), d()
    }

    function b() {
        hideProgress(geByClass1("im-audio-message-send-wrapper", x)), show(j), R.innerHTML = "0:00", addClass(x, "im-audio-message_recording"), removeClass(x, "im-audio-message_recorded")
    }

    function y() {
        show(x), hide(geByClass1("_im_chat_input_parent"))
    }

    function C() {
        removeClass(x, "im-audio-message_recorded"), removeClass(x, "im-audio-message_recording"), hide(x), show(geByClass1("_im_chat_input_parent"))
    }

    function w() {
        U = ge("audiomsg_record"), z = ge("audiomsg_player"), x = geByClass1("im-audio-message-input"), R = geByClass1("audio-msg-track--duration", x), B = geByClass1("audio-msg-track--wave", x), F = geByClass1("im-audio-message--cancel-btn", x), j = geByClass1("_im_audio_send", x), H = geByClass1("audio-msg-track--btn", x), G = geByClass1("im-chat-input--text", geByClass1("im-page--chat-input"));
        var e = geByClass1("im-chat-input--textarea", geByClass1("im-page--chat-input"));
        addClass(e, "_voice_field_wrap"), k()
    }

    function E() {
        T(), U = z = x = R = B = N = F = j = H = null
    }

    function k() {
        addEvent(N, "click", c), addEvent(F, "click", _), addEvent(j, "click", h), addEvent(H, "click", v)
    }

    function T() {
        Y && removeEvent(Y, "progress", l), removeEvent(N, "click", c), removeEvent(F, "click", _), removeEvent(j, "click", h), removeEvent(H, "click", v)
    }

    function S(e, t, n) {
        return {
            cancelRecording: _,
            start: function() {
                c()
            },
            unmount: function() {
                _(), E()
            }
        }
    }

    function I(e, t, n, r) {
        q = t, W = t.get().audio_msg, K = n, (0, L.initFailBack)(), (0, A.getAvailableMicrophones)().then(function(e) {
            var n = e.length > 0;
            n ? (w(), r()) : setCookie("remixvoice", "0", 7), t.set(P.setVoiceMessageAvail.bind(null, n))
        })["catch"](function(e) {
            throw setCookie("remixvoice", "0", 7), e
        });
        var a = (0, M.createMutations)(S),
            i = a.bindMutations;
        return i(e, t, n)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = I;
    var M = n(83),
        P = n(46),
        L = n(22),
        A = n(20),
        O = 300,
        D = browser.msie && intval(browser.version) < 10 ? window.XDomainRequest : window.XMLHttpRequest,
        x = void 0,
        R = void 0,
        B = void 0,
        N = void 0,
        F = void 0,
        j = void 0,
        H = void 0,
        U = void 0,
        G = void 0,
        q = void 0,
        z = void 0,
        V = void 0,
        K = void 0,
        W = void 0,
        Y = !1,
        Q = !1,
        X = 100
}, function(e, t) {
    var n = {}.toString;
    e.exports = function(e) {
        return n.call(e).slice(8, -1)
    }
}, function(e, t, n) {
    var r = n(43),
        a = n(31),
        i = n(99),
        s = n(59),
        o = n(81),
        l = "prototype",
        u = function(e, t, n) {
            var c, d, g, m, f = e & u.F,
                p = e & u.G,
                _ = e & u.S,
                h = e & u.P,
                v = e & u.B,
                b = p ? r : _ ? r[t] || (r[t] = {}) : (r[t] || {})[l],
                y = p ? a : a[t] || (a[t] = {}),
                C = y[l] || (y[l] = {});
            p && (n = t);
            for (c in n) d = !f && b && void 0 !== b[c], g = (d ? b : n)[c], m = v && d ? o(g, r) : h && "function" == typeof g ? o(Function.call, g) : g, b && s(b, c, g, e & u.U), y[c] != g && i(y, c, m), h && C[c] != g && (C[c] = g)
        };
    r.core = a, u.F = 1, u.G = 2, u.S = 4, u.P = 8, u.B = 16, u.W = 32, u.U = 64, u.R = 128, e.exports = u
}, function(e, t, n) {
    var r;
    (function(e, a, i) {
        (function() {
            "use strict";

            function s(e) {
                return "function" == typeof e || "object" == typeof e && null !== e
            }

            function o(e) {
                return "function" == typeof e
            }

            function l(e) {
                W = e
            }

            function u(e) {
                $ = e
            }

            function c() {
                return function() {
                    e.nextTick(p)
                }
            }

            function d() {
                return function() {
                    K(p)
                }
            }

            function g() {
                var e = 0,
                    t = new ee(p),
                    n = document.createTextNode("");
                return t.observe(n, {
                        characterData: !0
                    }),
                    function() {
                        n.data = e = ++e % 2
                    }
            }

            function m() {
                var e = new MessageChannel;
                return e.port1.onmessage = p,
                    function() {
                        e.port2.postMessage(0)
                    }
            }

            function f() {
                return function() {
                    setTimeout(p, 1)
                }
            }

            function p() {
                for (var e = 0; X > e; e += 2) {
                    var t = re[e],
                        n = re[e + 1];
                    t(n), re[e] = void 0, re[e + 1] = void 0
                }
                X = 0
            }

            function _() {
                try {
                    var e = n(11);
                    return K = e.runOnLoop || e.runOnContext, d()
                } catch (t) {
                    return f()
                }
            }

            function h(e, t) {
                var n = this,
                    r = n._state;
                if (r === oe && !e || r === le && !t) return this;
                var a = new this.constructor(b),
                    i = n._result;
                if (r) {
                    var s = arguments[r - 1];
                    $(function() {
                        R(r, a, s, i)
                    })
                } else A(n, a, e, t);
                return a
            }

            function v(e) {
                var t = this;
                if (e && "object" == typeof e && e.constructor === t) return e;
                var n = new t(b);
                return I(n, e), n
            }

            function b() {}

            function y() {
                return new TypeError("You cannot resolve a promise with itself")
            }

            function C() {
                return new TypeError("A promises callback cannot return that same promise.")
            }

            function w(e) {
                try {
                    return e.then
                } catch (t) {
                    return ue.error = t, ue
                }
            }

            function E(e, t, n, r) {
                try {
                    e.call(t, n, r)
                } catch (a) {
                    return a
                }
            }

            function k(e, t, n) {
                $(function(e) {
                    var r = !1,
                        a = E(n, t, function(n) {
                            r || (r = !0, t !== n ? I(e, n) : P(e, n))
                        }, function(t) {
                            r || (r = !0, L(e, t))
                        }, "Settle: " + (e._label || " unknown promise"));
                    !r && a && (r = !0, L(e, a))
                }, e)
            }

            function T(e, t) {
                t._state === oe ? P(e, t._result) : t._state === le ? L(e, t._result) : A(t, void 0, function(t) {
                    I(e, t)
                }, function(t) {
                    L(e, t)
                })
            }

            function S(e, t, n) {
                t.constructor === e.constructor && n === ae && constructor.resolve === ie ? T(e, t) : n === ue ? L(e, ue.error) : void 0 === n ? P(e, t) : o(n) ? k(e, t, n) : P(e, t)
            }

            function I(e, t) {
                e === t ? L(e, y()) : s(t) ? S(e, t, w(t)) : P(e, t)
            }

            function M(e) {
                e._onerror && e._onerror(e._result), O(e)
            }

            function P(e, t) {
                e._state === se && (e._result = t, e._state = oe, 0 !== e._subscribers.length && $(O, e))
            }

            function L(e, t) {
                e._state === se && (e._state = le, e._result = t, $(M, e))
            }

            function A(e, t, n, r) {
                var a = e._subscribers,
                    i = a.length;
                e._onerror = null, a[i] = t, a[i + oe] = n, a[i + le] = r, 0 === i && e._state && $(O, e)
            }

            function O(e) {
                var t = e._subscribers,
                    n = e._state;
                if (0 !== t.length) {
                    for (var r, a, i = e._result, s = 0; s < t.length; s += 3) r = t[s], a = t[s + n], r ? R(n, r, a, i) : a(i);
                    e._subscribers.length = 0
                }
            }

            function D() {
                this.error = null
            }

            function x(e, t) {
                try {
                    return e(t)
                } catch (n) {
                    return ce.error = n, ce
                }
            }

            function R(e, t, n, r) {
                var a, i, s, l, u = o(n);
                if (u) {
                    if (a = x(n, r), a === ce ? (l = !0, i = a.error, a = null) : s = !0, t === a) return void L(t, C())
                } else a = r, s = !0;
                t._state !== se || (u && s ? I(t, a) : l ? L(t, i) : e === oe ? P(t, a) : e === le && L(t, a))
            }

            function B(e, t) {
                try {
                    t(function(t) {
                        I(e, t)
                    }, function(t) {
                        L(e, t)
                    })
                } catch (n) {
                    L(e, n)
                }
            }

            function N(e) {
                return new _e(this, e).promise
            }

            function F(e) {
                function t(e) {
                    I(a, e)
                }

                function n(e) {
                    L(a, e)
                }
                var r = this,
                    a = new r(b);
                if (!Q(e)) return L(a, new TypeError("You must pass an array to race.")), a;
                for (var i = e.length, s = 0; a._state === se && i > s; s++) A(r.resolve(e[s]), void 0, t, n);
                return a
            }

            function j(e) {
                var t = this,
                    n = new t(b);
                return L(n, e), n
            }

            function H() {
                throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
            }

            function U() {
                throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
            }

            function G(e) {
                this._id = fe++, this._state = void 0, this._result = void 0, this._subscribers = [], b !== e && ("function" != typeof e && H(), this instanceof G ? B(this, e) : U())
            }

            function q(e, t) {
                this._instanceConstructor = e, this.promise = new e(b), Array.isArray(t) ? (this._input = t, this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? P(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && P(this.promise, this._result))) : L(this.promise, this._validationError())
            }

            function z() {
                var e;
                if ("undefined" != typeof a) e = a;
                else if ("undefined" != typeof self) e = self;
                else try {
                    e = Function("return this")()
                } catch (t) {
                    throw new Error("polyfill failed because global object is unavailable in this environment")
                }
                var n = e.Promise;
                (!n || "[object Promise]" !== Object.prototype.toString.call(n.resolve()) || n.cast) && (e.Promise = pe)
            }
            var V;
            V = Array.isArray ? Array.isArray : function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            };
            var K, W, Y, Q = V,
                X = 0,
                $ = function(e, t) {
                    re[X] = e, re[X + 1] = t, X += 2, 2 === X && (W ? W(p) : Y())
                },
                J = "undefined" != typeof window ? window : void 0,
                Z = J || {},
                ee = Z.MutationObserver || Z.WebKitMutationObserver,
                te = "undefined" != typeof e && "[object process]" === {}.toString.call(e),
                ne = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
                re = new Array(1e3);
            Y = te ? c() : ee ? g() : ne ? m() : void 0 === J ? _() : f();
            var ae = h,
                ie = v,
                se = void 0,
                oe = 1,
                le = 2,
                ue = new D,
                ce = new D,
                de = N,
                ge = F,
                me = j,
                fe = 0,
                pe = G;
            G.all = de, G.race = ge, G.resolve = ie, G.reject = me, G._setScheduler = l, G._setAsap = u, G._asap = $, G.prototype = {
                constructor: G,
                then: ae,
                "catch": function(e) {
                    return this.then(null, e)
                }
            };
            var _e = q;
            q.prototype._validationError = function() {
                return new Error("Array Methods must be provided an Array")
            }, q.prototype._enumerate = function() {
                for (var e = this.length, t = this._input, n = 0; this._state === se && e > n; n++) this._eachEntry(t[n], n)
            }, q.prototype._eachEntry = function(e, t) {
                var n = this._instanceConstructor,
                    r = n.resolve;
                if (r === ie) {
                    var a = w(e);
                    if (a === ae && e._state !== se) this._settledAt(e._state, t, e._result);
                    else if ("function" != typeof a) this._remaining--, this._result[t] = e;
                    else if (n === pe) {
                        var i = new n(b);
                        S(i, e, a), this._willSettleAt(i, t)
                    } else this._willSettleAt(new n(function(t) {
                        t(e)
                    }), t)
                } else this._willSettleAt(r(e), t)
            }, q.prototype._settledAt = function(e, t, n) {
                var r = this.promise;
                r._state === se && (this._remaining--, e === le ? L(r, n) : this._result[t] = n), 0 === this._remaining && P(r, this._result)
            }, q.prototype._willSettleAt = function(e, t) {
                var n = this;
                A(e, void 0, function(e) {
                    n._settledAt(oe, t, e)
                }, function(e) {
                    n._settledAt(le, t, e)
                })
            };
            var he = z,
                ve = {
                    Promise: pe,
                    polyfill: he
                };
            n(97).amd ? (r = function() {
                return ve
            }.call(t, n, t, i), !(void 0 !== r && (i.exports = r))) : "undefined" != typeof i && i.exports ? i.exports = ve : "undefined" != typeof this && (this.ES6Promise = ve), he()
        }).call(this)
    }).call(t, n(62), function() {
        return this
    }(), n(10)(e))
}, function(e, t) {
    "use strict";

    function n(e) {
        return "im_store_" + e
    }

    function r(e) {
        return ls.get(n(e)) || {}
    }

    function a(e, t, r) {
        if (ls.checkVersion()) {
            var a = JSON.stringify(t);
            rand(0, 1e5) <= 1 && statlogsValueEvent("im_local_store_size", a.length), r(n(e), a)
        }
    }

    function i(e, t, n) {
        return t === d ? e[t] || [] : t === g ? e[t] && e[t][n] : e[t] ? extend(!0, {}, e[t][n]) : null
    }

    function s(e, t, n) {
        switch (e[t] || (e[t] = {}), t) {
            case d:
                var r = n;
                r && r.length > 0 ? e[t] = r : delete e[t];
                break;
            case g:
                var a = c(n, 2),
                    i = a[0],
                    s = a[1];
                s ? e[t][i] = +s : delete e[t][i]
        }
        return e
    }

    function o(e, t) {
        for (var n = ["fwd", "draft", "bind_attach"], i = r(e), s = !1, o = n.length; o--;) n[o] in i && (delete i[n[o]], s = !0);
        s && a(e, i, t)
    }

    function l(e, t, r) {
        r.key === n(e) && (t.db = JSON.parse(r.newValue), t.checkTime = Date.now())
    }

    function u(e) {
        var t = debounce(function(e, t) {
            localStorage.setItem(e, t)
        }, 300);
        ls.checkVersion() && o(e, t);
        var n = {
                db: r(e),
                checkTime: Date.now()
            },
            u = l.bind(null, e, n);
        return window.addEventListener("storage", u, !1), {
            select: function(t, a) {
                return Date.now() - n.checkTime > 1e3 && (n.db = r(e)), i(n.db, t, a)
            },
            selectByKey: function(t) {
                return Date.now() - n.checkTime > 1e3 && (n.db = r(e)), n.db[t]
            },
            update: function(r, i) {
                var o = s(n.db, r, i);
                return n.db = o, n.checkTime = Date.now(), a(e, o, t)
            },
            updateByKey: function(r, i) {
                return n.db[r] = i, n.checkTime = Date.now(), a(e, n.db, t)
            },
            unmount: function() {
                window.removeEventListener("storage", u, !1)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var c = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && o["return"] && o["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.deleteOldStoredFormat = o, t.mount = u;
    var d = t.RECENT_SEARCH_OP = "recent_search",
        g = t.PIN_HIDDEN_ID_OP = "pin_hide"
}, function(e, t) {
    "use strict";

    function n(e) {
        l = l.reduce(function(t, n) {
            var r = o(n, 2),
                a = r[0],
                i = r[1],
                s = i(e);
            return s ? t : t.concat([
                [a, i]
            ])
        }, [])
    }

    function r(e, t) {
        c === !1 && (c = !0, document.body.addEventListener("click", n, !0)), l = l.concat([
            [e, t]
        ])
    }

    function a(e) {
        l = l.filter(function(t) {
            var n = o(t, 1),
                r = n[0];
            return r !== e
        }), 0 === u && (document.body.removeEventListener("click", n, !0), c = !1)
    }

    function i(e, t) {
        l = l.map(function(n) {
            var r = o(n, 2),
                a = r[0],
                i = r[1];
            return a === e ? [e, t] : [a, i]
        })
    }

    function s(e, t) {
        return 0 === t.length ? function(t) {
            return e(t), !0
        } : function(n) {
            var r = t.reduce(function(e, t) {
                return e && !domClosest(t, n.target)
            }, !0);
            return r && e(n), r
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && o["return"] && o["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t["default"] = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        return u++, {
            stop: function() {
                u--, a(e)
            },
            replaceOrAdd: function(n) {
                var a = l.filter(function(t) {
                        var n = o(t, 1),
                            r = n[0];
                        return e === r
                    }),
                    u = s(n, t);
                a.length > 0 ? i(e, u) : r(e, u)
            }
        }
    };
    var l = [],
        u = 0,
        c = !1
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function a(e, t) {
        return bodyNode[e] || document.documentElement[e]
    }

    function i(e, t, n) {
        "scrollTop" === e && window.scrollTo(0, t)
    }

    function s(e, t) {
        return t.noScroll ? new c(e) : t.nativeScroll ? new l(e, t) : new u(e, t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getNativeOption = a, t.setNativeOption = i, t.createScroll = s;
    var o = n(83),
        l = function() {
            function e(t, n) {
                var a = this;
                r(this, e), this.el = t, this.opts = n, this.module = (0, o.createModule)({
                    handlers: function(e, t) {
                        e(window, "scroll", a.onScroll.bind(a)), e(window, "resize", a.resize.bind(a))
                    }
                }), this.innerHeight = window.innerHeight, this.prevScroll = this.scrollTop()
            }
            return e.prototype.update = function() {}, e.prototype.resize = function() {
                this.innerHeight = window.innerHeight
            }, e.prototype.scrollTop = function(e) {
                return "undefined" == typeof e ? a("scrollTop", this.el) : void i("scrollTop", e, this.el)
            }, e.prototype.contHeight = function() {
                return a("scrollHeight")
            }, e.prototype.smoothScroll = function(e) {
                scrollToY(e + this.scrollTop(), 300)
            }, e.prototype.getContainer = function() {
                return this.el
            }, e.prototype.scrollBottom = function(e) {
                if ("undefined" == typeof e) return this.contHeight() - this.scrollTop() - this.getScrollHeight();
                var t = this.contHeight() - e - this.getScrollHeight();
                this.scrollTop(t)
            }, e.prototype.scrollBottomFixSave = function(e) {
                this.scrollBottom(e)
            }, e.prototype.onScroll = function(e) {
                var t = this.scrollTop(),
                    n = t - this.prevScroll,
                    r = this.contHeight();
                this.opts.onScroll && this.opts.onScroll(-n, this), this.opts.scrollChange && this.opts.scrollChange(t), this.opts.more && r - t < 2 * this.innerHeight && this.opts.more(this), this.prevScroll = t
            }, e.prototype.getScrollHeight = function() {
                return this.innerHeight
            }, e.prototype.destroy = function() {
                (0, o.destroyModule)(this.module)
            }, e
        }(),
        u = function() {
            function e(t, n) {
                var a = this;
                r(this, e), this.prevTop = 0, this.scroll = new uiScroll(t, {
                    hidden: !0,
                    shadows: n.shadows,
                    stopScrollPropagation: !1,
                    theme: n.scrollTheme,
                    onmore: function() {
                        return n.more && n.more(a)
                    },
                    onscroll: function(e) {
                        var t = a.scrollTop(),
                            r = a.prevTop - t;
                        a.prevTop = t, n.scrollChange && n.scrollChange(t), n.onScroll && n.onScroll(r, a)
                    }
                })
            }
            return e.prototype.update = function() {
                this.scroll.update("sync")
            }, e.prototype.scrollTop = function(e) {
                return "undefined" != typeof e ? this.scroll.scrollTop(e) : this.scroll.data.scrollTop
            }, e.prototype.getContainer = function() {
                return this.scroll.content
            }, e.prototype.contHeight = function() {
                return this.scroll.data.scrollHeight
            }, e.prototype.smoothScroll = function(e) {
                this.scroll.scrollTop(this.scrollTop() + e, 300)
            }, e.prototype.scrollBottom = function(e) {
                return "undefined" != typeof e ? this.scroll.scrollBottom(e) : this.scroll.data.scrollBottom
            }, e.prototype.scrollBottomFixSave = function(e) {
                var t = this,
                    n = function() {
                        Date.now() - r < 500 && t.scroll && t.scrollBottom(e)
                    },
                    r = Date.now();
                this.scroll.emitter.addOnceListener("resize", n), this.scrollBottom(e)
            }, e.prototype.getScrollHeight = function() {
                return this.scroll.data.viewportHeight
            }, e.prototype.destroy = function() {
                this.scroll.destroy()
            }, e
        }(),
        c = function() {
            function e(t, n) {
                r(this, e), this.el = t
            }
            return e.prototype.update = function() {}, e.prototype.getContainer = function() {
                return this.el
            }, e.prototype.scrollTop = function(e) {
                return 0
            }, e.prototype.contHeight = function() {
                return 0
            }, e.prototype.smoothScroll = function(e) {}, e.prototype.scrollBottom = function(e) {
                return 0
            }, e.prototype.scrollBottomFixSave = function(e) {}, e.prototype.getScrollHeight = function() {
                return 0
            }, e.prototype.destroy = function() {}, e
        }()
}, function(e, t, n) {
    var r = n(21),
        a = n(116).set;
    e.exports = function(e, t, n) {
        var i, s = t.constructor;
        return s !== n && "function" == typeof s && (i = s.prototype) !== n.prototype && r(i) && a && a(e, i), e
    }
}, function(e, t) {
    var n = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return n.call(e, t)
    }
}, function(e, t, n) {
    var r = n(65),
        a = n(17)("iterator"),
        i = n(18);
    e.exports = n(31).getIteratorMethod = function(e) {
        return void 0 != e ? e[a] || e["@@iterator"] || i[r(e)] : void 0
    }
}, function(e, t, n) {
    var r = n(21),
        a = n(86),
        i = function(e, t) {
            if (a(e), !r(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
        };
    e.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, r) {
            try {
                r = n(81)(Function.call, n(77).f(Object.prototype, "__proto__").set, 2), r(e, []), t = !(e instanceof Array)
            } catch (a) {
                t = !0
            }
            return function(e, n) {
                return i(e, n), t ? e.__proto__ = n : r(e, n), e
            }
        }({}, !1) : void 0),
        check: i
    }
}, function(e, t, n) {
    "use strict";

    function r(e, t, n, r, a) {
        if ("Script error." !== e) {
            var i = a ? a.stack || a.message : null;
            s("unhandled_error", i ? {
                err: e,
                stack: i
            } : {
                err: e
            })
        }
        g && g.apply(this, arguments)
    }

    function a(e) {
        e.preventDefault()
    }

    function i() {
        return !!window.imwl
    }

    function s(e, t) {
        i() && (console.error(e, t), console.trace(), (0, d.retryFn)(c.post, 3, function() {
            return 2
        })("al_im.php", {
            act: "a_weird_log",
            kind: e,
            data: JSON.stringify(extend({
                errIdx: m++,
                ua: navigator.userAgent,
                noSh: 1
            }, t))
        }))
    }

    function o(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return s(e, extend({
            err: t && t.message || t
        }, n)), Promise.reject(t)
    }

    function l() {
        g = window.onerror, window.onerror = r, window.addEventListener("unhandledrejection", a)
    }

    function u() {
        window.onerror = g, g = void 0, window.removeEventListener("unhandledrejection", a)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.isWeirdLogging = i, t.imWeirdLog = s, t.imWeirdCatch = o, t.startLoggingAllUnhandled = l, t.stopLoggingAllUnhandled = u;
    var c = n(85),
        d = n(3),
        g = void 0,
        m = 1
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e) {
        var t = e.get().tabbedPeers.map(function(t) {
            return e.get().tabs[t.peer] || e.get().mapped_index && e.get().mapped_index[t.peer]
        }).filter(function(e) {
            return e
        }).filter(function(e) {
            return !e.deletedDialog
        }).map(function(e) {
            var t = e.peerId;
            return {
                type: "peer",
                peer: t
            }
        });
        return t.length > 0 && (t = [{
            type: "sep"
        }].concat(t)), t
    }

    function i(e, t) {
        if ("sep" === t.type) return getTemplate("im_right_menu_sep", {});
        var n = (0, p.getBaseLink)(e) + "?sel=" + t.peer + "&tab=" + e.get().active_tab,
            r = (0, p.getBareTab)(t.peer, e),
            a = r.tab;
        return a = getTemplate("im_right_menu_ct", {
            name: a,
            count: r.unread > 0 ? r.unread : ""
        }), getTemplate("im_right_menu_tpl", {
            href: n,
            label: a,
            peer: t.peer,
            attrs: 'title="' + stripHTML(r.tab) + '"',
            cls: r.unread > 0 ? "im-right-menu--unread" : ""
        })
    }

    function s(e, t, n, r) {
        var a = gpeByClass("_im_peer_tab", r),
            i = intval(domData(a, "list-id")),
            s = e.get().tabbedPeers.filter(function(e) {
                var t = e.peer;
                return t !== i
            });
        return e.set(_.updateTabbedPeers.bind(null, s, !0)).then(function() {
            if (o(t, e), i === e.get().peer) e.get().longpoll.push([(0, h.resetPeer)()]);
            else if (0 !== e.get().peer) {
                var n = gpeByClass("_im_right_menu", r);
                uiRightMenu.hideSliding(n)
            }
        }), cancelEvent(n), !1
    }

    function o(e, t) {
        return e.pipeReplace(Promise.resolve(a(t)))
    }

    function l(e, t) {
        geByClass("_im_peer_tab", e).forEach(function(e) {
            var n = q2ajx(attr(e, "href").split("?")[1]);
            n.tab !== t.get().active_tab && attr(e, "href", (0, p.getBaseLink)(t) + "?sel=" + n.sel + "&tab=" + t.get().active_tab)
        })
    }

    function u(e, t, n, r) {
        return {
            updateMenu: function(t) {
                l(e, t);
                var r = gpeByClass("_im_right_menu", e);
                o(n, t).then(function() {
                    var e = void 0;
                    e = t.get().peer ? ge("ui_rmenu_peer_" + t.get().peer) : ge("ui_rmenu_" + t.get().active_tab), e && uiRightMenu.switchMenu(e, !0), uiRightMenu.hideProgress(r)
                })
            },
            updateName: function(e, t) {
                var n = ge("ui_rmenu_peer_" + e);
                if (n) {
                    var r = geByClass1("_im_r_tx", n),
                        a = t.get().tabs[e].tab;
                    val(r, a)
                }
            },
            updateCounter: function(e, t) {
                var n = ge("ui_rmenu_peer_" + t);
                if (n) {
                    var r = geByClass1("_im_r_ct", n),
                        a = e.get().tabs[t].unread;
                    val(r, a > 0 ? a : ""), toggleClass(n, "im-right-menu--unread", a > 0)
                }
            },
            unmount: function() {
                (0, v.destroyModule)(r), n.unmount()
            }
        }
    }

    function c(e, t, n) {
        1 === n.which && (e.get().peer && e.get().longpoll.push([(0, h.resetPeer)()]), e.get().longpoll.push([(0, h.changeTab)(t)]), cancelEvent(n))
    }

    function d(e, t, n) {
        var r = (0, g.mount)(e, (0, f["default"])({
                limit: 50,
                offset: 0,
                noScroll: !0,
                elements: a(t)
            }), function() {
                return {
                    idFn: function(e) {
                        return e.peer || "000"
                    },
                    renderFn: i.bind(null, t)
                }
            }),
            o = s.bind(null, t, r),
            l = (0, v.createModule)({
                handlers: function(n, r) {
                    r(e, "click", "_im_r_cl", o), r(e, "click", "_im_peer_tab", function(e, n) {
                        if (!checkEvent(e)) {
                            var r = intval(domData(n, "list-id"));
                            t.get().longpoll.push([(0, h.changePeer)(r, !1, !0, !0)]), cancelEvent(e)
                        }
                    }), b.FOLDERS.forEach(function(r) {
                        n(geByClass1("_ui_item_" + r, e.parentNode), "mousedown", c.bind(null, t, r))
                    })
                }
            });
        return u(e, t, r, l)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = d;
    var g = n(49),
        m = n(78),
        f = r(m),
        p = n(20),
        _ = n(46),
        h = n(132),
        v = n(83),
        b = n(5)
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t) {
        return t.queues[e].currEv = !1, Promise.resolve(t)
    }

    function i(e, t) {
        var n = t.queues[e].currEv;
        return n ? (t.queues[e].errored.push(n), a(e, t)) : Promise.resolve(t)
    }

    function s(e) {
        for (var t = {}, n = Object.keys(e.queues), r = n.length, a = 0; r > a; a++) {
            var i = n[a],
                s = e.queues[i];
            (s.currEv || s.evs.length || s.errored.length) && (t[i] = s)
        }
        return {
            queues: t,
            opts: e.opts
        }
    }

    function o(e, t, n) {
        return n.queues[e] ? (t ? n.queues[e].errored = [] : n.queues[e].errored = n.queues[e].errored.concat(n.queues[e].evs), n.queues[e].evs = [], a(e, n)) : Promise.resolve(n)
    }

    function l(e, t) {
        var n = g(e, t.get()).errored;
        return n.length > 0 ? n[n.length - 1] : !1
    }

    function u(e, t, n, r) {
        var s = r.get().queues[e];
        if (s && !s.currEv && s.evs.length > 0 && !s.pause) {
            var o = u.bind(null, e, t, n, r),
                c = s.evs.shift();
            s.currEv = c, t(e, c).then(function() {
                r.get().opts.waitCommit || r.set(a.bind(null, e))
            }).then(o)["catch"](function(t) {
                return r.set(i.bind(null, e)).then(function() {
                    n(e, l(e, r), t)
                }).then(o)
            })
        }
    }

    function c(e, t, n) {
        var r = n.queues[e];
        return r.errored.filter(function(e) {
            return e.mess.messageId === t
        }).forEach(function(e) {
            e.failed = !1, r.evs.push(e)
        }), r.errored = r.errored.filter(function(e) {
            return e.mess.messageId !== t
        }), Promise.resolve(n)
    }

    function d() {
        return {
            evs: [],
            pause: !1,
            errored: [],
            currEv: !1
        }
    }

    function g(e, t) {
        return t.queues[e] || (t.queues[e] = d()), t.queues[e]
    }

    function m(e, t, n) {
        var r = g(e, n);
        return r.pause = t, Promise.resolve(n)
    }

    function f(e, t, n) {
        t.ts = Date.now();
        var r = g(e, n);
        return r.evs.push(t), Promise.resolve(n)
    }

    function p(e) {
        var t = Object.keys(e.get().queues);
        t.forEach(function(t) {
            e.set(i.bind(null, t)), e.set(o.bind(null, t, !1))
        })
    }

    function _(e, t, n) {
        var r = (0, v["default"])({
            queues: {},
            debug: n && n.debug,
            opts: extend({}, n)
        }, n);
        return n && n.store ? (r.setState(s(r.get())), p(r)) : p(r), {
            pushMessage: function(n, a) {
                return r.set(f.bind(null, n, a)).then(function(r) {
                    u(n, e, t, r)
                })
            },
            resend: function(n, a) {
                return r.set(c.bind(null, n, a)).then(function(i) {
                    var s = r.get().queues[n].evs.filter(function(e) {
                        return e.mess.messageId === a
                    })[0];
                    return u(n, e, t, r), s
                })
            },
            reset: function(n) {
                return r.set(o.bind(null, n, !0)).then(function(r) {
                    u(n, e, t, r)
                })
            },
            setErrored: function(e, t) {
                return r.set(function(n) {
                    var r = g(e, n);
                    return r.errored = t, Promise.resolve(n)
                })
            },
            pause: function(e) {
                r.set(m.bind(null, e, !0))
            },
            isPaused: function(e) {
                return !!g(e, r.get()).pause
            },
            complete: function(n, i) {
                var s = r.get();
                s.queues[n].currEv && s.queues[n].currEv.rid === i && r.set(a.bind(null, n)).then(function() {
                    u(n, e, t, r)
                })
            },
            resume: function(n) {
                r.set(m.bind(null, n, !1)).then((0, b.pause)(.1)).then(function() {
                    u(n, e, t, r)
                })
            },
            inspectQueue: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                if (!r.get().queues[e]) return [];
                var n = r.get().queues[e],
                    a = t && n.currEv ? [n.currEv] : [];
                return a.concat(n.evs.slice()).concat(n.errored.slice().map(function(e) {
                    return extend({}, e, {
                        failed: !0
                    })
                })).sort(function(e, t) {
                    return e.ts - t.ts
                })
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.initQueue = _;
    var h = n(78),
        v = r(h),
        b = n(3)
}, function(e, t, n) {
    n(39), n(15), n(29), n(84), e.exports = n(31).Map
}, function(e, t, n) {
    "use strict";

    function r(e, t) {
        if ((0, h.unpackStore)(e).searchShown) return !1;
        var n = (0, h.getTab)(e, t),
            r = n && (0, h.parserMessage)(n.pinned);
        return r ? n.pinHideId != r.chat_local_id : !1
    }

    function a(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
            a = (0, h.getTab)(e, t),
            i = a && (0, h.parserMessage)(a.pinned);
        a && i && (a.pinHideId = i.chat_local_id, cur.imDb.update(b.PIN_HIDDEN_ID_OP, [a.peerId, a.pinHideId]), l(n, t, e), re(geByClass1("_im_pinned_tt")), r && window.Notifier && Notifier.lcSend("pin_hide", {
            hide: 1,
            peer: t
        }), statlogsValueEvent("im_pinned_messages", "hide"))
    }

    function i(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
            a = (0, h.getTab)(e, t);
        a && (delete a.pinHideId, cur.imDb.update(b.PIN_HIDDEN_ID_OP, [a.peerId, void 0]), l(n, t, e), r && window.Notifier && Notifier.lcSend("pin_hide", {
            hide: 0,
            peer: t
        }), statlogsValueEvent("im_pinned_messages", "show"))
    }

    function s(e, t, n) {
        var r = l.bind(null, n, t),
            a = (0, _.showUnpinDialog)(function() {
                a.hideProgress(), a.hide(), e.set(m.unpinMessageOptimistic.bind(null, t)).then(r).then(function(e) {
                    return e.set(m.unpinMessage.bind(null, t))
                }).then(r)
            })
    }

    function o(e, t, n) {
        var r = e.get(),
            i = r.peer,
            s = (0, h.parserMessage)((0, h.getTab)(e, i).pinned);
        if (n.target.classList.contains(y)) s && a(e, i, t);
        else if ("A" !== n.target.tagName) {
            var o = s && s.messageId;
            if (o && !(0, _.isAlreadyDeleted)(e, i, o)) {
                var l = e.get(),
                    u = (0, h.getMessage)(e, i, o);
                u ? (e.setState({
                    msgid: o
                }), (0, v.updateLocation)({
                    msgid: o
                }), t().focusOnMessage()) : l.longpoll.push([(0, f.changePeer)(i, o)])
            } else(0, _.showPinnedBox)(e, t, i, p.mount, n);
            statlogsValueEvent("im_pinned_messages", "open")
        }
    }

    function l(e, t, n) {
        return e().updateChatTopic(t, n), (0, m.setActions)(n.get()), e().updateActions(n), n
    }

    function u(e) {
        showTooltip(e.target, {
            text: getLang("mail_hide_unpin_hover"),
            black: 1,
            needLeft: 1,
            shift: [8, 4],
            forcetoup: !0,
            className: "_im_pinned_tt",
            appendEl: bodyNode
        })
    }

    function c(e) {
        return {
            unmount: function() {
                (0, g.destroyModule)(e)
            }
        }
    }

    function d(e, t, n) {
        var r = (0, g.createMutations)(c),
            a = r.bindMutations,
            i = o.bind(null, t, n),
            s = u.bind(null),
            l = (0, g.createModule)({
                handlers: function(t, n) {
                    n(e, "click", C, i), n(e, "mouseover", y, s)
                }
            });
        return a(l)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.isPinnedMessageVisibleInTab = r, t.pinnedMessageHide = a, t.pinnedMessageUnHide = i, t.pinnedMessageUnpin = s, t.mount = d;
    var g = n(83),
        m = n(46),
        f = n(132),
        p = n(80),
        _ = n(20),
        h = n(139),
        v = n(91),
        b = n(110),
        y = "_im_pin_hide",
        C = "_im_pinned_message"
}, function(e, t) {
    t.f = {}.propertyIsEnumerable
}, function(e, t, n) {
    var r = n(107);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == r(e) ? e.split("") : Object(e)
    }
}, function(e, t, n) {
    var r = n(21),
        a = n(43).document,
        i = r(a) && r(a.createElement);
    e.exports = function(e) {
        return i ? a.createElement(e) : {}
    }
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            value: t,
            done: !!e
        }
    }
}, function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function a(e, t, n, r) {
        if (!e.loading && !e.all) {
            var a = n.scrollTop + window.innerHeight - n.scrollHeight;
            if (a > -300) {
                var i = geByClass1("_im_peer_history", t.bodyNode);
                e.loading = !0, (0, h.wrapLoading)(i)((0, _.loadSpam)(e.offset, r.get().gid).then(function(t) {
                    var n = p(t, 4),
                        a = (n[0], n[1]),
                        s = (n[2], n[3]);
                    e.all = s.all, e.offset = s.offset, e.all ? addClass(i, "im-important_all") : e.loading = !1, r.set(_.mergeTabs.bind(null, (0, h.tabFromIds)(s.msgs, s.hash)));
                    var o = ce("div");
                    o.innerHTML = a, i.appendChild(o), (0, h.ensureDomHasActions)(i)
                }), "bottom")
            }
        }
    }

    function i() {
        return '<button aria-label="' + getLang("mail_deselect_all") + '" type="button" class="im-deselect ' + h.DESELECT_ALL_CLASS + '"></button>'
    }

    function s(e, t) {
        var n = t.get().selectedMessages,
            r = geByClass1("_im_spam_box", e.bodyNode),
            a = geByClass1("ui_tab_sel", e.bodyNode);
        if (n.length > 0) {
            var s = getLang("mail_selected", n.length);
            s = s.replace("{count}", n.length), val(a, s + i())
        } else val(a, getLang("mail_spam"));
        0 === n.length ? removeClass(r, "im-important-box_with-sel") : (addClass(r, "im-important-box_with-sel"), val(geByClass1(E), getLang("mail_im_mark_notspam", n.length)), val(geByClass1(k), getLang("mail_im_mark_delspam", n.length)))
    }

    function o(e, t, n) {
        var r = e.get().selectedMessages;
        e.set(_.cleanSelected).then(n.cleanSelection.bind(null, r)).then(function(n) {
            return s(t, e)
        })
    }

    function l(e, t, n, r) {
        var a = gpeByClass("_im_mess", r, t);
        if (a) {
            var i = intval(domData(a, "msgid"));
            a && ((0, _.removeMessageSend)([i], 0, e.get().tabs[0].hash, "undel", e.get().gid), (0, h.restoreMessage)(i, 0, t))
        }
    }

    function u(e, t, n) {
        var r = e.get().selectedMessages;
        (0, _.removeMessageSend)(r, 0, e.get().tabs[0].hash, "delete", e.get().gid), (0, h.removeMessagesWithRestore)(r, 0, "delete", t), o(e, t, n)
    }

    function c(e, t, n) {
        var r = e.get().selectedMessages;
        (0, _.removeMessageSend)(r, 0, e.get().tabs[0].hash, "nospam", e.get().gid), r.map(function(e) {
            return geByClass1("_im_mess_" + e)
        }).filter(function(e) {
            return e
        }).forEach(function(e) {
            var t = intval(domData(e, "peer")),
                n = intval(domData(e, "msgid"));
            val(e, (0, h.renderGoTo)(t, n)), addClass(e, "im-mess_light")
        }), o(e, t, n)
    }

    function d(e, t, n, r, a) {
        var i = gpeByClass("_im_mess", a, t.bodyNode),
            s = intval(domData(i, "peer")),
            o = intval(domData(i, "msgid"));
        return t.hide(), n().unmount(), e.get().longpoll.push([(0, w.changePeer)(s, o)]), stopEvent(r), cancelEvent(r), !1
    }

    function g(e, t, n, r) {
        var a = showFastBox({
            title: getLang("mail_deleteall1"),
            dark: 1,
            bodyStyle: "padding: 20px; line-height: 160%;"
        }, getLang("mail_delete_all_spam"), getLang("mail_delete"), function() {
            (0, _.flushSpam)(e, r).then(function(e) {
                var t = p(e, 2),
                    n = (t[0], t[1]);
                showDoneBox(n)
            }), a.hide(), t.hide(), n().unmount()
        }, getLang("mail_close"), function() {
            return a.hide()
        })
    }

    function m(e, t) {
        return {
            unmount: function() {
                t.unmount(), (0, v.destroyModule)(e)
            }
        }
    }

    function f(e, t, n) {
        var r = ge("box_layer_wrap"),
            i = (0, v.createMutations)(m),
            f = i.callMutations,
            p = i.bindMutations,
            _ = (0, C["default"])({
                peer: 0,
                oCache: {},
                tabs: (0, h.tabFromIds)(n.msgs, n.hash),
                gid: t.get().gid
            }),
            y = a.bind(null, {
                all: n.all,
                loading: !1,
                offset: n.offset
            }, e, r, _),
            w = l.bind(null, _, e.bodyNode),
            T = d.bind(null, t, e, f),
            S = g.bind(null, n.hash, e, f, t.get().gid),
            I = (0, b.mount)(e.bodyNode, _, function(t) {
                return {
                    changedMessageSelection: s.bind(null, e)
                }
            }),
            M = u.bind(null, _, e.bodyNode, I),
            P = c.bind(null, _, e.bodyNode, I),
            L = o.bind(null, _, e, I);
        (0, h.ensureDomHasActions)(e.bodyNode);
        var A = (0, v.createModule)({
            handlers: function(t, n) {
                t(r, "scroll", y), t(geByClass1(k, e.bodyNode), "click", M), t(geByClass1(E, e.bodyNode), "click", P), t(geByClass1("_im_spam_flush", e.bodyNode), "click", S), n(e.bodyNode, "click", "_im_mess_restore", w), n(e.bodyNode, "click", "_im_go_to", T), n(e.bodyNode, "click", h.DESELECT_ALL_CLASS, L)
            }
        });
        return p(A, I)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var p = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && o["return"] && o["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.mount = f;
    var _ = n(46),
        h = n(20),
        v = n(83),
        b = n(9),
        y = n(78),
        C = r(y),
        w = n(132),
        E = "_im_spam_not_spam",
        k = "_im_spam_spam"
}, function(e, t) {
    var n = 0,
        r = Math.random();
    e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36))
    }
}, function(e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.screenfull = function() {
        var e = "undefined" != typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
            t = function() {
                for (var e, t, n = [
                        ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                        ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                        ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                        ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                        ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
                    ], r = 0, a = n.length, i = {}; a > r; r++)
                    if (e = n[r], e && e[1] in document) {
                        for (r = 0, t = e.length; t > r; r++) i[n[0][r]] = e[r];
                        return i
                    }
                return !1
            }(),
            n = {
                request: function r(n) {
                    var r = t.requestFullscreen;
                    n = n || document.documentElement, /5\.1[\.\d]* Safari/.test(navigator.userAgent) ? n[r]() : n[r](e && Element.ALLOW_KEYBOARD_INPUT)
                },
                exit: function() {
                    document[t.exitFullscreen]()
                },
                toggle: function(e) {
                    this.isFullscreen ? this.exit() : this.request(e)
                },
                raw: t
            };
        return t ? (Object.defineProperties(n, {
            isFullscreen: {
                get: function() {
                    return Boolean(document[t.fullscreenElement])
                }
            },
            element: {
                enumerable: !0,
                get: function() {
                    return document[t.fullscreenElement]
                }
            },
            enabled: {
                enumerable: !0,
                get: function() {
                    return Boolean(document[t.fullscreenEnabled])
                }
            }
        }), n) : !1
    }()
}, function(e, t, n) {
    var r = n(86);
    e.exports = function(e, t, n, a) {
        try {
            return a ? t(r(n)[0], n[1]) : t(n)
        } catch (i) {
            var s = e["return"];
            throw void 0 !== s && r(s.call(e)), i
        }
    }
}, function(e, t, n) {
    var r = n(114),
        a = n(35),
        i = n(16)(!1),
        s = n(13)("IE_PROTO");
    e.exports = function(e, t) {
        var n, o = a(e),
            l = 0,
            u = [];
        for (n in o) n != s && r(o, n) && u.push(n);
        for (; t.length > l;) r(o, n = t[l++]) && (~i(u, n) || u.push(n));
        return u
    }
}, function(e, t) {
    e.exports = !1
}, function(e, t, n) {
    "use strict";

    function r(e) {
        var t = D(e, 2),
            n = t[1];
        return {
            type: B,
            localId: n
        }
    }

    function a(e) {
        var t = D(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: F,
            messageId: n,
            mask: r,
            peerId: a
        }
    }

    function i(e) {
        var t = D(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: N,
            messageId: n,
            flags: r,
            peerId: a
        }
    }

    function s(e) {
        var t = D(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: j,
            messageId: n,
            flags: r,
            peerId: a
        }
    }

    function o(e) {
        var t = D(e, 11),
            n = t[1],
            r = t[2],
            a = t[3],
            i = t[4],
            s = t[5],
            o = t[6],
            l = t[7],
            u = t[8],
            c = t[9],
            d = t[10],
            g = extend(o, l || void 0);
        return {
            type: H,
            messageId: intval(n),
            flags: intval(r),
            peerId: intval(a),
            date: intval(i),
            attaches: (0, R.convertKludgesToAttaches)(g, n),
            subject: o.title || "",
            text: s,
            kludges: g,
            randomId: intval(u),
            userId: (0, x.isChatPeer)(a) ? intval(g.from) : intval(a),
            update_time: d,
            chat_local_id: c
        }
    }

    function l(e) {
        var t = o(e);
        return t.type = ue, t
    }

    function u(e) {
        return extend({}, e, {
            type: ue
        })
    }

    function c(e) {
        var t = D(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: U,
            peerId: n,
            upToId: r,
            unread: a
        }
    }

    function d(e) {
        var t = D(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: G,
            peerId: n,
            upToId: r,
            unread: a
        }
    }

    function g(e) {
        var t = D(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: q,
            userId: -n,
            platform: r,
            lastSeenTs: a
        }
    }

    function m(e) {
        var t = D(e, 4),
            n = t[1],
            r = t[2],
            a = t[3];
        return {
            type: z,
            userId: -n,
            reason: r,
            lastSeenTs: a
        }
    }

    function f(e) {
        var t = D(e, 4),
            n = t[1],
            r = t[2],
            a = t[3],
            i = void 0 === a ? !1 : a;
        return {
            type: $,
            peerId: n,
            mask: r,
            local: i
        }
    }

    function p(e) {
        var t = D(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: J,
            peerId: n,
            mask: r
        }
    }

    function _(e) {
        var t = D(e, 4),
            n = t[1],
            r = t[2],
            a = t[3],
            i = void 0 === a ? !1 : a;
        return {
            type: Z,
            peerId: n,
            mask: r,
            local: i
        }
    }

    function h(e) {
        var t = D(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: le,
            peerId: n,
            localId: r
        }
    }

    function v(e) {
        var t = D(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: V,
            chatId: n,
            self: r
        }
    }

    function b(e) {
        var t = D(e, 2),
            n = t[1];
        return {
            type: K,
            userId: n,
            peerId: n
        }
    }

    function y(e) {
        var t = D(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: K,
            userId: n,
            peerId: r + 2e9
        }
    }

    function C(e) {
        var t = D(e, 3),
            n = t[1],
            r = t[2];
        return {
            type: W,
            userId: n,
            callId: r
        }
    }

    function w(e) {
        var t = D(e, 2),
            n = t[1];
        return {
            type: Y,
            count: n
        }
    }

    function E(e) {
        var t = D(e, 2),
            n = t[1],
            r = void 0 === n ? {} : n;
        return {
            type: Q,
            peerId: r.peer_id,
            sound: r.sound,
            disabledUntil: r.disabled_until
        }
    }

    function k(e) {
        return {
            type: X,
            params: e
        }
    }

    function T(e) {
        return {
            type: te,
            state: e
        }
    }

    function S() {
        return {
            type: ee
        }
    }

    function I() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
        return {
            type: ne,
            cancelSearch: e,
            removeActivePeer: t
        }
    }

    function M(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1,
            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1;
        return {
            type: ae,
            peerId: e,
            msgid: t,
            forward: n,
            cancelSearch: r
        }
    }

    function P(e) {
        return {
            type: ie,
            tab: e
        }
    }

    function L(e, t, n) {
        return {
            type: se,
            message: t,
            peer: e,
            error: n
        }
    }

    function A(e) {
        var t = D(e, 6),
            n = (t[0], t[1]),
            r = t[2],
            a = t[3],
            i = t[4],
            s = t[5];
        return {
            type: re,
            free: !!intval(n) || intval(i) === vk.id,
            resource: r,
            peerId: intval(a),
            who: intval(i),
            name: s
        }
    }

    function O(e, t) {
        return {
            type: oe,
            message: t,
            peerId: e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.FOLDER_UNRESPOND = t.FOLDER_IMPORTANT = t.FLAG_STEALTH = t.FLAG_MEDIA = t.FLAG_DELETED = t.FLAG_SPAM = t.FLAG_FRIENDS = t.FLAG_CHAT = t.FLAG_IMPORTANT = t.FLAG_OUTBOUND = t.FLAG_UNREAD = t.EDIT_MESSAGE = t.DELETE_DIALOG = t.RESEND = t.FAILED_MESSAGE = t.CHANGE_TAB = t.CHANGE_PEER = t.MUTEX = t.RESET_PEER = t.TRANSITION = t.RESYNC = t.SET_DIRECTORIES = t.REPLACE_DIRECTORIES = t.RESET_DIRECTORIES = t.EMPTY = t.NOTIFY_SETTINGS_CHANGED = t.UNREAD_COUNT = t.VIDEO_CALL = t.TYPING = t.CHAT_CHANGED = t.GOT_OFFLINE = t.GOT_ONLINE = t.READ_OUTBOUND = t.READ_INBOUND = t.ADD_MESSAGE = t.RESET_FLAGS = t.REPLACE_FLAGS = t.SET_FLAGS = t.DELETE = void 0;
    var D = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && o["return"] && o["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.deleteEvent = r, t.replaceFlagsEvent = a, t.setFlagsEvent = i, t.resetFlagsEvent = s, t.addMessageEvent = o, t.editMessageEvent = l, t.editMessageLocallyEvent = u, t.readInboundEvent = c, t.readOutboundEvent = d, t.gotOnlineEvent = g, t.gotOfflineEvent = m, t.resetDirectoriesEvent = f, t.replaceDirectoriesEvent = p, t.setDirectoriesEvent = _, t.deleteDialogEvent = h, t.chatChangedEvent = v, t.typingUserEvent = b, t.typingChatEvent = y, t.videoCallEvent = C, t.unreadCountEvent = w, t.notifySettingsChangedEvent = E, t.emptyEvent = k, t.transitionEvent = T, t.resyncEvent = S, t.resetPeer = I, t.changePeer = M, t.changeTab = P, t.failedMessage = L, t.mutexEvent = A, t.resendEvent = O;
    var x = n(20),
        R = n(68),
        B = t.DELETE = "event_delete",
        N = t.SET_FLAGS = "event_set_flags",
        F = t.REPLACE_FLAGS = "event_replace_flags",
        j = t.RESET_FLAGS = "event_reset_flags",
        H = t.ADD_MESSAGE = "event_add_message",
        U = t.READ_INBOUND = "event_read_inbound",
        G = t.READ_OUTBOUND = "event_read_outbound",
        q = t.GOT_ONLINE = "event_got_online",
        z = t.GOT_OFFLINE = "event_got_offline",
        V = t.CHAT_CHANGED = "event_chat_changed",
        K = t.TYPING = "event_typing",
        W = t.VIDEO_CALL = "event_video_call",
        Y = t.UNREAD_COUNT = "event_unread_count",
        Q = t.NOTIFY_SETTINGS_CHANGED = "event_notify_settings_changed",
        X = t.EMPTY = "event_empty",
        $ = t.RESET_DIRECTORIES = "event_reset_directories",
        J = t.REPLACE_DIRECTORIES = "event_replace_directories",
        Z = t.SET_DIRECTORIES = "event_set_directories",
        ee = t.RESYNC = "event_resync",
        te = t.TRANSITION = "transition_event",
        ne = t.RESET_PEER = "reset_peer",
        re = t.MUTEX = "mutex",
        ae = t.CHANGE_PEER = "change_peer",
        ie = t.CHANGE_TAB = "event_change_tab",
        se = t.FAILED_MESSAGE = "event_failed_message",
        oe = t.RESEND = "event_resend",
        le = t.DELETE_DIALOG = "event_delete_dialog",
        ue = t.EDIT_MESSAGE = "event_edit_message";
    t.FLAG_UNREAD = 1, t.FLAG_OUTBOUND = 2, t.FLAG_IMPORTANT = 8, t.FLAG_CHAT = 16, t.FLAG_FRIENDS = 32, t.FLAG_SPAM = 64, t.FLAG_DELETED = 128, t.FLAG_MEDIA = 512, t.FLAG_STEALTH = 65536, t.FOLDER_IMPORTANT = 1, t.FOLDER_UNRESPOND = 2
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }

    function a(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function i(e, t) {
        var n = Math.floor(t.status / 100);
        t.status && e.stat && (t.status >= 500 && t.status < 600 && statlogsValueEvent("im_longpoll", 1, n + "0x", t.getResponseHeader("x-frontend")), A[n] = A[n] ? A[n] + 1 : 1, Date.now() - O >= L && (Object.keys(A).forEach(function(e) {
            statlogsValueEvent("im_longpoll", A[e], e + "0x", t.getResponseHeader("x-frontend"))
        }), A = {}, O = Date.now()))
    }

    function s(e) {
        var t = e.updates;
        return t.map(function(e) {
            switch (e[0]) {
                case 0:
                    return E.deleteEvent(e);
                case 1:
                    return E.replaceFlagsEvent(e);
                case 2:
                    return E.setFlagsEvent(e);
                case 3:
                    return E.resetFlagsEvent(e);
                case 4:
                    return E.addMessageEvent(e);
                case 5:
                    return E.editMessageEvent(e);
                case 6:
                    return E.readInboundEvent(e);
                case 7:
                    return E.readOutboundEvent(e);
                case 8:
                    return E.gotOnlineEvent(e);
                case 9:
                    return E.gotOfflineEvent(e);
                case 10:
                    return E.resetDirectoriesEvent(e);
                case 11:
                    return E.replaceDirectoriesEvent(e);
                case 12:
                    return E.setDirectoriesEvent(e);
                case 13:
                    return E.deleteDialogEvent(e);
                case 51:
                    return E.chatChangedEvent(e);
                case 61:
                    return E.typingUserEvent(e);
                case 62:
                    return E.typingChatEvent(e);
                case 70:
                    return E.videoCallEvent(e);
                case 80:
                    return E.unreadCountEvent(e);
                case 114:
                    return E.notifySettingsChangedEvent(e);
                case -1:
                    return E.resyncEvent();
                default:
                    return E.emptyEvent(e)
            }
        })
    }

    function o(e, t) {
        return Promise.resolve(extend({}, t, {
            timeout: 64 > e ? 2 * e : e
        }))
    }

    function l(e, t) {
        return Promise.resolve(extend({}, t, {
            imTs: e
        }))
    }

    function u(e) {
        e.set(function(e) {
            return Promise.resolve(extend({}, e, {
                stopped: !0
            }))
        }).then(function() {
            e.get().cancelToken()
        })
    }

    function c(e, t) {
        return t.cancelToken = e, Promise.resolve(t)
    }

    function d(e, t) {
        return t.pauses || (t.pauses = []), t.pauses.push(e), Promise.resolve(t)
    }

    function g(e) {
        return e.pauses || (e.pauses = []), (0, S.lplog)("Aborting all pauses", "error"), e.pauses.forEach(function(e) {
            return e()
        }), e.pauses = [], Promise.resolve(e)
    }

    function m(e, t, n, r) {
        var a = r.failed ? (0, k.abortablePause)(M, e) : {},
            i = a.abort,
            s = a.pause;
        switch (r.failed) {
            case 1:
                return (0, S.lplog)("Old timestamp, init resync", "error"), e.set(d.bind(null, i)), n([E.resyncEvent()]), e.set(v.loadLongPollTs).then(s).then(f.bind(null, e, t, n));
            case 2:
                return (0, S.lplog)("Key is incorrect", "error"), e.set(d.bind(null, i)), e.set(v.loadLongPollKey).then(s).then(f.bind(null, e, t, n));
            case 3:
                throw nav.reload({
                    force: !0
                }), new Error("ts is very wrong");
            default:
                return e.set(l.bind(null, r.ts)).then(function() {
                    return r
                })
        }
    }

    function f(e, t, n) {
        if (e.get().stopped) return Promise.resolve({
            updates: []
        });
        if (t()) return Promise.reject(new Error("pause"));
        var r = e.get(),
            a = r.imUrl + "/" + r.imPart,
            s = (0, C.plaingetCancelable)(a, {
                act: "a_check",
                key: r.imKey,
                version: P,
                ts: r.imTs,
                wait: 25,
                mode: r.mode
            }),
            l = s.request,
            u = s.cancel;
        return e.set(c.bind(null, u)).then(function() {
            return l
        }).then(function(t) {
            var n = h(t, 2),
                a = n[0],
                s = n[1];
            return s && i(r, s), e.set(o.bind(null, 1)), JSON.parse(a)
        })["catch"](function(e) {
            var t = h(e, 2),
                n = t[0],
                a = t[1];
            throw a && i(r, a), n
        }).then(m.bind(null, e, t, n))
    }

    function p(e, t, n) {
        e.get().stopped || ((0, S.lplog)("New request"), f(e, n, t).then(s).then(function(e) {
            return (0, S.lplog)("Request success", "success"), e
        }).then(t)["catch"](function(t) {
            return e.get().stopped ? void(0, S.lplog)("Stopped longpoll") : ("pause" !== t.message && topError(t), (0, S.lplog)("Error, waiting: " + (t.message || "no message (probably browser reset)"), "error"), e.set(o.bind(null, n() ? M / 2 : e.get().timeout)).then(function() {
                var t = (0, k.abortablePause)(e.get().timeout, e),
                    n = t.abort,
                    r = t.pause;
                return e.set(d.bind(null, n)).then(r)
            }))
        }).then(p.bind(null, e, t, n)))
    }

    function _(e) {
        var t = e.id,
            n = e.gid,
            r = e.key,
            a = e.ts,
            i = e.url,
            s = e.lhost,
            o = e.lpstat,
            l = "main",
            c = new EventEmitter,
            d = (0, T.initQueue)(function(e, t) {
                return c.trigger("data", t), Promise.resolve({})
            }),
            m = d.pause,
            f = d.resume,
            _ = d.pushMessage,
            h = d.isPaused,
            v = d.reset,
            b = (0, y["default"])({
                id: t,
                gid: n,
                mode: I,
                timeout: 1,
                imKey: r,
                imTs: a,
                imPart: i,
                imUrl: s,
                pause: !1,
                stat: o
            });
        return p(b, _.bind(null, l), h.bind(null, l)), {
            on: c.on.bind(c),
            off: c.off.bind(c),
            abortPauses: function() {
                return b.set(g)
            },
            stop: u.bind(null, b),
            pause: m.bind(null, l),
            resume: f.bind(null, l),
            reset: v.bind(null, l),
            push: function(e) {
                return c.trigger("data", e)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.eventTypes = void 0;
    var h = function() {
        function e(e, t) {
            var n = [],
                r = !0,
                a = !1,
                i = void 0;
            try {
                for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (n.push(s.value), !t || n.length !== t); r = !0);
            } catch (l) {
                a = !0, i = l
            } finally {
                try {
                    !r && o["return"] && o["return"]()
                } finally {
                    if (a) throw i
                }
            }
            return n
        }
        return function(t, n) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, n);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.startLongPoll = _;
    var v = n(46),
        b = n(78),
        y = a(b),
        C = n(85),
        w = n(132),
        E = r(w),
        k = n(3),
        T = n(119),
        S = n(36),
        I = (t.eventTypes = E, 202),
        M = 4,
        P = 4,
        L = 3e4,
        A = {},
        O = Date.now()
}, , function(e, t, n) {
    "use strict";

    function r(e, t) {
        t = (0, l.parserMessage)(t);
        var n = vk.id == t.peerId && !(0, l.unpackStore)(e).gid;
        return 333 == t.peerId ? !1 : n || (0, u.isOut)(t) ? (0, c.isServiceMsg)(t) ? !1 : Date.now() / 1e3 - t.date > 86400 ? !1 : (0, u.isGift)(t) || (0, u.isSticker)(t) || (0, u.isAudioMsg)(t) || (0, u.isGraffiti)(t) || (0, u.isMoney)(t) || (0, u.isMessageWithInviteLink)(t) ? !1 : (0, l.isCommunityInterface)(e) && (t.kludges || {}).from_admin != vk.id ? !1 : (0, c.isAlreadyDeleted)(e, t.peerId, t.messageId) ? !1 : !0 : !1
    }

    function a(e) {
        var t = document.createElement("div");
        return e = e.replace(/\[((id|club)\d+)\|(.+?)]/g, "@$1 ($3)"), t.innerHTML = e, Emoji.val(t)
    }

    function i(e, t) {
        var n = t && t.msgs ? Object.keys(t.msgs) : [],
            a = n.filter(function(e) {
                return e > 0
            }).sort(function(e, t) {
                return t - e
            }).find(function(n) {
                return r(e, t.msgs[n])
            });
        return +a || null
    }

    function s(e, t, n) {
        var r = (0, d.convertKludgesToAttaches)(t.kludges, t.messageId),
            i = n.dData.attaches;
        if (a(t.text) !== n.dData.txt || r.length !== i.length) return !0;
        for (var s = r.length; s--;)
            if (r[s].id != i[s].id || r[s].type != i[s].type) return !0;
        return !1
    }

    function o(e, t, n, r, a) {
        t.origText = n, t.text = (0, c.replaceSpecialSymbols)(clean(n)).replace(/\n/gi, "<br>"), t.attaches = r, t.kludges.emoji = 1, t.local = 1, t.share_url = a, t.update_time = Math.floor(Date.now() / 1e3), e.get().tabs[t.peerId].msgs[t.messageId] = t
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.canMessageBeEdited = r, t.convertEmojiHtmlToRegularText = a, t.findLastMessageToEdit = i, t.wasMessageReallyModified = s, t.replaceMsgAfterEdit = o;
    var l = n(139),
        u = n(8),
        c = n(20),
        d = n(68)
}, function(e, t) {
    e.exports = function(e) {
        if (void 0 == e) throw TypeError("Can't call method on  " + e);
        return e
    }
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        }
    }
}, function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function(e, t, n) {
    "use strict";

    function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t["default"] = e, t
    }

    function a(e) {
        return e.get ? e.get() : e
    }

    function i(e, t) {
        var n = a(e),
            r = n.tabs[n.peer];
        return Object.keys(r.msgs).filter(function(n) {
            var a = v(e, t, n);
            return !(0, U.isOut)(a) && intval(n) > r.in_up_to
        })[0]
    }

    function s(e) {
        var t = a(e);
        return t.peer
    }

    function o(e, t) {
        var n = a(e);
        return n.tabs[t]
    }

    function l(e) {
        var t = a(e);
        return t.peer ? t.tabs[t.peer] : null
    }

    function u(e) {
        var t = a(e);
        return t.selectedMessages
    }

    function c(e, t, n) {
        var r = o(e, t),
            a = u(e)[0];
        if ("undefined" == typeof a) return [n];
        var i = Math.min(n, a),
            s = Math.max(n, a);
        return Object.keys(r.msgs).filter(function(e) {
            return e >= i && s >= e
        }).filter(function(t) {
            return !(0, V.isServiceMsg)(v(e, e.get().peer, t))
        }).map(intval)
    }

    function d(e, t) {
        var n = a(t),
            r = o(n, e),
            i = 0;
        for (var s in r.msgs)
            if (r.msgs.hasOwnProperty(s)) {
                var l = v(t, e, s);
                (0, U.isOut)(l) || (i += (0, U.isUnread)(r, l) ? 1 : 0)
            }
        return i
    }

    function g(e, t, n) {
        var r = o(e, t);
        return Object.keys(r.msgs).filter(function(r) {
            return intval(v(e, t, r).randomId) === n
        }).length > 0
    }

    function m(e, t, n) {
        var r = g(e, t, n);
        return !!r
    }

    function f(e, t) {
        var n = a(e),
            r = n.msg_local_ids_sort && n.msg_local_ids_sort[t];
        return "undefined" != typeof r ? 2e9 + r : t
    }

    function p(e, t, n) {
        var r = o(e, t),
            a = v(e, t, n),
            i = Object.keys(r.msgs).filter(function(n) {
                var r = v(e, t, n),
                    i = r.local && r.type !== G.EDIT_MESSAGE;
                return !a.local && i ? !1 : a.local && !i ? !0 : f(e, a.messageId) > f(e, r.messageId)
            }),
            s = i.pop();
        return s ? v(e, t, s) : null
    }

    function _(e) {
        return e && e.length > 0 ? q.addMessageEvent([0].concat(e)) : e
    }

    function h(e, t, n) {
        var r = o(e, t),
            i = v(e, t, n),
            s = a(e);
        return (0, U.isOut)(i) ? (0, K.oCacheGet)(e, s.id).name : i.userId !== i.peerId ? (0, K.oCacheExists)(e, i.userId) ? (0, K.oCacheGet)(e, i.userId).name : !1 : r.tab
    }

    function v(e, t, n) {
        var r = o(e, t),
            a = r && r.msgs && r.msgs[n];
        return a ? _(a) : null
    }

    function b(e) {
        var t = a(e);
        return t.gid || t.isClassic
    }

    function y(e) {
        return a(e).gid
    }

    function C(e) {
        return a(e).gid
    }

    function w(e) {
        return a(e).gid
    }

    function E(e, t) {
        var n = a(t);
        return n.tabs[e] || n.mapped_index[e]
    }

    function k(e) {
        var t = a(e);
        return w(e) ? 19542789 !== t.gid && 103416369 != t.gid ? !1 : t.active_tab === z.FOLDER_UNRESPOND || t.active_tab === z.FOLDER_UNREAD ? !0 : !1 : !1
    }

    function T(e, t) {
        e = a(e);
        var n = e.tabs[t] && "undefined" != typeof e.tabs[t].history;
        return e.tabs[t] && e.tabs[t].msgs && n ? !0 : !1
    }

    function S(e, t) {
        var n = o(e, t);
        n && (n.msgs = void 0, n.msgid = void 0, n.scrollTop = void 0, n.scrollBottom = void 0, n.contHeight = void 0, n.offset = void 0, n.skipped = void 0)
    }

    function I(e) {
        var t = e.get().go_to_end_visible;
        return t ? t[0] : !1
    }

    function M(e) {
        var t = e.get().go_to_end_visible;
        return t ? t[1] : 0
    }

    function P(e) {
        var t = a(e);
        return !t.lockedSending
    }

    function L(e) {
        return e > -2e9 && 0 > e
    }

    function A(e, t) {
        return L(t) ? !!o(e, t).blocked_community : !1
    }

    function O(e) {
        var t = a(e);
        return t.voice_message_available
    }

    function D(e) {
        var t = a(e);
        return !(!x(t) && !t.recentSearch)
    }

    function x(e) {
        var t = a(e);
        return t.searchText
    }

    function R(e, t) {
        var n = a(e);
        return t && t !== x(e) || n.recentSearch ? !0 : !1
    }

    function B(e) {
        var t = a(e);
        return t.recentSearch
    }

    function N(e) {
        var t = l(e);
        return t && t.pinned && _(t.pinned)
    }

    function F(e) {
        var t = e.get().popular_sugg;
        return t && t.length > 0
    }

    function j(e) {
        return 1 == a(e).isEditing
    }

    function H(e) {
        return e.draft || (e.draft = (0, W.loadDraftForPeer)(cur.imDb, e.peerId)), e.draft
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.unpackStore = a, t.getFirstUnread = i, t.getPeer = s, t.getTab = o, t.getCurrentTab = l, t.getSelectedMessages = u, t.getMessageRangeFromSelection = c, t.countUnread = d, t.getMessageByRid = g, t.isRidExist = m, t.getLocalId = f, t.getLastMessage = p, t.parserMessage = _, t.getAuthorFullName = h, t.getMessage = v, t.isClassicInterface = b, t.isLocksAvailable = y, t.isFoldersAvailable = C, t.isCommunityInterface = w, t.getBareTab = E, t.isReversedDialogs = k, t.isFullyLoadedTab = T, t.makeTabNotFullyLoaded = S, t.isGoToEndVisible = I, t.getUnreadScrollBottom = M, t.isSendingAvailable = P, t.isCommunityPeer = L, t.isCommunityBlocked = A, t.checkVoiceMessageAvailable = O, t.isSearching = D, t.getSearchText = x, t.isSearchingValue = R, t.isRecentSearchesActive = B, t.getPinnedMessage = N, t.doPopularSuggExist = F, t.isAnyMessageBeingEdited = j, t.getTabDraft = H;
    var U = n(8),
        G = n(132),
        q = r(G),
        z = n(5),
        V = n(20),
        K = n(66),
        W = n(68)
}, function(e, t) {
    "use strict";

    function n() {
        try {
            if (window.crypto) {
                var e = new Int32Array(1);
                return crypto.getRandomValues(e), Math.abs(e.reduce(function(e, t) {
                    return e + t
                }))
            }
        } catch (t) {}
        return intval(rand(0, r).toFixed(0))
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.random = n;
    var r = (t.MAX_SAFE_INTEGER = 9007199254740991, t.MAX_INTERGER = 2147483647)
}]);