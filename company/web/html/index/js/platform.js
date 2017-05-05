/**
 * Created by Ants on 2017/4/11.
 */
$(function(){

    // 设置rem
    function resizeBaseFontSize(){
        var rootHtml = document.documentElement,
            deviceWidth = rootHtml.clientWidth;
        rootHtml.style.fontSize = deviceWidth / 12 + "px";
    }
    resizeBaseFontSize();
    window.addEventListener("resize", resizeBaseFontSize, false);
    window.addEventListener("orientationchange", resizeBaseFontSize, false);



}())