window.WAddCommunityApp = {

    popupInit: function() {
        extend(cur, {
            popupSelectedGroups: {},
            popupSubmitBtnEl: geByClass1('_add_community_app_submit'),
            popupCancelBtnEl: geByClass1('_add_community_app_cancel'),
            popupCloseBtnEl: geByClass1('_add_community_app_close'),
            popupGroupsWrapperEl: geByClass1('_add_community_app_groups'),
            popupContentEl: geByClass1('_add_community_app_content')
        });
        cur.popupGroupsEls = geByClass('flist_item', cur.popupGroupsWrapperEl, 'div');

        disableButton(cur.popupSubmitBtnEl, true);
        cur.popupGroupsEls.length == 1 && this.popupSelectGroup(cur.popupGroupsEls[0]);
        each(cur.popupGroupsEls, function(k, v) {
            addEvent(v, 'click', this.popupSelectGroup.bind(this, v));
        }.bind(this));
        addEvent(cur.popupSubmitBtnEl, 'click', this.popupSubmit.bind(this, false));

        window.opener && show(cur.popupCancelBtnEl);
    },

    popupSelectGroup: function(el) {
        if (hasClass(el, 'flist_item_disabled')) {
            return;
        }
        var checkedClass = 'flist_item_checked',
            gid = intval(el.getAttribute('data-id')),
            link = trim(el.getAttribute('data-link'));
        if (cur.popupSingleGroupSelectorMode) {
            each(cur.popupGroupsEls, function(k, v) {
                (v === el ? addClass : removeClass)(v.parentNode, checkedClass);
            });
            cur.popupSelectedGroups = {};
            cur.popupSelectedGroups[gid] = link;
        } else {
            if (cur.popupSelectedGroups[gid] !== void 0) {
                removeClass(el.parentNode, checkedClass);
                delete cur.popupSelectedGroups[gid];
            } else {
                addClass(el.parentNode, checkedClass);
                cur.popupSelectedGroups[gid] = link;
            }
        }
        disableButton(cur.popupSubmitBtnEl, !Object.keys(cur.popupSelectedGroups).length);
    },

    popupSubmit: function(no_check) {
        var group = null,
            gids = Object.keys(cur.popupSelectedGroups);

        if (!no_check) {
            if (!cur.hide_replace_alert) {
                for (gid in cur.popupSelectedGroups) {
                    if (cur.popupSelectedGroups[gid] !== '') {
                        var text = gids.length > 1 ? langStr(getLang('widgets_add_community_app_confirm_multi'), 'app_link', cur.alink) : langStr(getLang('widgets_add_community_app_confirm'), 'app_link', cur.alink, 'group_link', cur.popupSelectedGroups[gid]);
                        var box = showFastBox(getLang('global_action_confirmation'), text, getLang('global_add'), function() {
                            box.hide();
                            this.popupSubmit(true);
                        }.bind(this), getLang('global_cancel'));
                        return;
                    }
                }
            }
        }

        if (isVisible(cur.popupSubmitBtnEl) && !buttonLocked(cur.popupSubmitBtnEl) && gids.length) {
            ajax.post('add_community_app.php', {
                act: 'a_add_app',
                aid: cur.aid,
                redirect_uri: cur.popupRedirectUri,
                hash: cur.popupHash,
                gids: gids.join(',')
            }, {
                onDone: function(html, img) {
                    val(cur.popupContentEl, html);
                    hide(cur.popupSubmitBtnEl);
                    hide(cur.popupCancelBtnEl);
                    window.opener && show(cur.popupCloseBtnEl);
                    img && cur.popupContentEl.appendChild(cf(img));
                },
                showProgress: lockButton.pbind(cur.popupSubmitBtnEl),
                hideProgress: unlockButton.pbind(cur.popupSubmitBtnEl)
            });
        }
    }

};

try {
    stManager.done('api/widgets/al_add_community_app.js');
} catch (e) {}