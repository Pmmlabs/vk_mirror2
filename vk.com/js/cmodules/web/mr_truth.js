! function(t) {
    function e(a) {
        if (r[a]) return r[a].exports;
        var o = r[a] = {
            exports: {},
            id: a,
            loaded: !1
        };
        return t[a].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports
    }
    var r = {};
    return e.m = t, e.c = r, e.p = "", e(0)
}({
    0: function(t, e, r) {
        t.exports = r(35)
    },
    35: function(t, e) {
        "use strict";
        window.MrTruth = {
            init: function() {
                var t = geByClass1("mr_truth_send_form_text");
                Emoji.init(t, {
                    ttDiff: 75,
                    noStickersStore: !0,
                    rPointer: !0,
                    onSend: this.sendMessage,
                    forceUp: !0,
                    controlsCont: geByClass1("mr_truth_send_form"),
                    onKeyAction: this.formOnKeyUp,
                    onStickerSend: this._onStickerSend,
                    global: !0,
                    ref: "mr_truth"
                }), FastChat.getSettings(), MrTruth._initUpload()
            },
            formOnKeyUp: function() {
                var t = MrTruth.formGetText().length > 0;
                t || (t = MrTruth._getMedia().length > 0), cur.selectedChat || (t = !1), toggleClass(geByClass1("mt_trust_send_button"), "active", t)
            },
            formGetText: function() {
                return trim(Emoji.val(geByClass1("mr_truth_send_form_text")))
            },
            selectChat: function(t, e) {
                removeClass(geByClass1("chat_selected"), "chat_selected"), addClass(e, "chat_selected"), cur.selectedChat = t, cur.selecteChatHash = attr(e, "data-hash"), val(geByClass1("mr_truth_selected_chat_img"), val(geByClass1("mr_truth_chats_list_item_photo", e))), val(geByClass1("mr_truth_selected_chat_name"), val(geByClass1("mr_truth_chats_list_item_name", e))), val(geByClass1("mr_truth_selected_chat_count"), attr(e, "data-count")), addClass(geByClass1("mr_truth_selected_chat"), "selected"), MrTruth.formOnKeyUp()
            },
            switchPage: function(t, e) {
                removeClass(geByClass1("mr_truth_page_shown"), "mr_truth_page_shown"), addClass(e + "_page", "mr_truth_page_shown"), removeClass(geByClass1("mr_truth_header_button_active"), "mr_truth_header_button_active"), addClass(t, "mr_truth_header_button_active")
            },
            toggle: function(t, e) {
                var r = geByClass1("_ui_toggler", t);
                hasClass(r, "on") ? (removeClass(r, "on"), this.confirmHide(), this.action("off", e), re("chat_" + e), intval(e) === intval(cur.selectedChat) && (val(geByClass1("mr_truth_selected_chat_name"), getLang("communityApps_mr_truth_chat_placeholder")), val(geByClass1("mr_truth_selected_chat_count"), ""), removeClass(geByClass1("mr_truth_selected_chat"), "selected"), val(geByClass1("mr_truth_selected_chat_img"), ""), delete cur.selectedChat)) : (cur.chatId = e, this.confirmShow())
            },
            action: function(t, e) {
                ajax.post("mr_truth.php", {
                    act: "action",
                    action: t,
                    hash: cur.mr_truth_action_hash,
                    chat_id: e,
                    access_token: cur.access_token
                }, {
                    onDone: function() {
                        var r = geByClass1("_ui_toggler", "chat_settings_" + e);
                        if (toggleClass(r, "on", "on" === t), MrTruth.confirmHide(), "on" === t) {
                            var a = ge("chat_settings_" + e),
                                o = cur.mr_truth_chat_tpl.replace(/\{id\}/g, e).replace("{name}", val(geByClass1("mr_truth_chats_list_item_name", a))).replace("{photo}", val(geByClass1("mr_truth_chats_list_item_photo", a))).replace("{count}", attr(a, "data-count")).replace("{hash}", attr(a, "data-hash")),
                                s = se(o),
                                n = ge("chats");
                            n.insertBefore(s, n.firstChild), re(geByClass1("mr_truth_no_chats_msg", "chats"))
                        }
                    },
                    showProgress: function() {
                        "on" === t && (lockButton("confirm_continue_btn"), addClass("confirm_cancel_btn", "button_disabled"))
                    },
                    hideProgress: function() {
                        "on" === t && (unlockButton("confirm_continue_btn"), removeClass("confirm_cancel_btn", "button_disabled"))
                    }
                })
            },
            confirmHide: function() {
                removeClass("mr_truth_confirm", "shown")
            },
            confirmShow: function() {
                addClass("mr_truth_confirm", "shown")
            },
            confirm: function() {
                this.action("on", cur.chatId)
            },
            _getMedia: function(t) {
                for (var e = [], r = geByClass1("mr_truth_attach_wrap").children, a = 0; a < r.length; a++) {
                    var o = r[a];
                    (attr(o, "data-uploaded") && !attr(o, "data-canceled") || t) && e.push("photo:" + attr(o, "data-photo"))
                }
                return e
            },
            sendMessage: function(t) {
                if (t = t || {}, cur.selectedChat && !cur.sending) {
                    cur.sending = !0;
                    var e = [];
                    t.stickerId ? e.push("sticker:" + t.stickerId) : e = MrTruth._getMedia();
                    var r = trim(MrTruth.formGetText());
                    if (r || e.length) {
                        var a = geByClass1("mt_trust_send_button");
                        ajax.post("mr_truth.php", {
                            act: "send",
                            chat_id: cur.selectedChat,
                            hash: cur.selecteChatHash,
                            msg: r,
                            media: e.join(","),
                            access_token: cur.access_token
                        }, {
                            onDone: function() {
                                t.stickerId || (Emoji.val(geByClass1("mr_truth_send_form_text"), ""), val(geByClass1("mr_truth_attach_wrap"), "")), MrTruth.formOnKeyUp(), showDoneBox(getLang("communityApps_mr_truth_messages_sent"))
                            },
                            onFail: function(t) {
                                return showDoneBox(getLang("global_unknown_error")), !0
                            },
                            showProgress: function() {
                                lockButton(a)
                            },
                            hideProgress: function() {
                                unlockButton(a), cur.sending = !1
                            }
                        })
                    }
                }
            },
            _onStickerSend: function(t) {
                MrTruth.sendMessage({
                    stickerId: t
                })
            },
            _initUpload: function() {
                var t = cur.mr_truth_upload_info,
                    e = {
                        file_name: "photo",
                        file_size_limit: 26214400,
                        file_types_description: "Image files (*.jpg, *.jpeg, *.png, *.gif)",
                        file_types: "*.jpg;*.JPG;*.jpeg;*.JPEG;*.png;*.PNG;*.gif;*.GIF;*.bmp;*.BMP",
                        accept: "image/*",
                        lang: t.lang,
                        max_files: 10,
                        clear: 1,
                        noFlash: 1,
                        signed: 1,
                        type: "photo",
                        buttonClass: "secondary small",
                        max_attempts: 3,
                        server: t.server,
                        base_url: t.server_base_url,
                        static_url: t.server_static_url,
                        check_url: t.check_url
                    };
                Upload.init(geByClass1("mr_truth_photo_icon"), t.upload_url, {}, extend(e, {
                    onUploadStart: function(t, e) {
                        geByClass1("mr_truth_attach_wrap").appendChild(se('\n          <div class="mr_truth_attach_photo" title="' + e + '" id="attach_photo_' + t.ind + '">\n            <div class="mr_truth_attach_photo_cancel" onclick="MrTruth.cancelUpload(this)"></div>\n            <div class="mr_truth_attach_photo_loader">\n              <svg class="mr_truth_attach_photo_loader_circular" viewBox="25 25 50 50">\n                <circle class="mr_truth_attach_photo_loader_path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10" stroke-dasharray="0,124"/>\n              </svg>\n            </div>\n          </div>\n        ')), MrTruth.updateUploadPhotoButton()
                    },
                    onUploadProgress: function(t, e, r) {
                        var a = e / r,
                            o = geByClass1("mr_truth_attach_photo_loader_path", "attach_photo_" + t),
                            s = o.getTotalLength();
                        attr(o, "stroke-dasharray", s * a + "," + s)
                    },
                    onUploadComplete: function(t, e) {
                        var r = ge("attach_photo_" + t);
                        if (attr(r, "data-canceled")) return re(r);
                        var a = parseJSON(e) || {
                            error: "ERR_CLIENT_BAD_RESPONSE: bad request response"
                        };
                        if (a.error || !a.photos) {
                            var o = void 0;
                            return o = "ERR_UPLOAD_BAD_IMAGE_SIZE" === a.error || a.error.indexOf('result "1"') > -1 ? getLang("global_error_occured") : a.error, re("attach_photo_" + t), MrTruth.updateUploadPhotoButton(), void topError(o, {
                                dt: 3
                            })
                        }
                        MrTruth._saveUploadedPhoto(a, t), MrTruth.updateUploadPhotoButton()
                    },
                    onUploadError: function(t) {
                        re("attach_photo_" + t), MrTruth.updateUploadPhotoButton()
                    }
                }))
            },
            updateUploadPhotoButton: function() {
                var t = MrTruth._getMedia(!0);
                toggle(geByClass1("mr_truth_photo_icon"), t.length < 10)
            },
            _saveUploadedPhoto: function(t, e) {
                t.photos = JSON.stringify(t.photos), t.access_token = cur.access_token, ajax.post("mr_truth.php", extend({
                    act: "save_photo"
                }, t), {
                    onDone: function(t, r) {
                        var a = ge("attach_photo_" + e);
                        re(geByClass1("mr_truth_attach_photo_loader", a)), attr(a, "data-photo", t), setStyle(a, "background-image", "url(" + r + ")"), attr(a, "id", ""), attr(a, "data-uploaded", 1), attr(a, "data-canceled") && re(a), MrTruth.formOnKeyUp(), MrTruth.updateUploadPhotoButton()
                    },
                    onFail: function() {
                        re("attach_photo_" + e), MrTruth.updateUploadPhotoButton()
                    }
                })
            },
            cancelUpload: function(t) {
                t = domPN(t), attr(t, "data-uploaded") ? re(t) : (attr(t, "data-canceled", 1), hide(t)), MrTruth.updateUploadPhotoButton()
            }
        }
    }
});