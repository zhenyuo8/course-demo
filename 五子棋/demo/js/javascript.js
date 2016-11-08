/**
 * Created by Administrator on 2016/10/10.
 */
var me=true;
var chess=document.getElementById('chessBox');
var chessBord=[];
for(var i=0;i<15;i++){
    chessBord[i]=[];
    for(var j=0;j<15;j++){
        chessBord[i][j]=0;
    }
}
var context=chess.getContext('2d');
context.strokeStyle='#BFBFBF';
var img=new Image();
img.src='img/apple/logo3.png';
img.onload=function () {
    context.drawImage(img,15,15,420,420);
    drawImgBox();
    oneStep()
};
var drawImgBox=function () {
    for(var i=0;i<15;i++){
        context.moveTo(15+i*30,15);
        context.lineTo(15+i*30,435);
        context.stroke();
        context.moveTo(15,15+i*30);
        context.lineTo(435,15+i*30);
        context.stroke();
    }
};
var oneStep=function (i,j,me) {
    context.beginPath();
    context.arc(15+i*30,15+j*30,13,0,2*Math.PI)
    context.closePath();
    var gradient=context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0)
    if(me){
        gradient.addColorStop(0,'#0a0a0a');
        gradient.addColorStop(1,'#636366')
    }else{
        gradient.addColorStop(0,'#D1D1D1');
        gradient.addColorStop(1,'#F9F9F9')
    }
    context.fillStyle=gradient;
    context.fill();
};
chess.onclick=function (e) {
    var x=e.offsetX;
    var y=e.offsetY;
    var i=Math.floor(x/30);
    var j=Math.floor(y/30);
    if(chessBord[i][j]==0){
        oneStep(i,j,me);
        if(me){
            chessBord[i][j]=1
        }else{
            chessBord[i][j]=1
        }
        me=!me;
    }
};



