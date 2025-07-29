import React, { useEffect, useState } from "react";
import { Search, Filter, PlusCircle, MapPin } from "lucide-react";
import SeatManagementPopup from "./EditTheater";
import TheaterCard from "./TheaterCard";
import AddTheater from "./AddTheater";
import { getTheaters } from "../../api/manager";

export interface Theater {
    id: number;
    name: string;
    capacity: number;
    rows: number;
    seatsPerRow: number;
    status: "active" | "maintenance" | "inactive";
    location?: string;
    description?: string;
}

export interface Seat {
    id: string;
    row: string;
    number: number;
    type: 'regular' | 'premium' | 'vip';
    price: number;
    isBooked: boolean;
}

// const dummyTheaters: Theater[] = [
//     {
//         id: "TH001",
//         name: "Theater A",
//         capacity: 120,
//         rows: 8,
//         seatsPerRow: 15,
//         status: "active",
//         location: "Ground Floor",
//         description: "Main theater with premium sound system"
//     },
//     {
//         id: "TH002",
//         name: "Theater B",
//         capacity: 80,
//         rows: 6,
//         seatsPerRow: 14,
//         status: "active",
//         location: "First Floor",
//         description: "Intimate theater for smaller audiences"
//     },
//     {
//         id: "TH003",
//         name: "Theater C",
//         capacity: 100,
//         rows: 7,
//         seatsPerRow: 15,
//         status: "maintenance",
//         location: "Ground Floor",
//         description: "Currently under maintenance"
//     },
//     {
//         id: "TH004",
//         name: "VIP Theater",
//         capacity: 40,
//         rows: 4,
//         seatsPerRow: 10,
//         status: "active",
//         location: "Second Floor",
//         description: "Premium VIP experience with recliner seats"
//     }
// ];

export default function Theaters() {
    const [theaters, setTheaters] = useState<Theater[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [editingTheater, setEditingTheater] = useState<Theater | null>(null);
    const [addingTheater, setAddingTheater] = useState(false);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0); // Add refresh state

    useEffect(() => {
        // Fetch theaters from API
        const fetchTheaters = async () => {
            setLoading(true);
            try {
                const data = await getTheaters()
                setTheaters(data);
            } catch (error) {
                console.error("Error fetching theaters:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTheaters();
    }, [refreshKey]); // Add refreshKey to dependencies

    const filteredTheaters = theaters.filter(theater => {
        const matchesSearch = theater.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            theater.location?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === "all" || theater.status === selectedStatus;

        return matchesSearch && matchesStatus;
    });

    const handleEdit = (theater: Theater) => {
        setEditingTheater(theater);
    };

    const handleBackToTheaters = () => {
        setEditingTheater(null);
        setAddingTheater(false);
        // Trigger refresh when returning from add/edit
        setRefreshKey(prev => prev + 1);
    };

    const handleAddTheater = () => {
        setAddingTheater(true);
    };

    // If adding a theater, show the AddTheater component
    if (addingTheater) {
        return (
            <AddTheater onBack={handleBackToTheaters} />
        );
    }

    if (loading) {
        // Subtle skeleton loader
        return (
            <div className="flex flex-col gap-6 w-full bg-gray-950 min-h-screen overflow-y-auto overflow-x-hidden">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="h-8 w-64 bg-gray-900 rounded mb-1 animate-pulse" />
                        <div className="h-4 w-80 bg-gray-900 rounded animate-pulse" />
                    </div>
                    <div className="h-10 w-40 bg-gray-900 rounded animate-pulse" />
                </div>
                <div className="flex w-full justify-between items-center mt-4">
                    <div className="h-6 w-48 bg-gray-900 rounded animate-pulse" />
                    <div className="h-10 w-80 bg-gray-900 rounded-full animate-pulse" />
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg animate-pulse">
                            <div className="h-6 w-32 bg-gray-800 rounded mb-2" />
                            <div className="h-4 w-24 bg-gray-800 rounded mb-1" />
                            <div className="h-4 w-40 bg-gray-800 rounded mb-1" />
                            <div className="h-4 w-20 bg-gray-800 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // If editing a theater, show the seat management view
    if (editingTheater) {
        return (
            <SeatManagementPopup
                theater={editingTheater}
                onBack={handleBackToTheaters}
            />
        );
    }

    // Otherwise show the theaters list
    return (
        <div className="flex flex-col gap-6 w-full bg-gray-950 min-h-screen overflow-y-auto overflow-x-hidden">
            {/* Header */}
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold tracking-tight text-white">Theater Management</h2>
                    <p className="text-gray-400">Manage your cinema theaters and seating layouts.</p>
                </div>
                <button
                    onClick={handleAddTheater}
                    className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
                >
                    <PlusCircle className="w-4 h-4 text-blue-200" />
                    Add Theater
                </button>
            </div>

            {/* Search and Filters */}
            <div className="flex   sm:items-center  w-full justify-between items-center">
                <div className="text-sm text-gray-400">
                    {filteredTheaters.length} theater{filteredTheaters.length !== 1 ? 's' : ''} found
                </div>
                <div className="relative flex-1 sm:flex-none sm:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search theaters..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-full border border-gray-800 bg-gray-900 px-10 py-2 text-white"
                    />
                </div>
                {/*
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="rounded-lg border border-gray-800 bg-gray-900 px-3 py-2 text-white text-sm"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                */}
            </div>

            {/* Results count */}


            {/* Theaters Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTheaters.length > 0 ? (
                    filteredTheaters.map((theater) => (
                        <TheaterCard
                            key={theater.id}
                            theater={theater}
                            onEdit={handleEdit}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-8">
                        <MapPin className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg mb-2">No theaters found</p>
                        <p className="text-gray-500">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
}