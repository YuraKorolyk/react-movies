import React, {FC, useEffect} from 'react';
import Container from "../../Layouts/container/Container";
import classes from './HomePage.module.scss'
import { Navigation, Pagination, Scrollbar, Autoplay, EffectFade } from 'swiper';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import {Swiper, SwiperSlide, useSwiper} from "swiper/react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import Slider from "../../components/Slider/Slider";
import { Skeleton } from '@mui/material';

const HomePage:FC= () => {
    const {popularMovies, upcomingMovies, nowPlayingMovies, topRatedMovies} = useAppSelector(state => state.movieReducer)
    const dispatch = useAppDispatch()
    const swiper = useSwiper();
    useEffect(()=> {
        dispatch(movieActions.getPopularMovies());
        dispatch(movieActions.getUpcomingMovies());
        dispatch(movieActions.getTopRatedMovies());
        dispatch(movieActions.getNowPlayingMovies());
    }, [])
    return (
        <div>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, Autoplay, EffectFade]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    loop={true}
                    effect={"fade"}
                    autoplay={{delay: 7000}}
                    pagination={{ clickable: true }}
                >
                    {popularMovies ? popularMovies.map(item =>
                        <SwiperSlide className={classes.slide} key={item.id}>
                            <img className={classes.slideImg} src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}/>
                        </SwiperSlide>
                    ) :
                        <div className={classes.skeletonWrapper}>
                            <Skeleton variant="rectangular" width={1260} height={650} />
                        </div>
                    }
                </Swiper>
            <Container className={classes.moviesWrapper}>
                <div className={classes.sliderCategory}>
                    <div className={classes.sliderTitle}>Popular</div>
                    <Slider filmsArr={popularMovies}
                            navigateClassPrev='popularPrev'
                            navigateClassNext='popularNext'
                            spaceBetween={27.5}
                            slidesPerView={5}
                    />
                </div>
                <div className={classes.sliderCategory}>
                    <div className={classes.sliderTitle}>Top Rated</div>
                    <Slider filmsArr={topRatedMovies}
                            navigateClassPrev='topRatedPrev'
                            navigateClassNext='topRatedNext'
                            spaceBetween={27.5}
                            slidesPerView={5}
                    />
                </div>
                <div className={classes.sliderCategory}>
                    <div className={classes.sliderTitle}>Now Playing</div>
                    <Slider filmsArr={nowPlayingMovies}
                            navigateClassPrev='nowPlayingPrev'
                            navigateClassNext='nowPlayingNext'
                            spaceBetween={27.5}
                            slidesPerView={5}
                    />
                </div>
                <div className={classes.sliderCategory}>
                    <div className={classes.sliderTitle}>Upcoming</div>
                    <Slider filmsArr={upcomingMovies}
                            navigateClassPrev='upcomingPrev'
                            navigateClassNext='upcomingNext'
                            spaceBetween={27.5}
                            slidesPerView={5}
                    />
                </div>

            </Container>
        </div>
    );
};

export default HomePage;