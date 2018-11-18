function jump() {
	window.location.href=("createAPI.html");
}
var totalCount;
var dataLIst = [];
var projectId;
function get() {
    projectId = sessionStorage.getItem('p');
    sessionStorage.setItem('p', projectId);
    window.location.href='createAPI.html';
}
var url,method,interfaceName,json,interfaceId;
function ajax(){
    var h3 = document.getElementById('mingcheng');
    var span3 = document.getElementById('text_info');
    projectId = sessionStorage.getItem('p');
    var projetName = sessionStorage.getItem('N');
    var description = sessionStorage.getItem('d');
    var mingcheng = document.getElementById('mingcheng');
    var text_info = document.getElementById('text_info');
    mingcheng.innerHTML="项目名称："+projetName;
    text_info.innerHTML="项目描述："+description;

    console.log(projectId,description,projetName);
    $.ajax({
        type:"get",
        dataType:"json",
        url:'http://125.81.59.65:8081/ApiManagementSystem/interface/projectInterface',
        data:{
            "projectId":projectId,
        },
        success:function(result){
            var backdata = result.data;
            var len = backdata.length;
            if(result.status == 200){
                if (len==0) {
                     document.getElementById('biuuu_city_list').innerHTML="暂时没有项目接口，请创建".fontcolor("#666");
                }
                else{
                    lay(backdata);
                    h3.innerHTML="项目名称："+projetName;
                    span3.innerHTML="项目描述："+description;
                }
               
            }
        },
        error:function(result){
            alert("页面错误");
        },
    })
}
function lay(backdata){

    layui.use(['laypage', 'layer'], function(){
    var laypage = layui.laypage
    ,layer = layui.layer;
    laypage.render({
    elem: 'demo20'
    ,count: backdata.length
    ,limit: 10
    ,limits: [10]
    ,layout: ['count', 'prev', 'page', 'next', 'skip']
    ,jump: function(obj){
      //模拟渲染
      document.getElementById('biuuu_city_list').innerHTML = function(){
         var arr = []
        ,thisData = backdata.concat().splice(obj.curr*obj.limit - obj.limit, obj.limit);
        arr.push(' <table class="table table-striped table-bordered templatemo-user-table" style="margin-left: 0;">');
        arr.push(' <thead><tr><th style="text-align:center;">序号</th><th style="text-align:center;">接口名称</th><th style="text-align:center;">方法</th><th style="text-align:center;">url</th><th style="text-align:center;">操作</th></tr></thead><tbody>');
        layui.each(thisData, function(index, item1){
        var interfaceId = item1.interfaceId;
        var url = item1.url;
                arr.push('<tr>');
                arr.push('<td>' + interfaceId+ '</td>');
                arr.push('<td>' + item1.interfaceName+ '</td>');
                arr.push('<td>' + item1.method+ '</td>');
                arr.push('<td>');
                arr.push('<a href="javascript:void(0)" style="color:#0090FF;" onclick=json('+'"'+url+'"'+')>'+url+'</a>');
                arr.push('</td>');
                // arr.push('<td><a href="project_details_init.html?id='+item1+'" class="templatemo-edit-btn">详情</a></td>');
                arr.push('<td><button class="templatemo-edit-btn" onclick=jump2(' +interfaceId + ')>查看' +
                    '</button> <button class="templatemo-edit-btn" onclick=del_shop(' + interfaceId + ',"2")>删除</button></td>');
             
        });
        arr.push('</tr>');
        arr.push('</tbody></table>');
        return arr.join('');
      }();
    }
  });
  
});
}
function del_shop(interfaceId){//删除商品
    console.log(interfaceId)
    $.ajax({
        type:"delete",
        dataType:"json",
        url:"http://125.81.59.65:8081/ApiManagementSystem/interface/"+interfaceId,
        success:function(result){
            var backdata = result.data
            if(result.status==200){
                location.reload(true);
            }
        },
        error:function(result){
            alert("页面错误");
        },
    })
}
function json(url){
    sessionStorage.setItem("url",url);
    // sessionStorage.setItem("json",json1);
    window.location.href="arp.html";

}
function jump2(interfaceId){
    sessionStorage.setItem('interfaceId', interfaceId);
    // console.log(interfaceId);
    window.location.href="changeAPI.html";


}