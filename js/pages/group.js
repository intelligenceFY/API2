onload=member();
function getgroupId(projectId,projectName,description){
    var projectId = projectId;
    var projectName = projectName;
    var description = description;
    sessionStorage.setItem('p', projectId);
    sessionStorage.setItem('N', projectName);
    sessionStorage.setItem('d', description);
}

function show(){
    var Idiv=document.getElementById('popupdiv');
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
    var Idiv=document.getElementById('popupdiv');
    Idiv.style.display="none";    
    document.body.style.overflow = "auto";
    var body = document.getElementsByTagName("body");
    body[0].removeChild(mybg);
    } 
}
function closeDiv() //关闭弹出层
{
var Idiv=document.getElementById('popupdiv');
Idiv.style.display="none";
document.body.style.overflow = "auto"; //恢复页面滚动条
var body = document.getElementsByTagName("body");
var mybg = document.getElementById("mybg");
 body[0].removeChild(mybg);
}
function checkall(){
	//var name2 = document.getElementById("name2").value;
	var name3 = document.getElementById("name3").value;
	var name4 = document.getElementById("name4").value;
	var confirm2 = document.getElementById("confirm2");
	if (name3 == "") {

		confirm2.innerHTML = "请输入项目名称".fontcolor("red");
	}
	else{
		addp();	
	}
}
//添加项目part1-2
function addp(){
	var name3 = document.getElementById("name3").value;
	var name4 = document.getElementById("name4").value;
	var confirm2 = document.getElementById("confirm2");
	var tId = sessionStorage.getItem('tId');
    var teamName = sessionStorage.getItem('teamName');
    var teamdes = sessionStorage.getItem('teamdes');
    var userId = localStorage.getItem('userId');
	$.ajax({
        type: 'post',
        dataType: 'json',
        url: 'http://125.81.59.65:8081/ApiManagementSystem/project',
        data:{
            "projectName":name3,
            "address":1111,
            "description":name4,
        },
		success: function ( data ) {
			if (data.status ==200) {
                console.log(tId);
				var back = data.data.projectId;
				console.log(back);
                $.ajax({
        			type: 'post',
        			dataType: 'json',
        			url: 'http://125.81.59.65:8081/ApiManagementSystem/project/team',
        			data: {
        				"projectId":back,
        				"teamId":tId,
        				"createUserId":userId,
 
       				 },
					success: function ( data ) {
						if (data.status ==200) {
                          location.reload(true);						
                        }
        			},
					error: function (data) {
						alert('error');
        			}
   				})
			}
            else{
            		console.log(data.message);
                    confirm2.innerHTML = data.message.fontcolor("red");
                }
        },
		error: function (data) {
			alert('error');
        }
    })
}

//part3-1请求数据，显示数据
var projectName,projectId,description;
function ajax(){
	var tId = sessionStorage.getItem('tId');
    console.log(tId+"ll");
    var teamName = sessionStorage.getItem('teamName');
    var teamdes = sessionStorage.getItem('teamdes');
    var text_info = document.getElementById("info");
    var mingcheng = document.getElementById("team");
    mingcheng.innerHTML ="团队名称："+teamName;
    text_info.innerHTML="团队描述："+teamdes;
	$.ajax({
        type: 'get',
       	dataType: 'json',
        url: 'http://125.81.59.65:8081/ApiManagementSystem/project/team',
        data: {
        	"teamId":tId,
        },
		success: function ( data ) {
			if (data.status ==200) {
                var len = data.data.length;
                if (len==0){
                    document.getElementById('biuuu_city_list').innerHTML="暂时没有团队项目，请创建".fontcolor("#666");
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
            console.log(obj.curr);
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
            arr.push('<img src="../images/bianhao.png"> '+projectId);
            arr.push('</span>')
            arr.push('<span class="glyphicon glyphicon-trash" style= "margin-right: 10px;float: right;cursor: pointer;" onclick=trash('+'"' + projectName + '"' +','+projectId+')>');
            arr.push('</span>');
            arr.push('<span class="glyphicon glyphicon-pencil" style="cursor: pointer;margin-right: 15px;float: right;" onclick=show1('+projectId+","+'"'+projectName+'"'+","+'"'+description+'"'+')> ');
            arr.push('</span>');
            arr.push('</div>');
            arr.push('<div class="col-md-12 information2" style="float:left;">');
            arr.push('<a href="#" style="color:#0090FF;font-size: 0.7em;float: left;margin-left: 10px;display: inline-block;">');
            arr.push('<span>');
            arr.push('<img src="../images/name_16.png">'+projectName);
            arr.push('</span>')
            arr.push('</a>');
            arr.push('</div>');
            arr.push('<button class="btn btn-info" id="btn" style = "margin-top: 40px;margin-right: 20px;margin-left: 25px;font-size: 0.6em;" onclick=pencil('+projectId+","+'"'+projectName+'"'+","+'"'+description+'"'+')>查看接口' +
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
     getgroupId(projectId,projectName,description);
    window.location.href='project1.html';
}
    //part3-2请求删除数据
function trash(projectName,projectId){      
        var flag = window.confirm("你确认要删除"+projectName+"这个项目吗?"); 
        if(!flag){  
            return false;  
        }
        else{  
            function remove(){
                $.ajax({
                    type: 'delete',
                    dataType: 'json',
                    url: 'http://125.81.59.65:8081/ApiManagementSystem/project/'+projectId,
                     contentType:"application/json;charset=utf-8",
                    success: function ( data ) {
                        location.reload(true);
                    },
                    error: function (data) {
                        alert('error');
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
                 contentType:"application/json;charset=utf-8",
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
            closeDiv();  
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
function closeD() //关闭弹出层
{
var Idiv=document.getElementById('alert');
Idiv.style.display="none";
document.body.style.overflow = "auto"; //恢复页面滚动条
var body = document.getElementsByTagName("body");
var mybg = document.getElementById("mybg");
 body[0].removeChild(mybg);
}
function aaa(projectName,description){
    console.log(projectName,description)
    var item = document.getElementsByClassName('t');
    item[0].innerHTML = projectName;
    item[1].innerHTML = description;
}


function addMember(){
    var Idiv=document.getElementById('member');
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
    var Idiv=document.getElementById('member');
    Idiv.style.display="none";    
    document.body.style.overflow = "auto";
    var body = document.getElementsByTagName("body");
    body[0].removeChild(mybg);
    } 
    var confirm3 = document.getElementById("confirm3");
   
    // var add = document.getElementsByClassName('button1')[2];
}
  function add(){
     var memberName = document.getElementById("name5").value;
        var tId = sessionStorage.getItem('tId');
            $.ajax({
                type: 'get',
                dataType: 'json',
                url:'http://125.81.59.65:8081/ApiManagementSystem/user/userName',
                data: {
                    "userName":memberName,
                },
                success: function ( json ) {
                    if (json.status ==200) {
                         var MemberId = json.data[0].userId;
                         console.log(json.data[0].userId);
                        $.ajax({
                            type: 'post',
                            dataType: 'json',
                            url:'http://125.81.59.65:8081/ApiManagementSystem/message/invite',
                            data: {
                            "userId":MemberId,
                            "teamId":tId,
                            },
                            success: function ( json ) {
                            if (json.status ==200) {

                                alert(json.message);
                                
                                closeD();
                            }
                            else{
                                 alert(json.message);
                            }
                        },
                            error: function (json) {
                            alert('error');
                            }
                        })  
                    }
                    else{
                       confirm3.innerHTML=json.message.fontcolor("red");
                    }
                },
                error: function (json) {
                    alert('没有该用户');
                }
            })
        }
function closeD() //关闭弹出层
{
var Idiv=document.getElementById('member');
Idiv.style.display="none";
document.body.style.overflow = "auto"; //恢复页面滚动条
var body = document.getElementsByTagName("body");
var mybg = document.getElementById("mybg");
 body[0].removeChild(mybg);
}

function member(){
     var tId = sessionStorage.getItem('tId');
	$.ajax({
		type:"GET",
		dataType:"json",
		url:'http://125.81.59.65:8081/ApiManagementSystem/team/teamMember',
		data: {
            "teamId":tId,
        },
    success:function(json){
    	var len = json.data.length;
        if (len==0) {
            document.getElementById('memberDisplay').innerHTML="暂时没有成员，请邀请".fontcolor("#666");
        }
        else{
            var backdata = json.data;
            console.log(backdata);
            person(backdata);
        }

    },
     error: function (json) {
         alert('error');
        },
	})
}
function person(backdata){
    console.log(backdata.length)
    layui.use(['laypage', 'layer'], function(){
    var laypage = layui.laypage
    ,layer = layui.layer;
    //调用分页
    laypage.render({
    elem: 'demo21'
    ,count: backdata.length
    ,limit: 7
    ,limits: [7]
     ,layout: ['prev', 'next']
     ,jump: function(obj, first){
        if(!first){
        layer.msg('第 '+ obj.curr +' 页');
      }

      document.getElementById('memberDisplay').innerHTML = function(){
        var arr = []
        ,thisData = backdata.concat().splice(obj.curr*obj.limit - obj.limit, obj.limit);
        layui.each(thisData, function(index, item){
            var userId = item.userId;
            var MemberName= item.userName;
            arr.push('<div class="row info-content " style="height: 40px;">');
            arr.push('<div class="col-md-6 col-xs-6" style="line-height: 40px">');
            arr.push('<span>'+MemberName);
            arr.push('</span>');
            arr.push('</div>');
            arr.push('<div class="col-md-6 col-xs-6" style="line-height: 40px">');
            arr.push('<a href="introduction.htm")>查看');
            arr.push('</a>');
            arr.push('<a href="#" style="margin-left: 15px;" onclick=del('+userId+')>删除');
            arr.push('</a>');
            arr.push('</div>');
            arr.push('</div>');

        });
        return arr.join('');
      }();
    }
  });

    });
}
function del(userId){
    var tId = sessionStorage.getItem('tId');
    $.ajax({
        type:"GET",
        dataType:"json",
        url:'http://125.81.59.65:8081/ApiManagementSystem/team/teamMember',
        data: {
            "teamId":tId,
            "userId":userId,
        },
    success:function(json){
        location.reload(true);
    },
     error: function (json) {
         alert('error');
        },
    })

}