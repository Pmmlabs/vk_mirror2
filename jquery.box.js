/*
 * Popup fade box
 *
 * Author: Andrew Rogozov
 *
 * Last updated: 2008-09-24
 *
 * Need popup_box.css
 *
 **/

 /* Example:

   var box = new FadeBox(
     // default options:
     {
       type: "MESSAGE", // "MESSAGE" || "POPUP"
       hideOnClick: true, // hide popup box if user clicked on it
       title: "Alert",
       width: "410px",
       height: "auto"
     }
   );

   box.addButton({
     label: 'Yes',
     onClick: function(){
       // do somethig
       box.hide();
     }
   }).addButton({
     label: 'Cancel',
     style: 'buttonNo', // button class
     onClick: function() {
       box.hide();
     }
   });

   // Show content
   box.content('Content text or HTML').show();

   // or load remote content
   box.loadContend('/remote.php').show();

   // update options
   box.setOptions({
    // options
   });


   // Hide box
   box.hide();

 *
 */

(function($) {

FadeBox = function(options) {
  options = $.extend({}, FadeBox.defaults, options);
  var $document = $(document);
  var buttonsCount = 0;
  var boxContainer, boxBG, boxContainer, boxLayout, boxTitle, boxBody, boxControls, buttonYes, buttonNo;
  boxBG = $('<div id="fadeBoxBG" style="display:none"></div>').appendTo('body');
  boxContainer = $('<div id="fadeBoxContainer" style="display:none"></div>').insertAfter(boxBG);
  boxLayout = $('<div id="boxLayout"></div>').appendTo(boxContainer);
  boxTitle = $('<div id="boxTitle"></div>').appendTo(boxLayout).wrap('<div id="boxTitleWrap"></div>');
  boxBody = $('<div id="boxBody"></div>').appendTo(boxLayout);
  boxControls = $('<div id="boxControls"></div>').appendTo(boxLayout);

  boxBG.height($document.height());

  $(document).keydown(function(e){
    if (e.keyCode == 27) {
      hide();
    }
  });

  refreshCoords();
  refreshBox();

  // Refresh box position
  function refreshCoords() {
    // Fix for opera version > 9.5: http://dev.jquery.com/ticket/3340
    //var height = ($.browser.opera && $.browser.version.indexOf('9.5') != -1)? document.documentElement.clientHeight : $(window).height();

    // that's better ;)
    var height = window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.offsetHeight)

    boxContainer.css({
      top: $document.scrollTop() + (height - boxContainer.height()) / 3,
      marginLeft: - boxContainer.width() / 2
    });
  }

  // Add button
  function addButton(options) {
    buttonsCount++;
    if (typeof options != 'object') options = {};
    options = $.extend({
        label: 'Button' + buttonsCount,
        style: 'buttonYes'
    }, options);

    var button = $('<div></div>').prependTo(boxControls).wrap('<div id="button' + buttonsCount + '" class="buttonWrap ' + options.style + '"></div>');
    button.html(options.label);
    button.hover(function(){
      $(this).addClass('buttonHover');
    }, function() {
      $(this).removeClass('buttonHover');
    });
    if (options.onClick) {
      button.click(function(e) {
        options.onClick(e);
      });
    }
    return button;
  }

  // Remove buttons
  function removeButtons() {
    buttonsCount = 0;
    boxControls.empty();
  }

  // Refresh box properties
  function refreshBox() {
    // Set title
    boxTitle.html(options.title);

    // Set box dimensions
    boxContainer.width(options.width);
    boxContainer.height(options.height);

    // Switch box type
    boxContainer.removeClass();
    boxContainer.unbind('click');
    if (options.hideOnClick && options.type == 'POPUP') {
      boxContainer.click(function(){
        hide();
      });
    }

    switch (options.type) {
      case 'POPUP':
        boxContainer.addClass('popupBox');
        boxBG.click(function(){
          hide();
        });
      break;

      case 'MESSAGE':
        boxContainer.addClass('messageBox');
        boxBG.unbind('click');
      break;
    }
  }

  // Show box
  function show() {
    refreshCoords();
    // Show blocking background
    boxBG.show();
    // Hide all flash movies
    $('embed').add('object').css('visibility', 'hidden');
    // Show box
    boxContainer.fadeIn('fast', options.onShow);
  }
  // Hide box
  function hide() {
    boxContainer.fadeOut('fast', function(){
      boxBG.hide();
      // Hide all flash movies
      $('embed').add('object').css('visibility', 'visible');
      if (options.onHide) options.onHide();
    });
  }

  return {

    // Show box
    show: function() {
      show(); return this;
    },

    // Hide box
    hide: function() {
      hide(); return this;
    },

    // Insert html content into the box
    content: function(html) {
      boxBody.html(html);
      return this;
    },

    // Load html content from URL
    loadContent: function(url, params) {
      $.ajaxSetup({error: function(data){
        boxBody.html('Request error occured.');
        if (options.onLoadError) options.onLoadError(data.responseText);
      }});
      // Show loader
      boxBody.html('<div id="boxLoader"></div>');

      // Load remote html using get request
      if (typeof params != 'object') params = {};
      $.get(url, params, function(data, textStatus) {
        boxBody.html(data);
        refreshCoords();
        if (options.onLoad) options.onLoad(data, textStatus);
      });
      return this;
    },

    // Add button
    addButton: function(options) {
      addButton(options);
      return this;
    },

    // Remove buttons
    removeButtons: function(options) {
      removeButtons();
      return this;
    },

    // Update box options
    setOptions: function(newOptions) {
      options = $.extend({}, options, newOptions);
      refreshBox();
      return this;
    }
  };
};

FadeBox.defaults = {
  type: "MESSAGE", // "MESSAGE" || "POPUP"
  hideOnClick: true,
  title: "Alert",
  width: "410px",
  height: "auto"
};

})(jQuery);