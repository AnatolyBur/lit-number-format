/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol();class s{constructor(t,s){if(s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return t&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const e=new Map,o=t=>{let o=e.get(t);return void 0===o&&e.set(t,o=new s(t,i)),o},n=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const s of t.cssRules)i+=s.cssText;return(t=>o("string"==typeof t?t:t+""))(i)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var r,h,l,a;const c={toAttribute(t,i){switch(i){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},u=(t,i)=>i!==t&&(i==i||t==t),d={attribute:!0,type:String,converter:c,reflect:!1,hasChanged:u};class f extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u()}static addInitializer(t){var i;null!==(i=this.v)&&void 0!==i||(this.v=[]),this.v.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this.Πp(s,i);void 0!==e&&(this.Πm.set(e,s),t.push(e))})),t}static createProperty(t,i=d){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e)}}static getPropertyDescriptor(t,i,s){return{get(){return this[i]},set(e){const o=this[t];this[i]=e,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||d}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)i.unshift(n(t))}else void 0!==t&&i.push(n(t));return i}static Πp(t,i){const s=i.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)))}addController(t){var i,s;(null!==(i=this.ΠU)&&void 0!==i?i:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var i;null===(i=this.ΠU)||void 0===i||i.splice(this.ΠU.indexOf(t)>>>0,1)}Π_(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this.Πi.set(i,this[i]),delete this[i])}))}createRenderRoot(){var i;const s=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{t?i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):s.forEach((t=>{const s=document.createElement("style");s.textContent=t.cssText,i.appendChild(s)}))})(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0)}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)})),this.Πo=new Promise((t=>this.Πl=t))}attributeChangedCallback(t,i,s){this.K(t,s)}Πj(t,i,s=d){var e,o;const n=this.constructor.Πp(t,s);if(void 0!==n&&!0===s.reflect){const r=(null!==(o=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==o?o:c.toAttribute)(i,s.type);this.Πh=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this.Πh=null}}K(t,i){var s,e,o;const n=this.constructor,r=n.Πm.get(t);if(void 0!==r&&this.Πh!==r){const t=n.getPropertyOptions(r),h=t.converter,l=null!==(o=null!==(e=null===(s=h)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof h?h:null)&&void 0!==o?o:c.fromAttribute;this.Πh=r,this[r]=l(i,t.type),this.Πh=null}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||u)(this[t],i)?(this.L.has(t)||this.L.set(t,i),!0===s.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this.Πg=this.Πq())}async Πq(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo}catch(t){Promise.reject(t)}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,i)=>this[i]=t)),this.Πi=void 0);let i=!1;const s=this.L;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this.Π$()}catch(t){throw i=!1,this.Π$(),t}i&&this.E(s)}willUpdate(t){}E(t){var i;null===(i=this.ΠU)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}Π$(){this.L=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return!0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,i)=>this.Πj(i,this[i],t))),this.Πk=void 0),this.Π$()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var v,p,m,g;f.finalized=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null===(h=(r=globalThis).reactiveElementPlatformSupport)||void 0===h||h.call(r,{ReactiveElement:f}),(null!==(l=(a=globalThis).reactiveElementVersions)&&void 0!==l?l:a.reactiveElementVersions=[]).push("1.0.0-rc.2");const y=globalThis.trustedTypes,S=y?y.createPolicy("lit-html",{createHTML:t=>t}):void 0,w=`lit$${(Math.random()+"").slice(9)}$`,b="?"+w,$=`<${b}>`,x=document,C=(t="")=>x.createComment(t),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,E=Array.isArray,A=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,k=/-->/g,D=/>/g,M=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,T=/'/g,P=/"/g,R=/^(?:script|style|textarea)$/i,F=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),V=new WeakMap,j=x.createTreeWalker(x,129,null,!1);class O{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let o=0,n=0;const r=t.length-1,h=this.parts,[l,a]=((t,i)=>{const s=t.length-1,e=[];let o,n=2===i?"<svg>":"",r=A;for(let i=0;i<s;i++){const s=t[i];let h,l,a=-1,c=0;for(;c<s.length&&(r.lastIndex=c,l=r.exec(s),null!==l);)c=r.lastIndex,r===A?"!--"===l[1]?r=k:void 0!==l[1]?r=D:void 0!==l[2]?(R.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=M):void 0!==l[3]&&(r=M):r===M?">"===l[0]?(r=null!=o?o:A,a=-1):void 0===l[1]?a=-2:(a=r.lastIndex-l[2].length,h=l[1],r=void 0===l[3]?M:'"'===l[3]?P:T):r===P||r===T?r=M:r===k||r===D?r=A:(r=M,o=void 0);const u=r===M&&t[i+1].startsWith("/>")?" ":"";n+=r===A?s+$:a>=0?(e.push(h),s.slice(0,a)+"$lit$"+s.slice(a)+w+u):s+w+(-2===a?(e.push(void 0),i):u)}const h=n+(t[s]||"<?>")+(2===i?"</svg>":"");return[void 0!==S?S.createHTML(h):h,e]})(t,i);if(this.el=O.createElement(l,s),j.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(e=j.nextNode())&&h.length<r;){if(1===e.nodeType){if(e.hasAttributes()){const t=[];for(const i of e.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(w)){const s=a[n++];if(t.push(i),void 0!==s){const t=e.getAttribute(s.toLowerCase()+"$lit$").split(w),i=/([.?@])?(.*)/.exec(s);h.push({type:1,index:o,name:i[2],strings:t,ctor:"."===i[1]?W:"?"===i[1]?Z:"@"===i[1]?B:z})}else h.push({type:6,index:o})}for(const i of t)e.removeAttribute(i)}if(R.test(e.tagName)){const t=e.textContent.split(w),i=t.length-1;if(i>0){e.textContent=y?y.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],C()),j.nextNode(),h.push({type:2,index:++o});e.append(t[i],C())}}}else if(8===e.nodeType)if(e.data===b)h.push({type:2,index:o});else{let t=-1;for(;-1!==(t=e.data.indexOf(w,t+1));)h.push({type:7,index:o}),t+=w.length-1}o++}}static createElement(t,i){const s=x.createElement("template");return s.innerHTML=t,s}}function U(t,i,s=t,e){var o,n,r,h;if(i===F)return i;let l=void 0!==e?null===(o=s.Σi)||void 0===o?void 0:o[e]:s.Σo;const a=N(i)?void 0:i._$litDirective$;return(null==l?void 0:l.constructor)!==a&&(null===(n=null==l?void 0:l.O)||void 0===n||n.call(l,!1),void 0===a?l=void 0:(l=new a(t),l.T(t,s,e)),void 0!==e?(null!==(r=(h=s).Σi)&&void 0!==r?r:h.Σi=[])[e]=l:s.Σo=l),void 0!==l&&(i=U(t,l.S(t,i.values),l,e)),i}class L{constructor(t,i){this.l=[],this.N=void 0,this.D=t,this.M=i}u(t){var i;const{el:{content:s},parts:e}=this.D,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:x).importNode(s,!0);j.currentNode=o;let n=j.nextNode(),r=0,h=0,l=e[0];for(;void 0!==l;){if(r===l.index){let i;2===l.type?i=new _(n,n.nextSibling,this,t):1===l.type?i=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(i=new K(n,this,t)),this.l.push(i),l=e[++h]}r!==(null==l?void 0:l.index)&&(n=j.nextNode(),r++)}return o}v(t){let i=0;for(const s of this.l)void 0!==s&&(void 0!==s.strings?(s.I(t,s,i),i+=s.strings.length-2):s.I(t[i])),i++}}class _{constructor(t,i,s,e){this.type=2,this.N=void 0,this.A=t,this.B=i,this.M=s,this.options=e}setConnected(t){var i;null===(i=this.P)||void 0===i||i.call(this,t)}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,i=this){t=U(this,t,i),N(t)?t===I||null==t||""===t?(this.H!==I&&this.R(),this.H=I):t!==this.H&&t!==F&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):(t=>{var i;return E(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])})(t)?this.g(t):this.m(t)}k(t,i=this.B){return this.A.parentNode.insertBefore(t,i)}$(t){this.H!==t&&(this.R(),this.H=this.k(t))}m(t){const i=this.A.nextSibling;null!==i&&3===i.nodeType&&(null===this.B?null===i.nextSibling:i===this.B.previousSibling)?i.data=t:this.$(x.createTextNode(t)),this.H=t}_(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this.C(t):(void 0===e.el&&(e.el=O.createElement(e.h,this.options)),e);if((null===(i=this.H)||void 0===i?void 0:i.D)===o)this.H.v(s);else{const t=new L(o,this),i=t.u(this.options);t.v(s),this.$(i),this.H=t}}C(t){let i=V.get(t.strings);return void 0===i&&V.set(t.strings,i=new O(t)),i}g(t){E(this.H)||(this.H=[],this.R());const i=this.H;let s,e=0;for(const o of t)e===i.length?i.push(s=new _(this.k(C()),this.k(C()),this,this.options)):s=i[e],s.I(o),e++;e<i.length&&(this.R(s&&s.B.nextSibling,e),i.length=e)}R(t=this.A.nextSibling,i){var s;for(null===(s=this.P)||void 0===s||s.call(this,!1,!0,i);t&&t!==this.B;){const i=t.nextSibling;t.remove(),t=i}}}class z{constructor(t,i,s,e,o){this.type=1,this.H=I,this.N=void 0,this.V=void 0,this.element=t,this.name=i,this.M=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this.H=Array(s.length-1).fill(I),this.strings=s):this.H=I}get tagName(){return this.element.tagName}I(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=U(this,t,i,0),n=!N(t)||t!==this.H&&t!==F,n&&(this.H=t);else{const e=t;let r,h;for(t=o[0],r=0;r<o.length-1;r++)h=U(this,e[s+r],i,r),h===F&&(h=this.H[r]),n||(n=!N(h)||h!==this.H[r]),h===I?t=I:t!==I&&(t+=(null!=h?h:"")+o[r+1]),this.H[r]=h}n&&!e&&this.W(t)}W(t){t===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class W extends z{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===I?void 0:t}}class Z extends z{constructor(){super(...arguments),this.type=4}W(t){t&&t!==I?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class B extends z{constructor(){super(...arguments),this.type=5}I(t,i=this){var s;if((t=null!==(s=U(this,t,i,0))&&void 0!==s?s:I)===F)return;const e=this.H,o=t===I&&e!==I||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==I&&(e===I||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this.H=t}handleEvent(t){var i,s;"function"==typeof this.H?this.H.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this.H.handleEvent(t)}}class K{constructor(t,i,s){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=i,this.options=s}I(t){U(this,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var G,H,q,J;null===(p=(v=globalThis).litHtmlPlatformSupport)||void 0===p||p.call(v,O,_),(null!==(m=(g=globalThis).litHtmlVersions)&&void 0!==m?m:g.litHtmlVersions=[]).push("2.0.0-rc.3");const Q=globalThis.trustedTypes,X=Q?Q.createPolicy("lit-html",{createHTML:t=>t}):void 0,Y=`lit$${(Math.random()+"").slice(9)}$`,tt="?"+Y,it=`<${tt}>`,st=document,et=(t="")=>st.createComment(t),ot=t=>null===t||"object"!=typeof t&&"function"!=typeof t,nt=Array.isArray,rt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ht=/-->/g,lt=/>/g,at=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,ct=/'/g,ut=/"/g,dt=/^(?:script|style|textarea)$/i,ft=(t=>(i,...s)=>({_$litType$:t,strings:i,values:s}))(1),vt=Symbol.for("lit-noChange"),pt=Symbol.for("lit-nothing"),mt=new WeakMap,gt=st.createTreeWalker(st,129,null,!1);class yt{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let o=0,n=0;const r=t.length-1,h=this.parts,[l,a]=((t,i)=>{const s=t.length-1,e=[];let o,n=2===i?"<svg>":"",r=rt;for(let i=0;i<s;i++){const s=t[i];let h,l,a=-1,c=0;for(;c<s.length&&(r.lastIndex=c,l=r.exec(s),null!==l);)c=r.lastIndex,r===rt?"!--"===l[1]?r=ht:void 0!==l[1]?r=lt:void 0!==l[2]?(dt.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=at):void 0!==l[3]&&(r=at):r===at?">"===l[0]?(r=null!=o?o:rt,a=-1):void 0===l[1]?a=-2:(a=r.lastIndex-l[2].length,h=l[1],r=void 0===l[3]?at:'"'===l[3]?ut:ct):r===ut||r===ct?r=at:r===ht||r===lt?r=rt:(r=at,o=void 0);const u=r===at&&t[i+1].startsWith("/>")?" ":"";n+=r===rt?s+it:a>=0?(e.push(h),s.slice(0,a)+"$lit$"+s.slice(a)+Y+u):s+Y+(-2===a?(e.push(void 0),i):u)}const h=n+(t[s]||"<?>")+(2===i?"</svg>":"");return[void 0!==X?X.createHTML(h):h,e]})(t,i);if(this.el=yt.createElement(l,s),gt.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes)}for(;null!==(e=gt.nextNode())&&h.length<r;){if(1===e.nodeType){if(e.hasAttributes()){const t=[];for(const i of e.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(Y)){const s=a[n++];if(t.push(i),void 0!==s){const t=e.getAttribute(s.toLowerCase()+"$lit$").split(Y),i=/([.?@])?(.*)/.exec(s);h.push({type:1,index:o,name:i[2],strings:t,ctor:"."===i[1]?xt:"?"===i[1]?Ct:"@"===i[1]?Nt:$t})}else h.push({type:6,index:o})}for(const i of t)e.removeAttribute(i)}if(dt.test(e.tagName)){const t=e.textContent.split(Y),i=t.length-1;if(i>0){e.textContent=Q?Q.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],et()),gt.nextNode(),h.push({type:2,index:++o});e.append(t[i],et())}}}else if(8===e.nodeType)if(e.data===tt)h.push({type:2,index:o});else{let t=-1;for(;-1!==(t=e.data.indexOf(Y,t+1));)h.push({type:7,index:o}),t+=Y.length-1}o++}}static createElement(t,i){const s=st.createElement("template");return s.innerHTML=t,s}}function St(t,i,s=t,e){var o,n,r,h;if(i===vt)return i;let l=void 0!==e?null===(o=s.Σi)||void 0===o?void 0:o[e]:s.Σo;const a=ot(i)?void 0:i._$litDirective$;return(null==l?void 0:l.constructor)!==a&&(null===(n=null==l?void 0:l.O)||void 0===n||n.call(l,!1),void 0===a?l=void 0:(l=new a(t),l.T(t,s,e)),void 0!==e?(null!==(r=(h=s).Σi)&&void 0!==r?r:h.Σi=[])[e]=l:s.Σo=l),void 0!==l&&(i=St(t,l.S(t,i.values),l,e)),i}class wt{constructor(t,i){this.l=[],this.N=void 0,this.D=t,this.M=i}u(t){var i;const{el:{content:s},parts:e}=this.D,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:st).importNode(s,!0);gt.currentNode=o;let n=gt.nextNode(),r=0,h=0,l=e[0];for(;void 0!==l;){if(r===l.index){let i;2===l.type?i=new bt(n,n.nextSibling,this,t):1===l.type?i=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(i=new Et(n,this,t)),this.l.push(i),l=e[++h]}r!==(null==l?void 0:l.index)&&(n=gt.nextNode(),r++)}return o}v(t){let i=0;for(const s of this.l)void 0!==s&&(void 0!==s.strings?(s.I(t,s,i),i+=s.strings.length-2):s.I(t[i])),i++}}class bt{constructor(t,i,s,e){this.type=2,this.N=void 0,this.A=t,this.B=i,this.M=s,this.options=e}setConnected(t){var i;null===(i=this.P)||void 0===i||i.call(this,t)}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,i=this){t=St(this,t,i),ot(t)?t===pt||null==t||""===t?(this.H!==pt&&this.R(),this.H=pt):t!==this.H&&t!==vt&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):(t=>{var i;return nt(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])})(t)?this.g(t):this.m(t)}k(t,i=this.B){return this.A.parentNode.insertBefore(t,i)}$(t){this.H!==t&&(this.R(),this.H=this.k(t))}m(t){const i=this.A.nextSibling;null!==i&&3===i.nodeType&&(null===this.B?null===i.nextSibling:i===this.B.previousSibling)?i.data=t:this.$(st.createTextNode(t)),this.H=t}_(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this.C(t):(void 0===e.el&&(e.el=yt.createElement(e.h,this.options)),e);if((null===(i=this.H)||void 0===i?void 0:i.D)===o)this.H.v(s);else{const t=new wt(o,this),i=t.u(this.options);t.v(s),this.$(i),this.H=t}}C(t){let i=mt.get(t.strings);return void 0===i&&mt.set(t.strings,i=new yt(t)),i}g(t){nt(this.H)||(this.H=[],this.R());const i=this.H;let s,e=0;for(const o of t)e===i.length?i.push(s=new bt(this.k(et()),this.k(et()),this,this.options)):s=i[e],s.I(o),e++;e<i.length&&(this.R(s&&s.B.nextSibling,e),i.length=e)}R(t=this.A.nextSibling,i){var s;for(null===(s=this.P)||void 0===s||s.call(this,!1,!0,i);t&&t!==this.B;){const i=t.nextSibling;t.remove(),t=i}}}class $t{constructor(t,i,s,e,o){this.type=1,this.H=pt,this.N=void 0,this.V=void 0,this.element=t,this.name=i,this.M=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this.H=Array(s.length-1).fill(pt),this.strings=s):this.H=pt}get tagName(){return this.element.tagName}I(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=St(this,t,i,0),n=!ot(t)||t!==this.H&&t!==vt,n&&(this.H=t);else{const e=t;let r,h;for(t=o[0],r=0;r<o.length-1;r++)h=St(this,e[s+r],i,r),h===vt&&(h=this.H[r]),n||(n=!ot(h)||h!==this.H[r]),h===pt?t=pt:t!==pt&&(t+=(null!=h?h:"")+o[r+1]),this.H[r]=h}n&&!e&&this.W(t)}W(t){t===pt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class xt extends $t{constructor(){super(...arguments),this.type=3}W(t){this.element[this.name]=t===pt?void 0:t}}class Ct extends $t{constructor(){super(...arguments),this.type=4}W(t){t&&t!==pt?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class Nt extends $t{constructor(){super(...arguments),this.type=5}I(t,i=this){var s;if((t=null!==(s=St(this,t,i,0))&&void 0!==s?s:pt)===vt)return;const e=this.H,o=t===pt&&e!==pt||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==pt&&(e===pt||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this.H=t}handleEvent(t){var i,s;"function"==typeof this.H?this.H.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this.H.handleEvent(t)}}class Et{constructor(t,i,s){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=i,this.options=s}I(t){St(this,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var At,kt,Dt,Mt,Tt,Pt;null===(H=(G=globalThis).litHtmlPlatformSupport)||void 0===H||H.call(G,yt,bt),(null!==(q=(J=globalThis).litHtmlVersions)&&void 0!==q?q:J.litHtmlVersions=[]).push("2.0.0-rc.3"),(null!==(At=(Pt=globalThis).litElementVersions)&&void 0!==At?At:Pt.litElementVersions=[]).push("3.0.0-rc.2");class Rt extends f{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0}createRenderRoot(){var t,i;const s=super.createRenderRoot();return null!==(t=(i=this.renderOptions).renderBefore)&&void 0!==t||(i.renderBefore=s.firstChild),s}update(t){const i=this.render();super.update(t),this.Φt=((t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new bt(i.insertBefore(et(),t),t,void 0,s)}return r.I(t),r})(i,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1)}render(){return vt}}Rt.finalized=!0,Rt._$litElement$=!0,null===(Dt=(kt=globalThis).litElementHydrateSupport)||void 0===Dt||Dt.call(kt,{LitElement:Rt}),null===(Tt=(Mt=globalThis).litElementPlatformSupport)||void 0===Tt||Tt.call(Mt,{LitElement:Rt});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ft=(t,i)=>"method"===i.kind&&i.descriptor&&!("value"in i.descriptor)?{...i,finisher(s){s.createProperty(i.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:i.key,initializer(){"function"==typeof i.initializer&&(this[i.key]=i.initializer.call(this))},finisher(s){s.createProperty(i.key,t)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function It(t){return(i,s)=>void 0!==s?((t,i,s)=>{i.constructor.createProperty(s,t)})(t,i,s):Ft(t,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function Vt(t){return It({...t,state:!0,attribute:!1})}function jt(){return!0}function Ot(t){return!!(t||"").match(/\d/)}function Ut(t){return t.replace(/[-[\]/{}()*+?.\\^$|]/g,"\\$&")}function Lt(t,i=!0){const s="-"===t[0],e=s&&i,o=(t=t.replace("-","")).split(".");return{beforeDecimal:o[0],afterDecimal:o[1]||"",hasNagation:s,addNegation:e}}function _t(t,i,s){let e="";const o=s?"0":"";for(let s=0;s<=i-1;s++)e+=t[s]||o;return e}function zt(t,i){return Array(i+1).join(t)}function Wt(t){const i="-"===(t+="")[0]?"-":"";i&&(t=t.substring(1));let[s,e]=t.split(/[eE]/g);if(e=Number(e),!e)return i+s;s=s.replace(".","");const o=1+e,n=s.length;return o<0?s="0."+zt("0",Math.abs(o))+s:o>=n?s+=zt("0",o-n):s=(s.substring(0,o)||"0")+"."+s.substring(o),i+s}function Zt(t,i){if(t.value=t.value,null!==t){if(t.createTextRange){const s=t.createTextRange();return s.move("character",i),s.select(),!0}return t.selectionStart||0===t.selectionStart?(t.focus(),t.setSelectionRange(i,i),!0):(t.focus(),!1)}}function Bt(t,i,s){return Math.min(Math.max(t,i),s)}function Kt(t){return Math.max(Number(t.selectionStart),Number(t.selectionEnd))}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Gt=function(t,i,s,e){for(var o,n=arguments.length,r=n<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,h=t.length-1;h>=0;h--)(o=t[h])&&(r=(n<3?o(r):n>3?o(i,s,r):o(i,s))||r);return n>3&&r&&Object.defineProperty(i,s,r),r};let Ht=class extends Rt{constructor(){super(...arguments),this.format=null,this.decimalSeparator=".",this.thousandSeparator=!0,this.allowedDecimalSeparators=[],this.suffix="",this.prefix="",this.fixedDecimalScale=!1,this.allowNegative=!0,this.thousandsGroupStyle="thousand",this.allowEmptyFormatting=!1,this.value="",this.numAsString="",this.mounted=!1,this.isNumericString=!1,this.isAllowed=jt,this.focusTimeout=null,this.allowLeadingZeros=!1,this.type="text",this.selectionBeforeInput={selectionStart:0,selectionEnd:0},this.onBlur=t=>{const{format:i,allowLeadingZeros:s}=this;let{numAsString:e}=this;const o=this.value;if(this.focusedElm=null,this.focusTimeout&&clearTimeout(this.focusTimeout),!i){isNaN(parseFloat(e))&&(e=""),s||(e=function(t){if(!t)return String(t);const i="-"===t[0];i&&(t=t.substring(1,t.length));const s=t.split("."),e=s[0].replace(/^0+/,"")||"0",o=s[1]||"";return`${i?"-":""}${e}${o?`.${o}`:""}`}(e));const i=this.formatNumString(e);if(i!==o)return void this.updateValue({formattedValue:i,numAsString:e,input:t.target,setCaretPosition:!1})}}}getFormatString(){return"string"==typeof this.format?this.format:""}getFloatString(t=""){const{decimalScale:i}=this,{decimalSeparator:s}=this.getSeparators(),e=this.getNumberRegex(!0),o="-"===t[0];o&&(t=t.replace("-","")),s&&0===i&&(t=t.split(s)[0]);const n=(t=(t.match(e)||[]).join("").replace(s,".")).indexOf(".");return-1!==n&&(t=`${t.substring(0,n)}.${t.substring(n+1,t.length).replace(new RegExp(Ut(s),"g"),"")}`),o&&(t="-"+t),t}getNumberRegex(t,i){const{format:s,decimalScale:e}=this,{decimalSeparator:o}=this.getSeparators();return new RegExp("\\d"+(!o||0===e||i||s?"":"|"+Ut(o)),t?"g":void 0)}getSeparators(){const{decimalSeparator:t}=this;let{thousandSeparator:i,allowedDecimalSeparators:s}=this;return!0===i&&(i=","),s||(s=[t,"."]),{decimalSeparator:t,thousandSeparator:i,allowedDecimalSeparators:s}}getMaskAtIndex(t){const{mask:i=" "}=this;return"string"==typeof i?i:i[t]||" "}getValueObject(t,i){const s=parseFloat(i);return{formattedValue:t,value:i,floatValue:isNaN(s)?void 0:s}}setPatchedCaretPosition(t,i,s){Zt(t,i),setTimeout((()=>{t.value===s&&Zt(t,i)}),0)}correctCaretPosition(t,i,s){const{prefix:e,suffix:o,format:n}=this;if(""===t)return 0;if(i=Bt(i,0,t.length),!n){const s="-"===t[0];return Bt(i,e.length+(s?1:0),t.length-o.length)}if("function"==typeof n)return i;if("#"===n[i]&&Ot(t[i]))return i;if("#"===n[i-1]&&Ot(t[i-1]))return i;const r=n.indexOf("#");i=Bt(i,r,n.lastIndexOf("#")+1);const h=n.substring(i,n.length).indexOf("#");let l=i;const a=i+(-1===h?0:h);for(;l>r&&("#"!==n[l]||!Ot(t[l]));)l-=1;return!Ot(t[a])||"left"===s&&i!==r||i-l<a-i?Ot(t[l])?l+1:l:a}getCaretPosition(t,i,s){const{format:e}=this,o=this.value,n=this.getNumberRegex(!0),r=(t.match(n)||[]).join(""),h=(i.match(n)||[]).join("");let l,a;for(l=0,a=0;a<s;a++){const s=t[a]||"",e=i[l]||"";if((s.match(n)||s===e)&&("0"!==s||!e.match(n)||"0"===e||r.length===h.length)){for(;s!==i[l]&&l<i.length;)l++;l++}}return"string"!=typeof e||o||(l=i.length),l=this.correctCaretPosition(i,l),l}removePrefixAndSuffix(t){const{format:i,prefix:s,suffix:e}=this;if(!i&&t){const i="-"===t[0];i&&(t=t.substring(1,t.length));const o=(t=s&&0===t.indexOf(s)?t.substring(s.length,t.length):t).lastIndexOf(e);t=e&&-1!==o&&o===t.length-e.length?t.substring(0,o):t,i&&(t="-"+t)}return t}removePatternFormatting(t){const i=this.getFormatString().split("#").filter((t=>""!==t));let s=0,e="";for(let o=0,n=i.length;o<=n;o++){const r=i[o]||"",h=o===n?t.length:t.indexOf(r,s);if(-1===h){e=t;break}e+=t.substring(s,h),s=h+r.length}return(e.match(/\d/g)||[]).join("")}removeFormatting(t){const{format:i,removeFormatting:s}=this;return t?(i?t="string"==typeof i?this.removePatternFormatting(t):"function"==typeof s?s(t):(t.match(/\d/g)||[]).join(""):(t=this.removePrefixAndSuffix(t),t=this.getFloatString(t)),t):t}formatWithPattern(t){const i=this.getFormatString();let s=0;const e=i.split("");for(let o=0,n=i.length;o<n;o++)"#"===i[o]&&(e[o]=t[s]||this.getMaskAtIndex(s),s+=1);return e.join("")}formatAsNumber(t){const{decimalScale:i,fixedDecimalScale:s,prefix:e,suffix:o,allowNegative:n,thousandsGroupStyle:r}=this,{thousandSeparator:h,decimalSeparator:l}=this.getSeparators(),a=-1!==t.indexOf(".")||i&&s;let{beforeDecimal:c,afterDecimal:u,addNegation:d}=Lt(t,n);return void 0!==i&&(u=_t(u,i,s)),h&&(c=function(t,i,s){const e=function(t){switch(t){case"lakh":return/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;case"wan":return/(\d)(?=(\d{4})+(?!\d))/g;case"thousand":default:return/(\d)(?=(\d{3})+(?!\d))/g}}(s);let o=t.search(/[1-9]/);return o=-1===o?t.length:o,t.substring(0,o)+t.substring(o,t.length).replace(e,"$1"+i)}(c,h,r)),e&&(c=e+c),o&&(u+=o),d&&(c="-"+c),t=c+(a&&l||"")+u}formatNumString(t=""){const{format:i,allowEmptyFormatting:s}=this;let e=t;return e=""!==t||s?"-"!==t||i?"string"==typeof i?this.formatWithPattern(e):"function"==typeof i?i(e):this.formatAsNumber(e):"-":"",e}formatValueProp(t){const{format:i,decimalScale:s,fixedDecimalScale:e,allowEmptyFormatting:o}=this;let{value:n,isNumericString:r}=this;n=null==n?t:n;const h=!n&&0!==Number(n);if(h&&o&&(n=""),h&&!o)return"";"number"==typeof n&&(n=Wt(n),r=!0),"Infinity"===n&&r&&(n=""),r&&!i&&"number"==typeof s&&(n=function(t,i,s){if(-1!==["","-"].indexOf(t))return t;const e=-1!==t.indexOf(".")&&i,{beforeDecimal:o,afterDecimal:n,hasNagation:r}=Lt(t),h=parseFloat(`0.${n||"0"}`),l=(n.length<=i?Wt(h):h.toFixed(i)).split(".");return`${r?"-":""}${o.split("").reverse().reduce(((t,i,s)=>t.length>s?(Number(t[0])+Number(i)).toString()+t.substring(1,t.length):i+t),l[0])}${e?".":""}${_t(l[1]||"",Math.min(i,n.length),s)}`}(n,s,e));return r?this.formatNumString(n):this.formatInput(n)}formatNegation(t=""){const{allowNegative:i}=this,s=new RegExp("(-)"),e=new RegExp("(-)(.)*(-)"),o=s.test(t),n=e.test(t);return t=t.replace(/-/g,""),o&&!n&&i&&(t="-"+t),t}formatInput(t=""){const{format:i}=this;return i||(t=this.removePrefixAndSuffix(t),t=this.formatNegation(t)),t=this.removeFormatting(t),this.formatNumString(t)}isCharacterAFormat(t,i){const{format:s,prefix:e,suffix:o,decimalScale:n,fixedDecimalScale:r}=this,{decimalSeparator:h}=this.getSeparators();return"string"==typeof s&&"#"!==s[t]||!(s||!(t<e.length||t>=i.length-o.length||n&&r&&i[t]===h))}checkIfFormatGotDeleted(t,i,s){for(let e=t;e<i;e++)if(this.isCharacterAFormat(e,s))return!0;return!1}correctInputValue(t,i,s){const{format:e,allowNegative:o,prefix:n,suffix:r,decimalScale:h}=this,{allowedDecimalSeparators:l,decimalSeparator:a}=this.getSeparators(),c=this.numAsString||"",{selectionStart:u,selectionEnd:d}=this.selectionBeforeInput,{start:f,end:v}=function(t,i){let s=0,e=0;const o=t.length,n=i.length;for(;t[s]===i[s]&&s<o;)s++;for(;t[o-1-e]===i[n-1-e]&&n-e>s&&o-e>s;)e++;return{start:s,end:o-e}}(i,s);if(!e&&f===v&&-1!==l.indexOf(s[u])){const t=0===h?"":a;return s.substr(0,u)+t+s.substr(u+1,s.length)}const p=e?0:n.length,m=i.length-(e?0:r.length);if(s.length>i.length||!s.length||f===v||0===u&&d===i.length||0===f&&v===i.length||u===p&&d===m)return s;if(this.checkIfFormatGotDeleted(f,v,i)&&(s=i),!e){const i=this.removeFormatting(s),{beforeDecimal:e,afterDecimal:n,addNegation:r}=Lt(i,o),h=t<s.indexOf(a)+1;if(i.length<c.length&&h&&""===e&&!parseFloat(n))return r?"-":""}return s}updateValue(t){const{formattedValue:i,input:s,setCaretPosition:e=!0}=t;let{numAsString:o,caretPos:n}=t;const r=this.value;if(s)if(e){if(!n){const e=t.inputValue||s.value,o=Kt(s);s.value=String(i),n=this.getCaretPosition(e,i,o)}this.setPatchedCaretPosition(s,n,i)}else s.value=String(i);if(void 0===o&&(o=this.removeFormatting(i)),i!==r){this.value=String(i),this.numAsString=o;const t=new CustomEvent("onValueChange",{detail:this.getValueObject(i,o)});this.dispatchEvent(t)}}onChange(t){const i=t.target;let s=i.value;const{isAllowed:e}=this,o=this.value||"",n=Kt(i);s=this.correctInputValue(n,String(o),s);let r=this.formatInput(s)||"";const h=this.removeFormatting(r),l=e(this.getValueObject(r,h));if(l||(r=String(o)),this.updateValue({formattedValue:r,numAsString:h,inputValue:s,input:i}),l){const i=new CustomEvent("onChange",{detail:t});this.dispatchEvent(i)}}onKeyDown(t){const i=t.target,{key:s}=t,{selectionStart:e,selectionEnd:o,value:n=""}=i;let r;const{decimalScale:h,fixedDecimalScale:l,prefix:a,suffix:c,onKeyDown:u}=this,d=this.getFormatString(),f=void 0!==h&&l,v=this.getNumberRegex(!1,f),p=new RegExp("-"),m="string"==typeof d;if(this.selectionBeforeInput={selectionStart:e,selectionEnd:o},"ArrowLeft"===s||"Backspace"===s?r=e-1:"ArrowRight"===s?r=e+1:"Delete"===s&&(r=e),void 0===r||e!==o)return void u(t);let g=r;const y=m?d.indexOf("#"):a.length,S=m?d.lastIndexOf("#")+1:n.length-c.length;if("ArrowLeft"===s||"ArrowRight"===s){const t="ArrowLeft"===s?"left":"right";g=this.correctCaretPosition(n,r,t)}else if("Delete"!==s||v.test(n[r])||p.test(n[r])){if("Backspace"===s&&!v.test(n[r]))if(e<=y+1&&"-"===n[0]&&void 0===d){const t=n.substring(1);this.updateValue({formattedValue:t,caretPos:g,input:i})}else if(!p.test(n[r])){for(;!v.test(n[g-1])&&g>y;)g--;g=this.correctCaretPosition(n,g,"left")}}else for(;!v.test(n[g])&&g<S;)g++;(g!==r||r<y||r>S)&&(t.preventDefault(),this.setPatchedCaretPosition(i,g,n)),t.isUnitTestRun&&this.setPatchedCaretPosition(i,g,n),u(t)}onMouseUp(t){const i=t.target,{selectionStart:s,selectionEnd:e,value:o=""}=i;if(s===e){const t=this.correctCaretPosition(o,s);t!==s&&this.setPatchedCaretPosition(i,t,o)}const n=new CustomEvent("onMouseUp",{detail:t});this.dispatchEvent(n)}onFocus(t){t.persist&&t.persist(),this.focusedElm=t.target,this.focusTimeout=setTimeout((()=>{const i=t.target,{selectionStart:s,selectionEnd:e,value:o=""}=i,n=this.correctCaretPosition(o,s);n===s||0===s&&e===o.length||this.setPatchedCaretPosition(i,n,o);const r=new CustomEvent("onFocus",{detail:t});this.dispatchEvent(r)}),0)}render(){const{type:t}=this,i=this.getFormatString(),{value:s,mounted:e}=this,o=e&&function(t){return t||!(navigator.platform&&/iPhone|iPod/.test(navigator.platform))}(i)?"numeric":void 0;return ft`
      <input
        part="input"
        @change="${this.onChange}"
        @input="${this.onChange}"
        @keyDown="${this.onKeyDown}"
        @mouseUp="${this.onMouseUp}"
        @focus="${this.onFocus}"
        @blur="${this.onBlur}"
        .value="${s}"
        .type="${t}"
        .inputmode="${o}"
      />
    `}};Ht.styles=((t,...i)=>{const e=1===t.length?t[0]:i.reduce(((i,e,o)=>i+(t=>{if(t instanceof s)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(e)+t[o+1]),t[0]);return o(e)})`
    :host {
      display: inline-block;
    }
  `,Gt([It()],Ht.prototype,"decimalScale",void 0),Gt([It()],Ht.prototype,"format",void 0),Gt([It()],Ht.prototype,"decimalSeparator",void 0),Gt([It()],Ht.prototype,"thousandSeparator",void 0),Gt([It()],Ht.prototype,"allowedDecimalSeparators",void 0),Gt([It()],Ht.prototype,"mask",void 0),Gt([It()],Ht.prototype,"suffix",void 0),Gt([It()],Ht.prototype,"prefix",void 0),Gt([It()],Ht.prototype,"fixedDecimalScale",void 0),Gt([It()],Ht.prototype,"allowNegative",void 0),Gt([It()],Ht.prototype,"thousandsGroupStyle",void 0),Gt([It()],Ht.prototype,"allowEmptyFormatting",void 0),Gt([Vt()],Ht.prototype,"value",void 0),Gt([Vt()],Ht.prototype,"numAsString",void 0),Gt([Vt()],Ht.prototype,"mounted",void 0),Gt([It()],Ht.prototype,"isNumericString",void 0),Gt([It()],Ht.prototype,"isAllowed",void 0),Gt([It()],Ht.prototype,"focusTimeout",void 0),Gt([It()],Ht.prototype,"allowLeadingZeros",void 0),Gt([It()],Ht.prototype,"type",void 0),Gt([It()],Ht.prototype,"focusedElm",void 0),Ht=Gt([(t=>i=>"function"==typeof i?((t,i)=>(window.customElements.define(t,i),i))(t,i):((t,i)=>{const{kind:s,elements:e}=i;return{kind:s,elements:e,finisher(i){window.customElements.define(t,i)}}})(t,i))("gx-number-format")],Ht);export{Ht as GxNumberFormat};
