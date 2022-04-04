"use strict";

/** layui-v2.4.3 MIT License By https://www.layui.com */
;
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