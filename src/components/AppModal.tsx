import { type ReactNode, useEffect, useState } from 'react'
import { Modal, Pressable, StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'

type AppModalProps = {
    visible: boolean
    onClose: () => void
    children: ReactNode
    dismissOnBackdrop?: boolean
}

export function AppModal({ visible, onClose, children, dismissOnBackdrop = true }: AppModalProps) {
    const [mounted, setMounted] = useState(visible)
    const progress = useSharedValue(0)

    if (visible && !mounted) setMounted(true)

    useEffect(() => {
        if (visible) {
            progress.value = withSpring(1, { damping: 18, stiffness: 220 })
        } else {
            progress.value = withTiming(0, { duration: 180 }, (finished) => {
                if (finished) scheduleOnRN(setMounted, false)
            })
        }
    }, [visible, progress])

    const backdropStyle = useAnimatedStyle(() => ({ opacity: progress.value }))

    const cardStyle = useAnimatedStyle(() => ({
        opacity: progress.value,
        transform: [{ scale: 0.9 + progress.value * 0.1 }, { translateY: (1 - progress.value) * 20 }],
    }))

    return (
        <Modal visible={mounted} transparent animationType="none" statusBarTranslucent onRequestClose={onClose}>
            <Animated.View style={[StyleSheet.absoluteFill, backdropStyle]} className="bg-ink/45">
                <Pressable style={StyleSheet.absoluteFill} onPress={dismissOnBackdrop ? onClose : undefined} />
            </Animated.View>

            <View pointerEvents="box-none" className="flex-1 items-center justify-center p-6">
                <Animated.View style={cardStyle} className="w-full max-w-100 rounded-3xl bg-white p-6 shadow-[0_12px_32px_rgba(18,20,19,0.18)]">
                    {children}
                </Animated.View>
            </View>
        </Modal>
    )
}
