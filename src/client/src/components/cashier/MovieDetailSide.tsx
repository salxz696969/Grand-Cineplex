import React from "react";
import { Clock, Calendar, Star, Film, Tag, Info } from "lucide-react";
import { currentShow } from "../../utils/FakeData";

export default function SelectedMovieSidebar() {
    const movie = currentShow[0];
    const { title, image, overview, rating, duration, genre, releaseDate } = movie;

    return (
        <div className="w-full h-full">
            <div className="bg-black flex flex-row lg:flex-col gap-4 items-center lg:items-start justify-start lg:justify-start border-b border-gray-700 lg:border-b-0  lg:border-gray-700 lg:pr-4 pb-4 pt-4 lg:pb-0">
                <img src={image} alt={title} className="lg:w-full w-[150px]   lg:h-auto object-cover rounded-md flex-shrink-0" />
                <div className="flex-1 lg:flex-none w-full bg-black/50 flex flex-col gap-4">
                    <div className="hidden lg:flex flex-col gap-2 text-white">
                        <h1 className="text-xl font-bold">{title}</h1>
                        <div className="flex items-start gap-2">
                            <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-400 line-clamp-3">{overview}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-400">{rating}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-400">{duration}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Film className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-400">{genre}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <p className="text-sm text-gray-400">{releaseDate}</p>
                        </div>
                    </div>
                    <div className="flex lg:hidden flex-col gap-4 text-white">
                        <h1 className="text-xl font-bold">{title}</h1>
                        <div className="flex items-start gap-2">
                            <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-400 line-clamp-3">{overview}</p>
                        </div>
                        <div className="flex flex-wrap flex-row gap-2">
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-gray-400" />
                                <p className="text-sm text-gray-400">{rating}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <p className="text-sm text-gray-400">{duration}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Film className="w-4 h-4 text-gray-400" />
                                <p className="text-sm text-gray-400">{genre}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <p className="text-sm text-gray-400">{releaseDate}</p>
                            </div>
                        </div>
                    </div>
                    {/* <button className="bg-sky-800 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition-colors">
                        Watch Trailer
                    </button> */}
                </div>
            </div>
        </div>
    );
}