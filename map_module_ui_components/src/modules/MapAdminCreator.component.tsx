import React from 'react';
import 'leaflet/dist/leaflet.css';
import {MapContainer, TileLayer, Marker, Popup, Rectangle} from 'react-leaflet';
import { Card, Container, Group, TextInput, Button, Select, Loader } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useMutation, useQuery } from 'react-query';
import { fetchAdminLocation, createAdminLocation } from '../api/general.api';

export const MapAdminCreatorComponent: React.FC<any> = () => {
    const shops = [{
        value: '1', label: 'Shop A',
    }, {
        value: '2', label: 'Shop B',
    }];
    const { isLoading, data, refetch } = useQuery('admin-locations', fetchAdminLocation)
    const { mutate, isLoading: loadable } = useMutation(createAdminLocation, {
        onSuccess: data => {
            refetch()
            console.log(data)
        }
    })
    const markersRef = React.useRef<any>([])
    const form = useForm({
        initialValues: {
            shop_id: '',
            floor: '',
            coordonates: '',
        },

        validate: {
            floor: (value) => (/\d+/.test(value) ? null : 'The floor should be a number'),
            shop_id: (value) => (value.length ? null : 'The shop mustn\'t be null.'),
            coordonates: (value) => (JSON.parse(value).length === 2 ? null : 'The zone must be a rectangle')
        },
    });

    const setWhatToDrag = (i: any) => {
        const marker = markersRef.current[i]
        if (marker != null) {
            let array = pickupZone;

            const data = marker.getLatLng()
            array[i] = {lng: data.lng, lat: data.lat}

            setPickupZone(array)
        }
    }

    const [draggable, setDraggable] = React.useState<any>([]);
    const [userLongitude, setUserLongitude] = React.useState<number>(0);
    const [userLatitude, setUserLatitude] = React.useState<number>(0);
    const [pickupZone, setPickupZone] = React.useState<any>([]);

    const addNewPickupToMap = () => {
        const array = [
            ...pickupZone,
            {lng: userLongitude, lat: userLatitude}
        ]
        setPickupZone(array)
    }

    const deleteLastPickupFromMap = () => {
        const array = [...pickupZone]
        array.pop()

        setPickupZone(array)
    }

    const setWhichItemToDrag = (whichDragable: any) => {
        let array = [...pickupZone]

        array[whichDragable] = true;
        setDraggable(array)
    }

    const setWhichItemToStop = (whichDragable: any) => {
        let array = [...pickupZone]

        array[whichDragable] = false;
        setDraggable(array)
    }

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
        form.setFieldValue('coordonates', JSON.stringify(pickupZone))
        setDraggable(draggable.slice(0, pickupZone.length));

        markersRef.current = markersRef.current.slice(0, pickupZone.length);
    }, [pickupZone])

    const handleSubmit = (values) => {
        setPickupZone([]);
        form.reset();

        mutate(values)
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
                            <Group position="center" mb="xs">
                                <Button onClick={deleteLastPickupFromMap} variant="light" color="red" mt="md" radius="md">
                                    Delete last coords point
                                </Button>
                                <Button onClick={addNewPickupToMap} variant="light" color="green" mt="md" radius="md">
                                    Add a new coords point
                                </Button>
                            </Group>
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
                                                }} bounds={arr}/>
                                            </React.Fragment>
                                        );
                                    })
                                }
                                {
                                    pickupZone.map((mapper: any, i: number) => (
                                        <React.Fragment key={i}>
                                            <Marker
                                                eventHandlers={{ dragend: () => setWhatToDrag(i)}}
                                                draggable={draggable[i]}
                                                ref={el => markersRef.current[i] = el}
                                                position={pickupZone[i]}
                                            >
                                                <Popup minWidth={90}>
                                                    <Button color={!draggable[i] ? 'red' : 'blue'} onClick={() => {
                                                        return !draggable[i] ? setWhichItemToDrag(i) : setWhichItemToStop(i)
                                                    }}>
                                                      {!draggable[i] ? 'Activate marker\'s movement' : 'Deactivate marker\'s movement'}
                                                    </Button>
                                                </Popup>
                                            </Marker>
                                        </React.Fragment>
                                    ))
                                }
                            </MapContainer>

                            <Group position="center" mt="md" mb="xs">
                                <form
                                    style={{ width: "100%" }}
                                    onSubmit={form.onSubmit(handleSubmit)}
                                >
                                    <Select
                                        mt="xs"
                                        withAsterisk
                                        label="The shop which will be set"
                                        placeholder="Pick one"
                                        data={shops}
                                        {...form.getInputProps('shop_id')}
                                    />
                                    <TextInput
                                        mb="xs"
                                        type="number"
                                        withAsterisk
                                        label="The Floor of the shop"
                                        placeholder="Enter the floor..."
                                        {...form.getInputProps('floor')}
                                    />
                                    <Button type="submit" variant="light" color="blue" fullWidth mt="md" radius="md">
                                        Add the new business to layout
                                    </Button>
                                </form>
                            </Group>
                        </Card.Section>
                    </Card>
                </Container>
            }
        </>
    );
}