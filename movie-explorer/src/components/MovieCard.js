import { Card, CardContent, CardMedia, Button, Typography } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const MovieCard = ({ movie, onClick, onFavoriteToggle, isFavorite }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={movie.title}
        height="200"
        image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.overview.substring(0, 100)}...
        </Typography>
      </CardContent>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
        onClick={onClick}
      >
        View Details
      </Button>
      <Button
        variant="outlined"
        color={isFavorite ? "error" : "primary"}
        onClick={onFavoriteToggle}
        startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </Button>
    </Card>
  );
};

export default MovieCard;
