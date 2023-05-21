import React, {FC} from 'react';
import {useAppSelector} from "../../hooks";
import MovieCard from "../MovieCard/MovieCard";
import Container from "../../Layouts/container/Container";
import classes from './Movies.module.scss'
import { Skeleton } from '@mui/material';
const Movies:FC = () => {
    const {movies} = useAppSelector(state => state.movieReducer)
    const skeletonRender = () => {
        let arr = [];

        for (let i = 0; i < 10; i++) {
            arr.push(<div key={i}>
                <Skeleton variant="rounded" animation="wave" width={230} height={345} />
                <br/>
                <Skeleton variant="rounded" animation="wave" width={230} height={50} />
            </div>)
        }
        return arr
    }

    return (
        <div className={classes.movie}>
            <Container className={classes.movieWrapper}>
                {movies.length > 1 ? movies.map(movie =>
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                />) :
                <>
                    {skeletonRender()}
                </>
                }


            </Container>

        </div>
    );
};

export default Movies;