$(document).ready(function(){if($("#homeprovince").length>0){$.initProv("#homeprovince","#homecity")}if($("#workprovince").length>0){$.initProv("#workprovince","#workcity")}$(".datepickerDay").datepicker({prevText:"上月",nextText:"下月",dateFormat:"yy-mm-dd"});$(".datepicker").datepicker({prevText:"上月",nextText:"下月",dateFormat:"yy-mm"});$(".yyExtendH2").bind("click",function(){$(".yyExtendInfoDiv").addClass("hidden");$(this).next(".yyExtendInfoDiv").removeClass("hidden")});$("a.yyExtendDela").bind("click",function(){var g=$(this);$.get(g.attr("data"),function(h){if(h.rs){g.closest("tr").remove()}},"JSON")});$(".yyExtendReset").bind("click",function(){$(".yyExtendHiddenReset").trigger("click")});$(".yyExtendSub,").bind("click",function(){$(".yyExtendNextOp").val("");$("form.yyExtendForm").submit()});$(".yyExtendNext").bind("click",function(){$("form.yyExtendForm").submit()});$(".yyExtendTagInput").bind("focus",function(){if($.trim($(this).val())==$(this).attr("data")){$(this).val("")}}).bind("blur",function(){if($.trim($(this).val())==""){$(this).val($(this).attr("data"))}});$(".yyExtendTagSub").bind("click",function(){if($.trim($(".yyExtendTagInput").val())!=""&&$.trim($(".yyExtendTagInput").val())!=$(".yyExtendTagInput").attr("data")){var g=$(this);$.post(g.attr("data"),"tags="+$(".yyExtendTagInput").val(),function(i){if(i!="false"){var h="";$.each(i,function(l,j){h+='<a href="##" data="'+j.tid+'"><i class="bqclose yyExtendTagDel"></i>'+j.tagname+"</a>"});$(".yyExtendUserTag").append(h)}},"JSON")}});$(".yyExtendTagAdd").bind("click",function(){var g=$(this).parent();$.post(yyBaseurl+"/space/seting/savetag/tags/"+g.text(),function(i){if(i!="false"){var h="";$.each(i,function(l,j){h+='<a href="##" data="'+j.tid+'"><i class="bqclose yyExtendTagDel"></i>'+j.tagname+"</a>"});$(".yyExtendUserTag").append(h)}},"JSON")});$(".yyExtendTagDel").live("click",function(){var g=$(this).parent();$.get(yyBaseurl+"/space/seting/deltag/tid/"+g.attr("data"),function(h){h.rs?g.remove():""},"JSON")});var a=$("#fileDesc"),b=$(".yy-file-desc-input",a),f=$(".placeholder",a),c=f.html(),e=f.width();if(e>125){b.animate({width:(e+5)},"normal")}a.children().bind("click",function(){e=f.width();c=f.html();b.removeClass("hidden");f.addClass("hidden");$("#picInfo").attr("href")==="#yy-file-desc-add"?b.removeAttr("readonly").css("background","#FFF").val("").focus():b.removeAttr("readonly").css("background","#FFF").focus();if(!f.hasClass("hidden")){var g=e<295?300:e+5;b.animate({width:g},"normal")}return false});b.blur(function(){var h=$(this),g=$.trim(h.val());b.addClass("hidden");f.css("background","#E9EDF0").removeClass("hidden");if(g!=""&&g!="编辑我的简介"&&g!=c){YY.util.ajaxApi(yyBaseurl+"/space/ajax/descupdate",function(j,i){f.html(g);e=f.width();$("#picInfo").html("&nbsp;").attr("href","#yy-file-desc-edit")},"POST","html",{content:g});b.animate({width:f.css("width")},"normal")}}).keydown(function(h){var g=$(this);d(h,function(){g.blur()})});function d(i,g){if(typeof g!=="function"){return false}var h=i.keyCode?i.keyCode:(i.which?i.which:i.charCode);if(h==13){g()}}});function confimDept(b,d){var c=$("#dept_name");var a=$("#dept_id");if(b&&d){c.val(d);a.val(b);$.fancybox.close()}};