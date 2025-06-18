import React from "react";

interface DetailTabProps {
  overview: string;
}

export default function DetailTab({ overview }: DetailTabProps) {
  return (
    <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
      {overview}
    </div>
  );
}
