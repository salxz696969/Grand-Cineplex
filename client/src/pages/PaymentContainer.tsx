import React, { useState, useEffect } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PaymentSummary from "../components/payment/PaymentSummary";
import PaymentForm from "../components/payment/PaymentForm";
import PaymentSuccess from "../components/payment/PaymentSuccess";
import LoadingSpinner from "../components/LoadingSpinner";
import TimeoutPopup from "../components/TimeOutPopUp";

const bookingSummary = {
  movieTitle: "The Great Adventure",
  theater: "Theater #1 - Grand Cineplex CADT",
  date: "December 20, 2024",
  time: "7:30 PM",
  seats: ["A5", "A6", "A7"],
  totalAmount: 37.5,
  customerName: "John Doe",
  customerPhone: "+1 (555) 123-4567",
};

export default function PaymentContainer() {
  const navigate = useNavigate();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Countdown timer for 2 minutes (120 seconds)
  const [timeLeft, setTimeLeft] = useState(120);
  const [timeoutPopup, setTimeoutPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Handle countdown timer & timeout popup
  useEffect(() => {
    if (pageLoading || processing || timeoutPopup) return;

    if (timeLeft <= 0) {
      setTimeoutPopup(true);
      setTimeout(() => navigate(-1), 3000); // Redirect after 3 seconds
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, pageLoading, processing, timeoutPopup, navigate]);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60).toString();
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handlePayment = () => {
    if (!selectedPaymentMethod) return;
    setProcessing(true);
  };

  useEffect(() => {
    if (!processing) return;

    const timer = setTimeout(() => {
      setProcessing(false);
      setIsCompleted(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [processing]);

  if (pageLoading || processing) return <LoadingSpinner />;

  if (isCompleted) return <PaymentSuccess bookingSummary={bookingSummary} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 lg:p-8 relative">
      {timeoutPopup && <TimeoutPopup />}

      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Seat Selection
          </button>
          <div className="flex items-center gap-4 text-gray-300">
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)} remaining</span>
          </div>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-center mb-2">Complete Booking</h1>
        <p className="text-gray-400 text-center">Process payment and confirm booking</p>
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
