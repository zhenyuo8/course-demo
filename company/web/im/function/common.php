<?php
if (empty($IS_SPACE_IM)) {
	exit('Access Error');
}
require_once dirname(__DIR__) . '/class/User.php';

// 设置session
function set_session ($k, $v) {
	global $session_prefix;
	$_SESSION['user'][$session_prefix][$k] = $v;
}

// 获取session
function get_session ($k) {
	global $session_prefix;
	if (isset($_SESSION['user'][$session_prefix][$k]))
		return $_SESSION['user'][$session_prefix][$k];
	return null;
}

// 清除数组里下标为数字的值
function clear_array_numkey ($array) {
	if (! is_array($array)) {
		return false;
	}
	$newarray = array();
	foreach ($array as $key => $value) {
		if (! is_numeric($key)) {
			$newarray[$key] = $value;
		}
	}
	return $newarray;
}

// 数组重新排列键名
function array_delkey ($array) {
	if (! is_array($array)) {
		return false;
	}
	$newarray = array();
	foreach ($array as $value) {
		$newarray[] = $value;
	}
	return $newarray;
}

// 清除数组里值为空的值
function array_nullclear ($array) {
	$newarray = array();
	foreach ($array as $k => $v) {
		if ($v) {
			$newarray[$k] = $v;
		}
	}
	return $newarray;
}

// 随机生成code
function mk_code ($num = 6) {
	$strSeed = "123456789abcdefghijklmnprstuvwxyz";
	$bgnIdx = 0;
	$endIdx = strlen($strSeed) - 1;
	$code = "";
	for ($i = 0; $i < $num; $i ++) {
		$curPos = rand($bgnIdx, $endIdx);
		$code .= substr($strSeed, $curPos, 1);
	}
	return $code;
}

// 加密
function mk_md5 ($s_code, $u_code) {
	global $checkCode;
	return md5($s_code . $u_code . $checkCode);
}

function im_is_gid ($num) {
	if (is_numeric($num)) {
		if (is_string($num)) {
			if (strpos($num, '-') === false && strpos($num, '.') === false)
				return intval($num);
		} else {
			if ($num >= 0)
				return $num;
		}
	}
	return false;
}

// Json 处理
function chat_json_encode ($array) {
	exitJson($array);
}

function chat_json_decode ($value) {
	return json_decode($value);
}

function im_wlog ($logs) {
	global $webRoot;
	$time = date('Ymd');
	$toppath = $webRoot . '/logs/IMlog' . $time . '.htm';
	$Ts = fopen($toppath, "a+");
	fputs($Ts, $logs . "\r\n");
	fclose($Ts);
}

// 输出404页面
function echo404 () {
	$nopage = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">';
	$nopage .= '<html><head><title>页面不存在</title></head><body style="background:#F0F0F0;">';
	$nopage .= '<div style="width:250px;height:80px; border:1px solid #BBBBBB; margin:100px auto; text-align:center;padding:55px 0 0 0; background:#FFFFFF;">出错了，您访问的页面不存在...</div>';
	$nopage .= '</body></html>';
	echo $nopage;
	exit();
}

	$sql = "SELECT m.`id`,m.`user_type`,m.`name`,m.`avatar` FROM `" . TB . "member` m
			INNER JOIN " . TB . "member_mapping AS mp ON m.id = mp.member_id AND mp.status='0' AND qz_id=$qzId
			LEFT JOIN " . TB . "discussion_group_member gm ON m.id = gm.member_id 
			WHERE discussion_group = $groupdId ";
function outputRet ($data, $e = null) {
	$errcode = 0;
	$errstr = '成功';
	if (null != $e) {
		$errcode = -1;
		$errstr = $e->getMessage();
		$data = null;
	}
	
	$ret = array(
		'errcode' => $errcode,
		'errstr' => $errstr,
		'data' => $data
	);
	
	header('Content-type: application/javascript; charset=utf-8');
	exitJson(json_encode($ret, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), false);
}

function login2PushServer($uid){
	//建立连接
	global $imSocketIp , $imSocketPort;
	
	$fp = fsockopen( $imSocketIp , $imSocketPort );
	fwrite( $fp , '<policy-file-request />' );
	$ret = fread($fp, 300);
	//登录
	$md5Src = $uid . 'fepdlw' . '9hsJlPlbKdKeb64aa5Q1o3f1C2m84dW8n8I4C5t4qageLacet00f88o8TerbTbQe';//
	$md = md5( $md5Src );
	$st = substr( $md, 6 , 8 );
	
	$contentFmt = "{\"u\":\"%d\",\"s\":\"fepdlw\",\"st\":\"%s\",\"to\":\"1\"}";
	$content = sprintf( $contentFmt , $uid , $st );
	$mask = 'abcd';
	for( $i = 0; $i < strlen($content) ; ++ $i ){
		$content[$i] = $content[$i] ^ $mask[ $i % 4 ];
	}
	$loginData = "\x81a$mask$content";
	$ret = fwrite( $fp , $loginData );
	
	return $fp;
}

function send2PushServer($uid , $fid , $msgId){
	$fp = login2PushServer($uid);
	if( ! is_resource( $fp ) ){
		return;
	}
	
	$md5Src = $fid . $msgId . '9hsJlPlbKdKeb64aa5Q1o3f1C2m84dW8n8I4C5t4qageLacet00f88o8TerbTbQe';//
	$md = md5( $md5Src );
	$st = substr( $md, 6 , 8 );
	
	$contentFmt = "{\"u\":\"%d\",\"f\":%d,\"id\":%d,\"vc\":\"%s\"}";
	$content = sprintf( $contentFmt , $uid , $fid , $msgId , $st );
	$mask = 'abcd';
	for( $i = 0; $i < strlen($content) ; ++ $i ){
		$content[$i] = $content[$i] ^ $mask[ $i % 4 ];
	}
	$data = "\x81a$mask$content";
	$ret = fwrite( $fp , $data );
}