import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  ArrowRight,
  Award,
  BadgeCheck,
  Bell,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Cloud,
  Database,
  ExternalLink,
  FileCheck2,
  FilePlus2,
  Github,
  GraduationCap,
  Home,
  LayoutDashboard,
  ListChecks,
  Loader2,
  LockKeyhole,
  QrCode,
  RefreshCcw,
  Search,
  Settings,
  ShieldCheck,
  Sheet,
  UserRound,
  UsersRound,
  XCircle
} from "lucide-react";
import { certificateRows, cohorts, metrics, syncEvents } from "./sampleData";
import { createCertificateRecord, renewCertificateRecord } from "./services/googleSheets";
import "./styles.css";

const statusLabel = {
  active: "ใช้งานได้",
  renewal: "ใกล้หมดอายุ",
  expired: "หมดอายุ",
  pending: "รอตรวจสอบ"
};

const statusIcon = {
  active: CheckCircle2,
  renewal: CalendarClock,
  expired: XCircle,
  pending: Loader2
};

const navItems = [
  ["dashboard", "ภาพรวม", LayoutDashboard],
  ["issue", "ออกใบประกาศ", FilePlus2],
  ["renew", "ต่ออายุ", RefreshCcw],
  ["verify", "ตรวจสอบ", ShieldCheck],
  ["cohorts", "รุ่นอบรม", GraduationCap],
  ["recipients", "ผู้รับใบประกาศ", UsersRound],
  ["reports", "รายงาน", ListChecks],
  ["settings", "ตั้งค่า", Settings]
];

function RootApp() {
  const [path, setPath] = useState(window.location.pathname);

  function navigate(nextPath) {
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  React.useEffect(() => {
    const syncPath = () => setPath(window.location.pathname);
    window.addEventListener("popstate", syncPath);
    return () => window.removeEventListener("popstate", syncPath);
  }, []);

  if (path.startsWith("/admin")) {
    return <AdminApp navigate={navigate} />;
  }

  if (path.startsWith("/verify")) {
    return <PublicVerifyPage navigate={navigate} />;
  }

  return <LandingPage navigate={navigate} />;
}

function LandingPage({ navigate }) {
  return (
    <main className="public-page">
      <PublicHeader navigate={navigate} />
      <section className="landing-hero">
        <div className="landing-copy">
          <div className="institution-line">
            <Activity size={20} />
            สถาบันการแพทย์ฉุกเฉินแห่งชาติ
          </div>
          <h1>ระบบกลางใบประกาศด้านการแพทย์ฉุกเฉิน</h1>
          <p>
            แพลตฟอร์มสำหรับออก ต่ออายุ และตรวจสอบใบประกาศของวิทยาลัยวิชาการเตรียมความพร้อมด้านการแพทย์ฉุกเฉิน
            เชื่อมข้อมูลจาก Google Sheets พร้อมเผยแพร่การตรวจสอบผ่าน Vercel
          </p>
          <div className="landing-actions">
            <button className="primary-action" type="button" onClick={() => navigate("/verify")}>
              <QrCode size={18} />
              ตรวจสอบใบประกาศ
            </button>
            <button className="secondary-action" type="button" onClick={() => navigate("/admin")}>
              <LockKeyhole size={18} />
              เข้าสู่ระบบเจ้าหน้าที่
            </button>
          </div>
        </div>

        <div className="landing-visual" aria-label="ภาพรวมระบบใบประกาศ">
          <div className="certificate-art">
            <div className="cert-topline">
              <span>NIEM Certificate</span>
              <BadgeCheck size={22} />
            </div>
            <h2>ใบประกาศนียบัตร</h2>
            <p>Emergency Medical Responder</p>
            <div className="cert-recipient">วรัญญา สุขประเสริฐ</div>
            <div className="cert-meta">
              <span>NIEM-EMR-2569-0012</span>
              <span>หมดอายุ 17 ม.ค. 2572</span>
            </div>
          </div>
          <div className="verify-card">
            <QrCode size={64} />
            <div>
              <strong>ตรวจสอบได้ทันที</strong>
              <span>ค้นหาด้วยเลขที่ใบประกาศหรือสแกน QR</span>
            </div>
          </div>
        </div>
      </section>

      <section className="public-section">
        <div className="public-section-head">
          <h2>ออกแบบเพื่อการตรวจสอบที่เชื่อถือได้</h2>
          <p>ผู้เรียน หน่วยงานต้นสังกัด และประชาชนสามารถตรวจสอบสถานะใบประกาศจากทะเบียนกลางได้ในขั้นตอนเดียว</p>
        </div>
        <div className="feature-strip">
          <article>
            <FilePlus2 size={24} />
            <h3>ออกใบประกาศ</h3>
            <p>สร้างเลขที่ใบประกาศและบันทึกข้อมูลเข้าฐานข้อมูลกลาง</p>
          </article>
          <article>
            <RefreshCcw size={24} />
            <h3>ต่ออายุ</h3>
            <p>ติดตามใบประกาศที่ใกล้หมดอายุและจัดการคำขอต่ออายุ</p>
          </article>
          <article>
            <ShieldCheck size={24} />
            <h3>ตรวจสอบ</h3>
            <p>แสดงผลสถานะ ผู้รับ หลักสูตร วันที่ออก และวันหมดอายุ</p>
          </article>
          <article>
            <Database size={24} />
            <h3>Google Sheets</h3>
            <p>ใช้ชีตเป็นฐานข้อมูลกลางที่เจ้าหน้าที่ดูแลต่อได้ง่าย</p>
          </article>
        </div>
      </section>
    </main>
  );
}

function PublicVerifyPage({ navigate }) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const result = useMemo(() => {
    const needle = submittedQuery.trim().toLowerCase();
    if (!needle) return null;
    return certificateRows.find((row) => {
      return (
        row.certNo.toLowerCase() === needle ||
        row.name.toLowerCase().includes(needle)
      );
    }) ?? null;
  }, [submittedQuery]);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmittedQuery(query.trim());
  }

  return (
    <main className="public-page verify-page">
      <PublicHeader navigate={navigate} />
      <section className="verify-hero">
        <div>
          <div className="institution-line">
            <ShieldCheck size={20} />
            ระบบตรวจสอบใบประกาศสาธารณะ
          </div>
          <h1>ตรวจสอบความถูกต้องของใบประกาศ</h1>
          <p>กรอกเลขที่ใบประกาศหรือชื่อผู้รับใบประกาศ ระบบจะแสดงสถานะจากทะเบียนกลางของสถาบันการแพทย์ฉุกเฉินแห่งชาติ</p>
        </div>
        <form className="public-search" onSubmit={handleSubmit}>
          <Search size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="เช่น NIEM-EMR-2569-0012"
          />
          <button type="submit">
            ตรวจสอบ
            <ArrowRight size={18} />
          </button>
        </form>
      </section>

      <section className="verify-layout">
        <CertificateResult result={result} query={submittedQuery} />
        <aside className="verify-help">
          <h2>ช่องทางการตรวจสอบ</h2>
          <div className="help-row">
            <QrCode size={22} />
            <div>
              <strong>สแกน QR บนใบประกาศ</strong>
              <span>ระบบจะพาไปยังหน้า verify ของเลขที่ใบประกาศนั้น</span>
            </div>
          </div>
          <div className="help-row">
            <Search size={22} />
            <div>
              <strong>ค้นหาด้วยเลขที่ใบประกาศ</strong>
              <span>แนะนำให้กรอกเลขที่เต็มเพื่อผลลัพธ์ที่แม่นยำ</span>
            </div>
          </div>
          <div className="help-row">
            <Building2 size={22} />
            <div>
              <strong>ติดต่อสถาบัน</strong>
              <span>หากพบข้อมูลไม่ตรง ให้ติดต่อเจ้าหน้าที่ทะเบียนใบประกาศ</span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function CertificateResult({ result, query }) {
  if (!result) {
    return (
      <section className="public-result empty">
        <XCircle size={34} />
        <h2>ไม่พบข้อมูลใบประกาศ</h2>
        <p>ไม่พบรายการที่ตรงกับ “{query}” กรุณาตรวจสอบเลขที่ใบประกาศอีกครั้ง</p>
      </section>
    );
  }

  const StatusIcon = statusIcon[result.status];

  return (
    <section className="public-result">
      <div className="result-head">
        <div>
          <span>ผลการตรวจสอบ</span>
          <h2>{result.certNo}</h2>
        </div>
        <span className={`status ${result.status}`}>
          <StatusIcon size={15} />
          {statusLabel[result.status]}
        </span>
      </div>
      <div className="result-card-body">
        <div className="result-qr">
          <QrCode size={112} />
          <span>Public Verify</span>
        </div>
        <dl className="public-detail-list">
          <div><dt>ผู้รับใบประกาศ</dt><dd>{result.name}</dd></div>
          <div><dt>หลักสูตร</dt><dd>{result.course}</dd></div>
          <div><dt>รุ่นอบรม</dt><dd>{result.cohort}</dd></div>
          <div><dt>วันที่ออก</dt><dd>{result.issueDate}</dd></div>
          <div><dt>วันหมดอายุ</dt><dd>{result.expireDate}</dd></div>
          <div><dt>แหล่งข้อมูล</dt><dd>Google Sheets Row {result.sheetRow}</dd></div>
        </dl>
      </div>
      <div className="verification-note">
        <CheckCircle2 size={18} />
        ข้อมูลนี้ดึงจากทะเบียนกลางใบประกาศและสามารถนำไปอ้างอิงสถานะล่าสุดของใบประกาศได้
      </div>
    </section>
  );
}

function PublicHeader({ navigate }) {
  return (
    <header className="public-header">
      <button className="public-brand" type="button" onClick={() => navigate("/")}>
        <span className="brand-mark small"><Activity size={20} /></span>
        <span>
          <strong>NIEM CertHub</strong>
          <small>ศูนย์กลางใบประกาศ</small>
        </span>
      </button>
      <nav>
        <button type="button" onClick={() => navigate("/")}>
          <Home size={17} />
          หน้าแรก
        </button>
        <button type="button" onClick={() => navigate("/verify")}>
          <QrCode size={17} />
          ตรวจสอบใบประกาศ
        </button>
        <button className="admin-link" type="button" onClick={() => navigate("/admin")}>
          เจ้าหน้าที่
          <ExternalLink size={16} />
        </button>
      </nav>
    </header>
  );
}

function AdminApp({ navigate }) {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(certificateRows[0].id);
  const [drawerMode, setDrawerMode] = useState("issue");
  const [toast, setToast] = useState("");
  const [isSaving, setSaving] = useState(false);
  const [rows, setRows] = useState(certificateRows);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const text = `${row.certNo} ${row.name} ${row.course} ${row.cohort}`.toLowerCase();
      const matchesQuery = text.includes(query.trim().toLowerCase());
      const matchesStatus = statusFilter === "all" || row.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, rows, statusFilter]);

  const selected = rows.find((row) => row.id === selectedId) ?? rows[0];

  async function handleIssue(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = (formData.get("name") ?? "").trim().slice(0, 200);
    const certNoRaw = (formData.get("certNo") ?? "").trim().slice(0, 50);
    const cohort = (formData.get("cohort") ?? "").trim().slice(0, 100);
    const issueDate = formData.get("issueDate");
    const expireDate = formData.get("expireDate");

    if (!name || !cohort || !issueDate || !expireDate) return;
    if (expireDate <= issueDate) {
      setToast("วันหมดอายุต้องอยู่หลังวันที่ออก");
      return;
    }

    const certNo = certNoRaw || `NIEM-CPR-${new Date().getFullYear()}-${String(rows.length + 1).padStart(4, "0")}`;
    const record = {
      id: `cert-${Date.now()}`,
      certNo,
      name,
      course: formData.get("course"),
      cohort,
      issueDate,
      expireDate,
      status: "active",
      verifier: "ระบบออกใบประกาศ",
      sheetRow: null
    };

    setSaving(true);
    try {
      await createCertificateRecord(record);
      setRows((current) => [record, ...current]);
      setSelectedId(record.id);
      setToast("บันทึกใบประกาศใหม่และเตรียม sync ไป Google Sheets แล้ว");
      event.currentTarget.reset();
    } catch {
      setToast("เกิดข้อผิดพลาดในการบันทึก กรุณาลองอีกครั้ง");
    } finally {
      setSaving(false);
    }
  }

  async function handleRenew() {
    const renewed = {
      ...selected,
      expireDate: "2570-12-31",
      status: "active",
      verifier: "ต่ออายุโดยเจ้าหน้าที่"
    };
    setSaving(true);
    try {
      await renewCertificateRecord(renewed);
      setRows((current) => current.map((row) => (row.id === selected.id ? renewed : row)));
      setToast(`ต่ออายุ ${selected.certNo} สำเร็จ และรอ sync ไป Google Sheets`);
    } catch {
      setToast("เกิดข้อผิดพลาดในการต่ออายุ กรุณาลองอีกครั้ง");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <Activity size={24} />
          </div>
          <div>
            <strong>NIEM CertHub</strong>
            <span>วิทยาลัยวิชาการเตรียมความพร้อมด้านการแพทย์ฉุกเฉิน</span>
          </div>
        </div>

        <nav className="nav-list" aria-label="เมนูหลัก">
          <button className="nav-item public-nav" type="button" onClick={() => navigate("/")}>
            <Home size={18} />
            <span>หน้าสาธารณะ</span>
          </button>
          {navItems.map(([id, label, Icon]) => (
            <button
              className={activeNav === id ? "nav-item active" : "nav-item"}
              key={id}
              type="button"
              onClick={() => {
                setActiveNav(id);
                if (id === "issue" || id === "renew") setDrawerMode(id);
              }}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-sync">
          <Cloud size={18} />
          <div>
            <strong>Google Sheets</strong>
            <span>sync ล่าสุด 09:42 น.</span>
          </div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <label className="search-box">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ค้นหาเลขที่ใบประกาศ ชื่อผู้รับ หรือหลักสูตร"
            />
          </label>
          <div className="topbar-actions">
            <button className="icon-button" type="button" aria-label="การแจ้งเตือน">
              <Bell size={18} />
            </button>
            <div className="admin-chip">
              <UserRound size={18} />
              <span>Admin NIEM</span>
            </div>
          </div>
        </header>

        {toast && (
          <button className="toast" type="button" onClick={() => setToast("")}>
            <BadgeCheck size={18} />
            <span>{toast}</span>
          </button>
        )}

        <div className="content-grid">
          <section className="main-panel">
            <div className="page-heading">
              <div>
                <h1>ศูนย์กลางใบประกาศ</h1>
                <p>ออกใบประกาศ ต่ออายุ และตรวจสอบสถานะจากฐานข้อมูล Google Sheets พร้อมบันทึกเวอร์ชันผ่าน GitHub และเผยแพร่บน Vercel</p>
              </div>
              <div className="workflow-actions">
                <button className="primary-action" type="button" onClick={() => setDrawerMode("issue")}>
                  <FilePlus2 size={18} />
                  ออกใบประกาศ
                </button>
                <button className="secondary-action" type="button" onClick={() => setDrawerMode("renew")}>
                  <RefreshCcw size={18} />
                  ต่ออายุ
                </button>
                <button className="secondary-action" type="button" onClick={() => navigate("/verify")}>
                  <QrCode size={18} />
                  หน้าตรวจสอบสาธารณะ
                </button>
              </div>
            </div>

            <div className="metrics-grid">
              {metrics.map((metric) => (
                <article className="metric" key={metric.label}>
                  <div>
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                  </div>
                  <metric.icon size={22} />
                </article>
              ))}
            </div>

            <section className="registry-section">
              <div className="section-toolbar">
                <div>
                  <h2>ทะเบียนใบประกาศ</h2>
                  <span>{filteredRows.length} รายการที่ตรงกับเงื่อนไข</span>
                </div>
                <div className="segmented">
                  {[
                    ["all", "ทั้งหมด"],
                    ["active", "ใช้งานได้"],
                    ["renewal", "ใกล้หมดอายุ"],
                    ["expired", "หมดอายุ"]
                  ].map(([id, label]) => (
                    <button
                      className={statusFilter === id ? "selected" : ""}
                      key={id}
                      type="button"
                      onClick={() => setStatusFilter(id)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>เลขที่ใบประกาศ</th>
                      <th>ผู้รับใบประกาศ</th>
                      <th>หลักสูตร</th>
                      <th>วันที่ออก</th>
                      <th>วันหมดอายุ</th>
                      <th>สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((row) => {
                      const StatusIcon = statusIcon[row.status];
                      return (
                        <tr
                          className={selected.id === row.id ? "row-selected" : ""}
                          key={row.id}
                          onClick={() => setSelectedId(row.id)}
                        >
                          <td><strong>{row.certNo}</strong></td>
                          <td>{row.name}<span>{row.cohort}</span></td>
                          <td>{row.course}</td>
                          <td>{row.issueDate}</td>
                          <td>{row.expireDate}</td>
                          <td>
                            <span className={`status ${row.status}`}>
                              <StatusIcon size={15} />
                              {statusLabel[row.status]}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </section>

          <aside className="detail-panel">
            <CertificateDetail selected={selected} onRenew={handleRenew} isSaving={isSaving} />
            <CertificateForm mode={drawerMode} isSaving={isSaving} onIssue={handleIssue} selected={selected} key={`${drawerMode}-${selected.id}`} />
          </aside>
        </div>
      </section>
    </main>
  );
}

function CertificateDetail({ selected, onRenew, isSaving }) {
  return (
    <section className="detail-card">
      <div className="detail-head">
        <div>
          <span>ใบประกาศที่เลือก</span>
          <h2>{selected.certNo}</h2>
        </div>
        <span className={`status ${selected.status}`}>{statusLabel[selected.status]}</span>
      </div>

      <div className="qr-preview" aria-label="QR verification preview">
        <QrCode size={96} />
        <div>
          <strong>verify/{selected.certNo}</strong>
          <span>ตรวจสอบความถูกต้องแบบสาธารณะ</span>
        </div>
      </div>

      <dl className="detail-list">
        <div><dt>ผู้รับใบประกาศ</dt><dd>{selected.name}</dd></div>
        <div><dt>หลักสูตร</dt><dd>{selected.course}</dd></div>
        <div><dt>วันหมดอายุ</dt><dd>{selected.expireDate}</dd></div>
        <div><dt>แถวใน Sheet</dt><dd>Row {selected.sheetRow}</dd></div>
      </dl>

      <button className="renew-button" type="button" onClick={onRenew} disabled={isSaving}>
        <RefreshCcw size={18} />
        {isSaving ? "กำลังบันทึก" : "ต่ออายุใบประกาศนี้"}
      </button>

      <div className="timeline">
        {syncEvents.map((event) => (
          <div className="timeline-row" key={event.title}>
            <span />
            <div>
              <strong>{event.title}</strong>
              <p>{event.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="integration-status">
        <div><Sheet size={17} /><span>Google Sheets พร้อมเขียนข้อมูล</span></div>
        <div><Github size={17} /><span>GitHub Actions รอ commit ถัดไป</span></div>
        <div><LockKeyhole size={17} /><span>Vercel protected env configured</span></div>
      </div>
    </section>
  );
}

function CertificateForm({ mode, isSaving, onIssue, selected }) {
  const isRenew = mode === "renew";

  return (
    <section className="form-panel">
      <div className="section-title-row">
        <div>
          <h2>{isRenew ? "คำขอต่ออายุ" : "ออกใบประกาศใหม่"}</h2>
          <span>{isRenew ? selected.certNo : "สร้างเลขที่ใบประกาศและบันทึกลง Sheet"}</span>
        </div>
        <ChevronRight size={18} />
      </div>

      <form onSubmit={onIssue}>
        <label>
          <span>เลขที่ใบประกาศ</span>
          <input name="certNo" placeholder="NIEM-EMS-2569-001" defaultValue={isRenew ? selected.certNo : ""} />
        </label>
        <label>
          <span>ผู้รับใบประกาศ</span>
          <input name="name" placeholder="ชื่อ-สกุล" defaultValue={isRenew ? selected.name : ""} required />
        </label>
        <label>
          <span>หลักสูตร</span>
          <select name="course" defaultValue={isRenew ? selected.course : cohorts[0].course}>
            {cohorts.map((cohort) => (
              <option key={cohort.course}>{cohort.course}</option>
            ))}
          </select>
        </label>
        <div className="form-split">
          <label>
            <span>รุ่นอบรม</span>
            <input name="cohort" placeholder="EMR รุ่น 12" defaultValue={isRenew ? selected.cohort : ""} required />
          </label>
          <label>
            <span>วันที่ออก</span>
            <input name="issueDate" type="date" required />
          </label>
        </div>
        <label>
          <span>วันหมดอายุ</span>
          <input name="expireDate" type="date" required />
        </label>
        <button className="submit-button" type="submit" disabled={isSaving}>
          <ClipboardCheck size={18} />
          {isSaving ? "กำลังบันทึก" : isRenew ? "บันทึกคำขอต่ออายุ" : "ออกใบประกาศ"}
        </button>
      </form>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<RootApp />);
