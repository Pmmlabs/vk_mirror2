var StoriesAdmin = {
    init: function(e) {
        StoriesAdmin.currentChannel = e
    },
    addStoriesForm: function(e) {
        StoriesAdmin.currentDialog = showBox("/al_stories_admin.php", {
            act: "stories_upload_form",
            channel_id: StoriesAdmin.currentChannel
        }, {
            params: {
                hideButtons: !0
            }
        })
    },
    hideStories: function(e) {
        var n = gpeByClass("_stories_list__section", e);
        addClass(n, "stories_list__section--hidden")
    },
    showStories: function(e) {
        var n = gpeByClass("_stories_list__section", e);
        removeClass(n, "stories_list__section--hidden")
    },
    setActiveChannel: function(e, n, i) {
        if (e != StoriesAdmin.currentChannel || i) {
            var r = ge("stories_admin_publics_list"),
                s = geByClass("_public", r);
            each(s, function(e, n) {
                removeClass(n, "public--selected")
            }), StoriesAdmin.currentChannel = e, n || (n = ge("stories_admin_group_" + e)), addClass(n, "public--selected");
            var o = ge("stories_admin__stories_block");
            o.innerHTML = '<div class="no_stories_msg"></div>';
            var t = geByClass1("no_stories_msg", o);
            showProgress(t);
            var a = StoriesAdmin.currentChannel;
            ajax.post("al_stories_admin.php", {
                act: "get_channel_stories",
                channel: StoriesAdmin.currentChannel
            }, {
                onDone: function(e) {
                    a == StoriesAdmin.currentChannel && (o.innerHTML = e)
                }
            })
        }
    },
    showStory: function(e, n, i, r) {
        cancelEvent(r), showStory(e + "/" + e + "/hash=" + n + ";expired_hash=" + i)
    },
    addChannelForm: function(e, n) {
        StoriesAdmin.currentDialog = showBox("/al_stories_admin.php", {
            act: "add_channel_box",
            hash: e,
            rhash: n
        }, {
            params: {
                width: 400,
                hideButtons: !0
            }
        })
    },
    searchChannel: function(e, n, i) {
        var r = e.value.trim();
        if (StoriesAdmin.__previousChannelSearchQuery != r) {
            StoriesAdmin.__previousChannelSearchQuery = r;
            var s = (new Date).getTime();
            StoriesAdmin.__last_ajax_id = s;
            var o = gpeByClass("stories_admin__search_container", e);
            addClass(o, "ui_search_loading");
            var t = ge("stories_admin__new_channel_form"),
                a = geByClass1("new_channel_form__result_handler", t);
            a.innerHTML = "", ajax.post("al_stories_admin.php", {
                act: "get_channel",
                query: r,
                hash: n,
                rhash: i
            }, {
                onDone: function(e) {
                    s == StoriesAdmin.__last_ajax_id && (removeClass(o, "ui_search_loading"), disable(a, !1), a.innerHTML = e)
                }
            })
        }
    },
    addChannel: function(e, n, i, r) {
        lockButton(n), ajax.post("al_stories_admin.php", {
            act: "add_channel",
            channel: e,
            hash: i,
            rhash: r
        }, {
            onDone: function(n) {
                StoriesAdmin._closeDialog();
                var i = ge("stories_admin_publics_list"),
                    r = geByClass1("_stories_publics__list_wrapper", i);
                r.innerHTML = n, StoriesAdmin.setActiveChannel(e, null, !0)
            },
            onFail: function() {
                StoriesAdmin._closeDialog()
            }
        })
    },
    _closeDialog: function() {
        StoriesAdmin.currentDialog && (StoriesAdmin.currentDialog.hide(), StoriesAdmin.currentDialog = null)
    },
    newStoryUploadFile: function(e, n, i, r) {
        try {
            var s = StoriesAdmin._validateForm()
        } catch (o) {
            return void showFastBox(getLang("stories_admin_error"), o.message)
        }
        var t = n.files;
        if (!(t.length < 1)) {
            var a = t[0],
                _ = null;
            if ("image/jpeg" == a.type || "image/png" == a.type) _ = "image";
            else {
                if ("video/mp4" != a.type && "video/quicktime" != a.type) return;
                _ = "video"
            }
            s.act = "get_upload_link", s.type = _, s.owner_id = e, ajax.post("al_stories_admin.php", s, {
                onDone: function(e) {
                    try {
                        StoriesAdmin._uploadStoryToLink(a, e, i, r)
                    } catch (n) {
                        console.log(n)
                    }
                },
                onFail: function() {
                    showFastBox("", getLang("stories_admin_no_connection"))
                }
            });
            var l = n.previousSibling;
            l.innerHTML = "���������", lockButton(l)
        }
    },
    validateBeforeClick: function() {
        try {
            StoriesAdmin._validateForm()
        } catch (e) {
            return showFastBox(getLang("stories_admin_error"), e.message), !1
        }
        return !0
    },
    _validateForm: function() {
        var e = {},
            n = val("mask_id").trim(),
            i = ge("link_text");
        i = i.options[i.selectedIndex].value;
        var r = val("link_url").trim(),
            s = val("reply_to_story").trim(),
            o = ge("is_ads").checked;
        if (n) {
            if (!/^-?[0-9]+_[0-9]+$/.test(n)) throw new Error(getLang("stories_admin_wrong_mask_id"));
            e.mask_id = n
        }
        if (i) {
            var t = new RegExp("^(https?://)?[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}.+");
            if (!t.test(r)) throw new Error(getLang("stories_admin_wrong_url"));
            e.link_text_key = i, e.link_url = r
        }
        if (s) {
            if (s = s.match(/-?[0-9]+_[0-9]+/), !s[0]) throw new Error(getLang("stories_admin_wrong_story_id"));
            e.reply_to_story = s[0]
        }
        return o && (e.is_ads = o), e
    },
    _uploadStoryToLink: function(e, n, i, r) {
        var s = new FormData;
        s.append("file", e), n += "&ajx=1";
        var o = browser.msie && intval(browser.version) < 10 ? window.XDomainRequest : window.XMLHttpRequest,
            t = new o;
        t.open("POST", n, !0), t.onload = function(e) {
            StoriesAdmin._successStoryUploadHandler(t, e, i, r)
        }, t.upload.onprogress = function(e) {
            StoriesAdmin._successStoryUploadProgressHandler(t, e)
        }, t.send(s)
    },
    _successStoryUploadProgressHandler: function(e, n) {
        4 === e.readyState
    },
    _successStoryUploadHandler: function(e, n, i, r) {
        var s = null;
        try {
            s = JSON.parse(e.response)
        } catch (o) {
            return void showFastBox("", getLang("stories_admin_uploading_error"))
        }
        if (s.error) return void showFastBox(getLang("stories_admin_storage_error"), s.error.type);
        var t = s.response.story;
        ajax.post("al_stories_admin.php", {
            act: "register_story",
            owner_id: t.owner_id,
            story_id: t.id,
            hash: i,
            rhash: r
        }, {
            onDone: function(e) {
                StoriesAdmin.currentDialog.hide();
                var n = ge("stories_admin__stories_block");
                n.innerHTML = e
            }
        })
    },
    deleteStory: function(e, n, i, r) {
        r.stopPropagation(), ajax.post("al_stories_admin.php", {
            act: "delete_story",
            story_raw_id: e,
            hash: n,
            rhash: i
        }, {
            onDone: this.setActiveChannel(this.currentChannel, null, !0)
        })
    }
};
try {
    stManager.done("stories_admin.js")
} catch (e) {}