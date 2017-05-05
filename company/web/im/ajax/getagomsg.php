<?php
if (empty($IS_SPACE_IM)) {
	exit('Access Error');
}

$start = intval($_REQUEST["start"]);
$num = intval($_REQUEST["num"]);

$postFid = $_REQUEST['fid'];
$explodeFid = explode('_', $postFid);

$fid = short_check($postFid);

$ftype = is_numeric($fid) ? 0 : 1;
if ($ftype) {
	$ftypearr = explode('_', $fid);
	$fid = $ftypearr[1];
	switch ($ftypearr[0]) {
		case 'g':
			$ftype = 1;
			break;
		case 'tg':
			$ftype = 2;
			break;
		default:
			exitErr();
			break;
	}
}

// 讨论组不存在
if ($ftype == 2) {
	if (!checkDgroupExist($fid)) {
		exitErr('-201');
	}
}
$row = \YClient\Text::inst('EsnIm')->setClass('Msg')->getAgoMsg($config, $im_uid, $fid, $ftype, $start, - $num);

if ($row) {
	foreach ($row as &$msg) {
		if ($msg['mtype'] == 100) {
			$msg['msg'] = json_decode($msg['msg']);
			if (empty($msg['msg']->group_logo)) {
				$msg['msg']->group_logo = $config['base']['staticurl'] . 'images/defaultGroup.gif';
			} else {
				$msg['msg']->group_logo = $config['base']['staticurl']. $msg['msg']->group_logo;
			}
		} elseif ($_REQUEST["isWeb"] == '') {
			$msg['msg'] = preg_replace('/<br ?\/?>/i', "\n", $msg['msg']);
		}
		
		if ($msg['mtype'] == 4) {
			$obj = json_decode($msg['msg']);
			$obj->filepath = \src\lib\Common::getUrl('/file/view/index/fid/'. $obj->fid, $obj->qz_id);
			$msg['msg'] = json_encode($obj);
		}

	}
}

if ($row) {
	exitJson($row);
} else {
	exitErr();
}