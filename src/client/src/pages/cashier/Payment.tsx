import React, { useEffect, useState } from "react";
import {
	CreditCard,
	Wallet,
	Banknote,
	QrCode,
	ArrowLeft,
	CheckCircle,
	Clock,
	Sofa,
	Monitor,
	Receipt,
	User,
	Calendar,
	MapPin,
} from "lucide-react";
import sequelize from "./../../../../server/src/db/index";
import { getMoviesAndItsScreenings, submitBooking } from "../../api/cashier";

interface PaymentMethod {
	id: string;
	name: string;
	icon: React.ReactNode;
	description: string;
}

interface BookingSummary {
	movieTitle: string;
	theater: string;
	date: string;
	time: string;
	seats: string[];
	totalAmount: number;
	customerName?: string;
	customerPhone?: string;
}

type BookingData = {
	screeningId: string;
	seats: SelectedSeats[];
	totalPrice: number;
};

type SelectedSeats={
    seatId: string;
    idNumber: number;
}

interface Screening {
	id: number;
	movieId: number;
	theaterId: number;
	screeningDate: string;
	screeningTime: string;
	price: string;
	createdAt: string;
	updatedAt: string;
	movie: {
		id: number;
		title: string;
		duration: number;
		genre: string;
	};
	theater: {
		id: number;
		name: string;
	};
}

export function Payment() {
	const [selectedPaymentMethod, setSelectedPaymentMethod] =
		useState<string>("");
	const [isProcessing, setIsProcessing] = useState(false);
	const [isCompleted, setIsCompleted] = useState(false);
	const [seats, setSeats] = useState<SelectedSeats[]>([]);
	const [screeningId, setScreeningId] = useState<number>(0);
	const [price, setPrice] = useState<number>(0);
	const [screeningDetails, setScreeningDetails] = useState<Screening | null>(
		null
	);

	useEffect(() => {
		const getDataFromLocalStorage = () => {
			const data = localStorage.getItem("selectedSeats");
			if (data) {
                console.log("Data from local storage:", JSON.parse(data));
				const parsedData = JSON.parse(data) as BookingData;
				setSeats(parsedData.seats);
				setScreeningId(Number(parsedData.screeningId));
				setPrice(parsedData.totalPrice);
			} else {
				console.log("No selected seats found in local storage.");
			}
		};
		getDataFromLocalStorage();
	}, []);

	useEffect(() => {
		const fetchScreeningDetails = async () => {
			try {
				const response = await getMoviesAndItsScreenings(screeningId);
				setScreeningDetails(response);
			} catch (error) {
				console.error("Error fetching screening details:", error);
			}
		};
		fetchScreeningDetails();
	}, [screeningId]);


	// Mock booking data
	const bookingSummary: BookingSummary = {
		movieTitle: screeningDetails?.movie?.title ?? "",
		theater: screeningDetails?.theater?.name ?? "",
		date: screeningDetails?.screeningDate ?? "",
		time: screeningDetails?.screeningTime ?? "",
		seats: seats.map((seat) => seat.seatId),
		totalAmount: price,
		customerName: "John Doe",
		customerPhone: "+1 (555) 123-4567",
	};


	const paymentMethods: PaymentMethod[] = [
		{
			id: "cash",
			name: "Cash",
			icon: <Banknote className="w-5 h-5" />,
			description: "Cash payment",
		},
		{
			id: "card",
			name: "Card",
			icon: <CreditCard className="w-5 h-5" />,
			description: "Credit/Debit card",
		},
		{
			id: "digital",
			name: "Digital",
			icon: <Wallet className="w-5 h-5" />,
			description: "Digital wallet",
		},
		{
			id: "qr",
			name: "QR",
			icon: <QrCode className="w-5 h-5" />,
			description: "QR payment",
		},
	];

	const handlePayment = async () => {
		if (!selectedPaymentMethod) return;

		setIsProcessing(true);

		// Simulate payment processing
		try {
			const request = await submitBooking({
				screeningId: Number(screeningId),
				seats: seats.map((seat) => seat.idNumber),
				amount: price,
				method: selectedPaymentMethod,
				status: "pending",
			})
            console.log("Booking request:", request);
        } catch (error) {
            console.error("Payment processing failed:", error);
        }finally{
            setIsProcessing(false);
        }
	};

	if (isCompleted) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-green-900 text-white p-4 lg:p-8">
				<div className="max-w-4xl mx-auto">
					<div className="bg-green-600/20 border border-green-500/30 rounded-2xl p-8 text-center">
						<CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
						<h1 className="text-2xl font-bold mb-2">
							Payment Complete!
						</h1>
						<p className="text-gray-300 mb-6">
							Booking confirmed and tickets ready
						</p>

						<div className="grid md:grid-cols-2 gap-6 mb-6">
							<div className="bg-gray-800/50 rounded-xl p-6 text-left">
								<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
									<Receipt className="w-5 h-5" />
									Booking Details
								</h2>
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span className="text-gray-400">
											Movie:
										</span>
										<span>{bookingSummary.movieTitle}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-400">
											Theater:
										</span>
										<span>{bookingSummary.theater}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-400">
											Date & Time:
										</span>
										<span>
											{bookingSummary.date} at{" "}
											{bookingSummary.time}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-400">
											Seats:
										</span>
										<span>
											{bookingSummary.seats.join(", ")}
										</span>
									</div>
								</div>
							</div>

							<div className="bg-gray-800/50 rounded-xl p-6 text-left">
								<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
									<User className="w-5 h-5" />
									Customer Info
								</h2>
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span className="text-gray-400">
											Name:
										</span>
										<span>
											{bookingSummary.customerName}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-400">
											Phone:
										</span>
										<span>
											{bookingSummary.customerPhone}
										</span>
									</div>
									<div className="flex justify-between border-t border-gray-700 pt-2">
										<span className="text-gray-400">
											Total Paid:
										</span>
										<span className="text-green-400 font-bold">
											${bookingSummary.totalAmount}
										</span>
									</div>
								</div>
							</div>
						</div>

						<div className="flex gap-4 justify-center">
							<button className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
								Print Tickets
							</button>
							<button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
								New Booking
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 lg:p-8">
			{/* Header */}
			<div className="max-w-7xl mx-auto mb-8">
				<div className="flex items-center justify-between mb-6">
					<button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
						<ArrowLeft className="w-5 h-5" />
						Back to Seat Selection
					</button>
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2 text-gray-300">
							<Clock className="w-4 h-4" />
							<span>1h 45m remaining</span>
						</div>
					</div>
				</div>

				<h1 className="text-3xl lg:text-4xl font-bold text-center mb-2">
					Complete Booking
				</h1>
				<p className="text-gray-400 text-center">
					Process payment and confirm booking
				</p>
			</div>

			<div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
				{/* Booking Summary - Left Side */}
				<div className="lg:col-span-2 space-y-6">
					<h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
						<Receipt className="w-6 h-6" />
						Booking Summary
					</h2>

					{/* Main Booking Card */}
					<div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
						<div className="flex items-start gap-4 mb-6">
							<div className="p-3 bg-sky-600/20 rounded-lg">
								<Monitor className="w-8 h-8 text-sky-400" />
							</div>
							<div className="flex-1">
								<h3 className="text-2xl font-bold mb-2">
									{bookingSummary.movieTitle}
								</h3>
								<div className="flex items-center gap-4 text-gray-400">
									<div className="flex items-center gap-1">
										<MapPin className="w-4 h-4" />
										<span>{bookingSummary.theater}</span>
									</div>
									<div className="flex items-center gap-1">
										<Calendar className="w-4 h-4" />
										<span>{bookingSummary.date}</span>
									</div>
									<div className="flex items-center gap-1">
										<Clock className="w-4 h-4" />
										<span>{bookingSummary.time}</span>
									</div>
								</div>
							</div>
						</div>

						{/* Customer Info */}
						<div className="grid md:grid-cols-2 gap-6 mb-6">
							<div className="bg-gray-700/50 rounded-lg p-4">
								<h4 className="font-semibold mb-3 flex items-center gap-2">
									<User className="w-4 h-4" />
									Customer Information
								</h4>
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span className="text-gray-400">
											Name:
										</span>
										<span>
											{bookingSummary.customerName}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-400">
											Phone:
										</span>
										<span>
											{bookingSummary.customerPhone}
										</span>
									</div>
								</div>
							</div>

							<div className="bg-gray-700/50 rounded-lg p-4">
								<h4 className="font-semibold mb-3 flex items-center gap-2">
									<Sofa className="w-4 h-4" />
									Seat Details
								</h4>
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span className="text-gray-400">
											Selected Seats:
										</span>
										<span className="font-medium">
											{bookingSummary.seats.join(", ")}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-400">
											Quantity:
										</span>
										<span>
											{bookingSummary.seats.length}{" "}
											tickets
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Price Breakdown */}
					<div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
						<h3 className="text-xl font-semibold mb-4">
							Price Breakdown
						</h3>
						<div className="space-y-3">
							{bookingSummary.seats.map((seat) => (
								<div
									key={seat}
									className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0"
								>
									<div className="flex items-center gap-3">
										<div className="w-8 h-8 bg-sky-600/20 rounded-lg flex items-center justify-center">
											<Sofa className="w-4 h-4 text-sky-400" />
										</div>
										<span>Seat {seat}</span>
									</div>
									<span className="font-medium">${screeningDetails?.price}</span>
								</div>
							))}
							<div className="border-t border-gray-600 pt-4 mt-4">
								<div className="flex justify-between items-center">
									<span className="text-lg font-semibold">
										Total Amount:
									</span>
									<span className="text-2xl font-bold text-green-400">
										${bookingSummary.totalAmount}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Payment Section - Right Side */}
				<div className="space-y-6">
					<h2 className="text-xl font-bold mb-6">Payment</h2>

					{/* Payment Methods */}
					<div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
						<h3 className="text-lg font-semibold mb-4">
							Payment Method
						</h3>
						<div className="grid grid-cols-2 gap-3">
							{paymentMethods.map((method) => (
								<button
									key={method.id}
									className={`p-4 rounded-lg border-2 transition-all duration-200 ${
										selectedPaymentMethod === method.id
											? "border-sky-500 bg-sky-500/10"
											: "border-gray-600 bg-gray-700/50 hover:border-gray-500"
									}`}
									onClick={() =>
										setSelectedPaymentMethod(method.id)
									}
								>
									<div className="text-center">
										<div
											className={`p-2 rounded-lg mx-auto mb-2 w-fit ${
												selectedPaymentMethod ===
												method.id
													? "bg-sky-500 text-white"
													: "bg-gray-600 text-gray-300"
											}`}
										>
											{method.icon}
										</div>
										<div className="text-sm font-medium">
											{method.name}
										</div>
									</div>
								</button>
							))}
						</div>
					</div>

					{/* Payment Form (for card payment) */}
					{selectedPaymentMethod === "card" && (
						<div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
							<h3 className="text-lg font-semibold mb-4">
								Card Details
							</h3>
							<div className="space-y-3">
								<input
									type="text"
									placeholder="Card Number"
									className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-sky-500 focus:outline-none text-sm"
								/>
								<div className="grid grid-cols-2 gap-3">
									<input
										type="text"
										placeholder="MM/YY"
										className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-sky-500 focus:outline-none text-sm"
									/>
									<input
										type="text"
										placeholder="CVV"
										className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-sky-500 focus:outline-none text-sm"
									/>
								</div>
							</div>
						</div>
					)}

					{/* Quick Payment Form */}
					{selectedPaymentMethod === "qr" && (
						<div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
							<h3 className="text-lg font-semibold mb-4">
								QR Payment
							</h3>
							<div className="space-y-3">
								<img
									src={"/qr.png"}
									alt="QR Code"
									className="w-full h-auto"
								/>
							</div>
						</div>
					)}

					{/* Digital Payment Form */}
					{selectedPaymentMethod === "digital" && (
						<div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
							<h3 className="text-lg font-semibold mb-4">
								Digital Payment
							</h3>
							<div className="space-y-3">
								<div className="flex flex-col gap-2 ">
									<div className="flex gap-4 border border-gray-700 rounded-lg p-4 items-center">
										<div className="bg-sky-800 rounded-lg p-1">
											<CreditCard className="w-10 h-10" />
										</div>
										<p>Apple Pay</p>
									</div>
									<div className="flex  gap-4 border border-gray-700 rounded-lg p-4 items-center">
										<div className="bg-sky-800 rounded-lg p-1">
											<CreditCard className="w-10 h-10" />
										</div>
										<p>Google Pay</p>
									</div>
									<div className="flex  gap-4 border border-gray-700 rounded-lg p-4 items-center">
										<div className="bg-sky-800 rounded-lg p-1">
											<CreditCard className="w-10 h-10" />
										</div>
										<p>PayPal</p>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Pay Button */}
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
							`Complete Payment - $${bookingSummary.totalAmount}`
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
