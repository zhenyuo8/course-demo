var WebPush=function(b){this.callbacks={};this.url=b;this.connected=false;this.retries=0;this.connect();this.aollowDo=true;var a=this};WebPush.prototype={connect:function(){WebPush.allow_reconnect=true;var a=this;if(window.WebSocket){this.connection=new WebSocket(this.url);this.connection.onmessage=function(){a.onmessage.apply(a,arguments)};this.connection.onclose=function(){a.onclose.apply(a,arguments)};this.connection.onopen=function(){a.onopen.apply(a,arguments)};this.connection.onerror=function(){a.onerror.apply(a,arguments)}}else{this.connection={};if(WebPush.aollowDo){setTimeout(function(){a.dispatch("connection_failed",{})},3000)}}},disconnect:function(){WebPush.log("连接失败");WebPush.allow_reconnect=false;WebPush.retries=0;this.connection.close()},bind:function(a,b){this.callbacks[a]=this.callbacks[a]||[];this.callbacks[a].push(b);return this},dispatch:function(d,c){var b=this.callbacks[d];if(b){for(var a=0;a<b.length;a++){b[a](c)}}else{}},send:function(a){this.connection.send(a)},onmessage:function(a){this.dispatch("message",a.data)},onclose:function(){var a=this;this.dispatch("close",null);WebPush.log("连接关闭");var b=5000;if(this.connected==true){this.dispatch("connection_disconnected",{});if(WebPush.aollowDo&&WebPush.allow_reconnect){WebPush.log("5秒后自动连接...");setTimeout(function(){a.connect()},b)}}else{a.dispatch("connection_failed",{});this.retries=this.retries+1;if(WebPush.aollowDo){setTimeout(function(){a.connect()},b)}if(this.retries==0){b=100}}this.connected=false},onopen:function(){this.dispatch("open",null)},onerror:function(a){}};WebPush.log=function(a){};WebPush.allow_reconnect=true;