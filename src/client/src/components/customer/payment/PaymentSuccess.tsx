// PaymentSuccess.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Receipt, User } from "lucide-react";
import PrintTickets from "./PrintTickets";
import { BookingSummary } from "../../../../../shared/types/type";


export default function PaymentSuccess({ bookingSummary }: { bookingSummary: BookingSummary }) {
  const navigate = useNavigate();
  const [printing, setPrinting] = useState(false);

  if (printing) {
    return (
      <PrintTickets
        bookingSummary={bookingSummary}
        onClose={() => setPrinting(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-900 text-white p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-green-600/20 border border-green-500/30 rounded-2xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Payment Complete!</h1>
          <p className="text-gray-300 mb-6">Booking confirmed and tickets ready</p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-800/50 rounded-xl p-6 text-left">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                Booking Details
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Movie:</span>
                  <span>{bookingSummary.movieTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Theater:</span>
                  <span>{bookingSummary.theaterName || bookingSummary.theaterName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date & Time:</span>
                  <span>
                    {bookingSummary.date} at {bookingSummary.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Seats:</span>
                  <span>
                    {bookingSummary.seats
                      .map((s) => (s.seat_number ? s.seat_number : s))
                      .join(", ")}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 text-left">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Customer Info
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Name:</span>
                  <span>{bookingSummary.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone:</span>
                  <span>{bookingSummary.customerPhone}</span>
                </div>
                <div className="flex justify-between border-t border-gray-700 pt-2">
                  <span className="text-gray-400">Total Paid:</span>
                  <span className="text-green-400 font-bold">
                    ${bookingSummary.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button onClick={() => setPrinting(true)} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Print Tickets
            </button>
            <button onClick={() => navigate("/")} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              New Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
