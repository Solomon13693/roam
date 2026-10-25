import { EmptyState, Typography } from '@/components'
import { findTrip } from '@/data/trips'
import { router } from 'expo-router'
import { ScrollView, View } from 'react-native'
import { ItineraryStop, RoutePreview, RouteStats, TripActionBar, TripCover } from './components'

export const TripDetailsView = ({ id }: { id: string }) => {
    const trip = findTrip(id)

    if (!trip) {
        return (
            <View className="flex-1 justify-center bg-paper">
                <EmptyState icon="route" title="Trip not found" actionLabel="Go back" onActionPress={() => router.back()} />
            </View>
        )
    }

    const navigate = () => router.push({ pathname: '/trip/directions', params: { placeId: trip.stops[0]?.id } })

    return (
        <View className="flex-1 bg-paper">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-36">
                <TripCover trip={trip} />

                <View className="-mt-7.5 rounded-t-[30px] bg-paper px-6 pt-6">
                    <RoutePreview trip={trip} onNavigate={navigate} />
                    <RouteStats trip={trip} />

                    <Typography className="mt-5.5 text-[22px] font-semibold leading-7 tracking-[-0.44px]">Itinerary</Typography>
                    <View className="mt-3 gap-2.5">
                        {trip.stops.map((place, index) => (
                            <ItineraryStop key={place.id} place={place} index={index} plan={trip.plan?.[index]} />
                        ))}
                    </View>
                </View>
            </ScrollView>

            <TripActionBar onEdit={() => router.push('/trip/new')} onNavigate={navigate} />
        </View>
    )
}
