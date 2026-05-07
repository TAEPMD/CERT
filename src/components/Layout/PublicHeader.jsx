import React from "react";
import { Activity, Home, QrCode, ExternalLink } from "lucide-react";

export function PublicHeader({ navigate }) {
  return (
    <header className="public-header">
      <button className="public-brand" type="button" onClick={() => navigate("/")}>
        <span className="brand-mark small">
          <Activity size={20} />
        </span>
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
