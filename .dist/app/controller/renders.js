"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

;
layui.define(['api', 'store', 'jsencrypt', 'ajax', 'form', 'upload', 'table', 'tree', 'laytpl'], function (exports) {
  var $ = layui.jquery;
  var _layui = layui,
      ajax = _layui.ajax,
      api = _layui.api,
      _table = _layui.table,
      form = _layui.form,
      laytpl = _layui.laytpl;
  var MAXFILESIZE = 1048576 * 2.1; // ????????????????????????  //1,048,576 bytes=1M

  window.__file_name_sort = 1; // ??????input????????????e
  // 191107 ???????????? - ???

  $(document).on("keypress", "input[type='number']", function (e) {
    if (!String.fromCharCode(e.keyCode).match(/[0-9\.]/) && e.keyCode != 45) {
      return false;
    }
  }); // fix: ??????type="hidden"????????????????????????

  $(document).on('click', '.layui-btn-c[type="reset"]', function (e) {
    var form_el = $(e.target).parents('form');
    form_el.find('input[type="hidden"]').val('');
  });

  function getPhotoPath(filePath) {
    var imgPath = filePath;
    if (/^http/.test(filePath)) imgPath = filePath;else imgPath = layui.api.resouce + filePath;
    return imgPath;
  }

  $(document).on('click', '.j-preview-img', function (e) {
    var photos = [];
    var target = e.target;
    var tagName = e.target.tagName.toLocaleLowerCase();

    if (tagName === 'img') {
      var nodeList = $(target).parent().children('img');
      nodeList.each(function () {
        photos.push({
          alt: '',
          src: getPhotoPath(this.src)
        });
      });
    } else {
      var _nodeList = $(target).parents('[data-file]').eq(0).parent().children('[data-file]');

      _nodeList.each(function () {
        photos.push({
          alt: '',
          src: getPhotoPath(this.dataset.file)
        });
      });
    }

    layer.photos({
      photos: {
        "data": photos
      }
    });
  }); // ???????????? ??????????????????????????????

  $(document).on('click', function (e) {
    var tar = $(e.target);
    $('body').find(".select-date-in").removeClass('select-date-in');

    if (tar.hasClass("laydate")) {
      tar.addClass("select-date-in");
    } else {
      var parent_node = tar.parents('.date-range');
      if (parent_node.length > 0) parent_node.addClass("select-date-in");
    }
  }); // ??????6???????????????label????????????

  var layerIndex;
  $(document).on('mouseenter', '.layui-form-label', function () {
    var tips = $(this).text().replace(/^\*/, '');
    tips = tips.replace(/[???|:]$/gi, '');

    if (tips.length > 6) {
      layerIndex = layer.tips(tips, $(this), {
        tips: 1
      });
    }
  });
  $(document).on('mouseleave', '.layui-form-label', function () {
    layer.close(layerIndex);
  }); // ??????????????????

  $(document).on('click', '.j-down-temp', function () {
    var href = $(this).data().href;
    if (!href) return false;
    var form = $('<form method="GET"></form>');
    form.attr("action", href);
    form.appendTo(top.document.body);
    form.submit();
    form.remove();
  }); // ????????????

  $(document).on('click', '.file-btn-del', function () {
    var parentNode = $(this).parents('.upload-pre-file');
    if (parentNode.length === 0) parentNode = $(this).parents('.upload-info-pre-file'); //??????????????????

    if (parentNode.parents(".m-up-file-wrap").data("autohideshow")) {
      parentNode.parents(".m-up-file-wrap").find(".jin-btn-upload").show();
    }

    parentNode.remove(); // top.layer.confirm('??????????????????????????????', {
    //     title: '????????????',
    //     skin: 'layer-theme-confirm',
    // }, function(index){
    //     parentNode.remove()
    //     top.layer.close(index);
    // }, function(index){
    //     top.layer.close(index)
    // })
  }); // ??????input number????????????
  // ??????tagName???maxlengt???????????????????????? 

  document.addEventListener('input', function (e) {
    var tar = e.target;
    var len = tar.getAttribute("maxlength");
    var val = tar.value;
    var max = tar.getAttribute('max');
    max = max == null ? 11 : max - 0;

    if (tar.tagName.toLocaleLowerCase() === "textarea" && len && val.length == len && !tar.dataset.tips) {
      layer.tips("\u8F93\u5165\u6587\u672C\u4E0D\u80FD\u8D85\u51FA".concat(len, "\u5B57\u7B26"), tar, {
        skin: 'layertips-skin-lentips',
        tips: 3,
        time: 2500,
        anim: 5
      });
    } else if (tar.tagName.toLocaleLowerCase() === "input" && len && val.length == len && tar.dataset.lentips !== undefined) {
      layer.tips(tar.dataset.lentips, tar, {
        skin: 'layertips-skin-lentips',
        tips: 3,
        time: 2500,
        anim: 5
      });
    }
  }); // ??????????????????

  function stopInputScrollEvent(e) {
    var e = e || window.event;

    if (e.target.type === 'number' && e.target.tagName === "INPUT") {
      if (e.preventDefault) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
        e.returnValue = false;
      }

      return false;
    }
  } // ??????????????????chrome??? document???body???window ???????????? mousewheel ??? preventDefault


  if (document.querySelector("#LAY_app")) {
    document.querySelector("#LAY_app").addEventListener("mousewheel", stopInputScrollEvent, true);
    document.querySelector("#LAY_app").addEventListener("DOMMouseScroll", stopInputScrollEvent, true); // firefox
  } else if (document.querySelector("#page-view")) {
    document.querySelector("#page-view").addEventListener("mousewheel", stopInputScrollEvent, true);
    document.querySelector("#page-view").addEventListener("DOMMouseScroll", stopInputScrollEvent, true); // firefox
  }

  exports('renders', {
    /**
     * ????????????
     * @param {*} filepath ????????????
     * @returns {String} html
     */
    getUploadPreNode: function getUploadPreNode() {
      var filepath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var resourceServer = layui.api.resouce;
      var fileDir = resourceServer + filepath;
      var filename = filepath.substr(filepath.lastIndexOf('/') + 1);
      var suffix = filename.substr(filename.lastIndexOf('.') + 1);
      var imgFileType = new Set(['png', 'jpeg', 'jpg', 'gif']);
      var hasImgFile = imgFileType.has(suffix);
      var maskNode = hasImgFile ? "\n                <img class=\"pre-img\" src=\"".concat(fileDir, "\" alt=\"\u56FE\u7247\u52A0\u8F7D\u5931\u8D25\" onerror=\"this.src='/static/images/logo.png'\" />\n                <div class=\"upload-pre-mask\">\n                    <img class=\"file-icon\" src=\"/static/images/icon-pre.svg\" alt=\"\" />\n                    <a href=\"javascript:void(0)\" >\u9884\u89C8</a>\n                    <div class=\"j-preview-img touch-mask\" data-file=\"").concat(fileDir, "\"></div>\n                </div>\n                ") : "\n                <a class=\"upload-pre-mask\" href=\"".concat(fileDir, "\" download=").concat(fileDir, " >\n                    <img class=\"file-icon\" src=\"/static/images/icon-download.svg\" alt=\"\" />\n                    <span>\u4E0B\u8F7D</span>\n                </a>\n                "); // fix: ????????????????????? eg: ',xxx.jpg'

      if (filepath === '') return "";
      return "\n            <div class=\"upload-pre-file\" data-file=\"".concat(filepath, "\">\n                <div class=\"file-box\" data-type=\"").concat(suffix, "\">\n                    ").concat(maskNode, "\n                </div>\n                <div class=\"file-control\">\n                    <p class=\"file-name\" title=\"").concat(filename, "\">").concat(filename, "</p>\n                    <div class=\"file-btn-del\"></div>\n                </div>\n            </div>\n            ");
    },
    getUploadSmallPreNode: function getUploadSmallPreNode(filepath) {
      var resourceServer = layui.api.resouce;
      var fileDir = resourceServer + filepath;
      return "\n            <div class=\"upload-info-pre-file\" data-file=\"".concat(filepath, "\" >\n                <img class=\"j-preview-img\" src=\"").concat(fileDir, "\" alt=\"\"  />\n                <div class=\"file-btn-del\"></div>\n            </div>\n            ");
    },

    /*
    ** randomWord ??????????????????????????????????????????
    ** randomFlag-?????????????????? min-?????????????????????[????????????] max-?????????????????????
    */
    randomWord: function randomWord(randomFlag, min, max) {
      var str = "",
          range = min,
          arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; // ????????????

      if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
      }

      for (var i = 0; i < range; i++) {
        var pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
      }

      return str;
    },
    // ????????????
    store: {
      tablePage: {
        curr: 1,
        layout: ['count', 'prev', 'page', 'next', 'skip'],
        next: '?????????',
        prev: '?????????',
        groups: 10,
        limit: 10,
        theme: 'tb-page'
      }
    },

    /**
     * ????????????
     * */
    information: {
      init: function init(view) {
        //????????????
        function initUpFile() {
          view.find(".m-box .up-img").each(function (i, v) {
            var html = '<div class="layui-input-inline market-up-file" id="account-up-file' + i + '">' + '<div class="btn-add jin-btn-info-upload-pic"></div>' + '</div>';
            $(this).parent().append(html);
            $(this).hide();
            layui.renders.upload({
              elem: '#account-up-file' + i,
              type: 'small'
            });
          });
        }

        initUpFile(); // ??????????????????

        view.find('.m-box img').click(function (e) {
          layer.photos({
            photos: {
              "data": [{
                "src": e.target.src
              }]
            }
          });
        });
      },

      /**
       * ????????????????????????
       * @param {dom object} view - ??????????????????
       * @param {object} opt - ?????? isAll - ??????????????????????????????????????? name - ????????????
       */
      saveData: function saveData(view, opt) {
        var takeData = [];
        var isAll = opt.isAll || undefined;
        var name = opt.name || 'code';
        view.find('.take-data .take-data-div').each(function (i, v) {
          if ($(this).find("input:checked").length == 0 && !isAll) return true;
          var obj = {},
              url;
          $(this).find('.upload-info-pre-file').each(function (i, v) {
            if (i == 0) {
              url = this.dataset.file;
            } else {
              url += ',' + this.dataset.file;
            }
          });
          if (url) obj.url = url;else obj.url = "";
          obj.id = $(this).children().first().find('div').data('id');
          obj.name = $(this).children().first().find('div').html();
          obj[name] = $(this).children().first().find('div').data('code');
          obj.position = $(this).children().first().find('div').data('position');

          if ($(this).find(".orgdiv input").siblings().hasClass("layui-form-checked")) {
            obj.originalScript = 1;
          } else {
            obj.originalScript = 0;
          }

          if ($(this).find(".copydiv input").siblings().hasClass("layui-form-checked")) {
            obj.copoyScript = 1;
          } else {
            obj.copoyScript = 0;
          }

          takeData.push(obj);
        });
        return takeData;
      }
    },
    //??????????????????2?????????????????????????????????0?????????
    KeepTwoDecimalFull: function KeepTwoDecimalFull(num) {
      var result = Math.round(num * 100) / 100;
      var s_x = result.toString();
      var pos_decimal = s_x.indexOf('.');

      if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
      }

      while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
      }

      return s_x;
    },

    /*
     * layer ?????????
     * offset: ['10px','20px']  ?????????????????????px???offset??????undefined?????????????????????#Lay_app_body??????
     */
    con: function con(opt) {
      // ????????????
      var defaults = {
        type: 2,
        maxmin: 0,
        area: ['76%', '90%'],
        skin: 'layer-theme-default'
      };
      opt = Object.assign(defaults, opt); //???title????????????

      if (!Array.isArray(opt.title)) {
        opt.title = [opt.title, 'font-size: 18px; font-weight: bold;text-align: left;'];
      } // if (Array.isArray(area) && !offset) {
      //     if (/px$/.test(area[0]) && /px$/.test(area[0])) delete defaults.offset;
      // }


      if (opt.type == 2) {
        if (!/^(\/app\/)/.test(opt.content)) {
          // ??????layui????????????setter
          opt.content = (top === self ? '/app/' : top.layui.setter.base) + opt.content + (opt.content.indexOf("?") === -1 ? "?v" : "&v") + +new Date();
        } else {
          opt.content = opt.content + (opt.content.indexOf("?") === -1 ? "?v" : "&v") + +new Date();
        }
      } // if (!opt.offset) {
      //     var area = opt.area;
      //     var rect = top.document.querySelector('#LAY_app_body') == null ? top.document.body.getBoundingClientRect() : top.document.querySelector('#LAY_app_body').getBoundingClientRect();
      //     var newW = !area[0].match(/%/) ? parseInt(area[0]) : ~~(rect.width * (parseInt(area[0]) / 100));
      //     var newH = !area[0].match(/%/) ? parseInt(area[1]) : ~~(rect.height * (parseInt(area[1]) / 100));
      //     var newL = ~~((rect.width - newW) / 2 + rect.left);
      //     var newT = ~~((rect.height - newH < 0 ? 0 : rect.height - newH) / 2 + rect.top);
      //     opt.area = [newW + 'px', newH + 'px'];
      //     opt.offset = [newT + 'px', newL + 'px'];
      // }


      return top.layer.open(opt);
    },

    /*
     * layer.msg ??????????????????
     * ?????????????????????
     * @params callback: layer??????????????????
     *
     */
    msg: function msg(tips, opt, callback) {
      var defaults = {
        "time": 1200,
        "icon": 1
      };
      if (opt instanceof Function) opt = {
        end: opt
      };
      if (opt instanceof Object) opt = opt || {};
      opt = opt || {};

      for (var i in defaults) {
        if (typeof opt[i] == 'undefined') {
          opt[i] = defaults[i];
        }
      }

      top.layer.msg(tips, opt, callback);
    },

    /*
     * ???????????????
     * @ param tips: ????????????
     * @ param end: ??????????????????
     */
    fail: function fail(tips, end) {
      this.msg(tips, {
        icon: 2,
        time: 3000,
        end: end
      });
    },
    fails: function fails(tips, opt, callback) {
      var defaults = {
        "time": 1200,
        "icon": 2
      };
      if (opt instanceof Function) opt = {
        end: opt
      };
      if (opt instanceof Object) opt = opt || {};
      opt = opt || {};

      for (var i in defaults) {
        if (typeof opt[i] == 'undefined') {
          opt[i] = defaults[i];
        }
      }

      layer.msg(tips, opt, callback);
    },

    /**
     * ??????laydate ???????????????
     * ?????? <input class='laydate' data-type='date' data-format='yyyy-MM-dd'>
     * ??????
     * date-type: year,month,date,time,datetime
     */
    date: function date(opt, func) {
      var obj = {};
      var func = func || {};
      lay('.laydate').each(function () {
        $(this).attr('readonly', true);
        var types = $(this).data('type');
        var format = $(this).data("format");
        var done = $(this).data("done"); // done??????

        var options = {
          elem: this,
          trigger: 'click',
          type: types == undefined ? 'date' : types,
          format: typeof format === 'undefined' ? 'yyyy-MM-dd' : format
        };
        func.hasOwnProperty("done") ? options.done = func[done] : '';
        var name = $(this).prop('name');

        if (_typeof(opt) === 'object') {
          var _options = opt[name];
          options = _objectSpread(_objectSpread({}, _options), options);
        }

        ;
        obj[name] = layui.laydate.render(options);
      });
      return obj;
    },

    /**
     * ?????????????????????
     * @param {????????????} v
     * @param {Object} f - ??????????????????????????????data-event?????? f????????????????????????Function. f = { funcA: function(){}, funcB: function(){}}}
     * @param {object} fieldFn - ??????where???????????????????????????
     * @param {object} unProvince 1 ????????????
     */
    eleTrees: function eleTrees(v, f, fieldFn, url_, unProvince) {
      var t = this;

      var func = f || {},
          funcField = fieldFn || {},
          renderFunc = function renderFunc() {
        var self = $(this);
        var data = self.data();
        var opt = {
          view: v,
          elem: $(this)
        };

        if (data.event) {
          opt.event = func[data.event];
        }

        if (data.field) {
          opt.field = funcField[data.field];
        }

        if (data.key === 'departments') {
          opt.callback = opt.event;
          delete opt.event;
          t.department(opt);
          return false;
        }

        opt.url_ = url_;
        t.eleTree(opt);
      };

      !unProvince && v.find("select[name='provinceCode']").on("change", function () {
        v.find('select[name = "departmentId"]').val("");
        v.find("input[name='companyId']").val('');
        v.find("input[name='departmentId']").val('');
        v.find("input[name='companyName']").val('');
        v.find('input[name="departmentName"]').val('');
        v.find("select[name='groupId']").html('');
        v.find("select[name='teamId']").html('');
        v.find("select[name='positionId']").html(''); // // ??????????????????????????????

        v.find("input[name='companyName']").trigger('click').parent().removeClass("u-sel"); // v.find("input[name='companyName']").trigger('click');

        form.render('select');
      });
      v.find(".m-tree-wrap").each(renderFunc);
    },

    /*
     * ????????? 
     * ??????
     * opt.view - ????????????
     * opt.where - ????????????
     * opt.elem - ??????
     * opt.url - ????????????
     * opt.query - ?????????
     * opt.event - ????????????
     * {function} opt.field - ???????????????????????????
     * 
     * @exapmle
     * // data-un-province="1" ????????? ??????????????????
     * // data-key="companys" ????????????
     * // data-name="clientsCityCompanyId" ?????????input name
     * // data-uk = ?????????????????????????????????
     *      <div class="layui-input-block m-tree-wrap" data-key="companys" data-un-province="1" data-name="clientsCityCompanyId" data-uk="clientsCityCompany" data-filter='customer-pond-edit-company' data-event="resetSelect">
                <input type="hidden" name="clientsCityCompanyId" id="companyId">
                <input type="text" class="layui-input j-sel-tree" name="clientsCityCompanyName" readonly autocomplete='off' placeholder="?????????" lay-verify="required">
                <div class="m-tree-con" lay-filter="customer-pond-edit-company"></div>
            </div>
     */
    eleTree: function eleTree(opt) {
      if (opt == undefined) return false;
      var url = '';
      var arr = [];
      var urlList = {
        'clientsCityCompany': '/company/getCompanysByConditionToUserInfo'
      };
      var uk = opt.elem.data('uk'); // ????????????

      var unProvince = opt.elem.data("unProvince"); // ??????????????????

      if (opt.url_ && opt.url_ == '/company/getCompanyOrganizationList') {
        url = '/company/getCompanyOrganizationList';
        arr = ['dataList'];
      } else {
        // ????????????
        // ???????????? ???-?????? ????????????
        // url = '/company/getCompanysByCondition';
        // arr = ['data', 'list'];
        url = '/company/getCompanyOrganizationList';
        arr = ['dataList'];
      }

      if (uk && urlList.hasOwnProperty(uk)) {
        url = urlList[uk];
        arr = ['data', 'list'];
      }

      var _OPTIONS = {
        // ??????????????????
        // "companys": {
        //     // url: '/structure/getOrganizationalStructureByCondition',
        //     // 2019-06-13 ????????????????????????????????????????????????
        //     url: '/structure/getOrganizationalStructureAndDepartmentAndEmployee',
        //     query: 'companyName',
        //     dataName: 'data',
        //     where: function () {
        //         // if (opt.view.find('select[name="provinceId"]').length > 0) {
        //         //     return {
        //         //         "provinceCode": opt.view.find('select[name="provinceId"]').find("option:selected").val()
        //         //     }
        //         // }
        //         return {
        //             // "provinceCode": opt.view.find('select[name="provinceCode"]').find("option:selected").val()
        //         }
        //     },
        //     event: function (d) {
        //         var _data = d.data.currentData;
        //         var val = _data.companyName === "?????????"?"":_data.companyName;
        //         var parentIds = _data.parentIds == undefined ? [] : _data.parentIds.split(',');
        //         parentIds.push(_data.id);
        //         input.val(val);
        //         wrap.find("input[name='companyId']").val(_data.id);
        //         wrap.find("input[name='parentId']").val(_data.parentId);
        //         wrap.find("input[name='parentIds']").val(parentIds.join(","));
        //         opt.view.find("input[name='departmentId']").val('');
        //         opt.view.find('input[name="departmentName"]').val('');
        //     }
        // },
        // ?????????????????????
        // 190820 "company"=> "companys" ????????????????????????????????? 
        "companys": {
          url: url,
          query: 'companyName',
          dataName: arr,
          where: function where() {
            var where = {
              "pageSize": 999,
              "state": 0
            };
            !unProvince && Object.assign(where, {
              "provinceCode": opt.view.find('select[name="provinceCode"]').find("option:selected").val() || opt.view.find('select[name="provinceId"]').find("option:selected").val()
            });
            uk && urlList.hasOwnProperty(uk) && Object.assign(where, {
              pageSize: 999
            });

            if (opt.hasOwnProperty('field') && typeof opt.field === 'function') {
              Object.assign(where, opt.field());
            }

            if (!where.provinceCode || /\D/.test(where.provinceCode)) delete where.provinceCode;
            return where;
          },
          event: function event(d) {
            var id = opt.elem.data('name') || "companyId";
            var _data = d.data.currentData;
            var parentIds = _data.parentIds == undefined ? [] : _data.parentIds.split(',');
            parentIds.push(_data.id);
            input.val(_data.id == '' ? '' : _data.companyName);
            wrap.find("input[name='".concat(id, "']")).val(_data.id);
            wrap.find("input[name='parentId']").val(_data.parentId);
            wrap.find("input[name='parentIds']").val(parentIds.join(","));
            opt.view.find('input[name="departmentName"]').val('');
            opt.view.find("input[name='departmentId']").val('');
          }
        },
        "department": {
          url: '/structure/getDepartmentStructure',
          query: 'departmentName',
          dataName: 'dataList',
          where: function where() {
            return {
              "provinceCode": opt.view.find('select[name="provinceCode"]').find("option:selected").val(),
              "companyId": opt.view.find('input[name="companyId"]').val()
            };
          },
          event: function event(d) {
            var _data = d.data.currentData;
            input.val(_data.id == '' ? '' : _data.departmentName);
            wrap.find("input[name='departmentId']").val(_data.id);
          }
        },
        // ?????????????????????????????????
        "staffCompays": {
          url: '/company/getCompanysByConditionToUserInfo',
          query: 'companyName',
          dataName: ['data', 'list'],
          where: function where() {
            var where = {
              "pageSize": 999,
              "provinceCode": opt.view.find('select[name="provinceCode"]').find("option:selected").val() || opt.view.find('select[name="provinceId"]').find("option:selected").val(),
              "state": 0
            };

            if (opt.hasOwnProperty('field') && typeof opt.field === 'function') {
              Object.assign(where, opt.field());
            }

            if (!where.provinceCode || /\D/.test(where.provinceCode)) delete where.provinceCode;
            return where;
          },
          event: function event(d) {
            var _data = d.data.currentData;
            var parentIds = _data.parentIds == undefined ? [] : _data.parentIds.split(',');
            parentIds.push(_data.id);
            input.val(_data.id == '' ? '' : _data.companyName);
            wrap.find("input[name='companyId']").val(_data.id);
            wrap.find("input[name='parentId']").val(_data.parentId);
            wrap.find("input[name='parentIds']").val(parentIds.join(","));
            opt.view.find('input[name="departmentName"]').val('');
            opt.view.find("input[name='departmentId']").val('');
          }
        }
      };
      var that = this;
      var wrap = opt.elem;
      var DATATYPE = wrap.data().key; // ??????

      var FILTER = wrap.data().filter;

      if (!_OPTIONS.hasOwnProperty(DATATYPE) && DATATYPE) {
        console.error('??????????????????????????????' + DATATYPE);
        return false;
      }

      var elem = wrap.find('.m-tree-con');
      var input = wrap.find(".j-sel-tree");
      var where = !DATATYPE ? opt.where : _OPTIONS[DATATYPE].where;
      var treeEl;
      var options = {
        elem: elem,
        emptText: '????????????',
        url: api.getApi(!DATATYPE ? opt.url : _OPTIONS[DATATYPE].url),
        request: {
          name: !DATATYPE ? opt.query : _OPTIONS[DATATYPE].query,
          key: 'id',
          children: 'childs'
        },
        response: {
          statusName: 'ret',
          statusCode: 100,
          dataName: !DATATYPE ? opt.dataName : _OPTIONS[DATATYPE].dataName
        },
        done: function done(d) {// ????????????
          // var data = d.data.list;
          // if (opt.view.find("select[name='provinceCode']").length > 0){
          //     var val = data[1].companyName;
          //     input.val("?????????"===val?"":val);
          //     input.prev('input[name="companyId"]').val(data[1].id);
          // }   
        },
        expandOnClickNode: 0,
        highlightCurrent: 1
      }; // ???????????????????????????????????????

      input.on('click', function (e) {
        e.stopPropagation();
        opt.view.find(".m-tree-wrap").not(wrap).removeClass("u-sel");
        opt.view.find(".layui-form-select").removeClass('layui-form-selected');
        var provinceCode = opt.view.find("select[name='provinceCode']").find("option:selected").val();

        if (typeof where == 'function') {
          options.where = where();
        } else {
          options.where = opt.where;
        }

        if (provinceCode == '' && !unProvince) {
          elem.html('<div class="layui-disabled layui-this pad-5">????????????</div>');
        } else {
          if (!treeEl) {
            treeEl = layui.eleTree.render(options);
          } else {
            treeEl.reload(options);
          }
        }

        wrap.toggleClass('u-sel');
      });
      layui.eleTree.on("nodeClick(" + (FILTER ? FILTER : opt.filter) + ")", clickNode);
      $(document).on('click', function () {
        elem.html('');
        wrap.removeClass('u-sel');
      });

      function clickNode(d) {
        if (DATATYPE != undefined) {
          if (DATATYPE != undefined && _OPTIONS[DATATYPE].hasOwnProperty("event")) {
            _OPTIONS[DATATYPE].event(d);
          }
        }

        opt.event && opt.event(d);
        wrap.removeClass('u-sel');
      }

      return treeEl;
    },

    /*
     * ??????????????????
     * @param opt.elem : tree????????????dom
     * @praam opt.lay: ???????????? lay-filter
     */
    department: function department(opt) {
      var t = this,
          wrap = opt.elem,
          view = opt.view,
          input = wrap.find('.j-sel-tree'),
          elem = wrap.find('.m-tree-con'),
          treeEl,
          event = opt.callback,
          FILTER = wrap.data().filter,
          options = {
        elem: elem,
        data: [],
        renderAfterExpand: 1,
        expandOnClickNode: 0,
        lazy: true
      };

      if (opt.hasOwnProperty('callback')) {
        opt.callback = function (d) {
          var data = d.data.currentData; // ?????????????????????

          var id = data.nodeId || '';
          input.val(data.nodeName);
          wrap.find('input[name="departmentId"]').val(id.split(',')[0] || "");
          wrap.find('input[name="sectorId"]').val(id.split(',')[0] || "");
          wrap.find('input[name="groupId"]').val(id.split(',')[1] || "");
          wrap.find('input[name="teamId"]').val(id.split(',')[2] || "");
          event && event(d);
        };
      }

      input.on('click', function (e) {
        e.stopPropagation();
        opt.view.find(".m-tree-wrap").not(wrap).removeClass("u-sel");
        opt.view.find(".layui-form-select").removeClass('layui-form-selected');

        if (!treeEl) {
          treeEl = layui.eleTree.render(options);
        } else {
          treeEl.reload(options);
        }

        wrap.toggleClass('u-sel');
        var companyId = opt.view.find('input[name="companyId"]').val();

        if (companyId == '') {
          elem.html('<div class="layui-disabled layui-this pad-5">????????????</div>');
          return false;
        }

        ajax({
          url: "/structure/getDepartmentStructure",
          data: {
            "companyId": companyId,
            "provinceCode": opt.view.find('select[name="provinceCode"]').find("option:selected").val()
          },
          loading: 1,
          callback: function callback(res) {
            var data = JSON.stringify(res.dataList);
            data = data.replace(/departmentName/g, 'label');
            data = data.replace(/childs/g, 'children');
            data = JSON.parse(data);
            data = addNodeName(data);
            if (!data) return false; // fix: data=false 

            treeEl.reload({
              elem: elem,
              data: [{
                "label": "?????????",
                "id": '',
                isLeaf: true
              }].concat(_toConsumableArray(data)),
              renderAfterExpand: 1,
              expandOnClickNode: 0,
              load: function load(data, _callback) {
                if (data.hasOwnProperty("groupDescribe")) {
                  ajax({
                    url: '/Team/getTeamsByCondition',
                    data: {
                      companyId: companyId,
                      state: 0,
                      groupId: data.id
                    },
                    loading: 1,
                    callback: function callback(res) {
                      var team = res.data.list;
                      team = JSON.stringify(team).replace(/teamName/g, 'label');
                      team = JSON.parse(team);
                      team = addNodeName(team, data.nodeName, data.nodeId);

                      _callback(team);
                    }
                  });
                } else if (data.hasOwnProperty("parentId") && !data.hasOwnProperty('groupDescribe')) {
                  ajax({
                    url: '/group/getGroupsByCondition',
                    data: {
                      companyId: companyId,
                      state: 0,
                      departmentId: data.id
                    },
                    loading: 1,
                    callback: function callback(res) {
                      var group = res.data.list;
                      group = JSON.stringify(group).replace(/groupName/g, 'label');
                      group = JSON.parse(group);
                      group = addNodeName(group, data.nodeName, data.nodeId);

                      _callback(group);
                    }
                  });
                } else {
                  _callback([]);
                }
              }
            });
          }
        });
      });

      function addNodeName(d, name, id) {
        if (d == null) return false;
        var data = d;
        var name = name == undefined ? '' : name + "-";
        var id = id == undefined ? '' : id + ",";

        for (var i = 0; i < data.length; i++) {
          if (data[i].node == undefined) {
            data[i].node = '';
          }

          data[i].nodeName = name + data[i].label;
          data[i].nodeId = id + data[i].id;
        }

        return data;
      }

      layui.eleTree.on("nodeClick(" + FILTER + ")", function () {
        opt.callback && opt.callback(arguments[0]);
      });
      $(document).on('click', function () {
        elem.html('');
        wrap.removeClass('u-sel');
      });
    },

    /*
     * ?????? select ??????
     * @param api: ????????????
     * @param redata: ????????????
     * @param elem: ?????????????????????  (???????????? ??????[`select[name="positionId1"]`,`select[name="positionId0"]`] ??? $('.position-box select') )
     * @param item: { id: 'id', name: 'positionName' }
     * @param callback: ????????????
     * @param name: ?????????val?????????name???
     */
    select: function select(api, redata, elem, item, _callback2, name) {
      redata = layui.api.filterData(redata);
      redata.pageSize = 999;
      var elem = typeof elem == 'string' ? $(elem) : elem;
      ajax({
        url: api,
        data: redata,
        loading: 1,
        callback: function callback(rdata) {
          var data = rdata.data.list;
          var html = null;
          var len = data == undefined ? 0 : data.length;
          html = "<option value='' selected>?????????<option>";

          for (var i = 0; i < len; i++) {
            if (name) html += "<option value=" + data[i][item.name] + ">" + data[i][item.name] + "<option>";else html += "<option value=" + data[i][item.id] + ">" + data[i][item.name] + "<option>";
          }

          if (Array.isArray(elem)) {
            for (var j = 0; j < elem.length; j++) {
              $(elem[j]).html(html);
            }
          } else {
            elem.html(html);
          }

          _callback2 && _callback2();
          form.render('select');
        }
      });
    },

    /*
     * ????????? ?????????????????????
     * @param id: ??????id
     * @param ele: ????????????
     * @callback: ????????????
     */
    city: function city(id, ele, _callback3) {
      if (!id) {
        ele.find("select[name='cityCode']").html('');
        ele.find("select[name='countyCode']").html('');
        form.render('select');
        return false;
      }

      ajax({
        url: "selectCity",
        data: {
          "provinceCode": id
        },
        callback: function callback(res) {
          var html = '',
              arr = res.objList,
              len = arr == null ? 0 : arr.length;

          for (var i = 0; i < len; i++) {
            html += '<option value="' + arr[i].regCityNum + '" id=' + arr[i].regCityId + '>' + arr[i].regCityName + "</option>";
          }

          ele.find("select[name='cityCode']").html(html);
          form.render('select');
          _callback3 && _callback3(arr == null ? '' : arr[0].regCityNum);
        }
      });
    },
    city_2: function city_2(id, ele, _callback4) {
      if (!id) {
        ele.find("select[name='cityCodes']").html('');
        ele.find("select[name='countyCodes']").html('');
        form.render('select');
        return false;
      } else {
        ajax({
          url: "selectCity",
          data: {
            "provinceCode": id
          },
          callback: function callback(res) {
            var html = '',
                arr = res.objList,
                len = arr == null ? 0 : arr.length;

            for (var i = 0; i < len; i++) {
              html += '<option value="' + arr[i].regCityNum + '" id=' + arr[i].regCityId + '>' + arr[i].regCityName + "</option>";
            }

            ele.find("select[name='cityCodes']").html(html);
            form.render('select');
            _callback4 && _callback4(arr == null ? '' : arr[0].regCityNum);
          }
        });
      }
    },
    county_2: function county_2(id, ele, _callback5) {
      if (!id) {
        ele.find("select[name='countyCodes']").html('');
        form.render('select');
        return false;
      } else {
        ajax({
          url: "selectCounty",
          data: {
            "cityCode": id
          },
          callback: function callback(res) {
            var html = '',
                arr = res.objList,
                len = arr == null ? 0 : arr.length;

            for (var i = 0; i < len; i++) {
              html += '<option value="' + arr[i].regCountyNum + '">' + arr[i].regCountyName + "</option>";
            }

            ele.find("select[name='countyCodes']").html(html);
            form.render('select');
            _callback5 && _callback5(arr == null ? '' : arr[0].regCountyNum);
          }
        });
      }
    },

    /* ???????????? */
    county: function county(id, ele, _callback6) {
      if (!id) {
        ele.find("select[name='countyCode']").html('');
        form.render('select');
        return false;
      }

      ajax({
        url: "selectCounty",
        data: {
          "cityCode": id
        },
        callback: function callback(res) {
          var html = '',
              arr = res.objList,
              len = arr == null ? 0 : arr.length;

          for (var i = 0; i < len; i++) {
            html += '<option value="' + arr[i].regCountyNum + '">' + arr[i].regCountyName + "</option>";
          }

          ele.find("select[name='countyCode']").html(html);
          form.render('select');
          _callback6 && _callback6(arr == null ? '' : arr[0].regCountyNum);
        }
      });
    },

    /**
     * ????????????
     * @param {string} selector - ?????????????????????
     * @param {Node} parentNode - ???????????????
     * @param {Array} data - ??????
     * @returns 
     */
    log: function log(selector, parentNode, data) {
      if (!Array.isArray(data)) return false;
      var list = data,
          len = list.length;
      var html = [];

      for (var i = 0; i < len; i++) {
        var li_html = [];

        for (var j in list[len - 1 - i]) {
          li_html.push("<p>".concat(list[len - 1 - i][j], "</p>"));
        }

        html.push("<li>".concat(li_html.join(''), "</li>"));
      }

      parentNode.find(selector).html("<ul class=\"timeline-box\">".concat(html.join(''), "</ul>"));
    },

    /*
     * ??????????????????
     * ????????????????????????????????????????????????
     */
    fileTags: function fileTags(elem, data) {
      if (data == null) return;
      data = data != null ? data.replace(/,$/, '') : data;
      var arr = data.split(',');

      if (arr.length >= 5) {
        $(elem).addClass("hide");
      }

      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == "") continue; // var fileEle = $("<a class='file-tag' target='_blank' href='" + top.layui.api.getFileHost() + arr[i] + "' data-file='" + arr[i] + "'>" + arr[i].split('/').pop() + "<i class='layui-icon layui-icon-close-fill del-file'></i></a>");

        var fileEle = $(layui.renders.getUploadPreNode(arr[i]));
        fileEle.on('click', '.file-btn-del', function (e) {
          $(elem).removeClass('hide');
        });
        $(elem).after(fileEle);
      }
    },

    /*
     * ????????????????????????
     * opt = { elem: '#up-file', file: 'file2.jpg,file2.jpg' }
     */
    renderAnnex: function renderAnnex(opt) {
      var e = opt.elem || '#up-file',
          f = Array.isArray(opt.file) ? opt.file : opt.file == '' ? [] : opt.file.split(','),
          p = $('<div></div>');

      for (var i = 0; i < f.length; i++) {
        r(f[i]);
      }

      function r(url) {
        var item = $(layui.renders.getUploadPreNode(url));
        p.append(item);
      }

      $(e).after(p.children());
    },

    /*
     * ???????????? ????????????
     */
    changeTableData: function changeTableData(res, controls) {
      var data = res.data && res.data.list || [];
      $(data).each(function (i, v) {
        if (v.serviceChargeUnit == 1) {
          v.serviceChargeUnit = '/???';
        } else if (v.serviceChargeUnit == 2) {
          v.serviceChargeUnit = '/??????';
        } else if (v.serviceChargeUnit == 3) {
          v.serviceChargeUnit = '/??????';
        } else if (v.serviceChargeUnit == 4) {
          v.serviceChargeUnit = '/???';
        } else {
          v.serviceChargeUnit = '';
        }

        for (var j in v) {
          if (v[j] == 'null' || v[j] == null) v[j] = "";
        }

        v.controls = controls;
      });
      return {
        "code": res.ret == 100 ? 0 : 1,
        "msg": res.msg,
        "count": res.data.total,
        "data": data
      };
    },
    changeTableData_: function changeTableData_(res, controls) {
      var data = res.data.list || [];
      $(data).each(function (i, v) {
        for (var j in v) {
          if (v[j] == 'null' || v[j] == null) v[j] = "";
        }

        v.controls = controls;
      });
      return {
        "code": res.ret == 100 ? 0 : 1,
        "msg": res.msg,
        "count": res.data.total,
        "data": data
      };
    },
    changeTableData_month: function changeTableData_month(res, controls) {
      var data = res.data.list || [];
      $(data).each(function (i, v) {
        for (var j in v) {
          if (v[j] == 'null' || v[j] == null) v[j] = "";
        }

        v.controls = controls;
      });
      data.forEach(function (element) {
        for (var i = 1; i <= 12; i++) {
          if (element.warehousingMonth[i] || element.warehousingMonth[i] === null) {
            element["m".concat(i)] = 1;
          } else {
            element["m".concat(i)] = 0;
          }
        }
      });
      return {
        "code": res.ret == 100 ? 0 : 1,
        "msg": res.msg,
        "count": res.data.total,
        "data": data
      };
    },

    /**
     * ????????????
     * @param {object} [opt] - ????????????
     *      elem        ????????????ID?????????
     *      opt.id      ???????????????
     *      opt.url     ??????????????????
     *      opt.where   ????????????
     *      opt.done    ????????????????????????
     * @param {object} [eventes]   ????????????????????????????????????Function??????
     *      events.toolbar         ???????????????????????????
     *      events.tool            ?????????????????????
     */
    table: function table(opt, events) {
      opt.elem = opt.elem.indexOf("#") == 0 ? opt.elem.replace(/#/, '') : opt.elem; // ????????????

      var defaultsOpt = {
        even: true,
        page: {
          layout: ['count', 'prev', 'page', 'next', 'skip'],
          next: '?????????',
          prev: '?????????',
          groups: 10,
          limit: 10,
          theme: 'tb-page'
        },
        method: 'get',
        cellMinWidth: 120,
        parseData: typeof opt.parseData === 'function' ? opt.parseData : function (res) {
          res = res || {};

          if (Array.isArray(res.data)) {
            for (var i = 0, len = res.data.length; i < len; i++) {
              for (var j in res.data[i]) {
                if (j == null) res.data[i][j] = '<span class="fc-red">?????????</span>';
              }
            }
          }

          return {
            "code": res.ret == 100 ? 0 : 1,
            "msg": res.msg,
            "count": res.data == undefined ? 0 : res.data.total,
            "data": res.data == undefined ? [] : res.data.list
          };
        },
        request: {
          pageName: 'pageNum',
          limitName: "pageSize"
        },
        toolbar: opt.toolbar,
        defaultToolbar: ['filter'],
        // ['filter', 'export', 'import']
        text: {
          "none": '?????????'
        }
      };
      Object.assign(defaultsOpt, opt || {});
      defaultsOpt.elem = '#' + opt.elem;
      defaultsOpt.url = /^http/.test(opt.url) ? opt.url : api.getApi(opt.url); // ??????????????????

      var cacheRequest = null; // ?????????tab??????

      var cacheThisTab = null;

      defaultsOpt.done = function (d) {
        var _opt$done;

        $(window).resize(); // ??????resize??????table fixed: right??????????????????
        // ????????????????????? tis-icon ??????

        var thisPage = layui.$('.layadmin-tabsbody-item.layui-show');
        var tabData = thisPage.find('.layui-tab .layui-this').data();
        var stringTabData = JSON.stringify(tabData || {});
        var selector = '.tis-icon';
        thisPage.find(selector).hide();

        if (!cacheRequest || cacheThisTab !== stringTabData) {
          cacheThisTab = stringTabData;
          cacheRequest = defaultsOpt.url;
        } else {
          try {
            if (d.data == '') {
              thisPage.find(selector).show();
            } else {
              thisPage.find(selector).hide();
            }
          } catch (_unused) {//
          }
        }

        opt.done && (_opt$done = opt.done).call.apply(_opt$done, [this].concat(Array.prototype.slice.call(arguments)));
      }; // ???????????????????????????????????????


      if ('object' === _typeof(defaultsOpt.data)) {
        delete defaultsOpt.url;
      }

      var t = _table.render(defaultsOpt);

      if (events) {
        if (events.tool) {
          _table.on("tool(" + opt.elem + ")", function () {
            for (var i in events.tool) {
              if (i == arguments[0].event) {
                events.tool[i](arguments[0], this);
              }
            }
          });
        }

        if (events.toolbar) {
          _table.on("toolbar(" + opt.elem + ")", function () {
            for (var i in events.toolbar) {
              if (i == arguments[0].event) {
                events.toolbar[i](arguments[0], this);
              }
            }
          });
        }
      }

      return t;
    },

    /*
     * ????????????????????????
     * ????????????????????????laydate
     * date-range
     * date-range-item
     * type: time, ??????????????????????????????????????????????????????08:00:00
     */
    dateRange: function dateRange(opt) {
      var opt = opt || {};
      lay('.date-range .date-range-item').each(function () {
        $(this).attr("readonly", true);
        var that = this;
        var ele = $(this).parents('.date-range');
        var types = $(this).data().type,
            unlimited = $(this).data('unlimited') === 1 ? !0 : !1,
            // ??????
        btns = $(this).data().btns || "clear,".concat(unlimited ? "unlimited," : "", "now,confirm");
        layui.laydate.render({
          elem: this,
          range: true,
          trigger: 'click',
          type: types == undefined ? 'date' : types,
          btns: btns.split(","),
          value: types === 'time' ? '08:00:00 - 08:00:00' : '',
          done: opt.done || function (value, date, endDate) {
            var start = date.year + '-' + api.markZero(date.month, 2) + "-" + api.markZero(date.date, 2);
            var end = typeof endDate === 'string' ? endDate : endDate.year + '-' + api.markZero(endDate.month, 2) + '-' + api.markZero(endDate.date, 2);

            if (types === 'month') {
              start = date.year + '-' + api.markZero(date.month, 2);
              end = typeof endDate === 'string' ? endDate : endDate.year + '-' + api.markZero(endDate.month, 2);
            }

            if (types === 'time' && value != '') {
              start = value.split(' ')[0];
              end = value.split(' ')[2];
              var startDateTime = date.hours * 60 * 60 + date.minutes * 60 + date.seconds;
              var endDateTime = typeof endDate === 'string' ? endDate : endDate.hours * 60 * 60 + endDate.minutes * 60 + endDate.seconds;

              if (startDateTime > endDateTime && typeof endDate !== 'string') {
                start = [start, end];
                end = start[0];
                start = start[1];
              }
            }

            if (value == '') {
              start = '';
              end = '';
            } // if (end == "9999-12-31") end = "??????";


            ele.find('input[name="' + that.dataset.start + '"]').val(start);
            ele.find('input[name="' + that.dataset.end + '"]').val(end);
          }
        });
      });
    },

    /* ????????? ????????????????????? */

    /* ===================================================================================================== */

    /*
     * ??????????????? ????????????
     * @param opt.view : ????????????
     * @param opt.url: ????????????
     * @prram opt.data: ????????????
     */
    company: function company(opt) {
      var that = this;
      form.on('select(province)', function () {
        opt.view.find('input[name="companyId"]').val("");
      });
      $(document).click(function (e) {
        $(".u-sel-tree-wrap.u-sel").removeClass("u-sel");
      });
      opt.view.find('.u-sel-tree').off('click').on('click', function (e) {
        e.stopPropagation();
        $(this).parent().toggleClass("u-sel");
      });
      $(".u-sel-tree-list").on("click", function (e) {
        e.stopPropagation();
      });
      var view = opt.view;

      if (opt.data == undefined) {
        view.find(".u-sel-tree-list").html("<li class='pad-5 fc-grey'>????????????</li>");
        return false;
      }

      ajax({
        url: "/structure/getOrganizationalStructureByCondition",
        data: opt.data,
        callback: function callback(res) {
          view.find(".u-sel-tree-list").html("");
          view.find('input[name="companyName"]').val('');
          var data = JSON.stringify(res.data);
          data = data.replace(/companyName/g, 'name');
          data = data.replace(/childs/g, 'children');
          data = JSON.parse(data);

          if (data.childs == null && data.id == null) {
            view.find(".u-sel-tree-list").html("<li class='pad-5 fc-grey'>????????????</li>");
            return false;
          }

          layui.tree({
            elem: view.find(".u-sel-tree-list")[0],
            nodes: [data],
            click: function click(node) {
              view.find('.u-sel-tree-wrap').removeClass("u-sel");
              view.find("input[name=companyName]").val(node.name);
              view.find("input[name=companyId]").val(node.id);
              view.find('select[name="positionName"]').html("");
              view.find('select[name="groupId"]').html("");
              view.find('select[name="teamId"]').html("");
              if (opt.query) opt.query.companyId = node.id;
              opt.callback && opt.callback(opt.query); // ????????????????????? ??????

              if (view.find('select[name="departmentId"]').length == 1) {
                that.select('/department/getDepartmentsByCondition', {
                  "provinceCode": opt.data.provinceCode,
                  "companyId": node.id
                }, 'select[name="departmentId"]', {
                  id: 'id',
                  name: "departmentName"
                });
              } else if (view.find('select[name="sectorId"]').length == 1) {
                view.find('select[name="sectorId"]').html("");
                that.select('/department/getThisDepartmentsByCondition', {
                  "companyId": node.id
                }, 'select[name="sectorId"]', {
                  id: 'id',
                  name: "departmentName"
                });
              }
            }
          });
        }
      });
    },

    /* ????????? ?????? end */

    /* ===================================================================================================== */

    /*
     * ?????? (cid:??????id???ch???????????????cw????????????; signUrl:??????????????????????????????#signUrl;c:?????????????????????id???s:?????????????????????id)
     */
    signName: function signName(cid, ch, cw, signUrl, c, s) {
      var that = this;
      var canvas = document.getElementById(cid);
      canvas.addEventListener('mousemove', onMouseMove, false);
      canvas.addEventListener('mousedown', onMouseDown, false);
      canvas.addEventListener('mouseup', onMouseUp, false);
      canvas.addEventListener('touchstart', onMouseDown, false);
      canvas.addEventListener('touchmove', onMouseMove, false);
      canvas.addEventListener('touchend', onMouseUp, false);
      canvas.height = ch;
      canvas.width = cw;
      var ctx = canvas.getContext('2d'),
          blankcanvas = canvas.toDataURL();
      ctx.lineWidth = 1.0; // ????????????

      ctx.strokeStyle = "#000"; // ??????????????????

      var flag = false;

      function onMouseMove(evt) {
        evt.preventDefault();

        if (flag) {
          var p = pos(evt);
          ctx.lineTo(p.x, p.y);
          ctx.lineWidth = 1.0; // ????????????

          ctx.shadowColor = "#000";
          ctx.shadowBlur = 1; //ctx.shadowOffsetX = 6;

          ctx.stroke();
        }
      }

      function onMouseDown(evt) {
        evt.preventDefault();
        ctx.beginPath();
        var p = pos(evt);
        ctx.moveTo(p.x, p.y);
        flag = true;
      }

      function onMouseUp(evt) {
        evt.preventDefault();
        flag = false;
      } //????????????


      var saveImage = document.getElementById(s);
      saveImage.addEventListener('click', function () {
        uploadImg();
      }, false); //??????????????????,??????????????????

      function uploadImg(type) {
        //???????????????????????????
        var imgdata = canvas.toDataURL(type);
        imgdata = imgdata.replace("data:image/png;base64,", "");
        imgdata = b64toBlob(imgdata, 'image/png');
        var form = new FormData();
        form.append("file1", imgdata);

        if (blankcanvas == canvas.toDataURL()) {
          that.fail('???????????????????????????');
        } else {
          $.ajax({
            crossDomain: true,
            url: layui.api.getUploadPath(),
            type: "post",
            data: form,
            processData: false,
            contentType: false,
            success: function success(data) {
              that.msg('????????????');
              var saveUrl = data.files[0].saveUrl; // $(signUrl).val(saveUrl);

              var index = parent.layer.getFrameIndex(window.name); //signUrl ??????????????????????????????????????????

              if (signUrl == '#signUrlforlibraryorder') {
                window.parent.document.getElementById("signUrlforlibraryorder").value = saveUrl;
              } else {
                window.parent.document.getElementById("signUrl").value = saveUrl;
              } // ??????????????????????????????#signNew


              try {
                var btn_node = window.parent.document.getElementById('signNew');
                var parent_node = btn_node.parentElement;
                var img = parent_node.querySelector('img');
                if (!img) img = new Image();
                img.src = "".concat(layui.api.resouce).concat(saveUrl);
                img.className = "j-preview-img";
                parent_node.insertBefore(img, btn_node);
              } catch (_unused2) {// 
              }

              parent.layer.close(index);
            }
          });
        }
      } // ??????????????????


      function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);
          var byteNumbers = new Array(slice.length);

          for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          var byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {
          type: contentType
        });
        return blob;
      } //????????????


      var clear = document.getElementById(c);
      clear.addEventListener('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        flag = false;
        $(signUrl).val('');
      }, false);

      function pos(event) {
        var x, y;

        if (isTouch(event)) {
          x = event.touches[0].pageX;
          y = event.touches[0].pageY;
        } else {
          x = event.layerX;
          y = event.layerY;
        }

        return {
          x: x,
          y: y
        };
      }

      function isTouch(event) {
        var type = event.type;

        if (type.indexOf('touch') >= 0) {
          return true;
        } else {
          return false;
        }
      }
    },

    /**
     * 
     * @param {json} opt
     * @example
     *  <div class="layui-input-block j-fuzzy-select"></div>
     *  renders.fuzzySearchSelect(options)
     */
    fuzzySearchSelect: function fuzzySearchSelect(opt) {
      var _opt$el = opt.el,
          el = _opt$el === void 0 ? opt.el || ".j-fuzzy-select" : _opt$el,
          _opt$view = opt.view,
          view = _opt$view === void 0 ? $("body") : _opt$view,
          _opt$query = opt.query,
          query = _opt$query === void 0 ? {} : _opt$query,
          _opt$url = opt.url,
          url = _opt$url === void 0 ? '/customer/getDealCustomerInformation' : _opt$url,
          name = opt.name,
          callback = opt.callback,
          ajaxtype = opt.ajaxtype,
          queryname = opt.queryname,
          urlname = opt.urlname;
      var elem = view.find(el);
      var input = document.createElement("input"); // init

      var data = [];
      var dl = document.createElement("dl");
      name && input.setAttribute("name", name);
      elem.addClass("layui-form-select");
      input.className = "layui-input";
      input.style = "padding-right: 0";
      input.autocomplete = 'off';
      dl.className = 'layui-anim layui-anim-upbit';
      elem.append(input);
      elem.append(dl);
      $(input).on('input', function () {
        var value = this.value;
        if (!value) return;
        queryname ? query[queryname] = this.value : query.customerName = this.value;
        data = [];
        ajax({
          url: url,
          data: query,
          traditional: true,
          type: ajaxtype || 'POST',
          callback: function callback(res) {
            var dataList = res.dataList;
            data = dataList;
            var dl_list = dataList.map(function (item, index) {
              return "<dd data-val=\"".concat(item.id, "\" data-index=\"").concat(index, "\">").concat(urlname ? item[urlname] : item.customerName, "</dd>");
            });
            dl.innerHTML = dl_list.join("");
            elem.addClass("layui-form-selected");
          }
        });
      });
      $(input).on('blur', function () {
        this.value = '';
      });
      $(dl).on("click", 'dd', function () {
        input.value = this.innerText;
        elem.removeClass("layui-form-selected");
        callback && callback(data[this.dataset.index]);
        data = [];
      });
    },

    /**
     * ????????????????????????
     * @param {*} options 
     * <input type="text" class="layui-input j-fuzzy-input">
     * ??????: ??????????????????????????????
     */
    fuzzysSearch: function fuzzysSearch(options) {
      var defaultsOptions = {
        scope: 'body',
        // ????????????
        selector: '.j-fuzzy-input',
        // ??????input???
        url: '/customer/getDealCustomerInformation',
        // ????????????
        key: 'customerName',
        getType: 'POST',
        itemKey: {
          id: 'id',
          name: 'customerName'
        },
        hideSerachList: false,
        // ????????????????????????
        success: function success() {} // ??????????????????

      };
      options = _objectSpread(_objectSpread({}, defaultsOptions), options);
      var _options2 = options,
          scope = _options2.scope,
          selector = _options2.selector,
          url = _options2.url; // const unKeyCode = [8]

      var thisSelector;
      $(scope).addClass("show-visiable");
      !options.hideSerachList && $(scope).on("click", selector, function (e) {
        thisSelector = $(this);
        if (thisSelector.hasClass('fuzzy-select-this')) return false;
        $("".concat(scope, " .fuzzy-select-this")).removeClass('fuzzy-select-this');
        thisSelector.addClass('fuzzy-select-this');
        if (!thisSelector.data('cache')) thisSelector.data('cache', $(this).val());
        var cur = $(e.currentTarget);
        if (cur.next('ul').length > 0) return;
        var select = document.createElement("ul");
        select.className = "z-fuzzy-input-wrap";
        cur.parent().append(select);
        $(select).on('click', '.j-fuzzy-item', function (e) {
          var name = $(this).data('name');
          var id = $(this).data('id');
          typeof options.callback === 'function' && options.callback(name, id, thisSelector);
          thisSelector.val(name);
          thisSelector.prev().val(id);
          thisSelector.data('cache', name);
          select.innerHTML = "";
        });
      });
      $(scope).on("keyup", selector, function (e) {
        var keyCode = e.keyCode; // if(unKeyCode.includes(keyCode)) return;

        var tar = e.target;
        var cur = $(e.currentTarget);

        var data = _defineProperty({}, options.key, cur.val());

        ajax({
          url: url,
          data: data,
          traditional: true,
          type: options.getType,
          callback: function callback(res) {
            var dataList = res.dataList || [];
            var ul = cur.next('ul');

            if (ul) {
              var html = dataList.map(function (item) {
                return "<li class=\"z-fuzzy-sel-item j-fuzzy-item\" data-id=\"".concat(item[options.itemKey.id], "\" data-name=").concat(item[options.itemKey.name], ">").concat(item[options.itemKey.name], "</li>");
              });
              ul.html(html.join(''));

              try {
                var _tar$getBoundingClien = tar.getBoundingClientRect(),
                    x = _tar$getBoundingClien.x,
                    y = _tar$getBoundingClien.y,
                    width = _tar$getBoundingClien.width;

                ul.attr('style', "left: ".concat(x, "px; top: ").concat(y + 38, "px; width: ").concat(width, "px"));
              } catch (_unused3) {}

              ul.show();
            }

            typeof options.success === 'function' && options.success(res);
          }
        });
      });
    },

    /*
     * //???????????? searchInp:??????
     * url:??????
     * urlName:?????????
     * urlId?????????id
     * nofocus:????????????
     * key:?????????
     * callback:????????????
     * ajaxtype:????????????
     * <input type = "hidden" id = "searchHid">
     * <ul class="searchUl" id="searchUl"></ul>
     * obj?????????????????? {searchHid,searchUl}
     */
    fuzzySearch: function fuzzySearch(searchInp, url, urlName, urlId, nofocus, key, _callback7, ajaxtype, obj) {
      var _document$querySelect;

      var searchUlID, searchHid, searchUl;
      var timer;
      var DELAY = 300;
      var ishideRequired = ((_document$querySelect = document.querySelector(searchInp)) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.getAttribute('lay-verify')) === 'hideRequired';
      $("html").bind("click", function (e) {
        searchUlID = obj ? obj.searchUl : 'searchUl';
        searchHid = obj ? $('#' + obj.searchHid) : $("#searchHid");
        searchUl = obj ? $('#' + obj.searchUl) : $("#searchUl");
        var id = $(e.target).attr('id'); // ?????????????????????, ?????????????????????????????????

        if (ishideRequired) {
          if (id != searchUlID && id != searchInp.slice(1)) {
            searchUl.hide();

            if ($.trim($(searchInp).val()) != $.trim(searchHid.val())) {
              //???????????????????????? ??????????????????
              $(searchInp).attr('data-id', '');
              searchHid.val('');
            }
          } else {
            var tar = e.target;

            if (ishideRequired) {
              var value = e.target.value;
              clearTimeout(timer);

              if (value.length > 0) {
                timer = setTimeout(function () {
                  getData(value);
                }, DELAY);
              }

              return false;
            }
          }
        } else {
          if (id != searchUlID && id != searchInp.slice(1)) {
            searchUl.hide();

            if ($.trim($(searchInp).val()) != $.trim(searchHid.val())) {
              //???????????????????????? ??????????????????
              $(searchInp).attr('data-id', '');
              $(searchInp).val('');
              searchHid.val('');
            }
          } else if (id == searchInp.slice(1)) {
            getData($(this).val());
          }
        }
      });
      $(searchInp).keyup(function () {
        var _this = this;

        clearTimeout(timer);
        timer = setTimeout(function () {
          getData($(_this).val());
        }, DELAY);
      });

      function getData(name) {
        searchUl = obj ? $('#' + obj.searchUl) : $("#searchUl");
        searchHid = obj ? $('#' + obj.searchHid) : $("#searchHid");
        if (nofocus) if (!name) return;
        searchUl.show();
        var data = {};
        data[key] = name;
        ajax({
          url: url,
          data: data,
          traditional: true,
          type: ajaxtype || 'POST',
          callback: function callback(res) {
            var html = "";
            $(res.dataList).each(function (i, v) {
              html += '<li data-id="' + v[urlId] + '">' + v[urlName] + '</li>';
            });
            searchUl.html(html);
            searchUl.find('li').on('click', function () {
              $(searchInp).attr('data-id', $(this).data('id'));
              var val = $.trim($(this).html()).replace(/&nbsp;|([.\n\r]+)/g, '');
              $(searchInp).val(val);
              searchHid.val(val);
              searchUl.hide();
              if (_callback7) _callback7($(this).data('id'));
            });
          }
        });
      }
    },

    /*
     * ???????????? t:$('?????????')
     */
    choosePerson: function choosePerson(t, func, roleid, customerid) {
      $("body").css('overflow-y', 'hidden');
      var that = this;
      this.con({
        // this.con => renders.con
        title: '????????????',
        // content: parent.layui.setter.base + 'views/component/personnel.html?count=1&r=' + roleid + '&c=' + customerid,
        content: parent.layui.setter.base + 'views/component/personnel.html?count=1',
        area: ['638px', '690px'],
        offset: "auto",
        btn: ['??????', '??????', '??????'],
        shadeClose: 1,
        btnAlign: 'c',
        yes: function yes(index, dom) {
          var selectData = top.layer.getChildFrame('#select2>div', index);
          var selectLable = $(selectData).data('label');
          var selectValue = $(selectData).data('value');
          t.val(selectLable);
          t.attr('data-id', selectValue);
          if (selectValue) t.siblings().val(selectValue);else t.siblings().val(''); // if (!layer.getChildFrame('#select2', index).text()) {
          //     t.val('');
          //     $(t).siblings().val('');
          // } else if (!layer.getChildFrame('#select2', index).val() || layer.getChildFrame('#select2', index).val().length > 1) {
          //     that.fail('???????????????????????????');
          //     t.val('');
          //     $(t).siblings().val('');
          // } else {
          //     t.val(layer.getChildFrame('#select2', index).text());
          //     $(t).siblings().val(Number(layer.getChildFrame('#select2', index).val()));
          // }
          //?????????????????????????????????

          if ($.isFunction(func)) {
            func();
          }

          $("body").css('overflow-y', 'auto');
          top.layer.close(index);
        },
        btn2: function btn2(index) {
          top.layer.getChildFrame("#select2", index).html("");
          return false;
        },
        cancel: function cancel() {
          $("body").css('overflow-y', 'auto');
        },
        end: function end() {
          $("body").css('overflow-y', 'auto');
        }
      });
    },

    /**
     * ???td????????????type=text??????disabled?????????div???????????????????????????????????????????????????
     * @param {*} selector ???????????????
     */
    transformInpToDiv: function transformInpToDiv(selector) {
      $(selector).find('td input:disabled').each(function (t) {
        var tar = $(this);

        if (tar.attr('type') === 'text') {
          tar.attr('type', 'hidden');
          tar.after("\n                        <div class=\"inp-disabled-block\">".concat(tar.val(), "</div>\n                    "));
        }
      });
    },

    /**
     * 
     * @param {*} opt 
     * @param {opt} opt.elem selector: jin-btn-upload ??????????????? data-accept ????????? opt.accpet 
     * @param opt.type small - ??????????????????????????????
     * @param opt.nums ???????????? default: 5
     * @param opt.wid ????????????
     * @param opt.hei ????????????
     * @param opt.rate ???????????????
     * @param opt.wid1 ?????????????????????
     * @param opt.hei1 ?????????????????????
     * @param {*} uplaodConfig ???upFile2_ ?????????????????????
     * @returns {Upload|UploadList} layui.upload??????/????????????
     */
    upload: function upload() {
      var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var uplaodConfig = arguments.length > 1 ? arguments[1] : undefined;

      function getOpt(node) {
        var accept = node.dataset.accept || 'file';
        var acceptMime = accept === 'images' ? 'image/*' : 'file';

        if (opt.type === "small") {
          accept = 'images';
          acceptMime = 'image/*';
        }

        return _objectSpread({
          elem: node,
          url: layui.api.getUploadPath(),
          auto: false,
          accept: accept,
          acceptMime: acceptMime,
          choose: function choose(obj) {
            //?????????????????????????????????????????????
            var files = obj.pushFile();
            var isMaxFile = false;
            var max_nums = opt.nums || 5;
            var nums = $(node).nextAll('.upload-pre-file, .upload-info-pre-file').length;

            if (Object.keys(files).length + nums > max_nums || nums >= max_nums) {
              layer.msg("\u6587\u4EF6\u6570\u91CF\u4E0D\u80FD\u8D85\u51FA".concat(max_nums, "\u4E2A"), {
                time: 1200
              });
              isMaxFile = true;
            }

            var t = this;
            obj.preview(function (index, file, result) {
              if (isMaxFile) {
                delete files[index];
                return false;
              } // console.log(index); //??????????????????
              // console.log(file); //??????????????????
              // console.log(result); //????????????base64?????????????????????


              if (file.size > MAXFILESIZE) {
                layer.msg("???????????????2M????????????");
                $(opt.elem).show();
                return;
              }

              if (opt.wid) {
                var img = new Image();
                img.src = result;

                img.onload = function () {
                  var naturalWidth = img.naturalWidth,
                      naturalHeight = img.naturalHeight;

                  if (opt.wid) {
                    //????????????
                    if (opt.rate) {
                      //?????????????????????
                      if (opt.wid * naturalHeight != opt.hei * naturalWidth) {
                        layer.msg("??????????????????????????????");
                        $(opt.elem).show();
                        return;
                      }
                    } else if (!opt.wid1) {
                      //???????????????????????????
                      if (opt.wid != naturalWidth || opt.hei != naturalHeight) {
                        layer.msg("??????????????????????????????");
                        $(opt.elem).show();
                        return;
                      }
                    } else {
                      //??????????????????????????????
                      if (!(opt.wid == naturalWidth && opt.hei == naturalHeight || opt.wid1 == naturalWidth && opt.hei1 == naturalHeight)) {
                        layer.msg("??????????????????????????????");
                        $(opt.elem).show();
                        return;
                      }
                    }
                  }

                  that.data.file1 = file;
                  obj.upload(index, file);
                  delete files[index];
                };

                return false;
              }

              t.data.file1 = file;
              obj.upload(index, file);
              delete files[index];
            });
          },
          done: function done(_ref) {
            var ret = _ref.ret,
                files = _ref.files;

            if (ret === 100) {
              files.forEach(function (_ref2) {
                var format = _ref2.format,
                    orgName = _ref2.orgName,
                    saveUrl = _ref2.saveUrl,
                    visitUrl = _ref2.visitUrl;
                var itemHTML = layui.renders.getUploadPreNode(saveUrl);

                if (opt.type === 'small') {
                  itemHTML = layui.renders.getUploadSmallPreNode(saveUrl);
                }

                $(node).after(itemHTML); //??????????????????

                if (opt.nums == $(node).nextAll('.upload-pre-file, .upload-info-pre-file').length && opt.autohideshow) {
                  $(node).hide();
                }

                if (opt.callback && typeof opt.callback === 'function') {
                  opt.callback(saveUrl);
                }
              });
            }
          },
          error: function error(err) {
            console.error(err);
          }
        }, opt);
      }

      var nodes = $(opt.elem || '.jin-btn-upload');

      if (_typeof(uplaodConfig) === 'object') {
        var newOpt = _objectSpread(_objectSpread({}, uplaodConfig.config), getOpt());

        return layui.upload.render(getOpt(newOpt));
      }

      var example = [];
      nodes.each(function (index, n) {
        example.push(layui.upload.render(getOpt(n)));
      });
      return nodes.length <= 1 ? example[0] : example;
    }
  });
});