$(function(){
	
	/**
	 * 上下轮播
	 */
	var $gorcenter = $("#gorcenter")
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
	})
	$lowbtn.on("click",function(){
		activeIndex--;
		if(activeIndex == -1){
			activeIndex=len-1;
		}
		
		$ullist.eq(activeIndex).css("top","-100%").removeClass("phide");
		$ullist.eq(prevIndex).animate({"top":"100%"},400);
		$ullist.eq(activeIndex).animate({"top":"0%"},400);
		
		prevIndex = activeIndex;
	})
	
	autoplay();
	function autoplay(){
		timer = setInterval(function(){
			$upbtn.click();
		},2000);
	}
	
	$gorcenter.mouseenter(function(){
		clearInterval(timer);
	})
	$gorcenter.mouseleave(function(){
		autoplay();
	})
	
	$("#p1").click(function(){
		alert("p1")
	})
})
