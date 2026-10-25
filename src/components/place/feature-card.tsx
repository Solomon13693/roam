import { IconButton, Image, Typography, Icon } from '@/components'
import { formatDistance } from '@/lib'
import type { Place } from '@/types/place'
import { Pressable, View } from 'react-native'

type FeatureCardProps = {
    place: Place
    onPress?: () => void
    onSave?: () => void
}

const FeatureCard = ({ place, onPress, onSave }: FeatureCardProps) => {
    return (
        <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`${place.name}, ${formatDistance(place.distanceKm)}`} className="h-82.5 w-full rounded-[30px] shadow-[0_10px_26px_rgba(18,20,19,0.10)] active:opacity-95">

            <View className="flex-1 overflow-hidden rounded-[30px]">

                <Image source={place.photo} contentFit="cover" transition={300} className="absolute inset-0" />

                <View className="flex-row items-start justify-between p-3.5">
                    {place.travelTime ? (
                        <View className="flex-row items-center gap-1.5 rounded-full bg-white py-2 pl-3 pr-3.5">
                            <Icon name="clock" size={15} />
                            <Typography className="text-xs font-medium leading-4">{place.travelTime}</Typography>
                        </View>
                    ) : (
                        <View />
                    )}

                    <IconButton
                        icon={place.saved ? 'bookmark-filled' : 'bookmark'}
                        accessibilityLabel={place.saved ? 'Remove from saved' : 'Save'}
                        iconColor="ink"
                        className="size-11"
                        onPress={onSave}
                    />
                </View>

                <View className="mx-3 mb-3 mt-auto gap-1 rounded-[22px] bg-white px-4.5 py-4">
                    <View className="flex-row items-center justify-between">
                        <Typography className="text-[19px] font-semibold leading-[22px] tracking-[-0.19px]">{place.name}</Typography>
                        <Typography className="font-semibold text-forest">{formatDistance(place.distanceKm)}</Typography>
                    </View>
                    {place.summary ? <Typography className="text-[13px] leading-[18px] text-ink-muted">{place.summary}</Typography> : null}
                </View>

            </View>

        </Pressable>
    )
}

export default FeatureCard
