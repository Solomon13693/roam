import { IconButton, Typography } from '@/components'
import { colors } from '@/constants/colors'
import { Mapbox } from '@/lib'
import type { Trip } from '@/types/place'
import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

type RoutePreviewProps = {
    trip: Trip
    onNavigate?: () => void
}

export function RoutePreview({ trip, onNavigate }: RoutePreviewProps) {
    const points = trip.stops.flatMap((stop) => (stop.coordinate ? [stop.coordinate] : []))

    const bounds = useMemo(() => {
        const lngs = points.map((point) => point[0])
        const lats = points.map((point) => point[1])
        return {
            ne: [Math.max(...lngs), Math.max(...lats)] as [number, number],
            sw: [Math.min(...lngs), Math.min(...lats)] as [number, number],
        }
    }, [points])

    const line = useMemo(
        () => ({ type: 'Feature' as const, properties: {}, geometry: { type: 'LineString' as const, coordinates: points } }),
        [points],
    )

    return (
        <View className="h-44 overflow-hidden rounded-3xl bg-white shadow-[0_4px_16px_rgba(18,20,19,0.05)]">
            {points.length > 1 ? (
                <Mapbox.MapView
                    style={StyleSheet.absoluteFill}
                    styleURL={Mapbox.StyleURL.Light}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    rotateEnabled={false}
                    pitchEnabled={false}
                    scaleBarEnabled={false}
                    logoEnabled={false}
                    attributionEnabled={false}>
                    <Mapbox.Camera
                        defaultSettings={{
                            bounds: { ...bounds, paddingTop: 60, paddingBottom: 30, paddingLeft: 40, paddingRight: 40 },
                        }}
                    />
                    <Mapbox.ShapeSource id={`route-${trip.id}`} shape={line}>
                        <Mapbox.LineLayer
                            id={`route-line-${trip.id}`}
                            style={{ lineColor: colors.forest, lineWidth: 5, lineDasharray: [1, 1.2], lineCap: 'round' }}
                        />
                    </Mapbox.ShapeSource>
                    {points.map((point, index) => (
                        <Mapbox.MarkerView key={index} coordinate={point} allowOverlap>
                            <View className="size-7 items-center justify-center rounded-full border-2 border-white bg-forest">
                                <Typography className="text-xs font-semibold text-white">{index + 1}</Typography>
                            </View>
                        </Mapbox.MarkerView>
                    ))}
                </Mapbox.MapView>
            ) : null}

            <View className="absolute left-0 right-0 top-7.5 items-center" pointerEvents="none">
                <View className="rounded-[10px] bg-white px-2.5 py-1.5">
                    <Typography className="font-semibold">{trip.distanceKm} km</Typography>
                </View>
            </View>

            <IconButton icon="navigation" accessibilityLabel="Start navigation" onPress={onNavigate} className="absolute right-3 top-3 size-9" />
        </View>
    )
}
