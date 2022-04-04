"use strict";

layui.config({
  base: "/layui/win/lay/modules/"
}).use(['element', 'jquery', 'table', 'form', 'laytpl', 'request', 'tree'], function () {
  var $ = layui.jquery,
      request = layui.request;
  var defaults = parent.layui.api.getUserInfo();
  request.get("getCompanys", {
    "companyId": defaults.companyId
  }, function () {
    var data = JSON.stringify(arguments[0].dataList);
    data = data.replace(/departmentName/g, 'name');
    data = data.replace(/childs/g, 'children');
    layui.tree({
      elem: '#tree-demo',
      nodes: [JSON.parse(data)],
      click: function click(node) {
        var html = "<option value='" + node.id + "'>" + node.name + "</option>";
        var roleArr = node.users;

        if (!roleArr) {} else {
          for (var i = 0; i < roleArr.length; i++) {
            html += "<option value='" + roleArr[i].id + "'>" + roleArr[i].userName + "</option>";
          }
        }

        $("#select1").html(html);
      }
    });
  });
  $(".j-btn-submit").on("click", function (data) {
    var option = $("#select2").children();
    var html = '';
    var data = '';

    for (var i = 0; i < option.length; i++) {
      html += "<span>" + option.eq(i).html() + "<i class='layui-icon-close-fill'></i></span>";
      data += option.eq(i).val() + ",";
    }

    parent.layui.jquery('.cut-role').html(html);
    parent.layui.jquery('.cut-role').parents("form").find("input[name='roles']").val(data.replace(/\,$/, ''));
    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引

    parent.layer.close(index); //再执行关闭   
  }); //移到右边

  $('#add').click(function () {
    //获取选中的选项，删除并追加给对方
    $('#select1 option:selected').appendTo('#select2');
  }); //移到左边

  $('#remove').click(function () {
    $('#select2 option:selected').appendTo('#select1');
  }); //全部移到右边

  $('#add_all').click(function () {
    //获取全部的选项,删除并追加给对方
    $('#select1 option').appendTo('#select2');
  }); //全部移到左边

  $('#remove_all').click(function () {
    $('#select2 option').appendTo('#select1');
  }); //双击选项

  $('#select1').dblclick(function () {
    //绑定双击事件
    //获取全部的选项,删除并追加给对方
    $("option:selected", this).appendTo('#select2'); //追加给对方
  }); //双击选项

  $('#select2').dblclick(function () {
    $("option:selected", this).appendTo('#select1');
  });
});