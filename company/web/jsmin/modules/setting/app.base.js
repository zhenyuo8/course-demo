$(document).ready(function(){$("#appform").validate({hasIco:false,rules:{title:"required",icon:"required",order:{required:true,number:true},appurl:"required",message:"required"},messages:{title:{required:"请填写应用名称"},icon:{required:"图标不能为空"},order:{required:"排序不能为空",number:"排序必须为数字"},appurl:{required:"appurl不能为空"},message:{required:"请填写应用简介"}},errorClass:"error"});$("#icon").change(function(){onUploadImgChange(this)});$("#preview").load(function(){onPreviewLoad(this)})});