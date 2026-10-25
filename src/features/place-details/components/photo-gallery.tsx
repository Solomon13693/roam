import { Image, Typography } from '@/components'
import type { Place } from '@/types/place'
import { Pressable, View } from 'react-native'

type PhotoGalleryProps = {
    photos: Place['photo'][]
    total: number
    onSeeAll?: () => void
}

export function PhotoGallery({ photos, total, onSeeAll }: PhotoGalleryProps) {
    const shown = photos.slice(0, 3)
    const more = total - shown.length

    return (
        <View className="mt-5.5">
            <View className="flex-row items-center justify-between">
                <Typography className="text-[17px] font-semibold leading-[22px] tracking-[-0.17px]">Photos</Typography>
                {onSeeAll ? (
                    <Pressable onPress={onSeeAll} hitSlop={8} className="active:opacity-70">
                        <Typography className="font-semibold text-forest">See all</Typography>
                    </Pressable>
                ) : null}
            </View>

            <View className="mt-2.5 flex-row gap-2.5">
                {shown.map((photo, index) => (
                    <View key={index} className="h-30 flex-1 overflow-hidden rounded-[18px]">
                        <Image source={photo} contentFit="cover" className="absolute inset-0" />
                        {index === shown.length - 1 && more > 0 ? (
                            <View className="absolute inset-0 items-center justify-center bg-ink/55">
                                <Typography className="text-[17px] font-semibold text-white">+{more}</Typography>
                            </View>
                        ) : null}
                    </View>
                ))}
            </View>
        </View>
    )
}
