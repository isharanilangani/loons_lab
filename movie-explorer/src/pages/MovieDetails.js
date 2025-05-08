import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieDetails } from '../api/tmdb';
import { Box, Typography, Chip, Divider } from '@mui/material';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id).then((res) => setMovie(res.data));
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  const trailer = movie.videos?.results.find((vid) => vid.type === 'Trailer' && vid.site === 'YouTube');

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h3" gutterBottom>{movie.title}</Typography>
      <Typography variant="body1" paragraph>{movie.overview}</Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h5">Genres:</Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
        {movie.genres.map((g) => (
          <Chip key={g.id} label={g.name} color="primary" />
        ))}
      </Box>

      {trailer && (
        <>
          <Typography variant="h5" gutterBottom>Trailer</Typography>
          <iframe
            width="100%"
            height="450"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            frameBorder="0"
            allowFullScreen
            title="Trailer"
            style={{ borderRadius: '8px' }}
          />
        </>
      )}

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5">Cast:</Typography>
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', mt: 2 }}>
        {movie.credits?.cast.slice(0, 10).map((actor) => (
          <Box key={actor.cast_id} sx={{ textAlign: 'center' }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              style={{ borderRadius: '10px', width: '100px', height: '150px', objectFit: 'cover' }}
            />
            <Typography variant="subtitle2">{actor.name}</Typography>
            <Typography variant="body2" color="text.secondary">{actor.character}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MovieDetails;
