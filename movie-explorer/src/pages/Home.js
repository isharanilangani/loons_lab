import { useEffect, useState } from 'react';
import { fetchTrendingMovies, searchMovies } from '../api/tmdb';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const loadTrending = async () => {
    const res = await fetchTrendingMovies();
    setMovies(res.data.results);
  };

  const handleSearch = async (query) => {
    const res = await searchMovies(query);
    setMovies(res.data.results);
  };

  useEffect(() => {
    loadTrending();
  }, []);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={3} key={movie.id}>
            <MovieCard movie={movie} onClick={(id) => navigate(`/movie/${id}`)} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
