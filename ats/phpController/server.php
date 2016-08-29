<?php
error_reporting(E_ALL);
set_time_limit(0);
//echo "<h2>TCP/IP Connection</h2>\n";

$port = 11332;
$ip = "10.35.32.146";

/*
 +-------------------------------
 *    @socket连接整个过程
 +-------------------------------
 *    @socket_create
 *    @socket_connect
 *    @socket_write
 *    @socket_read
 *    @socket_close
 +--------------------------------
 */

$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
if ($socket < 0) {
    //echo "socket_create() failed: reason: " . socket_strerror($socket) . "\n";
}else {
    //echo "OK.\n";
}

//echo "try to connect '$ip' port '$port'...\n";
$result = socket_connect($socket, $ip, $port);
if ($result < 0) {
    //echo "socket_connect() failed.\nReason: ($result) " . socket_strerror($result) . "\n";
}else {
    //echo "connect success\n";
}

$in = "/R/RECORD/";
$out = '';

if(!socket_write($socket, $in, strlen($in))) {
    //echo "socket_write() failed: reason: " . socket_strerror($socket) . "\n";
}else {
    //echo "send request success\n";
    //echo "request:<font color='red'>$in</font> <br>";
}
$out="";
while($tmpout = socket_read($socket, 102400, PHP_NORMAL_READ)) {
	if ($tmpout == "\r"){
		break;
	}
	$out = $out.$tmpout;
    //echo "receive response message from server\n";
    //echo "response:",$out;
}


//echo "close SOCKET...\n";
socket_close($socket);
//echo "close OK\n";
echo $out;
?>