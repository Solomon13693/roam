import * as Location from 'expo-location'
import { useCallback, useEffect, useState } from 'react'
import { AppState } from 'react-native'
import { useLocationPreference } from '@/stores'

type LocationState = {
    coordinate: [number, number] | null
    denied: boolean
    canAskAgain: boolean
    error: string | null
}

const INITIAL: LocationState = { coordinate: null, denied: false, canAskAgain: true, error: null }

async function readLocation(ask: boolean): Promise<LocationState> {
    try {
        const permission = ask ? await Location.requestForegroundPermissionsAsync() : await Location.getForegroundPermissionsAsync()

        if (permission.status !== 'granted') {
            return { coordinate: null, denied: true, canAskAgain: permission.canAskAgain, error: null }
        }

        const { coords } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced })
        return { coordinate: [coords.longitude, coords.latitude], denied: false, canAskAgain: true, error: null }
    } catch (e) {
        return { ...INITIAL, error: e instanceof Error ? e.message : 'Could not get your location' }
    }
}

export function useCurrentLocation() {
    
    const [state, setState] = useState<LocationState>(INITIAL)
    const enabled = useLocationPreference((state) => state.enabled)
    const ready = useLocationPreference((state) => state.hydrated)

    useEffect(() => {
        if (!ready || !enabled) return
        let active = true

        const load = async (ask: boolean) => {
            const next = await readLocation(ask)
            if (active) setState(next)
        }

        load(true)

        const subscription = AppState.addEventListener('change', (appState) => {
            if (appState === 'active') load(false)
        })

        return () => {
            active = false
            subscription.remove()
        }
    }, [enabled, ready])

    const requestAgain = useCallback(async () => setState(await readLocation(true)), [])

    return { ...state, coordinate: enabled ? state.coordinate : null, enabled, requestAgain }
}
