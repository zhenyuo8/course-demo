var isDeleting=false;function delUser(c,a,b){if(isDeleting){return false}isDeleting=true;$.ajax({type:"POST",url:yyBaseurl+"/calendar/user/ajaxDel",data:"id="+c+"&sorts="+a+"&memberid="+b,success:function(g){setTimeout(function(){isDeleting=false},100);if(g){var f=$("#scroll_shower").css("top");f=f.replace("px","");f=parseInt(f);var e=$("#yyOtheruserList").children("li").eq(0).height();if(f<0){f=f+e+6;if(f>0){f=0}$("#scroll_shower").attr("style","position: absolute; top: "+f+"px;")}else{$("#scroll_shower").attr("style","position: absolute; top: 0px;")}var d=$("#yyOtheruserList").height();if(d<370){$("#scroll_scroller").hide()}$("#yyOtheruserList").empty().append(g)}else{$("#yyOtheruserList").empty()}}});return false}function removeUser(a){$.ajax({type:"POST",url:yyBaseurl+"/calendar/user/ajaxDel",data:"id="+a,success:function(b){if(b){$("#user_"+a).remove()}}});return false}function lockUser(b,a){$.ajax({type:"POST",url:yyBaseurl+"/calendar/user/ajaxLock",data:"id="+b+"&status="+a,success:function(c){if(c){$("#userResult").load(yyBaseurl+"/calendar/user/otheruser .otherResult")}else{$.yy.rscallback("错误",1)}}});return false}$(document).ready(function(){$("#moreOtherUserLink").live("click",function(){$("#bar_body").one("click",function(a){$("#moreUser").hide()});$("#moreUser").toggle();return false});$("#userResult").load(yyBaseurl+"/calendar/user/otheruser .otherResult");$("#otherCalendar").fancybox();$(".icoSuoding").mouseover(function(){$(".icoSuoding").show()});$("#createSchedule").click(function(){$("#rlRight").hide();$("#rili_hidden").show();$("#calendarBox").css("display","none")});$("#searchOrder").live("click",function(){$(this).toggleClass("up").toggleClass("down");$("#orderBy").val($(this).hasClass("up")?"desc":"asc");$("#calendarSearchForm").submit()});$(".otherResult").live({mouseenter:function(){$(this).children().eq(2).removeClass();$(this).children().eq(2).addClass("yy-user-item-delete fr user_Del")},mouseleave:function(){$(this).children().eq(2).removeClass();$(this).children().eq(2).addClass("yy-user-item-delete fr user_Del hidden")}})});