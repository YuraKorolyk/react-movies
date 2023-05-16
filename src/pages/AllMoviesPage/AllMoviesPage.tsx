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

    const page = pageFromURL ? +pageFromURL : 1
    // let query = queryFromURL ? queryFromURL : searchQuery
    // dispatch(movieActions.setSearchQuery(query))


    useEffect(()=> {
        !queryFromURL && dispatch(movieActions.getAll(page))
        queryFromURL && dispatch(movieActions.searchMovies([queryFromURL, page]))

    }, [page, queryFromURL])
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
                                // to={query ? `?query=${searchQuery}&page=${item.page}` : `?page=${item.page}`}
                                to={queryFromURL ? `?query=${queryFromURL}&page=${item.page}` : `?page=${item.page}`}
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