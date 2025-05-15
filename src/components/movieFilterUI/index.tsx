import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BaseMovieProps, MovieDetailsProps } from "../../types/interfaces";

export const titleFilter = (movie: BaseMovieProps, value: string): boolean => {
    return value ? movie.title.toLowerCase().includes(value.toLowerCase()) : true;
};

export const genreFilter = (movie: BaseMovieProps, value: string): boolean => {
    const genreId = Number(value);
    return genreId > 0 && movie.genre_ids ? movie.genre_ids.includes(genreId) : true;
};
export const favouritesgenreFilter = (movie: MovieDetailsProps, value: string): boolean => {
    const genreId = Number(value);
    return genreId > 0 && movie.genres ? movie.genres.some((genre) => genre.id === genreId) : true;
};

const styles = {
    fab: {
        marginTop: 8,
        position: "fixed",
        top: 20,
        right: 2,
    },
};

interface MovieFilterUIProps {
    onFilterValuesChange: (f: string, s: string) => void;
    titleFilter: string;
    genreFilter: string;
}

const MovieFilterUI: React.FC<MovieFilterUIProps> = ({ onFilterValuesChange, titleFilter, genreFilter }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);


    return (
        <>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                Filter
            </Fab>
            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <FilterCard
                    onUserInput={onFilterValuesChange}
                    titleFilter={titleFilter}
                    genreFilter={genreFilter}
                />
            </Drawer>
        </>
    );
};

export default MovieFilterUI;
