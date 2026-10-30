import{l as q}from"./index-DJENG645.js";const T="America/Sao_Paulo",H=new Intl.DateTimeFormat("pt-BR",{timeZone:T,day:"2-digit",month:"2-digit",year:"numeric"}),F=new Intl.DateTimeFormat("pt-BR",{timeZone:T,day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}),u=e=>e?H.format(new Date(e)):"",h=e=>(e/100).toLocaleString("pt-BR",{style:"currency",currency:"BRL"}),d=e=>String(e??"").replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]),D=e=>e.nickname||e.full_name||"Ex-membro",j=e=>e.game_starts_at??e.event_starts_at??e.created_at,B=e=>e.game_id?`Jogo ${u(e.game_starts_at).slice(0,5)}${e.venue_name?` · ${e.venue_name}`:""}`:e.event_id?`Evento: ${e.event_title??""}`:"Avulso",A={paid:"Pago",pending:"Em aberto",overdue:"Atrasado",waived:"Isento"},R={game:"Jogo",guest:"Convidado",wo_fine:"Multa por W.O.",uniform:"Uniforme",event:"Evento",manual:"Lançamento manual"},C=e=>e.reduce((n,c)=>(n.n++,c.status==="paid"?n.pago+=c.amount_cents:c.status==="waived"?n.isento+=c.amount_cents:(n.aberto+=c.amount_cents,c.status==="overdue"&&(n.atrasado+=c.amount_cents)),n),{pago:0,aberto:0,atrasado:0,isento:0,n:0});async function U(){try{const e=await(await fetch(q)).blob();return await new Promise(n=>{const c=new FileReader;c.onload=()=>n(String(c.result)),c.readAsDataURL(e)})}catch{return""}}const k=e=>e.validated_at??e.waived_at;async function X({linhas:e,filtros:n,geradoPor:c,modo:g="pessoas"}){const r=await U(),i=C(e),$=new Map;for(const a of e)$.set(a.user_id,[...$.get(a.user_id)??[],a]);const b=[...$.entries()].map(([a,t])=>({id:a,nome:D(t[0]),completo:t[0].full_name,ls:t,t:C(t)})).sort((a,t)=>t.t.atrasado-a.t.atrasado||t.t.aberto-a.t.aberto||a.nome.localeCompare(t.nome,"pt-BR")),_=new Map;for(const a of e){const t=a.game_id??a.event_id??"avulso",o=_.get(t)??{nome:B(a),quando:j(a),ls:[]};o.ls.push(a),_.set(t,o)}const z=[..._.values()].sort((a,t)=>t.quando.localeCompare(a.quando)),x=a=>`<span class="b ${a}">${A[a]}</span>`,m=(a,t="")=>`<td class="num ${t}">${a?h(a):"<span class='zero'>—</span>"}</td>`,I=[["Recebido",i.pago,"pago"],["Em aberto",i.aberto,"aberto"],["Atrasado",i.atrasado,"atrasado"],["Isento",i.isento,"isento"]].map(([a,t,o])=>`<div class="kpi ${o}"><small>${a}</small><b>${h(Number(t))}</b></div>`).join(""),P=z.length>1?`
  <section>
    <h2>Por jogo e evento</h2>
    <div class="rolagem"><table>
      <thead><tr><th>Jogo / evento</th><th class="num">Cobranças</th><th class="num">Recebido</th><th class="num">Em aberto</th><th class="num">Isento</th></tr></thead>
      <tbody>${z.map(a=>{const t=C(a.ls);return`<tr><td><b>${d(a.nome)}</b><div class="sub">${u(a.quando)}</div></td><td class="num">${t.n}</td>${m(t.pago,"pago")}${m(t.aberto,t.atrasado?"atrasado":"aberto")}${m(t.isento)}</tr>`}).join("")}</tbody>
    </table></div>
  </section>`:"",S=`
  <section>
    <h2>Por pessoa</h2>
    <div class="rolagem"><table>
      <thead><tr><th>Pessoa</th><th class="num">Cobranças</th><th class="num">Pago</th><th class="num">Em aberto</th><th class="num">Atrasado</th><th class="num">Isento</th></tr></thead>
      <tbody>${b.map(a=>`<tr><td><b>${d(a.nome)}</b>${a.completo&&a.completo!==a.nome?`<div class="sub">${d(a.completo)}</div>`:""}</td><td class="num">${a.t.n}</td>${m(a.t.pago,"pago")}${m(a.t.aberto,"aberto")}${m(a.t.atrasado,"atrasado")}${m(a.t.isento)}</tr>`).join("")}</tbody>
      <tfoot><tr><td>Total</td><td class="num">${i.n}</td>${m(i.pago,"pago")}${m(i.aberto,"aberto")}${m(i.atrasado,"atrasado")}${m(i.isento)}</tr></tfoot>
    </table></div>
  </section>`,s=`
  <section>
    <h2>Detalhamento</h2>
    ${b.map(a=>`
    <div class="pessoa">
      <h3>${d(a.nome)} <span>${a.t.aberto?`deve ${h(a.t.aberto)}`:"em dia"}</span></h3>
      <div class="rolagem"><table class="det">
        <thead><tr><th>Competência</th><th>Cobrança</th><th>Situação</th><th class="num">Valor</th></tr></thead>
        <tbody>${[...a.ls].sort((t,o)=>j(o).localeCompare(j(t))).map(t=>`<tr>
          <td>${u(j(t))}</td>
          <td><b>${d(t.description||R[t.kind]||t.kind)}</b><div class="sub">${d(B(t))} · ${d(R[t.kind]??t.kind)}${t.status==="paid"&&t.validated_at?` · pago em ${u(t.validated_at)}${t.validated_by_nickname?`, baixa por ${d(t.validated_by_nickname)}`:""}${t.proof_group_id?" (junto com outras)":""}`:t.status==="waived"?` · isento${t.waived_at?` em ${u(t.waived_at)}`:""}${t.waive_reason?`: ${d(t.waive_reason)}`:""}`:`${t.due_at?` · vence ${u(t.due_at)}`:""}${t.has_proof?" · comprovante enviado":""}`}</div></td>
          <td>${x(t.status)}</td>
          <td class="num">${h(t.amount_cents)}</td></tr>`).join("")}</tbody>
      </table></div>
    </div>`).join("")}
  </section>`,p=e.filter(a=>k(a)).sort((a,t)=>k(t).localeCompare(k(a))),v=new Map;for(const a of p){const t=a.validated_by_nickname??"Sem registro";v.set(t,[...v.get(t)??[],a])}const l=new Map;for(const a of p){const t=u(k(a));l.set(t,[...l.get(t)??[],a])}const f=p.filter(a=>a.status==="paid").reduce((a,t)=>a+t.amount_cents,0),O=p.filter(a=>a.status==="waived").reduce((a,t)=>a+t.amount_cents,0),V=[["Baixas de pagamento",h(f),"pago"],["Pagamentos baixados",String(p.filter(a=>a.status==="paid").length),""],["Isenções",h(O),"isento"],["Responsáveis",String(v.size),""]].map(([a,t,o])=>`<div class="kpi ${o}"><small>${a}</small><b>${t}</b></div>`).join(""),M=p.length?`
  <section>
    <h2>Por responsável</h2>
    <div class="rolagem"><table>
      <thead><tr><th>Baixa feita por</th><th class="num">Baixas</th><th class="num">Valor baixado</th><th class="num">Isenções</th></tr></thead>
      <tbody>${[...v.entries()].sort((a,t)=>t[1].length-a[1].length).map(([a,t])=>`<tr><td><b>${d(a)}</b></td><td class="num">${t.length}</td>${m(t.filter(o=>o.status==="paid").reduce((o,w)=>o+w.amount_cents,0),"pago")}${m(t.filter(o=>o.status==="waived").reduce((o,w)=>o+w.amount_cents,0))}</tr>`).join("")}</tbody>
    </table></div>
  </section>
  <section>
    <h2>Baixas realizadas</h2>
    ${[...l.entries()].map(([a,t])=>`
    <div class="pessoa">
      <h3>${a} <span>${t.length} ${t.length===1?"baixa":"baixas"} · ${h(t.filter(o=>o.status==="paid").reduce((o,w)=>o+w.amount_cents,0))}</span></h3>
      <div class="rolagem"><table class="det">
        <thead><tr><th>Hora</th><th>Quem pagou / cobrança</th><th>Baixa por</th><th class="num">Valor</th></tr></thead>
        <tbody>${t.map(o=>`<tr>
          <td>${F.format(new Date(k(o))).slice(-5)}</td>
          <td><b>${d(D(o))}</b><div class="sub">${d(o.description||R[o.kind]||o.kind)} · ${d(B(o))}${o.proof_group_id?" · pago junto com outras":""}${o.status==="waived"?` · isenção${o.waive_reason?`: ${d(o.waive_reason)}`:""}`:""}</div></td>
          <td>${d(o.validated_by_nickname??"")} ${o.status==="waived"?x("waived"):""}</td>
          <td class="num">${h(o.amount_cents)}</td></tr>`).join("")}</tbody>
      </table></div>
    </div>`).join("")}
  </section>`:"",N=g==="baixas"?`<p class="resumo">${p.length?`${p.length} ${p.length===1?"baixa":"baixas"} no período.`:"Nenhuma baixa com esses filtros."}</p>${M}`:`<p class="resumo">${i.n?`Recebido de ${b.filter(a=>a.t.pago).length} ${b.filter(a=>a.t.pago).length===1?"pessoa":"pessoas"}; ${b.filter(a=>a.t.aberto).length} com valor em aberto.`:"Nenhuma cobrança com esses filtros."}</p>
  ${i.n?P+S+s:""}`;return L({logo:r,filtros:n,titulo:g==="baixas"?"Relatório de baixas":"Relatório de pagamentos",meta:`Gerado em ${F.format(new Date)} por ${d(c)} · ${i.n} ${i.n===1?"cobrança":"cobranças"} de ${b.length} ${b.length===1?"pessoa":"pessoas"}`,corpo:`<div class="kpis">${g==="baixas"?V:I}</div>
  ${N}`})}const J=`
  :root { --marrom:#623800; --laranja:#D56301; --ouro:#F0C808; --bege:#FEE6B7; --creme:#FFF8EE; --cinza:#555; --tinta:#1f1610; --linha:#ead9bf;
          --verde:#1f7a3a; --vermelho:#b42318; --ambar:#a15c00; }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--creme); color:var(--tinta); font:14px/1.45 Inter, system-ui, sans-serif; }
  .faixa { display:flex; height:10px; } .faixa i { flex:1; }
  .pagina { max-width: 980px; margin: 0 auto; padding: 24px 20px 40px; }
  header { display:flex; align-items:center; gap:20px; flex-wrap:wrap; padding-bottom:18px; border-bottom:2px solid var(--linha); }
  header img { height:64px; width:auto; }
  header .t { flex:1; min-width:220px; }
  h1 { font-family:"Baloo 2", system-ui, sans-serif; font-size:30px; line-height:1.05; margin:0; color:var(--marrom); }
  .filtros { margin-top:6px; display:flex; flex-wrap:wrap; gap:6px; }
  .filtros span { background:var(--bege); color:var(--marrom); border-radius:999px; padding:2px 10px; font-size:12px; font-weight:600; }
  .meta { color:var(--cinza); font-size:12px; margin-top:6px; }
  .acoes { margin: 16px 0 0; }
  .acoes button { background:var(--laranja); color:#fff; border:0; border-radius:10px; padding:10px 16px; font:600 14px Inter, sans-serif; cursor:pointer; }
  .kpis { display:grid; grid-template-columns: repeat(4, 1fr); gap:10px; margin:20px 0 6px; }
  .kpi { background:#fff; border:1px solid var(--linha); border-radius:14px; padding:12px 14px; border-top:4px solid var(--ouro); }
  .kpi small { display:block; text-transform:uppercase; letter-spacing:.06em; font-size:11px; color:var(--cinza); font-weight:700; }
  .kpi b { font-family:"Baloo 2", sans-serif; font-size:24px; }
  .kpi.pago { border-top-color: var(--verde); } .kpi.pago b { color:var(--verde); }
  .kpi.aberto { border-top-color: var(--laranja); } .kpi.aberto b { color:var(--ambar); }
  .kpi.atrasado { border-top-color: var(--vermelho); } .kpi.atrasado b { color:var(--vermelho); }
  .kpi.isento b { color:var(--cinza); }
  .resumo { color:var(--cinza); font-size:13px; }
  section { margin-top: 26px; }
  h2 { font-family:"Baloo 2", sans-serif; font-size:21px; color:var(--marrom); margin:0 0 8px; display:flex; align-items:center; gap:8px; }
  h2::before { content:""; width:6px; height:20px; border-radius:3px; background:linear-gradient(var(--laranja), var(--ouro)); }
  .rolagem { overflow-x:auto; -webkit-overflow-scrolling:touch; border-radius:12px; }
  .rolagem table { min-width:520px; }
  table { width:100%; border-collapse:collapse; background:#fff; border:1px solid var(--linha); border-radius:12px; overflow:hidden; }
  th { background:var(--marrom); color:#fff; text-align:left; font-size:11px; letter-spacing:.05em; text-transform:uppercase; padding:9px 10px; }
  td { padding:9px 10px; border-top:1px solid var(--linha); vertical-align:top; }
  tbody tr:nth-child(even) td { background:#fffaf2; }
  tfoot td { background:var(--bege); font-weight:700; }
  .num { text-align:right; white-space:nowrap; font-variant-numeric: tabular-nums; }
  td.pago { color:var(--verde); font-weight:600; } td.aberto { color:var(--ambar); font-weight:600; } td.atrasado { color:var(--vermelho); font-weight:700; }
  .zero { color:#c9b79c; }
  .sub { color:var(--cinza); font-size:12px; margin-top:2px; }
  .b { display:inline-block; border-radius:999px; padding:2px 9px; font-size:11px; font-weight:700; white-space:nowrap; }
  .b.paid { background:#dcf3e3; color:var(--verde); } .b.pending { background:#fff0d6; color:var(--ambar); }
  .b.overdue { background:#fde2df; color:var(--vermelho); } .b.waived { background:#eee; color:var(--cinza); }
  .pessoa { margin-top:16px; break-inside: avoid; }
  .pessoa h3 { margin:0 0 6px; font-size:16px; display:flex; justify-content:space-between; gap:10px; }
  .pessoa h3 span { font-size:12px; color:var(--cinza); font-weight:600; }
  footer { margin-top:30px; padding-top:14px; border-top:2px solid var(--linha); color:var(--cinza); font-size:12px; display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap; }
  @media (max-width: 640px) {
    .kpis { grid-template-columns: repeat(2, 1fr); }
    header img { height:48px; } h1 { font-size:25px; }
    th, td { padding:7px 6px; font-size:12.5px; }
    table.det th:nth-child(3), table.det td:nth-child(3) { display:none; }
  }
  @media print {
    .rolagem { overflow:visible; } .rolagem table { min-width:0; }
    body { background:#fff; } .acoes { display:none; } .pagina { padding:0; max-width:none; }
    @page { size: A4; margin: 14mm 12mm; }
    tr { break-inside: avoid; } section { break-inside: auto; }
    th { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .faixa, .kpi, tfoot td, .b, tbody tr:nth-child(even) td { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
`;function L({logo:e,titulo:n,filtros:c,meta:g,corpo:r}){return`<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${d(n)} · 4Bros</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
<style>${J}</style>
</head>
<body>
<div class="faixa" aria-hidden="true"><i style="background:#623800"></i><i style="background:#D56301"></i><i style="background:#FEDD63"></i><i style="background:#FEE6B8"></i><i style="background:#FFFFFF"></i><i style="background:#555555"></i><i style="background:#000000"></i></div>
<div class="pagina">
  <header>
    ${e?`<img src="${e}" alt="4Bros Beach Volley" />`:""}
    <div class="t">
      <h1>${d(n)}</h1>
      <div class="filtros">${(c.length?c:["Tudo"]).map(i=>`<span>${d(i)}</span>`).join("")}</div>
      <div class="meta">${g}</div>
    </div>
  </header>
  <div class="acoes"><button type="button" onclick="window.print()">Imprimir ou salvar em PDF</button></div>
  ${r}
  <footer><span>4Bros Beach Volley · Porto Alegre/RS</span><span>Documento interno e confidencial · uso dos fundadores</span></footer>
</div>
</body>
</html>`}function y(e){return e.tx_status==="paid"?"pago":e.tx_status==="waived"||!e.transaction_id&&e.released?"isento":e.ticket_status==="reserved"?"reservado":e.proof_path?"comprovante":e.tx_status==="overdue"?"atrasado":"pendente"}const E={pago:{txt:"Pago",icone:"✅"},isento:{txt:"Isento",icone:"🎁"},comprovante:{txt:"Pendente de aprovar comprovante",icone:"🧾"},atrasado:{txt:"Atrasado",icone:"⚠️"},pendente:{txt:"Não mandou comprovante",icone:"⏳"},reservado:{txt:"Reservado (sem cobrança ainda)",icone:"📌"}},G=e=>{var n;return e.kind==="guest"?((n=e.guest_name)==null?void 0:n.trim())||"Convidado sem nome":e.holder_nickname||e.holder_full_name||"Sócio"};async function K({evento:e,ingressos:n,filtros:c,geradoPor:g}){const r=await U(),i=n.filter(s=>y(s)==="pago"),$=i.reduce((s,p)=>s+(p.amount_cents??0),0),b=n.filter(s=>["pendente","atrasado","comprovante"].includes(y(s))),_=b.reduce((s,p)=>s+(p.amount_cents??0),0),z=n.filter(s=>y(s)==="comprovante").length,x=new Map;for(const s of n)x.set(s.holder_id,[...x.get(s.holder_id)??[],s]);const m=[...x.values()].sort((s,p)=>(s[0].holder_nickname||s[0].holder_full_name||"").localeCompare(p[0].holder_nickname||p[0].holder_full_name||"","pt-BR")),I=s=>s==="pago"?"paid":s==="atrasado"?"overdue":s==="isento"||s==="reservado"?"waived":"pending",S=`<div class="kpis">${[["Ingressos",String(n.length),""],["Pagos",`${i.length} · ${h($)}`,"pago"],["A receber",`${b.length} · ${h(_)}`,"aberto"],["Com comprovante",String(z),""]].map(([s,p,v])=>`<div class="kpi ${v}"><small>${s}</small><b>${p}</b></div>`).join("")}</div>
  <p class="resumo">${m.length} ${m.length===1?"sócio":"sócios"} com ingresso; ${i.length} de ${n.length} ingressos pagos.</p>
  <section>
    <h2>Ingressos por sócio</h2>
    ${m.map(s=>{const p=s[0],v=s.filter(l=>y(l)==="pago").length;return`
    <div class="pessoa">
      <h3>${d(p.holder_nickname||p.holder_full_name||"Sócio")} <span>${v} de ${s.length} pagos</span></h3>
      <div class="rolagem"><table class="det">
        <thead><tr><th>Ingresso</th><th>Situação</th><th>Detalhe</th><th class="num">Valor</th></tr></thead>
        <tbody>${s.map(l=>{const f=y(l);return`<tr>
          <td>${E[f].icone} <b>${d(G(l))}</b><div class="sub">${l.kind==="guest"?"Convidado":"Sócio"}${l.checked_in_at?" · entrou na festa":""}</div></td>
          <td><span class="b ${I(f)}">${E[f].txt}</span></td>
          <td class="sub">${f==="pago"&&l.validated_at?`Pago em ${u(l.validated_at)}${l.validated_by_nickname?`, baixa por ${d(l.validated_by_nickname)}`:""}`:l.due_at&&f!=="isento"?`Vence ${u(l.due_at)}`:""}${l.proof_group_id?" · pago junto com outros":""}</td>
          <td class="num">${l.amount_cents?h(l.amount_cents):"—"}</td></tr>`}).join("")}</tbody>
      </table></div>
    </div>`}).join("")}
  </section>`;return L({logo:r,titulo:`Ingressos · ${e}`,filtros:c,meta:`Gerado em ${F.format(new Date)} por ${d(g)} · ${n.length} ingressos`,corpo:S})}function Q(e){const n=["Pessoa","Nome completo","Competência","Jogo/evento","Tipo","Cobrança","Valor","Situação","Vencimento","Pago em","Baixa por","Isento em","Motivo da isenção","Comprovante enviado"],c=r=>{const i=String(r??"");return/[;"\n]/.test(i)?`"${i.replace(/"/g,'""')}"`:i},g=e.map(r=>[D(r),r.full_name??"",u(j(r)),B(r),R[r.kind]??r.kind,r.description??"",(r.amount_cents/100).toFixed(2).replace(".",","),A[r.status],u(r.due_at),u(r.validated_at),r.validated_at?r.validated_by_nickname??"":"",u(r.waived_at),r.waive_reason??"",r.has_proof?"sim":"não"].map(c).join(";"));return"\uFEFF"+[n.join(";"),...g].join(`\r
`)}function W(e,n,c){const g=URL.createObjectURL(new Blob([e],{type:c})),r=document.createElement("a");r.href=g,r.download=n,r.click(),setTimeout(()=>URL.revokeObjectURL(g),1e4)}export{E as S,Q as a,W as b,j as c,k as d,G as e,K as f,X as g,d as h,U as l,D as n,B as o,L as p,y as s};
