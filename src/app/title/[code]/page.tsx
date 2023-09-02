'use client'

import { useGetAnimeQuery } from "@/app/store/anime/anime.api"
import { Box, Button, Container, Grid, Image, Loader, Modal, Text, Title, useDisclosure } from "@/components"
import ReactPlayer from "react-player"
import { useState } from 'react'
import ErrorComponent from "@/app/components/ErrorComponent"
import ModalComponent from "@/app/components/ModalComponent"


type Props = {
    params: {
        code: string
    }
}

const quality = ['sd', 'hd', 'fhd'];

const Code: React.FC<Props> = ({ params: { code } }) => {
    const [isDescModalOpen, { open: descModalOpen, close: descModalClose }] = useDisclosure(false);
    const [isPosterModalOpen, { open: posterModalOpen, close: posterModalClose }] = useDisclosure(false);
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
        <ErrorComponent />
    }


    return (
        <>
            <ModalComponent data={<Text size='xs'>{data?.description}</Text>} isOpen={isDescModalOpen} onClose={descModalClose} title="Описание" />
            <ModalComponent data={<Image
                radius="lg"
                src={`https://api.litelibria.com/posters/${data?.id}.webp`}
                height={200}
                width={150}
                withPlaceholder
                alt={data?.code}
            />} isOpen={isPosterModalOpen} onClose={posterModalClose} title="Poster" />

            <Container>
                <Grid>
                    <Grid.Col span={3} xs={4} >
                        <Image
                            radius="lg"
                            src={`https://api.litelibria.com/posters/${data?.id}.webp`}
                            sx={{
                                maxHeight: 400,
                            }}
                            alt={data?.code}
                            withPlaceholder
                            onClick={posterModalOpen}
                        />
                    </Grid.Col>
                    <Grid.Col span={8} xs={8}>
                        <Box>
                            <Title order={3} sx={{
                                maxHeight: 65, overflow: "hidden", whiteSpace: "break-spaces", textOverflow: 'ellipsis'
                            }}>{data?.names.ru}</Title>
                            <Text
                                w={600}
                                size='xs'
                                color="gray.6"
                                sx={{
                                    maxWidth: '100%',
                                    maxHeight: "90px",
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 10, // Adjust the line clamp value as needed
                                    WebkitBoxOrient: 'vertical',
                                    cursor: 'crosshair',
                                    whiteSpace: "break-spaces"
                                }}
                                onClick={descModalOpen}
                            >
                                {data?.description}
                            </Text>

                            <Box sx={{ display: "flex", alignItems: 'center' }} mt='xs'>
                                <Text color="white" size='md' weight='600'>Статус: </Text>
                                <Text color="gray.6" size='md'>{data?.status.string}</Text>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: 'center', overflow: "hidden", textOverflow: 'ellipsis', whiteSpace: 'nowrap', }} mt='xs'>
                                <Text color="white" size='md' weight='600'>Жанры: </Text>
                                {data?.genres.map((item, ind) => <Text color="gray.6" size='md' key={ind}>{item}{ind !== data.genres.length - 1 ? ', ' : ' '} </Text>)}
                            </Box>
                        </Box>
                    </Grid.Col>
                </Grid>



                <ReactPlayer
                    url={`https://${data?.player.host}/${data?.player?.list[episode]?.hls?.[selectedQuality]}`}
                    controls
                    width="100%"
                    height="auto"
                    style={{ marginTop: "3rem", borderRadius: 15, overflow: "hidden" }}
                />
                <Container size="xs" mt='lg'>
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
            </Container>
        </>
    )
}

export default Code;