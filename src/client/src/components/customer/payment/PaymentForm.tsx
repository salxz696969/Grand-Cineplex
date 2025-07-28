import React, { useState, useEffect } from "react";
import { CreditCard, Wallet, Banknote, QrCode, CheckCircle, Clock, XCircle } from "lucide-react";
import { getQrCode } from "../../../api/customer";

const paymentMethods = [
  { id: "qr", name: "QR", icon: <QrCode className="w-5 h-5" /> },
];

interface PaymentFormProps {
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  handlePayment: () => Promise<void> | void;
  isProcessing: boolean;
  totalAmount: number;
  onPaymentSuccess: () => void;
}

export default function PaymentForm({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  handlePayment,
  isProcessing,
  totalAmount,
  onPaymentSuccess,
}: PaymentFormProps) {
  const [qrCode, setQrCode] = useState<any>("");
  const [tranId, setTranId] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>("PENDING");
  const [isPolling, setIsPolling] = useState(false);
  const [pollCount, setPollCount] = useState(0);
  const [showQr, setShowQr] = useState(false);
  const [hasCalledSuccess, setHasCalledSuccess] = useState(false); // Prevent multiple success calls

  // Remove automatic QR generation on mount
  useEffect(() => {
    setSelectedPaymentMethod("qr");
  }, []);

  const handleQrCodePayment = async () => {
    try {
      // For testing, use a small amount
      const data = await getQrCode(totalAmount);
      const transactionId = data.tranId || "";
      setQrCode(data.qrImage);
      setTranId(transactionId);
      setPaymentStatus("PENDING");
      setPollCount(0);
      setShowQr(true);
      setHasCalledSuccess(false); // Reset success flag
      startPolling(transactionId);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const startPolling = (transactionId: string) => {
    if (!transactionId) {
      console.log("No transaction ID provided for polling");
      return;
    }

    setIsPolling(true);
    let currentPollCount = 0;

    const pollInterval = setInterval(async () => {
      try {
        // Fake status check - no real API call
        // const statusData = await checkPaymentStatus(transactionId);
        // console.log("Payment status:", statusData);

        currentPollCount++;
        setPollCount(currentPollCount);
        console.log(`Poll count: ${currentPollCount}`);

        // After 3 polls (9 seconds total), fake completion
        if (currentPollCount >= 3) {
          console.log("Faking payment completion after 3 polls");
          setPaymentStatus("APPROVED");
          setIsPolling(false);
          clearInterval(pollInterval);

          // Only call success once
          if (!hasCalledSuccess) {
            setHasCalledSuccess(true);
            onPaymentSuccess();
          }
          return;
        }

        // Simulate pending status for first 2 polls
        setPaymentStatus("PENDING");

      } catch (error) {
        console.error("Error checking payment status:", error);
        // Continue polling on error
      }
    }, 3000); // Poll every 3 seconds

    // Stop polling after 15 seconds as backup
    setTimeout(() => {
      clearInterval(pollInterval);
      setIsPolling(false);
      if (paymentStatus === "PENDING") {
        setPaymentStatus("timeout");
      }
    }, 15000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-6">Payment</h2>

      {/* Show QR Button */}
      {!showQr && (
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-4">QR Payment</h3>
          <p className="text-gray-400 mb-4">Click the button below to generate a QR code for payment</p>
          <button
            onClick={handleQrCodePayment}
            disabled={isProcessing}
            className="w-full py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Show QR Code
          </button>
        </div>
      )}

      {qrCode && showQr && (
        <div className="bg-gray-950 rounded-xl p-6 border border-gray-700">
          <div className="space-y-4">
            <img
              src={qrCode}
              alt="QR Code"
              className="w-full h-auto rounded-xl border-2 border-sky-600"
            />

            {/* Payment Status */}
            <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-900/50 border border-gray-700">
              {paymentStatus === "PENDING" && (
                <>
                  <Clock className="w-5 h-5 text-yellow-400 animate-pulse" />
                  <span className="text-yellow-400">Waiting for payment ({pollCount}/3)</span>
                </>
              )}
              {paymentStatus === "APPROVED" && (
                <>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-green-400">Payment completed!</span>
                </>
              )}
              {paymentStatus === "FAILED" && (
                <>
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400">Payment failed</span>
                </>
              )}
              {paymentStatus === "timeout" && (
                <>
                  <XCircle className="w-5 h-5 text-red-400" />
                  <span className="text-red-400">Payment timeout</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={!selectedPaymentMethod || isProcessing || (selectedPaymentMethod === "qr" && paymentStatus !== "APPROVED")}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${selectedPaymentMethod && !isProcessing && (selectedPaymentMethod !== "qr" || paymentStatus === "APPROVED")
          ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white transform hover:scale-105"
          : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        type="button"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </div>
        ) : selectedPaymentMethod === "qr" && paymentStatus === "APPROVED" ? (
          "Complete Booking"
        ) : (
          `Complete Payment - $${totalAmount.toFixed(2)}`
        )}
      </button>
    </div>
  );
}
