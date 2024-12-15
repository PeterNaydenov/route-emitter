!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).routeEmitter=t()}(this,(function(){"use strict";function e(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var t,n={exports:{}},r=n.exports;var o=(t||(t=1,function(e,t){var n,o,a=[].slice;n=r,o=function(){var e,t,n,r,o,i,s,u,l,c,f,d,g,h,m;return l=function(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")},s=function(e,t){var n,r,o;for(o=[],n=-1,r=e.length;++n<r;)o=o.concat(t(e[n]));return o},h=function(e,t){var n,r,o;for(o="",n=-1,r=e.length;++n<r;)o+=t(e[n]);return o},g=function(e){return new RegExp(e.toString()+"|").exec("").length-1},f=function(e,t){var n,r,o,a,i;for(a={},n=-1,o=e.length;++n<o;)r=e[n],null!=(i=t[n])&&(null!=a[r]?(Array.isArray(a[r])||(a[r]=[a[r]]),a[r].push(i)):a[r]=i);return a},(e={}).Result=function(e,t){this.value=e,this.rest=t},e.Tagged=function(e,t){this.tag=e,this.value=t},e.tag=function(t,n){return function(r){var o,a;if(null!=(o=n(r)))return a=new e.Tagged(t,o.value),new e.Result(a,o.rest)}},e.regex=function(t){return function(n){var r,o;if(null!=(r=t.exec(n)))return o=r[0],new e.Result(o,n.slice(o.length))}},e.sequence=function(){var t;return t=1<=arguments.length?a.call(arguments,0):[],function(n){var r,o,a,i,s;for(r=-1,o=t.length,s=[],a=n;++r<o;){if(null==(i=(0,t[r])(a)))return;s.push(i.value),a=i.rest}return new e.Result(s,a)}},e.pick=function(){var t,n;return t=arguments[0],n=2<=arguments.length?a.call(arguments,1):[],function(r){var o,a;if(null!=(a=e.sequence.apply(e,n)(r)))return o=a.value,a.value=o[t],a}},e.string=function(t){var n;return n=t.length,function(r){if(r.slice(0,n)===t)return new e.Result(t,r.slice(n))}},e.lazy=function(e){var t;return t=null,function(n){return null==t&&(t=e()),t(n)}},e.baseMany=function(t,n,r,o,a){var i,s,u;for(s=a,u=r?"":[];(null==n||null==n(s))&&null!=(i=t(s));)r?u+=i.value:u.push(i.value),s=i.rest;if(!o||0!==u.length)return new e.Result(u,s)},e.many1=function(t){return function(n){return e.baseMany(t,null,!1,!0,n)}},e.concatMany1Till=function(t,n){return function(r){return e.baseMany(t,n,!0,!0,r)}},e.firstChoice=function(){var e;return e=1<=arguments.length?a.call(arguments,0):[],function(t){var n,r,o;for(n=-1,r=e.length;++n<r;)if(null!=(o=(0,e[n])(t)))return o}},d=function(t){var n;return(n={}).wildcard=e.tag("wildcard",e.string(t.wildcardChar)),n.optional=e.tag("optional",e.pick(1,e.string(t.optionalSegmentStartChar),e.lazy((function(){return n.pattern})),e.string(t.optionalSegmentEndChar))),n.name=e.regex(new RegExp("^["+t.segmentNameCharset+"]+")),n.named=e.tag("named",e.pick(1,e.string(t.segmentNameStartChar),e.lazy((function(){return n.name})))),n.escapedChar=e.pick(1,e.string(t.escapeChar),e.regex(/^./)),n.static=e.tag("static",e.concatMany1Till(e.firstChoice(e.lazy((function(){return n.escapedChar})),e.regex(/^./)),e.firstChoice(e.string(t.segmentNameStartChar),e.string(t.optionalSegmentStartChar),e.string(t.optionalSegmentEndChar),n.wildcard))),n.token=e.lazy((function(){return e.firstChoice(n.wildcard,n.optional,n.named,n.static)})),n.pattern=e.many1(e.lazy((function(){return n.token}))),n},u={escapeChar:"\\",segmentNameStartChar:":",segmentValueCharset:"a-zA-Z0-9-_~ %",segmentNameCharset:"a-zA-Z0-9",optionalSegmentStartChar:"(",optionalSegmentEndChar:")",wildcardChar:"*"},i=function(e,t){if(Array.isArray(e))return h(e,(function(e){return i(e,t)}));switch(e.tag){case"wildcard":return"(.*?)";case"named":return"(["+t+"]+)";case"static":return l(e.value);case"optional":return"(?:"+i(e.value,t)+")?"}},o=function(e,t){return null==t&&(t=u.segmentValueCharset),"^"+i(e,t)+"$"},r=function(e){if(Array.isArray(e))return s(e,r);switch(e.tag){case"wildcard":return["_"];case"named":return[e.value];case"static":return[];case"optional":return r(e.value)}},c=function(e,t,n,r){var o,a,i;if(null==r&&(r=!1),null!=(i=e[t])){if(!((o=n[t]||0)>(Array.isArray(i)?i.length-1:0)))return a=Array.isArray(i)?i[o]:i,r&&(n[t]=o+1),a;if(r)throw new Error("too few values provided for key `"+t+"`")}else if(r)throw new Error("no values provided for key `"+t+"`")},n=function(e,t,r){var o,a;if(Array.isArray(e)){for(o=-1,a=e.length;++o<a;)if(n(e[o],t,r))return!0;return!1}switch(e.tag){case"wildcard":return null!=c(t,"_",r,!1);case"named":return null!=c(t,e.value,r,!1);case"static":return!1;case"optional":return n(e.value,t,r)}},m=function(e,t,r){if(Array.isArray(e))return h(e,(function(e){return m(e,t,r)}));switch(e.tag){case"wildcard":return c(t,"_",r,!0);case"named":return c(t,e.value,r,!0);case"static":return e.value;case"optional":return n(e.value,t,r)?m(e.value,t,r):""}},(t=function(e,n){var a,i,s;if(e instanceof t)return this.isRegex=e.isRegex,this.regex=e.regex,this.ast=e.ast,void(this.names=e.names);if(this.isRegex=e instanceof RegExp,"string"!=typeof e&&!this.isRegex)throw new TypeError("argument must be a regex or a string");if(this.isRegex){if(this.regex=e,null!=n){if(!Array.isArray(n))throw new Error("if first argument is a regex the second argument may be an array of group names but you provided something else");if(a=g(this.regex),n.length!==a)throw new Error("regex contains "+a+" groups but array of group names contains "+n.length);this.names=n}}else{if(""===e)throw new Error("argument must not be the empty string");if(e.replace(/\s+/g,"")!==e)throw new Error("argument must not contain whitespace");if(i={escapeChar:(null!=n?n.escapeChar:void 0)||u.escapeChar,segmentNameStartChar:(null!=n?n.segmentNameStartChar:void 0)||u.segmentNameStartChar,segmentNameCharset:(null!=n?n.segmentNameCharset:void 0)||u.segmentNameCharset,segmentValueCharset:(null!=n?n.segmentValueCharset:void 0)||u.segmentValueCharset,optionalSegmentStartChar:(null!=n?n.optionalSegmentStartChar:void 0)||u.optionalSegmentStartChar,optionalSegmentEndChar:(null!=n?n.optionalSegmentEndChar:void 0)||u.optionalSegmentEndChar,wildcardChar:(null!=n?n.wildcardChar:void 0)||u.wildcardChar},null==(s=d(i).pattern(e)))throw new Error("couldn't parse pattern");if(""!==s.rest)throw new Error("could only partially parse pattern");this.ast=s.value,this.regex=new RegExp(o(this.ast,i.segmentValueCharset)),this.names=r(this.ast)}}).prototype.match=function(e){var t,n;return null==(n=this.regex.exec(e))?null:(t=n.slice(1),this.names?f(this.names,t):t)},t.prototype.stringify=function(e){if(null==e&&(e={}),this.isRegex)throw new Error("can't stringify patterns generated from a regex");if(e!==Object(e))throw new Error("argument must be an object or undefined");return m(this.ast,e,{})},t.escapeForRegex=l,t.concatMap=s,t.stringConcatMap=h,t.regexGroupCount=g,t.keysAndValuesToObject=f,t.P=e,t.newParser=d,t.defaultOptions=u,t.astNodeToRegexString=o,t.astNodeToNames=r,t.getParam=c,t.astNodeContainsSegmentsForProvidedParams=n,t.stringify=m,t},null!==t?e.exports=o():n.UrlPattern=o()}(n,n.exports)),n.exports),a=e(o);function i(e){let t,n=!1;return e?(t=function(e){let t=e.map((e=>s())),n=t.map((e=>e.promise));return t.promises=n,t.onComplete=u(Promise.all(n)),t}(e),n=!0):t=s(),t.timeout=function(e,t){let n;return n=e?Promise.all(t.promises):t.promise,function(e,r){let o,a=new Promise(((t,a)=>{o=setTimeout((()=>{t(r),Promise.resolve(n)}),e)}));return n.then((()=>clearTimeout(o))),t.onComplete=u(Promise.race([n,a])),t}}(n,t),t}function s(){let e,t;const n=new Promise(((n,r)=>{e=n,t=r}));return{promise:n,done:e,cancel:t,onComplete:u(n)}}function u(e){return function(t){e.then((e=>t(e)))}}i.sequence=function(e,...t){const n=i(),r=[],o=function*(e){for(const t of e)yield t}(e);return function e(t,...a){t.done?n.done(r):t.value(...a).then((t=>{r.push(t),e(o.next(),...a,t)}))}(o.next(),...t),n},i.all=function(e,...t){const n=i(),r=[],o=e.map(((e,n)=>"function"==typeof e?e(...t).then((e=>r[n]=e)):e.then((e=>r[n]=e))));return Promise.all(o).then((()=>n.done(r))),n};var l={_historyActions:function(e,t){return function(n,{addressName:r,data:o,url:a}){const{eBus:i,API:s}=e,u=t.lastLocation;s.navigate(r,o,!0),u===a?i.emit("_RELOAD",r,o,a):i.emit("_CHANGE",r,o,a),n.done(r,o)}},_locationChange:function(e,t){return function(){const{eBus:n,history:r,API:o}=e;let a=!1,i=!0,s=!1;const u=sessionStorage.getItem(t.SSName),l=r.read();if(u&&u===l&&(a=!0),i=t.rt.every((({name:e,pattern:i,title:u,redirect:c,data:f={}})=>{let d=i.match(l);return!d||(c?(o.navigate(c,f,!0),s=!0,!1):(sessionStorage.setItem(t.SSName,l),t.lastLocation=l,t.lastAddress=e,r.write({state:{PGID:e,url:l,data:d},url:l,title:u},!0),a?n.emit("_RELOAD",e,d,l):n.emit("_CHANGE",e,d,l),!1))})),i){if(s)return;n.emit("_ERROR",{code:404,message:`There is no defined address for path "${l}".`})}else t.lastRoute=l}},_setAddressRecord:function(e,t){return function({name:n,path:r,title:o,inHistory:a,redirect:i,data:s}){if(null==n)return null;if(null==r)return null;null==o&&(o=t.appName),null==a&&(a=!1);const{UrlPattern:u}=e;return{name:n,path:r,title:o,inHistory:a,pattern:new u(r),redirect:i,data:s}}},createURL:function(e,t){return function(e,n={}){const{routes:r}=t;if(!r[e])return console.error(`Address "${e}" is not registered`),null;const{pattern:o}=r[e];try{return o.stringify(n)}catch(t){return console.error(`Data provided for address "${e}" is not correct.`),null}}},getCurrentAddress:function(e,t){return function(){const{lastAddress:e,lastLocation:n,routes:r}=t,{pattern:o}=e?r[e]:{pattern:"null"};let a=o.match(n);return[t.lastAddress,a]}},destroy:function(e,t){return function(){const{eBus:n,history:r,dead:o}=e;t.isActive=!1,n.off(),r.destroy(),sessionStorage.removeItem(t.SSName),e.API={on:o,navigate:o,destroy:o}}},listAciveAddresses:function(e,t){return function(){return t.rt.map((e=>e.name))}},listActiveRoutes:function(e,t){return function(){const{rt:e}=t;return e.map((e=>`${e.name} ---\x3e ${e.path}`))}},navigate:function(e,t){const{history:n,eBus:r}=e;return function e(o,a={},i=!1){if(!t.isActive)return void console.error("Router is not active. Use router.run() to activate it.");const{lastAddress:s,lastLocation:u,routes:l}=t;if(!l[o])return console.error(`Address "${o}" is not registered`),void r.emit("_ERROR",{code:404,message:`Address "${o}" is not registered`});let c=!1;const{pattern:f,title:d,redirect:g,data:h}=l[o];if(g)e(g,h);else{s&&(c=l[s].inHistory);try{const e=f.stringify(a);if(e===u)return;t.lastLocation=e,sessionStorage.setItem(t.SSName,e),t.lastAddress=o,i&&(c=!1),n.write({state:{PGID:o,url:e,data:a},url:e,title:d},c)}catch(e){return void r.emit("_ERROR",{code:400,message:`Data provided for address "${o}" is not correct. ${e}`})}}}},removeAddresses:function(e,t){return function(n){const{rt:r}=t;return t.rt=r.reduce(((e,r)=>{let{name:o}=r;return n.includes(o)?(delete t.routes[o],e):(e.push(r),e)}),[]),e.API}},run:function(e,t){return function(){const{inAPI:n,history:r}=e;t.isActive=!0,r.listen(n._historyActions),n._locationChange()}},setAddresses:function(e,t){return function(n,r=[]){const{_setAddressRecord:o}=e.inAPI;return n.forEach((e=>{const n=o(e);if(!n)return;if(r.includes(n.name))return;const a=n.name;t.rt.push(n),t.routes[a]=n})),e.API}}};return function(e){const t=new function(){let e={"*":[]},t={},n=[],r=!1,o="";return{on:function(t,n){e[t]||(e[t]=[]),e[t].push(n)},once:function(e,n){"*"!==e&&(t[e]||(t[e]=[]),t[e].push(n))},off:function(n,r){if(r)return e[n]&&(e[n]=e[n].filter((e=>e!==r))),t[n]&&(t[n]=t[n].filter((e=>e!==r))),e[n]&&0===e[n].length&&delete e[n],void(t[n]&&0===t[n].length&&delete e[n]);t[n]&&delete t[n],e[n]&&delete e[n]},reset:function(){e={"*":[]},t={},n=[]},emit:function(){const[a,...i]=arguments;function s(t){let r=!1;"*"!==t&&(n.includes(t)||(e[t].every((e=>{const t=e(...i);return"string"!=typeof t||"STOP"!==t.toUpperCase()||(r=!0,!1)})),r||e["*"].forEach((e=>e(a,...i)))))}if(r&&(console.log(`${o} Event "${a}" was triggered.`),i.length>0&&(console.log("Arguments:"),console.log(...i),console.log("^----"))),"*"!==a){if(t[a]){if(n.includes(a))return;t[a].forEach((e=>e(...i))),delete t[a]}e[a]&&s(a)}else Object.keys(e).forEach((e=>s(e)))},stop:function(r){if("*"!==r)n.push(r);else{const r=Object.keys(e),o=Object.keys(t);n=[...o,...r]}},start:function(e){n="*"!==e?n.filter((t=>e!=t)):[]},debug:function(e,t){r=!!e,t&&"string"==typeof t&&(o=t)}}},n=function(){let e=null;return{write:function({state:e,title:t,url:n},r){r?window.history.pushState(e,"",n):window.history.replaceState(e,"",n);const o="function"==typeof t;document.title=o?t(e.data):t},read:function(){return window.location.pathname},back:function(t=1){return e=i().timeout(1500,"expire"),window.history.back(t),e.onComplete((t=>{"expire"===t&&(e=null)})),e.promise},go:function(t=1){return e=i().timeout(1500,"expire"),window.history.go(t),e.onComplete((t=>{"expire"===t&&(e=null)})),e.promise},listen:function(t){onpopstate=function(n){let{PGID:r,url:o,data:a}=n.state;e||(e=i()),t(e,{addressName:r,data:a,url:o}),e=null}},destroy:function(){window.onpopstate=null}}}(),{appName:r,sessionStorageKey:o}=e||{},s={lastLocation:"",lastAddress:null,SSName:"_routeEmmiterLastLocation",appName:"App Name",rt:[],routes:{},isActive:!1},u={UrlPattern:a,eBus:t,history:n,dead:()=>console.error("Router was destroyed")},c={},f={};return r&&"string"==typeof r&&(s.appName=r),o&&"string"==typeof o&&(s.SSName=o),Object.entries(l).forEach((([e,t])=>{e.startsWith("_")?f[e]=t(u,s):c[e]=t(u,s)})),u.inAPI=f,u.API={onChange:e=>(t.on("_CHANGE",e),u.API),onError:e=>(t.on("_ERROR",e),u.API),onReload:e=>(t.on("_RELOAD",e),u.API),back:e=>n.back(e),forward:e=>n.go(e),...c},u.API}}));
