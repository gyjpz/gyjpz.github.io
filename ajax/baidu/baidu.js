    var value = ''
    var timeId;
        function baidu(){
            // var value = '中间'
            $.get("http://baike.baidu.com/api/openapi/BaikeLemmaCardApi?scope=103&format=json&appid=379020&bk_key=&bk_length=600", {
                    bk_key:value
                },
                function (data) {
                    if(data.id){
                        console.log(data);
                        var newDt
                        $('dl').empty();
                        for(i = 0;i < data.card.length;i++){
                            newDt = $('<dt/>').html(data.card[i].name)
                            if($('dl:eq(0)').height() <= $('dl:eq(1)').height()){
                                newDt.appendTo($('dl:eq(0)'))
                            }
                            else{
                                newDt.appendTo($('dl:eq(1)'))
                            }
                            for(j = 0;j < data.card[i].value.length;j++){
                                $('<dd/>').html(data.card[i].value[j]).insertAfter(newDt)
                            }
                        }
                        
                        $('span').html(data.desc)
                        var newStr = data.abstract.replace(/。/gi, "。</p><br/><p>")
                        $('p').html(newStr)
                        $('img').attr('src',data.image)
                        clearInterval(timeId);
                    }
                },'jsonp'
            );
        }
        $('#so').click(function(){
            boo = false;
            $('.container').css('display','block');
            value = $('#text').val();
            timeId = setInterval(function(){
                baidu();
            },500)
        })
