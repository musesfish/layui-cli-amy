 layui.config({
  base: "/layui/lay/modules/"
}).use(['element', 'jquery','form', 'request','tree'], function () {
    
    var $ = layui.jquery,
        request= layui.request;

    request.get("getOrganizationalStructureAndDepartmentAndEmployee", { companyId: request.getUserInfo().companyId },function(){
        var data = JSON.stringify(arguments[0].data)
        data = data.replace(/companyName/g,'name');
        data = data.replace(/childs/g,'children');

        layui.tree({
            elem: '#tree-demo',
            nodes: [JSON.parse(data)],
            click: function(node){ 
                var departments = node.departments;
                var html = "";
                var roleArr = [];
                if (departments == null) return;
                for(var i = 0; i< departments.length;i++){
                    if (!departments[i].users) continue;
                    roleArr = roleArr.concat(departments[i].users)
                }
                if (!roleArr) {
                } else {
                    for (var i = 0; i < roleArr.length; i++) {
                        html += "<option value='" + roleArr[i].id + "'>" + roleArr[i].userName + "</option>";
                    }
                }
                $("#select1").html(html)
            }
        })
    })
    $(".j-btn-submit").on("click", function () {
        var option = $("#select2").children();
        var data = '';
        var html = '';
        for (var i = 0; i < option.length; i++) {
            html += "<span data-id=" + option.eq(i).val() + ">" + option.eq(i).html() + "<i class='layui-icon layui-icon-close-fill'></i></span>";
            data += option.eq(i).val() + ","
        }
        //console.log(html);
        data = data.replace(/\,$/, '');
        parent.layui.jquery('.cut-personnel').html(html)

        try{
            var _id = parent.selectTable.data.id;
            request.post("addRoleUser", {
                "roleId": _id,
                "usersId": data
            }, function () {
                layer.msg("??????")
                var index = parent.layer.getFrameIndex(window.name);
                parent.layer.close(index);
            })    
        }
        catch(err){
            var index = parent.layer.getFrameIndex(window.name);
            parent.layer.close(index);  
        }        
    })

    //????????????
    $('#add').click(function () {
        //????????????????????????????????????????????????
        $('#select1 option:selected').appendTo('#select2');
    });

    //????????????
    $('#remove').click(function () {
        $('#select2 option:selected').appendTo('#select1');
    });

    //??????????????????
    $('#add_all').click(function () {
        //?????????????????????,????????????????????????
        $('#select1 option').appendTo('#select2');
    });

    //??????????????????
    $('#remove_all').click(function () {
        $('#select2 option').appendTo('#select1');
    });

    //????????????
    $('#select1').dblclick(function () { //??????????????????
        //?????????????????????,????????????????????????
        $("option:selected", this).appendTo('#select2'); //???????????????
    });

    //????????????
    $('#select2').dblclick(function () {
        $("option:selected", this).appendTo('#select1');
    });


    
})
