import{r,j as o,u as i}from"./query-BydKBSTv.js";import{s}from"./index-SLCYFtpz.js";const u=({shootingStars:n=!0})=>{const a=r.useMemo(()=>Array.from({length:70},()=>({left:Math.random()*100,top:Math.random()*100,size:Math.random()*1.6+.8,delay:Math.random()*4,duration:2+Math.random()*3})),[]);return o.jsxs("div",{className:"absolute inset-0 overflow-hidden pointer-events-none",children:[a.map((t,e)=>o.jsx("span",{className:"absolute rounded-full bg-white star-twinkle",style:{left:`${t.left}%`,top:`${t.top}%`,width:t.size,height:t.size,animationDelay:`${t.delay}s`,animationDuration:`${t.duration}s`}},e)),n&&[0,1,2].map(t=>o.jsx("span",{className:`absolute h-px w-16 star-shoot star-shoot-${t}`,style:{background:"linear-gradient(to right, transparent, rgba(255,255,255,0.9))"}},t)),o.jsx("style",{children:`
        @keyframes star-twinkle { 0%, 100% { opacity: .15; } 50% { opacity: 1; } }
        .star-twinkle { animation-name: star-twinkle; animation-iteration-count: infinite; animation-timing-function: ease-in-out; }

        @keyframes star-shoot {
          0%   { transform: translate(0, 0) rotate(35deg); opacity: 0; }
          4%   { opacity: 1; }
          18%  { transform: translate(180px, 130px) rotate(35deg); opacity: 0; }
          100% { transform: translate(180px, 130px) rotate(35deg); opacity: 0; }
        }
        .star-shoot { top: -10%; animation-name: star-shoot; animation-iteration-count: infinite; animation-timing-function: ease-in; }
        .star-shoot-0 { left: 10%; animation-duration: 7s; animation-delay: 1s; }
        .star-shoot-1 { left: 45%; animation-duration: 9s; animation-delay: 4s; }
        .star-shoot-2 { left: 75%; animation-duration: 8s; animation-delay: 6.5s; }

        @media (prefers-reduced-motion: reduce) {
          .star-twinkle, .star-shoot { animation: none; opacity: .6; }
        }
      `})]})};function d(){return i({queryKey:["bearoscopo"],staleTime:60*6e4,queryFn:async()=>{const{data:n,error:a}=await s.rpc("my_bearoscopo");if(a)throw a;return n??[]}})}export{u as S,d as u};
