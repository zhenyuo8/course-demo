window.$FlexPaper=window["$FlexPaper"]=function(){if(window.flexpaper){return window.flexpaper}else{window.flexpaper=window.FlexPaperViewer_Instance.getApi()}return window.flexpaper};window.FlexPaperViewer=window.$f=function(){var a=arguments[2].config;window.FlexPaperViewer_Instance=flashembed(arguments[1],{src:arguments[0]+".swf",version:[10,0],expressInstall:"js/expressinstall.swf"},{SwfFile:a.SwfFile,Scale:a.Scale,ZoomTransition:a.ZoomTransition,ZoomTime:a.ZoomTime,ZoomInterval:a.ZoomInterval,FitPageOnLoad:a.FitPageOnLoad,FitWidthOnLoad:a.FitWidthOnLoad,FullScreenAsMaxWindow:a.FullScreenAsMaxWindow,ProgressiveLoading:a.ProgressiveLoading,MinZoomSize:a.MinZoomSize,MaxZoomSize:a.MaxZoomSize,SearchMatchAll:a.SearchMatchAll,SearchServiceUrl:a.SearchServiceUrl,InitViewMode:a.InitViewMode,BitmapBasedRendering:a.BitmapBasedRendering,StartAtPage:a.StartAtPage,PrintPaperAsBitmap:a.PrintPaperAsBitmap,AutoAdjustPrintSize:a.AutoAdjustPrintSize,ViewModeToolsVisible:a.ViewModeToolsVisible,ZoomToolsVisible:a.ZoomToolsVisible,NavToolsVisible:a.NavToolsVisible,CursorToolsVisible:a.CursorToolsVisible,SearchToolsVisible:a.SearchToolsVisible,RenderingOrder:a.RenderingOrder,localeChain:a.localeChain,key:a.key})};function onExternalLinkClicked(a){window.location.href=a}function onProgress(a,b){}function onDocumentLoading(){}function onCurrentPageChanged(a){}function onDocumentLoaded(a){}function onPageLoading(a){}function onPageLoaded(a){}function onDocumentLoadedError(a){}function onDocumentPrinted(){}(function(){var h=document.all,j="http://www.adobe.com/go/getflashplayer",c=typeof jQuery=="function",e=/(\d+)[^\d]+(\d+)[^\d]*(\d*)/,b={width:"100%",height:"100%",id:"_"+(""+Math.random()).slice(9),allowfullscreen:true,allowscriptaccess:"always",quality:"high",version:[3,0],onFail:null,expressInstall:null,w3c:false,cachebusting:false};if(h){b.cachebusting=true}if(window.attachEvent){window.attachEvent("onbeforeunload",function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){}})}function i(m,l){if(l){for(var f in l){if(l.hasOwnProperty(f)){m[f]=l[f]}}}return m}function a(f,n){var m=[];for(var l in f){if(f.hasOwnProperty(l)){m[l]=n(f[l])}}return m}window.flashembed=function(f,m,l){if(typeof f=="string"){f=document.getElementById(f.replace("#",""))}if(!f){return}f.onclick=function(){return false};if(typeof m=="string"){m={src:m}}return new d(f,i(i({},b),m),l)};var g=i(window.flashembed,{conf:b,getVersion:function(){var m,f;try{f=navigator.plugins["Shockwave Flash"].description.slice(16)}catch(o){try{m=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");f=m&&m.GetVariable("$version")}catch(n){try{m=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");f=m&&m.GetVariable("$version")}catch(l){}}}f=e.exec(f);return f?[f[1],f[3]]:[0,0]},asString:function(l){if(l===null||l===undefined){return null}var f=typeof l;if(f=="object"&&l.push){f="array"}switch(f){case"string":l=l.replace(new RegExp('(["\\\\])',"g"),"\\$1");l=l.replace(/^\s?(\d+\.?\d+)%/,"$1pct");return'"'+l+'"';case"array":return"["+a(l,function(o){return g.asString(o)}).join(",")+"]";case"function":return'"function()"';case"object":var m=[];for(var n in l){if(l.hasOwnProperty(n)){m.push('"'+n+'":'+g.asString(l[n]))}}return"{"+m.join(",")+"}"}return String(l).replace(/\s/g," ").replace(/\'/g,'"')},getHTML:function(o,l){o=i({},o);var n='<object wmode="transparent" width="'+o.width+'" height="'+o.height+'" id="'+o.id+'" name="'+o.id+'"';if(o.cachebusting){o.src+=((o.src.indexOf("?")!=-1?"&":"?")+Math.random())}if(o.w3c||!h){n+=' data="'+o.src+'" type="application/x-shockwave-flash"'}else{n+=' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'}n+=">";if(o.w3c||h){n+='<param name="movie" value="'+o.src+'" />';n+='<param name="wmode" value="transparent" />'}o.width=o.height=o.id=o.w3c=o.src=null;o.onFail=o.version=o.expressInstall=null;for(var m in o){if(o[m]){n+='<param name="'+m+'" value="'+o[m]+'" />'}}var p="";if(l){for(var f in l){if(l[f]){var q=l[f];p+=f+"="+(/function|object/.test(typeof q)?g.asString(q):q)+"&"}}p=p.slice(0,-1);n+='<param name="flashvars" value=\''+p+"' />"}n+="</object>";return n},isSupported:function(f){return k[0]>f[0]||k[0]==f[0]&&k[1]>=f[1]}});var k=g.getVersion();function d(f,o,n){if(g.isSupported(o.version)){f.innerHTML=g.getHTML(o,n)}else{if(o.expressInstall&&g.isSupported([6,65])){f.innerHTML=g.getHTML(i(o,{src:o.expressInstall}),{MMredirectURL:location.href,MMplayerType:"PlugIn",MMdoctitle:document.title})}else{if(!f.innerHTML.replace(/\s/g,"")){var m=((document.location.protocol=="https:")?"https://":"http://");f.innerHTML="<a href='http://www.adobe.com/go/getflashplayer'><img src='"+m+"www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' /></a>";if(f.tagName=="A"){f.onclick=function(){location.href=j}}}if(o.onFail){var l=o.onFail.call(this);if(typeof l=="string"){f.innerHTML=l}}}}if(h){window[o.id]=document.getElementById(o.id)}i(this,{getRoot:function(){return f},getOptions:function(){return o},getConf:function(){return n},getApi:function(){return f.firstChild}})}if(c){jQuery.tools=jQuery.tools||{version:"1.2.5"};jQuery.tools.flashembed={conf:b};jQuery.fn.flashembed=function(l,f){return this.each(function(){$(this).data("flashembed",flashembed(this,l,f))})}}})();