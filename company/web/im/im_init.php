<?php
header('Content-Type: text/javascript; charset=utf-8');

$IS_SPACE_IM = true;
require_once ("im_includes.php");
if (!$im_uid || ! $qz_id) {
	exit();
} else {
	if (! get_session('sesscode')) {
		set_session('sesscode', mk_code());
	}
}

$bigUserCount = \YClient\Text::inst('EsnIm')->setClass('User')->getBigUserCount($im_uid, $qz_id); // 获取关注总数和关注在线总数
$isbig = true;
if ($isbig) {
	$recentlyList = \YClient\Text::inst('EsnIm')->setClass('User')->getBigRecentlyUser($im_uid, $qz_id); // 获取最近联系的人
	$perGroupNum = \YClient\Text::inst('EsnIm')->setClass('User')->getBigFollowCount($im_uid, $qz_id); // 获得每个分组总人数和在线人数
	$allCountNum = $perGroupNum;
}

// 获取当前圈子关注分组
$followList = \YClient\Text::inst('EsnIm')->setClass('User')->getFollowGroupList($qz_id, $im_uid);
// 获取客服人员信息
$ourUsers = array();//get_our_users($dbo);
// 获取消息的最新位置
$mostIndex = \YClient\Text::inst('EsnIm')->setClass('Msg')->getMostNewMsgIndex();

$return = array();
$return['im_uid'] = $im_uid;
$return['sessid'] = session_id();
$return['im_uName'] = $im_uName;
$return['qz_id'] = $qz_id;
$return['sesscode'] = get_session('sesscode');
$return['site_url'] = $siteDomain;
$return['im_url'] = $baseUrl;
$return['pic_url'] = $picUrl;
$return['mostIndex'] = $mostIndex['id']+1;
$return['isBig'] = $isbig;
$return['im_socket_code'] = substr(mk_md5($im_uid,get_session('sesscode')),6,8);
$return['im_socket_ip'] = $imSocketIp;
$return['im_socket_port'] = $imSocketPort;

if ($isbig) {
	$followList['name'][0] = '未分组成员';
	$return['recentlyList'] = $recentlyList;//chat_json_encode($recentlyList);
	$return['allCountNum'] = $allCountNum;//chat_json_encode($allCountNum);
	$return['bigUserCount']	=	$bigUserCount;//chat_json_encode($bigUserCount);
}
$return['followsObj'] = $followList;//chat_json_encode($followList);
$return['js_version'] = $config['base']['js_version'];
$return['newsMsgIds'] = \YClient\Text::inst('EsnIm')->setClass('Msg')->getAllNewMsg($im_uid);

$dptId = \Info::deptid();
$return['dptMemberNum'] = \YClient\Text::inst('EsnBaseOuter')->setClass('Member')->getUserCountByDptId($qz_id, $dptId) - 1;
if ($return['dptMemberNum'] < 0) $return['dptMemberNum'] = '0';
$callback = $_GET['callback'];
$result = json_encode($return);
if (!empty($callback)) exit("$callback($result);");
else exit($result);
