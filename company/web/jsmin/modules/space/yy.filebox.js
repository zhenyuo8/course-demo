function getContent(a){YY.util.ajaxApi(a,function(b){var c=$("#selectedfileTable");c.html("");$(b).appendTo(c)},"POST","html")}function resetSelected(){$("#selectedfileAdd").removeClass("blueButton").addClass("grayButton");$(".yy-attatchment-tr","#selectedfileTable").removeClass("yy-attatchment-selected")}$("#selectedfileClose").live("click",function(){$.fancybox.close()});$(".yy-file-selected-link","#selectedfileAside").live("click",function(){$(".selectTkContL a").removeClass("cur");$(this).addClass("cur");var a=$(this).attr("href");getContent(a);resetSelected();return false});$(".yy-attatchment-tr").live("click",function(){$("#selectedfileAdd").removeClass("grayButton").addClass("blueButton");$(".yy-attatchment-tr","#selectedfileTable").removeClass("yy-attatchment-selected");$(this).addClass("yy-attatchment-selected");return false});$("#selectedFileCancel").live("click",function(){resetSelected();return false});$("#selectedfileAdd").live("click",function(){if($("#selectedfileAdd").hasClass("grayButton")){return false}$("#selectedfileClose").trigger("click")});