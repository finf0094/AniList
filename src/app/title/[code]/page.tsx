'use client'

import { useGetAnimeQuery } from "@/app/store/anime/anime.api"
import { Box, Button, Container, Grid, Image, Loader, Modal, Text, Title, useDisclosure } from "@/components"
import { Metadata } from "next"
import ReactPlayer from "react-player"
import { useState } from 'react'


type Props = {
    params: {
        code: string
    }
}

const quality = ['sd', 'hd', 'fhd'];

const Code: React.FC<Props> = ({ params: { code } }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const { data, isLoading, error } = useGetAnimeQuery(code);
    const [episode, setEpisode] = useState<number>(1);
    const [selectedQuality, setSelectedQuality] = useState<string>('hd');


    if (isLoading) {
        return <Container sx={{ alignItems: "center", justifyContent: 'center', margin: "0 auto", textAlign: 'center' }}>
            <Loader
                color="pink"
                variant="bars"
                sx={{ fontSize: "3rem", margin: "0 auto" }}
            />
        </Container>
    }

    if (error) {
        return <Container>
            <Title order={1} color="pink" sx={{ margin: "0 auto", textAlign: 'center' }}>OOPS, Что-то пошло не так !!!</Title>
            <Image src='/images/anime-girl-nobg.png' width={300} alt="animeGirl" sx={{ textAlign: 'center', margin: "0 auto" }} />
        </Container>
    }


    return (
        <>
            <Modal opened={opened} onClose={close} title="Описание">
                <Text size="xs">{data?.description}</Text>
            </Modal>
            <Container>
                <Grid>
                    <Grid.Col span={3}>
                        <Image
                            radius="md"
                            src={`https://api.litelibria.com/posters/${data?.id}.webp`}
                            height={400}
                            alt={data?.code}
                        />
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <Box>
                            <Title order={3}>{data?.names.ru}</Title>
                            <Text
                                w={600}
                                size='xs'
                                color="gray.6"
                                sx={{
                                    maxWidth: '100%',
                                    maxHeight: 150,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 10, // Adjust the line clamp value as needed
                                    WebkitBoxOrient: 'vertical',
                                    cursor: 'crosshair',
                                }}
                                onClick={open}
                            >
                                {data?.description}
                            </Text>

                            <Box sx={{ display: "flex", alignItems: 'center' }}>
                                <Text color="white" size='md' weight='600'>Статус: </Text>
                                <Text color="gray.6" size='md'>{data?.status.string}</Text>
                            </Box>
                        </Box>
                    </Grid.Col>
                </Grid>

                <Container size="xs">
                    {data && data.player.episodes.last && (
                        Array.from({ length: data.player.episodes.last }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => setEpisode(index + 1)} // Эпизоды начинаются с 1
                                style={{
                                    background: episode === index + 1 ? "pink" : "transparent",
                                    border: "1px solid pink",
                                    borderRadius: "5px",
                                    padding: "5px 10px",
                                    margin: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Эпизод {index + 1}
                            </button>
                        ))
                    )}

                    {quality.map((item, index) => (
                        <Button
                            key={index}
                            variant="default"
                            onClick={() => setSelectedQuality(item)}
                            bg={selectedQuality === item ? "pink" : "transparent"}
                        >
                            {item}
                        </Button>
                    ))}

                </Container>

                <ReactPlayer
                    url={`http://${data?.player.host}/${data?.player?.list[episode]?.hls?.[selectedQuality]}`}
                    controls
                    width="100%"
                    height="auto"
                />
            </Container>
        </>
    )
}
    
export default Code;