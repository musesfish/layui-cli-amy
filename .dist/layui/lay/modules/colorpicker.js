"use strict";

/** layui-v2.4.3 MIT License By https://www.layui.com */
;
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
      t = "layui-colorpicker",
      r = ".layui-colorpicker-main",
      n = "layui-icon-down",
      l = "layui-icon-close",
      c = "layui-colorpicker-trigger-span",
      s = "layui-colorpicker-trigger-i",
      a = "layui-colorpicker-side-slider",
      f = "layui-colorpicker-basis",
      d = "layui-colorpicker-alpha-bgcolor",
      u = "layui-colorpicker-alpha-slider",
      h = "layui-colorpicker-basis-cursor",
      p = "layui-colorpicker-main-input",
      g = function g(e) {
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
      v = function v(e) {
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
      m = function m(e) {
    var o = v(e),
        t = [o.r.toString(16), o.g.toString(16), o.b.toString(16)];
    return i.each(t, function (e, i) {
      1 == i.length && (t[e] = "0" + i);
    }), t.join("");
  },
      b = function b(e) {
    var i = e.match(/[0-9]{1,3}/g) || [];
    return {
      r: i[0],
      g: i[1],
      b: i[2]
    };
  },
      k = i(window),
      y = i(document),
      x = function x(e) {
    this.index = ++o.index, this.config = i.extend({}, this.config, o.config, e), this.render();
  };

  x.prototype.config = {
    color: "",
    size: null,
    alpha: !1,
    format: "hex",
    predefine: !1,
    colors: ["#00ACAC", "#5FB878", "#1E9FFF", "#FF5722", "#FFB800", "#01AAED", "#999", "#c00", "#ff8c00", "#ffd700", "#90ee90", "#00ced1", "#1e90ff", "#c71585", "rgb(0, 186, 189)", "rgb(255, 120, 0)", "rgb(250, 212, 0)", "#393D49", "rgba(0,0,0,.5)", "rgba(255, 69, 0, 0.68)", "rgba(144, 240, 144, 0.5)", "rgba(31, 147, 255, 0.73)"]
  }, x.prototype.render = function () {
    var e = this.config,
        o = i(['<div class="layui-unselect layui-colorpicker">', "<span " + ("rgb" == e.format && e.alpha ? 'class="layui-colorpicker-trigger-bgcolor"' : "") + ">", '<span class="layui-colorpicker-trigger-span" ', 'lay-type="' + ("rgb" == e.format ? e.alpha ? "rgba" : "torgb" : "") + '" ', 'style="' + function () {
      var i = "";
      return e.color ? (i = e.color, (e.color.match(/[0-9]{1,3}/g) || []).length > 3 && (e.alpha && "rgb" == e.format || (i = "#" + m(g(b(e.color))))), "background: " + i) : i;
    }() + '">', '<i class="layui-icon layui-colorpicker-trigger-i ' + (e.color ? n : l) + '"></i>', "</span>", "</span>", "</div>"].join("")),
        t = i(e.elem);
    e.size && o.addClass("layui-colorpicker-" + e.size), t.addClass("layui-inline").html(this.elemColorBox = o), this.color = this.elemColorBox.find("." + c)[0].style.background, this.events();
  }, x.prototype.renderPicker = function () {
    var e = this.config,
        o = this.elemColorBox[0],
        t = this.elemPicker = i(['<div id="layui-colorpicker' + this.index + '" data-index="' + this.index + '" class="layui-anim layui-anim-upbit layui-colorpicker-main">', '<div class="layui-colorpicker-main-wrapper">', '<div class="layui-colorpicker-basis">', '<div class="layui-colorpicker-basis-white"></div>', '<div class="layui-colorpicker-basis-black"></div>', '<div class="layui-colorpicker-basis-cursor"></div>', "</div>", '<div class="layui-colorpicker-side">', '<div class="layui-colorpicker-side-slider"></div>', "</div>", "</div>", '<div class="layui-colorpicker-main-alpha ' + (e.alpha ? "layui-show" : "") + '">', '<div class="layui-colorpicker-alpha-bgcolor">', '<div class="layui-colorpicker-alpha-slider"></div>', "</div>", "</div>", function () {
      if (e.predefine) {
        var i = ['<div class="layui-colorpicker-main-pre">'];
        return layui.each(e.colors, function (e, o) {
          i.push(['<div class="layui-colorpicker-pre' + ((o.match(/[0-9]{1,3}/g) || []).length > 3 ? " layui-colorpicker-pre-isalpha" : "") + '">', '<div style="background:' + o + '"></div>', "</div>"].join(""));
        }), i.push("</div>"), i.join("");
      }

      return "";
    }(), '<div class="layui-colorpicker-main-input">', '<div class="layui-inline">', '<input type="text" class="layui-input">', "</div>", '<div class="layui-btn-container">', '<button class="layui-btn layui-btn-primary layui-btn-sm" colorpicker-events="clear">清空</button>', '<button class="layui-btn layui-btn-sm" colorpicker-events="confirm">确定</button>', "</div", "</div>", "</div>"].join(""));
    this.elemColorBox.find("." + c)[0];
    i(r)[0] && i(r).data("index") == this.index ? this.removePicker(x.thisElemInd) : (this.removePicker(x.thisElemInd), i("body").append(t)), x.thisElemInd = this.index, x.thisColor = o.style.background, this.position(), this.pickerEvents();
  }, x.prototype.removePicker = function (e) {
    this.config;
    return i("#layui-colorpicker" + (e || this.index)).remove(), this;
  }, x.prototype.position = function () {
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
  }, x.prototype.val = function () {
    this.config;
    var e = this.elemColorBox.find("." + c),
        i = this.elemPicker.find("." + p),
        o = e[0].style.backgroundColor;

    if (o) {
      var t = g(b(o)),
          r = e.attr("lay-type");

      if (this.select(t.h, t.s, t.b), "torgb" === r && i.find("input").val(o), "rgba" === r) {
        var n = b(o);
        if (3 == (o.match(/[0-9]{1,3}/g) || []).length) i.find("input").val("rgba(" + n.r + ", " + n.g + ", " + n.b + ", 1)"), this.elemPicker.find("." + u).css("left", 280);else {
          i.find("input").val(o);
          var l = 280 * o.slice(o.lastIndexOf(",") + 1, o.length - 1);
          this.elemPicker.find("." + u).css("left", l);
        }
        this.elemPicker.find("." + d)[0].style.background = "linear-gradient(to right, rgba(" + n.r + ", " + n.g + ", " + n.b + ", 0), rgb(" + n.r + ", " + n.g + ", " + n.b + "))";
      }
    } else this.select(0, 100, 100), i.find("input").val(""), this.elemPicker.find("." + d)[0].style.background = "", this.elemPicker.find("." + u).css("left", 280);
  }, x.prototype.side = function () {
    var e = this,
        o = e.config,
        t = e.elemColorBox.find("." + c),
        r = t.attr("lay-type"),
        m = e.elemPicker.find(".layui-colorpicker-side"),
        y = e.elemPicker.find("." + a),
        x = e.elemPicker.find("." + f),
        C = e.elemPicker.find("." + h),
        P = e.elemPicker.find("." + d),
        B = e.elemPicker.find("." + u),
        w = y[0].offsetTop / 180 * 360,
        D = 100 - (C[0].offsetTop + 3) / 180 * 100,
        E = (C[0].offsetLeft + 3) / 260 * 100,
        H = Math.round(B[0].offsetLeft / 280 * 100) / 100,
        W = e.elemColorBox.find("." + s),
        j = e.elemPicker.find(".layui-colorpicker-pre").children("div"),
        F = function F(i, c, s, a) {
      e.select(i, c, s);
      var f = v({
        h: i,
        s: c,
        b: s
      });

      if (W.addClass(n).removeClass(l), t[0].style.background = "rgb(" + f.r + ", " + f.g + ", " + f.b + ")", "torgb" === r && e.elemPicker.find("." + p).find("input").val("rgb(" + f.r + ", " + f.g + ", " + f.b + ")"), "rgba" === r) {
        var d = 0;
        d = 280 * a, B.css("left", d), e.elemPicker.find("." + p).find("input").val("rgba(" + f.r + ", " + f.g + ", " + f.b + ", " + a + ")"), t[0].style.background = "rgba(" + f.r + ", " + f.g + ", " + f.b + ", " + a + ")", P[0].style.background = "linear-gradient(to right, rgba(" + f.r + ", " + f.g + ", " + f.b + ", 0), rgb(" + f.r + ", " + f.g + ", " + f.b + "))";
      }

      o.change && o.change(e.elemPicker.find("." + p).find("input").val());
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
            r = m[0].offsetHeight;
        t < 0 && (t = 0), t > r && (t = r);
        var n = t / 180 * 360;
        w = n, F(n, E, D, H), e.preventDefault();
      }), e.preventDefault();
    }), m.on("click", function (e) {
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
      var o = e.clientY - i(this).offset().top - 3 + k.scrollTop(),
          t = e.clientX - i(this).offset().left - 3 + k.scrollLeft();
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
            o = g(b(e)),
            t = e.slice(e.lastIndexOf(",") + 1, e.length - 1);
        w = o.h, E = o.s, D = o.b, 3 == (e.match(/[0-9]{1,3}/g) || []).length && (t = 1), H = t, F(o.h, o.s, o.b, t);
      });
    });
  }, x.prototype.select = function (e, i, o, t) {
    this.config;
    var r = m({
      h: e,
      s: 100,
      b: 100
    }),
        n = m({
      h: e,
      s: i,
      b: o
    }),
        l = e / 360 * 180,
        c = 180 - o / 100 * 180 - 3,
        s = i / 100 * 260 - 3;
    this.elemPicker.find("." + a).css("top", l), this.elemPicker.find("." + f)[0].style.background = "#" + r, this.elemPicker.find("." + h).css({
      top: c,
      left: s
    }), "change" !== t && this.elemPicker.find("." + p).find("input").val("#" + n);
  }, x.prototype.pickerEvents = function () {
    var e = this,
        o = e.config,
        t = e.elemColorBox.find("." + c),
        r = e.elemPicker.find("." + p + " input"),
        a = {
      clear: function clear(i) {
        t[0].style.background = "", e.elemColorBox.find("." + s).removeClass(n).addClass(l), e.color = "", o.done && o.done(""), e.removePicker();
      },
      confirm: function confirm(i, c) {
        var a = r.val(),
            f = a,
            d = {};

        if (a.indexOf(",") > -1) {
          if (d = g(b(a)), e.select(d.h, d.s, d.b), t[0].style.background = f = "#" + m(d), (a.match(/[0-9]{1,3}/g) || []).length > 3 && "rgba" === t.attr("lay-type")) {
            var h = 280 * a.slice(a.lastIndexOf(",") + 1, a.length - 1);
            e.elemPicker.find("." + u).css("left", h), t[0].style.background = a, f = a;
          }
        } else d = function (e) {
          if (3 == (e = e.indexOf("#") > -1 ? e.substring(1) : e).length) {
            var i = e.split("");
            e = i[0] + i[0] + i[1] + i[1] + i[2] + i[2];
          }

          e = parseInt(e, 16);
          return g({
            r: e >> 16,
            g: (65280 & e) >> 8,
            b: 255 & e
          });
        }(a), t[0].style.background = f = "#" + m(d), e.elemColorBox.find("." + s).removeClass(l).addClass(n);

        if ("change" === c) return e.select(d.h, d.s, d.b, c), void (o.change && o.change(f));
        e.color = a, o.done && o.done(a), e.removePicker();
      }
    };
    e.elemPicker.on("click", "*[colorpicker-events]", function () {
      var e = i(this),
          o = e.attr("colorpicker-events");
      a[o] && a[o].call(this, e);
    }), r.on("keyup", function (e) {
      var o = i(this);
      a.confirm.call(this, o, 13 === e.keyCode ? null : "change");
    });
  }, x.prototype.events = function () {
    var e = this,
        o = e.config,
        a = e.elemColorBox.find("." + c);
    e.elemColorBox.on("click", function () {
      e.renderPicker(), i(r)[0] && (e.val(), e.side());
    }), o.elem[0] && !e.elemColorBox[0].eventHandler && (y.on("click", function (o) {
      if (!i(o.target).hasClass(t) && !i(o.target).parents("." + t)[0] && !i(o.target).hasClass(r.replace(/\./g, "")) && !i(o.target).parents(r)[0] && e.elemPicker) {
        if (e.color) {
          var c = g(b(e.color));
          e.select(c.h, c.s, c.b);
        } else e.elemColorBox.find("." + s).removeClass(n).addClass(l);

        a[0].style.background = e.color || "", e.removePicker();
      }
    }), k.on("resize", function () {
      if (!e.elemPicker || !i(r)[0]) return !1;
      e.position();
    }), e.elemColorBox[0].eventHandler = !0);
  }, o.render = function (e) {
    var i = new x(e);
    return function () {
      return {
        config: this.config
      };
    }.call(i);
  }, e("colorpicker", o);
});