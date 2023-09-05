'use client'

import { useGetAnimeQuery } from "@/app/redux/anime/anime.api"
import { Box, Button, Container, Grid, Image, Loader, Modal, Text, Title, useDisclosure } from "@/components"
import ReactPlayer from "react-player"
import { useEffect, useState, useRef } from 'react'
import ErrorComponent from "@/app/components/ErrorComponent"
import ModalComponent from "@/app/components/ModalComponent"
import Head from "next/head"


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
    const [episodePositions, setEpisodePositions] = useState<{ [key: string]: number }>({});

    // Создаем ref для ReactPlayer
    const playerRef = useRef<ReactPlayer | null>(null);

    useEffect(() => {
        // При загрузке компонента, попробуйте получить сохраненные позиции из localStorage
        const savedPositions = localStorage.getItem(`episodePositions_${code}`);
        if (savedPositions) {
            setEpisodePositions(JSON.parse(savedPositions));
        }
    }, [code]);

    // Обработчик изменения позиции видео
    const handleProgress = (state: any) => {
        // Копируем текущее состояние позиций
        const newPositions = { ...episodePositions };
        // Сохраняем текущую позицию видео в новые позиции
        newPositions[episode] = state.playedSeconds;
        // Обновляем состояние позиций
        setEpisodePositions(newPositions);
        // Сохраняем новые позиции в localStorage
        localStorage.setItem(`episodePositions_${code}`, JSON.stringify(newPositions));
    };



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
            <Head>
                {/* Add your metadata here */}
                <title>Your Page Title</title>
                <meta name="description" content="Your page description" />
                {/* Add other metadata tags as needed */}
            </Head>
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
                    <Grid.Col xs={5} md={3} sm={3}>
                        <Image
                            radius="lg"
                            src={`https://api.litelibria.com/posters/${data?.id}.webp`}
                            sx={{
                                maxHeight: 400,
                                "@media screen and (max-width: 360px)": {
                                    maxWidth: "250px",
                                    margin: "0 auto"// Adjust the font size for smaller screens (e.g., mobile phones)
                                },
                                "@media screen and (max-width: 600px)": {
                                    maxWidth: "250px",
                                    margin: "0 auto"// Adjust the font size for smaller screens (e.g., mobile phones)
                                },

                            }}
                            alt={data?.code}
                            withPlaceholder
                            onClick={posterModalOpen}
                        />
                    </Grid.Col>
                    <Grid.Col xs={7} md={8} sm={9}>
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
                    ref={(ref) => (playerRef.current = ref)} // Привязываем ref к ReactPlayer
                    url={`https://${data?.player.host}/${data?.player?.list[episode]?.hls?.[selectedQuality]}`}
                    controls
                    width="100%"
                    height="auto"
                    style={{ marginTop: "3rem", borderRadius: 15, overflow: "hidden" }}
                    onProgress={handleProgress}
                    // Устанавливаем начальную позицию видео для выбранной серии, если она сохранена
                    playing={episodePositions[episode] !== undefined}
                    onReady={() => {
                        // Когда видео готово к воспроизведению, устанавливаем позицию
                        if (episodePositions[episode] !== undefined && playerRef.current) {
                            playerRef.current.seekTo(episodePositions[episode]);
                        }
                    }}
                />

                <Container size="xs" mt='lg'>

                    <Box>
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
                    </Box>

                    {data && data.player.episodes.last && (
                        Array.from({ length: data.player.episodes.last }, (_, index) => (
                            <Button
                                key={index}
                                onClick={() => setEpisode(index + 1)} // Эпизоды начинаются с 1
                                sx={{
                                    background: episode === index + 1 ? "pink" : "transparent",
                                    border: "1px solid pink",
                                    borderRadius: "5px",
                                    padding: "5px 10px",
                                    margin: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                Эпизод {index + 1}
                            </Button>
                        ))
                    )}


                </Container>
            </Container>
        </>
    )
}

export default Code;    