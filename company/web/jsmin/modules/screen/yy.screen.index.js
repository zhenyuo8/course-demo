if(typeof Screen!="undefined"){var screen=new Screen()}$(document).ready(function(){getScreenList(0);if(typeof screen!="undefined"){screen.listen()}var a=[{txt:"发言",id:0,css:"icoFy"}];if($("#fyd").html()==""){combo=new $.yy.comboDiv({fy:{defaultid:0,data:a},fyd:{defaultid:0,remote:yyBaseurl+"/api/info/mygroup/substr/18",format:function(c){var b=c.data,e=[];for(var d in b){e.push({title:b[d].group_name,txt:(b[d].labelTitle+(b[d].pub==1?"":'<span class="icoSuo"></span>')),id:b[d].gid})}return e},callback:function(b){$("#type_id,#groupid").val(b)}}})}else{combo=new $.yy.comboDiv({fy:{defaultid:0,data:a}});$("li#fyd").css({"padding-left":"10px"})}$("#moreScreen").live("click",function(){getScreenList($("#screenRole").val())});loadUploadCtr()});function getScreenList(a){var c=$(".screenItem").size();var b="status="+a+"&offset="+c;YY.util.ajaxApi(YY.util.url("/screen/index/middle"),function(d){if(d.indexOf("screenItem")!=-1){$("#screenList").append(d)}else{$("#moreScreen a").html("没有更多内容！");$("#moreScreen").die("click")}},"POST","html",b)}function loadUploadCtr(){YY.util.initUpload(function(){new InitUpload({button_placeholder_id:"spanButtonPlaceHolder",upload_url:YY.util.url("/file/act/swfupload/fileFrom/")+$("#fileFrom").val()+"/gid/"+$("#group").val()})})};