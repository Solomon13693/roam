import { Icon, IconButton, Image, LinearGradient, Typography } from '@/components'
import type { Trip } from '@/types/place'
import { router } from 'expo-router'
import { View } from 'react-native'

export function TripCover({ trip }: { trip: Trip }) {
    return (
        <View className="h-82.5">
            <Image source={trip.cover} contentFit="cover" transition={300} className="absolute inset-0" />
            <LinearGradient colors={['#0000004D', '#00000000', '#000000BF']} locations={[0, 0.4, 1]} className="absolute inset-0" />

            <View className="mt-1.5 flex-row items-center justify-between px-5 pt-safe">
                <IconButton icon="chevron-left" accessibilityLabel="Back" onPress={() => router.back()} className="size-11" />
                <View className="flex-row gap-2.5">
                    <IconButton icon="share" accessibilityLabel="Share trip" className="size-11" />
                    <IconButton icon="more" accessibilityLabel="More options" className="size-11" />
                </View>
            </View>

            <View className="absolute bottom-11 left-6 gap-2">
                <View className="flex-row items-center gap-1.5 self-start rounded-full bg-lime px-3 py-1.5">
                    <Icon name="calendar" size={14} color="forest-deep" />
                    <Typography className="text-xs font-medium leading-4 text-forest-deep">{trip.dateDetail ?? trip.date}</Typography>
                </View>
                <Typography className="text-[32px] font-medium leading-[38px] tracking-[-0.96px] text-white">{trip.title}</Typography>
            </View>
        </View>
    )
}
