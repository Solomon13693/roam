import { Button, Icon, IconButton, Image, TextArea, Typography } from '@/components'
import { useCamera } from '@/hooks'
import { CameraView as ExpoCamera } from 'expo-camera'
import { router } from 'expo-router'
import { useEffect } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from 'react-native'

const CameraView = () => {
    const { ref, ready, granted, canAskAgain, askPermission, facing, flash, takePhoto, retake, flip, toggleFlash, photo } = useCamera()

    useEffect(() => {
        if (ready && !granted && canAskAgain) askPermission()
    }, [ready, granted, canAskAgain, askPermission])

    return (
        <View className="flex-1 bg-paper">

            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                <Pressable className="flex-1" onPress={Keyboard.dismiss} accessible={false}>

                <View className="flex-1 px-6 pt-safe">
                    {photo ? (
                        <Image source={{ uri: photo.uri }} contentFit="cover" style={StyleSheet.absoluteFill} />
                    ) : granted ? (
                        <ExpoCamera ref={ref} style={StyleSheet.absoluteFill} facing={facing} flash={flash} enableTorch={flash === 'on' && facing === 'back'} />
                    ) : ready ? (
                        <View style={StyleSheet.absoluteFill} className="justify-center bg-forest/60"></View>
                    ) : null}

                    <View className="flex-row items-center justify-between">
                        <IconButton accessibilityLabel="Close" icon="x" onPress={() => router.back()} />
                        {granted ? (
                            <IconButton
                                accessibilityLabel={flash === 'on' ? 'Turn flash off' : 'Turn flash on'}
                                icon="flash"
                                iconColor={flash === 'on' ? 'forest' : 'ink'}
                                onPress={toggleFlash}
                            />
                        ) : null}
                    </View>

                    {granted ? (
                        <View className="absolute inset-x-0 bottom-14 items-center">
                            <View className="flex-row items-center gap-1 rounded-full bg-ink px-4 py-3">
                                <Icon name="map-pin" size={14} color="lime" />
                                <Typography className="text-xs text-white">Lagos Lagoon, Ikoyi</Typography>
                            </View>
                        </View>
                    ) : null}
                </View>

                <View className="-mt-10 gap-y-4 rounded-[32px] bg-paper px-6 pb-safe pt-7">
                    <View className="flex-row items-center justify-between gap-2">
                        <View className="size-14 overflow-hidden rounded-[14px] bg-sand-soft">
                            {photo ? <Image source={{ uri: photo.uri }} contentFit="cover" className="h-full w-full" /> : null}
                        </View>

                        <Pressable
                            onPress={photo ? retake : takePhoto}
                            disabled={!granted}
                            accessibilityRole="button"
                            accessibilityLabel={photo ? 'Retake photo' : 'Take photo'}
                            className="size-[76px] items-center justify-center rounded-full border-5 border-forest p-3 active:opacity-70 disabled:opacity-40">
                            <View className="size-[60px] rounded-full bg-forest" />
                        </Pressable>

                        <IconButton
                            onPress={flip}
                            disabled={!granted}
                            accessibilityLabel="Flip camera"
                            icon="flip-camera"
                            className="size-14 bg-sand-soft shadow-none"
                        />
                    </View>

                    <View className="gap-y-2 rounded-[20px] bg-white p-5 shadow-[0px_2px_10px_0px_#1217140D]">
                        <Typography className="text-sm font-medium text-ink-muted">Caption</Typography>
                        <TextArea formGroupClass="mb-0" name="caption" className="min-h-5 border-0 px-0" placeholder="Enter caption for photo" />
                    </View>

                    <Button onPress={Keyboard.dismiss} fullWidth disabled={!photo}>
                        Save to field notes
                    </Button>
                </View>

                </Pressable>

            </KeyboardAvoidingView>

        </View>
    )
}

export default CameraView
