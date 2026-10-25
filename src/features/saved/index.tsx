import { EmptyState, IconButton, LinearGradient, SegmentedControl, Typography } from '@/components'
import { SAVED_PLACES } from '@/data/places'
import { TRIPS } from '@/data/trips'
import { SavedPlaceCard, TripsTab } from '@/features/saved/components'
import { router } from 'expo-router'
import { useState } from 'react'
import { FlatList, View } from 'react-native'

const SavedView = () => {
    const [active, setActive] = useState<'place' | 'trip'>('place')

    return (
        <View className="flex-1 bg-paper pt-safe px-6">
            <LinearGradient colors={['#DBEDE0', '#F7F8F6']} className="absolute inset-x-0 top-0 h-[400px]" />

            <View className="items-center justify-between flex-row gap-2 mb-6.5">
                <View>
                    <Typography className="text-[32px] font-medium text-ink">Saved</Typography>
                    <Typography className="text-[13px] text-ink-muted">
                        {active === 'place' ? 'Places you want to get to' : 'Day trips you’ve planned'}
                    </Typography>
                </View>

                <IconButton accessibilityLabel="search" icon="search" />
            </View>

            <SegmentedControl
                options={[
                    { value: 'place', label: `Places · ${SAVED_PLACES.length}` },
                    { value: 'trip', label: `Trips · ${TRIPS.length}` },
                ]}
                value={active}
                onChange={(value) => setActive(value)}
            />

            {active === 'place' ? (
            <FlatList
                key="places"
                className="mt-5.5 -mx-6"
                data={SAVED_PLACES}
                renderItem={({ item }) => <SavedPlaceCard place={item} onPress={() => router.push(`/place/${item.id}`)} />}
                keyExtractor={(place) => place.id}
                numColumns={2}
                columnWrapperClassName="gap-[15px]"
                contentContainerClassName="gap-5 px-6 pb-40"
                ListEmptyComponent={
                    <EmptyState
                        className="mt-50"
                        title="Start your shortlist"
                        description="Tap the bookmark on any place and it lands here, ready for a weekend plan."
                        icon="bookmark"
                        actionLabel="Explore nearby"
                        actionIcon="compass"
                        onActionPress={() => router.push('/explore')}
                    />
                }
            />
            ) : (
                <TripsTab trips={TRIPS} />
            )}
        </View>
    )
}

export default SavedView
