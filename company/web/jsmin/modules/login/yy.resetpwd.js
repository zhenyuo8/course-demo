$(document).ready(function(){$.yy.defaultText({newpasswd1:{txt:"密码",css:"bg02"},newpasswd2:{txt:"确认密码",css:"bg02"}});$("#resetForm").validate({validClass:"ydico_right",errorClass:"ts_errow",hasIco:false,rules:{newpasswd1:{required:true,minlength:5},newpasswd2:{required:true,minlength:5,equalTo:"#newpasswd1"}},messages:{newpasswd1:{required:"请输入密码",minlength:jQuery.format("密码不能小5个字符")},newpasswd2:{required:"请输入确认密码",minlength:"确认密码不能小于5个字符",equalTo:"两次输入密码不一致"}}})});