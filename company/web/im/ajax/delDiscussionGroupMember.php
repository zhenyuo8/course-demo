<?php
use src\lib\classes\RecentlyRedis;
function action () {
	global $im_uid;
	global $qz_id;
	
	$groupId = $_REQUEST['groupId'];
	if (! is_numeric($groupId) || $groupId <= 0) {
		throw new \Exception('参数错误', - 1);
	}
	// 讨论组不存在，
	if (!checkDgroupExist($groupId)) {
		exitJson(array('errcode' => '-201', 'errstr' => '讨论组不存在'));
	}
	$memberId = $_REQUEST['memberId'];
	if (! is_numeric($memberId) || $memberId <= 0) {
		throw new \Exception('参数错误', - 1);
	}
	
	$row = \YClient\Text::inst('EsnIm')->setClass('DGroup')->getDiscussionGroupInfo($groupId);
	
	// 只有创建者可以随意删除人。
	if ($memberId != $im_uid) {
		if ($row['creator_id'] != $im_uid) {
			throw new \Exception('您不是创建者，不能删除该讨论组成员。');
		}
	}
	// 当创建者退出讨论组，讨论组解散
	if ($row['creator_id'] == $im_uid) {
		if ($im_uid == $memberId) {
			$res = \YClient\Text::inst('EsnIm')->setClass('DGroup')->delDgroup($groupId);
		}	
	}
	$cond = array(
			'discussion_group' => $groupId,
			'member_id' => $memberId,
			'qz_id' => $qz_id
	);
	//删除讨论组成员
	\YClient\Text::inst('EsnIm')->setClass('DGroup')->delUData($cond);
	
    //更改讨论组主题
    YClient\Text::inst('EsnIm')->setClass('DGroup')->createDiscussionGroupSubject($row);
	//删除最近联系人
	\YClient\Text::inst('EsnIm')->setClass('Recently')->delRecentlyMember($qz_id, $memberId, $groupId, 2);
	
	//尝试删除讨论组 如果讨论组没有成员删除成功
	\YClient\Text::inst('EsnIm')->setClass('DGroup')->delDataIfNoMember($groupId);
}


$e = null;
try {
	$data = action();
} catch (\Exception $e) {
}

outputRet($data, $e);

?>


