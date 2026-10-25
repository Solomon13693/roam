export type RouteStep = {
    distance: number
    duration: number
    name: string
    maneuver: {
        type: string
        modifier?: string
        instruction?: string
        location: [number, number]
    }
}

export type RouteResult = {
    distance: number
    duration: number
    geometry: {
        coordinates: [number, number][]
        type: 'LineString'
    }
    legs: {
        steps: RouteStep[]
    }[]
}

export async function getRoute(origin: [number, number], destination: [number, number]): Promise<RouteResult> {
    const coordinates = `${origin.join(',')};${destination.join(',')}`

    const url =
        `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}` +
        `?steps=true&overview=full&geometries=geojson&language=en` +
        `&access_token=${process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN}`

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Directions API error: ${response.status}`)
    }

    const data = await response.json()

    if (data.code !== 'Ok' || !data.routes?.length) {
        throw new Error(data.message ?? 'No route found')
    }

    return data.routes[0]
}
