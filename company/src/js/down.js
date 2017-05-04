/**
 * Created by Ants on 2017/4/11.
 */
$(function(){

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







    function resizeBaseFontSize(){
        var rootHtml = document.documentElement,
            deviceWidth = rootHtml.clientWidth;

        if(760<deviceWidth&&deviceWidth < 1200){
            deviceWidth = 1200;
        }else if(deviceWidth < 760){
            document.location.href="/html/index/mdown.html"
        }


        rootHtml.style.fontSize = deviceWidth / 12 + "px";


    }
    resizeBaseFontSize();

    $(window).on('resize',function(){
        resizeBaseFontSize()

    })




    // 设置footer下载下拉动画

    var footerdowndoms = $('.friendlink .imgs ul li');

    for(var i=0,len = footerdowndoms.length;i<len;i++){
        (function(i){
            footerdowndoms.eq(i).on('mouseenter',function () {

                if(i==0){
                    $(this).find('.phoneactive').slideDown('fast')
                }else{
                    var src = $(this).find('.downpcb').attr('src');
                    $(this).find('.downpcb').attr('src',$(this).find('.downpcb').attr('datasrc')).attr('datasrc',src);
                }

                //

            })
            footerdowndoms.eq(i).on('mouseleave',function () {
                if(i==0){
                    $(this).find('.phoneactive').slideUp('fast');
                }else{
                    var src = $(this).find('.downpcb').attr('src');
                    $(this).find('.downpcb').attr('src',$(this).find('.downpcb').attr('datasrc')).attr('datasrc',src);
                }

            })

        })(i)
    }




    // 设置下载下拉动画

    var downdoms = $('.down ul li');

    for(var i=0,len = downdoms.length;i<len;i++){
        (function(i){
            downdoms.eq(i).on('mouseenter',function () {
                $(this).find('.phoneactive').slideDown('fast')

                //

            })
            downdoms.eq(i).on('mouseleave',function () {
                $(this).find('.phoneactive').slideUp('fast');

                //

            })

        })(i)
    }



}())