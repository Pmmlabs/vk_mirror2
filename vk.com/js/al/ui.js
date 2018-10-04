var Ui = {};
Ui.tableInitFilters = function(e) {
    var t = e.getAttribute("ui_table_filter_id");
    Ui.tableInitFilterDropdowns(e), t && (uiSearch.init(ge(t)), setTimeout(elfocus.pbind(ge(t)), 0)), Ui.tableUpdateFilterTerm(e)
}, Ui.tableInitFilterDropdowns = function(e) {
    var t, i = e.getAttribute("ui_table_filter_id");
    e.uiFilterDropdowns = {}, each(geByClass("ui_table_filter_dropdown", ge(i).parentNode), function(i, r) {
        t = r.getAttribute("data-column"), e.uiFilterDropdowns[t] = new InlineDropdown(r, {
            withArrow: !0,
            onSelect: Ui.tableUpdateFilterTerm.pbind(e)
        })
    })
}, Ui.tableUpdateFilterTerm = function(e) {
    var t, i = e.getAttribute("ui_table_filter_id"),
        r = e.getAttribute("ui_filter_text_column"),
        s = {};
    each(e.uiFilterDropdowns || {}, function(e, i) {
        t = i.val().trim(), t && (s[e] = t)
    }), t = val(i).trim(), t && (s[r] = t), Ui.tableFilterRows(e, s)
}, Ui.tableSetFilterTerm = function(e, t, i) {
    i = i.split(",");
    var r = t;
    "string" == typeof r && (r = {}, r[i[0]] = trim(t));
    var s, a, n = [];
    for (var l in i) a = i[l], s = a in r ? "[^~]*" + r[a].replace(/[~]/g, "") + "[^~]*" : "[^~]*", n.push(a + "=" + s);
    t = "~" + n.join("~") + "~";
    var u = e.getAttribute("ui_filter_term");
    if (u === t) return !1;
    if (e.setAttribute("ui_filter_term", t), 0 == t.length) return e.removeAttribute("ui_filter_rows_indices"), !0;
    var o, _, d, b = e.getAttribute("ui_filter_data"),
        g = parseJSON(e.getAttribute("ui_filter_index")),
        p = [],
        c = 0,
        f = 0;
    for (t = t.replace(/[|]/g, ""), o = new RegExp(t, "gi"), d = {}; null != (_ = o.exec(b));) p.push(_.index);
    for (var h in g) {
        for (; c < p.length && p[c] < h;) d[g[h]] || (d[g[h]] = 1, f++), c++;
        if (c >= p.length) break
    }
    return e.setAttribute("ui_filter_rows_indices", JSON.stringify(d)), f
}, Ui.tableOnclick = function(e, t) {
    var i = vkNow(),
        e = normEvent(e || window.event),
        r = t.getAttribute("ui_table_header_id"),
        s = t.getAttribute("ui_table_rows_id"),
        a = t.getAttribute("ui_table_more_id"),
        n = t.getAttribute("ui_table_excluded_id"),
        l = t.getAttribute("ui_table_shower_id"),
        u = t.getAttribute("ui_table_result_id"),
        o = t.getAttribute("ui_table_pages_id"),
        _ = t.getAttribute("ui_group_key"),
        d = ge(r),
        b = ge(s),
        g = ge(a),
        p = ge(n),
        c = ge(l),
        f = ge(u),
        h = ge(o),
        v = e.target,
        w = !1,
        m = !1,
        A = !1,
        U = !1,
        C = !1,
        y = !1,
        S = 0;
    if (b) {
        for (; v && v !== t && v !== d && v !== b && v !== g && v !== c && v !== f && v !== h;) "TH" === v.nodeName ? w = v : "TD" === v.nodeName ? m = v : v.hasAttribute("ui_page_number") ? y = v : v.hasAttribute("ui_per_page_limit") ? C = v : v.hasAttribute(_) ? (A = v, S = Math.abs(intval(v.getAttribute(_)))) : A && "TR" === v.nodeName && (U = v), v = v.parentNode;
        v === d && w ? Ui.tableUpdateSort(t, b, g, p, w, !0) : v !== b && v !== g && v !== f || !U ? v === c && m ? Ui.tableUpdateShower(t, g, c, m) : v === h && C ? Ui.tableUpdatePerPageLimit(t, d, b, g, p, C) : v === h && y && Ui.tableUpdatePageNumber(t, d, b, g, p, y) : Ui.tableUpdateHiderGroup(b, g, U, S);
        var N = vkNow(),
            L = (document.body.offsetHeight, vkNow());
        window.debugLog && debugLog("Table click time JS: ", N - i, ", time with reflow: ", L - i)
    }
}, Ui.tableOnFilterKeypress = function(e, t) {
    e.target;
    Ui.tableFilterTimeout && clearTimeout(Ui.tableFilterTimeout), Ui.tableFilterTimeout = setTimeout(function() {
        Ui.tableUpdateFilterTerm(ge(t))
    }, 200)
}, Ui.tableClearRowsSortCache = function(e) {
    e.t_rows_sort && delete e.t_rows_sort
}, Ui.tableGetRowsSort = function(e, t, i, r, s, a) {
    var n = !isObject(s),
        l = e.t_rows_sort;
    if (!l) {
        var u, o, _, d, b;
        l = [];
        for (var g = 0; d = [t, i, r][g]; ++g) {
            u = d.children;
            for (var p = 0; b = u[p]; p++) o = intval(b.getAttribute("ui_sort_index")), l[o] || (l[o] = {}), l[o].row = b, l[o].hasOwnProperty("excludedByFilter") || (l[o].excludedByFilter = !n && !s[o]), !n && s[o] && o in a && (_ = a[o], _ && (l[_] || (l[_] = {}), l[_].excludedByFilter = !1))
        }
        Object.defineProperty && (Object.defineProperty(e, "t_rows_sort", {
            configurable: !0,
            writable: !0
        }), e.t_rows_sort = l)
    }
    return l
}, Ui.tableGetAllIndices = function(e, t) {
    function i(e, t) {
        if (e[2] < 0 && t[2] < 0) {
            if (e[1] != t[1]) return e[1] < t[1] ? -1 : 1;
            if (e[4] || t[4]) return e[0] < t[0] ? -2 : 2;
            if (e[0] != t[0]) return e[0] < t[0] ? -1 : 1
        } else if (e[2] >= 0 && t[2] >= 0) {
            if (e[3] != t[3]) return e[3] < t[3] ? -1 : 1;
            if (e[2] != t[2]) return e[2] < t[2] ? -1 : 1;
            if (e[1] != t[1]) return e[1] < t[1] ? -1 : 1;
            if (e[4] || t[4]) return e[0] < t[0] ? -2 : 2;
            if (e[0] != t[0]) return e[0] < t[0] ? -1 : 1
        } else {
            if (e[2] >= 0) return e[3] != t[1] ? e[3] < t[1] ? -1 : 1 : t[4] ? 2 : e[2] != t[0] ? e[2] < t[0] ? -1 : 1 : 2;
            if (t[2] >= 0) return e[1] != t[3] ? e[1] < t[3] ? -1 : 1 : e[4] ? -2 : e[0] != t[2] ? e[0] < t[2] ? -1 : 1 : -2
        }
        return 0
    }

    function r(e, t) {
        return result = i(e, t), (1 == result || -1 == result) && (result *= -1), result
    }
    var s, a, n, l;
    if (n = e.p_group_indices, n || (n = e.getAttribute("ui_group_indices"), n = n ? parseJSON(n) : {}, Object.defineProperty && (Object.defineProperty(e, "p_group_indices", {
            configurable: !0,
            writable: !0
        }), e.p_group_indices = n)), l = e.p_wide_indices, l || (l = e.getAttribute("ui_wide_indices"), l = l ? parseJSON(l) : {}, Object.defineProperty && (Object.defineProperty(e, "p_wide_indices", {
            configurable: !0,
            writable: !0
        }), e.p_wide_indices = l)), s = t ? t.p_sort_indices_asc : [], a = t ? t.p_sort_indices_desc : [], !s && (s = t.getAttribute("ui_sort_indices_asc"), a = t.getAttribute("ui_sort_indices_desc"), s)) {
        s = s.split(","), a = a.split(",");
        for (var u in s) s[u] = intval(s[u]);
        for (var u in a) a[u] = intval(a[u])
    }
    if (!s) {
        s = [], a = [];
        var o, _, d = t.getAttribute("ui_sort_data"),
            b = [];
        if (!d) return;
        d = d.split("!");
        var g = d.shift();
        if ("int" === g)
            for (var u = 0, p = d.length; p > u; u++) o = u in n ? n[u] : -1, _ = intval(d[o]), l[u] ? b[u] = [u, b[u - 1][1], b[u - 1][2], b[u - 1][3], 1] : b[u] = [u, intval(d[u]), o, _, 0];
        else if ("float" === g)
            for (var u = 0, p = d.length; p > u; u++) o = u in n ? n[u] : -1, _ = floatval(d[o]), l[u] ? b[u] = [u, b[u - 1][1], b[u - 1][2], b[u - 1][3], 1] : b[u] = [u, floatval(d[u]), o, _, 0];
        else
            for (var u = 0, p = d.length; p > u; u++) o = u in n ? n[u] : -1, _ = d[o], l[u] ? b[u] = [u, b[u - 1][1], b[u - 1][2], b[u - 1][3], 1] : b[u] = [u, d[u], o, _, 0];
        b.sort(i);
        for (var u = 0, p = b.length; p > u; u++) s.push(b[u][0]);
        b.sort(r);
        for (var u = 0, p = b.length; p > u; u++) a.push(b[u][0]);
        t.setAttribute("ui_sort_indices_asc", s.join(",")), t.setAttribute("ui_sort_indices_desc", a.join(",")), Object.defineProperty && (Object.defineProperty(t, "p_sort_indices_asc", {
            configurable: !0,
            writable: !0
        }), Object.defineProperty(t, "p_sort_indices_desc", {
            configurable: !0,
            writable: !0
        }), t.p_sort_indices_asc = s, t.p_sort_indices_desc = a)
    }
    return [s, a, n]
}, Ui.tableUpdateEven = function(e, t) {
    var i, r, s, a = 0;
    i = e.children;
    for (var n, l = 0; n = i[l]; l++) r = hasClass(n, "unshown"), s = hasClass(n, "wide"), r || (n.classList.remove("unshown"), a % 2 ? n.classList.add("even") : n.classList.remove("even"), s ? n.classList.add("wide") : n.classList.remove("wide"), a++, s && (a = 1));
    if (isVisible(t)) {
        i = t.children;
        for (var n, l = 0; n = i[l]; l++) r = hasClass(n, "unshown"), s = hasClass(n, "wide"), r || (n.classList.remove("unshown"), a % 2 ? n.classList.add("even") : n.classList.remove("even"), s ? n.classList.add("wide") : n.classList.remove("wide"), a++, s && (a = 1))
    }
}, Ui.tableFilterRows = function(e, t) {
    var i = e.getAttribute("ui_table_rows_id"),
        r = e.getAttribute("ui_table_more_id"),
        s = e.getAttribute("ui_table_pages_id"),
        a = e.getAttribute("ui_table_excluded_id"),
        n = e.getAttribute("ui_table_empty_filter_id"),
        l = e.getAttribute("ui_table_shower_id"),
        u = parseInt(e.getAttribute("ui_shower_enabled")),
        o = e.getAttribute("ui_filter_columns"),
        _ = e.getAttribute("ui_table_result_id"),
        d = ge(_),
        b = ge(i),
        g = ge(r),
        p = ge(a),
        c = ge(s),
        f = ge(n),
        h = ge(l),
        v = geByTag1("thead", e),
        w = geByClass1("sort", v, "th"),
        m = geByClass1("shower", h, "td"),
        A = geByClass1("ui_table_pages_numbers", c);
    if (!b) return !1;
    var U = Ui.tableSetFilterTerm(e, t, o);
    if (U === !1) return !1;
    if (0 === U ? (removeClass(f, "unshown"), addClass(d, "unshown")) : (addClass(f, "unshown"), removeClass(d, "unshown")), Ui.tableClearRowsSortCache(e), e.setAttribute("ui_rows_page_number", 0), Ui.tableUpdateSort(e, b, g, p, w, !1), m) {
        var C = m.getAttribute("ui_shower_less");
        u && g.children.length ? (C || g.hasClass(g, "unshown")) && removeClass(h, "unshown") : addClass(h, "unshown")
    }
    A && Ui.tableUpdatePages(e, A, 0)
}, Ui.tableUpdateSort = function(e, t, i, r, s, a) {
    var n, l, u, o, _, d, b, g = !hasClass(i, "unshown"),
        p = i.nextSibling,
        c = [];
    if (n = Ui.tableGetAllIndices(e, s)) {
        for (l = n[2], b = parseJSON(e.getAttribute("ui_filter_rows_indices")), u = Ui.tableGetRowsSort(e, t, i, r, b, l), o = u.length, _ = intval(e.getAttribute("ui_rows_limit")), d = intval(e.getAttribute("ui_rows_page_number")) * _, e.removeChild(t), e.removeChild(i); t.firstChild;) t.removeChild(t.firstChild);
        for (; i.firstChild;) i.removeChild(i.firstChild);
        var f = s ? hasClass(s, "sort") : !0,
            h = s ? hasClass(s, "reverse") : !1,
            v = s ? intval(s.getAttribute("ui_sort_original")) : 3;
        if (a && (v && (v = f ? v % 3 + 1 : 1), h = f && !h || !f && h), f && 3 == v)
            for (var w = 0; o > w; w++) c[w] = w;
        else c = h ? n[1] : n[0];
        for (var m, A, U, C, y, S, N, L = (!g && Object.defineProperty, !1), O = 0, T = !1, F = t.hasAttribute("ui_ensure_group_visibilities") ? parseJSON(t.getAttribute("ui_ensure_group_visibilities")) : {}, w = 0; o > w; w++) A = c[w], m = u[A].row, U = !(A in l), C = hasClass(m, "unshown"), y = hasClass(m, "wide"), S = u[A].excludedByFilter, !U && m.hasAttribute("ui_group") && (N = l[A] + ":" + intval(m.getAttribute("ui_group")), C = N in F ? F[N] : C), C ? m.classList.add("unshown") : m.classList.remove("unshown"), T % 2 ? m.classList.add("even") : m.classList.remove("even"), y ? m.classList.add("wide") : m.classList.remove("wide"), S ? r.appendChild(m) : (d > O || d >= O && !U || _ && (O - d - 1 >= _ || O - d >= _ && U) ? L ? L.push(m) : i.appendChild(m) : (t.appendChild(m), T === !1 && (T = 0)), O += U, T !== !1 && (T += !C, y && !C && (T = 1)));
        e.setAttribute("ui_main_rows_count", O), t.removeAttribute("ui_ensure_group_visibilities"), L && L.length && (Object.defineProperty(i, "p_rows_more", {
            configurable: !0,
            writable: !0
        }), i.p_rows_more = L), s && a && (removeClass(geByClass1("sort", s.parentNode.parentNode), "sort"), f && 3 == v || addClass(s, "sort"), f && 1 != v && toggleClass(s, "reverse", h), v && s.setAttribute("ui_sort_original", v)), e.insertBefore(i, p), e.insertBefore(t, i)
    }
}, Ui.tableUpdatePages = function(e, t, i) {
    for (; t.firstChild;) t.removeChild(t.firstChild);
    var r, s, a = intval(e.getAttribute("ui_main_rows_count")),
        n = intval(e.getAttribute("ui_rows_limit")),
        l = n ? Math.ceil(a / n) : 1,
        u = i >= 4 ? i - 2 : 0,
        o = l - i > 4 ? i + 2 : l - 1;
    if (1 != l) {
        0 != u && (s = "ui_table_page", r = document.createElement("a"), r.className = s, r.setAttribute("ui_page_number", 0), r.innerHTML = "&laquo;", t.appendChild(r));
        for (var _ = u; o >= _; _++) s = "ui_table_page", s += _ == i ? " selected" : "", r = document.createElement("a"), r.className = s, r.setAttribute("ui_page_number", _), r.innerHTML = _ + 1, t.appendChild(r);
        o != l - 1 && (s = "ui_table_page", r = document.createElement("a"), r.className = s, r.setAttribute("ui_page_number", l - 1), r.innerHTML = "&raquo;", t.appendChild(r))
    }
}, Ui.tableUpdatePerPageLimit = function(e, t, i, r, s, a) {
    if (!hasClass(a, "selected")) {
        removeClass(geByClass1("selected", a.parentNode), "selected"), addClass(a, "selected"), e.setAttribute("ui_rows_limit", a.getAttribute("ui_per_page_limit"));
        var n = a.parentNode.nextSibling;
        hasClass(n, "ui_table_pages_numbers") && (Ui.tableUpdatePages(e, n, 0), e.setAttribute("ui_rows_page_number", 0));
        var l = geByClass1("sort", t, "th");
        Ui.tableUpdateSort(e, i, r, s, l, !1)
    }
}, Ui.tableUpdatePageNumber = function(e, t, i, r, s, a) {
    var n = intval(e.getAttribute("ui_rows_page_number")),
        l = intval(a.getAttribute("ui_page_number"));
    if (n != l) {
        Ui.tableUpdatePages(e, a.parentNode, l), e.setAttribute("ui_rows_page_number", l);
        var u = geByClass1("sort", t, "th");
        Ui.tableUpdateSort(e, i, r, s, u, !1)
    }
}, Ui.tableUpdateShower = function(e, t, i, r) {
    var s = r.getAttribute("ui_shower_less");
    if (s) {
        if (2 == s) return scrollToY(Math.max(Math.min(getXY(e)[1] - 10, scrollGetY()), 0), 0), r.innerHTML = r.getAttribute("ui_shower_more_text"), r.setAttribute("ui_shower_less", 1), void addClass(t, "unshown");
        r.innerHTML = r.getAttribute("ui_shower_less_text"), r.setAttribute("ui_shower_less", 2), removeClass(t, "unshown")
    } else addClass(i, "unshown"), removeClass(t, "unshown");
    var a = t.p_rows_more;
    if (a && a.length) {
        var n = t.nextSibling;
        e.removeChild(t);
        for (var l, u = 0; l = a[u]; u++) t.appendChild(l);
        t.p_rows_more = [], e.insertBefore(t, n)
    }
}, Ui.tableUpdateHiderGroup = function(e, t, i, r) {
    for (var s, a, n = i.nextSibling, l = parseInt(i.getAttribute("ui_sort_index")), u = !1, o = e.hasAttribute("ui_ensure_group_visibilities") ? parseJSON(e.getAttribute("ui_ensure_group_visibilities")) : {}; n && n.hasAttribute("ui_group");) {
        if (Math.abs(intval(n.getAttribute("ui_group"))) == r) a = toggleClass(n, "unshown") ? 1 : 0, s = l + ":" + r, o[s] = a, u = hasClass(n, "wide");
        else if (u) break;
        n = n.nextSibling
    }
    e.setAttribute("ui_ensure_group_visibilities", JSON.stringify(o)), Ui.tableUpdateEven(e, t)
};
try {
    stManager.done("ui.js")
} catch (e) {}