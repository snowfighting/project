$(function(){
	
	var $gorcenter = $("#gorcenter")
	var $ulbox = $("#gorcenbox");
	var $ullist = $("#gorcenbox li");
	var len = $ullist.length;
	var $upbtn = $("#upbtn");
	var $lowbtn = $("#lowbtn");
	
	var activeIndex = 0;
	
	$upbtn.on("click",function(){
		var $index = $(this).index();
		
		$ullist[$index].animate({"top":"-415px"},2000);
		$ullist[$index+1].animate({"top":0},2000);
		activeIndex = $index;
	})
	$lowbtn.on("click",function(){
		var $index = $(this).index();
		
		$ullist[$index].animate({"top":"415px"},2000);
		$ullist[$index-1].animate({"top":0},2000);
		
		activeIndex = $index;
	})
	
	
	$("#p1").click(function(){
		alert("p1")
	})
})
