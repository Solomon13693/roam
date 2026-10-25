import { places as photos } from '@/constants/images'
import type { PlaceDetails } from '@/types/place'

const lcc: PlaceDetails = {
    tag: 'Nature reserve',
    openNow: true,
    address: 'Lekki–Epe Expressway, Lekki',
    hours: '8 AM – 5 PM',
    planFor: '2–3 hours',
    entry: 'Ticketed',
    about: 'A 78-hectare reserve of swamp forest and savannah, best known for its long canopy walkway above the trees. Come early for cooler air, monkeys and birdsong.',
    gallery: [photos.lcc3, photos.lcc4, photos.lufasi3],
    photoCount: 14,
}

const nike: PlaceDetails = {
    tag: 'Art gallery',
    openNow: true,
    address: '2 Elegushi Beach Road, Lekki Phase 1',
    hours: '10 AM – 6 PM',
    planFor: '1–2 hours',
    entry: 'Free',
    about: 'Four floors of Nigerian art, from adire textiles to bold modern canvases. Most pieces are for sale, and the staff are happy to talk you through them.',
    gallery: [photos.nike1, photos.nike2, photos.freedom2],
    photoCount: 22,
}

const elegushi: PlaceDetails = {
    tag: 'Beach',
    openNow: true,
    address: 'Elegushi Beach Road, Ikate',
    hours: '9 AM – 7 PM',
    planFor: 'Half a day',
    entry: 'Ticketed',
    about: 'A lively private beach with music, horse rides and suya stands. Busiest on Sunday afternoons, calmer and breezier on weekday mornings.',
    gallery: [photos.elegushi1, photos.elegushi2, photos.tarkwa1],
    photoCount: 18,
}

const tarkwaBay: PlaceDetails = {
    tag: 'Sheltered beach',
    openNow: true,
    address: 'Lagos Harbour, reached by boat',
    hours: '7 AM – 6 PM',
    planFor: 'Half a day',
    entry: 'Boat fare',
    about: 'A calm, sheltered beach only reachable by boat from the Marina or Five Cowries jetty. Good for swimming and surfing lessons, with food stalls near the shore.',
    gallery: [photos.tarkwa1, photos.tarkwa2, photos.tarkwa3],
    photoCount: 16,
}

const lufasi: PlaceDetails = {
    tag: 'Nature park',
    openNow: true,
    address: 'Lekki–Epe Expressway, Lekki-Epe',
    hours: '9 AM – 6 PM',
    planFor: '2–4 hours',
    entry: 'Ticketed',
    about: 'A quiet forest park around Lake Moses, with shaded trails, a pier and picnic spots. A good escape from the city on a hot afternoon.',
    gallery: [photos.lufasi1, photos.lufasi3, photos.lufasi1Hi],
    photoCount: 12,
}

const freedomPark: PlaceDetails = {
    tag: 'Heritage park',
    openNow: true,
    address: 'Hospital Road, Lagos Island',
    hours: '9 AM – 10 PM',
    planFor: '1–2 hours',
    entry: 'Small fee',
    about: 'A former colonial prison turned into a park for history, art and live music. Look out for evening concerts and the weekend craft market.',
    gallery: [photos.freedom2, photos.nike2, photos.nike1],
    photoCount: 10,
}

const cafe = (address: string, about: string): PlaceDetails => ({
    tag: 'Café',
    openNow: true,
    address,
    hours: '7 AM – 9 PM',
    planFor: '1 hour',
    entry: 'Free',
    about,
    gallery: [photos.cafe1, photos.cafe2, photos.cafe1],
    photoCount: 8,
})

const walk = (tag: string, address: string, hours: string, planFor: string, about: string): PlaceDetails => ({
    tag,
    openNow: true,
    address,
    hours,
    planFor,
    entry: 'Free',
    about,
    gallery: [photos.lagoon1, photos.lagoon2, photos.tarkwa3],
    photoCount: 9,
})

const park = (tag: string, address: string, about: string): PlaceDetails => ({
    tag,
    openNow: true,
    address,
    hours: '7 AM – 7 PM',
    planFor: '1–2 hours',
    entry: 'Free',
    about,
    gallery: [photos.lcc4, photos.lufasi3, photos.lcc3],
    photoCount: 7,
})

export const PLACE_DETAILS: Record<string, PlaceDetails> = {
    lcc,
    nike,
    elegushi,
    'tarkwa-bay': tarkwaBay,
    'tarkwa-bay-map': tarkwaBay,
    lufasi,
    'lufasi-map': lufasi,
    'freedom-park': freedomPark,
    'freedom-park-map': freedomPark,

    gardenhouse: cafe('Oniru Estate, Victoria Island', 'A leafy café with a garden courtyard, strong pour-overs and fresh pastries. Quiet enough to read or work in the mornings.'),
    kiln: cafe('Admiralty Way, Lekki Phase 1', 'A small roastery café known for its flat whites and clay-oven bread. Grab a window seat and watch Admiralty Way go by.'),
    'yaba-cafe': cafe('Herbert Macaulay Way, Yaba', 'A busy café in the middle of Yaba’s tech district, full of laptops, cold brew and good conversations.'),
    'allen-avenue': cafe('Allen Avenue, Ikeja', 'A calm coffee spot off busy Allen Avenue, with comfy chairs, iced drinks and light lunches.'),
    'ikeja-mall': {
        tag: 'Shopping & food',
        openNow: true,
        address: 'Obafemi Awolowo Way, Ikeja',
        hours: '9 AM – 10 PM',
        planFor: '2–3 hours',
        entry: 'Free',
        about: 'One of Lagos’s biggest malls, with a cinema, food court and plenty of cafés. A cool, easy place to spend a hot afternoon.',
        gallery: [photos.cafe2, photos.cafe1, photos.nike2],
        photoCount: 11,
    },

    'lagoon-walk': walk('Waterside walk', 'Oniru lagoon front, Victoria Island', 'Open all day', '45 min', 'A short, flat walk along the lagoon with views of fishing canoes and the Lekki skyline. Best at sunset.'),
    'lighthouse-trail': walk('Coastal trail', 'Lighthouse Beach, Lagos Harbour', '7 AM – 6 PM', '1–2 hours', 'A sandy trail from Tarkwa Bay to the old lighthouse, with ocean on one side and the harbour on the other.'),
    'ikoyi-link': walk('Bridge walk', 'Lekki–Ikoyi Link Bridge', 'Open all day', '1 hour', 'Lagos’s favourite exercise spot. Walk or jog across the lagoon on the cable-stayed bridge, especially lively early on weekend mornings.'),
    'eko-atlantic': walk('Seaside promenade', 'Eko Atlantic City, Victoria Island', '6 AM – 7 PM', '1 hour', 'A wide new promenade along the Atlantic, great for a breezy walk or bike ride with views of the city rising behind you.'),
    abaranje: walk('Market walk', 'Abaranje Road, Ikotun', '8 AM – 7 PM', '1 hour', 'A busy local market street full of fabric, spices and street food. Go with cash and an appetite.'),
    'ikorodu-waterside': walk('Waterside walk', 'Ikorodu waterfront, Ikorodu', 'Open all day', '1 hour', 'A quiet stretch of lagoon front with fishing boats and ferries heading across to Lagos Island.'),
    'tarkwa-jetty': walk('Boat jetty', 'Tarkwa Bay Jetty, Lagos Harbour', '7 AM – 6 PM', '30 min', 'The landing point for boats to Tarkwa Bay. Check the return times with the boatmen before you head to the beach.'),
    'tarkwa-east-shore': walk('Quiet shore', 'East shore, Tarkwa Bay', '7 AM – 6 PM', '2–3 hours', 'The calmer end of Tarkwa Bay, away from the crowds, with driftwood logs and shallow water.'),

    'muri-okunola': park('City park', 'Muri Okunola Street, Victoria Island', 'A green pocket in Victoria Island with lawns, shady trees and a small playground. A good spot for a picnic.'),
    'maryland-park': park('Garden', 'Ikorodu Road, Maryland', 'A small, well-kept garden with benches and flowering trees, quieter than most of the mainland.'),
    'festac-park': park('Town park', '2nd Avenue, Festac Town', 'A wide open park with walking paths and football pitches, busy with families at the weekend.'),
    'ajah-market': park('Lagoon view', 'Ajah, Lekki', 'A peaceful lagoon-side spot near Ajah with wide water views and fishermen at work.'),
    'unilag-lagoon': park('Lagoon front', 'University of Lagos, Akoka', 'The breezy lagoon front at UNILAG, with views of the Third Mainland Bridge. Best around sunset.'),

    'lighthouse-beach': { ...tarkwaBay, tag: 'Beach', address: 'Lighthouse Beach, Lagos Harbour', about: 'A wide, open beach next to Tarkwa Bay, with rougher waves, fewer people and the old lighthouse nearby.' },
    'eleko-beach': { ...elegushi, tag: 'Beach', address: 'Eleko Village, Ibeju-Lekki', planFor: 'A full day', about: 'A long, quiet beach far out along the coast. Worth the drive for calm sand, palm trees and fresh grilled fish.' },

    'national-theatre': {
        tag: 'Landmark',
        openNow: true,
        address: 'Iganmu, Surulere',
        hours: '9 AM – 6 PM',
        planFor: '1–2 hours',
        entry: 'Free',
        about: 'The famous hat-shaped theatre built for FESTAC ’77, recently restored. Check the listings for plays, concerts and exhibitions.',
        gallery: [photos.nike2, photos.nike1, photos.freedom2],
        photoCount: 13,
    },
    tbs: {
        tag: 'Historic square',
        openNow: true,
        address: 'Lagos Island',
        hours: 'Open all day',
        planFor: '45 min',
        entry: 'Free',
        about: 'A large ceremonial square in the heart of Lagos Island, ringed by monuments and the National Arts Theatre.',
        gallery: [photos.freedom2, photos.nike2, photos.nike1],
        photoCount: 6,
    },
    'surulere-stadium': {
        tag: 'Stadium',
        openNow: false,
        address: 'Surulere',
        hours: 'On match days',
        planFor: '2–3 hours',
        entry: 'Ticketed',
        about: 'A busy local stadium for football and athletics. The atmosphere on a big match day is hard to beat.',
        gallery: [photos.nike2, photos.freedom2, photos.nike1],
        photoCount: 5,
    },
    'badagry-heritage': {
        tag: 'Heritage museum',
        openNow: true,
        address: 'Marina, Badagry',
        hours: '9 AM – 5 PM',
        planFor: 'A full day',
        entry: 'Ticketed',
        about: 'A moving museum on the history of the Atlantic slave trade, near the Point of No Return. Plan a day trip and go with a guide.',
        gallery: [photos.freedom2, photos.lagoon1, photos.nike1],
        photoCount: 15,
    },
}
