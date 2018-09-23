$(function(){
	//侧导航条菜单点击
	$('.panel-heading>.list-group-item').click(function(){
		if ($(this).parent().next().is('.in')) {
			$(this).find('span').last().prop('class','glyphicon glyphicon-menu-down')
		}
		else{
			$(this).find('span').last().prop('class','glyphicon glyphicon-menu-up')
			$(this).parent().siblings().find('.glyphicon-menu-up').prop('class','glyphicon glyphicon-menu-down')
		}
	})
	//侧导航条子菜单事件
	$('#user .list-group .list-group-item').click(function(){
		$(this).parents('#user').find('.glyphicon-triangle-right').detach();
		$('<span/>').prop({class:'glyphicon glyphicon-triangle-right'}).prependTo($(this));
	}).hover(function() {
		$(this).addClass('active');
	}, function() {
		$(this).parents('#user').find('.list-group .list-group-item').removeClass('active');
	});

	var num = 1;
	$('.pagination li').click(function() {
		if (Number($(this).text())) {
			num = $(this).text();
			$('.pagination li').removeClass('active');
			$(this).addClass('active');
		}
		else{
			if($(this).text()=='上一页'){
				$('.pagination li').last().removeClass('disabled')
				if(num<=1){
					$(this).addClass('disabled')
					return;
				}
				num--;
				$(this).parent().find(".active").removeClass('active').prev().addClass('active');
			}else if ($(this).text()=='下一页') {
				$('.pagination li').first().removeClass('disabled')
				if (num>=8) {
					$(this).addClass('disabled')
					return;
				}
				num++;
				$(this).parent().find(".active").removeClass('active').next().addClass('active');
			}
		}
		ajaxlist();
	});

	ajaxlist();

	function ajaxlist(){
		$.post('http://bt.com/login/gz0820web/users',{page:num},function(result){
			var data = result.data
			for(var i = 0;i<data.length;i++){
				var tr = $('table tbody tr').eq(i)
				if(data[i].gender==1){
					data[i].gender='男'
				}else {
					data[i].gender='女'
				}
				tr.find('td').eq(0).html(data[i].id)
				tr.find('td').eq(1).html(data[i].username)
				tr.find('td').eq(2).html(data[i].password)
				tr.find('td').eq(3).html(data[i].age)
				tr.find('td').eq(4).html(data[i].gender)
				tr.find('td').eq(5).html(data[i].headimg)
			}
			$('.pagination li').eq(num).addClass('active');
		},'json')
	}
})