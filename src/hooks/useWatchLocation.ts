import * as Location from 'expo-location'
import { useEffect, useState } from 'react'

export function useWatchLocation() {
    const [coordinate, setCoordinate] = useState<[number, number] | null>(null)
    const [denied, setDenied] = useState(false)

    useEffect(() => {
        let subscription: Location.LocationSubscription | null = null
        let active = true

        Location.requestForegroundPermissionsAsync().then(async ({ status }) => {
            if (!active) return
            if (status !== 'granted') return setDenied(true)

            subscription = await Location.watchPositionAsync(
                { accuracy: Location.Accuracy.BestForNavigation, distanceInterval: 5, timeInterval: 2000 },
                ({ coords }) => setCoordinate([coords.longitude, coords.latitude]),
            )
            if (!active) subscription.remove()
        })

        return () => {
            active = false
            subscription?.remove()
        }
    }, [])

    return { coordinate, denied }
}
