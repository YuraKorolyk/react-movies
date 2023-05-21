import React, {FC, useState} from 'react';
import {IMovie} from "../../interfaces";
import classes from './MovieCard.module.scss'
import StarIcon from '@mui/icons-material/Star';
import {useAppSelector} from "../../hooks";
import {useNavigate} from "react-router-dom";
interface IProps {
    movie: IMovie;
}
const MovieCard:FC<IProps>= ({movie}) => {
    const {id, genre_ids, poster_path, title, vote_average, release_date} = movie
    const {genres} = useAppSelector(state => state.genreReducer)
    const navigate = useNavigate()
    const [imageError, setImageError] = useState<boolean>(false);
    const year:number = release_date ? new Date(release_date).getFullYear() : 0;
    const foundGenre = genres.find(item => item.id === genre_ids[0]);
    const genre = foundGenre ? foundGenre.name : '';
    const vote = (Math.round(vote_average * 10) / 10).toFixed(1)
    const onCardClick = () => {
        navigate(`/movies/${id}`, {state: {...movie}})
    };
    return (
        <div className={classes.card} onClick={onCardClick}>
            <div className={classes.imgWrapper}>
                <div className={classes.overlay}></div>
                {imageError ? <div className={classes.error}></div> :
                    <img onError={()=> setImageError(true)} src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="poster"/>
                }
            </div>
            <h2>{title}</h2>
            <div className={classes.details}>
                <div className={classes.genreAndYear}>{foundGenre ? genre : 'Not found'}, {year}</div>
                <div className={classes.rating}><StarIcon sx={{color: 'gold', fontSize: 16}}/><span>{vote}</span></div>
            </div>
        </div>
    );
};

export default MovieCard;