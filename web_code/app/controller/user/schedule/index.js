/*
 * @Author: hoovoi
 * @Date: 2022-02-25 09:03:14
 * @LastEditors: hoovoi
 * @LastEditTime: 2022-03-03 17:11:03
 * @description: 
 */
layui.define(function (e) {
   var MODE_NAME = "UserScheduleIndex";
      layui.use(['element', 'jquery', 'table', 'form', 'laytpl', 'ajax', 'api', 'renders', 'calendar'], function () {
      const $ = layui.jquery;
      const {laytpl, ajax, api, form, renders} = layui;

      const nodeNote = $('.schedule-note-list');
      const nodeTitleDay = $('.schedule-note-day');
      const nodeTitleMonth = $('.schedule-note-month');

      // 日历笔记本
      const calendarNote = layui.calendar({ 
         notes: true, 
         container: '.schedule-canclear-container', 
         noteContainer: '.schedule-note-container',
         done: handleCalendarDone 
      });

      renderNoteList()

      function handleCalendarDone(t){
         nodeTitleDay.html(t.substr(6,2));
         nodeTitleMonth.html(t.substr(4,2))
         ajax({
            url: '/plan/getPlanByDay',
            data: {
               date: new Date(t.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')).toLocaleDateString().replace(/(?<=\/|-|\.|:|\b|T)\d{1}(?=\/|-|\.|:|\b|T)/g, "0$&")
            },
            success: function(res) {
               renderNoteList(res.dataList)
            }
         })
      }

      function renderNoteList(list=[]){
         let nodeList = list.map( i => calendarNote.getNoteListItem(i))
         nodeNote.html(nodeList.join(''))
      }
   }),
  e(MODE_NAME, {})
})