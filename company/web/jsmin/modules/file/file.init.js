$(document).ready(function(){loadScript(["plugin/yy.dataTable.js","modules/file/file.table.js","modules/file/file.navigation.js","modules/file/file.sharelist.js","modules/file/yy.boxadd.js"],{fn:function(){var a=new fileNavigation();a.init();var b=new shareList({selector:$("#yyDataTable").find("div.yy-doc-share")});b.init();(function(){$(".yy-file-operate-list","#yyDataTable").live({mouseenter:function(){var j=$(this);j.addClass("relative").children().children("aside").removeClass("hidden")},mouseleave:function(){var j=$(this);j.removeClass("relative").children().children("aside").addClass("hidden")}});$.yy.followCommon({setsId:"#yyDataTable",confirm:{txt:"关注",css:"confirm"},cancel:{txt:"取消关注",css:"cancel"},reload:false,followSelector:".yy-follow-doc"});var i=10,g=10,f="doc-del-containter",e="doc-del-confirm",h="doc-del-cancel";$(".doc-del").live("click",function(){var l=$(this),n=l.closest("div.yy-file-operate-list").parent(),m=l.attr("fid"),k=l.attr("for"),j=l.attr("flag"),o=l.attr("callback");clearTimeout(i);g=setTimeout(function(){n.children("."+f).length?n.children(".delTk").removeClass("hidden"):n.append('<div class="delLay relative fl yy-delete z5" style="left:48px;top:20px;"><aside class="delTk doc-del-containter">确定要删除该'+l.attr("name")+'？<br/><a href="javascript:;" url="'+k+'" fid="'+m+'"'+((typeof(j)!="undefined")?' flag="'+j+'"':"")+((typeof(o)!="undefined")?' callback="'+o+'"':"")+' class="'+e+'">删除</a> <a href="javascript:;" class="'+h+'">不删除</a><span class="sj xsj"></span></aside></div>');$(".yy-file-operate-list").trigger("mouseleave")},300);return false});function c(l){var n=l.attr("fid"),k=l.attr("flag"),m="dd",j=$('a[item_id="'+n+'"]',"#subnav-containter-"+k);if(j.attr("floor_id")>0&&(j.attr("floor_id")!=j.attr("item_id"))){m="li"}j.closest(m).remove()}$("."+e,"#yyDataTable").live("click",function(){var m=$(this),l=m.attr("url"),n=m.closest("."+f),j=[c],o=m.attr("callback"),k=m.attr("flag");n.addClass("hidden");$.ajax({type:"GET",url:l,success:function(p){if(p==1){$.yy.rscallback("删除成功");n.remove();a.reload();if(typeof(o)!="undefined"){j[o](m)}}else{if(p==0){$.yy.rscallback("删除失败")}}}});return false});$("."+h,"#yyDataTable").live("click",function(){var j=$(this);j.closest("."+f).addClass("hidden");return false});$(".doc-edit-folder","#yyDataTable").live("click",function(){$("#right-option-newfolder").trigger("click",$(this).attr("boxid"))});$(".doc-enter-subfolder","#yyDataTable").live("click",function(){var j=$(this);$("#right-option-folder","#doc-right-option-containter").trigger("click",[j.attr("boxid"),j.html()])});var d=["","self","corp"];$(".zsUp","#yyDataTable").live("click",function(){var k=$(this);var j=yyBaseurl+"/file/box/orderup",l={boxid:k.attr("boxid"),pid:k.attr("pid"),type:k.attr("type")};YY.util.ajaxApi(j,function(n,m){if(n&&n.rs==true&&n.type==="upper"&&m==="success"){$.yy.rscallback("操作成功！");a.leftSubNavSyncSort(d[l.type],l.boxid,"up",l.pid);a.reload()}},"GET","json",l)});$(".zsDown","#yyDataTable").live("click",function(){var k=$(this);var j=yyBaseurl+"/file/box/orderdown",l={boxid:k.attr("boxid"),pid:k.attr("pid"),type:k.attr("type")};YY.util.ajaxApi(j,function(n,m){if(n&&n.rs==true&&n.type==="downer"&&m==="success"){$.yy.rscallback("操作成功！");a.leftSubNavSyncSort(d[l.type],l.boxid,"down",l.pid);a.reload()}},"GET","json",l)});$(".searchfiletype").live({mouseenter:function(){var j=$(this);j.children("aside").removeClass("hidden")},mouseleave:function(){var j=$(this);j.children("aside").addClass("hidden")}});$(".docTypeSearch a","#yyDataTable").live("click",function(){var m=$(this),n=m.attr("data"),l=m.attr("type"),k=m.attr("boxid"),j={fileext:n};if(l){j.type=l}if(k){j.boxid=k}a.reload(null,null,function(){$(".docTypeSearch a","#yyDataTable").show();m.hide();$(".typeAll").html(m.html())},j);return false});$("#doc-corp-cancel").live("click",function(){$("#corp-newfloder-containter").remove();a.reload()});$("input[name='groupDocSub']").live("click",function(){var q=$("#videoSta").val();var m=[];var l=$("form[name='myform']");$('input[name="share_div_value[]"]',l).each(function(r){m.push($(this).val())});var o=$("#gid",l).val();var p=$("#fids",l).val();if(q>0){var k=YY.util.url("/file/act/urlupload");var j={videourl:$("#videoUrl").val(),boxid:$("#boxid").val(),gid:o,videoSta:q};YY.util.ajaxApi(k,function(t){if(t.rs){if(p){var s=p+","+t.data.fid}else{var s=t.data.fid}if(s&&s!="undefined"){if(typeof($("#fid").val())=="undefined"||$("#fid").val()==""){var r={fids:s,fileFromObj:$("#fileFromObj",l).val(),uploadGroupID:$("#uploadGroupID",l).val(),share_div_value:m,boxid:$("#boxid",l).val()};YY.util.ajaxApi(l.attr("action"),function(u){if(u.rs){$.yy.rscallback("上传成功")}else{$.yy.rscallback(u.error,1)}},"POST","json",r)}}if(o){var r={fids:s,fileFromObj:$("#fileFromObj",l).val(),gid:o};YY.util.ajaxApi(l.attr("action"),function(u){if(u.rs){$.yy.rscallback("上传成功")}else{$.yy.rscallback(u.error,1)}},"POST","json",r)}}else{$.yy.rscallback(t.error,1)}},"POST","json",j)}else{if($("input.groupUploadFids").val()!=""){if(typeof($("#fid").val())=="undefined"||$("#fid").val()==""){var n={fids:$("#fids",l).val(),fileFromObj:$("#fileFromObj",l).val(),uploadGroupID:$("#uploadGroupID",l).val(),share_div_value:[],boxid:$("#boxid",l).val()};$('input[name="share_div_value[]"]',l).each(function(r){n.share_div_value.push($(this).val())});YY.util.ajaxApi(l.attr("action"),function(r){if(r.rs){$.yy.rscallback("上传成功")}else{$.yy.rscallback(r.error,1)}},"POST","json",n)}if(o){var n={fids:$("#fids",l).val(),fileFromObj:$("#fileFromObj",l).val(),gid:o};YY.util.ajaxApi(l.attr("action"),function(r){if(r.rs){$.yy.rscallback("上传成功")}else{$.yy.rscallback(r.error,1)}},"POST","json",n)}}}$(".groupUploadColose").click()})})()}})});