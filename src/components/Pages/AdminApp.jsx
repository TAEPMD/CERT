import React, { useEffect, useMemo, useState } from "react";
import {
  FilePlus2,
  RefreshCcw,
  QrCode
} from "lucide-react";
import { createCertificateRecord, renewCertificateRecord } from "../../services/googleSheets";
import { createMetrics } from "../../utils/metrics";
import { statusFilters } from "../../constants";
import { Sidebar } from "../Layout/Sidebar";
import { Topbar } from "../Layout/Topbar";
import { Toast } from "../UI/Toast";
import { MetricCard } from "../UI/MetricCard";
import { CertificateTable } from "./CertificateTable";
import { CertificateDetail } from "./CertificateDetail";
import { CertificateForm } from "./CertificateForm";

export function AdminApp({
  navigate,
  rows,
  setRows,
  isRegistryLoading,
  registryError
}) {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState("");
  const [drawerMode, setDrawerMode] = useState("issue");
  const [toast, setToast] = useState("");
  const [isSaving, setSaving] = useState(false);

  useEffect(() => {
    if (!rows.length) {
      setSelectedId("");
      return;
    }
    if (!rows.some((row) => row.id === selectedId)) {
      setSelectedId(rows[0].id);
    }
  }, [rows, selectedId]);

  const metrics = useMemo(() => createMetrics(rows), [rows]);

  const courseOptions = useMemo(() => {
    return [...new Set(rows.map((row) => row.course).filter(Boolean))];
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const text = `${row.certNo} ${row.name} ${row.course} ${row.cohort}`.toLowerCase();
      const matchesQuery = text.includes(query.trim().toLowerCase());
      const matchesStatus = statusFilter === "all" || row.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [query, rows, statusFilter]);

  const selected = rows.find((row) => row.id === selectedId) ?? null;

  function handleNavChange(navId, openDrawer = false) {
    setActiveNav(navId);
    if (openDrawer && (navId === "issue" || navId === "renew")) {
      setDrawerMode(navId);
    }
  }

  async function handleRecordSubmit(mode, event) {
    event.preventDefault();

    if (mode === "renew" && !selected) {
      setToast("ยังไม่มีใบประกาศให้ต่ออายุ");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const name = (formData.get("name") ?? "").trim().slice(0, 200);
    const certNoRaw = (formData.get("certNo") ?? "").trim().slice(0, 50);
    const course = (formData.get("course") ?? "").trim().slice(0, 200);
    const cohort = (formData.get("cohort") ?? "").trim().slice(0, 100);
    const issueDate = formData.get("issueDate");
    const expireDate = formData.get("expireDate");

    if (!name || !course || !cohort || !issueDate || !expireDate) return;
    if (expireDate <= issueDate) {
      setToast("วันหมดอายุต้องอยู่หลังวันที่ออก");
      return;
    }

    const certNo =
      certNoRaw ||
      `NIEM-CPR-${new Date().getFullYear()}-${String(rows.length + 1).padStart(4, "0")}`;

    const record =
      mode === "renew"
        ? {
            ...selected,
            certNo,
            name,
            course,
            cohort,
            issueDate,
            expireDate,
            status: "active",
            verifier: "ต่ออายุโดยเจ้าหน้าที่"
          }
        : {
            id: `cert-${Date.now()}`,
            certNo,
            name,
            course,
            cohort,
            issueDate,
            expireDate,
            status: "active",
            verifier: "ระบบออกใบประกาศ",
            sheetRow: null
          };

    setSaving(true);
    try {
      const response =
        mode === "renew"
          ? await renewCertificateRecord(record)
          : await createCertificateRecord(record);

      if (mode === "renew") {
        setRows((current) =>
          current.map((row) =>
            row.id === record.id
              ? { ...record, sheetRow: response?.sheetRow ?? record.sheetRow }
              : row
          )
        );
        setSelectedId(record.id);
        setToast(`ต่ออายุ ${record.certNo} สำเร็จ`);
      } else {
        const savedRecord = {
          ...record,
          sheetRow: response?.sheetRow ?? null
        };
        setRows((current) => [savedRecord, ...current]);
        setSelectedId(savedRecord.id);
        setToast("บันทึกใบประกาศใหม่ลงทะเบียนกลางแล้ว");
      }

      event.currentTarget.reset();
    } catch {
      setToast(
        mode === "renew"
          ? "เกิดข้อผิดพลาดในการต่ออายุ กรุณาลองอีกครั้ง"
          : "เกิดข้อผิดพลาดในการบันทึก กรุณาลองอีกครั้ง"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="app-shell">
      <Sidebar
        activeNav={activeNav}
        onNavChange={handleNavChange}
        navigate={navigate}
        rows={rows}
        isRegistryLoading={isRegistryLoading}
        registryError={registryError}
      />

      <section className="workspace">
        <Topbar query={query} onQueryChange={setQuery} />

        <Toast message={toast} onClose={() => setToast("")} />

        <div className="content-grid">
          <section className="main-panel">
            <div className="page-heading">
              <div>
                <h1>ศูนย์กลางใบประกาศ</h1>
                <p>
                  ออกใบประกาศ ต่ออายุ และตรวจสอบสถานะจากฐานข้อมูล Google Sheets
                  พร้อมบันทึกเวอร์ชันผ่าน GitHub และเผยแพร่บน Vercel
                </p>
              </div>
              <div className="workflow-actions">
                <button
                  className="primary-action"
                  type="button"
                  onClick={() => setDrawerMode("issue")}
                >
                  <FilePlus2 size={18} />
                  ออกใบประกาศ
                </button>
                <button
                  className="secondary-action"
                  type="button"
                  onClick={() => setDrawerMode("renew")}
                >
                  <RefreshCcw size={18} />
                  ต่ออายุ
                </button>
                <button
                  className="secondary-action"
                  type="button"
                  onClick={() => navigate("/verify")}
                >
                  <QrCode size={18} />
                  หน้าตรวจสอบสาธารณะ
                </button>
              </div>
            </div>

            <div className="metrics-grid">
              {metrics.map((metric) => (
                <MetricCard
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                  icon={metric.icon}
                />
              ))}
            </div>

            <section className="registry-section">
              {(isRegistryLoading || registryError) && (
                <div
                  className={
                    registryError
                      ? "registry-banner error"
                      : "registry-banner"
                  }
                >
                  {isRegistryLoading
                    ? "กำลังดึงข้อมูลทะเบียนจาก Google Sheets..."
                    : registryError}
                </div>
              )}

              <div className="section-toolbar">
                <div>
                  <h2>ทะเบียนใบประกาศ</h2>
                  <span>{filteredRows.length} รายการที่ตรงกับเงื่อนไข</span>
                </div>
                <div className="segmented">
                  {statusFilters.map(([id, label]) => (
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
                <CertificateTable
                  rows={filteredRows}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  isLoading={isRegistryLoading}
                  error={registryError}
                />
              </div>
            </section>
          </section>

          <aside className="detail-panel">
            <CertificateDetail
              selected={selected}
              isSaving={isSaving}
              onOpenRenew={() => setDrawerMode("renew")}
            />
            <CertificateForm
              mode={drawerMode}
              isSaving={isSaving}
              onSubmit={handleRecordSubmit}
              selected={selected}
              courseOptions={courseOptions}
              key={`${drawerMode}-${selected?.id ?? "new"}`}
            />
          </aside>
        </div>
      </section>
    </main>
  );
}
