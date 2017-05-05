<?php

function action () {
	$groupId = $_REQUEST['groupId'];
	$gidArr = !empty($groupId) ? explode(',', $groupId) : array();
	$gidArr = array_unique($gidArr);
	if (empty($gidArr) || count($gidArr) > 50) {
		throw new Exception('参数错误', - 1);
	}
	
	$return = array();
	$rs = YClient\Text::inst('EsnBaseOuter')->setClass("Group")->getAttrBygid('gid,group_name,group_logo', $gidArr);
	if (!empty($rs)) {
		foreach ($rs as $v) {
			if (!$v['gid']) continue;
			$return[] = array(
				'id' => $v['gid'],
				'name' => $v['group_name'],
				'logo' => empty($v['group_logo']) ? \src\lib\Common::getConfig('base', 'staticurl') . 'images/defaultGroup.gif' : \src\lib\Common::getConfig('base', 'staticurl') . $v['group_logo'].'.thumb.jpg',
			);
		}
	}
	return $return;
}

$e = null;
try {
	$data = action();
} catch (Exception $e) {
}

outputRet($data, $e);

?>


