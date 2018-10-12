onload=ajax();
onload=ajax2();
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
	var display = document.getElementById("display1");
	var oldEle = document.getElementById("min");
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

	var a = document.createElement("div");
	a.style.cssText = "margin-top: 60px;font-size: 0.5em;";
	newdiv.appendChild(a);

	var a1 = document.createElement("a");
	a1.style.cssText = "margin-left: 40px;color: #169BD5;";
	a.appendChild(a1);
    a1.setAttribute("href","project1.html"); 
    var a1Text = document.createTextNode("查看");  
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
	display.appendChild(newdiv);		
}
function ajax2(){
	var userId = localStorage.getItem('userId');
	console.log(userId)
	$.ajax({
        type: 'get',
        dataType: 'json',
        url: 'http://172.33.10.66/ApiManagementSystem/team/userTeam',
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
}
function loadGroup(){
    var display = document.getElementById("display2");
	var newdiv = document.createElement("div");
	var name = document.createElement("div");
	name.style.cssText = "width: 250px;height: 50px;margin-left: 10px;margin-top: 10px;letter-spacing: 5px;color: #666;";
	newdiv.appendChild(name);
	var h1 = document.createElement("h5");
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

	var a4 = document.createElement("a");
	a4.style.cssText = "margin-left: 30px;margin-right: 30px;color: #169BD5;float: right;";
	a.appendChild(a4);
	a4.setAttribute("href","javascript:void(0)");  
    var a4Text = document.createTextNode("删除");  
	a4.appendChild(a4Text);      
	newdiv.setAttribute("id","block");
	newdiv.setAttribute("class","block");
	display.appendChild(newdiv);
}