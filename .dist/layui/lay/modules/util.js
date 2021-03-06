"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/** layui-v2.4.3 MIT License By https://www.layui.com */
;
layui.define("jquery", function (t) {
  "use strict";

  var e = layui.$,
      i = {
    fixbar: function fixbar(t) {
      var i,
          a,
          n = e(document),
          r = e("body");
      (t = e.extend({
        showHeight: 200
      }, t)).bar1 = !0 === t.bar1 ? "&#xe606;" : t.bar1, t.bar2 = !0 === t.bar2 ? "&#xe607;" : t.bar2, t.bgcolor = t.bgcolor ? "background-color:" + t.bgcolor : "";

      var o = [t.bar1, t.bar2, "&#xe604;"],
          l = e(['<ul class="layui-fixbar">', t.bar1 ? '<li class="layui-icon" lay-type="bar1" style="' + t.bgcolor + '">' + o[0] + "</li>" : "", t.bar2 ? '<li class="layui-icon" lay-type="bar2" style="' + t.bgcolor + '">' + o[1] + "</li>" : "", '<li class="layui-icon layui-fixbar-top" lay-type="top" style="' + t.bgcolor + '">' + o[2] + "</li>", "</ul>"].join("")),
          c = l.find(".layui-fixbar-top"),
          s = function s() {
        n.scrollTop() >= t.showHeight ? i || (c.show(), i = 1) : i && (c.hide(), i = 0);
      };

      e(".layui-fixbar")[0] || ("object" == _typeof(t.css) && l.css(t.css), r.append(l), s(), l.find("li").on("click", function () {
        var i = e(this).attr("lay-type");
        "top" === i && e("html,body").animate({
          scrollTop: 0
        }, 200), t.click && t.click.call(this, i);
      }), n.on("scroll", function () {
        clearTimeout(a), a = setTimeout(function () {
          s();
        }, 100);
      }));
    },
    countdown: function countdown(t, e, i) {
      var a = this,
          n = "function" == typeof e,
          r = new Date(t).getTime(),
          o = new Date(!e || n ? new Date().getTime() : e).getTime(),
          l = r - o,
          c = [Math.floor(l / 864e5), Math.floor(l / 36e5) % 24, Math.floor(l / 6e4) % 60, Math.floor(l / 1e3) % 60];
      n && (i = e);
      var s = setTimeout(function () {
        a.countdown(t, o + 1e3, i);
      }, 1e3);
      return i && i(l > 0 ? c : [0, 0, 0, 0], e, s), l <= 0 && clearTimeout(s), s;
    },
    timeAgo: function timeAgo(t, e) {
      var i = [[], []],
          a = new Date().getTime() - new Date(t).getTime();
      return a > 6912e5 ? (a = new Date(t), i[0][0] = this.digit(a.getFullYear(), 4), i[0][1] = this.digit(a.getMonth() + 1), i[0][2] = this.digit(a.getDate()), e || (i[1][0] = this.digit(a.getHours()), i[1][1] = this.digit(a.getMinutes()), i[1][2] = this.digit(a.getSeconds())), i[0].join("-") + " " + i[1].join(":")) : a >= 864e5 ? (a / 1e3 / 60 / 60 / 24 | 0) + "??????" : a >= 36e5 ? (a / 1e3 / 60 / 60 | 0) + "?????????" : a >= 12e4 ? (a / 1e3 / 60 | 0) + "?????????" : a < 0 ? "??????" : "??????";
    },
    digit: function digit(t, e) {
      var i = "";
      t = String(t), e = e || 2;

      for (var a = t.length; a < e; a++) {
        i += "0";
      }

      return t < Math.pow(10, e) ? i + (0 | t) : t;
    },
    toDateString: function toDateString(t, e) {
      var i = new Date(t || new Date()),
          a = [this.digit(i.getFullYear(), 4), this.digit(i.getMonth() + 1), this.digit(i.getDate())],
          n = [this.digit(i.getHours()), this.digit(i.getMinutes()), this.digit(i.getSeconds())];
      return (e = e || "yyyy-MM-dd HH:mm:ss").replace(/yyyy/g, a[0]).replace(/MM/g, a[1]).replace(/dd/g, a[2]).replace(/HH/g, n[0]).replace(/mm/g, n[1]).replace(/ss/g, n[2]);
    },
    escape: function escape(t) {
      return String(t || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    }
  };
  !function (t, e, i) {
    "$:nomunge";

    var a,
        n = t([]),
        r = t.resize = t.extend(t.resize, {}),
        o = "setTimeout",
        l = "resize",
        c = l + "-special-event",
        s = "delay",
        g = "throttleWindow";
    r[s] = 250, r[g] = !0, t.event.special[l] = {
      setup: function setup() {
        if (!r[g] && this[o]) return !1;
        var i = t(this);
        n = n.add(i), t.data(this, c, {
          w: i.width(),
          h: i.height()
        }), 1 === n.length && function i() {
          a = e[o](function () {
            n.each(function () {
              var e = t(this),
                  i = e.width(),
                  a = e.height(),
                  n = t.data(this, c);
              (i !== n.w || a !== n.h) && e.trigger(l, [n.w = i, n.h = a]);
            }), i();
          }, r[s]);
        }();
      },
      teardown: function teardown() {
        if (!r[g] && this[o]) return !1;
        var e = t(this);
        n = n.not(e), e.removeData(c), n.length || clearTimeout(a);
      },
      add: function add(e) {
        function a(e, a, r) {
          var o = t(this),
              l = t.data(this, c) || {};
          l.w = a !== i ? a : o.width(), l.h = r !== i ? r : o.height(), n.apply(this, arguments);
        }

        if (!r[g] && this[o]) return !1;
        var n;
        return t.isFunction(e) ? (n = e, a) : (n = e.handler, void (e.handler = a));
      }
    };
  }(e, window), t("util", i);
});