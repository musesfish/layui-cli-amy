"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

;
layui.define(['setter'], function (exports) {
  var setter = layui.setter;
  var API = setter[setter.runServeType].apis;
  var RESOURCE = setter[setter.runServeType].resource;
  var UPLOADPATH = setter[setter.runServeType].upload;
  var sessionApis = sessionStorage.getItem('apis');

  if (location.hostname !== 'admin.jbhoa.cn' && sessionApis) {
    API = sessionApis;
  }
  /**
   * 数据处理模块
   */


  exports('api', {
    apis: API,
    resouce: RESOURCE,
    upload: UPLOADPATH,
    // 获取当前时间
    getNowDate: function getNowDate() {
      var t = new Date();
      return "".concat(t.getFullYear(), "-").concat(this.markZero(t.getMonth() + 1, 2), "-").concat(this.markZero(t.getDate(), 2));
    },
    // 获取url参数
    getParams: function getParams() {
      var str = self.location.href;
      var url = decodeURI(str);

      try {
        var index = url.indexOf('?');
        url = url.match(/\?([^#]+)/)[1];
        var obj = {},
            arr = url.split('&');

        for (var i = 0; i < arr.length; i++) {
          var subArr = arr[i].split('=');
          obj[subArr[0]] = subArr[1];
        }

        return obj;
      } catch (err) {
        return {};
      }
    },
    //时间格式化
    Format: function Format(fmt) {
      var o = {
        "M+": this.getMonth() + 1,
        //月份 
        "d+": this.getDate(),
        //日 
        "H+": this.getHours(),
        //小时 
        "m+": this.getMinutes(),
        //分 
        "s+": this.getSeconds(),
        //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3),
        //季度 
        "S": this.getMilliseconds() //毫秒 

      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));

      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }

      return fmt;
    },
    // 获取登录用户信息
    getUserInfo: function getUserInfo() {
      return top.layui.data(setter.tableName);
    },
    setUserInfo: function setUserInfo() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var topLayui = top.layui;
      var userInfo = Object.assign(topLayui.api.getUserInfo(), data);
      topLayui.store.set(topLayui.setter.tableName, userInfo, topLayui.setter.expires);
      topLayui.$(".layui-layout-right .user-avatar").prop('src', userInfo.headImgUrl ? "".concat(topLayui.api.resouce, "/").concat(userInfo.headImgUrl) : '');
      topLayui.$(".layui-layout-right .user-name").text(userInfo.userName);
    },
    getToken: function getToken() {
      return "token=" + top.layui.data(setter.tableName).token + "&userId=" + top.layui.data(setter.tableName).userId;
    },
    getFileHost: function getFileHost() {
      return RESOURCE;
    },
    getApi: function getApi(url) {
      if (url.indexOf('/proxy') === 0) return url;

      var _url = typeof this.api[url] == 'undefined' ? url : this.api[url];

      return API + _url + "?token=" + top.layui.data(setter.tableName).token + "&userId=" + top.layui.data(setter.tableName).userId;
    },
    getApi_app: function getApi_app(url) {
      var _url = typeof this.api[url] == 'undefined' ? url : this.api[url];

      return API + _url + "?token=" + top.layui.data(setter.tableName).token + "&ptUserId=" + top.layui.data(setter.tableName).userId;
    },
    getUploadPath: function getUploadPath(url) {
      return UPLOADPATH + "/api/other/file/upload" + "?token=" + top.layui.data(setter.tableName).token + "&userId=" + top.layui.data(setter.tableName).userId;
    },
    // 关闭当前弹窗
    closePopWin: function closePopWin() {
      top.layer.close(top.layer.getFrameIndex(window.name));
    },

    /**
     * 将传入的数据转换成需要的格式
     * @param {json} d - 传入的数据 
     * @param {json} c - 对应结构的数据，值是类型 
     */
    convertToForm: function convertToForm(d, c) {
      if (d == null) return null;
      var c = c || {};

      for (var i in d) {
        d[i] = this.convertToFormFunc(d[i], c[i]);
      }

      return d;
    },
    convertToFormFunc: function convertToFormFunc(d, c) {
      if (_typeof(d) === 'object' && !Array.isArray(d)) {
        return this.convertToForm(d, c);
      } // 值为null返回空


      if (d == null) return null;

      switch (c) {
        case 'date':
          d = d.split(' ')[0];
          break;

        case 'month':
          var date = new Date(d);
          d = date.getFullYear() + "-" + (date.getMonth() + 1);
          d = d.replace(/\//g, '-');
          break;
      }

      return d;
    },
    //把时间格式字符串拆成数组（'2020-01~2020-05,2019-01~2019~05' > [2020-01,2019-01]）
    transTime: function transTime(str) {
      var arr = [];
      var arr1 = [];

      if (str) {
        if (str.indexOf(",") != -1) {
          var timearr = str.split(',');

          for (var i = 0; i < timearr.length; i++) {
            arr.push(timearr[i].split('~')[0]);
            arr1.push(timearr[i].split('~')[1]);
          }
        } else {
          arr.push(str.split('~')[0]);
          arr1.push(str.split('~')[1]);
        }
      }

      var obj = {
        start: arr,
        end: arr1
      };
      return obj;
    },
    //数组对象中抽数组
    arrTransTime: function arrTransTime(array) {
      var arr = [];
      var arr1 = [];

      if (array.length != 0) {
        var _iterator = _createForOfIteratorHelper(array),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var i = _step.value;
            arr.push(i.startDate);
            arr1.push(i.endDate);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      var obj = {
        start: arr,
        end: arr1
      };
      return obj;
    },
    //时间排序取最小
    sortTimeMin: function sortTimeMin(date) {
      var arr = [];

      var _iterator2 = _createForOfIteratorHelper(date),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var v = _step2.value;
          arr.push(new Date(v).getTime());
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return arr.sort()[0];
    },
    //时间排序取最大
    sortTimeMax: function sortTimeMax(date) {
      var arr = [];

      var _iterator3 = _createForOfIteratorHelper(date),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var v = _step3.value;
          arr.push(new Date(v).getTime());
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return arr.sort()[arr.sort().length - 1];
    },

    /**
     * 过滤lay-submit提交表单的数据
     * @param {object} d - 表单的数据 
     * @param {Array|String|RegExp} k - 过滤的键值
     */
    deleteFieldName: function deleteFieldName(d, k) {
      var d = d || {};
      var rd = {};
      if (d.hasOwnProperty("field")) d = d.field;
      var isReg = _typeof(k) === 'object' && !Array.isArray(k) ? 1 : 0;
      var k = k;

      switch (isReg) {
        case 0:
          k = Array.isArray(k) ? k : k.split(',');

          for (var i in d) {
            if (k.indexOf(i) == -1) rd[i] = d[i];
          }

          break;

        case 1:
          for (var i in d) {
            if (!k.test(i)) rd[i] = d[i];
          }

          break;
      }

      return rd;
    },

    /* 
     * 导出数据的格式改变 才能正确导出
     * 字符串有 ‘ ，’ 的需替换掉
     * 数字的位数太多的需加上 ‘\t’ 
    */
    exportChange: function exportChange(item) {
      if (item != null && item != undefined) {
        item = item.toString();

        if (item.indexOf(',') != -1) {
          item = item.replace(/,/g, '、');
        }

        if (item.indexOf("\n") >= 0) {
          item = item.replace(/\n/g, '');
        }

        item = '\t' + item;
      }

      return item;
    },

    /* 
     * 转换时间格式
     * @parsm t: <string> 日期
     * @param f: <string> 转换的类型
    */
    formatDate: function formatDate(t, f) {
      var newt;
      var t = new Date();

      switch (f) {
        case 'yyyy-mm':
          newt = t.getFullYear() + "-" + this.markZero(t.getMonth() + 1, 2);
          break;
      }

      return newt;
    },

    /* 
     * 对象数组去重
     * 根据每一个子项对象的id属性去重
     * [{id:'123'},{id:"123"}] ==> [{id: '123'}]
    */
    unique: function unique(arr) {
      if (arr.length <= 1) return arr;
      var res = [arr[0]];

      for (var i = 1; i < arr.length; i++) {
        var repeat = false;

        for (var j = 0; j < res.length; j++) {
          if (arr[i].id == res[j].id) {
            repeat = true;
            break;
          }
        }

        if (!repeat) {
          res.push(arr[i]);
        }
      }

      return res;
    },
    // 数组去重
    uniq: function uniq(array) {
      var temp = [];

      for (var i = 0; i < array.length; i++) {
        //如果当前数组的第i项在当前数组中第一次出现的位置是i，才存入数组；否则代表是重复的
        if (array.indexOf(array[i]) == i) {
          temp.push(array[i]);
        }
      }

      return temp;
    },

    /**
     * 过滤提交表单的空值
     * @param {object} data - 数据
     * @param {node} opt.view  - 视图节点对象
     * @param {boolean} opt.date  - 转化laydate, data-range组件的日期数据 string => datetime
     * @param {boolean} opt.dates - 转化格式为 yyyymmss
     * @param {string|array} opt.filter - 移除过滤的值, 优先级高于unFilter
     * @param {String||Array||Boolean} opt.unFilter - 仅保留对应的值, undefined、null类型赋值为'', 值为 true保留所有
     * @example
     * api.filterDate({a: null, b: null}) // { a: '', b: '' }
     * api.filterDate({a: null, b: null}, { filter: ['a'] }) // { b: '' }
     * api.filterDate({a: null, b: null}, { unFilter: ['a'] }) // { a: '' }
     */
    filterData: function filterData(data, opt) {
      var $ = layui.jquery,
          opt = opt || {},
          _data = {},
          filter = typeof opt.filter === 'string' ? [opt.filter] : Array.isArray(opt.filter) ? opt.filter : [],
          unFilter = typeof opt.unFilter === 'string' ? [opt.unFilter] : Array.isArray(opt.unFilter) ? opt.unFilter : typeof opt.unFilter === 'boolean' ? opt.unFilter : false,
          tempFiled; // 循环时临时存放变量值用

      if (filter.indexOf("provinceCode") > -1) delete filter[filter.indexOf("provinceCode")];

      for (var i in data) {
        if (filter.includes(i)) continue;else {
          var _data$i;

          tempFiled = (_data$i = data[i]) !== null && _data$i !== void 0 ? _data$i : "";

          if (Array.isArray(unFilter)) {
            if (unFilter.includes(i)) _data[i] = tempFiled;
          } else {
            if (typeof unFilter === 'boolean') {
              if (unFilter) _data[i] = tempFiled;else {
                if (tempFiled || tempFiled === 0) _data[i] = tempFiled;
              }
            }
          }
        }
      }

      if (opt != undefined && opt.date) {
        opt.view.find('.laydate').each(function () {
          var k = $(this).prop('name');

          if (_data.hasOwnProperty(k)) {
            _data[k] = new Date(_data[k]);
          }
        });
        opt.view.find(".date-range-item").each(function () {
          var start = $(this).data().start;
          var end = $(this).data().end;

          if (_data.hasOwnProperty(start)) {
            _data[start] = new Date(_data[start]);
            _data[end] = new Date(_data[end]);
          }
        });
      }

      if (opt != undefined && opt.dates) {
        opt.view.find('.laydate').each(function () {
          var k = $(this).prop('name');

          if (_data.hasOwnProperty(k)) {
            _data[k] = _data[k].replace(/-/g, '/');
          }
        });
        opt.view.find(".date-range-item").each(function () {
          var start = $(this).data().start;
          var end = $(this).data().end;

          if (_data.hasOwnProperty(start)) {
            _data[start] = _data[start].replace(/-/g, '/');
            _data[end] = _data[end].replace(/-/g, '/');
          }
        });
      }

      return _data;
    },

    /* 
     * 转化两层结构的JSON数据为键值对类型 { base: { userName } } => { base.userName }
     * 数组类型不转换
     * 第二个形参传如为不转化的数据键值数组
     */
    conversionDate: function conversionDate(data, key) {
      var retData = {};
      var key = key || [];

      for (var i in data) {
        if (data[i] instanceof Array) {
          retData[i] = data[i];
          continue;
        }

        if (key.indexOf(i) >= 0) {
          retData[i] = data[i];
          continue;
        }

        for (var j in data[i]) {
          retData[i + "_" + j] = data[i][j];
        }
      }

      return retData;
    },

    /**
     * 将base_*数据转化为json数据
     * @param {*} data 原始数据
     */
    spliceDate: function spliceDate(data) {
      var _data = {};

      for (var i in data) {
        fn(i);
      }

      function fn(k) {
        var a = k.split('_');
        var b = a[0];

        if (a.length > 1) {
          if (_data[b] === undefined) {
            _data[b] = {};
          }

          if (data[k] !== null && data[k] !== '' && data[k] !== undefined) {
            _data[b][a[1]] = data[k];
          }
        } else {
          if (data[k] !== null && data[k] !== '' && data[k] !== undefined) {
            _data[b] = data[k];
          }
        }
      }

      return _data;
    },

    /* 
     * 用户表格日期数据的处理，“9999-12-31 hh:mm:ss”直接转化为“永远”
     * 默认输出 yyyy-mm-dd 
     * 可以选择数据 yyyy-mm
     */
    splitTimeDate: function splitTimeDate(d, t) {
      if (/^(9999\-12\-31|9999\/12\/31)(|\s\d{1,2}:\d{1,2}:\d{1,2})$/.test(d)) {
        return '永久';
      }

      if (t === "yyyy-mm" || t === 'month') {
        if (d == undefined) return '';

        var _d = new Date(d);

        return _d.getFullYear() + "-" + (_d.getMonth() + 1);
      }

      return d == null || d == undefined ? '' : d.split(' ')[0];
    },
    getContractData: function getContractData(start, end) {
      return new Date(end).getFullYear() - new Date(start).getFullYear();
    },
    getContractEnd: function getContractEnd(start, year) {
      var time = start.split('-');
      time[0] = parseInt(time[0]) + year;
      return time.join('-');
    },

    /* 
     * 导出文件
     * @param opt.url: 接口地址
     * @param opt.data: 接受表单数据
    */
    exportFile: function exportFile(opt) {
      var $ = layui.jquery;
      var formData = this.filterData(opt.data);
      var form = $("<form></form>");
      form.attr('style', 'display:none');
      form.attr('target', '');
      form.attr('method', 'post');
      form.attr('action', this.getApi(opt.url));
      console.log("%c导出表单的条件参数", 'color:green', formData);

      for (var i in formData) {
        appendForm(i, formData[i]);
      }

      function appendForm(name, value) {
        var input1 = $("<input>");
        input1.attr('type', 'hidden');
        input1.attr('name', name);
        input1.val(value);
        form.append(input1);
      }

      $("body").append(form);
      form.submit();
      layer.closeAll('loading');
      form.remove();
    },

    /* 
     * 导入文件
     * 需要引用  upload,table,renders 模块
     * @param opt.elem : js节点
     * @param opt.url: 请求地址
     * @praam opt.table <object>: 刷新的table
     * @praam callback: 回调
    */
    importFile: function importFile(opt) {
      var __timer = null;
      var __timer_before = null;
      var upload = layui.upload;
      var renders = layui.renders;
      var table = layui.table;
      var tipsInd = null;
      var _opt = {
        elem: opt.elem,
        url: this.getApi(opt.url),
        method: 'POST',
        accept: 'file',
        acceptMime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
        exts: 'xlsx|xls',
        drag: true,
        before: function before() {
          tipsInd = top.layer.msg("数据正在导入中,请勿关闭网页或刷新网页", {
            shade: 0.3,
            icon: 0,
            time: 0
          });
        },
        done: function done(res) {
          clearTimeout(__timer_before);
          __timer_before = setTimeout(function () {
            top.layer.close(tipsInd);
            var errRow = res.errorRow || [];

            if (res.ret == 100) {
              var html = '';

              for (var i = 0, len = errRow.length; i < len; i++) {
                html += "<p>" + errRow[i] + "</p>";
              }

              if (typeof opt.table == 'string') {
                table.reload(opt.table);
              } else {
                opt.table && opt.table.reload();
              }

              top.layer.alert(res.msg, {
                icon: 1,
                skin: 'layer-theme-default',
                area: ['480px', 'auto'],
                btnAlign: 'c'
              }, function (index) {
                top.layer.close(index);

                if (res.errorRow.length > 0) {
                  renders.con({
                    type: 1,
                    title: res.data || '导入失败数据行',
                    shadeClose: 1,
                    content: '<div class="pad-30">' + html + '</div>',
                    area: ['500px', '500px']
                  });
                }

                opt.callback && opt.callback();
              });
            } else {
              renders.fail(res.errorMsg || res.msg || "系统错误，请刷新重试");
            }
          }, 1200);
        },
        error: function error() {
          console.log(arguments);
        }
      };
      upload.render(_opt);
    },
    importFile_public: function importFile_public(opt) {
      var upload = layui.upload;
      var renders = layui.renders;
      var table = layui.table;
      var tipsInd = null;
      var _opt = {
        elem: opt.elem,
        url: this.getApi(opt.url),
        method: 'POST',
        accept: 'file',
        acceptMime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
        exts: 'xlsx|xls',
        drag: true,
        before: function before() {
          tipsInd = top.layer.msg("数据正在导入中,请勿关闭网页或刷新网页", {
            shade: 0.3,
            icon: 0,
            time: 0
          });
        },
        done: function done(res) {
          top.layer.close(tipsInd);
          var errRow = res.errorRow || [];

          if (res.ret == 100) {
            if (typeof opt.table == 'string') {
              table.reload(opt.table);
            } else {
              opt.table && opt.table.reload();
            }

            if (res.data) {
              typeof res.data === 'string' && renders.con({
                type: 0,
                title: '提醒',
                shadeClose: 1,
                content: '<div>' + res.data + '</div>',
                area: ['420px', '280px'],
                btn: '知道了',
                btnAlign: 'c' //按钮居中

              });
              return false;
            }

            if (res.dataList == null) {
              _typeof(renders.con({
                type: 0,
                title: '提醒',
                offset: 'auto',
                shadeClose: 1,
                content: '<div style="padding: 20px 0 20px 0;text-align:center">' + '导入成功' + '</div>',
                area: ['420px'],
                btn: '知道了',
                btnAlign: 'c' //按钮居中

              }));
            }

            if (res.dataList && res.dataList != null) {
              _typeof(renders.con({
                type: 0,
                title: '提醒',
                offset: 'auto',
                shadeClose: 1,
                content: '<div style="padding: 20px 0 20px 0;text-align:center">' + res.dataList + '</div>',
                area: ['420px'],
                btn: '知道了',
                btnAlign: 'c' //按钮居中

              }));
            }

            opt.callback && opt.callback(res);
          } else {
            top.layer.alert(res.errorMsg || res.msg || '系统错误，请刷新重试', {
              icon: 2
            });
          }
        }
      };
      upload.render(_opt);
    },
    // 价格补.00
    addZero: function addZero(num) {
      num = String(num);

      if (Object.is(num, 'null')) {
        return '0.00';
      } else if (num.indexOf('.') == -1) {
        return num + '.00';
      } else {
        if (num.split('.')[1].length == 1) return num + '0';else return num;
      }
    },
    // 补零
    markZero: function markZero(n, len) {
      var n = (n / Math.pow(10, len)).toFixed(len) + "";
      len = len == null ? 2 : len;
      return n.substr(n.indexOf('.') + 1);
    },
    // 更新通知数目
    updateNoticeTips: function updateNoticeTips() {
      var $ = layui.jquery;
      layui.ajax({
        url: "/notice/getUnreadNotice",
        data: {
          state: 1
        },
        callback: function callback(res) {
          var wrap = $('.u-tips-message-wrap'),
              wraps = $(".u-tips-message-wrap-animate");
          var html = [];
          wrap.find("span").remove();

          if (res.data > 0) {
            wraps.html('您有' + res.data + '条未读消息！');

            if (res.data >= 100) {
              html.push('<span class="layui-badge-dot"></span>');
            } else {
              html.push('<span class="u-tips-message">' + res.data + '</span>');
            }
          } else {
            wraps.html('');
          }

          wrap.append(html.join(''));
        }
      });
    },

    /**
     * 服务状态 文本颜色
     * @param {object|string} d - 表格行数据/code
     * @param {json} opt 配置
     */
    getServiceStateText: function getServiceStateText(d, opt) {
      var _opt = _objectSpread({
        key: "customerState",
        // 键值，默认 customerState
        "return": 'html'
      }, opt);

      var key = _opt.key;
      var className = '';
      var text = '';
      var code = _typeof(d) === 'object' ? d[key] : d;

      switch (String(code)) {
        case "0":
          className = "";
          text = "交接中";
          break;

        case "10":
          className = "service-status-in";
          text = "服务中";
          break;

        case "20":
          className = "service-status-abnormal";
          text = "异常中";
          break;

        case "30":
          className = "service-status-abnormal-end";
          text = "异常完结";
          break;

        case "40":
          className = "service-status-churn";
          text = "流失中";
          break;

        case "50":
          className = "service-status-churn-end";
          text = "流失完结";
          break;
      }

      if (_opt["return"] === 'html') {
        return "<div><span class=\"".concat(className, "\">").concat(text, "</span></div>");
      } else {
        return text;
      }
    },

    /**
     * 拼接url链接
     * @param {string} url 
     * @param {json} query  
     */
    getUrl: function getUrl(url, query) {
      var url_arr = url.split("?");
      var url_query = url_arr[1] || '';
      url_query = encodeURIComponent(url_query);

      if (Object.prototype.toString.call(query) === '[object Object]') {
        for (var i in query) {
          url_query += "".concat(i, "=").concat(encodeURIComponent(query[i]), "&");
        }
      }

      return "".concat(encode, "?").concat(url_query.replace(/\&$/, ''));
    },

    /**
     * 设置为查看状态
     * @param {*} param0 elem: 容器 state: 禁用状态 
     */
    setStateToLook: function setStateToLook(_ref) {
      var _ref$elem = _ref.elem,
          elem = _ref$elem === void 0 ? document.body : _ref$elem,
          _ref$state = _ref.state,
          state = _ref$state === void 0 ? true : _ref$state,
          _ref$attribute = _ref.attribute,
          attribute = _ref$attribute === void 0 ? "readonly" : _ref$attribute;
      layui.jquery(elem).find('textarea, input, select').prop(attribute, state);
    },
    api: {
      "login": "xxx",
      "upfile": "xxx" // 上传文件

    },
    errLog: '',
    //错误日志收集地址,仅上线后会使用，填写完整的线上地址
    login: {}
  });
});