$(document).ready(function(){$(".checkAll").bind("click",function(){var b=$(this).attr("checked")=="checked"?true:false;if(b){$(".screen_id").attr("checked","checked")}else{$(".screen_id").removeAttr("checked")}});$(".add_wbq").bind("click",function(){YY.util.ajaxApi(YY.util.url("/setting/app/screenedit/"),function(b){$(".wbq_add_box").html(b).show();a()},"POST","HTML","screenid=0")});$(".yy-screen-delete").bind("click",function(){$(".delete-screen").show();$("a.feed-delete-confirm").live("click",function(){var c=$("input.screen_id:checked");if(c.length==0){$.yy.rscallback("您还没有选择任何微博墙！");$(".delete-screen").hide();return false}else{var d="";for(var b=0;b<c.length;b++){d+=$(c[b]).val()+","}d=d.substring(0,d.length-1);YY.util.ajaxApi(YY.util.url("/setting/app/screendrop"),function(g,f){if(g.rs&&f=="success"){for(var e=0;e<c.length;e++){$(c[e]).closest("li").fadeOut(200,function(){$(c[e]).closest("li").remove()})}$(".delete-screen").hide()}},"POST","JSON","id="+d)}})});$("a.wbq_edit").live("click",function(){var b=$(this);YY.util.ajaxApi(b.attr("href"),function(c){$(".wbq_add_box").html(c).show();a()},"POST","HTML","screenid="+b.attr("data"));return false});$(".yy-screen-flag").bind("click",function(){var b=$(this).attr("flag");var d=$("input.screen_id:checked");if(d.length==0){$.yy.rscallback("您还没有选择任何微博墙！");return false}else{var e="";for(var c=0;c<d.length;c++){e+=$(d[c]).val()+","}e=e.substring(0,e.length-1);YY.util.ajaxApi(YY.util.url("/setting/app/screenflag/flag/"+b),function(h,g){if(h.rs&&g=="success"){for(var f=0;f<d.length;f++){$(d[f]).closest("li").fadeOut(200,function(){$(d[f]).closest("li").remove()})}$.yy.rscallback("操作成功！")}},"POST","JSON","id="+e)}});$("#close").live("click",function(){$(".wbq_add_box").hide()});$("a.yy-delete-cancel").live("click",function(){$(".delete-screen").hide()});$("#sbutton").live("click",function(){if($("#screenSearch_key").val()==""&&$("#screenSearch_id").val()==""&&$("#screenSearch_memberid").val()==""){$.yy.rscallback("搜索内容必须填写一项");return false}else{setTimeout(function(){$("#screenSearch").submit()},100)}});function a(c,b){$("#picturepath").change(function(){onUploadImgChange(this)});$("#preview").load(function(){onPreviewLoad(this)});$("#start_time").datepicker({prevText:"上月",nextText:"下月",dateFormat:"yy-mm-dd"});$("#end_time").datepicker({prevText:"上月",nextText:"下月",dateFormat:"yy-mm-dd"});$("#addscreen").validate({validClass:"icoRightsss",errorClass:"icoWrong",errorBg:"yellowBg",hasIco:false,rules:{eventname:"required",topic:"required",start_time:"required",end_time:"required",address:"required",picturepath:"requried"},messages:{eventname:{required:"请输入活动名"},picturepath:{required:"请上传群组封面"},topic:{required:"请输入话题"},start_time:{required:"请输入开始时间"},end_time:{required:"请输入结束时间"},address:{required:"地址"},}});$.initProv("#province","#city")}});