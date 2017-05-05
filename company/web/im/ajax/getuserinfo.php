<?php
if(empty($IS_SPACE_IM)) {
	exit('Access Error');
}
$fid = intval($_REQUEST["fid"]);
$row = \YClient\Text::inst('EsnIm')->setClass('User')->getUser($fid);
$inQzSelf = \YClient\Text::inst('EsnBaseOuter')->setClass('MemberMapping')->isMemberExist($im_uid, $qz_id);
$inQzFind = \YClient\Text::inst('EsnBaseOuter')->setClass('MemberMapping')->isMemberExist($fid, $qz_id);

if (!($inQzSelf && $inQzFind)) {
    exitErr();
}
if($row){
	$row['inQz'] = count(\YClient\Text::inst('EsnBaseOuter')->setClass('Member')->isMemberIdsInQz(array($fid), $qz_id));
	exitJson($row);
}else{
	exitErr();
}