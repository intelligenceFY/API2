onload=ajax(),ajax2();
// onload=ajax2();
function ajax(){
	var userId = localStorage.getItem('userId');
    console.log(userId);
	console.log(userId);
	$.ajax({
        type: 'get',
        dataType: 'json',
        url: 'http://125.81.59.65:8081/ApiManagementSystem/project/user',
        data: {
            "userId":userId,
        },
		success: function ( data ) {
        	var len = data.data.length;
        	console.log(data)
        	var backdata = data.data;
        	if(data.status == 200){
                var display = document.getElementById("display1");
                if (len==0) {
                    display1.innerHTML="暂时没有团队，进入我的团队创建".fontcolor("#666");
                }
        		else{
                    var zhankai = document.createElement("a");
                    zhankai.setAttribute("href","myproject.html");
                    zhankai.setAttribute("id","oldEle");
                    var dianji =document.createTextNode("点击展开");
                    display.appendChild(zhankai);
                    zhankai.appendChild(dianji);
                    zhankai.style.cssText="float:right;";
                    console.log(backdata);
                    for(i = 0;i<len;i++){
                        var projectId = backdata[i].projectId;
                        var address=backdata[i].address;
                        var projectName = backdata[i].projectName;
                        var description = backdata[i].description;
                        loadproject(projectId,projectName,description,address);
                    }
                }
        		
            }
        },
		error: function (data) {
			alert('errorr');
        }
    })
}

function ajax2(){
	var userId = localStorage.getItem('userId');
	console.log(userId)
	$.ajax({
        type: 'get',
        dataType: 'json',
        url: 'http://125.81.59.65:8081/ApiManagementSystem/team/userTeam',
        data: {
            "userId":userId,
        },
		success: function ( data ) {
        	var len = data.data.length;
        	var backdata = data.data;
        	if(data.status == 200){
        		var display = document.getElementById("display2");
        		if (len==0) {
                    display2.innerHTML="暂时没有团队，进入我的团队创建".fontcolor("#666");
                }
                else{
                    var zhankai = document.createElement("a");
                    zhankai.setAttribute("href","myproject.html");
                    zhankai.setAttribute("id","oldEle");
                    var dianji =document.createTextNode("点击展开");
                    zhankai.style.cssText="float:right;";
                    display.appendChild(zhankai);
                    zhankai.appendChild(dianji);
                    for(i = 0;i<len;i++){
                        var tId = backdata[i].teamId;
                        var teamName = backdata[i].teamName;
                        var description = backdata[i].description;
                        loadGroup(tId,teamName,description);
                    }

                }
                
            }
        },
		error: function (data) {
			alert('error');
        }
    })
}
function loadproject(projectId,projectName,description,address){
		var display = document.getElementById("display1");
		var newdiv = document.createElement("div");
		var thumbnail = document.createElement("div");
        newdiv.setAttribute("class","col-lg-3 col-md-4 col-xs-7 clo-sm-6");
        thumbnail.setAttribute("class","thumbnail");
        newdiv.appendChild(thumbnail);
		thumbnail.style.cssText = "min-height: 160px;margin-top:40px;";
		newdiv.appendChild(thumbnail);
        var main = document.createElement("div");
        main.setAttribute("class","row");
        main.setAttribute("id","main");
        thumbnail.appendChild(main);

		var information1 = document.createElement("div");
        information1.setAttribute("class","col-md-12 information1");
        information1.style.cssText = "padding: 10px 14px;float: left;"
        main.appendChild(information1);

        var number = document.createElement("span");
        number.setAttribute("class","number");
		information1.appendChild(number);
        var img = document.createElement("img");
        img.src = "../images/bianhao.png";
        number.style.cssText=" font-size: 0.7em;color: #666;vertical-align:bottom; float: left;margin-left: 10px;" 
        number.appendChild(img);
        var num = document.createTextNode(" " + projectId);
        number.appendChild(num);

        var trash = document.createElement("span");
        trash.setAttribute("class","glyphicon glyphicon-trash");
        trash.style.cssText = "margin-right: 10px;float: right;cursor: pointer;"
        var pencil = document.createElement("span");
        pencil.style.cssText = "cursor: pointer;margin-right: 15px;float: right;"
        pencil.setAttribute("class","glyphicon glyphicon-pencil");
        information1.appendChild(trash);
        information1.appendChild(pencil);
        
        var information2 = document.createElement("div");
        information2.style.cssText = "float: left;"
		information2.setAttribute("class","col-md-12 information2");
        main.appendChild(information2);
        var mingchen1 = document.createElement("a");
        mingchen1.style.cssText="color:#0090FF;font-size: 0.7em;float: left;margin-left: 10px;display: inline-block;"
        information2.appendChild(mingchen1);
        var mingchen2 = document.createElement("span");
        mingchen1.appendChild(mingchen2);
        var mingchen3 = document.createElement("img");
        mingchen3.src = "../images/name_16.png";
        texx=document.createTextNode(" " + projectName);
        mingchen2.appendChild(mingchen3); 
        mingchen2.appendChild(texx);

		var caption = document.createElement("div");
        caption.style.cssText = "margin-bottom: 30px;";
        main.appendChild(caption);
		var btn = document.createElement("button");
        btn.setAttribute("class","btn btn-info");
		btn.setAttribute("id","dbtn");
		btn.innerHTML = "查看个人项目";
		btn.style.cssText = "margin-top: 40px;font-size: 0.6em;";
		caption.appendChild(btn);
		display1.appendChild(newdiv);
	}

function loadGroup(tId,teamName,description){
		var display = document.getElementById("display2");
		var newdiv = document.createElement("div");
		var thumbnail = document.createElement("div");
        newdiv.setAttribute("class","col-lg-3 col-md-4 col-xs-7 clo-sm-6");
        thumbnail.setAttribute("class","thumbnail");
        newdiv.appendChild(thumbnail);
		thumbnail.style.cssText = "min-height: 160px;margin-top:40px;";
		newdiv.appendChild(thumbnail);
        var main = document.createElement("div");
        main.setAttribute("class","row");
        main.setAttribute("id","main");
        thumbnail.appendChild(main);

		var information1 = document.createElement("div");
        information1.setAttribute("class","col-md-12 information1");
        information1.style.cssText = "padding: 10px 14px;float: left;"
        main.appendChild(information1);

        var number = document.createElement("span");
        number.setAttribute("class","number");
		information1.appendChild(number);
        var img = document.createElement("img");
        img.src = "../images/bianhao.png";
        number.style.cssText=" font-size: 0.7em;color: #666;vertical-align:bottom; float: left;margin-left: 10px;" 
        number.appendChild(img);
        var num = document.createTextNode(" " + tId);
        number.appendChild(num);

        var trash = document.createElement("span");
        trash.setAttribute("class","glyphicon glyphicon-trash");
        trash.style.cssText = "margin-right: 10px;float: right;cursor: pointer;"
        var pencil = document.createElement("span");
        pencil.style.cssText = "cursor: pointer;margin-right: 15px;float: right;"
        pencil.setAttribute("class","glyphicon glyphicon-pencil");
        information1.appendChild(trash);
        information1.appendChild(pencil);
        pencil.onclick=function(){
            window.location.href='myproject.html';
        }
        var information2 = document.createElement("div");
        information2.style.cssText = "float: left;"
		information2.setAttribute("class","col-md-12 information2");
        main.appendChild(information2);
        var mingchen1 = document.createElement("a");
        mingchen1.style.cssText="color:#0090FF;font-size: 0.7em;float: left;margin-left: 10px;display: inline-block;"
        information2.appendChild(mingchen1);
        var mingchen2 = document.createElement("span");
        mingchen1.appendChild(mingchen2);
        var mingchen3 = document.createElement("img");
        mingchen3.src = "../images/name_16.png";
        texx=document.createTextNode(" " + teamName);
        mingchen2.appendChild(mingchen3); 
        mingchen2.appendChild(texx);

		var caption = document.createElement("div");
        caption.style.cssText = "margin-bottom: 30px;";
        main.appendChild(caption);
		var btn = document.createElement("button");
        btn.setAttribute("class","btn btn-info");
		btn.setAttribute("id","dbtn");
		btn.innerHTML = "查看团队项目";
		btn.style.cssText = "margin-top: 40px;font-size: 0.6em;";
		caption.appendChild(btn);
		 display2.appendChild(newdiv);
}