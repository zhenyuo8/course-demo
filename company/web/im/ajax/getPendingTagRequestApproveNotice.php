<?php
if(empty($IS_SPACE_IM)) {
	exit('Access Error');
}

$memberId = $_REQUEST['memberId'];
$idList = json_decode($_REQUEST['idList'], true);
$rs = \YClient\Text::inst('EsnBaseOuter')->setClass('MemberTagAbility')->getPending($memberId, $idList);
$rs = $rs['data'];
exitJson($rs);
?>