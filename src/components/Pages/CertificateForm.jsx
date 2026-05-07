import React from "react";
import { ChevronRight, ClipboardCheck, RefreshCcw } from "lucide-react";

export function CertificateForm({ mode, isSaving, onSubmit, selected, courseOptions }) {
  const isRenew = mode === "renew";

  if (isRenew && !selected) {
    return (
      <section className="form-panel detail-empty">
        <RefreshCcw size={28} />
        <h2>ยังไม่มีรายการให้ต่ออายุ</h2>
        <p>เลือกใบประกาศจากทะเบียนก่อน แล้วจึงส่งคำขอต่ออายุด้วยข้อมูลจริง</p>
      </section>
    );
  }

  return (
    <section className="form-panel">
      <div className="section-title-row">
        <div>
          <h2>{isRenew ? "คำขอต่ออายุ" : "ออกใบประกาศใหม่"}</h2>
          <span>
            {isRenew
              ? selected.certNo
              : "สร้างเลขที่ใบประกาศและบันทึกลง Sheet"}
          </span>
        </div>
        <ChevronRight size={18} />
      </div>

      <form onSubmit={(event) => onSubmit(mode, event)}>
        <label>
          <span>เลขที่ใบประกาศ</span>
          <input
            name="certNo"
            placeholder="NIEM-EMS-2569-001"
            defaultValue={isRenew ? selected?.certNo : ""}
          />
        </label>
        <label>
          <span>ผู้รับใบประกาศ</span>
          <input
            name="name"
            placeholder="ชื่อ-สกุล"
            defaultValue={isRenew ? selected?.name : ""}
            required
          />
        </label>
        <label>
          <span>หลักสูตร</span>
          <input
            name="course"
            list="course-options"
            placeholder="ชื่อหลักสูตร"
            defaultValue={isRenew ? selected?.course : ""}
            required
          />
          <datalist id="course-options">
            {courseOptions.map((course) => (
              <option key={course} value={course} />
            ))}
          </datalist>
        </label>
        <div className="form-split">
          <label>
            <span>รุ่นอบรม</span>
            <input
              name="cohort"
              placeholder="EMR รุ่น 12"
              defaultValue={isRenew ? selected?.cohort : ""}
              required
            />
          </label>
          <label>
            <span>วันที่ออก</span>
            <input
              name="issueDate"
              type="date"
              defaultValue={isRenew ? selected?.issueDate : ""}
              required
            />
          </label>
        </div>
        <label>
          <span>วันหมดอายุ</span>
          <input
            name="expireDate"
            type="date"
            defaultValue={isRenew ? selected?.expireDate : ""}
            required
          />
        </label>
        <button className="submit-button" type="submit" disabled={isSaving}>
          <ClipboardCheck size={18} />
          {isSaving
            ? "กำลังบันทึก"
            : isRenew
              ? "บันทึกคำขอต่ออายุ"
              : "ออกใบประกาศ"}
        </button>
      </form>
    </section>
  );
}
