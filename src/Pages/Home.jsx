import { Image } from "antd";
import Navbar from "../Components/Navbar";
import { Center, Text, Divider } from "@mantine/core";
import SpecimenImg from '../Images/Specimen.svg'
import Admin from "../Components/Admin";




const Home = () => {

    return (
        <>
            <Navbar />
            <Center>
                <Image
                    src={SpecimenImg}
                    alt="Speciment Image"
                    width={150}
                />
            </Center>
            <Center mt={'sm'} mb={'md'}>
                <Text size="lg" td="underline" c="dimmed">This is only a specimen purpose!</Text>
            </Center>
            <Divider my="xs" label="Below item is to get your booking site details." labelPosition="center" />
            <Admin />
        </>
    )
}

export default Home;