import React from "react";
import { Search, Bell, UserRound } from "lucide-react";

export function Topbar({ query, onQueryChange }) {
  return (
    <header className="topbar">
      <label className="search-box">
        <Search size={18} />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
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
  );
}
