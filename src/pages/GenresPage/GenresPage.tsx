import React from 'react';
import {useAppSelector} from "../../hooks";
import Container from "../../Layouts/container/Container";

const GenresPage = () => {
    const {genres} = useAppSelector(state => state.genreReducer)
    console.log(genres)
    const onGenreClick = (id: number): void => {
        console.log(id)
    };
    return (
        <Container>
            <ul>
                {genres && genres.map(item => <li onClick={()=> onGenreClick(item.id)} key={item.id}>{item.name}</li>)}
            </ul>
        </Container>
    );
};

export default GenresPage;