$(function(){
	$('tbody').html('');

	$.ajax({
		type:"post",
		url:"../../../product/GetProductsByPage_post",
		data:{
			"pagesize":100,
			"pageindex":1,
			"type":"goodsCar"
		},
		success:function(result){
			console.log(result)
			var str = "";
			$.each(JSON.parse(result), function(index,data) {
				var dataObj = eval("("+data.Data+")");
				str+='<tr><td><input type="checkbox" name="goods" value="" /></td>';
				str+='<td><img src="'+dataObj.imgsrc+'" class="proimg"/><span class="proname">'+dataObj.name+'</span></td>';
				str+='<td class="proprice">'+dataObj.price+'</td>';						
				str+='<td class="pronum">';							
				str+='<i class="iconfont ifirst" id="addgoods">&#xe604;</i>';							
				str+='<input type="text" class="cartxt" value="1" id="goodsnum"/>';								
				str+='<i class="iconfont" id="subgoods">&#xe652;</i></td>';								
				str+='<td id="xiaoji">'+dataObj.price+'</td>';							
				str+='<td id="deleteGoods">删除</td></tr>';
			});
			$("tbody").prepend(str);
			
		},
		typeData:"json"
	});
	
		
	function getMoney(count){
		var money = count*price;
		$("#xiaoji").html(parseFloat(money).toFixed(2));
	}
	/**
	 * 商品增加
	 */
	$("#addgoods").click(function(){
		var num = parseInt($("#goodsnum").val());
		$("#goodsnum").val(++num);
		getMoney(num);
		setTotal();
	})
	/**
	 * 商品数量减少
	 */
	$("#subgoods").click(function(){
		var num = parseInt($("#goodsnum").val());
		if(num-1 < 0){
			alert("对不起，您不能执行此操作了");
		}else{
			$("#goodsnum").val(--num);
			getMoney(num);
			setTotal();
		}
	})
	/**
	 * 删除商品
	 */
	$("#deleteGoods").click(function(){
		$(this).parent().remove();
		$("#moneyred").append(0);
	})
	
	/**
	 * 全选商品
	 */
	$("#all").click(function(){
		$("input[name=goods]").each(function(){
			$(this).attr("checked",true);
		})
	})
	/**
	 * 总价
	 */
	function setTotal(){
		$("#moneyred").html('');
		var num = 0;
		var mon = function(){
			$('tbody td[id=xiaoji]').each(function(){
					num+=parseFloat($(this).text());
//					console.log(parseInt($('td[id=xiaoji]').text())+"--"+num)
					$("#moneyred").html(num.toFixed(2));
			});
			return num;
		}
		return mon();
	}
	setTotal();
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})
