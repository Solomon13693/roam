import { Image, Typography } from '@/components'
import { cn, formatDistance } from '@/lib'
import type { Place } from '@/types/place'
import { MarkerView } from '@rnmapbox/maps'
import { Pressable, View } from 'react-native'

type MarkerViewComponentsProps = {
    place: Place
    selected: boolean
    onPress: () => void
}

const MarkerViewComponents = ({ place, selected, onPress }: MarkerViewComponentsProps) => {
    
    if (!place.coordinate) return null

    return (
        <MarkerView coordinate={place.coordinate} anchor={{ x: 0.5, y: 0.8 }} allowOverlap>
            <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={place.name} className="items-center">
                {selected ? (
                    <View className="mb-1.5 rounded-full bg-forest px-2.5 py-1">
                        <Typography className="text-xs font-bold text-white">{formatDistance(place.distanceKm)}</Typography>
                    </View>
                ) : null}

                <View className={cn(
                        'p-0.75 z-1 shadow-[0_6px_14px_rgba(13,26,18,0.13)]',
                        selected ? 'rounded-[22px] bg-forest' : 'rounded-[18px] bg-white',
                    )}>
                    <Image
                        source={place.photo}
                        contentFit="cover"
                        className={selected ? 'size-16 rounded-[19px]' : 'size-12.5 rounded-[15px]'}
                    />
                </View>

                <View className={cn('-mt-1.5 size-3 rotate-45', selected ? 'bg-forest' : 'bg-white')} />
            </Pressable>
        </MarkerView>
    )
}

export default MarkerViewComponents
