<?php
header("content-type:text/javascript;charset=utf-8");
$IS_SPACE_IM = true;

$callback = $_GET['callback'];
function exitErr($errCode = '-1') {
	global $callback;
	if (empty($callback)) exit($errCode);
	else exit("$callback(". json_encode(array('result' => $errCode)). ")");
}
function exitJson($result, $toJson = true){
	global $callback;
	if ($toJson) $result = json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
	if (!empty($callback)) exit("$callback($result);");
	else exit($result);
}

   /**
     * 判断讨论组是否存在，公共方法，不存在直接返回错误.
     * 
     * @param integer $id Id.
     * 
     * @reurn string.
     */
    function checkDgroupExist($id, $qzId = null)
    {
        $row = YClient\Text::inst('EsnIm')->setClass('DGroup')->getDiscussionGroupInfo($id);
        if (!$row) {
            return false;
        } elseif (!is_null($qzId) && $row['qz_id'] != $qzId) {
        	return false;
        }
        return true;
    }


require_once ("im_includes.php");
$sesscode = get_session('sesscode');
if (! $im_uid || ! $qz_id) {
	exitErr();
}

// ajax 请求操作！
$actArray = array(
	//'initwin' => 'ajax/initwin.php',
	//'sendmsg' => 'ajax/sendmsg.php',
	//'getmsg' => 'ajax/getmsg.php',
	//'noreadmsg' => 'ajax/noreadmsg.php',
	'getuserinfo' => 'ajax/getuserinfo.php',
	//'getagomsg' => 'ajax/getagomsg.php',
	//'upnoreadmsg' => 'ajax/upnoreadmsg.php',
	'getusers' => 'ajax/getusers.php',
	'searchfriend' => 'ajax/searchfriend.php',
	//'getchatlist' => 'ajax/getchatlist.php',
	//'getface' => 'ajax/getface.php',
	//'getstatus' => 'ajax/getstatus.php',
	//'upstatus' => 'ajax/upstatus.php',
	//'getCommonContact' => 'ajax/getCommonContact.php',
	//'setDiscussionGroup' => 'ajax/setDiscussionGroup.php',
	//'addDiscussionGroupMember' => 'ajax/addDiscussionGroupMember.php',
    //'addDiscussionGroupMemberNew' => 'ajax/addDiscussionGroupMemberNew.php',
	//'delDiscussionGroupMember' => 'ajax/delDiscussionGroupMember.php',
	// 'delDiscussionGroup' => 'ajax/delDiscussionGroup.php',只有当最后一个人退出时，才删除讨论组
	//'getDiscussionGroupMember' => 'ajax/getDiscussionGroupMember.php',
	//'sendFileMsg' => 'ajax/sendFileMsg.php',
	// 'getNewMsg' => 'ajax/getNewMsg.php',
	//'delRecently' => 'ajax/delRecently.php',
	//'getDiscussionGroupInfo' => 'ajax/getDiscussionGroupInfo.php',
	'getQzGroupInfo' => 'ajax/getQzGroupInfo.php',
	//'getDiscussionGroupList' => 'ajax/getDiscussionGroupList.php',
	//'getChatMsg' => 'ajax/getChatMsg.php',
	// 'getAllDiscussionGroup' => 'ajax/getAllDiscussionGroup.php',
	//'getCommonDG' => 'ajax/getCommonDG.php',
	//'getCommonSG' => 'ajax/getCommonSG.php',
	// 'clearChatMsg' => 'ajax/clearChatMsg.php',
	//'topConversation' => 'ajax/topConversation.php',
	//'untopConversation' => 'ajax/untopConversation.php',
	//'setPushNotice' => 'ajax/setPushNotice.php',
	'getGroup' => 'ajax/getGroup.php',
	//'getTopConversation' => 'ajax/getTopConversation.php',
	// 'searchUserGroup' => 'ajax/searchUserGroup.php',
	//'switchQz' => 'ajax/switchQz.php',
	//'getAllNewMsg' => 'ajax/getAllNewMsg.php',
	//'getMsgListGreater' => 'ajax/getMsgList.php',
	//'getMsgListBetween' => 'ajax/getMsgList.php',
	//'delMsg' => 'ajax/delMsg.php',
	'searchDGMember' => 'ajax/searchDGMember.php',
	'userInfo' => 'ajax/userInfo.php',
	'getUserToken' => 'ajax/getUserToken.php',
	'getPendingQzApplyNew' => 'ajax/getPendingQzApplyNew.php',
	'getPendingGroupApply' => 'ajax/getPendingGroupApply.php',
	'getPendingGroupInviteApply' => 'ajax/getPendingGroupInviteApply.php',
	'getPendingScheduleInvite' => 'ajax/getPendingScheduleInvite.php',
	'getPendingCalendarShareInvite' => 'ajax/getPendingCalendarShareInvite.php',
	'getPendingTagRequestApproveNotice' => 'ajax/getPendingTagRequestApproveNotice.php',
	'batchGetGroup' => 'ajax/batchGetGroup.php',
);

$act = $_GET['act'];
$acttarget = $actArray[$act];
if (isset($acttarget)) {
	include_once ($webRoot . $acttarget);
} else {
	exitErr();
}
?>
