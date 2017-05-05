<?php
if (empty($IS_SPACE_IM)) {
	exit('Access Error');
}
$id = intval($_REQUEST["id"]);
$doNotRead = $_REQUEST["doNotRead"];
$rows = \YClient\Text::inst('EsnIm')->setClass('Msg')->getMsg($im_uid, $id);
if ($rows) {
	
	ob_flush();
	flush();
	if (!in_array($rows['mtype'], array(0, 4, 5, 100, 255))) {
		if ($rows['mtype'] == 2) {
			// 语音消息特殊格式
			list ($rows['msg'], $rows['duration']) = explode(',', $rows['msg']);
			if (empty($rows['duration'])) $rows['duration'] = 0;
		}
		$rows['msg'] = \src\lib\Common::getConfig('base', 'staticurl') . $rows['msg'];
	} elseif ($_REQUEST['isWeb'] == '' && ($rows['mtype'] == 4 || $rows['mtype'] == 5)) {
		$rows['msg'] = "该版本暂不支持该消息类型的显示";
		$rows['mtype'] = 0;
	} elseif ($_REQUEST['isWeb'] == '' && $rows['mtype'] == 255) {
		$jsonObj = json_decode(str_replace('&quot;', '"', $rows['msg']));
		if ($jsonObj->action == 'msg_del') {
			$rows['mtype'] = 0;
			$rows['msg'] = "{$jsonObj->data->mName} 删除了一条消息"; 
		}
	} elseif ($_REQUEST['isWeb'] == '' && $rows['mtype'] == 0 && $rows['ftype'] == 1) {
		$pregAt = '/@\d+@@.+? /i';
		// $str = "@2737@@孙宏良@ @3540@@孙小圣@ sdfdsfsdf";
		preg_match_all($pregAt, $rows['msg'], $matchs);
		$didMember = array();
		foreach ($matchs[0] as $atNode) {
			$tmpList = explode('@', $atNode);
			$mid = $tmpList[1];
			$mName = $tmpList[3];
			 
			if (in_array($mid, $didMember)) continue;
			else $didMember[] = $mid;
			 
			$rows['msg'] = str_replace($atNode, '@'. $mName, $rows['msg']);
		}
	} elseif ($rows['mtype'] == 100) {
		$rows['msg'] = json_decode($rows['msg']);
		if (empty($rows['msg']->group_logo)) {
			$rows['msg']->group_logo = \src\lib\Common::getConfig('base', 'staticurl') . 'images/defaultGroup.gif';
		} else {
			$rows['msg']->group_logo = \src\lib\Common::getConfig('base', 'staticurl') . $rows['msg']->group_logo;
		}
	} else {
		if ($_REQUEST["isWeb"] == '') $rows['msg'] = preg_replace('/<br ?\/?>/i', "\n", $rows['msg']);
	}
	
	if ($rows['mtype'] == 4) {
		$obj = json_decode($rows['msg']);
		$obj->filepath = \src\lib\Common::getUrl('/file/view/index/fid/'. $obj->fid, $obj->qz_id);
		$rows['msg'] = json_encode($obj);
	}

	if (empty($doNotRead)) {
		\YClient\Text::inst('EsnIm')->setClass('Msg')->setRead($im_uid, array($id));
		$preg = '/@'. $im_uid. '@@.+? /';
		if ($rows['ftype'] == 1 && $rows['mtype'] == 0 && preg_match($preg, $rows['msg'])) {
			YClient\Text::inst('EsnBaseOuter')->setClass('ModelSave')->setFlag(0, 10, $im_uid, 'IMAT:G_'. $rows['fid'], 0);
		}
	}
	
	$upstr = 'newnum-1';
	$fid = $rows['fid'];
	$uid = $rows['uid'];
	$cond = array('uid' => $uid, 'fid' => $fid, 'ftype' => 0);
	$data = array('lastread' => $id, 'newnum' => $upstr);
	\YClient\Text::inst('EsnIm')->setClass('ImStatus')->updateData($data, $cond);
	header('Content-type: application/javascript; charset=utf-8');
	exitJson($rows);
} else {
	exitErr();
}