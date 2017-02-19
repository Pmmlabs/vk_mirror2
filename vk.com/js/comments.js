var comments = {

    __comment_layer: "comment",
    __error_class: "msg",
    __url: location.pathname,
    __callback_after_delete: null,
    __callback_after_restore: null,

    __onCommentDeleted: function(params, responseText) {
        if (ge(this.__comment_layer + params.id))
            ge(this.__comment_layer + params.id).innerHTML = responseText;
        if (params.act == 'a_delete_comment' && this.__callback_after_delete) this.__callback_after_delete(params);
        else if (params.act == 'a_restore_comment' && this.__callback_after_restore) this.__callback_after_restore(params);
    },

    __onCommentFailed: function(params, responseText) {
        var error = responseText.length ? responseText : 'Request error.';
        if (ge(this.__comment_layer + params.id))
            ge(this.__comment_layer + params.id).innerHTML = '<div class="' + this.__error_class + '" style="">' + error + '</div>';
    },

    __prepareAjax: function() {
        var ajax = new Ajax();
        var self = this;
        ajax.onDone = function(ajax, responseText) {
            self.__onCommentDeleted(ajax.params, responseText);
        };
        ajax.onFail = function(ajax, responseText) {
            self.__onCommentFailed(ajax.params, responseText);
        };
        ajax.updateField = this.__comment_layer;
        ajax.errorClass = this.__error_class;
        return ajax;
    },

    setup: function(obj) {
        if (obj.commentLayer) this.__comment_layer = obj.commentLayer;
        if (obj.errorLayer) this.__error_layer = obj.errorLayer;
        if (obj.url) this.__url = obj.url;
        if (obj.afterDelete) this.__callback_after_delete = obj.afterDelete;
        if (obj.afterRestore) this.__callback_after_restore = obj.afterRestore;
        this.__initiated = true;
    },

    deleteComment: function(params) {
        var ajax = this.__prepareAjax();
        params.act = 'a_delete_comment';
        ajax.params = params;
        ajax.updateField = this.__comment_layer;
        ajax.post(this.__url, params);
    },

    restoreComment: function(params) {
        var ajax = this.__prepareAjax();
        params.act = 'a_restore_comment';
        ajax.params = params;
        ajax.updateField = this.__comment_layer;
        ajax.post(this.__url, params);
    }
};