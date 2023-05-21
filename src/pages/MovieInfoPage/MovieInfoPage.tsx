import React from 'react';
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import classes from "../../components/MovieInfo/MovieInfo.module.scss";
import Slider from "../../components/Slider/Slider";
import Container from "../../Layouts/container/Container";
import {useAppSelector} from "../../hooks";

const MovieInfoPage = () => {
    const {popularMovies} = useAppSelector(state => state.movieReducer)
    return (
        <div>
            <MovieInfo/>
            <Container>
                <div className={classes.sliderCategory}>
                    <div className={classes.sliderTitle}>Similar</div>
                    <Slider filmsArr={popularMovies}
                            navigateClassPrev='_Prev'
                            navigateClassNext='_Next'
                            spaceBetween={27.5}
                            slidesPerView={5}
                    />
                </div>
            </Container>
        </div>
    );
};

export default MovieInfoPage;