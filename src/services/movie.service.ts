import {axiosService} from "./axios.service";
import {IRes} from "../types";
import {urls} from "../constants";
import {IData} from "../interfaces";
import {IVideosData} from "../interfaces";


const movieService = {
    getAll: (page:number = 1):IRes<IData> => axiosService.get(`${urls.allmovies}?page=${page}`),
    getVideo: (id: number) :IRes<IVideosData> => axiosService.get(`${urls.movie}/${id}/videos`)
}

export {
    movieService
}