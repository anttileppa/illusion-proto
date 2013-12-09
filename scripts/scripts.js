(function() {
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
      tableWidth: 128,
      tableHeight: 128
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
        .on("tossabletossed", function (event, data) {
          console.log("just tossed");
        })
        .on("tossablepicked", function (event, data) {
          var width = $(this).gametableItem("option", "width");
          var height = $(this).gametableItem("option", "height");
          
          $(event.target).css({
            position: 'relative',
            top: 0,
            left: 0
          }).animate({
            width: width + 'px', 
            height: height + 'px'
          }, {
            easing: 'easeOutBounce',
            duration: 1000
          }).css('overflow', 'visible');
      })
      .on("tossabletabled", function (event, data) {
        var tableWidth = $(this).gametableItem("option", "tableWidth" );
        var tableHeight = $(this).gametableItem("option", "tableHeight" );
        var _this = $(this);
        
        if (!data.wasTabled) {
          var placeHolder = $('<div>')
            .addClass('gametable-item')
            .css({
              opacity: 0, 
              height: $(this).outerHeight() + 'px'
            });
          
          var offset = $(this).offset();
          
          $(this).css({
            position: 'absolute',
            top: offset.top + 'px',
            left: offset.left + 'px'
          });
          
          placeHolder.insertAfter($(this));
                    
          $(placeHolder).slideUp({
            easing: 'easeOutBounce',
            duration: 1000,
            complete: function () {
              $(this).remove();
            }
          });
          
          $(event.target).animate({
            width: tableWidth + 'px', 
            height: tableHeight + 'px'
          }, {
            easing: 'easeOutBounce',
            duration: 1000,
            complete: function () {
            }
          }).css('overflow', 'visible');
        } else {
          // moved on table
        }
      })
    },
    _setOption: function( key, value ) {
      if (key === "label") {
        this.element.find('label').html(value);
      }
      
      this._super( key, value );
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
          label: this.options.label
        });
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
          var roll = $(this).gametableItemDice("option", "roll" );
          var jsRoll = 'Math.round(' + roll
            .replace(/([0-9]{1,})([\*]{0,1})(d)([0-9]{1,})/g, "($1*(1 + (Math.random()*($4 - 1))))")
            .replace(/(d)([0-9]{1,})/g, "(1 + (Math.random()*($2 - 1)))") + ')';
          $(this).gametableItem("option", "label", roll + ' = ' + eval(jsRoll));
        })
        .on("tossablepicked", function (event, data) {
          $(this).gametableItem("option", "label", $(this).gametableItemDice("option", "roll" ));
        })
    },
    _destroy : function() {
    }
  });

  $(document).ready(function() {
    $(".gametable")
      .gametable();
    
    $('<div>')
      .gametableSpaceIcon({
        name: 'Shared Space', 
        image: 'http://farm5.staticflickr.com/4118/4857026160_be2146d4fa.jpg',
        selected: true
      })
      .appendTo($('.gametable-space-icons'));

    $('<div>')
      .gametableSpaceIcon({
        name: 'Board', 
        image: 'http://farm3.staticflickr.com/2625/3774896826_a9eb810112.jpg'
      })
      .appendTo($('.gametable-space-icons'));
    
    $('<div>')
      .gametableSpaceIcon({
        name: 'Enslaver of Humanity', 
        image: 'http://farm9.staticflickr.com/8037/8056870326_24befc3c2f.jpg'
      })
      .appendTo($('.gametable-space-icons'));

    $('<div>')
      .gametableSpaceIcon({
        name: 'Mr Monkey', 
        image: 'http://farm2.staticflickr.com/1233/4726132269_aa71fe7a4c.jpg'
      })
      .appendTo($('.gametable-space-icons'));
            
    $('<div>')
      .gametableItemAudio({
        label: 'Vivaldin Neljä vuodenaikaa'
      })
      .appendTo($('.gametable-material-item-group'));
    
    $('<div>')
      .gametableItemPdf({
        label: 'Aarniometsän Tanssivat ravut #8 - Karvaturrit banaaneja poimimassa'
      })
      .appendTo($('.gametable-material-item-group'));
    
    $('<div>')
      .gametableItemLink({
        label: 'http://www.google.com'
      })
      .appendTo($('.gametable-material-item-group'));
    
    $('<div>')
      .gametableItemDice({
        roll: '2d20+20'
      })
      .appendTo($('.gametable-dice-item-group'));
    
    $('<div>')
    .gametableItemDice({
      roll: 'd6'
    })
    .appendTo($('.gametable-dice-item-group'));
    
    $('<div>')
    .gametableItemDice({
      roll: 'd100 / 3'
    })
    .appendTo($('.gametable-dice-item-group'));
    
    $('<div>')
    .gametableItemDice({
      roll: 'd2+d2+d2'
    })
    .appendTo($('.gametable-dice-item-group'));
  });
  

}).call(this);
