import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="flex items-center border border-neutral-600 hover:border-white focus-within:border-white rounded-full px-4 py-2 w-full max-w-xl mx-auto bg-neutral-900 transition-colors duration-200">
      <Search className="text-neutral-400 mr-2" size={20} />
      <input
        className="bg-transparent outline-none text-white placeholder-neutral-400 flex-1"
        placeholder="Search"
      />
    </div>
  );
}
