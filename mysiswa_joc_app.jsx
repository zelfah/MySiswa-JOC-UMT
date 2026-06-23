import { useState } from "react";

// ── Design tokens ──────────────────────────────────────────────
const C = {
  navy: "#0B1F3A", teal: "#2BB5C8", tealLight: "#E4F7FA",
  amber: "#F5A623", amberLight: "#FEF3DC",
  bg: "#F5F9FC", white: "#FFFFFF", text: "#1A2B40", muted: "#6B7E96",
  border: "#D6E4EE", success: "#27AE60", successLight: "#E8F8EF",
  error: "#E74C3C", errorLight: "#FDEDEC",
};

const CAT_COLORS = {
  "Pentadbiran & Operasi":       { bg: "#EEF2FF", text: "#4338CA" },
  "Perkhidmatan":                { bg: "#FDF4FF", text: "#7E22CE" },
  "Teknikal":                    { bg: "#E0F2FE", text: "#0369A1" },
  "Project Based / Profesional": { bg: "#FFF7ED", text: "#C2410C" },
  "Keusahawanan":                { bg: "#F0FDF4", text: "#15803D" },
};

const JOBS = [
  { id:1, title:"Pembantu Pentadbiran",   dept:"Pejabat Rektor",               category:"Pentadbiran & Operasi",       rate:6, hours:"8:00–13:00",  days:"Isnin–Rabu",     slots:3, posted:"18 Jun 2026" },
  { id:2, title:"OKU Buddy",              dept:"Pusat Disabiliti UMT",          category:"Perkhidmatan",                rate:6, hours:"9:00–14:00",  days:"Sel & Khamis",   slots:2, posted:"20 Jun 2026" },
  { id:3, title:"Pengurus Platform Digital", dept:"UMT-GEM",                   category:"Teknikal",                    rate:6, hours:"Fleksibel",    days:"Hujung Minggu",  slots:1, posted:"21 Jun 2026" },
  { id:4, title:"Pembantu Penyelidik",    dept:"Fak. Sains & Teknologi",        category:"Project Based / Profesional", rate:6, hours:"14:00–18:00", days:"Isnin–Jumaat",   slots:4, posted:"22 Jun 2026" },
  { id:5, title:"Startup Assistant",      dept:"UMT Inovasi Hub",               category:"Keusahawanan",                rate:6, hours:"Fleksibel",    days:"Fleksibel",      slots:2, posted:"23 Jun 2026" },
  { id:6, title:"Fasilitator Program",    dept:"Hal Ehwal Pelajar",             category:"Teknikal",                    rate:6, hours:"8:00–12:00",   days:"Sabtu",          slots:5, posted:"23 Jun 2026" },
];

// ── Icon component ─────────────────────────────────────────────
const PATHS = {
  user:      "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  briefcase: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  calendar:  "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  logout:    "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  check:     "M5 13l4 4L19 7",
  clock:     "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  edit:      "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  x:         "M6 18L18 6M6 6l12 12",
  trash:     "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
};
const Icon = ({ name, size=18, color="currentColor" }) => (
  <svg width={size} height={size} fill="none" stroke={color} strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d={PATHS[name]}/>
  </svg>
);

const GoogleLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// ── Styles ─────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',sans-serif;background:${C.bg};color:${C.text}}
  .app{min-height:100vh;display:flex;flex-direction:column}

  /* Nav */
  .nav{background:${C.navy};padding:0 20px;display:flex;align-items:center;justify-content:space-between;height:60px;position:sticky;top:0;z-index:100;box-shadow:0 2px 12px rgba(11,31,58,.35)}
  .nav-brand{color:${C.white};font-weight:800;font-size:16px;letter-spacing:.5px}
  .nav-brand span{color:${C.teal}}
  .nav-tabs{display:flex;gap:4px}
  .nav-tab{background:none;border:none;color:rgba(255,255,255,.6);padding:8px 14px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;display:flex;align-items:center;gap:6px;transition:all .2s;position:relative;font-family:inherit}
  .nav-tab:hover{color:${C.white};background:rgba(255,255,255,.08)}
  .nav-tab.active{color:${C.white}}
  .nav-tab.active::after{content:'';position:absolute;bottom:-1px;left:50%;transform:translateX(-50%);width:28px;height:3px;background:${C.teal};border-radius:2px 2px 0 0}
  .nav-logout{background:rgba(255,255,255,.1);border:none;color:rgba(255,255,255,.7);padding:7px 12px;border-radius:8px;font-size:13px;cursor:pointer;display:flex;align-items:center;gap:6px;font-family:inherit;transition:all .2s}
  .nav-logout:hover{background:rgba(231,76,60,.25);color:#fff}

  /* Page */
  .page{flex:1;padding:24px 20px;max-width:900px;margin:0 auto;width:100%}

  /* Auth */
  .auth-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,${C.navy} 0%,#1a3a5c 100%);padding:20px}
  .auth-card{background:${C.white};border-radius:20px;padding:36px;width:100%;max-width:440px;box-shadow:0 20px 60px rgba(0,0,0,.25)}
  .auth-logo-badge{display:inline-flex;align-items:center;gap:10px;background:${C.navy};color:${C.white};padding:10px 20px;border-radius:12px;font-weight:800;font-size:18px}
  .auth-logo-badge span{color:${C.teal}}
  .auth-tabs{display:flex;background:${C.bg};border-radius:10px;padding:4px;margin-bottom:24px}
  .auth-tab{flex:1;padding:9px;text-align:center;font-size:13px;font-weight:600;border:none;border-radius:8px;cursor:pointer;transition:all .2s;font-family:inherit;background:none;color:${C.muted}}
  .auth-tab.active{background:${C.white};color:${C.navy};box-shadow:0 1px 6px rgba(0,0,0,.1)}

  /* Forms */
  .form-row{display:flex;gap:12px}
  .form-group{margin-bottom:14px;flex:1}
  .form-label{display:block;font-size:11px;font-weight:700;color:${C.muted};text-transform:uppercase;letter-spacing:.5px;margin-bottom:5px}
  .form-input{width:100%;padding:10px 13px;border:1.5px solid ${C.border};border-radius:10px;font-size:14px;font-family:inherit;color:${C.text};background:${C.bg};outline:none;transition:border-color .2s}
  .form-input:focus{border-color:${C.teal};background:${C.white}}
  .check-item{display:flex;align-items:center;gap:8px;font-size:14px;cursor:pointer}
  .check-item input{accent-color:${C.teal};width:15px;height:15px;cursor:pointer}

  /* Buttons */
  .btn-primary{width:100%;padding:12px;background:${C.teal};color:${C.white};border:none;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;transition:all .2s;font-family:inherit}
  .btn-primary:hover{background:#22a0b2;box-shadow:0 4px 14px rgba(43,181,200,.4)}
  .btn-sm{padding:8px 14px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:none;font-family:inherit;transition:all .2s;display:inline-flex;align-items:center;gap:6px}
  .btn-teal{background:${C.teal};color:${C.white}}
  .btn-teal:hover{background:#22a0b2}
  .btn-danger{background:${C.errorLight};color:${C.error};border:1px solid #f5c6c2}
  .btn-danger:hover{background:#f5c6c2}
  .btn-outline{background:none;border:1.5px solid ${C.border};color:${C.muted}}
  .btn-outline:hover{border-color:${C.teal};color:${C.teal}}
  .btn-google{width:100%;padding:11px 16px;border:1.5px solid ${C.border};border-radius:10px;background:${C.white};cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;font-size:14px;font-weight:600;color:${C.text};font-family:inherit;transition:all .2s}
  .btn-google:hover{border-color:${C.teal};box-shadow:0 2px 10px rgba(43,181,200,.15)}

  /* Cards */
  .card{background:${C.white};border-radius:16px;padding:20px;border:1px solid ${C.border};box-shadow:0 1px 4px rgba(0,0,0,.05);margin-bottom:14px}

  /* Profile */
  .profile-header{background:linear-gradient(135deg,${C.navy} 0%,#1a3a5c 100%);border-radius:16px;padding:24px;color:${C.white};margin-bottom:16px;display:flex;align-items:center;gap:18px}
  .avatar{width:64px;height:64px;border-radius:50%;background:${C.teal};display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;color:${C.white};flex-shrink:0;border:3px solid rgba(255,255,255,.25)}
  .profile-name{font-size:18px;font-weight:800;margin-bottom:3px}
  .profile-meta{font-size:12px;color:rgba(255,255,255,.7)}

  /* Badges */
  .badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.4px}
  .badge-teal{background:${C.tealLight};color:#0e8fa0}
  .badge-success{background:${C.successLight};color:${C.success}}
  .badge-amber{background:${C.amberLight};color:#b37a10}
  .badge-muted{background:#f1f4f8;color:${C.muted}}

  /* Section title */
  .section-title{font-size:18px;font-weight:800;color:${C.navy};margin-bottom:16px}
  .section-title span{color:${C.teal}}

  /* Jobs */
  .job-card{background:${C.white};border-radius:14px;padding:18px;border:1.5px solid ${C.border};transition:all .2s;cursor:pointer;margin-bottom:12px}
  .job-card:hover{border-color:${C.teal};box-shadow:0 4px 16px rgba(43,181,200,.15);transform:translateY(-2px)}
  .job-title{font-size:15px;font-weight:700;color:${C.navy};margin-bottom:2px}
  .job-dept{font-size:12px;color:${C.muted}}
  .job-meta{display:flex;gap:14px;font-size:12px;color:${C.muted};margin-top:10px;flex-wrap:wrap}
  .job-meta-item{display:flex;align-items:center;gap:4px}
  .cat-pill{display:inline-block;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700}
  .filter-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}
  .filter-btn{padding:6px 13px;border-radius:20px;font-size:12px;font-weight:600;border:1.5px solid ${C.border};background:${C.white};color:${C.muted};cursor:pointer;transition:all .2s;font-family:inherit}
  .filter-btn.active{border-color:${C.teal};background:${C.tealLight};color:#0e8fa0}

  /* Schedule */
  .sched-card{display:flex;align-items:center;gap:14px;background:${C.white};border-radius:14px;padding:16px 18px;border:1.5px solid ${C.border};margin-bottom:10px}
  .sched-card.pending{border-style:dashed;opacity:.75}
  .sched-date{background:${C.navy};color:${C.white};border-radius:10px;padding:9px 13px;text-align:center;flex-shrink:0;min-width:54px}
  .sched-date-day{font-size:20px;font-weight:800;line-height:1}
  .sched-date-month{font-size:9px;font-weight:600;opacity:.7;text-transform:uppercase;letter-spacing:.5px}
  .sched-info{flex:1}
  .sched-title{font-size:14px;font-weight:700;color:${C.navy};margin-bottom:2px}
  .sched-sub{font-size:12px;color:${C.muted}}
  .stat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:18px}
  .stat-card{background:${C.white};border-radius:12px;padding:14px;border:1px solid ${C.border};text-align:center}
  .stat-val{font-size:24px;font-weight:800;color:${C.navy}}
  .stat-label{font-size:10px;color:${C.muted};font-weight:700;text-transform:uppercase;letter-spacing:.5px;margin-top:2px}

  /* Modal */
  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px}
  .modal{background:${C.white};border-radius:20px;padding:26px;width:100%;max-width:500px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.3)}
  .modal-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px}
  .modal-title{font-size:17px;font-weight:800;color:${C.navy}}
  .modal-close{background:none;border:none;cursor:pointer;color:${C.muted};padding:2px}
  .divider{height:1px;background:${C.border};margin:14px 0}
  .info-row{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid ${C.bg};font-size:13px}
  .info-row:last-child{border-bottom:none}
  .info-label{color:${C.muted};font-weight:500}
  .info-val{font-weight:600;color:${C.navy};text-align:right}

  /* Alert */
  .alert{padding:11px 15px;border-radius:10px;font-size:13px;font-weight:500;margin-bottom:14px;display:flex;align-items:center;gap:8px}
  .alert-error{background:${C.errorLight};color:${C.error};border:1px solid #f5c6c2}
  .alert-success{background:${C.successLight};color:${C.success};border:1px solid #c3e6cb}

  /* Misc */
  .or-divider{display:flex;align-items:center;gap:10px;margin:16px 0}
  .or-line{flex:1;height:1px;background:${C.border}}
  .or-text{font-size:12px;color:${C.muted};font-weight:500;white-space:nowrap}
  .empty-state{text-align:center;padding:48px 20px;color:${C.muted}}
  .empty-icon{font-size:44px;margin-bottom:10px}
  .empty-text{font-size:15px;font-weight:600;color:${C.navy};margin-bottom:4px}
  .empty-sub{font-size:13px}

  @media(max-width:600px){
    .auth-card{padding:24px 18px}
    .form-row{flex-direction:column;gap:0}
    .stat-grid{grid-template-columns:repeat(2,1fr)}
    .nav-tab span{display:none}
  }
`;

// ── App ────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen]       = useState("auth");
  const [tab, setTab]             = useState("jobs");
  const [authMode, setAuthMode]   = useState("login");
  const [alert, setAlert]         = useState(null);
  const [modal, setModal]         = useState(null);
  const [filterCat, setFilterCat] = useState("Semua");
  const [editProfile, setEditProfile] = useState(false);
  const [regStep, setRegStep]     = useState(1);

  // ── Shared state (single source of truth) ──
  const [appliedJobs, setAppliedJobs] = useState([]); // jobs user applied to
  const [schedule, setSchedule]       = useState([]);  // confirmed + pending shifts
  const [profile, setProfile]         = useState({
    nama:"Ahmad Firdaus bin Ismail", ic:"030512-11-5678", matrik:"T22C1234",
    fakulti:"Fakulti Sains & Teknologi Laut", program:"Sains Kelautan",
    semester:"Tahun 2 / Semester 3", telefon:"0123456789",
    email:"firdaus@stdmail.umt.edu.my", alamat:"Kolej Kediaman Tun Fatimah, UMT",
    statusPendapatan:"B40", namaBank:"Maybank", noAkaun:"1234-5678-9012", png:"3.45",
  });

  const [loginForm, setLoginForm] = useState({ email:"", password:"" });
  const [regForm, setRegForm]     = useState({
    nama:"", ic:"", matrik:"", fakulti:"", program:"", semester:"",
    telefon:"", email:"", alamat:"", statusPendapatan:"B40",
    namaBank:"", noAkaun:"", password:"", confirmPassword:"",
  });

  // ── Derived stats (auto-computed from schedule) ──
  const confirmedShifts  = schedule.filter(s => s.status === "Disahkan");
  const totalHours       = confirmedShifts.reduce((a, s) => a + s.hours, 0);
  const totalEarnings    = totalHours * 6;
  const pendingShifts    = schedule.filter(s => s.status !== "Disahkan");

  // ── Helpers ──
  const showAlert = (msg, type="error") => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleLogin = () => {
    if (!loginForm.email || !loginForm.password) { showAlert("Sila isi semua medan."); return; }
    showAlert("Log masuk berjaya! Selamat datang.", "success");
    setTimeout(() => { setAlert(null); setScreen("main"); setTab("jobs"); }, 1000);
  };

  const handleRegister = () => {
    if (regStep === 1) {
      const { nama, ic, matrik, fakulti, program, semester, telefon, email, alamat } = regForm;
      if (!nama||!ic||!matrik||!fakulti||!program||!semester||!telefon||!email||!alamat) {
        showAlert("Sila lengkapkan semua maklumat pemohon."); return;
      }
      setRegStep(2);
    } else {
      const { namaBank, noAkaun, password, confirmPassword } = regForm;
      if (!namaBank||!noAkaun||!password) { showAlert("Sila lengkapkan maklumat kewangan dan kata laluan."); return; }
      if (password !== confirmPassword)   { showAlert("Kata laluan tidak sepadan."); return; }
      if (password.length < 8)            { showAlert("Kata laluan mesti sekurang-kurangnya 8 aksara."); return; }
      // Sync registration data into profile
      setProfile(p => ({ ...p, ...regForm, png:"2.50" }));
      showAlert("Pendaftaran berjaya! Sila log masuk.", "success");
      setTimeout(() => { setAlert(null); setAuthMode("login"); setRegStep(1); }, 1500);
    }
  };

  // Apply for a job → adds to appliedJobs + adds a PENDING shift to schedule
  const handleApply = (job) => {
    if (appliedJobs.find(j => j.id === job.id)) {
      showAlert("Anda sudah memohon jawatan ini."); setModal(null); return;
    }
    const newShift = {
      id: Date.now(), jobId: job.id, title: job.title, dept: job.dept,
      date: null, time: job.hours, status: "Menunggu", hours: 0,
    };
    setAppliedJobs(prev => [...prev, job]);
    setSchedule(prev => [...prev, newShift]);
    setModal(null);
    showAlert(`Permohonan "${job.title}" telah dihantar!`, "success");
  };

  // Withdraw application → removes from both appliedJobs and schedule
  const handleWithdraw = (jobId) => {
    setAppliedJobs(prev => prev.filter(j => j.id !== jobId));
    setSchedule(prev => prev.filter(s => s.jobId !== jobId));
    showAlert("Permohonan telah ditarik balik.", "success");
  };

  const categories  = ["Semua", ...Object.keys(CAT_COLORS)];
  const filteredJobs = filterCat === "Semua" ? JOBS : JOBS.filter(j => j.category === filterCat);

  // ── AUTH SCREEN ──────────────────────────────────────────────
  if (screen === "auth") return (
    <>
      <style>{css}</style>
      <div className="auth-wrap">
        <div className="auth-card">
          <div style={{textAlign:"center",marginBottom:24}}>
            <div className="auth-logo-badge">MySISWA<span>@JoC</span></div>
            <p style={{fontSize:12,color:C.muted,marginTop:8}}>Universiti Malaysia Terengganu</p>
          </div>

          {alert && <div className={`alert alert-${alert.type}`}>{alert.msg}</div>}

          <div className="auth-tabs">
            <button className={`auth-tab ${authMode==="login"?"active":""}`}
              onClick={()=>{ setAuthMode("login"); setRegStep(1); setAlert(null); }}>Log Masuk</button>
            <button className={`auth-tab ${authMode==="register"?"active":""}`}
              onClick={()=>{ setAuthMode("register"); setAlert(null); }}>Daftar</button>
          </div>

          {authMode === "login" ? (
            <>
              <div className="form-group">
                <label className="form-label">Emel</label>
                <input className="form-input" placeholder="emel@contoh.com"
                  value={loginForm.email} onChange={e=>setLoginForm({...loginForm,email:e.target.value})}/>
              </div>
              <div className="form-group">
                <label className="form-label">Kata Laluan</label>
                <input className="form-input" type="password" placeholder="••••••••"
                  value={loginForm.password} onChange={e=>setLoginForm({...loginForm,password:e.target.value})}/>
              </div>
              <button className="btn-primary" onClick={handleLogin}>Log Masuk</button>
              <div className="or-divider"><div className="or-line"/><span className="or-text">atau log masuk dengan</span><div className="or-line"/></div>
              <button className="btn-google"
                onClick={()=>showAlert("Google Sign-In memerlukan konfigurasi OAuth pada pelayan UMT.", "error")}>
                <GoogleLogo/> Teruskan dengan Google
              </button>
              <p style={{textAlign:"center",fontSize:12,color:C.muted,marginTop:14}}>
                Lupa kata laluan? <a href="#" style={{color:C.teal,fontWeight:600,textDecoration:"none"}}>Set Semula</a>
              </p>
            </>
          ) : (
            <>
              {regStep === 1 ? (
                <>
                  <p style={{fontSize:12,fontWeight:700,color:C.navy,marginBottom:14}}>Langkah 1/2 — Maklumat Pemohon</p>
                  <div className="form-group">
                    <label className="form-label">Nama Penuh</label>
                    <input className="form-input" placeholder="Seperti dalam IC"
                      value={regForm.nama} onChange={e=>setRegForm({...regForm,nama:e.target.value})}/>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">No. Kad Pengenalan</label>
                      <input className="form-input" placeholder="000000-00-0000"
                        value={regForm.ic} onChange={e=>setRegForm({...regForm,ic:e.target.value})}/>
                    </div>
                    <div className="form-group">
                      <label className="form-label">No. Matrik</label>
                      <input className="form-input" placeholder="T00X0000"
                        value={regForm.matrik} onChange={e=>setRegForm({...regForm,matrik:e.target.value})}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Fakulti / Pusat / Institut</label>
                    <input className="form-input" placeholder="Fakulti anda"
                      value={regForm.fakulti} onChange={e=>setRegForm({...regForm,fakulti:e.target.value})}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Program Pengajian</label>
                    <input className="form-input" placeholder="Nama program"
                      value={regForm.program} onChange={e=>setRegForm({...regForm,program:e.target.value})}/>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Tahun / Semester</label>
                      <input className="form-input" placeholder="Thn 2 / Sem 3"
                        value={regForm.semester} onChange={e=>setRegForm({...regForm,semester:e.target.value})}/>
                    </div>
                    <div className="form-group">
                      <label className="form-label">No. Telefon</label>
                      <input className="form-input" placeholder="01X-XXXXXXX"
                        value={regForm.telefon} onChange={e=>setRegForm({...regForm,telefon:e.target.value})}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Emel</label>
                    <input className="form-input" placeholder="emel@contoh.com"
                      value={regForm.email} onChange={e=>setRegForm({...regForm,email:e.target.value})}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Alamat Semasa</label>
                    <input className="form-input" placeholder="Kolej / Alamat kediaman"
                      value={regForm.alamat} onChange={e=>setRegForm({...regForm,alamat:e.target.value})}/>
                  </div>
                </>
              ) : (
                <>
                  <p style={{fontSize:12,fontWeight:700,color:C.navy,marginBottom:14}}>Langkah 2/2 — Maklumat Kewangan & Kata Laluan</p>
                  <div className="form-group">
                    <label className="form-label">Status Pendapatan Keluarga</label>
                    <div style={{display:"flex",gap:20,marginTop:4}}>
                      {["B40","M40","OKU"].map(s=>(
                        <label key={s} className="check-item">
                          <input type="radio" name="status" checked={regForm.statusPendapatan===s}
                            onChange={()=>setRegForm({...regForm,statusPendapatan:s})}/>{s}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Nama Bank</label>
                      <input className="form-input" placeholder="Maybank"
                        value={regForm.namaBank} onChange={e=>setRegForm({...regForm,namaBank:e.target.value})}/>
                    </div>
                    <div className="form-group">
                      <label className="form-label">No. Akaun Bank</label>
                      <input className="form-input" placeholder="No. akaun"
                        value={regForm.noAkaun} onChange={e=>setRegForm({...regForm,noAkaun:e.target.value})}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Kata Laluan</label>
                    <input className="form-input" type="password" placeholder="Min. 8 aksara"
                      value={regForm.password} onChange={e=>setRegForm({...regForm,password:e.target.value})}/>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Sahkan Kata Laluan</label>
                    <input className="form-input" type="password" placeholder="Ulang kata laluan"
                      value={regForm.confirmPassword} onChange={e=>setRegForm({...regForm,confirmPassword:e.target.value})}/>
                  </div>
                </>
              )}
              <div style={{display:"flex",gap:10}}>
                {regStep===2 && <button className="btn-sm btn-outline" style={{flex:1,padding:12}} onClick={()=>setRegStep(1)}>← Kembali</button>}
                <button className="btn-primary" style={{flex:2}} onClick={handleRegister}>
                  {regStep===1 ? "Seterusnya →" : "Daftar Sekarang"}
                </button>
              </div>
              {regStep===1 && (
                <>
                  <div className="or-divider"><div className="or-line"/><span className="or-text">atau daftar dengan</span><div className="or-line"/></div>
                  <button className="btn-google" onClick={()=>{
                    setRegForm(f=>({...f, nama:"Nur Aisyah binti Rahman", email:"aisyah@stdmail.umt.edu.my", matrik:"T23C5678"}));
                    showAlert("Akaun Google disambung. Lengkapkan maklumat selebihnya.", "success");
                  }}><GoogleLogo/> Daftar dengan Google</button>
                  <p style={{textAlign:"center",fontSize:11,color:C.muted,marginTop:10}}>
                    Gunakan akaun <strong>@stdmail.umt.edu.my</strong> untuk isi maklumat asas secara automatik.
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );

  // ── MAIN APP ─────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>
      <div className="app">

        <nav className="nav">
          <div className="nav-brand">MySISWA<span>@JoC</span></div>
          <div className="nav-tabs">
            {[{k:"jobs",i:"briefcase",l:"Kerja"},{k:"schedule",i:"calendar",l:"Jadual"},{k:"profile",i:"user",l:"Profil"}].map(t=>(
              <button key={t.k} className={`nav-tab ${tab===t.k?"active":""}`} onClick={()=>setTab(t.k)}>
                <Icon name={t.i}/><span>{t.l}</span>
                {t.k==="schedule" && appliedJobs.length>0 &&
                  <span style={{background:C.teal,color:"#fff",borderRadius:"50%",fontSize:10,fontWeight:800,width:16,height:16,display:"flex",alignItems:"center",justifyContent:"center"}}>{appliedJobs.length}</span>
                }
              </button>
            ))}
          </div>
          <button className="nav-logout" onClick={()=>{ setScreen("auth"); setAppliedJobs([]); setSchedule([]); setTab("jobs"); }}>
            <Icon name="logout" size={15}/><span>Keluar</span>
          </button>
        </nav>

        {alert && (
          <div style={{position:"fixed",top:68,left:"50%",transform:"translateX(-50%)",zIndex:300,minWidth:280,maxWidth:400}}>
            <div className={`alert alert-${alert.type}`} style={{boxShadow:"0 4px 16px rgba(0,0,0,.15)"}}>{alert.msg}</div>
          </div>
        )}

        {/* ── JOBS ── */}
        {tab==="jobs" && (
          <div className="page">
            <div className="section-title">Pekerjaan <span>Tersedia</span></div>
            <div className="filter-row">
              {categories.map(cat=>(
                <button key={cat} className={`filter-btn ${filterCat===cat?"active":""}`} onClick={()=>setFilterCat(cat)}>{cat}</button>
              ))}
            </div>
            {filteredJobs.map(job=>{
              const cc = CAT_COLORS[job.category]||{bg:"#f1f4f8",text:C.muted};
              const applied = !!appliedJobs.find(j=>j.id===job.id);
              return (
                <div key={job.id} className="job-card" onClick={()=>setModal(job)}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                    <div>
                      <div className="job-title">{job.title}</div>
                      <div className="job-dept">{job.dept}</div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5}}>
                      <span className="cat-pill" style={{background:cc.bg,color:cc.text}}>{job.category}</span>
                      {applied && <span className="badge badge-success"><Icon name="check" size={10}/>Dipohon</span>}
                    </div>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div className="job-meta">
                      <span className="job-meta-item"><Icon name="clock" size={12}/>{job.hours}</span>
                      <span className="job-meta-item">📅 {job.days}</span>
                      <span className="job-meta-item">👥 {job.slots} kekosongan</span>
                    </div>
                    <strong style={{color:C.teal,fontSize:14}}>RM {job.rate}/jam</strong>
                  </div>
                  <div style={{fontSize:11,color:C.muted,marginTop:8}}>Disiarkan: {job.posted}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── SCHEDULE ── */}
        {tab==="schedule" && (
          <div className="page">
            <div className="section-title">Jadual <span>Kerja Saya</span></div>

            <div className="stat-grid">
              <div className="stat-card"><div className="stat-val">{appliedJobs.length}</div><div className="stat-label">Permohonan</div></div>
              <div className="stat-card"><div className="stat-val">{totalHours}j</div><div className="stat-label">Jumlah Jam</div></div>
              <div className="stat-card"><div className="stat-val" style={{color:C.success}}>RM {totalEarnings}</div><div className="stat-label">Pendapatan</div></div>
            </div>

            {schedule.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📅</div>
                <div className="empty-text">Tiada jadual lagi</div>
                <div className="empty-sub">Mohon pekerjaan untuk mula melihat jadual anda di sini</div>
                <button className="btn-sm btn-teal" style={{margin:"16px auto 0",display:"inline-flex"}} onClick={()=>setTab("jobs")}>
                  Lihat Pekerjaan
                </button>
              </div>
            ) : (
              <>
                {confirmedShifts.length > 0 && (
                  <>
                    <p style={{fontSize:12,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:.5,marginBottom:10}}>✅ Disahkan ({confirmedShifts.length})</p>
                    {confirmedShifts.map(s=>(
                      <div key={s.id} className="sched-card">
                        <div className="sched-date">
                          <div className="sched-date-day">{s.date ? s.date.split(" ")[0] : "—"}</div>
                          <div className="sched-date-month">{s.date ? s.date.split(" ")[1] : "TBC"}</div>
                        </div>
                        <div className="sched-info">
                          <div className="sched-title">{s.title}</div>
                          <div className="sched-sub">{s.dept} · {s.time}{s.hours>0 ? ` · ${s.hours} jam` : ""}</div>
                        </div>
                        <span className="badge badge-success"><Icon name="check" size={10}/>Disahkan</span>
                      </div>
                    ))}
                  </>
                )}

                {pendingShifts.length > 0 && (
                  <>
                    <p style={{fontSize:12,fontWeight:700,color:C.muted,textTransform:"uppercase",letterSpacing:.5,margin:"16px 0 10px"}}>⏳ Menunggu Kelulusan ({pendingShifts.length})</p>
                    {pendingShifts.map(s=>(
                      <div key={s.id} className="sched-card pending">
                        <div className="sched-date" style={{background:C.muted}}>
                          <div className="sched-date-day">—</div>
                          <div className="sched-date-month">TBC</div>
                        </div>
                        <div className="sched-info">
                          <div className="sched-title">{s.title}</div>
                          <div className="sched-sub">{s.dept} · Menunggu kelulusan penyelia</div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end"}}>
                          <span className="badge badge-amber"><Icon name="clock" size={10}/>Proses</span>
                          <button className="btn-sm btn-danger" style={{fontSize:11,padding:"4px 8px"}}
                            onClick={()=>handleWithdraw(s.jobId)}>
                            <Icon name="trash" size={11}/>Tarik Balik
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        )}

        {/* ── PROFILE ── */}
        {tab==="profile" && (
          <div className="page">
            <div className="profile-header">
              <div className="avatar">{profile.nama.charAt(0)}</div>
              <div style={{flex:1}}>
                <div className="profile-name">{profile.nama}</div>
                <div className="profile-meta">{profile.matrik} · {profile.program}</div>
                <div style={{marginTop:8,display:"flex",gap:8,flexWrap:"wrap"}}>
                  <span className="badge" style={{background:"rgba(43,181,200,.25)",color:"#7ee8f3"}}>PNG {profile.png}</span>
                  <span className="badge" style={{background:"rgba(245,166,35,.2)",color:"#ffd580"}}>{profile.statusPendapatan}</span>
                </div>
              </div>
              <button className="btn-sm btn-outline" style={{color:"rgba(255,255,255,.8)",borderColor:"rgba(255,255,255,.3)",background:"rgba(255,255,255,.1)"}}
                onClick={()=>setEditProfile(!editProfile)}>
                <Icon name="edit" size={13}/>{editProfile?"Batal":"Edit"}
              </button>
            </div>

            {/* Live stats from shared state */}
            <div className="stat-grid">
              <div className="stat-card"><div className="stat-val">{appliedJobs.length}</div><div className="stat-label">Permohonan</div></div>
              <div className="stat-card"><div className="stat-val">{totalHours}j</div><div className="stat-label">Jam Kerja</div></div>
              <div className="stat-card"><div className="stat-val" style={{color:C.success}}>RM {totalEarnings}</div><div className="stat-label">Pendapatan</div></div>
            </div>

            <div className="card">
              <div style={{fontWeight:700,color:C.navy,marginBottom:12,fontSize:13}}>📋 Maklumat Peribadi</div>
              {editProfile ? (
                <>
                  <div className="form-row">
                    <div className="form-group"><label className="form-label">No. Telefon</label>
                      <input className="form-input" value={profile.telefon} onChange={e=>setProfile({...profile,telefon:e.target.value})}/></div>
                    <div className="form-group"><label className="form-label">Semester</label>
                      <input className="form-input" value={profile.semester} onChange={e=>setProfile({...profile,semester:e.target.value})}/></div>
                  </div>
                  <div className="form-group"><label className="form-label">Alamat Semasa</label>
                    <input className="form-input" value={profile.alamat} onChange={e=>setProfile({...profile,alamat:e.target.value})}/></div>
                  <div className="form-group"><label className="form-label">PNG Terkini</label>
                    <input className="form-input" value={profile.png} onChange={e=>setProfile({...profile,png:e.target.value})}/></div>
                  <button className="btn-sm btn-teal" style={{width:"100%",padding:11,justifyContent:"center"}}
                    onClick={()=>{ setEditProfile(false); showAlert("Profil dikemaskini!","success"); }}>Simpan Perubahan</button>
                </>
              ) : (
                [["No. Kad Pengenalan",profile.ic],["No. Matrik",profile.matrik],["Fakulti",profile.fakulti],
                 ["Program Pengajian",profile.program],["Tahun / Semester",profile.semester],
                 ["No. Telefon",profile.telefon],["Emel",profile.email],["Alamat Semasa",profile.alamat]
                ].map(([k,v])=>(
                  <div key={k} className="info-row"><span className="info-label">{k}</span><span className="info-val">{v}</span></div>
                ))
              )}
            </div>

            <div className="card">
              <div style={{fontWeight:700,color:C.navy,marginBottom:12,fontSize:13}}>🏦 Maklumat Kewangan</div>
              {[["Status Keluarga",<span key="s" className="badge badge-teal">{profile.statusPendapatan}</span>],
                ["Nama Bank",profile.namaBank],["No. Akaun",profile.noAkaun]
              ].map(([k,v])=>(
                <div key={k} className="info-row"><span className="info-label">{k}</span><span className="info-val">{v}</span></div>
              ))}
            </div>

            {/* Applied jobs list — synced with jobs page */}
            {appliedJobs.length > 0 && (
              <div className="card">
                <div style={{fontWeight:700,color:C.navy,marginBottom:12,fontSize:13}}>💼 Pekerjaan Dipohon</div>
                {appliedJobs.map(j=>{
                  const cc = CAT_COLORS[j.category]||{bg:"#f1f4f8",text:C.muted};
                  return (
                    <div key={j.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${C.bg}`}}>
                      <div>
                        <div style={{fontSize:13,fontWeight:700,color:C.navy}}>{j.title}</div>
                        <div style={{fontSize:11,color:C.muted}}>{j.dept}</div>
                        <span className="cat-pill" style={{background:cc.bg,color:cc.text,marginTop:4,display:"inline-block"}}>{j.category}</span>
                      </div>
                      <button className="btn-sm btn-danger" onClick={()=>handleWithdraw(j.id)}>
                        <Icon name="trash" size={12}/>Tarik Balik
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── JOB MODAL ── */}
        {modal && (
          <div className="modal-overlay" onClick={()=>setModal(null)}>
            <div className="modal" onClick={e=>e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <div className="modal-title">{modal.title}</div>
                  <div style={{fontSize:12,color:C.muted,marginTop:2}}>{modal.dept}</div>
                </div>
                <button className="modal-close" onClick={()=>setModal(null)}><Icon name="x" size={20}/></button>
              </div>
              {(()=>{ const c=CAT_COLORS[modal.category]||{bg:"#f1f4f8",text:C.muted}; return (
                <span className="cat-pill" style={{background:c.bg,color:c.text,fontSize:12,padding:"5px 12px"}}>{modal.category}</span>
              );})()}
              <div className="divider"/>
              {[["Kadar Bayaran",`RM ${modal.rate}.00/jam`],["Waktu Kerja",`${modal.hours} · ${modal.days}`],
                ["Kekosongan",`${modal.slots} jawatan`],["Tarikh Disiarkan",modal.posted]
              ].map(([k,v])=>(
                <div key={k} className="info-row"><span className="info-label">{k}</span><span className="info-val">{v}</span></div>
              ))}
              <div className="divider"/>
              <div style={{background:C.amberLight,borderRadius:10,padding:"11px 13px",marginBottom:16,fontSize:12,color:"#7a5010"}}>
                ⚠️ Pastikan PNG anda ≥ 2.50 dan sertakan dokumen yang diperlukan semasa menghantar borang kepada UMT-GEM.
              </div>
              {appliedJobs.find(j=>j.id===modal.id)
                ? <button className="btn-primary" style={{background:C.success,cursor:"default"}}>✓ Sudah Dipohon</button>
                : <button className="btn-primary" onClick={()=>handleApply(modal)}>Mohon Sekarang</button>
              }
            </div>
          </div>
        )}

      </div>
    </>
  );
}
