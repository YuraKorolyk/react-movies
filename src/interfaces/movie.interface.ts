export interface IMovie {
    genre_ids: number[];
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
}