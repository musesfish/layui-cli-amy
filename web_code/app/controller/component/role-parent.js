;layui.extend({
    'ajax': '/app/controller/ajax',
    'eleTree': '/app/controller/eleTree',
    'api': '/app/controller/api',
    'setter': '/app/config',
    'store': '/app/controller/store',
    'jsencrypt': '/app/controller/jsencrypt'
}).use(['element', 'jquery', 'form', 'ajax', 'eleTree'], function () {
    var $ = layui.jquery,
        ajax = layui.ajax,
        api = layui.api,
        PARAMS = api.getParams();

    if(!PARAMS.r) return false;

    ajax({
        url: '/structure/getRoleStructure',
        data: { 'companyId': PARAMS.r },
        callback: function (res) { 
            var data = JSON.stringify(res.data)
            data = data.replace(/roleName/g, 'label')
            data = data.replace(/childs/g, 'children')
            data = JSON.parse(data);
            
            layui.eleTree.render({
                elem: '#tree-demo',
                data: [data],
                expandOnClickNode: 0
            })

            layui.eleTree.on('nodeClick(tree-demo)', function (sel){ 
                var node = sel.data.currentData;
                var ele = api.getParams().win;
                if (node.parentId == null) return false;
                var parentIds = node.parentIds.split(","),
                    nullIndex = parentIds.indexOf("");
                if (nullIndex > -1) parentIds.splice(nullIndex,1);
                parentIds.push(node.id+'');
                if (!ele) {
                    parent.layui.jquery('.layadmin-tabsbody-item.layui-show').find("input[name='parentName']").val(node.label)
                    parent.layui.jquery('.layadmin-tabsbody-item.layui-show').find("input[name='parentId']").val(node.id)
                    parent.layui.jquery('.layadmin-tabsbody-item.layui-show').find("input[name='parentIds']").val(parentIds.join(","))
                } else {
                    var dom = parent.layui.jquery('#' + ele)[0].contentWindow.layui.jquery;
                    dom("input[name='parentName']").val(node.label)
                    dom("input[name='parentId']").val(node.id)
                    dom("input[name='parentIds']").val(parentIds.join(","))
                }
                var index = top.layer.getFrameIndex(window.name)
                top.layer.close(index)
            })
        }
    })
})
