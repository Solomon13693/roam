import { places as photos } from '@/constants/images'
import type { Place } from '@/types/place'

export const PLACES: Place[] = [
    {
        id: 'tarkwa-bay',
        name: 'Tarkwa Bay Beach',
        category: 'Beaches',
        area: 'Lagos Harbour',
        distanceKm: 6.2,
        photo: photos.tarkwa2,
        summary: 'Calm, sheltered water · Lagos Harbour',
        travelTime: '25 min boat ride',
    },
    { id: 'lcc', name: 'Lekki Conservation Centre', category: 'Nature', area: 'Lekki', distanceKm: 4.1, photo: photos.lcc1 },
    { id: 'nike', name: 'Nike Art Gallery', category: 'Culture', area: 'Lekki Phase 1', distanceKm: 2.4, photo: photos.nike1, saved: true },
    { id: 'elegushi', name: 'Elegushi Beach', category: 'Beaches', area: 'Ikate', distanceKm: 3.0, photo: photos.elegushi1 },
]

export const POPULAR_NEARBY: Place[] = [
    { id: 'lufasi', name: 'LUFASI Nature Park', category: 'Nature', area: 'Lekki-Epe', distanceKm: 18, travelMinutes: 35, photo: photos.lufasi1 },
    { id: 'freedom-park', name: 'Freedom Park', category: 'Culture', area: 'Lagos Island', distanceKm: 12, travelMinutes: 28, photo: photos.freedom2 },
    { id: 'elegushi', name: 'Elegushi Beach', category: 'Beach', area: 'Ikate', distanceKm: 3.0, travelMinutes: 10, photo: photos.elegushi1 },
]

export const MORE_PLACES: Place[] = [
    { id: 'tarkwa-jetty', name: 'Tarkwa Bay Jetty', category: 'Transit', area: 'Lagos Harbour', distanceKm: 6.0, photo: photos.tarkwa3 },
    { id: 'tarkwa-east-shore', name: 'Tarkwa Bay East Shore', category: 'Beach', area: 'Lagos Harbour', distanceKm: 6.6, photo: photos.tarkwa1 },
    { id: 'lighthouse-trail', name: 'Lighthouse Beach Trail', category: 'Walks', area: 'Lagos Harbour', distanceKm: 7.4, photo: photos.lagoon1 },
]

export const ALL_PLACES: Place[] = [...PLACES, ...POPULAR_NEARBY, ...MORE_PLACES].filter(
    (place, index, list) => list.findIndex((other) => other.id === place.id) === index,
)

export const MAP_PLACES: Place[] = [
    { id: 'lcc', name: 'Lekki Conservation Centre', category: 'Nature', area: 'Lekki', distanceKm: 4.1, travelMinutes: 12, photo: photos.lcc1, coordinate: [3.5352, 6.4428] },
    { id: 'nike', name: 'Nike Art Gallery', category: 'Culture', area: 'Lekki Phase 1', distanceKm: 2.4, travelMinutes: 8, photo: photos.nike1, coordinate: [3.4797, 6.4383] },
    { id: 'elegushi', name: 'Elegushi Beach', category: 'Beaches', area: 'Ikate', distanceKm: 3.0, travelMinutes: 10, photo: photos.elegushi2, coordinate: [3.4789, 6.4254] },
    { id: 'gardenhouse', name: 'Gardenhouse Coffee', category: 'Cafés', area: 'Oniru', distanceKm: 2.1, travelMinutes: 7, photo: photos.cafe1, coordinate: [3.4605, 6.4385] },
    { id: 'kiln', name: 'Kiln Café', category: 'Cafés', area: 'Lekki Phase 1', distanceKm: 1.6, travelMinutes: 6, photo: photos.cafe2, coordinate: [3.4711, 6.4582] },
    { id: 'lagoon-walk', name: 'Lagoon walk', category: 'Walks', area: 'Oniru', distanceKm: 2.8, travelMinutes: 9, photo: photos.lagoon2, coordinate: [3.454, 6.452] },

    { id: 'freedom-park-map', name: 'Freedom Park', category: 'Culture', area: 'Lagos Island', distanceKm: 9.4, travelMinutes: 25, photo: photos.freedom2, coordinate: [3.3966, 6.4486] },
    { id: 'tbs', name: 'Tafawa Balewa Square', category: 'Culture', area: 'Lagos Island', distanceKm: 9.0, travelMinutes: 24, photo: photos.nike2, coordinate: [3.4002, 6.4466] },
    { id: 'national-theatre', name: 'National Theatre', category: 'Culture', area: 'Iganmu', distanceKm: 12.5, travelMinutes: 32, photo: photos.nike1, coordinate: [3.3768, 6.4762] },
    { id: 'muri-okunola', name: 'Muri Okunola Park', category: 'Nature', area: 'Victoria Island', distanceKm: 5.2, travelMinutes: 15, photo: photos.lcc3, coordinate: [3.429, 6.4337] },
    { id: 'ikoyi-link', name: 'Lekki–Ikoyi Link Bridge', category: 'Walks', area: 'Ikoyi', distanceKm: 3.4, travelMinutes: 10, photo: photos.lagoon1, coordinate: [3.4446, 6.4475] },
    { id: 'tarkwa-bay-map', name: 'Tarkwa Bay Beach', category: 'Beaches', area: 'Lagos Harbour', distanceKm: 6.2, travelMinutes: 25, photo: photos.tarkwa2, coordinate: [3.3955, 6.3995] },
    { id: 'lighthouse-beach', name: 'Lighthouse Beach', category: 'Beaches', area: 'Lagos Harbour', distanceKm: 7.4, travelMinutes: 30, photo: photos.tarkwa1, coordinate: [3.4047, 6.4024] },
    { id: 'eko-atlantic', name: 'Eko Atlantic Promenade', category: 'Walks', area: 'Victoria Island', distanceKm: 6.8, travelMinutes: 20, photo: photos.elegushi1, coordinate: [3.4106, 6.4173] },
    { id: 'unilag-lagoon', name: 'UNILAG Lagoon Front', category: 'Nature', area: 'Akoka', distanceKm: 13.1, travelMinutes: 35, photo: photos.lagoon2, coordinate: [3.3958, 6.5158] },
    { id: 'yaba-cafe', name: 'Hub Café Yaba', category: 'Cafés', area: 'Yaba', distanceKm: 12.0, travelMinutes: 33, photo: photos.cafe1, coordinate: [3.3792, 6.5095] },
    { id: 'surulere-stadium', name: 'Teslim Balogun Stadium', category: 'Culture', area: 'Surulere', distanceKm: 13.8, travelMinutes: 38, photo: photos.nike2, coordinate: [3.363, 6.4987] },
    { id: 'ikeja-mall', name: 'Ikeja City Mall', category: 'Cafés', area: 'Ikeja', distanceKm: 21.5, travelMinutes: 50, photo: photos.cafe2, coordinate: [3.3518, 6.6136] },
    { id: 'allen-avenue', name: 'Allen Avenue Coffee', category: 'Cafés', area: 'Ikeja', distanceKm: 20.4, travelMinutes: 48, photo: photos.cafe1, coordinate: [3.3525, 6.6014] },
    { id: 'maryland-park', name: 'Maryland Garden', category: 'Nature', area: 'Maryland', distanceKm: 17.6, travelMinutes: 42, photo: photos.lcc4, coordinate: [3.3672, 6.5711] },
    { id: 'festac-park', name: 'Festac Town Park', category: 'Nature', area: 'Festac', distanceKm: 22.3, travelMinutes: 55, photo: photos.lufasi3, coordinate: [3.2833, 6.4666] },
    { id: 'abaranje', name: 'Abaranje Market Walk', category: 'Walks', area: 'Ikotun', distanceKm: 25.0, travelMinutes: 60, photo: photos.lagoon1, coordinate: [3.2445, 6.5306] },
    { id: 'ikorodu-waterside', name: 'Ikorodu Waterside', category: 'Walks', area: 'Ikorodu', distanceKm: 24.8, travelMinutes: 65, photo: photos.lagoon2, coordinate: [3.5106, 6.6194] },
    { id: 'ajah-market', name: 'Ajah Lagoon View', category: 'Nature', area: 'Ajah', distanceKm: 11.6, travelMinutes: 28, photo: photos.lcc1, coordinate: [3.5772, 6.4689] },
    { id: 'lufasi-map', name: 'LUFASI Nature Park', category: 'Nature', area: 'Lekki-Epe', distanceKm: 18.0, travelMinutes: 35, photo: photos.lufasi1, coordinate: [3.6487, 6.4403] },
    { id: 'eleko-beach', name: 'Eleko Beach', category: 'Beaches', area: 'Ibeju-Lekki', distanceKm: 42.0, travelMinutes: 70, photo: photos.elegushi2, coordinate: [3.859, 6.443] },
    { id: 'badagry-heritage', name: 'Badagry Heritage Museum', category: 'Culture', area: 'Badagry', distanceKm: 62.0, travelMinutes: 95, photo: photos.freedom2, coordinate: [2.8813, 6.4155] },
]

export const findPlace = (id: string) => [...ALL_PLACES, ...MAP_PLACES].find((place) => place.id === id)

export const findPlaceCoordinate = (id: string) =>
    [...ALL_PLACES, ...MAP_PLACES].find((place) => (place.id === id || place.id === `${id}-map` || `${place.id}-map` === id) && place.coordinate)?.coordinate

export const SAVED_PLACES: Place[] = [
    { id: 'tarkwa-bay', name: 'Tarkwa Bay Beach', category: 'Beach', area: 'Lagos Harbour', distanceKm: 6.2, photo: photos.tarkwa1, saved: true },
    { id: 'nike', name: 'Nike Art Gallery', category: 'Culture', area: 'Lekki Phase 1', distanceKm: 2.4, photo: photos.nike2, saved: true },
    { id: 'lufasi', name: 'LUFASI Nature Park', category: 'Nature', area: 'Lekki-Epe', distanceKm: 18, photo: photos.lufasi1, saved: true },
    { id: 'kiln', name: 'Kiln Café', category: 'Café', area: 'Lekki Phase 1', distanceKm: 1.8, photo: photos.cafe2, saved: true },
    { id: 'freedom-park', name: 'Freedom Park', category: 'Culture', area: 'Lagos Island', distanceKm: 12, photo: photos.freedom2, saved: true },
    { id: 'elegushi', name: 'Elegushi Beach', category: 'Beach', area: 'Ikate', distanceKm: 3.0, photo: photos.elegushi1, saved: true },
]
