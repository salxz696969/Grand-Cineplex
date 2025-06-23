import React from "react";
import { CreditCard, Wallet, Banknote, QrCode } from "lucide-react";

const paymentMethods = [
  { id: "cash", name: "Cash", icon: <Banknote className="w-5 h-5" /> },
  { id: "card", name: "Card", icon: <CreditCard className="w-5 h-5" /> },
  { id: "digital", name: "Digital", icon: <Wallet className="w-5 h-5" /> },
  { id: "qr", name: "QR", icon: <QrCode className="w-5 h-5" /> },
];

export default function PaymentForm({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  handlePayment,
  isProcessing,
  totalAmount,
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-6">Payment</h2>
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        <div className="grid grid-cols-2 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedPaymentMethod === method.id
                  ? "border-sky-500 bg-sky-500/10"
                  : "border-gray-600 bg-gray-700/50 hover:border-gray-500"
              }`}
              onClick={() => setSelectedPaymentMethod(method.id)}
            >
              <div className="text-center">
                <div
                  className={`p-2 rounded-lg mx-auto mb-2 w-fit ${
                    selectedPaymentMethod === method.id
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

      {selectedPaymentMethod === "card" && (
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 space-y-3">
          <h3 className="text-lg font-semibold mb-4">Card Details</h3>
          <input type="text" placeholder="Card Number" className="input-style" />
          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="MM/YY" className="input-style" />
            <input type="text" placeholder="CVV" className="input-style" />
          </div>
        </div>
      )}

      {selectedPaymentMethod === "qr" && (
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold mb-4">QR Payment</h3>
          <img src="/qr.png" alt="QR Code" className="w-full h-auto" />
        </div>
      )}

      {selectedPaymentMethod === "digital" && (
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 space-y-2">
          <h3 className="text-lg font-semibold mb-4">Digital Payment</h3>
          {["Apple Pay", "Google Pay", "PayPal"].map((name) => (
            <div key={name} className="flex gap-4 border border-gray-700 rounded-lg p-4 items-center">
              <div className="bg-sky-800 rounded-lg p-1">
                <CreditCard className="w-10 h-10" />
              </div>
              <p>{name}</p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={!selectedPaymentMethod || isProcessing}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
          selectedPaymentMethod && !isProcessing
            ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white transform hover:scale-105"
            : "bg-gray-700 text-gray-400 cursor-not-allowed"
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing...
          </div>
        ) : (
          `Complete Payment - $${totalAmount}`
        )}
      </button>
    </div>
  );
}
