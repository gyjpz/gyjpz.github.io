// get();  //ie可用
// function get(){
// 	if (navigator.geolocation) {
// 		navigator.geolocation.watchPosition(showPosition);
// 	}
// 	else {
// 		alert("该浏览器不支持获取地理位置。");
// 	}
// }
// function showPosition(position){
// 	console.log("纬度: " + position.coords.latitude);
// 	console.log("经度: " + position.coords.longitude);
// 	console.log("时间: " + position.timestamp);
// }


// var geolocation = new BMap.Geolocation();
// geolocation.getCurrentPosition(function(r){
//     if(this.getStatus() == BMAP_STATUS_SUCCESS){
//         console.log('您的位置：'+r.point.lng+','+r.point.lat);
//     }
//     else {
//         console.log('failed'+this.getStatus());
//     }
// },{enableHighAccuracy: true})

var myCity = new BMap.LocalCity();
var cityName = '',str = '';
function myFun(result){
    cityName = result.name;
    console.log("当前定位城市:"+cityName);
    str = cityName.substr(0,2);
    console.log("当前定位城市:"+str);

}
myCity.get(myFun);

function ajaxWea(){
    $.get("https://www.tianqiapi.com/api/",
        {version:'v1',city:str},
        function (result) {
            console.log(result);

            localStorage.setItem('data',JSON.stringify(result));
            console.log(localStorage.getItem('data'));
            // var aa = JSON.parse(localStorage.getItem('data'));
            // console.log(aa);

            $('#today h1').html(result.city);
            $('#today>p').eq(0).html(result.data[0].date + '  ' + result.data[0].week);
            $('#today>h2').html(result.data[0].tem1);
            $('#today_air>p').eq(0).html('空气质量指数：' + result.data[0].air + '<span>' + result.data[0].air_level + '</span>');
            if (result.data[0].air <= 50){
                $('#today_air span').css({backgroundColor:'yellowgreen'});
            }
            else if(result.data[0].air > 50 && result.data[0].air <= 100){
                $('#today_air span').css({backgroundColor:'yellow'});
            }
            else if(result.data[0].air > 100 && result.data[0].air <= 150){
                $('#today_air span').css({backgroundColor:'orange'});
            }
            else{
                $('#today_air span').css({backgroundColor:'red'});
            }
            function wea(data,lab) {
                switch (data) {
                    case '晴':
                        lab.attr({src: 'img/晴.png'});
                        break;
                    case '多云':
                        lab.attr({src: 'img/多云.png'});
                        break;
                    case '阴':
                        lab.attr({src: 'img/阴.png'});
                        break;
                    case '小雨':
                        lab.attr({src: 'img/小雨.png'});
                        break;
                    case '大雨':
                    case '暴雨':
                        lab.attr({src: 'img/大雨.png'});
                        break;
                    case '雷阵雨':
                        lab.attr({src: 'img/雷阵雨.png'});
                        break;
                    case '雪':
                        lab.attr({src: 'img/雪.png'});
                        break;
                    case '冰雹':
                        lab.attr({src: 'img/冰雹.png'});
                        break;
                    case '雷电':
                        lab.attr({src: 'img/闪电.png'});
                        break;
                }
            }
            wea(result.data[0].hours[0].wea,$('#today>img'));
            $('#today_air>p').eq(1).html(result.data[0].air_tips);
            $('#today_weather>p').html(result.data[0].hours[0].wea + '  ' + '|' + '  ' + result.data[0].hours[0].win + '  ' + '|' + '  ' + result.data[0].hours[0].win_speed);
            for(var i = 0;i < result.data.length;i++){
                var newStr = result.data[i].date.slice(5);
                $('.oneday:eq('+i+')>p').eq(0).html(newStr);
                $('.oneday:eq('+i+')>p').eq(1).html(result.data[i].week);
                $('.oneday:eq('+i+')>h4').html(result.data[i].tem1 + '  ' + '/' + '  ' + result.data[i].tem2);
                $('.oneday:eq('+i+')>p').eq(2).html(result.data[i].win[0] + '   ' + result.data[i].win_speed);
                wea(result.data[i].hours[0].wea,$('.oneday:eq('+i+')>img'))
            }
            for (var j = 0;j < result.data[0].index.length;j++){
                $('.index:eq('+j+')>h3').html(result.data[0].index[j].level);
                $('.index:eq('+j+')>p').html(result.data[0].index[j].desc);
            }
        }
    )
}
setTimeout(function () {
    ajaxWea();
},300)

$('#today h1').click(function () {
    $('#today .cityName').toggleClass('active');
})
$('#today .cityName>button').click(function () {
    $('#today .cityName').toggleClass('active');
    str = $('#today .cityName>#city').val();
    ajaxWea();
})