function DropDown(id, opts) {
    if (!opts) {
        opts = {};
    }

    this.id = '#' + id;
    this.options = opts.options;

    if (opts.def) {
        this.selected = opts.def;
    } else {
        this.selected = opts.options[0][0];
    }

    if (opts.onChange) {
        this.onChange = opts.onChange;
    }

    var el = O(this.id).addClass('dropdown no_select').val(Templates.get('dropDown')).attr('data-dd-val', this.selected)
        .bind('click', this.onClick.bind(this));
    this.updateDefStr();
    var _s = this;
    _s.showOptions();

    return this;
}
DropDown.prototype = {
    showOptions: function() {
        var options = '';
        for (var i in this.options) {
            var option = this.options[i];
            if (option[0] == this.selected) {
                var class_name = 'dropdown_option_active';
            } else {
                var class_name = '';
            }
            options += Templates.get('dropDownOption', option, class_name);
        }
        var el = O(this.id),
            options_el = el.children('.dropdown_options').val(options);
        el.setStyle({
            height: el.height() + 'px',
            //width: el.width()+'px',
        }).addClass('dropdown_shown');

        var selTop = el.children('.dropdown_option_active').position().top;
        options_el.setStyle('top', -selTop + 'px');
    },
    updateDefStr: function() {
        var str = '';
        for (var i in this.options) {
            if (this.options[i][0] == this.selected) {
                str = this.options[i][1];
                break;
            }
        }
        O(this.id).children('.dropdown_selected').val(str);
    },
    onClick: function(e) {
        var el = O(e.target);
        if (el.hasClass('dropdown_option')) {
            var value = parseInt(el.attr('data-value'));
            this.selected = value;

            O(this.id).attr('data-dd-val', value);
            this.updateDefStr();
            this.showOptions();

            this.onChange && this.onChange(value);
        }
    }
};

function checkbox(el) {
    el = O(el);
    if (el.hasClass('checkbox_active')) {
        el.removeClass('checkbox_active');
    } else {
        el.addClass('checkbox_active');
    }
}

var snSwitch = {
    click: function(el) {
        el = O(el);
        if (el.hasClass('sn_switch_active')) {
            el.removeClass('sn_switch_active');
        } else {
            el.addClass('sn_switch_active');
        }
    },
    check: function(el) {
        el = O(el);
        if (el.hasClass('sn_switch_active')) {
            return 1;
        }
        return 0;
    }
};

function inputError(inp) {
    inp = O(inp);

    inp.focus().cursorToEnd();
    inp.addClass('error');
    setTimeout(function() {
        inp.removeClass('error');
    }, 1500);
}

function snRadio(wrap, opts) {
    return new _snRadio(wrap, opts);
}

function _snRadio(wrap, opts) {

    var items = '';
    for (var i in opts.items) {
        var item = opts.items[i];
        var class_name = '';
        if (item.disabled) {
            class_name += ' sn_radio_item_disabled';
        }
        items += Templates.get('radioItem', item.id, item.text, item.caption ? item.caption : '', class_name);
    }
    var _s = this;
    this.wrap = wrap;
    var wrap_el = O(wrap).val(items);
    wrap_el.children('.sn_radio_item').bind('click', function() {
        _s.clickRadioItem(this);
    });

    if (opts.def) {
        this.clickRadioItem(wrap_el.children('#radio_item_' + opts.def));
    }
};
_snRadio.prototype = {
    clickRadioItem: function(item) {
        item = O(item);
        if (!item.count() || item.hasClass('sn_radio_item_disabled')) {
            return true;
        }
        item.parent().children('.sn_radio_item.sn_radio_item_active').removeClass('sn_radio_item_active');
        item.addClass('sn_radio_item_active');
    },
    getVal: function() {
        return O(this.wrap).children('.sn_radio_item_active').attr('id').replace('radio_item_', '');
    }
};