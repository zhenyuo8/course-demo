<?php

const OBJ_TYPE_USER = 0;
const OBJ_TYPE_DISCUSSION_GROUP = 2;
const OBJ_TYPE_SPACE_GROUP = 1;

require_once dirname(__DIR__) . '/class/User.php';


function getAvatar ($user) {
	return User::getAvatarUrl($user['avatar']);
}

function getSpaceGroupLogo ($group) {
	$logo = $group['group_logo'];
	if (empty($logo)) {
		return \src\lib\Common::getConfig('base', 'host_url') . '/images/img60-60-gr.gif';
	}
	
	return \src\lib\Common::getConfig('base', 'staticurl') . $logo;
}

function getBigRecentlyList ($dbo, $imUid) {
	global $qz_id;
	list ($objList, $uidList, $gidList, $sgidList) = \YClient\Text::inst('EsnIm')->setClass('Recently')->getRecentlyObjList($qz_id, $imUid);
	list ($groupInfoList, $groupUIdList) = \YClient\Text::inst('EsnIm')->setClass("DGroup")->getGroupInfoList($gidList);
	if (!empty($sgidList)) $spaceGroupList = \YClient\Text::inst('EsnIm')->setClass('DGroup')->getSpaceGroupInfoList($sgidList);
    if (empty($uidList)) $uidList = array();
    if (empty($groupUIdList)) $groupUIdList = array();
	$userList = \YClient\Text::inst('EsnIm')->setClass('DGroup')->getUserInfoList($uidList, $groupUIdList);
	$userNewMsgCountInfo = \YClient\Text::inst('EsnIm')->setClass('Msg')->getUserNewMsgCount($uidList, $imUid);
	if (!empty($gidList)) $DGNewMsgCountInfo = \YClient\Text::inst('EsnIm')->setClass('Msg')->getDGNewMsgCount($gidList, $imUid);
	if (!empty($sgidList)) $SGNewMsgCountInfo = \YClient\Text::inst('EsnIm')->setClass('Msg')->getSGNewMsgCount($sgidList, $imUid);
	
	$allCount = 0;
	$ret = array();
	foreach ($objList as $row) {
		$retrow = array(
			'id' => $row['objid'],
			'obj_type' => $row['ftype'],
			'msg' => $row['msg'],
			'sendtime' => $row['sendtime'],
			'isTop' => $row['isTop'],
			'atFlag' => $row['atFlag'],
		);
		
		if (OBJ_TYPE_USER == $row['ftype']) {
			$user = $userList[$row['objid']];
			if (empty($user)) continue;
			
			$newMsgCount = $userNewMsgCountInfo[$row['objid']];
			if (empty($newMsgCount)) {
				$newMsgCount = 0;
			}
			
			$retrow['newMsgCount'] = (int) ($newMsgCount);
			$retrow['name'] = $user['name'];
			$retrow['avatar'] = array(
				getAvatar($user)
			);
			$retrow['online'] = $user['online'];
		} else if (OBJ_TYPE_DISCUSSION_GROUP == $row['ftype']) {
			if (empty($groupInfoList[$row['objid']])) continue;
			$newMsgCount = $DGNewMsgCountInfo[$row['objid']];
			if (empty($newMsgCount)) {
				$newMsgCount = 0;
			}
			
			$group = $groupInfoList[$row['objid']];
			
			$retrow['newMsgCount'] = (int) ($newMsgCount);
			
			if ($newMsgCount == 0) $retrow['atFlag'] = 0;
			$retrow['name'] = $group['name'];
			
			foreach ($group['memberIdList'] as $uid) {
				$user = $userList[$uid];
				$retrow['avatar'][] = getAvatar($user);
			}
			
			$retrow['online'] = false;
		} else if (OBJ_TYPE_SPACE_GROUP == $row['ftype']) {
			if (empty($spaceGroupList[$row['objid']])) continue;
			$newMsgCount = $SGNewMsgCountInfo[$row['objid']];
			if (empty($newMsgCount)) {
				$newMsgCount = 0;
			}
			
			$group = $spaceGroupList[$row['objid']];
			
			$retrow['newMsgCount'] = (int) ($newMsgCount);
			$retrow['name'] = $group['group_name'];
			$retrow['avatar'][] = getSpaceGroupLogo($group);
			
			$retrow['online'] = false;
		}
		
		$allCount += $retrow['newMsgCount'];
		
		$ret[] = $retrow;
	}
	
	return array(
		$ret,
		$allCount
	);
}
?>
