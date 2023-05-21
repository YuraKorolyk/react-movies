import React, {FC} from 'react';
import classes from './Search.module.scss'
import {useForm} from "react-hook-form";
import { useNavigate } from 'react-router-dom'
interface IFormData {
    search: string
}
const Search:FC= () => {

    const {reset, handleSubmit, register} = useForm<IFormData>()

    const navigate = useNavigate()


    const onFormSubmit = (data:IFormData) => {

        navigate(`/movies?query=${data.search}&page=1`)
        reset()
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