import React, { useState, useEffect } from "react";
import {
    Clock,
    MapPin,
    Calendar,
    Film,
    Sofa,
    Receipt,
    Clapperboard,
    User
} from "lucide-react";
import Header from "../../components/customer/Header";
import LoadingSpinner from "../../components/customer/LoadingSpinner";
import { fetchBookingHistory } from "../../api/customer";
import { BookingSummary } from "../../../../shared/types/type";

export default function History() {
    const [bookings, setBookings] = useState<BookingSummary[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookingHistoryData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetchBookingHistory();
                setBookings(response);
            } catch (error) {
                console.error("Failed to fetch booking history:", error);
                setError("Failed to load booking history. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookingHistoryData();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-950 text-white">
                <Header />
                <div className="flex items-center justify-center min-h-screen">
                    <LoadingSpinner />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-950 text-white">
                <Header />
                <div className="max-w-7xl mx-auto p-4 lg:p-8">
                    <div className="text-center py-12">
                        <Receipt className="w-16 h-16 text-red-600 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-red-400 mb-2">Error Loading Bookings</h2>
                        <p className="text-gray-500 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Header />

            <div className="max-w-7xl mx-auto p-4 lg:p-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold mb-4">Booking History</h1>
                    <p className="text-gray-400 text-lg">
                        View all your past movie bookings and tickets
                    </p>
                </div>

                {/* No Bookings Message */}
                {bookings.length === 0 && (
                    <div className="text-center py-12">
                        <Receipt className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-400 mb-2">No Bookings Yet</h2>
                        <p className="text-gray-500">
                            You haven't made any bookings yet. Start by browsing our movies!
                        </p>
                    </div>
                )}

                {/* Bookings Grid */}
                {bookings.length > 0 && (
                    <div className="space-y-6">
                        {bookings.map((booking, index) => (
                            <div key={index} className="w-full flex items-center justify-between max-w-4xl gap-6 bg-gray-900 text-white p-8 border-2 border-blue-800/30 rounded-xl shadow-2xl mx-auto">
                                {/* Left Side - Logo */}
                                <div className="text-center w-1/2 bg-blue-800/20 rounded-xl p-4 h-[300px] flex flex-col items-center justify-center">
                                    <Clapperboard className="w-16 h-16 text-blue-600 mb-2" />
                                    <div className="text-sm font-medium text-blue-500">GRAND CINEPLEX</div>
                                </div>

                                {/* Right Side - Ticket Details */}
                                <div className="flex flex-col gap-6 w-1/2 h-full">
                                    {/* Header */}
                                    <div className="flex flex-col items-center border-b border-dashed border-gray-700 pb-4">
                                        <div className="text-3xl font-bold tracking-wider text-blue-600 rounded-lg p-2">
                                            GRAND CINEPLEX
                                        </div>
                                    </div>

                                    {/* Ticket Information Grid */}
                                    <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-sm">
                                        <div>
                                            <div className="text-gray-400 uppercase text-xs font-medium mb-1">Movie</div>
                                            <div className="font-semibold">{booking.movieTitle}</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-400 uppercase text-xs font-medium mb-1">Theater</div>
                                            <div className="font-semibold">{booking.theaterName}</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-400 uppercase text-xs font-medium mb-1">Screening Date</div>
                                            <div className="font-semibold">{booking.date}</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-400 uppercase text-xs font-medium mb-1">Booked At</div>
                                            <div className="font-semibold">{booking.time}</div>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="text-gray-400 uppercase text-xs font-medium mb-1">Seats</div>
                                            <div className="font-semibold">
                                                {booking.seats.map(seat => seat.seatNumber).join(", ")}
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="text-gray-400 uppercase text-xs font-medium mb-1">Customer</div>
                                            <div className="font-semibold">{booking.customerName}</div>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="text-gray-400 uppercase text-xs font-medium mb-1">Total Amount</div>
                                            <div className="font-semibold text-blue-400">${booking.totalAmount.toFixed(2)}</div>
                                        </div>
                                    </div>

                                    {/* Footer - Seat Numbers */}
                                    <div className="mt-4 pt-6 border-t border-dashed border-gray-700 text-center">
                                        <div className="text-3xl font-mono tracking-wider text-blue-500 mb-2">
                                            {booking.seats.map(seat => seat.seatNumber).join(", ")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
