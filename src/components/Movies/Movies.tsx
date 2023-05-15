import React, {FC} from 'react';
import {useAppSelector} from "../../hooks";
import MovieCard from "../MovieCard/MovieCard";
import Container from "../../Layouts/container/Container";
import classes from './Movies.module.scss'
const Movies:FC = () => {
    const {movies, searchedMovies} = useAppSelector(state => state.movieReducer)
    const arrForRender = searchedMovies.length > 0 ? searchedMovies : movies
    return (
        <div className={classes.movie}>
            <Container className={classes.movieWrapper}>
                {arrForRender && arrForRender.map(movie =>
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                />)}


            </Container>

        </div>
    );
};

export default Movies;