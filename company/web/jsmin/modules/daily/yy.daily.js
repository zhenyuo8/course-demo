var Daily=function(b){var a=this;a.init=function(){a.datepickerInit={prevText:"上月",nextText:"下月",dateFormat:"yy-mm-dd"};a.noticeUser=b.noticeUser;a.today=b.today};a.datepickers=function(e){if(typeof(e)=="object"){for(var c=0;c<e.length;c++){$("#"+e[c]).datepicker(a.datepickerInit)}}else{return}};a.load=function(){$("a#yy-daily-shareuser").fancybox({width:550,height:400,type:"iframe"});$(".icoGlrw").fancybox();$(".rcAddmenr").fancybox({onComplete:function(f){var g={};g=$(f).parent().parent().find(".rcAddmenListUl");var c=$(f).attr("for");$("#consoleBtn_"+c).live("click",function(){var j="";var e=$("#selectedContainter").find("figure");if(e.length<1){$(this).parent().prepend('<font color="red">请选择人员！</font>');return}for(var h=0;h<e.length;h++){var l=$(e[h]).attr("itemid");var k=$(e[h]).text().split("(");j+='<li id="yyauto_li_'+l+'" class="clearfix rcAddmenListli"><span>'+k[0]+'</span><input type="hidden" value="'+l+'" name="'+c+'_value[]"><a class="close" href="javascript:;"></a></li>'}$(g).prepend(j).find(".close").bind("click",function(){$(this).parent().remove()});$.fancybox.cancel();$.fancybox.close()})}});$.yy.defaultText({daily_message:"写日志",daily_p:"添加通知人",group_p:"关联任务"});$("#daily_p").yyautocomplete({defaultValue:a.noticeUser,appendTo:"#daily_div",selAppendTo:"#daily_list",ajaxUrl:YY.util.url("/common/search/ccnotice")})};a.listen=function(){$("#daily_message").keyup(function(){var c=$("#daily_message");if(c.length!=0){$("#savesubmit").attr("disabled",false).removeClass("darkGrayButton").addClass("blueButton")}}).yyautoWrap(1000);$("input[name='daily[content][]']").live("keyup",function(){var c=false;$("input[name='daily[content][]']").each(function(e){if($(this).val()!=""){c=true}});if(c){$("#savesubmit").attr("disabled",false).removeClass("darkGrayButton").addClass("blueButton")}else{$("#savesubmit").attr("disabled",true).removeClass("blueButton").addClass("darkGrayButton")}});$(".daily_add").live("click",function(){if($(".daily_contain").length==12){$.yy.rscallback("最多允许添加12个时间段！",1);return}$("#daily_bigcontain").append($("#daily_more").clone(false));$(".daily_contain:last").attr("id","");$(".daily_contain:last #dailyDate").remove();$(".daily_contain:last input").val("")});$(".daily_delete").live("click",function(){if($(".daily_contain").length==1){$.yy.rscallback("最少需要一个时间段！",1);return}$(this).closest(".daily_contain").remove()});$("#daily_relation").load(yyBaseurl+"/daily/index/ajaxdaily/ .ajaxdaily");$(".yy-share-user").load(yyBaseurl+"/daily/index/getshare");$("#daily_button").live("click",function(){var c=$("#startDate").val();var f=$("#endDate").val();var e=$("#member_name").val();if(e==""){YY.util.ajaxApi(url("/daily/index/ajaxmydaily/startTime/"+c+"/endTime/"+f),function(h,g){$("#getcontent").html(h)},"GET","html")}else{YY.util.ajaxApi(url("/daily/index/ajaxfrienddaily/startTime/"+c+"/endTime/"+f),function(h,g){$("#getcontent").html(h)},"GET","html")}});$("#friendDaily").live("click",function(){var c=$(this);YY.util.ajaxApi(url("/daily/index/ajaxfrienddaily/"),function(f,e){$("#getcontent").html(f);c.closest("menu").children("li").removeClass("cur");c.parent().addClass("cur")},"GET","html")});$("#dailyAddForm").live("submit",function(){if($("#shareto").length>0){$("#type").val($("#shareto").val()==-1?"0":"8");$("#type_id").val($("#shareto").val()==-1?"0":$("#shareto").val());$("#group_id").val($("#shareto").val()==-1?"0":$("#shareto").val())}});$("#person a").live("mouseover",function(){$("#person ul").hide();$("#person a").removeClass("cur fontB");$(this).addClass("cur fontB");$($(this).attr("href")).show()});$("#person input").live("click",function(){$("#type").val("8");$("#type_id").val($(this).val());$("menu.rcShareLi").find("input").attr("checked",false);$("#typeSelect5").attr("checked",true);$("#notice_p_yy_dl").html($(this).parent().find("span").html());$.fancybox.close()})}};if(typeof Daily!="undefined"){var d=new Daily(dailyInfo)}$(document).ready(function(){d.init();d.datepickers(["dailyDate","startDate","endDate"]);d.load();d.listen()});