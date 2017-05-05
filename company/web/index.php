<?php
include __DIR__ . '/inityy.php';

//路由寻址 寻找 控制器
$front = \YY\Controller::instance ( $config );

$isnew = $_GET['YYW'];
if ($isnew) {
    $front->runnew();
} else {
    $front->run ();
}

