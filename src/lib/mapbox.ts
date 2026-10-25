import Mapbox from '@rnmapbox/maps'

const token = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN

if (!token) {
    console.error('EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN is missing. Add it to .env and restart with `npx expo start -c`.')
} else {
    Mapbox.setAccessToken(token)
}

export { Mapbox }
