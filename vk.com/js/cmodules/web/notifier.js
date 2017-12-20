! function(e) {
    function t(a) {
        if (i[a]) return i[a].exports;
        var r = i[a] = {
            exports: {},
            id: a,
            loaded: !1
        };
        return e[a].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var i = {};
    return t.m = e, t.c = i, t.p = "", t(0)
}([function(e, t, i) {
    e.exports = i(32)
}, function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function(e, t) {
    "use strict";

    function i(e, t, i) {
        return t in e ? Object.defineProperty(e, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = i, e
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a, r = "\\w\\$А-Яа-яёЁєЄҐґЇїІіЈј",
        n = "(https?:\\/\\/)?",
        o = "((?:[" + r + "\\—\\-\\_]+\\.){1,5})",
        s = "([A-Za-z\\$а-яА-Я\\-\\d]{2,22})",
        c = "(?:\\:(\\d{2,5}))",
        u = "(" + o + s + c + "?)",
        l = "([\\/?#])",
        d = "\\wА-Яа-я\\xa8\\xb8\\xc0-\\xffєЄҐґЇїІіЈј",
        f = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢴࢶ-ࢽऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛱ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢄᢇ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎↃↄⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〆〱-〵〻〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿕ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛥꜗ-ꜟꜢ-ꞈꞋ-ꞮꞰ-ꞷꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭥꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",
        h = "　-〿＀-￯",
        p = "\\—\\-\\_@#%?+\\/\\$.~=;:'",
        m = "[" + d + p + f + h + "]",
        _ = "(?:\\(|\\[)[" + r + "\\d&#%;,]+(?:\\)|\\])",
        g = "(" + l + "(?:\\&amp;|\\&#\\d{2,6};|,[_%]|!|,*" + m + "+|" + _ + "){0,200})?",
        v = n + u + g,
        b = "aaa,aarp,abarth,abb,abbott,abbvie,abc,able,abogado,abudhabi,ac,academy,accenture,accountant,accountants,aco,active,actor,ad,adac,ads,adult,ae,aeg,aero,aetna,af,afamilycompany,afl,africa,ag,agakhan,agency,ai,aig,aigo,airbus,airforce,airtel,akdn,al,alfaromeo,alibaba,alipay,allfinanz,allstate,ally,alsace,alstom,am,americanexpress,americanfamily,amex,amfam,amica,amsterdam,an,analytics,android,anquan,anz,ao,aol,apartments,app,apple,aq,aquarelle,ar,aramco,archi,army,arpa,art,arte,as,asda,asia,associates,at,athleta,attorney,au,auction,audi,audible,audio,auspost,author,auto,autos,avianca,aw,aws,ax,axa,az,azure,ba,baby,baidu,banamex,bananarepublic,band,bank,bar,barcelona,barclaycard,barclays,barefoot,bargains,baseball,basketball,bauhaus,bayern,bb,bbc,bbt,bbva,bcg,bcn,bd,be,beats,beauty,beer,bentley,berlin,best,bestbuy,bet,bf,bg,bh,bharti,bi,bible,bid,bike,bing,bingo,bio,biz,bj,bl,black,blackfriday,blanco,blockbuster,blog,bloomberg,blue,bm,bms,bmw,bn,bnl,bnpparibas,bo,boats,boehringer,bofa,bom,bond,boo,book,booking,boots,bosch,bostik,boston,bot,boutique,box,bq,br,bradesco,bridgestone,broadway,broker,brother,brussels,bs,bt,budapest,bugatti,build,builders,business,buy,buzz,bv,bw,by,bz,bzh,ca,cab,cafe,cal,call,calvinklein,cam,camera,camp,cancerresearch,canon,capetown,capital,capitalone,car,caravan,cards,care,career,careers,cars,cartier,casa,case,caseih,cash,casino,cat,catering,catholic,cba,cbn,cbre,cbs,cc,cd,ceb,center,ceo,cern,cf,cfa,cfd,cg,ch,chanel,channel,chase,chat,cheap,chintai,chloe,christmas,chrome,chrysler,church,ci,cipriani,circle,cisco,citadel,citi,citic,city,cityeats,ck,cl,claims,cleaning,click,clinic,clinique,clothing,cloud,club,clubmed,cm,cn,co,coach,codes,coffee,college,cologne,com,comcast,commbank,community,company,compare,computer,comsec,condos,construction,consulting,contact,contractors,cooking,cookingchannel,cool,coop,corsica,country,coupon,coupons,courses,cr,credit,creditcard,creditunion,cricket,crown,crs,cruise,cruises,csc,cu,cuisinella,cv,cw,cx,cy,cymru,cyou,cz,dabur,dad,dance,data,date,dating,datsun,day,dclk,dds,de,deal,dealer,deals,degree,delivery,dell,deloitte,delta,democrat,dental,dentist,desi,design,dev,dhl,diamonds,diet,digital,direct,directory,discount,discover,dish,diy,dj,dk,dm,dnp,do,docs,doctor,dodge,dog,doha,domains,dot,download,drive,dtv,dubai,duck,dunlop,duns,dupont,durban,dvag,dvr,dz,earth,eat,ec,eco,edeka,edu,education,ee,eg,eh,email,emerck,energy,engineer,engineering,enterprises,epost,epson,equipment,er,ericsson,erni,es,esq,estate,esurance,et,eu,eurovision,eus,events,everbank,exchange,expert,exposed,express,extraspace,fage,fail,fairwinds,faith,family,fan,fans,farm,farmers,fashion,fast,fedex,feedback,ferrari,ferrero,fi,fiat,fidelity,fido,film,final,finance,financial,fire,firestone,firmdale,fish,fishing,fit,fitness,fj,fk,flickr,flights,flir,florist,flowers,fly,fm,fo,foo,food,foodnetwork,football,ford,forex,forsale,forum,foundation,fox,fr,free,fresenius,frl,frogans,frontdoor,frontier,ftr,fujitsu,fujixerox,fun,fund,furniture,futbol,fyi,ga,gal,gallery,gallo,gallup,game,games,gap,garden,gb,gbiz,gd,gdn,ge,gea,gent,genting,george,gf,gg,ggee,gh,gi,gift,gifts,gives,giving,gl,glade,glass,gle,global,globo,gm,gmail,gmbh,gmo,gmx,gn,godaddy,gold,goldpoint,golf,goo,goodhands,goodyear,goog,google,gop,got,gov,gp,gq,gr,grainger,graphics,gratis,green,gripe,group,gs,gt,gu,guardian,gucci,guge,guide,guitars,guru,gw,gy,hair,hamburg,hangout,haus,hbo,hdfc,hdfcbank,health,healthcare,help,helsinki,here,hermes,hgtv,hiphop,hisamitsu,hitachi,hiv,hk,hkt,hm,hn,hockey,holdings,holiday,homedepot,homegoods,homes,homesense,honda,honeywell,horse,hospital,host,hosting,hot,hoteles,hotmail,house,how,hr,hsbc,ht,htc,hu,hughes,hyatt,hyundai,ibm,icbc,ice,icu,id,ie,ieee,ifm,ikano,il,im,imamat,imdb,immo,immobilien,in,industries,infiniti,info,ing,ink,institute,insurance,insure,int,intel,international,intuit,investments,io,ipiranga,iq,ir,irish,is,iselect,ismaili,ist,istanbul,it,itau,itv,iveco,iwc,jaguar,java,jcb,jcp,je,jeep,jetzt,jewelry,jio,jlc,jll,jm,jmp,jnj,jo,jobs,joburg,jot,joy,jp,jpmorgan,jprs,juegos,juniper,kaufen,kddi,ke,kerryhotels,kerrylogistics,kerryproperties,kfh,kg,kh,ki,kia,kim,kinder,kindle,kitchen,kiwi,km,kn,koeln,komatsu,kosher,kp,kpmg,kpn,kr,krd,kred,kuokgroup,kw,ky,kyoto,kz,la,lacaixa,ladbrokes,lamborghini,lamer,lancaster,lancia,lancome,land,landrover,lanxess,lasalle,lat,latino,latrobe,law,lawyer,lb,lc,lds,lease,leclerc,lefrak,legal,lego,lexus,lgbt,li,liaison,lidl,life,lifeinsurance,lifestyle,lighting,like,lilly,limited,limo,lincoln,linde,link,lipsy,live,living,lixil,lk,loan,loans,local,locker,locus,loft,lol,london,lotte,lotto,love,lpl,lplfinancial,lr,ls,lt,ltd,ltda,lu,lundbeck,lupin,luxe,luxury,lv,ly,ma,macys,madrid,maif,maison,makeup,man,management,mango,market,marketing,markets,marriott,marshalls,maserati,mattel,mba,mc,mcd,mcdonalds,mckinsey,md,me,med,media,meet,melbourne,meme,memorial,men,menu,meo,metlife,mf,mg,mh,miami,microsoft,mil,mini,mint,mit,mitsubishi,mk,ml,mlb,mls,mm,mma,mn,mo,mobi,mobile,mobily,moda,moe,moi,mom,monash,money,monster,montblanc,mopar,mormon,mortgage,moscow,moto,motorcycles,mov,movie,movistar,mp,mq,mr,ms,msd,mt,mtn,mtpc,mtr,mu,museum,mutual,mv,mw,mx,my,mz,na,nab,nadex,nagoya,name,nationwide,natura,navy,nba,nc,ne,nec,net,netbank,netflix,network,neustar,new,newholland,news,next,nextdirect,nexus,nf,nfl,ng,ngo,nhk,ni,nico,nike,nikon,ninja,nissan,nissay,nl,no,nokia,northwesternmutual,norton,now,nowruz,nowtv,np,nr,nra,nrw,ntt,nu,nyc,nz,obi,observer,off,office,okinawa,olayan,olayangroup,oldnavy,ollo,om,omega,one,ong,onl,online,onyourside,ooo,open,oracle,orange,org,organic,orientexpress,origins,osaka,otsuka,ott,ovh,pa,page,pamperedchef,panasonic,panerai,paris,pars,partners,parts,party,passagens,pay,pccw,pe,pet,pf,pfizer,pg,ph,pharmacy,philips,phone,photo,photography,photos,physio,piaget,pics,pictet,pictures,pid,pin,ping,pink,pioneer,pizza,pk,pl,place,play,playstation,plumbing,plus,pm,pn,pnc,pohl,poker,politie,porn,post,pr,pramerica,praxi,press,prime,pro,prod,productions,prof,progressive,promo,properties,property,protection,pru,prudential,ps,pt,pub,pw,pwc,py,qa,qpon,quebec,quest,qvc,racing,radio,raid,re,read,realestate,realtor,realty,recipes,red,redstone,redumbrella,rehab,reise,reisen,reit,reliance,ren,rent,rentals,repair,report,republican,rest,restaurant,review,reviews,rexroth,rich,richardli,ricoh,rightathome,ril,rio,rip,rmit,ro,rocher,rocks,rodeo,rogers,room,rs,rsvp,ru,ruhr,run,rw,rwe,ryukyu,sa,saarland,safe,safety,sakura,sale,salon,samsclub,samsung,sandvik,sandvikcoromant,sanofi,sap,sapo,sarl,sas,save,saxo,sb,sbi,sbs,sc,sca,scb,schaeffler,schmidt,scholarships,school,schule,schwarz,science,scjohnson,scor,scot,sd,se,seat,secure,security,seek,select,sener,services,ses,seven,sew,sex,sexy,sfr,sg,sh,shangrila,sharp,shaw,shell,shia,shiksha,shoes,shop,shopping,shouji,show,showtime,shriram,si,silk,sina,singles,site,sj,sk,ski,skin,sky,skype,sl,sling,sm,smart,smile,sn,sncf,so,soccer,social,softbank,software,sohu,solar,solutions,song,sony,soy,space,spiegel,spot,spreadbetting,sr,srl,srt,ss,st,stada,staples,star,starhub,statebank,statefarm,statoil,stc,stcgroup,stockholm,storage,store,stream,studio,study,style,su,sucks,supplies,supply,support,surf,surgery,suzuki,sv,swatch,swiftcover,swiss,sx,sy,sydney,symantec,systems,sz,tab,taipei,talk,taobao,target,tatamotors,tatar,tattoo,tax,taxi,tc,tci,td,tdk,team,tech,technology,tel,telecity,telefonica,temasek,tennis,teva,tf,tg,th,thd,theater,theatre,tiaa,tickets,tienda,tiffany,tips,tires,tirol,tj,tjmaxx,tjx,tk,tkmaxx,tl,tm,tmall,tn,to,today,tokyo,tools,top,toray,toshiba,total,tours,town,toyota,toys,tp,tr,trade,trading,training,travel,travelchannel,travelers,travelersinsurance,trust,trv,tt,tube,tui,tunes,tushu,tv,tvs,tw,tz,ua,ubank,ubs,uconnect,ug,uk,um,unicom,university,uno,uol,ups,us,uy,uz,va,vacations,vana,vanguard,vc,ve,vegas,ventures,verisign,vermögensberater,vermögensberatung,versicherung,vet,vg,vi,viajes,video,vig,viking,villas,vin,vip,virgin,visa,vision,vista,vistaprint,viva,vivo,vlaanderen,vn,vodka,volkswagen,volvo,vote,voting,voto,voyage,vu,vuelos,wales,walmart,walter,wang,wanggou,warman,watch,watches,weather,weatherchannel,webcam,weber,website,wed,wedding,weibo,weir,wf,whoswho,wien,wiki,williamhill,win,windows,wine,winners,wme,wolterskluwer,woodside,work,works,world,wow,ws,wtc,wtf,xbox,xerox,xfinity,xihuan,xin,xperia,xxx,xyz,yachts,yahoo,yamaxun,yandex,ye,yodobashi,yoga,yokohama,you,youtube,yt,yu,yun,za,zappos,zara,zero,zip,zippo,zm,zone,zuerich,zw",
        C = "бг,бел,дети,ею,католик,ком,мкд,мон,москва,онлайн,орг,рус,рф,сайт,срб,укр",
        y = "qxam,90ae,90ais,d1acj3b,e1a4c,80aqecdr1a,j1aef,d1alf,l1acc,80adxhks,80asehdb,c1avg,p1acf,p1ai,80aswg,90a3ac,j1amh,80ao21a,y9a3aq,9dbq2a,mgbca7dzdo,mgba3a3ejt,mgbayh7gpa,lgbbat1ad8j,mgberp4a5d4ar,mgba7c0bbn0a,mgbc0a9azcg,mgb2ddes,mgbaam7a8h,mgba3a4f16a,mgbbh1a,mgbab2bd,ngbe9e0a,mgbbh1a71e,pgbs0dh,mgbpl2fh,ogbpf8fl,ngbc5azd,mgbtx2b,mgb9awbf,ygbi2ammx,wgbl6a,mgbi4ecexp,fhbei,wgbh1c,mgbx4cd0ab,mgbb9fbpob,4gbrim,mgbt3dhd,mgbai9azgqp6j,mgbgu82a,11b4c3d,c2br7g,h2brj9c,h2breg3eve,h2brj9c8c,i1b6b1a6a2e,54b7fta0cc,45brj9c,45br5cyl,s9brj9c,gecrj9c,3hcrj9c,xkc2dl3a5ee0h,xkc2al3hye2a,clchc0ea0b2g2a9gcd,fpcrj9c3d,2scrj9c,rvc1e0am3e,fzc2c9e2c,42c2d9a,o3cw4h,node,q9jyb4c,gckr3f0f,qcka1pmc,tckwe,cck2b3b,1ck2e1b,bck1b9a5dre4c,eckvdtc9d,rhqv96g,fiq64b,fiqs8s,fiqz9s,fiq228c5hs,vhquv,1qqw23a,vuq861b,nyqy26a,45q11c,55qx5d,55qw42g,kprw13d,kpry57d,czru2d,czrs0t,czr694b,w4rs40l,w4r85el8fhu5dnra,3ds443g,3oq18vl8pn36a,pssy2u,tiq49xqyj,fjq720a,fct429k,estv75g,xhq521b,9krt00a,30rr7y,6qq986b3xl,kput3i,kpu716f,zfr164b,mxtq1m,yfro4i67o,efvy88h,9et52u,rovu88b,nqv7f,b4w605ferd,unup4y,mix891f,mix082f,3pxu8k,pbt977c,6frz82g,nqv7fs00ema,ses554g,hxt814e,5tzm5g,io0a7i,8y0a063a,jlq61u9w7b,flw351e,g2xx48c,gk3at1e,3bst00m,fzys8d69uvgm,kcrx77d1x4a,jvr189m,imr513n,5su34j936bgsg,j6w193g,t60b56a,mk1bu44c,cg4bki,3e0b707e",
        w = (t.OUR_DOMAINS = /^([a-zA-Z0-9\.\_\-]+\.)?(vkontakte\.ru|vk\.com|vkadre\.ru|vshtate\.ru|userapi\.com|vk\.me)$/, t.ENTITIES = /([^a-zA-Z0-9#%;_\-.\/?&=\[\]])/g, t.VK_DOMAIN = /^(?:https?:\/\/)?(?:vk\.com|vkontakte\.ru)?\/([a-zA-Z0-9\._]+)\??$/, t.MENTION = /\[(id|club)(\d+)(?:\:([a-z0-9_\-]+))?\|([^\$]+?)\]/g, t.MENTION_RAW = /(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g, t.ARROW_UP = 38),
        k = t.ARROW_DOWN = 40,
        N = t.PAGE_UP = 33,
        T = t.PAGE_DOWN = 34,
        F = t.END_KEY = 35,
        E = t.HOME = 36,
        x = t.ENTER = 13,
        S = t.ESC = 27,
        I = (t.UNPRINTABLE_KEYS = [w, k, N, T, x, S, F, E], t.UP_DOWN_CONTROLS = [N, T, k, w, E, F], t.PRINTABLE = "printable", t.FOLDER_UNREAD = "unread"),
        O = t.FOLDER_ALL = "all",
        L = t.FOLDER_UNRESPOND = "unrespond",
        M = t.FOLDER_IMPORTANT = "important",
        R = (t.FOLDERS = [O, I, L, M], t.FOLDER_MASKS = (a = {}, i(a, L, 2), i(a, M, 1), a), t.TOP_DOMAINS = [].concat(b.split(","), C.split(","), y.split(",").map(function(e) {
            return "xn--" + e
        })));
    t.MAX_DOMAIN_LENGTH = R.reduce(function(e, t) {
        return Math.max(e, t.length)
    }, 0), t.EMAIL = new RegExp("([a-zA-Zа-яА-Я\\-_\\.0-9\\+]+@(" + o + s + "))", "ig"), t.MESSAGE_REGEXP = new RegExp(v, "ig")
}, , function(e, t) {
    var i = 0,
        a = Math.random();
    e.exports = function(e) {
        return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++i + a).toString(36))
    }
}, function(e, t, i) {
    "use strict";

    function a(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function r(e, t, i) {
        return t in e ? Object.defineProperty(e, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = i, e
    }

    function n(e) {
        return e.resync_in_process ? e.resync_in_process : Promise.resolve(!1)
    }

    function o(e) {
        if (!e.renew_hashes) {
            var t = e.last_hashes_update || 0;
            if (Date.now() - t < 1e4) return Promise.resolve();
            var i = Object.keys(e.tabs).filter(function(t) {
                return (0, Wt.isFullyLoadedTab)(e, t)
            });
            e.renew_hashes = (0, Dt.post)(Dt.CONTROLLER, {
                act: "a_renew_hash",
                peers: i.join(","),
                gid: e.gid
            }).then(function(t) {
                var a = At(t, 1),
                    r = a[0];
                return i.forEach(function(t) {
                    e.tabs[t].hash = r[t]
                }), delete e.renew_hashes, e.last_hashes_update = Date.now(), e
            })
        }
        return e.renew_hashes
    }

    function s(e, t, i) {
        return n(e).then(function(a) {
            return a ? t.apply(void 0, i) : o(e).then(function(e) {
                return t.apply(void 0, i)
            })
        })
    }

    function c(e) {
        return function() {
            var t = arguments,
                i = t[t.length - 1];
            return e.apply(void 0, t)["catch"](function(a) {
                if (a && a.match && a.match(/1001;/)) return s(i, e, t);
                throw a
            })
        }
    }

    function u(e) {
        return "string" == typeof e ? se("<div>" + e + "</div>") : e
    }

    function l(e, t) {
        var i = e ? e.indexOf(t) : 0; - 1 === i && e.push(t)
    }

    function d(e, t) {
        var i = e ? e.indexOf(t) : -1; - 1 !== i && e.splice(i, 1)
    }

    function f(e) {
        return "string" == typeof e ? e : e.innerHTML
    }

    function h(e, t) {
        return t.block_states = extend(t.block_states, e), Promise.resolve(t)
    }

    function p(e, t, i, a, r) {
        return r.tabHistoryNotChanged = !1, (0, qt.retryFn)(Dt.post, 3, function(e) {
            return e - 1
        })(Dt.CONTROLLER, {
            act: "a_start",
            peer: e,
            msgid: i,
            history: t,
            prevpeer: r.prevPeer,
            gid: r.gid,
            block: a
        }).then(function(t) {
            var a = At(t, 5),
                n = a[0],
                o = a[1],
                s = a[2],
                c = a[3],
                u = a[4];
            if (o.forEach(function(e) {
                    return (0, Qt.oCacheAdd)(r, e)
                }), r.tabs || (r.tabs = {}), r.dialog_tab_cts = u, r.tabs[e] || (r.tabs[e] = (0, Wt.normalizeTab)(r, n)), h(c, r), i) {
                if (r.tabs[e]) {
                    var l = r.tabs[e].lastmsg,
                        d = r.tabs[e].lastmsg_meta;
                    extend(r.tabs[e], n), r.tabs[e].lastmsg = l, r.tabs[e].lastmsg_meta = d
                }
            } else extend(r.tabs[e], n);
            return r.admins = extend(r.admins, s), r.imQueue(e, !1), m(e, r)
        })["catch"](function(e) {
            return (0, Yt.imWeirdCatch)("loadPeer", e)
        })
    }

    function m(e, t) {
        var i = t.imQueue(e, !1),
            a = t.tabs[e],
            r = i.filter(function(i) {
                return !(0, Vt.isRidExist)(t, e, i.rid)
            });
        return a.msgs = r.reduce(function(e, t) {
            return e["rid" + t.rid] = t.mess, e
        }, a.msgs), t.imQueueSet(e, r), t.tabs[e].history = (0, Wt.restoreQueue)(r, t, u(t.tabs[e].history)), Promise.resolve(t)
    }

    function _(e, t, i) {
        var a = i.imQueue(e, !1).filter(function(e) {
            return e.failed && e.mess.messageId !== t
        });
        return i.imQueueSet(e, a), i.tabs[e].history = (0, Wt.removeMessages)([t], u(i.tabs[e].history)), Promise.resolve(i)
    }

    function g(e, t) {
        return (t.block_states[e] || {}).free === !1 ? Promise.resolve(t) : (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_block",
            peer: e,
            prevPeer: t.prevPeer,
            gid: t.gid
        }).then(function(e) {
            var i = At(e, 1),
                a = i[0];
            return h(a, t)
        })
    }

    function v(e, t) {
        var i = t.peer;
        return Promise.resolve(t).then(function(t) {
            return t.tabHistoryNotChanged = !1, (0, Wt.isFullyLoadedTab)(t, i) && !t.tabs[i].msgid ? (t.gid && g(i, t), Promise.resolve(t).then(k)) : ((0, Wt.isFullyLoadedTab)(t, i) && (t.tabs[i].msgid = !1), p(i, e, !1, !0, t))
        }).then(k).then(b.bind(null, i))
    }

    function b(e, t) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
        return (0, Wt.isTabLoaded)(t, e) && (t.tabs[e].last_touched = Date.now()), (0, Wt.isTabLoaded)(t, e) && i && (t.tabs[e].last_visited = Date.now()), t
    }

    function C(e, t, i) {
        var a = i.msgid,
            r = i.peer;
        return !e && (0, Wt.isFullyLoadedTab)(i, r) && i.tabs[r].msgs[a] ? (t === i.peer ? i.tabHistoryNotChanged = !0 : i.tabHistoryNotChanged = !1, i.gid && g(r, i), Promise.resolve(i).then(k).then(b.bind(null, r))) : p(r, !0, a, !0, i).then(k).then(function() {
            var e = (0, Vt.getTab)(i, r);
            return e.msgid = a, i
        }).then(b.bind(null, r))
    }

    function y(e, t, i) {
        if (Xe(i)) throw (0, Wt.showWaitUntilUploadedBox)(), new Error("Cant change peer while loading somethind");
        var a = i.gid ? "gim" + i.gid : "im";
        if (i.prevPeer = i.peer, i.peer = e, i.msgid = t || "", cur.peer = e, ti({
                sel: e ? (0, Wt.convertPeerToUrl)(e) : null,
                msgid: i.msgid,
                email: "",
                0: a
            }), 0 != i.prevPeer && b(i.prevPeer, i, !0), 0 !== e) {
            var r = [];
            (0, Wt.isTabLoaded)(i, e) && b(e, i, !0), r = i.tabbedPeers.map(function(e) {
                return e.peer
            }).indexOf(e) < 0 ? [{
                peer: e,
                type: "perm"
            }].concat(i.tabbedPeers) : i.tabbedPeers.map(function(t) {
                return t.peer == e && "perm" !== t.type && (t.type = "perm"), t
            }), ht(r, !1, i)
        } else ht(i.tabbedPeers, !1, i);
        return ii(), pe(i.prevPeer, i)
    }

    function w(e) {
        if (cur.wallMentions = [], (0, Wt.isChatPeer)(e.peer) && (0, Wt.isFullyLoadedTab)(e, e.peer)) {
            var t = e.tabs[e.peer],
                i = [];
            Object.keys(t.msgs || {}).reverse().forEach(function(e) {
                var a = (0, Vt.parserMessage)(t.msgs[e]),
                    r = a && a.userId;
                r && r != vk.id && -1 === i.indexOf(r) && (0, Wt.isUserAliveInChat)(t, r) && i.push(r)
            }), (t.memberIds || []).forEach(function(e) {
                -1 === i.indexOf(e) && i.push(e)
            }), i.forEach(function(t) {
                if ((0, Qt.oCacheExists)(e, t)) {
                    var i = (0, Qt.oCacheGet)(e, t),
                        a = i.link.substring(1);
                    cur.wallMentions.push([i.id, i.name, "@" + a, i.photo, void 0, void 0, void 0, a, i.first_name])
                }
            })
        }
    }

    function k(e) {
        var t = e.peer;
        if (0 === t) return Promise.resolve(e);
        var i = e.tabs[t],
            a = [];
        i.offset && a.push("photos"), i.offset && a.push("search"), (-2e9 > t || i.offset) && a.push("clear"), (0, Wt.isCommunityInterface)(e) && a.push("block"), (0, Wt.isCommunityPeer)(t) && (i.blocked_community ? a.push("allow_community") : a.push("block_community")), !(0, Wt.isChatPeer)(t) && !(0, Wt.isUserPeer)(t) || (0, Wt.isCommunityInterface)(e) || (0, Wt.isChatPeer)(t) && (i.data.kicked || i.data.closed) || (inArray(t, e.mutedPeers) ? a.push("unmute") : a.push("mute")), (0, Wt.isUserPeer)(t) && !e.gid && !i.blacklisted && i.is_friend && a.push("invite"), (0, Wt.isChatPeer)(t) && !i.data.closed && !i.data.kicked && i.data.link && a.push("invite_link"), !(0, Wt.isChatPeer)(t) || i.data.closed || i.data.kicked || a.push("topic", "avatar", "invite", "leave"), (0, Wt.isChatPeer)(t) && i.data.closed && !i.data.kicked && a.push("return"), (0, Wt.isChatPeer)(t) && i.pinned && (geByClass1("im-page--chat-header_hide-pin-actions") || (a.push((0, Xt.isPinnedMessageVisibleInTab)(e, t) ? "pin_hide" : "pin_unhide"), a.push("unpin")));
        var r = (0, Wt.chatActions)(e);
        return e.curActions = a.sort(function(e, t) {
            return ri[e] - ri[t]
        }).reduce(function(e, t) {
            return e[t] = r[t], e
        }, {}), Promise.resolve(e)
    }

    function N(e, t, i) {
        var a = i.tabs[i.peer];
        return (0, Dt.post)(Dt.CONTROLLER, {
            peer: i.peer,
            whole: e,
            act: "a_history",
            offset: a.offset + (a.skipped || 0),
            toend: t,
            gid: i.gid
        }).then(function(e) {
            var t = At(e, 4),
                r = t[0],
                n = t[1],
                o = t[2],
                s = t[3];
            return a.allShown = o, i.admins = extend(i.admins, s), a.history = r + f(a.history), a.historyToAppend = r, a.offset += Object.keys(n).length, a.msgs = extend(a.msgs, n), i
        })
    }

    function T(e) {
        var t = e.tabs[e.peer];
        return (0, Dt.post)(Dt.CONTROLLER, {
            peer: e.peer,
            act: "a_history",
            rev: 1,
            offset: t.skipped,
            gid: e.gid
        }).then(function(i) {
            var a = At(i, 5),
                r = a[0],
                n = a[1],
                o = a[2];
            a[3], a[4], t.allShown = t.allShown || o, t.history = f(t.history) + r, t.historyToAppend = r;
            var s = Object.keys(n).length;
            return t.skipped -= s, t.offset += s, t.msgs = extend(t.msgs, n), e
        })
    }

    function F(e, t, i, a) {
        var r = e.tabs[t];
        return a === Ht.FLAG_OUTBOUND ? r.out_up_to = i : r.in_up_to = i, e
    }

    function E(e, t) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_email_start",
            email: e,
            hash: t.writeHash
        }).then(function(e) {
            var i = At(e, 2),
                a = i[0],
                r = i[1];
            return U(a, t), r
        })
    }

    function x(e) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_get_key",
            uid: e.id,
            gid: e.gid
        }).then(function(t) {
            var i = At(t, 3),
                a = i[0],
                r = i[1],
                n = i[2];
            return extend({}, e, {
                imKey: a,
                imUrl: r,
                imPart: n
            })
        })
    }

    function S(e) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_get_ts",
            gid: e.gid
        }).then(function(t) {
            var i = At(t, 1),
                a = i[0];
            return extend({}, e, {
                imTs: a
            })
        })
    }

    function I(e, t, i) {
        var a = i.tabs[e];
        return a.msgs[t.messageId] && (a.msgs[t.messageId].errored = 1, a.history = (0, Wt.setMessageError)(e, t, u(a.history))), Promise.resolve(i)
    }

    function O(e, t, i, a) {
        var r = a.tabs[e];
        return r.msgs[t] && (r.msgs[t].errored = 0, r.lastmsg_meta = i, r.lastmsg = t, r.history = (0, Wt.startResendMessage)(e, t, u(r.history))), Promise.resolve(a)
    }

    function L(e, t, i, a) {
        var r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !1;
        t.deletedDialog || (e.dialog_tabs = Object.keys(e.dialog_tabs).reduce(function(e, n) {
            return !i && !it(n)(t) || r && !r(n, e[n], t) || (e[n] = (0, zt.arrayUnique)(a(e[n], n))), e
        }, e.dialog_tabs))
    }

    function M(e, t) {
        return 0 === e.length ? Promise.resolve(t) : (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_get_admin",
            admins: e.join(","),
            gid: t.gid
        }).then(function(e) {
            var i = At(e, 1),
                a = i[0];
            return t.admins = extend(t.admins, a), t
        })
    }

    function R(e, t) {
        if (!inArray(e, t.tabbedPeers.map(function(e) {
                return e.peer
            })) && (0 !== t.peer || t.searchText) && !inArray(e, t.mutedPeers)) {
            var i = {
                peer: e,
                type: "temp"
            };
            ht(t.tabbedPeers.concat([i]), !1, t)
        }
    }

    function P(e, t, i) {
        return (0, Wt.isReversedDialogs)(i) ? t.concat([e]) : [e].concat(t)
    }

    function A(e, t) {
        var i = (0, Vt.getTab)(t, e.peerId);
        if ((0, Wt.isFullyLoadedTab)(t, e.peerId)) {
            var a = u(i.history);
            i.msgs[e.messageId] = extend(!0, {}, e), i.history = (0, Wt.editAndReplaceMessage)(t, e, a)
        }
        i && i.lastmsg == e.messageId && (i.lastmsg_meta = e);
        var r = i && i.pinned && (0, Vt.parserMessage)(i.pinned);
        return r && r.messageId == e.messageId && (i.pinned = e), Promise.resolve(t)
    }

    function D(e, t) {
        var i = e.flags & Ht.FLAG_OUTBOUND,
            a = e.peerId;
        if ((0, Wt.isTabLoaded)(t, a)) {
            var n = t.tabs[a];
            if (n.deletedDialog = !1, !t.msg_local_ids_sort && e.local ? t.msg_local_ids_sort = r({}, e.messageId, 0) : e.local && (t.msg_local_ids_sort[e.messageId] = Object.keys(t.msg_local_ids_sort).length), i ? n.unread = 0 : (n.lastmsg == e.messageId && n.unread ? B(t, 1, e.peerId) : (!n.unread && B(t, 1, e.peerId), n.unread++), R(e.peerId, t)), (0, Wt.isFullyLoadedTab)(t, a)) {
                var o = u(n.history);
                n.skipped > 0 && n.skipped++, n.offset++, n.msgs[e.messageId] = extend(!0, {}, e), n.history = (0, Wt.appendToHistory)(t, e, o, !0, !0, !0), (0, Kt.isOut)(e) && (n.blocked_community = 0, k(t))
            }
            return n.typing && n.typing[e.userId] && delete n.typing[e.userId], n.lastmsg = e.messageId, n.lastmsg_meta = e, b(e.peerId, t), L(t, n, !1, P.bind(null, a), ot.bind(null, t)), Promise.resolve(t)
        }
        return p(a, 0, 0, 0, t).then(function(t) {
            var r = t.tabs[a];
            return L(t, r, !1, P.bind(null, a), ot.bind(null, t)), b(e.peerId, t), i || R(e.peerId, t), t
        })
    }

    function B(e, t, i) {
        e.cur_unread_cnt || (e.cur_unread_cnt = {}), -1 === t && delete e.cur_unread_cnt[i], e.unread_cnt += t
    }

    function j(e, t) {
        if ((0, Wt.isFullyLoadedTab)(t, e.peerId)) {
            var i = t.tabs[e.peerId],
                a = i.unread;
            if (t = F(t, e.peerId, e.upToId, 0), null != e.unread ? i.unread = e.unread : i.unread = e.upToId >= i.lastmsg ? 0 : (0, Vt.countUnread)(e.peerId, t) + (i.unread > 0 ? +i.skipped : 0), a > 0 && !i.unread && B(t, -1, e.peerId), !i.skipped) {
                var r = u(i.history);
                i.history = (0, Wt.removewNewUnreadBarAndMerge)(t, r, e.peerId)
            }
        } else(0, Wt.isTabLoaded)(t, e.peerId) && (t.tabs[e.peerId].unread > 0 && B(t, -1, e.peerId), t.tabs[e.peerId].unread = 0, t.tabs[e.peerId].in_up_to = e.upToId);
        return (0, Wt.isTabLoaded)(t, e.peerId) && (t.dialog_tabs[Gt.FOLDER_UNREAD] = t.dialog_tabs[Gt.FOLDER_UNREAD].filter(function(t) {
            return intval(t) !== e.peerId
        })), 0 !== t.unread_cnt || t.active_tab !== Gt.FOLDER_UNREAD || t.gid ? Promise.resolve(t) : at(Gt.FOLDER_ALL, t)
    }

    function H(e, t) {
        var i = t.tabs[e.peerId];
        if ((0, Wt.isTabLoaded)(t, e.peerId) && F(t, e.peerId, e.upToId, Ht.FLAG_OUTBOUND), (0, Wt.isFullyLoadedTab)(t, e.peerId)) {
            var a = u(i.history);
            i.history = (0, Wt.markMessagesAsRead)(t, e.peerId, a)
        }
        return Promise.resolve(t)
    }

    function q(e, t, i, a, r) {
        return r.text = {}, r.imQueue = e, r.imQueueResend = t, r.imQueueSet = i, r.imQueueComplete = a, Promise.resolve(r)
    }

    function z(e, t, i) {
        function a(e, t) {
            return {
                id: e.messageId,
                text: e.text,
                date: e.date,
                kludges: e.kludges,
                authorName: t
            }
        }
        if (1 === e.length) {
            var n = e[0],
                o = (0, Vt.getMessage)(i, t, n),
                s = (0, Vt.getAuthorFullName)(i, t, n);
            return s === !1 ? i.set(Ie.bind(null, r({}, t, [o.userId]))).then(function(i) {
                var r = (0, Vt.getAuthorFullName)(i, t, n);
                return {
                    msgIds: e,
                    object: a(o, r)
                }
            }) : Promise.resolve({
                msgIds: e,
                object: a(o, s)
            })
        }
        return Promise.resolve({
            msgIds: e
        })
    }

    function U(e, t) {
        (0, Wt.normalizeTabsGotFromServer)(t, e);
        var i = t.tabs[t.peer];
        return t.tabs = Object.keys(e).reduce(function(i, a) {
            var r = t.tabs[a] ? t.tabs[a].msgs : {},
                n = extend({}, r || {}, e[a].msgs || {});
            return i[a] = extend(t.tabs[a] || {}, e[a]), n && (i[a].msgs = n), e[a].lastmsg || (i[a].lastmsg = !1), i
        }, t.tabs), i && (t.tabs[t.peer] = i), Promise.resolve(t)
    }

    function W(e, t, i, a) {
        var r = (0, Vt.getTab)(a, e);
        if (r) {
            var n = t !== !1 ? t == Zt ? 2 : mobPlatforms[t] ? 1 : 0 : r.last_seen[2];
            r.online = t, r.last_seen = [t, i || r.last_seen[1], n]
        }
        return Promise.resolve(a)
    }

    function G(e, t, i) {
        var a = (0, Vt.getTab)(i, e);
        return a && (a.typing || (a.typing = {}), a.typing[t] = Date.now()), Promise.resolve(i)
    }

    function V(e, t, i) {
        return (0, qt.pause)($t + 2).then(function() {
            if ((0, Wt.isTabLoaded)(i, e)) {
                var a = i.tabs[e];
                if (a.typing) {
                    var r = Date.now() - (a.typing[t] || 0);
                    r >= 1e3 * $t && delete a.typing[t]
                }
            }
            return i
        })
    }

    function K(e) {
        return e.map(function(e) {
            return e[0] + ":" + e[1]
        }).join(",")
    }

    function Q(e, t) {
        if (t.selectedMessages || (t.selectedMessages = []), 1 === e.length && inArray(e[0], t.selectedMessages)) t.selectedMessages = t.selectedMessages.filter(function(t) {
            return t !== e[0]
        });
        else {
            var i = t.selectedMessages.concat(e);
            t.selectedMessages = (0, zt.arrayUnique)(i).sort(function(e, t) {
                return e - t
            })
        }
        return Promise.resolve(t)
    }

    function Y(e) {
        return e.selectedMessages = [], Promise.resolve(e)
    }

    function X(e) {
        return e.selectedMessages = [], Promise.resolve(e)
    }

    function $(e, t) {
        if ((0, Wt.isFullyLoadedTab)(t, e.peerId)) {
            var i = t.tabs[e.peerId],
                a = t.imQueue(e.peerId).filter(function(t) {
                    return t.failed && t.rid !== e.randomId
                });
            t.imQueueSet(e.peerId, a), t.imQueueComplete(e.peerId, e.randomId), i.lastmsg_meta = e, i.lastmsg = e.messageId;
            var r = i.msgs["rid" + e.randomId];
            r && (i.msgs[e.messageId] = e, delete i.msgs["rid" + e.randomId]), i.history = (0, Wt.replaceMessageAttrs)(t, u(i.history), e)
        }
        return Promise.resolve(t)
    }

    function J(e, t) {
        return Promise.resolve()
    }

    function Z(e, t) {
        var i = {
            act: "a_get_media",
            id: e.messageId,
            gid: t.gid
        };
        return (0, qt.retryFn)(Dt.post, 3, function(e) {
            return e * e
        })(Dt.CONTROLLER, i).then(function(i) {
            return ee(e, i, t)
        })["catch"](function() {
            return ee(e, null, t)
        })
    }

    function ee(e, t, i) {
        var a = i.tabs[e.peerId];
        return a.mediacontent || (a.mediacontent = {}), a.mediacontent[e.messageId] = t || [getTemplate("im_retry_link")], te(e, i)
    }

    function te(e, t) {
        var i = t.tabs[e.peerId];
        return i.history = (0, Wt.replaceAttaches)(u(i.history), e, t), Promise.resolve(t)
    }

    function ie(e, t, i) {
        var a = (0, Wt.dayFromVal)(t),
            r = i.tabs[e];
        return r.searchDay = a, r.searchOffset = 0, r.searchAllLoaded = !1, Promise.resolve(i)
    }

    function ae(e, t, i) {
        if (t) {
            var a = i.tabs[t];
            a.searchText = e, a.searchOffset = 0, a.searchAllLoaded = !1
        } else i.searchText = e, i.searchOffset = 0, i.searchAllLoaded = !1;
        return Promise.resolve(i)
    }

    function re(e, t, i, a) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_hints",
            str: e,
            gid: a.gid,
            query: i,
            peerIds: t.join(",")
        }).then(function(e) {
            var t = At(e, 3),
                i = t[0],
                r = t[1],
                n = t[2];
            return h(n, a), r.forEach(function(e) {
                return (0, Qt.oCacheAdd)(a, e)
            }), U(i, a), Object.keys(i).sort(function(e, t) {
                return i[e].order - i[t].order
            }).map(function(e) {
                return i[e]
            })
        })
    }

    function ne(e, t, i, a) {
        return re(e, t, i, a).then(function(e) {
            return e.map(function(e) {
                return {
                    peerId: e.peerId,
                    name: e.tab,
                    photo: e.photo,
                    online: e.online,
                    is_friend: "friends" === i ? !0 : !1
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

    function ce(e) {
        return function(t, i) {
            return e(i).then(function(e) {
                var a = t ? e.search(t) : e.list,
                    r = a.map(oe);
                return i.mapped_index || (i.mapped_index = {}), r.forEach(function(e) {
                    i.mapped_index[e.peerId] = e
                }), r
            })
        }
    }

    function ue(e, t) {
        var i = void 0,
            a = void 0;
        t.topConvTree = new Promise(function(e) {
            i = e
        }), t.hintsTree = new Promise(function(e) {
            a = e
        });
        var r = e.select(Ut.RECENT_SEARCH_OP);
        return (0, qt.retryFn)(Dt.post, 1, function() {
            return 4
        })(Dt.CONTROLLER, {
            act: "a_dialogs_preload",
            rs: r.join(","),
            gid: t.gid
        })["catch"](function(e) {
            return [
                [],
                [],
                []
            ]
        }).then(function(e) {
            var r = At(e, 3),
                n = r[0],
                o = r[1],
                s = r[2];
            return t.popular_sugg = s, new vkIndexer(n, function(e) {
                return e[1]
            }, i), new vkIndexer(o, function(e) {
                return e[1]
            }, a), t
        })
    }

    function le(e) {
        var t = e.active_tab,
            i = void 0;
        return i = e.dialog_tabs[t].length > 0 ? Math.min.apply(null, e.dialog_tabs[t].map(function(t) {
            return e.tabs[t].lastmsg
        })) : 0, (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_get_dialogs",
            start_message_id: i,
            tab: t,
            gid: e.gid
        }).then(function(i) {
            var a = At(i, 4),
                r = a[0],
                n = a[1],
                o = a[2],
                s = a[3];
            return o.forEach(function(t) {
                return (0, Qt.oCacheAdd)(e, t)
            }), h(s, e), U(n, e), e.dialog_tabs[t] = e.dialog_tabs[t].concat(Object.keys(n).map(intval)), e.dialog_tabs_all[t] = !r.has_more, Promise.resolve(e)
        })
    }

    function de(e, t) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_search",
            q: e,
            from: "all",
            gid: t.gid,
            hash: t.writeHash,
            offset: t.searchOffset || 0
        }).then(function(i) {
            var a = At(i, 5),
                r = a[0],
                n = a[1],
                o = a[2],
                s = a[3],
                c = a[4];
            return n.forEach(function(e) {
                return (0, Qt.oCacheAdd)(t, e)
            }), (0, Wt.normalizeTabsGotFromServer)(t, r), e === t.searchText && (t.searchOffset = s, t.searchAllLoaded = c), Object.keys(r).filter(function(e) {
                return !t.tabs[e]
            }).forEach(function(e) {
                t.tabs[e] = r[e]
            }), [r, o]
        })
    }

    function fe(e, t) {
        var i = t.tabs[e];
        return i.searchAllLoaded
    }

    function he(e, t) {
        if (t.peer === e && (0, Wt.isFullyLoadedTab)(t, e)) {
            var i = t.tabs[e];
            return i.inplaceSearch
        }
        return !1
    }

    function pe(e, t) {
        if ((0, Wt.isFullyLoadedTab)(t, e)) {
            var i = t.tabs[e];
            delete i.inplaceSearch, delete i.searchOffset, delete i.searchAllLoaded, delete i.searchText, delete i.searchDay
        }
        return Promise.resolve(t)
    }

    function me(e, t) {
        if ((0, Wt.isFullyLoadedTab)(t, e)) {
            var i = t.tabs[e];
            delete i.searchDay, i.searchOffset = 0, i.searchAllLoaded = !1
        }
        return Promise.resolve(t)
    }

    function _e(e, t) {
        var i = t.tabs[e];
        return i.inplaceSearch = !0, Promise.resolve(t)
    }

    function ge(e, t) {
        var i = t.tabs[e],
            a = "";
        if (_e(e, t), i.searchDay && (a = "day:" + i.searchDay), !a && !i.searchText) return Promise.reject();
        var r = "in:" + e + " " + a + " " + (i.searchText || "");
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_search",
            q: r,
            from: "in",
            gid: t.gid,
            hash: t.writeHash,
            offset: i.searchOffset || 0
        }).then(function(e) {
            var t = At(e, 3),
                a = t[0],
                r = t[1],
                n = t[2];
            return i.searchOffset = r, i.searchAllLoaded = n, a
        })
    }

    function ve(e) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_important",
            offset: e,
            part: e > 0
        })
    }

    function be(e, t) {
        var i = (0, Vt.getTab)(e, t);
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_load_lastmsg",
            peerId: t,
            gid: e.get().gid
        }).then(function(a) {
            var r = At(a, 2),
                n = r[0],
                o = r[1];
            i.lastmsg = n[0] || !1, i.lastmsg_meta = n;
            var s = At(o, 3);
            i.unread = s[0], i.in_up_to = s[1], i.out_up_to = s[2], i.unread || (e.get().dialog_tabs[Gt.FOLDER_UNREAD] = e.get().dialog_tabs[Gt.FOLDER_UNREAD].filter(function(e) {
                return e != t
            })), L(e.get(), i, !1, P.bind(null, t), ot.bind(null, e.get()))
        })
    }

    function Ce(e, t, i) {
        if ((0, Wt.isFullyLoadedTab)(i, t)) {
            var a = i.tabs[t];
            a.deleted = a.deleted ? a.deleted.concat(e) : e
        }
        return Promise.resolve(i)
    }

    function ye(e, t, i) {
        if ((0, Wt.isFullyLoadedTab)(i, t)) {
            var a = i.tabs[t];
            a.history = (0, Wt.removeMessages)(e, u(a.history)), a.offset -= e.filter(function(e) {
                return a.msgs[e]
            }).length, e.forEach(function(e) {
                return delete a.msgs[e]
            }), e.forEach(function(e) {
                var t = (i.selectedMessages || []).indexOf(e); - 1 != t && i.selectedMessages.splice(t, 1)
            })
        }
        return Promise.resolve(i)
    }

    function we(e, t, i, a, r) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_mark",
            peer: t,
            hash: i,
            gid: r,
            msgs_ids: e.join(","),
            mark: a
        })
    }

    function ke(e, t, i, a) {
        if ((0, Wt.isFullyLoadedTab)(a, t)) {
            var r = a.tabs[t];
            r.deleted = r.deleted ? r.deleted.concat(e) : e, r.history = (0, Wt.removeMessagesWithRestore)(e, t, i, u(r.history)), r.offset -= e.filter(function(e) {
                return r.msgs[e]
            }).length
        }
        return Promise.resolve(a)
    }

    function Ne(e, t, i) {
        if ((0, Wt.isFullyLoadedTab)(i, t)) {
            var a = i.tabs[t];
            a.deleted && (a.deleted = a.deleted.filter(function(t) {
                return t !== e
            })), a.history = (0, Wt.restoreMessage)(e, t, u(a.history)), a.offset++
        }
        return Promise.resolve(i)
    }

    function Te(e, t, i, a) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_restore",
            id: e,
            peer: t,
            hash: i,
            gid: a
        })
    }

    function Fe(e, t, i) {
        return t && (i.pendingForward = null, e || (e = {
                msgIds: []
            }), t.addAttach("mail", e.msgIds.join(";"), e.object || null)),
            Promise.resolve(i)
    }

    function Ee(e, t) {
        return t.pendingForward = e, Promise.resolve(t)
    }

    function xe(e, t, i) {
        if ((0, Wt.isTabLoaded)(i, e)) {
            i.blockedFlagUpdates || (i.blockedFlagUpdates = {}), i.blockedFlagUpdates[e] = !0, L(i, i.tabs[e], !0, function(t) {
                return t.filter(function(t) {
                    return t !== e
                })
            }), i.tabs[e].unread > 0 && B(i, -1, e);
            var a = i.tabs[e];
            a.deletedDialog = !0;
            var r = i.tabbedPeers.filter(function(t) {
                return t.peer !== e
            });
            return ht(r, !0, i), t.then(function(t) {
                var r = At(t, 2);
                return r[0], r[1], delete i.blockedFlagUpdates[e], a.msgs = null, a.history = null, a.unread = 0, a.lastmsg = !1, a.lastmsg_meta = null, i
            })
        }
    }

    function Se(e, t, i) {
        return i.tabs[e].tab = t, Promise.resolve(i)
    }

    function Ie(e, t) {
        if (isEmpty(e)) return Promise.resolve(t);
        var i = Object.keys(e).map(function(t) {
            return t + ":" + e[t].join(",")
        }).join(";");
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_load_member",
            need: i
        }).then(function(e) {
            var i = At(e, 1),
                a = i[0];
            return a.forEach(function(e) {
                return (0, Qt.oCacheAdd)(t, e)
            }), t
        })
    }

    function Oe(e, t, i, a) {
        function r(e, t) {
            (0, Wt.isChatPeer)(e) && t && !(0, Qt.oCacheExists)(a, t) && (n[e] ? -1 === n[e].indexOf(t) && n[e].push(t) : n[e] = [t])
        }
        var n = {},
            o = t.filter(function(e) {
                return !(0, Wt.isTabLoaded)(a, e.peerId)
            }).map(function(e) {
                return p(e.peerId, 0, 0, 0, a)
            });
        t.forEach(function(e) {
            (0, Wt.isTabLoaded)(a, e.peerId) && r(e.peerId, e.userId)
        }), e.forEach(function(e) {
            r(e.peerId, +e.kludges.source_mid)
        });
        var s = t.filter(function(e) {
            return e.flags & Ht.FLAG_OUTBOUND && !e.local
        }).map(function(e) {
            return e.kludges.from_admin
        }).filter(function(e) {
            return e && !a.admins[e]
        });
        return 0 === Object.keys(n).length && 0 === s.length && 0 === o.length ? Promise.resolve(a) : (i.pause(), Promise.all([Ie(n, a), M(s, a), Promise.all(o)])["catch"](function() {
            return a
        }).then(function() {
            return i.resume()
        }).then(function() {
            return a
        }))
    }

    function Le(e, t, i, a) {
        return t !== vk.id ? Promise.resolve(a) : ((0, Wt.isTabLoaded)(a, i) && a.peer == i && (a = k(a)), Promise.resolve(a))
    }

    function Me(e, t, i) {
        var a = i.mutedPeers.filter(function(t) {
            return t !== e
        });
        return t && a.push(e), i.mutedPeers = a, cur.mutedPeers = i.mutedPeers, k(i)
    }

    function Re(e, t) {
        return t.stack = e, Promise.resolve(t)
    }

    function Pe(e, t, i, a) {
        if ((0, Wt.isFullyLoadedTab)(a, t)) {
            var r = a.tabs[t];
            e.filter(function(e) {
                return r.msgs[e]
            }).forEach(function(e) {
                var n = (0, Vt.getMessage)(a, t, e),
                    o = i ? n.flags | Ht.FLAG_IMPORTANT : n.flags & ~Ht.FLAG_IMPORTANT;
                n.flags = o, r.msgs[e] = n, r.history = (0, Wt.updateStar)(e, i, u(r.history))
            })
        }
        return Promise.resolve(a)
    }

    function Ae(e, t, i) {
        i.importants || (i.importants = {});
        var a = i.importants[t] || 0;
        return a !== e && (i.important_cnt += e, i.importants[t] = e), Promise.resolve(i)
    }

    function De(e, t) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_spam",
            offset: e,
            gid: t,
            part: e > 0
        })
    }

    function Be(e, t) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_flush_spam",
            gid: t,
            hash: e
        })
    }

    function je(e, t, i) {
        return i.creationType = e, i.creationFilter = t, Promise.resolve(i)
    }

    function He(e, t) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_owner_photo",
            photo: JSON.parse(e).data[0],
            peer: t
        })
    }

    function qe(e, t) {
        return t.next_chat_avatar = e, Promise.resolve(t)
    }

    function ze(e, t, i) {
        return (0, Dt.post)("al_page.php", {
            act: "owner_photo_save",
            peer: e,
            _query: t
        }).then(function(e) {
            return i
        })
    }

    function Ue(e, t, i, a) {
        return a.creating = !0, a.longpoll.pause(), (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_multi_start",
            hash: a.writeHash,
            peers: t.join(","),
            title: i
        }).then(function(e) {
            var t = At(e, 1),
                i = t[0];
            return a.next_peer = i.peerId, a.tabs[i.peerId] = i, L(a, i, !1, function(e) {
                return [i.peerId].concat(e)
            }), a.longpoll.resume(), a
        }).then(function(t) {
            return e ? ze(t.next_peer, e, t) : t
        }).then(function(e) {
            return e.creating = !1, e
        })["catch"](function(e) {
            throw a.creating = !1, a.longpoll.resume(), e
        })
    }

    function We(e) {
        var t = void 0;
        e.resync_in_process = new Promise(function(e) {
            t = e
        });
        var i = Object.keys(e.tabs).length,
            a = e.active_tab;
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_resync",
            sel: e.peer,
            gid: e.gid,
            loaded: i,
            tab: a,
            add_peers: e.tabbedPeers.map(function(e) {
                return e.peer
            }).join(",")
        }).then(function(i) {
            var n = At(i, 5),
                o = n[0],
                s = n[1],
                c = n[2],
                l = n[3],
                d = n[4];
            s.forEach(function(t) {
                return (0, Qt.oCacheAdd)(e, t)
            }), (0, Wt.normalizeTabsGotFromServer)(e, o), c.user_unread && handlePageCount("msg", c.user_unread), (0, zt.lplog)("Resync success", "success");
            var f = e.peer,
                h = void 0;
            if ((0, Wt.isReservedPeer)(f)) h = Promise.resolve(!1);
            else {
                var p = {
                    tabs: r({}, f, e.tabs[f]),
                    oCache: {}
                };
                h = U(r({}, f, o[f]), p)
            }
            return h.then(function(i) {
                e.tabs = o, e.admins = extend(e.admins, l), i && (e.tabs[f] = i.tabs[f], e.tabs[f].history = (0, Wt.restoreQueue)(f, e, u(e.tabs[f].history))), e.loadingDialogs = !1, e.mutedPeers = c.mutedPeers, e.lastDialogsOptions = {
                    has_more: c.has_more
                }, e.dialog_tab_cts = c.folder_cts, e.dialog_tabs[a] = d.map(intval);
                var r = e.dialog_tabs[a].map(function(t) {
                    return e.tabs[t]
                });
                return Object.keys(e.dialog_tabs).filter(function(e) {
                    return e != a
                }).forEach(function(t) {
                    a == Gt.FOLDER_ALL ? e.dialog_tabs[t] = r.filter(it(t)).map(function(e) {
                        return e.peerId
                    }) : e.dialog_tabs[t] = []
                }), delete e.resync_in_process, setTimeout(t.bind(null, !0), 0), $e(intval(c.unread), e)
            })
        })["catch"](function(t) {
            return (0, zt.lplog)("Resync error: " + t.message + " " + t.stack, "error"), (0, qt.pause)(2).then(We.bind(null, e))
        })
    }

    function Ge(e, t, i, a) {
        if ((0, Wt.isTabLoaded)(a, e)) {
            var r = a.tabs[e];
            l(r.memberIds, i), r.membersCount++, i === vk.id && (r.data.kicked = 0, r.data.closed = 0)
        }
        return Promise.resolve(a)
    }

    function Ve(e, t, i, a) {
        if ((0, Wt.isTabLoaded)(a, e)) {
            var r = a.tabs[e];
            d(r.memberIds, i), r.membersCount--, i === vk.id && (t == i ? r.data.closed = 1 : r.data.kicked = 1)
        }
        return Promise.resolve(a)
    }

    function Ke(e, t) {
        return t.lockedSending = e, Promise.resolve(t)
    }

    function Qe(e, t, i) {
        return e && !i.delayed_message ? (i.delayed_message = e, i.delayed_ts = t) : e || (i.delayed_message = e, i.delayed_ts = t), Promise.resolve(i)
    }

    function Ye() {
        return window.Upload && Upload.options ? Object.keys(Upload.options).map(function(e) {
            return Upload.options[e]
        }).filter(function(e) {
            return e.xhr && 4 !== e.xhr.readyState && 0 !== e.xhr.readyState
        }).length > 0 : !1
    }

    function Xe(e) {
        var t = e.textMediaSelector;
        return !!t.urlAttachmentLoading || Ye()
    }

    function $e(e, t) {
        return t.unread_cnt = e, t.dialog_tab_cts[Gt.FOLDER_UNREAD] = e, Promise.resolve(t)
    }

    function Je(e, t) {
        return t.ctrl_submit = !!e, (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_save_ctrl_submit",
            to: t.peer,
            hash: t.tabs[t.peer].hash,
            value: e ? 1 : 0
        }).then(function(e) {
            return t
        })
    }

    function Ze(e, t, i) {
        return function() {
            i.update_old_title = e;
            var a = Object.keys(i.cur_unread_cnt).length;
            if (0 === a) return document.title = e ? e : document.title, setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), clearInterval(i.update_title_to), void(i.update_title_to = !1);
            if (e) document.title = e, setFavIcon("/images/icons/favicons/fav_im" + t + ".ico"), e = !1;
            else {
                e = document.title;
                var r = a > 9 ? 10 : a;
                setFavIcon("/images/icons/favicons/fav_im" + r + t + ".ico"), document.title = winToUtf(getLang("mail_im_new_messages", a))
            }
        }
    }

    function et(e, t, i) {
        i.cur_unread_cnt || (i.cur_unread_cnt = {}), t && !inArray(e, i.mutedPeers) && (i.cur_unread_cnt[e] = !0);
        var a = document.title,
            r = window.devicePixelRatio >= 2 ? "_2x" : "";
        if (t && !i.update_title_to) {
            var n = Ze(a, r, i);
            i.update_title_to = setInterval(n, 1e3), n()
        } else !t && i.update_old_title && (document.title = i.update_old_title, i.cur_unread_cnt = {}, a = !1, i.update_old_title = !1, setFavIcon("/images/icons/favicons/fav_im" + r + ".ico"), clearInterval(i.update_title_to), i.update_title_to = !1);
        return Promise.resolve(i)
    }

    function tt(e, t, i, a, r) {
        return (0, Wt.isFullyLoadedTab)(r, e) && (r.tabs[e].scrollTop = intval(t), r.tabs[e].scrollBottom = intval(i), r.tabs[e].contHeight = intval(a)), Promise.resolve(r)
    }

    function it(e) {
        return e === Gt.FOLDER_ALL ? function() {
            return !0
        } : e === Gt.FOLDER_UNREAD ? function(e) {
            return e.unread > 0
        } : function(t) {
            return t.folders & Gt.FOLDER_MASKS[e]
        }
    }

    function at(e, t) {
        t.active_tab = e, (0, Bt.updateLocation)({
            tab: e === Gt.FOLDER_ALL ? null : e
        });
        var i = [];
        if (e !== Gt.FOLDER_ALL && !(0, Wt.isReversedDialogs)(t)) {
            var a = t.dialog_tabs[e];
            i = t.dialog_tabs[Gt.FOLDER_ALL].map(function(e) {
                return t.tabs[e]
            }).filter(it(e)).map(function(e) {
                return e.peerId
            }), t.dialog_tabs[e] = a.length >= i.length ? a : i
        }
        return Promise.resolve(t)
    }

    function rt(e, t, i) {
        return e === Ht.SET_DIRECTORIES && i.folders & t ? !1 : e !== Ht.RESET_DIRECTORIES || i.folders & t ? !0 : !1
    }

    function nt(e, t, i) {
        return t !== Ht.RESET_DIRECTORIES || e.folders & Gt.FOLDER_MASKS[i] ? t === Ht.REPLACE_DIRECTORIES ? e.folders & Gt.FOLDER_MASKS[i] ? -1 : 1 : t === Ht.SET_DIRECTORIES ? 1 : -1 : 0
    }

    function ot(e, t, i, a) {
        var r = e.dialog_tabs_all;
        if (r[Gt.FOLDER_ALL] || r[t]) return !0;
        if (i.filter(function(e) {
                return e === a.peerId
            }).length > 0) return !0;
        if ("r" === a.lastmsg[0]) return !0;
        var n = i.map(function(t) {
            return e.tabs[t.toString()]
        }).filter(function(t) {
            return (0, Wt.isReversedDialogs)(e) ? t.lastmsg > a.lastmsg : t.lastmsg < a.lastmsg
        });
        return n.length > 0 ? !0 : !1
    }

    function st(e, t, i, a, r) {
        if ((0, Wt.isTabLoaded)(r, e)) {
            var n = r.tabs[e];
            return i === Ht.REPLACE_DIRECTORIES && (t ^= n.folders), rt(i, t, n) && Object.keys(Gt.FOLDER_MASKS).filter(function(e) {
                return Gt.FOLDER_MASKS[e] & t
            }).forEach(function(e) {
                r.dialog_tab_cts[e] += nt(n, i, e)
            }), i === Ht.SET_DIRECTORIES ? r.tabs[e].folders |= t : i === Ht.RESET_DIRECTORIES ? r.tabs[e].folders &= ~t : r.tabs[e].folders = t ^= n.folders, L(r, r.tabs[e], !0, function(t, i) {
                return t.concat([e]).map(function(e) {
                    return r.tabs[e]
                }).filter(it(i)).map(function(e) {
                    return e.peerId
                })
            }, ot.bind(null, r)), Promise.resolve(r)
        }
        return p(e, 0, 0, 0, r).then(st.bind(null, e, t, i, r))
    }

    function ct(e) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_get_mutex_key",
            gid: e
        })
    }

    function ut(e, t) {
        return h(r({}, e, {
            free: !0
        }), t), (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_block_release",
            peer: e,
            gid: t.gid
        }).then(function() {
            return t
        })
    }

    function lt(e, t) {
        var i = ls.get("comm_mute_" + t.gid) ? 1 : 0;
        return e && (i = 1 ^ i), ls.set("comm_mute_" + t.gid, i), t.mute = i, Promise.resolve(t)
    }

    function dt(e, t, i, a) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_restore_dialog",
            hash: t,
            gid: a.gid,
            spam: i ? 1 : 0,
            peer: e
        }).then(function(t) {
            return a.tabs[e].deletedDialog = !1, L(a, a.tabs[e], !1, function(t) {
                return [e].concat(t)
            }), a.tabs[e].unread = t, a
        })
    }

    function ft(e, t, i) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_spam_dialog",
            peer: e,
            gid: i.gid,
            hash: t
        })
    }

    function ht(e, t, i) {
        return i.tabbedPeers = e, (0, Wt.isClassicInterface)(i) && (ti({
            peers: i.tabbedPeers.filter(function(e) {
                var t = e.peer,
                    a = e.type;
                return t !== i.peer && "perm" === a
            }).map(function(e) {
                return (0, Wt.getBareTab)(e.peer, i)
            }).filter(function(e) {
                return !e.deletedDialog
            }).map(function(e) {
                return e.peerId
            }).map(Wt.convertPeerToUrl).join("_")
        }), t && ii()), Promise.resolve(i)
    }

    function pt(e) {
        return e.peer ? he(e.peer, e) ? fe(e.peer, e) : (0, Wt.isFullyLoadedTab)(e, e.peer) ? e.tabs[e.peer].allShown : !1 : !0
    }

    function mt(e, t) {
        var i = t.tabs[e];
        return (0, Wt.isFullyLoadedTab)(t, e) && (i.skipped = null, i.msgs = null, i.offset = null, i.allShown = null, i.history = null), Promise.resolve(t)
    }

    function _t(e, t) {
        var i = t.tabs[e];
        return (0, Wt.isFullyLoadedTab)(t, e) && (i.history = f(i.history)), Promise.resolve(t)
    }

    function gt(e, t) {
        return t.go_to_end_visible = e, Promise.resolve(t)
    }

    function vt(e, t, i) {
        if (!(0, Wt.isCommunityPeer)(t)) return Promise.resolve(i);
        var a = (0, Vt.getTab)(i, t);
        return a.blocked_community = !e, (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_toggle_community",
            peer_id: t,
            hash: a.hash,
            state: e ? 1 : 0
        }).then(function() {
            return k(i)
        })
    }

    function bt(e, t) {
        if (0 !== t.peer && (0, Wt.isFullyLoadedTab)(t, t.peer)) {
            var i = (0, Vt.getTab)(t, t.peer);
            i.history = u(i.history), e(i.history)
        }
        return Promise.resolve(t)
    }

    function Ct(e) {
        return e.audio_msg.isRecording ? Promise.reject() : (e.audio_msg.isRecording = !0, Promise.resolve(e))
    }

    function yt(e) {
        return e.audio_msg.isRecording = !1, Promise.resolve(e)
    }

    function wt(e, t) {
        return t.voice_message_available = e, Promise.resolve(t)
    }

    function kt(e) {
        ti({
            act: e ? "create" : null
        }), ii()
    }

    function Nt() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
        ti({
            q: e
        }), ii()
    }

    function Tt(e) {
        return "undefined" == typeof e.chatResizeInitialized && (e.chatResizeInitialized = !0, (0, Wt.getClassicChatHeight)() > window.clientHeight() && (0, Wt.setClassicChatHeight)(0)), Promise.resolve(e)
    }

    function Ft(e, t, i) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_join_chat",
            chat_id: e,
            hash: t,
            write_hash: i.writeHash
        }).then(function(e) {
            var t = At(e, 4),
                a = t[0],
                r = t[1],
                n = t[2],
                o = t[3];
            return n.forEach(function(e) {
                return (0, Qt.oCacheAdd)(i, e)
            }), i.tabs[a] = r, L(i, r, !1, P.bind(null, a), ot.bind(null, i)), i.admins = extend(i.admins, o), [a]
        })
    }

    function Et(e, t) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_reset_link",
            chat_id: e,
            write_hash: t.writeHash
        })
    }

    function xt(e) {
        return ai({
            invite_chat_id: null,
            invite_hash: null
        }), e.invitation = void 0, Promise.resolve(e)
    }

    function St(e, t) {
        var i = (0, zt.arrayUnique)([e].concat(t.select(Ut.RECENT_SEARCH_OP))).slice(0, 500);
        t.update(Ut.RECENT_SEARCH_OP, i)
    }

    function It(e) {
        e.update(Ut.RECENT_SEARCH_OP, [])
    }

    function Ot(e, t) {
        var i = t.select(Ut.RECENT_SEARCH_OP).filter(function(t) {
            return t !== e
        });
        return t.update(Ut.RECENT_SEARCH_OP, i), i
    }

    function Lt(e, t, i) {
        var a = i.tabs[t],
            r = (0, Vt.getMessage)(i, t, e);
        return a.data.kicked || a.data.closed || r.kludges.source_act || (a.pinned = r), Promise.resolve(i)
    }

    function Mt(e, t) {
        var i = t.tabs[e];
        return i.pinned = null, Promise.resolve(t)
    }

    function Rt(e, t, i, a) {
        var n = (0, Vt.getMessage)(e, i, t),
            o = n.userId;
        return (0, Qt.oCacheGet)(a, o) ? Promise.resolve(a) : Ie(r({}, i, [o]), a)
    }

    function Pt() {
        ajax.post("al_im.php", {
            act: "a_hide_promo_tooltip"
        })
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.getMessageLocalId = t.getPinnedMessage = t.unpinMessage = t.pinMessage = t.deleteDialog = t.markDialogAnswered = t.toggleDialogImportant = t.favMessage = t.toggleMutePeer = t.returnToChat = t.leaveChat = t.updateChatPhoto = t.addNewMember = t.updateChatTopic = t.flushHistory = t.sendTyping = t.searchLocalHints = t.searchTopConv = t.deliverEditedMessage = t.deliverMessage = t.readLastMessages = t.ACTION_PRIORITIES = t.TYPING_PERIOD = void 0;
    var At = function() {
        function e(e, t) {
            var i = [],
                a = !0,
                r = !1,
                n = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (i.push(o.value), !t || i.length !== t); a = !0);
            } catch (c) {
                r = !0, n = c
            } finally {
                try {
                    !a && s["return"] && s["return"]()
                } finally {
                    if (r) throw n
                }
            }
            return i
        }
        return function(t, i) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, i);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.strHistory = f, t.updateBlockStates = h, t.loadPeer = p, t.restoreHistoryQueue = m, t.removeFailed = _, t.selectPeer = v, t.selectPeerOnMessage = C, t.changePeer = y, t.updateMentions = w, t.setActions = k, t.loadMoreHistory = N, t.loadLessHistory = T, t.createEmailChat = E, t.loadLongPollKey = x, t.loadLongPollTs = S, t.setMessageErrored = I, t.resendMessage = O, t.loadAdmins = M, t.editMessage = A, t.addMessage = D, t.markInboundMessagesAsRead = j, t.markOutboundMessagesAsRead = H, t.initTextStore = q, t.processFwd = z, t.mergeTabs = U, t.updateOnline = W, t.setTyping = G, t.waitTyping = V, t.addSelection = Q, t.cleanSelected = Y, t.dropSelection = X, t.replaceMessage = $, t.saveMedia = J, t.loadMedia = Z, t.addAttachmentsToStoreData = ee, t.replaceMediaAttachesStore = te, t.setCurrentSearchDate = ie, t.setCurrentSearch = ae, t.searchHints = re, t.searchHintsIndex = ne, t.localIndexToDialog = oe, t.preloadSearchIndex = ue, t.loadDialogs = le, t.searchMessages = de, t.isSearchAllLoaded = fe, t.isSearchingInplace = he, t.cancelSearch = pe, t.clearDate = me, t.searchInplaceStart = _e, t.searchMessagesInplace = ge, t.loadImportant = ve, t.loadActualLastMessage = be, t.removeMessagesMarkDeleted = Ce, t.removeMessages = ye, t.removeMessageSend = we, t.removeMessagesWithRestore = ke, t.restoreMessage = Ne, t.restoreMessageSend = Te, t.forwardMessages = Fe, t.prepareForward = Ee, t.deletedDialog = xe, t.setChatTitle = Se, t.loadChatMember = Ie, t.checkNewPeople = Oe, t.updateActions = Le, t.setMutedPeer = Me, t.setExecStack = Re, t.updateFavMessage = Pe, t.updateImportant = Ae, t.loadSpam = De, t.flushSpam = Be, t.setCreationType = je, t.getOwnerPhoto = He, t.presetAvatar = qe, t.setChatPhoto = ze, t.createChat = Ue, t.resync = We, t.chatUserHasJoined = Ge, t.chatUserHasLeft = Ve, t.toggleSendingAbility = Ke, t.setDelayedMessage = Qe, t.isAnythingLoading = Xe, t.updateUnreadCount = $e, t.changeSubmitSettings = Je, t.updateFavAndTitle = et, t.saveHistoryScroll = tt, t.filterFromTab = it, t.changeDialogsTab = at, t.updateFolderState = st, t.getMutexQueue = ct, t.releaseBlock = ut, t.toggleCommunityMute = lt, t.restoreDialog = dt, t.spamDialog = ft, t.updateTabbedPeers = ht, t.isEverythingLoaded = pt, t.cleanTab = mt, t.stringifyTab = _t, t.updateGoToEndVisibility = gt, t.toggleCommunityMessages = vt, t.updateHistory = bt, t.startRecording = Ct, t.cancelRecording = yt, t.setVoiceMessageAvail = wt, t.toggleConversation = kt, t.updateSearchQuery = Nt, t.initializeChatResize = Tt, t.joinChat = Ft, t.resetInviteLink = Et, t.leaveInvitation = xt, t.saveRecentSearchPeer = St, t.resetRecentSearch = It, t.removeFromRecentSearch = Ot, t.pinMessageOptimistic = Lt, t.unpinMessageOptimistic = Mt, t.checkChatMember = Rt, t.hidePromoTooltip = Pt;
    var Dt = i(15),
        Bt = i(91),
        jt = i(59),
        Ht = a(jt),
        qt = i(7),
        zt = i(62),
        Ut = i(140),
        Wt = i(22),
        Gt = i(2),
        Vt = i(123),
        Kt = i(37),
        Qt = i(12),
        Yt = i(77),
        Xt = i(19),
        $t = t.TYPING_PERIOD = 5,
        Jt = 2e4,
        Zt = 8,
        ei = (0, Bt.updateLazyLocation)(),
        ti = ei.scheduleNav,
        ii = ei.commitNav,
        ai = ei.scheduleNavWithTimeOut,
        ri = t.ACTION_PRIORITIES = {
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
    t.readLastMessages = c(function(e, t) {
        var i = t.tabs[e],
            a = Object.keys(i.msgs).map(function(i) {
                return (0, Vt.getMessage)(t, e, i)
            }).filter(function(e) {
                return !(0, Kt.isOut)(e)
            }).map(function(e) {
                return e.messageId
            }).sort(function(e, t) {
                return t - e
            });
        return i.skipped > 0 && (a = a.filter(function(e) {
            return intval(e) <= i.lastmsg - i.skipped
        })), a = intval(a.shift()), a <= i.in_up_to ? Promise.resolve(t) : (t.longpoll.push([Ht.readInboundEvent([6, e, a])]), (0, Dt.post)(Dt.CONTROLLER, {
            peer: e,
            ids: [a],
            hash: i.hash,
            act: "a_mark_read",
            gid: t.gid
        }).then(function() {
            return F(t, e, a, Ht.FLAG_OUTBOUND)
        }))
    }), t.deliverMessage = c(function(e, t, i) {
        var a = Date.now() + rand(0, 100).toFixed(0),
            r = i.tabs[e];
        return (0, qt.retryFn)(Dt.post, 1)(Dt.CONTROLLER, {
            act: "a_send",
            to: e,
            hash: r.hash,
            msg: t.message,
            media: K(t.attaches),
            guid: a,
            share_url: t.share_url,
            random_id: t.rid,
            gid: i.gid,
            sticker_referrer: t.sticker_referrer
        }, Jt).then(function(e) {
            var t = At(e, 1),
                a = t[0];
            return i.version !== a.version && nav.reload({
                force: !0
            }), i
        })
    }), t.deliverEditedMessage = c(function(e, t, i) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_edit_message",
            hash: e.hash,
            id: t.messageId,
            peerId: e.peerId,
            gid: i.gid,
            msg: t.origText,
            media: K(t.attaches),
            share_url: t.share_url
        }, Jt).then(function(e) {
            var t = At(e, 1);
            return t[0], i
        })
    }), t.searchTopConv = ce(function(e) {
        return e.topConvTree
    }), t.searchLocalHints = ce(function(e) {
        return e.hintsTree
    }), t.sendTyping = c(function(e, t) {
        return t.tabs[e].lastTyping = Date.now(), (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_typing",
            peer: e,
            gid: t.gid,
            hash: t.tabs[e].hash
        }).then(function(e) {
            return t
        }, function(e) {
            return t
        })
    }), t.flushHistory = c(function(e, t) {
        return xe(e, (0, Dt.post)("al_im.php", {
            act: "a_flush_history",
            id: e,
            from: "im",
            gid: t.gid,
            hash: t.tabs[e].hash
        }), t)
    }), t.updateChatTopic = c(function(e, t, i) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_get_chat",
            chat: e - 2e9,
            new_title: t,
            hash: i.tabs[e].hash
        }).then(function(t) {
            var a = At(t, 2),
                r = (a[0], a[1]);
            return i.tabs[e] = extend(i.tabs[e], (0, Wt.normalizeTab)(i, r)), i
        })
    }), t.addNewMember = c(function(e, t, i) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_get_chat",
            chat: e - 2e9,
            new_peer: t.join(","),
            hash: i.tabs[e].hash
        }).then(function(t) {
            var a = At(t, 2),
                r = (a[0], a[1]);
            return i.tabs[e] = extend(i.tabs[e], (0, Wt.normalizeTab)(i, r)), i
        })
    }), t.updateChatPhoto = c(function(e, t) {
        return e.kludges.source_act === Wt.CHAT_PHOTO_REMOVE ? (delete t.tabs[e.peerId].photo, Promise.resolve(t)) : (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_get_chat_photo",
            msg_id: e.messageId
        }).then(function(i) {
            var a = At(i, 2),
                r = a[0],
                n = a[1];
            t.chat_photo_msg = n;
            var o = t.tabs[e.peerId];
            if (t.tabs[e.peerId].photo = r, (0, Wt.isFullyLoadedTab)(t, e.peerId)) {
                var s = e.kludges.source_act;
                o.history = (0, Wt.addChatPhotoToUpdate)(e, s, t, u(o.history))
            }
            return t
        })
    }), t.leaveChat = c(function(e, t) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_leave_chat",
            chat: e - 2e9,
            hash: t.tabs[e].hash
        }).then(Le.bind(null, Wt.CHAT_KICK_USER, vk.id, e, t))
    }), t.returnToChat = c(function(e, t) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_return_to_chat",
            chat: e - 2e9,
            hash: t.tabs[e].hash
        }).then(Le.bind(null, Wt.CHAT_INVITE_USER, vk.id, e, t))
    }), t.toggleMutePeer = c(function(e, t, i) {
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_mute",
            peer: e,
            hash: i.tabs[e].hash,
            gid: i.gid,
            value: t
        }).then(function() {
            var a = t ? "mute" : "unmute";
            return window.Notifier && Notifier.lcSend("im", {
                act: a,
                peer: e
            }), i
        }).then(Me.bind(null, e, t))
    }), t.favMessage = c(function(e, t, i, a) {
        return Pe(e, i, t, a), (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_mark_important",
            ids: e,
            val: t ? 1 : 0,
            from: "im",
            gid: a.gid,
            peer: i,
            hash: a.tabs[i].hash
        }).then(function(e) {
            return a
        })
    }), t.toggleDialogImportant = c(function(e, t) {
        var i = Gt.FOLDER_MASKS[Gt.FOLDER_IMPORTANT],
            a = t.tabs[e].folders & i,
            r = a ? Ht.resetDirectoriesEvent : Ht.setDirectoriesEvent;
        return t.longpoll.push([r([0, e, i, !0])]), (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_dialog_star",
            val: a ? 0 : 1,
            peer: e,
            hash: t.tabs[e].hash,
            gid: t.gid
        }).then(function() {
            return t
        })
    }), t.markDialogAnswered = c(function(e, t, i) {
        var a = Gt.FOLDER_MASKS[Gt.FOLDER_UNRESPOND];
        return i.longpoll.push([Ht.resetDirectoriesEvent([0, e, a, !0]), Ht.readInboundEvent([6, e, t])]), (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_mark_answered",
            peer: e,
            lastmsg: t,
            hash: i.tabs[e].hash,
            gid: i.gid
        }).then(function() {
            return i
        })
    }), t.deleteDialog = c(function(e, t) {
        return L(t, t.tabs[e], !0, function(t) {
            return t.filter(function(t) {
                return t !== e
            })
        }), t.tabs[e].deletedDialog = !0, (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_delete_dialog",
            peer: e,
            gid: t.gid,
            hash: t.tabs[e].hash
        }).then(function(i) {
            return i[0] ? (ht(t.tabbedPeers.filter(function(t) {
                return t.peer !== e
            }), !0, t), t.tabs[e].unread = 0, t.tabs[e].lastmsg = !1, t.tabs[e].lastmsg_meta = null) : (t.tabs[e].deletedDialog = !1, L(t, t.tabs[e], !1, P.bind(null, e), ot.bind(null, t))), i
        })
    }), t.pinMessage = c(function(e, t, i) {
        var a = i.tabs[t];
        return a.data.kicked || a.data.closed ? Promise.resolve(i) : (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_pin_message",
            msgid: e,
            chat: t,
            hash: i.tabs[t].hash
        }).then(function(e) {
            var r = At(e, 1),
                n = r[0];
            return i.tabs[t] = Object.assign({}, a, n), i
        })
    }), t.unpinMessage = c(function(e, t) {
        var i = t.tabs[e];
        return i.data.kicked || i.data.closed ? Promise.resolve(t) : (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_unpin_message",
            chat: e,
            hash: t.tabs[e].hash
        }).then(function(a) {
            var r = At(a, 1),
                n = r[0];
            return t.tabs[e] = Object.assign({}, i, n), t
        })
    }), t.getPinnedMessage = c(function(e, t) {
        var i = t.tabs[e];
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_get_pinned_message",
            chat: e,
            hash: t.tabs[e].hash
        }).then(function(e) {
            var a = At(e, 1),
                r = a[0];
            return i.pinned = r || null, t
        })
    }), t.getMessageLocalId = c(function(e, t, i) {
        var a = i.tabs[e];
        return (0, Dt.post)(Dt.CONTROLLER, {
            act: "a_get_message_local_id",
            chat: e,
            chat_local_id: t,
            hash: a.hash
        })
    })
}, function(e, t, i) {
    var a = i(72),
        r = i(41),
        n = i(1),
        o = i(53)("IE_PROTO"),
        s = function() {},
        c = "prototype",
        u = function() {
            var e, t = i(105)("iframe"),
                a = n.length,
                r = ">";
            for (t.style.display = "none", i(79).appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write("<script>document.F=Object</script" + r), e.close(), u = e.F; a--;) delete u[c][n[a]];
            return u()
        };
    e.exports = Object.create || function(e, t) {
        var i;
        return null !== e ? (s[c] = a(e), i = new s, s[c] = null, i[o] = e) : i = u(), void 0 === t ? i : r(i, t)
    }
}, function(e, t) {
    "use strict";

    function i(e, t) {
        return new Promise(function(i) {
            setTimeout(i.bind(null, t), 1e3 * e)
        })
    }

    function a(e, t) {
        var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            r = 0;
        return function n() {
            for (var o = arguments.length, s = Array(o), c = 0; o > c; c++) s[c] = arguments[c];
            return Promise.resolve().then(function() {
                return e.apply(void 0, s)
            })["catch"](function(e) {
                if (r++, t >= r) {
                    var o = "function" == typeof a ? a(r) : 0;
                    return 0 === o ? n.apply(void 0, s) : i(o).then(function() {
                        return n.apply(void 0, s)
                    })
                }
                throw e
            })
        }
    }

    function r(e, t, i) {
        var a = void 0,
            r = void 0;
        return function() {
            for (var n = arguments.length, o = Array(n), s = 0; n > s; s++) o[s] = arguments[s];
            return new Promise(function(e, n) {
                var s = function() {
                        a = null, r = null, i || e(o)
                    },
                    c = i && !a;
                clearTimeout(a), r && r.reject("debounce"), a = setTimeout(s, t), c ? e(o) : i && n("debounce"), r = {
                    resolve: e,
                    reject: n
                }
            }).then(function(t) {
                return e.apply(void 0, t)
            })
        }
    }

    function n(e, t) {
        var i = void 0,
            a = new Promise(function(a) {
                i = a, setTimeout(a.bind(null, t), 1e3 * e)
            });
        return {
            pause: function() {
                return a
            },
            abort: function() {
                i(t)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.pause = i, t.retryFn = a, t.debouncedPromise = r, t.abortablePause = n
}, , function(e, t, i) {
    var a = i(113),
        r = i(25),
        n = i(58),
        o = i(72),
        s = i(28),
        c = i(94);
    e.exports = function(e, t, i, u, l) {
        var d, f, h, p = l ? function() {
                return e
            } : c(e),
            m = a(i, u, t ? 2 : 1),
            _ = 0;
        if ("function" != typeof p) throw TypeError(e + " is not iterable!");
        if (n(p))
            for (d = s(e.length); d > _; _++) t ? m(o(f = e[_])[0], f[1]) : m(e[_]);
        else
            for (h = p.call(e); !(f = h.next()).done;) r(h, m, f.value, t)
    }
}, function(e, t, i) {
    "use strict";
    var a = i(48);
    e.exports = i(107)("Map", function(e) {
        return function() {
            return e(this, arguments.length > 0 ? arguments[0] : void 0)
        }
    }, {
        get: function(e) {
            var t = a.getEntry(this, e);
            return t && t.v
        },
        set: function(e, t) {
            return a.def(this, 0 === e ? 0 : e, t)
        }
    }, a, !0)
}, function(e, t, i) {
    var a = i(130),
        r = Math.max,
        n = Math.min;
    e.exports = function(e, t) {
        return e = a(e), 0 > e ? r(e + t, 0) : n(e, t)
    }
}, function(e, t, i) {
    "use strict";

    function a(e) {
        if (!e.first_name) {
            var t = e.name.split(" ", 2);
            e.first_name = t[0], e.short_name = t[1] ? t[0] + " " + t[1].substr(0, 1) + "." : t[0]
        }
        e.inv_name || (e.inv_name = e.name), e.kick_name || (e.kick_name = e.inv_name)
    }

    function r(e, t) {
        var i = (0, s.unpackStore)(e);
        return t in i.oCache
    }

    function n(e, t) {
        var i = (0, s.unpackStore)(e).oCache[t];
        return i && !i._n && (a(i), i._n = 1), i
    }

    function o(e, t) {
        var i = (0, s.unpackStore)(e);
        i.oCache || (i.oCache = {}), t.id && (i.oCache[t.id] = t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.oCacheExists = r, t.oCacheGet = n, t.oCacheAdd = o;
    var s = i(123)
}, , function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
    }
}, function(e, t) {
    "use strict";

    function i(e, t, i) {
        return t && (t.im_v = n), new Promise(function(a, r) {
            ajax.post(e, t, {
                timeout: i,
                onDone: function() {
                    a.apply(null, [
                        [].concat(Array.prototype.slice.call(arguments))
                    ])
                },
                onFail: function() {
                    return r.apply(null, arguments), !0
                }
            })
        })
    }

    function a(e, t) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            a = r(e, t, i),
            n = a.request;
        return n
    }

    function r(e, t) {
        function i() {
            r.abort()
        }
        var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            r = void 0;
        r = window.XDomainRequest ? new XDomainRequest : ajax._getreq();
        var n = new Promise(function(i, n) {
            var o = void 0,
                s = Date.now(),
                c = a.timeout || 60,
                u = ajx2q(t);
            if (window.XDomainRequest) r.open("get", e + "?" + u), r.ontimeout = function() {
                n(["", {}])
            }, r.onerror = function() {
                n(["", {}])
            }, r.onload = function() {
                i([r.responseText, {}])
            }, setTimeout(function() {
                r.send()
            }, 0);
            else {
                r.onreadystatechange = function() {
                    4 == r.readyState && (clearInterval(o), r.status >= 200 && r.status < 300 ? i([r.responseText, r]) : n([r.responseText, r]))
                };
                try {
                    r.open("GET", e + "?" + u, !0)
                } catch (l) {
                    return n([l, r])
                }
                r.send()
            }
            o = setInterval(function() {
                Date.now() - s > 1e3 * c && (n(["", {}]), clearInterval(o))
            }, 1e3)
        });
        return {
            request: n,
            cancel: i
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.post = i, t.plainget = a, t.plaingetCancelable = r;
    var n = (t.CONTROLLER = "al_im.php", 2)
}, function(e, t, i) {
    var a = i(39),
        r = i(100);
    e.exports = function(e) {
        return a(r(e))
    }
}, function(e, t) {
    "use strict";
    window.DesktopNotifications = {
        supported: function() {
            return !(!window.webkitNotifications && !window.Notification)
        },
        checkPermission: function() {
            return window.webkitNotifications ? webkitNotifications.checkPermission() : "granted" == Notification.permission ? 0 : 1
        },
        requestPermission: function(e) {
            (window.webkitNotifications || window.Notification).requestPermission(e)
        },
        createNotification: function(e, t, i) {
            var a = void 0;
            return window.webkitNotifications ? a = webkitNotifications.createNotification(e, t, i) : (a = new Notification(t, {
                icon: e,
                body: i
            }), a.cancel = function() {
                this.close()
            }, a.show = function() {}), vk.id % 100 < 10 && statlogsValueEvent("browser_notification", 0), a
        }
    }
}, function(e, t, i) {
    "use strict";
    var a = i(6),
        r = i(76),
        n = i(138),
        o = {};
    i(122)(o, i(93)("iterator"), function() {
        return this
    }), e.exports = function(e, t, i) {
        e.prototype = a(o, {
            next: r(1, i)
        }), n(e, t + " Iterator")
    }
}, function(e, t, i) {
    "use strict";

    function a(e, t) {
        if ((0, g.unpackStore)(e).searchShown) return !1;
        var i = (0, g.getTab)(e, t),
            a = i && (0, g.parserMessage)(i.pinned);
        return a ? i.pinHideId != a.chat_local_id : !1
    }

    function r(e, t, i) {
        var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
            r = (0, g.getTab)(e, t),
            n = r && (0, g.parserMessage)(r.pinned);
        r && n && (r.pinHideId = n.chat_local_id, cur.imDb.update(b.PIN_HIDDEN_ID_OP, [r.peerId, r.pinHideId]), c(i, t, e), re(geByClass1("_im_pinned_tt")), a && window.Notifier && Notifier.lcSend("pin_hide", {
            hide: 1,
            peer: t
        }), statlogsValueEvent("im_pinned_messages", "hide"))
    }

    function n(e, t, i) {
        var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
            r = (0, g.getTab)(e, t);
        r && (delete r.pinHideId, cur.imDb.update(b.PIN_HIDDEN_ID_OP, [r.peerId, void 0]), c(i, t, e), a && window.Notifier && Notifier.lcSend("pin_hide", {
            hide: 0,
            peer: t
        }), statlogsValueEvent("im_pinned_messages", "show"))
    }

    function o(e, t, i) {
        var a = c.bind(null, i, t),
            r = (0, _.showUnpinDialog)(function() {
                r.hideProgress(), r.hide(), e.set(h.unpinMessageOptimistic.bind(null, t)).then(a).then(function(e) {
                    return e.set(h.unpinMessage.bind(null, t))
                }).then(a)
            })
    }

    function s(e, t, i) {
        var a = e.get(),
            n = a.peer,
            o = (0, g.parserMessage)((0, g.getTab)(e, n).pinned);
        if (i.target.classList.contains(C)) o && r(e, n, t);
        else if ("A" !== i.target.tagName) {
            var s = o && o.messageId;
            if (s && !(0, _.isAlreadyDeleted)(e, n, s)) {
                var c = e.get(),
                    u = (0, g.getMessage)(e, n, s);
                u ? (e.setState({
                    msgid: s
                }), (0, v.updateLocation)({
                    msgid: s
                }), t().focusOnMessage()) : c.longpoll.push([(0, p.changePeer)(n, s)])
            } else(0, _.showPinnedBox)(e, t, n, m.mount, i);
            statlogsValueEvent("im_pinned_messages", "open")
        }
    }

    function c(e, t, i) {
        return e().updateChatTopic(t, i), (0, h.setActions)(i.get()), e().updateActions(i), i
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

    function l(e) {
        return {
            unmount: function() {
                (0, f.destroyModule)(e)
            }
        }
    }

    function d(e, t, i) {
        var a = (0, f.createMutations)(l),
            r = a.bindMutations,
            n = s.bind(null, t, i),
            o = u.bind(null),
            c = (0, f.createModule)({
                handlers: function(t, i) {
                    i(e, "click", y, n), i(e, "mouseover", C, o)
                }
            });
        return r(c)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.isPinnedMessageVisibleInTab = a, t.pinnedMessageHide = r, t.pinnedMessageUnHide = n, t.pinnedMessageUnpin = o, t.mount = d;
    var f = i(27),
        h = i(5),
        p = i(59),
        m = i(104),
        _ = i(22),
        g = i(123),
        v = i(91),
        b = i(140),
        C = "_im_pin_hide",
        y = "_im_pinned_message"
}, function(e, t, i) {
    var a = i(88),
        r = i(16),
        n = i(43)(!1),
        o = i(53)("IE_PROTO");
    e.exports = function(e, t) {
        var i, s = r(e),
            c = 0,
            u = [];
        for (i in s) i != o && a(s, i) && u.push(i);
        for (; t.length > c;) a(s, i = t[c++]) && (~n(u, i) || u.push(i));
        return u
    }
}, , function(e, t, i) {
    "use strict";

    function a(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function r(e, t, i) {
        return t in e ? Object.defineProperty(e, t, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = i, e
    }

    function n() {
        var e = Vt.get(Ui);
        return e || 0
    }

    function o(e) {
        e >= window.clientHeight() - 30 && (e = 0), Vt.set(Ui, e)
    }

    function s(e, t) {
        var i = ci(e, t),
            a = i.firstElementChild.offsetHeight !== i.parentNode.offsetHeight;
        a && mi(i.firstElementChild, {
            height: i.parentNode.offsetHeight
        })
    }

    function c(e, t) {
        e && e.innerHTML !== t && (e.innerHTML = t)
    }

    function u(e, t) {
        var i = window.devicePixelRatio >= 2 ? "256" : "128";
        return t ? '<div class="im_sticker_row">\n      <a onmouseover="return Emoji.stickerOver(' + Jt(e) + ', this);"\n        onclick="return Emoji.clickSticker(' + Jt(t) + ', this, event);">\n          <img height="128"\n            class="im_gift"\n            src="/images/stickers/' + Jt(e) + "/" + i + '.png"/>\n      </a>\n    </div>' : '<div class="im_sticker_row">\n      <img height="128"\n        class="im_gift"\n        src="/images/stickers/' + Jt(e) + "/" + i + '.png"/>\n    </div>'
    }

    function l(e, t, i) {
        var a = e.get ? e.get() : e;
        if (L(a, t)) {
            var r = a.tabs[t].deleted || [];
            return $t(i, r)
        }
        return !1
    }

    function d(e, t, i) {
        var a = i.randomId,
            r = ci("_im_mess_rid" + a, t);
        return r && (t = te([r], t), t = y(e, i, t, !0, !1)), t
    }

    function f(e) {
        var t = (0, mt.checkVoiceMessageAvailable)(e);
        return "undefined" != typeof t ? Promise.resolve(t) : h().then(function(e) {
            return e.length > 0
        })["catch"](function(e) {
            return !1
        })
    }

    function h() {
        return window.AudioContext && navigator.mediaDevices ? navigator.mediaDevices.enumerateDevices().then(function(e) {
            for (var t = [], i = 0; i < e.length; i++) "audioinput" == e[i].kind && t.push(e[i]);
            return t
        }) : Promise.reject(new Error("NotSupported"))
    }

    function p(e) {
        return gi("im_preloader", {
            preloader: Yt(Gt.pr_tpl, {
                id: ""
            }),
            cls: "im-preloader_attach im-preloader_visible im-preloader_" + e
        })
    }

    function m(e) {
        var t = e.split(".");
        return (t[0] < 10 ? "0" : "") + t[0] + (t[1] < 10 ? "0" : "") + t[1] + t[2]
    }

    function _(e) {
        var t = ci("_im_invisible_bar", e);
        t && (di(t, "_im_invisible_bar"), di(t, "im-page--history-new-bar_hide"))
    }

    function g(e, t, i) {
        var a = v(e, t),
            r = ci("_im_mess_" + t.messageId, i);
        return r && (r.parentNode.replaceChild(Kt(a), r), C(i)), i
    }

    function v(e, t) {
        var i = ["_im_mess"],
            a = (0, Ct.isUnread)(e.tabs[t.peerId], t);
        (0, Ct.isOut)(t) && a && i.push("im-mess_unread _im_mess_unread"), (0, Ct.isOut)(t) && i.push("im-mess_out"), (0, Ct.wasEdited)(t) && i.push("im-mess_was_edited"), (0, Et.canMessageBeEdited)(e, t) && i.push("im-mess_editable"), (0, Ct.isImportant)(t) && i.push("im-mess_fav"), -1 != (e.selectedMessages || []).indexOf(t.messageId) && i.push("im-mess_selected");
        var r = Date.now() - 1e3 * t.date > 1e3;
        t.local && r && i.push("im-mess_sending"), t.local && i.push("" + St), t.local && (0, Ct.wasEdited)(t) && !a && i.push("im-mess_unread im-mess_nobg"), t.failed && i.push("im-mess_failed " + It), (0, Ct.isGift)(t) && i.push("im-mess_gift");
        var n = b(t),
            o = D(t.text, t.kludges);
        "" != o && (0, Ct.wasEdited)(t) && (o += gi("sImLblWasEdited", {
            update_time: t.update_time
        })), t.subject && "..." !== t.subject.trim() && !S(t.peerId) && (o = gi("im_topic", {
            topic: t.subject
        }) + o);
        var s = gi("im_message_media", {
            messageId: t.messageId,
            attaches: n.join(""),
            text: (0, Ct.isGift)(t) ? '<div class="im-mess--gift-lbl">' + o + "</div>" : ""
        });
        return (0, Ct.isGift)(t) || (s = o + s), "" == o && (0, Ct.wasEdited)(t) && (s += gi("sImLblWasEdited", {
            update_time: t.update_time
        })), gi("im_msg_row", {
            msg_id: t.messageId,
            from_id: t.peerId,
            text: s,
            aria_hidden: t.local && !t.failed ? "true" : "false",
            ts: t.date,
            marker_params: t.failed ? 'aria-label="' + vi("mail_send_message_error") + '" role="link"' : "",
            unread_params: a ? 'aria-label="' + vi("mail_unread_message") + '"' : "",
            cls: i.join(" ")
        })
    }

    function b(e) {
        return e.attaches.map(function(e) {
            return "sticker" === e.type ? u(e.id, e.productId) : p(e.type)
        })
    }

    function C(e) {
        for (var t = e.getElementsByClassName("_im_mess_noa"), i = t.length; i--;) hi(t[i], "im-mess_fwd") || t[i].insertAdjacentHTML("afterbegin", gi("sImHistoryRowActions")), di(t[i], "_im_mess_noa")
    }

    function y(e, t, i) {
        var a = (arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0, arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : !0),
            r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !0,
            n = Date.now() - 1e3 * t.date > 1e3,
            o = e.tabs[t.peerId];
        if (!i || ci("_im_mess", i) || ci("_im_bar_date", i) || (i.innerHTML = ""), o.skipped > 0) return i;
        var s = [];
        t.local || (s = e.imQueue(t.peerId, a)), s.length > 0 && te(s.map(function(e) {
            return ci("_im_mess_rid" + e.rid, i)
        }, i).filter(function(e) {
            return e
        }));
        var c = v(e, t),
            u = ai(i);
        hi(u, "_im_mess_stack") || (u = ni(u, "._im_mess_stack", -1));
        var l = (0, mt.getLastMessage)(e, t.peerId, t.messageId),
            d = ci("_im_unread_bar_row", i),
            f = (0, Ct.getUserId)(t),
            h = l ? R(l.date, e) : 0;
        if (!l || P(o, l, t, e, r)) {
            var p = "",
                m = !1;
            if (d && (0, Ct.isOut)(t) && Ue(e, i, t.peerId), 1 === o.unread && !(0, Ct.isOut)(t) && r && (p += gi("im_mess_bar", {}), m = !0, Ue(e, i, t.peerId)), !Fi(new Date(h))) {
                var _ = new Date,
                    g = m ? "im-page--history-new-bar_hide _im_invisible_bar" : "";
                p += gi("im_day_bar", {
                    day: Ni(t.date, e.timeshift, !0, vi("months_of", "raw"), !0),
                    date: t.date,
                    day_class: _.getDate() + _.getMonth() + _.getFullYear() + " " + g
                })
            }
            if (ce(t)) p += gi("im_service_row", {
                text: le(e, t, o),
                type: "",
                date: t.date,
                from_id: "",
                message_id: t.messageId
            });
            else {
                var b = e.gid && (0, Ct.isOut)(t) ? Jt(t.kludges.from_admin) || 0 : 0,
                    y = (0, Tt.oCacheGet)(e, b ? -e.gid : f) || o,
                    k = S(t.peerId) ? y.name : y.first_name,
                    N = y.link || o.href,
                    T = gi("im_mess_stack_name", {
                        name: k,
                        link: N,
                        "class": (0, Ct.isMoney)(t) ? " im-mess-stack--lnk-money-transfer" : ""
                    });
                if ((0, Ct.isGift)(t)) {
                    var F = vi("mail_gift_message_sent", "raw");
                    T += ' <span class="im-mess-stack--gift">' + bi(y.sex || 0, F) + "</span>"
                }
                if ((0, Ct.isMoney)(t)) {
                    var E = (0, Ct.isMoneyRequest)(t) ? vi("mail_money_request_message_sent", "raw") : vi("mail_money_tranfer_message_sent", "raw");
                    T += ' <span class="im-mess-stack--money-transfer">' + bi(y.sex || 0, E) + "</span>"
                }
                t.attaches[0] && "chronicle_invite" === t.attaches[0].type && (T += " " + vi("mail_chronicle_invite_inf"));
                var x = e.gid ? "/gim" + e.gid : "/im",
                    I = void 0;
                if (I = t.local ? A(t.date, e.timeshift) : gi("im_stack_date", {
                        date: A(t.date, e.timeshift),
                        link: x + "?sel=" + t.peerId + "&msgid=" + t.messageId
                    }), b && e.admins[b]) {
                    var O = e.admins[b],
                        L = b === Gt.id ? vi("mail_by_you") : O[0];
                    I = I + " " + gi("im_admin_link", {
                        name: L,
                        href: O[1]
                    })
                }
                p += gi("im_mess_stack", {
                    photo: y.photo,
                    href: N,
                    cls: "",
                    date_attr: "",
                    link: "/im?sel=" + t.peerId + "&msgid=" + t.messageId,
                    name: ei(T),
                    stack_name: T,
                    peerId: f,
                    date: I,
                    messages: c,
                    admin: t.kludges.from_admin || 0
                })
            }(0, Nt.toArray)(Xt(p)).forEach(function(e) {
                return i && i.appendChild(e)
            })
        } else d && e.peer === t.peerId && !o.inplaceSearch && (0, Ct.isOut)(t) && Ue(e, i, t.peerId), ci("_im_stack_messages", u).appendChild(Kt(c));
        return (0, Ct.isOut)(t) && !n && setTimeout(function() {
            var e = ci("_im_mess_" + t.messageId, i);
            hi(e, St) && li(e, "im-mess_sending")
        }, 500), s = s.filter(function(e) {
            return e.rid !== t.randomId
        }), C(i), w(s, e, i)
    }

    function w(e, t, i) {
        var a = void 0;
        return a = "object" === ("undefined" == typeof e ? "undefined" : pt(e)) ? e : t.imQueue(e, !1), a.length > 0 && a.map(function(e) {
            return e.mess.failed = !!e.failed, e.mess
        }).filter(function(e) {
            return (0, mt.getMessage)(t, e.peerId, e.messageId)
        }).forEach(function(e) {
            return y(t, e, i, !1)
        }), i
    }

    function k(e) {
        var t = ci("_im_mess_blind_unread_marker", e);
        t && (t.removeAttribute("aria-label"), t.removeAttribute("role"), t.removeAttribute("tabindex"))
    }

    function N(e, t, i) {
        var a = e.tabs[t];
        return (0, Nt.toArray)(si("_im_mess_unread", i)).forEach(function(e) {
            var t = Jt(oi(e, "msgid"));
            t > 0 && a.out_up_to >= t && (di(e, "_im_mess_unread"), di(e, "im-mess_unread"), k(e))
        }), i
    }

    function T(e, t, i) {
        var a = ci("_im_msg_media" + t.messageId, e);
        return a && (a.innerHTML = i.tabs[t.peerId].mediacontent[t.messageId][0]), e
    }

    function F(e, t) {
        if (!(0, mt.isFullyLoadedTab)(t, e.peerId)) return 0;
        var i = t.tabs[e.peerId];
        return i.msgs[e.messageId] ? 1 : i.msgs["rid" + e.randomId] ? 2 : 0
    }

    function E(e) {
        return 0 == e ? !0 : !1
    }

    function x(e) {
        return e > 0 && 2e9 > e
    }

    function S(e) {
        return e > 2e9
    }

    function I(e) {
        return -2e9 > e
    }

    function O(e, t) {
        return e === t.peer
    }

    function L(e, t) {
        return e.tabs[t] ? !0 : !1
    }

    function M(e, t) {
        return L(e, t) ? null !== e.tabs[t].lastmsg : !1
    }

    function R(e, t) {
        return 1e3 * e + 1e3 * t.timeshift
    }

    function P(e, t, i, a, r) {
        if ((0, Ct.getUserId)(t) !== (0, Ct.getUserId)(i)) return !0;
        var n = R(t.date, a),
            o = R(i.date, a);
        return Ti(n, o) ? (0, mt.isCommunityInterface)(a) && Jt(t.kludges.from_admin) !== Jt(i.kludges.from_admin) ? !0 : i.date - t.date > 300 ? !0 : ce(t) || ce(i) ? !0 : (0, Ct.isGift)(t) || (0, Ct.isGift)(i) ? !0 : (0, Ct.isGraffiti)(t) || (0, Ct.isGraffiti)(i) ? !0 : (0, Ct.isUnread)(e, t) === (0, Ct.isUnread)(e, i) || !r || (0, Ct.isOut)(i) || he(i.peerId, a.gid) ? !1 : !0 : !0
    }

    function A(e, t) {
        return Ci(1e3 * e, "{hour}:{minute} {am_pm}", 1e3 * t, [], !0)
    }

    function D(e, t) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            a = Math.round(1e9 * Math.random()).toString(16),
            r = {},
            n = 0;
        return e = (0, yt.replaceHyperLinks)(e || "", yt.linksReplacer.bind(null, i)), e = e.replace(/(<a.+?<\/a>)/gi, function(e) {
            var t = "!link_" + n + "_" + a + "!";
            return r[t] = e, n++, t
        }), e = (0, yt.replaceMentions)(e), e = (0, yt.replaceEmailLinks)(e), Object.keys(r).forEach(function(t) {
            e = e.replace(t, function() {
                return r[t]
            })
        }), t.emoji && (e = Ai.emojiToHTML(e, !0)), e
    }

    function B(e) {
        return S(e) ? "c" + (e - 2e9) : I(e) ? "e" + Math.abs(e + 2e9) : e
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

    function q(e) {
        return {
            search: {
                name: vi("mail_im_peer_search"),
                icon: "search"
            },
            block_community: {
                icon: "block",
                name: vi("mail_block_comm_messages")
            },
            allow_community: {
                icon: "unblock",
                name: vi("mail_allow_comm_messages")
            },
            clear: {
                name: vi(e.peer < -2e9 ? "mail_im_delete_email_contact" : "mail_im_delete_all_history"),
                icon: "clear"
            },
            chat: {
                name: vi("mail_im_create_chat_with"),
                icon: "invite"
            },
            mute: {
                name: vi("mail_im_mute"),
                icon: "mute"
            },
            unmute: {
                name: vi("mail_im_unmute"),
                icon: "unmute"
            },
            photos: {
                name: vi(e.gid ? "mail_im_show_media_history_group" : "mail_im_show_media_history"),
                icon: "media"
            },
            avatar: {
                icon: "avatar",
                name: vi("mail_update_photo_red")
            },
            block: {
                icon: "block",
                name: vi("mail_block_user")
            },
            invite: {
                icon: "invite",
                name: vi("mail_im_create_chat_with")
            },
            invite_link: {
                icon: "invite-link",
                name: vi("mail_chat_invite_link")
            },
            leave: {
                icon: "leave",
                name: vi("mail_leave_chat")
            },
            topic: {
                icon: "topic",
                name: vi("mail_change_topic")
            },
            "return": {
                icon: "return",
                name: vi("mail_return_to_chat")
            },
            pin_hide: {
                icon: "pin_hide",
                name: vi("mail_menu_pin_hide")
            },
            pin_unhide: {
                icon: "pin_unhide",
                name: vi("mail_menu_pin_show")
            },
            unpin: {
                icon: "unpin",
                name: vi("mail_menu_unpin")
            }
        }
    }

    function z(e, t) {
        var i = '<img src="' + e + '" alt="" class="dialogs_inline_chatter dialogs_inline_chatter_half"/>';
        return t && (i = gi("im_dialogs_link", {
            href: t,
            photo: i
        })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter dialogs_inline_chatter_half">\n      ' + i + "\n    </div>\n  </div>"
    }

    function U(e, t) {
        var i = '<img src="' + e + '" alt="" class="dialogs_inline_chatter"/>';
        return t && (i = gi("im_dialogs_link", {
            href: t,
            photo: i
        })), '<div class="im_grid">\n    <div class="dialogs_inline_chatter">\n      ' + i + "\n    </div>\n  </div>"
    }

    function W(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        if ("string" == typeof e) return '<div class="im_grid"><img src="' + e + '" alt=""/></div>';
        switch (e.length) {
            case 1:
                return '<div class="im_grid"><img src="' + e[0] + '" alt=""/></div>';
            case 2:
                return e.map(function(e, i) {
                    return z(e, t[i])
                }).join("");
            case 3:
                return z(e[0], t[0]) + e.slice(1).map(function(e, i) {
                    return U(e, t[i + 1])
                }).join("");
            case 4:
                return e.map(function(e, i) {
                    return U(e, t[i])
                }).join("")
        }
    }

    function G(e, t, i) {
        if ("string" == typeof t.photo && t.photo) return '<div class="im_grid"><img src="' + t.photo + '" alt=""></div>';
        if (S(t.peerId) && t.membersCount < 2) return '<div class="im_grid"><img src="' + e.get().default_chat_photo + '" alt=""></div>';
        if (Array.isArray(t.photo)) return W(t.photo);
        var a = t.data.active.slice(0, 4).map(Tt.oCacheGet.bind(null, e)),
            r = a.map(function(e) {
                return e.photo
            }),
            n = i ? [] : a.map(function(e) {
                return e.link
            });
        return W(r, n)
    }

    function V(e) {
        var t = vi(e.get().gid ? "mail_search_only_messages_comm" : "mail_search_only_messages");
        return '<li class="im-page--mess-search-w">\n    <div class="im-page--mess-search ' + Ut + '">\n      <button type="button" class="im-i--messages-search"></button>' + t + "\n    </div>\n  </li>"
    }

    function K() {
        return '<li class="im-search-results-head">' + vi("mail_search_messages") + "</li>"
    }

    function Q() {
        return '<li class="im-search-results-head">' + vi("mail_search_conversations_sep") + "</li>"
    }

    function Y() {
        return '<li class="im-search-results-head">' + vi("mail_search_dialogs_sep") + "</li>"
    }

    function X() {
        return '<li class="im-search-results-head _im_recent_bar">\n    ' + vi("mail_recent_searches") + '\n    <button type="button" class="' + zt + ' im-page--clear-recent">' + vi("mail_clear_recent") + "</button>\n  </li>"
    }

    function $(e) {
        var t = e.get().popular_sugg,
            i = (0, mt.isClassicInterface)(e) ? 8 : 5;
        return t.length > i && (t = t.slice(0, i)), '<li class="im-popular clear_fix">' + t.map(function(t) {
            var i = t.peerId,
                a = (0, Tt.oCacheGet)(e, i) || t,
                r = e.get().tabs[i] || t,
                n = (e.get().mutedPeers || []).indexOf(i) >= 0,
                o = ["im-popular--item", "fl_l", "_im_dialog", "_dont_add_recent", "_im_sugg_" + i, r.unread > 0 && "sugg-is_unread", n && "sugg-is_muted"].filter(function(e) {
                    return !!e
                }).join(" ");
            return '<div class="' + o + '" data-peer="' + i + '">\n    <a class="im-popular--avatar-w ' + Ri(r.online) + '" href="' + a.link + '"><img class="im-popular--avatar" src="' + a.photo + '"/></a>\n    <div class="im-popular--name-w"><a class="im-popular--name" href="' + a.link + '">' + (a.first_name || a.name) + '</a></div>\n    <span class="im-popular--unread _sugg_unread_ct">' + H(r.unread) + "</span>\n</div>"
        }).join("") + "</li>"
    }

    function J(e, t, i) {
        var a = ci("_im_mess_" + t.messageId, i);
        if (a) {
            pi(a, "aria-hidden", "false"), li(a, "im-mess_failed " + It);
            var r = ci("_im_mess_marker", a);
            pi(r, "aria-label", vi("mail_send_message_error")), pi(r, "role", "link")
        }
        return i
    }

    function Z(e, t, i) {
        var a = ci("_im_mess_" + t, i);
        if (a) {
            di(a, "im-mess_failed"), pi(a, "aria-hidden", "true"), di(a, It);
            var r = ci("_im_mess_marker", a);
            pi(r, "aria-label", ""), pi(r, "role", "")
        }
        return i
    }

    function ee(e, t) {
        var i = e.map(function(e) {
            return ci("_im_mess_" + e, t)
        }).filter(function(e) {
            return e
        });
        return te(i, t)
    }

    function te(e, t) {
        var i = e.filter(function(e) {
            return !hi(e, "im-mess_srv")
        }).map(function(e) {
            return e.parentNode
        });
        return e.forEach(function(e) {
            return e.parentNode.removeChild(e)
        }), i.filter(function(e) {
            return 0 === ri(e).length
        }).map(function(e) {
            return ui("_im_mess_stack", e)
        }).forEach(function(e) {
            hi(ii(e), "_im_bar_date") && Qt(ii(e)), hi(ii(e), "_im_unread_bar_row") && Qt(ii(e)), Qt(e)
        }), t
    }

    function ie(e, t, i, a) {
        return e.map(function(e) {
            return ci("_im_mess_" + e, a)
        }).filter(function(e) {
            return e
        }).forEach(function(e) {
            _i(e, oe(t, e, i)), li(e, "im-mess_light")
        }), a
    }

    function ae(e, t, i) {
        var a = ci("_im_mess_" + e, i);
        if (a) {
            var r = ci(Ot, a);
            _i(a, r.innerHTML), di(a, "im-mess_light")
        }
        return i
    }

    function re(e, t, i, a) {
        var r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 2,
            n = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : !1;
        if (n) return ne(e, t, i, a, !0, r);
        var o = ((0, mt.isClassicInterface)(a), 60),
            s = ne(e, t, i, a, !1, r);
        return s.length > o ? ne(e, t, i, a, !0, r) : s
    }

    function ne(e, t, i, a, n, o) {
        var s = [],
            c = Object.keys(e || {}).sort(function(t, i) {
                return e[i] - e[t]
            }).filter(function(e) {
                var t = (0, Tt.oCacheExists)(a, e);
                return t || s.push(e), t
            });
        if (s.length && (0, xt.loadChatMember)(r({}, t, s), a), 0 === c.length) return "";
        var u = x(t) || (0, mt.isCommunityPeer)(t) ? "first_name" : n ? "short_name" : "name";
        if (1 == c.length) {
            var l = i ? "" : (0, Tt.oCacheGet)(a, c[0])[u];
            return l + " " + vi("mail_typing")
        }
        var d = vi("mail_typing_several", c.length),
            f = c.slice(0, Math.min(c.length - 1, o)),
            h = f.map(function(e) {
                return (0, Tt.oCacheGet)(a, e)[u]
            }).join(", ");
        if (c.length > o + 1) h += " " + vi("mail_and_peer").replace("{count}", c.length - o).replace("{typing}", d);
        else {
            var p = (0, Tt.oCacheGet)(a, c[f.length])[u];
            h += " " + vi("mail_and_peer_one") + " " + p + " " + d
        }
        return h
    }

    function oe(e, t, i) {
        var a = t.innerHTML,
            r = "delete" === i ? "mail_deleted_stop" : "mail_marked_as_spam";
        return '<div class="im-mess--text">\n    ' + vi(r) + ' <button type="button" data-peer="' + e + '" class="' + Lt + ' im-mess--btn">' + vi("mail_restore") + '</button>\n    <div class="' + Ot + ' im-mess--original">' + a + "</div>\n  </div>"
    }

    function se() {
        return '<div class="im-page--chat-search-empty">\n    ' + vi("mail_im_search_empty") + "\n  </div>"
    }

    function ce(e) {
        return e.kludges && "undefined" != typeof e.kludges.source_act
    }

    function ue(e, t, i) {
        var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
        return i ? '<a class="im_srv_lnk ' + a + '" target="_blank" href="' + e + '">' + t + "</a>" : '<span class="' + a + '">' + t + "</span>"
    }

    function le(e, t, i) {
        var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !0,
            r = t.kludges,
            n = r.source_act,
            o = Jt(r.source_mid),
            s = t.userId,
            c = (0, Tt.oCacheGet)(e, s),
            u = "",
            l = s === o;
        switch (n) {
            case Mt:
                u = "mail_im_chat_created";
                break;
            case Rt:
                u = "mail_im_title_updated_dot";
                break;
            case Pt:
                u = l ? "mail_im_returned_to_chat" : "mail_im_invited";
                break;
            case At:
                u = l ? "mail_im_left" : "mail_im_kicked_from_chat";
                break;
            case Dt:
                u = "mail_im_photo_set";
                break;
            case Bt:
                u = "mail_im_photo_removed";
                break;
            case jt:
                u = r.source_message ? "mail_im_pin_message" : "mail_im_pin_message_empty2";
                break;
            case Ht:
                u = r.source_message ? "mail_im_unpin_message" : "mail_im_unpin_message_empty2";
                break;
            case qt:
                u = "mail_im_invite_by_link";
                break;
            default:
                return "mail_no_support"
        }
        if (u = bi(c.sex, vi(u, "raw")), u = u.replace("{from}", ue(c.link, c.name, a)), o && o !== s) {
            var d = r.source_email;
            if (d) u = u.replace("{user}", ue("/im?email=" + encodeURIComponent(d), "email", a));
            else {
                var f = (0, Tt.oCacheGet)(e, o),
                    h = n === At ? f.inv_name : f.kick_name;
                u = u.replace("{user}", ue(f.link, h, a))
            }
        }
        if (r.source_text) {
            var p = r.source_old_text ? '«<b class="im_srv_lnk">' + r.source_old_text + "</b>» &rarr; " : "";
            u = u.replace("{title}", p + ('«<b class="im_srv_lnk">' + r.source_text + "</b>»"))
        }
        if (r.source_act === jt || r.source_act === Ht)
            if (r.source_message) {
                var m = fe(Ai.emojiToHTML(ei(r.source_message.replace(/<br\s?\/?>/gi, " ")), !0)),
                    _ = ue("", m, !1, "im_srv_mess_link");
                u = u.replace("{msg}", _)
            } else u = u.replace(/{link}(.+){\/link}/i, function(e, t) {
                return ue("", t, !1, "im_srv_mess_link")
            });
        return u
    }

    function de(e, t, i, a) {
        if (t === Dt) {
            var r = ci("_im_mess_" + e.messageId, a);
            if (r) {
                var n = i.tabs[e.peerId];
                r.parentNode.innerHTML = gi("im_msg_row", {
                    msg_id: e.messageId,
                    from_id: e.peerId,
                    text: le(i, e, n) + i.chat_photo_msg,
                    ts: e.date,
                    cls: "im-mess_srv"
                })
            }
        }
        return a
    }

    function fe(e) {
        return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(bt.MENTION_RAW, "$1$4")
    }

    function he(e, t) {
        return t ? !1 : e === Gt.id
    }

    function pe(e, t) {
        return Oi(e, {
            url: (0, mt.isCommunityPeer)(t) ? "al_groups.php" : "al_profile.php",
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

    function me(e) {
        return function(t) {
            var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "bottom",
                a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                r = Kt(gi("im_preloader", {
                    preloader: Yt(Gt.pr_tpl, {
                        id: ""
                    }),
                    cls: ["bottom" === i ? "im-preloader_bottom" : "im-preloader_top", a].join(" ")
                })),
                n = !1;
            setTimeout(function() {
                n || ("bottom" === i ? e.appendChild(r) : e.insertBefore(r, ti(e)), li(r, "im-preloader_visible"))
            }, 0), t.then(function() {
                n = !0, di(r, "im-preloader_visible"), r.parentNode && r.parentNode.removeChild(r)
            })
        }
    }

    function _e(e, t) {
        return {
            0: {
                msgs: e.reduce(function(e, t) {
                    return e[t] = [t, gt.FLAG_IMPORTANT, 0, 0, "", "", {}, 0], e
                }, {}),
                hash: t,
                history: 1
            }
        }
    }

    function ge(e, t) {
        if (!t && !e) return !1;
        var i = e.target || e.srcElement,
            a = zi,
            r = !1,
            n = /_im_mess|im_log_act|im_log_ract|_im_log_body|im_log_rspacer|_im_graffiti_w|_wall_post_cont/;
        do
            if (!i || i.onclick || i.onmousedown || "A" == i.tagName || hi(i, "_im_no_select") || hi(i, "im_msg_media_link") || "IMG" == i.tagName && !hi(i, "_im_graffiti") && !hi(i, "emoji") && !hi(i, "emoji_css") && !hi(i, "im_gift") || "TEXTAREA" == i.tagName || hi(i, "play_new") || hi(i, "videoplayer") || (r = n.test(i.className))) break; while (a-- && (i = i.parentNode));
        return r ? !!Zt(ve()) : !0
    }

    function ve() {
        var e = window.getSelection && window.getSelection() || document.getSelection && document.getSelection();
        return (e || "").toString()
    }

    function be(e, t) {
        return '<div class="im-mess--text">\n      <span>' + vi("mail_restored") + '</span>\n      <a class="_im_go_to" href="/im?sel=' + B(e) + "&msgid=" + t + '">' + vi("mail_im_goto_conversation") + "</a>\n    </div>"
    }

    function Ce(e, t) {
        var i = vi(S(e) ? "mail_chat_sure_to_delete_all" : (0, mt.isCommunityPeer)(e) ? "mail_group_sure_to_delete_all" : "mail_sure_to_delete_all");
        return Si(vi("mail_deleteall1"), i, vi("mail_delete"), t, vi("global_cancel"))
    }

    function ye(e) {
        return Si(vi("mail_unpin_title"), vi("mail_unpin_text"), vi("mail_unpin"), e, vi("global_cancel"))
    }

    function we(e, t, i) {
        var a = vi("mail_dialog_msg_delete_N", t),
            r = Si(vi("mail_dialog_msg_delete_title"), a, vi("mail_delete"), function() {
                return i(isChecked(ci("_check_forall")))
            }, vi("global_cancel")),
            n = '<div class="checkbox im-delete-forall-checkbox _check_forall" onclick="checkbox(this);" role="checkbox" aria-checked="false">' + vi("mail_delete_for_all") + "</div>",
            o = cur.imDb.selectByKey("del_forall_checked");
        return r.setControlsText(n), o && checkbox(ci("_check_forall")), r
    }

    function ke(e, t, i, a, r) {
        t.showProgress(), e.set(a.bind(null, r)).then(function() {
            t.hideProgress(), t.hide(), i().removePeer(e, r), i().updateDialogFilters(e)
        })
    }

    function Ne(e, t, i, a, r) {
        var n = e.get().peer;
        ji(a), xi("al_im.php", {
            act: "a_show_members_box",
            chat: n - 2e9
        }, {
            stat: ["boxes.css"],
            params: {
                dark: 1
            },
            onDone: function(a, r) {
                var n = (0, kt.createModule)({
                    handlers: function(r, o) {
                        o(a.bodyNode.parentNode, "click", "_im_invite_box", function() {
                            a.hide(), Te(e, e.get().peer, t, i), (0, kt.destroyModule)(n)
                        }), o(a.bodyNode.parentNode, "mouseover", "im_status_mob_onl", function(e, t) {
                            var i = ci("_im_chat_members_w", a.bodyNode.parentNode),
                                r = 160,
                                n = ui("_im_member_item", t),
                                o = n.offsetTop - i.scrollTop + r,
                                s = o > 370;
                            Li(t, {
                                was: Jt(oi(t, "was")),
                                mid: Jt(oi(t, "peer")),
                                vk_mobile: Jt(oi(t, "vk_mobile")),
                                forcetoup: s
                            })
                        })
                    }
                })
            }
        }, a)
    }

    function Te(e, t, i, a) {
        var r = e.get().tabs[t],
            n = r.memberIds;
        e.set(a.bind(null, "add_member", n)).then(i().showCreation)
    }

    function Fe(e, t, i) {
        if (e.get().active_tab === bt.FOLDER_ALL && 0 === e.get().unread_cnt) return !1;
        var a = e.get().active_tab === bt.FOLDER_ALL ? bt.FOLDER_UNREAD : bt.FOLDER_ALL;
        return e.set(i.bind(null, a)).then(function(e) {
            t().restoreDialogs(e, !0)
        })
    }

    function Ee(e, t, i, a) {
        if (t.get().active_tab === e) return Promise.resolve(t);
        var r = (0, mt.isReversedDialogs)(t);
        return t.set(a.bind(null, e)).then(function(e) {
            return i().restoreDialogs(e, !0, r !== (0, mt.isReversedDialogs)(e)), e
        })
    }

    function xe(e, t) {
        "undefined" == typeof t && (t = e.get().peer);
        var i = e.get().tabs[t];
        return bt.FOLDER_MASKS[bt.FOLDER_IMPORTANT] & i.folders
    }

    function Se(e, t) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1;
        if ("undefined" == typeof t && (t = e.get().peer), !(0, mt.isFoldersAvailable)(e)) return !1;
        var a = i || e.get().tabs[t];
        return bt.FOLDER_MASKS[bt.FOLDER_UNRESPOND] & a.folders
    }

    function Ie(e, t) {
        return (t.get().block_states[e] || {}).free === !1
    }

    function Oe(e) {
        return null != e.get().pendingForward
    }

    function Le(e, t) {
        return (t.get().block_states[e] || {}).who === Gt.id
    }

    function Me(e, t) {
        var i = e.get().block_states;
        Object.keys(i).forEach(function(a) {
            i[a].time ? i[a].free === !1 && Date.now() - i[a].time >= 5e4 && t.push([gt.mutexEvent([, 1, "gim" + e.get().gid, a, 0, ""])]) : i[a].time = Date.now()
        })
    }

    function Re(e, t, i) {
        var a = void 0;
        return !Ii("al_im.php", {
            act: "a_spam",
            offset: "0",
            gid: e.get().gid
        }, {
            onDone: function(i, r) {
                r && (a = t(i, e, r))
            },
            params: {
                width: 638,
                onHide: function() {
                    Pi.loaded && Pi.detachPlayer(!0), a.unmount()
                }
            }
        }, i)
    }

    function Pe(e, t) {
        var i = (0, mt.getTab)(e, t).last_seen;
        if (i[0]) return 2 === i[2] ? '<span class="is_vk_mobile is_online">' + vi("mail_header_online_status") + Ae(t, !1, !0) + "</span>" : "online" + (Mi[i[0]] ? Ae(t) : "");
        if (!i[1]) return "";
        var a = wi(i[1], e.get().timeshift),
            r = bi((0, Tt.oCacheGet)(e, t).sex, vi("mail_last_activity_tip", "raw")).replace("{user}", "").replace("{time}", a);
        return 2 === i[2] ? r += Ae(t, !1, !0) : i[2] && (r += Ae(t, !1)), r
    }

    function Ae(e, t, i) {
        var a = i ? "" : 'onclick="mobilePromo();"',
            r = i ? ", vk_mobile: 1" : "",
            n = i ? " vk_mobile" : "";
        return gi("im_wrap_mobile", {
            "class": "im_status_mob_onl" + n,
            params: "mid: " + e + ", was: 1," + (t ? "forcetoup: true" : "forcetodown: true") + r,
            attrs: a
        })
    }

    function De(e, t) {
        var i = t.get().tabs[e];
        return xi("al_settings.php", {
            act: "blacklist_box",
            q: i.href
        }, {
            stat: ["settings.js", "settings.css"],
            dark: 1
        })
    }

    function Be(e, t) {
        return xi("groupsedit.php", {
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

    function He(e, t, i, a) {
        var r = void 0,
            n = Ii("al_im.php", {
                act: "a_important",
                offset: "0"
            }, {
                onDone: function(a, n) {
                    n && (r = i(a, e, t, n))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Pi.loaded && Pi.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        r && r.unmount()
                    }
                }
            }, a);
        it(n, e)
    }

    function qe() {
        var e = document.activeElement;
        return null === e ? !1 : "INPUT" === e.tagName || "TEXTAREA" === e.tagName || e.getAttribute("contenteditable")
    }

    function ze(e, t, i) {
        var a = ci("_im_mess_" + e, i);
        return a && fi(a, "im-mess_fav", t), i
    }

    function Ue(e, t, i) {
        var a = ci("_im_unread_bar_row", t);
        if (!a) return t;
        var r = ni(a, "._im_mess_stack", -1),
            n = ni(a, "._im_mess_stack"),
            o = r ? si("_im_mess", r).pop() : null,
            s = n ? ci("_im_mess", n) : null;
        if (Qt(a), _(t), !s || !o) return t;
        var c = oi(o, "msgid"),
            u = oi(s, "msgid"),
            l = (0, mt.getMessage)(e, i, c),
            d = (0, mt.getMessage)(e, i, u);
        if (P(e.tabs[i], l, d, e)) return t;
        var f = ci("_im_stack_messages", r),
            h = ci("_im_stack_messages", n).children;
        return (0, Nt.toArray)(h).forEach(function(e) {
            Qt(e), f.appendChild(e)
        }), Qt(n), t
    }

    function We(e, t, i) {
        var a = (0, mt.getFirstUnread)(e, e.get().peer);
        if (!a) return [!1, 0];
        var r = ci("_im_mess_" + a, t);
        if (!r) {
            var n = (0, mt.getLastMessage)(e, e.get().peer, a);
            if (!n) return [!0, 0];
            r = ci("_im_mess_" + n.messageId, t)
        }
        var o = hi(r, "_im_mess_srv") ? r : ui("_im_mess_stack", r);
        if (!o) return [!0, 0];
        var s = r ? r.offsetTop : 0,
            c = o.offsetTop + s,
            u = i.contHeight();
        return c <= i.scrollTop() + i.getScrollHeight() ? [!0, 0] : [!1, Math.max(0, u - c)]
    }

    function Ge(e, t, i) {
        ji(t);
        var a = ui("_im_top_notice", i);
        Bi(a, 200, Qt.pbind(a));
        var r = ui("_im_page_dialogs", a);
        r && hi(r, "im-page--dialogs-notice") && di(r, "im-page--dialogs-notice"), Ei.post("al_im.php", {
            act: "a_hide_top_notice",
            type: a.getAttribute("data-type"),
            hash: a.getAttribute("data-hash")
        })
    }

    function Ve(e, t, i) {
        ji(t);
        var a = ui("_im_aside_notice", i);
        Di(a, 200, Qt.pbind(a)), Ei.post("al_im.php", {
            act: "a_hide_top_notice",
            type: a.getAttribute("data-type"),
            hash: a.getAttribute("data-hash")
        })
    }

    function Ke(e, t, i, a, r) {
        return i = i.replace(/\<br\s*\/?\>(\n)?/gi, " ").replace(/[\n\r]/gi, " "), i = (0, yt.replaceMentions)(i, function(e, t, i, a, r) {
            return r
        }), a && (i = Ai.emojiToHTML(i, !0)), t && "..." !== t.trim() && !S(e) && (i = gi("im_topic", {
            topic: t,
            cls: "im-topic_dialog"
        }) + i), !i && r.length > 0 && (i = gi("im_dialog_media", {
            name: $e(r[0], r)
        })), i
    }

    function Qe(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
            i = e.split("_"),
            a = ht(i, 2),
            r = a[0],
            n = a[1];
        return [r, n, t]
    }

    function Ye(e, t) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
            a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
        if (a > 50) return [
            [], e.length
        ];
        for (var r = [], n = ""; i < e.length;) {
            var o = e[i];
            if ("id" === o) n = t[i];
            else if ("," === o && n) r.push(Qe(n)), n = "";
            else if ("(" === o) {
                var s = Ye(e, t, i + 1, a + 1),
                    c = ht(s, 2),
                    u = c[0],
                    l = c[1];
                i = l, r.push(Qe(n, u)), n = ""
            } else if (")" === o) return "" !== n && r.push(Qe(n)), [r, i];
            i++
        }
        return n && r.push(Qe(n)), [r, i]
    }

    function Xe(e) {
        if (Wi[e]) return Wi[e];
        for (var t = e ? e.length : 0, i = [], a = [], r = "", n = 0; t > n; n++) {
            var o = e[n],
                s = o.charCodeAt(0);
            s >= 48 && 57 >= s || "_" === o || "-" === o ? r += o : ("(" === o || ")" === o || ":" === o || "," === o) && ("" !== r && (a.push(r), i.push("id"), r = ""), a.push(o), i.push(o))
        }
        r.length > 0 && (a.push(r), i.push("id"));
        var c = Ye(i, a),
            u = ht(c, 1),
            l = u[0];
        return Object.keys(Wi).length > 300 && (Wi = {}), Wi[e] = l, l
    }

    function $e(e, t) {
        var i = {
            photo: vi("mail_added_photos", "raw"),
            video: vi("mail_added_videos", "raw"),
            audio: vi("mail_added_audios", "raw")
        };
        switch (e.type) {
            case "mail":
                return yi(e.object.fwd_count, vi("mail_fwd_msgs", "raw"), !0);
            case "photo":
            case "video":
            case "audio":
                var a = t.filter(function(t) {
                    return t.type === e.type
                }).length;
                return yi(a, i[e.type], !0);
            case "audio_playlist":
                return vi("mail_added_audio_playlist");
            case "doc":
                switch (e.kind) {
                    case "graffiti":
                        return vi("mail_added_graffiti");
                    case "audiomsg":
                        return vi("mail_added_audiomsg");
                    default:
                        return vi("mail_added_docs")
                }
            case "geo":
            case "map":
                return vi("mail_added_geo");
            case "wall":
                return vi("mail_added_wall");
            case "wall_reply":
                return vi("mail_added_wall_reply");
            case "gift":
                return vi("mail_added_gift");
            case "link":
            case "share":
                return vi("mail_added_link");
            case "sticker":
                return vi("mail_added_sticker");
            case "chronicle":
                return vi("mail_added_chronicle");
            case "chronicle_invite":
                return vi("mail_invite_chronice");
            case "market":
                return vi("mail_added_market_item");
            case "money_transfer":
                return vi("mail_added_money_transfer");
            case "money_request":
                return vi("mail_added_money_request");
            case "story":
                return vi("mail_added_story");
            case "mask":
                return vi("mail_added_mask");
            case "article":
                return vi("mail_added_article")
        }
        return ""
    }

    function Je(e) {
        li(e, "im-send-btn_loading")
    }

    function Ze(e) {
        di(e, "im-send-btn_loading")
    }

    function et(e) {
        var t = e.get(),
            i = (0, mt.getPinnedMessage)(e);
        if (!i || !(0, Ft.isPinnedMessageVisibleInTab)(e, (0, mt.getPeer)(e))) return "";
        var a = (0, Tt.oCacheGet)(e, i.userId);
        if (!a) return "";
        var r = i.text;
        r = !r && i.attaches.length ? gi("im_pinned_message_media", {
            text: $e(i.attaches[0], i.attaches)
        }) : D(r, i && i.kludges || {}) || "", r = r.replace(/<br\s?\/?>/gi, " ");
        var n = gi("im_pinned_message", {
            date: ki(i.date, t.timeshift),
            content: r,
            link: a.link,
            name: a.name
        });
        return n
    }

    function tt(e, t, i) {
        var a = +i.getAttribute("data-time");
        a && Oi(i, {
            text: ki(a, e.get().timeshift),
            className: "_im_history_tooltip",
            appendParentCls: "_im_mess_stack",
            black: 1,
            shift: [0, 4]
        })
    }

    function it(e, t) {
        e.bodyNode.addEventListener("mouseover", function(e) {
            hi(e.target, "_im_edit_time") && tt(t, e, e.target)
        })
    }

    function at(e, t, i, a, r) {
        var n = e.get(),
            o = void 0,
            s = Ii("al_im.php", {
                act: "a_get_pinned_message_box",
                chat: i,
                hash: n.tabs[i].hash
            }, {
                onDone: function(i, r) {
                    r && (o = a(i, e, t, r))
                },
                params: {
                    width: 638,
                    onHide: function() {
                        Pi.loaded && Pi.detachPlayer(!0)
                    },
                    onDestroy: function() {
                        o && o.unmount()
                    }
                }
            }, r);
        it(s, e)
    }

    function rt(e, t) {
        return S(e.peerId) && e.memberIds ? e.memberIds.indexOf(t) >= 0 : !1
    }

    function nt(e) {
        return !S(e.peerId) || e.data.kicked ? 0 : e.membersCount
    }

    function ot(e, t) {
        var i = (0, Tt.oCacheGet)(e, t.peerId),
            a = (0, mt.getTab)(e, t.peerId) || {};
        return i && (t.photo = t.photo || i.photo, t.name = t.name || i.name, t.href = t.link || i.link, t.sex = t.sex || i.sex), t.last_touched = a.last_touched || 0, t.verified = !!t.verified, t.lastmsg = t.lastmsg || t.lastmsg_meta && t.lastmsg_meta[0] || !1, t.folders = t.folders || null, t.unread = t.unread || 0, t.last_seen = t.last_seen || [0, 0, 0], t.online = t.last_seen && t.last_seen[0] || 0, t.out_up_to = null != t.out_up_to ? t.out_up_to : t.in_up_to || 0, S(t.peerId) && (t.memberIds = t.memberIds || a.memberIds || null), t
    }

    function st(e, t) {
        for (var i in t) t.hasOwnProperty(i) && ot(e, t[i])
    }

    function ct(e, t) {
        var i = [],
            a = t.find(function(e) {
                return "mail" === e[0]
            }),
            r = a ? a[1].split(";") : [];
        for (r.length > qi && (a[1] = r.slice(0, qi).join(";")); e.length > Hi;) {
            var n = e.substr(0, Hi).lastIndexOf(" "); - 1 == n && (n = Hi), i.push({
                msgText: Zt(e.substr(0, n))
            }), e = Zt(e.substr(n))
        }
        for (e.length && i.push({
                msgText: e,
                attaches: t
            }), i.length || i.push({
                attaches: t
            }), r = r.slice(qi); r.length; r = r.slice(qi)) i.push({
            attaches: [
                ["mail", r.slice(0, qi).join(";")]
            ]
        });
        return i
    }

    function ut(e) {
        return e.length > Hi
    }

    function lt(e, t, i) {
        var a = !1;
        xi("al_im.php", {
            act: "a_chat_preview",
            chat_id: t.invite_chat_id,
            hash: t.invite_hash
        }, {
            stat: ["boxes.css"],
            params: {
                dark: 1,
                hideButtons: !0,
                onHide: function() {
                    e.set(i), a && a.unmount()
                }
            },
            onFail: function(e) {
                return setTimeout(function() {
                    return Si(vi("global_error"), e)
                }, 0), !0
            },
            onDone: function(t, i) {
                a = (0, wt.mount)(t.bodyNode, e)
            }
        }, {})
    }

    function dt() {
        Si(vi("global_error"), vi("mail_message_wait_until_uploaded"))
    }

    function ft(e, t) {
        var i = (0, mt.getTab)(e, t.peerId) || {};
        if (!t || !(0, Ct.isOut)(t)) return !1;
        if (333 == t.peerId) return !1;
        if (Date.now() / 1e3 - t.date > 86400) return !1;
        if (l(e, t.peerId, t.messageId)) return !1;
        if (S(t.peerId)) {
            if (i.data.kicked || i.data.closed) return !1
        } else if (i.block_error > 0) return !1;
        return !0
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.MESSAGE_SEARCH_CLASS = t.CLEAR_RECENT_CLASS = t.HIDE_ASIDE_NOTICE_CLASS = t.HIDE_TOP_NOTICE_CLASS = t.SHOW_CHAT_MEMBERS_CLASS = t.DESELECT_ALL_CLASS = t.CHAT_INVITE_BY_LINK = t.CHAT_UNPIN_MESSAGE = t.CHAT_PIN_MESSAGE = t.CHAT_PHOTO_REMOVE = t.CHAT_PHOTO_UPDATE = t.CHAT_KICK_USER = t.CHAT_INVITE_USER = t.CHAT_TITLE_ACTION = t.CREATE_CHAT_ACTION = t.TYPING_CLASS = t.RESTORE_CLASS = t.ORIGINAL_CLASS = t.FAILED_CLASS = t.SENDING_CLASS = void 0;
    var ht = function() {
            function e(e, t) {
                var i = [],
                    a = !0,
                    r = !1,
                    n = void 0;
                try {
                    for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (i.push(o.value), !t || i.length !== t); a = !0);
                } catch (c) {
                    r = !0, n = c
                } finally {
                    try {
                        !a && s["return"] && s["return"]()
                    } finally {
                        if (r) throw n
                    }
                }
                return i
            }
            return function(t, i) {
                if (Array.isArray(t)) return t;
                if (Symbol.iterator in Object(t)) return e(t, i);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        pt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        mt = i(123);
    Object.keys(mt).forEach(function(e) {
            "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
                enumerable: !0,
                get: function() {
                    return mt[e]
                }
            })
        }), t.getClassicChatHeight = n, t.setClassicChatHeight = o, t.fixTableCellChildHeight = s, t.applyInnerHtml = c, t.renderSticker = u, t.isAlreadyDeleted = l, t.replaceMessageAttrs = d, t.isVoiceMessageAvailable = f, t.getAvailableMicrophones = h, t.renderAttach = p, t.dayFromVal = m, t.showInvisibleBar = _, t.editAndReplaceMessage = g, t.renderMessage = v, t.renderMessageMedia = b, t.ensureDomHasActions = C, t.appendToHistory = y, t.restoreQueue = w, t.markMessagesAsRead = N, t.replaceAttaches = T, t.isDuplicate = F, t.isReservedPeer = E, t.isUserPeer = x, t.isChatPeer = S, t.isPeerActive = O, t.isTabLoaded = L, t.isTabLoadedWithMessage = M, t.parseMessage = D, t.convertPeerToUrl = B, t.unUrlPeer = j, t.simplifyCounter = H, t.chatActions = q, t.renderPhotos = W, t.renderPhotosFromTab = G, t.renderBtnSearchOnlyMessages = V, t.renderMessagesSep = K, t.renderConversationsSep = Q, t.renderPopularSuggSep = Y, t.renderClearRecent = X, t.renderPopularSuggestions = $, t.setMessageError = J, t.startResendMessage = Z, t.removeMessages = ee, t.removeMessagesWithRestore = ie, t.restoreMessage = ae, t.formatTyper = re, t.formatTyperHelper = ne, t.renderEmptySearch = se, t.isServiceMsg = ce, t.serviceLink = ue, t.renderServiceMsg = le, t.addChatPhotoToUpdate = de, t.replaceSpecialSymbols = fe, t.isSelfMessage = he, t.showVerifiedTooltip = pe, t.wrapLoading = me, t.tabFromIds = _e, t.checkSelectClick = ge, t.renderGoTo = be, t.showFlushDialog = Ce, t.showUnpinDialog = ye, t.showMsgDeleteDialog = we, t.cleanHistory = ke, t.showChatMembers = Ne, t.inviteUser = Te, t.showUnreadOnly = Fe, t.changeTab = Ee, t.isImportant = xe, t.isUnrespond = Se, t.isPeerBlocked = Ie, t.isPendingForward = Oe, t.isPeerBlockedByMe = Le, t.blockLatencyCompensation = Me, t.showSpamLayer = Re, t.getLastSeenTextInHeader = Pe, t.getMobileIcon = Ae, t.showBlacklistBoxUser = De, t.showBlacklistBox = Be, t.getBaseLink = je, t.showFavvedBox = He, t.isEditableFocused = qe,
        t.updateStar = ze, t.removewNewUnreadBarAndMerge = Ue, t.isMessagesVisible = We, t.hideTopNotice = Ge, t.hideAsideNotice = Ve, t.renderShortText = Ke, t.parseFwd = Xe, t.attachToText = $e, t.lockButton = Je, t.unlockButton = Ze, t.renderPinnedMessage = et, t.showEditTimeTooltip = tt, t.boxHandleEditTimeTooltips = it, t.showPinnedBox = at, t.isUserAliveInChat = rt, t.getAliveMembersCount = nt, t.normalizeTab = ot, t.normalizeTabsGotFromServer = st, t.splitMessageToParts = ct, t.isMessageTooLong = ut, t.showInvitationBox = lt, t.showWaitUntilUploadedBox = dt, t.canMessageBeDeletedForAll = ft;
    var _t = i(59),
        gt = a(_t),
        vt = i(2),
        bt = a(vt),
        Ct = i(37),
        yt = i(118),
        wt = i(71),
        kt = i(27),
        Nt = i(62),
        Tt = i(12),
        Ft = i(19),
        Et = i(99),
        xt = i(5),
        St = t.SENDING_CLASS = "_im_mess_sending",
        It = t.FAILED_CLASS = "_im_mess_failed",
        Ot = t.ORIGINAL_CLASS = "_im_mess_original",
        Lt = t.RESTORE_CLASS = "_im_mess_restore",
        Mt = (t.TYPING_CLASS = "_im_typing", t.CREATE_CHAT_ACTION = "chat_create"),
        Rt = t.CHAT_TITLE_ACTION = "chat_title_update",
        Pt = t.CHAT_INVITE_USER = "chat_invite_user",
        At = t.CHAT_KICK_USER = "chat_kick_user",
        Dt = t.CHAT_PHOTO_UPDATE = "chat_photo_update",
        Bt = t.CHAT_PHOTO_REMOVE = "chat_photo_remove",
        jt = t.CHAT_PIN_MESSAGE = "chat_pin_message",
        Ht = t.CHAT_UNPIN_MESSAGE = "chat_unpin_message",
        qt = t.CHAT_INVITE_BY_LINK = "chat_invite_user_by_link",
        zt = (t.DESELECT_ALL_CLASS = "_im_deselect_all", t.SHOW_CHAT_MEMBERS_CLASS = "_im_show_chat_mems", t.HIDE_TOP_NOTICE_CLASS = "_im_top_notice_hide", t.HIDE_ASIDE_NOTICE_CLASS = "_im_aside_notice_hide", t.CLEAR_RECENT_CLASS = "_im_clear_recent"),
        Ut = t.MESSAGE_SEARCH_CLASS = "_im_mess_search",
        Wt = window,
        Gt = Wt.vk,
        Vt = Wt.ls,
        Kt = Wt.se,
        Qt = Wt.re,
        Yt = Wt.rs,
        Xt = Wt.sech,
        $t = Wt.inArray,
        Jt = Wt.intval,
        Zt = Wt.trim,
        ei = Wt.stripHTML,
        ti = Wt.domFC,
        ii = Wt.domPS,
        ai = Wt.domLC,
        ri = Wt.domChildren,
        ni = Wt.domClosestSibling,
        oi = Wt.domData,
        si = Wt.geByClass,
        ci = Wt.geByClass1,
        ui = Wt.gpeByClass,
        li = Wt.addClass,
        di = Wt.removeClass,
        fi = Wt.toggleClass,
        hi = Wt.hasClass,
        pi = Wt.attr,
        mi = Wt.setStyle,
        _i = Wt.val,
        gi = Wt.getTemplate,
        vi = Wt.getLang,
        bi = Wt.langSex,
        Ci = Wt.langDate,
        yi = Wt.langNumeric,
        wi = Wt.getDateText,
        ki = Wt.getSmDate,
        Ni = Wt.getShortDate,
        Ti = Wt.isSameDate,
        Fi = Wt.isToday,
        Ei = Wt.ajax,
        xi = Wt.showBox,
        Si = Wt.showFastBox,
        Ii = Wt.showTabbedBox,
        Oi = Wt.showTooltip,
        Li = Wt.mobileOnlineTip,
        Mi = Wt.mobPlatforms,
        Ri = Wt.onlinePlatformClass,
        Pi = Wt.AudioMessagePlayer,
        Ai = Wt.Emoji,
        Di = Wt.slideUp,
        Bi = Wt.fadeOut,
        ji = Wt.cancelEvent,
        Hi = 4096,
        qi = 100,
        zi = 8,
        Ui = "chatPosition",
        Wi = {}
}, , function(module, exports, __webpack_require__) {
    "use strict";
    var _im_shared_helpers = __webpack_require__(118),
        ACTIVE_TAB_SWITCH_SERVER_TIMEOUT = browser.safari ? 3e3 : 1e4,
        LC_SERVER_SWITCH_TO_ACTIVE_FLAG = "lc_server_switch_to_active_flag";
    window.curNotifier || (window.curNotifier = {
        addQueues: {},
        recvClbks: {},
        recvData: {},
        onConnectionId: []
    }), window.Notifier = {
        debug: !1,
        init: function(e) {
            if (!window.curNotifier || !curNotifier.connection_id) {
                if (Notifier.notificationsGc(), curNotifier = extend({
                        q_events: [],
                        q_shown: [],
                        q_closed: [],
                        negotiations: {},
                        currentIm: {},
                        q_max: 3,
                        uiNotifications: [],
                        q_idle_max: 5,
                        browser_shown: {},
                        done_events: {},
                        addQueues: curNotifier.addQueues || {},
                        recvClbks: curNotifier.recvClbks || {},
                        recvData: curNotifier.recvData || {},
                        error_timeout: 1,
                        request_timeout: 1e3,
                        sound: new Sound("mp3/bb1"),
                        sound_im: new Sound("mp3/bb2"),
                        sound_im_current: new Sound("mp3/bb3"),
                        onConnectionId: []
                    }, e), !this.initFrameTransport()) return !1;
                this.initIdleMan(), this.initCommunityQueues(), (curNotifier.cont = ge("notifiers_wrap")) || bodyNode.insertBefore(curNotifier.cont = ce("div", {
                    id: "notifiers_wrap",
                    className: "fixed"
                }), ge("page_wrap"))
            }
        },
        initCommunityQueues: function(e) {
            var t = ls.get("im_m_comms_key"),
                i = t && t.split ? t.split(";") : [];
            return "empty" === i[0] && i[1] && Date.now() - i[1] < 6e4 ? t = "empty" : "empty" === i[0] && (t = !1), t ? Notifier.proccessCommunityQueues(t, e || 0) : void ajax.post("al_im.php", {
                act: "a_get_comms_key"
            }, {
                onDone: function(t) {
                    "empty" === t ? t += ";" + Date.now() : Notifier.proccessCommunityQueues(t, e || 0), ls.set("im_m_comms_key", t)
                },
                onFail: function() {
                    return !0
                }
            })
        },
        notificationsGc: function() {
            curNotifier.uiGcTo = setTimeout(function() {
                for (var e = curNotifier.uiNotifications, t = [], i = 0; i < e.length; i++) {
                    var a = e[i];
                    vkNow() - a[1] > 1e4 ? a[0].close() : t.push(a)
                }
                curNotifier.uiNotifications = t, Notifier.notificationsGc()
            }, 5e3)
        },
        resetCommConnection: function(e) {
            var t = ls.get("im_m_comms_key");
            t && delete curNotifier.addQueues[t.queue], ls.set("im_m_comms_key", !1), Notifier.initCommunityQueues(e || 0)
        },
        proccessCommunityQueues: function(e, t) {
            return "empty" !== e && e ? void Notifier.addKey(e, function(e, i) {
                if (i.failed) return t++, void(50 > t && setTimeout(Notifier.resetCommConnection.pbind(t), 100));
                var e = ls.get("im_m_comms_key");
                e && (e.ts = i.ts, ls.set("im_m_comms_key", e));
                var a = i.events;
                a && a.map(function(e) {
                    return e.split("<!>")
                }).forEach(function(e) {
                    if ("update_cnt" === e[1]) {
                        var t = e[5],
                            i = e[4];
                        handlePageCount("mgid" + t, i)
                    }
                })
            }) : !1
        },
        destroy: function() {
            Notifier.hideAllEvents(), curNotifier.idle_manager.stop(), curNotifier.uiGcTo && clearTimeout(curNotifier.uiGcTo), curNotifier = {}, re("notifiers_wrap"), re("queue_transport_wrap")
        },
        reinit: function() {
            ajax.post("notifier.php?act=a_get_params", {}, {
                onDone: function(e) {
                    e ? (curNotifier.error_timeout = 1, this.init(e)) : (curNotifier.error_timeout = curNotifier.error_timeout || 1, setTimeout(this.reinit.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 256 && (curNotifier.error_timeout *= 2))
                }.bind(this),
                onFail: function() {
                    return curNotifier.error_timeout = curNotifier.error_timeout || 1, setTimeout(this.reinit.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 256 && (curNotifier.error_timeout *= 2), !0
                }.bind(this)
            })
        },
        standby: function(e) {
            this.destroy(), curNotifier.error_timeout = e || 1, setTimeout(this.reinit.bind(this), 1e3 * curNotifier.error_timeout)
        },
        freezeEvents: function() {
            curNotifier.frozen = !0, each(curNotifier.q_shown, function() {
                clearTimeout(this.fadeTO), getStyle(this.baloonEl, "opacity") < 1 && animate(this.baloonEl, {
                    opacity: 1
                }, 100)
            })
        },
        unfreezeEvents: function() {
            curNotifier.frozen = !1, each(curNotifier.q_shown, function() {
                this.fadeTO = setTimeout(this.startFading, hasAccessibilityMode() ? 3e4 : 5e3)
            })
        },
        getTransportWrap: function() {
            return ge("queue_transport_wrap") || utilsNode.appendChild(ce("div", {
                id: "queue_transport_wrap"
            }))
        },
        setFocus: function(e) {
            var t = (e ? "1" : "0") + curNotifier.instance_id;
            "flash" == curNotifier.transport && curNotifier.flash_transport ? curNotifier.flash_transport.setInstanceFocused(t) : "frame" == curNotifier.transport && (Notifier.lcSend("focus", {
                instance_id: t
            }), this.onInstanceFocus(t))
        },
        initIdleMan: function() {
            curNotifier.idle_manager && curNotifier.idle_manager.started || (curNotifier.idle_manager = new IdleManager({
                onIdleCb: function() {
                    Notifier.freezeEvents(), Notifier.setFocus(0), cur.onIdle && each(cur.onIdle, function(e, t) {
                        t()
                    })
                },
                onUnIdleCb: function() {
                    Notifier.unfreezeEvents(), Notifier.setFocus(1), cur.onUnidle && each(cur.onUnidle, function(e, t) {
                        t()
                    }), FastChat && FastChat.onUnidle(), vk.spentLastSendTS = vkNow()
                },
                id: "window",
                element: document,
                focusElement: window
            }), curNotifier.idle_manager.start())
        },
        initFrameTransport: function() {
            if (!ls.checkVersion() || browser.msie8 || !("onmessage" in window || "postMessage" in window)) return !1;
            curNotifier.connection_id = "queue_connection_" + curNotifier.queue_id, curNotifier.lc_prev_value = "", curNotifier.is_server = !1, curNotifier.lp_connected = !1, curNotifier.error_timeout = 1;
            var e = browser.version.split("."),
                t = intval(e[0]),
                i = intval(e[1]);
            curNotifier.post_message = Notifier.debug || !(browser.opera && intval(browser.version) < 15 || browser.msie || browser.mozilla && t >= 31 || browser.safari && (t > 7 || 7 == t && i >= 1)), curNotifier.transport = "frame", this.lcInit();
            for (var a in curNotifier.onConnectionId) curNotifier.onConnectionId[a]();
            return curNotifier.onConnectionId = [], !0
        },
        onActivated: function() {
            curNotifier.idle_manager && !curNotifier.idle_manager.is_activated ? curNotifier.idle_manager.activate() : curNotifier.idle_manager && curNotifier.idle_manager.is_idle || Notifier.setFocus(1), removeEvent(document, "mousemove keydown touchstart", Notifier.onActivated)
        },
        onConnectionInit: function() {
            addEvent(document, "mousemove keydown touchstart", Notifier.onActivated)
        },
        onConnectionFailed: function() {},
        onRelogin: function() {
            setTimeout(function() {
                Notifier.standby()
            }, 0)
        },
        onMessage: function onMessage(msg) {
            if (!curNotifier.focus_instance || curNotifier.focus_instance == curNotifier.instance_id) try {
                var events = eval("(" + msg + ")");
                Notifier.pushEvents(events)
            } catch (e) {
                debugLog(e.message)
            }
        },
        onInstanceFocus: function(e) {
            var t = e.charAt(0);
            return e = e.substr(1), "1" != t ? void(curNotifier.focus_instance == e && (curNotifier.focus_instance = "")) : (curNotifier.focus_instance = e, void(e != curNotifier.instance_id && (curNotifier.idle_manager.is_idle || curNotifier.idle_manager.idle(), Notifier.hideAllEvents())))
        },
        onInstanceServer: function(e) {
            curNotifier.is_server = !!intval(e)
        },
        pushEvents: function(e, t) {
            var i = 0;
            each(e, function(e, a) {
                i |= Notifier.pushEvent(a, t)
            }), i && !ls.get("sound_notify_off") && curNotifier.is_server && (2 & i ? curNotifier.sound_im.play() : curNotifier.sound.play())
        },
        pushEvent: function pushEvent(msg, cnt) {
            if ("nop" != msg) {
                if (msg = msg.split("<!>"), msg[0] != curNotifier.version) return debugLog("Notifier old version"), !1;
                if ("update_cnt" == msg[1]) return "nws" === msg[3] ? (handlePageCount("ntf", msg[9]), 0) : (handlePageCount(msg[3], msg[4], msg[5], msg[6]), 0);
                var ev = {
                        type: msg[1],
                        title: msg[2],
                        author_photo: psr(msg[3] || ""),
                        author_link: msg[4] || "",
                        text: psr(msg[5]),
                        add_photo: psr(msg[6]) || "",
                        link: msg[7],
                        onclick: msg[8],
                        add: msg[9],
                        id: msg[10],
                        author_id: msg[11],
                        top_count: msg[12]
                    },
                    push = cnt ? 0 : 1;
                if (msg[13] && (ev.custom = eval("(" + msg[13] + ")")), !curNotifier.done_events[ev.id]) {
                    switch (curNotifier.done_events[ev.id] = 1, void 0 !== ev.top_count && -1 != ev.top_count && handlePageCount("ntf", ev.top_count), ev.type) {
                        case "video_process_ready":
                            if (ev.add && window.Video && Video.isVideoPlayerOpen(ev.add)) return;
                            break;
                        case "mail":
                            handlePageCount("msg", ev.add), window.Call && Call.params.call_id && intval(ev.author_id) == intval(Call.params.far_uid) && Call.showChat(), "im" != cur.module && FastChat.prepareTabIcon(intval(ev.author_id), {
                                fixedLoad: 1
                            });
                            break;
                        case "mail_failed":
                            var peer = intval(ev.author_id);
                            if ("im" == nav.objLoc[0] && cur.tabs[peer]) {
                                var msg = ge("mess" + ev.add);
                                if (msg && hasClass(msg, "im_new_msg")) {
                                    removeClass(msg, "im_new_msg"), addClass(msg, "im_failed");
                                    var n = geByClass1("im_log_author_chat_name", msg);
                                    n && (n.innerHTML += " &nbsp;<span>" + cur.lang.mail_send_failed + "</span>"), push = 2
                                }
                            }
                            break;
                        case "friend_request":
                            handlePageCount("fr", ev.add);
                            break;
                        case "ach_achieved":
                            handlePageCount("ach", ev.add), ev.author_photo = ev.custom[0];
                            break;
                        case "ach_achieved_upd":
                            handlePageCount("ach", ev.add), push = 0;
                            break;
                        case "bt_upd":
                        case "bt_upd_upd":
                            handlePageCount("bt", ev.add, ev.custom[0], ev.custom[1]), "bt_upd_upd" == ev.type && (push = 0);
                            var bt = ge("bt_tab_updates");
                            bt && val(geByClass1("ui_tab_count", bt), ev.add > 0 ? ev.add : "");
                            break;
                        case "push_settings":
                            push = 0;
                            var muted = JSON.parse(ev.add);
                            curNotifier.mutedPeers = curNotifier.mutedPeers.filter(function(e) {
                                return e !== muted.peer_id
                            }), 0 !== muted.disabled_until && curNotifier.mutedPeers.push(muted.peer_id);
                            break;
                        case "mail_cnt":
                            handlePageCount("msg", ev.add), push = 0;
                            break;
                        case "clear_notify":
                            Notifier.hideAllEvents(), push = 0;
                            break;
                        case "support_reply":
                            handlePageCount("spr", ev.add, "support", ev.author_id ? "act=show&id=" + ev.author_id : "act=show"), toggle("l_spr", ev.add > 0);
                            break;
                        case "support_cnt":
                            handlePageCount("spr", ev.add, "support", ev.author_id ? "act=show&id=" + ev.author_id : "act=show"), toggle("l_spr", ev.add > 0), push = 0;
                            break;
                        case "balance_changed":
                            updateMoney(ev.add), ev.custom && "app" == ev.custom[0] && cur.app && cur.app.params.api_id == ev.custom[1] && cur.app.balanceUpdated(ev.custom[2]);
                            break;
                        case "gift_sent":
                            re("left_block10_0");
                            var left_block = ev.add;
                            if (left_block) {
                                var leftBlocksElem = ge("left_blocks"),
                                    left_unpaid_gifts = se(left_block);
                                leftBlocksElem && (leftBlocksElem.firstChild ? leftBlocksElem.insertBefore(left_unpaid_gifts, leftBlocksElem.firstChild) : leftBlocksElem.appendChild(left_unpaid_gifts))
                            }
                            break;
                        case "call_start":
                            window.Call ? Call.incomingReceive(ev) : stManager.add(["call.js", "call.css", "notifier.css"], function() {
                                Call.incomingReceive(ev)
                            }), push = 0;
                            break;
                        case "call":
                            window.Call ? Call.processNotify(ev) : debugLog("wnd Call event without call obj"), push = 0;
                            break;
                        case "call_app":
                            var callId = ev.custom.call_id,
                                onScriptCame = function onScriptCame(script) {
                                    clearTimeout(curNotifier.appCallTimeout), script = script && script[0] == callId ? script[1] : !1, script && -1 != script && stManager.add(["call.js", "call.css", "apps.js", "apps.css"], function() {
                                        eval(script)
                                    })
                                };
                            curNotifier.appCallTimeout = setTimeout(function() {
                                var e = curNotifier.recvData.apps_call_receive;
                                e = e && e[0] == callId ? e[1] : !1, e || (ajax.post("/al_apps.php", {
                                    act: "call_receive"
                                }, {
                                    onDone: function(e) {
                                        debugLog("script came"), e = [callId, e], Notifier.lcSend("apps_call_receive", e), onScriptCame(e)
                                    },
                                    stat: ["call.js", "call.css", "apps.js", "apps.css"]
                                }), Notifier.lcSend("apps_call_receive", [callId, -1]))
                            }, 0), Notifier.setRecvClbk("apps_call_receive", onScriptCame), push = 0;
                            break;
                        case "call_app_reject":
                            "app" == cur.module && cur.aid == ev.custom.aid && cur.app.runCallback("onCallReject", ev.custom.key), push = 0;
                            break;
                        case "call_app_accept":
                            "app" == cur.module && cur.aid == ev.custom.aid && cur.app.runCallback("onCallAccept", ev.custom.key), push = 0;
                            break;
                        case "notify_tt":
                        case "login_attempt":
                            ev.add && (ev.add = eval("(" + ev.add + ")"), TopNotifier.showTooltip(ev.add.text, ev.add.key)), push = 0;
                            break;
                        case "reload_stickers":
                            window.Emoji && window.Emoji.stickers && (Emoji.stickers = !1), push = 0
                    }
                    return "mail" === ev.type && (push = this.sendMailNotification(ev)), 1 & push && (curNotifier.q_events.push(ev), curNotifier.q_events.length > 30 && curNotifier.q_events.splice(0, curNotifier.q_events.length - 30), this.checkEvents()), push
                }
            }
        },
        isActive: function() {
            return window.curNotifier && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle
        },
        sendImProxy: function(e) {
            e.text = winToUtf(e.text), curNotifier.browser_shown[e.id] || (curNotifier.browser_shown[e.id] = !0, Notifier.trySendBrowserNotification(e, !0), setTimeout(function() {
                curNotifier.browser_shown[e.id] = void 0
            }, 2e3))
        },
        shouldShowNotification: function(e) {
            return "im" !== cur.module && !FastChat.isChatOpen(e.author_id)
        },
        sendSimpleNotification: function(e) {
            return Notifier.playSound(e), Notifier.shouldShowNotification(e) ? 3 : 0
        },
        sendBrowserNotification: function(e) {
            "im" !== cur.module ? Notifier.negotiate({
                message: "send_im_notification",
                onSuccess: function(t) {
                    Notifier.lcSend("negotiate_back", {
                        token: t.msg,
                        ev: e
                    })
                },
                onFail: function() {
                    Notifier.showBrowserNotification(e)
                }
            }) : (e.onclick = "IM.activateTab(" + e.author_id + ");", Notifier.showBrowserNotification(e))
        },
        shouldPlaySound: function(e) {
            return !ls.get("sound_notify_off") && Notifier.shouldDisturb(e)
        },
        shouldDisturb: function(e) {
            return cur.noDisturbMode ? !1 : cur.focused != e.author_id && !inArray(e.author_id, cur.mutedPeers) && !inArray(e.author_id, curNotifier.mutedPeers)
        },
        shouldPlayCurrentSound: function(e) {
            return !ls.get("sound_notify_off") && cur.focused == e.author_id && hasAccessibilityMode() && !inArray(e.author_id, cur.mutedPeers)
        },
        playSound: function(e) {
            curNotifier.sound_im && curNotifier.sound_im.play && Notifier.shouldPlaySound(e) ? e.author_id == cur.peer && hasAccessibilityMode() ? curNotifier.sound_im_current.play() : curNotifier.sound_im.play() : Notifier.shouldPlayCurrentSound(e) && curNotifier.sound_im_current && curNotifier.sound_im_current.play()
        },
        trySendBrowserNotification: function(e, t) {
            Notifier.negotiate({
                message: "who_is_active",
                msg: e.author_id,
                onFail: function() {
                    !Notifier.canNotifyUi() || cur.peer == e.author_id && Notifier.isActive() ? t ? Notifier.playSound(e) : (Notifier.lcSend("show_notification", e), Notifier.shouldShowNotification(e) && Notifier.showEvent(e, !0), Notifier.playSound(e)) : Notifier.sendBrowserNotification(e)
                }
            })
        },
        showBrowserNotification: function(e) {
            Notifier.showEventUi(e), Notifier.playSound(e)
        },
        proxyIm: function(e) {
            return this.isActive() ? (this.playSound(e), void(Notifier.canNotifyUi() && cur.peer != e.author_id && Notifier.shouldDisturb(e) && Notifier.showEventUi(e))) : void(curNotifier.is_server ? (e.onclick = "IM.activateTab(" + e.author_id + ");", this.sendImProxy(e)) : curNotifier.is_server || this.lcSend("message_from_im", e))
        },
        sendMailNotification: function(e) {
            if ("im" == cur.module ? e.onclick = "IM.activateTab('" + e.author_id + "');" : e.onclick = "FastChat.selectPeer('" + e.author_id + "');", this.isActive() && Notifier.canNotifyUi()) this.playSound(e), this.shouldDisturb(e) && cur.peer != e.author_id && this.showEventUi(e);
            else {
                if (this.isActive() && this.shouldDisturb(e)) return this.sendSimpleNotification(e);
                curNotifier.is_server && this.shouldDisturb(e) && this.trySendBrowserNotification(e)
            }
            return 0
        },
        checkEvents: function() {
            if (!(!curNotifier.q_events.length || curNotifier.q_shown.length >= (curNotifier.idle_manager.is_idle ? curNotifier.q_idle_max : curNotifier.q_max) || !curNotifier.idle_manager.is_idle && curNotifier.frozen)) {
                var e = curNotifier.q_events.shift();
                this.showEvent(e)
            }
        },
        showEvent: function showEvent(ev, force) {
            ev.custom && ev.custom.ttl && (0, _im_shared_helpers.confirmDelivery)(ev.custom.id), curNotifier.q_shown.push(ev);
            var thumbEl = "";
            thumbEl = "video_process_ready" == ev.type ? '<div class="notifier_video_thumb" style="background-image: url(' + Notifier.fixPhoto(ev.author_photo) + ')"></div>' : '<img src="' + Notifier.fixPhoto(ev.author_photo) + '" class="notifier_image" />';
            var typeClassName = "notifier_type_" + ev.type;
            ev.baloonWrapEl = ce("div", {
                className: "notifier_baloon_wrap",
                innerHTML: '<div class="notifier_baloon ' + typeClassName + '"><div class="notifier_baloon_head clear_fix"><a class="notifier_close_wrap" role="link" title="' + getLang("global_close") + '" aria-label="' + getLang("global_close") + '"></a><h4 class="notifier_baloon_title">' + ev.title + '</h4></div><div class="notifier_baloon_body clear_fix">' + (ev.author_photo && '<div class="notifier_image_wrap">' + (ev.author_link && '<a href="' + ev.author_link + '">') + thumbEl + (ev.author_link && "</a>") + "</div>") + (ev.add_photo && '<div class="notifier_add_image_wrap"><img src="' + ev.add_photo + '" class="notifier_add_image" /></div>') + '<div class="notifier_baloon_msg wrapped">' + ev.text + "</div></div></div>"
            }), ev.baloonEl = ev.baloonWrapEl.firstChild, ev.closeEl = geByClass1("notifier_close_wrap", ev.baloonEl), addEvent(ev.baloonEl, "mouseover mouseout", function(e) {
                ev.over = "mouseover" == e.type, ev.over ? Notifier.freezeEvents() : Notifier.unfreezeEvents()
            }), addEvent(ev.baloonEl, "mousedown click", function(e) {
                e = e.originalEvent || e || window.event;
                var btn = e.which,
                    nohide = !1;
                if (1 == btn && (e.ctrlKey || browser.mac && e.metaKey) && (btn = 2, browser.mac && (nohide = !0)), "A" != (e.target || e.srcElement).tagName) {
                    switch (btn) {
                        case 1:
                            eval(ev.onclick), Notifier.hideEvent(ev);
                            break;
                        case 2:
                            var wnd = window.open(ev.link, "_blank");
                            try {
                                wnd.blur(), window.focus()
                            } catch (e) {}
                            nohide || Notifier.hideEvent(ev);
                            break;
                        case 3:
                            if (browser.mozilla) return
                    }
                    return cancelEvent(e)
                }
                switch (btn) {
                    case 1:
                        break;
                    case 3:
                }
            }), addEvent(ev.baloonEl, "contextmenu", function(e) {
                return setTimeout(function() {
                    Notifier.hideEvent(ev, !1, !1, !0)
                }, 10), cancelEvent(e)
            }), addEvent(ev.closeEl, "mousedown click", function(e) {
                return Notifier.hideEvent(ev, !1, !1, !0), cancelEvent(e)
            }), ev.startFading = function() {
                ev.fading = animate(ev.baloonEl, {
                    opacity: 0
                }, 1e3, Notifier.hideEvent.bind(Notifier).pbind(ev, !1)), ev.over && ev.fading.stop()
            }, curNotifier.cont.insertBefore(ev.baloonWrapEl, curNotifier.cont.firstChild);
            var h = ev.baloonWrapEl.offsetHeight;
            re(ev.baloonWrapEl), curNotifier.cont.appendChild(ev.baloonWrapEl), setStyle(curNotifier.cont, {
                bottom: -h
            }), setStyle(ev.baloonWrapEl, {
                visibility: "visible"
            }), animate(curNotifier.cont, {
                bottom: 0
            }, 200), (!curNotifier.idle_manager.is_idle || force) && (ev.fadeTO = setTimeout(ev.startFading, hasAccessibilityMode() ? 35e3 : 7e3))
        },
        canNotifyUi: function() {
            return !ls.get("im_ui_notify_off") && DesktopNotifications.supported() && DesktopNotifications.checkPermission() <= 0
        },
        showEventUi: function showEventUi(ev) {
            if (!this.canNotifyUi()) return !1;
            var title, text;
            if (ev.custom && ev.custom.ttl && (0, _im_shared_helpers.confirmDelivery)(ev.custom.id), "mail" === ev.type) {
                var div = ce("div");
                div.innerHTML = ev.text, title = div.firstChild.textContent.trim(), text = stripHTML(replaceEntities(ev.text.replace(/<br\/?>/g, "\n")).replace(/<span class='notifier_author_quote'.*<\/span>(.*?)/, "$1").replace(/<img.*?alt="(.*?)".*?>/gi, "$1")).replace(/&laquo;|&raquo;/gi, '"').trim()
            } else title = ev.title, text = ev.text;
            var notification = ev.uiNotification = DesktopNotifications.createNotification(ev.author_photo, title, text);
            return curNotifier.uiNotifications.push([notification, vkNow()]), notification.onclick = function(e) {
                window.focus(), "IM" === ev.onclick.substr(0, 2) && "im" !== cur.module ? FastChat.selectPeer(intval(ev.author_id)) : eval(ev.onclick), Notifier.hideEvent(ev)
            }, notification.onclose = function() {
                Notifier.hideEvent(ev, !0)
            }, notification.show(), ev.closeTO = setTimeout(Notifier.hideEvent.bind(Notifier).pbind(ev), 5e3), !0
        },
        hideEvent: function(e, t, i, a) {
            clearTimeout(e.closeTO), clearTimeout(e.fadeTO), e.fading && e.fading.stop();
            var r, n = indexOf(curNotifier.q_shown, e); - 1 != n && curNotifier.q_shown.splice(n, 1), Notifier.unfreezeEvents(), t || (e.baloonWrapEl ? (cleanElems(e.closeEl, e.baloonEl), re(e.baloonWrapEl)) : e.uiNotification && e.uiNotification.cancel()), a === !0 && isArray(curNotifier.q_closed) && (curNotifier.q_closed.unshift(vkNow()), (r = curNotifier.q_closed.length) > 3 && (curNotifier.q_closed.splice(3, r - 3), r = 3), 3 == r && curNotifier.q_closed[0] - curNotifier.q_closed[2] < 700 && Notifier.hideAllEvents()), -1 != a && this.checkEvents(), "frame" != curNotifier.transport || i || this.lcSend("hide", {
                event_id: e.id
            }), a !== !0 && curNotifier.idle_manager.is_idle || curNotifier.q_events.length || curNotifier.q_shown.length || ajax.post("notifier.php", {
                act: "a_clear_notifier"
            })
        },
        hideAllEvents: function() {
            curNotifier.q_events = [], each(clone(curNotifier.q_shown), function() {
                Notifier.hideEvent(this, !1, !0, -1)
            }), curNotifier.q_shown = [], curNotifier.q_closed = []
        },
        onEventHide: function(e) {
            e && (each(curNotifier.q_shown, function() {
                return this.id == e ? (Notifier.hideEvent(this, !1, !0), !1) : void 0
            }), each(curNotifier.q_events, function(t) {
                return this.id == e ? (curNotifier.q_events.splice(t, 1), !1) : void 0
            }))
        },
        lcInit: function() {
            if (curNotifier.post_message) {
                addEvent(window, "message", this.lcOnMessage.bind(this));
                var e = curNotifier.storage_el = ce("iframe", {
                    id: "queue_storage_frame",
                    name: "queue_storage_frame",
                    src: "/notifier.php?act=storage_frame&from=" + location.host + (Notifier.debug ? "&debug=" + vkNow() : "&4") + "#" + curNotifier.connection_id
                });
                Notifier.getTransportWrap().appendChild(e), curNotifier.storage_frame = e.contentWindow, curNotifier.storage_frame_origin = location.protocol + "//" + locHost
            } else browser.msie && intval(browser.version) < 9 ? addEvent(document, "storage", this.lcOnStorage.bind(this)) : addEvent(window, "storage", this.lcOnStorage.bind(this)), this.lcStart()
        },
        lcStart: function() {
            Notifier.lcCheckServer() ? this.lcServer() : (this.lcSend("check"), clearTimeout(curNotifier.becomeServerTO), curNotifier.becomeServerTO = setTimeout(this.lcServer.bind(this).pbind(!0), 500)), curNotifier.checkServerInt = setInterval(function() {
                curNotifier.is_server || (!curNotifier.idle_manager.is_idle && curNotifier.idle_manager.getActiveTime() > ACTIVE_TAB_SWITCH_SERVER_TIMEOUT && (Notifier.debug && debugLog("this tab wants to become server"), ls.set(LC_SERVER_SWITCH_TO_ACTIVE_FLAG, !0), this.lcServer(!0)), vkNow() - curNotifier.last_succ > 8e3 && Notifier.lcCheckServer() && (Notifier.debug && debugLog("timeout"), this.lcServer(!0)))
            }.bind(this), 1e3 + intval(rand(-100, 100))), curNotifier.isServerBroadcastInt = setInterval(function() {
                curNotifier.is_server && (Notifier.lcCheckServer() ? this.lcSend("check_ok") : (Notifier.debug && debugLog("no server from server broadcast"), this.lcNoServer()))
            }.bind(this), 5e3 + intval(rand(-100, 100))), void 0 !== curNotifier.fc && stManager.add(["emoji.js"], function() {
                FastChat.init(curNotifier.fc)
            })
        },
        lcStop: function() {
            clearInterval(curNotifier.isServerBroadcastInt), clearInterval(curNotifier.checkServerInt), clearTimeout(curNotifier.becomeServerTO)
        },
        lcSend: function(e, t) {
            if (!curNotifier.connection_id) return curNotifier.onConnectionId.push(Notifier.lcSend.pbind(e, t)), !1;
            Notifier.debug && debugLog(curNotifier.instance_id + ": sending", e, t || "");
            var i = extend({
                __client: curNotifier.instance_id,
                __act: e,
                __rnd: Math.random()
            }, t || {});
            if (curNotifier.post_message) try {
                curNotifier.storage_frame.postMessage(curNotifier.connection_id + ":" + JSON.stringify(i), curNotifier.storage_frame_origin)
            } catch (a) {
                debugLog(a, a.message, a.stack)
            } else ls.set(curNotifier.connection_id, i)
        },
        lcRecv: function(e) {
            if (!isEmpty(e) && e.__client != curNotifier.instance_id) {
                var t = e.__act;
                switch (delete e.__client, delete e.__act, delete e.__rnd, Notifier.debug && debugLog(curNotifier.instance_id + ": recv", t, e), t) {
                    case "new_server":
                        curNotifier.last_succ = vkNow() + 1e3;
                        break;
                    case "feed":
                        curNotifier.timestamp = e.ts, curNotifier.key = e.key, Notifier.pushEvents(e.events, !e.full);
                        break;
                    case "addfeed":
                        Notifier.addFeed(e[0], e[1]);
                        break;
                    case "new_key":
                        debugLog("new key", e), curNotifier.timestamp = e.ts, curNotifier.key = e.key;
                        break;
                    case "new_addkey":
                        var i = e.queue || e.key,
                            a = curNotifier.addQueues[i],
                            r = !a && curNotifier.is_server;
                        a ? a[0] = vkNow() : curNotifier.addQueues[i] = [vkNow(), e.ts, e.key], r && Notifier.lpReset(Notifier.lpCheck.bind(Notifier));
                        break;
                    case "clear_addkeys":
                        curNotifier.addQueues = {};
                        break;
                    case "check_ok":
                        curNotifier.last_succ = vkNow(), curNotifier.becomeServerTO && (clearTimeout(curNotifier.becomeServerTO), curNotifier.becomeServerTO = !1), curNotifier.lp_connected || (curNotifier.lp_connected = !0, Notifier.onConnectionInit());
                        break;
                    case "focus":
                        Notifier.onInstanceFocus(e.instance_id);
                        break;
                    case "hide":
                        Notifier.onEventHide(e.event_id);
                        break;
                    case "check_playlist":
                        var n = ls.get("pad_playlist");
                        n && n.instance == curNotifier.instance_id && ls.set("pad_pltime", vkNow());
                        break;
                    case "who_is_active":
                        Notifier.isActive() && (intval(e.msg) > 2e9 && "im" === cur.module || intval(e.msg) < 2e9) && this.lcSend("negotiate_back", e);
                        break;
                    case "show_notification":
                        Notifier.shouldShowNotification(e) && Notifier.showEvent(e, !0);
                        break;
                    case "send_im_notification":
                        if ("im" === cur.module) {
                            var o = Notifier.createNegotiationSlot({
                                onSuccess: function(e) {
                                    e.ev.onclick = "IM.activateTab(" + e.ev.author_id + ");", Notifier.showBrowserNotification(e.ev)
                                }
                            });
                            Notifier.lcSend("negotiate_back", {
                                msg: o.token,
                                token: e.token
                            })
                        }
                        break;
                    case "negotiate_back":
                        Notifier.endNegotiation(e);
                        break;
                    case "recent_emoji_set":
                        window.Emoji && Emoji.setRecentEmojiList(e);
                        break;
                    default:
                        if (curNotifier.recvClbks && curNotifier.recvClbks[t])
                            for (var s in curNotifier.recvClbks[t]) curNotifier.recvClbks[t][s](e);
                        else curNotifier.recvData[t] = e
                }
                if (curNotifier.is_server) switch (t) {
                    case "new_server":
                    case "new_key":
                    case "check_ok":
                        Notifier.debug && debugLog("no server from lcRecv", t), Notifier.lcNoServer();
                        break;
                    case "check":
                        this.lcSend("check_ok");
                        break;
                    case "message_from_im":
                        Notifier.sendImProxy(e)
                }
            }
        },
        negotiate: function(e) {
            e = this.createNegotiationSlot(e), this.lcSend(e.message, {
                token: e.token,
                msg: e.msg
            })
        },
        createNegotiationSlot: function(e) {
            var t = "negotiations_" + Date.now() + Math.round(rand(0, 1e4));
            return e = extend({
                timeout: 3e3,
                token: t,
                msg: ""
            }, e), curNotifier.negotiations[e.token] = {}, curNotifier.negotiations[e.token].timer = setTimeout(function() {
                e.onFail && e.onFail(), curNotifier.negotiations[e.token] && (curNotifier.negotiations[e.token] = void 0)
            }, e.timeout), curNotifier.negotiations[e.token].success = e.onSuccess, e
        },
        endNegotiation: function(e) {
            var t = e.token,
                i = curNotifier.negotiations[t];
            i && (clearTimeout(i.timer), curNotifier.negotiations[t].success && curNotifier.negotiations[t].success(e), curNotifier.negotiations[t] = void 0)
        },
        lcOnStorage: function(e) {
            e = e || window.event, Notifier.debug && debugLog("onstorage", e.key, e.newValue, e);
            var t = e.key,
                i = e.newValue;
            if (i) {
                if (t) {
                    if (e.key != curNotifier.connection_id) return
                } else {
                    if (t = curNotifier.connection_id, i = localStorage.getItem(t), i == curNotifier.lc_prev_value) return;
                    curNotifier.lc_prev_value = i
                }
                this.lcRecv(JSON.parse(i) || {})
            }
        },
        lcOnMessage: function(e) {
            if (e = e || window.event, Notifier.debug && debugLog("onmessage", e.data, e.origin, e), !(e.origin && e.origin != curNotifier.storage_frame_origin || "string" != typeof e.data || e.data.indexOf("q_st"))) {
                var t, i = e.data.substr(4);
                if ("ready" == i) curNotifier.storage_frame = e.source, this.lcStart();
                else {
                    if (-1 == (t = i.indexOf(":")) || i.substr(0, t) != curNotifier.connection_id || !i.substr(t + 1)) return;
                    this.lcRecv(JSON.parse(i.substr(t + 1)))
                }
            }
        },
        lcServer: function(e) {
            Notifier.debug && debugLog("becoming server"), this.lpInit(), this.lcSend("new_server"), Notifier.lcCheckServer(!0), curNotifier.is_server = !0, Notifier.onInstanceServer(1), curNotifier.lp_connected || (curNotifier.lp_connected = !0, Notifier.onConnectionInit()), window.curFastChat && curFastChat.inited && FastChat.becameServer(), this.lpStop(), e ? this.lpReset(this.lpStart.bind(this)) : this.lpStart()
        },
        lcNoServer: function() {
            this.lpStop(), curNotifier.is_server && (Notifier.debug && debugLog("not server now"), this.onInstanceServer(0), curNotifier.is_server = !1)
        },
        lcCheckServer: function(e) {
            var t, i = "server_" + curNotifier.connection_id,
                a = vkNow();
            return !e && isArray(t = ls.get(i)) && t[0] != curNotifier.instance_id && a - t[1] < 8e3 ? !1 : (ls.set(i, [curNotifier.instance_id, a]), !0)
        },
        lpInit: function() {
            curNotifier.lpMakeRequest || (delete curNotifier.lpMakeRequest, re("queue_transport_frame"), Notifier.getTransportWrap().appendChild(ce("iframe", {
                id: "queue_transport_frame",
                name: "queue_transport_frame",
                src: curNotifier.frame_path
            })))
        },
        lpStart: function() {
            curNotifier.lp_started = !0, curNotifier.lpInvalid ? Notifier.lpGetKey() : Notifier.lpCheck()
        },
        lpStop: function() {
            curNotifier.lp_started = !1, clearTimeout(curNotifier.lp_check_to), clearTimeout(curNotifier.lp_error_to), clearTimeout(curNotifier.lp_req_check_to)
        },
        lpCheck: function lpCheck() {
            if (curNotifier.lp_started && !curNotifier.lpActive && !curNotifier.lpInvalid) {
                if (!curNotifier.lpMakeRequest) return clearTimeout(curNotifier.lp_check_to), void(curNotifier.lp_check_to = setTimeout(this.lpCheck.bind(this), 1e3));
                if (!Notifier.lcCheckServer()) return Notifier.debug && debugLog("no server from check"), void this.lcNoServer();
                var now = vkNow(),
                    add_queues = [],
                    completed = !1,
                    params = {
                        act: "a_check",
                        ts: curNotifier.timestamp,
                        key: curNotifier.key,
                        id: curNotifier.uid,
                        wait: 25
                    };
                each(curNotifier.addQueues, function(e, t) {
                    return now - t[0] > 3e4 && !e.match(/nccts/) ? (debugLog("drop key", e, now - t[0]), void delete curNotifier.addQueues[e]) : (add_queues.push(e), params.ts += "_" + t[1], void(params.key += t[2]))
                });
                var onFail = function(e) {
                    completed || (completed = !0, curNotifier.lpActive = !1, clearTimeout(curNotifier.lp_req_check_to), curNotifier.error_timeout = curNotifier.error_timeout || 1, clearTimeout(curNotifier.lp_error_to), curNotifier.lp_error_to = setTimeout(this.lpCheck.bind(this), 1e3 * curNotifier.error_timeout + irand(1e3, 1e4)), curNotifier.error_timeout < 64 && (curNotifier.error_timeout *= 2))
                }.bind(this);
                curNotifier.lpActive = !0, clearTimeout(curNotifier.lp_req_check_to), curNotifier.lp_req_check_to = setTimeout(onFail, 1e3 * (params.wait + 5)), curNotifier.lpMakeRequest(curNotifier.frame_url, params, function(text) {
                    if (!completed && (completed = !0, curNotifier.lpActive = !1, curNotifier.lp_started)) {
                        this.lcSend("check_ok");
                        try {
                            var response = eval("(" + text + ")"),
                                main_response = response,
                                add_response, add_queue, busy = 0;
                            if (isArray(response))
                                for (main_response = response.shift();
                                    (add_response = response.shift()) && (add_queue = add_queues.shift());) 2 != add_response.failed || 4 != add_response.err ? (this.lcSend("addfeed", [add_queue, add_response]), this.addFeed(add_queue, add_response), add_response.failed && delete curNotifier.addQueues[add_queue]) : (Notifier.debug && debugLog("!!notifier key busy!! " + curNotifier.instance_id), busy |= 1);
                            else if (response.failed) {
                                for (; add_queue = add_queues.shift();) this.lcSend("addfeed", [add_queue, response]), this.addFeed(add_queue, response), delete curNotifier.addQueues[add_queue];
                                this.lcSend("clear_addkeys")
                            }
                            switch (this.lpChecked(main_response)) {
                                case 0:
                                    break;
                                case 1:
                                    return;
                                case 2:
                                    busy |= 2;
                                    break;
                                default:
                                    return
                            }
                            busy ? ls.get(LC_SERVER_SWITCH_TO_ACTIVE_FLAG) ? ls.remove(LC_SERVER_SWITCH_TO_ACTIVE_FLAG) : this.lcNoServer() : (clearTimeout(curNotifier.lpCheckTO), curNotifier.lpCheckTO = setTimeout(this.lpCheck.bind(this), curNotifier.request_timeout || 1e3), curNotifier.error_timeout = Math.max(1, (curNotifier.error_timeout || 1) / 1.5))
                        } catch (e) {
                            text && -1 == text.indexOf("Ad Muncher") && (topError("Notifier error: " + e.message, {
                                dt: -1,
                                type: 5,
                                stack: e.stack,
                                answer: text + "\n\nbusy:" + busy + "\nserver:" + curNotifier.is_server + "\ninstance:" + curNotifier.instance_id,
                                url: curNotifier.frame_url,
                                query: params && ajx2q(params)
                            }), debugLog(e.message, e.stack, e)), curNotifier.error_timeout = curNotifier.error_timeout || 1, clearTimeout(curNotifier.lp_error_to), curNotifier.lp_error_to = setTimeout(this.lpCheck.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 64 && (curNotifier.error_timeout *= 2)
                        }
                    }
                }.bind(this), onFail)
            }
        },
        lpChecked: function(e) {
            var t = e.failed;
            if (2 == t) return 4 == e.err ? 2 : (curNotifier.lpInvalid = !0, debugLog("notifier lpCheck error", e),
                clearTimeout(curNotifier.lp_error_to), curNotifier.lp_error_to = setTimeout(this.lpGetKey.bind(this), 1e3 * curNotifier.error_timeout), curNotifier.error_timeout < 64 && (curNotifier.error_timeout *= 2), 1 == e.err ? 1 : 3);
            if (t) throw getLang("global_unknown_error");
            return this.lcSend("feed", extend({
                full: curNotifier.idle_manager && curNotifier.idle_manager.is_idle && !this.canNotifyUi(),
                key: curNotifier.key
            }, e)), curNotifier.timestamp = e.ts, Notifier.pushEvents(e.events), 0
        },
        lpOnReset: function() {
            curNotifier.lpOnReset && curNotifier.lpOnReset()
        },
        lpReset: function(e) {
            curNotifier.lpOnReset = e, clearTimeout(curNotifier.resetTO), curNotifier.resetTO = setTimeout(function() {
                if (curNotifier.is_server && !curNotifier.lp_started) return void Notifier.lpStart();
                if (curNotifier.lpMakeRequest && !curNotifier.lpInvalid) {
                    var e = curNotifier.key,
                        t = curNotifier.timestamp;
                    each(curNotifier.addQueues, function(i, a) {
                        e += a[2], t += "_" + a[1]
                    }), curNotifier.lpMakeRequest(curNotifier.frame_url, {
                        act: "a_release",
                        key: e,
                        ts: t,
                        id: curNotifier.uid,
                        wait: 25
                    }, Notifier.lpOnReset, Notifier.lpOnReset)
                } else ajax.post("notifier.php?act=a_reset", !1, {
                    onDone: Notifier.lpOnReset,
                    onFail: function() {
                        return Notifier.lpOnReset(), !0
                    }
                })
            }, 100)
        },
        lpGetKey: function() {
            ajax.post("notifier.php?act=a_get_key", {
                id: curNotifier.uid
            }, {
                onDone: function(e, t) {
                    curNotifier.timestamp = t, curNotifier.key = e, curNotifier.lpInvalid = !1, debugLog("notifier lpGetKey done"), this.lcSend("new_key", {
                        ts: t,
                        key: e
                    }), this.lpCheck()
                }.bind(this),
                onFail: function(e) {
                    switch (debugLog("notifier lpGetKey fail", e), e) {
                        case 1:
                        case 3:
                            return void Notifier.standby();
                        case 4:
                            return void Notifier.standby(300);
                        case 2:
                            return void Notifier.onRelogin()
                    }
                    return curNotifier.error_timeout = 64, clearTimeout(this.lp_error_to), this.lp_error_to = setTimeout(this.lpGetKey.bind(this), 1e3 * curNotifier.error_timeout), !0
                }.bind(this)
            })
        },
        addKey: function(e, t, i) {
            if (curNotifier.flash_transport || !e) return !1;
            var a = e.queue || e.key,
                r = curNotifier.addQueues[a],
                n = !r && curNotifier.is_server;
            return r ? (r[0] = vkNow(), r[3] = t, r[4] = i) : curNotifier.addQueues[a] = [vkNow(), e.ts, e.key, t, i], i || Notifier.lcSend("new_addkey", e), n && Notifier.lpReset(Notifier.lpCheck.bind(Notifier)), !0
        },
        addFeed: function(e, t) {
            var i = curNotifier.addQueues[e];
            isArray(i) && i.length && (i[1] = t.ts, isFunction(i[3]) && i[3](e, t))
        },
        addRecvClbk: function(e, t, i, a) {
            curNotifier.recvClbks || (curNotifier.recvClbks = {}), curNotifier.recvClbks[e] || (curNotifier.recvClbks[e] = {}), (!curNotifier.recvClbks[e][t] || a) && (curNotifier.recvClbks[e][t] = i)
        },
        setRecvClbk: function(e, t) {
            curNotifier.recvClbks || (curNotifier.recvClbks = {}), curNotifier.recvClbks[e] = [t]
        },
        fixPhoto: function(e, t) {
            return e = clean(e), -1 == e.indexOf("question_c.gif") ? e : t ? "/images/question_inv_xc.png" : "/images/question_inv_c.png"
        }
    }
}, function(e, t, i) {
    var a = i(72);
    e.exports = function(e, t, i, r) {
        try {
            return r ? t(a(i)[0], i[1]) : t(i)
        } catch (n) {
            var o = e["return"];
            throw void 0 !== o && a(o.call(e)), n
        }
    }
}, , function(e, t, i) {
    "use strict";

    function a(e) {
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

    function r(e, t, i, a) {
        l(t, i, a), e._registeredHandlers.push(["bind", t, i, a])
    }

    function n(e, t, i, a, r) {
        (0, c.addDelegateEvent)(t, i, a, r), e._registeredHandlers.push(["delegate", t, i, a, r])
    }

    function o(e) {
        var t = {
            _registeredHandlers: []
        };
        return e.handlers(r.bind(null, t), n.bind(null, t)), t
    }

    function s(e) {
        e._registeredHandlers.forEach(function(e) {
            var t = e.slice(1);
            "delegate" === e[0] ? c.removeDelegateEvent.apply(void 0, t) : d.apply(void 0, t)
        }), e._registeredHandlers = []
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.createMutations = a, t.createModule = o, t.destroyModule = s;
    var c = i(108),
        u = window,
        l = u.addEvent,
        d = u.removeEvent
}, function(e, t, i) {
    var a = i(130),
        r = Math.min;
    e.exports = function(e) {
        return e > 0 ? r(a(e), 9007199254740991) : 0
    }
}, function(e, t) {
    e.exports = function(e, t, i, a) {
        if (!(e instanceof t) || void 0 !== a && a in e) throw TypeError(i + ": incorrect invocation!");
        return e
    }
}, function(e, t, i) {
    var a = i(75),
        r = i(93)("toStringTag"),
        n = "Arguments" == a(function() {
            return arguments
        }()),
        o = function(e, t) {
            try {
                return e[t]
            } catch (i) {}
        };
    e.exports = function(e) {
        var t, i, s;
        return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(i = o(t = Object(e), r)) ? i : n ? a(t) : "Object" == (s = a(t)) && "function" == typeof t.callee ? "Arguments" : s
    }
}, function(e, t, i) {
    var a = i(130),
        r = i(100);
    e.exports = function(e) {
        return function(t, i) {
            var n, o, s = String(r(t)),
                c = a(i),
                u = s.length;
            return 0 > c || c >= u ? e ? "" : void 0 : (n = s.charCodeAt(c), 55296 > n || n > 56319 || c + 1 === u || (o = s.charCodeAt(c + 1)) < 56320 || o > 57343 ? e ? s.charAt(c) : n : e ? s.slice(c, c + 2) : (n - 55296 << 10) + (o - 56320) + 65536)
        }
    }
}, function(e, t, i) {
    "use strict";

    function a() {
        var e = lastWindowWidth,
            t = lastWindowHeight,
            i = sbWidth();
        return (lastWndScroll[0] !== !1 ? lastWndScroll[0] : htmlNode.scrollHeight > htmlNode.clientHeight) && (e -= i + (i ? 1 : 0)), [t, e]
    }

    function r() {
        var e = window,
            t = !1;
        t = e.boxLayerWrap && isVisible(boxLayerWrap) ? boxLayerWrap.scrollHeight > boxLayerWrap.clientHeight ? 1 : 0 : e.layerWrap && isVisible(layerWrap) ? layerWrap.scrollHeight > layerWrap.clientHeight ? 1 : 0 : e.mvLayerWrap && isVisible(mvLayerWrap) ? mvLayerWrap.scrollHeight > mvLayerWrap.clientHeight ? 1 : 0 : !1, each(curRBox.tabs, function(e) {
            this.options.marginFixedToLayer && setStyle(this.wrap, {
                marginRight: hasClass(document.body, "layers_shown") ? sbWidth() : 0
            })
        }), t !== lastWndScroll[0] && (lastWndScroll[0] = t, each(curRBox.tabs, function(e) {
            this.toRight && !this.options.marginFixedToLayer && setStyle(this.wrap, {
                marginRight: t ? sbWidth() : 0
            })
        }))
    }

    function n(e, t) {
        var i = '<div class="' + (e.subClass || "") + '"><div class="fc_tab_head"><a class="fc_tab_close_wrap fl_r"><div class="chats_sp fc_tab_close"></div></a><div class="fc_tab_title noselect">%title%</div></div><div id="fc_ctabs_cont"><div class="fc_ctab fc_ctab_active">%content%</div></div></div></div>',
            a = void 0;
        a = e.content ? '<div class="fc_content_wrap"><div class="fc_content">' + e.content + "</div></div>" : e.innerHTML;
        var r = se(rs(i, {
            title: e.title,
            content: a
        }));
        a = geByClass1("fc_content", r, "div");
        var n = {
                movable: geByClass1("fc_tab_head", r),
                hider: geByClass1("fc_tab_close_wrap", r, "a"),
                startLeft: e.x,
                startTop: e.y,
                startHeight: e.height,
                startWidth: e.width,
                resizeableH: a,
                resize: !1,
                minH: e.minH,
                onBeforeHide: e.onBeforeHide || function() {},
                onHide: e.onHide || function() {},
                onDragEnd: function(e, t) {},
                onResize: function(e, t) {}
            },
            o = new RBox(r, extend(n, e)),
            s = void 0;
        return e.content && (s = new Scrollbar(a, {
            prefix: "fc_",
            more: debugLog,
            nomargin: !0,
            global: !0,
            nokeys: !0,
            right: vk.rtl ? "auto" : 0,
            left: vk.rtl ? 0 : "auto",
            onHold: e.onHold
        })), t({
            id: o.id,
            cont: a,
            update: function() {
                s && s.update()
            }
        }), o
    }
    i(82), i(35), i(96), i(24), i(136), i(17), i(65), window.getWndInner = a, window.lastWndScroll = [!1, !1], window.updateWndVScroll = r, window.defBox = n;
    try {
        stManager.done("notifier.js")
    } catch (o) {}
}, function(e, t, i) {
    var a = i(100);
    e.exports = function(e) {
        return Object(a(e))
    }
}, , function(e, t) {
    "use strict";

    function i(e, t) {
        var i = !1,
            a = this,
            r = void 0,
            n = void 0;
        if (!e) throw new Error("Undefined filename");
        t = t || {};
        try {
            n = ce("audio"), i = !!n.canPlayType, "no" != n.canPlayType("audio/mpeg") && "" != n.canPlayType("audio/mpeg") ? r = ".mp3?1" : "no" == n.canPlayType('audio/ogg; codecs="vorbis"') || "" == n.canPlayType('audio/ogg; codecs="vorbis"') || t.forceMp3 ? i = !1 : r = ".ogg?1"
        } catch (o) {}
        var s = t.forcePath || "/" + e + r;
        if (i) {
            n.src = s;
            var c = !1;
            n.addEventListener("ended", function() {
                c = !0
            }, !0), n.load(), this.playSound = function() {
                c && n.load(), n.play(), c = !1
            }, this.pauseSound = function() {
                n.pause()
            }
        } else {
            cur.__sound_guid = cur.__sound_guid || 0;
            var u = ge("flash_sounds_wrap") || utilsNode.appendChild(ce("span", {
                    id: "flash_sounds_wrap"
                })),
                l = "flash_sound_" + cur.__sound_guid++,
                d = {
                    url: "/swf/audio_lite.swf?4",
                    id: l
                },
                f = {
                    swliveconnect: "true",
                    allowscriptaccess: "always",
                    wmode: "opaque"
                };
            if (renderFlash(u, d, f, {})) {
                var h = browser.msie ? window[l] : document[l],
                    p = !1,
                    m = setInterval(function() {
                        if (h && h.paused) try {
                            h.setVolume(1), h.loadAudio(s), h.pauseAudio()
                        } catch (e) {
                            debugLog(e)
                        }
                        p = !0, clearInterval(m)
                    }, 300);
                a.playSound = function() {
                    p && h.playAudio(0)
                }, a.pauseSound = function() {
                    p && h.pauseAudio()
                }
            }
        }
    }
    i.prototype = {
        play: function() {
            try {
                this.playSound()
            } catch (e) {}
        },
        pause: function() {
            try {
                this.pauseSound()
            } catch (e) {}
        }
    }, window.Sound = i
}, , function(e, t, i) {
    "use strict";

    function a(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function r(e, t) {
        return "number" != typeof t.messageId ? !0 : n(t) ? t.messageId > e.out_up_to : t.messageId > e.in_up_to
    }

    function n(e) {
        return e.flags & C.FLAG_OUTBOUND
    }

    function o(e, t) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
            a = e.attaches[0];
        return a && (a.type === t || a.type === i)
    }

    function s(e) {
        return o(e, "doc") && "graffiti" === e.attaches[0].kind
    }

    function c(e) {
        return o(e, "doc") && "audiomsg" === e.attaches[0].kind
    }

    function u(e) {
        return o(e, "sticker")
    }

    function l(e) {
        return o(e, "gift")
    }

    function d(e) {
        return o(e, "money_transfer", "money_request")
    }

    function f(e) {
        return o(e, "money_request")
    }

    function h(e) {
        return o(e, "link") && p(e.kludges.attach1_url)
    }

    function p(e) {
        var t = /^https:\/\/(.+\.)?vk\.com\/vk-me\.php\?act=join&(amp;)?link=[\w\/=_]+$/,
            i = /^https:\/\/vk\.me\/join\/[\w\/=_]+$/;
        return t.test(e) || i.test(e)
    }

    function m(e) {
        return e.flags & C.FLAG_IMPORTANT
    }

    function _(e) {
        return n(e) ? vk.id : e.userId
    }

    function g(e) {
        return e.update_time > 0
    }

    function v(e, t) {
        return (e.get().selectedMessages || []).indexOf(t) >= 0
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.isUnread = r, t.isOut = n, t.isGraffiti = s, t.isAudioMsg = c, t.isSticker = u, t.isGift = l, t.isMoney = d, t.isMoneyRequest = f, t.isMessageWithInviteLink = h, t.isImportant = m, t.getUserId = _, t.wasEdited = g, t.isMessageSelected = v;
    var b = i(59),
        C = a(b)
}, function(e, t) {
    var i = e.exports = {
        version: "2.2.1"
    };
    "number" == typeof __e && (__e = i)
}, function(e, t, i) {
    var a = i(75);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == a(e) ? e.split("") : Object(e)
    }
}, , function(e, t, i) {
    var a = i(85),
        r = i(72),
        n = i(80);
    e.exports = i(67) ? Object.defineProperties : function(e, t) {
        r(e);
        for (var i, o = n(t), s = o.length, c = 0; s > c;) a.f(e, i = o[c++], t[i]);
        return e
    }
}, function(e, t) {
    t.f = {}.propertyIsEnumerable
}, function(e, t, i) {
    var a = i(16),
        r = i(28),
        n = i(11);
    e.exports = function(e) {
        return function(t, i, o) {
            var s, c = a(t),
                u = r(c.length),
                l = n(o, u);
            if (e && i != i) {
                for (; u > l;)
                    if (s = c[l++], s != s) return !0
            } else
                for (; u > l; l++)
                    if ((e || l in c) && c[l] === i) return e || l;
            return !e && -1
        }
    }
}, , function(e, t, i) {
    var a = i(119),
        r = i(122),
        n = i(88),
        o = i(4)("src"),
        s = "toString",
        c = Function[s],
        u = ("" + c).split(s);
    i(38).inspectSource = function(e) {
        return c.call(e)
    }, (e.exports = function(e, t, i, s) {
        var c = "function" == typeof i;
        c && (n(i, "name") || r(i, "name", t)), e[t] !== i && (c && (n(i, o) || r(i, o, e[t] ? "" + e[t] : u.join(String(t)))), e === a ? e[t] = i : s ? e[t] ? e[t] = i : r(e, t, i) : (delete e[t], r(e, t, i)))
    })(Function.prototype, s, function() {
        return "function" == typeof this && this[o] || c.call(this)
    })
}, , , function(e, t, i) {
    "use strict";
    var a = i(85).f,
        r = i(6),
        n = (i(122), i(135)),
        o = i(113),
        s = i(29),
        c = i(100),
        u = i(9),
        l = i(125),
        d = i(139),
        f = i(50),
        h = i(67),
        p = i(121).fastKey,
        m = h ? "_s" : "size",
        _ = function(e, t) {
            var i, a = p(t);
            if ("F" !== a) return e._i[a];
            for (i = e._f; i; i = i.n)
                if (i.k == t) return i
        };
    e.exports = {
        getConstructor: function(e, t, i, l) {
            var d = e(function(e, a) {
                s(e, d, t, "_i"), e._i = r(null), e._f = void 0, e._l = void 0, e[m] = 0, void 0 != a && u(a, i, e[l], e)
            });
            return n(d.prototype, {
                clear: function() {
                    for (var e = this, t = e._i, i = e._f; i; i = i.n) i.r = !0, i.p && (i.p = i.p.n = void 0), delete t[i.i];
                    e._f = e._l = void 0, e[m] = 0
                },
                "delete": function(e) {
                    var t = this,
                        i = _(t, e);
                    if (i) {
                        var a = i.n,
                            r = i.p;
                        delete t._i[i.i], i.r = !0, r && (r.n = a), a && (a.p = r), t._f == i && (t._f = a), t._l == i && (t._l = r), t[m]--
                    }
                    return !!i
                },
                forEach: function(e) {
                    s(this, d, "forEach");
                    for (var t, i = o(e, arguments.length > 1 ? arguments[1] : void 0, 3); t = t ? t.n : this._f;)
                        for (i(t.v, t.k, this); t && t.r;) t = t.p
                },
                has: function(e) {
                    return !!_(this, e)
                }
            }), h && a(d.prototype, "size", {
                get: function() {
                    return c(this[m])
                }
            }), d
        },
        def: function(e, t, i) {
            var a, r, n = _(e, t);
            return n ? n.v = i : (e._l = n = {
                i: r = p(t, !0),
                k: t,
                v: i,
                p: a = e._l,
                n: void 0,
                r: !1
            }, e._f || (e._f = n), a && (a.n = n), e[m]++, "F" !== r && (e._i[r] = n)), e
        },
        getEntry: _,
        setStrong: function(e, t, i) {
            l(e, t, function(e, t) {
                this._t = e, this._k = t, this._l = void 0
            }, function() {
                for (var e = this, t = e._k, i = e._l; i && i.r;) i = i.p;
                return e._t && (e._l = i = i ? i.n : e._t._f) ? "keys" == t ? d(0, i.k) : "values" == t ? d(0, i.v) : d(0, [i.k, i.v]) : (e._t = void 0, d(1))
            }, i ? "entries" : "values", !i, !0), f(t)
        }
    }
}, function(e, t, i) {
    "use strict";
    var a = i(31)(!0);
    i(125)(String, "String", function(e) {
        this._t = String(e), this._i = 0
    }, function() {
        var e, t = this._t,
            i = this._i;
        return i >= t.length ? {
            value: void 0,
            done: !0
        } : (e = a(t, i), this._i += e.length, {
            value: e,
            done: !1
        })
    })
}, function(e, t, i) {
    "use strict";
    var a = i(119),
        r = i(85),
        n = i(67),
        o = i(93)("species");
    e.exports = function(e) {
        var t = a[e];
        n && t && !t[o] && r.f(t, o, {
            configurable: !0,
            get: function() {
                return this
            }
        })
    }
}, , , function(e, t, i) {
    var a = i(56)("keys"),
        r = i(4);
    e.exports = function(e) {
        return a[e] || (a[e] = r(e))
    }
}, function(e, t, i) {
    var a = i(93)("iterator"),
        r = !1;
    try {
        var n = [7][a]();
        n["return"] = function() {
            r = !0
        }, Array.from(n, function() {
            throw 2
        })
    } catch (o) {}
    e.exports = function(e, t) {
        if (!t && !r) return !1;
        var i = !1;
        try {
            var n = [7],
                o = n[a]();
            o.next = function() {
                i = !0
            }, n[a] = function() {
                return o
            }, e(n)
        } catch (s) {}
        return i
    }
}, function(e, t, i) {
    var a = i(124),
        r = i(57).set;
    e.exports = function(e, t, i) {
        var n, o = t.constructor;
        return o !== i && "function" == typeof o && (n = o.prototype) !== i.prototype && a(n) && r && r(e, n), e
    }
}, function(e, t, i) {
    var a = i(119),
        r = "__core-js_shared__",
        n = a[r] || (a[r] = {});
    e.exports = function(e) {
        return n[e] || (n[e] = {})
    }
}, function(e, t, i) {
    var a = i(124),
        r = i(72),
        n = function(e, t) {
            if (r(e), !a(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
        };
    e.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, a) {
            try {
                a = i(113)(Function.call, i(87).f(Object.prototype, "__proto__").set, 2), a(e, []), t = !(e instanceof Array)
            } catch (r) {
                t = !0
            }
            return function(e, i) {
                return n(e, i), t ? e.__proto__ = i : a(e, i), e
            }
        }({}, !1) : void 0),
        check: n
    }
}, function(e, t, i) {
    var a = i(111),
        r = i(93)("iterator"),
        n = Array.prototype;
    e.exports = function(e) {
        return void 0 !== e && (a.Array === e || n[r] === e)
    }
}, function(e, t, i) {
    "use strict";

    function a(e) {
        var t = M(e, 2),
            i = t[1];
        return {
            type: A,
            localId: i
        }
    }

    function r(e) {
        var t = M(e, 4),
            i = t[1],
            a = t[2],
            r = t[3];
        return {
            type: B,
            messageId: i,
            mask: a,
            peerId: r
        }
    }

    function n(e) {
        var t = M(e, 4),
            i = t[1],
            a = t[2],
            r = t[3];
        return {
            type: D,
            messageId: i,
            flags: a,
            peerId: r
        }
    }

    function o(e) {
        var t = M(e, 4),
            i = t[1],
            a = t[2],
            r = t[3];
        return {
            type: j,
            messageId: i,
            flags: a,
            peerId: r
        }
    }

    function s(e) {
        var t = M(e, 11),
            i = t[1],
            a = t[2],
            r = t[3],
            n = t[4],
            o = t[5],
            s = t[6],
            c = t[7],
            u = t[8],
            l = t[9],
            d = t[10],
            f = extend(s, c || void 0);
        return {
            type: H,
            messageId: intval(i),
            flags: intval(a),
            peerId: intval(r),
            date: intval(n),
            attaches: (0, P.convertKludgesToAttaches)(f, i),
            subject: s.title || "",
            text: o,
            kludges: f,
            randomId: intval(u),
            userId: (0, R.isChatPeer)(r) ? intval(f.from) : intval(r),
            update_time: d,
            chat_local_id: l
        }
    }

    function c(e) {
        var t = s(e);
        return t.type = ue, t
    }

    function u(e) {
        return extend({}, e, {
            type: ue
        })
    }

    function l(e) {
        var t = M(e, 4),
            i = t[1],
            a = t[2],
            r = t[3];
        return {
            type: q,
            peerId: i,
            upToId: a,
            unread: r
        }
    }

    function d(e) {
        var t = M(e, 4),
            i = t[1],
            a = t[2],
            r = t[3];
        return {
            type: z,
            peerId: i,
            upToId: a,
            unread: r
        }
    }

    function f(e) {
        var t = M(e, 4),
            i = t[1],
            a = t[2],
            r = t[3];
        return {
            type: U,
            userId: -i,
            platform: a,
            lastSeenTs: r
        }
    }

    function h(e) {
        var t = M(e, 4),
            i = t[1],
            a = t[2],
            r = t[3];
        return {
            type: W,
            userId: -i,
            reason: a,
            lastSeenTs: r
        }
    }

    function p(e) {
        var t = M(e, 4),
            i = t[1],
            a = t[2],
            r = t[3],
            n = void 0 === r ? !1 : r;
        return {
            type: $,
            peerId: i,
            mask: a,
            local: n
        }
    }

    function m(e) {
        var t = M(e, 3),
            i = t[1],
            a = t[2];
        return {
            type: J,
            peerId: i,
            mask: a
        }
    }

    function _(e) {
        var t = M(e, 4),
            i = t[1],
            a = t[2],
            r = t[3],
            n = void 0 === r ? !1 : r;
        return {
            type: Z,
            peerId: i,
            mask: a,
            local: n
        }
    }

    function g(e) {
        var t = M(e, 3),
            i = t[1],
            a = t[2];
        return {
            type: ce,
            peerId: i,
            localId: a
        }
    }

    function v(e) {
        var t = M(e, 3),
            i = t[1],
            a = t[2];
        return {
            type: G,
            chatId: i,
            self: a
        }
    }

    function b(e) {
        var t = M(e, 2),
            i = t[1];
        return {
            type: V,
            userId: i,
            peerId: i
        }
    }

    function C(e) {
        var t = M(e, 3),
            i = t[1],
            a = t[2];
        return {
            type: V,
            userId: i,
            peerId: a + 2e9
        }
    }

    function y(e) {
        var t = M(e, 3),
            i = t[1],
            a = t[2];
        return {
            type: K,
            userId: i,
            callId: a
        }
    }

    function w(e) {
        var t = M(e, 2),
            i = t[1];
        return {
            type: Q,
            count: i
        }
    }

    function k(e) {
        var t = M(e, 2),
            i = t[1],
            a = void 0 === i ? {} : i;
        return {
            type: Y,
            peerId: a.peer_id,
            sound: a.sound,
            disabledUntil: a.disabled_until
        }
    }

    function N(e) {
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

    function F() {
        return {
            type: ee
        }
    }

    function E() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !1,
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
        return {
            type: ie,
            cancelSearch: e,
            removeActivePeer: t
        }
    }

    function x(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1,
            i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !1,
            a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : !1;
        return {
            type: re,
            peerId: e,
            msgid: t,
            forward: i,
            cancelSearch: a
        }
    }

    function S(e) {
        return {
            type: ne,
            tab: e
        }
    }

    function I(e, t, i) {
        return {
            type: oe,
            message: t,
            peer: e,
            error: i
        }
    }

    function O(e) {
        var t = M(e, 6),
            i = (t[0], t[1]),
            a = t[2],
            r = t[3],
            n = t[4],
            o = t[5];
        return {
            type: ae,
            free: !!intval(i) || intval(n) === vk.id,
            resource: a,
            peerId: intval(r),
            who: intval(n),
            name: o
        }
    }

    function L(e, t) {
        return {
            type: se,
            message: t,
            peerId: e
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.FOLDER_UNRESPOND = t.FOLDER_IMPORTANT = t.FLAG_STEALTH = t.FLAG_MEDIA = t.FLAG_DELETED = t.FLAG_SPAM = t.FLAG_FRIENDS = t.FLAG_CHAT = t.FLAG_IMPORTANT = t.FLAG_OUTBOUND = t.FLAG_UNREAD = t.EDIT_MESSAGE = t.DELETE_DIALOG = t.RESEND = t.FAILED_MESSAGE = t.CHANGE_TAB = t.CHANGE_PEER = t.MUTEX = t.RESET_PEER = t.TRANSITION = t.RESYNC = t.SET_DIRECTORIES = t.REPLACE_DIRECTORIES = t.RESET_DIRECTORIES = t.EMPTY = t.NOTIFY_SETTINGS_CHANGED = t.UNREAD_COUNT = t.VIDEO_CALL = t.TYPING = t.CHAT_CHANGED = t.GOT_OFFLINE = t.GOT_ONLINE = t.READ_OUTBOUND = t.READ_INBOUND = t.ADD_MESSAGE = t.RESET_FLAGS = t.REPLACE_FLAGS = t.SET_FLAGS = t.DELETE = void 0;
    var M = function() {
        function e(e, t) {
            var i = [],
                a = !0,
                r = !1,
                n = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (i.push(o.value), !t || i.length !== t); a = !0);
            } catch (c) {
                r = !0, n = c
            } finally {
                try {
                    !a && s["return"] && s["return"]()
                } finally {
                    if (r) throw n
                }
            }
            return i
        }
        return function(t, i) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, i);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.deleteEvent = a, t.replaceFlagsEvent = r, t.setFlagsEvent = n, t.resetFlagsEvent = o, t.addMessageEvent = s, t.editMessageEvent = c, t.editMessageLocallyEvent = u, t.readInboundEvent = l, t.readOutboundEvent = d, t.gotOnlineEvent = f, t.gotOfflineEvent = h, t.resetDirectoriesEvent = p, t.replaceDirectoriesEvent = m, t.setDirectoriesEvent = _, t.deleteDialogEvent = g, t.chatChangedEvent = v, t.typingUserEvent = b, t.typingChatEvent = C, t.videoCallEvent = y, t.unreadCountEvent = w, t.notifySettingsChangedEvent = k, t.emptyEvent = N, t.transitionEvent = T, t.resyncEvent = F, t.resetPeer = E, t.changePeer = x, t.changeTab = S, t.failedMessage = I, t.mutexEvent = O, t.resendEvent = L;
    var R = i(22),
        P = i(69),
        A = t.DELETE = "event_delete",
        D = t.SET_FLAGS = "event_set_flags",
        B = t.REPLACE_FLAGS = "event_replace_flags",
        j = t.RESET_FLAGS = "event_reset_flags",
        H = t.ADD_MESSAGE = "event_add_message",
        q = t.READ_INBOUND = "event_read_inbound",
        z = t.READ_OUTBOUND = "event_read_outbound",
        U = t.GOT_ONLINE = "event_got_online",
        W = t.GOT_OFFLINE = "event_got_offline",
        G = t.CHAT_CHANGED = "event_chat_changed",
        V = t.TYPING = "event_typing",
        K = t.VIDEO_CALL = "event_video_call",
        Q = t.UNREAD_COUNT = "event_unread_count",
        Y = t.NOTIFY_SETTINGS_CHANGED = "event_notify_settings_changed",
        X = t.EMPTY = "event_empty",
        $ = t.RESET_DIRECTORIES = "event_reset_directories",
        J = t.REPLACE_DIRECTORIES = "event_replace_directories",
        Z = t.SET_DIRECTORIES = "event_set_directories",
        ee = t.RESYNC = "event_resync",
        te = t.TRANSITION = "transition_event",
        ie = t.RESET_PEER = "reset_peer",
        ae = t.MUTEX = "mutex",
        re = t.CHANGE_PEER = "change_peer",
        ne = t.CHANGE_TAB = "event_change_tab",
        oe = t.FAILED_MESSAGE = "event_failed_message",
        se = t.RESEND = "event_resend",
        ce = t.DELETE_DIALOG = "event_delete_dialog",
        ue = t.EDIT_MESSAGE = "event_edit_message";
    t.FLAG_UNREAD = 1, t.FLAG_OUTBOUND = 2, t.FLAG_IMPORTANT = 8, t.FLAG_CHAT = 16, t.FLAG_FRIENDS = 32, t.FLAG_SPAM = 64, t.FLAG_DELETED = 128, t.FLAG_MEDIA = 512, t.FLAG_STEALTH = 65536, t.FOLDER_IMPORTANT = 1, t.FOLDER_UNRESPOND = 2
}, , , function(e, t) {
    "use strict";

    function i(e, t) {
        var i = [],
            a = 0;
        return function(r) {
            i.push(r), a || (a = setTimeout(function() {
                a = !1, e(i), i = []
            }, t))
        }
    }

    function a(e) {
        return e.length > 0 && e.pop().func(), e
    }

    function r(e, t) {
        var i = void 0,
            a = void 0;
        if (window.__debugMode) {
            switch (t) {
                case "error":
                    i = "color: red", a = "background: red; color: white";
                    break;
                case "success":
                    i = "color: green", a = "background: green; color: white";
                    break;
                default:
                    i = "color: blue;", a = "background: #000; color: #fff;"
            }
            try {
                var r = new Date;
                console.debug("%cLP:[" + r.getHours() + ":" + r.getMinutes() + ":" + r.getSeconds() + ":" + r.getMilliseconds() + "]%c " + e, a, i)
            } catch (n) {}
        }
    }

    function n(e) {
        var t = [];
        if ("undefined" == typeof e.length) return Object.keys(e).map(function(t) {
            return e[t]
        });
        for (var i = 0; i < e.length; i++) t.push(e[i]);
        return t
    }

    function o(e) {
        for (var t = {}, i = [], a = 0; a < e.length; a++) t[e[a]] || (i.push(e[a]), t[i[a]] = 1);
        return i
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.throttleAccumulate = i, t.executionStackPop = a, t.lplog = r, t.toArray = n, t.arrayUnique = o
}, , , function(module, exports) {
    "use strict";
    window.TopNotifierCur || (window.TopNotifierCur = {
        link: "top_notify_btn",
        count: "top_notify_count",
        _qParams: {
            section: "notifications",
            _tb: 1
        },
        loaded: !1,
        offset: 0
    }), window.TopNotifier = {
        onLoad: function onLoad(rows, js, offset, header) {
            offset && TopNotifierCur.offset == offset || ((void 0 === rows || "undefined" === rows) && ajax.plainpost("/errors.php", {
                msg: ajax.lastResp || "TopNotifier load undefinded response",
                module: "top_notify",
                id: vk.id,
                host: locHost,
                lang: vk.lang,
                loc: (window.nav || {}).strLoc,
                realloc: location.toString()
            }), eval("(function(){" + js + ";})()"), val(TopNotifier.getContentNode(), rows), TopNotifier.refreshHeader(header), TopNotifierCur.offset = offset, TopNotifier.cleanCount(), TopNotifier.refresh())
        },
        refreshHeader: function(e) {
            var t = geByClass1("_notify_sticky"),
                i = geByClass1("_notify_unread"),
                a = e && !geByClass1("_top_notify_header"),
                r = t && t.offsetHeight || i && i.offsetHeight;
            if (a) {
                TopNotifierCur.header = se(e);
                var n = ce("div", {
                    className: "top_notify_header_label"
                });
                TopNotifierCur.header.appendChild(n)
            } else var n = geByClass1("top_notify_header_label", TopNotifierCur.header);
            if (r) {
                if (a || !geByClass1("top_notify_header_sup_label", n)) {
                    var o = ce("div", {
                            className: "top_notify_header_sup_label",
                            innerHTML: getLang("global_unread_notifications")
                        }),
                        s = ce("div", {
                            className: "top_notify_header_sub_label",
                            innerHTML: getLang("global_viewed_notifications")
                        });
                    val(n, ""), n.appendChild(o), n.appendChild(s)
                }
            } else(a || geByClass1("top_notify_header_sup_label", n)) && val(n, getLang("global_notifitications"));
            a && TopNotifierCur.wrapper.insertBefore(TopNotifierCur.header, TopNotifierCur.wrapper.firstChild), TopNotifierCur.header_unread = geByClass1("_notify_header"), TopNotifierCur.header_unread && (r ? (TopNotifierCur.header_unread_hidden && slideDown(TopNotifierCur.header_unread, 100), TopNotifierCur.header_unread_hidden = !1, TopNotifierCur.header_unread_handler || (TopNotifierCur.header_unread_height = TopNotifierCur.header_unread.offsetHeight, TopNotifierCur.header_unread_handler = function(e) {
                if (TopNotifierCur.header_unread) {
                    var t = TopNotifierCur.header_unread.offsetTop + TopNotifierCur.header_unread_height < e.data.scrollTop;
                    t != TopNotifierCur.swaped && (toggleClass(TopNotifierCur.header, "top_notify_header_swap_labels", t), TopNotifierCur.swaped = t)
                }
            }, TopNotifierCur.scrollbar.emitter.addListener("update", TopNotifierCur.header_unread_handler))) : (TopNotifierCur.header_unread_hidden || slideUp(TopNotifierCur.header_unread, 100), TopNotifierCur.header_unread_hidden = !0, TopNotifierCur.header_unread_handler && (TopNotifierCur.scrollbar.emitter.removeListener("update", TopNotifierCur.header_unread_handler), TopNotifierCur.header_unread_handler = null)))
        },
        preload: function() {
            TopNotifier.shown() || vk.isBanned || TopNotifierCur.loaded || ajax.post("/al_feed.php", extend(clone(TopNotifierCur._qParams), {
                _preload: 1
            }), {
                cache: 1,
                onDone: function(e, t, i, a) {
                    TopNotifier.shown() && geByClass1("pr", "top_notify_cont") && TopNotifier.onLoad(e, t, i, a)
                },
                stat: ["feed.css", "page.css", "post.css"]
            })
        },
        loadMore: function() {
            var e = ge("ui_top_notify_load_more");
            e && !isButtonLocked(e) && (TopNotifierCur.ajax = ajax.post("/al_feed.php", extend(clone(TopNotifierCur._qParams), {
                offset: TopNotifierCur.offset,
                more: 1,
                need_header: intval(!(geByClass1("_notify_header") || !geByClass1("_notify_sticky") && !geByClass1("_notify_unread")))
            }), {
                onDone: function(t, i) {
                    if (TopNotifierCur.scrollbar) {
                        if (t) {
                            for (var a = null, r = TopNotifier.getContentNode(), n = cf(t); a = n.firstChild;) r.insertBefore(a, e);
                            TopNotifier.refreshHeader()
                        }
                        return i ? void(TopNotifierCur.offset = i) : void re(e)
                    }
                },
                showProgress: function() {
                    show(e), lockButton(e)
                },
                hideProgress: function() {
                    hide(e), unlockButton(e)
                }
            }))
        },
        show: function(e) {
            if (checkEvent(e) !== !0 && !vk.isBanned) {
                if (TopNotifier.shown() && e !== !0) return gpeByClass("top_notify_wrap", e.target, ge("top_nav")) || TopNotifier.hide(), cancelEvent(e);
                vk.counts.ntf = 0, TopNotifier.setCount(0, !0);
                var t = ge(TopNotifierCur.link),
                    i = ge("top_notify_cont");
                cur.introNotifyTooltipHide && (cur.introNotifyTooltipHide(), delete cur.introNotifyTooltipHide), t.tt && t.tt.hide && t.tt.hide(), i || (TopNotifierCur.wrapper = ce("div", {
                    innerHTML: '<div id="top_notify_cont" class="top_notify_cont wall_module" ontouchstart="event.cancelBubble = true;" onmousedown="event.cancelBubble = true;"></div><a href="/feed?section=notifications" class="top_notify_show_all" onmousedown="event.cancelBubble = true;" onclick="TopNotifier.hide(); return nav.go(this, event);">' + getLang("global_notify_show_all") + "</a>",
                    id: "top_notify_wrap",
                    className: "scroll_fix_wrap top_notify_wrap"
                }), t.appendChild(TopNotifierCur.wrapper), i = ge("top_notify_cont"));
                var a = window.innerHeight || document.documentElement.clientHeight;
                setStyle(i, {
                    maxHeight: Math.min(Math.max(a - 200, 300), 600)
                });
                var r = uiScroll;
                return TopNotifierCur.scrollbar && TopNotifierCur.scrollbar.container.__uiScroll__ || (TopNotifierCur.scrollbar = new r(i, {
                    global: !0,
                    stopScrollPropagationAlways: !0,
                    onmore: TopNotifier.loadMore
                })), TopNotifierCur.loaded || (re(geByClass1("_notify_header")), re(geByClass1("_top_notify_header")), TopNotifierCur.offset = 0, ajax.post("/al_feed.php", TopNotifierCur._qParams, {
                    cache: 1,
                    onDone: TopNotifier.onLoad,
                    showProgress: TopNotifier.showProgress,
                    stat: ["feed.css"]
                }), TopNotifierCur.loaded = !0), addClass(TopNotifierCur.link, "active"), TopNotifier.refresh(), e !== !0 && cancelStackPush("top_notifier", TopNotifier.hide.bind(TopNotifier), !0), e ? cancelEvent(e) : !1
            }
        },
        hide: function() {
            TopNotifier.shown() && (removeClass(TopNotifierCur.link, "active"), cancelStackFilter("top_notifier", !0))
        },
        shown: function() {
            return hasClass(TopNotifierCur.link, "active")
        },
        getContentNode: function() {
            return TopNotifierCur.scrollbar && TopNotifierCur.scrollbar.content && TopNotifierCur.scrollbar.container.__uiScroll__ ? TopNotifierCur.scrollbar.content : ge("top_notify_cont")
        },
        showProgress: function(e) {
            function t() {
                return e.apply(this, arguments)
            }
            return t.toString = function() {
                return e.toString()
            }, t
        }(function() {
            var e = TopNotifier.getContentNode();
            geByClass1("pr", e) || (val(e, ""), showProgress(e), TopNotifier.refresh())
        }),
        showTooltip: function(e) {
            function t(t, i) {
                return e.apply(this, arguments)
            }
            return t.toString = function() {
                return e.toString()
            }, t
        }(function(e, t) {
            function i(e) {
                if (!e && cur.topNotifyTTKey && (e = cur.topNotifyTTKey, delete cur.topNotifyTTKey), e) {
                    var t = e.split(":"),
                        i = ls.get("ntfseen") || {};
                    2 == t.length && (i[0] = parseInt((new Date).getTime() / 1e3), i[t[0]] = t[1], ls.set("ntfseen", i))
                }
            }
            if (!TopNotifier.shown() && !isVisible("dev_top_nav")) {
                var a = ge(TopNotifierCur.link),
                    r = {};
                if (a) {
                    if ("shownow" == a.tt && removeAttr(a, "tt"), e) r.text = function() {
                        return e
                    }, t && (r.onHide = i.pbind(t));
                    else {
                        a.tt && a.tt.destroy && a.tt.destroy();
                        var n = ls.get("ntfseen") || {},
                            o = [];
                        each(n, function(e, t) {
                            o.push(e + ":" + t)
                        }), r = extend(r, {
                            url: "al_feed.php",
                            params: {
                                act: "a_last_notify",
                                seen: o.join(";")
                            },
                            ajaxdt: 2e3,
                            noload: 1,
                            onHide: i
                        })
                    }
                    var s = function c(e) {
                        setTimeout(function() {
                            return window.curNotifier && curNotifier.idle_manager && curNotifier.idle_manager.is_idle ? void c(e) : (e && e.hide(), void Notifier.lcSend("hide_notify_tt"))
                        }, 6e3)
                    };
                    showTooltip(a, extend(r, {
                        typeClass: "top_notify_tt",
                        dir: "up",
                        width: 250,
                        shift: [0, 0],
                        nohideover: 1,
                        nohide: 1,
                        onShowStart: function(e) {
                            TopNotifier.shown() && (e.opts.onHide = !1, e.hide()), addEvent(e.container, "mousedown", function(e) {
                                return e && inArray(e.target.tagName, ["A", "IMG"]) ? void 0 : (TopNotifier.show(e), cancelEvent(e))
                            }), s(e), Notifier.setRecvClbk("hide_notify_tt", e.hide)
                        }
                    }))
                }
            }
        }),
        invalidate: function() {
            TopNotifierCur.loaded = !1, ajax.invalidate("/al_feed.php", TopNotifierCur._qParams), TopNotifierCur.ajax && TopNotifierCur.ajax.abort()
        },
        setCount: function(e, t) {
            isString(e) && (e = trim(e)), parseInt(e) >= 100 && (e = "+99"), hasClass(TopNotifierCur.link, "has_notify") && e ? animateCount(TopNotifierCur.count, e, {
                str: "auto"
            }) : val(TopNotifierCur.count, e), toggleClass(TopNotifierCur.link, "has_notify", !!e), t || TopNotifier.invalidate()
        },
        cleanCount: function() {
            cur.topNotifyHash && ajax.post("/al_feed.php", {
                act: "a_clean_notify",
                hash: cur.topNotifyHash
            })
        },
        refresh: function() {},
        postTooltip: function(e, t, i) {
            return !1
        },
        hideRow: function(e, t, i) {
            var a = gpeByClass("_feed_row", e);
            if (!a) {
                var r = gpeByClass("top_notify_wrap", e);
                a = geByClass("_feed_row", r), a = a[a.length - 1]
            }
            ajax.post("/al_feed.php", {
                act: "a_hide_notify",
                item: t,
                hash: i
            });
            var n = gpeByClass("_ui_menu_wrap", e);
            n && TopNotifier.hideActionsMenu(n), slideUp(a, 200, function() {
                re(a);
                var e = TopNotifier.getContentNode();
                geByClass("feed_row", e).length ? TopNotifier.refreshHeader() : val(e, '<div class="top_notify_empty no_rows">' + getLang("news_no_new_notifications") + "</div>"), TopNotifier.refresh()
            })
        },
        deleteRow: function(e, t, i, a, r, n) {
            var o = ge("top_feedback_row" + e),
                s = geByClass1("post_actions", o);
            TopNotifier.hideActionsMenu(geByClass1("_ui_menu_wrap", o)), ajax.post("al_feed.php", {
                act: "a_feedback_delete",
                item: t,
                hash: a,
                types: i,
                candel: n,
                from: "top_notifier"
            }, {
                onDone: function(e) {
                    var t = geByClass1("_post_content", o),
                        i = geByClass1("_feedback_deleted", o);
                    i ? (i.innerHTML = '<span class="dld_inner">' + e + "</span>", show(i)) : o.appendChild(ce("div", {
                        className: "feedback_row dld _feedback_deleted _top_feedback_deleted",
                        innerHTML: '<span class="dld_inner">' + e + "</span>"
                    })), hide(t), hasClass(o, "feedback_row_clickable") && addClass(o, "feedback_row_touched"), TopNotifier.refresh()
                },
                showProgress: addClass.pbind(s, "post_actions_progress"),
                hideProgress: removeClass.pbind(s, "post_actions_progress")
            })
        },
        checkClick: function(e, t) {
            if (t = t || window.event, !e || !t) return !0;
            var i = t.target || t.srcElement,
                a = 8,
                r = !1,
                n = /(feedback_sticky_text|feedback_sticky_icon|feedback_row)/;
            do
                if (!i || i == e || i.onclick || i.onmousedown || inArray(i.tagName, ["A", "IMG", "TEXTAREA", "EMBED", "OBJECT"]) || (r = i.className.match(n))) break; while (a-- && (i = i.parentNode));
            if (!r) return !1;
            if (i && i.className) {
                for (var o = i.className.split(" "), s = "unknown", c = -1, u = geByClass("feedback_row"), a = 0; a < o.length; ++a) {
                    var l = o[a].match("feedback_(.+)_row");
                    if (o[a] && l && l[1]) {
                        s = l[1];
                        break
                    }
                }
                for (var a = 0; a < u.length; ++a)
                    if (u[a] == i) {
                        c = a;
                        break
                    }
                statlogsValueEvent("feed_top_notify", 0, "click", s, c)
            }
            return i || !0
        },
        ungroup: function ungroup(item, event) {
            var el = ge("top_feedback_row" + item);
            if (event = event || window.event, el && !hasClass(el, "feedback_row_expanded") && !checkEvent(event) && TopNotifier.checkClick(el, event)) {
                var hid = domNS(domPN(el)),
                    names = geByClass1("_header", el),
                    text = domData(names, "text");
                show(hid), removeClass(el, "feedback_row_grouped"), addClass(el, "feedback_row_expanded"), val(names, text), el.onclick = eval("(function(){ if (!TopNotifier.checkClick(this, event)) return; " + unclean(domData(names, "click")) + ";})")
            }
        },
        showActionsMenu: function(e) {
            var t = !1,
                i = domClosest("_feed_row", e),
                a = domPN(i);
            a.lastChild != i || hasClass(a, "feedback_sticky_rows") && domPN(a).lastChild != a || (t = {
                appendParentCls: "top_notify_wrap",
                processHoverCls: hasClass(domPN(e), "post_actions") ? "feedback_row" : "feedback_sticky_row"
            }), uiActionsMenu.show(e, !1, t)
        },
        hideActionsMenu: function(e) {
            uiActionsMenu.hide(e)
        },
        frProcess: function(e, t, i, a) {
            if (!isButtonLocked(i)) {
                var r;
                r = a ? {
                    act: "add",
                    mid: e,
                    hash: t,
                    request: 1,
                    from: "top_notifier"
                } : {
                    act: "remove",
                    mid: e,
                    hash: t,
                    report_spam: 1,
                    from: "top_notifier"
                }, statlogsValueEvent("feed_top_notify", 0, "friends", r.act), ajax.post("/al_friends.php", r, {
                    onDone: function(t) {
                        var r = domPN(i);
                        val(r, t), addClass(r, "feedback_buttons_response"), "friends" == cur.module && window.Friends && (val("request_controls_" + e, t), window.Friends.processRequest(e, a))
                    },
                    onFail: function(e) {
                        return e ? (setTimeout(showFastBox(getLang("global_error"), e).hide, 3e3), !0) : void 0
                    },
                    showProgress: lockButton.pbind(i),
                    hideProgress: unlockButton.pbind(i)
                })
            }
        },
        grProcess: function(e, t, i, a) {
            if (!(hasClass(i, "flat_button") && isButtonLocked(i) || domFC(i) && "progress_inline" == domFC(i))) {
                var r = -2 == a ? "spam" : a ? "enter" : "leave",
                    n = -1 == a ? "_decline" : "";
                ajax.post("/al_groups.php", {
                    act: r,
                    gid: e,
                    hash: t,
                    from: "top_notifier",
                    context: n
                }, {
                    onDone: function(e) {
                        var t = domPN(i);
                        val(t, e), addClass(t, "feedback_buttons_response")
                    },
                    onFail: function(e) {
                        return e ? (setTimeout(showFastBox(getLang("global_error"), e).hide, 3e3), !0) : void 0
                    },
                    showProgress: function() {
                        if (-2 == a) {
                            i.oldhtml = i.innerHTML;
                            var e = getSize(i)[0];
                            i.innerHTML = '<span class="progress_inline"></span>', setStyle(domFC(i), {
                                width: e
                            })
                        } else lockButton(i)
                    },
                    hideProgress: function() {
                        -2 == a ? i.innerHTML = i.oldhtml : unlockButton(i)
                    }
                })
            }
        },
        showGiftBox: function(e, t) {
            return !showBox("al_gifts.php", {
                act: "get_gift_box",
                fids: e,
                fr: 1
            }, {
                stat: ["gifts.css", "wide_dd.js", "wide_dd.css"],
                cache: 1,
                dark: 1
            }, t)
        }
    }
}, function(e, t, i) {
    e.exports = !i(67) && !i(116)(function() {
        return 7 != Object.defineProperty(i(105)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, function(e, t, i) {
    e.exports = !i(116)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
}, , function(e, t, i) {
    "use strict";

    function a() {
        return {
            txt: "",
            attaches: [],
            urlBinds: []
        }
    }

    function r(e, t) {
        this._db = e, this._key = t, this.dData = a(), this.load()
    }

    function n(e) {
        switch (e.type) {
            case "mail":
                return e.id < 0 && 1 == e.object.fwd_count;
            default:
                return !e.object
        }
    }

    function o(e) {
        return {
            txt: e.txt,
            attaches: e.attaches.length ? e.attaches : void 0,
            urlBinds: e.urlBinds.length ? e.urlBinds : void 0
        }
    }

    function s(e) {
        return {
            txt: e.txt,
            attaches: e.attaches || [],
            urlBinds: e.urlBinds || []
        }
    }

    function c(e, t) {
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
                fwd_count: (0, f.parseFwd)(e.fwd).length
            }
        });
        for (var a = 1; e["attach" + a + "_type"]; ++a) i.push({
            type: e["attach" + a + "_type"],
            id: e["attach" + a],
            kind: e["attach" + a + "_kind"],
            productId: e["attach" + a + "_product_id"]
        });
        return e.geo && i.push({
            type: "geo",
            id: e.geo
        }), i
    }

    function u(e, t) {
        return new r(e, "draft_" + t)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            var i = [],
                a = !0,
                r = !1,
                n = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (i.push(o.value), !t || i.length !== t); a = !0);
            } catch (c) {
                r = !0, n = c
            } finally {
                try {
                    !a && s["return"] && s["return"]()
                } finally {
                    if (r) throw n
                }
            }
            return i
        }
        return function(t, i) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, i);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.ImDraft = r, t.convertKludgesToAttaches = c, t.loadDraftForPeer = u;
    var d = i(15),
        f = i(22);
    r.prototype.dump = function() {
        this._key && this._db.updateByKey(this._key, o(this.dData))
    }, r.prototype.load = function() {
        if (this._key) {
            var e = this._db.selectByKey(this._key);
            e && (this.dData = s(e))
        }
    }, r.prototype.clear = function() {
        this.dData = a(), this.dump()
    }, r.prototype.setText = function(e) {
        this.dData.txt = trim(e), this.dump()
    }, r.prototype.addAttach = function(e, t, i) {
        ("share" === e || "mail" === e) && this.removeAttachByType(e);
        var a = this.dData.attaches.find(function(i) {
            return i.type === e && i.id === t
        });
        !a && e && t && (this.dData.attaches.push({
            type: e,
            id: t,
            object: i
        }), this.dump())
    }, r.prototype.syncWithSelector = function(e) {
        var t = this,
            i = this.getFwdRaw();
        this.dData.attaches = (i ? [i] : []).concat(e.getMedias().map(function(e) {
            var i = l(e, 2),
                a = i[0],
                r = i[1],
                n = t.dData.attaches.find(function(e) {
                    return e.type == a && e.id == r
                });
            return n || {
                type: a,
                id: r
            }
        })), this.dump()
    }, r.prototype.removeAttachByType = function(e) {
        for (var t = this.dData.attaches.length; t--;) this.dData.attaches[t].type === e && this.dData.attaches.splice(t, 1);
        this.dump()
    }, r.prototype.removeAllAttaches = function() {
        this.dData.attaches = [], this.dump()
    }, r.prototype.addBindUrl = function(e, t, i) {
        this.getBoundAttach(e) || (this.dData.urlBinds.push({
            url: e,
            type: t,
            id: i
        }), this.dump())
    }, r.prototype.getBoundAttach = function(e) {
        var t = this.dData.urlBinds.find(function(t) {
            return t.url === e
        });
        return t ? this.dData.attaches.find(function(e) {
            return e.type === t.type && e.id === t.id
        }) || null : null
    }, r.prototype.getShareUrl = function() {
        var e = this.dData.attaches.find(function(e) {
            return "share" === e.type
        });
        return e && e.object ? e.object.url : void 0
    }, r.prototype.hasAttaches = function() {
        return this.dData.attaches.length > 0
    }, r.prototype.destroy = function() {
        this.dData = {}, this._key = this._db = null
    }, r.prototype.prepareObjects = function(e, t) {
        var i = this,
            a = this.dData.attaches.find(n);
        return a ? (0, d.post)(d.CONTROLLER, {
            act: "draft_medias",
            gid: e,
            messageId: t || 0,
            media: t ? void 0 : this.dData.attaches.map(function(e) {
                return [e.type, e.id]
            }).join("*")
        }).then(function(e) {
            var t = l(e, 1),
                a = t[0];
            i.dData.attaches = a.map(function(e) {
                return {
                    type: e[0],
                    id: e[1],
                    object: e[2]
                }
            })
        }) : Promise.resolve()
    }, r.prototype.getFwdRaw = function() {
        return this.dData.attaches.find(function(e) {
            return "mail" === e.type
        })
    }, r.prototype.getFwdCount = function() {
        var e = this.getFwdRaw();
        return e ? e.id < 0 ? e.object.fwd_count : e.id.split(";").length : 0
    }
}, function(e, t, i) {
    var a = i(93)("unscopables"),
        r = Array.prototype;
    void 0 == r[a] && i(122)(r, a, {}), e.exports = function(e) {
        r[a][e] = !0
    }
}, function(e, t, i) {
    "use strict";

    function a(e, t) {
        var i = domData(t, "chat-id"),
            a = domData(t, "hash");
        return lockButton(t), (0, o.joinChat)(i, a, e.get()).then(function(i) {
            var a = n(i, 1),
                r = a[0];
            unlockButton(t), e.get().longpoll.push([(0, c.changePeer)(r)])
        })["catch"](function(e) {
            showFastBox(getLang("mail_join_invite_error_title"), e), unlockButton(t)
        })
    }

    function r(e, t) {
        var i = (0, s.createModule)({
            handlers: function(i, r) {
                r(e, "click", u, function(e) {
                    return a(t, e.target)
                })
            }
        });
        return {
            unmount: function() {
                (0, s.destroyModule)(i)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var n = function() {
        function e(e, t) {
            var i = [],
                a = !0,
                r = !1,
                n = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (i.push(o.value), !t || i.length !== t); a = !0);
            } catch (c) {
                r = !0, n = c
            } finally {
                try {
                    !a && s["return"] && s["return"]()
                } finally {
                    if (r) throw n
                }
            }
            return i
        }
        return function(t, i) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, i);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.mount = r;
    var o = i(5),
        s = i(27),
        c = i(59),
        u = "_im_join_chat"
}, function(e, t, i) {
    var a = i(124);
    e.exports = function(e) {
        if (!a(e)) throw TypeError(e + " is not an object!");
        return e
    }
}, , function(e, t, i) {
    for (var a = i(110), r = i(45), n = i(119), o = i(122), s = i(111), c = i(93), u = c("iterator"), l = c("toStringTag"), d = s.Array, f = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], h = 0; 5 > h; h++) {
        var p, m = f[h],
            _ = n[m],
            g = _ && _.prototype;
        if (g) {
            g[u] || o(g, u, d), g[l] || o(g, l, m), s[m] = d;
            for (p in a) g[p] || r(g, p, a[p], !0)
        }
    }
}, function(e, t) {
    var i = {}.toString;
    e.exports = function(e) {
        return i.call(e).slice(8, -1)
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
}, function(e, t, i) {
    "use strict";

    function a(e, t, i, a, r) {
        if ("Script error." !== e) {
            var n = r ? r.stack || r.message : null;
            o("unhandled_error", n ? {
                err: e,
                stack: n
            } : {
                err: e
            })
        }
        f && f.apply(this, arguments)
    }

    function r(e) {
        e.preventDefault()
    }

    function n() {
        return !!window.imwl
    }

    function o(e, t) {
        n() && (console.error(e, t), console.trace(), (0, d.retryFn)(l.post, 3, function() {
            return 2
        })("al_im.php", {
            act: "a_weird_log",
            kind: e,
            data: JSON.stringify(extend({
                errIdx: h++,
                ua: navigator.userAgent,
                noSh: 1
            }, t))
        }))
    }

    function s(e, t) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        return o(e, extend({
            err: t && t.message || t
        }, i)), Promise.reject(t)
    }

    function c() {
        f = window.onerror, window.onerror = a, window.addEventListener("unhandledrejection", r)
    }

    function u() {
        window.onerror = f, f = void 0, window.removeEventListener("unhandledrejection", r)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.isWeirdLogging = n, t.imWeirdLog = o, t.imWeirdCatch = s, t.startLoggingAllUnhandled = c, t.stopLoggingAllUnhandled = u;
    var l = i(15),
        d = i(7),
        f = void 0,
        h = 1
}, , function(e, t, i) {
    e.exports = i(119).document && document.documentElement
}, function(e, t, i) {
    var a = i(20),
        r = i(1);
    e.exports = Object.keys || function(e) {
        return a(e, r)
    }
}, , function(e, t) {
    "use strict";

    function i(e) {
        this.started = !1, this.is_idle = !0, this.is_activated = !1, this.activeTimeStart = null, this.cbActiveB = this.cbActive.bind(this), this.cbInactiveB = this.cbInactive.bind(this), this.cbInactiveB = this.cbInactive.bind(this), this.opts = extend({
            triggerEvents: "mousemove keydown",
            onIdleCb: function() {},
            onUnIdleCb: function() {},
            focusElement: e.element,
            element: null,
            idleTimeout: 3e4
        }, e)
    }
    extend(i.prototype, EventEmitter.prototype), extend(i.prototype, {
        stop: function() {
            this.started = !1, removeEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB), removeEvent(this.opts.focusElement, "focus", this.cbActiveB), removeEvent(this.opts.focusElement, "blur", this.cbInactiveB), clearTimeout(this.setIdleTo), clearTimeout(this.checkIdleCbTo), clearTimeout(this.sendCbTO), this.is_idle = !0, this.opts.parentManager && this.opts.parentManager.off("idle", this.cbInactiveB)
        },
        idle: function(e) {
            this.is_idle = !0, e || this.opts.onIdleCb(), this.emit("idle")
        },
        unidle: function(e) {
            this.is_idle = !1, e || this.opts.onUnIdleCb(), this.emit("unidle")
        },
        activate: function() {
            this.is_idle = !1, this.is_activated = !0
        },
        start: function() {
            this.started = !0, browser.mobile || (this.opts.parentManager && this.opts.parentManager.on("idle", this.cbInactiveB), addEvent(this.opts.focusElement, "focus", this.cbActiveB), addEvent(this.opts.focusElement, "blur", this.cbInactiveB), clearTimeout(this.checkIdleCbTo), this.checkIdleCb(), this.checkIdleCbTo = setTimeout(this.checkIdleCb.bind(this), this.opts.idleTimeout))
        },
        checkIdleCb: function() {
            this.started && (addEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB), clearTimeout(this.setIdleTo), this.setIdleTo = setTimeout(this.cbInactiveB, this.opts.idleTimeout))
        },
        cbActive: function() {
            this.started && (this.activeTimeStart = (new Date).getTime(), clearTimeout(this.setIdleTo), this.is_idle && (this.is_idle = !1, clearTimeout(this.sendCbTO), this.sendCbTO = setTimeout(function() {
                this.emit("unidle"), this.opts.onUnIdleCb && this.opts.onUnIdleCb()
            }.bind(this), 100)), removeEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB), clearTimeout(this.checkIdleCbTo), this.checkIdleCbTo = setTimeout(this.checkIdleCb.bind(this), this.opts.idleTimeout))
        },
        cbInactive: function() {
            this.started && (this.activeTimeStart = null, this.is_idle || (this.is_idle = !0, clearTimeout(this.sendCbTO), this.sendCbTO = setTimeout(function() {
                this.emit("idle"), this.opts.onIdleCb && this.opts.onIdleCb()
            }.bind(this), 100)), clearTimeout(this.checkIdleCbTo), removeEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB), addEvent(this.opts.element, this.opts.triggerEvents, this.cbActiveB), this.checkIdleCbTo = setTimeout(this.checkIdleCb, this.opts.idleTimeout))
        },
        getActiveTime: function() {
            return !this.is_idle && this.activeTimeStart ? (new Date).getTime() - this.activeTimeStart : 0
        }
    }), window.IdleManager = i
}, , function(e, t, i) {
    var a = i(88),
        r = i(33),
        n = i(53)("IE_PROTO"),
        o = Object.prototype;
    e.exports = Object.getPrototypeOf || function(e) {
        return e = r(e), a(e, n) ? e[n] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? o : null
    }
}, function(e, t, i) {
    var a = i(72),
        r = i(66),
        n = i(109),
        o = Object.defineProperty;
    t.f = i(67) ? Object.defineProperty : function(e, t, i) {
        if (a(e), t = n(t, !0), a(i), r) try {
            return o(e, t, i)
        } catch (s) {}
        if ("get" in i || "set" in i) throw TypeError("Accessors not supported!");
        return "value" in i && (e[t] = i.value), e
    }
}, , function(e, t, i) {
    var a = i(42),
        r = i(76),
        n = i(16),
        o = i(109),
        s = i(88),
        c = i(66),
        u = Object.getOwnPropertyDescriptor;
    t.f = i(67) ? u : function(e, t) {
        if (e = n(e), t = o(t, !0), c) try {
            return u(e, t)
        } catch (i) {}
        return s(e, t) ? r(!a.f.call(e, t), e[t]) : void 0
    }
}, function(e, t) {
    var i = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return i.call(e, t)
    }
}, , , function(e, t) {
    "use strict";

    function i(e) {
        var t = o({}, n.objLoc, e);
        Object.keys(t).filter(function(e) {
            return "" === t[e]
        }).forEach(function(e) {
            delete t[e]
        });
        var i = n.toStr(t);
        n.setLoc(i)
    }

    function a() {
        var e = {};
        return {
            scheduleNav: function(t) {
                e = o(e, t)
            },
            commitNav: function() {
                i(e), e = {}
            },
            scheduleNavWithTimeOut: function(t) {
                var a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100;
                e = o(e, t), setTimeout(function() {
                    i(e), e = {}
                }, a)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.updateLocation = i, t.updateLazyLocation = a;
    var r = window,
        n = r.nav,
        o = r.extend
}, function(e, t) {
    e.exports = !1
}, function(e, t, i) {
    var a = i(56)("wks"),
        r = i(4),
        n = i(119).Symbol,
        o = "function" == typeof n;
    e.exports = function(e) {
        return a[e] || (a[e] = o && n[e] || (o ? n : r)("Symbol." + e))
    }
}, function(e, t, i) {
    var a = i(30),
        r = i(93)("iterator"),
        n = i(111);
    e.exports = i(38).getIteratorMethod = function(e) {
        return void 0 != e ? e[r] || e["@@iterator"] || n[a(e)] : void 0
    }
}, function(e, t, i) {
    i(132), i(49), i(74), i(10), e.exports = i(38).Map
}, function(e, t) {
    "use strict";

    function i(e, t) {
        var i = this,
            a = {
                minH: 50,
                minW: 50
            };
        i.options = t = extend(a, t), i.content = e;
        var r = i.id = "rb_box_" + (t.id || curRBox.guid++);
        i.wrap = ce("div", {
            id: r,
            className: "rb_box_wrap fixed" + (t.fixed ? " fc_fixed" : "")
        });
        var n = {};
        i.toBottom = i.toRight = !1, t.fixed ? (n.bottom = 0, n.right = 72) : (void 0 !== t.startTop ? n.top = t.startTop : void 0 !== t.startBottom && (n.bottom = t.startBottom), void 0 !== t.startLeft ? n.left = t.startLeft : void 0 !== t.startRight && (n.right = t.startRight)), setStyle(i.wrap, n), t.movable && addEvent(t.movable, "mousedown", i._head_mdown.bind(i)), i.resizeableH = t.resizeableH || e, t.startHeight && setStyle(i.resizeableH, "height", t.startHeight), i.resizeableW = t.resizeableW || e, t.startWidth && setStyle(i.resizeableW, "width", t.startWidth), addEvent(e, "mousedown", i._cont_mdown.bind(i)), t.closer && (addEvent(t.closer, "mousedown", i._close_mdown.bind(i)), addEvent(t.closer, "click", i._close_click.bind(i))), t.hider && (addEvent(t.hider, "mousedown", i._close_mdown.bind(i)), addEvent(t.hider, "click", i._hide_click.bind(i))), t.minimizer && t.minimizer !== !0 && (addEvent(t.minimizer, "mousedown", i._close_mdown.bind(i)), addEvent(t.minimizer, "click", i._min_toggle.bind(i))), i.wrap.appendChild(e), t.resize !== !1 && (i.resizeWrap = ce("div", {
            className: "rb_resize_wrap",
            innerHTML: '<div class="chats_sp rb_resize"></div>'
        }), i.wrap.appendChild(i.resizeWrap), addEvent(i.resizeWrap, "mousedown", i._resize_mdown.bind(i))), t.minimized && (addClass(i.wrap, "rb_minimized"), i.minimized = !0), bodyNode.insertBefore(i.wrap, ge("page_wrap"));
        var o = getStyle(i.wrap, "top"),
            s = getStyle(i.wrap, "bottom"),
            c = getStyle(i.wrap, "left"),
            u = getStyle(i.wrap, "right");
        this.toBottom = ("auto" === o || "" === o || browser.msie && 0 === o) && "auto" != s && "" !== s && !(browser.msie && 0 === s), this.toRight = ("auto" === c || "" === c || browser.msie && 0 === c) && "auto" != u && "" !== u && !(browser.msie && 0 === u), this.toRight && setStyle(i.wrap, {
            marginRight: lastWndScroll[0] ? sbWidth() : 0
        }), (t.nofocus || t.noshow) && addClass(i.wrap, "rb_inactive"), this.toBottom && (setStyle(i.wrap, {
            marginRight: lastWndScroll[0] ? sbWidth() : 0
        }), addClass(i.wrap, "fc_tobottom")), this.options.marginFixedToLayer && setStyle(i.wrap, {
            marginRight: hasClass(document.body, "layers_shown") ? sbWidth() : 0
        }), curRBox.tabs[r] = i, i.pos = !1, t.noshow ? (setStyle(i.wrap, {
            visibility: "hidden",
            display: "block"
        }), i._update_pos(), setStyle(i.wrap, {
            visibility: "",
            display: ""
        })) : i.show(!1, t.nofocus)
    }
    window.curRBox || (window.curRBox = {
        guid: 0,
        active: !1,
        focused: [],
        tabs: {}
    });
    var a = 1e4;
    extend(i.prototype, {
        show: function(e) {
            function t(t, i) {
                return e.apply(this, arguments)
            }
            return t.toString = function() {
                return e.toString()
            }, t
        }(function(e, t) {
            var i = this;
            void 0 === e && (e = 0), e ? (setStyle(i.wrap, {
                opacity: 0,
                display: "block"
            }), i.visible = !0, !t && i.focus(), animate(i.wrap, {
                opacity: 1
            }, e, function() {
                setStyle(i.wrap, browser.msie ? {
                    filter: "none"
                } : {
                    opacity: ""
                }), i._update_pos()
            })) : (show(i.wrap), i.visible = !0, !t && i.focus(), i._update_pos()), i.options.onShow && i.options.onShow()
        }),
        hide: function(e) {
            function t(t, i, a) {
                return e.apply(this, arguments)
            }
            return t.toString = function() {
                return e.toString()
            }, t
        }(function(e, t, i) {
            var a = this;
            return !t && a.options.onBeforeHide && a.options.onBeforeHide() ? !0 : (void 0 === e && (e = 0), e ? (setStyle(a.wrap, {
                opacity: 1,
                display: "block"
            }), animate(a.wrap, {
                opacity: 0
            }, e, function() {
                hide(a.wrap), setStyle(a.wrap, browser.msie ? {
                    filter: "none"
                } : {
                    opacity: ""
                })
            })) : hide(a.wrap), a.visible = !1, void(!t && a.options.onHide && a.options.onHide(i || {})))
        }),
        _head_mdown: function(e) {
            if (!checkEvent(e)) {
                (e.originalEvent || e).cancelBubble = !0;
                var t, i, a = this,
                    r = e.target,
                    n = getWndInner(),
                    o = curRBox.active == a.id,
                    s = e.pageY,
                    c = e.pageX,
                    u = a.wrap.offsetHeight,
                    l = a.wrap.offsetWidth,
                    d = 0,
                    f = 0,
                    h = n[0] - u,
                    p = n[1] - l,
                    m = browser.msie ? "selectstart" : "mousedown";
                a.options.fixed && FastChat.pinTab(a.options.peer || -1, e, !0), o || a.focus(e), a.toBottom ? (a.toBottom = !1, t = n[0] - intval(getStyle(a.wrap, "bottom")) - u, setStyle(a.wrap, {
                    top: t,
                    bottom: "auto"
                }), removeClass(a.wrap, "fc_tobottom")) : t = intval(getStyle(a.wrap, "top")), a.toRight ? (a.toRight = !1, i = n[1] - intval(getStyle(a.wrap, "right")) - l, setStyle(a.wrap, {
                    left: i,
                    right: "auto"
                })) : i = intval(getStyle(a.wrap, "left")), d = t, f = i, cur._fcdrag = 1;
                var _ = function(e) {
                        return d = Math.max(0, Math.min(h, t + e.pageY - s)), 10 > h - d ? d = h : 10 > d && (d = 0), a.wrap.style.top = d + "px", f = Math.max(0, Math.min(p, i + e.pageX - c)), 10 > p - f ? f = p : 10 > f && (f = 0), a.wrap.style.left = f + "px", cancelEvent(e)
                    },
                    g = function v(e) {
                        cur._fcdrag = 0, removeEvent(document, "mousemove", _), removeEvent(document, "mouseup", v), removeEvent(document, m, cancelEvent), setStyle(bodyNode, "cursor", ""), setStyle(r, "cursor", ""), (a.toBottom = d >= h - 5) && (setStyle(a.wrap, {
                            top: "auto",
                            bottom: 0
                        }), addClass(a.wrap, "fc_tobottom")), (a.toRight = f >= p - 5) && setStyle(a.wrap, {
                            left: "auto",
                            right: 0,
                            marginRight: lastWndScroll[0] ? sbWidth() : 0
                        }), a._update_pos();
                        var t = Math.abs(e.pageY - s) < 3 && Math.abs(e.pageX - c) < 3;
                        cur._fcpromo > 0 ? cur._fcpromo = t ? 0 : -1 : a.options.minimizer && t ? !a.minimized && o ? a.minimize(!0) : a.minimized && a.unminimize(!0) : a.options.onDragEnd && a.options.onDragEnd(a.toBottom ? -1 : d / n[0], a.toRight ? -1 : f / n[1])
                    };
                return addEvent(document, "mousemove", _), addEvent(document, "mouseup", g), addEvent(document, m, cancelEvent), setStyle(bodyNode, "cursor", "move"), setStyle(r, "cursor", "move"), !1
            }
        },
        _resize_mdown: function(e) {
            if (!checkEvent(e)) {
                this.focus(e);
                var t, i, a = this,
                    r = e.target,
                    n = getWndInner(),
                    o = e.pageY,
                    s = e.pageX,
                    c = a.wrap.offsetHeight,
                    u = a.wrap.offsetWidth,
                    l = 0,
                    d = 0,
                    f = a.resizeableH.clientHeight - intval(getStyle(a.resizeableH, "paddingBottom")) - intval(getStyle(a.resizeableH, "paddingTop")),
                    h = a.resizeableW.clientWidth - intval(getStyle(a.resizeableW, "paddingRight")) - intval(getStyle(a.resizeableW, "paddingLeft")),
                    p = browser.msie ? "selectstart" : "mousedown",
                    m = !browser.msie && a.options.onResize || !1;
                a.toBottom ? (a.toBottom = !1, t = n[0] - intval(getStyle(a.wrap, "bottom")) - c, setStyle(a.wrap, {
                    top: t,
                    bottom: "auto"
                }), removeClass(a.wrap, "fc_tobottom")) : t = intval(getStyle(a.wrap, "top")), a.toRight ? (a.toRight = !1, i = n[1] - intval(getStyle(a.wrap, "right")) - u, setStyle(a.wrap, {
                    left: i,
                    right: "auto"
                })) : i = intval(getStyle(a.wrap, "left")), a.options.onResizeStart && a.options.onResizeStart(f, h);
                var _ = f + n[0] - t - c,
                    g = h + n[1] - i - u,
                    v = function(e) {
                        return l = Math.max(a.options.minH, Math.min(_, f + e.pageY - o)), 10 > _ - l && (l = _), a.resizeableH.style.height = l + "px", d = Math.max(a.options.minW, Math.min(g, h + e.pageX - s)), 10 > g - d && (d = g), a.resizeableW.style.width = d + "px", m && m(l, d), cancelEvent(e)
                    },
                    b = function C(e) {
                        removeEvent(document, "mousemove", v), removeEvent(document, "mouseup", C), removeEvent(document, p, cancelEvent), setStyle(bodyNode, "cursor", ""), setStyle(r, "cursor", ""), (a.toBottom = l == _) && (setStyle(a.wrap, {
                            top: "auto",
                            bottom: 0
                        }), addClass(a.wrap, "fc_tobottom")), (a.toRight = d == g) && setStyle(a.wrap, {
                            left: "auto",
                            right: 0,
                            marginRight: lastWndScroll[0] ? sbWidth() : 0
                        }), a._update_pos(), a.options.onResizeEnd && a.options.onResizeEnd(l, d, n[0], n[1], a.toBottom, a.toRight)
                    };
                return addEvent(document, "mousemove", v), addEvent(document, "mouseup", b), addEvent(document, p, cancelEvent), setStyle(bodyNode, "cursor", "move"), setStyle(r, "cursor", "move"), !1
            }
        },
        _update_pos: function() {
            var e = this;
            e.pos = [e.wrap.offsetTop, e.wrap.offsetLeft, e.wrap.offsetHeight, e.wrap.offsetWidth]
        },
        _wnd_resize: function(e, t, i) {
            var a = this;
            a.toBottom && (a.pos[0] = a.wrap.offsetTop), a.toRight && (a.pos[1] = a.wrap.offsetLeft);
            var r = {},
                n = !1,
                o = !1,
                s = a.pos[0] + a.pos[2] - e,
                c = a.pos[0],
                u = a.resizeableH.clientHeight - a.options.minH,
                l = a.pos[1] + a.pos[3] - t,
                d = a.pos[1],
                f = a.options.resize !== !1 ? a.resizeableW.clientWidth - a.options.minW : 0;
            i && (0 > f && setStyle(a.resizeableW, a.options.minW), 0 > u && setStyle(a.resizeableH, a.options.minH)), (0 >= s || 0 >= c && 0 >= u) && (0 >= l || 0 >= d && 0 >= f) || (s > 0 && c > 0 && (c = Math.min(s, c), s -= c, r.top = a.pos[0] - c, r.bottom = ""), s > 0 && u > 0 && (u = Math.min(s, u), n = a.resizeableH.clientHeight - u), l > 0 && d > 0 && (d = Math.min(l, d), l -= d, r.left = a.pos[1] - d, r.right = ""), l > 0 && f > 0 && (f = Math.min(l, f), o = a.resizeableW.clientWidth - f), o !== !1 && setStyle(a.resizeableW, "width", o), n !== !1 && setStyle(a.resizeableH, "height", n), setStyle(a.wrap, r), a._update_pos(), a.options.onResize && a.options.onResize(a.resizeableH.clientHeight, a.resizeableW.clientWidth))
        },
        _cont_mdown: function(e) {
            var t = curRBox.active != this.id;
            return t && (this.focus(e), !hasClass(e.target, "fc_editable")) ? cancelEvent(e) : void 0
        },
        _focus: function() {
            var e = this,
                t = indexOf(curRBox.focused, e.id),
                i = curRBox.active,
                r = i && curRBox.tabs[i];
            if (i != e.id) {
                r && isFunction(r.options.onBlur) && r.options.onBlur(), -1 != t && curRBox.focused.splice(t, 1), curRBox.focused.unshift(e.id);
                var n = a + curRBox.focused.length,
                    o = !0;
                each(curRBox.focused, function(e, t) {
                    var i = curRBox.tabs[t].wrap;
                    o ? (addClass(i, "rb_active"), removeClass(i, "rb_inactive"), curRBox.active = t, o = !1) : (removeClass(i, "rb_active"), addClass(i, "rb_inactive")), setStyle(i, "zIndex", n), n--
                })
            }
        },
        _hide_click: function() {
            this.hide()
        },
        minimize: function(e) {
            var t = this,
                i = t.wrap;
            return t.options.fixed ? !1 : (addClass(i, "rb_minimized"), t.minimized = !0, t._update_pos(), void(e && t.options.onMinimize && t.options.onMinimize(0)))
        },
        unminimize: function(e) {
            var t = this,
                i = t.wrap,
                a = getWndInner();
            removeClass(i, "rb_minimized"), t.minimized = !1, t._update_pos(), t._wnd_resize(a[0], a[1], !0), curRBox.active = !1, t.focus(), e && t.options.onMinimize && t.options.onMinimize(1)
        },
        _min_toggle: function(e) {
            var t = this;
            setTimeout(function() {
                t.minimized ? t.unminimize(!0) : t.minimize(!0)
            }, 50)
        },
        destroy: function() {
            var e = this,
                t = indexOf(curRBox.focused, e.id); - 1 != t && curRBox.focused.splice(t, 1), cleanElems(e.wrap, e.resizeWrap, e.content, e.options.movable, e.options.closer, e.options.hider), re(e.wrap), delete curRBox.tabs[e.id]
        },
        _close_mdown: function(e) {
            (e.originalEvent || e).cancelBubble = !0
        },
        _close_click: function(e) {
            this.close()
        },
        _close: function(e) {
            this.destroy(), curRBox.focused[0] && e !== !0 && curRBox.tabs[curRBox.focused[0]].focus()
        },
        focus: function(e) {
            var t = this,
                i = curRBox.active != t.id || !0;
            return t._focus(), i && isFunction(t.options.onFocus) && t.options.onFocus(e), i
        },
        close: function() {
            var e = this,
                t = e.pos;
            e._close(), isFunction(e.options.onClose) && e.options.onClose(t)
        }
    }), window.RBox = i
}, function(e, t, i) {
    var a = i(119),
        r = i(38),
        n = i(122),
        o = i(45),
        s = i(113),
        c = "prototype",
        u = function(e, t, i) {
            var l, d, f, h, p = e & u.F,
                m = e & u.G,
                _ = e & u.S,
                g = e & u.P,
                v = e & u.B,
                b = m ? a : _ ? a[t] || (a[t] = {}) : (a[t] || {})[c],
                C = m ? r : r[t] || (r[t] = {}),
                y = C[c] || (C[c] = {});
            m && (i = t);
            for (l in i) d = !p && b && void 0 !== b[l], f = (d ? b : i)[l], h = v && d ? s(f, a) : g && "function" == typeof f ? s(Function.call, f) : f, b && o(b, l, f, e & u.U), C[l] != f && n(C, l, h), g && y[l] != f && (y[l] = f)
        };
    a.core = r, u.F = 1, u.G = 2, u.S = 4, u.P = 8, u.B = 16, u.W = 32, u.U = 64, u.R = 128, e.exports = u
}, , function(e, t, i) {
    "use strict";

    function a(e, t) {
        t = (0, c.parserMessage)(t);
        var i = vk.id == t.peerId && !(0, c.unpackStore)(e).gid;
        return 333 == t.peerId ? !1 : i || (0, u.isOut)(t) ? (0, l.isServiceMsg)(t) ? !1 : Date.now() / 1e3 - t.date > 86400 ? !1 : (0, u.isGift)(t) || (0, u.isSticker)(t) || (0, u.isAudioMsg)(t) || (0, u.isGraffiti)(t) || (0, u.isMoney)(t) || (0, u.isMessageWithInviteLink)(t) ? !1 : (0, c.isCommunityInterface)(e) && (t.kludges || {}).from_admin != vk.id ? !1 : (0, l.isAlreadyDeleted)(e, t.peerId, t.messageId) ? !1 : !0 : !1
    }

    function r(e) {
        var t = document.createElement("div");
        return e = e.replace(/\[((id|club)\d+)\|(.+?)]/g, "@$1 ($3)"), t.innerHTML = e, Emoji.val(t)
    }

    function n(e, t) {
        var i = t && t.msgs ? Object.keys(t.msgs) : [],
            r = i.filter(function(e) {
                return e > 0
            }).sort(function(e, t) {
                return t - e
            }).find(function(i) {
                return a(e, t.msgs[i])
            });
        return +r || null
    }

    function o(e, t, i) {
        var a = (0, d.convertKludgesToAttaches)(t.kludges, t.messageId),
            n = i.dData.attaches;
        if (r(t.text) !== i.dData.txt || a.length !== n.length) return !0;
        for (var o = a.length; o--;)
            if (a[o].id != n[o].id || a[o].type != n[o].type) return !0;
        return !1
    }

    function s(e, t, i, a, r) {
        t.origText = i, t.text = (0, l.replaceSpecialSymbols)(clean(i)).replace(/\n/gi, "<br>"), t.attaches = a, t.kludges.emoji = 1, t.local = 1, t.share_url = r, t.update_time = Math.floor(Date.now() / 1e3), e.get().tabs[t.peerId].msgs[t.messageId] = t
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.canMessageBeEdited = a, t.convertEmojiHtmlToRegularText = r, t.findLastMessageToEdit = n, t.wasMessageReallyModified = o, t.replaceMsgAfterEdit = s;
    var c = i(123),
        u = i(37),
        l = i(22),
        d = i(69)
}, function(e, t) {
    e.exports = function(e) {
        if (void 0 == e) throw TypeError("Can't call method on  " + e);
        return e
    }
}, , , , function(e, t, i) {
    "use strict";

    function a(e) {
        return {
            unmount: function() {
                (0, n.destroyModule)(e)
            }
        }
    }

    function r(e, t, i) {
        var r = (0, n.createMutations)(a),
            o = r.bindMutations,
            s = (0, n.createModule)({
                handlers: function(e, t) {}
            });
        return o(s)
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.mount = r;
    var n = i(27)
}, function(e, t, i) {
    var a = i(124),
        r = i(119).document,
        n = a(r) && a(r.createElement);
    e.exports = function(e) {
        return n ? r.createElement(e) : {}
    }
}, , function(e, t, i) {
    "use strict";
    var a = i(119),
        r = i(97),
        n = i(45),
        o = i(135),
        s = i(121),
        c = i(9),
        u = i(29),
        l = i(124),
        d = i(116),
        f = i(54),
        h = i(138),
        p = i(55);
    e.exports = function(e, t, i, m, _, g) {
        var v = a[e],
            b = v,
            C = _ ? "set" : "add",
            y = b && b.prototype,
            w = {},
            k = function(e) {
                var t = y[e];
                n(y, e, "delete" == e ? function(e) {
                    return g && !l(e) ? !1 : t.call(this, 0 === e ? 0 : e)
                } : "has" == e ? function(e) {
                    return g && !l(e) ? !1 : t.call(this, 0 === e ? 0 : e)
                } : "get" == e ? function(e) {
                    return g && !l(e) ? void 0 : t.call(this, 0 === e ? 0 : e)
                } : "add" == e ? function(e) {
                    return t.call(this, 0 === e ? 0 : e), this
                } : function(e, i) {
                    return t.call(this, 0 === e ? 0 : e, i), this
                })
            };
        if ("function" == typeof b && (g || y.forEach && !d(function() {
                (new b).entries().next()
            }))) {
            var N = new b,
                T = N[C](g ? {} : -0, 1) != N,
                F = d(function() {
                    N.has(1)
                }),
                E = f(function(e) {
                    new b(e)
                }),
                x = !g && d(function() {
                    for (var e = new b, t = 5; t--;) e[C](t, t);
                    return !e.has(-0)
                });
            E || (b = t(function(t, i) {
                u(t, b, e);
                var a = p(new v, t, b);
                return void 0 != i && c(i, _, a[C], a), a
            }), b.prototype = y, y.constructor = b), (F || x) && (k("delete"), k("has"), _ && k("get")), (x || T) && k(C), g && y.clear && delete y.clear
        } else b = m.getConstructor(t, e, _, C), o(b.prototype, i), s.NEED = !0;
        return h(b, e), w[e] = b, r(r.G + r.W + r.F * (b != v), w), g || m.setStrong(b, e, _), b
    }
}, function(e, t, i) {
    "use strict";

    function a(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }

    function r(e) {
        var t = l.get(e.currentTarget);
        if (t) {
            var i = t[e.type];
            if (i)
                for (var a = void 0, r = 0; r < i.length; r++) {
                    var n = s(i[r], 2),
                        o = n[0],
                        c = n[1],
                        u = void 0;
                    if (hasClass(e.target, o) ? u = c(e, e.target) : (a = gpeByClass(o, e.target, e.currentTarget)) && (u = c(e, a)), u === !1) break
                }
        }
    }

    function n(e, t, i, a) {
        var n = l.get(e);
        n || (l.set(e, {}), n = l.get(e));
        for (var o = t.split(" "), s = 0; s < o.length; s++) {
            var c = o[s];
            n[c] || (n[c] = [], addEvent(e, c, r)), n[c].push([i, a])
        }
    }

    function o(e, t, i, a) {
        var n = l.get(e);
        if (n) {
            t.split(" ").forEach(function(t) {
                n[t] && (n[t] = n[t].filter(function(e) {
                    return e[0] !== i || e[1] !== a
                }), 0 === n[t].length && removeEvent(e, t, r))
            });
            var o = Object.keys(n).map(function(e) {
                return n[e].length
            }).reduce(function(e, t) {
                return e + t
            });
            0 === o && l["delete"](e)
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var s = function() {
        function e(e, t) {
            var i = [],
                a = !0,
                r = !1,
                n = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (i.push(o.value), !t || i.length !== t); a = !0);
            } catch (c) {
                r = !0, n = c
            } finally {
                try {
                    !a && s["return"] && s["return"]()
                } finally {
                    if (r) throw n
                }
            }
            return i
        }
        return function(t, i) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, i);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.addDelegateEvent = n, t.removeDelegateEvent = o;
    var c = i(95),
        u = a(c),
        l = new u["default"]
}, function(e, t, i) {
    var a = i(124);
    e.exports = function(e, t) {
        if (!a(e)) return e;
        var i, r;
        if (t && "function" == typeof(i = e.toString) && !a(r = i.call(e))) return r;
        if ("function" == typeof(i = e.valueOf) && !a(r = i.call(e))) return r;
        if (!t && "function" == typeof(i = e.toString) && !a(r = i.call(e))) return r;
        throw TypeError("Can't convert object to primitive value")
    }
}, function(e, t, i) {
    "use strict";
    var a = i(70),
        r = i(139),
        n = i(111),
        o = i(16);
    e.exports = i(125)(Array, "Array", function(e, t) {
        this._t = o(e), this._i = 0, this._k = t
    }, function() {
        var e = this._t,
            t = this._k,
            i = this._i++;
        return !e || i >= e.length ? (this._t = void 0, r(1)) : "keys" == t ? r(0, i) : "values" == t ? r(0, e[i]) : r(0, [i, e[i]])
    }, "values"), n.Arguments = n.Array, a("keys"), a("values"), a("entries")
}, function(e, t) {
    e.exports = {}
}, , function(e, t, i) {
    var a = i(14);
    e.exports = function(e, t, i) {
        if (a(e), void 0 === t) return e;
        switch (i) {
            case 1:
                return function(i) {
                    return e.call(t, i)
                };
            case 2:
                return function(i, a) {
                    return e.call(t, i, a)
                };
            case 3:
                return function(i, a, r) {
                    return e.call(t, i, a, r)
                }
        }
        return function() {
            return e.apply(t, arguments)
        }
    }
}, , , function(e, t) {
    e.exports = function(e) {
        try {
            return !!e()
        } catch (t) {
            return !0
        }
    }
}, , function(e, t, i) {
    "use strict";

    function a(e, t) {
        for (var i = void 0, a = 0, r = e; null !== (i = d.MESSAGE_REGEXP.exec(e));) {
            i = o(i);
            var n = i[0].length,
                c = i.index + n,
                u = e[i.index - 1],
                l = e[c - 1],
                f = void 0 !== u && /([\w\$А-Яа-яёЁєЄҐґЇїІіЈј\—\-\_@;.])/i.test(u),
                h = void 0 !== l && /([:;$])/i.test(l);
            if (!f && !h) {
                var p = s(i),
                    m = p.domain;
                if (m.length <= d.MAX_DOMAIN_LENGTH && -1 !== d.TOP_DOMAINS.indexOf(m)) {
                    var _ = t(p);
                    r = r.slice(0, i.index + a) + _ + r.slice(c + a), a += _.length - n
                }
            }
        }
        return r
    }

    function r(e, t) {
        return e.replace(d.EMAIL, t || function(e) {
            return '<a href="mailto:' + e + '">' + e + "</a>"
        })
    }

    function n(e, t) {
        return e.replace(d.MENTION, t || function(e, t, i, a, r) {
            return '<a href="/' + (t + i) + '" class="mem_link" mention="' + h(a || "") + '" mention_id="' + h(t + i) + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)">' + r + "</a>"
        })
    }

    function o(e) {
        if (!e[0] || !e[6]) return e;
        var t = e[0].length - 1,
            i = e[6].length - 1;
        return "." === e[0][t] && "." === e[6][i] && (e[0] = e[0].slice(0, t), e[6] = e[6].slice(0, i)), e
    }

    function s(e) {
        return {
            full: e[0],
            protocol: e[1] || "http://",
            url: e[2],
            domain: e[4],
            query: e[6] || ""
        }
    }

    function c(e) {
        m("ttl_message_confirm_delivery", e)
    }

    function u(e, t) {
        var i = t.protocol,
            a = t.url,
            r = t.query,
            n = t.domain,
            o = t.full;
        try {
            o = decodeURIComponent(o)
        } catch (s) {}
        if (o.length > 55 && (o = o.substr(0, 53) + ".."), o = h(o).replace(/&amp;/g, "&"), !e && n.match(d.OUR_DOMAINS)) {
            a = p(a).replace(d.ENTITIES, encodeURIComponent);
            var c = a,
                u = a.indexOf("#/"),
                f = "",
                m = void 0;
            return u >= 0 ? c = a.substr(u + 1) : (u = a.indexOf("#!"), u >= 0 && (c = "/" + a.substr(u + 2).replace(/^\//, ""))), m = c.match(d.VK_DOMAIN), m && m[1].length < 32 && (f = ' mention_id="' + m[1] + '" onclick="return mentionClick(this, event)" onmouseover="mentionOver(this)"'), '<a href="' + l(i + a + r) + '" target="_blank"' + f + ">" + o + "</a>"
        }
        var _ = "away.php?utf=1&to=" + encodeURIComponent(i + p(a + r)),
            g = h(i + a + r).replace(/'/g, "\\'"),
            v = "return goAway('" + g + "', {}, event);";
        return '<a href="' + _ + '" target="_blank" onclick="' + v + '">' + o + "</a>"
    }

    function l(e) {
        return e.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.replaceHyperLinks = a, t.replaceEmailLinks = r, t.replaceMentions = n, t.confirmDelivery = c, t.linksReplacer = u;
    var d = i(2),
        f = window,
        h = f.clean,
        p = f.replaceEntities,
        m = f.statlogsValueEvent
}, function(e, t) {
    var i = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = i)
}, , function(e, t, i) {
    var a = i(4)("meta"),
        r = i(124),
        n = i(88),
        o = i(85).f,
        s = 0,
        c = Object.isExtensible || function() {
            return !0
        },
        u = !i(116)(function() {
            return c(Object.preventExtensions({}))
        }),
        l = function(e) {
            o(e, a, {
                value: {
                    i: "O" + ++s,
                    w: {}
                }
            })
        },
        d = function(e, t) {
            if (!r(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
            if (!n(e, a)) {
                if (!c(e)) return "F";
                if (!t) return "E";
                l(e)
            }
            return e[a].i
        },
        f = function(e, t) {
            if (!n(e, a)) {
                if (!c(e)) return !0;
                if (!t) return !1;
                l(e)
            }
            return e[a].w
        },
        h = function(e) {
            return u && p.NEED && c(e) && !n(e, a) && l(e), e
        },
        p = e.exports = {
            KEY: a,
            NEED: !1,
            fastKey: d,
            getWeak: f,
            onFreeze: h
        }
}, function(e, t, i) {
    var a = i(85),
        r = i(76);
    e.exports = i(67) ? function(e, t, i) {
        return a.f(e, t, r(1, i))
    } : function(e, t, i) {
        return e[t] = i, e
    }
}, function(e, t, i) {
    "use strict";

    function a(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
        return t["default"] = e, t
    }

    function r(e) {
        return e.get ? e.get() : e
    }

    function n(e, t) {
        var i = r(e),
            a = i.tabs[i.peer];
        return Object.keys(a.msgs).filter(function(i) {
            var r = v(e, t, i);
            return !(0, q.isOut)(r) && intval(i) > a.in_up_to
        })[0]
    }

    function o(e) {
        var t = r(e);
        return t.peer
    }

    function s(e, t) {
        var i = r(e);
        return i.tabs[t]
    }

    function c(e) {
        var t = r(e);
        return t.peer ? t.tabs[t.peer] : null
    }

    function u(e) {
        var t = r(e);
        return t.selectedMessages
    }

    function l(e, t, i) {
        var a = s(e, t),
            r = u(e)[0];
        if ("undefined" == typeof r) return [i];
        var n = Math.min(i, r),
            o = Math.max(i, r);
        return Object.keys(a.msgs).filter(function(e) {
            return e >= n && o >= e
        }).filter(function(t) {
            return !(0, G.isServiceMsg)(v(e, e.get().peer, t))
        }).map(intval)
    }

    function d(e, t) {
        var i = r(t),
            a = s(i, e),
            n = 0;
        for (var o in a.msgs)
            if (a.msgs.hasOwnProperty(o)) {
                var c = v(t, e, o);
                (0, q.isOut)(c) || (n += (0, q.isUnread)(a, c) ? 1 : 0)
            }
        return n
    }

    function f(e, t, i) {
        var a = s(e, t);
        return Object.keys(a.msgs).filter(function(a) {
            return intval(v(e, t, a).randomId) === i;
        }).length > 0
    }

    function h(e, t, i) {
        var a = f(e, t, i);
        return !!a
    }

    function p(e, t) {
        var i = r(e),
            a = i.msg_local_ids_sort && i.msg_local_ids_sort[t];
        return "undefined" != typeof a ? 2e9 + a : t
    }

    function m(e, t, i) {
        var a = s(e, t),
            r = v(e, t, i),
            n = Object.keys(a.msgs).filter(function(i) {
                var a = v(e, t, i),
                    n = a.local && a.type !== z.EDIT_MESSAGE;
                return !r.local && n ? !1 : r.local && !n ? !0 : p(e, r.messageId) > p(e, a.messageId)
            }),
            o = n.pop();
        return o ? v(e, t, o) : null
    }

    function _(e) {
        return e && e.length > 0 ? U.addMessageEvent([0].concat(e)) : e
    }

    function g(e, t, i) {
        var a = s(e, t),
            n = v(e, t, i),
            o = r(e);
        return (0, q.isOut)(n) ? (0, V.oCacheGet)(e, o.id).name : n.userId !== n.peerId ? (0, V.oCacheExists)(e, n.userId) ? (0, V.oCacheGet)(e, n.userId).name : !1 : a.tab
    }

    function v(e, t, i) {
        var a = s(e, t),
            r = a && a.msgs && a.msgs[i];
        return r ? _(r) : null
    }

    function b(e) {
        var t = r(e);
        return t.gid || t.isClassic
    }

    function C(e) {
        return r(e).gid
    }

    function y(e) {
        return r(e).gid
    }

    function w(e) {
        return r(e).gid
    }

    function k(e, t) {
        var i = r(t);
        return i.tabs[e] || i.mapped_index[e]
    }

    function N(e) {
        var t = r(e);
        return w(e) ? 19542789 !== t.gid && 103416369 != t.gid ? !1 : t.active_tab === W.FOLDER_UNRESPOND || t.active_tab === W.FOLDER_UNREAD ? !0 : !1 : !1
    }

    function T(e, t) {
        e = r(e);
        var i = e.tabs[t] && "undefined" != typeof e.tabs[t].history;
        return e.tabs[t] && e.tabs[t].msgs && i ? !0 : !1
    }

    function F(e, t) {
        var i = s(e, t);
        i && (i.msgs = void 0, i.msgid = void 0, i.scrollTop = void 0, i.scrollBottom = void 0, i.contHeight = void 0, i.offset = void 0, i.skipped = void 0)
    }

    function E(e) {
        var t = e.get().go_to_end_visible;
        return t ? t[0] : !1
    }

    function x(e) {
        var t = e.get().go_to_end_visible;
        return t ? t[1] : 0
    }

    function S(e) {
        var t = r(e);
        return !t.lockedSending
    }

    function I(e) {
        return e > -2e9 && 0 > e
    }

    function O(e, t) {
        return I(t) ? !!s(e, t).blocked_community : !1
    }

    function L(e) {
        var t = r(e);
        return t.voice_message_available
    }

    function M(e) {
        var t = r(e);
        return !(!R(t) && !t.recentSearch)
    }

    function R(e) {
        var t = r(e);
        return t.searchText
    }

    function P(e, t) {
        var i = r(e);
        return t && t !== R(e) || i.recentSearch ? !0 : !1
    }

    function A(e) {
        var t = r(e);
        return t.recentSearch
    }

    function D(e) {
        var t = c(e);
        return t && t.pinned && _(t.pinned)
    }

    function B(e) {
        var t = e.get().popular_sugg;
        return t && t.length > 0
    }

    function j(e) {
        return 1 == r(e).isEditing
    }

    function H(e) {
        return e.draft || (e.draft = (0, K.loadDraftForPeer)(cur.imDb, e.peerId)), e.draft
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.unpackStore = r, t.getFirstUnread = n, t.getPeer = o, t.getTab = s, t.getCurrentTab = c, t.getSelectedMessages = u, t.getMessageRangeFromSelection = l, t.countUnread = d, t.getMessageByRid = f, t.isRidExist = h, t.getLocalId = p, t.getLastMessage = m, t.parserMessage = _, t.getAuthorFullName = g, t.getMessage = v, t.isClassicInterface = b, t.isLocksAvailable = C, t.isFoldersAvailable = y, t.isCommunityInterface = w, t.getBareTab = k, t.isReversedDialogs = N, t.isFullyLoadedTab = T, t.makeTabNotFullyLoaded = F, t.isGoToEndVisible = E, t.getUnreadScrollBottom = x, t.isSendingAvailable = S, t.isCommunityPeer = I, t.isCommunityBlocked = O, t.checkVoiceMessageAvailable = L, t.isSearching = M, t.getSearchText = R, t.isSearchingValue = P, t.isRecentSearchesActive = A, t.getPinnedMessage = D, t.doPopularSuggExist = B, t.isAnyMessageBeingEdited = j, t.getTabDraft = H;
    var q = i(37),
        z = i(59),
        U = a(z),
        W = i(2),
        G = i(22),
        V = i(12),
        K = i(69)
}, function(e, t) {
    e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
}, function(e, t, i) {
    "use strict";
    var a = i(92),
        r = i(97),
        n = i(45),
        o = i(122),
        s = i(88),
        c = i(111),
        u = i(18),
        l = i(138),
        d = i(84),
        f = i(93)("iterator"),
        h = !([].keys && "next" in [].keys()),
        p = "@@iterator",
        m = "keys",
        _ = "values",
        g = function() {
            return this
        };
    e.exports = function(e, t, i, v, b, C, y) {
        u(i, t, v);
        var w, k, N, T = function(e) {
                if (!h && e in S) return S[e];
                switch (e) {
                    case m:
                        return function() {
                            return new i(this, e)
                        };
                    case _:
                        return function() {
                            return new i(this, e)
                        }
                }
                return function() {
                    return new i(this, e)
                }
            },
            F = t + " Iterator",
            E = b == _,
            x = !1,
            S = e.prototype,
            I = S[f] || S[p] || b && S[b],
            O = I || T(b),
            L = b ? E ? T("entries") : O : void 0,
            M = "Array" == t ? S.entries || I : I;
        if (M && (N = d(M.call(new e)), N !== Object.prototype && (l(N, F, !0), a || s(N, f) || o(N, f, g))), E && I && I.name !== _ && (x = !0, O = function() {
                return I.call(this)
            }), a && !y || !h && !x && S[f] || o(S, f, O), c[t] = O, c[F] = g, b)
            if (w = {
                    values: E ? O : T(_),
                    keys: C ? O : T(m),
                    entries: L
                }, y)
                for (k in w) k in S || n(S, k, w[k]);
            else r(r.P + r.F * (h || x), t, w);
        return w
    }
}, , , , , function(e, t) {
    var i = Math.ceil,
        a = Math.floor;
    e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? a : i)(e)
    }
}, , function(e, t, i) {
    "use strict";
    var a = i(30),
        r = {};
    r[i(93)("toStringTag")] = "z", r + "" != "[object z]" && i(45)(Object.prototype, "toString", function() {
        return "[object " + a(this) + "]"
    }, !0)
}, , , function(e, t, i) {
    var a = i(45);
    e.exports = function(e, t, i) {
        for (var r in t) a(e, r, t[r], i);
        return e
    }
}, function(e, t, i) {
    "use strict";

    function a() {
        return !curFastChat.version || !curFastChat.tabs
    }
    var r = i(140),
        n = i(69),
        o = i(118),
        s = 1e4;
    window.curFastChat || (window.curFastChat = {}), window.FastChat = {
        init: function(e) {
            extend(curFastChat, {
                tabs: {},
                needPeers: {},
                gotPeers: {},
                needMedia: {},
                gotMedia: {},
                ldb: (0, r.mount)(vk.id),
                myTypingEvents: {},
                typingEvents: {},
                inited: !0,
                options: e,
                posSeq: 0,
                error_timeout: 1
            }), delete curFastChat.standby, delete curFastChat.standbyTO, Notifier.addRecvClbk("fastchat", 0, FastChat.lcRecv, !0), Notifier.addRecvClbk("logged_off", 0, FastChat.standby, !0), FastChat.lcSend("needSettings", {
                version: e.version,
                lang_id: langConfig.id
            }), clearTimeout(curFastChat.getSettingsTO), curFastChat.getSettingsTO = setTimeout(FastChat.getSettings, 300)
        },
        getSettings: function() {
            var e = ls.get("fcFriends" + vk.id);
            ajax.post("al_im.php", {
                act: "a_get_fast_chat",
                friends: e && e.version,
                cache_time: FastChat.cachedStickersKeywordsTime()
            }, {
                onDone: function(t) {
                    -1 == t.friends ? (t.friends_version = e.version, t.friends = e.list) : ls.set("fcFriends" + vk.id, {
                        version: t.friends_version,
                        list: t.friends
                    }), FastChat.gotSettings(t), FastChat.sendSettings()
                },
                onFail: function() {
                    return !0
                }
            })
        },
        cachedStickersKeywordsTime: function() {
            var e = ls.get("stickers_keywords");
            return e && e.time ? Math.floor(e.time / 1e3) : 0
        },
        gotSettings: function(e) {
            e.emoji_stickers && (window.emojiStickers = e.emoji_stickers), window.Emoji && Emoji.updateTabs(), clearTimeout(curFastChat.getSettingsTO), window.lang = extend(window.lang || {}, e.lang), extend(curFastChat, e, {
                lang_id: langConfig.id
            }), curNotifier.is_server && (e.im_queue ? curFastChat.lpInited || FastChat.initLp() : (clearTimeout(curFastChat.lp_error_to), curFastChat.lp_error_to = setTimeout(FastChat.updateQueueKeys.bind(FastChat), 1e3 * (curNotifier.error_timeout || 1)))), curFastChat.friendsCnt = Object.keys(curFastChat.friends), setTimeout(FastChat.clistCache.pbind(!1), 10), FastChat.initUI()
        },
        sendSettings: function() {
            clearTimeout(curFastChat.sendSettingsTO);
            var e, t = {},
                i = ["friends", "friends_version", "onlines", "tpl", "lang", "me", "version", "im_queue", "cl_queue"];
            for (e in i) {
                if ("cl_queue" != i[e] && void 0 === curFastChat[i[e]]) return;
                t[i[e]] = curFastChat[i[e]]
            }
            clearTimeout(curFastChat.sendSettingsTO), curFastChat.sendSettingsTO = setTimeout(function() {
                FastChat.lcSend("settings", {
                    settings: t
                })
            }, curNotifier.is_server ? 0 : irand(50, 100))
        },
        becameServer: function() {
            !curFastChat.lpInited && curFastChat.version && (delete curNotifier.addQueues["fastchat" + vk.id], delete curNotifier.addQueues["contacts" + vk.id], curFastChat.im_queue ? curFastChat.lpInited || FastChat.initLp() : (clearTimeout(curFastChat.lp_error_to), curFastChat.lp_error_to = setTimeout(FastChat.updateQueueKeys.bind(FastChat), 1e3 * (curNotifier.error_timeout || 1))))
        },
        destroy: function() {
            return curFastChat.inited ? (curFastChat.ldb.unmount(), FastChat.stopLp(), each(curFastChat.tabs || {}, function(e, t) {
                t.box.destroy()
            }), curFastChat.clistBox && curFastChat.clistBox.destroy(), each(curFastChat.el || {}, function() {
                cleanElems(this)
            }), clearInterval(curFastChat.updateFriendsInt), clearInterval(curFastChat.updateTypingsInt), clearTimeout(curFastChat.correspondentsTO), clearTimeout(curFastChat.lp_error_to), curFastChat = {
                inited: !1
            }, !0) : !1
        },
        isChatOpen: function(e) {
            return window.curFastChat && curFastChat.inited && e && (curFastChat.tabs && curFastChat.tabs[e] && curFastChat.tabs[e].box.visible || curFastChat.clistBox && curFastChat.clistBox.visible) ? !0 : !1
        },
        standby: function(e) {
            FastChat.destroy(), curFastChat.standby = !0;
            var t = 1,
                i = function a() {
                    return curNotifier.is_server ? void ajax.post("notifier.php?act=a_get_reload", {
                        version: e
                    }, {
                        onDone: function(e, t) {
                            FastChat.lcSend("gotConfig", {
                                navVersion: e,
                                config: t
                            }), FastChat.gotConfig(e, t)
                        },
                        onFail: function() {
                            return t *= 2, clearTimeout(curFastChat.standbyTO), curFastChat.standbyTO = setTimeout(a, 1e3 * t), !0
                        }
                    }) : (clearTimeout(curFastChat.standbyTO), void(curFastChat.standbyTO = setTimeout(a, 1e3 * t)))
                };
            i()
        },
        gotConfig: function(e, t) {
            clearTimeout(curFastChat.standbyTO), curFastChat.standby && setTimeout(function() {
                e > stVersions.nav && (debugLog("appending al loader"), headNode.appendChild(ce("script", {
                    type: "text/javascript",
                    src: "/js/loader_nav" + e + "_" + vk.lang + ".js"
                }))), setTimeout(function() {
                    return e <= stVersions.nav ? void stManager.add(["notifier.js", "notifier.css", "emoji.js"], function() {
                        FastChat.init(t)
                    }) : void setTimeout(arguments.callee, 100)
                }, 0)
            }, curNotifier.is_server ? 0 : irand(1e3, 2e3))
        },
        updateVersion: function(e) {
            FastChat.lcSend("standby", {
                version: e
            }), FastChat.standby(e)
        },
        lcSend: function(e, t) {
            Notifier.lcSend("fastchat", extend({
                act: e,
                __id: curFastChat.me && curFastChat.me.id || vk.id
            }, t))
        },
        lcRecv: function(e) {
            if (!isEmpty(e)) {
                var t = e.act;
                e.__id == (curFastChat.me && curFastChat.me.id || vk.id) && (delete e.act, delete e.__id, FastChat.lcFeed(t, e))
            }
        },
        lcFeed: function(e, t) {
            switch (e) {
                case "needSettings":
                    curFastChat.version < t.version || t.lang_id == curFastChat.lang_id && FastChat.sendSettings();
                    break;
                case "settings":
                    !curFastChat.version && curFastChat.options && t.settings.version == curFastChat.options.version && FastChat.gotSettings(t.settings), clearTimeout(curFastChat.sendSettingsTO);
                    break;
                case "standby":
                    if (a()) break;
                    FastChat.standby(t.version);
                    break;
                case "gotConfig":
                    FastChat.gotConfig(t.navVersion, t.config);
                    break;
                case "clFeed":
                    if (a()) break;
                    FastChat.clFeed(t.events);
                    break;
                case "clistOnlines":
                    if (a()) break;
                    FastChat.clistGotOnlines(t);
                    break;
                case "imFeeds":
                    if (a()) break;
                    FastChat.imFeeds(t);
                    break;
                case "needPeer":
                    if (a()) break;
                    var i, r = t.id,
                        n = curFastChat.tabs[r],
                        o = !1;
                    if (void 0 !== n) {
                        o = {
                            name: n.name,
                            photo: n.photo,
                            fname: n.fname,
                            hash: n.hash,
                            sex: n.sex,
                            data: n.data,
                            online: n.online
                        };
                        for (var s in n.msgs) {
                            o.history = [n.log.innerHTML, n.msgs];
                            break
                        }
                    } else(i = curFastChat.friends[r + "_"]) && (o = {
                        name: i[0],
                        photo: i[1],
                        fname: i[2],
                        hash: i[3],
                        data: i[4],
                        online: curFastChat.onlines[r]
                    });
                    if (o === !1) break;
                    curFastChat.gotPeers[r] = setTimeout(function() {
                        var e = {};
                        e[r] = o, FastChat.lcSend("gotPeers", e)
                    }, curNotifier.is_server ? 0 : irand(50, 100));
                    break;
                case "fetchingPeers":
                    if (a()) break;
                    each(t, function(e, t) {
                        var i = curFastChat.needPeers[e];
                        i && (t & i[0]) == i[0] && clearTimeout(i[2])
                    });
                    break;
                case "gotPeers":
                    if (a()) break;
                    FastChat.gotPeers(t);
                    break;
                case "stateChange":
                    if (a()) break;
                    FastChat.onStateChanged(t);
                    break;
                case "queueSet":
                    extend(curFastChat, t);
                    break;
                case "queueClean":
                    curNotifier.is_server || (delete curFastChat.im_queue, delete curFastChat.cl_queue);
                    break;
                case "needMedia":
                    var c = t.msgId,
                        u = curFastChat.gotMedia[c];
                    if (void 0 === u || 0 === u) break;
                    curFastChat.gotMedia[c][3] = setTimeout(function() {
                        FastChat.lcSend("gotMedia", {
                            msgId: c,
                            peer: u[0],
                            text: u[1],
                            msgOpts: u[2]
                        })
                    }, curNotifier.is_server ? 0 : irand(50, 100));
                    break;
                case "fetchingMedia":
                    var c = t.msgId,
                        l = curFastChat.needMedia[c];
                    if (void 0 === l || 0 === curFastChat.gotMedia[c]) break;
                    clearTimeout(l[1]), l[1] = setTimeout(FastChat.loadMsgMedia.pbind(l[0], c), 1e3);
                    break;
                case "gotMedia":
                    var c = t.msgId,
                        u = curFastChat.gotMedia[c];
                    isArray(u) && clearTimeout(u[3]), FastChat.gotMsgMedia(t.peer, c, t.text, t.msgOpts)
            }
        },
        initLp: function() {
            curFastChat.lpInited = !0, FastChat.checkLp(), curFastChat.checkLpInt = setInterval(FastChat.checkLp, 2e4)
        },
        stopLp: function() {
            curFastChat.lpInited = !1, clearInterval(curFastChat.checkLpInt), delete curFastChat.im_queue, delete curFastChat.cl_queue
        },
        checkLp: function() {
            curNotifier.is_server && curFastChat.im_queue && (Notifier.addKey({
                queue: curFastChat.im_queue.id,
                key: curFastChat.im_queue.key,
                ts: curFastChat.im_queue.ts
            }, FastChat.imChecked, !0), curFastChat.cl_queue && Notifier.addKey({
                queue: curFastChat.cl_queue.id,
                key: curFastChat.cl_queue.key,
                ts: curFastChat.cl_queue.ts
            }, FastChat.clChecked, !0), FastChat.lcSend("queueSet", {
                im_queue: curFastChat.im_queue,
                cl_queue: curFastChat.cl_queue
            }))
        },
        updateQueueKeys: function() {
            curFastChat.updatingQueues || (curFastChat.updatingQueues = 1, FastChat.lcSend("queueClean"), FastChat.stopLp(), ajax.post("al_im.php", {
                act: "a_get_fc_queue"
            }, {
                onDone: function(e) {
                    return e.version > curFastChat.version ? void FastChat.updateVersion(e.version) : (delete curFastChat.updatingQueues, extend(curFastChat, e), FastChat.lcSend("queueSet", e), void(curNotifier.is_server && (FastChat.initLp(), FastChat.clistUpdate())))
                },
                onFail: function() {
                    return delete curFastChat.updatingQueues, FastChat.destroy(), !0
                }
            }))
        },
        clChecked: function(e, t) {
            if (curFastChat.inited && curFastChat.ready && curFastChat.cl_queue) {
                if (t.failed) return clearTimeout(curFastChat.lp_error_to), void(curFastChat.lp_error_to = setTimeout(FastChat.updateQueueKeys.bind(FastChat), 1e3 * (curNotifier.error_timeout || 1)));
                t.ts && (t.key && (curFastChat.cl_queue.key = t.key), curFastChat.cl_queue.ts = t.ts, FastChat.lcSend("queueSet", {
                    cl_queue: curFastChat.cl_queue
                })), isArray(t.events) && t.events.length && (FastChat.clFeed(t.events), FastChat.lcSend("clFeed", {
                    events: t.events
                }))
            }
        },
        clFeed: function(e) {
            if (curFastChat.inited && curFastChat.ready && curFastChat.tabs) {
                var t = !1,
                    i = !1;
                each(e, function() {
                    var e = this.split("<!>"),
                        a = e[0],
                        r = e[1],
                        n = e[2],
                        o = e[3] ? e[3] : 1,
                        s = curFastChat.tabs[n],
                        c = curFastChat.onlines[n];
                    if (a != curFastChat.version) return FastChat.updateVersion(a), i = !0, !1;
                    if (curFastChat.friends[n + "_"] || s) switch (r) {
                        case "online":
                            if (c == o) break;
                            curFastChat.onlines[n] = o, FastChat.tabNotify(n, "online", o), t = !0;
                            break;
                        case "offline":
                            if (!c) break;
                            delete curFastChat.onlines[n], re("fc_contact" + n) && curFastChat.clistBox.visible && FastChat.clistShowMore(), FastChat.tabNotify(n, "offline")
                    }
                }), i || (t && curFastChat.clistBox.visible && curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && (curFastChat.el.clist.scrollTop < 100 || curRBox.active != curFastChat.clistBox.id) ? FastChat.clistRender() : FastChat.clistUpdateTitle())
            }
        },
        imChecked: function(e, t) {
            if (curFastChat.inited && curFastChat.ready && curFastChat.im_queue) {
                if (t.failed) return clearTimeout(curFastChat.lp_error_to), void(curFastChat.lp_error_to = setTimeout(FastChat.updateQueueKeys.bind(FastChat), 1e3 * (curNotifier.error_timeout || 1)));
                if (t.ts && curFastChat.im_queue && (t.key && (curFastChat.im_queue.key = t.key), curFastChat.im_queue.ts = t.ts, FastChat.lcSend("queueSet", {
                        im_queue: curFastChat.im_queue
                    })), isArray(t.events) && t.events.length) {
                    var i = {},
                        a = !1;
                    each(t.events, function() {
                        var e = this.split("<!>"),
                            t = e[0],
                            r = e[1],
                            n = e[2],
                            o = 0;
                        if (t != curFastChat.version) return FastChat.updateVersion(t), a = !0, !1;
                        switch (r) {
                            case "read":
                            case "edit":
                            case "delete":
                                break;
                            case "typing":
                                o = 1;
                                break;
                            case "new":
                                o = 2 & e[4] ? 0 : 2;
                                break;
                            default:
                                return
                        }
                        i[n] || (i[n] = [0]), i[n][0] |= o, i[n].push(e)
                    }), a || isEmpty(i) || (FastChat.lcSend("imFeeds", i), FastChat.imFeeds(i))
                }
            }
        },
        imFeeds: function(e) {
            curFastChat.inited && curFastChat.ready && each(e, function(e, t) {
                t.shift(), FastChat.imFeed(e, t)
            })
        },
        blinkEl: function(e, t, i) {
            return t > 10 ? (i(), !1) : void(t % 2 == 0 ? animate(e, {
                opacity: 0
            }, 400, function() {
                FastChat.blinkEl(e, t + 1, i)
            }) : animate(e, {
                opacity: 1
            }, 400, function() {
                setTimeout(function() {
                    FastChat.blinkEl(e, t + 1, i)
                }, 400)
            }))
        },
        blinkTyping: function(e) {
            var t = ge("chat_tab_icon_" + e);
            if (t) {
                var i = geByClass1("chat_tab_typing_wrap", t);
                fadeIn(i, 150, function() {
                    FastChat.blinkEl(i.firstChild, 0, function() {
                        fadeOut(i, 150)
                    })
                })
            }
        },
        imFeed: function(e, t) {
            var i = curFastChat.tabs[e],
                a = vkNow();
            return each(t, function(t, i) {
                switch (i[1]) {
                    case "new":
                        1 === (3 & i[4]) && FastChat.changePeerCounter(e, 1);
                        break;
                    case "read":
                        var a = 1;
                        each(i[3].split(","), function(e, t) {
                            a += 1
                        }), FastChat.changePeerCounter(e, -a);
                        break;
                    case "typing":
                        Chat.tabs[e] && FastChat.blinkTyping(e)
                }
            }), i ? (each(t, function(t, r) {
                switch (r[1]) {
                    case "new":
                        stManager.add(["imn.js"], function() {
                            intval(r[8]) && (0, o.confirmDelivery)(r[3]), each(i.sentmsgs, function(e, t) {
                                var i = ge("fc_msg" + t),
                                    a = i && i.parentNode;
                                re(i) && a && !geByClass("fc_msg", a).length && re(domClosest("fc_msgs_wrap", a))
                            });
                            var t = ge("fc_msg" + r[3]);
                            t || (FastChat.addMsg(FastChat.prepareMsgData(r.slice(2))), i.msgs[r[3]] = [2 & r[4] ? 1 : 0, 1 & r[4]], 1 === (3 & r[4]) && i.unread++, FastChat.scroll(e)), FastChat.blinkTab(e)
                        });
                        break;
                    case "read":
                        var n = [],
                            s = intval(r[3]);
                        each(i.msgs, function(e) {
                            intval(e) <= s && i.msgs[e][1] && n.push(intval(e))
                        }), each(n, function(e, t) {
                            var a, r = ge("fc_msg" + t);
                            r && (a = i.msgs[t] && i.msgs[t][0] ? r.parentNode.parentNode : r.parentNode, i.msgs[t] && i.msgs[t][1] && (i.msgs[t][1] = 0, i.msgs[t][0] || i.unread--), removeClass(r, "fc_msg_unread"), hasClass(a.parentNode, "fc_msgs_unread") && each(a.childNodes, function() {
                                return hasClass(this, "fc_msg_unread") ? void 0 : (removeClass(a.parentNode, "fc_msgs_unread"), !1)
                            }))
                        });
                        break;
                    case "typing":
                        e > 2e9 ? (curFastChat.typingEvents[e] || (curFastChat.typingEvents[e] = {}), curFastChat.typingEvents[e][r[3]] = a) : curFastChat.typingEvents[e] = a, FastChat.updateTyping(e);
                        break;
                    case "edit":
                        var c = i.msgs[r[3]];
                        c && (delete curFastChat.gotMedia[r[3]], r[4] = (c[0] ? 2 : 0) + (c[1] ? 1 : 0), FastChat.editMsg(FastChat.prepareMsgData(r.slice(2))));
                        break;
                    case "delete":
                        FastChat.deleteMsg(FastChat.prepareMsgData(r.slice(2)))
                }
            }), i.unread > 0 && (i.unread = 0, each(i.msgs, function() {
                !this[0] && this[1] && i.unread++
            })), i.auto && !i.unread && (i.box._close(!0), delete curFastChat.tabs[e]), void FastChat.updateUnreadTab(e)) : !1
        },
        tabNotify: function(e, t, i) {
            var a = curFastChat.tabs[e],
                r = void 0;
            if (e > 0 && 2e9 > e && isFunction(cur.onPeerStatusChanged) && cur.onPeerStatusChanged(e, t, i), !(0 >= e) && a && a.box && !a.box.minimized) {
                switch (clearTimeout(a.hideNotifyTO), t) {
                    case "online":
                        r = getLang("mail_im_user_became_online", 3 - a.sex), FastChat.blinkTab(e);
                        break;
                    case "offline":
                        r = getLang("mail_im_user_became_offline", 3 - a.sex), FastChat.blinkTab(e);
                        break;
                    case "unavail":
                        r = getLang("mail_im_not_online", 3 - a.sex).replace(/\.$/, "")
                }
                r = r.replace("{user}", a.fname), val(a.notify, '<div class="fc_tab_notify fc_tab_notify_' + t + '">' + r + "</div>");
                var n = a.notify.firstChild;
                clearTimeout(a.hideNotifyTO), a.hideNotifyTO = setTimeout(function() {
                    fadeOut(n, 200, function() {
                        val(a.notify, "")
                    })
                }, 5e3)
            }
        },
        hideChatCtrl: function() {
            removeClass(Chat.wrap, "chat_active"), removeEvent(document, "mousedown", FastChat.onDocClick)
        },
        showChatCtrl: function() {
            addClass(Chat.wrap, "chat_active"), setTimeout(function() {
                addEvent(document, "mousedown", FastChat.onDocClick)
            }, 0)
        },
        hideUI: function() {
            addClass(bodyNode, "chat_onl_hidden")
        },
        showUI: function() {
            removeClass(bodyNode, "chat_onl_hidden")
        },
        initUI: function() {
            if (curFastChat.options) {
                var e = curFastChat.el = {},
                    t = getWndInner();
                re("rb_box_fc_clist"), e.clistWrap = se(curFastChat.tpl.clist), e.clist = geByClass1("fc_contacts", e.clistWrap, "div"), e.clistTitle = geByClass1("fc_tab_title", e.clistWrap, "div"), e.clistOnline = geByClass1("fc_clist_online", e.clistWrap, "div");
                var i = curFastChat.options.state || !1,
                    a = !curFastChat.friendsCnt || (i && void 0 !== i.clist.min ? i.clist.min : t[1] < 1200 || curFastChat.friendsCnt < 5);
                curFastChat.clistW = 270, curFastChat.clistH = 299;
                var r = {
                    id: "fc_clist",
                    movable: geByClass1("fc_tab_head", e.clistWrap),
                    hider: geByClass1("fc_tab_close_wrap", e.clistWrap, "a"),
                    startHeight: curFastChat.clistH,
                    startWidth: curFastChat.clistW,
                    resizeableH: e.clist,
                    resize: !1,
                    minH: 150,
                    fixed: a,
                    onHide: function(t) {
                        val("fc_clist_filter", curFastChat.q = ""), addClass(curFastChat.clistBox.wrap, "fc_fixed"), curFastChat.clistBox.fixed = !0, FastChat.stateChange({
                            op: "clist_toggled",
                            val: 0
                        }), setStyle(curFastChat.clistBox.wrap, {
                            top: "auto",
                            bottom: 0,
                            right: 72,
                            left: "auto"
                        }), show(e.topLink), FastChat.hideChatCtrl()
                    },
                    onShow: function() {
                        FastChat.showChatCtrl()
                    },
                    onDragEnd: function(e, t) {
                        FastChat.stateChange({
                            op: "clist_moved",
                            y: e,
                            x: t
                        })
                    },
                    onResize: function(e, t) {
                        curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update(!1, !0)
                    }
                };
                i && !a && (i.clist.x !== !1 && (-1 == i.clist.x ? r.startRight = 0 : r.startLeft = t[1] * i.clist.x), i.clist.y !== !1 && (-1 == i.clist.y ? r.startBottom = 0 : r.startTop = t[0] * i.clist.y)), a && (r.noshow = !0), void 0 === r.startTop && void 0 === r.startBottom && (r.startTop = t[0] < 800 ? 0 : .1 * t[0]), void 0 === r.startLeft && void 0 === r.startRight && (r.startRight = 0), curFastChat.clistBox = new RBox(e.clistWrap, r), r.noshow || void 0 === r.startLeft && void 0 === r.startTop || curFastChat.clistBox._wnd_resize(t[0], t[1], !0), curFastChat.clistBoxScroll = new Scrollbar(e.clist, {
                    prefix: "fc_",
                    scrollChange: FastChat.clistShowMore,
                    nomargin: !0,
                    global: !0,
                    nokeys: !0,
                    right: vk.rtl ? "auto" : 1,
                    left: vk.rtl ? 1 : "auto"
                }), curFastChat.updateFriendsInt = setInterval(FastChat.clistUpdate, 18e4), curFastChat.updateTypingsInt = setInterval(FastChat.updateTypings, 5e3);
                var n = ge("fc_clist_filter");
                if (placeholderInit(n, {
                        global: !0
                    }), curFastChat.q = "", addEvent(n, "keyup " + (browser.opera ? "keypress" : "keydown"), function(e) {
                        if (e.keyCode == KEY.ESC) return FastChat.clistHide(), cancelEvent(e);
                        var t = FastChat.clistFilterKey(e);
                        return void 0 !== t ? t : (curFastChat.q = trim(val(this)), void FastChat.clistRender())
                    }), e.clistOnline) {
                    var o;
                    bodyNode.appendChild(o = ce("nobr", {
                        className: "fl_l",
                        innerHTML: getLang("mail_im_clist_onlines")
                    }, {
                        visibility: "hidden",
                        position: "absolute"
                    })), re(o), addEvent(e.clistOnline, "mouseover", function(t) {
                        showTooltip(this, {
                            text: getLang("mail_im_clist_onlines"),
                            forcetoup: 1,
                            shift: [12, 4, 3],
                            className: "tt_fc_onlines",
                            init: function() {
                                browser.msie && (e.clistOnline.tt.isFixed = !1)
                            },
                            black: 1
                        })
                    }), addEvent(e.clistOnline, "click", function(e) {
                        (e.originalEvent || e).cancelBubble = !0, FastChat.clistToggleOnlines(), FastChat.clistRender()
                    }), i && i.clist && i.clist.onlines && FastChat.clistToggleOnlines(!0)
                }
                a ? FastChat.clistUpdateTitle() : FastChat.clistRender(), curFastChat.ready = !0, i && i.tabs && each(i.tabs, function(e, i) {
                    e = intval(e);
                    var a = {
                        nofocus: 1
                    };
                    this.min && (a.minimized = !0), this.h && (a.startHeight = this.h * t[0]), this.w && (a.startWidth = this.w * t[1]), void 0 !== this.x && this.x <= 1 && (this.x < 0 ? a.startRight = 0 : a.startLeft = t[1] * this.x), void 0 !== this.y && this.y <= 1 && (this.y < 0 ? a.startBottom = 0 : a.startTop = t[0] * this.y), i.fx ? (a.fixedLoad = !0, FastChat.prepareTabIcon(e, a, !0)) : (a.noAnim = !0, FastChat.addPeer(e, !1, !1, a))
                }), addEvent(Chat.itemsCont, "mousemove mouseover", FastChat.itemsTT), addEvent(Chat.itemsCont, "mouseout", FastChat.itemsOut)
            }
        },
        itemsOffset: 12,
        itemsTT: function(e) {
            for (var t = e.target, i = !1; t && t != Chat.itemsCont;) {
                if (hasClass(t, "chat_tab_wrap")) {
                    i = t;
                    break
                }
                t = t.parentNode
            }
            if (!i) return clearTimeout(Chat.ttOutTimeout), Chat.ttOutTimeout = !1, !1;
            var a = i.id.split("_")[3],
                r = Chat.tabs[a];
            return r ? curFastChat.activeBox && curFastChat.activeBox.visible && curFastChat.activeBox.options.peer == a ? (FastChat.itemsOut(), !1) : (clearTimeout(Chat.ttOutTimeout), Chat.ttOutTimeout = !1, showTooltip(i, {
                text: r.name,
                slideX: 15,
                black: 1,
                asrtl: 1,
                appendEl: Chat.ttNode,
                className: "tt_black_side",
                shift: [-58, -37, 0]
            }), void(Chat.ttPeer = i)) : !1
        },
        itemsOut: function() {
            return Chat.ttOutTimeout ? !1 : void(Chat.ttOutTimeout = setTimeout(function() {
                return Chat.ttOutTimeout = !1, Chat.ttPeer ? (triggerEvent(Chat.ttPeer, "mouseout"), void(Chat.ttPeer = !1)) : !1
            }, 0))
        },
        stateChange: function(e) {
            ajax.post("al_im.php", extend({
                act: "a_state_fc",
                hash: curFastChat.options.state_hash || ""
            }, e), {
                onFail: function() {
                    return !0
                }
            }), FastChat.lcSend("stateChange", e)
        },
        onStateChanged: function(e) {
            var t = e.peer ? curFastChat.tabs[e.peer] : !1,
                i = e.peer ? t && t.box : curFastChat.clistBox,
                a = getWndInner();
            switch (e.op) {
                case "added":
                    if (t) {
                        delete t.auto;
                        break
                    }
                    e.fixed ? FastChat.prepareTabIcon(e.peer, {
                        fixedLoad: !0
                    }) : FastChat.addPeer(e.peer);
                    break;
                case "unfixed":
                    var r = {
                        startHeight: intval(a[0] * e.h),
                        startWidth: intval(a[1] * e.w)
                    }; - 1 == e.y ? r.startBottom = 0 : r.startTop = intval(a[0] * e.y), -1 == e.x ? r.startRight = 0 : r.startLeft = intval(a[1] * e.x), FastChat.addPeer(e.peer, !1, !1, r);
                    break;
                case "closed":
                    if (Chat.tabs[e.peer] && FastChat.closeTabIcon(e.peer), !t || !i) break;
                    i.close();
                    break;
                case "hidden":
                    if (!t || !i) break;
                    i.close();
                    break;
                case "minimized":
                    if (!t || !i) break;
                    e.val ? i.unminimize() : i.minimize();
                    break;
                case "moved":
                    setStyle(i.wrap, {
                        bottom: -1 == e.y ? 0 : "auto",
                        top: -1 != e.y ? intval(a[0] * e.y) : "auto",
                        right: -1 == e.x ? 0 : "auto",
                        left: -1 != e.x ? intval(a[1] * e.x) : "auto"
                    }), i.toBottom = -1 == e.y, i.toRight = -1 == e.x;
                    break;
                case "resized":
                    setStyle(i.wrap, {
                        bottom: -1 == e.y ? 0 : "auto",
                        top: -1 != e.y ? intval(a[0] * e.y) : "auto",
                        right: -1 == e.x ? 0 : "auto",
                        left: -1 != e.x ? intval(a[1] * e.x) : "auto"
                    }), i.toBottom = -1 == e.y, i.toRight = -1 == e.x;
                    var n = intval(a[1] * e.w);
                    setStyle(i.resizeableH, "height", intval(a[0] * e.h)), setStyle(i.resizeableW, "width", n), FastChat.fixResized(t, n);
                    break;
                case "clist_toggled":
                    e.val ? i.show(0, !0) : i.hide(0, !0), toggle(curFastChat.el.topLink, !e.val);
                    break;
                case "clist_moved":
                    setStyle(i.wrap, {
                        bottom: -1 == e.y ? 0 : "auto",
                        top: -1 != e.y ? intval(a[0] * e.y) : "auto",
                        right: -1 == e.x ? 0 : "auto",
                        left: -1 != e.x ? intval(a[1] * e.x) : "auto"
                    }), i.toBottom = -1 == e.y, i.toRight = -1 == e.x;
                    break;
                case "onlines_toggled":
                    FastChat.clistToggleOnlines(e.val), FastChat.clistRender()
            }
        },
        onUnidle: function() {
            curNotifier.version && curFastChat.clistBox && (curFastChat.clistBox.visible && (curFastChat.el.clist.scrollTop < 100 || curRBox.active != curFastChat.clistBox.id) ? FastChat.clistRender() : FastChat.clistUpdateTitle(), each(curFastChat.tabs, function(e) {
                FastChat.restoreDraft(e)
            }))
        },
        clistUpdate: function() {
            var e = vkNow();
            if (curNotifier.is_server && !(curFastChat.clistUpdatedTs && e - curFastChat.clistUpdatedTs < 6e4)) {
                curFastChat.clistUpdatedTs = e;
                var t, i = [];
                for (t in curFastChat.tabs) i.push(t);
                for (t in Chat.tabs) i.push(t);
                ajax.post("al_im.php", {
                    act: "a_onlines",
                    peer: i.join(",")
                }, {
                    onDone: function(e) {
                        FastChat.clistGotOnlines(e), FastChat.lcSend("clistOnlines", e)
                    }
                })
            }
        },
        clistGotOnlines: function(e) {
            var t = curFastChat.onlines,
                i = [];
            curFastChat.onlines = e, curNotifier.idle_manager && curNotifier.idle_manager.is_idle || !curFastChat.tabs && Chat.tabs || (each(curFastChat.tabs, function(a) {
                curFastChat.onlines[a] != t[a] && (FastChat.tabNotify(a, e[a] ? "online" : "offline", e[a]), e[a] || (i[a] = 1))
            }), each(Chat.tabs, function(i) {
                if (curFastChat.onlines[i] != t[i]) {
                    var a = geByClass1("_chat_tab_image", ge("chat_tab_icon_" + i));
                    toggleClass(a, "online", e[i]), toggleClass(a, "mobile", e[i] && mobPlatforms[e[i]])
                }
            }), i = arrayKeyDiff(t, e, i), each(i, function(e) {
                FastChat.tabNotify(e, "offline")
            }), FastChat.clistRender())
        },
        clistShow: function() {
            var e = hasClass(Chat.wrap, "chat_active");
            FastChat.clistRender(), curFastChat.clistBox.visible ? curFastChat.clistBox.focus() : (curFastChat.activeBox && curFastChat.activeBox != curFastChat.clistBox && curFastChat.activeBox.hide(), curFastChat.clistBox.show(), FastChat.setActive(curFastChat.clistBox), curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update(!1, !0), curFastChat.el.topLink && hide(curFastChat.el.topLink)), elfocus("fc_clist_filter"), FastChat.movePointer(!1, e)
        },
        clistHide: function() {
            curFastChat.clistBox.hide(), curFastChat.activeBox == curFastChat.clistBox && FastChat.setActive(!1)
        },
        clistRender: function(e) {
            var t = [],
                i = !e,
                a = 1 + (e ? 40 : 20),
                r = curFastChat.q,
                n = !1,
                o = !1,
                s = !1;
            if (r ? (s = [], each(FastChat.clistCache(r), function() {
                    s.push(escapeRE(this))
                }), s = new RegExp("([ -]|^|s|&nbsp;|\b)(" + s.join("|") + ")", "gi"), n = curFastChat.clistCache[r] || {}) : curFastChat.clOnlines && (n = curFastChat.onlines), curFastChat.clHasMore = !1, each(curFastChat.friends, function(e) {
                    var r = intval(e),
                        c = !n || n[r];
                    if (!i) return void(r == curFastChat.clOffset && (i = !0));
                    if (c) {
                        if (!--a) return curFastChat.clHasMore = !0, !1;
                        t.push(FastChat.clistWrapPeer(r, this, s)), o = r
                    }
                }), o !== !1 || e || r ? r && !curFastChat.clHasMore && t.push(FastChat.getCorrespondents(r, s, o === !1)) : t.push('<div class="fc_clist_empty">' + getLang(r ? "mail_im_clist_notfound" : "mail_im_clist_empty") + "</div>"), curFastChat.clOffset = o, e) {
                for (var c = ce("div", {
                        innerHTML: t.join("")
                    }), u = document.createDocumentFragment(); c.firstChild;) u.appendChild(c.firstChild);
                curFastChat.el.clist.appendChild(u), curFastChat.clHasMore || FastChat.clistUpdateTitle(!0)
            } else val(curFastChat.el.clist, t.join("")), FastChat.clistUpdateTitle(!0), (browser.chrome || browser.safari) && setTimeout(function() {
                setStyle(curFastChat.el.clist.firstChild, {
                    width: curFastChat.el.clist.firstChild.clientWidth
                }), setTimeout(function() {
                    setStyle(curFastChat.el.clist.firstChild, {
                        width: ""
                    })
                }, 0)
            }, 0);
            if (curFastChat.clSel) {
                var l = ge("fc_contact" + curFastChat.clSel);
                l ? FastChat.clistPeerOver(l, 1) : curFastChat.clSel = !1
            } else {
                var l = geByClass1("fc_contact", curFastChat.el.clist);
                FastChat.clistPeerOver(l, 1)
            }
            curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update()
        },
        clistWrapPeer: function(e, t, i) {
            var a, r, n = curFastChat.tabs[e] ? curFastChat.tabs[e].unread : 0,
                o = curFastChat.onlines[e],
                s = onlinePlatformClass(o),
                c = (t[0] || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
            if (i && (c = c.replace(i, '$1<em class="fc_clist_hl">$2</em>')), e > 0 && 2e9 > e ? (a = "/id" + e, r = 'onmousemove="FastChat.clistPeerOver(this.parentNode, 2);"  onmouseout="FastChat.clistPeerOver(this.parentNode, 1);"') : (a = "/im?sel=" + e, r = ""), e > 2e9 && t[3]) var u = t[3];
            else var u = '<img src="' + Notifier.fixPhoto(t[1]) + '" class="fc_contact_photo"/>';
            return '<a href="' + a + '" class="fc_contact clear_fix" id="fc_contact' + e + '" onclick="return FastChat.selectPeer(' + e + ', event);" onmousedown="event.cancelBubble = true;" onmouseover="FastChat.clistPeerOver(this, 1, event);"  onmouseout="FastChat.clistPeerOver(this, 0, event);"><span class="fc_contact_photo' + s + '" ' + r + ">" + u + '</span><span class="fc_contact_status"></span><span class="fc_contact_name">' + c + '<span id="fc_contact_unread' + e + '" class="fc_contact_unread">' + (n ? " <b>+" + n + "</b>" : "") + "</span></span></a>"
        },
        clistPeerOver: function(e, t, i) {
            if (e && checkOver(i, e)) {
                var a = e.id.substr(10);
                curFastChat.clSel && t && curFastChat.clSel != a && FastChat.clistPeerOver(ge("fc_contact" + curFastChat.clSel), 0), toggleClass(e, "fc_contact_over", t), t ? curFastChat.clSel = a : curFastChat.clSel == a && (curFastChat.clSel = !1)
            }
        },
        authorOver: function(e, t) {
            var i = e.getAttribute("data-title"),
                a = gpeByClass("fc_tab_log", e),
                r = !1,
                n = e.getBoundingClientRect().top,
                o = a.getBoundingClientRect().top;
            if (10 > n - o && (r = !0), i) {
                var s = e.getAttribute("data-date");
                s && (i += "<br>" + s), showTooltip(e, {
                    text: '<div class="fc_author_tt">' + i + "</div>",
                    black: 1,
                    center: 1,
                    forcetodown: r,
                    shift: [1, 8, 0]
                })
            }
        },
        getCorrespondents: function(e, t, i) {
            return clearTimeout(curFastChat.correspondentsTO), curFastChat.correspondents && void 0 !== curFastChat.correspondents[e] ? FastChat.wrapCorrespondents(curFastChat.correspondents[e]) || i && '<div class="fc_clist_empty">' + getLang("mail_im_clist_notfound") + "</div>" || "" : (curFastChat.correspondentsTO = setTimeout(FastChat.loadCorrespondents.pbind(e, t), 100), '<div id="fc_correspondents"></div>')
        },
        loadCorrespondents: function(e, t) {
            e == curFastChat.q && ajax.post("hints.php", {
                act: "a_json_friends",
                str: e,
                from: "fc",
                allow_multi: 1
            }, {
                onDone: function(i) {
                    curFastChat.correspondents || (curFastChat.correspondents = {});
                    var a, r = {};
                    if (each(i, function() {
                            a = this[3] + "_", curFastChat.friends[a] || (r[a] = [this[1], this[2], this[3], this[4] || ""])
                        }), curFastChat.correspondents[e] = r, e == curFastChat.q) {
                        var n = ge("fc_correspondents");
                        if (n) {
                            var o = n.parentNode,
                                s = ce("div", {
                                    innerHTML: FastChat.wrapCorrespondents(r, t)
                                }),
                                c = document.createDocumentFragment();
                            if (s.firstChild)
                                for (; s.firstChild;) c.appendChild(s.firstChild);
                            else o.firstChild == n && c.appendChild(ce("div", {
                                className: "fc_clist_empty",
                                innerHTML: getLang("mail_im_clist_notfound")
                            }));
                            o.replaceChild(c, n), FastChat.clistUpdateTitle(!0), curFastChat.clistBoxScroll && curFastChat.clistBoxScroll.update()
                        }
                    }
                }
            })
        },
        wrapCorrespondents: function(e, t) {
            var i = [];
            return each(e, function(e) {
                i.push(FastChat.clistWrapPeer(intval(e), this, t))
            }), i.join("")
        },
        updateFriends: function(e) {
            if (window.Chat && Chat.inited) {
                var t = Chat.onl;
                t && (e > 0 ? (val(t, e), show(Chat.wrap)) : hide(Chat.wrap))
            }
        },
        onDocClick: function(e) {
            if (curFastChat.activeBox) {
                var t = e.target;
                if (curBox()) return !0;
                for (; t;) {
                    if ("fc_tab_wrap" == t.className || "chat_onl_wrap" == t.id || "custom_menu_cont" == t.id || "layer_wrap" == t.id || "box_layer_wrap" == t.id || "wk_layer_wrap" == t.id) return !0;
                    t = t.parentNode
                }
                var i = curFastChat.tabs[curFastChat.activeBox.options.peer];
                return i && (trim(Emoji.editableVal(i.txt)) || i.imMedia && i.imMedia.getMedias().length) ? !0 : void curFastChat.activeBox.hide()
            }
        },
        clistCache: function(e) {
            if (e) {
                var t, i, a, r, n, o, s, c, u, l = [e];
                if ((i = parseLatin(e)) && l.push(i), (i = parseLatKeys(e)) && l.push(i), (i = parseCyr(e)) && l.push(i), void 0 !== curFastChat.clistCache[e]) return l;
                u = curFastChat.clistCache[e] = {};
                for (a in l)
                    if (t = l[a], n = curFastChat.clistCache[" " + t.charAt(0).toLowerCase()]) {
                        s = new RegExp("(^|\\s|\\()" + escapeRE(t), "gi");
                        for (r in n) c = curFastChat.friends[r + "_"], isArray(c) && null !== c[0].match(s) && (u[r] = 1)
                    }
                r = 0;
                for (a in u) r++;
                return u._num = r, l
            }
            var o, d, f;
            curFastChat.clistCache = {};
            for (a in curFastChat.friends)
                for (o = curFastChat.friends[a][0], a = intval(a), d = 0; f = " " + o.charAt(d).toLowerCase(), curFastChat.clistCache[f] || (curFastChat.clistCache[f] = {}), curFastChat.clistCache[f][a] = 1, d = o.indexOf(" ", d + 1), -1 != d;) ++d
        },
        clistShowMore: function() {
            if (curFastChat.clHasMore) {
                var e = curFastChat.el.clist,
                    t = e.scrollTop,
                    i = e.clientHeight,
                    a = e.scrollHeight;
                t + 3 * i > a && FastChat.clistRender(!0);
            }
        },
        clistUpdateTitle: function(e) {
            var t, i = 0,
                a = 0;
            for (t in curFastChat.friends) curFastChat.onlines[intval(t)] ? (a++, i++) : curFastChat.clOnlines || i++;
            var r = window.newVal = (a ? getLang("mail_im_X_onlines_title", a) : getLang("mail_im_onlines_title")).toString();
            FastChat.updateFriends(a), val(curFastChat.el.clistTitle, r), val(curFastChat.el.topLink, r.toLowerCase()), curFastChat.clistBoxScroll && (!curFastChat.clHasMore && e ? i = curFastChat.el.clist.childNodes.length : curFastChat.q && (i = intval((curFastChat.clistCache[curFastChat.q] || {})._num)), curFastChat.clistBoxScroll.options.contHeight = 50 * i)
        },
        clistToggleOnlines: function(e) {
            void 0 === e && (e = !curFastChat.clOnlines, FastChat.stateChange({
                op: "onlines_toggled",
                val: e ? 1 : 0
            })), toggleClass(curFastChat.el.clistOnline, "fc_clist_online_active", e), curFastChat.clOnlines = e
        },
        clistFilterKey: function(e) {
            var t;
            switch (e.keyCode) {
                case KEY.DOWN:
                case KEY.UP:
                    if ("keyup" != e.type) {
                        if (t = curFastChat.clSel && ge("fc_contact" + curFastChat.clSel)) {
                            var i = e.keyCode == KEY.DOWN ? "nextSibling" : "previousSibling",
                                a = t;
                            do a = a[i]; while (a && (1 != a.nodeType || !hasClass(a, "fc_contact")))
                        } else curFastChat.clSel || e.keyCode != KEY.DOWN || (a = geByClass1("fc_contact", curFastChat.el.clist, "a"));
                        if (a && a != t) {
                            FastChat.clistPeerOver(a, 1);
                            var r = curFastChat.el.clist;
                            a.offsetTop + 16 > r.clientHeight + r.scrollTop ? (r.scrollTop = a.offsetTop + 16 - r.clientHeight, curFastChat.clistBoxScroll.update()) : a.offsetTop - 36 < r.scrollTop && (r.scrollTop = a.offsetTop - 36, curFastChat.clistBoxScroll.update())
                        }
                    }
                    break;
                case KEY.LEFT:
                case KEY.RIGHT:
                    return !0;
                case KEY.ENTER:
                    if ("keyup" == e.type || !(t = curFastChat.clSel && ge("fc_contact" + curFastChat.clSel))) break;
                    e.ctrlKey || e.metaKey && browser.mac ? nav.go(t.href.match(/\b(vkontakte\.ru|vk\.com)(\/[^\/]+?)$/)[2]) : FastChat.selectPeer(curFastChat.clSel);
                case KEY.ESC:
                    if ("keyup" != e.type) {
                        var n = ge("fc_clist_filter"),
                            o = val(n) || curFastChat.clSel;
                        n.blur(), val(n, curFastChat.q = ""), curFastChat.clSel = !1, o && FastChat.clistRender()
                    }
                    break;
                default:
                    return
            }
            return cancelEvent(e)
        },
        changePeerCounter: function(e, t, i) {
            if (!Chat.tabs[e]) return !1;
            var a = ge("chat_tab_icon_" + e),
                r = geByClass1("chat_tab_counter", a);
            r || (r = ce("div", {
                className: "chat_tab_counter"
            }), a.appendChild(r)), void 0 === i ? Chat.counters[e] = positive((Chat.counters[e] || 0) + t) : Chat.counters[e] = i, Chat.counters[e] ? r.innerHTML = Chat.counters[e] : re(r)
        },
        prepareTabIcon: function(e, t, i) {
            var a = curFastChat.friends && curFastChat.friends[e + "_"];
            if (a) {
                var r = {
                    name: a[0],
                    photo: a[1],
                    online: curFastChat.onlines[e]
                };
                FastChat.addTabIcon(e, r, i)
            } else {
                var n = 3;
                curFastChat.needPeers[e] = [n, !1, setTimeout(FastChat.getPeers, irand(150, 200)), t], FastChat.lcSend("needPeer", {
                    id: e,
                    mask: n
                })
            }
        },
        addTabIcon: function(e, t, i) {
            if (Chat.itemsCont && !Chat.tabs[e]) {
                if (e > 2e9) var a = t.data.members_grid_fc || "";
                else var a = '<img class="chat_tab_img" src="' + t.photo + '"/>';
                if (e > 2e9) var r = "im?sel=c" + (e - 2e9);
                else var r = t.alink || "/id" + e;
                var n = onlinePlatformClass(t.online),
                    o = se('<a class="chat_tab_wrap' + (i ? "" : " chat_tab_beforeanim") + '" id="chat_tab_icon_' + e + '" href="' + r + '" onclick="FastChat.itemsOut();return FastChat.togglePeer(' + e + ', event);"><div class="chat_tab_imgcont _chat_tab_image' + n + '"><div class="chat_tab_close" onclick="return FastChat.closeTabIcon(' + e + ', event)"></div>' + a + '</div><div class="chat_tab_typing_wrap"><div class="chats_sp chat_tab_typing_icon"></div></div></a>');
                Chat.itemsCont.insertBefore(o, Chat.itemsCont.firstChild), Chat.tabs[e] = {
                    el: o,
                    name: t.name
                }, addClass(Chat.wrap, "chat_expand"), i || removeClass(o, "chat_tab_beforeanim"), FastChat.checkChatHeight(), Chat.scrollNode.scrollTop = 0
            }
        },
        checkChatHeight: function() {
            function e() {
                addEvent(Chat.scrollNode, browserFeatures.wheelEvent, FastChat.scrollWrap)
            }

            function t() {
                removeEvent(Chat.scrollNode, browserFeatures.wheelEvent, FastChat.scrollWrap)
            }
            var i = getSize(Chat.itemsCont)[1];
            Chat.lastHeight = i, i > Chat.maxHeight ? (Chat.fixH || (Chat.fixH = !0, addClass(Chat.scrollNode, "chat_fix_height"), setStyle(Chat.scrollNode, {
                height: Chat.maxHeight
            }), addEvent(Chat.scrollNode, "mouseenter", e), addEvent(Chat.scrollNode, "mouseleave", t), FastChat.checkShadow()), Chat.scrollNode.scrollTop = i - Chat.maxHeight) : Chat.fixH && (Chat.fixH = !1, removeClass(Chat.scrollNode, "chat_fix_height"), setStyle(Chat.scrollNode, {
                height: "auto"
            }), removeEvent(Chat.scrollNode, browserFeatures.wheelEvent, FastChat.scrollWrap), removeEvent(Chat.scrollNode, "mouseenter", e), removeEvent(Chat.scrollNode, "mouseleave", t), FastChat.checkShadow())
        },
        checkShadow: function() {
            var e = intval(Chat.scrollNode.scrollTop);
            e && Chat.fixH ? Chat.shadowTop || (addClass(Chat.wrap, "chat_scroll_top"), fadeIn(geByClass1("chat_cont_sh_top", Chat.wrap), 200), Chat.shadowTop = !0) : Chat.shadowTop && (fadeOut(geByClass1("chat_cont_sh_top", Chat.wrap), 200), Chat.shadowTop = !1), Chat.lastHeight - e > Chat.maxHeight && Chat.fixH ? Chat.shadowBottom || (fadeIn(geByClass1("chat_cont_sh_bottom", Chat.wrap), 200), Chat.shadowBottom = !0) : Chat.shadowBottom && (fadeOut(geByClass1("chat_cont_sh_bottom", Chat.wrap), 200), Chat.shadowBottom = !1)
        },
        scrollWrap: function(e) {
            e || (e = window.event);
            var t = 0;
            return e.wheelDeltaY || e.wheelDelta ? t = (e.wheelDeltaY || e.wheelDelta) / 2 : e.detail && (t = 10 * -e.detail), Chat.scrollNode.scrollTop -= t, curFastChat.activeBox == curFastChat.clistBox ? (curFastChat.pointerMargin = 0, FastChat.setPointer(!1, curFastChat.pointerMargin, curFastChat.prevPointer)) : (curFastChat.pointerMargin = -Chat.scrollNode.scrollTop, FastChat.setPointer(!0, curFastChat.pointerMargin, curFastChat.prevPointer)), FastChat.checkShadow(), setStyle(Chat.ttNode, {
                top: -Chat.scrollNode.scrollTop
            }), cancelEvent(e)
        },
        togglePeer: function(e, t) {
            return curFastChat.activeBox && curFastChat.activeBox.options.peer == e ? (curFastChat.activeBox.hide(), FastChat.setActive(!1), !1) : FastChat.selectPeer(e, t)
        },
        selectPeer: function(e, t, i) {
            if (checkEvent(t)) return !0;
            var a = hasClass(Chat.wrap, "chat_active");
            if (curFastChat.tabs && curFastChat.tabs[e]) {
                var r = curFastChat.tabs[e].box;
                r.minimized && r.unminimize(!0), FastChat.activateTab(e), FastChat.movePointer(e, a)
            } else i || (i = {}), i.fixed = !0, i.onPeerAdded = function() {
                FastChat.movePointer(e, a)
            }, i.onHistoryLoaded = FastChat.readLastMsgs.pbind(e), FastChat.addPeer(e, !1, !0, i);
            return curFastChat.tabs[e] && curFastChat.tabs[e].iman && curFastChat.tabs[e].iman.unidle(), !1
        },
        closeTabIcon: function(e, t, i) {
            curFastChat.activeBox && curFastChat.activeBox.options.peer == e && !i && (curFastChat.activeBox.hide(), FastChat.setActive(!1));
            var a = ge("chat_tab_icon_" + e);
            addClass(a, "chat_tab_hiding"), delete Chat.tabs[e], curFastChat.tabs[e] && curFastChat.tabs[e].box.options.fixed && (curFastChat.tabs[e].iman.stop(), delete curFastChat.tabs[e]);
            var r = function() {
                re(a), a && (a = !1, curFastChat.activeBox && FastChat.movePointer(curFastChat.activeBox.options.peer, !0));
                var e = Chat.scrollNode.scrollTop;
                FastChat.checkChatHeight(), Chat.scrollNode.scrollTop = e
            };
            animate(a, {
                height: 0,
                opacity: 0
            }, {
                duration: 100,
                onComplete: r
            }), i || FastChat.stateChange({
                op: "closed",
                peer: e
            });
            var n = Object.keys(Chat.tabs).length;
            return n || removeClass(Chat.wrap, "chat_expand"), FastChat.itemsOut(), cancelEvent(t)
        },
        getPointerShift: function(e, t, i) {
            var a = i - t,
                r = Chat.maxHeight + 32;
            return e && 62 > a ? a - 62 : e && a > r ? a - r : 0
        },
        setPointer: function(e, t, i) {
            if (!curFastChat.activeBox) return !1;
            var a = FastChat.getPointerShift(e, t, i),
                r = geByClass1("fc_tab_pointer", curFastChat.activeBox.wrap);
            return setStyle(r, {
                marginTop: t + a
            }), a
        },
        movePointer: function(e, t) {
            if (!curFastChat.activeBox) return !1;
            var i = geByClass1("fc_pointer_offset", curFastChat.activeBox.wrap);
            if (e) {
                var a = ge("chat_tab_icon_" + e);
                if (!a) return !1;
                if (!Chat.fixH && a.nextSibling) var r = getXY(a.nextSibling)[1] - 50;
                else if (a.nextSibling || Chat.fixH) var r = getXY(a)[1] + Chat.scrollNode.scrollTop;
                else var r = getXY(ge("chat_tab_wrap"))[1] - 50;
                var n = 23 + getXY(Chat.cont)[1] - r,
                    o = -Chat.scrollNode.scrollTop
            } else var n = 28,
                o = 0;
            var s = FastChat.setPointer(e, o, n);
            if (t) {
                if (curFastChat.prevPointer) {
                    var c = FastChat.getPointerShift(!0, o + s, curFastChat.prevPointer);
                    setStyle(i, {
                        bottom: curFastChat.prevPointer - c + s
                    })
                }
                animate(i, {
                    bottom: n
                }, {
                    duration: 100
                })
            } else setStyle(i, {
                bottom: n
            });
            curFastChat.prevPointer = n
        },
        setActive: function(e) {
            curFastChat.activeBox = e, e && FastChat.moveBoxesLeft(e.pos[1])
        },
        moveBoxesLeft: function(e, t) {
            var e = e - 8,
                i = !1,
                a = 0;
            for (var r in curFastChat.tabs) {
                var n = curFastChat.tabs[r];
                if (t || (n.box.movedLeft = !1), n && !n.box.options.fixed && n.box.toBottom && !n.box.movedLeft && !n.box.noMove) {
                    var o = n.box.pos;
                    o[1] + o[3] >= e && o[1] > a && (i = n, a = o[1])
                }
            }
            if (i) {
                var s = e - i.box.pos[3],
                    c = i.box.pos[0];
                0 > s && (s = 0), i.box.movedLeft = !0, animate(i.box.wrap, {
                    left: s
                }, 200), i.box.pos = [c, s, i.box.pos[2], i.box.pos[3]];
                var u = getWndInner();
                FastChat.stateChange({
                    op: "moved",
                    peer: i.box.options.peer,
                    y: c / u[0],
                    x: s / u[1]
                }), s && FastChat.moveBoxesLeft(s, !0)
            } else FastChat.moveLeftY = 0
        },
        moveBoxAway: function(e, t) {
            for (var i = t - e.pos[3] - 20, a = e.pos[3], r = e.pos[0], n = !1; i > 0 && !n;) {
                n = !0;
                for (var o in curFastChat.tabs) {
                    var s = curFastChat.tabs[o].box.pos;
                    s[0] + s[2] / 2 > r && s[1] + s[3] > i && s[1] < i + a && (i -= s[3], n = !1)
                }
            }
            0 > i && (i = positive(Math.random() * t)), animate(e.wrap, {
                left: i
            }, 300);
            var c = getWndInner();
            FastChat.stateChange({
                op: "moved",
                peer: e.options.peer,
                y: r / c[0],
                x: i / c[1]
            })
        },
        pinTab: function(e, t, i) {
            if (-1 == e) var a = curFastChat.clistBox;
            else var a = curFastChat.tabs[e].box;
            a.options.fixed = !1, removeClass(a.wrap, "fc_fixed"), FastChat.hideChatCtrl(), FastChat.setActive(!1);
            var r = a.wrap.offsetTop,
                n = a.wrap.offsetLeft - 10;
            setStyle(a.wrap, {
                left: a.wrap.offsetLeft,
                top: a.wrap.offsetTop,
                right: "auto",
                bottom: "auto"
            }), i || animate(a.wrap, {
                left: n,
                top: r
            }, 300), a.pos = [r, n, a.pos[2], a.pos[3]], a.toRight = !1, a.toBottom = !0, addClass(a.wrap, "fc_tobottom");
            var o = a.resizeableW.clientWidth - intval(getStyle(a.resizeableW, "paddingRight")) - intval(getStyle(a.resizeableW, "paddingLeft")),
                s = a.resizeableH.clientHeight - intval(getStyle(a.resizeableH, "paddingBottom")) - intval(getStyle(a.resizeableH, "paddingTop")),
                c = getWndInner(); - 1 == e ? FastChat.stateChange({
                op: "clist_toggled",
                val: 1,
                y: a.toBottom ? -1 : a.pos[0] / c[0],
                x: a.toRight ? -1 : a.pos[1] / c[1]
            }) : FastChat.stateChange({
                op: "unfixed",
                peer: e,
                y: a.toBottom ? -1 : a.pos[0] / c[0],
                x: a.toRight ? -1 : a.pos[1] / c[1],
                h: s / c[0],
                w: o / c[1]
            }), a.noMove = !0, FastChat.moveBoxesLeft(n), a.noMove = !1
        },
        addPeer: function(e, t, i, a) {
            a || (a = {});
            var r = curFastChat.friends && curFastChat.friends[e + "_"],
                n = 0;
            if (i ? FastChat.stateChange({
                    op: "added",
                    peer: e,
                    fixed: a.fixed
                }) : curNotifier.idle_manager && !curNotifier.idle_manager.is_idle && t && (i = !0), r) {
                var o = {
                    name: r[0],
                    photo: r[1],
                    fname: r[2],
                    hash: r[3],
                    online: curFastChat.onlines[e],
                    sex: r[4]
                };
                FastChat.addTabIcon(e, o, a.noAnim), FastChat.addBox(e, o, a), t ? (curFastChat.tabs[e].auto = 1, FastChat.imFeed(e, t)) : (a && a.nofocus || FastChat.activateTab(e), curFastChat.onlines[e] || FastChat.tabNotify(e, "unavail"), n |= 2)
            } else n = 3;
            n && (i ? (curFastChat.needPeers[e] = [n, t, !1, a], FastChat.getPeers()) : (curFastChat.needPeers[e] = [n, t, setTimeout(FastChat.getPeers, irand(150, 200)), a], FastChat.lcSend("needPeer", {
                id: e,
                mask: n
            })))
        },
        getPeers: function() {
            var e = [],
                t = {};
            each(curFastChat.needPeers, function(i) {
                e.push(i), e.push(this[0]), clearTimeout(this[2]), t[i] = this[0]
            }), e.length && (FastChat.lcSend("fetchingPeers", t), ajax.post("al_im.php", {
                act: "a_get_fc_peers",
                peers: e.join(",")
            }, {
                onDone: function(e) {
                    FastChat.gotPeers(e), FastChat.lcSend("gotPeers", e)
                }
            }))
        },
        gotPeers: function(e) {
            a() || each(curFastChat.needPeers, function(t) {
                if (e[t]) {
                    e[t] < 2e9 && (curFastChat.friends[t + "_"] = [e[t].name, e[t].photo, e[t].fname, e[t].hash, intval(e[t].sex)]);
                    var i = this[1],
                        a = this[3];
                    2 & this[0] && void 0 === e[t].history || (clearTimeout(this[2]), delete curFastChat.needPeers[t]), curFastChat.tabs[t] ? FastChat.gotHistory(t, e[t].history) : a.fixedLoad ? FastChat.addTabIcon(t, e[t]) : (FastChat.addTabIcon(t, e[t]), FastChat.addBox(t, e[t], a), i ? (curFastChat.tabs[t].auto = 1, FastChat.imFeed(t, i)) : (2 & this[0] && FastChat.gotHistory(t, e[t].history), a && a.nofocus || FastChat.activateTab(t))), a.onHistoryLoaded && a.onHistoryLoaded()
                }
            })
        },
        gotHistory: function(e, t) {
            if (isArray(t) && t.length && t[0]) {
                var i = curFastChat.tabs[e],
                    a = t[0],
                    r = t[1];
                i.offset = t[2], extend(i.msgs, r), each(r, function(e, t) {
                    !t[0] && t[1] && i.unread++
                }), val(i.log, a), i.logWrap.scrollTop = i.logWrap.scrollHeight, setTimeout(function() {
                    i.logWrap.scrollTop = i.logWrap.scrollHeight, i.scroll && i.scroll.update(!1, !0)
                }, 10)
            }
        },
        decHashCb: function(e) {
            ! function(e) {
                curFastChat.decodedHashes[e] = function(e) {
                    for (var t = ge ? "" : "___", i = 0; i < e.length; ++i) t += e.charAt(e.length - i - 1);
                    return geByClass ? t : "___"
                }(e.substr(e.length - 5) + e.substr(4, e.length - 12))
            }(e)
        },
        decodehash: function(e) {
            return curFastChat.decodedHashes || (curFastChat.decodedHashes = {}), curFastChat.decodedHashes[e] || FastChat.decHashCb(e), curFastChat.decodedHashes[e]
        },
        onMyTyping: function(e) {
            e = intval(e);
            var t = curFastChat.tabs[e];
            if (!(-2e9 >= e) && t) {
                var i = vkNow();
                curFastChat.myTypingEvents[e] && i - curFastChat.myTypingEvents[e] < 5e3 || (curFastChat.myTypingEvents[e] = i, ajax.post("al_im.php", {
                    act: "a_typing",
                    peer: e,
                    hash: t.sendhash,
                    from: "fc"
                }))
            }
        },
        updateTypings: function() {
            each(curFastChat.tabs || {}, function(e, t) {
                FastChat.updateTyping(e)
            })
        },
        updateTyping: function(e, t) {
            var i, a = curFastChat.tabs[e],
                r = [],
                n = curFastChat.typingEvents[e],
                o = vkNow(),
                s = ge("fc_tab_typing" + e),
                c = geByClass1("_fc_tab_typing_progress", s),
                u = geByClass1("_fc_tab_typing_name", s);
            if (2e9 > e) n && 6e3 > o - n && (r.push(a.fname || a.name || ""), i = a.sex);
            else {
                var l = a.data.members;
                each(n || {}, function(e, t) {
                    t && 6e3 > o - t && l[e] && l[e].first_name && (r.push(l[e].first_name || ""), i = l[e].sex)
                })
            }
            if (!r.length) return hide(c), t ? setStyle(s, "opacity", 0) : fadeTo(s, 1e3, 0);
            if (1 == r.length) val(u, langSex(i, lang.mail_im_typing).replace("{user}", r[0]));
            else {
                var d = r.pop();
                val(u, getLang("mail_im_multi_typing").replace("{users}", r.join(", ")).replace("{last_user}", d))
            }
            return show(c), t ? setStyle(s, "opacity", 1) : fadeTo(s, 200, 1)
        },
        readLastMsgs: function(e) {
            var t = curFastChat.tabs[e];
            if (e && t) {
                if (!t.markingRead && t.unread) {
                    var i = [];
                    for (var a in t.msgs) !t.msgs[a][0] && t.msgs[a][1] && i.push(a);
                    FastChat.markRead(e, i)
                }
                FastChat.changePeerCounter(e, 0, 0)
            }
        },
        markRead: function(e, t) {
            if (t.length) {
                var i = curFastChat.tabs[e];
                i.markingRead = !0, ajax.post("al_im.php", {
                    act: "a_mark_read",
                    peer: e,
                    ids: t,
                    hash: i.sendhash,
                    from: "fc"
                }, {
                    onDone: function(a) {
                        i.markingRead = !1;
                        for (var r in t) {
                            var n = t[r],
                                o = ge("fc_msg" + n),
                                s = o && o.parentNode;
                            o && (i.msgs[n] && i.msgs[n][1] && (i.msgs[n][1] = 0, i.msgs[n][0] || i.unread--), removeClass(o, "fc_msg_unread"), hasClass(s.parentNode, "fc_msgs_unread") && each(s.childNodes, function() {
                                return hasClass(this, "fc_msg_unread") ? void 0 : (removeClass(s.parentNode, "fc_msgs_unread"), !1)
                            }))
                        }
                        i.unread > 0 && (i.unread = 0, each(i.msgs, function() {
                            !this[0] && this[1] && i.unread++
                        })), FastChat.updateUnreadTab(e)
                    },
                    onFail: function() {
                        i.markingRead = !1
                    }
                })
            }
        },
        mkMsg: function(e) {
            var t = clean(e).replace(/\n/g, "<br>"),
                i = !1;
            return t = (0, o.replaceHyperLinks)(t || "", o.linksReplacer.bind(null, i)), t = (0, o.replaceMentions)(t), t = (0, o.replaceEmailLinks)(t), t = Emoji.emojiToHTML(t, 1)
        },
        getEditCont: function(e) {
            return stManager.add(["emoji.js"]), '<div class="emoji_cont _emoji_field_wrap">' + Emoji.tplSmile(getLang("mail_emoji_hint")) + '<div class="fc_editable dark" tabindex="0" contenteditable="true" placeholder="' + getLang("mail_chat_placeholder") + '"></div></div>'
        },
        getVal: function(e) {
            return Emoji ? Emoji.editableVal(e) : ""
        },
        onTxtResize: function(e) {
            var t = curFastChat.tabs[e],
                i = geByClass1("fc_tab_txt", t.wrap),
                a = getSize(i)[1];
            if (a > 40) {
                var r = positive(a - 40),
                    n = intval(getSize(t.box.resizeableH)[1]);
                n + t.hDiff - r < 40 && (r = n + t.hDiff - 40), setStyle(t.box.resizeableH, {
                    height: n + (t.hDiff || 0) - r
                }), t.hDiff = r, FastChat.fixResized(t, t.wrap.clientWidth, !0)
            } else if (t.hDiff) {
                var n = intval(getSize(t.box.resizeableH)[1]);
                setStyle(t.box.resizeableH, {
                    height: n + t.hDiff
                }), t.hDiff = 0, FastChat.fixResized(t, t.wrap.clientWidth, !0)
            }
        },
        initTab: function(e, t, i) {
            var a = geByClass1("fc_editable", i),
                r = curFastChat.tabs[e] = {
                    name: t.name,
                    fname: t.fname,
                    photo: t.photo,
                    link: t.alink || "/id" + e,
                    hash: t.hash,
                    sendhash: FastChat.decodehash(t.hash),
                    sex: t.sex || 0,
                    data: t.data || {},
                    online: t.online,
                    msgs: {},
                    msgscount: 0,
                    unread: 0,
                    sent: 0,
                    sentmsgs: [],
                    box: !1,
                    wrap: i,
                    editable: 1,
                    txt: a,
                    txtWrap: a.parentNode.parentNode,
                    logWrap: geByClass1("fc_tab_log", i),
                    log: geByClass1("fc_tab_log_msgs", i),
                    notify: geByClass1("fc_tab_notify_wrap", i),
                    title: geByClass1("fc_tab_title", i)
                },
                o = 30;
            if (r.addMediaBtn = geByClass1("fc_tab_attach", i), r.editable) cur.t = r, r.emojiId = Emoji.init(r.txt, {
                controlsCont: geByClass1("fc_tab_txt_wrap", i),
                ttDiff: -46,
                ttShift: 0,
                rPointer: !0,
                global: !0,
                noRce: !0,
                peer: e,
                isChat: !0,
                noCtrlSend: !0,
                onSend: FastChat.send.pbind(e),
                checkEditable: FastChat.checkEditable,
                onResize: function() {
                    FastChat.onTxtResize(e)
                },
                addMediaBtn: r.addMediaBtn,
                onShow: function() {
                    cssAnim(r.scroll.scrollbar, {
                        opacity: 0
                    }, {
                        duration: 400
                    })
                },
                onHide: function() {
                    cssAnim(r.scroll.scrollbar, {
                        opacity: 1
                    }, {
                        duration: 400
                    })
                },
                onEsc: function(e) {
                    return r.box.hide(), cancelEvent(e)
                },
                onStickerSend: function(t, i) {
                    --r.sent, FastChat.send(e, t, i)
                }
            });
            else {
                var s = 15;
                autosizeSetup(r.txt, {
                    minHeight: s,
                    maxHeight: 42
                }), r.txt.autosize.options.onResize = function(e) {
                    if (!r.box.minimized) {
                        var t = 42 == e ? 42 : s;
                        t != e && setStyle(r.txt, "height", t), t != o && (setStyle(r.logWrap, "height", r.logWrap.clientHeight - t + o), o = t, r.scroll && r.scroll.update(!1, !0))
                    }
                }
            }
            return r.imPeerMedias = {}, r.imSortedMedias = {}, r.previewEl = geByClass1("fc_tab_preview", i), stManager.add(["page.js", "page.css", "ui_media_selector.js", "ui_media_selector.css"], function() {
                r.imMedia = new MediaSelector(r.addMediaBtn, r.previewEl, [
                    ["photo", getLang("profile_wall_photo")],
                    ["video", getLang("profile_wall_video")],
                    ["audio", getLang("profile_wall_audio")],
                    ["doc", getLang("profile_wall_doc")],
                    ["map", getLang("profile_wall_map")]
                ], {
                    limit: 10,
                    hideAfterCount: 0,
                    maxShown: 0,
                    mail: 1,
                    tooltip: 1,
                    topOffset: 0,
                    forceUp: 1,
                    global: 1,
                    toId: vk.id
                }), r.imMedia.onChange = setTimeout.pbind(function() {
                    if (curFastChat.sendOnUpload) FastChat.send(curFastChat.sendOnUpload), curFastChat.sendOnUpload = void 0;
                    else {
                        var t = (0, n.loadDraftForPeer)(curFastChat.ldb, e);
                        t.removeAllAttaches(), r.imMedia.getMedias().forEach(function(e) {
                            return t.addAttach(e[0], e[1])
                        }), t.destroy()
                    }
                    FastChat.onTxtResize(e)
                }, 0)
            }), r
        },
        addBox: function(e, t, i) {
            if (void 0 === curFastChat.tabs[e]) {
                var a = FastChat.getEditCont(Emoji.last);
                i = i || {}, curFastChat.tabs[e] = {};
                var r = se(rs(FastChat.tplBox, {
                    id: e,
                    name: t.name,
                    myphoto: Notifier.fixPhoto(curFastChat.me.photo, !0),
                    cont: a
                }));
                i.fixed && curFastChat.activeBox && curFastChat.activeBox.hide(0, !1, {
                    noState: !0
                });
                var n = FastChat.initTab(e, t, r),
                    o = getWndInner(),
                    s = {
                        id: "fc_peer" + e,
                        marginFixedToLayer: !0,
                        peer: e,
                        movable: geByClass1("fc_tab_head", r),
                        closer: geByClass1("fc_tab_close_wrap", r, "a"),
                        resizeableH: n.logWrap,
                        startHeight: 250,
                        startWidth: 270,
                        fixed: i.fixed,
                        minH: 150,
                        minW: 270,
                        nofocus: !0,
                        onFocus: function(t) {
                            n.auto && (FastChat.stateChange({
                                op: "added",
                                peer: e
                            }), delete n.auto), FastChat.restoreDraft(e), n.editable ? Emoji.editableFocus(n.txt, !1, !0) : elfocus(n.txt), n.wrap.clientWidth && setStyle(n.title, {
                                maxWidth: n.wrap.clientWidth - 71
                            }), n.editable || setStyle(n.txt.autosize.helper, {
                                width: getStyle(n.txt, "width", !1)
                            }), n.scroll && n.scroll.update(!1, !0), setTimeout(elfocus.pbind(n.txt), 10)
                        },
                        onHide: function() {
                            i.fixed && FastChat.hideChatCtrl(), curFastChat.activeBox && e == curFastChat.activeBox.options.peer && FastChat.setActive(!1)
                        },
                        onClose: function(t) {
                            AudioMessagePlayer.loaded && AudioMessagePlayer.detachPlayer(), this.onHide(), i && i.beforeClose && i.beforeClose();
                            var a = curFastChat.tabs,
                                r = a[e].posSeq;
                            if (delete a[e], curNotifier.isIdle || FastChat.stateChange({
                                    op: "hidden",
                                    peer: e
                                }), r) {
                                var n, o, s, c, u, l = {},
                                    d = [];
                                for (each(a, function() {
                                        this.posSeq > r && (l[this.posSeq] = this, d.push(this.posSeq))
                                    }), d.unshift(r), d.sort(), u = !browser.msie && d.length < 10, n = 1; n < d.length; n++) o = d[n], s = l[o].box, c = n > 1 ? l[d[n - 1]].box.pos : t, u ? animate(s.wrap, {
                                    left: c[1]
                                }, 100, function(e) {
                                    e._update_pos()
                                }.pbind(s)) : setStyle(s.wrap, {
                                    left: c[1]
                                });
                                if (!u)
                                    for (n = 1; n < d.length; n++) s = l[d[n]].box, s._update_pos()
                            }
                        },
                        onMinimize: function(t) {
                            FastChat.stateChange({
                                op: "minimized",
                                peer: e,
                                val: t
                            }), FastChat.fixResized(n, n.wrap.clientWidth, !0), t || (n.txt.blur(), FastChat.restoreDraft(e))
                        },
                        onResizeEnd: function(t, i) {
                            var a = getWndInner(),
                                r = n.box.pos;
                            n.scroll && n.scroll.show(), FastChat.fixResized(n, i, !0), FastChat.stateChange({
                                op: "resized",
                                peer: e,
                                h: t / a[0],
                                w: i / a[1],
                                y: n.box.toBottom ? -1 : r[0] / a[0],
                                x: n.box.toRight ? -1 : r[1] / a[1]
                            })
                        },
                        onResize: function(e, t) {
                            FastChat.fixResized(n, t);
                            var i = geByClass1("fc_tab_title", n.box.content);
                            setStyle(i, {
                                width: t - 78
                            })
                        },
                        onResizeStart: function() {
                            delete n.posSeq, n.scroll && n.scroll.hide(), val(n.notify, ""), clearTimeout(n.hideNotifyTO)
                        },
                        onDragEnd: function(t, i) {
                            delete n.posSeq, FastChat.stateChange({
                                op: "moved",
                                peer: e,
                                y: t,
                                x: i
                            })
                        }
                    };
                if (i && extend(s, i), void 0 === s.startLeft && void 0 === s.startRight) {
                    var c = [],
                        u = o[0] - 350,
                        l = curFastChat.clistBox.pos,
                        d = !1;
                    if (window.Call && (Call.box || Call.invitation)) {
                        var f = Call.calcBoxPos();
                        c.push([f.x, f.x + f.w]), d = !0
                    }
                    l[0] + l[2] > u && (curFastChat.clistBox.visible || !d) && c.push([l[1], l[1] + l[3]]), each(curFastChat.tabs, function(t) {
                        (l = this.box && this.box.pos) && t != e && l[0] + l[2] > u && c.push([l[1], l[1] + l[3]])
                    });
                    var h, p, m, _ = lastWindowWidth - 262 - sbWidth(),
                        g = 0,
                        v = !1,
                        b = !1,
                        C = g > _ ? 1 : -1;
                    for (h = _; C * g > C * h; h += 135 * C) {
                        for (p = 0, m = 0; m < c.length; m++) h > c[m][0] - 260 && h < c[m][1] && p++, h > c[m][0] - 10 && h < c[m][0] + 10 && (p += 1.1);
                        (v === !1 || b > p) && (v = h, b = p)
                    }
                    d && b && (v = _), extend(s, {
                        startBottom: 0,
                        startLeft: v
                    })
                }
                var y, w = !0;
                for (y in i || {})
                    if ("nofocus" != y) {
                        w = !1;
                        break
                    }
                w && (n.posSeq = ++curFastChat.posSeq), s.fixed && (s.startHeight = curFastChat.clistH, s.startWidth = curFastChat.clistW, s.onShow = FastChat.showChatCtrl), n.box = new RBox(r, s), n.iman = new IdleManager({
                    id: "tab" + e,
                    element: n.box.content,
                    onUnIdleCb: function() {
                        FastChat.readLastMsgs(e)
                    },
                    parentManager: curNotifier.idle_manager,
                    idleTimeout: 1e4
                }), curFastChat.tabs[e].iman.start(), s.fixed && FastChat.setActive(n.box), n.scroll = new Scrollbar(n.logWrap, {
                    prefix: "fc_",
                    nomargin: !0,
                    nokeys: !0,
                    global: !0,
                    right: vk.rtl ? "auto" : 1,
                    left: vk.rtl ? 1 : "auto",
                    onScroll: FastChat.onScroll.pbind(n)
                }), s.minimized || !i || void 0 === i.startLeft && void 0 === i.startTop && void 0 === i.startWidth && void 0 === i.startHeight || n.box._wnd_resize(o[0], o[1], !0), n.wrap.clientWidth && setStyle(n.title, {
                    maxWidth: n.wrap.clientWidth - 71
                }), addEvent(n.txt, "keydown focus mousedown keyup", function(t) {
                    if ("mousedown" == t.type) return void(curRBox.active == n.box.id && ((t.originalEvent || t).cancelBubble = !0));
                    if ("keydown" == t.type && t.ctrlKey && t.keyCode == KEY.RETURN) {
                        var i = this.value;
                        if ("number" == typeof this.selectionStart && "number" == typeof this.selectionEnd) {
                            var a = this.selectionStart;
                            this.value = i.slice(0, a) + "\n" + i.slice(this.selectionEnd), this.selectionStart = this.selectionEnd = a + 1
                        } else if (document.selection && document.selection.createRange) {
                            this.focus(t);
                            var r = document.selection.createRange();
                            r.text = "\r\n", r.collapse(!1), browser.opera && (r.moveEnd("character", 0), r.moveStart("character", 0)), r.select()
                        }
                        return n.editable ? FastChat.checkEditable(n.emojiId, n.txt) : (n.txt.autosize.update(), setTimeout(function() {
                            n.txt.autosize.update()
                        }, 0)), !1
                    }
                    if ("focus" == t.type) curFastChat.peer = e;
                    else if ("keyup" == t.type) {
                        var o = n.lastVal || "",
                            s = FastChat.getVal(this);
                        (s.length != o.length || s != o) && (s && FastChat.onMyTyping(e), n.lastVal = s), clearTimeout(n.saveDraftTO), n.saveDraftTO = setTimeout(FastChat.saveDraft.pbind(e), s.length ? 300 : 0), FastChat.checkEditable(n.emojiId, n.txt)
                    }
                }), FastChat.restoreDraft(e), s.onPeerAdded && s.onPeerAdded()
            }
        },
        onScroll: function(e) {
            var t = e.scroll.obj.scrollTop,
                i = geByClass1("_fc_msgs_more", e.logWrap);
            200 > t && isVisible(i) && i.click()
        },
        loadMore: function(e, t) {
            var i = curFastChat.tabs[e],
                a = i.offset;
            return i.moreLoading ? !1 : (i.moreLoading = !0, void ajax.post("al_im.php", {
                act: "a_history",
                peer: e,
                offset: a,
                from: "fc"
            }, {
                onDone: function(e) {
                    e[3] || hide(t);
                    var a = t.parentNode,
                        r = a.clientHeight;
                    a.insertBefore(cf(e[0]), t.nextSibling);
                    var n = a.clientHeight - r;
                    n && (i.logWrap.scrollTop += n), i.scroll.update(), i.offset = e[2], i.moreLoading = !1, FastChat.onScroll(i)
                },
                onFail: function() {
                    i.moreLoading = !1
                },
                showProgress: lockButton.pbind(t),
                hideProgress: unlockButton.pbind(t)
            }))
        },
        sendOnResponse: function(e, t, i) {
            if (e.version && intval(e.version) > curFastChat.version) return void FastChat.updateVersion(e.version);
            var a = ge("fc_msg" + t),
                r = e.msg_id,
                n = indexOf(t, i.newmsgs);
            if (a) {
                if (e.media) {
                    var o = {
                        sticker: intval(e.sticker)
                    };
                    FastChat.lcSend("gotMedia", {
                        msgId: t,
                        peer: i.box.options.peer,
                        text: e.media,
                        msgOpts: o
                    }), FastChat.gotMsgMedia(i.box.options.peer, t, e.media, o)
                }++i.msgscount, -1 != n && i.newmsgs.splice(n, 1), a.id = "fc_msg" + r, i.msgs[r] = [1, 1]
            }
        },
        checkEditable: function(e, t) {
            Emoji.checkEditable(e, t, {
                height: 52
            })
        },
        fixResized: function(e, t, i) {
            e && (e.logWrap.scrollTop = e.logWrap.scrollHeight, t > 0 && setStyle(e.title, {
                maxWidth: t - 71
            }), i && (e.editable || setStyle(e.txt.autosize.helper, {
                width: getStyle(e.txt, "width", !1)
            }), e.scroll && e.scroll.update(!1, !0)))
        },
        activateTab: function(e) {
            var t = curFastChat.tabs[e].box;
            curFastChat.activeBox && curFastChat.activeBox != t && curFastChat.activeBox.hide(0, !1, {
                noState: !0
            }), t.show(), t.options.fixed && FastChat.setActive(t)
        },
        updateUnreadTab: function(e) {
            var t = curFastChat.tabs[e];
            t && (val(t.title, t.name + (t.unread ? ' <span class="fc_tab_count">(' + t.unread + ")</span>" : "")), val("fc_contact_unread" + e, t.unread ? " <b>+" + t.unread + "</b>" : ""), FastChat.changePeerCounter(e, !1, t.unread))
        },
        blinkTab: function(e) {
            var t = curFastChat.tabs[e];
            if (!t.blinking && curFastChat.peer != e) {
                t.blinking = !0, clearTimeout(t.blinkingTO);
                var i = t.box.wrap,
                    a = i.className,
                    r = Math.min(s, intval(getStyle(i, "zIndex")));
                setStyle(i, {
                    zIndex: s
                }), removeClass(i, "rb_inactive"), t.blinkingTO = setTimeout(function() {
                    delete t.blinking, delete t.blinkingTO, getStyle(i, "zIndex") == s && (setStyle(i, {
                        zIndex: r
                    }), i.className = a)
                }, 2e3)
            }
        },
        createProgress: function(e, t, i) {
            var a = ce("span", {
                innerHTML: rs(vk.pr_tpl, {
                    id: "",
                    cls: ""
                }),
                className: "fc_msg_progress",
                id: "fc_msg_progress" + t
            });
            return e.insertBefore(a, i), a
        },
        removeProgress: function(e) {
            re("fc_msg_progress" + e)
        },
        send: function(e, t, i) {
            var a = curFastChat.tabs[e],
                r = trim(a.editable ? Emoji.editableVal(a.txt) : val(a.txt));
            if (t) {
                var n = [
                    ["sticker", t]
                ];
                r = ""
            } else var n = a.imMedia ? a.imMedia.getMedias() : [];
            var o = ge("fc_tab_typing" + e),
                s = geByClass1("page_progress_preview", a.wrap);
            if (s && s.childNodes.length > 0) {
                curFastChat.sendOnUpload = e;
                var c = geByClass("fc_tab_log", a.wrap)[0];
                return FastChat.createProgress(c, e, c.lastChild), void(o.style.visibility = "hidden")
            }
            if (curFastChat.sendOnUpload = !1, FastChat.removeProgress(e), o.style.visibility = "visible", !r && !n.length) return void(a.editable ? Emoji.editableFocus(a.txt, !1, !0) : elfocus(a.txt));
            var u = --a.sent,
                l = {
                    act: "a_send",
                    to: e,
                    hash: a.sendhash,
                    msg: r,
                    from: "fc",
                    media: []
                };
            i && (l.sticker_referrer = i);
            for (var d, f = 0, h = n.length; h > f; ++f)(d = n[f]) && l.media.push(d[0] + ":" + d[1]);
            l.media = l.media.join(","), a.sending = !0, Emoji.ttHide(a.emojiId), ajax.post("al_im.php", l, {
                onDone: function(t) {
                    clearTimeout(a.saveDraftTO), FastChat.saveDraft(e), FastChat.sendOnResponse(t, u, a)
                },
                onFail: function(t) {
                    FastChat.error(e, t || getLang("global_unknown_error")), elfocus(a.txt), val(a.txt, r), a.editable ? FastChat.checkEditable(a.emojiId, a.txt) : a.txt.autosize.update();
                    var i = ge("fc_msg" + u);
                    return i ? (i.appendChild(ce("span", {
                        className: "fc_msg_error",
                        innerHTML: getLang("global_error")
                    })), FastChat.scroll(e), !0) : void 0
                },
                showProgress: function() {
                    a.sending = !0, a.sendProgressTO = setTimeout(function() {
                        var e = ge("fc_msg" + u);
                        e && FastChat.createProgress(e, u, e.firstChild)
                    }, 2e3)
                },
                hideProgress: function() {
                    a.sending = !1, clearTimeout(a.sendProgressTO), FastChat.removeProgress(u)
                }
            }), re("fc_error" + e), a.sentmsgs.push(u), t || (val(a.txt, ""), a.imMedia && a.imMedia.unchooseMedia());
            var p = l.media ? 1 : 0;
            t && (p += 8), FastChat.addMsg(FastChat.prepareMsgData([e, u, 3, FastChat.mkMsg(r), p])), delete curFastChat.myTypingEvents[e], a.editable ? FastChat.checkEditable(a.emojiId, a.txt) : a.txt.autosize.update(!1, !0), elfocus(a.txt), FastChat.scroll(e)
        },
        saveDraft: function(e) {
            var t = curFastChat.tabs[e],
                i = (t || {}).txt;
            if (i && t) {
                var a = Emoji.editableVal(i),
                    r = (0, n.loadDraftForPeer)(curFastChat.ldb, e);
                r.setText(trim(a) || ""), r.destroy()
            }
        },
        restoreDraft: function(e) {
            var t = curFastChat.tabs[e],
                i = t.txt,
                a = (0, n.loadDraftForPeer)(curFastChat.ldb, e);
            return !i || !t || val(i).length > a.dData.txt.length && !a.hasAttaches() ? !1 : (t.editable ? i.innerHTML = Emoji.emojiToHTML(a.dData.txt, 1) : val(i, a.dData.txt), setTimeout(function() {
                for (var e = a.dData.attaches, i = 0; i < e.length; i++) t.imMedia && t.imMedia.chooseMedia(e[i].type, e[i].id, e[i].object || {});
                a.destroy()
            }, 40), FastChat.checkEditable(t.emojiId, i), setTimeout(function() {
                i.scrollTop = i.scrollHeight
            }, 10), !0)
        },
        error: function(e, t) {
            e = e || curFastChat.peer;
            var i = curFastChat.tabs[e];
            re("fc_error" + e), i.log.appendChild(ce("div", {
                id: "fc_error" + e,
                className: "fc_msgs_error",
                innerHTML: t || getLang("global_error")
            })), FastChat.scroll(e)
        },
        scroll: function(e) {
            e = e || curFastChat.peer;
            var t = curFastChat.tabs[e];
            t && (t.logWrap.scrollTop = t.logWrap.scrollHeight, t.scroll && t.scroll.update(!1, !0))
        },
        mkdate: function(e) {
            var t = new Date(1e3 * e),
                i = new Date,
                a = function(e) {
                    return (e + "").length < 2 ? "0" + e : e
                };
            if (t.getDay() == i.getDay()) return a(t.getHours()) + ":" + a(t.getMinutes());
            var r = a(t.getDate()) + "." + a(t.getMonth() + 1);
            return t.getFullYear() != i.getFullYear() && (r += "." + (t.getFullYear() + "").substr(2)), r
        },
        prepareMsgData: function(e) {
            var t, i = e[0],
                a = intval(e[2]),
                r = 2 & a ? curFastChat.me.id : i > 2e9 ? e[5] : i,
                n = intval(vkNow() / 1e3),
                o = e[4],
                s = "",
                c = {
                    id: e[1],
                    peer: i,
                    from_id: r,
                    text: e[3],
                    out: 2 & a ? !0 : !1,
                    unread: 1 & a ? !0 : !1,
                    date: n,
                    date_str: FastChat.mkdate(n)
                };
            return o && (1 & o && (s += rs(vk.pr_tpl, {
                id: "",
                cls: ""
            }), e[1] > 0 && setTimeout(FastChat.needMsgMedia.pbind(i, e[1]), 5)), 6 & o && (s += rs(curFastChat.tpl.msg_fwd, {
                msg_id: e[1],
                peer_nice: FastChat.nicePeer(i),
                label: getLang(2 & o ? "mail_im_fwd_msg" : "mail_im_fwd_msgs")
            })), 8 & o && (c.sticker = !0), s && (c.text += '<div class="fc_msg_attachments" id="fc_msg_attachments' + c.id + '">' + s + "</div>")), t = 2 & a ? curFastChat.me : i > 2e9 ? curFastChat.tabs[i].data.members[r] : curFastChat.tabs[i], extend(c, {
                from_id: r,
                link: t.link,
                photo: t.photo,
                name: t.name,
                fname: i > 2e9 ? t.fname || t.first_name : ""
            }), c
        },
        needMsgMedia: function(e, t) {
            0 >= t || (FastChat.lcSend("needMedia", {
                msgId: t
            }), curFastChat.needMedia[t] = [e, setTimeout(FastChat.loadMsgMedia.pbind(e, t), curNotifier.is_server ? 0 : irand(150, 250))])
        },
        loadMsgMedia: function(e, t) {
            0 >= t || void 0 !== curFastChat.gotMedia[t] && 0 !== curFastChat.gotMedia[t] || (FastChat.lcSend("fetchingMedia", {
                msgId: t
            }), curFastChat.gotMedia[t] = 0, ajax.post("al_im.php", {
                act: "a_get_media",
                id: t,
                from: "fc"
            }, {
                onDone: function(i, a, r) {
                    FastChat.lcSend("gotMedia", {
                        msgId: t,
                        peer: e,
                        text: i,
                        msgOpts: r
                    }), FastChat.gotMsgMedia(e, t, i, r)
                }
            }))
        },
        gotMsgMedia: function(e, t, i, a) {
            if (val("fc_msg_attachments" + t, i), a && a.sticker) {
                var r = ge("fc_msg" + t),
                    n = r && r.parentNode;
                r && addClass(n.parentNode, "fc_msg_sticker")
            }
            FastChat.scroll(e), curFastChat.gotMedia[t] = [e, i, a], a.stickers && window.Emoji && Emoji.updateTabs(a.stickers, a.keywords), void 0 !== curFastChat.needMedia[t] && (clearTimeout(curFastChat.needMedia[t][1]), delete curFastChat.needMedia[t])
        },
        replaceSpecialSymbols: function(e) {
            return e.replace(/&lt;&lt;/g, "&laquo;").replace(/&gt;&gt;/g, "&raquo;").replace(/ \-\-/g, " &mdash;").replace(/\-\- /g, "&mdash; ").replace(/(^|[\s.,:\'\";>\)\(])(\*|@)([A-Za-z0-9_\.]{2,32})\s*\((.+?)\)/g, "$1$4")
        },
        addMsg: function(e) {
            var t = e.peer,
                i = curFastChat.tabs[t],
                a = i.log,
                r = a.lastChild;
            if (r && "fc_msgs_error" == r.className && (r = r.previousSibling), !i || e.out || !i.box.visible || i.iman.is_idle || curNotifier.idle_manager.is_idle || (e.unread = !1, FastChat.markRead(e.peer, [e.id])), !r || !hasClass(r, "fc_msgs_wrap") || !hasClass(r, "fc_msgs_unread") && e.unread === !0 || r.getAttribute("data-from") != e.from_id || e.date - intval(r.getAttribute("data-date")) >= 300 || e.sticker || hasClass(r, "fc_msg_sticker")) {
                re("fc_log_empty" + t);
                var n = (e.out ? "fc_msgs_out " : "") + (e.unread ? "fc_msgs_unread" : "");
                e.sticker && (n += " fc_msg_sticker");
                var o = e.out ? curFastChat.tpl.msgs_out : curFastChat.tpl.msgs;
                r = se(rs(o, {
                    from_id: e.from_id,
                    link: e.link,
                    photo: Notifier.fixPhoto(e.photo),
                    name: e.from_id == curFastChat.me.id ? getLang("mail_im_thats_u") : stripHTML(e.name),
                    classname: n,
                    date: e.date,
                    date_str: e.date_str,
                    msgs: ""
                })), a.appendChild(r)
            } else e.unread || removeClass(r, "fc_msgs_unread");
            var s = geByClass1("fc_msgs", r, "div"),
                c = geByClass1("fc_msgs_date", s),
                u = geByClass1("fc_msg_last", s);
            u && removeClass(u, "fc_msg_last");
            var l = se(rs(curFastChat.tpl.msg, {
                msg_id: e.id,
                classname: (e.unread ? "fc_msg_unread" : "") + " fc_msg_last",
                text: FastChat.replaceSpecialSymbols(e.text)
            }));
            domFC(s) && "BR" == domFC(s).tagName && re(domFC(s)), c ? s.insertBefore(l, c) : s.appendChild(l), vk.id != e.from_id && (delete curFastChat.typingEvents[t], FastChat.updateTyping(t, 1)), i.scroll && i.scroll.update()
        },
        editMsg: function(e) {
            var t = e.id,
                i = ge("fc_msg" + t);
            if (i) {
                var a = se(rs(curFastChat.tpl.msg, {
                    msg_id: t,
                    classname: i.getAttribute("class"),
                    text: FastChat.replaceSpecialSymbols(e.text)
                }));
                i.parentNode.replaceChild(a, i)
            }
        },
        deleteMsg: function(e) {
            var t = e.id,
                i = ge("fc_msg" + t);
            if (i) {
                var a = !domNS(i) && !domPS(i),
                    r = domClosest("fc_tab_log_msgs", i);
                for (re(a ? domClosest("fc_msgs_wrap", i) : i); hasClass(domLC(r), "fc_msgs_date");) re(domLC(r));
            }
        },
        showMsgFwd: function(e) {
            return !showBox("al_im.php", {
                act: "a_show_forward_box",
                id: vk.id + "_" + e,
                from: "mail"
            }, {
                stat: ["im.css"],
                dark: 1,
                params: {
                    onHide: function() {
                        AudioMessagePlayer.loaded && AudioMessagePlayer.detachPlayer(!0)
                    }
                }
            })
        },
        closeTab: function(e) {
            var t = curFastChat.tabs[e].box;
            t.close()
        },
        openSnapsterLayer: function(e) {
            return checkEvent(e) ? void 0 : (showBox("/snapster.php", {
                act: "show"
            }, {
                containerClass: "chronicle_layer",
                dark: 1
            }), cancelEvent(e))
        },
        nicePeer: function(e) {
            return e > 2e9 ? "c" + intval(e - 2e9) : -2e9 > e ? "e" + intval(-e - 2e9) : e
        },
        tplBox: '<div class="fc_tab_wrap"><div class="fc_tab_head clear_fix"><a class="fc_tab_close_wrap"><div class="chats_sp fc_tab_close"></div></a><a class="fc_tab_max_wrap" href="/im?sel=%id%" onmousedown="event.cancelBubble = true;" onclick="return nav.go(this, event);"><div class="chats_sp fc_tab_max"></div></a><a class="fc_tab_pin_wrap" onmousedown="event.cancelBubble = true;" onclick="return FastChat.pinTab(%id%, event);"><div class="chats_sp fc_tab_pin"></div></a><div class="fc_tab_title noselect">%name%</div></div><div class="fc_tab"><div class="fc_tab_log_wrap"><div class="fc_tab_notify_wrap"></div><div class="fc_tab_log"><div class="fc_tab_log_msgs"></div><div class="fc_tab_typing" id="fc_tab_typing%id%"><div class="pr fc_tab_typing_icon _fc_tab_typing_progress" id=""><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div><div class="fc_tab_typing_name _fc_tab_typing_name"></div></div></div></div><div class="fc_tab_txt_wrap"><a class="fc_tab_attach"></a><div class="fc_tab_txt">%cont%<div class="fc_tab_preview"></div></div></div></div><div class="fc_pointer_offset"><div class="fc_tab_pointer fc_tab_pointer_peer"></div></div></div>',
        tplTab: '<div class="fc_tab_log_wrap"><div class="fc_tab_notify_wrap"></div><div class="fc_tab_log"><div class="fc_tab_log_msgs"></div><div class="fc_tab_typing" id="fc_tab_typing%id%"><div class="pr fc_tab_typing_icon _fc_tab_typing_progress" id=""><div class="pr_bt"></div><div class="pr_bt"></div><div class="pr_bt"></div></div><div class="fc_tab_typing_name _fc_tab_typing_name"></div></div></div></div><div class="fc_tab_txt_wrap"><div class="fc_tab_txt">%cont%</div></div>'
    }
}, , function(e, t, i) {
    var a = i(85).f,
        r = i(88),
        n = i(93)("toStringTag");
    e.exports = function(e, t, i) {
        e && !r(e = i ? e : e.prototype, n) && a(e, n, {
            configurable: !0,
            value: t
        })
    }
}, function(e, t) {
    e.exports = function(e, t) {
        return {
            value: t,
            done: !!e
        }
    }
}, function(e, t) {
    "use strict";

    function i(e) {
        return "im_store_" + e
    }

    function a(e) {
        return ls.get(i(e)) || {}
    }

    function r(e, t, a) {
        if (ls.checkVersion()) {
            var r = JSON.stringify(t);
            rand(0, 1e5) <= 1 && statlogsValueEvent("im_local_store_size", r.length), a(i(e), r)
        }
    }

    function n(e, t, i) {
        return t === d ? e[t] || [] : t === f ? e[t] && e[t][i] : e[t] ? extend(!0, {}, e[t][i]) : null
    }

    function o(e, t, i) {
        switch (e[t] || (e[t] = {}), t) {
            case d:
                var a = i;
                a && a.length > 0 ? e[t] = a : delete e[t];
                break;
            case f:
                var r = l(i, 2),
                    n = r[0],
                    o = r[1];
                o ? e[t][n] = +o : delete e[t][n]
        }
        return e
    }

    function s(e, t) {
        for (var i = ["fwd", "draft", "bind_attach"], n = a(e), o = !1, s = i.length; s--;) i[s] in n && (delete n[i[s]], o = !0);
        o && r(e, n, t)
    }

    function c(e, t, a) {
        a.key === i(e) && (t.db = JSON.parse(a.newValue), t.checkTime = Date.now())
    }

    function u(e) {
        var t = debounce(function(e, t) {
            localStorage.setItem(e, t)
        }, 300);
        ls.checkVersion() && s(e, t);
        var i = {
                db: a(e),
                checkTime: Date.now()
            },
            u = c.bind(null, e, i);
        return window.addEventListener("storage", u, !1), {
            select: function(t, r) {
                return Date.now() - i.checkTime > 1e3 && (i.db = a(e)), n(i.db, t, r)
            },
            selectByKey: function(t) {
                return Date.now() - i.checkTime > 1e3 && (i.db = a(e)), i.db[t]
            },
            update: function(a, n) {
                var s = o(i.db, a, n);
                return i.db = s, i.checkTime = Date.now(), r(e, s, t)
            },
            updateByKey: function(a, n) {
                return i.db[a] = n, i.checkTime = Date.now(), r(e, i.db, t)
            },
            unmount: function() {
                window.removeEventListener("storage", u, !1)
            }
        }
    }
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var l = function() {
        function e(e, t) {
            var i = [],
                a = !0,
                r = !1,
                n = void 0;
            try {
                for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (i.push(o.value), !t || i.length !== t); a = !0);
            } catch (c) {
                r = !0, n = c
            } finally {
                try {
                    !a && s["return"] && s["return"]()
                } finally {
                    if (r) throw n
                }
            }
            return i
        }
        return function(t, i) {
            if (Array.isArray(t)) return t;
            if (Symbol.iterator in Object(t)) return e(t, i);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
    }();
    t.deleteOldStoredFormat = s, t.mount = u;
    var d = t.RECENT_SEARCH_OP = "recent_search",
        f = t.PIN_HIDDEN_ID_OP = "pin_hide"
}]);