// This is ui_controls version of select's.

function PlaceSelect(input, container, options) {

  if (input == null) {
    return false;
  }

  // default options
  var defaults = {
    show: show,
    hide: hide,
    placeholderColor: '#000',
    forceEnableCustom: 0, // manages enableCustom: 0 - as usual, 1 - always, -1 - never
    multiselect: false,
    selectedItems: '',
    visible: true,
    dropdown: false,
    city: 0,
    street: 0,
    place: 0,
    placeholder: getLang('select_place_not_selected'),
    introText: getLang('select_place_select'),
    noResult: getLang('select_place_select') // getLang('select_place_not_found')
  };

  // extend default options with user defined
  options = extend(defaults, options);
  options.enableCustom = (options.forceEnableCustom >= 0);
  options.city = intval(options.city);

  function getURL() {
    return '/select_ajax.php?act=a_get_places&' + (options.street ? ('streets=' + options.street) : ('city=' + options.city));
  }

  var selector = new Selector(input, getURL(), options);

  function updateOnChange() {
    selector.old_setOptions({onChange: function(value) {
      options.place = selector.val_full();
      if (!intval(value)) {
        selector.clear();
      }
      if (isFunction(options.onChange)) {
        options.onChange(value);
      }
    }});
  }

  function updateVisibility() {
    if (!options.visible || !options.city) {
      options.hide(container);
    } else {
      options.show(container);
    }
  }

  selector.old_setOptions = selector.setOptions;
  selector.setOptions = function(new_options) {
    extend(options, new_options);
    selector.old_setOptions(new_options);
    if ('onChange' in new_options) {
      updateOnChange();
    }
    if (('street' in new_options) || ('city' in new_options)) {
      options.city = intval(options.city);
      selector.setURL(getURL());
      if (intval(options.place)) {
        if (!intval(selector.val())) {
          var to_select = options.multiselect ? options.place : [options.place];
          for (var i in to_select) {
            selector.val(to_select[i]);
          }
        }
      } else if ('city' in new_options) {
        selector.clear();
      }
    }
    if (('city' in new_options) || ('visible' in new_options)) {
      updateVisibility();
    }
  }

  selector.show = function() {
    selector.setOptions({visible: true});
  }
  selector.hide = function() {
    selector.setOptions({visible: false});
  }
  selector.zero = function() {
    if (options.multiselect) {
      selector.clear();
    }
    selector.val('', true);
  }

  if (intval(options.place)) {
    var to_select = options.multiselect ? options.place : [options.place];
    for (var i in to_select) {
      selector.val(to_select[i]);
    }
  } else {
    selector.clear();
  }
  updateVisibility();
  updateOnChange();

  return selector;
}

function HouseSelect(input, container, options) {
  if (input == null) {
    return false;
  }

  // default options
  var defaults = {
    show: show,
    hide: hide,
    placeholderColor: '#000',
    forceEnableCustom: 0, // manages enableCustom: 0 - as usual, 1 - always, -1 - never
    multiselect: false,
    selectedItems: '',
    visible: true,
    dropdown: false,
    street: 0,
    house: 0,
    placeholder: getLang('select_house_not_selected'),
    introText: getLang('select_house_select'),
    noResult: getLang('select_house_select') // getLang('select_house_not_found')
  };

  // extend default options with user defined
  options = extend(defaults, options);
  options.enableCustom = (options.forceEnableCustom >= 0);
  var selector = new Selector(input, '/select_ajax.php?act=a_get_houses&streets=' + options.street, options);

  function updateOnChange() {
    selector.old_setOptions({onChange: function(value) {
      options.house = selector.val_full();
      if (!intval(value)) {
        selector.clear();
      }
      if (isFunction(options.onChange)) {
        options.onChange(value);
      }
    }});
  }

  function updateVisibility() {
    if (!options.visible || !intval(options.street)) {
      options.hide(container);
    } else {
      options.show(container);
    }
  }

  function streetUpdated() {
    selector.setURL('/select_ajax.php?act=a_get_houses&streets=' + options.street);
    if (intval(options.house)) {
      if (!intval(selector.val())) {
        var to_select = options.multiselect ? options.house : [options.house];
        for (var i in to_select) {
          selector.val(to_select[i]);
        }
      }
    } else {
      selector.clear();
    }
    updateVisibility();
  }

  selector.old_setOptions = selector.setOptions;
  selector.setOptions = function(new_options) {
    extend(options, new_options);
    selector.old_setOptions(new_options);
    if ('onChange' in new_options) {
      updateOnChange();
    }
    if ('street' in new_options) {
      streetUpdated();
    } else if ('visible' in new_options) {
      updateVisibility();
    }
  }

  selector.show = function() {
    selector.setOptions({visible: true});
  }
  selector.hide = function() {
    selector.setOptions({visible: false});
  }
  selector.zero = function() {
    if (options.multiselect) {
      selector.clear();
    }
    selector.val(0, true);
  }

  streetUpdated();
  updateOnChange();

  return selector;
}

function StreetSelect(input, container, options) {

  if (input == null) {
    return false;
  }

  // default options
  var defaults = {
    show: show,
    hide: hide,
    placeholderColor: '#000',
    forceEnableCustom: 0, // manages enableCustom: 0 - as usual, 1 - always, -1 - never
    multiselect: false,
    selectedItems: '',
    visible: true,
    dropdown: false,
    city: 0,
    testing: true,
    street: 0,
    placeholder: getLang('select_street_not_selected'),
    introText: getLang('select_street_select'),
    noResult: getLang('select_street_not_found')
  };

  // extend default options with user defined
  options = extend(defaults, options);
  options.city = intval(options.city);
  options.enableCustom = (options.forceEnableCustom > 0);
  options.realNoResult = options.noResult;
  var selector = new Selector(input, '/select_ajax.php?act=a_get_streets&city=' + options.city, options);

  function realEnableCustom(value) {
    return (options.forceEnableCustom == 0) ? value : (options.forceEnableCustom > 0);
  }

  function zeroChildren() {
    if (options.houseSelect) {
      options.houseSelect.zero();
    }
  }

  function updateOnChange() {
    selector.old_setOptions({onChange: function(value) {
      options.street = selector.val_full();
      if (!options.multiselect || !intval(value)) {
        zeroChildren();
      }
      if (!intval(value)) {
        selector.clear();
      }
      if (options.houseSelect) {
        options.houseSelect.setOptions({street: value});
      }
      if (options.placeSelect) {
        options.placeSelect.setOptions({street: value});
      }
      if (isFunction(options.onChange)) {
        options.onChange(value);
      }
    }});
  }

  function updateVisibility() {
    if (!options.visible || !options.city) {
      options.hide(container);
    } else {
      options.show(container);
    }
  }

  function cityUpdated(ignoreChildren) {
    selector.clear();
    selector.setURL('/select_ajax.php?act=a_get_streets&city=' + options.city);
    if (!ignoreChildren) {
      zeroChildren();
    }
    if (options.city) {
      selectsData.getCityInfo(options.city, 16, function(cityInfo) {
        selector.setOptions({enableCustom: realEnableCustom(!cityInfo.completed_streets)});
        if (intval(options.street)) {
          var to_select = options.multiselect ? options.street : [options.street];
          for (var i in to_select) {
            selector.val(to_select[i]);
          }
        } else {
          selector.clear();
        }
      }, options.progressBar);
    } else {
      selector.setOptions({enableCustom: false});
    }
    updateVisibility();
  }

  selector.old_setOptions = selector.setOptions;
  selector.setOptions = function(new_options) {
    extend(options, new_options);
    if ('noResult' in new_options) {
      options.realNoResult = options.noResult;
    }
    if ('enableCustom' in new_options) {
      new_options.enableCustom = intval(new_options.enableCustom) ? true : false;
      if (new_options.enableCustom) {
        new_options.noResult = options.introText;
      } else {
        new_options.noResult = options.realNoResult;
      }
    }
    selector.old_setOptions(new_options);
    if ('onChange' in new_options) {
      updateOnChange();
    }
    if ('city' in new_options) {
      options.city = intval(options.city);
      cityUpdated();
    } else if ('visible' in new_options) {
      updateVisibility();
    }
  };

  selector.show = function() {
    selector.setOptions({visible: true});
  }
  selector.hide = function() {
    selector.setOptions({visible: false});
  }
  selector.zero = function() {
    if (options.multiselect) {
      selector.clear();
    }
    selector.val('', true);
  }

  cityUpdated(true);
  updateOnChange();

  return selector;
}

// fields: 1 for stations, 2 for districts.
function StationDistrictSelect(fields, input, container, options) {
  if (input == null) {
    return false;
  }

  // default options
  var defaults = {
    show: show,
    hide: hide,
    placeholderColor: '#000',
    selectedItems: '',
    placeholder: '',
    city: 0,
    value: 0,
    items_count: 0,
    visible: true,
    multiselect: false
  };

  // extend default options with user defined
  options = extend(defaults, options);
  options.defaultItems = [[0, options.placeholder]];
  options.city = intval(options.city);
  if (!options.value) options.value = 0;
  options.enableCustom = intval(options.enableCustom) ? true : false;
  options.baseItems = options.multiselect ? [] : [[0, options.placeholder]];
  var selector = new Dropdown(input, options.defaultItems, options);

  function updateOnChange() {
    selector.old_setOptions({onChange: function(value) {
      options.value = value;
      if (!intval(value)) {
        selector.clear();
      }
      if (isFunction(options.onChange)) {
        options.onChange(value);
      }
    }});
  }

  function updateVisibility() {
    if (!options.visible || !options.city || (!options.items_count && !options.enableCustom)) {
      options.hide(container);
    } else {
      options.show(container);
    }
  }

  function cityUpdated() {
    selector.clear();
    if (options.city) {
      selectsData.getCityInfo(options.city, fields, function(cityInfo) {
        var new_options = {defaultItems: options.baseItems.concat(cityInfo[options.obj])};
        options.items_count = cityInfo[options.obj].length;
        selector.old_setOptions(new_options);
        if (intval(options.value)) {
          var to_select = (options.value + '').split(',');
          for (var i in to_select) {
            selector.val(to_select[i]);
          }
        } else {
          selector.clear();
        }
        updateVisibility();
      }, options.progressBar);
    } else {
      options.items_count = 0;
      selector.old_setOptions({defaultItems: options.baseItems});
      updateVisibility();
    }
  }

  selector.old_setOptions = selector.setOptions;
  selector.setOptions = function(new_options) {
    extend(options, new_options);
    selector.old_setOptions(new_options);
    if ('city' in new_options) {
      options.city = intval(options.city);
      cityUpdated();
    } else if ('visible' in new_options || 'enableCustom' in new_options) {
      updateVisibility();
    }
  }

  selector.show = function() {
    selector.setOptions({visible: true});
  }
  selector.hide = function() {
    selector.setOptions({visible: false});
  }
  selector.zero = function() {
    if (options.multiselect) {
      selector.clear();
    }
    selector.val(0, true);
  }

  cityUpdated();
  updateOnChange();

  return selector;
}

function StationSelect(input, container, options) {
  return StationDistrictSelect(1, input, container, extend(options, {
    placeholder: options.placeholder ? options.placeholder : getLang('select_station_not_selected'), obj: 'stations', value: options.station}));
}

function DistrictSelect(input, container, options) {
  return StationDistrictSelect(2, input, container, extend(options, {
    placeholder: options.placeholder ? options.placeholder : getLang('select_district_not_selected'), obj: 'districts', value: options.district}));
}

function ClassSelect(input, container, options) {
  if (input == null) {
    return false;
  }

  // default options
  var defaults = {
    show: show,
    hide: hide,
    visible: true,
    multiselect: false,
    placeholder: getLang('select_class_not_selected'),
    country: 0,
    school: 0,
    school_class: 0,
    items_count: 0
  }

  // extend default options with user defined
  options = extend(defaults, options);
  options.defaultItems = [[0, options.placeholder]];
  options.country = intval(options.country);
  if (!options.school_class) options.school_class = 0;
  var selector = new Dropdown(input, options.defaultItems, options);

  function updateVisibility() {
    if (!options.visible || !options.school || !options.items_count) {
      options.hide(container);
    } else {
      options.show(container);
    }
  }

  function countryUpdated() {
    selector.clear();
    if (options.country) {
      selectsData.getCountryInfo(options.country, 8, function(countryInfo) {
        var new_options = {defaultItems: [[0, options.placeholder]].concat(countryInfo.classes)};
        options.items_count = countryInfo.classes.length;
        selector.old_setOptions(new_options);
        if (intval(options.school_class)) {
          selector.val(options.school_class);
        } else {
          selector.clear();
        }
        updateVisibility();
      }, options.progressBar);
    } else {
      options.items_count = 0;
      selector.old_setOptions({defaultItems: [[0, options.placeholder]]});
      updateVisibility();
    }
  }

  selector.old_setOptions = selector.setOptions;
  selector.setOptions = function(new_options) {
    extend(options, new_options);
    selector.old_setOptions(new_options);
    if ('country' in new_options) {
      options.country = intval(options.country);
      countryUpdated();
    } else if ('visible' in new_options || 'school' in new_options) {
      if (!intval(options.school)) {
        selector.clear();
      }
      updateVisibility();
    }
  }

  selector.show = function() {
    selector.setOptions({visible: true});
  }
  selector.hide = function() {
    selector.setOptions({visible: false});
  }

  countryUpdated();

  return selector;
}

function SchoolSelect(input, container, type_input, type_container, options) {
  if (input == null) {
    return false;
  }

  // default options
  var defaults = {
    show: show,
    hide: hide,
    placeholderColor: '#000',
    forceEnableCustom: 0, // manages enableCustom: 0 - as usual, 1 - always, -1 - never
    selectedItems: '',
    visible: true,
    multiselect: false,
    city: 0,
    school: 0,
    items_count: 0,
    types: [],
    autocomplete: true,
    dropdown: false,
    placeholder: getLang('select_school_not_selected'),
    introText: getLang('select_school_select'),
    noResult: getLang('select_school_not_found'),
    type_width: 300,
    with_type_width: 0, // 0 means "same as width".
    container: container
  };

  // extend default options with user defined
  options = extend(defaults, options);
  options.defaultItems = [];
  options.school = intval(options.school);
  options.city = intval(options.city);
  options.enableCustom = (options.forceEnableCustom > 0);
  options.realNoResult = options.noResult;
  var selector = new Dropdown(input, options.defaultItems, options);
  var type_selector = type_input ? new Dropdown(type_input, options.types, {
    selectedItems: options.type,
    visible: true,
    width: options.type_width,
    dark: options.dark
  }) : false;

  if (!options.types.length) {
    hide(type_container);
    delete type_selector;
    type_selector = false;
  }

  function realEnableCustom(value) {
    return (options.forceEnableCustom == 0) ? value : (options.forceEnableCustom > 0);
  }
  if (type_selector) {
    selector.type_val = type_selector.val;
  }

  function updateChildren(new_value) {
    if (options.classSelect) {
      options.classSelect.setOptions({school: new_value});
    }
  }

  function updateOnChange() {
    selector.old_setOptions({onChange: function(value) {
      value = intval(value);
      options.school = value;
      updateChildren(value);
      if (!value) {
        selector.clear();
      }
      if (isFunction(options.onChange)) {
        options.onChange(value);
      }
    }});
  }

  function updateVisibility() {
    if ((!options.visible || !options.city || (!options.items_count && !options.enableCustom && !options.ignoreVoidList)) && !options.alwaysVisible) {
      options.hide(options.container);
      if (type_container) {
        options.hide(type_container);
      }
    } else {
      options.show(options.container);
      if (type_selector) {
        if (options.enableCustom) {
          options.show(type_container);
          if (intval(options.with_type_width)) {
            selector.old_setOptions({width: options.with_type_width});
          }
        } else {
          options.hide(type_container);
          if (intval(options.with_type_width)) {
            selector.old_setOptions({width: options.width});
          }
        }
      }
    }
  }

  function cityUpdated() {
    selector.clear();
    if (options.city) {
      selectsData.getCityInfo(options.city, 4, function(cityInfo) {
        options.items_count = cityInfo.schools.length;
        var new_options = {}, new_defaultItems = [], new_enableCustom = realEnableCustom(!cityInfo.completed_schools);
        if (options.items_count < 101) {
          if (options.items_count) {
            new_defaultItems = [[0, options.placeholder]].concat(cityInfo.schools);
            new_options.dropdown = true;
            new_options.autocomplete = (options.items_count > 10) || new_enableCustom;
          } else {
            new_options.dropdown = false;
            new_options.autocomplete = new_enableCustom;
          }
        } else {
          new_options.dropdown = false;
          new_options.autocomplete = true;
        }
        selector.old_setOptions(new_options);
        selector.setData(cityInfo.schools);
        selector.setOptions({enableCustom: new_enableCustom, defaultItems: new_defaultItems});
        if (options.school) {
          selector.val(options.school);
        } else {
          selector.clear();
        }
        updateVisibility();
      }, options.progressBar);
    } else {
      options.items_count = 0;
      selector.setData([]);
      selector.setOptions({enableCustom: false});
      updateVisibility();
    }
  }

  selector.old_setOptions = selector.setOptions;
  selector.setOptions = function(new_options) {
    extend(options, new_options);
    if ('noResult' in new_options) {
      options.realNoResult = options.noResult;
    }
    if ('enableCustom' in new_options) {
      new_options.enableCustom = intval(new_options.enableCustom) ? true : false;
      if (new_options.enableCustom) {
        new_options.noResult = options.introText;
      } else {
        new_options.noResult = options.realNoResult;
      }
      if (isFunction(options.onEnableCustomChange)) {
        options.onEnableCustomChange(new_options.enableCustom);
      }
    }
    selector.old_setOptions(new_options);
    if ('onChange' in new_options) {
      updateOnChange();
    }
    if ('city' in new_options) {
      options.city = intval(options.city);
      cityUpdated();
    } else if (('visible' in new_options) || ('enableCustom' in new_options)) {
      updateVisibility();
    }
  }

  selector.show = function() {
    selector.setOptions({visible: true});
  }
  selector.hide = function() {
    selector.setOptions({visible: false});
  }

  cityUpdated();
  updateOnChange();

  return selector;
}

function SchoolHintSelect(input, container, options) {

  if (input == null) {
    return false;
  }

  // default options
  var defaults = {
    show: show,
    hide: hide,
    placeholderColor: '#000',
    forceEnableCustom: 0, // manages enableCustom: 0 - as usual, 1 - always, -1 - never
    multiselect: false,
    selectedItems: '',
    visible: true,
    city: 0,
    school: 0,
    placeholder: getLang('select_school_not_selected'),
    introText: getLang('select_school_select'),
    noResult: getLang('select_school_not_found'),
    dividingLine: 'smart',
    typeInput: false,
    typeContainer: false,
    types: [],
    type: false,
    typeWidth: false,
    withTypeWidth: 0 // 0 means "same as width".
  };

  var progressTimer = null;

  // extend default options with user defined
  options = extend(defaults, options);
  options.defaultItems = [[0, options.placeholder]];
  options.city = intval(options.city);
  options.school = intval(options.school);
  options.enableCustom = (options.forceEnableCustom > 0);
  var selector = new Selector(input, '/select_ajax.php?act=a_get_schools&city=' + options.city, options);
  selector.typeSelector = options.typeInput && options.types && options.types.length > 0 ? new Selector(options.typeInput, options.types, {
    selectedItems: options.type,
    visible: options.visible,
    width: options.typeWidth,
    multiselect: false,
    dark: options.dark
  }) : false;

  function realEnableCustom(value) {
    return (options.forceEnableCustom == 0) ? value : (options.forceEnableCustom > 0);
  }

  function updateChildren(new_value) {
    if (options.classSelect) {
      options.classSelect.setOptions({school: new_value});
    }
  }

  function updateOnChange() {
    selector.old_setOptions({onChange: function(value) {
      value = intval(value);
      options.school = value;
      updateChildren(value);
      if (!value) {
        selector.clear();
      }
      if (isFunction(options.onChange)) {
        options.onChange(value);
      }
    }});
  }

  function updateVisibility() {
    if ((!options.visible || !options.city || (!options.items_count && !options.enableCustom && !options.ignoreVoidList)) && !options.alwaysVisible) {
      if (options.disableOnHide) {
        selector.disable(true);
        if (selector.typeSelector) {
          selector.typeSelector.disable(true);
        }
      } else {
        options.hide(container);
        if (selector.typeSelector && options.typeContainer) {
          options.hide(options.typeContainer);
        }
      }
    } else {
      if (options.disableOnHide) {
        selector.disable(false);
        if (options.school) {
          selector.val(options.school);
        } else {
          selector.clear();
        }
        if (selector.typeSelector) {
          selector.typeSelector.disable(false);
        }
      } else {
        options.show(container);
        if (selector.typeSelector && options.typeContainer) {
          if (options.enableCustom) {
            options.show(options.typeContainer);
            if (intval(options.withTypeWidth)) {
              selector.old_setOptions({width: options.withTypeWidth});
            }
          } else {
            options.hide(options.typeContainer);
            if (intval(options.withTypeWidth)) {
              selector.old_setOptions({width: options.width});
            }
          }
        }
      }
    }
  }

  function cityUpdated() {
    selector.clear();
    selector.setURL('/select_ajax.php?act=a_get_schools&city=' + options.city);
    if (options.city) {
      selectsData.getCityInfo(options.city, 4, function(cityInfo) {
        options.items_count = cityInfo.schools.length;
        var new_options = {
          selectedItems: options.selectedItems,
          defaultItems: [[0, options.placeholder]].concat(cityInfo.schools),
          dropdown: true,
          enableCustom: realEnableCustom(!cityInfo.completed_schools)
        }
        selector.setOptions(new_options);
        if (options.school) {
          selector.val(options.school);
        }
        updateVisibility();
      }, options.progressBar);
    } else {
      options.items_count = 0;
      var new_options = {defaultItems: [[0, options.placeholder]], selectedItems: '', enableCustom: false, dropdown: true};
      selector.setOptions(new_options);
      updateVisibility();
    }
  }

  selector.old_setOptions = selector.setOptions;
  selector.setOptions = function(new_options) {
    extend(options, new_options);
    selector.old_setOptions(new_options);
    if ('enableCustom' in new_options) {
      new_options.enableCustom = intval(new_options.enableCustom) ? true : false;
      if (isFunction(options.onEnableCustomChange)) {
        options.onEnableCustomChange(new_options.enableCustom);
      }
    }
    if ('onChange' in new_options) {
      updateOnChange();
    }
    if ('city' in new_options) {
      options.city = intval(options.city);
      cityUpdated();
    } else if (('visible' in new_options) || ('enableCustom' in new_options)) {
      updateVisibility();
    }
  };

  selector.show = function() {
    selector.setOptions({visible: true});
  }
  selector.hide = function() {
    selector.setOptions({visible: false});
  }

  cityUpdated(true);
  updateOnChange();

  return selector;
}

function EducationFormStatusSelect(fields, input, container, options) {
  if (input == null) {
    return false;
  }

  // default options
  var defaults = {
    show: show,
    hide: hide,
    visible: true,
    multiselect: false,
    country: 0,
    university: 0,
    value: 0,
    items_count: 0
  }

  // extend default options with user defined
  options = extend(defaults, options);
  options.defaultItems = [[0, options.placeholder]];
  options.country = intval(options.country);
  if (!options.value) options.value = 0;
  var selector = new Dropdown(input, options.defaultItems, options);

  function updateVisibility() {
    if (!options.visible || !options.university || !options.items_count) {
      options.hide(container);
    } else {
      options.show(container);
    }
  }

  function countryUpdated() {
    selector.clear();
    if (options.country) {
      selectsData.getCountryInfo(options.country, fields, function(countryInfo) {
        var new_options = {defaultItems: [[0, options.placeholder]].concat(countryInfo[options.obj])};
        options.items_count = countryInfo[options.obj].length;
        selector.old_setOptions(new_options);
        if (intval(options.value)) {
          selector.val(options.value);
        } else {
          selector.clear();
        }
        updateVisibility();
      }, options.progressBar);
    } else {
      options.items_count = 0;
      selector.old_setOptions({defaultItems: [[0, options.placeholder]]});
      updateVisibility();
    }
  }

  selector.old_setOptions = selector.setOptions;
  selector.setOptions = function(new_options) {
    extend(options, new_options);
    selector.old_setOptions(new_options);
    if ('country' in new_options) {
      options.country = intval(options.country);
      countryUpdated();
    } else if ('visible' in new_options || 'university' in new_options) {
      if (!intval(options.university)) {
        selector.clear();
      }
      updateVisibility();
    }
  }

  selector.show = function() {
    selector.setOptions({visible: true});
  }
  selector.hide = function() {
    selector.setOptions({visible: false});
  }

  countryUpdated();

  return selector;
}

function EducationFormSelect(input, container, options) {
  return EducationFormStatusSelect(2, input, container, extend(options, {
    placeholder: options.placeholder ? options.placeholder : getLang('select_eduform_not_selected'), obj: 'edu_forms', value: options.edu_form}));
}

function EducationStatusSelect(input, container, options) {
  return EducationFormStatusSelect(4, input, container, extend(options, {
    placeholder: options.placeholder ? options.placeholder : getLang('select_edustatus_not_selected'), obj: 'edu_statuses', value: options.edu_status}));
}

function ChairSelect(input, container, options) {
  if (input == null) {
    return false;
  }

  // default options
  var defaults = {
    show: show,
    hide: hide,
    placeholderColor: '#000',
    forceEnableCustom: 0, // manages enableCustom: 0 - as usual, 1 - always, -1 - never
    faculty: 0,
    chair: 0,
    items_count: 0,
    visible: true,
    multiselect: false,
    placeholder: getLang('select_chair_not_selected')
  };

  // extend default options with user defined
  options = extend(defaults, options);
  options.defaultItems = [[0, options.placeholder]];
  options.faculty = intval(options.faculty);
  options.chair = intval(options.chair);
  options.enableCustom = (options.forceEnableCustom > 0);
  var selector = new Dropdown(input, options.defaultItems, options);

  function realEnableCustom(value) {
    return (options.forceEnableCustom == 0) ? value : (options.forceEnableCustom > 0);
  }

  function updateOnChange() {
    selector.old_setOptions({onChange: function(value) {
      value = intval(value);
      options.chair = value;
      if (!value) {
        selector.clear();
      }
      if (isFunction(options.onChange)) {
        options.onChange(value);
      }
    }});
  }

  function updateVisibility() {
    if (!options.visible || !options.faculty || (!options.items_count && !options.enableCustom && !options.ignoreVoidList)) {
      options.hide(container);
    } else {
      options.show(container);
    }
  }

  function facultyUpdated() {
    selector.clear();
    if (options.faculty > 0) {
      selectsData.getFacultyInfo(options.faculty, function(facultyInfo) {
        options.items_count = facultyInfo.chairs.length;
        if (realEnableCustom(!facultyInfo.completed_chairs)) {
          selector.setOptions({enableCustom: true, defaultItems: [[0, options.placeholder]].concat(facultyInfo.chairs)});
        } else {
          selector.setOptions({autocomplete: (options.items_count > 10), enableCustom: false, defaultItems: []});
        }
        if (options.chair) {
          selector.val(options.chair);
        } else {
          selector.clear();
        }
        updateVisibility();
      }, options.progressBar);
    } else {
      if (options.faculty == 0) {
        selector.setOptions({autocomplete: false, enableCustom: false, defaultItems: []});
      } else {
        selector.setOptions({autocomplete: realEnableCustom(true), enableCustom: realEnableCustom(true), defaultItems: [[0, options.placeholder]]});
        selector.clear();
      }
      options.items_count = 0;
      updateVisibility();
    }
  }

  selector.old_setOptions = selector.setOptions;
  selector.setOptions = function(new_options) {
    extend(options, new_options);
    if ('enableCustom' in new_options) {
      new_options.enableCustom = intval(new_options.enableCustom) ? true : false;
      if (new_options.enableCustom) {
        if (!new_options.autocomplete) new_options.autocomplete = true;
        new_options.introText = new_options.noResult = getLang('select_chair_select');
      } else {
        new_options.introText = new_options.noResult = '';
      }
      if (isFunction(options.onEnableCustomChange)) {
        options.onEnableCustomChange(new_options.enableCustom);
      }
    }
    selector.old_setOptions(new_options);
    if ('onChange' in new_options) {
      updateOnChange();
    }
    if ('faculty' in new_options) {
      options.faculty = intval(options.faculty);
      facultyUpdated();
    } else if ('visible' in new_options) {
      updateVisibility();
    }
    if ('enableCustom' in new_options) {
      if (options.enableCustom && options.faculty > 0) {
        selectsData.getFacultyInfo(options.faculty, function(facultyInfo) {
          selector.setData(facultyInfo.chairs);
        }, options.progressBar);
      } else if (options.enableCustom) {
        selector.setData([]);
      } else if (options.faculty > 0) {
        selectsData.getFacultyInfo(options.faculty, function(facultyInfo) {
          selector.setData([[0, options.placeholder]].concat(facultyInfo.chairs));
        }, options.progressBar);
      } else {
        selector.setData([[0, options.placeholder]]);
      }
      updateVisibility();
    }
  }

  selector.show = function() {
    selector.setOptions({visible: true});
  }
  selector.hide = function() {
    selector.setOptions({visible: false});
  }

  facultyUpdated();
  updateOnChange();

  return selector;
}

function FacultySelect(input, container, options) {
  if (input == null) {
    return false;
  }

  // default options
  var defaults = {
    show: show,
    hide: hide,
    placeholderColor: '#000',
    forceEnableCustom: 0, // manages enableCustom: 0 - as usual, 1 - always, -1 - never
    visible: true,
    university: 0,
    faculty: 0,
    items_count: 0,
    multiselect: false,
    placeholder: getLang('select_fac_not_selected')
  };

  var progressTimer = null;

  // extend default options with user defined
  options = extend(defaults, options);
  options.defaultItems = [[0, options.placeholder]];
  options.university = intval(options.university);
  options.faculty = intval(options.faculty);
  options.enableCustom = (options.forceEnableCustom > 0);
  var selector = new Dropdown(input, options.defaultItems, options);

  function realEnableCustom(value) {
    return (options.forceEnableCustom == 0) ? value : (options.forceEnableCustom > 0);
  }

  function updateChildren(new_value) {
    if (options.chairSelect) {
      options.chairSelect.setOptions({faculty: new_value});
    }
  }

  function zeroChildren() {
    if (options.chairSelect) {
      options.chairSelect.val(0, true);
    }
  }

  function updateOnChange() {
    selector.old_setOptions({onChange: function(value) {
      value = intval(value);
      options.faculty = value;
      zeroChildren();
      updateChildren(value);
      if (!value) {
        selector.clear();
      }
      if (isFunction(options.onChange)) {
        options.onChange(value);
      }
    }});
  }

  function updateVisibility() {
    if (!options.visible || !options.university || (!options.items_count && !options.enableCustom && !options.ignoreVoidList)) {
      options.hide(container);
    } else {
      options.show(container);
    }
  }

  function universityUpdated(ignoreChildren) {
    selector.clear();
    if (!ignoreChildren) {
      zeroChildren();
    }
    if (options.university > 0) {
      selectsData.getUniversityInfo(options.university, function(universityInfo) {
        options.items_count = universityInfo.faculties.length;
        if (realEnableCustom(!universityInfo.completed_faculties)) {
          selector.setOptions({enableCustom: true, defaultItems: [[0, options.placeholder]].concat(universityInfo.faculties)});
        } else {
          selector.setOptions({autocomplete: (options.items_count > 10), enableCustom: false, defaultItems: []});
        }
        if (options.faculty) {
          selector.val(options.faculty);
        } else {
          selector.clear();
        }
        updateVisibility();
      }, options.progressBar);
    } else {
      options.items_count = 0;
      if (options.university == 0) {
        selector.setOptions({autocomplete: false, enableCustom: false, defaultItems: []});
      } else {
        selector.setOptions({autocomplete: realEnableCustom(true), enableCustom: realEnableCustom(true), defaultItems: [[0, options.placeholder]]});
        selector.clear();
      }
      updateVisibility();
    }
  }

  selector.old_setOptions = selector.setOptions;
  selector.setOptions = function(new_options) {
    extend(options, new_options);
    if ('enableCustom' in new_options) {
      new_options.enableCustom = intval(new_options.enableCustom) ? true : false;
      if (new_options.enableCustom) {
        if (!new_options.autocomplete) new_options.autocomplete = true;
        new_options.introText = new_options.noResult = getLang('select_fac_select');
      } else {
        new_options.introText = new_options.noResult = '';
      }
      if (isFunction(options.onEnableCustomChange)) {
        options.onEnableCustomChange(new_options.enableCustom);
      }
    }
    selector.old_setOptions(new_options);
    if ('onChange' in new_options) {
      updateOnChange();
    }
    if ('university' in new_options) {
      options.university = intval(options.university);
      universityUpdated();
    } else if ('visible' in new_options) {
      updateVisibility();
    }
    if ('enableCustom' in new_options) {
      if (options.enableCustom && options.university > 0) {
        selectsData.getUniversityInfo(options.university, function(universityInfo) {
          selector.setData(universityInfo.faculties);
        }, options.progressBar);
      } else if (options.enableCustom) {
        selector.setData([]);
      } else if (options.university > 0) {
        selectsData.getUniversityInfo(options.university, function(universityInfo) {
          selector.setData([[0, options.placeholder]].concat(universityInfo.faculties));
        }, options.progressBar);
      } else {
        selector.setData([[0, options.placeholder]]);
      }
      updateVisibility();
    }
  }

  selector.show = function() {
    selector.setOptions({visible: true});
  }
  selector.hide = function() {
    selector.setOptions({visible: false});
  }

  universityUpdated(true);
  updateOnChange();

  return selector;
}

function UniversitySelect(input, container, options) {
  if (input == null) {
    return false;
  }

  // default options
  var defaults = {
    show: show,
    hide: hide,
    placeholderColor: '#000',
    forceEnableCustom: 0, // manages enableCustom: 0 - as usual, 1 - always, -1 - never
    visible: true,
    multiselect: false,
    city: 0,
    university: 0,
    items_count: 0,
    autocomplete: true,
    placeholder: getLang('select_uni_not_selected'),
    introText: getLang('select_uni_select'),
    noResult: getLang('select_uni_not_found'),
    container: container
  };

  var progressTimer = null;

  // extend default options with user defined
  options = extend(defaults, options);
  options.defaultItems = [[0, options.placeholder]];
  options.city = intval(options.city);
  options.university = intval(options.university);
  options.enableCustom = (options.forceEnableCustom > 0);
  options.realNoResult = options.noResult;
  var selector = new Dropdown(input, options.defaultItems, options);

  function realEnableCustom(value) {
    return (options.forceEnableCustom == 0) ? value : (options.forceEnableCustom > 0);
  }

  function updateChildren(new_value) {
    if (options.facultySelect) {
      options.facultySelect.setOptions({university: new_value});
    }
    if (options.eduFormSelect) {
      options.eduFormSelect.setOptions({university: new_value});
    }
    if (options.eduStatusSelect) {
      options.eduStatusSelect.setOptions({university: new_value});
    }
  }

  function zeroChildren() {
    if (options.facultySelect) {
      options.facultySelect.val(0, true);
    }
    if (options.eduFormSelect) {
      options.eduFormSelect.val(0);
    }
    if (options.eduStatusSelect) {
      options.eduStatusSelect.val(0);
    }
  }

  function updateOnChange() {
    selector.old_setOptions({onChange: function(value) {
      value = intval(value);
      options.university = value;
      zeroChildren();
      updateChildren(value);
      if (!value) {
        selector.clear();
      }
      if (isFunction(options.onChange)) {
        options.onChange(value);
      }
    }});
  }

  function updateVisibility() {
    if ((!options.visible || !options.city || (!options.items_count && !options.enableCustom && !options.ignoreVoidList)) && !options.alwaysVisible) {
      options.hide(options.container);
    } else {
      options.show(options.container);
    }
  }

  function cityUpdated(ignoreChildren) {
    selector.clear();
    if (!ignoreChildren) {
      zeroChildren();
    }
    if (options.city) {
      selectsData.getCityInfo(options.city, 8, function(cityInfo) {
        options.items_count = cityInfo.universities.length;
        var new_options = {
          selectedItems: options.selectedItems,
          defaultItems: [[0, options.placeholder]].concat(cityInfo.universities),
          enableCustom: realEnableCustom(!cityInfo.completed_universities)
        }
        selector.setOptions(new_options);
        selector.setData(cityInfo.universities);
        if (options.university) {
          selector.val(options.university);
        }
        updateVisibility();
      }, options.progressBar);
    } else {
      options.items_count = 0;
      var new_options = {defaultItems: [[0, options.placeholder]], enableCustom: false};
      selector.setOptions(new_options);
      selector.setData([]);
      updateVisibility();
    }
  }

  selector.old_setOptions = selector.setOptions;
  selector.setOptions = function(new_options) {
    extend(options, new_options);
    if ('noResult' in new_options) {
      options.realNoResult = options.noResult;
    }
    if ('enableCustom' in new_options) {
      new_options.enableCustom = intval(new_options.enableCustom) ? true : false;
      if (new_options.enableCustom) {
        new_options.noResult = options.introText;
      } else {
        new_options.noResult = options.realNoResult;
      }
      if (isFunction(options.onEnableCustomChange)) {
        options.onEnableCustomChange(new_options.enableCustom);
      }
    }
    selector.old_setOptions(new_options);
    if ('onChange' in new_options) {
      updateOnChange();
    }
    if ('city' in new_options) {
      options.city = intval(options.city);
      cityUpdated();
    } else if ('visible' in new_options || 'enableCustom' in new_options) {
      updateVisibility();
    }
  }

  selector.show = function() {
    selector.setOptions({visible: true});
  }
  selector.hide = function() {
    selector.setOptions({visible: false});
  }

  cityUpdated(true);
  updateOnChange();

  return selector;
}

function UniversityHintSelect(input, container, options) {

  if (input == null) {
    return false;
  }

  // default options
  var defaults = {
    show: show,
    hide: hide,
    placeholderColor: '#000',
    forceEnableCustom: 0, // manages enableCustom: 0 - as usual, 1 - always, -1 - never
    multiselect: false,
    selectedItems: '',
    visible: true,
    country: 0,
    city: 0,
    university: 0,
    placeholder: getLang('select_uni_not_selected'),
    introText: getLang('select_uni_select'),
    noResult: getLang('select_uni_not_found'),
    dividingLine: 'smart'
  };

  var progressTimer = null;

  // extend default options with user defined
  options = extend(defaults, options);
  options.defaultItems = [[0, options.placeholder]];
  options.country = intval(options.country);
  options.city = intval(options.city);
  options.enableCustom = (options.forceEnableCustom > 0);
  var selector = new Selector(input, '/select_ajax.php?act=a_get_universities&country=' + options.country + '&city=' + options.city, options);

  function realEnableCustom(value) {
    return (options.forceEnableCustom == 0) ? value : (options.forceEnableCustom > 0);
  }

  function updateChildren(new_value) {
    if (options.facultySelect) {
      options.facultySelect.setOptions({university: new_value});
    }
    if (options.eduFormSelect) {
      options.eduFormSelect.setOptions({university: new_value});
    }
    if (options.eduStatusSelect) {
      options.eduStatusSelect.setOptions({university: new_value});
    }
  }

  function zeroChildren() {
    if (options.facultySelect) {
      options.facultySelect.val(0, true);
    }
    if (options.eduFormSelect) {
      options.eduFormSelect.val(0);
    }
    if (options.eduStatusSelect) {
      options.eduStatusSelect.val(0);
    }
  }

  function updateOnChange() {
    selector.old_setOptions({onChange: function(value) {
      value = intval(value);
      options.university = value;
      zeroChildren();
      updateChildren(value);
      if (!value) {
        selector.clear();
      }
      if (isFunction(options.onChange)) {
        options.onChange(value);
      }
    }});
  }

  function updateVisibility() {
    if ((!options.visible || !options.city || (!options.items_count && !options.enableCustom && !options.ignoreVoidList)) && !options.alwaysVisible) {
      options.hide(container);
    } else {
      options.show(container);
    }
  }

  function countryUpdated(ignoreChildren) {
    selector.clear();
    selector.setURL('/select_ajax.php?act=a_get_universities&country=' + options.country);
    if (!ignoreChildren) {
      zeroChildren();
    }
    var new_options = {defaultItems: [[0, options.placeholder]], selectedItems: '', dropdown: true};
    selector.old_setOptions(new_options);
    updateVisibility();
  }

  function cityUpdated(ignoreChildren) {
    selector.clear();
    selector.setURL('/select_ajax.php?act=a_get_universities&country=' + options.country + '&city=' + options.city);
    if (!ignoreChildren) {
      zeroChildren();
    }
    if (options.city) {
      selectsData.getCityInfo(options.city, 8, function(cityInfo) {
        options.items_count = cityInfo.universities.length;
        var new_options = {
          selectedItems: options.selectedItems,
          defaultItems: [[0, options.placeholder]].concat(cityInfo.universities),
          dropdown: true,
          enableCustom: realEnableCustom(!cityInfo.completed_universities)
        }
        selector.setOptions(new_options);
        if (options.university) {
          selector.val(options.university);
        }
        updateVisibility();
      }, options.progressBar);
    } else {
      var new_options = {defaultItems: [[0, options.placeholder]], selectedItems: '', dropdown: true, enableCustom: false};
      selector.setOptions(new_options);
      updateVisibility();
    }
  }

  selector.old_setOptions = selector.setOptions;
  selector.setOptions = function(new_options) {
    extend(options, new_options);
    selector.old_setOptions(new_options);
    if ('onChange' in new_options) {
      updateOnChange();
    }
    if ('enableCustom' in new_options) {
      new_options.enableCustom = intval(new_options.enableCustom) ? true : false;
      if (isFunction(options.onEnableCustomChange)) {
        options.onEnableCustomChange(new_options.enableCustom);
      }
    }
    if ('country' in new_options) {
      options.country = intval(options.country);
      countryUpdated();
    } else if ('city' in new_options) {
      options.city = intval(options.city);
      cityUpdated();
    } else if ('visible' in new_options || 'enableCustom' in new_options) {
      updateVisibility();
    }
  };

  selector.show = function() {
    selector.setOptions({visible: true});
  }
  selector.hide = function() {
    selector.setOptions({visible: false});
  }

  countryUpdated(true);
  cityUpdated(true);
  updateOnChange();

  return selector;
}

function CitySelect(input, container, options) {

  if (input == null) {
    return false;
  }

  // default options
  var defaults = {
    show: show,
    hide: hide,
    placeholderColor: '#000',
    enableCustom: false,
    multiselect: false,
    selectedItems: '',
    visible: true,
    country: 0,
    city: 0,
    placeholder: getLang('select_city_not_selected'),
    introText: getLang('select_city_select'),
    noResult: getLang('select_city_not_found'),
    otherCity: getLang('select_city_other_city'),
    dividingLine: 'smart'
  };

  var progressTimer = null;

  // extend default options with user defined
  options = extend(defaults, options);
  options.defaultItems = !options.multiselect ? [[0, options.placeholder]] : [];
  options.country = intval(options.country);
  var selector = new Selector(input, '/select_ajax.php?act=a_get_cities&country=' + options.country, options);

  function updateChildren(new_value) {
    var opts = selector.options;
    if (opts.streetSelect) {
      opts.streetSelect.setOptions({city: new_value});
    }
    if (opts.stationSelect) {
      opts.stationSelect.setOptions({city: new_value});
    }
    if (opts.districtSelect) {
      opts.districtSelect.setOptions({city: new_value});
    }
    if (opts.placeSelect) {
      opts.placeSelect.setOptions({city: new_value});
    }
    if (opts.schoolSelect) {
      opts.schoolSelect.setOptions({city: new_value});
    }
    if (opts.universitySelect) {
      opts.universitySelect.setOptions({city: new_value});
    }
  }

  function zeroChildren() {
    if (options.streetSelect) {
      options.streetSelect.zero();
    }
    if (options.stationSelect) {
      options.stationSelect.zero();
    }
    if (options.districtSelect) {
      options.districtSelect.zero();
    }
    if (options.placeSelect) {
      options.placeSelect.zero();
    }
    if (selector.options.schoolSelect) {
      selector.options.schoolSelect.val('', true);
    }
    if (selector.options.universitySelect) {
      selector.options.universitySelect.val('', true);
    }
  }

  function updateOnChange() {
    selector.old_setOptions({onChange: function(value) {
      value = intval(value);
      options.city = value;
      zeroChildren();
      if (!value) {
        updateChildren(value);
        selector.clear();
      } else if (value == -1) {
        options.city = value = 0;
        updateChildren(value);
        selector.old_setOptions({dropdown: false, defaultItems: []});
        selector.clear();
        setTimeout(selector.focus, 0);
      } else {
        var fields = 0;
        if (options.stationSelect) {
          fields |= 1;
        }
        if (options.districtSelect) {
          fields |= 2;
        }
        if (options.schoolSelect) {
          fields |= 4;
        }
        if (options.universitySelect) {
          fields |= 8;
        }
        selectsData.getCityInfo(value, fields, function() {
          updateChildren(value);
        }, options.progressBar);
      }
      if (isFunction(options.onChange)) {
        options.onChange(value);
      }
    }});
  }

  function updateVisibility() {
    if (!options.visible || !options.country) {
      options.hide(container);
    } else {
      options.show(container);
    }
  }

  function countryUpdated(ignoreChildren) {
    selector.clear();
    selector.setURL('/select_ajax.php?act=a_get_cities&country=' + options.country);
    if (!ignoreChildren) {
      zeroChildren();
    }
    if (options.country) {
      selectsData.getCountryInfo(options.country, 1, function(response) {
        var new_options = {
          selectedItems: options.selectedItems,
          defaultItems: (!options.multiselect ? [[0, options.placeholder]] : []).concat(response.cities),
          dropdown: true
        };

        if (isArray(options.city) && options.city[0]) {
          for (var i = 0; i < response.cities.length; ++i) {
            if (response.cities[i][0] == options.city[0]) {
              break;
            }
          }
          if (i == response.cities.length) {
            new_options.defaultItems.push(options.city);
          }
        }
        if (options.predefined_countries_cities && options.predefined_countries_cities[options.country]) {
          // No other cities
          new_options.autocomplete = false;
        } else {
          new_options.autocomplete = true;
          new_options.defaultItems.push([-1, options.otherCity]);
        }
        selector.old_setOptions(new_options);

        if (options.multiselect) {
          for (var i in options.city) {
            selector.val(options.city[i]);
          }
        } else {
          if (options.city && (!isArray(options.city) || options.city[0])) {
            selector.val(options.city);
          }
        }
      }, options.progressBar);
    } else {
      var new_options = {defaultItems: (!options.multiselect ? [[0, options.placeholder]] : []), selectedItems: '', dropdown: true};
      selector.old_setOptions(new_options);
    }
    updateVisibility();
  }

  selector.old_setOptions = selector.setOptions;
  selector.setOptions = function(new_options) {
    extend(options, new_options);
    selector.old_setOptions(new_options);
    if ('onChange' in new_options) {
      updateOnChange();
    }
    if ('country' in new_options) {
      options.country = intval(options.country);
      countryUpdated();
    } else if ('visible' in new_options) {
      updateVisibility();
    }
  };

  selector.show = function() {
    selector.setOptions({visible: true});
  }
  selector.hide = function() {
    selector.setOptions({visible: false});
  }

  countryUpdated(true);
  updateOnChange();

  return selector;
}

function CountrySelect(input, container, options) {

  if (input == null) {
    return false;
  }

  // default options
  var defaults = {
    show: show,
    hide: hide,
    placeholderColor: '#000',
    country: 0,
    visible: true,
    multiselect: false,
    placeholder: getLang('select_country_not_selected'),
    introText: getLang('select_country_select'),
    noResult: getLang('select_country_not_found'),
    full_list: getLang('select_country_full_list')
  };

  var progressTimer = null;

  // extend default options with user defined
  options = extend(defaults, options);
  options.defaultItems = !options.multiselect ? [[0, options.placeholder]] : [];
  var selector = new Dropdown(input, options.defaultItems, options);

  function updateChildren(new_value) {
    var opts = selector.options;
    if (opts.citySelect) {
      opts.citySelect.setOptions({country: new_value});
    }
    if (opts.eduFormSelect) {
      opts.eduFormSelect.setOptions({country: new_value});
    }
    if (opts.eduStatusSelect) {
      opts.eduStatusSelect.setOptions({country: new_value});
    }
    if (opts.classSelect) {
      opts.classSelect.setOptions({country: new_value});
    }
    if (opts.schoolSelect) {
      opts.schoolSelect.setOptions({country: new_value});
    }
    if (opts.universitySelect) {
      opts.universitySelect.setOptions({country: new_value});
    }
  }

  function zeroChildren() {
    if (options.citySelect) {
      options.citySelect.val(0, true);
    }
  }

  function updateOnChange() {
    selector.old_setOptions({onChange: function(value) {
      value = intval(value);
      zeroChildren();
      if (!value) {
        options.country = 0;
        selector.clear();

        updateChildren(0);
      } else if (value == -1) {
        options.country = 0;
        selector.clear();
        updateChildren(0);
        selectsData.getCountriesFull(function(countries) {
          var new_options = {defaultItems: (!options.multiselect ? [[0, options.placeholder]] : []).concat(countries)};
          selector.old_setOptions(new_options);
          if (options.country) {
            selector.val(options.country);
          }
        }, options.progressBar);
      } else if (value >= 0) {
        options.country = value;
        var fields = 0;
        if (options.citySelect) {
          fields |= 1;
        }
        if (options.eduFormSelect) {
          fields |= 2;
        }
        if (options.eduStatusSelect) {
          fields |= 4;
        }
        if (options.classSelect) {
          fields |= 8;
        }
        selectsData.getCountryInfo(value, fields, function() {
          updateChildren(value);
        }, options.progressBar);
      }
      if (isFunction(options.onChange)) {
        options.onChange(value);
      }
    }});
  }

  function updateVisibility() {
    if (!options.visible) {
      options.hide(container);
    } else {
      options.show(container);
    }
  }

  selector.old_setOptions = selector.setOptions;
  selector.setOptions = function(new_options) {
    extend(options, new_options);
    selector.old_setOptions(new_options);
    if ('onChange' in new_options) {
      updateOnChange();
    }

    if ('visible' in new_options) {
      updateVisibility();
    }
  };

  selector.show = function() {
    selector.setOptions({visible: true});
  }
  selector.hide = function() {
    selector.setOptions({visible: false});
  }

  selectsData.getCountries(function(countries) {
    var new_options = {defaultItems: (!options.multiselect ? [[0, options.placeholder]] : []).concat(countries)};
    if (countries.length > 200) { // English langpack - full list already
      new_options.autocomplete = true;
      selector.old_setOptions(new_options);
      var data_countries = [], found = {};
      for (var i = 0; i < countries.length; ++i) {
        if (!found[countries[i][0]]) {
          data_countries.push(countries[i]);
          found[countries[i][0]] = 1;
        }
      }
      selector.setData(data_countries);
    } else {
      if (isArray(options.country) && options.country[0]) {
        for (var i = 0; i < countries.length; ++i) {
          if (countries[i][0] == options.country[0]) {
            break;
          }
        }
        if (i == countries.length) {
          new_options.defaultItems.push(options.country);
        }
      }
      if (options.full_list) {
        new_options.defaultItems.push([-1, options.full_list]);
      }
      selector.old_setOptions(new_options);
    }
    if (options.country || !options.noDefaultCountry) selector.val(options.country);
  }, options.progressBar);

  updateOnChange();
  updateVisibility();

  return selector;
}

function _SelectsData() {
  var countries_list = [], countries = [], cities = [];
  var schools = [], universities = [], faculties = [];

// parent: -1 - all countries, 0 - basic countries.
  function setCountries(parent) {
    return function(countries) {
      countries_list[parent] = countries;
    }
  }
  function getCountries(parent) {
    return function(handler, progressBar) {
      if (countries_list[parent]) {
        handler(countries_list[parent]);
      } else {
        show(progressBar);
        var done = function(text) {
          hide(progressBar);
          var response = eval('(' + text + ')');
          setCountries(parent)(response.countries);
          handler(response.countries);
        }
        var url = '/select_ajax.php';
        var query = {'act': 'a_get_countries', 'basic': (parent >= 0) ? 1 : 0 };
        if (vk.al) {
          ajax.plainpost(url, query, done);
        } else {
          (new Ajax(function(obj, text) { done(text); })).post(url, query);
        }
      }
    }
  }

  function getCompleted(value) {
    return isNaN(parseInt(value)) ? -1 : value;
  }

  function setCountryInfo(country, info) {
    countries[country] = countries[country] ?
      extend(countries[country], info) : {
        cities       : info.cities       || false,
        edu_forms    : info.edu_forms    || false,
        edu_statuses : info.edu_statuses || false,
        classes      : info.classes      || false
      };
  }

  function setCities(country, cities) {
    setCountryInfo(country, {cities: cities});
  }

  function setCityInfo(city, info) {
    cities[city] = cities[city] ?
      extend(cities[city], info) : {
        completed_streets     : getCompleted(info.completed_streets),
        completed_universities: getCompleted(info.completed_universities),
        completed_schools     : getCompleted(info.completed_schools),
        schools               : info.schools                || false,
        universities          : info.universities           || false,
        districts             : info.districts              || false,
        stations              : info.stations               || false
      };
  }

  function setUniversityInfo(university, info) {
    universities[university] = universities[university] ?
      extend(universities[university], info) : {
        completed_faculties: getCompleted(info.completed_faculties),
        faculties          : info.faculties           || false
      };
  }

  function setFacultyInfo(faculty, info) {
    faculties[faculty] = faculties[faculty] ?
      extend(faculties[faculty], info) : {
        completed_chairs: getCompleted(info.completed_chairs),
        chairs          : info.chairs           || false
      };
  }

  function addUniversity(city, university) {
    cities[city].universities.push(university);
  }

  function addFaculty(university, faculty) {
    universities[university].faculties.push(faculty);
  }

  function addChair(faculty, chair) {
    faculties[faculty].chairs.push(chair);
  }

  function addSchool(city, school) {
    cities[city].schools.push(school);
  }

  function makeRequest(query, done, progress) {
    show(progress);
    var d = function(text) {
      hide(progress);
      done(eval('(' + text + ')'));
    }
    var url = '/select_ajax.php';
    if (vk.al) {
      ajax.plainpost(url, query, d);
    } else {
      (new Ajax(function(obj, text) { d(text); })).post(url, query);
    }
  }

  return {
    setCountries: setCountries(0),
    setCountriesFull: setCountries(-1),

    setCountryInfo: setCountryInfo,

    setCities: setCities,

    setCityInfo: setCityInfo,

    setUniversityInfo: setUniversityInfo,

    setFacultyInfo: setFacultyInfo,

    addUniversity: addUniversity,
    addFaculty: addFaculty,
    addChair: addChair,
    addSchool: addSchool,

    getCountries: getCountries(0),
    getCountriesFull: getCountries(-1),

    getCountryInfo: function(country, fields, handler, progressBar) {
      var fields_needed = 0;
      if (countries[country]) {
        if ((fields & 1) && !countries[country].cities) {
          fields_needed |= 1;
        }
        if ((fields & 2) && !countries[country].edu_forms) {
          fields_needed |= 2;
        }
        if ((fields & 4) && !countries[country].edu_statuses) {
          fields_needed |= 4;
        }
        if ((fields & 8) && !countries[country].classes) {
          fields_needed |= 8;
        }
      } else {
        fields_needed = fields;
      }
      if (!fields_needed) {
        handler(countries[country]);
      } else {
        var query = {'act': 'a_get_country_info', 'country': country, 'fields': fields_needed};
        makeRequest(query, function(response) {
          setCountryInfo(country, response);
          handler(response);
        }, progressBar);
      }
    },

    getCityInfo: function(city, fields, handler, progressBar) {
      var fields_needed = 0;
      if (cities[city]) {
        if ((fields & 1) && !cities[city].stations) {
          fields_needed |= 1;
        }
        if ((fields & 2) && !cities[city].districts) {
          fields_needed |= 2;
        }
        if ((fields & 4) && (!cities[city].schools || cities[city].completed_schools == -1)) {
          fields_needed |= 4;
        }
        if ((fields & 8) && (!cities[city].universities || cities[city].completed_universities == -1)) {
          fields_needed |= 8;
        }
        if ((fields & 16) && !fields_needed && cities[city].completed_streets == -1) {
          $fields_needed = -1;
        }
      } else {
        fields_needed = fields;
      }
      if (!fields_needed) {
        handler(cities[city]);
      } else {
        var query = {'act': 'a_get_city_info', 'city': city, 'fields': fields_needed};
        makeRequest(query, function(response) {
          setCityInfo(city, response);
          handler(response);
        }, progressBar);
      }
    },

    getUniversityInfo: function(university, handler, progressBar) {
      if (universities[university] && universities[university].faculties && universities[university].completed_faculties != -1) {
        handler(universities[university]);
      } else {
        var query = {'act': 'a_get_uni_info', 'uni': university};
        makeRequest(query, function(response) {
          setUniversityInfo(university, response);
          handler(response);
        }, progressBar);
      }
    },

    getFacultyInfo: function(faculty, handler, progressBar) {
      if (faculties[faculty] && faculties[faculty].chairs && faculties[faculty].completed_chairs != -1) {
        handler(faculties[faculty]);
      } else {
        var query = {'act': 'a_get_fac_info', 'fac': faculty};
        makeRequest(query, function(response) {
          setFacultyInfo(faculty, response);
          handler(response);
        }, progressBar);
      }
    }
  };
}

if (!window.selectsData) {
  window.selectsData = new _SelectsData();
}

try{stManager.done('selects.js');}catch(e){}
