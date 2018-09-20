onDomReady(function() {
    try {
        pattern = /&activated=1/;
        if (pattern.test(location.href)) {
            hide('unfinished_payments');
        }
    } catch (e) {}
});