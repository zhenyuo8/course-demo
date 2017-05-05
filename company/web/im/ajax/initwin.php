<?php
if(empty($IS_SPACE_IM)) {
	exit('Access Error');
}

/* post 数据处理 */
$fid = $ajax_id  = $_REQUEST["id"];
$do 	  = intval($_REQUEST["do"]);

if(!$ajax_id) {
	exitErr();
}

//为用户还是群组或者讨论组
$ftype = is_numeric($ajax_id)?0:1;
if($ftype){
	//当聊天对象为群组或讨论组时
	$ftypearr = explode('_',$ajax_id);
	$ajax_id = $ftypearr[1];
	switch($ftypearr[0]){
		case 'g':
			$ftype = 1;
		break;
		case 'tg':
			$ftype = 2;
		break;
		default:
			exitErr();
		break;
	}
	//@hoheart 启用群组功能，所以注释exit
	//exitErr();
}

if($do){
	if($ajax_id <= 0 && $ftype == 0) exitErr();
	\YClient\Text::inst('EsnIm')->setClass('ImDo')->checkCreatDo($im_uid, false, $fid);
}

// 如果是讨论组 并且 id为0 那么通过from_type, from_id 获取讨论组id
if ($ajax_id == 0 && $ftype == 2) {
	$from_type = $_REQUEST["from_type"];
	$from_id = $_REQUEST["from_id"];
	$setQzId = $qz_id;
	$creater = $im_uid;
	$ajax_id = \YClient\Text::inst('EsnIm')->setClass('DGroup')->getDGroupByFrom($from_type, $from_id, true, true, $im_uid, $setQzId, $creater);
	$ajax_id = $ajax_id['id'];
}

$users = \YClient\Text::inst('EsnIm')->setClass('ImStatus')->getUserStatus($im_uid, $ajax_id, $ftype);

//定义数据库操作
dbtarget('w',$dbServs);
$dbo=new dbex;
if(!$users) {
	$users = \YClient\Text::inst('EsnIm')->setClass('ImStatus')->insertNewStatus($im_uid, $ajax_id, $ftype, mk_code());
}

// 获取最新一条消息的id
$msg = \YClient\Text::inst('EsnIm')->setClass('Msg')->getMostNewMsgIndex($im_uid, $ajax_id, $ftype);

// 删除@标记
\YClient\Text::inst('EsnBaseOuter')->setClass('ModelSave')->setFlag($qz_id, 10, $im_uid, 'IMAT:G_'. $ajax_id, 0); // 10 OBJECT_TYPE_MEMBER

exitJson(array("im_vc" => substr(mk_md5($users['sesscode'],$sesscode),6,8), "msg_id" => empty($msg['id']) ? 0 : $msg['id']));
?>