<?php
//session_start();采用memcach存储session，用src\lib\classes\SessionCache代理。
header("Content-type:text/html;charset=UTF-8");

$verifyKey = isset($_GET['VerifyKey']) ? trim($_GET['VerifyKey']) : '';//验证key
$UserID    = isset($_GET['UserID']) ? trim($_GET['UserID']) : '';//member_id
$FromApp   = isset($_GET['FromApp']) ? trim($_GET['FromApp']) : '';//来源地址URL
$t   = isset($_GET['t']) ? $_GET['t'] : '';//token
$r   = isset($_GET['r']) ? $_GET['r'] : '';//请求方法

if(empty($verifyKey) && empty($FromApp)){
	header("Location: /");exit;
}
$FromAppUrl = parse_url($FromApp);
if(isset($FromAppUrl['port']) && !empty($FromAppUrl['port']) && $FromAppUrl['port'] == '80'){
	$FromApp = str_replace(':80','',$FromApp);
}
$jquery_url = 'js/lib/jq/jquery-1.7.1.min.js';//企业空间jquery地址
$js_timeout = 5000;//设置超时时间，默认跳转到企业空间登录页面
$sso_domain = 'http://tu.yonyouup.cn';//用户中心地址
$verifyKey = urldecode($verifyKey);
$FromApp   = urldecode($FromApp);
if($r != 'redirect' && $UserID) $r = 'login';

switch($r){
	//验证T3key是否有效
	case 'check':
		if(empty($_SESSION['vendor']['token']) || $_SESSION['vendor']['token'] != $t){
			$_SESSION = array();
			header("Location: /");exit;
		}
		$user = isset($_SESSION['user']) ? $_SESSION['user'] : '';
		setcookie('from_app',urlencode($FromApp),time()+120,'/');
		setcookie('verify_key',urlencode($verifyKey),time()+120,'/');
		if(is_array($user) && !empty($user)){
			$_SESSION = array();
			$domain = $_SERVER['SERVER_NAME'];
			header("Location: $sso_domain/sso/logout?back_url=http://$domain");exit;
		}
		header("Location: /");exit;
		break;
	//自动登录跳转
	case 'redirect':
			if(empty($_SESSION['vendor']['token']) || $_SESSION['vendor']['token'] != $t){
				$_SESSION = array();
				header("Location: /");exit;
			}
			$user = isset($_SESSION['user']) ? $_SESSION['user'] : '';
			if(is_array($user) && !empty($user)){
				if($user['id'] == $UserID){
					header("Location: /");exit;
				}
			}
			$timeID = time();
			$params = base64_encode($UserID.'|'.$FromApp);
			$token = md5('killer'.$params.$timeID);
			header("Location: /account/login/index?_timeID=$timeID&_token=$token&_r=$params");exit;
		break;
	//登录验证T3key是否有效
	case 'login':
		$vkey = urlencode($verifyKey);
		$from = urlencode($FromApp);
		$token =  md5(uniqid(rand(), TRUE));
		$_SESSION['vendor']['token'] = $token;
		echo '正在为您跳转，请稍等...';
		$code = <<<code
		<script language="javascript" src="{$jquery_url}"></script>
		<script language="javascript">
			function ssoValidCallback(json){
				if(json.ssoIsValidKey==1){
					location.href='connect.php?r=redirect&t={$token}&UserID={$UserID}&VerifyKey={$vkey}&FromApp={$from}';
				}else{
					location.href='/';
				}
			}
			function counter(){
				location.href="/";
			}
		</script>
		<script>
			setTimeout("counter()",{$js_timeout});
			$.getJSON('{$FromApp}&jsoncallback=?', {'FromApp':'PAAS','VerifyKey':'{$verifyKey}','format':'jsoncb'});
		</script>
code;
		echo $code;
		break;
	default:
		//验证访问来源是否有效
		echo '正在为您跳转到企业空间，请稍等...';
		$vkey = urlencode($verifyKey);
		$from = urlencode($FromApp);
		$token =  md5(uniqid(rand(), TRUE));
		$_SESSION['vendor']['token'] = $token;
		$code = <<<code
		<script language="javascript" src="{$jquery_url}"></script>
		<script language="javascript">
			function ssoValidCallback(json){
				if(json.ssoIsValidKey==1){
					location.href='connect.php?r=check&t={$token}&VerifyKey={$vkey}&FromApp={$from}';
				}else{
					location.href='/';
				}
			}
			function counter(){
				location.href="/";
			}
		</script>
		<script>
			setTimeout("counter()",{$js_timeout});
			$.getJSON('{$FromApp}&jsoncallback=?', {'FromApp':'PAAS','VerifyKey':'{$verifyKey}','format':'jsoncb'});
		</script>
code;
	    echo $code;
}