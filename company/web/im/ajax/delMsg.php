<?php
$msgId = $_REQUEST['msgId'];
global $qz_id;

$rs = \YClient\Text::inst('EsnIm')->setClass('Msg')->delMsg($msgId, $im_uid);

exitJson(array("result" => $rs));
?>


