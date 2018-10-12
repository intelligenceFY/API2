function check(obj,info,sp,fun){
	obj.onfocus = function(){
		this.placeholder = '';
	}

	obj.onblur = function(){
		this.placeholder = info;
		if (fun(this.value)){
			obj.style["border-color"]= 'green';
			sp.className = "stats3";			
			sp.innerText = "✔";
		}
		else{
			obj.style["border-color"]= '#D85C74';
			sp.className = "stats2";
			sp.innerHTML = "×";
		}
	}
}

onload = regs;

function regs(){
	localStorage.clear();
	var username = document.getElementsByName('username')[0];
	var password = document.getElementsByName('password')[0];
	var sp1 = document.getElementById('123');

	check(username,"请输入用户名",sp1,function(value){
		if(username.value.match(/^\S+$/) && username.value.length >= 3 && username.value.length <= 20)
			return true;
		else
			return false;
	});

	// var denglu = document.getElementById('denglu');
	// denglu.onclick = function(){
 //    	var xmlhttp;
	// 	var data = {
	// 		"userName":username,
	// 		"password":password,
	// 	};
	// 	var outstr="";
	// 	var oStr = '';
	// 	data = (function(value){
	// 	　for(var key in value){
	// 	　　oStr += key+"="+value[key]+"&";
	// 	　};
	// 	　return oStr;
	// 	}(data));
 //    	if (window.XMLHttpRequest) {
 //        	xmlhttp = new XMLHttpRequest({mozSystem:true, mozAnon: true});
 //    	} 
 //    	else {
 //        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
 //    	}
 //    	if(xmlhttp != null){
 //    		xmlhttp.open("POST", "http://172.22.1.219:8081/ApiMockSystem/user", true);
 //    		xmlhttp.setRequestHeader("content-Type","application/x-www-form-urelencoded");
 //    		xmlhttp.onreadystatechange = function () {    		
 //        			if(xmlhttp.readyState == 4){
 //        				if (xmlhttp.status == 200){
 //        				var result = xmlhttp.responseText;
 //        				if(result.status == 200){
 //        					alert('登录成功');
 //            				window.location.href='zhuye.html'
 //        				}
 //            			else{
 //            				alert("no");
 //            			}
 //        			}
 //        		} 
 //    	}
 //    	xmlhttp.send(data);
 //    	};   
	// }
}

function x(){
	var username = document.getElementsByName('username')[0].value;
	var password = document.getElementsByName('password')[0].value;

	

 		$.ajax({
        	type: 'post',
        	dataType: 'json',
        	url: 'http://172.33.10.66:8081/ApiManagementSystem/user/login',
        	data: {
            	"userName":username,
				"password":password,
        	},
			success: function ( json ) {
				if(json.status == 200){
        			alert('登录成功');
        			console.log(json);
        			localStorage.setItem('userId',json.data);
        			window.location.href='zhuye.html'
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




