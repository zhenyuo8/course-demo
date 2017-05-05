<!DOCTYPE html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta content="IE=EmulateIE8" http-equiv="X-UA-Compatible">
<link rel="stylesheet" type="text/css" href="master.css">
<link rel="stylesheet" type="text/css" href="login_2014.css">
<script type="text/javascript" src="html5.js"></script>
<title>申请试用</title>
<style>html{min-width: 1000px}</style>
</head>
<body>
<div class="header_new">
            <div class="w1000">
                <div class="fl login_logo"><a href="/"><img src="/images/account/logo.png" /></a></div>
                <div class="fr login_but_s login_but_new"><span class="fl">已有账号？</span><a class="login_Sbut fr" href="/html/index/index.html">登录</a></div>
            </div>
        </div>
<!-- heder引用模板 -->
<!-- 申请试用 -->
<?php 
error_reporting(0); 
$systemConfig = include_once('../../../config/config.php');
$return = $_GET['return'];
$return_arr[1] = '我们的工作人员会尽快与您联系，请保持电话畅通，谢谢！';
$return_arr[2] = '申请提交失败，请稍后再试！';

if($return!='' &&( $return==1 ||  $return==2)){
	$msg = $return_arr[$return];
	$output='
	<div class="w1000 loginCont">
	<a href="/" class="login_back_index"><<返回首页</a>
    <p class="tishi_tit">申请试用</p>
    <p class="login_sy_cont">'.$msg.'</p>
	</div><div class="footer">京ICP备05007539号-10  版权所有：用友超客网络科技有限公司  2013-2014</div>
';
	echo $output;
	$_POST = array();
	exit;
	
} 
function mailto($nickname, $address, $id, $activation_code,$data,$account)
{
	 if(empty($data)) return false;
	 date_default_timezone_set('PRC');
	 include_once("class.phpmailer.php");
	/*
	 $mail = new PHPMailer(); // defaults to using php "mail()"
	 $mail->IsSMTP();
	 //$mail->Host='mail.yonyou.com';
	 $mail->Host = "smtp.163.com";   // SMTP 服务器 
	 //$mail->SMTPAuth = true;              // 打开SMTP 认证 
	 $mail->SMTPAuth = false;
	 $mail->Username ='spring_51888';
	 $mail->Password = 'zxc&zxc5201314';
	 $mail->CharSet='utf-8';
	 //$mail->Username = "upservice";  // 用户名
	 //$mail->Password = "yonyou2014%";          // 密码 
	*/
	
		$mail = new PHPMailer();   
		$mail->IsSMTP();                  // send via SMTP   
		/*
		$mail->Host = "mail.yonyou.com";   // SMTP servers   
		$mail->SMTPAuth = true;           // turn on SMTP authentication   
		$mail->Username = "zhouxchc";     // SMTP username  注意：普通邮件认证不需要加 @域名   
		//$mail->Password = ""; // SMTP password   
		$mail->From = "zhouxchc@yonyou.com";      // 发件人邮箱   
		$mail->FromName =  "优普企业空间";  // 发件人*/
		$mail->Host = $account['server'];   // SMTP servers   
		$mail->SMTPAuth = true;           // turn on SMTP authentication   
		$mail->Username = $account['auth_username'];     // SMTP username  注意：普通邮件认证不需要加 @域名   
		$mail->Password = $account['auth_password']; // SMTP password   
		$mail->From = $account['from'];      // 发件人邮箱   
		$mail->FromName =  "优普企业空间";  // 发件人		 
		$mail->CharSet='utf-8'; 
	 $body = '<p><body style="margin: 10px;"></p>';
	 $body .= '<div style="width: 640px; font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height:30px; ">';
	 //$body .= '<p>'.$nickname.'，您好。</p>';
	 $body .= '<p><strong><font color="red">'.$data['company'].'</font>申请企业空间试用</strong></p>';
	 $body .= '<p>姓&nbsp;&nbsp;名：'.$data['username'].'</p>';
	 $body .= '<p>Email地址：'.$data['useremail'].'</p>'; 
	 $body .= '<p>联系电话：'.$data['userphone'].'</p>';
	 $body .= '<p>公司名称：'.$data['company'].'</p>';
	 $body .= '<p>公司网址：'.$data['weburl'].'</p>';
	 $body .= '<p>公司规模：'.$data['company_size'].'</p>';
	 $body .= '<p>备&nbsp;&nbsp;注：'.$data['remarks'].'</p>';
	 $body .= '</div></body>';
	 $mail->SetFrom($mail->From, '优普企业空间');
	 $mail->AddAddress($address, $nickname);
	
	 $subject = "试用申请";
	 $mail->Subject =$subject;
	 $mail->MsgHTML($body);
	 if(!$mail->Send()) {
		// echo "Mailer Error: " . $mail->ErrorInfo;
		return false;
	  
	 }else {
		 //echo "Message sent!";
		 return true;
	 }
}
if($_POST['act']=='send_mail'){
	$data['username'] = $_POST['username'];
	$data['useremail'] = $_POST['useremail'];
	$data['userphone'] = $_POST['userphone'];
	$data['company'] = $_POST['company'];
	$data['weburl'] = $_POST['weburl'];
	$data['company_size'] = $_POST['company_size'];
	$data['remarks'] = $_POST['remarks'];
	if($data['username']=='' || $data['useremail']=='' || $data['userphone']=='' ||$data['company']==''){	 
	   $msg = "申请资料填写不全！";
		echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">';	   
	   echo "<script  language='javascript' type='text/javascript'>alert('".$msg."');</script>";
	   exit;
	
	}
	$mailConfig = $systemConfig['email'];
	$return = mailto('夏同洋', 'xiaty@yonyou.com', 1, '123',$data,$mailConfig);
	if($return){
		 $msg_code =1; 
	 	 $msg = "我们的工作人员会尽快与您联系，请保持电话畅通，谢谢！";
	}else{
	     $msg_code =2;
		 $msg = "申请提交失败，请稍后再试！";
	}
	echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">';	   
    echo "<script  language='javascript' type='text/javascript'>location.href='?return=".$msg_code."';</script>";
    exit;	
	$output='
	<div class="w1000 loginCont">
	<a href="/" class="login_back_index"><<返回首页</a>
    <p class="tishi_tit">申请试用</p>
    <p class="login_sy_cont">'.$msg.'</p>
	</div><div class="footer">京ICP备05007539号-10  版权所有：用友超客网络科技有限公司  2013-2014</div>
';
	echo $output;
	unset($_POST);
	exit;
	
}
?>
<div class="w1000 loginCont"><!--autocomplete="off"-->
<form  method='POST' id="sendForm" onSubmit="return check_submit();" >
<input type="hidden"  name="act" value="send_mail">
	<a href="/" class="login_back_index"><<返回首页</a>
    <p class="tishi_tit">申请试用</p>
    <dl class="login_sy_shury">
		<dt>请确保您的公司名称、邮箱地址和联系电话正确，我们将在核实信息后为您开通企业空间。</dt>
		<dd class="clearfix">
			<div class="fl zw01">
				<p>姓名：</p>
				<p><input type="text" name="username" id="username" class="zinput"></p>
			</div>
			<div class="fl zw01">
				<p>邮件地址：</p>
				<p><input type="text" name="useremail" id="useremail" class="zinput"></p>
			</div>
			<div class="fl zw01">
				<p>联系电话：</p>
				<p><input type="text" name="userphone" id="userphone" class="zinput"></p>
			</div>
		</dd>
		<dd class="clearfix">
			<div class="fl zw01">
				<p>公司名称：</p>
				<p><input type="text" name="company" id="company"  class="zinput"></p>
			</div>
			<div class="fl zw01">
				<p>公司网址：</p>
				<p><input type="text" name="weburl" id="weburl"  class="zinput"></p>
			</div>
			<div class="fl zw01">
				<p>公司规模：</p>
				<p><select class="zselect" name="company_size" id="company_size"  style="width:192px;">
				<option value="50人以下" selected="selected">50人以下</option>
				<option value="51-100人">51-100人</option>
				<option value="101-300人">101-300人</option>
				<option value="301-500人">301-500人</option>
				<option value="501-1000人">501-1000人</option>
				<option value="1001-3000人">1001-3000人</option>
				<option value="3000人以上">3000人以上</option>
				</select></p>
			</div>
		</dd>
		<dd class="zsy_textarea"><p>备注：</p><p><textarea cols="60" rows="2" id="remarks"  name="remarks"  class="zinput"></textarea>
		</p></dd>
	</dl>
		<dd><input type="submit" value="申请试用" onClick="return check_submit();" class="zbtn zbtn_blue"></dd>
	</dl>
    </form>
</div>


<!-- footer引用模板 -->
<script>
window.onload = function()
{
	document.getElementById('remarks').onkeydown = function()
	{   
		if(this.value.length >= 200){
		  event.returnValue = false;
		}  
	}
}
</script>  
<script language="javascript" src="jquery-1.6.4.min.js" type="text/javascript"></script>
<script language="javascript" src="jquery.form.js"  type="text/javascript"></script>
<script language="javascript">
function check_submit(){
 
	var username = $('#username');
	var msg = '';
	if(username.val()==''){
		msg ='请填写姓名';
		alert(msg);
		username.focus();
		return false;
	}
	var useremail = $('#useremail');
	var email = useremail.val();
	if(email==''){
		msg ='请填写邮箱地址';
		alert(msg);
		useremail.focus();
		return false;
	}else{
		var reg=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		if(!reg.test(email)){
			msg ='邮箱地址不合法';
			alert(msg);
			useremail.focus();
			return false;
		}
	}
	var userphone = $('#userphone');
	var phone = userphone.val();
	if(phone==''){
		msg ='请填写您的联系电话';
		alert(msg);
		userphone.focus();
		return false;
		
	}else{
		var reg1 = /^1\d{10}$/;
		//var reg1 = /^13\d{9}$/;
		//var reg2 = /^15[8,9]\d{8}$/;
		var reg3 = /^0[\d]{2,3}[-|－][\d]{7,8}$/;
		var reg4 = /^0[\d]{2,3}[\d]{7,8}$/;//座机不填写-也可以
		//－
	 	if(!reg1.test(phone)   && !reg3.test(phone)  && !reg4.test(phone)){
			msg ='联系电话填写错误';
			alert(msg);
			userphone.focus();
			return false;
			
	 	}		
	}	
	var company = $('#company');
	if(company.val()==''){
		msg ='请填写公司名称';
		alert(msg);
		company.focus();
		return false;
		
	}
	var weburl = $('#weburl');
	var url = weburl.val();
	if(url==''){
		msg ='请填写公司网址';
		alert(msg);
		weburl.focus();
		return false;
		
	}else{
		 var reg1= /http:\/\/[A-Za-z0-9\.-]{3,}\.[A-Za-z]{2,3}/;
		 var reg2= /[A-Za-z0-9\.-]{3,}\.[A-Za-z]{2,3}/;
		 if(!reg1.test(url) && !reg2.test(url)){
			msg ='公司网址填写错误';
			alert(msg);
			weburl.focus();
			return false;
		 }
	}		
	
	var remarks = $('#remarks');
	if(remarks.val().length>200){
		msg ='备注不能超过200个字符';
		alert(msg);
		remarks.focus();
		return false;
		
	}
}
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?874901ae458af173f5f1e63050aae6bc";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
</script>
<div class="footer">京ICP备05007539号-10  版权所有：用友超客网络科技有限公司  2013-2014</div>
</body>
</html>
