$(function(){
	
$("#btn").click(function(){
	var cityname=$("#city").val();
	// 获取天气预报
	$.ajax({
		url:"http://route.showapi.com/9-2",
		type:"post",
		data:{
			showapi_appid:"136576",//id
			showapi_sign:"34b4a269ea1442b6b5bc2a2895bef82e",//密钥
			area:cityname,
			needMoreDay:1,
			needIndex:1,
			needHourData:1,
			need3HourForcast:1,
			needAlarm:1
		},
		success:function (res) {
			console.log(res);
			var  data=res.showapi_res_body;
			var arr=[data.f1,data.f2,data.f3,data.f4,data.f5];
			console.log(arr);
			var str="";
			var  date=new Date();
			var year=date.getFullYear();
			var month=date.getMonth()+1;
			var ds=date.getDate();
			var days=date.getDay()+1;
			var hour=date.getHours();
			var nongli=Lunar.toLunar(year, month, ds);//公历转农历
			var  now=data.now;//实时信息
			$.each(arr,function(index,ele){
				var cstr='';
				if(index==0){
					cstr="today";
				}
				console.log(nongli)
				// 渲染白天的图片或晚间图片
				 var imgsrc=hour>7&&hour<17?ele.day_weather_pic:night_weather_pic;
				str+='<ul class="'+cstr+'">'
					+'<li>'+month+'月'+ds+'日&nbsp;周'+days+'&nbsp;<span id="demo1">农历'+nongli[5]+nongli[6]+'</span>	</li>'
					+'<li><img src="'+ele.day_weather_pic+'"/></li>'
					+'<li class="now"><h1>'+now.temperature+'<span class="sheshi">℃</span><span>'+now.weather+'(实时)</span></h1></li>'
					+'<li>-'+ele.night_air_temperature+'~'+ele.day_air_temperature+'℃</li>'
					+'<li>'+ele.day_weather+'</li>'
					+'<li>'+ele.day_wind_direction+'</li>'
					+'<li><span>'+now.aqiDetail.pm2_5+'</span>&nbsp;<span>'+now.aqiDetail.quality+'</span></li>'
				+'</ul>'
				$(".header").html(str);		 
			})
				// 渲染指数
				var zhishi=data.f1.index;//指数数据
				var zhishustr=''
				var num=0;
				for(var kx in zhishi){
					if(num<5){
						zhishustr+='<li>'
							+'穿衣：<span>冷</span>'
							+'<div class="des">'
								+'<p>穿衣指数：'+zhishi[kx].title+'</p>'
								+'<div>'
									+zhishi[kx].desc
								+'</div>'
							+'</div>'
						+'</li>'
					}else{
						  break;
					}
					num++
				}
				$(".content ul").html(zhishustr)
			
		}

	})
	
})	
	
	
	
	
	
})




