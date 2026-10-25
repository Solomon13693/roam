import { PlaceRow, SectionHeader } from '@/components'
import type { Place } from '@/types/place'
import { router } from 'expo-router'
import { View } from 'react-native'

export function NearYou({ places }: { places: Place[] }) {
    return (
        <View className="mt-7">
            <SectionHeader title="Near you" onActionPress={() => router.push('/search')} />
            <View className="mt-3.5 gap-3">
                {places.map((place) => (
                    <PlaceRow key={place.id} place={place} onPress={() => router.push(`/place/${place.id}`)} />
                ))}
            </View>
        </View>
    )
}
