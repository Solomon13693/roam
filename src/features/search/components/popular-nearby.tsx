import { PlaceCard, SectionHeader } from '@/components'
import type { Place } from '@/types/place'
import { router } from 'expo-router'
import { FlatList, View } from 'react-native'

export function PopularNearby({ places }: { places: Place[] }) {
    return (
        <View className="mt-6.5">
            <SectionHeader title="Popular nearby" onActionPress={() => {}} />
            <FlatList
                data={places}
                horizontal
                showsHorizontalScrollIndicator={false}
                className="-mx-6 mt-3.5 grow-0"
                contentContainerClassName="gap-[15px] px-6"
                keyExtractor={(place) => place.id}
                renderItem={({ item }) => <PlaceCard place={item} onPress={() => router.push(`/place/${item.id}`)} />}
            />
        </View>
    )
}
