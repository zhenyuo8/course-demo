jQuery.fn.extend({OpenDiv:function(){var d,f;d=window.screen.availWidth;if(window.screen.availHeight>document.body.scrollHeight){f=window.screen.availHeight}else{f=document.body.scrollHeight+20}var h=document.createElement("div");h.setAttribute("id","BigDiv");h.style.position="absolute";h.style.top="0";h.style.left="0";h.style.background="#111";h.style.filter="Alpha(opacity=70);";h.style.opacity="0.7";h.style.width=d+"px";h.style.height=f+"px";h.style.zIndex="10000";$("body").attr("scroll","no");document.body.appendChild(h);$("#BigDiv").data("divbox_selectlist",$("select:visible"));$("select:visible").hide();$("#BigDiv").attr("divbox_scrolltop",$.ScrollPosition().Top);$("#BigDiv").attr("divbox_scrollleft",$.ScrollPosition().Left);$("#BigDiv").attr("htmloverflow",$("html").css("overflow"));$("html").css("overflow","hidden");window.scrollTo($("#BigDiv").attr("divbox_scrollleft"),$("#BigDiv").attr("divbox_scrolltop"));var a=this.width();var i=this.height();a=parseInt(a);i=parseInt(i);var c=$.PageSize().Width;var k=$.PageSize().Height;var e=$.ScrollPosition().Left;var j=$.ScrollPosition().Top;var g=j+(k/2)-(i/2);var b=e+(c/2)-(a/2);this.css("position","absolute");this.css("z-index","10001");this.css("background","#fff");this.css("left",b+"px");this.css("top",g+"px");if($.browser.mozilla){this.show();return}this.fadeIn("fast")},CloseDiv:function(){if($.browser.mozilla){this.hide()}else{this.fadeOut("fast")}$("html").css("overflow",$("#BigDiv").attr("htmloverflow"));window.scrollTo($("#BigDiv").attr("divbox_scrollleft"),$("#BigDiv").attr("divbox_scrolltop"));$("#BigDiv").data("divbox_selectlist").show();$("#BigDiv").remove()}});$.extend({PageSize:function(){var b=0;var a=0;b=window.innerWidth!=null?window.innerWidth:document.documentElement&&document.documentElement.clientWidth?document.documentElement.clientWidth:document.body!=null?document.body.clientWidth:null;a=window.innerHeight!=null?window.innerHeight:document.documentElement&&document.documentElement.clientHeight?document.documentElement.clientHeight:document.body!=null?document.body.clientHeight:null;return{Width:b,Height:a}},ScrollPosition:function(){var b=0,a=0;if($.browser.mozilla){b=window.pageYOffset;a=window.pageXOffset}else{if($.browser.msie){b=document.documentElement.scrollTop;a=document.documentElement.scrollLeft}else{if(document.body){b=document.body.scrollTop;a=document.body.scrollLeft}}}return{Top:b,Left:a}}});