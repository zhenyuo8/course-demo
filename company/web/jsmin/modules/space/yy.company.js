$(document).ready(function(){$("div.treeHovera").mouseover(function(){$(this).addClass("blueBg treeHoverLink")}).mouseout(function(){$(this).removeClass("blueBg treeHoverLink")});$(".minus1,.minus2,.minus3").live("click",function(){FunToggle($(this),0,1,yyBaseurl+"/space/member/ajaxget")});$(".plus1,.plus2,.plus3").live("click",function(){var a=$(this).prevAll("img").length+2;FunToggle($(this),1,1,yyBaseurl+"/space/member/ajaxget","CardDeep_"+a)});$(".linkfocus,#search").live("click",function(){$("#opAll").attr("class","fl").html($(this).html());var a=($(this).attr("data"));window.location=yyBaseurl+"/space/member/card/dept_id/"+a});$("#opAll").live("click",function(){if($(this).hasClass("zhankai")){$(this).removeClass("zhankai").addClass("zhedie");$(".treeListIn:first").hide();return false}if($(this).hasClass("zhedie")){$(".treeListIn:first").show();$(this).removeClass("zhedie").addClass("zhankai");return false}});$("h2.treeDept").live("click",function(){var b=$(this).parent().nextAll("section");var a=$(this).children("span").attr("class")=="zhankai"?"zhedie":"zhankai";if(a=="zhankai"){b.remove();FunGetSubMemeber($(this),yyBaseurl+"/space/member/ajaxmember");b.hide()}$(this).next("div").toggle();$(this).children("span").attr("class",a);b.toggle()})});