import { Box, Typography, Grid, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import useLoadMoreMovies from "../hooks/useLoadMoreMovies";

const Home = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  // Retrieve the last search query and favorites from localStorage when the component mounts
  useEffect(() => {
    const lastSearch = localStorage.getItem("lastSearch");
    if (lastSearch) {
      setQuery(lastSearch); // Set the last search as the initial query
    }

    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites); // Set the saved favorites
  }, []);

  // Save the search query in localStorage whenever the query changes
  const handleSearch = (newQuery) => {
    localStorage.setItem("lastSearch", newQuery); // Save to localStorage
    setQuery(newQuery);
  };

  const { movies, loadMovies, isLoading, hasMore } = useLoadMoreMovies(query);

  // Add or remove a movie from the favorites list
  const handleFavoriteToggle = (movie) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === movie.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save to localStorage
  };

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
        {movies.length === 0 && !isLoading && (
          <Typography variant="h6" color="text.secondary">
            No movies found. Please try again.
          </Typography>
        )}

        {movies.map((movie) => {
          const isFavorite = favorites.some((fav) => fav.id === movie.id); // Check if the movie is in the favorites list
          
          return (
            <Grid item xs={12} sm={6} md={3} key={movie.id}>
              <MovieCard
                movie={movie}
                onClick={() => navigate(`/movie/${movie.id}`)}
                onFavoriteToggle={() => handleFavoriteToggle(movie)}
                isFavorite={isFavorite} // Pass the favorite status to the MovieCard
              />
            </Grid>
          );
        })}
      </Grid>

      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!isLoading && hasMore && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            onClick={() => loadMovies()}
            disabled={isLoading}
          >
            Load More
          </Button>
        </Box>
      )}

      {!hasMore && !isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No more movies to load.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Home;
