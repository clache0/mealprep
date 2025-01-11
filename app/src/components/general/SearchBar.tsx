import React, { useEffect, useState } from 'react';
import "../../styles/components/general/SearchBar.css"

interface SearchBarProps<T> {
  data: T[];
  onSearchResults: (results: T[]) => void;
}
// todo clear search bar after submitting forms

const SearchBar = <T extends { name: string }>({ data, onSearchResults }: SearchBarProps<T>) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredResults = data.filter((item) =>
      item.name.toLowerCase().includes(term)
    );

    onSearchResults(filteredResults);
  };

  // clear search term if data changes
  useEffect(() => {
    setSearchTerm('');
  }, [data]);

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name..."
      />
    </div>
  );
};

export default SearchBar;