import { Box, Button, Grid, Group, Skeleton, Text, rem } from '@mantine/core';
import { Card, Empty, Popconfirm, message } from 'antd';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';





const Admin = () => {
    const [BookedDetails, SetBookedDetails] = useState([]);
    const [Loading, SetLoading] = useState(true);

    const GetBookedDetails = async () => {
        const res = await fetch('/get/booking-site-details', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
        });
        const Result = await res.json();
        if (res.status === 200) {
            SetBookedDetails(Result.BookedDetails);
            SetLoading(false)
            return;
        } else {
            return
        }
    }

    const Delete_Booking = async (e) => {
        const res = await fetch("/delete/booked-site-details/" + e, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        if (res.status === 200) {
            message.success("Successfully Deletd.");
            GetBookedDetails()
            return;
        }
        else {
            message.error("oops! something went wrong");
            return
        }
    }
    const confirm = (e) => {
        Delete_Booking(e)
    };
    const cancel = () => {
        return
    };

    useEffect(() => {
        const GetBookedDetails = async () => {
            const res = await fetch('/get/booking-site-details', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
            });
            const Result = await res.json();
            if (res.status === 200) {
                SetBookedDetails(Result.BookedDetails);
                SetLoading(false)
                return;
            } else {
                return
            }
        }
        GetBookedDetails()

    }, [BookedDetails, Loading])
    return (
        <>
            <Grid mt={'md'} style={{ overflow: 'hidden' }}>
                {
                    BookedDetails.length ? BookedDetails.map((ele, idx) => {

                        return (
                            <Grid.Col span={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={idx}>
                                <Skeleton visible={Loading}>
                                    <Card
                                        title="Site Visit Details"
                                        bordered={false}
                                        style={{
                                            "box-shadow": "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                                        }}
                                        extra={
                                            <Popconfirm
                                                title="Delete this booking"
                                                description="Are you sure to delete this booking?"
                                                onConfirm={() => confirm(ele._id)}
                                                onCancel={cancel}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button variant='light' color='red' rightSection={<DeleteIcon style={{ width: rem(14), height: rem(14) }} />}>Delete</Button>
                                            </Popconfirm>
                                        }
                                    >
                                        <Group justify='space-between'>
                                            <Text size="sm">Date.: {ele.Date}</Text>
                                            <Text size="sm">Time.: {ele.Time}</Text>
                                        </Group>
                                        <Box mt={'sm'}>
                                            <Text size="md">Visit type.: {ele.Visit_Type}</Text>
                                            <Text size="md" mt={'xs'}>Total number of person(s).: {ele.Total_Number_Of_Persons}</Text>
                                            <Text size="md" mt={'xs'}>Leader name.: {ele.Leader}</Text>
                                            <Text size="md" mt={'xs'}>Associate name.: {ele.Associate}</Text>
                                            <Text size="md" mt={'xs'}>Mobile number.: {ele.MobileNumber}</Text>
                                            <Text size="md" mt={'xs'}>Pick-up location.: {ele.PickUp_Location}</Text>
                                            <Text size="md" mt={'xs'}>Client details.:{ele.Client_Details} </Text>
                                            <Text size="md" mt={'xs'}>Total numbers of male.: {ele.Total_number_Of_Male}</Text>
                                            <Text size="md" mt={'xs'}>Total numbers of female.: {ele.Total_number_Of_Female}</Text>
                                            <Text size="md" mt={'xs'}>Vehical detail.: {ele.Vehical_Details}</Text>
                                            <Text size="md" mt={'xs'}>Traveller detail.: {ele.Traveller_Details}</Text>
                                        </Box>
                                    </Card>
                                </Skeleton>
                            </Grid.Col>

                        )
                    }) : <div style={{ display: 'flex', margin: 'auto' }}><Empty /></div>
                }
            </Grid>

        </>
    )
}

export default Admin