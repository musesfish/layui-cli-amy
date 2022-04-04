/** layuiAdmin-v1.0.0-beta6 LPPL License By http://www.layui.com/admin/ */
; layui.extend({
    setter: "config",
    admin: "lib/admin",
    view: "lib/view",
    store: 'controller/store',
    api: "controller/api",
    ajax: "controller/ajax",
    /* 定义模块别名 */
    UserMessage: 'user/message/index',
})
    .define(["jquery", "setter", "admin", 'api', 'store', 'view', 'ajax'], function (e) {
        document.addEventListener('visibilitychange', function () {
            const visible = document.visibilityState;
            if (visible === 'visible') {
                var userId = layui.store.get(layui.setter.tableName)?.userId;
                if (!userId) {
                    window.location.hash = "/user/login"
                } else {
                    if (top.location.hash.indexOf("/user/login") === 1) window.location.hash = "/";
                }
            }
        })

        var $ = layui.jquery,
            a = layui.setter,
            n = layui.element,
            i = layui.admin,
            t = i.tabsPage,
            l = layui.view,
            o = function () {
                var e = layui.router(),
                    r = e.path,
                    y = i.correctRouter(e.path.join("/"));
                r.length || (r = [""]), "" === r[r.length - 1] && (r[r.length - 1] = a.entry);
                var h = function (e) {
                    o.haveInit && layer.closeAll(), o.haveInit = !0, s(d).scrollTop(0), delete t.type
                };
                // 主动触发resize处理表格不能自适应宽度
                $(window).trigger('resize');
                return "tab" === t.type && ("/" !== y || "/" === y && i.tabsBody().html()) ? (i.tabsBodyChange(t.index), h(t.type)) : (l().render(r.join("/")).then(function (l) {
                    var o, r = s("#LAY_app_tabsheader>li");
                    r.each(function (e) {
                        var a = s(this), n = a.attr("lay-id");
                        n === y && (o = !0, t.index = e)
                    }), a.pageTabs && "/" !== y && (o || (s(d).append('<div class="layadmin-tabsbody-item layui-show"></div>'), t.index = r.length, n.tabAdd(u, {
                        title: "<span>" + (l.title || "新标签页") + "</span>",
                        id: y,
                        attr: e.href
                    }))), this.container = i.tabsBody(t.index), n.tabChange(u, y), i.tabsBodyChange(t.index)
                })
                    .done(function () {
                        $(".layadmin-tabsbody-item.layui-show").addClass('layui-first');
                        layui.use("common", layui.cache.callback.common), c.on("resize", layui.data.resize), n.render("breadcrumb", "breadcrumb"), i.tabsBody(t.index).on("scroll", function () {
                            var e = s(this), a = s(".layui-laydate"), n = s(".layui-layer")[0];
                            a[0] && (a.each(function () {
                                var e = s(this);
                                e.hasClass("layui-laydate-static") || e.remove()
                            }), e.find("input").blur()), n && layer.closeAll("tips")
                        })
                    }), void h())
            },
            r = function (e) {
                var n, t = layui.router(), r = l(a.container), d = i.correctRouter(t.path.join("/"));
                if (layui.each(a.indPage, function (e, a) {
                    if (d === a) return n = !0
                }), layui.config({ base: a.base + "controller/" }), n || "/user/login" === d) r.render(t.path.join("/")).done(function () {
                    i.pageType = "alone";
                }); else {
                    if (a.interceptor) {
                        var u = layui.data(a.tableName);
                        if (!u[a.request.tokenName]) return location.hash = "/user/login/redirect=" + encodeURIComponent(d)
                    }
                    "console" === i.pageType ? o() : r.render("layout").done(function () {
                        o(), layui.element.render(), i.screen() < 2 && i.sideFlexible(), i.pageType = "console"
                    })
                }
            },
            d = "#LAY_app_body",
            u = "layadmin-layout-tabs",
            s = layui.$,
            c = s(window);

        // 获取焦点添加删除键
        $(document).on("focus", ".form-ss-bord .layui-input", function () {
            $(".layadmin-tabsbody-item.layui-show").removeClass('layui-first');// 优化 新tab默认样式
            $("input[type=text]").addClass("bor-no"); 
            var str = '<img class="shanchu" style="width: 15px; height: 15px;position: absolute;right: 10px;top: 12px;" src="../../../static/images/cls3.png" alt="">'
            if ($(this).parent().find('.layui-unselect').length == 0 && $(this).parent().find('.j-sel-tree').length == 0) {
                $(this).parent().append(str);
            }
        })

        // 失去焦点撤销删除键
        $(document).on("blur", ".layui-input", function () {
            $("input[type=text]").removeClass("bor-no");
            setTimeout(() => {
                $(this).parent().find('.shanchu').remove()
            }, 200);
        })

        // 点击删除键清除文本框
        $(document).on("click", ".shanchu", function () {
            $(this).parent().find('input').val(''); 
        })

        // 优化 新tab默认样式
        $(document).on("click", ".layui-tab-brief .layui-tab-title", function () {
            if(!$(this).parent().hasClass("layui-tab-special")){
                $(".layadmin-tabsbody-item.layui-show").removeClass('layui-first');
            }else{
                $(this).addClass("layui-tab-special-light");
            }
        })

        // 弹窗里面的放大缩小按钮 smy211023
        $(document).on("click", ".layui-layer-max,.layui-layer-maxmin", function () {
            $(".layui-layer.layui-layer-iframe.layer-theme-default").css('overflow','hidden');
        })

        $(document).on('click', ".j-set-apis", function(){
            layer.prompt({
                title: '设置请求接口',
                value: layui.api.apis||'',
            }, function(val, index) {
                if (val) {
                    var key = layui.setter.runServeType;
                    layui.setter[key].apis = val;
                    layui.api.apis = val;
                    sessionStorage.setItem('apis', val)
                    layer.msg(`api: ${val}`, function(){
                        location.reload();
                        layer.close(index);
                    })
                }
            } )
        })

        // 配置全局layer默认内容
        layer.config({
            title: '温馨提示'
        })

        layui.link(a.base + "style/admin.css?v=" + (i.v + "-1"), function () {
            r();
        }, "layuiAdmin");
        window.onhashchange = function () {
            r();
            layui.event.call(this, a.MOD_NAME, "hash({*})", layui.router());
        };
        layui.each(a.extend, function (e, n) {
            var i = {};
            i[n] = "{/}" + a.base + "lib/extend/" + n;
            layui.extend(i);
        });
        e("index", { render: o });
    });
