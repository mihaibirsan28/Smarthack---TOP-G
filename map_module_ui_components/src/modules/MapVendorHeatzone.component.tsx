import React from 'react';
import 'leaflet/dist/leaflet.css';
import {MapContainer, TileLayer, Popup, Rectangle, Circle} from 'react-leaflet';
import {useQuery} from "react-query";
import {fetchAdminLocation, fetchHeatzoneData} from "../api/general.api";
import { Card, Container, Group, Loader, Text } from "@mantine/core";

export const MapVendorHeatzoneComponent: React.FC<any> = () => {
    const { isLoading, data, refetch } = useQuery('admin-locations', fetchAdminLocation)
    const { isLoading: heatZoneLoading, data: dataHeatZone} = useQuery('heatzone-location', fetchHeatzoneData)

    const [userLongitude, setUserLongitude] = React.useState<number>(0);
    const [userLatitude, setUserLatitude] = React.useState<number>(0);
    const [hotzonesData, setHotzonesData] = React.useState(null);

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setUserLongitude(pos.coords.longitude);
            setUserLatitude(pos.coords.latitude);
        }, () => {
            setUserLongitude(0);
            setUserLatitude(0);
        })
    }, []);

    React.useEffect(() => {
        if (dataHeatZone?.data.length !== undefined) {
            let object = {};
            for (let obj of dataHeatZone?.data) {
                obj = JSON.parse(obj);

                if (!object.hasOwnProperty(obj.ID)) {
                    object[obj.ID] = {sum: obj.diff, totalUsers: 1, coords: [obj.latitudeConsumer, obj.longitudeConsumer]}
                } else {
                    object[obj.ID].sum += obj.diff
                    object[obj.ID].totalUsers += 1
                }
            }
            setHotzonesData(object);
        }
    }, [dataHeatZone])

    if (isLoading || heatZoneLoading) {
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
                userLongitude && userLatitude && data?.data.length !== undefined && dataHeatZone?.data.length !== undefined &&
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
                                                </Rectangle>
                                            </React.Fragment>
                                        );
                                    })
                                }
                                {
                                    Object.values(hotzonesData).map((d: any, i: number) => {
                                        return (
                                            <React.Fragment key={i}>
                                                <Circle center={d.coords} pathOptions={{ fillColor: 'red', color: 'red', opacity: 100, fillOpacity: 100 }} radius={10}>
                                                    <Popup>
                                                        <Text>{d.totalUsers} visited this zone. And the time spent here was {d.sum / d.totalUsers}.</Text>
                                                    </Popup>
                                                </Circle>
                                            </React.Fragment>
                                        )
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