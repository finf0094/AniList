'use client'
import { useSheduleAnimesQuery } from '@/app/store/anime/anime.api'
import { Container, Title } from '@/components';
import { Carousel } from '@mantine/carousel'
import { useEffect, useState } from 'react'
import Link from 'next/link';
import AnimeCard from '../components/AnimeCard';



const Schedule = () => {
    const { data } = useSheduleAnimesQuery('');
    const [slideSize, setSlideSize] = useState('50%'); 

    useEffect(() => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 750) {
            setSlideSize('20%'); 
        }
    }, [slideSize]);

    const days: any = { 0: "Понедельник", 1: "Вторник", 2: "Среда", 3: "Четверг", 4: "Пятница", 5: "Суббота", 6: "Воскресенье" }

    return (
        <Container>
            {data?.map((anime, ind) => (
                <Container key={ind}>
                    <Title align='center'>{days[anime.day]}</Title>
                    <Carousel mx="auto" height={200} key={ind} slideSize={slideSize} loop slideGap='xs' align='start'>
                        {anime.list.map(anime => (
                            <Carousel.Slide key={anime.id} w='xs' mt='lg'>
                                <Link href={`/title/${anime.code}`} style={{ textDecoration: "none" }}>
                                    <AnimeCard key={anime.id} data={anime} />
                                </Link>
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                </Container>
            ))}
        </Container>
    )
}

export default Schedule;