$(document).ready(function(){$("#memberForm").validate({rules:{qz_name:"required",qz_shortname:{required:true,remote:{url:yyBaseurl+"/space/join/createdvalid",type:"GET",dataType:"json",data:{qz_shortname:function(){return $("#qz_shortname").val()}}}}},messages:{qz_name:{required:"必填"},qz_shortname:{required:"必填",remote:"重复"}}});$.validator.addMethod("thelimit",function(c,a){var b=/[^\x00-\xff]/g;return this.optional(a)||!b.test(c)},"不能输入中文");$("a#uploadAvatar").fancybox({width:700,height:550,type:"iframe"});$("#member .info").bind("click",function(){var b=$(this).attr("id");var a=b.split("_")[1];$(this).toggle();$("#"+a).parent("div").parent("li").parent("ul").addClass("mt10");$("#"+a).parent("div").toggleClass("hidden")});$("#member").validate({rules:{name:{required:true},gname:{required:true},gname_sub:{required:true},gperson:{required:true},phone:{required:true,thelimit:true}},messages:{name:{required:"必填"},gname:{required:"必填"},gname_sub:{required:"必填"},gperson:{required:"必填"},phone:{required:"必填"}}})});