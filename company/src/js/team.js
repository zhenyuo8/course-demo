/**
 * Created by Ants on 2017/4/10.
 *
 */

// window.onload=function(){

    $(function(){
// 协同云服务旋转动画

     // 默认旋转动画

    var rotation = function () {
        $('#outcyclcircle').rotate({
            duration:8000,
            angle: 0,
            animateTo: 360,
            callback:rotation,
            easing: function (x, t, b, c, d) {
                return c * (t / d) + b;
            },

        })
    }




    // 停止后转动到原位置
    var rotationd = function (gle,t) {
        $('#outcyclcircle').rotate({
            duration:t,
            angle: gle,
            animateTo: 360,
            callback: function(){
                rotation()
            },
            easing: function (x, t, b, c, d) {
                return c * (t / d) + b;
            },
        })
    }
    rotation();

    // 设置停止和开始方法
    $('.icon .stateicon').on('mouseenter',function(event){
        event.stopPropagation();



        $('#outcyclcircle').stopRotate();
         var gle =$('#outcyclcircle').getRotateAngle();

         // var that = this;

        // 鼠标移除
        $('.icon .stateicon').off('mouseout');

        $('.icon .stateicon').on('mouseout',function(event){
            event.stopPropagation();
            $(this).siblings('.show').fadeOut(200);

            var t = (5000/360) * (360 - gle);
            rotationd(gle,t);

            var src = $(this).attr('src');
            $(this).attr('src',$(this).attr('datasrc')).attr('datasrc',src).css('width','100%');
            $(this).parents('.icon').next('.icontext').css('display','block');

        });

        // $('.subicon').on('mouseleave',function(event){
        //     event.stopPropagation();
        //
        //     var t = (5000/360) * (360 - gle);
        //     rotationd(gle,t);
        //     $(this).find('.show').fadeOut(100);
        //     var src = $(this).find('.stateicon').attr('src');
        //     $(this).find('.stateicon').attr('src',$(this).find('.stateicon').attr('datasrc')).attr('datasrc',src);
        //     $(this).find('.icontext').css('display','block');
        //
        // });


        $(this).siblings('.show').fadeIn(500);
        var src = $(this).attr('src');
        $(this).attr('src',$(this).attr('datasrc')).attr('datasrc',src).css('width','120%');

        $(this).parents('.icon').next('.icontext').css('display','none');

    })




    // 内圈旋转动画
    var rotations = function () {
        $('#cyclcircleecnter').rotate({
            duration:20000,
            angle: 1,
            animateTo: 361,
            callback: rotations,
            easing: function (x, t, b, c, d) {
                return c * (t / d) + b;
            }
        })
    }
    rotations();


// 客户案例横向滚动方法
    // 右侧按钮点击
    var sliderflg = 0;
    $('.sliderright').on('click',function () {
        // 设置移动
        if(sliderflg<5){
            sliderflg +=1;
            var left = -sliderflg*100 +'%';
            $('.slidercontent ul').animate({left: left}, "slow");

            $('.caseplace ul li').removeClass('active');
            $('.caseplace ul li').eq(sliderflg).addClass('active');
            if(sliderflg==5){
                $(this).children('img').attr('src','/html/index/img/rightbtnactive.png')
            }else{
                $('.sliderleft img').attr('src','/html/index/img/leftbtnno.png')
            }

        }

    })

    // 左侧按钮点击
    $('.sliderleft').on('click',function () {

        if(sliderflg>0){
            sliderflg -=1;
            var left = -sliderflg*100 +'%';

            $('.slidercontent ul').animate({left: left}, "slow");

            $('.caseplace ul li').removeClass('active');
            $('.caseplace ul li').eq(sliderflg).addClass('active');

            if(sliderflg==0){
                $(this).children('img').attr('src','/html/index/img/leftbtnactive.png')

            }else{
                $('.sliderright img').attr('src','/html/index/img/rightbtnno.png')
            }
        }


    })

    // 点击图片切换
    var imgdoms = $('.caseplace ul li');
    for(var i=0;i<6;i++){
        (function(i){
            imgdoms.eq(i).on('click',function () {
                imgdoms.removeClass('active');
                $(this).addClass('active');
                sliderflg =i;
                var left = -sliderflg*100 +'%';
                // $('.slidercontent ul').css('left',left);

                $('.slidercontent ul').animate({left: left}, "slow");

                if(i==0){
                    $('.sliderleft img').attr('src','/html/index/img/leftbtnactive.png')
                    $('.sliderright img').attr('src','/html/index/img/rightbtnno.png')
                }else if(i==5){
                    $('.sliderright img').attr('src','/html/index/img/rightbtnactive.png')
                    $('.sliderleft img').attr('src','/html/index/img/leftbtnno.png')

                }else{
                    $('.sliderright img').attr('src','/html/index/img/rightbtnno.png');
                    $('.sliderleft img').attr('src','/html/index/img/leftbtnno.png')
                }

            })

        })(i)
    }



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

// 客户端下载下载动画
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


}())