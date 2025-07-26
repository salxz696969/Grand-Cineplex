import React, { useState, useEffect, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PaymentSummary from "../../components/customer/payment/PaymentSummary";
import PaymentForm from "../../components/customer/payment/PaymentForm";
import PaymentSuccess from "../../components/customer/payment/PaymentSuccess";
import LoadingSpinner from "../../components/customer/LoadingSpinner";
import AuthModal from "../../components/customer/useraccess/PopupLogSign";
import { bookSeats, fetchSeatsByScreening } from "../../api/customer";
import { BookingSummary, ApiSeat } from "../../../../shared/types/type";
import { jwtDecode } from "jwt-decode";
import { fetchUserInfo } from "../../api/customer";
import Header from "../../components/customer/Header";

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
  const [processing, setProcessing] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isAuthRequired, setIsAuthRequired] = useState<boolean>(true);

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
            seatNumber: s.rowNumber + s.seatNumber,
            price: s.price,
          })),
          totalAmount,
          screeningId,
        });

      })
      .catch((error) => {
        console.error("Failed to load seat info:", error);
        alert("Failed to load seat info.");
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

  // Handle QR payment success
  const handlePaymentSuccess = async () => {
    if (!bookingSummary) return;

    setProcessing(true);

    try {
      await new Promise((res) => setTimeout(res, 1000)); // Brief delay for UX
      await bookSeats(bookingSummary.screeningId!, seatIds, "confirmed");
      setIsCompleted(true);
    } catch (error: any) {
      alert("Booking failed: " + (error.message || "Unknown error"));
    } finally {
      setProcessing(false);
    }
  };

  if (isCompleted) return <PaymentSuccess bookingSummary={bookingSummary!} />;

  return (
    <>

      <div className={`min-h-screen bg-gray-950 text-white transition-filter duration-300`}
      >
        <Header />
        <div className="pb-6">
          <div className="max-w-7xl mx-auto  pb-6">
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-300 hover:text-white" >
                <ArrowLeft className="w-5 h-5" />
                Back to Seats
              </button>
            </div>
            <h1 className="text-3xl font-bold text-center mb-2">Complete Booking</h1>
            <p className="text-gray-400 text-center">Confirm your seats and pay</p>
          </div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
            <PaymentSummary bookingSummary={bookingSummary!} />
            <PaymentForm
              selectedPaymentMethod={selectedPaymentMethod}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
              handlePayment={handlePayment}
              isProcessing={processing}
              totalAmount={bookingSummary!.totalAmount}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </div>
        </div>
      </div>
    </>
  );
}

