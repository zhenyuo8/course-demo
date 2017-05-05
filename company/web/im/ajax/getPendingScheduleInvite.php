<?php
if(empty($IS_SPACE_IM)) {
	exit('Access Error');
}

$memberId = $_REQUEST['memberId'];
$sidList = json_decode($_REQUEST['sidList'], true);
$rs = YClient\Text::inst('EsnSchedule')->setClass('Schedule')->getInvitePending($memberId, $sidList);
	
exitJson($rs);
?>