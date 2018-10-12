function show(popupdiv){
var Idiv=document.getElementById(popupdiv);
Idiv.style.display="block";
//以下部分要将弹出层居中显示
Idiv.style.left=(document.documentElement.clientWidth-Idiv.clientWidth)/2+document.documentElement.scrollLeft+"px";
Idiv.style.top=(document.documentElement.clientHeight-Idiv.clientHeight)/2+document.documentElement.scrollTop-50+"px";
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
        url: 'http://172.33.10.66:8081/ApiManagementSystem/team',
        data: {
            "createuserId":userId ,
            "teamName":name3,
            "description":name4,
        },
		success: function ( data ) {
			if (data.status ==200) {
				tid = data.data.teamId;
                console.log(data);
                console.log(tid);
                alert("创建团队成功");
        		addgroup(tid);
                $.ajax({
        			type: 'post',
        			dataType: 'json',
        			url: 'http://172.33.10.66:8081/ApiManagementSystem/team/teamMember',
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
function addgroup(tid){
	var name3 = document.getElementById("name3").value;
	var name4 = document.getElementById("name4").value;
	var display = document.getElementById("display");
	var oldEle = document.getElementById("add");
	var newdiv = document.createElement("div");
	var name = document.createElement("div");
	name.style.cssText = "width: 250px;height: 50px;margin-left: 10px;margin-top: 10px;letter-spacing: 5px;color: #666;";
	newdiv.appendChild(name);
	var h1 = document.createElement("h5");
	var h1Text = document.createTextNode("团队编号: ");  
	var num = document.createTextNode(tid);
	name.appendChild(h1);
	h1.appendChild(h1Text);
	h1.appendChild(num);

	var h2 = document.createElement("h5");
	var h2Text = document.createTextNode("团队名称: ");  
	var title = document.createTextNode(name3);
	name.appendChild(h2);
	h2.appendChild(h2Text);
	h2.appendChild(title);

    
	var btn = document.createElement("button");
	btn.innerHTML = "团队资料";
	btn.style.cssText = "height: 30px;width: 170px;margin-left: 60px;margin-top: 40px;color: #666;cursor: pointer;";
	newdiv.appendChild(btn);
	btn.onclick = function(){
		show1();
	}

	var a = document.createElement("div");
	a.style.cssText = "margin-top: 60px;font-size: 0.5em;";
	newdiv.appendChild(a);

	var a1 = document.createElement("a");
	a1.style.cssText = "float: left;margin-left: 40px;color: #169BD5;";
	a.appendChild(a1);
    a1.setAttribute("href","group.html"); 
    var a1Text = document.createTextNode("进入");  
    a1.appendChild(a1Text);
    a1.onclick = function(){
        setgroup(tid);
    }

	var a4 = document.createElement("a");
	a4.style.cssText = "margin-left: 30px;margin-right: 30px;color: #169BD5;float: right;";
	a.appendChild(a4);
	a4.setAttribute("href","javascript:void(0)");  
    var a4Text = document.createTextNode("删除");  
    a4.appendChild(a4Text);   

	newdiv.style.cssText= "height: 250px;width: 300px;box-shadow: 2px 2px 10px  #666;margin-left: 53px;margin-top: 40px;position: relative;padding: 10px;float: left;"; 
	oldEle.parentNode.insertBefore( newdiv,oldEle );
	closeDiv("popupdiv");
}
//part3-1请求数据，显示数据
var teamName;var description,i;var tId;
function ajax(){
    var userId = localStorage.getItem('userId');
	$.ajax({
        type: 'get',
        dataType: 'json',
        url: 'http://172.33.10.66:8081/ApiManagementSystem/team/userTeam',
        data: {
            "userId":userId,
            "page":1,
        },
		success: function ( data ) {
        	var len = data.data.length;
        	var backdata = data.data;
        	if(data.status == 200){
        	    for(i = 0;i<len;i++){
        		    tId = backdata[i].teamId;
        		    teamName = backdata[i].teamName;
        		    description = backdata[i].description;
        		    loadGroup(tId,teamName,description);
        	    }
            }
        },
		error: function (data) {
			alert('error');
        }
    })
	function loadGroup(tId,teamName,description){
		var display = document.getElementById("display");
		var oldEle = document.getElementById("add");
		var newdiv = document.createElement("div");
		var name = document.createElement("div");
		name.style.cssText = "width: 250px;height: 50px;margin-left: 10px;margin-top: 10px;letter-spacing: 5px;color: #666;";
		newdiv.appendChild(name);
		var h1 = document.createElement("h5");
        h1.setAttribute("class","h5");
		var h1Text = document.createTextNode("团队编号: ");  
		var num = document.createTextNode(tId);
		name.appendChild(h1);
		h1.appendChild(h1Text);
		h1.appendChild(num);

		var h2 = document.createElement("h5");
		var h2Text = document.createTextNode("团队名称: ");  
		var title = document.createTextNode(teamName);
		name.appendChild(h2);
		h2.appendChild(h2Text);
		h2.appendChild(title);
	
		var btn = document.createElement("button");
		btn.setAttribute("id","dbtn");//先不清楚是用id还是class 暂用id
		btn.innerHTML = "团队资料";
		btn.style.cssText = "height: 30px;width: 170px;margin-left: 60px;margin-top: 40px;color: #666;cursor: pointer;";
		newdiv.appendChild(btn);
		btn.onclick = function(){
			show1(tId,teamName,description);
            aaa(teamName,description);
		}

		var a = document.createElement("div");
		a.style.cssText = "margin-top: 60px;font-size: 0.5em;";
		newdiv.appendChild(a);

		var a = document.createElement("div");
		a.style.cssText = "margin-top: 60px;font-size: 0.5em;";
		newdiv.appendChild(a);
		var a1 = document.createElement("a");
		a1.style.cssText = "float: left;margin-left: 40px;color: #169BD5;";
		a.appendChild(a1);
        a1.setAttribute("href","group.html"); 
        var a1Text = document.createTextNode("进入");  
        a1.appendChild(a1Text);
        a1.onclick=function(){
            setgroup(tId,teamName,description);
        }

	    var a4 = document.createElement("a");
        a4.setAttribute("class","a4");
	    a4.style.cssText = "margin-left: 30px;margin-right: 30px;color: #169BD5;float: right;";
	    a.appendChild(a4);
	    a4.setAttribute("href","javascript:void(0)");  
        var a4Text = document.createTextNode("删除");  
        a4.appendChild(a4Text);      
	    newdiv.setAttribute("id","block");
	    newdiv.setAttribute("class","block");
	    oldEle.parentNode.insertBefore( newdiv,oldEle );
	   //part3-2请求删除数据
		a4.onclick = function(){   
            var flag = window.confirm("你确认要删除"+teamName+"这个项目吗?"); 
                if(!flag){  
                    return false;  
                }
			 	else{  
					function remove(){
						$.ajax({
        					type: 'delete',
       						dataType: 'json',
        					url: 'http://172.33.10.66:8081/ApiManagementSystem/team/'+tId,
							success: function ( data ) {
								if (data.status ==200) {
                                    var titleElement = title.parentNode.parentNode.parentNode;
                                    var parentElement = titleElement.parentNode;
                                    parentElement.removeChild(titleElement);  
                                    return true;  
								}
       						},
							error: function (data) {
								alert('error');
        					}
    					})
					}
					remove();	
                }  
        }		
	}
}
var item = document.getElementsByClassName('t');
function show1(tId,teamName,description){
    var Idiv=document.getElementById('alert');
    Idiv.style.display="block";
    Idiv.style.left=(document.documentElement.clientWidth-Idiv.clientWidth)/2+document.documentElement.scrollLeft+"px";
    Idiv.style.top=(document.documentElement.clientHeight-Idiv.clientHeight)/2+document.documentElement.scrollTop-50+"px";

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
           
            // for(i = 0; i <= item_length; i++){
                item[0].innerHTML = '<input type="txt" class="item_input" value="'+tId+'">';
                item[1].innerHTML = '<input type="txt" class="item_input" value="'+teamName+'">';        
            // }
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
                url: 'http://172.33.10.66:8081/ApiManagementSystem/team/'+tId,
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
