"use strict";

;
layui.define(function (e) {
  var MODE_NAME = "console";
  layui.use(['element', 'jquery', 'ajax', 'api', 'renders', 'laytpl', 'laydate'], function () {
    var $ = layui.jquery,
        tpl = layui.laytpl;
    var getTpl = indexBoxCheck.innerHTML,
        view = $("#index-check-view");
    create({});

    function create(data) {
      tpl(getTpl).render(data, function (html) {
        view.html(html);
      });
    }
  }), e(MODE_NAME, {});
});