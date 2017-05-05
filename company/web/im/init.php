<?php
header("content-type:text/html;charset=utf-8");
$IS_SPACE_IM = true;

require_once ("im_includes.php");
if (! $im_uid || ! $qz_id) {
	exit();
} else {
	if (! get_session('sesscode')) {
		set_session('sesscode', mk_code());
	}
}

define('DIR_ROOT', dirname(dirname(__DIR__)) . DIRECTORY_SEPARATOR);
define('IM_ROOT', 
		DIR_ROOT . DIRECTORY_SEPARATOR . 'web' . DIRECTORY_SEPARATOR . 'im' . DIRECTORY_SEPARATOR);

require_once IM_ROOT . 'function/Recently.php';
list ($recentlyList, $allCount) = getBigRecentlyList($dbo, $im_uid);

if ($_REQUEST["isWeb"] == '') {
	foreach ($recentlyList as &$v) {
		$v['msg'] = preg_replace('/<br ?\/?>/i', " ", $v['msg']);
	}
}

$page = 1;
$start = 0;
$baseInfo = \Info::baseinfo();


$allnotice = YClient\Text::inst('EsnBaseOuter')->setClass('Notice')->noticeListShowForApi($qz_id, $im_uid, 0, 1, 1, false);
		
		$ret = $allnotice[0];
		$noticeInfo = array();
		$noticeInfo['id'] = $ret['id'];
		$noticeInfo['type'] = $ret['nid'];
		$noticeInfo['typeDetail'] = $ret['type_detail'];
		$noticeInfo['created'] = $ret['create_sg'];
		$noticeInfo['isQuan'] = (int)preg_match('/_quan/', $ret['type_detail']);
		$noticeInfo['groupId'] = 0;
		$noticeInfo['relatedObj'] = array(
			'id' => $ret['object_id'],
			'typeName' => $ret['type_name'],
			'content' => $ret['content'],
			'authorId' => $ret['muid'],
			'authorName' => $ret['uname'],
			'avatar' => $ret['avatar'],
		);

$sesscode = get_session('sesscode');
$initData = array(
	'sesscode' => $sesscode,
	'im_socket_code' => substr(mk_md5($im_uid, $sesscode),6,8),
	'im_uid' => $im_uid,
	'im_uName' => $im_uName,
	'qz_id' => $qz_id,
	'notice' => array(
		'noticeNums' => (int) $noticeNums,
		'noticeInfo' => $noticeInfo
	),
	'recentlyList' => $recentlyList,
	'allMsgCount' => $noticeNums + $allCount
);
// echo "<pre>";
// print_r( $row );
// print_r($initData);
header('Content-type: application/json; charset=utf-8');
echo json_encode($initData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

?>


