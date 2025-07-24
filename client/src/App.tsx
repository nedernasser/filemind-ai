import { useState } from 'react';
import FileUploader from './components/FileUploader';
import Results from './components/Results';
import SearchBox from './components/SearchBox';
import { useSearch } from './hooks/useSearch';

const App = () => {
  const [query, setQuery] = useState('');

  const {
    results,
    search,
    clearResults,
  } = useSearch();

  const handleSearch = async (q: string) => {
    setQuery(q);
    await search(q);
  };

  const handleUploadSuccess = () => {
    if (query) {
      search(query);
    } else {
      clearResults();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">FileMind AI</h1>

      <SearchBox onSearch={handleSearch} />
      <FileUploader onUploadSuccess={handleUploadSuccess} />

      <Results results={results} />
    </div>
  );
};

export default App;
