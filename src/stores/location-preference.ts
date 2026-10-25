import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type LocationPreference = {
    enabled: boolean
    hydrated: boolean
    setEnabled: (enabled: boolean) => void
}

export const useLocationPreference = create<LocationPreference>()(
    persist(
        (set) => ({
            enabled: true,
            hydrated: false,
            setEnabled: (enabled) => set({ enabled }),
        }),
        {
            name: 'roam.location-preference',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({ enabled: state.enabled }),
            onRehydrateStorage: () => () => useLocationPreference.setState({ hydrated: true }),
        },
    ),
)
