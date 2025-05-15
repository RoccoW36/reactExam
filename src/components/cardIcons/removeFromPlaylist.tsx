import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { BaseMovieProps } from "../../types/interfaces";

const RemoveFromPlaylistIcon: React.FC<BaseMovieProps> = (movie) => {
  const context = useContext(MoviesContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.removeFromMustWatch(movie);
  };

  return (
    <IconButton aria-label="remove from must watch" onClick={onUserRequest}>
      <PlaylistRemoveIcon color="secondary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromPlaylistIcon;
