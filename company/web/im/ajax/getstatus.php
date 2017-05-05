<?php
exit();
if (empty($IS_SPACE_IM)) {
	exit('Access Error');
}
// $arr = \YClient\Text::inst('EsnIm')->setClass('User')->getBigUserNewStat($im_uid, $qz_id);
var_dump($arr);exit();
// global $imSessDelayExp;
/*
$time = time() + (int) $imSessDelayExp;
$data = array('s.expired_time' => $time);
$where = array('s.member_id' => $im_uid, 's.client_type' => \src\lib\model\Login::CLIENT_TYPE_WEB);
\YClient\Text::inst('EsnBaseOuter')->setClass('Sessions')->updateSessions($data, $where);
*/

\YClient\Text::inst('EsnBaseOuter')->setClass('SessionsRedis')->userOnlineInWeb($im_uid);
exitJson($arr);
