events = {

    addEvent: function(obj, e, handler) {
        if (!obj._attachedEvents)
            obj._attachedEvents = new Array();
        if (obj._attachedEvents[e])
            this.removeEvent(obj, e);
        obj._attachedEvents[e] = handler;

        if (obj.addEventListener)
            obj.addEventListener(e, handler, false);
        else if (obj.attachEvent)
            obj.attachEvent('on' + e, handler);
    },

    removeEvent: function(obj, e) {
        if (!obj._attachedEvents || !obj._attachedEvents[e])
            return;

        if (obj.removeEventListener)
            obj.removeEventListener(e, obj._attachedEvents[e], false);
        else if (obj.detachEvent)
            obj.detachEvent('on' + e, obj._attachedEvents[e]);
        obj._attachedEvents[e] = null;
    },

    cancelEvent: function(e) {
        e = e || window.event;

        if (e.preventDefault)
            e.preventDefault();
        if (e.stopPropagation)
            e.stopPropagation();
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
    },

    getTarget: function(e) {
        return e.srcElement || e.target;
    }
};