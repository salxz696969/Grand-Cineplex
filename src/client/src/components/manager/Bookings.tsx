import React, { useEffect, useState } from "react";
import { Search, Filter, PlusCircle, Ticket } from "lucide-react";
import BookingCard, { Booking } from "./BookingCard";
import { getBookings } from "../../api/manager";

// const dummyBookings: Booking[] = [
//     {
//         id: "BK001",
//         customerName: "John Doe",
//         customerEmail: "john.doe@email.com",
//         movieTitle: "The Great Adventure",
//         theater: "Theater A",
//         date: "2025-07-08",
//         time: "14:30",
//         seats: ["A5", "A6"],
//         totalAmount: 37.50,
//         bookingMethod: "walk-in",
//         status: "confirmed",
//         bookingDate: "2025-06-20",
//         cashierName: "Sarah Johnson",
//         paymentMethod: "cash"
//     },
//     {
//         id: "BK002",
//         customerName: "Jane Smith",
//         customerEmail: "jane.smith@email.com",
//         movieTitle: "Mystery of the Abyss",
//         theater: "Theater B",
//         date: "2025-07-08",
//         time: "16:00",
//         seats: ["C12"],
//         totalAmount: 25.00,
//         bookingMethod: "online",
//         status: "confirmed",
//         bookingDate: "2025-06-19",
//         paymentMethod: "online"
//     },
//     {
//         id: "BK003",
//         customerName: "Sam Wilson",
//         customerEmail: "sam.wilson@email.com",
//         movieTitle: "The Great Adventure",
//         theater: "Theater A",
//         date: "2025-07-08",
//         time: "20:00",
//         seats: ["D8", "D9", "D10"],
//         totalAmount: 56.25,
//         bookingMethod: "walk-in",
//         status: "pending",
//         bookingDate: "2025-07-08",
//         cashierName: "Mike Chen",
//         paymentMethod: "card"
//     },
//     {
//         id: "BK004",
//         customerName: "Alice Johnson",
//         customerEmail: "alice.johnson@email.com",
//         movieTitle: "Comedy Night",
//         theater: "Theater C",
//         date: "2025-07-08",
//         time: "19:30",
//         seats: ["B3", "B4"],
//         totalAmount: 17.00,
//         bookingMethod: "online",
//         status: "confirmed",
//         bookingDate: "2025-06-18",
//         paymentMethod: "online"
//     },
//     {
//         id: "BK005",
//         customerName: "Bob Brown",
//         customerEmail: "bob.brown@email.com",
//         movieTitle: "Mystery of the Abyss",
//         theater: "Theater B",
//         date: "2025-06-22",
//         time: "15:00",
//         seats: ["E15"],
//         totalAmount: 25.00,
//         bookingMethod: "walk-in",
//         status: "cancelled",
//         bookingDate: "2025-06-20",
//         cashierName: "Lisa Wang",
//         paymentMethod: "cash"
//     },
//     {
//         id: "BK006",
//         customerName: "Emma Davis",
//         customerEmail: "emma.davis@email.com",
//         movieTitle: "The Great Adventure",
//         theater: "Theater A",
//         date: "2025-06-22",
//         time: "22:00",
//         seats: ["F1", "F2", "F3", "F4"],
//         totalAmount: 75.00,
//         bookingMethod: "online",
//         status: "confirmed",
//         bookingDate: "2025-06-19",
//         paymentMethod: "card"
//     }
// ];

export default function Bookings() {
	const [bookings, setBookings] = useState<Booking[]>([]);
	const [activeTab, setActiveTab] = useState<string>("today");
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedStatus, setSelectedStatus] = useState<string>("all");
	const [selectedMethod, setSelectedMethod] = useState<string>("all");
	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const response = await getBookings();
				setBookings(response);
				console.log("Bookings fetched successfully:", response);
			} catch (error) {
				console.error("Error fetching bookings:", error);
			}
		};
		fetchBookings();
	}, []);
	const today = new Date().toISOString().split("T")[0];

	const filteredBookings = bookings.filter((booking) => {
		const matchesTab =
			activeTab === "today"
				? new Date(booking.date).toISOString().split("T")[0] === today
				: true;

		const matchesSearch =
			(booking.customerName || "")
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			booking.movieTitle
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			(booking.customerEmail || "")
				.toLowerCase()
				.includes(searchTerm.toLowerCase());

		const matchesStatus =
			selectedStatus === "all" || booking.status === selectedStatus;
		const matchesMethod =
			selectedMethod === "all" ||
			booking.bookingMethod === selectedMethod;

		return matchesTab && matchesSearch && matchesStatus && matchesMethod;
	});

	return (
		<div className="flex flex-col gap-6 p-4 w-full">
			{/* Header */}
			<div className="flex flex-row items-center justify-between">
				<div className="flex flex-col">
					<h2 className="text-2xl font-bold tracking-tight text-white">
						Bookings
					</h2>
					<p className="text-slate-400">
						Manage customer bookings and tickets.
					</p>
				</div>
			</div>

			{/* Tabs and Search/Filters Row */}
			<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
				{/* Tabs */}
				<div className="flex flex-row items-center gap-4">
					<button
						className={`text-white py-2 px-1 flex items-center border-b ${
							activeTab === "today"
								? "border-sky-600 font-bold"
								: "border-transparent"
						}`}
						onClick={() => setActiveTab("today")}
					>
						Today's Bookings
					</button>
					<button
						className={`text-white py-2 px-1 flex items-center border-b ${
							activeTab === "all"
								? "border-sky-600 font-bold"
								: "border-transparent"
						}`}
						onClick={() => setActiveTab("all")}
					>
						All Bookings
					</button>
				</div>

				{/* Search and Filters */}
				<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
					<div className="relative flex-1 sm:flex-none sm:w-64">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
						<input
							type="text"
							placeholder="Search bookings..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full rounded-full border border-slate-700 bg-slate-800 px-10 py-2 text-white"
						/>
					</div>

					<div className="flex items-center gap-2">
						<Filter className="w-4 h-4 text-slate-400" />
						<select
							value={selectedStatus}
							onChange={(e) => setSelectedStatus(e.target.value)}
							className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white text-sm"
						>
							<option value="all">All Status</option>
							<option value="confirmed">Confirmed</option>
							<option value="pending">Pending</option>
							<option value="cancelled">Cancelled</option>
							<option value="completed">Completed</option>
						</select>

						<select
							value={selectedMethod}
							onChange={(e) => setSelectedMethod(e.target.value)}
							className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white text-sm"
						>
							<option value="all">All Methods</option>
							<option value="walk-in">Walk-in</option>
							<option value="online">Online</option>
						</select>
					</div>
				</div>
			</div>

			{/* Results count */}
			<div className="text-sm text-slate-400">
				{filteredBookings.length} booking
				{filteredBookings.length !== 1 ? "s" : ""} found
			</div>

			{/* Bookings Grid */}
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{filteredBookings.length > 0 ? (
					filteredBookings.map((booking) => (
						<BookingCard key={booking.id} booking={booking} />
					))
				) : (
					<div className="col-span-full text-center py-8">
						<Ticket className="w-12 h-12 text-slate-600 mx-auto mb-4" />
						<p className="text-slate-400">
							No bookings found matching your criteria.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
