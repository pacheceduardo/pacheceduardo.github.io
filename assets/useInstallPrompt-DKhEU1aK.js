import{g as l}from"./index-DFoffBxs.js";import{r}from"./query-BXlQUwKy.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=l("Share",[["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["polyline",{points:"16 6 12 2 8 6",key:"m901s6"}],["line",{x1:"12",x2:"12",y1:"2",y2:"15",key:"1p0rca"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=l("SquarePlus",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]),d=()=>window.matchMedia("(display-mode: standalone)").matches||navigator.standalone===!0,c=()=>/iphone|ipad|ipod/i.test(navigator.userAgent);function f(){const[e,n]=r.useState(null),[a,o]=r.useState(d);r.useEffect(()=>{if(a)return;const t=i=>{i.preventDefault(),n(i)},s=()=>{o(!0),n(null)};return window.addEventListener("beforeinstallprompt",t),window.addEventListener("appinstalled",s),()=>{window.removeEventListener("beforeinstallprompt",t),window.removeEventListener("appinstalled",s)}},[a]);const p=async()=>{if(!e)return;await e.prompt();const{outcome:t}=await e.userChoice;t==="accepted"&&o(!0),n(null)};return{installed:a,isIOS:c(),canPromptInstall:!!e,promptInstall:p}}export{w as S,h as a,f as u};
