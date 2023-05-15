import {IMovie} from "./movie.interface";

export interface IData  {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_result: number;
}