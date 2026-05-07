import React, { useState, useMemo } from "react";
import {
  ShieldCheck,
  Search,
  ArrowRight,
  QrCode,
  Building2,
  CheckCircle2,
  Loader2,
  XCircle
} from "lucide-react";
import { PublicHeader } from "../Layout/PublicHeader";
import { StatusBadge } from "../UI/StatusBadge";
import { LoadingState } from "../UI/LoadingState";
import { EmptyState } from "../UI/EmptyState";

function CertificateResult({ result, query, hasSearched, isLoading, error }) {
  if (isLoading) {
    return (
      <LoadingState
        title="กำลังโหลดทะเบียนใบประกาศ"
        description="ระบบกำลังดึงข้อมูลล่าสุดจาก Google Sheets"
      />
    );
  }

  if (error) {
    return (
      <EmptyState
        type="error"
        title="ยังไม่สามารถตรวจสอบข้อมูลได้"
        description={error}
      />
    );
  }

  if (!hasSearched) {
    return (
      <EmptyState
        type="search"
        title="พร้อมตรวจสอบใบประกาศ"
        description="กรอกเลขที่ใบประกาศหรือชื่อผู้รับเพื่อค้นหาจากทะเบียนจริง"
      />
    );
  }

  if (!result) {
    return (
      <EmptyState
        type="error"
        title="ไม่พบข้อมูลใบประกาศ"
        description={`ไม่พบรายการที่ตรงกับ "${query}" กรุณาตรวจสอบเลขที่ใบประกาศอีกครั้ง`}
      />
    );
  }

  return (
    <section className="public-result">
      <div className="result-head">
        <div>
          <span>ผลการตรวจสอบ</span>
          <h2>{result.certNo}</h2>
        </div>
        <StatusBadge status={result.status} />
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

export function PublicVerifyPage({ navigate, rows, isRegistryLoading, registryError }) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const hasSearched = Boolean(submittedQuery.trim());

  const result = useMemo(() => {
    const needle = submittedQuery.trim().toLowerCase();
    if (!needle) return null;
    return (
      rows.find((row) => {
        return (
          row.certNo.toLowerCase() === needle ||
          row.name.toLowerCase().includes(needle)
        );
      }) ?? null
    );
  }, [rows, submittedQuery]);

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
          <p>
            กรอกเลขที่ใบประกาศหรือชื่อผู้รับใบประกาศ
            ระบบจะแสดงสถานะจากทะเบียนกลางของสถาบันการแพทย์ฉุกเฉินแห่งชาติ
          </p>
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
        <CertificateResult
          result={result}
          query={submittedQuery}
          hasSearched={hasSearched}
          isLoading={isRegistryLoading}
          error={registryError}
        />
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
