function showButton(){var e=$("#title2");address=$("#address2");var d=$("#content2");if(d.length>0){txtCounter(d,1000)}txtCounter(e,100);txtCounter(address,100);var c=$("#allday2").attr("checked")=="checked"?true:false;var g=$("#datepicker12").val().split("-");var b=$("#datepicker22").val().split("-");var f=($("#starthour2").val()+":00:00").split(":");var a=($("#endhour2").val()+":00:00").split(":");var i=new Date(g[0],g[1],g[2],f[0],f[1],f[2]);var h=new Date(b[0],b[1],b[2],a[0],a[1],a[2]);if(e.val()&&(c||(i.getTime()<h.getTime()))){$("#savesubmit2").removeAttr("disabled").removeClass("darkGrayButton").addClass("blueButton")}else{$("#savesubmit2").attr("disabled","true").removeClass("blueButton").addClass("darkGrayButton")}if(($("#datepicker12").val()==schedule.today&&$("#datepicker22").val()==schedule.today)&&$("#starthour2").val()=="00"&&$("#endhour2").val()=="00"){$("#allday2").attr("checked","checked")}else{$("#allday2").removeAttr("checked")}if(i.getTime()<=h.getTime()){$("#datepicker12").removeAttr("style");$("#datepicker22").removeAttr("style")}else{$("#datepicker12").css("color","red");$("#datepicker22").css("color","red")}}$(document).ready(function(){$.yy.defaultText({notice_p2:{txt:"添加参与人"}});if($("#title2").val()==""){$.yy.defaultText({title2:{txt:"日程主题"}})}if($("#content2").val()==""){$.yy.defaultText({content2:{txt:"日程内容"}})}if($("#address2").val()==""){$.yy.defaultText({address2:{txt:"地点"}})}if($("#notice_n2").val()==""){$.yy.defaultText({notice_n2:{txt:"添加通知人"}})}$("[name='imp']").live("click",function(){$("[name='important']").val($(this).attr("data"));$("[name='imp']").removeAttr("class");$(this).addClass("cur")});$("#notice_p2").yyautocomplete({defaultValue:[],appendTo:"#notice_div2",selAppendTo:"#notice_list2",ajaxUrl:yyBaseurl+"/common/search/ccnotice"});$("#notice_n2").yyautocomplete({defaultValue:{},appendTo:"#notice_div_n2",selAppendTo:"#notice_list_n2",ajaxUrl:yyBaseurl+"/common/search/ccnotice"});showButton();$("#title2").live("keyup",showButton).live("blur",showButton);$("#address2").live("keyup",showButton).live("blur",showButton);$("#content2").live("keyup",showButton).live("blur",showButton);$("#datepicker12, #starthour2, #datepicker22, #endhour2").live("change",showButton);$("#radio").buttonset();$("#datepicker12").datepicker({prevText:"上月",nextText:"下月",dateFormat:"yy-mm-dd"});$("#datepicker22").datepicker({prevText:"上月",nextText:"下月",dateFormat:"yy-mm-dd"});$("#datepicker3").datepicker({prevText:"上月",nextText:"下月",dateFormat:"yy-mm-dd",onClose:function(){filterByDate(this,"start")}});$("#datepicker4").datepicker({prevText:"上月",nextText:"下月",dateFormat:"yy-mm-dd",onClose:function(){filterByDate(this,"end")}});$.datepicker.setDefaults();$("#allday2").live("click",function(){if($(this).attr("checked")=="checked"){$("#datepicker22").val(schedule.today);$("#datepicker12").val(schedule.today);$("#starthour2").val("00");$("#endhour2").val("00")}else{$("#starthour2").val("08");$("#endhour2").val("18")}showButton()});$("#typeSelect42").live("click",function(){$("[name='type_gid']").removeAttr("checked");$("#person2").hide();$("#type2").val($(this).val())});$("#typeSelect52").live("click",function(){$("[name='type_gid']").removeAttr("checked");$("#type2").val($(this).val());$("#type_id2").val("0");if($("#person2").css("display")=="block"){$("#person2").hide()}else{$("#person2").show()}});$("[name='type_gid']").live("click",function(){$("[name='typeSelect']").removeAttr("checked");$("#person2").hide();$("#type_id2").val($(this).val());$("#type2").val($(this).val()>0?1:0);$("#groupid2").val($(this).val())});$("#person2 a").live("mouseover",function(){$("#person2 ul").hide();$($(this).attr("href")).show()});$("#person2 input").live("click",function(){$("#type2").val("8");$("#type_id2").val($(this).val());$("#person2").hide()});$("#addForm2").live("submit",function(){if($("#fyd")){$("#type2").val(combo.val("fyd")>0?1:combo.val("fyd"));$("#type_id2").val(combo.val("fyd"));$("#groupid2").val(combo.val("fyd"))}});$("#sub-div a").live("click",function(){$("#addForm2").attr("action",yyBaseurl+"/schedule/add/ajax/").submit();return false})});function filterByDate(e,b){var d=$(e),f=d.siblings('input[type="text"]').eq(0);if(!f.val()||!d.val()){return}if((b==="start"&&f.val()<d.val())||(b==="end"&&f.val()>d.val())){d.css("color","red");f.css("color","red");return}d.removeAttr("style");f.removeAttr("style");var c=b==="start"?d.val():f.val();var a=b==="start"?f.val():d.val();$.ajax({type:"POST",url:yyBaseurl+"/schedule/index/date/",data:"startdate="+c+"&enddate="+a+"&rid="+Math.random(),success:function(g){if(g.indexOf("gzCont")!=-1){$("#getcontent").html(g)}else{$("#getcontent").html("<div style='padding:20px;'>没有相关日程！</div>")}}})}function strLen(c){c="";var d=document.charset;var a=0;for(var b=0;b<c.length;b++){a+=c.charCodeAt(b)<0||c.charCodeAt(b)>255?2:1}return a}function txtCounter(b,a){if(strLen(b.val())>a){b.val(getStrbylen(b.val(),a))}}function getStrbylen(f,a){var b=0;var g=0;var e="";var d=f.split("");for(var c=0;c<d.length;c++){if(c<a&&b+byteLength(d[c])<=a){b+=byteLength(d[c]);g=c+1}}if(f.length>g){e=f.substr(0,g)}else{e=f}return e}function byteLength(a){aMatch=a.match(/[^\x00-\x80]/g);return(a.length+(!aMatch?0:aMatch.length))};