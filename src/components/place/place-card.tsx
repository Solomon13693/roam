import { Image, Typography } from '@/components/ui'
import { formatDistance } from '@/lib'
import type { Place } from '@/types/place'
import { Pressable, View } from 'react-native'

type PlaceCardProps = {
    place: Place
    onPress?: () => void
}

const PlaceCard = ({ place, onPress }: PlaceCardProps) => {
    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={`${place.name}, ${place.category}, ${formatDistance(place.distanceKm)}`}
            className="w-42 gap-2.5 active:opacity-90">
            <View className="h-60 overflow-hidden rounded-3xl">
                <Image source={place.photo} contentFit="cover" transition={300} className="absolute inset-0" />
                <View className="m-2.5 self-start rounded-full bg-paper px-2.5 py-1.25">
                    <Typography className="text-xs font-medium leading-4">{formatDistance(place.distanceKm)}</Typography>
                </View>
            </View>

            <View className="gap-0.5">
                <Typography numberOfLines={1} className="text-[17px] font-semibold leading-[22px] tracking-[-0.17px]">
                    {place.name}
                </Typography>
                <Typography numberOfLines={1} className="text-[13px] leading-[18px] text-ink-muted">
                    {place.category} · {place.area}
                </Typography>
            </View>
        </Pressable>
    )
}

export default PlaceCard
