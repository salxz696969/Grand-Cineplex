import React, { useEffect, useState } from "react";
import { PlusCircle, DollarSign, CalendarClock, Ticket, Film, Theater, Users, Clapperboard, ArrowUpRight } from "lucide-react";
import { getHomePageInfo } from './../../api/manager';

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    change?: string;
    changeType?: 'increase' | 'decrease';
    description: string;
}

type Staff = {
    name: string;
};

type Customer = {
    name: string;
} | null;

type TotalBooking = {
    id: number;
    customerId?: number | null;
    screeningId: number;
    status: string;
    createdByStaffId?: number;
    createdAt: string;
    updatedAt: string;
    customer?: Customer;
    createdByStaff?: Staff;
    movieTitle: string;
    amount: number;
};

type UpcomingScreeningCount = {
    thisWeekScreeningsCount: number;
    percentageFromLastWeek?: number;
};

type RecentlyAddedMovie = {
    id: number;
    title: string;
    description: string;
    duration: number;
    genre: string;
    rating: number;
    posterUrl: string;
    releaseDate: string;
    trailerUrl: string;
    createdAt: string;
    updatedAt: string;
};

type TotalRevenue = {
    revenue: number;
    percentageFromLastMonth?: number;
}
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, changeType, description }) => {
    return (
        <div className="rounded-xl border bg-gray-950 border-slate-800 p-6 shadow-lg transition-transform hover:scale-102 hover:border-blue-500/50">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium tracking-tight text-slate-400">{title}</h3>
                <div className="text-blue-600">{icon}</div>
            </div>
            <div>
                <div className="text-3xl font-bold">{value}</div>
                {change && (
                    <p className={`text-xs flex items-center gap-1 ${changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                        <ArrowUpRight className="h-4 w-4" />
                        {change}
                    </p>
                )}
                <p className="text-xs text-slate-500 mt-2">{description}</p>
            </div>
        </div>
    );
};

export default function Dashboard() {
    const [totalBookings, setTotalBookings] = useState<TotalBooking[]>([]);
    const [pendingBookingsCount, setPendingBookingsCount] = useState(0);
    const [movieCount, setMovieCount] = useState(0);
    const [activeTheatersCount, setActiveTheatersCount] = useState(0);
    const [totalStaffCount, setTotalStaffCount] = useState(0);
    const [recentlyAddedMovies, setRecentlyAddedMovies] = useState<RecentlyAddedMovie[]>([]);
    const [totalRevenue, setTotalRevenue] = useState<TotalRevenue>({ revenue: 0 })
    const [upcomingScreeningCount, setUpcomingScreeningCount] = useState<UpcomingScreeningCount>({ thisWeekScreeningsCount: 0, percentageFromLastWeek: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHomePageInfo();
                if (data) {
                    setTotalBookings(data.totalBookings || []);
                    setPendingBookingsCount(data.pendingBookingsCount || 0);
                    setMovieCount(data.movieCount || 0);
                    setActiveTheatersCount(data.activeTheatersCount || 0);
                    setTotalStaffCount(data.totalStaffCount || 0);
                    setRecentlyAddedMovies(data.recentlyAddedMovies || []);
                    setTotalRevenue(data.totalRevenue || { revenue: 0 });
                    setUpcomingScreeningCount(data.upcomingScreeningCount || { thisWeekScreeningsCount: 0, percentageFromLastWeek: 0 });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        // Skeleton loader
        return (
            <div className="relative flex-1 space-y-6 bg-gray-950 text-slate-50  pb-24 animate-pulse">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <div className="h-8 w-64 bg-gray-900 rounded mb-2" />
                        <div className="h-4 w-80 bg-gray-900 rounded" />
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="rounded-xl border bg-gray-950 border-slate-800 p-6 shadow-lg">
                            <div className="h-4 w-24 bg-gray-900 rounded mb-4" />
                            <div className="h-8 w-32 bg-gray-900 rounded mb-2" />
                            <div className="h-3 w-20 bg-gray-900 rounded" />
                        </div>
                    ))}
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
                    <div className="lg:col-span-4 rounded-xl border bg-gray-950 border-slate-800 p-6 shadow-lg">
                        <div className="h-6 w-48 bg-gray-900 rounded mb-4" />
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-slate-300">
                                <thead className="text-xs text-slate-400 uppercase bg-gray-900">
                                    <tr>
                                        {[...Array(6)].map((_, i) => (
                                            <th key={i} className="px-6 py-3"><div className="h-4 w-16 bg-gray-900 rounded" /></th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...Array(5)].map((_, i) => (
                                        <tr key={i} className="border border-slate-800">
                                            {[...Array(6)].map((_, j) => (
                                                <td key={j} className="px-6 py-4"><div className="h-4 w-20 bg-gray-900 rounded" /></td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="lg:col-span-3 rounded-xl border bg-gray-950 border-slate-800 p-6 shadow-lg">
                        <div className="h-6 w-48 bg-gray-900 rounded mb-4" />
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-slate-300">
                                <thead className="text-xs text-slate-400 uppercase bg-gray-900">
                                    <tr>
                                        {[...Array(3)].map((_, i) => (
                                            <th key={i} className="px-6 py-3"><div className="h-4 w-16 bg-gray-900 rounded" /></th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...Array(5)].map((_, i) => (
                                        <tr key={i} className="border border-slate-800">
                                            {[...Array(3)].map((_, j) => (
                                                <td key={j} className="px-6 py-4"><div className="h-4 w-20 bg-gray-900 rounded" /></td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="relative flex-1 space-y-6  bg-gray-950 text-slate-50  ">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Manager Dashboard</h2>
                    <p className="text-slate-400">Welcome back, here's a look at your cinema's performance.</p>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                <StatCard
                    title="Total Revenue"
                    value={`$${totalRevenue.revenue}`}
                    icon={<DollarSign />}
                    changeType="increase"
                    description="Total income from all bookings."
                />
                <StatCard
                    title="Upcoming Screenings"
                    value={upcomingScreeningCount.thisWeekScreeningsCount.toString()}
                    icon={<CalendarClock />}
                    changeType="increase"
                    description="Screenings scheduled for the upcoming week."
                />
                <StatCard
                    title="Total Bookings"
                    value={pendingBookingsCount.toString()}
                    icon={<Ticket />}
                    description="Bookings confirmed."
                />
                <StatCard
                    title="Total Movies"
                    value={movieCount.toString()}
                    icon={<Film />}
                    description="Number of movies in your library."
                />
                <StatCard
                    title="Active Theaters"
                    value={activeTheatersCount.toString()}
                    icon={<Theater />}
                    description="Theaters currently in operation."
                />
                <StatCard
                    title="Total Staff"
                    value={totalStaffCount.toString()}
                    icon={<Users />}
                    description="Number of active staff members."
                />
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
                {/* Recent Bookings Table (lg+) */}
                <div className="lg:col-span-4 rounded-xl border bg-gray-950 border-slate-800 p-6 shadow-lg">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Ticket className="h-5 w-5 text-blue-600" /> Recent Bookings</h3>
                    {/* Table for lg+ */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-300">
                            <thead className="text-xs text-slate-400 uppercase bg-gray-900">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Booking ID</th>
                                    <th scope="col" className="px-6 py-3">Customer</th>
                                    <th scope="col" className="px-6 py-3">Staff</th>
                                    <th scope="col" className="px-6 py-3">Movie</th>
                                    <th scope="col" className="px-6 py-3">Amount</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {totalBookings.map((booking) => (
                                    <tr key={booking.id} className="border border-slate-800 hover:bg-slate-800/40">
                                        <td className="px-6 py-4 font-medium">{booking.id}</td>
                                        <td className="px-6 py-4">{booking.customer ? booking.customer.name : "null"}</td>
                                        <td className="px-6 py-4">{booking.createdByStaff ? booking.createdByStaff.name : "null"}</td>
                                        <td className="px-6 py-4">{booking.movieTitle}</td>
                                        <td className="px-6 py-4">${booking.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${booking.status === 'Confirmed' ? 'bg-green-600/20 text-green-400' : 'bg-yellow-600/20 text-yellow-400'}`}>{booking.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Cards for <lg */}
                    <div className="lg:hidden flex flex-col gap-4">
                        {totalBookings.map((booking) => (
                            <div key={booking.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 shadow flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <div className="font-semibold text-white">Booking #{booking.id}</div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${booking.status === 'Confirmed' ? 'bg-green-600/20 text-green-400' : 'bg-yellow-600/20 text-yellow-400'}`}>{booking.status}</span>
                                </div>
                                <div className="text-gray-400 text-sm">Customer: {booking.customer ? booking.customer.name : "null"}</div>
                                <div className="text-gray-400 text-sm">Staff: {booking.createdByStaff ? booking.createdByStaff.name : "null"}</div>
                                <div className="text-gray-400 text-sm">Movie: {booking.movieTitle}</div>
                                <div className="text-gray-400 text-sm">Amount: ${booking.amount}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recently Added Movies Table (lg+) */}
                <div className="lg:col-span-3 rounded-xl border bg-gray-950 border-slate-800 p-6 shadow-lg">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Clapperboard className="h-5 w-5 text-blue-600" /> Recently Added Movies</h3>
                    {/* Table for lg+ */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-300">
                            <thead className="text-xs text-slate-400 uppercase bg-gray-900">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Title</th>
                                    <th scope="col" className="px-6 py-3">Genre</th>
                                    <th scope="col" className="px-6 py-3">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentlyAddedMovies.map((movie) => (
                                    <tr key={movie.title} className="border border-slate-800 hover:bg-slate-800/40">
                                        <td className="px-6 py-4 font-medium">{movie.title}</td>
                                        <td className="px-6 py-4">{movie.genre}</td>
                                        <td className="px-6 py-4">{movie.duration} min</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Cards for <lg */}
                    <div className="lg:hidden flex flex-col gap-4">
                        {recentlyAddedMovies.map((movie) => (
                            <div key={movie.title} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 shadow flex flex-col gap-2">
                                <div className="font-semibold text-white">{movie.title}</div>
                                <div className="text-gray-400 text-sm">Genre: {movie.genre}</div>
                                <div className="text-gray-400 text-sm">Duration: {movie.duration} min</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}