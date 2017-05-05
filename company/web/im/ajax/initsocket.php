<?php
if(empty($IS_SPACE_IM)) {
	exit('Access Error');
}
$socketcode = mk_md5($im_uid,$sesscode);
echo $socketcode;
?>