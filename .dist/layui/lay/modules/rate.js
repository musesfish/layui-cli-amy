"use strict";

/** layui-v2.4.3 MIT License By https://www.layui.com */
;
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