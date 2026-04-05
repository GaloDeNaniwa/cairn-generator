//import { useState, useEffect, useCallback, useRef } from "react";
import { db, loginAnonimo } from './firebase';
import {
  doc, setDoc, getDoc, collection, getDocs, deleteDoc
} from 'firebase/firestore';

// ============================================
// CAIRN 1e - COMPLETE DATA TABLES (PT-BR)
// ============================================

const FEMALE_NAMES = [
  "Agune","Beatrice","Breagan","Bronwyn","Cannora",
  "Drelil","Elgile","Esme","Groua","Henaine",
  "Lirann","Lirathil","Lisabeth","Moralil","Morgwen",
  "Sybil","Theune","Wenlan","Ygwal","Yslen"
];

const MALE_NAMES = [
  "Arwel","Bevan","Boroth","Borrid","Breagle",
  "Breglor","Canhoreal","Emrys","Ethex","Gringle",
  "Grinwit","Gruwid","Gruwth","Gwestin","Mannog",
  "Melnax","Orthax","Triunein","Wenlan","Yirmeor"
];

const SURNAMES = [
  "Abernathy","Addercap","Burl","Candlewick","Cormick",
  "Crumwaller","Dunswallow","Getri","Glass","Harkness",
  "Harper","Loomer","Malksmilk","Smythe","Sunderman",
  "Swinney","Thatcher","Tolmen","Weaver","Wolder"
];

const BACKGROUNDS = [
  "Alquimista","Malandro","Artista","Ladrão","Escriba",
  "Médico","Carpinteiro","Caçador","Clérigo","Contrabandista",
  "Coveiro","Ferreiro","Contorcionista","Herbalista","Mercador",
  "Mercenário","Minerador","Mágico","Patrulheiro","Poeta"
];

const PHYSIQUE = ["Atlético","Baixo","Calejado","Musculoso","Esguio","Magricelo","Robusto","Esticada","Flácido","Alto"];
const SKIN = ["Bronzeada","Marca de Nascença","Envelhecida","Escura","Rosada","Macia","Tatuada","Cicatrizes","Manchada","Pálida"];
const HAIR = ["Cacheado","Crespo","Longo","Luxuoso","Oleoso","Ondulado","Ralo","Sujo","Trançado","Careca"];
const FACE = ["Alongado","Fino","Ossudo","Enrugado","Perfeito","Esculpido","Quebrado","Redondo","Escultural","Quadrado"];
const SPEECH = ["Direta","Formal","Gagueja","Enigmática","Estridente","Grave","Trovejante","Zumbida","Precisa","Sussurrante"];
const CLOTHING = ["Antiquada","Elegantes","Trapos","Desalinhada","Desgastadas","Ensanguentadas","Rançosas","Uniforme","Estranhas","Imundas"];
const VIRTUE = ["Ambicioso","Disciplinado","Honrável","Cauteloso","Corajoso","Humilde","Sociável","Tolerante","Piedoso","Sereno"];
const VICE = ["Agressivo","Ganancioso","Nervoso","Amargurado","Covarde","Preguiçoso","Vaidoso","Vingativo","Rude","Traiçoeiro"];
const REPUTATION = ["Ambiciosa","Honesta","Perigosa","Animadora","Excêntrica","Preguiçosa","Sábia","Vulgar","Repulsiva","Respeitada"];
const MISFORTUNE = ["Abandonado","Condenado","Iludido","Amaldiçoado","Chantageado","Desacreditado","Rebaixado","Viciado","Deserdado","Exilado"];

const SPELLS = [
  "Acelerar","Aderir","Adormecer","Alisar","Alterar Clima","Amortecer Magia","Ancorar","Animar Objeto","Antropomorfizar","Ar Líquido",
  "Arrombar","Atrair","Bagunçar","Balbuciar","Bugiganga","Caminhar nas Paredes","Caminhar no Espelho","Carbonizar","Comandar","Compreender",
  "Cone de Espuma","Confundir","Controlar Plantas","Controle Temporal","Corrente Invisível","Cubo","Curar Ferimentos","Deslocar","Desmembrar","Detectar Magia",
  "Disfarce","Elasticidade","Empurrar/Puxar","Encantar","Ensurdecer","Enxame","Escudo","Esculpir Elementos","Esfera da Fraqueza","Esfera de Sombras",
  "Farejar","Fervura","Flor-de-isca","Flutuador","Fobia","Forma Animal","Forma de Fumaça","Forma Gosmenta","Frenesi","Ganância",
  "Hipnotizar","Identificar Passado","Iluminar","Ilusão Auditiva","Ilusão Visual","Invocar Ídolo","Isca Mágica","Ler Mentes","Levantar Espírito","Levantar os Mortos",
  "Manipular Gravidade","Mania de Gude","Manto","Mão Arcana","Máscara","Mente Vazia","Miniaturizar","Muitos Braços","Nevoeiro","Objetificar",
  "Ódio","Olho Arcano","Ouvir Sussurros","Pacificar","Parede Elemental","Pegar Para Si","Perscrutar","Portão","Prisão Astral","Proteger",
  "Reflexo","Repelir","Salto","Sentir","Serra Átomo","Sinalizador","Soprar","Surto Primal","Teia","Telecinese",
  "Telepatia","Teleporte","Terremoto","Toque Gélido","Traspassar Visão","Trocar Corpo","Vala","Vegetação","Visão","Visão Verdadeira"
];

const ARMOR_TABLE = [
  {range:[1,3], name:"Nenhuma", armor:0, slots:0},
  {range:[4,14], name:"Couro", armor:1, slots:1},
  {range:[15,19], name:"Cota de Malha", armor:2, slots:1, bulky:true},
  {range:[20,20], name:"Placas", armor:3, slots:1, bulky:true}
];

const HELMET_SHIELD_TABLE = [
  {range:[1,13], name:"Nenhum", armor:0, slots:0},
  {range:[14,16], name:"Elmo", armor:1, slots:1},
  {range:[17,19], name:"Escudo", armor:1, slots:1},
  {range:[20,20], name:"Elmo & Escudo", armor:2, slots:2}
];

const WEAPON_TABLE = [
  {range:[1,5], items:[{name:"Adaga", damage:"d6", slots:1},{name:"Porrete", damage:"d6", slots:1},{name:"Cajado", damage:"d6", slots:1}], pickOne:true},
  {range:[6,14], items:[{name:"Espada", damage:"d8", slots:1},{name:"Maça", damage:"d8", slots:1},{name:"Machado", damage:"d8", slots:1}], pickOne:true},
  {range:[15,19], items:[{name:"Arco Longo", damage:"d8", slots:1, bulky:true},{name:"Besta", damage:"d10", slots:1, bulky:true},{name:"Funda", damage:"d6", slots:1}], pickOne:true},
  {range:[20,20], items:[{name:"Alabarda", damage:"d10", slots:1, bulky:true},{name:"Martelo de Guerra", damage:"d10", slots:1, bulky:true},{name:"Espada Grande", damage:"d10", slots:1, bulky:true}], pickOne:true}
];

const EXPEDITION_GEAR = [
  "Veneno","Sedativo","Bastão (3m)","Bandagens (3 usos)","Lanterna","Carrinho (4 espaços, volumoso)",
  "Corda (12m)","Corrente","Ferramentas de Ladrão","Luneta","Óleo Inflamável","Pederneira",
  "Picareta","Gancho","Tocha","Saco Grande","Armadilha Grande","Algemas",
  "Amuleto de Proteção","Antitoxina"
];

const TOOLS = [
  "Cinzel","Óleo Inflamável","Giz","Panelas","Broca (manual)","Pé de cabra","Vara de pesca","Graxa",
  "Martelo","Ampulheta","Pregos","Rede","Serra","Pá","Pinças","Garrafa",
  "Lixa de Metal","Pinos","Selante","Sabão"
];

const TRINKETS = [
  "Baralho","Dados","Joias Falsas","Incenso","Instrumento Musical","Bola de gude","Espelho",
  "Pena e Tinta","Barbante","Esponja","Apito","Perfume","Corneta","Lente","Piche",
  "Sal","Sineta","Tinta","Jogo de Chá","Bugiganga"
];

const BONUS_ITEM_TABLE = [
  {range:[1,5], type:"tool_or_trinket"},
  {range:[6,12], type:"expedition"},
  {range:[13,17], type:"armor_or_weapon"},
  {range:[18,20], type:"spellbook"}
];

// ============================================
// DICE UTILITIES
// ============================================
function roll(sides) { return Math.floor(Math.random() * sides) + 1; }
function roll3d6() { return roll(6) + roll(6) + roll(6); }
function rollD20() { return roll(20); }
function rollD100() { return roll(100); }
function rollD10() { return roll(10); }
function rollD6() { return roll(6); }

function getFromTable(table, rollVal) {
  return table.find(e => rollVal >= e.range[0] && rollVal <= e.range[1]);
}

// ============================================
// CHARACTER GENERATION
// ============================================
function generateCharacter() {
  const genderRoll = roll(2);
  const isFemale = genderRoll === 1;
  const firstName = isFemale ? FEMALE_NAMES[rollD20()-1] : MALE_NAMES[rollD20()-1];
  const surname = SURNAMES[rollD20()-1];
  
  const forVal = roll3d6();
  const desVal = roll3d6();
  const vonVal = roll3d6();
  const hp = rollD6();
  const age = roll(20) + roll(20) + 10;
  const silver = roll3d6();
  
  const background = BACKGROUNDS[rollD20()-1];
  
  const traits = {
    physique: PHYSIQUE[rollD10()-1],
    skin: SKIN[rollD10()-1],
    hair: HAIR[rollD10()-1],
    face: FACE[rollD10()-1],
    speech: SPEECH[rollD10()-1],
    clothing: CLOTHING[rollD10()-1],
    virtue: VIRTUE[rollD10()-1],
    vice: VICE[rollD10()-1],
    reputation: REPUTATION[rollD10()-1],
    misfortune: MISFORTUNE[rollD10()-1],
  };

  // Equipment
  const armorRoll = rollD20();
  const armorEntry = getFromTable(ARMOR_TABLE, armorRoll);
  const hsRoll = rollD20();
  const hsEntry = getFromTable(HELMET_SHIELD_TABLE, hsRoll);
  const weaponRoll = rollD20();
  const weaponEntry = getFromTable(WEAPON_TABLE, weaponRoll);
  const weapon = weaponEntry.items[Math.floor(Math.random() * weaponEntry.items.length)];

  const bonusRoll = rollD20();
  const bonusEntry = getFromTable(BONUS_ITEM_TABLE, bonusRoll);
  let bonusItem = null;
  let spellbook = null;

  if (bonusEntry.type === "tool_or_trinket") {
    const combined = [...TOOLS, ...TRINKETS];
    bonusItem = combined[Math.floor(Math.random() * combined.length)];
  } else if (bonusEntry.type === "expedition") {
    bonusItem = EXPEDITION_GEAR[Math.floor(Math.random() * EXPEDITION_GEAR.length)];
  } else if (bonusEntry.type === "armor_or_weapon") {
    const extraWeapons = ["Adaga (d6)","Espada (d8)","Arco Longo (d8)","Maça (d8)"];
    bonusItem = extraWeapons[Math.floor(Math.random() * extraWeapons.length)];
  } else if (bonusEntry.type === "spellbook") {
    spellbook = SPELLS[rollD100()-1];
  }

  const inventory = [];
  inventory.push("Rações (3 dias)");
  inventory.push("Tocha");
  if (armorEntry.name !== "Nenhuma") inventory.push(`${armorEntry.name} (${armorEntry.armor} Arm.${armorEntry.bulky?" volumoso":""})`);
  if (hsEntry.name !== "Nenhum") inventory.push(`${hsEntry.name} (+${hsEntry.armor} Arm.)`);
  inventory.push(`${weapon.name} (${weapon.damage}${weapon.bulky?" volumoso":""})`);
  if (bonusItem) inventory.push(bonusItem);
  if (spellbook) inventory.push(`Livro de Feitiço: ${spellbook}`);

  return {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2,4),
    name: `${firstName} ${surname}`,
    gender: isFemale ? "F" : "M",
    age,
    background,
    attributes: { for: forVal, des: desVal, von: vonVal },
    hp,
    maxHp: hp,
    armor: armorEntry.armor + hsEntry.armor,
    silver,
    traits,
    inventory,
    spellbook,
    lore: null,
    createdAt: new Date().toISOString(),
  };
}

function generateMonster() {
  const names = ["Sombra Raiz","Golem de Ossos","Verme do Abismo","Espírito da Névoa","Troll das Cinzas","Arauto Sombrio","Lobo Espectral","Harpia Decaída","Serpente Arcana","Golem de Pedra","Elemental de Lama","Esqueleto Guardião","Fantasma Faminto","Fungo Ambulante","Gárgula Menor"];
  const nm = names[Math.floor(Math.random()*names.length)];
  const hpM = roll(6) + roll(6) + roll(6);
  const forM = roll3d6();
  const desM = roll3d6();
  const vonM = roll3d6();
  const armM = roll(2) - 1;
  const attacks = ["garras (d6)","mordida (d8)","tentáculos (d6+d6)","golpe (d10)","rajada sombria (d8, rajada)","cuspe ácido (d6)","esmagamento (d10, volumoso)"];
  const atk = attacks[Math.floor(Math.random()*attacks.length)];
  return { name:nm, hp:hpM, for:forM, des:desM, von:vonM, armor:armM, attack:atk, lore:null, id: Date.now().toString(36) };
}

// ============================================
// STYLES
// ============================================
const fonts = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=MedievalSharp&display=swap');
`;

// ============================================
// MAIN APP COMPONENT
// ============================================
export default function CairnApp() {

const [userId, setUserId] = useState(null);

useEffect(() => {
  loginAnonimo().then(uid => {
    if (uid) {
      setUserId(uid);
      // Carregar dados do jogador
      carregarDados(uid);
    }
  });
}, []);

async function carregarDados(uid) {
  try {
    const docRef = doc(db, "jogadores", uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const dados = snap.data();
      if (dados.credits !== undefined) setCredits(dados.credits);
      if (dados.characters) setSavedChars(dados.characters);
    }
  } catch(e) { console.error(e); }
}

async function salvarNoFirebase(chars, creds) {
  if (!userId) return;
  try {
    await setDoc(doc(db, "jogadores", userId), {
      credits: creds,
      characters: chars,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch(e) { console.error(e); }
}

  const [screen, setScreen] = useState("home");
  const [character, setCharacter] = useState(null);
  const [savedChars, setSavedChars] = useState([]);
  const [credits, setCredits] = useState(5);
  const [monster, setMonster] = useState(null);
  const [swapMode, setSwapMode] = useState(false);
  const [swapFirst, setSwapFirst] = useState(null);
  const [loreLoading, setLoreLoading] = useState(false);
  const [monsterLoreLoading, setMonsterLoreLoading] = useState(false);
  const [diceAnim, setDiceAnim] = useState(false);
  const [toast, setToast] = useState(null);

  // Load from storage
  useEffect(() => {
    (async () => {
      try {
        const sc = await window.storage.get("cairn-saved-chars");
        if (sc) setSavedChars(JSON.parse(sc.value));
      } catch(e) {}
      try {
        const cr = await window.storage.get("cairn-credits");
        if (cr) setCredits(parseInt(cr.value));
      } catch(e) {}
    })();
  }, []);

  const saveCredits = async (val) => {
  setCredits(val);
  salvarNoFirebase(savedChars, val);
};

  const saveChars = async (chars) => {
  setSavedChars(chars);
  salvarNoFirebase(chars, credits);
};

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleGenerate = () => {
    setDiceAnim(true);
    setTimeout(() => {
      const c = generateCharacter();
      setCharacter(c);
      setSwapMode(false);
      setSwapFirst(null);
      setDiceAnim(false);
      setScreen("sheet");
    }, 600);
  };

  const handleReroll = (field) => {
    if (credits <= 0) { showToast("Sem créditos de reroll!"); return; }
    const c = {...character};
    if (field === "attributes") {
      c.attributes = { for: roll3d6(), des: roll3d6(), von: roll3d6() };
    } else if (field === "hp") {
      const nh = rollD6(); c.hp = nh; c.maxHp = nh;
    } else if (field === "background") {
      c.background = BACKGROUNDS[rollD20()-1];
    } else if (field === "traits") {
      c.traits = {
        physique: PHYSIQUE[rollD10()-1], skin: SKIN[rollD10()-1], hair: HAIR[rollD10()-1],
        face: FACE[rollD10()-1], speech: SPEECH[rollD10()-1], clothing: CLOTHING[rollD10()-1],
        virtue: VIRTUE[rollD10()-1], vice: VICE[rollD10()-1], reputation: REPUTATION[rollD10()-1],
        misfortune: MISFORTUNE[rollD10()-1],
      };
    }
    setCharacter(c);
    saveCredits(credits - 1);
    showToast("Reroll usado! (-1 crédito)");
  };

  const handleSwapAttributes = (attr) => {
    if (!swapFirst) { setSwapFirst(attr); return; }
    if (swapFirst === attr) { setSwapFirst(null); return; }
    const c = {...character, attributes:{...character.attributes}};
    const tmp = c.attributes[swapFirst];
    c.attributes[swapFirst] = c.attributes[attr];
    c.attributes[attr] = tmp;
    setCharacter(c);
    setSwapMode(false);
    setSwapFirst(null);
    showToast(`${swapFirst.toUpperCase()} e ${attr.toUpperCase()} trocados!`);
  };

  const handleSaveChar = () => {
    if (!character) return;
    const updated = [...savedChars.filter(c=>c.id!==character.id), character];
    saveChars(updated);
    showToast("Personagem salvo!");
  };

  const handleDeleteChar = (id) => {
    saveChars(savedChars.filter(c=>c.id!==id));
    showToast("Personagem removido.");
  };

  const handleGenerateLore = async () => {
    if (!character) return;
    setLoreLoading(true);
    try {
      const prompt = `Você é um narrador de dark fantasy em português brasileiro. Gere exatamente 6 frases curtas e evocativas de lore/história pessoal para este personagem de RPG Cairn:
Nome: ${character.name}, Idade: ${character.age}, Antecedente: ${character.background}.
Traços: Físico ${character.traits.physique}, Pele ${character.traits.skin}, Cabelo ${character.traits.hair}, Rosto ${character.traits.face}, Fala ${character.traits.speech}, Roupa ${character.traits.clothing}, Virtude ${character.traits.virtue}, Vício ${character.traits.vice}, Reputação ${character.traits.reputation}, Infortúnio ${character.traits.misfortune}.
FOR ${character.attributes.for}, DES ${character.attributes.des}, VON ${character.attributes.von}, PG ${character.hp}.
${character.spellbook ? "Possui o feitiço: "+character.spellbook : "Sem feitiços."}
Responda APENAS com as 6 frases, uma por linha, sem numeração. Tom sombrio e misterioso.`;

      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          messages:[{role:"user",content:prompt}]
        })
      });
      const data = await resp.json();
      const text = data.content?.map(b=>b.text||"").join("\n") || "Lore não disponível.";
      setCharacter({...character, lore: text});
    } catch(e) {
      setCharacter({...character, lore: "Erro ao gerar lore. Tente novamente."});
    }
    setLoreLoading(false);
  };

  const handleMonsterLore = async () => {
    if (!monster) return;
    setMonsterLoreLoading(true);
    try {
      const prompt = `Você é um narrador de dark fantasy em português brasileiro. Gere exatamente 4 frases de lore sombria para este monstro de RPG Cairn:
Nome: ${monster.name}. PG ${monster.hp}, FOR ${monster.for}, DES ${monster.des}, VON ${monster.von}, Armadura ${monster.armor}, Ataque: ${monster.attack}.
Responda APENAS com as 4 frases, uma por linha, sem numeração.`;
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:500,
          messages:[{role:"user",content:prompt}]
        })
      });
      const data = await resp.json();
      const text = data.content?.map(b=>b.text||"").join("\n") || "Lore não disponível.";
      setMonster({...monster, lore: text});
    } catch(e) {
      setMonster({...monster, lore: "Erro ao gerar lore."});
    }
    setMonsterLoreLoading(false);
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div style={styles.app}>
      <style>{fonts}{cssAnimations}</style>

      {/* TOAST */}
      {toast && <div style={styles.toast}>{toast}</div>}

      {/* HEADER */}
      <header style={styles.header} onClick={()=>setScreen("home")}>
        <div style={styles.headerInner}>
          <h1 style={styles.logo}>Cairn</h1>
          <p style={styles.subtitle}>Gerador de Personagens · 1e</p>
        </div>
        <div style={styles.creditBadge}>
          <span style={styles.creditIcon}>⬡</span>
          <span style={styles.creditNum}>{credits}</span>
        </div>
      </header>

      {/* HOME */}
      {screen === "home" && (
        <div style={styles.homeContainer}>
          <div style={styles.heroSection}>
            <div style={styles.runeCircle}>⛧</div>
            <p style={styles.heroText}>
              Explore a Vastidão, as Florestas e as Masmorras sombrias.
              Gere personagens fiéis ao sistema Cairn 1e.
            </p>
          </div>
          <div style={styles.menuGrid}>
            <button style={styles.menuBtn} onClick={handleGenerate}>
              <span style={styles.menuIcon}>🎲</span>
              <span style={styles.menuLabel}>Gerar Personagem</span>
            </button>
            <button style={styles.menuBtn} onClick={()=>{setMonster(generateMonster());setScreen("monster");}}>
              <span style={styles.menuIcon}>🐉</span>
              <span style={styles.menuLabel}>Gerar Monstro</span>
            </button>
            <button style={styles.menuBtn} onClick={()=>setScreen("saved")}>
              <span style={styles.menuIcon}>📜</span>
              <span style={styles.menuLabel}>Fichas Salvas</span>
              {savedChars.length > 0 && <span style={styles.badge}>{savedChars.length}</span>}
            </button>
            <button style={styles.menuBtn} onClick={()=>setScreen("rules")}>
              <span style={styles.menuIcon}>📖</span>
              <span style={styles.menuLabel}>Regras Rápidas</span>
            </button>
            <button style={styles.menuBtn} onClick={()=>setScreen("credits_mgr")}>
              <span style={styles.menuIcon}>⬡</span>
              <span style={styles.menuLabel}>Créditos</span>
            </button>
          </div>
          <p style={styles.footerNote}>Cairn por Yochai Gal · Tradução Rafa Arruda · CC-BY-SA 4.0</p>
        </div>
      )}

      {/* DICE ANIMATION */}
      {diceAnim && (
        <div style={styles.diceOverlay}>
          <div style={styles.diceSpinner}>🎲</div>
          <p style={styles.diceText}>Rolando os dados...</p>
        </div>
      )}

      {/* CHARACTER SHEET */}
      {screen === "sheet" && character && (
        <div style={styles.sheetContainer}>
          <div style={styles.sheetHeader}>
            <h2 style={styles.charName}>{character.name}</h2>
            <p style={styles.charMeta}>{character.gender==="F"?"♀":"♂"} · {character.age} anos · {character.background}</p>
          </div>

          {/* ATTRIBUTES */}
          <div style={styles.section}>
            <div style={styles.sectionHead}>
              <h3 style={styles.sectionTitle}>Atributos</h3>
              <div style={{display:"flex",gap:6}}>
                <button style={styles.smallBtn} onClick={()=>{setSwapMode(!swapMode);setSwapFirst(null);}}>
                  {swapMode?"Cancelar":"⇄ Trocar"}
                </button>
                <button style={styles.smallBtn} onClick={()=>handleReroll("attributes")}>↻ Reroll</button>
              </div>
            </div>
            {swapMode && <p style={styles.swapHint}>Toque em dois atributos para trocá-los</p>}
            <div style={styles.attrGrid}>
              {[["for","FOR","Força"],["des","DES","Destreza"],["von","VON","Vontade"]].map(([k,label,full])=>(
                <button key={k} style={{...styles.attrCard, ...(swapFirst===k?styles.attrSelected:{}), cursor:swapMode?"pointer":"default"}}
                  onClick={()=>swapMode && handleSwapAttributes(k)} disabled={!swapMode}>
                  <span style={styles.attrLabel}>{label}</span>
                  <span style={styles.attrVal}>{character.attributes[k]}</span>
                  <span style={styles.attrFull}>{full}</span>
                </button>
              ))}
            </div>
          </div>

          {/* HP & ARMOR */}
          <div style={styles.section}>
            <div style={styles.rowBetween}>
              <div style={styles.statBox}>
                <span style={styles.statLabel}>Guarda (PG)</span>
                <span style={styles.statVal}>{character.hp}</span>
                <button style={styles.tinyBtn} onClick={()=>handleReroll("hp")}>↻</button>
              </div>
              <div style={styles.statBox}>
                <span style={styles.statLabel}>Armadura</span>
                <span style={styles.statVal}>{character.armor}</span>
              </div>
              <div style={styles.statBox}>
                <span style={styles.statLabel}>Prata (PP)</span>
                <span style={styles.statVal}>{character.silver}</span>
              </div>
            </div>
          </div>

          {/* TRAITS */}
          <div style={styles.section}>
            <div style={styles.sectionHead}>
              <h3 style={styles.sectionTitle}>Traços</h3>
              <button style={styles.smallBtn} onClick={()=>handleReroll("traits")}>↻ Reroll</button>
            </div>
            <div style={styles.traitsGrid}>
              {[
                ["Físico", character.traits.physique],["Pele", character.traits.skin],
                ["Cabelo", character.traits.hair],["Rosto", character.traits.face],
                ["Fala", character.traits.speech],["Roupa", character.traits.clothing],
                ["Virtude", character.traits.virtue],["Vício", character.traits.vice],
                ["Reputação", character.traits.reputation],["Infortúnio", character.traits.misfortune],
              ].map(([l,v])=>(
                <div key={l} style={styles.traitItem}>
                  <span style={styles.traitLabel}>{l}</span>
                  <span style={styles.traitVal}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* BACKGROUND */}
          <div style={styles.section}>
            <div style={styles.sectionHead}>
              <h3 style={styles.sectionTitle}>Antecedente</h3>
              <button style={styles.smallBtn} onClick={()=>handleReroll("background")}>↻ Reroll</button>
            </div>
            <p style={styles.bgText}>{character.background}</p>
          </div>

          {/* INVENTORY */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Inventário ({character.inventory.length}/10 slots)</h3>
            <div style={styles.invGrid}>
              {Array.from({length:10}).map((_,i)=>(
                <div key={i} style={{...styles.invSlot, ...(character.inventory[i]?styles.invFilled:styles.invEmpty)}}>
                  <span style={styles.invNum}>{i+1}</span>
                  <span style={styles.invItem}>{character.inventory[i] || "—"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* LORE */}
          <div style={styles.section}>
            <div style={styles.sectionHead}>
              <h3 style={styles.sectionTitle}>Lore (IA)</h3>
              <button style={{...styles.smallBtn, ...styles.aiBtn}} onClick={handleGenerateLore} disabled={loreLoading}>
                {loreLoading ? "Gerando..." : "✦ Gerar Lore"}
              </button>
            </div>
            {character.lore ? (
              <div style={styles.loreBox}>
                {character.lore.split("\n").filter(l=>l.trim()).map((line,i)=>(
                  <p key={i} style={styles.loreLine}>{line}</p>
                ))}
              </div>
            ) : (
              <p style={styles.loreHint}>Clique para gerar a história deste personagem com IA</p>
            )}
          </div>

          {/* ACTIONS */}
          <div style={styles.actionRow}>
            <button style={styles.actionBtn} onClick={handleSaveChar}>💾 Salvar</button>
            <button style={styles.actionBtn} onClick={handleGenerate}>🎲 Novo</button>
            <button style={{...styles.actionBtn, ...styles.backBtn}} onClick={()=>setScreen("home")}>← Voltar</button>
          </div>
        </div>
      )}

      {/* MONSTER */}
      {screen === "monster" && monster && (
        <div style={styles.sheetContainer}>
          <div style={{...styles.sheetHeader, background:"linear-gradient(135deg, #3a0a0a 0%, #1a0505 100%)"}}>
            <h2 style={styles.charName}>{monster.name}</h2>
            <p style={styles.charMeta}>Criatura · Cairn</p>
          </div>
          <div style={styles.section}>
            <div style={styles.attrGrid}>
              <div style={styles.attrCard}><span style={styles.attrLabel}>PG</span><span style={styles.attrVal}>{monster.hp}</span></div>
              <div style={styles.attrCard}><span style={styles.attrLabel}>ARM</span><span style={styles.attrVal}>{monster.armor}</span></div>
              <div style={styles.attrCard}><span style={styles.attrLabel}>FOR</span><span style={styles.attrVal}>{monster.for}</span></div>
              <div style={styles.attrCard}><span style={styles.attrLabel}>DES</span><span style={styles.attrVal}>{monster.des}</span></div>
              <div style={styles.attrCard}><span style={styles.attrLabel}>VON</span><span style={styles.attrVal}>{monster.von}</span></div>
            </div>
            <p style={{...styles.bgText, marginTop:12}}>Ataque: {monster.attack}</p>
          </div>
          <div style={styles.section}>
            <div style={styles.sectionHead}>
              <h3 style={styles.sectionTitle}>Lore do Monstro</h3>
              <button style={{...styles.smallBtn,...styles.aiBtn}} onClick={handleMonsterLore} disabled={monsterLoreLoading}>
                {monsterLoreLoading?"Gerando...":"✦ Gerar Lore"}
              </button>
            </div>
            {monster.lore ? (
              <div style={styles.loreBox}>{monster.lore.split("\n").filter(l=>l.trim()).map((l,i)=>(<p key={i} style={styles.loreLine}>{l}</p>))}</div>
            ) : <p style={styles.loreHint}>Gere a lore sombria desta criatura</p>}
          </div>
          <div style={styles.actionRow}>
            <button style={styles.actionBtn} onClick={()=>{setMonster(generateMonster());}}>🐉 Novo Monstro</button>
            <button style={{...styles.actionBtn,...styles.backBtn}} onClick={()=>setScreen("home")}>← Voltar</button>
          </div>
        </div>
      )}

      {/* SAVED */}
      {screen === "saved" && (
        <div style={styles.sheetContainer}>
          <h2 style={styles.pageTitle}>Fichas Salvas</h2>
          {savedChars.length === 0 ? (
            <p style={styles.emptyText}>Nenhum personagem salvo ainda.</p>
          ) : (
            savedChars.map(c=>(
              <div key={c.id} style={styles.savedCard}>
                <div style={styles.savedInfo} onClick={()=>{setCharacter(c);setScreen("sheet");}}>
                  <strong style={styles.savedName}>{c.name}</strong>
                  <span style={styles.savedMeta}>{c.background} · FOR {c.attributes.for} DES {c.attributes.des} VON {c.attributes.von} · PG {c.hp}</span>
                </div>
                <button style={styles.deleteBtn} onClick={()=>handleDeleteChar(c.id)}>✕</button>
              </div>
            ))
          )}
          <button style={{...styles.actionBtn,...styles.backBtn, marginTop:20}} onClick={()=>setScreen("home")}>← Voltar</button>
        </div>
      )}

      {/* CREDITS MANAGER */}
      {screen === "credits_mgr" && (
        <div style={styles.sheetContainer}>
          <h2 style={styles.pageTitle}>Gerenciar Créditos</h2>
          <div style={styles.creditCenter}>
            <div style={styles.bigCredit}>
              <span style={styles.creditIcon2}>⬡</span>
              <span style={styles.bigCreditNum}>{credits}</span>
            </div>
            <p style={styles.creditExplain}>Cada reroll consome 1 crédito. O Guardião pode adicionar créditos manualmente.</p>
            <div style={{display:"flex",gap:10,marginTop:16,flexWrap:"wrap",justifyContent:"center"}}>
              <button style={styles.creditBtn} onClick={()=>saveCredits(credits+1)}>+1</button>
              <button style={styles.creditBtn} onClick={()=>saveCredits(credits+5)}>+5</button>
              <button style={styles.creditBtn} onClick={()=>saveCredits(credits+10)}>+10</button>
              <button style={{...styles.creditBtn,...styles.creditBtnDanger}} onClick={()=>saveCredits(0)}>Zerar</button>
              <button style={{...styles.creditBtn,...styles.creditBtnReset}} onClick={()=>saveCredits(5)}>Reset (5)</button>
            </div>
          </div>
          <button style={{...styles.actionBtn,...styles.backBtn, marginTop:20}} onClick={()=>setScreen("home")}>← Voltar</button>
        </div>
      )}

      {/* RULES */}
      {screen === "rules" && (
        <div style={styles.sheetContainer}>
          <h2 style={styles.pageTitle}>Resumo das Regras</h2>
          <div style={styles.rulesContent}>
            <RuleBlock title="Atributos" text="FOR (Força), DES (Destreza), VON (Vontade). Rolados com 3d6 em ordem. Pode-se trocar dois resultados." />
            <RuleBlock title="Teste de Atributo" text="Role d20 ≤ valor do atributo = sucesso. 1 é sempre sucesso, 20 é sempre falha." />
            <RuleBlock title="Pontos de Guarda (PG)" text="Capacidade de evitar dano. Rolado com 1d6. Recupera-se com descanso breve fora de combate." />
            <RuleBlock title="Inventário" text="10 slots: 6 mochila, 2 corpo, 2 mãos. Itens volumosos = 2 slots. Inventário cheio = 0 PG." />
            <RuleBlock title="Combate" text="Role dano da arma, subtraia armadura do alvo, aplique ao PG. Sem rolagem de ataque. PG 0 exato = Tabela de Cicatrizes. PG abaixo de 0 = dano na FOR + Teste de FOR para evitar Dano Crítico." />
            <RuleBlock title="Armadura" text="Máximo 3. Subtraída do dano recebido antes de aplicar ao PG." />
            <RuleBlock title="Feitiços" text="Livros de Feitiço ocupam 1 slot. Segurar com duas mãos e ler em voz alta. Causa 1 Fadiga." />
            <RuleBlock title="Sem Classes" text="Equipamentos e experiências definem seu personagem, não classes." />
            <RuleBlock title="Morte" text="FOR 0 = morte. DES 0 = paralisia. VON 0 = delírio." />
          </div>
          <button style={{...styles.actionBtn,...styles.backBtn, marginTop:20}} onClick={()=>setScreen("home")}>← Voltar</button>
        </div>
      )}
    </div>
  );
}

function RuleBlock({title, text}) {
  return (
    <div style={styles.ruleBlock}>
      <h4 style={styles.ruleTitle}>{title}</h4>
      <p style={styles.ruleText}>{text}</p>
    </div>
  );
}

// ============================================
// CSS ANIMATIONS
// ============================================
const cssAnimations = `
@keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(720deg)} }
@keyframes toastIn { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
@keyframes glow { 0%,100%{text-shadow:0 0 8px rgba(212,175,55,0.3)} 50%{text-shadow:0 0 20px rgba(212,175,55,0.7)} }
* { box-sizing: border-box; }
button { border:none; cursor:pointer; font-family:inherit; }
button:active { transform:scale(0.96); }
`;

// ============================================
// STYLES OBJECT
// ============================================
const c = {
  bg: "#0d0d0f",
  card: "#16161a",
  cardHover: "#1e1e24",
  border: "#2a2a32",
  gold: "#d4af37",
  goldDark: "#9a7b1a",
  goldLight: "#f0d060",
  text: "#e8e4dc",
  textMuted: "#8a8678",
  accent: "#c04030",
  green: "#4a9850",
  red: "#a03030",
};

const styles = {
  app: {
    fontFamily: "'Crimson Text', Georgia, serif",
    background: `linear-gradient(180deg, ${c.bg} 0%, #0a0a0c 100%)`,
    minHeight: "100vh",
    color: c.text,
    maxWidth: 480,
    margin: "0 auto",
    position: "relative",
  },
  // HEADER
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "16px 20px", borderBottom: `1px solid ${c.border}`,
    background: "linear-gradient(135deg, #1a1510 0%, #0d0d0f 100%)",
    cursor: "pointer", position: "sticky", top: 0, zIndex: 100,
  },
  headerInner: {},
  logo: {
    fontFamily: "'Cinzel', serif", fontSize: 28, fontWeight: 900, color: c.gold, margin: 0,
    letterSpacing: 4, animation: "glow 3s ease-in-out infinite",
  },
  subtitle: {
    fontFamily: "'Cinzel', serif", fontSize: 10, color: c.textMuted, margin: 0,
    letterSpacing: 3, textTransform: "uppercase",
  },
  creditBadge: {
    display: "flex", alignItems: "center", gap: 6,
    background: `linear-gradient(135deg, ${c.goldDark}33 0%, ${c.goldDark}11 100%)`,
    border: `1px solid ${c.goldDark}66`, borderRadius: 8, padding: "6px 12px",
  },
  creditIcon: { fontSize: 16, color: c.gold },
  creditNum: { fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 700, color: c.gold },

  // TOAST
  toast: {
    position: "fixed", top: 70, left: "50%", transform: "translateX(-50%)",
    background: c.gold, color: "#0d0d0f", padding: "10px 24px", borderRadius: 8,
    fontWeight: 700, fontSize: 14, zIndex: 999, animation: "toastIn 0.3s ease",
    boxShadow: `0 4px 20px ${c.gold}44`,
  },

  // HOME
  homeContainer: { padding: "24px 20px", animation: "fadeIn 0.4s ease" },
  heroSection: { textAlign: "center", marginBottom: 32 },
  runeCircle: {
    fontSize: 48, color: c.gold, margin: "0 auto 16px",
    width: 80, height: 80, borderRadius: "50%",
    border: `2px solid ${c.goldDark}`, display: "flex", alignItems: "center", justifyContent: "center",
    background: `radial-gradient(circle, ${c.goldDark}22 0%, transparent 70%)`,
  },
  heroText: { fontSize: 16, color: c.textMuted, lineHeight: 1.6, maxWidth: 320, margin: "0 auto", fontStyle: "italic" },
  menuGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 },
  menuBtn: {
    background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: "20px 12px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: c.text,
    transition: "all 0.2s", position: "relative",
  },
  menuIcon: { fontSize: 28 },
  menuLabel: { fontFamily: "'Cinzel', serif", fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" },
  badge: {
    position: "absolute", top: 8, right: 8,
    background: c.accent, color: "#fff", fontSize: 11, fontWeight: 700,
    width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
  },
  footerNote: { textAlign: "center", fontSize: 11, color: c.textMuted, marginTop: 12 },

  // DICE OVERLAY
  diceOverlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex",
    flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 200,
  },
  diceSpinner: { fontSize: 64, animation: "spin 0.6s ease-in-out" },
  diceText: { fontFamily: "'Cinzel', serif", fontSize: 16, color: c.gold, marginTop: 16 },

  // SHEET
  sheetContainer: { padding: "0 0 40px", animation: "fadeIn 0.4s ease" },
  sheetHeader: {
    background: "linear-gradient(135deg, #1a1510 0%, #0d0d0f 100%)",
    padding: "24px 20px 20px", borderBottom: `2px solid ${c.goldDark}44`,
  },
  charName: { fontFamily: "'Cinzel', serif", fontSize: 24, fontWeight: 900, color: c.gold, margin: 0 },
  charMeta: { fontSize: 14, color: c.textMuted, margin: "4px 0 0" },

  // SECTIONS
  section: { padding: "16px 20px", borderBottom: `1px solid ${c.border}11` },
  sectionHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { fontFamily: "'Cinzel', serif", fontSize: 14, fontWeight: 700, color: c.goldLight, margin: 0, letterSpacing: 2, textTransform: "uppercase" },

  // ATTRIBUTES
  attrGrid: { display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" },
  attrCard: {
    background: `linear-gradient(135deg, ${c.card} 0%, #1a1816 100%)`,
    border: `1px solid ${c.border}`, borderRadius: 10, padding: "12px 16px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 2, flex: "1 1 80px", minWidth: 80,
  },
  attrSelected: { border: `2px solid ${c.gold}`, boxShadow: `0 0 12px ${c.gold}44` },
  attrLabel: { fontFamily: "'Cinzel', serif", fontSize: 11, fontWeight: 700, color: c.gold, letterSpacing: 2 },
  attrVal: { fontSize: 28, fontWeight: 900, color: c.text, fontFamily: "'Cinzel', serif" },
  attrFull: { fontSize: 10, color: c.textMuted },

  swapHint: { fontSize: 12, color: c.gold, fontStyle: "italic", marginBottom: 8, textAlign: "center" },

  // STATS ROW
  rowBetween: { display: "flex", justifyContent: "space-around", gap: 10 },
  statBox: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 },
  statLabel: { fontSize: 11, color: c.textMuted, fontFamily: "'Cinzel', serif", letterSpacing: 1, textTransform: "uppercase" },
  statVal: { fontSize: 24, fontWeight: 900, color: c.text, fontFamily: "'Cinzel', serif" },

  // TRAITS
  traitsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 },
  traitItem: { display: "flex", flexDirection: "column", padding: "6px 8px", background: `${c.card}88`, borderRadius: 6, border: `1px solid ${c.border}33` },
  traitLabel: { fontSize: 10, color: c.goldDark, fontFamily: "'Cinzel', serif", letterSpacing: 1, textTransform: "uppercase" },
  traitVal: { fontSize: 14, color: c.text, fontWeight: 600 },

  bgText: { fontSize: 18, fontWeight: 700, color: c.gold, fontFamily: "'Cinzel', serif" },

  // INVENTORY
  invGrid: { display: "flex", flexDirection: "column", gap: 4 },
  invSlot: { display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 6, border: `1px solid ${c.border}33` },
  invFilled: { background: `${c.card}cc` },
  invEmpty: { background: `${c.bg}44`, opacity: 0.4 },
  invNum: { fontSize: 11, color: c.goldDark, fontWeight: 700, minWidth: 18, fontFamily: "'Cinzel', serif" },
  invItem: { fontSize: 14, color: c.text },

  // LORE
  loreBox: { background: `linear-gradient(135deg, #1a1814 0%, #12100d 100%)`, borderRadius: 10, padding: 16, border: `1px solid ${c.goldDark}33` },
  loreLine: { fontSize: 14, color: c.text, lineHeight: 1.7, margin: "0 0 8px", fontStyle: "italic" },
  loreHint: { fontSize: 13, color: c.textMuted, fontStyle: "italic" },

  // BUTTONS
  smallBtn: {
    background: `${c.goldDark}33`, color: c.gold, border: `1px solid ${c.goldDark}66`,
    borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 600,
    fontFamily: "'Cinzel', serif", letterSpacing: 1,
  },
  tinyBtn: {
    background: "transparent", color: c.goldDark, border: `1px solid ${c.goldDark}44`,
    borderRadius: 4, padding: "2px 6px", fontSize: 10, marginTop: 2,
  },
  aiBtn: { background: `linear-gradient(135deg, #2a1a3a 0%, #1a1028 100%)`, borderColor: "#6a4a9a66", color: "#c8a0f0" },
  actionRow: { display: "flex", gap: 10, padding: "16px 20px", flexWrap: "wrap", justifyContent: "center" },
  actionBtn: {
    background: `linear-gradient(135deg, ${c.goldDark} 0%, ${c.goldDark}cc 100%)`,
    color: "#0d0d0f", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 700,
    fontFamily: "'Cinzel', serif", letterSpacing: 1,
  },
  backBtn: { background: c.card, color: c.textMuted, border: `1px solid ${c.border}` },

  // SAVED
  pageTitle: { fontFamily: "'Cinzel', serif", fontSize: 20, fontWeight: 700, color: c.gold, padding: "20px 20px 12px", margin: 0, letterSpacing: 2 },
  emptyText: { fontSize: 14, color: c.textMuted, padding: "20px", fontStyle: "italic" },
  savedCard: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "12px 20px", borderBottom: `1px solid ${c.border}33`, cursor: "pointer",
  },
  savedInfo: { display: "flex", flexDirection: "column", gap: 2 },
  savedName: { fontSize: 16, color: c.gold, fontFamily: "'Cinzel', serif" },
  savedMeta: { fontSize: 12, color: c.textMuted },
  deleteBtn: { background: `${c.red}33`, color: c.accent, border: "none", borderRadius: 6, padding: "6px 10px", fontSize: 14, fontWeight: 700 },

  // CREDITS MANAGER
  creditCenter: { display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 20px" },
  bigCredit: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 },
  creditIcon2: { fontSize: 40, color: c.gold },
  bigCreditNum: { fontFamily: "'Cinzel', serif", fontSize: 56, fontWeight: 900, color: c.gold },
  creditExplain: { fontSize: 14, color: c.textMuted, textAlign: "center", maxWidth: 300 },
  creditBtn: {
    background: `${c.goldDark}33`, color: c.gold, border: `1px solid ${c.goldDark}66`,
    borderRadius: 8, padding: "8px 18px", fontSize: 16, fontWeight: 700, fontFamily: "'Cinzel', serif",
  },
  creditBtnDanger: { background: `${c.red}33`, borderColor: `${c.red}66`, color: "#e06050" },
  creditBtnReset: { background: `${c.green}22`, borderColor: `${c.green}44`, color: "#6ac070" },

  // RULES
  rulesContent: { padding: "0 20px" },
  ruleBlock: { marginBottom: 16, padding: 12, background: `${c.card}88`, borderRadius: 8, borderLeft: `3px solid ${c.goldDark}` },
  ruleTitle: { fontFamily: "'Cinzel', serif", fontSize: 14, fontWeight: 700, color: c.gold, margin: "0 0 4px" },
  ruleText: { fontSize: 14, color: c.text, lineHeight: 1.6, margin: 0 },
};
