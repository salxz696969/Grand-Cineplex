import React, { useState } from "react";
import Header from "../components/homecomponents/Header";
import SeatCard from "../components/seats/SeatCard";
import { FaCheck } from "react-icons/fa";
import OrderDetails from "../components/seats/OrderDetails";

export default function SeatContainer() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-[#171c20] text-white">
      <Header />
      <div className="px-[20px] sm:px-[60px] md:px-[100px] lg:px-[180px] py-6">
          <div className="flex items-center">
              <div className="flex flex-col">
                  <h1>Choose Seat</h1>
                  <SeatCard/>
              </div>
              <div className="flex flex-col">
                  <h1>Order Details</h1>
                  <OrderDetails/>
              </div>
          </div>
      </div>
    </div>
  );
}
