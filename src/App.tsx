import React, {useEffect} from 'react';
import './App.css';
import Header from './Layouts/Header/Header';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AllMoviesPage from "./pages/AllMoviesPage/AllMoviesPage";
import GenresPage from "./pages/GenresPage/GenresPage";

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route path={'/'} element={<HomePage/>}/>
            <Route path={'/movies'} element={<AllMoviesPage/>}/>
            <Route path={'/genres'} element={<GenresPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
