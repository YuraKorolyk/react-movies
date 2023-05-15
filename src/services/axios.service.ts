import {baseURL} from "../constants";
import axios from "axios";

const axiosService = axios.create({baseURL})

axiosService.interceptors.request.use(config => {
    const access = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNWMxOTFkY2Q0MjBkZmZmNDkyODViNTllZmZmOTRkMyIsInN1YiI6IjY0NTY1NDI1NjA2MjBhMDE1Y2Y1NGRhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jfTgQao1lHMpw4Oe0Twgw6WgHLIuBeHsyse7Kfz0Rxs';
    config.headers.Authorization = `Bearer ${access}`
    return config
})

export {
    axiosService
}