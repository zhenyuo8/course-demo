<?php
if (empty($IS_SPACE_IM)) {
	exit('Access Error');
}
$strat = intval($_REQUEST['position']);
$num = intval($_REQUEST['pagesize']);
$users = array();
$inQz = \YClient\Text::inst('EsnBaseOuter')->setClass('MemberMapping')->isMemberExist($im_uid, $qz_id);
if (! $inQz) {
    exitJson(array('errcode' => '-202', 'errstr' => '非法请求'));
}
switch ($_REQUEST['gid']) {
	case 'mi': // 最小列表,显示所有
		$users = \YClient\Text::inst('EsnIm')->setClass('User')->getBigMinList($im_uid, $qz_id, $strat, $num, 1);
		break;
	case 'on': // 在线成员
		$users = \YClient\Text::inst('EsnIm')->setClass('User')->getBigMinList($im_uid, $qz_id, $strat, $num, 0);
		break;
	case 'dpt': // 部门同事
		if ($strat > 0) break;
	    $users = array();
	    $dptId = \Info::deptid();
	    $resultList = \YClient\Text::inst('EsnBaseOuter')->setClass('Member')->getUserListByDptId($qz_id, $dptId, null, 0, null, true);
	    foreach ($resultList as $result) {
	    	if ($result['id'] == $im_uid) continue;
	    	$users[$result['id']] = $result;
	    }
	    break;
	default:
		$num = 500;
		$gid = im_is_gid($_REQUEST['gid']);
		if ($gid !== false) {
			if ($gid != 0) {
				$users = \YClient\Text::inst('EsnIm')->setClass('User')->getBigFollowList(array(), $im_uid, $qz_id, $gid, $strat, $num);
			} else {
				$users = \YClient\Text::inst('EsnIm')->setClass('User')->getBigNoFollowList(array(), $im_uid, $qz_id, $strat, $num);
			}
		}
		break;
}
if ($users) {
	// 返回当前在线/全部 人数
	$onLine = 0;
	$all = 0;
	$result = array();
	
	$midList = array();
	
	foreach ($users as $value) {
		$midList[] = $value['id'];
		if ($value['online'] > 0) {
			$onLine ++;
		}
		$all ++;
	}
	
	$inQzMidList = \YClient\Text::inst('EsnBaseOuter')->setClass('Member')->isMemberIdsInQz($midList, $qz_id);
	foreach ($users as $k => &$value) {
		if (in_array($value['id'], $inQzMidList)) 
                {
                   $value['inQz'] = 1; 
                }
                else {
                    $value['inQz'] = 0;
                    // 不在此空间的，直接移除
                    unset($users[$k]);
                }
	}
        
	
	$status = array(
		'online' => $onLine,
		'all' => $all
	);
	if ($all == $num || $onLine == $num) { // 显示数量不够
		if ($_REQUEST['gid'] == 'on' || is_numeric($_REQUEST['gid'])) {
			$status = \YClient\Text::inst('EsnIm')->setClass('User')->getUserStatusByGid($im_uid, $qz_id, $_REQUEST['gid']);
		}
	}
	$result['data'] = $users;
	if ($_REQUEST['gid'] != 'mi') {
		$result['status'] = $status;
	}
	exitJson($result);
} else {
	exitErr();
}
