import React from "react";
import { Loader2 } from "lucide-react";

export function LoadingState({ title, description }) {
  return (
    <section className="public-result empty">
      <Loader2 className="spin" size={34} />
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}
