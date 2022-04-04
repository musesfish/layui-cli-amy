/*
 * @Author: hoovoi
 * @Date: 2020-10-28 09:07:39
 * @LastEditors: hoovoi
 * @LastEditTime: 2022-03-09 10:54:19
 * 日历-时间选择
 */

layui.define(["jquery", "api", "renders", "form", "laydate", "laytpl", "ajax"], function (exports) {
  const $ = layui.jquery;
  const { api, renders, form } = layui;
  const _className = "calendar-date-select";
  const DEFAULT_DAYS = 5 * 7; // 默认显示的天数（日历记事组件）

  const tpl_noteDetail = `
    <form class='layui-form pad-20' lay-filter='win-note-form'>
    <table class="layui-table form-table">
      <colgroup>
        <col width="130">
        <col>
      </colgroup>
      <tr>
        <td><b></b>提醒内容</td>
        <td>
          <div>
            <textarea lay-verify="required" name="planMatter" id="" cols="20" rows="10" class="layui-textarea" maxlength="30">{{d.planMatter}}</textarea>
          </div>
        </td>
      </tr>
      <tr>
        <td><b></b>提醒日期</td>
        <td><input type="text" lay-verify="required" name="planDate" class="layui-input laydate laydate-inp-label" value="{{d.planDate}}"></td>
      </tr>
    </table>
    <div class='layui-row text-center mt-30'>
      <button class='layui-btn jin-btn-submit' lay-submit lay-filter='win-note-form-submit'>保存</button>
    </div>
  </form>`

  layui.link("/static/css/component/calendar.css")

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
    this.init(opt)
    this.currDate = null;
  }

  function openNoteDetail({ title='提醒事项', date='', content='', id, done}){
    const data = {
      planMatter: content,
      planDate: String(date).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
      id: id
    }
    const winIndex = top.layui.renders.con({
        type: 1,
        title,
        content: layui.laytpl(tpl_noteDetail).render(data),
        btn: 0,
        area: ['680px', '480px'],
        success: function(){
          renders.date()
        },
        end: function(){
          // 刷新列表
          done()
        } 
    });
    form.on('submit(win-note-form-submit)', function ({field}) {
      if (id) field.id = id;
      field.planDate = new Date(field.planDate).toLocaleDateString().replace(/(?<=\/|-|\.|:|\b|T)\d{1}(?=\/|-|\.|:|\b|T)/g, "0$&");
      layui.ajax({
        type: "JSON",
        url: '/plan/savePlan',
        data: JSON.stringify({ daylist: [field] }),
        success: function(res){
          renders.msg(res.msg, function(){
            top.layer.close(winIndex);
          })
        }
      })
      return false;
    })
}

  Calendar.prototype = {
    getNoteListItem(d) {
      return `<li>
    <p>
      <span class="textline-overflow2">${d.planMatter||''}</span>
    </p>
    <div class="note-control">
    <div data-id=${d.id} data-content=${d.planMatter||''} class="btn-edit-note"></div>
    <div data-id=${d.id} class="btn-del-note"></div>
    </div>
</li>`
    },
    init: function (opt = {}) {
      // 日记记事本 S
      if (opt.notes) {
        this.initCalendarNotes(opt)
        const self = this;
        this.container.addEventListener('click', function (e) {
          const tar = e.target;
          const $tar = layui.$(tar);
          const t = tar.dataset.date;
          if (t) {
            layui.$(tar).siblings().removeClass('active-date')
            $tar.addClass('active-date')
            if (typeof opt.done === 'function') {
              opt.done(t)
            }
          }
          if ($tar.hasClass("btn-calendar-premonth")) self.setPreMonth();
          if ($tar.hasClass("btn-calendar-nextmonth")) self.setNextMonth();
        })

        if (opt.noteContainer) {
          layui.$(opt.noteContainer).on('click', '.btn-edit-note', function(e){
            const tar = e.target;
            const date = String(layui.$('.active-date').data('date'));
            openNoteDetail({
                title: '编辑提醒事项',
                date,
                id: tar.dataset.id,
                content: tar.dataset.content,
                done: function(){
                  opt.done(date)
                }
              })
          })
          layui.$(opt.noteContainer).on('click', '.btn-del-note', function(e){
              const tar = e.target;
              const date = String(layui.$('.active-date').data('date'));
              layer.confirm("删除事项", {
                skin: 'layer-theme-confirm',
                title: '删除事项' 
              }, function(index){
                const id = 
                layui.ajax({
                  type: 'POST',
                  url: '/plan/deletePlan',
                  data: {
                    id: tar.dataset.id
                  },
                  success: function(res){
                    renders.msg(res.msg, function(){
                      opt.done(date)
                    })
                  }
                })
              }, function(index){
                layer.close(index)
              })
          })
          layui.$(opt.noteContainer).on('click', '.btn-add-note', function(){
            const date = String(layui.$('.active-date').data('date'));
              openNoteDetail({
                  title: '添加提醒事项',
                  date,
                  done: function(){
                    opt.done(date)
                  }
              })
          })
        }
        return false;
      }
      // E 

      // 普通
      if (!opt.time) {
        opt.time = +new Date()
      }
      this.defaultTime = opt.time;
      this.setDate(opt.time)
      this.maskclose = typeof opt.maskclose === 'undefined' ? true : opt.maskclose;
      this.btns = !Array.isArray(opt.btns) ? [{ label: '取消', event: 'reset' }, { label: '提交', event: 'submit' }] : [];
      const select = new Set()
      if (Array.isArray(opt.select)) {
        opt.select.forEach(
          item => select.add(item.replace(/-/g, ''))
        )
      }
      this.defaultSelect = [...select];
      this.min = !opt.min ? -Infinity : +new Date(opt.min);
      this.max = !opt.max ? Infinity : +new Date(opt.max);
      this.callback = opt.callback;
      this.addEvent(opt.target, [...select]);
      this.dissel = opt.dissel;
      this.single = opt.single;
      this.noclosebtn = opt.noclosebtn;
      this.newselval = null;
      this.newseltar = null;
    },

    setPreMonth() {
      let d = new Date(this.time);
      if (d.toString() === 'Invalid Date') {
        return console.error('Invalid Date: ' + d)
      }
      d.setMonth(d.getMonth() - 1);
      this.setCalendarNotesDate(d.toLocaleDateString())
    },

    setNextMonth() {
      let d = new Date(this.time);
      if (d.toString() === 'Invalid Date') {
        return console.error('Invalid Date: ' + d)
      }
      d.setMonth(d.getMonth() + 1);
      this.setCalendarNotesDate(d.toLocaleDateString())
    },

    setCalendarNotesDate(d) {
      const date = new Date(d);
      if (date.toString() === 'Invalid Date') {
        return console.error('Invalid Date: ' + date)
      }
      this.opt.now = date;
      this.initCalendarNotes(this.opt)
    },

    /**
     * @param {node} opt.container
     * @param {number} opt.days 
     * @return {Array} [{ymd: yyyyMMdd, festivals: ['春节'], holiday: [null, true(调休), false(放假)], lauarDay: '初七',  }]
     */
    initCalendarNotes(opt = {}) {
      // 展示的天数
      const now = opt.now || new Date();
      const days = opt.days || DEFAULT_DAYS;
      if (now.toString() === 'Invalid Date') {
        return console.error('Invalid Date')
      }
      this.time = now;
      const nowDay = now.getDay();
      let d = new Date(now);
      d.setDate(1)
      const day = d.getDay()
      const monthStartTime = Number(d.toLocaleDateString().replace(/(?<=\/|-|\.|:|\b|T)\d{1}(?=\/|-|\.|:|\b|T)/g, "0$&").replace(/\//g, ''));
      let monthEndTime;
      {
        let nextDate = new Date(d);
        nextDate.setMonth(nextDate.getMonth() + 1);
        nextDate.setDate(0);
        monthEndTime = Number(nextDate.toLocaleDateString().replace(/(?<=\/|-|\.|:|\b|T)\d{1}(?=\/|-|\.|:|\b|T)/g, "0$&").replace(/\//g, ''));
      }
      d.setDate(1 - day + 1);
      let list = [];
      while (list.length + 1 <= days) {
        let lauar = Lunar.fromDate(d)
        let jieqi = lauar.getJieQi()
        let festivals = [
          ...lauar.getFestivals(),
          ...lauar.getOtherFestivals(),
        ]
        if (jieqi) {
          festivals.unshift(jieqi)
        }
        let holiday = null;
        let holidayDate = HolidayUtil.getHoliday(...(d.toLocaleDateString().split('/')));
        if (holidayDate) {
          holiday = holidayDate.isWork(); // false 假期 true 调休
        }
        const ymd = d.toLocaleDateString().replace(/(?<=\/|-|\.|:|\b|T)\d{1}(?=\/|-|\.|:|\b|T)/g, "0$&").replace(/\//g, '');
        const hasThisMonth = (Number(ymd) >= monthStartTime && Number(ymd) <= monthEndTime)
        list.push({
          ymd,
          festivals,
          lauarDay: lauar.getDayInChinese(),
          holiday,
          hasThisMonth,
          day: d.getDate()
        })
        d.setDate(d.getDate() + 1)
      }
      const container = document.querySelector(opt.container);
      if (!container) return false;
      this.container = container;
      this.rendersCalendarNote(list)

      this.opt = opt;
      this.setCalendarNotesDate = this.setCalendarNotesDate;
      this.setPreMonth = this.setPreMonth;
      this.setNextMonth = this.setNextMonth;

      const nowStr = now.toLocaleDateString().replace(/(?<=\/|-|\.|:|\b|T)\d{1}(?=\/|-|\.|:|\b|T)/g, "0$&").replace(/\//g, '')
      this.container.querySelector('.calendar-time-month').textContent = nowStr.substr(4, 2);
      this.container.querySelector('.calendar-time-year').textContent = nowStr.substr(0, 4);
      
      if (typeof opt.done === 'function') {
        opt.done(nowStr)
      }
      return this;
    },

    rendersCalendarNote(list) {
      let noteTipsList = [];
      layui.ajax({
        type: 'GET',
        async: false,
        url: '/plan/getPlanDateHadData',
        data: { date: new Date().toLocaleDateString().replace(/(?<=\/|-|\.|:|\b|T)\d{1}(?=\/|-|\.|:|\b|T)/g, "0$&") },
        success: function(res){
          noteTipsList = res.dataList.map( i => i.replace(/(\d{4}).?(\d{2}).?(\d{2})(.?)+/, '$1$2$3') )
        }
      })
      const container = this.container;
      container.classList.add('calendar-note-container')
      let html = '';
      const WEEK = '一二三四五六日'.split('');
      const header = WEEK.map(i => `<dt>${i}</dt>`);
      const now = new Date().toLocaleDateString().replace(/(?<=\/|-|\.|:|\b|T)\d{1}(?=\/|-|\.|:|\b|T)/g, "0$&").replace(/\//g, '');
      for (let i = 0, len = list.length; i < len; i++) {
        const holiday = list[i].holiday ? '班' : list[i].holiday === null ? '' : '休'
        const lauarday = list[i].festivals[0] || list[i].lauarDay;
        const classNameNote = noteTipsList.includes(list[i].ymd) ? "tip-msg" : "";
        const classNameThisDate = list[i].ymd === now ? 'this-date active-date' : '';
        html += `<dd data-date="${list[i].ymd}" class="${classNameNote} ${classNameThisDate} ${holiday ? 'holiday-active' : ''} ${list[i].hasThisMonth ? 'this-month' : ''}">
        <span class="date-holiday">${holiday}</span>
        <p class="date-day">${list[i].day}</p>
        <p class="date-lauarday">${lauarday}</p>
      </dd>`
      }
      container.innerHTML = `
      <div class="calendar-pannel-header">
        <div class="calendar-time">
          <span class="calendar-time-month">${now.substr(4,2)}</span>
          <span class="calendar-time-separate">/</span>
          <span class="calendar-time-year">${now.substr(0, 4)}</span>
        </div>
        <div class="calendar-control">
          <div class="btn-calendar-premonth"></div>
          <div class="btn-calendar-nextmonth"></div>
        </div>
      </div>
      <dl class="calendar-week-tit">${header.join(' ')}  </dl>
      <dl class="calendar-note-days">${html}</dl>
    `
    },

    reset: function () {
      this.setDate(this.defaultTime)
      this.select = new Set(this.defaultSelect)
      this.render(this.tar)
    },

    submit: function (isHide) {
      isHide && this.hide();
      this.tar.dataset.value = [...this.select].sort()
      if (this.single) {
        typeof this.callback === 'function' && this.callback(this.tar, this.newselval.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'))
      } else {
        this.fillContent(this.tar, this.select)
      }
    },

    /**
     * 返回结果并填充到文本框/节点
     * @param {node} tar 文本框/节点
     * @param {Set} select 选中日期集合
     */
    fillContent: function (tar, select) {
      const _select = [...select].sort()
      const result = _select.map(
        item => item.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
      )
      typeof this.callback === 'function' && this.callback(tar, result)
    },

    show: function (tar) {
      this.removeDom()
      this.createDom(tar)
      this.render(tar)
    },

    removeDom: function () {
      // 清除
      const list = document.querySelectorAll('.calendar-container');
      list.forEach(
        item => {
          document.body.removeChild(item)
        }
      )
      document.querySelectorAll(".fix-rect-container").forEach(
        item => {
          document.body.removeChild(item)
        }
      )
    },

    hide: function () {
      this.removeDom()
    },

    setDate: function (t) {
      const time = new Date(t);
      const date = time.getDay(); // 周几
      if (Object.is(NaN, date)) {
        console.error("错误的时间格式")
        return;
      }
      this.time = time;
    },

    // 更新时间
    updateDate: function (month) {
      this.time.setMonth(month)
      this.render()
    },

    render: function () {
      const list = this.getWeekList()
      // console.log(list)
      const year = this.time.getFullYear();
      const month = this.time.getMonth()
      let html = document.createDocumentFragment();
      list.forEach(
        item => {
          const dom = document.createElement('div')
          const time = `${item.year}${api.markZero(item.month + 1, 2)}${api.markZero(item.date, 2)}`
          dom.innerHTML = item.date;
          dom.dataset.data = time
          dom.dataset.event = 'select'
          dom.className = `${_className} ${this.select.has(time) ? 'select' : ''}`
          if (item.month !== month) {
            dom.dataset.disabled = true
          }
          html.appendChild(dom)
        }
      )
      this.content.innerHTML = "";
      this.content.appendChild(html)

      this.time_content.innerHTML = `${year}年${month + 1}月`
    },

    // 创建面板
    createDom: function (tar) {
      const fragment = document.createDocumentFragment();
      const container = document.createElement("div");
      container.className = 'calendar-container'
      const footer = this.btns.length > 0 ? '<div class="calendar-footer">' + (this.btns.map(
        item => `
        <div data-event="${item.event}">${item.label}</div>
      `
      )).join('') + '</div>' : '';
      const closebtn = this.noclosebtn ? '' : '<span class="calendar-close-btn" data-event="close" ></span>'
      const temp = `
      ${closebtn}
      <div class="calendar-header">
        <span class="calendar-btn" data-event="preMonth" >&lt;&lt;</span>
        <span class="time-content"></span>
        <span class="calendar-btn" data-event="nextMonth">&gt;&gt;</span>
      </div>
      <div class="calendar-title">
        <div>日</div>
        <div>一</div>
        <div>二</div>
        <div>三</div>
        <div>四</div>
        <div>五</div>
        <div>六</div>
      </div>
      <div class="calendar-content">
      </div>
      ${footer}
    `
      container.innerHTML = temp;
      const rect = tar.getBoundingClientRect();
      container.style.top = (rect.top + rect.height) + 'px';
      container.style.left = rect.left + 'px';
      fragment.appendChild(container);
      document.body.appendChild(fragment)
      this.tar = tar;
      this.container = container;
      this.header = container.querySelector(".calendar-header");
      this.content = container.querySelector(".calendar-content");
      this.time_content = container.querySelector('.time-content');
      this.close_btn = container.querySelector('.calendar-close-btn');
      this.handleReactSelect()
    },

    // 框选
    handleReactSelect: function () {
      let hasHandle = false;
      let timer, timer_start;
      let clientX, clientY;
      let rect;

      this.content.onmousedown = (e) => {
        if (e.which !== 1) return false;
        clearTimeout(timer_start);
        this.rect_select = 0;
        clientX = e.clientX;
        clientY = e.clientY;
        rect = null;
        timer_start = setTimeout(() => {
          if (this.rect_select === 0) {
            this.rect_select = 2;
            rect = document.createElement("div");
            rect.className = "fix-rect-container"
            rect.style = `position: fixed; z-index: 9999; border: 1px dotted #333; top: ${clientY}px; left: ${clientX}px`;
            document.body.appendChild(rect)
          }
        }, 200);
      }
      document.body.onmousemove = (e) => {
        if (this.rect_select === 2 && !hasHandle) {
          hasHandle = true; // 控制触发频率
          timer = setTimeout(() => {
            clearTimeout(timer);
            hasHandle = false;
            const rectX = e.clientX - clientX
            const rectY = e.clientY - clientY
            let rectLeft = rectX > 0 ? clientX : e.clientX;
            let rectTop = rectY > 0 ? clientY : e.clientY;
            if (!rect) return false;
            rect.style.left = `${rectLeft}px`;
            rect.style.top = `${rectTop}px`
            const width = Math.abs(rectX);
            const height = Math.abs(rectY);
            rect.style.width = `${Math.abs(width)}px`
            rect.style.height = `${Math.abs(height)}px`
            this.container.querySelectorAll(`.${_className}`).forEach(
              (item) => {
                const item_rect = item.getBoundingClientRect();
                const _w = item_rect.width;
                const _h = item_rect.height;
                const _x = rectLeft + width;
                const _y = rectTop + height;
                const hasRectSelect = Boolean(
                  _x >= item_rect.x &&
                  _y >= item_rect.y &&
                  (rectLeft <= item_rect.x + _w) &&
                  (rectTop <= item_rect.y + _h)
                )
                if (hasRectSelect && ![...item.classList].includes('select')) {
                  this.handSelectDate(item)
                }
              }
            )
          }, 60)
        }
      }
      document.body.onmouseup = (e) => {
        clearTimeout(timer_start);
        clearTimeout(timer);
        hasHandle = false;
        this.rect_select = 0;
        if (rect) {
          document.body.removeChild(rect)
          rect = null;
        }
      }
    },

    // 选择时间
    handSelectDate: function (e) {
      const tar = e.target || e;
      const className = tar.className;
      let classList = new Set(className.split(" "));
      let time = tar.dataset.data;
      let can = true;
      if (this.dissel) {//选中的不给选择
        this.defaultSelect.forEach((item, index) => {
          if (item == time) {
            can = false;
          }
        })
      }
      if (!can) return false;
      let _time = +new Date(String(time).replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3'));
      if (_time > this.max) return false;
      if (_time < this.min) return false;
      if ([...classList].includes(_className)) {
        if (this.select.has(time)) {
          classList.delete('select')
          this.select.delete(time)
          tar.dataset.select = 0;
        } else {
          if (this.single && this.newselval) {//新增只能选一个
            this.select.delete(this.newselval);
            this.newseltar.className = "calendar-date-select  ";
            this.newseltar.dataset.select = 0;
          }
          this.newselval = time;
          this.newseltar = e.target || e;
          this.select.add(time)
          classList.add('select')
          tar.dataset.select = 1;
        }
        tar.className = [...classList].join(" ")
        this.submit()
      }
    },

    // 监听事件
    addEvent: function (tar, select) {
      document.querySelectorAll(tar).forEach(
        item => {
          // 填充初始值
          this.fillContent(item, select);
          item.addEventListener("click", e => {
            e.stopPropagation()
            e.cancelBubble = true;
            select = item.dataset.value === undefined ? select : (item.dataset.value || '').split(",")
            item.dataset.value = [...select];
            this.defaultSelect.select = select;
            this.select = new Set(select)
            this.show(item)
          })
        }
      )

      document.addEventListener("click", (e) => {
        const tar = e.target;
        let event = tar.dataset?.event;
        const hasChild = Boolean(tar.closest('.calendar-container'))
        if (!hasChild && this.maskclose) event = 'hide';
        switch (event) {
          case "preMonth": this.updateDate(this.time.getMonth() - 1); break;
          case "nextMonth": this.updateDate(this.time.getMonth() + 1); break;
          case "close": this.hide(); break;
          case "select": this.rect_select = 1; this.handSelectDate(e); break;
          case "hide": this.hide(); break;
          case "reset": this.reset(); break;
          case "submit": this.submit(true); break;
        }
      })
    },

    /**
     * 返回当前月时间切割后的数组
     * @method getWeekList
     */
    getWeekList: function () {
      let dayList = [];
      const timestamp = this.time.getTime();
      let t = new Date(timestamp);
      const year = t.getFullYear()
      const month = t.getMonth();
      // 上个月
      t.setDate(1)
      const day = t.getDay(); // 星期几
      t.setDate(0)
      const preMonthDays = t.getDate(); // 上个月天数
      let preMonthDaysList = [];
      if (day <= 6) {
        for (let i = 0; i < day; i++) {
          // preMonthDaysList.push({ date: preMonthDays-day+i+1, year: month === 0? year-1: year , month: month-1 })//bug 出现20200027-20200031
          preMonthDaysList.push({ date: preMonthDays - day + i + 1, year: month === 0 ? year - 1 : year, month: month === 0 ? 11 : month - 1 })
        }
      }
      // 本月
      t = new Date(timestamp);
      t.setMonth(month + 1)
      t.setDate(0)
      const days = t.getDate(); // 本月天数
      const next_max_day = t.getDay();  // 月末周几
      for (let i = 1; i <= days; i++) {
        dayList.push({ year: year, month: month, date: i })
      }
      // 下个月
      let nextMonthDaysList = [];
      for (let i = 1; i < (7 - next_max_day); i++) {
        // nextMonthDaysList.push({ date: i, year: month === 11? year+1 : year, month: month+1 }) //bug 出现了20211301 20211302
        nextMonthDaysList.push({ date: i, year: month === 11 ? year + 1 : year, month: month === 11 ? 0 : month + 1 })
      }

      return [...preMonthDaysList, ...dayList, ...nextMonthDaysList]
    }
  }

  exports('calendar', function (option) {
    return new Calendar(option);
  })
})