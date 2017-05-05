<?php
function action () {
	$groupId = $_REQUEST['groupId'];
	if (empty($groupId) || !is_numeric($groupId) || $groupId <= 0) {
		throw new Exception('参数错误', - 1);
	}
	// 讨论组不存在，
	if (!checkDgroupExist($groupId, $_REQUEST['qz'])) {
		exitJson(array('errcode' => '-201', 'errstr' => '讨论组不存在'));
	}
	// 验证用户是否在讨论组里
	global $im_uid;
	$res = \YClient\Text::inst('EsnIm')->setClass('DGroup')->validateDiscussionGroupMember($groupId, $im_uid);
	if(empty($res)){
		exitJson(array('errcode' => '-202', 'errstr' => '非法请求'));
	}
	global $config;
	$ret = \YClient\Text::inst('EsnIm')->setClass('DGroup')->getDiscussionGroupMember($config, $groupId);
	$ret = array_values($ret); // php对不连续数字索引json后会变成对象
	
	return $ret;
}

$e = null;
try {
	$data = action();
} catch (Exception $e) {
}

outputRet($data, $e);

?>


