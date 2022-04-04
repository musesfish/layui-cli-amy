"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/** layui-v2.4.3 MIT License By https://www.layui.com */
;
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
      return this.config = y.extend({}, this.config, e), this;
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
      um = ".laydate-btns-unlimited",
      u = "laydate-time-text",
      h = function h(e) {
    var t = this;
    t.index = ++n.index, t.config = y.extend({}, t.config, n.config, e), n.ready(function () {
      t.init();
    });
  },
      y = function y(e) {
    return new f(e);
  },
      f = function f(e) {
    for (var t = 0, n = "object" == _typeof(e) ? [e] : (this.selector = e, document.querySelectorAll(e || null)); t < n.length; t++) {
      this.push(n[t]);
    }
  };

  f.prototype = [], f.prototype.constructor = f, y.extend = function () {
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
  }, y.ie = function () {
    var e = navigator.userAgent.toLowerCase();
    return !!(window.ActiveXObject || "ActiveXObject" in window) && ((e.match(/msie\s(\d+)/) || [])[1] || "11");
  }(), y.stope = function (e) {
    (e = e || window.event).stopPropagation ? e.stopPropagation() : e.cancelBubble = !0;
  }, y.each = function (e, t) {
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
  }, y.digit = function (e, t, n) {
    var a = "";
    e = String(e), t = t || 2;

    for (var i = e.length; i < t; i++) {
      a += "0";
    }

    return e < Math.pow(10, t) ? a + (0 | e) : e;
  }, y.elem = function (e, t) {
    var n = document.createElement(e);
    return y.each(t || {}, function (e, t) {
      n.setAttribute(e, t);
    }), n;
  }, f.addStr = function (e, t) {
    return e = e.replace(/\s+/, " "), t = t.replace(/\s+/, " ").split(" "), y.each(t, function (t, n) {
      new RegExp("\\b" + n + "\\b").test(e) || (e = e + " " + n);
    }), e.replace(/^\s|\s$/, "");
  }, f.removeStr = function (e, t) {
    return e = e.replace(/\s+/, " "), t = t.replace(/\s+/, " ").split(" "), y.each(t, function (t, n) {
      var a = new RegExp("\\b" + n + "\\b");
      a.test(e) && (e = e.replace(a, ""));
    }), e.replace(/\s+/, " ").replace(/^\s|\s$/, "");
  }, f.prototype.find = function (e) {
    var t = this,
        n = 0,
        a = [],
        i = "object" == _typeof(e);

    return this.each(function (r, o) {
      for (var s = i ? [e] : o.querySelectorAll(e || null); n < s.length; n++) {
        a.push(s[n]);
      }

      t.shift();
    }), i || (t.selector = (t.selector ? t.selector + " " : "") + e), y.each(a, function (e, n) {
      t.push(n);
    }), t;
  }, f.prototype.each = function (e) {
    return y.each.call(this, this, e);
  }, f.prototype.addClass = function (e, t) {
    return this.each(function (n, a) {
      a.className = f[t ? "removeStr" : "addStr"](a.className, e);
    });
  }, f.prototype.removeClass = function (e) {
    return this.addClass(e, !0);
  }, f.prototype.hasClass = function (e) {
    var t = !1;
    return this.each(function (n, a) {
      new RegExp("\\b" + e + "\\b").test(a.className) && (t = !0);
    }), t;
  }, f.prototype.attr = function (e, t) {
    var n = this;
    return void 0 === t ? function () {
      if (n.length > 0) return n[0].getAttribute(e);
    }() : n.each(function (n, a) {
      a.setAttribute(e, t);
    });
  }, f.prototype.removeAttr = function (e) {
    return this.each(function (t, n) {
      n.removeAttribute(e);
    });
  }, f.prototype.html = function (e) {
    return this.each(function (t, n) {
      n.innerHTML = e;
    });
  }, f.prototype.val = function (e) {
    return this.each(function (t, n) {
      n.value = e;
    });
  }, f.prototype.append = function (e) {
    return this.each(function (t, n) {
      "object" == _typeof(e) ? n.appendChild(e) : n.innerHTML = n.innerHTML + e;
    });
  }, f.prototype.remove = function (e) {
    return this.each(function (t, n) {
      e ? n.removeChild(e) : n.parentNode.removeChild(n);
    });
  }, f.prototype.on = function (e, t) {
    return this.each(function (n, a) {
      a.attachEvent ? a.attachEvent("on" + e, function (e) {
        e.target = e.srcElement, t.call(a, e);
      }) : a.addEventListener(e, t, !1);
    });
  }, f.prototype.off = function (e, t) {
    return this.each(function (n, a) {
      a.detachEvent ? a.detachEvent("on" + e, t) : a.removeEventListener(e, t, !1);
    });
  }, h.isLeapYear = function (e) {
    return e % 4 == 0 && e % 100 != 0 || e % 400 == 0;
  }, h.prototype.config = {
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
  }, h.prototype.lang = function () {
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
          unlimited: "永久",
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
          unlimited: "Unlimited",
          clear: "Clear",
          now: "Now"
        }
      }
    };
    return e[this.config.lang] || e.cn;
  }, h.prototype.init = function () {
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
    t.elem = y(t.elem), t.eventElem = y(t.eventElem), t.elem[0] && (!0 === t.range && (t.range = "-"), t.format === i.date && (t.format = i[t.type]), e.format = t.format.match(new RegExp(n + "|.", "g")) || [], e.EXP_IF = "", e.EXP_SPLIT = "", y.each(e.format, function (t, a) {
      var i = new RegExp(n).test(a) ? "\\d{" + (new RegExp(n).test(e.format[0 === t ? t + 1 : t - 1] || "") ? /^yyyy|y$/.test(a) ? 4 : a.length : /^yyyy$/.test(a) ? "1,4" : /^y$/.test(a) ? "1,308" : "1,2") + "}" : "\\" + a;
      e.EXP_IF = e.EXP_IF + i, e.EXP_SPLIT = e.EXP_SPLIT + "(" + i + ")";
    }), e.EXP_IF = new RegExp("^" + (t.range ? e.EXP_IF + "\\s\\" + t.range + "\\s" + e.EXP_IF : e.EXP_IF) + "$"), e.EXP_SPLIT = new RegExp("^" + e.EXP_SPLIT + "$", ""), e.isInput(t.elem[0]) || "focus" === t.trigger && (t.trigger = "click"), t.elem.attr("lay-key") || (t.elem.attr("lay-key", e.index), t.eventElem.attr("lay-key", e.index)), t.mark = y.extend({}, t.calendar && "cn" === t.lang ? {
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
    } : {}, t.mark), y.each(["min", "max"], function (e, n) {
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
  }, h.prototype.render = function () {
    var e = this.config,
        t = this.lang(),
        n = "static" === e.position,
        a = this.elem = y.elem("div", {
      id: this.elemID,
      "class": ["layui-laydate", e.range ? " layui-laydate-range" : "", n ? " " + s : "", e.theme && "default" !== e.theme && !/^#/.test(e.theme) ? " laydate-theme-" + e.theme : ""].join("")
    }),
        i = this.elemMain = [],
        r = this.elemHeader = [],
        o = this.elemCont = [],
        l = this.table = [],
        d = this.footer = y.elem("div", {
      "class": "layui-laydate-footer"
    });

    if (e.zIndex && (a.style.zIndex = e.zIndex), y.each(new Array(2), function (n) {
      if (!e.range && n > 0) return !0;
      var a = y.elem("div", {
        "class": "layui-laydate-header"
      }),
          s = [function () {
        var e = y.elem("i", {
          "class": "layui-icon laydate-icon laydate-prev-y"
        });
        return e.innerHTML = "&#xe65a;", e;
      }(), function () {
        var e = y.elem("i", {
          "class": "layui-icon laydate-icon laydate-prev-m"
        });
        return e.innerHTML = "&#xe603;", e;
      }(), function () {
        var e = y.elem("div", {
          "class": "laydate-set-ym"
        }),
            t = y.elem("span"),
            n = y.elem("span");
        return e.appendChild(t), e.appendChild(n), e;
      }(), function () {
        var e = y.elem("i", {
          "class": "layui-icon laydate-icon laydate-next-m"
        });
        return e.innerHTML = "&#xe602;", e;
      }(), function () {
        var e = y.elem("i", {
          "class": "layui-icon laydate-icon laydate-next-y"
        });
        return e.innerHTML = "&#xe65b;", e;
      }()],
          d = y.elem("div", {
        "class": "layui-laydate-content"
      }),
          c = y.elem("table"),
          m = y.elem("thead"),
          u = y.elem("tr");
      y.each(s, function (e, t) {
        a.appendChild(t);
      }), m.appendChild(u), y.each(new Array(6), function (e) {
        var n = c.insertRow(0);
        y.each(new Array(7), function (a) {
          if (0 === e) {
            var i = y.elem("th");
            i.innerHTML = t.weeks[a], u.appendChild(i);
          }

          n.insertCell(a);
        });
      }), c.insertBefore(m, c.children[0]), d.appendChild(c), i[n] = y.elem("div", {
        "class": "layui-laydate-main laydate-main-list-" + n
      }), i[n].appendChild(a), i[n].appendChild(d), r.push(s), o.push(d), l.push(c);
    }), y(d).html(function () {
      var a = [],
          i = [];
      return "datetime" === e.type && a.push('<span lay-type="datetime" class="laydate-btns-time">' + t.timeTips + "</span>"), y.each(e.btns, function (a, r) {
        var o = t.tools[r] || "btn";
        e.range && "now" === r || (n && "clear" === r && (o = "cn" === e.lang ? "重置" : "Reset"), i.push('<span lay-type="' + r + '" class="laydate-btns-' + r + '">' + o + "</span>"));
      }), a.push('<div class="laydate-footer-btns">' + i.join("") + "</div>"), a.join("");
    }()), y.each(i, function (e, t) {
      a.appendChild(t);
    }), e.showBottom && a.appendChild(d), /^#/.test(e.theme)) {
      var c = y.elem("style"),
          m = ["#{{id}} .layui-laydate-header{background-color:{{theme}};}", "#{{id}} .layui-this{background-color:{{theme}} !important;}"].join("").replace(/{{id}}/g, this.elemID).replace(/{{theme}}/g, e.theme);
      "styleSheet" in c ? (c.setAttribute("type", "text/css"), c.styleSheet.cssText = m) : c.innerHTML = m, y(a).addClass("laydate-theme-molv"), a.appendChild(c);
    }

    this.remove(h.thisElemDate), n ? e.elem.append(a) : (document.body.appendChild(a), this.position()), this.checkDate().calendar(), this.changeEvent(), h.thisElemDate = this.elemID, "function" == typeof e.ready && e.ready(y.extend({}, e.dateTime, {
      month: e.dateTime.month + 1
    }));
  }, h.prototype.remove = function (e) {
    this.config;
    var t = y("#" + (e || this.elemID));
    return t.hasClass(s) || this.checkDate(function () {
      t.remove();
    }), this;
  }, h.prototype.position = function () {
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
  }, h.prototype.hint = function (e) {
    var t = this,
        n = (t.config, y.elem("div", {
      "class": c
    }));
    t.elem && (n.innerHTML = e || "", y(t.elem).find("." + c).remove(), t.elem.appendChild(n), clearTimeout(t.hinTimer), t.hinTimer = setTimeout(function () {
      y(t.elem).find("." + c).remove();
    }, 3e3));
  }, h.prototype.getAsYM = function (e, t, n) {
    return n ? t-- : t++, t < 0 && (t = 11, e--), t > 11 && (t = 0, e++), [e, t];
  }, h.prototype.systemDate = function (e) {
    var t = e || new Date();
    return {
      year: t.getFullYear(),
      month: t.getMonth(),
      date: t.getDate(),
      hours: e ? e.getHours() : 0,
      minutes: e ? e.getMinutes() : 0,
      seconds: e ? e.getSeconds() : 0
    };
  }, h.prototype.checkDate = function (e) {
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
      t = (t.match(i.EXP_SPLIT) || []).slice(1), n = n || 0, r.range && (i[s[n]] = i[s[n]] || {}), y.each(i.format, function (l, d) {
        var c = parseFloat(t[l]);
        t[l].length < d.length && (a = !0), /yyyy|y/.test(d) ? (c < o[0] && (c = o[0], a = !0), e.year = c) : /MM|M/.test(d) ? (c < 1 && (c = 1, a = !0), e.month = c - 1) : /dd|d/.test(d) ? (c < 1 && (c = 1, a = !0), e.date = c) : /HH|H/.test(d) ? (c < 1 && (c = 0, a = !0), e.hours = c, r.range && (i[s[n]].hours = c)) : /mm|m/.test(d) ? (c < 1 && (c = 0, a = !0), e.minutes = c, r.range && (i[s[n]].minutes = c)) : /ss|s/.test(d) && (c < 1 && (c = 0, a = !0), e.seconds = c, r.range && (i[s[n]].seconds = c));
      }), c(e);
    };

    return "limit" === e ? (c(s), i) : ("string" == typeof (d = d || r.value) && (d = d.replace(/\s+/g, " ").replace(/^\s|\s$/g, "")), i.startState && !i.endState && (delete i.startState, i.endState = !0), "string" == typeof d && d ? i.EXP_IF.test(d) ? r.range ? (d = d.split(" " + r.range + " "), i.startDate = i.startDate || i.systemDate(), i.endDate = i.endDate || i.systemDate(), r.dateTime = y.extend({}, i.startDate), y.each([i.startDate, i.endDate], function (e, t) {
      m(t, d[e], e);
    })) : m(s, d) : a = !0 : d && d.constructor === Date ? r.dateTime = i.systemDate(d) : (r.dateTime = i.systemDate(), delete i.startState, delete i.endState, delete i.startDate, delete i.endDate, delete i.startTime, delete i.endTime), c(s), a && d && i.setValue(r.range ? i.endDate ? i.parse() : "" : i.parse() == "9999-12-31" ? "永久" : i.parse()), e && e(), i);
  }, h.prototype.mark = function (e, t) {
    var n,
        a = this.config;
    return y.each(a.mark, function (e, a) {
      var i = e.split("-");
      i[0] != t[0] && 0 != i[0] || i[1] != t[1] && 0 != i[1] || i[2] != t[2] || (n = a || t[2]);
    }), n && e.html('<span class="laydate-day-mark">' + n + "</span>"), this;
  }, h.prototype.limit = function (e, t, n, a) {
    var r,
        o = this,
        s = o.config,
        l = {},
        d = s[n > 41 ? "endDate" : "dateTime"],
        c = y.extend({}, d, t || {});
    return y.each({
      now: c,
      min: s.min,
      max: s.max
    }, function (e, t) {
      l[e] = o.newDate(y.extend({
        year: t.year,
        month: t.month,
        date: t.date
      }, function () {
        var e = {};
        return y.each(a, function (n, a) {
          e[a] = t[a];
        }), e;
      }())).getTime();
    }), r = l.now < l.min || l.now > l.max, e && e[r ? "addClass" : "removeClass"](i), r;
  }, h.prototype.calendar = function (e) {
    var t,
        i,
        r,
        s = this,
        l = s.config,
        d = e || l.dateTime,
        c = new Date(),
        u = s.lang(),
        h = "date" !== l.type && "datetime" !== l.type,
        f = e ? 1 : 0,
        p = y(s.table[f]).find("td"),
        g = y(s.elemHeader[f][2]).find("span");

    if (d.year < o[0] && (d.year = o[0], s.hint("最低只能支持到公元" + o[0] + "年")), d.year > o[1] && (d.year = o[1], s.hint("最高只能支持到公元" + o[1] + "年")), s.firstDate || (s.firstDate = y.extend({}, d)), c.setFullYear(d.year, d.month, 1), t = c.getDay(), i = n.getEndDate(d.month || 12, d.year), r = n.getEndDate(d.month + 1, d.year), y.each(p, function (e, n) {
      var o = [d.year, d.month],
          c = 0;
      (n = y(n)).removeAttr("class"), e < t ? (c = i - t + e, n.addClass("laydate-day-prev"), o = s.getAsYM(d.year, d.month, "sub")) : e >= t && e < r + t ? (c = e - t, l.range || c + 1 === d.date && n.addClass(a)) : (c = e - r - t, n.addClass("laydate-day-next"), o = s.getAsYM(d.year, d.month)), o[1]++, o[2] = c + 1, n.attr("lay-ymd", o.join("-")).html(o[2]), s.mark(n, o).limit(n, {
        year: o[0],
        month: o[1] - 1,
        date: o[2]
      }, e);
    }), y(g[0]).attr("lay-ym", d.year + "-" + (d.month + 1)), y(g[1]).attr("lay-ym", d.year + "-" + (d.month + 1)), "cn" === l.lang ? (y(g[0]).attr("lay-type", "year").html(d.year + "年"), y(g[1]).attr("lay-type", "month").html(d.month + 1 + "月")) : (y(g[0]).attr("lay-type", "month").html(u.month[d.month]), y(g[1]).attr("lay-type", "year").html(d.year)), h && (l.range && (e ? s.endDate = s.endDate || {
      year: d.year + ("year" === l.type ? 1 : 0),
      month: d.month + ("month" === l.type ? 0 : -1)
    } : s.startDate = s.startDate || {
      year: d.year,
      month: d.month
    }, e && (s.listYM = [[s.startDate.year, s.startDate.month + 1], [s.endDate.year, s.endDate.month + 1]], s.list(l.type, 0).list(l.type, 1), "time" === l.type ? s.setBtnStatus("时间", y.extend({}, s.systemDate(), s.startTime), y.extend({}, s.systemDate(), s.endTime)) : s.setBtnStatus(!0))), l.range || (s.listYM = [[d.year, d.month + 1]], s.list(l.type, 0))), l.range && !e) {
      var v = s.getAsYM(d.year, d.month);
      s.calendar(y.extend({}, d, {
        year: v[0],
        month: v[1]
      }));
    }

    return l.range || s.limit(y(s.footer).find(m), null, 0, ["hours", "minutes", "seconds"]), l.range && e && !h && s.stampRange(), s;
  }, h.prototype.list = function (e, t) {
    var n = this,
        r = n.config,
        o = r.dateTime,
        s = n.lang(),
        d = r.range && "date" !== r.type && "datetime" !== r.type,
        c = y.elem("ul", {
      "class": l + " " + {
        year: "laydate-year-list",
        month: "laydate-month-list",
        time: "laydate-time-list"
      }[e]
    }),
        h = n.elemHeader[t],
        f = y(h[2]).find("span"),
        p = n.elemCont[t || 0],
        g = y(p).find("." + l)[0],
        v = "cn" === r.lang,
        D = v ? "年" : "",
        T = n.listYM[t] || {},
        w = ["hours", "minutes", "seconds"],
        C = ["startTime", "endTime"][t];

    if (T[0] < 1 && (T[0] = 1), "year" === e) {
      var x,
          M = x = T[0] - 7;
      M < 1 && (M = x = 1), y.each(new Array(15), function (e) {
        var i = y.elem("li", {
          "lay-ym": x
        }),
            o = {
          year: x
        };
        x == T[0] && y(i).addClass(a), i.innerHTML = x + D, c.appendChild(i), x < n.firstDate.year ? (o.month = r.min.month, o.date = r.min.date) : x >= n.firstDate.year && (o.month = r.max.month, o.date = r.max.date), n.limit(y(i), o, t), x++;
      }), y(f[v ? 0 : 1]).attr("lay-ym", x - 8 + "-" + T[1]).html(M + D + " - " + (x - 1 + D));
    } else if ("month" === e) y.each(new Array(12), function (e) {
      var i = y.elem("li", {
        "lay-ym": e
      }),
          o = {
        year: T[0],
        month: e
      };
      e + 1 == T[1] && y(i).addClass(a), i.innerHTML = s.month[e] + (v ? "月" : ""), c.appendChild(i), T[0] < n.firstDate.year ? o.date = r.min.date : T[0] >= n.firstDate.year && (o.date = r.max.date), n.limit(y(i), o, t);
    }), y(f[v ? 0 : 1]).attr("lay-ym", T[0] + "-" + T[1]).html(T[0] + D);else if ("time" === e) {
      var b = function b() {
        y(c).find("ol").each(function (e, a) {
          y(a).find("li").each(function (a, i) {
            n.limit(y(i), [{
              hours: a
            }, {
              hours: n[C].hours,
              minutes: a
            }, {
              hours: n[C].hours,
              minutes: n[C].minutes,
              seconds: a
            }][e], t, [["hours"], ["hours", "minutes"], ["hours", "minutes", "seconds"]][e]);
          });
        }), r.range || n.limit(y(n.footer).find(m), n[C], 0, ["hours", "minutes", "seconds"]);
      };

      r.range ? n[C] || (n[C] = {
        hours: 0,
        minutes: 0,
        seconds: 0
      }) : n[C] = o, y.each([24, 60, 60], function (e, t) {
        var a = y.elem("li"),
            i = ["<p>" + s.time[e] + "</p><ol>"];
        y.each(new Array(t), function (t) {
          i.push("<li" + (n[C][w[e]] === t ? ' class="layui-this"' : "") + ">" + y.digit(t, 2) + "</li>");
        }), a.innerHTML = i.join("") + "</ol>", c.appendChild(a);
      }), b();
    }

    if (g && p.removeChild(g), p.appendChild(c), "year" === e || "month" === e) y(n.elemMain[t]).addClass("laydate-ym-show"), y(c).find("li").on("click", function () {
      var s = 0 | y(this).attr("lay-ym");

      if (!y(this).hasClass(i)) {
        if (0 === t) o[e] = s, d && (n.startDate[e] = s), n.limit(y(n.footer).find(m), null, 0);else if (d) n.endDate[e] = s;else {
          var l = "year" === e ? n.getAsYM(s, T[1] - 1, "sub") : n.getAsYM(T[0], s, "sub");
          y.extend(o, {
            year: l[0],
            month: l[1]
          });
        }
        "year" === r.type || "month" === r.type ? (y(c).find("." + a).removeClass(a), y(this).addClass(a), "month" === r.type && "year" === e && (n.listYM[t][0] = s, d && (n[["startDate", "endDate"][t]].year = s), n.list("month", t))) : (n.checkDate("limit").calendar(), n.closeList()), n.setBtnStatus(), r.range || n.done(null, "change"), y(n.footer).find(".laydate-btns-time").removeClass(i);
      }
    });else {
      var E = y.elem("span", {
        "class": u
      }),
          S = function S() {
        y(c).find("ol").each(function (e) {
          var t = this,
              a = y(t).find("li");
          t.scrollTop = 30 * (n[C][w[e]] - 2), t.scrollTop <= 0 && a.each(function (e, n) {
            if (!y(this).hasClass(i)) return t.scrollTop = 30 * (e - 2), !0;
          });
        });
      },
          k = y(h[2]).find("." + u);

      S(), E.innerHTML = r.range ? [s.startTime, s.endTime][t] : s.timeTips, y(n.elemMain[t]).addClass("laydate-time-show"), k[0] && k.remove(), h[2].appendChild(E), y(c).find("ol").each(function (e) {
        var t = this;
        y(t).find("li").on("click", function () {
          var s = 0 | this.innerHTML;
          y(this).hasClass(i) || (r.range ? n[C][w[e]] = s : o[w[e]] = s, y(t).find("." + a).removeClass(a), y(this).addClass(a), b(), S(), (n.endDate || "time" === r.type) && n.done(null, "change"), n.setBtnStatus());
        });
      });
    }
    return n;
  }, h.prototype.listYM = [], h.prototype.closeList = function () {
    var e = this;
    e.config;
    y.each(e.elemCont, function (t, n) {
      y(this).find("." + l).remove(), y(e.elemMain[t]).removeClass("laydate-ym-show laydate-time-show");
    }), y(e.elem).find("." + u).remove();
  }, h.prototype.setBtnStatus = function (e, t, n) {
    var a,
        o = this.config,
        s = y(this.footer).find(m);
    o.range && "date" !== o.type && "time" !== o.type && (t = t || this.startDate, n = n || this.endDate, a = this.newDate(t).getTime() > this.newDate(n).getTime(), this.limit(null, t) || this.limit(null, n) ? s.addClass(i) : s[a ? "addClass" : "removeClass"](i), e && a && this.hint("string" == typeof e ? r.replace(/日期/g, e) : r));
  }, h.prototype.parse = function (e, t) {
    var n = this.config,
        a = t || (e ? y.extend({}, this.endDate, this.endTime) : n.range ? y.extend({}, this.startDate, this.startTime) : n.dateTime),
        i = this.format.concat();
    return y.each(i, function (e, t) {
      /yyyy|y/.test(t) ? i[e] = y.digit(a.year, t.length) : /MM|M/.test(t) ? i[e] = y.digit(a.month + 1, t.length) : /dd|d/.test(t) ? i[e] = y.digit(a.date, t.length) : /HH|H/.test(t) ? i[e] = y.digit(a.hours, t.length) : /mm|m/.test(t) ? i[e] = y.digit(a.minutes, t.length) : /ss|s/.test(t) && (i[e] = y.digit(a.seconds, t.length));
    }), n.range && !e ? i.join("") + " " + n.range + " " + this.parse(1) : i.join("");
  }, h.prototype.newDate = function (e) {
    return e = e || {}, new Date(e.year || 1, e.month || 0, e.date || 1, e.hours || 0, e.minutes || 0, e.seconds || 0);
  }, h.prototype.setValue = function (e) {
    var t = this.config,
        n = this.bindElem || t.elem[0],
        a = this.isInput(n) ? "val" : "html";
    return "static" === t.position || y(n)[a](e || ""), this;
  }, h.prototype.stampRange = function () {
    var e,
        t,
        n = this,
        o = n.config,
        s = y(n.elem).find("td");

    if (o.range && !n.endDate && y(n.footer).find(m).addClass(i) && y(n.footer).find(um).addClass(i), n.endDate) {
      if (e = n.newDate({
        year: n.startDate.year,
        month: n.startDate.month,
        date: n.startDate.date
      }).getTime(), t = n.newDate({
        year: n.endDate.year,
        month: n.endDate.month,
        date: n.endDate.date
      }).getTime(), e > t) return n.hint(r);
      y.each(s, function (i, r) {
        var o = y(r).attr("lay-ymd").split("-"),
            s = n.newDate({
          year: o[0],
          month: o[1] - 1,
          date: o[2]
        }).getTime();
        y(r).removeClass(d + " " + a), s !== e && s !== t || y(r).addClass(y(r).hasClass("laydate-day-prev") || y(r).hasClass("laydate-day-next") ? d : a), s > e && s < t && y(r).addClass(d);
      });
    }
  }, h.prototype.done = function (e, t) {
    var n = this.config,
        a = y.extend({}, this.startDate ? y.extend(this.startDate, this.startTime) : n.dateTime),
        i = y.extend({}, y.extend(this.endDate, this.endTime));
    return y.each([a, i], function (e, t) {
      "month" in t && y.extend(t, {
        month: t.month + 1
      });
    }), e = e || [this.parse(), a, i], "function" == typeof n[t || "done"] && n[t || "done"].apply(n, e), this;
  }, h.prototype.choose = function (e) {
    var t = this,
        n = t.config,
        r = n.dateTime,
        o = y(t.elem).find("td"),
        s = e.attr("lay-ymd").split("-"),
        l = function l(e) {
      new Date();
      e && y.extend(r, s), n.range && (t.startDate ? y.extend(t.startDate, s) : t.startDate = y.extend({}, s, t.startTime), t.startYMD = s);
    };

    if (s = {
      year: 0 | s[0],
      month: (0 | s[1]) - 1,
      date: 0 | s[2]
    }, !e.hasClass(i)) if (n.range) {
      if (y.each(["startTime", "endTime"], function (e, n) {
        t[n] = t[n] || {
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }), t.endState) l(), delete t.endState, delete t.endDate, t.startState = !0, o.removeClass(a + " " + d), e.addClass(a);else if (t.startState) {
        if (e.addClass(a), t.endDate ? y.extend(t.endDate, s) : t.endDate = y.extend({}, s, t.endTime), t.newDate(s).getTime() < t.newDate(t.startYMD).getTime()) {
          var c = y.extend({}, t.endDate, {
            hours: t.startDate.hours,
            minutes: t.startDate.minutes,
            seconds: t.startDate.seconds
          });
          y.extend(t.endDate, t.startDate, {
            hours: t.endDate.hours,
            minutes: t.endDate.minutes,
            seconds: t.endDate.seconds
          }), t.startDate = c;
        }

        n.showBottom || t.done(), t.stampRange(), t.endState = !0, t.done(null, "change");
      } else e.addClass(a), l(), t.startState = !0;
      y(t.footer).find(m)[t.endDate ? "removeClass" : "addClass"](i);
      y(t.footer).find(um)[t.endDate ? "addClass" : 'removeClass'](i);
    } else "static" === n.position ? (l(!0), t.calendar().done().done(null, "change")) : "date" === n.type ? (l(!0), t.setValue(t.parse()).remove().done()) : "datetime" === n.type && (l(!0), t.calendar().done(null, "change"));
  }, h.prototype.tool = function (e, t) {
    var n = this,
        a = n.config,
        o = a.dateTime,
        s = "static" === a.position,
        l = {
      datetime: function datetime() {
        y(e).hasClass(i) || (n.list("time", 0), a.range && n.list("time", 1), y(e).attr("lay-type", "date").html(n.lang().dateTips));
      },
      date: function date() {
        n.closeList(), y(e).attr("lay-type", "datetime").html(n.lang().timeTips);
      },
      clear: function clear() {
        n.setValue("").remove(), s && (y.extend(o, n.firstDate), n.calendar()), a.range && (delete n.startState, delete n.endState, delete n.endDate, delete n.startTime, delete n.endTime), n.done(["", {}, {}]);
      },
      now: function now() {
        var e = new Date();
        y.extend(o, n.systemDate(), {
          hours: e.getHours(),
          minutes: e.getMinutes(),
          seconds: e.getSeconds()
        }), n.setValue(n.parse()).remove(), s && n.calendar(), n.done();
      },
      confirm: function confirm() {
        if (a.range) {
          if (!n.endDate) return n.hint("请先选择日期范围");
          if (y(e).hasClass(i)) return n.hint("time" === a.type ? r.replace(/日期/g, "时间") : r);
        } else if (y(e).hasClass(i)) return n.hint("不在有效日期或时间范围内");

        n.done(), n.setValue(n.parse()).remove();
      },
      unlimited: function unlimited() {
        if (a.range) {
          if (!n.startDate) return n.hint('请先选择起始日期');
          if (n.endDate) return false;
        }

        if (n.startDate) {
          n.startDate.month = n.startDate.month + 1;
          var val = "".concat(n.startDate.year, "-").concat(n.startDate.month + 1, "-").concat(n.startDate.date, " - 9999-12-31");
          n.setValue(val).remove(), n.done([val, (n.startDate.month, n.startDate), '永久']);
        } else {
          var obj = n.systemDate();
          obj.year = 9999;
          obj.month = 12;
          obj.date = 31;
          y.extend(o, obj), n.setValue(n.parse()).remove(), s && n.calendar(), n.done();
        }
      }
    };
    l[t] && l[t]();
  }, h.prototype.change = function (e) {
    var t = this,
        n = t.config,
        a = n.dateTime,
        i = n.range && ("year" === n.type || "month" === n.type),
        r = t.elemCont[e || 0],
        o = t.listYM[e],
        s = function s(_s) {
      var l = ["startDate", "endDate"][e],
          d = y(r).find(".laydate-year-list")[0],
          c = y(r).find(".laydate-month-list")[0];
      return d && (o[0] = _s ? o[0] - 15 : o[0] + 15, t.list("year", e)), c && (_s ? o[0]-- : o[0]++, t.list("month", e)), (d || c) && (y.extend(a, {
        year: o[0]
      }), i && (t[l].year = o[0]), n.range || t.done(null, "change"), t.setBtnStatus(), n.range || t.limit(y(t.footer).find(m), {
        year: o[0]
      })), d || c;
    };

    return {
      prevYear: function prevYear() {
        s("sub") || (a.year--, t.checkDate("limit").calendar(), n.range || t.done(null, "change"));
      },
      prevMonth: function prevMonth() {
        var e = t.getAsYM(a.year, a.month, "sub");
        y.extend(a, {
          year: e[0],
          month: e[1]
        }), t.checkDate("limit").calendar(), n.range || t.done(null, "change");
      },
      nextMonth: function nextMonth() {
        var e = t.getAsYM(a.year, a.month);
        y.extend(a, {
          year: e[0],
          month: e[1]
        }), t.checkDate("limit").calendar(), n.range || t.done(null, "change");
      },
      nextYear: function nextYear() {
        s() || (a.year++, t.checkDate("limit").calendar(), n.range || t.done(null, "change"));
      }
    };
  }, h.prototype.changeEvent = function () {
    var e = this;
    e.config;
    y(e.elem).on("click", function (e) {
      y.stope(e);
    }), y.each(e.elemHeader, function (t, n) {
      y(n[0]).on("click", function (n) {
        e.change(t).prevYear();
      }), y(n[1]).on("click", function (n) {
        e.change(t).prevMonth();
      }), y(n[2]).find("span").on("click", function (n) {
        var a = y(this),
            r = a.attr("lay-ym"),
            o = a.attr("lay-type");
        r && (r = r.split("-"), e.listYM[t] = [0 | r[0], 0 | r[1]], e.list(o, t), y(e.footer).find(".laydate-btns-time").addClass(i));
      }), y(n[3]).on("click", function (n) {
        e.change(t).nextMonth();
      }), y(n[4]).on("click", function (n) {
        e.change(t).nextYear();
      });
    }), y.each(e.table, function (t, n) {
      y(n).find("td").on("click", function () {
        e.choose(y(this));
      });
    }), y(e.footer).find("span").on("click", function () {
      var t = y(this).attr("lay-type");
      e.tool(this, t);
    });
  }, h.prototype.isInput = function (e) {
    return /input|textarea/.test(e.tagName.toLocaleLowerCase());
  }, h.prototype.events = function () {
    var e = this,
        t = e.config,
        n = function n(_n, a) {
      _n.on(t.trigger, function () {
        a && (e.bindElem = this), e.render();
      });
    };

    t.elem[0] && !t.elem[0].eventHandler && (n(t.elem, "bind"), n(t.eventElem), y(document).on("click", function (n) {
      n.target !== t.elem[0] && n.target !== t.eventElem[0] && n.target !== y(t.closeStop)[0] && e.remove();
    }).on("keydown", function (t) {
      13 === t.keyCode && y("#" + e.elemID)[0] && e.elemID === h.thisElem && (t.preventDefault(), y(e.footer).find(m)[0].click());
    }), y(window).on("resize", function () {
      if (!e.elem || !y(".layui-laydate")[0]) return !1;
      e.position();
    }), t.elem[0].eventHandler = !0);
  }, n.render = function (e) {
    // 禁止手动输入时间
    var elem = layui.$(e.elem);
    e.trigger === 'click' && elem.on('focus', function () {
      elem.blur();
    });
    var t = new h(e);
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
  }, window.lay = window.lay || y, e ? (n.ready(), layui.define(function (e) {
    n.path = layui.cache.dir, e("laydate", n);
  })) : "function" == typeof define && define.amd ? define(function () {
    return n;
  }) : (n.ready(), window.laydate = n);
}();