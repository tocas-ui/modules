// Generated by CoffeeScript 2.0.0-beta2
var TocasCheckbox;

TocasCheckbox = (function() {
  class TocasCheckbox {
    $init({$this, $module}) {
      $this.on('click', function(e) {
        if (!$this.find('input').prop('disabled')) {
          return $module.prototype._toggle($this, $module);
        }
      });
      return ts.fn;
    }

    _event($this, event) {
      return $this.data(event).call($this.get());
    }

    _toggle($this) {
      if ($this.find('input').prop('checked') && !$this.hasClass('radio')) {
        return this._uncheck($this);
      } else {
        return this._check($this);
      }
    }

    _status($this) {
      var checkbox, isRadio;
      isRadio = $this.hasClass('radio');
      checkbox = $selector($this, isRadio ? 'input[type="radio"]' : 'input[type="checkbox"]');
      return {
        isRadio: isRadio,
        checkbox: checkbox
      };
    }

    _check($this) {
      var checkbox, isRadio, name;
      if (!this._event($this, 'beforeChecked')) {
        return;
      }
      this._event($this, 'onChecked');
      this._event($this, 'onChange');
      ({isRadio, checkbox} = this._status($this));
      if (isRadio) {
        name = checkbox.attr('name');
        $selector(`input[type='radio'][name='${name}']`).each((element) => {
          return this._uncheck($selector(element).parent());
        });
        return checkbox.prop('checked', true);
      } else {
        return checkbox.prop('checked', true);
      }
    }

    _uncheck($this) {
      var checkbox;
      if (!this._event($this, 'beforeUnchecked')) {
        return;
      }
      this._event($this, 'onUnchecked');
      this._event($this, 'onChange');
      ({checkbox} = this._status($this));
      return checkbox.prop('checked', false);
    }

  };

  TocasCheckbox.prototype.$name = 'checkbox';

  TocasCheckbox.prototype.$options = {
    onChange: function() {},
    onChecked: function() {},
    onUnchecked: function() {},
    beforeChecked: function() {
      return true;
    },
    beforeUnchecked: function() {
      return true;
    },
    onEnable: function() {},
    onDisable: function() {}
  };

  TocasCheckbox.prototype.$methods = {
    toggle: function({$this, $module}) {
      $module.prototype._toggle($this);
      return ts.fn;
    },
    check: function({$this, $module}) {
      $module.prototype._check($this);
      return ts.fn;
    },
    uncheck: function({$this, $module}) {
      $module.prototype._uncheck($this);
      return ts.fn;
    },
    disable: function({$this}) {
      this._event($this, 'onDisable');
      $this.find('input').prop('disabled', true);
      return ts.fn;
    },
    enable: function({$this}) {
      this._event($this, 'onEnable');
      $this.find('input').prop('disabled', false);
      return ts.fn;
    },
    'is disable': function({$this}) {
      return $this.find('input').prop('disabled');
    },
    'is enable': function({$this}) {
      return !$this.find('input').prop('disabled');
    },
    'is checked': function({$this}) {
      return $this.find('input').prop('checked');
    },
    'is unchecked': function({$this}) {
      return !$this.find('input').prop('checked');
    },
    'attach events': function({$this}, selector, event) {
      $selector(selector).on('click', function() {
        return ts($this).checkbox(event);
      });
      return ts.fn;
    }
  };

  return TocasCheckbox;

})();

new ts(TocasCheckbox);
