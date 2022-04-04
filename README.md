# 云智能管理平台

安装项目依赖  
`$ npm install`  
运行项目  
`$ npm start`  

## 编译指令

> `npm run start` 在本地运行项目
> `npm run build:test` 编译测试环境包  
> `npm run build:test:cd` 编译测试环境包并发布到测试环境  
> `npm run build` ⚠️ 编译正式环境包，指令会打包成正式的接口！！！  

## 本地运行 `npm run start`

* 项目目录 `dist` 为本地运行产生的临时目录
* 打开页面 localhost:3000
* 热更新
* 文件转译
  * js 编译输出 es5 ，转译的js为严格模式;
  * css 不执行监听。这可能回和vscode上的插件出现冲突，请使用less编辑样式


## 一些规范参考

* 执行`gulp build` 后git 变化文件数量不正常增多，执行 `npm install --save-dev gulp-uglify`
* 新增模块文件访问404，重新运行`$ npm run start`
* Layui导出表格中的数值在表格转化为科学计数。处理：在数值前添加`'`
* 权限里没有排序字段，添加到数据库时需要注意添加顺序。
* 约定以p开头的是弹出窗口内的权限。
* 最小屏幕适应800*600
* *Function* `api.splitTimeDate`，对于`9999-12-31`返回文本`永久`
* *Function* `renders.msg`、`renders.fail`、`renders.con` 的弹层均位于top文档对象
* *调整* `layui.table.exportFile` String类型的值中的`,`处理为`，`
* *扩展* 表头参数`disableField`<function|string>，禁用当前为 `type: checkbox` 类型列的 checkbox
* *规范* 弹层大小约定为 `['680px', 'auto']`， 1200px屏幕下宽度固定为`76%`, 弹层最大宽度不超过1200px
* *Function* ⚠️ `renders.con` 默认不开启最小/最大化按钮，最大化存在问题待修复。
* *echarts* 项目引用的是echarts@4.2.1

### layui.date

设置为月份范围，出现能选中的月份提交确定时提示超出范围。  
处理：传入的min、max的时间day必须取最小、最大值。

```js
  layui.laydate.render({
      elem: $("#laydate-elem")[0],
      range: true,
      trigger: 'click',
      type: 'month',
      min: '2020-01-01',  // 最小天数值，00 表示为上一个月最后一天，会开启多余的月份
      max: '2020-02-31',  // 最大天数值
      done: function (val, start, end) {

      }
  })
```

### disableField

```javascript
  // field
  cols: [
    { type: 'checkbox', disableField: 'isDisable' }
  ]
  // function
  cols: [
    { type: 'checkbox', disableField: function(d){
      // d 列数据
      // return true 禁用
      return true
    } }
  ]
```

---

## 模板

* html文件中引入`@@include('./app/views/template/polyfill.html')`
* 模板文件路径 `web_code/views/template`

## 表格 renders.table

操作行统一用fixed固定在最右边

```js
renders.table({
  cellMinWidth: 120,
  ...
})
col中约定宽的字段 其他没特殊要求按默认来 
  编号 width:120 fixed: 'left'
  客户名称 minWidth:200,
  地址 minWidth:180,
```

## CHANGELOG

`2021-11-24`

* 🚮 `renders` 中的 `upFile` `upFile_` `upFile_2`
* 🔧 新增附件上传方法 `renders.upload`
* 🔧 新增全局事件：在节点上 `.j-preview-img` 触发预览大图

`2021-12-30`

* Layui from 提交返回参数过滤了在 `.auth-form-wrap .layui-md-*[display='none']`下表单标签的值

`2022-01-04`

* authForm 扩展按钮: 提交按钮、重置按钮
