// /**
//  * Created by Ants on 2017/4/12.
//  */
//
// // 设置rem

$(function () {
    if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0")
    {
        document.location.href="http://upesn.com/static/copyassets/lowbrowser/index.html"
    }
    else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0")
    {
        document.location.href="http://upesn.com/static/copyassets/lowbrowser/index.html"

    }
    else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0")
    {
        document.location.href="http://upesn.com/static/copyassets/lowbrowser/index.html"

    }








    var href ='/html/index/' + window.location.href.split('/html/index/m')[1];

    // 设置rem
    function resizeBaseFontSize(){
        var rootHtml = document.documentElement,
            deviceWidth = $('body').width();

        if(deviceWidth > 760){
            document.location.href=href;
        }

        rootHtml.style.fontSize = deviceWidth / 12 + "px";
    }

    resizeBaseFontSize();

    window.addEventListener("resize", resizeBaseFontSize, false);
    window.addEventListener("orientationchange", resizeBaseFontSize, false);


    // 下载icon
    $('#downbtn').on('click',function () {

        $(this).find('.downcode').slideToggle("fast");


    })


    // 导航

    $('#navbtn').on('click touchstart',function (event){
        event.stopPropagation();
        $('.nav').slideToggle("fast");
        $('.downcode').slideUp('fast');
        return false;
    });

    $(document).on('click touchstart',function(e){
        if(!$(e.target).closest('.nav').length&&!$(e.target).closest('#downbtn').length) {
            $('.nav').slideUp("fast");
            $('.downcode').slideUp('fast');

        }else if(!$(e.target).closest('.nav').length&&$(e.target).closest('#downbtn').length){

            $('.nav').slideUp("fast");
        }else if($(e.target).closest('.nav').length&&!$(e.target).closest('#downbtn').length){

            $('.downcode').slideUp('fast');
        }
    });
})
