import { Place } from "./Types"
import axiosClient from "./axiosClient"
const SERVER_URL = import.meta.env.VITE_SERVER_URL

export const getUsers = async () => {
    const { data } = await axiosClient.get(`${SERVER_URL}/users`)
    return data
}

export const getPlacesByUserId = async (userId: string | undefined) => {
    const { data } = await axiosClient.get(`${SERVER_URL}/places/user/${userId}`)
    return data.places
}

export const addNewPlace = async (newPlace: Place | FormData) => {
    const { data } = await axiosClient.post(`${SERVER_URL}/places/`, newPlace)
    return data
}

export const deletePlace = async (placeId: string) => {
    const { data } = await axiosClient.delete(`${SERVER_URL}/places/${placeId}`)
    return data
}

export const updatePlace = async (placeId: string, body: any) => {
    console.log(body);
    const { data } = await axiosClient.patch(`${SERVER_URL}/places/${placeId}`, body)
    return data
}