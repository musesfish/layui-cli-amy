 layui.config({
  base: "/layui/win/lay/modules/"
}).use(['element', 'jquery', 'table','form', 'laytpl', 'request','tree'], function () {
 
    var $ = layui.jquery,
        request = layui.request;
    var view = '#'+request.getParams().view;
    var param = parent.layui.setter.viewData;
    var users = param.notifications.split(',');
    var arr = param.users;
    
    

    request.get("getRoleStructureAndEmployee", { "companyId": parent.layui.api.getUserInfo().companyId } , function(res){
        if(res.ret != 100){
            layer.msg(res.msg)
            return false
        }
        var data = JSON.stringify(arguments[0].data)
        data = data.replace(/roleName/g, 'name');
        data = data.replace(/childs/g, 'children');


        var html = "";
        for (var i = 0; i < arr.length; i++) {
            html += "<option value='" + arr[i].id + "'>" + arr[i].userName + "</option>";
        }
        $("#select2").html(html)

        layui.tree({
            elem: '#tree-demo',
            nodes: [JSON.parse(data)],
            click: function (node) {
                var html = "";
                var roleArr = node.users;
                if(!roleArr){ roleArr = []}
                for (var i = 0; i < roleArr.length; i++) {
                    if (users.indexOf(roleArr[i].id).toString()>-1) continue;
                    html += "<option value='" + roleArr[i].id + "'>" + roleArr[i].userName + "</option>";
                }
                $("#select1").html(html)
            }
        })
    })

    $(".j-btn-submit").on("click", function(data){
        var option = $("#select2").children()
        var html = '';
        var data = '';
        for(var i=0;i<option.length;i++){
            html += "<span data-id=" + option.eq(i).val() +">" + option.eq(i).html() +"<i class='layui-icon layui-icon-close-fill'></i></span>";
            data+=option.eq(i).val()+","
        }
        parent.layui.jquery(view).find('.cut-con').html(html)
        parent.layui.jquery(view).find('.cut-con').parents("form").find("input[name='notifications']").val(data.replace(/\,$/, ''))
        var index = parent.layer.getFrameIndex(window.name); //???????????????iframe????????????
        parent.layer.close(index); //???????????????   
    })

    //????????????
    $('#add').click(function () {
        //????????????????????????????????????????????????
        $('#select1 option:selected').appendTo('#select2');
    });

    //????????????
    $('#remove').click(function () {
        $('#select2 option:selected').each(function () {
            users.splice(users.indexOf(this.value), 1)
        })
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
        users = []
    });

    //????????????
    $('#select1').dblclick(function () { //??????????????????
        //?????????????????????,????????????????????????
        $("option:selected", this).appendTo('#select2'); //???????????????
    });

    //????????????
    $('#select2').dblclick(function () {
        users.splice(users.indexOf($("option:selected", this).val()), 1)
        $("option:selected", this).appendTo('#select1');
    });

	

})