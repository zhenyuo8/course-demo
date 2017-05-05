<?php
require_once dirname(__DIR__) . '/function/Recently.php';

$objId = $_REQUEST['recentObjId'];
$ftype = $_REQUEST['objType'];
global $qz_id;
$recentList = \YClient\Text::inst('EsnIm')->setClass('Recently')->delRecentlyMember($qz_id, $im_uid, $objId, $ftype);

exitJson(array("result" => '0'));
?>


