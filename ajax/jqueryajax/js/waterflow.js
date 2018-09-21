//插件封装
(function($){
	var a=0;
	$.fn.extend({
		waterflow:function(){
			//获取整个容器宽度
			var boxWidth=this.width();
			//获取里面每条内容item的宽度
			var items=this.find('div');
			var itemWidth=items.outerWidth();
			//定义每一行显示5个
			var rowNum=5;
			//计算出空隙
			var space=(boxWidth-(itemWidth*rowNum))/(rowNum-1);
			//数组记录每列的高度  itemArray[0]=100; itemArray[1]=500;
			var itemArray=[];
			//循环每一个item元素
			items.each(function(index,el){
				//判断第一行所有元素距离上面是0
				if(index<rowNum){
					itemArray[index]=$(el).outerHeight();
					//计算第一行每个元素距离左边距离
					var left=index*(itemWidth+space);
					$(el).css({
						top:0,
						left:left
					});
				}else{
					//除了第一行以外其他元素
					//假设第一个元素的高度是最小的
					var minHeight=itemArray[0];
					var minIndex=0;
					var height=$(el).outerHeight(); //获取当前循环元素的高度
					for(var i in itemArray){
						//找到比第一个还要小的元素的下标及高度值
						if(itemArray[i]<minHeight){
							minHeight=itemArray[i];
							minIndex=i;
						}
					}
					//把最小的元素高度当前元素的高度存在最小元素的下标
					itemArray[minIndex]=minHeight+height+space;
					$(el).css({
						top:minHeight+space,
						left:minIndex*(itemWidth+space)
					});
					
					// $('#more').css('top', maxHeight);

				}
			});
			var maxHeight=itemArray[0];
			for(var i in itemArray){
				//找到比第一个还要大的元素的高度值
				if(itemArray[i]>maxHeight){
					maxHeight=itemArray[i];
				}
			}
			this.height(maxHeight);
		},
		aj:function(){
			$.ajax({
				url: 'img.json',
				type: 'get',
				dataType: 'json',
				success:function(responseData){
					// responseData = JSON.parse(responseData);
					for(var i = 0;i < 15;i++){
						if(a>=responseData.length){
							$('#more').html('已加载完成')
						}
							var src = responseData[a].path;
							var titles = responseData[a].title;
							$('<div/>',{class:'item'}).appendTo('.items');
							$('<img/>').attr('src', src).appendTo('.items div:last');
							$('<p/>').html(titles).appendTo('.items div:last');
						a++;
					}
					$('.items img').on('load',function(){
						$('.items').waterflow();
						$('.item').hoverimg();
					})
				}
			})
		},
		a:function(){
			$(this).click(function() {
				$('.items').aj();
			});
		},
		scrollImg:function(){
			$(this).scroll(function() {
				var scrollTop = $(this).scrollTop()+$(window).height();
				if(scrollTop >= $(this).height()){
					$('.items').aj();
				}
			});
		},
		hoverimg:function(){
			$(this).hover(function() {
				$(this).css({
					border: 0,
					width: 222,
					boxShadow: '0px 0px  15px 5px #777',
					color:'#000'
				});
			}, function() {
				$(this).css({
					width:220,
					border:'1px solid #ddd',
					boxShadow: '0px 0px  15px 5px #ccc',
					color:'#555'
				});

			});
		}

	});
})(jQuery);

$(window).on('load',function(){
	$('.items').aj();
	$('a').a();
	$(document).scrollImg();
});