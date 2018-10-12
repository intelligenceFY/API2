var interfaceName,method,description,json,url;

function ajax(){
	var btlogin2 = document.getElementById('login_click1');
	btlogin2.style.display = 'none';
	var Id = sessionStorage.getItem('interfaceId');
    var options = document.getElementById('mySelect').children;
	var td1 = document.getElementsByTagName('td')[1];
	var td2 = document.getElementsByTagName('td')[3];
	var td3 = document.getElementsByTagName('td')[5];
	var td4 = document.getElementsByTagName('td')[7];
	var text = document.getElementsByTagName('textarea')[0];
	var bt = document.getElementById("btlogin");
	$.ajax({
		type:"get",
		dataType:'json',
		url:"http://172.33.10.66:8081/ApiManagementSystem/interface/"+Id,
		contentType:"application/json",
		success:function(result){
			console.log(result);
			if(result.status==200){
				interfaceName = result.data.interfaceName;
				method = result.data.method;
				description = result.data.description;
				json = result.data.json;
				url = result.data.description;
				td1.innerHTML = interfaceName;
				td3.innerHTML = url;
				td4.innerHTML = description;
				text.innerHTML = json;
				if(method == 'get'){
					options[0].selected=true;
				}
				else if(method == 'post'){
					options[1].selected=true;
				}
				else if(method == 'put'){
					options[2].selected=true;
				}
				else{
					options[3].selected = true;
				}
			}
			
			
		},
		error:function(){
			alert("页面错误");
		},
	})
}
function genxin(method,description,url,json,interfaceName){
	var td1 = document.getElementsByTagName('td')[1];
	var td1_value = td1.innerHTML;
	var td2 = document.getElementsByTagName('td')[3];
	var td3 = document.getElementsByTagName('td')[5];
	var td3_value = td3.innerHTML;
	console.log(td3_value)
	var td4 = document.getElementsByTagName('td')[7];
	var td4_value = td4.innerHTML;
	var text = document.getElementsByTagName('textarea')[0];
	var bt = document.getElementById("btlogin");
	td1.innerHTML = '<input type="txt" class="item_input1" id="input1" value="'+td1_value+'">';
	td3.innerHTML = '<input type="txt" class="item_input2" id="input2" value="'+td3_value+'">';
	td4.innerHTML = '<input type="txt" class="item_input3" id="input3" value="'+td4_value+'">';
	var btlogin1 = document.getElementById('login_click2');
	var btlogin2 = document.getElementById('login_click1');
	btlogin1.style.display= 'none';
	btlogin2.style.display = 'block';
}
function queding(interfaceName,method,description,json,url){
	var x,y;
	var input1 = document.getElementById('input1').value;
	var input2 = document.getElementById('input2').value;
	var input3 = document.getElementById('input3').value;
	if(input1 ==''){
		alert('接口名称不能为空');
	}
	else if(input1.length>20){
		alert('接口名称过长');
	}
	else{
	  x = 1;
	}
	if(input2 ==''){
		alert('url不能为空');
	}
	else if(input2.length>10){
		alert('url过长');
	}
	else{
		y = 1;
	}
	if(x==1&&y==1){
		$.ajax({
		type:"put",
		dataType:"josn",
		url:"http://172.33.10.66:8081/ApiManagementSystem/interface/"+Id,
		data:{
			"interfaceName":interface,
			"method":method,
			"description":description,
			"url":url,
			"josn":josn,

		},
		success:function(json){
			console.log(josn);
			location.href = "project1.html";
		},
		error:function(json){
			alert("error");
		},
	})

	}
}