$(function(){
	
	$("#addBtn").click(function(){
		var pid = $("#pid").val();
		var ptype = $("#type").val();
		var pname = $("#name").val();
		var pimgsrc = $("#imgsrc").val();
		var psaleprice = $("#saleprice").val();
		var pxiaprice = $("#xiaprice").val();
		var pneibuquan = $("#neibuquan").val();
		var pdeadline = $("#deadline").val();
		var psurplus = $("#surplus").val();
		var preceive = $("#receive").val();
		var premadays = $("#remadays").val();
		var palreasale = $("#alreasale").val();
		
		var dataJsonObj = {
			"pid":pid,
			"ptype":ptype,
			"pname":pname,
			"pimgsrc":pimgsrc,
			"psaleprice":psaleprice,
			"pxiaprice":pxiaprice,
			"pneibuquan":pneibuquan,
			"pdeadline":pdeadline,
			"psurplus":psurplus,
			"preceive":preceive,
			"premadays":premadays,
			"palreasale":palreasale
		}
		var dataJsonStr = JSON.stringify(dataJsonObj);
//		console.log(dataJsonObj);
//		console.log(dataJsonStr);
		$.ajax({
			type:"post",
			url:"../../../product/CreateUpdateProduct_post",
			data:{
				"id":pid,
				"datajson":dataJsonStr,
				"type":ptype
			},
			success:function(data){
				if(data==1){
                        alert("创建成功");
                }else{
                        alert("创建失败");
                }
                $("#pid").val("");
                $("#type").val("");
                $("#name").val("");
                $("#imgsrc").val("");
                $("#saleprice").val("");
                $("#xiaprice").val("");
                $("#neibuquan").val("");
                $("#deadline").val("");
                $("#surplus").val("");
                $("#receive").val("");
                $("#remadays").val("");
                $("#alreasale").val("");
			},
			error:function(){
				alert("ajax error")
			},
			dataType:"json"
		});
		return false;
	})
	
	
	
	
	
	
	
	
	
})
