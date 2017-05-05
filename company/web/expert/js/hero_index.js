/*author:英雄づ小将*/
/*versions:1.0*/

$(function(){
	$("html").append('<div class="translucent"></div><div id="model"><div class="close">&times;</div><div id="modelcon"></div></div>');
	$("#dropmenu ul").mouseenter(function(){
		$(this).css('height','auto');
	}).mouseleave(function(){
		$(this).css('height',33);
	});
	$("#dropmenu li").click(function(){
		$(this).prependTo($(this).parent());
		$(".auto_con").hide().eq($(this).data('index')).show();
		$("#floatmenu li").eq($(this).data('index')).addClass("current").siblings().removeClass("current");
	});
	$("#floatmenu li").click(function(){
		$this=$(this);
		$(".auto_con").hide().eq($(this).index()).show();
		$(this).addClass("current").siblings().removeClass("current");
		$("#dropmenu li").each(function(index, element) {
			if($(element).data('index')==$this.index())
			{
				$(element).prependTo("#dropmenu ul");
			}
		});
	});
	$(".zjlist li").click(function(){
		$("#modelcon").html($(this).html());
		$(".translucent").show();
		$("#model").css('top',$(window).scrollTop()+50).show();
	});
	$(".translucent").click(function(){
		$(this).hide();
		$("#model").hide();
	});
	$("#model").delegate(".close",'click',function(){
		$(".translucent").hide();
		$("#model").hide();
	});
});
