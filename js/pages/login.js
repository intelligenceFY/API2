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
}

function x(){
	var username = document.getElementsByName('username')[0].value;
	var password = document.getElementsByName('password')[0].value;

	

 		$.ajax({
        	type: 'post',
        	dataType: 'json',
        	url: 'http:/125.81.59.65:8081/ApiManagementSystem/user/login',
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




