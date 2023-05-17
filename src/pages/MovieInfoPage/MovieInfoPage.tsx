import React, {useEffect, useState} from 'react';
import classes from './MovieInfoPage.module.scss'
import Container from "../../Layouts/container/Container";
import {useAppDispatch, useAppLocation, useAppSelector} from "../../hooks";
import {IMovie, IVideo} from "../../interfaces";
import {Rating} from "@mui/material";
import {movieService} from "../../services";

const MovieInfoPage = () => {
    const {state} = useAppLocation<IMovie>()
    const {genres} = useAppSelector(state => state.genreReducer)
    const {id, genre_ids, poster_path, title, overview, vote_average, release_date} = state

    const year:number = release_date ? new Date(release_date).getFullYear() : 0;
    const rating = vote_average ? Math.round(vote_average * 2) / 2 : 0;
    const foundGenre = genres.find(item => item.id === genre_ids[0]);
    const genre = foundGenre ? foundGenre.name : '';

    const img = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://kartinki.pibig.info/uploads/posts/2023-04/1681549765_kartinki-pibig-info-p-zaglushka-kartinka-arti-krasivo-1.jpg'
    const [trailer, setTrailer] = useState<string>('')
    const findTrailerKey = (res: IVideo[]) => {
        const v = res.find(item => item.name.toLowerCase() === 'official trailer') || res[0]
        console.log(v?.key)
        return v?.key
    }

    useEffect(()=> {
        movieService.getVideo(id)
            .then(res => res.data.results)
            .then(res => setTrailer(findTrailerKey(res)))
            .catch(()=> {})
    }, [])
    return (
        <div className={classes.movieInfoPage}>
            <Container>
                {trailer && <iframe
                    className={classes.bgVideo}
                    allowFullScreen
                    allow='autoplay; encrypted-media'
                    src={`https://www.youtube.com/embed/${trailer}`}/>
                }
                <img src={img} alt="poster"/>
                <h2>{title}</h2>
                <div className={classes.genreAndYear}><span>{foundGenre && genre}</span>, <span>{year}</span></div>
                <div>{overview}</div>

                <Rating name="movie-rating" defaultValue={rating} max={10} precision={0.5} readOnly/>


            </Container>
        </div>
    );
};

export default MovieInfoPage;