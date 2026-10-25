import { Icon, type IconName, Typography } from '@/components'
import type { Trip } from '@/types/place'
import { View } from 'react-native'

function Stat({ icon, label, value }: { icon: IconName; label: string; value: string }) {
    return (
        <View className="items-center gap-1">
            <Icon name={icon} size={20} color="forest" />
            <Typography className="text-xs font-medium leading-4 text-ink-muted">{label}</Typography>
            <Typography className="font-semibold">{value}</Typography>
        </View>
    )
}

export function RouteStats({ trip }: { trip: Trip }) {
    return (
        <View className="mt-3 flex-row justify-between rounded-[20px] bg-white px-4.5 py-3.5 shadow-[0_2px_12px_rgba(18,20,19,0.05)]">
            <Stat icon="clock" label="Total time" value={`${trip.totalHours} hrs`} />
            <Stat icon="route" label="Distance" value={`${trip.distanceKm} km`} />
            <Stat icon="map-pin" label="In order" value={`${trip.stops.length} stops`} />
        </View>
    )
}
