import React, { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PaymentSummary from "../../components/customer/payment/PaymentSummary";
import PaymentForm from "../../components/customer/payment/PaymentForm";
import PaymentSuccess from "../../components/customer/payment/PaymentSuccess";
import LoadingSpinner from "../../components/customer/LoadingSpinner";
import TimeoutPopup from "../../components/customer/TimeoutPopup";
import { bookSeats, fetchSeatsByScreening } from "../../api/customer";
import { BookingSummary, ApiSeat } from "../../../../shared/types/type";

export default function PaymentContainer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const screeningIdParam = searchParams.get("screeningId");
  const seatParam = searchParams.get("seats");

  const screeningId = screeningIdParam ? Number(screeningIdParam) : undefined;

  // ✅ Fix infinite loop by memoizing seatIds
  const seatIds: number[] = useMemo(() => {
    return seatParam ? seatParam.split(",").map((id) => Number(id)) : [];
  }, [seatParam]);

  const [bookingSummary, setBookingSummary] = useState<BookingSummary | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [processing, setProcessing] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [timeoutPopup, setTimeoutPopup] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(120);

  useEffect(() => {
    if (pageLoading || processing || timeoutPopup) return;

    if (timeLeft <= 0) {
      setTimeoutPopup(true);
      setTimeout(() => navigate(-1), 3000);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, pageLoading, processing, timeoutPopup, navigate]);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60).toString();
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
  if (!screeningId || seatIds.length === 0) {
    alert("Missing screening or seats.");
    navigate(-1);
    return;
  }

  setPageLoading(true);

  fetchSeatsByScreening(screeningId)
    .then((data) => {
      if (!data || !data.seats) {
        throw new Error("Invalid data format from API");
      }

      const selectedSeats = data.seats.filter((seat: ApiSeat) =>
        seatIds.includes(seat.id)
      );

      const totalAmount = selectedSeats.reduce((sum, s) => sum + s.price, 0);

      setBookingSummary({
        movieTitle: data.movieTitle,
        theaterName: data.theaterName,
        date: data.screeningDate,
        time: data.screeningTime,
        customerName: "Guest",
        customerPhone: "-",
        seats: selectedSeats.map((s) => ({
          seat_number: s.row_number + s.seat_number,
          price: s.price,
        })),
        totalAmount,
        screeningId,
      });

      // 👇 Add artificial delay here
      setTimeout(() => {
        setPageLoading(false);
      }, 500); // adjust to 800ms if needed
    })
    .catch((error) => {
      console.error("Failed to load seat info:", error);
      alert("Failed to load seat info.");
      setPageLoading(false);
      navigate(-1);
    });
}, [screeningId, seatIds, navigate]);


  const userId = null;

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      alert("Select a payment method");
      return;
    }
    if (!bookingSummary) return;

    setProcessing(true);

    try {
      await new Promise((res) => setTimeout(res, 1500));
      await bookSeats(userId, bookingSummary.screeningId!, seatIds);

      setBookingSummary((prev) =>
        prev
          ? {
              ...prev,
              customerName: "Guest",
              customerPhone: "-",
            }
          : prev
      );
      setIsCompleted(true);
    } catch (error: any) {
      alert("Payment failed: " + (error.message || "Unknown error"));
    } finally {
      setProcessing(false);
    }
  };

  console.log("pageLoading:", pageLoading, "processing:", processing, "bookingSummary:", bookingSummary);

  if (pageLoading || processing) return <LoadingSpinner />;
  if (!bookingSummary) return <div className="text-white">Booking data not found</div>;
  if (isCompleted) return <PaymentSuccess bookingSummary={bookingSummary} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 lg:p-8 relative">
      {timeoutPopup && <TimeoutPopup />}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Seats
          </button>
          <div className="flex items-center gap-4 text-gray-300">
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)} remaining</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">Complete Booking</h1>
        <p className="text-gray-400 text-center">Confirm your seats and pay</p>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        <PaymentSummary bookingSummary={bookingSummary} />
        <PaymentForm
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
          handlePayment={handlePayment}
          isProcessing={processing}
          totalAmount={bookingSummary.totalAmount}
        />
      </div>
    </div>
  );
}
