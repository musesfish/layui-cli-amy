"use strict";

/** layui-v2.2.6-rc2 MIT License By https://www.layui.com */
;
layui.define(["layer", "laytpl", "upload"], function (i) {
  var a = "3.7.6",
      e = layui.$,
      t = layui.layer,
      n = layui.laytpl,
      l = layui.device(),
      s = "layui-show",
      o = "layim-this",
      d = 20,
      r = {},
      c = function c() {
    this.v = a, e("body").on("click", "*[layim-event]", function (i) {
      var a = e(this),
          t = a.attr("layim-event");
      ti[t] ? ti[t].call(this, a, i) : "";
    });
  };

  c.prototype.config = function (i) {
    var a = [];
    if (layui.each(Array(5), function (i) {
      a.push(layui.cache.dir + "css/modules/layim/skin/" + (i + 1) + ".jpg");
    }), i = i || {}, i.skin = i.skin || [], layui.each(i.skin, function (i, e) {
      a.unshift(e);
    }), i.skin = a, i = e.extend({
      isfriend: !0,
      isgroup: !0,
      voice: "default.mp3"
    }, i), window.JSON && window.JSON.parse) return H(i), this;
  }, c.prototype.on = function (i, a) {
    return "function" == typeof a && (r[i] ? r[i].push(a) : r[i] = [a]), this;
  }, c.prototype.cache = function () {
    return j;
  }, c.prototype.chat = function (i) {
    if (window.JSON && window.JSON.parse) return z(i), this;
  }, c.prototype.setChatMin = function () {
    return N(), this;
  }, c.prototype.setChatStatus = function (i) {
    var a = _();

    if (a) {
      var e = a.elem.find(".layim-chat-status");
      return e.html(i), this;
    }
  }, c.prototype.getMessage = function (i) {
    return K(i), this;
  }, c.prototype.notice = function (i) {
    return J(i), this;
  }, c.prototype.add = function (i) {
    return M(i), this;
  }, c.prototype.setFriendGroup = function (i) {
    return M(i, "setGroup"), this;
  }, c.prototype.msgbox = function (i) {
    return V(i), this;
  }, c.prototype.addList = function (i) {
    return P(i), this;
  }, c.prototype.removeList = function (i) {
    return W(i), this;
  }, c.prototype.setFriendStatus = function (i, a) {
    var t = e(".layim-friend" + i);
    t["online" === a ? "removeClass" : "addClass"]("layim-list-gray");
  }, c.prototype.content = function (i) {
    return layui.data.content(i);
  };

  var u = function u(i) {
    var a = {
      friend: "????????????????????????",
      group: "????????????",
      history: "??????????????????"
    };
    return i = i || {}, i.item = i.item || "d." + i.type, ["{{# var length = 0; layui.each(" + i.item + ", function(i, data){ length++; }}", '<li layim-event="chat" data-type="' + i.type + '" data-index="{{ ' + (i.index || "i") + ' }}" class="layim-' + ("history" === i.type ? "{{i}}" : i.type + "{{data.id}}") + ' {{ data.status === "offline" ? "layim-list-gray" : "" }}"><img src="{{ data.avatar }}"><span>{{ data.username||data.groupname||data.name||"??????" }}</span><p>{{ data.remark||data.sign||"" }}</p><span class="layim-msg-status">new</span></li>', "{{# }); if(length === 0){ }}", '<li class="layim-null">' + (a[i.type] || "????????????") + "</li>", "{{# } }}"].join("");
  },
      y = ['<div class="layui-layim-main">', '<div class="layui-layim-info">', '<div class="layui-layim-user">{{ d.mine.username }}</div>', '<div class="layui-layim-status">', '{{# if(d.mine.status === "online"){ }}', '<span class="layui-icon layim-status-online" layim-event="status" lay-type="show">&#xe617;</span>', '{{# } else if(d.mine.status === "hide") { }}', '<span class="layui-icon layim-status-hide" layim-event="status" lay-type="show">&#xe60f;</span>', "{{# } }}", '<ul class="layui-anim layim-menu-box">', '<li {{d.mine.status === "online" ? "class=layim-this" : ""}} layim-event="status" lay-type="online"><i class="layui-icon">&#xe618;</i><cite class="layui-icon layim-status-online">&#xe617;</cite>??????</li>', '<li {{d.mine.status === "hide" ? "class=layim-this" : ""}} layim-event="status" lay-type="hide"><i class="layui-icon">&#xe618;</i><cite class="layui-icon layim-status-hide">&#xe60f;</cite>??????</li>', "</ul>", "</div>", '<input class="layui-layim-remark" placeholder="????????????" value="{{ d.mine.remark||d.mine.sign||"" }}">', "</div>", '<ul class="layui-unselect layui-layim-tab{{# if(!d.base.isfriend || !d.base.isgroup){ }}', " layim-tab-two", '{{# } }}">', '<li class="layui-icon', "{{# if(!d.base.isfriend){ }}", " layim-hide", "{{# } else { }}", " layim-this", "{{# } }}", '" title="?????????" layim-event="tab" lay-type="friend">&#xe612;</li>', '<li class="layui-icon', "{{# if(!d.base.isgroup){ }}", " layim-hide", "{{# } else if(!d.base.isfriend) { }}", " layim-this", "{{# } }}", '" title="??????" layim-event="tab" lay-type="group">&#xe613;</li>', '<li class="layui-icon" title="????????????" layim-event="tab" lay-type="history">&#xe611;</li>', "</ul>", '<ul class="layui-unselect layim-tab-content {{# if(d.base.isfriend){ }}layui-show{{# } }} layim-list-friend">', '{{# layui.each(d.friend, function(index, item){ var spread = d.local["spread"+index]; }}', "<li>", '<h5 layim-event="spread" lay-type="{{ spread }}"><i class="layui-icon">{{# if(spread === "true"){ }}&#xe61a;{{# } else {  }}&#xe602;{{# } }}</i><span>{{ item.groupname||"???????????????"+index }}</span><em>(<cite class="layim-count"> {{ (item.list||[]).length }}</cite>)</em></h5>', '<ul class="layui-layim-list {{# if(spread === "true"){ }}', " layui-show", '{{# } }}">', u({
    type: "friend",
    item: "item.list",
    index: "index"
  }), "</ul>", "</li>", "{{# }); if(d.friend.length === 0){ }}", '<li><ul class="layui-layim-list layui-show"><li class="layim-null">???????????????</li></ul>', "{{# } }}", "</ul>", '<ul class="layui-unselect layim-tab-content {{# if(!d.base.isfriend && d.base.isgroup){ }}layui-show{{# } }}">', "<li>", '<ul class="layui-layim-list layui-show layim-list-group">', u({
    type: "group"
  }), "</ul>", "</li>", "</ul>", '<ul class="layui-unselect layim-tab-content  {{# if(!d.base.isfriend && !d.base.isgroup){ }}layui-show{{# } }}">', "<li>", '<ul class="layui-layim-list layui-show layim-list-history">', u({
    type: "history"
  }), "</ul>", "</li>", "</ul>", '<ul class="layui-unselect layim-tab-content">', "<li>", '<ul class="layui-layim-list layui-show" id="layui-layim-search"></ul>', "</li>", "</ul>", '<ul class="layui-unselect layui-layim-tool">', '<li class="layui-icon layim-tool-search" layim-event="search" title="??????">&#xe615;</li>', "{{# if(d.base.msgbox){ }}", '<li class="layui-icon layim-tool-msgbox" layim-event="msgbox" title="????????????">&#xe645;<span class="layui-anim"></span></li>', "{{# } }}", "{{# if(d.base.find){ }}", '<li class="layui-icon layim-tool-find" layim-event="find" title="??????">&#xe608;</li>', "{{# } }}", '<li class="layui-icon layim-tool-skin" layim-event="skin" title="????????????">&#xe61b;</li>', "{{# if(!d.base.copyright){ }}", '<li class="layui-icon layim-tool-about" layim-event="about" title="??????">&#xe60b;</li>', "{{# } }}", "</ul>", '<div class="layui-layim-search"><input><label class="layui-icon" layim-event="closeSearch">&#x1007;</label></div>', "</div>"].join(""),
      m = ['<ul class="layui-layim-skin">', "{{# layui.each(d.skin, function(index, item){ }}", '<li><img layim-event="setSkin" src="{{ item }}"></li>', "{{# }); }}", '<li layim-event="setSkin"><cite>??????</cite></li>', "</ul>"].join(""),
      f = ['<div class="layim-chat layim-chat-{{d.data.type}}{{d.first ? " layui-show" : ""}}">', '<div class="layui-unselect layim-chat-title">', '<div class="layim-chat-other">', '<img class="layim-{{ d.data.type }}{{ d.data.id }}" src="{{ d.data.avatar }}"><span class="layim-chat-username" layim-event="{{ d.data.type==="group" ? "groupMembers" : "" }}">{{ d.data.name||"??????" }} {{d.data.temporary ? "<cite>????????????</cite>" : ""}} {{# if(d.data.type==="group"){ }} <em class="layim-chat-members"></em><i class="layui-icon">&#xe61a;</i> {{# } }}</span>', '<p class="layim-chat-status"></p>', "</div>", "</div>", '<div class="layim-chat-main">', "<ul></ul>", "</div>", '<div class="layim-chat-footer">', '<div class="layui-unselect layim-chat-tool" data-json="{{encodeURIComponent(JSON.stringify(d.data))}}">', '<span class="layui-icon layim-tool-face" title="????????????" layim-event="face">&#xe60c;</span>', "{{# if(d.base && d.base.uploadImage){ }}", '<span class="layui-icon layim-tool-image" title="????????????" layim-event="image">&#xe60d;<input type="file" name="file"></span>', "{{# }; }}", "{{# if(d.base && d.base.uploadFile){ }}", '<span class="layui-icon layim-tool-image" title="????????????" layim-event="image" data-type="file">&#xe61d;<input type="file" name="file"></span>', "{{# }; }}", "{{# if(d.base && d.base.isAudio){ }}", '<span class="layui-icon layim-tool-audio" title="??????????????????" layim-event="media" data-type="audio">&#xe6fc;</span>', "{{# }; }}", "{{# if(d.base && d.base.isVideo){ }}", '<span class="layui-icon layim-tool-video" title="??????????????????" layim-event="media" data-type="video">&#xe6ed;</span>', "{{# }; }}", "{{# layui.each(d.base.tool, function(index, item){ }}", '<span class="layui-icon layim-tool-{{item.alias}}" title="{{item.title}}" layim-event="extend" lay-filter="{{ item.alias }}">{{item.icon}}</span>', "{{# }); }}", "{{# if(d.base && d.base.chatLog){ }}", '<span class="layim-tool-log" layim-event="chatLog"><i class="layui-icon">&#xe60e;</i>????????????</span>', "{{# }; }}", "</div>", '<div class="layim-chat-textarea"><textarea></textarea></div>', '<div class="layim-chat-bottom">', '<div class="layim-chat-send">', "{{# if(!d.base.brief){ }}", '<span class="layim-send-close" layim-event="closeThisChat">??????</span>', "{{# } }}", '<span class="layim-send-btn" layim-event="send">??????</span>', '<span class="layim-send-set" layim-event="setSend" lay-type="show"><em class="layui-edge"></em></span>', '<ul class="layui-anim layim-menu-box">', '<li {{d.local.sendHotKey !== "Ctrl+Enter" ? "class=layim-this" : ""}} layim-event="setSend" lay-type="Enter"><i class="layui-icon">&#xe618;</i>???Enter???????????????</li>', '<li {{d.local.sendHotKey === "Ctrl+Enter" ? "class=layim-this" : ""}} layim-event="setSend"  lay-type="Ctrl+Enter"><i class="layui-icon">&#xe618;</i>???Ctrl+Enter???????????????</li>', "</ul>", "</div>", "</div>", "</div>", "</div>"].join(""),
      p = ['<div class="layim-add-box">', '<div class="layim-add-img"><img class="layui-circle" src="{{ d.data.avatar }}"><p>{{ d.data.name||"" }}</p></div>', '<div class="layim-add-remark">', '{{# if(d.data.type === "friend" && d.type === "setGroup"){ }}', "<p>????????????</p>", '{{# } if(d.data.type === "friend"){ }}', '<select class="layui-select" id="LAY_layimGroup">', "{{# layui.each(d.data.group, function(index, item){ }}", '<option value="{{ item.id }}">{{ item.groupname }}</option>', "{{# }); }}", "</select>", "{{# } }}", '{{# if(d.data.type === "group"){ }}', "<p>?????????????????????</p>", '{{# } if(d.type !== "setGroup"){ }}', '<textarea id="LAY_layimRemark" placeholder="????????????" class="layui-textarea"></textarea>', "{{# } }}", "</div>", "</div>"].join(""),
      h = ['<li {{ d.mine ? "class=layim-chat-mine" : "" }} {{# if(d.cid){ }}data-cid="{{d.cid}}"{{# } }}>', '<div class="layim-chat-user"><img src="{{ d.avatar }}"><cite>', "{{# if(d.mine){ }}", '<i>{{ layui.data.date(d.timestamp) }}</i>{{ d.username||"??????" }}', "{{# } else { }}", '{{ d.username||"??????" }}<i>{{ layui.data.date(d.timestamp) }}</i>', "{{# } }}", "</cite></div>", '<div class="layim-chat-text">{{ layui.data.content(d.content||"&nbsp") }}</div>', "</li>"].join(""),
      v = '<li class="layim-{{ d.data.type }}{{ d.data.id }} layim-chatlist-{{ d.data.type }}{{ d.data.id }} layim-this" layim-event="tabChat"><img src="{{ d.data.avatar }}"><span>{{ d.data.name||"??????" }}</span>{{# if(!d.base.brief){ }}<i class="layui-icon" layim-event="closeChat">&#x1007;</i>{{# } }}</li>',
      g = function g(i) {
    return i < 10 ? "0" + (0 | i) : i;
  };

  layui.data.date = function (i) {
    var a = new Date(i || new Date());
    return a.getFullYear() + "-" + g(a.getMonth() + 1) + "-" + g(a.getDate()) + " " + g(a.getHours()) + ":" + g(a.getMinutes()) + ":" + g(a.getSeconds());
  }, layui.data.content = function (i) {
    var a = function a(i) {
      return new RegExp("\\n*\\[" + (i || "") + "(code|pre|div|span|p|table|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5)([\\s\\S]*?)\\]\\n*", "g");
    };

    return i = (i || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;").replace(/@(\S+)(\s+?|$)/g, '@<a href="javascript:;">$1</a>$2').replace(/face\[([^\s\[\]]+?)\]/g, function (i) {
      var a = i.replace(/^face/g, "");
      return '<img alt="' + a + '" title="' + a + '" src="' + X[a] + '">';
    }).replace(/img\[([^\s]+?)\]/g, function (i) {
      return '<img class="layui-layim-photos" src="' + i.replace(/(^img\[)|(\]$)/g, "") + '">';
    }).replace(/file\([\s\S]+?\)\[[\s\S]*?\]/g, function (i) {
      var a = (i.match(/file\(([\s\S]+?)\)\[/) || [])[1],
          e = (i.match(/\)\[([\s\S]*?)\]/) || [])[1];
      return a ? '<a class="layui-layim-file" href="' + a + '" download target="_blank"><i class="layui-icon">&#xe61e;</i><cite>' + (e || a) + "</cite></a>" : i;
    }).replace(/audio\[([^\s]+?)\]/g, function (i) {
      return '<div class="layui-unselect layui-layim-audio" layim-event="playAudio" data-src="' + i.replace(/(^audio\[)|(\]$)/g, "") + '"><i class="layui-icon">&#xe652;</i><p>????????????</p></div>';
    }).replace(/video\[([^\s]+?)\]/g, function (i) {
      return '<div class="layui-unselect layui-layim-video" layim-event="playVideo" data-src="' + i.replace(/(^video\[)|(\]$)/g, "") + '"><i class="layui-icon">&#xe652;</i></div>';
    }).replace(/a\([\s\S]+?\)\[[\s\S]*?\]/g, function (i) {
      var a = (i.match(/a\(([\s\S]+?)\)\[/) || [])[1],
          e = (i.match(/\)\[([\s\S]*?)\]/) || [])[1];
      return a ? '<a href="' + a + '" target="_blank">' + (e || a) + "</a>" : i;
    }).replace(a(), "<$1 $2>").replace(a("/"), "</$1>").replace(/\n/g, "<br>");
  };

  var x,
      b,
      w,
      k,
      C,
      S = function S(i, a, n) {
    return i = i || {}, e.ajax({
      url: i.url,
      type: i.type || "get",
      data: i.data,
      dataType: i.dataType || "json",
      cache: !1,
      success: function success(i) {
        0 == i.code ? a && a(i.data || {}) : t.msg(i.msg || (n || "Error") + ": LAYIM_NOT_GET_DATA", {
          time: 5e3
        });
      },
      error: function error(i, a) {
        window.console && console.log && console.error("LAYIM_DATE_ERROR???" + a);
      }
    });
  },
      j = {
    message: {},
    chat: []
  },
      H = function H(i) {
    var a = i.init || {};
    return mine = a.mine || {}, local = layui.data("layim")[mine.id] || {}, obj = {
      base: i,
      local: local,
      mine: mine,
      history: local.history || {}
    }, create = function create(a) {
      var t = a.mine || {},
          l = layui.data("layim")[t.id] || {},
          s = {
        base: i,
        local: l,
        mine: t,
        friend: a.friend || [],
        group: a.group || [],
        history: l.history || {}
      };
      j = e.extend(j, s), L(n(y).render(s)), (l.close || i.min) && T(), layui.each(r.ready, function (i, a) {
        a && a(s);
      });
    }, j = e.extend(j, obj), i.brief ? layui.each(r.ready, function (i, a) {
      a && a(obj);
    }) : void (a.url ? S(a, create, "INIT") : create(a));
  },
      L = function L(i) {
    return t.open({
      type: 1,
      area: ["260px", "520px"],
      skin: "layui-box layui-layim",
      title: "&#8203;",
      offset: "rb",
      id: "layui-layim",
      shade: !1,
      anim: 2,
      resize: !1,
      content: i,
      success: function success(i) {
        x = i, R(i), j.base.right && i.css("margin-left", "-" + j.base.right), b && t.close(b.attr("times"));
        var a = [],
            n = i.find(".layim-list-history");
        n.find("li").each(function () {
          a.push(e(this).prop("outerHTML"));
        }), a.length > 0 && (a.reverse(), n.html(a.join(""))), A(), ti.sign();
      },
      cancel: function cancel(i) {
        T();
        var a = layui.data("layim")[j.mine.id] || {};
        return a.close = !0, layui.data("layim", {
          key: j.mine.id,
          value: a
        }), !1;
      }
    });
  },
      A = function A() {
    x.on("contextmenu", function (i) {
      return i.cancelBubble = !0, i.returnValue = !1, !1;
    });

    var i = function i() {
      t.closeAll("tips");
    };

    x.find(".layim-list-history").on("contextmenu", "li", function (a) {
      var n = e(this),
          l = '<ul data-id="' + n[0].id + '" data-index="' + n.data("index") + '"><li layim-event="menuHistory" data-type="one">???????????????</li><li layim-event="menuHistory" data-type="all">????????????????????????</li></ul>';
      n.hasClass("layim-null") || (t.tips(l, this, {
        tips: 1,
        time: 0,
        anim: 5,
        fixed: !0,
        skin: "layui-box layui-layim-contextmenu",
        success: function success(i) {
          var a = function a(i) {
            ii(i);
          };

          i.off("mousedown", a).on("mousedown", a);
        }
      }), e(document).off("mousedown", i).on("mousedown", i), e(window).off("resize", i).on("resize", i));
    });
  },
      T = function T(i) {
    return b && t.close(b.attr("times")), x && x.hide(), j.mine = j.mine || {}, t.open({
      type: 1,
      title: !1,
      id: "layui-layim-close",
      skin: "layui-box layui-layim-min layui-layim-close",
      shade: !1,
      closeBtn: !1,
      anim: 2,
      offset: "rb",
      resize: !1,
      content: '<img src="' + (j.mine.avatar || layui.cache.dir + "css/pc/layim/skin/logo.jpg") + '"><span>' + (i || j.base.title || "??????LayIM") + "</span>",
      move: "#layui-layim-close img",
      success: function success(i, a) {
        b = i, j.base.right && i.css("margin-left", "-" + j.base.right), i.on("click", function () {
          t.close(a), x.show();
          var i = layui.data("layim")[j.mine.id] || {};
          delete i.close, layui.data("layim", {
            key: j.mine.id,
            value: i
          });
        });
      }
    });
  },
      z = function z(i) {
    i = i || {};
    var a = e("#layui-layim-chat"),
        l = {
      data: i,
      base: j.base,
      local: j.local
    };
    if (!i.id) return t.msg("????????????");

    if (a[0]) {
      var s = w.find(".layim-chat-list"),
          o = s.find(".layim-chatlist-" + i.type + i.id),
          d = w.find(".layui-layer-max").hasClass("layui-layer-maxmin"),
          c = a.children(".layim-chat-box");
      return "none" === w.css("display") && w.show(), k && t.close(k.attr("times")), 1 !== s.find("li").length || o[0] || (d || w.css("width", 800), s.css({
        height: w.height()
      }).show(), c.css("margin-left", "200px")), o[0] || (s.append(n(v).render(l)), c.append(n(f).render(l)), I(i), E()), O(s.find(".layim-chatlist-" + i.type + i.id)), o[0] || U(), $(i), Q(), C;
    }

    l.first = !0;
    var u = C = t.open({
      type: 1,
      area: "600px",
      skin: "layui-box layui-layim-chat",
      id: "layui-layim-chat",
      title: "&#8203;",
      shade: !1,
      maxmin: !0,
      offset: i.offset || "auto",
      anim: i.anim || 0,
      closeBtn: !j.base.brief && 1,
      content: n('<ul class="layui-unselect layim-chat-list">' + v + '</ul><div class="layim-chat-box">' + f + "</div>").render(l),
      success: function success(a) {
        w = a, a.css({
          "min-width": "500px",
          "min-height": "420px"
        }), I(i), "function" == typeof i.success && i.success(a), Q(), R(a), $(i), U(), q(), layui.each(r.chatChange, function (i, a) {
          a && a(_());
        }), a.on("dblclick", ".layui-layim-photos", function () {
          var i = this.src;
          t.close(z.photosIndex), t.photos({
            photos: {
              data: [{
                alt: "????????????",
                src: i
              }]
            },
            shade: .01,
            closeBtn: 2,
            anim: 0,
            resize: !1,
            success: function success(i, a) {
              z.photosIndex = a;
            }
          });
        });
      },
      full: function full(i) {
        t.style(u, {
          width: "100%",
          height: "100%"
        }, !0), E();
      },
      resizing: E,
      restore: E,
      min: function min() {
        return N(), !1;
      },
      end: function end() {
        t.closeAll("tips"), w = null;
      }
    });
    return u;
  },
      I = function I(i) {
    e(".layim-" + i.type + i.id).each(function () {
      e(this).hasClass("layim-list-gray") && layui.layim.setFriendStatus(i.id, "offline");
    });
  },
      E = function E() {
    var i = w.find(".layim-chat-list"),
        a = w.find(".layim-chat-main"),
        e = w.height();
    i.css({
      height: e
    }), a.css({
      height: e - 20 - 80 - 158
    });
  },
      N = function N(i) {
    var a = i || _().data,
        n = layui.layim.cache().base;

    w && !i && w.hide(), t.close(N.index), N.index = t.open({
      type: 1,
      title: !1,
      skin: "layui-box layui-layim-min",
      shade: !1,
      closeBtn: !1,
      anim: a.anim || 2,
      offset: "b",
      move: "#layui-layim-min",
      resize: !1,
      area: ["182px", "50px"],
      content: '<img id="layui-layim-min" src="' + a.avatar + '"><span>' + a.name + "</span>",
      success: function success(a, l) {
        i || (k = a), n.minRight && t.style(l, {
          left: e(window).width() - a.outerWidth() - parseFloat(n.minRight)
        }), a.find(".layui-layer-content span").on("click", function () {
          t.close(l), i ? layui.each(j.chat, function (i, a) {
            z(a);
          }) : w.show(), i && (j.chat = [], Z());
        }), a.find(".layui-layer-content img").on("click", function (i) {
          ii(i);
        });
      }
    });
  },
      M = function M(i, a) {
    return i = i || {}, t.close(M.index), M.index = t.open({
      type: 1,
      area: "430px",
      title: {
        friend: "????????????",
        group: "????????????"
      }[i.type] || "",
      shade: !1,
      resize: !1,
      btn: a ? ["??????", "??????"] : ["????????????", "??????"],
      content: n(p).render({
        data: {
          name: i.username || i.groupname,
          avatar: i.avatar,
          group: i.group || parent.layui.layim.cache().friend || [],
          type: i.type
        },
        type: a
      }),
      yes: function yes(e, t) {
        var n = t.find("#LAY_layimGroup"),
            l = t.find("#LAY_layimRemark");
        a ? i.submit && i.submit(n.val(), e) : i.submit && i.submit(n.val(), l.val(), e);
      }
    });
  },
      O = function O(i, a) {
    i = i || e(".layim-chat-list ." + o);
    var n = i.index() === -1 ? 0 : i.index(),
        l = ".layim-chat",
        d = w.find(l).eq(n),
        c = w.find(".layui-layer-max").hasClass("layui-layer-maxmin");

    if (a) {
      i.hasClass(o) && O(0 === n ? i.next() : i.prev());
      var u = w.find(l).length;
      return 1 === u ? t.close(C) : (i.remove(), d.remove(), 2 === u && (w.find(".layim-chat-list").hide(), c || w.css("width", "600px"), w.find(".layim-chat-box").css("margin-left", 0)), !1);
    }

    i.addClass(o).siblings().removeClass(o), d.addClass(s).siblings(l).removeClass(s), d.find("textarea").focus(), layui.each(r.chatChange, function (i, a) {
      a && a(_());
    }), q();
  },
      q = function q() {
    var i = _(),
        a = j.message[i.data.type + i.data.id];

    a && delete j.message[i.data.type + i.data.id];
  },
      _ = function _() {
    if (w) {
      var i = e(".layim-chat-list ." + o).index(),
          a = w.find(".layim-chat").eq(i),
          t = JSON.parse(decodeURIComponent(a.find(".layim-chat-tool").data("json")));
      return {
        elem: a,
        data: t,
        textarea: a.find("textarea")
      };
    }
  },
      R = function R(i) {
    var a = layui.data("layim")[j.mine.id] || {},
        e = a.skin;
    i.css({
      "background-image": e ? "url(" + e + ")" : function () {
        return j.base.initSkin ? "url(" + (layui.cache.dir + "css/modules/layim/skin/" + j.base.initSkin) + ")" : "none";
      }()
    });
  },
      $ = function $(i) {
    var a = layui.data("layim")[j.mine.id] || {},
        e = {},
        t = a.history || {},
        l = t[i.type + i.id];

    if (x) {
      var s = x.find(".layim-list-history");

      if (i.historyTime = new Date().getTime(), t[i.type + i.id] = i, a.history = t, layui.data("layim", {
        key: j.mine.id,
        value: a
      }), !l) {
        e[i.type + i.id] = i;
        var o = n(u({
          type: "history",
          item: "d.data"
        })).render({
          data: e
        });
        s.prepend(o), s.find(".layim-null").remove();
      }
    }
  },
      D = function D() {
    var i = {
      username: j.mine ? j.mine.username : "??????",
      avatar: j.mine ? j.mine.avatar : layui.cache.dir + "css/pc/layim/skin/logo.jpg",
      id: j.mine ? j.mine.id : null,
      mine: !0
    },
        a = _(),
        e = a.elem.find(".layim-chat-main ul"),
        l = j.base.maxLength || 3e3;

    if (i.content = a.textarea.val(), "" !== i.content.replace(/\s/g, "")) {
      if (i.content.length > l) return t.msg("????????????????????????" + l + "?????????");
      e.append(n(h).render(i));
      var s = {
        mine: i,
        to: a.data
      },
          o = {
        username: s.mine.username,
        avatar: s.mine.avatar,
        id: s.to.id,
        type: s.to.type,
        content: s.mine.content,
        timestamp: new Date().getTime(),
        mine: !0
      };
      B(o), layui.each(r.sendMessage, function (i, a) {
        a && a(s);
      });
    }

    Z(), a.textarea.val("").focus();
  },
      J = function J(i) {
    if (i = i || {}, window.Notification) if ("granted" === Notification.permission) {
      new Notification(i.title || "", {
        body: i.content || "",
        icon: i.avatar || "http://tp2.sinaimg.cn/5488749285/50/5719808192/1"
      });
    } else Notification.requestPermission();
  },
      F = function F() {
    if (!(l.ie && l.ie < 9)) {
      var i = document.createElement("audio");
      i.src = layui.cache.dir + "css/modules/layim/voice/" + j.base.voice, i.play();
    }
  },
      G = {},
      K = function K(i) {
    i = i || {};
    var a = e(".layim-chatlist-" + i.type + i.id),
        t = {},
        l = a.index();

    if (i.timestamp = i.timestamp || new Date().getTime(), i.fromid == j.mine.id && (i.mine = !0), i.system || B(i), G = JSON.parse(JSON.stringify(i)), j.base.voice && F(), !w && i.content || l === -1) {
      if (j.message[i.type + i.id]) j.message[i.type + i.id].push(i);else if (j.message[i.type + i.id] = [i], "friend" === i.type) {
        var s;
        layui.each(j.friend, function (a, e) {
          if (layui.each(e.list, function (a, e) {
            if (e.id == i.id) return e.type = "friend", e.name = e.username, j.chat.push(e), s = !0;
          }), s) return !0;
        }), s || (i.name = i.username, i.temporary = !0, j.chat.push(i));
      } else if ("group" === i.type) {
        var o;
        layui.each(j.group, function (a, e) {
          if (e.id == i.id) return e.type = "group", e.name = e.groupname, j.chat.push(e), o = !0;
        }), o || (i.name = i.groupname, j.chat.push(i));
      } else i.name = i.name || i.username || i.groupname, j.chat.push(i);
      if ("group" === i.type && layui.each(j.group, function (a, e) {
        if (e.id == i.id) return t.avatar = e.avatar, !0;
      }), !i.system) return j.base.notice && J({
        title: "?????? " + i.username + " ?????????",
        content: i.content,
        avatar: t.avatar || i.avatar
      }), N({
        name: "???????????????",
        avatar: t.avatar || i.avatar,
        anim: 6
      });
    }

    if (w) {
      var d = _();

      d.data.type + d.data.id !== i.type + i.id && (a.addClass("layui-anim layer-anim-06"), setTimeout(function () {
        a.removeClass("layui-anim layer-anim-06");
      }, 300));
      var r = w.find(".layim-chat").eq(l),
          c = r.find(".layim-chat-main ul");
      i.system ? l !== -1 && c.append('<li class="layim-chat-system"><span>' + i.content + "</span></li>") : "" !== i.content.replace(/\s/g, "") && c.append(n(h).render(i)), Z();
    }
  },
      Y = "layui-anim-loop layer-anim-05",
      V = function V(i) {
    var a = x.find(".layim-tool-msgbox");
    a.find("span").addClass(Y).html(i);
  },
      B = function B(i) {
    var a = layui.data("layim")[j.mine.id] || {};
    a.chatlog = a.chatlog || {};
    var e = a.chatlog[i.type + i.id];

    if (e) {
      var t;
      layui.each(e, function (a, e) {
        e.timestamp === i.timestamp && e.type === i.type && e.id === i.id && e.content === i.content && (t = !0);
      }), t || i.fromid == j.mine.id || e.push(i), e.length > d && e.shift();
    } else a.chatlog[i.type + i.id] = [i];

    layui.data("layim", {
      key: j.mine.id,
      value: a
    });
  },
      U = function U() {
    var i = layui.data("layim")[j.mine.id] || {},
        a = _(),
        e = i.chatlog || {},
        t = a.elem.find(".layim-chat-main ul");

    layui.each(e[a.data.type + a.data.id], function (i, a) {
      t.append(n(h).render(a));
    }), Z();
  },
      P = function P(i) {
    var a,
        e = {},
        l = x.find(".layim-list-" + i.type);
    if (j[i.type]) if ("friend" === i.type) layui.each(j.friend, function (n, l) {
      if (i.groupid == l.id) return layui.each(j.friend[n].list, function (e, t) {
        if (t.id == i.id) return a = !0;
      }), a ? t.msg("?????? [" + (i.username || "") + "] ?????????????????????", {
        anim: 6
      }) : (j.friend[n].list = j.friend[n].list || [], e[j.friend[n].list.length] = i, i.groupIndex = n, j.friend[n].list.push(i), !0);
    });else if ("group" === i.type) {
      if (layui.each(j.group, function (e, t) {
        if (t.id == i.id) return a = !0;
      }), a) return t.msg("????????? [" + (i.groupname || "") + "] ????????????", {
        anim: 6
      });
      e[j.group.length] = i, j.group.push(i);
    }

    if (!a) {
      var s = n(u({
        type: i.type,
        item: "d.data",
        index: "friend" === i.type ? "data.groupIndex" : null
      })).render({
        data: e
      });

      if ("friend" === i.type) {
        var o = l.find(">li").eq(i.groupIndex);
        o.find(".layui-layim-list").append(s), o.find(".layim-count").html(j.friend[i.groupIndex].list.length), o.find(".layim-null")[0] && o.find(".layim-null").remove();
      } else "group" === i.type && (l.append(s), l.find(".layim-null")[0] && l.find(".layim-null").remove());
    }
  },
      W = function W(i) {
    var a = x.find(".layim-list-" + i.type);
    j[i.type] && ("friend" === i.type ? layui.each(j.friend, function (e, t) {
      layui.each(t.list, function (t, n) {
        if (i.id == n.id) {
          var l = a.find(">li").eq(e);
          l.find(".layui-layim-list>li");
          return l.find(".layui-layim-list>li").eq(t).remove(), j.friend[e].list.splice(t, 1), l.find(".layim-count").html(j.friend[e].list.length), 0 === j.friend[e].list.length && l.find(".layui-layim-list").html('<li class="layim-null">???????????????????????????</li>'), !0;
        }
      });
    }) : "group" === i.type && layui.each(j.group, function (e, t) {
      if (i.id == t.id) return a.find(">li").eq(e).remove(), j.group.splice(e, 1), 0 === j.group.length && a.html('<li class="layim-null">????????????</li>'), !0;
    }));
  },
      Z = function Z() {
    var i = _(),
        a = i.elem.find(".layim-chat-main"),
        e = a.find("ul"),
        t = e.find("li").length;

    if (t >= d) {
      var n = e.find("li").eq(0);
      e.prev().hasClass("layim-chat-system") || e.before('<div class="layim-chat-system"><span layim-event="chatLog">??????????????????</span></div>'), t > d && n.remove();
    }

    a.scrollTop(a[0].scrollHeight + 1e3), a.find("ul li:last").find("img").load(function () {
      a.scrollTop(a[0].scrollHeight + 1e3);
    });
  },
      Q = function Q() {
    var i = _(),
        a = i.textarea;

    a.focus(), a.off("keydown").on("keydown", function (i) {
      var e = layui.data("layim")[j.mine.id] || {},
          t = i.keyCode;
      if ("Ctrl+Enter" === e.sendHotKey) return void (i.ctrlKey && 13 === t && D());

      if (13 === t) {
        if (i.ctrlKey) return a.val(a.val() + "\n");
        if (i.shiftKey) return;
        i.preventDefault(), D();
      }
    });
  },
      X = function () {
    var i = ["[??????]", "[??????]", "[??????]", "[??????]", "[??????]", "[??????]", "[??????]", "[??????]", "[??????]", "[??????]", "[??????]", "[??????]", "[???]", "[??????]", "[??????]", "[??????]", "[?????????]", "[??????]", "[?????????]", "[?????????]", "[???]", "[???]", "[??????]", "[???]", "[??????]", "[??????]", "[???]", "[??????]", "[??????]", "[??????]", "[??????]", "[???]", "[???]", "[???]", "[???]", "[??????]", "[???]", "[???]", "[???]", "[??????]", "[???]", "[??????]", "[??????]", "[??????]", "[??????]", "[??????]", "[??????]", "[???]", "[??????]", "[??????]", "[??????]", "[??????]", "[ok]", "[???]", "[good]", "[NO]", "[???]", "[???]", "[???]", "[?????????]", "[??????]", "[???]", "[??????]", "[??????]", "[??????]", "[??????]", "[?????????]", "[??????]", "[???]", "[??????]", "[??????]", "[??????]"],
        a = {};
    return layui.each(i, function (i, e) {
      a[e] = layui.cache.dir + "images/face/" + i + ".gif";
    }), a;
  }(),
      ii = layui.stope,
      ai = function ai(i, a) {
    var e,
        t = i.value;
    i.focus(), document.selection ? (e = document.selection.createRange(), document.selection.empty(), e.text = a) : (e = [t.substring(0, i.selectionStart), a, t.substr(i.selectionEnd)], i.focus(), i.value = e.join(""));
  },
      ei = "layui-anim-upbit",
      ti = {
    status: function status(i, a) {
      var t = function t() {
        i.next().hide().removeClass(ei);
      },
          n = i.attr("lay-type");

      if ("show" === n) ii(a), i.next().show().addClass(ei), e(document).off("click", t).on("click", t);else {
        var l = i.parent().prev();
        i.addClass(o).siblings().removeClass(o), l.html(i.find("cite").html()), l.removeClass("layim-status-" + ("online" === n ? "hide" : "online")).addClass("layim-status-" + n), layui.each(r.online, function (i, a) {
          a && a(n);
        });
      }
    },
    sign: function sign() {
      var i = x.find(".layui-layim-remark");
      i.on("change", function () {
        var i = this.value;
        layui.each(r.sign, function (a, e) {
          e && e(i);
        });
      }), i.on("keyup", function (i) {
        var a = i.keyCode;
        13 === a && this.blur();
      });
    },
    tab: function tab(i) {
      var a,
          e = ".layim-tab-content",
          t = x.find(".layui-layim-tab>li");
      "number" == typeof i ? (a = i, i = t.eq(a)) : a = i.index(), a > 2 ? t.removeClass(o) : (ti.tab.index = a, i.addClass(o).siblings().removeClass(o)), x.find(e).eq(a).addClass(s).siblings(e).removeClass(s);
    },
    spread: function spread(i) {
      var a = i.attr("lay-type"),
          e = "true" === a ? "false" : "true",
          t = layui.data("layim")[j.mine.id] || {};
      i.next()["true" === a ? "removeClass" : "addClass"](s), t["spread" + i.parent().index()] = e, layui.data("layim", {
        key: j.mine.id,
        value: t
      }), i.attr("lay-type", e), i.find(".layui-icon").html("true" === e ? "&#xe61a;" : "&#xe602;");
    },
    search: function search(i) {
      var a = x.find(".layui-layim-search"),
          e = x.find("#layui-layim-search"),
          t = a.find("input"),
          n = function n(i) {
        var a = t.val().replace(/\s/);
        if ("" === a) ti.tab(0 | ti.tab.index);else {
          for (var n = [], l = j.friend || [], s = j.group || [], o = "", d = 0; d < l.length; d++) {
            for (var r = 0; r < (l[d].list || []).length; r++) {
              l[d].list[r].username.indexOf(a) !== -1 && (l[d].list[r].type = "friend", l[d].list[r].index = d, l[d].list[r].list = r, n.push(l[d].list[r]));
            }
          }

          for (var c = 0; c < s.length; c++) {
            s[c].groupname.indexOf(a) !== -1 && (s[c].type = "group", s[c].index = c, s[c].list = c, n.push(s[c]));
          }

          if (n.length > 0) for (var u = 0; u < n.length; u++) {
            o += '<li layim-event="chat" data-type="' + n[u].type + '" data-index="' + n[u].index + '" data-list="' + n[u].list + '"><img src="' + n[u].avatar + '"><span>' + (n[u].username || n[u].groupname || "??????") + "</span><p>" + (n[u].remark || n[u].sign || "") + "</p></li>";
          } else o = '<li class="layim-null">???????????????</li>';
          e.html(o), ti.tab(3);
        }
      };

      !j.base.isfriend && j.base.isgroup ? ti.tab.index = 1 : j.base.isfriend || j.base.isgroup || (ti.tab.index = 2), a.show(), t.focus(), t.off("keyup", n).on("keyup", n);
    },
    closeSearch: function closeSearch(i) {
      i.parent().hide(), ti.tab(0 | ti.tab.index);
    },
    msgbox: function msgbox() {
      var i = x.find(".layim-tool-msgbox");
      return t.close(ti.msgbox.index), i.find("span").removeClass(Y).html(""), ti.msgbox.index = t.open({
        type: 2,
        title: "????????????",
        shade: !1,
        maxmin: !0,
        area: ["600px", "520px"],
        skin: "layui-box layui-layer-border",
        resize: !1,
        content: j.base.msgbox
      });
    },
    find: function find() {
      return t.close(ti.find.index), ti.find.index = t.open({
        type: 2,
        title: "??????",
        shade: !1,
        maxmin: !0,
        area: ["1000px", "520px"],
        skin: "layui-box layui-layer-border",
        resize: !1,
        content: j.base.find
      });
    },
    skin: function skin() {
      t.open({
        type: 1,
        title: "????????????",
        shade: !1,
        area: "300px",
        skin: "layui-box layui-layer-border",
        id: "layui-layim-skin",
        zIndex: 66666666,
        resize: !1,
        content: n(m).render({
          skin: j.base.skin
        })
      });
    },
    about: function about() {
      t.alert("????????? " + a + '<br>???????????????<a href="http://layim.layui.com" target="_blank">layim.layui.com</a>', {
        title: "?????? LayIM",
        shade: !1
      });
    },
    setSkin: function setSkin(i) {
      var a = i.attr("src"),
          e = layui.data("layim")[j.mine.id] || {};
      e.skin = a, a || delete e.skin, layui.data("layim", {
        key: j.mine.id,
        value: e
      });

      try {
        x.css({
          "background-image": a ? "url(" + a + ")" : "none"
        }), w.css({
          "background-image": a ? "url(" + a + ")" : "none"
        });
      } catch (t) {}

      layui.each(r.setSkin, function (i, e) {
        var t = (a || "").replace(layui.cache.dir + "css/modules/layim/skin/", "");
        e && e(t, a);
      });
    },
    chat: function chat(i) {
      var a = layui.data("layim")[j.mine.id] || {},
          e = i.data("type"),
          t = i.data("index"),
          n = i.attr("data-list") || i.index(),
          l = {};
      "friend" === e ? l = j[e][t].list[n] : "group" === e ? l = j[e][n] : "history" === e && (l = (a.history || {})[t] || {}), l.name = l.name || l.username || l.groupname, "history" !== e && (l.type = e), z(l);
    },
    tabChat: function tabChat(i) {
      O(i);
    },
    closeChat: function closeChat(i, a) {
      O(i.parent(), 1), ii(a);
    },
    closeThisChat: function closeThisChat() {
      O(null, 1);
    },
    groupMembers: function groupMembers(i, a) {
      var n = i.find(".layui-icon"),
          l = function l() {
        n.html("&#xe61a;"), i.data("down", null), t.close(ti.groupMembers.index);
      },
          s = function s(i) {
        ii(i);
      };

      i.data("down") ? l() : (n.html("&#xe619;"), i.data("down", !0), ti.groupMembers.index = t.tips('<ul class="layim-members-list"></ul>', i, {
        tips: 3,
        time: 0,
        anim: 5,
        fixed: !0,
        skin: "layui-box layui-layim-members",
        success: function success(a) {
          var t = j.base.members || {},
              n = _(),
              s = a.find(".layim-members-list"),
              o = "",
              d = {},
              c = w.find(".layui-layer-max").hasClass("layui-layer-maxmin"),
              u = "none" === w.find(".layim-chat-list").css("display");

          c && s.css({
            width: e(window).width() - 22 - (u || 200)
          }), t.data = e.extend(t.data, {
            id: n.data.id
          }), S(t, function (a) {
            layui.each(a.list, function (i, a) {
              o += '<li data-uid="' + a.id + '"><a href="javascript:;"><img src="' + a.avatar + '"><cite>' + a.username + "</cite></a></li>", d[a.id] = a;
            }), s.html(o), i.find(".layim-chat-members").html(a.members || (a.list || []).length + "???"), s.find("li").on("click", function () {
              var i = e(this).data("uid"),
                  a = d[i];
              z({
                name: a.username,
                type: "friend",
                avatar: a.avatar,
                id: a.id
              }), l();
            }), layui.each(r.members, function (i, e) {
              e && e(a);
            });
          }), a.on("mousedown", function (i) {
            ii(i);
          });
        }
      }), e(document).off("mousedown", l).on("mousedown", l), e(window).off("resize", l).on("resize", l), i.off("mousedown", s).on("mousedown", s));
    },
    send: function send() {
      D();
    },
    setSend: function setSend(i, a) {
      var t = ti.setSend.box = i.siblings(".layim-menu-box"),
          n = i.attr("lay-type");
      if ("show" === n) ii(a), t.show().addClass(ei), e(document).off("click", ti.setSendHide).on("click", ti.setSendHide);else {
        i.addClass(o).siblings().removeClass(o);
        var l = layui.data("layim")[j.mine.id] || {};
        l.sendHotKey = n, layui.data("layim", {
          key: j.mine.id,
          value: l
        }), ti.setSendHide(a, i.parent());
      }
    },
    setSendHide: function setSendHide(i, a) {
      (a || ti.setSend.box).hide().removeClass(ei);
    },
    face: function face(i, a) {
      var n = "",
          l = _();

      for (var s in X) {
        n += '<li title="' + s + '"><img src="' + X[s] + '"></li>';
      }

      n = '<ul class="layui-clear layim-face-list">' + n + "</ul>", ti.face.index = t.tips(n, i, {
        tips: 1,
        time: 0,
        fixed: !0,
        skin: "layui-box layui-layim-face",
        success: function success(i) {
          i.find(".layim-face-list>li").on("mousedown", function (i) {
            ii(i);
          }).on("click", function () {
            ai(l.textarea[0], "face" + this.title + " "), t.close(ti.face.index);
          });
        }
      }), e(document).off("mousedown", ti.faceHide).on("mousedown", ti.faceHide), e(window).off("resize", ti.faceHide).on("resize", ti.faceHide), ii(a);
    },
    faceHide: function faceHide() {
      t.close(ti.face.index);
    },
    image: function image(i) {
      var a = i.data("type") || "images",
          e = {
        images: "uploadImage",
        file: "uploadFile"
      },
          n = _(),
          l = j.base[e[a]] || {};

      layui.upload.render({
        url: l.url || "",
        method: l.type,
        elem: i.find("input")[0],
        accept: a,
        done: function done(i) {
          0 == i.code ? (i.data = i.data || {}, "images" === a ? ai(n.textarea[0], "img[" + (i.data.src || "") + "]") : "file" === a && ai(n.textarea[0], "file(" + (i.data.src || "") + ")[" + (i.data.name || "????????????") + "]"), D()) : t.msg(i.msg || "????????????");
        }
      });
    },
    media: function media(i) {
      var a = i.data("type"),
          n = {
        audio: "??????",
        video: "??????"
      },
          l = _();

      t.prompt({
        title: "???????????????" + n[a] + "??????",
        shade: !1,
        offset: [i.offset().top - e(window).scrollTop() - 158 + "px", i.offset().left + "px"]
      }, function (i, e) {
        ai(l.textarea[0], a + "[" + i + "]"), D(), t.close(e);
      });
    },
    extend: function extend(i) {
      var a = i.attr("lay-filter"),
          e = _();

      layui.each(r["tool(" + a + ")"], function (a, t) {
        t && t.call(i, function (i) {
          ai(e.textarea[0], i);
        }, D, e);
      });
    },
    playAudio: function playAudio(i) {
      var a = i.data("audio"),
          e = a || document.createElement("audio"),
          n = function n() {
        e.pause(), i.removeAttr("status"), i.find("i").html("&#xe652;");
      };

      return i.data("error") ? t.msg("?????????????????????") : e.play ? void (i.attr("status") ? n() : (a || (e.src = i.data("src")), e.play(), i.attr("status", "pause"), i.data("audio", e), i.find("i").html("&#xe651;"), e.onended = function () {
        n();
      }, e.onerror = function () {
        t.msg("?????????????????????"), i.data("error", !0), n();
      })) : t.msg("????????????????????????audio");
    },
    playVideo: function playVideo(i) {
      var a = i.data("src"),
          e = document.createElement("video");
      return e.play ? (t.close(ti.playVideo.index), void (ti.playVideo.index = t.open({
        type: 1,
        title: "????????????",
        area: ["460px", "300px"],
        maxmin: !0,
        shade: !1,
        content: '<div style="background-color: #000; height: 100%;"><video style="position: absolute; width: 100%; height: 100%;" src="' + a + '" loop="loop" autoplay="autoplay"></video></div>'
      }))) : t.msg("????????????????????????video");
    },
    chatLog: function chatLog(i) {
      var a = _();

      return j.base.chatLog ? (t.close(ti.chatLog.index), ti.chatLog.index = t.open({
        type: 2,
        maxmin: !0,
        title: "??? " + a.data.name + " ???????????????",
        area: ["450px", "100%"],
        shade: !1,
        offset: "rb",
        skin: "layui-box",
        anim: 2,
        id: "layui-layim-chatlog",
        content: j.base.chatLog + "?id=" + a.data.id + "&type=" + a.data.type
      })) : t.msg("???????????????????????????");
    },
    menuHistory: function menuHistory(i, a) {
      var n = layui.data("layim")[j.mine.id] || {},
          l = i.parent(),
          s = i.data("type"),
          o = x.find(".layim-list-history"),
          d = '<li class="layim-null">??????????????????</li>';

      if ("one" === s) {
        var r = n.history;
        delete r[l.data("index")], n.history = r, layui.data("layim", {
          key: j.mine.id,
          value: n
        }), e("#" + l.data("id")).remove(), 0 === o.find("li").length && o.html(d);
      } else "all" === s && (delete n.history, layui.data("layim", {
        key: j.mine.id,
        value: n
      }), o.html(d));

      t.closeAll("tips");
    }
  };

  i("layim", new c());
}).addcss("modules/layim/layim.css?v=3.7.6", "skinlayimcss");