<?php

class User {
	static public function getAvatarUrl ($relativeAvatar) {
		if (empty($relativeAvatar)) {
			$relativeAvatar = 'default_avatar.thumb.jpg';
		} else {
			$relativeAvatar .= '.middle.jpg';
		}
			
		$avatarUrl = \src\lib\Common::getConfig('base', 'staticurl') . $relativeAvatar;
		
		return $avatarUrl;
	}
	
	/**
	 * 获取群组logo
	 * @param unknown $groupLogo
	 */
	static public function getGroupLogo($groupLogo) {
		if (empty($groupLogo)) {
			return \src\lib\Common::getConfig('base', 'host_url') . '/images/defaultGroup.gif';
		}
		
		return \src\lib\Common::getConfig('base', 'staticurl') . $groupLogo . '.thumb.jpg';
	}
}
?>