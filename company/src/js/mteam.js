/**
 * Created by Ants on 2017/4/10.
 */
$(function () {

    // 转圈动画

    var rotation = function () {
        $('#outcyclcircle').rotate({
            duration:9000,
            angle: 0,
            animateTo: 360,
            callback:rotation,
            easing: function (x, t, b, c, d) {
                return c * (t / d) + b;
            },

        })
    }
    rotation();

    var rotation1 = function () {
        $('#cyclcircleecnter').rotate({
            duration:8000,
            angle: 0,
            animateTo: 360,
            callback:rotation1,
            easing: function (x, t, b, c, d) {
                return c * (t / d) + b;
            },

        })
    }
    rotation1();

    // var rotation2 = function () {
    //     $('#outcyclcircle').rotate({
    //         duration:5000,
    //         angle: 0,
    //         animateTo: 360,
    //         callback:rotation2,
    //         easing: function (x, t, b, c, d) {
    //             return c * (t / d) + b;
    //         },
    //
    //     })
    // }
    //
    // var rotation3 = function () {
    //     $('#outcyclcircle').rotate({
    //         duration:5000,
    //         angle: 0,
    //         animateTo: 360,
    //         callback:rotation3,
    //         easing: function (x, t, b, c, d) {
    //             return c * (t / d) + b;
    //         },
    //
    //     })
    // }


    // cyclcircleecnter

    // 应用场景
    var scenarioSwiper = new Swiper('.swiper-containerscenario',{
        pagination: '.pagination',
        loop:true,
        grabCursor: true,
        paginationClickable: true
    })
    // $('.arrow-left').on('click', function(e){
    //     e.preventDefault()
    //     scenarioSwiper.swipePrev()
    // })
    // $('.arrow-right').on('click', function(e){
    //     e.preventDefault()
    //     scenarioSwiper.swipeNext()
    // })




    // 客户案例
    var caseSwiper = new Swiper('.swiper-containercase',{
        pagination: '.paginations',
        loop:true,
        grabCursor: true,
        paginationClickable: true
    })

    // 快速注册方法
    // 注册

    function btnregester(){
        var phonenumber =$('#phonenumber').val();
        var rege=/^[_a-z 0-9]+@([_a-z 0-9]+\.)+[a-z 0-9]{2,3}$/;   //正则验证邮箱格式
        var regp = /^1\d{10}$/   //手机号正则
        if(rege.test(phonenumber)||regp.test(phonenumber)){
            var regesterurl='http://upesn.com/account/reg/beginUser/mobile/'+phonenumber;
            document.location.href=regesterurl;
        }else{
            alert('您输入的有误！请重新输入！')
            // document.location.href="webhtml/yy/website%202/mteam.html?_ijt=u1d6ctovorrthju8o35n1gah93";
        }


    }

    $('#phonenumber').on('keyup',function () {
        var phonenumber =  $(this).val();
        var rege=/^[_a-z 0-9]+@([_a-z 0-9]+\.)+[a-z 0-9]{2,3}$/;   //正则验证邮箱格式
        var regp = /^1\d{10}$/   //手机号正则
        if(rege.test(phonenumber)||regp.test(phonenumber)){
            $('#btnregester').css('opacity','1')
            $('#btnregester').on('click',btnregester);


        }else{

            $('#btnregester').css('opacity','0.3');
            $('#btnregester').off('click');
            // document.location.href="webhtml/yy/website%202/mteam.html?_ijt=u1d6ctovorrthju8o35n1gah93";
        }

    })


    // banner图片切换方法
    var bannerli = $('.banner ul li');

    var bannerimems = 0;

    // 自动切换

    var bannertime = setInterval(function(){
        if(bannerimems<4){
            $('.bannerimg').addClass('none')
            $('.bannerimg').eq(bannerimems).removeClass('none');


            bannerli.removeClass('bannericonactive');
            bannerli.eq(bannerimems).addClass('bannericonactive');

            bannerimems +=1;

        }else{
            bannerimems =0;
            $('.bannerimg').addClass('none')
            $('.bannerimg').eq(bannerimems).removeClass('none');


            bannerli.removeClass('bannericonactive');
            bannerli.eq(bannerimems).addClass('bannericonactive');
            bannerimems +=1;
        }


    },5000)


    for(var i=0,len = bannerli.length;i<len;i++){
        (function(i){
            bannerli.eq(i).on('mouseenter',function () {
                clearInterval(bannertime);
                bannerimems = i;
                $('.bannerimg').addClass('none')
                $('.bannerimg').eq(i).removeClass('none');

                bannerli.removeClass('bannericonactive');
                $(this).addClass('bannericonactive');

                // bannerli.eq(i).on('mouseenter',function (){
                //     bannerimems = i;
                //     bannertime();
                //
                //     }
            });
            bannerli.eq(i).on('mouseenter',function (){
                bannerimems = i;
                bannertime = setInterval(function(){
                    if(bannerimems<4){
                        $('.bannerimg').addClass('none')
                        $('.bannerimg').eq(bannerimems).removeClass('none');

                        bannerli.removeClass('bannericonactive');
                        bannerli.eq(bannerimems).addClass('bannericonactive');
                        bannerimems +=1;

                    }else{
                        bannerimems =0;
                        $('.bannerimg').addClass('none')
                        $('.bannerimg').eq(bannerimems).removeClass('none');

                        bannerli.removeClass('bannericonactive');
                        bannerli.eq(bannerimems).addClass('bannericonactive');
                        bannerimems +=1;
                    }


                },5000)
            });

        })(i)
    };









}())