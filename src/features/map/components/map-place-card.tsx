import { Button, Icon, Image, Typography } from '@/components'
import { cn, formatDistance } from '@/lib'
import type { Place } from '@/types/place'
import { router } from 'expo-router'
import { View } from 'react-native'

export const MAP_CARD_WIDTH = 345

type MapPlaceCardProps = {
    place: Place
    selected: boolean
}

export function MapPlaceCard({ place, selected }: MapPlaceCardProps) {
    return (
        <View
            style={{ width: MAP_CARD_WIDTH }}
            className={cn(
                'flex-row items-center gap-3 rounded-3xl border-[1.5px] bg-white py-2.5 pl-2.5 pr-3.5 shadow-[0_4px_16px_rgba(18,20,19,0.06)]',
                selected ? 'border-forest' : 'border-transparent',
            )}>
            <Image source={place.photo} contentFit="cover" className="size-21 rounded-2xl" />

            <View className="flex-1 gap-1.5">
                <Typography numberOfLines={1} className="text-[17px] font-semibold leading-[22px] tracking-[-0.17px]">
                    {place.name}
                </Typography>

                <View className="flex-row items-center gap-3">
                    <View className="flex-row items-center gap-1">
                        <Icon name="map-pin" size={14} color="forest" />
                        <Typography className="text-[13px] leading-[18px] text-ink-muted">{formatDistance(place.distanceKm)}</Typography>
                    </View>
                    {place.travelMinutes ? (
                        <View className="flex-row items-center gap-1">
                            <Icon name="clock" size={14} color="forest" />
                            <Typography className="text-[13px] leading-[18px] text-ink-muted">{place.travelMinutes} min</Typography>
                        </View>
                    ) : null}
                </View>

                <Button fullWidth className="h-9.5" onPress={() => router.push(`/place/${place.id}`)}>
                    View details
                </Button>
            </View>
        </View>
    )
}
