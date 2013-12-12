$(function() {
  'use strict';
  
  $.widget("custom.gametable", {
    options : {},
    _create : function() {
      this.element
        .tosstable();
    },
    _destroy : function() {
    }
  });
  
  $.widget("custom.gametableSpaceIcon", {
    options : {
      name: 'Untitled', 
      image: 'about:blank'
    },
    _create : function() {
      this.element
        .addClass("gametable-space-icon")
        .append($('<img>').attr("src", this.options.image))
        .append($('<label>').text(this.options.name));
      
      if (this.options.selected) {
        this.element.addClass("gametable-space-icon-selected");
      }
    },
    _destroy : function() {
    }
  });
  
  $.widget("custom.gametableItem", {
    options : {
      width: 64,
      height: 64,
      tableWidth: 96,
      tableHeight: 96
    },
    
    _create : function() {
      $('<label>')
        .html(this.options.label||'')
        .appendTo(this.element);
      
      this.element
        .addClass("gametable-item")
        .css({
          width: this.options.width + 'px',
          height: this.options.height + 'px',
          position: 'relative'
        })
        .tossable()
        .on("mousedown", $.proxy(function (event, data) {
          if (!$(this.element).data('originals')) {
            $(this.element).data('originals', {
              parent: $(this.element).parent(),
              position: $(this.element).css('position'),
              display: $(this.element).css('display'),
              margin: {
                left: $(this.element).css('marginLeft'),
                top: $(this.element).css('marginTop'),
                right: $(this.element).css('marginRight'),
                bottom: $(this.element).css('marginBottom')
              }
            });
          }
          
          $(this.element).css({
            margin: 0
          });
          
          this._enlarge($.proxy(function() {
            $(document.body).append($(this.element));
          }, this));
        }, this))
        .on("mouseup", $.proxy(function (event, data) {
          this._shrink();
        }, this))
        .on("tossabletossed", $.proxy(function (event, data) {
          this._revert();
        }, this))
        .on("tossableremovedfromtable", $.proxy(function (event, data) {
          this._revert();
        }, this))
        .on("tossabletabled", function (event, data) {
        })
    },
    _setOption: function( key, value ) {
      if (key === "label") {
        this.element.find('label').html(value);
      }
      
      this._super( key, value );
    },

    _enlarge: function (callback) {
      var offset = $(this.element).offset();

      $(this.element)
        .stop(true, false)
        .css({
          position: 'absolute',
          top: offset.top + 'px',
          left: offset.left + 'px'
        })
        .animate({
          width: this.options.tableWidth + 'px', 
          height: this.options.tableHeight + 'px'
        }, {
          easing: 'easeOutBounce',
          duration: 1000,
          complete: function () {
            if (callback)
              callback();
          }
        })
        .css('overflow', 'visible');
    },
    _shrink: function (callback) {
      $(this.element)
        .stop(true, false)
        .animate({
          width: this.options.width + 'px', 
          height: this.options.height + 'px'
        }, {
          easing: 'easeOutBounce',
          duration: 1000,
          complete: $.proxy(function () {
            if (callback)
              callback();
          }, this)
        })
        .css('overflow', 'visible');
    },
    
    _revert: function (callback) {
      var duration = 1200;
      var easing = 'easeOutBounce';
      
      var originals = $(this.element).data('originals');
      var parent = originals.parent;
      var placeHolder = $('<div>')
        .css({
          position: originals.position,
          display: originals.display,
          width: 0,
          height: 0,
          marginLeft: originals.margin.left,
          marginRight: originals.margin.right,
          marginTop: originals.margin.top,
          marginBottom: originals.margin.bottom,
          paddingLeft: originals.margin.left
        })
        .appendTo(parent);
      var offset = placeHolder.offset();
      //placeHolder.remove();
      
      placeHolder.animate({
        width: this.options.width + 'px', 
        height: this.options.height + 'px'
      }, {
        easing: easing,
        duration: duration
      });
      
      $(this.element)
        .stop(true, false)
        .animate({
          width: this.options.width + 'px', 
          height: this.options.height + 'px',
          top: offset.top + 'px',
          left: offset.left + 'px'
        }, {
          easing: easing,
          duration: duration,
          complete: $.proxy(function () {
            placeHolder.remove();
            $(this.element)
              .appendTo(parent)
              .css({
                top: 0,
                left: 0,
                position: 'relative',
                marginLeft: originals.margin.left,
                marginRight: originals.margin.right,
                marginTop: originals.margin.top,
                marginBottom: originals.margin.bottom
              });
            
            if (callback)
              callback();
          }, this)
        })
        .css('overflow', 'visible');
    },
    
    _destroy : function() {
    }
  });
  
  $.widget("custom.gametableItemAudio", {
    _create : function() {
      this.element
        .addClass("gametable-audio-item")
        .gametableItem({
          label: this.options.label
        });
    },
    _destroy : function() {
    }
  });
  
  $.widget("custom.gametableItemLink", {
    _create : function() {
      this.element
        .addClass("gametable-link-item")
        .gametableItem({
          label: this.options.link
        })
        .on("dblclick", $.proxy(function (event) {
          var table = $(this.element).tossable("table");
          if (table) {
            $('<iframe>')
              .attr("src", this.options.link)
              .appendTo(table);
          }
        }, this));
    },
    _destroy : function() {
    }
  });
  
  $.widget("custom.gametableItemPdf", {
    _create : function() {
      this.element
        .addClass("gametable-pdf-item")
        .gametableItem({
          label: this.options.label
        });
    },
    _destroy : function() {
    }
  });
  
  $.widget("custom.gametableItemDice", {
    _create : function() {
      this.element
        .addClass("gametable-dice-item")
        .gametableItem({
          label: this.options.roll
        })
        .on("tossabletabled", function (event, data) {
          $(this).gametableItemDice("roll");
        })
        .on("tossablemovedontable", function (event, data) {
          $(this).gametableItemDice("roll");
        })
        .on("tossablechangedtable", function (event, data) {
          $(this).gametableItemDice("roll");
        })
    },
    roll: function () {
      var roll = $(this.element).gametableItemDice("option", "roll" );
      var jsRoll = 'Math.round(' + roll
        .replace(/([0-9]{1,})([\*]{0,1})(d)([0-9]{1,})/g, "($1*(1 + (Math.random()*($4 - 1))))")
        .replace(/(d)([0-9]{1,})/g, "(1 + (Math.random()*($2 - 1)))") + ')';
      $(this.element).gametableItem("option", "label", roll + ' = ' + eval(jsRoll));
    },
    _destroy : function() {
    }
  });
});