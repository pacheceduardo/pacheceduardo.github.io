import{c as u}from"./index-ur951INU.js";import{r as a}from"./query-BydKBSTv.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=u("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);function h(n){const[o,r]=a.useState(()=>Date.now()),t=n?new Date(n).getTime():null,e=t!==null&&t>o;return a.useEffect(()=>{if(!e||t===null)return;const c=Math.min(Math.max(t-Date.now()+500,0),2e9),s=setTimeout(()=>r(Date.now()),c);return()=>clearTimeout(s)},[e,t]),{pending:e,opensAt:e?n??null:null}}export{m as C,h as u};
