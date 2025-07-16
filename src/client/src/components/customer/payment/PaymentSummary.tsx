import React from "react";
import { Receipt, Monitor, MapPin, Calendar, Clock, User, Sofa,} from "lucide-react";
import { BookingSummary } from "../../../../../shared/types/type";
import { convertTo12HourFormat } from "../../../utils/Function";

interface PaymentSummaryProps {
  bookingSummary: BookingSummary;
}

export default function PaymentSummary({bookingSummary,}: PaymentSummaryProps) {

  return (
    <div className="lg:col-span-2 space-y-6">

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Receipt className="w-6 h-6" />
        Booking Summary
      </h2>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-sky-600/20 rounded-lg">
            <Monitor className="w-8 h-8 text-sky-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-2">{bookingSummary.movieTitle}</h3>
            <div className="flex items-center gap-4 text-gray-400">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{bookingSummary.theaterName}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{bookingSummary.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{convertTo12HourFormat(bookingSummary.time)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">

          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Customer Information
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span>{bookingSummary.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Phone:</span>
                <span>{bookingSummary.customerPhone}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Sofa className="w-4 h-4" />
              Seat Details
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Selected Seats:</span>
                <span className="font-medium">
                  {bookingSummary.seats
                    .map((s: any) => s.seat_number)
                    .join(", ")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Quantity:</span>
                <span>{bookingSummary.seats.length} tickets</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Price Breakdown</h3>
        <div className="space-y-3">

          {bookingSummary.seats.map((seat: any, idx: number) => (
            <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-sky-600/20 rounded-lg flex items-center justify-center">
                  <Sofa className="w-4 h-4 text-sky-400" />
                </div>
                <span>Seat {seat.seat_number}</span>
              </div>
              <span className="font-medium">${seat.price.toFixed(2)}</span>
            </div>
          ))}

          <div className="border-t border-gray-600 pt-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Amount:</span>
              <span className="text-2xl font-bold text-green-400">
                ${bookingSummary.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
