import { useState } from 'react';

import { Card, Image, Text, Badge, Group } from '@/components';
import { AnimeList } from '../redux/anime/anime.types';




const AnimeCard: React.FC<{ data: AnimeList }> = ({ data }) => {


  return (
    <Card shadow="sm" padding="lg" radius="lg" withBorder
      className='falling-text'
      sx={{
        cursor: "crosshair",
        transition: "all 0.2s ease-out",
        ":hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transform: "translateY(-5px)",
          backdropFilter: "blur(50px)",
          filter: "brightness(75%)"
        },
        "@media screen and (max-width: 660px)": {
          maxWidth: "300px",
          textAlign: 'center',
          margin: "0 auto" // Adjust the font size for smaller screens (e.g., mobile phones)
        },

      }} >

      <Card.Section >
        <Image
          src={`https://api.litelibria.com/posters/${data.id}.webp`}
          height={400}
          alt={data.code}
        />

      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500} w={200} sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
          {data.names.ru}
        </Text>
        {<Badge color="pink" variant="light" sx={{ fontSize: 10, fontWeight: 800 }} size='lg'>{data.type.episodes} серий</Badge>}
      </Group>


      <Text variant="light" color="gray.6" mt="md" sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: 320 }}>
        {data.genres.map((genre, index) => (
          <span key={genre}>
            {genre}
            {index !== data.genres.length - 1 ? ', ' : ''}
          </span>
        ))}
      </Text>
    </Card >
  );
}

export default AnimeCard;