<?php
use src\lib\FileCommon;

define('DIR_ROOT', dirname(dirname(dirname(__DIR__))));
define('FILE_ROOT', dirname(DIR_ROOT) . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR);
$MESSAGE_TYPE = array(
	1,
	2,
	3,
	4
);

$postFile = $_FILES['v'];
if (0 == $postFile['error'] && $postFile['size'] > 0) {
	error_reporting ( E_ALL ^ E_NOTICE ^ E_WARNING );
	$ret = FileCommon::uploadFile('v', 0, 0); // 第三个参数表示保存到本地。
	$_REQUEST['v'] = $ret['verinfo']['filepath'];
	$baseHost = \src\lib\Common::getConfig('base', 'staticurl');
	$mtype = $_REQUEST['mtype'];
	if (! in_array($mtype, $MESSAGE_TYPE)) {
		echo - 1;
		exit();
	}
	
	include (__DIR__ . DIRECTORY_SEPARATOR . 'sendmsg.php');
	
	exit();
}

echo - 1;

?>