import { useState, useEffect, useCallback } from "react";
import { fetchTrendingMovies, searchMovies } from "../api/tmdb";

const useLoadMoreMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMovies = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const res = query
        ? await searchMovies(query, page)
        : await fetchTrendingMovies(page);

      setMovies((prev) => [...prev, ...res.data.results]);
      setHasMore(res.data.page < res.data.total_pages);
    } catch (error) {
      console.error("Failed to load movies:", error);
    } finally {
      setIsLoading(false);
    }
  }, [query, page, isLoading, hasMore]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  useEffect(() => {
    if (query !== "") {
      setPage(1);
      setHasMore(true);
      setMovies([]);
    }
  }, [query]);

  return { movies, loadMovies, isLoading, hasMore };
};

export default useLoadMoreMovies;
