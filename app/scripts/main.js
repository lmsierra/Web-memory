// jshint devel:true
$("#logo").on('click','button',function () {
	$("#logo").hide();
	$("#header").css("display","inherit");
	$("#nivel").css("display","inherit");
	$("#cuerpo").show();
	return false;
});

$("#header").on('click','a',function () {
	$("#logo").show();
	$("#header").hide();
	$("#nivel").hide();
	return false;
});

$("#cuerpo").on('click','button',function () {
	$("#cuerpo").hide();
	alert($(this).text());
	console.log($("button"));
	return false;
});
