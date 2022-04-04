"use strict";

(function (window, document) {
  var style = document.createElement('style');
  style.innerHTML = ".sync-loading {\n      position: absolute;\n      left: 50%;\n      top: 50%;\n      transform: translate(-50%, -50%);\n      width: 80px;\n      height: 80px;\n      border-radius: 50%;\n      overflow: hidden;\n      animation: sync_loading 2s linear infinite;\n      border: 10px dashed #34bdbd;\n  filter: saturate(2);\n  }\n  @keyframes sync_loading {\n      0% { transform: rotate(0deg); }\n      100% { transform: rotate(360deg); }\n  }";
  document.querySelector('head').appendChild(style);
  var container = document.createElement('div');
  container.className = "j-sync-loading";
  container.style = "display: none; position: fixed; top: 0; left: 0; z-index: 9999999999; width: 100%; height: 100%;";
  var mask = document.createElement('div');
  mask.style = "position: absolute; width: 100%; height: 100%; background: rgba(0,0,0, .3);";
  var loading = document.createElement('div');
  loading.className = 'sync-loading';
  loading.innerHTML = "<div class='rotate-loading'></div>";

  if (document.querySelectorAll('.j-sync-loading').length === 0) {
    container.appendChild(mask);
    container.appendChild(loading);
    document.body.appendChild(container);
  }

  window.syncLoading = {
    show: function show() {
      container.style.display = 'block';
    },
    hide: function hide() {
      container.style.display = 'none';
    }
  };
})(window, document);

layui && layui.define([], function (exports) {
  exports('syncLoading', window.syncLoading);
});