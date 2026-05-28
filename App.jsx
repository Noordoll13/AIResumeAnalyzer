import { useState, useRef, useEffect } from "react";

const C = {
  bg: "#0A0E1A", bgCard: "#111827", border: "#1e2d45", borderLight: "#243552",
  accent: "#4F8EF7", accentSoft: "#1a2d5a", green: "#22c55e", greenSoft: "#14532d",
  red: "#ef4444", redSoft: "#450a0a", amber: "#f59e0b", amberSoft: "#451a03",
  textPrimary: "#f1f5f9", textSecondary: "#94a3b8", textMuted: "#475569",
  purple: "#a78bfa", purpleSoft: "#2e1065",
};

function NavBar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,background:scrolled?"rgba(10,14,26,0.96)":"transparent",borderBottom:scrolled?`1px solid ${C.border}`:"none",backdropFilter:scrolled?"blur(12px)":"none",transition:"all 0.3s",padding:"0 2rem" }}>
      <div style={{ maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:64 }}>
        <div style={{ display:"flex",alignItems:"center",gap:10,cursor:"pointer" }} onClick={() => setPage("home")}>
          <div style={{ width:32,height:32,borderRadius:8,background:`linear-gradient(135deg,${C.accent},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <span style={{ fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:18,color:C.textPrimary }}>ResumeAI</span>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:6 }}>
          {[["home","Home"],["upload","Analyzer"],["login","Login"]].map(([p,label]) => (
            <button key={p} onClick={() => setPage(p)} style={{ background:"none",border:"none",cursor:"pointer",color:page===p?C.textPrimary:C.textSecondary,fontFamily:"DM Sans,sans-serif",fontWeight:page===p?600:400,fontSize:14,padding:"8px 14px",borderRadius:8 }}>{label}</button>
          ))}
          <button onClick={() => setPage("signup")} style={{ background:`linear-gradient(135deg,${C.accent},${C.purple})`,color:"white",border:"none",borderRadius:8,padding:"8px 20px",fontFamily:"DM Sans,sans-serif",fontWeight:600,fontSize:14,cursor:"pointer" }}>Get Started</button>
        </div>
      </div>
    </nav>
  );
}

function ScoreRing({ score, size=100 }) {
  const r = size/2-10, circ = 2*Math.PI*r;
  const color = score>=80?C.green:score>=60?C.amber:C.red;
  return (
    <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={7}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={7}
        strokeDasharray={circ} strokeDashoffset={circ*(1-score/100)} strokeLinecap="round" style={{ transition:"stroke-dashoffset 1.2s ease" }}/>
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central"
        style={{ transform:`rotate(90deg)`,transformOrigin:`${size/2}px ${size/2}px`,fill:color,fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:size*0.22 }}>{score}</text>
    </svg>
  );
}

function PreviewCard() {
  return (
    <div style={{ background:C.bgCard,border:`1px solid ${C.borderLight}`,borderRadius:20,padding:"28px 24px",width:300,boxShadow:"0 32px 80px rgba(0,0,0,0.5)" }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
        <span style={{ color:C.textSecondary,fontSize:13,fontFamily:"DM Sans,sans-serif" }}>ATS Score</span>
        <span style={{ background:C.accentSoft,color:C.accent,padding:"3px 10px",borderRadius:20,fontSize:12,fontFamily:"DM Sans,sans-serif",fontWeight:600 }}>Live Preview</span>
      </div>
      <div style={{ display:"flex",alignItems:"center",gap:16,marginBottom:20 }}>
        <ScoreRing score={82} size={90}/>
        <div>
          <div style={{ color:C.green,fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:22 }}>82/100</div>
          <div style={{ color:C.textSecondary,fontSize:13,fontFamily:"DM Sans,sans-serif" }}>Strong Match</div>
        </div>
      </div>
      <div style={{ borderTop:`1px solid ${C.border}`,paddingTop:14 }}>
        {[["Skills Detected",["Java","Python","SQL","React"],C.green,C.greenSoft],["Missing Skills",["AWS","Docker"],C.red,C.redSoft]].map(([label,skills,color,bg]) => (
          <div key={label} style={{ marginBottom:10 }}>
            <div style={{ fontSize:12,color:C.textMuted,fontFamily:"DM Sans,sans-serif",marginBottom:5 }}>{label}</div>
            <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
              {skills.map(s => <span key={s} style={{ background:bg,color,padding:"3px 10px",borderRadius:20,fontSize:12,fontFamily:"DM Sans,sans-serif",fontWeight:500 }}>{s}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop:`1px solid ${C.border}`,paddingTop:14,marginTop:4 }}>
        <div style={{ fontSize:12,color:C.textMuted,fontFamily:"DM Sans,sans-serif",marginBottom:8 }}>Match Breakdown</div>
        {[["Keywords",87,C.accent],["Format",90,C.green],["Experience",75,C.amber]].map(([label,pct,color]) => (
          <div key={label} style={{ marginBottom:8 }}>
            <div style={{ display:"flex",justifyContent:"space-between",marginBottom:3 }}>
              <span style={{ fontSize:12,color:C.textSecondary,fontFamily:"DM Sans,sans-serif" }}>{label}</span>
              <span style={{ fontSize:12,color,fontFamily:"DM Sans,sans-serif",fontWeight:600 }}>{pct}%</span>
            </div>
            <div style={{ height:4,background:C.border,borderRadius:2 }}>
              <div style={{ width:`${pct}%`,height:"100%",background:color,borderRadius:2 }}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const FEATURES = [
  { icon:"📊",title:"ATS Score",desc:"Instant 0–100 ATS compatibility score with detailed breakdown.",color:C.accent },
  { icon:"🔍",title:"Skill Detection",desc:"AI detects your strengths and identifies critical missing skills.",color:C.green },
  { icon:"💼",title:"Best Job Roles",desc:"Discover roles that perfectly match your experience and skills.",color:C.purple },
  { icon:"🎤",title:"Interview Questions",desc:"10 personalized questions generated directly from your resume.",color:C.amber },
  { icon:"✏️",title:"Grammar & Format",desc:"AI polishes your writing and flags formatting issues.",color:"#f472b6" },
  { icon:"📥",title:"Downloadable Report",desc:"Export your full analysis as a PDF to track your progress.",color:"#34d399" },
];

function HomePage({ setPage }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);
  return (
    <div style={{ background:C.bg,minHeight:"100vh",color:C.textPrimary,fontFamily:"DM Sans,sans-serif" }}>
      <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"-10%",left:"55%",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(79,142,247,0.1) 0%,transparent 70%)" }}/>
        <div style={{ position:"absolute",top:"50%",left:"-5%",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(167,139,250,0.07) 0%,transparent 70%)" }}/>
      </div>
      <section style={{ position:"relative",zIndex:1,maxWidth:1100,margin:"0 auto",padding:"140px 2rem 100px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:60,flexWrap:"wrap" }}>
        <div style={{ flex:"1 1 460px",opacity:show?1:0,transform:show?"translateY(0)":"translateY(24px)",transition:"all 0.7s ease" }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:C.accentSoft,border:`1px solid ${C.accent}30`,borderRadius:20,padding:"6px 16px",marginBottom:28 }}>
            <div style={{ width:6,height:6,borderRadius:"50%",background:C.accent,animation:"pulse 2s infinite" }}/>
            <span style={{ fontSize:13,color:C.accent,fontWeight:500 }}>AI-Powered · Built for Students</span>
          </div>
          <h1 style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:"clamp(38px,5vw,62px)",lineHeight:1.1,letterSpacing:"-1.5px",margin:"0 0 24px" }}>
            AI Resume{" "}
            <span style={{ background:`linear-gradient(135deg,${C.accent},${C.purple})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Analyzer</span>
          </h1>
          <p style={{ fontSize:17,color:C.textSecondary,lineHeight:1.7,margin:"0 0 40px",maxWidth:460 }}>
            Upload your resume and get an instant ATS score, skill gap analysis, and personalized interview questions in seconds.
          </p>
          <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
            <button onClick={() => setPage("signup")} style={{ background:`linear-gradient(135deg,${C.accent},${C.purple})`,color:"white",border:"none",borderRadius:12,padding:"14px 32px",fontFamily:"DM Sans,sans-serif",fontWeight:700,fontSize:16,cursor:"pointer",boxShadow:`0 8px 24px ${C.accent}40` }}>Get Started Free →</button>
            <button onClick={() => setPage("upload")} style={{ background:"transparent",color:C.textPrimary,border:`1px solid ${C.borderLight}`,borderRadius:12,padding:"14px 32px",fontFamily:"DM Sans,sans-serif",fontWeight:600,fontSize:16,cursor:"pointer" }}>Try Demo</button>
          </div>
          <div style={{ display:"flex",gap:32,marginTop:40 }}>
            {[["50K+","Students"],["200+","Courses"],["98%","Success Rate"]].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:22 }}>{n}</div>
                <div style={{ fontSize:13,color:C.textMuted }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ opacity:show?1:0,transform:show?"translateY(0)":"translateY(24px)",transition:"all 0.9s ease 0.2s" }}>
          <PreviewCard/>
        </div>
      </section>

      <section style={{ position:"relative",zIndex:1,maxWidth:1100,margin:"0 auto",padding:"80px 2rem" }}>
        <div style={{ textAlign:"center",marginBottom:56 }}>
          <h2 style={{ fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:36,letterSpacing:"-1px",margin:"0 0 14px" }}>
            Everything you need to{" "}
            <span style={{ background:`linear-gradient(135deg,${C.accent},${C.purple})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>land your dream job</span>
          </h2>
          <p style={{ color:C.textSecondary,fontSize:16,maxWidth:500,margin:"0 auto" }}>Built for students and freshers preparing for placements and internships.</p>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:18 }}>
          {FEATURES.map(f => (
            <div key={f.title}
              onMouseEnter={e => { e.currentTarget.style.borderColor=f.color+"50"; e.currentTarget.style.transform="translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.transform="translateY(0)"; }}
              style={{ background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:16,padding:"26px 22px",transition:"all 0.2s",cursor:"default" }}>
              <div style={{ fontSize:28,marginBottom:14 }}>{f.icon}</div>
              <h3 style={{ fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:17,color:f.color,margin:"0 0 8px" }}>{f.title}</h3>
              <p style={{ color:C.textSecondary,fontSize:14,lineHeight:1.6,margin:0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ position:"relative",zIndex:1,background:C.bgCard,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:1100,margin:"0 auto",padding:"80px 2rem" }}>
          <h2 style={{ textAlign:"center",fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:34,letterSpacing:"-1px",margin:"0 0 56px" }}>How it works</h2>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:40 }}>
            {[["01","Upload Resume","Drop your PDF or Word document. We support all standard resume formats."],
              ["02","AI Analysis","Our AI engine parses, scores, and evaluates every section of your resume."],
              ["03","Get Results","Receive your ATS score, skill report, job matches, and interview prep instantly."]
            ].map(([n,t,d]) => (
              <div key={n} style={{ textAlign:"center" }}>
                <div style={{ width:52,height:52,borderRadius:"50%",background:`linear-gradient(135deg,${C.accent}20,${C.purple}20)`,border:`1px solid ${C.accent}40`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px",fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:15,color:C.accent }}>{n}</div>
                <h3 style={{ fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:19,margin:"0 0 10px" }}>{t}</h3>
                <p style={{ color:C.textSecondary,fontSize:14,lineHeight:1.6,margin:0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ position:"relative",zIndex:1,maxWidth:1100,margin:"0 auto",padding:"80px 2rem" }}>
        <div style={{ background:`linear-gradient(135deg,${C.accentSoft},${C.purpleSoft})`,border:`1px solid ${C.accent}30`,borderRadius:24,padding:"60px 40px",textAlign:"center" }}>
          <h2 style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:36,letterSpacing:"-1px",margin:"0 0 14px" }}>Ready to get hired?</h2>
          <p style={{ color:C.textSecondary,fontSize:16,margin:"0 0 32px" }}>Join 50,000+ students who improved their resumes with ResumeAI</p>
          <button onClick={() => setPage("upload")} style={{ background:`linear-gradient(135deg,${C.accent},${C.purple})`,color:"white",border:"none",borderRadius:12,padding:"15px 38px",fontFamily:"DM Sans,sans-serif",fontWeight:700,fontSize:16,cursor:"pointer",boxShadow:`0 8px 32px ${C.accent}50` }}>Analyze My Resume Free →</button>
        </div>
      </section>

      <footer style={{ position:"relative",zIndex:1,borderTop:`1px solid ${C.border}`,padding:"48px 2rem" }}>
        <div style={{ maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:40 }}>
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:12 }}>
              <div style={{ width:26,height:26,borderRadius:7,background:`linear-gradient(135deg,${C.accent},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <span style={{ fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:15,color:C.textPrimary }}>ResumeAI</span>
            </div>
            <p style={{ color:C.textMuted,fontSize:13,lineHeight:1.6,maxWidth:200 }}>AI-powered resume analysis and interview prep for students.</p>
          </div>
          {[["Product",["Resume Analyzer","Interview Questions","ATS Score"]],["Company",["About","Privacy","Contact"]]].map(([title,links]) => (
            <div key={title}>
              <div style={{ fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:14,color:C.textPrimary,marginBottom:14 }}>{title}</div>
              {links.map(l => <div key={l} style={{ color:C.textMuted,fontSize:13,marginBottom:10,cursor:"pointer" }}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={{ maxWidth:1100,margin:"28px auto 0",paddingTop:20,borderTop:`1px solid ${C.border}`,textAlign:"center",color:C.textMuted,fontSize:13 }}>© 2026 ResumeAI. Built for students.</div>
      </footer>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap'); *{box-sizing:border-box;} @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </div>
  );
}

function UploadPage() {
  const [phase, setPhase] = useState("upload");
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [progress, setProgress] = useState(0);
  const [jobRole, setJobRole] = useState("");
  const fileRef = useRef();
  const handleFile = (file) => { if (file) setFileName(file.name); };
  const startAnalysis = () => {
    setPhase("analyzing"); let p = 0;
    const iv = setInterval(() => {
      p += Math.random()*12+3;
      if (p >= 100) { clearInterval(iv); setProgress(100); setTimeout(() => setPhase("results"), 400); return; }
      setProgress(p);
    }, 180);
  };
  const STEPS = ["Parsing document structure...","Extracting skills & keywords...","Running ATS compatibility check...","Generating interview questions...","Finalizing your report..."];
  if (phase === "results") return <ResultsView jobRole={jobRole} onReset={() => { setPhase("upload"); setFileName(null); setProgress(0); setJobRole(""); }}/>;
  return (
    <div style={{ background:C.bg,minHeight:"100vh",paddingTop:100,paddingBottom:60,fontFamily:"DM Sans,sans-serif",color:C.textPrimary }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap'); *{box-sizing:border-box;}`}</style>
      <div style={{ maxWidth:620,margin:"0 auto",padding:"0 2rem" }}>
        {phase === "upload" && <>
          <h1 style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:34,letterSpacing:"-1px",margin:"0 0 8px" }}>Analyze Your Resume</h1>
          <p style={{ color:C.textSecondary,fontSize:16,margin:"0 0 36px" }}>Get your ATS score, skill gaps, and interview prep in under 30 seconds.</p>
          <div onClick={() => fileRef.current.click()}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
            style={{ border:`2px dashed ${dragging?C.accent:fileName?C.green:C.borderLight}`,borderRadius:16,padding:"52px 24px",textAlign:"center",cursor:"pointer",background:fileName?C.greenSoft+"30":C.bgCard,transition:"all 0.2s",marginBottom:22 }}>
            <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" style={{ display:"none" }} onChange={e => handleFile(e.target.files[0])}/>
            <div style={{ fontSize:44,marginBottom:14 }}>{fileName?"✅":"📄"}</div>
            {fileName
              ? <><div style={{ color:C.green,fontWeight:700,fontSize:17,marginBottom:4 }}>{fileName}</div><div style={{ color:C.textMuted,fontSize:13 }}>Click to change file</div></>
              : <><div style={{ fontWeight:600,fontSize:16,marginBottom:6 }}>Drop your resume here</div><div style={{ color:C.textMuted,fontSize:14 }}>or click to browse · PDF, DOC, DOCX</div></>}
          </div>
          <div style={{ marginBottom:24 }}>
            <label style={{ display:"block",color:C.textSecondary,fontSize:14,marginBottom:7,fontWeight:500 }}>Target Job Role <span style={{ color:C.textMuted }}>(optional)</span></label>
            <input value={jobRole} onChange={e => setJobRole(e.target.value)} placeholder="e.g. Software Engineer, Data Analyst..."
              style={{ width:"100%",padding:"12px 14px",background:C.bgCard,border:`1px solid ${C.borderLight}`,borderRadius:10,color:C.textPrimary,fontSize:15,outline:"none",fontFamily:"DM Sans,sans-serif" }}/>
          </div>
          <button onClick={startAnalysis} disabled={!fileName} style={{ width:"100%",padding:"15px",borderRadius:12,border:"none",background:fileName?`linear-gradient(135deg,${C.accent},${C.purple})`:C.border,color:fileName?"white":C.textMuted,fontFamily:"DM Sans,sans-serif",fontWeight:700,fontSize:16,cursor:fileName?"pointer":"not-allowed",boxShadow:fileName?`0 8px 24px ${C.accent}40`:"none" }}>
            {fileName ? "Analyze Resume →" : "Upload a resume to continue"}
          </button>
          <div style={{ textAlign:"center",marginTop:16 }}>
            <span style={{ color:C.textMuted,fontSize:13 }}>No file? </span>
            <span style={{ color:C.accent,fontSize:13,cursor:"pointer",fontWeight:600 }} onClick={() => setFileName("sample_resume.pdf")}>Use a demo resume</span>
          </div>
        </>}
        {phase === "analyzing" && (
          <div style={{ textAlign:"center",paddingTop:80 }}>
            <div style={{ fontSize:56,marginBottom:20 }}>🔍</div>
            <h2 style={{ fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:28,margin:"0 0 8px" }}>Analyzing your resume...</h2>
            <p style={{ color:C.textSecondary,fontSize:15,margin:"0 0 40px" }}>{STEPS[Math.min(Math.floor((progress/100)*STEPS.length),STEPS.length-1)]}</p>
            <div style={{ background:C.bgCard,borderRadius:100,height:8,overflow:"hidden",marginBottom:10 }}>
              <div style={{ height:"100%",borderRadius:100,background:`linear-gradient(90deg,${C.accent},${C.purple})`,width:`${progress}%`,transition:"width 0.3s ease" }}/>
            </div>
            <div style={{ color:C.textMuted,fontSize:13 }}>{Math.round(progress)}% complete</div>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultsView({ jobRole, onReset }) {
  const [tab, setTab] = useState("overview");
  const QS = [
    "Tell me about yourself and your relevant experience with React and Python.",
    "How have you applied SQL in previous projects? Give a specific example.",
    "Describe a challenging technical problem you solved using Java.",
    `Why do you want to work as a ${jobRole || "Software Engineer"}?`,
    "How do you stay up-to-date with new technologies in your field?",
    "What is your experience with version control systems like Git?",
    "Can you explain the difference between SQL and NoSQL databases?",
    "How do you approach debugging a complex software issue?",
    "Describe a time you worked in a team. What role did you play?",
    "Where do you see yourself in 5 years, and how does this role fit?",
  ];
  return (
    <div style={{ background:C.bg,minHeight:"100vh",paddingTop:100,paddingBottom:60,fontFamily:"DM Sans,sans-serif",color:C.textPrimary }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap'); *{box-sizing:border-box;}`}</style>
      <div style={{ maxWidth:900,margin:"0 auto",padding:"0 2rem" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:36,flexWrap:"wrap",gap:12 }}>
          <div>
            <h1 style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:30,margin:"0 0 6px" }}>Your Analysis Report</h1>
            <p style={{ color:C.textSecondary,fontSize:14,margin:0 }}>{jobRole?`Role: ${jobRole}`:"General analysis"} · sample_resume.pdf</p>
          </div>
          <div style={{ display:"flex",gap:10 }}>
            <button onClick={onReset} style={{ padding:"10px 18px",background:C.bgCard,border:`1px solid ${C.borderLight}`,borderRadius:10,color:C.textSecondary,fontFamily:"DM Sans,sans-serif",fontWeight:600,fontSize:14,cursor:"pointer" }}>← Analyze Another</button>
            <button style={{ padding:"10px 18px",background:`linear-gradient(135deg,${C.accent},${C.purple})`,border:"none",borderRadius:10,color:"white",fontFamily:"DM Sans,sans-serif",fontWeight:600,fontSize:14,cursor:"pointer" }}>Download PDF</button>
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:14,marginBottom:28 }}>
          {[["ATS Score","82/100","Strong Match",C.green],["Keywords","87%","Match rate",C.accent],["Format","90%","Excellent",C.purple],["Missing","3","Skills to add",C.amber]].map(([l,v,s,col]) => (
            <div key={l} style={{ background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:14,padding:"18px 16px" }}>
              <div style={{ fontSize:12,color:C.textMuted,marginBottom:5 }}>{l}</div>
              <div style={{ fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:26,color:col }}>{v}</div>
              <div style={{ fontSize:12,color:C.textMuted,marginTop:2 }}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex",gap:4,marginBottom:24,background:C.bgCard,borderRadius:12,padding:4,border:`1px solid ${C.border}`,width:"fit-content" }}>
          {[["overview","Overview"],["skills","Skills"],["questions","Interview"],["jobs","Jobs"]].map(([key,label]) => (
            <button key={key} onClick={() => setTab(key)} style={{ padding:"8px 18px",borderRadius:8,border:"none",cursor:"pointer",background:tab===key?`linear-gradient(135deg,${C.accent},${C.purple})`:"transparent",color:tab===key?"white":C.textSecondary,fontFamily:"DM Sans,sans-serif",fontWeight:600,fontSize:14 }}>{label}</button>
          ))}
        </div>
        {tab === "overview" && (
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:18 }}>
            <Card title="Score Breakdown">
              {[["Keywords",87,C.accent],["Formatting",90,C.green],["Experience",75,C.amber],["Education",85,C.purple],["Action Verbs",80,C.green]].map(([l,p,col]) => (
                <div key={l} style={{ marginBottom:14 }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}>
                    <span style={{ fontSize:13,color:C.textSecondary }}>{l}</span>
                    <span style={{ fontSize:13,color:col,fontWeight:600 }}>{p}%</span>
                  </div>
                  <div style={{ height:5,background:C.border,borderRadius:3 }}>
                    <div style={{ width:`${p}%`,height:"100%",background:col,borderRadius:3 }}/>
                  </div>
                </div>
              ))}
            </Card>
            <Card title="Suggestions">
              {[["✅","Strong technical skills with 6+ languages","success"],["✅","Clear education and project descriptions","success"],["⚠️","Add cloud skills: AWS, Azure or GCP","warn"],["⚠️","Include more quantified achievements","warn"],["❌","Missing Docker/containerization experience","error"],["❌","LinkedIn URL not found in contact","error"]].map(([icon,text,type],i) => (
                <div key={i} style={{ display:"flex",gap:10,marginBottom:12,alignItems:"flex-start" }}>
                  <span style={{ fontSize:15 }}>{icon}</span>
                  <span style={{ fontSize:13,color:type==="success"?C.green:type==="warn"?C.amber:C.red,lineHeight:1.5 }}>{text}</span>
                </div>
              ))}
            </Card>
          </div>
        )}
        {tab === "skills" && (
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:18 }}>
            <Card title="✅ Detected Skills">
              <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
                {["Java","Python","SQL","React","JavaScript","HTML/CSS","Git","REST APIs","OOP","Linux"].map(s => (
                  <span key={s} style={{ background:C.greenSoft,color:C.green,padding:"5px 12px",borderRadius:20,fontSize:13,fontWeight:500 }}>{s}</span>
                ))}
              </div>
            </Card>
            <Card title="❌ Missing Skills">
              <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:16 }}>
                {["AWS","Docker","Kubernetes","TypeScript","Redis","GraphQL"].map(s => (
                  <span key={s} style={{ background:C.redSoft,color:C.red,padding:"5px 12px",borderRadius:20,fontSize:13,fontWeight:500 }}>{s}</span>
                ))}
              </div>
              <div style={{ padding:14,background:C.amberSoft+"80",border:`1px solid ${C.amber}30`,borderRadius:10 }}>
                <div style={{ color:C.amber,fontSize:13,lineHeight:1.6,fontWeight:500 }}>💡 Adding 2–3 of these could increase your ATS score by 10–15 points.</div>
              </div>
            </Card>
          </div>
        )}
        {tab === "questions" && (
          <Card title="🎤 Personalized Interview Questions">
            {QS.map((q,i) => (
              <div key={i} style={{ display:"flex",gap:14,padding:"14px 0",borderBottom:i<QS.length-1?`1px solid ${C.border}`:"none" }}>
                <div style={{ width:26,height:26,borderRadius:"50%",background:C.accentSoft,color:C.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontFamily:"Syne,sans-serif",fontWeight:700,flexShrink:0 }}>{i+1}</div>
                <p style={{ color:C.textPrimary,fontSize:15,lineHeight:1.6,margin:0 }}>{q}</p>
              </div>
            ))}
          </Card>
        )}
        {tab === "jobs" && (
          <div style={{ display:"grid",gap:14 }}>
            {[["Software Engineer",91,"Product MNCs",["Java","Python","DSA"]],["Full Stack Developer",85,"Startups",["React","Node.js","SQL"]],["Data Analyst",78,"Analytics Firms",["Python","SQL","Excel"]],["Backend Developer",74,"Service Companies",["Java","REST APIs","DB"]]].map(([role,match,co,skills]) => (
              <div key={role} style={{ background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:14,padding:"20px 22px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12 }}>
                <div>
                  <div style={{ fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:18,marginBottom:4 }}>{role}</div>
                  <div style={{ color:C.textMuted,fontSize:13,marginBottom:10 }}>{co}</div>
                  <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                    {skills.map(s => <span key={s} style={{ background:C.accentSoft,color:C.accent,padding:"3px 10px",borderRadius:20,fontSize:12 }}>{s}</span>)}
                  </div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:28,color:match>=85?C.green:match>=75?C.amber:C.red }}>{match}%</div>
                  <div style={{ color:C.textMuted,fontSize:12 }}>match</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div style={{ background:C.bgCard,border:`1px solid ${C.border}`,borderRadius:16,padding:"20px 18px" }}>
      <h3 style={{ fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:15,margin:"0 0 16px" }}>{title}</h3>
      {children}
    </div>
  );
}

function AuthPage({ mode, setPage }) {
  const [form, setForm] = useState({ email:"",password:"",name:"" });
  const [loading, setLoading] = useState(false);
  const isLogin = mode === "login";
  return (
    <div style={{ background:C.bg,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"80px 2rem",fontFamily:"DM Sans,sans-serif",color:C.textPrimary }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap'); *{box-sizing:border-box;}`}</style>
      <div style={{ width:"100%",maxWidth:420 }}>
        <div style={{ textAlign:"center",marginBottom:36 }}>
          <div style={{ width:46,height:46,borderRadius:13,background:`linear-gradient(135deg,${C.accent},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 18px" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <h1 style={{ fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:28,margin:"0 0 6px" }}>{isLogin?"Welcome back":"Create account"}</h1>
          <p style={{ color:C.textSecondary,fontSize:15,margin:0 }}>{isLogin?"Sign in to your ResumeAI account":"Start analyzing your resume for free"}</p>
        </div>
        <div style={{ background:C.bgCard,border:`1px solid ${C.borderLight}`,borderRadius:20,padding:"32px 28px" }}>
          {!isLogin && <Field label="Full Name" placeholder="Your name" value={form.name} onChange={v => setForm(f=>({...f,name:v}))}/>}
          <Field label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={v => setForm(f=>({...f,email:v}))}/>
          <Field label="Password" type="password" placeholder="••••••••" value={form.password} onChange={v => setForm(f=>({...f,password:v}))}/>
          <button onClick={() => { setLoading(true); setTimeout(() => { setLoading(false); setPage("upload"); },1200); }}
            style={{ width:"100%",padding:"13px",borderRadius:12,border:"none",background:`linear-gradient(135deg,${C.accent},${C.purple})`,color:"white",fontFamily:"DM Sans,sans-serif",fontWeight:700,fontSize:15,cursor:"pointer",marginTop:6,boxShadow:`0 8px 24px ${C.accent}40` }}>
            {loading?"Processing...":isLogin?"Sign In →":"Create Account →"}
          </button>
          <div style={{ textAlign:"center",marginTop:18,color:C.textMuted,fontSize:14 }}>
            {isLogin?"Don't have an account? ":"Already have an account? "}
            <span style={{ color:C.accent,cursor:"pointer",fontWeight:600 }} onClick={() => setPage(isLogin?"signup":"login")}>
              {isLogin?"Sign up free":"Sign in"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type="text", placeholder, value, onChange }) {
  return (
    <div style={{ marginBottom:16 }}>
      <label style={{ display:"block",color:C.textSecondary,fontSize:14,fontWeight:500,marginBottom:6 }}>{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
        style={{ width:"100%",padding:"11px 13px",background:C.bg,border:`1px solid ${C.borderLight}`,borderRadius:9,color:C.textPrimary,fontSize:15,outline:"none",fontFamily:"DM Sans,sans-serif" }}
        onFocus={e => e.target.style.borderColor=C.accent}
        onBlur={e => e.target.style.borderColor=C.borderLight}/>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  return (
    <>
      <NavBar page={page} setPage={setPage}/>
      {page==="home"   && <HomePage setPage={setPage}/>}
      {page==="upload" && <UploadPage/>}
      {page==="login"  && <AuthPage mode="login"  setPage={setPage}/>}
      {page==="signup" && <AuthPage mode="signup" setPage={setPage}/>}
    </>
  );
}

