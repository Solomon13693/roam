import { Icon, Image, LinearGradient, Typography } from '@/components'
import { router } from 'expo-router'
import { Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Welcome() {

    const inset = useSafeAreaInsets()

    return (
        <View className="flex-1 bg-forest">
            
            <Image source={require('@/assets/images/places/lufasi1_hi.jpg')} contentFit="cover" transition={300} className="absolute inset-0" />

            <LinearGradient colors={['#132A1C73', '#132A1C00']} className="absolute inset-x-0 top-0 h-40" />

            <LinearGradient colors={['#132A1C00', '#132A1CB8', '#132A1CF5']} locations={[0, 0.45, 1]} className="absolute inset-x-0 bottom-0 h-[65%]" />

            <View className="flex-row items-center justify-between px-6" style={{ paddingTop: inset.top + 10 }}>
                <View className="self-start rounded-2xl bg-forest p-3">
                    <Image source={require('@/assets/images/brand/logo.png')} contentFit="contain" transition={300} className="h-9 w-[117px]" />
                </View>

                <Pressable onPress={() => router.replace('/explore')} className="rounded-full bg-white/20 px-4 py-2 active:opacity-70">
                    <Typography className="text-xs font-semibold text-white">Skip</Typography>
                </Pressable>
            </View>

            <View className="mt-auto px-6" style={{ paddingBottom: inset.bottom + 10 }}>
                <View className="flex-row gap-1.5">
                    <View className="h-1 w-7 rounded-full bg-lime" />
                    <View className="h-1 w-3.5 rounded-full bg-white/40" />
                    <View className="h-1 w-3.5 rounded-full bg-white/40" />
                </View>

                <View className="mt-4.5 flex-row items-center gap-1.5">
                    <Icon name="map-pin" size={14} color="white" />
                    <Typography className="text-xs font-medium leading-4 text-white/85">Lake Moses, LUFASI Nature Park</Typography>
                </View>

                <Typography className="mt-5 text-[46px] font-medium leading-12 tracking-[-0.92px] text-white">
                    Find your next somewhere.
                </Typography>

                <Typography className="mt-3.5 leading-[22px] text-white/90">
                    Beaches, forests, galleries and quiet cafés within a short ride of you. Save what catches your eye and turn it into a day out.
                </Typography>

                <Pressable onPress={() => router.replace('/explore')} className="mt-7 h-16 flex-row items-center rounded-full bg-lime p-1.5 pr-5.5 active:opacity-90">

                    <View className="size-13 items-center justify-center rounded-full bg-forest-deep">
                        <Icon name="arrow-up-right" size={20} color="white" />
                    </View>

                    <Typography className="flex-1 text-center text-base font-semibold leading-5 text-forest-deep">Get started</Typography>

                </Pressable>

                <Pressable onPress={() => router.push('/sign-in')} className="mt-3.5 py-1 active:opacity-70">
                    <Typography className="text-center text-sm font-semibold text-white">I already have an account</Typography>
                </Pressable>
            </View>
        </View>
    )
}
