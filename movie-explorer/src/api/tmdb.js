import axios from 'axios';

const API_KEY = '03fef835cde551c203355b9dda033f06';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export const fetchTrendingMovies = () =>
  api.get(`/trending/movie/week?api_key=${API_KEY}`);

export const searchMovies = (query, page = 1) =>
  api.get(`/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);

export const getMovieDetails = (id) =>
  api.get(`/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`);

export default api;
