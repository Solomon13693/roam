import { IconButton, Image, LinearGradient, Typography } from '@/components'
import { colors } from '@/constants/colors'
import type { Place } from '@/types/place'
import { router } from 'expo-router'
import { View } from 'react-native'

type DetailHeroProps = {
    place: Place
    photoCount: number
    saved: boolean
    onToggleSave: () => void
}

export function DetailHero({ place, photoCount, saved, onToggleSave }: DetailHeroProps) {
    return (
        <View className="h-120">

            <Image source={place.photo} contentFit="cover" transition={300} className="absolute inset-0" />

            <LinearGradient colors={['#00000059', '#00000000']} className="absolute inset-x-0 top-0 h-35" />

            <View className="mt-1.5 flex-row items-center justify-between px-5 pt-safe">
                <IconButton icon="chevron-left" accessibilityLabel="Back" onPress={() => router.back()} className="size-11" />
                <View className="flex-row gap-2.5">
                    <IconButton icon="share" accessibilityLabel="Share" className="size-11" />
                    <IconButton
                        icon={saved ? 'bookmark-filled' : 'bookmark'}
                        iconColor={colors.forest}
                        accessibilityLabel={saved ? 'Remove from saved' : 'Save'}
                        onPress={onToggleSave}
                        className="size-11"
                    />
                </View>
            </View>

            {photoCount > 1 ? (
                <View className="absolute bottom-12.5 right-5 rounded-full bg-ink/55 px-3 py-1.75">
                    <Typography className="text-xs font-medium leading-4 text-white">1 / {photoCount}</Typography>
                </View>
            ) : null}
            
        </View>
    )
}
