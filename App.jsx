import { useState, useEffect, useRef } from "react";

// ── Design Tokens ────────────────────────────────────────────────
const C = {
  bg:      "#f0ece4",
  bg2:     "#e8e3d9",
  bg3:     "#ddd8cc",
  panel:   "#ede9e0",
  border:  "#ccc5b4",
  border2: "#b8b0a0",
  ink:     "#3a332a",
  ink2:    "#6b6055",
  ink3:    "#9b9080",
  accent:  "#7a5c3c",
  accent2: "#5c7a5c",
  gold:    "#b8862a",
  rust:    "#a04030",
  spine_gate:    "#c4a882",
  spine_noted:   "#8aad8a",
  spine_channel: "#8ab0b0",
};

const GATE_NAMES = {
  1:"創意/自我表達",2:"接受/方向",3:"秩序/和諧",4:"公式化/解答",5:"等待/規律",
  6:"摩擦/和平",7:"領導力/角色",8:"凝聚力/展示",9:"專注/細節",10:"自愛/行為",
  11:"想法/和平",12:"謹慎/停頓",13:"傾聽者/夥伴",14:"力量/技能",15:"博愛/人類",
  16:"技能/熱忱",17:"意見/追隨",18:"糾正/裁判",19:"想要/需求",20:"現在/沉默",
  21:"掌控/叮嚀",22:"恩典/開放",23:"同化/分裂",24:"理性化/回歸",25:"精神/靈魂",
  26:"自我/魔術師",27:"滋養/關懷",28:"遊戲/鬥爭",29:"毅力/承諾",30:"感覺/欲望",
  31:"影響力/領導",32:"延續/持久",33:"隱退/隱私",34:"力量/蠻力",35:"變化/進步",
  36:"危機/黑暗",37:"友誼/家族",38:"鬥士/反對",39:"激煽/煽動",40:"孤獨/解放",
  41:"幻想/收縮",42:"成長/完成",43:"突破/洞見",44:"警覺/過去",45:"聚集/支配",
  46:"身體/機遇",47:"實現/決意",48:"深度/不足",49:"革命/原則",50:"價值觀/責任",
  51:"震驚/倡議",52:"靜止/保持",53:"發展/起始",54:"雄心/轉化",55:"精神/豐盛",
  56:"刺激/遊蕩",57:"直覺/溫柔",58:"喜悅/活躍",59:"性慾/透明",60:"接受/局限",
  61:"奧秘/真理",62:"細節/謹慎",63:"疑惑/懷疑",64:"混淆/完成",
};

const GATE_ICONS = {
  1:"🎨",2:"🧭",3:"🌱",4:"🧩",5:"⏳",6:"🤝",7:"👑",8:"✨",9:"🔬",10:"💗",
  11:"💡",12:"🤫",13:"👂",14:"⚡",15:"🌊",16:"🎯",17:"💭",18:"⚖️",19:"🫶",20:"🧘",
  21:"🛡️",22:"🌸",23:"🔀",24:"🔄",25:"🕊️",26:"🎩",27:"🌾",28:"🎲",29:"🔥",30:"🌙",
  31:"📣",32:"🛡️",33:"🤐",34:"💪",35:"📈",36:"🌑",37:"🏠",38:"⚔️",39:"🪄",40:"🏝️",
  41:"💭",42:"🍂",43:"💥",44:"🐅",45:"👸",46:"🌺",47:"🔮",48:"🌊",49:"🚩",50:"⚓",
  51:"⚡",52:"🗻",53:"🌰",54:"🪜",55:"🦋",56:"🎭",57:"👃",58:"🎉",59:"💞",60:"🎋",
  61:"🔭",62:"🗂️",63:"❓",64:"🌫️",
};

const CHANNELS = [
  {id:"1-8",g1:1,g2:8,name:"靈感的通道",c1:"G",c2:"喉嚨",icon:"🎨"},
  {id:"2-14",g1:2,g2:14,name:"脈動的通道",c1:"G",c2:"骶骨",icon:"💓"},
  {id:"3-60",g1:3,g2:60,name:"突變的通道",c1:"骶骨",c2:"根",icon:"🌪️"},
  {id:"4-63",g1:4,g2:63,name:"邏輯的通道",c1:"喉嚨",c2:"腦額",icon:"🧮"},
  {id:"5-15",g1:5,g2:15,name:"韻律的通道",c1:"骶骨",c2:"G",icon:"🎵"},
  {id:"6-59",g1:6,g2:59,name:"生育的通道",c1:"情感",c2:"骶骨",icon:"🌼"},
  {id:"7-31",g1:7,g2:31,name:"阿爾法的通道",c1:"G",c2:"喉嚨",icon:"🦁"},
  {id:"9-52",g1:9,g2:52,name:"專注的通道",c1:"骶骨",c2:"根",icon:"🎯"},
  {id:"10-20",g1:10,g2:20,name:"清醒的通道",c1:"G",c2:"喉嚨",icon:"🌅"},
  {id:"10-34",g1:10,g2:34,name:"探索的通道",c1:"G",c2:"骶骨",icon:"🧭"},
  {id:"10-57",g1:10,g2:57,name:"完美形式的通道",c1:"G",c2:"脾臟",icon:"💎"},
  {id:"11-56",g1:11,g2:56,name:"好奇的通道",c1:"阿吉那",c2:"喉嚨",icon:"🔍"},
  {id:"12-22",g1:12,g2:22,name:"開放的通道",c1:"喉嚨",c2:"情感",icon:"🌷"},
  {id:"13-33",g1:13,g2:33,name:"浪子的通道",c1:"G",c2:"喉嚨",icon:"📜"},
  {id:"16-48",g1:16,g2:48,name:"波長的通道",c1:"喉嚨",c2:"脾臟",icon:"📡"},
  {id:"17-62",g1:17,g2:62,name:"接受的通道",c1:"阿吉那",c2:"喉嚨",icon:"📋"},
  {id:"18-58",g1:18,g2:58,name:"裁判的通道",c1:"脾臟",c2:"根",icon:"⚖️"},
  {id:"19-49",g1:19,g2:49,name:"感受的通道",c1:"根",c2:"情感",icon:"🫂"},
  {id:"20-34",g1:20,g2:34,name:"魅力的通道",c1:"喉嚨",c2:"骶骨",icon:"🔥"},
  {id:"20-57",g1:20,g2:57,name:"腦波的通道",c1:"喉嚨",c2:"脾臟",icon:"🧠"},
  {id:"21-45",g1:21,g2:45,name:"金錢線",c1:"意志力",c2:"喉嚨",icon:"💰"},
  {id:"23-43",g1:23,g2:43,name:"結構的通道",c1:"喉嚨",c2:"阿吉那",icon:"🏗️"},
  {id:"24-61",g1:24,g2:61,name:"知識的通道",c1:"阿吉那",c2:"頭頂",icon:"📚"},
  {id:"25-51",g1:25,g2:51,name:"倡議的通道",c1:"G",c2:"意志力",icon:"⚡"},
  {id:"26-44",g1:26,g2:44,name:"投降的通道",c1:"意志力",c2:"脾臟",icon:"🙏"},
  {id:"27-50",g1:27,g2:50,name:"保護的通道",c1:"骶骨",c2:"脾臟",icon:"🛡️"},
  {id:"28-38",g1:28,g2:38,name:"鬥爭的通道",c1:"脾臟",c2:"根",icon:"⚔️"},
  {id:"29-46",g1:29,g2:46,name:"發現的通道",c1:"骶骨",c2:"G",icon:"🌟"},
  {id:"30-41",g1:30,g2:41,name:"認識的通道",c1:"情感",c2:"根",icon:"🌒"},
  {id:"32-54",g1:32,g2:54,name:"轉化的通道",c1:"脾臟",c2:"根",icon:"🦋"},
  {id:"33-13",g1:33,g2:13,name:"浪子的通道",c1:"喉嚨",c2:"G",icon:"📜"},
  {id:"34-57",g1:34,g2:57,name:"力量的通道",c1:"骶骨",c2:"脾臟",icon:"💪"},
  {id:"35-36",g1:35,g2:36,name:"短暫的通道",c1:"喉嚨",c2:"情感",icon:"🎢"},
  {id:"37-40",g1:37,g2:40,name:"社群的通道",c1:"情感",c2:"意志力",icon:"🏘️"},
  {id:"39-55",g1:39,g2:55,name:"情感的通道",c1:"根",c2:"情感",icon:"🌧️"},
  {id:"42-53",g1:42,g2:53,name:"成熟的通道",c1:"骶骨",c2:"根",icon:"🌳"},
  {id:"47-64",g1:47,g2:64,name:"抽象的通道",c1:"阿吉那",c2:"頭頂",icon:"🌌"},
];

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,5);
const today = () => new Date().toLocaleDateString("zh-TW",{year:"numeric",month:"2-digit",day:"2-digit"});
const hasContent = n => n?.entries?.length > 0;

// ── localStorage (works fully offline, no backend needed) ──────────
const STORE_KEY = "hd-notes-v2";
function loadFromStorage() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || "{}"); }
  catch { return {}; }
}
function saveToStorage(data) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch {}
}

const API_KEY_STORE = "hd-claude-api-key";
function getApiKey() { try { return localStorage.getItem(API_KEY_STORE) || ""; } catch { return ""; } }
function setApiKeyStorage(k) { try { localStorage.setItem(API_KEY_STORE, k); } catch {} }

function exportData(notes) {
  const blob = new Blob([JSON.stringify(notes, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `human-design-notes-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
}

function importData(e, saveNotes, showToast) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const imported = JSON.parse(ev.target.result);
      const current = loadFromStorage();
      const merged = { ...current, ...imported };
      saveNotes(merged);
      showToast("已匯入 ✓");
    } catch {
      showToast("匯入失敗：檔案格式錯誤");
    }
  };
  reader.readAsText(file);
  e.target.value = "";
}

// ══════════════════════════════════════════════════════════════════
export default function App() {
  const [notes, setNotes]         = useState({});
  const [tab, setTab]             = useState("gates");
  const [filter, setFilter]       = useState("all");
  const [search, setSearch]       = useState("");
  const [modal, setModal]         = useState(null);
  const [reviewKey, setReviewKey] = useState(null);
  const [rvFilter, setRvFilter]   = useState("all");
  const [rvSearch, setRvSearch]   = useState("");
  const [toast, setToast]         = useState(null);
  const [aiOpen, setAiOpen]       = useState(false);
  const toastRef = useRef(null);

  useEffect(() => { setNotes(loadFromStorage()); }, []);

  const showToast = msg => {
    setToast(msg);
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 2200);
  };

  const saveNotes = updated => { setNotes(updated); saveToStorage(updated); };

  const totalEntries = Object.values(notes).reduce((s,n) => s+(n.entries?.length||0), 0);
  const gNoted = Object.keys(notes).filter(k => k.startsWith("gate_") && hasContent(notes[k])).length;
  const cNoted = Object.keys(notes).filter(k => k.startsWith("channel_") && hasContent(notes[k])).length;

  return (
    <div style={{background:C.bg,minHeight:"100vh",color:C.ink,fontFamily:"'Noto Sans TC','PingFang TC',system-ui,sans-serif",fontSize:14}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        ::placeholder{color:${C.ink3}}
        textarea,input{font-family:inherit}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:${C.bg2}}
        ::-webkit-scrollbar-thumb{background:${C.border2};border-radius:3px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,80%,100%{opacity:.25;transform:scale(.85)}40%{opacity:1;transform:scale(1.1)}}
        .g-card{transition:box-shadow .18s,transform .18s}
        .g-card:hover{box-shadow:0 3px 14px rgba(90,70,40,.13);transform:translateY(-2px)}
        .tab-btn{transition:color .15s,border-color .15s}
        .filter-pill{transition:background .15s,color .15s,border-color .15s}
        .rv-row{transition:background .12s}
        .rv-row:hover{background:${C.bg3}}
        .action-btn{transition:background .15s,opacity .15s}
        .action-btn:hover{opacity:.75}
      `}</style>

      {/* Header */}
      <header style={{background:C.bg2,borderBottom:`1px solid ${C.border}`,padding:"14px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100,boxShadow:"0 1px 6px rgba(90,70,40,.07)"}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:34,height:34,background:`linear-gradient(135deg,${C.accent},${C.gold})`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,color:"#fff",flexShrink:0}}>⬡</div>
          <div>
            <div style={{fontFamily:"Georgia,'Noto Serif TC',serif",fontSize:18,color:C.ink,letterSpacing:.5}}>人類圖學習筆記</div>
            <div style={{fontSize:10,color:C.ink3,letterSpacing:1.2,textTransform:"uppercase",marginTop:1}}>Human Design Study Notes</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{fontSize:11,color:C.ink3,textAlign:"right",lineHeight:1.6}}>
            <div>{gNoted} 閘門 · {cNoted} 通道</div>
            <div>{totalEntries} 條筆記</div>
          </div>
          <button onClick={()=>exportData(notes)} title="匯出備份"
            style={{background:"transparent",border:`1px solid ${C.border}`,borderRadius:6,color:C.ink2,fontSize:11,padding:"6px 10px",cursor:"pointer"}}>
            匯出
          </button>
          <label title="匯入備份" style={{background:"transparent",border:`1px solid ${C.border}`,borderRadius:6,color:C.ink2,fontSize:11,padding:"6px 10px",cursor:"pointer"}}>
            匯入
            <input type="file" accept=".json" style={{display:"none"}} onChange={e=>importData(e,saveNotes,showToast)} />
          </label>
        </div>
      </header>

      {/* Nav */}
      <nav style={{background:C.bg2,borderBottom:`1px solid ${C.border}`,padding:"0 28px",display:"flex",gap:0,overflowX:"auto"}}>
        {[["gates","閘門 Gates"],["channels","通道 Channels"],["review","溫習 Review"]].map(([t,label])=>(
          <button key={t} className="tab-btn" onClick={()=>setTab(t)}
            style={{background:"none",border:"none",borderBottom:tab===t?`2px solid ${C.accent}`:"2px solid transparent",color:tab===t?C.accent:C.ink2,fontSize:13,fontWeight:tab===t?600:400,padding:"12px 18px",cursor:"pointer",letterSpacing:.3,whiteSpace:"nowrap"}}>
            {label}
          </button>
        ))}
      </nav>

      {/* Main */}
      {tab !== "review" ? (
        <div style={{maxWidth:1180,margin:"0 auto",padding:"22px 26px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:22}}>
            {[[gNoted,"/ 64","閘門已記錄"],[cNoted,"/ 36","通道已記錄"],[totalEntries,"","筆記總條數"],[gNoted+cNoted,"/ 100","已記錄項目"]].map(([n,sub,label],i)=>(
              <div key={i} style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:8,padding:"13px 16px",textAlign:"center",borderTop:`3px solid ${i<2?C.accent:C.gold}`}}>
                <div style={{fontFamily:"Georgia,serif",fontSize:24,color:C.accent,lineHeight:1,marginBottom:2}}>
                  {n}<span style={{fontSize:11,color:C.ink3,marginLeft:3}}>{sub}</span>
                </div>
                <div style={{fontSize:10,color:C.ink3,textTransform:"uppercase",letterSpacing:.8}}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap",alignItems:"center"}}>
            <div style={{flex:1,minWidth:200,position:"relative"}}>
              <span style={{position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:C.ink3,fontSize:13}}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="搜尋閘門、通道、書名、關鍵字…"
                style={{width:"100%",background:C.bg3,border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px 8px 32px",color:C.ink,fontSize:13,outline:"none"}} />
            </div>
            <div style={{display:"flex",gap:6}}>
              {[["all","全部"],["noted","已記錄 ✓"],["empty","未記錄"]].map(([f,label])=>(
                <button key={f} className="filter-pill" onClick={()=>setFilter(f)}
                  style={{background:filter===f?C.accent:"transparent",border:`1px solid ${filter===f?C.accent:C.border}`,borderRadius:20,color:filter===f?"#fff":C.ink2,fontSize:12,padding:"5px 13px",cursor:"pointer"}}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {tab==="gates" && (
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(175px,1fr))",gap:10}}>
              {Array.from({length:64},(_,i)=>i+1).filter(i=>{
                const key=`gate_${i}`,n=notes[key],hc=hasContent(n);
                if(filter==="noted"&&!hc) return false;
                if(filter==="empty"&&hc) return false;
                if(search){const b=`${i} ${GATE_NAMES[i]||""} ${(n?.entries||[]).map(e=>e.book+" "+e.note+" "+(e.tags||[]).join(" ")).join(" ")}`.toLowerCase();return b.includes(search.toLowerCase());}
                return true;
              }).map(i=>{
                const key=`gate_${i}`,n=notes[key],hc=hasContent(n),cnt=n?.entries?.length||0;
                const preview=n?.entries?.[cnt-1]?.note?.substring(0,50)||"";
                const spineColor = hc ? C.spine_noted : C.spine_gate;
                return (
                  <div key={i} className="g-card" onClick={()=>setModal({key})}
                    style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 13px 12px 0",cursor:"pointer",display:"flex",gap:0,overflow:"hidden",minHeight:90}}>
                    <div style={{width:4,background:spineColor,borderRadius:"4px 0 0 4px",flexShrink:0,marginRight:12,alignSelf:"stretch"}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:4,marginBottom:4}}>
                        <div style={{display:"flex",alignItems:"baseline",gap:6}}>
                          <span style={{fontSize:16}}>{GATE_ICONS[i]}</span>
                          <div style={{fontFamily:"Georgia,serif",fontSize:20,color:C.accent,lineHeight:1,opacity:hc?1:.7}}>{i}</div>
                        </div>
                        {hc&&<span style={{fontSize:10,padding:"2px 6px",borderRadius:8,background:"#dceadc",color:C.accent2,fontWeight:600,flexShrink:0}}>{cnt}條</span>}
                      </div>
                      <div style={{fontSize:11,color:C.ink2,lineHeight:1.45,marginBottom:3}}>{GATE_NAMES[i]}</div>
                      {preview&&<div style={{fontSize:10,color:C.ink3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{preview}…</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {tab==="channels" && (
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(215px,1fr))",gap:10}}>
              {CHANNELS.filter(c=>{
                const key=`channel_${c.id}`,n=notes[key],hc=hasContent(n);
                if(filter==="noted"&&!hc) return false;
                if(filter==="empty"&&hc) return false;
                if(search){const b=`${c.id} ${c.name} ${(n?.entries||[]).map(e=>e.book+" "+e.note).join(" ")}`.toLowerCase();return b.includes(search.toLowerCase());}
                return true;
              }).map(c=>{
                const key=`channel_${c.id}`,n=notes[key],hc=hasContent(n),cnt=n?.entries?.length||0;
                return (
                  <div key={c.id} className="g-card" onClick={()=>setModal({key})}
                    style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:8,padding:"12px 13px 12px 0",cursor:"pointer",display:"flex",gap:0,overflow:"hidden"}}>
                    <div style={{width:4,background:hc?C.spine_noted:C.spine_channel,borderRadius:"4px 0 0 4px",flexShrink:0,marginRight:12,alignSelf:"stretch"}}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"baseline",gap:6,marginBottom:3}}>
                        <span style={{fontSize:15}}>{c.icon}</span>
                        <div style={{fontFamily:"Georgia,serif",fontSize:16,color:C.accent2,lineHeight:1}}>{c.g1} — {c.g2}</div>
                      </div>
                      <div style={{fontSize:12,color:C.ink,marginBottom:2,lineHeight:1.4}}>{c.name}</div>
                      <div style={{fontSize:10,color:C.ink3}}>{c.c1} ↔ {c.c2}</div>
                      {hc&&<div style={{marginTop:6}}><span style={{fontSize:10,padding:"2px 7px",borderRadius:8,background:"#dceadc",color:C.accent2,fontWeight:600}}>{cnt} 條筆記</span></div>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <ReviewTab notes={notes} reviewKey={reviewKey} setReviewKey={setReviewKey}
          rvFilter={rvFilter} setRvFilter={setRvFilter} rvSearch={rvSearch} setRvSearch={setRvSearch}
          onEdit={key=>{ setModal({key}); setTab(key.startsWith("gate_")?"gates":"channels"); }} />
      )}

      {modal && (
        <NoteModal itemKey={modal.key} notes={notes} saveNotes={saveNotes}
          showToast={showToast} onClose={()=>setModal(null)} />
      )}

      <AiChat open={aiOpen} onToggle={()=>setAiOpen(o=>!o)} notes={notes} />

      {toast && (
        <div style={{position:"fixed",bottom:24,right:86,background:"#dceadc",border:`1px solid ${C.accent2}`,borderRadius:8,color:C.accent2,fontSize:13,padding:"9px 17px",zIndex:999,animation:"fadeUp .25s ease",fontWeight:600,boxShadow:"0 2px 12px rgba(0,0,0,.1)"}}>
          {toast}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// NOTE MODAL
// ══════════════════════════════════════════════════════════════════
function NoteModal({ itemKey, notes, saveNotes, showToast, onClose }) {
  const isGate = itemKey.startsWith("gate_");
  const num = isGate ? parseInt(itemKey.replace("gate_","")) : null;
  const ch  = isGate ? null : CHANNELS.find(c=>c.id===itemKey.replace("channel_",""));
  const title    = isGate ? `閘門 ${num}` : `通道 ${itemKey.replace("channel_","")}`;
  const subtitle = isGate ? GATE_NAMES[num]||"" : ch?.name||"";

  const [entries, setEntries]   = useState(notes[itemKey]?.entries || []);
  const [adding, setAdding]     = useState(false);
  const [editingId, setEditingId] = useState(null);

  const persist = newEntries => {
    const updated = {...notes};
    if(newEntries.length===0) delete updated[itemKey];
    else updated[itemKey] = {entries:newEntries};
    setEntries(newEntries);
    saveNotes(updated);
  };

  const addEntry    = e => { persist([...entries,{...e,id:uid(),date:today()}]); setAdding(false); showToast("已儲存 ✓"); };
  const updateEntry = (id,u) => { persist(entries.map(e=>e.id===id?{...e,...u}:e)); setEditingId(null); showToast("已修改 ✓"); };
  const deleteEntry = id => { if(!confirm("確定刪除這條筆記？"))return; persist(entries.filter(e=>e.id!==id)); showToast("已刪除"); };
  const clearAll    = () => { if(!confirm("確定清除全部筆記？"))return; persist([]); onClose(); showToast("已清除"); };

  return (
    <div onClick={e=>{if(e.target===e.currentTarget)onClose()}}
      style={{position:"fixed",inset:0,background:"rgba(50,40,30,.45)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:20,backdropFilter:"blur(3px)"}}>
      <div style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:12,width:"100%",maxWidth:680,maxHeight:"92vh",display:"flex",flexDirection:"column",overflow:"hidden",boxShadow:"0 8px 40px rgba(60,45,25,.18)"}}>

        <div style={{padding:"18px 24px 16px",borderBottom:`1px solid ${C.border}`,background:C.bg2,flexShrink:0,display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}>
          <div>
            <div style={{display:"flex",alignItems:"baseline",gap:10}}>
              <span style={{fontSize:26}}>{isGate?GATE_ICONS[num]:ch?.icon}</span>
              <div style={{fontFamily:"Georgia,serif",fontSize:30,color:C.accent,lineHeight:1}}>{title}</div>
              {!isGate&&ch&&<div style={{fontFamily:"Georgia,serif",fontSize:14,color:C.accent2}}>閘門 {ch.g1} ↔ {ch.g2}</div>}
            </div>
            <div style={{fontSize:13,color:C.ink2,marginTop:3}}>{subtitle}</div>
            {ch&&<div style={{fontSize:11,color:C.ink3,marginTop:2}}>{ch.c1} ↔ {ch.c2}</div>}
          </div>
          <button onClick={onClose} style={{background:"transparent",border:`1px solid ${C.border}`,borderRadius:6,color:C.ink2,fontSize:16,cursor:"pointer",padding:"3px 10px",lineHeight:1.5}}>✕</button>
        </div>

        <div style={{padding:"10px 22px",borderBottom:`1px solid ${C.border}`,background:C.bg2,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{fontSize:12,color:C.ink3}}>{entries.length ? `共 ${entries.length} 條筆記` : "尚無筆記"}</span>
          <button onClick={()=>{setAdding(true);setEditingId(null)}}
            style={{background:C.accent,border:"none",borderRadius:6,color:"#fff",fontSize:12,fontWeight:600,padding:"6px 14px",cursor:"pointer"}}>
            ＋ 新增筆記
          </button>
        </div>

        <div style={{overflowY:"auto",flex:1}}>
          {entries.length===0&&!adding&&(
            <div style={{padding:"44px 20px",textAlign:"center",color:C.ink3}}>
              <div style={{fontSize:34,marginBottom:10,opacity:.35}}>📖</div>
              <div style={{fontSize:13,lineHeight:1.6}}>還沒有筆記<br/>點上方「新增筆記」開始記錄</div>
            </div>
          )}
          {entries.map(e => (
            editingId===e.id
              ? <EntryForm key={e.id} initial={e} onSave={d=>updateEntry(e.id,d)} onCancel={()=>setEditingId(null)} isEdit />
              : <EntryView key={e.id} entry={e} onEdit={()=>{setEditingId(e.id);setAdding(false)}} onDelete={()=>deleteEntry(e.id)} />
          ))}
          {adding && <EntryForm onSave={addEntry} onCancel={()=>setAdding(false)} />}
        </div>

        <div style={{padding:"11px 22px",borderTop:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",background:C.bg2,flexShrink:0}}>
          <button onClick={clearAll} style={{background:"transparent",border:`1px solid ${C.rust}`,borderRadius:6,color:C.rust,fontSize:12,padding:"5px 10px",cursor:"pointer"}}>清除全部筆記</button>
          <button onClick={onClose} style={{background:"transparent",border:`1px solid ${C.border}`,borderRadius:6,color:C.ink2,fontSize:12,padding:"5px 12px",cursor:"pointer"}}>關閉</button>
        </div>
      </div>
    </div>
  );
}

function EntryView({ entry, onEdit, onDelete }) {
  return (
    <div style={{borderBottom:`1px solid ${C.border}`,padding:"16px 22px"}}>
      <div style={{fontSize:11,fontWeight:600,color:C.gold,marginBottom:7,display:"flex",alignItems:"center",gap:8}}>
        <span>📚</span><span>{entry.book||"未標注來源"}</span>
        <span style={{fontSize:10,color:C.ink3,marginLeft:"auto"}}>{entry.date||""}</span>
      </div>
      {entry.note&&<div style={{fontSize:14,color:C.ink,lineHeight:1.85,whiteSpace:"pre-wrap",marginBottom:8,fontFamily:"Georgia,'Noto Serif TC',serif"}}>{entry.note}</div>}
      {entry.tags?.length>0&&<div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8}}>
        {entry.tags.map((t,i)=><span key={i} style={{background:"#e8e0d4",border:`1px solid ${C.border}`,borderRadius:12,fontSize:10,color:C.accent,padding:"2px 9px"}}>#{t}</span>)}
      </div>}
      <div style={{display:"flex",gap:6,marginTop:6}}>
        <button className="action-btn" onClick={onEdit} style={{background:"transparent",border:`1px solid ${C.border2}`,borderRadius:6,color:C.ink2,fontSize:11,padding:"4px 10px",cursor:"pointer"}}>✏️ 修改</button>
        <button className="action-btn" onClick={onDelete} style={{background:"transparent",border:`1px solid ${C.rust}`,borderRadius:6,color:C.rust,fontSize:11,padding:"4px 10px",cursor:"pointer"}}>🗑 刪除</button>
      </div>
    </div>
  );
}

function EntryForm({ initial, onSave, onCancel, isEdit }) {
  const [book, setBook]       = useState(initial?.book||"");
  const [note, setNote]       = useState(initial?.note||"");
  const [tags, setTags]       = useState(initial?.tags||[]);
  const [tagInput, setTagInput] = useState("");

  const addTag = () => { const v=tagInput.trim(); if(v&&!tags.includes(v))setTags(t=>[...t,v]); setTagInput(""); };

  return (
    <div style={{borderBottom:`1px solid ${C.border}`,padding:"16px 22px",background:"#ece7de"}}>
      <div style={{fontSize:11,fontWeight:600,color:C.accent,letterSpacing:1,textTransform:"uppercase",marginBottom:12,display:"flex",alignItems:"center",gap:8}}>
        {isEdit?"修改筆記":"新增筆記"}<div style={{flex:1,height:1,background:C.border}}/>
      </div>
      <input value={book} onChange={e=>setBook(e.target.value)} placeholder="📚 書名 / 來源（可選）"
        style={{width:"100%",background:C.bg,border:`1px solid ${C.border}`,borderRadius:7,color:C.ink,fontSize:12,padding:"7px 11px",outline:"none",marginBottom:8}} />
      <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="寫下這本書對這個閘門 / 通道的詮釋、你的感悟…"
        style={{width:"100%",background:C.bg,border:`1px solid ${C.border}`,borderRadius:7,color:C.ink,fontSize:14,padding:"10px 12px",outline:"none",resize:"vertical",minHeight:110,lineHeight:1.8,marginBottom:8,fontFamily:"Georgia,'Noto Serif TC',serif"}} />
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:8}}>
        {tags.map((t,i)=>(
          <span key={i} style={{background:"#e8e0d4",border:`1px solid ${C.border}`,borderRadius:12,fontSize:11,color:C.accent,padding:"3px 9px",display:"flex",alignItems:"center",gap:4}}>
            #{t}<span onClick={()=>setTags(tg=>tg.filter((_,j)=>j!==i))} style={{color:C.ink3,cursor:"pointer",fontSize:10}}>×</span>
          </span>
        ))}
      </div>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        <input value={tagInput} onChange={e=>setTagInput(e.target.value)}
          onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addTag();}}}
          placeholder="加標籤後按 Enter…"
          style={{flex:1,background:C.bg,border:`1px solid ${C.border}`,borderRadius:6,color:C.ink,fontSize:12,padding:"5px 10px",outline:"none"}} />
        <button onClick={addTag} style={{background:"transparent",border:`1px solid ${C.border2}`,borderRadius:6,color:C.ink2,fontSize:12,padding:"5px 10px",cursor:"pointer"}}>+ 標籤</button>
      </div>
      <div style={{display:"flex",gap:7,justifyContent:"flex-end"}}>
        <button onClick={onCancel} style={{background:"transparent",border:`1px solid ${C.border}`,borderRadius:6,color:C.ink2,fontSize:12,padding:"6px 12px",cursor:"pointer"}}>取消</button>
        <button onClick={()=>{if(note.trim()||book.trim())onSave({book,note,tags})}}
          style={{background:C.accent,border:"none",borderRadius:6,color:"#fff",fontSize:12,fontWeight:600,padding:"6px 16px",cursor:"pointer"}}>
          {isEdit?"儲存修改":"儲存筆記"}
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// REVIEW TAB
// ══════════════════════════════════════════════════════════════════
function ReviewTab({ notes, reviewKey, setReviewKey, rvFilter, setRvFilter, rvSearch, setRvSearch, onEdit }) {
  const items = [];
  if(rvFilter!=="channels") {
    for(let i=1;i<=64;i++){
      const key=`gate_${i}`,n=notes[key];
      if(!hasContent(n))continue;
      if(rvSearch){const b=`${i} ${GATE_NAMES[i]||""} ${(n.entries||[]).map(e=>e.book+" "+e.note).join(" ")}`.toLowerCase();if(!b.includes(rvSearch.toLowerCase()))continue;}
      items.push({key,disp:String(i),name:GATE_NAMES[i]||"",cnt:n.entries.length,type:"gate",icon:GATE_ICONS[i]});
    }
  }
  if(rvFilter!=="gates") {
    CHANNELS.forEach(c=>{
      const key=`channel_${c.id}`,n=notes[key];
      if(!hasContent(n))return;
      if(rvSearch){const b=`${c.id} ${c.name} ${(n.entries||[]).map(e=>e.book+" "+e.note).join(" ")}`.toLowerCase();if(!b.includes(rvSearch.toLowerCase()))return;}
      items.push({key,disp:c.id,name:c.name,cnt:n.entries.length,type:"channel",icon:c.icon});
    });
  }

  const n       = reviewKey ? notes[reviewKey] : null;
  const isGate  = reviewKey?.startsWith("gate_");
  const gNum    = isGate ? parseInt(reviewKey.replace("gate_","")) : null;
  const ch      = reviewKey&&!isGate ? CHANNELS.find(c=>c.id===reviewKey.replace("channel_","")) : null;

  return (
    <div style={{maxWidth:1180,margin:"0 auto",padding:"18px 26px"}}>
      <div style={{display:"grid",gridTemplateColumns:"248px 1fr",border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden",height:"calc(100vh - 116px)",boxShadow:"0 2px 12px rgba(90,70,40,.07)"}}>

        <div style={{background:C.bg2,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{padding:"11px 10px",borderBottom:`1px solid ${C.border}`,position:"relative"}}>
            <span style={{position:"absolute",left:20,top:"50%",transform:"translateY(-50%)",color:C.ink3,fontSize:11}}>🔍</span>
            <input value={rvSearch} onChange={e=>setRvSearch(e.target.value)} placeholder="搜尋…"
              style={{width:"100%",background:C.bg3,border:`1px solid ${C.border}`,borderRadius:7,color:C.ink,fontSize:12,padding:"7px 10px 7px 28px",outline:"none"}} />
          </div>
          <div style={{display:"flex",borderBottom:`1px solid ${C.border}`}}>
            {[["all","全部"],["gates","閘門"],["channels","通道"]].map(([f,label])=>(
              <button key={f} onClick={()=>setRvFilter(f)}
                style={{flex:1,background:"none",border:"none",color:rvFilter===f?C.accent:C.ink3,fontSize:11,fontWeight:rvFilter===f?600:400,padding:"8px 4px",cursor:"pointer",borderBottom:rvFilter===f?`2px solid ${C.accent}`:"2px solid transparent"}}>
                {label}
              </button>
            ))}
          </div>
          <div style={{overflowY:"auto",flex:1}}>
            {items.length===0&&<div style={{padding:"44px 14px",textAlign:"center",color:C.ink3,fontSize:12}}>尚無筆記<br/><span style={{fontSize:11,display:"block",marginTop:4}}>去閘門或通道頁新增吧</span></div>}
            {items.map(it=>(
              <div key={it.key} className="rv-row" onClick={()=>setReviewKey(it.key)}
                style={{padding:"9px 14px",cursor:"pointer",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:9,background:reviewKey===it.key?C.bg3:"transparent",borderLeft:reviewKey===it.key?`3px solid ${C.accent}`:"3px solid transparent"}}>
                <span style={{fontSize:15,flexShrink:0}}>{it.icon}</span>
                <div style={{fontFamily:"Georgia,serif",fontSize:14,color:it.type==="channel"?C.accent2:C.accent,minWidth:24,flexShrink:0}}>{it.disp}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:11,color:C.ink,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{it.name}</div>
                  <div style={{fontSize:10,color:C.ink3,marginTop:1}}>{it.type==="gate"?"閘門":"通道"} · {it.cnt} 條</div>
                </div>
                <div style={{width:5,height:5,borderRadius:"50%",background:C.gold,flexShrink:0}}/>
              </div>
            ))}
          </div>
        </div>

        <div style={{overflowY:"auto",background:C.bg}}>
          {!reviewKey ? (
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:C.ink3,textAlign:"center",padding:40}}>
              <div style={{fontSize:44,marginBottom:14,opacity:.3}}>☽</div>
              <p style={{fontSize:13,lineHeight:1.7,color:C.ink3}}>從左側選擇一個閘門或通道<br/>查看你記錄的所有筆記</p>
            </div>
          ) : (
            <div style={{padding:"28px 32px",maxWidth:740}}>
              <div style={{marginBottom:26,paddingBottom:20,borderBottom:`1px solid ${C.border}`}}>
                <div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:4}}>
                  <span style={{fontSize:36}}>{isGate?GATE_ICONS[gNum]:ch?.icon}</span>
                  <div style={{fontFamily:"Georgia,serif",fontSize:42,color:isGate?C.accent:C.accent2,lineHeight:1}}>
                    {isGate?`閘門 ${gNum}`:`通道 ${reviewKey.replace("channel_","")}`}
                  </div>
                </div>
                <div style={{fontSize:17,color:C.ink,fontFamily:"Georgia,serif"}}>{isGate?GATE_NAMES[gNum]||"":ch?.name||""}</div>
                {ch&&<div style={{fontSize:12,color:C.ink3,marginTop:3}}>{ch.c1} ↔ {ch.c2}</div>}
                <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginTop:10}}>
                  <span style={{background:C.bg3,border:`1px solid ${C.border}`,borderRadius:12,fontSize:11,color:C.ink2,padding:"3px 11px"}}>{isGate?"閘門":"通道"}</span>
                  <span style={{background:C.bg3,border:`1px solid ${C.border}`,borderRadius:12,fontSize:11,color:C.ink2,padding:"3px 11px"}}>{n?.entries?.length||0} 條筆記</span>
                </div>
                <div style={{marginTop:12}}>
                  <button onClick={()=>onEdit(reviewKey)} style={{background:C.accent,border:"none",borderRadius:6,color:"#fff",fontSize:12,fontWeight:600,padding:"6px 14px",cursor:"pointer"}}>✏️ 新增 / 編輯</button>
                </div>
              </div>

              <div style={{fontSize:10,fontWeight:600,color:C.ink3,textTransform:"uppercase",letterSpacing:1.2,marginBottom:14,display:"flex",alignItems:"center",gap:10}}>
                所有筆記（按時間順序）<div style={{flex:1,height:1,background:C.border}}/>
              </div>
              {(n?.entries||[]).map((e,i)=>(
                <div key={i} style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:9,marginBottom:14,overflow:"hidden",borderLeft:`3px solid ${C.gold}`}}>
                  <div style={{background:C.bg2,borderBottom:`1px solid ${C.border}`,padding:"9px 15px",display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontSize:13}}>📚</span>
                    <span style={{fontSize:13,fontWeight:600,color:C.gold,flex:1}}>{e.book||"未標注來源"}</span>
                    <span style={{fontSize:10,color:C.ink3}}>{e.date||""}</span>
                  </div>
                  {e.note&&<div style={{padding:"14px 18px",fontSize:14,color:C.ink,lineHeight:1.85,whiteSpace:"pre-wrap",fontFamily:"Georgia,'Noto Serif TC',serif"}}>{e.note}</div>}
                  {e.tags?.length>0&&<div style={{padding:"0 18px 12px",display:"flex",gap:6,flexWrap:"wrap"}}>
                    {e.tags.map((t,ti)=><span key={ti} style={{background:"#e8e0d4",border:`1px solid ${C.border}`,borderRadius:12,fontSize:10,color:C.accent,padding:"2px 9px"}}>#{t}</span>)}
                  </div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// AI CHAT — uses the visitor's own Anthropic API key, stored locally.
// Works offline / on GitHub Pages because it calls api.anthropic.com
// directly from the browser with a key the user supplies themselves.
// ══════════════════════════════════════════════════════════════════
const QUICK_Q = ["閘門1的意義？","情感權威怎麼用？","Generator和Manifestor分別","什麼是陰影面？"];

function AiChat({ open, onToggle, notes }) {
  const [messages, setMessages] = useState([
    {role:"assistant",text:"你好！我是你的人類圖學習助手 ✨\n\n可以問我任何閘門、通道、類型、權威的問題，或貼上書本內容讓我幫你分析角度。\n\n（首次使用請先在下方設定你自己的 Claude API Key）"}
  ]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const [chips, setChips]     = useState(true);
  const [apiKey, setApiKeyState] = useState(getApiKey());
  const [showKeyInput, setShowKeyInput] = useState(!getApiKey());
  const msgEnd  = useRef(null);
  const history = useRef([]);

  useEffect(()=>{ if(open) msgEnd.current?.scrollIntoView({behavior:"smooth"}); },[messages,open]);

  const saveKey = () => { setApiKeyStorage(apiKey.trim()); setShowKeyInput(false); };

  const send = async (text) => {
    const msg = (text||input).trim();
    if(!msg||loading) return;
    if(!apiKey){ setShowKeyInput(true); return; }
    setInput(""); setChips(false);
    setMessages(m=>[...m,{role:"user",text:msg}]);
    history.current=[...history.current,{role:"user",content:msg}];
    setLoading(true);
    const total = Object.values(notes).reduce((s,n)=>s+(n.entries?.length||0),0);
    const sys = `你是人類圖（Human Design）學習助手。用戶已記錄 ${total} 條筆記。請用繁體中文，語氣親切。可以從能量運作、心理層面、陰影面、天賦潛能、實踐建議等角度回答。若用戶貼上書本內容，幫他分析角度並歸類。`;
    try {
      const res  = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,system:sys,messages:history.current})
      });
      if(!res.ok){
        const err = await res.json().catch(()=>({}));
        throw new Error(err.error?.message || `HTTP ${res.status}`);
      }
      const data = await res.json();
      const reply = (data.content||[]).map(b=>b.text||"").join("")||"抱歉，暫時無法回應。";
      history.current=[...history.current,{role:"assistant",content:reply}];
      if(history.current.length>20) history.current=history.current.slice(-20);
      setMessages(m=>[...m,{role:"assistant",text:reply}]);
    } catch(e) {
      setMessages(m=>[...m,{role:"assistant",text:`連線問題：${e.message}\n\n請確認 API Key 正確，且該 Key 有足夠額度。`}]);
    }
    finally { setLoading(false); }
  };

  return (
    <>
      <button onClick={onToggle}
        style={{position:"fixed",bottom:26,right:26,width:50,height:50,background:open?C.accent2:C.accent,borderRadius:"50%",border:"none",cursor:"pointer",boxShadow:"0 4px 18px rgba(90,70,40,.28)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,color:"#fff",zIndex:300,transition:"background .2s"}}>
        {open?"✕":"✨"}
      </button>

      {open&&(
        <div style={{position:"fixed",bottom:88,right:26,width:350,maxWidth:"calc(100vw - 32px)",maxHeight:540,background:C.bg,border:`1px solid ${C.border}`,borderRadius:14,boxShadow:"0 8px 36px rgba(90,70,40,.18)",zIndex:299,display:"flex",flexDirection:"column",overflow:"hidden",animation:"fadeUp .2s ease"}}>
          <div style={{background:C.bg2,borderBottom:`1px solid ${C.border}`,padding:"11px 14px",display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
            <div style={{width:28,height:28,background:`linear-gradient(135deg,${C.accent},${C.gold})`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:"#fff",flexShrink:0}}>⬡</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:600,color:C.ink}}>人類圖 AI 助手</div>
              <div style={{fontSize:10,color:C.ink3}}>{apiKey ? "可以問任何人類圖問題" : "需要先設定 API Key"}</div>
            </div>
            <button onClick={()=>setShowKeyInput(s=>!s)} style={{background:"none",border:`1px solid ${C.border}`,borderRadius:6,color:C.ink2,fontSize:10,cursor:"pointer",padding:"3px 8px"}}>金鑰</button>
            <button onClick={onToggle} style={{background:"none",border:"none",color:C.ink3,fontSize:16,cursor:"pointer",padding:"2px 6px"}}>✕</button>
          </div>

          {showKeyInput && (
            <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.border}`,background:"#ece7de"}}>
              <div style={{fontSize:11,color:C.ink2,marginBottom:6,lineHeight:1.5}}>
                貼上你的 Anthropic API Key（存在本機瀏覽器，不會上傳到任何地方）。
                可至 <span style={{color:C.accent}}>console.anthropic.com</span> 申請。
              </div>
              <div style={{display:"flex",gap:6}}>
                <input type="password" value={apiKey} onChange={e=>setApiKeyState(e.target.value)} placeholder="sk-ant-…"
                  style={{flex:1,background:C.bg,border:`1px solid ${C.border}`,borderRadius:6,color:C.ink,fontSize:12,padding:"6px 9px",outline:"none",fontFamily:"monospace"}} />
                <button onClick={saveKey} style={{background:C.accent,border:"none",borderRadius:6,color:"#fff",fontSize:11,fontWeight:600,padding:"6px 11px",cursor:"pointer"}}>儲存</button>
              </div>
            </div>
          )}

          <div style={{flex:1,overflowY:"auto",padding:"12px 12px 6px",display:"flex",flexDirection:"column",gap:9,background:C.bg}}>
            {messages.map((m,i)=>(
              <div key={i} style={{display:"flex",gap:7,alignItems:"flex-start",flexDirection:m.role==="user"?"row-reverse":"row"}}>
                <div style={{width:22,height:22,borderRadius:"50%",background:m.role==="user"?C.accent:C.bg3,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,flexShrink:0,color:m.role==="user"?"#fff":C.ink2}}>
                  {m.role==="user"?"你":"⬡"}
                </div>
                <div style={{maxWidth:"82%",padding:"9px 12px",borderRadius:11,fontSize:13,lineHeight:1.65,whiteSpace:"pre-wrap",
                  background:m.role==="user"?C.accent:C.panel,
                  border:`1px solid ${m.role==="user"?"transparent":C.border}`,
                  color:m.role==="user"?"#fff":C.ink,
                  borderTopLeftRadius:m.role==="user"?11:3,
                  borderTopRightRadius:m.role==="user"?3:11,
                  fontFamily:m.role==="assistant"?"Georgia,'Noto Serif TC',serif":"inherit"}}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading&&(
              <div style={{display:"flex",gap:7,alignItems:"flex-start"}}>
                <div style={{width:22,height:22,borderRadius:"50%",background:C.bg3,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:C.ink2}}>⬡</div>
                <div style={{display:"flex",gap:4,padding:"9px 12px",background:C.panel,border:`1px solid ${C.border}`,borderRadius:"11px 11px 11px 3px"}}>
                  {[0,.2,.4].map((d,i)=><span key={i} style={{width:6,height:6,borderRadius:"50%",background:C.accent,display:"block",animation:`pulse 1.2s ${d}s infinite`}}/>)}
                </div>
              </div>
            )}
            <div ref={msgEnd}/>
          </div>

          {chips&&apiKey&&(
            <div style={{padding:"4px 12px 9px",display:"flex",gap:5,flexWrap:"wrap",background:C.bg}}>
              {QUICK_Q.map((q,i)=>(
                <span key={i} onClick={()=>send(q)}
                  style={{background:C.bg3,border:`1px solid ${C.border}`,borderRadius:12,color:C.accent,fontSize:11,padding:"4px 10px",cursor:"pointer"}}>
                  {q.length>12?q.substring(0,12)+"…":q}
                </span>
              ))}
            </div>
          )}

          <div style={{borderTop:`1px solid ${C.border}`,padding:"9px 11px",display:"flex",gap:7,alignItems:"flex-end",flexShrink:0,background:C.bg2}}>
            <textarea value={input} onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
              placeholder="問任何人類圖問題，或貼上書本內容分析…" rows={1}
              style={{flex:1,background:C.bg,border:`1px solid ${C.border}`,borderRadius:9,color:C.ink,fontSize:13,padding:"7px 11px",outline:"none",resize:"none",minHeight:36,maxHeight:96,lineHeight:1.5,fontFamily:"inherit"}} />
            <button onClick={()=>send()} disabled={loading||!input.trim()}
              style={{width:34,height:34,background:loading||!input.trim()?C.bg3:C.accent,border:`1px solid ${C.border}`,borderRadius:9,color:loading||!input.trim()?C.ink3:"#fff",fontSize:14,cursor:loading||!input.trim()?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"background .15s"}}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
