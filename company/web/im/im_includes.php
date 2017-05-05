<?php
if(empty($IS_SPACE_IM)) {
	exit('Access Error');
}

require_once( dirname( __DIR__ ) . '/inityy.php' );

require_once("im_config.php");
//数据安全效验
//require_once("im_check.php");
//表操作类
require_once($webRoot.$baseLibsPath.'dbexClass.php');

//数据库连接文件
require_once($webRoot.'function/mysql.php');
//过滤函数
require_once($webRoot.'function/string.php');
//全局函数
require_once($webRoot.'function/common.php');
//sql 拼接函数
require_once($webRoot.'function/sqlitem.php');
//用户相关
//require_once($webRoot.'function/user.php');
//用户相关 -> 处理大于指定人数
//require_once($webRoot.'function/big_user.php');

//连接数据库(读)
$conn = dbtarget('r',$dbServs);
$dbo=new dbex($conn);
