$(document).ready(function(){$.yy.defaultText({verificode:{txt:"验证码",css:"bg06"},new_pass:{txt:"新密码",css:"bg02"},confirm_pass:{txt:"确认密码",css:"bg02"}});var a=$("#email").val();$("#editPwdForm").validate({rules:{verificode:{required:true,remote:{url:yyBaseurl+"/account/lostpasswd/ajaxGetCode/email/"+a,type:"POST",dataType:"json",data:{verificode:function(){return $("#verificode").val()}}}},new_pass:{required:true,minlength:6},confirm_pass:{required:true,minlength:6,equalTo:"#new_pass"}},messages:{verificode:{required:"请输入验证码",remote:jQuery.format("验证码错误")},new_pass:{required:"请输入密码",minlength:"密码不能小于5个字符"},confirm_pass:{required:"请输入确认密码",minlength:"确认密码不能小于6个字符",equalTo:"两次输入密码不一致"}}})});