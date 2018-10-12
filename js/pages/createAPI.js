var projectId
function ajax(){
	projectId = sessionStorage.getItem('p');
	console.log(projectId);
}
function check_name(){
	var mc = document.getElementById('mingcheng').value;
	var comfirm1 = document.getElementById("comfirm1");
	comfirm1.innerHTML = "";
	if (mc=="") {
		comfirm1.innerHTML = "请输入名称".fontcolor("red");
	}
	else if(mc.length>10){
		comfirm1.innerHTML = "名称不得超过10字".fontcolor("red");
	}
}
function check_url(){
	var url = document.getElementById("url").value;
	var comfirm2 = document.getElementById("comfirm2");
	comfirm2.innerHTML = "";
	if (url == "") {
		comfirm2.innerHTML = "请输入url".fontcolor("red");
	}
}
function check_des(){
	var des = document.getElementById("miaoshu").value;
	var comfirm3 = document.getElementById("comfirm3");
	comfirm3.innerHTML = "";
	if (des.length>=15) {
		comfirm3.innerHTML = "描述不得超过15字".fontcolor("red");
	}
}
function reset(){
	document.getElementById('mingcheng').value = "";
	document.getElementById("comfirm1").innerHTML = "";
	document.getElementById("url").value = "";
	document.getElementById("comfirm2").innerHTML="";
	document.getElementById("miaoshu").value = "";
	document.getElementById("comfirm3").innerHTML = "";
}
function chuangjian(){
	var obj=document.getElementById('mySelect');
	var index=obj.selectedIndex; //序号，取当前选中选项的序号
	var interfaceName = document.getElementById('mingcheng').value;
	var method = obj.options[index].value;
	var description = document.getElementById("miaoshu").value;
	var url = document.getElementById("url").value;
	var json = document.getElementById("text").value;
	$.ajax({
		type:"post",
		dataType:"json",
		url:"http://172.33.10.66:8081/ApiManagementSystem/interface",
		data:{
			"interfaceName":interfaceName,
			"method":method,
			"description":description,
			"method":method,
			"json":json,
			"url":url,
			"projectId":projectId,
		},
		success:function(result){
			var backdata = result;
			if (backdata.status==200) {
				alert("创建成功");
				window.location.href = 'project1.html';
			}
			else{
				alert(result.message)
			}

		},
		error:function(result){
			alert("页面错误");
		},
	})  
}