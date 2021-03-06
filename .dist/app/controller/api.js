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
   * ??????????????????
   */


  exports('api', {
    apis: API,
    resouce: RESOURCE,
    upload: UPLOADPATH,
    // ??????????????????
    getNowDate: function getNowDate() {
      var t = new Date();
      return "".concat(t.getFullYear(), "-").concat(this.markZero(t.getMonth() + 1, 2), "-").concat(this.markZero(t.getDate(), 2));
    },
    // ??????url??????
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
    //???????????????
    Format: function Format(fmt) {
      var o = {
        "M+": this.getMonth() + 1,
        //?????? 
        "d+": this.getDate(),
        //??? 
        "H+": this.getHours(),
        //?????? 
        "m+": this.getMinutes(),
        //??? 
        "s+": this.getSeconds(),
        //??? 
        "q+": Math.floor((this.getMonth() + 3) / 3),
        //?????? 
        "S": this.getMilliseconds() //?????? 

      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));

      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }

      return fmt;
    },
    // ????????????????????????
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
    // ??????????????????
    closePopWin: function closePopWin() {
      top.layer.close(top.layer.getFrameIndex(window.name));
    },

    /**
     * ??????????????????????????????????????????
     * @param {json} d - ??????????????? 
     * @param {json} c - ???????????????????????????????????? 
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
      } // ??????null?????????


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
    //???????????????????????????????????????'2020-01~2020-05,2019-01~2019~05' > [2020-01,2019-01]???
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
    //????????????????????????
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
    //?????????????????????
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
    //?????????????????????
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
     * ??????lay-submit?????????????????????
     * @param {object} d - ??????????????? 
     * @param {Array|String|RegExp} k - ???????????????
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
     * ??????????????????????????? ??????????????????
     * ???????????? ??? ?????? ???????????????
     * ????????????????????????????????? ???\t??? 
    */
    exportChange: function exportChange(item) {
      if (item != null && item != undefined) {
        item = item.toString();

        if (item.indexOf(',') != -1) {
          item = item.replace(/,/g, '???');
        }

        if (item.indexOf("\n") >= 0) {
          item = item.replace(/\n/g, '');
        }

        item = '\t' + item;
      }

      return item;
    },

    /* 
     * ??????????????????
     * @parsm t: <string> ??????
     * @param f: <string> ???????????????
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
     * ??????????????????
     * ??????????????????????????????id????????????
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
    // ????????????
    uniq: function uniq(array) {
      var temp = [];

      for (var i = 0; i < array.length; i++) {
        //????????????????????????i????????????????????????????????????????????????i?????????????????????????????????????????????
        if (array.indexOf(array[i]) == i) {
          temp.push(array[i]);
        }
      }

      return temp;
    },

    /**
     * ???????????????????????????
     * @param {object} data - ??????
     * @param {node} opt.view  - ??????????????????
     * @param {boolean} opt.date  - ??????laydate, data-range????????????????????? string => datetime
     * @param {boolean} opt.dates - ??????????????? yyyymmss
     * @param {string|array} opt.filter - ??????????????????, ???????????????unFilter
     * @param {String||Array||Boolean} opt.unFilter - ?????????????????????, undefined???null???????????????'', ?????? true????????????
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
          tempFiled; // ?????????????????????????????????

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
     * ?????????????????????JSON???????????????????????? { base: { userName } } => { base.userName }
     * ?????????????????????
     * ??????????????????????????????????????????????????????
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
     * ???base_*???????????????json??????
     * @param {*} data ????????????
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
     * ???????????????????????????????????????9999-12-31 hh:mm:ss??????????????????????????????
     * ???????????? yyyy-mm-dd 
     * ?????????????????? yyyy-mm
     */
    splitTimeDate: function splitTimeDate(d, t) {
      if (/^(9999\-12\-31|9999\/12\/31)(|\s\d{1,2}:\d{1,2}:\d{1,2})$/.test(d)) {
        return '??????';
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
     * ????????????
     * @param opt.url: ????????????
     * @param opt.data: ??????????????????
    */
    exportFile: function exportFile(opt) {
      var $ = layui.jquery;
      var formData = this.filterData(opt.data);
      var form = $("<form></form>");
      form.attr('style', 'display:none');
      form.attr('target', '');
      form.attr('method', 'post');
      form.attr('action', this.getApi(opt.url));
      console.log("%c???????????????????????????", 'color:green', formData);

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
     * ????????????
     * ????????????  upload,table,renders ??????
     * @param opt.elem : js??????
     * @param opt.url: ????????????
     * @praam opt.table <object>: ?????????table
     * @praam callback: ??????
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
          tipsInd = top.layer.msg("?????????????????????,?????????????????????????????????", {
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
                    title: res.data || '?????????????????????',
                    shadeClose: 1,
                    content: '<div class="pad-30">' + html + '</div>',
                    area: ['500px', '500px']
                  });
                }

                opt.callback && opt.callback();
              });
            } else {
              renders.fail(res.errorMsg || res.msg || "??????????????????????????????");
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
          tipsInd = top.layer.msg("?????????????????????,?????????????????????????????????", {
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
                title: '??????',
                shadeClose: 1,
                content: '<div>' + res.data + '</div>',
                area: ['420px', '280px'],
                btn: '?????????',
                btnAlign: 'c' //????????????

              });
              return false;
            }

            if (res.dataList == null) {
              _typeof(renders.con({
                type: 0,
                title: '??????',
                offset: 'auto',
                shadeClose: 1,
                content: '<div style="padding: 20px 0 20px 0;text-align:center">' + '????????????' + '</div>',
                area: ['420px'],
                btn: '?????????',
                btnAlign: 'c' //????????????

              }));
            }

            if (res.dataList && res.dataList != null) {
              _typeof(renders.con({
                type: 0,
                title: '??????',
                offset: 'auto',
                shadeClose: 1,
                content: '<div style="padding: 20px 0 20px 0;text-align:center">' + res.dataList + '</div>',
                area: ['420px'],
                btn: '?????????',
                btnAlign: 'c' //????????????

              }));
            }

            opt.callback && opt.callback(res);
          } else {
            top.layer.alert(res.errorMsg || res.msg || '??????????????????????????????', {
              icon: 2
            });
          }
        }
      };
      upload.render(_opt);
    },
    // ?????????.00
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
    // ??????
    markZero: function markZero(n, len) {
      var n = (n / Math.pow(10, len)).toFixed(len) + "";
      len = len == null ? 2 : len;
      return n.substr(n.indexOf('.') + 1);
    },
    // ??????????????????
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
            wraps.html('??????' + res.data + '??????????????????');

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
     * ???????????? ????????????
     * @param {object|string} d - ???????????????/code
     * @param {json} opt ??????
     */
    getServiceStateText: function getServiceStateText(d, opt) {
      var _opt = _objectSpread({
        key: "customerState",
        // ??????????????? customerState
        "return": 'html'
      }, opt);

      var key = _opt.key;
      var className = '';
      var text = '';
      var code = _typeof(d) === 'object' ? d[key] : d;

      switch (String(code)) {
        case "0":
          className = "";
          text = "?????????";
          break;

        case "10":
          className = "service-status-in";
          text = "?????????";
          break;

        case "20":
          className = "service-status-abnormal";
          text = "?????????";
          break;

        case "30":
          className = "service-status-abnormal-end";
          text = "????????????";
          break;

        case "40":
          className = "service-status-churn";
          text = "?????????";
          break;

        case "50":
          className = "service-status-churn-end";
          text = "????????????";
          break;
      }

      if (_opt["return"] === 'html') {
        return "<div><span class=\"".concat(className, "\">").concat(text, "</span></div>");
      } else {
        return text;
      }
    },

    /**
     * ??????url??????
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
     * ?????????????????????
     * @param {*} param0 elem: ?????? state: ???????????? 
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
      "upfile": "xxx" // ????????????

    },
    errLog: '',
    //????????????????????????,???????????????????????????????????????????????????
    login: {}
  });
});