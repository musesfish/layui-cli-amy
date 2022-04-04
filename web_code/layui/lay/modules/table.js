/** layui-v2.4.3 MIT License By https://www.layui.com */
; layui.define(['laytpl', 'laypage', 'layer', 'form', 'util'], function (e) {
    'use strict'; var t = layui.$, isShowCols = false, i = layui.laytpl, a = layui.laypage, l = layui.layer, n = layui.form, o = (layui.util, layui.hint()), d = layui.device(), s = { config: { checkName: 'LAY_CHECKED', indexName: 'LAY_TABLE_INDEX' }, cache: {}, index: layui.table ? layui.table.index + 1e4 : 0, set: function (e) { return this.config = t.extend({}, this.config, e), this }, on: function (e, t) { return layui.onevent.call(this, r, e, t) } }, c = function () {
        var e = this, t = e.config, i = t.id || t.index
        return i && (c.config[i] = t), { reload: function (t) { e.reload.call(e, t) }, setColsWidth: function () { e.setColsWidth.call(e) }, config: t }
    }, r = 'table', h = 'layui-hide', u = 'layui-none', y = '.layui-table-header', f = '.layui-table-body', p = '.layui-table-sort', v = 'layui-table-edit', m = function (e) { return [
        '<table cellspacing="0" cellpadding="0" border="0" class="layui-table" ', 
        '{{# if(d.data.skin){ }}lay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>', '<thead>', '{{# layui.each(d.data.cols, function(i1, item1){ }}', 
        '<tr>', 
        '{{# layui.each(item1, function(i2, item2){ }}', 
        '{{# if(item2.fixed && item2.fixed !== "right"){ left = true; } }}', 
        '{{# if(item2.fixed === "right"){ right = true; } }}', 
        (e = e || {}).fixed && 'right' !== e.fixed ? '{{# if(item2.fixed && item2.fixed !== "right"){ }}' : 'right' === e.fixed ? '{{# if(item2.fixed === "right"){ }}' : '', 
        '{{# var isSort = !(item2.colGroup) && item2.sort; }}', 
        '<th data-field="{{ item2.field||i2 }}" data-key="{{d.index}}-{{i1}}-{{i2}}" {{# if( item2.parentKey){ }}data-parentkey="{{ item2.parentKey }}"{{# } }} {{# if(item2.minWidth){ }}data-minwidth="{{item2.minWidth}}"{{# } }} {{#if(item2.colspan){}} colspan="{{item2.colspan}}"{{#} if(item2.rowspan){}} rowspan="{{item2.rowspan}}"{{#}}} {{# if(item2.unresize || item2.colGroup){ }}data-unresize="true"{{# } }} class="{{# if(item2.hide){ }}layui-hide{{# } }}{{# if(isSort){ }} layui-unselect{{# } }}{{# if(!item2.field){ }} layui-table-col-special{{# } }}">', 
        '<div class="layui-table-cell laytable-cell-', 
        '{{# if(item2.colGroup){ }}', 
        'group', 
        '{{# } else { }}', 
        '{{d.index}}-{{i1}}-{{i2}}', 
        '{{# if(item2.type !== "normal"){ }}', 
        ' laytable-cell-{{ item2.type }}', 
        '{{# } }}', 
        '{{# } }}', 
        '" {{#if(item2.align){}}align="{{item2.align}}"{{#}}}>', 
        '{{# if(item2.type === "checkbox"){ }}', 
        '<input type="checkbox" name="layTableCheckbox" lay-skin="primary" lay-filter="layTableAllChoose" {{# if(item2[d.data.checkName]){ }}checked{{# }; }}>', 
        '{{# } else if(item2.type === "colcheckbox"){ }}'+
        '<div class="col-checkbox">',
        '<input type="checkbox" name="layTableColCheckbox" title="{{item2.title||\"\"}}" data-field="{{item2.field}}" lay-filter="layTableColAllChoose" lay-skin="primary" {{# if(item2.disabled){ }}disabled{{# } }}  {{# if(item2[d.data.checkName]){ }}checked{{# }; }}>', 
        '</div>',
        '{{# } else { }}', '<span>{{item2.title||""}}</span>', 
        '{{# if(isSort){ }}', 
        '<span class="layui-table-sort layui-inline"><i class="layui-edge layui-table-sort-asc" title="升序"></i><i class="layui-edge layui-table-sort-desc" title="降序"></i></span>', '{{# } }}', '{{# } }}', '</div>', '</th>', e.fixed ? '{{# }; }}' : '', '{{# }); }}', '</tr>', '{{# }); }}', '</thead>', '</table>'].join('') }, g = ['<table cellspacing="0" cellpadding="0" border="0" class="layui-table" ', '{{# if(d.data.skin){ }}lay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>', '<tbody></tbody>', '</table>'].join(''), b = ['<div class="layui-form layui-border-box {{d.VIEW_CLASS}}" lay-filter="LAY-table-{{d.index}}" style="{{# if(d.data.width){ }}width:{{d.data.width}}px;{{# } }} {{# if(d.data.height){ }}height:{{d.data.height}}px;{{# } }}">', '{{# if(d.data.toolbar){ }}', '<div class="layui-table-tool">', '<div class="layui-table-tool-temp"></div>', '<div class="layui-table-tool-self"></div>', '</div>', '{{# } }}', '<div class="layui-table-box">', '{{# if(d.loading){ }}', '<div class="layui-table-init" style="background-color: #fff;">', '<i class="layui-icon-owndefault"></i>', '</div>', '{{# } }}', '{{# var left, right; }}', '<div class="layui-table-header">', m(), '</div>', '<div class="layui-table-body layui-table-main">', g, '</div>', '{{# if(left){ }}', '<div class="layui-table-fixed layui-table-fixed-l">', '<div class="layui-table-header">', m({ fixed: !0 }), '</div>', '<div class="layui-table-body">', g, '</div>', '</div>', '{{# }; }}', '{{# if(right){ }}', '<div class="layui-table-fixed layui-table-fixed-r">', '<div class="layui-table-header">', m({ fixed: 'right' }), '<div class="layui-table-mend"></div>', '</div>', '<div class="layui-table-body">', g, '</div>', '</div>', '{{# }; }}', '</div>', '{{# if(d.data.totalRow){ }}', '<div class="layui-table-total">', '<table cellspacing="0" cellpadding="0" border="0" class="layui-table" ', '{{# if(d.data.skin){ }}lay-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>', '<tbody><tr><td><div class="layui-table-cell" style="visibility: hidden;">Total</div></td></tr></tbody>', '</table>', '</div>', '{{# } }}', '{{# if(d.data.page){ }}', '<div class="layui-table-page">', '<div id="layui-table-page{{d.index}}"></div>', '</div>', '{{# } }}', '<style>', '{{# layui.each(d.data.cols, function(i1, item1){', 'layui.each(item1, function(i2, item2){ }}', '.laytable-cell-{{d.index}}-{{i1}}-{{i2}}{ ', '{{# if(item2.width){ }}', 'width: {{item2.width}}px;', '{{# } }}', ' }', '{{# });', '}); }}', '</style>', '</div>'].join(''), x = t(window), k = t(document), C = function (e) { this.index = ++s.index, this.config = t.extend({}, this.config, s.config, e), this.render() }
    C.prototype.config = { limit: 10, loading: !0, cellMinWidth: 120, defaultToolbar: ['filter', 'exports', 'print'], text: { none: '无数据' } }, C.prototype.render = function () {
        var e = this.config
        var config_custom= layui.data('config_custom')
        var newCols = []
        if(e.url){
            newCols = config_custom[e.url.split('?')[0].split('//')[1]] || []
        }
        var allEqual = 0
        if (newCols.length == e.cols[0].length) {
            layui.each(e.cols[0], function(i, v) {
                if (v.title !== newCols[i].title) {
                    allEqual = 1
                }
            })
            if (allEqual == 0) {
                layui.each(e.cols[0], function(i, v) {
                    v.hide = newCols[i].hide;
                })
            }
        }
        if (e.elem = t(e.elem), e.where = e.where || {}, e.id = e.id || e.elem.attr('id') || e.index, e.request = t.extend({ pageName: 'page', limitName: 'limit' }, e.request), e.response = t.extend({ statusName: 'code', statusCode: 0, msgName: 'msg', dataName: 'data', countName: 'count' }, e.response), 'object' == typeof e.page && (e.limit = e.page.limit || e.limit, e.limits = e.page.limits || e.limits, this.page = e.page.curr = e.page.curr || 1, delete e.page.elem, delete e.page.jump), !e.elem[0]) return this; e.height && /^full-\d+$/.test(e.height) && (this.fullHeightGap = e.height.split('-')[1], e.height = x.height() - this.fullHeightGap), this.setInit(); var a = e.elem, l = a.next('.layui-table-view'), n = this.elem = t(i(b).render({ VIEW_CLASS: 'layui-table-view', data: e, index: this.index }))
        if (e.index = this.index, l[0] && l.remove(), a.after(n), this.layTool = n.find('.layui-table-tool'), this.layBox = n.find('.layui-table-box'), this.layHeader = n.find(y), this.layMain = n.find('.layui-table-main'), this.layBody = n.find(f), this.layFixed = n.find('.layui-table-fixed'), this.layFixLeft = n.find('.layui-table-fixed-l'), this.layFixRight = n.find('.layui-table-fixed-r'), this.layTotal = n.find('.layui-table-total'), this.layPage = n.find('.layui-table-page'), this.renderToolbar(), this.fullSize(), e.cols.length > 1) {
            var o = this.layFixed.find(y).find('th')
            o.height(this.layHeader.height() - 1 - parseFloat(o.css('padding-top')) - parseFloat(o.css('padding-bottom')))
        } this.pullData(this.page), this.events()
    }, C.prototype.initOpts = function (e) { this.config; e.checkbox && (e.type = 'checkbox'), e.space && (e.type = 'space'), e.type || (e.type = 'normal'), 'normal' !== e.type && (e.unresize = !0, e.width = e.width || { checkbox: 48, radio: 48, space: 15, numbers: 40 }[e.type]) }, C.prototype.setInit = function (e) {
        var t = this, i = t.config
        if (i.clientWidth = i.width || function () {
            var e = function (t) {
                var a, l
                a = (t = t || i.elem.parent()).width(); try { l = 'none' === t.css('display') } catch (e) { } return !t[0] || a && !l ? a : e(t.parent())
            }
            return e()
        }(), 'width' === e) return i.clientWidth; layui.each(i.cols, function (e, a) {
            layui.each(a, function (l, n) {
                if (n) {
                    if (n.key = e + '-' + l, n.hide = n.hide || !1, n.colGroup || n.colspan > 1) {
                        var o = 0
                        layui.each(i.cols[e + 1], function (t, i) { i.HAS_PARENT || o > 1 && o == n.colspan || (i.HAS_PARENT = !0, i.parentKey = e + '-' + l, o += parseInt(i.colspan > 1 ? i.colspan : 1)) }), n.colGroup = !0
                    } t.initOpts(n)
                } else a.splice(l, 1)
            })
        })
    }, C.prototype.renderToolbar = function () {
        var e = this.config, a = ['<div class="layui-inline" lay-event="add"><i class="layui-icon layui-icon-add-1"></i></div>', '<div class="layui-inline" lay-event="update"><i class="layui-icon layui-icon-edit"></i></div>', '<div class="layui-inline" lay-event="delete"><i class="layui-icon layui-icon-delete"></i></div>'].join(''), l = this.layTool.find('.layui-table-tool-temp')
        if ('default' === e.toolbar) l.html(a)
        else if (e.toolbar) {
            var n = t(e.toolbar).html() || ''
            n && l.html(i(n).render(e))
        } var o = { filter: { title: '筛选列', layEvent: 'LAYTABLE_COLS', icon: 'layui-icon-cols' }, exports: { title: '导出', layEvent: 'LAYTABLE_EXPORT', icon: 'layui-icon-export' }, print: { title: '打印', layEvent: 'LAYTABLE_PRINT', icon: 'layui-icon-print' }, import: { query: 'u-btn-import', title: '导入', layEvent: 'LAYTABLE_IMPORT', icon: 'layui-icon-upload-drag' }, export: { title: '导出', layEvent: 'LAYTABLE_EXPORTS', icon: 'layui-icon-export' } }, d = []
        'object' == typeof e.defaultToolbar && layui.each(e.defaultToolbar, function (e, t) {
            var i = o[t]
            i && d.push('<div class="layui-inline ' + (i.query || '') + '" title="' + i.title + '" lay-event="' + i.layEvent + '"><i class="layui-icon ' + i.icon + '"></i></div>')
        }), this.layTool.find('.layui-table-tool-self').html(d.join(''))
    }, C.prototype.setParentCol = function (e, t) {
        var i = this.config, a = this.layHeader.find('th[data-key="' + i.index + '-' + t + '"]'), l = parseInt(a.attr('colspan')) || 0
        if (a[0]) {
            var n = t.split('-'), o = i.cols[n[0]][n[1]]
            e ? l-- : l++ , a.attr('colspan', l), a[l < 1 ? 'addClass' : 'removeClass'](h), o.colspan = o.colspan || l, o.hide = l < 1; var d = a.data('parentkey')
            d && this.setParentCol(e, d)
        }
    }, C.prototype.setColsPatch = function () {
        var e = this, t = e.config
        layui.each(t.cols, function (t, i) { layui.each(i, function (t, i) { i.hide && e.setParentCol(i.hide, i.parentKey) }) })
    }, C.prototype.setColsWidth = function () {
        var e = this, t = e.config, i = 0, a = 0, l = 0, n = 0, o = e.setInit('width')
        e.eachCols(function (e, t) { t.hide || i++ }), o = o - ('line' === t.skin || 'nob' === t.skin ? 2 : i + 1) - e.getScrollWidth(e.layMain[0]) - 1; var d = function (e) {
            layui.each(t.cols, function (i, d) {
                layui.each(d, function (i, s) {
                    var c = 0, r = s.minWidth || t.cellMinWidth
                    s ? s.colGroup || s.hide || (e ? l && l < r && (a-- , c = r) : (c = s.width || 0, /\d+%$/.test(c) ? (c = Math.floor(parseFloat(c) / 100 * o)) < r && (c = r) : c || (s.width = c = 0, a++)), s.hide && (c = 0), n += c) : d.splice(i, 1)
                })
            }), o > n && a && (l = (o - n) / a)
        }
        d(), d(!0), e.autoColNums = a, e.eachCols(function (i, a) {
            var n = a.minWidth || t.cellMinWidth
            a.colGroup || a.hide || (0 === a.width ? e.getCssRule(t.index + '-' + a.key, function (e) { e.style.width = Math.floor(l >= n ? l : n) + 'px' }) : /\d+%$/.test(a.width) && e.getCssRule(t.index + '-' + a.key, function (e) { e.style.width = Math.floor(parseFloat(a.width) / 100 * o) + 'px' }))
        }); var s = e.layMain.width() - e.getScrollWidth(e.layMain[0]) - e.layMain.children('table').outerWidth()
        if (e.autoColNums && s >= -i && s <= i) {
            var c = function (t) { return !(t = t || e.layHeader.eq(0).find('thead th:last-child')).data('field') && t.prev()[0] ? c(t.prev()) : t }, r = c(), h = r.data('key')
            e.getCssRule(h, function (t) {
                var i = t.style.width || r.outerWidth()
                t.style.width = parseFloat(i) + s + 'px', e.layMain.height() - e.layMain.prop('clientHeight') > 0 && (t.style.width = parseFloat(t.style.width) - 1 + 'px')
            })
        } e.loading(!0)
    }, C.prototype.reload = function (e) { this.config.data && this.config.data.constructor === Array && delete this.config.data, this.config = t.extend({}, this.config, e), this.render() }, C.prototype.page = 1, C.prototype.pullData = function (e) {
        var i = this, a = i.config, l = a.request, n = a.response, o = function () { 'object' == typeof a.initSort && i.sort(a.initSort.field, a.initSort.type) }
        if (i.startTime = (new Date).getTime(), a.url) {
            layer.load(3); var d = {}
            d[l.pageName] = e, d[l.limitName] = a.limit; var s = t.extend(d, a.where)
            a.contentType && 0 == a.contentType.indexOf('application/json') && (s = JSON.stringify(s)), t.ajax({ type: a.method || 'get', url: a.url, contentType: a.contentType, data: s, dataType: 'json', headers: a.headers || {}, success: function (t) { layer.closeAll('loading'); 'function' == typeof a.parseData && (t = a.parseData(t) || t), t[n.statusName] != n.statusCode ? (i.renderForm(), i.layMain.html('<div class="layui-none">' + (t[n.msgName] || '返回的数据不符合规范，正确的成功状态码 (' + n.statusName + ') 应为：' + n.statusCode) + '</div>')) : (i.renderData(t, e, t[n.countName]), o(), a.time = (new Date).getTime() - i.startTime + ' ms'), i.setColsWidth(), 'function' == typeof a.done && a.done(t, e, t[n.countName]) }, error: function (e, t) { layer.closeAll('loading'); i.layMain.html('<div class="layui-none">数据接口请求异常：' + t + '</div>'), i.renderForm(), i.setColsWidth() } })
        } else if (a.data && a.data.constructor === Array) {
            var c = {}, r = e * a.limit - a.limit
            c[n.dataName] = a.data.concat().splice(r, a.limit), c[n.countName] = a.data.length, i.renderData(c, e, a.data.length), o(), i.setColsWidth(), 'function' == typeof a.done && a.done(c, e, c[n.countName])
        }
    }, C.prototype.eachCols = function (e) { return s.eachCols(null, e, this.config.cols), this }, C.prototype.renderData = function (e, n, o, d) {
        var c = this, r = c.config, y = e[r.response.dataName] || [], f = [], p = [], v = [], m = function () { 
            var e
            if (!d && c.sortKey) return c.sort(c.sortKey.field, c.sortKey.sort, !0); layui.each(y, function (a, l) {
                var o = [], u = [], y = [], m = a + r.limit * (n - 1) + 1
                0 !== l.length && (d || (l[s.config.indexName] = a), c.eachCols(function (n, d) {
                    var c = d.field || n, f = r.index + '-' + d.key, p = l[c]
                    if (void 0 !== p && null !== p || (p = ''), !d.colGroup) {
                        var v = ['<td data-field="' + c + '" data-key="' + f + '" ' + function () {
                            var e = []
                            return d.edit && e.push('data-edit="' + d.edit + '"'), d.align && e.push('align="' + d.align + '"'), d.templet && e.push('data-content="' + p + '"'), d.toolbar && e.push('data-off="true"'), d.event && e.push('lay-event="' + d.event + '"'), d.style && e.push('style="' + d.style + '"'), d.minWidth && e.push('data-minwidth="' + d.minWidth + '"'), e.join(' ')
                        }() + ' class="' + function () {
                            var e = []
                            return d.hide && e.push(h), d.field || e.push('layui-table-col-special'), e.join(' ')
                        }() + '">', '<div class="layui-table-cell laytable-cell-' + ('normal' === d.type ? f : f + ' laytable-cell-' + d.type) + '">' + function () {
                            var n = t.extend(!0, { LAY_INDEX: m }, l), o = s.config.checkName
                            switch (d.type) {
                                case 'checkbox':
                                    return '<input type="checkbox" name="layTableCheckbox" lay-skin="primary" ' + (d[o] ? (l[o] = d[o], d[o] ? 'checked' : '') : n[o] ? 'checked' : '') + (('function' === typeof d.disableField? d.disableField(n): n[d.disableField])? 'disabled': '') + '>'; 
                                case 'colcheckbox':
                                    return [
                                        '<div class="col-checkbox">',
                                        '<input type="checkbox" name="layTableColCheckbox" data-field="'+ d.field +'" lay-skin="primary" title="" ' + (d.disabled||n[d.field] === 1 ?' disabled ': '') + ( n[d.field] === 1 ? 'checked' : '')  + '>',
                                        '</div>',
                                    ].join(" ");
                                case 'radio':
                                    return n[o] && (e = a), '<input type="radio" name="layTableRadio_' + r.index + '" ' + (n[o] ? 'checked' : '') + ' lay-type="layTableRadio">'; 
                                case 'numbers':
                                    return m
                            }
                            return d.toolbar ? i(t(d.toolbar).html() || '').render(n) : d.templet ? 'function' == typeof d.templet ? d.templet(n) : i(t(d.templet).html() || String(p)).render(n) : p
                        }(), '</div></td>'].join('')
                        o.push(v), d.fixed && 'right' !== d.fixed && u.push(v), 'right' === d.fixed && y.push(v)
                    }
                }), f.push('<tr data-index="' + a + '">' + o.join('') + '</tr>'), p.push('<tr data-index="' + a + '">' + u.join('') + '</tr>'), v.push('<tr data-index="' + a + '">' + y.join('') + '</tr>'))
            }), c.layBody.scrollTop(0), c.layMain.find('.' + u).remove(), c.layMain.find('tbody').html(f.join('')), c.layFixLeft.find('tbody').html(p.join('')), c.layFixRight.find('tbody').html(v.join('')), c.renderForm(), 'number' == typeof e && c.setThisRowChecked(e), c.syncCheckAll(), c.scrollPatch(), l.close(c.tipsIndex), r.HAS_SET_COLS_PATCH || c.setColsPatch(), r.HAS_SET_COLS_PATCH = !0
        }
        return c.key = r.id || r.index, s.cache[c.key] = y, c.layPage[0 == o || 0 === y.length && 1 == n ? 'addClass' : 'removeClass'](h), d ? m() : 0 === y.length ? (c.renderForm(), c.layFixed.remove(), c.layMain.find('tbody').html(''), c.layMain.find('.' + u).remove(), c.layHeader.addClass('overflow-x-auto'), c.layMain.append('<div class="layui-none">' + r.text.none + '</div>')) : (m(), c.renderTotal(y), void (r.page && (r.page = t.extend({ elem: 'layui-table-page' + r.index, count: o, limit: r.limit, limits: r.limits || [10, 20, 30, 40, 50, 60, 70, 80, 90], groups: 3, layout: ['prev', 'page', 'next', 'skip', 'count', 'limit'], prev: '<i class="layui-icon">&#xe603;</i>', next: '<i class="layui-icon">&#xe602;</i>', jump: function (e, t) { t || (c.page = e.curr, r.limit = e.limit, c.pullData(e.curr)) } }, r.page), r.page.count = o, a.render(r.page))))
    }, C.prototype.renderTotal = function (e) {
        var t = this, i = t.config, a = {}
        if (i.totalRow) {
            layui.each(e, function (e, i) {
            0 !== i.length && t.eachCols(function (e, t) {
                var l = t.field || e, n = i[l]
                t.totalRow && (a[l] = (a[l] || 0) + (parseFloat(n) || 0))
            })
            }); var l = []
            t.eachCols(function (e, t) {
                var n = t.field || e
                if (!t.hide) {
                    var o = ['<td data-field="' + n + '" data-key="' + (i.index+'-'+t.key) + '" ' + function () {
                        var e = []
                        return t.align && e.push('align="' + t.align + '"'), t.style && e.push('style="' + t.style + '"'), t.minWidth && e.push('data-minwidth="' + t.minWidth + '"'), e.join(' ')
                    }() + '>', '<div class="layui-table-cell laytable-cell-' + function () {
                        var e = i.index + '-' + t.key
                        return 'normal' === t.type ? e : e + ' laytable-cell-' + t.type
                    }() + '">' + function () {
                        var e = t.totalRowText || ''
                        return t.totalRow ? a[n] || e : e
                    }(), '</div></td>'].join('')
                    l.push(o)
                }
            }), t.layTotal.find('tbody').html('<tr>' + l.join('') + '</tr>')
        }
    }, C.prototype.getColElem = function (e, t) {
        var i = this.config
        return e.eq(0).find('.laytable-cell-' + i.index + '-' + t + ':eq(0)')
    }, C.prototype.renderForm = function (e) { 
        n.render(e, 'LAY-table-' + this.index) 
    }, C.prototype.setThisRowChecked = function (e) { this.config; this.layBody.find('tr[data-index="' + e + '"]').addClass('layui-table-click').siblings('tr').removeClass('layui-table-click') }, C.prototype.sort = function (e, i, a, l) {
        var n, d = {}, c = this.config, h = c.elem.attr('lay-filter'), u = s.cache[this.key]
        'string' == typeof e && this.layHeader.find('th').each(function (i, a) {
            var l = t(this), n = l.data('field')
            if (n === e) return e = l, y = n, !1
        }); try {
            var y = y || e.data('field'), f = e.data('key')
            if (this.sortKey && !a && y === this.sortKey.field && i === this.sortKey.sort) return; var v = this.layHeader.find('th .laytable-cell-' + f).find(p)
            this.layHeader.find('th').find(p).removeAttr('lay-sort'), v.attr('lay-sort', i || null), this.layFixed.find('th')
        } catch (e) { return o.error('Table modules: Did not match to field') } this.sortKey = { field: y, sort: i }, 'asc' === i ? n = layui.sort(u, y) : 'desc' === i ? n = layui.sort(u, y, !0) : (n = layui.sort(u, s.config.indexName), delete this.sortKey), d[c.response.dataName] = n, this.renderData(d, this.page, this.count, !0), l && layui.event.call(e, r, 'sort(' + h + ')', { field: y, type: i })
    }, 
    C.prototype.loading = function (e) { this.config.loading && (e ? (this.layInit && this.layInit.remove(), delete this.layInit, this.layBox.find('.layui-table-init').remove()) : (this.layInit = t(['<div class="layui-table-init">', '<i class="layui-icon-owndefault"></i>', '</div>'].join('')), this.layBox.append(this.layInit))) }, 
    C.prototype.setCheckData = function (e, t, f) { 
        var i = this.config, 
            a = s.cache[this.key];
        f&&(a[e][f]=t?1:0)
        a[e] && a[e].constructor !== Array && (a[e][i.checkName] = f?true:t);
    }, 
    C.prototype.syncCheckAll = function () {
        var e = this, 
            t = e.config, 
            i = e.layHeader.find('input[name="layTableCheckbox"]'), 
            a = function (i) { 
                return e.eachCols(function (e, a) { 
                    'checkbox' === a.type && (a[t.checkName] = i) 
                }), i };  
        i[0] && (s.checkStatus(e.key).isAll ? 
        (i[0].checked || (i.prop('checked', !0), e.renderForm('checkbox')), a(!0)) 
        : 
        (i[0].checked && (i.prop('checked', !1), e.layHeader.find("input[name='layTableColCheckbox']").attr("checked", !1), e.renderForm('checkbox')), a(!1)))
    }, C.prototype.getCssRule = function (e, t) {
        var i = this.elem.find('style')[0], a = i.sheet || i.styleSheet || {}, l = a.cssRules || a.rules
        layui.each(l, function (i, a) { if (a.selectorText === '.laytable-cell-' + e) return t(a), !0 })
    }, C.prototype.fullSize = function () {
        var e, t = this.config, i = t.height
        this.fullHeightGap && ((i = x.height() - this.fullHeightGap) < 135 && (i = 135), this.elem.css('height', i)), i && (e = parseFloat(i) - (this.layHeader.outerHeight() || 38), t.toolbar && (e -= this.layTool.outerHeight() || 50), t.totalRow && (e -= this.layTotal.outerHeight() || 40), t.page && (e = e - (this.layPage.outerHeight() || 41) - 2), this.layMain.css('height', e))
    }, C.prototype.getScrollWidth = function (e) {
        var t = 0
        return e ? t = e.offsetWidth - e.clientWidth : ((e = document.createElement('div')).style.width = '100px', e.style.height = '100px', e.style.overflowY = 'scroll', document.body.appendChild(e), t = e.offsetWidth - e.clientWidth, document.body.removeChild(e)), t
    }, C.prototype.scrollPatch = function () {
        var e = this.layMain.children('table'), i = this.layMain.width() - this.layMain.prop('clientWidth'), a = this.layMain.height() - this.layMain.prop('clientHeight'), l = (this.getScrollWidth(this.layMain[0]), e.outerWidth() - this.layMain.width()), n = function (e) {
            if (i && a) {
                if (!(e = e.eq(0)).find('.layui-table-patch')[0]) {
                    var l = t('<th class="layui-table-patch"><div class="layui-table-cell"></div></th>')
                    l.find('div').css({ width: i }), e.find('tr').append(l)
                }
            } else e.find('.layui-table-patch').remove()
        }
        n(this.layHeader), n(this.layTotal); var o = this.layMain.height() - a
        this.layFixed.find(f).css('height', e.height() > o ? o : 'auto'), this.layFixRight[l > 0 ? 'removeClass' : 'addClass'](h), this.layFixRight.css('right', i - 1)
    }, C.prototype.events = function () {
        var e, a = this, o = a.config, c = t('body'), u = {}, y = a.layHeader.find('th'), m = '.layui-table-cell', g = o.elem.attr('lay-filter')
        a.layTool.on('click', '*[lay-event]', function (e) {
            /** 改变点击方式 start*/
            if (t(this).children().length == 2) {
                k.trigger('table.tool.panel.remove');
                isShowCols = false;
                return false;
            }
            /** 改变点击方式 end*/
            var i = t(this),
                c = i.attr('lay-event'),
                u = function (e) {
                    var l = t(e.list),
                        n = t('<ul class="layui-table-tool-panel"></ul>');
                    n.html(l),
                        i.find('.layui-table-tool-panel')[0] || i.append(n),
                        a.renderForm(),
                        isShowCols = true;
                    n.on('click', function (e) {
                        layui.stope(e)
                    }),
                        e.done && e.done(n, l)
                }

            switch (layui.stope(e), k.trigger('table.tool.panel.remove'), l.close(a.tipsIndex), c) {
                case 'LAYTABLE_COLS':
                    if (isShowCols) {
                        k.trigger('table.tool.panel.remove');
                        isShowCols = false;
                        return false;
                    }
                    u({
                        list: function () {
                            var e = []
                            return a.eachCols(function (t, i) {
                                i.field && 'normal' == i.type && e.push('<li><input type="checkbox" name="' + i.field + '" data-key="' + i.key + '" data-parentkey="' + (i.parentKey || '') + '" lay-skin="primary" ' + (i.hide ? '' : 'checked') + ' title="' + (i.title || i.field) + '" lay-filter="LAY_TABLE_TOOL_COLS"></li>')
                            }), e.join('')
                        }(), done: function () {
                            n.on('checkbox(LAY_TABLE_TOOL_COLS)', function (e) {
                                var i = t(e.elem), l = this.checked, n = i.data('key'), d = i.data('parentkey')
                                layui.each(o.cols, function (e, t) {
                                    layui.each(t, function (t, i) {
                                        if (e + '-' + t === n) {
                                            var s = i.hide
                                            i.hide = !l, a.elem.find('*[data-key="' + o.index + '-' + n + '"]')[l ? 'removeClass' : 'addClass'](h), s != i.hide && a.setParentCol(!l, d), a.fullSize(), a.scrollPatch(), a.setColsWidth()
                                        }
                                    })
                                })
                                var arrCols = []
                                var objCols = {}
                                layui.each(o.cols[0], function(i, v) {
                                    objCols = {}
                                    objCols.hide = v.hide
                                    objCols.title = v.title
                                    arrCols.push(objCols)
                                })
                                if(o.url){
                                    layui.data('config_custom', {
                                        key: o.url.split('?')[0].split('//')[1]
                                        ,value: arrCols
                                    });
                                }
                            })
                        }
                    });
                    ; break; case 'LAYTABLE_EXPORT':
                    d.ie ? l.tips('导出功能不支持 IE，请用 Chrome 等高级浏览器导出', this, { tips: 3 }) : u({
                        list: ['<li data-type="csv">导出到 Csv 文件</li>', '<li data-type="xls">导出到 Excel 文件</li>'].join(''), done: function (e, i) {
                            i.on('click', function () {
                                var e = t(this).data('type')
                                s.exportFile(o.id, null, e)
                            })
                        }
                    })
                    break; case 'LAYTABLE_IMPORT':

                    break; case 'LAYTABLE_PRINT':
                    var y = window.open('打印窗口', '_blank'), f = ['<style>', 'body{font-size: 12px; color: #666;}', 'table{width: 100%; border-collapse: collapse; border-spacing: 0;}', 'th,td{line-height: 20px; padding: 9px 15px; border: 1px solid #ccc; text-align: left; font-size: 12px; color: #666;}', 'a{color: #666; text-decoration:none;}', '*.layui-hide{display: none}', '</style>'].join(''), p = t(a.layHeader.html())
                    p.append(a.layMain.find('table').html()), p.find('th.layui-table-patch').remove(), p.find('.layui-table-col-special').remove(), y.document.write(f + p.prop('outerHTML')), y.document.close(), y.print(), y.close()
            }layui.event.call(this, r, 'toolbar(' + g + ')', t.extend({ event: c, config: o }, {}))
        }), y.on('mousemove', function (e) {
            var i = t(this), a = i.offset().left, l = e.clientX - a
            i.data('unresize') || u.resizeStart || (u.allowResize = i.width() - l <= 10, c.css('cursor', u.allowResize ? 'col-resize' : ''))
        }).on('mouseleave', function () { t(this); u.resizeStart || c.css('cursor', '') }).on('mousedown', function (e) {
            var i = t(this)
            if (u.allowResize) {
                var l = i.data('key')
                e.preventDefault(), u.resizeStart = !0, u.offset = [e.clientX, e.clientY], a.getCssRule(l, function (e) {
                    var t = e.style.width || i.outerWidth()
                    u.rule = e, u.ruleWidth = parseFloat(t), u.minWidth = i.data('minwidth') || o.cellMinWidth
                })
            }
        }), k.on('mousemove', function (t) {
            if (u.resizeStart) {
                if (t.preventDefault(), u.rule) {
                    var i = u.ruleWidth + t.clientX - u.offset[0]
                    i < u.minWidth && (i = u.minWidth), u.rule.style.width = i + 'px', l.close(a.tipsIndex)
                } e = 1
            }
        }).on('mouseup', function (t) { u.resizeStart && (u = {}, c.css('cursor', ''), a.scrollPatch()), 2 === e && (e = null) }), y.on('click', function (i) {
            var l, n = t(this), o = n.find(p), d = o.attr('lay-sort')
            if (!o[0] || 1 === e) return e = 2; l = 'asc' === d ? 'desc' : 'desc' === d ? null : 'asc', a.sort(n, l, null, !0)
        }).find(p + ' .layui-edge ').on('click', function (e) {
            var i = t(this), l = i.index(), n = i.parents('th').eq(0).data('field')
            layui.stope(e), 0 === l ? a.sort(n, 'asc', null, !0) : a.sort(n, 'desc', null, !0)
        }); var b = function (e) {
            var l = t(this).parents('tr').eq(0).data('index'), n = a.layBody.find('tr[data-index="' + l + '"]'), o = s.cache[a.key][l]
            return t.extend({
                tr: n, data: s.clearCacheKey(o), del: function () { s.cache[a.key][l] = [], n.remove(), a.scrollPatch() }, update: function (e) {
                e = e || {}, layui.each(e, function (e, l) {
                    if (e in o) {
                        var d, s = n.children('td[data-field="' + e + '"]')
                        o[e] = l, a.eachCols(function (t, i) { i.field == e && i.templet && (d = i.templet) }), s.children(m).html(d ? 'function' == typeof d ? d(o) : i(t(d).html() || l).render(o) : l), s.data('content', l)
                    }
                })
                }
            }, e)
        }
        a.elem.on('click', 'input[name="layTableCheckbox"]+', function () {
            var e = t(this).prev(), 
                i = a.layBody.find('input[name="layTableCheckbox"]'), 
                c = a.layBody.find('input[name="layTableColCheckbox"]'),
                l = e.parents('tr').eq(0).data('index'), n = e[0].checked, o = 'layTableAllChoose' === e.attr('lay-filter'),
                tr = a.layBody.find("tr").eq(l).find('input[name="layTableColCheckbox"]');
            o ? (
                i.each(function (e, t) {
                    !t.disabled &&
                    (t.checked = n, 
                    a.setCheckData(e,n))
                }), 
                !n?(c.each(function(e,t){
                    !t.disabled && (t.checked = n),
                    a.setCheckData(e,n)
                })):null,
                a.syncCheckAll(), 
                a.renderForm('checkbox')) 
            : 
            (
                a.setCheckData(l, n),
                !n&&tr.each(function(e,t){
                    !t.disabled && (t.checked = n)
                }),
                a.syncCheckAll(),
                a.renderForm('checkbox')
            );
                layui.event.call(this, r, 'checkbox(' + g + ')', 
                b.call(this, { checked: n, type: o ? 'all' : 'one' })
            )
        }), 
        a.elem.on('click', 'input[name="layTableColCheckbox"]+', function(){ 
            var e = t(this).prev(),
            p = a.layBody.find('input[name="layTableCheckbox"]'),
            i = a.layBody.find('input[name="layTableColCheckbox"]'),
            h = a.layHeader.find('input[name="layTableColCheckbox"]'),
            k = e.data().field,
            l = e.parents('tr').eq(0).data('index'), 
            n = e[0].checked, 
            o = 'layTableColAllChoose' === e.attr('lay-filter'),
            _sel = true,
            _f = a.elem.find(".layui-table-fixed-l").length;
            if(e[0].disabled) return; 
            o ? (i.each(function (e, d) { 
                    if(d.dataset.field === k && !d.disabled ){
                        d.checked = n
                        a.setCheckData(t(d).parents('tr').eq(0).data('index'), n, k)
                    }
                }), 
                n && p.each(function (e, d) { 
                    d.checked = n
                    a.setCheckData(e, n)
                    a.syncCheckAll()
                }),
                a.renderForm('checkbox')
                )
            : 
            (
                a.setCheckData(l, n, k),
                n && ( p[l].checked = n ),
                n && _f && ( p[l+p.length/2].checked = n ),
                i.each(function(e,d){
                    if(d.dataset.field === k && !d.disabled ){
                        if(!d.checked){
                            _sel = false;
                            return false;
                        }
                    }
                }),
                h.each(function(e,d){
                    if(d.dataset.field === k){
                        d.checked = _sel;  
                        return false;
                    }
                }),
                a.syncCheckAll(),
                a.renderForm('checkbox')
            )
        }),
        a.elem.on('click', 'input[lay-type="layTableRadio"]+', function () {
            var e = t(this).prev(), i = e[0].checked, l = s.cache[a.key], n = e.parents('tr').eq(0).data('index')
            layui.each(l, function (e, t) {
                n === e ? t.LAY_CHECKED = !0 : delete t.LAY_CHECKED
            }), a.setThisRowChecked(n), layui.event.call(this, r, 'radio(' + g + ')', b.call(this, { checked: i }))
        }), a.layBody.on('mouseenter', 'tr', function () {
            var e = t(this).index()
            a.layBody.find('tr:eq(' + e + ')').addClass('layui-table-hover')
        }).on('mouseleave', 'tr', function () {
            var e = t(this).index()
            a.layBody.find('tr:eq(' + e + ')').removeClass('layui-table-hover')
        }).on('click', 'tr', function () { C.call(this, 'row') }).on('dblclick', 'tr', function () { C.call(this, 'rowDouble') }); var C = function (e) {
            var i = t(this)
            layui.event.call(this, r, e + '(' + g + ')', b.call(i.children('td')[0]))
        }
        a.layBody.on('change', '.' + v, function () {
            var e = t(this), i = this.value, l = e.parent().data('field'), n = e.parents('tr').eq(0).data('index')
            s.cache[a.key][n][l] = i, layui.event.call(this, r, 'edit(' + g + ')', b.call(this, { value: i, field: l }))
        }).on('blur', '.' + v, function () {
            var e, l = t(this), n = l.parent().data('field'), o = l.parents('tr').eq(0).data('index'), d = s.cache[a.key][o]
            a.eachCols(function (t, i) { i.field == n && i.templet && (e = i.templet) }), l.siblings(m).html((c = this.value, e ? function () { return 'function' == typeof e ? e(d) : i(t(e).html() || this.value).render(d) }() : c)); var c
            l.parent().data('content', this.value), l.remove()
        }), a.layBody.on('click', 'td', function () {
            var e = t(this), i = (e.data('field'), e.data('edit')), a = e.children(m)
            if (!e.data('off') && i) {
                var l = t('<input class="layui-input ' + v + '">')
                return l[0].value = e.data('content') || a.text(), e.find('.' + v)[0] || e.append(l), void l.focus()
            }
        }).on('mouseenter', 'td', function () { T.call(this) }).on('mouseleave', 'td', function () { T.call(this, 'hide') }); var w = 'layui-table-grid-down', T = function (e) {
            var i = t(this), a = i.children(m)
            if (e) i.find('.layui-table-grid-down').remove()
            else if (a.prop('scrollWidth') > a.outerWidth()) { if (a.find('.' + w)[0]) return; i.append('<div class="' + w + '"><i class="layui-icon layui-icon-down"></i></div>') }
        }
        a.layBody.on('click', '.' + w, function () {
            var e = t(this).parent().children(m)
            a.tipsIndex = l.tips(['<div class="layui-table-tips-main" style="margin-top: -' + (e.height() + 16) + 'px;' + ('sm' === o.size ? 'padding: 4px 15px; font-size: 12px;' : 'lg' === o.size ? 'padding: 14px 15px;' : '') + '">', e.html(), '</div>', '<i class="layui-icon layui-table-tips-c layui-icon-close"></i>'].join(''), e[0], { tips: [3, ''], time: -1, anim: -1, maxWidth: d.ios || d.android ? 300 : a.elem.width() / 2, isOutAnim: !1, skin: 'layui-table-tips', success: function (e, t) { e.find('.layui-table-tips-c').on('click', function () { l.close(t) }) } })
        }), a.layBody.on('click', '*[lay-event]', function () {
            var e = t(this), i = e.parents('tr').eq(0).data('index')
            layui.event.call(this, r, 'tool(' + g + ')', b.call(this, { event: e.attr('lay-event') })), a.setThisRowChecked(i)
        }), a.layMain.on('scroll', function () {
            var e = t(this), i = e.scrollLeft(), n = e.scrollTop()
            a.layHeader.scrollLeft(i), a.layTotal.scrollLeft(i), a.layFixed.find(f).scrollTop(n), l.close(a.tipsIndex)
        }), k.on('click', function () { k.trigger('table.remove.tool.panel') }), k.on('table.remove.tool.panel', function () { t('.layui-table-tool-panel').remove() }), x.on('resize', function () { a.fullSize(), a.scrollPatch(), a.setColsWidth() })
    }, s.init = function (e, i) {
        i = i || {}; var a = 'Table element property lay-data configuration item has a syntax error: '
        return t(e ? 'table[lay-filter="' + e + '"]' : '.layui-table[lay-data]').each(function () {
            var l = t(this), n = l.attr('lay-data')
            try { n = new Function('return ' + n)() } catch (e) { o.error(a + n) } var d = [], c = t.extend({ elem: this, cols: [], data: [], skin: l.attr('lay-skin'), size: l.attr('lay-size'), even: 'string' == typeof l.attr('lay-even') }, s.config, i, n)
            e && l.hide(), l.find('thead>tr').each(function (e) {
            c.cols[e] = [], t(this).children().each(function (i) {
                var l = t(this), n = l.attr('lay-data')
                try { n = new Function('return ' + n)() } catch (e) { return o.error(a + n) } var s = t.extend({ title: l.text(), colspan: l.attr('colspan') || 0, rowspan: l.attr('rowspan') || 0 }, n)
                s.colspan < 2 && d.push(s), c.cols[e].push(s)
            })
            }), l.find('tbody>tr').each(function (e) {
                var i = t(this), a = {}
                i.children('td').each(function (e, i) {
                    var l = t(this), n = l.data('field')
                    if (n) return a[n] = l.html()
                }), layui.each(d, function (e, t) {
                    var l = i.children('td').eq(e)
                    a[t.field] = l.html()
                }), c.data[e] = a
            }), s.render(c)
        }), this
    }, c.config = {}, s.eachCols = function (e, i, a) { 
        var l = c.config[e] || {}, n = [], o = 0
        a = t.extend(!0, [], a || l.cols), layui.each(a, function (e, t) {
            layui.each(t, function (t, i) {
                if (i.colGroup) {
                    var l = 0
                    o++ , i.CHILD_COLS = [], layui.each(a[e + 1], function (e, t) { t.PARENT_COL_INDEX || l > 1 && l == i.colspan || (t.PARENT_COL_INDEX = o, i.CHILD_COLS.push(t), l += parseInt(t.colspan > 1 ? t.colspan : 1)) })
                } i.PARENT_COL_INDEX || n.push(i)
            })
        }); var d = function (e) { layui.each(e || n, function (e, t) { if (t.CHILD_COLS) return d(t.CHILD_COLS); 'function' == typeof i && i(e, t) }) }
        d()
    }, s.checkStatus = function (e) {
        var t = 0, i = 0, a = [], l = s.cache[e] || [], len = this.getCheckTotal(e)
        return layui.each(l, function (e, l) {
            l.constructor !== Array ? l[s.config.checkName] && (t++ , a.push(s.clearCacheKey(l))) : i++
        }), { data: a, isAll: !!l.length && t === l.length }
    }, s.getCheckTotal = function(e){
        // 可选checkbox数量
        var l = t('table#'+e).next().find(".layui-table-main input[name='layTableCheckbox']:not(:disabled)").length
        return l
    }, s.exportFile = function (e, t, i, name) {
    t = t || s.clearCacheKey(s.cache[e]), i = i || 'csv'; var a = c.config[e] || {}, l = { csv: 'text/csv', xls: 'application/vnd.ms-excel' }[i], n = document.createElement('a')
        if (d.ie) return o.error('IE_NOT_SUPPORT_EXPORTS'); n.href = 'data:' + l + ';charset=utf-8,\ufeff' + encodeURIComponent(function () {
            var i = [], a = []
            return layui.each(t, function (t, l) {
                var n = []
                'object' == typeof e ? (layui.each(e, function (e, a) { 0 == t && i.push(a || '') }), layui.each(s.clearCacheKey(l), function (e, t) { n.push(t) })) : s.eachCols(e, function (e, a) { a.field && 'normal' == a.type && !a.hide && (0 == t && i.push(a.title || ''), typeof l[a.field] === 'string'?l[a.field]=l[a.field].replace(/,/g,"，"):null, n.push(l[a.field])) }), a.push(n.join(','))
            }), i.join(',') + '\r\n' + a.join('\r\n')
        }()), n.download = (name || a.title || 'table_' + (a.index || '')) + '.' + i, document.body.appendChild(n), n.click(), document.body.removeChild(n)
    }, s.reload = function (e, i) {
        var a = c.config[e]
        return i = i || {}, a ? (i.data && i.data.constructor === Array && delete a.data, s.render(t.extend(!0, {}, a, i))) : o.error('The ID option was not found in the table instance')
    }, s.render = function (e) {
        var t = new C(e)
        return c.call(t)
    }, s.clearCacheKey = function (e) { return delete (e = t.extend({}, e))[s.config.checkName], delete e[s.config.indexName], e }, s.init(), e(r, s)
})
