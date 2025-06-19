// This component is used in the movie chosen page to show the overview
// It now includes a 0.5s loading spinner before displaying the details

import React, { useState, useEffect } from "react";

interface DetailTabProps {
  overview: string;
}

export default function DetailTab({ overview }: DetailTabProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 0.5s delay

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white text-sm mt-2">Loading overview...</p>
      </div>
    );
  }

  return (
    <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
      {overview}
    </div>
  );
}
