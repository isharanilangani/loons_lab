import { useEffect, useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchTrendingMovies, searchMovies } from "../api/tmdb";
import { useAuth } from "../context/AuthContext";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const loadTrending = async () => {
    try {
      const res = await fetchTrendingMovies();
      setMovies(res.data.results);
    } catch (error) {
      console.error("Failed to load trending movies:", error);
    }
  };

  const handleSearch = async (query) => {
    try {
      const res = await searchMovies(query);
      setMovies(res.data.results);
      localStorage.setItem("lastSearch", query);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  useEffect(() => {
    const lastQuery = localStorage.getItem("lastSearch");
    if (lastQuery) {
      handleSearch(lastQuery);
    } else {
      loadTrending();
    }
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5">Welcome, {user?.username} 👋</Typography>
        <Button variant="outlined" onClick={logout}>
          Logout
        </Button>
      </Box>

      <SearchBar onSearch={handleSearch} />

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie.id}>
              <MovieCard movie={movie} onClick={(id) => navigate(`/movie/${id}`)} />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 4, mx: "auto" }}>
            No movies found.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Home;
