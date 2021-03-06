// Generated by CoffeeScript 2.0.0-beta4
var TocasTab;

TocasTab = (function() {
  class TocasTab {
    $init({$this}) {
      // 綁定分頁按鈕的點擊事件。
      return $this.on('click', function() {
        var tabGroup, tabName;
        // 如果點擊的是正在啟用的分頁則略過。
        if ($this.hasClass('active')) {
          return;
        }
        // 取得分頁名稱。
        tabName = $this.attr('data-tab');
        // 如果沒有分頁名稱，這就不是分頁用的項目按鈕，忽略這次的按下事件。
        if (tabName === null) {
          return;
        }
        // 取得分頁的群組名稱。
        tabGroup = $this.attr('data-tab-group');
        // 呼叫切換回呼函式。
        $this.data('onSwitch').call(this, tabName, tabGroup);
        // 如果 `data-tab-group` 是空的話，則表示這個頁面僅有一個共享分頁籤。
        if (tabGroup === null) {
          // 那麼我們就先解除啟用所有的頁籤按鈕。
          $selector('[data-tab]:not(.tab):not([data-tab-group])').removeClass('active');
          // 然後停用所有的頁籤。
          $selector('[data-tab]:not([data-tab-group])').removeClass('active');
          // 現在啟用目標分頁籤。
          $selector(`.tab[data-tab='${tabName}']:not([data-tab-group])`).addClass('active');
        } else {
          $selector(`[data-tab-group='${tabGroup}']:not(.tab)`).removeClass('active');
          $selector(`.tab[data-tab-group='${tabGroup}']`).removeClass('active');
          $selector(`.tab[data-tab='${tabName}'][data-tab-group='${tabGroup}']`).addClass('active');
        }
        // 啟用目標分頁籤的按鈕。
        return $this.addClass('active');
      });
    }

  };

  TocasTab.prototype.$name = 'tab';

  TocasTab.prototype.$options = {
    onSwitch: function() {} // 當分頁籤切換時所會呼叫的函式。
  };

  TocasTab.prototype.$methods = {
    // 切換到指定的分頁。
    'change tab': function({$this}) {},
    // 回傳一個指定分頁是否被啟用的布林值。
    'is active': function({$this}, name) {}
  };

  return TocasTab;

})();
