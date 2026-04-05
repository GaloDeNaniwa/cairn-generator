import { useState, useEffect } from "react";

// ============================================
// CAIRN 1e DATA TABLES (PT-BR) - OFFICIAL
// ============================================
const FEMALE_NAMES=["Agune","Beatrice","Breagan","Bronwyn","Cannora","Drelil","Elgile","Esme","Groua","Henaine","Lirann","Lirathil","Lisabeth","Moralil","Morgwen","Sybil","Theune","Wenlan","Ygwal","Yslen"];
const MALE_NAMES=["Arwel","Bevan","Boroth","Borrid","Breagle","Breglor","Canhoreal","Emrys","Ethex","Gringle","Grinwit","Gruwid","Gruwth","Gwestin","Mannog","Melnax","Orthax","Triunein","Wenlan","Yirmeor"];
const SURNAMES=["Abernathy","Addercap","Burl","Candlewick","Cormick","Crumwaller","Dunswallow","Getri","Glass","Harkness","Harper","Loomer","Malksmilk","Smythe","Sunderman","Swinney","Thatcher","Tolmen","Weaver","Wolder"];
const BACKGROUNDS=["Alquimista","Malandro","Artista","Ladrão","Escriba","Médico","Carpinteiro","Caçador","Clérigo","Contrabandista","Coveiro","Ferreiro","Contorcionista","Herbalista","Mercador","Mercenário","Minerador","Mágico","Patrulheiro","Poeta"];
const PHYSIQUE=["Atlético","Baixo","Calejado","Musculoso","Esguio","Magricelo","Robusto","Esticado","Flácido","Alto"];
const SKIN=["Bronzeada","Marca de Nascença","Envelhecida","Escura","Rosada","Macia","Tatuada","Cicatrizes","Manchada","Pálida"];
const HAIR=["Cacheado","Crespo","Longo","Luxuoso","Oleoso","Ondulado","Ralo","Sujo","Trançado","Careca"];
const FACE=["Alongado","Fino","Ossudo","Enrugado","Perfeito","Esculpido","Quebrado","Redondo","Escultural","Quadrado"];
const SPEECH=["Direta","Formal","Gagueja","Enigmática","Estridente","Grave","Trovejante","Zumbida","Precisa","Sussurrante"];
const CLOTHING=["Antiquada","Elegantes","Trapos","Desalinhada","Desgastadas","Ensanguentadas","Rançosas","Uniforme","Estranhas","Imundas"];
const VIRTUE=["Ambicioso","Disciplinado","Honrável","Cauteloso","Corajoso","Humilde","Sociável","Tolerante","Piedoso","Sereno"];
const VICE=["Agressivo","Ganancioso","Nervoso","Amargurado","Covarde","Preguiçoso","Vaidoso","Vingativo","Rude","Traiçoeiro"];
const REPUTATION=["Ambiciosa","Honesta","Perigosa","Animadora","Excêntrica","Preguiçosa","Sábia","Vulgar","Repulsiva","Respeitada"];
const MISFORTUNE=["Abandonado","Condenado","Iludido","Amaldiçoado","Chantageado","Desacreditado","Rebaixado","Viciado","Deserdado","Exilado"];
const SPELLS=["Acelerar","Aderir","Adormecer","Alisar","Alterar Clima","Amortecer Magia","Ancorar","Animar Objeto","Antropomorfizar","Ar Líquido","Arrombar","Atrair","Bagunçar","Balbuciar","Bugiganga","Caminhar nas Paredes","Caminhar no Espelho","Carbonizar","Comandar","Compreender","Cone de Espuma","Confundir","Controlar Plantas","Controle Temporal","Corrente Invisível","Cubo","Curar Ferimentos","Deslocar","Desmembrar","Detectar Magia","Disfarce","Elasticidade","Empurrar/Puxar","Encantar","Ensurdecer","Enxame","Escudo","Esculpir Elementos","Esfera da Fraqueza","Esfera de Sombras","Farejar","Fervura","Flor-de-isca","Flutuador","Fobia","Forma Animal","Forma de Fumaça","Forma Gosmenta","Frenesi","Ganância","Hipnotizar","Identificar Passado","Iluminar","Ilusão Auditiva","Ilusão Visual","Invocar Ídolo","Isca Mágica","Ler Mentes","Levantar Espírito","Levantar os Mortos","Manipular Gravidade","Mania de Gude","Manto","Mão Arcana","Máscara","Mente Vazia","Miniaturizar","Muitos Braços","Nevoeiro","Objetificar","Ódio","Olho Arcano","Ouvir Sussurros","Pacificar","Parede Elemental","Pegar Para Si","Perscrutar","Portão","Prisão Astral","Proteger","Reflexo","Repelir","Salto","Sentir","Serra Átomo","Sinalizador","Soprar","Surto Primal","Teia","Telecinese","Telepatia","Teleporte","Terremoto","Toque Gélido","Traspassar Visão","Trocar Corpo","Vala","Vegetação","Visão","Visão Verdadeira"];
const EXPEDITION_GEAR=["Veneno","Sedativo","Bastão (3m)","Bandagens (3 usos)","Lanterna","Corda (12m)","Corrente","Ferramentas de Ladrão","Luneta","Óleo Inflamável","Pederneira","Picareta","Gancho","Tocha extra","Saco Grande","Armadilha Grande","Algemas","Amuleto de Proteção","Antitoxina","Carrinho (4 esp., volumoso)"];
const TOOLS=["Cinzel","Óleo Inflamável","Giz","Panelas","Broca (manual)","Pé de cabra","Vara de pesca","Graxa","Martelo","Ampulheta","Pregos","Rede","Serra","Pá","Pinças","Garrafa","Lixa de Metal","Pinos","Selante","Sabão"];
const TRINKETS=["Baralho","Dados","Joias Falsas","Incenso","Instrumento Musical","Bola de gude","Espelho","Pena e Tinta","Barbante","Esponja","Apito","Perfume","Corneta","Lente","Piche","Sal","Sineta","Tinta","Jogo de Chá","Bugiganga"];
const ALL_ITEMS=["Adaga (d6)","Porrete (d6)","Cajado (d6)","Foice (d6)","Espada (d8)","Maça (d8)","Machado (d8)","Mangual (d8)","Lança (d8)","Alabarda (d10, vol.)","Martelo de Guerra (d10, vol.)","Espada Grande (d10, vol.)","Arco Longo (d8, vol.)","Besta (d10, vol.)","Funda (d6)","Couro (1 Arm.)","Cota de Malha (2 Arm., vol.)","Placas (3 Arm., vol.)","Elmo (+1 Arm.)","Escudo (+1 Arm.)","Manoplas (+1 Arm.)",...EXPEDITION_GEAR,...TOOLS,...TRINKETS,"Rações (3 dias)","Tocha","Água Benta","Saco de dormir","Barraca (2 pes., vol.)","Botas com Cravos","Bolsa","Escadas (vol., 3m)","Papel","Livro","Odre","Mochila (+6 esp.)","Cadeado","Velas","Manto","Roupa comum","Roupa elegante","Túnica","Botas de couro","Casaco para frio","Cinto (+1 esp.)","Polia","Símbolo sagrado",...SPELLS.map(s=>"Livro: "+s)].sort((a,b)=>a.localeCompare(b,"pt-BR"));
const SCARS=[{d:"1",t:"Cicatriz Duradoura",x:"1d6: 1-Pescoço 2-Mão 3-Rosto 4-Peito 5-Perna 6-Orelha. 1d6>PG máx→novo PG."},{d:"2",t:"Golpe Atordoante",x:"Desorientado. 1d6>PG máx→novo."},{d:"3",t:"Sacudido",x:"Privado até descanso. +1d6 ao PG máx."},{d:"4",t:"Osso Quebrado",x:"1-2 Perna 3-4 Braço 5 Costela 6 Crânio. 2d6>PG máx→novo."},{d:"5",t:"Infecção",x:"Ao recuperar 2d6>PG máx→novo."},{d:"6",t:"Ferimento na Alma",x:"1-2 FOR 3-4 DES 5-6 VON. 3d6>atrib→novo."},{d:"7",t:"Tendão Partido",x:"Após 1 semana 3d6>DES máx→novo."},{d:"8",t:"Ensurdecido",x:"Teste VON: +1d4 VON máx se passar."},{d:"9",t:"Decepado",x:"Membro arrancado. Teste VON: +1d6 VON máx se passar."},{d:"10",t:"Ferida Mortal",x:"Morre em 1h sem cura. 2d6=novo PG máx."},{d:"11",t:"Condenado",x:"Próxima falha vs dano crítico=morte. Se passar 3d6>PG máx→novo."},{d:"12",t:"Abalo Cerebral",x:"3d6>VON máx→novo."}];
const ARCHETYPES=[{n:"Anão",i:["Machado (d8)","Picareta (d6)","Cota de Malha Anã (2 Arm.)","Elmo (+1 Arm.)","Runa (guia cavernas)","Runa (x2 Explosão d8)"]},{n:"Cavaleiro",i:["Lança (d8, vol.)","Cota de Malha (2 Arm., vol.)","Elmo (+1 Arm.)","Capa Heráldica","Corcel (6 PG, d8)","Amuleto (manobra+dano)"]},{n:"Clérigo",i:["Martelo de Guerra (d10, vol.)","Cota de Malha (2 Arm., vol.)","Manto da Ordem (+1 Arm.)","Símbolo Sagrado","Água Benta (x3, 1d8)","Lâmpada Sagrada"]},{n:"Elfo",i:["Espada Élfica (d8+d6)","Arco Recurvo (d8)","Couro Leve (1 Arm.)","Livro: Encantar/Controlar Plantas","Flauta Élfica","Amuleto (animais)"]},{n:"Pequenino",i:["Adaga (d6)","Funda (d6)","Roupa de Lã (+1 Arm.)","Livro de Folclore","Luneta","Amuleto (invisibilidade)"]},{n:"Guerreiro",i:["Espada Bastarda (d8/d10)","Espada Curta (d6)","Escudo (+1 Arm.)","Cota de Malha (2 Arm., vol.)","Manoplas (+1 Arm.)","Amuleto da Força"]},{n:"Ladrão",i:["Duas Adagas (d6+d6)","Manto com Capuz (1 Arm.)","Ferramentas de Ladrão","Veneno (x3)","Bomba de Fumaça (x3)","Amuleto da Sorte"]},{n:"Mago",i:["Cajado (d6, vol.)","Adaga (d6)","Livro de Feitiço (aleatório)","Livro de Feitiço (aleatório)","Túnica Excêntrica","Pó de Raio (x2)"]},{n:"Patrulheiro",i:["Arco Longo (d8, vol.)","Machadinha (d6)","Couro Acolchoado (1 Arm.)","Armadilha Grande (d6)","Cão de Caça (2 PG, d6)","Corneta"]},{n:"Necromante",i:["Foice (d6)","Gibão (+1 Arm.)","Livro: Levantar Espírito","Livro: Levantar os Mortos","Poção (x2, 1d6 FOR)","Amuleto (necrose)"]}];

// DICE
const R=s=>Math.floor(Math.random()*s)+1,R3d6=()=>R(6)+R(6)+R(6),RD20=()=>R(20),RD100=()=>R(100),RD10=()=>R(10),RD6=()=>R(6);
const uid=()=>Date.now().toString(36)+Math.random().toString(36).substr(2,6);

// INTEGRITY: simple checksum to detect localStorage tampering
const ck=v=>{let h=0;const s=""+v;for(let i=0;i<s.length;i++){h=((h<<5)-h)+s.charCodeAt(i);h|=0;}return h;};

// CHAR GENERATION
function genChar(archIdx=null){
  const f=R(2)===1,fn=f?FEMALE_NAMES[RD20()-1]:MALE_NAMES[RD20()-1],sn=SURNAMES[RD20()-1];
  const fo=R3d6(),de=R3d6(),vo=R3d6(),hp=RD6(),age=R(20)+R(20)+10,si=R3d6(),bg=BACKGROUNDS[RD20()-1];
  const tr={physique:PHYSIQUE[RD10()-1],skin:SKIN[RD10()-1],hair:HAIR[RD10()-1],face:FACE[RD10()-1],speech:SPEECH[RD10()-1],clothing:CLOTHING[RD10()-1],virtue:VIRTUE[RD10()-1],vice:VICE[RD10()-1],reputation:REPUTATION[RD10()-1],misfortune:MISFORTUNE[RD10()-1]};
  let inv=["Rações (3 dias)","Tocha"],arm=0,spell=null;
  if(archIdx!==null){inv=[...inv,...ARCHETYPES[archIdx].i];}
  else{
    const ar=RD20();if(ar>3&&ar<=14){inv.push("Couro (1 Arm.)");arm+=1;}else if(ar<=19){inv.push("Cota de Malha (2 Arm., vol.)");arm+=2;}else if(ar===20){inv.push("Placas (3 Arm., vol.)");arm+=3;}
    const hs=RD20();if(hs>=14&&hs<=16){inv.push("Elmo (+1 Arm.)");arm+=1;}else if(hs>=17&&hs<=19){inv.push("Escudo (+1 Arm.)");arm+=1;}else if(hs===20){inv.push("Elmo (+1 Arm.)");inv.push("Escudo (+1 Arm.)");arm+=2;}
    const wp=[["Adaga (d6)","Porrete (d6)","Cajado (d6)"],["Espada (d8)","Maça (d8)","Machado (d8)"],["Arco Longo (d8, vol.)","Besta (d10, vol.)","Funda (d6)"],["Alabarda (d10, vol.)","Martelo de Guerra (d10, vol.)","Espada Grande (d10, vol.)"]];
    const w=RD20();let wi=0;if(w<=5)wi=0;else if(w<=14)wi=1;else if(w<=19)wi=2;else wi=3;
    inv.push(wp[wi][Math.floor(Math.random()*wp[wi].length)]);
    const b=RD20();if(b<=5){const a=[...TOOLS,...TRINKETS];inv.push(a[Math.floor(Math.random()*a.length)]);}
    else if(b<=12)inv.push(EXPEDITION_GEAR[Math.floor(Math.random()*EXPEDITION_GEAR.length)]);
    else if(b<=17)inv.push(["Adaga extra (d6)","Espada extra (d8)","Arco (d8)","Maça extra (d8)"][Math.floor(Math.random()*4)]);
    else{spell=SPELLS[RD100()-1];inv.push("Livro: "+spell);}
  }
  return{id:uid(),name:`${fn} ${sn}`,gender:f?"F":"M",age,background:bg,attributes:{for:fo,des:de,von:vo},hp,maxHp:hp,armor:Math.min(arm,3),silver:si,traits:tr,inventory:inv.slice(0,10),spellbook:spell,lore:null,notes:"",archetype:archIdx!==null?ARCHETYPES[archIdx].n:null,createdAt:new Date().toISOString()};
}
function genMonster(){
  const n=["Sombra Raiz","Golem de Ossos","Verme do Abismo","Espírito da Névoa","Troll das Cinzas","Lobo Espectral","Harpia Decaída","Serpente Arcana","Golem de Pedra","Esqueleto Guardião","Fantasma Faminto","Fungo Ambulante","Goblin das Raízes","Cão de Pedra","Troll da Floresta","Encapuzado (Drune)","Banshee Negra"];
  const a=["garras (d6)","mordida (d8)","tentáculos (d6+d6)","golpe (d10)","rajada sombria (d8, rajada)","cuspe ácido (d6)","lança (d6)","garras e mordida (d8+d8, rajada)"];
  return{id:uid(),name:n[Math.floor(Math.random()*n.length)],hp:R(6)+R(6)+R(6),for:R3d6(),des:R3d6(),von:R3d6(),armor:Math.max(0,R(3)-1),attack:a[Math.floor(Math.random()*a.length)],lore:null};
}

// LORE VIA POLLINATIONS.AI (POST endpoint, free, no key)
async function fetchLore(prompt){
  const resp=await fetch("https://text.pollinations.ai/openai",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"openai",messages:[{role:"system",content:"Você é um narrador de dark fantasy em português brasileiro. Responda APENAS o que foi pedido, sem preâmbulos."},{role:"user",content:prompt}]})
  });
  if(!resp.ok)throw new Error("API error "+resp.status);
  const data=await resp.json();
  return data.choices?.[0]?.message?.content||"";
}

// PNG EXPORT
function exportPNG(ch){
  const w=595,h=842,cv=document.createElement("canvas");cv.width=w;cv.height=h;const cx=cv.getContext("2d");
  cx.fillStyle="#1a1510";cx.fillRect(0,0,w,h);cx.fillStyle="#c9a84c";[0,h-3].forEach(yy=>cx.fillRect(0,yy,w,3));[0,w-3].forEach(xx=>cx.fillRect(xx,0,3,h));
  let y=40;const g="#c9a84c",wt="#e0dbd0",m="#7a7568";
  const dt=(t,x,yy,c,s)=>{cx.fillStyle=c;cx.font=`${s}px Georgia`;cx.fillText(t,x,yy);};
  const ln=yy=>{cx.strokeStyle="#2d2a25";cx.beginPath();cx.moveTo(30,yy);cx.lineTo(w-30,yy);cx.stroke();};
  dt("CAIRN",w/2-60,y,g,36);dt("Ficha de Personagem",w/2-80,y+=30,m,14);y+=30;ln(y);y+=25;
  dt(ch.name,40,y,g,24);y+=22;dt(`${ch.gender==="F"?"Feminino":"Masculino"} · ${ch.age} anos · ${ch.background}${ch.archetype?" · "+ch.archetype:""}`,40,y,m,12);y+=30;ln(y);y+=25;
  dt("ATRIBUTOS",40,y,g,14);y+=22;dt(`FOR: ${ch.attributes.for}     DES: ${ch.attributes.des}     VON: ${ch.attributes.von}`,40,y,wt,16);y+=22;
  dt(`Guarda: ${ch.hp}/${ch.maxHp}   Armadura: ${ch.armor}   Prata: ${ch.silver} PP`,40,y,wt,14);y+=25;ln(y);y+=25;
  dt("TRAÇOS",40,y,g,14);y+=20;
  const tp=[["Físico",ch.traits.physique],["Pele",ch.traits.skin],["Cabelo",ch.traits.hair],["Rosto",ch.traits.face],["Fala",ch.traits.speech],["Roupa",ch.traits.clothing],["Virtude",ch.traits.virtue],["Vício",ch.traits.vice],["Reputação",ch.traits.reputation],["Infortúnio",ch.traits.misfortune]];
  for(let i=0;i<tp.length;i+=2){dt(`${tp[i][0]}: ${tp[i][1]}`,40,y,wt,12);if(tp[i+1])dt(`${tp[i+1][0]}: ${tp[i+1][1]}`,300,y,wt,12);y+=18;}
  y+=10;ln(y);y+=25;dt("INVENTÁRIO",40,y,g,14);y+=20;
  ch.inventory.forEach((it,i)=>{dt(`${i+1}. ${it}`,40,y,wt,12);y+=17;});
  if(ch.lore&&y<700){y+=10;ln(y);y+=25;dt("LORE",40,y,g,14);y+=20;
    ch.lore.split("\n").filter(l=>l.trim()).forEach(l=>{const ws=l.split(" ");let li="";ws.forEach(wd=>{if(cx.measureText(li+wd).width>w-80){dt(li.trim(),40,y,wt,11);y+=15;li="";}li+=wd+" ";});if(li.trim()){dt(li.trim(),40,y,wt,11);y+=15;}y+=3;});
  }
  const a=document.createElement("a");a.download=`${ch.name.replace(/\s/g,"_")}_cairn.png`;a.href=cv.toDataURL("image/png");a.click();
}

// SHARE (read-only import)
function shareChar(ch){const d=encodeURIComponent(JSON.stringify({n:ch.name,b:ch.background,a:ch.attributes,h:ch.hp,mh:ch.maxHp,ar:ch.armor,t:ch.traits,i:ch.inventory,l:ch.lore,g:ch.gender,ag:ch.age,s:ch.silver,ar2:ch.archetype}));const u=window.location.origin+window.location.pathname+"?char="+d;if(navigator.clipboard)navigator.clipboard.writeText(u).then(()=>alert("Link copiado!")).catch(()=>prompt("Copie:",u));else prompt("Copie:",u);}
function loadShared(){try{const p=new URLSearchParams(window.location.search).get("char");if(!p)return null;const o=JSON.parse(decodeURIComponent(p));
  // ANTI-ABUSE: validate shared data ranges
  const clamp=(v,mn,mx)=>Math.max(mn,Math.min(mx,parseInt(v)||mn));
  const att={for:clamp(o.a?.for,3,18),des:clamp(o.a?.des,3,18),von:clamp(o.a?.von,3,18)};
  return{id:uid(),name:(o.n||"Desconhecido").slice(0,40),background:BACKGROUNDS.includes(o.b)?o.b:"Poeta",attributes:att,hp:clamp(o.h,1,6),maxHp:clamp(o.mh||o.h,1,6),armor:clamp(o.ar,0,3),traits:o.t||{},inventory:Array.isArray(o.i)?o.i.slice(0,10):[],lore:typeof o.l==="string"?o.l.slice(0,2000):null,gender:o.g==="F"?"F":"M",age:clamp(o.ag,12,50),silver:clamp(o.s,3,18),archetype:o.ar2||null,spellbook:null,notes:"",shared:true,createdAt:new Date().toISOString()};
}catch(e){return null;}}

// INVENTORY PICKER
function InvPicker({onAdd,onClose}){
  const[q,setQ]=useState("");
  const filt=q.length>=1?ALL_ITEMS.filter(i=>i.toLowerCase().includes(q.toLowerCase())).slice(0,12):[];
  return(<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
    <div style={{background:"#1a1816",border:"1px solid #2d2a25",borderRadius:12,padding:20,width:"100%",maxWidth:400,maxHeight:"80vh",overflow:"auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <h3 style={{fontSize:14,color:"#c9a84c",margin:0,letterSpacing:2}}>ADICIONAR ITEM</h3>
        <button onClick={onClose} style={{background:"none",border:"none",color:"#7a7568",fontSize:20,cursor:"pointer"}}>✕</button>
      </div>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar item oficial ou digitar..." autoFocus style={{width:"100%",background:"#0f0e0c",border:"1px solid #2d2a25",borderRadius:6,padding:"10px 12px",color:"#e0dbd0",fontSize:14,fontFamily:"inherit",marginBottom:8,boxSizing:"border-box"}}/>
      {q.trim()&&<button onClick={()=>{onAdd(q.trim());onClose();}} style={{width:"100%",padding:10,background:"rgba(201,168,76,0.15)",border:"1px dashed rgba(201,168,76,0.5)",borderRadius:6,color:"#c9a84c",fontSize:13,cursor:"pointer",fontFamily:"inherit",marginBottom:8,textAlign:"left"}}>+ Personalizado: "{q.trim()}"</button>}
      {filt.map((it,i)=><button key={i} onClick={()=>{onAdd(it);onClose();}} style={{display:"block",width:"100%",background:"#0f0e0c",border:"1px solid rgba(45,42,37,0.3)",borderRadius:5,padding:"8px 10px",color:"#e0dbd0",fontSize:13,cursor:"pointer",fontFamily:"inherit",textAlign:"left",marginBottom:3}}>{it}</button>)}
      {q.length>=1&&!filt.length&&<p style={{fontSize:12,color:"#7a7568",fontStyle:"italic",padding:8}}>Nenhum oficial. Use o botão acima.</p>}
      {!q&&<p style={{fontSize:12,color:"#7a7568",fontStyle:"italic",padding:8}}>Digite para buscar nos itens oficiais do Cairn.</p>}
    </div>
  </div>);
}

// ============ MAIN APP ============
export default function CairnApp(){
  const[scr,setScr]=useState("home");
  const[ch,setCh]=useState(null);
  const[saved,setSaved]=useState([]);
  const[credits,setCredits]=useState(5);
  const[mon,setMon]=useState(null);
  const[swapMode,setSwapMode]=useState(false);
  const[swapFirst,setSwapFirst]=useState(null);
  const[loading,setLoading]=useState(false);
  const[toast,setToast]=useState(null);
  const[ed,setEd]=useState(null);
  const[gPass,setGPass]=useState("");
  const[gOn,setGOn]=useState(false);
  const[firstUsed,setFirstUsed]=useState(false);
  const[showInv,setShowInv]=useState(false);
  // Manual creation state
  const[mf,setMf]=useState({name:"",gender:"M",age:30,background:BACKGROUNDS[0],forV:0,desV:0,vonV:0,hp:0,silver:0,rolled:false});

  useEffect(()=>{try{
    const s=localStorage.getItem("c_s");if(s)setSaved(JSON.parse(s));
    const c=localStorage.getItem("c_c");const cv=localStorage.getItem("c_cv");
    if(c){const cr=parseInt(c);if(cv&&parseInt(cv)===ck(cr)){setCredits(cr);}else{setCredits(5);}} // tamper detection
    const g=localStorage.getItem("c_g");if(g==="1")setGOn(true);
    const f=localStorage.getItem("c_f");if(f==="1")setFirstUsed(true);
  }catch(e){}
    const sh=loadShared();if(sh){setCh(sh);setScr("sheet");window.history.replaceState({},"",window.location.pathname);}
  },[]);

  const persist=(chars,creds)=>{try{localStorage.setItem("c_s",JSON.stringify(chars));localStorage.setItem("c_c",""+creds);localStorage.setItem("c_cv",""+ck(creds));}catch(e){}};
  const msg=m=>{setToast(m);setTimeout(()=>setToast(null),2500);};
  const updF=(f,v)=>{const c={...ch};if(f.includes(".")){const[a,b]=f.split(".");c[a]={...c[a],[b]:v};}else c[f]=v;setCh(c);};

  // ANTI-ABUSE: unified credit check for any character creation
  const spendCredit=(action)=>{
    if(firstUsed){
      if(credits<=0){msg("Sem créditos! Peça ao Guardião.");return false;}
      const n=credits-1;setCredits(n);persist(saved,n);msg(`${action} (-1 ◆)`);return true;
    }else{
      setFirstUsed(true);try{localStorage.setItem("c_f","1");}catch(e){}
      msg("Primeiro personagem grátis!");return true;
    }
  };

  const doGen=(ai=null)=>{
    if(!spendCredit("Novo personagem"))return;
    setCh(genChar(ai));setSwapMode(false);setSwapFirst(null);setScr("sheet");
  };
  const doRR=f=>{
    if(!spendCredit("Reroll"))return;
    const c={...ch};
    if(f==="a")c.attributes={for:R3d6(),des:R3d6(),von:R3d6()};
    else if(f==="h"){const n=RD6();c.hp=n;c.maxHp=n;}
    else if(f==="b")c.background=BACKGROUNDS[RD20()-1];
    else if(f==="t")c.traits={physique:PHYSIQUE[RD10()-1],skin:SKIN[RD10()-1],hair:HAIR[RD10()-1],face:FACE[RD10()-1],speech:SPEECH[RD10()-1],clothing:CLOTHING[RD10()-1],virtue:VIRTUE[RD10()-1],vice:VICE[RD10()-1],reputation:REPUTATION[RD10()-1],misfortune:MISFORTUNE[RD10()-1]};
    setCh(c);
  };
  const doSwap=a=>{if(!swapFirst){setSwapFirst(a);return;}if(swapFirst===a){setSwapFirst(null);return;}const c={...ch,attributes:{...ch.attributes}};const t=c.attributes[swapFirst];c.attributes[swapFirst]=c.attributes[a];c.attributes[a]=t;setCh(c);setSwapMode(false);setSwapFirst(null);msg(`${swapFirst.toUpperCase()} ⇄ ${a.toUpperCase()}`);};
  const doSave=()=>{if(!ch)return;const u=[...saved.filter(s=>s.id!==ch.id),ch];setSaved(u);persist(u,credits);msg("Salvo!");};
  const doDel=id=>{const u=saved.filter(s=>s.id!==id);setSaved(u);persist(u,credits);msg("Removido.");};
  // ANTI-ABUSE: only guardian can add/remove inventory items freely
  const addInv=item=>{if(!ch||ch.inventory.length>=10){msg("Inventário cheio!");return;}setCh({...ch,inventory:[...ch.inventory,item]});};
  const rmInv=i=>{if(!ch)return;const inv=[...ch.inventory];inv.splice(i,1);setCh({...ch,inventory:inv});};

  const doLore=async()=>{if(!ch)return;setLoading(true);try{
    const p=`Crie exatamente 6 frases curtas e evocativas de lore/história para este personagem de RPG Cairn. As frases DEVEM refletir todos os dados:
Nome: ${ch.name} (${ch.gender==="F"?"mulher":"homem"}, ${ch.age} anos). Antecedente: ${ch.background}. Físico: ${ch.traits.physique}, Pele: ${ch.traits.skin}, Cabelo: ${ch.traits.hair}, Rosto: ${ch.traits.face}. Fala: ${ch.traits.speech}, Roupa: ${ch.traits.clothing}. Virtude: ${ch.traits.virtue}, Vício: ${ch.traits.vice}. Reputação: ${ch.traits.reputation}, Infortúnio: ${ch.traits.misfortune}. FOR ${ch.attributes.for}, DES ${ch.attributes.des}, VON ${ch.attributes.von}, Guarda ${ch.hp}. ${ch.spellbook?"Feitiço: "+ch.spellbook:"Sem feitiços."} Itens: ${ch.inventory.join(", ")}.
Se FOR baixa→fragilidade. Se VON alta→determinação. Use antecedente como profissão. Conecte infortúnio à história. APENAS 6 frases, uma por linha, sem números, sem aspas.`;
    const t=await fetchLore(p);setCh({...ch,lore:t.trim()||"Não foi possível gerar."});
  }catch(e){console.error("Lore error:",e);setCh({...ch,lore:"Erro na conexão. Tente novamente."});}setLoading(false);};

  const doMLore=async()=>{if(!mon)return;setLoading(true);try{
    const p=`4 frases de lore sombria para monstro Cairn coerentes com atributos: ${mon.name}. PG ${mon.hp}, FOR ${mon.for}, DES ${mon.des}, VON ${mon.von}, Arm ${mon.armor}, Ataque: ${mon.attack}. Se FOR alta→poderoso. Se DES alta→ágil. 4 frases, uma por linha.`;
    const t=await fetchLore(p);setMon({...mon,lore:t.trim()||"Erro."});
  }catch(e){setMon({...mon,lore:"Erro na conexão."});}setLoading(false);};

  const gLogin=()=>{if(["cairn","guardiao","1234"].includes(gPass)){setGOn(true);localStorage.setItem("c_g","1");msg("Guardião ativado!");}else msg("Senha incorreta!");};

  // MANUAL CREATION: roll attributes (costs 1 credit, except first)
  const manualRollAll=()=>{
    if(mf.rolled){
      // Re-rolling costs credit
      if(!spendCredit("Reroll manual"))return;
    }
    setMf({...mf,forV:R3d6(),desV:R3d6(),vonV:R3d6(),hp:RD6(),silver:R3d6(),age:R(20)+R(20)+10,rolled:true});
  };
  const manualCreate=()=>{
    if(!mf.name.trim()){msg("Digite um nome!");return;}
    if(!mf.rolled){msg("Role os dados primeiro!");return;}
    if(!spendCredit("Criar personagem"))return;
    const tr={physique:PHYSIQUE[RD10()-1],skin:SKIN[RD10()-1],hair:HAIR[RD10()-1],face:FACE[RD10()-1],speech:SPEECH[RD10()-1],clothing:CLOTHING[RD10()-1],virtue:VIRTUE[RD10()-1],vice:VICE[RD10()-1],reputation:REPUTATION[RD10()-1],misfortune:MISFORTUNE[RD10()-1]};
    const c={id:uid(),name:mf.name.trim(),gender:mf.gender,age:mf.age,background:mf.background,
      attributes:{for:mf.forV,des:mf.desV,von:mf.vonV},hp:mf.hp,maxHp:mf.hp,armor:0,silver:mf.silver,
      traits:tr,inventory:["Rações (3 dias)","Tocha"],spellbook:null,lore:null,notes:"",archetype:null,createdAt:new Date().toISOString()};
    setCh(c);setScr("sheet");setMf({name:"",gender:"M",age:30,background:BACKGROUNDS[0],forV:0,desV:0,vonV:0,hp:0,silver:0,rolled:false});
  };

  // COLORS & STYLES
  const G="#c9a84c",Gd="#8a6d2b",Bg="#0f0e0c",Cd="#1a1816",Bd="#2d2a25",Tx="#e0dbd0",Mu="#7a7568",Ac="#b8432f",Gr="#5a9a5a";
  const sBtn={background:`${Gd}40`,color:G,border:`1px solid ${Gd}60`,borderRadius:6,padding:"5px 12px",fontSize:11,fontWeight:"bold",fontFamily:"inherit",cursor:"pointer"};
  const sBtnAct={background:`linear-gradient(135deg,${Gd},${Gd}cc)`,color:Bg,borderRadius:8,padding:"10px 16px",fontSize:12,fontWeight:"bold",fontFamily:"inherit",cursor:"pointer",border:"none"};
  const sBtnBack={background:Cd,color:Mu,border:`1px solid ${Bd}`,borderRadius:8,padding:"10px 16px",fontSize:12,fontFamily:"inherit",cursor:"pointer"};
  const sT={fontSize:12,fontWeight:"bold",color:G,letterSpacing:2,margin:0,textTransform:"uppercase"};
  const sInp={background:Cd,border:`1px solid ${Bd}`,borderRadius:5,padding:"6px 10px",color:Tx,fontSize:13,fontFamily:"inherit",boxSizing:"border-box"};

  return(
    <div style={{fontFamily:"Georgia,'Times New Roman',serif",background:Bg,minHeight:"100vh",color:Tx,maxWidth:520,margin:"0 auto",paddingBottom:40}}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}body{margin:0;background:#0f0e0c}button{border:none;cursor:pointer;font-family:inherit}button:active{opacity:.85;transform:scale(.97)}input:focus,textarea:focus{outline:1px solid #8a6d2b}select{background:#1a1816;color:#e0dbd0;border:1px solid #2d2a25;border-radius:5px;padding:6px 10px;font-size:13px;font-family:inherit}`}</style>
      {toast&&<div style={{position:"fixed",top:60,left:"50%",transform:"translateX(-50%)",background:G,color:Bg,padding:"8px 22px",borderRadius:8,fontWeight:"bold",fontSize:13,zIndex:999}}>{toast}</div>}
      {showInv&&<InvPicker onAdd={addInv} onClose={()=>setShowInv(false)}/>}

      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px",borderBottom:`1px solid ${Bd}`,background:`linear-gradient(180deg,#1a1814,${Bg})`,position:"sticky",top:0,zIndex:100}}>
        <div onClick={()=>setScr("home")} style={{cursor:"pointer"}}><h1 style={{fontSize:26,fontWeight:"bold",color:G,letterSpacing:6,margin:0}}>CAIRN</h1><p style={{fontSize:9,color:Mu,letterSpacing:3,textTransform:"uppercase",margin:0}}>Gerador · 1e · PT-BR</p></div>
        <div style={{display:"flex",alignItems:"center",gap:5,background:`${Gd}30`,border:`1px solid ${Gd}60`,borderRadius:8,padding:"5px 10px"}}><span style={{color:G}}>◆</span><span style={{fontSize:16,fontWeight:"bold",color:G}}>{credits}</span></div>
      </header>

      <div style={{padding:"0 16px"}}>

      {/* HOME */}
      {scr==="home"&&<div style={{padding:"20px 0"}}>
        <div style={{fontSize:48,color:G,textAlign:"center",marginBottom:8}}>⛧</div>
        <p style={{fontSize:15,color:Mu,textAlign:"center",lineHeight:1.6,fontStyle:"italic",maxWidth:340,margin:"0 auto 24px"}}>Explore a Vastidão, as Florestas e as Masmorras sombrias.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
          {[["🎲","Gerar",()=>doGen(),firstUsed?"(-1 ◆)":"grátis!"],["✍️","Manual",()=>{setMf({name:"",gender:"M",age:30,background:BACKGROUNDS[0],forV:0,desV:0,vonV:0,hp:0,silver:0,rolled:false});setScr("manual");},firstUsed?"(-1 ◆)":"grátis!"],["⚔️","Arquétipos",()=>setScr("archetypes"),firstUsed?"(-1 ◆)":""],["🐉","Monstro",()=>{setMon(genMonster());setScr("monster")}],["📜",`Fichas (${saved.length})`,()=>setScr("saved")],["💀","Cicatrizes",()=>setScr("scars")],["📖","Regras",()=>setScr("rules")],["◆","Créditos",()=>setScr("creds")],["🛡️","Guardião",()=>setScr("guard")]].map(([ic,lb,fn,sub],i)=>
            <button key={i} onClick={fn} style={{background:Cd,border:`1px solid ${Bd}`,borderRadius:10,padding:"16px 8px",display:"flex",flexDirection:"column",alignItems:"center",gap:5,color:Tx,fontSize:11,fontWeight:"bold",letterSpacing:1,textTransform:"uppercase"}}><span style={{fontSize:24}}>{ic}</span>{lb}{sub&&<span style={{fontSize:9,color:sub.includes("grátis")?Gr:Mu,fontWeight:"normal",textTransform:"none"}}>{sub}</span>}</button>
          )}
        </div>
        <p style={{textAlign:"center",fontSize:10,color:Mu}}>Cairn por Yochai Gal · Trad. Rafa Arruda · CC-BY-SA 4.0</p>
      </div>}

      {/* ARCHETYPES */}
      {scr==="archetypes"&&<div style={{padding:"20px 0"}}>
        <h2 style={{...sT,fontSize:16,marginBottom:6}}>ARQUÉTIPOS</h2>
        <p style={{fontSize:12,color:Mu,marginBottom:16}}>{firstUsed?"Cada arquétipo custa 1 ◆":"Primeiro personagem grátis!"}</p>
        {ARCHETYPES.map((a,i)=><button key={i} onClick={()=>doGen(i)} style={{display:"block",width:"100%",textAlign:"left",background:Cd,border:`1px solid ${Bd}`,borderRadius:8,padding:12,marginBottom:8,color:Tx}}><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:14,fontWeight:"bold",color:G}}>{a.n}</span>{firstUsed&&<span style={{fontSize:10,color:Mu}}>-1 ◆</span>}</div><div style={{fontSize:11,color:Mu,marginTop:4,lineHeight:1.5}}>{a.i.join(" · ")}</div></button>)}
        <button onClick={()=>setScr("home")} style={{...sBtnBack,marginTop:12}}>← Voltar</button>
      </div>}

      {/* MANUAL CREATION */}
      {scr==="manual"&&<div style={{padding:"20px 0"}}>
        <h2 style={{...sT,fontSize:16,marginBottom:6}}>CRIAR MANUALMENTE</h2>
        <p style={{fontSize:12,color:Mu,marginBottom:16}}>Escolha nome, gênero e antecedente. Atributos são rolados com dados — sem digitação manual. {firstUsed?"Criar custa 1 ◆. Re-rolar custa 1 ◆.":"Primeiro grátis!"}</p>

        <label style={{fontSize:10,color:Gd,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:4}}>Nome</label>
        <div style={{display:"flex",gap:6,marginBottom:12}}>
          <input style={{...sInp,flex:1}} value={mf.name} onChange={e=>setMf({...mf,name:e.target.value})} placeholder="Digite o nome do personagem" maxLength={40}/>
          <button style={sBtn} onClick={()=>{const g=R(2)===1;setMf({...mf,name:(g?FEMALE_NAMES[RD20()-1]:MALE_NAMES[RD20()-1])+" "+SURNAMES[RD20()-1],gender:g?"F":"M"});}}>🎲</button>
        </div>

        <div style={{display:"flex",gap:10,marginBottom:12}}>
          <div style={{flex:1}}>
            <label style={{fontSize:10,color:Gd,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:4}}>Gênero</label>
            <div style={{display:"flex",gap:6}}>{["M","F"].map(g=><button key={g} onClick={()=>setMf({...mf,gender:g})} style={{...sBtn,flex:1,padding:"8px",background:mf.gender===g?`${G}30`:Cd,borderColor:mf.gender===g?G:Bd}}>{g==="M"?"♂ Masc.":"♀ Fem."}</button>)}</div>
          </div>
          <div style={{flex:1}}>
            <label style={{fontSize:10,color:Gd,letterSpacing:1,textTransform:"uppercase",display:"block",marginBottom:4}}>Antecedente</label>
            <select style={{...sInp,width:"100%"}} value={mf.background} onChange={e=>setMf({...mf,background:e.target.value})}>
              {BACKGROUNDS.map(b=><option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>

        {/* ROLL ALL — single button, no individual field editing */}
        <div style={{background:`${Cd}`,border:`1px solid ${Bd}`,borderRadius:8,padding:16,marginBottom:12}}>
          <p style={{fontSize:10,color:Gd,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>Atributos, Guarda, Prata e Idade (dados)</p>
          {mf.rolled?(
            <div>
              <div style={{display:"flex",gap:12,justifyContent:"center",marginBottom:10}}>
                {[["FOR",mf.forV],["DES",mf.desV],["VON",mf.vonV]].map(([l,v])=><div key={l} style={{textAlign:"center"}}><span style={{fontSize:10,color:G,fontWeight:"bold"}}>{l}</span><div style={{fontSize:24,fontWeight:"bold"}}>{v}</div></div>)}
              </div>
              <div style={{display:"flex",gap:16,justifyContent:"center",marginBottom:12,fontSize:13,color:Mu}}>
                <span>PG: <strong style={{color:Tx}}>{mf.hp}</strong></span>
                <span>PP: <strong style={{color:Tx}}>{mf.silver}</strong></span>
                <span>Idade: <strong style={{color:Tx}}>{mf.age}</strong></span>
              </div>
              <button style={{...sBtn,width:"100%",padding:8}} onClick={manualRollAll}>🎲 Re-rolar tudo {firstUsed?"(-1 ◆)":""}</button>
            </div>
          ):(
            <button style={{...sBtnAct,width:"100%",padding:12}} onClick={manualRollAll}>🎲 Rolar dados (3d6 FOR/DES/VON, 1d6 PG, 3d6 PP)</button>
          )}
        </div>

        <button style={{...sBtnAct,width:"100%",padding:14,fontSize:14,opacity:mf.rolled?1:0.4}} onClick={manualCreate} disabled={!mf.rolled}>
          ✦ Criar Personagem {firstUsed?"(-1 ◆)":""}
        </button>
        <button onClick={()=>setScr("home")} style={{...sBtnBack,width:"100%",marginTop:8}}>← Voltar</button>
      </div>}

      {/* SHEET */}
      {scr==="sheet"&&ch&&<div style={{padding:"20px 0"}}>
        {ch.shared&&<div style={{background:`${Ac}20`,border:`1px solid ${Ac}40`,borderRadius:6,padding:"8px 12px",marginBottom:12,fontSize:12,color:Ac}}>📋 Ficha compartilhada (somente leitura)</div>}
        <div style={{marginBottom:16}}>
          {gOn&&ed==="name"?<input style={{...sInp,width:"100%",fontSize:20,fontWeight:"bold",color:G}} value={ch.name} onChange={e=>updF("name",e.target.value)} onBlur={()=>setEd(null)} autoFocus/>
          :<h2 style={{fontSize:22,fontWeight:"bold",color:G}} onClick={()=>gOn&&setEd("name")}>{ch.name}{gOn&&<span style={{fontSize:10,color:Mu,marginLeft:6}}>✎</span>}</h2>}
          <p style={{fontSize:13,color:Mu,marginTop:3}}>{ch.gender==="F"?"♀":"♂"} · {ch.age} anos · {ch.background}{ch.archetype?` · ${ch.archetype}`:""}</p>
        </div>
        {/* ATTRS */}
        <div style={{padding:"14px 0",borderBottom:`1px solid ${Bd}20`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><h3 style={sT}>ATRIBUTOS</h3>
            {!ch.shared&&<div style={{display:"flex",gap:5}}><button style={sBtn} onClick={()=>{setSwapMode(!swapMode);setSwapFirst(null)}}>{swapMode?"Cancelar":"⇄ Trocar"}</button><button style={sBtn} onClick={()=>doRR("a")}>↻ (-1◆)</button></div>}
          </div>
          {swapMode&&<p style={{fontSize:11,color:G,fontStyle:"italic",textAlign:"center",marginBottom:8}}>Toque em dois para trocar (grátis, 1x)</p>}
          <div style={{display:"flex",gap:8,justifyContent:"center"}}>
            {[["for","FOR"],["des","DES"],["von","VON"]].map(([k,l])=><div key={k} onClick={()=>swapMode?doSwap(k):null} style={{background:Cd,border:`1px solid ${swapFirst===k?G:Bd}`,borderRadius:8,padding:"10px 14px",display:"flex",flexDirection:"column",alignItems:"center",flex:"1 1 70px",cursor:swapMode?"pointer":"default",boxShadow:swapFirst===k?`0 0 10px ${G}30`:"none"}}>
              <span style={{fontSize:10,fontWeight:"bold",color:G,letterSpacing:2}}>{l}</span>
              {gOn&&ed===k?<input type="number" style={{...sInp,width:50,textAlign:"center",padding:"4px 6px"}} value={ch.attributes[k]} onChange={e=>updF("attributes."+k,Math.min(18,Math.max(3,parseInt(e.target.value)||3)))} onBlur={()=>setEd(null)} autoFocus/>
              :<span style={{fontSize:26,fontWeight:"bold"}} onClick={()=>gOn&&!swapMode&&setEd(k)}>{ch.attributes[k]}</span>}
            </div>)}
          </div>
        </div>
        {/* HP/ARM/PP */}
        <div style={{padding:"14px 0",borderBottom:`1px solid ${Bd}20`,display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:8}}>
          {[["Guarda","hp"],["Armadura","armor"],["Prata","silver"]].map(([l,k])=><div key={k} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
            <span style={{fontSize:10,color:Mu,letterSpacing:1,textTransform:"uppercase"}}>{l}</span>
            {gOn&&ed===k?<input type="number" style={{...sInp,width:50,textAlign:"center",padding:"4px 6px"}} value={ch[k]} onChange={e=>updF(k,parseInt(e.target.value)||0)} onBlur={()=>setEd(null)} autoFocus/>:<span style={{fontSize:22,fontWeight:"bold"}} onClick={()=>gOn&&setEd(k)}>{ch[k]}</span>}
            {k==="hp"&&!ch.shared&&<button style={{...sBtn,padding:"2px 8px",fontSize:9}} onClick={()=>doRR("h")}>↻</button>}
          </div>)}
        </div>
        {/* TRAITS */}
        <div style={{padding:"14px 0",borderBottom:`1px solid ${Bd}20`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><h3 style={sT}>TRAÇOS</h3>{!ch.shared&&<button style={sBtn} onClick={()=>doRR("t")}>↻ (-1◆)</button>}</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
            {[["Físico","physique"],["Pele","skin"],["Cabelo","hair"],["Rosto","face"],["Fala","speech"],["Roupa","clothing"],["Virtude","virtue"],["Vício","vice"],["Reputação","reputation"],["Infortúnio","misfortune"]].map(([l,k])=><div key={k} style={{padding:"5px 7px",background:`${Cd}90`,borderRadius:5,border:`1px solid ${Bd}30`}}><div style={{fontSize:9,color:Gd,letterSpacing:1,textTransform:"uppercase"}}>{l}</div><div style={{fontSize:13,fontWeight:"600"}}>{ch.traits[k]}</div></div>)}
          </div>
        </div>
        {/* BG */}
        <div style={{padding:"14px 0",borderBottom:`1px solid ${Bd}20`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><h3 style={sT}>ANTECEDENTE</h3>{!ch.shared&&<button style={sBtn} onClick={()=>doRR("b")}>↻ (-1◆)</button>}</div>
          <p style={{fontSize:18,fontWeight:"bold",color:G}}>{ch.background}</p>
        </div>
        {/* INVENTORY */}
        <div style={{padding:"14px 0",borderBottom:`1px solid ${Bd}20`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <h3 style={sT}>INVENTÁRIO ({ch.inventory.length}/10)</h3>
            {!ch.shared&&ch.inventory.length<10&&<button style={sBtn} onClick={()=>setShowInv(true)}>+ Item</button>}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:3}}>
            {ch.inventory.map((it,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",borderRadius:5,border:`1px solid ${Bd}20`,background:`${Cd}cc`}}>
              <span style={{fontSize:10,color:Gd,fontWeight:"bold",minWidth:16}}>{i+1}</span>
              {gOn&&ed===`i${i}`?<input style={{...sInp,flex:1,padding:"3px 6px"}} value={it} onChange={e=>{const inv=[...ch.inventory];inv[i]=e.target.value;setCh({...ch,inventory:inv});}} onBlur={()=>setEd(null)} autoFocus/>
              :<span style={{flex:1,fontSize:13}} onClick={()=>gOn&&setEd(`i${i}`)}>{it}</span>}
              {gOn&&<button onClick={()=>rmInv(i)} style={{background:`${Ac}25`,color:Ac,border:"none",borderRadius:4,padding:"3px 7px",fontSize:11,fontWeight:"bold"}}>✕</button>}
            </div>)}
            {Array.from({length:10-ch.inventory.length}).map((_,i)=><div key={`e${i}`} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",borderRadius:5,border:`1px solid ${Bd}20`,opacity:.3}}>
              <span style={{fontSize:10,color:Gd,fontWeight:"bold",minWidth:16}}>{ch.inventory.length+i+1}</span><span style={{fontSize:13,color:Mu}}>—</span>
            </div>)}
          </div>
        </div>
        {/* LORE */}
        <div style={{padding:"14px 0",borderBottom:`1px solid ${Bd}20`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <h3 style={sT}>LORE (IA)</h3>
            {!ch.shared&&<button style={{...sBtn,background:"linear-gradient(135deg,#2a1a3a,#1a1028)",borderColor:"#6a4a9a50",color:"#c8a0f0"}} onClick={doLore} disabled={loading}>{loading?"Gerando...":"✦ Gerar Lore"}</button>}
          </div>
          {ch.lore?<div style={{background:"linear-gradient(135deg,#1a1814,#12100d)",borderRadius:8,padding:14,border:`1px solid ${Gd}30`}}>{ch.lore.split("\n").filter(l=>l.trim()).map((l,i)=><p key={i} style={{fontSize:13,lineHeight:1.7,margin:"0 0 6px",fontStyle:"italic"}}>{l}</p>)}</div>
          :<p style={{fontSize:12,color:Mu,fontStyle:"italic"}}>Gere a história com IA (grátis via Pollinations.ai)</p>}
        </div>
        {gOn&&<div style={{padding:"14px 0"}}><h3 style={{...sT,marginBottom:8}}>NOTAS DO GUARDIÃO</h3><textarea style={{...sInp,width:"100%",minHeight:60,resize:"vertical"}} value={ch.notes||""} onChange={e=>updF("notes",e.target.value)} placeholder="Anotações..."/></div>}
        <div style={{display:"flex",gap:8,padding:"14px 0",flexWrap:"wrap",justifyContent:"center"}}>
          {!ch.shared&&<button style={sBtnAct} onClick={doSave}>💾 Salvar</button>}
          <button style={sBtnAct} onClick={()=>exportPNG(ch)}>📄 PNG</button>
          <button style={sBtnAct} onClick={()=>shareChar(ch)}>🔗 Link</button>
          {!ch.shared&&<button style={sBtnAct} onClick={()=>doGen()}>🎲 Novo (-1◆)</button>}
          <button style={sBtnBack} onClick={()=>setScr("home")}>← Menu</button>
        </div>
      </div>}

      {/* MONSTER */}
      {scr==="monster"&&mon&&<div style={{padding:"20px 0"}}>
        <h2 style={{fontSize:22,fontWeight:"bold",color:G,marginBottom:4}}>{mon.name}</h2><p style={{fontSize:13,color:Mu}}>Criatura</p>
        <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",padding:"14px 0"}}>
          {[["PG",mon.hp],["ARM",mon.armor],["FOR",mon.for],["DES",mon.des],["VON",mon.von]].map(([l,v])=><div key={l} style={{background:Cd,border:`1px solid ${Bd}`,borderRadius:8,padding:"10px 14px",display:"flex",flexDirection:"column",alignItems:"center",minWidth:55}}><span style={{fontSize:10,fontWeight:"bold",color:G,letterSpacing:2}}>{l}</span><span style={{fontSize:24,fontWeight:"bold"}}>{v}</span></div>)}
        </div>
        <p style={{fontSize:15,marginTop:8}}>Ataque: <strong style={{color:G}}>{mon.attack}</strong></p>
        <div style={{padding:"14px 0"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><h3 style={sT}>LORE</h3><button style={{...sBtn,background:"linear-gradient(135deg,#2a1a3a,#1a1028)",borderColor:"#6a4a9a50",color:"#c8a0f0"}} onClick={doMLore} disabled={loading}>{loading?"...":"✦ Lore"}</button></div>
          {mon.lore?<div style={{background:"linear-gradient(135deg,#1a1814,#12100d)",borderRadius:8,padding:14,border:`1px solid ${Gd}30`}}>{mon.lore.split("\n").filter(l=>l.trim()).map((l,i)=><p key={i} style={{fontSize:13,lineHeight:1.7,margin:"0 0 6px",fontStyle:"italic"}}>{l}</p>)}</div>:<p style={{fontSize:12,color:Mu,fontStyle:"italic"}}>Gere a lore desta criatura</p>}
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"center"}}><button style={sBtnAct} onClick={()=>setMon(genMonster())}>🐉 Novo</button><button style={sBtnBack} onClick={()=>setScr("home")}>← Menu</button></div>
      </div>}

      {/* SAVED */}
      {scr==="saved"&&<div style={{padding:"20px 0"}}><h2 style={{...sT,fontSize:16,marginBottom:16}}>FICHAS SALVAS</h2>
        {!saved.length?<p style={{fontSize:13,color:Mu,fontStyle:"italic"}}>Nenhum personagem.</p>:saved.map(c=><div key={c.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${Bd}20`}}>
          <div onClick={()=>{setCh(c);setScr("sheet")}} style={{cursor:"pointer",flex:1}}><div style={{fontSize:15,color:G,fontWeight:"bold"}}>{c.name}</div><div style={{fontSize:11,color:Mu}}>{c.background} · FOR {c.attributes.for} DES {c.attributes.des} VON {c.attributes.von} · PG {c.hp}</div></div>
          <button onClick={()=>doDel(c.id)} style={{background:`${Ac}30`,color:Ac,border:"none",borderRadius:5,padding:"5px 10px",fontSize:13,fontWeight:"bold"}}>✕</button>
        </div>)}
        <button onClick={()=>setScr("home")} style={{...sBtnBack,marginTop:16}}>← Menu</button>
      </div>}

      {/* SCARS */}
      {scr==="scars"&&<div style={{padding:"20px 0"}}><h2 style={{...sT,fontSize:16,marginBottom:6}}>CICATRIZES</h2><p style={{fontSize:12,color:Mu,marginBottom:16,lineHeight:1.5}}>PG chega a 0 exato → role com o mesmo dado de dano.</p>
        {SCARS.map((s,i)=><div key={i} style={{padding:"10px 0",borderBottom:`1px solid ${Bd}15`}}><span style={{fontSize:11,color:G,fontWeight:"bold"}}>{s.d}.</span> <span style={{fontSize:14,fontWeight:"bold"}}>{s.t}</span><p style={{fontSize:12,color:Mu,lineHeight:1.5,marginTop:3}}>{s.x}</p></div>)}
        <button onClick={()=>setScr("home")} style={{...sBtnBack,marginTop:16}}>← Menu</button>
      </div>}

      {/* CREDITS */}
      {scr==="creds"&&<div style={{padding:"20px 0"}}><h2 style={{...sT,fontSize:16,marginBottom:16}}>CRÉDITOS</h2>
        <div style={{textAlign:"center",marginBottom:20}}><div style={{fontSize:48,fontWeight:"bold",color:G}}>{credits}</div><p style={{fontSize:12,color:Mu}}>Criar personagem ou reroll = -1 ◆</p><p style={{fontSize:11,color:Mu,marginTop:4}}>{firstUsed?"1° já usado":"1° personagem: grátis!"}</p></div>
        {gOn?<div>
          <p style={{fontSize:12,color:Gr,textAlign:"center",marginBottom:12}}>🛡️ Modo Guardião — gerenciamento liberado</p>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
            {[1,5,10].map(n=><button key={n} style={sBtn} onClick={()=>{const v=credits+n;setCredits(v);persist(saved,v);msg(`+${n} créditos`)}}>+{n}</button>)}
            <button style={{...sBtn,color:Ac,borderColor:`${Ac}60`}} onClick={()=>{setCredits(0);persist(saved,0);msg("Créditos zerados")}}>Zerar</button>
            <button style={{...sBtn,color:Gr,borderColor:`${Gr}60`}} onClick={()=>{setCredits(5);persist(saved,5);msg("Reset para 5")}}>Reset 5</button>
            {firstUsed&&<button style={{...sBtn,color:"#80c0ff",borderColor:"#80c0ff60"}} onClick={()=>{setFirstUsed(false);localStorage.removeItem("c_f");msg("1° grátis restaurado!")}}>Restaurar 1°</button>}
          </div>
        </div>:<div style={{textAlign:"center"}}>
          <p style={{fontSize:13,color:Mu,fontStyle:"italic"}}>Apenas o Guardião pode adicionar créditos.</p>
          <p style={{fontSize:12,color:Mu,marginTop:8}}>Peça ao seu Guardião para ativar o modo Guardião e gerenciar seus créditos.</p>
        </div>}
        <button onClick={()=>setScr("home")} style={{...sBtnBack,display:"block",margin:"20px auto 0"}}>← Menu</button>
      </div>}

      {/* GUARDIAN */}
      {scr==="guard"&&<div style={{padding:"20px 0"}}><h2 style={{...sT,fontSize:16,marginBottom:16}}>🛡️ GUARDIÃO</h2>
        {gOn?<div><p style={{fontSize:14,color:Gr,marginBottom:16}}>✓ Ativo</p><p style={{fontSize:13,color:Mu,lineHeight:1.6,marginBottom:16}}>Edite fichas tocando nos valores. Gerencie créditos. Adicione/remova itens do inventário. Notas privadas.</p>
          <button style={{...sBtn,color:Ac,borderColor:`${Ac}60`}} onClick={()=>{setGOn(false);localStorage.removeItem("c_g");msg("Desativado.")}}>Desativar</button>
        </div>:<div><p style={{fontSize:13,color:Mu,marginBottom:12,lineHeight:1.6}}>Editar fichas, gerenciar créditos e notas.</p><p style={{fontSize:11,color:Gd,marginBottom:8}}>Senhas: "cairn", "guardiao" ou "1234"</p>
          <div style={{display:"flex",gap:8}}><input type="password" value={gPass} onChange={e=>setGPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&gLogin()} placeholder="Senha" style={{...sInp,flex:1}}/><button style={sBtnAct} onClick={gLogin}>Entrar</button></div>
        </div>}
        <button onClick={()=>setScr("home")} style={{...sBtnBack,marginTop:16}}>← Menu</button>
      </div>}

      {/* RULES */}
      {scr==="rules"&&<div style={{padding:"20px 0"}}><h2 style={{...sT,fontSize:16,marginBottom:16}}>REGRAS</h2>
        {[["Atributos","FOR, DES, VON. 3d6 em ordem. Pode trocar dois."],["Teste","d20 ≤ atributo = sucesso. 1=sucesso, 20=falha."],["Guarda (PG)","Evitar dano. 1d6. Recupera com descanso."],["Inventário","10 slots. Volumoso=2. Cheio=0 PG."],["Combate","Dano − armadura → PG. Sem rolagem de ataque."],["Dano Crítico","PG 0→Cicatrizes. PG<0→dano FOR + Teste."],["Armadura","Máx 3."],["Feitiços","Livro=1 slot. Duas mãos. +1 Fadiga."],["Sem Classes","Equipamentos definem o personagem."],["Morte","FOR 0=morte. DES 0=paralisia. VON 0=delírio."]].map(([t,d],i)=>
          <div key={i} style={{marginBottom:12,padding:10,background:`${Cd}80`,borderRadius:6,borderLeft:`3px solid ${Gd}`}}><div style={{fontSize:13,fontWeight:"bold",color:G,marginBottom:3}}>{t}</div><div style={{fontSize:13,lineHeight:1.5}}>{d}</div></div>
        )}
        <button onClick={()=>setScr("home")} style={{...sBtnBack,marginTop:16}}>← Menu</button>
      </div>}

      </div>
    </div>
  );
}
