import { Icon } from '@/components/icon'
import { Image, Typography } from '@/components/ui'
import { formatDistance } from '@/lib'
import type { Place } from '@/types/place'
import { Pressable, View } from 'react-native'

type PlaceRowProps = {
    place: Place
    onPress?: () => void
    onSave?: () => void
}

const PlaceRow = ({ place, onPress, onSave }: PlaceRowProps) => {
    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={`${place.name}, ${place.category}, ${formatDistance(place.distanceKm)}`}
            className="flex-row items-center gap-3.5 rounded-3xl bg-white py-2.5 pl-2.5 pr-3.5 shadow-[0_4px_16px_rgba(18,20,19,0.05)] active:opacity-90">
            <Image source={place.photo} contentFit="cover" transition={300} className="size-21 rounded-[18px]" />

            <View className="flex-1 gap-0.75">
                <Typography className="text-xs font-medium leading-4 text-forest">{place.category}</Typography>
                <Typography numberOfLines={2} className="text-[17px] font-semibold leading-[22px] tracking-[-0.17px]">
                    {place.name}
                </Typography>
                <Typography className="text-[13px] leading-[18px] text-ink-muted">
                    {place.area} · {formatDistance(place.distanceKm)}
                </Typography>
            </View>

            <Pressable
                onPress={onSave}
                hitSlop={10}
                accessibilityRole="button"
                accessibilityLabel={place.saved ? 'Remove from saved' : 'Save'}
                className="active:opacity-60">
                <Icon name={place.saved ? 'bookmark-filled' : 'bookmark'} size={22} />
            </Pressable>
            
        </Pressable>
    )
}

export default PlaceRow
