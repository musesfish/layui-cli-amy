"use strict";

/** layui-v2.4.3 MIT License By https://www.layui.com */
;
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
      s = ["&#xe622;", "&#xe621;"],
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
      layui.stope(e), o.click(i, this);
    });
  }, a.prototype.spread = function (e, i) {
    this.options;

    var o = e.children(".layui-tree-spread"),
        t = e.children("ul"),
        a = e.children("a"),
        r = function r() {
      e.data("spread") ? (e.data("spread", null), t.removeClass("layui-show"), o.html(n[0]), a.find(".layui-icon").html(s[0])) : (e.data("spread", !0), t.addClass("layui-show"), o.html(n[1]), a.find(".layui-icon").html(s[1]));
    };

    t[0] && (o.on("click", r), a.on("click", r));
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