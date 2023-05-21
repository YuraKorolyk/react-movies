import React, {useEffect, FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {genreActions, movieActions} from "../../redux";
import Movies from "../../components/Movies/Movies";
import classes from './AllMoviesPage.module.scss'
import {Pagination, PaginationItem} from "@mui/material";
import Container from "../../Layouts/container/Container";
import {Link, useLocation} from "react-router-dom";

const AllMoviesPage:FC = () => {
    const {totalPages, searchQuery} = useAppSelector(state => state.movieReducer)
    const dispatch = useAppDispatch()
    const location = useLocation()

    const searchParams = new URLSearchParams(location.search);
    const pageFromURL = searchParams.get('page');
    const queryFromURL = searchParams.get('query');
    const genresFromURL = searchParams.get('with_genres');
    const page = pageFromURL ? +pageFromURL : 1


    useEffect(()=> {
        if (queryFromURL) {
            dispatch(movieActions.searchMovies([queryFromURL, page]))
        } else if (genresFromURL) {
            dispatch(movieActions.getFilteredMovies(`?with_genres=${genresFromURL}&page=${page}`))
        } else {
            dispatch(movieActions.getAll(page))
        }


    }, [page, queryFromURL, genresFromURL])

    const setUrl = (item: {page: number | null}) => {
        if (queryFromURL) {
            return `/movies?page=${item.page}&query=${queryFromURL}`
        } else if (genresFromURL) {
            return `/movies?page=${item.page}&with_genres=${genresFromURL}`
        } else {
            return `/movies?page=${item.page}`

        }
    }
    return (
        <Container>
            <Movies/>
            <div className={classes.pagination}>
                {<Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, num) => dispatch(movieActions.changeCurrPage(num))}
                    size={"large"}
                    renderItem={(item)=> (
                        <PaginationItem
                            component={Link}
                            to={setUrl(item)}
                            {...item}
                        />
                    )}
                    />
                }
            </div>
        </Container>
    );
};

export default AllMoviesPage;