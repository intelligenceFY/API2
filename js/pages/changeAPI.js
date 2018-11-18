var interfaceName,method,description,json,url;
var gengxin,sure,quxiao;
onload=ajax;
function ajax(){
	gengxin= document.getElementById('gengxin');
    var options = document.getElementById('mySelect');
	var Id = sessionStorage.getItem('interfaceId');

	var item = document.getElementsByClassName('t');
    var item_length = item.length-1;
    var item_value = new Array(2);

	var text = document.getElementsByTagName('textarea')[0];
	
	$.ajax({
		type:"get",
		dataType:'json',
		url:"http://125.81.59.65:8081/ApiManagementSystem/interface/"+Id,
		success:function(result){
			console.log(result);
			if(result.status==200){
				interfaceName = result.data.interfaceName;
				method = result.data.method;
				description = result.data.description;
				json = result.data.json;
				url = result.data.url;
				console.log(url);
				item[0].innerHTML = interfaceName;
				item[1].innerHTML = url;
				item[2].innerHTML = description;
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

				for(i = 0; i <= item_length; i++){
        			item_value[i] = item[i].innerHTML;
    			}
    
				var statu = 0;
				quxiao = document.getElementById("quxiao");
				gengxin.onclick = function(){
					if(statu == 0){
    					gengxin.innerHTML= '确定';
            			quxiao.style.display = "block";
        				for(i = 0; i <= item_length; i++){
                			item[i].innerHTML = '<input type="txt" class="item_input" value="'+item_value[i]+'">';
            			}
            			statu = 1;          
        			}
        			else{
        				gengxin.innerHTML = '更新';
            			quxiao.style.display = "none";
            			var item_input = document.getElementsByClassName('item_input');
            			for(i = 0; i <= item_length; i++){
              			item_value[i] = item_input[i].value;
            			}
           				for(i = 0; i <= item_length; i++){
                			item[i].innerHTML = item_value[i];
            			} 
            			console.log(item_value[0]+"jdl");
            			var interfaceName =item_value[0],method=method,description=item_value[2],url =item_value[1],json=text;
            			console.log(Id);
            			xiugai(interfaceName,method,description,url,json,Id);

          
            			statu = 0         
        			}
				}

				quxiao.onclick = function(){
        			gengxin.innerHTML = '更新';
        			quxiao.style.display = "none";
        			for(i = 0; i <= item_length; i++){
            			item[i].innerHTML = item_value[i];
        			}
        			statu = 0;
    			}
			}			
		},
		error:function(){
			alert("页面错误");
		},
	})	
}
function xiugai(interfaceName,method,description,url,json,Id){
  	$.ajax({
        processData: false,
		type:"put",
		dataType:"json",
		url:"http://125.81.59.65:8081/ApiManagementSystem/interface/"+Id,
		data:{
			"interfaceName":interfaceName,
			"method":method,
			"description":description,
			"url":url,
			"json":json,
		},
		success:function(json){
			if(status==200){
				alert(json.message);
				location.href = "project1.html";
			}
								
		},
		error:function(json){
			alert("error");
		},	
	})
}


