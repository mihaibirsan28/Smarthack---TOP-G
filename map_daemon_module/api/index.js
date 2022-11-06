import axios from 'axios';

const API_URL = 'http://192.168.22.30:8080'

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json"
    }
})

export const fetchAdminLocation = () => {
    return api.get(API_URL + '/admin-locations')
}

export const fetchHeatzoneData = () => {
    return api.get(API_URL + '/heatzone-data')
}