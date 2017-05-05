<?php
if(empty($IS_SPACE_IM)) {
	exit('Access Error');
}
$fids = \YClient\Text::inst('EsnIm')->setClass('ImDo')->checkCreatDo($im_uid, true);
$fidarr	= ($fids['status'] && $fids['fids'])?explode(',',$fids['fids']):exitErr();
$arr['status']	=	$fids['status'];
$arr['fids']	=	$fidarr;
$arr['lastfid']	=	$fids['lastfid'];
exitJson($arr);