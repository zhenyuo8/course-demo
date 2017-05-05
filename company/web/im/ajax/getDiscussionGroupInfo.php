<?php

function action () {
	$groupId = $_REQUEST['groupId'];
	$needMemberList = $_REQUEST['needMemberList'];
	if (! empty($groupId) && (! is_numeric($groupId) || $groupId <= 0)) {
		throw new Exception('参数错误', - 1);
	}
	// 讨论组不存在，不许发信息。
	if (!checkDgroupExist($groupId)) {
		exitJson(array('errcode' => '-201', 'errstr' => '讨论组不存在'));
	}
	// 验证用户是否在讨论组里
	global $im_uid;
	$res = \YClient\Text::inst('EsnIm')->setClass('DGroup')->validateDiscussionGroupMember($groupId, $im_uid);
	if(empty($res)){
		exitJson(array('errcode' => '-202', 'errstr' => '非法请求'));
	}
	global $config;
	$ret = array();
	$ret = \YClient\Text::inst('EsnIm')->setClass('DGroup')->getDiscussionGroupInfo($groupId);
	if ($needMemberList == 1) {
		$ret['memberList'] = array();
		$temp = \YClient\Text::inst('EsnIm')->setClass('DGroup')->getDiscussionGroupMember($config, $groupId);
		foreach ($temp as $v) $ret['memberList'][] = $v;
	}
	
	return $ret;
}

$e = null;
try {
	$data = action();
} catch (Exception $e) {
}

outputRet($data, $e);

?>


