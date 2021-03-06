// Generated by CoffeeScript 2.0.0-beta4
var TocasModal;

TocasModal = (function() {
  class TocasModal {
    $init() {}

  };

  TocasModal.prototype.$name = 'modal';

  TocasModal.prototype.$options = {
    approve: '.approve, .positive, .ok', // 會呼叫同意回呼函式的元素選擇器。
    deny: '.deny, .negative, .cancel', // 會呼叫拒絕回呼函式的元素選擇器。
    onApprove: function() {
      return true; // 同意時所被呼叫的函式，如果這個函式回傳 false 的話將不會關閉對話視窗。
    },
    onDeny: function() {
      return true; // 拒絕時所被呼叫的函式，如果這個函式回傳 false 的話將不會關閉對話視窗。
    },
    onClose: function() {}, // 當視窗被關閉時所呼叫的函式。
    onDismiss: function() {}, // 當因為點擊視窗以外區域而關閉所呼叫的函式。
    keyboardShortcuts: true // 是否綁定鍵盤快捷鍵，如 Esc 鍵以關閉視窗。
  };

  TocasModal.prototype.$methods = {
    // 顯示對話視窗。
    show: function({$elements}) {},
    // 隱藏對話視窗。
    hide: function({$elements}) {},
    // 回傳一個表示對話視窗是否正在顯示的布林值。
    'is active': function({$elements}) {}
  };

  return TocasModal;

})();
