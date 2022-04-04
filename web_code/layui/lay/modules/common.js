layui.define(['jquery'],function (exports) {
  var $ = layui.jquery;
  exports('common', {
    "getContractData": function(start, end){
      return(new Date(end).getFullYear() - new Date(start).getFullYear())
    },
    "getContractEnd": function(start, year){
      console.log(start)
      var time = start.split('-');
      time[0] = parseInt(time[0]) + year;
      return time.join('-')
    }
  });
});