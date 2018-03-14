$(function(){
	initVersion();  //初始化界面
	
	//给月份值
	var myDate= new Date(); 
	var startYear=myDate.getFullYear()-50;//起始年份 
	var endYear=myDate.getFullYear()+50;//结束年份 
	var obj=document.getElementById('yearSe') 
	for (var i=startYear;i<=endYear;i++) 
	{ 
	obj.options.add(new Option(i+'年',i)); 
	} 
	obj.options[obj.options.length-51].selected=1; 
	
	//在点击table后加载值
	$('td a').click(function(){
		 var years=$('#yearSe').val();   //当前年份
		 var months=getMonth(this.innerText);       //当前月份
		 var nowday='';
		 if(years==new Date().getFullYear()&&months==new Date().getMonth()+1){  //只有当点击年份为当天所在月
		 	nowday=new Date().getDate();
		 }
		var dayOfWeek=getWeekday(years,months,1); //获取当前月得第一天是周几
		drawDate(years,months,dayOfWeek,nowday);
    });
    $('#yearSe').change(function(){
    	var years=$('#yearSe').val();   //当前年份
		 var months=getMonth(this.innerText);       //当前月份
		 if(months==""||months.length==0){
		 	months=new Date().getMonth()+1;
		 }
		 var nowday='';
		 if(years==new Date().getFullYear()&&months==new Date().getMonth()+1){  //只有当点击年份为当天所在月
		 	nowday=new Date().getDate();
		 }
		var dayOfWeek=getWeekday(years,months,1); //获取当前月得第一天是周几
		drawDate(years,months,dayOfWeek,nowday);
    })
    $("#img").bind("click",function(){
	   initVersion();
	})
})  

	function getWeekday(years,months,days){
		var NewDate=new Date(years,months-1,days);
		return NewDate.getDay();  //获取当前天数是周几
	}
	function getMonth(months){
		var monthsData='';
		debugger;
		switch(trim(months)){
			case '一月':monthsData=1;break;
			case '二月':monthsData=2;break;
			case '三月':monthsData=3;break;
			case '四月':monthsData=4;break;
			case '五月':monthsData=5;break;
			case '六月':monthsData=6;break;
			case '七月':monthsData=7;break;
			case '八月':monthsData=8;break;
			case '九月':monthsData=9;break;
			case '十月':monthsData=10;break;
			case '十一月':monthsData=11;break;
			case '十二月':monthsData=12;break;
		}
		return monthsData;
	}
	//去除空格
	function trim(str) {
	  return str.replace(/(^\s+)|(\s+$)/g, "");
	}
	
	



function getRun(years){
	//判断当前年份是否是闰年
	if(years%4==0&&years%100!=0||years%400==0){
		return true;
	}else{
		return false;
	}
}
function getDaysFromMonths(years,months){
	//根据年月获取有多少天
	var daysValue='';
	switch(months){
		case '1','3','5','7','8','10','12': daysValue=31;
		case '4','6','9','11':daysValue=30;
		case '2':
		if(getRun(years)){
			daysValue=28;
		}else{
			daysValue=27;
		}
		break;
	}
}
/*
 * @param 
 * years:年份   
 * months:月份   
 * daysOfWeek: 当前月第一天所在周得索引
 * NowDay: 今天
 */
function drawDate(years,months,dayOfWeek,NowDay){
	var code="";
	var days_per_month = new Array(31, getRun(years)?29:28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);//创建月份数组
	code+="<table cellspacing='0'><tr><td colspan ='7'>" + years + "年" + (months) + "月" + "</td></tr>";
	code+="<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>";
   for(var i=0;i<6;i++){ //日历表格的行数
   	    code+="<tr>";
       for(var j=0;j<7;j++){ //日历表格的列数 (0~6)对应周日~周六
       	  
       	  var idx = 7 * i + j; //为每个表格创建索引,从0开始，总共是35个
          var date = idx - dayOfWeek + 1; //将当月的1号与星期进行匹配
           (date <= 0 || date > days_per_month[months-1]) ? date = ' ': date = idx - dayOfWeek + 1; //索引小于等于0或者大于月份最大值就用空表格代替
          date == NowDay ? code+='<td class="today">' + date + '</td>' : code+='<td id="tdate">' + date + '</td>'; //高亮显示当天
       }
   	code+="</tr>";
   }
   code+="</table>";
   document.getElementById("cander").innerHTML=code;
}

//初始化界面
function initVersion(){
	var years=new Date().getFullYear();
	var months=new Date().getMonth()+1;
	var days=new Date().getDate();
	var dayOfWeek=getWeekday(years,months,1); //获取当前月得第一天是周几
	drawDate(years,months,dayOfWeek,days);
	setInterval(function(){
	document.getElementById('info').innerHTML=getDateStr();
    },1000);
}

//获取当前时间
function getDateStr(){
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var day=date.getDate();
	var hour=date.getHours();
	var min=date.getMinutes();
	var second=date.getSeconds();
	
	var dateStr=hour+':'+min+':'+second;
	return dateStr;
}
