"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/** layui-v2.4.3 MIT License By https://www.layui.com */
;
layui.define(function (i) {
  i("layui.mobile", layui.v);
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
layui.define(function (e) {
  "use strict";

  window;

  var t = document,
      i = "getElementsByClassName",
      n = function n(e) {
    return t.querySelectorAll(e);
  },
      s = {
    type: 0,
    shade: !0,
    shadeClose: !0,
    fixed: !0,
    anim: "scale"
  },
      a = {
    extend: function extend(e) {
      var t = JSON.parse(JSON.stringify(s));

      for (var i in e) {
        t[i] = e[i];
      }

      return t;
    },
    timer: {},
    end: {}
  };

  a.touch = function (e, t) {
    e.addEventListener("click", function (e) {
      t.call(this, e);
    }, !1);
  };

  var l = 0,
      o = ["layui-m-layer"],
      r = function r(e) {
    this.config = a.extend(e), this.view();
  };

  r.prototype.view = function () {
    var e = this.config,
        s = t.createElement("div");
    this.id = s.id = o[0] + l, s.setAttribute("class", o[0] + " " + o[0] + (e.type || 0)), s.setAttribute("index", l);

    var a = function () {
      var t = "object" == _typeof(e.title);

      return e.title ? '<h3 style="' + (t ? e.title[1] : "") + '">' + (t ? e.title[0] : e.title) + "</h3>" : "";
    }(),
        r = function () {
      "string" == typeof e.btn && (e.btn = [e.btn]);
      var t,
          i = (e.btn || []).length;
      return 0 !== i && e.btn ? (t = '<span yes type="1">' + e.btn[0] + "</span>", 2 === i && (t = '<span no type="0">' + e.btn[1] + "</span>" + t), '<div class="layui-m-layerbtn">' + t + "</div>") : "";
    }();

    if (e.fixed || (e.top = e.hasOwnProperty("top") ? e.top : 100, e.style = e.style || "", e.style += " top:" + (t.body.scrollTop + e.top) + "px"), 2 === e.type && (e.content = '<i></i><i class="layui-m-layerload"></i><i></i><p>' + (e.content || "") + "</p>"), e.skin && (e.anim = "up"), "msg" === e.skin && (e.shade = !1), s.innerHTML = (e.shade ? "<div " + ("string" == typeof e.shade ? 'style="' + e.shade + '"' : "") + ' class="layui-m-layershade"></div>' : "") + '<div class="layui-m-layermain" ' + (e.fixed ? "" : 'style="position:static;"') + '><div class="layui-m-layersection"><div class="layui-m-layerchild ' + (e.skin ? "layui-m-layer-" + e.skin + " " : "") + (e.className ? e.className : "") + " " + (e.anim ? "layui-m-anim-" + e.anim : "") + '" ' + (e.style ? 'style="' + e.style + '"' : "") + ">" + a + '<div class="layui-m-layercont">' + e.content + "</div>" + r + "</div></div></div>", !e.type || 2 === e.type) {
      var c = t[i](o[0] + e.type);
      c.length >= 1 && d.close(c[0].getAttribute("index"));
    }

    document.body.appendChild(s);
    var y = this.elem = n("#" + this.id)[0];
    e.success && e.success(y), this.index = l++, this.action(e, y);
  }, r.prototype.action = function (e, t) {
    var n = this;
    e.time && (a.timer[n.index] = setTimeout(function () {
      d.close(n.index);
    }, 1e3 * e.time));

    var s = function s() {
      0 == this.getAttribute("type") ? (e.no && e.no(), d.close(n.index)) : e.yes ? e.yes(n.index) : d.close(n.index);
    };

    if (e.btn) for (var l = t[i]("layui-m-layerbtn")[0].children, o = l.length, r = 0; r < o; r++) {
      a.touch(l[r], s);
    }

    if (e.shade && e.shadeClose) {
      var c = t[i]("layui-m-layershade")[0];
      a.touch(c, function () {
        d.close(n.index, e.end);
      });
    }

    e.end && (a.end[n.index] = e.end);
  };
  var d = {
    v: "2.0 m",
    index: l,
    open: function open(e) {
      return new r(e || {}).index;
    },
    close: function close(e) {
      var i = n("#" + o[0] + e)[0];
      i && (i.innerHTML = "", t.body.removeChild(i), clearTimeout(a.timer[e]), delete a.timer[e], "function" == typeof a.end[e] && a.end[e](), delete a.end[e]);
    },
    closeAll: function closeAll() {
      for (var e = t[i](o[0]), n = 0, s = e.length; n < s; n++) {
        d.close(0 | e[0].getAttribute("index"));
      }
    }
  };
  e("layer-mobile", d);
});
layui.define(function (t) {
  var e = function () {
    var t,
        e,
        n,
        r,
        i,
        o,
        a = [],
        s = a.concat,
        u = a.filter,
        c = a.slice,
        l = window.document,
        f = {},
        h = {},
        p = {
      "column-count": 1,
      columns: 1,
      "font-weight": 1,
      "line-height": 1,
      opacity: 1,
      "z-index": 1,
      zoom: 1
    },
        d = /^\s*<(\w+|!)[^>]*>/,
        m = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        v = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        g = /^(?:body|html)$/i,
        y = /([A-Z])/g,
        x = ["val", "css", "html", "text", "data", "width", "height", "offset"],
        b = l.createElement("table"),
        w = l.createElement("tr"),
        E = {
      tr: l.createElement("tbody"),
      tbody: b,
      thead: b,
      tfoot: b,
      td: w,
      th: w,
      "*": l.createElement("div")
    },
        j = /complete|loaded|interactive/,
        T = /^[\w-]*$/,
        S = {},
        C = S.toString,
        N = {},
        O = l.createElement("div"),
        P = {
      tabindex: "tabIndex",
      readonly: "readOnly",
      "for": "htmlFor",
      "class": "className",
      maxlength: "maxLength",
      cellspacing: "cellSpacing",
      cellpadding: "cellPadding",
      rowspan: "rowSpan",
      colspan: "colSpan",
      usemap: "useMap",
      frameborder: "frameBorder",
      contenteditable: "contentEditable"
    },
        A = Array.isArray || function (t) {
      return t instanceof Array;
    };

    N.matches = function (t, e) {
      if (!e || !t || 1 !== t.nodeType) return !1;
      var n = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
      if (n) return n.call(t, e);
      var r,
          i = t.parentNode,
          o = !i;
      return o && (i = O).appendChild(t), r = ~N.qsa(i, e).indexOf(t), o && O.removeChild(t), r;
    };

    function D(t) {
      return null == t ? String(t) : S[C.call(t)] || "object";
    }

    function L(t) {
      return "function" == D(t);
    }

    function $(t) {
      return null != t && t == t.window;
    }

    function F(t) {
      return null != t && t.nodeType == t.DOCUMENT_NODE;
    }

    function k(t) {
      return "object" == D(t);
    }

    function M(t) {
      return k(t) && !$(t) && Object.getPrototypeOf(t) == Object.prototype;
    }

    function R(t) {
      var e = !!t && "length" in t && t.length,
          r = n.type(t);
      return "function" != r && !$(t) && ("array" == r || 0 === e || "number" == typeof e && e > 0 && e - 1 in t);
    }

    i = function i(t) {
      return t.replace(/-+(.)?/g, function (t, e) {
        return e ? e.toUpperCase() : "";
      });
    };

    function z(t) {
      return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase();
    }

    o = function o(t) {
      return u.call(t, function (e, n) {
        return t.indexOf(e) == n;
      });
    };

    function Z(t) {
      return t in h ? h[t] : h[t] = new RegExp("(^|\\s)" + t + "(\\s|$)");
    }

    function q(t, e) {
      return "number" != typeof e || p[z(t)] ? e : e + "px";
    }

    function H(t) {
      return "children" in t ? c.call(t.children) : n.map(t.childNodes, function (t) {
        if (1 == t.nodeType) return t;
      });
    }

    function I(t, e) {
      var n,
          r = t ? t.length : 0;

      for (n = 0; n < r; n++) {
        this[n] = t[n];
      }

      this.length = r, this.selector = e || "";
    }

    N.fragment = function (e, r, i) {
      var o, a, s;
      return m.test(e) && (o = n(l.createElement(RegExp.$1))), o || (e.replace && (e = e.replace(v, "<$1></$2>")), r === t && (r = d.test(e) && RegExp.$1), r in E || (r = "*"), (s = E[r]).innerHTML = "" + e, o = n.each(c.call(s.childNodes), function () {
        s.removeChild(this);
      })), M(i) && (a = n(o), n.each(i, function (t, e) {
        x.indexOf(t) > -1 ? a[t](e) : a.attr(t, e);
      })), o;
    }, N.Z = function (t, e) {
      return new I(t, e);
    }, N.isZ = function (t) {
      return t instanceof N.Z;
    }, N.init = function (e, r) {
      var i;
      if (!e) return N.Z();
      if ("string" == typeof e) {
        if ("<" == (e = e.trim())[0] && d.test(e)) i = N.fragment(e, RegExp.$1, r), e = null;else {
          if (r !== t) return n(r).find(e);
          i = N.qsa(l, e);
        }
      } else {
        if (L(e)) return n(l).ready(e);
        if (N.isZ(e)) return e;
        if (A(e)) o = e, i = u.call(o, function (t) {
          return null != t;
        });else if (k(e)) i = [e], e = null;else if (d.test(e)) i = N.fragment(e.trim(), RegExp.$1, r), e = null;else {
          if (r !== t) return n(r).find(e);
          i = N.qsa(l, e);
        }
      }
      var o;
      return N.Z(i, e);
    };
    (n = function n(t, e) {
      return N.init(t, e);
    }).extend = function (n) {
      var r,
          i = c.call(arguments, 1);
      return "boolean" == typeof n && (r = n, n = i.shift()), i.forEach(function (i) {
        !function n(r, i, o) {
          for (e in i) {
            o && (M(i[e]) || A(i[e])) ? (M(i[e]) && !M(r[e]) && (r[e] = {}), A(i[e]) && !A(r[e]) && (r[e] = []), n(r[e], i[e], o)) : i[e] !== t && (r[e] = i[e]);
          }
        }(n, i, r);
      }), n;
    }, N.qsa = function (t, e) {
      var n,
          r = "#" == e[0],
          i = !r && "." == e[0],
          o = r || i ? e.slice(1) : e,
          a = T.test(o);
      return t.getElementById && a && r ? (n = t.getElementById(o)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType ? [] : c.call(a && !r && t.getElementsByClassName ? i ? t.getElementsByClassName(o) : t.getElementsByTagName(e) : t.querySelectorAll(e));
    };

    function V(t, e) {
      return null == e ? n(t) : n(t).filter(e);
    }

    n.contains = l.documentElement.contains ? function (t, e) {
      return t !== e && t.contains(e);
    } : function (t, e) {
      for (; e && (e = e.parentNode);) {
        if (e === t) return !0;
      }

      return !1;
    };

    function _(t, e, n, r) {
      return L(e) ? e.call(t, n, r) : e;
    }

    function B(t, e, n) {
      null == n ? t.removeAttribute(e) : t.setAttribute(e, n);
    }

    function U(e, n) {
      var r = e.className || "",
          i = r && r.baseVal !== t;
      if (n === t) return i ? r.baseVal : r;
      i ? r.baseVal = n : e.className = n;
    }

    function X(t) {
      try {
        return t ? "true" == t || "false" != t && ("null" == t ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? n.parseJSON(t) : t) : t;
      } catch (e) {
        return t;
      }
    }

    n.type = D, n.isFunction = L, n.isWindow = $, n.isArray = A, n.isPlainObject = M, n.isEmptyObject = function (t) {
      var e;

      for (e in t) {
        return !1;
      }

      return !0;
    }, n.isNumeric = function (t) {
      var e = Number(t),
          n = _typeof(t);

      return null != t && "boolean" != n && ("string" != n || t.length) && !isNaN(e) && isFinite(e) || !1;
    }, n.inArray = function (t, e, n) {
      return a.indexOf.call(e, t, n);
    }, n.camelCase = i, n.trim = function (t) {
      return null == t ? "" : String.prototype.trim.call(t);
    }, n.uuid = 0, n.support = {}, n.expr = {}, n.noop = function () {}, n.map = function (t, e) {
      var r,
          i,
          o,
          a = [];
      if (R(t)) for (i = 0; i < t.length; i++) {
        null != (r = e(t[i], i)) && a.push(r);
      } else for (o in t) {
        null != (r = e(t[o], o)) && a.push(r);
      }
      return (s = a).length > 0 ? n.fn.concat.apply([], s) : s;
      var s;
    }, n.each = function (t, e) {
      var n, r;

      if (R(t)) {
        for (n = 0; n < t.length; n++) {
          if (!1 === e.call(t[n], n, t[n])) return t;
        }
      } else for (r in t) {
        if (!1 === e.call(t[r], r, t[r])) return t;
      }

      return t;
    }, n.grep = function (t, e) {
      return u.call(t, e);
    }, window.JSON && (n.parseJSON = JSON.parse), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (t, e) {
      S["[object " + e + "]"] = e.toLowerCase();
    }), n.fn = {
      constructor: N.Z,
      length: 0,
      forEach: a.forEach,
      reduce: a.reduce,
      push: a.push,
      sort: a.sort,
      splice: a.splice,
      indexOf: a.indexOf,
      concat: function concat() {
        var t,
            e,
            n = [];

        for (t = 0; t < arguments.length; t++) {
          e = arguments[t], n[t] = N.isZ(e) ? e.toArray() : e;
        }

        return s.apply(N.isZ(this) ? this.toArray() : this, n);
      },
      map: function map(t) {
        return n(n.map(this, function (e, n) {
          return t.call(e, n, e);
        }));
      },
      slice: function slice() {
        return n(c.apply(this, arguments));
      },
      ready: function ready(t) {
        return j.test(l.readyState) && l.body ? t(n) : l.addEventListener("DOMContentLoaded", function () {
          t(n);
        }, !1), this;
      },
      get: function get(e) {
        return e === t ? c.call(this) : this[e >= 0 ? e : e + this.length];
      },
      toArray: function toArray() {
        return this.get();
      },
      size: function size() {
        return this.length;
      },
      remove: function remove() {
        return this.each(function () {
          null != this.parentNode && this.parentNode.removeChild(this);
        });
      },
      each: function each(t) {
        return a.every.call(this, function (e, n) {
          return !1 !== t.call(e, n, e);
        }), this;
      },
      filter: function filter(t) {
        return L(t) ? this.not(this.not(t)) : n(u.call(this, function (e) {
          return N.matches(e, t);
        }));
      },
      add: function add(t, e) {
        return n(o(this.concat(n(t, e))));
      },
      is: function is(t) {
        return this.length > 0 && N.matches(this[0], t);
      },
      not: function not(e) {
        var r = [];
        if (L(e) && e.call !== t) this.each(function (t) {
          e.call(this, t) || r.push(this);
        });else {
          var i = "string" == typeof e ? this.filter(e) : R(e) && L(e.item) ? c.call(e) : n(e);
          this.forEach(function (t) {
            i.indexOf(t) < 0 && r.push(t);
          });
        }
        return n(r);
      },
      has: function has(t) {
        return this.filter(function () {
          return k(t) ? n.contains(this, t) : n(this).find(t).size();
        });
      },
      eq: function eq(t) {
        return -1 === t ? this.slice(t) : this.slice(t, +t + 1);
      },
      first: function first() {
        var t = this[0];
        return t && !k(t) ? t : n(t);
      },
      last: function last() {
        var t = this[this.length - 1];
        return t && !k(t) ? t : n(t);
      },
      find: function find(t) {
        var e = this;
        return t ? "object" == _typeof(t) ? n(t).filter(function () {
          var t = this;
          return a.some.call(e, function (e) {
            return n.contains(e, t);
          });
        }) : 1 == this.length ? n(N.qsa(this[0], t)) : this.map(function () {
          return N.qsa(this, t);
        }) : n();
      },
      closest: function closest(t, e) {
        var r = [],
            i = "object" == _typeof(t) && n(t);
        return this.each(function (n, o) {
          for (; o && !(i ? i.indexOf(o) >= 0 : N.matches(o, t));) {
            o = o !== e && !F(o) && o.parentNode;
          }

          o && r.indexOf(o) < 0 && r.push(o);
        }), n(r);
      },
      parents: function parents(t) {
        for (var e = [], r = this; r.length > 0;) {
          r = n.map(r, function (t) {
            if ((t = t.parentNode) && !F(t) && e.indexOf(t) < 0) return e.push(t), t;
          });
        }

        return V(e, t);
      },
      parent: function parent(t) {
        return V(o(this.pluck("parentNode")), t);
      },
      children: function children(t) {
        return V(this.map(function () {
          return H(this);
        }), t);
      },
      contents: function contents() {
        return this.map(function () {
          return this.contentDocument || c.call(this.childNodes);
        });
      },
      siblings: function siblings(t) {
        return V(this.map(function (t, e) {
          return u.call(H(e.parentNode), function (t) {
            return t !== e;
          });
        }), t);
      },
      empty: function empty() {
        return this.each(function () {
          this.innerHTML = "";
        });
      },
      pluck: function pluck(t) {
        return n.map(this, function (e) {
          return e[t];
        });
      },
      show: function show() {
        return this.each(function () {
          "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = function (t) {
            var e, n;
            return f[t] || (e = l.createElement(t), l.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), f[t] = n), f[t];
          }(this.nodeName));
        });
      },
      replaceWith: function replaceWith(t) {
        return this.before(t).remove();
      },
      wrap: function wrap(t) {
        var e = L(t);
        if (this[0] && !e) var r = n(t).get(0),
            i = r.parentNode || this.length > 1;
        return this.each(function (o) {
          n(this).wrapAll(e ? t.call(this, o) : i ? r.cloneNode(!0) : r);
        });
      },
      wrapAll: function wrapAll(t) {
        if (this[0]) {
          n(this[0]).before(t = n(t));

          for (var e; (e = t.children()).length;) {
            t = e.first();
          }

          n(t).append(this);
        }

        return this;
      },
      wrapInner: function wrapInner(t) {
        var e = L(t);
        return this.each(function (r) {
          var i = n(this),
              o = i.contents(),
              a = e ? t.call(this, r) : t;
          o.length ? o.wrapAll(a) : i.append(a);
        });
      },
      unwrap: function unwrap() {
        return this.parent().each(function () {
          n(this).replaceWith(n(this).children());
        }), this;
      },
      clone: function clone() {
        return this.map(function () {
          return this.cloneNode(!0);
        });
      },
      hide: function hide() {
        return this.css("display", "none");
      },
      toggle: function toggle(e) {
        return this.each(function () {
          var r = n(this);
          (e === t ? "none" == r.css("display") : e) ? r.show() : r.hide();
        });
      },
      prev: function prev(t) {
        return n(this.pluck("previousElementSibling")).filter(t || "*");
      },
      next: function next(t) {
        return n(this.pluck("nextElementSibling")).filter(t || "*");
      },
      html: function html(t) {
        return 0 in arguments ? this.each(function (e) {
          var r = this.innerHTML;
          n(this).empty().append(_(this, t, e, r));
        }) : 0 in this ? this[0].innerHTML : null;
      },
      text: function text(t) {
        return 0 in arguments ? this.each(function (e) {
          var n = _(this, t, e, this.textContent);

          this.textContent = null == n ? "" : "" + n;
        }) : 0 in this ? this.pluck("textContent").join("") : null;
      },
      attr: function attr(n, r) {
        var i;
        return "string" != typeof n || 1 in arguments ? this.each(function (t) {
          if (1 === this.nodeType) if (k(n)) for (e in n) {
            B(this, e, n[e]);
          } else B(this, n, _(this, r, t, this.getAttribute(n)));
        }) : 0 in this && 1 == this[0].nodeType && null != (i = this[0].getAttribute(n)) ? i : t;
      },
      removeAttr: function removeAttr(t) {
        return this.each(function () {
          1 === this.nodeType && t.split(" ").forEach(function (t) {
            B(this, t);
          }, this);
        });
      },
      prop: function prop(t, e) {
        return t = P[t] || t, 1 in arguments ? this.each(function (n) {
          this[t] = _(this, e, n, this[t]);
        }) : this[0] && this[0][t];
      },
      removeProp: function removeProp(t) {
        return t = P[t] || t, this.each(function () {
          delete this[t];
        });
      },
      data: function data(e, n) {
        var r = "data-" + e.replace(y, "-$1").toLowerCase(),
            i = 1 in arguments ? this.attr(r, n) : this.attr(r);
        return null !== i ? X(i) : t;
      },
      val: function val(t) {
        return 0 in arguments ? (null == t && (t = ""), this.each(function (e) {
          this.value = _(this, t, e, this.value);
        })) : this[0] && (this[0].multiple ? n(this[0]).find("option").filter(function () {
          return this.selected;
        }).pluck("value") : this[0].value);
      },
      offset: function offset(t) {
        if (t) return this.each(function (e) {
          var r = n(this),
              i = _(this, t, e, r.offset()),
              o = r.offsetParent().offset(),
              a = {
            top: i.top - o.top,
            left: i.left - o.left
          };

          "static" == r.css("position") && (a.position = "relative"), r.css(a);
        });
        if (!this.length) return null;
        if (l.documentElement !== this[0] && !n.contains(l.documentElement, this[0])) return {
          top: 0,
          left: 0
        };
        var e = this[0].getBoundingClientRect();
        return {
          left: e.left + window.pageXOffset,
          top: e.top + window.pageYOffset,
          width: Math.round(e.width),
          height: Math.round(e.height)
        };
      },
      css: function css(t, r) {
        if (arguments.length < 2) {
          var o = this[0];

          if ("string" == typeof t) {
            if (!o) return;
            return o.style[i(t)] || getComputedStyle(o, "").getPropertyValue(t);
          }

          if (A(t)) {
            if (!o) return;
            var a = {},
                s = getComputedStyle(o, "");
            return n.each(t, function (t, e) {
              a[e] = o.style[i(e)] || s.getPropertyValue(e);
            }), a;
          }
        }

        var u = "";
        if ("string" == D(t)) r || 0 === r ? u = z(t) + ":" + q(t, r) : this.each(function () {
          this.style.removeProperty(z(t));
        });else for (e in t) {
          t[e] || 0 === t[e] ? u += z(e) + ":" + q(e, t[e]) + ";" : this.each(function () {
            this.style.removeProperty(z(e));
          });
        }
        return this.each(function () {
          this.style.cssText += ";" + u;
        });
      },
      index: function index(t) {
        return t ? this.indexOf(n(t)[0]) : this.parent().children().indexOf(this[0]);
      },
      hasClass: function hasClass(t) {
        return !!t && a.some.call(this, function (t) {
          return this.test(U(t));
        }, Z(t));
      },
      addClass: function addClass(t) {
        return t ? this.each(function (e) {
          if ("className" in this) {
            r = [];
            var i = U(this);
            _(this, t, e, i).split(/\s+/g).forEach(function (t) {
              n(this).hasClass(t) || r.push(t);
            }, this), r.length && U(this, i + (i ? " " : "") + r.join(" "));
          }
        }) : this;
      },
      removeClass: function removeClass(e) {
        return this.each(function (n) {
          if ("className" in this) {
            if (e === t) return U(this, "");
            r = U(this), _(this, e, n, r).split(/\s+/g).forEach(function (t) {
              r = r.replace(Z(t), " ");
            }), U(this, r.trim());
          }
        });
      },
      toggleClass: function toggleClass(e, r) {
        return e ? this.each(function (i) {
          var o = n(this);

          _(this, e, i, U(this)).split(/\s+/g).forEach(function (e) {
            (r === t ? !o.hasClass(e) : r) ? o.addClass(e) : o.removeClass(e);
          });
        }) : this;
      },
      scrollTop: function scrollTop(e) {
        if (this.length) {
          var n = ("scrollTop" in this[0]);
          return e === t ? n ? this[0].scrollTop : this[0].pageYOffset : this.each(n ? function () {
            this.scrollTop = e;
          } : function () {
            this.scrollTo(this.scrollX, e);
          });
        }
      },
      scrollLeft: function scrollLeft(e) {
        if (this.length) {
          var n = ("scrollLeft" in this[0]);
          return e === t ? n ? this[0].scrollLeft : this[0].pageXOffset : this.each(n ? function () {
            this.scrollLeft = e;
          } : function () {
            this.scrollTo(e, this.scrollY);
          });
        }
      },
      position: function position() {
        if (this.length) {
          var t = this[0],
              e = this.offsetParent(),
              r = this.offset(),
              i = g.test(e[0].nodeName) ? {
            top: 0,
            left: 0
          } : e.offset();
          return r.top -= parseFloat(n(t).css("margin-top")) || 0, r.left -= parseFloat(n(t).css("margin-left")) || 0, i.top += parseFloat(n(e[0]).css("border-top-width")) || 0, i.left += parseFloat(n(e[0]).css("border-left-width")) || 0, {
            top: r.top - i.top,
            left: r.left - i.left
          };
        }
      },
      offsetParent: function offsetParent() {
        return this.map(function () {
          for (var t = this.offsetParent || l.body; t && !g.test(t.nodeName) && "static" == n(t).css("position");) {
            t = t.offsetParent;
          }

          return t;
        });
      }
    }, n.fn.detach = n.fn.remove, ["width", "height"].forEach(function (e) {
      var r = e.replace(/./, function (t) {
        return t[0].toUpperCase();
      });

      n.fn[e] = function (i) {
        var o,
            a = this[0];
        return i === t ? $(a) ? a["inner" + r] : F(a) ? a.documentElement["scroll" + r] : (o = this.offset()) && o[e] : this.each(function (t) {
          (a = n(this)).css(e, _(this, i, t, a[e]()));
        });
      };
    });
    return ["after", "prepend", "before", "append"].forEach(function (e, r) {
      var i = r % 2;
      n.fn[e] = function () {
        var e,
            o,
            a = n.map(arguments, function (r) {
          var i = [];
          return "array" == (e = D(r)) ? (r.forEach(function (e) {
            return e.nodeType !== t ? i.push(e) : n.zepto.isZ(e) ? i = i.concat(e.get()) : void (i = i.concat(N.fragment(e)));
          }), i) : "object" == e || null == r ? r : N.fragment(r);
        }),
            s = this.length > 1;
        return a.length < 1 ? this : this.each(function (t, e) {
          o = i ? e : e.parentNode, e = 0 == r ? e.nextSibling : 1 == r ? e.firstChild : 2 == r ? e : null;
          var u = n.contains(l.documentElement, o);
          a.forEach(function (t) {
            if (s) t = t.cloneNode(!0);else if (!o) return n(t).remove();
            o.insertBefore(t, e), u && function t(e, n) {
              n(e);

              for (var r = 0, i = e.childNodes.length; r < i; r++) {
                t(e.childNodes[r], n);
              }
            }(t, function (t) {
              if (!(null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src)) {
                var e = t.ownerDocument ? t.ownerDocument.defaultView : window;
                e.eval.call(e, t.innerHTML);
              }
            });
          });
        });
      }, n.fn[i ? e + "To" : "insert" + (r ? "Before" : "After")] = function (t) {
        return n(t)[e](this), this;
      };
    }), N.Z.prototype = I.prototype = n.fn, N.uniq = o, N.deserializeValue = X, n.zepto = N, n;
  }();

  !function (t) {
    var e,
        n = 1,
        r = Array.prototype.slice,
        i = t.isFunction,
        o = function o(t) {
      return "string" == typeof t;
    },
        a = {},
        s = {},
        u = ("onfocusin" in window),
        c = {
      focus: "focusin",
      blur: "focusout"
    },
        l = {
      mouseenter: "mouseover",
      mouseleave: "mouseout"
    };

    s.click = s.mousedown = s.mouseup = s.mousemove = "MouseEvents";

    function f(t) {
      return t._zid || (t._zid = n++);
    }

    function h(t, e, n, r) {
      if ((e = p(e)).ns) var i = (o = e.ns, new RegExp("(?:^| )" + o.replace(" ", " .* ?") + "(?: |$)"));
      var o;
      return (a[f(t)] || []).filter(function (t) {
        return t && (!e.e || t.e == e.e) && (!e.ns || i.test(t.ns)) && (!n || f(t.fn) === f(n)) && (!r || t.sel == r);
      });
    }

    function p(t) {
      var e = ("" + t).split(".");
      return {
        e: e[0],
        ns: e.slice(1).sort().join(" ")
      };
    }

    function d(t, e) {
      return t.del && !u && t.e in c || !!e;
    }

    function m(t) {
      return l[t] || u && c[t] || t;
    }

    function v(n, r, i, o, s, u, c) {
      var h = f(n),
          v = a[h] || (a[h] = []);
      r.split(/\s/).forEach(function (r) {
        if ("ready" == r) return t(document).ready(i);
        var a = p(r);
        a.fn = i, a.sel = s, a.e in l && (i = function i(e) {
          var n = e.relatedTarget;
          if (!n || n !== this && !t.contains(this, n)) return a.fn.apply(this, arguments);
        }), a.del = u;
        var f = u || i;
        a.proxy = function (t) {
          if (!(t = E(t)).isImmediatePropagationStopped()) {
            t.data = o;
            var r = f.apply(n, t._args == e ? [t] : [t].concat(t._args));
            return !1 === r && (t.preventDefault(), t.stopPropagation()), r;
          }
        }, a.i = v.length, v.push(a), "addEventListener" in n && n.addEventListener(m(a.e), a.proxy, d(a, c));
      });
    }

    function g(t, e, n, r, i) {
      var o = f(t);
      (e || "").split(/\s/).forEach(function (e) {
        h(t, e, n, r).forEach(function (e) {
          delete a[o][e.i], "removeEventListener" in t && t.removeEventListener(m(e.e), e.proxy, d(e, i));
        });
      });
    }

    t.event = {
      add: v,
      remove: g
    }, t.proxy = function (e, n) {
      var a = 2 in arguments && r.call(arguments, 2);

      if (i(e)) {
        var s = function s() {
          return e.apply(n, a ? a.concat(r.call(arguments)) : arguments);
        };

        return s._zid = f(e), s;
      }

      if (o(n)) return a ? (a.unshift(e[n], e), t.proxy.apply(null, a)) : t.proxy(e[n], e);
      throw new TypeError("expected function");
    }, t.fn.bind = function (t, e, n) {
      return this.on(t, e, n);
    }, t.fn.unbind = function (t, e) {
      return this.off(t, e);
    }, t.fn.one = function (t, e, n, r) {
      return this.on(t, e, n, r, 1);
    };

    var y = function y() {
      return !0;
    },
        x = function x() {
      return !1;
    },
        b = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
        w = {
      preventDefault: "isDefaultPrevented",
      stopImmediatePropagation: "isImmediatePropagationStopped",
      stopPropagation: "isPropagationStopped"
    };

    function E(n, r) {
      return !r && n.isDefaultPrevented || (r || (r = n), t.each(w, function (t, e) {
        var i = r[t];
        n[t] = function () {
          return this[e] = y, i && i.apply(r, arguments);
        }, n[e] = x;
      }), n.timeStamp || (n.timeStamp = Date.now()), (r.defaultPrevented !== e ? r.defaultPrevented : "returnValue" in r ? !1 === r.returnValue : r.getPreventDefault && r.getPreventDefault()) && (n.isDefaultPrevented = y)), n;
    }

    function j(t) {
      var n,
          r = {
        originalEvent: t
      };

      for (n in t) {
        b.test(n) || t[n] === e || (r[n] = t[n]);
      }

      return E(r, t);
    }

    t.fn.delegate = function (t, e, n) {
      return this.on(e, t, n);
    }, t.fn.undelegate = function (t, e, n) {
      return this.off(e, t, n);
    }, t.fn.live = function (e, n) {
      return t(document.body).delegate(this.selector, e, n), this;
    }, t.fn.die = function (e, n) {
      return t(document.body).undelegate(this.selector, e, n), this;
    }, t.fn.on = function (n, a, s, u, c) {
      var l,
          f,
          h = this;
      return n && !o(n) ? (t.each(n, function (t, e) {
        h.on(t, a, s, e, c);
      }), h) : (o(a) || i(u) || !1 === u || (u = s, s = a, a = e), u !== e && !1 !== s || (u = s, s = e), !1 === u && (u = x), h.each(function (e, i) {
        c && (l = function l(t) {
          return g(i, t.type, u), u.apply(this, arguments);
        }), a && (f = function f(e) {
          var n,
              o = t(e.target).closest(a, i).get(0);
          if (o && o !== i) return n = t.extend(j(e), {
            currentTarget: o,
            liveFired: i
          }), (l || u).apply(o, [n].concat(r.call(arguments, 1)));
        }), v(i, n, u, s, a, f || l);
      }));
    }, t.fn.off = function (n, r, a) {
      var s = this;
      return n && !o(n) ? (t.each(n, function (t, e) {
        s.off(t, r, e);
      }), s) : (o(r) || i(a) || !1 === a || (a = r, r = e), !1 === a && (a = x), s.each(function () {
        g(this, n, a, r);
      }));
    }, t.fn.trigger = function (e, n) {
      return (e = o(e) || t.isPlainObject(e) ? t.Event(e) : E(e))._args = n, this.each(function () {
        e.type in c && "function" == typeof this[e.type] ? this[e.type]() : "dispatchEvent" in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n);
      });
    }, t.fn.triggerHandler = function (e, n) {
      var r, i;
      return this.each(function (a, s) {
        (r = j(o(e) ? t.Event(e) : e))._args = n, r.target = s, t.each(h(s, e.type || e), function (t, e) {
          if (i = e.proxy(r), r.isImmediatePropagationStopped()) return !1;
        });
      }), i;
    }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function (e) {
      t.fn[e] = function (t) {
        return 0 in arguments ? this.bind(e, t) : this.trigger(e);
      };
    }), t.Event = function (t, e) {
      o(t) || (e = t, t = e.type);
      var n = document.createEvent(s[t] || "Events"),
          r = !0;
      if (e) for (var i in e) {
        "bubbles" == i ? r = !!e[i] : n[i] = e[i];
      }
      return n.initEvent(t, r, !0), E(n);
    };
  }(e), function (t) {
    var e,
        n,
        r = +new Date(),
        i = window.document,
        o = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        a = /^(?:text|application)\/javascript/i,
        s = /^(?:text|application)\/xml/i,
        u = "application/json",
        c = "text/html",
        l = /^\s*$/,
        f = i.createElement("a");
    f.href = window.location.href;

    function h(e, n, r, o) {
      if (e.global) return function (e, n, r) {
        var i = t.Event(n);
        return t(e).trigger(i, r), !i.isDefaultPrevented();
      }(n || i, r, o);
    }

    t.active = 0;

    function p(t, e) {
      var n = e.context;
      if (!1 === e.beforeSend.call(n, t, e) || !1 === h(e, n, "ajaxBeforeSend", [t, e])) return !1;
      h(e, n, "ajaxSend", [t, e]);
    }

    function d(t, e, n, r) {
      var i = n.context;
      n.success.call(i, t, "success", e), r && r.resolveWith(i, [t, "success", e]), h(n, i, "ajaxSuccess", [e, n, t]), v("success", e, n);
    }

    function m(t, e, n, r, i) {
      var o = r.context;
      r.error.call(o, n, e, t), i && i.rejectWith(o, [n, e, t]), h(r, o, "ajaxError", [n, r, t || e]), v(e, n, r);
    }

    function v(e, n, r) {
      var i = r.context;
      r.complete.call(i, n, e), h(r, i, "ajaxComplete", [n, r]), (o = r).global && ! --t.active && h(o, null, "ajaxStop");
      var o;
    }

    function g() {}

    t.ajaxJSONP = function (e, n) {
      if (!("type" in e)) return t.ajax(e);

      var o,
          a,
          s = e.jsonpCallback,
          u = (t.isFunction(s) ? s() : s) || "Zepto" + r++,
          c = i.createElement("script"),
          l = window[u],
          f = function f(e) {
        t(c).triggerHandler("error", e || "abort");
      },
          h = {
        abort: f
      };

      return n && n.promise(h), t(c).on("load error", function (r, i) {
        clearTimeout(a), t(c).off().remove(), "error" != r.type && o ? d(o[0], h, e, n) : m(null, i || "error", h, e, n), window[u] = l, o && t.isFunction(l) && l(o[0]), l = o = void 0;
      }), !1 === p(h, e) ? (f("abort"), h) : (window[u] = function () {
        o = arguments;
      }, c.src = e.url.replace(/\?(.+)=\?/, "?$1=" + u), i.head.appendChild(c), e.timeout > 0 && (a = setTimeout(function () {
        f("timeout");
      }, e.timeout)), h);
    }, t.ajaxSettings = {
      type: "GET",
      beforeSend: g,
      success: g,
      error: g,
      complete: g,
      context: null,
      global: !0,
      xhr: function xhr() {
        return new window.XMLHttpRequest();
      },
      accepts: {
        script: "text/javascript, application/javascript, application/x-javascript",
        json: u,
        xml: "application/xml, text/xml",
        html: c,
        text: "text/plain"
      },
      crossDomain: !1,
      timeout: 0,
      processData: !0,
      cache: !0,
      dataFilter: g
    };

    function y(t, e) {
      return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?");
    }

    t.ajax = function (r) {
      var o,
          v,
          x = t.extend({}, r || {}),
          b = t.Deferred && t.Deferred();

      for (e in t.ajaxSettings) {
        void 0 === x[e] && (x[e] = t.ajaxSettings[e]);
      }

      (w = x).global && 0 == t.active++ && h(w, null, "ajaxStart");
      var w;
      x.crossDomain || ((o = i.createElement("a")).href = x.url, o.href = o.href, x.crossDomain = f.protocol + "//" + f.host != o.protocol + "//" + o.host), x.url || (x.url = window.location.toString()), (v = x.url.indexOf("#")) > -1 && (x.url = x.url.slice(0, v)), (E = x).processData && E.data && "string" != t.type(E.data) && (E.data = t.param(E.data, E.traditional)), !E.data || E.type && "GET" != E.type.toUpperCase() && "jsonp" != E.dataType || (E.url = y(E.url, E.data), E.data = void 0);
      var E,
          j = x.dataType,
          T = /\?.+=\?/.test(x.url);
      if (T && (j = "jsonp"), !1 !== x.cache && (r && !0 === r.cache || "script" != j && "jsonp" != j) || (x.url = y(x.url, "_=" + Date.now())), "jsonp" == j) return T || (x.url = y(x.url, x.jsonp ? x.jsonp + "=?" : !1 === x.jsonp ? "" : "callback=?")), t.ajaxJSONP(x, b);

      var S,
          C = x.accepts[j],
          N = {},
          O = function O(t, e) {
        N[t.toLowerCase()] = [t, e];
      },
          P = /^([\w-]+:)\/\//.test(x.url) ? RegExp.$1 : window.location.protocol,
          A = x.xhr(),
          D = A.setRequestHeader;

      if (b && b.promise(A), x.crossDomain || O("X-Requested-With", "XMLHttpRequest"), O("Accept", C || "*/*"), (C = x.mimeType || C) && (C.indexOf(",") > -1 && (C = C.split(",", 2)[0]), A.overrideMimeType && A.overrideMimeType(C)), (x.contentType || !1 !== x.contentType && x.data && "GET" != x.type.toUpperCase()) && O("Content-Type", x.contentType || "application/x-www-form-urlencoded"), x.headers) for (n in x.headers) {
        O(n, x.headers[n]);
      }
      if (A.setRequestHeader = O, A.onreadystatechange = function () {
        if (4 == A.readyState) {
          A.onreadystatechange = g, clearTimeout(S);
          var e,
              n = !1;

          if (A.status >= 200 && A.status < 300 || 304 == A.status || 0 == A.status && "file:" == P) {
            if (j = j || (r = x.mimeType || A.getResponseHeader("content-type"), r && (r = r.split(";", 2)[0]), r && (r == c ? "html" : r == u ? "json" : a.test(r) ? "script" : s.test(r) && "xml") || "text"), "arraybuffer" == A.responseType || "blob" == A.responseType) e = A.response;else {
              e = A.responseText;

              try {
                e = function (t, e, n) {
                  if (n.dataFilter == g) return t;
                  var r = n.context;
                  return n.dataFilter.call(r, t, e);
                }(e, j, x), "script" == j ? (0, eval)(e) : "xml" == j ? e = A.responseXML : "json" == j && (e = l.test(e) ? null : t.parseJSON(e));
              } catch (t) {
                n = t;
              }

              if (n) return m(n, "parsererror", A, x, b);
            }
            d(e, A, x, b);
          } else m(A.statusText || null, A.status ? "error" : "abort", A, x, b);
        }

        var r;
      }, !1 === p(A, x)) return A.abort(), m(null, "abort", A, x, b), A;
      var L = !("async" in x) || x.async;
      if (A.open(x.type, x.url, L, x.username, x.password), x.xhrFields) for (n in x.xhrFields) {
        A[n] = x.xhrFields[n];
      }

      for (n in N) {
        D.apply(A, N[n]);
      }

      return x.timeout > 0 && (S = setTimeout(function () {
        A.onreadystatechange = g, A.abort(), m(null, "timeout", A, x, b);
      }, x.timeout)), A.send(x.data ? x.data : null), A;
    };

    function x(e, n, r, i) {
      return t.isFunction(n) && (i = r, r = n, n = void 0), t.isFunction(r) || (i = r, r = void 0), {
        url: e,
        data: n,
        success: r,
        dataType: i
      };
    }

    t.get = function () {
      return t.ajax(x.apply(null, arguments));
    }, t.post = function () {
      var e = x.apply(null, arguments);
      return e.type = "POST", t.ajax(e);
    }, t.getJSON = function () {
      var e = x.apply(null, arguments);
      return e.dataType = "json", t.ajax(e);
    }, t.fn.load = function (e, n, r) {
      if (!this.length) return this;
      var i,
          a = this,
          s = e.split(/\s/),
          u = x(e, n, r),
          c = u.success;
      return s.length > 1 && (u.url = s[0], i = s[1]), u.success = function (e) {
        a.html(i ? t("<div>").html(e.replace(o, "")).find(i) : e), c && c.apply(a, arguments);
      }, t.ajax(u), this;
    };
    var b = encodeURIComponent;

    t.param = function (e, n) {
      var r = [];
      return r.add = function (e, n) {
        t.isFunction(n) && (n = n()), null == n && (n = ""), this.push(b(e) + "=" + b(n));
      }, function e(n, r, i, o) {
        var a,
            s = t.isArray(r),
            u = t.isPlainObject(r);
        t.each(r, function (r, c) {
          a = t.type(c), o && (r = i ? o : o + "[" + (u || "object" == a || "array" == a ? r : "") + "]"), !o && s ? n.add(c.name, c.value) : "array" == a || !i && "object" == a ? e(n, c, i, r) : n.add(r, c);
        });
      }(r, e, n), r.join("&").replace(/%20/g, "+");
    };
  }(e), (n = e).fn.serializeArray = function () {
    var t,
        e,
        r = [],
        i = function i(e) {
      if (e.forEach) return e.forEach(i);
      r.push({
        name: t,
        value: e
      });
    };

    return this[0] && n.each(this[0].elements, function (r, o) {
      e = o.type, (t = o.name) && "fieldset" != o.nodeName.toLowerCase() && !o.disabled && "submit" != e && "reset" != e && "button" != e && "file" != e && ("radio" != e && "checkbox" != e || o.checked) && i(n(o).val());
    }), r;
  }, n.fn.serialize = function () {
    var t = [];
    return this.serializeArray().forEach(function (e) {
      t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value));
    }), t.join("&");
  }, n.fn.submit = function (t) {
    if (0 in arguments) this.bind("submit", t);else if (this.length) {
      var e = n.Event("submit");
      this.eq(0).trigger(e), e.isDefaultPrevented() || this.get(0).submit();
    }
    return this;
  };
  var n;
  !function () {
    try {
      getComputedStyle(void 0);
    } catch (e) {
      var t = getComputedStyle;

      window.getComputedStyle = function (e, n) {
        try {
          return t(e, n);
        } catch (t) {
          return null;
        }
      };
    }
  }(), t("zepto", e);
});
layui.define(["layer-mobile", "zepto"], function (e) {
  "use strict";

  var t = layui.zepto,
      a = layui["layer-mobile"],
      i = (layui.device(), "layui-upload-enter"),
      n = "layui-upload-iframe",
      r = {
    icon: 2,
    shift: 6
  },
      o = {
    file: "文件",
    video: "视频",
    audio: "音频"
  };

  a.msg = function (e) {
    return a.open({
      content: e || "",
      skin: "msg",
      time: 2
    });
  };

  var s = function s(e) {
    this.options = e;
  };

  s.prototype.init = function () {
    var e = this,
        a = e.options,
        r = t("body"),
        s = t(a.elem || ".layui-upload-file"),
        u = t('<iframe id="' + n + '" class="' + n + '" name="' + n + '"></iframe>');
    return t("#" + n)[0] || r.append(u), s.each(function (r, s) {
      s = t(s);
      var u = '<form target="' + n + '" method="' + (a.method || "post") + '" key="set-mine" enctype="multipart/form-data" action="' + (a.url || "") + '"></form>',
          l = s.attr("lay-type") || a.type;
      a.unwrap || (u = '<div class="layui-box layui-upload-button">' + u + '<span class="layui-upload-icon"><i class="layui-icon">&#xe608;</i>' + (s.attr("lay-title") || a.title || "上传" + (o[l] || "图片")) + "</span></div>"), u = t(u), a.unwrap || u.on("dragover", function (e) {
        e.preventDefault(), t(this).addClass(i);
      }).on("dragleave", function () {
        t(this).removeClass(i);
      }).on("drop", function () {
        t(this).removeClass(i);
      }), s.parent("form").attr("target") === n && (a.unwrap ? s.unwrap() : (s.parent().next().remove(), s.unwrap().unwrap())), s.wrap(u), s.off("change").on("change", function () {
        e.action(this, l);
      });
    });
  }, s.prototype.action = function (e, i) {
    var o = this.options,
        s = e.value,
        u = t(e),
        l = u.attr("lay-ext") || o.ext || "";

    if (s) {
      switch (i) {
        case "file":
          if (l && !RegExp("\\w\\.(" + l + ")$", "i").test(escape(s))) return a.msg("不支持该文件格式", r), e.value = "";
          break;

        case "video":
          if (!RegExp("\\w\\.(" + (l || "avi|mp4|wma|rmvb|rm|flash|3gp|flv") + ")$", "i").test(escape(s))) return a.msg("不支持该视频格式", r), e.value = "";
          break;

        case "audio":
          if (!RegExp("\\w\\.(" + (l || "mp3|wav|mid") + ")$", "i").test(escape(s))) return a.msg("不支持该音频格式", r), e.value = "";
          break;

        default:
          if (!RegExp("\\w\\.(" + (l || "jpg|png|gif|bmp|jpeg") + ")$", "i").test(escape(s))) return a.msg("不支持该图片格式", r), e.value = "";
      }

      o.before && o.before(e), u.parent().submit();
      var p = t("#" + n),
          c = setInterval(function () {
        var t;

        try {
          t = p.contents().find("body").text();
        } catch (e) {
          a.msg("上传接口存在跨域", r), clearInterval(c);
        }

        if (t) {
          clearInterval(c), p.contents().find("body").html("");

          try {
            t = JSON.parse(t);
          } catch (e) {
            return t = {}, a.msg("请对上传接口返回JSON字符", r);
          }

          "function" == typeof o.success && o.success(t, e);
        }
      }, 30);
      e.value = "";
    }
  }, e("upload-mobile", function (e) {
    new s(e = e || {}).init();
  });
});
layui["layui.mobile"] || layui.config({
  base: layui.cache.dir + "lay/modules/mobile/"
}).extend({
  "layer-mobile": "layer-mobile",
  zepto: "zepto",
  "upload-mobile": "upload-mobile",
  "layim-mobile": "layim-mobile"
}), layui.define(["layer-mobile", "zepto", "layim-mobile"], function (l) {
  l("mobile", {
    layer: layui["layer-mobile"],
    layim: layui["layim-mobile"]
  });
});