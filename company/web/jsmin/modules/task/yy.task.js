var Task=function(k){var j=this;j.init=function(){this.today=k.today;this.joinUser=k.inviteUser;this.manageUser=k.manageUser;this.noticeUser=k.noticeUser;this.fileList=k.fileList};j.showButton=function(A){if($("#taskaddForm").length==0){return}var G=$("#tasktitle"),x=$("#taskaddForm>#content"),w=$("#startdate"),l=$("#starthours");$enddate=$("#enddate"),$endhours=$("#endhours");$submit=$("#savesubmit");var n=true;if(x.length>0){j.txtCounter(x,2000)}j.txtCounter(G,200);var m=$("#fastcomplete").attr("checked")=="checked"?true:false;var C=w.val().split("-");var o=($("#starthours").val()+":00").split(":");var v=new Date(C[0],C[1]-1,C[2],o[0],o[1],o[2]);var p=v.getTime();var D=$enddate.val();var r=D?D.split("-"):C;var q=$("#endhours").val();var F=q?(q+":00").split(":"):("24:00:00").split(":");var u=new Date(r[0],r[1]-1,r[2],F[0],F[1],F[2]);var s=u.getTime();n=p<s?true:false;if(n){w.removeAttr("style");l.removeAttr("style");$enddate.removeAttr("style");$endhours.removeAttr("style")}else{if(A&&(A.is("#startdate")||A.is("#starthours"))){d(p)}else{$.yy.rscallback("时间错误，结束时间必须大于开始时间。",1);w.css("color","red");l.css("color","red");$enddate.css("color","red");$endhours.css("color","red")}}var E=G.val();if(!E){E=""}E=$.trim(E);var z=0;for(var y=0;y<E.length;y++){var B=E.charCodeAt(y);if((B>=1&&B<=126)||(65376<=B&&B<=65439)){z++}else{z+=2}}if(z>40){$.yy.rscallback("任务标题不能超过20个汉字",1);G.css("color","red")}else{G.removeAttr("style")}if(G.val()&&z<=40&&n){$submit.removeAttr("disabled").removeClass("grayButton").addClass("gzChengButton")}else{$submit.attr("disabled","disabled").removeClass("gzChengButton").addClass("grayButton")}};j.ajaxGetData=function(){var s=$("#delay").attr("checked")?1:0;var n=$("#showType").val();var l=$("#sstatus").val();var p=$("#keywords").val();var m=$("#taskRole").val();var o=$("#searchTimeStart").val();var r=$("#searchTimeEnd").val();var q="delay="+s+"&showtype="+n+"&status="+l+"&keyword="+p+"&myrole="+m+"&searchstart="+o+"&searchend="+r+"&rid="+Math.random();if(!$("#advsearch_box").hasClass("hidden")){if($("#relate_schedule").attr("checked")=="checked"){q+="&relate_schedule=1"}}YY.util.ajaxApi(url("/task/task/ajax/"),function(u){if(u.indexOf("gzCont")!=-1){$("#getcontent").html(u);$("#task_moreFeed").die("click");$("#task_moreFeed").live("click",c);$("#task_moreFeed").html("查看更多>>");$("#footer_morefeed").show()}else{$("#getcontent").html("<div style='padding:20px;'>没有相关任务！</div>");$("#footer_morefeed").hide()}var v=0;$("a.yy-task-submit").fancybox({modal:true,onComplete:function(x){$tid=$(x).attr("data");var w=$("#yy-task-submit-"+$tid);if(v>0){return}v++;$("[name='taskumup']").live("focus",function(){if($(this).val()=="任务总结"){$(this).val("")}}).live("blur",function(){if($(this).val()==""){$(this).val("任务总结")}});w.find("abctest,a.close,input.Taskcannel").live("click",function(){$.fancybox.close()});w.find("abctest,input.blueButton").live("click",function(){var y=$("[name='taskumup']").val();var z=$("[name='tasksubfids']").val();YY.util.ajaxApi(yyBaseurl+"/task/add/tasksub/",function(B,A){if(B&&B.rs==1&&B.type=="success"){$.fancybox.close();$.yy.rscallback("操作成功！");$("a.yy-task-submit").remove()}else{$.yy.rscallback("操作失败！",1)}},"POST","json",{tid:$tid,taskumup:y,tasksubfids:z})})}})},"POST","html",q)};j.strLen=function(n){if(n==""||typeof n=="undefined"){return 0}var l=0;for(var m=0;m<n.length;m++){l+=n.charCodeAt(m)<0||n.charCodeAt(m)>255?2:1}return l};j.txtCounter=function(m,l){if(j.strLen(m.val())>l){m.val(j.getStrbylen(m.val(),l))}};j.getStrbylen=function(q,l){var m=0;var r=0;var p="";var o=q.split("");for(var n=0;n<o.length;n++){if(n<l&&m+j.byteLength(o[n])<=l){m+=j.byteLength(o[n]);r=n+1}}if(q.length>r){p=q.substr(0,r)}else{p=q}return p};j.byteLength=function(l){aMatch=l.match(/[^\x00-\x80]/g);return(l.length+(!aMatch?0:aMatch.length))};j.searchMemberAdd=function(o){var q="",u="",s="",l="";var m=$("#selectedContainter").find("figure");if(m.length<1){o.parent().prepend('<font color="red">请选择人员！</font>');return}for(var p=0;p<m.length;p++){var r=$(m[p]).attr("itemid");var n=$(m[p]).text().split("(");if($("#yyhidden_inp_"+r).length==0){q+='<input id="yyhidden_inp_'+r+'" type="hidden" class="friendid" value="'+r+'">';l=p!=(m.length-1)?",":"";u+=n[0]+l;s+=r+l}}$("#taskMemberListBox").find("input.friendid").remove();$("#keywords").val(s);$("#taskMemberListBox").append(q).find("span").html(u);$.fancybox.cancel();$.fancybox.close()};var a={};j.getDefaultText=function(){return a};j.load=function(){if($("#tasktitle").val()==""){a.tasktitle={txt:"任务名称",css:"inputSpan"}}if($("#tcontent").val()==""){a.tcontent={txt:"任务说明",css:"inputSpan"}}if(typeof(taskInfo.manageuser)=="undefined"||taskInfo.manageuser.length==0){a.manageuser={txt:"负责人",css:"inputSpan"}}if(typeof(taskInfo.inviteuser)=="undefined"||taskInfo.inviteuser.length==0){a.joinuser={txt:"参与者",css:"inputSpan"}}if(typeof(taskInfo.noticeuser)=="undefined"||taskInfo.noticeuser.length==0){a.noticeuser={txt:"知会人",css:"inputSpan"}}$.yy.defaultText(a);$("#startdate").datepicker({prevText:"上月",nextText:"下月",dateFormat:"yy-mm-dd"});$("#enddate").datepicker({prevText:"上月",nextText:"下月",dateFormat:"yy-mm-dd"});$("#searchTimeStart").datepicker({prevText:"上月",nextText:"下月",dateFormat:"yy-mm-dd"});$("#searchTimeEnd").datepicker({prevText:"上月",nextText:"下月",dateFormat:"yy-mm-dd"});$.datepicker.setDefaults();$("#radio").buttonset();$("#manageuser").yyautocomplete({defaultValue:j.manageUser,appendTo:"#manageuser_div",selAppendTo:"#manageuser_list",ajaxUrl:yyBaseurl+"/common/search/ccnotice"});$("#joinuser").yyautocomplete({defaultValue:j.joinUser,appendTo:"#joinuser_div",selAppendTo:"#joinuser_list",ajaxUrl:yyBaseurl+"/common/search/ccnotice"});$("#noticeuser").yyautocomplete({defaultValue:j.noticeUser,appendTo:"#noticeuser_div",selAppendTo:"#noticeuser_list",ajaxUrl:yyBaseurl+"/common/search/ccnotice"});if($("#fileContainer").length>0&&j.fileList.length>0){fileids=$("#fids").val();for(i=0;i<j.fileList.length;i++){str='<li id="_file'+j.fileList[i].id+'" class="clearfix"><span>'+j.fileList[i].title+'</span> <a onclick="t.delTaskUploadFile('+j.fileList[i].id+');" class="fr" href="javascript:;">×</a></li>';$("#fileContainer").append(str).show();fileids=fileids?fileids+","+j.fileList[i].id:j.fileList[i].id}$("#fids").val(fileids);if($("#community_fids").length>0){$("#community_fids").val(fileids)}}new $.yy.comboDiv({type_gid:{labelcss:"blueLink",defaultid:0,remote:yyBaseurl+"/api/info/mygroup/substr/18",format:function(m){var l=m.data,o=[];for(var n in l){o.push({title:l[n].group_name,txt:(l[n].labelTitle+(l[n].pub==1?"":'<span class="icoSuo"></span>')),id:l[n].gid})}return o},callback:function(l){if($("#typepublic").attr("checked")=="checked"){$("#type").val("1");$("#type_id,#groupid").val(l)}}}});$(".rcAddmenr").fancybox({onComplete:function(m){var n={};n=$(m).parent().parent().find(".rcAddmenListUl");var l=$(m).attr("for");$("#consoleBtn_"+l).bind("click",function(){if(l=="keywords"){j.searchMemberAdd($(this))}else{var q="";var o=$("#selectedContainter").find("figure");if(o.length<1){$("#msgNote").html("请选择人员!");return}for(var p=0;p<o.length;p++){var s=$(o[p]).attr("itemid");var r=$(o[p]).text().split("(");if($("#yyauto_li_"+s).length==0){q+='<li id="yyauto_li_'+s+'" class="clearfix rcAddmenListli"><span>'+r[0]+'</span><input type="hidden" value="'+s+'" name="'+l+'_value[]"><a class="close" href="javascript:;"></a></li>'}}$(n).prepend(q).find(".close").bind("click",function(){$(this).parent().remove()});$.fancybox.cancel();$.fancybox.close()}})}})};j.submitTaskClick=function(){$("a.yy-task-submit").fancybox({modal:true,onComplete:function(m){$tid=$(m).attr("data");var l=$("#submitTaskBox-"+$tid);$("[name='taskumup']").live("focus",function(){if($(this).val()=="任务总结"){$(this).val("")}}).live("blur",function(){if($(this).val()==""){$(this).val("任务总结")}})}})};j.ajaxMiddleRequest=function(l){YY.util.ajaxApi(url("/task/task/ajax/"),function(m){if(m.indexOf("gzCont")!=-1){$("#getcontent").html(m);$("#task_moreFeed").die("click");$("#task_moreFeed").live("click",c);$("#task_moreFeed").html("查看更多>>");$("#footer_morefeed").show()}else{$("#getcontent").html("<div style='padding:20px;'>没有相关任务！</div>");$("#footer_morefeed").hide()}j.submitTaskClick()},"POST","html",l)};j.taskMenuListClick=function(m){if(!$(m.target).hasClass("cur")){$preSelectObj=$(m.target).parent().find(".cur");if($preSelectObj.length>0){$preSelectObj.removeClass("cur")}$(m.target).addClass("cur")}var n={};if($(m.target).attr("role")!==""){n.showtype=$(m.target).attr("role")}if($(m.target).attr("data")!==""){n.myrole=$(m.target).attr("data")}if($("#relate_member_id").length>0){n.member_id=$("#relate_member_id").val()}var l=$("#task_li_status").find(".data");if(l.length>0){l.attr("data",-1);l.html("查看状态")}if($("#relate_schedule").length>0){$("#relate_schedule").attr("checked",false)}j.ajaxMiddleRequest(n)};j.statusClick=function(o){if($(o.target).attr("data")!==""){var n=$(o.target).attr("data")}else{var n=0}if($(o.target).attr("title")!==""){var q=$(o.target).attr("title")}else{var q="查看状态"}var m=$("#task_li_status").find(".data");if(m.length>0){m.attr("data",n);m.html(q)}$("#task_li_status").find("aside").hide();var p={};p.status=n;var l=$("#taskMenuList").find(".cur");if(l.length>0){if(l.attr("role")!==""){p.showtype=l.attr("role")}if(l.attr("data")!==""){p.myrole=l.attr("data")}if($("#relate_member_id").length>0){p.member_id=$("#relate_member_id").val()}}j.ajaxMiddleRequest(p)};j.relateScheduleClick=function(n){var o={};if($(n.target).is(":checked")){o.relate_schedule=1}var m=$("#taskMenuList").find(".cur");if(m.length>0){if(m.attr("role")!==""){o.showtype=m.attr("role")}if(m.attr("data")!==""){o.myrole=m.attr("data")}}var l=$("#task_li_status").find(".data");if(l.length>0&&l.attr("data")!==""){o.status=l.attr("data")}j.ajaxMiddleRequest(o)};j.listen=function(){$("[name='imp']").live("click",function(){$("[name='important']").val($(this).attr("data"));$("[name='imp']").removeAttr("class");$(this).addClass("cur")});$("[name='typeSelect']").live("click",function(){$("[name='type_gid']").removeAttr("checked");$("#type").val($(this).val());$("#type_id").val("0")});$("input[name='typeSelect']").live("click",function(){var n=$(this);var m=n.val();var o=["244px","27px","0px","0px","164px"];$("span.jtbm").animate({left:o[m]},300,function(){$("#type").val(m);$("#type_id,#groupid").val(m==1?$("#aside_type_gid").find("span.icor").attr("data"):0)})});$("#task_li_status").live("mouseleave",function(){$(this).find(".tkBox").hide()}).live("mouseenter",function(){$(this).find(".tkBox").show()});$("#task_li_status").find("a").bind("click",j.statusClick);$("#relate_schedule").bind("click",j.relateScheduleClick);$("#tcontent").yyautoWrap(1000);$(".rw_search_but").live("click",function(){j.ajaxGetData()});$("#sub-div a").bind("click",function(){if($("#task_detail").is(":hidden")){$("#task_detail").show();$(this).html("隐藏详情")}else{$("#task_detail").hide();$(this).html("填写详情")}});$("#advsearch").live("click",function(){var n=$(this);var m=n.html()=="高级搜索"?"关闭高级搜索":"高级搜索";if($("#showType").val()==1){$("#searchMember").show();$("#relate_schedule").parent().hide()}else{$("#searchMember").hide();$("#relate_schedule").parent().show()}n.html(m);$("#advsearch_box").toggleClass("hidden")});$("#taskMenuList").bind("click",j.taskMenuListClick);$("#tasktitle").live({keyup:j.showButton,blur:j.showButton});$("#tcontent").live({keyup:j.showButton,blur:j.showButton});var l=/^([01]?[\d]|2[0123]):[012345]?[\d]$/;$("#startdate").on({change:function(){var m=$(this);j.showButton(m)}});$("#starthours").on({change:function(){var n=$(this),o=$.trim(n.val()),m=l.test(o);if(m){e()}else{f()}j.showButton(n)}});$("#enddate").on({change:function(){var m=$(this),n=m.val();e();m.val(n);j.showButton(m)}});$("#endhours").on({change:function(){var m=$(this),n=$.trim(m.val());if(!l.test(n)){e()}j.showButton(m)}});$("#fastcomplete").live({click:function(){f();if($(this).attr("checked")==="checked"){$("#startdate,#starthours").attr("disabled","disabled");$("#enddate,#endhours").val("")}else{$("#startdate,#starthours").removeAttr("disabled")}j.showButton()}});$("#searchTimeStart,#searchTimeEnd").live("change",function(){var q=$("#searchTimeStart").val(),p=$("#searchTimeEnd").val();if(q&&p){var o=q.split("-"),n=p.split("-");var r=new Date(o[0],o[1],o[2]);var m=new Date(n[0],n[1],n[2]);if(m.getTime()<=r.getTime()){$("#searchTimeStart,#searchTimeEnd").css("color","red");$(".rw_search_but").attr("disabled",true)}else{$("#searchTimeStart,#searchTimeEnd").removeAttr("style");$(".rw_search_but").removeAttr("disabled")}}});$("#task_moreFeed").live("click",c);YY.util.initUpload(function(){YY.util.loadScript(["lib/upload/upload.js"],function(){new InitUpload({button_placeholder_id:"spanButtonPlaceHolder",upload_url:YY.util.url("/file/act/swfupload/fileFrom/")+$("#fileFrom").val()+"/gid/"+$("#group").val()})})})};j.delTaskUploadFile=function(l){$("#_file"+l).remove();fileids=$("#fids").val();if(fileids){fileids=fileids.split(",");leftfids=[];for(i=0;i<fileids.length;i++){if(fileids[i]!=l){leftfids.push(fileids[i])}}fileids=leftfids.join(",");$("#fids").val(fileids)}if($("#community_fids").length>0){fileids=$("#community_fids").val();if(fileids){fileids=fileids.split(",");leftfids=[];for(i=0;i<fileids.length;i++){if(fileids[i]!=l){leftfids.push(fileids[i])}}fileids=leftfids.join(",");$("#community_fids").val(fileids)}}};function g(l){l=l.toString();return l.length!==2?"0"+l:l}function h(o){var l=new Date(o),n=l.getFullYear(),p=l.getMonth()+1,m=l.getDate();p=g(p);m=g(m);return n+"-"+p+"-"+m}function f(){d()}function d(w){var z=w?new Date(w):new Date(),q=z.getHours(),p=z.getMinutes(),x=z.getTime(),r=x+86400000,o=h(x),y=h(r),u,l,v,n,s,m;u=o;v=g(q);s=g(p);if(p<30){l=o;n=v;m=p+30}else{if(q===23){l=y;n="00"}else{l=o;n=g(q+1)}m=g(p-30)}$("#startdate").val(u);$("#enddate").val(l);$("#starthours").val(v+":"+s);$("#endhours").val(n+":"+m)}function e(){var m=$("#startdate").val(),l=$("#starthours").val(),n=b(m,l);d(n)}function b(m,n){var m=m.split("-"),n=(n+":00").split(":"),l=new Date(m[0],m[1]-1,m[2],n[0],n[1],n[2]);return l.getTime()}function c(){var p=$(this);p.html("加载中...");var s=p.attr("resource-id");var o=$("#"+s).find(".yy-feed-section");var u=o.find(".schedule_ul").attr("schedule-starttime");var m=o.last().find(".gzContRight").attr("feed-id");var r=o.last().find(".gzContRight").attr("resource-id");var n={offset:function(){return o.length},ajaxpend:1,seektime:u,fid:m,rid:r};var q=$("#taskMenuList").find(".cur");if(q.length>0){if(q.attr("role")!==""){n.showtype=q.attr("role")}if(q.attr("data")!==""){n.myrole=q.attr("data")}}if($("#relate_member_id").length>0){n.member_id=$("#relate_member_id").val()}var l=$("#task_li_status").find(".data");if(l.length>0&&l.attr("data")!==""){n.status=l.attr("data")}if($("#relate_schedule").length>0&&$("#relate_schedule").is(":checked")){n.relate_schedule=1}YY.util.ajaxApi(p.attr("data"),function(v){if(v.indexOf("nodata")>=0){p.html("没有更多内容了");$("#task_moreFeed").die("click")}else{$(v).appendTo("#"+s);p.html("查看更多>>")}j.submitTaskClick()},"GET","html",n)}};if(typeof taskInfo=="undefined"){var taskInfo={}}if(typeof Task!="undefined"){var t=new Task({today:typeof taskInfo.today!="undifined"?taskInfo.today:"",inviteUser:typeof taskInfo.inviteuser!="undefined"?taskInfo.inviteuser:[],manageUser:typeof taskInfo.manageuser!="undefined"?taskInfo.manageuser:[],noticeUser:typeof taskInfo.noticeuser!="undefined"?taskInfo.noticeuser:[],fileList:typeof taskInfo.filelist!="undefined"?taskInfo.filelist:[]})}$(document).ready(function(){t.init();t.load();t.listen();t.showButton()});