import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <div className="flex items-center border border-slate-800 hover:border-white focus-within:border-white
      rounded-full px-4 py-2 w-full max-w-xl mx-auto bg-gray-900/50 transition-colors duration-200">

      <input className="bg-transparent outline-none text-white placeholder-gray-400 flex-1 "
        placeholder="Search Movie" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <Search className="text-gray-400 " size={20} />

    </div>
  );
}
