var Screen=function(b){var a=this;a.listen=function(){a.ajaxGetData=function(){var e=$("#screenRole").val();var g=$(".screenItem").size();var f="status="+e+"&offset="+g;YY.util.ajaxApi(YY.util.url("/screen/index/middle"),function(h){if(g){$("#screenList").append(h)}else{$("#screenList").html(h)}if(h.indexOf("screenItem")==-1){$("#moreScreen").hide()}else{$("#moreScreen").show()}if(e==4){$(".apply_yes").removeClass("hidden")}},"POST","html",f)};$("#fyd1 ~ li").bind("click",function(){var f=$(this);var g=f.attr("data");var h=f.attr("role");$("li[role='"+h+"']").removeClass("cur");f.addClass("cur");$("#screenRole").val(g);if(g==4){$("#action_box").removeClass("hidden");var e=$("#applyno").attr("check");$("li[check='"+e+"']").removeClass("cur");$("#check_0").addClass("cur")}else{$("#action_box").addClass("hidden")}$("#screenList").children(".screenItem").remove();a.ajaxGetData()});$("#applyno li").bind("click",function(){var g=$(this);var f=g.attr("flag");var e=g.attr("check");if(f==1){$(".show_manage").removeClass("hidden")}$("li[check='"+e+"']").removeClass("cur");g.addClass("cur");$("#screenflag").val(f);$("#screenList").children(".screenItem").remove();a.ajaxGetApply();$("#action_box").removeClass("hidden");$(".apply_yes").removeClass("hidden")});a.ajaxGetApply=function(){var e=$("#screenflag").val();var g=$(".screenItem").size();var f="status=4&flag="+e+"&offset="+g;YY.util.ajaxApi(YY.util.url("/screen/index/middle"),function(h){if(g){$("#screenList").append(h)}else{$("#screenList").html(h)}if(h.indexOf("screenItem")==-1){$("#moreScreen").hide()}else{$("#moreScreen").show()}if(e==1){$(".show_manage").removeClass("hidden")}$(".apply_yes").removeClass("hidden")},"POST","html",f)};$(".yy-delete-link").live("click",function(){$(this).closest("div").find(".yy-delete:first").trigger("click")});var d=10,c=10;$(".yy-delete").live("click",function(){var e=$(this);clearTimeout(d);c=setTimeout(function(){e.children(".delTk").length?e.children(".delTk").removeClass("hidden"):e.append('<aside class="delTk">确定要删除该事件？<br/><a href="#yy-delete-confirm" class="yy-delete-confirm">删除</a> <a href="#yy-delete-cancel" class="yy-delete-cancel">不删除</a><span class="sj xsj"></span></aside>')},300)});$(".yy-delete-confirm").live("click",function(){var f=$(this);var e=yyBaseurl+"/screen/index/delmyScreen",g={id:f.closest("section").attr("resource-id")};YY.util.ajaxApi(e,function(i,h){if(i&&i.rs==true&&i.type==="delete"&&h==="success"){f.closest(".delTk").addClass("hidden");f.closest(".screenItem").fadeOut("slow",function(){f.closest(".screenItem").remove();$.yy.rscallback("操作成功！")})}},"GET","json",g);return false});$(".yy-delete-cancel").live("click",function(){var e=$(this);e.closest(".delTk").addClass("hidden");return false})}};