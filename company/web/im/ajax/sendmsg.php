<?php
if (empty($IS_SPACE_IM)) {
	exit('Access Error');
}
use src\lib\model\XingePush;
use src\lib\FileCommon;

function bindFile($fileId, $fromid, $fileQzid = null)
{
	return \YClient\Text::inst('EsnFile')->setClass('File')->updateFrom($fileId, $fromid, 170, $fileQzid);
}

/* post 数据处理 */
$qzid = short_check($_REQUEST["qzid"]);
$fid = short_check($_REQUEST["fid"]);
$vc = short_check($_REQUEST['vc']);
$isWeb = $_REQUEST['isWeb'];
$mtype = $_REQUEST['mtype'];
$content = $_REQUEST['v'];
//过滤标签br
$v = preg_replace('/<br(.*?)>/i', "\n", $_REQUEST['v']);
$v = preg_replace('/<br ?\/?>/i', "\n", $v);
$v = preg_replace('/&nbsp;/i', " ", $v); //去掉空格
if ($mtype == 0) $v = htmlspecialchars_decode(strip_tags($v, '<br>'));
if ($isWeb == 1 && $mtype == 0) $v .= ' ';

$duration = intval($_REQUEST['duration']);
$fileId = intval($_REQUEST['fileId']);
if (empty($mtype)) {
	$mtype = 0; // 消息为文本
}
// 为用户还是群组或者讨论组
$ftype = is_numeric($fid) ? 0 : 1;
if ($ftype) {
	// 当聊天对象为群组或讨论组时
	$ftypearr = explode('_', $fid);
	$fid = $ftypearr[1];
	switch ($ftypearr[0]) {
		case 'g':
			$ftype = 1;
			$groupInfo = \YClient\Text::inst('EsnBaseOuter')->setClass('Group')->getOneGroupInfo($fid);
			$qz_id = $fileQz = $groupInfo['qz_id'];
			break;
		case 'tg':
			$ftype = 2;
			$dgroupInfo = YClient\Text::inst('EsnIm')->setClass('DGroup')->getDiscussionGroupInfo($fid);
			$qz_id = $fileQz = $dgroupInfo['qz_id'];
			break;
		default:
			exitErr();
			break;
	}
	if ($fid < 1) {
		exitErr('-2');
	}
	// exitErr();
}else{
    $qz_id = $qzid;
}

// 讨论组不存在，不许发信息。
if ($ftype == 2) {
	if (!checkDgroupExist($fid)) {
		exitErr('-201');
	}
}
$users = \YClient\Text::inst('EsnIm')->setClass('ImStatus')->getUserStatus($im_uid, $fid, $ftype);
if (substr(mk_md5($users['sesscode'], $sesscode), 6, 8) != $vc) {
	exitErr();
}

if ($fileId) {
	$file = \YClient\Text::inst('EsnFile')->setClass('File')->getCurrentFileById($fileId, $qzid, 1, 1);
	$v = $file['filepath'];
}

if ($vc && $fid && $qzid && $v != '') {
	$testV = $v;
	$v = str_replace("\n", "<br />", $v);
	$v = str_replace('"', "&quot;", $v);
	$pattern = "/{img:(.+?)\/}/";
	$replacement = "<img src=\"im/\${1}\" />";
	$v = preg_replace($pattern, $replacement, $v);
	$sdt = time();
	
	// 保存每个人的聊天记录
	require_once dirname(__DIR__) . '/class/UserChatLog.php';
	$ucl = new UserChatLog($dbo);

	if ($mtype == 1) $v = str_replace($config['base']['staticurl'], '', $v);
	if ($mtype == 2) $v .= ",$duration";
	if ($mtype == 4) {
		$v = json_encode(array(
			'fid' => $file['fid'],
			'name' => $file['title'],
			'size' => FileCommon::convertSize($file['filesize']),
			'icon' => FileCommon::getFileIocClass($file['fileext']),
			'thumb' => '',
			'ext' => $file['fileext'],
			'qz_id' => $file['qz_id'],
			'filepath' => FileCommon::getOnlyDownUrl($file, false),
			'ext_num' => FileCommon::getExtNum($file['fileext'])
		));
	}
	
	$lsatinsert = $ucl->addChatLog($im_uid, $fid, $ftype, $v, $mtype, $baseHost, $qz_id, $testV);
	
	$pushMsgV = $v;
	if ($mtype > 0) {
		switch ($mtype) {
			case 1:
				$pushMsgV = '[图片]';
				if ($fid) bindFile($fileId, $lsatinsert, $fileQz);
				break;
			case 2:
				$pushMsgV = '[语音]';
				if ($fid) bindFile($fileId, $lsatinsert, $fileQz);
				break;
			case 3:
				$pushMsgV = '[视频]';
				if ($fid) bindFile($fileId, $lsatinsert, $fileQz);
				break;
			case 4:
				$pushMsgV = '[文件]';
				if ($fid) bindFile($fileId, $lsatinsert, $fileQz);
				break;
			case 5:
				$pushMsgV = '[位置]';
				break;
			case 255:
				$pushMsgV = '[系统消息]';
				break;
		}
	}
	
	if ($lsatinsert > 0) {
		$cond = array('uid' => $im_uid, 'fid' => $fid, 'ftype' => $ftype);
		$data = array('lasttime' => time(), 'allnum' => 'allnum+1');
		\YClient\Text::inst('EsnIm')->setClass('ImStatus')->updateData($data, $cond);
		
		if ($ftype == 0) {
			$cond = array('uid' => $fid, 'fid' => $im_uid, 'ftype' => $ftype);
			$data = array('newnum' => 'newnum+1');
			\YClient\Text::inst('EsnIm')->setClass('ImStatus')->updateData($data, $cond);
		}
		
		// 圈人标记
		if ($ftype == 1 && $mtype == 0) {
			$pushMsgV = $v;
			// 取讨论组成员id列表
			$gMidList = array();
			$groupMemberList = YClient\Text::inst('EsnIm')->setClass('DGroup')->getQzGroupMember(array(), $fid);
			foreach ($groupMemberList as $row) {
				if ($row['member_id'] == $im_uid) continue;
				$gMidList[] = $row['member_id'];
			}
			
			$pregAt = '/@\d+@@.+? /';
			// $str = "@2737@@孙宏良@ @3540@@孙小圣@ sdfdsfsdf";
			preg_match_all($pregAt, $v, $matchs);
			$didMember = array();
			foreach ($matchs[0] as $atNode) {
				$tmpList = explode('@', $atNode);
			    $mid = $tmpList[1];
			    $mName = $tmpList[3];
			    
			    if (in_array($mid, $didMember)) continue;
			    else $didMember[] = $mid;
			    
			    $pushMsgV = str_replace($atNode, '@'. $mName, $pushMsgV);
			    
			    if (in_array($mid, $gMidList)) \YClient\Text::inst('EsnBaseOuter')->setClass('ModelSave')->setFlag(0, 10, $mid, 'IMAT:G_'. $fid, 1); // 10 OBJECT_TYPE_MEMBER
			}
		}
		$tl = \YClient\Text::inst('EsnBaseOuter')->setClass('Im')->getMsgTlByFid($fid,$ftype,$im_uid,$qz_id);
		$arr['time'] = time();
		$arr['fid'] = intval($fid);
		$arr['ftype'] = $ftype == 2 ? 'tg_' : ($ftype == 1 ? 'g_' : '');
		$arr['id'] = $lsatinsert;
		$arr['vc'] = substr(mk_md5($fid, $lsatinsert), 6, 8);
		$arr['tl'] = $tl;
		// 给手机端加上资源前缀
		if (!in_array($mtype, array(0, 4, 5, 255))) $v = $config['base']['staticurl'] . $v;
		
		$arr['content'] = preg_replace('/<br ?\/?>/i', "\n", $v);
		$arr['mtype'] = $mtype;
		$arr['qz_id'] = $qz_id;
		
		//记录最后一条消息
		\YClient\Text::inst('EsnIm')->setClass('Recently')->setLastMsg($pushMsgV, $ftype, $fid, $im_uid, $arr['time']);
		$arr['content'] = $mtype == 255 ? json_decode($content, true) : $arr['content'];
		//推送消息
		if (!($mtype == 255 && $ucl->getSysmsgType($testV) == 'tlz_exitMember')) \YClient\Text::inst('EsnIm')->setClass('PushMsg')->pushImMsg($qz_id, $im_uid, $fid, $arr, $ftype, $mtype);

		exitJson($arr);
	}
}
exitErr();
?>
