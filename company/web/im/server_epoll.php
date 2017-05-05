<?php
header("content-type:text/html;charset=utf-8");
set_time_limit(0);
error_reporting(1);

$imOnlyOne		= false; //是否仅允许同一用户使用单一SOCKET
$imSocketUrl  	= '0.0.0.0'; //socket绑定地址
$imSocketPort 	= 8069;  //socket端口
$checkCode 		= '3bMas0lbKdKeb64aa5Q1o3f1C2m84dW8n8I4C5t4qageLacet00f88o8TerbTbQe'; //空间['base']['yykey']加密效验码

class EpollSocketServer
{
	private static $socket;
	private static $connections;
	private static $buffers;
	private static $imusers;
	private static $idtouser;
	private static $imOnlyOne;
	private static $checkCode;

	function EpollSocketServer ($url,$port,$imOnlyOne,$checkCode)
	{
		global $errno, $errstr;

		if (!extension_loaded('libevent')) {
			die("please install libevent\n");
		}
		
		$socket_server = stream_socket_server("tcp://{$url}:{$port}", $errno, $errstr); //创建socket
		if (!$socket_server) die("$errstr ($errno)");

		self::$imOnlyOne	=	$imOnlyOne;
		self::$checkCode	=	$checkCode;
		stream_set_blocking($socket_server, 0); // 设置非阻塞

		$base = event_base_new(); //创建并且初始一个事件
		$event = event_new(); //创建一个新的事件
		event_set($event, $socket_server, EV_READ | EV_PERSIST, array(__CLASS__, 'ev_accept'), $base);// 准备event_add的事件
		event_base_set($event, $base); //关联事件到事件base
		event_add($event); //像指定的设置中添加一个执行事件
		event_base_loop($base);//处理事件,根据指定的base来处理事件循环

		self::$connections = array();
		self::$buffers = array();
	}

	function ev_accept($socket, $flag, $base)
	{
		static $id = 0;
		
		$connection = stream_socket_accept($socket); //接受连接的socket
		stream_set_blocking($connection, 0);// 设置非阻塞
		
		$id++; // increase on each accept

		// 建立一个新的缓存事件
		$buffer = event_buffer_new($connection, array(__CLASS__, 'ev_read'), NULL, array(__CLASS__, 'ev_error'), $id);
		event_buffer_base_set($buffer, $base); // 关联缓存的事件到 event_base
		//event_buffer_timeout_set($buffer, 30, 30); //缓存超时设置
		event_buffer_watermark_set($buffer, EV_READ, 0, 0xffffff); // 设置读写事件的水印标记
		event_buffer_priority_set($buffer, 10); // 缓存事件优先级设定
		event_buffer_enable($buffer, EV_READ | EV_PERSIST); // 启用一个指定的缓存的事件

		self::$connections[$id] = $connection;  //添加socket连接到数组
		self::$buffers[$id] = $buffer; //添加缓存事件到数组
	}
	
	function ev_error($buffer, $error, $id)
	{
		//var_dump('error code '.$error);
		$logstr = '';
		//if($error == 17){ //当连接断开时(不确定是否需要此值，测试发现当浏览器断开或刷新时有$error=17)
			event_buffer_disable(self::$buffers[$id], EV_READ | EV_WRITE); // 禁用一个缓存的事件
			event_buffer_free(self::$buffers[$id]); //释放缓存事件
			fclose(self::$connections[$id]); //释放socket
			unset(self::$buffers[$id], self::$connections[$id]); //删除数组中相关数据
			if(self::$imusers[self::$idtouser[$id]]){ //删除注册的IM用户
				$uid	=	self::$idtouser[$id];
				foreach(self::$imusers[$uid] as $key=>$val){
					if($val = $id){
						unset(self::$imusers[$uid][$key]);
						if(!self::$imusers[$uid]){
							unset(self::$imusers[$uid]);
						}
						unset(self::$idtouser[$id]);
						break;
					}
				}
				$logstr = ','.$uid.' links:'.count(self::$imusers[$uid]);
			}
		//}
		$logstr = $this->getnow().'-> error '.$error.',base id:'.$id.',idtouser :'.count(self::$idtouser).',imusers :'.count(self::$imusers).',buffers :'.count(self::$buffers).',connections :'.count(self::$connections).$logstr.' .';			
		$this->im_wlog($logstr); //写入连接错误日志
	}

	function ev_read($buffer, $id)
	{
		static $ct = 0;
		$ct_last = $ct;
		$ct_data = '';
		while ($read = event_buffer_read($buffer, 1024)) { //读取缓存事件中的数据
			$ct += strlen($read);
			$ct_data .= $read;
		}
		$ct_size = ($ct - $ct_last) * 8; //计算长度，下面没有用到
		$this->sockets_main_do($buffer,$id,$ct_data,$ct_size); //收到数据时做的操作入口
	}
	
	function ev_write($buffer, $id)
	{
		//echo "[$id] " . __METHOD__ . "\n";
	}

	function sockets_main_do($buffer,$id,$ct_data,$ct_size){
		$headers	=	$this->sockets_im_getheaders($ct_data,$buffer,$id); //解析是否为header头
		if($headers[0]){
			$this->sockets_im_dohand($buffer,$headers,$id); //连接浏览器websocket
		}else{
			if($newarr = $this->sockets_get_userArr($ct_data)){//解析用户数据
				if($newarr['to']){
					if($newarr && $newarr['st'] != substr($this->mk_md5($newarr['u'],$newarr['s']),6,8)){
						$this->ev_error($buffer,'',$id);
						return false;
					}
					switch($newarr['to']){
						case '1':
							//连接注册IM用户
							if(!$this->sockets_reg_imusers($newarr,$id,$buffer)){
								$this->ev_error($buffer,'',$id);
								return false;
							}
						break;
						default:
							//改变用户状态
							$jsonStr = json_encode(array('u'=>$newarr['u'],'f'=>$newarr['to']));
							if(self::$imusers[$newarr['u']] && $jsonStr){
								foreach(self::$imusers[$newarr['u']] as $val){
									if(self::$buffers[$val] && self::$buffers[$val] != $buffer){
										$this->sockets_im_send(self::$buffers[$val],$jsonStr);
									}
								}
							}
						break;
					}
				}else{
					$this->sockets_im_do($newarr); //用户发送消息操作
				}
			}
		}
	}
	//注册IM用户
	function sockets_reg_imusers($userdata,$id,$buffer){
		if(self::$imOnlyOne && self::$imusers[$userdata['u']]){
			$jsonStr = json_encode(array('u'=>$userdata['u'],'f'=>$userdata['u']));
			$this->sockets_im_send($buffer,$jsonStr);
			return false;
		}
		self::$imusers[$userdata['u']][] = $id; //添加IM注册用户数组
		self::$idtouser[$id] = $userdata['u']; //标记每一个连接号所连接的用户
		return true;
	}
	//收到消息后
	function sockets_im_do($newarr){
		//为用户还是群组或者讨论组
		$newarr['f'] = intval($newarr['f'])?intval($newarr['f']):$newarr['f'];
		$ftype = is_numeric($newarr['f'])?0:1;
		if($ftype){
			//当聊天对象为群组或讨论组时
			$ftypearr = explode('_',$newarr['f']);
			$newarr['f'] = $ftypearr[1];
			switch($ftypearr[0]){
				case 'g':
					$ftype = 1;
				break;
				case 'tg':
					$ftype = 2;
				break;
				default:
					return false;
				break;
			}
			return false;
		}
		if(substr($this->mk_md5($newarr['f'],$newarr['id']),6,8) != $newarr['vc']){return false;}
		$mtype = 0;//消息为文本
		$jsonStr = json_encode(array('u'=>$newarr['u'],'f'=>$newarr['f'],'id'=>$newarr['id']));
		if(self::$imusers[$newarr['f']] && $jsonStr){
			foreach(self::$imusers[$newarr['f']] as $val){
				if(self::$buffers[$val]){
					$this->sockets_im_send(self::$buffers[$val],$jsonStr);
				}
			}
		}
	}
	//给用户返回告知连接
	function sockets_im_dohand($buffer,$headers,$id){
		list($resource,$host,$origin,$strkey) = $headers;
			$strkey .= "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
			$hash_data = base64_encode(sha1($strkey,true));
			$upgrade  = "HTTP/1.1 101 Switching Protocols\r\n" .
						"Upgrade: websocket\r\n" .
						"Connection: Upgrade\r\n" .
						"WebSocket-Origin: " . $origin . "\r\n" .
						"WebSocket-Location: ws://" . $host . $resource . "\r\n" .
						"Sec-WebSocket-Accept: " . $hash_data . "\r\n" .
						"\r\n";
		event_buffer_write($buffer,$upgrade);
		return true;
	}
	function sockets_im_send($buffer,$msg){ //发送socket给用户
		$msg = $this->sockets_im_wrap($msg);//转换数据
		event_buffer_write($buffer,$msg);
		return true;
	}
	function sockets_im_getheaders($req,$buffer,$id){
		if (!preg_match('/<policy-file-request.*>/',$req)){ //若不是flash的scoket连接
			$r=$h=$o=$key=null;
			if(preg_match("/GET (.*) HTTP\/1\.1\r\n/"   ,$req,$match)){ $r=$match[1]; }
			if(preg_match("/Host: (.*)\r\n/"  ,$req,$match)){ $h=$match[1]; }
			if(preg_match("/Sec-WebSocket-Origin: (.*)\r\n/",$req,$match)){ $o=$match[1]; }
			if(!$o){
				if(preg_match("/Origin: (.*)\r\n/",$req,$match)){ $o=$match[1]; }
			}
			if(preg_match("/Sec-WebSocket-Key: (.*)\r\n/",$req,$match)){ $key=$match[1]; }
			return array($r,$h,$o,$key);
		}else{
			$this->sockets_im_gethand($buffer,$id);
			return array();
		}
	}
	//IEsocket协议用
	function sockets_im_gethand($buffer,$id){
		$policy = '<?xml version="1.0"?>' . "\n";
		$policy .= '<!DOCTYPE cross-domain-policy SYSTEM "http://www.macromedia.com/xml/dtds/cross-domain-policy.dtd">' . "\n";
		$policy .= '<cross-domain-policy>' . "\n";
		$policy .= '<allow-access-from domain="*" to-ports="*"/>' . "\n";
		$policy .= '</cross-domain-policy>' . "\n";
        stream_socket_sendto(self::$connections[$id], $policy);
		event_buffer_disable(self::$buffers[$id], EV_READ | EV_WRITE);
		event_buffer_free(self::$buffers[$id]);
		fclose(self::$connections[$id]); //释放socket
		unset(self::$buffers[$id], self::$connections[$id]);	
	}
	function sockets_im_ord_hex($data){
		$msg = "";
		$l = strlen($data);

		for ($i= 0; $i< $l; $i++) {
			$msg .= dechex(ord($data{$i}));
		}
		return $msg;
	}
	//转换数据传输
	function sockets_im_wrap($msg=""){
		$frame = array();
		$frame[0] = "81";
		$len = strlen($msg);
		$frame[1] = $len<16?"0".dechex($len):dechex($len);
		$frame[2] = $this->sockets_im_ord_hex($msg);
		$data = implode("",$frame);
		return pack("H*", $data);
	}
	//将接受的数据转换为可识别
	function sockets_im_unwrap($msg=""){
		$mask = array();
		$data = "";
		$msg = unpack("H*",$msg);
		$head = substr($msg[1],0,2);
		if (hexdec($head{1}) === 8) {
			$data = false;
		} else if (hexdec($head{1}) === 1) {
			$mask[] = hexdec(substr($msg[1],4,2));
			$mask[] = hexdec(substr($msg[1],6,2));
			$mask[] = hexdec(substr($msg[1],8,2));
			$mask[] = hexdec(substr($msg[1],10,2));

			$s = 12;
			$e = strlen($msg[1])-2;
			$n = 0;
			for ($i= $s; $i<= $e; $i+= 2) {
				$data .= chr($mask[$n%4]^hexdec(substr($msg[1],$i,2)));
				$n++;
			}
		}
		return $data;
	}
	//收到数据并转换成数组
	function sockets_get_userArr($ct_data){
		$ct_data = $this->sockets_im_unwrap($ct_data);
		$strarr = json_decode($ct_data,true);
		if(is_array($strarr)){
			return $strarr;
		}else{
			return false;
		}
	}
	//加密
	function mk_md5($s_code,$u_code) {
		return md5($s_code.$u_code.self::$checkCode);
	}

	function im_wlog($logs){
	  $webRoot=str_replace("\\","/",__DIR__)."/";
	  $time = date('Ymd');
	  $toppath=$webRoot.'/logs/IMlog'.$time.'.htm';
	  $Ts=fopen($toppath,"a+");
	  fputs($Ts,$logs."\r\n");
	  fclose($Ts);
	}
	function getnow(){
		return date('H:i:s');
	}	
}
new EpollSocketServer($imSocketUrl,$imSocketPort,$imOnlyOne,$checkCode);
