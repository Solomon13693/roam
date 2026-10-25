import { IconButton, Image, Typography } from '@/components'
import { formatDistance } from '@/lib'
import type { Place } from '@/types/place'
import { Pressable, useWindowDimensions, View } from 'react-native'

const SIDE_PADDING = 24
const COLUMN_GAP = 15

type SavedPlaceCardProps = {
    place: Place
    onPress?: () => void
    onRemove?: () => void
}

export function SavedPlaceCard({ place, onPress, onRemove }: SavedPlaceCardProps) {

    const { width } = useWindowDimensions()
    const cardWidth = (width - SIDE_PADDING * 2 - COLUMN_GAP) / 2

    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={`${place.name}, ${place.category}, ${formatDistance(place.distanceKm)}`}
            style={{ width: cardWidth }}
            className="gap-2 active:opacity-90">
            <View className="h-[190px] min-w-[170px] overflow-hidden rounded-3xl">
                <Image source={place.photo} contentFit="cover" transition={300} className="absolute inset-0" />
                <IconButton
                    icon="bookmark-filled"
                    accessibilityLabel="Remove from saved"
                    iconColor='forest'
                    onPress={onRemove}
                    className="absolute right-2.5 top-2.5 size-9"
                />
            </View>

            <View className="px-1">
                <Typography numberOfLines={1} className="font-semibold">
                    {place.name}
                </Typography>
                <Typography numberOfLines={1} className="text-[13px] leading-[18px] text-ink-muted">
                    {place.category} · {formatDistance(place.distanceKm)}
                </Typography>
            </View>
        </Pressable>
    )
}
