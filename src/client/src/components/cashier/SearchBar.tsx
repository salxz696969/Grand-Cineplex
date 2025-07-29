import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export default function SearchBar({ searchTerm, setSearchTerm }: SearchBarProps) {
  return (
    <div className="flex items-center border border-slate-800 focus:ring-1 focus:border-blue-800 rounded-full px-4 py-2 w-full bg-gray-900 transition-colors duration-200">
      <input
        className="bg-transparent outline-none text-white placeholder-gray-400 flex-1 "
        placeholder="Search Movie"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Search className="text-gray-400 " size={20} />
    </div>
  );
}
