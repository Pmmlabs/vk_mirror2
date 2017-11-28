var Cheatgroups = {
    getPage: function(o) {
        var h = nav.objLoc;
        o ? h.offset = o : h.offset && delete h.offset, nav.go(h)
    },
    goodChildGroup: function(o, h) {
        showBox("cheatgroups.php", {
            act: "a_good_child_group_box",
            gid: o,
            hash: h
        }, {
            params: {
                width: 350
            }
        })
    },
    notGoodChildGroup: function(o, h) {
        showBox("cheatgroups.php", {
            act: "a_not_good_child_group_box",
            gid: o,
            hash: h
        }, {
            params: {
                width: 350
            }
        })
    },
    blockChildGroup: function(o, h) {
        showBox("cheatgroups.php", {
            act: "a_block_child_group_box",
            gid: o,
            hash: h
        }, {
            params: {
                width: 350
            }
        })
    },
    unblockChildGroup: function(o, h) {
        showBox("cheatgroups.php", {
            act: "a_unblock_child_group_box",
            gid: o,
            hash: h
        }, {
            params: {
                width: 350
            }
        })
    },
    commentChildGroup: function(o, h) {
        showBox("cheatgroups.php", {
            act: "a_comment_child_group_box",
            gid: o,
            hash: h
        }, {
            params: {
                width: 350
            }
        })
    },
    archiveChildGroup: function(o, h) {
        ajax.post("cheatgroups.php", {
            act: "a_archive_child_group",
            gid: o,
            hash: h
        }, {
            onDone: function(h) {
                Cheatgroups.onOptionUsed(o, h)
            }
        })
    },
    unArchiveChildGroup: function(o, h) {
        ajax.post("cheatgroups.php", {
            act: "a_unarchive_child_group",
            gid: o,
            hash: h
        }, {
            onDone: function(h) {
                Cheatgroups.onOptionUsed(o, h)
            }
        })
    },
    onOptionUsed: function(o, h) {
        val("inv" + o, h), hide("cheatgroups_row_options_list" + o)
    },
    onDoneCommentChildGroup: function(o, h) {
        val("childGroup" + o + "_comments", h)
    },
    _eof: 1
};
try {
    stManager.done("cheatgroups.js")
} catch (e) {}