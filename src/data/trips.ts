import { places as photos } from '@/constants/images'
import type { Trip } from '@/types/place'
import { MAP_PLACES, PLACES, POPULAR_NEARBY } from './places'

const byId = (id: string) => {
    const place = [...PLACES, ...POPULAR_NEARBY].find((item) => item.id === id)!
    const onMap = MAP_PLACES.find((item) => item.id === id || item.id === `${id}-map`)
    return { ...place, coordinate: place.coordinate ?? onMap?.coordinate }
}

export const TRIPS: Trip[] = [
    {
        id: 'saturday-in-lekki',
        title: 'Saturday in Lekki',
        date: 'Sat, 18 Oct',
        dateDetail: 'Sat, 18 Oct · Day trip',
        status: 'upcoming',
        cover: photos.lufasi1,
        stops: [byId('lcc'), byId('nike'), byId('elegushi')],
        plan: [
            { time: '9:00 AM', stay: '2 hrs', note: 'Canopy walk first, before it gets hot. Bring water.' },
            { time: '12:00 PM', stay: '1 hr', note: 'Ask about the adire textiles on the third floor.' },
            { time: '4:30 PM', stay: 'Sunset', note: 'Grab suya by the entrance, stay for golden hour.' },
        ],
        distanceKm: 14.2,
        totalHours: 8.5,
    },
    {
        id: 'tarkwa-bay-day-out',
        title: 'Tarkwa Bay day out',
        date: 'Sun, 5 Oct',
        dateDetail: 'Sun, 5 Oct · Day trip',
        status: 'past',
        cover: photos.tarkwa1,
        stops: [byId('tarkwa-bay'), byId('elegushi')],
        plan: [
            { time: '9:30 AM', stay: '4 hrs', note: 'Boat from Five Cowries jetty. Bring cash for the return trip.' },
            { time: '3:30 PM', stay: '2 hrs', note: 'End the day with grilled fish by the water.' },
        ],
        distanceKm: 9.6,
        totalHours: 5,
    },
]

export const findTrip = (id: string) => TRIPS.find((trip) => trip.id === id)
