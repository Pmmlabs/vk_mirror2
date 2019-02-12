var StoriesAdmin = {
    init: function(currentGroup) {
        StoriesAdmin.currentChannel = currentGroup;
    },


    addStoriesForm: function(event) {
        StoriesAdmin.currentDialog = showBox('/al_stories_admin.php', {
            act: 'stories_upload_form',
            channel_id: StoriesAdmin.currentChannel
        }, {
            params: {
                'hideButtons': true
            }
        });
    },

    hideStories: function(btn) {
        var section = gpeByClass('_stories_list__section', btn);
        addClass(section, 'stories_list__section--hidden');
    },

    showStories: function(btn) {
        var section = gpeByClass('_stories_list__section', btn);
        removeClass(section, 'stories_list__section--hidden');
    },

    setActiveChannel: function(channelId, tab, forceRenew) {
        if (channelId == StoriesAdmin.currentChannel && !forceRenew) {
            return;
        }
        var publicsList = ge('stories_admin_publics_list');
        var tabs = geByClass('_public', publicsList);
        each(tabs, function(idx, el) {
            removeClass(el, 'public--selected');
        });
        StoriesAdmin.currentChannel = channelId;
        if (!tab) {
            tab = ge('stories_admin_group_' + channelId)
        }
        addClass(tab, 'public--selected');
        var storiesContainer = ge('stories_admin__stories_block');
        storiesContainer.innerHTML = '<div class="no_stories_msg"></div>';
        var progressBar = geByClass1('no_stories_msg', storiesContainer);
        showProgress(progressBar);
        var requestedChannel = StoriesAdmin.currentChannel;

        ajax.post('al_stories_admin.php', {
            act: 'get_channel_stories',
            channel: StoriesAdmin.currentChannel
        }, {
            onDone: function(html) {
                if (requestedChannel != StoriesAdmin.currentChannel) { // �� ������ �������� ������������ �����
                    return;
                }
                storiesContainer.innerHTML = html;
            }
        })
    },

    showStory: function(storyRaw, access_hash, expiredHash, event) {
        cancelEvent(event);
        showStory(storyRaw + '/' + storyRaw + '/hash=' + access_hash + ';expired_hash=' + expiredHash);
    },

    addChannelForm: function(hash, rhash) {
        StoriesAdmin.currentDialog = showBox('/al_stories_admin.php', {
            act: 'add_channel_box',
            hash: hash,
            rhash: rhash
        }, {
            params: {
                'width': 400,
                'hideButtons': true
            }
        });
    },

    searchChannel: function(input, hash, rhash) {
        var q = input.value.trim();
        if (StoriesAdmin.__previousChannelSearchQuery == q) {
            return;
        }
        StoriesAdmin.__previousChannelSearchQuery = q;

        var ajaxId = (new Date).getTime();
        StoriesAdmin.__last_ajax_id = ajaxId;
        var inputWrapper = gpeByClass('stories_admin__search_container', input);
        addClass(inputWrapper, 'ui_search_loading');

        var form = ge('stories_admin__new_channel_form');
        var htmlHandler = geByClass1('new_channel_form__result_handler', form);
        htmlHandler.innerHTML = '';

        ajax.post('al_stories_admin.php', {
            act: 'get_channel',
            query: q,
            hash: hash,
            rhash: rhash
        }, {
            onDone: function(html) {
                if (ajaxId != StoriesAdmin.__last_ajax_id) { // �� ������ �������� ������������ �����
                    return;
                }
                removeClass(inputWrapper, 'ui_search_loading');
                disable(htmlHandler, false);
                htmlHandler.innerHTML = html;
            }
        })
    },

    addChannel: function(channel_id, btn, hash, rhash) {
        lockButton(btn);
        ajax.post('al_stories_admin.php', {
            act: 'add_channel',
            channel: channel_id,
            hash: hash,
            rhash: rhash
        }, {
            onDone: function(html) {
                StoriesAdmin._closeDialog();
                var channelsMenu = ge('stories_admin_publics_list');
                var channels = geByClass1('_stories_publics__list_wrapper', channelsMenu);
                channels.innerHTML = html;
                StoriesAdmin.setActiveChannel(channel_id, null, true);
            },
            onFail: function() {
                StoriesAdmin._closeDialog();
            }
        })

    },

    _closeDialog: function() {
        if (!StoriesAdmin.currentDialog) {
            return;
        }
        StoriesAdmin.currentDialog.hide();
        StoriesAdmin.currentDialog = null;
    },

    newStoryUploadFile: function(ownerId, inputEl, hash, rhash) {
        try {
            var args = StoriesAdmin._validateForm();
        } catch (e) {
            showFastBox(getLang('stories_admin_error'), e.message);
            return;
        }

        var files = inputEl.files;
        if (files.length < 1) {
            return;
        }
        var storyFile = files[0];
        var fileType = null;
        if (storyFile.type == 'image/jpeg' || storyFile.type == 'image/png') {
            fileType = 'image';
        } else if (storyFile.type == 'video/mp4' || storyFile.type == 'video/quicktime') {
            fileType = 'video';
        } else {
            return;
        }


        args.act = 'get_upload_link';
        args.type = fileType;
        args.owner_id = ownerId;
        ajax.post('al_stories_admin.php', args, {
            onDone: function(link) {
                try {
                    StoriesAdmin._uploadStoryToLink(storyFile, link, hash, rhash);
                } catch (e) {
                    console.log(e);
                }
            },
            onFail: function() {
                showFastBox('', getLang('stories_admin_no_connection'));
            }
        });
        var btn = inputEl.previousSibling;
        btn.innerHTML = '���������';
        lockButton(btn);
    },

    validateBeforeClick: function() {
        try {
            StoriesAdmin._validateForm();
        } catch (e) {
            showFastBox(getLang('stories_admin_error'), e.message);
            return false;
        }
        return true;
    },

    _validateForm: function() {
        var result = {};
        var maskId = val('mask_id').trim();
        var linkText = ge('link_text');
        linkText = linkText.options[linkText.selectedIndex].value;
        var linkUrl = val('link_url').trim();
        var replyToStory = val('reply_to_story').trim();
        var is_ads = ge('is_ads').checked;

        if (maskId) {
            if (!/^-?[0-9]+_[0-9]+$/.test(maskId)) {
                throw new Error(getLang('stories_admin_wrong_mask_id'));
            }
            result.mask_id = maskId
        }

        if (linkText) {
            var pattern = new RegExp('^(https?:\/\/)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}.+');
            if (!pattern.test(linkUrl)) {
                throw new Error(getLang('stories_admin_wrong_url'));
            }
            result.link_text_key = linkText;
            result.link_url = linkUrl;
        }

        if (replyToStory) {
            replyToStory = replyToStory.match(/-?[0-9]+_[0-9]+/);
            if (!replyToStory[0]) {
                throw new Error(getLang('stories_admin_wrong_story_id'));
            }
            result.reply_to_story = replyToStory[0];
        }
        if (is_ads) {
            result.is_ads = is_ads;
        }
        return result;
    },

    /**
     * @nsh
     * @see ajax.post :)
     */
    _uploadStoryToLink: function(file, link, hash, rhash) {
        var formData = new FormData();
        formData.append('file', file);
        link += '&ajx=1';
        var XHR = (browser.msie && intval(browser.version) < 10) ? window.XDomainRequest : window.XMLHttpRequest;
        var xhr = new XHR();
        xhr.open('POST', link, true);
        xhr.onload = function(event) {
            StoriesAdmin._successStoryUploadHandler(xhr, event, hash, rhash)
        };
        xhr.upload.onprogress = function(event) {
            StoriesAdmin._successStoryUploadProgressHandler(xhr, event)
        };
        xhr.send(formData);
    },

    _successStoryUploadProgressHandler: function(xhr, event) {
        if (xhr.readyState === 4) {
            return;
        }
    },

    _successStoryUploadHandler: function(xhr, event, hash, rhash) {
        var response = null;
        try {
            response = JSON.parse(xhr.response)
        } catch (e) {
            showFastBox('', getLang('stories_admin_uploading_error'));
            return;
        }
        if (response.error) {
            showFastBox(getLang('stories_admin_storage_error'), response.error.type);
            return;
        }
        var story = response.response.story;
        ajax.post('al_stories_admin.php', {
            act: 'register_story',
            owner_id: story.owner_id,
            story_id: story.id,
            hash: hash,
            rhash: rhash
        }, {
            onDone: function(html) {
                StoriesAdmin.currentDialog.hide();
                var storiesContainer = ge('stories_admin__stories_block');
                storiesContainer.innerHTML = html;
            }
        });
    },

    deleteStory: function(story_raw_id, hash, rhash, event) {
        event.stopPropagation();
        ajax.post('al_stories_admin.php', {
            act: 'delete_story',
            story_raw_id: story_raw_id,
            hash: hash,
            rhash: rhash
        }, {
            onDone: this.setActiveChannel(this.currentChannel, null, true)
        });
    }
};

try {
    stManager.done('stories_admin.js');
} catch (e) {}