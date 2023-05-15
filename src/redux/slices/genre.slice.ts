import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IGenre, IGenresData} from "../../interfaces";
import {genreService} from "../../services";
import { AxiosError } from "axios";

interface IState {
    genres: IGenre[],
}

const initialState: IState = {
    genres: [],
}

const getAll = createAsyncThunk<IGenresData, void>(
    'movieSlice/getGenres',
    async (_,{rejectWithValue})=>{
        try {
            const {data} = await genreService.getAll();
            return data;
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response?.data)
        }
    });

const slice = createSlice({
    name: 'genreSlice',
    initialState,
    reducers: {

    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.genres = action.payload.genres
            })
})
const {actions, reducer: genreReducer} = slice
const genreActions = {
    ...actions,
    getAll,
}
export {
    genreActions,
    genreReducer
}