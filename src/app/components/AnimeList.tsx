'use client'
import { useMemo } from 'react'

import { Grid, Loader } from ".";
import { useGetAnimesQuery } from "../store/anime/anime.api"
import AnimeCard from "./AnimeCard";
import Link from 'next/link';
import ErrorComponent from './ErrorComponent';

const AnimeList = () => {
    const { data, isLoading, error } = useGetAnimesQuery("");

    if (isLoading) {
        <Loader
            color="pink"
            variant="bars"
            sx={{ fontSize: "3rem", margin: "0 auto" }}
        />
    }

    if (error) {
        <ErrorComponent />
    }

    return (
        <Grid gutterXl={30}>
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