; layui.define(['form'], function (exports) {
    var form = layui.form;

    var reg = {
        // 银行账户
        appBankAccount: function (val) {
            if (!/^[0-9]{12,20}$/.test(val)) {
                return '账号格式为12-20位数字'
            }
        },

        // 银行账户可能更多位数
        appBankAccountMore: function (val) {
            if (!/^[0-9]{1,30}$/.test(val)) {
                return '账号格式为1-30位数字'
            }
        },

        // 开户银行
        appBankName: function (val) {
            if (!/^[\u4e00-\u9fa5]{4,25}$/.test(val)) {
                return '请输入4-25位的汉字'
            }
        },

        // 1到15个汉字
        onetoOneFive: function (val) {
            if (!/^[\u4e00-\u9fa5]{1,15}$/.test(val)) {
                return 1;
            }
        },

        pass: function (val) {
            if (val.length < 6 && val != '' && val.length <= 32) {
                return '密码格式错误';
            }
        },
        emails: function (value) {
            if (!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value) && value != '') {
                return '邮箱格式不正确'
            }
        },
        tel: function (value) {
            if (!/^1\d{10}$/.test(value)) {
                return '手机格式不正确'
            }
        },
        /* 手机号码验证,非必填 */
        isTel: function (val) {
            if (!/^1\d{10}$/.test(val) && val != '') {
                return '手机格式不正确'
            }
        },
        mobile: function (value) {
            if (!/^1\d{10}$/.test(value)) {
                return false;
            }
            return true
        },
        // 金额
        money: function (value) {
            if (!/^(([0-9]*)|(([0]\.\d*|[0-9]*\.\d*)))$/.test(value)) {
                return '请输入正确的金额'
            }
        },
        // 身份证，可以为空
        // 大陆 18位数字或17位数字+(x|X)
        // 台湾 8位或18位数字（新）、10位含字母（旧）
        // 澳门 8位（1或2个英文字母及6个数字组成）
        // 香港 8位（1或2个英文字母及6个数字组成）
        // 港澳通行证 (H|M|h|m)开头和8或10位数字
        // 台湾 8位数字
        // 12位数字 ？？？ 
        // 护照
        idCard: function (val) {
            if (!/(^1[45][0-9]{7}$)|([P|p|S|s]\d{7}$)|([S|s|G|g]\d{8}$)|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8}$)|(^[HMhm]{1}([0-9]{10}|[0-9]{8})$)|(^[0-9]{8}$)|(^[0-9]{12}$)|(^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$)|(^((\s?[A-Za-z])|([A-Za-z]{2}))\d{6}(\([0−9aA]\)|[0-9aA])$)|(^[a-zA-Z][0-9]{9}$)|(^[1|5|7][0-9]{6}\([0-9Aa]\))/.test(val) && val != '') {
                return '请输入正确的证件号码'
            }
        },
        // 验证身份证返回出生日期
        idCrads: function (value) {
            if (/(^\d{15}$)|(^\d{17}([0-9]|X|x)$)|^\d{8}|^[a-zA-Z0-9]{10}|(^([A-Z]\d{6,10}(\w{1})?)$)/.test(value)) {
                return this.getbirthDate(value)
            } else return false;
        },
        getbirthDate: function getBirthdatByIdNo(iIdNo) {
            var tmpStr = "";
            var strReturn = "";
            if (iIdNo.length == 15) {
                tmpStr = iIdNo.substring(6, 12);
                tmpStr = "19" + tmpStr;
                tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
                return tmpStr;
            } else {
                tmpStr = iIdNo.substring(6, 14);
                tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
                return tmpStr;
            }
        },
        /* 
         * 数值金额转大写金额
         * 最大数值为 万亿（16位数字）
        */
        converAmount: function (num) {
            if (num == null || num == '') return '';
            var strOutput = "";
            var strUnit = '万仟佰拾亿仟佰拾万仟佰拾元角分';
            num += "00";
            var intPos = num.indexOf('.');
            if (intPos >= 0)
                num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
            strUnit = strUnit.substr(strUnit.length - num.length);
            for (var i = 0; i < num.length; i++)
                strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
            return strOutput.replace(/零角零分$/, '').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
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
        //验证汉字字数
        DataLength: function (fData) {
            var intLength = 0
            if (!fData) return;
            for (var i = 0; i < fData.length; i++) {
                if ((fData.charCodeAt(i) < 0) || (fData.charCodeAt(i) > 255))
                    // intLength=intLength+2 
                    intLength = intLength + 1
                else
                    intLength = intLength + 1
            }
            return intLength;
        },
        /* 
         * 浮点数据
        */
        converFloat: function (s) {
            return s.replace(/[^\-?\d.]/g, '')
        },
        /* 
         * 大于(等于)零的整数  /  eq == 1 ?  不包含零 : 包含零
        */
        testInteger: function (num, eq ,min,max) {
            if(min && max){
                if (isNaN(num) || Number(num) < min || String(num).indexOf('.') != -1 || Number(num) > max) {
                    return 0;
                } else {
                    return 1;
                }
            }else if (eq == 1) {
                if (isNaN(num) || Number(num) <= 0 || String(num).indexOf('.') != -1) {
                    return 0;
                } else {
                    return 1;
                }
            } else {
                if (isNaN(num) || Number(num) < 0 || String(num).indexOf('.') != -1) {
                    return 0;
                } else {
                    return 1;
                }
            }
        },
        /* 
         * >=999 <=1 的整数
        */
        test1to999: function (num) {
            if (isNaN(num) || Number(num) < 1 || Number(num) > 999 || String(num).indexOf('.') != -1) {
                return 0;
            } else {
                return 1;
            }
        },
        /* 
        * 大写字母(仅限一位)
       */
        testAZ: function (val) {
            if (/^[A-Z]{1}$/g.test(val)) {
                return 1;
            } else {
                return 0;
            }
        },
        /* 
         * 大于等于零的数
        */
        testNum: function (num) {
            if (isNaN(num) || Number(num) < 0 || num.indexOf('-') != -1) {
                return 0;
            } else {
                return 1;
            }
        },
        /* 
         * 不连着一样的数字
        */
        notTheSame: function (num) {
            if ((/^(\d)\1+$/.test(num))) {
                return 1;
            } else {
                return 0;
            }
        },
        /* 
         * 正负正数，正负小数
        */
        isAllNum: function (val) {
            if ((/(^[\-0-9][0-9]*(.[0-9]+)?)$/.test(val))) {
                return 1;
            } else {
                return 0;
            }
        },
        /* 
         * 数字
        */
        isNumber: function (val) {
            if (!(/^\+?[1-9][0-9]*$/.test(val)) && val !== '') {
                return '只能输入数字'
            }
        },

        isNums(val, node){
            if (!(/^\d+?$/.test(val)) && val !== '') return '仅允许输入数字';
            const max = node.getAttribute('max');
            const min = node.getAttribute('min');
            let isOK = true;
            if (val === '') return false;
            if (max !== null && min !== null ) {
                if (Number(max) < Number(val) || Number(min) > Number(val)) isOK = false;
            } else if (max !== null) {
                if (Number(max) < Number(val)) isOK = false;
            } else if (min !== null) {
                if (Number(min) > Number(val)) isOK = false;
            } 
            if (!isOK) return `请输入 ${min} 到 ${max} 之间的值`
        },
        
        isCN(val, node) {
            if (!(/^[\u4e00-\u9fa5]+?$/.test(val)) && val !== '' ) return '仅允许输入中文'
            const max = node.getAttribute('max');
            const min = node.getAttribute('min');
            let isOK = true;
            if (val === '') return false;
            if (max !== null && min !== null ) {
                if (Number(max) < Number(val) || Number(min) > Number(val)) isOK = false;
            } else if (max !== null) {
                if (Number(max) < Number(val)) isOK = false;
            } else if (min !== null) {
                if (Number(min) > Number(val)) isOK = false;
            } 
            if (!isOK) return `请输入 ${min} 到 ${max} 之间的中文`
        },

        receivables: function(val){
            val = !val? '': val;
            if((!(/^(-)?\d+(\.\d{0,2})?$/.test(val)) || Number(val)>=10000000000) && val!=='' ){
                return '请输入1-10位有效金额'
            }
        },
        otherReq: function(value,item){
            var $ = layui.$;
            var verifyName=$(item).attr('name')
            , verifyType=$(item).attr('type')
            , msg=$(item).data('msg')
            ,formElem=$(item).parents('.layui-form')//获取当前所在的form元素，如果存在的话
            ,verifyElem=formElem.find('input[name='+verifyName+']')//获取需要校验的元素
            ,isTrue= verifyElem.is(':checked')//是否命中校验
            ,focusElem = verifyElem.next().find('i.layui-icon');//焦点元素
            if(!isTrue || !value){
                //定位焦点
                focusElem.css(verifyType=='radio'?{"color":"#FF5722"}:{"border-color":"#FF5722"});
                //对非输入框设置焦点
                focusElem.first().attr("tabIndex","").css("outline","").blur(function() {
                    focusElem.css(verifyType=='radio'?{"color":""}:{"border-color":""});
                }).focus();
                return msg;
            }
        },
        businessVeri: function(val) {
            if (!val) return "业务类型不能为空";
        },
        // 口号
        slogan: function(val){
            if( val?.length > 50) return '口号长度不能超过50个字'
        },
        // 时间：由数字 、/、. 、-
        datestr: function(val){
            if(val.length>20) return '长度不能超过20个字！'
            if(!/^[0-9\/\.-]+$/g.test(val) && val.length>0 ) return '请输入由数字和、/、. 、-组成的时间';
        },
        // 最大长度
        strlen: function(val, el){
            const max = el.dataset.max;
            const msg = el.dataset.msg;
            val = val.trim()
            if( val.length > max ) return msg || `长度不能超过${max}个字！`
        },
        // 联系方式固定电话+手机号码
        contacts: function(val){
            if (!/(^1\d{10}$)|(^0[\d]{2,3}(-?)[\d]{7,8})$/.test(val)) return '请输入正确的联系方式';
        },
        hideRequired: function(val, inp){
            const value = layui.$(inp).next('input').val();
            if (!value) return '请选择有效的选项';
        }
    };

    exports('verifys', reg);
});
