function loadCode(){$("#vcode").html('<a href="javascript:loadCode();"><!-- <img src=\''+yyBaseurl+"/account/register/validatecode/index?rid="+Math.random()+"'> --></a>")}$(document).ready(function(){var b=$("#papersinput"),a=b.siblings("img");var d=$("#officiainput"),c=d.siblings("img");$.yy.authpwd({});$.validator.addMethod("thelimit",function(g,e){var f=/[^\x00-\xff]/g;return this.optional(e)||!f.test(g)},"不能输入中文");$("#member .info").bind("click",function(){var f=$(this).attr("id");var e=f.split("_")[1];$(this).toggle();$("#"+e).parent("div").parent("li").parent("ul").addClass("mt10");$("#"+e).parent("div").toggleClass("hidden")});$("#member").validate({rules:{name:{required:true},gname:{required:true},gname_sub:{required:true},gperson:{required:true},phone:{required:true,thelimit:true}},messages:{name:{required:"必填"},gname:{required:"必填"},gname_sub:{required:"必填"},gperson:{required:"必填"},phone:{required:"必填"}}});YY.util.initUpload(function(){new InitUpload({file_types:"*.jpg;*.jpeg;*.png;",post_params:{sessid:window.sessid,mid:Math.ceil(Math.random()*1000000),uid:Math.ceil(Math.random()*1000000)},file_size_limit:"5 MB",button_width:"65",button_height:"28",button_text_left_padding:"55",button_text:"",button_text_style:"",button_placeholder_id:"papers",upload_url:YY.util.url("/file/nact/attach"),upload_start_handler:function(e){return true},upload_progress_handler:function(e,g,f){},upload_success_handler:function(g,e){try{YY.util.trace(e);e=$.parseJSON(e);if(typeof e.verinfo!=="undefined"&&e.verinfo){b.val(e.verinfo.filepath);a.attr("src",e.staticurl+e.verinfo.filepath)}}catch(f){}},upload_error_handler:function(){}});new InitUpload({file_types:"*.jpg;*.jpeg;*.png;",post_params:{sessid:window.sessid,mid:Math.ceil(Math.random()*1000000),uid:Math.ceil(Math.random()*1000000)},file_size_limit:"5 MB",button_width:"65",button_height:"28",button_text_left_padding:"55",button_text:"",button_text_style:"",button_placeholder_id:"officia",upload_url:YY.util.url("/file/nact/attach"),upload_start_handler:function(e){return true},upload_progress_handler:function(e,g,f){},upload_success_handler:function(g,e){try{e=$.parseJSON(e);if(typeof e.verinfo!=="undefined"&&e.verinfo){d.val(e.verinfo.filepath);c.attr("src",e.staticurl+e.verinfo.filepath)}}catch(f){}},upload_error_handler:function(){}})});YY.util.loadScript(["plugin/jquery.formvalid.js"],{fn:function(){var f=YY.util.isIE();var e=$("form#memberForm");var g=$(":text, :password, :checkbox",e);g.each(function(){$(this).after('<span class="yy-tips" style="display:none;"></span>').addClass("fl")});g.focus(function(){$(this).formValid("tips");$(this).siblings("span.yy-tips").show()}).blur(function(){var k=$(this);if(k.formValid("valid")){$(this).siblings("span.yy-tips").hide();if(k.attr("name")==="username"){var l=(f&&document.charset=="utf-8"?encodeURIComponent(this.value):this.value);var i=YY.util.url("/account/register/usernamevalid");YY.util.ajaxApi(i,function(n,m){if(n&&n=="1"&&m==="success"){k.parent().find(".yy-tips").removeClass("yy-tips-error").html("可以注册").show()}else{k.parent().find(".yy-tips").addClass("yy-tips-error").html("已存在或不能全为数字").show()}},"GET","html",{name:l})}if(k.attr("name")==="qz_name"){var j=(f&&document.charset=="utf-8"?encodeURIComponent(this.value):this.value);var i=YY.util.url("/account/register/qznamevalid");YY.util.ajaxApi(i,function(n,m){if(n&&n=="1"&&m==="success"){k.parent().find(".yy-tips").removeClass("yy-tips-error").html("可以注册").show()}else{k.parent().find(".yy-tips").addClass("yy-tips-error").html("已存在").show()}},"GET","json",{name:j})}if(k.attr("name")==="email"){var h=(f&&document.charset=="utf-8"?encodeURIComponent(this.value):this.value);var i=YY.util.url("/account/register/qzemailvalid");YY.util.ajaxApi(i,function(n,m){if(n&&n=="1"&&m==="success"){k.parent().find(".yy-tips").removeClass("yy-tips-error").html("可以注册").show()}else{k.parent().find(".yy-tips").addClass("yy-tips-error").html("已存在").show()}},"GET","json",{email:h})}}});$("form#memberForm").submit(function(){var h=$(this).formValid("valid",g,true);return h})}})});