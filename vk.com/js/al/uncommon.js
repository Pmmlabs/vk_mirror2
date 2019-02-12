function mentionSubscribe(btn, oid, hash) {
    if (buttonLocked(btn)) return;

    var subscribed = hasClass(btn, 'secondary'),
        reqOptions = {
            showProgress: lockButton.pbind(btn),
            hideProgress: unlockButton.pbind(btn),
            onDone: function() {
                toggleClass(btn, 'secondary');
            }
        };
    if (oid > 0) {
        ajax.post('al_friends.php', {
            act: (subscribed ? 'remove' : 'add'),
            mid: oid,
            hash: hash,
            from: 'mention_tt'
        }, reqOptions);
    } else {
        ajax.post('al_groups.php', {
            act: (subscribed ? 'a_leave' : 'a_enter'),
            gid: -oid,
            hash: hash,
            from: 'mention_tt'
        }, reqOptions);
    }
}

try {
    stManager.done('uncommon.js');
} catch (e) {}