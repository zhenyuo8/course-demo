(function(d){var e="",a="",c="";var b={pic_width:980,pic_height:290,button_pos:4,stop_time:3000,show_text:0,txtcolor:"000000",bgcolor:"DDDDDD",pic:[{img:"/images/img980-290.jpg",link:"http://www.www.net/",title:"标题 "}],id:"flashpic"};d.extend(d.yy,{flashpic:function(f){d.extend(b,f);b.swf_height=(b.show_text==1)?(b.pic_height+20):b.pic_height;var h="";d.each(b.pic,function(i,j){e+=(h+b.pic[i].img);a+=(h+b.pic[i].link);c+=(h+b.pic[i].title);h="|"});var g='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cabversion=6,0,0,0" width="'+b.pic_width+'" height="'+b.swf_height+'"><param name="movie" value="'+YY.util.url("/images/focus.swf")+'"><param name="quality" value="high"><param name="wmode" value="opaque"><param name="FlashVars" value="pics='+e+"&links="+a+"&texts="+c+"&pic_width="+b.pic_width+"&pic_height="+b.pic_height+"&show_text="+b.show_text+"&txtcolor="+b.txtcolor+"&bgcolor="+b.bgcolor+"&button_pos="+b.button_pos+"&stop_time="+b.stop_time+'"><embed src="'+YY.util.url("/images/focus.swf")+'" FlashVars="pics='+e+"&links="+a+"&texts="+c+"&pic_width="+b.pic_width+"&pic_height="+b.pic_height+"&show_text="+b.show_text+"&txtcolor="+b.txtcolor+"&bgcolor="+b.bgcolor+"&button_pos="+b.button_pos+"&stop_time="+b.stop_time+'" quality="high" width="'+b.pic_width+'" height="'+b.swf_height+'" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>';d("#"+b.id).replaceWith(g)}})})(jQuery);