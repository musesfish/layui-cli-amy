"use strict";

/** layui-v2.4.3 MIT License By https://www.layui.com */
;
layui.define("jquery", function (e) {
  "use strict";

  var a = layui.$;
  e("code", function (e) {
    var l = [];
    (e = e || {}).elem = a(e.elem || ".layui-code"), e.about = !("about" in e) || e.about, e.elem.each(function () {
      l.push(this);
    }), layui.each(l.reverse(), function (l, t) {
      var i = a(t),
          c = i.html();
      (i.attr("lay-encode") || e.encode) && (c = c.replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")), i.html('<ol class="layui-code-ol"><li>' + c.replace(/[\r\t\n]+/g, "</li><li>") + "</li></ol>"), i.find(">.layui-code-h3")[0] || i.prepend('<h3 class="layui-code-h3">' + (i.attr("lay-title") || e.title || "code") + (e.about ? '<a href="http://www.layui.com/doc/modules/code.html" target="_blank">layui.code</a>' : "") + "</h3>");
      var o = i.find(">.layui-code-ol");
      i.addClass("layui-box layui-code-view"), (i.attr("lay-skin") || e.skin) && i.addClass("layui-code-" + (i.attr("lay-skin") || e.skin)), (o.find("li").length / 100 | 0) > 0 && o.css("margin-left", (o.find("li").length / 100 | 0) + "px"), (i.attr("lay-height") || e.height) && o.css("max-height", i.attr("lay-height") || e.height);
    });
  });
}).addcss("modules/code.css", "skincodecss");