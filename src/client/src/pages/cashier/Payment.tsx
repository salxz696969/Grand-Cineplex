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
	Film,
	Clapperboard,
	XCircle,
} from "lucide-react";
import sequelize from "./../../../../server/src/db/index";
import { getMoviesAndItsScreenings, getQrCode, submitBooking, checkPaymentStatus } from "../../api/cashier";
import { Link, useNavigate } from "react-router-dom";

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

type SelectedSeats = {
	seatId: string;
	idNumber: number;
};

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
	const navigate = useNavigate();
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

	const [qrCode, setQrCode] = useState<any>("");
	const [tranId, setTranId] = useState<string>("");
	const [paymentStatus, setPaymentStatus] = useState<string>("PENDING");
	const [isPolling, setIsPolling] = useState(false);

	const handleQrCodePayment = async () => {
		try {
			// just for testing, so that we don't lose money
			const data = await getQrCode(0.01);
			const transactionId = data.tranId || "";
			setQrCode(data.qrImage);
			setTranId(transactionId); // Store transaction ID for polling
			setPaymentStatus("PENDING");
			// Start polling after QR code is generated and tranId is set
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

				if (statusData.status === "APPROVED") {
					setPaymentStatus("APPROVED");
					setIsPolling(false);
					clearInterval(pollInterval);
					// Auto-complete the payment
					handlePaymentSuccess();
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

	const handlePaymentSuccess = async () => {
		setIsProcessing(true);
		try {
			const request = await submitBooking({
				screeningId: Number(screeningId),
				seats: seats.map((seat) => seat.idNumber),
				amount: price,
				method: "qr",
				status: "completed",
			});
			console.log("Booking request:", request);
			setIsCompleted(true);
		} catch (error) {
			console.error("Payment processing failed:", error);
		} finally {
			setIsProcessing(false);
		}
	};

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
		// {
		// 	id: "card",
		// 	name: "Card",
		// 	icon: <CreditCard className="w-5 h-5" />,
		// 	description: "Credit/Debit card",
		// },
		// {
		// 	id: "digital",
		// 	name: "Digital",
		// 	icon: <Wallet className="w-5 h-5" />,
		// 	description: "Digital wallet",
		// },
		{
			id: "qr",
			name: "QR",
			icon: <QrCode className="w-5 h-5" />,
			description: "QR payment",
		},
	];

	const handlePayment = async () => {
		if (!selectedPaymentMethod) return;

		// For QR payments, the polling will handle completion
		if (selectedPaymentMethod === "qr") {
			return;
		}

		setIsProcessing(true);

		// Simulate payment processing
		try {
			const request = await submitBooking({
				screeningId: Number(screeningId),
				seats: seats.map((seat) => seat.idNumber),
				amount: price,
				method: selectedPaymentMethod,
				status: "PENDING",
			});
			console.log("Booking request:", request);
		} catch (error) {
			console.error("Payment processing failed:", error);
		} finally {
			setIsProcessing(false);
			setIsCompleted(true);
		}
	};

	if (isCompleted) {
		return (
			<div className="min-h-screen bg-gray-950 text-white p-4 lg:p-8 space-y-8">
				<div className="max-w-4xl mx-auto">
					<div className="bg-blue-600/20 border border-blue-500/30 rounded-2xl p-8 text-center">
						<CheckCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
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
											{bookingSummary.date} at {bookingSummary.time}
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
										<span className="text-blue-600 font-bold">
											${bookingSummary.totalAmount}
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Printable Tickets */}
						<div className="mb-8 print:block hidden">
							{bookingSummary.seats.map((seat, index) => (
								<div key={index} className="bg-white text-black p-6 rounded-lg mb-4 border-2 border-gray-800 print:break-inside-avoid">
									<div className="flex justify-between items-center border-b border-dashed border-gray-300 pb-4 mb-4">
										<div className="text-2xl font-bold">CINEPLEX</div>
										<div className="text-xl font-mono">{seat}</div>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div>
											<div className="text-sm text-gray-600">MOVIE</div>
											<div className="font-semibold">{bookingSummary.movieTitle}</div>
										</div>
										<div>
											<div className="text-sm text-gray-600">THEATER</div>
											<div className="font-semibold">{bookingSummary.theater}</div>
										</div>
										<div>
											<div className="text-sm text-gray-600">DATE</div>
											<div className="font-semibold">{bookingSummary.date}</div>
										</div>
										<div>
											<div className="text-sm text-gray-600">TIME</div>
											<div className="font-semibold">{bookingSummary.time}</div>
										</div>
									</div>

									<div className="mt-4 pt-4 border-t border-dashed border-gray-300 text-center text-sm text-gray-500">
										Ticket #{index + 1} of {bookingSummary.seats.length}
									</div>
								</div>
							))}
						</div>

						<div className="flex gap-4 justify-center">
							<Link to={"/cashier"}>
								<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
									Print Tickets
								</button>
							</Link>
							<Link to={"/cashier"}>
								<button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
									Done
								</button>
							</Link>
						</div>
					</div>
				</div>
				<div className="w-full flex items-center justify-between max-w-4xl gap-6 bg-gray-900 text-white p-8 border-2 border-blue-800/30 rounded-xl shadow-2xl print:break-inside-avoid mb-6 mx-auto">
					<div className="text-center w-1/2 bg-blue-800/20 rounded-xl p-4 h-[300px] flex flex-col items-center justify-center">
						<Clapperboard className="w-16 h-16 text-blue-600 mb-2" />
						<div className="text-sm font-medium text-blue-500">GRAND CINEPLEX</div>
					</div>
					<div className="flex flex-col gap-6 w-1/2 h-full">
						<div className="flex flex-col items-center border-b border-dashed border-gray-700 pb-4">
							<div className="text-3xl font-bold tracking-wider text-blue-600 rounded-lg p-2">
								GRAND CINEPLEX
							</div>
						</div>

						<div className="grid grid-cols-2 gap-x-12 gap-y-6 text-sm">
							<div>
								<div className="text-gray-400 uppercase text-xs font-medium mb-1">Movie</div>
								<div className="font-semibold">{bookingSummary.movieTitle || "Inception"}</div>
							</div>
							<div>
								<div className="text-gray-400 uppercase text-xs font-medium mb-1">Theater</div>
								<div className="font-semibold">{bookingSummary.theater || "Hall 2"}</div>
							</div>
							<div>
								<div className="text-gray-400 uppercase text-xs font-medium mb-1">Date</div>
								<div className="font-semibold">{bookingSummary.date || "06/10/2024"}</div>
							</div>
							<div>
								<div className="text-gray-400 uppercase text-xs font-medium mb-1">Time</div>
								<div className="font-semibold">{bookingSummary.time || "11:30"}</div>
							</div>
							<div className="col-span-2">
								<div className="text-gray-400 uppercase text-xs font-medium mb-1">Seat</div>
								<div className="font-semibold">{bookingSummary.seats?.join(", ") || "D8, D9"}</div>
							</div>
						</div>

						<div className="mt-4 pt-6 border-t border-dashed border-gray-700 text-center">
							<div className="text-3xl font-mono tracking-wider text-blue-500 mb-2">
								{bookingSummary.seats?.join(", ") || "D8, D9"}
							</div>
							<div className="text-xs text-gray-400">
								Ticket #{bookingSummary.seats?.length || 2} of {bookingSummary.seats?.length || 2}
							</div>
						</div>
					</div>
				</div>
			</div>

		);
	}

	return (
		<div className="min-h-screen bg-gray-950 text-white p-4 lg:p-8">
			{/* Header */}
			<div className="max-w-7xl mx-auto mb-8">
				<div className="flex items-center justify-between mb-6">
					<button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors" onClick={() => navigate(-1)}>
						<ArrowLeft className="w-5 h-5" />
						Back to Seat Selection
					</button>
				</div>
			</div>

			<div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
				{/* Booking Summary - Left Side */}
				<div className="lg:col-span-2 space-y-6">
					<h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
						<Receipt className="w-6 h-6" />
						Booking Summary
					</h2>

					{/* Main Booking Card */}
					<div className="bg-gray-950 rounded-xl p-6 border border-gray-700">
						<div className="flex items-center gap-4 mb-6">
							<div className="p-3 bg-blue-600/20 rounded-lg">
								<Film className="w-8 h-8 text-blue-600" />
							</div>
							<div className="flex-1">
								<h3 className="text-2xl font-bold mb-2">
									{bookingSummary.movieTitle || "Unknown Movie"}
								</h3>
								<div className="flex items-center gap-4 text-gray-400">
									<div className="flex items-center gap-1">
										<MapPin className="w-4 h-4" />
										<span>{bookingSummary.theater || "Unknown Theater"}</span>
									</div>
									<div className="flex items-center gap-1">
										<Calendar className="w-4 h-4" />
										<span>{bookingSummary.date || "Unknown Date"}</span>
									</div>
									<div className="flex items-center gap-1">
										<Clock className="w-4 h-4" />
										<span>{bookingSummary.time || "Unknown Time"}</span>
									</div>
								</div>
							</div>
						</div>

						{/* Customer Info */}
						<div className="grid md:grid-cols-1 gap-6 mb-6">

							<div className="bg-gray-900/50 rounded-lg p-4">
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
											{bookingSummary.seats.length} tickets
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Price Breakdown */}
					<div className="bg-gray-950 rounded-xl p-6 border border-gray-700">
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
										<div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
											<Sofa className="w-4 h-4 text-blue-600" />
										</div>
										<span>Seat {seat}</span>
									</div>
									<span className="font-medium">
										${screeningDetails?.price}
									</span>
								</div>
							))}
							<div className="border-t border-gray-600 pt-4 mt-4">
								<div className="flex justify-between items-center">
									<span className="text-lg font-semibold">
										Total Amount:
									</span>
									<span className="text-2xl font-bold text-blue-600">
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
					<div className="bg-gray-950 rounded-xl p-6 border border-gray-700">
						<h3 className="text-lg font-semibold mb-4">
							Payment Method
						</h3>
						<div className="grid grid-cols-2 gap-3">
							{paymentMethods.map((method) => (
								<button
									key={method.id}
									className={`p-4 rounded-lg border-2 transition-all duration-200 ${selectedPaymentMethod === method.id
										? "border-blue-800 bg-blue-500/10"
										: "border-slate-800 bg-gray-900/50 hover:border-gray-500"
										}`}
									onClick={() => {
										setSelectedPaymentMethod(method.id);
										if (method.id === "qr") {
											handleQrCodePayment();
										}
									}}
								>
									<div className="text-center">
										<div
											className={`p-2 rounded-lg mx-auto mb-2 w-fit ${selectedPaymentMethod ===
												method.id
												? "bg-blue-800 text-white"
												: "bg-gray-950 text-gray-300"
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
						<div className="bg-gray-950 rounded-xl p-6 border border-gray-700">
							<h3 className="text-lg font-semibold mb-4">
								Card Details
							</h3>
							<div className="space-y-3">
								<input
									type="text"
									placeholder="Card Number"
									className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-600 focus:outline-none text-sm"
								/>
								<div className="grid grid-cols-2 gap-3">
									<input
										type="text"
										placeholder="MM/YY"
										className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-600 focus:outline-none text-sm"
									/>
									<input
										type="text"
										placeholder="CVV"
										className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-blue-600 focus:outline-none text-sm"
									/>
								</div>
							</div>
						</div>
					)}

					{/* Quick Payment Form */}
					{selectedPaymentMethod === "qr" && qrCode && (
						<div className="bg-gray-950 rounded-xl p-6 border border-gray-700">
							<h3 className="text-lg font-semibold mb-4">
								QR Payment
							</h3>
							<div className="space-y-4">
								<img
									src={qrCode}
									alt="QR Code"
									className="w-full h-auto rounded-xl border-2 border-blue-600"
								/>

								{/* Payment Status */}
								<div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-900/50 border border-gray-700">
									{paymentStatus === "PENDING" && (
										<>
											<Clock className="w-5 h-5 text-yellow-400 animate-pulse" />
											<span className="text-yellow-400">Waiting for payment</span>
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

					{/* Digital Payment Form */}
					{selectedPaymentMethod === "digital" && (
						<div className="bg-gray-950 rounded-xl p-6 border border-gray-700">
							<h3 className="text-lg font-semibold mb-4">
								Digital Payment
							</h3>
							<div className="space-y-3">
								<div className="flex flex-col gap-2 ">
									<div className="flex gap-4 border border-gray-700 rounded-lg p-4 items-center">
										<div className="bg-blue-800 rounded-lg p-1">
											<CreditCard className="w-10 h-10" />
										</div>
										<p>Apple Pay</p>
									</div>
									<div className="flex  gap-4 border border-gray-700 rounded-lg p-4 items-center">
										<div className="bg-blue-800 rounded-lg p-1">
											<CreditCard className="w-10 h-10" />
										</div>
										<p>Google Pay</p>
									</div>
									<div className="flex  gap-4 border border-gray-700 rounded-lg p-4 items-center">
										<div className="bg-blue-800 rounded-lg p-1">
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
						disabled={!selectedPaymentMethod || isProcessing || (selectedPaymentMethod === "qr" && paymentStatus !== "APPROVED")}
						className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${selectedPaymentMethod && !isProcessing && (selectedPaymentMethod !== "qr" || paymentStatus === "APPROVED")
							? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white transform hover:scale-105"
							: "bg-gray-700 text-gray-400 cursor-not-allowed"
							}`}
					>
						{isProcessing ? (
							<div className="flex items-center justify-center gap-2">
								<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
								Processing...
							</div>
						) : selectedPaymentMethod === "qr" && paymentStatus === "APPROVED" ? (
							"Complete Booking"
						) : (
							`Complete Payment - $${bookingSummary.totalAmount}`
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
