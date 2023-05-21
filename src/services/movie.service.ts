import {axiosService} from "./axios.service";
import {IRes} from "../types";
import {urls} from "../constants";
import {IData, IReview, IReviewsData} from "../interfaces";
import {IVideosData} from "../interfaces";

const movieService = {
    getAll: (page:number = 1):IRes<IData> => axiosService.get(`${urls.allmovies}?page=${page}`),
    getVideo: (id: number) :IRes<IVideosData> => axiosService.get(`${urls.movie}/${id}/videos`),
    getFilteredMovies: (query: string):IRes<IData> => axiosService.get(`${urls.allmovies}${query}`),
    getPopularMovies: ():IRes<IData> => axiosService.get(`${urls.movie}/popular`),
    getTopRatedMovies: ():IRes<IData> => axiosService.get(`${urls.movie}/top_rated`),
    getNowPlayingMovies: ():IRes<IData> => axiosService.get(`${urls.movie}/now_playing`),
    getUpcomingMovies: ():IRes<IData> => axiosService.get(`${urls.movie}/upcoming`),
    getRecommendMovies: (id: number):IRes<IData> => axiosService.get(`${urls.movie}/${id}/recommendations`),
    getReviews: (id: number): IRes<IReviewsData> => axiosService.get(`${urls.movie}/${id}/reviews`)
}

export {
    movieService
}