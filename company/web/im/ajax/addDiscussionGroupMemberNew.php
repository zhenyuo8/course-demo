<?php

function action () {
	$groupId = $_REQUEST['groupId'];
	if (! empty($groupId) && (! is_numeric($groupId) || $groupId <= 0)) {
		throw new Exception('参数错误', - 1);
	}
	// 讨论组不存在，
	if (!checkDgroupExist($groupId)) {
		exitJson(array('errcode' => '-201', 'errstr' => '讨论组不存在'));
	}

	
	global $qz_id;
	$memberIdArr = explode(',', $_REQUEST['memberIds']);
	if (is_array($memberIdArr)) {
		$res = \YClient\Text::inst('EsnIm')->setClass('DGroup')->addDiscussionGroupMember($qz_id, $groupId, $memberIdArr,1, 1);
	}
    
	return $res;
}

$e = null;
try {
	$data = action();
} catch (Exception $e) {
}

outputRet($data, $e);

?>


