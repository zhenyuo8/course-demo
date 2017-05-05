<?php
if (empty($IS_SPACE_IM)) {
	exit('Access Error');
}

$memberId = $_REQUEST['memberId'];
if (!is_numeric($memberId) || $memberId <= 0) exitErr(-5);
    
$memberInfo = \YClient\Text::inst("EsnBaseOuter")->setClass("Member")->getOneMemberAvatar($memberId);
if (empty($memberInfo)) exitErr(-99);
    	
$memberInfo['avatar'] = $memberInfo['avatar'];
exitJson($memberInfo);
