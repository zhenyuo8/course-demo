<?php
if (empty($IS_SPACE_IM)) {
	exit('Access Error');
}

$ftype = intval($_REQUEST["ftype"]);
$fid = intval($_REQUEST["fid"]);
$start = intval($_REQUEST["start"]);
$end = intval($_REQUEST["end"]) ?: null;
$num = intval($_REQUEST["num"]);

$row = \YClient\Text::inst('EsnIm')->setClass('Msg')->getMsgList($config, $im_uid, $fid, $ftype, $start, $end, $num + 1);
foreach ($row as &$node) {
	$node['avatar'] = \src\lib\Common::getConfig('base', 'staticurl'). $node['avatar'];
	if (!in_array($node['mtype'], array(0, 4, 5, 100, 255))) {
		if ($node['mtype'] == 2) {
			// 语音消息特殊格式
			list ($node['msg'], $node['duration']) = explode(',', $node['msg']);
			if (empty($node['duration'])) $node['duration'] = 0;
		}
		$node['msg'] = \src\lib\Common::getConfig('base', 'staticurl') . $node['msg'];
	} elseif ($_REQUEST['isWeb'] == '' && ($node['mtype'] == 4 || $node['mtype'] == 5)) {
		$node['msg'] = "该版本暂不支持该消息类型的显示";
		$node['mtype'] = 0;
	} elseif ($_REQUEST['isWeb'] == '' && $node['mtype'] == 255) {
		$jsonObj = json_decode(str_replace('&quot;', '"', $node['msg']));
		if ($jsonObj->action == 'msg_del') {
			$node['mtype'] = 0;
			$node['msg'] = "{$jsonObj->data->mName} 删除了一条消息"; 
		}
	} elseif ($node['mtype'] == 100) {
		$node['msg'] = json_decode($node['msg']);
		if (empty($node['msg']->group_logo)) {
			$node['msg']->group_logo = \src\lib\Common::getConfig('base', 'staticurl') . 'images/defaultGroup.gif';
		} else {
			$node['msg']->group_logo = \src\lib\Common::getConfig('base', 'staticurl') . $node['msg']->group_logo;
		}
	} else {
		if ($_REQUEST["isWeb"] == '') $node['msg'] = preg_replace('/<br ?\/?>/i', "\n", $node['msg']);
	}
}
$count = count($row);
if ($count > $num) {
	$result['hasMore'] = 1;
	array_pop($row);
	$result['list'] = $row;
}
else {
	$result['hasMore'] = 0;
	$result['list'] = $row;
}
if ($row) {
	exitJson($result);
} else {
	exitErr();
}