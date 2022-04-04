"use strict";

/*
	@Author: 请叫我马哥
	@Time: 2017-04
	@Tittle: tab
	@Description: 点击对应按钮添加新窗口
*/
var tabFilter,
    menu = [],
    liIndex,
    curNav,
    delMenu;
layui.define(["jquery", "element"], function (exports) {
  var element = layui.element,
      $ = layui.jquery,
      layId,
      Tab = function Tab() {
    this.tabConfig = {
      closed: true,
      openTabNum: 20,
      tabFilter: "bodyTab"
    };
  }; //显示左侧菜单


  if ($(".navBar").html() == '') {
    var _this = this;

    $(".navBar").height($(window).height() - 60);
    element.init(); //初始化页面元素

    $(window).resize(function () {
      $(".navBar").height($(window).height() - 60);
    });
  } //参数设置


  Tab.prototype.set = function (option) {
    var _this = this;

    $.extend(true, _this.tabConfig, option);
    return _this;
  }; //通过title获取lay-id


  Tab.prototype.getLayId = function (title) {
    $(".layui-tab-title.top_tab li").each(function () {
      if ($(this).find("cite").text() == title) {
        layId = $(this).attr("lay-id");
      }
    });
    return layId;
  }; //通过title判断tab是否存在


  Tab.prototype.hasTab = function (title) {
    var tabIndex = -1;
    $(".layui-tab-title.top_tab li").each(function () {
      if ($(this).find("cite").text() == title) {
        tabIndex = 1;
      }
    });
    return tabIndex;
  }; //右侧内容tab操作


  var tabIdIndex = 0;

  Tab.prototype.tabAdd = function (_node) {
    _node.url = _node.url;

    if (window.sessionStorage.getItem("menu")) {
      menu = JSON.parse(window.sessionStorage.getItem("menu"));
    }

    var that = this;
    var closed = that.tabConfig.closed,
        openTabNum = that.tabConfig.openTabNum;
    tabFilter = that.tabConfig.tabFilter;

    if (_node.url && that.hasTab(_node.name) < 0) {
      var title = '';

      if ($(".layui-tab-title.top_tab li").length == openTabNum) {
        layer.msg('只能同时打开' + openTabNum + '个选项卡哦。不然系统会卡的！');
        return;
      }

      tabIdIndex++;
      title += '<i class="iconfont ' + _node.icon + '"></i>';
      title += '<cite>' + _node.name + '</cite>';
      title += '<i class="layui-icon layui-unselect layui-tab-close" data-id="' + tabIdIndex + '">&#x1006;</i>';
      element.tabAdd(tabFilter, {
        title: title,
        content: '<iframe src="' + _node.url + '" data-id=' + tabIdIndex + '"></iframe>',
        id: new Date().getTime()
      }); // 当前窗口内容

      var curmenu = {
        "icon": _node.icon,
        "title": _node.name,
        "href": _node.url,
        "layId": new Date().getTime()
      };
      menu.push(curmenu);
      menu = [{
        "iconTag": "layui-icon-user",
        "id": 10,
        "jumpUrl": "user",
        "level": 1,
        "menuName": "个人中心",
        "menus": [{
          "iconTag": null,
          "id": 64,
          "jumpUrl": "message",
          "level": 2,
          "menuName": "消息列表",
          "menus": null,
          "parentId": 10,
          "parentIds": "0,10,",
          "sort": 1
        }]
      }];
      console.log('amytest', menu);
      window.sessionStorage.setItem("menu", JSON.stringify(menu)); //打开的窗口

      window.sessionStorage.setItem("curmenu", JSON.stringify(curmenu)); //当前的窗口

      element.tabChange(tabFilter, that.getLayId(_node.name));
    } else {
      //当前窗口内容
      var curmenu = {
        "icon": _node.icon,
        "title": _node.name,
        "href": _node.url,
        "layId": new Date().getTime()
      };
      window.sessionStorage.setItem("curmenu", JSON.stringify(curmenu)); //当前的窗口

      element.tabChange(tabFilter, that.getLayId(_node.name));
    }
  };

  $("body").on("click", ".top_tab li", function () {
    //切换后获取当前窗口的内容
    var curmenu = '';
    var menu = JSON.parse(window.sessionStorage.getItem("menu"));
    curmenu = menu[$(this).index() - 1];

    if ($(this).index() == 0) {
      window.sessionStorage.setItem("curmenu", '');
    } else {
      window.sessionStorage.setItem("curmenu", JSON.stringify(curmenu));

      if (window.sessionStorage.getItem("curmenu") == "undefined") {
        //如果删除的不是当前选中的tab,则将curmenu设置成当前选中的tab
        if (curNav != JSON.stringify(delMenu)) {
          window.sessionStorage.setItem("curmenu", curNav);
        } else {
          window.sessionStorage.setItem("curmenu", JSON.stringify(menu[liIndex - 1]));
        }
      }
    }

    element.tabChange(tabFilter, $(this).attr("lay-id")).init();
  }); //删除tab

  $("body").on("click", ".top_tab li i.layui-tab-close", function () {
    //删除tab后重置session中的menu和curmenu
    liIndex = $(this).parent("li").index();
    var menu = JSON.parse(window.sessionStorage.getItem("menu")); //获取被删除元素

    delMenu = menu[liIndex - 1];
    var curmenu = window.sessionStorage.getItem("curmenu") == "undefined" ? "undefined" : window.sessionStorage.getItem("curmenu") == "" ? '' : JSON.parse(window.sessionStorage.getItem("curmenu"));

    if (JSON.stringify(curmenu) != JSON.stringify(menu[liIndex - 1])) {
      //如果删除的不是当前选中的tab
      // window.sessionStorage.setItem("curmenu",JSON.stringify(curmenu));
      curNav = JSON.stringify(curmenu);
    } else {
      if ($(this).parent("li").length > liIndex) {
        window.sessionStorage.setItem("curmenu", curmenu);
        curNav = curmenu;
      } else {
        window.sessionStorage.setItem("curmenu", JSON.stringify(menu[liIndex - 1]));
        curNav = JSON.stringify(menu[liIndex - 1]);
      }
    }

    menu.splice(liIndex - 1, 1);
    window.sessionStorage.setItem("menu", JSON.stringify(menu));
    element.tabDelete("bodyTab", $(this).parent("li").attr("lay-id")).init();
  });
  var bodyTab = new Tab();
  exports("bodyTab", function (option) {
    return bodyTab.set(option);
  });
});