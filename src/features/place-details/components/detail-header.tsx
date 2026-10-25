import { Icon, type IconName, Typography } from '@/components'
import { formatDistance } from '@/lib'
import type { Place } from '@/types/place'
import { View } from 'react-native'

const CATEGORY_ICON: Record<string, IconName> = {
    Nature: 'leaf',
    Beaches: 'waves',
    Beach: 'waves',
    Culture: 'landmark',
    Cafés: 'coffee',
    Walks: 'footprints',
}

type DetailHeaderProps = {
    place: Place
    tag: string
    openNow: boolean
    address: string
}

export function DetailHeader({ place, tag, openNow, address }: DetailHeaderProps) {
    return (
        <View>
            <View className="flex-row gap-2">
                <View className="flex-row items-center gap-1.5 rounded-full bg-sage-soft px-3 py-1.75">
                    <Icon name={CATEGORY_ICON[place.category] ?? 'leaf'} size={14} color="forest" />
                    <Typography className="text-xs font-medium leading-4 text-forest">{tag}</Typography>
                </View>
                <View className="flex-row items-center gap-1.5 rounded-full bg-white px-3 py-1.75">
                    <Icon name="clock" size={14} />
                    <Typography className="text-xs font-medium leading-4">{openNow ? 'Open now' : 'Closed'}</Typography>
                </View>
            </View>

            <Typography className="mt-3.5 text-[28px] font-medium leading-[34px] tracking-[-0.84px]">{place.name}</Typography>

            <View className="mt-2 flex-row items-center gap-1.5">
                <Icon name="map-pin" size={15} color="ink-muted" />
                <Typography className="text-[13px] leading-[18px] text-ink-muted">
                    {address} · {formatDistance(place.distanceKm)} away
                </Typography>
            </View>
        </View>
    )
}
