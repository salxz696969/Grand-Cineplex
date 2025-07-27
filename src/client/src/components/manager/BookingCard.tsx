import React from "react";
import { User, Calendar, Clock, MapPin, Film, CreditCard, Smartphone, Monitor } from "lucide-react";

export interface Booking {
    id: number;
    customerName?: string;
    customerEmail?: string;
    movieTitle: string;
    theater: string;
    date: string;
    time: string;
    seats: string[];
    totalAmount: number;
    bookingMethod: "walk-in" | "online";
    status: "confirmed" | "pending" | "cancelled" | "completed";
    bookingDate: string;
    cashierName?: string;
    paymentMethod: "cash" | "card" | "online";
}

interface BookingCardProps {
    booking: Booking;
}

export default function BookingCard({ booking }: BookingCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "confirmed": return "bg-green-600/20 text-green-400";
            case "pending": return "bg-yellow-600/20 text-yellow-400";
            case "cancelled": return "bg-red-600/20 text-red-400";
            case "completed": return "bg-blue-600/20 text-blue-400";
            default: return "bg-gray-600/20 text-gray-400";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "confirmed": return "Confirmed";
            case "pending": return "Pending";
            case "cancelled": return "Cancelled";
            case "completed": return "Completed";
            default: return "Unknown";
        }
    };

    const getPaymentMethodIcon = (method: string) => {
        switch (method) {
            case "cash": return <CreditCard className="w-4 h-4" />;
            case "card": return <CreditCard className="w-4 h-4" />;
            case "online": return <Smartphone className="w-4 h-4" />;
            default: return <CreditCard className="w-4 h-4" />;
        }
    };

    const getBookingMethodIcon = (method: string) => {
        switch (method) {
            case "walk-in": return <Monitor className="w-4 h-4" />;
            case "online": return <Smartphone className="w-4 h-4" />;
            default: return <Monitor className="w-4 h-4" />;
        }
    };

    return (
        <div className="bg-gray-950 border border-slate-800 rounded-lg p-4 hover:border-blue-500/50 transition-colors duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">{booking.customerName}</h3>
                        <p className="text-slate-400 text-xs">{booking.customerEmail}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                    </span>
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${booking.bookingMethod === "walk-in"
                        ? "bg-orange-600/20 text-orange-400"
                        : "bg-blue-600/20 text-blue-400"
                        }`}>
                        <div className="flex items-center gap-1">
                            {getBookingMethodIcon(booking.bookingMethod)}
                            {booking.bookingMethod === "walk-in" ? "Walk-in" : "Online"}
                        </div>
                    </div>
                </div>
            </div>

            {/* Movie and Theater Info */}
            <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Film className="w-4 h-4 text-sky-500" />
                    <span className="font-medium">{booking.movieTitle}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <MapPin className="w-4 h-4" />
                    {booking.theater}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Calendar className="w-4 h-4" />
                    {new Date(booking.date).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Clock className="w-4 h-4" />
                    {booking.time}
                </div>
            </div>

            {/* Seats */}
            <div className="mb-4">
                <p className="text-sm text-slate-400 mb-2">Seats: {booking.seats.join(", ")}</p>
            </div>

            {/* Payment and Booking Info */}
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4 text-slate-400">
                    <div className="flex items-center gap-1">
                        {getPaymentMethodIcon(booking.paymentMethod)}
                        <span className="capitalize">{booking.paymentMethod}</span>
                    </div>
                    {booking.cashierName && (
                        <div className="text-xs">
                            Cashier: {booking.cashierName}
                        </div>
                    )}
                </div>
                <div className="text-right">
                    <div className="text-lg font-bold text-green-400">${booking.totalAmount.toFixed(2)}</div>
                    <div className="text-xs text-slate-500">
                        Booked: {new Date(booking.bookingDate).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    );
} 