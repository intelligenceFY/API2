
function ajax(){
	var url = sessionStorage.getItem('url');
	console.log(url);

   $.ajax({
       type:"get",
        dataType:"json",
        // data:json,
        url:"http://125.81.59.65:8081/ApiManagementSystem/interface/url/"+url,
         success:function(result){
            var backdata = result.data;
            if(result.status==200){
                console.log(backdata);
                var display = document.getElementById('display');
                display.innerHTML=backdata;
            }
        },
        error:function(result){
            alert("页面错误");
        },
    })
}