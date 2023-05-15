import React, {useEffect, FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {genreActions, movieActions} from "../../redux";
import Movies from "../../components/Movies/Movies";
import classes from './AllMoviesPage.module.scss'
import {Pagination, PaginationItem} from "@mui/material";
import Container from "../../Layouts/container/Container";
import {Link, useLocation} from "react-router-dom";

const AllMoviesPage:FC = () => {
    const {currentPage, totalPages, searchedMovies, searchQuery} = useAppSelector(state => state.movieReducer)
    const dispatch = useAppDispatch()
    const location = useLocation()

    const searchParams = new URLSearchParams(location.search);
    const pageFromURL = searchParams.get('page');
    const queryFromURL = searchParams.get('query');
    console.log(queryFromURL)
    const page = pageFromURL ? +pageFromURL : 1
    const query = queryFromURL ? queryFromURL : searchQuery
    dispatch(movieActions.setSearchQuery(query))


    useEffect(()=> {
        dispatch(movieActions.changeCurrPage(page))
        // searchedMovies.length > 1 || queryFromURL ? dispatch(movieActions.searchMovies([query, currentPage])) : dispatch(movieActions.getAll(page))
        searchQuery ? dispatch(movieActions.searchMovies([query, page])) : dispatch(movieActions.getAll(page))
        dispatch(genreActions.getAll())
    }, [currentPage, query])
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
                                // to={searchedMovies.length > 1 ? `?query=${searchQuery}&page=${item.page}` : `?page=${item.page}`}
                                to={query ? `?query=${searchQuery}&page=${item.page}` : `?page=${item.page}`}
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