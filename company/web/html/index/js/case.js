/**
 * Created by Ants on 2017/4/11.
 */

$(function(){



    // 判断是否在首页应用场景过来

    function goto(){
        var subnav = $('.subnav ul li');
        var href =  window.location.href;
        var go = href.split('go=')[1]
        if(go){
            subnav.removeClass('active');
            $(subnav[go]).addClass('active');
            var top =  $($('.subcontent')[go]).offset().top - $('.header').height();
            $('body').animate({scrollTop: top}, "fast");
            $('html').animate({scrollTop: top}, "fast");
        }


    }
    goto();





    // 版本介绍导航方法
    var subnav = $('.subnav ul li');
    for(var i=0,len = subnav.length;i<len;i++){
        (function(i){
            subnav.eq(i).on('click',function () {

                subnav.removeClass('active');
                $(this).addClass('active');
                var top =  $($('.subcontent')[i]).offset().top - $('.header').height();
                $('body').animate({scrollTop: top}, "fast");
                $('html').animate({scrollTop: top}, "fast");
            })

        })(i)
    }

    $('#bbjs').on('click',function(){

        var top =  $('.edition').offset().top - $('.header').height();
        $('body').animate({scrollTop: top}, "fast");
        $('html').animate({scrollTop: top}, "fast");


    })







}())