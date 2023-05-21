import React, {FC, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import classes from './Header.module.scss'
import '../container/Container.scss'
import Container from "../container/Container";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import MovieCreationRoundedIcon from '@mui/icons-material/MovieCreationRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import ThemeSwitcher from "../../UI/ThemeSwitcher/ThemeSwitcher";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import Search from "../../UI/Search/Search";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import FiltersModal from "../../components/FiltersModal/FiltersModal";
import UserInfo from "../../components/UserInfo/UserInfo";

const Header:FC = () => {
    const {currentPage} = useAppSelector(state => state.movieReducer)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const onMoviesClick = () =>  {
        navigate('/movies?page=1')
        dispatch(movieActions.getAll(1))
        setMoviesActive(true)
        setHomeActive(false)
    }
    const onHomeClick = () => {
        setHomeActive(true)
        setMoviesActive(false)
    }

    const [lightTheme, setLightTheme] = useState<boolean>(false)
    const [homeActive, setHomeActive] = useState<boolean>(false)
    const [moviesActive, setMoviesActive] = useState<boolean>(false)
    const [genresActive, setGenresActive] = useState<boolean>(false)

    useEffect(()=>{
        const localTheme: boolean = localStorage.getItem('lightTheme') === 'true' ? true : false
        setLightTheme(localTheme)
        localTheme ? document.body.classList.add('light') : document.body.classList.remove('light')
    }, [])
    const onThemeClick = () => {
        localStorage.setItem('lightTheme', !lightTheme+'')
        setLightTheme(!lightTheme)
        document.body.classList.toggle('light')
    };
    const onGenresClick = () => {
        setGenresActive(!genresActive)
    };
    return (
        <header className={classes.header}>
            <Container className={classes.headerInner}>
                <div className={classes.left}>
                    <div><Link to={'/'}>LOGO</Link></div>
                    <nav>
                        <ul className={classes.list}>
                            <li onClick={onHomeClick} className={homeActive ? classes.active : ''}><Link to={'/'}>Home</Link></li>
                            <li onClick={onMoviesClick} className={moviesActive ? classes.active : ''}><Link to={`/movies?page=${currentPage}`}>All Movies</Link></li>
                            <li onClick={onGenresClick}>Genres</li>
                        </ul>
                    </nav>

                </div>
                <div className={classes.right}>
                    {/*<div>search</div>*/}
                    <div style={{display: "flex"}}><Search/></div>
                    {/*<ThemeSwitcher/>*/}
                    <div className={classes.themeSwitcher} onClick={onThemeClick}>{!lightTheme ?
                        <WbSunnyOutlinedIcon sx={{color: 'rgb(140, 140, 140)', fontSize: 30}}/> :
                        <DarkModeOutlinedIcon sx={{color: 'rgb(38, 38, 38)', fontSize: 30}}/>}
                    </div>
                    <UserInfo imgUrl="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"/>
                </div>
            </Container>
            <FiltersModal isActive={genresActive}/>
            {/*{genresActive && <FiltersModal/>}*/}
        </header>
    );
};

export default Header;