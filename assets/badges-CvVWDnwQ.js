import{c as n}from"./index-DHvNBSJj.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=n("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]),r=[{id:"solteiro",label:"Solteiro(a)"},{id:"namorando",label:"Namorando"},{id:"noivo",label:"Noivo(a)"},{id:"casado",label:"Casado(a)"},{id:"complicado",label:"É complicado"},{id:"reservado",label:"Prefiro não dizer"}],s=Object.fromEntries(r.map(o=>[o.id,o])),c=["namorando","noivo","casado"];function d(o){const e=new Date(o),t=new Date,a=(t.getFullYear()-e.getFullYear())*12+(t.getMonth()-e.getMonth());return a>=24?{emoji:"🏛️",label:`${Math.floor(a/12)} anos de 4Bros`}:a>=12?{emoji:"🎉",label:"1 ano de 4Bros"}:a>=6?{emoji:"🌱",label:"6 meses de casa"}:null}export{i as H,s as R,c as T,r as a,d as t};
