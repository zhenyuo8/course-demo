<?php
if(empty($IS_SPACE_IM)) {
	exit('Access Error');
}
$searchkey	=	short_check($_REQUEST['key']);
if($searchkey){
	//搜索好友
	$users = \YClient\Text::inst('EsnIm')->setClass('User')->getBigSearchFriend($qz_id,$searchkey);
	if($users){
		$midList = array();

		foreach ($users as $value) {
			$midList[] = $value['id'];
		}

		$inQzMidList = \YClient\Text::inst('EsnBaseOuter')->setClass('Member')->isMemberIdsInQz($midList, $qz_id);
		foreach ($users as &$value) {
			if (in_array($value['id'], $inQzMidList)) $value['inQz'] = 1;
			else $value['inQz'] = 0;
		}
		exitJson($users);
		exit;
	}
}
exitErr();