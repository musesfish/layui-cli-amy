/** layui-v2.4.3 MIT License By https://www.layui.com */ ;
layui.define("jquery", function(t) {
    "use strict";
    var a = layui.$,
        i = (layui.hint(), layui.device()),
        e = "element",
        l = "layui-this",
        n = "layui-show",
        s = function() { this.config = {} };
    s.prototype.set = function(t) { return a.extend(!0, this.config, t), this }, s.prototype.on = function(t, a) { return layui.onevent.call(this, e, t, a) }, s.prototype.tabAdd = function(t, i) {
        var e = a(".layui-tab[lay-filter=" + t + "]"),
            l = e.children(".layui-tab-title"),
            n = l.children(".layui-tab-bar"),
            s = e.children(".layui-tab-content"),
            o = '<li lay-id="' + (i.id || "") + '"' + (i.attr ? ' lay-attr="' + i.attr + '"' : "") + ">" + (i.title || "unnaming") + "</li>";
        return n[0] ? n.before(o) : l.append(o), s.append('<div class="layui-tab-item">' + (i.content || "") + "</div>"), d.hideTabMore(!0), d.tabAuto(), this
    }, s.prototype.tabDelete = function(t, i) { var e = a(".layui-tab[lay-filter=" + t + "]").children(".layui-tab-title").find('>li[lay-id="' + i + '"]'); return d.tabDelete(null, e), this }, s.prototype.tabChange = function(t, i) { var e = a(".layui-tab[lay-filter=" + t + "]").children(".layui-tab-title").find('>li[lay-id="' + i + '"]'); return d.tabClick.call(e[0], null, null, e), this }, s.prototype.tab = function(t) {
        t = t || {}, f.on("click", t.headerElem, function(i) {
            var e = a(this).index();
            d.tabClick.call(this, i, e, null, t)
        })
    }, s.prototype.progress = function(t, i) {
        var e = "layui-progress",
            l = a("." + e + "[lay-filter=" + t + "]").find("." + e + "-bar"),
            n = l.find("." + e + "-text");
        return l.css("width", i), n.text(i), this
    };
    var o = "layui-nav-item",
        r = "layui-nav-tree",
        c = "layui-nav-child",
        u = "layui-nav-more",
        y = "layui-anim layui-anim-upbit",
        d = {
            tabClick: function(t, i, s, o) {
                o = o || {};
                var r = s || a(this),
                    c = (i = i || r.parent().children("li").index(r), o.headerElem ? r.parent() : r.parents(".layui-tab").eq(0)),
                    u = o.bodyElem ? a(o.bodyElem) : c.children(".layui-tab-content").children(".layui-tab-item"),
                    y = r.find("a"),
                    d = c.attr("lay-filter");
                "javascript:;" !== y.attr("href") && "_blank" === y.attr("target") || (r.addClass(l).siblings().removeClass(l), u.eq(i).addClass(n).siblings().removeClass(n)), layui.event.call(this, e, "tab(" + d + ")", { elem: c, index: i })
            },
            tabDelete: function(t, i) {
                var n = i || a(this).parent(),
                    s = n.index(),
                    o = n.parents(".layui-tab").eq(0),
                    r = o.children(".layui-tab-content").children(".layui-tab-item"),
                    c = o.attr("lay-filter");
                n.hasClass(l) && (n.next()[0] ? d.tabClick.call(n.next()[0], null, s + 1) : n.prev()[0] && d.tabClick.call(n.prev()[0], null, s - 1)), n.remove(), r.eq(s).remove(), setTimeout(function() { d.tabAuto() }, 50), layui.event.call(this, e, "tabDelete(" + c + ")", { elem: o, index: s })
            },
            tabAuto: function() {
                var t = this;
                a(".layui-tab").each(function() {
                    var e = a(this),
                        l = e.children(".layui-tab-title"),
                        n = (e.children(".layui-tab-content").children(".layui-tab-item"), 'lay-stope="tabmore"'),
                        s = a('<span class="layui-unselect layui-tab-bar" ' + n + "><i " + n + ' class="layui-icon">&#xe61a;</i></span>');
                    if (t === window && 8 != i.ie && d.hideTabMore(!0), e.attr("lay-allowClose") && l.find("li").each(function() {
                            var t = a(this);
                            if (!t.find(".layui-tab-close")[0]) {
                                var i = a('<i class="layui-icon layui-unselect layui-tab-close">&#x1006;</i>');
                                i.on("click", d.tabDelete), t.append(i)
                            }
                        }), "string" != typeof e.attr("lay-unauto"))
                        if (l.prop("scrollWidth") > l.outerWidth() + 1) {
                            if (l.find(".layui-tab-bar")[0]) return;
                            l.append(s), e.attr("overflow", ""), s.on("click", function(t) { l[this.title ? "removeClass" : "addClass"]("layui-tab-more"), this.title = this.title ? "" : "收缩" })
                        } else l.find(".layui-tab-bar").remove(), e.removeAttr("overflow")
                })
            },
            hideTabMore: function(t) { var i = a(".layui-tab-title");!0 !== t && "tabmore" === a(t.target).attr("lay-stope") || (i.removeClass("layui-tab-more"), i.find(".layui-tab-bar").attr("title", "")) },
            clickThis: function() {
                var t = a(this),
                    i = t.parents(".layui-nav"),
                    n = i.attr("lay-filter"),
                    s = t.parent(),
                    u = t.siblings("." + c),
                    d = "string" == typeof s.attr("lay-unselect");
                "javascript:;" !== t.attr("href") && "_blank" === t.attr("target") || d || u[0] || (i.find("." + l).removeClass(l), s.addClass(l)), i.hasClass(r) && (u.removeClass(y), u[0] && (s["none" === u.css("display") ? "addClass" : "removeClass"](o + "ed"), "all" === i.attr("lay-shrink") && s.siblings().removeClass(o + "ed"))), layui.event.call(this, e, "nav(" + n + ")", t)
            },
            collapse: function() {
                var t = a(this),
                    i = t.find(".layui-colla-icon"),
                    l = t.siblings(".layui-colla-content"),
                    s = t.parents(".layui-collapse").eq(0),
                    o = s.attr("lay-filter"),
                    r = "none" === l.css("display");
                if ("string" == typeof s.attr("lay-accordion")) {
                    var c = s.children(".layui-colla-item").children("." + n);
                    c.siblings(".layui-colla-title").children(".layui-colla-icon").html("&#xe602;"), c.removeClass(n)
                }
                l[r ? "addClass" : "removeClass"](n), i.html(r ? "&#xe61a;" : "&#xe602;"), layui.event.call(this, e, "collapse(" + o + ")", { title: t, content: l, show: r })
            }
        };
    s.prototype.init = function(t, e) {
        var l = e ? '[lay-filter="' + e + '"]' : "",
            s = {
                tab: function() { d.tabAuto.call({}) },
                nav: function() {
                    var t = {},
                        e = {},
                        s = {};
                    a(".layui-nav" + l).each(function(l) {
                        var h = a(this),
                            f = a('<span class="layui-nav-bar"></span>'),
                            p = h.find("." + o);
                        h.find(".layui-nav-bar")[0] || (h.append(f), 
                            //smy
                            // p.on("mouseenter", function() { 
                            p.on("click",function(){if(!h.find("." + c).hasClass(n)){
                            (function(l, o, d) {
                                var h = a(this),
                                    f = h.find("." + c);
                                o.hasClass(r) ? l.css({ top: h.position().top, height: h.children("a").outerHeight(), opacity: 1 }) : (f.addClass(y), l.css({ left: h.position().left + parseFloat(h.css("marginLeft")), top: h.position().top + h.height() - l.height() }), t[d] = setTimeout(function() { l.css({ width: h.width(), opacity: 1 }) }, i.ie && i.ie < 10 ? 0 : 200), clearTimeout(s[d]), "block" === f.css("display") && clearTimeout(e[d]), e[d] = setTimeout(function() { f.addClass(n), h.find("." + u).addClass(u + "d") }, 300))
                            }).call(this, f, h, l)}
                            //smy
                            // ）
                            else{clearTimeout(e[l]), e[l] = setTimeout(function () { h.find("." + c).removeClass(n), h.find("." + u).removeClass(u + "d") }, 300)}}).find('dl')
                        .on("mouseleave", function() { h.hasClass(r) || (clearTimeout(e[l]), e[l] = setTimeout(function() { h.find("." + c).removeClass(n), h.find("." + u).removeClass(u + "d") }, 300)) }), h.on("mouseleave", function() { clearTimeout(t[l]), s[l] = setTimeout(function() { h.hasClass(r) ? f.css({ height: 0, top: f.position().top + f.height() / 2, opacity: 0 }) : f.css({ width: 0, left: f.position().left + f.width() / 2, opacity: 0 }) }, 200) })), p.find("a").each(function() {
                            var t = a(this);
                            t.parent();
                            t.siblings("." + c)[0] && !t.children("." + u)[0] && t.append('<span class="' + u + '"></span>'), t.off("click", d.clickThis).on("click", d.clickThis)
                        })
                    })
                },
                breadcrumb: function() {
                    a(".layui-breadcrumb" + l).each(function() {
                        var t = a(this),
                            i = "lay-separator",
                            e = t.attr(i) || "/",
                            l = t.find("a");
                        l.next("span[" + i + "]")[0] || (l.each(function(t) { t !== l.length - 1 && a(this).after("<span " + i + ">" + e + "</span>") }), t.css("visibility", "visible"))
                    })
                },
                progress: function() {
                    a(".layui-progress" + l).each(function() {
                        var t = a(this),
                            i = t.find(".layui-progress-bar"),
                            e = i.attr("lay-percent");
                        i.css("width", /^.+\/.+$/.test(e) ? 100 * new Function("return " + e)() + "%" : e), t.attr("lay-showPercent") && setTimeout(function() { i.html('<span class="layui-progress-text">' + e + "</span>") }, 350)
                    })
                },
                collapse: function() {
                    a(".layui-collapse" + l).each(function() {
                        a(this).find(".layui-colla-item").each(function() {
                            var t = a(this),
                                i = t.find(".layui-colla-title"),
                                e = "none" === t.find(".layui-colla-content").css("display");
                            i.find(".layui-colla-icon").remove(), i.append('<i class="layui-icon layui-colla-icon">' + (e ? "&#xe602;" : "&#xe61a;") + "</i>"), i.off("click", d.collapse).on("click", d.collapse)
                        })
                    })
                }
            };
        return s[t] ? s[t]() : layui.each(s, function(t, a) { a() })
    }, s.prototype.render = s.prototype.init;
    var h = new s,
        f = a(document);
    h.render();
    f.on("click", ".layui-tab-title li", d.tabClick), f.on("click", d.hideTabMore), a(window).on("resize", d.tabAuto), t(e, h)
});