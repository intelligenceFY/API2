function show(popupdiv){
var Idiv=document.getElementById('popupdiv');
Idiv.style.display="block";
//以下部分要将弹出层居中显示
Idiv.style.left=(document.documentElement.clientWidth-Idiv.clientWidth)/2+document.documentElement.scrollLeft+"px";
Idiv.style.top=(document.documentElement.clientHeight-Idiv.clientHeight)/2+document.documentElement.scrollTop+"px";
//以下部分使整个页面至灰不可点击
var procbg = document.createElement("div"); //首先创建一个div
procbg.setAttribute("id","mybg"); //定义该div的id
procbg.style.background = "#000000";
procbg.style.width = "100%";
procbg.style.height = "100%";
procbg.style.position = "fixed";
procbg.style.top = "0";
procbg.style.left = "0";
procbg.style.zIndex = "500";
procbg.style.opacity = "0.6";
procbg.style.filter = "Alpha(opacity=70)";

document.body.appendChild(procbg);
document.body.style.overflow = "hidden"; //取消滚动条
//以下部分实现弹出层的拖拽效果
var posX;
var posY;
Idiv.onmousedown=function(e)//当鼠标指针移动到元素上方，并按下鼠标按键时，会发生 mousedown 事件。与 click 事件不同，mousedown 事件仅需要按键被按下，而不需要松开即可发生。mousedown() 方法触发 mousedown 事件，或规定当发生 mousedown 事件时运行的函数。
{
if(!e) e = window.event; //IE
posX = e.clientX - parseInt(Idiv.style.left);
posY = e.clientY - parseInt(Idiv.style.top);
document.onmousemove = mousemove;//鼠标移动时的函数
}
document.onmouseup = function(){
document.onmousemove = null;//释放鼠标时清除mousemove
}
function mousemove(ev)
{
if(ev==null) ev = window.event;//IE
Idiv.style.left = (ev.clientX - posX) + "px";
Idiv.style.top = (ev.clientY - posY) + "px";
}
mybg.onclick = function closeDiv(){
    var Idiv=document.getElementById('popupdiv');
    Idiv.style.display="none";    
    document.body.style.overflow = "auto";
    var body = document.getElementsByTagName("body");
    body[0].removeChild(mybg);
    }
}
function closeDiv(popupdiv) //关闭弹出层
{
var Idiv=document.getElementById(popupdiv);
Idiv.style.display="none";
document.body.style.overflow = "auto"; //恢复页面滚动条
var body = document.getElementsByTagName("body");
var mybg = document.getElementById("mybg");
body[0].removeChild(mybg);
}
// debugger;
function checkall(){
    // var name2 = document.getElementById("name2").value;
    var name3 = document.getElementById("name3").value;
    var name4 = document.getElementById("name4").value;
    var confirm2 = document.getElementById("confirm2");
    if (name3 == "") {

        confirm2.innerHTML = "请输入项目名称".fontcolor("red");
    }
    // else if (name3.length!=20) {
    //  confirm2.innerHTML = "项目名称格式错误".fontcolor("red");
    // }
    else{
        addp(); 
    }
}
//创建团队
var pid;
function addp(){
    var userId = localStorage.getItem('userId');
    var name3 = document.getElementById("name3").value;
    var name4 = document.getElementById("name4").value;
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'http://125.81.59.65:8081/ApiManagementSystem/project',
        data:{
            "userId":userId,
            "projectName":name3,
            "address":1111,
            "description":name4,
        },
        success: function ( data ) {
            if (data.status ==200) {
                var back = data.data.projectId;
                console.log(back+"j");
                 $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: 'http://125.81.59.65:8081/ApiManagementSystem/project/user',
                    data:{
                        "userId":userId,
                        "projectId":back,
                    },
        success: function ( data ) {
            if (data.status ==200) {
                location.reload(true);
            }
            else{
                alert(data.message);
            }
        },
        error: function (data) {
            alert('error');
        }
        })
            }
            else{
                alert(data.message);
            }
        },
        error: function (data) {
            alert('error');
        }
    })
}

//part3-1请求数据，显示数据
function ajax(){
    var userId = localStorage.getItem('userId');
    $.ajax({
        type: 'get',
        url: 'http://125.81.59.65:8081/ApiManagementSystem/project/user',
        data: {
            "userId":userId,
        },
        success: function ( data ) {

            if(data.status == 200){
                var len = data.data.length;
            if (len==0) {
                document.getElementById('biuuu_city_list').innerHTML="暂时没有个人项目，请创建".fontcolor("#666");
            }
            else{
                var backdata = data.data;
                lay(backdata);
            }
                     
            }
        },
        error: function (data) {
            alert('error');
        }
    })
    
}
function lay(backdata){

    layui.use(['laypage', 'layer'], function(){
    var laypage = layui.laypage
    ,layer = layui.layer;
    //调用分页
    laypage.render({
    elem: 'demo20'
    ,count: backdata.length
    ,limit: 8
    ,limits: [8]
     ,layout: ['prev', 'next']
     ,jump: function(obj, first){
        if(!first){
        layer.msg('第 '+ obj.curr +' 页');
      }

      document.getElementById('biuuu_city_list').innerHTML = function(){
        var arr = []
        ,thisData = backdata.concat().splice(obj.curr*obj.limit - obj.limit, obj.limit);
        layui.each(thisData, function(index, item){
            var projectName= item.projectName;
            var projectId = item.projectId;
            var description = item.description;
            arr.push('<div class="col-lg-3 col-md-4 col-xs-7 clo-sm-6">');
            arr.push('<div class="thumbnail" style="min-height:160px">');
            arr.push('<div class="row" id="mian">');
            arr.push('<div class="col-md-12 information1" style="padding: 10px 14px;float: left;">');
            arr.push('<span class="number" style="font-size: 0.7em;color: #666;vertical-align:bottom; float: left;margin-left: 10px;">');
            arr.push('<img src="../images/bianhao.png"> '+item.projectId);
            arr.push('</span>')
            arr.push('<span class="glyphicon glyphicon-trash" style= "margin-right: 10px;float: right;cursor: pointer;" onclick=trash('+'"' + projectName + '"' +','+projectId+')>');
            arr.push('</span>');
            arr.push('<span class="glyphicon glyphicon-pencil" style="cursor: pointer;margin-right: 15px;float: right;" onclick=show1('+projectId+","+'"'+projectName+'"'+","+'"'+description+'"'+')> ');
            arr.push('</span>');
            arr.push('</div>');
            arr.push('<div class="col-md-12 information2" style="float:left;">');
            arr.push('<a href="#" style="color:#0090FF;font-size: 0.7em;float: left;margin-left: 10px;display: inline-block;">');
            arr.push('<span>');
            arr.push('<img src="../images/name_16.png">'+item.projectName);
            arr.push('</span>')
            arr.push('</a>');
            arr.push('</div>');
            arr.push('<button class="btn btn-info" id="btn" style = "margin-top: 40px;margin-right: 20px;margin-left: 25px;font-size: 0.6em;"  onclick=pencil('+projectId+","+'"'+projectName+'"'+","+'"'+description+'"'+')>查看接口' +
                    '</button>');

            arr.push('</div>');
            arr.push('</div>');
            arr.push('</div>');
            arr.push('</div>');
        });
        return arr.join('');
      }();
    }
  });

} );
}
function pencil(projectId,projectName,description){
    getProjectId(projectId,projectName,description);
    window.location.href='project1.html';

}
    //part3-2请求删除数据
function trash(projectName,projectId){      
        var flag = window.confirm("你确认要删除"+projectName+"这个项目吗?"); 
        if(!flag){  
            return false;  
        }
        else{  
            // console.log(projectId)
            function remove(){
                $.ajax({
                    type: 'delete',
                    dataType: 'json',
                    url: 'http://125.81.59.65:8081/ApiManagementSystem/project/'+projectId,
                    success: function ( data ) {
                       ajax();
                    },
                    error: function (data) {
                        alert('errorr');
                    }
                })
                
            }
remove();  
        }
    }
var item = document.getElementsByClassName('t');
function show1(projectId,projectName,description){
    aaa(projectName,description);
    var Idiv=document.getElementById('alert');
    Idiv.style.display="block";
    Idiv.style.left=(document.documentElement.clientWidth-Idiv.clientWidth)/2+document.documentElement.scrollLeft+"px";
    Idiv.style.top=(document.documentElement.clientHeight-Idiv.clientHeight)/2+document.documentElement.scrollTop+"px";

    var procbg = document.createElement("div"); 
    procbg.setAttribute("id","mybg");
    procbg.style.background = "#000000";
    procbg.style.width = "100%";
    procbg.style.height = "100%";
    procbg.style.position = "fixed";
    procbg.style.top = "0";
    procbg.style.left = "0";
    procbg.style.zIndex = "500";
    procbg.style.opacity = "0.6";
    procbg.style.filter = "Alpha(opacity=70)";

    document.body.appendChild(procbg);
    document.body.style.overflow = "hidden";

    var posX;
    var posY;
    Idiv.onmousedown=function(e)
    {
        if(!e) e = window.event;
        posX = e.clientX - parseInt(Idiv.style.left);
        posY = e.clientY - parseInt(Idiv.style.top);
        document.onmousemove = mousemove;
    }
    document.onmouseup = function(){
    document.onmousemove = null;
    }


    function mousemove(ev){
        if(ev==null) ev = window.event;
        Idiv.style.left = (ev.clientX - posX) + "px";
        Idiv.style.top = (ev.clientY - posY) + "px";
        }

    mybg.onclick = function closeDiv(){
    var Idiv=document.getElementById('alert');
    Idiv.style.display="none";    
    document.body.style.overflow = "auto";
    var body = document.getElementsByTagName("body");
    body[0].removeChild(mybg);
    } 

    var statu = 0;
    var change = document.getElementsByClassName('button1')[0];
    var change2 = document.getElementsByClassName('button2')[0];
    var item = document.getElementsByClassName('t');
    var item_length = item.length-1;
    var item_value = new Array(item_length);

    

    for(i = 0; i <= item_length; i++){
        item_value[i] = item[i].innerHTML;
    }
    change.onclick =function(){
        if(statu == 0){
            item[0].innerHTML = '<input type="txt" class="item_input" value="'+projectName+'">';        
            item[1].innerHTML = '<input type="txt" class="item_input" value="'+description+'">';        
            statu = 1;          
        }
        else{
            var item_input = document.getElementsByClassName('item_input');
            for(i = 0; i <= item_length; i++){
                item_value[i] = item_input[i].value;               
            }
            for(i = 0; i <= item_length; i++){
                item[i].innerHTML = item_value[i];               
            }
            $.ajax({
                type: 'PUT',
                dataType: 'json',
                url: 'http://125.81.59.65:8081/ApiManagementSystem/project/'+projectId,
                data: {
                    "projectId":projectId,
                    "projectName":item[0].innerHTML,
                    "description":item[1].innerHTML,
                },
                success: function ( json ) {
                    if (json.status ==200) {
                        location.reload(true);
                        closeDiv('alert');
                    }
                    else{
                        alert(json.message);
                    }
                },
                error: function (json) {
                    alert('error');
                }
            })
            statu = 0;
        }
    }

    change2.onclick = function(){
        if(statu == 0){
            closeDiv('alert');  
        }
        else{
            var item_input = document.getElementsByClassName('item_input');
            for(i = 0; i <= item_length; i++){
                item_value[i] = item_input[i].value;               
            }
            for(i = 0; i <= item_length; i++){
                item[i].innerHTML = item_value[i];               
            }
            statu = 0;
        }
    }
}
function aaa(projectName,description){
    console.log(projectName,description)
    var item = document.getElementsByClassName('t');
    item[0].innerHTML = projectName;
    item[1].innerHTML = description;
}
function getProjectId(projectId,projectName,description){
    var projectId = projectId;
    var projectName = projectName;
    var description = description;
    // var address = address;
    // sessionStorage.setItem('address', address);
    sessionStorage.setItem('p', projectId);
    sessionStorage.setItem('N', projectName);
    sessionStorage.setItem('d', description);
    console.log(projectId,description)
}
