var refReply=function(c){var d=function(j,m,h,n,g){var k=h.closest(".reply-placeholder-block").find(".yyFeedReplyBox:first");var l='<div class="gzContHuifu clearfix yy-reply-list-div yy-reply-list-top2 reply-block" reply_id="'+j.data.id+'">';l+='<figure class="fl c9a">'+j.data.avatar_url+"</figure>";l+='<section class="fl gzContRight" resource-id="'+j.data.id+'">';l+='<h2 class="line16">';l+='<a href="'+yyBaseurl+"/space/cons/index/id/"+j.data.user_id+'" class="blueLink">'+j.data.user_name+'</a> 回复 <a href="'+yyBaseurl+"/space/cons/index/id/"+(g.feed_reply_to_mid?g.feed_reply_to_mid:g.feed_reply_obj_mid)+'" class="blueLink">'+g.feed_reply_to_name+"</a> ："+j.data.content+"</h2>";if(j.data.files){var e=j.data.files[0];var f=e.length;l+='<ul class="new_dt_fj mt10">';for(i=0;i<f;i++){if(e[i].isImg==false){l+='<li class="cur">';l+="<article>";l+='<figure class="fl"><a class="ico_'+e[i].ext+'_s"></a></figure>';l+='<section class="fl secr">';l+='<a class="fl name" href="#">'+e[i].title+"</a>";l+='<div class="fr dtlist_but">';l+='<a class="fd_ico blueLink2" href="'+yyBaseurl+"/file/view/index/fid/"+e[i].fid+'">预览</a>';l+='<a class="xz_ico blueLink2" href="'+yyBaseurl+"/file/act/down/fid/"+e[i].fid+'">下载</a>';l+='<a class="ck_ico blueLink2" href="'+yyBaseurl+"/file/view/index/fid/"+e[i].fid+'">查看文档主页</a>';l+="</div></section></article></li>"}}l+="</ul>";l+='<ul class="new_tup_fj clearfix mb10">';for(i=0;i<f;i++){if(e[i].isImg==true){l+='<li class="mr10 yyFeedReplyAttchmentPic" data="'+e[i].fid+'" reply-id="'+j.data.id+'"><img src="'+e[i].filepath+'" /></li>'}}l+="</ul>"}if(j.data.replyDelUrl){l+='<div class="line18 gzContRighta c9a clearfix mt5"><span class="fl c6">1秒前</span><div class="fr relative yyFeedReplyOp hidden"><a class="blueLink2 yyFeedReplyAdd" href="javascript:;">回复</a><a class="blueLink2 relative yyFeedReplyDel" href="javascript:;">删除</a><aside class="delTk hidden">确定要删除该事件？<br><a class="yy-delete-confirm" href="#yy-delete-confirm"';l+="action=";l+=j.data.replyDelUrl;l+='>删除</a> <a class="yy-delete-cancel" href="#yy-delete-cancel">不删除</a><span class="sj xsj"></span></aside></div></div>'}else{l+='<div class="line18 gzContRighta c9a clearfix mt5"><span class="fl c6">1秒前</span><div class="fr relative yyFeedReplyOp hidden"><a class="blueLink2 yyFeedReplyAdd" href="javascript:;">回复</a><a class="blueLink2 relative yyFeedReplyDel" href="javascript:;">删除</a><aside class="delTk hidden">确定要删除该事件？<br><a class="yy-delete-confirm" href="#yy-delete-confirm">删除</a> <a class="yy-delete-cancel" href="#yy-delete-cancel">不删除</a><span class="sj xsj"></span></aside></div></div>'}l+='<div class="yyFeedReplyBoxDiv hidden">';if(j.data.replyUrl){l+='<form method="post" class="yy-upload-block "action='+j.data.replyUrl+" >"}else{l+='<form method="post" class="yy-upload-block">'}l+='<div class="textarea01 mt10 yy-contentDiv cor_3c" contenteditable="true" onpaste=" var self = this;setTimeout(function(){ coreFun.paste(self); },50);"></div><div class="yy-upload-containter"><div class="barBox clearfix yy-upload-bar-containter yy-upload-process-container" style="display: none;"><div class="grayBar mt10 fl"> <span class="blueBar yy-upload-process-bar"></span> </div><a href="javascript:;" class="fr c6Link yy-upload-process-cancel">×</a></div><div class="mt10 rcFjList"><ul class="yy-upload-file_containter yy-uploaded-file-list" style="display: none;"></ul></div></div><div class="clearfix gzContHfht rcAddFj z3 mt5 yyFeedReplyBox"><div class="fl relative mt8 ya_talkConIcon yy-feedIco">';l+='<a title="添加表情" class="icon_face fl yy_face_sh" href="javascript:;"></a>';l+='<ul class="faces_list clearfix faces_list clearfix z6 yy-feedFaceUl" style="display:none;">';l+=h.closest(".yyFeedReplyBox").find(".yy-feedFaceUl:first").html();l+="</ul>";l+='<a title="@" class="icon_ait fl yy_replay_at" href="javascript:;"></a><a title="添加文档" class="icoWd fl yy-file-upload-ico" href="javascript:;"></a><aside class="tkBox c3a yy-file-upload-aside" style="top: -99999px;"><a href="#yy-file-upload-ico" class="icoSc yy-file-upload-swf"><span class="yy-file-uploadbtn">上传文件</span></a><a href="'+yyBaseurl+'/api/file/selected" class="selectedfileBtn icoSel">选择空间文档</a></aside></div><div class="fr rcChuang"><input type="hidden" name="fids" value="" />';l+='<input type="hidden" value="'+g.feed_reply_to_id+'" name="feed_reply_to_id" />';l+='<input type="hidden" value="'+g.id+'" name="qzfeed_id" />';l+='<input type="hidden" value="'+g.feed_type+'" name="feed_type" />';l+='<input type="hidden" value="'+g.feed_reply_to_name+'" name="feed_reply_to_name" />';l+='<input type="hidden" name="file_group_id" value="" />';l+='<input type="hidden" value="'+g.feed_reply_to_mid+'" name="feed_reply_to_mid" />';l+='<input type="hidden" value="'+g.feed_reply_obj_mid+'" name="feed_reply_obj_mid" />';l+='<textarea name="feed_reply_content" class="hidden reply-area"></textarea>';l+='<input type="button" value="发布" class="button gzGrayButton fr yy-replySubmit"/>';l+="</div></div></form></div>";l+="</section></div>";k.after(l);n.find(".textarea01").html("");n.find(".yy-uploaded-file-list").html("")};var a=this,b={replyContainersSelector:"section.gzContRight",replySubmitCallback:d};$.extend(b,c);a.bindActiveReplyAreaEvents=function(){$(".yy-feedReplySpan").live("click",function(){var g=$(this),j=g.closest(b.replyContainersSelector),h=j.find(".reply-placeholder-block");if(h.hasClass("hidden")){g.parent().addClass("relative");g.siblings("span").removeClass("hidden");h.removeClass("hidden");replayface.rangeFocus(h.find(".yy-contentDiv")[0]);replayface.rememberCurrentRange();h.find(".yy-contentDiv").focus();var e=(new Date()).getTime();var f=j.find(".yyFeedReplyBox");f.find(".yy-file-uploadbtn").attr("id",e);YY.util.initUpload(function(){new InitUpload({button_placeholder_id:e,upload_url:YY.util.url("/file/act/swfupload/fileFrom/")+20+"/gid/"+f.find('input[name="file_group_id"]').eq(0).val()})})}else{g.parent().removeClass("relative");g.siblings("span").addClass("hidden");h.addClass("hidden")}})};a.bindSubmitReplyEvents=function(){$(".yy-replySubmit").live("click",function(){$("[role=listbox]").hide();var h=$(this),f=h.closest("form"),j=h.siblings('input[type="hidden"]'),g=f.attr("action")?f.attr("action"):yyBaseurl+"/space/ajax/reply";coreFun.addNotice(f);var e=new Array(),k=f.find("input[name^='atperson']");$.each(k,function(l,o){e.push($(o).val())});submitData={id:j.filter('[name="qzfeed_id"]').eq(0).val(),feed_id:j.filter('[name="feed_id"]').eq(0).val(),feed_type:j.filter('[name="feed_type"]').eq(0).val(),feed_reply_to_id:j.filter('[name="feed_reply_to_id"]').eq(0).val(),feed_reply_to_mid:j.filter('[name="feed_reply_to_mid"]').eq(0).val(),feed_reply_to_name:j.filter('[name="feed_reply_to_name"]').eq(0).val(),feed_reply_content:f.find(".yy-contentDiv").html(),feed_reply_obj_mid:j.filter('[name="feed_reply_obj_mid"]').eq(0).val(),feed_reply_fileids:j.filter('[name="fids"]').eq(0).val(),atperson:e.join(",")};f.find('input[name="fids"]').val("");if($.trim(submitData.feed_reply_content)==""||$.trim(submitData.feed_reply_content)=="点击输入内容"){return false}YY.util.ajaxApi(g,function(m,l){if(m&&m.rs==true&&l==="success"){b.replySubmitCallback(m,l,h,f,submitData)}},"POST","JSON",submitData);return false})};a.bindPopTransferEvents=function(){$(".yy-feedShareSpan").live("click",function(){var e=$(this);$.fancybox({padding:0,autoScale:true,centerOnScroll:true,overlayShow:true,showCloseButton:false,scrolling:"no",height:"600px",href:yyBaseurl+"/speech/index/speechshare/fid/"+e.attr("fid")+"/objid/"+e.attr("objid")+"/oid/"+e.attr("oid")+"/fname/"+e.attr("fname")+"/fmemberid/"+e.attr("fmemberid"),showCloseButton:false,onComplete:function(g){var f=$("#group_s").closest("#fancybox-content");replayface.focusEnd(f.find(".yy-contentDiv")[0]);replayface.resetDom(f);replayface.countWord();replayface.rememberCurrentRange();comboshare=new $.yy.comboDiv({fydshare:{defaultid:0,remote:yyBaseurl+"/api/info/mygroup/substr/18",format:function(j){var h=j.data,l=[];for(var k in h){l.push({title:h[k].group_name,txt:(h[k].labelTitle+(h[k].pub==1?"":'<span class="icoSuo"></span>')),id:h[k].gid})}return l},callback:function(h){$("#group_s").val(h)}}})}});return false})};a.bindSubmitTransferEvents=function(){$(".yy-shareSubmit").live("click",function(){var h=$(this),f=h.closest("form"),j=h.siblings('input[type="hidden"]'),g=yyBaseurl+"/speech/index/speechsub/ajaxsubmit/1/ajaxtype/normal";coreFun.addNotice(f);var e=new Array(),k=f.find("input[name^='atperson']");$.each(k,function(l,o){e.push($(o).val())});submitData={id:j.filter('[name="qzfeed_id"]').eq(0).val(),groupid:j.filter('[name="group_s"]').eq(0).val(),feed_id:j.filter('[name="feed_id"]').eq(0).val(),feed_shareid:j.filter('[name="feed_shareid"]').eq(0).val(),feed_type:j.filter('[name="feed_type"]').eq(0).val(),feed_reply_to_id:j.filter('[name="feed_reply_to_id"]').eq(0).val(),feed_reply_to_mid:j.filter('[name="feed_reply_to_mid"]').eq(0).val(),feed_reply_to_name:j.filter('[name="feed_reply_to_name"]').eq(0).val(),feed_reply_content:f.find(".yy-contentDiv").html(),content:f.find(".yy-contentDiv").html(),feed_reply_obj_mid:j.filter('[name="feed_reply_obj_mid"]').eq(0).val(),feed_reply_fileids:j.filter('[name="fids"]').eq(0).val(),atperson:e.join(",")};f.find('input[name="fids"]').val("");if($.trim(submitData.feed_reply_content)==""||$.trim(submitData.feed_reply_content)=="点击输入内容"){return false}YY.util.ajaxApi(g,function(m){typeid=m.data.objid;YY.util.ajaxApi(YY.util.url("/api/info/getfeedhtml"),function(o){if(o){$firstSection=$(".yy-feed-section:first");if($firstSection.length){$firstSection.before(o)}else{if($("#feed_div").length){var n=$("#footer_morefeed").prev(".hidden");if(n.length>0){n.remove().before(o)}else{$("#footer_morefeed").before(o)}}else{$("#nodata").remove();$("#getcontent").prepend(o)}}$.yy.rscallback("操作成功！")}},"POST","html","objid="+typeid+"&type="+submitData.feed_type);if($("#toreply").attr("checked")=="checked"){$(".yy-replySubmit").trigger("click")}if(submitData.feed_shareid!=0){var l=submitData.feed_shareid}else{var l=submitData.feed_id}YY.util.ajaxApi(YY.util.url("/share/act/shareadd"),function(n){},"POST","JSON","content="+submitData.content+"&type="+submitData.feed_type+"&typeid="+typeid+"&fromid="+l)},"POST","JSON",submitData);$.fancybox.cancel();$.fancybox.close()})};a.bindRenderUploadEvents=function(){var g=10;var e=10;$(".yy-file-upload-ico, .yy-file-upload-aside").live("mouseover",function(){var h=$(this).closest(".reply-block").find(".yy-file-upload-aside");clearTimeout(g);e=setTimeout(function(){h.css({visibility:"",top:"15px"})},10)}).live("mouseout",function(){var h=$(this).closest(".reply-block").find(".yy-file-upload-aside");clearTimeout(e);g=setTimeout(function(){h.css({top:"-99999px"})},100)});$(".yy-file-upload-swf").live("click",function(){$(this).closest(".reply-block").find(".yy-file-upload-aside").css("visibility","hidden")});var f=false;$("a.selectedfileBtn").live("click",function(){var h=$(this);$.fancybox({centerOnScroll:true,showCloseButton:false,href:$(this).attr("href"),onCleanup:function(){var m=$("tr[class$='yy-attatchment-selected']").attr("file_id"),l=$("tr[class$='yy-attatchment-selected']").attr("title"),k=$(h).closest("form").find("input[name='fids']");changeFileIds(m,"+",$(k));if($(h).closest("form").find("#fileContainer").length>0){str='<li id="_file'+m+'" class="clearfix"><span>'+l+'</span> <a onclick="delThisFile('+m+');" class="fr" href="javascript:;">×</a></li>';$("#fileContainer").append(str).show()}if($(h).closest("form").find(".yy-upload-file_containter").length>0){var j=$('<li id="_file'+m+'" class="clearfix"><span>'+l+'</span> <a class="fr" href="javascript:;">×</a></li>');j.find("a").on("click",function(){$(this).closest("li").fadeOut("500").remove();changeFileIds(m,"-",k)});$(h).closest("form").find(".yy-upload-file_containter").append(j).show()}},onComplete:function(){if(f){getContent(yyBaseurl+"/api/file/list/filter/all")}else{YY.util.loadScript(["lib/speech/handlers.js","modules/space/yy.filebox.js"],{async:false,fn:function(){f=true;getContent(yyBaseurl+"/api/file/list/filter/all")}})}}});return false})};a.init=function(){loadScript(["plugin/yy.jquery.plugin.js","plugin/fancybox/jquery.fancybox-1.3.4.pack.js","lib/jq/jquery.validate.js","lib/yy/yy.core.js","modules/space/yy.space.title.js","modules/space/yy.space.speech.js"],{fn:function(){a.bindActiveReplyAreaEvents();a.bindSubmitReplyEvents();a.bindPopTransferEvents();a.bindSubmitTransferEvents();a.bindRenderUploadEvents()}})}};