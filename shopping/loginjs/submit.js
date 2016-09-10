$(function(){
	/**
	 * 判断用户名
	 * @param {Object} name
	 */
	function checkName(name){
		var reg = /^[a-z][a-z0-9_-]{5,19}$/i;
		return reg.test(name);
	}
	
	$("#subname").on("blur",function(){
		var len = $(this).val().length;
		var isTrue = checkName($(this).val());
		if(!isTrue){
			$("#snamesp").html("用户名格式不正确");
			$("#snamesp").css("color","red");
			$(this).css("border","1px solid red");
		}else{
			
			$.ajax({
				type:"post",
				url:"../../product/GetProductById_post",
				data:{
					"Name":$("#subname").val()
				},
				
				/*type:"get",
				url:"../../user/CheckUserNameGet",
				data:{
					"Name":$("#subname").val()
				},*/
				success:function(result){
					if(result.Name == $("#subname").val()){
						
						$("#snamesp").html("用户已存在");
						$("#snamesp").css("color","red");
						$(this).css("border","1px solid red");
					}else{
						console.log("用户名可用");
						$("#snamesp").html("");
						$("#snamesp").css("background","url(img/dui.png)no-repeat left center");
						$("#subname").css("border","0");
			
					}
				},
				dataType:"json"
			});
		}
	})
	

	
	/**
	 * 验证手机号
	 */
	function checkTel(tel){
		var reg = /^[1-3]\d{10}$/;
		return reg.test(tel);
	}
	$("#subtel").on("blur",function(){
		var isTrue = checkTel($(this).val());
		if(!isTrue){
			$("#stelsp").html("手机号格式不正确");
			$("#stelsp").css("color","red");
			$(this).css("border","1px solid red");
		}else{
			$("#stelsp").html("");
			$("#stelsp").css("background","url(img/dui.png)no-repeat left center");
			$(this).css("border","0");
		}
	})
	
	/**
	 * 验证密码
	 */
	
	function checkPwd(pwd){
		var reg = /^[0-9|A-Z|a-z]{6,16}$/;
		return reg.test(pwd);
	}
	$("#subpwd").on("blur",function(){
		var isTrue = checkPwd($(this).val());
		if(!isTrue){
			$("#spwdsp").html("密码格式不正确");
			$("#spwdsp").css("color","red");
			$(this).css("border","1px solid red");
		}else{
			$("#spwdsp").html("");
			$("#spwdsp").css("background","url(img/dui.png)no-repeat left center");
			$(this).css("border","0");
		}
	})
	/**
	 * 验证两次密码是否一致
	 */
	$("#agapwd").on("blur",function(){
		if(checkPwd($(this).val())){
			if($(this).val() != $("#subpwd").val()){
				$("#sagasp").html("两次密码不一致");
				$("#sagasp").css("color","red");
				$(this).css("border","1px solid red");
			}else{
				$("#sagasp").html("");
				$("#sagasp").css("background","url(img/dui.png)no-repeat left center");
				$(this).css("border","0");
			}
		}
	})
	
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
	 * 验证验证码
	 */
	$("#identify").on("blur",function(){
		if($(this).val() != ranstr){
			$("#sransp").html("验证码不正确");
			$("#sransp").css("color","red");
			$(this).css("border","1px solid red");
		}else{
			$("#sransp").html("");
			$("#sransp").css("background","url(img/dui.png)no-repeat left center");
			$(this).css("border","0");
		}
	})
	
	$("#subbtn").on("click",function(){
		var datastr = {
				"Name":$("#subname").val(),
				"password":$("#subpwd").val(),
				"tel":$("#subtel").val()
			};
			var dataJsonStr=JSON.stringify(datastr);
		
		$.ajax({
			type:"post",
			
			url:"../../product/CreateUpdateProduct_post",
			data:{
				"Id":$("#subid").val(),
				"data":dataJsonStr
			},
			/*url:"../../user/register",
			data:{
				"Id":$("#subid").val(),
				"Name":$("#subname").val(),
				"password":$("#subpwd").val(),
				"tel":$("#subtel").val()
			},*/
			success:function(result){
				alert(1)
				if(result == 1){
					alert("注册成功");
				}else{
					alert("注册失败！");
				}
			},
			error:function(){
				alert("动态页错了\n\n");
			},
			dataType:"json"
		});		

	})
	
	
})