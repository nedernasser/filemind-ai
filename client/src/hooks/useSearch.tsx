import { useState } from 'react';
import { FileRecord } from '../types/FileRecord';

export function useSearch() {
  const [results, setResults] = useState<FileRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/file/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error('Search failed:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
  };

  return {
    results,
    isSearching: loading,
    search,
    clearResults,
  };
}
