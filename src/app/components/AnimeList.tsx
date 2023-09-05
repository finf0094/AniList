'use client'

import { Center, Grid, Loader } from ".";
import { useGetAnimesQuery } from "../redux/anime/anime.api";
import AnimeCard from "./AnimeCard";
import Link from 'next/link';
import ErrorComponent from './ErrorComponent';

const AnimeList = () => {
    const { data, isLoading, error } = useGetAnimesQuery("");

    if (isLoading) {
        return (
            <Center mx='auto'>
                <Loader
                    color="pink"
                    variant="bars"
                    sx={{ fontSize: "3rem", margin: "0 auto" }}
                />
            </Center>
        )
    }

    if (error) {
        return <ErrorComponent />
    }

    return (
        <Grid>
            {data?.list.map((anime) => (
                <Grid.Col key={anime.id} xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Link href={`/title/${anime.code}`} style={{ textDecoration: "none" }}>
                        <AnimeCard key={anime.id} data={anime} />
                    </Link>
                </Grid.Col>
            ))}
        </Grid>
    );
}

export default AnimeList;