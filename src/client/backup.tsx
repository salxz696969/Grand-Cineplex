// import React, { useState, useEffect, useRef } from "react";
// import MovieCard from "./MovieCard";
// import { fetchNowShowingMovies, fetchUpcomingMovies } from "../../../api/customer";
// import { Movie } from "../../../../../shared/types/type";

// interface MovieContainerProps {
//   searchTerm: string;
//   activeTab: "now" | "upcoming";
//   selectedMonth: number | null;
//   selectedYear: number | null;
// }

// const monthNames = [
//   "January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

// const MovieContainer: React.FC<MovieContainerProps> = ({ searchTerm, activeTab, selectedMonth, selectedYear }) => {
//   const [allMovies, setAllMovies] = useState<Movie[]>([]);
//   const [movieList, setMovieList] = useState<Movie[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState<string | null>(null);
//   const [isSearching, setIsSearching] = useState(false);
//   const [showNoResults, setShowNoResults] = useState(false);

//   const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const noResultTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     const loadMovies = async () => {
//       try {
//         setIsLoading(true);
//         setIsError(null);

//         let movies: Movie[] = [];

//         if (activeTab === "now") {
//           movies = await fetchNowShowingMovies();
//         } else if (selectedMonth && selectedYear) {
//           movies = await fetchUpcomingMovies(selectedMonth, selectedYear);
//         }

//         await new Promise((resolve) => setTimeout(resolve, 300));

//         setAllMovies(movies);
//         setMovieList(movies);
//       } catch (error: any) {
//         setIsError(error.message || "Failed to load movies");
//         setAllMovies([]);
//         setMovieList([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadMovies();
//   }, [activeTab, selectedMonth, selectedYear]);

//   useEffect(() => {
//     if (searchTimeout.current) clearTimeout(searchTimeout.current);
//     if (noResultTimeout.current) clearTimeout(noResultTimeout.current);

//     setShowNoResults(false);

//     const trimmedTerm = searchTerm.trim().toLowerCase();

//     if (trimmedTerm === "") {
//       setIsSearching(false);
//       setMovieList(allMovies);
//       return;
//     }

//     const filtered = allMovies.filter((movie) =>
//       movie.title.toLowerCase().includes(trimmedTerm)
//     );

//     if (filtered.length > 0) {
//       setIsSearching(false);
//       setMovieList(filtered);
//     } else {
//       setIsSearching(true);
//       setMovieList([]);

//       noResultTimeout.current = setTimeout(() => {
//         setIsSearching(false);
//         setShowNoResults(true);
//       }, 2000);
//     }
//   }, [searchTerm, allMovies]);

//   if (isLoading || isSearching) {
//     return (
//       <div className="flex items-center justify-center min-h-[300px]">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
//           <p className="text-white text-sm">
//             {isSearching ? "Searching movies..." : "Loading movies..."}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (isError) return <p className="text-red-500 flex items-center justify-center">Error: {isError}</p>;

//   // Custom no upcoming movies message
//   if (
//     activeTab === "upcoming" &&
//     movieList.length === 0 &&
//     !isSearching &&
//     !isLoading
//   ) {
//     const monthName = selectedMonth ? monthNames[selectedMonth - 1] : "";
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[300px] p-6 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 text-center">
//         <svg
//           className="w-25 h-20  mb-4 text-gray-600"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="1.5"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//           aria-hidden="true"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M9.75 17L15 12 9.75 7v10z"
//           ></path>
//         </svg>
//         <h3 className="text-xl font-semibold mb-2">No Upcoming Movies Yet</h3>
//         <p className="text-gray-400">
//           There are currently no upcoming movies scheduled for{" "}
//           <strong>{monthName} {selectedYear}</strong>. Please check back later.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid gap-5 custom-cols">
//       {showNoResults ? (
//         <p className="text-white text-lg">No movies found.</p>
//       ) : (
//         movieList.map((movie) => (
//           <MovieCard
//             key={movie.id}
//             id={movie.id}
//             title={movie.title}
//             release_date={movie.release_date || ""}
//             duration={movie.duration.toString()}
//             image={movie.poster_url || ""}
//           />
//         ))
//       )}
//     </div>
//   );
// };

// export default MovieContainer;





// import React, { useState } from "react";
// import SearchBar from "./SearchBar";

// type CalendarDay = {
//   number: number;
//   day: string;
//   month: string;
// };

// interface ScheduleHeaderProps {
//   searchTerm: string;
//   setSearchTerm: (value: string) => void;
//   activeTab: "now" | "upcoming";
//   setActiveTab: React.Dispatch<React.SetStateAction<"now" | "upcoming">>;
//   onUpcomingMonthChange: (month: number, year: number) => void;
// }

// export default function ScheduleHeader({
//   searchTerm,
//   setSearchTerm,
//   activeTab,
//   setActiveTab,
//   onUpcomingMonthChange,
// }: ScheduleHeaderProps) {
//   const [selectedIndex, setSelectedIndex] = useState<number>(0);

//   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   const getNext6Days = (): CalendarDay[] => {
//     const days: CalendarDay[] = [];
//     const today = new Date();

//     for (let i = 0; i < 6; i++) {
//       const date = new Date(today);
//       date.setDate(today.getDate() + i);

//       days.push({
//         day: i === 0 ? "Today" : weekDays[date.getDay()],
//         number: date.getDate(),
//         month: months[date.getMonth()],
//       });
//     }
//     return days;
//   };

//   const getUpcomingMonths = (): string[] => {
//     const monthsList: string[] = [];
//     const today = new Date();

//     for (let i = 0; i < 6; i++) {
//       const date = new Date(today);
//       date.setMonth(today.getMonth() + i);
//       monthsList.push(date.toLocaleDateString("en-US", { month: "long" }));
//     }
//     return monthsList;
//   };

//   const handleTabChange = (tab: "now" | "upcoming") => {
//     setActiveTab(tab);
//     setSelectedIndex(0);
//   };

//   return (
//     <div className="mt-8 mb-5 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">

//       {/* The left side that give users option to select Now Showing or Upcoming tab */}

//       <div className="w-full lg:w-[70%]">
//         <div className="flex gap-6 text-xl font-bold mb-4 flex-wrap">

//           <button onClick={() => handleTabChange("now")} className={`transition-colors ${
//               activeTab === "now" ? "text-white border-b-2 border-white" : "text-gray-400"}`}
//           >
//             Now Showing
//           </button>

//           <span className="text-gray-500">|</span>

//           <button onClick={() => handleTabChange("upcoming")} className={`transition-colors ${
//               activeTab === "upcoming" ? "text-white border-b-2 border-white" : "text-gray-400"}`}
//           >
//             Upcoming
//           </button>
//         </div>

//         {/* The opeartion behind these taps  */}

//         <div className="flex flex-wrap gap-3 justify-start">
//           {/* It filters to show the tab of current shows */}
//           {activeTab === "now" ? getNext6Days().map((c, idx) => 
//             (
//               <div key={idx} onClick={() => setSelectedIndex(idx)}
//                 className={`cursor-pointer flex flex-col items-center rounded border-2 ${
//                   idx === selectedIndex ? "border-red-500" : "border-gray-700"} 
//                   px-1 py-1 w-15 sm:w-16 md:w-20 lg:w-24 xl:w-28 min-w-[60px]`}
//               >
//                 <p className="font-semibold text-[9px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base">{c.day}</p>
//                 <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">{c.number}</p>
//                 <p className="text-gray-400 text-[8px] sm:text-[9px] md:text-xs">{c.month}</p>
//               </div>
//             ))
//             // It filters to show upcoming show tabs
//             : getUpcomingMonths().map((monthName, idx) => {
//                 const date = new Date();
//                 date.setMonth(date.getMonth() + idx);
//                 const month = date.getMonth() + 1; // 1-based
//                 const year = date.getFullYear();

//                 return (
//                   <div key={idx} onClick={() => {
//                     setSelectedIndex(idx);
//                     onUpcomingMonthChange(month, year);
//                   }}
//                     className={`cursor-pointer flex flex-col items-center rounded border-2 ${
//                       idx === selectedIndex ? "border-red-500" : "border-gray-700"}
//                       px-2 py-2 w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 min-w-[64px]`}>
//                     <p className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-[16px] font-semibold text-center leading-tight">{monthName}</p>
//                   </div>
//                 );
//               })}
//         </div>
//       </div>
//       {/* Right Side: Search Bar */}
//       <div className="w-full lg:w-[30%] flex justify-center lg:justify-end">
//         <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
// import Header from "../../components/customer/homecomponents/Header";
// import ScheduleHeader from "../../components/customer/homecomponents/ScheduleShow";
// import MovieContainer from "../../components/customer/movie/MovieContainer";
// import Footer from "../../components/customer/Footer";
// import LoadingSpinner from "../../components/customer/LoadingSpinner";
// import TopRatedMovies from "../../components/customer/homecomponents/TopRatedMovies";

// export default function Home() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [activeTab, setActiveTab] = useState<"now" | "upcoming">("now");
//   const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
//   const [selectedYear, setSelectedYear] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Initialize selectedMonth and selectedYear to current month/year when switching to upcoming tab
//   useEffect(() => {
//     if (activeTab === "upcoming") {
//       const now = new Date();
//       setSelectedMonth(now.getMonth() + 1); // JS months are 0-based
//       setSelectedYear(now.getFullYear());
//     } else {
//       // Clear month/year when switching to "now"
//       setSelectedMonth(null);
//       setSelectedYear(null);
//     }
//   }, [activeTab]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div className="min-h-screen bg-[#171c20] text-white">
//       <Header />
//       <div className="px-[20px] sm:px-[60px] md:px-[100px] lg:px-[180px]">
//         <TopRatedMovies />
//         <ScheduleHeader
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           onUpcomingMonthChange={(month, year) => {
//             setSelectedMonth(month);
//             setSelectedYear(year);
//           }}
//         />
//         <MovieContainer
//           searchTerm={searchTerm}
//           activeTab={activeTab}
//           selectedMonth={selectedMonth}
//           selectedYear={selectedYear}
//         />
//       </div>
//       <Footer />
//     </div>
//   );
// }





{/* <div className="w-screen h-screen bg-[#171c20] flex flex-col">
      <Header />
      <div className="flex-grow flex justify-center items-center">
        <div className="px-7 py-10 border border-[#a7aaac] w-96 rounded text-white">
          <form onSubmit={handleLogin} className="w-full fill">
            <h4 className="text-2xl mb-7">Login</h4>

            <input type="text" placeholder="Email" className="input-box" value={email} onChange={(e) => setEmail(e.target.value)}/>


            <Password value={password} onChange={(e) => setPassword(e.target.value)} />


            {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

            <button type="submit" className="btn-primary h-10">Login</button>

            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link className="font-medium text-blue-500 underline" to="/SignUp">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div> */}