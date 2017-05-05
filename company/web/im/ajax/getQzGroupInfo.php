<?php

function action () {
	$groupId = $_REQUEST['groupId'];
	$needMemberList = $_REQUEST['needMemberList'];
	if (! empty($groupId) && (! is_numeric($groupId) || $groupId <= 0)) {
		throw new Exception('参数错误', - 1);
	}
	
	global $config;
	$ret = array();
	$ret = \YClient\Text::inst('EsnIm')->setClass('DGroup')->getQzGroupInfo($config, $groupId);
	if ($needMemberList == 1) $ret['memberList'] = \YClient\Text::inst('EsnIm')->setClass('DGroup')->getQzGroupMember($config, $groupId);
	
	return $ret;
}

$e = null;
try {
	$data = action();
} catch (Exception $e) {
}

outputRet($data, $e);

?>


