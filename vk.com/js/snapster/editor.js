window.noteEditor = (function(noteEditor) {

    var M = {
        BOLD: 1,
        ITALIC: 2,
        MONO: 4,
        UNDERLINE: 8,

        H1: 16,
        H2: 32,
        QUOTE: 64,
    };

    var N = { // node types
        CONTENTS: 1,
        BLOCK: 2,
        TEXT: 4,
    };

    var aviableModify = {};
    aviableModify[N.TEXT] = [M.BOLD, M.ITALIC, M.MONO, M.UNDERLINE];
    aviableModify[N.BLOCK] = [M.H1, M.H2, M.QUOTE];

    noteEditor = function(wrap, opts) {
        if (!opts) {
            opts = {};
        }

        var _s = this;
        this.id = wrap;
        this.wrap = ge(wrap);

        this.historyPos = -1;
        this.history = [];

        addClass(this.wrap, 'note_editor_wrap');
        attr(this.wrap, 'contenteditable', true);
        attr(this.wrap, 'spellcheck', true);

        addEvent(this.wrap, 'keydown', this.onKeyDown.bind(this));
        addEvent(this.wrap, 'keypress', this.onKeyPress.bind(this));
        addEvent(this.wrap, 'mousedown', this.onMouseDown.bind(this));
        addEvent(this.wrap, 'blur', this.onBlur.bind(this));

        // init blocks container
        this.contents = new Node(this.wrap).setType(N.CONTENTS).render();

        // insert first block
        var firstBlock = new Node(this.contents).setType(N.BLOCK).addNode(N.TEXT).render();

        if (opts.modify_wrap) {
            this.modify_enabled = 1;
            this.modify_wrap = ge(opts.modify_wrap);
            addClass(this.modify_wrap, 'note_editor_modify_wrap clear_fix');

            var modify_list = ['bold', 'italic', 'mono', 'underline', 'h1', 'h2', 'quote'];
            for (var i in modify_list) {
                var el = ce('div', {
                    className: 'note_editor_modify_item fl_l',
                    innerHTML: modify_list[i],
                });
                var modify = modify_list[i].toUpperCase();
                addEvent(el, 'mousedown', _s.execModify.bind(this, M[modify]));
                this.modify_wrap.appendChild(el);
            }
        }
    }

    noteEditor.prototype = {
        onBlur: function() {
            this.lastSelection = Selection.getSelection();
        },
        onKeyDown: function(e) {
            if (e.keyCode == KEY.DEL) {
                cancelEvent(e);
                this.setTextRange({
                    sel: Selection.getSelection(),
                    is_clear: 1,
                    char: '',
                });
            }
            if ((e.metaKey || e.ctrlKey) && e.keyCode == 90) {
                cancelEvent(e);
                this.historyUnbo();
            }
            if ((e.metaKey || e.ctrlKey) && e.keyCode == 89) {
                cancelEvent(e);
                this.historyRebo();
            }
        },
        onKeyPress: function(e) {
            cancelEvent(e);
            this.setTextRange({
                sel: Selection.getSelection(),
                is_clear: e.keyCode == KEY.DEL,
                is_enter: e.keyCode == KEY.ENTER,
                char: Utils.prepareText(String.fromCharCode(e.keyCode || e.charCode) || ''),
            });
        },
        onMouseDown: function(e) {
            this.restoreLastSelection(e);
        },
        restoreLastSelection: function(e) {
            if (this.lastSelection && this.lastSelection.length > 0) {
                cancelEvent(e);
                this.selectRangeByOffsets(this.lastSelection);
            }
            delete this.lastSelection;
        },
        setTextRange: function(opts) {
            var is_clear = opts.is_clear;
            var is_enter = opts.is_enter;
            var char = opts.char;
            if (is_clear || is_enter) {
                char = '';
            }

            var sel = opts.sel;
            var nodes = nodeUtils.getAllNodesRange(sel);
            var is_range = sel.length > 0;
            var need_join = sel.startOffset == 0 && sel.startNode.parent.first === sel.startNode;
            var history_char = char;
            var clearNum = opts.clearNum ? opts.clearNum : 1;

            if (is_clear && !is_range) {
                sel.startOffset -= clearNum;
                sel.startAbsOffset = Math.max(0, sel.startAbsOffset - clearNum);
            }

            nodes = nodes.slice(1, nodes.length - 1);
            for (var i in nodes) {
                nodes[i].remove();
            }

            if (sel.startNode === sel.endNode) {
                var startText = sel.startNode.getText();

                if (is_clear) {
                    history_char = startText.slice(sel.startOffset, sel.endOffset);
                }

                sel.startNode.setText(startText.slice(0, Math.max(0, sel.startOffset)) + char + startText.slice(sel.endOffset));
                if (is_clear && !sel.startNode.getText()) {
                    if (sel.startNode.parent.first !== sel.startNode.parent.last) {
                        sel.startNode.remove();
                    } else if (sel.startOffset < 0) {
                        nodeUtils.removeAllModify(sel.startNode);
                    }
                }
            } else {
                if (is_clear) {
                    history_char = sel.startNode.getText().slice(sel.startOffset);
                }
                sel.startNode.setText(sel.startNode.getText().slice(0, sel.startOffset) + char);

                var endNewText = sel.endNode.getText().slice(sel.endOffset);
                sel.endNode.setText(endNewText);
                if (!endNewText && is_range) {
                    need_join = 1;
                }
            }
            if (char && !is_clear) {
                sel.startAbsOffset += char.length;
            }

            nodeUtils.mergeNodes(sel.startNode.parent);
            sel.startNode.parent.updateNode();
            if (sel.startNode !== sel.endNode) {
                nodeUtils.mergeNodes(sel.endNode.parent);
                sel.endNode.parent.updateNode();
            }

            if (is_enter) {
                var newNode = sel.startNode.splitNodeDeep(sel.startOffset);
                nodeUtils.forceUpdateParent(newNode);
                nodeUtils.forceUpdateParent(sel.startNode);
                Selection.moveCursorTo(nodeUtils.getParentNode(newNode), 0);
            } else if (is_clear && need_join || is_range && sel.startNode !== sel.endNode) {
                sel.endNode.joinNode();
            } else {
                this.selectByOffsets(sel);
            }

            if (!opts.no_history) {
                this.historyPush(is_clear ? 'clear_text_range' : 'set_text_range', {
                    sel: Selection.getSelection(),
                    char: history_char,
                });
            }
        },
        selectByOffsets: function(sel) {
            var start = nodeUtils.getNodeByOffset(this.contents.first, sel.startAbsOffset);
            Selection.moveCursorTo(start.node, start.offset);
        },
        selectRangeByOffsets: function(sel) {
            var start = nodeUtils.getNodeByOffset(this.contents.first, sel.startAbsOffset),
                end = nodeUtils.getNodeByOffset(this.contents.first, sel.endAbsOffset, 1);

            Selection.selectRange(start.node, start.offset, end.node, end.offset);
        },
        execModify: function(modify, e) {
            cancelEvent(e);

            this.restoreLastSelection();

            var sel = Selection.getSelection(1),
                is_range = sel.length > 0;

            if (is_range) {
                var range = nodeUtils.getNodeRange(sel);
            } else {
                var parent = nodeUtils.getParentNode(sel.startNode),
                    range = {
                        startNode: parent.first,
                        endNode: parent.last,
                    };
            }
            var nodes = nodeUtils.getAllNodesRange(range);

            if (inArray(modify, aviableModify[N.BLOCK])) {
                nodes = nodeUtils.getNodeParentsByType(nodes, N.BLOCK);
            }

            var need = nodeUtils.checkNeedModify(nodes, modify);
            for (var i in nodes) {
                var node = nodes[i];

                if (need) {
                    node.addModify(modify);
                } else {
                    node.cancelModify(modify);
                }
            }
            for (var i in nodes) {
                var node = nodes[i].parent;
                nodeUtils.mergeNodes(node);
                node.updateNode();
            }
            this.selectRangeByOffsets(sel);
            return;

            var sel = Selection.getSelection(),
                nodes = nodeUtils.getNodesInRange(sel),
                is_single = sel.startNode === sel.endNode;

            var nodes = [],
                node = sel.startNode;
            while (node) {
                nodes.push(node);

                if (node === sel.endNode || is_single) {
                    break;
                }

                node = node.next ? node.next : (node.parent.next ? node.parent.next.first : null);
            }


            if (sel.startOffset > 0) {
                nodes.splice(0, 1);
                nodes.unshift(sel.startNode.splitNode(sel.startOffset));
            }
            if (sel.endOffset > 0) {
                nodes[nodes.length - 1].splitNode(is_single ? sel.endOffset - sel.startOffset : sel.endOffset).updateNode();
            }

            var need_add = nodeUtils.checkNoModified(nodes, modify);

            for (var i in nodes) {
                if (need_add) {
                    nodes[i].addModify(modify, sel);
                } else {
                    nodes[i].cancelModify(modify, sel);
                }
            }

            for (var i in nodes) {
                var parent = nodeUtils.getParentNode(nodes[i]);
                nodeUtils.mergeNodes(parent);
                parent.updateNode();
            }

            this.selectRangeByOffsets(sel);
        },
        historyPush: function(type, data, opts) {
            if (!opts) {
                opts = {};
            }

            this.history = this.history.slice(0, this.historyPos + 1);
            var row = this.history[this.historyPos],
                newRow = 0;
            var ts = vkNow();

            if (!row || ts - row.ts > 2000 || row.last_type != type) {
                row = {
                    items: [],
                };
                newRow = 1;
            }

            row.items.push({
                type: type,
                data: data,
            });
            row.ts = ts;
            row.last_type = type;

            if (newRow) {
                this.history.push(row);
                this.historyPos = this.history.length - 1;
            }
        },
        historyUnbo: function() {
            var row = this.history[this.historyPos];
            if (!row) {
                return;
            }

            for (var i = row.items.length - 1; i >= 0; i--) {
                var item = row.items[i];

                switch (item.type) {
                    case 'set_text_range':
                        this.setTextRange({
                            sel: clone(item.data.sel),
                            is_clear: 1,
                            no_history: 1,
                        });
                        break;
                    case 'clear_text_range':
                        this.setTextRange({
                            sel: clone(item.data.sel),
                            char: item.data.char,
                            no_history: 1,
                        });
                        break;
                }
            }
            this.historyPos--;
        },
        historyRebo: function() {
            var row = this.history[this.historyPos + 1];
            if (!row) {
                return;
            }

            for (var i = 0; i < row.items.length; i++) {
                var item = row.items[i];
                switch (item.type) {
                    case 'set_text_range':
                        this.setTextRange({
                            sel: Utils.decrOffsets(clone(item.data.sel)),
                            char: item.data.char,
                            no_history: 1,
                        });
                        break;
                    case 'clear_text_range':
                        this.setTextRange({
                            sel: Utils.incrOffsets(clone(item.data.sel), item.data.char.length),
                            is_clear: 1,
                            no_history: 1,
                            clearNum: item.data.char.length,
                        });
                        break;
                }
            }
            this.historyPos++;
        }
    };

    var Selection = {
        hasBackwards: function(sel) {
            var backwards = false;
            if (!sel.isCollapsed) {
                var range = document.createRange();
                range.setStart(sel.anchorNode, sel.anchorOffset);
                range.setEnd(sel.focusNode, sel.focusOffset);
                backwards = range.collapsed;
                range.detach();
            }
            return backwards;
        },
        getSelection: function() {
            var sel = window.getSelection();

            var isBackwards = Selection.hasBackwards(sel);
            if (isBackwards) {
                var startNode = sel.focusNode,
                    startOffset = sel.focusOffset;
                var endNode = sel.anchorNode,
                    endOffset = sel.anchorOffset;
            } else {
                var startNode = sel.anchorNode,
                    startOffset = sel.anchorOffset;
                var endNode = sel.focusNode,
                    endOffset = sel.focusOffset;
            }

            startNode = nodeUtils.getNode(startNode).ctx;
            endNode = nodeUtils.getNode(endNode).ctx;

            return {
                startNode: startNode,
                startOffset: startOffset,
                startAbsOffset: nodeUtils.getAbsOffset(startNode) + startOffset,

                endNode: endNode,
                endOffset: endOffset,
                endAbsOffset: nodeUtils.getAbsOffset(endNode) + endOffset,

                isBackwards: isBackwards,
                length: sel.toString().length,
            };
        },
        selectRange: function(startNode, startPos, endNode, endPos) {
            var range = document.createRange();

            range.setStart(nodeUtils.getNodeWrap(startNode).firstChild, Math.max(0, Math.min(startPos, startNode.getText().length)));
            range.setEnd(nodeUtils.getNodeWrap(endNode).firstChild, Math.max(0, Math.min(endPos, endNode.getText().length)));

            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        },
        moveCursorTo: function(node, pos) {
            Selection.selectRange(node, pos, node, pos);
        },
    };

    function Node(parent, prevNode) {
        this.parent = parent;

        // init linked list
        this.first = null;
        this.last = null;

        this.modify = 0;

        if (!parent.last) {
            parent.first = this;
            parent.last = this;
        } else {
            if (prevNode) {
                if (prevNode.next) {
                    prevNode.next.prev = this;
                } else {
                    parent.last = this;
                }
                this.next = prevNode.next;
                prevNode.next = this;
                this.prev = prevNode;
            } else {
                parent.last.next = this;
                this.prev = parent.last;
                parent.last = this;
            }
        }

        return this;
    }
    Node.prototype = {
        setType: function(type) {
            this.type = type;
            return this;
        },
        getType: function() {
            return this.type;
        },
        getWrap: function() {
            return this.wrap;
        },
        splitNodeDeep: function(spliter, save_modify) {
            if (Utils.isInt(spliter) && this.getType() == N.TEXT) {
                var node = this.splitNode(spliter);
                save_modify = node.getText().length > 0;
            } else {
                spliter.prev.next = null;
                this.last = spliter.prev;
                spliter.prev = null;

                var node = new Node(this.parent, this).setType(this.getType());

                if (save_modify) {
                    node.setModify(this.getModify());
                }

                node.first = spliter;
                spliter.parent = node;

                var nextNode = spliter.next;
                while (nextNode) {
                    nextNode.parent = node;
                    if (!nextNode.next) {
                        node.last = nextNode;
                    }
                    nextNode = nextNode.next;
                }
                if (!node.last) {
                    node.last = spliter;
                }
            }

            this.updateNode();
            node.render();

            if (this.parent.getType && this.parent.getType() > N.CONTENTS) {
                this.parent.splitNodeDeep(node, save_modify);
            }

            return node;
        },
        splitNode: function(pos) {
            var node = new Node(this.parent, this).setType(this.getType()),
                text = this.getText(),
                textForNedNode = text.slice(pos);

            node.setText(textForNedNode);
            this.setText(text.slice(0, pos));

            if (textForNedNode.length > 0) {
                node.setModify(this.getModify());
            }

            return node;
        },
        joinNode: function() { // join with previous node
            var parent = nodeUtils.getParentNode(this);

            var prev = parent.prev;
            if (!prev) {
                Selection.moveCursorTo(parent, 0);
                return;
            }

            var curTextLen = nodeUtils.getAllText(prev.first).length;

            nodeUtils.joinNodes(prev, parent);
            parent.remove();

            nodeUtils.mergeNodes(prev);
            prev.updateNode();

            var data = nodeUtils.getNodeByOffset(prev, curTextLen);
            Selection.moveCursorTo(data.node, data.offset);
        },
        getModify: function() {
            return this.modify;
        },
        setModify: function(modify) {
            this.modify = modify;
            return this;
        },
        addModify: function(modify) {
            var node = this;
            if (nodeUtils.checkCanModify(this.getType(), modify)) {
                if (this.getType() == N.BLOCK) {
                    this.modify = modify;
                } else {
                    this.modify |= modify;
                }
            }
        },
        cancelModify: function(modify) {
            if (this.modify & modify) {
                this.modify -= modify;
            }
        },

        // text node methods
        getText: function() {
            return this.text || '';
        },
        setText: function(text) {
            this.text = text;
            this.updateText();
            return this;
        },
        updateText: function() {
            var text = this.getText();
            if (!text) {
                text = '<br>';
            }
            val(this.wrap, text);
        },

        render: function(try_num) {
            var tagName = 'DIV',
                className = '';

            switch (this.type) {
                case N.TEXT:
                    tagName = 'SPAN';
                    className = 'note_editor_block_text';
                    break;
                case N.BLOCK:
                    className = 'note_editor_block';
                    break;
            }

            className += nodeUtils.getModifyClass(this.getModify());

            if (this.wrap && document.contains(this.wrap)) {
                var el = this.wrap;
            } else {
                var el = ce(tagName);
                el.ctx = this;
            }
            attr(el, 'data-type', this.type);
            this.wrap = el;

            if (className) {
                addClass(el, className);
            }

            var parentWrap = this.parent.getWrap ? this.parent.getWrap() : this.parent;
            if (!parentWrap) {
                return this;
            }
            var nextWrap = this.next ? this.next.getWrap() : false;
            if (nextWrap && document.contains(nextWrap)) {
                try {
                    parentWrap.insertBefore(el, nextWrap);
                } catch (e) {
                    console.log('err', this, this.next);
                }
            } else {
                parentWrap.appendChild(el);
            }

            switch (this.type) {
                case N.TEXT:
                    this.updateText();
                    break;
            }

            this.updateChilds(try_num);

            return this;
        },
        addNode: function(type) {
            var node = new Node(this).setType(type).render();
            return this;
        },
        updateNode: function(try_num) {
            this.removeFromDom();
            this.render(try_num);
        },
        updateChilds: function(try_num) {
            var node = this.first;

            if (try_num > 15) {
                console.log('BUG!!!!!!!!!');
                return;
            }
            if (!try_num) {
                try_num = 0;
            }
            try_num++;
            while (node) {
                node.updateNode(try_num);
                node = node.next;
            }
        },
        removeFromDom: function() {
            val(this.wrap, '');
            re(this.wrap);
            this.wrap = null;
        },
        remove: function() {
            this.removeFromDom();

            if (this.parent.first === this && this.parent.last === this && nodeUtils.getParentNodeByType(this, N.CONTENTS).first != this.parent) {
                this.parent.remove();
            }

            if (this.prev) {
                this.prev.next = this.next;
            } else {
                this.parent.first = this.next;
            }
            if (this.next) {
                this.next.prev = this.prev;
            } else {
                this.parent.last = this.prev;
            }
        }
    };

    var nodeUtils = {
        getNodesInRange: function(sel) {
            var nodes = [],
                node = nodeUtils.getParentNode(sel.startNode),
                endParent = nodeUtils.getParentNode(sel.endNode);

            while (node) {
                nodes.push(node);

                if (node === sel.endNode || node === endParent) {
                    break;
                }
                if (node.next) {
                    node = node.next;
                } else {
                    node = node.parent.next ? node.parent.next.first : null;
                }
            }
            return nodes;
        },
        getNodeRange: function(sel) {
            if (sel.startOffset > 0) {
                var startNewNode = sel.startNode.splitNode(sel.startOffset);
                if (sel.startNode === sel.endNode) {
                    sel.endOffset -= sel.startOffset;
                    sel.endNode = startNewNode;
                }
            } else {
                var startNewNode = sel.startNode;
            }
            if (sel.endOffset > 0) {
                var newEnd = sel.endNode.splitNode(sel.endOffset).updateNode();
            } else {
                var newEnd = sel.endNode;
            }
            sel.startNode.parent.updateNode();
            sel.endNode.parent.updateNode();

            return {
                startNode: startNewNode,
                endNode: sel.endNode,
                newEnd: newEnd,
            }
        },
        getAllNodesRange: function(range) {
            var node = range.startNode;
            var nodes = [];
            while (node) {
                nodes.push(node);

                if (node === range.endNode) {
                    break;
                }

                if (node.next) {
                    node = node.next;
                } else {
                    node = node.parent.next ? node.parent.next.first : null;
                }
            }
            return nodes;
        },
        removeNodesRange: function(range) {
            var nodes = nodeUtils.getAllNodesRange(range);
            for (var i in nodes) {
                nodes[i].remove();
            }
        },
        getAbsOffset: function(node) {
            var offset = 0;

            var data = nodeUtils.nodeNavHelper(node, 1);
            node = data.stop ? null : data.node;

            var try_num = 0;
            while (node) {
                if (node.getType() == N.TEXT) {
                    offset += node.getText().length;
                } else if (node.getType() == N.BLOCK) {
                    offset++;
                }

                data = nodeUtils.nodeNavHelper(node, 1);
                node = data.stop ? null : data.node;
                try_num++;

                if (try_num > 300) {
                    console.trace('ERR', offset, node);
                    break;
                }
            }
            return offset;
        },
        getNode: function(node) {
            if (node.nodeType != 1) {
                node = node.parentNode;
            }
            return node;
        },
        getNodeByOffset: function(node, offset) {
            var totalOffset = 0,
                try_num = 0,
                firstBlockSkip = 1;

            var lastTextLen = 0,
                skipBlock = 1;
            while (node) {
                if (node.getType() == N.TEXT) {
                    var textLen = node.getText().length;
                    offset -= lastTextLen;

                    if (textLen >= offset) {
                        break;
                    }

                    lastTextLen = textLen;
                } else if (node.getType() == N.BLOCK) {
                    if (skipBlock) {
                        skipBlock = 0;
                    } else {
                        offset--;
                    }
                }

                var data = nodeUtils.nodeNavHelper(node);
                if (data.stop) {
                    break;
                }
                node = data.node;
            }

            return {
                node: node,
                offset: offset,
            }
        },
        getParentNodeByType: function(node, type) {
            while (node) {
                if (node.getType() == type) {
                    return node;
                }
                node = node.parent;
            }
            return null;
        },
        joinNodes: function(node1, node2) { // join node2 width node1
            if (!node1.last || !node2.last) {
                return;
            }

            node1.last.next = node2.first;
            node2.first.prev = node1.last;

            node1.last = node2.last;

            var childNode = node2.first;
            while (childNode) {
                childNode.parent = node1;
                childNode = childNode.next;
            }

            if (node1.first && node1.first && node2.first) {
                nodeUtils.joinNodes(node1.first, node2.first);
            }
        },
        mergeNodes: function(node, try_num) {
            if (!node) {
                return;
            }

            var next = node.next;
            if (next) {
                if (node.getType() == N.TEXT && !node.getText() && node.parent.first != node.parent.last) {
                    node.remove();
                    return nodeUtils.mergeNodes(node.next, try_num);
                }
                if (next.getType() == node.getType() && next.getModify() == node.getModify() && node.getType() == N.TEXT) {

                    if (node.getType() == N.TEXT) {
                        node.setText(node.getText() + next.getText());
                    }

                    var child = next.first;
                    while (child) {
                        child.parent = node;
                        child = child.next;
                    }

                    next.remove();

                    //if (next.first) {
                    //next.first.prev = node.last;
                    //}
                    //node.last.next = next.first;
                    node.last = next.last;
                    return nodeUtils.mergeNodes(node, try_num);
                } else {
                    if (next.getType() == N.TEXT && !next.getText()) {
                        next.remove();
                        return nodeUtils.mergeNodes(node, try_num);
                    }
                }
            }

            try_num++;
            if (try_num > 50) {
                console.log('BUG!');
                return;
            }

            if (node.next) {
                nodeUtils.mergeNodes(node.next, try_num);
            } else {
                node = node.parent.first;
                while (node) {
                    nodeUtils.mergeNodes(node.first, 0);
                    node = node.next;
                }
            }
        },
        getAllText: function(node) {
            var text = '';
            while (node) {
                if (node.getType() == N.TEXT) {
                    text += node.getText();
                } else if (node.getType() == N.BLOCK) {
                    text += ' ';
                }
                text += this.getAllText(node.first);
                node = node.next;
            }
            return text;
        },
        getParentNode: function(node) {
            var parent = node;
            while (parent.parent && parent.parent.getType && parent.getType() > N.BLOCK) {
                parent = parent.parent;
            }
            return parent;
        },
        moveNodeAfter: function(node, beforeNode) {
            if (node.prev) {
                node.prev.next = node.next;
            }
            if (node.next) {
                node.next.prev = node.prev;
            }

            node.prev = beforeNode;
            node.next = beforeNode.next;
            if (node.next) {
                node.next.prev = node;
            }
            beforeNode.next = node;

            console.log(node, beforeNode);

            node.updateNode();
        },
        getModifyClass: function(modify) {
            var modify_list = [];

            for (var i in M) {
                if (modify & M[i]) {
                    modify_list.push(i.toLowerCase());
                }
            }

            var className = '';
            for (var i in modify_list) {
                className += ' note_editor_modify_' + modify_list[i];
            }
            return className;
        },
        checkCanModify: function(type, modify) {
            if (inArray(modify, aviableModify[type])) {
                return 1;
            }
            return 0;
        },
        checkNeedModify: function(nodes, modify) {
            for (var i in nodes) {
                var node = nodes[i];
                if (inArray(modify, aviableModify[node.getType()])) {
                    return node.getModify() & modify ? 0 : 1;
                }
            }
            return 0;
        },
        nodeNavHelper: function(node, after) {
            var stop = 0;
            if (after) {
                if (node.last) {
                    node = node.last;
                } else if (node.prev) {
                    node = node.prev;
                } else if (node.parent.prev) {
                    node = node.parent.prev;
                } else {
                    stop = 1;
                }
            } else {
                if (node.first) {
                    node = node.first;
                } else if (node.next) {
                    node = node.next;
                } else if (node.parent.next) {
                    node = node.parent.next;
                } else {
                    stop = 1;
                }
            }
            return {
                stop: stop,
                node: node,
            };
        },
        forceUpdateParent: function(node) {
            var parent = nodeUtils.getParentNode(node);
            nodeUtils.mergeNodes(parent);
            parent.updateNode();
        },
        getNodeWrap: function(node) {
            while (node) {
                if (node.getType() == N.TEXT) {
                    break;
                }
                node = node.first;
            }
            return node.wrap;
        },
        getNodeParentsByType: function(nodes, type) {
            var res = [];
            for (var i = 0; i < nodes.length; i++) {
                res.push(nodeUtils.getParentNodeByType(nodes[i], type));
            }
            return res;
        },
        removeAllModify: function(node) {
            while (node) {
                var modify = node.getModify();
                node.setModify(0);

                if (modify) {
                    node.updateNode();
                }

                if (node.getType() == N.BLOCK) {
                    break;
                }

                node = node.parent;
            }
        },
    };

    var Utils = {
        prepareText: function(text) {
            text = clean(text);
            text = text.replace(/.?\x08/g, '');
            return text;
        },
        isInt: function(n) {
            return Number(n) === n && n % 1 === 0;
        },
        decrOffsets: function(sel) {
            sel.startOffset--;
            sel.endOffset--;
            sel.startAbsOffset--;
            sel.endAbsOffset--;
            return sel;
        },
        incrOffsets: function(sel, num) {
            if (!num) {
                num = 1;
            }
            sel.startOffset += num;
            sel.endOffset += num;
            sel.startAbsOffset += num;
            sel.endAbsOffset += num;
            return sel;
        },
    };

    return noteEditor;

})(window.noteEditor);

try {
    stManager.done('snapster/editor.js');
} catch (e) {}