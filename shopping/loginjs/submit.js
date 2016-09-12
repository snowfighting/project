$(function(){
	var flag = false;
	
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
					"id":$("#subid").val()
				},
				
				/*type:"get",
				url:"../../user/CheckUserNameGet",
				data:{
					"Name":$("#subname").val()
				},*/
				success:function(result){
					if(result != null){
						flag = false;
						$("#snamesp").html("用户已存在");
						$("#snamesp").css("color","red");
						$(this).css("border","1px solid red");
					}else{
						flag = true;
						console.log("用户名可用");
						$("#snamesp").html("");
						$("#snamesp").css("background","url(img/dui.png)no-repeat left center");
						$("#subname").css("border","0");
			
					}
				},
				error:function(){
					console.log("error")
				},
				dataType:"json"
			});
		}
	})
	
	/**
	 * 验证id
	 */
	$("#subid").on("blur",function(){
		if($(this).val() != $("#subname").val()){
			flag = false;
			$("#sidsp").html("id格式不正确");
			$("#sidsp").css("color","red");
			$(this).css("border","1px solid red");
		}else{
			flag = true;
			$("#sidsp").html("");
			$("#sidsp").css("background","url(img/dui.png)no-repeat left center");
			$(this).css("border","0");
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
			flag = false;
			$("#stelsp").html("手机号格式不正确");
			$("#stelsp").css("color","red");
			$(this).css("border","1px solid red");
		}else{
			flag = true;
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
			flag = false;
			$("#spwdsp").html("密码格式不正确");
			$("#spwdsp").css("color","red");
			$(this).css("border","1px solid red");
		}else{
			flag = true;
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
				flag = false;
				$("#sagasp").html("两次密码不一致");
				$("#sagasp").css("color","red");
				$(this).css("border","1px solid red");
			}else{
				flag = true;
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
			flag = false;
			$("#sransp").html("验证码不正确");
			$("#sransp").css("color","red");
			$(this).css("border","1px solid red");
		}else{
			flag = true;
			$("#sransp").html("");
			$("#sransp").css("background","url(img/dui.png)no-repeat left center");
			$(this).css("border","0");
		}
	})
	
	$("#subbtn").click(function(){
         var uId=$("#subid").val();
		 var uName=$("#subname").val();
         var uPwd=$("#subpwd").val();
         var uTel=$("#subtel").val();

         var dataJsonOb={
                "id":uId,
                "uname":uName,
                "upwd":uPwd,
                "utel":uTel
            }
            var dataJsonStr=JSON.stringify(dataJsonOb);
		
		$.ajax({
                url:"../../product/CreateUpdateProduct_post",
                data:{
                    "id":uId,
                    "datajson":dataJsonStr,
                    "Type":"userInfo"
                },
                success:function(result){
                    if(result==1){
//                      alert("创建成功");
						
						
                    }else{
                        alert("创建失败");
                    }
                },
                dataType:"json",
                type:"post",
                /*complete:function(){
                	if(flag == true){
							$("body").append("<script src='loginjs/xcConfirm.js' type='text/javascript' charset='utf-8'></script>")
		                    var txt=  "恭喜您注册成功，点击进入购物说^_^";
							window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.success);
						}
                }*/
         })

	});
	
	
})