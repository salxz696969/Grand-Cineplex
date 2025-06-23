import React from "react";
import { Film } from "lucide-react";
import TheaterScreeningCard from "./TheatreScreeningCard";
import { Screening } from "./Screenings";

export default function MovieScreeningSection({ movieTitle, movieImage, screenings }: { movieTitle: string; movieImage: string; screenings: Screening[] }) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            {/* Movie Header */}
            <div className="flex items-center gap-4">
                <img
                    src={movieImage}
                    alt={`${movieTitle} poster`}
                    className="w-16 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-xl font-bold text-white">{movieTitle}</h2>
                    </div>
                    <p className="text-slate-400 text-sm">
                        {screenings.length} screening{screenings.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>

            {/* Theater Screenings Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {screenings.map((screening) => (
                    <TheaterScreeningCard key={screening.id} screening={screening} />
                ))}
            </div>
        </div>
    );
}