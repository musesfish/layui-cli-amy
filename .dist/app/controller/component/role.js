"use strict";

;
layui.extend({
  'ajax': '/app/controller/ajax',
  'eleTree': '/app/controller/eleTree',
  'api': '/app/controller/api',
  'setter': '/app/config',
  'store': '/app/controller/store',
  'jsencrypt': '/app/controller/jsencrypt'
}).use(['element', 'jquery', 'form', 'ajax', 'eleTree'], function () {
  var $ = layui.jquery,
      ajax = layui.ajax,
      form = layui.form;
  var inRoles = [];
  ajax({
    url: "getRoleStructure",
    data: {
      companyId: parent.layui.api.getUserInfo().companyId
    },
    callback: function callback() {
      var data = JSON.stringify(arguments[0].data);
      data = data.replace(/roleName/g, 'label');
      data = data.replace(/childs/g, 'children');
      var params = parent.layui.setter.selectTableRow.data;
      var roles = params.roles;

      if (roles != null) {
        var html = '';

        for (var i = 0; i < roles.length; i++) {
          html += "<option value='" + roles[i].id + "'>" + roles[i].roleName + "</option>";
          inRoles.push(roles[i].id);
        }

        $("#select2").html(html);
      } else if (params.roles && params.id) {
        // 不存在 roles, user 作为主键时
        inRoles.push(params.id);
        $('#select2').html("<option value='" + params.id + "'>" + params.roleName + "</option>");
      }

      layui.eleTree.render({
        elem: '#tree-demo',
        data: [JSON.parse(data)]
      });
      layui.eleTree.on("nodeClick(tree-demo)", function (d) {
        var node = d.data.currentData;
        var html = "<option value='" + node.id + "'>" + node.label + "</option>";
        var roleArr = node.children;

        if (!roleArr) {} else {
          for (var i = 0; i < roleArr.length; i++) {
            if (inRoles.indexOf(roleArr[i].id) > -1) continue;
            html += "<option value='" + roleArr[i].id + "'>" + roleArr[i].label + "</option>";
          }
        }

        $("#select1").html(html);
      });
    }
  });
  form.on("submit(formSubmit)", function (data) {
    var option = $("#select2").children();
    var rolesId = '';
    var html = '';

    for (var i = 0; i < option.length; i++) {
      html += "<span data-id=" + option.eq(i).val() + ">" + option.eq(i).html() + "<i class='layui-icon layui-icon-close-fill'></i></span>";
      rolesId += option[i].value + ",";
    }

    rolesId = rolesId.replace(/,$/, '');
    var ele = layui.api.getParams().win;

    if (!ele) {
      parent.layui.jquery('.cut-role').html(html);
    } else {
      var dom = parent.layui.jquery('#' + ele)[0].contentWindow.layui.jquery;
      dom(".cut-role").html(html);
    }

    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
  }); //移到右边

  $('#add').click(function () {
    //获取选中的选项，删除并追加给对方
    $('#select1 option:selected').each(function () {
      inRoles.splice(inRoles.indexOf(this.value), 1);
    });
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
    inRoles = [];
    $('#select2 option').appendTo('#select1');
  }); //双击选项

  $('#select1').dblclick(function () {
    //绑定双击事件
    //获取全部的选项,删除并追加给对方
    $("option:selected", this).appendTo('#select2'); //追加给对方
  }); //双击选项

  $('#select2').dblclick(function () {
    inRoles.splice(inRoles.indexOf($("option:selected", this).val()), 1);
    $("option:selected", this).appendTo('#select1');
  });
});