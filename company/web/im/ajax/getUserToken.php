<?php
if (empty($IS_SPACE_IM)) {
	exit('Access Error');
}

$row = \YClient\Text::inst('EsnIm')->setClass('Youxin')->getUserToken($im_uid);

if ($row) {
	exitJson($row);
} else {
	exitErr();
}