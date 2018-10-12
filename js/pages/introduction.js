onload = aaa;

function aaa(){
    var item = document.getElementsByClassName('t');
    var userId = localStorage.getItem('userId');
    console.log(userId);
    // var xmlhttp;
    // if (window.XMLHttpRequest) {
    //     xmlhttp = new XMLHttpRequest();
    // } 
    // else {
    //     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    // }
    // if(xmlhttp != null){
    //     xmlhttp.open("GET", "http://rap2api.taobao.org/app/mock/12472//user", true);
    //     xmlhttp.onreadystatechange = function () {
    //         if (xmlhttp.status == 200){
    //             if(xmlhttp.readyState == 4){
    //                 var info = JSON.parse(xmlhttp.responseText);
    //                 item[0].innerHTML = info.data.userName;
    //                 item[5].innerHTML = info.data.email;
    //                 item[4].innerHTML = info.data.phone_number;
    //                 item[2].innerHTML = info.data.sex;
    //                 item[3].innerHTML = info.data.introduction;
    //                 abc();
    //             }
    //         } 
    //         else{
    //             alert('页面有异常');
    //         }
    //     }
    //     xmlhttp.send(null);
    //}; 
    

        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: 'http://172.33.10.66:8081/ApiManagementSystem/user',
            data: { 
                userId:userId,
            },
            success: function ( json ) {
                console.log(json);
                item[0].innerHTML = json.data.userName;
                item[5].innerHTML = json.data.email;
                item[4].innerHTML = json.data.phone_number;
                item[2].innerHTML = json.data.sex;
                item[3].innerHTML = json.data.introduction;
                abc();
            },
            error: function (json) {
                alert('error');
            }
        })

    var exit = document.getElementsByClassName('exit');
    exit[0].onclick = function closeDiv(){
    var Idiv=document.getElementById('alert');
    Idiv.style.display="none";    
    document.body.style.overflow = "auto";
    var body = document.getElementsByTagName("body");
    body[0].removeChild(mybg);
    } 
}

function abc(){
    var statu = 0;
    var edit = document.getElementById('click');
    var change = document.getElementById('change');
    var item = document.getElementsByClassName('t');
    var item_length = item.length-1;
    var item_value = new Array(item_length);
             
    for(i = 0; i <= item_length; i++){
        item_value[i] = item[i].innerHTML;
    }
             
    edit.onclick =function(){
        if(statu == 0){
    		edit.innerHTML= '确认修改';
            change.innerHTML = '取消修改';
        	for(i = 0; i <= item_length; i++){
                item[i].innerHTML = '<input type="txt" class="item_input" value="'+item_value[i]+'">';
            }
            statu = 1;          
        }
        else{
            change.innerHTML = '注销账号';
            edit.innerHTML= '修改资料';
            var item_input = document.getElementsByClassName('item_input');
            for(i = 0; i <= item_length; i++){
                item_value[i] = item_input[i].value;
            }
            for(i = 0; i <= item_length; i++){
                item[i].innerHTML = item_value[i];
            }

            // var xmlhttp;
            // if (window.XMLHttpRequest) {
            //     xmlhttp = new XMLHttpRequest();
            // } 
            // else {
            //     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            // }
            // if(xmlhttp != null){
            //     xmlhttp.open("PUT", "http://rap2api.taobao.org/app/mock/12472//user", true);
            //     xmlhttp.onreadystatechange = function () {
            //         if (xmlhttp.status == 200){
            //             if(xmlhttp.readyState == 4){
            //                 var info = JSON.parse(xmlhttp.responseText);
            //                 var user = {
            //                     userName:item[0].innerHTML,
            //                     password:item[1].innerHTML,
            //                     sex:item[2].innerHTML,
            //                     introduction:item[3].innerHTML,
            //                     phone_number:item[4].innerHTML,
            //                     email:item[5].innerHTML
            //                 }
            //                 info.data = user;
            //                 console.log(info.data);
            //             }
            //         } 
            //         else{
            //             alert('修改失败');
            //         }
            //     }
            //     xmlhttp.send(null);
            // }; 
            
            $.ajax({
            type: 'PUT',
            dataType: 'json',
            url: 'http://172.33.10.66:8081/ApiManagementSystem/user/'+userId,
            data: {
                "userName":item[0].innerHTML,
                "password":item[1].innerHTML,
                "sex":item[2].innerHTML,
                "introduction":item[3].innerHTML,
                "phone_number":item[4].innerHTML,
                "email":item[5].innerHTML
            },
            success: function ( json ) {
                alert("修改成功");
            },
            error: function (json) {
                alert('error');
            }
        })
            
            statu = 0
        }
    }

    change.onclick = function(){
        if(statu == 0){
            change.innerHTML = '注销账号';
            show(alert);  
        }
        else{
            edit.innerHTML= '修改资料';
            change.innerHTML = '注销账号';
            for(i = 0; i <= item_length; i++){
                item[i].innerHTML = item_value[i];
            }
            statu = 0;
        }
    }
}

function show(alert){
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
}

