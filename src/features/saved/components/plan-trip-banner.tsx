import { Icon, Typography } from '@/components'
import { Pressable, View } from 'react-native'

export function PlanTripBanner({ onPress }: { onPress: () => void }) {
    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            className="flex-row items-center gap-4 rounded-[26px] bg-forest py-4 pl-4 pr-5 active:opacity-90">
            <View className="size-15 items-center justify-center rounded-full bg-lime">
                <Icon name="plus" size={26} color="forest-deep" />
            </View>
            <View className="flex-1 gap-0.5">
                <Typography className="text-[19px] font-semibold leading-6 text-white">Plan a new trip</Typography>
                <Typography className="text-[13px] leading-[18px] text-white/70">Pick a day, add places, get a route</Typography>
            </View>
            <Icon name="chevron-right" size={22} color="white" />
        </Pressable>
    )
}
