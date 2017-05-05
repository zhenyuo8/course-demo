<?php
if(empty($IS_SPACE_IM)) {
	exit('Access Error');
}
function im_StopAttack($StrFiltKey,$StrFiltValue,$ArrFiltReq){
	if(is_array($StrFiltValue))
	{
		$StrFiltValue=implode($StrFiltValue);
	}
	if (preg_match("/".$ArrFiltReq."/is",$StrFiltValue)==1){
			im_slog("<br>操作IP: ".$_SERVER["REMOTE_ADDR"]." ; 操作时间: ".strftime("%Y-%m-%d %H:%M:%S")." ; 操作页面:".$_SERVER["PHP_SELF"]." ; 提交方式: ".$_SERVER["REQUEST_METHOD"]." ; 提交参数: ".$StrFiltKey." ; 提交数据: ".$StrFiltValue);
			exitErr();
	}
}
function im_slog($logs){
  global $webRoot;
  $toppath=$webRoot."/logs/IMlogs.htm";
  $Ts=fopen($toppath,"a+");
  fputs($Ts,$logs."\r\n");
  fclose($Ts);
}
$getfilter="'|(and|or)\\b.+?(>|<|=|in|like)|\\/\\*.+?\\*\\/|<\\s*script\\b|\\bEXEC\\b|UNION.+?SELECT|UPDATE.+?SET|INSERT\\s+INTO.+?VALUES|(SELECT|DELETE).+?FROM|(CREATE|ALTER|DROP|TRUNCATE)\\s+(TABLE|DATABASE)";
$postfilter="\\b(and|or)\\b.{1,6}?(=|>|<|\\bin\\b|\\blike\\b)|\\/\\*.+?\\*\\/|<\\s*script\\b|\\bEXEC\\b|UNION.+?SELECT|UPDATE.+?SET|INSERT\\s+INTO.+?VALUES|(SELECT|DELETE).+?FROM|(CREATE|ALTER|DROP|TRUNCATE)\\s+(TABLE|DATABASE)";
$cookiefilter="\\b(and|or)\\b.{1,6}?(=|>|<|\\bin\\b|\\blike\\b)|\\/\\*.+?\\*\\/|<\\s*script\\b|\\bEXEC\\b|UNION.+?SELECT|UPDATE.+?SET|INSERT\\s+INTO.+?VALUES|(SELECT|DELETE).+?FROM|(CREATE|ALTER|DROP|TRUNCATE)\\s+(TABLE|DATABASE)";
foreach($_GET as $key=>$value){
	im_StopAttack($key,$value,$getfilter);
}
foreach($_REQUEST as $key=>$value){
	im_StopAttack($key,$value,$postfilter);
}
foreach($_COOKIE as $key=>$value){
	im_StopAttack($key,$value,$cookiefilter);
}