$(document).ready(function(){$("#batchForm").bind("submit",function(){if($("#excelfile").val()==""){$("#Upfilename").html("<font color='red'>未选择上传文件！</font>");return false}$("#submit").text("更新中...");return true});$("#preViewMail").bind("click",function(){$(this).attr("href",YY.util.url("/setting/member/invitemail/msg/"+encodeURI($(".txl_gl_textarea").val())))})});