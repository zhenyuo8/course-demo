<?php
	ob_start();
	$html = <<<EOT
<li><img src="/images/face24/expression_ciya.png" title="龇牙"></li>
<li><img src="/images/face24/expression_haha.png" title="哈哈"></li>
<li><img src="/images/face24/expression_haix.png" title="害羞"></li>
<li><img src="/images/face24/expression_jingk.png" title="惊恐"></li>
<li><img src="/images/face24/expression_bye.png" title="拜拜"></li>
<li><img src="/images/face24/expression_crya.png" title="大哭"></li>
<li><img src="/images/face24/expression_bit.png" title="鼻涕"></li>
<li><img src="/images/face24/expression_hanb.png" title="汗"></li>
<li><img src="/images/face24/expression_hana.png" title="汗死"></li>
<li><img src="/images/face24/expression_kelian.png" title="可怜"></li>
<li><img src="/images/face24/expression_kissb.png" title="亲亲"></li>
<li><img src="/images/face24/expression_se.png" title="色"></li>
<li><img src="/images/face24/expression_tiaop.png" title="调皮"></li>
<li><img src="/images/face24/expression_toux.png" title="偷笑"></li>
<li><img src="/images/face24/expression_xia.png" title="吓到"></li>
<li><img src="/images/face24/expression_yiw.png" title="疑问"></li>
<li><img src="/images/face24/expression_yun.png" title="晕"></li>
<li><img src="/images/face24/expression_ok.png" title="ok"></li>
<li><img src="/images/face24/expression_yeak.png" title="yeak"></li>
<li><img src="/images/face24/expression_bait.png" title="拜托"></li>
<li><img src="/images/face24/expression_guz.png" title="鼓掌"></li>
<li><img src="/images/face24/expression_pray.png" title="祈祷"></li>
<li><img src="/images/face24/expression_wos.png" title="握手"></li>
<li><img src="/images/face24/expression_zan.png" title="赞"></li>
<li><img src="/images/face24/expression_ruo.png" title="弱"></li>
<li><img src="/images/face24/expression_quan.png" title="拳"></li>
<li><img src="/images/face24/expression_car.png" title="私家车"></li>
<li><img src="/images/face24/expression_bus.png" title="大巴"></li>
<li><img src="/images/face24/expression_train.png" title="火车"></li>
<li><img src="/images/face24/expression_plane.png" title="飞机"></li>
<li><img src="/images/face24/expression_shand.png" title="打闪"></li>
<li><img src="/images/face24/expression_rain.png" title="下雨"></li>
<li><img src="/images/face24/expression_snow.png" title="下雪"></li>
<li><img src="/images/face24/expression_umbre.png" title="雨伞"></li>
<li><img src="/images/face24/expression_rainb.png" title="彩虹"></li>
<li><img src="/images/face24/expression_cloudy.png" title="多云"></li>
<li><img src="/images/face24/expression_sunny.png" title="晴天"></li>
<li><img src="/images/face24/expression_tea.png" title="茶"></li>
<li><img src="/images/face24/expression_hanbao.png" title="汉堡"></li>
<li><img src="/images/face24/expression_rice.png" title="米饭"></li>
<li><img src="/images/face24/expression_beer.png" title="啤酒"></li>
<li><img src="/images/face24/expression_cake.png" title="蛋糕"></li>
<li><img src="/images/face24/expression_basket.png" title="篮球"></li>
<li><img src="/images/face24/expression_ball.png" title="足球"></li>
<li><img src="/images/face24/expression_taiq.png" title="台球"></li>
<li><img src="/images/face24/expression_yum.png" title="羽毛球"></li>
<li><img src="/images/face24/expression_zhad.png" title="炸弹"></li>
<li><img src="/images/face24/expression_qiq.png" title="气球"></li>
<li><img src="/images/face24/expression_xins.png" title="心碎"></li>
<li><img src="/images/face24/expression_med.png" title="药"></li>
<li><img src="/images/face24/expression_rose.png" title="玫瑰花"></li>
<li><img src="/images/face24/expression_heart.png" title="爱心"></li>
<li><img src="/images/face24/expression_kissa.png" title="吻"></li>
<li><img src="/images/face24/expression_box.png" title="礼盒"></li>
<li><img src="/images/face24/expression_zuan.png" title="钻石"></li>
<li><img src="/images/face24/expression_geili.png" title="给力"></li>
<li><img src="/images/face24/expression_jiong.png" title="囧"></li>
<li><img src="/images/face24/expression_mail.png" title="邮件"></li>
EOT;
	header('Content-Type: text/javascript; charset=utf-8');
	$html = str_replace('/images', $frontUrlImages . '/images', $html);
	$html = json_encode(array("facehtml" => $html));
	$callback = $_GET['callback'];
	if (empty($callback)) exit($html);
	else exit("$callback($html)");
?>