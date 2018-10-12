//添加项目part1-1
function show(popupdiv){
	var Idiv=document.getElementById(popupdiv);
	Idiv.style.display="block";
	Idiv.style.left=(document.documentElement.clientWidth-Idiv.clientWidth)/2+document.documentElement.scrollLeft+"px";
	Idiv.style.top=(document.documentElement.clientHeight-Idiv.clientHeight)/2+document.documentElement.scrollTop-50+"px";
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
//创建项目弹出层
function checkall(){
	// var name2 = document.getElementById("name2").value;
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
var pid;
function addp(){
	var userId = localStorage.getItem('userId');
	var name3 = document.getElementById("name3").value;
	var name4 = document.getElementById("name4").value;
	var data={
        	"userId":userId,
            "projectName":name3,
            "address":1111,
            "description":name4,
    },
    data= JSON.stringify(data);
	$.ajax({
        type: 'post',
        dataType: 'json',
        url: 'http://172.33.10.66:8081/ApiManagementSystem/project',
        contentType:"application/json;charset=utf-8",
        data:data,
		success: function ( data ) {
			if (data.status ==200) {
        		addproject();
        		location.reload(true);
			}
			else{
				alert(data.message);
			}
        },
		error: function (data) {
			alert('error');
        },
    })
}
function addproject(){
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
	btn.onclick = function(){
		show1(alert);
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

	var a2 = document.createElement("a"); 
	a2.style.cssText = "margin-left: 40px;color: #169BD5;";
	a.appendChild(a2);
    var a2Text = document.createTextNode("修改");
    a2.appendChild(a2Text);
	console.log(a2);
	a2.onclick = function(){
		show1(alert);
	}

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
	//part2-1删除项目
}


//part3-1请求数据，显示数据
var projectId,description,projectName,address;
function ajax(){
	var userId = localStorage.getItem('userId');
	console.log(userId)
	$.ajax({
        type: 'get',
        dataType: 'json',
        url: 'http://172.33.10.66:8081/ApiManagementSystem/project/userProject',
        contentType:"application/json",
        data: {
            "userId":userId,
            "pageNum":1,
            "pageSize":5,
        },
		success: function ( data ) {
        	var len = data.data.length;
        	console.log(data)
        	var backdata = data.data;
        	if(data.status == 200){
        		console.log(backdata);
        	    for(i = 0;i<len;i++){
        		    projectId = backdata[i].projectId;
        		    address=backdata[i].address;
        		    projectName = backdata[i].projectName;
        		    description = backdata[i].description;
        		    loadproject(projectId,projectName,description,address);
        	    }
            }
        },
		error: function (data) {
			alert('errorr');
        }
    })
}

function loadproject(projectId,projectName,description,address){
	var display = document.getElementById("display");
	console.log(address)
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
	btn.setAttribute("id","btn");//先不清楚是用id还是class 暂用id
	btn.innerHTML = "项目资料";
	btn.style.cssText = "height: 30px;width: 170px;margin-left: 60px;margin-top: 40px;color: #666;cursor: pointer;";
	newdiv.appendChild(btn);
	btn.onclick = function(){
		show1(projectId,projectName,description);aaa(projectName,description);
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
		getProjectId(projectId,projectName,description,address);
	}

	var a2 = document.createElement("a"); 
	a2.style.cssText = "margin-left: 40px;color: #169BD5;";
	a.appendChild(a2);
    var a2Text = document.createTextNode("修改");  
    a2.appendChild(a2Text);
	a2.onclick = function(){
		show1(projectId,projectName,description);aaa(projectName,description);
	}
	var a3 = document.createElement("a"); 
	a3.style.cssText = "margin-left: 40px;color: #169BD5;";
	a.appendChild(a3);
	a3.setAttribute("href","");  
    var a3Text = document.createTextNode("查看");  
    a3.appendChild(a3Text);


	var a4 = document.createElement("a");
	a4.style.cssText = "margin-left: 40px;color: #169BD5;";
	a.appendChild(a4)
	a4.setAttribute("href","javascript:void(0)");  
    var a4Text = document.createTextNode("删除");  
    a4.appendChild(a4Text);   
	newdiv.setAttribute("id","block");
	newdiv.setAttribute("class","block");
	oldEle.parentNode.insertBefore( newdiv,oldEle )
	//part3-2请求删除数据
	a4.onclick = function(){      
        var flag = window.confirm("你确认要删除"+projectName+"这个项目吗?"); 
        if(!flag){  
            return false;  
        }
		else{  
			console.log(projectId)
			function remove(){
				$.ajax({
       				type: 'delete',
        			dataType: 'json',
       				url: 'http://172.33.10.66:8081/ApiManagementSystem/project/'+projectId,
					success: function ( data ) {
        				var titleElement = title.parentNode.parentNode.parentNode;
                        var parentElement = titleElement.parentNode;
                        parentElement.removeChild(titleElement); 
        			},
					error: function (data) {
						alert('errorr');
        			}
    			})
				
            }
remove();  
        }
	}
}
function getProjectId(projectId,projectName,description,address){
	var projectId = projectId;
	var projectName = projectName;
	var description = description;
	var address = address;
	sessionStorage.setItem('address', address);
	sessionStorage.setItem('p', projectId);
	sessionStorage.setItem('N', projectName);
	sessionStorage.setItem('d', description);
	console.log(projectId,description)
}
function show1(projectId,projectName,description){
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
    var change = document.getElementsByClassName('button1')[1];
    var change2 = document.getElementsByClassName('button2')[1];
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
                url: 'http://172.33.10.66:8081/ApiManagementSystem/project/'+projectId,
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
// fenye(1,5);
// function fenye(pno,psize){
// 	var totalPage = 5;
// 	var pagesize = psize;
// 	var currentPage = pno;
// 	var tempStr = "";
//         if (currentPage > 1) {
//             tempStr += "<a href=\"#\" onClick=\"goPage(" + (currentPage - 1) + "," + psize + ")\"><上一页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>"
//             for (var j = 1; j <= totalPage; j++) {
//                 tempStr += "<a href=\"#\" onClick=\"goPage(" + j + "," + psize + ")\">" + "<span class='current'>" + j + "</span>" + "&nbsp;&nbsp;&nbsp;</a>";
//             }
//         } else {
//             tempStr += "<上一页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
//             for (var j = 1; j <= totalPage; j++) {
//                 tempStr += "<a href=\"#\" onClick=\"goPage(" + j + "," + psize + ")\">" + "<span class='current'>" + j + "</span>" + "&nbsp;&nbsp;&nbsp;</a>"
//             }
//         }
//         if (currentPage < totalPage) {
//             tempStr += "<a href=\"#\" onClick=\"goPage(" + (currentPage + 1) + "," + psize + ")\">下一页>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>";
//             for (var j = 1; j <= totalPage; j++) {
//             }
//         } else {
//             tempStr += "  下一页>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

//             for (var j = 1; j <= totalPage; j++) {
//             }
//         }
//         document.getElementById("barcon").innerHTML =  tempStr ; 
//     // outstr = ""; 
//        // document.getElementById("barcon").innerHTML = tempStr;
// }


    

