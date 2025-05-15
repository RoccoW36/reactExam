import React, { useState, useCallback, useEffect } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";

interface MovieContextInterface {
    favourites: number[];
    mustWatch: number[];
    addToFavourites: (movie: BaseMovieProps) => void;
    removeFromFavourites: (movie: BaseMovieProps) => void;
    addReview: (movie: BaseMovieProps, review: Review) => void;
    addToMustWatch: (movie: BaseMovieProps) => void;
    removeFromMustWatch: (movie: BaseMovieProps) => void; 
    myReviews: { [key: number]: Review };
}

const initialContextState: MovieContextInterface = {
    favourites: [],
    mustWatch: [],
    myReviews: {},
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addReview: () => {},
    addToMustWatch: () => {},
    removeFromMustWatch: () => {},
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favourites, setFavourites] = useState<number[]>(() => {
        return JSON.parse(localStorage.getItem("favourites") || "[]");
    });

    const [mustWatch, setMustWatch] = useState<number[]>(() => {
        return JSON.parse(localStorage.getItem("mustWatch") || "[]");
    });

    const [myReviews, setMyReviews] = useState<{ [key: number]: Review }>({});

    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites));
    }, [favourites]);

    useEffect(() => {
        localStorage.setItem("mustWatch", JSON.stringify(mustWatch));
    }, [mustWatch]);

    const addToFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) =>
            prevFavourites.includes(movie.id) ? prevFavourites : [...prevFavourites, movie.id]
        );
    }, []);

    const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
    }, []);

    const addToMustWatch = useCallback((movie: BaseMovieProps) => {
        setMustWatch((prevMustWatch) =>
            prevMustWatch.includes(movie.id) ? prevMustWatch : [...prevMustWatch, movie.id]
        );
    }, []);

    const removeFromMustWatch = useCallback((movie: BaseMovieProps) => {
        setMustWatch((prevMustWatch) => prevMustWatch.filter((mId) => mId !== movie.id));
    }, []);

    const addReview = useCallback((movie: BaseMovieProps, review: Review) => {
        setMyReviews((prevReviews) => ({ ...prevReviews, [movie.id]: review }));
    }, []);

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                mustWatch,
                myReviews,
                addToFavourites,
                removeFromFavourites,
                addToMustWatch,
                removeFromMustWatch,
                addReview,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
