import { FeatureCard, SectionHeader } from '@/components'
import type { Place } from '@/types/place'
import { router } from 'expo-router'
import { View } from 'react-native'

export function WeekendPick({ place }: { place: Place }) {
    return (
        <View className="mt-6.5">
            
            <SectionHeader title="Weekend pick" onActionPress={() => router.push('/search')} />

            <View className="mt-3.5">
                <FeatureCard place={place} onPress={() => router.push(`/place/${place.id}`)} />
            </View>

        </View>
    )
}
