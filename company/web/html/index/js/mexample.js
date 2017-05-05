/**
 * Created by Ants on 2017/4/20.
 */


var href ='/html/index/m' + window.location.href.split('/html/index/')[1];
function resizeBaseFontSize(){
    var rootHtml = document.documentElement,
        deviceWidth = rootHtml.clientWidth;

    if(760<deviceWidth&&deviceWidth < 1200){
        deviceWidth = 1200;
    }else if(deviceWidth < 760){
        document.location.href=href;
    }


    rootHtml.style.fontSize = deviceWidth / 12 + "px";


}
resizeBaseFontSize();

$(window).on('resize',function(){
    resizeBaseFontSize()

})
