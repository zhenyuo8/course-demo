/**
 * Created by Ants on 2017/4/11.
 */
$(function(){


    // 公司介绍导航
    var subnav = $('.subnav ul li');
    for(var i=0,len = subnav.length;i<len;i++){
        (function(i){
            subnav.eq(i).on('click',function () {
                subnav.removeClass('active');
                $(this).addClass('active');
                $('.subcontent').fadeOut("fast");
                $('.subcontent').eq(i).fadeIn("slow");
            })

        })(i)
    }

    // 联系我们导航
    var btns = $('.btns ul li');
    for(var i=1,len = btns.length;i<len;i++){
        (function(i){
            btns.eq(i).on('click',function () {
                btns.removeClass('contentactive');
                btns.removeClass('btnactive');
                $(this).addClass('btnactive');
                var src = 'img/map'+i+'.png'
                $('#map img').attr('src',src).fadeIn('slow')
            })

        })(i)
    }





}())