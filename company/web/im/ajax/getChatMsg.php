<?php
if (empty($IS_SPACE_IM)) {
	exit('Access Error');
}
$fid = intval($_REQUEST["fid"]);
$start = intval($_REQUEST["start"]);
$num = intval($_REQUEST["num"]);
$ftype = intval($_REQUEST['ftype']);
$keywords = $_REQUEST['keywords'];

$bIncludeSelf = ('' == $_REQUEST['include_self'] || 1 == $_REQUEST['include_self']) ? true : false;
$row = \YClient\Text::inst('EsnIm')->setClass('Msg')->getAgoMsg($config, $im_uid, $fid, $ftype, $start, $num, $bIncludeSelf, $keywords, false);

if ($row) {
	foreach ($row as &$msg) {
		if ($msg['mtype'] == 100){
			$msg['msg'] = json_decode($msg['msg']);
			if (empty($msg['msg']->group_logo)) {
				$msg['msg']->group_logo = $config['base']['staticurl'] . 'images/defaultGroup.gif';
			} else {
				$msg['msg']->group_logo = $config['base']['staticurl'] . $msg['msg']->group_logo;
			}
		} elseif ($_REQUEST['isWeb'] == '' && ($msg['mtype'] == 4 || $msg['mtype'] == 5)) {
			$msg['msg'] = "该版本暂不支持该消息类型的显示";
			$msg['mtype'] = 0;
		} elseif ($_REQUEST['isWeb'] == '' && $msg['mtype'] == 255) {
			$jsonObj = json_decode(str_replace('&quot;', '"', $msg['msg']));
			if ($jsonObj->action == 'msg_del') {
				$msg['mtype'] = 0;
				$msg['msg'] = "{$jsonObj->data->mName} 删除了一条消息";
			}
		}
	}
}

if ($row) {
	exitJson($row);
} else {
	exitJson(array());
}