import { Container, Divider, Image, Title } from './components';
import AnimeList from './components/AnimeList';
import { BsChevronDoubleDown } from '@react-icons/all-files/bs/BsChevronDoubleDown'


export default function Home() {


  return (
    <main >
      <Container size="100rem" px="xs">

        <Image alt="pink girl" src="/images/divider.png" width='300px' sx={{textAlign: 'center', margin: '0 auto'}} className='falling-text'/>
        <Divider color='pink' sx={{textAlign: 'center', margin: "0 auto"}} w='500px' size='sm' className='falling-text'/>

        <Title order={1} size={50} sx={{ textAlign: "center", transition: "all 0.5 ease-out" }} className='falling-text'>ДОБРО ПОЖАЛОВАТЬ В МИР АНИМЕ</Title>
        <Title order={3} color='gray.8' fw={400} sx={{ textAlign: "center", }} className='falling-text' mt="xs">Лучшие аниме сериалы и фильмы ждут тебя !</Title>
      </Container>

      <Container size="lg" px="xs" sx={{textAlign: "center"}} mt='lg'>
        <BsChevronDoubleDown style={{ fontSize: "3rem" }}  />
      </Container>

      <Container size='lg' px="xs" sx={{ marginTop: "5rem" }}>
        <AnimeList key={1}/>
      </Container>

    </main>
  )
}
