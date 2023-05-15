import {IMovie, IData} from "../../interfaces";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {movieService, searchService} from "../../services";
import {AxiosError} from "axios";



interface IState {
    movies: IMovie[],
    searchedMovies: IMovie[];
    searchQuery: string;
    newQuery: string;

    totalPages: number,
    currentPage: number,
}

const initialState: IState = {
    movies: [],
    searchQuery: '',
    newQuery: '',
    searchedMovies: [],
    totalPages: 500,
    currentPage:  1
}
const getAll = createAsyncThunk<IData, number>(
    'movieSlice/getAll',
    async (page,{rejectWithValue})=>{
        try {
            const {data} = await movieService.getAll(page);
            return data;
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    });
const searchMovies = createAsyncThunk<IData, [query: string, page: number]>(
    'movieSlice/searchMovies',
    async ([query,page],{rejectWithValue})=>{
        try {
            const {data} = await searchService.searchMovies(query, page);
            return data;
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    });

const slice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {
        changeCurrPage: (state, action) => {
            state.currentPage = action.payload
        },
        clearSearcherMovies: state => {
            state.currentPage = 1
            state.searchedMovies = []
            state.totalPages = 500
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        },
        setTotalPage: (state, action) => {
            state.totalPages = action.payload
        },
        setNewQuery: (state, action) => {
            state.newQuery = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.movies = action.payload.results
                // state.currentPage = action.payload.page
            })
            .addCase(searchMovies.fulfilled, (state, action) => {
                const tPage = action.payload.total_pages
                state.searchedMovies = action.payload.results
                state.totalPages = tPage <=500 ? tPage : 500
            })
})


const {actions, reducer: movieReducer} = slice
const movieActions = {
    ...actions,
    getAll,
    searchMovies
    // getGenres
}
export {
    movieActions,
    movieReducer
}