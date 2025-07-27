import React, { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Clock, Film, DollarSign } from "lucide-react";
import { updateScreening, getAllMovies, getTheaters } from "../../api/manager";

type ScreeningData = {
	id: number;
	movieId: number;
	theaterId: number;
	screeningDate: string;
	screeningTime: string;
	regularSeatPrice: number;
	premiumSeatPrice: number;
	vipSeatPrice: number;
};

type Movie = { id: number; title: string };
type Theater = { id: number; name: string };

type EditScreeningProps = {
	onBack: () => void;
	screening: ScreeningData;
};

export default function EditScreening({ onBack, screening }: EditScreeningProps) {
	const [formData, setFormData] = useState<ScreeningData>({ ...screening });
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [movies, setMovies] = useState<Movie[]>([]);
	const [theaters, setTheaters] = useState<Theater[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [moviesRes, theatersRes] = await Promise.all([getAllMovies(), getTheaters()]);
				setMovies(moviesRes);
				setTheaters(theatersRes);
			} catch (error) {
				console.error("Error fetching movies or theaters:", error);
			}
		};
		fetchData();
	}, []);

	const handleInputChange = (field: keyof ScreeningData, value: string | number) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		if (JSON.stringify(formData) === JSON.stringify(screening)) {
			alert("Please change at least one field to edit the screening.");
			setIsSubmitting(false);
			return;
		}

		try {
			await updateScreening(formData);
		} catch (error) {
			console.error("Error updating screening:", error);
		} finally {
			setIsSubmitting(false);
		}
		onBack();
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
						Back to Screenings
					</button>
				</div>
			</div>
			<div className="flex flex-col">
				<h2 className="text-2xl font-bold tracking-tight text-white">Edit Screening</h2>
				<p className="text-slate-400">Update screening information</p>
			</div>

			<form onSubmit={handleSubmit} className="flex flex-col gap-6">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Left Column */}
					<div className="space-y-6">
						<div className="bg-gray-950 border border-slate-800 rounded-lg p-6">
							<h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
								<Film className="w-5 h-5" />
								Screening Details
							</h3>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-slate-300 mb-2">Movie</label>
									<select
										value={formData.movieId}
										onChange={(e) => handleInputChange("movieId", Number(e.target.value))}
										className="w-full rounded-lg border border-slate-700 bg-gray-900/50 px-4 py-2 text-white"
									>
										<option value="">Select movie</option>
										{movies.map((movie) => (
											<option key={movie.id} value={movie.id}>
												{movie.title}
											</option>
										))}
									</select>
								</div>
								<div>
									<label className="block text-sm font-medium text-slate-300 mb-2">Theater</label>
									<select
										value={formData.theaterId}
										onChange={(e) => handleInputChange("theaterId", Number(e.target.value))}
										className="w-full rounded-lg border border-slate-700 bg-gray-900/50 px-4 py-2 text-white"
									>
										<option value="">Select theater</option>
										{theaters.map((theater) => (
											<option key={theater.id} value={theater.id}>
												{theater.name}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
					</div>
					{/* Right Column */}
					<div className="space-y-6">
						<div className="bg-gray-950 border border-slate-800 rounded-lg p-6">
							<h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
								<Calendar className="w-5 h-5" />
								Date & Time
							</h3>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-slate-300 mb-2">Date</label>
									<div className="relative">
										<input
											type="date"
											value={formData.screeningDate}
											onChange={(e) => handleInputChange("screeningDate", e.target.value)}
											className="w-full rounded-lg border border-slate-700 bg-gray-900/50 px-4 py-2 text-white"
										/>
										<Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
									</div>
								</div>
								<div>
									<label className="block text-sm font-medium text-slate-300 mb-2">Time</label>
									<div className="relative">
										<input
											type="time"
											value={formData.screeningTime}
											onChange={(e) => handleInputChange("screeningTime", e.target.value)}
											className="w-full rounded-lg border border-slate-700 bg-gray-900/50 px-4 py-2 text-white"
										/>
										<Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
									</div>
								</div>
							</div>
						</div>

						<div className="bg-gray-950 border border-slate-800 rounded-lg p-6">
							<h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
								<DollarSign className="w-5 h-5" />
								Pricing
							</h3>
							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-slate-300 mb-2">Regular Seat Price</label>
									<input
										type="number"
										step="0.01"
										min="0"
										value={formData.regularSeatPrice}
										onChange={(e) => handleInputChange("regularSeatPrice", Number(e.target.value))}
										className="w-full rounded-lg border border-slate-700 bg-gray-900/50 px-4 py-2 text-white"
										placeholder="e.g., 12.50"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-slate-300 mb-2">Premium Seat Price</label>
									<input
										type="number"
										step="0.01"
										min="0"
										value={formData.premiumSeatPrice}
										onChange={(e) => handleInputChange("premiumSeatPrice", Number(e.target.value))}
										className="w-full rounded-lg border border-slate-700 bg-gray-900/50 px-4 py-2 text-white"
										placeholder="e.g., 15.00"
									/>
								</div>
								<div>
									<label className="block text-sm font-medium text-slate-300 mb-2">VIP Seat Price</label>
									<input
										type="number"
										step="0.01"
										min="0"
										value={formData.vipSeatPrice}
										onChange={(e) => handleInputChange("vipSeatPrice", Number(e.target.value))}
										className="w-full rounded-lg border border-slate-700 bg-gray-900/50 px-4 py-2 text-white"
										placeholder="e.g., 25.00"
									/>
								</div>

								{/* Price Preview */}
								<div className="bg-gray-900/50 rounded-lg p-4 border border-slate-700">
									<h4 className="text-white font-semibold mb-3">Price Summary</h4>
									<div className="space-y-2">
										<div className="flex items-center justify-between">
											<span className="text-slate-300 text-sm">Regular Seats:</span>
											<span className="text-white font-semibold">${formData.regularSeatPrice}</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-slate-300 text-sm">Premium Seats:</span>
											<span className="text-white font-semibold">${formData.premiumSeatPrice}</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-slate-300 text-sm">VIP Seats:</span>
											<span className="text-white font-semibold">${formData.vipSeatPrice}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Action Buttons */}
				<div className="flex gap-3 justify-end pt-6 border-t border-slate-800">
					<button
						type="button"
						onClick={onBack}
						className="px-6 py-2 bg-gray-900/50 hover:bg-gray-900/50 text-white font-semibold rounded-lg transition"
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
								Updating...
							</>
						) : (
							<>
								<Film className="w-4 h-4" />
								Update Screening
							</>
						)}
					</button>
				</div>
			</form>
		</div>
	);
}
