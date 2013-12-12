$(function() {
  'use strict';

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
          scope: 'tosstable'
        })
        .on("dragstart", $.proxy(this._dragStart, this))
        .on("dragstop", $.proxy(this._dragStop, this))
        .disableSelection();
    },
    _dragStart: function (event, ui) {
      this._oldTable = this._table;
      this._table = null;
      
      this._trigger("picked", event, {
        oldTable: this._oldTable,
        table: this._table
      });
    },
    _dragStop: function (event, ui) {
      if (this._table != null) {
        if (this._table === this._oldTable) {
          // Moved within table
          this._trigger("movedontable", event, {
            table: this._table
          });
        } else {
          if (this._oldTable === null) {
            // Tabled
            this._trigger("tabled", event, {
              table: this._table
            });
          } else {
            // Moved to another table
            this._trigger("changedtable", event, {
              oldTable: this._oldTable,
              table: this._table
            });
          }
        }
      } else {
        if (this._oldTable === null) {
          // Just tossed
          this._trigger("tossed", event, {});
        } else {
          // Removed from table
          this._trigger("removedfromtable", event, {
            oldTable: this._oldTable
          });
        }
      }
    },
    table: function () {
      return this._table;
    },
    tabled: function (table) {
      this._table = table;
    },
    _destroy : function() {
    }
  });
});