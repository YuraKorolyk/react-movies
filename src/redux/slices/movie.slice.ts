import {IMovie, IData, IVideo, IVideosData} from "../../interfaces";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {movieService, searchService} from "../../services";
import {AxiosError} from "axios";

interface IState {
    movies: IMovie[];
    searchQuery: string;
    totalPages: number;
    currentPage: number;
    popularMovies: IMovie[];
    upcomingMovies: IMovie[];
    nowPlayingMovies: IMovie[];
    topRatedMovies: IMovie[];
}

const initialState: IState = {
    movies: [],
    searchQuery: '',
    totalPages: 500,
    currentPage:  1,
    popularMovies: [],
    upcomingMovies: [],
    nowPlayingMovies: [],
    topRatedMovies: [],
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
const getFilteredMovies = createAsyncThunk<IData, string>(
    'movieSlice/getVideo',
    async (query,{rejectWithValue})=>{
        try {
            const {data} = await movieService.getFilteredMovies(query);
            return data;
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    });
const getPopularMovies = createAsyncThunk<IData>(
    'movieSlice/getPopularMovies',
    async (_, {rejectWithValue})=>{
        try {
            const {data} = await movieService.getPopularMovies();
            return data;
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    });
const getTopRatedMovies = createAsyncThunk<IData>(
    'movieSlice/getTopRatedMovies',
    async (_, {rejectWithValue})=>{
        try {
            const {data} = await movieService.getTopRatedMovies();
            return data;
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    });
const getNowPlayingMovies = createAsyncThunk<IData>(
    'movieSlice/getNowPlayingMovies',
    async (_, {rejectWithValue})=>{
        try {
            const {data} = await movieService.getNowPlayingMovies();
            return data;
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    });
const getUpcomingMovies = createAsyncThunk<IData>(
    'movieSlice/getUpcomingMovies',
    async (_, {rejectWithValue})=>{
        try {
            const {data} = await movieService.getUpcomingMovies();
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
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.movies = action.payload.results
                state.totalPages = 500;
            })
            .addCase(searchMovies.fulfilled, (state, action) => {
                const tPage = action.payload.total_pages
                state.movies = action.payload.results
                state.totalPages = tPage <=500 ? tPage : 500
            })
            .addCase(getFilteredMovies.fulfilled, (state, action) => {
                const tPage = action.payload.total_pages
                state.movies = action.payload.results
                state.totalPages = tPage <=500 ? tPage : 500
            })
            .addCase(getPopularMovies.fulfilled, (state, action) => {
                state.popularMovies = action.payload.results
            })
            .addCase(getTopRatedMovies.fulfilled, (state, action) => {
                state.topRatedMovies = action.payload.results
            })
            .addCase(getNowPlayingMovies.fulfilled, (state, action) => {
                state.nowPlayingMovies = action.payload.results
            })
            .addCase(getUpcomingMovies.fulfilled, (state, action) => {
                state.upcomingMovies = action.payload.results
            })
})


const {actions, reducer: movieReducer} = slice
const movieActions = {
    ...actions,
    getAll,
    searchMovies,
    getFilteredMovies,
    getPopularMovies,
    getTopRatedMovies,
    getUpcomingMovies,
    getNowPlayingMovies,
}
export {
    movieActions,
    movieReducer
}