$(function(){
	$("#delBtn").click(function(){
		$.ajax({
			type:"post",
			url:"../../../product/DeleteProductById_post",
			data:{
				"id":$("#delId").val()
			},
			success:function(result){
				if(result == 1){
					alert("删除成功");
				}else{
					alert("删除失败");
				}
			},
			error:function(){
				alert("ajax error");
			},
			dataType:"json"
		});
		return false;
	})
})
