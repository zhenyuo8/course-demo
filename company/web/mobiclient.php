<?php
//todo 权限验证
//print_r($_POST);print_r($_FILES);
if (isset($_FILES['apkfile']) && !empty($_FILES['apkfile']['tmp_name'])) {
	$qz_id = $_POST['qz_id'];
	$user_id = $_POST['user_id'];
	$client_name = $_POST['client_name'];
	$dir = dirname(__FILE__).DIRECTORY_SEPARATOR.'mobiclient/';
	if (!is_dir($dir))
		@mkdir($dir, 0777);
	$dir .= $qz_id.'/';
	if (!is_dir($dir))
		@mkdir($dir, 0777);
	$fn = $dir.$client_name;
	@copy($_FILES['apkfile']['tmp_name'], $fn);
}
