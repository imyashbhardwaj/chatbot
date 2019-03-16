var d=new Date();

var m=d.getMinutes();
var h=d.getHours();
if(m<10){
m='0'+m;
}
if(h<10){
h='0'+h;
}
if(h<12){
var date=h+":"+m+" AM";
}
else{
h=h-12;
h='0'+h;
var date=h+":"+m+" PM";
}

$(".msgs").append("<div class='conv compResponse'>&nbsp;<i class='fa fa-quote-left'></i><span class=textback>Hello,how can I help you regarding Copyrights?&nbsp;</span><br><font size='2	px'>"+date+"</font></div>");
document.getElementById("msg").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
document.getElementById("send").click();
  }
});
$("#min").click(function(){
$(".chatbox-body").hide(500,show);
});
function show(){
$("#min").hide();
}
$(".chatbox-head").click(function(){
if ( $(".chatbox-body").css('display') == 'none' ){
$(".chatbox-body").show(500);
$("#min").show();
}
});

function send(){
var v=document.getElementById("msg").value;
console.log("got value");
var d1=new Date();
m=d1.getMinutes();
h=d1.getHours();
if(m<10){
m='0'+m;
}
if(h<10){
h='0'+h;
}
if(h<12){
date=h+":"+m+" AM";
}
else{
h=h-12;
h='0'+h;
date=h+":"+m+" PM";
}
$(".msgs").append("<div class='conv userResponse'><span class=textback>&nbsp;"+v+"&nbsp;</span><i class='fa fa-quote-right' aria-hidden='true'></i><br><font size='2px'>"+date+"</font></div>");
document.getElementById("msg").value="";

$.ajax({
   url: 'http://127.0.0.1:1337/watson1/',
   data: {data:v},
   dataType: 'json',
   success: response,	
   error: function() {
      console.log("error no data came");
	  },
   
   type: 'POST'
});

function response(data){
console.log(data);
$(".msgs").append("<div class='conv compResponse'><i class='fa fa-quote-left'></i><span class=textback>&nbsp;"+data.data+"&nbsp;</span><br><font size='2px'>"+date+"</font></div>");
$(".chatbox-body").scrollTop(100000);
}
}



