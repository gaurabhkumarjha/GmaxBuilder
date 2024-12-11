import {
    Box,
    Burger,
    Button,
    Divider,
    Drawer,
    Group,
    ScrollArea,
    rem,
    Modal,
    Fieldset, TextInput, NativeSelect
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Image, DatePicker, TimePicker, message } from 'antd';
import TourTwoToneIcon from '@mui/icons-material/TourTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import HandshakeIcon from '@mui/icons-material/Handshake';
import HelpIcon from '@mui/icons-material/Help';
import './Navbar.css';
import Gmaxlogo from '../Images/NewGmaxlogo.jpeg'
import dayjs from 'dayjs';
import { useState } from 'react';


const Navbar = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [opened, { open, close }] = useDisclosure(false);
    const[Loading, Setloading]= useState(false);
    const [Inputs, SetInputs] = useState({
        VisitDate: '',
        VisitTime: '',
        VisitType: '',
        TotalNumberOfPersons: '',
        LeaderName: '',
        AssociateName: '',
        MobileNumber: '',
        PickUpLocation: '',
        ClientDetails: '',
        TotalNumberOfMales: '',
        TotalNumberOfFemales: '',
        VehicalDetails: '',
        TravellerDetails: '',
    })
    const InputOnchange = (e) => {
        const { name, value } = e.target;
        SetInputs({ ...Inputs, [name]: value })
    }
    const InputHandelForDate = (date) => {
        SetInputs({ ...Inputs, VisitDate: date });
    };
    const InputHandelForTime = (time) => {
        SetInputs({ ...Inputs, VisitTime: time });
    };

    const SubmitDetails = async () => {
        const { VisitDate, VisitTime, VisitType, TotalNumberOfPersons, LeaderName, AssociateName, MobileNumber, PickUpLocation, ClientDetails, TotalNumberOfMales, TotalNumberOfFemales, VehicalDetails, TravellerDetails } = Inputs

        if (VisitDate === "" || VisitTime === "" || VisitType === "" || TotalNumberOfPersons === "" || LeaderName === "" || AssociateName === "" || MobileNumber === "" || PickUpLocation === "" || ClientDetails === "" || TotalNumberOfMales === "" || TotalNumberOfFemales === "" || VehicalDetails === "" || TravellerDetails === "") {
            messageApi.error("Please enter all detail's");
            return;
        }
        if (MobileNumber.length < 10 || MobileNumber.length > 10) {
            messageApi.error("Please enter 10 digit valid mobile number");
            return;
        }
        const VisiterDate = dayjs(VisitDate).format('DD-MM-YYYY'); // for input.
        const VisiterTime = dayjs(VisitTime).format('hh:mm:ss:A'); // for input.
        Setloading(true);

        const res = await fetch('/add/booking-site-details', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                VisiterDate, VisiterTime, VisitType, TotalNumberOfPersons, LeaderName, AssociateName, MobileNumber, PickUpLocation, ClientDetails, TotalNumberOfMales, TotalNumberOfFemales, VehicalDetails, TravellerDetails
            })
        });

        if (res.status === 201) {
            messageApi.success("Details saved into your database");
            Setloading(false)
            SetInputs({
                VisitDate: '',
                VisitTime: '',
                VisitType: '',
                TotalNumberOfPersons: '',
                LeaderName: '',
                AssociateName: '',
                MobileNumber: '',
                PickUpLocation: '',
                ClientDetails: '',
                TotalNumberOfMales: '',
                TotalNumberOfFemales: '',
                VehicalDetails: '',
                TravellerDetails: '',
            })
            close();
            return;
        } else {
            messageApi.error("oops! Something went wrong");
            Setloading(false);
            return
        }
    }

    return (
        <>
            {contextHolder}
            <Modal opened={opened} onClose={close} title="Book A Site Visit">
                <Fieldset legend="All field's are mandatory" variant="filled" radius="md">
                    <span style={{ fontSize: '0.9rem' }}>Please select date & time</span>
                    <Group>
                        <DatePicker required name='VisitDate' value={Inputs.VisitDate} onChange={InputHandelForDate} />
                        <TimePicker use12Hours format="h:mm:ss A" required name='VisitTime' value={Inputs.VisitTime} onChange={InputHandelForTime} />
                    </Group>
                    <NativeSelect label="Visit type" data={['-- select --', 'Same Day', 'Stay']} mt={'sm'} withAsterisk name='VisitType' value={Inputs.VisitType} onChange={InputOnchange} required />

                    <TextInput label="Total number of person(s)" placeholder="e.g. 4" mt="sm" withAsterisk name='TotalNumberOfPersons' value={Inputs.TotalNumberOfPersons} onChange={InputOnchange} required />

                    <TextInput label="Leader name" placeholder="e.g. Rahul" mt="sm" withAsterisk name='LeaderName' value={Inputs.LeaderName} onChange={InputOnchange} required />

                    <TextInput label="Associate name" placeholder="e.g. Rahul" mt="sm" withAsterisk name='AssociateName' value={Inputs.AssociateName} onChange={InputOnchange} required />

                    <TextInput label="10 digit mobile number" placeholder="e.g. 1234567899" mt="sm" withAsterisk name='MobileNumber' value={Inputs.MobileNumber} onChange={InputOnchange} required />

                    <TextInput label="Pick up location" placeholder="e.g. New Delhi NSP" mt="sm" withAsterisk name='PickUpLocation' value={Inputs.PickUpLocation} onChange={InputOnchange} required />

                    <NativeSelect label="Client details" data={['-- select --', 'Husband, Wife and Child', 'Husband and Wife', 'Family', 'Friends', '1 Associate', '2 Associate', '2+ Associate', 'Other(s)']} mt={'sm'} withAsterisk name='ClientDetails' value={Inputs.ClientDetails} onChange={InputOnchange} required />

                    <Group justify='space-between' mt="sm">
                        <TextInput label="Total number of male" placeholder="e.g. 4" style={{ width: '35%' }} withAsterisk name='TotalNumberOfMales' value={Inputs.TotalNumberOfMales} onChange={InputOnchange} required />

                        <TextInput label="Total number of female" placeholder="e.g. 2" style={{ width: '35%' }} withAsterisk name='TotalNumberOfFemales' value={Inputs.TotalNumberOfFemales} onChange={InputOnchange} required />
                    </Group>

                    <NativeSelect label="Vehical detail" data={['-- select --', 'Eritga', 'Swift', 'Traveller', 'Personal']} mt={'sm'} withAsterisk name='VehicalDetails' value={Inputs.VehicalDetails} onChange={InputOnchange} required />

                    <NativeSelect label="Traveller detail" data={['-- select --', 'Traveller', 'Personal', 'Personal piad']} mt={'sm'} withAsterisk name='TravellerDetails' value={Inputs.TravellerDetails} onChange={InputOnchange} required />
                </Fieldset>
                <Button mt={'md'} variant='filled' color='teal' fullWidth onClick={SubmitDetails} disabled={Loading} loading={Loading}>Submit Detail's</Button>
            </Modal>
            <Box pb={120}>
                <header className="header">
                    <Group justify="space-between" h="100%">
                        <Image
                            style={{ borderRadius: '20px', margin: '2px' }}
                            width={60}
                            src={Gmaxlogo}
                            alt='GMAX LOGO'

                        />
                        <Group h="100%" gap={0} visibleFrom="sm">
                            <a href="/" className="link">
                                Home<span><HomeIcon style={{ width: rem(14), height: rem(14) }} /></span>
                            </a>
                            <a href="/" className="link" >
                                About us <span><GroupsIcon style={{ width: rem(14), height: rem(14) }} /></span>
                            </a>
                            <a href="/" className="link">
                                Join us <span><HandshakeIcon style={{ width: rem(14), height: rem(14) }} /></span>
                            </a>
                            <a href="/" className="link">
                                Contact us <span><HelpIcon style={{ width: rem(14), height: rem(14) }} /></span>
                            </a>
                        </Group>

                        <Group visibleFrom="sm">
                            <Button variant="default">Log in</Button>
                            <Button color='rgba(114, 30, 250, 1)' rightSection={<TourTwoToneIcon style={{ width: rem(14), height: rem(14) }} />} onClick={open}>Book Site Visit</Button>
                        </Group>

                        <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                    </Group>
                </header>

                <Drawer
                    opened={drawerOpened}
                    onClose={closeDrawer}
                    size="100%"
                    padding="md"
                    title="Navigation"
                    hiddenFrom="sm"
                    zIndex={1000000}
                >
                    <ScrollArea h="calc(100vh - 80px" mx="-md">
                        <Divider my="sm" />

                        <a href="/" className="link">
                            Home
                        </a>
                        <a href="/" className="link" >
                            About us
                        </a>
                        <a href="/" className="link">
                            Join us
                        </a>
                        <a href="/" className="link">
                            Contact us
                        </a>

                        <Divider my="sm" />

                        <Group justify="center" grow pb="xl" px="md">
                            <Button variant="default">Log in</Button>
                            <Button color='rgba(114, 30, 250, 1)' rightSection={<TourTwoToneIcon style={{ width: rem(14), height: rem(14) }} />} onClick={open}>Book Site Visit</Button>
                        </Group>
                    </ScrollArea>
                </Drawer>
            </Box>
        </>
    );
}


export default Navbar;