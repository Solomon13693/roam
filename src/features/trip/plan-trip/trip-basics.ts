import type { Place } from '@/types/place'
import { nextWeekday } from './components/dates'

export const TIMES = [
    { value: '8:00', label: '8:00 AM' },
    { value: '9:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
]

export const METHODS = [
    { value: 'car', label: 'Car' },
    { value: 'ride-hailing', label: 'Ride-hailing' },
    { value: 'walking', label: 'Walking' },
]

export type TripBasics = {
    name: string
    date: Date
    time: string
    mode: string
}

export const newTripBasics = (): TripBasics => ({
    name: '',
    date: nextWeekday(new Date(), 6),
    time: TIMES[1].value,
    mode: METHODS[0].value,
})

export type TripStop = {
    place: Place
    arriveAt: number
    stayMinutes: number
    note: string
}

export const STAY_OPTIONS = [
    { value: '30', label: '30 min' },
    { value: '60', label: '1 hr' },
    { value: '120', label: '2 hrs' },
    { value: '180', label: '3 hrs' },
] as const

export const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
}

export const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60) % 24
    const mins = minutes % 60
    const suffix = hours < 12 ? 'AM' : 'PM'
    return `${hours % 12 || 12}:${String(mins).padStart(2, '0')} ${suffix}`
}

export const formatStay = (minutes: number) => STAY_OPTIONS.find((option) => Number(option.value) === minutes)?.label ?? `${minutes} min`

export const suggestedArrival = (basics: TripBasics, stops: TripStop[]) => {
    const last = stops[stops.length - 1]
    if (!last) return toMinutes(basics.time)
    return Math.ceil((last.arriveAt + last.stayMinutes + 30) / 30) * 30
}

export const arrivalOptions = (suggested: number) => [-30, 0, 30, 60].map((offset) => suggested + offset).filter((minutes) => minutes >= 6 * 60)
