import React, {useEffect, useState} from 'react';
import classes from './MovieInfo.module.scss'
import Container from "../../Layouts/container/Container";
import {useAppLocation, useAppSelector} from "../../hooks";
import {IGenre, IMovie, IVideo} from "../../interfaces";
import {Rating, Skeleton} from "@mui/material";
import {movieService} from "../../services";
import {useNavigate} from "react-router-dom";
import Slider from "../Slider/Slider";

const MovieInfo = () => {
    const navigate = useNavigate()
    const {state} = useAppLocation<IMovie>()
    const [trailer, setTrailer] = useState<string>('')
    const {genres} = useAppSelector(state => state.genreReducer)
    const {id, genre_ids, poster_path, title, overview, vote_average, release_date} = state
    const img = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://kartinki.pibig.info/uploads/posts/2023-04/1681549765_kartinki-pibig-info-p-zaglushka-kartinka-arti-krasivo-1.jpg'
    const year:number = release_date ? new Date(release_date).getFullYear() : 0;
    const rating = vote_average ? Math.round(vote_average * 2) / 2 : 0;

    let genresArr = [],
        genresNamesArr = []
    genresArr = genres?.filter(genre => genre_ids.includes(genre.id));
    genresNamesArr = genresArr.map((item, index) => (
        <span
            key={item.id}
            onClick={()=> onGenreClick(item)}
            className={classes.genreItem}
        >
            {item.name}{index !== genresArr.length-1 ? ', ' : null}
        </span>
    ));
    const onGenreClick = (item: IGenre) => {
        navigate(`/movies?with_genres=${item.id}`)
    }
    const findTrailerKey = (res: IVideo[]) => {
        const v = res.find(item => item.name.toLowerCase() === 'official trailer') || res[0]
        console.log(v?.key)
        return v?.key
    }
    useEffect(()=> {
        movieService.getVideo(id)
            .then(res => res.data.results)
            .then(res => setTrailer(findTrailerKey(res)))
            .then(()=> console.log(trailer))
            .catch(()=> {})
    }, [])
    return (
        <div className={classes.movieInfo}>
            <Container className={classes.wrapper}>
               <div className={classes.info}>
                   <div className={classes.left}>
                       <div className={classes.imgWrapper}>
                            <img src={img} alt="poster"/>
                       </div>
                       <div className={classes.textWrapper}>
                           <h2>{title}</h2>
                           <div className={classes.gridWrapper}>
                               <div className={classes.title}>Genre</div>
                               <div className={classes.item}>{genresNamesArr && genresNamesArr}</div>
                               <div className={classes.title}>Year</div>
                               <div className={classes.item}>{year}</div>
                               <div className={classes.title}>Rating</div>
                               <div className={`${classes.item} ${classes.rating}` }>
                                   <Rating name="movie-rating" defaultValue={rating} max={10} precision={0.5} readOnly/>
                                   <div>{vote_average}</div>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className={classes.overview}>{overview}</div>
               </div>
                <div>
                    <div className={classes.trailer}>
                        {trailer ? <iframe
                            className={classes.bgVideo}
                            allowFullScreen
                            allow='autoplay; encrypted-media'
                            src={`https://www.youtube.com/embed/${trailer}`}/> :
                            <Skeleton
                                variant="rectangular"
                                animation="wave"
                                width={600}
                                height={400}
                                sx={{ bgcolor: 'grey' }}
                            />
                        }
                    </div>
                </div>


            </Container>

        </div>
    );
};

export default MovieInfo;