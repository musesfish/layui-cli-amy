"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/** layui-v2.4.3 MIT License By https://www.layui.com */
;
layui.define("layer", function (e) {
  "use strict";

  var i = layui.$,
      t = layui.layer,
      n = layui.hint(),
      o = layui.device(),
      a = {
    config: {},
    set: function set(e) {
      return this.config = i.extend({}, this.config, e), this;
    },
    on: function on(e, i) {
      return layui.onevent.call(this, l, e, i);
    }
  },
      l = "upload",
      r = "layui-upload-form",
      u = "layui-upload-iframe",
      c = "layui-upload-choose",
      s = function s(e) {
    this.config = i.extend({}, this.config, a.config, e), this.render();
  };

  s.prototype.config = {
    accept: "images",
    exts: "",
    auto: !0,
    bindAction: "",
    url: "",
    field: "file",
    method: "post",
    data: {},
    drag: !0,
    size: 0,
    number: 0,
    multiple: !1
  }, s.prototype.render = function (e) {
    (e = this.config).elem = i(e.elem), e.bindAction = i(e.bindAction), this.file(), this.events();
  }, s.prototype.file = function () {
    var e = this.config,
        t = this.elemFile = i(['<input class="layui-upload-file" type="file" accept="' + e.acceptMime + '" name="' + e.field + '"', e.multiple ? " multiple" : "", ">"].join("")),
        n = e.elem.next();
    (n.hasClass("layui-upload-file") || n.hasClass(r)) && n.remove(), o.ie && o.ie < 10 && e.elem.wrap('<div class="layui-upload-wrap"></div>'), this.isFile() ? (this.elemFile = e.elem, e.field = e.elem[0].name) : e.elem.after(t), o.ie && o.ie < 10 && this.initIE();
  }, s.prototype.initIE = function () {
    var e = this.config,
        t = i('<iframe id="' + u + '" class="' + u + '" name="' + u + '" frameborder="0"></iframe>'),
        n = i(['<form target="' + u + '" class="' + r + '" method="post" key="set-mine" enctype="multipart/form-data" action="' + e.url + '">', "</form>"].join(""));
    i("#" + u)[0] || i("body").append(t), e.elem.next().hasClass(r) || (this.elemFile.wrap(n), e.elem.next("." + r).append(function () {
      var i = [];
      return layui.each(e.data, function (e, t) {
        t = "function" == typeof t ? t() : t, i.push('<input type="hidden" name="' + e + '" value="' + t + '">');
      }), i.join("");
    }()));
  }, s.prototype.msg = function (e) {
    return t.msg(e, {
      icon: 2,
      shift: 6
    });
  }, s.prototype.isFile = function () {
    var e = this.config.elem[0];
    if (e) return "input" === e.tagName.toLocaleLowerCase() && "file" === e.type;
  }, s.prototype.preview = function (e) {
    window.FileReader && layui.each(this.chooseFiles, function (i, t) {
      var n = new FileReader();
      n.readAsDataURL(t), n.onload = function () {
        e && e(i, t, this.result);
      };
    });
  }, s.prototype.upload = function (e, t) {
    var n,
        a = this,
        l = a.config,
        r = a.elemFile[0],
        f = function f() {
      var t = 0,
          n = 0,
          o = e || a.files || a.chooseFiles || r.files,
          u = function u() {
        l.multiple && t + n === a.fileLength && "function" == typeof l.allDone && l.allDone({
          total: a.fileLength,
          successful: t,
          aborted: n
        });
      };

      layui.each(o, function (e, o) {
        var r = new FormData();
        r.append(l.field, o), layui.each(l.data, function (e, i) {
          i = "function" == typeof i ? i() : i, r.append(e, i);
        }), i.ajax({
          url: l.url,
          type: "post",
          data: r,
          contentType: !1,
          processData: !1,
          dataType: "json",
          headers: l.headers || {},
          success: function success(i) {
            t++, p(e, i), u();
          },
          error: function error() {
            n++, a.msg("请求上传接口出现异常"), d(e), u();
          }
        });
      });
    },
        p = function p(e, i) {
      if (a.elemFile.next("." + c).remove(), r.value = "", "object" != _typeof(i)) try {
        i = JSON.parse(i);
      } catch (e) {
        return i = {}, a.msg("请对上传接口返回有效JSON");
      }
      "function" == typeof l.done && l.done(i, e || 0, function (e) {
        a.upload(e);
      });
    },
        d = function d(e) {
      l.auto && (r.value = ""), "function" == typeof l.error && l.error(e || 0, function (e) {
        a.upload(e);
      });
    },
        h = l.exts,
        m = function () {
      var i = [];
      return layui.each(e || a.chooseFiles, function (e, t) {
        i.push(t.name);
      }), i;
    }(),
        v = {
      preview: function preview(e) {
        a.preview(e);
      },
      upload: function upload(e, i) {
        var t = {};
        t[e] = i, a.upload(t);
      },
      pushFile: function pushFile() {
        return a.files = a.files || {}, layui.each(a.chooseFiles, function (e, i) {
          a.files[e] = i;
        }), a.files;
      },
      resetFile: function resetFile(e, i, t) {
        var n = new File([i], t);
        a.files = a.files || {}, a.files[e] = n;
      }
    };

    if (0 !== (m = 0 === m.length ? r.value.match(/[^\/\\]+\..+/g) || [] || "" : m).length) {
      switch (l.accept) {
        case "file":
          if (h && !RegExp("\\w\\.(" + h + ")$", "i").test(escape(m))) return a.msg("选择的文件中包含不支持的格式"), r.value = "";
          break;

        case "video":
          if (!RegExp("\\w\\.(" + (h || "avi|mp4|wma|rmvb|rm|flash|3gp|flv") + ")$", "i").test(escape(m))) return a.msg("选择的视频中包含不支持的格式"), r.value = "";
          break;

        case "audio":
          if (!RegExp("\\w\\.(" + (h || "mp3|wav|mid") + ")$", "i").test(escape(m))) return a.msg("选择的音频中包含不支持的格式"), r.value = "";
          break;

        default:
          if (layui.each(m, function (e, i) {
            RegExp("\\w\\.(" + (h || "jpg|png|gif|bmp|jpeg$") + ")", "i").test(escape(i)) || (n = !0);
          }), n) return a.msg("选择的图片中包含不支持的格式"), r.value = "";
      }

      if (a.fileLength = function () {
        var i = 0,
            t = e || a.files || a.chooseFiles || r.files;
        return layui.each(t, function () {
          i++;
        }), i;
      }(), l.number && a.fileLength > l.number) return a.msg("同时最多只能上传的数量为：" + l.number);

      if (l.size > 0 && !(o.ie && o.ie < 10)) {
        var g;
        if (layui.each(a.chooseFiles, function (e, i) {
          if (i.size > 1024 * l.size) {
            var t = l.size / 1024;
            t = t >= 1 ? t.toFixed(2) + "MB" : l.size + "KB", r.value = "", g = t;
          }
        }), g) return a.msg("文件不能超过" + g);
      }

      !function () {
        if ("choose" !== t && !l.auto || (l.choose && l.choose(v), "choose" !== t)) {
          if (l.before && l.before(v), o.ie) return o.ie > 9 ? f() : function () {
            var e = i("#" + u);
            a.elemFile.parent().submit(), clearInterval(s.timer), s.timer = setInterval(function () {
              var i,
                  t = e.contents().find("body");

              try {
                i = t.text();
              } catch (e) {
                a.msg("获取上传后的响应信息出现异常"), clearInterval(s.timer), d();
              }

              i && (clearInterval(s.timer), t.html(""), p(0, i));
            }, 30);
          }();
          f();
        }
      }();
    }
  }, s.prototype.events = function () {
    var e = this,
        t = e.config,
        a = function a(i) {
      e.chooseFiles = {}, layui.each(i, function (i, t) {
        var n = new Date().getTime();
        e.chooseFiles[n + "-" + i] = t;
      });
    },
        l = function l(i, n) {
      var o = e.elemFile,
          a = i.length > 1 ? i.length + "个文件" : (i[0] || {}).name || o[0].value.match(/[^\/\\]+\..+/g) || [] || "";
      o.next().hasClass(c) && o.next().remove(), e.upload(null, "choose"), e.isFile() || t.choose || o.after('<span class="layui-inline ' + c + '">' + a + "</span>");
    };

    t.elem.off("upload.start").on("upload.start", function () {
      var o = i(this),
          a = o.attr("lay-data");
      if (a) try {
        a = new Function("return " + a)(), e.config = i.extend({}, t, a);
      } catch (e) {
        n.error("Upload element property lay-data configuration item has a syntax error: " + a);
      }
      e.config.item = o, e.elemFile[0].click();
    }), o.ie && o.ie < 10 || t.elem.off("upload.over").on("upload.over", function () {
      i(this).attr("lay-over", "");
    }).off("upload.leave").on("upload.leave", function () {
      i(this).removeAttr("lay-over");
    }).off("upload.drop").on("upload.drop", function (n, o) {
      var r = i(this),
          u = o.originalEvent.dataTransfer.files || [];
      r.removeAttr("lay-over"), a(u), t.auto ? e.upload(u) : l(u);
    }), e.elemFile.off("upload.change").on("upload.change", function () {
      var i = this.files || [];
      a(i), t.auto ? e.upload() : l(i);
    }), t.bindAction.off("upload.action").on("upload.action", function () {
      e.upload();
    }), t.elem.data("haveEvents") || (e.elemFile.on("change", function () {
      i(this).trigger("upload.change");
    }), t.elem.on("click", function () {
      e.isFile() || i(this).trigger("upload.start");
    }), t.drag && t.elem.on("dragover", function (e) {
      e.preventDefault(), i(this).trigger("upload.over");
    }).on("dragleave", function (e) {
      i(this).trigger("upload.leave");
    }).on("drop", function (e) {
      e.preventDefault(), i(this).trigger("upload.drop", e);
    }), t.bindAction.on("click", function () {
      i(this).trigger("upload.action");
    }), t.elem.data("haveEvents", !0));
  }, a.render = function (e) {
    var i = new s(e);
    return function () {
      var e = this;
      return {
        upload: function upload(i) {
          e.upload.call(e, i);
        },
        config: e.config
      };
    }.call(i);
  }, e(l, a);
});