<?php
use src\lib\classes\YySession;

ini_set('gd.jpeg_ignore_warning', 1);
date_default_timezone_set('Asia/Shanghai');

define('YY_VER', '1.5');
define('DIR_ROOT', dirname(__DIR__));
define('APP_ROOT', DIR_ROOT . '/modules');
define('SMARTY_DIR', DIR_ROOT . '/lib/Smarty/libs/');
define('LOG_DIR', DIR_ROOT . '/log');

$config = include DIR_ROOT . '/config/config.php';
include DIR_ROOT . '/config/common.php';
define('YY_KEY', $config['base']['yykey']);
define('FILE_ROOT', $config['base']['file_dir']);

// 强制跳转
if (!empty($config['base']['force_host_url']) && 
    !empty($_SERVER['HTTP_HOST']) && 
    $_SERVER['HTTP_HOST'] != $config['base']['force_host_url'] &&
    $_SERVER['HTTP_HOST'] != 'www.upesn.com' &&
    $_SERVER['HTTP_HOST'] != 'down.upesn.com' &&
    $_SERVER['HTTP_HOST'] != 'pub.esn.ren' &&
    $_SERVER['HTTP_HOST'] != 'esn.yonyouup.cn' // 手机端之前版本接口中写死了此域名，等以后再删掉次判断
    ) {
    $toUrl = '';
    if (!empty($_SERVER['HTTP_REFERER'])) {
        $toUrl = parse_url($_SERVER['HTTP_REFERER']);
        $toUrl = $toUrl['path'];
    }
    header("Location: http://{$config['base']['force_host_url']}$toUrl");
}


if (isset($config['debug']) && $config['debug']) {
	ini_set('display_errors', 'On');
	error_reporting (E_ALL ^ E_NOTICE ^ E_WARNING ^ E_STRICT);
} else {
	ini_set('display_errors', 'Off'); // 关闭错误显示就够了
	error_reporting (E_ALL ^ E_NOTICE ^ E_WARNING ^ E_STRICT); // 只要错误吧，警告太多了，后期再完善
	// error_reporting(0); // 这个不能关，关了log_errors = On也不起作用了
}

// 下面设置session_id为上传文档的flash控件用。
if (isset($_POST['sessid'])) {
	session_id($_POST['sessid']);
	$_COOKIE['PHPSESSID'] = $_POST['sessid'];
}
if (isset($_COOKIE['PHPSESSID'])) {
	session_id($_COOKIE['PHPSESSID']);
}

// 自动加载类方法
function yy_autoload ($class) {
	$newclass = DIR_ROOT . '/' . str_replace('\\', '/', $class) . '.php';
	if (! is_file($newclass)) {
		$class = 'lib\\' . $class;
		$newclass = DIR_ROOT . '/' . str_replace('\\', '/', $class) . '.php';
	}
	$class = $newclass;
	// echo $class, '<br/>';
	include_once $class;
}

spl_autoload_register('yy_autoload');
include_once DIR_ROOT . '/src/lib/classes/Info.php';

// Import webservice(phpserver) client.
if(isset($config['YYWS']) && !empty($config['YYWS'])){
    \YClient\YTextRpcClient::config($config['YYWS']);
}


/*******************[YServer start]***********************/
// ======= 调用连跟踪嵌入=======
YTrace\WebTrace::setConfig($config['YServerYTrace']);
YStatis\WebStatis::setConfig($config['YServerYStatis']);
/*******************[YServer end]***********************/

// 初始化memcache
$mc = new \YY\Mcache($config['memcached']);
\Zend\Registry::set('mc', $mc);

if ($config['session_redis']) {
	// session存入redis
	YySession::instance();
} else {
	session_start();
}
