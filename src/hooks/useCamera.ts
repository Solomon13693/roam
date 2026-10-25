import { type CameraCapturedPicture, type CameraType, type CameraView, type FlashMode, useCameraPermissions } from 'expo-camera'
import { type ComponentRef, useCallback, useRef, useState } from 'react'
import { Linking } from 'react-native'

export function useCamera() {
    
    const [permission, requestPermission] = useCameraPermissions()
    const [facing, setFacing] = useState<CameraType>('back')
    const [flash, setFlash] = useState<FlashMode>('off')
    const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null)
    const ref = useRef<ComponentRef<typeof CameraView>>(null)

    const granted = permission?.granted ?? false
    const canAskAgain = permission?.canAskAgain ?? true

    const askPermission = useCallback(async () => {
        if (canAskAgain) await requestPermission()
        else await Linking.openSettings()
    }, [canAskAgain, requestPermission])

    const flip = useCallback(() => setFacing((current) => (current === 'back' ? 'front' : 'back')), [])
    const toggleFlash = useCallback(() => setFlash((current) => (current === 'off' ? 'on' : 'off')), [])

    const takePhoto = useCallback(async () => {
        const picture = await ref.current?.takePictureAsync({ quality: 0.8 })
        if (picture) setPhoto(picture)
        return picture ?? null
    }, [])

    const retake = useCallback(() => setPhoto(null), [])

    return {
        ref,
        ready: permission !== null,
        granted,
        canAskAgain,
        askPermission,
        facing,
        flip,
        flash,
        toggleFlash,
        photo,
        takePhoto,
        retake,
    }
}
