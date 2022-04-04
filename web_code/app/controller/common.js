/** layuiAdmin-v1.0.0-beta6 LPPL License By http://www.layui.com/admin/ */

;layui.define(function (e) {
    var i = (layui.$, layui.layer, layui.laytpl, layui.setter, layui.view, layui.admin);
    var l = layui, 
        s = layui.setter,
        jq = l.jquery;
    
    // number类型的input滚动事件
    jq('input[type="number"]').on("mousewheel", function (evt){
        evt = evt || window.event;
        if (evt.preventDefault) {
            // Firefox  
            evt.preventDefault();
            evt.stopPropagation();
        } else {
            // IE  
            evt.cancelBubble = true;
            evt.returnValue = false;
        }
        return false;
    })
    i.events.setUserInfo = function(d){
        jq('.user-avatar').prop('src', s[s.runServeType].resource + d.base.headImg)
        l.store.set(s.tableName, {
            'headImgUrl': d.base.headImg||''
        }, 10000);
    }
    i.events.logout = function () {
        i.exit()    
    },
    i.events.message = function(){
        location.hash ="/user/message/";
    },
    i.events.reUserInfo = function(){
        //console.log(i)
        i.popup("/str")
    },
    i.events.photos = function(){
        layui.$.getJSON('/json/photos.json', function (json) {
            layer.photos({
                photos: json
            })
        })
    },
    i.events.reThisTabTitle = function (title) {
        if (title == undefined || title == '' || title == null) return;
        jq('#LAY_app_tabsheader li.layui-this span').text(title)
    },
    i.events.getUserInfo = function () {
        return l.data(i.tableName)
    },
    /* 
     * 转变Form数据为Json数据
     * Form: { base_count: string } => Json: { base: { count: string } }
     * 过滤 null、string(长度为0)、undefined数据
     * @param data: Form提交的数据
    */
    i.events.spliceDate = function(data){
        var _data = {};
        for(var i in data){ fn(i) }
        function fn(k){
            var a = k.split('_');
            var b = a[0];
            if(a.length>1){
                if(_data[b] === undefined ){
                    _data[b] = {}
                }
                if(data[k] !== null && data[k] !== '' && data[k] !== undefined ){
                    _data[b][a[1]] = data[k]
                }
            } else {
                if(data[k] !== null && data[k]!=='' && data[k] !== undefined ){
                    _data[b] = data[k]
                }
            }
        }
        return _data
    },
    /* 
     * 移除空格
    */
    i.events.regNull = function(value){ 
        return value.replace(/\s/g, '')
    }

    e("common", {})
});