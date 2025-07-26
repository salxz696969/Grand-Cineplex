// PaymentSuccess.tsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Receipt, User, Clapperboard } from "lucide-react";
import PrintTickets from "./PrintTickets";
import { BookingSummary } from "../../../../../shared/types/type";
import { AuthContext } from "../../context/AuthContext";

export default function PaymentSuccess({ bookingSummary }: { bookingSummary: BookingSummary }) {
  const navigate = useNavigate();
  const [printing, setPrinting] = useState(false);
  const { auth } = useContext(AuthContext)!;

  // Helper function to get seat display string
  const getSeatDisplay = (seat: any) => {
    if (typeof seat === 'string') return seat;
    if (seat && typeof seat === 'object' && seat.seatNumber) return seat.seatNumber;
    return 'Unknown Seat';
  };

  if (printing) {
    return (
      <PrintTickets
        bookingSummary={bookingSummary}
        onClose={() => setPrinting(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 lg:p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-blue-600/20 border border-blue-500/30 rounded-2xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
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
                    {bookingSummary.seats.map(getSeatDisplay).join(", ")}
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
                  <span>{auth?.name || "Guest User"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span>{auth?.email || "guest@example.com"}</span>
                </div>
                <div className="flex justify-between border-t border-gray-700 pt-2">
                  <span className="text-gray-400">Total Paid:</span>
                  <span className="text-blue-600 font-bold">
                    ${bookingSummary.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Printable Tickets */}
          <div className="mb-8 print:block hidden">
            {bookingSummary.seats.map((seat, index) => (
              <div key={index} className="bg-white text-black p-6 rounded-lg mb-4 border-2 border-gray-800 print:break-inside-avoid">
                <div className="flex justify-between items-center border-b border-dashed border-gray-300 pb-4 mb-4">
                  <div className="text-2xl font-bold">CINEPLEX</div>
                  <div className="text-xl font-mono">{getSeatDisplay(seat)}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">MOVIE</div>
                    <div className="font-semibold">{bookingSummary.movieTitle}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">THEATER</div>
                    <div className="font-semibold">{bookingSummary.theaterName}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">DATE</div>
                    <div className="font-semibold">{bookingSummary.date}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">TIME</div>
                    <div className="font-semibold">{bookingSummary.time}</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-dashed border-gray-300 text-center text-sm text-gray-500">
                  Ticket #{index + 1} of {bookingSummary.seats.length}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <button onClick={() => setPrinting(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Print Tickets
            </button>
            <button onClick={() => navigate("/")} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              New Booking
            </button>
          </div>
        </div>
      </div>

      {/* Ticket Display */}
      <div className="w-full flex items-center justify-between max-w-4xl gap-6 bg-gray-900 text-white p-8 border-2 border-blue-800/30 rounded-xl shadow-2xl print:break-inside-avoid mb-6 mx-auto">
        <div className="text-center w-1/2 bg-blue-800/20 rounded-xl p-4 h-[300px] flex flex-col items-center justify-center">
          <Clapperboard className="w-16 h-16 text-blue-600 mb-2" />
          <div className="text-sm font-medium text-blue-500">GRAND CINEPLEX</div>
        </div>
        <div className="flex flex-col gap-6 w-1/2 h-full">
          <div className="flex flex-col items-center border-b border-dashed border-gray-700 pb-4">
            <div className="text-3xl font-bold tracking-wider text-blue-600 rounded-lg p-2">
              GRAND CINEPLEX
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-sm">
            <div>
              <div className="text-gray-400 uppercase text-xs font-medium mb-1">Movie</div>
              <div className="font-semibold">{bookingSummary.movieTitle}</div>
            </div>
            <div>
              <div className="text-gray-400 uppercase text-xs font-medium mb-1">Theater</div>
              <div className="font-semibold">{bookingSummary.theaterName}</div>
            </div>
            <div>
              <div className="text-gray-400 uppercase text-xs font-medium mb-1">Date</div>
              <div className="font-semibold">{bookingSummary.date}</div>
            </div>
            <div>
              <div className="text-gray-400 uppercase text-xs font-medium mb-1">Time</div>
              <div className="font-semibold">{bookingSummary.time}</div>
            </div>
            <div className="col-span-2">
              <div className="text-gray-400 uppercase text-xs font-medium mb-1">Seat</div>
              <div className="font-semibold">
                {bookingSummary.seats.map(getSeatDisplay).join(", ")}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-6 border-t border-dashed border-gray-700 text-center">
            <div className="text-3xl font-mono tracking-wider text-blue-500 mb-2">
              {bookingSummary.seats.map(getSeatDisplay).join(", ")}
            </div>
            <div className="text-xs text-gray-400">
              Ticket #{bookingSummary.seats.length} of {bookingSummary.seats.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
