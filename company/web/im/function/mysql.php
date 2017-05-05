<?php
if (empty($IS_SPACE_IM)) {
	exit('Access Error');
}
// 数据库连接控制方法
function dbtarget ($rwAction, $dbServs) {
	// $rwAction参数为SI库处理数据库读写分离时使用参数,分为：r,w
	return db_conn($dbServs[0], $dbServs[1], $dbServs[2], $dbServs[3]);
}

// 建立数据库连接
function db_conn ($host, $user, $pwd, $db) {
	$conn = mysql_connect($host, $user, $pwd);
	if ($conn) {
		mysql_query("set names 'UTF8'", $conn);
		mysql_select_db($db, $conn);
	} else {
		// throw new Exception('');
		return false;
	}
	
	return $conn;
}

// 释放数据库连接
function dbtarget_free () {
	@mysql_close();
}