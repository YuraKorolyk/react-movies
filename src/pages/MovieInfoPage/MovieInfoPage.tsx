import React, {useEffect, useState} from 'react';
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import classes from "./MovieInfoPage.module.scss";
import Slider from "../../components/Slider/Slider";
import Container from "../../Layouts/container/Container";
import {useAppLocation, useAppSelector} from "../../hooks";
import {movieService} from "../../services";
import {IMovie} from "../../interfaces";
import MovieReviews from "../../components/MovieReviews/MovieReviews";

const MovieInfoPage = () => {
    const {state} = useAppLocation<IMovie>()
    const [recommendMovies, setRecommendMovies] = useState<IMovie[]>([])

    useEffect(()=> {
        movieService.getRecommendMovies(state.id)
            .then(res => res.data.results)
            .then(res => setRecommendMovies(res))
            .catch(()=> {})
    }, [state.id])
    return (
        <div>
            <MovieInfo/>
            <Container>
                <div className={classes.sliderCategory}>
                    <div className={classes.sliderTitle}>Recommendations</div>
                    <Slider filmsArr={recommendMovies}
                            navigateClassPrev='recommendationsPrev'
                            navigateClassNext='recommendationsNext'
                            spaceBetween={27.5}
                            slidesPerView={5}
                    />
                </div>

                <MovieReviews/>
            </Container>
        </div>
    );
};

export default MovieInfoPage;