import { Container } from '@/components'
import React from 'react'
import AnimeList from '../components/AnimeList'


const page = () => {
    return (
        <Container sx={{ marginTop: "5rem" }}>
            <AnimeList key={1} />
        </Container>
    )
}

export default page