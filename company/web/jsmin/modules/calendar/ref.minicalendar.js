var RefMiniCalendar=function(c,b){var a=this;a.df_calOption={};a.df_tipOption={};a.miniCal=null;a.miniCalTip=null;$.extend(a.df_calOption,c);$.extend(a.df_tipOption,b);a.render=function(){a.miniCal={};YY.util.loadScript(["modules/calendar/yy.minicalendar.js"],{fn:function(){a.miniCal=new YY.MiniCalendar({selector:a.df_calOption.selector,day_attr:a.df_calOption.day_attr,rel:a.df_calOption.ref});a.miniCal.init()}});return a.miniCal};a.bind=function(){YY.util.loadScript(["plugin/yy.tips.js"],{fn:function(){a.miniCalTip=new YY.Tips({position:a.df_tipOption.position,wrapper:a.df_tipOption.wrapper,tipClass:a.df_tipOption.tipClass,remote:a.df_tipOption.remote,events:a.df_tipOption.events});a.miniCalTip.init()}});return a.miniCalTip};a.init=function(){a.render();a.bind();return{cal:a.miniCal,tip:a.miniCalTip}}};