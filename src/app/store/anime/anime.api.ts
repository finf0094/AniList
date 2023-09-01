import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IAnime, ISearchRoot, Root, RootSchedule } from './anime.types'

export const ANILIBRIA_API_URL = "https://api.anilibria.tv/v3.0"

export const animeApi = createApi({
  reducerPath: 'animeApi',
  baseQuery: fetchBaseQuery({ baseUrl: ANILIBRIA_API_URL }),
  endpoints: (builder) => ({
    getAnimes: builder.query<Root, string>({
      query: () => `/title/updates?filter=id,code,names.ru,genres,type.episodes,status.code,player.episodes,posters&limit=36`,
    }),
    getAnime: builder.query<IAnime, string>({
      query: (code) => `/title?code=${code}`
    }),
    searchAnime: builder.query<ISearchRoot | undefined, string>({
      query: (animeName) =>  `/title/search?search=${animeName}&filter=id,names,genres,code,posters&limit=5`
    }),
    sheduleAnimes: builder.query<RootSchedule[], string>({
      query: () => `/title/schedule?filter=id,code,names.ru,genres,type.episodes,status.code,player.episodes,posters`
    })
  }),
})

export const { useGetAnimesQuery, useGetAnimeQuery, useSearchAnimeQuery, useSheduleAnimesQuery } = animeApi