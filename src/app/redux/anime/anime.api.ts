  import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
  import { IAnime, IRandomAnime, ISearchRoot, Root, RootSchedule } from './anime.types'

  export const ANILIBRIA_API_URL = "https://api.anilibria.tv/v3"

  export const animeApi = createApi({
    reducerPath: 'animeApi',
    baseQuery: fetchBaseQuery({ baseUrl: ANILIBRIA_API_URL }),
    endpoints: (builder) => ({
      getAnimes: builder.query<Root, string>({
        query: () => `/title/updates?filter=id,code,names.ru,genres,type.episodes,status.code,player.episodes,posters&limit=36&after=72`,
      }),
      getAnime: builder.query<IAnime, string>({
        query: (code) => `/title?code=${code}`
      }),
      searchAnime: builder.query<ISearchRoot, string>({
        query: (animeName) =>  `/title/search?search=${animeName}&filter=id,names,genres,code,posters&limit=5`
      }),
      sheduleAnimes: builder.query<RootSchedule[], string>({
        query: () => `/title/schedule?filter=id,code,names.ru,genres,type.episodes,status.code,player.episodes,posters`
      }),
      getRandomAnime: builder.query<IRandomAnime | null, void>({
        query: () => `/title/random?filter=code`
      })
    }),
  })

  export const { useGetAnimesQuery, useGetAnimeQuery, useSearchAnimeQuery, useSheduleAnimesQuery, useGetRandomAnimeQuery } = animeApi