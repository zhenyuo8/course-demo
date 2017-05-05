<?php
if (empty($IS_SPACE_IM)) {
	exit('Access Error');
}

$noreadmsg = \YClient\Text::inst('EsnIm')->setClass('Msg')->getAllNewMsg($im_uid);
if ($noreadmsg) {
	exitJson($noreadmsg);
} else {
	exitErr();
}
