'use client'
import { useSearchAnimeQuery } from "@/app/store/anime/anime.api";
import { Autocomplete, Image, Loader } from "..";
import SearchboxItem from "./searchBoxItem/SearchboxItem";
import React, { useState } from "react";
import {FaSearch} from '@react-icons/all-files/fa/FaSearch'
import { useRouter } from "next/navigation";




const SearchBox = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const { data: searchResult, isLoading, error } = useSearchAnimeQuery(value);


  const handleChange = (value: string) => setValue(value);

  return (
    <Autocomplete
      value={value}
      icon={<FaSearch />}
      onChange={handleChange}
      rightSection={isLoading ? <Loader variant='dots' size="xs" /> : ""}
      placeholder="Найти аниме"
      data={searchResult?.list.map(item => ({...item, value: `${item.names.ru} ${item.names.en}`, animeId: item.id})) ?? []}
      itemComponent={SearchboxItem}
      nothingFound={<Image alt="gird" src="/images/anime-girl-nobg.png"/>}
      onItemSubmit={(option) => router.push(`/title/${option.code}`)}
    />
  );
}

export default SearchBox;