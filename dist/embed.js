// Generated by CoffeeScript 2.0.0-beta4
var TocasEmbed;

TocasEmbed = (function() {
  class TocasEmbed {
    $init({$this, $data, $module, $options}) {
      var config;
      config = {
        source: $this.attr('data-source'),
        url: $this.attr('data-url'),
        id: $this.attr('data-id'),
        placeholder: $this.attr('data-placeholder'),
        options: $this.attr('data-options') || $options.options,
        parameters: $this.attr('data-parameters') || $options.parameters,
        icon: $this.attr('data-icon') || $options.icon
      };
      return $module.prototype._init({$this, $data, $module}, config);
    }

    $opts({$this, $data, $module}, options) {
      var config;
      config = Object.assign({
        source: $this.data('source'),
        url: $this.data('url'),
        id: $this.data('id'),
        placeholder: $this.data('placeholder'),
        options: $this.data('options'),
        parameters: $this.data('parameters'),
        icon: $this.data('icon'),
        onDisplay: $this.data('onDisplay'),
        onCreate: $this.data('onCreate')
      }, options);
      // 初始化嵌入物件。
      return $module.prototype._init({$this, $data, $module}, config);
    }

    // 接收設定，並以此初始化嵌入物件。
    _init({$this, $data, $module}, {source, url, id, placeholder, options, parameters, icon}) {
      var $icon, $placeholder, ref, ref1, thumbnailURL, type;
      // 如果有指定預置圖片，而且內容不是 `auto` 的話，就從指定的預置圖片中載入圖片。
      if (placeholder && placeholder !== 'auto') {
        $placeholder = $selector('<img>').prop('src', placeholder).addClass('placeholder');
        // 將預置圖片元素推入到嵌入物件容器裡。
        $placeholder.appendTo($this);
      // 如果預置圖片內容是 `auto` 的話就試著自動抓取。
      } else if (placeholder === 'auto') {
        // 試著從來源庫中執行相對應的來源函式，並取得相對應的縮圖。
        thumbnailURL = (ref = $data.sources[source]) != null ? ref.thumbnail(id) : void 0;
        // 如果沒有縮圖的話則離開。
        if (!thumbnailURL) {
          return;
        }
        // 更新嵌入元件裡的預置圖片設定。
        $this.data('placeholder', thumbnailURL);
        // 建立預置圖片元素，並設定圖片網址。
        $placeholder = $selector('<img>').prop('src', thumbnailURL).addClass('placeholder');
        // 將預置圖片元素推入到嵌入物件容器裡。
        $placeholder.appendTo($this);
      }
      // 如果沒有圖示或者沒有網址、或者沒有編號和來源的話就離開。
      if (!icon) {
        return;
      }
      // 建立圖示按鈕元素。
      $icon = $selector('<i>').addClass(`${icon} icon`);
      // 取得這個嵌入物件的種類。
      type = $module.prototype._isFile(url) ? 'file' : 'url';
      // 將嵌入物件的種類保存至嵌入物件元素的設定裡。
      $this.data('type', type);
      // 如果影片種類不是影片檔案（有副檔名），而是像 YouTube 的網址的話⋯。
      if (type === 'url') {
        // 若有指定來源，就套用編號和網址參數來解析該來源網址。
        if (source) {
          url = $module.prototype._parseURL((ref1 = $data.sources[source]) != null ? ref1.url : void 0, id, parameters);
        } else {
          // 不然如果是使用者自訂的網址，則用該網址。
          url = `${url}?${parameters}`;
        }
        // 將解析過的網址保存到嵌入物件設定中。
        $this.data('url', url);
      }
      // 圖示按下時的載入影片事件。
      $icon.on('click', function() {
        var $iframe, $video;
        type = $this.data('type');
        options = $this.data('options');
        url = $this.data('url');
        // 如果這個嵌入物件的影片網址是一個遠端影片檔案的話⋯。
        if (type === 'file') {
          // 就建立一個 `<video>` 元素讀取它。
          $video = $selector('<video>').prop('src', url);
          // 如果嵌入物件有自訂選項的話⋯。
          if (options !== '') {
            // 將選項的 `k=v,k=v` 取出，並套用到 `<video>` 的屬性中。
            $module.prototype._parseOptions(options, function(key, value) {
              return $video.attr(key, value);
            });
          }
          // 然後將這個 `<video>` 擺放到嵌入物件容器內。
          $this.addClass('active').append($video.get());
          return;
        }
        // 不然就是標準的網址，我們建立一個 `<iframe>` 元素來讀取遠端內容。
        $iframe = $selector('<iframe>').prop({
          width: '100%',
          height: '100%',
          frameborder: '0',
          scrolling: 'no',
          src: url
        }).attr({
          webkitAllowFullScreen: '',
          mozallowfullscreen: '',
          allowFullScreen: ''
        });
        // 啟用這個嵌入物件，然後將這個 `<iframe>` 推入至容器中。
        return $this.addClass('active').append($iframe.get());
      });
      // 將按鈕圖示推入到嵌入物件容器內。
      return $icon.appendTo($this);
    }

    // 解析網址，將網址套用上真正的影片編號和參數。
    _parseURL(sourceURL, id, parameters) {
      return sourceURL.replace('{id}', id).replace('{parameters}', `?${parameters}`);
    }

    // 解析鍵值組，將 `k=v, k=v` 轉換成物件。
    _parseOptions(options, each) {
      var object;
      if (typeof options === 'object') {
        // 如果傳入的鍵值組已經是物件的話，就不更動，直接回傳。
        return options;
      }
      // 不然就初始化一個鍵值物件，稍後用來保存解析的鍵值。
      object = {};
      options.split(',').forEach(function(pair) {
        var key, value;
        pair = pair.split('=');
        key = pair[0].trim();
        value = pair[1] || '';
        object[key] = value.trim();
        if (each != null) {
          // 呼叫迴圈回呼函式，如果有的話。
          return each(key, value);
        }
      });
      return object;
    }

    // 回傳一個表示網址是否為直接連接到影片檔案的網址布林值，例如帶有 `.mp4`、`.mov` 副檔名。
    _isFile(url) {
      var extension;
      extension = url ? url.split('.').pop() : '';
      extension = extension.toUpperCase();
      return extension.indexOf('MOV') !== -1 || extension.indexOf('MP4') !== -1 || extension.indexOf('WEBM') !== -1 || extension.indexOf('OGG') !== -1;
    }

    // 重設嵌入物件的狀態與內容。
    _reset($this) {
      return $this.removeClass('active').find('iframe, video').remove();
    }

    // 摧毀嵌入物件裡的所有內容、圖片、圖示，並重設狀態。
    _destory($this) {
      return $this.removeClass('active').find('iframe, video, img, i').remove();
    }

  };

  TocasEmbed.prototype.$name = 'embed';

  TocasEmbed.prototype.$data = {
    sources: {
      youtube: {
        url: 'https://www.youtube.com/embed/{id}{parameters}',
        icon: 'youtube',
        thumbnail: function(id) {
          return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
        }
      },
      vimeo: {
        url: 'https://player.vimeo.com/video/{id}{parameters}',
        icon: 'vimeo',
        thumbnail: function(id) {
          return `https://i.vimeocdn.com/video/${id}_720.jpg`;
        }
      },
      dailymotion: {
        url: 'https://www.dailymotion.com/embed/video/{id}{parameters}',
        icon: 'video play',
        thumbnail: function(id) {
          return `https://www.dailymotion.com/thumbnail/video/${id}`;
        }
      }
    }
  };

  TocasEmbed.prototype.$options = {
    id: '',
    icon: 'video play',
    type: '',
    source: '',
    url: '',
    parameters: '',
    options: '',
    placeholder: null,
    onDisplay: function() {},
    onCreate: function() {}
  };

  TocasEmbed.prototype.$methods = {
    // 更換嵌入物件的設定與來源。
    change: function({$this, $module, $data}, options) {
      var config;
      config = Object.assign({
        source: $this.data('source'),
        url: $this.data('url'),
        id: $this.data('id'),
        placeholder: $this.data('placeholder'),
        options: $this.data('options'),
        parameters: $this.data('parameters'),
        icon: $this.data('icon'),
        onDisplay: $this.data('onDisplay'),
        onCreate: $this.data('onCreate')
      }, options);
      // 摧毀原本的嵌入物件。
      $module.prototype._destory($this);
      // 然後用新傳入的設定來初始化。
      return $module.prototype._init({$this, $module, $data}, config);
    },
    // 重設嵌入物件的狀態，復原起初的預置圖片。
    reset: function({$this, $module}) {
      return $module.prototype._reset($this);
    },
    
    show: function() {},
    
    hide: function() {},
    // 取得目前嵌入物件的編號。
    'get id': function({$this}) {
      return $this.data('id');
    },
    // 取得目前嵌入物件的預置圖片路徑。
    'get placeholder': function({$this}) {
      return $this.data('placeholder');
    },
    // 添加新的影片來源。
    'add source': function({$data}, source, config) {
      return $data.sources[source] = config;
    },
    // 取得目前嵌入物件的來源名稱。
    'get source': function({$this}) {
      return $this.data('source');
    },
    // 取得目前嵌入物件的影片網址。
    'get url': function({$this}) {
      return $this.data('url');
    },
    // 回傳一個表示這個嵌入物件是否設有預置圖片的布林值。
    'has placeholder': function({$this}) {
      var placeholder;
      placeholder = $this.data('placeholder');
      return placeholder !== null;
    }
  };

  return TocasEmbed;

})();

new ts(TocasEmbed);
