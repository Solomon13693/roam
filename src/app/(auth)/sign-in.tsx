import { Button, IconButton, Image, LinearGradient, Typography } from '@/components'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function SignIn() {
    const inset = useSafeAreaInsets()

    return (
        <View className="flex-1 bg-paper">
            
            <StatusBar style="light" />

            <View className="flex-1 p-6" style={{ paddingTop: inset.top + 10 }}>

                <Image source={require('@/assets/images/places/elegushi1.jpg')} contentFit="cover" transition={300} className="absolute inset-0" />
                <LinearGradient colors={['#0000004D', '#00000000', '#0000008C']} locations={[0, 0.45, 1]} className="absolute inset-0" />

                <IconButton icon="chevron-left" accessibilityLabel="Back" onPress={() => router.back()} />

                <View className="absolute bottom-17 left-6">
                    <Image source={require('@/assets/images/brand/logo.png')} contentFit="contain" className="h-9 w-[117px]" />
                    <Typography className="mt-2.5 text-xs font-medium leading-4 text-white/85">Golden hour, Elegushi Beach</Typography>
                </View>
            </View>

            <View className="-mt-10 rounded-t-[32px] bg-paper px-6 pt-7" style={{ paddingBottom: inset.bottom + 18 }}>
                <Typography className="text-[26px] font-semibold leading-8 tracking-[-0.52px]">Keep your places with you</Typography>
                <Typography className="mt-1.5 text-ink-muted">Sign in to sync saved places, trips and field notes.</Typography>

                <View className="mt-5.5 gap-2.5">
                    <Button className="h-13.5 w-full bg-ink" icon="apple">
                        Continue with Apple
                    </Button>

                    <Button variant="outline" className="h-13.5 w-full border border-line" icon="google">
                        Continue with Google
                    </Button>

                    <Button variant="outline" className="h-13.5 w-full border border-line" icon="mail" onPress={() => router.push('/signup')}>
                        Continue with email
                    </Button>
                </View>

                <View className="mt-4 flex-row items-center justify-center gap-1.5">
                    <Typography className="text-ink-muted">Just looking?</Typography>
                    <Pressable onPress={() => router.replace('/explore')} className="py-2 active:opacity-70">
                        <Typography className="font-semibold leading-5 text-forest underline">Continue as guest</Typography>
                    </Pressable>
                </View>

                <Typography className="mt-3.5 text-center text-xs font-medium leading-4 text-ink-muted">
                    By continuing you agree to Roam’s Terms and Privacy Policy.
                </Typography>
            </View>

        </View>
    )
}
