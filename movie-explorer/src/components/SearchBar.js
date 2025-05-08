import { useContext, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { MovieContext } from '../context/MovieContext';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const { setLastSearch } = useContext(MovieContext);

  const handleSearch = () => {
    onSearch(query);
    setLastSearch(query);
  };

  return (
    <div>
      <TextField value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Movies..." />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default SearchBar;
