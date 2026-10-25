import { Image, Typography } from '@/components'
import type { Trip } from '@/types/place'
import { Pressable, View } from 'react-native'

export function UpcomingTripCard({ trip, onPress }: { trip: Trip; onPress?: () => void }) {
    const route = trip.stops.map((stop) => stop.name).join(' → ')

    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={`${trip.title}, ${trip.date}`}
            className="overflow-hidden rounded-3xl bg-white shadow-[0_4px_16px_rgba(18,20,19,0.06)] active:opacity-90">
            <View className="h-39">
                <Image source={trip.cover} contentFit="cover" transition={300} className="absolute inset-0" />
                <View className="m-4 self-start rounded-full bg-lime px-3.5 py-1.5">
                    <Typography className="text-[13px] font-medium leading-4 text-forest-deep">{trip.date}</Typography>
                </View>
            </View>

            <View className="gap-1 px-5 pb-4.5 pt-4">
                <Typography numberOfLines={1} className="text-[22px] font-medium leading-7 tracking-[-0.44px]">
                    {trip.title}
                </Typography>
                <Typography className="text-[15px] leading-[22px] text-ink-muted">
                    {trip.stops.length} stops · {trip.distanceKm} km · about {trip.totalHours} hrs
                </Typography>
                <Typography numberOfLines={1} className="text-[13px] font-medium leading-[18px] text-forest">
                    {route}
                </Typography>
            </View>
        </Pressable>
    )
}
