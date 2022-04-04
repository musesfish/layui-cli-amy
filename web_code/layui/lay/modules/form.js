/** layui-v2.4.3 MIT License By https://www.layui.com */ ;
layui.define('layer', function(e) {
    'use strict';
    var i = layui.$,
        t = layui.layer,
        a = layui.hint(),
        n = layui.device(),
        l = '.layui-form',
        r = 'layui-this',
        s = 'layui-hide',
        o = 'layui-disabled',
        c = function() { this.config = { verify: { required: [/[\S]+/, '必填项不能为空'], phone: [/^1\d{10}$/, '请输入正确的手机号'], email: [/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, '邮箱格式不正确'], url: [/(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/, '链接格式不正确'], number: function(e) { if (!e || isNaN(e)) return '只能填写数字' }, date: [/^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/, '日期格式不正确'], identity: [/(^\d{15}$)|(^\d{17}(x|X|\d)$)/, '请输入正确的身份证号'] } } }
    c.prototype.set = function(e) { return i.extend(!0, this.config, e), this }, c.prototype.verify = function(e) { return i.extend(!0, this.config.verify, e), this }, c.prototype.on = function(e, i) { return layui.onevent.call(this, 'form', e, i) }, c.prototype.val = function(e, t) {
        i(l + '[lay-filter="' + e + '"]').each(function(e, a) {
            var n = i(this)
            layui.each(t, function(e, i) {
                var t, a = n.find('[name="' + e + '"]')
                a[0] && ('checkbox' === (t = a[0].type) ? a[0].checked = i : 'radio' === t ? a.each(function() { this.value === i && (this.checked = !0) }) : a.val(i))
            })
        }), d.render(null, e)
    }, c.prototype.render = function(e, t) {
        var n = i(l + (t ? '[lay-filter="' + t + '"]' : '')),
            c = {
                select: function() {
                    var e, t = 'layui-form-select',
                        a = 'layui-select-title',
                        l = 'layui-select-none',
                        c = '',
                        u = function(n, l) { i(n.target).parent().hasClass(a) && !l || (i('.' + t).removeClass(t + 'ed ' + t + 'up'), e && c && e.val(c)), e = null }
                    n.find('select').each(function(n, d) {
                        var f = i(this),
                            v = f.next('.' + t),
                            y = this.disabled,
                            p = d.value,
                            m = i(d.options[d.selectedIndex]),
                            k = d.options[0]
                        if ('string' == typeof f.attr('lay-ignore')) return f.show();
                        var g = 'string' == typeof f.attr('lay-search'),
                            x = k ? k.value ? '请选择' : k.innerHTML || '请选择' : '请选择',
                            b = i(['<div class="' + (g ? '' : 'layui-unselect ') + t, (y ? ' layui-select-disabled' : '') + '">', '<div class="' + a + '">', '<input type="text" placeholder="' + x + '" value="' + (p ? m.html() : '') + '"' + (g ? '' : ' readonly') + ' class="layui-input' + (g ? '' : ' layui-unselect') + (y ? ' ' + o : '') + '">', '<i class="layui-edge"></i></div>', '<dl class="layui-anim layui-anim-upbit' + (f.find('optgroup')[0] ? ' layui-select-group' : '') + '">', function(e) {
                                var i = []
                                return layui.each(e, function(e, t) {
                                    0 !== e || t.value ? 'optgroup' === t.tagName.toLowerCase() ? i.push('<dt>' + t.label + '</dt>') : i.push('<dd lay-value="' + t.value + '" class="' + (p === t.value ? r : '') + (t.disabled ? ' ' + o : '') + '">' + t.innerHTML + '</dd>') : i.push('<dd lay-value="" class="layui-select-tips">' + (t.innerHTML || '请选择') + '</dd>')
                                }), 0 === i.length && i.push('<dd lay-value="" class="' + o + '">没有选项</dd>'), i.join('')
                            }(f.find('*')) + '</dl>', '</div>'].join(''))
                        v[0] && v.remove(), f.after(b),
                            function(n, d, f) {
                                var v, y = i(this),
                                    p = n.find('.' + a),
                                    m = p.find('input'),
                                    k = n.find('dl'),
                                    g = k.children('dd'),
                                    x = this.selectedIndex
                                if (!d) {
                                    var b = function() {
                                            var e = n.offset().top + n.outerHeight() + 5 - h.scrollTop(),
                                                i = k.outerHeight()
                                            x = y[0].selectedIndex, n.addClass(t + 'ed'), g.removeClass(s), v = null, g.eq(x).addClass(r).siblings().removeClass(r), e + i > h.height() && e >= i && n.addClass(t + 'up'), w()
                                        },
                                        C = function (e) { n.removeClass(t + 'ed ' + t + 'up'), m.blur(), v = null, e || $(m.val(), function (e) { e && (c = k.find('.' + r).html(), m && k.find('.' + r).prop('lay-value') && m.val(c)) }) },
                                        w = function() {
                                            var e = k.children('dd.' + r)
                                            if (e[0]) {
                                                var i = e.position().top,
                                                    t = k.height(),
                                                    a = e.height()
                                                i > t && k.scrollTop(i + k.scrollTop() - t + a - 5), i < 0 && k.scrollTop(i + k.scrollTop() - 5)
                                            }
                                        }
                                    p.on('click', function(e) { n.hasClass(t + 'ed') ? C() : (u(e, !0), b()), k.find('.' + l).remove() }), p.find('.layui-edge').on('click', function() { m.focus() }), m.on('keyup', function(e) { 9 === e.keyCode && b() }).on('keydown', function(e) {
                                        var i = e.keyCode
                                        9 === i && C();
                                        var t = function(i, a) {
                                            var n, l
                                            e.preventDefault();
                                            var c = function() {
                                                var e = k.children('dd.' + r)
                                                if (k.children('dd.' + s)[0] && 'next' === i) {
                                                    var t = k.children('dd:not(.layui-hide,.' + o + ')'),
                                                        n = t.eq(0).index()
                                                    if (n >= 0 && n < e.index() && !t.hasClass(r)) return t.eq(0).prev()[0] ? t.eq(0).prev() : k.children(':last')
                                                }
                                                return a && a[0] ? a : v && v[0] ? v : e
                                            }()
                                            return l = c[i](), n = c[i]('dd:not(.layui-hide)'), l[0] ? (v = c[i](), n[0] && !n.hasClass(o) || !v[0] ? (n.addClass(r).siblings().removeClass(r), void w()) : t(i, v)) : v = null
                                        }
                                        38 === i && t('prev'), 40 === i && t('next'), 13 === i && (e.preventDefault(), k.children('dd.' + r).trigger('click'))
                                    });
                                    var $ = function(e, t, a) {
                                        var n = 0
                                        layui.each(g, function() {
                                            var t = i(this),
                                                l = t.text(),
                                                r = -1 === l.indexOf(e);
                                            ('' === e || 'blur' === a ? e !== l : r) && n++, 'keyup' === a && t[r ? 'addClass' : 'removeClass'](s)
                                        });
                                        var l = n === g.length
                                        return t(l), l
                                    }
                                    f && m.on('keyup', function(e) {
                                        var i = this.value,
                                            t = e.keyCode
                                        if (9 === t || 13 === t || 37 === t || 38 === t || 39 === t || 40 === t) return !1;
                                        $(i, function(e) {
                                            e ? k.find('.' + l)[0] || k.append('<p class="' + l + '">无匹配项</p>') : k.find('.' + l).remove()
                                        }, 'keyup'), '' === i && k.find('.' + l).remove(), w()
                                    }).on('blur', function(t) {
                                        var a = y[0].selectedIndex
                                        e = m, c = i(y[0].options[a]).html(), setTimeout(function() { $(m.val(), function(e) { c || m.val('') }, 'blur') }, 200)
                                    }), g.on('click', function() {
                                        var e = i(this),
                                            t = e.attr('lay-value'),
                                            a = y.attr('lay-filter');
                                        return !e.hasClass(o) && (e.hasClass('layui-select-tips') ? m.val('') : (m.val(e.text()), e.addClass(r)), e.siblings().removeClass(r), y.val(t).removeClass('layui-form-danger').trigger('change'), layui.event.call(this, 'form', 'select(' + a + ')', { elem: y[0], value: t, othis: n }), C(!0), !1)
                                    }), n.find('dl>dt').on('click', function(e) { return !1 }), i(document).off('click', u).on('click', u)
                                }
                            }.call(this, b, y, g)
                    })
                },
                checkbox: function() {
                    var e = { checkbox: ['layui-form-checkbox', 'layui-form-checked', 'checkbox'], _switch: ['layui-form-switch', 'layui-form-onswitch', 'switch'] }
                    n.find('input[type=checkbox]').each(function(t, a) {
                        var n = i(this),
                            l = n.attr('lay-skin'),
                            r = (n.attr('lay-text') || '').split('|'),
                            s = this.disabled;
                        'switch' === l && (l = '_' + l);
                        var c = e[l] || e.checkbox
                        if ('string' == typeof n.attr('lay-ignore')) return n.show();
                        var u = n.next('.' + c[0]),
                            d = i(['<div class="layui-unselect ' + c[0], a.checked ? ' ' + c[1] : '', s ? ' layui-checkbox-disbaled ' + o : '', '"', l ? ' lay-skin="' + l + '"' : '', '>', function() {
                                var e = { checkbox: [a.title.replace(/\s/g, '') ? '<span>' + a.title + '</span>' : '', '<i class="layui-icon layui-icon-ok"></i>'].join(''), _switch: '<em>' + ((a.checked ? r[0] : r[1]) || '') + '</em><i></i>' }
                                return e[l] || e.checkbox
                            }(), '</div>'].join(''))
                        u[0] && u.remove(), n.after(d),
                            function(e, t) {
                                var a = i(this)
                                e.on('click', function() {
                                    var i = a.attr('lay-filter'),
                                        n = (a.attr('lay-text') || '').split('|')
                                    a[0].disabled || (a[0].checked ? (a[0].checked = !1, e.removeClass(t[1]).find('em').text(n[1])) : (a[0].checked = !0, e.addClass(t[1]).find('em').text(n[0])), layui.event.call(a[0], 'form', t[2] + '(' + i + ')', { elem: a[0], value: a[0].value, othis: e }))
                                })
                            }.call(this, d, c)
                    })
                },
                radio: function() {
                    var e = 'layui-form-radio',
                        t = ['&#xe643;', '&#xe63f;']
                    n.find('input[type=radio]').each(function(a, n) {
                        var r = i(this),
                            s = r.next('.' + e),
                            c = this.disabled
                        if ('string' == typeof r.attr('lay-ignore')) return r.show();
                        s[0] && s.remove();
                        var u = i(['<div class="layui-unselect ' + e, n.checked ? ' ' + e + 'ed' : '', (c ? ' layui-radio-disbaled ' + o : '') + '">', '<i class="layui-anim layui-icon">' + t[n.checked ? 0 : 1] + '</i>', '<div>' + function() {
                            var e = n.title || ''
                            return 'string' == typeof r.next().attr('lay-radio') && (e = r.next().html(), r.next().remove()), e
                        }() + '</div>', '</div>'].join(''))
                        r.after(u),
                            function(a) {
                                var n = i(this),
                                    r = 'layui-anim-scaleSpring'
                                a.on('click', function() {
                                    var s = n[0].name,
                                        o = n.parents(l),
                                        c = n.attr('lay-filter'),
                                        u = o.find('input[name=' + s.replace(/(\.|#|\[|\])/g, '\\$1') + ']')
                                    n[0].disabled || (layui.each(u, function() {
                                        var a = i(this).next('.' + e)
                                        this.checked = !1, a.removeClass(e + 'ed'), a.find('.layui-icon').removeClass(r).html(t[1])
                                    }), n[0].checked = !0, a.addClass(e + 'ed'), a.find('.layui-icon').addClass(r).html(t[0]), layui.event.call(n[0], 'form', 'radio(' + c + ')', { elem: n[0], value: n[0].value, othis: a }))
                                })
                            }.call(this, u)
                    })
                }
            }
        return e ? c[e] ? c[e]() : a.error('不支持的' + e + '表单渲染') : layui.each(c, function(e, i) { i() }), this
    };
    var u = function() {
            var e = i(this),
                a = d.config.verify,
                r = null,
                s = {},
                o = e.parents(l),
                c = o.find('*[lay-verify]:not(.contact-hidden)'),
                u = e.parents('form')[0],
                f = o.find('input,select,textarea'),
                h = e.attr('lay-filter')
            if (layui.each(c, function(e, l) {
                    var s = i(this),
                        o = s.attr('lay-verify').split('|'),
                        c = s.attr('lay-verType'),
                        u = s.val()
                    if (s.removeClass('layui-form-danger'), layui.each(o, function(e, i) {
                            var o = '',
                                d = 'function' == typeof a[i]
                            if (a[i]) {
                                // HACK: form.val 赋值时出现值不存在可选列表中时 u = null, required 规则是通过空格会通过验证
                                var f = d ? o = a[i](u, l) : !a[i][0].test(u === 0? u: (u || ''))
                                if (o = o || a[i][1], f) return 'tips' === c ? t.tips(o, 'string' == typeof s.attr('lay-ignore') || 'select' !== l.tagName.toLowerCase() && !/^checkbox|radio$/.test(l.type) ? s : s.next(), { tips: 1 }) : 'alert' === c ? t.alert(o, { title: '提示', shadeClose: !0 }) : t.msg(o, { icon: 5, shift: 6 }), n.android || n.ios || l.focus(), s.addClass('layui-form-danger'), r = !0
                            }
                        }), r) return r
                }), r) return !1;
            var v = {}
            var isauth = f.parents('.auth-form-wrap');
            return layui.each(f, function(e, i) {
                if (i.name = (i.name || '').replace(/^\s*|\s*&/, ''), i.name) {
                    if (/^.*\[\]$/.test(i.name)) {
                        var t = i.name.match(/^(.*)\[\]$/g)[0]
                        v[t] = 0 | v[t], i.name = i.name.replace(/^(.*)\[\]$/, '$1[' + v[t]++ + ']')
                    }
                    /^checkbox|radio$/.test(i.type) && !i.checked || (s[i.name] = i.value)
                    if (isauth.length > 0) {
                        layui.jquery(i).parents('[class*=layui-col-]').css('display') === 'none' && (delete s[i.name])
                    }
                }
            }), layui.event.call(this, 'form', 'submit(' + h + ')', { elem: this, form: u, field: s })
        },
        d = new c,
        f = i(document),
        h = i(window)
    d.render(), f.on('reset', l, function() {
        var e = i(this).attr('lay-filter')
        setTimeout(function() { d.render(null, e) }, 50)
    }), f.on('submit', l, u).on('click', '*[lay-submit]', u), e('form', d)
})