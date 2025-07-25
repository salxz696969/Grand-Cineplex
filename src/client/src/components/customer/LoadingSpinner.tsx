const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-blue-800 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-white text-sm">Loading...</p>
    </div>
  </div>
);

export default LoadingSpinner;
