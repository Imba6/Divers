!function(global){var DS,VIQTag,OP,LOP,Utils,CT,GLOBAL;Utils={parseUri:function(a){for(var b={strictMode:!1,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}},c=b.parser[b.strictMode?"strict":"loose"].exec(a),d={},e=14;e--;)d[b.key[e]]=c[e]||"";return d[b.q.name]={},d[b.key[12]].replace(b.q.parser,function(a,c,e){c&&(d[b.q.name][c]=e)}),d},runop:function(a){return 0==a.o.indexOf("!")?!OP[a.o.substring(1)].f(a):OP[a.o].f(a)},andorLOP:function(a,b){for(var c,d=0;d<a.length;d++){var e=a[d],f="o"in e?this.runop(e):VIQTag.rtl(e);c=void 0===c?f:"AND"==b?c&&f:c||f}return void 0===c?!1:c},tcexec:function(a,b){var c=a.match(/{{\s*[\w\.]+\s*}}/g);if(c)for(var d=c.length;d--;){var e=c[d].match(/[\w\.]+/)[0],f="";"object"==typeof b[e]?(f=DS[b[e].ds].f(b,e),"factory"in b[e]&&(f=window[b[e].factory](f))):f=b[e],f=void 0==f?"":f,a=a.split(c[d]).join(f)}return a},tc:function(a,b){if(this.isArray(a)){for(var c=[],d=0;d<a.length;d++)c.push(this.tcexec(a[d],b));return c}return this.tcexec(a,b)},isArray:function(a){return"[object Array]"===Object.prototype.toString.call(a)}},DS={URI:{f:function(a,b,c){var d=b;if("p"in a){if(1!=c&&(d=Utils.parseUri(b)),"queryKey"in d)for(var e in d.queryKey)e.toLowerCase()in d.queryKey||"ck"in a&&1==a.ck||(d.queryKey[e.toLowerCase()]=d.queryKey[e]);for(var f=0;f<a.p.length;f++)d=f==a.p.length-1?"ck"in a&&1==a.ck?d[a.p[f]]:d[a.p[f].toLowerCase()]:d[a.p[f]]}if("cv"in a&&1==a.cv||(d="string"==typeof d?d.toLowerCase():d),"e"in a&&!isNaN(Number(a.e)))for(var g=0;g<a.e;g++)d=encodeURIComponent(d);return d}},RU:{f:function(a,b){var c=a[b];return DS.URI.f(c,document.referrer)}},LP:{f:function(a,b){var c=a[b];return DS.URI.f(c,document.URL)}},C:{f:function(a,b){var c=document.cookie,d=a[b],e={queryKey:{}};c=c.split("; ");for(var f=0;f<c.length;f++){var g=c[f].split("=");2==g.length?e.queryKey[g[0]]=g[1]:""}return DS.URI.f(d,e,!0)}},JS:{f:function(a,b){var c=a[b];if("p"in c){var d=c.p[0];if("r"==d){var e=Math.random();return~~(1e7*(.1>e?e+.1:e))}if("ep"==d)return(new Date).getTime()}return""}},S:{f:function(a,b){var c=a[b],d="";if("v"in c&&(d=Utils.tc(c.v,a)),"e"in c&&!isNaN(Number(c.e)))for(var e=0;e<c.e;e++)d=encodeURIComponent(d);return d}},D:{f:function(_dp,_k){var _dpo=_dp[_k];if("p"in _dpo&&_dpo.p.length>0)try{var _str=_dpo.p[0],_pv=_str.split(".")[0];return"document"!==_pv&&"window"!==_pv&&(_str="window."+_str),eval(_str)}catch(err){return void 0}return void 0}}},OP={"==":{f:function(a){return a.cval==a.k?!0:!1}},"in":{f:function(a){if(void 0==a.cval)return!1;var b=a.k;Utils.isArray(b)||(b=[b]);for(var c=!1,d=0;d<b.length;d++)if(-1!=a.cval.indexOf(b[d])){c=!0;break}return c}},inN:{f:function(a){if(void 0==a.cval)return!1;for(var b=a.k,c=!1,d=0;d<b.length;d++)if(-1!=a.cval.indexOf(b[d])){c=!0;break}return c}},Ain:{f:function(a){if(void 0==a.cval)return!1;for(var b=a.k,c=!0,d=0;d<b.length;d++)if(-1==a.cval.indexOf(b[d])){c=!1;break}return c}},ex:{f:function(a){return void 0===a.cval?!1:!0}}},LOP={E:{f:function(a){return a.length>0?Utils.runop(a[0]):!1}},AND:{f:function(a){return Utils.andorLOP(a,"AND")}},OR:{f:function(a){return Utils.andorLOP(a,"OR")}}},CT={url:function(a,b){var c=Utils.tc(b.tasks.url[a],b.dp);GLOBAL.resq.push({url:c});var d=new Image;return d.src=c,d.onload=d.onerror=function(){GLOBAL.asyncprogress()},!0},logics:function(a,b){return VIQTag.execLogicTask(b.tasks.logics[a],b)},c:function(a,b){var c=b.tasks.c[a].split(":",4);if(c.length>=3){var d=Utils.tc(c[2],b.dp);c[1]=""==c[1]?20:c[1],(4!=c.length||"t"!=c[3]||-1===document.cookie.indexOf(c[0]))&&(document.cookie=c[0]+"="+d+"; path=/; expires="+new Date((new Date).getTime()+24*c[1]*60*60*1e3).toUTCString())}}},VIQTag={apc:function(a){"k"in a?a.k=Utils.tc(a.k,GLOBAL.dp):"kdp"in a&&(a.k=DS[a.kdp.ds].f(a,"kdp")),"cval"in a||"dp"in a&&(a.cval=DS[a.dp.ds].f(a,"dp"))},rtl:function(a){for(var b in a){for(var c=a[b],d=0;d<c.length;d++)VIQTag.apc(c[d]);return LOP[b].f(c)}return!1},execLogicTask:function(a,b){var c=!1;return"logic"in a&&(VIQTag.rtl(a.logic)?("try"in a&&VIQTag.taskrunner(a.try,b),c=!0):"catch"in a&&VIQTag.taskrunner(a.catch,b)),c},taskrunner:function(a,b){if(Utils.isArray(a))for(var c=0;c<a.length;c++)VIQTag.taskrunner(a[c],b);else if("task"in a&&"string"==typeof a.task){var d=a.task.split(":");CT[d[0]](d[1],b)}}},GLOBAL={asyncf:0,asyncprogress:function(){GLOBAL.asyncf+=1,GLOBAL.asynccomplete()},asynccomplete:function(){GLOBAL.asyncf==GLOBAL.resq.length&&"function"==typeof GLOBAL.onComplete&&GLOBAL.onComplete()},run:function(a){GLOBAL.resq=[],GLOBAL.asyncf=0,GLOBAL.dp=(a.config||{}).dp||{},VIQTag.taskrunner(a.boot,a.config),GLOBAL.asynccomplete()}},global.visualiqtag?GLOBAL=global.visualiqtag:global.visualiqtag=GLOBAL}(window);
var viqjson={"boot":[{"task":"logics:d2"},{"task":"logics:d9"},{"task":"logics:d10"}],"config":{"tasks":{"logics":{"d2":{"logic":{"AND":[{"E":[{"o":"!in","k":"test","dp":{"p":["host"],"ds":"RU"}}]},{"E":[{"o":"!ex","dp":{"p":["queryKey","tid"],"ds":"C"}}]}]},"try":[{"task":"url:d3"},{"task":"url:d4"},{"task":"url:d5"},{"task":"url:d6"},{"task":"url:d7"},{"task":"url:d8"}]},"d9":{"logic":{"E":[{"o":"!==","dp":{"p":["source"],"ds":"LP"},"k":""}]}},"d10":{"logic":{"E":[{"o":"!==","dp":{"p":["host"],"ds":"RU"},"kdp":{"p":["host"],"ds":"LP"}}]},"try":[{"task":"url:d11"}]}},"url":{"d3":"https://tapestry.tapad.com/tapestry/1?ta_partner_id=950&ta_redirect=https%3A%2F%2Ft.myvisualiq.net%2Fsync%3Fprid%3D1001%26ao%3D0%26pruuid%3DTAPAD_%24%7BIDS%3Akey%7D","d4":"https://t.myvisualiq.net/sync?prid=1002&ao=0&red=https://idsync.rlcdn.com/420356.gif?partner_uid=${UUID}","d5":"https://t.myvisualiq.net/sync?prid=LOAEPNR1&ao=0&red=https%3a%2f%2fbcp.crwdcntrl.net%2f5%2fc%3d10105%2ftp%3dVSIQ%2ftpid%3d%24%7bUUID%7d","d6":"https://t.myvisualiq.net/sync?prid=BUKIPNR1&red=https://tags.bluekai.com/site/21398?id=$%7BUUID%7D","d7":"https://t.myvisualiq.net/sync?prid=AOEPNR1&ao=0&red=https%3A%2F%2Fdpm.demdex.net%2Fibs%3Adpid%3D125310%26dpuuid%3D%24%7BUUID%7D%26redir%3Dhttps%253A%252F%252Ft.myvisualiq.net%252Fsync%253Fprid%253DAOEPNR1%2526ao%253D0%2526pruuid%253D%2524%257BDD_UUID%257D%250A","d8":"https://t.myvisualiq.net/sync?prid=EEAEPNR1&red=https%3A%2F%2Floadus.exelator.com%2Fload%2F%3Fp%3D204%26g%3D1260%26buid%3D%24%7BUUID%7D","d11":"https://t.myvisualiq.net/sync?prid=123&ao=0&red={{d12}}"}},"dp":{"d12":{"ds":"S","v":"https://www.facebook.com/tr?id=364875044029074&ev=PageView&cd[order_id]=${UUID}","e":1,"cv":1}}}}
visualiqtag.run(viqjson);
