import { useState } from 'react';

import { Card, Image, Text, Badge, Group } from '@/components';
import { AnimeList } from '../store/anime/anime.types';




const AnimeCard: React.FC<{ data: AnimeList }> = ({ data }) => {


  return (
    <Card shadow="sm" padding="lg" radius="lg" withBorder
      sx={{
        cursor: "crosshair",
        transition: "all 0.2s ease-out",
        ":hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          transform: "translateY(-5px)",
          backdropFilter: "blur(50px)",
          filter: "brightness(75%)"
        }
      }} >

      <Card.Section>
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
        { <Badge color="pink" variant="light" sx={{fontSize: 10, fontWeight: 800}} size='lg'>{data.type.episodes} серий</Badge>}
      </Group>


      <Text variant="light" color="gray.6" mt="md" w={320} sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
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