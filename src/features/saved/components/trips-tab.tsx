import { EmptyState, Typography } from '@/components'
import type { Trip } from '@/types/place'
import { router } from 'expo-router'
import { ScrollView, View } from 'react-native'
import { PastTripRow } from './past-trip-row'
import { PlanTripBanner } from './plan-trip-banner'
import { UpcomingTripCard } from './upcoming-trip-card'

export function TripsTab({ trips }: { trips: Trip[] }) {
    const upcoming = trips.filter((trip) => trip.status === 'upcoming')
    const past = trips.filter((trip) => trip.status === 'past')
    const open = (trip: Trip) => router.push(`/trip/${trip.id}`)

    return (
        <ScrollView className="-mx-6 mt-5.5" contentContainerClassName="px-6 pb-40" showsVerticalScrollIndicator={false}>
            
            <PlanTripBanner onPress={() => router.push('/trip/new')} />

            {trips.length === 0 ? (
                <EmptyState className="mt-24" icon="route" title="No trips yet" description="Group your saved places into a day out." />
            ) : null}

            {upcoming.length > 0 ? (
                <View className="mt-7 gap-3">
                    <Typography className="text-[19px] font-medium leading-6">Upcoming</Typography>
                    {upcoming.map((trip) => (
                        <UpcomingTripCard key={trip.id} trip={trip} onPress={() => open(trip)} />
                    ))}
                </View>
            ) : null}

            {past.length > 0 ? (
                <View className="mt-7 gap-3">
                    <Typography className="text-[19px] font-medium leading-6">Past</Typography>
                    {past.map((trip) => (
                        <PastTripRow key={trip.id} trip={trip} onPress={() => open(trip)} />
                    ))}
                </View>
            ) : null}
        </ScrollView>
    )
}
