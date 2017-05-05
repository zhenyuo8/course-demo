<?php
namespace src\lib\classes;
require_once(dirname(dirname(__FILE__)).'/src/lib/classes/CommonToken.php');
$verify_key = isset($_GET['VerifyKey']) ? urldecode($_GET['VerifyKey']) : '';
$from_app = isset($_GET['FromApp']) ? $_GET['FromApp'] : '';
if(empty($verify_key)){
	echo 0;exit;
}
$status = CommonToken::check($verify_key);
if($status){
	echo 1;
}else{
	echo 0;
}