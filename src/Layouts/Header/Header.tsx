import React, {FC} from 'react';
import {Link, useNavigate} from "react-router-dom";
import classes from './Header.module.scss'
import '../container/Container.scss'
import Container from "../container/Container";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MovieCreationRoundedIcon from '@mui/icons-material/MovieCreationRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import ThemeSwitcher from "../../UI/ThemeSwitcher/ThemeSwitcher";
import Search from "../../UI/Search/Search";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
// import {searchActions} from "../../redux";
const Header:FC = () => {
    const {currentPage} = useAppSelector(state => state.movieReducer)
    const dispatch = useAppDispatch()
        const navigate = useNavigate()
    const onMoviesClick = () =>  {
        dispatch(movieActions.clearSearcherMovies())
        dispatch(movieActions.setSearchQuery(''))

        navigate(`/movies?page=1`)
    }

    return (
        <header className={classes.header}>
            <Container className={classes.headerInner}>
                <div className={classes.left}>
                    <div><Link to={'/'}>LOGO</Link></div>
                    <nav>
                        <ul className={classes.list}>
                            <li><Link to={'/'}><HomeRoundedIcon sx={{fontSize: 16}}/><span>Home</span></Link></li>
                            <li onClick={onMoviesClick}><Link to={`/movies?page=${currentPage}`}><MovieCreationRoundedIcon sx={{fontSize: 16}}/><span>All Movies</span></Link></li>
                            <li><Link to={'/genres'}><BorderColorRoundedIcon sx={{fontSize: 16}}/><span>Genres</span></Link></li>
                        </ul>
                    </nav>
                </div>
                <div className={classes.right}>
                    {/*<div>search</div>*/}
                    <div style={{display: "flex"}}><Search/></div>
                    <ThemeSwitcher/>
                    <div className={classes.userIcon}><img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt=""/></div>
                </div>
            </Container>

        </header>
    );
};

export default Header;