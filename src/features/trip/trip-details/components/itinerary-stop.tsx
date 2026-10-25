import { Image, Typography } from '@/components'
import type { Place, TripPlanItem } from '@/types/place'
import { router } from 'expo-router'
import { Pressable, View } from 'react-native'

type ItineraryStopProps = {
    place: Place
    index: number
    plan?: TripPlanItem
}

export function ItineraryStop({ place, index, plan }: ItineraryStopProps) {
    return (
        <Pressable
            onPress={() => router.push(`/place/${place.id}`)}
            accessibilityRole="button"
            accessibilityLabel={`Stop ${index + 1}, ${place.name}${plan ? `, ${plan.time}` : ''}`}
            className="flex-row gap-3.5 rounded-[20px] bg-white p-3.5 shadow-[0_2px_10px_rgba(18,20,19,0.04)] active:opacity-90">
            <View className="size-7 items-center justify-center rounded-full bg-forest">
                <Typography className="text-xs font-semibold text-white">{index + 1}</Typography>
            </View>

            <View className="flex-1 gap-0.75">
                <Typography className="font-semibold">{place.name}</Typography>
                {plan ? (
                    <Typography className="text-[13px] leading-[18px] text-ink-muted">
                        {plan.time} · {plan.stay}
                    </Typography>
                ) : null}
                {plan?.note ? <Typography className="text-[13px] leading-[18px]">{plan.note}</Typography> : null}
            </View>

            <Image source={place.photo} contentFit="cover" className="size-14 rounded-[14px]" />
        </Pressable>
    )
}
