$.extend({dataContent:{yy:{}},namespace:function(b,g){var f=b.split("."),e=$.dataContent.yy,d,c=f[0]=="yy"?1:0,a=f.length;for(;c<a;c++){d=f[c];if(c==(a-1)){if(g){e[d]=g;return e}else{return e[d]}}else{if(!e[d]&&g){e[d]={}}}e=e[d]}return undefined},getUnique:(function(){var a=0;return function(){return a++}})(),getId:function(){return"e"+this.getUnique()}});(function(b){var a=0;b.Class=function(h,i,e,f){var d=arguments.length,f=d==4?f:e,g=function(){return this.init.apply(this,arguments)};b.namespace(h,g);if(f){b.Class.extend(g,b.namespace(f));if(i.init){var c=i.init;i.init=function(){g.superConstructor.call(this,arguments);c.apply(this,arguments)}}}if(d==4){e=e||{};e.getInstance=function(){return new g()};b.extend(g,e||{})}i=i||{};i.init=i.init||function(){};i.constructor=g;b.extend(g.prototype,i);return g};b.Class.extend=function(g,d){var e=function(){},c=null;e.prototype=d.prototype;e.prototype.constructor=g;c=new e();if(c.init){g.superConstructor=c.init;delete c.init}else{g.superConstructor=d}g.prototype=c};b.Class.proxy=function(d,c){return func.apply(d,c)};b.newInstance=function(c,d){return new (b.namespace(c))(d)};b.getClass=function(c){return b.namespace(c)};b.getKey=function(){return a++}})($);