#!/bin/bash
# Check  imServer.php is runing
#最大进程,超过则重启
maxpids=800
#检查进程时间间隔
interval=600
#日志文件
logfile="./checkim.log"
pidfile="./checkim.pid"
pid=$(ps x| grep "checkim.sh" | grep -v grep | sed -n '1p' | awk '{print $1}')
echo $pid > $pidfile
while [ 1 ]
do
pnums=$(netstat -an | grep :8069 | grep -v grep | wc -l)
if [ "$pnums" = "0" ]; then
sleep 5
echo "**********************************************"  >> $logfile
echo "———Starting imServer.php—————"  >> $logfile
date  >> $logfile
php imServer.php  >> $logfile
fi
if [ $pnums -gt $maxpids ]; then
echo "**********************************************"  >> $logfile
echo "Too much pids: $pnums ..Re Starting imServer.php…."  >> $logfile
date  >> $logfile
pidof php imServer.php | xargs kill -9  >> $logfile
sleep 60
php imServer.php >> $logfile
sleep 2
fi
sleep $interval
done