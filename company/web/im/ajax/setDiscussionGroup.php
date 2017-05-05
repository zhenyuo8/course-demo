<?php

function action () {
	$groupId = $_REQUEST['groupId'];
	if (! empty($groupId) && (! is_numeric($groupId) || $groupId <= 0)) {
		throw new Exception('参数错误', - 1);
	}
	
	$groupName = $_REQUEST['groupName'];
	
	global $qz_id;
	global $im_uid;
	$row = array(
		'qz_id' => $qz_id,
		'name' => empty($groupName) ? '讨论组' : $groupName,
		'creator_id' => $im_uid,
		'status' => 1,
		'default_name' => empty($groupName) ? 1 : 0
	);
	global $dbo;
	if (empty($groupId)) {
		$strTime = date('Y-m-d H:i:s');
		$row['create_time'] = $strTime;
		$groupId = \YClient\Text::inst('EsnIm')->setClass('DGroup')->addData($row);
		$memberIdArr = explode(',', $_REQUEST['memberIds']);
		$memberIdArr[] = $im_uid;
		array_unique( $memberIdArr );
		$row['id'] = $groupId;
		if (is_array($memberIdArr)) {
			$successMember = \YClient\Text::inst('EsnIm')->setClass('DGroup')->addDiscussionGroupMember($qz_id, $groupId, $memberIdArr, false);
            //更改讨论组主题
            $groupName = YClient\Text::inst('EsnIm')->setClass('DGroup')->createDiscussionGroupSubject($row);
            $row['name'] = $groupName;
              
        }
	} else {
		// 讨论组不存在，不许发信息。
		if (!checkDgroupExist($groupId)) {
			exitJson(array('errcode' => '-201', 'errstr' => '讨论组不存在'));
		}
		$row['id'] = $groupId;
		\YClient\Text::inst('EsnIm')->setClass('DGroup')->updateData($row, array('id' => $groupId));
	}
	
	return $row;
}

$e = null;
try {
	$data = action();
} catch (Exception $e) {
}

outputRet($data, $e);

?>


