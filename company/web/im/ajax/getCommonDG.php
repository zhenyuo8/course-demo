<?php
/**
 * 取得常用讨论组
 */
require_once dirname(__DIR__) . '/function/Recently.php';

list ($objList, $uidList, $gidList) = \YClient\Text::inst('EsnIm')->setClass('Recently')->getRecentlyObjList($qz_id, $im_uid);
list ($groupInfoList, $groupUIdList) = \YClient\Text::inst('EsnIm')->setClass("DGroup")->getGroupInfoList($gidList);
if (empty($uidList)) $uidList = array();
if (empty($groupUIdList)) $groupUIdList = array();
$userList = \YClient\Text::inst('EsnIm')->setClass('DGroup')->getUserInfoList($uidList, $groupUIdList);

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
		$group = $groupInfoList[$row['objid']];
		
		$retrow['name'] = $group['name'];
		
		foreach ($group['memberIdList'] as $uid) {
			$user = $userList[$uid];
			if (! empty($user['avatar'])) {
				$retrow['avatar'][] = User::getAvatarUrl($user['avatar']);;
			}
		}
		
		$retrow['online'] = false;
		
		$ret[] = $retrow;
	}
}

outputRet($ret);

?>


