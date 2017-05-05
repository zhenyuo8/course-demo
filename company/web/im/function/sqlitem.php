<?php
if (empty($IS_SPACE_IM)) {
	exit('Access Error');
}
// 获取查询队列
function get_select_item ($select_items) {
	$sql_part = '';
	if ($select_items != '*') {
		if (is_array($select_items)) {
			$sql_part = '`' . implode("`,`", $select_items) . '`';
		} else {
			$sql_part = "`$select_items`";
		}
	} else {
		$sql_part = '*';
	}
	return $sql_part;
}
// 获取更新队列
function get_update_item ($update_items) {
	$sql_part = '';
	if (is_array($update_items)) {
		$set = $dot = '';
		foreach ($update_items as $k => $v) {
			$sql_part .= $dot . "`$k` = '$v'";
			$dot = ",";
		}
		return $sql_part;
	} else {
		exit('update_items not array');
		return false;
	}
}
// 获取插入队列
function get_insert_item ($insert_items) {
	$sql_part = '';
	if (is_array($insert_items)) {
		$set = $value = $dot = '';
		foreach ($insert_items as $k => $v) {
			$set .= $dot . "`$k`";
			$value .= $dot . "'$v'";
			$dot = ",";
		}
		$sql_part = "($set) values ($value)";
		return $sql_part;
	} else {
		exit('insert_items not array');
		return false;
	}
}
// 获取并列条件队列
function get_multi_or_item ($field, $multiOr) {
	if ($multiOr) {
		$sql_part = '';
		$items = explode(',', $multiOr);
		$or = '';
		foreach ($items as $v) {
			$sql_part .= $or . ' ' . $field . "='" . $v . "'";
			$or = 'or';
		}
		return $sql_part;
	} else {
		exit("get_multi_or_item is NUll");
	}
}

// 添加新纪录
function im_insert (&$dbo, $table, $array) {
	$item_sql = get_insert_item($array);
	$sql = "insert into `" . TB . $table . "` $item_sql";
	return $dbo->exeUpdate($sql);
}

// 更新用户信息
function im_update (&$dbo, $table, $wheresql, $setsql) {
	$sql = "UPDATE `" . TB . $table . "` SET $setsql WHERE $wheresql";
	return $dbo->exeUpdate($sql);
}

function im_update1 ($dbo, $table, $row , $whereSql) {
	if (is_array($row)) {
		$setsql = '';
		$dot = '';
		foreach ($row as $k => $v) {
			$setsql .= "$dot $k = '$v' ";
			if (empty($dot)) {
				$dot = ',';
			}
		}
		
		$sql = "UPDATE `" . TB . $table . "` SET $setsql WHERE $whereSql";
		return $dbo->exeUpdate($sql);
	}
}
?>