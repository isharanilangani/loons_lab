import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const MovieCard = ({ movie, onClick }) => (
  <Card sx={{ cursor: 'pointer' }} onClick={() => onClick(movie.id)}>
    <CardMedia
      component="img"
      image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      alt={movie.title}
    />
    <CardContent>
      <Typography variant="h6">{movie.title}</Typography>
      <Typography variant="body2">{movie.release_date?.slice(0, 4)}</Typography>
      <Typography variant="body2">⭐ {movie.vote_average}</Typography>
    </CardContent>
  </Card>
);

export default MovieCard;
