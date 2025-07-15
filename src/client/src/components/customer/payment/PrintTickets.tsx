import React, { useEffect, useRef } from "react";
import { BookingSummary } from "../../../../../shared/types/type";
import jsPDF from "jspdf";

interface PrintTicketsProps {
  bookingSummary: BookingSummary;
  onClose: () => void;
}

export default function PrintTickets({ bookingSummary, onClose }: PrintTicketsProps) {
  const generatedRef = useRef(false);

  useEffect(() => {
    // Only generate PDF once and only if document is visible
    if (!generatedRef.current && !document.hidden) {
      generatePDF();
      generatedRef.current = true;
    }
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40;
    let y = margin;

    // Ticket border
    doc.setDrawColor("#1e40af");
    doc.setLineWidth(2);
    doc.rect(margin, y, pageWidth - margin * 2, 280, "S");

    // Title
    doc.setFontSize(24);
    doc.setTextColor("#1e40af");
    doc.setFont("helvetica", "bold");
    doc.text("Movie Ticket", pageWidth / 2, y + 40, { align: "center" });

    y += 70;
    doc.setFontSize(14);
    doc.setTextColor("#000000");

    const printLabelValue = (label: string, value: string, indentLabel = 20, indentValue = 100) => {
      doc.setFont("helvetica", "bold");
      doc.text(label, margin + indentLabel, y);
      doc.setFont("helvetica", "normal");
      doc.text(value, margin + indentValue, y);
      y += 25;
    };

    printLabelValue("Movie:", bookingSummary.movieTitle);
    printLabelValue("Theater:", bookingSummary.theaterName);
    printLabelValue("Date & Time:", `${bookingSummary.date} at ${bookingSummary.time}`);
    printLabelValue(
      "Seats:",
      bookingSummary.seats.map((s: any) => s.seat_number || s).join(", ")
    );

    doc.setFont("helvetica", "bold");
    doc.text("Customer:", margin + 20, y);
    doc.setFont("helvetica", "normal");
    doc.text(
      `${bookingSummary.customerName} | Phone: ${bookingSummary.customerPhone}`,
      margin + 100,
      y
    );
    y += 40;

    doc.setFont("helvetica", "bold");
    doc.setTextColor("#16a34a");
    doc.text("Total Paid:", margin + 20, y);
    doc.setTextColor("#000000");
    doc.text(`$${bookingSummary.totalAmount.toFixed(2)}`, margin + 100, y);

    y += 30;
    doc.setDrawColor("#cccccc");
    doc.setLineWidth(0.5);
    doc.line(margin + 10, y, pageWidth - margin - 10, y);
    y += 20;

    doc.setFontSize(10);
    doc.setTextColor("#666666");
    doc.text("Thank you for your booking! Enjoy your movie.", pageWidth / 2, y, {
      align: "center",
    });

    y += 30;
    const barcodeWidth = 180;
    const barcodeHeight = 50;
    const barcodeX = pageWidth / 2 - barcodeWidth / 2;
    doc.setDrawColor("#000000");
    doc.rect(barcodeX, y, barcodeWidth, barcodeHeight);
    doc.setFontSize(12);
    doc.text("|| ||| | | || |||", pageWidth / 2, y + barcodeHeight / 2 + 5, {
      align: "center",
    });

    doc.save(`tickets_${bookingSummary.movieTitle.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="p-8 bg-white text-black max-w-3xl mx-auto mt-8 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Your Tickets</h1>

      <div className="mb-4">
        <strong>Movie:</strong> {bookingSummary.movieTitle}
      </div>
      <div className="mb-4">
        <strong>Theater:</strong> {bookingSummary.theaterName}
      </div>
      <div className="mb-4">
        <strong>Date & Time:</strong> {bookingSummary.date} at {bookingSummary.time}
      </div>
      <div className="mb-4">
        <strong>Seats:</strong>{" "}
        {bookingSummary.seats.map((s: any) => s.seat_number || s).join(", ")}
      </div>
      <div className="mb-4">
        <strong>Customer:</strong> {bookingSummary.customerName} | Phone: {bookingSummary.customerPhone}
      </div>
      <div className="mb-4">
        <strong>Total Paid:</strong> ${bookingSummary.totalAmount.toFixed(2)}
      </div>

      <button
        onClick={onClose}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Close
      </button>
    </div>
  );
}
