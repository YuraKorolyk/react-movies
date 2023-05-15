import {axiosService} from "./axios.service";
import {IRes} from "../types";
import {urls} from "../constants";
import {IData} from "../interfaces";


const movieService = {
    getAll: (page:number = 1):IRes<IData> => axiosService.get(`${urls.movie}?page=${page}`),

}

export {
    movieService
}