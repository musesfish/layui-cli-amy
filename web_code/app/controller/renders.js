; layui.define(['api', 'store', 'jsencrypt', 'ajax', 'form', 'upload', 'table', 'tree', 'laytpl'], function (exports) {
    const $ = layui.jquery;
    const { ajax, api, table, form, laytpl } = layui;

    const MAXFILESIZE = 1048576 * 2.1;  // 上传文件大小限制  //1,048,576 bytes=1M
    window.__file_name_sort = 1;

    // 禁止input输入字符e
    // 191107 允许输入 - 号
    $(document).on("keypress", "input[type='number']", function (e) {
        if (!String.fromCharCode(e.keyCode).match(/[0-9\.]/) && e.keyCode != 45) {
            return false;
        }
    })

    // fix: 重置type="hidden"的表单元素值为空
    $(document).on('click', '.layui-btn-c[type="reset"]', function (e) {
        const form_el = $(e.target).parents('form');
        form_el.find('input[type="hidden"]').val('')
    })

    function getPhotoPath(filePath) {
        let imgPath = filePath;
        if (/^http/.test(filePath)) imgPath = filePath;
        else imgPath = layui.api.resouce + filePath;
        return imgPath;
    }

    $(document).on('click', '.j-preview-img', function (e) {
        let photos = [];
        const target = e.target;
        const tagName = e.target.tagName.toLocaleLowerCase();
        if (tagName === 'img') {
            const nodeList = $(target).parent().children('img');
            nodeList.each(function () {
                photos.push({
                    alt: '',
                    src: getPhotoPath(this.src)
                })
            })
        } else {
            const nodeList = $(target).parents('[data-file]').eq(0).parent().children('[data-file]');
            nodeList.each(function () {
                photos.push({
                    alt: '',
                    src: getPhotoPath(this.dataset.file)
                })
            })
        }
        layer.photos({
            photos: { "data": photos }
        });
    })

    // 交互行为 时间组件选中显示边框
    $(document).on('click', function (e) {
        const tar = $(e.target);
        $('body').find(".select-date-in").removeClass('select-date-in')
        if (tar.hasClass("laydate")) {
            tar.addClass("select-date-in")
        } else {
            const parent_node = tar.parents('.date-range');
            if (parent_node.length > 0) parent_node.addClass("select-date-in")
        }
    })

    // 大于6位被隐藏的label文本提示
    var layerIndex;
    $(document).on('mouseenter', '.layui-form-label', function () {
        var tips = $(this).text().replace(/^\*/, '');
        tips = tips.replace(/[：|:]$/gi, '')
        if (tips.length > 6) {
            layerIndex = layer.tips(tips, $(this), { tips: 1 })
        }
    })
    $(document).on('mouseleave', '.layui-form-label', function () {
        layer.close(layerIndex)
    })

    // 下载模板文件
    $(document).on('click', '.j-down-temp', function () {
        const href = $(this).data().href;
        if (!href) return false;
        const form = $('<form method="GET"></form>');
        form.attr("action", href)
        form.appendTo(top.document.body);
        form.submit()
        form.remove()
    })

    // 删除附件
    $(document).on('click', '.file-btn-del', function () {
        let parentNode = $(this).parents('.upload-pre-file')
        if (parentNode.length === 0) parentNode = $(this).parents('.upload-info-pre-file');
        //展示上传按钮
        if (parentNode.parents(".m-up-file-wrap").data("autohideshow")) {
            parentNode.parents(".m-up-file-wrap").find(".jin-btn-upload").show();
        }
        parentNode.remove()
        // top.layer.confirm('确定要删除该附件吗？', {
        //     title: '删除附件',
        //     skin: 'layer-theme-confirm',
        // }, function(index){
        //     parentNode.remove()
        //     top.layer.close(index);
        // }, function(index){
        //     top.layer.close(index)
        // })
    })

    // 限制input number输入长度
    // 根据tagName和maxlengt属性提示文本长度 
    document.addEventListener('input', function (e) {
        const tar = e.target;
        const len = tar.getAttribute("maxlength");
        const val = tar.value;
        let max = tar.getAttribute('max');
        max = max == null ? 11 : max - 0;
        if (tar.tagName.toLocaleLowerCase() === "textarea" && len && val.length == len && !tar.dataset.tips) {
            layer.tips(`输入文本不能超出${len}字符`, tar, {
                skin: 'layertips-skin-lentips',
                tips: 3,
                time: 2500,
                anim: 5
            })
        } else if (tar.tagName.toLocaleLowerCase() === "input" && len && val.length == len && tar.dataset.lentips !== undefined) {
            layer.tips(tar.dataset.lentips, tar, {
                skin: 'layertips-skin-lentips',
                tips: 3,
                time: 2500,
                anim: 5
            })
        }
    })

    // 禁用滚轮事件
    function stopInputScrollEvent(e) {
        var e = e || window.event;
        if (e.target.type === 'number' && e.target.tagName === "INPUT") {
            if (e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
                e.returnValue = false;
            }
            return false;
        }
    }
    // 未指定对象，chrome上 document、body、window 默认忽略 mousewheel 的 preventDefault
    if (document.querySelector("#LAY_app")) {
        document.querySelector("#LAY_app").addEventListener("mousewheel", stopInputScrollEvent, true);
        document.querySelector("#LAY_app").addEventListener("DOMMouseScroll", stopInputScrollEvent, true); // firefox
    } else if (document.querySelector("#page-view")) {
        document.querySelector("#page-view").addEventListener("mousewheel", stopInputScrollEvent, true);
        document.querySelector("#page-view").addEventListener("DOMMouseScroll", stopInputScrollEvent, true); // firefox
    }

    exports('renders', {
        /**
         * 附件模版
         * @param {*} filepath 相对地址
         * @returns {String} html
         */
        getUploadPreNode(filepath = '') {
            const resourceServer = layui.api.resouce;
            const fileDir = resourceServer + filepath;
            const filename = filepath.substr(filepath.lastIndexOf('/') + 1);
            const suffix = filename.substr(filename.lastIndexOf('.') + 1);
            const imgFileType = new Set(['png', 'jpeg', 'jpg', 'gif']);
            const hasImgFile = imgFileType.has(suffix);
            const maskNode = hasImgFile ?
                `
                <img class="pre-img" src="${fileDir}" alt="图片加载失败" onerror="this.src='/static/images/logo.png'" />
                <div class="upload-pre-mask">
                    <img class="file-icon" src="/static/images/icon-pre.svg" alt="" />
                    <a href="javascript:void(0)" >预览</a>
                    <div class="j-preview-img touch-mask" data-file="${fileDir}"></div>
                </div>
                `
                :
                `
                <a class="upload-pre-mask" href="${fileDir}" download=${fileDir} >
                    <img class="file-icon" src="/static/images/icon-download.svg" alt="" />
                    <span>下载</span>
                </a>
                `
            // fix: 兼容错误的数据 eg: ',xxx.jpg'
            if (filepath === '') return ``;
            return `
            <div class="upload-pre-file" data-file="${filepath}">
                <div class="file-box" data-type="${suffix}">
                    ${maskNode}
                </div>
                <div class="file-control">
                    <p class="file-name" title="${filename}">${filename}</p>
                    <div class="file-btn-del"></div>
                </div>
            </div>
            `
        },
        getUploadSmallPreNode(filepath) {
            const resourceServer = layui.api.resouce;
            const fileDir = resourceServer + filepath;
            return `
            <div class="upload-info-pre-file" data-file="${filepath}" >
                <img class="j-preview-img" src="${fileDir}" alt=""  />
                <div class="file-btn-del"></div>
            </div>
            `
        },
        /*
        ** randomWord 产生任意长度随机字母数字组合
        ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
        */
        randomWord: function (randomFlag, min, max) {
            var str = "",
                range = min,
                arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

            // 随机产生
            if (randomFlag) {
                range = Math.round(Math.random() * (max - min)) + min;
            }
            for (var i = 0; i < range; i++) {
                var pos = Math.round(Math.random() * (arr.length - 1));
                str += arr[pos];
            }
            return str;
        },

        // 状态管理
        store: {
            tablePage: { curr: 1, layout: ['count', 'prev', 'page', 'next', 'skip'], next: '下一页', prev: '上一页', groups: 10, limit: 10, theme: 'tb-page' }
        },
        /**
         * 客户资料
         * */
        information: {
            init: function (view) {
                //上传控件
                function initUpFile() {
                    view.find(".m-box .up-img").each(function (i, v) {
                        var html = '<div class="layui-input-inline market-up-file" id="account-up-file' + i + '">' +
                            '<div class="btn-add jin-btn-info-upload-pic"></div>' +
                            '</div>';
                        $(this).parent().append(html);
                        $(this).hide();
                        layui.renders.upload({ elem: '#account-up-file' + i, type: 'small' });
                    });
                }
                initUpFile()
                // 点击放大图片
                view.find('.m-box img').click(function (e) {
                    layer.photos({
                        photos: { "data": [{ "src": e.target.src }] }
                    });
                });
            },
            /**
             * 保存客户资料对象
             * @param {dom object} view - 视图窗口对象
             * @param {object} opt - 配置 isAll - 是否返回所有（包含未勾选） name - 类型参数
             */
            saveData: function (view, opt) {
                var takeData = [];
                var isAll = opt.isAll || undefined;
                var name = opt.name || 'code';
                view.find('.take-data .take-data-div').each(function (i, v) {
                    if ($(this).find("input:checked").length == 0 && !isAll) return true;
                    var obj = {}, url;
                    $(this).find('.upload-info-pre-file').each(function (i, v) {
                        if (i == 0) {
                            url = this.dataset.file;
                        } else {
                            url += ',' + this.dataset.file;
                        }
                    });
                    if (url) obj.url = url;
                    else obj.url = "";
                    obj.id = $(this).children().first().find('div').data('id');
                    obj.name = $(this).children().first().find('div').html();
                    obj[name] = $(this).children().first().find('div').data('code');
                    obj.position = $(this).children().first().find('div').data('position');
                    if ($(this).find(".orgdiv input").siblings().hasClass("layui-form-checked")) {
                        obj.originalScript = 1;
                    } else {
                        obj.originalScript = 0;
                    }
                    if ($(this).find(".copydiv input").siblings().hasClass("layui-form-checked")) {
                        obj.copoyScript = 1;
                    } else {
                        obj.copoyScript = 0;
                    }
                    takeData.push(obj);
                })
                return takeData;
            }
        },

        //四舍五入保留2位小数（不够位数，则用0替补）
        KeepTwoDecimalFull: function (num) {
            var result = Math.round(num * 100) / 100;
            var s_x = result.toString();
            var pos_decimal = s_x.indexOf('.');
            if (pos_decimal < 0) {
                pos_decimal = s_x.length;
                s_x += '.';
            }
            while (s_x.length <= pos_decimal + 2) {
                s_x += '0';
            }
            return s_x;
        },

        /*
         * layer 的封装
         * offset: ['10px','20px']  仅且两个值都为px且offset值为undefined时，弹窗在容器#Lay_app_body居中
         */
        con: function (opt) {
            // 默认配置
            var defaults = {
                type: 2,
                maxmin: 0,
                area: ['76%', '90%'],
                skin: 'layer-theme-default'
            };
            opt = Object.assign(defaults, opt);
            //给title默认样式
            if (!Array.isArray(opt.title)) {
                opt.title = [opt.title, 'font-size: 18px; font-weight: bold;text-align: left;'];
            }
            // if (Array.isArray(area) && !offset) {
            //     if (/px$/.test(area[0]) && /px$/.test(area[0])) delete defaults.offset;
            // }
            if (opt.type == 2) {
                if (!/^(\/app\/)/.test(opt.content)) {
                    // 弹层layui不能获取setter
                    opt.content = (top === self ? '/app/' : top.layui.setter.base) + opt.content + (opt.content.indexOf("?") === -1 ? "?v" : "&v") + (+ new Date());
                } else {
                    opt.content = opt.content + (opt.content.indexOf("?") === -1 ? "?v" : "&v") + (+ new Date())
                }
            }
            // if (!opt.offset) {
            //     var area = opt.area;
            //     var rect = top.document.querySelector('#LAY_app_body') == null ? top.document.body.getBoundingClientRect() : top.document.querySelector('#LAY_app_body').getBoundingClientRect();
            //     var newW = !area[0].match(/%/) ? parseInt(area[0]) : ~~(rect.width * (parseInt(area[0]) / 100));
            //     var newH = !area[0].match(/%/) ? parseInt(area[1]) : ~~(rect.height * (parseInt(area[1]) / 100));
            //     var newL = ~~((rect.width - newW) / 2 + rect.left);
            //     var newT = ~~((rect.height - newH < 0 ? 0 : rect.height - newH) / 2 + rect.top);
            //     opt.area = [newW + 'px', newH + 'px'];
            //     opt.offset = [newT + 'px', newL + 'px'];
            // }
            return top.layer.open(opt)
        },
        /*
         * layer.msg 成功提示窗口
         * 在当前窗口弹出
         * @params callback: layer销毁后的回调
         *
         */
        msg: function (tips, opt, callback) {
            var defaults = {
                "time": 1200,
                "icon": 1
            }
            if (opt instanceof Function) opt = { end: opt };
            if (opt instanceof Object) opt = opt || {};
            opt = opt || {};
            for (var i in defaults) {
                if (typeof opt[i] == 'undefined') {
                    opt[i] = defaults[i]
                }
            }
            top.layer.msg(tips, opt, callback)
        },

        /*
         * 错误提示窗
         * @ param tips: 提示文本
         * @ param end: 窗口关闭回调
         */
        fail: function (tips, end) {
            this.msg(tips, { icon: 2, time: 3000, end: end })
        },

        fails: function (tips, opt, callback) {
            var defaults = {
                "time": 1200,
                "icon": 2
            }
            if (opt instanceof Function) opt = { end: opt };
            if (opt instanceof Object) opt = opt || {};
            opt = opt || {};
            for (var i in defaults) {
                if (typeof opt[i] == 'undefined') {
                    opt[i] = defaults[i]
                }
            }
            layer.msg(tips, opt, callback)
        },

        /**
         * 渲染laydate 普通的组件
         * 结构 <input class='laydate' data-type='date' data-format='yyyy-MM-dd'>
         * 参数
         * date-type: year,month,date,time,datetime
         */
        date: function (opt, func) {
            var obj = {};
            var func = func || {};
            lay('.laydate').each(function () {
                $(this).attr('readonly', true)
                var types = $(this).data('type');
                var format = $(this).data("format");
                var done = $(this).data("done"); // done回调
                var options = {
                    elem: this,
                    trigger: 'click',
                    type: types == undefined ? 'date' : types,
                    format: (typeof format === 'undefined') ? 'yyyy-MM-dd' : format,
                };
                func.hasOwnProperty("done") ? options.done = func[done] : '';
                var name = $(this).prop('name');
                if (typeof opt === 'object') {
                    var _options = opt[name];
                    options = {
                        ..._options,
                        ...options
                    }
                };
                obj[name] = layui.laydate.render(options);
            })
            return obj;
        },

        /**
         * 渲染下拉结构树
         * @param {视图页面} v
         * @param {Object} f - 回调方法集合，会根据data-event执行 f对象中对应键值的Function. f = { funcA: function(){}, funcB: function(){}}}
         * @param {object} fieldFn - 覆盖where搜索条件的方法集合
         * @param {object} unProvince 1 不联动省
         */
        eleTrees: function (v, f, fieldFn, url_, unProvince) {
            var t = this;
            var func = f || {},
                funcField = fieldFn || {},
                renderFunc = function () {
                    const self = $(this);
                    const data = self.data();
                    var opt = {
                        view: v,
                        elem: $(this)
                    }
                    if (data.event) {
                        opt.event = func[data.event]
                    }
                    if (data.field) {
                        opt.field = funcField[data.field];
                    }
                    if (data.key === 'departments') {
                        opt.callback = opt.event;
                        delete opt.event;
                        t.department(opt);
                        return false;
                    }
                    opt.url_ = url_;
                    t.eleTree(opt)
                };
            !unProvince && v.find("select[name='provinceCode']").on("change", function () {
                v.find('select[name = "departmentId"]').val("");
                v.find("input[name='companyId']").val('');
                v.find("input[name='departmentId']").val('');
                v.find("input[name='companyName']").val('');
                v.find('input[name="departmentName"]').val('');
                v.find("select[name='groupId']").html('');
                v.find("select[name='teamId']").html('');
                v.find("select[name='positionId']").html('');
                // // 主动触发下一级分公司
                v.find("input[name='companyName']").trigger('click').parent().removeClass("u-sel");
                // v.find("input[name='companyName']").trigger('click');
                form.render('select')
            })
            v.find(".m-tree-wrap").each(renderFunc);
        },

        /*
         * 下拉树 
         * 参数
         * opt.view - 视图容器
         * opt.where - 额外条件
         * opt.elem - 节点
         * opt.url - 请求地址
         * opt.query - 属性名
         * opt.event - 点击回调
         * {function} opt.field - 覆盖传递接口的数据
         * 
         * @exapmle
         * // data-un-province="1" 不关联 地区（省份）
         * // data-key="companys" 内置模式
         * // data-name="clientsCityCompanyId" 存储的input name
         * // data-uk = 内置的其他请求地址键值
         *      <div class="layui-input-block m-tree-wrap" data-key="companys" data-un-province="1" data-name="clientsCityCompanyId" data-uk="clientsCityCompany" data-filter='customer-pond-edit-company' data-event="resetSelect">
                    <input type="hidden" name="clientsCityCompanyId" id="companyId">
                    <input type="text" class="layui-input j-sel-tree" name="clientsCityCompanyName" readonly autocomplete='off' placeholder="请选择" lay-verify="required">
                    <div class="m-tree-con" lay-filter="customer-pond-edit-company"></div>
                </div>
         */
        eleTree: function (opt) {
            if (opt == undefined) return false;
            var url = '';
            var arr = [];

            const urlList = {
                'clientsCityCompany': '/company/getCompanysByConditionToUserInfo'
            }
            const uk = opt.elem.data('uk');
            // 不关联省
            const unProvince = opt.elem.data("unProvince");
            // 财务模块专用
            if (opt.url_ && opt.url_ == '/company/getCompanyOrganizationList') {
                url = '/company/getCompanyOrganizationList';
                arr = ['dataList'];
            } else {
                // 默认配置
                // 搜索表单 省-分部 分部接口
                // url = '/company/getCompanysByCondition';
                // arr = ['data', 'list'];
                url = '/company/getCompanyOrganizationList';
                arr = ['dataList']
            }

            if (uk && urlList.hasOwnProperty(uk)) {
                url = urlList[uk];
                arr = ['data', 'list']
            }

            var _OPTIONS = {
                // 分公司下拉树
                // "companys": {
                //     // url: '/structure/getOrganizationalStructureByCondition',
                //     // 2019-06-13 改用该接口且不可传参数，显示所有
                //     url: '/structure/getOrganizationalStructureAndDepartmentAndEmployee',
                //     query: 'companyName',
                //     dataName: 'data',
                //     where: function () {
                //         // if (opt.view.find('select[name="provinceId"]').length > 0) {
                //         //     return {
                //         //         "provinceCode": opt.view.find('select[name="provinceId"]').find("option:selected").val()
                //         //     }
                //         // }
                //         return {
                //             // "provinceCode": opt.view.find('select[name="provinceCode"]').find("option:selected").val()
                //         }
                //     },
                //     event: function (d) {
                //         var _data = d.data.currentData;
                //         var val = _data.companyName === "请选择"?"":_data.companyName;
                //         var parentIds = _data.parentIds == undefined ? [] : _data.parentIds.split(',');
                //         parentIds.push(_data.id);
                //         input.val(val);
                //         wrap.find("input[name='companyId']").val(_data.id);
                //         wrap.find("input[name='parentId']").val(_data.parentId);
                //         wrap.find("input[name='parentIds']").val(parentIds.join(","));
                //         opt.view.find("input[name='departmentId']").val('');
                //         opt.view.find('input[name="departmentName"]').val('');
                //     }
                // },

                // 分公司下拉列表
                // 190820 "company"=> "companys" 处理搜索改为列表的需求 
                "companys": {
                    url: url,
                    query: 'companyName',
                    dataName: arr,
                    where: function () {
                        let where = {
                            "pageSize": 999,
                            "state": 0
                        }
                        !unProvince && Object.assign(where, { "provinceCode": opt.view.find('select[name="provinceCode"]').find("option:selected").val() || opt.view.find('select[name="provinceId"]').find("option:selected").val() });
                        (uk && urlList.hasOwnProperty(uk)) && Object.assign(where, { pageSize: 999 })
                        if (opt.hasOwnProperty('field') && typeof opt.field === 'function') {
                            Object.assign(where, opt.field());
                        }
                        if (!where.provinceCode || /\D/.test(where.provinceCode)) delete where.provinceCode;
                        return where
                    },
                    event: function (d) {
                        const id = opt.elem.data('name') || "companyId";
                        var _data = d.data.currentData;
                        var parentIds = _data.parentIds == undefined ? [] : _data.parentIds.split(',');
                        parentIds.push(_data.id);
                        input.val(_data.id == '' ? '' : _data.companyName);
                        wrap.find(`input[name='${id}']`).val(_data.id);
                        wrap.find("input[name='parentId']").val(_data.parentId);
                        wrap.find("input[name='parentIds']").val(parentIds.join(","));
                        opt.view.find('input[name="departmentName"]').val('');
                        opt.view.find("input[name='departmentId']").val('');
                    }
                },
                "department": {
                    url: '/structure/getDepartmentStructure',
                    query: 'departmentName',
                    dataName: 'dataList',
                    where: function () {
                        return {
                            "provinceCode": opt.view.find('select[name="provinceCode"]').find("option:selected").val(),
                            "companyId": opt.view.find('input[name="companyId"]').val()
                        }
                    },
                    event: function (d) {
                        var _data = d.data.currentData;
                        input.val(_data.id == '' ? '' : _data.departmentName);
                        wrap.find("input[name='departmentId']").val(_data.id);
                    }
                },
                // 人事模块部分部专用接口
                "staffCompays": {
                    url: '/company/getCompanysByConditionToUserInfo',
                    query: 'companyName',
                    dataName: ['data', 'list'],
                    where: function () {
                        let where = {
                            "pageSize": 999,
                            "provinceCode": opt.view.find('select[name="provinceCode"]').find("option:selected").val() || opt.view.find('select[name="provinceId"]').find("option:selected").val(),
                            "state": 0
                        }
                        if (opt.hasOwnProperty('field') && typeof opt.field === 'function') {
                            Object.assign(where, opt.field());
                        }
                        if (!where.provinceCode || /\D/.test(where.provinceCode)) delete where.provinceCode;
                        return where
                    },
                    event: function (d) {
                        var _data = d.data.currentData;
                        var parentIds = _data.parentIds == undefined ? [] : _data.parentIds.split(',');
                        parentIds.push(_data.id);
                        input.val(_data.id == '' ? '' : _data.companyName);
                        wrap.find("input[name='companyId']").val(_data.id);
                        wrap.find("input[name='parentId']").val(_data.parentId);
                        wrap.find("input[name='parentIds']").val(parentIds.join(","));
                        opt.view.find('input[name="departmentName"]').val('');
                        opt.view.find("input[name='departmentId']").val('');
                    }
                },
            }

            var that = this;
            var wrap = opt.elem;
            var DATATYPE = wrap.data().key; // 预设
            var FILTER = wrap.data().filter;
            if (!_OPTIONS.hasOwnProperty(DATATYPE) && DATATYPE) {
                console.error('下拉树不存在该类型：' + DATATYPE);
                return false;
            }

            var elem = wrap.find('.m-tree-con');
            var input = wrap.find(".j-sel-tree");
            var where = !DATATYPE ? opt.where : _OPTIONS[DATATYPE].where;
            var treeEl;
            var options = {
                elem: elem,
                emptText: '暂无数据',
                url: api.getApi(!DATATYPE ? opt.url : _OPTIONS[DATATYPE].url),
                request: {
                    name: !DATATYPE ? opt.query : _OPTIONS[DATATYPE].query,
                    key: 'id',
                    children: 'childs'
                },
                response: {
                    statusName: 'ret',
                    statusCode: 100,
                    dataName: !DATATYPE ? opt.dataName : _OPTIONS[DATATYPE].dataName,
                },
                done: function (d) {
                    // 初始赋值
                    // var data = d.data.list;
                    // if (opt.view.find("select[name='provinceCode']").length > 0){
                    //     var val = data[1].companyName;
                    //     input.val("请选择"===val?"":val);
                    //     input.prev('input[name="companyId"]').val(data[1].id);
                    // }   
                },
                expandOnClickNode: 0,
                highlightCurrent: 1
            }

            // 点击文本框显示加载啦下拉树
            input.on('click', function (e) {
                e.stopPropagation();
                opt.view.find(".m-tree-wrap").not(wrap).removeClass("u-sel");
                opt.view.find(".layui-form-select").removeClass('layui-form-selected');
                var provinceCode = opt.view.find("select[name='provinceCode']").find("option:selected").val();
                if (typeof where == 'function') {
                    options.where = where()
                } else {
                    options.where = opt.where
                }
                if (provinceCode == '' && !unProvince) {
                    elem.html('<div class="layui-disabled layui-this pad-5">没有选项</div>')
                } else {
                    if (!treeEl) {
                        treeEl = layui.eleTree.render(options);
                    } else {
                        treeEl.reload(options)
                    }
                }

                wrap.toggleClass('u-sel')
            })

            layui.eleTree.on("nodeClick(" + (FILTER ? FILTER : opt.filter) + ")", clickNode)

            $(document).on('click', function () {
                elem.html('')
                wrap.removeClass('u-sel')
            })

            function clickNode(d) {
                if (DATATYPE != undefined) {
                    if (DATATYPE != undefined && _OPTIONS[DATATYPE].hasOwnProperty("event")) {
                        _OPTIONS[DATATYPE].event(d)
                    }
                }
                opt.event && opt.event(d);
                wrap.removeClass('u-sel');
            }

            return treeEl
        },

        /*
         * 动态部门结构
         * @param opt.elem : tree选择器或dom
         * @praam opt.lay: 点击监听 lay-filter
         */
        department: function (opt) {
            var t = this,
                wrap = opt.elem,
                view = opt.view,
                input = wrap.find('.j-sel-tree'),
                elem = wrap.find('.m-tree-con'),
                treeEl,
                event = opt.callback,
                FILTER = wrap.data().filter,
                options = {
                    elem: elem,
                    data: [],
                    renderAfterExpand: 1,
                    expandOnClickNode: 0,
                    lazy: true,
                };
            if (opt.hasOwnProperty('callback')) {
                opt.callback = function (d) {
                    var data = d.data.currentData; // 选中的节点数据
                    var id = data.nodeId || '';
                    input.val(data.nodeName);
                    wrap.find('input[name="departmentId"]').val(id.split(',')[0] || "")
                    wrap.find('input[name="sectorId"]').val(id.split(',')[0] || "")
                    wrap.find('input[name="groupId"]').val(id.split(',')[1] || "")
                    wrap.find('input[name="teamId"]').val(id.split(',')[2] || "")
                    event && event(d)
                }
            }

            input.on('click', function (e) {
                e.stopPropagation();
                opt.view.find(".m-tree-wrap").not(wrap).removeClass("u-sel");
                opt.view.find(".layui-form-select").removeClass('layui-form-selected');
                if (!treeEl) {
                    treeEl = layui.eleTree.render(options);
                } else {
                    treeEl.reload(options)
                }
                wrap.toggleClass('u-sel')
                var companyId = opt.view.find('input[name="companyId"]').val();
                if (companyId == '') {
                    elem.html('<div class="layui-disabled layui-this pad-5">没有选项</div>')
                    return false;
                }
                ajax({
                    url: "/structure/getDepartmentStructure",
                    data: {
                        "companyId": companyId,
                        "provinceCode": opt.view.find('select[name="provinceCode"]').find("option:selected").val()
                    },
                    loading: 1,
                    callback: function (res) {
                        var data = JSON.stringify(res.dataList);
                        data = data.replace(/departmentName/g, 'label');
                        data = data.replace(/childs/g, 'children');
                        data = JSON.parse(data);
                        data = addNodeName(data);
                        if (!data) return false; // fix: data=false 
                        treeEl.reload({
                            elem: elem,
                            data: [{ "label": "请选择", "id": '', isLeaf: true }, ...data],
                            renderAfterExpand: 1,
                            expandOnClickNode: 0,
                            load: function (data, callback) {
                                if (data.hasOwnProperty("groupDescribe")) {
                                    ajax({
                                        url: '/Team/getTeamsByCondition',
                                        data: { companyId: companyId, state: 0, groupId: data.id },
                                        loading: 1,
                                        callback: function (res) {
                                            var team = res.data.list;
                                            team = JSON.stringify(team).replace(/teamName/g, 'label');
                                            team = JSON.parse(team);
                                            team = addNodeName(team, data.nodeName, data.nodeId)
                                            callback(team)
                                        }
                                    })
                                } else if (data.hasOwnProperty("parentId") && !data.hasOwnProperty('groupDescribe')) {
                                    ajax({
                                        url: '/group/getGroupsByCondition',
                                        data: { companyId: companyId, state: 0, departmentId: data.id },
                                        loading: 1,
                                        callback: function (res) {
                                            var group = res.data.list;
                                            group = JSON.stringify(group).replace(/groupName/g, 'label');
                                            group = JSON.parse(group);
                                            group = addNodeName(group, data.nodeName, data.nodeId)

                                            callback(group)
                                        }
                                    })
                                } else {
                                    callback([])
                                }
                            }
                        })
                    }
                })
            })

            function addNodeName(d, name, id) {
                if (d == null) return false;
                var data = d;
                var name = name == undefined ? '' : name + "-";
                var id = id == undefined ? '' : id + ",";
                for (var i = 0; i < data.length; i++) {
                    if (data[i].node == undefined) {
                        data[i].node = ''
                    }
                    data[i].nodeName = name + data[i].label;
                    data[i].nodeId = id + data[i].id
                }
                return data
            }
            layui.eleTree.on("nodeClick(" + FILTER + ")", function () {
                opt.callback && opt.callback(arguments[0])
            })

            $(document).on('click', function () {
                elem.html('')
                wrap.removeClass('u-sel')
            })
        },

        /*
         * 动态 select 渲染
         * @param api: 请求地址
         * @param redata: 请求数据
         * @param elem: 渲染对象选择器  (可能数组 如：[`select[name="positionId1"]`,`select[name="positionId0"]`] 或 $('.position-box select') )
         * @param item: { id: 'id', name: 'positionName' }
         * @param callback: 回调方法
         * @param name: 是否把val值设为name值
         */
        select: function (api, redata, elem, item, callback, name) {
            redata = layui.api.filterData(redata);
            redata.pageSize = 999;
            var elem = typeof elem == 'string' ? $(elem) : elem;
            ajax({
                url: api,
                data: redata,
                loading: 1,
                callback: function (rdata) {
                    var data = rdata.data.list;
                    var html = null;
                    var len = data == undefined ? 0 : data.length;
                    html = "<option value='' selected>请选择<option>"
                    for (var i = 0; i < len; i++) {
                        if (name) html += "<option value=" + data[i][item.name] + ">" + data[i][item.name] + "<option>"
                        else html += "<option value=" + data[i][item.id] + ">" + data[i][item.name] + "<option>"
                    }
                    if (Array.isArray(elem)) {
                        for (var j = 0; j < elem.length; j++) {
                            $(elem[j]).html(html)
                        }
                    }
                    else {
                        elem.html(html)
                    }
                    callback && callback()
                    form.render('select')
                }
            })
        },

        /*
         * 渲染市 主要用于初始化
         * @param id: 省份id
         * @param ele: 视图对象
         * @callback: 回调方法
         */
        city: function (id, ele, callback) {
            if (!id) {
                ele.find("select[name='cityCode']").html('');
                ele.find("select[name='countyCode']").html('');
                form.render('select')
                return false;
            }
            ajax({
                url: "selectCity",
                data: { "provinceCode": id },
                callback: function (res) {
                    var html = '',
                        arr = res.objList,
                        len = arr == null ? 0 : arr.length;
                    for (var i = 0; i < len; i++) {
                        html += '<option value="' + arr[i].regCityNum + '" id=' + arr[i].regCityId + '>' + arr[i].regCityName + "</option>"
                    }
                    ele.find("select[name='cityCode']").html(html);
                    form.render('select')
                    callback && callback(arr == null ? '' : arr[0].regCityNum)
                }
            })
        },
        city_2: function (id, ele, callback) {
            if (!id) {
                ele.find("select[name='cityCodes']").html('');
                ele.find("select[name='countyCodes']").html('');
                form.render('select')
                return false;
            } else {
                ajax({
                    url: "selectCity",
                    data: { "provinceCode": id },
                    callback: function (res) {
                        var html = '',
                            arr = res.objList,
                            len = arr == null ? 0 : arr.length;
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + arr[i].regCityNum + '" id=' + arr[i].regCityId + '>' + arr[i].regCityName + "</option>"
                        }
                        ele.find("select[name='cityCodes']").html(html);
                        form.render('select')
                        callback && callback(arr == null ? '' : arr[0].regCityNum)
                    }
                })
            }
        },

        county_2: function (id, ele, callback) {
            if (!id) {
                ele.find("select[name='countyCodes']").html('');
                form.render('select')
                return false;
            } else {
                ajax({
                    url: "selectCounty",
                    data: { "cityCode": id },
                    callback: function (res) {
                        var html = '',
                        arr = res.objList,
                        len = arr == null ? 0 : arr.length;
                        for (var i = 0; i < len; i++) {
                            html += '<option value="' + arr[i].regCountyNum + '">' + arr[i].regCountyName + "</option>"
                        }
                        ele.find("select[name='countyCodes']").html(html);
                        form.render('select')
                        callback && callback(arr == null ? '' : arr[0].regCountyNum)
                    }
                })
            } 
        },

        /* 渲染地区 */
        county: function (id, ele, callback) {
            if (!id) {
                ele.find("select[name='countyCode']").html('');
                form.render('select')
                return false;
            }
            ajax({
                url: "selectCounty",
                data: { "cityCode": id },
                callback: function (res) {
                    var html = '',
                        arr = res.objList,
                        len = arr == null ? 0 : arr.length;
                    for (var i = 0; i < len; i++) {
                        html += '<option value="' + arr[i].regCountyNum + '">' + arr[i].regCountyName + "</option>"
                    }
                    ele.find("select[name='countyCode']").html(html);
                    form.render('select')
                    callback && callback(arr == null ? '' : arr[0].regCountyNum)
                }
            })
        },

        /**
         * 渲染日志
         * @param {string} selector - 渲染节点选择器
         * @param {Node} parentNode - 父容器节点
         * @param {Array} data - 数据
         * @returns 
         */
        log: function (selector, parentNode, data) {
            if (!Array.isArray(data)) return false;
            var list = data,
                len = list.length;
            let html = [];
            for (var i = 0; i < len; i++) {
                let li_html = [];
                for (var j in list[len - 1 - i]) {
                    li_html.push(`<p>${list[len - 1 - i][j]}</p>`)
                }
                html.push(`<li>${li_html.join('')}</li>`)
            }
            parentNode.find(selector).html(`<ul class="timeline-box">${html.join('')}</ul>`)
        },

        /*
         * 生成附件标签
         * 应用于人事模块的人员编辑、添加页
         */
        fileTags: function (elem, data) {
            if (data == null) return;
            data = data != null ? data.replace(/,$/, '') : data
            var arr = data.split(',');
            if (arr.length >= 5) {
                $(elem).addClass("hide")
            }
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == "") continue;
                // var fileEle = $("<a class='file-tag' target='_blank' href='" + top.layui.api.getFileHost() + arr[i] + "' data-file='" + arr[i] + "'>" + arr[i].split('/').pop() + "<i class='layui-icon layui-icon-close-fill del-file'></i></a>");
                var fileEle = $(layui.renders.getUploadPreNode(arr[i]))
                fileEle.on('click', '.file-btn-del', function (e) {
                    $(elem).removeClass('hide')
                })
                $(elem).after(fileEle)
            }
        },

        /*
         * 渲染上传图片附件
         * opt = { elem: '#up-file', file: 'file2.jpg,file2.jpg' }
         */
        renderAnnex: function (opt) {
            var e = opt.elem || '#up-file',
                f = (Array.isArray(opt.file)) ? opt.file : opt.file == '' ? [] : opt.file.split(','),
                p = $('<div></div>');
            for (var i = 0; i < f.length; i++) { r(f[i]) }

            function r(url) {
                var item = $(layui.renders.getUploadPreNode(url));
                p.append(item)
            }
            $(e).after(p.children())
        },

        /*
         * 渲染表格 数据改变
         */
        changeTableData: function (res, controls) {
            var data = (res.data && res.data.list) || [];
            $(data).each(function (i, v) {
                if (v.serviceChargeUnit == 1) {
                    v.serviceChargeUnit = '/月';
                } else if (v.serviceChargeUnit == 2) {
                    v.serviceChargeUnit = '/季度';
                } else if (v.serviceChargeUnit == 3) {
                    v.serviceChargeUnit = '/半年';
                } else if (v.serviceChargeUnit == 4) {
                    v.serviceChargeUnit = '/年';
                } else {
                    v.serviceChargeUnit = '';
                }
                for (var j in v) {
                    if (v[j] == 'null' || v[j] == null) v[j] = "";
                }
                v.controls = controls;
            });
            return { "code": res.ret == 100 ? 0 : 1, "msg": res.msg, "count": res.data.total, "data": data }
        },

        changeTableData_: function (res, controls) {
            var data = res.data.list || [];
            $(data).each(function (i, v) {
                for (var j in v) {
                    if (v[j] == 'null' || v[j] == null) v[j] = "";
                }
                v.controls = controls;
            });
            return { "code": res.ret == 100 ? 0 : 1, "msg": res.msg, "count": res.data.total, "data": data }
        },

        changeTableData_month: function (res, controls) {
            var data = res.data.list || [];
            $(data).each(function (i, v) {
                for (var j in v) {
                    if (v[j] == 'null' || v[j] == null) v[j] = "";
                }
                v.controls = controls;
            });
            data.forEach(element => {
                for (let i = 1; i <= 12; i++) {
                    if (element.warehousingMonth[i] || element.warehousingMonth[i] === null) {
                        element[`m${i}`] = 1;
                    } else {
                        element[`m${i}`] = 0;
                    }
                }
            });
            return { "code": res.ret == 100 ? 0 : 1, "msg": res.msg, "count": res.data.total, "data": data }
        },

        /**
         * 渲染表格
         * @param {object} [opt] - 表格配置
         *      elem        表格节点ID选择器
         *      opt.id      表格选择器
         *      opt.url     请求数据接口
         *      opt.where   请求参数
         *      opt.done    表格渲染完成回调
         * @param {object} [eventes]   表格工具栏和表格行的监听Function集合
         *      events.toolbar         监听表格工具条事件
         *      events.tool            监听表格行事件
         */
        table: function (opt, events) {
            opt.elem = opt.elem.indexOf("#") == 0 ? opt.elem.replace(/#/, '') : opt.elem;
            // 默认配置
            let defaultsOpt = {
                even: true,
                page: { layout: ['count', 'prev', 'page', 'next', 'skip'], next: '下一页', prev: '上一页', groups: 10, limit: 10, theme: 'tb-page' },
                method: 'get',
                cellMinWidth: 120,
                parseData: typeof opt.parseData === 'function' ? opt.parseData : function (res) {
                    res = res || {};
                    if (Array.isArray(res.data)) {
                        for (var i = 0, len = res.data.length; i < len; i++) {
                            for (var j in res.data[i]) {
                                if (j == null) res.data[i][j] = '<span class="fc-red">无数据</span>'
                            }
                        }
                    }
                    return {
                        "code": res.ret == 100 ? 0 : 1,
                        "msg": res.msg,
                        "count": res.data == undefined ? 0 : res.data.total,
                        "data": res.data == undefined ? [] : res.data.list
                    }
                },
                request: { pageName: 'pageNum', limitName: "pageSize" },
                toolbar: opt.toolbar,
                defaultToolbar: ['filter'], // ['filter', 'export', 'import']
                text: { "none": '无数据' },
            }

            Object.assign(defaultsOpt, opt || {})

            defaultsOpt.elem = '#' + opt.elem;
            defaultsOpt.url = /^http/.test(opt.url) ? opt.url : api.getApi(opt.url);
            // 缓存请求地址
            let cacheRequest = null;
            // 缓存的tab属性
            let cacheThisTab = null;
            defaultsOpt.done = function (d) {
                $(window).resize(); // 触发resize定位table fixed: right块到正确位置
                // 第一次请求结果 tis-icon 展示
                const thisPage = layui.$('.layadmin-tabsbody-item.layui-show');
                const tabData = thisPage.find('.layui-tab .layui-this').data();
                const stringTabData = JSON.stringify(tabData || {})
                const selector = '.tis-icon';
                thisPage.find(selector).hide();
                if (!cacheRequest || cacheThisTab !== stringTabData) {
                    cacheThisTab = stringTabData;
                    cacheRequest = defaultsOpt.url;
                } else {
                    try {
                        if (d.data == '') {
                            thisPage.find(selector).show();
                        } else {
                            thisPage.find(selector).hide();
                        }
                    } catch {
                        //
                    }
                }
                opt.done && opt.done.call(this, ...arguments);
            }

            // 禁用异步数据，使用传入数据
            if ('object' === typeof defaultsOpt.data) {
                delete defaultsOpt.url
            }

            var t = table.render(defaultsOpt)
            if (events) {
                if (events.tool) {
                    table.on("tool(" + opt.elem + ")", function () {
                        for (var i in events.tool) {
                            if (i == arguments[0].event) {
                                events.tool[i](arguments[0], this)
                            }
                        }
                    })
                }
                if (events.toolbar) {
                    table.on("toolbar(" + opt.elem + ")", function () {
                        for (var i in events.toolbar) {
                            if (i == arguments[0].event) {
                                events.toolbar[i](arguments[0], this)
                            }
                        }
                    })
                }
            }
            return t;
        },

        /*
         * 渲染级联时间组件
         * 必须在模块中引用laydate
         * date-range
         * date-range-item
         * type: time, 只显示时分，不显示秒。默认选中时间为08:00:00
         */
        dateRange: function (opt) {
            var opt = opt || {};
            lay('.date-range .date-range-item').each(function () {
                $(this).attr("readonly", true);
                var that = this;
                var ele = $(this).parents('.date-range');
                var types = $(this).data().type,
                    unlimited = $(this).data('unlimited') === 1 ? !0 : !1, // 永久
                    btns = $(this).data().btns || (`clear,${unlimited ? "unlimited," : ""}now,confirm`);
                layui.laydate.render({
                    elem: this,
                    range: true,
                    trigger: 'click',
                    type: types == undefined ? 'date' : types,
                    btns: btns.split(","),
                    value: types === 'time' ? '08:00:00 - 08:00:00' : '',
                    done: opt.done || function (value, date, endDate) {
                        var start = date.year + '-' + api.markZero(date.month, 2) + "-" + api.markZero(date.date, 2);
                        var end = typeof endDate === 'string' ? endDate : (endDate.year) + '-' + api.markZero(endDate.month, 2) + '-' + api.markZero(endDate.date, 2);
                        if (types === 'month') {
                            start = date.year + '-' + api.markZero(date.month, 2);
                            end = typeof endDate === 'string' ? endDate : endDate.year + '-' + api.markZero(endDate.month, 2);
                        }
                        if (types === 'time' && value != '') {
                            start = value.split(' ')[0];
                            end = value.split(' ')[2];
                            var startDateTime = date.hours * 60 * 60 + date.minutes * 60 + date.seconds;
                            var endDateTime = typeof endDate === 'string' ? endDate : endDate.hours * 60 * 60 + endDate.minutes * 60 + endDate.seconds;
                            if (startDateTime > endDateTime && typeof endDate !== 'string') {
                                start = [start, end];
                                end = start[0];
                                start = start[1];
                            }
                        }
                        if (value == '') {
                            start = '';
                            end = ''
                        }
                        // if (end == "9999-12-31") end = "永久";
                        ele.find('input[name="' + that.dataset.start + '"]').val(start);
                        ele.find('input[name="' + that.dataset.end + '"]').val(end);
                    }
                })
            })
        },

        /* 分割线 遗弃方法，慎用 */
        /* ===================================================================================================== */

        /*
         * 动态分公司 动态部门
         * @param opt.view : 视图容器
         * @param opt.url: 接口地址
         * @prram opt.data: 请求参数
         */
        company: function (opt) {
            var that = this;
            form.on('select(province)', function () {
                opt.view.find('input[name="companyId"]').val("")
            })
            $(document).click(function (e) { $(".u-sel-tree-wrap.u-sel").removeClass("u-sel") });
            opt.view.find('.u-sel-tree').off('click').on('click', function (e) {
                e.stopPropagation();
                $(this).parent().toggleClass("u-sel");
            })
            $(".u-sel-tree-list").on("click", function (e) { e.stopPropagation(); })
            var view = opt.view;
            if (opt.data == undefined) {
                view.find(".u-sel-tree-list").html("<li class='pad-5 fc-grey'>没有选项</li>")
                return false;
            }
            ajax({
                url: "/structure/getOrganizationalStructureByCondition",
                data: opt.data,
                callback: function (res) {
                    view.find(".u-sel-tree-list").html("");
                    view.find('input[name="companyName"]').val('')
                    var data = JSON.stringify(res.data);
                    data = data.replace(/companyName/g, 'name');
                    data = data.replace(/childs/g, 'children');
                    data = JSON.parse(data);
                    if (data.childs == null && data.id == null) {
                        view.find(".u-sel-tree-list").html("<li class='pad-5 fc-grey'>没有选项</li>")
                        return false;
                    }
                    layui.tree({
                        elem: view.find(".u-sel-tree-list")[0],
                        nodes: [data],
                        click: function (node) {
                            view.find('.u-sel-tree-wrap').removeClass("u-sel");
                            view.find("input[name=companyName]").val(node.name);
                            view.find("input[name=companyId]").val(node.id);
                            view.find('select[name="positionName"]').html("");
                            view.find('select[name="groupId"]').html("");
                            view.find('select[name="teamId"]').html("");
                            if (opt.query) opt.query.companyId = node.id;
                            opt.callback && opt.callback(opt.query)
                            // 联动的下一级： 部门
                            if (view.find('select[name="departmentId"]').length == 1) {
                                that.select('/department/getDepartmentsByCondition', { "provinceCode": opt.data.provinceCode, "companyId": node.id }, 'select[name="departmentId"]', { id: 'id', name: "departmentName" })
                            } else if (view.find('select[name="sectorId"]').length == 1) {

                                view.find('select[name="sectorId"]').html("");
                                that.select('/department/getThisDepartmentsByCondition', { "companyId": node.id }, 'select[name="sectorId"]', { id: 'id', name: "departmentName" })
                            }
                        }
                    })
                }
            })
        },
        /* 分割线 遗弃 end */
        /* ===================================================================================================== */


        /*
         * 签名 (cid:画板id；ch：画板高；cw：画板宽; signUrl:存放签名图路径容器如#signUrl;c:清除签名的按钮id；s:上传签名的按钮id)
         */
        signName: function (cid, ch, cw, signUrl, c, s) {
            var that = this;
            var canvas = document.getElementById(cid);
            canvas.addEventListener('mousemove', onMouseMove, false);
            canvas.addEventListener('mousedown', onMouseDown, false);
            canvas.addEventListener('mouseup', onMouseUp, false);
            canvas.addEventListener('touchstart', onMouseDown, false);
            canvas.addEventListener('touchmove', onMouseMove, false);
            canvas.addEventListener('touchend', onMouseUp, false)
            canvas.height = ch;
            canvas.width = cw;
            var ctx = canvas.getContext('2d'),
                blankcanvas = canvas.toDataURL();
            ctx.lineWidth = 1.0; // 设置线宽
            ctx.strokeStyle = "#000"; // 设置线的颜色
            var flag = false;
            function onMouseMove(evt) {
                evt.preventDefault();
                if (flag) {
                    var p = pos(evt);
                    ctx.lineTo(p.x, p.y);
                    ctx.lineWidth = 1.0; // 设置线宽
                    ctx.shadowColor = "#000";
                    ctx.shadowBlur = 1;
                    //ctx.shadowOffsetX = 6;
                    ctx.stroke();
                }
            }
            function onMouseDown(evt) {
                evt.preventDefault();
                ctx.beginPath();
                var p = pos(evt);
                ctx.moveTo(p.x, p.y);
                flag = true;
            }
            function onMouseUp(evt) {
                evt.preventDefault();
                flag = false;
            }
            //上传签名
            var saveImage = document.getElementById(s);
            saveImage.addEventListener('click', function () {
                uploadImg();
            }, false);
            //图片上传操作,指定图片类型
            function uploadImg(type) {
                //设置保存图片的类型
                var imgdata = canvas.toDataURL(type);
                imgdata = imgdata.replace("data:image/png;base64,", "");
                imgdata = b64toBlob(imgdata, 'image/png');
                var form = new FormData();
                form.append("file1", imgdata);
                if (blankcanvas == canvas.toDataURL()) {
                    that.fail('请先签名后再上传！');
                } else {
                    $.ajax({
                        crossDomain: true,
                        url: layui.api.getUploadPath(),
                        type: "post",
                        data: form,
                        processData: false,
                        contentType: false,
                        success: function (data) {
                            that.msg('上传成功');
                            var saveUrl = data.files[0].saveUrl;
                            // $(signUrl).val(saveUrl);
                            var index = parent.layer.getFrameIndex(window.name);
                            //signUrl 没有传入新的就目前固定就这个
                            if (signUrl == '#signUrlforlibraryorder') {
                                window.parent.document.getElementById("signUrlforlibraryorder").value = saveUrl;
                            } else {
                                window.parent.document.getElementById("signUrl").value = saveUrl;
                            }
                            // 显示签名图，绑定按钮#signNew
                            try {
                                let btn_node = window.parent.document.getElementById('signNew');
                                let parent_node = btn_node.parentElement;
                                let img = parent_node.querySelector('img');
                                if (!img) img = new Image();
                                img.src = `${layui.api.resouce}${saveUrl}`
                                img.className = "j-preview-img";
                                parent_node.insertBefore(img, btn_node)
                            } catch {
                                // 
                            }
                            parent.layer.close(index);
                        }
                    });
                }
            }
            // 将图片转格式
            function b64toBlob(b64Data, contentType, sliceSize) {
                contentType = contentType || '';
                sliceSize = sliceSize || 512;
                var byteCharacters = atob(b64Data);
                var byteArrays = [];
                for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    var slice = byteCharacters.slice(offset, offset + sliceSize);
                    var byteNumbers = new Array(slice.length);
                    for (var i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }
                    var byteArray = new Uint8Array(byteNumbers);
                    byteArrays.push(byteArray);
                }
                var blob = new Blob(byteArrays, { type: contentType });
                return blob;
            }
            //清除签名
            var clear = document.getElementById(c);
            clear.addEventListener('click', function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                flag = false;
                $(signUrl).val('');
            }, false);
            function pos(event) {
                var x, y;
                if (isTouch(event)) {
                    x = event.touches[0].pageX;
                    y = event.touches[0].pageY;
                } else {
                    x = event.layerX;
                    y = event.layerY;
                }
                return { x: x, y: y };
            }
            function isTouch(event) {
                var type = event.type;
                if (type.indexOf('touch') >= 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        /**
         * 
         * @param {json} opt
         * @example
         *  <div class="layui-input-block j-fuzzy-select"></div>
         *  renders.fuzzySearchSelect(options)
         */
        fuzzySearchSelect: function (opt) {
            const {
                el = opt.el || ".j-fuzzy-select",       // 必填，绑定的容器对象
                view = $("body"),             // 容器                
                query = {},                   // 请求参数
                url = '/customer/getDealCustomerInformation', // 请求接口 
                name,                       // input name
                callback,                    // 选择后的回调   
                ajaxtype,                    // 发送请求类型   
                queryname,                    // 请求名称   
                urlname,                    // 字段名称   
            } = opt;

            const elem = view.find(el)
            const input = document.createElement("input")

            // init
            let data = [];
            const dl = document.createElement("dl")
            name && input.setAttribute("name", name);
            elem.addClass("layui-form-select")
            input.className = "layui-input";
            input.style = "padding-right: 0";
            input.autocomplete = 'off';
            dl.className = 'layui-anim layui-anim-upbit'
            elem.append(input)
            elem.append(dl)

            $(input).on('input', function () {
                const value = this.value;
                if (!value) return;
                queryname ? query[queryname] = this.value : query.customerName = this.value;
                data = [];
                ajax({
                    url,
                    data: query,
                    traditional: true,
                    type: ajaxtype || 'POST',
                    callback: function (res) {
                        const {
                            dataList
                        } = res;
                        data = dataList;
                        const dl_list = dataList.map(
                            (item, index) => `<dd data-val="${item.id}" data-index="${index}">${urlname ? item[urlname] : item.customerName}</dd>`
                        )
                        dl.innerHTML = dl_list.join("")
                        elem.addClass("layui-form-selected")
                    }
                })
            })
            $(input).on('blur', function () {
                this.value = '';
            })

            $(dl).on("click", 'dd', function () {
                input.value = this.innerText
                elem.removeClass("layui-form-selected")
                callback && callback(data[this.dataset.index])
                data = [];
            })
        },

        /**
         * 模糊搜索（委托）
         * @param {*} options 
         * <input type="text" class="layui-input j-fuzzy-input">
         * 注意: 清空重制需要额外处理
         */
        fuzzysSearch: function (options) {
            const defaultsOptions = {
                scope: 'body',   // 委托容器
                selector: '.j-fuzzy-input', // 触发input框
                url: '/customer/getDealCustomerInformation', // 请求接口
                key: 'customerName',
                getType: 'POST',
                itemKey: {
                    id: 'id',
                    name: 'customerName'
                },
                hideSerachList: false, // 隐藏搜索结果列表
                success: function () { }, // 请求成功回调
            }
            options = { ...defaultsOptions, ...options }
            const {
                scope,
                selector,
                url
            } = options;
            // const unKeyCode = [8]
            let thisSelector;
            $(scope).addClass("show-visiable")
            !options.hideSerachList && $(scope).on("click", selector, function (e) {
                thisSelector = $(this);
                if (thisSelector.hasClass('fuzzy-select-this')) return false;
                $(`${scope} .fuzzy-select-this`).removeClass('fuzzy-select-this')
                thisSelector.addClass('fuzzy-select-this')
                if (!thisSelector.data('cache')) thisSelector.data('cache', $(this).val());
                const cur = $(e.currentTarget);
                if (cur.next('ul').length > 0) return;
                const select = document.createElement("ul");
                select.className = "z-fuzzy-input-wrap"
                cur.parent().append(select)
                $(select).on('click', '.j-fuzzy-item', function (e) {
                    const name = $(this).data('name');
                    const id = $(this).data('id');
                    (typeof options.callback === 'function') && options.callback(name, id, thisSelector);
                    thisSelector.val(name)
                    thisSelector.prev().val(id)
                    thisSelector.data('cache', name)
                    select.innerHTML = ""
                })
            })
            $(scope).on("keyup", selector, function (e) {
                const keyCode = e.keyCode;
                // if(unKeyCode.includes(keyCode)) return;
                const tar = e.target;
                const cur = $(e.currentTarget)
                const data = {
                    [options.key]: cur.val()
                }
                ajax({
                    url: url,
                    data: data,
                    traditional: true,
                    type: options.getType,
                    callback: function (res) {
                        const dataList = res.dataList || [];
                        const ul = cur.next('ul')
                        if (ul) {
                            let html = dataList.map(
                                item => (
                                    `<li class="z-fuzzy-sel-item j-fuzzy-item" data-id="${item[options.itemKey.id]}" data-name=${item[options.itemKey.name]}>${item[options.itemKey.name]}</li>`
                                )
                            )
                            ul.html(html.join(''))
                            try {
                                const { x, y, width } = tar.getBoundingClientRect();
                                ul.attr('style', `left: ${x}px; top: ${y + 38}px; width: ${width}px`)
                            } catch {

                            }
                            ul.show()
                        }
                        (typeof options.success === 'function') && options.success(res)
                    }
                })
            })
        },

        /*
         * //模糊搜索 searchInp:容器
         * url:接口
         * urlName:字段名
         * urlId：字段id
         * nofocus:触发搜索
         * key:参数名
         * callback:返回参数
         * ajaxtype:发送方式
         * <input type = "hidden" id = "searchHid">
         * <ul class="searchUl" id="searchUl"></ul>
         * obj：自定义参数 {searchHid,searchUl}
         */
        fuzzySearch: function (searchInp, url, urlName, urlId, nofocus, key, callback, ajaxtype, obj) {
            let searchUlID, searchHid, searchUl;
            let timer;
            const DELAY = 300;
            const ishideRequired = document.querySelector(searchInp)?.getAttribute('lay-verify') === 'hideRequired';
            $("html").bind("click", function (e) {
                searchUlID = obj ? obj.searchUl : 'searchUl';
                searchHid = obj ? $('#' + obj.searchHid) : $("#searchHid");
                searchUl = obj ? $('#' + obj.searchUl) : $("#searchUl");
                var id = $(e.target).attr('id');
                
                // 不清楚输入内容, 校验的是下一个标签的值
                if (ishideRequired) {
                    if (id != searchUlID && id != searchInp.slice(1)) {
                        searchUl.hide();
                        if ($.trim($(searchInp).val()) != $.trim(searchHid.val())) {//只能选择列表数据 不能自己输入
                            $(searchInp).attr('data-id', '');
                            searchHid.val('');
                        }
                    } else {
                        const tar = e.target;
                        if (ishideRequired) {
                            const value = e.target.value;
                            clearTimeout(timer);
                            if (value.length>0) {
                                timer = setTimeout( () => {
                                    getData(value);
                                }, DELAY)
                            }
                            return false;
                        }
                    }
                } else {
                    if (id != searchUlID && id != searchInp.slice(1)) {
                        searchUl.hide();
                        if ($.trim($(searchInp).val()) != $.trim(searchHid.val())) {//只能选择列表数据 不能自己输入
                            $(searchInp).attr('data-id', '');
                            $(searchInp).val('');
                            searchHid.val('');
                        }
                    } else if (id == searchInp.slice(1)) {
                        getData($(this).val());
                    }
                }
            });
            $(searchInp).keyup(function () {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    getData($(this).val());
                }, DELAY)
            });
            function getData(name) {
                searchUl = obj ? $('#' + obj.searchUl) : $("#searchUl");
                searchHid = obj ? $('#' + obj.searchHid) : $("#searchHid");
                if (nofocus) if (!name) return;
                searchUl.show();
                var data = {};
                data[key] = name;
                ajax({
                    url: url,
                    data: data,
                    traditional: true,
                    type: ajaxtype || 'POST',
                    callback: function (res) {
                        var html = "";
                        $(res.dataList).each(function (i, v) {
                            html += '<li data-id="' + v[urlId] + '">' + v[urlName] + '</li>';
                        });
                        searchUl.html(html);
                        searchUl.find('li').on('click', function () {
                            $(searchInp).attr('data-id', $(this).data('id'));
                            var val = $.trim($(this).html()).replace(/&nbsp;|([.\n\r]+)/g, '');
                            $(searchInp).val(val);
                            searchHid.val(val);
                            searchUl.hide();
                            if (callback) callback($(this).data('id'));
                        });
                    }
                })
            }
        },

        
        /*
         * 人员选择 t:$('选择器')
         */
        choosePerson: function (t, func, roleid, customerid,) {
            $("body").css('overflow-y', 'hidden');
            var that = this;
            this.con({ // this.con => renders.con
                title: '人员选择',
                // content: parent.layui.setter.base + 'views/component/personnel.html?count=1&r=' + roleid + '&c=' + customerid,
                content: parent.layui.setter.base + 'views/component/personnel.html?count=1',
                area: ['638px', '690px'],
                offset: "auto",
                btn: ['确定', '清除', '取消'],
                shadeClose: 1,
                btnAlign: 'c',
                yes: function (index, dom) {
                    var selectData = top.layer.getChildFrame('#select2>div', index);
                    const selectLable = $(selectData).data('label');
                    const selectValue = $(selectData).data('value');
                    t.val(selectLable);
                    t.attr('data-id', selectValue);
                    if (selectValue) t.siblings().val(selectValue);
                    else t.siblings().val('');
                    // if (!layer.getChildFrame('#select2', index).text()) {
                    //     t.val('');
                    //     $(t).siblings().val('');
                    // } else if (!layer.getChildFrame('#select2', index).val() || layer.getChildFrame('#select2', index).val().length > 1) {
                    //     that.fail('只能选择一个用户！');
                    //     t.val('');
                    //     $(t).siblings().val('');
                    // } else {
                    //     t.val(layer.getChildFrame('#select2', index).text());
                    //     $(t).siblings().val(Number(layer.getChildFrame('#select2', index).val()));
                    // }

                    //加个记账分配的回调方法
                    if ($.isFunction(func)) {
                        func();
                    }

                    $("body").css('overflow-y', 'auto');
                    top.layer.close(index);
                },
                btn2: function (index) {
                    top.layer.getChildFrame("#select2", index).html("");
                    return false;
                },
                cancel: function () {
                    $("body").css('overflow-y', 'auto');

                },
                end: function () {
                    $("body").css('overflow-y', 'auto');
                }
            });
        },
        /**
         * 将td标签中的type=text且为disabled转化为div标签，实现容器的自动撑高、文本换行
         * @param {*} selector 区域选择器
         */
        transformInpToDiv: function (selector) {
            $(selector).find('td input:disabled').each(function (t) {
                const tar = $(this);
                if (tar.attr('type') === 'text') {
                    tar.attr('type', 'hidden');
                    tar.after(`
                        <div class="inp-disabled-block">${tar.val()}</div>
                    `)
                }
            })
        },

        /**
         * 
         * @param {*} opt 
         * @param {opt} opt.elem selector: jin-btn-upload 节点上属性 data-accept 等效于 opt.accpet 
         * @param opt.type small - 小的上传图片按钮风格
         * @param opt.nums 文件数量 default: 5
         * @param opt.wid 上传图宽
         * @param opt.hei 上传图高
         * @param opt.rate 是否按比例
         * @param opt.wid1 第二种规格图宽
         * @param opt.hei1 第二种规格图高
         * @param {*} uplaodConfig 原upFile2_ 第二个传入参数
         * @returns {Upload|UploadList} layui.upload实例/实例列表
         */
        upload: function (opt = {}, uplaodConfig) {
            function getOpt(node) {
                let accept = node.dataset.accept || 'file';
                let acceptMime = accept === 'images' ? 'image/*' : 'file';
                if (opt.type === "small") {
                    accept = 'images';
                    acceptMime = 'image/*';
                }
                return {
                    elem: node,
                    url: layui.api.getUploadPath(),
                    auto: false,
                    accept: accept,
                    acceptMime: acceptMime,
                    choose: function (obj) {
                        //将每次选择的文件追加到文件队列
                        var files = obj.pushFile();
                        let isMaxFile = false;
                        const max_nums = opt.nums || 5;
                        const nums = $(node).nextAll('.upload-pre-file, .upload-info-pre-file').length;
                        if ((Object.keys(files).length + nums > max_nums) || (nums >= max_nums)) {
                            layer.msg(`文件数量不能超出${max_nums}个`, { time: 1200 })
                            isMaxFile = true;
                        }
                        const t = this;
                        obj.preview(function (index, file, result) {
                            if (isMaxFile) {
                                delete files[index];
                                return false;
                            }
                            // console.log(index); //得到文件索引
                            // console.log(file); //得到文件对象
                            // console.log(result); //得到文件base64编码，比如图片
                            if (file.size > MAXFILESIZE) {
                                layer.msg("请上传小于2M的附件！");
                                $(opt.elem).show();
                                return;
                            }
                            if (opt.wid) {
                                var img = new Image();
                                img.src = result;
                                img.onload = function () {
                                    var naturalWidth = img.naturalWidth,
                                        naturalHeight = img.naturalHeight;
                                    if (opt.wid) {//有尺寸的
                                        if (opt.rate) {//按比例的规格图
                                            if ((opt.wid * naturalHeight) != (opt.hei * naturalWidth)) {
                                                layer.msg("上传附件尺寸不符合！")
                                                $(opt.elem).show();
                                                return;
                                            }
                                        } else if (!opt.wid1) {//不同规格固定尺寸的
                                            if (opt.wid != naturalWidth || opt.hei != naturalHeight) {
                                                layer.msg("上传附件尺寸不符合！")
                                                $(opt.elem).show();
                                                return;
                                            }
                                        } else {//仅一种规格固定尺寸的
                                            if (!((opt.wid == naturalWidth && opt.hei == naturalHeight) || (opt.wid1 == naturalWidth && opt.hei1 == naturalHeight))) {
                                                layer.msg("上传附件尺寸不符合！")
                                                $(opt.elem).show();
                                                return;
                                            }
                                        }
                                    }
                                    that.data.file1 = file;
                                    obj.upload(index, file);
                                    delete files[index]
                                }
                                return false;
                            }

                            t.data.file1 = file;
                            obj.upload(index, file)
                            delete files[index]
                        })
                    },
                    done: function ({ ret, files }) {
                        if (ret === 100) {
                            files.forEach(
                                ({ format, orgName, saveUrl, visitUrl }) => {
                                    let itemHTML = layui.renders.getUploadPreNode(saveUrl);
                                    if (opt.type === 'small') {
                                        itemHTML = layui.renders.getUploadSmallPreNode(saveUrl);
                                    }
                                    $(node).after(itemHTML)
                                    //隐藏上传按钮
                                    if (opt.nums == $(node).nextAll('.upload-pre-file, .upload-info-pre-file').length && opt.autohideshow) {
                                        $(node).hide();
                                    }
                                    if (opt.callback && typeof opt.callback === 'function') {
                                        opt.callback(saveUrl)
                                    }
                                }
                            )
                        }
                    },
                    error: function (err) {
                        console.error(err)
                    },
                    ...opt,
                }
            }
            const nodes = $(opt.elem || '.jin-btn-upload');
            if (typeof uplaodConfig === 'object') {
                const newOpt = {
                    ...uplaodConfig.config,
                    ...getOpt()
                }
                return layui.upload.render(getOpt(newOpt))
            }
            let example = [];
            nodes.each(function (index, n) {
                example.push(layui.upload.render(getOpt(n)))
            })
            return nodes.length <= 1 ? example[0] : example;
        },


    })
})
