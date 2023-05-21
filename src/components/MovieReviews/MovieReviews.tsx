import React, {useEffect, useState} from 'react';
import {movieService} from "../../services";
import {useAppLocation} from "../../hooks";
import {IMovie, IReview} from "../../interfaces";
import MovieReview from "../MovieReview/MovieReview";
import classes from './MovieReviews.module.scss'
const MovieReviews = () => {
    const {state} = useAppLocation<IMovie>()
    const [reviews, setReviews] = useState<IReview[]>([])
    useEffect(()=> {
        movieService.getReviews(state.id)
            .then(res => res.data.results)
            .then(res => setReviews(res))
            .catch(() => console.log('Cant get reviews'))
    }, [state.id])
    return (
        <div className={classes.reviewsWrapper}>
            {reviews.length > 0 && <h2>Reviews</h2>}
            {reviews.length > 0 && reviews.map((item, i) => (
                <MovieReview key={i} review={item}/>
            ))}
        </div>
    );
};

export default MovieReviews;