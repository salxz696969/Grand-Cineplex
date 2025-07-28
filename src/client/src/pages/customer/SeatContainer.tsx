import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, ShoppingCart, Monitor } from "lucide-react";
import { SeatCard } from "../../components/customer/seats/SeatCard";
import SelectedSeats from "../../components/customer/seats/SelectedSeats";
import LoadingSpinner from "../../components/customer/LoadingSpinner";
import TimeoutPopup from "../../components/customer/TimeoutPopup";
import { fetchSeatsByScreening } from "../../api/customer";
import { ApiSeat, ScreeningSeatData } from "../../../../shared/types/type";
import LegendBox from "../../components/customer/seats/LegendBox";
import { Seat } from "../../../../shared/types/type";
import { formatTime12h } from "../../utils/Function";
import { Sofa } from "lucide-react";
import { AuthContext } from "../../components/context/AuthContext";
import Header from "../../components/customer/Header";

function toSeatType(type: string): "regular" | "premium" | "vip" {
  switch (type.toLowerCase()) {
    case "premium":
      return "premium";
    case "vip":
      return "vip";
    default:
      return "regular";
  }
}

// Helper function to calculate seat price based on type
const calculateSeatPrice = (seatType: string, pricing: {
  regularSeatPrice: number;
  premiumSeatPrice: number;
  vipSeatPrice: number;
}): number => {
  switch (seatType) {
    case "vip":
      return pricing.vipSeatPrice;
    case "premium":
      return pricing.premiumSeatPrice;
    case "regular":
    default:
      return pricing.regularSeatPrice;
  }
};

// Skeleton for seat grid and summary (matches SeatSelection.tsx)
const SeatGridAndSummarySkeleton = () => (
  <>
    {/* Seat Grid Skeleton */}
    <div className="flex flex-col items-center gap-3 mb-12 animate-pulse">
      {[...Array(6)].map((_, rowIdx) => (
        <div key={rowIdx} className="flex gap-3 items-center">
          <div className="w-8 h-5 bg-gray-800 rounded" />
          <div className="flex gap-1">
            {[...Array(10)].map((_, seatIdx) => (
              <div key={seatIdx} className="w-10 h-10 rounded-full bg-gray-800" />
            ))}
          </div>
        </div>
      ))}
    </div>
    {/* Seat Legend Skeleton */}
    <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-800 rounded" />
          <div className="h-4 w-16 bg-gray-800 rounded" />
        </div>
      ))}
    </div>
    {/* Selected Seats Summary Skeleton */}
    <div className="bg-gray-950 rounded-xl p-6 border border-gray-700 animate-pulse">
      <div className="h-6 w-40 bg-gray-800 rounded mb-4" />
      <div className="flex flex-wrap gap-2 mb-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-blue-900/20 border border-blue-800/30 px-3 py-1 rounded-full text-blue-300 text-sm h-6 w-20" />
        ))}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-gray-700 mb-4">
        <div className="h-4 w-32 bg-gray-800 rounded" />
        <div className="h-6 w-16 bg-gray-800 rounded" />
      </div>
      <div className="h-10 w-full bg-gray-800 rounded" />
    </div>
  </>
);

export default function SeatContainer() {

  const [seats, setSeats] = useState<ApiSeat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [timeLeft, setTimeLeft] = useState(120);
  // const [timeoutPopup, setTimeoutPopup] = useState(false);
  const [movieTitle, setMovieTitle] = useState<string>("");
  const [theaterName, setTheaterName] = useState<string>("");
  const [screeningDate, setScreeningDate] = useState<string>("");
  const [screeningTime, setScreeningTime] = useState<string>("");
  const { auth } = useContext(AuthContext)!;

  const [seatPrices, setSeatPrices] = useState<{
    regularSeatPrice: number;
    premiumSeatPrice: number;
    vipSeatPrice: number;
  }>({
    regularSeatPrice: 0,
    premiumSeatPrice: 0,
    vipSeatPrice: 0,
  });

  const { screeningId } = useParams<{ screeningId: string }>();
  const navigate = useNavigate();

  const mapApiSeatsToUiSeats = (apiSeats: ApiSeat[]): ApiSeat[] =>
    apiSeats.map((s) => ({
      id: s.id,
      rowNumber: s.rowNumber,
      seatNumber: s.seatNumber,
      seatType: toSeatType(s.seatType),
      isBooked: s.isBooked,
    }));

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        if (!screeningId) return;

        const result: ScreeningSeatData = await fetchSeatsByScreening(parseInt(screeningId));

        setMovieTitle(result.movieTitle);
        setTheaterName(result.theaterName);
        setScreeningDate(result.screeningDate);
        setScreeningTime(result.screeningTime);
        setSeatPrices({
          regularSeatPrice: result.regularSeatPrice,
          premiumSeatPrice: result.premiumSeatPrice,
          vipSeatPrice: result.vipSeatPrice,
        });
        const allSeats = mapApiSeatsToUiSeats(result.seats);
        setSeats(allSeats);

        setTimeout(() => setIsLoading(false), 500);
      } catch (err) {
        console.error("Failed to fetch seats:", err);
        setIsLoading(false);
      }
    };

    fetchSeats();
  }, [screeningId]);

  // useEffect(() => {
  //   if (loading || timeoutPopup) return;

  //   if (timeLeft <= 0) {
  //     setTimeoutPopup(true);
  //     setTimeout(() => navigate(-1), 3000);
  //     return;
  //   }

  //   const interval = setInterval(() => {
  //     setTimeLeft((prev) => prev - 1);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [timeLeft, loading, timeoutPopup, navigate]);

  // const formatCountdown = (seconds: number): string => {
  //   const m = Math.floor(seconds / 60).toString();
  //   const s = (seconds % 60).toString().padStart(2, "0");
  //   return `${m}:${s}`;
  // };

  const toggleSeat = (seatId: string) => {
    const seat = seats.find((s) => s.id === Number(seatId));
    if (seat?.isBooked) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const getTotalPrice = () =>
    selectedSeats.reduce((total, id) => {
      const seat = seats.find((s) => s.id === Number(id));
      if (!seat) return total;
      const price = calculateSeatPrice(seat.seatType, seatPrices);
      return total + price;
    }, 0);

  // Store complete booking data in localStorage when proceeding to payment
  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    // Get selected seat details
    const selectedSeatDetails = selectedSeats.map(seatId => {
      const seat = seats.find(s => s.id === Number(seatId));
      return {
        id: seat!.id,
        seatNumber: seat!.rowNumber + seat!.seatNumber,
        price: calculateSeatPrice(seat!.seatType, seatPrices),
        seatType: seat!.seatType
      };
    });

    // Create complete booking data
    const bookingData = {
      movieTitle,
      theaterName,
      date: screeningDate,
      time: screeningTime,
      screeningId: parseInt(screeningId!),
      seatIds: selectedSeats.map(Number),
      selectedSeats: selectedSeatDetails,
      totalAmount: getTotalPrice(),
      seatPrices,
      // User data from auth context
      customerName: auth?.name || "Guest",
      customerPhone: auth?.phone || "-",
      customerEmail: auth?.email || ""
    };

    // Store in localStorage
    localStorage.setItem('selectedBooking', JSON.stringify(bookingData));

    // Navigate to payment with minimal URL params
    navigate(`/payment?screeningId=${screeningId}&seats=${selectedSeats.join(',')}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <Header />
        <div className="max-w-7xl mx-auto mb-8 pb-6 px-4">
          <div className="flex items-center justify-between mb-6">
            <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
              Back to Movies
            </button>
            <div className="flex items-center gap-4 flex-wrap">
              {/* <div className="flex items-center gap-2 text-gray-300 whitespace-nowrap">
                <Clock className="w-4 h-4" /> <span>{formatCountdown(timeLeft)} remaining</span>
              </div> */}
              <div className="flex items-center gap-2 bg-blue-600 px-3 py-1 rounded-full">
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm font-medium">$0.00</span>
              </div>
            </div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-center mb-2">Select Your Seats</h1>
          <p className="text-gray-400 text-center mb-4">
            {movieTitle} - {theaterName} - {screeningDate} {formatTime12h(screeningTime)}
          </p>
          <p className="text-gray-400 text-center">
            Choose the perfect seats for your movie experience
          </p>
        </div>
        <div className="max-w-7xl mx-auto">
          {/* Screen Skeleton */}
          <div className="relative mb-16">
            <div className="w-full h-12 bg-gradient-to-b from-gray-300 to-gray-500 mx-auto rounded-lg flex items-center justify-center text-gray-700 font-semibold shadow-lg">
              <Monitor className="w-6 h-6 mr-2" />
              SCREEN
            </div>
            <div className="absolute inset-x-0 top-12 h-4 bg-gradient-to-b from-gray-300/20 to-transparent"></div>
          </div>
          <SeatGridAndSummarySkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white ">
      {/* {timeoutPopup && <TimeoutPopup />} */}
      <Header />
      {/* Header */}
      <div className="pb-6 ">
        <div className="max-w-7xl mx-auto mb-8 px-4">
          <div className="flex items-center justify-between mb-6">
            <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
              Back to Movies
            </button>
            <div className="flex items-center gap-4 flex-wrap">
              {/* <div className="flex items-center gap-2 text-gray-300 whitespace-nowrap">
              <Clock className="w-4 h-4" /> <span>{formatCountdown(timeLeft)} remaining</span>
            </div> */}
              <div className="flex items-center gap-2 bg-blue-600 px-3 py-1 rounded-full">
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm font-medium">${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-center mb-2">Select Your Seats</h1>
          <p className="text-gray-400 text-center mb-4">
            {movieTitle} - {theaterName} - {screeningDate} {formatTime12h(screeningTime)}
          </p>
          <p className="text-gray-400 text-center">
            Choose the perfect seats for your movie experience
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          {/* Screen */}
          <div className="relative mb-16">
            <div className="w-full h-12 bg-gradient-to-b from-gray-300 to-gray-500 mx-auto rounded-lg flex items-center justify-center text-gray-700 font-semibold shadow-lg">
              <Monitor className="w-6 h-6 mr-2" />
              SCREEN
            </div>
            <div className="absolute inset-x-0 top-12 h-4 bg-gradient-to-b from-gray-300/20 to-transparent"></div>
          </div>
          {/* Seat Grid */}
          <div className="flex flex-col items-center gap-3 mb-12">
            {Array.from(new Set(seats.map((s) => s.rowNumber)))
              .sort()
              .map((row) => {
                const rowSeats = seats
                  .filter((s) => s.rowNumber === row)
                  .sort((a, b) => a.seatNumber - b.seatNumber);
                const firstHalf = rowSeats.slice(0, 6);
                const secondHalf = rowSeats.slice(6, 12);
                return (
                  <div key={row} className="flex flex-col sm:flex-row items-center gap-3 justify-center w-full max-w-4xl">
                    <span className="w-8 text-center font-semibold text-gray-400 shrink-0">{row}</span>
                    <div className="flex flex-col sm:flex-row gap-1">
                      <div className="flex gap-1 justify-center">
                        {firstHalf.map((seat) => (
                          <SeatCard
                            key={seat.id}
                            seat={seat}
                            isSelected={selectedSeats.includes(seat.id.toString())}
                            onToggle={toggleSeat}
                            pricing={seatPrices}
                          />
                        ))}
                      </div>
                      <div className="flex gap-1 justify-center sm:ml-2 mt-1 sm:mt-0">
                        {secondHalf.map((seat) => (
                          <SeatCard
                            key={seat.id}
                            seat={seat}
                            isSelected={selectedSeats.includes(seat.id.toString())}
                            onToggle={toggleSeat}
                            pricing={seatPrices}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {/* Seat Legend */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <LegendBox colorFrom="#4b5563" colorTo="#374151" label={`Regular - $${seatPrices.regularSeatPrice}`} />
            <LegendBox colorFrom="#8b5cf6" colorTo="#7c3aed" label={`Premium - $${seatPrices.premiumSeatPrice}`} />
            <LegendBox colorFrom="#fbbf24" colorTo="#d97706" label={`VIP - $${seatPrices.vipSeatPrice}`} />
            <LegendBox colorFrom="#dc2626" colorTo="#dc2626" label="Booked" opacity />
          </div>
          {/* Selected Seats Summary */}
          <SelectedSeats
            selectedSeats={selectedSeats}
            seats={seats}
            totalPrice={getTotalPrice()}
            screeningId={screeningId}
            pricing={seatPrices}
            onProceedToPayment={handleProceedToPayment}
          />
        </div>
      </div>
    </div>
  );
}
