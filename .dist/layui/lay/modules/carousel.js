"use strict";

/** layui-v2.4.3 MIT License By https://www.layui.com */
;
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