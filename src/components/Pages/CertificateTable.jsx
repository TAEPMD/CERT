import React from "react";
import { Database } from "lucide-react";
import { StatusBadge } from "../UI/StatusBadge";

export function CertificateTable({
  rows,
  selectedId,
  onSelect,
  isLoading,
  error
}) {
  if (!rows.length) {
    return (
      <div className="table-empty">
        <Database size={24} />
        <strong>ยังไม่มีข้อมูลทะเบียนที่พร้อมแสดงผล</strong>
        <span>
          {error
            ? "ตรวจสอบ endpoint และสิทธิ์ของ Google Sheets Web App"
            : "เมื่อมีข้อมูลจริงใน Google Sheets ตารางจะปรากฏที่นี่"}
        </span>
      </div>
    );
  }

  return (
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
        {rows.map((row) => (
          <tr
            className={selectedId === row.id ? "row-selected" : ""}
            key={row.id}
            onClick={() => onSelect(row.id)}
          >
            <td>
              <strong>{row.certNo}</strong>
            </td>
            <td>
              {row.name}
              <span>{row.cohort}</span>
            </td>
            <td>{row.course}</td>
            <td>{row.issueDate}</td>
            <td>{row.expireDate}</td>
            <td>
              <StatusBadge status={row.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
