import { IconButton, SearchField, SectionHeader } from '@/components'
import { MAP_PLACES } from '@/data/places'
import { useCurrentLocation } from '@/hooks'
import { Mapbox } from '@/lib'
import type { Place } from '@/types/place'
import { type ComponentRef, useEffect, useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { MarkerViewComponents } from './components'
import { MAP_CARD_WIDTH, MapPlaceCard } from './components/map-place-card'

const GAP = 24
const DEFAULT_COORDINATE: [number, number] = [3.3792, 6.5244]

const MapView = () => {

    const { coordinate } = useCurrentLocation()
    const cameraRef = useRef<ComponentRef<typeof Mapbox.Camera>>(null)
    const list = useRef<FlatList<Place>>(null)
    const [selectedId, setSelectedId] = useState(MAP_PLACES[0].id)

    useEffect(() => {
        if (!coordinate) return
        cameraRef.current?.setCamera({ centerCoordinate: coordinate, zoomLevel: 12, animationDuration: 800 })
    }, [coordinate])

    const recenterMap = () => {
        if (!coordinate) return
        cameraRef.current?.setCamera({ centerCoordinate: coordinate, zoomLevel: 12, animationDuration: 800 })
    }

    const flyTo = (place: Place) => {
        if (!place.coordinate) return
        cameraRef.current?.setCamera({
            centerCoordinate: place.coordinate,
            zoomLevel: 14,
            padding: { paddingTop: 120, paddingBottom: 320, paddingLeft: 0, paddingRight: 0 },
            animationDuration: 800,
        })
    }

    const selectFromMap = (place: Place) => {
        setSelectedId(place.id)
        flyTo(place)
        list.current?.scrollToIndex({ index: MAP_PLACES.indexOf(place), animated: true })
    }

    const selectFromList = (place: Place) => {
        if (place.id === selectedId) return
        setSelectedId(place.id)
        flyTo(place)
    }

    return (
        <View className="flex-1 bg-paper pt-safe">
            <SearchField placeholder="Search this area" className="bg-white rounded-full" formGroupClass="z-10 px-6" />

            <Mapbox.MapView style={StyleSheet.absoluteFill} styleURL={Mapbox.StyleURL.Street} scaleBarEnabled={false}>
                <Mapbox.Camera ref={cameraRef} defaultSettings={{ centerCoordinate: coordinate ?? DEFAULT_COORDINATE, zoomLevel: 13 }} />

                {MAP_PLACES.map((place) => (
                    <MarkerViewComponents key={place.id} place={place}
                    selected={place.id === selectedId} onPress={() => selectFromMap(place)} />
                ))}
            </Mapbox.MapView>

            <View className="mt-auto w-full gap-y-4 rounded-t-[30px] bg-paper pb-32 pt-6">

                <IconButton icon="locate" accessibilityLabel="Show my location" onPress={recenterMap} className="absolute -top-16 right-6" />

                <View className="px-6">
                    <SectionHeader title="Nearby places" actionLabel="See all" onActionPress={() => {}} />
                </View>

                <FlatList
                    ref={list}
                    data={MAP_PLACES}
                    horizontal
                    keyExtractor={(place) => place.id}
                    renderItem={({ item }) => <MapPlaceCard place={item} selected={item.id === selectedId} />}
                    ItemSeparatorComponent={() => <View style={{ width: GAP }} />}
                    snapToInterval={MAP_CARD_WIDTH + GAP}
                    getItemLayout={(_, index) => ({ length: MAP_CARD_WIDTH + GAP, offset: (MAP_CARD_WIDTH + GAP) * index, index })}
                    decelerationRate="fast"
                    onMomentumScrollEnd={(event) => {
                        const index = Math.round(event.nativeEvent.contentOffset.x / (MAP_CARD_WIDTH + GAP))
                        const place = MAP_PLACES[index]
                        if (place) selectFromList(place)
                    }}
                    showsHorizontalScrollIndicator={false}
                    className="grow-0"
                    contentContainerClassName="px-6 py-1"
                />

            </View>

        </View>
    )
}

export default MapView
