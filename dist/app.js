"use strict";function _toConsumableArray(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function getElementPosition(t){for(var e=0,i=0;null!==t;)e+=t.offsetLeft,i+=t.offsetTop,t=t.offsetParent;return new Position(e,i)}function countTriangleHign(t,e,i){var n,s;return n=(t+e+i)/2,s=Math.sqrt(n*(n-t)*(n-e)*(n-i)),2*s/t}function count2PointDistance(t,e){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}var _createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),Position=function t(e,i){_classCallCheck(this,t),this.x=e,this.y=i},LsPoint=function(t){function e(t){var i=t.radius,n=t.x,s=t.y,r=t.index;_classCallCheck(this,e);var a=_possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,n,s));return a.radius=i,a.triggerRadius=.7*i,a.index=r,a.isActivated=!1,a}return _inherits(e,t),_createClass(e,[{key:"draw",value:function(t,i){i=i||(this.isActivated?e.activatedColor:"#464a4c");var n="rgba(36,36,36,0.3)",s=i,r=this.radius/4+2,a=this.radius/15+1,o=this.radius;t.beginPath(),t.fillStyle="rgba(36,36,36,0.3)",t.arc(this.x,this.y,o,0,7),t.fill(),t.shadowBlur=3,t.shadowColor=n,t.beginPath(),t.lineWidth=a,t.strokeStyle=s,t.arc(this.x,this.y,o,0,7),t.stroke(),t.beginPath(),t.fillStyle=i,t.arc(this.x,this.y,r,0,7),t.fill()}},{key:"dispatch",value:function(t,e){if(this.isActivated)return!1;var i=count2PointDistance(t,e),n=count2PointDistance(this,t),s=count2PointDistance(this,e);return(Math.max(i,n,s)===i?countTriangleHign(i,n,s):s)<this.triggerRadius&&(this.isActivated=!0,!0)}}]),e}(Position);LsPoint.activatedColor="#00b6f7";var LsPointManager=function(){function t(e,i){var n=this;_classCallCheck(this,t),this.number=i,this.canvas=e,this.canvasWidth=parseInt(e.clientWidth),this.canvasHeight=parseInt(e.clientHeight),this.canvasContext=e.getContext("2d"),this.activateNode=[];var s=this.canvasWidth/(1.618*this.number)/2;this.points=Array(this.number*this.number).fill().map(function(t,e){return new LsPoint({radius:s,x:.618*s+s+2*(s+.618*s)*(e%n.number),y:.618*s+s+2*(s+.618*s)*~~(e/n.number),index:e})})}return _createClass(t,[{key:"dispatch",value:function(t){var e=this.activateNode[this.activateNode.length-1]||t,i=!0,n=!1,s=void 0;try{for(var r,a=this.points[Symbol.iterator]();!(i=(r=a.next()).done);i=!0){var o=r.value;if(o.dispatch(e,t))return this.activateNode.push(o),this.draw(),!0}}catch(t){n=!0,s=t}finally{try{!i&&a.return&&a.return()}finally{if(n)throw s}}return!1}},{key:"draw",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];this.canvasContext.clearRect(0,0,this.canvasWidth,this.canvasHeight);var i=!0,n=!1,s=void 0;try{for(var r,a=this.points[Symbol.iterator]();!(i=(r=a.next()).done);i=!0){var o=r.value;e||o.isActivated?o.draw(this.canvasContext,t):o.draw(this.canvasContext)}}catch(t){n=!0,s=t}finally{try{!i&&a.return&&a.return()}finally{if(n)throw s}}}},{key:"clear",value:function(){this.activateNode=[],this.points.forEach(function(t){return t.isActivated=!1})}}]),t}(),LsView=function(){function t(e,i){var n=e.el,s=e.width,r=e.height,a=e.number;_classCallCheck(this,t),this.viewWindow=null,this.pointCanvas=null,this.lineCanvas=null,this.callback=i,this.width=s,this.height=r,this.el=n,this.number=a,this.lpm=null,this.init()}return _createClass(t,[{key:"init",value:function(){this.viewWindow=document.createElement("div"),this.pointCanvas=document.createElement("canvas"),this.lineCanvas=document.createElement("canvas"),this.viewWindow.className="ls-view",this.viewWindow.style.width=this.width,this.viewWindow.style.height=this.height,this.lineCanvas.width=this.width,this.lineCanvas.height=this.height,this.pointCanvas.width=this.width,this.pointCanvas.height=this.height,this.viewWindow.appendChild(this.lineCanvas),this.viewWindow.appendChild(this.pointCanvas),this.el.innerHTML="",this.el.appendChild(this.viewWindow),this.lpm=new LsPointManager(this.pointCanvas,this.number),this.lpm.draw(),this.bindEvent()}},{key:"bindEvent",value:function(){function e(e){e.preventDefault();var i=getElementPosition(n.viewWindow),s=null;s=e.touches?new Position(e.touches[0].pageX-i.x,e.touches[0].pageY-i.y):new Position(e.clientX-i.x+window.pageXOffset,e.clientY-i.y+window.pageYOffset),n.lpm.dispatch(s),t.drawLine(n.lineCanvas,[].concat(_toConsumableArray(n.lpm.activateNode),[s]))}function i(e){if(0===n.lpm.activateNode.length)return void n.retry();t.drawLine(n.lineCanvas,n.lpm.activateNode),n.callback(n.lpm.activateNode.map(function(t){return t.index}))}var n=this,s=document.body;this.viewWindow.addEventListener("touchstart",function t(){s.addEventListener("touchmove",e,{passive:!1}),s.addEventListener("touchend",i),s.addEventListener("touchend",function(){s.removeEventListener("touchmove",e),s.removeEventListener("touchend",i),s.removeEventListener("touchstart",t)})}),this.viewWindow.addEventListener("mousedown",function t(){s.addEventListener("mousemove",e),s.addEventListener("mouseup",i),s.addEventListener("mouseup",function(){s.removeEventListener("mousemove",e),s.removeEventListener("mouseup",i),s.removeEventListener("mousedown",t)})})}},{key:"showError",value:function(){this.lpm.draw(t.ERROR_COLOR),t.drawLine(this.lineCanvas)}},{key:"clearView",value:function(){this.lpm.clear(),this.lpm.draw(),t.drawLine(this.lineCanvas)}},{key:"retry",value:function(){this.lpm.clear(),this.bindEvent()}}]),t}();LsView.ERROR_COLOR="#dd3b33",LsView.drawLine=function(t,e){var i=t.getContext("2d");if(i.clearRect(0,0,t.clientWidth,t.clientHeight),!e||e.length<2)return!1;i.beginPath(),i.strokeStyle=LsPoint.activatedColor,i.lineWidth=3,i.moveTo(e[0].x,e[0].y);var n=!0,s=!1,r=void 0;try{for(var a,o=e.slice(1)[Symbol.iterator]();!(n=(a=o.next()).done);n=!0){var l=a.value;i.lineTo(l.x,l.y)}}catch(t){s=!0,r=t}finally{try{!n&&o.return&&o.return()}finally{if(s)throw r}}return i.stroke(),!0};var LsApp=function(){function t(e){var i=e.el,n=e.number,s=e.width;_classCallCheck(this,t),this.el=i,this.width=s,this.number=n||t.POINT_NUMBER,this.titleElt=null,this.textElt=null,this.lsView=null,this.init()}return _createClass(t,[{key:"init",value:function(){this.el.innerHTML='\n            <div class="sign-text">\n                <h2 class="st-title">设置手势密码</h2>\n                <p class="st-text">请绘制至少5个点来作为密码</p>\n            </div>\n            <main class="ls-app"></main>\n        ',this.titleElt=this.el.querySelector(".sign-text .st-title"),this.textElt=this.el.querySelector(".sign-text .st-text"),this.lsView=new LsView({el:this.el.querySelector(".ls-app"),number:this.number,width:this.width,height:this.width})}},{key:"retry",value:function(){this.lsView.retry()}},{key:"clear",value:function(){this.lsView.clearView()}},{key:"setTitle",value:function(t){this.titleElt.innerHTML=t}},{key:"setMsg",value:function(t){this.textElt.className="st-text-normal",this.textElt.innerHTML=t}},{key:"showError",value:function(t){this.textElt.className="st-text-error",this.textElt.innerHTML=t,this.lsView.showError()}},{key:"showSuccess",value:function(t){this.textElt.className="st-text-success",this.textElt.innerHTML=t}},{key:"callback",set:function(t){this.lsView.callback=t},get:function(){return this.lsView.callback}}]),t}();LsApp.POINT_NUMBER=3;var App=function t(e){var i=e.el;_classCallCheck(this,t),this.el="string"==typeof i?document.querySelector(i):i,this.el.innerHTML='\n            <nav id="nav">\n                <a href="#!/set">设置密码</a>\n                <a href="#!/verify">验证密码</a>\n                <a href="#!/option">管理</a>\n            </nav>\n            <main id="router-view"></main>\n        ';var n=this.el.querySelector("#router-view");window.addEventListener("hashchange",function(){return t.router(t.routes,n)}),t.router(t.routes,n)};App.router=function(t,e){location.hash&&t[location.hash.substr(2)]?t[location.hash.substr(2)](e):t._default(e),Array.from(document.getElementsByTagName("a")).forEach(function(t){t.href===document.URL?t.classList.add("router-active"):t.classList.remove("router-active")})},App.routes={_default:function(t){localStorage.getItem(App.PASSWD_KEY)?location.hash="!/verify":location.hash="!/set"},"/set":function(t){var e="ready",i=null,n=new LsApp({number:localStorage.getItem(App.POINT_NUMBER_KEY),el:t,width:320});n.setTitle("密码录入"),n.setMsg("请录入你的手势密码"),n.callback=function(t){if(t.length<5)return n.showError("绘制点数不能少于5个"),void n.retry();switch(e){case"ready":e="ensure",i=t.join("-"),n.setTitle("确认输入"),n.setMsg("请再次输入"),n.clear(),n.retry();break;case"ensure":e="ready",i===t.join("-")?(localStorage.setItem(App.PASSWD_KEY,i),localStorage.setItem(App.PASSWD_POINT_NUMBER_KEY,n.number),n.setTitle("设置成功"),n.showSuccess("你可以点击上方的“验证密码”来测试"),n.clear(),n.retry()):(n.setTitle("密码录入"),n.showError("两次输入不一致，请重新录入"),n.retry())}}},"/verify":function(t){var e=new LsApp({number:localStorage.getItem(App.PASSWD_POINT_NUMBER_KEY),el:t,width:320});if(!localStorage.getItem(App.PASSWD_KEY))return e.setTitle("无法验证"),e.showError("请先设置手势密码"),void(e.callback=function(){e.showError("请先设置手势密码"),e.retry()});e.setTitle("验证密码"),e.setMsg("验证你曾经保存过的密码");var i=localStorage.getItem(App.PASSWD_KEY);e.lsView.callback=function(t){i!==t.join("-")?(e.setTitle("验证密码"),e.showError("密码不正确"),e.retry()):(e.setTitle("通过"),e.showSuccess("你通过了密码验证"),e.clear(),e.retry())}},"/option":function(t){var e=localStorage.getItem(App.PASSWD_KEY),i=localStorage.getItem(App.POINT_NUMBER_KEY)||LsApp.POINT_NUMBER;t.innerHTML='\n            <table class="app-option">\n                <tr>\n                    <td>点数：</td>\n                    <td class="ao-number">\n                        <input value="'+i+'" class="aon-input" type="number" />\n                    </td>\n                </tr><tr>\n                    <td>存储的密码：</td>\n                    <td class="ao-passwd">\n                        '+(e||"未设置")+" \n                        "+(e?'<button class="aop-clear">清除</button>':"")+"\n                    </td>\n                </tr>\n            </table>\n        ",t.querySelector(".aon-input").addEventListener("input",function(){Number.isNaN(this.value)||localStorage.setItem(App.POINT_NUMBER_KEY,this.value)});var n=t.querySelector(".aop-clear");n&&n.addEventListener("click",function(){localStorage.removeItem(App.PASSWD_KEY),localStorage.removeItem(App.PASSWD_POINT_NUMBER_KEY),t.querySelector(".ao-passwd").innerHTML="已清除"})}},App.PASSWD_KEY="ls_passwd",App.PASSWD_POINT_NUMBER_KEY="ls_passwd_point_number",App.POINT_NUMBER_KEY="ls_point_number";