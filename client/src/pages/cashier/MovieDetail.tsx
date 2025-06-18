import React from "react";
import { currentShow } from "../../utils/FakeData";
import SelectedMovieSidebar from "../../components/cashier/MovieDetailSide";
import Header from "../../components/cashier/Header";
import MovieShowTimes from "../../components/cashier/MovieShowtimes";

export default function MovieDetail() {
    const movie = currentShow[0];
    return (
        <div className="min-h-screen bg-black">
            <Header />
            <div className="relative flex flex-row justify-center items-start gap-4 px-4">
                <div className="wrapper relative max-w-5xl w-full flex lg:flex-row gap-4 flex-col px-4 ">
                    <div className="sticky top-22 left-0 w-full lg:w-80 flex-shrink-0 h-full z-10">
                        <SelectedMovieSidebar />
                    </div>

                    {/* Main content - Takes remaining space */}
                    <div className="flex-1 py-4">
                        <MovieShowTimes />
                    </div>
                </div>
            </div>
        </div>
    );
}