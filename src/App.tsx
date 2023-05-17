import React, {useEffect} from 'react';
import './App.css';
import Header from './Layouts/Header/Header';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AllMoviesPage from "./pages/AllMoviesPage/AllMoviesPage";
import GenresPage from "./pages/GenresPage/GenresPage";
import {useAppDispatch} from "./hooks";
import {genreActions} from "./redux";
import MovieInfoPage from "./pages/MovieInfoPage/MovieInfoPage";

function App() {
    const dispatch = useAppDispatch()
    useEffect(()=> {
        dispatch(genreActions.getAll())
    }, [])
  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route path={'/'} element={<HomePage/>}/>
            <Route path={'/movies'} element={<AllMoviesPage/>}/>
            <Route path={'/genres'} element={<GenresPage/>}/>
            <Route path={'/movies/:id'} element={<MovieInfoPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
