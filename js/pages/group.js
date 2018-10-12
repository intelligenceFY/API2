function show(popupdiv){
	var Idiv=document.getElementById(popupdiv);
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
	function mousemove(ev)
	{
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
function closeDiv(popupdiv) 
{
	var Idiv=document.getElementById(popupdiv);
	Idiv.style.display="none";
	document.body.style.overflow = "auto"; 
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
	// else if (name3.length!=20) {
	// 	confirm2.innerHTML = "项目名称格式错误".fontcolor("red");
	// }
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
    console.log(teamdes);
    var userId = localStorage.getItem('userId');
    var data={
            "projectName":name3,
            "address":1111,
            "description":name4,
    },
    data= JSON.stringify(data);
	$.ajax({
        type: 'post',
        dataType: 'json',
        url: 'http://172.33.10.66:8081/ApiManagementSystem/project/teamproject',
        contentType:"application/json;charset=utf-8",
        data:data,
		success: function ( data ) {
			if (data.status ==200) {
				console.log(data)
				pid = data.data.projectId;
				console.log(pid)
        		addproject(pid);
                $.ajax({
        			type: 'post',
        			dataType: 'json',
        			cotentType:'application/json',
        			url: 'http://172.33.10.66:8081/ApiManagementSystem/team/teamProject',
        			data: {
        				"projectId":pid,
        				"teamId":teamId,
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
function addproject(pid){
	//var name2 = document.getElementById("name2").value;
	var name3 = document.getElementById("name3").value;
	var name4 = document.getElementById("name4").value;
	var display = document.getElementById("display");
	var oldEle = document.getElementById("add");
	var newdiv = document.createElement("div");
	var name = document.createElement("div");
	name.style.cssText = "width: 250px;height: 50px;margin-left: 10px;margin-top: 10px;letter-spacing: 5px;color: #666;";
	newdiv.appendChild(name);
	var h1 = document.createElement("h5");
	var h1Text = document.createTextNode("项目编号: ");  
	var num = document.createTextNode(pid);
	name.appendChild(h1);
	h1.appendChild(h1Text);
	h1.appendChild(num);

	var h2 = document.createElement("h5");
	var h2Text = document.createTextNode("项目名称: ");  
	var title = document.createTextNode(name3);
	name.appendChild(h2);
	h2.appendChild(h2Text);
	h2.appendChild(title);
	
	var btn = document.createElement("button");
	btn.innerHTML = "项目资料";
	btn.style.cssText = "height: 30px;width: 170px;margin-left: 60px;margin-top: 40px;color: #666;cursor: pointer;";
	newdiv.appendChild(btn);

	var a = document.createElement("div");
	a.style.cssText = "margin-top: 60px;font-size: 0.5em;";
	newdiv.appendChild(a);

	var a1 = document.createElement("a");
	a1.style.cssText = "margin-left: 40px;color: #169BD5;";
	a.appendChild(a1);
    a1.setAttribute("href","project1.html"); 
    var a1Text = document.createTextNode("查看");  
    a1.appendChild(a1Text);

	var a2 = document.createElement("a"); 
	a2.style.cssText = "margin-left: 40px;color: #169BD5;";
	a.appendChild(a2);
	a2.setAttribute("href","");  
    var a2Text = document.createTextNode("修改");
	a2.setAttribute("href","project1.html"); 
    a2.appendChild(a2Text);

	var a3 = document.createElement("a"); 
	a3.style.cssText = "margin-left: 40px;color: #169BD5;";
	a.appendChild(a3);
	a3.setAttribute("href","");  
    var a3Text = document.createTextNode("查看");  
    a3.appendChild(a3Text);

	var a4 = document.createElement("a");
	a4.style.cssText = "margin-left: 40px;color: #169BD5;";
	a.appendChild(a4);
	a4.setAttribute("href","javascript:void(0)");  
    var a4Text = document.createTextNode("删除");  
    a4.appendChild(a4Text);   
	newdiv.setAttribute("id","block");
	newdiv.setAttribute("class","block");
	oldEle.parentNode.insertBefore(newdiv,oldEle );
	closeDiv("popupdiv");
}
//part3-1请求数据，显示数据
var projectName,projectId,description;
function ajax(){
	var h3 = document.getElementsByTagName('h3')[0];
	var span3 = document.getElementById('span3');
	var span4 = document.getElementById('span4');
	var tId = sessionStorage.getItem('tId');
    var teamName = sessionStorage.getItem('teamName');
    var teamdes = sessionStorage.getItem('teamdes');
    console.log(teamName)
    h3.innerHTML = teamName;
    span3.innerHTML = tId;
    span4.innerHTML = teamdes;
	$.ajax({
        type: 'get',
       	dataType: 'json',
        url: 'http://172.33.10.66:8081/ApiManagementSystem/team/teamProject',
        data: {
        	"teamId":tId,
        	"page":1,
        },
		success: function ( data ) {
			if (data.status ==200) {
                var len = data.data.length;
        		var backdata = data.data;
        		//console.log(backdata);
        		for(var i=0;i<len;i++){
					projectId = backdata[i].projectId;
					projectName = backdata[i].projectName;
					description = backdata[i].description;
					loadproject(projectId,projectName,description);// loadproject();//加载数据后展示的动态创建
				}
			}

       	},
		error: function (data) {
			alert('error');
        }
    })
}  
function loadproject(projectId,projectName,description){
	var display = document.getElementById("display");
	var oldEle = document.getElementById("add");
	var newdiv = document.createElement("div");
	var name = document.createElement("div");
	name.style.cssText = "width: 250px;height: 50px;margin-left: 10px;margin-top: 10px;letter-spacing: 5px;color: #666;";
	newdiv.appendChild(name);
	var h1 = document.createElement("h5");
	var h1Text = document.createTextNode("项目编号: ");  
	var num = document.createTextNode(projectId);
    name.appendChild(h1);
	h1.appendChild(h1Text);
	h1.appendChild(num);

	var h2 = document.createElement("h5");
	var h2Text = document.createTextNode("项目名称: ");  
	var title = document.createTextNode(projectName);
	name.appendChild(h2);
	h2.appendChild(h2Text);
	h2.appendChild(title);
	
	var btn = document.createElement("button");
	btn.setAttribute("id","dbtn");//先不清楚是用id还是class 暂用id
	btn.innerHTML = "项目资料";
	btn.style.cssText = "height: 30px;width: 170px;margin-left: 60px;margin-top: 40px;color: #666;cursor: pointer;";
	newdiv.appendChild(btn);
	btn.onclick = function(){
			show1(projectId);
            aaa(projectName,description);
		}


	var a = document.createElement("div");
	a.style.cssText = "margin-top: 60px;font-size: 0.5em;";
	newdiv.appendChild(a);

	var a1 = document.createElement("a");
	a1.style.cssText = "margin-left: 40px;color: #169BD5;";
	a.appendChild(a1);
    a1.setAttribute("href","project1.html"); 
    var a1Text = document.createTextNode("查看");  
    a1.appendChild(a1Text);
	a1.onclick = function(){
		getgroupId(projectId);
	}

	var a2 = document.createElement("a"); 
	a2.style.cssText = "margin-left: 40px;color: #169BD5;";
	a.appendChild(a2);
	a2.setAttribute("href","");  
    var a2Text = document.createTextNode("修改");  
	a2.setAttribute("href","project1.html"); 
    a2.appendChild(a2Text);

	var a3 = document.createElement("a"); 
	a3.style.cssText = "margin-left: 40px;color: #169BD5;";
	a.appendChild(a3);
	a3.setAttribute("href","");  
    var a3Text = document.createTextNode("查看");  
    a3.appendChild(a3Text);

	var a4 = document.createElement("a");
	a4.style.cssText = "margin-left: 40px;color: #169BD5;";
	a.appendChild(a4);
	a4.setAttribute("href","javascript:void(0)");  
    var a4Text = document.createTextNode("删除");  
    a4.appendChild(a4Text);   
	newdiv.setAttribute("id","block");
	newdiv.setAttribute("class","block");
	oldEle.parentNode.insertBefore( newdiv,oldEle );
	                        //part3-2请求删除数据
	a4.onclick = function(){   
        var flag = window.confirm("你确认要删除"+projectName+"这个项目吗?"); 
        if(!flag){  
            return false;  
        }
		else{  
			function remove(){
				$.ajax({
        			type: 'delete',
       				dataType: 'json',
        			url: 'http://172.33.10.66:8081/ApiManagementSystem/team/teamProject/'+projectId,
					success: function ( data ) {
						if (data.status ==200) {
                            var titleElement = title.parentNode.parentNode.parentNode;
                            var parentElement = titleElement.parentNode;
                           	parentElement.removeChild(titleElement);    
                            //location.reload(true);
                            return true;  
						}
       				},
					error: function (data) {
						alert(data.messsage)
						alert('error');
        			}
    			})
			}
			remove();	
        }  
    }		
}
var item = document.getElementsByClassName('t');
function show1(projectId){
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
            console.log(item_length);
            for(i = 0; i <= item_length; i++){
                console.log(item_value)
                item[i].innerHTML = '<input type="txt" class="item_input" value="'+item_value[i]+'">';        
            }
            statu = 1;          
        }
        else{
            var item_input = document.getElementsByClassName('item_input');
            for(i = 0; i <= item_length; i++){
                 //console.log(item_value[i]);
                item_value[i] = item_input[i].value;               
            }
            for(i = 0; i <= item_length; i++){
                item[i].innerHTML = item_value[i];               
            }
            $.ajax({
                type: 'PUT',
                dataType: 'json',
                url: 'http://172.33.10.66:8081/ApiManagementSystem/project/'+projectId,
                data: {
                    "projectName":item[0].innerHTML,
                    "description":item[1].innerHTML,
                    "address":0,             
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
//onload=member;
var memberName;
function member(){
	$.ajax({
		type:"GET",
		dataType:"json",
		url:"http://rap2api.taobao.org/app/mock/12472//team/teamMember",
		// url:'http://172.33.10.66:8081/ApiManagementSystem/team/teamMember',
		data: {
            "teamId":1,
        },
    success:function(json){
    	var member = json.data;
    	var length = member.length;
    	for(var i=0;i<length;i++){
    		memberName = member[i].userId;
    		loadMember(memberName);
    	}
    },
     error: function (json) {
         alert('error');
        },
	})
}
function loadMember(memberName){
	var outPut="";
	outPut += `
		<td>
		<span class="chakan" onclick="open(this)">查看</span>
		<span class="remove">删除成员</span>
		</td>
	`;
	var tr = document.getElementById("table_result").insertRow(1);
	var td1 = tr.insertCell(0);
	td1.innerText=memberName;
	var td2 = tr.insertCell(1);
	td2.innerHTML=outPut;

}
function add_person(){
	var userName = document.getElementById('shousuo').value;
	$.ajax({
		type:"get",
		dataType:"json",
		url:"http://172.33.10.66:8081/ApiManagementSystem/user/userName",
		data:{
			"userName":userName,
		},
		success:function(json){

		},
		error:function(json){
			alert("页面错误");
		},
	})
}
function getgroupId(projectId){
	sessionStorage.setItem('projectId',projectId)
}