import {urls} from "../constants";
import { IRes } from "../types";
import {axiosService} from "./axios.service";
import {IData} from "../interfaces";
const searchService = {
    searchMovies: (query:string, page:number):IRes<IData> => axiosService.get(`${urls.searchMovies}?query=${query}&page=${page}`)
}
export {
    searchService
}