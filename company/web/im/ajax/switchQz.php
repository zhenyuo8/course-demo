<?php
/**
 * 切换圈子
 */
if (empty($IS_SPACE_IM)) {
	exit('Access Error');
}

// 加载类文件
use Info;
use src\lib\Ucenter;
use src\lib\classes\upload as U;

// 圈子id
$qzid = short_check($_REQUEST['qzid']);

if (!$qzid) {
	$result = array(
		'errcode' => 1,
		'desc' => 'qzid非法',
	    'isadmin' => 0,
	);
	outPutResultExit($result);
	//$this->_redirect(self::HOME_URL);
}
$userid = Info::userid();
$Ucenter = new Ucenter();
//判断用户是否在此圈子里
$isJoined = \YClient\Text::inst('EsnBaseOuter')->setClass('Member')->isJoined($qzid, $userid);
$memberid = Info::memberid();
$isAdmin = (Info::isadmin() || Info::ispadmin()) ? 1 : 0;

$qzInfo = \YClient\Text::inst('EsnBaseOuter')->setClass('QzBase')->getQzInfoById($qzid); // $qzM->getByQzid($qzid);
if ($qzInfo['audit'] == 0) { //未审核的圈子
	$result = array(
		'errcode' => 2,
		'desc' => '未审核的圈子',
	    'isadmin' => $isAdmin,
	);
	outPutResultExit($result);
	//$this->_redirect(self::HOME_URL, '您要切换的圈子处于审核状态，请等候审核通知！', 1);
}
if ($qzInfo['audit'] == 2) { //审核不通过的圈子
	$result = array(
		'errcode' => 3,
		'desc' => '审核不通过的圈子',
	    'isadmin' => $isAdmin,
	);
	outPutResultExit($result);
	//$this->_redirect(self::HOME_URL, '您要切换的圈子审核未通过！', 1);
}
$islock = \YClient\Text::inst('EsnBaseOuter')->setClass('MemberMapping')->getHasLock($userid, Info::communityid(), $qzid);
if ($islock) {
	$result = array(
		'errcode' => 4,
		'desc' => '你已无此空间访问权限',
	    'isadmin' => $isAdmin,
	);
	outPutResultExit($result);
	//$this->_redirect(self::HOME_URL, '你已无此空间访问权限！', 1);
}

if ($isJoined) {	//已经加入

	$result = $Ucenter->initUserData($userid, $qzid, 1, $memberid, Info::qzid(), 0);
	
	// 空间剩余天数
	$instanceId = \YClient\Text::inst('EsnBaseOuter')->setClass('QzBase')->getInstanceIdByBaseId($qzid);
	$days = $instanceId ? \YClient\Text::inst('OpSys')->setClass('Instance')->getExpireDayById($instanceId) : 0;
	
	$result = array(
		'errcode' => 0,
		'desc' => '已经加入',
	    'isadmin' => $isAdmin,
		'leftDay' => $days,
		'leftDayAlter' => $days <= 10 ? 1 : 0,
	);
	outPutResultExit($result);
	//$this->_redirect(self::HOME_URL);
}
//未加入
if ($qzInfo['qz_type'] != 1) {	//非外部空间
	//是否是父级管理员
	$isPAdmin = \YClient\Text::inst('EsnBaseOuter')->setClass('Member')->isParentAdmin($qzid, $memberid);
	if($isPAdmin == 1){
		$result = $Ucenter->initUserData($userid, $qzid, 2, $memberid, Info::qzid(), 0);
	}
	$result = array(
		'errcode' => 0,
		'desc' => '非外部空间加入',
	    'isadmin' => $isAdmin,
	);
	outPutResultExit($result);
	//$this->_redirect(self::HOME_URL);
}

//外部空间
$joinStatus = \YClient\Text::inst('EsnBaseOuter')->setClass('QzBase')->getPublicSpaceStatus($qzid, $userid, Info::email());
$info = \YClient\Text::inst('EsnBaseOuter')->setClass('QzBase')->getQzInfoById($qzid, "id,name,member_num,logo");
$info['logo'] = $info['logo'] ? U\Image::getthumb($info['logo']) : '/images/default_space_small.gif';

$result = array(
	'errcode' => 0,
	'desc' => '外部空间加入',
    'isadmin' => $isAdmin,
);
outPutResultExit($result);

/**
 * 输出结构并退出
 */
function outPutResultExit($result) {
	header('Content-type: application/json; charset=utf-8');
	exitJson(json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), false);
}

/*
$this->_view->assign('info', $info);
$this->_view->assign('baseInfo', Info::baseinfo());
$this->_view->assign('joinStatus', $joinStatus);
$this->_view->addJsPath('modules/space/yy.net.js');
*/