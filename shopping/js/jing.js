/**
 * 精选特卖
 */
jingFn();
function getId(id){
		var url = "/httpview/shopping/proDetail.html?id="+id;
	    window.location.href = url;
	}
function jingFn(){
	
	$.ajax({
		type:"get",
		url:"../../../product/GetProductsByPage_get?pagesize=24&pageindex=1&type=jingPro",
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
}

var $page = $("#page li");
for(var i = 1;i < $page.length-1;i++){
	$page.eq(i).click(function(){
		$("#indexTeBox").html("");
		jingFn();
	})
}
$("#prev").click(function(){
	$("#indexTeBox").html("");
	jingFn();
})
$("#next").click(function(){
	$("#indexTeBox").html("");
	jingFn();
})
var txt = $("#txt").val();
$("#btn").click(function(){
	$("#indexTeBox").html("");
	jingFn();
})



$("#toTop").click(function(){
	$("body,html").animate({scrollTop:"0px"},1000);
});
