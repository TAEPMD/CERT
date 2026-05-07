import React from "react";
import { BadgeCheck } from "lucide-react";

export function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <button className="toast" type="button" onClick={onClose}>
      <BadgeCheck size={18} />
      <span>{message}</span>
    </button>
  );
}
