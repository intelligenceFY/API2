//jscs:disable
(function () {
//jscs:enable
//'use strict'
let cssArr = document.getElementsByTagName('script');
let { path, cssPath, headTitle, temp, cssName } = '';
for (let i in cssArr) {
  cssName = cssArr[i].getAttribute('data-css');
  headTitle = cssArr[i].getAttribute('data-title');
  if (cssName != null && cssName != undefined) {
    cssPath = '<link rel="stylesheet" href = "./../css/pages/' + cssName + '.css">';
    break;
  };
};

path = cssPath + '<link rel="stylesheet" href = "./../css/module/header.css">'
+ '<link rel="stylesheet" href = "./../css/module/footer.css">'+'<link rel="stylesheet" type="text/css" href="../lib/bootstrap/css/bootstrap.min.css">'+'<link rel="stylesheet" type="text/css" href="../lib/bootstrap/css/nav.css">';

const html = '<!DOCTYPE html>' +
'<html lang="en">' +
'<head>' +
'<meta charset="UTF-8">' +
'<meta http-equiv="X-UA-Compatible" content="IE=edge">' +
'<meta name="viewport" content="width=device-width, initial-scale=1">' +
'<title>' + headTitle + '</title>' +
path +
'<script src="../js/lib/jquery-3.1.1.min.js"></script>' +
'<script src="../js/pages/' + cssName + '.js"></script>' +
'</head>';
const headerTpl = () => {
    /*
	<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		<div class="container">
			<a href="#" class="navbar-brand"><strong class="pagename">API Management</strong></a>
			<ul class="nav navbar-nav navbar-left">
				<li><a href="my_group.html">我的团队</a></li>
				<li><a href="myproject.html">我的项目</a></li>
				<li><a href="">教程</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    个人中心 <b class="caret"></b>
                </a>
                <ul class="dropdown-menu">
                    <li><a href="introduction.html">我的资料</a></li>
                    <li><a href="myproject.html">我的项目</a></li>
                </ul>
				</li>
				<li><a href="xiaoxi.html">消息<span class="glyphicon glyphicon-bell"></span></a></li>
			</ul>
			<form class="navbar-form navbar-right">
				<input type="text" placeholder="输入搜索项目名称" class="form-control">
				<button type="submit" >
					<span class="glyphicon glyphicon-search"></span>
				</button>
			</form>
		</div>
	</nav>
    */
  };

//jscs:disable
const header = html + headerTpl.toString().replace(/^[^\/]+\/\*!?/, '').replace(/\*\/[^\/]+$/, '');
//jscs:enable
document.write(header);


})();
