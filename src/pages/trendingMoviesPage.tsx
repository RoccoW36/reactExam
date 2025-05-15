import React, { useState } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { BaseMovieProps, TrendingMovies } from "../types/interfaces";
import { getTrendingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import MustWatchIcon from '../components/cardIcons/addToPlaylist';

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};

const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const TrendingMoviesPage: React.FC = () => {
  const [timeWindow, setTimeWindow] = useState<"day" | "week">("day");

  const { data, error, isLoading, isError } = useQuery<TrendingMovies, Error>(
    ["trending", timeWindow],
    () => getTrendingMovies(timeWindow)
  );

  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
  ]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const movies = data?.results ?? [];
  const displayedMovies = filterFunction(movies);

  return (
    <>
      <PageTemplate
        title="Trending Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => {
          return <MustWatchIcon {...movie} />;
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
      <button onClick={() => setTimeWindow(timeWindow === "day" ? "week" : "day")}>
        Toggle to {timeWindow === "day" ? "Weekly Trends" : "Daily Trends"}
      </button>
    </>
  );
};

export default TrendingMoviesPage;
