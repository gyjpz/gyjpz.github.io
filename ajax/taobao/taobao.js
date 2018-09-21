$(function(){
	$('#text').input();
	$(document).key();
	$('#so').search();
});

	var a=null;
	$.fn.extend({
		//根据输入的东西匹配相近的淘宝物品名
		input:function(){
			$(this).keyup(function(){
			if(event.keyCode==38||event.keyCode==40||event.keyCode==13) return;
			var value=$(this).val();
				$.ajax({
					url:"https://suggest.taobao.com/sug?callback=sayHi", //jsonp的回调函数sayHi
					data:{q:value},
					type:"get",
					dataType:"jsonp",
					// jsonp:true,//自定义jsonp回调函数
					// callback:"sayHi",
					success:function(data){
						$('ul').html('');
						for(var i in data.result){
							$('<li/>',{class:'result'}).html(data.result[i][0]).appendTo('ul');
						}
						$('.result').lis();
					}
				});
			});
		},

		lis:function(){
			$(this).mousemove(function(){
				$(this).css('backgroundColor','orange').siblings().css('background','white');
				$('#text').prop('value',$(this).text());
				a = $(this);
			}).click(function(){
				open('https://s.taobao.com/search?q='+$('#text').val());
			});
		},

		key:function(){
			$(document).keyup(function(){
				if (event.keyCode == 38) {
					if(a==null){
						a = $('ul li').last();
					}
					else if (a.prev().is('.result')) {
						a = a.prev();
					}
					else if(a.prev().length==0){
						a = a.parent().find('.result:last');
					}
					
					a.css('backgroundColor','orange').siblings().css('backgroundColor','white');
					$('#text').prop('value',a.text());
				}
				if (event.keyCode == 40) {
					if(a==null){
						a = $('ul li').first();
					}
					else if (a.next().is('.result')) {
						a = a.next();
					}
					else if(a.next().length==0){
						a = a.parent().find('.result:first');
					}
					
					a.css('backgroundColor','orange').siblings().css('backgroundColor','white');
					$('#text').prop('value',a.text());
				}
				if (event.keyCode == 13) {
					open('https://s.taobao.com/search?q='+$('#text').val());
				}
			});
		},

		search:function(){
			$(this).click(function(){
				open('https://s.taobao.com/search?q='+$('#text').val());
			})
		}
	});