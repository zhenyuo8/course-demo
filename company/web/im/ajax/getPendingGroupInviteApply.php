<?php
if(empty($IS_SPACE_IM)) {
	exit('Access Error');
}


$qzId = $_REQUEST['qzId'];
$groupId = json_decode($_REQUEST['groupId'], true);
$memberId = $_REQUEST['memberId'];

$rs = YClient\Text::inst('EsnBaseOuter')->setClass('Group')->getInvitePending($qzId, $groupId, $memberId);
	
exitJson($rs);
?>