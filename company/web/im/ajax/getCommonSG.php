<?php
/**
 * 取得常用群组（当前空间下的群组）
 */
require_once dirname(__DIR__) . '/function/Recently.php';

list ($objList, $uidList, $gidList, $sgidList) = \YClient\Text::inst('EsnIm')->setClass('Recently')->getRecentlyObjList($qz_id, $im_uid);
$spaceGroupList = \YClient\Text::inst('EsnIm')->setClass('DGroup')->getSpaceGroupInfoList($sgidList);

$ret = array();
foreach ($objList as $row) {
	$retrow = array(
		'id' => $row['objid'],
		'obj_type' => $row['ftype']
	);
	
	if (OBJ_TYPE_USER == $row['ftype']) {
		// $user = $userList[$row['objid']];
		
		// $retrow['name'] = $user['name'];
		// $retrow['avatar'] = getAvatar($user);
		// $retrow['online'] = $user['online'];
		
		// $ret[] = $retrow;
	} else if (OBJ_TYPE_DISCUSSION_GROUP == $row['ftype']) {
		// $group = $groupInfoList[$row['objid']];
		
		// $retrow['name'] = $group['name'];
		
		// foreach ($group['memberIdList'] as $uid) {
		// $user = $userList[$uid];
		// if (! empty($user['avatar'])) {
		// $retrow['avatar'][] = $user['avatar'];
		// }
		// }
		
		// $retrow['online'] = false;
		
		// $ret[] = $retrow;
	} else if (OBJ_TYPE_SPACE_GROUP == $row['ftype']) {
		$newMsgCount = $SGNewMsgCountInfo[$row['objid']];
		if (empty($newMsgCount)) {
			$newMsgCount = 0;
		}
		
		$group = $spaceGroupList[$row['objid']];
		
		// $retrow['newMsgCount'] = (int) ($newMsgCount);
		$retrow['name'] = $group['group_name'];
		$retrow['avatar'] = getSpaceGroupLogo($group);
		
		$retrow['online'] = false;
		
		$ret[] = $retrow;
	}
}

outputRet($ret);

?>


