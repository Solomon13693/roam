import '@/global.css'
import '@/lib'
import { Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, useFonts } from '@expo-google-fonts/manrope'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {

    const [loaded, error] = useFonts({
        Manrope_400Regular,
        Manrope_500Medium,
        Manrope_600SemiBold,
        Manrope_700Bold,
    })

    useEffect(() => {
        if (error) console.error('Manrope failed to load, falling back to the system font:', error)
        if (loaded || error) SplashScreen.hideAsync()
    }, [loaded, error])

    if (!loaded && !error) return null

    const isLoggedIn = true

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Protected guard={!isLoggedIn}>
                        <Stack.Screen name="index" />
                        <Stack.Screen name="(auth)" />
                    </Stack.Protected>

                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="place/[id]" />
                    <Stack.Screen name="search" />

                    <Stack.Protected guard={isLoggedIn}>
                        <Stack.Screen name="trip/new" />
                        <Stack.Screen name="trip/[id]" />
                        <Stack.Screen name="trip/directions" />
                        <Stack.Screen name="notes/index" />
                        <Stack.Screen name="camera" options={{ presentation: 'fullScreenModal' }} />
                    </Stack.Protected>
                </Stack>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
}
