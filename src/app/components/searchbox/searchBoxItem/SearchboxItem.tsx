import { forwardRef } from 'react';
import { Group, Avatar, Text, SelectItemProps, Box, Flex } from '@/components';
import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight'

interface ItemProps extends SelectItemProps {
  animeId: number
  genres: string[]
  code: string
  posters: { small: { url: string } }
}

const SearchboxItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ animeId, code, value, posters: { small: { url } }, genres, ...others }: ItemProps, ref) => (
      <Flex ref={ref} {...others} justify="space-between" align="center">
        <Group noWrap>
          <Avatar src={`https://api.litelibria.com/posters/${animeId}.webp`} />
          <div>
            <Text sx={{ maxWidth: 90, maxHeight: 40, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{value}</Text>
            <Box color="dimmed" sx={{ maxHeight: 40, maxWidth: 90, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              {genres.map((genre, ind) => (
                <Text key={ind} color='pink'>{genre}, </Text>
              ))}
            </Box>
          </div>
        </Group>
        <FiChevronRight style={{ fontSize: "1.4rem" }} />
      </Flex>
  )
);

SearchboxItem.displayName = 'AutoCompleteItem';

export default SearchboxItem;
