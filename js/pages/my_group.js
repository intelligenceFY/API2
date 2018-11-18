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
function checkname(){
	var name3 = document.getElementById("name3").value;
	var confirm2 = document.getElementById("confirm2");
	if (name3 == "") {
		confirm2.innerHTML = "请输入团队名称".fontcolor("red");
	}
	else{
		confirm2.innerHTML = "输入正确".fontcolor("#28A745");
		return true;
	}
}
function checkall(){
	if(checkname()){
		addg();
	}
	else{
		window.confirm("创建失败");
	}
}
//创建团队
var tid;
function addg(){
    var userId = localStorage.getItem('userId');
    console.log(userId)
    var confirm2 = document.getElementById("confirm2");
	var name3 = document.getElementById("name3").value;
	var name4 = document.getElementById("name4").value;
	$.ajax({
        type: 'post',
        dataType: 'json',
        url: 'http://125.81.59.65:8081/ApiManagementSystem/team',
        data: {
            "createuserId":userId ,
            "teamName":name3,
            "description":name4,
        },
		success: function ( data ) {
			if (data.status ==200) {
				tid = data.data.teamId;
                alert("创建团队成功");
        		// addgroup(tid);
                $.ajax({
        			type: 'post',
        			dataType: 'json',
        			url: 'http://125.81.59.65:8081/ApiManagementSystem/team/teamMember',
        			data: {
        				"teamId":tid,
        				"userId":userId,
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
                    confirm2.innerHTML = data.message.fontcolor("red");
                }
        },
		error: function (data) {
			alert('error');
        }
    })
}
//part3-1请求数据，显示数据
var teamName;var description,i;var tId;
function ajax(){
    var userId = localStorage.getItem('userId');
	$.ajax({
        type: 'get',
        dataType: 'json',
        url: 'http://125.81.59.65:8081/ApiManagementSystem/team/userTeam',
        data: {
            "userId":userId,
        },
		success: function ( data ) {

        	if(data.status == 200){
                 var len = data.data.length;
            if (len==0) {
                document.getElementById('biuuu_city_list').innerHTML="暂时没有团队项目，请创建".fontcolor("#666");
            }
            else{
                  var backdata = data.data;
                  console.log(backdata);
                  var teamname = document.getElementById("teamname");
                  // teamname.innerHTML=backdata.
                  lay(backdata,len);
            }
        		     
            }
        },
		error: function (data) {
			alert('error');
        }
    })
	
}
function lay(backdata){
    console.log(backdata.length)

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
            var teamName= item.teamName;
            var teamId = item.teamId;
            var description = item.description;
            console.log(teamName);
            arr.push('<div class="col-lg-3 col-md-4 col-xs-7 clo-sm-6">');
            arr.push('<div class="thumbnail" style="min-height:160px">');
            arr.push('<div class="row" id="mian">');
            arr.push('<div class="col-md-12 information1" style="padding: 10px 14px;float: left;">');
            arr.push('<span class="number" style="font-size: 0.7em;color: #666;vertical-align:bottom; float: left;margin-left: 10px;">');
            arr.push('<img src="../images/bianhao.png"> '+teamId);
            arr.push('</span>')
            arr.push('<span class="glyphicon glyphicon-trash" style= "margin-right: 10px;float: right;cursor: pointer;" onclick=trash('+'"' + teamName + '"' +','+teamId+')>');
            arr.push('</span>');
            arr.push('<span class="glyphicon glyphicon-pencil" style="cursor: pointer;margin-right: 15px;float: right;" onclick=show1('+teamId+","+'"' + teamName+'"'+","+'"' + description+'"' +')>');
            arr.push('</span>');
            arr.push('</div>');
            arr.push('<div class="col-md-12 information2" style="float:left;">');
            arr.push('<a href="#" style="color:#0090FF;font-size: 0.7em;float: left;margin-left: 10px;display: inline-block;">');
            arr.push('<span>');
            arr.push('<img src="../images/name_16.png">'+teamName);
            arr.push('</span>')
            arr.push('</a>');
            arr.push('</div>');
            arr.push('<button class="btn btn-info" id="btn" style = "margin-top: 40px;margin-right: 20px;margin-left: 25px;font-size: 0.6em;" onclick=pencil('+teamId+","+'"' + teamName+'"'+","+'"' + description+'"' +')>'+'进入团队项目' +
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
function pencil(teamId,teamName,description){
    setgroup(teamId,teamName,description);
    window.location.href='group.html';
}
    //part3-2请求删除数据
function trash(teamName,teamId){    

    console.log(teamName,teamId);  
        var flag = window.confirm("你确认要删除"+teamName+"这个团队吗?"); 
        if(!flag){  
            return false;  
        }
        else{  
            console.log(teamId)
            function remove(){
                $.ajax({
                    type: 'delete',
                    dataType: 'json',

                    url: 'http://125.81.59.65:8081/ApiManagementSystem/team/'+teamId,
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
function show1(teamId,teamName,description){
     aaa(teamName,description);
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
    var item_length = item.length-1;
    var item_value = new Array(item_length);

    

    for(i = 0; i <= item_length; i++){
        item_value[i] = item[i].innerHTML;

    }
    //修改单个团队
    change.onclick =function(){
        if(statu == 0){
           
            for(i = 0; i <= item_length; i++){
                item[0].innerHTML = '<input type="txt" class="item_input" value="'+teamName+'">';
                item[1].innerHTML = '<input type="txt" class="item_input" value="'+description+'">';        
            }
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
                url: 'http://125.81.59.65:8081/ApiManagementSystem/team/'+teamId,
                data: {
                    "teamName":item[0].innerHTML,
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

function aaa(teamName,description){
    item[0].innerHTML = teamName;
    item[1].innerHTML = description;
}
function setgroup(tId,teamName,description){
    sessionStorage.setItem('tId', tId);
    sessionStorage.setItem('teamName', teamName);
    sessionStorage.setItem('teamdes', description);
    console.log(tId)
}
