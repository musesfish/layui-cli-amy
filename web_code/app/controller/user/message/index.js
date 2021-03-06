; layui.define( function(e){
    var MODE_NAME = "UserMessage";
    layui.use(['jquery', 'form', 'api', 'ajax', 'renders', 'element', 'table',  'laytpl', 'laydate', 'selPersonnel'], function () {
        var form = layui.form,
            $ = layui.jquery,
            tpl = layui.laytpl,
            api = layui.api,
            ajax = layui.ajax,
            element = layui.element,
            renders = layui.renders,
            laydate = layui.laydate,
            table = layui.table;

        var personnelcenterMessageTable;

        var view = $('#personnelcenter-message-view');
        var url = '';
        var cols = '';
        var where = {};
        var tab = 0;
        var typeList = [];

        tpl(personnelcenterMessageTemp.innerHTML).render({
            noticeTypeName: typeList
        }, function (html) {
            view.html(html);
            create()
        })


        function create() {
            form.render()
            lay('.date-range .date-range-item').each(function () {
                var that = this;
                var ele = $(this).parents('.date-range');
                laydate.render({
                    elem: this,
                    range: 1,
                    trigger: 'click',
                    btns: ['clear', 'confirm'],
                    done: function (value, date, endDate) {
                        var start = '  ' + date.year + '-' + api.markZero(date.month, 2) + "-" + api.markZero(date.date, 2);
                        var end = '  ' + endDate.year + '-' + api.markZero(endDate.month, 2) + '-' + api.markZero(endDate.date, 2);
                        if (value == '') {
                            start = '';
                            end = '';
                        }
                        ele.find('input[name="' + that.dataset.start + '"]').val(start);
                        ele.find('input[name="' + that.dataset.end + '"]').val(end);
                    }
                })
            })

            var layerAdd = null, layerAddDom = null;

            var toolbarTemp1 = '<div><div class="tb-tool layui-row">' +
            '<div class="tb-tool-count pull-left">' +
            '<div class="layui-btn w100" lay-event="del" >????????????</div>' + 
            '<div class="layui-btn w100" lay-event="addmess" >??????</div>'
            '</div>' +
            '<div class="pull-right tb-tool-tab">' +
            '</div>' +
            '</div></div>';
            var toolbarTemp = '';
            var toolrowTemp = '<div><div class="btn-groups">' +
                '<span lay-event="examine" >??????</span>' +
                '</div></div>';
            var toolrowTemp1 = '<div><div class="btn-groups">' +
                '<span lay-event="examine" >??????</span>' +
                '<span lay-event="delete" >??????</span>' +
                '</div></div>';
            var col = [[
                { field: 'id', title: '??????', width: 120 },
                { field: 'noticeTitle', title: '??????', templet: '<div><span class="cursor-pointer" lay-event="examine">{{d.noticeTitle}}</span></div>' },
                { field: 'noticeTypeName', title: '????????????', },
                { field: 'userName', title: '?????????', },
                { field: 'createDate', title: '????????????', templet: function (d) { return api.splitTimeDate(d.createDate) } },
                { field: 'state', title: '??????',templet: '<div>{{# if(d.state==0){ }}<span class="cursor-pointer" lay-event="examine">??????</span>{{# } else { }}<span class="cursor-pointer fc-red" lay-event="examine">??????</span>{{# } }}</div>' },
                { title: '??????', templet: toolrowTemp, width: 160, fixed: 'right' }
            ]];
            var col1 = [[
                { checkbox: true, fixed: 'left' },
                { field: 'id', title: '??????', width: 120 },
                { field: 'noticeTitle', title: '??????', templet: trTitleTemp },
                { field: 'noticeTypeName', title: '????????????', templet: trTypeTemp },
                { field: 'createDate', title: '????????????', templet: function (d) { return api.splitTimeDate(d.createDate) } },
                { title: '??????', templet: toolrowTemp1, width: 160, fixed: 'right' }
            ]];
            var trStateTemp = '<div>{{# if(d.state==0){ }}<span class="cursor-pointer" lay-event="examine">??????</span>{{# } else { }}<span class="cursor-pointer fc-red" lay-event="examine">??????</span>{{# } }}</div>';
            var trTitleTemp = '<div><span class="cursor-pointer" lay-event="examine">{{d.noticeTitle}}</span></div>';
            var trTypeTemp = function (d) {
                return layui.noticeTypes.getLabel(d.noticeType);
            }

            personnelcenterMessageTable = renders.table({
                cellMinWidth: 120,
                id: 'personnelcenterMessageTable',
                elem: '#personnelcenter-message-table',
                url: "xxx",
                where: { myself: 1 },
                toolbar: toolbarTemp,
                defaultToolbar: false,
                cols: col
            })

            element.on('tab(notice-type)', function (data) {
                var toolbar;
                // view.find(".layui-form")[0].reset()
                $('.tis-icon').hide();
                switch (this.dataset.where) {
                    case "on":
                        url = "xxx";
                        cols = col;
                        where = { myself: 1 };
                        toolbar = toolbarTemp;
                        tab = 0;
                        break;
                    case "sent":
                        url = "xxx";
                        cols = col1;
                        toolbar = toolbarTemp1;
                        where = { creatorId: api.getUserInfo().userId};
                        tab = 1;
                        break;
                }
                personnelcenterMessageTable.reload({
                    where: where,
                    url: api.getApi(url),
                    toolbar: toolbar,
                    cols: cols
                });                
            })

            table.on('tool(personnelcenter-message-table)', function (obj) {
                switch (obj.event) {
                    // ??????
                    case "examine":
                    ajax({
                        url: '/notice/getNoticeInfo', data: { 'id': obj.data.id, source: 2 }, callback: function (data) {
                            // const userId = api.getUserInfo().userId;
                            // ??????????????????
                            // let isAlertOthers = false;
                            // for(let i of data.data.users) {
                            //     if (item.userId === userId) {
                            //         isAlertOthers = true;
                            //         break;
                            //     }
                            // }
                            // data.data.users.some(item=> item.userID === userId )
                            renders.con({
                                type: 0,
                                title: '????????????',
                                area: ['660px', '400px'],
                                content: tpl(personnelcenterMessageExamineTemp.innerHTML).render(data.data == null ? {} : data.data),
                                btn: 0,
                                shadeClose: 1,
                                success: function(layerno, index){
                                    layui.api.setStateToLook({ elem: layerno })
                                },
                                end: function () {
                                    // if(isAlertOthers) {
                                        // // ????????????
                                        // obj.update({
                                        //     "state": '0'
                                        // })
                                        // ????????????tips
                                        api.updateNoticeTips()
                                    // }
                                    personnelcenterMessageTable.reload()
                                }
                            });
                        }
                    })
                    break;
                    case 'delete':
                        layer.confirm('??????????????????????????????', { icon: 0, skin: 'layer-theme-confirm', }, function () {
                            ajax({
                                url: '/notice/deleteNotice', type: 'post', data: { 'id': obj.data.id }, callback: function () {
                                    renders.msg('??????', {
                                        end: function () {
                                            personnelcenterMessageTable.reload();
                                            api.updateNoticeTips()
                                        }
                                    })
                                }
                            })
                        });
                    break;
                }
            })

            table.on('toolbar(personnelcenter-message-table)', function (obj) {
                var checkTr = table.checkStatus('personnelcenterMessageTable').data;
                switch (obj.event) {
                    case 'del':  // ????????????
                        if (checkTr.length == 0 || checkTr == null) {
                            renders.fail('?????????????????????????????????');
                            break
                        };
                        var arr = [];
                        for (var i = 0; i < checkTr.length; i++) {
                            arr.push(checkTr[i].id)
                        }
                        var data = arr;
                        layer.confirm('???????????????????????????????????????', { icon: 0, skin: 'layer-theme-confirm', }, function () {
                            ajax({
                                type: 'JSON',
                                url: '/notice/deleteNotices',
                                data: JSON.stringify(data),
                                callback: function () {
                                    renders.msg('??????', {
                                        end: function () {
                                            personnelcenterMessageTable.reload()
                                            api.updateNoticeTips()
                                        }
                                    })
                                }
                            })
                        })
                        break;
                    case 'addmess':
                        layerAdd = renders.con({
                            type: 0,
                            title: "??????",
                            content: tpl(personnelNoticeAddMess.innerHTML).render({ noticeTypeName: typeList }),
                            btn: 0,
                            area: ['680px', '480px'],
                            success: function (dom, index) {
                                form.render();
                                layerAddDom = dom;
                                $(dom).on("click", '.j-add-personnel', addPersonnel)
                                laydate.render({
                                    elem: $(dom).find('input[name="sendDate"]')[0],
                                    trigger: 'click',
                                    type: 'datetime', min: new Date().toLocaleDateString(),
                                    format: 'yyyy-MM-dd HH:mm:ss'
                                })
                            },
                            end: function () {
                                personnelcenterMessageTable.reload()
                                api.updateNoticeTips()
                            }
                        })
                        break;
                }

            })

            $(document).on("click", '.cut-personnel .layui-icon-close-fill', function () {
                $(this).parent().remove()
            })
            /* ???????????? */
            function addPersonnel() {
                var userElem = $(this).siblings(".cut-personnel");
                layui.setter.selectTableRow = { data: [] }
                var query = [
                    // 'r=' + (authControl[control.indexOf('p????????????')].roleId) || '',
                    'all=1',
                    "m=1"
                ];
                layui.selPersonnel.bind('views/component/personnel.html?' + query.join("&"), {
                    yes: function(index, dom){
                        var data = top.layer.getChildFrame('#select2', index);
                        var users = [];
                        data.children().each(function () {
                            users.push({
                                id: $(this).data('value'),
                                userName: $(this).data("label")
                            })
                        })
                        renderUers(users);
                        top.layer.close(index);
                    }
                })
            }

            form.on('submit(personnel-notice-add-submit)', function () {
                if ($('.cut-personnel>span').length == 0) {
                    layer.msg('??????????????????????????????')
                    return false;
                }
                var data = arguments[0].field;
                var option = $(layerAddDom).find(".cut-personnel").children();
                var users = [];
                for (var i = 0; i < option.length; i++) {
                    users.push({ 'id': option.eq(i).data('id'), 'userName': option.eq(i).text() })
                }
                data.users = users;
                data.userId = layui.api.getUserInfo().userId;
                data.token = layui.api.getUserInfo().token;
                data.userName = layui.api.getUserInfo().userName;
                ajax({
                    type: 'JSON',
                    url: "/notice/saveNotice",
                    data: JSON.stringify(data),
                    callback: function (res) {
                        if (res.ret == 100) {
                            renders.msg(res.msg, {
                                end: function () {
                                    table.reload('personnelNoticeTable')
                                    layer.close(layerAdd)
                                }
                            })
                        } else {
                            layer.msg(res.ret + "," + res.msg)
                        }
                    }
                })
                return false
            })

            form.on('submit(personnel-notice-query)', function (data) {
                tableIns.reload({
                    where: api.filterData(data.field, { date: 1, view: view }),
                    page: renders.store.tablePage,
                })
                return false
            })

            /* 
             * ????????????
             * @param t <string>: ['string','json'] ???????????????????????? ?????? t = 'string' 
            */
            function getUsers(t) {
                var t = t || 'string';
                var option = layerAddDom.find('.cut-personnel').children();
                var users = []
                option.each(function () {
                    if (t === 'string') {
                        users.push($(this).data().id)
                    } else if (t === 'json') {
                        users.push({
                            id: $(this).data().id,
                            userName: $(this).text()
                        })
                    }
                })
                return users;
            }

            // ????????????
            function renderUers(users) {
                if (users == null) return false;
                var hasUsers = getUsers('json');
                users = hasUsers.concat(users);
                users = api.unique(users); // ??????
                var html = '';
                for (var i = 0; i < users.length; i++) {
                    html += '<span data-id="' + users[i].id + '">' + users[i].userName + "<i class='layui-icon layui-icon-close-fill'></i></span>"
                }
                layerAddDom.find('.cut-personnel').html(html)
            }

            // ??????
            form.on('submit(personnelcenter-message-query)', function (data) {
                if (data.field.startDate) data.field.startDate = new Date(data.field.startDate);
                if (data.field.endDate) data.field.endDate = new Date(data.field.endDate);
                if (tab == 0) {
                    data.field.myself = 1;
                } else {
                    data.field.creatorId = api.getUserInfo().userId;
                }
                personnelcenterMessageTable.reload({
                    page: renders.store.tablePage,
                    where: api.filterData(data.field),
                })
                return false
            })
        }
    })
    , e(MODE_NAME, {})
})