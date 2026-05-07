import React from "react";
import {
  Activity,
  Home,
  LayoutDashboard,
  FilePlus2,
  RefreshCcw,
  ShieldCheck,
  GraduationCap,
  UsersRound,
  ListChecks,
  Settings,
  Cloud
} from "lucide-react";
import { navItems } from "../../constants";

const iconComponents = {
  LayoutDashboard,
  FilePlus2,
  RefreshCcw,
  ShieldCheck,
  GraduationCap,
  UsersRound,
  ListChecks,
  Settings
};

export function Sidebar({ activeNav, onNavChange, navigate, rows, isRegistryLoading, registryError }) {
  return (
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
        <button
          className="nav-item public-nav"
          type="button"
          onClick={() => navigate("/")}
        >
          <Home size={18} />
          <span>หน้าสาธารณะ</span>
        </button>
        {navItems.map(([id, label, iconName]) => {
          const Icon = iconComponents[iconName];
          return (
            <button
              className={activeNav === id ? "nav-item active" : "nav-item"}
              key={id}
              type="button"
              onClick={() => {
                onNavChange(id);
                if (id === "issue" || id === "renew") {
                  // แจ้ง parent ให้เปิด drawer ที่ต้องการ
                  onNavChange(id, true);
                }
              }}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-sync">
        <Cloud size={18} />
        <div>
          <strong>Google Sheets</strong>
          <span>
            {registryError
              ? "ยังเชื่อมต่อทะเบียนไม่ได้"
              : isRegistryLoading
                ? "กำลังโหลดทะเบียนล่าสุด"
                : `${rows.length.toLocaleString("th-TH")} รายการในทะเบียน`}
          </span>
        </div>
      </div>
    </aside>
  );
}
