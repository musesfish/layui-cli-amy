"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

;
layui.define(['jquery'], function (exports) {
  var $ = layui.jquery;
  /**
   * 人员选择
   * @param {object} v - 视图窗口
   * @param {object} func - 回调方法对象，根据data-func匹配
   * @query count - 可以选择人员的数量
   * @query all=1 - 可以选择所有人
   * @query r - 权限角色id
   * @query c - 权限客户id
   * @query p - 分公司id
   */

  function init(v, func) {
    v.on('click', '.j-sel-personnel', function () {
      var that = this,
          name = $(this).data('name'),
          conUrl = '/app/views/component/personnel.html',
          count = $(this).data('count'),
          all = $(this).data('all'),
          // roleId = $(this).data("role"),
      // customerId = $(this).data("customer"),
      // companyId = $(this).data("company"),
      callback = $(this).data('func'),
          query = [];
      typeof count === 'undefined' ? '' : query.push('count=' + count);
      typeof all === 'undefined' ? '' : query.push('all=1'); // typeof roleId === 'unedefined'? '': query.push('r='+roleId);
      // typeof customerId === 'unedefined'?'':query.push(`c=${customerId}`);
      // typeof companyId === 'unedefined' ? '' : query.push(`c=${companyId}`);

      conUrl = conUrl + "?" + query.join("&");
      bindEvent(conUrl, {
        yes: function yes(index, dom) {
          if (_typeof(func) === 'object' && func.hasOwnProperty('callback')) {
            func[callback](index, dom);
          } else {
            var frame = top.layer.getChildFrame('#select2', index);
            var data = []; // value值数据

            var dataName = []; // label值数组

            $(frame).children().each(function (index, item) {
              data.push($(this).data('value'));
              dataName.push($(this).data('label'));
            });
            $(that).val(dataName.join(","));
            var input = $(that).parent().find("input[name='" + name + "']") || null;
            if (_typeof(input) === 'object') input.val(data.join(","));
            typeof func === 'function' && func(data);
            top.layer.close(index);
          }
        }
      });
    });
  }
  /**
   * 载入人员控件
   * @param {*} url - 页面模板
   * @param {*} opt - tree的options
   */


  function bindEvent(url, opt) {
    var defaults = {
      type: 2,
      title: '请选择',
      content: url,
      area: ['638px', '690px'],
      btn: ['确定', '清除', '取消'],
      btnAlign: 'c',
      offset: 'auto',
      shadeClose: 1,
      btn2: function btn2(index) {
        top.layer.getChildFrame("#select2", index).html("");
        return false;
      }
    };
    Object.assign(defaults, opt || {});
    layui.renders.con(defaults);
  }

  exports('selPersonnel', {
    init: init,
    bind: bindEvent
  });
});