"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/** layui-v2.4.3 MIT License By https://www.layui.com */
;
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
      var _n;

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

          a.send(t.hasContent && t.data || null), _n = function n(e, r) {
            var o, u, l;
            if (_n && (r || 4 === a.readyState)) if (delete Yt[s], _n = void 0, a.onreadystatechange = d.noop, r) 4 !== a.readyState && a.abort();else {
              l = {}, o = a.status, "string" == typeof a.responseText && (l.text = a.responseText);

              try {
                u = a.statusText;
              } catch (e) {
                u = "";
              }

              o || !t.isLocal || t.crossDomain ? 1223 === o && (o = 204) : o = l.text ? 200 : 404;
            }
            l && i(o, u, l, a.getAllResponseHeaders());
          }, t.async ? 4 === a.readyState ? e.setTimeout(_n) : a.onreadystatechange = Yt[s] = _n : _n();
        },
        abort: function abort() {
          _n && _n(void 0, !0);
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