$(document).ready(function(){var h=$("#avatarContainter img");$("#sub").live("click",function(){if(!i()){return false}YY.util.ajaxApi(YY.util.url("/common/avatar/sub"),function(t){if(t&&typeof t.rs!=="undefined"&&t.rs){var j=t.data+".thumb.jpg?"+Math.random();$.fancybox.close();h.attr("src",j)}},"POST","json",{sub:1,filepath:$("#filepath").val(),mid:$("#mid").val(),uid:$("#uid").val(),bigwidth:$("#bigwidth").val(),bigheight:$("#bigheight").val(),x:$("#x").val(),y:$("#y").val(),w:$("#w").val(),h:$("#h").val()})});function i(){if($("#x").val()==""){alert("请先上传图片然后选择裁切头像最后进行保存！");return false}return true}YY.util.loadScript(["/plugin/jquery.Jcrop.js"]);var a=function(){var j=this,t=[48,48],w=$("#bigwidth"),v=$("#bigheight"),u=$("#avatarPreview1");f=$("#avatarPreview2");d=$("#avatarPreview3");j.goss=function(x){var y=v.val(),z=w.val();move_flag=z*s<48||y*s<48?false:true;$("#avatarOrigin").Jcrop({boxWidth:400,boxHeight:400,minSize:t,allowSelect:false,allowMove:move_flag,onChange:j.showPreview,onSelect:j.showPreview,onSelect:j.updateCoords,setSelect:x,aspectRatio:1},function(){j.api=this})};j.updateCoords=function(x){$("#x").val(x.x);$("#y").val(x.y);$("#w").val(x.w/s);$("#h").val(x.h/s)};j.showPreview=function(A){var B=t[0]/A.w,z=t[1]/A.h,x=w.val()*s,y=v.val()*s;u.css({width:Math.round(B*x)+"px",height:Math.round(z*y)+"px",marginLeft:"-"+Math.round(B*A.x)+"px",marginTop:"-"+Math.round(z*A.y)+"px"});f.css({width:Math.round(B*x)+"px",height:Math.round(z*y)+"px",marginLeft:"-"+Math.round(B*A.x)+"px",marginTop:"-"+Math.round(z*A.y)+"px"});d.css({width:Math.round(B*x)+"px",height:Math.round(z*y)+"px",marginLeft:"-"+Math.round(B*A.x)+"px",marginTop:"-"+Math.round(z*A.y)+"px"})}};var r=$("#mid"),e=$("#uid"),l=$("#avatarUploadBlock"),c=$(".yy-upload-process-container",l),n=$("#avatarOrigin"),g=$("#avatarPreview1"),f=$("#avatarPreview2"),d=$("#avatarPreview3"),s=1,q=1?true:false,o=new a();b();var m=p();q&&o.goss(m);YY.util.initUpload(function(){new InitUpload({file_types:"*.jpg;*.jpeg;*.png;",post_params:{sessid:sessid,mid:r,uid:e},file_size_limit:"3 MB",button_width:"168",button_height:"29",button_text_left_padding:"55",button_text:'<span class="theFont">选择图片</span>',button_text_style:".theFont { font-size: 12; color:#FFFFFF; }",button_placeholder_id:"avatarUploadButton",upload_url:YY.util.url("/common/avatar/upload"),upload_start_handler:function(t){try{c.html('上传中，已上传 <span class="percent">0%</span>')}catch(j){}return true},upload_progress_handler:function(t,w,v){try{var u=Math.ceil((w/v)*100);c.find(".percent").html(u+"%")}catch(j){this.debug(j)}},upload_success_handler:function(w,t){try{t=$.parseJSON(t);if(typeof t.rs!=="undefined"&&t.rs){if(typeof o!=="undefined"&&typeof o.api!=="undefined"){o.api.destroy()}var j=t.data+"?"+Math.random();n.removeAttr("style").attr("src",j);g.attr("src",j);f.attr("src",j);d.attr("src",j);var v=0;n.on("load",function(){$("#bigwidth").val(n.width());$("#bigheight").val(n.height());var y="avatar"+t.data.split("avatar")[1];$("#filepath").val(y);c.html("请选择合适区域");b();var x=p();o.goss(x);$(this).off("load")})}}catch(u){c.html("很抱歉，您的图片没有上传成功。")}},upload_error_handler:function(){c.html("很抱歉，您的图片没有上传成功。")}})});function b(){var u=400,j=400,v=n.width(),t=n.height();s=1;n.css({visibility:"visible"});if(v>u||t>j){if(v<t){n.css({height:j});s=j/t}else{n.css({width:u});s=u/v}}}function p(){var u=n.is(":hidden");u&&n.show();var E=400,F=400,t=n.width(),v=n.height(),A=t<v,w=A?t:v,z=w-10,D,j,C,B;if(A){D=5;C=(v-z)/2}else{D=(t-z)/2;C=5}j=D+z;B=C+z;u&&n.hide();return[D,C,j,B]}function k(u,j){if(typeof j!=="function"){return false}var t=u.keyCode?u.keyCode:(u.which?u.which:u.charCode);if(t==13){j()}}});function confimDept(b,d){var c=$("#dept_name");var a=$("#dept_id");if(b&&d){c.val(d);a.val(b);$.fancybox.close()}};