<?php
/* IM初始化配置 */
if (empty($IS_SPACE_IM)) {
	exit('Access Error');
}
//error_reporting ( E_ALL ^ E_NOTICE ^ E_WARNING );
//error_reporting(0);
// 站点配置
$webRoot = str_replace("\\", "/", __DIR__) . "/";
$qzConfig = require ($webRoot . '../../config/config.php');

// IM 数据库配置
define('TB', $qzConfig['db']['default']['master']['tname_prefix']); // 数据表前缀
$dbServs = array(
	$qzConfig['db']['default']['master']['host']. ':'. $qzConfig['db']['default']['master']['port'],
	$qzConfig['db']['default']['master']['username'], // mysql数据库用户名
	$qzConfig['db']['default']['master']['password'], // mysql数据库密码
	$qzConfig['db']['default']['master']['dbname'] // mysql数据库用户名
);

// MEMCACHED 配置
$_IMSC['OPENMEMCACHED'] = $qzConfig['memcached']['use']; // 是否开启memcached缓存
$_IMSC['MEMCACHED_EXPTIME'] = $qzConfig['memcached']['exptime']; // 默认缓存5分钟
$_IMSC['SOCKET']['HOST2'] = $qzConfig['memcached']['host'];
$_IMSC['SOCKET']['PORT2'] = $qzConfig['memcached']['port'];

// 加密效验码
$checkCode = $qzConfig['base']['yykey'];

// 站点地址
$siteDomain = $qzConfig['base']['host_url'];

// 前端图片静态资源
$frontUrlImages = $qzConfig['smarty']['image_url'];

// 站点图片地址
$picUrl = $qzConfig['base']['staticurl'];

// 圈子版本号
$im_version = $qzConfig['base']['js_version'];

$imSessDelayExp = $qzConfig['sessions']['delay_exptime'];

// imsocket配置
$imSocketIp = $qzConfig['im']['socketip']; // socketIP
$imSocketPort = $qzConfig['im']['socketport']; // socket端口
                                                 
// 客服人员ID
$ouruser = $qzConfig['im']['kefuuid'];

// session 中的IM数组标识
$session_prefix = $qzConfig['im']['session_prefix'];

unset($qzConfig);

// im访问根目录
$imBaseUrl = "/im/";
$baseUrl = $siteDomain . $imBaseUrl;

// 获取当前系统用户UID
$im_uid = intval($_SESSION['user']['memberid']);
$im_uName = $_SESSION['user']['name'];
// 当前圈子ID
$qz_id = empty($_GET['qz']) ? intval($_SESSION['user']['qzid']) : $_GET['qz'];
$qz_id = (int)$qz_id;
if ($qz_id <= 0) {
    exit;
}
// 一次性加载人数限制
$maxNum = 0;

// 时区
date_default_timezone_set("PRC");

// 支持类配置
$baseLibsPath = "class/";
