; layui.extend({
    'ajax': '/app/controller/ajax',
    'eleTree': '/app/controller/eleTree',
    'api': '/app/controller/api',
    'setter': '/app/config',
    'store': '/app/controller/store',
    'jsencrypt': '/app/controller/jsencrypt'
}).use(['element', 'jquery', 'form', 'ajax', 'eleTree'], function () {

    var $ = layui.jquery,
        ajax = layui.ajax;

    ajax({
        url: "companys",
        data: {},
        callback: function () {
            var data = JSON.stringify(arguments[0].data)
            data = data.replace(/companyName/g, 'label');
            data = data.replace(/childs/g, 'children');

            layui.eleTree.render({
                elem: '#tree-demo',
                data: [JSON.parse(data)],
                expandOnClickNode: 0
            })

            layui.eleTree.on("nodeClick(tree-demo)", function (d) {
                var node = d.data.currentData;
                var ele = layui.api.getParams().win;
                if (node.parentId == null) return false;
                var parentIds = node.parentIds.split(','),
                    nullIndex = parentIds.indexOf("");
                if (nullIndex > -1) parentIds.splice(nullIndex, 1);
                parentIds.push(node.id)
                if (!ele) {
                    parent.layui.jquery('.layadmin-tabsbody-item.layui-show').find("input[name='parentName']").val(node.label);
                    parent.layui.jquery('.layadmin-tabsbody-item.layui-show').find("input[name='parentId']").val(node.id);
                    parent.layui.jquery('.layadmin-tabsbody-item.layui-show').find("input[name='parentIds']").val(parentIds.join(","));
                } else {
                    var dom = parent.layui.jquery('#' + ele)[0].contentWindow.layui.jquery;
                    dom("input[name='parentName']").val(node.label);
                    dom("input[name='parentId']").val(node.id);
                    dom("input[name='parentIds']").val(parentIds.join(","))
                }
                var index = top.layer.getFrameIndex(window.name); // 获取当前layer的索引  
                top.layer.close(index);  
            })
        }
    })




})
