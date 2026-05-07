import React from "react";
import { Search, XCircle, Database } from "lucide-react";

export function EmptyState({ type = "search", title, description }) {
  const icons = {
    search: Search,
    error: XCircle,
    data: Database
  };

  const Icon = icons[type] ?? Search;

  return (
    <section className="public-result empty">
      <Icon size={34} />
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}
