(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[11],{62601:function(e,t,r){"use strict";var o,i;e.exports=(null==(o=r.g.process)?void 0:o.env)&&"object"==typeof(null==(i=r.g.process)?void 0:i.env)?r.g.process:r(58960)},92154:function(e,t,r){Promise.resolve().then(r.bind(r,36099))},36099:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return f}});var o=r(57437),i=r(61396),a=r.n(i),s=r(88110),n=r.n(s),l=r(79404),c=r(43574),u=r(2265),d=r(24033),p=r(5925);function f(){let[e]=l.Z.useForm(),[t,r]=(0,u.useState)(!1),[i,s]=(0,u.useState)(!1),f=(0,d.useRouter)(),m=(0,u.useCallback)(()=>{e.validateFields().then(e=>{let{email:t,password:o}=e;r(!0),fetch("/api/auth/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t,password:o})}).then(async e=>{if(200===e.status)p.default.success("Hesabınız oluşturuldu! Giriş i\xe7in y\xf6nlendiriliyorsunuz..."),setTimeout(()=>f.push("/login"),2e3);else{r(!1);let{error:t}=await e.json();p.default.error(t)}})})},[f]);return((0,u.useEffect)(()=>s(!0),[]),i)?(0,o.jsx)("div",{className:"flex h-screen w-screen items-center justify-center",children:(0,o.jsxs)("div",{className:"z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl",children:[(0,o.jsxs)("div",{className:"flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16",children:[(0,o.jsx)("h3",{className:"text-xl font-semibold",children:"Hesap Oluşturun"}),(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{className:"text-center text-sm text-gray-600",children:"Hesabınız var mı?"}),(0,o.jsx)(a(),{href:"/login",className:"cursor-pointer font-semibold text-sm text-gray-800",children:"Giriş yapmak i\xe7in tıklayabilirsiniz"})]})]}),(0,o.jsxs)(l.Z,{form:e,layout:"vertical",className:"p-6",requiredMark:!0,children:[(0,o.jsx)(l.Z.Item,{name:"email",label:"E-posta",rules:[{required:!0,message:"L\xfctfen e-posta giriniz"}],children:(0,o.jsx)(c.default,{size:"large",autoComplete:"email",autoFocus:!0})}),(0,o.jsx)(l.Z.Item,{name:"password",label:"Şifre",rules:[{required:!0,message:"L\xfctfen şifre giriniz"}],children:(0,o.jsx)(c.default.Password,{size:"large",autoComplete:"password"})}),(0,o.jsx)(n(),{htmlType:"submit",className:"bg-white",size:"large",loading:t,block:!0,onClick:m,children:"Hesap Oluştur"})]})]})}):(0,o.jsx)("div",{className:"flex items-center justify-center min-h-screen",children:(0,o.jsx)("div",{style:{borderTopColor:"transparent"},className:"w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"})})}},58960:function(e){!function(){var t={229:function(e){var t,r,o,i=e.exports={};function a(){throw Error("setTimeout has not been defined")}function s(){throw Error("clearTimeout has not been defined")}function n(e){if(t===setTimeout)return setTimeout(e,0);if((t===a||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(r){try{return t.call(null,e,0)}catch(r){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:a}catch(e){t=a}try{r="function"==typeof clearTimeout?clearTimeout:s}catch(e){r=s}}();var l=[],c=!1,u=-1;function d(){c&&o&&(c=!1,o.length?l=o.concat(l):u=-1,l.length&&p())}function p(){if(!c){var e=n(d);c=!0;for(var t=l.length;t;){for(o=l,l=[];++u<t;)o&&o[u].run();u=-1,t=l.length}o=null,c=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function f(e,t){this.fun=e,this.array=t}function m(){}i.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];l.push(new f(e,t)),1!==l.length||c||n(p)},f.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=m,i.addListener=m,i.once=m,i.off=m,i.removeListener=m,i.removeAllListeners=m,i.emit=m,i.prependListener=m,i.prependOnceListener=m,i.listeners=function(e){return[]},i.binding=function(e){throw Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw Error("process.chdir is not supported")},i.umask=function(){return 0}}},r={};function o(e){var i=r[e];if(void 0!==i)return i.exports;var a=r[e]={exports:{}},s=!0;try{t[e](a,a.exports,o),s=!1}finally{s&&delete r[e]}return a.exports}o.ab="//";var i=o(229);e.exports=i}()},5925:function(e,t,r){"use strict";let o,i;r.r(t),r.d(t,{CheckmarkIcon:function(){return G},ErrorIcon:function(){return q},LoaderIcon:function(){return B},ToastBar:function(){return ee},ToastIcon:function(){return V},Toaster:function(){return ei},default:function(){return ea},resolveValue:function(){return T},toast:function(){return _},useToaster:function(){return Z},useToasterStore:function(){return D}});var a,s=r(2265);let n={data:""},l=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||n,c=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,u=/\/\*[^]*?\*\/|  +/g,d=/\n+/g,p=(e,t)=>{let r="",o="",i="";for(let a in e){let s=e[a];"@"==a[0]?"i"==a[1]?r=a+" "+s+";":o+="f"==a[1]?p(s,a):a+"{"+p(s,"k"==a[1]?"":t)+"}":"object"==typeof s?o+=p(s,t?t.replace(/([^,])+/g,e=>a.replace(/(^:.*)|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):a):null!=s&&(a=/^--/.test(a)?a:a.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=p.p?p.p(a,s):a+":"+s+";")}return r+(t&&i?t+"{"+i+"}":i)+o},f={},m=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+m(e[r]);return t}return e},h=(e,t,r,o,i)=>{var a;let s=m(e),n=f[s]||(f[s]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(s));if(!f[n]){let t=s!==e?e:(e=>{let t,r,o=[{}];for(;t=c.exec(e.replace(u,""));)t[4]?o.shift():t[3]?(r=t[3].replace(d," ").trim(),o.unshift(o[0][r]=o[0][r]||{})):o[0][t[1]]=t[2].replace(d," ").trim();return o[0]})(e);f[n]=p(i?{["@keyframes "+n]:t}:t,r?"":"."+n)}let l=r&&f.g?f.g:null;return r&&(f.g=f[n]),a=f[n],l?t.data=t.data.replace(l,a):-1===t.data.indexOf(a)&&(t.data=o?a+t.data:t.data+a),n},g=(e,t,r)=>e.reduce((e,o,i)=>{let a=t[i];if(a&&a.call){let e=a(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?"."+t:e&&"object"==typeof e?e.props?"":p(e,""):!1===e?"":e}return e+o+(null==a?"":a)},"");function y(e){let t=this||{},r=e.call?e(t.p):e;return h(r.unshift?r.raw?g(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,l(t.target),t.g,t.o,t.k)}y.bind({g:1});let b,x,v,w=y.bind({k:1});function j(e,t){let r=this||{};return function(){let o=arguments;function i(a,s){let n=Object.assign({},a),l=n.className||i.className;r.p=Object.assign({theme:x&&x()},n),r.o=/ *go\d+/.test(l),n.className=y.apply(r,o)+(l?" "+l:""),t&&(n.ref=s);let c=e;return e[0]&&(c=n.as||e,delete n.as),v&&c[0]&&v(n),b(c,n)}return t?t(i):i}}var E=e=>"function"==typeof e,T=(e,t)=>E(e)?e(t):e,k=(o=0,()=>(++o).toString()),N=()=>{if(void 0===i&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");i=!e||e.matches}return i},z=new Map,C=e=>{if(z.has(e))return;let t=setTimeout(()=>{z.delete(e),A({type:4,toastId:e})},1e3);z.set(e,t)},O=e=>{let t=z.get(e);t&&clearTimeout(t)},$=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return t.toast.id&&O(t.toast.id),{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return e.toasts.find(e=>e.id===r.id)?$(e,{type:1,toast:r}):$(e,{type:0,toast:r});case 3:let{toastId:o}=t;return o?C(o):e.toasts.forEach(e=>{C(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===o||void 0===o?{...e,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},I=[],L={toasts:[],pausedAt:void 0},A=e=>{L=$(L,e),I.forEach(e=>{e(L)})},P={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},D=(e={})=>{let[t,r]=(0,s.useState)(L);(0,s.useEffect)(()=>(I.push(r),()=>{let e=I.indexOf(r);e>-1&&I.splice(e,1)}),[t]);let o=t.toasts.map(t=>{var r,o;return{...e,...e[t.type],...t,duration:t.duration||(null==(r=e[t.type])?void 0:r.duration)||(null==e?void 0:e.duration)||P[t.type],style:{...e.style,...null==(o=e[t.type])?void 0:o.style,...t.style}}});return{...t,toasts:o}},H=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||k()}),S=e=>(t,r)=>{let o=H(t,e,r);return A({type:2,toast:o}),o.id},_=(e,t)=>S("blank")(e,t);_.error=S("error"),_.success=S("success"),_.loading=S("loading"),_.custom=S("custom"),_.dismiss=e=>{A({type:3,toastId:e})},_.remove=e=>A({type:4,toastId:e}),_.promise=(e,t,r)=>{let o=_.loading(t.loading,{...r,...null==r?void 0:r.loading});return e.then(e=>(_.success(T(t.success,e),{id:o,...r,...null==r?void 0:r.success}),e)).catch(e=>{_.error(T(t.error,e),{id:o,...r,...null==r?void 0:r.error})}),e};var F=(e,t)=>{A({type:1,toast:{id:e,height:t}})},M=()=>{A({type:5,time:Date.now()})},Z=e=>{let{toasts:t,pausedAt:r}=D(e);(0,s.useEffect)(()=>{if(r)return;let e=Date.now(),o=t.map(t=>{if(t.duration===1/0)return;let r=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(r<0){t.visible&&_.dismiss(t.id);return}return setTimeout(()=>_.dismiss(t.id),r)});return()=>{o.forEach(e=>e&&clearTimeout(e))}},[t,r]);let o=(0,s.useCallback)(()=>{r&&A({type:6,time:Date.now()})},[r]),i=(0,s.useCallback)((e,r)=>{let{reverseOrder:o=!1,gutter:i=8,defaultPosition:a}=r||{},s=t.filter(t=>(t.position||a)===(e.position||a)&&t.height),n=s.findIndex(t=>t.id===e.id),l=s.filter((e,t)=>t<n&&e.visible).length;return s.filter(e=>e.visible).slice(...o?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+i,0)},[t]);return{toasts:t,handlers:{updateHeight:F,startPause:M,endPause:o,calculateOffset:i}}},q=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${w`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${w`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,B=j("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${w`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`} 1s linear infinite;
`,G=j("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${w`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${w`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,R=j("div")`
  position: absolute;
`,U=j("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,J=j("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${w`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,V=({toast:e})=>{let{icon:t,type:r,iconTheme:o}=e;return void 0!==t?"string"==typeof t?s.createElement(J,null,t):t:"blank"===r?null:s.createElement(U,null,s.createElement(B,{...o}),"loading"!==r&&s.createElement(R,null,"error"===r?s.createElement(q,{...o}):s.createElement(G,{...o})))},Y=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,K=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,Q=j("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,W=j("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,X=(e,t)=>{let r=e.includes("top")?1:-1,[o,i]=N()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Y(r),K(r)];return{animation:t?`${w(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${w(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ee=s.memo(({toast:e,position:t,style:r,children:o})=>{let i=e.height?X(e.position||t||"top-center",e.visible):{opacity:0},a=s.createElement(V,{toast:e}),n=s.createElement(W,{...e.ariaProps},T(e.message,e));return s.createElement(Q,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof o?o({icon:a,message:n}):s.createElement(s.Fragment,null,a,n))});a=s.createElement,p.p=void 0,b=a,x=void 0,v=void 0;var et=({id:e,className:t,style:r,onHeightUpdate:o,children:i})=>{let a=s.useCallback(t=>{if(t){let r=()=>{o(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return s.createElement("div",{ref:a,className:t,style:r},i)},er=(e,t)=>{let r=e.includes("top"),o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:N()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(r?1:-1)}px)`,...r?{top:0}:{bottom:0},...o}},eo=y`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ei=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:o,children:i,containerStyle:a,containerClassName:n})=>{let{toasts:l,handlers:c}=Z(r);return s.createElement("div",{style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...a},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map(r=>{let a=r.position||t,n=er(a,c.calculateOffset(r,{reverseOrder:e,gutter:o,defaultPosition:t}));return s.createElement(et,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?eo:"",style:n},"custom"===r.type?T(r.message,r):i?i(r):s.createElement(ee,{toast:r,position:a}))}))},ea=_}},function(e){e.O(0,[461,396,892,971,864,744],function(){return e(e.s=92154)}),_N_E=e.O()}]);