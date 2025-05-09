import { Box, Typography, Grid, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import useInfiniteScrollMovies from "../hooks/useInfiniteScrollMovies";

const Home = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const { movies, lastMovieRef, isLoading } = useInfiniteScrollMovies(query);

  const handleSearch = (newQuery) => {
    localStorage.setItem("lastSearch", newQuery);
    setQuery(newQuery);
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
        {movies.map((movie, index) => {
          const isLast = movies.length === index + 1;
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={movie.id}
              ref={isLast ? lastMovieRef : null}
            >
              <MovieCard movie={movie} onClick={() => navigate(`/movie/${movie.id}`)} />
            </Grid>
          );
        })}
      </Grid>

      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default Home;
