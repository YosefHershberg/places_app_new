export interface Place {
    address: string
    creator: string
    description: string
    id: string
    image: string
    location: { lat: number, lng: number }
    title: string
    __v: number
    _id: string
}

export interface User {
    email: string
    hashedPassword: string
    id: string
    image: string
    name: string
    places: Place[]
    __v: number
    _id: string
}