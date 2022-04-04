; layui.define(['api', 'store', 'setter'], function (exports) {
    var $ = layui.$,
        setter = layui.setter,
        search = layui.router().search,
        store = layui.store,
        api = layui.api;

    let key = api.api; 
    var TIMTOUT = top.layui.setter.request.timeout || 30000;
    var timeout;

    layui.sessionData('stack', { key: 'list', value: [] })

    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "H+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    /**
     * 请求模块ajax
     * 请求状态码ret
     * 100 成功
     * 106 登录信息失效，重定向到登陆页
     * 请求参数
     * @parsms params.loading=undefined - 请求发起显示加载动画
     */
    exports('ajax', function (params, options={}) {
        timeout = params.timeout;
        // 默认请求方式为get
        params.type = params.type || 'get';
        //默认所有接口都需要验证登录
        if (!params.hasOwnProperty('login')) {
            params.login = true;
        }

        //尝试从本地缓存中得到用户信息
        var token = store.get(setter.tableName);
        store.set(setter.tableName, token, setter.expires);
        
        !params.loading && layer.load(3);
        var count = 0, len = 0, _params = null, _data = {};
        if (Array.isArray(params.url)) {
            len = params.url.length;
            function _pack(_i) {
                params.url[_i].callback = function (res) {
                    if (typeof params.url[_i].retKey == 'string') {
                        _data[params.url[_i].key] = res[params.url[_i].retKey]
                    } else {
                        _data[params.url[_i].key] = params.url[_i].retKey(res)
                    }
                }
            }
            for (var i = 0; i < len; i++) {
                _params = params.url[i];
                _pack(i)
                _params.finalback = isLoad;
                request(_params, token);
            }
        } else {
            var stack = [];
            var lock = !1;
            if (!layui.sessionData('stack').hasOwnProperty('list')) {
                layui.sessionData('stack', {
                    key: 'list',
                    value: [params.url]
                })
            } else {
                stack = layui.sessionData('stack').list;
                if (stack.indexOf(params.url) >= 0) {
                    lock = !0;
                    return false;
                }
                stack.push(params.url);
                layui.sessionData('stack', { key: 'list', value: stack })
            }
            if (lock) return false;
            (params.type === 'JSON' || params.type === 'json') ? requests(params, token) : request(params, token);
        }

        // 请求完成
        function isLoad(res) {
            count++;
            if (count == len) { params.callback(_data) }
        }

        // get、post请求
        function request(params, token) {
            if (!params.data) { params.data = {} }

            params.data.userId = token.userId;
            params.data.token = token.token;

            var _url = typeof key[params.url] == 'undefined' ? params.url : key[params.url];
            $.ajax({ 
                url: api.apis + _url,
                type: params.type,
                data: params.data,
                timeout: timeout || TIMTOUT,
                dataType: 'json',
                async:params.async,//同步
                traditional: params.traditional || false,
                contentType: params.contentType || 'application/x-www-form-urlencoded; charset=UTF-8"',
                success: function (data, status, jqXHR) {
                    successFunc(data, status, jqXHR, params.success||params.callback);
                },
                error: function (jqXHR, status) {
                    errorFunc(jqXHR, status, params.error||params.errorback)
                },
                complete: function (jqXHR, status) {
                    completeFunc(jqXHR, status, params.complete||params.finalback)
                }
            });
        }
        /* 
         * 跨域请求
         * 复杂数据类型
         * dataType: JSON
        */
        function requests(params, token) {
            $.ajax({
                type: 'POST',
                url: api.apis + params.url + (params.url.indexOf("?") >= 0 ? "&" : "?") + api.getToken(),
                crossDomain: true,
                contentType: "application/json;charset=UTF-8",
                timeout: TIMTOUT,
                data: params.data,
                async: params.async,//同步
                success: function (data, status, jqXHR) {
                    successFunc(data, status, jqXHR, params.success||params.callback)
                },
                error: function (jqXHR, status) {
                    errorFunc(jqXHR, status, params.error||params.errorback)
                },
                complete: function (jqXHR, status) {
                    completeFunc(jqXHR, status, params.complete||params.finalback)
                }
            })
        }


        /* 
         * 移除已完成的请求
        */
        function removeStack(url) {
            var stack = layui.sessionData('stack').list || [];
            stack = stack.filter( item=> item!==url )
            layui.sessionData("stack", { key: 'list', value: stack })
        }

        /**
         * 请求成功回调
         * @param {*} data - 返回的数据
         * @param {*} status - 状态吗
         * @param {*} jqXHR - 请求对象
         */
        function successFunc(data, status, jqXHR, func) {
            if (data.ret == 100 || options.ret === 'other' ) {
                func && func(data, status, jqXHR)
            } else if (data.ret == 106) {
                top.layer.closeAll();
                if (top === self) {
                    location.href = '/#/user/login'
                }
                top.layui.admin.exit();
            }
            else {
                top.layer.msg( data.columName || data.msg||data, {
                    icon: 2,
                    time: 6000,
                    // area:['auto', 'auto'],
                    end: function(){
                        params.finalback && params.finalback(jqXHR, status);
                    }
                });
                setter.debug && console.error(JSON.stringify(data));
            }
        }

        /**
         * 请求错误回调
         * @param {*} jqXHR 
         * @param {*} status 
         */
        function errorFunc(jqXHR, status, func) {
            //恢复请求状态为true
            if (setter.debug) {
                console.log("url:" + params.url.slice(0, params.url.length) + "\n data:" + JSON.stringify(jqXHR));
            } else {
                //错误提示
                if (!params.hasOwnProperty('errorTip') || params.errorTip) {
                    top.layer.msg('服务器繁忙，请稍后再操作');
                }
            }
            func && func(jqXHR, status)
        }

        /**
         * 请求完成回调
         * @param {*} jqXHR 
         * @param {*} status 
         */
        function completeFunc(jqXHR, status, func) {
            layer.closeAll('loading')
            removeStack(params.url);
            func && func(jqXHR, status);
        }

    });
});