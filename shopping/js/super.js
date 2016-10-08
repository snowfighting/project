/**
 * 超级人气榜
 */
superFun();
function getId(id){
		var url = "/httpview/shopping/proDetail.html?id="+id;
	    window.location.href = url;
	}
function superFun(){
	$.ajax({
		type:"get",
		url:"../../../product/GetProductsByPage_get?pagesize=24&pageindex=1&type=super",
		success:function(result){
			var str = "";
			$.each(result, function(index,data) {
				var dataObj = eval("("+data.Data+")");
				
				str+="<dl class='zhidl redbor box' onclick=getId('"+dataObj.pid+"')> <dt><img src='"+dataObj.pimgsrc+"' /> </dt><dd>";
		    	str+="<a href='#' class='tao'><i><img src='img/taobao.png' /></i>"+dataObj.pname+"</a>";
		    	str+="<p class='youp'>优惠券<i>"+dataObj.pneibuquan+"</i>元，已有<b>"+dataObj.palreasale+"</b>人购买</p>";		
		    	str+="<p class='sale'>券后价￥<b>"+dataObj.pxiaprice+"</b>元，正常售价<i>"+dataObj.psaleprice+"</i></p></dd></dl>";		
		    		
			});
			$("#superImgBox").append(str);
		},
		dataType:"json"
	});
}



var $page = $("#page li");
for(var i = 1;i < $page.length-1;i++){
	$page.eq(i).click(function(){
		$("#superImgBox").html("");
		superFun();
	})
}
$("#prev").click(function(){
	$("#superImgBox").html("");
	superFun();
})
$("#next").click(function(){
	$("#superImgBox").html("");
	superFun();
})
var txt = $("#txt").val();
$("#btn").click(function(){
	$("#superImgBox").html("");
	superFun();
})



$("#toTop").click(function(){
	$("body,html").animate({scrollTop:"0px"},1000);
});
