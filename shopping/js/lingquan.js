$(function(){


var name = $.query.get("name");
if(name != null){
	switch(name){
		case 'fuzhuang':
			$('#fuzuang').css('color','red');
			break;
		case 'muying':
			$('#muying').css('color','red');
			break;
		case 'huazhuangpin':
			$('#huazhuang').css('color','red');
			break;
		case 'jujia':
			$('#jujia').css('color','red');
			break;
		case 'xiebao':
			$('#xiebao').css('color','red');
			break;
		case 'meishi':
			$('#meishi').css('color','red');
			break;
		case 'wenti':
			$('#wenti').css('color','red');
			break;
		case 'shuma':
			$('#shuma').css('color','red');
			break;
	}
	fuZhuangFn(name);
}else{
	lingFn();
}

/**
 * 领券优惠直播
 */

function lingFn(){
	
	$.ajax({
		type:"get",
		url:"../../../product/GetProductsByPage_get?pagesize=24&pageindex=1&type=lingPro",
		success:function(result){
			var str = "";
			$.each(result, function(index,data) {
				var dataObj = eval("("+data.Data+")");
				
				str+="<dl class='zhidl redbor box' onclick=getId('"+dataObj.pid+"')>"; 
		    	str+="<dt><img src='"+dataObj.pimgsrc+"' /> </dt><dd>";	
		    	str+="<a href='#' class='tao'><i><img src='img/taobao.png' /></i>"+dataObj.pname+"</a>";		
		    	str+="<p class='youp'>优惠券<i>"+dataObj.pneibuquan+"</i>元，已有<b>"+dataObj.palreasale+"</b>人购买</p>";
		    	str+="<p class='sale'>券后价￥<b>"+dataObj.pxiaprice+"</b>元，正常售价<i>"+dataObj.psaleprice+"</i></p></dd></dl>";		
		    	
			});
			$("#indexZhiBox").html(str);
		},
		dataType:"json"
	});
function getId(id){
		var url = "/httpview/shopping/proDetail.html?id="+id;
	    window.location.href = url;
}
}


var $page = $("#page li");
for(var i = 1;i < $page.length-1;i++){
	$page.eq(i).click(function(){
		$("#indexZhiBox").html("");
		lingFn();

	})
}
$("#prev").click(function(){
	$("#indexZhiBox").html("");
	lingFn();
})
$("#next").click(function(){
	$("#indexZhiBox").html("");
	lingFn();
})
var txt = $("#txt").val();
$("#btn").click(function(){
	$("#indexZhiBox").html("");
	lingFn();
})

/**
 * 回到顶部
 */

$("#toTop").click(function(){
	$("body,html").animate({scrollTop:"0px"},1000);
});


/**
 * 页面跳转
 */


function fuZhuangFn(name){

	$.ajax({
		type:"get",
		url:"../../../product/GetProductsByPage_get?pagesize=12&pageindex=1&type="+name,
		success:function(result){
			var str = "";
			console.log(result)
			$.each(result, function(index,data) {
				var dataObj = eval("("+data.Data+")");
				console.log(dataObj)
				str+="<dl class='zhidl redbor box' onclick=getId('"+dataObj.pid+"')>"; 
		    	str+="<dt><img src='"+dataObj.pimgsrc+"' /> </dt><dd>";	
		    	str+="<a href='#' class='tao'><i><img src='img/taobao.png' /></i>"+dataObj.pname+"</a>";		
		    	str+="<p class='youp'>优惠券<i>"+dataObj.pneibuquan+"</i>元，已有<b>"+dataObj.palreasale+"</b>人购买</p>";
		    	str+="<p class='sale'>券后价￥<b>"+dataObj.pxiaprice+"</b>元，正常售价<i>"+dataObj.psaleprice+"</i></p></dd></dl>";		
		    	
			});
			$("#indexZhiBox").html(str);
		},
		dataType:"json"
	});
}
	
	
	
})
