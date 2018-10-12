function jump() {
	window.location.href=("createAPI.html");
}
function goPage(pno, psize) {
    var itable = document.getElementById("table_result");//通过ID找到表格
    var num = itable.rows.length;//表格所有行数(所有记录数)
    var totalPage = 0;//总页数
    var pageSize = psize;//每页显示行数
        //总共分几页
    if (num / pageSize > parseInt(num / pageSize)) {
        totalPage = parseInt(num / pageSize) + 1;
    } 
    else {
        totalPage = parseInt(num / pageSize);
    }
    var currentPage = pno;//当前页数
    var startRow = (currentPage - 1) * pageSize + 1;//开始显示的行  1
    var endRow = currentPage * pageSize;//结束显示的行   15
    endRow = (endRow > num) ? num : endRow;
    //遍历显示数据实现分页
    for (var i = 1; i < (num + 1); i++) {
        var irow = itable.rows[i - 1];
        if (i >= startRow && i <= endRow) {
            irow.style.cssText = "display：block;";
        }
        else {
            irow.style.display = "none";
        }
    }
    var tempStr = "";
    if (currentPage > 1) {
        tempStr += "<a href=\"#\" onClick=\"goPage(" + (currentPage - 1) + "," + psize + ")\"><上一页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>"
        for (var j = 1; j <= totalPage; j++) {
            tempStr += "<a href=\"#\" onClick=\"goPage(" + j + "," + psize + ")\">" + "<span class='current'>" + j + "</span>" + "&nbsp;&nbsp;&nbsp;</a>";
        }
    } 
    else {
        tempStr += "<上一页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        for (var j = 1; j <= totalPage; j++) {
            tempStr += "<a href=\"#\" onClick=\"goPage(" + j + "," + psize + ")\">" + "<span class='current'>" + j + "</span>" + "&nbsp;&nbsp;&nbsp;</a>"
        }
    }
    if (currentPage < totalPage) {
        tempStr += "<a href=\"#\" onClick=\"goPage(" + (currentPage + 1) + "," + psize + ")\">下一页>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>";
        for (var j = 1; j <= totalPage; j++) {
        }
    } 
    else {
        tempStr += "  下一页>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        for (var j = 1; j <= totalPage; j++) {
        }
    }
    document.getElementById("barcon").innerHTML = tempStr + "总共" + num +"页";
}
var url,method,interfaceName,json,interfaceId;
function ajax(){
    var h3 = document.getElementById('h3');
    var span3 = document.getElementById('span3');
    var dizhi = document.getElementsByClassName('span4')[0];
    var projectId = sessionStorage.getItem('p');
    var projetName = sessionStorage.getItem('N');
    var description = sessionStorage.getItem('d');
    var address = sessionStorage.getItem('address');
    h3.innerHTML = projetName;
    span3.innerHTML = description;
    dizhi.innerHTML = address;
    console.log(projectId,description,projetName,address);
    $.ajax({
        type:"get",
        dataType:"json",
        url:'http://172.33.10.66:8081/ApiManagementSystem/interface/projectInterface',
        contentType:"appliction/json",
        data:{
            "projectId":projectId,
            "pageNum":1,
            "pageSize":4,
        },
        success:function(result){
            var backdata = result.data;
            var len = backdata.length;
            if(result.status == 200){
                for(var i=0;i<len;i++){
                    interfaceId = backdata[i].interfaceId;
                    console.log(interfaceId)
                    interfaceName = backdata[i].interfaceName;
                    method = backdata[i].method;
                    url = backdata[i].url;
                    json =backdata[i].json;
                    var outPut="";
                    outPut += `
                    <td>
                    <ul>
                    <li><a href='javascript:void(0)' onclick='del_shop(this,interfaceId)'>删除</a></li>
                    <li><a href='javascript:void(0)'>克隆</a></li>
                    <li><a href='javascript:void(0)'>下载</a></li>
                    <li><a href='changeAPI.html' onclick = "jump2(interfaceId)">编辑</a></li>
                    </ul>
                    </td>  
                    `;
                    var tr = document.getElementById("table_result").insertRow(1);
                    var td1=tr.insertCell(0);
                    td1.innerText=interfaceName;
                    var td2=tr.insertCell(1);
                    td2.innerText=method;
                    var td3=tr.insertCell(2);
                    td3.innerHTML="<a href='url'>"+url+"</a>";
                    var td4=tr.insertCell(3);
                    td4.innerHTML = outPut;
                }
            }
        },
        error:function(result){
            alert("页面错误");
        },
    })
}
function del_shop(cell,interfaceId){//删除商品
    console.log(interfaceId)
    $.ajax({
        type:"delete",
        dataType:"json",
        contentType:"appliction/json",
        url:"http://172.33.10.66:8081/ApiManagementSystem/interface/"+interfaceId,
        success:function(result){
            var backdata = result.data
            if(result.status==200){
                location.reload(true);
            }
        },
        error:function(result){
            alert("页面错误");
        },
    })
}
function jump2(interfaceId){
    sessionStorage.setItem('interfaceId', interfaceId);
    console.log(interfaceId);

}