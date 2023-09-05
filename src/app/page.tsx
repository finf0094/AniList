import { Container, Divider, Image, Title, Text, Center } from './components';
import AnimeList from './components/AnimeList';
import { BsChevronDoubleDown } from '@react-icons/all-files/bs/BsChevronDoubleDown'



export default function Home() {

  return (
    <main>
      <Container size="100rem" px="xs">

        <Image alt="pink girl" src="/images/divider.png" sx={{
          textAlign: 'center',
          margin: '0 auto',
          maxWidth: "400px",
          transition: "all 0.5s ease-out",
          "@media screen and (max-width: 600px)": {
            maxWidth: "200px", // Adjust the font size for smaller screens (e.g., mobile phones)
          },
          "@media screen and (min-width: 1441px)": {
            maxWidth: "500px", // Adjust the font size for extra-large screens (e.g., large desktops)
          },
        }} className='falling-text' />
        <Divider color='pink' sx={{ textAlign: 'center', margin: "0 auto", maxWidth: 500 }} size='sm' className='falling-text' />


        <Title
          order={1}
          size={50} // Adjust the default size here
          sx={{
            textAlign: "center",
            transition: "all 0.5s ease-out",
            "@media screen and (max-width: 600px)": {
              fontSize: "25px", // Adjust the font size for smaller screens (e.g., mobile phones)
            },
            "@media screen and (min-width: 601px) and (max-width: 1024px)": {
              fontSize: "35px", // Adjust the font size for tablets
            },
            "@media screen and (min-width: 1025px) and (max-width: 1440px)": {
              fontSize: "45px", // Adjust the font size for larger screens (e.g., desktops)
            },
            "@media screen and (min-width: 1441px)": {
              fontSize: "55px", // Adjust the font size for extra-large screens (e.g., large desktops)
            },
          }}
          className='falling-text'
        >
          ДОБРО ПОЖАЛОВАТЬ В МИР АНИМЕ
        </Title>
        <Title
          order={3}
          color='gray.8'
          fw={400}
          sx={{
            textAlign: "center",
            "@media screen and (max-width: 600px)": {
              fontSize: "18px", // Adjust the font size for smaller screens (e.g., mobile phones)
            },
            "@media screen and (min-width: 601px) and (max-width: 1024px)": {
              fontSize: "25px", // Adjust the font size for tablets
            },
            "@media screen and (min-width: 1025px) and (max-width: 1440px)": {
              fontSize: "35px", // Adjust the font size for larger screens (e.g., desktops)
            },
            "@media screen and (min-width: 1441px)": {
              fontSize: "45px", // Adjust the font size for extra-large screens (e.g., large desktops)
            },
          }}
          className='falling-text'
          mt="xs"
        >
          Лучшие аниме сериалы и фильмы ждут тебя!
        </Title>
      </Container>

      <Container size="lg" px="xs" sx={{ textAlign: "center" }} mt='lg'>
        <BsChevronDoubleDown style={{ fontSize: "3rem" }} />
      </Container>

      <Center mx='auto' sx={{ marginTop: "5rem", display: 'flex', flexDirection: "column" }}>
        <Title>В разработке...</Title>
        <Text color='gray.7'>Пока можете в разделе списков найти</Text>
      </Center>

    </main>
  )
}
