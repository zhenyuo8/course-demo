(function(d,a,b){function c(e){var g=this;var f=c.prototype;if(typeof g.defaults==="undefined"){f.setRemoteUrl=function(h){g.options.remoteUrl=h};f.setPerPage=function(h){g.options.perPage=h};f.getPerPage=function(){return g.options.perPage};f.setToPage=function(h){g.toPage=parseInt(h)};f.getToPage=function(){return g.toPage};f.resetDataCache=function(){g.dataCache={page:{}}};f.reloadTable=function(h,i){if(typeof h==="function"){i=h;h=null}h&&g.setPerPage(h);g.setToPage(1);g.resetDataCache();delete g.totalPage;g.renderBody(i)};f.resetPageDataCache=function(){g.dataCache.page={}};f.reloadBody=function(h){h&&g.setPerPage(h);g.setToPage(1);g.resetPageDataCache();g.renderBody()};f.getRemoteData=function(l){var j=g.options.remoteUrl,k=g.getToPage(),i=g.getPerPage();var h=g.param_data;g.setParamData("p",k);g.setParamData("per",i);typeof g.dataCache.totalNum==="undefined"?g.setParamData("total",true):g.delParamData("total");typeof g.dataCache.head==="undefined"?g.setParamData("head",true):g.delParamData("head");if(j==""){return}b.ajaxApi(j,function(n,m){if(m==="success"&&n&&typeof n==="object"&&n.rs===true){if(typeof n.data.total!=="undefined"){g.dataCache.totalNum=n.data.total;(parseInt(n.data.total)>0)?g.renderPage(g.options.pageCount):g.removePage()}if(typeof n.data.head!=="undefined"){g.dataCache.head=n.data.head;if(typeof n.data.total!=="undefined"){g.renderHead()}}g.dataCache.page[k]=n.data.table;l(n.data.table)}},"GET","json",h)};f.concateBody=function(o){var k="",n=o.length;for(var m=0;m<n;m++){var h=o[m],p=h.length;k+="<tr"+(m%2===0?' class="odd"':"")+">";for(var l=0;l<p;l++){k+="<td>"+h[l]+"</td>"}k+="</tr>"}return k};f.addBodyStr=function(i,j){var h=g.$tbody;h.html(i);typeof j==="function"&&j()};f.renderBody=function(l){var j=g.toPage,k=g.dataCache.page[j],i=g.options.pageCount,h="";g.curPage=j;if(typeof k!=="undefined"){h=g.concateBody(k);g.addBodyStr(h,l)}else{g.getRemoteData(function(m){h=g.concateBody(m);g.addBodyStr(h,l)})}g.renderPage(i)};f.renderFoot=function(){};f.removeHead=function(){var i=g.$selector;i.hide();var h=i.siblings(".noData");!!h.length?h.show():i.after('<div class="noData">暂时还没有文档</div>')};f.renderHead=function(){var o=typeof g.dataCache.head!=="undefined"?g.dataCache.head:g.options.thead,n=0;if(o instanceof Array&&(n=o.length)){var q=g.$selector,j="",h=["desc","asc"],r,m,l="sort";var p=g.param_data;for(var k=0;k<n;k++){r=(typeof o[k]["isSort"]!=="undefined"&&!!o[k]["isSort"])?true:false;if(r){l="sort";if(o[k]["isSortBoth"]){l+=" sort-both"}m=(d.inArray(o[k]["sort"],h)!==-1)?o[k]["sort"]:"";if(!!m){l+=" sort-"+m;p[o[k]["name"]]=m}}j+='<th class="'+(typeof o[k]["css"]==="string"?o[k]["css"]+" ":"")+(r?l:"")+'" '+(typeof o[k]["name"]==="string"?'name="'+o[k]["name"]+'"':"")+(typeof o[k]["styles"]!=="undefined"?'style="'+o[k]["styles"]+'"':"")+">"+o[k]["title"]+"</th>"}q.show().find("thead>tr").html(j);d(".noData").remove()}};f.removePage=function(){var h=g.options;d(h.actLine).hide()};f.renderPage=function(o){o=o||5;var s=g.dataCache.totalNum,q=g.getPerPage(),p=g.curPage;if(!s){return}var n=Math.ceil(s/q),k=Math.ceil(o/2);if(typeof g.totalPage==="undefined"){g.totalPage=n}var h="<a>"+s+"</a>";if(n>o){h+=p>k?'<a class="yy-first first" href="javascript:;">1 ...</a>':""}h+=p===1?"":'<a class="yy-prev-page pageLeft" href="javascript:;">上一页</a>';var r,t;if(p<k){r=p-1;t=(n>o)?(o-r-1):(n-r-1)}else{if((p+k-1)>n){t=n-p;r=(n>o)?(o-t-1):(n-t-1)}else{t=r=k-1}}for(var m=r;m>0;m--){h+='<a class="yy-page" href="javascript:;">'+(p-m)+"</a>"}h+='<a class="yy-page pCur" href="javascript:;">'+p+"</a>";for(var l=1;l<=t;l++){h+='<a class="yy-page" href="javascript:;">'+(p+l)+"</a>"}h+=(p===n?"":'<a class="yy-next-page pageRight" href="javascript:;">下一页</a>');if(n>o){h+=o%2===0?(p<(n-k)?'<a class="yy-last last" href="javascript:;">... '+n+"</a>":""):(p<=(n-k)?'<a class="yy-last last" href="javascript:;">... '+n+"</a>":"")}var u=g.options;if(n===1){h="";d(u.actLine).hide()}else{d(u.actLine).show()}d(u.pageLine).html(h)};f.render=function(h){g.renderBody(h);g.renderFoot();g.bindEvent()};f.bindEvent=function(){var i=g.$selector,h=g.options;i.on({click:function(o){var k=d(o.target),j=null;if((j=k.closest(".sort")).length){var l=j.attr("name"),p=!!j.hasClass("sort-desc"),n=!!j.hasClass("sort-asc"),m=!!j.hasClass("sort-both");if(p||n){if(m){j.toggleClass("sort-desc sort-asc").siblings().removeClass("sort-desc sort-asc");g.resetParamData();p?g.setParamData(l,"asc"):g.setParamData(l,"desc");g.reloadBody()}}else{j.addClass("sort-desc").siblings().removeClass("sort-desc sort-asc");g.resetParamData();g.setParamData(l,"desc");g.reloadBody()}return false}}});d(h.actLine).on({click:function(q){var l=d(q.target),s=null;var j=h.nextBtn,m=h.prevBtn,n=h.pageBtn,p=h.firstBtn,k=h.lastBtn;var r=g.toPage;if((s=l.closest(j)).length){g.setToPage(r+1);g.renderBody()}if((s=l.closest(m)).length){if(r===1){return false}g.setToPage(r-1);g.renderBody()}if((s=l.closest(n)).length){g.setToPage(s.text());g.renderBody()}if((s=l.closest(p)).length){g.setToPage(1);g.renderBody()}if((s=l.closest(k)).length){var o=g.totalPage;g.setToPage(o);g.renderBody()}}})};f.resetParamData=function(){var i=["head","p","per","total"],h=g.param_data;h.p=1;d.each(h,function(l,j){if(d.inArray(l,i)===-1){g.delParamData(l)}})};f.setParamData=function(h,i){g.param_data[h]=i};f.delParamData=function(h){if(typeof g.param_data[h]==="undefined"){return}delete g.param_data[h]};f.defaults={selector:"#yyDataTable",actLine:"#yyActLine",pageLine:".yy-page-line",pageBtn:".yy-page",nextBtn:".yy-next-page",prevBtn:".yy-prev-page",firstBtn:".yy-first",lastBtn:".yy-last",thead:[],tfoot:[],perPage:15,pageCount:5,remoteUrl:"",isOnce:false,success:function(){}}}g.options=d.extend({},g.defaults,e);g.$selector=d(g.options.selector);g.$tbody=d("tbody",g.$selector);g.param_data={};g.dataCache={page:{}};g.setToPage(1);g.render(g.options.success)}a.DataTable=c}(jQuery,YY,YY.util));