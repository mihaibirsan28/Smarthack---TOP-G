import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Popup, Rectangle } from 'react-leaflet';
import {useMutation, useQuery} from "react-query";
import {deleteAdminLocation, fetchAdminLocation} from "../api/general.api";
import { Card, Container, Group, Loader, Button } from "@mantine/core";

export const MapAdminVisualiserComponent: React.FC<any> = () => {
    const { isLoading, data, refetch } = useQuery('admin-locations', fetchAdminLocation)
    const { mutate, isLoading: loadable } = useMutation(deleteAdminLocation, {
        onSuccess: data => {
            refetch()
            console.log(data)
        }
    })

    const [userLongitude, setUserLongitude] = React.useState<number>(0);
    const [userLatitude, setUserLatitude] = React.useState<number>(0);

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setUserLongitude(pos.coords.longitude);
            setUserLatitude(pos.coords.latitude);
        }, () => {
            setUserLongitude(0);
            setUserLatitude(0);
        })
    }, []);

    const deleteTheZone = (ID: any) => {
        mutate({id: ID});
    }

    if (isLoading) {
        return (
            <Container>
                <Card shadow="sm" p="lg" radius="md" withBorder style={{padding: "2.5rem"}}>
                    <Group position="center" mb="xs">
                        <Loader />
                    </Group>
                </Card>
            </Container>
        )
    }

    return (
        <>
        {
            userLongitude && userLatitude && data?.data.length !== undefined &&
            <Container>
                <Card shadow="sm" p="lg" radius="md" withBorder style={{padding: "2.5rem"}}>
                    <Card.Section>
                        <MapContainer center={({lng: userLongitude, lat: userLatitude})} zoom={25}
                                      scrollWheelZoom={false}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {
                                Object.values(data?.data).map((d: any, i: number) => {
                                    let arr = [];
                                    for (let i = 0; i < d.Coordonates.length; i++) {
                                        arr.push(d.Coordonates[i])
                                    }

                                    return (
                                        <React.Fragment key={i}>
                                            <Rectangle pathOptions={{
                                                opacity: 0,
                                                fillColor: 'black',
                                                fillOpacity: 100
                                            }} bounds={arr}>
                                                <Popup>
                                                    <Button onClick={() => deleteTheZone(d.ID)} variant="light" color="blue" fullWidth mt="md" radius="md">
                                                        Delete the zone
                                                    </Button>
                                                </Popup>
                                            </Rectangle>
                                        </React.Fragment>
                                    );
                                })
                            }
                        </MapContainer>
                    </Card.Section>
                </Card>
            </Container>
        }
        </>
    );
}