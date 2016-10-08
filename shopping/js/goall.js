$(function(){
	jingFn();
	/**
	 * 精品推荐
	 */
	function jingFn(){
		$.ajax({
			type:"get",
			url:"../../../product/GetProductsByPage_get?pagesize=8&pageindex=1&type=detailPro",
			success:function(result){
					var str = "";
				
				$.each(result, function(index,data) {
					var dataObj = eval("("+data.Data+")");
					
					str+="<dl class='jingdetdl redbor'> ";
			    	str+="<dt><img src='"+dataObj.pimgsrc+"' /> </dt><dd>";	
			    	str+="<a href='#' class='tao'><i><img src='img/taobao.png' /></i>"+dataObj.pname+"</a>";		
			    	str+="<p class='youp'>优惠券<i>"+dataObj.pneibuquan+"</i>元，已有<b>"+dataObj.palreasale+"</b>人购买</p>";		
			    	str+="<p class='sale'>券后价￥<b>"+dataObj.pxiaprice+"</b>元，正常售价<i>"+dataObj.psaleprice+"</i></p></dd></dl>";		
				});	
				$("#jingdetbox").append(str);
			},
			dataType:"json"
		});
	}
	
	/**
	 * 商品详情
	 */
	var proInfo={};
	var name = $.query.get("id");
	detailFn(name);
	function detailFn(name){
		$.ajax({
			type:"get",
			url:"../../../product/GetProductById_get?id="+name,
			success:function(result){
				var dataObj = eval("("+result.Data+")");
				
				$("#golPro").attr('src',dataObj.pimgsrc);
				$("#goname").html(dataObj.pname);
				$("#goquan").html(dataObj.pxiaprice);
				$("#gozai").append(dataObj.psaleprice);
				$("#goalrea").html(dataObj.palreasale);
				$("#goyou").append(dataObj.pneibuquan);
				
				proInfo = {
					"name":dataObj.pname,
					"imgsrc":dataObj.pimgsrc,
					"price":dataObj.pxiaprice
				};
				
			},
			dataType:"json"
		})
	}
	
	/**
	 * 加入购物车
	 */
	$("#goCar").click(function(){
		var proInfoStr = JSON.stringify(proInfo);
		$.ajax({
			type:"post",
			url:"../../../product/CreateUpdateProduct_post",
			data:{
				"id":proInfo.name,
				"datajson":proInfoStr,
				"type":"goodsCar"
			},
			success:function(){
				var url = "/httpview/shopping/shoppingCar.html";
				window.location.href = url;
			},
			typeData:"json"
		})
		
		
	/*console.log(proInfo);
		getProInfo(proInfo.name,proInfo.imgsrc,proInfo.price);*/
	})
	function getProInfo(name,imgsrc,price){
		var url = "/httpview/shopping/shoppingCar.html?name="+name+"&imgsrc="+imgsrc+"&price="+price;
		window.location.href = url;
	}
	
	
	/**
	 * 上下轮播
	 */
	var $gorcenter = $("#gorcenter");
	var $ulbox = $("#gorcenbox");
	var $ullist = $("#gorcenbox li");
	var len = $ullist.length;
	var $upbtn = $("#upbtn");
	var $lowbtn = $("#lowbtn");
	
	var activeIndex = 0;//当前图片
	var prevIndex = 0; //上一张图片
	var timer = ""; //轮播图
	
	$upbtn.on("click",function(){
		activeIndex++;
		if(activeIndex == len){
			activeIndex=0;
		}
		
		$ullist.eq(activeIndex).css("top","100%").removeClass("phide");
		$ullist.eq(prevIndex).animate({"top":"-100%"},400);
		$ullist.eq(activeIndex).animate({"top":"0%"},400);
		
		prevIndex = activeIndex;
	});
	$lowbtn.on("click",function(){
		activeIndex--;
		if(activeIndex == -1){
			activeIndex=len-1;
		}
		
		$ullist.eq(activeIndex).css("top","-100%").removeClass("phide");
		$ullist.eq(prevIndex).animate({"top":"100%"},400);
		$ullist.eq(activeIndex).animate({"top":"0%"},400);
		
		prevIndex = activeIndex;
	});
	
	autoplay();
	function autoplay(){
		timer = setInterval(function(){
			$upbtn.click();
		},2000);
	};
	
	$gorcenter.mouseenter(function(){
		clearInterval(timer);
	});
	$gorcenter.mouseleave(function(){
		autoplay();
	});
	
	$("#p1").click(function(){
		alert("p1")
	});
	
	
	
	
/**
 * 点击加入购物车
 */
$("#lingbtn").click(function(){
	$("#carbox").css("display","block");
	$("#car").css("display","block");
})
})


