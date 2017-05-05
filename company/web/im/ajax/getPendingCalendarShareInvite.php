<?php
if(empty($IS_SPACE_IM)) {
	exit('Access Error');
}

$id = json_decode($_REQUEST['id'], true);
$rs = YClient\Text::inst('EsnCalendar')->setClass('Calendar')->getShareInvitePending($id);
	
exitJson($rs);
?>