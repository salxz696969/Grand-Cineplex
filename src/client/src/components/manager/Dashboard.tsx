import React from "react";
import { PlusCircle, DollarSign, CalendarClock, Ticket, Film, Theater, Users, Clapperboard, ArrowUpRight } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    change?: string;
    changeType?: 'increase' | 'decrease';
    description: string;
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
    { id: 'BK001', customer: 'John Doe', movie: 'The Great Adventure', amount: '$37.50', status: 'Confirmed' },
    { id: 'BK002', customer: 'Jane Smith', movie: 'Mystery of the Abyss', amount: '$25.00', status: 'Confirmed' },
    { id: 'BK003', customer: 'Sam Wilson', movie: 'The Great Adventure', amount: '$12.50', status: 'Pending' },
    { id: 'BK004', customer: 'Alice Johnson', movie: 'Comedy Night', amount: '$50.00', status: 'Confirmed' },
];

const recentMovies = [
    { title: 'The Great Adventure', genre: 'Action', releaseDate: '2024-07-20', duration: 145 },
    { title: 'Mystery of the Abyss', genre: 'Thriller', releaseDate: '2024-07-22', duration: 120 },
    { title: 'Comedy Night', genre: 'Comedy', releaseDate: '2024-07-25', duration: 95 },
];

export default function Dashboard() {
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
                    value="$45,231.89"
                    icon={<DollarSign />}
                    change="+20.1% from last month"
                    changeType="increase"
                    description="Total income from all bookings."
                />
                <StatCard
                    title="Upcoming Screenings"
                    value="+120"
                    icon={<CalendarClock />}
                    change="+18.2% from last week"
                    changeType="increase"
                    description="Screenings scheduled for the upcoming week."
                />
                <StatCard
                    title="Pending Bookings"
                    value="15"
                    icon={<Ticket />}
                    description="Bookings awaiting confirmation or payment."
                />
                <StatCard
                    title="Total Movies"
                    value="42"
                    icon={<Film />}
                    description="Number of movies in your library."
                />
                <StatCard
                    title="Active Theaters"
                    value="8"
                    icon={<Theater />}
                    description="Theaters currently in operation."
                />
                <StatCard
                    title="Total Staff"
                    value="25"
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
                                    <th scope="col" className="px-6 py-3">Movie</th>
                                    <th scope="col" className="px-6 py-3">Amount</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentBookings.map((booking) => (
                                    <tr key={booking.id} className="border-b border-slate-800 hover:bg-slate-800/40">
                                        <td className="px-6 py-4 font-medium">{booking.id}</td>
                                        <td className="px-6 py-4">{booking.customer}</td>
                                        <td className="px-6 py-4">{booking.movie}</td>
                                        <td className="px-6 py-4">{booking.amount}</td>
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
                                {recentMovies.map((movie) => (
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