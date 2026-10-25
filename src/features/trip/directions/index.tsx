import { AppSheetRef, Button, Icon, IconButton, Typography } from '@/components'
import { useWatchLocation } from '@/hooks'
import { Mapbox } from '@/lib'
import { getRoute, RouteResult } from '@/service'
import { MarkerView } from '@rnmapbox/maps'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AllSteps, EndTrip } from './components'
import { colors } from '@/constants/colors'
import { findPlace, findPlaceCoordinate } from '@/data/places'
import { formatArrival, formatMeters, formatMinutes, getProgress, stepIcon, stepText } from './navigation'

export const DirectionsView = ({ placeId }: { placeId?: string }) => {
    const place = placeId ? findPlace(placeId) : undefined
    const destination = placeId ? findPlaceCoordinate(placeId) : undefined
    const [routes, setRoute] = useState<RouteResult | null>(null)
    const [open, setOpen] = useState(false)
    const [failed, setFailed] = useState(false)
    const sheet = useRef<AppSheetRef>(null)
    const inset = useSafeAreaInsets()
    const { coordinate } = useWatchLocation()
    const requested = useRef(false)
    const cameraRef = useRef<Mapbox.Camera>(null)

    const loading = !routes && !failed && !!destination
    const steps = routes?.legs[0]?.steps ?? []
    const nav = routes ? getProgress(routes, coordinate) : null
    const current = nav ? steps[nav.activeIndex] : undefined
    const then = nav ? steps[nav.activeIndex + 1] : undefined

    useEffect(() => {
        if (!coordinate) return
        cameraRef.current?.setCamera({
            centerCoordinate: coordinate,
            zoomLevel: 16,
            animationDuration: 1000,
        })
    }, [coordinate])

    const recenterMap = () => {
        if (!coordinate) return
        cameraRef.current?.setCamera({ centerCoordinate: coordinate, zoomLevel: 16, animationDuration: 800 })
    }

    useEffect(() => {
        if (!coordinate || !destination || requested.current) return
        requested.current = true
        getRoute(coordinate, destination)
            .then(setRoute)
            .catch((e) => {
                console.log(e)
                setFailed(true)
            })
    }, [coordinate, destination])

    return (
        <>
            <View className="flex-1 bg-paper pt-safe">
                <StatusBar style="dark" />

                <View className="bg-white rounded-[26px] shadow-[0px_8px_24px_0px_#1217141A] overflow-hidden z-1 mx-6">
                    <View className="flex-row items-start gap-3 p-4">
                        <View
                            className="items-center justify-center bg-forest
                    rounded-[18px] size-14">
                            <Icon name={current ? stepIcon(current) : 'arrow-up'} size={30} color="white" />
                        </View>

                        <View className="flex-1 gap-y-0.5">
                            <Typography className="text-ink text-[26px] font-medium">{nav ? formatMeters(nav.toNext) : '–'}</Typography>
                            <Typography className="text-ink-muted text-[14px]">{current ? stepText(current) : 'Finding your route…'}</Typography>
                        </View>
                    </View>

                    {then ? (
                        <View className="flex-row items-center gap-x-1 bg-sage-soft p-4">
                            <Typography className="text-ink text-[13px]">Then</Typography>
                            <Typography className="flex-1 text-ink text-[13px]" numberOfLines={1}>
                                {stepText(then)}
                                {then.distance > 0 ? ` · ${formatMeters(then.distance)}` : ''}
                            </Typography>
                        </View>
                    ) : null}
                </View>

                <Mapbox.MapView style={StyleSheet.absoluteFill} styleURL={Mapbox.StyleURL.Street} scaleBarEnabled={false}>
                    <Mapbox.Camera
                        ref={cameraRef}
                        defaultSettings={{
                            centerCoordinate: coordinate || [1, 2],
                            zoomLevel: 16,
                        }}
                    />

                    {coordinate && (
                        <MarkerView coordinate={coordinate} anchor={{ x: 0.5, y: 0.8 }} allowOverlap>
                            <View className="items-center justify-center bg-[#4285F5]/14 size-14 rounded-full">
                                <View className="items-center justify-center bg-white rounded-full size-8">
                                    <Icon name="location-arrow" color="forest" size={22} />
                                </View>
                            </View>
                        </MarkerView>
                    )}

                    {destination && (
                        <Mapbox.MarkerView id="destination-marker" coordinate={destination} anchor={{ x: 0.5, y: 1 }} allowOverlap>
                            <View className="items-center">
                                <View className="items-center justify-center bg-red-500 size-11 rounded-full rounded-bl-none rotate-45">
                                    <View className="-rotate-45">
                                        <Icon name="flag" color="white" size={22} />
                                    </View>
                                </View>
                            </View>
                        </Mapbox.MarkerView>
                    )}

                    {routes && (
                        <Mapbox.ShapeSource id="route-source" shape={routes.geometry}>
                            <Mapbox.LineLayer
                                id="route-line"
                                style={{
                                    lineColor: colors.forest,
                                    lineWidth: 7,
                                    lineCap: 'round',
                                    lineJoin: 'round',
                                }}
                            />
                        </Mapbox.ShapeSource>
                    )}
                </Mapbox.MapView>

                {loading && (
                    <View pointerEvents="none" className="absolute inset-x-0 top-1/2 z-1 items-center">
                        <View className="flex-row items-center gap-x-2 rounded-pill bg-white px-4 py-3 shadow-[0px_8px_24px_0px_#1217141A]">
                            <ActivityIndicator color={colors.forest} />
                            <Typography className="text-[13px] text-ink">Finding the best route…</Typography>
                        </View>
                    </View>
                )}

                <View className="absolute right-6 bottom-[28%] z-1 gap-y-3">
                    <IconButton accessibilityLabel="route" icon="route" className="size-[48px]" onPress={() => sheet.current?.open()} />
                    <IconButton accessibilityLabel="route" icon="locate" className="size-[48px]" onPress={recenterMap} />
                </View>

                <View className="bg-paper rounded-[30px] -mt-10 absolute bottom-0 inset-x-0 px-6 pt-6 gap-y-6" style={{ paddingBottom: inset.bottom }}>
                    <View className="flex-row items-center justify-between gap-2">
                        <View>
                            <View className="flex-row items-center gap-x-2">
                                <Typography className="text-[30px] font-medium text-forest">{nav ? formatMinutes(nav.remainingDuration) : '–'}</Typography>
                                <Typography className="text-ink-muted font-medium text-[15px]">· {nav ? formatMeters(nav.remainingDistance) : '–'}</Typography>
                            </View>

                            <Typography className="text-ink-muted text-[13px]">
                                {nav ? `Arrive ${formatArrival(nav.remainingDuration)} · ` : ''}
                                {place?.name ?? 'Unknown place'}
                            </Typography>
                        </View>

                        <IconButton accessibilityLabel="share" icon="share" className="shadow-none bg-sand-soft" />
                    </View>

                    <View className="bg-line h-2 rounded-pill relative overflow-hidden">
                        <View className="bg-forest absolute z-10 h-2 rounded-pill" style={{ width: `${Math.round((nav?.progress ?? 0) * 100)}%` }} />
                    </View>

                    <View className="flex-row items-center gap-4">
                        <Button
                            variant="outline"
                            fullWidth
                            className="w-1/2 bg-white"
                            textClassName="text-ink"
                            icon="route"
                            onPress={() => sheet.current?.open()}>
                            All steps
                        </Button>
                        <Button onPress={() => setOpen(true)} fullWidth className="w-1/2" icon="x">
                            End
                        </Button>
                    </View>
                </View>
            </View>

            <EndTrip
                open={open}
                setOpen={() => setOpen(false)}
                onEnd={() => (router.canGoBack() ? router.back() : router.replace('/explore'))}
                remaining={nav ? formatMeters(nav.remainingDistance) : undefined}
                placeName={place?.name}
            />

            <AllSteps ref={sheet} onClose={() => sheet.current?.close()} steps={steps} activeIndex={nav?.activeIndex ?? 0} loading={loading} />
        </>
    )
}
