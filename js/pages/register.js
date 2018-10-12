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
	var username = document.getElementsByName('username')[0];
	var sp1 = document.getElementById('123');
	var password = document.getElementsByName('password')[0];
	var sp2 = document.getElementById('456');
	var repassword = document.getElementsByName('repassword')[0];
	var sp3 = document.getElementById('789');
	var email = document.getElementsByName('email')[0];
	var sp4 = document.getElementById('321');

	check(username,"请输入用户名",sp1,function(value){
		if(username.value.match(/^\S+$/) && username.value.length >= 3 && username.value.length <= 20)
			return true;
		else
			return false;
	});

	check(password,"请输入密码",sp2,function(value){
		if(password.value.match(/^\S+$/) && password.value.length >= 6 && password.value.length <= 20)
			return true;
		else
			return false;
	});

	check(repassword,"请确认密码",sp3,function(value){
		if(repassword.value.match(/^\S+$/) && repassword.value.length >= 6 && repassword.value.length <= 20 && repassword.value == password.value)
			return true;
		else
			return false;
	});

	check(email,"请输入邮箱",sp4,function(value){
		if(value.match(/\w+@\w+\.\w/))
			return true;
		else
			return false;
	}); 
}

function x(){
	var username = document.getElementsByName('username')[0].value;
	var password = document.getElementsByName('password')[0].value;
	var email = document.getElementsByName('email')[0].value;
	var repassword = document.getElementsByName('repassword')[0];
	if((username && password && repassword.value && email)!= '' && repassword.value == password){
		$.ajax({
        	type: 'post',
        	dataType: 'json',
        	url: 'http://172.33.10.66:8081/ApiManagementSystem/user',
        	data: {
            	"userName":username,
				"password":password,
				"email":email,
        	},
			success: function ( json ) {
				if(json.status == 200){
					alert('注册成功');
        			window.location.href='login.html'
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
 	else if(repassword.value != password){
 		alert('两次密码不一致');
 	}
 	else{
 		alert('信息不完整')
 	}
}
