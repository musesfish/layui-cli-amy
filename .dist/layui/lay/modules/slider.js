"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/** layui-v2.4.3 MIT License By https://www.layui.com */
;
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