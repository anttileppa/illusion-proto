$(function() {
  $.widget("custom.tosstable", {
    options : {},
    _create : function() {
      this.element
        .addClass('tosstable')
        .droppable({
          scope: 'tosstable'
        })
        .on('drop', $.proxy(this._onDrop, this))
        .disableSelection();
    },
    _onDrop: function (event, ui) {
      ui.draggable.tossable("tabled", event.target);
    },
    _destroy : function() {
    }
  });
  
  $.widget("custom.tossable", {
    options : {},
    _create : function() {
      this._tabled = false;
      this._table = null;
      
      this.element
        .addClass('tossable')
        .draggable({
          scope: 'tosstable',
          revert: $.proxy(function(dropped) {
            return !this._wasTabled && !dropped;
          }, this)
        })
        .on("dragstart", $.proxy(this._dragStart, this))
        .on("dragstop", $.proxy(this._dragStop, this))
        .disableSelection();
    },
    _dragStart: function (event, ui) {
      this._wasTabled = this._tabled;
      this._tabled = false;
    },
    _dragStop: function (event, ui) {
      if (this._tabled) {
        this._trigger("tabled", event, {
          wasTabled: this._wasTabled,
          table: this._table
        });
      } else {
        if (this._wasTabled) {
          this._trigger("picked", event, {});
        } else {
          this._trigger("tossed", event, {});
        }
      }
    },
    tabled: function (table) {
      this._tabled = true;
      this._table = table;
    },
    _destroy : function() {
    }
  });
});