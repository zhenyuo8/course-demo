// /**
//  * Created by Ants on 2017/4/12.
//  */
//
// // 设置rem
$(function () {

    // 设置rem及屏幕宽度缩小跳转

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

    // 设置footer下载下拉动画

    var footerdowndoms = $('.friendlink .imgs ul li');

    for(var i=0,len = footerdowndoms.length;i<len;i++){
        (function(i){
            footerdowndoms.eq(i).on('mouseenter',function () {


                if(i==0){
                    $(this).find('.phoneactive').slideDown('fast')
                }else{
                    var src = $(this).find('.downpcb').attr('src');
                    // console.log($(this).find('.downpcb').attr('datasrc'))
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

})




