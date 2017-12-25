
document.addEventListener("deviceready", onDeviceReady, false);
var interval=1;
var setInt=null;
var setIntTable=null;
var startBtnState=false;
var textRandomIndexLast=0;
var nums=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
var startTime=0;
var milliSec=0;
var currentTab="color";
var prevTab="";
var timeTableClicked=0;
var currentNumber=1;
var prevRecord=0;
var isStart=false;
// device APIs are available
//	
var colorNames=['زرد','سیاه','قرمز','سبز','آبی','سفید','بنفش']	;
var colors=['#FF0','#000','#D00','#0D0','#00D','#FFF','#b642ff']	;

function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
	document.addEventListener("backbutton", onBackKeyDown, false);
	navigator.splashscreen.hide();
}

var lastreq = 0;

function onBackKeyDown(e) {
    e.preventDefault();
        $.hyc.ui.alert({
            content: 'آیا مایلید از نرم افزار خارج شوید؟',
            buttons: [{
                name: 'بله',
                id: 'confirmBtn',
                color: '#fff',
                bgColor: '#f31',
                callback: function() {
                    $("#sortable").empty();
                    $("#sortable").append(localStorage.animationListSave);
                    this.close();
                    navigator.app.exitApp();
                },
                closable: false
            }, {
                name: 'خیر',
                id: 'cancelBtn',
                color: '#000',
                bgColor: '#fff',
                callback: function() {
                    this.close();
                },
                closable: false
            }],
            closable: false
        });
}



$(document).ready(function () {

	"use strict";
	if (navigator.userAgent.match(/(iPad.*|iPhone.*|iPod.*);.*CPU.*OS 7_\d/i)) {
		$("body").addClass("ios7");
		$("body").append('');
	}
	
	if(localStorage.recordTime){
			prevRecord=localStorage.recordTime;
			$(".recordVal").text(prevRecord);
			$(".recordVal").append(" ثانیه ");
	}
	else{
		$(".recordVal").text('-');
	}
	
	$(function() {
	FastClick.attach(document.body);
});

	/// Brightness slider

	$('#brightnessSlider').slider({
		highlight: true,
		stop: function (event, ui) {
			$(".brightnessVal").text($('#brightnessSlider').val()/10);
			$(".brightnessVal").append(" ثانیه ");
			interval=$('#brightnessSlider').val()/10;
			//TODO: send command to ESP
		}
	});

	var lastreq = 0;
	$('#brightnessSlider').on("change", function () {
		localStorage.setItem("brightnessValue5", $('#brightnessSlider').val());
			$(".brightnessVal").text($('#brightnessSlider').val()/10);
			$(".brightnessVal").append(" ثانیه ");
			interval=$('#brightnessSlider').val()/10;
		if (startBtnState){
			clearInterval(setInt);
				setInt=setInterval(intervalFunc,interval*1000);
			
		}
			//TODO: send command to ESP
		

	});
	

if(localStorage.brightnessValue5){
	
	$('#brightnessSlider').val(localStorage.brightnessValue5).slider('refresh');
	$(".brightnessVal").text($('#brightnessSlider').val()/10);
	$(".brightnessVal").append(" ثانیه ");
	interval=$('#brightnessSlider').val()/10;
}
else{
	$('#brightnessSlider').val(10).slider('refresh');
	$(".brightnessVal").text($('#brightnessSlider').val()/10);
	$(".brightnessVal").append(" ثانیه ");
	interval=$('#brightnessSlider').val()/10;
}

$('#startButtonWords').click(function(){
	if(!startBtnState){
	startBtnState=true;
	$('#startButtonWords').text('بسه');
	$('#startButtonWords').css('background', '#A00');
	intervalFunc();
	setInt=setInterval(intervalFunc,interval*1000);
	}
	else{
	startBtnState=false;
	$('#startButtonWords').text('شروع');
	$('#startButtonWords').css('background', '#29771d');
	clearInterval(setInt);
	}
});

$("#shTable").html(createTable());

$('#tableRefresh').click(function(){
isStart=true;
nums=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];	
$("#shTable").html(createTable());
clearInterval(setIntTable);
startTime=0;
$('#tableRefresh').text('از نو');
	$('#tableRefresh').css('background', '#ef9f00');
tableTime();
setIntTable=setInterval(tableTime,1000);
$('#currentNum').text('1');
		$('#currentNum').append(' عدد بعدی ');
		currentNumber=1;
milliSec=new Date();
milliSec=milliSec.getTime();
});

$('.aboutButton').click(function(){
	$.hyc.ui.alert({
            content: 'Created by: A. Sajadian',
            buttons: [{
                name: 'OK',
                id: 'confirmBtn',
                color: '#fff',
                bgColor: '#090',
                callback: function() {
                    $("#sortable").empty();
                    $("#sortable").append(localStorage.animationListSave);
                    this.close();
                },
                closable: true
            }],
            closable: true
        });
});

$('.tableTab').click(function(){
currentTab="table";
clearInterval(setInt);
startBtnState=false;
$('#startButtonWords').text('شروع');
	$('#startButtonWords').css('background', '#29771d');
});
$('.colorTab').click(function(){
	startTime=0;
$(".tableTimeVal").text(startTime);
$('.tableTimeVal').css('color','#000');
currentTab="color";
clearInterval(setIntTable);
$('#tableRefresh').text('شروع');
	$('#tableRefresh').css('background', '#29771d');
});

$('#shTable').on('tap','td', function(){
if(isStart){
	if ($(this).text()==currentNumber){
		$('#numTapMsg').stop(true, true);
		$('#numTapMsg').html('<i style="color: #0A0;" class="icon-rainemo-thumbsup footerIcon"></i>');
		$('#numTapMsg').show();
		$('#numTapMsg').fadeOut(1000);
		console.log('yay!');
		currentNumber++;
		if (currentNumber==26){
			var endMillisec=new Date();
			endMillisec=endMillisec.getTime();
			var record=Math.round((endMillisec-milliSec)/10);
			record/=100;
			console.log(record);
			clearInterval(setIntTable);
			startTime=0;
			$('#tableRefresh').text('شروع');
			$('#tableRefresh').css('background', '#29771d');
			$('#currentNum').html('<span>زمان شما: '+record+' ثانیه </span><i style="color: #000;" class="icon-rainemo-coffee footerIcon"></i>');
			$(".tableTimeVal").text('');
			$('.tableTimeVal').css('color','#000');
			if(prevRecord!=0){
				if(record<prevRecord){
					console.log('new rec');
					prevRecord=record;
					localStorage.recordTime=prevRecord;
					$(".recordVal").text(prevRecord);
					$(".recordVal").append(" ثانیه ");
					$.hyc.ui.alert({
            content: 'تبریک! یک رکورد جدید ثبت کردید!',
            buttons: [{
                name: 'آخ جون',
                id: 'confirmBtn',
                color: '#fff',
                bgColor: '#2b65e2',
                callback: function() {
                    this.close();
                    navigator.app.exitApp();
                },
                closable: false
            }],
            closable: false
        });
				}
			}
			else{
					prevRecord=record;
					localStorage.recordTime=prevRecord;
					$(".recordVal").text(prevRecord);
					$(".recordVal").append(" ثانیه ");
			}
			isStart=false;
		}else{
		$('#currentNum').text(currentNumber);
		$('#currentNum').append(' عدد بعدی ');
		}
	}else{
		$('#numTapMsg').stop(true, true);
		$('#numTapMsg').html('<i style="color: #A00;" class="icon-rainemo-displeased footerIcon"></i>');
		$('#numTapMsg').show();
		$('#numTapMsg').fadeOut(1000);
		console.log('pif!');
	}
}
});
});



function intervalFunc(){ 
	var textRandomIndex=Math.floor(Math.random() * colors.length);
	while(textRandomIndex==textRandomIndexLast){
		textRandomIndex=Math.floor(Math.random() * colors.length);
	}
	var colorRandomIndex=Math.floor(Math.random() * colors.length);
	while(textRandomIndex==colorRandomIndex){
		colorRandomIndex=Math.floor(Math.random() * colors.length);
	}
	var htmltext='<span style="color:'+ colors[colorRandomIndex] +'">'+colorNames[textRandomIndex] +'</span>';
	$('#colorNameText').html(htmltext);

	
	textRandomIndexLast=textRandomIndex;
	}
	
	function tableTime(){
		
$(".tableTimeVal").text(startTime);
if(startTime>29){
$('.tableTimeVal').css('color','#F00');
}
else{
$('.tableTimeVal').css('color','#000');	
}
			$(".tableTimeVal").append(" ثانیه ");
	startTime++;
}

var prevColor=colors[0];
	
function createTable(){
	var htmlTable="";
	htmlTable+='<table>';
	for (var i=0; i<5; i++){
		htmlTable+='<tr>';
		for (var j=0; j<5; j++){
			var currColor=colors[Math.floor(Math.random() * colors.length)];
			while (prevColor==currColor) {currColor=colors[Math.floor(Math.random() * colors.length)];}
			prevColor=currColor;
			htmlTable+='<td style="color:'+ currColor +'">';
			var cellIndex=Math.floor(Math.random()*nums.length);

			var cellNum=nums[cellIndex];
			nums.splice(cellIndex,1);

			htmlTable+=cellNum;
			htmlTable+='</td>';
		}
		htmlTable+='</tr>';
	}
	return htmlTable;
}

