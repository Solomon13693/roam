import { EmptyState, PlaceRow, Typography } from '@/components'
import type { Place } from '@/types/place'
import { router } from 'expo-router'
import { FlatList, View } from 'react-native'

const SearchResult = ({ places, query }: { places: Place[]; query: string }) => {
    return (
        <FlatList
            data={places}
            keyExtractor={(place) => place.id}
            renderItem={({ item }) => <PlaceRow place={item} onPress={() => router.push(`/place/${item.id}`)} />}
            ItemSeparatorComponent={() => <View className="h-3" />}
            ListHeaderComponent={
                places.length > 0 ? (
                    <View className="mb-4 flex-row items-center justify-between gap-2">
                        <Typography className="font-semibold">
                            {places.length} {places.length === 1 ? 'result' : 'results'}
                        </Typography>
                        <Typography className="text-[13px] text-ink-muted">Sorted by distance</Typography>
                    </View>
                ) : undefined
            }
            ListEmptyComponent={
                <EmptyState
                    icon="compass"
                    title={`Nothing for “${query}” yet`}
                    description="Try a broader word like “beach”, or browse places on the map instead."
                    actionLabel="Explore the map"
                    actionIcon="map"
                    onActionPress={() => router.navigate('/map')}
                    className="mt-24"
                />
            }
            className="flex-1"
            contentContainerClassName="px-6 pt-6 pb-10"
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
        />
    )
}

export default SearchResult
