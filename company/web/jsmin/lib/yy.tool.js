YY=YY||{};var tool={FloatBox:function(r){r=r instanceof Object?r:{};var u=this,o=$('<div class="yy-floatbox" id="yyFloatbox" style="z-index:1001;display:none;"><div class="yy-floatbox-main rili_greyBox"></div></div>'),l=$('<div class="yy-floatbox-title tit"><h3 class="fl">默认标题</h3><span class="yy-floatbox-close fr"><img src="'+YY.util.url("/images/grayDel.gif")+'"></span></div>'),d=$('<article class="yy-floatbox-content richeng con"></article>'),m=$('<p class="yy-floatbox-bottom-arrow" id="yyFloatboxArrow"></p>');u.settings={pos:[0,0],width:560,height:360,height_fixed:false,fix_height:10};$.extend(u.settings,r);var u=this,f=$("#yyFloatbox"),i=$("#yyFloatboxArrow",f),h=e.pageX,g=e.pageY,q=10;f.show();var a=f.outerHeight(),n=f.outerWidth(),t=n/2,b=i.width(),s=b/2,j=i.height(),k,c,p=u.$body.width();if(g>(a+j+1)){i.addClass("yy-floatbox-bottom-arrow").removeClass("yy-floatbox-top-arrow");k=g-a-j-1}else{i.addClass("yy-floatbox-top-arrow").removeClass("yy-floatbox-bottom-arrow");k=g+j+1}c=h-t;if(h<(t+q)){c=q;i.css({left:(h-c-s)})}else{if((p-h)<(t+q)){c=p-n-q;i.css({left:(h-c-s)})}else{i.css({left:(t-s)})}}f.offset({top:k,left:c}).css({visibility:"visible"})}};YY.tool=tool;