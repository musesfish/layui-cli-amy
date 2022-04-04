"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/** layui-v2.4.3 MIT License By https://www.layui.com */
;
layui.define(function (e) {
  "use strict";

  var r = {
    open: "{{",
    close: "}}"
  },
      n = function n(e, _n, c) {
    var t = ["#([\\s\\S])+?", "([^{#}])*?"][e || 0];
    return o((_n || "") + r.open + t + r.close + (c || ""));
  },
      c = function c(e) {
    return String(e || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
  },
      t = function t(e, r) {
    return "object" == (typeof console === "undefined" ? "undefined" : _typeof(console)) && console.error("Laytpl Error：" + e + "\n" + (r || "")), "Laytpl Error：" + e;
  },
      o = function o(e) {
    return new RegExp(e, "g");
  },
      p = function p(e) {
    this.tpl = e;
  };

  p.pt = p.prototype, window.errors = 0, p.pt.parse = function (e, p) {
    var a = this,
        l = e,
        i = o("^" + r.open + "#", ""),
        u = o(r.close + "$", "");
    e = '"use strict";var view = "' + (e = e.replace(/\s+|\r|\t|\n/g, " ").replace(o(r.open + "#"), r.open + "# ").replace(o(r.close + "}"), "} " + r.close).replace(/\\/g, "\\\\").replace(o(r.open + "!(.+?)!" + r.close), function (e) {
      return e = e.replace(o("^" + r.open + "!"), "").replace(o("!" + r.close), "").replace(o(r.open + "|" + r.close), function (e) {
        return e.replace(/(.)/g, "\\$1");
      });
    }).replace(/(?="|')/g, "\\").replace(n(), function (e) {
      return '";' + (e = e.replace(i, "").replace(u, "")).replace(/\\/g, "") + ';view+="';
    }).replace(n(1), function (e) {
      var n = '"+(';
      return e.replace(/\s/g, "") === r.open + r.close ? "" : (e = e.replace(o(r.open + "|" + r.close), ""), /^=/.test(e) && (e = e.replace(/^=/, ""), n = '"+_escape_('), n + e.replace(/\\/g, "") + ')+"');
    })) + '";return view;';

    try {
      return a.cache = e = new Function("d, _escape_", e), e(p, c);
    } catch (e) {
      return delete a.cache, t(e, l);
    }
  }, p.pt.render = function (e, r) {
    var n;
    return e ? (n = this.cache ? this.cache(e, c) : this.parse(this.tpl, e), r ? void r(n) : n) : t("no data");
  };

  var a = function a(e) {
    return "string" != typeof e ? t("Template not found") : new p(e);
  };

  a.config = function (e) {
    e = e || {};

    for (var n in e) {
      r[n] = e[n];
    }
  }, a.v = "1.2.0", e("laytpl", a);
});