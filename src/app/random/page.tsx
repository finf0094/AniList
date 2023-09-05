'use client'

import { useEffect } from 'react';
import { useGetRandomAnimeQuery, animeApi } from '../redux/anime/anime.api';
import { useRouter } from 'next/navigation';
import { Center, Loader } from '@/components';

const Page = () => {
    const router = useRouter();
    const { data, isLoading, isFetching, refetch } = useGetRandomAnimeQuery();
    
    if (isLoading && isFetching) {
        <Center mx='auto'>
                <Loader
                    color="pink"
                    variant="bars"
                    sx={{ fontSize: "3rem", margin: "0 auto" }}
                />
            </Center>
    }


    useEffect(() => {
        if (!isLoading && data) {
            router.push(`/title/${data?.code}`)
            refetch();  
        } 
    }, [data, isLoading, refetch, router])


    return null;
}

export default Page;