var Cheatgroups = {
    getPage: function(offset) {
        var obj = nav.objLoc;
        if (offset) {
            obj.offset = offset;
        } else if (obj.offset) {
            delete obj['offset'];
        }
        nav.go(obj);
    },
    goodChildGroup: function(gid, hash) {
        showBox('cheatgroups.php', {
            act: 'a_good_child_group_box',
            gid: gid,
            hash: hash
        }, {
            params: {
                width: 350
            }
        });
    },
    notGoodChildGroup: function(gid, hash) {
        showBox('cheatgroups.php', {
            act: 'a_not_good_child_group_box',
            gid: gid,
            hash: hash
        }, {
            params: {
                width: 350
            }
        });
    },
    blockChildGroup: function(gid, hash) {
        showBox('cheatgroups.php', {
            act: 'a_block_child_group_box',
            gid: gid,
            hash: hash
        }, {
            params: {
                width: 350
            }
        });
    },
    unblockChildGroup: function(gid, hash) {
        showBox('cheatgroups.php', {
            act: 'a_unblock_child_group_box',
            gid: gid,
            hash: hash
        }, {
            params: {
                width: 350
            }
        });
    },
    commentChildGroup: function(gid, hash) {
        showBox('cheatgroups.php', {
            act: 'a_comment_child_group_box',
            gid: gid,
            hash: hash
        }, {
            params: {
                width: 350
            }
        });
    },
    archiveChildGroup: function(gid, hash) {
        ajax.post('cheatgroups.php', {
            act: 'a_archive_child_group',
            gid: gid,
            hash: hash
        }, {
            onDone: function(text) {
                Cheatgroups.onOptionUsed(gid, text);
            }
        });
    },
    unArchiveChildGroup: function(gid, hash) {
        ajax.post('cheatgroups.php', {
            act: 'a_unarchive_child_group',
            gid: gid,
            hash: hash
        }, {
            onDone: function(text) {
                Cheatgroups.onOptionUsed(gid, text);
            }
        });
    },
    onOptionUsed: function(gid, text) {
        val('inv' + gid, text);
        hide('cheatgroups_row_options_list' + gid);
    },
    onDoneCommentChildGroup: function(gid, comments) {
        val('childGroup' + gid + '_comments', comments);
    },
    _eof: 1
};
try {
    stManager.done('cheatgroups.js');
} catch (e) {}