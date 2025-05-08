import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieDetails } from '../api/tmdb';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id).then((res) => setMovie(res.data));
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Genres: {movie.genres.map((g) => g.name).join(', ')}</p>
      {movie.videos?.results[0] && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
          frameBorder="0"
          allowFullScreen
          title="Trailer"
        />
      )}
    </div>
  );
};

export default MovieDetails;
