import { fetchAdminLocation, fetchHeatzoneData } from "./api";
import { useQuery } from "react-query";
import { Text, View, StyleSheet } from 'react-native';
import React from "react";
import * as Location from 'expo-location';

const {useState, useEffect, useRef} = React

export default function Daemon({ id }) {
    const { isLoading, data, refetch } = useQuery('store-zones', fetchAdminLocation)
    const { isLoading: heatZoneLoading, data: dataHeatZone} = useQuery('heatzone-location', fetchHeatzoneData)
    let ws = React.useRef(new WebSocket('ws://192.168.22.30:8080/ws')).current;

    const [oldTime, setOldTime] = useState(null);
    const [newTime, setNewTime] = useState(Date.now());
    const [wsConnection, setWSConnection] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    function getSecondsDiff(startDate, endDate) {
        const msInSecond = 1000;

        return Math.round(
            Math.abs(endDate - startDate) / msInSecond
        );
    }

    const isInsideZone = (zoneCoordonates, location) => {
        const lng_min = Math.min(zoneCoordonates[0].lng, zoneCoordonates[1].lng)
        const lng_max = Math.max(zoneCoordonates[0].lng, zoneCoordonates[1].lng)
        const lat_min = Math.min(zoneCoordonates[0].lat, zoneCoordonates[1].lat)
        const lat_max = Math.max(zoneCoordonates[0].lat, zoneCoordonates[1].lat)

        if (lng_min <= location.coords.longitude && location.coords.longitude <= lng_max && lat_min <= location.coords.latitude && location.coords.latitude <= lat_max) {
            return true;
        }

        return false;
    }

    useEffect(() => {
        ws.onopen = () => {
            setWSConnection(true);
        }
    }, [])

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest
            });
            setLocation(location);

            if (data?.data.length !== undefined && wsConnection) {
                for (const item of data?.data) { // verifica daca un user este intr-o zona si ia-i numele
                    if (isInsideZone(item.Coordonates, location)) {
                        if (oldTime == null) {
                            setOldTime(Date.now());
                        }
                        setNewTime(Date.now());

                        ws.send(JSON.stringify({
                                "uuid": id,
                                "latitudeConsumer": location.coords.latitude,
                                "longitudeConsumer": location.coords.longitude,
                                "oldTime": oldTime,
                                "newTime": newTime,
                                "diff": getSecondsDiff(oldTime, newTime),
                                ...item
                            })
                        );
                    }
                }
            }
            refetch();
        })();
    }, [location]);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    if (isLoading || heatZoneLoading) {
        return <Text>Loading...</Text>
    }

    return (
        <View style={page.container}>
        {
            data?.data.length !== undefined && location &&
            <Text>Actual position: {location.coords.longitude} | {location.coords.latitude}</Text>
        }
        </View>
    )
}

const page = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        alignItems: "center"
    },
})
