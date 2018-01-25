function mentionSubscribe(o, n, t) {
    if (!buttonLocked(o)) {
        var a = hasClass(o, "secondary"),
            e = {
                showProgress: lockButton.pbind(o),
                hideProgress: unlockButton.pbind(o),
                onDone: function() {
                    toggleClass(o, "secondary")
                }
            };
        n > 0 ? ajax.post("al_friends.php", {
            act: a ? "remove" : "add",
            mid: n,
            hash: t,
            from: "mention_tt"
        }, e) : ajax.post("al_groups.php", {
            act: a ? "a_leave" : "a_enter",
            gid: -n,
            hash: t,
            from: "mention_tt"
        }, e)
    }
}
try {
    stManager.done("uncommon.js")
} catch (e) {}