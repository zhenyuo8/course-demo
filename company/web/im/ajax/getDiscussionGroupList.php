<?php
$IS_SPACE_IM = true;
require_once ("im_includes.php");
if (! $im_uid || ! $qz_id) {
	exit();
} else {
	if (! get_session('sesscode')) {
		set_session('sesscode', mk_code());
	}
}

global $config;
global $qz_id;
global $im_uid;
$data = \YClient\Text::inst('EsnIm')->setClass('DGroup')->getDGroupList($config, $qz_id, $im_uid, 'avatar', null, true);

outputRet($data, $e);

?>


