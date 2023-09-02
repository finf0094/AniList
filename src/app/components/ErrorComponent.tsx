import { Box, Container, Image, Title } from "@/components";
import Link from "next/link";


const ErrorComponent = () => {
    return <Container sx={{
        margin: "auto",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }}>
        <Title order={1} color="pink" sx={{ margin: "0 auto", textAlign: 'center' }}>OOPS, Что-то пошло не так !!!</Title>
        <Image src='/images/anime-girl-nobg.png' width={300} alt="animeGirl" sx={{ textAlign: 'center', margin: "0 auto" }} />
        <Box sx={{margin: "0 auto", textAlign: "center"}}>
            <Link href="/">Go back to Home</Link>
        </Box>
    </Container>
}

export default ErrorComponent;