import {IRes} from "../types";
import {IGenresData} from "../interfaces";
import {axiosService} from "./axios.service";
import {urls} from "../constants";

const genreService = {
    getAll: ():IRes<IGenresData> => axiosService.get(urls.genres)
}
export {
    genreService
}