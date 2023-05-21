import React, {FC, RefObject, useRef} from 'react';
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import MovieCard from "../MovieCard/MovieCard";
import {IMovie} from "../../interfaces";
import {Autoplay, EffectFade, Navigation, Pagination, Scrollbar} from "swiper";
import classes from "./Slider.module.scss";
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

interface IProps {
    filmsArr: IMovie[];
    spaceBetween: number;
    slidesPerView: number;
    navigateClassPrev: string;
    navigateClassNext: string;
}
const Slider:FC<IProps> = ({filmsArr, spaceBetween, slidesPerView,navigateClassPrev ,navigateClassNext}) => {
    return (
        <div>
            <div className={classes.buttons}>
                <button className={navigateClassPrev}><NavigateBeforeRoundedIcon sx={{fontSize: 28}}/></button>
                <button className={navigateClassNext}><NavigateNextRoundedIcon sx={{fontSize: 28}}/></button>
            </div>

            <Swiper
                navigation={{
                    prevEl: `.${navigateClassPrev}`,
                    nextEl: `.${navigateClassNext}`,
                }}
                modules={[Navigation]}
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
            >
                {filmsArr && filmsArr.map(item =>
                    <SwiperSlide key={item.id}>
                        <MovieCard
                            movie={item}
                        />
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
};

export default Slider;