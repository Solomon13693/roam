import { Image, Typography } from '@/components'
import { Pressable, View } from 'react-native'
import { type TripStop, formatStay, formatTime } from '../trip-basics'

type StopRowProps = {
    stop: TripStop
    index: number
    onPress: () => void
}

export function StopRow({ stop, index, onPress }: StopRowProps) {
    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={`Stop ${index + 1}, ${stop.place.name}, ${formatTime(stop.arriveAt)}`}
            className="flex-row items-center gap-3 rounded-[22px] bg-white p-3.5 shadow-[0_4px_14px_0px_#1217140D] active:opacity-90">
            <View className="size-7 items-center justify-center rounded-full bg-forest">
                <Typography className="text-[13px] font-semibold text-white">{index + 1}</Typography>
            </View>
            <View className="flex-1">
                <Typography numberOfLines={2} className="font-semibold">
                    {stop.place.name}
                </Typography>
                <Typography className="text-[13px] text-ink-muted">
                    {formatTime(stop.arriveAt)} · {formatStay(stop.stayMinutes)}
                </Typography>
            </View>
            <Image source={stop.place.photo} contentFit="cover" className="size-12 rounded-xl" />
        </Pressable>
    )
}
