function WkEditor(e, t) {
    this.cont = ge(e), this.imgWidth = 400, extend(this, t), cur._wkeId = (cur._wkeId || 0) + 1, cur._wke = cur._wke || {}, cur._wke[cur._wkeId] = this, cur.imagesInfo || (cur.imagesInfo = {}), this.cont.setAttribute("contenteditable", "true"), this.cont.setAttribute("spellcheck", "true");
    var i = "keydown mouseup keyup focus blur click copy cut paste";
    addEvent(e, i, function(e) {
        this.textEvent(e)
    }.bind(this)), cur.destroy.push(function() {
        removeEvent(e, i)
    }), this.plainMode = !1, this.inst = "cur._wke[" + cur._wkeId + "]";
    var s = "";
    t.mode && (this.mode = 0, this.modeBtn = t.mode, s = '<a id="wke_b_mode" class="wke_b wke_b_mode" wiki="mode" tooltip="' + t.mode[0] + '" onmousedown="' + this.inst + '.button(this, event);" onmouseover="' + this.inst + '.ttOver(this, true);"></a>'), s += '<a id="wke_b_help" class="wke_b wke_b_help" wiki="help" tooltip="' + t.help[0] + '" onmousedown="' + this.inst + '.button(this, event);" onmouseover="' + this.inst + '.ttOver(this, true);"></a>';
    var n = '<div id="wke_controls" class="wke_controls clear_fix"><div class="wke_loader"></div>' + s + '<div class="wke_panel clear_fix">';
    for (var a in this.buttons) {
        var r = this.buttons[a];
        n += '<a id="wke_b_' + a + '" class="wke_b wke_b_' + a + '" wiki="' + a + '" tooltip="' + r[0] + '" onmousedown="' + this.inst + '.button(this, event);" onmouseover="' + this.inst + '.ttOver(this);"></a>'
    }
    n += "</div></div>", this.panelCont ? this.panelCont.innerHTML = n : (this.panelCont = ce("div", {
        innerHTML: n,
        id: "wke_controls_cont"
    }), this.cont.parentNode.insertBefore(this.panelCont, this.source || this.cont)), addClass(this.panelCont, "wke_pcont"), this.panel = ge("wke_controls"), this.loader = geByClass1("wke_loader", this.panel), this.mode = 1, this.state = {}, this.panelXY = getXY(this.panel, this.isLayer), t.source ? this.textarea = this.source : this.textarea = this.cont.parentNode.insertBefore(ce("textarea"), this.cont), addClass(this.textarea, "wke_textarea"), autosizeSetup(this.textarea, {
        minHeight: t.minHeight || 400
    }), addEvent(this.textarea, "keydown", function(e) {
        this.textEvent(e)
    }.bind(this));
    var o = this.saveLastCursor.bind(this);
    addEvent(document, "mousedown", o), cur.destroy.push(function() {
        removeEvent(this.textarea, "keydown"), removeEvent(document, "mousedown", o)
    }), this.pboxParams = t.pboxParams || {}, this.checkBrowser(), setTimeout(function() {
        this.prepareCont(this.cont)
    }.bind(this))
}
extend(WkEditor.prototype, {
    textEvent: function(e) {
        document;
        if ("keydown" == e.type) {
            this.lastKey;
            switch (this.lastKey = e.keyCode, e.keyCode) {
                case KEY.ENTER:
                    if (this.onChangeHandler(), this.plainMode) break;
                    if (this.state.pre) {
                        var t = document.createTextNode("\n");
                        this.replaceSelected([t]);
                        for (var i = t.nextSibling; i && "" == i.nodeValue;) i = i.nextSibling;
                        return i || t.parentNode.insertBefore(document.createTextNode("\n"), t), this.setFocus(t), cancelEvent(e)
                    }
                    var s = this.getRange(),
                        n = this.getState(s);
                    if (n && 2 == n[1]) {
                        var a = n[0],
                            r = ce("br");
                        if (!s.endOffset && this.getText(a)) {
                            var o = this.prevNode(a);
                            o && "BR" != o.tagName && (3 != o.nodeType || o.data) && a.parentNode.insertBefore(ce("br"), a), a.parentNode.insertBefore(r, a), this.setFocus(a, {
                                toStart: !0
                            })
                        } else this.insertBreak(e, a);
                        return cancelEvent(e)
                    }
                    break;
                case KEY.LEFT:
                case KEY.RIGHT:
                case KEY.UP:
                case KEY.DOWN:
                case KEY.ESC:
                case 17:
                case 16:
                case 18:
                case 91:
                    break;
                case 66:
                    (e.ctrlKey || e.metaKey) && this.button(ge("wke_b_bold"), e);
                    break;
                case 73:
                    (e.ctrlKey || e.metaKey) && this.button(ge("wke_b_italic"), e);
                    break;
                default:
                    this.onChangeHandler()
            }
        } else if ("mouseup" == e.type || "keyup" == e.type) this.checkEditPlace();
        else if ("focus" == e.type) this.checkEditPlace();
        else if ("blur" == e.type) this.switchMode(0);
        else if ("click" == e.type) {
            var a = e.target;
            if (this.isLink(a)) return this.showUrlBox([a, 3]), cancelEvent(e);
            var h = this.isPhoto(a);
            if (h) return this.showPhotoBox(h), cancelEvent(e);
            if (a == this.cont && browser.opera) return this.setFocus(this.cont), cancelEvent(e)
        } else if ("cut" != e.type && "copy" != e.type || this.plainMode) "paste" != e.type || this.plainMode || setTimeout(function() {
            var e = geByTag("img", this.cont);
            e = Array.prototype.slice.apply(e);
            for (var t in e) {
                var i = e[t].parentNode;
                if ("A" != i.tagName || !i.getAttribute("wiki")) {
                    var s = cur.imagesInfo[e[t].src];
                    if ("A" != i.tagName) {
                        var n = getSize(e[t]);
                        if (!n[0]) continue;
                        var a = ce("a", {
                            innerHTML: '<img width="' + n[0] + '" height="' + n[1] + '" src="' + e[t].src + '" />',
                            contentEditable: "false",
                            className: "wk_photo"
                        });
                        i.replaceChild(a, e[t]), i = a
                    }
                    i.setAttribute("onclick", s[0]), i.setAttribute("wiki", s[1]), i.setAttribute("href", s[2])
                }
            }
        }.bind(this), 0);
        else {
            var l = geByTag("img", this.cont);
            l = Array.prototype.slice.apply(l);
            for (var c in l) {
                var d = l[c].parentNode;
                d && "A" == d.tagName && (cur.imagesInfo[l[c].src] = [d.getAttribute("onclick"), d.getAttribute("wiki"), d.getAttribute("href")])
            }
        }
    },
    insertBreak: function(e, t) {
        var i = ce("div", {
            innerHTML: "<br/>"
        });
        return t ? t.nextSibling ? t.parentNode.insertBefore(i, t.nextSibling) : t.parentNode.appendChild(i) : this.cont.appendChild(i), this.setFocus(i, {
            toStart: !0
        }), cancelEvent(e)
    },
    showBox: function() {
        this.plainMode ? cur.wkBoxRange = this.plainGetSel() : cur.wkBoxRange = this.getRange();
        var e = showBox.apply(window, arguments);
        return e ? (e.setOptions({
            onHide: function() {
                cur.wkBoxRange && this.setSelectionRange(cur.wkBoxRange)
            }.bind(this)
        }), e) : !1
    },
    checkFocus: function() {
        if (!browser.chrome) return !1;
        var e = this.getSel();
        if (e && "None" != e.type) {
            var t = e.focusNode;
            if (t != this.cont)
                for (; t;) {
                    if (t == this.cont) return !1;
                    t = t.parentNode
                }
        }
        this.setFocus(this.cont)
    },
    toggleEditable: function(e) {
        var t = geByClass("wk_photo", this.cont);
        t.push.apply(t, geByClass("wk_photo_no_padding", this.cont));
        for (var i in t) t[i].setAttribute("contenteditable", e ? "false" : "true")
    },
    button: function(e, t) {
        if (hasClass(e, "wke_b_disabled")) return cancelEvent(t);
        var i = e.getAttribute("wiki"),
            s = this.buttons[i],
            n = document;
        switch (this.plainMode || this.checkFocus(), i) {
            case "bold":
                this.plainMode ? this.plainInsert("'''", "'''") : (n.execCommand("bold", !1, null), this.toggleState(i));
                break;
            case "italic":
                this.plainMode ? this.plainInsert("''", "''") : (n.execCommand("italic", !1, null), this.toggleState(i));
                break;
            case "image":
                var a = extend({
                    act: "choose_photo",
                    al_wiki_editor: 1,
                    is_blog_editor: -1 != location.href.indexOf("/blog") ? 1 : 0,
                    to_id: cur.oid,
                    scrollbar_width: window.sbWidth()
                }, this.pboxParams);
                this.pbox = this.showBox("al_photos.php", a, {
                    stat: ["page.css", "page.js"],
                    cache: 1
                }), window.editorChoosePhoto = this.insertPhoto.bind(this);
                break;
            case "video":
                this.vbox = this.showBox("al_video.php", {
                    act: "a_choose_video_box",
                    al_wiki_editor: 1,
                    to_id: cur.oid,
                    scrollbar_width: window.sbWidth()
                }, {
                    stat: ["page.css", "page.js"],
                    cache: 1
                }), window.editorChooseVideo = this.insertVideo.bind(this);
                break;
            case "audio":
                this.abox = this.showBox("audio.php", {
                    act: "a_choose_audio_box",
                    al_wiki_editor: 1,
                    to_id: cur.oid,
                    scrollbar_width: window.sbWidth(),
                    options: JSON.stringify({
                        wiki: 1
                    })
                }, {
                    stat: ["page.css", "page.js"],
                    cache: 1
                }), window.editorChooseAudio = this.insertAudio.bind(this);
                break;
            case "left":
                this.plainMode ? this.plainInsert("<left>", "</left>") : (this.toggleEditable(!1), n.execCommand("justifyLeft", !1, !0), this.toggleEditable(!0), this.toggleState(i));
                break;
            case "center":
                this.plainMode ? this.plainInsert("<center>", "</center>") : (this.toggleEditable(!1), n.execCommand("justifyCenter", !1, !0), this.toggleEditable(!0), this.toggleState(i));
                break;
            case "right":
                this.plainMode ? this.plainInsert("<right>", "</right>") : (this.toggleEditable(!1), n.execCommand("justifyRight", !1, !0), this.toggleEditable(!0), this.toggleState(i));
                break;
            case "h1":
                this.plainMode ? this.plainInsert("== ", " ==", {
                    newline: 1
                }) : this.wrapHeader("wk_header", s);
                break;
            case "h2":
                this.plainMode ? this.plainInsert("=== ", " ===", {
                    newline: 1
                }) : this.wrapHeader("wk_sub_header", s);
                break;
            case "h3":
                this.plainMode ? this.plainInsert("==== ", " ====", {
                    newline: 1
                }) : this.wrapHeader("wk_sub_sub_header", s);
                break;
            case "url":
                var r = this.getState(this.getRange());
                this.showUrlBox(r, !0);
                break;
            case "list":
                this.plainMode ? this.plainInsert("* ", "", {
                    newline: 1
                }) : this.wrapList("ul", s);
                break;
            case "blockquote":
                this.plainMode ? this.plainInsert("<blockquote>", "</blockquote>", {
                    newline: 1
                }) : this.wrapEl("blockquote", s, "<div>", "</div>");
                break;
            case "mode":
                this.togglePlainMode(), this.toggleState(i);
                break;
            case "help":
                showBox("al_pages.php", {
                    act: "markup_help"
                }, {
                    stat: ["pages.css"]
                })
        }
        return "mode" != i && this.onChangeHandler(), cancelEvent(t)
    },
    checkBrowser: function() {
        var e = intval(browser.version),
            t = !1;
        browser.chrome && e > 11 && (t = 1), browser.mozilla && e >= 4 && (t = 1), browser.opera && e > 10 && (t = 1), browser.safari && e > 4 && (t = 1), browser.msie && e >= 9 && (t = 1);
        var i = ge("wke_b_mode");
        t && !this.plain ? (show(this.cont), hide(this.textarea), this.setPlainMode(!1), this.modeBtn && this.ttUpdate(i, this.modeBtn[0])) : (hide(this.cont), show(this.textarea), this.setPlainMode(!0), this.modeBtn && this.ttUpdate(i, this.modeBtn[1]), t || hide(i)), this.onPlainToggle && this.onPlainToggle(!t, !1), this.checkEditPlace()
    },
    setPlainMode: function(e) {
        this.plainMode = e, triggerEvent(window, "scroll")
    },
    togglePlainMode: function(e) {
        var t = ge("wke_b_mode");
        if (void 0 == e ? this.plainMode : e) i = this.textarea.value, i == this.prevWiki ? (show(this.cont), hide(this.textarea), this.setPlainMode(!1), triggerEvent(window, "scroll")) : ajax.post("al_pages.php", {
            act: "convert_wiki",
            Body: i
        }, {
            onDone: function(e, t) {
                this.wikiPref = t, this.cont.innerHTML = e, show(this.cont), this.prepareCont(this.cont), hide(this.textarea), this.setPlainMode(!1), this.onPlainToggle && this.onPlainToggle(this.plainMode, !0)
            }.bind(this),
            loader: !0
        }), this.ttUpdate(t, this.modeBtn[0]);
        else {
            if (this.changed) {
                var i = this.val();
                this.prevWiki = i, val(this.textarea, i), this.textarea.autosize && this.textarea.autosize.update()
            } else this.prevWiki = this.textarea.value;
            hide(this.cont), show(this.textarea), this.setPlainMode(!0), this.ttUpdate(t, this.modeBtn[1])
        }
        this.onPlainToggle && this.onPlainToggle(this.plainMode, !0), window.WkView && WkView.onResize()
    },
    prepareCont: function(e) {
        for (var t = geByTag("blockquote", e), i = t.length; i--;) {
            var s = t[i];
            if (!s.firstChild || "DIV" != s.firstChild.tagName) {
                for (var n = document.createDocumentFragment(); s.firstChild;) n.appendChild(s.firstChild);
                var a = ce("div");
                a.appendChild(n), s.appendChild(a)
            }
        }
        var r = geByClass("wk_photo", e);
        r.push.apply(r, geByClass("wk_photo_no_padding", e)), r.push.apply(r, geByClass("wk_video", e)), r.push.apply(r, geByClass("audio_row", e));
        for (var i = r.length; i--;) r[i].setAttribute("contenteditable", "false")
    },
    plainGetSel: function() {
        var e, t = 0,
            i = 0;
        if (document.selection) {
            if (e = !0, range = document.selection.createRange(), range && range.parentElement() == this.textarea) {
                var s = this.textarea.value,
                    n = s.length,
                    a = s.replace(/\r\n/g, "\n"),
                    r = this.textarea.createTextRange();
                r.moveToBookmark(range.getBookmark());
                var o = this.textarea.createTextRange();
                o.collapse(!1), r.compareEndPoints("StartToEnd", o) > -1 ? t = i = n : (t = -r.moveStart("character", -n), browser.msie && intval(browser.version) < 9 && (t += a.slice(0, t).split("\n").length - 1), r.compareEndPoints("EndToEnd", o) > -1 ? i = n : (i = -r.moveEnd("character", -n), browser.msie && intval(browser.version) < 9 && (i += a.slice(0, i).split("\n").length - 1)))
            }
        } else this.textarea.selectionStart || "0" == this.textarea.selectionStart ? (t = this.textarea.selectionStart, i = this.textarea.selectionEnd) : i = t = this.textarea.value.length;
        return [t, i, e]
    },
    plainInsert: function(e, t, i) {
        this.textarea.focus(), e = e || "", t = t || "", i = i || {};
        var s = e.length,
            n = t.length,
            a = this.plainGetSel(),
            r = a[0],
            o = a[1],
            h = (a[2], this.textarea.value.substr(0, r)),
            l = this.textarea.value.substr(r, o - r),
            c = this.textarea.value.substr(o, this.textarea.value.length - o),
            d = l.match(this.re.endSp);
        if (d && (len = d[0].length, l = l.substr(0, l.length - len), o -= len, c = d[0] + c), i.replace && (l = ""), r >= s && h.substr(r - s, r) == e && c.substr(0, n) == t) e = "", t = "", h = h.substr(0, r - s), c = c.substr(n), r -= s, o -= s;
        else if (r += s, o += s, i.newline) {
            "\n" != h.substr(-1) && (h += "\n", r += 1, o += 1);
            var u = c.substr(0, 1);
            "\n" != u && "\r" != u && (c = "\n" + c)
        }
        this.textarea.value = h + e + l + t + c;
        setTimeout(function() {
            this.plainFocus(this.textarea, r, o)
        }.bind(this), 0)
    },
    wrapHeader: function(e, t) {
        var i = this.getRange(),
            s = this.getState(i),
            n = s[0];
        n.className == e ? this.unsurround(n) : (2 == s[1] && this.unsurround(n), this.surround(ce("div", {
            className: e
        }), t[1])), this.checkEditPlace()
    },
    wrapEl: function(e, t, i, s) {
        var n = this.getRange(),
            a = this.getState(n),
            r = a[0];
        r.tagName == e.toUpperCase() ? this.unsurround(r) : (6 == a[1] && this.unsurround(r), this.surround(ce(e), t[1], i, s)), this.checkEditPlace()
    },
    wrapList: function(e, t) {
        var i = this.getRange(),
            s = this.getState(i),
            n = s[0];
        if (5 == s[1] && geByTag("li", n).length) {
            for (var a = n.firstChild, r = document.createDocumentFragment(); a;) {
                if ("LI" == a.tagName) {
                    for (var o = ce("div"); a.firstChild;) o.appendChild(a.firstChild);
                    r.appendChild(o)
                }
                a = a.nextSibling
            }
            var h = r.firstChild,
                l = r.lastChild;
            n.parentNode.replaceChild(r, n), this.setSelection(h, l)
        } else this.surround(ce(e, {
            className: "listing"
        }), t[1], '<li><span class="l">', "</span></li>", !0);
        this.checkEditPlace()
    },
    fixHeader: function(e) {
        e.parentNode.replaceChild(ce("div", {
            className: e.className,
            innerHTML: clean(this.getText(e))
        }), e)
    },
    fixList: function(e) {
        for (var t = e.firstChild; t;) {
            var i = t;
            if (t = t.nextSibling, 1 == i.nodeType && "SPAN" != i.tagName || 3 == i.nodeType) {
                var s = ce("span", {
                    className: "l"
                });
                i.parentNode.replaceChild(s, i), s.appendChild(i)
            }
        }
    },
    showUrlBox: function(e, t) {
        if (this.plainMode) {
            cur.wkBoxRange = this.plainGetSel();
            var i = this.textarea.value.substr(cur.wkBoxRange[0], cur.wkBoxRange[1] - cur.wkBoxRange[0])
        } else if (3 == e[1]) {
            var s = e[0],
                i = this.getText(s);
            if (cur.wkLinkHref = s.getAttribute("href"), cur.wkLinkNote = cur.wkLinkHref.match(this.re.noteHref), cur.wkLinkPage = cur.wkLinkHref.match(this.re.pageWikiHref), cur.wkLinkCustomPage = cur.wkLinkHref.match(this.re.pageHref), cur.wkBoxRange = this.setFocus(s, {
                    noCollapse: !0
                }), cur.wkLinkEl = s, t) return this.unsurround(s, !0), this.checkEditPlace(), !1
        } else {
            if (document.getSelection) var i = document.getSelection() + "";
            else if (document.selection) var i = document.selection.createRange().text + "";
            else var i = "";
            cur.wkBoxRange = this.getRange()
        }
        cur.wkLinkName = i, cur.isBLogEditor && (cur.wkLinkNote = cur.wkLinkPage = cur.wkLinkCustomPage = null);
        var n = showBox("wiki.php", {
            act: "link_box_new",
            note: "" | this.note,
            page: this.page || "",
            oid: this.oid
        }, {
            cache: 1
        });
        n.editor = this, n.setOptions({
            onHide: function() {
                cur.wkBoxRange && this.setSelectionRange(cur.wkBoxRange)
            }.bind(this)
        })
    },
    showPhotoBox: function(e) {
        var t = geByTag1("IMG", e);
        if (!t) return !1;
        var i, s, n = e.getAttribute("href"),
            a = "",
            r = (n || "").match(this.re.photoHref);
        if (r) i = r[1], s = (r[2] || "").substr(1);
        else {
            var o = e.getAttribute("wiki");
            o && (r = o.split("_"), i = r[0], s = r[1]);
            var h;
            a = n, a = (h = n.match(this.re.away)) ? decodeURIComponent(h[1]) : n
        }
        if (!i || !s) return !1;
        var l = e.getAttribute("title");
        cur.wkPhotoEditParams = {
            el: t,
            oid: i,
            pid: s,
            text: l || "",
            url: a,
            saveRatio: !0
        }, cur.wkSavePhoto = function(n, a, r, o) {
            var h = this.getPhotoHTML(i, s, t.src, n, a, r, o);
            e.parentNode.replaceChild(se(h), e)
        }.bind(this), cur.wkBoxRange = this.getRange();
        var c = showBox("wiki.php", {
            act: "photo_box_new"
        }, {
            cache: 1
        });
        c.setOptions({
            onHide: function() {
                cur.wkBoxRange && this.setSelectionRange(cur.wkBoxRange)
            }.bind(this)
        })
    },
    getLinkWiki: function(e, t, i) {
        var s, n;
        "/" == e[0] && (e = "https://vk.com" + e);
        var a = "[",
            r = "]";
        if (s = e.match(this.re.away)) e = decodeURIComponent(s[1]);
        else if ((n = e.match(this.re.pageHref)) && !cur.isBLogEditor) {
            try {
                e = decodeURIComponent(n[1])
            } catch (o) {
                e = n[1]
            }
            a = "[[", r = "]]"
        } else if ((n = e.match(this.re.devHref)) && !cur.isBLogEditor) {
            try {
                e = decodeURIComponent(n[1])
            } catch (o) {
                e = n[1]
            }
            a = "[[", r = "]]"
        } else(n = e.match(this.re.pageId)) && !cur.isBLogEditor && (e = n[1], a = "[[", r = "]]");
        var h = "";
        if (i) {
            var l = i.getAttribute("onclick");
            l && -1 != l.indexOf("inBox") && (h += "box|")
        }
        return (h || e != t) && (h += t), a + e + (h ? "|" + h : "") + r
    },
    insertLink: function(e, t, i) {
        if (this.plainMode) return this.plainInsert(this.getLinkWiki(t, e), "", {
            replace: 1
        }), !1;
        var s = ce("a", {
            className: i ? "wk_ext_link" : "",
            innerHTML: clean(e),
            href: t
        });
        cur.wkLinkEl && cur.wkLinkEl.parentNode ? cur.wkLinkEl.parentNode.replaceChild(s, cur.wkLinkEl) : (cur.wkBoxRange && this.setSelectionRange(cur.wkBoxRange), this.insert([s], !0)), delete cur.wkLinkRange, delete cur.wkLinkEl, this.changed = !0
    },
    checkEditPlace: function() {
        setTimeout(function() {
            var e = this.getState(this.getRange());
            this.switchMode(e[1])
        }.bind(this), 0)
    },
    toggleState: function(e) {
        var t = clone(this.state);
        t[e] = !t[e], "left" == e && t[e] && (t.center = 0, t.left = 0, t.right = 0), "right" == e && t[e] && (t.center = 0), "center" == e && t[e] && (t.right = 0), this.setState(t)
    },
    setState: function(e) {
        this.plainMode && (e.mode = 1);
        var t = ["bold", "italic", "right", "center", "url", "mode", "h1", "h2", "h3", "list", "blockquote"];
        for (var i in t) {
            var i = t[i];
            e[i] && !this.state[i] ? addClass(ge("wke_b_" + i), "wke_b_active") : !e[i] && this.state[i] && removeClass(ge("wke_b_" + i), "wke_b_active")
        }
        this.state = e
    },
    saveLastCursor: function() {
        var e = this.getRange(!1, !0);
        e && (cur.lastCursor = e)
    },
    switchMode: function(e) {
        if (this.mode == e) return !1;
        var t = !1;
        if (2 == e ? t = {
                h1: 1,
                h2: 1,
                h3: 1
            } : 3 == e ? t = {
                url: 1
            } : 4 == e ? t = {} : 5 == e && (t = {
                bold: 1,
                italic: 1,
                list: 1,
                url: 1
            }), t)
            for (var i in this.buttons) toggleClass("wke_b_" + i, "wke_b_disabled", !t[i]);
        else if (this.mode >= 2)
            for (var i in this.buttons) removeClass("wke_b_" + i, "wke_b_disabled");
        var s = ge("wke_b_url");
        3 == e ? (addClass("wke_b_url", "wke_b_remove"), s.setAttribute("tooltip", this.buttons.url[1])) : 3 == this.mode && (removeClass("wke_b_url", "wke_b_remove"), this.ttUpdate(s, this.buttons.url[0])), this.mode = e, this.onSwitchMode && this.onSwitchMode()
    },
    getAlign: function(e) {
        e.style.textAlign || e.getAttribute("align")
    },
    getSel: function() {
        return window.getSelection ? window.getSelection() : !1
    },
    getRangeCont: function(e) {
        return null == e ? null : e.commonAncestorContainer ? e.commonAncestorContainer : e.parentElement ? e.parentElement() : e.item(0)
    },
    getRange: function(e, t) {
        var i, s = e ? !1 : this.getSel();
        if (s && s.rangeCount) {
            i = s.getRangeAt(0);
            for (var n = this.getRangeCont(i); n;) {
                if (n == this.cont) return i;
                n = n.parentNode
            }
        }
        return t ? !1 : (document.createRange ? (i = document.createRange(), i.selectNodeContents(this.cont)) : (i = document.body.createTextRange(), i.moveToElementText(this.cont)), i.collapse(!1), i)
    },
    unsurround: function(e, t) {
        for (var i = document.createDocumentFragment(), s = e.firstChild, n = e.lastChild; e.firstChild;) i.appendChild(e.firstChild);
        return e.parentNode.replaceChild(i, e), t || this.setSelection(s, n), this.getState(), !1
    },
    getRangeText: function(e, t) {
        if (!browser.msie) {
            if (t && e.cloneContents) {
                var i = e.cloneContents(),
                    s = this.getText(i, !0);
                return s
            }
            return e + ""
        }
        sel = document.selection.createRange(), sel.text
    },
    surround: function(e, t, i, s, n) {
        var a = this.getRange(),
            r = this.getRangeText(a, n);
        if (i = i || "", s = s || "", a.collapsed || !r) t && (e.innerHTML = i + (t || "header") + s);
        else {
            var o = "";
            if (n) {
                r = r.split("\n");
                for (var h in r) r[h] && (o += i + clean(r[h]) + s);
                o || (o = i + (t || "header") + s)
            } else o = i + clean(r || "") + s;
            e.innerHTML = o
        }
        this.replaceSelected([e]) && (this.cleanContent(this.getRangeCont(a)), this.setFocus(e, {
            noCollapse: !0
        }))
    },
    cleanContent: function(e) {
        if (1 == e.nodeType) {
            var t = [];
            t.push.apply(t, geByClass("wk_header", e)), t.push.apply(t, geByClass("wk_sub_header", e)), t.push.apply(t, geByClass("wk_sub_sub_header", e));
            for (var i in t) "" === this.getText(t[i]) && re(t[i])
        }
    },
    isLink: function(e) {
        return "A" != e.tagName || hasClass(e, "wk_photo") || hasClass(e, "wk_photo_no_padding") ? !1 : !0
    },
    isPhoto: function(e) {
        for (; e && e != this.cont;) {
            if (this.isPhotoEl(e)) return e;
            e = e.parentNode
        }
        return !1
    },
    isPhotoEl: function(e) {
        return hasClass(e, "wk_photo") || hasClass(e, "wk_photo_no_padding") || hasClass(e, "wikiPhoto")
    },
    isVideo: function(e) {
        return hasClass(e, "wk_video")
    },
    isAudio: function(e) {
        return hasClass(e, "audio_row")
    },
    getState: function(e) {
        var t = this.getRangeCont(e);
        if (e) var i = e.startContainer,
            s = e.endContainer;
        var n = !1,
            a = 0,
            r = i;
        for (state = {}; r;) {
            (i && r == t || r == s) && (i = !1, r = s);
            var o = r.tagName;
            if (1 == r.nodeType) {
                switch (o) {
                    case "B":
                    case "STRONG":
                        state.bold = 1;
                        break;
                    case "I":
                    case "EM":
                        state.italic = 1;
                        break;
                    case "PRE":
                        state.pre = 1
                }
                this.testRight(r) && (state.right = 1), this.testCenter(r) && (state.center = 1)
            }
            if ("LI" == o && this.fixList(r), !a) {
                if (r.className) var h = r.className.match(this.re.header);
                h ? (h[2] ? state.h3 = 1 : h[1] ? state.h2 = 1 : h[0] && (state.h1 = 1), n = r, a = 2, (state.right || state.center) && this.fixHeader(r)) : this.isLink(r) ? (n = r, a = 3) : "PRE" == o ? (n = r, a = 4) : "UL" == o || "OL" == o ? (n = r, a = 5, state.list = 1) : "BLOCKQUOTE" == o && (n = r, a = 6, state.blockquote = 1)
            }
            if (r == this.cont) break;
            r = r.parentNode
        }
        return this.setState(state), [n, a]
    },
    replaceSelected: function(e) {
        this.checkFocus();
        var t = this.getRange();
        if (t.deleteContents && !browser.msie) {
            if (t.deleteContents(), browser.opera) {
                document.execCommand("insertHTML", !1, '<span id="wke_tmp_el"></span>');
                var i = ge("wke_tmp_el");
                for (var s in e) i.parentNode.insertBefore(e[s], i);
                re(i)
            } else
                for (var s in e) t.insertNode(e[s]);
            return !0
        }
        var t = document.selection.createRange(),
            n = "";
        for (var s in e) n += e[s].outerHTML;
        return t.pasteHTML(n), t.collapse(!1), t.select(), !1
    },
    insert: function(e, t, i) {
        if (this.replaceSelected(e)) {
            var s = e[0];
            t || s.previousSibling && "BR" == s.previousSibling.nodeName || s.parentNode.insertBefore(ce("br"), s);
            var s = e[e.length - 1];
            if (!s.nextSibling || "BR" != s.nextSibling.nodeName && 1 == s.nodeType && (!s.nextSibling.data || !s.nextSibling.data.match(this.re.letter))) {
                var n = ce("br");
                s.parentNode.appendChild(n)
            }
            i ? this.setFocus(s) : this.setFocus(s.nextSibling)
        }
    },
    editable: function(e) {
        return e && 3 != e.nodeType && e.getAttribute && "true" == e.getAttribute("contenteditable")
    },
    setSelection: function(e, t) {
        var i = this.getRange();
        i.setStartBefore(e), i.setEndAfter(t), this.setSelectionRange(i)
    },
    plainFocus: function(e, t, s) {
        if (browser.msie && document.selection) {
            var n = e.value,
                a = t;
            for (i = 0; i < a; i++) "\r" == n[i] && (t -= 1, s -= 1);
            for (a = s; i < a; i++) "\r" == n[i] && (s -= 1)
        }
        elfocus(e, t, s)
    },
    setSelectionRange: function(e) {
        if (this.plainMode) return void this.plainFocus(this.textarea, e[0], e[1]);
        var t = this.getSel();
        t.removeAllRanges(), t.addRange(e)
    },
    setFocus: function(e, t) {
        var i = this.getSel(),
            s = this.getRange();
        if (t || (t = {}), i) i.removeAllRanges(), cur.lastCursor ? (s = cur.lastCursor, s.collapse(!1)) : (void 0 != t.offset ? (s.setStart(e, 0), s.setEnd(e, 0)) : s.selectNodeContents(e), t.noCollapse || s.collapse(t.toStart || !1)), i.addRange(s);
        else {
            var s = document.body.createTextRange();
            if (3 != e.nodeType) try {
                s.moveToElementText(e), t.noCollapse || s.collapse(t.toStart || !1), s.select()
            } catch (n) {}
        }
        return s
    },
    insertAudio: function(e, t, i, s, n, a, r) {
        if (this.abox.hide(), this.plainMode) return this.plainInsert("[[audio" + s + "]]", "", {
            replace: 1
        }), !1;
        r = geByClass1("_audio_row", domPN(r));
        var o = AudioUtils.getAudioFromEl(r),
            h = AudioUtils.drawAudio(o),
            l = se(h);
        l.setAttribute("contenteditable", "false"), this.insert([l])
    },
    insertVideo: function(e, t, i, s, n) {
        return this.vbox.hide(), this.plainMode ? (this.plainInsert("[[video" + n + "]]", "", {
            replace: 1
        }), !1) : (this.getImgSize(e, function(i, a) {
            if (i > this.imgWidth + 20) {
                var r = this.imgWidth / i;
                i = this.imgWidth, a = Math.floor(a * r)
            }
            if (a > this.imgWidth + 20) {
                var o = this.imgWidth / a;
                a = this.imgWidth, i = Math.floor(i * o)
            }
            var h = se('<a class="wk_video" href="' + s + '" contentEditable="false" onclick="return showVideo(\'' + n + "', '', {autoplay: 1}, event)\"><img alt=\"" + t + '" title="' + t + '" src="/images/play_video_wide.png?3" style="background-image: url(' + e + ');">');
            this.insert([h])
        }.bind(this)), !1)
    },
    getPhotoHTML: function(e, t, i, s, n, a, r) {
        var o = "width: " + s + "px; height: " + n + "px;";
        a ? (a = clean(a), act = "return goAway('" + a + "')") : (a = "/photo" + e + "_" + t, act = "return " + this.inst + ".editPhoto(this);");
        var h = "";
        return r && (h = ' title="' + clean(r) + '"'), '<a contenteditable="false"' + h + ' class="wk_photo" wiki="' + e + "_" + t + '" href="' + a + '" onclick="' + act + '"><img src="' + i + '" style="' + o + '" /></a>'
    },
    insertPhoto: function(e, t, i, s) {
        return this.pbox.showProgress(), this.getImgSize(s, function(i, n) {
            if (this.pbox.hide(), i > this.imgWidth + 20) {
                var a = this.imgWidth / i;
                i = this.imgWidth, n = Math.floor(n * a)
            }
            if (n > this.imgWidth + 20) {
                var r = this.imgWidth / n;
                n = this.imgWidth, i = Math.floor(i * r)
            }
            return this.plainMode ? (this.plainInsert("[[photo" + e + "_" + t + "|" + i + "x" + n + "px;noborder| ]]", "", {
                replace: 1
            }), !1) : void this.insert([ce("div", {
                align: "center",
                innerHTML: this.getPhotoHTML(e, t, s, i, n)
            })])
        }.bind(this)), !1
    },
    getImgSize: function(e, t) {
        var i = ce("img", {
            src: e
        });
        i.onload = function() {
            var e = getSize(i);
            t(e[0], e[1]), re(i)
        }.bind(this), this.loader.appendChild(i)
    },
    editPhoto: function() {
        return !1
    },
    ttOver: function(e, t) {
        return hasClass(e, "wke_b_disabled") ? !1 : void showTooltip(e, {
            text: function() {
                return e.getAttribute("tooltip")
            },
            shift: [0, 8, 8],
            asrtl: t,
            className: "wke_tt" + (t ? " wke_tt_right" : ""),
            black: 1
        })
    },
    ttUpdate: function(e, t) {
        e.setAttribute("tooltip", t), e.tt && (e.tt.show && e.tt.show(), window.tooltips && tooltips.rePositionTT(e.tt))
    },
    isCont: function(e) {
        if (!e) return !1;
        var t = e.nodeName;
        return "DIV" == t || "TABLE" == t || "UL" == t || "OL" == t || "PRE" == t || "BLOCKQUOTE" == t || this.editable(e) ? !0 : !1
    },
    inBold: function(e) {
        for (; e;) {
            var t = e.nodeName;
            if ("B" == t || "STRONG" == t) return !0;
            if (e == this.cont) return !1;
            e = e.parentNode
        }
        return !1
    },
    inItalic: function(e) {
        for (; e;) {
            var t = e.nodeName;
            if ("I" == t || "EM" == t) return !0;
            if (e == this.cont) return !1;
            e = e.parentNode
        }
        return !1
    },
    cleanPrep: function(e) {
        return e.replace(this.re.notWords, "")
    },
    lastNode: function(e) {
        for (var t = e.lastChild; t && 3 == t.nodeType && "" == trim(t.nodeValue);) t = t.previousSibling;
        return t
    },
    prevNode: function(e) {
        for (var t = e.previousSibling; t && 3 == t.nodeType && "" == trim(t.nodeValue);) t = t.previousSibling;
        return t
    },
    getWikiHref: function(e) {
        var t = e.getAttribute("href"),
            i = t.match(this.re.pageId);
        return i ? i[1] : t
    },
    getPhotoOpts: function(e, t) {
        t || (t = []), hasClass(e, "wk_photo_right") && t.unshift("right"), hasClass(e, "wk_photo_left") && t.unshift("left"), hasClass(e, "wk_photo_center") && t.unshift("center");
        var i = "IMG" == e.tagName ? e : geByTag1("img", e),
            s = getSize(i);
        return t.unshift(s[0] + "x" + s[1] + "px"), t.join(";")
    },
    getElementWiki: function(e, t) {
        var i = "",
            s = "",
            n = !1,
            a = e.nodeName;
        ("TD" == a || "TH" == a) && (t |= 1), "PRE" == a && (t |= 2), "LI" == a && (t |= 3);
        var r = this.getContent(e, t);
        switch (a) {
            case "P":
                r = r.replace(this.re.trimSp, "");
                var o = e.previousSibling;
                o && !this.isCont(o) && "BR" != o.nodeName && (i = "\n"), r ? this.testLeft(e) ? (i = "<left>", s = "</left>\n") : this.testRight(e) ? (i = "<right>", s = "</right>\n") : this.testCenter(e) && (i = "<center>", s = "</center>\n") : n = "\n";
                break;
            case "DIV":
                r = r.replace(this.re.trimSp, "");
                var h = e.className.match(this.re.header);
                if (h) {
                    var l;
                    l = h[2] ? "====" : h[1] ? "===" : "==", n = l + this.getText(e).replace("\n", "") + l + "\n"
                } else if (hasClass(e, "audio_row")) {
                    var c = e.getAttribute("data-full-id");
                    c && (n = "[[audio" + c + "]]")
                } else {
                    if ("" == r) break;
                    if ("\n" != r.substr(-1)) {
                        var d = this.lastNode(e);
                        d && "PRE" == d.tagName || (s = "\n")
                    }
                    var o = this.prevNode(e);
                    o && !this.isCont(o) && "BR" != o.tagName && (i = "\n"), r ? this.testLeft(e) ? (i += "<left>", s = "</left>\n") : this.testRight(e) ? (i += "<right>", s = "</right>\n") : this.testCenter(e) && (i += "<center>", s = "</center>\n") : s = "\n"
                }
                break;
            case "CENTER":
                r = r.replace(this.re.trimSp, ""), "\n" != r.substr(-1) && (s = "\n"), i += "<center>", s = "</center>" + s;
                break;
            case "BR":
                s = "\n", 1 & t && !cur.isBLogEditor ? s += "<br/>" : 3 & t && (s = "<br/>" + s);
                break;
            case "B":
            case "STRONG":
                var u = r.split("\n"),
                    g = [],
                    p = this.inBold(e.parentNode);
                for (var f in u) {
                    var v = u[f];
                    "==" != v.substr(0, 2) && v.match(this.re.letter) && !p ? g.push("'''" + v + "'''") : g.push(v)
                }
                n = g.join("\n");
                break;
            case "I":
            case "EM":
                var u = r.split("\n"),
                    g = [],
                    b = this.inItalic(e.parentNode);
                for (var f in u) {
                    var v = u[f];
                    "==" != v.substr(0, 2) && v.match(this.re.letter) && !b ? g.push("''" + v + "''") : g.push(v)
                }
                n = g.join("\n");
                break;
            case "IMG":
                if (this.isPhotoEl(e)) {
                    var k = this.cleanPrep(e.getAttribute("title") || " "),
                        w = e.getAttribute("wiki");
                    w && (w = w.split("_"), n = "[[photo" + w[0] + "_" + (w[1] || "") + "|" + this.getPhotoOpts(e, ["nolink"]) + "|" + k + "]]")
                }
                break;
            case "A":
                if (this.isPhotoEl(e)) {
                    var m = e.href.match(this.re.photoHref),
                        k = this.cleanPrep(e.getAttribute("title") || " ");
                    if (m) n = "[[photo" + m[1] + (m[2] || "") + "|" + this.getPhotoOpts(e) + "|" + k + "]]";
                    else {
                        var w = e.getAttribute("wiki");
                        w && (w = w.split("_"), n = "[[photo" + w[0] + "_" + (w[1] || "") + "|" + this.getPhotoOpts(e) + "|" + this.getWikiHref(e) + "]]")
                    }
                } else if (hasClass(e, "wk_video")) {
                    var _ = e.href.match(this.re.videoHref);
                    _ && (n = "[[video" + _[1] + (_[2] || "") + "]]")
                } else {
                    var x = e.getAttribute("href");
                    if (!x) break;
                    var C = x.match(this.re.noteHref);
                    if (C) {
                        n = "[[note" + C[1] + "_" + C[2] + "|" + this.getText(e) + "]]";
                        break
                    }
                    var E = x.match(this.re.pageWikiHref);
                    if (E) {
                        n = "[[page" + E[1] + "_" + E[2] + "|" + this.getText(e) + "]]";
                        break
                    }
                    var R = x.match(this.re.topicHref);
                    if (R) {
                        n = "[[topic" + R[1] + "_" + R[2] + "|" + this.getText(e) + "]]";
                        break
                    }
                    var m = x.match(this.re.photoHref);
                    if (m) {
                        var S = geByTag1("img", e);
                        if (S) {
                            cur.ii = S;
                            var k = this.cleanPrep(e.getAttribute("title") || " ");
                            n = "[[photo" + m[1] + (m[2] || "") + "|" + this.getPhotoOpts(e) + "|" + k + "]]";
                            break
                        }
                    }
                    n = this.getLinkWiki(x, this.getText(e), e)
                }
                break;
            case "PRE":
                var k = this.getText(e);
                k = k.replace(this.re.n, "\r\n"), n = "<pre>" + k + "</pre>";
                break;
            case "BLOCKQUOTE":
                r = r.replace(this.re.trimSp, ""), i = "<blockquote>";
                var T = r.substr(0, 1);
                ("*" == T || "#" == T) && (i += "\n"), s = "</blockquote>" + s;
                break;
            case "CODE":
                r = r.replace(this.re.trimSp, ""), i = "<code>", s = "</code>";
                break;
            case "UL":
                r = r.replace(this.re.trimSp, "");
                var o = this.prevNode(e);
                o && !this.isCont(o) && "BR" != o.nodeName && (i = "\n");
                break;
            case "OL":
                r = r.replace(this.re.trimSp, "");
                var o = this.prevNode(e);
                o && !this.isCont(o) && "BR" != o.nodeName && (i = "\n");
                break;
            case "LI":
                var B = r.substr(0, 1);
                if ("*" != B && "#" != B) {
                    var y = e.parentNode;
                    for (i = "* "; y && y != this.cont;) {
                        if ("OL" == y.tagName) {
                            i = "# ";
                            break
                        }
                        if ("Ul" == y.tagName) break;
                        y = y.parentNode
                    }
                }
                s = "\n", r = r.split("\n");
                var N = "";
                for (var f in r) {
                    var L = r[f].match(this.re.wikiLi);
                    N += L ? (f > 0 ? "\n" : "") + L[1] + r[f] : r[f] ? (f > 0 ? "\n:" : "") + r[f] : "<br/><br/>"
                }
                r = N;
                break;
            case "DD":
                r = r.replace(this.re.trimSp, ""), i = ":";
                break;
            case "SPAN":
                hasClass(e, "wk_gray") && (i = "<gray>", s = "</gray>");
                break;
            case "U":
                i = "<u>", s = "</u>";
                break;
            case "S":
            case "STRIKE":
                i = "<s>", s = "</s>";
                break;
            case "SUB":
                i = "<sub>", s = "</sub>";
                break;
            case "SUP":
                i = "<sup>", s = "</sup>";
                break;
            case "TABLE":
                i = "{|";
                var P = [];
                hasClass(e, "wk_table_no_border") && P.push("noborder"), hasClass(e, "wk_table_no_margin") && P.push("nomargin");
                var M = geByTag1("td", e);
                hasClass(M, "wk_cell_no_padding") && P.push("nopadding"), P.length && (i += P.join(";"));
                for (var A = e.firstChild, H = []; A;) {
                    var I = A.tagName;
                    if ("COLGROUP" != I) {
                        if ("COL" == I) {
                            var W = A.getAttribute("style").match(this.re.colWidth);
                            W && H.push(intval(W[1]))
                        }
                        A = A.nextSibling
                    } else A = A.firstChild
                }
                H.length && (i += "\n|~ " + H.join(" ")), s = "|}";
                break;
            case "TR":
                i = "|-\n";
                break;
            case "TD":
            case "TH":
                r = r.replace(this.re.trimSp, ""), i = "TH" == a ? "! " : "| ", "\n" != r.substr(-1) && (s = "\n"), r = r.replace(this.re.nn, "<br/>")
        }
        return n ? n : i + this.getWikiBreak(i, r) + r + this.getWikiBreak(r, s) + s
    },
    strToWiki: function(e) {
        var e = e.replace(this.re.trimN, " ");
        return e = e.replace(this.re.n, " "), e = e.replace(this.re.sp, " "), e = e.replace(/^#/g, "&#35;").replace(/^\*/g, "&#42;"), e = e.replace(/</g, "&#60;").replace(/>/g, "&#62;"), e = e.replace(/\[/g, "&#91;").replace(/]/g, "&#93;"), e = e.replace(/\{/g, "&#123;").replace(/\}/g, "&#125;"), e = e.replace(/==/g, "&#61;&#61;").replace(/~/g, "&#126;"), e = e.replace(/\|/g, "&#124;").replace(/!/g, "&#33;")
    },
    getContent: function(e, t) {
        for (var i = e.firstChild, s = ""; i;) {
            switch (i.nodeType) {
                case 3:
                    n = this.strToWiki(i.data), "\n" == s.substr(-1) && (n = n.replace(this.re.startSp, "")), s += n;
                    break;
                case 1:
                    var n = this.getElementWiki(i, t || 0);
                    s += this.getWikiBreak(s, n) + n;
                    break;
                case 8:
            }
            i = i.nextSibling
        }
        return s
    },
    getWikiBreak: function(e, t) {
        if (e && "\n" != e.substr(-1)) {
            var i = t.substr(0, 2);
            if ("==" == i || "|-" == i || "|}" == i || "{|" == i) return "\n";
            if ("|}" == e.substr(-2) && "\n" == t) return "\n"
        }
        return ""
    },
    getText: function(e, t) {
        if (!e) return "";
        if (t) {
            for (var i = e.firstChild, s = ""; i;) {
                switch (i.nodeType) {
                    case 3:
                        var n = i.data.replace(this.re.n, " ").replace(this.re.sp, " ");
                        s += n;
                        break;
                    case 1:
                        var a = i.tagName;
                        ("DIV" == a || "P" == a || "PRE" == a || "BLOCKQUOTE" == a || "CENTER" == a || "RIGHT" == a || "LEFT" == a || "BR" == a) && (s += "\n"), s += "B" == a || "STRONG" == a ? "<b>" + this.getText(i, !0) + "</b>" : "I" == a || "EM" == a ? "<i>" + this.getText(i, !0) + "</i>" : this.getText(i, !0)
                }
                i = i.nextSibling
            }
            return s
        }
        return e.innerText ? e.innerText : e.textContent ? e.textContent : ""
    },
    testLeft: function(e) {
        return "left" == e.getAttribute("align") || "left" == e.style.textAlign ? !0 : !1
    },
    testCenter: function(e) {
        return "center" == e.getAttribute("align") || "center" == e.style.textAlign ? !0 : !1
    },
    testRight: function(e) {
        return "right" == e.getAttribute("align") || "right" == e.style.textAlign || hasClass(e, "wk_right") && !e.style.textAlign ? !0 : !1
    },
    showLengthMsg: function() {
        this.lengthMsg || setTimeout(showFastBox({
            title: getLang("global_error")
        }, this.lang.too_long || "text too long", getLang("global_close")).hide, 2e3)
    },
    onChangeHandler: function() {
        this.changed = !0, this.onChange && this.onChange()
    },
    val: function() {
        if (this.plainMode) e = this.textarea.value;
        else {
            if (!this.cont) return !1;
            var e = this.getContent(this.cont, 0);
            e = e.replace(this.re.lineBr, function(e) {
                for (var t = e.length - 2, i = ""; t--;) i += "<br/>";
                return "\n" + i + "\n"
            }), this.wikiPref && (e = this.wikiPref + e)
        }
        return e.length > 19e3 ? (this.showLengthMsg(), !1) : (this.textarea.value = e, e)
    },
    re: {
        n: new RegExp("\n", "g"),
        nn: new RegExp("\n\n", "g"),
        sp: new RegExp("[ ]+", "g"),
        endSp: new RegExp("[  ]+$"),
        startSp: new RegExp("^[  ]+"),
        trimSp: new RegExp("^ | $", "g"),
        trimN: new RegExp("^\n|\n$", "g"),
        letter: new RegExp("[^\\s\n]"),
        photoHref: new RegExp("photo([-0-9]+)(_[-0-9]+)?"),
        videoHref: new RegExp("video([-0-9]+)(_[-0-9]+)?"),
        lineBr: new RegExp("\n([\n]+)\n", "g"),
        header: new RegExp("wk(_sub)?(_sub)?_header"),
        noteHref: new RegExp("^/?note([0-9]+)_([0-9]+)"),
        topicHref: new RegExp("^/?topic([-0-9]+)_([0-9]+)"),
        pageWikiHref: new RegExp("^/?page([\x00-9]+)_([0-9]+)"),
        away: new RegExp("/away\\.php\\?to=([^&]+)"),
        pageHref: new RegExp("(?:[/|.]vk.com|^)/(?:pages|developers)?(?:.*&)?p=([^&]+)"),
        devHref: new RegExp("(?:[/|.]vk.com|^)/dev/([^?#]+)"),
        pageId: new RegExp("[/|.]vk.com/(page[-0-9]+_[-0-9]+)"),
        audio: new RegExp("audio([-0-9]+)_([-0-9]+)(_[0-9]+)?"),
        wikiLi: new RegExp("^([*#])"),
        notWords: new RegExp("([\\[\\]\\(\\)\\|\\/'\"\\*<>]+)", "g"),
        colWidth: new RegExp("width: ([0-9]+)%")
    }
});
try {
    stManager.done("wk_editor.js")
} catch (e) {}