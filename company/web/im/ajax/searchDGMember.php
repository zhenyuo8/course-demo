<?php

function action () {
	$str = $_REQUEST['str'];
	$groupId = $_REQUEST['groupId'];
	global $qz_id;
	
	if (empty($groupId) || (! is_numeric($groupId) || $groupId <= 0)) {
		throw new Exception('参数错误', - 1);
	}
	
	
	$ret = \YClient\Text::inst('EsnBaseOuter')->setClass('Group')->searchGroupMembers(null, $groupId, $str, array(), array('first_letter', 'pinyin', 'short_pinyin'));
	
	return $ret;
}

$e = null;
try {
	$data = action();
} catch (Exception $e) {
}

outputRet($data, $e);

?>


