import React, {FC} from 'react';
import {IMovie} from "../../interfaces";
import classes from './MovieCard.module.scss'
import { Rating } from '@mui/material';
import {useAppSelector} from "../../hooks";
import {useNavigate} from "react-router-dom";
interface IProps {
    movie: IMovie;
}
const MovieCard:FC<IProps>= ({movie}) => {
    const {id, genre_ids, poster_path, title, overview, vote_average, release_date} = movie
    const {genres} = useAppSelector(state => state.genreReducer)
    const navigate = useNavigate()

    const year:number = release_date ? new Date(release_date).getFullYear() : 0;
    const rating = vote_average ? Math.round(vote_average * 2) / 2 : 0;
    const foundGenre = genres.find(item => item.id === genre_ids[0]);
    const genre = foundGenre ? foundGenre.name : '';
    const img = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://kartinki.pibig.info/uploads/posts/2023-04/1681549765_kartinki-pibig-info-p-zaglushka-kartinka-arti-krasivo-1.jpg'
    const onCardClick = () => {
        navigate(`/movies/${id}`, {state: {...movie}})

    };
    return (
        <div className={classes.card} onClick={onCardClick}>
            <div className={classes.imgWrapper}>
                <div className={classes.overlay}></div>
                <img src={img} alt="poster"/>
            </div>
            <h2>{title}</h2>
            <div className={classes.genreAndYear}><span>{foundGenre && genre}</span>, <span>{year}</span></div>
            <div className={classes.overview}>{overview}</div>

            <Rating name="movie-rating" defaultValue={rating} max={10} precision={0.5} readOnly/>
        </div>
    );
};

export default MovieCard;