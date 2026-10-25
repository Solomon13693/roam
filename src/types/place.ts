import type { ImageProps } from 'expo-image'

export type Place = {
    id: string
    name: string
    category: string
    area: string
    distanceKm: number
    photo: ImageProps['source']
    summary?: string
    travelTime?: string
    saved?: boolean
    travelMinutes?: number
    coordinate?: [number, number]
}

export type PlaceDetails = {
    tag: string
    openNow: boolean
    address: string
    hours: string
    planFor: string
    entry: string
    about: string
    gallery: Place['photo'][]
    photoCount: number
}

export type Trip = {
    id: string
    title: string
    date: string
    dateDetail?: string
    status: 'upcoming' | 'past'
    cover: Place['photo']
    stops: Place[]
    plan?: TripPlanItem[]
    distanceKm: number
    totalHours: number
}

export type TripPlanItem = {
    time: string
    stay: string
    note?: string
}
