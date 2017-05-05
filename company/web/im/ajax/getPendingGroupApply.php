<?php
if(empty($IS_SPACE_IM)) {
	exit('Access Error');
}

$gidMemberIdList = json_decode($_REQUEST['gidMemberIdList'], true);
$rs = YClient\Text::inst('EsnBaseOuter')->setClass('Group')->getApplyPending($gidMemberIdList);
	
exitJson($rs);
?>