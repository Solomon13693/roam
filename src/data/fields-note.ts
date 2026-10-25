import { places } from '@/constants/images';

export const RECENTS = [
    { id: 1, image: places.cafe1 },
    { id: 2, image: places.elegushi1 },
    { id: 3, image: places.elegushi2 },
    { id: 4, image: places.freedom2 },
    { id: 5, image: places.lagoon1 },
    { id: 6, image: places.lcc3 },
    { id: 7, image: places.lcc1 },
    { id: 8, image: places.lufasi3 },
]

export type FieldNote = {
    id: string
    date: string
    time: string
    caption: string
    placeId: string
    placeName: string
    category: 'beaches' | 'nature'
    month: 'october'
    photos: number[]
}

export const FIELD_NOTES: FieldNote[] = [
    {
        id: 'note-1',
        date: 'Sat, 11 Oct',
        time: '5:42 PM',
        caption: 'Boat back at golden hour. Water was glass the whole way.',
        placeId: 'tarkwa-bay',
        placeName: 'Tarkwa Bay Beach',
        category: 'beaches',
        month: 'october',
        photos: [places.tarkwa3],
    },
    {
        id: 'note-2',
        date: 'Sun, 5 Oct',
        time: '9:10 AM',
        caption: 'Made it across the canopy walk. Monkeys at the koi pond.',
        placeId: 'lcc',
        placeName: 'Lekki Conservation Centre',
        category: 'nature',
        month: 'october',
        photos: [places.lcc4, places.lcc1],
    },
]
