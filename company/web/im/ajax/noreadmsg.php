<?php
if(empty($IS_SPACE_IM)) {
	exit('Access Error');
}
$ids = short_check($_REQUEST["ids"]);
$ids = explode(',',$ids);
$noreadmsg = \YClient\Text::inst('EsnIm')->setClass('Msg')->getNewMsg($im_uid,$ids);
foreach ($noreadmsg as &$rows) {
	if (0 != $rows['mtype'] && 255 != $rows['mtype'] && 100 != $rows['mtype']) {
		if ($rows['mtype'] == 2) {
			// 语音消息特殊格式
			list ($rows['msg'], $rows['duration']) = explode(',', $rows['msg']);
			if (empty($rows['duration'])) $rows['duration'] = 0;
		}
		$rows['msg'] = \src\lib\Common::getConfig('base', 'staticurl') . $rows['msg'];
	} elseif ($rows['mtype'] == 100) {
		$rows['msg'] = json_decode($rows['msg']);
		if (empty($rows['msg']->group_logo)) {
			$rows['msg']->group_logo = \src\lib\Common::getConfig('base', 'staticurl') . 'images/defaultGroup.gif';
		} else {
			$rows['msg']->group_logo = \src\lib\Common::getConfig('base', 'staticurl') . $rows['msg']->group_logo;
		}
	}
}

if($noreadmsg){
	exitJson($noreadmsg);
}else{
	exitErr();
}
