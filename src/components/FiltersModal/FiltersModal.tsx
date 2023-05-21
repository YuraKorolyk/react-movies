import React, {FC, useState} from 'react';
import classes from './FiltersModal.module.scss'
import Container from "../../Layouts/container/Container";
import {useAppDispatch, useAppSelector} from "../../hooks";
import FilterItem from "../FilterItem/FilterItem";
import {FieldValues, useForm, UseFormRegister} from "react-hook-form";
import {useNavigate} from "react-router-dom";
interface IProps {
    isActive: boolean;
}
interface IFormData {
    // action: string
    // register: UseFormRegister<FieldValues>
}
const FiltersModal:FC<IProps> = ({isActive}) => {
    const {genres} = useAppSelector(state => state.genreReducer)
    const {reset, handleSubmit, register, formState: {isValid}} = useForm<IFormData>()
    const navigate = useNavigate()

    const onFormSubmit = (data:IFormData) => {
        const result = Object.values(data).filter(value => Boolean(value));
        const queryString:string = '?with_genres=' + result.join(',')
        console.log(queryString)
        navigate(`/movies${queryString}`)
        // reset()
    }
    const formClasses = isActive ? `${classes.filtersModal} ${classes.active}` : `${classes.filtersModal}`
        // dispatch(movieActions.getFilteredMovies('?page=1&sort_by=popularity.desc&primary_release_year=2015&with_genres=80,53'))

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className={formClasses}>
            <Container className={classes.filtersModalWrapper}>
                <div className={classes.genresWrapper}>
                    {genres && genres.map(item => (
                        <FilterItem
                            key={item.id}
                            name={item.name}
                            register={register}
                            id={item.id}
                            // validate={register{}}
                            // onValidate={validateHandler}
                        >
                                {item.name}
                        </FilterItem>
                    ))}

                </div>
                <br/>
                <div className={classes.formBtn}>
                    <button disabled={!isValid}>Find</button>
                </div>
            </Container>
        </form>
    );
};

export default FiltersModal;