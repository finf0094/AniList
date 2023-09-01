'use client'
import { useMemo } from 'react'

import { Grid, Loader } from ".";
import { useGetAnimesQuery } from "../store/anime/anime.api"
import AnimeCard from "./AnimeCard";
import Link from 'next/link';

const AnimeList = () => {
    const { data, isLoading } = useGetAnimesQuery("");

    return (
        <Grid gutterXl={50}>
            {isLoading ? (
                <Loader
                    color="pink"
                    variant="bars"
                    sx={{ fontSize: "3rem", margin: "0 auto" }}
                />
            ) : null}
            {data?.list.map((anime) => (
                <Grid.Col key={anime.id} span={4}>
                    <Link href={`/title/${anime.code}`} style={{textDecoration: "none"}}>
                        <AnimeCard key={anime.id} data={anime} />
                    </Link>
                </Grid.Col>
            ))}
        </Grid>
    );
}

export default AnimeList;