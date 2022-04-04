"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/** layui-v2.4.3 MIT License By https://www.layui.com */
;
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
        height: t > window.innerHeight * 0.9 ? window.innerHeight * 0.9 : t
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