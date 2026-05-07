import React from "react";
import { CheckCircle2, CalendarClock, XCircle, Loader2 } from "lucide-react";
import { statusLabel } from "../../constants";

const iconMap = {
  active: CheckCircle2,
  renewal: CalendarClock,
  expired: XCircle,
  pending: Loader2
};

export function StatusBadge({ status, size = 15 }) {
  const Icon = iconMap[status] ?? Loader2;
  const label = statusLabel[status] ?? "รอตรวจสอบ";

  return (
    <span className={`status ${status}`}>
      <Icon size={size} />
      {label}
    </span>
  );
}
