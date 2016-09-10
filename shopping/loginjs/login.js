$(function(){
	
	/**
	 * 随机获取验证码
	 */
	var ranstr = (function(){
		var str = "";
		for(var i = 0;i < 4;i++){
			var count = parseInt(Math.random()*2);
			if(count == 0){
				var num = parseInt(Math.random()*10);
				str+=num;
			}else if(count == 1){
				var n = Math.floor(Math.random()*26)+65;
				var c = String.fromCharCode(n);
				str+=c;
			}
		}
		return str;
	})()
	$("#ranp").html(ranstr);
	
	/**
	 * 验证登录信息
	 */
	
	var $logname = $("#logname");
	var $logpwd = $("#logpwd");
	var $ranp = $("#ranp");
	
	$logname.on("blur",function(){
		$.ajax({
			type:"get",
			url:"../../user/CheckUserNameGet",
			dataType : "json",
			data:{
				"Name":$logname.val()
			},
			success:function(data){
				alert(1)
				if(data == 1){
					console.log("用户名成功");
					$("#namsp").css("display","none");
				}else{
					$("#namsp").css("display","block");
				}
			}
		});
	})

	$logpwd.on("blur",function(){
		$.ajax({
			type:"post",
			url:"../../user/login",
			async:false,
			dataType:"json",
			data:{
				"Name":$logname.val(),
				"password":$logpwd.val()
			},
			success:function(data){
				if(data == 1){
					$("#pwdsp").css("display","none");
					console.log("密码成功");
				}else{
					$("#pwdsp").css("display","block");
				}
			}
		})
	})
	
	$("#logran").on("blur",function(){
		if($(this).val() != ranstr){
			$("#ransp").css("display","block");
		}else{
			$("#ransp").css("display","none");
			console.log("验证码成功");
		}
	})
	
	$("#logbtn").on("click",function(){
		location.href = "index.html";
	})
	
	
	
	
})
