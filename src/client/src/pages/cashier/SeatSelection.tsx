import React, { useEffect, useState } from "react";
import { Sofa, Monitor, ArrowLeft, ShoppingCart, Clock } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSeatsBasedOnScreeningId } from "../../api/cashier";
import { ApiSeat, ScreeningSeatData } from "../../../../shared/types/type";

interface Seat {
	id: string;
	row: string;
	number: number;
	type: "regular" | "premium" | "vip";
	price: number;
	isBooked: boolean;
	idNumber: number;
}

type SelectedSeats = {
	seatId: string;
	idNumber: number;
};

// Helper function to calculate seat price based on type
const calculateSeatPrice = (seatType: string, pricing: {
	regularSeatPrice: number;
	premiumSeatPrice: number;
	vipSeatPrice: number;
}): number => {
	switch (seatType) {
		case "vip":
			return pricing.vipSeatPrice;
		case "premium":
			return pricing.premiumSeatPrice;
		case "regular":
		default:
			return pricing.regularSeatPrice;
	}
};

// Skeleton for seat grid and summary only
const SeatGridAndSummarySkeleton = () => (
	<>
		{/* Seat Grid Skeleton */}
		<div className="flex flex-col items-center gap-3 mb-12 animate-pulse">
			{[...Array(6)].map((_, rowIdx) => (
				<div key={rowIdx} className="flex gap-3 items-center">
					<div className="w-8 h-5 bg-gray-800 rounded" />
					<div className="flex gap-1">
						{[...Array(10)].map((_, seatIdx) => (
							<div key={seatIdx} className="w-10 h-10 rounded-full bg-gray-800" />
						))}
					</div>
				</div>
			))}
		</div>
		{/* Seat Legend Skeleton (optional, or keep real legend) */}
		<div className="flex flex-wrap justify-center gap-6 mb-8 text-sm animate-pulse">
			{[...Array(4)].map((_, i) => (
				<div key={i} className="flex items-center gap-2">
					<div className="w-6 h-6 bg-gray-800 rounded" />
					<div className="h-4 w-16 bg-gray-800 rounded" />
				</div>
			))}
		</div>
		{/* Selected Seats Summary Skeleton */}
		<div className="bg-gray-950 rounded-xl p-6 border border-gray-700 animate-pulse">
			<div className="h-6 w-40 bg-gray-800 rounded mb-4" />
			<div className="flex flex-wrap gap-2 mb-4">
				{[...Array(3)].map((_, i) => (
					<div key={i} className="bg-blue-900/20 border border-blue-800/30 px-3 py-1 rounded-full text-blue-300 text-sm h-6 w-20" />
				))}
			</div>
			<div className="flex items-center justify-between pt-3 border-t border-gray-700 mb-4">
				<div className="h-4 w-32 bg-gray-800 rounded" />
				<div className="h-6 w-16 bg-gray-800 rounded" />
			</div>
			<div className="h-10 w-full bg-gray-800 rounded" />
		</div>
	</>
);

export function SeatSelection() {
	const [selectedSeats, setSelectedSeats] = useState<SelectedSeats[]>([]);
	const [seats, setSeats] = useState<Seat[]>([]);
	const id = useParams().id;
	const [rows, setRows] = useState<string[]>([
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
	]);
	const seatsPerRow = 10;
	const router = useNavigate();

	const [seatPrices, setSeatPrices] = useState<{
		regularSeatPrice: number;
		premiumSeatPrice: number;
		vipSeatPrice: number;
	}>({
		regularSeatPrice: 0,
		premiumSeatPrice: 0,
		vipSeatPrice: 0,
	});

	useEffect(() => {
		try {
			const generateSeats = (
				seatsFromApi: ApiSeat[],
				pricing: {
					regularSeatPrice: number;
					premiumSeatPrice: number;
					vipSeatPrice: number;
				}
			): Seat[] => {
				return seatsFromApi.map((seat) => ({
					id: `${seat.rowNumber}${seat.seatNumber}`,
					row: seat.rowNumber,
					number: seat.seatNumber,
					type: seat.seatType,
					price: calculateSeatPrice(seat.seatType, pricing),
					isBooked: seat.isBooked,
					idNumber: seat.id,
				}));
			};

			const fetchSeats = async () => {
				const response: ScreeningSeatData = await getSeatsBasedOnScreeningId(
					parseInt(id!)
				);

				setSeatPrices({
					regularSeatPrice: response.regularSeatPrice,
					premiumSeatPrice: response.premiumSeatPrice,
					vipSeatPrice: response.vipSeatPrice,
				});

				const tempRow = rows;
				setRows(
					tempRow.slice(
						0,
						response.seats.length / seatsPerRow
					)
				);
				setSeats(
					generateSeats(response.seats, {
						regularSeatPrice: response.regularSeatPrice,
						premiumSeatPrice: response.premiumSeatPrice,
						vipSeatPrice: response.vipSeatPrice,
					}).sort((a, b) => {
						// First sort by row (A-Z)
						if (a.row !== b.row) {
							return a.row.localeCompare(b.row);
						}
						// If row is the same, sort by number (1-10)
						return a.number - b.number;
					})
				);
			};
			fetchSeats();
		} catch (error) {
			console.error("Error fetching seat data:", error);
		}
	}, []);

	// Generate seats with different types and some pre-booked
	// const generateSeats = (): Seat[] => {
	//     const seats: Seat[] = [];
	//     rows.forEach((row, rowIndex) => {
	//         for (let i = 1; i <= seatsPerRow; i++) {
	//             const seatId = `${row}${i}`;
	//             let type: 'regular' | 'premium' | 'vip' = 'regular';
	//             let price = 12.50;

	//             // Premium seats (middle rows)
	//             // if (rowIndex >= 2 && rowIndex <= 5) {
	//             //     type = 'premium';
	//             //     price = 15.00;
	//             // }

	//             // VIP seats (front row)
	//             // if (rowIndex === 0) {
	//             //     type = 'vip';
	//             //     price = 18.00;
	//             // }

	//             seats.push({
	//                 id: seatId,
	//                 row,
	//                 number: i,
	//                 type,
	//                 price,
	//                 isBooked: false
	//             });
	//         }
	//     });
	//     return seats;
	// };

	// const seats = generateSeats();

	const toggleSeat = (seatId: string, idNumber: number) => {
		const seat = seats.find((s) => s.id === seatId);
		if (seat?.isBooked) return;

		setSelectedSeats((prev) =>
			prev.some((s) => s.seatId === seatId)
				? prev.filter((s) => s.seatId !== seatId)
				: [...prev, { seatId, idNumber }]
		);
	};

	console.log("Selected seats:", selectedSeats);

	const getSeatStyle = (seat: Seat, isSelected: boolean) => {
		if (seat.isBooked) {
			return "bg-red-600 cursor-not-allowed opacity-60";
		}

		if (isSelected) {
			return "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg scale-105";
		}

		switch (seat.type) {
			case "vip":
				return "bg-gradient-to-br from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black font-semibold";
			case "premium":
				return "bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white";
			default:
				return "bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white";
		}
	};

	const getTotalPrice = () => {
		const total = selectedSeats.reduce((total, selectedSeat) => {
			const seat = seats.find((s) => s.id === selectedSeat.seatId);
			return total + (typeof seat?.price === "number" ? seat.price : 0);
		}, 0);
		return isNaN(total) ? 0 : total;
	};

	const saveToLocalStorage = () => {
		const selectedSeat = selectedSeats.map((seatId) => seatId);
		console.log("Selected seats:", selectedSeat);
		const dataToSave = {
			screeningId: id,
			seats: selectedSeat,
			totalPrice: getTotalPrice(),
		};
		console.log("Data to save:", dataToSave);
		localStorage.setItem("selectedSeats", JSON.stringify(dataToSave));
	};

	return (
		<div className="min-h-screen bg-gray-950 text-white p-4 lg:p-8">
			{/* Header */}
			<div className="max-w-7xl mx-auto mb-8">
				<div className="flex items-center justify-between mb-6">
					<button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors" onClick={() => router(-1)}>
						<ArrowLeft className="w-5 h-5" />
						Back to Movies
					</button>
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2 bg-blue-600 px-3 py-1 rounded-full">
							<ShoppingCart className="w-4 h-4" />
							<span className="text-sm font-medium">
								${getTotalPrice().toFixed(2)}
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto">
				{/* Screen */}
				<div className="relative mb-16">
					<div className="w-full h-12 bg-gradient-to-b from-gray-300 to-gray-500 mx-auto rounded-lg flex items-center justify-center text-gray-700 font-semibold shadow-lg">
						<Monitor className="w-6 h-6 mr-2" />
						SCREEN
					</div>
					<div className="absolute inset-x-0 top-12 h-4 bg-gradient-to-b from-gray-300/20 to-transparent"></div>
				</div>

				{seats.length === 0 ? (
					<SeatGridAndSummarySkeleton />
				) : (
					<>
						{/* Seat Grid */}
						<div className="flex flex-col items-center gap-3 mb-12">
							{rows.map((row) => (
								<div key={row} className="flex gap-3 items-center">
									<span className="w-8 text-center font-semibold text-gray-400">
										{row}
									</span>
									<div className="flex gap-1">
										{seats
											.filter((seat) => seat.row === row)
											.map((seat) => {
												const isSelected = selectedSeats.some(
													(s) => s.seatId === seat.id
												);

												return (
													<button
														key={seat.id}
														className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-200 transform hover:scale-110 ${getSeatStyle(
															seat,
															isSelected
														)}`}
														onClick={() =>
															toggleSeat(
																seat.id,
																seat.idNumber
															)
														}
														disabled={seat.isBooked}
														title={`${seat.row}${seat.number} - $${seat.price}`}
													>
														<Sofa> </Sofa>
													</button>
												);
											})}
									</div>
								</div>
							))}
						</div>

						{/* Seat Legend */}
						<div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
							<div className="flex items-center gap-2">
								<div className="w-6 h-6 bg-gradient-to-br from-gray-600 to-gray-700 rounded"></div>
								<span>Regular - ${seatPrices.regularSeatPrice}</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded"></div>
								<span>Premium - ${seatPrices.premiumSeatPrice}</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded"></div>
								<span>VIP - ${seatPrices.vipSeatPrice}</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-6 h-6 bg-red-600 rounded opacity-60"></div>
								<span>Booked</span>
							</div>
						</div>

						{/* Selected Seats Summary */}
						<div className="bg-gray-950 rounded-xl p-6 border border-gray-700">
							<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
								<Sofa className="w-5 h-5" />
								Selected Seats
							</h2>

							{selectedSeats.length > 0 ? (
								<div className="space-y-3">
									<div className="flex flex-wrap gap-2">
										{selectedSeats
											.sort((a, b) =>
												a.seatId.localeCompare(b.seatId)
											)
											.map((selectedSeat) => {
												const seat = seats.find(
													(s) => s.id === selectedSeat.seatId
												);
												return (
													<div
														key={selectedSeat.seatId}
														className="bg-blue-600/20 border border-blue-500/30 px-3 py-1 rounded-full text-blue-300 text-sm"
													>
														{selectedSeat.seatId} - $
														{seat?.price}
													</div>
												);
											})}
									</div>
									<div className="flex items-center justify-between pt-3 border-t border-gray-700">
										<span className="text-gray-300">
											Total ({selectedSeats.length} seats):
										</span>
										<span className="text-2xl font-bold text-green-400">
											${getTotalPrice().toFixed(2)}
										</span>
									</div>
									<Link to={`/cashier/payment`}>
										<button
											className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform"
											onClick={() => saveToLocalStorage()}
										>
											Continue to Payment
										</button>
									</Link>
								</div>
							) : (
								<p className="text-gray-400 text-center py-4">
									No seats selected. Click on seats to make your
									selection.
								</p>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
