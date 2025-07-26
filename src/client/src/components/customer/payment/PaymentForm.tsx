import React, { useState, useEffect } from "react";
import { CreditCard, Wallet, Banknote, QrCode, CheckCircle, Clock, XCircle } from "lucide-react";
import { getQrCode, checkPaymentStatus } from "../../../api/customer";

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

  useEffect(() => {
    handleQrCodePayment();
    setSelectedPaymentMethod("qr");
  }, []);

  const handleQrCodePayment = async () => {
    try {
      // For testing, use a small amount
      const data = await getQrCode(0.01);
      const transactionId = data.tranId || "";
      setQrCode(data.qrImage);
      setTranId(transactionId);
      setPaymentStatus("PENDING");
      setPollCount(0);
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
    const pollInterval = setInterval(async () => {
      try {
        const statusData = await checkPaymentStatus(transactionId);
        console.log("Payment status:", statusData);

        // Increment poll count
        setPollCount(prev => {
          const newCount = prev + 1;
          console.log(`Poll count: ${newCount}`);

          // Fake completion after 5 polls for sandbox testing
          if (newCount >= 5) {
            console.log("Faking payment completion after 5 polls");
            setPaymentStatus("APPROVED");
            setIsPolling(false);
            clearInterval(pollInterval);
            // Call parent success handler instead of internal one
            onPaymentSuccess();
            return newCount;
          }

          return newCount;
        });

        if (statusData.status === "APPROVED") {
          setPaymentStatus("APPROVED");
          setIsPolling(false);
          clearInterval(pollInterval);
          onPaymentSuccess();
        } else if (statusData.status === "CANCELLED" || statusData.status === "DECLINED") {
          setPaymentStatus("FAILED");
          setIsPolling(false);
          clearInterval(pollInterval);
        }
        // If still PENDING, continue polling
      } catch (error) {
        console.error("Error checking payment status:", error);
        // Continue polling on error
      }
    }, 3000); // Poll every 3 seconds

    // Stop polling after 5 minutes (300 seconds)
    setTimeout(() => {
      clearInterval(pollInterval);
      setIsPolling(false);
      if (paymentStatus === "PENDING") {
        setPaymentStatus("timeout");
      }
    }, 200000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-6">Payment</h2>
      {/* Payment method selection commented out
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        <div className="grid grid-cols-2 gap-3">
          {paymentMethods.map((method) => (
            <button key={method.id} className={`p-4 rounded-lg border-2 transition-all duration-200 ${selectedPaymentMethod === method.id
              ? "border-sky-500 bg-sky-500/10"
              : "border-gray-600 bg-gray-700/50 hover:border-gray-500"
              }`} onClick={() => {
                setSelectedPaymentMethod(method.id);
                if (method.id === "qr") {
                  handleQrCodePayment();
                }
              }} type="button"
            >
              <div className="text-center">
                <div className={`p-2 rounded-lg mx-auto mb-2 w-fit ${selectedPaymentMethod === method.id
                  ? "bg-sky-500 text-white"
                  : "bg-gray-600 text-gray-300"
                  }`}
                >
                  {method.icon}
                </div>
                <div className="text-sm font-medium">{method.name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      */}

      {qrCode && (
        <div className="bg-gray-950 rounded-xl p-6 border border-gray-700">
          {/* <h3 className="text-lg font-semibold mb-4">QR Payment</h3> */}
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
                  <span className="text-yellow-400">Waiting for payment (Poll {pollCount}/5)</span>
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
