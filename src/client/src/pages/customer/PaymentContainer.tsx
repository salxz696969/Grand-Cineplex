import React, { useState, useEffect, useContext } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PaymentSummary from "../../components/customer/payment/PaymentSummary";
import PaymentForm from "../../components/customer/payment/PaymentForm";
import PaymentSuccess from "../../components/customer/payment/PaymentSuccess";
import LoadingSpinner from "../../components/customer/LoadingSpinner";
import AuthModal from "../../components/customer/useraccess/PopupLogSign";
import { bookSeats } from "../../api/customer";
import { BookingSummary } from "../../../../shared/types/type";
import { AuthContext } from "../../components/context/AuthContext";
import Header from "../../components/customer/Header";

export default function PaymentContainer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { auth } = useContext(AuthContext)!;

  const screeningIdParam = searchParams.get("screeningId");
  const seatParam = searchParams.get("seats");

  const screeningId = screeningIdParam ? Number(screeningIdParam) : undefined;
  const seatIds: number[] = React.useMemo(() => {
    return seatParam ? seatParam.split(",").map(Number) : [];
  }, [seatParam]);

  const [bookingSummary, setBookingSummary] = useState<BookingSummary | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isAuthRequired, setIsAuthRequired] = useState<boolean>(true);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [hasBooked, setHasBooked] = useState<boolean>(false); // Add this to prevent multiple bookings

  // Load booking data from localStorage and set up initial state
  useEffect(() => {
    const storedBooking = localStorage.getItem('selectedBooking');

    if (!storedBooking) {
      alert("No booking data found. Please return to seat selection.");
      navigate(-1);
      return;
    }

    try {
      const bookingData = JSON.parse(storedBooking);

      // Create booking summary from stored data
      const summary: BookingSummary = {
        movieTitle: bookingData.movieTitle,
        theaterName: bookingData.theaterName,
        date: bookingData.date,
        time: bookingData.time,
        customerName: auth?.name || bookingData.customerName || "Guest",
        customerPhone: auth?.phone || bookingData.customerPhone || "-",
        seats: bookingData.selectedSeats.map((seat: any) => ({
          seatNumber: seat.seatNumber,
          price: seat.price,
        })),
        totalAmount: bookingData.totalAmount,
        screeningId: bookingData.screeningId,
      };

      setBookingSummary(summary);

      // Check if user is authenticated
      if (auth) {
        setIsAuthRequired(false);
        // Update customer info from auth context
        setBookingSummary(prev => prev ? {
          ...prev,
          customerName: auth.name,
          customerPhone: auth.phone || "-",
        } : prev);
      } else {
        setIsAuthRequired(true);
        setShowAuthModal(true);
      }
    } catch (error) {
      console.error("Failed to parse booking data:", error);
      alert("Invalid booking data. Please return to seat selection.");
      navigate(-1);
    }
  }, [auth, navigate]);

  // Handle successful authentication
  const handleAuthSuccess = () => {
    setIsAuthRequired(false);
    setShowAuthModal(false);

    // Update booking summary with user info
    if (auth && bookingSummary) {
      setBookingSummary({
        ...bookingSummary,
        customerName: auth.name,
        customerPhone: auth.phone || "-",
      });
    }
  };

  // Single booking function to prevent multiple bookings
  const createBooking = async () => {
    if (!bookingSummary || hasBooked) return; // Prevent multiple bookings

    setProcessing(true);
    setHasBooked(true); // Mark as booked immediately

    try {
      await new Promise((res) => setTimeout(res, 1500));
      await bookSeats(
        bookingSummary.screeningId!,
        seatIds,
        selectedPaymentMethod || "qr", // Default to QR if no method selected
        bookingSummary.totalAmount || 0,
        "confirmed"
      );

      // Clear stored booking data after successful booking
      localStorage.removeItem('selectedBooking');

      setIsCompleted(true);
    } catch (error: any) {
      setHasBooked(false); // Reset if booking failed
      alert("Payment failed: " + (error.message || "Unknown error"));
    } finally {
      setProcessing(false);
    }
  };

  // Handle payment submission
  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      alert("Select a payment method");
      return;
    }
    if (!bookingSummary) return;

    await createBooking();
  };

  // Handle QR payment success
  const handlePaymentSuccess = async () => {
    if (!bookingSummary) return;

    await createBooking();
  };

  // Show loading while booking data is being processed
  if (!bookingSummary) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (isCompleted) return <PaymentSuccess bookingSummary={bookingSummary} />;

  return (
    <>
      <div className={`min-h-screen bg-gray-950 text-white transition-filter duration-300`}>
        <Header />
        <div className="pb-6">
          <div className="max-w-7xl mx-auto pb-6">
            <div className="flex items-center justify-between mb-6">
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-300 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
                Back to Seats
              </button>
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
              totalAmount={bookingSummary.totalAmount || 0}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onSuccess={handleAuthSuccess}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
}

