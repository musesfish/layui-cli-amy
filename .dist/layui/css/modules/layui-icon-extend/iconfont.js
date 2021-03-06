"use strict";

(function (window) {
  var svgSprite = '<svg><symbol id="layui-extend-del" viewBox="0 0 1024 1024"><path d="M512.339968 958.818304c-247.595008 0-448.272384-200.758272-448.272384-448.24576 0-247.568384 200.677376-448.272384 448.272384-448.272384 247.54176 0 448.244736 200.704 448.244736 448.272384C960.584704 758.060032 759.881728 958.818304 512.339968 958.818304L512.339968 958.818304zM512.339968 118.35904c-216.626176 0-392.213504 175.587328-392.213504 392.213504 0 216.599552 175.587328 392.214528 392.213504 392.214528 216.598528 0 392.214528-175.614976 392.214528-392.214528C904.554496 293.946368 728.938496 118.35904 512.339968 118.35904L512.339968 118.35904zM694.985728 537.903104 329.693184 537.903104c-15.074304 0-27.33056-12.255232-27.33056-27.33056 0-15.156224 12.256256-27.413504 27.33056-27.413504l365.292544 0c15.102976 0 27.359232 12.256256 27.359232 27.413504C722.34496 525.647872 710.088704 537.903104 694.985728 537.903104L694.985728 537.903104z"  ></path></symbol></svg>';

  var script = function () {
    var scripts = document.getElementsByTagName("script");
    return scripts[scripts.length - 1];
  }();

  var shouldInjectCss = script.getAttribute("data-injectcss");

  var ready = function ready(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0);
      } else {
        var loadFn = function loadFn() {
          document.removeEventListener("DOMContentLoaded", loadFn, false);
          fn();
        };

        document.addEventListener("DOMContentLoaded", loadFn, false);
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn);
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
          done = false,
          init = function init() {
        if (!done) {
          done = true;
          fn();
        }
      };

      var polling = function polling() {
        try {
          d.documentElement.doScroll("left");
        } catch (e) {
          setTimeout(polling, 50);
          return;
        }

        init();
      };

      polling();

      d.onreadystatechange = function () {
        if (d.readyState == "complete") {
          d.onreadystatechange = null;
          init();
        }
      };
    }
  };

  var before = function before(el, target) {
    target.parentNode.insertBefore(el, target);
  };

  var prepend = function prepend(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild);
    } else {
      target.appendChild(el);
    }
  };

  function appendSvg() {
    var div, svg;
    div = document.createElement("div");
    div.innerHTML = svgSprite;
    svgSprite = null;
    svg = div.getElementsByTagName("svg")[0];

    if (svg) {
      svg.setAttribute("aria-hidden", "true");
      svg.style.position = "absolute";
      svg.style.width = 0;
      svg.style.height = 0;
      svg.style.overflow = "hidden";
      prepend(svg, document.body);
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true;

    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e);
    }
  }

  ready(appendSvg);
})(window);