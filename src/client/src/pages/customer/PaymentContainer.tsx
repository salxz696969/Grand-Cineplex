import React, { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PaymentSummary from "../../components/customer/payment/PaymentSummary";
import PaymentForm from "../../components/customer/payment/PaymentForm";
import PaymentSuccess from "../../components/customer/payment/PaymentSuccess";
import LoadingSpinner from "../../components/customer/LoadingSpinner";
import AuthModal from "../../components/customer/useraccess/PopupLogSign";
import { bookSeats, fetchSeatsByScreening } from "../../api/customer";
import { BookingSummary, ApiSeat } from "../../../../shared/types/type";
import {jwtDecode} from "jwt-decode";
import { fetchUserInfo } from "../../api/customer";

export default function PaymentContainer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const screeningIdParam = searchParams.get("screeningId");
  const seatParam = searchParams.get("seats");

  const screeningId = screeningIdParam ? Number(screeningIdParam) : undefined;
  const seatIds: number[] = useMemo(() => {
    return seatParam ? seatParam.split(",").map(Number) : [];
  }, [seatParam]);

  const [bookingSummary, setBookingSummary] = useState<BookingSummary | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [processing, setProcessing] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isAuthRequired, setIsAuthRequired] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(120); // ⏳ 2 minutes timer


  useEffect(() => {
    if (isAuthRequired) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("Your session has expired. Please start over.");
          navigate(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, isAuthRequired]);

  // Check token on load and set auth requirement + customer info
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp > now) {
          setIsAuthRequired(false);
          fetchUserInfo()
            .then((userData) => {
              setBookingSummary((prev) =>
                prev
                  ? {
                      ...prev,
                      customerName: userData.name,
                      customerPhone: userData.phone || "-",
                    }
                  : prev
              );
            })
            .catch((err) => {
              console.error("Failed to fetch user info on load:", err);
            });
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsAuthRequired(true);
        }
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthRequired(true);
      }
    } else {
      setIsAuthRequired(true);
    }
  }, []);

  // Fetch booking info (movie, theater, seats)
  useEffect(() => {
    if (!screeningId || seatIds.length === 0) {
      alert("Missing screening or seats.");
      navigate(-1);
      return;
    }

    setPageLoading(true);

    fetchSeatsByScreening(screeningId)
      .then((data) => {
        if (!data || !data.seats) throw new Error("Invalid data format from API");

        const selectedSeats = data.seats.filter((seat: ApiSeat) => seatIds.includes(seat.id));
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

        setTimeout(() => setPageLoading(false), 500);
      })
      .catch((error) => {
        console.error("Failed to load seat info:", error);
        alert("Failed to load seat info.");
        setPageLoading(false);
        navigate(-1);
      });
  }, [screeningId, seatIds, navigate]);

  // On successful login from modal: update auth and user info
  const handleAuthSuccess = async () => {
    setIsAuthRequired(false);
    try {
      const userData = await fetchUserInfo();
      setBookingSummary((prev) =>
        prev
          ? {
              ...prev,
              customerName: userData.name,
              customerPhone: userData.phone || "-",
            }
          : prev
      );
    } catch (error) {
      console.error("Failed to fetch user info after login:", error);
    }
  };

  // Handle payment submission
  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      alert("Select a payment method");
      return;
    }
    if (!bookingSummary) return;

    setProcessing(true);

    try {
      await new Promise((res) => setTimeout(res, 1500));
      await bookSeats(bookingSummary.screeningId!, seatIds, "confirmed");
      setIsCompleted(true);
    } catch (error: any) {
      alert("Payment failed: " + (error.message || "Unknown error"));
    } finally {
      setProcessing(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (pageLoading || processing) return <LoadingSpinner />;
  if (!bookingSummary) return <div className="text-white">Booking data not found</div>;
  if (isCompleted) return <PaymentSuccess bookingSummary={bookingSummary} />;

  return (
    <>
      {/* Modal if not logged in */}
      {isAuthRequired && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-auto"
          style={{
            backgroundColor: "transparent",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <AuthModal onSuccess={handleAuthSuccess} />
        </div>
      )}

      <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 lg:p-8 transition-filter duration-300 ${
          isAuthRequired ? "blur-sm pointer-events-none overflow-hidden h-screen" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-300 hover:text-white" >
              <ArrowLeft className="w-5 h-5" />
              Back to Seats
            </button>
            <div className="flex items-center gap-2 text-gray-300 whitespace-nowrap">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{formatTime(timeLeft)} remaining</span>
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
    </>
  );
}

