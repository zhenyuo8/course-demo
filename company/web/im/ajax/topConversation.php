<?php
use src\lib\classes\RecentlyRedis;
function action () {
	global $dbo, $im_uid, $qz_id;
	
	$objId = $_REQUEST['obj_id'];
	if (! is_numeric($objId) || $objId <= 0) {
		throw new \Exception('参数错误', - 1);
	}
	$objType = $_REQUEST['obj_type'];
	if (! is_numeric($objType) || $objType < 0 || $objType > 2 ) {
		throw new \Exception('参数错误', - 1);
	}
	
	\YClient\Text::inst('EsnIm')->setClass('Recently')->setRecentlyMember($qz_id, $im_uid, $objId, $objType, -time() * 2);
	$msg = RecentlyRedis::getLastMsg($objType, $objId, $im_uid);
	if (empty($msg)) RecentlyRedis::setLastMsg('', $objType, $objId, $im_uid);
}

$e = null;
try {
	$data = action();
} catch (\Exception $e) {
}

outputRet($data, $e);

?>


