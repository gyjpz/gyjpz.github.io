$(function(){
		// $('#userForm').validate({
		// 	rules:{
		// 		username:{
		// 			required:true,
		// 			rangelength:[3,20]
		// 		},
		// 		password:{
		// 			required:true,
		// 			rangelength:[5,20],
		// 		}
		// 	},
		// 	messages:{
		// 		username:{
		// 			required:"账号不能为空",
		// 			rangelength:"账号长度为3-20位",
		// 		},
		// 		password:{
		// 			required:"密码不能为空",
		// 			rangelength:"密码长度为5-20位",
		// 		}
		// 	},
		// 	unhighlight:function(element,error,errorClass){
		// 		$(element).tooltip('destroy');
		// 	},
		// 	errorPlacement:function(error,element){
		// 		if($(element).next('.tooltip').length>0){
		// 			$(element).attr('data-original-title',error.text()).tooltip('show');
		// 		}else{
		// 			$(element).attr('title',error.text()).tooltip();
		// 		}
		// 	},
		// 	submitHandler:function(){
		// 		$('[type="submit"]').button('loading');
		// 		$.post('http://bt.com/login/gz0820web/login',$('#userForm').serializeArray(),function(data){
		// 			if(data.status!=1){
		// 				$('[type="submit"]').button('reset');
		// 			}else{
		// 				setInterval(function(){
		// 					location.href="index.html";
		// 				},3000);
		// 			}
		// 			$('.modal-body').text(data.msg);
		// 			$('.modal').modal();
		// 		},'json');
		// 		return false;
		// 	}
		// });
		$('#loginbtn').click(function(){
			if ($('input').eq(0).val()=='admin' && $('input').eq(1).val()=='123') {
				open('https://gyjpz.github.io/bootstrap/login/index.html');
			} else {
				$('#myModal').modal('show');
			}
		})
})