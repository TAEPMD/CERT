import React from "react";
import {
  Activity,
  QrCode,
  LockKeyhole,
  BadgeCheck,
  FilePlus2,
  RefreshCcw,
  ShieldCheck,
  Database
} from "lucide-react";
import { PublicHeader } from "../Layout/PublicHeader";

export function LandingPage({ navigate }) {
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
