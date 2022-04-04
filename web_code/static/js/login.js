layui.config({
  base: "/layui/lay/modules/"
}).use(['request', 'form'], function () {
  var $ = layui.jquery,
      form = layui.form,
      request = layui.request;

  var isPost = false; //　请求状态

  form.render()
  form.on('submit()', function(data){
    if(isPost) return;
    isPost = !0;
    request.login(data.field, function(){
      isPost = !1;
    })
    return false;
  })
})