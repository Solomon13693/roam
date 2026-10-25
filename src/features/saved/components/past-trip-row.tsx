import { Image, Typography } from '@/components'
import type { Trip } from '@/types/place'
import { Pressable, View } from 'react-native'

export function PastTripRow({ trip, onPress }: { trip: Trip; onPress?: () => void }) {
    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={`${trip.title}, ${trip.date}, done`}
            className="flex-row items-center gap-4 rounded-3xl bg-white p-4 shadow-[0_4px_16px_rgba(18,20,19,0.06)] active:opacity-90">
            <Image source={trip.cover} contentFit="cover" className="size-20.5 rounded-[18px]" />
            <View className="flex-1 gap-1">
                <Typography numberOfLines={1} className="text-[19px] font-medium leading-6">
                    {trip.title}
                </Typography>
                <Typography className="text-[15px] leading-[22px] text-ink-muted">
                    {trip.date} · {trip.stops.length} stops
                </Typography>
            </View>
            <View className="rounded-full bg-sage-soft px-3.5 py-1.5">
                <Typography className="text-[13px] font-medium leading-4 text-forest">Done</Typography>
            </View>
        </Pressable>
    )
}
