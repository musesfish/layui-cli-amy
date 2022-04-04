/* 
 * 人员选择控件
 * 双击只能移动被双击的选项
 * 参数
 * @query count - 最大选择数目
 * @query r - 角色id 2019-06-13无效
 * @query c - 客户id , m=1时为分公司id
 * @query all - 1 不限制选择人员个数/全选
 * @m - 模式 1 根据companyId获取人员 undefined 根据roleId获取人员
*/
; layui.extend({
    'ajax': '/app/controller/ajax',
    'eleTree': '/app/controller/eleTree',
    'api': '/app/controller/api',
    'setter': '/app/config',
    'renders': '/app/controller/renders',
    'store': '/app/controller/store',
    'approval': '/app/controller/approval',
    'jsencrypt': '/app/controller/jsencrypt'
}).use(['element', 'jquery', 'form', 'ajax', 'eleTree','renders', 'approval'], function () {
    var $ = layui.jquery,
        ajax = layui.ajax,
        renders = layui.renders,
        api = layui.api;
    var inUsers = []; // 存放用户的数组 {  }

    // 获取url参数
    var urlParmas = layui.api.getParams(),
        unMax = urlParmas.all == 1 ? !0 : !1, // 可以选择所有人 
        selCount = urlParmas.count || 1; // 默认可选
    var index = top.layer.getFrameIndex(window.name);
    var mode = urlParmas.m,
        errStatus = !1, // 错误状态
        errText = '';

    mode = 1; // 2019-6-12 所有人员控件调用模式为mode=1

    var url = '/structure/getOrganizationalsByRoleIdAndCustomerId', // 人员选择
        query = { 'roleId': urlParmas.r };
    if (urlParmas.c) query.customerId = urlParmas.c;

    // 根据分部id获取人员
    if (mode == 1) {
        url = '/structure/getOrganizationalStructureAndDepartmentAndEmployee'
        query = {
            companyId: urlParmas.c
        }
        if (!urlParmas.c) {
            errStatus = !1
            errText = '缺少分公司'
        }
    } else {
        if (!urlParmas.r) {
            errStatus = !1
            errText = '权限不足'
        }
    }

    if (errStatus) {
        layer.msg('权限不足', {
            icon: '2', end: function () {
                top.layer.close(index)
            }
        })
        return false
    }

    var unSelElem = $('#select1'), // 待选容器
        seledElem = $('#select2'), //　已选容器
        eleTreeElem = null;
    var clickFlag = null,
        companyName = '',
        departmentName = '';
    var data = {}, // 转化的数据对象
        retData = {}, // 接口返回的数据对象
        queryUsers = []; // 搜索到的用户数据

    function init(){
        ajax({
            url: url,
            data: query,
            callback: function (res) {
                retData = res.data;
                // 处理数据格式
                // 有效的数据格式
                // data = [
                //     {
                //          label: '',
                //          children: []
                //     }
                // ]
                // data = data.replace(/companyName/g, 'label')
                // data = data.replace(/departmentName/g, 'label')
                // data = data.replace(/departments/, 'children')
                // data = data.replace(/childs/g, 'children')

                convertData(data, retData)

                if (!eleTreeElem) {
                    eleTreeElem = layui.eleTree.render({
                        elem: '#tree-demo',
                        data: [data]
                    })
                } else {
                    eleTreeElem.reload({
                        data: [data]
                    })
                    return false;
                }
                
                layui.eleTree.on('nodeClick(tree-demo)', function (d) {
                    var node = d.data.currentData; // 节点数据
                    var nodeUsers = node.users || []; // 节点用户集合
                    var nodeChilds = d.children || []; // 子节点集合
                    var nodeChildsUsers = []; // 子节点下的用户集合
                    var html = []
                    if (node.hasOwnProperty('companyName')) companyName = node.companyName
                    if (node.hasOwnProperty('departmentName')) departmentName = node.departmentName
                    for (var i = 0, len = nodeChilds.length; i < len; i++) {
                        if (Array.isArray(nodeChilds[i].users)) nodeUsers.concat(nodeChilds[i].users)
                    }
                    // 生成HTML
                    html.push(conversionToTemp(layui.api.unique(nodeUsers)));
                    $('#select1').html(html.join(''))
                })
            }
        })
    }
    
    /**
     * 数据转换
     * @param {*} d - 数据转换后的存放对象
     * @param {*} data - 待转换的数据对象
     */
    function convertData(d, data) {
        if (typeof data === 'object' && data != null) {
            if (!Array.isArray(data)) {
                if (data.hasOwnProperty('companyName')) {
                    d['label'] = data['companyName']
                    d['companyName'] = data['companyName']
                    d['departmentName'] = data['departmentName']
                    // 根级分公司
                    if (Array.isArray(data['childs'])) {
                        d['children'] = convertData([], data['childs'].concat(data['departments'] || []))
                    } else { // 二级分公司
                        d['children'] = convertData([], data['departments'])
                    }
                } else { // 部门
                    d = data
                    d['label'] = data['departmentName']
                }
            } else {
                d = []
                for (var i = 0, len = data.length; i < len; i++) {
                    d[i] = convertData({}, data[i])
                }
            }
        } else {
            d = data
        }
        return d
    }

    /**
     * 筛选数据 模糊匹配
     * @param {*} key - 筛选的字符串
     */
    function filterData(key){
        var reg = new RegExp(key); 
        hasKey(data,reg, '','');
    }

    function hasKey(d, reg, companyName, departmentName){
        if (Array.isArray(d.children)){
            companyName = d.companyName||'';
            var children = d.children||[];
            for (var i = 0, len = children.length; i<len; i++){
                hasKey(children[i], reg, companyName, departmentName||'')
            }
        } else {
            if( Array.isArray(d.users)){
                departmentName = d.departmentName;
                for(var i = 0, len = d.users.length; i< len; i++){
                    if (reg.test(d.users[i].userName)){
                        d.users[i].company = companyName;
                        d.users[i].department = departmentName;
                        queryUsers.push(d.users[i]);
                    }
                }
            }
        }
    }

    init();

    // 搜索
    layui.form.on('submit(m-sel-per-form)', function (res) { 
        // Object.assign(query, data.field);
        // init();
        var temp = '';
        queryUsers = [];
        if( res.field.name ){
            filterData(res.field.name);
            temp = conversionToTemp(queryUsers, 1);
        } 
        if(!temp) renders.fail('请确认输入的姓名无误！');
        $('#select1').html(temp);
        return false
    })


    // $(".j-btn-submit").on("click", function () {
    //     var option = $("#select2").children()
    //     var data = []
    //     var dataName = []
    //     var html = []
    //     for (var i = 0; i < option.length; i++) {
    //         html.push("<span data-id=" + option.eq(i).data('value') + ">" + option.eq(i).html() + "<i class='layui-icon layui-icon-close-fill'></i></span>")
    //         dataName.push(option.eq(i).html())
    //         data.push(option.eq(i).data('value'))
    //     }

    //     var ele = api.getParams().win
    //     if (!ele) {
    //         parent.layui.jquery('.cut-personnel').html(html.join(""))
    //         parent.layui.jquery('.layadmin-tabsbody-item.layui-show').find('input[name="users"]').val(dataName.join(","))
    //     } else {
    //         var dom = parent.layui.jquery('#' + ele)[0].contentWindow.layui.jquery
    //         dom('.cut-personnel').html(html.join(""))
    //     }

    //     var index = parent.layer.getFrameIndex(window.name)
    //     parent.layer.close(index)

    // })

    // $(".j-btn-cancel").on("click", function(){
    //     var index = parent.layer.getFrameIndex(window.name)
    //     parent.layer.close(index)
    // })

    // $(".j-btn-clear").on("click", function(){
    //     unSelElem.html("")
    //     seledElem.html("")
    // })

    // 选项选中hover背景色
    $('.select-bar').on('click', 'div', function () {
        var that = this
        clearTimeout(clickFlag)
        clickFlag = setTimeout(function () {
            $(that).toggleClass('sel-opt')
        })
    })

    // 移到右边
    $('#add').click(function () {
        var bol;
        unSelElem.find('.sel-opt').each(function (index) {
            bol = isMaxCount();
            if (bol) return false;
            $(this).appendTo(seledElem);
        })
    })

    // 移到左边
    $('#remove').click(function () {
        $('#select2 .sel-opt').appendTo('#select1')
    })

    // 全部移到右边
    $('#add_all').click(function () {
        var bol;
        $('#select1>div').each(function (index) {
            bol = isMaxCount();
            if(bol) return false;
            $(this).appendTo(seledElem);
        })
    })

    // 全部移到左边
    $('#remove_all').click(function () {
        $('#select2>div').appendTo('#select1')
    })

    // 双击选项
    $('#select1').on("dblclick","div", function (e) { // 绑定双击事件
        clearTimeout(clickFlag);
        $(this).addClass('.sel-opt');
        var bol = isMaxCount();
        if (!bol) $(this).appendTo('#select2');
    })

    // 双击选项
    $('#select2').on("dblclick","div",function () {
        clearTimeout(clickFlag);
        $(this).appendTo('#select1')
    })
    
    function isMaxCount(){
        var bol = false;
        if ( unMax ) bol = false;
        else {
            bol = (Number(selCount) - seledElem.children().length - 1 < 0) ? !0 : !1;
        }
        return bol;
    }

    function conversionToTemp(d, search) {
        var temp = [];
        var len = d.length;
        var isSearch = !search; // 是否为搜索
        if (len == 0) return '';
        for (var i = 0; i < len; i++) {
            // 对数据进行筛选处理
            // 数据格式 { id: <string>, userName: <string> }
            if(search){
                departmentName = d[i].department||'';
                companyName = d[i].company||'';
            }
            temp.push(`<div data-value='${d[i].id||''}' data-label='${d[i].userName||''}' data-company="${companyName}" data-department="${departmentName}">${d[i].userName}<br>
                <span class="sel-fc-sub">${departmentName}&nbsp;&nbsp;${companyName}</span>
            </div>`)
        }
        return temp.join('')
    }
})
