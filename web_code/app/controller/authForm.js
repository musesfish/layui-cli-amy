/**
 * 权限表单模板
 * @author: hoovoi
 * 
 * opt.authKey === "OPEN" 为开放权限
 */
; layui.define(['laytpl','utils'], function(exports){
    var MODE_NAME = 'authForm';
    const OPENAUTH = "OPEN"; // 开发权限关键字
    
    var defaults = {
        class: {
            wrap: 'layui-col-md3 layui-col-sm6'
        }
    };

    var htmlTemp = {
        "input": function(opt){ 
            var label = opt.label || '';
            var temp = [
                '<div class="' + getWrapClassName(opt) +'">',
                    '<div class="layui-form-item ">',
                        '<label class="layui-form-label">'+label+'</label>',
                        getSlot(opt),
                    '</div>',
                '</div>',
            ];
            return temp.join('');
        },
        "select": function(opt){
            var label = opt.label || '';
            var temp = [
                '<div class="' + getWrapClassName(opt) +'">',
                    '<div class="layui-form-item ">',
                        '<label class="layui-form-label">'+label+'</label>',
                        getSlot(opt),
                    '</div>',
                '</div>',
            ];
            return temp.join('');
        },
        "fuzzy": function(opt){
            const label = opt.label || '';
            return `
                <div class="${getWrapClassName(opt)}">
                    <div class="layui-form-item">
                        <label class="layui-form-label">${label}</label>
                        <div class="layui-input-block j-fuzzy-select ${opt.className}">
                        </div>
                    </div>
                </div>
            `
        },
        "province": function(opt){
            const placeholder = opt.placeholder || '';
            var temp = [
                '<div class="'+getWrapClassName(opt)+'">',
                    '<div class="layui-form-item">',
                        '<label class="layui-form-label">省</label>',
                        '<div class="layui-input-block">',
                            '<select name="provinceCode" lay-filter="province">',
                                '<option value="">' + placeholder+' </option>',
                                '{{# layui.each(d.province, function(index, item){}}',
                                    '<option value="{{item.regProvinceNum}}">{{ item.regProvinceName }}</option>',
                                '{{# }) }}',
                            '</select>',
                        '</div>',
                    '</div>',
                '</div>',
            ];
            return temp.join('');
        },
        "customerSourceLabel": function(opt){
            const placeholder = opt.placeholder || '';
            var temp = [
                '<div class="'+getWrapClassName(opt)+'">',
                    '<div class="layui-form-item">',
                        '<label class="layui-form-label">来源</label>',
                        '<div class="layui-input-block">',
                            '<select name="source" lay-filter="province">',
                                '<option value="-1">' + '全部'+' </option>',
                                '{{# layui.each(d.CustomerSourceLabel, function(index, item){}}',
                                    '<option value="{{index}}">{{ item }}</option>',
                                '{{# }) }}',
                            '</select>',
                        '</div>',
                    '</div>',
                '</div>',
            ];
            return temp.join('');
        },
        "treeCompany": function(opt){ 
            var count = layui.sessionData('treeCompanyCount').count||0;
            count++;
            var layFilter = opt.layFilter || ('m-tree-company' + count);
            layui.sessionData('treeCompanyCount', {
                "key": "count",
                "value": count
            })
            var temp = [
                '<div class="'+getWrapClassName(opt)+'">',
                    '<div class="layui-form-item">',
                        '<label class="layui-form-label">'+(opt.label||"分公司")+'</label>',
                        '<div class="layui-input-block m-tree-wrap" data-key="companys" data-filter="'+layFilter+'" data-event="resetSelect" data-uk="'+ opt.uk +'" >',
                            '<input type="hidden" name="companyId">',
                            '<input type="text" class="layui-input j-sel-tree" name="companyName" autocomplete="off"  placeholder="'+(opt.placeholder||'')+'">',
                            '<div class="m-tree-con" lay-filter="'+layFilter+'"></div>',
                        '</div>',
                    '</div>',
                '</div>'
            ];
            return temp.join('');
        },
        "staffCompays": function(opt){
            var count = layui.sessionData('treeCompanyCount').count||0;
            count++;
            var layFilter = opt.layFilter || ('m-tree-company' + count);
            layui.sessionData('treeCompanyCount', {
                "key": "count",
                "value": count
            })
            var temp = [
                '<div class="'+getWrapClassName(opt)+'">',
                    '<div class="layui-form-item">',
                        '<label class="layui-form-label">'+(opt.label||"分公司")+'</label>',
                        '<div class="layui-input-block m-tree-wrap" data-key="staffCompays" data-filter="'+layFilter+'" data-event="resetSelect">',
                            '<input type="hidden" name="companyId">',
                            '<input type="text" placeholder="'+(opt.placeholder||'')+'" class="layui-input j-sel-tree" name="companyName" autocomplete="off" placeholder="请选择">',
                            '<div class="m-tree-con" lay-filter="'+layFilter+'"></div>',
                        '</div>',
                    '</div>',
                '</div>'
            ];
            return temp.join('');
        },
        "treeDepartment": function(opt){
            var count = layui.sessionData('treeDepartmentCount').count || 0;
            count++;
            var layFilter = opt.layFilter || ('m-tree-department' + count);
            layui.sessionData('treeDepartmentCount', {
                "key": "count",
                "value": count
            }) 
            var temp = [
                '<div class="'+getWrapClassName(opt)+'">',
                    '<div class="layui-form-item">',
                        '<label class="layui-form-label">'+(opt.label||'部门')+'</label>',
                        '<div class="layui-input-block m-tree-wrap" data-key="department" data-filter="'+layFilter+'">',
                            '<input type="hidden" name="departmentId">',
                            '<input type="text" class="layui-input j-sel-tree" name="departmentName" autocomplete="off" placeholder="请选择">',
                            '<div class="m-tree-con" lay-filter="'+layFilter+'"></div>',
                        '</div>',
                    '</div>',
                '</div>'
            ];
            return temp.join('');
        },
        "treeDepartments": function(opt){
            var count = layui.sessionData('treeDepartmentCount').count || 0;
            count++;
            var layFilter = opt.layFilter || ('m-tree-department' + count);
            layui.sessionData('treeDepartmentCount', {
                "key": "count",
                "value": count
            }) 
            var temp = [
                '<div class="'+getWrapClassName(opt)+'">',
                    '<div class="layui-form-item">',
                        '<label class="layui-form-label">'+(opt.label||'部门')+'</label>',
                        '<div class="layui-input-block m-tree-wrap" data-key="departments" data-filter="'+layFilter+'" data-event="callback">',
                            '<input type="hidden" name="departmentId">',
                            '<input type="hidden" name="groupId">',
                            '<input type="hidden" name="teamId">',
                            '<input type="text" name="departmentName" autocomplete="off" class="layui-input j-sel-tree" placeholder="'+(opt.placeholder||'')+'">',
                            '<div class="m-tree-con" lay-filter="'+layFilter+'"></div>',
                        '</div>',
                    '</div>',
                '</div>'
            ];
            return temp.join('');
        },
        "position": function(opt){
            var temp = [
                '<div class="'+getWrapClassName(opt)+'">',
                    '<div class="layui-form-item">',
                        '<label class="layui-form-label">'+(opt.label||'职位名称')+'</label>',
                        '<div class="layui-input-block">',
                            '<select name="positionId">',
                                '<option value="">请选择职位名称</option>',
                            '</select>',
                        '</div>',
                    '</div>',
                '</div>',
            ];
            return temp.join('');
        },
        "date": function(opt){
            var name = opt.name || '';
            var temp = [
                '<div class="'+ getWrapClassName(opt)+' tab-placed">',
                    '<div class="layui-form-item">',
                        '<label class="layui-form-label">'+(opt.label||'')+'</label>',
                        '<div class="layui-input-block">',
                            '<input readonly type="text" class="layui-input laydate" data-type="'+(opt.dateType||'date')+'" readonly name="'+name+'">',
                        '</div>',
                    '</div>',
                '</div>'
            ];
            return temp.join('');
        },
        "dateRange": function(opt){
            var name = opt.name || ''; 
            var value = opt.value || '';
            if(opt.now){
                value = [layui.utils.convertTime(new Date(),'YMD'),layui.utils.convertTime(new Date(),'YMD')];
            }
            name = Array.isArray(name) ? name : name.split(',');
            value = Array.isArray(value) ? value : value.split(',');
            var dataProp = [];
            if(typeof opt.data === 'object'){
                for(var i in opt.data){
                    dataProp.push('data-'+i+'=\"'+opt.data[i]+'\"');
                }
            }
            var temp = [
                '<div class="'+getWrapClassName(opt)+'">',
                    '<div class="layui-form-item">',
                    '<div class="date-range flex">',
                            '<label class="layui-form-label layui-form-labela">'+(opt.label||'')+'</label>',
                            '<input readonly class="date-range-item" '+dataProp.join(" ") +' data-start="'+(name[0]||'')+'" data-end="'+(name[1]||'')+'">',
                            '<input class="layui-input flex-1" style="padding-right:10px" placeholder="'+(opt.placeholder||'')+'" name="'+(name[0]||'')+'" value="'+ (value[0]||'') +'" >',
                            '<span class="pad-lr-5 bor-lr">至</span>',
                            '<input class="layui-input flex-1" style="padding-right:10px" placeholder="'+(opt.placeholder||'')+'" name="'+(name[1]||'') + '" value="'+ (value[1]||'') +'" >',
                        '</div>',
                    '</div>',
                '</div>'
            ];
            return temp.join('');
        },
        "selPersonnel": function(opt,idx){
            var count = opt.count||1;
            var name = opt.name||'';
            var dataName = opt.dataName||"userId";
            var label = opt.label || ''; 
            var temp = [
                '<div class="'+ getWrapClassName(opt)+'">',
                    '<div class="layui-form-item">',
                        '<label class="layui-form-label">'+label+'</label>',
                        '<div class="layui-input-block">',
                            '<input type="hidden" name="'+dataName+'">',
                            '<input type="text" class="layui-input j-sel-personnel" readonly data-name="'+dataName+'" data-count="'+count+'" name="'+name+'">',
                        '</div>',
                    '</div>',
                '</div>'
            ];
            return temp.join('');
        },
        "selRole": function(opt){
            var name = opt.name||'';
            var dataName = opt.dataName || 'positionId';
            var temp = [
                '<div class="'+ getWrapClassName(opt)+' tab-placed">',
                    '<div class="layui-form-item">',
                        '<label class="layui-form-label">'+(opt.label||'')+'</label>',
                        '<div class="layui-input-block">',
                            '<input type="hidden" name="positionId">',
                            '<input type="text" class="layui-input j-sel-role" data-name="positionId" readonly '+(name==''?'':'name="'+name)+'">',
                        '</div>',
                    '</div>',
                '</div>'
            ];
            return temp.join('');
        }
    };
    
    /**
    * 获取搜索表单html模板
    * @param {Array} opt - [{name:<>}]
    * @param {Array} auth - 权限
    */
    function getFormTemp( opt, auth){
        if(!Array.isArray(opt)) return;
        auth = auth.concat(['省', '分公司']); // 开放省、分公司操作组件操作权限
        var html = [],
        // var html = ['<div class="layui-row">'],
            isPrvChils = false; // 上一个标签是否为数组
        for(var i=0,len=opt.length; i<len; i++){ 
            if( Array.isArray(opt[i])){
                // if (isPrvChils) html.push("</div>");
                isPrvChils = !0;
                // html.push('<div class="layui-row">');
                for(var j=0,jlen = opt[i].length; j<jlen; j++){
                    html.push(getFormItemTemp(opt[i][j], auth))
                }
            } else {
                if(isPrvChils) html.push("</div>");
                isPrvChils = !1;
                html.push(getFormItemTemp(opt[i], auth))
            }
        }
        // html.push('</div>');
        return html.join("");
    }

    // 获取formItem模板
    // authKey === "OPEN" 时为开放选项
    function getFormItemTemp(opt, auth){
        if(typeof opt === 'object') {
            var idx = auth.indexOf(opt.authKey);
            if (idx == -1 && opt.authKey !== OPENAUTH ) return ; // 没有权限
            if ( opt.hasOwnProperty('type')) { 
                var types = opt.type;
                if ( htmlTemp.hasOwnProperty(types) ){
                    return htmlTemp[types](opt,idx);
                }
            } else {
                return htmlTemp['input'](opt,idx)||'';
            }
        } else {
            console.error("参数错误")
        }
    }

    // 获取slot的模板
    function getSlot(opt){
        // 配置有slot，忽略类型模板
        if (opt.hasOwnProperty('slot')){ 
            return (Array.isArray(opt.slot)?opt.slot.join(''):opt.slot);
        } else { // 预设类型模板
            var slotHTML = []
            switch (opt.type) {
                case "input":
                    slotHTML = [
                        '<div class="layui-input-block">',
                            '<input type="text" placeholder="'+(opt.placeholder||'')+'" class="layui-input '+ (opt.inputClass||'') +'" autocomplete="off" name="'+ (opt.name||'') + '" value="'+(opt.value||'')+'">',
                        '</div>'
                    ];
                    break;
                case "select": 
                    slotHTML = [
                        '<div class="layui-input-block">',
                            '<select type="text" name="' + (opt.name || '') + '" value="">',
                                getSelectOptionHtml(opt.options),
                            '</select>',
                        '</div>'
                    ];
                    break;
                default:
                    break;
            }
            return slotHTML.join('');
        }
    }

    function getSelectOptionHtml(option){
        if(!Array.isArray(option)) return '';
        var html = [];
        for(var i = 0, len = option.length; i<len; i++){
            html.push('<option value="' + (option[i].value||'')+'">'+(option[i].label||'')+'</option>');
        }
        return html.join('')
    }

    function getWrapClassName(o){
        var className = defaults.class.wrap + ' ' + o.class;
        if (typeof o.groupClass !== 'undefined') className =  className + ' ' + o.groupClass;
        return className
    }

    /**
     * 
     * @param {ArrayObject|Object} opt - 配置权限数组 
     *      ArrayObject [{ type: <>, ... }]
     *      Object { submitBtn: <lay-filter>, resetBtn: <boolean>, data: <ArrayObject> }
     * @param {*} control - 请求返回的权限数组
     * @param {*} data - 渲染模板的参数
     * @param {*} elem - 权限表单的容器
     * @param {*} func - 渲染完成后的回调
     */
    function render(opt, control, data, elem, func){
        var optList = Array.isArray(opt) ? opt: (opt?.data||[]),
            control = control||[],
            data = data||{},
            elem = elem||layui.$(elem);
        layer.load(3);
        layui.laytpl(getFormTemp(optList,control)).render(data, function(html){
            if (opt.submitBtn || opt?.resetBtn) {
                const btnReset = `<button type='reset' class="layui-btn layui-btn-c w100 pull-right">重置</button>`
                const btnSubmit = `<button class="layui-btn w150 pull-right" lay-submit lay-filter="${opt.submitBtn}">搜索</button>`
                let btnHtml = `
                <div class="layui-col-md3 flex pad-juco-right">
                    ${opt.resetBtn ? btnReset : ''}
                    ${opt.submitBtn ? btnSubmit : '' }
                </div>
            `;
                elem.after(btnHtml)
            }
            elem.html(html);
            layer.closeAll("loading");
            func&&func()
        })
    }   

    exports(MODE_NAME, {
        getFormTemp: getFormTemp,
        render: render
    })
})