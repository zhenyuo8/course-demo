var YY=YY||{};YY.uploadBaseSettings={flash_url:YY.util.url("/"+YY.util.jsDir+"/plugin/swfupload/swfupload.swf"),upload_url:"",file_post_name:"filedata",post_params:{sessid:sessid},file_size_limit:"20 MB",file_types_description:"All Files",file_upload_limit:100,file_queue_limit:10,debug:false,button_image_url:"http://",button_width:"150",button_height:"20",button_placeholder_id:"spanButtonPlaceHolder",button_text:"选择文件",button_text_left_padding:0,button_text_top_padding:4,button_cursor:SWFUpload.CURSOR.HAND,button_window_mode:SWFUpload.WINDOW_MODE.TRANSPARENT,prevent_swf_caching:false};function SetupUploadHandler(settings,newUi){settings=settings||{};newUi=newUi||{};var me=this,$uploadBlock=null,$processContainer=null,$processBar=null,$processCancel=null,$uploadedFileList=null;var trace_debug=false;if(typeof settings.trace_debug!=="undefined"){trace_debug=settings.trace_debug;delete settings.trace_debug}if(typeof me.fileQueued!=="function"){SetupUploadHandler.prototype.fileQueued=function(file){try{trace_debug&&YY.util.trace(1);$uploadBlock=$("#"+this.movieName).closest(me.ui.uploadBlock);$processContainer=$(me.ui.processContainer,$uploadBlock);$processBar=$(me.ui.processBar,$processContainer);$uploadedFileList=$(me.ui.uploadedFileList,$uploadBlock);var progress=new FileProgress(file,this.customSettings.progressTarget);progress.setStatus("Pending...");progress.toggleCancel(true,this)}catch(ex){this.debug(ex)}};SetupUploadHandler.prototype.fileQueueError=function(file,errorCode,message){try{trace_debug&&YY.util.trace(2);if(errorCode===SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED){alert("您只能上传"+(message>1?message:1)+"个文件");return}var progress=new FileProgress(file,this.customSettings.progressTarget);progress.setError();progress.toggleCancel(false);switch(errorCode){case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:progress.setStatus("File is too big.");alert("文件过大!，请上传小于"+this.settings.file_size_limit+"的文件");this.debug("Error Code: File too big, File name: "+file.name+", File size: "+file.size+", Message: "+message);break;case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:progress.setStatus("Cannot upload Zero Byte files.");alert("不能上传 0 字节的文件");this.debug("Error Code: Zero byte file, File name: "+file.name+", File size: "+file.size+", Message: "+message);break;case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:progress.setStatus("Invalid File Type.");alert("非法的文件格式");this.debug("Error Code: Invalid File Type, File name: "+file.name+", File size: "+file.size+", Message: "+message);break;default:if(file!==null){progress.setStatus("Unhandled Error")}this.debug("Error Code: "+errorCode+", File name: "+file.name+", File size: "+file.size+", Message: "+message);break}}catch(ex){this.debug(ex)}};SetupUploadHandler.prototype.fileDialogComplete=function(numFilesSelected,numFilesQueued){try{trace_debug&&YY.util.trace(3);this.startUpload()}catch(ex){this.debug(ex)}};SetupUploadHandler.prototype.uploadStart=function(file){try{trace_debug&&YY.util.trace(4);$processContainer.show();$processBar.css("width","0%");$(".yy-replySubmit, #savesubmit",$uploadBlock).attr("disabled","disabled");var progress=new FileProgress(file);progress.setStatus("Uploading...");progress.toggleCancel(true,this)}catch(ex){}return true};SetupUploadHandler.prototype.uploadProgress=function(file,bytesLoaded,bytesTotal){try{trace_debug&&YY.util.trace(5);var percent=Math.ceil((bytesLoaded/bytesTotal)*100);$processBar.css("width",percent+"%");var progress=new FileProgress(file,this.customSettings.progressTarget);progress.setProgress(percent);progress.setStatus("Uploading...")}catch(ex){this.debug(ex)}};SetupUploadHandler.prototype.uploadSuccess=function(file,serverData){try{trace_debug&&YY.util.trace(6);var progress=new FileProgress(file,this.customSettings.progressTarget);progress.setComplete();progress.setStatus("Complete.");progress.toggleCancel(false);$processContainer.fadeOut(me.disappearTime);if(serverData!="false"){var dataObj=eval("("+serverData+")");me.createFileContainer(dataObj[0],dataObj[1],dataObj[2],dataObj[3],dataObj[4],this.movieName)}else{var $note=$("<li class='upClue'>请上传以下格式的文件:<br>'doc','docx','bmp','ppt','pptx','xls','xlsx','pot','potx','pps','ppsx','wps','wpsx','dps','wpt','dpt','txt','pdf', 'rar', 'zip', 'mp3', 'flv', 'wma', 'csv', 'csvx', 'mdb', 'tar'</li>");$note.appendTo($uploadedFileList);$uploadedFileList.show();setTimeout(function(){$note.remove()},12000)}$(".yy-replySubmit, #savesubmit",$uploadBlock).removeAttr("disabled")}catch(ex){this.debug(ex)}};SetupUploadHandler.prototype.uploadError=function(file,errorCode,message){try{trace_debug&&YY.util.trace(7);var progress=new FileProgress(file,this.customSettings.progressTarget);progress.setError();progress.toggleCancel(false);$processContainer.fadeOut(me.disappearTime);switch(errorCode){case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:progress.setStatus("Upload Error: "+message);this.debug("Error Code: HTTP Error, File name: "+file.name+", Message: "+message);break;case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:progress.setStatus("Upload Failed.");this.debug("Error Code: Upload Failed, File name: "+file.name+", File size: "+file.size+", Message: "+message);break;case SWFUpload.UPLOAD_ERROR.IO_ERROR:progress.setStatus("Server (IO) Error");this.debug("Error Code: IO Error, File name: "+file.name+", Message: "+message);break;case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:progress.setStatus("Security Error");this.debug("Error Code: Security Error, File name: "+file.name+", Message: "+message);break;case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:progress.setStatus("Upload limit exceeded.");this.debug("Error Code: Upload Limit Exceeded, File name: "+file.name+", File size: "+file.size+", Message: "+message);break;case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:progress.setStatus("Failed Validation.  Upload skipped.");this.debug("Error Code: File Validation Failed, File name: "+file.name+", File size: "+file.size+", Message: "+message);break;case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:if(this.getStats().files_queued===0){document.getElementById(this.customSettings.cancelButtonId).disabled=true}progress.setStatus("Cancelled");progress.setCancelled();break;case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:progress.setStatus("Stopped");break;default:progress.setStatus("Unhandled Error: "+errorCode);this.debug("Error Code: "+errorCode+", File name: "+file.name+", File size: "+file.size+", Message: "+message);break}}catch(ex){this.debug(ex)}};SetupUploadHandler.prototype.uploadComplete=function(file){trace_debug&&YY.util.trace(8);if(this.getStats().files_queued===0){}};SetupUploadHandler.prototype.queueComplete=function(numFilesUploaded){trace_debug&&YY.util.trace(9)};SetupUploadHandler.prototype.createFileContainer=function(fid,filename,fvid,thumbSrc,imgSrc,mvname){trace_debug&&YY.util.trace(10);$uploadedFileList.fadeIn(me.disappearTime);var $uploadedFileItem=$('<li class="clearfix '+(me.ui.uploadedFileItem).substr(1)+'"></li>'),input=$uploadBlock.find('input[name="fids"]');$uploadedFileItem.append('<div class="clearfix"><span>'+filename+'</span> <a href="javascript:;" class="yy-uploaded-file-delete fr">×</a></div>');$uploadedFileList.append($uploadedFileItem);me.changeFileIds(fid,"+",input);var convert_url=(((typeof me.settings.convert_url!=="undefined")&&me.settings.convert_url)?YY.util.url(me.settings.convert_url):YY.util.url("/file/act/convert"))+"/fvid/"+fvid[2];YY.util.ajaxApi(convert_url,function(d,s){if(d==1){$uploadedFileItem.children("div").eq(0).append('<a href="javascript:;" class="fr mr10 yy-uploaded-file-info">详情<i class="ico_xSJ"></i></a>');$uploadedFileItem.append('<div style="display:none;" class="clearfix mt10"><div class="img fl cyAddico"><img src="'+fvid[3]+'"><div class="message_pic_bj"></div><div class="message_pic"><a class="yl yy-showpic" title="预览" href="'+fvid[4]+'"></a></div></div></div>')}else{if(d==2){}else{}}if(fvid[5]&&fvid[6]){var name="remote-file-info-"+fid;$uploadedFileItem.append('<div style="display:none;" class="'+name+'"> <input type="hidden" name="fileInfo[name][]" value="'+fvid[5]+'" > <input type="hidden" name="fileInfo[url][]" value="'+fvid[6]+'"></div>')}$uploadedFileItem.find("a.yy-uploaded-file-delete").bind("click",{item:$uploadedFileItem,fid:fid,input:input},me.delThisFile)},"GET")};SetupUploadHandler.prototype.delThisFile=function(event){trace_debug&&YY.util.trace(11);var data=event.data;data.item.fadeOut(me.disappearTime,function(){$(this).remove();me.changeFileIds(data.fid,"-",data.input)});$uploadedFileList.remove(".remote-file-info-"+data.fid)};SetupUploadHandler.prototype.changeFileIds=function(fid,type,input){trace_debug&&YY.util.trace(12);if(!fid){return}var obj=input,value=obj.val();if(type=="-"){if(value){var varr=value.split(","),varrtmp=[],vleng=varr.length,i=0;for(;i<vleng;i++){if(varr[i]!=fid){varrtmp[i]=varr[i]}}obj.val(varrtmp.join(","))}}else{if(type=="+"){if(value==""){obj.val(value+fid)}else{obj.val(value+","+fid)}}}}}var eventHandler={file_queued_handler:me.fileQueued,file_queue_error_handler:me.fileQueueError,file_dialog_complete_handler:me.fileDialogComplete,upload_start_handler:me.uploadStart,upload_progress_handler:me.uploadProgress,upload_error_handler:me.uploadError,upload_success_handler:me.uploadSuccess,upload_complete_handler:me.uploadComplete,queue_complete_handler:me.queueComplete},defaultUi={uploadBlock:".yy-upload-block",processContainer:".yy-upload-process-container",processBar:".yy-upload-process-bar",processCancel:".yy-upload-process-cancel",uploadedFileList:".yy-uploaded-file-list",uploadedFileItem:".yy-uploaded-file-item",uploadedFileDelete:".yy-uploaded-file-delete"},defaultSettings=YY.uploadBaseSettings;me.disappearTime=1000;me.settings=$.extend({},defaultSettings,eventHandler,settings);me.ui=$.extend({},defaultUi,newUi)}function FileProgress(b){this.fileProgressID=b.id;this.opacity=100;this.height=0;this.fileProgressWrapper=document.getElementById(this.fileProgressID);if(!this.fileProgressWrapper){this.fileProgressWrapper=document.createElement("div");this.fileProgressWrapper.className="progressWrapper";this.fileProgressWrapper.id=this.fileProgressID;this.fileProgressElement=document.createElement("div");this.fileProgressElement.className="progressContainer";var e=document.createElement("a");e.className="progressCancel";e.href="#";e.style.visibility="hidden";e.appendChild(document.createTextNode(" "));var a=document.createElement("div");a.className="progressName";a.appendChild(document.createTextNode(b.name));var d=document.createElement("div");d.className="progressBarInProgress";var c=document.createElement("div");c.className="progressBarStatus";c.innerHTML="&nbsp;";this.fileProgressElement.appendChild(e);this.fileProgressElement.appendChild(a);this.fileProgressElement.appendChild(c);this.fileProgressElement.appendChild(d);this.fileProgressWrapper.appendChild(this.fileProgressElement)}else{this.fileProgressElement=this.fileProgressWrapper.firstChild;this.reset()}this.height=this.fileProgressWrapper.offsetHeight;this.setTimer(null)}FileProgress.prototype.setTimer=function(a){this.fileProgressElement.FP_TIMER=a};FileProgress.prototype.getTimer=function(a){return this.fileProgressElement.FP_TIMER||null};FileProgress.prototype.reset=function(){this.fileProgressElement.className="progressContainer";this.fileProgressElement.childNodes[2].innerHTML="&nbsp;";this.fileProgressElement.childNodes[2].className="progressBarStatus";this.fileProgressElement.childNodes[3].className="progressBarInProgress";this.fileProgressElement.childNodes[3].style.width="0%";this.appear()};FileProgress.prototype.setProgress=function(a){this.fileProgressElement.className="progressContainer green";this.fileProgressElement.childNodes[3].className="progressBarInProgress";this.fileProgressElement.childNodes[3].style.width=a+"%";this.appear()};FileProgress.prototype.setComplete=function(){this.fileProgressElement.className="progressContainer blue";this.fileProgressElement.childNodes[3].className="progressBarComplete";this.fileProgressElement.childNodes[3].style.width="";var a=this;this.setTimer(setTimeout(function(){a.disappear()},10000))};FileProgress.prototype.setError=function(){this.fileProgressElement.className="progressContainer red";this.fileProgressElement.childNodes[3].className="progressBarError";this.fileProgressElement.childNodes[3].style.width="";var a=this;this.setTimer(setTimeout(function(){a.disappear()},5000))};FileProgress.prototype.setCancelled=function(){this.fileProgressElement.className="progressContainer";this.fileProgressElement.childNodes[3].className="progressBarError";this.fileProgressElement.childNodes[3].style.width="";var a=this;this.setTimer(setTimeout(function(){a.disappear()},2000))};FileProgress.prototype.setStatus=function(a){this.fileProgressElement.childNodes[2].innerHTML=a};FileProgress.prototype.toggleCancel=function(b,c){this.fileProgressElement.childNodes[0].style.visibility=b?"visible":"hidden";if(c){var a=this.fileProgressID;this.fileProgressElement.childNodes[0].onclick=function(){c.cancelUpload(a);return false}}};FileProgress.prototype.appear=function(){if(this.getTimer()!==null){clearTimeout(this.getTimer());this.setTimer(null)}if(this.fileProgressWrapper.filters){try{this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity=100}catch(a){this.fileProgressWrapper.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity=100)"}}else{this.fileProgressWrapper.style.opacity=1}this.fileProgressWrapper.style.height="";this.height=this.fileProgressWrapper.offsetHeight;this.opacity=100;this.fileProgressWrapper.style.display=""};FileProgress.prototype.disappear=function(){var f=15;var c=4;var b=30;if(this.opacity>0){this.opacity-=f;if(this.opacity<0){this.opacity=0}if(this.fileProgressWrapper.filters){try{this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity=this.opacity}catch(d){this.fileProgressWrapper.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+this.opacity+")"}}else{this.fileProgressWrapper.style.opacity=this.opacity/100}}if(this.height>0){this.height-=c;if(this.height<0){this.height=0}this.fileProgressWrapper.style.height=this.height+"px"}if(this.height>0||this.opacity>0){var a=this;this.setTimer(setTimeout(function(){a.disappear()},b))}else{this.fileProgressWrapper.style.display="none";this.setTimer(null)}};function InitUpload(c,b){var e=new SetupUploadHandler(c,b),f=e.settings.button_placeholder_id;this.SWFUploadInst=null;if(f&&$("#"+f).length){var a=new SWFUpload(e.settings),d=$(e.ui.processCancel);this.SWFUploadInst=a;d.live({click:function(){a.cancelQueue()}})}}InitUpload.prototype.setURl=function(a){a=YY.util.url(a);this.SWFUploadInst.SWFUpload(a)};