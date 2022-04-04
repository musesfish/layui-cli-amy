"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*
 * @Author: hoovoi
 * @Date: 2020-10-28 09:07:39
 * @LastEditors: hoovoi
 * @LastEditTime: 2022-03-09 10:54:19
 * 日历-时间选择
 */
layui.define(["jquery", "api", "renders", "form", "laydate", "laytpl", "ajax"], function (exports) {
  var $ = layui.jquery;
  var _layui = layui,
      api = _layui.api,
      renders = _layui.renders,
      form = _layui.form;
  var _className = "calendar-date-select";
  var DEFAULT_DAYS = 5 * 7; // 默认显示的天数（日历记事组件）

  var tpl_noteDetail = "\n    <form class='layui-form pad-20' lay-filter='win-note-form'>\n    <table class=\"layui-table form-table\">\n      <colgroup>\n        <col width=\"130\">\n        <col>\n      </colgroup>\n      <tr>\n        <td><b></b>\u63D0\u9192\u5185\u5BB9</td>\n        <td>\n          <div>\n            <textarea lay-verify=\"required\" name=\"planMatter\" id=\"\" cols=\"20\" rows=\"10\" class=\"layui-textarea\" maxlength=\"30\">{{d.planMatter}}</textarea>\n          </div>\n        </td>\n      </tr>\n      <tr>\n        <td><b></b>\u63D0\u9192\u65E5\u671F</td>\n        <td><input type=\"text\" lay-verify=\"required\" name=\"planDate\" class=\"layui-input laydate laydate-inp-label\" value=\"{{d.planDate}}\"></td>\n      </tr>\n    </table>\n    <div class='layui-row text-center mt-30'>\n      <button class='layui-btn jin-btn-submit' lay-submit lay-filter='win-note-form-submit'>\u4FDD\u5B58</button>\n    </div>\n  </form>";
  layui.link("/static/css/component/calendar.css");
  /**
   * 日历
   * @param {function} opt.callback return [ dom, [yyyy-mm-dd] ]
   * @param {date|number|string} opt.date 时间
   * @param {datetime} opt.min 最小时间
   * @param {datetime} opt.max 最大时间
   * @param {DOM} opt.target
   * @param {datetime} opt.time 默认当前时间
   * @param {array} opt.select 初始选中
   * @param {boolean} opt.maskclose 点击空白区域关闭 默认开启
   * @param {array} opt.btns [{ label: '取消', event: 'reset' }, { label: '提交', event: 'submit' }]
   * @param {boolean} opt.single 是否单选
   * @param {boolean} opt.dissel 初始选中的不能被选
   * @param {boolean} opt.noclosebtn 右上角关闭按钮是否展示
   * @param {boolean} opt.notes 扩展：日历记事本模式（首页）
   * 
   * @method
   * @reset 重置
   * @submit 提交 执行opt.callback
   * @setCalendarNotesDate 设置时间(日历记事)
   */

  function Calendar(opt) {
    this.time = null;
    this.rect_select = 0; // 框选开关 0 关闭 1点击 2开启

    this.init(opt);
    this.currDate = null;
  }

  function openNoteDetail(_ref) {
    var _ref$title = _ref.title,
        title = _ref$title === void 0 ? '提醒事项' : _ref$title,
        _ref$date = _ref.date,
        date = _ref$date === void 0 ? '' : _ref$date,
        _ref$content = _ref.content,
        content = _ref$content === void 0 ? '' : _ref$content,
        id = _ref.id,
        done = _ref.done;
    var data = {
      planMatter: content,
      planDate: String(date).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
      id: id
    };
    var winIndex = top.layui.renders.con({
      type: 1,
      title: title,
      content: layui.laytpl(tpl_noteDetail).render(data),
      btn: 0,
      area: ['680px', '480px'],
      success: function success() {
        renders.date();
      },
      end: function end() {
        // 刷新列表
        done();
      }
    });
    form.on('submit(win-note-form-submit)', function (_ref2) {
      var field = _ref2.field;
      if (id) field.id = id;
      field.planDate = new Date(field.planDate).toLocaleDateString().replace(/(?<=\/|-|\.|:|\b|T)\d{1}(?=\/|-|\.|:|\b|T)/g, "0$&");
      layui.ajax({
        type: "JSON",
        url: '/plan/savePlan',
        data: JSON.stringify({
          daylist: [field]
        }),
        success: function success(res) {
          renders.msg(res.msg, function () {
            top.layer.close(winIndex);
          });
        }
      });
      return false;
    });
  }

  Calendar.prototype = {
    getNoteListItem: function getNoteListItem(d) {
      return "<li>\n    <p>\n      <span class=\"textline-overflow2\">".concat(d.planMatter || '', "</span>\n    </p>\n    <div class=\"note-control\">\n    <div data-id=").concat(d.id, " data-content=").concat(d.planMatter || '', " class=\"btn-edit-note\"></div>\n    <div data-id=").concat(d.id, " class=\"btn-del-note\"></div>\n    </div>\n</li>");
    },
    init: function init() {
      var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // 日记记事本 S
      if (opt.notes) {
        this.initCalendarNotes(opt);
        var self = this;
        this.container.addEventListener('click', function (e) {
          var tar = e.target;
          var $tar = layui.$(tar);
          var t = tar.dataset.date;

          if (t) {
            layui.$(tar).siblings().removeClass('active-date');
            $tar.addClass('active-date');

            if (typeof opt.done === 'function') {
              opt.done(t);
            }
          }

          if ($tar.hasClass("btn-calendar-premonth")) self.setPreMonth();
          if ($tar.hasClass("btn-calendar-nextmonth")) self.setNextMonth();
        });

        if (opt.noteContainer) {
          layui.$(opt.noteContainer).on('click', '.btn-edit-note', function (e) {
            var tar = e.target;
            var date = String(layui.$('.active-date').data('date'));
            openNoteDetail({
              title: '编辑提醒事项',
              date: date,
              id: tar.dataset.id,
              content: tar.dataset.content,
              done: function done() {
                opt.done(date);
              }
            });
          });
          layui.$(opt.noteContainer).on('click', '.btn-del-note', function (e) {
            var tar = e.target;
            var date = String(layui.$('.active-date').data('date'));
            layer.confirm("删除事项", {
              skin: 'layer-theme-confirm',
              title: '删除事项'
            }, function (index) {
              var id = layui.ajax({
                type: 'POST',
                url: '/plan/deletePlan',
                data: {
                  id: tar.dataset.id
                },
                success: function success(res) {
                  renders.msg(res.msg, function () {
                    opt.done(date);
                  });
                }
              });
            }, function (index) {
              layer.close(index);
            });
          });
          layui.$(opt.noteContainer).on('click', '.btn-add-note', function () {
            var date = String(layui.$('.active-date').data('date'));
            openNoteDetail({
              title: '添加提醒事项',
              date: date,
              done: function done() {
                opt.done(date);
              }
            });
          });
        }

        return false;
      } // E 
      // 普通


      if (!opt.time) {
        opt.time = +new Date();
      }

      this.defaultTime = opt.time;
      this.setDate(opt.time);
      this.maskclose = typeof opt.maskclose === 'undefined' ? true : opt.maskclose;
      this.btns = !Array.isArray(opt.btns) ? [{
        label: '取消',
        event: 'reset'
      }, {
        label: '提交',
        event: 'submit'
      }] : [];
      var select = new Set();

      if (Array.isArray(opt.select)) {
        opt.select.forEach(function (item) {
          return select.add(item.replace(/-/g, ''));
        });
      }

      this.defaultSelect = _toConsumableArray(select);
      this.min = !opt.min ? -Infinity : +new Date(opt.min);
      this.max = !opt.max ? Infinity : +new Date(opt.max);
      this.callback = opt.callback;
      this.addEvent(opt.target, _toConsumableArray(select));
      this.dissel = opt.dissel;
      this.single = opt.single;
      this.noclosebtn = opt.noclosebtn;
      this.newselval = null;
      this.newseltar = null;
    },
    setPreMonth: function setPreMonth() {
      var d = new Date(this.time);

      if (d.toString() === 'Invalid Date') {
        return console.error('Invalid Date: ' + d);
      }

      d.setMonth(d.getMonth() - 1);
      this.setCalendarNotesDate(d.toLocaleDateString());
    },
    setNextMonth: function setNextMonth() {
      var d = new Date(this.time);

      if (d.toString() === 'Invalid Date') {
        return console.error('Invalid Date: ' + d);
      }

      d.setMonth(d.getMonth() + 1);
      this.setCalendarNotesDate(d.toLocaleDateString());
    },
    setCalendarNotesDate: function setCalendarNotesDate(d) {
      var date = new Date(d);

      if (date.toString() === 'Invalid Date') {
        return console.error('Invalid Date: ' + date);
      }

      this.opt.now = date;
      this.initCalendarNotes(this.opt);
    },

    /**
     * @param {node} opt.container
     * @param {number} opt.days 
     * @return {Array} [{ymd: yyyyMMdd, festivals: ['春节'], holiday: [null, true(调休), false(放假)], lauarDay: '初七',  }]
     */
    initCalendarNotes: function initCalendarNotes() {
      var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 展示的天数
      var now = opt.now || new Date();
      var days = opt.days || DEFAULT_DAYS;

      if (now.toString() === 'Invalid Date') {
        return console.error('Invalid Date');
      }

      this.time = now;
      var nowDay = now.getDay();
      var d = new Date(now);
      d.setDate(1);
      var day = d.getDay();
      var monthStartTime = Number(d.toLocaleDateString().replace(/(?<=\/|-|\.|:|\b|T)\d{1}(?=\/|-|\.|:|\b|T)/g, "0$&").replace(/\//g, ''));
      var monthEndTime;
      {
        var nextDate = new Date(d);
        nextDate.setMonth(nextDate.getMonth() + 1);
        nextDate.setDate(0);
        monthEndTime = Number(nextDate.toLocaleDateString().replace(/(?<=\/|-|\.|:|\b|T)\d{1}(?=\/|-|\.|:|\b|T)/g, "0$&").replace(/\//g, ''));
      }
      d.setDate(1 - day + 1);
      var list = [];

      while (list.length + 1 <= days) {
        var _HolidayUtil;

        var lauar = Lunar.fromDate(d);
        var jieqi = lauar.getJieQi();
        var festivals = [].concat(_toConsumableArray(lauar.getFestivals()), _toConsumableArray(lauar.getOtherFestivals()));

        if (jieqi) {
          festivals.unshift(jieqi);
        }

        var holiday = null;

        var holidayDate = (_HolidayUtil = HolidayUtil).getHoliday.apply(_HolidayUtil, _toConsumableArray(d.toLocaleDateString().split('/')));

        if (holidayDate) {
          holiday = holidayDate.isWork(); // false 假期 true 调休
        }

        var ymd = d.toLocaleDateString().replace(/(?<=\/|-|\.|:|\b|T)\d{1}(?=\/|-|\.|:|\b|T)/g, "0$&").replace(/\//g, '');
        var hasThisMonth = Number(ymd) >= monthStartTime && Number(ymd) <= monthEndTime;
        list.push({
          ymd: ymd,
          festivals: festivals,
          lauarDay: lauar.getDayInChinese(),
          holiday: holiday,
          hasThisMonth: hasThisMonth,
          day: d.getDate()
        });
        d.setDate(d.getDate() + 1);
      }

      var container = document.querySelector(opt.container);
      if (!container) return false;
      this.container = container;
      this.rendersCalendarNote(list);
      this.opt = opt;
      this.setCalendarNotesDate = this.setCalendarNotesDate;
      this.setPreMonth = this.setPreMonth;
      this.setNextMonth = this.setNextMonth;
      var nowStr = now.toLocaleDateString().replace(/(?<=\/|-|\.|:|\b|T)\d{1}(?=\/|-|\.|:|\b|T)/g, "0$&").replace(/\//g, '');
      this.container.querySelector('.calendar-time-month').textContent = nowStr.substr(4, 2);
      this.container.querySelector('.calendar-time-year').textContent = nowStr.substr(0, 4);

      if (typeof opt.done === 'function') {
        opt.done(nowStr);
      }

      return this;
    },
    rendersCalendarNote: function rendersCalendarNote(list) {
      var noteTipsList = [];
      layui.ajax({
        type: 'GET',
        async: false,
        url: '/plan/getPlanDateHadData',
        data: {
          date: new Date().toLocaleDateString().replace(/(?<=\/|-|\.|:|\b|T)\d{1}(?=\/|-|\.|:|\b|T)/g, "0$&")
        },
        success: function success(res) {
          noteTipsList = res.dataList.map(function (i) {
            return i.replace(/(\d{4}).?(\d{2}).?(\d{2})(.?)+/, '$1$2$3');
          });
        }
      });
      var container = this.container;
      container.classList.add('calendar-note-container');
      var html = '';
      var WEEK = '一二三四五六日'.split('');
      var header = WEEK.map(function (i) {
        return "<dt>".concat(i, "</dt>");
      });
      var now = new Date().toLocaleDateString().replace(/(?<=\/|-|\.|:|\b|T)\d{1}(?=\/|-|\.|:|\b|T)/g, "0$&").replace(/\//g, '');

      for (var i = 0, len = list.length; i < len; i++) {
        var holiday = list[i].holiday ? '班' : list[i].holiday === null ? '' : '休';
        var lauarday = list[i].festivals[0] || list[i].lauarDay;
        var classNameNote = noteTipsList.includes(list[i].ymd) ? "tip-msg" : "";
        var classNameThisDate = list[i].ymd === now ? 'this-date active-date' : '';
        html += "<dd data-date=\"".concat(list[i].ymd, "\" class=\"").concat(classNameNote, " ").concat(classNameThisDate, " ").concat(holiday ? 'holiday-active' : '', " ").concat(list[i].hasThisMonth ? 'this-month' : '', "\">\n        <span class=\"date-holiday\">").concat(holiday, "</span>\n        <p class=\"date-day\">").concat(list[i].day, "</p>\n        <p class=\"date-lauarday\">").concat(lauarday, "</p>\n      </dd>");
      }

      container.innerHTML = "\n      <div class=\"calendar-pannel-header\">\n        <div class=\"calendar-time\">\n          <span class=\"calendar-time-month\">".concat(now.substr(4, 2), "</span>\n          <span class=\"calendar-time-separate\">/</span>\n          <span class=\"calendar-time-year\">").concat(now.substr(0, 4), "</span>\n        </div>\n        <div class=\"calendar-control\">\n          <div class=\"btn-calendar-premonth\"></div>\n          <div class=\"btn-calendar-nextmonth\"></div>\n        </div>\n      </div>\n      <dl class=\"calendar-week-tit\">").concat(header.join(' '), "  </dl>\n      <dl class=\"calendar-note-days\">").concat(html, "</dl>\n    ");
    },
    reset: function reset() {
      this.setDate(this.defaultTime);
      this.select = new Set(this.defaultSelect);
      this.render(this.tar);
    },
    submit: function submit(isHide) {
      isHide && this.hide();
      this.tar.dataset.value = _toConsumableArray(this.select).sort();

      if (this.single) {
        typeof this.callback === 'function' && this.callback(this.tar, this.newselval.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
      } else {
        this.fillContent(this.tar, this.select);
      }
    },

    /**
     * 返回结果并填充到文本框/节点
     * @param {node} tar 文本框/节点
     * @param {Set} select 选中日期集合
     */
    fillContent: function fillContent(tar, select) {
      var _select = _toConsumableArray(select).sort();

      var result = _select.map(function (item) {
        return item.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
      });

      typeof this.callback === 'function' && this.callback(tar, result);
    },
    show: function show(tar) {
      this.removeDom();
      this.createDom(tar);
      this.render(tar);
    },
    removeDom: function removeDom() {
      // 清除
      var list = document.querySelectorAll('.calendar-container');
      list.forEach(function (item) {
        document.body.removeChild(item);
      });
      document.querySelectorAll(".fix-rect-container").forEach(function (item) {
        document.body.removeChild(item);
      });
    },
    hide: function hide() {
      this.removeDom();
    },
    setDate: function setDate(t) {
      var time = new Date(t);
      var date = time.getDay(); // 周几

      if (Object.is(NaN, date)) {
        console.error("错误的时间格式");
        return;
      }

      this.time = time;
    },
    // 更新时间
    updateDate: function updateDate(month) {
      this.time.setMonth(month);
      this.render();
    },
    render: function render() {
      var _this = this;

      var list = this.getWeekList(); // console.log(list)

      var year = this.time.getFullYear();
      var month = this.time.getMonth();
      var html = document.createDocumentFragment();
      list.forEach(function (item) {
        var dom = document.createElement('div');
        var time = "".concat(item.year).concat(api.markZero(item.month + 1, 2)).concat(api.markZero(item.date, 2));
        dom.innerHTML = item.date;
        dom.dataset.data = time;
        dom.dataset.event = 'select';
        dom.className = "".concat(_className, " ").concat(_this.select.has(time) ? 'select' : '');

        if (item.month !== month) {
          dom.dataset.disabled = true;
        }

        html.appendChild(dom);
      });
      this.content.innerHTML = "";
      this.content.appendChild(html);
      this.time_content.innerHTML = "".concat(year, "\u5E74").concat(month + 1, "\u6708");
    },
    // 创建面板
    createDom: function createDom(tar) {
      var fragment = document.createDocumentFragment();
      var container = document.createElement("div");
      container.className = 'calendar-container';
      var footer = this.btns.length > 0 ? '<div class="calendar-footer">' + this.btns.map(function (item) {
        return "\n        <div data-event=\"".concat(item.event, "\">").concat(item.label, "</div>\n      ");
      }).join('') + '</div>' : '';
      var closebtn = this.noclosebtn ? '' : '<span class="calendar-close-btn" data-event="close" ></span>';
      var temp = "\n      ".concat(closebtn, "\n      <div class=\"calendar-header\">\n        <span class=\"calendar-btn\" data-event=\"preMonth\" >&lt;&lt;</span>\n        <span class=\"time-content\"></span>\n        <span class=\"calendar-btn\" data-event=\"nextMonth\">&gt;&gt;</span>\n      </div>\n      <div class=\"calendar-title\">\n        <div>\u65E5</div>\n        <div>\u4E00</div>\n        <div>\u4E8C</div>\n        <div>\u4E09</div>\n        <div>\u56DB</div>\n        <div>\u4E94</div>\n        <div>\u516D</div>\n      </div>\n      <div class=\"calendar-content\">\n      </div>\n      ").concat(footer, "\n    ");
      container.innerHTML = temp;
      var rect = tar.getBoundingClientRect();
      container.style.top = rect.top + rect.height + 'px';
      container.style.left = rect.left + 'px';
      fragment.appendChild(container);
      document.body.appendChild(fragment);
      this.tar = tar;
      this.container = container;
      this.header = container.querySelector(".calendar-header");
      this.content = container.querySelector(".calendar-content");
      this.time_content = container.querySelector('.time-content');
      this.close_btn = container.querySelector('.calendar-close-btn');
      this.handleReactSelect();
    },
    // 框选
    handleReactSelect: function handleReactSelect() {
      var _this2 = this;

      var hasHandle = false;
      var timer, timer_start;
      var clientX, clientY;
      var rect;

      this.content.onmousedown = function (e) {
        if (e.which !== 1) return false;
        clearTimeout(timer_start);
        _this2.rect_select = 0;
        clientX = e.clientX;
        clientY = e.clientY;
        rect = null;
        timer_start = setTimeout(function () {
          if (_this2.rect_select === 0) {
            _this2.rect_select = 2;
            rect = document.createElement("div");
            rect.className = "fix-rect-container";
            rect.style = "position: fixed; z-index: 9999; border: 1px dotted #333; top: ".concat(clientY, "px; left: ").concat(clientX, "px");
            document.body.appendChild(rect);
          }
        }, 200);
      };

      document.body.onmousemove = function (e) {
        if (_this2.rect_select === 2 && !hasHandle) {
          hasHandle = true; // 控制触发频率

          timer = setTimeout(function () {
            clearTimeout(timer);
            hasHandle = false;
            var rectX = e.clientX - clientX;
            var rectY = e.clientY - clientY;
            var rectLeft = rectX > 0 ? clientX : e.clientX;
            var rectTop = rectY > 0 ? clientY : e.clientY;
            if (!rect) return false;
            rect.style.left = "".concat(rectLeft, "px");
            rect.style.top = "".concat(rectTop, "px");
            var width = Math.abs(rectX);
            var height = Math.abs(rectY);
            rect.style.width = "".concat(Math.abs(width), "px");
            rect.style.height = "".concat(Math.abs(height), "px");

            _this2.container.querySelectorAll(".".concat(_className)).forEach(function (item) {
              var item_rect = item.getBoundingClientRect();
              var _w = item_rect.width;
              var _h = item_rect.height;

              var _x = rectLeft + width;

              var _y = rectTop + height;

              var hasRectSelect = Boolean(_x >= item_rect.x && _y >= item_rect.y && rectLeft <= item_rect.x + _w && rectTop <= item_rect.y + _h);

              if (hasRectSelect && !_toConsumableArray(item.classList).includes('select')) {
                _this2.handSelectDate(item);
              }
            });
          }, 60);
        }
      };

      document.body.onmouseup = function (e) {
        clearTimeout(timer_start);
        clearTimeout(timer);
        hasHandle = false;
        _this2.rect_select = 0;

        if (rect) {
          document.body.removeChild(rect);
          rect = null;
        }
      };
    },
    // 选择时间
    handSelectDate: function handSelectDate(e) {
      var tar = e.target || e;
      var className = tar.className;
      var classList = new Set(className.split(" "));
      var time = tar.dataset.data;
      var can = true;

      if (this.dissel) {
        //选中的不给选择
        this.defaultSelect.forEach(function (item, index) {
          if (item == time) {
            can = false;
          }
        });
      }

      if (!can) return false;

      var _time = +new Date(String(time).replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3'));

      if (_time > this.max) return false;
      if (_time < this.min) return false;

      if (_toConsumableArray(classList).includes(_className)) {
        if (this.select.has(time)) {
          classList["delete"]('select');
          this.select["delete"](time);
          tar.dataset.select = 0;
        } else {
          if (this.single && this.newselval) {
            //新增只能选一个
            this.select["delete"](this.newselval);
            this.newseltar.className = "calendar-date-select  ";
            this.newseltar.dataset.select = 0;
          }

          this.newselval = time;
          this.newseltar = e.target || e;
          this.select.add(time);
          classList.add('select');
          tar.dataset.select = 1;
        }

        tar.className = _toConsumableArray(classList).join(" ");
        this.submit();
      }
    },
    // 监听事件
    addEvent: function addEvent(tar, select) {
      var _this3 = this;

      document.querySelectorAll(tar).forEach(function (item) {
        // 填充初始值
        _this3.fillContent(item, select);

        item.addEventListener("click", function (e) {
          e.stopPropagation();
          e.cancelBubble = true;
          select = item.dataset.value === undefined ? select : (item.dataset.value || '').split(",");
          item.dataset.value = _toConsumableArray(select);
          _this3.defaultSelect.select = select;
          _this3.select = new Set(select);

          _this3.show(item);
        });
      });
      document.addEventListener("click", function (e) {
        var _tar$dataset;

        var tar = e.target;
        var event = (_tar$dataset = tar.dataset) === null || _tar$dataset === void 0 ? void 0 : _tar$dataset.event;
        var hasChild = Boolean(tar.closest('.calendar-container'));
        if (!hasChild && _this3.maskclose) event = 'hide';

        switch (event) {
          case "preMonth":
            _this3.updateDate(_this3.time.getMonth() - 1);

            break;

          case "nextMonth":
            _this3.updateDate(_this3.time.getMonth() + 1);

            break;

          case "close":
            _this3.hide();

            break;

          case "select":
            _this3.rect_select = 1;

            _this3.handSelectDate(e);

            break;

          case "hide":
            _this3.hide();

            break;

          case "reset":
            _this3.reset();

            break;

          case "submit":
            _this3.submit(true);

            break;
        }
      });
    },

    /**
     * 返回当前月时间切割后的数组
     * @method getWeekList
     */
    getWeekList: function getWeekList() {
      var dayList = [];
      var timestamp = this.time.getTime();
      var t = new Date(timestamp);
      var year = t.getFullYear();
      var month = t.getMonth(); // 上个月

      t.setDate(1);
      var day = t.getDay(); // 星期几

      t.setDate(0);
      var preMonthDays = t.getDate(); // 上个月天数

      var preMonthDaysList = [];

      if (day <= 6) {
        for (var i = 0; i < day; i++) {
          // preMonthDaysList.push({ date: preMonthDays-day+i+1, year: month === 0? year-1: year , month: month-1 })//bug 出现20200027-20200031
          preMonthDaysList.push({
            date: preMonthDays - day + i + 1,
            year: month === 0 ? year - 1 : year,
            month: month === 0 ? 11 : month - 1
          });
        }
      } // 本月


      t = new Date(timestamp);
      t.setMonth(month + 1);
      t.setDate(0);
      var days = t.getDate(); // 本月天数

      var next_max_day = t.getDay(); // 月末周几

      for (var _i = 1; _i <= days; _i++) {
        dayList.push({
          year: year,
          month: month,
          date: _i
        });
      } // 下个月


      var nextMonthDaysList = [];

      for (var _i2 = 1; _i2 < 7 - next_max_day; _i2++) {
        // nextMonthDaysList.push({ date: i, year: month === 11? year+1 : year, month: month+1 }) //bug 出现了20211301 20211302
        nextMonthDaysList.push({
          date: _i2,
          year: month === 11 ? year + 1 : year,
          month: month === 11 ? 0 : month + 1
        });
      }

      return [].concat(preMonthDaysList, dayList, nextMonthDaysList);
    }
  };
  exports('calendar', function (option) {
    return new Calendar(option);
  });
});