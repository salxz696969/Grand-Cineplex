import React, { useState } from "react";
import {
	ArrowLeft,
	MapPin,
	Users,
	Sofa,
	Monitor,
	Settings,
} from "lucide-react";
import { addTheater } from "../../api/manager";

interface TheaterFormData {
	name: string;
	rows: number;
	seatsPerRow: number;
	status: string;
	cinemaId: number;
}

export default function AddTheater({ onBack }: { onBack: () => void }) {
	const [formData, setFormData] = useState<TheaterFormData>({
		name: "",
		rows: 10,
		seatsPerRow: 12,
		status: "active",
		cinemaId: 1,
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleInputChange = (
		field: keyof TheaterFormData,
		value: string | number | undefined
	) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await addTheater({
				name: formData.name,
				status: formData.status,
				cinemaId: formData.cinemaId,
				rows: formData.rows,
				seatsPerRow: formData.seatsPerRow,
			});

			// Show success message with seat count
			alert(`Theater "${formData.name}" created successfully with ${response.totalSeats} seats!`);
		} catch (error) {
			console.error("Error adding theater:", error);
			alert("Failed to create theater. Please try again.");
		} finally {
			setIsSubmitting(false);
			onBack();
		}
	};

	const statusOptions = [
		{ value: "active", label: "Active", color: "text-green-400" },
		{
			value: "maintenance",
			label: "Maintenance",
			color: "text-yellow-400",
		},
		{ value: "inactive", label: "Inactive", color: "text-red-400" },
	];

	// Calculate capacity
	const capacity = formData.rows * formData.seatsPerRow;
	// Generate seat preview
	const generateSeatPreview = () => {
		const seats: React.ReactElement[] = [];
		const rows = Array.from(
			{ length: formData.rows },
			(_, i) => String.fromCharCode(65 + i)
		);

		rows.forEach((row, rowIndex) => {
			let seatNumber = 1;

			// Determine seat type based on row position (matching backend logic)
			let seatType: 'vip' | 'premium' | 'regular';
			if (rowIndex >= formData.rows - 2) {
				// Last 2 rows are VIP
				seatType = 'vip';
			} else if (rowIndex >= formData.rows - 4 && rowIndex < formData.rows - 2) {
				// 2 rows before the last 2 are Premium
				seatType = 'premium';
			} else {
				// All other rows are Regular
				seatType = 'regular';
			}

			const rowSeats = Array(formData.seatsPerRow).fill(null).map(() => (
				<div
					key={`${row}${seatNumber}`}
					className={`w-full aspect-square ${seatType === 'vip' ? 'bg-yellow-900/50 hover:bg-yellow-800' :
						seatType === 'premium' ? 'bg-purple-900/50 hover:bg-purple-800' :
							'bg-gray-900/50 hover:bg-gray-700'
						} rounded flex items-center justify-center max-w-[300px] max-h-[300px]`}
					title={`${row}${seatNumber++} (${seatType})`}
				>
					<Sofa className={`w-1/2 h-1/2 ${seatType === 'vip' ? 'text-yellow-300' :
						seatType === 'premium' ? 'text-purple-300' :
							'text-slate-300'
						}`} />
				</div>
			));

			seats.push(
				<div key={row} className="flex gap-1 items-center w-full">
					<span className="w-8 text-center font-semibold text-slate-400 text-sm">
						{row}
					</span>
					<div className="flex gap-1 flex-1">
						{rowSeats}
					</div>
				</div>
			);
		});

		// Add seat numbers at the bottom
		const seatNumbers = (
			<div key="numbers" className="flex gap-1 items-center w-full">
				<span className="w-8" />
				<div className="flex gap-1 flex-1">
					{Array(formData.seatsPerRow).fill(null).map((_, i) => (
						<div key={i} className="w-full flex justify-center">
							<span className="text-[10px] text-slate-400">{i + 1}</span>
						</div>
					))}
				</div>
			</div>
		);

		seats.push(seatNumbers);
		return seats;
	};

	return (
		<div className="flex flex-col gap-6 w-full">
			{/* Header */}
			<div className="flex flex-col">
				<div className="flex items-center gap-4">
					<button
						onClick={onBack}
						className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
					>
						<ArrowLeft className="w-5 h-5" />
						Back to Theaters
					</button>
				</div>
			</div>
			<div className="flex flex-col ">
				<h2 className="text-2xl font-bold tracking-tight text-white">
					Add New Theater
				</h2>
				<p className="text-slate-400">
					Create a new theater with seating layout
				</p>
			</div>

			{/* Form */}
			<form onSubmit={handleSubmit} className="flex flex-col gap-6">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Left Column */}
					<div className="space-y-6">
						{/* Basic Information */}
						<div className="bg-gray-950 border border-slate-800 rounded-lg p-6">
							<h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
								<MapPin className="w-5 h-5" />
								Theater Information
							</h3>

							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-slate-300 mb-2">
										Theater Name *
									</label>
									<input
										type="text"
										required
										value={formData.name}
										onChange={(e) =>
											handleInputChange(
												"name",
												e.target.value
											)
										}
										className="w-full rounded-lg border border-slate-700 bg-gray-900/50 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
										placeholder="Enter theater name"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-slate-300 mb-2">
										Status *
									</label>
									<select
										required
										value={formData.status}
										onChange={(e) =>
											handleInputChange(
												"status",
												e.target.value
											)
										}
										className="w-full rounded-lg border border-slate-700 bg-gray-900/50 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
									>
										{statusOptions.map((option) => (
											<option
												key={option.value}
												value={option.value}
											>
												{option.label}
											</option>
										))}
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-slate-300 mb-2">
										Cinema Id *
									</label>
									<input
										type="number"
										required
										min={1}
										value={formData.cinemaId ?? ""}
										onChange={(e) =>
											handleInputChange(
												"cinemaId",
												e.target.value
													? parseInt(e.target.value)
													: undefined
											)
										}
										className="w-full rounded-lg border border-slate-700 bg-gray-900/50 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
										placeholder="Enter cinema id"
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Right Column */}
					<div className="space-y-6">
						{/* Seating Configuration */}
						<div className="bg-gray-950 border border-slate-800 rounded-lg p-6">
							<h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
								<Sofa className="w-5 h-5" />
								Seating Configuration
							</h3>

							<div className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-slate-300 mb-2">
											Number of Rows *
										</label>
										<input
											type="number"
											required
											min="1"
											max="26"
											value={formData.rows}
											onChange={(e) =>
												handleInputChange(
													"rows",
													parseInt(e.target.value)
												)
											}
											className="w-full rounded-lg border border-slate-700 bg-gray-900/50 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-slate-300 mb-2">
											Seats per Row *
										</label>
										<input
											type="number"
											required
											min="1"
											max="20"
											value={formData.seatsPerRow}
											onChange={(e) =>
												handleInputChange(
													"seatsPerRow",
													parseInt(e.target.value)
												)
											}
											className="w-full rounded-lg border border-slate-700 bg-gray-900/50 px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
										/>
									</div>
								</div>

								{/* Capacity Display */}
								<div className="bg-gray-900/50 rounded-lg p-4 border border-slate-700">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<Users className="w-5 h-5 text-slate-400" />
											<span className="text-slate-300">
												Total Capacity:
											</span>
										</div>
										<span className="text-white font-bold text-xl">
											{capacity} seats
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Seat Preview - Full Width */}
				<div className="bg-gray-950 border border-slate-800 rounded-lg p-6">
					<h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
						<Monitor className="w-5 h-5" />
						Seating Layout Preview
					</h3>

					<div className="space-y-6">
						{/* Screen */}
						<div className="relative">
							<div className="w-2/3 h-12 bg-gradient-to-b from-gray-300 to-gray-500 mx-auto rounded-lg flex items-center justify-center text-gray-700 font-semibold shadow-lg text-sm">
								<Monitor className="w-3 h-3 mr-1" />
								SCREEN
							</div>
							<div className="absolute inset-x-0 top-6 h-2 bg-gradient-to-b from-gray-300/20 to-transparent"></div>
						</div>

						{/* Seat Grid Preview */}
						<div className="flex flex-col items-center gap-1 overflow-x-auto py-8 w-full max-w-[95%] mx-auto">
							{generateSeatPreview()}
						</div>

						{/* Seat Type Legend */}
						<div className="flex justify-center gap-6 mt-4">
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 bg-gray-900/50 rounded"></div>
								<span className="text-sm text-slate-400">Regular</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 bg-purple-900/50 rounded"></div>
								<span className="text-sm text-slate-400">Premium</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-4 h-4 bg-yellow-900/50 rounded"></div>
								<span className="text-sm text-slate-400">VIP</span>
							</div>
						</div>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex gap-3 justify-end pt-6 border-t border-slate-800">
					<button
						type="button"
						onClick={onBack}
						className="px-6 py-2 bg-gray-900/50 hover:bg-gray-800 text-white font-semibold rounded-lg transition"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={isSubmitting}
						className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold rounded-lg transition flex items-center gap-2"
					>
						{isSubmitting ? (
							<>
								<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
								Adding...
							</>
						) : (
							<>
								<MapPin className="w-4 h-4" />
								Add Theater
							</>
						)}
					</button>
				</div>
			</form>
		</div>
	);
}
