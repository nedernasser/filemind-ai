import { useState } from 'react';

type Props = {
  onSearch: (query: string) => Promise<void>;
};

const SearchBox: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    await onSearch(query);
    setIsSearching(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 mt-4">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="border p-2 rounded flex-1"
        placeholder="Search your documents..."
      />
      <button
        type="submit"
        disabled={isSearching}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isSearching ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
};

export default SearchBox;
