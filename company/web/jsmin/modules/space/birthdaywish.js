(function(f,c,h){c=c||{};var i=c.BirthWish={};var g=c.BirthdayWish=function(m){var l=this;l.load=function(){f.yy.defaultText({notice_p:{txt:"输入好友的名称进行筛选"}});f("#notice_p").yyautocomplete({defaultValue:l.inviteUser,appendTo:"#notice_div",selAppendTo:"#notice_list",ajaxUrl:yyBaseurl+"/common/search/ccnotice/limit/3"})}};function a(n){n="";var o=document.charset;var l=0;for(var m=0;m<n.length;m++){l+=n.charCodeAt(m)<0||n.charCodeAt(m)>255?2:1}return l}function d(m,l){if(a(m.val())>l){m.val(b(m.val(),l))}}function b(q,l){alert(2);var m=0;var r=0;var p="";var o=q.split("");for(var n=0;n<o.length;n++){if(n<l&&m+k(o[n])<=l){m+=k(o[n]);r=n+1}}if(q.length>r){p=q.substr(0,r)}else{p=q}return p}function k(l){aMatch=l.match(/[^\x00-\x80]/g);return(l.length+(!aMatch?0:aMatch.length))}f("#addFrom").live({submit:function(){var n=f("#notice_list").children().first().children().eq(1).val();var l=f("#wishcontent").val();var m="";f("input[name='notice_div_value[]']").each(function(p){var o=f(this).eq(0).val();m=m+o+","});if(typeof n=="undefined"){f.yy.rscallback("好友不能为空");return false}if(l.length>210){f.yy.rscallback("祝福内容210字以内");return false}f.ajax({type:"POST",url:"/space/home/birthday",data:"wish="+m+"&content="+l+"&ajaxsubmit=1",success:function(o){f.yy.rscallback("发布成功");f.fancybox.close();setTimeout("window.location.href='/space/home/index'",500)}});return false}});f("#notice_p").live({keyup:function(){j();return false}});f("#wishcontent").live({mousedown:function(){j()}});f(document).bind("click",function(n){var l=!!f(n.target).closest("#select7day,#notice_click,#selectclick").length;var m=!!f(n.target).closest("#fancybox-content").length;if(m==true&&l==false){f("#select7day").attr("class","srfc-box hidden");f(".ico_zf_ssj").attr("class","ico_zf_xsj")}});f(".ico_zf_xsj").live({click:function(){f("#select7day").attr("class","srfc-box");f(this).attr("class","ico_zf_ssj")}});f(".ico_zf_ssj").live({click:function(){f("#select7day").attr("class","srfc-box hidden");f(this).attr("class","ico_zf_xsj")}});f("#wishcontent").live({keyup:function(){var l=f(this).val().length;var m=210-l;f("#wishsize").empty().append('还可以输入<i class="redColor">'+m+"</i>字")}});i.addBirthUserHandle=function(o){var n=f(this),m=n.attr("uid"),l=n.text();e(m,l);return false};i.addAllBirthUserHandle=function(n){var m=f(this);var l=c.util.url(m.attr("href"));c.util.ajaxApi(l,function(p,o){if(p&&o==="success"){f.each(p,function(s,t){var r=t.uid,q=t.uname;e(r,q)});j()}},"GET","json");return false};i.closeHandle=function(l){j();return false};function e(o,m){var r=f("#notice_list");var q=r.children();var s=q.find('[type="hidden"]');var l=true;s.each(function(){var t=f(this).val();if(t==o){l=false;return false}});if(l){var p=q.last();var n=f('<li id="yyauto_li_'+o+'" class="clearfix rcAddmenListli"><span>'+m+'</span><input type="hidden" value="'+o+'" name="notice_div_value[]"><a class="close" href="javascript:;"></a></li>');n.insertBefore(p);n.find(".close").on({click:function(){f(this).closest("li").remove()}})}}function j(){var l=f(".yy-birth-box");l.hide()}}(jQuery,YY,YY.util));