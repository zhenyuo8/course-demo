var Vote=function(){var a=this;a.offset=1;a.maxSize=100;a.tmpval="候选项";this.defaultText=function(b){var c={};$(b).each(function(){var d=$(this);var e=d.attr("id");if(e=="undefined"){return}c[e]={txt:a.tmpval+a.offset};if(d.val()==""){$.yy.defaultText(c)}c={};++a.offset})};this.setDefaultText=function(b,d){var c={};$(b).each(function(){var e=$(this);var f=e.attr("id");if(f=="undefined"){return}c[f]={txt:d};if(e.val()==""){$.yy.defaultText(c)}c={}})};this.appendOption=function(b){$(b).live("focus",function(h){var c=$(this);var f=c.parent().parent().parent().parent().parent().parent().parent().parent().parent();var g="opt"+a.offset,d=f.clone();if(f.next().find(b).size()==0&&a.maxSize>=a.offset){d.find(b).attr("id",g).prev().remove();f.after(d);a.defaultText("#opt"+a.offset);if(a.offset-2>2){$(".select01").append("<option value='"+(a.offset-2)+"'>最多选"+(a.offset-2)+"项</option>")}}})};this.showButton=function(){var d=$("#vote_type_nav").find(".cur").attr("link");if(d=="voteForm_word"){var c=0;$("#div_vote_word_option").children().each(function(){if($(this).find("input.addInput").val()!==""){c++}});if($("#title").val()!==""&&c>=2){$("#savesubmit").attr("class","button gzChengButton").removeAttr("disabled")}else{$("#savesubmit").attr("class","button grayButton").attr("disabled","true")}}else{var b=0;$("#ul_vote_pic_option").children().each(function(){var e=$(this).find("input[name^=pic_vote_image]").val();if(e!=""){b++}});if($("#pic_vote_title").val()!==""&&b>=2){$("#savesubmit").attr("class","button gzChengButton").removeAttr("disabled")}else{$("#savesubmit").attr("class","button grayButton").attr("disabled",true)}}};this.showEndTime=function(b){if($(b.target).attr("checked")=="checked"){$("#end_date, #end_hour").hide()}else{$("#end_date, #end_hour").show()}};this.voteMenuClick=function(d){if($(d.target).is("li")){var c=$(d.target)}else{var c=$(d.target).parent()}if(!c.hasClass("cur")){var g=c.parent().find(".cur");if(g.length>0){g.removeClass("cur")}c.addClass("cur")}var b=c.find("a").attr("searchtype");var f={searchtype:b};if($("#keywords").length>0){$("#keywords").val("");$("#keywords").attr("data","0")}YY.util.ajaxApi(url("/vote/vote/getSubVote"),function(e){if(e.indexOf("nodata")>=0){$("#getContent").html("<div style='padding:20px;'>没有相关的投票！</div>")}else{$("#getContent").html(e);$("#moreVoteFeed").die("click");$("#moreVoteFeed").live("click",a.getMoreVoteClick)}},"POST","html",f)};this.getMoreVoteClick=function(){var h=$(this);h.html("加载中...");var k=h.attr("resource-id");var e=jQuery("#"+k).find(".yy-feed-section");var c=e.last().find(".gzContRight").attr("feed-id");var j=e.last().find(".gzContRight").attr("resource-id");var b=$("#aside_att span.icor").length>0?$("#aside_att span.icor").attr("data"):"";var g=$("#task_type")?$("#task_type").val():0;var i=$("#task_memberid")?$("#task_memberid").val():0;var d={offset:function(){return e.length},ajaxpend:1,fid:c,rid:j,filter:b,task_type:g,memberid:i};if($("#keywords").length>0&&$("#keywords").attr("data")=="1"){var f=$("#keywords").val();if(f!==""){d.keywords=f}}YY.util.ajaxApi($(this).attr("data"),function(l){if(l.indexOf("nodata")>=0){h.html("没有更多内容了");$("#moreVoteFeed").die("click")}else{$(l).insertBefore("#footer_morefeed");h.html("查看更多>>")}},"GET","html",d)};this.addDesClick=function(b){if($(b.target).attr("id")=="pic_vote_add_instruction"){vote_type="pic_vote"}else{vote_type="word_vote"}if($("#"+vote_type+"_instruction").hasClass("hidden")){$("#"+vote_type+"_instruction").removeClass("hidden");$(this).html("关闭说明")}else{$("#"+vote_type+"_instruction").addClass("hidden");$(this).html("添加说明")}};this.searchClick=function(d){var f={};if($("#voteMenuList").length>0){var c=$("#voteMenuList").find("a").attr("searchtype");if(c!==""){f.searchtype=c}}if($("#keywords").length>0){var b=$("#keywords").val();if(b!==""){f.keywords=b;$("#keywords").attr("data","1")}}YY.util.ajaxApi(url("/vote/vote/getSubVote"),function(e){if(e.indexOf("nodata")>=0){$("#getContent").html("<div style='padding:20px;'>没有相关的投票！</div>")}else{$("#getContent").html(e);$("#moreVoteFeed").die("click");$("#moreVoteFeed").live("click",a.getMoreVoteClick)}},"POST","html",f)};this.picAddMoreClick=function(f){if($("#ul_vote_pic_option").length>0){var b=$("#ul_vote_pic_option").children().length+1;var c="<li>";c+='<div class="fl num">'+b+".</div>";c+='<div class="fl tp_pic relative">';c+='<img src="/images/new_qz/pic_tp/pic_tp_up.gif" class="yy-pic-placeholder" width="50" height="50">';c+='<a style="display:block;position:absolute;top:8px;height:50px;width:50px;*margin-left:-50px;" href="javascript:;"><span class="yy-upload-placeholder"></span></a>';c+='<input type="hidden" value="" name="pic_vote_image['+b+']">';c+='<div class="pic_r_up" style="display:none;"><a href="javascript:;">重传图片</a></div>';c+='<div class="pic_r_up2" style="display:none;"><a class="yy-upload-process-cancel" href="javascript:;">取消</a></div>';c+="</div>";c+='<div class="fl pic_cont">';c+='<p><input type="text" class="input01 qz_tp_wz1" value="" name="pic_vote_image_des['+b+']" id="pic_vote_image_des'+b+'" maxlength="20"></p>';c+='<p><input type="text" class="input01 qz_tp_wz1" value="" name="pic_vote_image_link['+b+']" id="pic_vote_image_link'+b+'" ></p>';c+="</div>";c+="</li>";$("#ul_vote_pic_option").append(c);var g={};g["pic_vote_image_des"+b]={txt:"输入图片描述，至多可输入20个字符"};g["pic_vote_image_link"+b]={txt:"选项链接：http://"};$.yy.defaultText(g);var d=$("#ul_vote_pic_option").children().last().find(".yy-upload-placeholder");addVotePicUpload(d)}};this.load=function(){var b={};if($("#title").val()==""){b.title={txt:"投票主题"}}if($("#notice_n").val()==""){b.notice_n={txt:"邀请粉丝"}}if($("#pic_notice_n").val()==""){b.pic_notice_n={txt:"邀请粉丝"}}if($("#keywords").val()==""){b.keywords={txt:"主题/内容/发布人"}}if($("#pic_vote_title").val()==""){b.pic_vote_title={txt:"投票主题"}}$.yy.defaultText(b);this.defaultText(":text[id^='opt']");this.setDefaultText(":text[id^='pic_vote_image_des']","输入图片描述，至多可输入20个字符");this.setDefaultText(":text[id^='pic_vote_image_link']","选项链接：http://");voteInfo=typeof voteInfo!="undefined"?voteInfo:[];$("#notice_n").yyautocomplete({defaultValue:voteInfo.noticeuser,appendTo:"#notice_div_n",selAppendTo:"#notice_list_n",ajaxUrl:yyBaseurl+"/common/search/ccnotice"});$("#pic_notice_n").yyautocomplete({defaultValue:voteInfo.noticeuser,appendTo:"#pic_notice_div_n",selAppendTo:"#pic_notice_list_n",ajaxUrl:yyBaseurl+"/common/search/ccnotice"});$(".rcAddmenr").fancybox({onComplete:function(d){var f={};f=$(d).parent().parent().find(".rcAddmenListUl");var c=$(d).attr("for");$("#consoleBtn_"+c).bind("click",function(){var h="";var e=$("#selectedContainter").find("figure");if(e.length<1){$("#msgNote").html("请选择人员!");return}for(var g=0;g<e.length;g++){var k=$(e[g]).attr("itemid");var j=$(e[g]).text().split("(");if($("#yyauto_li_"+k).length==0){h+='<li id="yyauto_li_'+k+'" class="clearfix rcAddmenListli"><span>'+j[0]+'</span><input type="hidden" value="'+k+'" name="'+c+'_value[]"><a class="close" href="javascript:;"></a></li>'}}$(f).prepend(h).find(".close").bind("click",function(){$(this).parent().remove()});$.fancybox.cancel();$.fancybox.close()})}});$("#datepicker").datepicker({prevText:"上月",nextText:"下月",dateFormat:"yy-mm-dd"});$("#pic_end_date").datepicker({prevText:"上月",nextText:"下月",dateFormat:"yy-mm-dd"});YY.util.initUpload(function(){new InitUpload({button_placeholder_id:"spanButtonPlaceHolder",upload_url:YY.util.url("/file/act/swfupload/fileFrom/")+"65/gid/0"});var c=$("#ul_vote_pic_option").find(".yy-upload-placeholder");addVotePicUpload(c)})};this.listen=function(){$("#voteForm").live("submit",function(){var e=$("#voteForm").find(".yy-feedTopicDiv");if(e.length>0&&!e.is(":hidden")){coreFun.addTopicFor(e.find(".ht_tag_list").children("li"));var b=0;for(var d=0,c=1000;d<c;d++){b=b+1}}});$("#title, #pic_vote_title, .tp_add_hxx1").live("keyup",this.showButton);$(".tp_add_hxx1").live("blur",function(){var c=0;$("#div_vote_word_option").children().each(function(){if($(this).find("input.addInput").val()!==""){c++}});var b=$("#vote_word_optnum_select").children().length;if(c>b){$("#vote_word_optnum_select").append('<option value="'+c+'">最多选'+c+"项</option>")}else{if(c!=b&&b>2){$("#vote_word_optnum_select").children().last().remove()}}});$("#moreVoteFeed").live("click",this.getMoreVoteClick);if($.browser.msie){$("#word_vote_instruction, #pic_vote_instruction").find("textarea").keydown(function(c){var b=c.keyCode;if(b==8||b==46||b==37||b==38||b==39||b==40){return true}if($(this).val().length>60){return false}})}if($("#keyword_search").length>0){$("#keyword_search").bind("click",this.searchClick)}$("#endTimeBtn").bind("click",this.showEndTime);if($("#voteMenuList").length>0){$("#voteMenuList").parent().find("li").bind("click",this.voteMenuClick)}if($("#vote_type_nav").length>0){$("#vote_type_nav").children().each(function(){var b=$(this);b.bind("click",function(){if(!$(this).hasClass("cur")){var c=$("#"+$(this).parent().find(".cur").attr("link"));var d=$("#"+$(this).attr("link"));c.hide();c.appendTo($("#hidden_vote_type"));d.appendTo($("#div_vote_need_change"));d.show();$(this).parent().find(".cur").removeClass("cur");$(this).addClass("cur");a.showButton()}})});if($("#word_vote_add_instruction").length>0){$("#word_vote_add_instruction").bind("click",this.addDesClick)}if($("#pic_vote_add_instruction").length>0){$("#pic_vote_add_instruction").bind("click",this.addDesClick)}if($("#vote_pic_option_add").length>0){$("#vote_pic_option_add").bind("click",this.picAddMoreClick)}if($("#vote_word_option_add").length>0){$("#vote_word_option_add").bind("click",function(){if($("#div_vote_word_option").length>0){var d=$("#div_vote_word_option").children().last().clone();d.find("span.inputSpan").remove();var c=$("#div_vote_word_option").children().length+1;var b=d.find("input");if(b.length>0){b.attr("id","opt"+c);b.attr("value","");d.appendTo($("#div_vote_word_option"));var e={};e["opt"+c]={txt:a.tmpval+c};$.yy.defaultText(e)}}})}if($("#vote_pic_show_super_set").length>0){$("#vote_pic_show_super_set").bind("click",function(){if($("#div_vote_pic_super_set").hasClass("hidden")){$("#div_vote_pic_super_set").removeClass("hidden");$(this).html('收起高级设置<span class="arrowUp"></span>')}else{$("#div_vote_pic_super_set").addClass("hidden");$(this).html('展开高级设置<span class="arrowDown"></span>')}})}if($("#vote_word_show_super_set").length>0){$("#vote_word_show_super_set").bind("click",function(){if($("#div_vote_word_super_set").hasClass("hidden")){$("#div_vote_word_super_set").removeClass("hidden");$(this).html('收起高级设置<span class="arrowUp"></span>')}else{$("#div_vote_word_super_set").addClass("hidden");$(this).html('展开高级设置<span class="arrowDown"></span>')}})}if($("#pic_endTimeBtn").length>0){$("#pic_endTimeBtn").bind("click",function(){if($(this).attr("checked")=="checked"){$("#pic_end_date, #pic_end_hour").hide()}else{$("#pic_end_date, #pic_end_hour").show()}})}}}};