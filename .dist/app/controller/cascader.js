"use strict";

/**
 * 基于layui的无限级联选择器
 * author: hsianglee
 * 最近修改时间: 2018/11/16
 * 使用：
 * layui.cascader({
        // 必选参数：选择器
        elem: "#a",
        // 必选参数：data或url参数二选一，data优先
        data: [
            {
                value: 'BB2',
                label: 'bb2',
                children: [
                    {
                        value: 'AAA4',
                        label: 'aaa4',
                        children: [
                            {
                                value: 'AAA4',
                                label: 'aaa4',
                            },
                        ]
                    },
                ]
            }
        ],
        // 数据请求地址
        url: "/aa",
        // 后台参数返回格式：{
        //     "Data": data,
        //     "Code": 0,
        //     "Msg": "错误！！"
        // }

        // 可选参数：默认get
        type: "post",
        // 可选参数：ajax附带的额外参数
        where: {},
        // 可选参数：触发方式，不填或其他都为click, "change": 鼠标移入
        triggerType: "change",
        // 可选参数：只显示最后一级,默认false全显示
        showLastLevels: true,
        // 可选参数：赋初值，数组形式给出每一块的value值
        value: ["B", "AA2", "AAA3"],
        // 可选参数：拿到选择的value值存进数组
        success: function (data) {
            console.log(data);
        }
    });
 * 
 */
layui.define(["jquery", "laytpl", "layer"], function (exports) {
  var $ = layui.jquery;
  var laytpl = layui.laytpl;
  var layer = layui.layer;
  var zIndex = 3000; // 共用一个层级

  function Cascader(option) {
    this.option = option; // 获取传入的数据

    this.domContent = ""; // content节点

    this.textArr = []; // 最终的text数组

    this.textStr = ""; // 最终的text

    this.valueArr = []; // 最终的value数组

    this.onOff = false; // 是否显示

    this.positionArr = []; // 当前点击的面板在数据中的下标位置

    this.blockData = {}; // 当前点击的当前面板的数据
    // this.count=0;           // 进入finishInitData的次数

    this.initOption();
  }

  Cascader.prototype = {
    constructor: Cascader,
    // 初始化参数数据
    initOption: function initOption() {
      var self = this;
      self.option.elem ? function () {
        self.elem = self.option.elem;
      }() : function () {
        throw "缺少elem节点选择器";
      }();
      self.triggerType = self.option.triggerType === "change" ? "mouseenter" : "click";
      self.changeOnSelect = self.option.changeOnSelect || false; // 判断data参数

      if (self.option.data) {
        self.d = self.option.data;
        self.callback();
        return;
      } // 判断url参数


      if (self.option.url) {
        $.ajax({
          url: self.option.url,
          type: self.option.type ? self.option.type : "get",
          data: self.option.where ? self.option.where : {},
          success: function success(data) {
            if (data.Code === 0) {
              self.d = data.Data;
              self.callback();
              return;
            }

            layer.alert(data.Msg, {
              title: "选择器" + self.elem + "获取数据失败",
              icon: 2
            });
          }
        });
        return;
      }

      throw "选择器" + self.elem + "缺少data或url参数";
    },
    // 初始化容器和标签
    init: function init() {
      $(this.elem).after('<i class="layui-icon layui-icon-down"></i>');
      $(this.elem).after('<div class="urp-cascader-content"></div>');
    },
    // 初始化第一层
    initFirst: function initFirst() {
      var string = laytpl('<ul class="urp-cascader-child">' + '{{# for(var i=0;i<d.length;i++){ }}' + '<li>{{ d[i].label }}<i class="layui-icon layui-icon-right" ></i></li>' + '{{# } }}' + '</ul>').render(this.d);
      $(this.elem).siblings(".urp-cascader-content").append(string);
      this.domContent = $(this.elem).siblings(".urp-cascader-content");
      this.domContent.find(".urp-cascader-child").hide(); // 显示隐藏第一层的标签

      for (var i = 0; i < this.d.length; i++) {
        "children" in this.d[i] ? this.domContent.find("ul.urp-cascader-child li").eq(i).find("i").show() : this.domContent.find("ul.urp-cascader-child li").eq(i).find("i").hide();
      }
    },
    // 获取当前点击的当前面板的数据
    getBlockData: function getBlockData(event, el) {
      event.stopPropagation();
      this.floor = $(el).parent().index(); // 当前点击的是第几层

      var index = $(el).index(); // 当前点击的是这一层的第几个

      this.positionArr.length = this.floor;
      this.positionArr.push(index); // 等同下方注释

      this.blockData = this.d[this.positionArr[0]];

      for (var i = 1; i <= this.floor; i++) {
        this.blockData = this.blockData["children"][this.positionArr[i]];
      } // switch (floor) {
      //     case 0:
      //         blockData=d[arr[0]];
      //         break;
      //     case 1:
      //         blockData=d[arr[0]]["children"][arr[1]];
      //         break;
      //     case 2:
      //         blockData=d[arr[0]]["children"][arr[1]]["children"][arr[2]];
      //         break;
      //     case 3:
      //         blockData=d[arr[0]]["children"][arr[1]]["children"][arr[2]]["children"][arr[3]];
      //         break;
      //     default:
      //         break;
      // }

    },
    // 若有第二层则初始化第二层
    initChild: function initChild(triggerData) {
      // 删除后面的面板
      this.domContent.find(".urp-cascader-child:gt(" + this.floor + ")").remove(); // 获取text值

      this.textArr.length = this.floor;
      this.textArr.push(this.blockData.label);
      this.valueArr.length = this.floor;
      this.valueArr.push(this.blockData.value);
      var string = laytpl('<ul class="urp-cascader-child">' + '{{# for(var i=0;i< d.length;i++){ }}' + '<li>{{ d[i].label }}<i class="layui-icon layui-icon-right"></i></li>' + '{{# } }}' + '</ul>').render(this.blockData["children"]);
      this.domContent.append(string); // 显示隐藏第二层的标签

      for (var i = 0; i < this.blockData["children"].length; i++) {
        "children" in this.blockData["children"][i] ? this.domContent.find("ul.urp-cascader-child:gt(" + this.floor + ")").find("li").eq(i).find("i").show() : this.domContent.find("ul.urp-cascader-child:gt(" + this.floor + ")").find("li").eq(i).find("i").hide();
      }

      if (this.changeOnSelect) {
        // 文本拼接
        this.textStr = this.textArr.join("/");
        $(this.elem).val(this.textStr);
        if (triggerData !== "initValue" && this.option.success) this.option.success(this.valueArr, this.textArr);
      }
    },
    // 结束之后拿取数据
    finishInitData: function finishInitData(triggerData) {
      this.domContent.find(".urp-cascader-child:gt(" + this.floor + ")").remove();
      this.textArr.length = this.floor;
      this.textArr.push(this.blockData.label);
      this.valueArr.length = this.floor;
      this.valueArr.push(this.blockData.value); // 文本拼接

      this.textStr = this.textArr.join("/");
      this.option.showLastLevels ? $(this.elem).val(this.textArr[this.textArr.length - 1]) : $(this.elem).val(this.textStr);
      this.onOff = false;
      $(this.elem).siblings(".urp-cascader-content").find("ul").slideUp(100);
      $(this.elem).siblings("i").replaceWith('<i class="layui-icon layui-icon-down"></i>'); // 如果有初始值，则第一次不回调

      if (triggerData !== "initValue" && this.option.success) this.option.success(this.valueArr, this.textArr); // this.count++;
      // if($.isArray(this.option.value) && this.option.value.length>0 && this.count===1 && this.option.success){
      //     return;
      // }
      // if(this.option.success) this.option.success(this.valueArr,this.textArr);
    },
    // 赋初值
    initValue: function initValue() {
      var self = this;
      $.isArray(this.option.value) && this.option.value.length > 0 ? function () {
        var value = self.option.value;
        $(self.elem).trigger("click");
        var arrr = []; // 保存当前在data中的位置

        var data = self.d; // 需要遍历的子数组
        // 等同于下面的注释

        value.forEach(function (val, index) {
          // console.log(data);
          if (!data) throw "选择器" + self.elem + "初始化数据不匹配";

          for (var i = 0; i < data.length; i++) {
            if (data[i].value == val) {
              arrr.push(i);
              self.domContent.find(".urp-cascader-child").eq(index).find("li").eq(i).trigger(self.triggerType, "initValue");
              $(self.elem).siblings(".urp-cascader-content").find("ul").finish(); // 停止当前正在运行的动画
            }
          } // 先判断数据是否存在，即是否有相匹配的数据


          data[arrr[index]] ? function () {
            data = data[arrr[index]].children;
          }() : function () {
            throw "选择器" + self.elem + "初始化数据不匹配";
          }();
        }); // for(var i=0;i<d.length;i++){
        //     if(d[i].value==value[0]){
        //         arrr.push(i);
        //         obj.domContent.find(".urp-cascader-child").eq(0).find("li").eq(i).trigger(triggerType);
        //     }
        // }
        // for(var i=0;i<d[arrr[0]].children.length;i++){
        //     if(d[arrr[0]].children[i].value==value[1]){
        //         arrr.push(i)
        //         obj.domContent.find(".urp-cascader-child").eq(1).find("li").eq(i).trigger(triggerType);
        //     }
        // }
        // for(var i=0;i<d[arrr[0]].children[arrr[1]].children.length;i++){
        //     if(d[arrr[0]].children[arrr[1]].children[i].value==value[2]){
        //         obj.domContent.find(".urp-cascader-child").eq(2).find("li").eq(i).trigger(triggerType);
        //     }
        // }
      }() : "";
    },
    callback: function callback() {
      // 初始化第一层
      this.init();
      this.initFirst();
      var self = this; // Cascader对象
      // 每层点击时绑定事件

      self.domContent.on(self.triggerType, ".urp-cascader-child li", function (event, triggerData) {
        var _self = this; // 点击的对象


        self.getBlockData(event, this);
        $(this).addClass("active").siblings("li").removeClass("active"); // 判断当前是否存在子层

        "children" in self.blockData ? // 初始化子层
        self.initChild(triggerData) : // 判断触发方式
        self.triggerType === "mouseenter" ? function () {
          self.domContent.find(".urp-cascader-child:gt(" + self.floor + ")").remove(); // click事件先解除再定义，防止多次定义

          $(_self).off("click").on("click", function () {
            self.finishInitData();
          }); // 赋初值时若为change则需要触发上方函数(判断是否是通过赋初值方式触发)

          if (triggerData === "initValue") {
            $(_self).trigger("click");
          }
        }() : self.finishInitData(triggerData);
      }); // input点击显示隐藏

      $(self.elem).on("click", function () {
        self.onOff = !self.onOff;
        zIndex++;

        if (self.onOff) {
          $(self.elem).siblings(".urp-cascader-content").find("ul").slideDown(100);
          $(self.elem).siblings("i").replaceWith('<i class="layui-icon layui-icon-up"></i>');
          self.domContent.css("zIndex", zIndex);
        } else {
          $(self.elem).siblings(".urp-cascader-content").find("ul").slideUp(100);
          $(self.elem).siblings("i").replaceWith('<i class="layui-icon layui-icon-down"></i>');
        }
      }); // 点击外层文档隐藏

      $(document).on("click", function (event) {
        if (event.target.isEqualNode($(self.elem).get(0))) return;
        self.onOff = false;

        if (!self.onOff) {
          $(self.elem).siblings(".urp-cascader-content").find("ul").slideUp(100);
          $(self.elem).siblings("i").replaceWith('<i class="layui-icon layui-icon-down"></i>');
        }
      });
      self.initValue();
    }
  };
  exports('cascader', function (option) {
    new Cascader(option);
  });
});