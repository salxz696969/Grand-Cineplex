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
        <div className="rounded-xl border bg-slate-900/50 border-slate-800 p-6 shadow-lg transition-transform hover:scale-105 hover:border-blue-500/50">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium tracking-tight text-slate-400">{title}</h3>
                <div className="text-blue-400">{icon}</div>
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

const recentBookings = [
    { id: 'BK001', customer: 'John Doe', movie: 'The Great Adventure', amount: '$37.50', status: 'Confirmed', staff:"Kim Chaewon" },
    { id: 'BK002', customer: 'Jane Smith', movie: 'Mystery of the Abyss', amount: '$25.00', status: 'Confirmed',staff:"Kim Chaewon" },
    { id: 'BK003', customer: 'Sam Wilson', movie: 'The Great Adventure', amount: '$12.50', status: 'Pending',staff:"Kim Chaewon" },
    { id: 'BK004', customer: 'Alice Johnson', movie: 'Comedy Night', amount: '$50.00', status: 'Confirmed',staff:"Kim Chaewon" },
];

const recentMovies = [
    { title: 'The Great Adventure', genre: 'Action', releaseDate: '2024-07-20', duration: 145 },
    { title: 'Mystery of the Abyss', genre: 'Thriller', releaseDate: '2024-07-22', duration: 120 },
    { title: 'Comedy Night', genre: 'Comedy', releaseDate: '2024-07-25', duration: 95 },
];

export default function Dashboard() {
    const [totalBookings, setTotalBookings] = useState<TotalBooking[]>([]);
    const [pendingBookingsCount, setPendingBookingsCount] = useState(0);
    const [movieCount, setMovieCount] = useState(0);
    const [activeTheatersCount, setActiveTheatersCount] = useState(0);
    const [totalStaffCount, setTotalStaffCount] = useState(0);
    const [recentlyAddedMovies, setRecentlyAddedMovies] = useState<RecentlyAddedMovie[]>([]);
    const [totalRevenue, setTotalRevenue] = useState<TotalRevenue>({ revenue: 0 })
    const [upcomingScreeningCount, setUpcomingScreeningCount] = useState<UpcomingScreeningCount>({ thisWeekScreeningsCount: 0, percentageFromLastWeek: 0 });

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
            }
        };
        fetchData();
    }, []);
    return (
        <div className="relative flex-1 space-y-6  bg-slate-950 text-slate-50 p-4 pb-24">
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
                    value={`$${totalRevenue.revenue.toFixed(2)}`}
                    icon={<DollarSign />}
                    change={totalRevenue.percentageFromLastMonth? `+${totalRevenue.percentageFromLastMonth}% from last month` : `No records for last month`}
                    changeType="increase"
                    description="Total income from all bookings."
                />
                <StatCard
                    title="Upcoming Screenings"
                    value= {upcomingScreeningCount.thisWeekScreeningsCount.toString()}
                    icon={<CalendarClock />}
                    change={upcomingScreeningCount.percentageFromLastWeek ? `+${upcomingScreeningCount.percentageFromLastWeek}% from last week` : `No records for last week`}
                    changeType="increase"
                    description="Screenings scheduled for the upcoming week."
                />
                <StatCard
                    title="Pending Bookings"
                    value= {pendingBookingsCount.toString()}
                    icon={<Ticket />}
                    description="Bookings awaiting confirmation or payment."
                />
                <StatCard
                    title="Total Movies"
                    value= {movieCount.toString()}
                    icon={<Film />}
                    description="Number of movies in your library."
                />
                <StatCard
                    title="Active Theaters"
                    value= {activeTheatersCount.toString()}
                    icon={<Theater />}
                    description="Theaters currently in operation."
                />
                <StatCard
                    title="Total Staff"
                    value= {totalStaffCount.toString()}
                    icon={<Users />}
                    description="Number of active staff members."
                />
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
                {/* Recent Bookings Table */}
                <div className="lg:col-span-4 rounded-xl border bg-slate-900/50 border-slate-800 p-6 shadow-lg">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Ticket className="h-5 w-5 text-blue-400" /> Recent Bookings</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-300">
                            <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
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
                                    <tr key={booking.id} className="border-b border-slate-800 hover:bg-slate-800/40">
                                        <td className="px-6 py-4 font-medium">{booking.id}</td>
                                        <td className="px-6 py-4">{booking.customer?booking.customer.name:"null"}</td>
                                        <td className="px-6 py-4">{booking.createdByStaff?booking.createdByStaff.name:"null"}</td>
                                        <td className="px-6 py-4">{booking.movieTitle}</td>
                                        <td className="px-6 py-4">${booking.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${booking.status === 'Confirmed' ? 'bg-green-600/20 text-green-400' : 'bg-yellow-600/20 text-yellow-400'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recently Added Movies Table */}
                <div className="lg:col-span-3 rounded-xl border bg-slate-900/50 border-slate-800 p-6 shadow-lg">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Clapperboard className="h-5 w-5 text-blue-400" /> Recently Added Movies</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-slate-300">
                            <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Title</th>
                                    <th scope="col" className="px-6 py-3">Genre</th>
                                    <th scope="col" className="px-6 py-3">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentlyAddedMovies.map((movie) => (
                                    <tr key={movie.title} className="border-b border-slate-800 hover:bg-slate-800/40">
                                        <td className="px-6 py-4 font-medium">{movie.title}</td>
                                        <td className="px-6 py-4">{movie.genre}</td>
                                        <td className="px-6 py-4">{movie.duration} min</td>
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