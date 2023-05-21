import React, {FC, useState} from 'react';
import {IReview} from "../../interfaces";
import classes from './MovieReview.module.scss'
import PersonIcon from '@mui/icons-material/Person';
interface IProps {
    review: IReview;
}
const MovieReview:FC<IProps> = ({review}) => {
    const {author_details, created_at, content} = review
    const [imageError, setImageError] = useState<boolean>(false);
    const date = new Date(created_at);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;

    return (
        <div className={classes.reviewWrapper}>
            <div className={classes.image}>
                {imageError ? <PersonIcon sx={{fontSize: 30}}/> :
                <img onError={() => setImageError(!imageError)} src={author_details.avatar_path ? `https://image.tmdb.org/t/p/w500${author_details.avatar_path}` : ''} alt="review"/>}
            </div>
            <div className={classes.info}>
                <div className={classes.top}>
                    <span className={classes.name}>{author_details.username || author_details.name}</span><span className={classes.date}>{formattedDate}</span>
                </div>
                <div className={classes.bottom}>{content}</div>
            </div>
        </div>
    );
};

export default MovieReview;