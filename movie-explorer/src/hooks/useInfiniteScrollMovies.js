import { useState, useEffect, useCallback, useRef } from "react";
import { fetchTrendingMovies, searchMovies } from "../api/tmdb";

const useInfiniteScrollMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef();

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

  const lastMovieRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return { movies, lastMovieRef, isLoading };
};

export default useInfiniteScrollMovies;
