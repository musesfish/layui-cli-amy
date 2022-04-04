 layui.config({
  base: "/layui/lay/modules/"
}).use(['element', 'jquery','form', 'request','tree'], function () {
    
    var $ = layui.jquery,
        request= layui.request,
        form = layui.form;
    var selectData = [];

    request.get("getRoleStructure", { companyId: request.getUserInfo().companyId },function(){
        var data = JSON.stringify(arguments[0].data)
        data = data.replace(/roleName/g,'name');
        data = data.replace(/childs/g,'children');

        layui.tree({
            elem: '#tree-demo',
            nodes: [JSON.parse(data)],
            click: function(node){ 
                var html = "<option value='" + node.id + "'>" + node.name + "</option>";
                var roleArr = node.children;
                if (!roleArr) {
                } else {
                    for (var i = 0; i < roleArr.length; i++) {
                        html += "<option value='" + roleArr[i].id + "'>" + roleArr[i].name + "</option>";
                    }
                }
                $("#select1").html(html)
            }
        })
    })

    form.on("submit(formSubmit)", function (data) {
        var option = $("#select2").children()
        var rolesId = '';
        var html = ''
        for(var i =0; i< option.length; i++){
            html += "<span data-id="+option.eq(i).val()+">" + option.eq(i).html() + "<i class='layui-icon layui-icon-close-fill'></i></span>";
            rolesId+= option[i].value+","
        }
        rolesId = rolesId.replace(/,$/, '');
        parent.layui.jquery('.cut-role').html(html)
        parent.layui.jquery('.cut-role').parents("form").find("input[name='roles']").val(data)
        var index = parent.layer.getFrameIndex(window.name);
        parent.layer.close(index);  

    })

    //移到右边
    $('#add').click(function () {
        //获取选中的选项，删除并追加给对方
        $('#select1 option:selected').appendTo('#select2');
    });

    //移到左边
    $('#remove').click(function () {
        $('#select2 option:selected').appendTo('#select1');
    });

    //全部移到右边
    $('#add_all').click(function () {
        //获取全部的选项,删除并追加给对方
        $('#select1 option').appendTo('#select2');
    });

    //全部移到左边
    $('#remove_all').click(function () {
        $('#select2 option').appendTo('#select1');
    });

    //双击选项
    $('#select1').dblclick(function () { //绑定双击事件
        //获取全部的选项,删除并追加给对方
        $("option:selected", this).appendTo('#select2'); //追加给对方
    });

    //双击选项
    $('#select2').dblclick(function () {
        $("option:selected", this).appendTo('#select1');
    });

    

    
})
