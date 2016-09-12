$(function(){
	$("#queryBtn").click(function(){
		
		$.ajax({
			type:"post",
			url:"../../../product/GetProductById_post",
			data:{
				"id":$("#queryId").val()
			},
			success:function(data){
				
				var dataObj = eval("("+data.Data+")");
				
				/**
				 * 大框商品
				 */
				if(dataObj.ptype == "topPro"){
					var strhead = "";
					strhead += "<tr><th>"+商品名称+"</th>"
	                strhead += "<th>"+商品图片+"</th>";
	                strhead += "<th>"+内部券+"</th>";
	                strhead += "<th>"+剩余优惠券+"</th>";
	                strhead += "<th>"+结束日期+"</th>";
	                strhead += "<th>"+已领优惠券+"</th>";
	                strhead += "<th>"+下单价+"</th>";
	                strhead += "<th>"+在售价+"</th></tr>";
	           		$("thead").append(strhead);
					
					var str = "";
					str += "<tr class='active'>";
	               str += "<td>"+dataObj.pname+"</td>";
	               str += "<td>"+dataObj.pimgsrc+"</td>";
	               str += "<td>"+dataObj.pneibuquan+"</td>";
	               str += "<td>"+dataObj.psurplus+"</td>";
	               str += "<td>"+dataObj.pdeadline+"</td>";
	               str += "<td>"+dataObj.preceive+"</td>";
	               str += "<td>"+dataObj.pxiaprice+"</td>";
	               str += "<td>"+dataObj.psaleprice+"</td></tr>";
	           
					$("tbody").append(str);
				}else if(dataObj.ptype == "centerPro"){
					var strhead = "";
					strhead += "<tr><th>"+商品名称+"</th>"
	                strhead += "<th>"+商品图片+"</th>";
	                strhead += "<th>"+结束日期+"</th>";
	                strhead += "<th>"+已售商品数量+"</th>";
	                strhead += "<th>"+下单价+"</th>";
	           		$("thead").append(strhead);
					
					var str = "";
					str += "<tr class='active'>";
	               	str += "<td>"+dataObj.pname+"</td>";
	               	str += "<td>"+dataObj.pimgsrc+"</td>";
	               	str += "<td>"+dataObj.pdeadline+"</td>";
	              	 str += "<td>"+dataObj.palreasale+"</td>";
	              	 str += "<td>"+dataObj.pxiaprice+"</td></tr>";
				}else if(dataObj.ptype == "bottomPro"){
					var strhead = "";
					strhead += "<tr><th>"+商品名称+"</th>"
	                strhead += "<th>"+商品图片+"</th>";
	                strhead += "<th>"+内部券+"</th>";
	                strhead += "<th>"+已购买人数+"</th>";
	                strhead += "<th>"+下单价+"</th>";
	                strhead += "<th>"+在售价+"</th></tr>";
	           		$("thead").append(strhead);
					
					var str = "";
					str += "<tr class='active'>";
	               	str += "<td>"+dataObj.pname+"</td>";
	               	str += "<td>"+dataObj.pimgsrc+"</td>";
	               	str += "<td>"+dataObj.pdeadline+"</td>";
	              	str += "<td>"+dataObj.pneibuquan+"</td>";
	              	str += "<td>"+dataObj.palreasale+"</td>";
	              	str += "<td>"+dataObj.pxiaprice+"</td>";
	              	 str += "<td>"+dataObj.psaleprice+"</td></tr>";
				}		
				
				
				$("#queryId").val("");
			},
			error:function(){
				alert("ajax error");
			},
			dataType:"json"
		});
		
		
		return false;
	})
	
	
	
	
	
	
	
	
	
})