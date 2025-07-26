import React, { useContext, useState } from "react";
import { Sofa } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Seat } from "../../../../../shared/types/type";
import { AuthContext } from "../../context/AuthContext";
import AuthModal from "../useraccess/PopupLogSign";


interface SelectedSeatsProps {
  selectedSeats: string[];
  seats: Seat[];
  totalPrice: number;
  screeningId?: string | null;
}

const SelectedSeats = ({ selectedSeats, seats, totalPrice, screeningId }: SelectedSeatsProps) => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { auth, setAuth, loading } = useContext(AuthContext)!;

  const handleContinue = () => {
    if (!auth) {
      setShowAuthModal(true);
      return;
    }
    if (!screeningId) {
      alert("Screening information is missing.");
      return;
    }
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    const seatParam = selectedSeats.join(",");
    navigate(`/payment?screeningId=${screeningId}&seats=${seatParam}`);
  };

  return (
    <div className="bg-gray-950 rounded-xl p-6 border border-gray-700 max-w-7xl mx-auto relative">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Sofa className="w-5 h-5" /> Selected Seats
      </h2>
      {selectedSeats.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedSeats
              .slice()
              .sort()
              .map((id) => {
                const seat = seats.find((s) => s.id === id);
                const seatLabel = seat ? `${seat.row}${seat.number}` : id;
                return (
                  <span key={id} className="bg-blue-600/20 border border-blue-500/30 px-3 py-1 rounded-full text-blue-300 text-sm">
                    {seatLabel} - ${seat?.price}
                  </span>
                );
              })}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-gray-700">
            <span className="text-gray-300">Total ({selectedSeats.length} seats):</span>
            <span className="text-2xl font-bold text-blue-600">${totalPrice.toFixed(2)}</span>
          </div>
          <button onClick={handleContinue} className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform">
            Continue to Payment
          </button>
        </>
      ) : (
        <p className="text-gray-400 text-center py-4">No seats selected. Click on seats to make your selection.</p>
      )}
      {showAuthModal && <AuthModal onSuccess={() => setShowAuthModal(false)} onClose={() => setShowAuthModal(false)} />}
    </div>
  );
};

export default SelectedSeats;
