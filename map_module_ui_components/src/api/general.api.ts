import axios from 'axios';

const API_URL = 'http://localhost:8080'

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

export const createAdminLocation = async (data: any) => {
    const { data: response } = await api.post(API_URL + '/admin-locations', data)
    return response.data
}

export const deleteAdminLocation = async (data: any) => {
    const { data: response } = await api.delete(API_URL + '/admin-locations/' + data.id, data)
    return response.data
}