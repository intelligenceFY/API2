function deleteDiv(obj,delete1){
    delete1.addEventListener('click',function(){
    if (obj != null)
        obj.parentNode.removeChild(obj);
    });
}

function deleteButton(obj){
    if (obj != null)
        obj.parentNode.removeChild(obj);
}

//删除消息
function deletexiaoxi(){
    var myajax;
    if (window.XMLHttpRequest) {
        myajax = new XMLHttpRequest();
    } 
    else {
        myajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(myajax != null){
        myajax.open("DELETE", "http://rap2api.taobao.org/app/mock/12472//message", true);
        myajax.onreadystatechange = function () {
            if (myajax.status == 200){
                if(myajax.readyState == 4){
                    var info = myajax.responseText;
                    info.data = {};
                }
            } 
            else{
                alert('页面有异常,刷新重试');
            }
        }
        myajax.send();
    };
}

//增加消息，被邀请
function add1(obj1,obj2){
    var yidu = document.getElementsByClassName("yidu");
    var weidu = document.querySelectorAll('.weidu');
    var delete1 = document.getElementsByClassName('delete1');
    var agree = document.querySelectorAll('.agree');
    var tishi1 = document.querySelectorAll('.tishi1');
    var refuse = document.querySelectorAll('.refuse');
    var box2 = document.getElementsByClassName('box2');

    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } 
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(xmlhttp != null){
        xmlhttp.open("POST", "http://rap2api.taobao.org/app/mock/12472//message", true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.status == 200){
                if(xmlhttp.readyState == 4){
                    var newDiv = document.createElement('div');
                    newDiv.className = 'weidu';
                    weidu[0].parentNode.insertBefore(newDiv,weidu[0]);
                    var newSpan = document.createElement('span');
                    newSpan.innerHTML = obj1+"邀请你加入团队"+obj2;
                    newDiv.appendChild(newSpan);
                    var newButton1 = document.createElement('button');
                    newButton1.className = 'agree';
                    newButton1.innerHTML = '同意';
                    newDiv.appendChild(newButton1);
                    var newButton2 = document.createElement('button');
                    newButton2.className = 'refuse';
                    newButton2.innerHTML = '拒绝';
                    newDiv.appendChild(newButton2);
                    deleteDiv(newDiv,newButton1);
                    deleteDiv(newDiv,newButton2);

                    function onclick2(info){
                        read();
                        deleteButton(newButton1);
                        deleteButton(newButton2);
                        var newDiv2 = document.createElement('div');
                        newDiv2.className = 'yidu';
                        yidu[0].parentNode.insertBefore(newDiv2,yidu[0]);
                        var newSpan2 = document.createElement('span');
                        newSpan2.innerHTML = newSpan.innerHTML;
                        newDiv2.appendChild(newSpan2);
                        var newSpan3 = document.createElement('span');
                        newSpan3.className = 'tishi'
                        newSpan3.innerHTML = info;
                        newDiv2.appendChild(newSpan3);
                        var newButton3 = document.createElement('button');
                        newButton3.className = 'delete1';
                        newButton3.innerHTML = '删除';
                        newDiv2.appendChild(newButton3);
                        deleteDiv(newDiv2,newButton3);
                        newButton3.onclick = function(){deletexiaoxi();}
                        
                        var box1 = document.getElementsByClassName('box1');
                        if(box1[0].offsetHeight == 0){
                        var text = document.createElement('span');
                        box1[0].appendChild(text);
                        text.innerHTML = "你暂时没有未读消息";
                        }
                    }

                    newButton1.onclick = function(){
                        onclick2("已同意");
                    }
                    newButton2.onclick = function(){
                        onclick2("已拒绝");
                    }
                }
            } 
            else{
                alert('页面有异常,刷新重试');
            }
        }
        xmlhttp.send(null);
    }; 
}

//增加消息，加入团队
function add2(obj1,obj2){
    var yidu = document.getElementsByClassName("yidu");
    var weidu = document.querySelectorAll('.weidu');
    var delete1 = document.getElementsByClassName('delete1');
    var agree = document.querySelectorAll('.agree');
    var tishi1 = document.querySelectorAll('.tishi1');
    var refuse = document.querySelectorAll('.refuse');
    var box2 = document.getElementsByClassName('box2');

    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } 
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(xmlhttp != null){
        xmlhttp.open("POST", "http://rap2api.taobao.org/app/mock/12472//message", true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.status == 200){
                if(xmlhttp.readyState == 4){
                    var newDiv = document.createElement('div');
                    newDiv.className = 'weidu';
                    weidu[0].parentNode.insertBefore(newDiv,weidu[0]);
                    var newSpan = document.createElement('span');
                    newSpan.innerHTML = obj1+"请求加入你的团队"+obj2;
                    newDiv.appendChild(newSpan);
                    var newButton1 = document.createElement('button');
                    newButton1.className = 'agree';
                    newButton1.innerHTML = '同意';
                    newDiv.appendChild(newButton1);
                    var newButton2 = document.createElement('button');
                    newButton2.className = 'refuse';
                    newButton2.innerHTML = '拒绝';
                    newDiv.appendChild(newButton2);
                    deleteDiv(newDiv,newButton1);
                    deleteDiv(newDiv,newButton2);

                    function onclick2(info){
                        read();
                        deleteButton(newButton1);
                        deleteButton(newButton2);
                        var newDiv2 = document.createElement('div');
                        newDiv2.className = 'yidu';
                        yidu[0].parentNode.insertBefore(newDiv2,yidu[0]);
                        var newSpan2 = document.createElement('span');
                        newSpan2.innerHTML = newSpan.innerHTML;
                        newDiv2.appendChild(newSpan2);
                        var newSpan3 = document.createElement('span');
                        newSpan3.className = 'tishi'
                        newSpan3.innerHTML = info;
                        newDiv2.appendChild(newSpan3);
                        var newButton3 = document.createElement('button');
                        newButton3.className = 'delete1';
                        newButton3.innerHTML = '删除';
                        newDiv2.appendChild(newButton3);
                        deleteDiv(newDiv2,newButton3);
                        newButton3.onclick = function(){deletexiaoxi();}
                        
                        var box1 = document.getElementsByClassName('box1');
                        if(box1[0].offsetHeight == 0){
                        var text = document.createElement('span');
                        box1[0].appendChild(text);
                        text.innerHTML = "你暂时没有未读消息";
                        }
                    }

                    newButton1.onclick = function(){
                        onclick2("已同意");
                    }
                    newButton2.onclick = function(){
                        onclick2("已拒绝");
                    }
                }
            } 
            else{
                alert('页面有异常,刷新重试');
            }
        }
        xmlhttp.send(null);
    }; 
}

//读消息
function read(){
    var myajax;
    if (window.XMLHttpRequest) {
        myajax = new XMLHttpRequest();
    } 
    else {
        myajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(myajax != null){
        myajax.open("GET", "http://rap2api.taobao.org/app/mock/12472//message", true);
        myajax.onreadystatechange = function () {
            if (myajax.status == 200){
                console.log(myajax.status);
                if(myajax.readyState == 4){
                        console.log(myajax.responseText);
                }                        
            }
            else{
                    alert('页面有异常,刷新重试');
            }
        };
        myajax.send();
    }
}
    

onload = abc;

function abc(){
    var yidu = document.getElementsByClassName("yidu");
    var weidu = document.querySelectorAll('.weidu');
    var delete1 = document.getElementsByClassName('delete1');
    var agree = document.querySelectorAll('.agree');
    var tishi1 = document.querySelectorAll('.tishi1');
    var refuse = document.querySelectorAll('.refuse');
    var box2 = document.getElementsByClassName('box2');

    var loading = document.getElementsByClassName('loading');
    var static = 1;
    loading[0].onclick = function(){
        if(static == 1){
            box2[0].style.cssText = "overflow: visible; max-height: 100%;";
            loading[0].innerHTML = "收起消息";
            static = 0;
        }
        else{
            box2[0].style.cssText = "overflow: hidden; max-height: 120px;";
            loading[0].innerHTML = "加载更多";
            static = 1;
        }       
    }
//显示消息列表
    var myajax;
    if (window.XMLHttpRequest) {
        myajax = new XMLHttpRequest();
    } 
    else {
        myajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if(myajax != null){
        myajax.open("GET", "http://rap2api.taobao.org/app/mock/12472//message/userMessage", true);
        myajax.onreadystatechange = function () {
            if (myajax.status == 200){
                if(myajax.readyState == 4){
                    var info = JSON.parse(myajax.responseText);
                    for(i=0;i<info.data.length;i++){
                        add1(info.data[i].userName,info.data[i].teamName);
                        add2(info.data[i].userName,info.data[i].teamName);
                    }                      
                }
            }
            else{
                alert('页面有异常,刷新重试');
            }
        }
        myajax.send();
      };
}  