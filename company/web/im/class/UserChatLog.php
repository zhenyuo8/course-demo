<?php

/**
 * 用户聊天记录类。
 * 
 * 每个用户应该保存一份自己的聊天记录。当读取、删除时，不影响别人的聊天记录。
 * 又因为如果每个人把消息内容都复制一份，数据冗余非常大，所以，只用im_user_log保留和im_logs表的关系，
 * 读取删除只操作这个关系表。 
 * 
 * @author hoheart
 *
 */
class UserChatLog
{

	/**
	 * 聊天对象类型
	 *
	 * @var integer
	 */
	const CHAT_OBJ_SINGLE = 0;
	const CHAT_OBJ_SPACE_GROUP = 1;
	const CHAT_OBJ_DISCUSSION_GROUP = 2;

	/**
	 * 数据库类
	 *
	 * @var dbex
	 */
	protected $mPdo = null;

	public function __construct($pdo)
	{
		$this->mPdo = $pdo;
	}


	public function addChatLog($senderId, $receiverId, $receiverType, $msg, $msgType, $baseHost, $qzId, $testV)
	{
		// 个人与个人聊天，验证发送者、接收者，是否在圈子里
        $inQz = true;
        if (self::CHAT_OBJ_SINGLE == $receiverType) {
            $inQz = \YClient\Text::inst('EsnBaseOuter')->setClass('MemberMapping')->isMemberExist($senderId, $qzId);
            $inQz = \YClient\Text::inst('EsnBaseOuter')->setClass('MemberMapping')->isMemberExist($receiverId, $qzId);
        }
        if (!$inQz) {
            return 0;
        }
		$sqlMsg = $msg; //str_replace("'", "''", $msg);
		$now = time();
		$visibleNow = date('Y-m-d H:i:s', $now);

		// 1.插入消息记录
		$data = array(
			'uid' => $senderId,
			'fid' => $receiverId,
			'ftype' => $receiverType,
			'qz_id' => $qzId,
			'msg' => $sqlMsg,
			'mtype' => $msgType,
			'sendtime' => $now,
			'base_host' => '',
			'ukey' => self::createUkey($senderId),
		);
		$logId = \YClient\Text::inst('EsnIm')->setClass('Msg')->addData($data);

		// 2.记录每个人的聊天记录
		$this->addOneChatLog($senderId, $logId, $visibleNow);
		$noRemindList = YClient\Text::inst('EsnIm')->setClass('Msg')->getNoRemind($receiverId, $receiverType);
		// 如果是个人与个人聊天，还要为接受者保存聊天记录
		if (self::CHAT_OBJ_SINGLE == $receiverType) {
			$visibleNow = in_array($receiverId, $noRemindList) ? $visibleNow : null;
			$this->addOneChatLog($receiverId, $logId, $visibleNow);
			\YClient\Text::inst('EsnBaseOuter')->setClass('ModelSave')->setFlag($qzId, 10, $receiverId, 'im_time', time()); // 10 OBJECT_TYPE_MEMBER

			if(!in_array($receiverId, $noRemindList)){
			    \YClient\Text::inst('EsnBaseOuter')->setClass('AppUnRead')->newUnRead($qzId, $receiverId, 170, $logId);
            }

			//rencently统计
			\YClient\Text::inst('EsnIm')->setClass('Recently')->setRecentlyMember($qzId, $senderId, $receiverId);
			// 最近联系人 zhoumin 20150909
			// $receiverId 是 $senderId 常用联系人
			\YClient\Text::inst('EsnBaseOuter')->setClass('Member')->setDailyMember($qzId, $senderId, array($receiverId));
			// $senderId  是 $receiverId 的常用联系人
			\YClient\Text::inst('EsnBaseOuter')->setClass('Member')->setDailyMember($qzId, $receiverId, array($senderId));
			// 微邮最近联系人
			\YClient\Text::inst('EsnBaseOuter')->setClass('Member')->setDailyMember($qzId, $senderId, array($receiverId), 0, false, 1);
			// 微邮最近联系人
			\YClient\Text::inst('EsnBaseOuter')->setClass('Member')->setDailyMember($qzId, $receiverId, array($senderId), 0, false, 1);
		} else {
			// 如果是群组或讨论组，要为每个人保存聊天记录
			$this->addGroupChatLog($senderId, $receiverId, $receiverType, $logId, $qzId, $msgType, $testV, $noRemindList);
		}

		return $logId;
	}


	protected function addGroupChatLog ($senderId, $receiverId, $receiverType, $logId, $qzId, $msgType = 0, $testV, $noRemindList = array()) {
		//rencently统计
		$score = -time();
		if ($msgType != 255)
			\YClient\Text::inst('EsnIm')->setClass('Recently')->setRecentlyMember($qzId, $senderId, $receiverId, $receiverType, $score);

		$uidList = array();
		if (self::CHAT_OBJ_SPACE_GROUP == $receiverType) {
			$groupMemberList = \YClient\Text::inst('EsnIm')->setClass('DGroup')->getQzGroupMember(array(), $receiverId);
			foreach ($groupMemberList as $row) {
				if ($row['member_id'] == $senderId)
					continue;
				$uidList[] = $row['member_id'];
			}
		} else if (self::CHAT_OBJ_DISCUSSION_GROUP == $receiverType) {
			$memberIdArr = \YClient\Text::inst('EsnIm')->setClass('DGroup')->getDiscussionGroupMember(array(), $receiverId, true);
			foreach ($memberIdArr as $memberId) {
				if ($memberId == $senderId)
					continue;
				$uidList[] = $memberId;
			}
		}

		$isNew = true;
		if (($msgType == 255 && $this->getSysmsgType($testV) == 'tlz_exitMember'))
			$isNew = false;
		if (!empty($uidList)) {
			$remindList = array_diff($uidList, $noRemindList);
            if(!empty($remindList)){
                $data = array(
					'uid' => $remindList,
					'im_log_id' => $logId,
					'readtime' => ($isNew ? null : date('Y-m-d H:i:s'))
			    );
			    YClient\Text::inst('EsnIm')->setClass('Msg')->addUData($data);
            }
            // 踢出不在讨论组里的人员
            $exitMembers = array_diff($noRemindList, $uidList);
            foreach($exitMembers as $kk => $vv) {
                unset($noRemindList[$vv]);
            }
			if(!empty($noRemindList)){
				$dataNoRemind = array(
					'uid' => $noRemindList,
					'im_log_id' => $logId,
					'readtime' => ($isNew ? null : date('Y-m-d H:i:s'))
				);
				YClient\Text::inst('EsnIm')->setClass('Msg')->addUData($dataNoRemind);
			}
			if ($isNew) {
                if(!empty($remindList)){
                    \YClient\Text::inst('EsnBaseOuter')->setClass('AppUnRead')->newUnRead($qzId, $remindList, 170, $logId);
                }
				\YClient\Text::inst('EsnBaseOuter')->setClass('ModelSave')->setFlag($qzId, 10, $uidList, 'im_time', time());
				//更全面信息的recently统计
				\YClient\Text::inst('EsnIm')->setClass('Recently')->setRecentlyMember($qzId, $uidList, $receiverId, $receiverType, $score);
			}
		}
	}

	protected function addOneChatLog($userId, $logId, $readtime = null)
	{
		$sqlReadtime = null;
		if (null !== $readtime) {
			$sqlReadtime = $readtime;
		}

		$data = array(
			'uid' => $userId,
			'im_log_id' => $logId,
			'readtime' => $sqlReadtime
		);
		$logId = \YClient\Text::inst('EsnIm')->setClass('Msg')->addUData($data);
	}

	public function getSysmsgType($msg)
	{
		$msg_arr = json_decode($msg, true);
		if (isset($msg_arr['action'])) {
			return $msg_arr['action'];
		} else {
			return false;
		}
	}

	/**
	 * uKey唯一生成算法(32位)
	 * 
	 * @param integer $memberId
	 * 
	 * @return string
	 */
	protected static function createUkey($memberId)
	{
		$randLength = 6;
		$randCode = '';
		for ($a = 0; $a < $randLength; $a++) {
			$randCode .= chr(mt_rand(33, 126));
		}

		return md5($_SERVER['SERVER_NAME'] . $memberId . microtime() . $randCode);
	}

}

?>