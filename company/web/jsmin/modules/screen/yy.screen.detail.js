if(typeof Screen!="undefined"){var screen=new Screen()}$(document).ready(function(){var b=[{txt:"发言",id:0,css:"icoFy"}];if($("#fyd").html()==""){combo=new $.yy.comboDiv({fy:{defaultid:0,data:b},fyd:{defaultid:0,remote:yyBaseurl+"/api/info/mygroup/substr/18",format:function(e){var d=e.data,g=[];for(var f in d){g.push({title:d[f].group_name,txt:(d[f].labelTitle+(d[f].pub==1?"":'<span class="icoSuo"></span>')),id:d[f].gid})}return g},callback:function(d){$("#type_id,#groupid").val(d)}}})}else{combo=new $.yy.comboDiv({fy:{defaultid:0,data:b}});$("li#fyd").css({"padding-left":"10px"})}$("#addTopicBtn").live("click",function(){});$("#moreScreen").live("click",function(){var f=$(this);f.html("加载中...");var e=$(this).attr("data");var d=$(this).parent().prev();var g=d.find("section").attr("feed-updatetime");YY.util.ajaxApi(e,function(h){if(h.indexOf("nodata")!=-1){f.html("没有更多内容了");$("#moreScreen").die("click")}else{$(h).insertBefore(f.parent());f.html("查看更多>>")}},"POST","HTML","updatetime="+g)});$("#content_yy_dl").text("");var a=$("#content_div");a.html('<a tabindex="-1" category="45" for="'+yyBaseurl+"/topic/topic/convs/topic_id/"+topicId+'" default="'+topicTitle+'" ele_role="need" class="ya_contentA icoHt">'+topicTitle+"</a>");var c=$("#savesubmit");loadUploadCtr()});function loadUploadCtr(){YY.util.initUpload(function(){new InitUpload({button_placeholder_id:"spanButtonPlaceHolder",upload_url:YY.util.url("/file/act/swfupload/fileFrom/")+$("#fileFrom").val()+"/gid/"+$("#group").val()})})}function setTopic(a){$("#content_yy_dl").val();$("#content").val("#"+a+"#")}function appendTopic(b){$("#topic_warp").show();$("li.addTopicLi").toggle();$(".addTopicFinished").children("a").text("编辑话题");if($.trim(b)==""){return false}var a=$("<li></li>").addClass("gzBiaoqiana clearfix");$("<span></span>").html(b).appendTo(a);$('<input type="hidden" name="topic_new_value[]" />').val(b).appendTo(a);$('<a href="###" class="close"></a>').bind("click",function(){$(this).parent("li").remove()}).appendTo(a);$("#topic_div").prepend(a);$("#topic_input").val("")};