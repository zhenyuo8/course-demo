<?php

function action () {
	global $im_uid;
	
	$keywords = $_REQUEST['keywords'];
	$type = $_REQUEST['type'];
	return getGroup($im_uid, $keywords, $type);
}

function getGroup ($userId, $keywords, $type = '') {
	global $dbo;
	global $config;
	global $qz_id;
	global $im_uid;
	
	$sgArr = array();
	$ret = array();
	
	$sqlKeywords = str_replace("'", "''", $keywords);
	
	if ($type == '' || $type == 1) {
		$sgArr = \YClient\Text::inst('EsnIm')->setClass('DGroup')->getSpaceGroupList($config, $im_uid, $qz_id, $keywords);
		$ret[0] = array(
			'type' => 1,
			'type_name' => '群组',
			'group_arr' => $sgArr
		);
	}
	
	// 讨论组
	if ($type == '' || $type == 2) {
		$dgArr = \YClient\Text::inst('EsnIm')->setClass('DGroup')->getDGroupList($config, $qz_id, $im_uid, 'avatar', $sqlKeywords, true);
		$ret[1] = array(
			'type' => 2,
			'type_name' => '讨论组',
			'group_arr' => $dgArr
		);
	}
	
	// require_once dirname(__DIR__) . '/class/User.php';
	// $um = new User();
	
	if ($type == '' || 4 == $type) {
		$deptUserList = \YClient\Text::inst('EsnIm')->setClass('User')->getUserListByDptId($config, $qz_id, $_SESSION['user']['deptid'], $keywords);
		$ret[2] = array(
			'type' => 4,
			'type_name' => '部门同事',
			'group_arr' => $deptUserList
		);
	}
	
	// 关注分组 这个不用 先注释掉
	/* if ($type == '' || $type == 3) {
		$fgArr = $um->getFollowGroupList($userId, $sqlKeywords);
		$ret[3] = array(
			'type' => 3,
			'type_name' => '关注分组',
			'group_arr' => $fgArr
		);
	} */
	return $ret;
}

$e = null;
try {
	$data = action();
} catch (Exception $e) {
}

outputRet($data, $e);

?>


