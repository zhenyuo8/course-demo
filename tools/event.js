
function on(ele,type,fn){//用来绑定事件；
    if(/^self/.test(type)){//都是跟自定义事件有关的方法；--自定义事件绑定
        if(!ele[type]){//‘selfDragStart’
            ele[type]=[];
        }
        var a=ele[type];
        for(var i=0; i< a.length; i++){
            if(a[i]==fn) return;
        }
        a.push(fn);//跟自定义事件有关的方法,都存在数组中，数组在元素的自定义属性上；
    }else{//都是跟系统事件有关的方法；--系统事件绑定
        if(ele.addEventListener){//标准浏览器
            ele.addEventListener(type,fn,false)
        }else{//IE浏览器
            if(!ele['aEvent'+type]){
                ele['aEvent'+type]=[];
                ele.attachEvent('on'+type,function(){
                    run.call(ele)
                });//给系统事件池只存了一个run方法；
            }
            var a=ele['aEvent'+type];
            for(var i=0; i< a.length; i++){
                if(a[i]==fn) return;
            }
            a.push(fn);//把方法存在自己事件池；
        }
    }
}
function  run(){//目的：把自己事件池中的所有方法都顺序调用；--被系统事件触发的；
    var e=window.event;
    var type= e.type;
    e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+ e.clientX;
    e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+ e.clientY;
    var target= e.srcElement;//事件源
    e.preventDefault=function(){
        e.returnValue=false;
    };
    e.stopPropagation=function(){
        e.cancelBubble=true;
    };
    var a=this['aEvent'+type];
    if(a && a.length){
        for(var i=0; i< a.length; i++){
            if(typeof a[i]==='function'){
                a[i].call(this,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}
function  off(ele,type,fn){
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
    }else{
        var a=ele['aEvent'+type];
        if(a && a.length){
            for(var i=0; i< a.length; i++){
                if(a[i]==fn){
                    a[i]=null;
                    break;
                }
            }
        }
    }
}
function fire(ele,type,e){
    //1.拿到数组
    var a=ele[type];
    //2.顺序调用
    if(a && a.length){
        for(var i=0; i< a.length; i++){
            if(typeof a[i]==='function'){
                a[i].call(ele,e);
            }else{
                a.splice(i,1);
                i--;
            }
        }
    }
}
//功能：改变函数中的this指向；
function processThis(fn,context){
    return function (e){
        fn.call(context,e)
    }
}










