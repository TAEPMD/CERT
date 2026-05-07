import { FileCheck2, BadgeCheck, CalendarClock, ShieldCheck } from "lucide-react";

export function createMetrics(rows) {
  const activeCount = rows.filter((row) => row.status === "active").length;
  const renewalCount = rows.filter((row) => row.status === "renewal").length;
  const expiredCount = rows.filter((row) => row.status === "expired").length;
  const pendingCount = rows.filter((row) => row.status === "pending").length;

  return [
    {
      label: "ออกใบประกาศแล้ว",
      value: rows.length.toLocaleString("th-TH"),
      icon: FileCheck2
    },
    {
      label: "ใช้งานได้",
      value: activeCount.toLocaleString("th-TH"),
      icon: BadgeCheck
    },
    {
      label: "ใกล้หมดอายุ",
      value: renewalCount.toLocaleString("th-TH"),
      icon: CalendarClock
    },
    {
      label: "หมดอายุหรือรอตรวจสอบ",
      value: (expiredCount + pendingCount).toLocaleString("th-TH"),
      icon: ShieldCheck
    }
  ];
}
