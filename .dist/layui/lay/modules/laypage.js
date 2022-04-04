"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/** layui-v2.4.3 MIT License By https://www.layui.com */
;
layui.define(function (a) {
  "use strict";

  var e = document,
      t = "getElementById",
      i = "getElementsByTagName",
      n = function n(a) {
    this.config = a || {}, this.config.index = ++r.index, this.render(!0);
  };

  n.prototype.type = function () {
    var a = this.config;
    if ("object" == _typeof(a.elem)) return void 0 === a.elem.length ? 2 : 3;
  }, n.prototype.view = function () {
    var a = this.config,
        e = a.groups = "groups" in a ? 0 | a.groups : 5;
    a.layout = "object" == _typeof(a.layout) ? a.layout : ["prev", "page", "next"], a.count = 0 | a.count, a.curr = 0 | a.curr || 1, a.limits = "object" == _typeof(a.limits) ? a.limits : [10, 20, 30, 40, 50], a.limit = 0 | a.limit || 10, a.pages = Math.ceil(a.count / a.limit) || 1, a.curr > a.pages && (a.curr = a.pages), e < 0 ? e = 1 : e > a.pages && (e = a.pages), a.prev = "prev" in a ? a.prev : "&#x4E0A;&#x4E00;&#x9875;", a.next = "next" in a ? a.next : "&#x4E0B;&#x4E00;&#x9875;";
    var t = a.pages > e ? Math.ceil((a.curr + (e > 1 ? 1 : 0)) / (e > 0 ? e : 1)) : 1,
        i = {
      prev: a.prev ? '<a href="javascript:;" class="layui-laypage-prev' + (1 == a.curr ? " layui-disabled" : "") + '" data-page="' + (a.curr - 1) + '">' + a.prev + "</a>" : "",
      page: function () {
        var i = [];
        if (a.count < 1) return "";
        t > 1 && !1 !== a.first && 0 !== e && i.push('<a href="javascript:;" class="layui-laypage-first" data-page="1"  title="&#x9996;&#x9875;">' + (a.first || 1) + "</a>");
        var n = Math.floor((e - 1) / 2),
            r = t > 1 ? a.curr - n : 1,
            s = t > 1 ? function () {
          var t = a.curr + (e - n - 1);
          return t > a.pages ? a.pages : t;
        }() : e;

        for (s - r < e - 1 && (r = s - e + 1), !1 !== a.first && r > 2 && i.push('<span class="layui-laypage-spr">&#x2026;</span>'); r <= s; r++) {
          r === a.curr ? i.push('<span class="layui-laypage-curr"><em class="layui-laypage-em" ' + (/^#/.test(a.theme) ? 'style="background-color:' + a.theme + ';"' : "") + "></em><em>" + r + "</em></span>") : i.push('<a href="javascript:;" data-page="' + r + '">' + r + "</a>");
        }

        return a.pages > e && a.pages > s && !1 !== a.last && (s + 1 < a.pages && i.push('<span class="layui-laypage-spr">&#x2026;</span>'), 0 !== e && i.push('<a href="javascript:;" class="layui-laypage-last" title="&#x5C3E;&#x9875;"  data-page="' + a.pages + '">' + (a.last || a.pages) + "</a>")), i.join("");
      }(),
      next: a.next ? '<a href="javascript:;" class="layui-laypage-next' + (a.curr == a.pages ? " layui-disabled" : "") + '" data-page="' + (a.curr + 1) + '">' + a.next + "</a>" : "",
      count: '<span class="layui-laypage-count">共 ' + a.count + " 条</span>",
      limit: function () {
        var e = ['<span class="layui-laypage-limits"><select lay-ignore>'];
        return layui.each(a.limits, function (t, i) {
          e.push('<option value="' + i + '"' + (i === a.limit ? "selected" : "") + ">" + i + " 条/页</option>");
        }), e.join("") + "</select></span>";
      }(),
      refresh: ['<a href="javascript:;" data-page="' + a.curr + '" class="layui-laypage-refresh">', '<i class="layui-icon layui-icon-refresh"></i>', "</a>"].join(""),
      skip: ['<span class="layui-laypage-skip">&#x5230;&#x7B2C;', '<input type="text" min="1" value="' + a.curr + '" class="layui-input">', '&#x9875;<button type="button" class="layui-laypage-btn">&#x786e;&#x5b9a;</button>', "</span>"].join("")
    };
    return ['<div class="layui-box layui-laypage layui-laypage-' + (a.theme ? /^#/.test(a.theme) ? "molv" : a.theme : "default") + '" id="layui-laypage-' + a.index + '">', function () {
      var e = [];
      return layui.each(a.layout, function (a, t) {
        i[t] && e.push(i[t]);
      }), e.join("");
    }(), "</div>"].join("");
  }, n.prototype.jump = function (a, e) {
    if (a) {
      var t = this,
          n = t.config,
          s = a.children,
          u = a[i]("button")[0],
          l = a[i]("input")[0],
          p = a[i]("select")[0],
          c = function c() {
        var a = 0 | l.value.replace(/\s|\D/g, "");
        a && (n.curr = a, t.render());
      };

      if (e) return c();

      for (var o = 0, y = s.length; o < y; o++) {
        "a" === s[o].nodeName.toLowerCase() && r.on(s[o], "click", function () {
          var a = 0 | this.getAttribute("data-page");
          a < 1 || a > n.pages || (n.curr = a, t.render());
        });
      }

      p && r.on(p, "change", function () {
        var a = this.value;
        n.curr * a > n.count && (n.curr = Math.ceil(n.count / a)), n.limit = a, t.render();
      }), u && r.on(u, "click", function () {
        c();
      });
    }
  }, n.prototype.skip = function (a) {
    if (a) {
      var e = this,
          t = a[i]("input")[0];
      t && r.on(t, "keyup", function (t) {
        var i = this.value,
            n = t.keyCode;
        /^(37|38|39|40)$/.test(n) || (/\D/.test(i) && (this.value = i.replace(/\D/, "")), 13 === n && e.jump(a, !0));
      });
    }
  }, n.prototype.render = function (a) {
    var i = this.config,
        n = this.type(),
        r = this.view();
    2 === n ? i.elem && (i.elem.innerHTML = r) : 3 === n ? i.elem.html(r) : e[t](i.elem) && (e[t](i.elem).innerHTML = r), i.jump && i.jump(i, a);
    var s = e[t]("layui-laypage-" + i.index);
    this.jump(s), i.hash && !a && (location.hash = "!" + i.hash + "=" + i.curr), this.skip(s);
  };
  var r = {
    render: function render(a) {
      return new n(a).index;
    },
    index: layui.laypage ? layui.laypage.index + 1e4 : 0,
    on: function on(a, e, t) {
      return a.attachEvent ? a.attachEvent("on" + e, function (e) {
        e.target = e.srcElement, t.call(a, e);
      }) : a.addEventListener(e, t, !1), this;
    }
  };
  a("laypage", r);
});