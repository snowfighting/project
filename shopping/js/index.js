/**
 * 领券秒杀精选
 */
//indexFn();
//function indexFn(){
	function getId(id){
		var url = "/httpview/shopping/proDetail.html?id="+id;
	    window.location.href = url;
	}
	$.ajax({
		type:"get",
		url:"../../../product/GetProductsByPage_get?pagesize=6&pageindex=1&type=topPro",
		success:function(result){
			
			var str = "";
			for(var i = 0;i < result.length;i++){
				var data = eval("("+result[i].Data+")")
				console.log(data);
				str+="<dl class='miaodl redbor box' onclick=getId('"+data.pid+"')>";
	            str += "<dt><img src="+data.pimgsrc+" /></dt><dd>";
	            str += "<h2 class='miaoname'>"+data.pname+"</h2>";       
	            str +="<p class='miaotimer'>内部券<b>"+data.pneibuquan+"</b>元，过期时间 "+data.pdeadline+"</p>";        
	            str +="<p class='miaonum'>优惠券剩余<i>"+data.psurplus+"</i>张，已领取 "+data.preceive+" 张</p>";       
	             str +="<div class='miaoprice'><p class='xiadan'>下单价￥<b>"+data.pxiaprice+"</b></p> <p class='zaishou'>在售价￥"+data.psaleprice+"</p></div>";       
	             str +="<div class='liucheng'>";       
	            str +="<sapn class = 'buy'>购买流程：</sapn>";            
	            str +="<a class='dot'>点我领券</a>";            
	             str +="<span class='dayu'>&gt;</span>"           
	            str += "<a class='dot'>点击下单</a></div></dd></dl>";
	            
	            $('dl').click(function(){
	            	var url = "/httpview/shopping/proDetail.html?id="+data.pid;
	            	window.location.href = url;
	            })
			}
			$("#indexMiaoBox").append(str);
		},
		dataType:"json"
	});
	
	/**
	 * 精选特卖
	 */
	$.ajax({
		type:"get",
		url:"../../../product/GetProductsByPage_get?pagesize=4&pageindex=1&type=centerPro",
		success:function(result){
			var str = "";
			$.each(result, function(index,data) {
				var dataObj = eval("("+data.Data+")");
				
				str+='<dl class="tedl redbor box" onclick=getId("'+dataObj.pid+'")>'; 
		    	str+='<dt class="tedt"><img src="'+dataObj.pimgsrc+'" /> </dt>';
		    	str+='<dd class="tedd">';
		    	str+='<a href="#" class="tao"><i><img src="img/taobao.png" /></i>'+dataObj.pname+'</a>';
		    	str+='<p class="youpin"><b>￥'+dataObj.pxiaprice+'</b> <span>目前已售&nbsp;<i>'+dataObj.psurplus+'</i></span></p>';
		    	str+='<p class="qiang"><span>剩余'+dataObj.premadays+'天</span> <i>去抢购></i></p></dd></dl>';
		    	
		    	
	           
			});
			$("#indexTeBox").append(str);
		},
		dataType:"json"
	});
	
	/**
	 * 领券优惠直播
	 */
	$.ajax({
		type:"get",
		url:"../../../product/GetProductsByPage_get?pagesize=80&pageindex=1&type=bottomPro",
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
			$("#indexZhiBox").append(str);
			
		},
		dataType:"json"
	});
//}

var $page = $("#page li");
for(var i = 1;i < $page.length-1;i++){
	$page.eq(i).click(function(){
		$("#indexMiaoBox").html("");
		$("#indexTeBox").html("");
		$("#indexZhiBox").html("");
		indexFn();
	})
}
$("#prev").click(function(){
	$("#indexMiaoBox").html("");
	$("#indexTeBox").html("");
	$("#indexZhiBox").html("");
	indexFn();
})
$("#next").click(function(){
	$("#indexMiaoBox").html("");
	$("#indexTeBox").html("");
	$("#indexZhiBox").html("");
	indexFn();
})
var txt = $("#txt").val();
$("#btn").click(function(){
	$("#indexMiaoBox").html("");
	$("#indexTeBox").html("");
	$("#indexZhiBox").html("");
	indexFn();
})



$("#toTop").click(function(){
	$("body,html").animate({scrollTop:"0px"},1000);
});









