$(function(){
	
	var $banner = $("#banbox");
//	找到图片列表
	var $picList = $("#picList");
	var $picLis = $("#picList li");
//	找到控制点列表
	var $pointList = $("#pointList");
	var $pointLis = $("#pointList li");
//	获取左右按钮
	var $prevBtn = $("#prevBtn");
	var $nextBtn = $("#nextBtn");
//	获取图片个数
	var picLen = $picLis.length;
//	定义一个定时器用来自动切换
	var timer = "";
	var activeIndex = 0;
	
	for(var i = 0; i < picLen;i++){
//		eq表示当前是di几个图片所在的li
//		z-index表示我们设置每一个图片所在li的层级关xi（谁在谁的上面）
		$picLis.eq(i).css("z-index",picLen-i);
	}
	
	$pointLis.click(function(){
//		$index为当前点击的是哪一个图片所在的li，返回的数值为0，1，2
		var $index = $(this).index();

//		重新指定索引图，防止
		activeIndex = $index;
		fadeFn($index);
	})
	
	$nextBtn.click(function(){
		activeIndex++;
		if(activeIndex == picLen){
			activeIndex = 0;
		}
		fadeFn(activeIndex);
	})
	$prevBtn.click(function(){
		activeIndex--;
		if(activeIndex == -1){
			activeIndex = picLen-1;
		}
		fadeFn(activeIndex);
	})
	function fadeFn(num){
		$picLis.eq(num).fadeIn(1000).siblings().fadeOut(1000);
		$pointLis.eq(num).addClass("active").siblings().removeClass("active");
	}
	
	
	autoplay();
//	自动播放
	function autoplay(){
		timer = setInterval(function(){
		$nextBtn.click();
	},2000)
	}

	$banner.mouseenter(function(){
		clearInterval(timer);
		$prevBtn.fadeIn();
		$nextBtn.fadeIn();
	})
	$banner.mouseleave(function(){
		autoplay();
		$prevBtn.fadeOut();
		$nextBtn.fadeOut();
	})
	
	

	
})

