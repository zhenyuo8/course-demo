<?php
if(empty($IS_SPACE_IM)) {
	exit('Access Error');
}
$st		=	isset($_REQUEST['st'])?intval($_REQUEST['st']):exitErr();
$data = array();
if($st > 2){
	$fids = \YClient\Text::inst('EsnIm')->setClass('ImDo')->checkCreatDo($im_uid);
	$fidarr = explode(',',$fids);
	if(in_array($st,$fidarr)){
		$newarr = array();
		foreach($fidarr as $v){
			if($st != $v){
				$newarr[] = $v;
			}
		}
		$newstr = implode(',',$newarr);
		$data['fids'] = $newstr;
	}else{
		exitErr();
	}
}else{
	$data['status'] = $st;
	if (!$st) $data['fids'] = "";
}

$isdo = \YClient\Text::inst('EsnIm')->setClass('ImDo')->updateData($data, array('uid' => $im_uid));
if(!$isdo){
	exitErr();
}
else exitJson(array());