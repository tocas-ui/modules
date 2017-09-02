// Generated by CoffeeScript 2.0.0-beta4
var TocasRating;

TocasRating = (function() {
  class TocasRating {
    
    // 初始化事件。
    _init({$this, $options, $module}, {rating, maxRating}) {
      var _, i, ref, set;
      // 如果已經有星星的話則移除所有星星。
      $this.find('i').remove();
      // 初始化評分元件的時候，依照設置來決定要在元件內產生幾顆星星元素。
      for (_ = i = 1, ref = maxRating; 1 <= ref ? i <= ref : i >= ref; _ = 1 <= ref ? ++i : --i) {
        $selector('<i>').addClass('icon').appendTo($this);
      }
      // 當使用者在圖示上觸控按著移動的時候。
      $this.on('touchmove', function(e) {
        var $icon;
        $icon = $selector(document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY));
        if ($selector(e.target).parent().get() !== $icon.parent().get()) {
          return;
        }
        $icon.prevAll().addBack().addClass('selected');
        $icon.nextAll().removeClass('selected');
        return $this.data('$lastIcon', $icon);
      });
      // 當使用者在圖示上放開觸控的時候。
      $this.find('.icon').on('touchend', function(e) {
        var $lastIcon, currentRating;
        $lastIcon = $this.data('$lastIcon');
        // 如果沒有 touchmove 時所記錄的最後一個圖示元素則離開。
        if ($lastIcon === void 0) {
          $lastIcon = $selector(e.target);
        }
        // 取得目前的評分數值還有點擊的評分數值。
        rating = $lastIcon.index() + 1;
        currentRating = $this.data('rating');
        // 如果目前的評分數值和點下去的ㄧ樣。
        if (rating === currentRating) {
          // 如果這個評分元件允許重設評分，就來重設吧。
          if ($this.data('clearable') === true) {
            // 重設評分為零。
            return $module.prototype._set({$this}, 0);
          }
        } else {
          // 設置評分的分數。
          // 不然如果點的是其他的評分。
          return $module.prototype._set({$this}, rating);
        }
      });
      // 當滑鼠在圖示上移動的時候。
      $this.find('.icon').on('mousemove', function() {
        var isLast;
        isLast = $this.data('isLast');
        if (!isLast) {
          // 如果這個星星不是剛點擊的，我們就把這個星星和前面的星星
          // 加上「選取中」的樣式，讓使用者能分辨目前滑鼠所選取的星星數量和實際數量的差異。
          return $selector(this).prevAll().addBack().addClass('selected');
        }
      });
      // 當滑鼠移出圖示的時候。
      $this.on('mouseout', function() {
        // 移除所有圖示的「選取中」樣式。
        $this.children().removeClass('selected');
        // 因為移出了圖示，所以沒有被點擊，把被點擊設置為 `false`。
        return $this.data('isLast', false);
      });
      set = function(e) {
        var currentRating;
        $selector(this).off('mouseup click', set);
        if ($this.data('$lastIcon') !== void 0 && $this.data('$lastIcon').get() === e.target) {
          return;
        }
        // 取得目前的評分數值還有點擊的評分數值。
        rating = $selector(this).index() + 1;
        currentRating = $this.data('rating');
        // 如果目前的評分數值和點下去的ㄧ樣。
        if (rating === currentRating) {
          // 如果這個評分元件允許重設評分，就來重設吧。
          if ($this.data('clearable') === true) {
            // 重設評分為零。
            $module.prototype._set({$this}, 0);
          }
        } else {
          // 設置評分的分數。
          // 不然如果點的是其他的評分。
          $module.prototype._set({$this}, rating);
        }
        // 因為被按下了，所以將被點擊設置為 `true`。
        return $this.data('isLast', true);
      };
      // 當滑鼠放開或是按下時。
      $this.find('.icon').off('mouseup click', set).on('mouseup click', set).on('mouseup', function() {
        return $selector(this).on('mouseup click', set);
      });
      // 設置預設的評分數值。
      return $module.prototype._set({$this}, rating, false);
    }

    $init({$this, $options, $module}) {
      var config;
      config = {
        rating: $this.attr('data-rating') || $options.rating,
        maxRating: $this.attr('data-max-rating') || $options.maxRating
      };
      return $module.prototype._init({$this, $module}, config);
    }

    $opts({$this, $options, $module}, options) {
      var config;
      config = Object.assign({
        rating: $this.data('rating'),
        maxRating: $this.data('maxRating')
      }, options);
      return $module.prototype._init({$this, $module}, config);
    }

    // 設置指定評分數值，並且變動星星的圖示。
    _set({$this}, rating, callable = true) {
      var $ratingIcon;
      // 設置實際數值。
      $this.data('rating', rating);
      if (callable) {
        // 呼叫回呼函式。
        $this.data('onRate').call($this, rating);
      }
      // 如果評分是 0 的話。
      if (rating === 0) {
        // 就移除所有的選定星星圖示。
        return setTimeout(function() {
          return $this.find('.icon').removeClass('selected active');
        }, 0);
      } else {
        // 不然就找到指定的星星，如 3 分就找第 3 個星星。
        $ratingIcon = $this.find(`.icon:nth-child(${rating})`);
        // 移除這個星星和前面星星的所有「選取中」樣式，並且增加「已啟用」樣式。
        $ratingIcon.prevAll().addBack().removeClass('selected').addClass('active');
        // 然後移除之後星星的選取與啟用樣式。
        return $ratingIcon.nextAll().removeClass('active selected');
      }
    }

  };

  TocasRating.prototype.$name = 'rating';

  TocasRating.prototype.$options = {
    rating: 0, // 初期的評分數值。
    maxRating: 5, // 評分數值的最大上限。
    clearable: 'auto', // 評分數值是否可由重新點擊一次而清除，照理來說如果評分只有一個星，這是被允許的。
    interactive: true, // 評分數值是否可被改變。
    onRate: function(value) {} // 當評分數值更改時所呼叫的函式。
  };

  TocasRating.prototype.$methods = {
    // 停用指定評分，令使用者不得變更其數值。
    disable: function({$this}) {
      return $this.addClass('disabled');
    },
    // 啟用指定評分，讓使用者可以更改其數值。
    enable: function({$this}) {
      return $this.removeClass('disabled');
    },
    // 清除、歸零指定評分。
    'clear rating': function({$this, $module}) {
      return $module.prototype._set({$this}, 0);
    },
    // 取得指定評分數值。
    'get rating': function({$this}) {
      return $this.data('rating');
    },
    // 設置指定評分數值。
    'set rating': function({$this, $module}, rating) {
      return $module.prototype._set({$this}, rating);
    }
  };

  return TocasRating;

})();

new ts(TocasRating);
