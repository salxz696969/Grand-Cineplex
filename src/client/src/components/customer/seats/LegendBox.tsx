import React from "react";

interface LegendBoxProps {
  colorFrom: string;
  colorTo: string;
  label: string;
  opacity?: boolean;
}

export function LegendBox({ colorFrom, colorTo, label, opacity = false }: LegendBoxProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-6 h-6 rounded ${opacity ? "opacity-60" : ""}`}
        style={{ background: `linear-gradient(to bottom right, ${colorFrom}, ${colorTo})` }}
      ></div>
      <span>{label}</span>
    </div>
  );
}
