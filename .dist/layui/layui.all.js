"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/** layui-v2.4.3 MIT License By https://www.layui.com */
;
!function (e) {
  "use strict";

  var t = document,
      o = {
    modules: {},
    status: {},
    timeout: 10,
    event: {}
  },
      n = function n() {
    this.v = "2.4.3";
  },
      r = function () {
    var e = t.currentScript ? t.currentScript.src : function () {
      for (var e, o = t.scripts, n = o.length - 1, r = n; r > 0; r--) {
        if ("interactive" === o[r].readyState) {
          e = o[r].src;
          break;
        }
      }

      return e || o[n].src;
    }();
    return e.substring(0, e.lastIndexOf("/") + 1);
  }(),
      i = function i(t) {
    e.console && console.error && console.error("Layui hint: " + t);
  },
      a = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
      l = {
    layer: "modules/layer",
    laydate: "modules/laydate",
    laypage: "modules/laypage",
    laytpl: "modules/laytpl",
    layim: "modules/layim",
    layedit: "modules/layedit",
    form: "modules/form",
    upload: "modules/upload",
    tree: "modules/tree",
    table: "modules/table",
    element: "modules/element",
    rate: "modules/rate",
    colorpicker: "modules/colorpicker",
    slider: "modules/slider",
    carousel: "modules/carousel",
    flow: "modules/flow",
    util: "modules/util",
    code: "modules/code",
    jquery: "modules/jquery",
    mobile: "modules/mobile",
    "layui.all": "../layui.all"
  };

  n.prototype.cache = o, n.prototype.define = function (e, t) {
    var n = function n() {
      var e = function e(_e2, t) {
        layui[_e2] = t, o.status[_e2] = !0;
      };

      return "function" == typeof t && t(function (n, r) {
        e(n, r), o.callback[n] = function () {
          t(e);
        };
      }), this;
    };

    return "function" == typeof e && (t = e, e = []), layui["layui.all"] || !layui["layui.all"] && layui["layui.mobile"] ? n.call(this) : (this.use(e, n), this);
  }, n.prototype.use = function (e, n, u) {
    var s = this,
        c = o.dir = o.dir ? o.dir : r,
        y = t.getElementsByTagName("head")[0];
    e = "string" == typeof e ? [e] : e, window.jQuery && jQuery.fn.on && (s.each(e, function (t, o) {
      "jquery" === o && e.splice(t, 1);
    }), layui.jquery = layui.$ = jQuery);
    var p = e[0],
        f = 0;
    u = u || [], o.host = o.host || (c.match(/\/\/([\s\S]+?)\//) || ["//" + location.host + "/"])[0];

    function d(e, t) {
      var n = "PLaySTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/;
      ("load" === e.type || n.test((e.currentTarget || e.srcElement).readyState)) && (o.modules[p] = t, y.removeChild(h), function e() {
        if (++f > 1e3 * o.timeout / 4) return i(p + " is not a valid module");
        o.status[p] ? m() : setTimeout(e, 4);
      }());
    }

    function m() {
      u.push(layui[p]), e.length > 1 ? s.use(e.slice(1), n, u) : "function" == typeof n && n.apply(layui, u);
    }

    if (0 === e.length || layui["layui.all"] && l[p] || !layui["layui.all"] && layui["layui.mobile"] && l[p]) return m(), s;
    if (o.modules[p]) !function e() {
      if (++f > 1e3 * o.timeout / 4) return i(p + " is not a valid module");
      "string" == typeof o.modules[p] && o.status[p] ? m() : setTimeout(e, 4);
    }();else {
      var h = t.createElement("script"),
          v = (l[p] ? c + "lay/" : /^\{\/\}/.test(s.modules[p]) ? "" : o.base || "") + (s.modules[p] || p) + ".js";
      v = v.replace(/^\{\/\}/, ""), h.async = !0, h.charset = "utf-8", h.src = v + function () {
        var e = !0 === o.version ? o.v || new Date().getTime() : o.version || "";
        return e ? "?v=" + e : "";
      }(), y.appendChild(h), !h.attachEvent || h.attachEvent.toString && h.attachEvent.toString().indexOf("[native code") < 0 || a ? h.addEventListener("load", function (e) {
        d(e, v);
      }, !1) : h.attachEvent("onreadystatechange", function (e) {
        d(e, v);
      }), o.modules[p] = v;
    }
    return s;
  }, n.prototype.getStyle = function (t, o) {
    var n = t.currentStyle ? t.currentStyle : e.getComputedStyle(t, null);
    return n[n.getPropertyValue ? "getPropertyValue" : "getAttribute"](o);
  }, n.prototype.link = function (e, n, r) {
    var a = this,
        l = t.createElement("link"),
        u = t.getElementsByTagName("head")[0];
    "string" == typeof n && (r = n);
    var s = (r || e).replace(/\.|\//g, ""),
        c = l.id = "layuicss-" + s,
        y = 0;
    return l.rel = "stylesheet", l.href = e + (o.debug ? "?v=" + new Date().getTime() : ""), l.media = "all", t.getElementById(c) || u.appendChild(l), "function" != typeof n ? a : (function r() {
      if (++y > 1e3 * o.timeout / 100) return i(e + " timeout");
      1989 === parseInt(a.getStyle(t.getElementById(c), "width")) ? n() : setTimeout(r, 100);
    }(), a);
  }, o.callback = {}, n.prototype.factory = function (e) {
    if (layui[e]) return "function" == typeof o.callback[e] ? o.callback[e] : null;
  }, n.prototype.addcss = function (e, t, n) {
    return layui.link(o.dir + "css/" + e, t, n);
  }, n.prototype.img = function (e, t, o) {
    var n = new Image();
    if (n.src = e, n.complete) return t(n);
    n.onload = function () {
      n.onload = null, "function" == typeof t && t(n);
    }, n.onerror = function (e) {
      n.onerror = null, "function" == typeof o && o(e);
    };
  }, n.prototype.config = function (e) {
    e = e || {};

    for (var t in e) {
      o[t] = e[t];
    }

    return this;
  }, n.prototype.modules = function () {
    var e = {};

    for (var t in l) {
      e[t] = l[t];
    }

    return e;
  }(), n.prototype.extend = function (e) {
    e = e || {};

    for (var t in e) {
      this[t] || this.modules[t] ? i("模块名 " + t + " 已被占用") : this.modules[t] = e[t];
    }

    return this;
  }, n.prototype.router = function (e) {
    var t = {
      path: [],
      search: {},
      hash: ((e = e || location.hash).match(/[^#](#.*$)/) || [])[1] || ""
    };
    return /^#\//.test(e) ? (e = e.replace(/^#\//, ""), t.href = "/" + e, e = e.replace(/([^#])(#.*$)/, "$1").split("/") || [], this.each(e, function (e, o) {
      /^\w+=/.test(o) ? (o = o.split("="), t.search[o[0]] = o[1]) : t.path.push(o);
    }), t) : t;
  }, n.prototype.data = function (t, o, n) {
    if (t = t || "layui", n = n || localStorage, e.JSON && e.JSON.parse) {
      if (null === o) return delete n[t];
      o = "object" == _typeof(o) ? o : {
        key: o
      };

      try {
        var r = JSON.parse(n[t]);
      } catch (e) {
        r = {};
      }

      return "value" in o && (r[o.key] = o.value), o.remove && delete r[o.key], n[t] = JSON.stringify(r), o.key ? r[o.key] : r;
    }
  }, n.prototype.sessionData = function (e, t) {
    return this.data(e, t, sessionStorage);
  }, n.prototype.device = function (t) {
    var o = navigator.userAgent.toLowerCase(),
        n = function n(e) {
      var t = new RegExp(e + "/([^\\s\\_\\-]+)");
      return (e = (o.match(t) || [])[1]) || !1;
    },
        r = {
      os: /windows/.test(o) ? "windows" : /linux/.test(o) ? "linux" : /iphone|ipod|ipad|ios/.test(o) ? "ios" : /mac/.test(o) ? "mac" : void 0,
      ie: !!(e.ActiveXObject || "ActiveXObject" in e) && ((o.match(/msie\s(\d+)/) || [])[1] || "11"),
      weixin: n("micromessenger")
    };

    return t && !r[t] && (r[t] = n(t)), r.android = /android/.test(o), r.ios = "ios" === r.os, r;
  }, n.prototype.hint = function () {
    return {
      error: i
    };
  }, n.prototype.each = function (e, t) {
    var o;
    if ("function" != typeof t) return this;

    if ((e = e || []).constructor === Object) {
      for (o in e) {
        if (t.call(e[o], o, e[o])) break;
      }
    } else for (o = 0; o < e.length && !t.call(e[o], o, e[o]); o++) {
      ;
    }

    return this;
  }, n.prototype.sort = function (e, t, o) {
    var n = JSON.parse(JSON.stringify(e || []));
    return t ? (n.sort(function (e, o) {
      var n = /^-?\d+$/,
          r = e[t],
          i = o[t];
      return n.test(r) && (r = parseFloat(r)), n.test(i) && (i = parseFloat(i)), r && !i ? 1 : !r && i ? -1 : r > i ? 1 : r < i ? -1 : 0;
    }), o && n.reverse(), n) : n;
  }, n.prototype.stope = function (t) {
    t = t || e.event;

    try {
      t.stopPropagation();
    } catch (e) {
      t.cancelBubble = !0;
    }
  }, n.prototype.onevent = function (e, t, o) {
    return "string" != typeof e || "function" != typeof o ? this : n.event(e, t, null, o);
  }, n.prototype.event = n.event = function (e, t, n, r) {
    var i = this,
        a = null,
        l = t.match(/\((.*)\)$/) || [],
        u = (e + "." + t).replace(l[0], ""),
        s = l[1] || "",
        c = function c(e, t) {
      !1 === (t && t.call(i, n)) && null === a && (a = !1);
    };

    return r ? (o.event[u] = o.event[u] || {}, o.event[u][s] = [r], this) : (layui.each(o.event[u], function (e, t) {
      "{*}" !== s ? ("" === e && layui.each(t, c), e === s && layui.each(t, c)) : layui.each(t, c);
    }), a);
  }, e.layui = new n();
}(window);
layui.define(function (a) {
  var i = layui.cache;
  layui.config({
    dir: i.dir.replace(/lay\/dest\/$/, "")
  }), a("layui.all", layui.v);
});
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
layui.define(function (a) {
  "use strict";

  var e = document,
      t = "getElementById",
      i = "getElementsByTagName",
      n = function n(a) {
    this.config = a || {}, this.config.index = ++r.index, this.render(!0);
  };

  n.prototype.type = function () {
    var a = this.config;
    if ("object" == _typeof(a.elem)) return void 0 === a.elem.length ? 2 : 3;
  }, n.prototype.view = function () {
    var a = this.config,
        e = a.groups = "groups" in a ? 0 | a.groups : 5;
    a.layout = "object" == _typeof(a.layout) ? a.layout : ["prev", "page", "next"], a.count = 0 | a.count, a.curr = 0 | a.curr || 1, a.limits = "object" == _typeof(a.limits) ? a.limits : [10, 20, 30, 40, 50], a.limit = 0 | a.limit || 10, a.pages = Math.ceil(a.count / a.limit) || 1, a.curr > a.pages && (a.curr = a.pages), e < 0 ? e = 1 : e > a.pages && (e = a.pages), a.prev = "prev" in a ? a.prev : "&#x4E0A;&#x4E00;&#x9875;", a.next = "next" in a ? a.next : "&#x4E0B;&#x4E00;&#x9875;";
    var t = a.pages > e ? Math.ceil((a.curr + (e > 1 ? 1 : 0)) / (e > 0 ? e : 1)) : 1,
        i = {
      prev: a.prev ? '<a href="javascript:;" class="layui-laypage-prev' + (1 == a.curr ? " layui-disabled" : "") + '" data-page="' + (a.curr - 1) + '">' + a.prev + "</a>" : "",
      page: function () {
        var i = [];
        if (a.count < 1) return "";
        t > 1 && !1 !== a.first && 0 !== e && i.push('<a href="javascript:;" class="layui-laypage-first" data-page="1"  title="&#x9996;&#x9875;">' + (a.first || 1) + "</a>");
        var n = Math.floor((e - 1) / 2),
            r = t > 1 ? a.curr - n : 1,
            s = t > 1 ? function () {
          var t = a.curr + (e - n - 1);
          return t > a.pages ? a.pages : t;
        }() : e;

        for (s - r < e - 1 && (r = s - e + 1), !1 !== a.first && r > 2 && i.push('<span class="layui-laypage-spr">&#x2026;</span>'); r <= s; r++) {
          r === a.curr ? i.push('<span class="layui-laypage-curr"><em class="layui-laypage-em" ' + (/^#/.test(a.theme) ? 'style="background-color:' + a.theme + ';"' : "") + "></em><em>" + r + "</em></span>") : i.push('<a href="javascript:;" data-page="' + r + '">' + r + "</a>");
        }

        return a.pages > e && a.pages > s && !1 !== a.last && (s + 1 < a.pages && i.push('<span class="layui-laypage-spr">&#x2026;</span>'), 0 !== e && i.push('<a href="javascript:;" class="layui-laypage-last" title="&#x5C3E;&#x9875;"  data-page="' + a.pages + '">' + (a.last || a.pages) + "</a>")), i.join("");
      }(),
      next: a.next ? '<a href="javascript:;" class="layui-laypage-next' + (a.curr == a.pages ? " layui-disabled" : "") + '" data-page="' + (a.curr + 1) + '">' + a.next + "</a>" : "",
      count: '<span class="layui-laypage-count">共 ' + a.count + " 条</span>",
      limit: function () {
        var e = ['<span class="layui-laypage-limits"><select lay-ignore>'];
        return layui.each(a.limits, function (t, i) {
          e.push('<option value="' + i + '"' + (i === a.limit ? "selected" : "") + ">" + i + " 条/页</option>");
        }), e.join("") + "</select></span>";
      }(),
      refresh: ['<a href="javascript:;" data-page="' + a.curr + '" class="layui-laypage-refresh">', '<i class="layui-icon layui-icon-refresh"></i>', "</a>"].join(""),
      skip: ['<span class="layui-laypage-skip">&#x5230;&#x7B2C;', '<input type="text" min="1" value="' + a.curr + '" class="layui-input">', '&#x9875;<button type="button" class="layui-laypage-btn">&#x786e;&#x5b9a;</button>', "</span>"].join("")
    };
    return ['<div class="layui-box layui-laypage layui-laypage-' + (a.theme ? /^#/.test(a.theme) ? "molv" : a.theme : "default") + '" id="layui-laypage-' + a.index + '">', function () {
      var e = [];
      return layui.each(a.layout, function (a, t) {
        i[t] && e.push(i[t]);
      }), e.join("");
    }(), "</div>"].join("");
  }, n.prototype.jump = function (a, e) {
    if (a) {
      var t = this,
          n = t.config,
          s = a.children,
          u = a[i]("button")[0],
          l = a[i]("input")[0],
          p = a[i]("select")[0],
          c = function c() {
        var a = 0 | l.value.replace(/\s|\D/g, "");
        a && (n.curr = a, t.render());
      };

      if (e) return c();

      for (var o = 0, y = s.length; o < y; o++) {
        "a" === s[o].nodeName.toLowerCase() && r.on(s[o], "click", function () {
          var a = 0 | this.getAttribute("data-page");
          a < 1 || a > n.pages || (n.curr = a, t.render());
        });
      }

      p && r.on(p, "change", function () {
        var a = this.value;
        n.curr * a > n.count && (n.curr = Math.ceil(n.count / a)), n.limit = a, t.render();
      }), u && r.on(u, "click", function () {
        c();
      });
    }
  }, n.prototype.skip = function (a) {
    if (a) {
      var e = this,
          t = a[i]("input")[0];
      t && r.on(t, "keyup", function (t) {
        var i = this.value,
            n = t.keyCode;
        /^(37|38|39|40)$/.test(n) || (/\D/.test(i) && (this.value = i.replace(/\D/, "")), 13 === n && e.jump(a, !0));
      });
    }
  }, n.prototype.render = function (a) {
    var i = this.config,
        n = this.type(),
        r = this.view();
    2 === n ? i.elem && (i.elem.innerHTML = r) : 3 === n ? i.elem.html(r) : e[t](i.elem) && (e[t](i.elem).innerHTML = r), i.jump && i.jump(i, a);
    var s = e[t]("layui-laypage-" + i.index);
    this.jump(s), i.hash && !a && (location.hash = "!" + i.hash + "=" + i.curr), this.skip(s);
  };
  var r = {
    render: function render(a) {
      return new n(a).index;
    },
    index: layui.laypage ? layui.laypage.index + 1e4 : 0,
    on: function on(a, e, t) {
      return a.attachEvent ? a.attachEvent("on" + e, function (e) {
        e.target = e.srcElement, t.call(a, e);
      }) : a.addEventListener(e, t, !1), this;
    }
  };
  a("laypage", r);
});
!function () {
  "use strict";

  var e = window.layui && layui.define,
      t = {
    getPath: function () {
      var e = document.currentScript ? document.currentScript.src : function () {
        for (var e, t = document.scripts, n = t.length - 1, a = n; a > 0; a--) {
          if ("interactive" === t[a].readyState) {
            e = t[a].src;
            break;
          }
        }

        return e || t[n].src;
      }();
      return e.substring(0, e.lastIndexOf("/") + 1);
    }(),
    getStyle: function getStyle(e, t) {
      var n = e.currentStyle ? e.currentStyle : window.getComputedStyle(e, null);
      return n[n.getPropertyValue ? "getPropertyValue" : "getAttribute"](t);
    },
    link: function link(e, a, i) {
      if (n.path) {
        var r = document.getElementsByTagName("head")[0],
            o = document.createElement("link");
        "string" == typeof a && (i = a);
        var s = "layuicss-" + (i || e).replace(/\.|\//g, ""),
            l = 0;
        o.rel = "stylesheet", o.href = n.path + e, o.id = s, document.getElementById(s) || r.appendChild(o), "function" == typeof a && function e() {
          if (++l > 80) return window.console && console.error("laydate.css: Invalid");
          1989 === parseInt(t.getStyle(document.getElementById(s), "width")) ? a() : setTimeout(e, 100);
        }();
      }
    }
  },
      n = {
    v: "5.0.9",
    config: {},
    index: window.laydate && window.laydate.v ? 1e5 : 0,
    path: t.getPath,
    set: function set(e) {
      return this.config = f.extend({}, this.config, e), this;
    },
    ready: function ready(a) {
      var i = (e ? "modules/laydate/" : "theme/") + "default/laydate.css?v=" + n.v;
      return e ? layui.addcss(i, a, "laydate") : t.link(i, a, "laydate"), this;
    }
  },
      a = "layui-this",
      i = "laydate-disabled",
      r = "开始日期超出了结束日期<br>建议重新选择",
      o = [100, 2e5],
      s = "layui-laydate-static",
      l = "layui-laydate-list",
      d = "laydate-selected",
      c = "layui-laydate-hint",
      m = ".laydate-btns-confirm",
      u = "laydate-time-text",
      h = ".laydate-btns-time",
      y = function y(e) {
    var t = this;
    t.index = ++n.index, t.config = f.extend({}, t.config, n.config, e), n.ready(function () {
      t.init();
    });
  },
      f = function f(e) {
    return new p(e);
  },
      p = function p(e) {
    for (var t = 0, n = "object" == _typeof(e) ? [e] : (this.selector = e, document.querySelectorAll(e || null)); t < n.length; t++) {
      this.push(n[t]);
    }
  };

  p.prototype = [], p.prototype.constructor = p, f.extend = function () {
    var e = 1,
        t = arguments,
        n = function n(e, t) {
      e = e || (t.constructor === Array ? [] : {});

      for (var a in t) {
        e[a] = t[a] && t[a].constructor === Object ? n(e[a], t[a]) : t[a];
      }

      return e;
    };

    for (t[0] = "object" == _typeof(t[0]) ? t[0] : {}; e < t.length; e++) {
      "object" == _typeof(t[e]) && n(t[0], t[e]);
    }

    return t[0];
  }, f.ie = function () {
    var e = navigator.userAgent.toLowerCase();
    return !!(window.ActiveXObject || "ActiveXObject" in window) && ((e.match(/msie\s(\d+)/) || [])[1] || "11");
  }(), f.stope = function (e) {
    (e = e || window.event).stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
  }, f.each = function (e, t) {
    var n;
    if ("function" != typeof t) return this;

    if ((e = e || []).constructor === Object) {
      for (n in e) {
        if (t.call(e[n], n, e[n])) break;
      }
    } else for (n = 0; n < e.length && !t.call(e[n], n, e[n]); n++) {
      ;
    }

    return this;
  }, f.digit = function (e, t, n) {
    var a = "";
    e = String(e), t = t || 2;

    for (var i = e.length; i < t; i++) {
      a += "0";
    }

    return e < Math.pow(10, t) ? a + (0 | e) : e;
  }, f.elem = function (e, t) {
    var n = document.createElement(e);
    return f.each(t || {}, function (e, t) {
      n.setAttribute(e, t);
    }), n;
  }, p.addStr = function (e, t) {
    return e = e.replace(/\s+/, " "), t = t.replace(/\s+/, " ").split(" "), f.each(t, function (t, n) {
      new RegExp("\\b" + n + "\\b").test(e) || (e = e + " " + n);
    }), e.replace(/^\s|\s$/, "");
  }, p.removeStr = function (e, t) {
    return e = e.replace(/\s+/, " "), t = t.replace(/\s+/, " ").split(" "), f.each(t, function (t, n) {
      var a = new RegExp("\\b" + n + "\\b");
      a.test(e) && (e = e.replace(a, ""));
    }), e.replace(/\s+/, " ").replace(/^\s|\s$/, "");
  }, p.prototype.find = function (e) {
    var t = this,
        n = 0,
        a = [],
        i = "object" == _typeof(e);

    return this.each(function (r, o) {
      for (var s = i ? [e] : o.querySelectorAll(e || null); n < s.length; n++) {
        a.push(s[n]);
      }

      t.shift();
    }), i || (t.selector = (t.selector ? t.selector + " " : "") + e), f.each(a, function (e, n) {
      t.push(n);
    }), t;
  }, p.prototype.each = function (e) {
    return f.each.call(this, this, e);
  }, p.prototype.addClass = function (e, t) {
    return this.each(function (n, a) {
      a.className = p[t ? "removeStr" : "addStr"](a.className, e);
    });
  }, p.prototype.removeClass = function (e) {
    return this.addClass(e, !0);
  }, p.prototype.hasClass = function (e) {
    var t = !1;
    return this.each(function (n, a) {
      new RegExp("\\b" + e + "\\b").test(a.className) && (t = !0);
    }), t;
  }, p.prototype.attr = function (e, t) {
    var n = this;
    return void 0 === t ? function () {
      if (n.length > 0) return n[0].getAttribute(e);
    }() : n.each(function (n, a) {
      a.setAttribute(e, t);
    });
  }, p.prototype.removeAttr = function (e) {
    return this.each(function (t, n) {
      n.removeAttribute(e);
    });
  }, p.prototype.html = function (e) {
    return this.each(function (t, n) {
      n.innerHTML = e;
    });
  }, p.prototype.val = function (e) {
    return this.each(function (t, n) {
      n.value = e;
    });
  }, p.prototype.append = function (e) {
    return this.each(function (t, n) {
      "object" == _typeof(e) ? n.appendChild(e) : n.innerHTML = n.innerHTML + e;
    });
  }, p.prototype.remove = function (e) {
    return this.each(function (t, n) {
      e ? n.removeChild(e) : n.parentNode.removeChild(n);
    });
  }, p.prototype.on = function (e, t) {
    return this.each(function (n, a) {
      a.attachEvent ? a.attachEvent("on" + e, function (e) {
        e.target = e.srcElement, t.call(a, e);
      }) : a.addEventListener(e, t, !1);
    });
  }, p.prototype.off = function (e, t) {
    return this.each(function (n, a) {
      a.detachEvent ? a.detachEvent("on" + e, t) : a.removeEventListener(e, t, !1);
    });
  }, y.isLeapYear = function (e) {
    return e % 4 == 0 && e % 100 != 0 || e % 400 == 0;
  }, y.prototype.config = {
    type: "date",
    range: !1,
    format: "yyyy-MM-dd",
    value: null,
    isInitValue: !0,
    min: "1900-1-1",
    max: "2099-12-31",
    trigger: "focus",
    show: !1,
    showBottom: !0,
    btns: ["clear", "now", "confirm"],
    lang: "cn",
    theme: "default",
    position: null,
    calendar: !1,
    mark: {},
    zIndex: null,
    done: null,
    change: null
  }, y.prototype.lang = function () {
    var e = {
      cn: {
        weeks: ["日", "一", "二", "三", "四", "五", "六"],
        time: ["时", "分", "秒"],
        timeTips: "选择时间",
        startTime: "开始时间",
        endTime: "结束时间",
        dateTips: "返回日期",
        month: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        tools: {
          confirm: "确定",
          clear: "清空",
          now: "现在"
        }
      },
      en: {
        weeks: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        time: ["Hours", "Minutes", "Seconds"],
        timeTips: "Select Time",
        startTime: "Start Time",
        endTime: "End Time",
        dateTips: "Select Date",
        month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        tools: {
          confirm: "Confirm",
          clear: "Clear",
          now: "Now"
        }
      }
    };
    return e[this.config.lang] || e.cn;
  }, y.prototype.init = function () {
    var e = this,
        t = e.config,
        n = "yyyy|y|MM|M|dd|d|HH|H|mm|m|ss|s",
        a = "static" === t.position,
        i = {
      year: "yyyy",
      month: "yyyy-MM",
      date: "yyyy-MM-dd",
      time: "HH:mm:ss",
      datetime: "yyyy-MM-dd HH:mm:ss"
    };
    t.elem = f(t.elem), t.eventElem = f(t.eventElem), t.elem[0] && (!0 === t.range && (t.range = "-"), t.format === i.date && (t.format = i[t.type]), e.format = t.format.match(new RegExp(n + "|.", "g")) || [], e.EXP_IF = "", e.EXP_SPLIT = "", f.each(e.format, function (t, a) {
      var i = new RegExp(n).test(a) ? "\\d{" + (new RegExp(n).test(e.format[0 === t ? t + 1 : t - 1] || "") ? /^yyyy|y$/.test(a) ? 4 : a.length : /^yyyy$/.test(a) ? "1,4" : /^y$/.test(a) ? "1,308" : "1,2") + "}" : "\\" + a;
      e.EXP_IF = e.EXP_IF + i, e.EXP_SPLIT = e.EXP_SPLIT + "(" + i + ")";
    }), e.EXP_IF = new RegExp("^" + (t.range ? e.EXP_IF + "\\s\\" + t.range + "\\s" + e.EXP_IF : e.EXP_IF) + "$"), e.EXP_SPLIT = new RegExp("^" + e.EXP_SPLIT + "$", ""), e.isInput(t.elem[0]) || "focus" === t.trigger && (t.trigger = "click"), t.elem.attr("lay-key") || (t.elem.attr("lay-key", e.index), t.eventElem.attr("lay-key", e.index)), t.mark = f.extend({}, t.calendar && "cn" === t.lang ? {
      "0-1-1": "元旦",
      "0-2-14": "情人",
      "0-3-8": "妇女",
      "0-3-12": "植树",
      "0-4-1": "愚人",
      "0-5-1": "劳动",
      "0-5-4": "青年",
      "0-6-1": "儿童",
      "0-9-10": "教师",
      "0-9-18": "国耻",
      "0-10-1": "国庆",
      "0-12-25": "圣诞"
    } : {}, t.mark), f.each(["min", "max"], function (e, n) {
      var a = [],
          i = [];

      if ("number" == typeof t[n]) {
        var r = t[n],
            o = new Date().getTime(),
            s = new Date(r ? r < 864e5 ? o + 864e5 * r : r : o);
        a = [s.getFullYear(), s.getMonth() + 1, s.getDate()], r < 864e5 || (i = [s.getHours(), s.getMinutes(), s.getSeconds()]);
      } else a = (t[n].match(/\d+-\d+-\d+/) || [""])[0].split("-"), i = (t[n].match(/\d+:\d+:\d+/) || [""])[0].split(":");

      t[n] = {
        year: 0 | a[0] || new Date().getFullYear(),
        month: a[1] ? (0 | a[1]) - 1 : new Date().getMonth(),
        date: 0 | a[2] || new Date().getDate(),
        hours: 0 | i[0],
        minutes: 0 | i[1],
        seconds: 0 | i[2]
      };
    }), e.elemID = "layui-laydate" + t.elem.attr("lay-key"), (t.show || a) && e.render(), a || e.events(), t.value && t.isInitValue && (t.value.constructor === Date ? e.setValue(e.parse(0, e.systemDate(t.value))) : e.setValue(t.value)));
  }, y.prototype.render = function () {
    var e = this.config,
        t = this.lang(),
        n = "static" === e.position,
        a = this.elem = f.elem("div", {
      id: this.elemID,
      "class": ["layui-laydate", e.range ? " layui-laydate-range" : "", n ? " " + s : "", e.theme && "default" !== e.theme && !/^#/.test(e.theme) ? " laydate-theme-" + e.theme : ""].join("")
    }),
        i = this.elemMain = [],
        r = this.elemHeader = [],
        o = this.elemCont = [],
        l = this.table = [],
        d = this.footer = f.elem("div", {
      "class": "layui-laydate-footer"
    });

    if (e.zIndex && (a.style.zIndex = e.zIndex), f.each(new Array(2), function (n) {
      if (!e.range && n > 0) return !0;
      var a = f.elem("div", {
        "class": "layui-laydate-header"
      }),
          s = [function () {
        var e = f.elem("i", {
          "class": "layui-icon laydate-icon laydate-prev-y"
        });
        return e.innerHTML = "&#xe65a;", e;
      }(), function () {
        var e = f.elem("i", {
          "class": "layui-icon laydate-icon laydate-prev-m"
        });
        return e.innerHTML = "&#xe603;", e;
      }(), function () {
        var e = f.elem("div", {
          "class": "laydate-set-ym"
        }),
            t = f.elem("span"),
            n = f.elem("span");
        return e.appendChild(t), e.appendChild(n), e;
      }(), function () {
        var e = f.elem("i", {
          "class": "layui-icon laydate-icon laydate-next-m"
        });
        return e.innerHTML = "&#xe602;", e;
      }(), function () {
        var e = f.elem("i", {
          "class": "layui-icon laydate-icon laydate-next-y"
        });
        return e.innerHTML = "&#xe65b;", e;
      }()],
          d = f.elem("div", {
        "class": "layui-laydate-content"
      }),
          c = f.elem("table"),
          m = f.elem("thead"),
          u = f.elem("tr");
      f.each(s, function (e, t) {
        a.appendChild(t);
      }), m.appendChild(u), f.each(new Array(6), function (e) {
        var n = c.insertRow(0);
        f.each(new Array(7), function (a) {
          if (0 === e) {
            var i = f.elem("th");
            i.innerHTML = t.weeks[a], u.appendChild(i);
          }

          n.insertCell(a);
        });
      }), c.insertBefore(m, c.children[0]), d.appendChild(c), i[n] = f.elem("div", {
        "class": "layui-laydate-main laydate-main-list-" + n
      }), i[n].appendChild(a), i[n].appendChild(d), r.push(s), o.push(d), l.push(c);
    }), f(d).html(function () {
      var a = [],
          i = [];
      return "datetime" === e.type && a.push('<span lay-type="datetime" class="laydate-btns-time">' + t.timeTips + "</span>"), f.each(e.btns, function (a, r) {
        var o = t.tools[r] || "btn";
        e.range && "now" === r || (n && "clear" === r && (o = "cn" === e.lang ? "重置" : "Reset"), i.push('<span lay-type="' + r + '" class="laydate-btns-' + r + '">' + o + "</span>"));
      }), a.push('<div class="laydate-footer-btns">' + i.join("") + "</div>"), a.join("");
    }()), f.each(i, function (e, t) {
      a.appendChild(t);
    }), e.showBottom && a.appendChild(d), /^#/.test(e.theme)) {
      var c = f.elem("style"),
          m = ["#{{id}} .layui-laydate-header{background-color:{{theme}};}", "#{{id}} .layui-this{background-color:{{theme}} !important;}"].join("").replace(/{{id}}/g, this.elemID).replace(/{{theme}}/g, e.theme);
      "styleSheet" in c ? (c.setAttribute("type", "text/css"), c.styleSheet.cssText = m) : c.innerHTML = m, f(a).addClass("laydate-theme-molv"), a.appendChild(c);
    }

    this.remove(y.thisElemDate), n ? e.elem.append(a) : (document.body.appendChild(a), this.position()), this.checkDate().calendar(), this.changeEvent(), y.thisElemDate = this.elemID, "function" == typeof e.ready && e.ready(f.extend({}, e.dateTime, {
      month: e.dateTime.month + 1
    }));
  }, y.prototype.remove = function (e) {
    this.config;
    var t = f("#" + (e || this.elemID));
    return t.hasClass(s) || this.checkDate(function () {
      t.remove();
    }), this;
  }, y.prototype.position = function () {
    var e = this.config,
        t = (this.bindElem || e.elem[0]).getBoundingClientRect(),
        n = this.elem.offsetWidth,
        a = this.elem.offsetHeight,
        i = function i(e) {
      return e = e ? "scrollLeft" : "scrollTop", document.body[e] | document.documentElement[e];
    },
        r = function r(e) {
      return document.documentElement[e ? "clientWidth" : "clientHeight"];
    },
        o = t.left,
        s = t.bottom;

    o + n + 5 > r("width") && (o = r("width") - n - 5), s + a + 5 > r() && (s = t.top > a ? t.top - a : r() - a, s -= 10), e.position && (this.elem.style.position = e.position), this.elem.style.left = o + ("fixed" === e.position ? 0 : i(1)) + "px", this.elem.style.top = s + ("fixed" === e.position ? 0 : i()) + "px";
  }, y.prototype.hint = function (e) {
    var t = this,
        n = (t.config, f.elem("div", {
      "class": c
    }));
    t.elem && (n.innerHTML = e || "", f(t.elem).find("." + c).remove(), t.elem.appendChild(n), clearTimeout(t.hinTimer), t.hinTimer = setTimeout(function () {
      f(t.elem).find("." + c).remove();
    }, 3e3));
  }, y.prototype.getAsYM = function (e, t, n) {
    return n ? t-- : t++, t < 0 && (t = 11, e--), t > 11 && (t = 0, e++), [e, t];
  }, y.prototype.systemDate = function (e) {
    var t = e || new Date();
    return {
      year: t.getFullYear(),
      month: t.getMonth(),
      date: t.getDate(),
      hours: e ? e.getHours() : 0,
      minutes: e ? e.getMinutes() : 0,
      seconds: e ? e.getSeconds() : 0
    };
  }, y.prototype.checkDate = function (e) {
    var t,
        a,
        i = this,
        r = (new Date(), i.config),
        s = r.dateTime = r.dateTime || i.systemDate(),
        l = i.bindElem || r.elem[0],
        d = (i.isInput(l), i.isInput(l) ? l.value : "static" === r.position ? "" : l.innerHTML),
        c = function c(e) {
      e.year > o[1] && (e.year = o[1], a = !0), e.month > 11 && (e.month = 11, a = !0), e.hours > 23 && (e.hours = 0, a = !0), e.minutes > 59 && (e.minutes = 0, e.hours++, a = !0), e.seconds > 59 && (e.seconds = 0, e.minutes++, a = !0), t = n.getEndDate(e.month + 1, e.year), e.date > t && (e.date = t, a = !0);
    },
        m = function m(e, t, n) {
      var s = ["startTime", "endTime"];
      t = (t.match(i.EXP_SPLIT) || []).slice(1), n = n || 0, r.range && (i[s[n]] = i[s[n]] || {}), f.each(i.format, function (l, d) {
        var c = parseFloat(t[l]);
        t[l].length < d.length && (a = !0), /yyyy|y/.test(d) ? (c < o[0] && (c = o[0], a = !0), e.year = c) : /MM|M/.test(d) ? (c < 1 && (c = 1, a = !0), e.month = c - 1) : /dd|d/.test(d) ? (c < 1 && (c = 1, a = !0), e.date = c) : /HH|H/.test(d) ? (c < 1 && (c = 0, a = !0), e.hours = c, r.range && (i[s[n]].hours = c)) : /mm|m/.test(d) ? (c < 1 && (c = 0, a = !0), e.minutes = c, r.range && (i[s[n]].minutes = c)) : /ss|s/.test(d) && (c < 1 && (c = 0, a = !0), e.seconds = c, r.range && (i[s[n]].seconds = c));
      }), c(e);
    };

    return "limit" === e ? (c(s), i) : ("string" == typeof (d = d || r.value) && (d = d.replace(/\s+/g, " ").replace(/^\s|\s$/g, "")), i.startState && !i.endState && (delete i.startState, i.endState = !0), "string" == typeof d && d ? i.EXP_IF.test(d) ? r.range ? (d = d.split(" " + r.range + " "), i.startDate = i.startDate || i.systemDate(), i.endDate = i.endDate || i.systemDate(), r.dateTime = f.extend({}, i.startDate), f.each([i.startDate, i.endDate], function (e, t) {
      m(t, d[e], e);
    })) : m(s, d) : (i.hint("日期格式不合法<br>必须遵循下述格式：<br>" + (r.range ? r.format + " " + r.range + " " + r.format : r.format) + "<br>已为你重置"), a = !0) : d && d.constructor === Date ? r.dateTime = i.systemDate(d) : (r.dateTime = i.systemDate(), delete i.startState, delete i.endState, delete i.startDate, delete i.endDate, delete i.startTime, delete i.endTime), c(s), a && d && i.setValue(r.range ? i.endDate ? i.parse() : "" : i.parse()), e && e(), i);
  }, y.prototype.mark = function (e, t) {
    var n,
        a = this.config;
    return f.each(a.mark, function (e, a) {
      var i = e.split("-");
      i[0] != t[0] && 0 != i[0] || i[1] != t[1] && 0 != i[1] || i[2] != t[2] || (n = a || t[2]);
    }), n && e.html('<span class="laydate-day-mark">' + n + "</span>"), this;
  }, y.prototype.limit = function (e, t, n, a) {
    var r,
        o = this,
        s = o.config,
        l = {},
        d = s[n > 41 ? "endDate" : "dateTime"],
        c = f.extend({}, d, t || {});
    return f.each({
      now: c,
      min: s.min,
      max: s.max
    }, function (e, t) {
      l[e] = o.newDate(f.extend({
        year: t.year,
        month: t.month,
        date: t.date
      }, function () {
        var e = {};
        return f.each(a, function (n, a) {
          e[a] = t[a];
        }), e;
      }())).getTime();
    }), r = l.now < l.min || l.now > l.max, e && e[r ? "addClass" : "removeClass"](i), r;
  }, y.prototype.calendar = function (e) {
    var t,
        i,
        r,
        s = this,
        l = s.config,
        d = e || l.dateTime,
        c = new Date(),
        u = s.lang(),
        h = "date" !== l.type && "datetime" !== l.type,
        y = e ? 1 : 0,
        p = f(s.table[y]).find("td"),
        g = f(s.elemHeader[y][2]).find("span");

    if (d.year < o[0] && (d.year = o[0], s.hint("最低只能支持到公元" + o[0] + "年")), d.year > o[1] && (d.year = o[1], s.hint("最高只能支持到公元" + o[1] + "年")), s.firstDate || (s.firstDate = f.extend({}, d)), c.setFullYear(d.year, d.month, 1), t = c.getDay(), i = n.getEndDate(d.month || 12, d.year), r = n.getEndDate(d.month + 1, d.year), f.each(p, function (e, n) {
      var o = [d.year, d.month],
          c = 0;
      (n = f(n)).removeAttr("class"), e < t ? (c = i - t + e, n.addClass("laydate-day-prev"), o = s.getAsYM(d.year, d.month, "sub")) : e >= t && e < r + t ? (c = e - t, l.range || c + 1 === d.date && n.addClass(a)) : (c = e - r - t, n.addClass("laydate-day-next"), o = s.getAsYM(d.year, d.month)), o[1]++, o[2] = c + 1, n.attr("lay-ymd", o.join("-")).html(o[2]), s.mark(n, o).limit(n, {
        year: o[0],
        month: o[1] - 1,
        date: o[2]
      }, e);
    }), f(g[0]).attr("lay-ym", d.year + "-" + (d.month + 1)), f(g[1]).attr("lay-ym", d.year + "-" + (d.month + 1)), "cn" === l.lang ? (f(g[0]).attr("lay-type", "year").html(d.year + "年"), f(g[1]).attr("lay-type", "month").html(d.month + 1 + "月")) : (f(g[0]).attr("lay-type", "month").html(u.month[d.month]), f(g[1]).attr("lay-type", "year").html(d.year)), h && (l.range && (e ? s.endDate = s.endDate || {
      year: d.year + ("year" === l.type ? 1 : 0),
      month: d.month + ("month" === l.type ? 0 : -1)
    } : s.startDate = s.startDate || {
      year: d.year,
      month: d.month
    }, e && (s.listYM = [[s.startDate.year, s.startDate.month + 1], [s.endDate.year, s.endDate.month + 1]], s.list(l.type, 0).list(l.type, 1), "time" === l.type ? s.setBtnStatus("时间", f.extend({}, s.systemDate(), s.startTime), f.extend({}, s.systemDate(), s.endTime)) : s.setBtnStatus(!0))), l.range || (s.listYM = [[d.year, d.month + 1]], s.list(l.type, 0))), l.range && !e) {
      var v = s.getAsYM(d.year, d.month);
      s.calendar(f.extend({}, d, {
        year: v[0],
        month: v[1]
      }));
    }

    return l.range || s.limit(f(s.footer).find(m), null, 0, ["hours", "minutes", "seconds"]), l.range && e && !h && s.stampRange(), s;
  }, y.prototype.list = function (e, t) {
    var n = this,
        r = n.config,
        o = r.dateTime,
        s = n.lang(),
        d = r.range && "date" !== r.type && "datetime" !== r.type,
        c = f.elem("ul", {
      "class": l + " " + {
        year: "laydate-year-list",
        month: "laydate-month-list",
        time: "laydate-time-list"
      }[e]
    }),
        y = n.elemHeader[t],
        p = f(y[2]).find("span"),
        g = n.elemCont[t || 0],
        v = f(g).find("." + l)[0],
        D = "cn" === r.lang,
        T = D ? "年" : "",
        w = n.listYM[t] || {},
        C = ["hours", "minutes", "seconds"],
        x = ["startTime", "endTime"][t];

    if (w[0] < 1 && (w[0] = 1), "year" === e) {
      var M,
          b = M = w[0] - 7;
      b < 1 && (b = M = 1), f.each(new Array(15), function (e) {
        var i = f.elem("li", {
          "lay-ym": M
        }),
            o = {
          year: M
        };
        M == w[0] && f(i).addClass(a), i.innerHTML = M + T, c.appendChild(i), M < n.firstDate.year ? (o.month = r.min.month, o.date = r.min.date) : M >= n.firstDate.year && (o.month = r.max.month, o.date = r.max.date), n.limit(f(i), o, t), M++;
      }), f(p[D ? 0 : 1]).attr("lay-ym", M - 8 + "-" + w[1]).html(b + T + " - " + (M - 1 + T));
    } else if ("month" === e) f.each(new Array(12), function (e) {
      var i = f.elem("li", {
        "lay-ym": e
      }),
          o = {
        year: w[0],
        month: e
      };
      e + 1 == w[1] && f(i).addClass(a), i.innerHTML = s.month[e] + (D ? "月" : ""), c.appendChild(i), w[0] < n.firstDate.year ? o.date = r.min.date : w[0] >= n.firstDate.year && (o.date = r.max.date), n.limit(f(i), o, t);
    }), f(p[D ? 0 : 1]).attr("lay-ym", w[0] + "-" + w[1]).html(w[0] + T);else if ("time" === e) {
      var E = function E() {
        f(c).find("ol").each(function (e, a) {
          f(a).find("li").each(function (a, i) {
            n.limit(f(i), [{
              hours: a
            }, {
              hours: n[x].hours,
              minutes: a
            }, {
              hours: n[x].hours,
              minutes: n[x].minutes,
              seconds: a
            }][e], t, [["hours"], ["hours", "minutes"], ["hours", "minutes", "seconds"]][e]);
          });
        }), r.range || n.limit(f(n.footer).find(m), n[x], 0, ["hours", "minutes", "seconds"]);
      };

      r.range ? n[x] || (n[x] = {
        hours: 0,
        minutes: 0,
        seconds: 0
      }) : n[x] = o, f.each([24, 60, 60], function (e, t) {
        var i = f.elem("li"),
            r = ["<p>" + s.time[e] + "</p><ol>"];
        f.each(new Array(t), function (t) {
          r.push("<li" + (n[x][C[e]] === t ? ' class="' + a + '"' : "") + ">" + f.digit(t, 2) + "</li>");
        }), i.innerHTML = r.join("") + "</ol>", c.appendChild(i);
      }), E();
    }

    if (v && g.removeChild(v), g.appendChild(c), "year" === e || "month" === e) f(n.elemMain[t]).addClass("laydate-ym-show"), f(c).find("li").on("click", function () {
      var s = 0 | f(this).attr("lay-ym");

      if (!f(this).hasClass(i)) {
        if (0 === t) o[e] = s, d && (n.startDate[e] = s), n.limit(f(n.footer).find(m), null, 0);else if (d) n.endDate[e] = s;else {
          var l = "year" === e ? n.getAsYM(s, w[1] - 1, "sub") : n.getAsYM(w[0], s, "sub");
          f.extend(o, {
            year: l[0],
            month: l[1]
          });
        }
        "year" === r.type || "month" === r.type ? (f(c).find("." + a).removeClass(a), f(this).addClass(a), "month" === r.type && "year" === e && (n.listYM[t][0] = s, d && (n[["startDate", "endDate"][t]].year = s), n.list("month", t))) : (n.checkDate("limit").calendar(), n.closeList()), n.setBtnStatus(), r.range || n.done(null, "change"), f(n.footer).find(h).removeClass(i);
      }
    });else {
      var S = f.elem("span", {
        "class": u
      }),
          k = function k() {
        f(c).find("ol").each(function (e) {
          var t = this,
              a = f(t).find("li");
          t.scrollTop = 30 * (n[x][C[e]] - 2), t.scrollTop <= 0 && a.each(function (e, n) {
            if (!f(this).hasClass(i)) return t.scrollTop = 30 * (e - 2), !0;
          });
        });
      },
          H = f(y[2]).find("." + u);

      k(), S.innerHTML = r.range ? [s.startTime, s.endTime][t] : s.timeTips, f(n.elemMain[t]).addClass("laydate-time-show"), H[0] && H.remove(), y[2].appendChild(S), f(c).find("ol").each(function (e) {
        var t = this;
        f(t).find("li").on("click", function () {
          var s = 0 | this.innerHTML;
          f(this).hasClass(i) || (r.range ? n[x][C[e]] = s : o[C[e]] = s, f(t).find("." + a).removeClass(a), f(this).addClass(a), E(), k(), (n.endDate || "time" === r.type) && n.done(null, "change"), n.setBtnStatus());
        });
      });
    }
    return n;
  }, y.prototype.listYM = [], y.prototype.closeList = function () {
    var e = this;
    e.config;
    f.each(e.elemCont, function (t, n) {
      f(this).find("." + l).remove(), f(e.elemMain[t]).removeClass("laydate-ym-show laydate-time-show");
    }), f(e.elem).find("." + u).remove();
  }, y.prototype.setBtnStatus = function (e, t, n) {
    var a,
        o = this.config,
        s = f(this.footer).find(m);
    o.range && "date" !== o.type && "time" !== o.type && (t = t || this.startDate, n = n || this.endDate, a = this.newDate(t).getTime() > this.newDate(n).getTime(), this.limit(null, t) || this.limit(null, n) ? s.addClass(i) : s[a ? "addClass" : "removeClass"](i), e && a && this.hint("string" == typeof e ? r.replace(/日期/g, e) : r));
  }, y.prototype.parse = function (e, t) {
    var n = this.config,
        a = t || (e ? f.extend({}, this.endDate, this.endTime) : n.range ? f.extend({}, this.startDate, this.startTime) : n.dateTime),
        i = this.format.concat();
    return f.each(i, function (e, t) {
      /yyyy|y/.test(t) ? i[e] = f.digit(a.year, t.length) : /MM|M/.test(t) ? i[e] = f.digit(a.month + 1, t.length) : /dd|d/.test(t) ? i[e] = f.digit(a.date, t.length) : /HH|H/.test(t) ? i[e] = f.digit(a.hours, t.length) : /mm|m/.test(t) ? i[e] = f.digit(a.minutes, t.length) : /ss|s/.test(t) && (i[e] = f.digit(a.seconds, t.length));
    }), n.range && !e ? i.join("") + " " + n.range + " " + this.parse(1) : i.join("");
  }, y.prototype.newDate = function (e) {
    return e = e || {}, new Date(e.year || 1, e.month || 0, e.date || 1, e.hours || 0, e.minutes || 0, e.seconds || 0);
  }, y.prototype.setValue = function (e) {
    var t = this.config,
        n = this.bindElem || t.elem[0],
        a = this.isInput(n) ? "val" : "html";
    return "static" === t.position || f(n)[a](e || ""), this;
  }, y.prototype.stampRange = function () {
    var e,
        t,
        n = this,
        o = n.config,
        s = f(n.elem).find("td");

    if (o.range && !n.endDate && f(n.footer).find(m).addClass(i), n.endDate) {
      if (e = n.newDate({
        year: n.startDate.year,
        month: n.startDate.month,
        date: n.startDate.date
      }).getTime(), t = n.newDate({
        year: n.endDate.year,
        month: n.endDate.month,
        date: n.endDate.date
      }).getTime(), e > t) return n.hint(r);
      f.each(s, function (i, r) {
        var o = f(r).attr("lay-ymd").split("-"),
            s = n.newDate({
          year: o[0],
          month: o[1] - 1,
          date: o[2]
        }).getTime();
        f(r).removeClass(d + " " + a), s !== e && s !== t || f(r).addClass(f(r).hasClass("laydate-day-prev") || f(r).hasClass("laydate-day-next") ? d : a), s > e && s < t && f(r).addClass(d);
      });
    }
  }, y.prototype.done = function (e, t) {
    var n = this.config,
        a = f.extend({}, this.startDate ? f.extend(this.startDate, this.startTime) : n.dateTime),
        i = f.extend({}, f.extend(this.endDate, this.endTime));
    return f.each([a, i], function (e, t) {
      "month" in t && f.extend(t, {
        month: t.month + 1
      });
    }), e = e || [this.parse(), a, i], "function" == typeof n[t || "done"] && n[t || "done"].apply(n, e), this;
  }, y.prototype.choose = function (e) {
    var t = this,
        n = t.config,
        r = n.dateTime,
        o = f(t.elem).find("td"),
        s = e.attr("lay-ymd").split("-"),
        l = function l(e) {
      new Date();
      e && f.extend(r, s), n.range && (t.startDate ? f.extend(t.startDate, s) : t.startDate = f.extend({}, s, t.startTime), t.startYMD = s);
    };

    if (s = {
      year: 0 | s[0],
      month: (0 | s[1]) - 1,
      date: 0 | s[2]
    }, !e.hasClass(i)) if (n.range) {
      if (f.each(["startTime", "endTime"], function (e, n) {
        t[n] = t[n] || {
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }), t.endState) l(), delete t.endState, delete t.endDate, t.startState = !0, o.removeClass(a + " " + d), e.addClass(a);else if (t.startState) {
        if (e.addClass(a), t.endDate ? f.extend(t.endDate, s) : t.endDate = f.extend({}, s, t.endTime), t.newDate(s).getTime() < t.newDate(t.startYMD).getTime()) {
          var c = f.extend({}, t.endDate, {
            hours: t.startDate.hours,
            minutes: t.startDate.minutes,
            seconds: t.startDate.seconds
          });
          f.extend(t.endDate, t.startDate, {
            hours: t.endDate.hours,
            minutes: t.endDate.minutes,
            seconds: t.endDate.seconds
          }), t.startDate = c;
        }

        n.showBottom || t.done(), t.stampRange(), t.endState = !0, t.done(null, "change");
      } else e.addClass(a), l(), t.startState = !0;
      f(t.footer).find(m)[t.endDate ? "removeClass" : "addClass"](i);
    } else "static" === n.position ? (l(!0), t.calendar().done().done(null, "change")) : "date" === n.type ? (l(!0), t.setValue(t.parse()).remove().done()) : "datetime" === n.type && (l(!0), t.calendar().done(null, "change"));
  }, y.prototype.tool = function (e, t) {
    var n = this,
        a = n.config,
        o = a.dateTime,
        s = "static" === a.position,
        l = {
      datetime: function datetime() {
        f(e).hasClass(i) || (n.list("time", 0), a.range && n.list("time", 1), f(e).attr("lay-type", "date").html(n.lang().dateTips));
      },
      date: function date() {
        n.closeList(), f(e).attr("lay-type", "datetime").html(n.lang().timeTips);
      },
      clear: function clear() {
        n.setValue("").remove(), s && (f.extend(o, n.firstDate), n.calendar()), a.range && (delete n.startState, delete n.endState, delete n.endDate, delete n.startTime, delete n.endTime), n.done(["", {}, {}]);
      },
      now: function now() {
        var e = new Date();
        f.extend(o, n.systemDate(), {
          hours: e.getHours(),
          minutes: e.getMinutes(),
          seconds: e.getSeconds()
        }), n.setValue(n.parse()).remove(), s && n.calendar(), n.done();
      },
      confirm: function confirm() {
        if (a.range) {
          if (!n.endDate) return n.hint("请先选择日期范围");
          if (f(e).hasClass(i)) return n.hint("time" === a.type ? r.replace(/日期/g, "时间") : r);
        } else if (f(e).hasClass(i)) return n.hint("不在有效日期或时间范围内");

        n.done(), n.setValue(n.parse()).remove();
      }
    };
    l[t] && l[t]();
  }, y.prototype.change = function (e) {
    var t = this,
        n = t.config,
        a = n.dateTime,
        i = n.range && ("year" === n.type || "month" === n.type),
        r = t.elemCont[e || 0],
        o = t.listYM[e],
        s = function s(_s) {
      var l = ["startDate", "endDate"][e],
          d = f(r).find(".laydate-year-list")[0],
          c = f(r).find(".laydate-month-list")[0];
      return d && (o[0] = _s ? o[0] - 15 : o[0] + 15, t.list("year", e)), c && (_s ? o[0]-- : o[0]++, t.list("month", e)), (d || c) && (f.extend(a, {
        year: o[0]
      }), i && (t[l].year = o[0]), n.range || t.done(null, "change"), t.setBtnStatus(), n.range || t.limit(f(t.footer).find(m), {
        year: o[0]
      })), d || c;
    };

    return {
      prevYear: function prevYear() {
        s("sub") || (a.year--, t.checkDate("limit").calendar(), n.range || t.done(null, "change"));
      },
      prevMonth: function prevMonth() {
        var e = t.getAsYM(a.year, a.month, "sub");
        f.extend(a, {
          year: e[0],
          month: e[1]
        }), t.checkDate("limit").calendar(), n.range || t.done(null, "change");
      },
      nextMonth: function nextMonth() {
        var e = t.getAsYM(a.year, a.month);
        f.extend(a, {
          year: e[0],
          month: e[1]
        }), t.checkDate("limit").calendar(), n.range || t.done(null, "change");
      },
      nextYear: function nextYear() {
        s() || (a.year++, t.checkDate("limit").calendar(), n.range || t.done(null, "change"));
      }
    };
  }, y.prototype.changeEvent = function () {
    var e = this;
    e.config;
    f(e.elem).on("click", function (e) {
      f.stope(e);
    }), f.each(e.elemHeader, function (t, n) {
      f(n[0]).on("click", function (n) {
        e.change(t).prevYear();
      }), f(n[1]).on("click", function (n) {
        e.change(t).prevMonth();
      }), f(n[2]).find("span").on("click", function (n) {
        var a = f(this),
            r = a.attr("lay-ym"),
            o = a.attr("lay-type");
        r && (r = r.split("-"), e.listYM[t] = [0 | r[0], 0 | r[1]], e.list(o, t), f(e.footer).find(h).addClass(i));
      }), f(n[3]).on("click", function (n) {
        e.change(t).nextMonth();
      }), f(n[4]).on("click", function (n) {
        e.change(t).nextYear();
      });
    }), f.each(e.table, function (t, n) {
      f(n).find("td").on("click", function () {
        e.choose(f(this));
      });
    }), f(e.footer).find("span").on("click", function () {
      var t = f(this).attr("lay-type");
      e.tool(this, t);
    });
  }, y.prototype.isInput = function (e) {
    return /input|textarea/.test(e.tagName.toLocaleLowerCase());
  }, y.prototype.events = function () {
    var e = this,
        t = e.config,
        n = function n(_n2, a) {
      _n2.on(t.trigger, function () {
        a && (e.bindElem = this), e.render();
      });
    };

    t.elem[0] && !t.elem[0].eventHandler && (n(t.elem, "bind"), n(t.eventElem), f(document).on("click", function (n) {
      n.target !== t.elem[0] && n.target !== t.eventElem[0] && n.target !== f(t.closeStop)[0] && e.remove();
    }).on("keydown", function (t) {
      13 === t.keyCode && f("#" + e.elemID)[0] && e.elemID === y.thisElem && (t.preventDefault(), f(e.footer).find(m)[0].click());
    }), f(window).on("resize", function () {
      if (!e.elem || !f(".layui-laydate")[0]) return !1;
      e.position();
    }), t.elem[0].eventHandler = !0);
  }, n.render = function (e) {
    var t = new y(e);
    return function () {
      var e = this;
      return {
        hint: function hint(t) {
          e.hint.call(e, t);
        },
        config: e.config
      };
    }.call(t);
  }, n.getEndDate = function (e, t) {
    var n = new Date();
    return n.setFullYear(t || n.getFullYear(), e || n.getMonth() + 1, 1), new Date(n.getTime() - 864e5).getDate();
  }, window.lay = window.lay || f, e ? (n.ready(), layui.define(function (e) {
    n.path = layui.cache.dir, e("laydate", n);
  })) : "function" == typeof define && define.amd ? define(function () {
    return n;
  }) : (n.ready(), window.laydate = n);
}();
!function (e, t) {
  "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = e.document ? t(e, !0) : function (e) {
    if (!e.document) throw new Error("jQuery requires a window with a document");
    return t(e);
  } : t(e);
}("undefined" != typeof window ? window : void 0, function (e, t) {
  var n = [],
      r = e.document,
      i = n.slice,
      o = n.concat,
      a = n.push,
      s = n.indexOf,
      u = {},
      l = u.toString,
      c = u.hasOwnProperty,
      f = {},
      d = function d(e, t) {
    return new d.fn.init(e, t);
  },
      p = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      h = /^-ms-/,
      g = /-([\da-z])/gi,
      m = function m(e, t) {
    return t.toUpperCase();
  };

  d.fn = d.prototype = {
    jquery: "1.12.3",
    constructor: d,
    selector: "",
    length: 0,
    toArray: function toArray() {
      return i.call(this);
    },
    get: function get(e) {
      return null != e ? e < 0 ? this[e + this.length] : this[e] : i.call(this);
    },
    pushStack: function pushStack(e) {
      var t = d.merge(this.constructor(), e);
      return t.prevObject = this, t.context = this.context, t;
    },
    each: function each(e) {
      return d.each(this, e);
    },
    map: function map(e) {
      return this.pushStack(d.map(this, function (t, n) {
        return e.call(t, n, t);
      }));
    },
    slice: function slice() {
      return this.pushStack(i.apply(this, arguments));
    },
    first: function first() {
      return this.eq(0);
    },
    last: function last() {
      return this.eq(-1);
    },
    eq: function eq(e) {
      var t = this.length,
          n = +e + (e < 0 ? t : 0);
      return this.pushStack(n >= 0 && n < t ? [this[n]] : []);
    },
    end: function end() {
      return this.prevObject || this.constructor();
    },
    push: a,
    sort: n.sort,
    splice: n.splice
  }, d.extend = d.fn.extend = function () {
    var e,
        t,
        n,
        r,
        i,
        o,
        a = arguments[0] || {},
        s = 1,
        u = arguments.length,
        l = !1;

    for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == _typeof(a) || d.isFunction(a) || (a = {}), s === u && (a = this, s--); s < u; s++) {
      if (null != (i = arguments[s])) for (r in i) {
        e = a[r], a !== (n = i[r]) && (l && n && (d.isPlainObject(n) || (t = d.isArray(n))) ? (t ? (t = !1, o = e && d.isArray(e) ? e : []) : o = e && d.isPlainObject(e) ? e : {}, a[r] = d.extend(l, o, n)) : void 0 !== n && (a[r] = n));
      }
    }

    return a;
  }, d.extend({
    expando: "jQuery" + ("1.12.3" + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function error(e) {
      throw new Error(e);
    },
    noop: function noop() {},
    isFunction: function isFunction(e) {
      return "function" === d.type(e);
    },
    isArray: Array.isArray || function (e) {
      return "array" === d.type(e);
    },
    isWindow: function isWindow(e) {
      return null != e && e == e.window;
    },
    isNumeric: function isNumeric(e) {
      var t = e && e.toString();
      return !d.isArray(e) && t - parseFloat(t) + 1 >= 0;
    },
    isEmptyObject: function isEmptyObject(e) {
      var t;

      for (t in e) {
        return !1;
      }

      return !0;
    },
    isPlainObject: function isPlainObject(e) {
      var t;
      if (!e || "object" !== d.type(e) || e.nodeType || d.isWindow(e)) return !1;

      try {
        if (e.constructor && !c.call(e, "constructor") && !c.call(e.constructor.prototype, "isPrototypeOf")) return !1;
      } catch (e) {
        return !1;
      }

      if (!f.ownFirst) for (t in e) {
        return c.call(e, t);
      }

      for (t in e) {
        ;
      }

      return void 0 === t || c.call(e, t);
    },
    type: function type(e) {
      return null == e ? e + "" : "object" == _typeof(e) || "function" == typeof e ? u[l.call(e)] || "object" : _typeof(e);
    },
    globalEval: function globalEval(t) {
      t && d.trim(t) && (e.execScript || function (t) {
        e.eval.call(e, t);
      })(t);
    },
    camelCase: function camelCase(e) {
      return e.replace(h, "ms-").replace(g, m);
    },
    nodeName: function nodeName(e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
    },
    each: function each(e, t) {
      var n,
          r = 0;
      if (v(e)) for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++) {
        ;
      } else for (r in e) {
        if (!1 === t.call(e[r], r, e[r])) break;
      }
      return e;
    },
    trim: function trim(e) {
      return null == e ? "" : (e + "").replace(p, "");
    },
    makeArray: function makeArray(e, t) {
      var n = t || [];
      return null != e && (v(Object(e)) ? d.merge(n, "string" == typeof e ? [e] : e) : a.call(n, e)), n;
    },
    inArray: function inArray(e, t, n) {
      var r;

      if (t) {
        if (s) return s.call(t, e, n);

        for (r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0; n < r; n++) {
          if (n in t && t[n] === e) return n;
        }
      }

      return -1;
    },
    merge: function merge(e, t) {
      for (var n = +t.length, r = 0, i = e.length; r < n;) {
        e[i++] = t[r++];
      }

      if (n != n) for (; void 0 !== t[r];) {
        e[i++] = t[r++];
      }
      return e.length = i, e;
    },
    grep: function grep(e, t, n) {
      for (var r = [], i = 0, o = e.length, a = !n; i < o; i++) {
        !t(e[i], i) !== a && r.push(e[i]);
      }

      return r;
    },
    map: function map(e, t, n) {
      var r,
          i,
          a = 0,
          s = [];
      if (v(e)) for (r = e.length; a < r; a++) {
        null != (i = t(e[a], a, n)) && s.push(i);
      } else for (a in e) {
        null != (i = t(e[a], a, n)) && s.push(i);
      }
      return o.apply([], s);
    },
    guid: 1,
    proxy: function proxy(e, t) {
      var n, r, o;
      if ("string" == typeof t && (o = e[t], t = e, e = o), d.isFunction(e)) return n = i.call(arguments, 2), (r = function r() {
        return e.apply(t || this, n.concat(i.call(arguments)));
      }).guid = e.guid = e.guid || d.guid++, r;
    },
    now: function now() {
      return +new Date();
    },
    support: f
  }), "function" == typeof Symbol && (d.fn[Symbol.iterator] = n[Symbol.iterator]), d.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (e, t) {
    u["[object " + t + "]"] = t.toLowerCase();
  });

  function v(e) {
    var t = !!e && "length" in e && e.length,
        n = d.type(e);
    return "function" !== n && !d.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e);
  }

  var y = function (e) {
    var t,
        n,
        r,
        i,
        o,
        a,
        s,
        u,
        l,
        c,
        f,
        d,
        p,
        h,
        g,
        m,
        v,
        y,
        x,
        b = "sizzle" + 1 * new Date(),
        w = e.document,
        T = 0,
        C = 0,
        E = oe(),
        N = oe(),
        k = oe(),
        S = function S(e, t) {
      return e === t && (f = !0), 0;
    },
        A = 1 << 31,
        D = {}.hasOwnProperty,
        j = [],
        L = j.pop,
        H = j.push,
        q = j.push,
        _ = j.slice,
        F = function F(e, t) {
      for (var n = 0, r = e.length; n < r; n++) {
        if (e[n] === t) return n;
      }

      return -1;
    },
        M = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        O = "[\\x20\\t\\r\\n\\f]",
        R = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        P = "\\[" + O + "*(" + R + ")(?:" + O + "*([*^$|!~]?=)" + O + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + R + "))|)" + O + "*\\]",
        B = ":(" + R + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + P + ")*)|.*)\\)|)",
        W = new RegExp(O + "+", "g"),
        I = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g"),
        $ = new RegExp("^" + O + "*," + O + "*"),
        z = new RegExp("^" + O + "*([>+~]|" + O + ")" + O + "*"),
        X = new RegExp("=" + O + "*([^\\]'\"]*?)" + O + "*\\]", "g"),
        U = new RegExp(B),
        V = new RegExp("^" + R + "$"),
        Y = {
      ID: new RegExp("^#(" + R + ")"),
      CLASS: new RegExp("^\\.(" + R + ")"),
      TAG: new RegExp("^(" + R + "|[*])"),
      ATTR: new RegExp("^" + P),
      PSEUDO: new RegExp("^" + B),
      CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)", "i"),
      bool: new RegExp("^(?:" + M + ")$", "i"),
      needsContext: new RegExp("^" + O + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)", "i")
    },
        J = /^(?:input|select|textarea|button)$/i,
        G = /^h\d$/i,
        K = /^[^{]+\{\s*\[native \w/,
        Q = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        Z = /[+~]/,
        ee = /'|\\/g,
        te = new RegExp("\\\\([\\da-f]{1,6}" + O + "?|(" + O + ")|.)", "ig"),
        ne = function ne(e, t, n) {
      var r = "0x" + t - 65536;
      return r != r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320);
    },
        re = function re() {
      d();
    };

    try {
      q.apply(j = _.call(w.childNodes), w.childNodes), j[w.childNodes.length].nodeType;
    } catch (e) {
      q = {
        apply: j.length ? function (e, t) {
          H.apply(e, _.call(t));
        } : function (e, t) {
          for (var n = e.length, r = 0; e[n++] = t[r++];) {
            ;
          }

          e.length = n - 1;
        }
      };
    }

    function ie(e, t, r, i) {
      var o,
          s,
          l,
          c,
          f,
          h,
          v,
          y,
          T = t && t.ownerDocument,
          C = t ? t.nodeType : 9;
      if (r = r || [], "string" != typeof e || !e || 1 !== C && 9 !== C && 11 !== C) return r;

      if (!i && ((t ? t.ownerDocument || t : w) !== p && d(t), t = t || p, g)) {
        if (11 !== C && (h = Q.exec(e))) if (o = h[1]) {
          if (9 === C) {
            if (!(l = t.getElementById(o))) return r;
            if (l.id === o) return r.push(l), r;
          } else if (T && (l = T.getElementById(o)) && x(t, l) && l.id === o) return r.push(l), r;
        } else {
          if (h[2]) return q.apply(r, t.getElementsByTagName(e)), r;
          if ((o = h[3]) && n.getElementsByClassName && t.getElementsByClassName) return q.apply(r, t.getElementsByClassName(o)), r;
        }

        if (n.qsa && !k[e + " "] && (!m || !m.test(e))) {
          if (1 !== C) T = t, y = e;else if ("object" !== t.nodeName.toLowerCase()) {
            for ((c = t.getAttribute("id")) ? c = c.replace(ee, "\\$&") : t.setAttribute("id", c = b), s = (v = a(e)).length, f = V.test(c) ? "#" + c : "[id='" + c + "']"; s--;) {
              v[s] = f + " " + ge(v[s]);
            }

            y = v.join(","), T = Z.test(e) && pe(t.parentNode) || t;
          }
          if (y) try {
            return q.apply(r, T.querySelectorAll(y)), r;
          } catch (e) {} finally {
            c === b && t.removeAttribute("id");
          }
        }
      }

      return u(e.replace(I, "$1"), t, r, i);
    }

    function oe() {
      var e = [];
      return function t(n, i) {
        return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i;
      };
    }

    function ae(e) {
      return e[b] = !0, e;
    }

    function se(e) {
      var t = p.createElement("div");

      try {
        return !!e(t);
      } catch (e) {
        return !1;
      } finally {
        t.parentNode && t.parentNode.removeChild(t), t = null;
      }
    }

    function ue(e, t) {
      for (var n = e.split("|"), i = n.length; i--;) {
        r.attrHandle[n[i]] = t;
      }
    }

    function le(e, t) {
      var n = t && e,
          r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || A) - (~e.sourceIndex || A);
      if (r) return r;
      if (n) for (; n = n.nextSibling;) {
        if (n === t) return -1;
      }
      return e ? 1 : -1;
    }

    function ce(e) {
      return function (t) {
        return "input" === t.nodeName.toLowerCase() && t.type === e;
      };
    }

    function fe(e) {
      return function (t) {
        var n = t.nodeName.toLowerCase();
        return ("input" === n || "button" === n) && t.type === e;
      };
    }

    function de(e) {
      return ae(function (t) {
        return t = +t, ae(function (n, r) {
          for (var i, o = e([], n.length, t), a = o.length; a--;) {
            n[i = o[a]] && (n[i] = !(r[i] = n[i]));
          }
        });
      });
    }

    function pe(e) {
      return e && void 0 !== e.getElementsByTagName && e;
    }

    n = ie.support = {}, o = ie.isXML = function (e) {
      var t = e && (e.ownerDocument || e).documentElement;
      return !!t && "HTML" !== t.nodeName;
    }, d = ie.setDocument = function (e) {
      var t,
          i,
          a = e ? e.ownerDocument || e : w;
      return a !== p && 9 === a.nodeType && a.documentElement ? (h = (p = a).documentElement, g = !o(p), (i = p.defaultView) && i.top !== i && (i.addEventListener ? i.addEventListener("unload", re, !1) : i.attachEvent && i.attachEvent("onunload", re)), n.attributes = se(function (e) {
        return e.className = "i", !e.getAttribute("className");
      }), n.getElementsByTagName = se(function (e) {
        return e.appendChild(p.createComment("")), !e.getElementsByTagName("*").length;
      }), n.getElementsByClassName = K.test(p.getElementsByClassName), n.getById = se(function (e) {
        return h.appendChild(e).id = b, !p.getElementsByName || !p.getElementsByName(b).length;
      }), n.getById ? (r.find.ID = function (e, t) {
        if (void 0 !== t.getElementById && g) {
          var n = t.getElementById(e);
          return n ? [n] : [];
        }
      }, r.filter.ID = function (e) {
        var t = e.replace(te, ne);
        return function (e) {
          return e.getAttribute("id") === t;
        };
      }) : (delete r.find.ID, r.filter.ID = function (e) {
        var t = e.replace(te, ne);
        return function (e) {
          var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
          return n && n.value === t;
        };
      }), r.find.TAG = n.getElementsByTagName ? function (e, t) {
        return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0;
      } : function (e, t) {
        var n,
            r = [],
            i = 0,
            o = t.getElementsByTagName(e);

        if ("*" === e) {
          for (; n = o[i++];) {
            1 === n.nodeType && r.push(n);
          }

          return r;
        }

        return o;
      }, r.find.CLASS = n.getElementsByClassName && function (e, t) {
        if (void 0 !== t.getElementsByClassName && g) return t.getElementsByClassName(e);
      }, v = [], m = [], (n.qsa = K.test(p.querySelectorAll)) && (se(function (e) {
        h.appendChild(e).innerHTML = "<a id='" + b + "'></a><select id='" + b + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + O + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || m.push("\\[" + O + "*(?:value|" + M + ")"), e.querySelectorAll("[id~=" + b + "-]").length || m.push("~="), e.querySelectorAll(":checked").length || m.push(":checked"), e.querySelectorAll("a#" + b + "+*").length || m.push(".#.+[+~]");
      }), se(function (e) {
        var t = p.createElement("input");
        t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name" + O + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || m.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), m.push(",.*:");
      })), (n.matchesSelector = K.test(y = h.matches || h.webkitMatchesSelector || h.mozMatchesSelector || h.oMatchesSelector || h.msMatchesSelector)) && se(function (e) {
        n.disconnectedMatch = y.call(e, "div"), y.call(e, "[s!='']:x"), v.push("!=", B);
      }), m = m.length && new RegExp(m.join("|")), v = v.length && new RegExp(v.join("|")), t = K.test(h.compareDocumentPosition), x = t || K.test(h.contains) ? function (e, t) {
        var n = 9 === e.nodeType ? e.documentElement : e,
            r = t && t.parentNode;
        return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
      } : function (e, t) {
        if (t) for (; t = t.parentNode;) {
          if (t === e) return !0;
        }
        return !1;
      }, S = t ? function (e, t) {
        if (e === t) return f = !0, 0;
        var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
        return r || (1 & (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === p || e.ownerDocument === w && x(w, e) ? -1 : t === p || t.ownerDocument === w && x(w, t) ? 1 : c ? F(c, e) - F(c, t) : 0 : 4 & r ? -1 : 1);
      } : function (e, t) {
        if (e === t) return f = !0, 0;
        var n,
            r = 0,
            i = e.parentNode,
            o = t.parentNode,
            a = [e],
            s = [t];
        if (!i || !o) return e === p ? -1 : t === p ? 1 : i ? -1 : o ? 1 : c ? F(c, e) - F(c, t) : 0;
        if (i === o) return le(e, t);

        for (n = e; n = n.parentNode;) {
          a.unshift(n);
        }

        for (n = t; n = n.parentNode;) {
          s.unshift(n);
        }

        for (; a[r] === s[r];) {
          r++;
        }

        return r ? le(a[r], s[r]) : a[r] === w ? -1 : s[r] === w ? 1 : 0;
      }, p) : p;
    }, ie.matches = function (e, t) {
      return ie(e, null, null, t);
    }, ie.matchesSelector = function (e, t) {
      if ((e.ownerDocument || e) !== p && d(e), t = t.replace(X, "='$1']"), n.matchesSelector && g && !k[t + " "] && (!v || !v.test(t)) && (!m || !m.test(t))) try {
        var r = y.call(e, t);
        if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r;
      } catch (e) {}
      return ie(t, p, null, [e]).length > 0;
    }, ie.contains = function (e, t) {
      return (e.ownerDocument || e) !== p && d(e), x(e, t);
    }, ie.attr = function (e, t) {
      (e.ownerDocument || e) !== p && d(e);
      var i = r.attrHandle[t.toLowerCase()],
          o = i && D.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !g) : void 0;
      return void 0 !== o ? o : n.attributes || !g ? e.getAttribute(t) : (o = e.getAttributeNode(t)) && o.specified ? o.value : null;
    }, ie.error = function (e) {
      throw new Error("Syntax error, unrecognized expression: " + e);
    }, ie.uniqueSort = function (e) {
      var t,
          r = [],
          i = 0,
          o = 0;

      if (f = !n.detectDuplicates, c = !n.sortStable && e.slice(0), e.sort(S), f) {
        for (; t = e[o++];) {
          t === e[o] && (i = r.push(o));
        }

        for (; i--;) {
          e.splice(r[i], 1);
        }
      }

      return c = null, e;
    }, i = ie.getText = function (e) {
      var t,
          n = "",
          r = 0,
          o = e.nodeType;

      if (o) {
        if (1 === o || 9 === o || 11 === o) {
          if ("string" == typeof e.textContent) return e.textContent;

          for (e = e.firstChild; e; e = e.nextSibling) {
            n += i(e);
          }
        } else if (3 === o || 4 === o) return e.nodeValue;
      } else for (; t = e[r++];) {
        n += i(t);
      }

      return n;
    }, (r = ie.selectors = {
      cacheLength: 50,
      createPseudo: ae,
      match: Y,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: !0
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: !0
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function ATTR(e) {
          return e[1] = e[1].replace(te, ne), e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
        },
        CHILD: function CHILD(e) {
          return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ie.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ie.error(e[0]), e;
        },
        PSEUDO: function PSEUDO(e) {
          var t,
              n = !e[6] && e[2];
          return Y.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && U.test(n) && (t = a(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3));
        }
      },
      filter: {
        TAG: function TAG(e) {
          var t = e.replace(te, ne).toLowerCase();
          return "*" === e ? function () {
            return !0;
          } : function (e) {
            return e.nodeName && e.nodeName.toLowerCase() === t;
          };
        },
        CLASS: function CLASS(e) {
          var t = E[e + " "];
          return t || (t = new RegExp("(^|" + O + ")" + e + "(" + O + "|$)")) && E(e, function (e) {
            return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "");
          });
        },
        ATTR: function ATTR(e, t, n) {
          return function (r) {
            var i = ie.attr(r, e);
            return null == i ? "!=" === t : !t || (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i.replace(W, " ") + " ").indexOf(n) > -1 : "|=" === t && (i === n || i.slice(0, n.length + 1) === n + "-"));
          };
        },
        CHILD: function CHILD(e, t, n, r, i) {
          var o = "nth" !== e.slice(0, 3),
              a = "last" !== e.slice(-4),
              s = "of-type" === t;
          return 1 === r && 0 === i ? function (e) {
            return !!e.parentNode;
          } : function (t, n, u) {
            var l,
                c,
                f,
                d,
                p,
                h,
                g = o !== a ? "nextSibling" : "previousSibling",
                m = t.parentNode,
                v = s && t.nodeName.toLowerCase(),
                y = !u && !s,
                x = !1;

            if (m) {
              if (o) {
                for (; g;) {
                  for (d = t; d = d[g];) {
                    if (s ? d.nodeName.toLowerCase() === v : 1 === d.nodeType) return !1;
                  }

                  h = g = "only" === e && !h && "nextSibling";
                }

                return !0;
              }

              if (h = [a ? m.firstChild : m.lastChild], a && y) {
                for (x = (p = (l = (c = (f = (d = m)[b] || (d[b] = {}))[d.uniqueID] || (f[d.uniqueID] = {}))[e] || [])[0] === T && l[1]) && l[2], d = p && m.childNodes[p]; d = ++p && d && d[g] || (x = p = 0) || h.pop();) {
                  if (1 === d.nodeType && ++x && d === t) {
                    c[e] = [T, p, x];
                    break;
                  }
                }
              } else if (y && (x = p = (l = (c = (f = (d = t)[b] || (d[b] = {}))[d.uniqueID] || (f[d.uniqueID] = {}))[e] || [])[0] === T && l[1]), !1 === x) for (; (d = ++p && d && d[g] || (x = p = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++x || (y && ((c = (f = d[b] || (d[b] = {}))[d.uniqueID] || (f[d.uniqueID] = {}))[e] = [T, x]), d !== t));) {
                ;
              }

              return (x -= i) === r || x % r == 0 && x / r >= 0;
            }
          };
        },
        PSEUDO: function PSEUDO(e, t) {
          var n,
              i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || ie.error("unsupported pseudo: " + e);
          return i[b] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? ae(function (e, n) {
            for (var r, o = i(e, t), a = o.length; a--;) {
              e[r = F(e, o[a])] = !(n[r] = o[a]);
            }
          }) : function (e) {
            return i(e, 0, n);
          }) : i;
        }
      },
      pseudos: {
        not: ae(function (e) {
          var t = [],
              n = [],
              r = s(e.replace(I, "$1"));
          return r[b] ? ae(function (e, t, n, i) {
            for (var o, a = r(e, null, i, []), s = e.length; s--;) {
              (o = a[s]) && (e[s] = !(t[s] = o));
            }
          }) : function (e, i, o) {
            return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop();
          };
        }),
        has: ae(function (e) {
          return function (t) {
            return ie(e, t).length > 0;
          };
        }),
        contains: ae(function (e) {
          return e = e.replace(te, ne), function (t) {
            return (t.textContent || t.innerText || i(t)).indexOf(e) > -1;
          };
        }),
        lang: ae(function (e) {
          return V.test(e || "") || ie.error("unsupported lang: " + e), e = e.replace(te, ne).toLowerCase(), function (t) {
            var n;

            do {
              if (n = g ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-");
            } while ((t = t.parentNode) && 1 === t.nodeType);

            return !1;
          };
        }),
        target: function target(t) {
          var n = e.location && e.location.hash;
          return n && n.slice(1) === t.id;
        },
        root: function root(e) {
          return e === h;
        },
        focus: function focus(e) {
          return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
        },
        enabled: function enabled(e) {
          return !1 === e.disabled;
        },
        disabled: function disabled(e) {
          return !0 === e.disabled;
        },
        checked: function checked(e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && !!e.checked || "option" === t && !!e.selected;
        },
        selected: function selected(e) {
          return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected;
        },
        empty: function empty(e) {
          for (e = e.firstChild; e; e = e.nextSibling) {
            if (e.nodeType < 6) return !1;
          }

          return !0;
        },
        parent: function parent(e) {
          return !r.pseudos.empty(e);
        },
        header: function header(e) {
          return G.test(e.nodeName);
        },
        input: function input(e) {
          return J.test(e.nodeName);
        },
        button: function button(e) {
          var t = e.nodeName.toLowerCase();
          return "input" === t && "button" === e.type || "button" === t;
        },
        text: function text(e) {
          var t;
          return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
        },
        first: de(function () {
          return [0];
        }),
        last: de(function (e, t) {
          return [t - 1];
        }),
        eq: de(function (e, t, n) {
          return [n < 0 ? n + t : n];
        }),
        even: de(function (e, t) {
          for (var n = 0; n < t; n += 2) {
            e.push(n);
          }

          return e;
        }),
        odd: de(function (e, t) {
          for (var n = 1; n < t; n += 2) {
            e.push(n);
          }

          return e;
        }),
        lt: de(function (e, t, n) {
          for (var r = n < 0 ? n + t : n; --r >= 0;) {
            e.push(r);
          }

          return e;
        }),
        gt: de(function (e, t, n) {
          for (var r = n < 0 ? n + t : n; ++r < t;) {
            e.push(r);
          }

          return e;
        })
      }
    }).pseudos.nth = r.pseudos.eq;

    for (t in {
      radio: !0,
      checkbox: !0,
      file: !0,
      password: !0,
      image: !0
    }) {
      r.pseudos[t] = ce(t);
    }

    for (t in {
      submit: !0,
      reset: !0
    }) {
      r.pseudos[t] = fe(t);
    }

    function he() {}

    he.prototype = r.filters = r.pseudos, r.setFilters = new he(), a = ie.tokenize = function (e, t) {
      var n,
          i,
          o,
          a,
          s,
          u,
          l,
          c = N[e + " "];
      if (c) return t ? 0 : c.slice(0);

      for (s = e, u = [], l = r.preFilter; s;) {
        n && !(i = $.exec(s)) || (i && (s = s.slice(i[0].length) || s), u.push(o = [])), n = !1, (i = z.exec(s)) && (n = i.shift(), o.push({
          value: n,
          type: i[0].replace(I, " ")
        }), s = s.slice(n.length));

        for (a in r.filter) {
          !(i = Y[a].exec(s)) || l[a] && !(i = l[a](i)) || (n = i.shift(), o.push({
            value: n,
            type: a,
            matches: i
          }), s = s.slice(n.length));
        }

        if (!n) break;
      }

      return t ? s.length : s ? ie.error(e) : N(e, u).slice(0);
    };

    function ge(e) {
      for (var t = 0, n = e.length, r = ""; t < n; t++) {
        r += e[t].value;
      }

      return r;
    }

    function me(e, t, n) {
      var r = t.dir,
          i = n && "parentNode" === r,
          o = C++;
      return t.first ? function (t, n, o) {
        for (; t = t[r];) {
          if (1 === t.nodeType || i) return e(t, n, o);
        }
      } : function (t, n, a) {
        var s,
            u,
            l,
            c = [T, o];

        if (a) {
          for (; t = t[r];) {
            if ((1 === t.nodeType || i) && e(t, n, a)) return !0;
          }
        } else for (; t = t[r];) {
          if (1 === t.nodeType || i) {
            if ((s = (u = (l = t[b] || (t[b] = {}))[t.uniqueID] || (l[t.uniqueID] = {}))[r]) && s[0] === T && s[1] === o) return c[2] = s[2];
            if (u[r] = c, c[2] = e(t, n, a)) return !0;
          }
        }
      };
    }

    function ve(e) {
      return e.length > 1 ? function (t, n, r) {
        for (var i = e.length; i--;) {
          if (!e[i](t, n, r)) return !1;
        }

        return !0;
      } : e[0];
    }

    function ye(e, t, n, r, i) {
      for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++) {
        (o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
      }

      return a;
    }

    function xe(e, t, n, r, i, o) {
      return r && !r[b] && (r = xe(r)), i && !i[b] && (i = xe(i, o)), ae(function (o, a, s, u) {
        var l,
            c,
            f,
            d = [],
            p = [],
            h = a.length,
            g = o || function (e, t, n) {
          for (var r = 0, i = t.length; r < i; r++) {
            ie(e, t[r], n);
          }

          return n;
        }(t || "*", s.nodeType ? [s] : s, []),
            m = !e || !o && t ? g : ye(g, d, e, s, u),
            v = n ? i || (o ? e : h || r) ? [] : a : m;

        if (n && n(m, v, s, u), r) for (l = ye(v, p), r(l, [], s, u), c = l.length; c--;) {
          (f = l[c]) && (v[p[c]] = !(m[p[c]] = f));
        }

        if (o) {
          if (i || e) {
            if (i) {
              for (l = [], c = v.length; c--;) {
                (f = v[c]) && l.push(m[c] = f);
              }

              i(null, v = [], l, u);
            }

            for (c = v.length; c--;) {
              (f = v[c]) && (l = i ? F(o, f) : d[c]) > -1 && (o[l] = !(a[l] = f));
            }
          }
        } else v = ye(v === a ? v.splice(h, v.length) : v), i ? i(null, a, v, u) : q.apply(a, v);
      });
    }

    function be(e) {
      for (var t, n, i, o = e.length, a = r.relative[e[0].type], s = a || r.relative[" "], u = a ? 1 : 0, c = me(function (e) {
        return e === t;
      }, s, !0), f = me(function (e) {
        return F(t, e) > -1;
      }, s, !0), d = [function (e, n, r) {
        var i = !a && (r || n !== l) || ((t = n).nodeType ? c(e, n, r) : f(e, n, r));
        return t = null, i;
      }]; u < o; u++) {
        if (n = r.relative[e[u].type]) d = [me(ve(d), n)];else {
          if ((n = r.filter[e[u].type].apply(null, e[u].matches))[b]) {
            for (i = ++u; i < o && !r.relative[e[i].type]; i++) {
              ;
            }

            return xe(u > 1 && ve(d), u > 1 && ge(e.slice(0, u - 1).concat({
              value: " " === e[u - 2].type ? "*" : ""
            })).replace(I, "$1"), n, u < i && be(e.slice(u, i)), i < o && be(e = e.slice(i)), i < o && ge(e));
          }

          d.push(n);
        }
      }

      return ve(d);
    }

    return s = ie.compile = function (e, t) {
      var n,
          i = [],
          o = [],
          s = k[e + " "];

      if (!s) {
        for (t || (t = a(e)), n = t.length; n--;) {
          (s = be(t[n]))[b] ? i.push(s) : o.push(s);
        }

        (s = k(e, function (e, t) {
          var n = t.length > 0,
              i = e.length > 0,
              o = function o(_o, a, s, u, c) {
            var f,
                h,
                m,
                v = 0,
                y = "0",
                x = _o && [],
                b = [],
                w = l,
                C = _o || i && r.find.TAG("*", c),
                E = T += null == w ? 1 : Math.random() || .1,
                N = C.length;

            for (c && (l = a === p || a || c); y !== N && null != (f = C[y]); y++) {
              if (i && f) {
                for (h = 0, a || f.ownerDocument === p || (d(f), s = !g); m = e[h++];) {
                  if (m(f, a || p, s)) {
                    u.push(f);
                    break;
                  }
                }

                c && (T = E);
              }

              n && ((f = !m && f) && v--, _o && x.push(f));
            }

            if (v += y, n && y !== v) {
              for (h = 0; m = t[h++];) {
                m(x, b, a, s);
              }

              if (_o) {
                if (v > 0) for (; y--;) {
                  x[y] || b[y] || (b[y] = L.call(u));
                }
                b = ye(b);
              }

              q.apply(u, b), c && !_o && b.length > 0 && v + t.length > 1 && ie.uniqueSort(u);
            }

            return c && (T = E, l = w), x;
          };

          return n ? ae(o) : o;
        }(o, i))).selector = e;
      }

      return s;
    }, u = ie.select = function (e, t, i, o) {
      var u,
          l,
          c,
          f,
          d,
          p = "function" == typeof e && e,
          h = !o && a(e = p.selector || e);

      if (i = i || [], 1 === h.length) {
        if ((l = h[0] = h[0].slice(0)).length > 2 && "ID" === (c = l[0]).type && n.getById && 9 === t.nodeType && g && r.relative[l[1].type]) {
          if (!(t = (r.find.ID(c.matches[0].replace(te, ne), t) || [])[0])) return i;
          p && (t = t.parentNode), e = e.slice(l.shift().value.length);
        }

        for (u = Y.needsContext.test(e) ? 0 : l.length; u-- && (c = l[u], !r.relative[f = c.type]);) {
          if ((d = r.find[f]) && (o = d(c.matches[0].replace(te, ne), Z.test(l[0].type) && pe(t.parentNode) || t))) {
            if (l.splice(u, 1), !(e = o.length && ge(l))) return q.apply(i, o), i;
            break;
          }
        }
      }

      return (p || s(e, h))(o, t, !g, i, !t || Z.test(e) && pe(t.parentNode) || t), i;
    }, n.sortStable = b.split("").sort(S).join("") === b, n.detectDuplicates = !!f, d(), n.sortDetached = se(function (e) {
      return 1 & e.compareDocumentPosition(p.createElement("div"));
    }), se(function (e) {
      return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href");
    }) || ue("type|href|height|width", function (e, t, n) {
      if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
    }), n.attributes && se(function (e) {
      return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
    }) || ue("value", function (e, t, n) {
      if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue;
    }), se(function (e) {
      return null == e.getAttribute("disabled");
    }) || ue(M, function (e, t, n) {
      var r;
      if (!n) return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null;
    }), ie;
  }(e);

  d.find = y, d.expr = y.selectors, d.expr[":"] = d.expr.pseudos, d.uniqueSort = d.unique = y.uniqueSort, d.text = y.getText, d.isXMLDoc = y.isXML, d.contains = y.contains;

  var x = function x(e, t, n) {
    for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;) {
      if (1 === e.nodeType) {
        if (i && d(e).is(n)) break;
        r.push(e);
      }
    }

    return r;
  },
      b = function b(e, t) {
    for (var n = []; e; e = e.nextSibling) {
      1 === e.nodeType && e !== t && n.push(e);
    }

    return n;
  },
      w = d.expr.match.needsContext,
      T = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
      C = /^.[^:#\[\.,]*$/;

  function E(e, t, n) {
    if (d.isFunction(t)) return d.grep(e, function (e, r) {
      return !!t.call(e, r, e) !== n;
    });
    if (t.nodeType) return d.grep(e, function (e) {
      return e === t !== n;
    });

    if ("string" == typeof t) {
      if (C.test(t)) return d.filter(t, e, n);
      t = d.filter(t, e);
    }

    return d.grep(e, function (e) {
      return d.inArray(e, t) > -1 !== n;
    });
  }

  d.filter = function (e, t, n) {
    var r = t[0];
    return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? d.find.matchesSelector(r, e) ? [r] : [] : d.find.matches(e, d.grep(t, function (e) {
      return 1 === e.nodeType;
    }));
  }, d.fn.extend({
    find: function find(e) {
      var t,
          n = [],
          r = this,
          i = r.length;
      if ("string" != typeof e) return this.pushStack(d(e).filter(function () {
        for (t = 0; t < i; t++) {
          if (d.contains(r[t], this)) return !0;
        }
      }));

      for (t = 0; t < i; t++) {
        d.find(e, r[t], n);
      }

      return (n = this.pushStack(i > 1 ? d.unique(n) : n)).selector = this.selector ? this.selector + " " + e : e, n;
    },
    filter: function filter(e) {
      return this.pushStack(E(this, e || [], !1));
    },
    not: function not(e) {
      return this.pushStack(E(this, e || [], !0));
    },
    is: function is(e) {
      return !!E(this, "string" == typeof e && w.test(e) ? d(e) : e || [], !1).length;
    }
  });
  var N,
      k = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
  (d.fn.init = function (e, t, n) {
    var i, o;
    if (!e) return this;

    if (n = n || N, "string" == typeof e) {
      if (!(i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : k.exec(e)) || !i[1] && t) return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);

      if (i[1]) {
        if (t = t instanceof d ? t[0] : t, d.merge(this, d.parseHTML(i[1], t && t.nodeType ? t.ownerDocument || t : r, !0)), T.test(i[1]) && d.isPlainObject(t)) for (i in t) {
          d.isFunction(this[i]) ? this[i](t[i]) : this.attr(i, t[i]);
        }
        return this;
      }

      if ((o = r.getElementById(i[2])) && o.parentNode) {
        if (o.id !== i[2]) return N.find(e);
        this.length = 1, this[0] = o;
      }

      return this.context = r, this.selector = e, this;
    }

    return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : d.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(d) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), d.makeArray(e, this));
  }).prototype = d.fn, N = d(r);
  var S = /^(?:parents|prev(?:Until|All))/,
      A = {
    children: !0,
    contents: !0,
    next: !0,
    prev: !0
  };
  d.fn.extend({
    has: function has(e) {
      var t,
          n = d(e, this),
          r = n.length;
      return this.filter(function () {
        for (t = 0; t < r; t++) {
          if (d.contains(this, n[t])) return !0;
        }
      });
    },
    closest: function closest(e, t) {
      for (var n, r = 0, i = this.length, o = [], a = w.test(e) || "string" != typeof e ? d(e, t || this.context) : 0; r < i; r++) {
        for (n = this[r]; n && n !== t; n = n.parentNode) {
          if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && d.find.matchesSelector(n, e))) {
            o.push(n);
            break;
          }
        }
      }

      return this.pushStack(o.length > 1 ? d.uniqueSort(o) : o);
    },
    index: function index(e) {
      return e ? "string" == typeof e ? d.inArray(this[0], d(e)) : d.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    },
    add: function add(e, t) {
      return this.pushStack(d.uniqueSort(d.merge(this.get(), d(e, t))));
    },
    addBack: function addBack(e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
    }
  });

  function D(e, t) {
    do {
      e = e[t];
    } while (e && 1 !== e.nodeType);

    return e;
  }

  d.each({
    parent: function parent(e) {
      var t = e.parentNode;
      return t && 11 !== t.nodeType ? t : null;
    },
    parents: function parents(e) {
      return x(e, "parentNode");
    },
    parentsUntil: function parentsUntil(e, t, n) {
      return x(e, "parentNode", n);
    },
    next: function next(e) {
      return D(e, "nextSibling");
    },
    prev: function prev(e) {
      return D(e, "previousSibling");
    },
    nextAll: function nextAll(e) {
      return x(e, "nextSibling");
    },
    prevAll: function prevAll(e) {
      return x(e, "previousSibling");
    },
    nextUntil: function nextUntil(e, t, n) {
      return x(e, "nextSibling", n);
    },
    prevUntil: function prevUntil(e, t, n) {
      return x(e, "previousSibling", n);
    },
    siblings: function siblings(e) {
      return b((e.parentNode || {}).firstChild, e);
    },
    children: function children(e) {
      return b(e.firstChild);
    },
    contents: function contents(e) {
      return d.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : d.merge([], e.childNodes);
    }
  }, function (e, t) {
    d.fn[e] = function (n, r) {
      var i = d.map(this, t, n);
      return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = d.filter(r, i)), this.length > 1 && (A[e] || (i = d.uniqueSort(i)), S.test(e) && (i = i.reverse())), this.pushStack(i);
    };
  });
  var j = /\S+/g;
  d.Callbacks = function (e) {
    e = "string" == typeof e ? function (e) {
      var t = {};
      return d.each(e.match(j) || [], function (e, n) {
        t[n] = !0;
      }), t;
    }(e) : d.extend({}, e);

    var t,
        n,
        r,
        i,
        o = [],
        a = [],
        s = -1,
        u = function u() {
      for (i = e.once, r = t = !0; a.length; s = -1) {
        for (n = a.shift(); ++s < o.length;) {
          !1 === o[s].apply(n[0], n[1]) && e.stopOnFalse && (s = o.length, n = !1);
        }
      }

      e.memory || (n = !1), t = !1, i && (o = n ? [] : "");
    },
        l = {
      add: function add() {
        return o && (n && !t && (s = o.length - 1, a.push(n)), function t(n) {
          d.each(n, function (n, r) {
            d.isFunction(r) ? e.unique && l.has(r) || o.push(r) : r && r.length && "string" !== d.type(r) && t(r);
          });
        }(arguments), n && !t && u()), this;
      },
      remove: function remove() {
        return d.each(arguments, function (e, t) {
          for (var n; (n = d.inArray(t, o, n)) > -1;) {
            o.splice(n, 1), n <= s && s--;
          }
        }), this;
      },
      has: function has(e) {
        return e ? d.inArray(e, o) > -1 : o.length > 0;
      },
      empty: function empty() {
        return o && (o = []), this;
      },
      disable: function disable() {
        return i = a = [], o = n = "", this;
      },
      disabled: function disabled() {
        return !o;
      },
      lock: function lock() {
        return i = !0, n || l.disable(), this;
      },
      locked: function locked() {
        return !!i;
      },
      fireWith: function fireWith(e, n) {
        return i || (n = [e, (n = n || []).slice ? n.slice() : n], a.push(n), t || u()), this;
      },
      fire: function fire() {
        return l.fireWith(this, arguments), this;
      },
      fired: function fired() {
        return !!r;
      }
    };

    return l;
  }, d.extend({
    Deferred: function Deferred(e) {
      var t = [["resolve", "done", d.Callbacks("once memory"), "resolved"], ["reject", "fail", d.Callbacks("once memory"), "rejected"], ["notify", "progress", d.Callbacks("memory")]],
          n = "pending",
          r = {
        state: function state() {
          return n;
        },
        always: function always() {
          return i.done(arguments).fail(arguments), this;
        },
        then: function then() {
          var e = arguments;
          return d.Deferred(function (n) {
            d.each(t, function (t, o) {
              var a = d.isFunction(e[t]) && e[t];
              i[o[1]](function () {
                var e = a && a.apply(this, arguments);
                e && d.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments);
              });
            }), e = null;
          }).promise();
        },
        promise: function promise(e) {
          return null != e ? d.extend(e, r) : r;
        }
      },
          i = {};
      return r.pipe = r.then, d.each(t, function (e, o) {
        var a = o[2],
            s = o[3];
        r[o[1]] = a.add, s && a.add(function () {
          n = s;
        }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function () {
          return i[o[0] + "With"](this === i ? r : this, arguments), this;
        }, i[o[0] + "With"] = a.fireWith;
      }), r.promise(i), e && e.call(i, i), i;
    },
    when: function when(e) {
      var t,
          n,
          r,
          o = 0,
          a = i.call(arguments),
          s = a.length,
          u = 1 !== s || e && d.isFunction(e.promise) ? s : 0,
          l = 1 === u ? e : d.Deferred(),
          c = function c(e, n, r) {
        return function (o) {
          n[e] = this, r[e] = arguments.length > 1 ? i.call(arguments) : o, r === t ? l.notifyWith(n, r) : --u || l.resolveWith(n, r);
        };
      };

      if (s > 1) for (t = new Array(s), n = new Array(s), r = new Array(s); o < s; o++) {
        a[o] && d.isFunction(a[o].promise) ? a[o].promise().progress(c(o, n, t)).done(c(o, r, a)).fail(l.reject) : --u;
      }
      return u || l.resolveWith(r, a), l.promise();
    }
  });
  var L;
  d.fn.ready = function (e) {
    return d.ready.promise().done(e), this;
  }, d.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function holdReady(e) {
      e ? d.readyWait++ : d.ready(!0);
    },
    ready: function ready(e) {
      (!0 === e ? --d.readyWait : d.isReady) || (d.isReady = !0, !0 !== e && --d.readyWait > 0 || (L.resolveWith(r, [d]), d.fn.triggerHandler && (d(r).triggerHandler("ready"), d(r).off("ready"))));
    }
  });

  function H() {
    r.addEventListener ? (r.removeEventListener("DOMContentLoaded", q), e.removeEventListener("load", q)) : (r.detachEvent("onreadystatechange", q), e.detachEvent("onload", q));
  }

  function q() {
    (r.addEventListener || "load" === e.event.type || "complete" === r.readyState) && (H(), d.ready());
  }

  d.ready.promise = function (t) {
    if (!L) if (L = d.Deferred(), "complete" === r.readyState || "loading" !== r.readyState && !r.documentElement.doScroll) e.setTimeout(d.ready);else if (r.addEventListener) r.addEventListener("DOMContentLoaded", q), e.addEventListener("load", q);else {
      r.attachEvent("onreadystatechange", q), e.attachEvent("onload", q);
      var n = !1;

      try {
        n = null == e.frameElement && r.documentElement;
      } catch (e) {}

      n && n.doScroll && function t() {
        if (!d.isReady) {
          try {
            n.doScroll("left");
          } catch (n) {
            return e.setTimeout(t, 50);
          }

          H(), d.ready();
        }
      }();
    }
    return L.promise(t);
  }, d.ready.promise();

  var _;

  for (_ in d(f)) {
    break;
  }

  f.ownFirst = "0" === _, f.inlineBlockNeedsLayout = !1, d(function () {
    var e, t, n, i;
    (n = r.getElementsByTagName("body")[0]) && n.style && (t = r.createElement("div"), (i = r.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), void 0 !== t.style.zoom && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", f.inlineBlockNeedsLayout = e = 3 === t.offsetWidth, e && (n.style.zoom = 1)), n.removeChild(i));
  }), function () {
    var e = r.createElement("div");
    f.deleteExpando = !0;

    try {
      delete e.test;
    } catch (e) {
      f.deleteExpando = !1;
    }

    e = null;
  }();

  var F = function F(e) {
    var t = d.noData[(e.nodeName + " ").toLowerCase()],
        n = +e.nodeType || 1;
    return (1 === n || 9 === n) && (!t || !0 !== t && e.getAttribute("classid") === t);
  },
      M = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      O = /([A-Z])/g;

  function R(e, t, n) {
    if (void 0 === n && 1 === e.nodeType) {
      var r = "data-" + t.replace(O, "-$1").toLowerCase();

      if ("string" == typeof (n = e.getAttribute(r))) {
        try {
          n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : M.test(n) ? d.parseJSON(n) : n);
        } catch (e) {}

        d.data(e, t, n);
      } else n = void 0;
    }

    return n;
  }

  function P(e) {
    var t;

    for (t in e) {
      if (("data" !== t || !d.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
    }

    return !0;
  }

  function B(e, t, r, i) {
    if (F(e)) {
      var o,
          a,
          s = d.expando,
          u = e.nodeType,
          l = u ? d.cache : e,
          c = u ? e[s] : e[s] && s;
      if (c && l[c] && (i || l[c].data) || void 0 !== r || "string" != typeof t) return c || (c = u ? e[s] = n.pop() || d.guid++ : s), l[c] || (l[c] = u ? {} : {
        toJSON: d.noop
      }), "object" != _typeof(t) && "function" != typeof t || (i ? l[c] = d.extend(l[c], t) : l[c].data = d.extend(l[c].data, t)), a = l[c], i || (a.data || (a.data = {}), a = a.data), void 0 !== r && (a[d.camelCase(t)] = r), "string" == typeof t ? null == (o = a[t]) && (o = a[d.camelCase(t)]) : o = a, o;
    }
  }

  function W(e, t, n) {
    if (F(e)) {
      var r,
          i,
          o = e.nodeType,
          a = o ? d.cache : e,
          s = o ? e[d.expando] : d.expando;

      if (a[s]) {
        if (t && (r = n ? a[s] : a[s].data)) {
          i = (t = d.isArray(t) ? t.concat(d.map(t, d.camelCase)) : t in r ? [t] : (t = d.camelCase(t)) in r ? [t] : t.split(" ")).length;

          for (; i--;) {
            delete r[t[i]];
          }

          if (n ? !P(r) : !d.isEmptyObject(r)) return;
        }

        (n || (delete a[s].data, P(a[s]))) && (o ? d.cleanData([e], !0) : f.deleteExpando || a != a.window ? delete a[s] : a[s] = void 0);
      }
    }
  }

  d.extend({
    cache: {},
    noData: {
      "applet ": !0,
      "embed ": !0,
      "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
    },
    hasData: function hasData(e) {
      return !!(e = e.nodeType ? d.cache[e[d.expando]] : e[d.expando]) && !P(e);
    },
    data: function data(e, t, n) {
      return B(e, t, n);
    },
    removeData: function removeData(e, t) {
      return W(e, t);
    },
    _data: function _data(e, t, n) {
      return B(e, t, n, !0);
    },
    _removeData: function _removeData(e, t) {
      return W(e, t, !0);
    }
  }), d.fn.extend({
    data: function data(e, t) {
      var n,
          r,
          i,
          o = this[0],
          a = o && o.attributes;

      if (void 0 === e) {
        if (this.length && (i = d.data(o), 1 === o.nodeType && !d._data(o, "parsedAttrs"))) {
          for (n = a.length; n--;) {
            a[n] && 0 === (r = a[n].name).indexOf("data-") && R(o, r = d.camelCase(r.slice(5)), i[r]);
          }

          d._data(o, "parsedAttrs", !0);
        }

        return i;
      }

      return "object" == _typeof(e) ? this.each(function () {
        d.data(this, e);
      }) : arguments.length > 1 ? this.each(function () {
        d.data(this, e, t);
      }) : o ? R(o, e, d.data(o, e)) : void 0;
    },
    removeData: function removeData(e) {
      return this.each(function () {
        d.removeData(this, e);
      });
    }
  }), d.extend({
    queue: function queue(e, t, n) {
      var r;
      if (e) return t = (t || "fx") + "queue", r = d._data(e, t), n && (!r || d.isArray(n) ? r = d._data(e, t, d.makeArray(n)) : r.push(n)), r || [];
    },
    dequeue: function dequeue(e, t) {
      t = t || "fx";

      var n = d.queue(e, t),
          r = n.length,
          i = n.shift(),
          o = d._queueHooks(e, t);

      "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, function () {
        d.dequeue(e, t);
      }, o)), !r && o && o.empty.fire();
    },
    _queueHooks: function _queueHooks(e, t) {
      var n = t + "queueHooks";
      return d._data(e, n) || d._data(e, n, {
        empty: d.Callbacks("once memory").add(function () {
          d._removeData(e, t + "queue"), d._removeData(e, n);
        })
      });
    }
  }), d.fn.extend({
    queue: function queue(e, t) {
      var n = 2;
      return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? d.queue(this[0], e) : void 0 === t ? this : this.each(function () {
        var n = d.queue(this, e, t);
        d._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && d.dequeue(this, e);
      });
    },
    dequeue: function dequeue(e) {
      return this.each(function () {
        d.dequeue(this, e);
      });
    },
    clearQueue: function clearQueue(e) {
      return this.queue(e || "fx", []);
    },
    promise: function promise(e, t) {
      var n,
          r = 1,
          i = d.Deferred(),
          o = this,
          a = this.length,
          s = function s() {
        --r || i.resolveWith(o, [o]);
      };

      for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) {
        (n = d._data(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
      }

      return s(), i.promise(t);
    }
  }), function () {
    var e;

    f.shrinkWrapBlocks = function () {
      if (null != e) return e;
      e = !1;
      var t, n, i;
      return (n = r.getElementsByTagName("body")[0]) && n.style ? (t = r.createElement("div"), (i = r.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), void 0 !== t.style.zoom && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(r.createElement("div")).style.width = "5px", e = 3 !== t.offsetWidth), n.removeChild(i), e) : void 0;
    };
  }();

  var I = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      $ = new RegExp("^(?:([+-])=|)(" + I + ")([a-z%]*)$", "i"),
      z = ["Top", "Right", "Bottom", "Left"],
      X = function X(e, t) {
    return e = t || e, "none" === d.css(e, "display") || !d.contains(e.ownerDocument, e);
  };

  function U(e, t, n, r) {
    var i,
        o = 1,
        a = 20,
        s = r ? function () {
      return r.cur();
    } : function () {
      return d.css(e, t, "");
    },
        u = s(),
        l = n && n[3] || (d.cssNumber[t] ? "" : "px"),
        c = (d.cssNumber[t] || "px" !== l && +u) && $.exec(d.css(e, t));

    if (c && c[3] !== l) {
      l = l || c[3], n = n || [], c = +u || 1;

      do {
        c /= o = o || ".5", d.style(e, t, c + l);
      } while (o !== (o = s() / u) && 1 !== o && --a);
    }

    return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i;
  }

  var V = function V(e, t, n, r, i, o, a) {
    var s = 0,
        u = e.length,
        l = null == n;

    if ("object" === d.type(n)) {
      i = !0;

      for (s in n) {
        V(e, t, s, n[s], !0, o, a);
      }
    } else if (void 0 !== r && (i = !0, d.isFunction(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function t(e, _t2, n) {
      return l.call(d(e), n);
    })), t)) for (; s < u; s++) {
      t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
    }

    return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
  },
      Y = /^(?:checkbox|radio)$/i,
      J = /<([\w:-]+)/,
      G = /^$|\/(?:java|ecma)script/i,
      K = /^\s+/,
      Q = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";

  function Z(e) {
    var t = Q.split("|"),
        n = e.createDocumentFragment();
    if (n.createElement) for (; t.length;) {
      n.createElement(t.pop());
    }
    return n;
  }

  !function () {
    var e = r.createElement("div"),
        t = r.createDocumentFragment(),
        n = r.createElement("input");
    e.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", f.leadingWhitespace = 3 === e.firstChild.nodeType, f.tbody = !e.getElementsByTagName("tbody").length, f.htmlSerialize = !!e.getElementsByTagName("link").length, f.html5Clone = "<:nav></:nav>" !== r.createElement("nav").cloneNode(!0).outerHTML, n.type = "checkbox", n.checked = !0, t.appendChild(n), f.appendChecked = n.checked, e.innerHTML = "<textarea>x</textarea>", f.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue, t.appendChild(e), (n = r.createElement("input")).setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), e.appendChild(n), f.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, f.noCloneEvent = !!e.addEventListener, e[d.expando] = 1, f.attributes = !e.getAttribute(d.expando);
  }();
  var ee = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    legend: [1, "<fieldset>", "</fieldset>"],
    area: [1, "<map>", "</map>"],
    param: [1, "<object>", "</object>"],
    thead: [1, "<table>", "</table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: f.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
  };
  ee.optgroup = ee.option, ee.tbody = ee.tfoot = ee.colgroup = ee.caption = ee.thead, ee.th = ee.td;

  function te(e, t) {
    var n,
        r,
        i = 0,
        o = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : void 0;
    if (!o) for (o = [], n = e.childNodes || e; null != (r = n[i]); i++) {
      !t || d.nodeName(r, t) ? o.push(r) : d.merge(o, te(r, t));
    }
    return void 0 === t || t && d.nodeName(e, t) ? d.merge([e], o) : o;
  }

  function ne(e, t) {
    for (var n, r = 0; null != (n = e[r]); r++) {
      d._data(n, "globalEval", !t || d._data(t[r], "globalEval"));
    }
  }

  var re = /<|&#?\w+;/,
      ie = /<tbody/i;

  function oe(e) {
    Y.test(e.type) && (e.defaultChecked = e.checked);
  }

  function ae(e, t, n, r, i) {
    for (var o, a, s, u, l, c, p, h = e.length, g = Z(t), m = [], v = 0; v < h; v++) {
      if ((a = e[v]) || 0 === a) if ("object" === d.type(a)) d.merge(m, a.nodeType ? [a] : a);else if (re.test(a)) {
        for (u = u || g.appendChild(t.createElement("div")), l = (J.exec(a) || ["", ""])[1].toLowerCase(), p = ee[l] || ee._default, u.innerHTML = p[1] + d.htmlPrefilter(a) + p[2], o = p[0]; o--;) {
          u = u.lastChild;
        }

        if (!f.leadingWhitespace && K.test(a) && m.push(t.createTextNode(K.exec(a)[0])), !f.tbody) for (o = (a = "table" !== l || ie.test(a) ? "<table>" !== p[1] || ie.test(a) ? 0 : u : u.firstChild) && a.childNodes.length; o--;) {
          d.nodeName(c = a.childNodes[o], "tbody") && !c.childNodes.length && a.removeChild(c);
        }

        for (d.merge(m, u.childNodes), u.textContent = ""; u.firstChild;) {
          u.removeChild(u.firstChild);
        }

        u = g.lastChild;
      } else m.push(t.createTextNode(a));
    }

    for (u && g.removeChild(u), f.appendChecked || d.grep(te(m, "input"), oe), v = 0; a = m[v++];) {
      if (r && d.inArray(a, r) > -1) i && i.push(a);else if (s = d.contains(a.ownerDocument, a), u = te(g.appendChild(a), "script"), s && ne(u), n) for (o = 0; a = u[o++];) {
        G.test(a.type || "") && n.push(a);
      }
    }

    return u = null, g;
  }

  !function () {
    var t,
        n,
        i = r.createElement("div");

    for (t in {
      submit: !0,
      change: !0,
      focusin: !0
    }) {
      n = "on" + t, (f[t] = n in e) || (i.setAttribute(n, "t"), f[t] = !1 === i.attributes[n].expando);
    }

    i = null;
  }();
  var se = /^(?:input|select|textarea)$/i,
      ue = /^key/,
      le = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      ce = /^(?:focusinfocus|focusoutblur)$/,
      fe = /^([^.]*)(?:\.(.+)|)/;

  function de() {
    return !0;
  }

  function pe() {
    return !1;
  }

  function he() {
    try {
      return r.activeElement;
    } catch (e) {}
  }

  function ge(e, t, n, r, i, o) {
    var a, s;

    if ("object" == _typeof(t)) {
      "string" != typeof n && (r = r || n, n = void 0);

      for (s in t) {
        ge(e, s, n, r, t[s], o);
      }

      return e;
    }

    if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = pe;else if (!i) return e;
    return 1 === o && (a = i, (i = function i(e) {
      return d().off(e), a.apply(this, arguments);
    }).guid = a.guid || (a.guid = d.guid++)), e.each(function () {
      d.event.add(this, t, i, r, n);
    });
  }

  d.event = {
    global: {},
    add: function add(e, t, n, r, i) {
      var o,
          a,
          s,
          u,
          l,
          c,
          f,
          p,
          h,
          g,
          m,
          v = d._data(e);

      if (v) {
        for (n.handler && (n = (u = n).handler, i = u.selector), n.guid || (n.guid = d.guid++), (a = v.events) || (a = v.events = {}), (c = v.handle) || ((c = v.handle = function (e) {
          return void 0 === d || e && d.event.triggered === e.type ? void 0 : d.event.dispatch.apply(c.elem, arguments);
        }).elem = e), s = (t = (t || "").match(j) || [""]).length; s--;) {
          h = m = (o = fe.exec(t[s]) || [])[1], g = (o[2] || "").split(".").sort(), h && (l = d.event.special[h] || {}, h = (i ? l.delegateType : l.bindType) || h, l = d.event.special[h] || {}, f = d.extend({
            type: h,
            origType: m,
            data: r,
            handler: n,
            guid: n.guid,
            selector: i,
            needsContext: i && d.expr.match.needsContext.test(i),
            namespace: g.join(".")
          }, u), (p = a[h]) || ((p = a[h] = []).delegateCount = 0, l.setup && !1 !== l.setup.call(e, r, g, c) || (e.addEventListener ? e.addEventListener(h, c, !1) : e.attachEvent && e.attachEvent("on" + h, c))), l.add && (l.add.call(e, f), f.handler.guid || (f.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, f) : p.push(f), d.event.global[h] = !0);
        }

        e = null;
      }
    },
    remove: function remove(e, t, n, r, i) {
      var o,
          a,
          s,
          u,
          l,
          c,
          f,
          p,
          h,
          g,
          m,
          v = d.hasData(e) && d._data(e);

      if (v && (c = v.events)) {
        for (l = (t = (t || "").match(j) || [""]).length; l--;) {
          if (h = m = (s = fe.exec(t[l]) || [])[1], g = (s[2] || "").split(".").sort(), h) {
            for (f = d.event.special[h] || {}, p = c[h = (r ? f.delegateType : f.bindType) || h] || [], s = s[2] && new RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)"), u = o = p.length; o--;) {
              a = p[o], !i && m !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (p.splice(o, 1), a.selector && p.delegateCount--, f.remove && f.remove.call(e, a));
            }

            u && !p.length && (f.teardown && !1 !== f.teardown.call(e, g, v.handle) || d.removeEvent(e, h, v.handle), delete c[h]);
          } else for (h in c) {
            d.event.remove(e, h + t[l], n, r, !0);
          }
        }

        d.isEmptyObject(c) && (delete v.handle, d._removeData(e, "events"));
      }
    },
    trigger: function trigger(t, n, i, o) {
      var a,
          s,
          u,
          l,
          f,
          p,
          h,
          g = [i || r],
          m = c.call(t, "type") ? t.type : t,
          v = c.call(t, "namespace") ? t.namespace.split(".") : [];

      if (u = p = i = i || r, 3 !== i.nodeType && 8 !== i.nodeType && !ce.test(m + d.event.triggered) && (m.indexOf(".") > -1 && (m = (v = m.split(".")).shift(), v.sort()), s = m.indexOf(":") < 0 && "on" + m, (t = t[d.expando] ? t : new d.Event(m, "object" == _typeof(t) && t)).isTrigger = o ? 2 : 3, t.namespace = v.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : d.makeArray(n, [t]), f = d.event.special[m] || {}, o || !f.trigger || !1 !== f.trigger.apply(i, n))) {
        if (!o && !f.noBubble && !d.isWindow(i)) {
          for (l = f.delegateType || m, ce.test(l + m) || (u = u.parentNode); u; u = u.parentNode) {
            g.push(u), p = u;
          }

          p === (i.ownerDocument || r) && g.push(p.defaultView || p.parentWindow || e);
        }

        for (h = 0; (u = g[h++]) && !t.isPropagationStopped();) {
          t.type = h > 1 ? l : f.bindType || m, (a = (d._data(u, "events") || {})[t.type] && d._data(u, "handle")) && a.apply(u, n), (a = s && u[s]) && a.apply && F(u) && (t.result = a.apply(u, n), !1 === t.result && t.preventDefault());
        }

        if (t.type = m, !o && !t.isDefaultPrevented() && (!f._default || !1 === f._default.apply(g.pop(), n)) && F(i) && s && i[m] && !d.isWindow(i)) {
          (p = i[s]) && (i[s] = null), d.event.triggered = m;

          try {
            i[m]();
          } catch (e) {}

          d.event.triggered = void 0, p && (i[s] = p);
        }

        return t.result;
      }
    },
    dispatch: function dispatch(e) {
      e = d.event.fix(e);
      var t,
          n,
          r,
          o,
          a,
          s = [],
          u = i.call(arguments),
          l = (d._data(this, "events") || {})[e.type] || [],
          c = d.event.special[e.type] || {};

      if (u[0] = e, e.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, e)) {
        for (s = d.event.handlers.call(this, e, l), t = 0; (o = s[t++]) && !e.isPropagationStopped();) {
          for (e.currentTarget = o.elem, n = 0; (a = o.handlers[n++]) && !e.isImmediatePropagationStopped();) {
            e.rnamespace && !e.rnamespace.test(a.namespace) || (e.handleObj = a, e.data = a.data, void 0 !== (r = ((d.event.special[a.origType] || {}).handle || a.handler).apply(o.elem, u)) && !1 === (e.result = r) && (e.preventDefault(), e.stopPropagation()));
          }
        }

        return c.postDispatch && c.postDispatch.call(this, e), e.result;
      }
    },
    handlers: function handlers(e, t) {
      var n,
          r,
          i,
          o,
          a = [],
          s = t.delegateCount,
          u = e.target;
      if (s && u.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1)) for (; u != this; u = u.parentNode || this) {
        if (1 === u.nodeType && (!0 !== u.disabled || "click" !== e.type)) {
          for (r = [], n = 0; n < s; n++) {
            void 0 === r[i = (o = t[n]).selector + " "] && (r[i] = o.needsContext ? d(i, this).index(u) > -1 : d.find(i, this, null, [u]).length), r[i] && r.push(o);
          }

          r.length && a.push({
            elem: u,
            handlers: r
          });
        }
      }
      return s < t.length && a.push({
        elem: this,
        handlers: t.slice(s)
      }), a;
    },
    fix: function fix(e) {
      if (e[d.expando]) return e;
      var t,
          n,
          i,
          o = e.type,
          a = e,
          s = this.fixHooks[o];

      for (s || (this.fixHooks[o] = s = le.test(o) ? this.mouseHooks : ue.test(o) ? this.keyHooks : {}), i = s.props ? this.props.concat(s.props) : this.props, e = new d.Event(a), t = i.length; t--;) {
        e[n = i[t]] = a[n];
      }

      return e.target || (e.target = a.srcElement || r), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, a) : e;
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function filter(e, t) {
        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e;
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function filter(e, t) {
        var n,
            i,
            o,
            a = t.button,
            s = t.fromElement;
        return null == e.pageX && null != t.clientX && (o = (i = e.target.ownerDocument || r).documentElement, n = i.body, e.pageX = t.clientX + (o && o.scrollLeft || n && n.scrollLeft || 0) - (o && o.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (o && o.scrollTop || n && n.scrollTop || 0) - (o && o.clientTop || n && n.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? t.toElement : s), e.which || void 0 === a || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e;
      }
    },
    special: {
      load: {
        noBubble: !0
      },
      focus: {
        trigger: function trigger() {
          if (this !== he() && this.focus) try {
            return this.focus(), !1;
          } catch (e) {}
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function trigger() {
          if (this === he() && this.blur) return this.blur(), !1;
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function trigger() {
          if (d.nodeName(this, "input") && "checkbox" === this.type && this.click) return this.click(), !1;
        },
        _default: function _default(e) {
          return d.nodeName(e.target, "a");
        }
      },
      beforeunload: {
        postDispatch: function postDispatch(e) {
          void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
        }
      }
    },
    simulate: function simulate(e, t, n) {
      var r = d.extend(new d.Event(), n, {
        type: e,
        isSimulated: !0
      });
      d.event.trigger(r, null, t), r.isDefaultPrevented() && n.preventDefault();
    }
  }, d.removeEvent = r.removeEventListener ? function (e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n);
  } : function (e, t, n) {
    var r = "on" + t;
    e.detachEvent && (void 0 === e[r] && (e[r] = null), e.detachEvent(r, n));
  }, d.Event = function (e, t) {
    if (!(this instanceof d.Event)) return new d.Event(e, t);
    e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? de : pe) : this.type = e, t && d.extend(this, t), this.timeStamp = e && e.timeStamp || d.now(), this[d.expando] = !0;
  }, d.Event.prototype = {
    constructor: d.Event,
    isDefaultPrevented: pe,
    isPropagationStopped: pe,
    isImmediatePropagationStopped: pe,
    preventDefault: function preventDefault() {
      var e = this.originalEvent;
      this.isDefaultPrevented = de, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1);
    },
    stopPropagation: function stopPropagation() {
      var e = this.originalEvent;
      this.isPropagationStopped = de, e && !this.isSimulated && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0);
    },
    stopImmediatePropagation: function stopImmediatePropagation() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = de, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation();
    }
  }, d.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (e, t) {
    d.event.special[e] = {
      delegateType: t,
      bindType: t,
      handle: function handle(e) {
        var n,
            r = e.relatedTarget,
            i = e.handleObj;
        return r && (r === this || d.contains(this, r)) || (e.type = i.origType, n = i.handler.apply(this, arguments), e.type = t), n;
      }
    };
  }), f.submit || (d.event.special.submit = {
    setup: function setup() {
      if (d.nodeName(this, "form")) return !1;
      d.event.add(this, "click._submit keypress._submit", function (e) {
        var t = e.target,
            n = d.nodeName(t, "input") || d.nodeName(t, "button") ? d.prop(t, "form") : void 0;
        n && !d._data(n, "submit") && (d.event.add(n, "submit._submit", function (e) {
          e._submitBubble = !0;
        }), d._data(n, "submit", !0));
      });
    },
    postDispatch: function postDispatch(e) {
      e._submitBubble && (delete e._submitBubble, this.parentNode && !e.isTrigger && d.event.simulate("submit", this.parentNode, e));
    },
    teardown: function teardown() {
      if (d.nodeName(this, "form")) return !1;
      d.event.remove(this, "._submit");
    }
  }), f.change || (d.event.special.change = {
    setup: function setup() {
      if (se.test(this.nodeName)) return "checkbox" !== this.type && "radio" !== this.type || (d.event.add(this, "propertychange._change", function (e) {
        "checked" === e.originalEvent.propertyName && (this._justChanged = !0);
      }), d.event.add(this, "click._change", function (e) {
        this._justChanged && !e.isTrigger && (this._justChanged = !1), d.event.simulate("change", this, e);
      })), !1;
      d.event.add(this, "beforeactivate._change", function (e) {
        var t = e.target;
        se.test(t.nodeName) && !d._data(t, "change") && (d.event.add(t, "change._change", function (e) {
          !this.parentNode || e.isSimulated || e.isTrigger || d.event.simulate("change", this.parentNode, e);
        }), d._data(t, "change", !0));
      });
    },
    handle: function handle(e) {
      var t = e.target;
      if (this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type) return e.handleObj.handler.apply(this, arguments);
    },
    teardown: function teardown() {
      return d.event.remove(this, "._change"), !se.test(this.nodeName);
    }
  }), f.focusin || d.each({
    focus: "focusin",
    blur: "focusout"
  }, function (e, t) {
    var n = function n(e) {
      d.event.simulate(t, e.target, d.event.fix(e));
    };

    d.event.special[t] = {
      setup: function setup() {
        var r = this.ownerDocument || this,
            i = d._data(r, t);

        i || r.addEventListener(e, n, !0), d._data(r, t, (i || 0) + 1);
      },
      teardown: function teardown() {
        var r = this.ownerDocument || this,
            i = d._data(r, t) - 1;
        i ? d._data(r, t, i) : (r.removeEventListener(e, n, !0), d._removeData(r, t));
      }
    };
  }), d.fn.extend({
    on: function on(e, t, n, r) {
      return ge(this, e, t, n, r);
    },
    one: function one(e, t, n, r) {
      return ge(this, e, t, n, r, 1);
    },
    off: function off(e, t, n) {
      var r, i;
      if (e && e.preventDefault && e.handleObj) return r = e.handleObj, d(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;

      if ("object" == _typeof(e)) {
        for (i in e) {
          this.off(i, t, e[i]);
        }

        return this;
      }

      return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = pe), this.each(function () {
        d.event.remove(this, e, n, t);
      });
    },
    trigger: function trigger(e, t) {
      return this.each(function () {
        d.event.trigger(e, t, this);
      });
    },
    triggerHandler: function triggerHandler(e, t) {
      var n = this[0];
      if (n) return d.event.trigger(e, t, n, !0);
    }
  });
  var me = / jQuery\d+="(?:null|\d+)"/g,
      ve = new RegExp("<(?:" + Q + ")[\\s/>]", "i"),
      ye = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
      xe = /<script|<style|<link/i,
      be = /checked\s*(?:[^=]|=\s*.checked.)/i,
      we = /^true\/(.*)/,
      Te = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
      Ce = Z(r).appendChild(r.createElement("div"));

  function Ee(e, t) {
    return d.nodeName(e, "table") && d.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
  }

  function Ne(e) {
    return e.type = (null !== d.find.attr(e, "type")) + "/" + e.type, e;
  }

  function ke(e) {
    var t = we.exec(e.type);
    return t ? e.type = t[1] : e.removeAttribute("type"), e;
  }

  function Se(e, t) {
    if (1 === t.nodeType && d.hasData(e)) {
      var n,
          r,
          i,
          o = d._data(e),
          a = d._data(t, o),
          s = o.events;

      if (s) {
        delete a.handle, a.events = {};

        for (n in s) {
          for (r = 0, i = s[n].length; r < i; r++) {
            d.event.add(t, n, s[n][r]);
          }
        }
      }

      a.data && (a.data = d.extend({}, a.data));
    }
  }

  function Ae(e, t) {
    var n, r, i;

    if (1 === t.nodeType) {
      if (n = t.nodeName.toLowerCase(), !f.noCloneEvent && t[d.expando]) {
        i = d._data(t);

        for (r in i.events) {
          d.removeEvent(t, r, i.handle);
        }

        t.removeAttribute(d.expando);
      }

      "script" === n && t.text !== e.text ? (Ne(t).text = e.text, ke(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), f.html5Clone && e.innerHTML && !d.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Y.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue);
    }
  }

  function De(e, t, n, r) {
    t = o.apply([], t);
    var i,
        a,
        s,
        u,
        l,
        c,
        p = 0,
        h = e.length,
        g = h - 1,
        m = t[0],
        v = d.isFunction(m);
    if (v || h > 1 && "string" == typeof m && !f.checkClone && be.test(m)) return e.each(function (i) {
      var o = e.eq(i);
      v && (t[0] = m.call(this, i, o.html())), De(o, t, n, r);
    });

    if (h && (i = (c = ae(t, e[0].ownerDocument, !1, e, r)).firstChild, 1 === c.childNodes.length && (c = i), i || r)) {
      for (s = (u = d.map(te(c, "script"), Ne)).length; p < h; p++) {
        a = c, p !== g && (a = d.clone(a, !0, !0), s && d.merge(u, te(a, "script"))), n.call(e[p], a, p);
      }

      if (s) for (l = u[u.length - 1].ownerDocument, d.map(u, ke), p = 0; p < s; p++) {
        a = u[p], G.test(a.type || "") && !d._data(a, "globalEval") && d.contains(l, a) && (a.src ? d._evalUrl && d._evalUrl(a.src) : d.globalEval((a.text || a.textContent || a.innerHTML || "").replace(Te, "")));
      }
      c = i = null;
    }

    return e;
  }

  function je(e, t, n) {
    for (var r, i = t ? d.filter(t, e) : e, o = 0; null != (r = i[o]); o++) {
      n || 1 !== r.nodeType || d.cleanData(te(r)), r.parentNode && (n && d.contains(r.ownerDocument, r) && ne(te(r, "script")), r.parentNode.removeChild(r));
    }

    return e;
  }

  d.extend({
    htmlPrefilter: function htmlPrefilter(e) {
      return e.replace(ye, "<$1></$2>");
    },
    clone: function clone(e, t, n) {
      var r,
          i,
          o,
          a,
          s,
          u = d.contains(e.ownerDocument, e);
      if (f.html5Clone || d.isXMLDoc(e) || !ve.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (Ce.innerHTML = e.outerHTML, Ce.removeChild(o = Ce.firstChild)), !(f.noCloneEvent && f.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || d.isXMLDoc(e))) for (r = te(o), s = te(e), a = 0; null != (i = s[a]); ++a) {
        r[a] && Ae(i, r[a]);
      }
      if (t) if (n) for (s = s || te(e), r = r || te(o), a = 0; null != (i = s[a]); a++) {
        Se(i, r[a]);
      } else Se(e, o);
      return (r = te(o, "script")).length > 0 && ne(r, !u && te(e, "script")), r = s = i = null, o;
    },
    cleanData: function cleanData(e, t) {
      for (var r, i, o, a, s = 0, u = d.expando, l = d.cache, c = f.attributes, p = d.event.special; null != (r = e[s]); s++) {
        if ((t || F(r)) && (a = (o = r[u]) && l[o])) {
          if (a.events) for (i in a.events) {
            p[i] ? d.event.remove(r, i) : d.removeEvent(r, i, a.handle);
          }
          l[o] && (delete l[o], c || void 0 === r.removeAttribute ? r[u] = void 0 : r.removeAttribute(u), n.push(o));
        }
      }
    }
  }), d.fn.extend({
    domManip: De,
    detach: function detach(e) {
      return je(this, e, !0);
    },
    remove: function remove(e) {
      return je(this, e);
    },
    text: function text(e) {
      return V(this, function (e) {
        return void 0 === e ? d.text(this) : this.empty().append((this[0] && this[0].ownerDocument || r).createTextNode(e));
      }, null, e, arguments.length);
    },
    append: function append() {
      return De(this, arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          Ee(this, e).appendChild(e);
        }
      });
    },
    prepend: function prepend() {
      return De(this, arguments, function (e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = Ee(this, e);
          t.insertBefore(e, t.firstChild);
        }
      });
    },
    before: function before() {
      return De(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this);
      });
    },
    after: function after() {
      return De(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
      });
    },
    empty: function empty() {
      for (var e, t = 0; null != (e = this[t]); t++) {
        for (1 === e.nodeType && d.cleanData(te(e, !1)); e.firstChild;) {
          e.removeChild(e.firstChild);
        }

        e.options && d.nodeName(e, "select") && (e.options.length = 0);
      }

      return this;
    },
    clone: function clone(e, t) {
      return e = null != e && e, t = null == t ? e : t, this.map(function () {
        return d.clone(this, e, t);
      });
    },
    html: function html(e) {
      return V(this, function (e) {
        var t = this[0] || {},
            n = 0,
            r = this.length;
        if (void 0 === e) return 1 === t.nodeType ? t.innerHTML.replace(me, "") : void 0;

        if ("string" == typeof e && !xe.test(e) && (f.htmlSerialize || !ve.test(e)) && (f.leadingWhitespace || !K.test(e)) && !ee[(J.exec(e) || ["", ""])[1].toLowerCase()]) {
          e = d.htmlPrefilter(e);

          try {
            for (; n < r; n++) {
              1 === (t = this[n] || {}).nodeType && (d.cleanData(te(t, !1)), t.innerHTML = e);
            }

            t = 0;
          } catch (e) {}
        }

        t && this.empty().append(e);
      }, null, e, arguments.length);
    },
    replaceWith: function replaceWith() {
      var e = [];
      return De(this, arguments, function (t) {
        var n = this.parentNode;
        d.inArray(this, e) < 0 && (d.cleanData(te(this)), n && n.replaceChild(t, this));
      }, e);
    }
  }), d.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (e, t) {
    d.fn[e] = function (e) {
      for (var n, r = 0, i = [], o = d(e), s = o.length - 1; r <= s; r++) {
        n = r === s ? this : this.clone(!0), d(o[r])[t](n), a.apply(i, n.get());
      }

      return this.pushStack(i);
    };
  });
  var Le,
      He = {
    HTML: "block",
    BODY: "block"
  };

  function qe(e, t) {
    var n = d(t.createElement(e)).appendTo(t.body),
        r = d.css(n[0], "display");
    return n.detach(), r;
  }

  function _e(e) {
    var t = r,
        n = He[e];
    return n || ("none" !== (n = qe(e, t)) && n || ((t = ((Le = (Le || d("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement))[0].contentWindow || Le[0].contentDocument).document).write(), t.close(), n = qe(e, t), Le.detach()), He[e] = n), n;
  }

  var Fe = /^margin/,
      Me = new RegExp("^(" + I + ")(?!px)[a-z%]+$", "i"),
      Oe = function Oe(e, t, n, r) {
    var i,
        o,
        a = {};

    for (o in t) {
      a[o] = e.style[o], e.style[o] = t[o];
    }

    i = n.apply(e, r || []);

    for (o in t) {
      e.style[o] = a[o];
    }

    return i;
  },
      Re = r.documentElement;

  !function () {
    var t,
        n,
        i,
        o,
        a,
        s,
        u = r.createElement("div"),
        l = r.createElement("div");
    l.style && (l.style.cssText = "float:left;opacity:.5", f.opacity = "0.5" === l.style.opacity, f.cssFloat = !!l.style.cssFloat, l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", f.clearCloneStyle = "content-box" === l.style.backgroundClip, (u = r.createElement("div")).style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", l.innerHTML = "", u.appendChild(l), f.boxSizing = "" === l.style.boxSizing || "" === l.style.MozBoxSizing || "" === l.style.WebkitBoxSizing, d.extend(f, {
      reliableHiddenOffsets: function reliableHiddenOffsets() {
        return null == t && c(), o;
      },
      boxSizingReliable: function boxSizingReliable() {
        return null == t && c(), i;
      },
      pixelMarginRight: function pixelMarginRight() {
        return null == t && c(), n;
      },
      pixelPosition: function pixelPosition() {
        return null == t && c(), t;
      },
      reliableMarginRight: function reliableMarginRight() {
        return null == t && c(), a;
      },
      reliableMarginLeft: function reliableMarginLeft() {
        return null == t && c(), s;
      }
    }));

    function c() {
      var c,
          f,
          d = r.documentElement;
      d.appendChild(u), l.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", t = i = s = !1, n = a = !0, e.getComputedStyle && (f = e.getComputedStyle(l), t = "1%" !== (f || {}).top, s = "2px" === (f || {}).marginLeft, i = "4px" === (f || {
        width: "4px"
      }).width, l.style.marginRight = "50%", n = "4px" === (f || {
        marginRight: "4px"
      }).marginRight, (c = l.appendChild(r.createElement("div"))).style.cssText = l.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", c.style.marginRight = c.style.width = "0", l.style.width = "1px", a = !parseFloat((e.getComputedStyle(c) || {}).marginRight), l.removeChild(c)), l.style.display = "none", (o = 0 === l.getClientRects().length) && (l.style.display = "", l.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", (c = l.getElementsByTagName("td"))[0].style.cssText = "margin:0;border:0;padding:0;display:none", (o = 0 === c[0].offsetHeight) && (c[0].style.display = "", c[1].style.display = "none", o = 0 === c[0].offsetHeight)), d.removeChild(u);
    }
  }();
  var Pe,
      Be,
      We = /^(top|right|bottom|left)$/;
  e.getComputedStyle ? (Pe = function Pe(t) {
    var n = t.ownerDocument.defaultView;
    return n && n.opener || (n = e), n.getComputedStyle(t);
  }, Be = function Be(e, t, n) {
    var r,
        i,
        o,
        a,
        s = e.style;
    return "" !== (a = (n = n || Pe(e)) ? n.getPropertyValue(t) || n[t] : void 0) && void 0 !== a || d.contains(e.ownerDocument, e) || (a = d.style(e, t)), n && !f.pixelMarginRight() && Me.test(a) && Fe.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o), void 0 === a ? a : a + "";
  }) : Re.currentStyle && (Pe = function Pe(e) {
    return e.currentStyle;
  }, Be = function Be(e, t, n) {
    var r,
        i,
        o,
        a,
        s = e.style;
    return null == (a = (n = n || Pe(e)) ? n[t] : void 0) && s && s[t] && (a = s[t]), Me.test(a) && !We.test(t) && (r = s.left, (o = (i = e.runtimeStyle) && i.left) && (i.left = e.currentStyle.left), s.left = "fontSize" === t ? "1em" : a, a = s.pixelLeft + "px", s.left = r, o && (i.left = o)), void 0 === a ? a : a + "" || "auto";
  });

  function Ie(e, t) {
    return {
      get: function get() {
        if (!e()) return (this.get = t).apply(this, arguments);
        delete this.get;
      }
    };
  }

  var $e = /alpha\([^)]*\)/i,
      ze = /opacity\s*=\s*([^)]*)/i,
      Xe = /^(none|table(?!-c[ea]).+)/,
      Ue = new RegExp("^(" + I + ")(.*)$", "i"),
      Ve = {
    position: "absolute",
    visibility: "hidden",
    display: "block"
  },
      Ye = {
    letterSpacing: "0",
    fontWeight: "400"
  },
      Je = ["Webkit", "O", "Moz", "ms"],
      Ge = r.createElement("div").style;

  function Ke(e) {
    if (e in Ge) return e;

    for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = Je.length; n--;) {
      if ((e = Je[n] + t) in Ge) return e;
    }
  }

  function Qe(e, t) {
    for (var n, r, i, o = [], a = 0, s = e.length; a < s; a++) {
      (r = e[a]).style && (o[a] = d._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && X(r) && (o[a] = d._data(r, "olddisplay", _e(r.nodeName)))) : (i = X(r), (n && "none" !== n || !i) && d._data(r, "olddisplay", i ? n : d.css(r, "display"))));
    }

    for (a = 0; a < s; a++) {
      (r = e[a]).style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
    }

    return e;
  }

  function Ze(e, t, n) {
    var r = Ue.exec(t);
    return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t;
  }

  function et(e, t, n, r, i) {
    for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; o < 4; o += 2) {
      "margin" === n && (a += d.css(e, n + z[o], !0, i)), r ? ("content" === n && (a -= d.css(e, "padding" + z[o], !0, i)), "margin" !== n && (a -= d.css(e, "border" + z[o] + "Width", !0, i))) : (a += d.css(e, "padding" + z[o], !0, i), "padding" !== n && (a += d.css(e, "border" + z[o] + "Width", !0, i)));
    }

    return a;
  }

  function tt(t, n, i) {
    var o = !0,
        a = "width" === n ? t.offsetWidth : t.offsetHeight,
        s = Pe(t),
        u = f.boxSizing && "border-box" === d.css(t, "boxSizing", !1, s);

    if (r.msFullscreenElement && e.top !== e && t.getClientRects().length && (a = Math.round(100 * t.getBoundingClientRect()[n])), a <= 0 || null == a) {
      if (((a = Be(t, n, s)) < 0 || null == a) && (a = t.style[n]), Me.test(a)) return a;
      o = u && (f.boxSizingReliable() || a === t.style[n]), a = parseFloat(a) || 0;
    }

    return a + et(t, n, i || (u ? "border" : "content"), o, s) + "px";
  }

  d.extend({
    cssHooks: {
      opacity: {
        get: function get(e, t) {
          if (t) {
            var n = Be(e, "opacity");
            return "" === n ? "1" : n;
          }
        }
      }
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      "float": f.cssFloat ? "cssFloat" : "styleFloat"
    },
    style: function style(e, t, n, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var i,
            o,
            a,
            s = d.camelCase(t),
            u = e.style;
        if (t = d.cssProps[s] || (d.cssProps[s] = Ke(s) || s), a = d.cssHooks[t] || d.cssHooks[s], void 0 === n) return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : u[t];
        if ("string" === (o = _typeof(n)) && (i = $.exec(n)) && i[1] && (n = U(e, t, i), o = "number"), null != n && n == n && ("number" === o && (n += i && i[3] || (d.cssNumber[s] ? "" : "px")), f.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), !(a && "set" in a && void 0 === (n = a.set(e, n, r))))) try {
          u[t] = n;
        } catch (e) {}
      }
    },
    css: function css(e, t, n, r) {
      var i,
          o,
          a,
          s = d.camelCase(t);
      return t = d.cssProps[s] || (d.cssProps[s] = Ke(s) || s), (a = d.cssHooks[t] || d.cssHooks[s]) && "get" in a && (o = a.get(e, !0, n)), void 0 === o && (o = Be(e, t, r)), "normal" === o && t in Ye && (o = Ye[t]), "" === n || n ? (i = parseFloat(o), !0 === n || isFinite(i) ? i || 0 : o) : o;
    }
  }), d.each(["height", "width"], function (e, t) {
    d.cssHooks[t] = {
      get: function get(e, n, r) {
        if (n) return Xe.test(d.css(e, "display")) && 0 === e.offsetWidth ? Oe(e, Ve, function () {
          return tt(e, t, r);
        }) : tt(e, t, r);
      },
      set: function set(e, n, r) {
        var i = r && Pe(e);
        return Ze(0, n, r ? et(e, t, r, f.boxSizing && "border-box" === d.css(e, "boxSizing", !1, i), i) : 0);
      }
    };
  }), f.opacity || (d.cssHooks.opacity = {
    get: function get(e, t) {
      return ze.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : "";
    },
    set: function set(e, t) {
      var n = e.style,
          r = e.currentStyle,
          i = d.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
          o = r && r.filter || n.filter || "";
      n.zoom = 1, (t >= 1 || "" === t) && "" === d.trim(o.replace($e, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = $e.test(o) ? o.replace($e, i) : o + " " + i);
    }
  }), d.cssHooks.marginRight = Ie(f.reliableMarginRight, function (e, t) {
    if (t) return Oe(e, {
      display: "inline-block"
    }, Be, [e, "marginRight"]);
  }), d.cssHooks.marginLeft = Ie(f.reliableMarginLeft, function (e, t) {
    if (t) return (parseFloat(Be(e, "marginLeft")) || (d.contains(e.ownerDocument, e) ? e.getBoundingClientRect().left - Oe(e, {
      marginLeft: 0
    }, function () {
      return e.getBoundingClientRect().left;
    }) : 0)) + "px";
  }), d.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function (e, t) {
    d.cssHooks[e + t] = {
      expand: function expand(n) {
        for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++) {
          i[e + z[r] + t] = o[r] || o[r - 2] || o[0];
        }

        return i;
      }
    }, Fe.test(e) || (d.cssHooks[e + t].set = Ze);
  }), d.fn.extend({
    css: function css(e, t) {
      return V(this, function (e, t, n) {
        var r,
            i,
            o = {},
            a = 0;

        if (d.isArray(t)) {
          for (r = Pe(e), i = t.length; a < i; a++) {
            o[t[a]] = d.css(e, t[a], !1, r);
          }

          return o;
        }

        return void 0 !== n ? d.style(e, t, n) : d.css(e, t);
      }, e, t, arguments.length > 1);
    },
    show: function show() {
      return Qe(this, !0);
    },
    hide: function hide() {
      return Qe(this);
    },
    toggle: function toggle(e) {
      return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
        X(this) ? d(this).show() : d(this).hide();
      });
    }
  });

  function nt(e, t, n, r, i) {
    return new nt.prototype.init(e, t, n, r, i);
  }

  d.Tween = nt, nt.prototype = {
    constructor: nt,
    init: function init(e, t, n, r, i, o) {
      this.elem = e, this.prop = n, this.easing = i || d.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (d.cssNumber[n] ? "" : "px");
    },
    cur: function cur() {
      var e = nt.propHooks[this.prop];
      return e && e.get ? e.get(this) : nt.propHooks._default.get(this);
    },
    run: function run(e) {
      var t,
          n = nt.propHooks[this.prop];
      return this.options.duration ? this.pos = t = d.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : nt.propHooks._default.set(this), this;
    }
  }, nt.prototype.init.prototype = nt.prototype, nt.propHooks = {
    _default: {
      get: function get(e) {
        var t;
        return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = d.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0;
      },
      set: function set(e) {
        d.fx.step[e.prop] ? d.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[d.cssProps[e.prop]] && !d.cssHooks[e.prop] ? e.elem[e.prop] = e.now : d.style(e.elem, e.prop, e.now + e.unit);
      }
    }
  }, nt.propHooks.scrollTop = nt.propHooks.scrollLeft = {
    set: function set(e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
    }
  }, d.easing = {
    linear: function linear(e) {
      return e;
    },
    swing: function swing(e) {
      return .5 - Math.cos(e * Math.PI) / 2;
    },
    _default: "swing"
  }, d.fx = nt.prototype.init, d.fx.step = {};
  var rt,
      it,
      ot = /^(?:toggle|show|hide)$/,
      at = /queueHooks$/;

  function st() {
    return e.setTimeout(function () {
      rt = void 0;
    }), rt = d.now();
  }

  function ut(e, t) {
    var n,
        r = {
      height: e
    },
        i = 0;

    for (t = t ? 1 : 0; i < 4; i += 2 - t) {
      r["margin" + (n = z[i])] = r["padding" + n] = e;
    }

    return t && (r.opacity = r.width = e), r;
  }

  function lt(e, t, n) {
    for (var r, i = (ct.tweeners[t] || []).concat(ct.tweeners["*"]), o = 0, a = i.length; o < a; o++) {
      if (r = i[o].call(n, t, e)) return r;
    }
  }

  function ct(e, t, n) {
    var r,
        i,
        o = 0,
        a = ct.prefilters.length,
        s = d.Deferred().always(function () {
      delete u.elem;
    }),
        u = function u() {
      if (i) return !1;

      for (var t = rt || st(), n = Math.max(0, l.startTime + l.duration - t), r = 1 - (n / l.duration || 0), o = 0, a = l.tweens.length; o < a; o++) {
        l.tweens[o].run(r);
      }

      return s.notifyWith(e, [l, r, n]), r < 1 && a ? n : (s.resolveWith(e, [l]), !1);
    },
        l = s.promise({
      elem: e,
      props: d.extend({}, t),
      opts: d.extend(!0, {
        specialEasing: {},
        easing: d.easing._default
      }, n),
      originalProperties: t,
      originalOptions: n,
      startTime: rt || st(),
      duration: n.duration,
      tweens: [],
      createTween: function createTween(t, n) {
        var r = d.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
        return l.tweens.push(r), r;
      },
      stop: function stop(t) {
        var n = 0,
            r = t ? l.tweens.length : 0;
        if (i) return this;

        for (i = !0; n < r; n++) {
          l.tweens[n].run(1);
        }

        return t ? (s.notifyWith(e, [l, 1, 0]), s.resolveWith(e, [l, t])) : s.rejectWith(e, [l, t]), this;
      }
    }),
        c = l.props;

    for (!function (e, t) {
      var n, r, i, o, a;

      for (n in e) {
        if (i = t[r = d.camelCase(n)], o = e[n], d.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = d.cssHooks[r]) && ("expand" in a)) {
          o = a.expand(o), delete e[r];

          for (n in o) {
            (n in e) || (e[n] = o[n], t[n] = i);
          }
        } else t[r] = i;
      }
    }(c, l.opts.specialEasing); o < a; o++) {
      if (r = ct.prefilters[o].call(l, e, c, l.opts)) return d.isFunction(r.stop) && (d._queueHooks(l.elem, l.opts.queue).stop = d.proxy(r.stop, r)), r;
    }

    return d.map(c, lt, l), d.isFunction(l.opts.start) && l.opts.start.call(e, l), d.fx.timer(d.extend(u, {
      elem: e,
      anim: l,
      queue: l.opts.queue
    })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always);
  }

  d.Animation = d.extend(ct, {
    tweeners: {
      "*": [function (e, t) {
        var n = this.createTween(e, t);
        return U(n.elem, e, $.exec(t), n), n;
      }]
    },
    tweener: function tweener(e, t) {
      d.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(j);

      for (var n, r = 0, i = e.length; r < i; r++) {
        n = e[r], ct.tweeners[n] = ct.tweeners[n] || [], ct.tweeners[n].unshift(t);
      }
    },
    prefilters: [function (e, t, n) {
      var r,
          i,
          o,
          a,
          s,
          u,
          l,
          c = this,
          p = {},
          h = e.style,
          g = e.nodeType && X(e),
          m = d._data(e, "fxshow");

      n.queue || (null == (s = d._queueHooks(e, "fx")).unqueued && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function () {
        s.unqueued || u();
      }), s.unqueued++, c.always(function () {
        c.always(function () {
          s.unqueued--, d.queue(e, "fx").length || s.empty.fire();
        });
      })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [h.overflow, h.overflowX, h.overflowY], "inline" === ("none" === (l = d.css(e, "display")) ? d._data(e, "olddisplay") || _e(e.nodeName) : l) && "none" === d.css(e, "float") && (f.inlineBlockNeedsLayout && "inline" !== _e(e.nodeName) ? h.zoom = 1 : h.display = "inline-block")), n.overflow && (h.overflow = "hidden", f.shrinkWrapBlocks() || c.always(function () {
        h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2];
      }));

      for (r in t) {
        if (i = t[r], ot.exec(i)) {
          if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
            if ("show" !== i || !m || void 0 === m[r]) continue;
            g = !0;
          }

          p[r] = m && m[r] || d.style(e, r);
        } else l = void 0;
      }

      if (d.isEmptyObject(p)) "inline" === ("none" === l ? _e(e.nodeName) : l) && (h.display = l);else {
        m ? "hidden" in m && (g = m.hidden) : m = d._data(e, "fxshow", {}), o && (m.hidden = !g), g ? d(e).show() : c.done(function () {
          d(e).hide();
        }), c.done(function () {
          var t;

          d._removeData(e, "fxshow");

          for (t in p) {
            d.style(e, t, p[t]);
          }
        });

        for (r in p) {
          a = lt(g ? m[r] : 0, r, c), r in m || (m[r] = a.start, g && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0));
        }
      }
    }],
    prefilter: function prefilter(e, t) {
      t ? ct.prefilters.unshift(e) : ct.prefilters.push(e);
    }
  }), d.speed = function (e, t, n) {
    var r = e && "object" == _typeof(e) ? d.extend({}, e) : {
      complete: n || !n && t || d.isFunction(e) && e,
      duration: e,
      easing: n && t || t && !d.isFunction(t) && t
    };
    return r.duration = d.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in d.fx.speeds ? d.fx.speeds[r.duration] : d.fx.speeds._default, null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function () {
      d.isFunction(r.old) && r.old.call(this), r.queue && d.dequeue(this, r.queue);
    }, r;
  }, d.fn.extend({
    fadeTo: function fadeTo(e, t, n, r) {
      return this.filter(X).css("opacity", 0).show().end().animate({
        opacity: t
      }, e, n, r);
    },
    animate: function animate(e, t, n, r) {
      var i = d.isEmptyObject(e),
          o = d.speed(t, n, r),
          a = function a() {
        var t = ct(this, d.extend({}, e), o);
        (i || d._data(this, "finish")) && t.stop(!0);
      };

      return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a);
    },
    stop: function stop(e, t, n) {
      var r = function r(e) {
        var t = e.stop;
        delete e.stop, t(n);
      };

      return "string" != typeof e && (n = t, t = e, e = void 0), t && !1 !== e && this.queue(e || "fx", []), this.each(function () {
        var t = !0,
            i = null != e && e + "queueHooks",
            o = d.timers,
            a = d._data(this);

        if (i) a[i] && a[i].stop && r(a[i]);else for (i in a) {
          a[i] && a[i].stop && at.test(i) && r(a[i]);
        }

        for (i = o.length; i--;) {
          o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n), t = !1, o.splice(i, 1));
        }

        !t && n || d.dequeue(this, e);
      });
    },
    finish: function finish(e) {
      return !1 !== e && (e = e || "fx"), this.each(function () {
        var t,
            n = d._data(this),
            r = n[e + "queue"],
            i = n[e + "queueHooks"],
            o = d.timers,
            a = r ? r.length : 0;

        for (n.finish = !0, d.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) {
          o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
        }

        for (t = 0; t < a; t++) {
          r[t] && r[t].finish && r[t].finish.call(this);
        }

        delete n.finish;
      });
    }
  }), d.each(["toggle", "show", "hide"], function (e, t) {
    var n = d.fn[t];

    d.fn[t] = function (e, r, i) {
      return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(ut(t, !0), e, r, i);
    };
  }), d.each({
    slideDown: ut("show"),
    slideUp: ut("hide"),
    slideToggle: ut("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function (e, t) {
    d.fn[e] = function (e, n, r) {
      return this.animate(t, e, n, r);
    };
  }), d.timers = [], d.fx.tick = function () {
    var e,
        t = d.timers,
        n = 0;

    for (rt = d.now(); n < t.length; n++) {
      (e = t[n])() || t[n] !== e || t.splice(n--, 1);
    }

    t.length || d.fx.stop(), rt = void 0;
  }, d.fx.timer = function (e) {
    d.timers.push(e), e() ? d.fx.start() : d.timers.pop();
  }, d.fx.interval = 13, d.fx.start = function () {
    it || (it = e.setInterval(d.fx.tick, d.fx.interval));
  }, d.fx.stop = function () {
    e.clearInterval(it), it = null;
  }, d.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  }, d.fn.delay = function (t, n) {
    return t = d.fx ? d.fx.speeds[t] || t : t, n = n || "fx", this.queue(n, function (n, r) {
      var i = e.setTimeout(n, t);

      r.stop = function () {
        e.clearTimeout(i);
      };
    });
  }, function () {
    var e,
        t = r.createElement("input"),
        n = r.createElement("div"),
        i = r.createElement("select"),
        o = i.appendChild(r.createElement("option"));
    (n = r.createElement("div")).setAttribute("className", "t"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", e = n.getElementsByTagName("a")[0], t.setAttribute("type", "checkbox"), n.appendChild(t), (e = n.getElementsByTagName("a")[0]).style.cssText = "top:1px", f.getSetAttribute = "t" !== n.className, f.style = /top/.test(e.getAttribute("style")), f.hrefNormalized = "/a" === e.getAttribute("href"), f.checkOn = !!t.value, f.optSelected = o.selected, f.enctype = !!r.createElement("form").enctype, i.disabled = !0, f.optDisabled = !o.disabled, (t = r.createElement("input")).setAttribute("value", ""), f.input = "" === t.getAttribute("value"), t.value = "t", t.setAttribute("type", "radio"), f.radioValue = "t" === t.value;
  }();
  var ft = /\r/g,
      dt = /[\x20\t\r\n\f]+/g;
  d.fn.extend({
    val: function val(e) {
      var t,
          n,
          r,
          i = this[0];
      {
        if (arguments.length) return r = d.isFunction(e), this.each(function (n) {
          var i;
          1 === this.nodeType && (null == (i = r ? e.call(this, n, d(this).val()) : e) ? i = "" : "number" == typeof i ? i += "" : d.isArray(i) && (i = d.map(i, function (e) {
            return null == e ? "" : e + "";
          })), (t = d.valHooks[this.type] || d.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i));
        });
        if (i) return (t = d.valHooks[i.type] || d.valHooks[i.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : "string" == typeof (n = i.value) ? n.replace(ft, "") : null == n ? "" : n;
      }
    }
  }), d.extend({
    valHooks: {
      option: {
        get: function get(e) {
          var t = d.find.attr(e, "value");
          return null != t ? t : d.trim(d.text(e)).replace(dt, " ");
        }
      },
      select: {
        get: function get(e) {
          for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || i < 0, a = o ? null : [], s = o ? i + 1 : r.length, u = i < 0 ? s : o ? i : 0; u < s; u++) {
            if (((n = r[u]).selected || u === i) && (f.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !d.nodeName(n.parentNode, "optgroup"))) {
              if (t = d(n).val(), o) return t;
              a.push(t);
            }
          }

          return a;
        },
        set: function set(e, t) {
          for (var n, r, i = e.options, o = d.makeArray(t), a = i.length; a--;) {
            if (r = i[a], d.inArray(d.valHooks.option.get(r), o) > -1) try {
              r.selected = n = !0;
            } catch (e) {
              r.scrollHeight;
            } else r.selected = !1;
          }

          return n || (e.selectedIndex = -1), i;
        }
      }
    }
  }), d.each(["radio", "checkbox"], function () {
    d.valHooks[this] = {
      set: function set(e, t) {
        if (d.isArray(t)) return e.checked = d.inArray(d(e).val(), t) > -1;
      }
    }, f.checkOn || (d.valHooks[this].get = function (e) {
      return null === e.getAttribute("value") ? "on" : e.value;
    });
  });
  var pt,
      ht,
      gt = d.expr.attrHandle,
      mt = /^(?:checked|selected)$/i,
      vt = f.getSetAttribute,
      yt = f.input;
  d.fn.extend({
    attr: function attr(e, t) {
      return V(this, d.attr, e, t, arguments.length > 1);
    },
    removeAttr: function removeAttr(e) {
      return this.each(function () {
        d.removeAttr(this, e);
      });
    }
  }), d.extend({
    attr: function attr(e, t, n) {
      var r,
          i,
          o = e.nodeType;
      if (3 !== o && 8 !== o && 2 !== o) return void 0 === e.getAttribute ? d.prop(e, t, n) : (1 === o && d.isXMLDoc(e) || (t = t.toLowerCase(), i = d.attrHooks[t] || (d.expr.match.bool.test(t) ? ht : pt)), void 0 !== n ? null === n ? void d.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = d.find.attr(e, t)) ? void 0 : r);
    },
    attrHooks: {
      type: {
        set: function set(e, t) {
          if (!f.radioValue && "radio" === t && d.nodeName(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t;
          }
        }
      }
    },
    removeAttr: function removeAttr(e, t) {
      var n,
          r,
          i = 0,
          o = t && t.match(j);
      if (o && 1 === e.nodeType) for (; n = o[i++];) {
        r = d.propFix[n] || n, d.expr.match.bool.test(n) ? yt && vt || !mt.test(n) ? e[r] = !1 : e[d.camelCase("default-" + n)] = e[r] = !1 : d.attr(e, n, ""), e.removeAttribute(vt ? n : r);
      }
    }
  }), ht = {
    set: function set(e, t, n) {
      return !1 === t ? d.removeAttr(e, n) : yt && vt || !mt.test(n) ? e.setAttribute(!vt && d.propFix[n] || n, n) : e[d.camelCase("default-" + n)] = e[n] = !0, n;
    }
  }, d.each(d.expr.match.bool.source.match(/\w+/g), function (e, t) {
    var n = gt[t] || d.find.attr;
    yt && vt || !mt.test(t) ? gt[t] = function (e, t, r) {
      var i, o;
      return r || (o = gt[t], gt[t] = i, i = null != n(e, t, r) ? t.toLowerCase() : null, gt[t] = o), i;
    } : gt[t] = function (e, t, n) {
      if (!n) return e[d.camelCase("default-" + t)] ? t.toLowerCase() : null;
    };
  }), yt && vt || (d.attrHooks.value = {
    set: function set(e, t, n) {
      if (!d.nodeName(e, "input")) return pt && pt.set(e, t, n);
      e.defaultValue = t;
    }
  }), vt || (pt = {
    set: function set(e, t, n) {
      var r = e.getAttributeNode(n);
      if (r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)), r.value = t += "", "value" === n || t === e.getAttribute(n)) return t;
    }
  }, gt.id = gt.name = gt.coords = function (e, t, n) {
    var r;
    if (!n) return (r = e.getAttributeNode(t)) && "" !== r.value ? r.value : null;
  }, d.valHooks.button = {
    get: function get(e, t) {
      var n = e.getAttributeNode(t);
      if (n && n.specified) return n.value;
    },
    set: pt.set
  }, d.attrHooks.contenteditable = {
    set: function set(e, t, n) {
      pt.set(e, "" !== t && t, n);
    }
  }, d.each(["width", "height"], function (e, t) {
    d.attrHooks[t] = {
      set: function set(e, n) {
        if ("" === n) return e.setAttribute(t, "auto"), n;
      }
    };
  })), f.style || (d.attrHooks.style = {
    get: function get(e) {
      return e.style.cssText || void 0;
    },
    set: function set(e, t) {
      return e.style.cssText = t + "";
    }
  });
  var xt = /^(?:input|select|textarea|button|object)$/i,
      bt = /^(?:a|area)$/i;
  d.fn.extend({
    prop: function prop(e, t) {
      return V(this, d.prop, e, t, arguments.length > 1);
    },
    removeProp: function removeProp(e) {
      return e = d.propFix[e] || e, this.each(function () {
        try {
          this[e] = void 0, delete this[e];
        } catch (e) {}
      });
    }
  }), d.extend({
    prop: function prop(e, t, n) {
      var r,
          i,
          o = e.nodeType;
      if (3 !== o && 8 !== o && 2 !== o) return 1 === o && d.isXMLDoc(e) || (t = d.propFix[t] || t, i = d.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t];
    },
    propHooks: {
      tabIndex: {
        get: function get(e) {
          var t = d.find.attr(e, "tabindex");
          return t ? parseInt(t, 10) : xt.test(e.nodeName) || bt.test(e.nodeName) && e.href ? 0 : -1;
        }
      }
    },
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  }), f.hrefNormalized || d.each(["href", "src"], function (e, t) {
    d.propHooks[t] = {
      get: function get(e) {
        return e.getAttribute(t, 4);
      }
    };
  }), f.optSelected || (d.propHooks.selected = {
    get: function get(e) {
      var t = e.parentNode;
      return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null;
    },
    set: function set(e) {
      var t = e.parentNode;
      t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex);
    }
  }), d.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    d.propFix[this.toLowerCase()] = this;
  }), f.enctype || (d.propFix.enctype = "encoding");
  var wt = /[\t\r\n\f]/g;

  function Tt(e) {
    return d.attr(e, "class") || "";
  }

  d.fn.extend({
    addClass: function addClass(e) {
      var t,
          n,
          r,
          i,
          o,
          a,
          s,
          u = 0;
      if (d.isFunction(e)) return this.each(function (t) {
        d(this).addClass(e.call(this, t, Tt(this)));
      });
      if ("string" == typeof e && e) for (t = e.match(j) || []; n = this[u++];) {
        if (i = Tt(n), r = 1 === n.nodeType && (" " + i + " ").replace(wt, " ")) {
          for (a = 0; o = t[a++];) {
            r.indexOf(" " + o + " ") < 0 && (r += o + " ");
          }

          i !== (s = d.trim(r)) && d.attr(n, "class", s);
        }
      }
      return this;
    },
    removeClass: function removeClass(e) {
      var t,
          n,
          r,
          i,
          o,
          a,
          s,
          u = 0;
      if (d.isFunction(e)) return this.each(function (t) {
        d(this).removeClass(e.call(this, t, Tt(this)));
      });
      if (!arguments.length) return this.attr("class", "");
      if ("string" == typeof e && e) for (t = e.match(j) || []; n = this[u++];) {
        if (i = Tt(n), r = 1 === n.nodeType && (" " + i + " ").replace(wt, " ")) {
          for (a = 0; o = t[a++];) {
            for (; r.indexOf(" " + o + " ") > -1;) {
              r = r.replace(" " + o + " ", " ");
            }
          }

          i !== (s = d.trim(r)) && d.attr(n, "class", s);
        }
      }
      return this;
    },
    toggleClass: function toggleClass(e, t) {
      var n = _typeof(e);

      return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : d.isFunction(e) ? this.each(function (n) {
        d(this).toggleClass(e.call(this, n, Tt(this), t), t);
      }) : this.each(function () {
        var t, r, i, o;
        if ("string" === n) for (r = 0, i = d(this), o = e.match(j) || []; t = o[r++];) {
          i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
        } else void 0 !== e && "boolean" !== n || ((t = Tt(this)) && d._data(this, "__className__", t), d.attr(this, "class", t || !1 === e ? "" : d._data(this, "__className__") || ""));
      });
    },
    hasClass: function hasClass(e) {
      var t,
          n,
          r = 0;

      for (t = " " + e + " "; n = this[r++];) {
        if (1 === n.nodeType && (" " + Tt(n) + " ").replace(wt, " ").indexOf(t) > -1) return !0;
      }

      return !1;
    }
  }), d.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
    d.fn[t] = function (e, n) {
      return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
    };
  }), d.fn.extend({
    hover: function hover(e, t) {
      return this.mouseenter(e).mouseleave(t || e);
    }
  });
  var Ct = e.location,
      Et = d.now(),
      Nt = /\?/,
      kt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  d.parseJSON = function (t) {
    if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
    var n,
        r = null,
        i = d.trim(t + "");
    return i && !d.trim(i.replace(kt, function (e, t, i, o) {
      return n && t && (r = 0), 0 === r ? e : (n = i || t, r += !o - !i, "");
    })) ? Function("return " + i)() : d.error("Invalid JSON: " + t);
  }, d.parseXML = function (t) {
    var n, r;
    if (!t || "string" != typeof t) return null;

    try {
      e.DOMParser ? (r = new e.DOMParser(), n = r.parseFromString(t, "text/xml")) : ((n = new e.ActiveXObject("Microsoft.XMLDOM")).async = "false", n.loadXML(t));
    } catch (e) {
      n = void 0;
    }

    return n && n.documentElement && !n.getElementsByTagName("parsererror").length || d.error("Invalid XML: " + t), n;
  };
  var St = /#.*$/,
      At = /([?&])_=[^&]*/,
      Dt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
      jt = /^(?:GET|HEAD)$/,
      Lt = /^\/\//,
      Ht = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
      qt = {},
      _t = {},
      Ft = "*/".concat("*"),
      Mt = Ct.href,
      Ot = Ht.exec(Mt.toLowerCase()) || [];

  function Rt(e) {
    return function (t, n) {
      "string" != typeof t && (n = t, t = "*");
      var r,
          i = 0,
          o = t.toLowerCase().match(j) || [];
      if (d.isFunction(n)) for (; r = o[i++];) {
        "+" === r.charAt(0) ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n);
      }
    };
  }

  function Pt(e, t, n, r) {
    var i = {},
        o = e === _t;

    function a(s) {
      var u;
      return i[s] = !0, d.each(e[s] || [], function (e, s) {
        var l = s(t, n, r);
        return "string" != typeof l || o || i[l] ? o ? !(u = l) : void 0 : (t.dataTypes.unshift(l), a(l), !1);
      }), u;
    }

    return a(t.dataTypes[0]) || !i["*"] && a("*");
  }

  function Bt(e, t) {
    var n,
        r,
        i = d.ajaxSettings.flatOptions || {};

    for (r in t) {
      void 0 !== t[r] && ((i[r] ? e : n || (n = {}))[r] = t[r]);
    }

    return n && d.extend(!0, e, n), e;
  }

  d.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: Mt,
      type: "GET",
      isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Ot[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": Ft,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": d.parseJSON,
        "text xml": d.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function ajaxSetup(e, t) {
      return t ? Bt(Bt(e, d.ajaxSettings), t) : Bt(d.ajaxSettings, e);
    },
    ajaxPrefilter: Rt(qt),
    ajaxTransport: Rt(_t),
    ajax: function ajax(t, n) {
      "object" == _typeof(t) && (n = t, t = void 0), n = n || {};
      var r,
          i,
          o,
          a,
          s,
          u,
          l,
          c,
          f = d.ajaxSetup({}, n),
          p = f.context || f,
          h = f.context && (p.nodeType || p.jquery) ? d(p) : d.event,
          g = d.Deferred(),
          m = d.Callbacks("once memory"),
          v = f.statusCode || {},
          y = {},
          x = {},
          b = 0,
          w = "canceled",
          T = {
        readyState: 0,
        getResponseHeader: function getResponseHeader(e) {
          var t;

          if (2 === b) {
            if (!c) for (c = {}; t = Dt.exec(a);) {
              c[t[1].toLowerCase()] = t[2];
            }
            t = c[e.toLowerCase()];
          }

          return null == t ? null : t;
        },
        getAllResponseHeaders: function getAllResponseHeaders() {
          return 2 === b ? a : null;
        },
        setRequestHeader: function setRequestHeader(e, t) {
          var n = e.toLowerCase();
          return b || (e = x[n] = x[n] || e, y[e] = t), this;
        },
        overrideMimeType: function overrideMimeType(e) {
          return b || (f.mimeType = e), this;
        },
        statusCode: function statusCode(e) {
          var t;
          if (e) if (b < 2) for (t in e) {
            v[t] = [v[t], e[t]];
          } else T.always(e[T.status]);
          return this;
        },
        abort: function abort(e) {
          var t = e || w;
          return l && l.abort(t), C(0, t), this;
        }
      };
      if (g.promise(T).complete = m.add, T.success = T.done, T.error = T.fail, f.url = ((t || f.url || Mt) + "").replace(St, "").replace(Lt, Ot[1] + "//"), f.type = n.method || n.type || f.method || f.type, f.dataTypes = d.trim(f.dataType || "*").toLowerCase().match(j) || [""], null == f.crossDomain && (r = Ht.exec(f.url.toLowerCase()), f.crossDomain = !(!r || r[1] === Ot[1] && r[2] === Ot[2] && (r[3] || ("http:" === r[1] ? "80" : "443")) === (Ot[3] || ("http:" === Ot[1] ? "80" : "443")))), f.data && f.processData && "string" != typeof f.data && (f.data = d.param(f.data, f.traditional)), Pt(qt, f, n, T), 2 === b) return T;
      (u = d.event && f.global) && 0 == d.active++ && d.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !jt.test(f.type), o = f.url, f.hasContent || (f.data && (o = f.url += (Nt.test(o) ? "&" : "?") + f.data, delete f.data), !1 === f.cache && (f.url = At.test(o) ? o.replace(At, "$1_=" + Et++) : o + (Nt.test(o) ? "&" : "?") + "_=" + Et++)), f.ifModified && (d.lastModified[o] && T.setRequestHeader("If-Modified-Since", d.lastModified[o]), d.etag[o] && T.setRequestHeader("If-None-Match", d.etag[o])), (f.data && f.hasContent && !1 !== f.contentType || n.contentType) && T.setRequestHeader("Content-Type", f.contentType), T.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + Ft + "; q=0.01" : "") : f.accepts["*"]);

      for (i in f.headers) {
        T.setRequestHeader(i, f.headers[i]);
      }

      if (f.beforeSend && (!1 === f.beforeSend.call(p, T, f) || 2 === b)) return T.abort();
      w = "abort";

      for (i in {
        success: 1,
        error: 1,
        complete: 1
      }) {
        T[i](f[i]);
      }

      if (l = Pt(_t, f, n, T)) {
        if (T.readyState = 1, u && h.trigger("ajaxSend", [T, f]), 2 === b) return T;
        f.async && f.timeout > 0 && (s = e.setTimeout(function () {
          T.abort("timeout");
        }, f.timeout));

        try {
          b = 1, l.send(y, C);
        } catch (e) {
          if (!(b < 2)) throw e;
          C(-1, e);
        }
      } else C(-1, "No Transport");

      function C(t, n, r, i) {
        var c,
            y,
            x,
            w,
            C,
            E = n;
        2 !== b && (b = 2, s && e.clearTimeout(s), l = void 0, a = i || "", T.readyState = t > 0 ? 4 : 0, c = t >= 200 && t < 300 || 304 === t, r && (w = function (e, t, n) {
          for (var r, i, o, a, s = e.contents, u = e.dataTypes; "*" === u[0];) {
            u.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
          }

          if (i) for (a in s) {
            if (s[a] && s[a].test(i)) {
              u.unshift(a);
              break;
            }
          }
          if (u[0] in n) o = u[0];else {
            for (a in n) {
              if (!u[0] || e.converters[a + " " + u[0]]) {
                o = a;
                break;
              }

              r || (r = a);
            }

            o = o || r;
          }
          if (o) return o !== u[0] && u.unshift(o), n[o];
        }(f, T, r)), w = function (e, t, n, r) {
          var i,
              o,
              a,
              s,
              u,
              l = {},
              c = e.dataTypes.slice();
          if (c[1]) for (a in e.converters) {
            l[a.toLowerCase()] = e.converters[a];
          }

          for (o = c.shift(); o;) {
            if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) if ("*" === o) o = u;else if ("*" !== u && u !== o) {
              if (!(a = l[u + " " + o] || l["* " + o])) for (i in l) {
                if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                  !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));
                  break;
                }
              }
              if (!0 !== a) if (a && e["throws"]) t = a(t);else try {
                t = a(t);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: a ? e : "No conversion from " + u + " to " + o
                };
              }
            }
          }

          return {
            state: "success",
            data: t
          };
        }(f, w, T, c), c ? (f.ifModified && ((C = T.getResponseHeader("Last-Modified")) && (d.lastModified[o] = C), (C = T.getResponseHeader("etag")) && (d.etag[o] = C)), 204 === t || "HEAD" === f.type ? E = "nocontent" : 304 === t ? E = "notmodified" : (E = w.state, y = w.data, c = !(x = w.error))) : (x = E, !t && E || (E = "error", t < 0 && (t = 0))), T.status = t, T.statusText = (n || E) + "", c ? g.resolveWith(p, [y, E, T]) : g.rejectWith(p, [T, E, x]), T.statusCode(v), v = void 0, u && h.trigger(c ? "ajaxSuccess" : "ajaxError", [T, f, c ? y : x]), m.fireWith(p, [T, E]), u && (h.trigger("ajaxComplete", [T, f]), --d.active || d.event.trigger("ajaxStop")));
      }

      return T;
    },
    getJSON: function getJSON(e, t, n) {
      return d.get(e, t, n, "json");
    },
    getScript: function getScript(e, t) {
      return d.get(e, void 0, t, "script");
    }
  }), d.each(["get", "post"], function (e, t) {
    d[t] = function (e, n, r, i) {
      return d.isFunction(n) && (i = i || r, r = n, n = void 0), d.ajax(d.extend({
        url: e,
        type: t,
        dataType: i,
        data: n,
        success: r
      }, d.isPlainObject(e) && e));
    };
  }), d._evalUrl = function (e) {
    return d.ajax({
      url: e,
      type: "GET",
      dataType: "script",
      cache: !0,
      async: !1,
      global: !1,
      "throws": !0
    });
  }, d.fn.extend({
    wrapAll: function wrapAll(e) {
      if (d.isFunction(e)) return this.each(function (t) {
        d(this).wrapAll(e.call(this, t));
      });

      if (this[0]) {
        var t = d(e, this[0].ownerDocument).eq(0).clone(!0);
        this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
          for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) {
            e = e.firstChild;
          }

          return e;
        }).append(this);
      }

      return this;
    },
    wrapInner: function wrapInner(e) {
      return d.isFunction(e) ? this.each(function (t) {
        d(this).wrapInner(e.call(this, t));
      }) : this.each(function () {
        var t = d(this),
            n = t.contents();
        n.length ? n.wrapAll(e) : t.append(e);
      });
    },
    wrap: function wrap(e) {
      var t = d.isFunction(e);
      return this.each(function (n) {
        d(this).wrapAll(t ? e.call(this, n) : e);
      });
    },
    unwrap: function unwrap() {
      return this.parent().each(function () {
        d.nodeName(this, "body") || d(this).replaceWith(this.childNodes);
      }).end();
    }
  });
  d.expr.filters.hidden = function (e) {
    return f.reliableHiddenOffsets() ? e.offsetWidth <= 0 && e.offsetHeight <= 0 && !e.getClientRects().length : function (e) {
      for (; e && 1 === e.nodeType;) {
        if ("none" === (t = e, t.style && t.style.display || d.css(t, "display")) || "hidden" === e.type) return !0;
        e = e.parentNode;
      }

      var t;
      return !1;
    }(e);
  }, d.expr.filters.visible = function (e) {
    return !d.expr.filters.hidden(e);
  };
  var Wt = /%20/g,
      It = /\[\]$/,
      $t = /\r?\n/g,
      zt = /^(?:submit|button|image|reset|file)$/i,
      Xt = /^(?:input|select|textarea|keygen)/i;

  function Ut(e, t, n, r) {
    var i;
    if (d.isArray(t)) d.each(t, function (t, i) {
      n || It.test(e) ? r(e, i) : Ut(e + "[" + ("object" == _typeof(i) && null != i ? t : "") + "]", i, n, r);
    });else if (n || "object" !== d.type(t)) r(e, t);else for (i in t) {
      Ut(e + "[" + i + "]", t[i], n, r);
    }
  }

  d.param = function (e, t) {
    var n,
        r = [],
        i = function i(e, t) {
      t = d.isFunction(t) ? t() : null == t ? "" : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
    };

    if (void 0 === t && (t = d.ajaxSettings && d.ajaxSettings.traditional), d.isArray(e) || e.jquery && !d.isPlainObject(e)) d.each(e, function () {
      i(this.name, this.value);
    });else for (n in e) {
      Ut(n, e[n], t, i);
    }
    return r.join("&").replace(Wt, "+");
  }, d.fn.extend({
    serialize: function serialize() {
      return d.param(this.serializeArray());
    },
    serializeArray: function serializeArray() {
      return this.map(function () {
        var e = d.prop(this, "elements");
        return e ? d.makeArray(e) : this;
      }).filter(function () {
        var e = this.type;
        return this.name && !d(this).is(":disabled") && Xt.test(this.nodeName) && !zt.test(e) && (this.checked || !Y.test(e));
      }).map(function (e, t) {
        var n = d(this).val();
        return null == n ? null : d.isArray(n) ? d.map(n, function (e) {
          return {
            name: t.name,
            value: e.replace($t, "\r\n")
          };
        }) : {
          name: t.name,
          value: n.replace($t, "\r\n")
        };
      }).get();
    }
  }), d.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function () {
    return this.isLocal ? Kt() : r.documentMode > 8 ? Gt() : /^(get|post|head|put|delete|options)$/i.test(this.type) && Gt() || Kt();
  } : Gt;
  var Vt = 0,
      Yt = {},
      Jt = d.ajaxSettings.xhr();
  e.attachEvent && e.attachEvent("onunload", function () {
    for (var e in Yt) {
      Yt[e](void 0, !0);
    }
  }), f.cors = !!Jt && "withCredentials" in Jt, (Jt = f.ajax = !!Jt) && d.ajaxTransport(function (t) {
    if (!t.crossDomain || f.cors) {
      var _n3;

      return {
        send: function send(r, i) {
          var o,
              a = t.xhr(),
              s = ++Vt;
          if (a.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields) for (o in t.xhrFields) {
            a[o] = t.xhrFields[o];
          }
          t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType), t.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");

          for (o in r) {
            void 0 !== r[o] && a.setRequestHeader(o, r[o] + "");
          }

          a.send(t.hasContent && t.data || null), _n3 = function n(e, r) {
            var o, u, l;
            if (_n3 && (r || 4 === a.readyState)) if (delete Yt[s], _n3 = void 0, a.onreadystatechange = d.noop, r) 4 !== a.readyState && a.abort();else {
              l = {}, o = a.status, "string" == typeof a.responseText && (l.text = a.responseText);

              try {
                u = a.statusText;
              } catch (e) {
                u = "";
              }

              o || !t.isLocal || t.crossDomain ? 1223 === o && (o = 204) : o = l.text ? 200 : 404;
            }
            l && i(o, u, l, a.getAllResponseHeaders());
          }, t.async ? 4 === a.readyState ? e.setTimeout(_n3) : a.onreadystatechange = Yt[s] = _n3 : _n3();
        },
        abort: function abort() {
          _n3 && _n3(void 0, !0);
        }
      };
    }
  });

  function Gt() {
    try {
      return new e.XMLHttpRequest();
    } catch (e) {}
  }

  function Kt() {
    try {
      return new e.ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {}
  }

  d.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /\b(?:java|ecma)script\b/
    },
    converters: {
      "text script": function textScript(e) {
        return d.globalEval(e), e;
      }
    }
  }), d.ajaxPrefilter("script", function (e) {
    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1);
  }), d.ajaxTransport("script", function (e) {
    if (e.crossDomain) {
      var t,
          n = r.head || d("head")[0] || r.documentElement;
      return {
        send: function send(i, o) {
          (t = r.createElement("script")).async = !0, e.scriptCharset && (t.charset = e.scriptCharset), t.src = e.url, t.onload = t.onreadystatechange = function (e, n) {
            (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, n || o(200, "success"));
          }, n.insertBefore(t, n.firstChild);
        },
        abort: function abort() {
          t && t.onload(void 0, !0);
        }
      };
    }
  });
  var Qt = [],
      Zt = /(=)\?(?=&|$)|\?\?/;
  d.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function jsonpCallback() {
      var e = Qt.pop() || d.expando + "_" + Et++;
      return this[e] = !0, e;
    }
  }), d.ajaxPrefilter("json jsonp", function (t, n, r) {
    var i,
        o,
        a,
        s = !1 !== t.jsonp && (Zt.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && Zt.test(t.data) && "data");
    if (s || "jsonp" === t.dataTypes[0]) return i = t.jsonpCallback = d.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Zt, "$1" + i) : !1 !== t.jsonp && (t.url += (Nt.test(t.url) ? "&" : "?") + t.jsonp + "=" + i), t.converters["script json"] = function () {
      return a || d.error(i + " was not called"), a[0];
    }, t.dataTypes[0] = "json", o = e[i], e[i] = function () {
      a = arguments;
    }, r.always(function () {
      void 0 === o ? d(e).removeProp(i) : e[i] = o, t[i] && (t.jsonpCallback = n.jsonpCallback, Qt.push(i)), a && d.isFunction(o) && o(a[0]), a = o = void 0;
    }), "script";
  }), d.parseHTML = function (e, t, n) {
    if (!e || "string" != typeof e) return null;
    "boolean" == typeof t && (n = t, t = !1), t = t || r;
    var i = T.exec(e),
        o = !n && [];
    return i ? [t.createElement(i[1])] : (i = ae([e], t, o), o && o.length && d(o).remove(), d.merge([], i.childNodes));
  };
  var en = d.fn.load;
  d.fn.load = function (e, t, n) {
    if ("string" != typeof e && en) return en.apply(this, arguments);
    var r,
        i,
        o,
        a = this,
        s = e.indexOf(" ");
    return s > -1 && (r = d.trim(e.slice(s, e.length)), e = e.slice(0, s)), d.isFunction(t) ? (n = t, t = void 0) : t && "object" == _typeof(t) && (i = "POST"), a.length > 0 && d.ajax({
      url: e,
      type: i || "GET",
      dataType: "html",
      data: t
    }).done(function (e) {
      o = arguments, a.html(r ? d("<div>").append(d.parseHTML(e)).find(r) : e);
    }).always(n && function (e, t) {
      a.each(function () {
        n.apply(this, o || [e.responseText, t, e]);
      });
    }), this;
  }, d.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
    d.fn[t] = function (e) {
      return this.on(t, e);
    };
  }), d.expr.filters.animated = function (e) {
    return d.grep(d.timers, function (t) {
      return e === t.elem;
    }).length;
  };

  function tn(e) {
    return d.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow);
  }

  return d.offset = {
    setOffset: function setOffset(e, t, n) {
      var r,
          i,
          o,
          a,
          s,
          u,
          l = d.css(e, "position"),
          c = d(e),
          f = {};
      "static" === l && (e.style.position = "relative"), s = c.offset(), o = d.css(e, "top"), u = d.css(e, "left"), ("absolute" === l || "fixed" === l) && d.inArray("auto", [o, u]) > -1 ? (a = (r = c.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), d.isFunction(t) && (t = t.call(e, n, d.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : c.css(f);
    }
  }, d.fn.extend({
    offset: function offset(e) {
      if (arguments.length) return void 0 === e ? this : this.each(function (t) {
        d.offset.setOffset(this, e, t);
      });
      var t,
          n,
          r = {
        top: 0,
        left: 0
      },
          i = this[0],
          o = i && i.ownerDocument;
      if (o) return t = o.documentElement, d.contains(t, i) ? (void 0 !== i.getBoundingClientRect && (r = i.getBoundingClientRect()), n = tn(o), {
        top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
        left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
      }) : r;
    },
    position: function position() {
      if (this[0]) {
        var e,
            t,
            n = {
          top: 0,
          left: 0
        },
            r = this[0];
        return "fixed" === d.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), d.nodeName(e[0], "html") || (n = e.offset()), n.top += d.css(e[0], "borderTopWidth", !0), n.left += d.css(e[0], "borderLeftWidth", !0)), {
          top: t.top - n.top - d.css(r, "marginTop", !0),
          left: t.left - n.left - d.css(r, "marginLeft", !0)
        };
      }
    },
    offsetParent: function offsetParent() {
      return this.map(function () {
        for (var e = this.offsetParent; e && !d.nodeName(e, "html") && "static" === d.css(e, "position");) {
          e = e.offsetParent;
        }

        return e || Re;
      });
    }
  }), d.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function (e, t) {
    var n = /Y/.test(t);

    d.fn[e] = function (r) {
      return V(this, function (e, r, i) {
        var o = tn(e);
        if (void 0 === i) return o ? t in o ? o[t] : o.document.documentElement[r] : e[r];
        o ? o.scrollTo(n ? d(o).scrollLeft() : i, n ? i : d(o).scrollTop()) : e[r] = i;
      }, e, r, arguments.length, null);
    };
  }), d.each(["top", "left"], function (e, t) {
    d.cssHooks[t] = Ie(f.pixelPosition, function (e, n) {
      if (n) return n = Be(e, t), Me.test(n) ? d(e).position()[t] + "px" : n;
    });
  }), d.each({
    Height: "height",
    Width: "width"
  }, function (e, t) {
    d.each({
      padding: "inner" + e,
      content: t,
      "": "outer" + e
    }, function (n, r) {
      d.fn[r] = function (r, i) {
        var o = arguments.length && (n || "boolean" != typeof r),
            a = n || (!0 === r || !0 === i ? "margin" : "border");
        return V(this, function (t, n, r) {
          var i;
          return d.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement, Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? d.css(t, n, a) : d.style(t, n, r, a);
        }, t, o ? r : void 0, o, null);
      };
    });
  }), d.fn.extend({
    bind: function bind(e, t, n) {
      return this.on(e, null, t, n);
    },
    unbind: function unbind(e, t) {
      return this.off(e, null, t);
    },
    delegate: function delegate(e, t, n, r) {
      return this.on(t, e, n, r);
    },
    undelegate: function undelegate(e, t, n) {
      return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
    }
  }), d.fn.size = function () {
    return this.length;
  }, d.fn.andSelf = d.fn.addBack, layui.define(function (e) {
    layui.$ = d, e("jquery", d);
  }), d;
});
!function (e, t) {
  "use strict";

  var i,
      n,
      a = e.layui && layui.define,
      o = {
    getPath: function () {
      var e = document.currentScript ? document.currentScript.src : function () {
        for (var e, t = document.scripts, i = t.length - 1, n = i; n > 0; n--) {
          if ("interactive" === t[n].readyState) {
            e = t[n].src;
            break;
          }
        }

        return e || t[i].src;
      }();
      return e.substring(0, e.lastIndexOf("/") + 1);
    }(),
    config: {},
    end: {},
    minIndex: 0,
    minLeft: [],
    btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
    type: ["dialog", "page", "iframe", "loading", "tips"],
    getStyle: function getStyle(t, i) {
      var n = t.currentStyle ? t.currentStyle : e.getComputedStyle(t, null);
      return n[n.getPropertyValue ? "getPropertyValue" : "getAttribute"](i);
    },
    link: function link(t, i, n) {
      if (s.path) {
        var a = document.getElementsByTagName("head")[0],
            r = document.createElement("link");
        "string" == typeof i && (n = i);
        var l = "layuicss-" + (n || t).replace(/\.|\//g, ""),
            f = 0;
        r.rel = "stylesheet", r.href = s.path + t, r.id = l, document.getElementById(l) || a.appendChild(r), "function" == typeof i && function t() {
          if (++f > 80) return e.console && console.error("layer.css: Invalid");
          1989 === parseInt(o.getStyle(document.getElementById(l), "width")) ? i() : setTimeout(t, 100);
        }();
      }
    }
  },
      s = {
    v: "3.1.1",
    ie: function () {
      var t = navigator.userAgent.toLowerCase();
      return !!(e.ActiveXObject || "ActiveXObject" in e) && ((t.match(/msie\s(\d+)/) || [])[1] || "11");
    }(),
    index: e.layer && e.layer.v ? 1e5 : 0,
    path: o.getPath,
    config: function config(e, t) {
      return e = e || {}, s.cache = o.config = i.extend({}, o.config, e), s.path = o.config.path || s.path, "string" == typeof e.extend && (e.extend = [e.extend]), o.config.path && s.ready(), e.extend ? (a ? layui.addcss("modules/layer/" + e.extend) : o.link("theme/" + e.extend), this) : this;
    },
    ready: function ready(e) {
      var t = (a ? "modules/layer/" : "theme/") + "default/layer.css?v=" + s.v;
      return a ? layui.addcss(t, e, "layer") : o.link(t, e, "layer"), this;
    },
    alert: function alert(e, t, n) {
      var a = "function" == typeof t;
      return a && (n = t), s.open(i.extend({
        content: e,
        yes: n
      }, a ? {} : t));
    },
    confirm: function confirm(e, t, n, a) {
      var r = "function" == typeof t;
      return r && (a = n, n = t), s.open(i.extend({
        content: e,
        btn: o.btn,
        yes: n,
        btn2: a
      }, r ? {} : t));
    },
    msg: function msg(e, t, n) {
      var a = "function" == typeof t,
          r = o.config.skin,
          f = (r ? r + " " + r + "-msg" : "") || "layui-layer-msg",
          c = l.anim.length - 1;
      return a && (n = t), s.open(i.extend({
        content: e,
        time: 3e3,
        shade: !1,
        skin: f,
        title: !1,
        closeBtn: !1,
        btn: !1,
        resize: !1,
        end: n
      }, a && !o.config.skin ? {
        skin: f + " layui-layer-hui",
        anim: c
      } : ((-1 === (t = t || {}).icon || void 0 === t.icon && !o.config.skin) && (t.skin = f + " " + (t.skin || "layui-layer-hui")), t)));
    },
    load: function load(e, t) {
      return s.open(i.extend({
        type: 3,
        icon: e || 0,
        resize: !1,
        shade: .01
      }, t));
    },
    tips: function tips(e, t, n) {
      return s.open(i.extend({
        type: 4,
        content: [e, t],
        closeBtn: !1,
        time: 3e3,
        shade: !1,
        resize: !1,
        fixed: !1,
        maxWidth: 210
      }, n));
    }
  },
      r = function r(e) {
    var t = this;
    t.index = ++s.index, t.config = i.extend({}, t.config, o.config, e), document.body ? t.creat() : setTimeout(function () {
      t.creat();
    }, 30);
  };

  r.pt = r.prototype;
  var l = ["layui-layer", ".layui-layer-title", ".layui-layer-main", ".layui-layer-dialog", "layui-layer-iframe", "layui-layer-content", "layui-layer-btn", "layui-layer-close"];
  l.anim = ["layer-anim-00", "layer-anim-01", "layer-anim-02", "layer-anim-03", "layer-anim-04", "layer-anim-05", "layer-anim-06"], r.pt.config = {
    type: 0,
    shade: .3,
    fixed: !0,
    move: l[1],
    title: "&#x4FE1;&#x606F;",
    offset: "auto",
    area: "auto",
    closeBtn: 1,
    time: 0,
    zIndex: 19891014,
    maxWidth: 360,
    anim: 0,
    isOutAnim: !0,
    icon: -1,
    moveType: 1,
    resize: !0,
    scrollbar: !0,
    tips: 2
  }, r.pt.vessel = function (e, t) {
    var n = this.index,
        a = this.config,
        s = a.zIndex + n,
        r = "object" == _typeof(a.title),
        f = a.maxmin && (1 === a.type || 2 === a.type),
        c = a.title ? '<div class="layui-layer-title" style="' + (r ? a.title[1] : "") + '">' + (r ? a.title[0] : a.title) + "</div>" : "";

    return a.zIndex = s, t([a.shade ? '<div class="layui-layer-shade" id="layui-layer-shade' + n + '" times="' + n + '" style="z-index:' + (s - 1) + '; "></div>' : "", '<div class="' + l[0] + " layui-layer-" + o.type[a.type] + (0 != a.type && 2 != a.type || a.shade ? "" : " layui-layer-border") + " " + (a.skin || "") + '" id="' + l[0] + n + '" type="' + o.type[a.type] + '" times="' + n + '" showtime="' + a.time + '" conType="' + (e ? "object" : "string") + '" style="z-index: ' + s + "; width:" + a.area[0] + ";height:" + a.area[1] + (a.fixed ? "" : ";position:absolute;") + '">' + (e && 2 != a.type ? "" : c) + '<div id="' + (a.id || "") + '" class="layui-layer-content' + (0 == a.type && -1 !== a.icon ? " layui-layer-padding" : "") + (3 == a.type ? " layui-layer-loading" + a.icon : "") + '">' + (0 == a.type && -1 !== a.icon ? '<i class="layui-layer-ico layui-layer-ico' + a.icon + '"></i>' : "") + (1 == a.type && e ? "" : a.content || "") + '</div><span class="layui-layer-setwin">' + function () {
      var e = f ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : "";
      return a.closeBtn && (e += '<a class="layui-layer-ico ' + l[7] + " " + l[7] + (a.title ? a.closeBtn : 4 == a.type ? "1" : "2") + '" href="javascript:;"></a>'), e;
    }() + "</span>" + (a.btn ? function () {
      var e = "";
      "string" == typeof a.btn && (a.btn = [a.btn]);

      for (var t = 0, i = a.btn.length; t < i; t++) {
        e += '<a class="' + l[6] + t + '">' + a.btn[t] + "</a>";
      }

      return '<div class="' + l[6] + " layui-layer-btn-" + (a.btnAlign || "") + '">' + e + "</div>";
    }() : "") + (a.resize ? '<span class="layui-layer-resize"></span>' : "") + "</div>"], c, i('<div class="layui-layer-move"></div>')), this;
  }, r.pt.creat = function () {
    var e = this,
        t = e.config,
        a = e.index,
        r = "object" == _typeof(c = t.content),
        f = i("body");

    if (!t.id || !i("#" + t.id)[0]) {
      switch ("string" == typeof t.area && (t.area = "auto" === t.area ? ["", ""] : [t.area, ""]), t.shift && (t.anim = t.shift), 6 == s.ie && (t.fixed = !1), t.type) {
        case 0:
          t.btn = "btn" in t ? t.btn : o.btn[0], s.closeAll("dialog");
          break;

        case 2:
          var c = t.content = r ? t.content : [t.content || "", "auto"];
          t.content = '<iframe scrolling="' + (t.content[1] || "auto") + '" allowtransparency="true" id="' + l[4] + a + '" name="' + l[4] + a + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + t.content[0] + '"></iframe>';
          break;

        case 3:
          delete t.title, delete t.closeBtn, -1 === t.icon && t.icon, s.closeAll("loading");
          break;

        case 4:
          r || (t.content = [t.content, "body"]), t.follow = t.content[1], t.content = t.content[0] + '<i class="layui-layer-TipsG"></i>', delete t.title, t.tips = "object" == _typeof(t.tips) ? t.tips : [t.tips, !0], t.tipsMore || s.closeAll("tips");
      }

      if (e.vessel(r, function (n, s, u) {
        f.append(n[0]), r ? 2 == t.type || 4 == t.type ? i("body").append(n[1]) : c.parents("." + l[0])[0] || (c.data("display", c.css("display")).show().addClass("layui-layer-wrap").wrap(n[1]), i("#" + l[0] + a).find("." + l[5]).before(s)) : f.append(n[1]), i(".layui-layer-move")[0] || f.append(o.moveElem = u), e.layero = i("#" + l[0] + a), t.scrollbar || l.html.css("overflow", "hidden").attr("layer-full", a);
      }).auto(a), i("#layui-layer-shade" + e.index).css({
        "background-color": t.shade[1] || "#000",
        opacity: t.shade[0] || t.shade
      }), 2 == t.type && 6 == s.ie && e.layero.find("iframe").attr("src", c[0]), 4 == t.type ? e.tips() : e.offset(), t.fixed && n.on("resize", function () {
        e.offset(), (/^\d+%$/.test(t.area[0]) || /^\d+%$/.test(t.area[1])) && e.auto(a), 4 == t.type && e.tips();
      }), t.time <= 0 || setTimeout(function () {
        s.close(e.index);
      }, t.time), e.move().callback(), l.anim[t.anim]) {
        var u = "layer-anim " + l.anim[t.anim];
        e.layero.addClass(u).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
          i(this).removeClass(u);
        });
      }

      t.isOutAnim && e.layero.data("isOutAnim", !0);
    }
  }, r.pt.auto = function (e) {
    var t = this.config,
        a = i("#" + l[0] + e);
    "" === t.area[0] && t.maxWidth > 0 && (s.ie && s.ie < 8 && t.btn && a.width(a.innerWidth()), a.outerWidth() > t.maxWidth && a.width(t.maxWidth));

    var o = [a.innerWidth(), a.innerHeight()],
        r = a.find(l[1]).outerHeight() || 0,
        f = a.find("." + l[6]).outerHeight() || 0,
        c = function c(e) {
      (e = a.find(e)).height(o[1] - r - f - 2 * (0 | parseFloat(e.css("padding-top"))));
    };

    switch (t.type) {
      case 2:
        c("iframe");
        break;

      default:
        "" === t.area[1] ? t.maxHeight > 0 && a.outerHeight() > t.maxHeight ? (o[1] = t.maxHeight, c("." + l[5])) : t.fixed && o[1] >= n.height() && (o[1] = n.height(), c("." + l[5])) : c("." + l[5]);
    }

    return this;
  }, r.pt.offset = function () {
    var e = this.config,
        t = this.layero,
        i = [t.outerWidth(), t.outerHeight()],
        a = "object" == _typeof(e.offset);

    this.offsetTop = (n.height() - i[1]) / 2, this.offsetLeft = (n.width() - i[0]) / 2, a ? (this.offsetTop = e.offset[0], this.offsetLeft = e.offset[1] || this.offsetLeft) : "auto" !== e.offset && ("t" === e.offset ? this.offsetTop = 0 : "r" === e.offset ? this.offsetLeft = n.width() - i[0] : "b" === e.offset ? this.offsetTop = n.height() - i[1] : "l" === e.offset ? this.offsetLeft = 0 : "lt" === e.offset ? (this.offsetTop = 0, this.offsetLeft = 0) : "lb" === e.offset ? (this.offsetTop = n.height() - i[1], this.offsetLeft = 0) : "rt" === e.offset ? (this.offsetTop = 0, this.offsetLeft = n.width() - i[0]) : "rb" === e.offset ? (this.offsetTop = n.height() - i[1], this.offsetLeft = n.width() - i[0]) : this.offsetTop = e.offset), e.fixed || (this.offsetTop = /%$/.test(this.offsetTop) ? n.height() * parseFloat(this.offsetTop) / 100 : parseFloat(this.offsetTop), this.offsetLeft = /%$/.test(this.offsetLeft) ? n.width() * parseFloat(this.offsetLeft) / 100 : parseFloat(this.offsetLeft), this.offsetTop += n.scrollTop(), this.offsetLeft += n.scrollLeft()), t.attr("minLeft") && (this.offsetTop = n.height() - (t.find(l[1]).outerHeight() || 0), this.offsetLeft = t.css("left")), t.css({
      top: this.offsetTop,
      left: this.offsetLeft
    });
  }, r.pt.tips = function () {
    var e = this.config,
        t = this.layero,
        a = [t.outerWidth(), t.outerHeight()],
        o = i(e.follow);
    o[0] || (o = i("body"));
    var s = {
      width: o.outerWidth(),
      height: o.outerHeight(),
      top: o.offset().top,
      left: o.offset().left
    },
        r = t.find(".layui-layer-TipsG"),
        f = e.tips[0];
    e.tips[1] || r.remove(), s.autoLeft = function () {
      s.left + a[0] - n.width() > 0 ? (s.tipLeft = s.left + s.width - a[0], r.css({
        right: 12,
        left: "auto"
      })) : s.tipLeft = s.left;
    }, s.where = [function () {
      s.autoLeft(), s.tipTop = s.top - a[1] - 10, r.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color", e.tips[1]);
    }, function () {
      s.tipLeft = s.left + s.width + 10, s.tipTop = s.top, r.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color", e.tips[1]);
    }, function () {
      s.autoLeft(), s.tipTop = s.top + s.height + 10, r.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color", e.tips[1]);
    }, function () {
      s.tipLeft = s.left - a[0] - 10, s.tipTop = s.top, r.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color", e.tips[1]);
    }], s.where[f - 1](), 1 === f ? s.top - (n.scrollTop() + a[1] + 16) < 0 && s.where[2]() : 2 === f ? n.width() - (s.left + s.width + a[0] + 16) > 0 || s.where[3]() : 3 === f ? s.top - n.scrollTop() + s.height + a[1] + 16 - n.height() > 0 && s.where[0]() : 4 === f && a[0] + 16 - s.left > 0 && s.where[1](), t.find("." + l[5]).css({
      "background-color": e.tips[1],
      "padding-right": e.closeBtn ? "30px" : ""
    }), t.css({
      left: s.tipLeft - (e.fixed ? n.scrollLeft() : 0),
      top: s.tipTop - (e.fixed ? n.scrollTop() : 0)
    });
  }, r.pt.move = function () {
    var e = this,
        t = e.config,
        a = i(document),
        r = e.layero,
        l = r.find(t.move),
        f = r.find(".layui-layer-resize"),
        c = {};
    return t.move && l.css("cursor", "move"), l.on("mousedown", function (e) {
      e.preventDefault(), t.move && (c.moveStart = !0, c.offset = [e.clientX - parseFloat(r.css("left")), e.clientY - parseFloat(r.css("top"))], o.moveElem.css("cursor", "move").show());
    }), f.on("mousedown", function (e) {
      e.preventDefault(), c.resizeStart = !0, c.offset = [e.clientX, e.clientY], c.area = [r.outerWidth(), r.outerHeight()], o.moveElem.css("cursor", "se-resize").show();
    }), a.on("mousemove", function (i) {
      if (c.moveStart) {
        var a = i.clientX - c.offset[0],
            o = i.clientY - c.offset[1],
            l = "fixed" === r.css("position");

        if (i.preventDefault(), c.stX = l ? 0 : n.scrollLeft(), c.stY = l ? 0 : n.scrollTop(), !t.moveOut) {
          var f = n.width() - r.outerWidth() + c.stX,
              u = n.height() - r.outerHeight() + c.stY;
          a < c.stX && (a = c.stX), a > f && (a = f), o < c.stY && (o = c.stY), o > u && (o = u);
        }

        r.css({
          left: a,
          top: o
        });
      }

      if (t.resize && c.resizeStart) {
        a = i.clientX - c.offset[0], o = i.clientY - c.offset[1];
        i.preventDefault(), s.style(e.index, {
          width: c.area[0] + a,
          height: c.area[1] + o
        }), c.isResize = !0, t.resizing && t.resizing(r);
      }
    }).on("mouseup", function (e) {
      c.moveStart && (delete c.moveStart, o.moveElem.hide(), t.moveEnd && t.moveEnd(r)), c.resizeStart && (delete c.resizeStart, o.moveElem.hide());
    }), e;
  }, r.pt.callback = function () {
    var e = this,
        t = e.layero,
        n = e.config;
    e.openLayer(), n.success && (2 == n.type ? t.find("iframe").on("load", function () {
      n.success(t, e.index);
    }) : n.success(t, e.index)), 6 == s.ie && e.IE6(t), t.find("." + l[6]).children("a").on("click", function () {
      var a = i(this).index();
      if (0 === a) n.yes ? n.yes(e.index, t) : n.btn1 ? n.btn1(e.index, t) : s.close(e.index);else {
        !1 === (n["btn" + (a + 1)] && n["btn" + (a + 1)](e.index, t)) || s.close(e.index);
      }
    });
    t.find("." + l[7]).on("click", function () {
      !1 === (n.cancel && n.cancel(e.index, t)) || s.close(e.index);
    }), n.shadeClose && i("#layui-layer-shade" + e.index).on("click", function () {
      s.close(e.index);
    }), t.find(".layui-layer-min").on("click", function () {
      !1 === (n.min && n.min(t)) || s.min(e.index, n);
    }), t.find(".layui-layer-max").on("click", function () {
      i(this).hasClass("layui-layer-maxmin") ? (s.restore(e.index), n.restore && n.restore(t)) : (s.full(e.index, n), setTimeout(function () {
        n.full && n.full(t);
      }, 100));
    }), n.end && (o.end[e.index] = n.end);
  }, o.reselect = function () {
    i.each(i("select"), function (e, t) {
      var n = i(this);
      n.parents("." + l[0])[0] || 1 == n.attr("layer") && i("." + l[0]).length < 1 && n.removeAttr("layer").show(), n = null;
    });
  }, r.pt.IE6 = function (e) {
    i("select").each(function (e, t) {
      var n = i(this);
      n.parents("." + l[0])[0] || "none" === n.css("display") || n.attr({
        layer: "1"
      }).hide(), n = null;
    });
  }, r.pt.openLayer = function () {
    s.zIndex = this.config.zIndex, s.setTop = function (e) {
      return s.zIndex = parseInt(e[0].style.zIndex), e.on("mousedown", function () {
        s.zIndex++, e.css("z-index", s.zIndex + 1);
      }), s.zIndex;
    };
  }, o.record = function (e) {
    var t = [e.width(), e.height(), e.position().top, e.position().left + parseFloat(e.css("margin-left"))];
    e.find(".layui-layer-max").addClass("layui-layer-maxmin"), e.attr({
      area: t
    });
  }, o.rescollbar = function (e) {
    l.html.attr("layer-full") == e && (l.html[0].style.removeProperty ? l.html[0].style.removeProperty("overflow") : l.html[0].style.removeAttribute("overflow"), l.html.removeAttr("layer-full"));
  }, e.layer = s, s.getChildFrame = function (e, t) {
    return t = t || i("." + l[4]).attr("times"), i("#" + l[0] + t).find("iframe").contents().find(e);
  }, s.getFrameIndex = function (e) {
    return i("#" + e).parents("." + l[4]).attr("times");
  }, s.iframeAuto = function (e) {
    if (e) {
      var t = s.getChildFrame("html", e).outerHeight(),
          n = i("#" + l[0] + e),
          a = n.find(l[1]).outerHeight() || 0,
          o = n.find("." + l[6]).outerHeight() || 0;
      n.css({
        height: t + a + o
      }), n.find("iframe").css({
        height: t
      });
    }
  }, s.iframeSrc = function (e, t) {
    i("#" + l[0] + e).find("iframe").attr("src", t);
  }, s.style = function (e, t, n) {
    var a = i("#" + l[0] + e),
        s = a.find(".layui-layer-content"),
        r = a.attr("type"),
        f = a.find(l[1]).outerHeight() || 0,
        c = a.find("." + l[6]).outerHeight() || 0;
    a.attr("minLeft");
    r !== o.type[3] && r !== o.type[4] && (n || (parseFloat(t.width) <= 260 && (t.width = 260), parseFloat(t.height) - f - c <= 64 && (t.height = 64 + f + c)), a.css(t), c = a.find("." + l[6]).outerHeight(), r === o.type[2] ? a.find("iframe").css({
      height: parseFloat(t.height) - f - c
    }) : s.css({
      height: parseFloat(t.height) - f - c - parseFloat(s.css("padding-top")) - parseFloat(s.css("padding-bottom"))
    }));
  }, s.min = function (e, t) {
    var a = i("#" + l[0] + e),
        r = a.find(l[1]).outerHeight() || 0,
        f = a.attr("minLeft") || 181 * o.minIndex + "px",
        c = a.css("position");
    o.record(a), o.minLeft[0] && (f = o.minLeft[0], o.minLeft.shift()), a.attr("position", c), s.style(e, {
      width: 180,
      height: r,
      left: f,
      top: n.height() - r,
      position: "fixed",
      overflow: "hidden"
    }, !0), a.find(".layui-layer-min").hide(), "page" === a.attr("type") && a.find(l[4]).hide(), o.rescollbar(e), a.attr("minLeft") || o.minIndex++, a.attr("minLeft", f);
  }, s.restore = function (e) {
    var t = i("#" + l[0] + e),
        n = t.attr("area").split(",");
    t.attr("type");
    s.style(e, {
      width: parseFloat(n[0]),
      height: parseFloat(n[1]),
      top: parseFloat(n[2]),
      left: parseFloat(n[3]),
      position: t.attr("position"),
      overflow: "visible"
    }, !0), t.find(".layui-layer-max").removeClass("layui-layer-maxmin"), t.find(".layui-layer-min").show(), "page" === t.attr("type") && t.find(l[4]).show(), o.rescollbar(e);
  }, s.full = function (e) {
    var t,
        a = i("#" + l[0] + e);
    o.record(a), l.html.attr("layer-full") || l.html.css("overflow", "hidden").attr("layer-full", e), clearTimeout(t), t = setTimeout(function () {
      var t = "fixed" === a.css("position");
      s.style(e, {
        top: t ? 0 : n.scrollTop(),
        left: t ? 0 : n.scrollLeft(),
        width: n.width(),
        height: n.height()
      }, !0), a.find(".layui-layer-min").hide();
    }, 100);
  }, s.title = function (e, t) {
    i("#" + l[0] + (t || s.index)).find(l[1]).html(e);
  }, s.close = function (e) {
    var t = i("#" + l[0] + e),
        n = t.attr("type");

    if (t[0]) {
      var a = function a() {
        if (n === o.type[1] && "object" === t.attr("conType")) {
          t.children(":not(." + l[5] + ")").remove();

          for (var a = t.find(".layui-layer-wrap"), s = 0; s < 2; s++) {
            a.unwrap();
          }

          a.css("display", a.data("display")).removeClass("layui-layer-wrap");
        } else {
          if (n === o.type[2]) try {
            var r = i("#" + l[4] + e)[0];
            r.contentWindow.document.write(""), r.contentWindow.close(), t.find("." + l[5])[0].removeChild(r);
          } catch (e) {}
          t[0].innerHTML = "", t.remove();
        }

        "function" == typeof o.end[e] && o.end[e](), delete o.end[e];
      };

      t.data("isOutAnim") && t.addClass("layer-anim layer-anim-close"), i("#layui-layer-moves, #layui-layer-shade" + e).remove(), 6 == s.ie && o.reselect(), o.rescollbar(e), t.attr("minLeft") && (o.minIndex--, o.minLeft.push(t.attr("minLeft"))), s.ie && s.ie < 10 || !t.data("isOutAnim") ? a() : setTimeout(function () {
        a();
      }, 200);
    }
  }, s.closeAll = function (e) {
    i.each(i("." + l[0]), function () {
      var t = i(this),
          n = e ? t.attr("type") === e : 1;
      n && s.close(t.attr("times")), n = null;
    });
  };

  var f = s.cache || {},
      c = function c(e) {
    return f.skin ? " " + f.skin + " " + f.skin + "-" + e : "";
  };

  s.prompt = function (e, t) {
    var a = "";

    if ("function" == typeof (e = e || {}) && (t = e), e.area) {
      var o = e.area;
      a = 'style="width: ' + o[0] + "; height: " + o[1] + ';"', delete e.area;
    }

    var r,
        l = 2 == e.formType ? '<textarea class="layui-layer-input"' + a + "></textarea>" : '<input type="' + (1 == e.formType ? "password" : "text") + '" class="layui-layer-input">',
        f = e.success;
    return delete e.success, s.open(i.extend({
      type: 1,
      btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
      content: l,
      skin: "layui-layer-prompt" + c("prompt"),
      maxWidth: n.width(),
      success: function success(t) {
        (r = t.find(".layui-layer-input")).val(e.value || "").focus(), "function" == typeof f && f(t);
      },
      resize: !1,
      yes: function yes(i) {
        var n = r.val();
        "" === n ? r.focus() : n.length > (e.maxlength || 500) ? s.tips("&#x6700;&#x591A;&#x8F93;&#x5165;" + (e.maxlength || 500) + "&#x4E2A;&#x5B57;&#x6570;", r, {
          tips: 1
        }) : t && t(n, i, r);
      }
    }, e));
  }, s.tab = function (e) {
    var t = (e = e || {}).tab || {},
        n = "layui-this",
        a = e.success;
    return delete e.success, s.open(i.extend({
      type: 1,
      skin: "layui-layer-tab" + c("tab"),
      resize: !1,
      title: function () {
        var e = t.length,
            i = 1,
            n = "";
        if (e > 0) for (n = '<span class="layui-this">' + t[0].title + "</span>"; i < e; i++) {
          n += "<span>" + t[i].title + "</span>";
        }
        return n;
      }(),
      content: '<ul class="layui-layer-tabmain">' + function () {
        var e = t.length,
            i = 1,
            n = "";
        if (e > 0) for (n = '<li class="layui-layer-tabli layui-this">' + (t[0].content || "no content") + "</li>"; i < e; i++) {
          n += '<li class="layui-layer-tabli">' + (t[i].content || "no  content") + "</li>";
        }
        return n;
      }() + "</ul>",
      success: function success(t) {
        var o = t.find(".layui-layer-title").children(),
            s = t.find(".layui-layer-tabmain").children();
        o.on("mousedown", function (t) {
          t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0;
          var a = i(this),
              o = a.index();
          a.addClass(n).siblings().removeClass(n), s.eq(o).show().siblings().hide(), "function" == typeof e.change && e.change(o);
        }), "function" == typeof a && a(t);
      }
    }, e));
  }, s.photos = function (t, n, a) {
    var o = {};

    if ((t = t || {}).photos) {
      var r = t.photos.constructor === Object,
          l = r ? t.photos : {},
          f = l.data || [],
          u = l.start || 0;
      o.imgIndex = 1 + (0 | u), t.img = t.img || "img";
      var d = t.success;

      if (delete t.success, r) {
        if (0 === f.length) return s.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;");
      } else {
        var y = i(t.photos),
            p = function p() {
          f = [], y.find(t.img).each(function (e) {
            var t = i(this);
            t.attr("layer-index", e), f.push({
              alt: t.attr("alt"),
              pid: t.attr("layer-pid"),
              src: t.attr("layer-src") || t.attr("src"),
              thumb: t.attr("src")
            });
          });
        };

        if (p(), 0 === f.length) return;
        if (n || y.on("click", t.img, function () {
          var e = i(this).attr("layer-index");
          s.photos(i.extend(t, {
            photos: {
              start: e,
              data: f,
              tab: t.tab
            },
            full: t.full
          }), !0), p();
        }), !n) return;
      }

      o.imgprev = function (e) {
        o.imgIndex--, o.imgIndex < 1 && (o.imgIndex = f.length), o.tabimg(e);
      }, o.imgnext = function (e, t) {
        o.imgIndex++, o.imgIndex > f.length && (o.imgIndex = 1, t) || o.tabimg(e);
      }, o.keyup = function (e) {
        if (!o.end) {
          var t = e.keyCode;
          e.preventDefault(), 37 === t ? o.imgprev(!0) : 39 === t ? o.imgnext(!0) : 27 === t && s.close(o.index);
        }
      }, o.tabimg = function (e) {
        if (!(f.length <= 1)) return l.start = o.imgIndex - 1, s.close(o.index), s.photos(t, !0, e);
      }, o.event = function () {
        o.bigimg.hover(function () {
          o.imgsee.show();
        }, function () {
          o.imgsee.hide();
        }), o.bigimg.find(".layui-layer-imgprev").on("click", function (e) {
          e.preventDefault(), o.imgprev();
        }), o.bigimg.find(".layui-layer-imgnext").on("click", function (e) {
          e.preventDefault(), o.imgnext();
        }), i(document).on("keyup", o.keyup);
      }, o.loadi = s.load(1, {
        shade: !("shade" in t) && .9,
        scrollbar: !1
      }), function (e, t, i) {
        var n = new Image();
        if (n.src = e, n.complete) return t(n);
        n.onload = function () {
          n.onload = null, t(n);
        }, n.onerror = function (e) {
          n.onerror = null, i(e);
        };
      }(f[u].src, function (n) {
        s.close(o.loadi), o.index = s.open(i.extend({
          type: 1,
          id: "layui-layer-photos",
          area: function () {
            var a = [n.width, n.height],
                o = [i(e).width() - 100, i(e).height() - 100];

            if (!t.full && (a[0] > o[0] || a[1] > o[1])) {
              var s = [a[0] / o[0], a[1] / o[1]];
              s[0] > s[1] ? (a[0] = a[0] / s[0], a[1] = a[1] / s[0]) : s[0] < s[1] && (a[0] = a[0] / s[1], a[1] = a[1] / s[1]);
            }

            return [a[0] + "px", a[1] + "px"];
          }(),
          title: !1,
          shade: .9,
          shadeClose: !0,
          closeBtn: !1,
          move: ".layui-layer-phimg img",
          moveType: 1,
          scrollbar: !1,
          moveOut: !0,
          isOutAnim: !1,
          skin: "layui-layer-photos" + c("photos"),
          content: '<div class="layui-layer-phimg"><img src="' + f[u].src + '" alt="' + (f[u].alt || "") + '" layer-pid="' + f[u].pid + '"><div class="layui-layer-imgsee">' + (f.length > 1 ? '<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>' : "") + '<div class="layui-layer-imgbar" style="display:' + (a ? "block" : "") + '"><span class="layui-layer-imgtit"><a href="javascript:;">' + (f[u].alt || "") + "</a><em>" + o.imgIndex + "/" + f.length + "</em></span></div></div></div>",
          success: function success(e, i) {
            o.bigimg = e.find(".layui-layer-phimg"), o.imgsee = e.find(".layui-layer-imguide,.layui-layer-imgbar"), o.event(e), t.tab && t.tab(f[u], e), "function" == typeof d && d(e);
          },
          end: function end() {
            o.end = !0, i(document).off("keyup", o.keyup);
          }
        }, t));
      }, function () {
        s.close(o.loadi), s.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;", {
          time: 3e4,
          btn: ["&#x4E0B;&#x4E00;&#x5F20;", "&#x4E0D;&#x770B;&#x4E86;"],
          yes: function yes() {
            f.length > 1 && o.imgnext(!0, !0);
          }
        });
      });
    }
  }, o.run = function (t) {
    n = (i = t)(e), l.html = i("html"), s.open = function (e) {
      return new r(e).index;
    };
  }, e.layui && layui.define ? (s.ready(), layui.define("jquery", function (t) {
    s.path = layui.cache.dir, o.run(layui.$), e.layer = s, t("layer", s);
  })) : "function" == typeof define && define.amd ? define(["jquery"], function () {
    return o.run(e.jQuery), s;
  }) : (o.run(e.jQuery), s.ready());
}(window);
layui.define("jquery", function (t) {
  "use strict";

  var a = layui.$,
      i = (layui.hint(), layui.device()),
      e = "element",
      l = "layui-this",
      n = "layui-show",
      s = function s() {
    this.config = {};
  };

  s.prototype.set = function (t) {
    return a.extend(!0, this.config, t), this;
  }, s.prototype.on = function (t, a) {
    return layui.onevent.call(this, e, t, a);
  }, s.prototype.tabAdd = function (t, i) {
    var e = a(".layui-tab[lay-filter=" + t + "]"),
        l = e.children(".layui-tab-title"),
        n = l.children(".layui-tab-bar"),
        s = e.children(".layui-tab-content"),
        o = '<li lay-id="' + (i.id || "") + '"' + (i.attr ? ' lay-attr="' + i.attr + '"' : "") + ">" + (i.title || "unnaming") + "</li>";
    return n[0] ? n.before(o) : l.append(o), s.append('<div class="layui-tab-item">' + (i.content || "") + "</div>"), d.hideTabMore(!0), d.tabAuto(), this;
  }, s.prototype.tabDelete = function (t, i) {
    var e = a(".layui-tab[lay-filter=" + t + "]").children(".layui-tab-title").find('>li[lay-id="' + i + '"]');
    return d.tabDelete(null, e), this;
  }, s.prototype.tabChange = function (t, i) {
    var e = a(".layui-tab[lay-filter=" + t + "]").children(".layui-tab-title").find('>li[lay-id="' + i + '"]');
    return d.tabClick.call(e[0], null, null, e), this;
  }, s.prototype.tab = function (t) {
    t = t || {}, f.on("click", t.headerElem, function (i) {
      var e = a(this).index();
      d.tabClick.call(this, i, e, null, t);
    });
  }, s.prototype.progress = function (t, i) {
    var e = "layui-progress",
        l = a("." + e + "[lay-filter=" + t + "]").find("." + e + "-bar"),
        n = l.find("." + e + "-text");
    return l.css("width", i), n.text(i), this;
  };
  var o = "layui-nav-item",
      r = "layui-nav-tree",
      c = "layui-nav-child",
      u = "layui-nav-more",
      y = "layui-anim layui-anim-upbit",
      d = {
    tabClick: function tabClick(t, i, s, o) {
      o = o || {};
      var r = s || a(this),
          c = (i = i || r.parent().children("li").index(r), o.headerElem ? r.parent() : r.parents(".layui-tab").eq(0)),
          u = o.bodyElem ? a(o.bodyElem) : c.children(".layui-tab-content").children(".layui-tab-item"),
          y = r.find("a"),
          d = c.attr("lay-filter");
      "javascript:;" !== y.attr("href") && "_blank" === y.attr("target") || (r.addClass(l).siblings().removeClass(l), u.eq(i).addClass(n).siblings().removeClass(n)), layui.event.call(this, e, "tab(" + d + ")", {
        elem: c,
        index: i
      });
    },
    tabDelete: function tabDelete(t, i) {
      var n = i || a(this).parent(),
          s = n.index(),
          o = n.parents(".layui-tab").eq(0),
          r = o.children(".layui-tab-content").children(".layui-tab-item"),
          c = o.attr("lay-filter");
      n.hasClass(l) && (n.next()[0] ? d.tabClick.call(n.next()[0], null, s + 1) : n.prev()[0] && d.tabClick.call(n.prev()[0], null, s - 1)), n.remove(), r.eq(s).remove(), setTimeout(function () {
        d.tabAuto();
      }, 50), layui.event.call(this, e, "tabDelete(" + c + ")", {
        elem: o,
        index: s
      });
    },
    tabAuto: function tabAuto() {
      var t = this;
      a(".layui-tab").each(function () {
        var e = a(this),
            l = e.children(".layui-tab-title"),
            n = (e.children(".layui-tab-content").children(".layui-tab-item"), 'lay-stope="tabmore"'),
            s = a('<span class="layui-unselect layui-tab-bar" ' + n + "><i " + n + ' class="layui-icon">&#xe61a;</i></span>');
        if (t === window && 8 != i.ie && d.hideTabMore(!0), e.attr("lay-allowClose") && l.find("li").each(function () {
          var t = a(this);

          if (!t.find(".layui-tab-close")[0]) {
            var i = a('<i class="layui-icon layui-unselect layui-tab-close">&#x1006;</i>');
            i.on("click", d.tabDelete), t.append(i);
          }
        }), "string" != typeof e.attr("lay-unauto")) if (l.prop("scrollWidth") > l.outerWidth() + 1) {
          if (l.find(".layui-tab-bar")[0]) return;
          l.append(s), e.attr("overflow", ""), s.on("click", function (t) {
            l[this.title ? "removeClass" : "addClass"]("layui-tab-more"), this.title = this.title ? "" : "收缩";
          });
        } else l.find(".layui-tab-bar").remove(), e.removeAttr("overflow");
      });
    },
    hideTabMore: function hideTabMore(t) {
      var i = a(".layui-tab-title");
      !0 !== t && "tabmore" === a(t.target).attr("lay-stope") || (i.removeClass("layui-tab-more"), i.find(".layui-tab-bar").attr("title", ""));
    },
    clickThis: function clickThis() {
      var t = a(this),
          i = t.parents(".layui-nav"),
          n = i.attr("lay-filter"),
          s = t.parent(),
          u = t.siblings("." + c),
          d = "string" == typeof s.attr("lay-unselect");
      "javascript:;" !== t.attr("href") && "_blank" === t.attr("target") || d || u[0] || (i.find("." + l).removeClass(l), s.addClass(l)), i.hasClass(r) && (u.removeClass(y), u[0] && (s["none" === u.css("display") ? "addClass" : "removeClass"](o + "ed"), "all" === i.attr("lay-shrink") && s.siblings().removeClass(o + "ed"))), layui.event.call(this, e, "nav(" + n + ")", t);
    },
    collapse: function collapse() {
      var t = a(this),
          i = t.find(".layui-colla-icon"),
          l = t.siblings(".layui-colla-content"),
          s = t.parents(".layui-collapse").eq(0),
          o = s.attr("lay-filter"),
          r = "none" === l.css("display");

      if ("string" == typeof s.attr("lay-accordion")) {
        var c = s.children(".layui-colla-item").children("." + n);
        c.siblings(".layui-colla-title").children(".layui-colla-icon").html("&#xe602;"), c.removeClass(n);
      }

      l[r ? "addClass" : "removeClass"](n), i.html(r ? "&#xe61a;" : "&#xe602;"), layui.event.call(this, e, "collapse(" + o + ")", {
        title: t,
        content: l,
        show: r
      });
    }
  };
  s.prototype.init = function (t, e) {
    var l = e ? '[lay-filter="' + e + '"]' : "",
        s = {
      tab: function tab() {
        d.tabAuto.call({});
      },
      nav: function nav() {
        var t = {},
            e = {},
            s = {};
        a(".layui-nav" + l).each(function (l) {
          var h = a(this),
              f = a('<span class="layui-nav-bar"></span>'),
              p = h.find("." + o);
          h.find(".layui-nav-bar")[0] || (h.append(f), p.on("mouseenter", function () {
            (function (l, o, d) {
              var h = a(this),
                  f = h.find("." + c);
              o.hasClass(r) ? l.css({
                top: h.position().top,
                height: h.children("a").outerHeight(),
                opacity: 1
              }) : (f.addClass(y), l.css({
                left: h.position().left + parseFloat(h.css("marginLeft")),
                top: h.position().top + h.height() - l.height()
              }), t[d] = setTimeout(function () {
                l.css({
                  width: h.width(),
                  opacity: 1
                });
              }, i.ie && i.ie < 10 ? 0 : 200), clearTimeout(s[d]), "block" === f.css("display") && clearTimeout(e[d]), e[d] = setTimeout(function () {
                f.addClass(n), h.find("." + u).addClass(u + "d");
              }, 300));
            }).call(this, f, h, l);
          }).on("mouseleave", function () {
            h.hasClass(r) || (clearTimeout(e[l]), e[l] = setTimeout(function () {
              h.find("." + c).removeClass(n), h.find("." + u).removeClass(u + "d");
            }, 300));
          }), h.on("mouseleave", function () {
            clearTimeout(t[l]), s[l] = setTimeout(function () {
              h.hasClass(r) ? f.css({
                height: 0,
                top: f.position().top + f.height() / 2,
                opacity: 0
              }) : f.css({
                width: 0,
                left: f.position().left + f.width() / 2,
                opacity: 0
              });
            }, 200);
          })), p.find("a").each(function () {
            var t = a(this);
            t.parent();
            t.siblings("." + c)[0] && !t.children("." + u)[0] && t.append('<span class="' + u + '"></span>'), t.off("click", d.clickThis).on("click", d.clickThis);
          });
        });
      },
      breadcrumb: function breadcrumb() {
        a(".layui-breadcrumb" + l).each(function () {
          var t = a(this),
              i = "lay-separator",
              e = t.attr(i) || "/",
              l = t.find("a");
          l.next("span[" + i + "]")[0] || (l.each(function (t) {
            t !== l.length - 1 && a(this).after("<span " + i + ">" + e + "</span>");
          }), t.css("visibility", "visible"));
        });
      },
      progress: function progress() {
        a(".layui-progress" + l).each(function () {
          var t = a(this),
              i = t.find(".layui-progress-bar"),
              e = i.attr("lay-percent");
          i.css("width", /^.+\/.+$/.test(e) ? 100 * new Function("return " + e)() + "%" : e), t.attr("lay-showPercent") && setTimeout(function () {
            i.html('<span class="layui-progress-text">' + e + "</span>");
          }, 350);
        });
      },
      collapse: function collapse() {
        a(".layui-collapse" + l).each(function () {
          a(this).find(".layui-colla-item").each(function () {
            var t = a(this),
                i = t.find(".layui-colla-title"),
                e = "none" === t.find(".layui-colla-content").css("display");
            i.find(".layui-colla-icon").remove(), i.append('<i class="layui-icon layui-colla-icon">' + (e ? "&#xe602;" : "&#xe61a;") + "</i>"), i.off("click", d.collapse).on("click", d.collapse);
          });
        });
      }
    };
    return s[t] ? s[t]() : layui.each(s, function (t, a) {
      a();
    });
  }, s.prototype.render = s.prototype.init;
  var h = new s(),
      f = a(document);
  h.render();
  f.on("click", ".layui-tab-title li", d.tabClick), f.on("click", d.hideTabMore), a(window).on("resize", d.tabAuto), t(e, h);
});
layui.define("layer", function (e) {
  "use strict";

  var i = layui.$,
      t = layui.layer,
      n = layui.hint(),
      o = layui.device(),
      a = {
    config: {},
    set: function set(e) {
      return this.config = i.extend({}, this.config, e), this;
    },
    on: function on(e, i) {
      return layui.onevent.call(this, l, e, i);
    }
  },
      l = "upload",
      r = "layui-upload-form",
      u = "layui-upload-iframe",
      c = "layui-upload-choose",
      s = function s(e) {
    this.config = i.extend({}, this.config, a.config, e), this.render();
  };

  s.prototype.config = {
    accept: "images",
    exts: "",
    auto: !0,
    bindAction: "",
    url: "",
    field: "file",
    method: "post",
    data: {},
    drag: !0,
    size: 0,
    number: 0,
    multiple: !1
  }, s.prototype.render = function (e) {
    (e = this.config).elem = i(e.elem), e.bindAction = i(e.bindAction), this.file(), this.events();
  }, s.prototype.file = function () {
    var e = this.config,
        t = this.elemFile = i(['<input class="layui-upload-file" type="file" accept="' + e.acceptMime + '" name="' + e.field + '"', e.multiple ? " multiple" : "", ">"].join("")),
        n = e.elem.next();
    (n.hasClass("layui-upload-file") || n.hasClass(r)) && n.remove(), o.ie && o.ie < 10 && e.elem.wrap('<div class="layui-upload-wrap"></div>'), this.isFile() ? (this.elemFile = e.elem, e.field = e.elem[0].name) : e.elem.after(t), o.ie && o.ie < 10 && this.initIE();
  }, s.prototype.initIE = function () {
    var e = this.config,
        t = i('<iframe id="' + u + '" class="' + u + '" name="' + u + '" frameborder="0"></iframe>'),
        n = i(['<form target="' + u + '" class="' + r + '" method="post" key="set-mine" enctype="multipart/form-data" action="' + e.url + '">', "</form>"].join(""));
    i("#" + u)[0] || i("body").append(t), e.elem.next().hasClass(r) || (this.elemFile.wrap(n), e.elem.next("." + r).append(function () {
      var i = [];
      return layui.each(e.data, function (e, t) {
        t = "function" == typeof t ? t() : t, i.push('<input type="hidden" name="' + e + '" value="' + t + '">');
      }), i.join("");
    }()));
  }, s.prototype.msg = function (e) {
    return t.msg(e, {
      icon: 2,
      shift: 6
    });
  }, s.prototype.isFile = function () {
    var e = this.config.elem[0];
    if (e) return "input" === e.tagName.toLocaleLowerCase() && "file" === e.type;
  }, s.prototype.preview = function (e) {
    window.FileReader && layui.each(this.chooseFiles, function (i, t) {
      var n = new FileReader();
      n.readAsDataURL(t), n.onload = function () {
        e && e(i, t, this.result);
      };
    });
  }, s.prototype.upload = function (e, t) {
    var n,
        a = this,
        l = a.config,
        r = a.elemFile[0],
        f = function f() {
      var t = 0,
          n = 0,
          o = e || a.files || a.chooseFiles || r.files,
          u = function u() {
        l.multiple && t + n === a.fileLength && "function" == typeof l.allDone && l.allDone({
          total: a.fileLength,
          successful: t,
          aborted: n
        });
      };

      layui.each(o, function (e, o) {
        var r = new FormData();
        r.append(l.field, o), layui.each(l.data, function (e, i) {
          i = "function" == typeof i ? i() : i, r.append(e, i);
        }), i.ajax({
          url: l.url,
          type: "post",
          data: r,
          contentType: !1,
          processData: !1,
          dataType: "json",
          headers: l.headers || {},
          success: function success(i) {
            t++, p(e, i), u();
          },
          error: function error() {
            n++, a.msg("请求上传接口出现异常"), d(e), u();
          }
        });
      });
    },
        p = function p(e, i) {
      if (a.elemFile.next("." + c).remove(), r.value = "", "object" != _typeof(i)) try {
        i = JSON.parse(i);
      } catch (e) {
        return i = {}, a.msg("请对上传接口返回有效JSON");
      }
      "function" == typeof l.done && l.done(i, e || 0, function (e) {
        a.upload(e);
      });
    },
        d = function d(e) {
      l.auto && (r.value = ""), "function" == typeof l.error && l.error(e || 0, function (e) {
        a.upload(e);
      });
    },
        h = l.exts,
        m = function () {
      var i = [];
      return layui.each(e || a.chooseFiles, function (e, t) {
        i.push(t.name);
      }), i;
    }(),
        v = {
      preview: function preview(e) {
        a.preview(e);
      },
      upload: function upload(e, i) {
        var t = {};
        t[e] = i, a.upload(t);
      },
      pushFile: function pushFile() {
        return a.files = a.files || {}, layui.each(a.chooseFiles, function (e, i) {
          a.files[e] = i;
        }), a.files;
      },
      resetFile: function resetFile(e, i, t) {
        var n = new File([i], t);
        a.files = a.files || {}, a.files[e] = n;
      }
    };

    if (0 !== (m = 0 === m.length ? r.value.match(/[^\/\\]+\..+/g) || [] || "" : m).length) {
      switch (l.accept) {
        case "file":
          if (h && !RegExp("\\w\\.(" + h + ")$", "i").test(escape(m))) return a.msg("选择的文件中包含不支持的格式"), r.value = "";
          break;

        case "video":
          if (!RegExp("\\w\\.(" + (h || "avi|mp4|wma|rmvb|rm|flash|3gp|flv") + ")$", "i").test(escape(m))) return a.msg("选择的视频中包含不支持的格式"), r.value = "";
          break;

        case "audio":
          if (!RegExp("\\w\\.(" + (h || "mp3|wav|mid") + ")$", "i").test(escape(m))) return a.msg("选择的音频中包含不支持的格式"), r.value = "";
          break;

        default:
          if (layui.each(m, function (e, i) {
            RegExp("\\w\\.(" + (h || "jpg|png|gif|bmp|jpeg$") + ")", "i").test(escape(i)) || (n = !0);
          }), n) return a.msg("选择的图片中包含不支持的格式"), r.value = "";
      }

      if (a.fileLength = function () {
        var i = 0,
            t = e || a.files || a.chooseFiles || r.files;
        return layui.each(t, function () {
          i++;
        }), i;
      }(), l.number && a.fileLength > l.number) return a.msg("同时最多只能上传的数量为：" + l.number);

      if (l.size > 0 && !(o.ie && o.ie < 10)) {
        var g;
        if (layui.each(a.chooseFiles, function (e, i) {
          if (i.size > 1024 * l.size) {
            var t = l.size / 1024;
            t = t >= 1 ? t.toFixed(2) + "MB" : l.size + "KB", r.value = "", g = t;
          }
        }), g) return a.msg("文件不能超过" + g);
      }

      !function () {
        if ("choose" !== t && !l.auto || (l.choose && l.choose(v), "choose" !== t)) {
          if (l.before && l.before(v), o.ie) return o.ie > 9 ? f() : function () {
            var e = i("#" + u);
            a.elemFile.parent().submit(), clearInterval(s.timer), s.timer = setInterval(function () {
              var i,
                  t = e.contents().find("body");

              try {
                i = t.text();
              } catch (e) {
                a.msg("获取上传后的响应信息出现异常"), clearInterval(s.timer), d();
              }

              i && (clearInterval(s.timer), t.html(""), p(0, i));
            }, 30);
          }();
          f();
        }
      }();
    }
  }, s.prototype.events = function () {
    var e = this,
        t = e.config,
        a = function a(i) {
      e.chooseFiles = {}, layui.each(i, function (i, t) {
        var n = new Date().getTime();
        e.chooseFiles[n + "-" + i] = t;
      });
    },
        l = function l(i, n) {
      var o = e.elemFile,
          a = i.length > 1 ? i.length + "个文件" : (i[0] || {}).name || o[0].value.match(/[^\/\\]+\..+/g) || [] || "";
      o.next().hasClass(c) && o.next().remove(), e.upload(null, "choose"), e.isFile() || t.choose || o.after('<span class="layui-inline ' + c + '">' + a + "</span>");
    };

    t.elem.off("upload.start").on("upload.start", function () {
      var o = i(this),
          a = o.attr("lay-data");
      if (a) try {
        a = new Function("return " + a)(), e.config = i.extend({}, t, a);
      } catch (e) {
        n.error("Upload element property lay-data configuration item has a syntax error: " + a);
      }
      e.config.item = o, e.elemFile[0].click();
    }), o.ie && o.ie < 10 || t.elem.off("upload.over").on("upload.over", function () {
      i(this).attr("lay-over", "");
    }).off("upload.leave").on("upload.leave", function () {
      i(this).removeAttr("lay-over");
    }).off("upload.drop").on("upload.drop", function (n, o) {
      var r = i(this),
          u = o.originalEvent.dataTransfer.files || [];
      r.removeAttr("lay-over"), a(u), t.auto ? e.upload(u) : l(u);
    }), e.elemFile.off("upload.change").on("upload.change", function () {
      var i = this.files || [];
      a(i), t.auto ? e.upload() : l(i);
    }), t.bindAction.off("upload.action").on("upload.action", function () {
      e.upload();
    }), t.elem.data("haveEvents") || (e.elemFile.on("change", function () {
      i(this).trigger("upload.change");
    }), t.elem.on("click", function () {
      e.isFile() || i(this).trigger("upload.start");
    }), t.drag && t.elem.on("dragover", function (e) {
      e.preventDefault(), i(this).trigger("upload.over");
    }).on("dragleave", function (e) {
      i(this).trigger("upload.leave");
    }).on("drop", function (e) {
      e.preventDefault(), i(this).trigger("upload.drop", e);
    }), t.bindAction.on("click", function () {
      i(this).trigger("upload.action");
    }), t.elem.data("haveEvents", !0));
  }, a.render = function (e) {
    var i = new s(e);
    return function () {
      var e = this;
      return {
        upload: function upload(i) {
          e.upload.call(e, i);
        },
        config: e.config
      };
    }.call(i);
  }, e(l, a);
});
layui.define("jquery", function (e) {
  "use strict";

  var i = layui.jquery,
      t = {
    config: {},
    index: layui.slider ? layui.slider.index + 1e4 : 0,
    set: function set(e) {
      return this.config = i.extend({}, this.config, e), this;
    },
    on: function on(e, i) {
      return layui.onevent.call(this, a, e, i);
    }
  },
      a = "slider",
      n = "layui-slider-wrap",
      l = "layui-slider-wrap-btn",
      s = "layui-slider-tips",
      r = "layui-slider-input-txt",
      o = "layui-slider-input-btn",
      u = function u(e) {
    this.index = ++t.index, this.config = i.extend({}, this.config, t.config, e), this.render();
  };

  u.prototype.config = {
    type: "default",
    min: 0,
    max: 100,
    value: 0,
    step: 1,
    showstep: !1,
    tips: !0,
    input: !1,
    range: !1,
    height: 200,
    disabled: !1,
    theme: "#00ACAC"
  }, u.prototype.render = function () {
    var e = this,
        t = e.config;

    if (t.min = t.min < 0 ? 0 : t.min, t.range) {
      t.value = "object" == _typeof(t.value) ? t.value : [t.min, t.value];
      var a = Math.min(t.value[0], t.value[1]),
          o = Math.max(t.value[0], t.value[1]);
      t.value[0] = a > t.min ? a : t.min, t.value[1] = o > t.min ? o : t.min, t.value[0] = t.value[0] > t.max ? t.max : t.value[0], t.value[1] = t.value[1] > t.max ? t.max : t.value[1];
      var u = Math.floor((t.value[0] - t.min) / (t.max - t.min) * 100),
          d = Math.floor((t.value[1] - t.min) / (t.max - t.min) * 100),
          v = d - u + "%";
      u += "%", d += "%";
    } else {
      t.value = "object" == _typeof(t.value) ? Math.min(t.value[0], t.value[1]) : t.value, t.value = t.value > t.min ? t.value : t.min;
      v = Math.floor((t.value - t.min) / (t.max - t.min) * 100) + "%";
    }

    var c = t.disabled ? "#c2c2c2" : t.theme,
        f = '<div class="layui-slider ' + ("vertical" === t.type ? "layui-slider-vertical" : "") + '">' + (t.tips ? '<div class="layui-slider-tips"></div>' : "") + '<div class="layui-slider-bar" style="background:' + c + "; " + ("vertical" === t.type ? "height" : "width") + ":" + v + ";" + ("vertical" === t.type ? "bottom" : "left") + ":" + (u || 0) + ';"></div><div class="layui-slider-wrap" style="' + ("vertical" === t.type ? "bottom" : "left") + ":" + (u || v) + ';"><div class="layui-slider-wrap-btn" style="border: 2px solid ' + c + ';"></div></div>' + (t.range ? '<div class="layui-slider-wrap" style="' + ("vertical" === t.type ? "bottom" : "left") + ":" + d + ';"><div class="layui-slider-wrap-btn" style="border: 2px solid ' + c + ';"></div></div>' : "") + "</div>",
        m = i(t.elem),
        p = m.next(".layui-slider");

    if (p[0] && p.remove(), e.elemTemp = i(f), t.range ? (e.elemTemp.find("." + n).eq(0).data("value", t.value[0]), e.elemTemp.find("." + n).eq(1).data("value", t.value[1])) : e.elemTemp.find("." + n).data("value", t.value), m.html(e.elemTemp), "vertical" === t.type && e.elemTemp.height(t.height + "px"), t.showstep) {
      for (var h = (t.max - t.min) / t.step, y = "", g = 1; g < h + 1; g++) {
        var b = 100 * g / h;
        b < 100 && (y += '<div class="layui-slider-step" style="' + ("vertical" === t.type ? "bottom" : "left") + ":" + b + '%"></div>');
      }

      e.elemTemp.append(y);
    }

    if (t.input && !t.range) {
      var x = i('<div class="layui-slider-input layui-input"><div class="layui-slider-input-txt"><input type="text" class="layui-input"></div><div class="layui-slider-input-btn"><i class="layui-icon layui-icon-up"></i><i class="layui-icon layui-icon-down"></i></div></div>');
      m.css("position", "relative"), m.append(x), m.find("." + r).children("input").val(t.value), "vertical" === t.type ? x.css({
        left: 0,
        top: -48
      }) : e.elemTemp.css("margin-right", x.outerWidth() + 15);
    }

    t.disabled ? (e.elemTemp.addClass("layui-disabled"), e.elemTemp.find("." + l).addClass("layui-disabled")) : e.slide(), e.elemTemp.find("." + l).on("mouseover", function () {
      var a = "vertical" === t.type ? t.height : e.elemTemp[0].offsetWidth,
          l = e.elemTemp.find("." + n),
          r = ("vertical" === t.type ? a - i(this).parent()[0].offsetTop - l.height() : i(this).parent()[0].offsetLeft) / a * 100,
          o = i(this).parent().data("value"),
          u = t.setTips ? t.setTips(o) : o;
      e.elemTemp.find("." + s).html(u), "vertical" === t.type ? e.elemTemp.find("." + s).css({
        bottom: r + "%",
        "margin-bottom": "20px",
        display: "inline-block"
      }) : e.elemTemp.find("." + s).css({
        left: r + "%",
        display: "inline-block"
      });
    }).on("mouseout", function () {
      e.elemTemp.find("." + s).css("display", "none");
    });
  }, u.prototype.slide = function (e, t, a) {
    var u = this.config,
        d = this.elemTemp,
        v = function v() {
      return "vertical" === u.type ? u.height : d[0].offsetWidth;
    },
        c = d.find("." + n),
        f = d.next(".layui-slider-input"),
        m = f.children("." + r).children("input").val(),
        p = 100 / ((u.max - u.min) / Math.ceil(u.step)),
        h = function h(e, i) {
      e = (e = Math.ceil(e) * p > 100 ? Math.ceil(e) * p : Math.round(e) * p) > 100 ? 100 : e, c.eq(i).css("vertical" === u.type ? "bottom" : "left", e + "%");
      var t = y(c[0].offsetLeft),
          a = u.range ? y(c[1].offsetLeft) : 0;
      "vertical" === u.type ? (d.find("." + s).css({
        bottom: e + "%",
        "margin-bottom": "20px"
      }), t = y(v() - c[0].offsetTop - c.height()), a = u.range ? y(v() - c[1].offsetTop - c.height()) : 0) : d.find("." + s).css("left", e + "%"), t = t > 100 ? 100 : t, a = a > 100 ? 100 : a;
      var n = Math.min(t, a),
          l = Math.abs(t - a);
      "vertical" === u.type ? d.find(".layui-slider-bar").css({
        height: l + "%",
        bottom: n + "%"
      }) : d.find(".layui-slider-bar").css({
        width: l + "%",
        left: n + "%"
      });
      var o = u.min + Math.round((u.max - u.min) * e / 100);

      if (m = o, f.children("." + r).children("input").val(m), c.eq(i).data("value", o), o = u.setTips ? u.setTips(o) : o, d.find("." + s).html(o), u.range) {
        var h = [c.eq(0).data("value"), c.eq(1).data("value")];
        h[0] > h[1] && h.reverse();
      }

      u.change && u.change(u.range ? h : o);
    },
        y = function y(e) {
      var i = e / v() * 100 / p,
          t = Math.round(i) * p;
      return e == v() && (t = Math.ceil(i) * p), t;
    },
        g = i(['<div class="layui-auxiliar-moving" id="LAY-slider-moving"></div'].join(""));

    if ("set" === e) return h(t, a);
    d.find("." + l).each(function (e) {
      var t = i(this);
      t.on("mousedown", function (a) {
        a = a || window.event;
        var n = t.parent()[0].offsetLeft,
            l = a.clientX;
        "vertical" === u.type && (n = v() - t.parent()[0].offsetTop - c.height(), l = a.clientY);
        !function (e, t) {
          var a = function a() {
            t && t(), g.remove();
          };

          i("#LAY-slider-moving")[0] || i("body").append(g), g.on("mousemove", e), g.on("mouseup", a).on("mouseleave", a);
        }(function (i) {
          i = i || window.event;
          var a = n + ("vertical" === u.type ? l - i.clientY : i.clientX - l);
          a < 0 && (a = 0), a > v() && (a = v());
          var r = a / v() * 100 / p;
          h(r, e), t.addClass("layui-slider-hover"), d.find("." + s).show(), i.preventDefault();
        }, function () {
          t.removeClass("layui-slider-hover"), d.find("." + s).hide();
        });
      });
    }), d.on("click", function (e) {
      var t = i("." + l);

      if (!t.is(event.target) && 0 === t.has(event.target).length && t.length) {
        var a,
            n = "vertical" === u.type ? v() - e.clientY + i(this).offset().top : e.clientX - i(this).offset().left;
        n < 0 && (n = 0), n > v() && (n = v());
        var s = n / v() * 100 / p;
        a = u.range ? "vertical" === u.type ? Math.abs(n - parseInt(i(c[0]).css("bottom"))) > Math.abs(n - parseInt(i(c[1]).css("bottom"))) ? 1 : 0 : Math.abs(n - c[0].offsetLeft) > Math.abs(n - c[1].offsetLeft) ? 1 : 0 : 0, h(s, a), e.preventDefault();
      }
    }), f.hover(function () {
      i(this).children("." + o).fadeIn("fast");
    }, function () {
      i(this).children("." + o).fadeOut("fast");
    }), f.children("." + o).children("i").each(function (e) {
      i(this).on("click", function () {
        var i = ((m = 1 == e ? m - p < u.min ? u.min : m - p : Number(m) + p > u.max ? u.max : Number(m) + p) - u.min) / (u.max - u.min) * 100 / p;
        h(i, 0);
      });
    });

    var b = function b() {
      var e = this.value;
      e = (e = (e = isNaN(e) ? 0 : e) < u.min ? u.min : e) > u.max ? u.max : e, this.value = e;
      var i = (e - u.min) / (u.max - u.min) * 100 / p;
      h(i, 0);
    };

    f.children("." + r).children("input").on("keydown", function (e) {
      13 === e.keyCode && (e.preventDefault(), b.call(this));
    }).on("change", b);
  }, u.prototype.events = function () {
    this.config;
  }, t.render = function (e) {
    var i = new u(e);
    return function () {
      var e = this;
      return {
        setValue: function setValue(i, t) {
          return e.slide("set", i, t || 0);
        },
        config: e.config
      };
    }.call(i);
  }, e(a, t);
});
layui.define("jquery", function (e) {
  "use strict";

  var i = layui.jquery,
      o = {
    config: {},
    index: layui.colorpicker ? layui.colorpicker.index + 1e4 : 0,
    set: function set(e) {
      return this.config = i.extend({}, this.config, e), this;
    },
    on: function on(e, i) {
      return layui.onevent.call(this, "colorpicker", e, i);
    }
  },
      t = ".layui-colorpicker-main",
      r = "layui-icon-down",
      n = "layui-icon-close",
      l = "layui-colorpicker-trigger-span",
      c = "layui-colorpicker-trigger-i",
      s = "layui-colorpicker-side-slider",
      a = "layui-colorpicker-basis",
      f = "layui-colorpicker-alpha-bgcolor",
      d = "layui-colorpicker-alpha-slider",
      u = "layui-colorpicker-basis-cursor",
      h = "layui-colorpicker-main-input",
      p = function p(e) {
    var i = {
      h: 0,
      s: 0,
      b: 0
    },
        o = Math.min(e.r, e.g, e.b),
        t = Math.max(e.r, e.g, e.b),
        r = t - o;
    return i.b = t, i.s = 0 != t ? 255 * r / t : 0, 0 != i.s ? e.r == t ? i.h = (e.g - e.b) / r : e.g == t ? i.h = 2 + (e.b - e.r) / r : i.h = 4 + (e.r - e.g) / r : i.h = -1, t == o && (i.h = 0), i.h *= 60, i.h < 0 && (i.h += 360), i.s *= 100 / 255, i.b *= 100 / 255, i;
  },
      g = function g(e) {
    var i = {},
        o = e.h,
        t = 255 * e.s / 100,
        r = 255 * e.b / 100;
    if (0 == t) i.r = i.g = i.b = r;else {
      var n = r,
          l = (255 - t) * r / 255,
          c = o % 60 * (n - l) / 60;
      360 == o && (o = 0), o < 60 ? (i.r = n, i.b = l, i.g = l + c) : o < 120 ? (i.g = n, i.b = l, i.r = n - c) : o < 180 ? (i.g = n, i.r = l, i.b = l + c) : o < 240 ? (i.b = n, i.r = l, i.g = n - c) : o < 300 ? (i.b = n, i.g = l, i.r = l + c) : o < 360 ? (i.r = n, i.g = l, i.b = n - c) : (i.r = 0, i.g = 0, i.b = 0);
    }
    return {
      r: Math.round(i.r),
      g: Math.round(i.g),
      b: Math.round(i.b)
    };
  },
      v = function v(e) {
    var o = g(e),
        t = [o.r.toString(16), o.g.toString(16), o.b.toString(16)];
    return i.each(t, function (e, i) {
      1 == i.length && (t[e] = "0" + i);
    }), t.join("");
  },
      m = function m(e) {
    var i = e.match(/[0-9]{1,3}/g) || [];
    return {
      r: i[0],
      g: i[1],
      b: i[2]
    };
  },
      b = i(window),
      k = i(document),
      y = function y(e) {
    this.index = ++o.index, this.config = i.extend({}, this.config, o.config, e), this.render();
  };

  y.prototype.config = {
    color: "",
    size: null,
    alpha: !1,
    format: "hex",
    predefine: !1,
    colors: ["#00ACAC", "#5FB878", "#1E9FFF", "#FF5722", "#FFB800", "#01AAED", "#999", "#c00", "#ff8c00", "#ffd700", "#90ee90", "#00ced1", "#1e90ff", "#c71585", "rgb(0, 186, 189)", "rgb(255, 120, 0)", "rgb(250, 212, 0)", "#393D49", "rgba(0,0,0,.5)", "rgba(255, 69, 0, 0.68)", "rgba(144, 240, 144, 0.5)", "rgba(31, 147, 255, 0.73)"]
  }, y.prototype.render = function () {
    var e = this.config,
        o = i(['<div class="layui-unselect layui-colorpicker">', "<span " + ("rgb" == e.format && e.alpha ? 'class="layui-colorpicker-trigger-bgcolor"' : "") + ">", '<span class="layui-colorpicker-trigger-span" ', 'lay-type="' + ("rgb" == e.format ? e.alpha ? "rgba" : "torgb" : "") + '" ', 'style="' + function () {
      var i = "";
      return e.color ? (i = e.color, (e.color.match(/[0-9]{1,3}/g) || []).length > 3 && (e.alpha && "rgb" == e.format || (i = "#" + v(p(m(e.color))))), "background: " + i) : i;
    }() + '">', '<i class="layui-icon layui-colorpicker-trigger-i ' + (e.color ? r : n) + '"></i>', "</span>", "</span>", "</div>"].join("")),
        t = i(e.elem);
    e.size && o.addClass("layui-colorpicker-" + e.size), t.addClass("layui-inline").html(this.elemColorBox = o), this.color = this.elemColorBox.find("." + l)[0].style.background, this.events();
  }, y.prototype.renderPicker = function () {
    var e = this.config,
        o = this.elemColorBox[0],
        r = this.elemPicker = i(['<div id="layui-colorpicker' + this.index + '" data-index="' + this.index + '" class="layui-anim layui-anim-upbit layui-colorpicker-main">', '<div class="layui-colorpicker-main-wrapper">', '<div class="layui-colorpicker-basis">', '<div class="layui-colorpicker-basis-white"></div>', '<div class="layui-colorpicker-basis-black"></div>', '<div class="layui-colorpicker-basis-cursor"></div>', "</div>", '<div class="layui-colorpicker-side">', '<div class="layui-colorpicker-side-slider"></div>', "</div>", "</div>", '<div class="layui-colorpicker-main-alpha ' + (e.alpha ? "layui-show" : "") + '">', '<div class="layui-colorpicker-alpha-bgcolor">', '<div class="layui-colorpicker-alpha-slider"></div>', "</div>", "</div>", function () {
      if (e.predefine) {
        var i = ['<div class="layui-colorpicker-main-pre">'];
        return layui.each(e.colors, function (e, o) {
          i.push(['<div class="layui-colorpicker-pre' + ((o.match(/[0-9]{1,3}/g) || []).length > 3 ? " layui-colorpicker-pre-isalpha" : "") + '">', '<div style="background:' + o + '"></div>', "</div>"].join(""));
        }), i.push("</div>"), i.join("");
      }

      return "";
    }(), '<div class="layui-colorpicker-main-input">', '<div class="layui-inline">', '<input type="text" class="layui-input">', "</div>", '<div class="layui-btn-container">', '<button class="layui-btn layui-btn-primary layui-btn-sm" colorpicker-events="clear">清空</button>', '<button class="layui-btn layui-btn-sm" colorpicker-events="confirm">确定</button>', "</div", "</div>", "</div>"].join(""));
    this.elemColorBox.find("." + l)[0];
    i(t)[0] && i(t).data("index") == this.index ? this.removePicker(y.thisElemInd) : (this.removePicker(y.thisElemInd), i("body").append(r)), y.thisElemInd = this.index, y.thisColor = o.style.background, this.position(), this.pickerEvents();
  }, y.prototype.removePicker = function (e) {
    this.config;
    return i("#layui-colorpicker" + (e || this.index)).remove(), this;
  }, y.prototype.position = function () {
    var e = this.config,
        i = this.bindElem || this.elemColorBox[0],
        o = this.elemPicker[0],
        t = i.getBoundingClientRect(),
        r = o.offsetWidth,
        n = o.offsetHeight,
        l = function l(e) {
      return e = e ? "scrollLeft" : "scrollTop", document.body[e] | document.documentElement[e];
    },
        c = function c(e) {
      return document.documentElement[e ? "clientWidth" : "clientHeight"];
    },
        s = t.left,
        a = t.bottom;

    a += 5, (s -= (r - i.offsetWidth) / 2) + r + 5 > c("width") ? s = c("width") - r - 5 : s < 5 && (s = 5), a + n + 5 > c() && (a = t.top > n ? t.top - n : c() - n, a -= 10), e.position && (o.style.position = e.position), o.style.left = s + ("fixed" === e.position ? 0 : l(1)) + "px", o.style.top = a + ("fixed" === e.position ? 0 : l()) + "px";
  }, y.prototype.val = function () {
    this.config;
    var e = this.elemColorBox.find("." + l),
        i = this.elemPicker.find("." + h),
        o = e[0].style.backgroundColor;

    if (o) {
      var t = p(m(o)),
          r = e.attr("lay-type");

      if (this.select(t.h, t.s, t.b), "torgb" === r && i.find("input").val(o), "rgba" === r) {
        var n = m(o);
        if (3 == (o.match(/[0-9]{1,3}/g) || []).length) i.find("input").val("rgba(" + n.r + ", " + n.g + ", " + n.b + ", 1)"), this.elemPicker.find("." + d).css("left", 280);else {
          i.find("input").val(o);
          var c = 280 * o.slice(o.lastIndexOf(",") + 1, o.length - 1);
          this.elemPicker.find("." + d).css("left", c);
        }
        this.elemPicker.find("." + f)[0].style.background = "linear-gradient(to right, rgba(" + n.r + ", " + n.g + ", " + n.b + ", 0), rgb(" + n.r + ", " + n.g + ", " + n.b + "))";
      }
    } else this.select(0, 100, 100), i.find("input").val(""), this.elemPicker.find("." + f)[0].style.background = "", this.elemPicker.find("." + d).css("left", 280);
  }, y.prototype.side = function () {
    var e = this,
        o = e.config,
        t = e.elemColorBox.find("." + l),
        v = t.attr("lay-type"),
        k = e.elemPicker.find(".layui-colorpicker-side"),
        y = e.elemPicker.find("." + s),
        x = e.elemPicker.find("." + a),
        C = e.elemPicker.find("." + u),
        P = e.elemPicker.find("." + f),
        B = e.elemPicker.find("." + d),
        w = y[0].offsetTop / 180 * 360,
        D = 100 - (C[0].offsetTop + 3) / 180 * 100,
        E = (C[0].offsetLeft + 3) / 260 * 100,
        H = Math.round(B[0].offsetLeft / 280 * 100) / 100,
        W = e.elemColorBox.find("." + c),
        j = e.elemPicker.find(".layui-colorpicker-pre").children("div"),
        F = function F(i, l, c, s) {
      e.select(i, l, c);
      var a = g({
        h: i,
        s: l,
        b: c
      });

      if (W.addClass(r).removeClass(n), t[0].style.background = "rgb(" + a.r + ", " + a.g + ", " + a.b + ")", "torgb" === v && e.elemPicker.find("." + h).find("input").val("rgb(" + a.r + ", " + a.g + ", " + a.b + ")"), "rgba" === v) {
        var f = 0;
        f = 280 * s, B.css("left", f), e.elemPicker.find("." + h).find("input").val("rgba(" + a.r + ", " + a.g + ", " + a.b + ", " + s + ")"), t[0].style.background = "rgba(" + a.r + ", " + a.g + ", " + a.b + ", " + s + ")", P[0].style.background = "linear-gradient(to right, rgba(" + a.r + ", " + a.g + ", " + a.b + ", 0), rgb(" + a.r + ", " + a.g + ", " + a.b + "))";
      }

      o.change && o.change(e.elemPicker.find("." + h).find("input").val());
    },
        L = i(['<div class="layui-auxiliar-moving" id="LAY-colorpicker-moving"></div'].join("")),
        M = function M(e) {
      i("#LAY-colorpicker-moving")[0] || i("body").append(L), L.on("mousemove", e), L.on("mouseup", function () {
        L.remove();
      }).on("mouseleave", function () {
        L.remove();
      });
    };

    y.on("mousedown", function (e) {
      var i = this.offsetTop,
          o = e.clientY;
      M(function (e) {
        var t = i + (e.clientY - o),
            r = k[0].offsetHeight;
        t < 0 && (t = 0), t > r && (t = r);
        var n = t / 180 * 360;
        w = n, F(n, E, D, H), e.preventDefault();
      }), e.preventDefault();
    }), k.on("click", function (e) {
      var o = e.clientY - i(this).offset().top;
      o < 0 && (o = 0), o > this.offsetHeight && (o = this.offsetHeight);
      var t = o / 180 * 360;
      w = t, F(t, E, D, H), e.preventDefault();
    }), C.on("mousedown", function (e) {
      var i = this.offsetTop,
          o = this.offsetLeft,
          t = e.clientY,
          r = e.clientX;
      layui.stope(e), M(function (e) {
        var n = i + (e.clientY - t),
            l = o + (e.clientX - r),
            c = x[0].offsetHeight - 3,
            s = x[0].offsetWidth - 3;
        n < -3 && (n = -3), n > c && (n = c), l < -3 && (l = -3), l > s && (l = s);
        var a = (l + 3) / 260 * 100,
            f = 100 - (n + 3) / 180 * 100;
        D = f, E = a, F(w, a, f, H), e.preventDefault();
      }), e.preventDefault();
    }), x.on("mousedown", function (e) {
      var o = e.clientY - i(this).offset().top - 3 + b.scrollTop(),
          t = e.clientX - i(this).offset().left - 3 + b.scrollLeft();
      o < -3 && (o = -3), o > this.offsetHeight - 3 && (o = this.offsetHeight - 3), t < -3 && (t = -3), t > this.offsetWidth - 3 && (t = this.offsetWidth - 3);
      var r = (t + 3) / 260 * 100,
          n = 100 - (o + 3) / 180 * 100;
      D = n, E = r, F(w, r, n, H), e.preventDefault(), C.trigger(e, "mousedown");
    }), B.on("mousedown", function (e) {
      var i = this.offsetLeft,
          o = e.clientX;
      M(function (e) {
        var t = i + (e.clientX - o),
            r = P[0].offsetWidth;
        t < 0 && (t = 0), t > r && (t = r);
        var n = Math.round(t / 280 * 100) / 100;
        H = n, F(w, E, D, n), e.preventDefault();
      }), e.preventDefault();
    }), P.on("click", function (e) {
      var o = e.clientX - i(this).offset().left;
      o < 0 && (o = 0), o > this.offsetWidth && (o = this.offsetWidth);
      var t = Math.round(o / 280 * 100) / 100;
      H = t, F(w, E, D, t), e.preventDefault();
    }), j.each(function () {
      i(this).on("click", function () {
        i(this).parent(".layui-colorpicker-pre").addClass("selected").siblings().removeClass("selected");
        var e = this.style.backgroundColor,
            o = p(m(e)),
            t = e.slice(e.lastIndexOf(",") + 1, e.length - 1);
        w = o.h, E = o.s, D = o.b, 3 == (e.match(/[0-9]{1,3}/g) || []).length && (t = 1), H = t, F(o.h, o.s, o.b, t);
      });
    });
  }, y.prototype.select = function (e, i, o, t) {
    this.config;
    var r = v({
      h: e,
      s: 100,
      b: 100
    }),
        n = v({
      h: e,
      s: i,
      b: o
    }),
        l = e / 360 * 180,
        c = 180 - o / 100 * 180 - 3,
        f = i / 100 * 260 - 3;
    this.elemPicker.find("." + s).css("top", l), this.elemPicker.find("." + a)[0].style.background = "#" + r, this.elemPicker.find("." + u).css({
      top: c,
      left: f
    }), "change" !== t && this.elemPicker.find("." + h).find("input").val("#" + n);
  }, y.prototype.pickerEvents = function () {
    var e = this,
        o = e.config,
        t = e.elemColorBox.find("." + l),
        s = e.elemPicker.find("." + h + " input"),
        a = {
      clear: function clear(i) {
        t[0].style.background = "", e.elemColorBox.find("." + c).removeClass(r).addClass(n), e.color = "", o.done && o.done(""), e.removePicker();
      },
      confirm: function confirm(i, l) {
        var a = s.val(),
            f = a,
            u = {};

        if (a.indexOf(",") > -1) {
          if (u = p(m(a)), e.select(u.h, u.s, u.b), t[0].style.background = f = "#" + v(u), (a.match(/[0-9]{1,3}/g) || []).length > 3 && "rgba" === t.attr("lay-type")) {
            var h = 280 * a.slice(a.lastIndexOf(",") + 1, a.length - 1);
            e.elemPicker.find("." + d).css("left", h), t[0].style.background = a, f = a;
          }
        } else u = function (e) {
          if (3 == (e = e.indexOf("#") > -1 ? e.substring(1) : e).length) {
            var i = e.split("");
            e = i[0] + i[0] + i[1] + i[1] + i[2] + i[2];
          }

          e = parseInt(e, 16);
          return p({
            r: e >> 16,
            g: (65280 & e) >> 8,
            b: 255 & e
          });
        }(a), t[0].style.background = f = "#" + v(u), e.elemColorBox.find("." + c).removeClass(n).addClass(r);

        if ("change" === l) return e.select(u.h, u.s, u.b, l), void (o.change && o.change(f));
        e.color = a, o.done && o.done(a), e.removePicker();
      }
    };
    e.elemPicker.on("click", "*[colorpicker-events]", function () {
      var e = i(this),
          o = e.attr("colorpicker-events");
      a[o] && a[o].call(this, e);
    }), s.on("keyup", function (e) {
      var o = i(this);
      a.confirm.call(this, o, 13 === e.keyCode ? null : "change");
    });
  }, y.prototype.events = function () {
    var e = this,
        o = e.config,
        s = e.elemColorBox.find("." + l);
    e.elemColorBox.on("click", function () {
      e.renderPicker(), i(t)[0] && (e.val(), e.side());
    }), o.elem[0] && !e.elemColorBox[0].eventHandler && (k.on("click", function (o) {
      if (!i(o.target).hasClass("layui-colorpicker") && !i(o.target).parents(".layui-colorpicker")[0] && !i(o.target).hasClass(t.replace(/\./g, "")) && !i(o.target).parents(t)[0] && e.elemPicker) {
        if (e.color) {
          var l = p(m(e.color));
          e.select(l.h, l.s, l.b);
        } else e.elemColorBox.find("." + c).removeClass(r).addClass(n);

        s[0].style.background = e.color || "", e.removePicker();
      }
    }), b.on("resize", function () {
      if (!e.elemPicker || !i(t)[0]) return !1;
      e.position();
    }), e.elemColorBox[0].eventHandler = !0);
  }, o.render = function (e) {
    var i = new y(e);
    return function () {
      return {
        config: this.config
      };
    }.call(i);
  }, e("colorpicker", o);
});
layui.define("layer", function (e) {
  "use strict";

  var i = layui.$,
      t = layui.layer,
      a = layui.hint(),
      n = layui.device(),
      l = ".layui-form",
      r = "layui-this",
      s = "layui-hide",
      o = "layui-disabled",
      c = function c() {
    this.config = {
      verify: {
        required: [/[\S]+/, "必填项不能为空"],
        phone: [/^1\d{10}$/, "请输入正确的手机号"],
        email: [/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, "邮箱格式不正确"],
        url: [/(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/, "链接格式不正确"],
        number: function number(e) {
          if (!e || isNaN(e)) return "只能填写数字";
        },
        date: [/^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/, "日期格式不正确"],
        identity: [/(^\d{15}$)|(^\d{17}(x|X|\d)$)/, "请输入正确的身份证号"]
      }
    };
  };

  c.prototype.set = function (e) {
    return i.extend(!0, this.config, e), this;
  }, c.prototype.verify = function (e) {
    return i.extend(!0, this.config.verify, e), this;
  }, c.prototype.on = function (e, i) {
    return layui.onevent.call(this, "form", e, i);
  }, c.prototype.val = function (e, t) {
    i(l + '[lay-filter="' + e + '"]').each(function (e, a) {
      var n = i(this);
      layui.each(t, function (e, i) {
        var t,
            a = n.find('[name="' + e + '"]');
        a[0] && ("checkbox" === (t = a[0].type) ? a[0].checked = i : "radio" === t ? a.each(function () {
          this.value === i && (this.checked = !0);
        }) : a.val(i));
      });
    }), d.render(null, e);
  }, c.prototype.render = function (e, t) {
    var n = i(l + (t ? '[lay-filter="' + t + '"]' : "")),
        c = {
      select: function select() {
        var e,
            t = "layui-form-select",
            a = "layui-select-title",
            l = "layui-select-none",
            c = "",
            u = function u(n, l) {
          i(n.target).parent().hasClass(a) && !l || (i("." + t).removeClass(t + "ed " + t + "up"), e && c && e.val(c)), e = null;
        };

        n.find("select").each(function (n, d) {
          var f = i(this),
              v = f.next("." + t),
              y = this.disabled,
              p = d.value,
              m = i(d.options[d.selectedIndex]),
              k = d.options[0];
          if ("string" == typeof f.attr("lay-ignore")) return f.show();
          var g = "string" == typeof f.attr("lay-search"),
              x = k ? k.value ? "请选择" : k.innerHTML || "请选择" : "请选择",
              b = i(['<div class="' + (g ? "" : "layui-unselect ") + t, (y ? " layui-select-disabled" : "") + '">', '<div class="' + a + '">', '<input type="text" placeholder="' + x + '" value="' + (p ? m.html() : "") + '"' + (g ? "" : " readonly") + ' class="layui-input' + (g ? "" : " layui-unselect") + (y ? " " + o : "") + '">', '<i class="layui-edge"></i></div>', '<dl class="layui-anim layui-anim-upbit' + (f.find("optgroup")[0] ? " layui-select-group" : "") + '">', function (e) {
            var i = [];
            return layui.each(e, function (e, t) {
              0 !== e || t.value ? "optgroup" === t.tagName.toLowerCase() ? i.push("<dt>" + t.label + "</dt>") : i.push('<dd lay-value="' + t.value + '" class="' + (p === t.value ? r : "") + (t.disabled ? " " + o : "") + '">' + t.innerHTML + "</dd>") : i.push('<dd lay-value="" class="layui-select-tips">' + (t.innerHTML || "请选择") + "</dd>");
            }), 0 === i.length && i.push('<dd lay-value="" class="' + o + '">没有选项</dd>'), i.join("");
          }(f.find("*")) + "</dl>", "</div>"].join(""));
          v[0] && v.remove(), f.after(b), function (n, d, f) {
            var v,
                y = i(this),
                p = n.find("." + a),
                m = p.find("input"),
                k = n.find("dl"),
                g = k.children("dd"),
                x = this.selectedIndex;

            if (!d) {
              var b = function b() {
                var e = n.offset().top + n.outerHeight() + 5 - h.scrollTop(),
                    i = k.outerHeight();
                x = y[0].selectedIndex, n.addClass(t + "ed"), g.removeClass(s), v = null, g.eq(x).addClass(r).siblings().removeClass(r), e + i > h.height() && e >= i && n.addClass(t + "up"), w();
              },
                  C = function C(e) {
                n.removeClass(t + "ed " + t + "up"), m.blur(), v = null, e || $(m.val(), function (e) {
                  e && (c = k.find("." + r).html(), m && m.val(c));
                });
              },
                  w = function w() {
                var e = k.children("dd." + r);

                if (e[0]) {
                  var i = e.position().top,
                      t = k.height(),
                      a = e.height();
                  i > t && k.scrollTop(i + k.scrollTop() - t + a - 5), i < 0 && k.scrollTop(i + k.scrollTop() - 5);
                }
              };

              p.on("click", function (e) {
                n.hasClass(t + "ed") ? C() : (u(e, !0), b()), k.find("." + l).remove();
              }), p.find(".layui-edge").on("click", function () {
                m.focus();
              }), m.on("keyup", function (e) {
                9 === e.keyCode && b();
              }).on("keydown", function (e) {
                var i = e.keyCode;
                9 === i && C();

                var t = function t(i, a) {
                  var n, l;
                  e.preventDefault();

                  var c = function () {
                    var e = k.children("dd." + r);

                    if (k.children("dd." + s)[0] && "next" === i) {
                      var t = k.children("dd:not(.layui-hide,." + o + ")"),
                          n = t.eq(0).index();
                      if (n >= 0 && n < e.index() && !t.hasClass(r)) return t.eq(0).prev()[0] ? t.eq(0).prev() : k.children(":last");
                    }

                    return a && a[0] ? a : v && v[0] ? v : e;
                  }();

                  return l = c[i](), n = c[i]("dd:not(.layui-hide)"), l[0] ? (v = c[i](), n[0] && !n.hasClass(o) || !v[0] ? (n.addClass(r).siblings().removeClass(r), void w()) : t(i, v)) : v = null;
                };

                38 === i && t("prev"), 40 === i && t("next"), 13 === i && (e.preventDefault(), k.children("dd." + r).trigger("click"));
              });

              var $ = function $(e, t, a) {
                var n = 0;
                layui.each(g, function () {
                  var t = i(this),
                      l = t.text(),
                      r = -1 === l.indexOf(e);
                  ("" === e || "blur" === a ? e !== l : r) && n++, "keyup" === a && t[r ? "addClass" : "removeClass"](s);
                });
                var l = n === g.length;
                return t(l), l;
              };

              f && m.on("keyup", function (e) {
                var i = this.value,
                    t = e.keyCode;
                if (9 === t || 13 === t || 37 === t || 38 === t || 39 === t || 40 === t) return !1;
                $(i, function (e) {
                  e ? k.find("." + l)[0] || k.append('<p class="' + l + '">无匹配项</p>') : k.find("." + l).remove();
                }, "keyup"), "" === i && k.find("." + l).remove(), w();
              }).on("blur", function (t) {
                var a = y[0].selectedIndex;
                e = m, c = i(y[0].options[a]).html(), setTimeout(function () {
                  $(m.val(), function (e) {
                    c || m.val("");
                  }, "blur");
                }, 200);
              }), g.on("click", function () {
                var e = i(this),
                    t = e.attr("lay-value"),
                    a = y.attr("lay-filter");
                return !e.hasClass(o) && (e.hasClass("layui-select-tips") ? m.val("") : (m.val(e.text()), e.addClass(r)), e.siblings().removeClass(r), y.val(t).removeClass("layui-form-danger"), layui.event.call(this, "form", "select(" + a + ")", {
                  elem: y[0],
                  value: t,
                  othis: n
                }), C(!0), !1);
              }), n.find("dl>dt").on("click", function (e) {
                return !1;
              }), i(document).off("click", u).on("click", u);
            }
          }.call(this, b, y, g);
        });
      },
      checkbox: function checkbox() {
        var e = {
          checkbox: ["layui-form-checkbox", "layui-form-checked", "checkbox"],
          _switch: ["layui-form-switch", "layui-form-onswitch", "switch"]
        };
        n.find("input[type=checkbox]").each(function (t, a) {
          var n = i(this),
              l = n.attr("lay-skin"),
              r = (n.attr("lay-text") || "").split("|"),
              s = this.disabled;
          "switch" === l && (l = "_" + l);
          var c = e[l] || e.checkbox;
          if ("string" == typeof n.attr("lay-ignore")) return n.show();
          var u = n.next("." + c[0]),
              d = i(['<div class="layui-unselect ' + c[0], a.checked ? " " + c[1] : "", s ? " layui-checkbox-disbaled " + o : "", '"', l ? ' lay-skin="' + l + '"' : "", ">", function () {
            var e = {
              checkbox: [a.title.replace(/\s/g, "") ? "<span>" + a.title + "</span>" : "", '<i class="layui-icon layui-icon-ok"></i>'].join(""),
              _switch: "<em>" + ((a.checked ? r[0] : r[1]) || "") + "</em><i></i>"
            };
            return e[l] || e.checkbox;
          }(), "</div>"].join(""));
          u[0] && u.remove(), n.after(d), function (e, t) {
            var a = i(this);
            e.on("click", function () {
              var i = a.attr("lay-filter"),
                  n = (a.attr("lay-text") || "").split("|");
              a[0].disabled || (a[0].checked ? (a[0].checked = !1, e.removeClass(t[1]).find("em").text(n[1])) : (a[0].checked = !0, e.addClass(t[1]).find("em").text(n[0])), layui.event.call(a[0], "form", t[2] + "(" + i + ")", {
                elem: a[0],
                value: a[0].value,
                othis: e
              }));
            });
          }.call(this, d, c);
        });
      },
      radio: function radio() {
        var e = "layui-form-radio",
            t = ["&#xe643;", "&#xe63f;"];
        n.find("input[type=radio]").each(function (a, n) {
          var r = i(this),
              s = r.next("." + e),
              c = this.disabled;
          if ("string" == typeof r.attr("lay-ignore")) return r.show();
          s[0] && s.remove();
          var u = i(['<div class="layui-unselect ' + e, n.checked ? " " + e + "ed" : "", (c ? " layui-radio-disbaled " + o : "") + '">', '<i class="layui-anim layui-icon">' + t[n.checked ? 0 : 1] + "</i>", "<div>" + function () {
            var e = n.title || "";
            return "string" == typeof r.next().attr("lay-radio") && (e = r.next().html(), r.next().remove()), e;
          }() + "</div>", "</div>"].join(""));
          r.after(u), function (a) {
            var n = i(this),
                r = "layui-anim-scaleSpring";
            a.on("click", function () {
              var s = n[0].name,
                  o = n.parents(l),
                  c = n.attr("lay-filter"),
                  u = o.find("input[name=" + s.replace(/(\.|#|\[|\])/g, "\\$1") + "]");
              n[0].disabled || (layui.each(u, function () {
                var a = i(this).next("." + e);
                this.checked = !1, a.removeClass(e + "ed"), a.find(".layui-icon").removeClass(r).html(t[1]);
              }), n[0].checked = !0, a.addClass(e + "ed"), a.find(".layui-icon").addClass(r).html(t[0]), layui.event.call(n[0], "form", "radio(" + c + ")", {
                elem: n[0],
                value: n[0].value,
                othis: a
              }));
            });
          }.call(this, u);
        });
      }
    };
    return e ? c[e] ? c[e]() : a.error("不支持的" + e + "表单渲染") : layui.each(c, function (e, i) {
      i();
    }), this;
  };

  var u = function u() {
    var e = i(this),
        a = d.config.verify,
        r = null,
        s = {},
        o = e.parents(l),
        c = o.find("*[lay-verify]"),
        u = e.parents("form")[0],
        f = o.find("input,select,textarea"),
        h = e.attr("lay-filter");
    if (layui.each(c, function (e, l) {
      var s = i(this),
          o = s.attr("lay-verify").split("|"),
          c = s.attr("lay-verType"),
          u = s.val();
      if (s.removeClass("layui-form-danger"), layui.each(o, function (e, i) {
        var o = "",
            d = "function" == typeof a[i];

        if (a[i]) {
          var f = d ? o = a[i](u, l) : !a[i][0].test(u);
          if (o = o || a[i][1], f) return "tips" === c ? t.tips(o, "string" == typeof s.attr("lay-ignore") || "select" !== l.tagName.toLowerCase() && !/^checkbox|radio$/.test(l.type) ? s : s.next(), {
            tips: 1
          }) : "alert" === c ? t.alert(o, {
            title: "提示",
            shadeClose: !0
          }) : t.msg(o, {
            icon: 5,
            shift: 6
          }), n.android || n.ios || l.focus(), s.addClass("layui-form-danger"), r = !0;
        }
      }), r) return r;
    }), r) return !1;
    var v = {};
    return layui.each(f, function (e, i) {
      if (i.name = (i.name || "").replace(/^\s*|\s*&/, ""), i.name) {
        if (/^.*\[\]$/.test(i.name)) {
          var t = i.name.match(/^(.*)\[\]$/g)[0];
          v[t] = 0 | v[t], i.name = i.name.replace(/^(.*)\[\]$/, "$1[" + v[t]++ + "]");
        }

        /^checkbox|radio$/.test(i.type) && !i.checked || (s[i.name] = i.value);
      }
    }), layui.event.call(this, "form", "submit(" + h + ")", {
      elem: this,
      form: u,
      field: s
    });
  },
      d = new c(),
      f = i(document),
      h = i(window);

  d.render(), f.on("reset", l, function () {
    var e = i(this).attr("lay-filter");
    setTimeout(function () {
      d.render(null, e);
    }, 50);
  }), f.on("submit", l, u).on("click", "*[lay-submit]", u), e("form", d);
});
layui.define("jquery", function (e) {
  "use strict";

  var i = layui.$,
      o = layui.hint(),
      t = "layui-tree-enter",
      a = function a(e) {
    this.options = e;
  },
      n = ["&#xe623;", "&#xe625;"],
      r = ["&#xe626;", "&#xe627;"],
      l = ["&#xe62b;", "&#xe62a;"],
      s = ["&#xe622;", "&#xe624;"],
      c = "&#xe621;";

  a.prototype.init = function (e) {
    e.addClass("layui-box layui-tree"), this.options.skin && e.addClass("layui-tree-skin-" + this.options.skin), this.tree(e), this.on(e);
  }, a.prototype.tree = function (e, o) {
    var t = this,
        a = t.options,
        u = o || a.nodes;
    layui.each(u, function (o, u) {
      var d = u.children && u.children.length > 0,
          p = i('<ul class="' + (u.spread ? "layui-show" : "") + '"></ul>'),
          h = i(["<li " + (u.spread ? 'data-spread="' + u.spread + '"' : "") + ">", d ? '<i class="layui-icon layui-tree-spread">' + (u.spread ? n[1] : n[0]) + "</i>" : "", a.check ? '<i class="layui-icon layui-tree-check">' + ("checkbox" === a.check ? r[0] : "radio" === a.check ? l[0] : "") + "</i>" : "", '<a href="' + (u.href || "javascript:;") + '" ' + (a.target && u.href ? 'target="' + a.target + '"' : "") + '><i class="layui-icon layui-tree-' + (d ? "branch" : "leaf") + '">' + (d ? u.spread ? s[1] : s[0] : c) + "</i><cite>" + (u.name || "未命名") + "</cite></a>", "</li>"].join(""));
      d && (h.append(p), t.tree(p, u.children)), e.append(h), "function" == typeof a.click && t.click(h, u), t.spread(h, u), a.drag && t.drag(h, u);
    });
  }, a.prototype.click = function (e, i) {
    var o = this.options;
    e.children("a").on("click", function (e) {
      layui.stope(e), o.click(i);
    });
  }, a.prototype.spread = function (e, i) {
    this.options;

    var o = e.children(".layui-tree-spread"),
        t = e.children("ul"),
        a = e.children("a"),
        r = function r() {
      e.data("spread") ? (e.data("spread", null), t.removeClass("layui-show"), o.html(n[0]), a.find(".layui-icon").html(s[0])) : (e.data("spread", !0), t.addClass("layui-show"), o.html(n[1]), a.find(".layui-icon").html(s[1]));
    };

    t[0] && (o.on("click", r), a.on("dblclick", r));
  }, a.prototype.on = function (e) {
    var o = this,
        a = o.options,
        n = "layui-tree-drag";
    e.find("i").on("selectstart", function (e) {
      return !1;
    }), a.drag && i(document).on("mousemove", function (e) {
      var t = o.move;

      if (t.from) {
        t.to;
        var a = i('<div class="layui-box ' + n + '"></div>');
        e.preventDefault(), i("." + n)[0] || i("body").append(a);
        var r = i("." + n)[0] ? i("." + n) : a;
        r.addClass("layui-show").html(t.from.elem.children("a").html()), r.css({
          left: e.pageX + 10,
          top: e.pageY + 10
        });
      }
    }).on("mouseup", function () {
      var e = o.move;
      e.from && (e.from.elem.children("a").removeClass(t), e.to && e.to.elem.children("a").removeClass(t), o.move = {}, i("." + n).remove());
    });
  }, a.prototype.move = {}, a.prototype.drag = function (e, o) {
    var a = this,
        n = (a.options, e.children("a")),
        r = function r() {
      var n = i(this),
          r = a.move;
      r.from && (r.to = {
        item: o,
        elem: e
      }, n.addClass(t));
    };

    n.on("mousedown", function () {
      a.move.from = {
        item: o,
        elem: e
      };
    }), n.on("mouseenter", r).on("mousemove", r).on("mouseleave", function () {
      var e = i(this),
          o = a.move;
      o.from && (delete o.to, e.removeClass(t));
    });
  }, e("tree", function (e) {
    var t = new a(e = e || {}),
        n = i(e.elem);
    if (!n[0]) return o.error("layui.tree 没有找到" + e.elem + "元素");
    t.init(n);
  });
});
layui.define(["laytpl", "laypage", "layer", "form", "util"], function (e) {
  "use strict";

  var t = layui.$,
      i = layui.laytpl,
      a = layui.laypage,
      l = layui.layer,
      n = layui.form,
      o = (layui.util, layui.hint()),
      d = layui.device(),
      s = {
    config: {
      checkName: "LAY_CHECKED",
      indexName: "LAY_TABLE_INDEX"
    },
    cache: {},
    index: layui.table ? layui.table.index + 1e4 : 0,
    set: function set(e) {
      return this.config = t.extend({}, this.config, e), this;
    },
    on: function on(e, t) {
      return layui.onevent.call(this, r, e, t);
    }
  },
      c = function c() {
    var e = this,
        t = e.config,
        i = t.id || t.index;
    return i && (c.config[i] = t), {
      reload: function reload(t) {
        e.reload.call(e, t);
      },
      setColsWidth: function setColsWidth() {
        e.setColsWidth.call(e);
      },
      config: t
    };
  },
      r = "table",
      h = "layui-hide",
      u = "layui-none",
      y = ".layui-table-header",
      f = ".layui-table-body",
      p = ".layui-table-sort",
      v = "layui-table-edit",
      m = function m(e) {
    return ['<table cellspacing="0" cellpadding="0" border="0" class="layui-table" ', '{{# if(d.data.skin){ }}lay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>', "<thead>", "{{# layui.each(d.data.cols, function(i1, item1){ }}", "<tr>", "{{# layui.each(item1, function(i2, item2){ }}", '{{# if(item2.fixed && item2.fixed !== "right"){ left = true; } }}', '{{# if(item2.fixed === "right"){ right = true; } }}', (e = e || {}).fixed && "right" !== e.fixed ? '{{# if(item2.fixed && item2.fixed !== "right"){ }}' : "right" === e.fixed ? '{{# if(item2.fixed === "right"){ }}' : "", "{{# var isSort = !(item2.colGroup) && item2.sort; }}", '<th data-field="{{ item2.field||i2 }}" data-key="{{d.index}}-{{i1}}-{{i2}}" {{# if( item2.parentKey){ }}data-parentkey="{{ item2.parentKey }}"{{# } }} {{# if(item2.minWidth){ }}data-minwidth="{{item2.minWidth}}"{{# } }} {{#if(item2.colspan){}} colspan="{{item2.colspan}}"{{#} if(item2.rowspan){}} rowspan="{{item2.rowspan}}"{{#}}} {{# if(item2.unresize || item2.colGroup){ }}data-unresize="true"{{# } }} class="{{# if(item2.hide){ }}layui-hide{{# } }}{{# if(isSort){ }} layui-unselect{{# } }}{{# if(!item2.field){ }} layui-table-col-special{{# } }}">', '<div class="layui-table-cell laytable-cell-', "{{# if(item2.colGroup){ }}", "group", "{{# } else { }}", "{{d.index}}-{{i1}}-{{i2}}", '{{# if(item2.type !== "normal"){ }}', " laytable-cell-{{ item2.type }}", "{{# } }}", "{{# } }}", '" {{#if(item2.align){}}align="{{item2.align}}"{{#}}}>', '{{# if(item2.type === "checkbox"){ }}', '<input type="checkbox" name="layTableCheckbox" lay-skin="primary" lay-filter="layTableAllChoose" {{# if(item2[d.data.checkName]){ }}checked{{# }; }}>', "{{# } else { }}", '<span>{{item2.title||""}}</span>', "{{# if(isSort){ }}", '<span class="layui-table-sort layui-inline"><i class="layui-edge layui-table-sort-asc" title="升序"></i><i class="layui-edge layui-table-sort-desc" title="降序"></i></span>', "{{# } }}", "{{# } }}", "</div>", "</th>", e.fixed ? "{{# }; }}" : "", "{{# }); }}", "</tr>", "{{# }); }}", "</thead>", "</table>"].join("");
  },
      g = ['<table cellspacing="0" cellpadding="0" border="0" class="layui-table" ', '{{# if(d.data.skin){ }}lay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>', "<tbody></tbody>", "</table>"].join(""),
      b = ['<div class="layui-form layui-border-box {{d.VIEW_CLASS}}" lay-filter="LAY-table-{{d.index}}" style="{{# if(d.data.width){ }}width:{{d.data.width}}px;{{# } }} {{# if(d.data.height){ }}height:{{d.data.height}}px;{{# } }}">', "{{# if(d.data.toolbar){ }}", '<div class="layui-table-tool">', '<div class="layui-table-tool-temp"></div>', '<div class="layui-table-tool-self"></div>', "</div>", "{{# } }}", '<div class="layui-table-box">', "{{# if(d.loading){ }}", '<div class="layui-table-init" style="background-color: #fff;">', '<i class="layui-icon-owndefault"></i>', "</div>", "{{# } }}", "{{# var left, right; }}", '<div class="layui-table-header">', m(), "</div>", '<div class="layui-table-body layui-table-main">', g, "</div>", "{{# if(left){ }}", '<div class="layui-table-fixed layui-table-fixed-l">', '<div class="layui-table-header">', m({
    fixed: !0
  }), "</div>", '<div class="layui-table-body">', g, "</div>", "</div>", "{{# }; }}", "{{# if(right){ }}", '<div class="layui-table-fixed layui-table-fixed-r">', '<div class="layui-table-header">', m({
    fixed: "right"
  }), '<div class="layui-table-mend"></div>', "</div>", '<div class="layui-table-body">', g, "</div>", "</div>", "{{# }; }}", "</div>", "{{# if(d.data.totalRow){ }}", '<div class="layui-table-total">', '<table cellspacing="0" cellpadding="0" border="0" class="layui-table" ', '{{# if(d.data.skin){ }}lay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>', '<tbody><tr><td><div class="layui-table-cell" style="visibility: hidden;">Total</div></td></tr></tbody>', "</table>", "</div>", "{{# } }}", "{{# if(d.data.page){ }}", '<div class="layui-table-page">', '<div id="layui-table-page{{d.index}}"></div>', "</div>", "{{# } }}", "<style>", "{{# layui.each(d.data.cols, function(i1, item1){", "layui.each(item1, function(i2, item2){ }}", ".laytable-cell-{{d.index}}-{{i1}}-{{i2}}{ ", "{{# if(item2.width){ }}", "width: {{item2.width}}px;", "{{# } }}", " }", "{{# });", "}); }}", "</style>", "</div>"].join(""),
      x = t(window),
      k = t(document),
      C = function C(e) {
    this.index = ++s.index, this.config = t.extend({}, this.config, s.config, e), this.render();
  };

  C.prototype.config = {
    limit: 10,
    loading: !0,
    cellMinWidth: 120,
    defaultToolbar: ["filter", "exports", "print"],
    text: {
      none: "无数据"
    }
  }, C.prototype.render = function () {
    var e = this.config;
    if (e.elem = t(e.elem), e.where = e.where || {}, e.id = e.id || e.elem.attr("id") || e.index, e.request = t.extend({
      pageName: "page",
      limitName: "limit"
    }, e.request), e.response = t.extend({
      statusName: "code",
      statusCode: 0,
      msgName: "msg",
      dataName: "data",
      countName: "count"
    }, e.response), "object" == _typeof(e.page) && (e.limit = e.page.limit || e.limit, e.limits = e.page.limits || e.limits, this.page = e.page.curr = e.page.curr || 1, delete e.page.elem, delete e.page.jump), !e.elem[0]) return this;
    e.height && /^full-\d+$/.test(e.height) && (this.fullHeightGap = e.height.split("-")[1], e.height = x.height() - this.fullHeightGap), this.setInit();
    var a = e.elem,
        l = a.next(".layui-table-view"),
        n = this.elem = t(i(b).render({
      VIEW_CLASS: "layui-table-view",
      data: e,
      index: this.index
    }));

    if (e.index = this.index, l[0] && l.remove(), a.after(n), this.layTool = n.find(".layui-table-tool"), this.layBox = n.find(".layui-table-box"), this.layHeader = n.find(y), this.layMain = n.find(".layui-table-main"), this.layBody = n.find(f), this.layFixed = n.find(".layui-table-fixed"), this.layFixLeft = n.find(".layui-table-fixed-l"), this.layFixRight = n.find(".layui-table-fixed-r"), this.layTotal = n.find(".layui-table-total"), this.layPage = n.find(".layui-table-page"), this.renderToolbar(), this.fullSize(), e.cols.length > 1) {
      var o = this.layFixed.find(y).find("th");
      o.height(this.layHeader.height() - 1 - parseFloat(o.css("padding-top")) - parseFloat(o.css("padding-bottom")));
    }

    this.pullData(this.page), this.events();
  }, C.prototype.initOpts = function (e) {
    this.config;
    e.checkbox && (e.type = "checkbox"), e.space && (e.type = "space"), e.type || (e.type = "normal"), "normal" !== e.type && (e.unresize = !0, e.width = e.width || {
      checkbox: 48,
      radio: 48,
      space: 15,
      numbers: 40
    }[e.type]);
  }, C.prototype.setInit = function (e) {
    var t = this,
        i = t.config;
    if (i.clientWidth = i.width || function () {
      var e = function e(t) {
        var a, l;
        a = (t = t || i.elem.parent()).width();

        try {
          l = "none" === t.css("display");
        } catch (e) {}

        return !t[0] || a && !l ? a : e(t.parent());
      };

      return e();
    }(), "width" === e) return i.clientWidth;
    layui.each(i.cols, function (e, a) {
      layui.each(a, function (l, n) {
        if (n) {
          if (n.key = e + "-" + l, n.hide = n.hide || !1, n.colGroup || n.colspan > 1) {
            var o = 0;
            layui.each(i.cols[e + 1], function (t, i) {
              i.HAS_PARENT || o > 1 && o == n.colspan || (i.HAS_PARENT = !0, i.parentKey = e + "-" + l, o += parseInt(i.colspan > 1 ? i.colspan : 1));
            }), n.colGroup = !0;
          }

          t.initOpts(n);
        } else a.splice(l, 1);
      });
    });
  }, C.prototype.renderToolbar = function () {
    var e = this.config,
        a = ['<div class="layui-inline" lay-event="add"><i class="layui-icon layui-icon-add-1"></i></div>', '<div class="layui-inline" lay-event="update"><i class="layui-icon layui-icon-edit"></i></div>', '<div class="layui-inline" lay-event="delete"><i class="layui-icon layui-icon-delete"></i></div>'].join(""),
        l = this.layTool.find(".layui-table-tool-temp");
    if ("default" === e.toolbar) l.html(a);else if (e.toolbar) {
      var n = t(e.toolbar).html() || "";
      n && l.html(i(n).render(e));
    }
    var o = {
      filter: {
        title: "筛选列",
        layEvent: "LAYTABLE_COLS",
        icon: "layui-icon-cols"
      },
      exports: {
        title: "导出",
        layEvent: "LAYTABLE_EXPORT",
        icon: "layui-icon-export"
      },
      print: {
        title: "打印",
        layEvent: "LAYTABLE_PRINT",
        icon: "layui-icon-print"
      }
    },
        d = [];
    "object" == _typeof(e.defaultToolbar) && layui.each(e.defaultToolbar, function (e, t) {
      var i = o[t];
      i && d.push('<div class="layui-inline" title="' + i.title + '" lay-event="' + i.layEvent + '"><i class="layui-icon ' + i.icon + '"></i></div>');
    }), this.layTool.find(".layui-table-tool-self").html(d.join(""));
  }, C.prototype.setParentCol = function (e, t) {
    var i = this.config,
        a = this.layHeader.find('th[data-key="' + i.index + "-" + t + '"]'),
        l = parseInt(a.attr("colspan")) || 0;

    if (a[0]) {
      var n = t.split("-"),
          o = i.cols[n[0]][n[1]];
      e ? l-- : l++, a.attr("colspan", l), a[l < 1 ? "addClass" : "removeClass"](h), o.colspan = l, o.hide = l < 1;
      var d = a.data("parentkey");
      d && this.setParentCol(e, d);
    }
  }, C.prototype.setColsPatch = function () {
    var e = this,
        t = e.config;
    layui.each(t.cols, function (t, i) {
      layui.each(i, function (t, i) {
        i.hide && e.setParentCol(i.hide, i.parentKey);
      });
    });
  }, C.prototype.setColsWidth = function () {
    var e = this,
        t = e.config,
        i = 0,
        a = 0,
        l = 0,
        n = 0,
        o = e.setInit("width");
    e.eachCols(function (e, t) {
      t.hide || i++;
    }), o = o - ("line" === t.skin || "nob" === t.skin ? 2 : i + 1) - e.getScrollWidth(e.layMain[0]) - 1;

    var d = function d(e) {
      layui.each(t.cols, function (i, d) {
        layui.each(d, function (i, s) {
          var c = 0,
              r = s.minWidth || t.cellMinWidth;
          s ? s.colGroup || s.hide || (e ? l && l < r && (a--, c = r) : (c = s.width || 0, /\d+%$/.test(c) ? (c = Math.floor(parseFloat(c) / 100 * o)) < r && (c = r) : c || (s.width = c = 0, a++)), s.hide && (c = 0), n += c) : d.splice(i, 1);
        });
      }), o > n && a && (l = (o - n) / a);
    };

    d(), d(!0), e.autoColNums = a, e.eachCols(function (i, a) {
      var n = a.minWidth || t.cellMinWidth;
      a.colGroup || a.hide || (0 === a.width ? e.getCssRule(t.index + "-" + a.key, function (e) {
        e.style.width = Math.floor(l >= n ? l : n) + "px";
      }) : /\d+%$/.test(a.width) && e.getCssRule(t.index + "-" + a.key, function (e) {
        e.style.width = Math.floor(parseFloat(a.width) / 100 * o) + "px";
      }));
    });
    var s = e.layMain.width() - e.getScrollWidth(e.layMain[0]) - e.layMain.children("table").outerWidth();

    if (e.autoColNums && s >= -i && s <= i) {
      var c = function c(t) {
        return !(t = t || e.layHeader.eq(0).find("thead th:last-child")).data("field") && t.prev()[0] ? c(t.prev()) : t;
      },
          r = c(),
          h = r.data("key");

      e.getCssRule(h, function (t) {
        var i = t.style.width || r.outerWidth();
        t.style.width = parseFloat(i) + s + "px", e.layMain.height() - e.layMain.prop("clientHeight") > 0 && (t.style.width = parseFloat(t.style.width) - 1 + "px");
      });
    }

    e.loading(!0);
  }, C.prototype.reload = function (e) {
    this.config.data && this.config.data.constructor === Array && delete this.config.data, this.config = t.extend({}, this.config, e), this.render();
  }, C.prototype.page = 1, C.prototype.pullData = function (e) {
    var i = this,
        a = i.config,
        l = a.request,
        n = a.response,
        o = function o() {
      "object" == _typeof(a.initSort) && i.sort(a.initSort.field, a.initSort.type);
    };

    if (i.startTime = new Date().getTime(), a.url) {
      var d = {};
      d[l.pageName] = e, d[l.limitName] = a.limit;
      var s = t.extend(d, a.where);
      a.contentType && 0 == a.contentType.indexOf("application/json") && (s = JSON.stringify(s)), t.ajax({
        type: a.method || "get",
        url: a.url,
        contentType: a.contentType,
        data: s,
        dataType: "json",
        headers: a.headers || {},
        success: function success(t) {
          "function" == typeof a.parseData && (t = a.parseData(t) || t), t[n.statusName] != n.statusCode ? (i.renderForm(), i.layMain.html('<div class="layui-none">' + (t[n.msgName] || "返回的数据不符合规范，正确的成功状态码 (" + n.statusName + ") 应为：" + n.statusCode) + "</div>")) : (i.renderData(t, e, t[n.countName]), o(), a.time = new Date().getTime() - i.startTime + " ms"), i.setColsWidth(), "function" == typeof a.done && a.done(t, e, t[n.countName]);
        },
        error: function error(e, t) {
          i.layMain.html('<div class="layui-none">数据接口请求异常：' + t + "</div>"), i.renderForm(), i.setColsWidth();
        }
      });
    } else if (a.data && a.data.constructor === Array) {
      var c = {},
          r = e * a.limit - a.limit;
      c[n.dataName] = a.data.concat().splice(r, a.limit), c[n.countName] = a.data.length, i.renderData(c, e, a.data.length), o(), i.setColsWidth(), "function" == typeof a.done && a.done(c, e, c[n.countName]);
    }
  }, C.prototype.eachCols = function (e) {
    return s.eachCols(null, e, this.config.cols), this;
  }, C.prototype.renderData = function (e, n, o, d) {
    var c = this,
        r = c.config,
        y = e[r.response.dataName] || [],
        f = [],
        p = [],
        v = [],
        m = function m() {
      var e;
      if (!d && c.sortKey) return c.sort(c.sortKey.field, c.sortKey.sort, !0);
      layui.each(y, function (a, l) {
        var o = [],
            u = [],
            y = [],
            m = a + r.limit * (n - 1) + 1;
        0 !== l.length && (d || (l[s.config.indexName] = a), c.eachCols(function (n, d) {
          var c = d.field || n,
              f = r.index + "-" + d.key,
              p = l[c];

          if (void 0 !== p && null !== p || (p = ""), !d.colGroup) {
            var v = ['<td data-field="' + c + '" data-key="' + f + '" ' + function () {
              var e = [];
              return d.edit && e.push('data-edit="' + d.edit + '"'), d.align && e.push('align="' + d.align + '"'), d.templet && e.push('data-content="' + p + '"'), d.toolbar && e.push('data-off="true"'), d.event && e.push('lay-event="' + d.event + '"'), d.style && e.push('style="' + d.style + '"'), d.minWidth && e.push('data-minwidth="' + d.minWidth + '"'), e.join(" ");
            }() + ' class="' + function () {
              var e = [];
              return d.hide && e.push(h), d.field || e.push("layui-table-col-special"), e.join(" ");
            }() + '">', '<div class="layui-table-cell laytable-cell-' + ("normal" === d.type ? f : f + " laytable-cell-" + d.type) + '">' + function () {
              var n = t.extend(!0, {
                LAY_INDEX: m
              }, l),
                  o = s.config.checkName;

              switch (d.type) {
                case "checkbox":
                  return '<input type="checkbox" name="layTableCheckbox" lay-skin="primary" ' + (d[o] ? (l[o] = d[o], d[o] ? "checked" : "") : n[o] ? "checked" : "") + ">";

                case "radio":
                  return n[o] && (e = a), '<input type="radio" name="layTableRadio_' + r.index + '" ' + (n[o] ? "checked" : "") + ' lay-type="layTableRadio">';

                case "numbers":
                  return m;
              }

              return d.toolbar ? i(t(d.toolbar).html() || "").render(n) : d.templet ? "function" == typeof d.templet ? d.templet(n) : i(t(d.templet).html() || String(p)).render(n) : p;
            }(), "</div></td>"].join("");
            o.push(v), d.fixed && "right" !== d.fixed && u.push(v), "right" === d.fixed && y.push(v);
          }
        }), f.push('<tr data-index="' + a + '">' + o.join("") + "</tr>"), p.push('<tr data-index="' + a + '">' + u.join("") + "</tr>"), v.push('<tr data-index="' + a + '">' + y.join("") + "</tr>"));
      }), c.layBody.scrollTop(0), c.layMain.find("." + u).remove(), c.layMain.find("tbody").html(f.join("")), c.layFixLeft.find("tbody").html(p.join("")), c.layFixRight.find("tbody").html(v.join("")), c.renderForm(), "number" == typeof e && c.setThisRowChecked(e), c.syncCheckAll(), c.scrollPatch(), l.close(c.tipsIndex), r.HAS_SET_COLS_PATCH || c.setColsPatch(), r.HAS_SET_COLS_PATCH = !0;
    };

    return c.key = r.id || r.index, s.cache[c.key] = y, c.layPage[0 == o || 0 === y.length && 1 == n ? "addClass" : "removeClass"](h), d ? m() : 0 === y.length ? (c.renderForm(), c.layFixed.remove(), c.layMain.find("tbody").html(""), c.layMain.find("." + u).remove(), c.layMain.append('<div class="layui-none">' + r.text.none + "</div>")) : (m(), c.renderTotal(y), void (r.page && (r.page = t.extend({
      elem: "layui-table-page" + r.index,
      count: o,
      limit: r.limit,
      limits: r.limits || [10, 20, 30, 40, 50, 60, 70, 80, 90],
      groups: 3,
      layout: ["prev", "page", "next", "skip", "count", "limit"],
      prev: '<i class="layui-icon">&#xe603;</i>',
      next: '<i class="layui-icon">&#xe602;</i>',
      jump: function jump(e, t) {
        t || (c.page = e.curr, r.limit = e.limit, c.loading(), c.pullData(e.curr));
      }
    }, r.page), r.page.count = o, a.render(r.page))));
  }, C.prototype.renderTotal = function (e) {
    var t = this,
        i = t.config,
        a = {};

    if (i.totalRow) {
      layui.each(e, function (e, i) {
        0 !== i.length && t.eachCols(function (e, t) {
          var l = t.field || e,
              n = i[l];
          t.totalRow && (a[l] = (a[l] || 0) + (parseFloat(n) || 0));
        });
      });
      var l = [];
      t.eachCols(function (e, t) {
        var n = t.field || e;

        if (!t.hide) {
          var o = ['<td data-field="' + n + '" data-key="' + t.key + '" ' + function () {
            var e = [];
            return t.align && e.push('align="' + t.align + '"'), t.style && e.push('style="' + t.style + '"'), t.minWidth && e.push('data-minwidth="' + t.minWidth + '"'), e.join(" ");
          }() + ">", '<div class="layui-table-cell laytable-cell-' + function () {
            var e = i.index + "-" + t.key;
            return "normal" === t.type ? e : e + " laytable-cell-" + t.type;
          }() + '">' + function () {
            var e = t.totalRowText || "";
            return t.totalRow ? a[n] || e : e;
          }(), "</div></td>"].join("");
          l.push(o);
        }
      }), t.layTotal.find("tbody").html("<tr>" + l.join("") + "</tr>");
    }
  }, C.prototype.getColElem = function (e, t) {
    var i = this.config;
    return e.eq(0).find(".laytable-cell-" + i.index + "-" + t + ":eq(0)");
  }, C.prototype.renderForm = function (e) {
    n.render(e, "LAY-table-" + this.index);
  }, C.prototype.setThisRowChecked = function (e) {
    this.config;
    this.layBody.find('tr[data-index="' + e + '"]').addClass("layui-table-click").siblings("tr").removeClass("layui-table-click");
  }, C.prototype.sort = function (e, i, a, l) {
    var n,
        d = {},
        c = this.config,
        h = c.elem.attr("lay-filter"),
        u = s.cache[this.key];
    "string" == typeof e && this.layHeader.find("th").each(function (i, a) {
      var l = t(this),
          n = l.data("field");
      if (n === e) return e = l, y = n, !1;
    });

    try {
      var y = y || e.data("field"),
          f = e.data("key");
      if (this.sortKey && !a && y === this.sortKey.field && i === this.sortKey.sort) return;
      var v = this.layHeader.find("th .laytable-cell-" + f).find(p);
      this.layHeader.find("th").find(p).removeAttr("lay-sort"), v.attr("lay-sort", i || null), this.layFixed.find("th");
    } catch (e) {
      return o.error("Table modules: Did not match to field");
    }

    this.sortKey = {
      field: y,
      sort: i
    }, "asc" === i ? n = layui.sort(u, y) : "desc" === i ? n = layui.sort(u, y, !0) : (n = layui.sort(u, s.config.indexName), delete this.sortKey), d[c.response.dataName] = n, this.renderData(d, this.page, this.count, !0), l && layui.event.call(e, r, "sort(" + h + ")", {
      field: y,
      type: i
    });
  }, C.prototype.loading = function (e) {
    this.config.loading && (e ? (this.layInit && this.layInit.remove(), delete this.layInit, this.layBox.find(".layui-table-init").remove()) : (this.layInit = t(['<div class="layui-table-init">', '<i class="layui-icon-owndefault"></i>', "</div>"].join("")), this.layBox.append(this.layInit)));
  }, C.prototype.setCheckData = function (e, t) {
    var i = this.config,
        a = s.cache[this.key];
    a[e] && a[e].constructor !== Array && (a[e][i.checkName] = t);
  }, C.prototype.syncCheckAll = function () {
    var e = this,
        t = e.config,
        i = e.layHeader.find('input[name="layTableCheckbox"]'),
        a = function a(i) {
      return e.eachCols(function (e, a) {
        "checkbox" === a.type && (a[t.checkName] = i);
      }), i;
    };

    i[0] && (s.checkStatus(e.key).isAll ? (i[0].checked || (i.prop("checked", !0), e.renderForm("checkbox")), a(!0)) : (i[0].checked && (i.prop("checked", !1), e.renderForm("checkbox")), a(!1)));
  }, C.prototype.getCssRule = function (e, t) {
    var i = this.elem.find("style")[0],
        a = i.sheet || i.styleSheet || {},
        l = a.cssRules || a.rules;
    layui.each(l, function (i, a) {
      if (a.selectorText === ".laytable-cell-" + e) return t(a), !0;
    });
  }, C.prototype.fullSize = function () {
    var e,
        t = this.config,
        i = t.height;
    this.fullHeightGap && ((i = x.height() - this.fullHeightGap) < 135 && (i = 135), this.elem.css("height", i)), i && (e = parseFloat(i) - (this.layHeader.outerHeight() || 38), t.toolbar && (e -= this.layTool.outerHeight() || 50), t.totalRow && (e -= this.layTotal.outerHeight() || 40), t.page && (e = e - (this.layPage.outerHeight() || 41) - 2), this.layMain.css("height", e));
  }, C.prototype.getScrollWidth = function (e) {
    var t = 0;
    return e ? t = e.offsetWidth - e.clientWidth : ((e = document.createElement("div")).style.width = "100px", e.style.height = "100px", e.style.overflowY = "scroll", document.body.appendChild(e), t = e.offsetWidth - e.clientWidth, document.body.removeChild(e)), t;
  }, C.prototype.scrollPatch = function () {
    var e = this.layMain.children("table"),
        i = this.layMain.width() - this.layMain.prop("clientWidth"),
        a = this.layMain.height() - this.layMain.prop("clientHeight"),
        l = (this.getScrollWidth(this.layMain[0]), e.outerWidth() - this.layMain.width()),
        n = function n(e) {
      if (i && a) {
        if (!(e = e.eq(0)).find(".layui-table-patch")[0]) {
          var l = t('<th class="layui-table-patch"><div class="layui-table-cell"></div></th>');
          l.find("div").css({
            width: i
          }), e.find("tr").append(l);
        }
      } else e.find(".layui-table-patch").remove();
    };

    n(this.layHeader), n(this.layTotal);
    var o = this.layMain.height() - a;
    this.layFixed.find(f).css("height", e.height() > o ? o : "auto"), this.layFixRight[l > 0 ? "removeClass" : "addClass"](h), this.layFixRight.css("right", i - 1);
  }, C.prototype.events = function () {
    var e,
        a = this,
        o = a.config,
        c = t("body"),
        u = {},
        y = a.layHeader.find("th"),
        m = ".layui-table-cell",
        g = o.elem.attr("lay-filter");
    a.layTool.on("click", "*[lay-event]", function (e) {
      var i = t(this),
          c = i.attr("lay-event"),
          u = function u(e) {
        var l = t(e.list),
            n = t('<ul class="layui-table-tool-panel"></ul>');
        n.html(l), i.find(".layui-table-tool-panel")[0] || i.append(n), a.renderForm(), n.on("click", function (e) {
          layui.stope(e);
        }), e.done && e.done(n, l);
      };

      switch (layui.stope(e), k.trigger("table.tool.panel.remove"), l.close(a.tipsIndex), c) {
        case "LAYTABLE_COLS":
          u({
            list: function () {
              var e = [];
              return a.eachCols(function (t, i) {
                i.field && "normal" == i.type && e.push('<li><input type="checkbox" name="' + i.field + '" data-key="' + i.key + '" data-parentkey="' + (i.parentKey || "") + '" lay-skin="primary" ' + (i.hide ? "" : "checked") + ' title="' + (i.title || i.field) + '" lay-filter="LAY_TABLE_TOOL_COLS"></li>');
              }), e.join("");
            }(),
            done: function done() {
              n.on("checkbox(LAY_TABLE_TOOL_COLS)", function (e) {
                var i = t(e.elem),
                    l = this.checked,
                    n = i.data("key"),
                    d = i.data("parentkey");
                layui.each(o.cols, function (e, t) {
                  layui.each(t, function (t, i) {
                    if (e + "-" + t === n) {
                      var s = i.hide;
                      i.hide = !l, a.elem.find('*[data-key="' + o.index + "-" + n + '"]')[l ? "removeClass" : "addClass"](h), s != i.hide && a.setParentCol(!l, d), a.fullSize(), a.scrollPatch(), a.setColsWidth();
                    }
                  });
                });
              });
            }
          });
          break;

        case "LAYTABLE_EXPORT":
          d.ie ? l.tips("导出功能不支持 IE，请用 Chrome 等高级浏览器导出", this, {
            tips: 3
          }) : u({
            list: ['<li data-type="csv">导出到 Csv 文件</li>', '<li data-type="xls">导出到 Excel 文件</li>'].join(""),
            done: function done(e, i) {
              i.on("click", function () {
                var e = t(this).data("type");
                s.exportFile(o.id, null, e);
              });
            }
          });
          break;

        case "LAYTABLE_PRINT":
          var y = window.open("打印窗口", "_blank"),
              f = ["<style>", "body{font-size: 12px; color: #666;}", "table{width: 100%; border-collapse: collapse; border-spacing: 0;}", "th,td{line-height: 20px; padding: 9px 15px; border: 1px solid #ccc; text-align: left; font-size: 12px; color: #666;}", "a{color: #666; text-decoration:none;}", "*.layui-hide{display: none}", "</style>"].join(""),
              p = t(a.layHeader.html());
          p.append(a.layMain.find("table").html()), p.find("th.layui-table-patch").remove(), p.find(".layui-table-col-special").remove(), y.document.write(f + p.prop("outerHTML")), y.document.close(), y.print(), y.close();
      }

      layui.event.call(this, r, "toolbar(" + g + ")", t.extend({
        event: c,
        config: o
      }, {}));
    }), y.on("mousemove", function (e) {
      var i = t(this),
          a = i.offset().left,
          l = e.clientX - a;
      i.data("unresize") || u.resizeStart || (u.allowResize = i.width() - l <= 10, c.css("cursor", u.allowResize ? "col-resize" : ""));
    }).on("mouseleave", function () {
      t(this);
      u.resizeStart || c.css("cursor", "");
    }).on("mousedown", function (e) {
      var i = t(this);

      if (u.allowResize) {
        var l = i.data("key");
        e.preventDefault(), u.resizeStart = !0, u.offset = [e.clientX, e.clientY], a.getCssRule(l, function (e) {
          var t = e.style.width || i.outerWidth();
          u.rule = e, u.ruleWidth = parseFloat(t), u.minWidth = i.data("minwidth") || o.cellMinWidth;
        });
      }
    }), k.on("mousemove", function (t) {
      if (u.resizeStart) {
        if (t.preventDefault(), u.rule) {
          var i = u.ruleWidth + t.clientX - u.offset[0];
          i < u.minWidth && (i = u.minWidth), u.rule.style.width = i + "px", l.close(a.tipsIndex);
        }

        e = 1;
      }
    }).on("mouseup", function (t) {
      u.resizeStart && (u = {}, c.css("cursor", ""), a.scrollPatch()), 2 === e && (e = null);
    }), y.on("click", function (i) {
      var l,
          n = t(this),
          o = n.find(p),
          d = o.attr("lay-sort");
      if (!o[0] || 1 === e) return e = 2;
      l = "asc" === d ? "desc" : "desc" === d ? null : "asc", a.sort(n, l, null, !0);
    }).find(p + " .layui-edge ").on("click", function (e) {
      var i = t(this),
          l = i.index(),
          n = i.parents("th").eq(0).data("field");
      layui.stope(e), 0 === l ? a.sort(n, "asc", null, !0) : a.sort(n, "desc", null, !0);
    });

    var b = function b(e) {
      var l = t(this).parents("tr").eq(0).data("index"),
          n = a.layBody.find('tr[data-index="' + l + '"]'),
          o = s.cache[a.key][l];
      return t.extend({
        tr: n,
        data: s.clearCacheKey(o),
        del: function del() {
          s.cache[a.key][l] = [], n.remove(), a.scrollPatch();
        },
        update: function update(e) {
          e = e || {}, layui.each(e, function (e, l) {
            if (e in o) {
              var d,
                  s = n.children('td[data-field="' + e + '"]');
              o[e] = l, a.eachCols(function (t, i) {
                i.field == e && i.templet && (d = i.templet);
              }), s.children(m).html(d ? "function" == typeof d ? d(o) : i(t(d).html() || l).render(o) : l), s.data("content", l);
            }
          });
        }
      }, e);
    };

    a.elem.on("click", 'input[name="layTableCheckbox"]+', function () {
      var e = t(this).prev(),
          i = a.layBody.find('input[name="layTableCheckbox"]'),
          l = e.parents("tr").eq(0).data("index"),
          n = e[0].checked,
          o = "layTableAllChoose" === e.attr("lay-filter");
      o ? (i.each(function (e, t) {
        t.checked = n, a.setCheckData(e, n);
      }), a.syncCheckAll(), a.renderForm("checkbox")) : (a.setCheckData(l, n), a.syncCheckAll()), layui.event.call(this, r, "checkbox(" + g + ")", b.call(this, {
        checked: n,
        type: o ? "all" : "one"
      }));
    }), a.elem.on("click", 'input[lay-type="layTableRadio"]+', function () {
      var e = t(this).prev(),
          i = e[0].checked,
          l = s.cache[a.key],
          n = e.parents("tr").eq(0).data("index");
      layui.each(l, function (e, t) {
        n === e ? t.LAY_CHECKED = !0 : delete t.LAY_CHECKED;
      }), a.setThisRowChecked(n), layui.event.call(this, r, "radio(" + g + ")", b.call(this, {
        checked: i
      }));
    }), a.layBody.on("mouseenter", "tr", function () {
      var e = t(this).index();
      a.layBody.find("tr:eq(" + e + ")").addClass("layui-table-hover");
    }).on("mouseleave", "tr", function () {
      var e = t(this).index();
      a.layBody.find("tr:eq(" + e + ")").removeClass("layui-table-hover");
    }).on("click", "tr", function () {
      C.call(this, "row");
    }).on("dblclick", "tr", function () {
      C.call(this, "rowDouble");
    });

    var C = function C(e) {
      var i = t(this);
      layui.event.call(this, r, e + "(" + g + ")", b.call(i.children("td")[0]));
    };

    a.layBody.on("change", "." + v, function () {
      var e = t(this),
          i = this.value,
          l = e.parent().data("field"),
          n = e.parents("tr").eq(0).data("index");
      s.cache[a.key][n][l] = i, layui.event.call(this, r, "edit(" + g + ")", b.call(this, {
        value: i,
        field: l
      }));
    }).on("blur", "." + v, function () {
      var e,
          l = t(this),
          n = l.parent().data("field"),
          o = l.parents("tr").eq(0).data("index"),
          d = s.cache[a.key][o];
      a.eachCols(function (t, i) {
        i.field == n && i.templet && (e = i.templet);
      }), l.siblings(m).html((c = this.value, e ? function () {
        return "function" == typeof e ? e(d) : i(t(e).html() || this.value).render(d);
      }() : c));
      var c;
      l.parent().data("content", this.value), l.remove();
    }), a.layBody.on("click", "td", function () {
      var e = t(this),
          i = (e.data("field"), e.data("edit")),
          a = e.children(m);

      if (!e.data("off") && i) {
        var l = t('<input class="layui-input ' + v + '">');
        return l[0].value = e.data("content") || a.text(), e.find("." + v)[0] || e.append(l), void l.focus();
      }
    }).on("mouseenter", "td", function () {
      T.call(this);
    }).on("mouseleave", "td", function () {
      T.call(this, "hide");
    });

    var w = "layui-table-grid-down",
        T = function T(e) {
      var i = t(this),
          a = i.children(m);
      if (e) i.find(".layui-table-grid-down").remove();else if (a.prop("scrollWidth") > a.outerWidth()) {
        if (a.find("." + w)[0]) return;
        i.append('<div class="' + w + '"><i class="layui-icon layui-icon-down"></i></div>');
      }
    };

    a.layBody.on("click", "." + w, function () {
      var e = t(this).parent().children(m);
      a.tipsIndex = l.tips(['<div class="layui-table-tips-main" style="margin-top: -' + (e.height() + 16) + "px;" + ("sm" === o.size ? "padding: 4px 15px; font-size: 12px;" : "lg" === o.size ? "padding: 14px 15px;" : "") + '">', e.html(), "</div>", '<i class="layui-icon layui-table-tips-c layui-icon-close"></i>'].join(""), e[0], {
        tips: [3, ""],
        time: -1,
        anim: -1,
        maxWidth: d.ios || d.android ? 300 : a.elem.width() / 2,
        isOutAnim: !1,
        skin: "layui-table-tips",
        success: function success(e, t) {
          e.find(".layui-table-tips-c").on("click", function () {
            l.close(t);
          });
        }
      });
    }), a.layBody.on("click", "*[lay-event]", function () {
      var e = t(this),
          i = e.parents("tr").eq(0).data("index");
      layui.event.call(this, r, "tool(" + g + ")", b.call(this, {
        event: e.attr("lay-event")
      })), a.setThisRowChecked(i);
    }), a.layMain.on("scroll", function () {
      var e = t(this),
          i = e.scrollLeft(),
          n = e.scrollTop();
      a.layHeader.scrollLeft(i), a.layTotal.scrollLeft(i), a.layFixed.find(f).scrollTop(n), l.close(a.tipsIndex);
    }), k.on("click", function () {
      k.trigger("table.remove.tool.panel");
    }), k.on("table.remove.tool.panel", function () {
      t(".layui-table-tool-panel").remove();
    }), x.on("resize", function () {
      a.fullSize(), a.scrollPatch(), a.setColsWidth();
    });
  }, s.init = function (e, i) {
    i = i || {};
    var a = "Table element property lay-data configuration item has a syntax error: ";
    return t(e ? 'table[lay-filter="' + e + '"]' : ".layui-table[lay-data]").each(function () {
      var l = t(this),
          n = l.attr("lay-data");

      try {
        n = new Function("return " + n)();
      } catch (e) {
        o.error(a + n);
      }

      var d = [],
          c = t.extend({
        elem: this,
        cols: [],
        data: [],
        skin: l.attr("lay-skin"),
        size: l.attr("lay-size"),
        even: "string" == typeof l.attr("lay-even")
      }, s.config, i, n);
      e && l.hide(), l.find("thead>tr").each(function (e) {
        c.cols[e] = [], t(this).children().each(function (i) {
          var l = t(this),
              n = l.attr("lay-data");

          try {
            n = new Function("return " + n)();
          } catch (e) {
            return o.error(a + n);
          }

          var s = t.extend({
            title: l.text(),
            colspan: l.attr("colspan") || 0,
            rowspan: l.attr("rowspan") || 0
          }, n);
          s.colspan < 2 && d.push(s), c.cols[e].push(s);
        });
      }), l.find("tbody>tr").each(function (e) {
        var i = t(this),
            a = {};
        i.children("td").each(function (e, i) {
          var l = t(this),
              n = l.data("field");
          if (n) return a[n] = l.html();
        }), layui.each(d, function (e, t) {
          var l = i.children("td").eq(e);
          a[t.field] = l.html();
        }), c.data[e] = a;
      }), s.render(c);
    }), this;
  }, c.config = {}, s.eachCols = function (e, i, a) {
    var l = c.config[e] || {},
        n = [],
        o = 0;
    a = t.extend(!0, [], a || l.cols), layui.each(a, function (e, t) {
      layui.each(t, function (t, i) {
        if (i.colGroup) {
          var l = 0;
          o++, i.CHILD_COLS = [], layui.each(a[e + 1], function (e, t) {
            t.PARENT_COL_INDEX || l > 1 && l == i.colspan || (t.PARENT_COL_INDEX = o, i.CHILD_COLS.push(t), l += parseInt(t.colspan > 1 ? t.colspan : 1));
          });
        }

        i.PARENT_COL_INDEX || n.push(i);
      });
    });

    var d = function d(e) {
      layui.each(e || n, function (e, t) {
        if (t.CHILD_COLS) return d(t.CHILD_COLS);
        "function" == typeof i && i(e, t);
      });
    };

    d();
  }, s.checkStatus = function (e) {
    var t = 0,
        i = 0,
        a = [],
        l = s.cache[e] || [];
    return layui.each(l, function (e, l) {
      l.constructor !== Array ? l[s.config.checkName] && (t++, a.push(s.clearCacheKey(l))) : i++;
    }), {
      data: a,
      isAll: !!l.length && t === l.length - i
    };
  }, s.exportFile = function (e, t, i) {
    t = t || s.clearCacheKey(s.cache[e]), i = i || "csv";
    var a = c.config[e] || {},
        l = {
      csv: "text/csv",
      xls: "application/vnd.ms-excel"
    }[i],
        n = document.createElement("a");
    if (d.ie) return o.error("IE_NOT_SUPPORT_EXPORTS");
    n.href = "data:" + l + ";charset=utf-8,\uFEFF" + encodeURIComponent(function () {
      var i = [],
          a = [];
      return layui.each(t, function (t, l) {
        var n = [];
        "object" == _typeof(e) ? (layui.each(e, function (e, a) {
          0 == t && i.push(a || "");
        }), layui.each(s.clearCacheKey(l), function (e, t) {
          n.push(t);
        })) : s.eachCols(e, function (e, a) {
          a.field && "normal" == a.type && !a.hide && (0 == t && i.push(a.title || ""), n.push(l[a.field]));
        }), a.push(n.join(","));
      }), i.join(",") + "\r\n" + a.join("\r\n");
    }()), n.download = (a.title || "table_" + (a.index || "")) + "." + i, document.body.appendChild(n), n.click(), document.body.removeChild(n);
  }, s.reload = function (e, i) {
    var a = c.config[e];
    return i = i || {}, a ? (i.data && i.data.constructor === Array && delete a.data, s.render(t.extend(!0, {}, a, i))) : o.error("The ID option was not found in the table instance");
  }, s.render = function (e) {
    var t = new C(e);
    return c.call(t);
  }, s.clearCacheKey = function (e) {
    return delete (e = t.extend({}, e))[s.config.checkName], delete e[s.config.indexName], e;
  }, s.init(), e(r, s);
});
layui.define("jquery", function (e) {
  "use strict";

  var i = layui.$,
      t = (layui.hint(), layui.device(), {
    config: {},
    set: function set(e) {
      return this.config = i.extend({}, this.config, e), this;
    },
    on: function on(e, i) {
      return layui.onevent.call(this, n, e, i);
    }
  }),
      n = "carousel",
      a = "layui-this",
      l = "layui-carousel-left",
      o = "layui-carousel-right",
      d = "layui-carousel-prev",
      s = "layui-carousel-next",
      r = "layui-carousel-arrow",
      u = "layui-carousel-ind",
      c = function c(e) {
    this.config = i.extend({}, this.config, t.config, e), this.render();
  };

  c.prototype.config = {
    width: "600px",
    height: "280px",
    full: !1,
    arrow: "hover",
    indicator: "inside",
    autoplay: !0,
    interval: 3e3,
    anim: "",
    trigger: "click",
    index: 0
  }, c.prototype.render = function () {
    var e = this.config;
    e.elem = i(e.elem), e.elem[0] && (this.elemItem = e.elem.find(">*[carousel-item]>*"), e.index < 0 && (e.index = 0), e.index >= this.elemItem.length && (e.index = this.elemItem.length - 1), e.interval < 800 && (e.interval = 800), e.full ? e.elem.css({
      position: "fixed",
      width: "100%",
      height: "100%",
      zIndex: 9999
    }) : e.elem.css({
      width: e.width,
      height: e.height
    }), e.elem.attr("lay-anim", e.anim), this.elemItem.eq(e.index).addClass(a), this.elemItem.length <= 1 || (this.indicator(), this.arrow(), this.autoplay(), this.events()));
  }, c.prototype.reload = function (e) {
    clearInterval(this.timer), this.config = i.extend({}, this.config, e), this.render();
  }, c.prototype.prevIndex = function () {
    var e = this.config.index - 1;
    return e < 0 && (e = this.elemItem.length - 1), e;
  }, c.prototype.nextIndex = function () {
    var e = this.config.index + 1;
    return e >= this.elemItem.length && (e = 0), e;
  }, c.prototype.addIndex = function (e) {
    var i = this.config;
    e = e || 1, i.index = i.index + e, i.index >= this.elemItem.length && (i.index = 0);
  }, c.prototype.subIndex = function (e) {
    var i = this.config;
    e = e || 1, i.index = i.index - e, i.index < 0 && (i.index = this.elemItem.length - 1);
  }, c.prototype.autoplay = function () {
    var e = this,
        i = e.config;
    i.autoplay && (e.timer = setInterval(function () {
      e.slide();
    }, i.interval));
  }, c.prototype.arrow = function () {
    var e = this,
        t = e.config,
        n = i(['<button class="layui-icon ' + r + '" lay-type="sub">' + ("updown" === t.anim ? "&#xe619;" : "&#xe603;") + "</button>", '<button class="layui-icon ' + r + '" lay-type="add">' + ("updown" === t.anim ? "&#xe61a;" : "&#xe602;") + "</button>"].join(""));
    t.elem.attr("lay-arrow", t.arrow), t.elem.find("." + r)[0] && t.elem.find("." + r).remove(), t.elem.append(n), n.on("click", function () {
      var t = i(this).attr("lay-type");
      e.slide(t);
    });
  }, c.prototype.indicator = function () {
    var e = this,
        t = e.config,
        n = e.elemInd = i(['<div class="' + u + '"><ul>', function () {
      var i = [];
      return layui.each(e.elemItem, function (e) {
        i.push("<li" + (t.index === e ? ' class="layui-this"' : "") + "></li>");
      }), i.join("");
    }(), "</ul></div>"].join(""));
    t.elem.attr("lay-indicator", t.indicator), t.elem.find("." + u)[0] && t.elem.find("." + u).remove(), t.elem.append(n), "updown" === t.anim && n.css("margin-top", -n.height() / 2), n.find("li").on("hover" === t.trigger ? "mouseover" : t.trigger, function () {
      var n = i(this).index();
      n > t.index ? e.slide("add", n - t.index) : n < t.index && e.slide("sub", t.index - n);
    });
  }, c.prototype.slide = function (e, i) {
    var t = this,
        r = t.elemItem,
        u = t.config,
        c = u.index,
        h = u.elem.attr("lay-filter");
    t.haveSlide || ("sub" === e ? (t.subIndex(i), r.eq(u.index).addClass(d), setTimeout(function () {
      r.eq(c).addClass(o), r.eq(u.index).addClass(o);
    }, 50)) : (t.addIndex(i), r.eq(u.index).addClass(s), setTimeout(function () {
      r.eq(c).addClass(l), r.eq(u.index).addClass(l);
    }, 50)), setTimeout(function () {
      r.removeClass(a + " " + d + " " + s + " " + l + " " + o), r.eq(u.index).addClass(a), t.haveSlide = !1;
    }, 300), t.elemInd.find("li").eq(u.index).addClass(a).siblings().removeClass(a), t.haveSlide = !0, layui.event.call(this, n, "change(" + h + ")", {
      index: u.index,
      prevIndex: c,
      item: r.eq(u.index)
    }));
  }, c.prototype.events = function () {
    var e = this,
        i = e.config;
    i.elem.data("haveEvents") || (i.elem.on("mouseenter", function () {
      clearInterval(e.timer);
    }).on("mouseleave", function () {
      e.autoplay();
    }), i.elem.data("haveEvents", !0));
  }, t.render = function (e) {
    return new c(e);
  }, e(n, t);
});
layui.define("jquery", function (e) {
  "use strict";

  var i = layui.jquery,
      a = {
    config: {},
    index: layui.rate ? layui.rate.index + 1e4 : 0,
    set: function set(e) {
      return this.config = i.extend({}, this.config, e), this;
    },
    on: function on(e, i) {
      return layui.onevent.call(this, l, e, i);
    }
  },
      l = "rate",
      t = "layui-icon-rate",
      n = "layui-icon-rate-solid",
      o = "layui-icon-rate-half",
      s = "layui-icon-rate-solid layui-icon-rate-half",
      u = "layui-icon-rate layui-icon-rate-half",
      c = function c(e) {
    this.index = ++a.index, this.config = i.extend({}, this.config, a.config, e), this.render();
  };

  c.prototype.config = {
    length: 5,
    text: !1,
    readonly: !1,
    half: !1,
    value: 0,
    theme: ""
  }, c.prototype.render = function () {
    var e = this.config,
        a = e.theme ? 'style="color: ' + e.theme + ';"' : "";
    e.elem = i(e.elem), parseInt(e.value) !== e.value && (e.half || (e.value = Math.ceil(e.value) - e.value < .5 ? Math.ceil(e.value) : Math.floor(e.value)));

    for (var l = '<ul class="layui-rate" ' + (e.readonly ? "readonly" : "") + ">", o = 1; o <= e.length; o++) {
      var s = '<li class="layui-inline"><i class="layui-icon ' + (o > Math.floor(e.value) ? t : n) + '" ' + a + "></i></li>";
      e.half && parseInt(e.value) !== e.value && o == Math.ceil(e.value) ? l = l + '<li><i class="layui-icon layui-icon-rate-half" ' + a + "></i></li>" : l += s;
    }

    l += "</ul>" + (e.text ? '<span class="layui-inline">' + e.value + "星" : "") + "</span>";
    var u = e.elem,
        c = u.next(".layui-rate");
    c[0] && c.remove(), this.elemTemp = i(l), e.span = this.elemTemp.next("span"), e.setText && e.setText(e.value), u.html(this.elemTemp), u.addClass("layui-inline"), e.readonly || this.action();
  }, c.prototype.setvalue = function (e) {
    this.config.value = e, this.render();
  }, c.prototype.action = function () {
    var e = this.config,
        a = this.elemTemp,
        l = a.find("i").width();
    a.children("li").each(function (c) {
      var r = c + 1,
          f = i(this);
      f.on("click", function (t) {
        if (e.value = r, e.half) {
          t.pageX - i(this).offset().left <= l / 2 && (e.value = e.value - .5);
        }

        e.text && a.next("span").text(e.value + "星"), e.choose && e.choose(e.value), e.setText && e.setText(e.value);
      }), f.on("mousemove", function (c) {
        if (a.find("i").each(function () {
          i(this).addClass(t).removeClass(s);
        }), a.find("i:lt(" + r + ")").each(function () {
          i(this).addClass(n).removeClass(u);
        }), e.half) {
          c.pageX - i(this).offset().left <= l / 2 && f.children("i").addClass(o).removeClass(n);
        }
      }), f.on("mouseleave", function () {
        a.find("i").each(function () {
          i(this).addClass(t).removeClass(s);
        }), a.find("i:lt(" + Math.floor(e.value) + ")").each(function () {
          i(this).addClass(n).removeClass(u);
        }), e.half && parseInt(e.value) !== e.value && a.children("li:eq(" + Math.floor(e.value) + ")").children("i").addClass(o).removeClass("layui-icon-rate-solid layui-icon-rate");
      });
    });
  }, c.prototype.events = function () {
    this.config;
  }, a.render = function (e) {
    var i = new c(e);
    return function () {
      var e = this;
      return {
        setvalue: function setvalue(i) {
          e.setvalue.call(e, i);
        },
        config: e.config
      };
    }.call(i);
  }, e(l, a);
});
layui.define("jquery", function (t) {
  "use strict";

  var e = layui.$,
      i = {
    fixbar: function fixbar(t) {
      var i,
          a,
          n = e(document),
          r = e("body");
      (t = e.extend({
        showHeight: 200
      }, t)).bar1 = !0 === t.bar1 ? "&#xe606;" : t.bar1, t.bar2 = !0 === t.bar2 ? "&#xe607;" : t.bar2, t.bgcolor = t.bgcolor ? "background-color:" + t.bgcolor : "";

      var o = [t.bar1, t.bar2, "&#xe604;"],
          l = e(['<ul class="layui-fixbar">', t.bar1 ? '<li class="layui-icon" lay-type="bar1" style="' + t.bgcolor + '">' + o[0] + "</li>" : "", t.bar2 ? '<li class="layui-icon" lay-type="bar2" style="' + t.bgcolor + '">' + o[1] + "</li>" : "", '<li class="layui-icon layui-fixbar-top" lay-type="top" style="' + t.bgcolor + '">' + o[2] + "</li>", "</ul>"].join("")),
          c = l.find(".layui-fixbar-top"),
          s = function s() {
        n.scrollTop() >= t.showHeight ? i || (c.show(), i = 1) : i && (c.hide(), i = 0);
      };

      e(".layui-fixbar")[0] || ("object" == _typeof(t.css) && l.css(t.css), r.append(l), s(), l.find("li").on("click", function () {
        var i = e(this).attr("lay-type");
        "top" === i && e("html,body").animate({
          scrollTop: 0
        }, 200), t.click && t.click.call(this, i);
      }), n.on("scroll", function () {
        clearTimeout(a), a = setTimeout(function () {
          s();
        }, 100);
      }));
    },
    countdown: function countdown(t, e, i) {
      var a = this,
          n = "function" == typeof e,
          r = new Date(t).getTime(),
          o = new Date(!e || n ? new Date().getTime() : e).getTime(),
          l = r - o,
          c = [Math.floor(l / 864e5), Math.floor(l / 36e5) % 24, Math.floor(l / 6e4) % 60, Math.floor(l / 1e3) % 60];
      n && (i = e);
      var s = setTimeout(function () {
        a.countdown(t, o + 1e3, i);
      }, 1e3);
      return i && i(l > 0 ? c : [0, 0, 0, 0], e, s), l <= 0 && clearTimeout(s), s;
    },
    timeAgo: function timeAgo(t, e) {
      var i = [[], []],
          a = new Date().getTime() - new Date(t).getTime();
      return a > 6912e5 ? (a = new Date(t), i[0][0] = this.digit(a.getFullYear(), 4), i[0][1] = this.digit(a.getMonth() + 1), i[0][2] = this.digit(a.getDate()), e || (i[1][0] = this.digit(a.getHours()), i[1][1] = this.digit(a.getMinutes()), i[1][2] = this.digit(a.getSeconds())), i[0].join("-") + " " + i[1].join(":")) : a >= 864e5 ? (a / 1e3 / 60 / 60 / 24 | 0) + "天前" : a >= 36e5 ? (a / 1e3 / 60 / 60 | 0) + "小时前" : a >= 12e4 ? (a / 1e3 / 60 | 0) + "分钟前" : a < 0 ? "未来" : "刚刚";
    },
    digit: function digit(t, e) {
      var i = "";
      t = String(t), e = e || 2;

      for (var a = t.length; a < e; a++) {
        i += "0";
      }

      return t < Math.pow(10, e) ? i + (0 | t) : t;
    },
    toDateString: function toDateString(t, e) {
      var i = new Date(t || new Date()),
          a = [this.digit(i.getFullYear(), 4), this.digit(i.getMonth() + 1), this.digit(i.getDate())],
          n = [this.digit(i.getHours()), this.digit(i.getMinutes()), this.digit(i.getSeconds())];
      return (e = e || "yyyy-MM-dd HH:mm:ss").replace(/yyyy/g, a[0]).replace(/MM/g, a[1]).replace(/dd/g, a[2]).replace(/HH/g, n[0]).replace(/mm/g, n[1]).replace(/ss/g, n[2]);
    },
    escape: function escape(t) {
      return String(t || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    }
  };
  !function (t, e, i) {
    "$:nomunge";

    var a,
        n = t([]),
        r = t.resize = t.extend(t.resize, {}),
        o = "setTimeout",
        l = "resize",
        c = l + "-special-event",
        s = "delay",
        g = "throttleWindow";
    r[s] = 250, r[g] = !0, t.event.special[l] = {
      setup: function setup() {
        if (!r[g] && this[o]) return !1;
        var i = t(this);
        n = n.add(i), t.data(this, c, {
          w: i.width(),
          h: i.height()
        }), 1 === n.length && function i() {
          a = e[o](function () {
            n.each(function () {
              var e = t(this),
                  i = e.width(),
                  a = e.height(),
                  n = t.data(this, c);
              (i !== n.w || a !== n.h) && e.trigger(l, [n.w = i, n.h = a]);
            }), i();
          }, r[s]);
        }();
      },
      teardown: function teardown() {
        if (!r[g] && this[o]) return !1;
        var e = t(this);
        n = n.not(e), e.removeData(c), n.length || clearTimeout(a);
      },
      add: function add(e) {
        function a(e, a, r) {
          var o = t(this),
              l = t.data(this, c) || {};
          l.w = a !== i ? a : o.width(), l.h = r !== i ? r : o.height(), n.apply(this, arguments);
        }

        if (!r[g] && this[o]) return !1;
        var n;
        return t.isFunction(e) ? (n = e, a) : (n = e.handler, void (e.handler = a));
      }
    };
  }(e, window), t("util", i);
});
layui.define("jquery", function (e) {
  "use strict";

  var l = layui.$,
      i = function i(e) {};

  i.prototype.load = function (e) {
    var i,
        o,
        t,
        n = 0,
        r = l((e = e || {}).elem);

    if (r[0]) {
      var a = l(e.scrollElem || document),
          c = e.mb || 50,
          m = !("isAuto" in e) || e.isAuto,
          f = e.end || "没有更多了",
          s = e.scrollElem && e.scrollElem !== document,
          u = l('<div class="layui-flow-more"><a href="javascript:;"><cite>加载更多</cite></a></div>');
      r.find(".layui-flow-more")[0] || r.append(u);

      var h = function h(e, t) {
        e = l(e), u.before(e), (t = 0 == t || null) ? u.html(f) : u.find("a").html("<cite>加载更多</cite>"), o = t, i = null, d && d();
      },
          y = function y() {
        i = !0, u.find("a").html('<i class="layui-anim layui-anim-rotate layui-anim-loop layui-icon ">&#xe63e;</i>'), "function" == typeof e.done && e.done(++n, h);
      };

      if (y(), u.find("a").on("click", function () {
        l(this);
        o || i || y();
      }), e.isLazyimg) var d = this.lazyimg({
        elem: e.elem + " img",
        scrollElem: e.scrollElem
      });
      return m ? (a.on("scroll", function () {
        var e = l(this),
            n = e.scrollTop();
        t && clearTimeout(t), o || (t = setTimeout(function () {
          var o = s ? e.height() : l(window).height();
          (s ? e.prop("scrollHeight") : document.documentElement.scrollHeight) - n - o <= c && (i || y());
        }, 100));
      }), this) : this;
    }
  }, i.prototype.lazyimg = function (e) {
    var i,
        o = this,
        t = 0,
        n = l((e = e || {}).scrollElem || document),
        r = e.elem || "img",
        a = e.scrollElem && e.scrollElem !== document,
        c = function c(e, l) {
      var i = n.scrollTop(),
          r = i + l,
          c = a ? e.offset().top - n.offset().top + i : e.offset().top;

      if (c >= i && c <= r && !e.attr("src")) {
        var f = e.attr("lay-src");
        layui.img(f, function () {
          var l = o.lazyimg.elem.eq(t);
          e.attr("src", f).removeAttr("lay-src"), l[0] && m(l), t++;
        });
      }
    },
        m = function m(e, i) {
      var m = a ? (i || n).height() : l(window).height(),
          f = n.scrollTop(),
          s = f + m;
      if (o.lazyimg.elem = l(r), e) c(e, m);else for (var u = 0; u < o.lazyimg.elem.length; u++) {
        var h = o.lazyimg.elem.eq(u),
            y = a ? h.offset().top - n.offset().top + f : h.offset().top;
        if (c(h, m), t = u, y > s) break;
      }
    };

    if (m(), !i) {
      var f;
      n.on("scroll", function () {
        var e = l(this);
        f && clearTimeout(f), f = setTimeout(function () {
          m(null, e);
        }, 50);
      }), i = !0;
    }

    return m;
  }, e("flow", new i());
});
layui.define(["layer", "form"], function (t) {
  "use strict";

  var e = layui.$,
      i = layui.layer,
      a = layui.form,
      l = (layui.hint(), layui.device()),
      n = "layui-disabled",
      o = function o() {
    this.index = 0, this.config = {
      tool: ["strong", "italic", "underline", "del", "|", "left", "center", "right", "|", "link", "unlink", "face", "image"],
      hideTool: [],
      height: 280
    };
  };

  o.prototype.set = function (t) {
    return e.extend(!0, this.config, t), this;
  }, o.prototype.on = function (t, e) {
    return layui.onevent("layedit", t, e);
  }, o.prototype.build = function (t, i) {
    i = i || {};

    var a = this.config,
        n = e("string" == typeof t ? "#" + t : t),
        o = "LAY_layedit_" + ++this.index,
        c = n.next(".layui-layedit"),
        r = e.extend({}, a, i),
        u = function () {
      var t = [],
          e = {};
      return layui.each(r.hideTool, function (t, i) {
        e[i] = !0;
      }), layui.each(r.tool, function (i, a) {
        x[a] && !e[a] && t.push(x[a]);
      }), t.join("");
    }(),
        d = e(['<div class="layui-layedit">', '<div class="layui-unselect layui-layedit-tool">' + u + "</div>", '<div class="layui-layedit-iframe">', '<iframe id="' + o + '" name="' + o + '" textarea="' + t + '" frameborder="0"></iframe>', "</div>", "</div>"].join(""));

    return l.ie && l.ie < 8 ? n.removeClass("layui-hide").addClass("layui-show") : (c[0] && c.remove(), s.call(this, d, n[0], r), n.addClass("layui-hide").after(d), this.index);
  }, o.prototype.getContent = function (t) {
    var e = c(t);
    if (e[0]) return r(e[0].document.body.innerHTML);
  }, o.prototype.getText = function (t) {
    var i = c(t);
    if (i[0]) return e(i[0].document.body).text();
  }, o.prototype.setContent = function (t, i, a) {
    var l = c(t);
    l[0] && (a ? e(l[0].document.body).append(i) : e(l[0].document.body).html(i), layedit.sync(t));
  }, o.prototype.sync = function (t) {
    var i = c(t);

    if (i[0]) {
      e("#" + i[1].attr("textarea")).val(r(i[0].document.body.innerHTML));
    }
  }, o.prototype.getSelection = function (t) {
    var e = c(t);

    if (e[0]) {
      var i = y(e[0].document);
      return document.selection ? i.text : i.toString();
    }
  };

  var s = function s(t, i, a) {
    var l = this,
        n = t.find("iframe");
    n.css({
      height: a.height
    }).on("load", function () {
      var o = n.contents(),
          s = n.prop("contentWindow"),
          c = o.find("head"),
          r = e(["<style>", "*{margin: 0; padding: 0;}", "body{padding: 10px; line-height: 20px; overflow-x: hidden; word-wrap: break-word; font: 14px Helvetica Neue,Helvetica,PingFang SC,Microsoft YaHei,Tahoma,Arial,sans-serif; -webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; box-sizing: border-box !important;}", "a{color:#01AAED; text-decoration:none;}a:hover{color:#c00}", "p{margin-bottom: 10px;}", "img{display: inline-block; border: none; vertical-align: middle;}", "pre{margin: 10px 0; padding: 10px; line-height: 20px; border: 1px solid #ddd; border-left-width: 6px; background-color: #F2F2F2; color: #333; font-family: Courier New; font-size: 12px;}", "</style>"].join("")),
          d = o.find("body");
      c.append(r), d.attr("contenteditable", "true").css({
        "min-height": a.height
      }).html(i.value || ""), u.apply(l, [s, n, i, a]), h.call(l, s, t, a);
    });
  },
      c = function c(t) {
    var i = e("#LAY_layedit_" + t);
    return [i.prop("contentWindow"), i];
  },
      r = function r(t) {
    return 8 == l.ie && (t = t.replace(/<.+>/g, function (t) {
      return t.toLowerCase();
    })), t;
  },
      u = function u(t, a, n, o) {
    var s = t.document,
        c = e(s.body);
    c.on("keydown", function (t) {
      if (13 === t.keyCode) {
        var e = y(s);

        if ("pre" === f(e).parentNode.tagName.toLowerCase()) {
          if (t.shiftKey) return;
          return i.msg("请暂时用shift+enter"), !1;
        }

        s.execCommand("formatBlock", !1, "<p>");
      }
    }), e(n).parents("form").on("submit", function () {
      var t = c.html();
      8 == l.ie && (t = t.replace(/<.+>/g, function (t) {
        return t.toLowerCase();
      })), n.value = t;
    }), c.on("paste", function (e) {
      s.execCommand("formatBlock", !1, "<p>"), setTimeout(function () {
        d.call(t, c), n.value = c.html();
      }, 100);
    });
  },
      d = function d(t) {
    this.document;
    t.find("*[style]").each(function () {
      var t = this.style.textAlign;
      this.removeAttribute("style"), e(this).css({
        "text-align": t || ""
      });
    }), t.find("table").addClass("layui-table"), t.find("script,link").remove();
  },
      y = function y(t) {
    return t.selection ? t.selection.createRange() : t.getSelection().getRangeAt(0);
  },
      f = function f(t) {
    return t.endContainer || t.parentElement().childNodes[0];
  },
      m = function m(t, i, a) {
    var l = this.document,
        n = document.createElement(t);

    for (var o in i) {
      n.setAttribute(o, i[o]);
    }

    if (n.removeAttribute("text"), l.selection) {
      var s = a.text || i.text;
      if ("a" === t && !s) return;
      s && (n.innerHTML = s), a.pasteHTML(e(n).prop("outerHTML")), a.select();
    } else {
      s = a.toString() || i.text;
      if ("a" === t && !s) return;
      s && (n.innerHTML = s), a.deleteContents(), a.insertNode(n);
    }
  },
      p = function p(t, i) {
    var a = this.document,
        l = "layedit-tool-active",
        o = f(y(a)),
        s = function s(e) {
      return t.find(".layedit-tool-" + e);
    };

    i && i[i.hasClass(l) ? "removeClass" : "addClass"](l), t.find(">i").removeClass(l), s("unlink").addClass(n), e(o).parents().each(function () {
      var t = this.tagName.toLowerCase(),
          e = this.style.textAlign;
      "b" !== t && "strong" !== t || s("b").addClass(l), "i" !== t && "em" !== t || s("i").addClass(l), "u" === t && s("u").addClass(l), "strike" === t && s("d").addClass(l), "p" === t && ("center" === e ? s("center").addClass(l) : "right" === e ? s("right").addClass(l) : s("left").addClass(l)), "a" === t && (s("link").addClass(l), s("unlink").removeClass(n));
    });
  },
      h = function h(t, a, l) {
    var o = t.document,
        s = e(o.body),
        c = {
      link: function link(i) {
        var a = f(i),
            l = e(a).parent();
        v.call(s, {
          href: l.attr("href"),
          target: l.attr("target")
        }, function (e) {
          var a = l[0];
          "A" === a.tagName ? a.href = e.url : m.call(t, "a", {
            target: e.target,
            href: e.url,
            text: e.url
          }, i);
        });
      },
      unlink: function unlink(t) {
        o.execCommand("unlink");
      },
      face: function face(e) {
        g.call(this, function (i) {
          m.call(t, "img", {
            src: i.src,
            alt: i.alt
          }, e);
        });
      },
      image: function image(a) {
        var n = this;
        layui.use("upload", function (o) {
          var s = l.uploadImage || {};
          o.render({
            url: s.url,
            method: s.type,
            elem: e(n).find("input")[0],
            done: function done(e) {
              0 == e.code ? (e.data = e.data || {}, m.call(t, "img", {
                src: e.data.src,
                alt: e.data.title
              }, a)) : i.msg(e.msg || "上传失败");
            }
          });
        });
      },
      code: function code(e) {
        b.call(s, function (i) {
          m.call(t, "pre", {
            text: i.code,
            "lay-lang": i.lang
          }, e);
        });
      },
      help: function help() {
        i.open({
          type: 2,
          title: "帮助",
          area: ["600px", "380px"],
          shadeClose: !0,
          shade: .1,
          skin: "layui-layer-msg",
          content: ["http://www.layui.com/about/layedit/help.html", "no"]
        });
      }
    },
        r = a.find(".layui-layedit-tool"),
        u = function u() {
      var i = e(this),
          a = i.attr("layedit-event"),
          l = i.attr("lay-command");

      if (!i.hasClass(n)) {
        s.focus();
        var u = y(o);
        u.commonAncestorContainer;
        l ? (o.execCommand(l), /justifyLeft|justifyCenter|justifyRight/.test(l) && o.execCommand("formatBlock", !1, "<p>"), setTimeout(function () {
          s.focus();
        }, 10)) : c[a] && c[a].call(this, u), p.call(t, r, i);
      }
    },
        d = /image/;

    r.find(">i").on("mousedown", function () {
      var t = e(this).attr("layedit-event");
      d.test(t) || u.call(this);
    }).on("click", function () {
      var t = e(this).attr("layedit-event");
      d.test(t) && u.call(this);
    }), s.on("click", function () {
      p.call(t, r), i.close(g.index);
    });
  },
      v = function v(t, e) {
    var l = this,
        n = i.open({
      type: 1,
      id: "LAY_layedit_link",
      area: "350px",
      shade: .05,
      shadeClose: !0,
      moveType: 1,
      title: "超链接",
      skin: "layui-layer-msg",
      content: ['<ul class="layui-form" style="margin: 15px;">', '<li class="layui-form-item">', '<label class="layui-form-label" style="width: 60px;">URL</label>', '<div class="layui-input-block" style="margin-left: 90px">', '<input name="url" lay-verify="url" value="' + (t.href || "") + '" autofocus="true" autocomplete="off" class="layui-input">', "</div>", "</li>", '<li class="layui-form-item">', '<label class="layui-form-label" style="width: 60px;">打开方式</label>', '<div class="layui-input-block" style="margin-left: 90px">', '<input type="radio" name="target" value="_self" class="layui-input" title="当前窗口"' + ("_self" !== t.target && t.target ? "" : "checked") + ">", '<input type="radio" name="target" value="_blank" class="layui-input" title="新窗口" ' + ("_blank" === t.target ? "checked" : "") + ">", "</div>", "</li>", '<li class="layui-form-item" style="text-align: center;">', '<button type="button" lay-submit lay-filter="layedit-link-yes" class="layui-btn"> 确定 </button>', '<button style="margin-left: 20px;" type="button" class="layui-btn layui-btn-primary"> 取消 </button>', "</li>", "</ul>"].join(""),
      success: function success(t, n) {
        a.render("radio"), t.find(".layui-btn-primary").on("click", function () {
          i.close(n), l.focus();
        }), a.on("submit(layedit-link-yes)", function (t) {
          i.close(v.index), e && e(t.field);
        });
      }
    });
    v.index = n;
  },
      g = function g(t) {
    var a = function () {
      var t = {};
      return layui.each(["[微笑]", "[嘻嘻]", "[哈哈]", "[可爱]", "[可怜]", "[挖鼻]", "[吃惊]", "[害羞]", "[挤眼]", "[闭嘴]", "[鄙视]", "[爱你]", "[泪]", "[偷笑]", "[亲亲]", "[生病]", "[太开心]", "[白眼]", "[右哼哼]", "[左哼哼]", "[嘘]", "[衰]", "[委屈]", "[吐]", "[哈欠]", "[抱抱]", "[怒]", "[疑问]", "[馋嘴]", "[拜拜]", "[思考]", "[汗]", "[困]", "[睡]", "[钱]", "[失望]", "[酷]", "[色]", "[哼]", "[鼓掌]", "[晕]", "[悲伤]", "[抓狂]", "[黑线]", "[阴险]", "[怒骂]", "[互粉]", "[心]", "[伤心]", "[猪头]", "[熊猫]", "[兔子]", "[ok]", "[耶]", "[good]", "[NO]", "[赞]", "[来]", "[弱]", "[草泥马]", "[神马]", "[囧]", "[浮云]", "[给力]", "[围观]", "[威武]", "[奥特曼]", "[礼物]", "[钟]", "[话筒]", "[蜡烛]", "[蛋糕]"], function (e, i) {
        t[i] = layui.cache.dir + "images/face/" + e + ".gif";
      }), t;
    }();

    return g.hide = g.hide || function (t) {
      "face" !== e(t.target).attr("layedit-event") && i.close(g.index);
    }, g.index = i.tips(function () {
      var t = [];
      return layui.each(a, function (e, i) {
        t.push('<li title="' + e + '"><img src="' + i + '" alt="' + e + '"></li>');
      }), '<ul class="layui-clear">' + t.join("") + "</ul>";
    }(), this, {
      tips: 1,
      time: 0,
      skin: "layui-box layui-util-face",
      maxWidth: 500,
      success: function success(l, n) {
        l.css({
          marginTop: -4,
          marginLeft: -10
        }).find(".layui-clear>li").on("click", function () {
          t && t({
            src: a[this.title],
            alt: this.title
          }), i.close(n);
        }), e(document).off("click", g.hide).on("click", g.hide);
      }
    });
  },
      b = function b(t) {
    var e = this,
        l = i.open({
      type: 1,
      id: "LAY_layedit_code",
      area: "550px",
      shade: .05,
      shadeClose: !0,
      moveType: 1,
      title: "插入代码",
      skin: "layui-layer-msg",
      content: ['<ul class="layui-form layui-form-pane" style="margin: 15px;">', '<li class="layui-form-item">', '<label class="layui-form-label">请选择语言</label>', '<div class="layui-input-block">', '<select name="lang">', '<option value="JavaScript">JavaScript</option>', '<option value="HTML">HTML</option>', '<option value="CSS">CSS</option>', '<option value="Java">Java</option>', '<option value="PHP">PHP</option>', '<option value="C#">C#</option>', '<option value="Python">Python</option>', '<option value="Ruby">Ruby</option>', '<option value="Go">Go</option>', "</select>", "</div>", "</li>", '<li class="layui-form-item layui-form-text">', '<label class="layui-form-label">代码</label>', '<div class="layui-input-block">', '<textarea name="code" lay-verify="required" autofocus="true" class="layui-textarea" style="height: 200px;"></textarea>', "</div>", "</li>", '<li class="layui-form-item" style="text-align: center;">', '<button type="button" lay-submit lay-filter="layedit-code-yes" class="layui-btn"> 确定 </button>', '<button style="margin-left: 20px;" type="button" class="layui-btn layui-btn-primary"> 取消 </button>', "</li>", "</ul>"].join(""),
      success: function success(l, n) {
        a.render("select"), l.find(".layui-btn-primary").on("click", function () {
          i.close(n), e.focus();
        }), a.on("submit(layedit-code-yes)", function (e) {
          i.close(b.index), t && t(e.field);
        });
      }
    });
    b.index = l;
  },
      x = {
    html: '<i class="layui-icon layedit-tool-html" title="HTML源代码" lay-command="html" layedit-event="html"">&#xe64b;</i><span class="layedit-tool-mid"></span>',
    strong: '<i class="layui-icon layedit-tool-b" title="加粗" lay-command="Bold" layedit-event="b"">&#xe62b;</i>',
    italic: '<i class="layui-icon layedit-tool-i" title="斜体" lay-command="italic" layedit-event="i"">&#xe644;</i>',
    underline: '<i class="layui-icon layedit-tool-u" title="下划线" lay-command="underline" layedit-event="u"">&#xe646;</i>',
    del: '<i class="layui-icon layedit-tool-d" title="删除线" lay-command="strikeThrough" layedit-event="d"">&#xe64f;</i>',
    "|": '<span class="layedit-tool-mid"></span>',
    left: '<i class="layui-icon layedit-tool-left" title="左对齐" lay-command="justifyLeft" layedit-event="left"">&#xe649;</i>',
    center: '<i class="layui-icon layedit-tool-center" title="居中对齐" lay-command="justifyCenter" layedit-event="center"">&#xe647;</i>',
    right: '<i class="layui-icon layedit-tool-right" title="右对齐" lay-command="justifyRight" layedit-event="right"">&#xe648;</i>',
    link: '<i class="layui-icon layedit-tool-link" title="插入链接" layedit-event="link"">&#xe64c;</i>',
    unlink: '<i class="layui-icon layedit-tool-unlink layui-disabled" title="清除链接" lay-command="unlink" layedit-event="unlink"">&#xe64d;</i>',
    face: '<i class="layui-icon layedit-tool-face" title="表情" layedit-event="face"">&#xe650;</i>',
    image: '<i class="layui-icon layedit-tool-image" title="图片" layedit-event="image">&#xe64a;<input type="file" name="file"></i>',
    code: '<i class="layui-icon layedit-tool-code" title="插入代码" layedit-event="code">&#xe64e;</i>',
    help: '<i class="layui-icon layedit-tool-help" title="帮助" layedit-event="help">&#xe607;</i>'
  };

  t("layedit", new o());
});
layui.define("jquery", function (e) {
  "use strict";

  var a = layui.$;
  e("code", function (e) {
    var l = [];
    (e = e || {}).elem = a(e.elem || ".layui-code"), e.about = !("about" in e) || e.about, e.elem.each(function () {
      l.push(this);
    }), layui.each(l.reverse(), function (l, t) {
      var i = a(t),
          c = i.html();
      (i.attr("lay-encode") || e.encode) && (c = c.replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")), i.html('<ol class="layui-code-ol"><li>' + c.replace(/[\r\t\n]+/g, "</li><li>") + "</li></ol>"), i.find(">.layui-code-h3")[0] || i.prepend('<h3 class="layui-code-h3">' + (i.attr("lay-title") || e.title || "code") + (e.about ? '<a href="http://www.layui.com/doc/modules/code.html" target="_blank">layui.code</a>' : "") + "</h3>");
      var o = i.find(">.layui-code-ol");
      i.addClass("layui-box layui-code-view"), (i.attr("lay-skin") || e.skin) && i.addClass("layui-code-" + (i.attr("lay-skin") || e.skin)), (o.find("li").length / 100 | 0) > 0 && o.css("margin-left", (o.find("li").length / 100 | 0) + "px"), (i.attr("lay-height") || e.height) && o.css("max-height", i.attr("lay-height") || e.height);
    });
  });
}).addcss("modules/code.css", "skincodecss");