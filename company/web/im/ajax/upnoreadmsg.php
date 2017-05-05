<?php
if (empty($IS_SPACE_IM)) {
	exit('Access Error');
}
$postIds = $_REQUEST['ids'];
if (!empty($postIds)) {
	if (!is_numeric($postIds)) {
		$ids = explode(',', $_REQUEST['ids']);
		$ids = array_unique($ids);
	} else {
		$ids = array(
			$postIds
		);
	}
}

$fid = intval($_REQUEST['fid']);
$ftype = intval($_REQUEST['ftype']);
if (!empty($ids)) {
	$isdo = \YClient\Text::inst('EsnIm')->setClass('Msg')->setRead($im_uid, $ids);
	if ($isdo) {
		$max = 0;
		foreach ($ids as $v) {
			if ($v > $max) {
				$max = $v;
			}
		}
		$upstr = 'newnum-' . count($ids);
		$cond = array('uid' => $im_uid, 'fid' => $fid, 'ftype' => 0);
		$data = array(
				"lastread" => $max,
				"newnum" => $upstr
		);
		\YClient\Text::inst('EsnIm')->setClass('ImStatus')->updateData($data, $cond);
	}
    YClient\Text::inst('EsnBaseOuter')->setClass('AppUnRead')->pushUnreads($im_uid);
	exitJson(array("result" => "1"));
} else if (!empty($fid)) {
	$ret = \YClient\Text::inst('EsnIm')->setClass('Msg')->getWinNewMsgIdList($im_uid, $fid, $ftype);
	$idList = array();
	foreach ($ret as $row) {
		$idList[] = $row['id'];
	}
	if (!empty($idList)) {
		\YClient\Text::inst('EsnIm')->setClass('Msg')->setRead($im_uid, $idList);
		
		// 删除@标记
		\YClient\Text::inst('EsnBaseOuter')->setClass('ModelSave')->setFlag(0, 10, $im_uid, 'IMAT:G_'. $fid, 0); // 10 OBJECT_TYPE_MEMBER
	}
    YClient\Text::inst('EsnBaseOuter')->setClass('AppUnRead')->pushUnreads($im_uid);
	exitJson(array("result" => "1"));
}else {
	exitErr();
}