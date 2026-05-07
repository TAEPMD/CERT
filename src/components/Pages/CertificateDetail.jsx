import React from "react";
import {
  QrCode,
  RefreshCcw,
  Sheet,
  Github,
  LockKeyhole,
  Database
} from "lucide-react";
import { syncEvents, statusLabel } from "../../constants";
import { StatusBadge } from "../UI/StatusBadge";

export function CertificateDetail({ selected, onOpenRenew, isSaving }) {
  if (!selected) {
    return (
      <section className="detail-card detail-empty">
        <Database size={28} />
        <h2>ยังไม่มีใบประกาศที่เลือก</h2>
        <p>โหลดทะเบียนให้สำเร็จหรือเพิ่มข้อมูลจริงก่อน จึงจะดูรายละเอียดและต่ออายุได้</p>
      </section>
    );
  }

  return (
    <section className="detail-card">
      <div className="detail-head">
        <div>
          <span>ใบประกาศที่เลือก</span>
          <h2>{selected.certNo}</h2>
        </div>
        <StatusBadge status={selected.status} />
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

      <button
        className="renew-button"
        type="button"
        onClick={onOpenRenew}
        disabled={isSaving}
      >
        <RefreshCcw size={18} />
        {isSaving ? "กำลังบันทึก" : "เปิดแบบฟอร์มต่ออายุ"}
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
        <div>
          <Sheet size={17} />
          <span>Google Sheets พร้อมเขียนข้อมูล</span>
        </div>
        <div>
          <Github size={17} />
          <span>GitHub Actions รอ commit ถัดไป</span>
        </div>
        <div>
          <LockKeyhole size={17} />
          <span>Vercel protected env configured</span>
        </div>
      </div>
    </section>
  );
}
