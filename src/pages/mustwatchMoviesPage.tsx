import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI from "../components/movieFilterUI";
import RemoveFromPlaylistIcon from "../components/cardIcons/removeFromPlaylist";
import WriteReview from "../components/cardIcons/writeReview";
import { titleFilter, favouritesgenreFilter } from "../components/movieFilterUI";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};

const genreFiltering = {
  name: "genre",
  value: "0",
  condition: favouritesgenreFilter,
};

const MustWatchMoviesPage: React.FC = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);
  const { filterValues, setFilterValues } = useFiltering([
    titleFiltering,
    genreFiltering,
  ]);

  const mustWatchMovieQueries = useQueries(
    movieIds.map((movieId) => ({
      queryKey: ["movie", movieId],
      queryFn: () => getMovie(movieId.toString()),
    }))
  );

  const isLoading = mustWatchMovieQueries.some((m) => m.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  const allMustWatch = mustWatchMovieQueries.map((q) => q.data);

  const displayedMovies = allMustWatch
    ? allMustWatch.filter((movie) =>
        titleFilter(movie, filterValues[0].value) &&
        (filterValues[1].value === "0" || favouritesgenreFilter(movie, filterValues[1].value))
      )
    : [];

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value };
    setFilterValues(
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter]
    );
  };

  return (
    <>
      <PageTemplate
        title="Must Watch Movies"
        movies={displayedMovies}
        action={(movie) => (
          <>
            <RemoveFromPlaylistIcon {...movie} />
            <WriteReview {...movie} />
          </>
        )}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value} 
      />
    </>
  );
};

export default MustWatchMoviesPage;
