import React, {FC} from 'react';
import classes from './Search.module.scss'
import {useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {movieActions} from "../../redux";
import { useNavigate } from 'react-router-dom'
interface IFormData {
    search: string
}
const Search:FC= () => {
    const {searchQuery, currentPage} = useAppSelector(state => state.movieReducer)
    const dispatch = useAppDispatch()

    const {reset, handleSubmit, register} = useForm<IFormData>()

    const navigate = useNavigate()

    // const onFormSubmit = (data:IFormData) => {
    //     dispatch(movieActions.setSearchQuery(data.search))
    //     dispatch(movieActions.changeCurrPage(1))
    //     // dispatch(movieActions.searchMovies([data.search, 1]))
    //     navigate(`/movies?query=${data.search}&page=1`)
    //     reset()
    // }
    const onFormSubmit = (data:IFormData) => {
        // dispatch(movieActions.setSearchQuery(data.search))

        // dispatch(movieActions.changeCurrPage(1))
        // dispatch(movieActions.searchMovies([data.search, 1]))
        navigate(`/movies?query=${data.search}&page=1`)
        // reset()
    }
    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className={classes.search_bar}>
            <input type="search" pattern=".*\S.*" required autoComplete="off" {...register('search')}/>
            <button className={classes.search_btn}>
                <span>Search</span>
            </button>
        </form>
    );
};

export default Search;