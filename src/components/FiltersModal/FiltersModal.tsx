import React, {FC, useState} from 'react';
import classes from './FiltersModal.module.scss'
import Container from "../../Layouts/container/Container";
import {useAppSelector} from "../../hooks";
import FilterItem from "../FilterItem/FilterItem";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
interface IProps {
    isActive: boolean;
}
interface IFormData {
}
const FiltersModal:FC<IProps> = ({isActive}) => {
    const {genres} = useAppSelector(state => state.genreReducer)
    const {handleSubmit, register, formState: {isValid}} = useForm<IFormData>()
    const navigate = useNavigate()

    const onFormSubmit = (data:IFormData) => {
        const result = Object.values(data).filter(value => Boolean(value));
        const queryString:string = '?with_genres=' + result.join(',')
        navigate(`/movies${queryString}`)
    }
    const formClasses = isActive ? `${classes.filtersModal} ${classes.active}` : `${classes.filtersModal}`

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className={formClasses}>
            <Container className={classes.filtersModalWrapper}>
                <div className={classes.genresWrapper}>
                    {genres.length > 0 && genres.map(item => (
                        <FilterItem
                            key={item.id}
                            name={item.name}
                            register={register}
                            id={item.id}
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