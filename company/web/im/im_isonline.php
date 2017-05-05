<?php
/**
 * 检查当前是否在线，web端或手机端调用websocket之前先调用次接口做判断
 * 如果在线则执行websocket的登录操作，否则说明该session已退出，需要
 * 做页面级的登录操作
 * 
 * 在线：{"is_online": 1}
 * 不在线：{"is_online": 0}
 */
require_once(dirname(__DIR__) . '/inityy.php');

// 支持根据session_id的验证方式
$sessid = '';
if (isset($_REQUEST['sessid']) && !empty($_REQUEST['sessid'])) {
    $sessid = trim($_REQUEST['sessid']);
}

$isOnline = 0;
if (empty($sessid)) {
    if (Info::hasLogin()) {
        $isOnline = 1;
    }
} else {
    $session = src\lib\classes\YySession::instance()->getSession($sessid);
    $session = json_decode($session, true);
    if (isset($session['user']) && isset($session['user']['login']) && $session['user']['login'] == 1) {
        $isOnline = 1;
    }
}

header('Content-type: application/json; charset=utf-8');
exit(json_encode(array('is_online' => $isOnline)));
